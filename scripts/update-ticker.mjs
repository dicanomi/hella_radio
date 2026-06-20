#!/usr/bin/env node
/**
 * HELLA RADIO — daily music-news ticker builder.
 *
 * Fetches RSS from a set of electronic / dance / underground music outlets,
 * keeps only music-relevant headlines, and writes data/ticker-news.json.
 *
 * Runs in GitHub Actions (Node 20+, global fetch). No paid APIs, no keys.
 * On total failure it leaves the existing cache untouched so the ticker is
 * never empty and the app never breaks.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const OUT = 'data/ticker-news.json';
const MAX_ITEMS = 24;

// Preferred sources (RSS where available). Unreachable feeds are skipped.
const FEEDS = [
  { source: 'YOUR EDM',         url: 'https://www.youredm.com/feed/' },
  { source: 'EDM.COM',          url: 'https://edm.com/.rss/full/' },
  { source: 'MIXMAG',           url: 'https://mixmag.net/rss' },
  { source: 'DJ MAG',           url: 'https://djmag.com/rss.xml' },
  { source: 'XLR8R',            url: 'https://xlr8r.com/feed/' },
  { source: 'MAGNETIC',         url: 'https://www.magneticmag.com/.rss/full/' },
  { source: 'RESIDENT ADVISOR', url: 'https://ra.co/xml/news.xml' },
];

// A headline must contain at least one of these to be considered music-relevant.
const KEYWORDS = [
  'music', 'dj', 'electronic', 'edm', 'techno', 'house', 'ambient', 'downtempo',
  'trip-hop', 'trip hop', 'festival', 'club', 'label', 'album', 'track', 'mix',
  'radio', 'rave', 'underground', 'producer', 'remix', 'tour', 'dance', 'bass',
  'disco', 'garage', 'jungle', 'drum & bass', 'dnb', 'set', 'single', 'ep',
  'boiler room', 'b2b', 'residency', 'vinyl', 'soundsystem', 'sound system',
];

const stripTags = (s) => s.replace(/<[^>]*>/g, '');
const unescape = (s) => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&amp;/g, '&').replace(/&#0?38;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&apos;/g, "'")
  .replace(/&#8217;/g, '\u2019').replace(/&#8216;/g, '\u2018')
  .replace(/&#8211;/g, '\u2013').replace(/&#8212;/g, '\u2014')
  .replace(/&nbsp;/g, ' ').trim();

const field = (block, tag) => {
  const m = block.match(new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)<\\/' + tag + '>', 'i'));
  return m ? unescape(stripTags(m[1])) : '';
};

const isMusic = (title) => {
  const t = title.toLowerCase();
  return KEYWORDS.some((k) => t.includes(k));
};

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { 'user-agent': 'HellaRadioTickerBot/1.0 (+github actions)' },
      redirect: 'follow',
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const xml = await res.text();
    const items = [];
    // RSS <item> and Atom <entry>
    const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
    for (const b of blocks) {
      const title = field(b, 'title');
      if (!title) continue;
      let url = field(b, 'link');
      if (!url) {
        const href = b.match(/<link[^>]*href=["']([^"']+)["']/i);
        if (href) url = href[1];
      }
      if (!url) continue;
      const dateRaw = field(b, 'pubDate') || field(b, 'updated') || field(b, 'published') || '';
      const d = dateRaw ? new Date(dateRaw) : new Date();
      const date = isNaN(d) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
      if (!isMusic(title)) continue;
      items.push({ source: feed.source, title, url, date });
    }
    return items;
  } catch (err) {
    console.warn('skip ' + feed.source + ': ' + err.message);
    return [];
  }
}

async function main() {
  const results = await Promise.all(FEEDS.map(fetchFeed));
  let all = results.flat();

  // Dedupe by title, newest first, cap.
  const seen = new Set();
  all = all
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .filter((it) => {
      const k = it.title.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .slice(0, MAX_ITEMS);

  if (!all.length) {
    console.log('No fresh music headlines fetched — keeping existing cache.');
    return; // never overwrite with empty
  }

  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(all, null, 2) + '\n', 'utf8');
  console.log('Wrote ' + all.length + ' headlines to ' + OUT);
}

main().catch((err) => {
  console.error('Ticker build failed (cache preserved):', err);
  process.exit(0); // do not fail the workflow / never break the app
});
