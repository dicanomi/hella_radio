(function(){
var CSS="#hrGlobalNav{position:fixed;top:16px;left:18px;z-index:2147483647;display:flex;align-items:center;gap:6px;font-family:'DM Mono',ui-monospace,'SF Mono',Menlo,Consolas,monospace}#hrGlobalNav .hr-back{display:flex;align-items:center;gap:8px;padding:0 13px;height:34px;background:rgba(8,8,6,.72);border:1px solid rgba(255,255,255,.14);border-radius:3px;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);text-decoration:none;color:rgba(255,255,255,.62)}#hrGlobalNav .hr-back:hover{background:rgba(255,255,255,.08);color:#fff}#hrGlobalNav .hr-ar{font-size:12px;line-height:1}#hrGlobalNav .hr-bl{font-size:10px;letter-spacing:.18em;text-transform:uppercase;line-height:1}#hrGlobalNav .hr-sw{width:32px;height:32px;border-radius:3px;background:rgba(8,8,6,.72);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);cursor:pointer;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.62);font-size:13px;padding:0}#hrGlobalNav .hr-sw:hover{background:rgba(255,255,255,.08);color:#fff}#hrGlobalNav .hr-dd{position:absolute;top:40px;left:0;min-width:172px;background:rgba(8,8,6,.96);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.14);border-radius:3px;padding:4px;box-shadow:0 8px 32px rgba(0,0,0,.5);display:none}#hrGlobalNav .hr-dd.open{display:block}#hrGlobalNav .hr-ddl{padding:5px 8px;font-size:8px;letter-spacing:.22em;color:rgba(255,255,255,.3);text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:3px}#hrGlobalNav .hr-it{display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:2px;text-decoration:none}#hrGlobalNav .hr-it:hover{background:rgba(255,255,255,.07)}#hrGlobalNav .hr-it.cur{background:rgba(255,255,255,.06)}#hrGlobalNav .hr-dot{width:4px;height:4px;border-radius:50%;background:rgba(80,200,120,.7);flex-shrink:0}#hrGlobalNav .hr-t{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.7);line-height:1}";
var P=[["THE EYE","the-eye"],["LOW BATTERY","low-battery"],["SPACE DRONE","space-drone"],["AETHER","aether"],["DEAD AIR","dead-air"],["ORB","orb"],["FOURCAST","fourcast"]];
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function clean(){
var olds=document.querySelectorAll('nav.hr-nav');
for(var i=0;i<olds.length;i++){if(olds[i].id!=="hrGlobalNav")olds[i].remove();}
}
function mk(){
clean();
if(document.getElementById("hrGlobalNav"))return;
if(!document.getElementById("hrNavCss")){var st=document.createElement("style");st.id="hrNavCss";st.textContent=CSS;document.head.appendChild(st);}
var nav=el("div");nav.id="hrGlobalNav";
var back=el("a","hr-back");back.href="https://hella.rich/";
back.appendChild(el("span","hr-ar","←"));
back.appendChild(el("span","hr-bl","hella.rich"));
nav.appendChild(back);
var wrap=el("div");wrap.style.position="relative";
var btn=el("button","hr-sw","☰");btn.id="hrSw";btn.setAttribute("aria-label","Switch product");
var dd=el("div","hr-dd");dd.id="hrDd";
dd.appendChild(el("div","hr-ddl","Products"));
function addItem(label,href,cur){var a=el("a","hr-it"+(cur?" cur":""));a.href=href;a.appendChild(el("span","hr-dot"));a.appendChild(el("span","hr-t",label));dd.appendChild(a);}
for(var i=0;i<P.length;i++){addItem(P[i][0],"https://hella.rich/"+P[i][1],false);}
addItem("RADIO","https://radio.hella.rich/",true);
wrap.appendChild(btn);wrap.appendChild(dd);
nav.appendChild(wrap);
document.body.appendChild(nav);
btn.addEventListener("click",function(e){e.stopPropagation();dd.classList.toggle("open");});
document.addEventListener("click",function(e){if(!dd.contains(e.target)&&e.target!==btn)dd.classList.remove("open");});
document.addEventListener("keydown",function(e){if(e.key==="Escape")dd.classList.remove("open");});
}
function boot(){mk();new MutationObserver(function(){mk();}).observe(document.body,{childList:true});}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){setTimeout(boot,200);});}else{setTimeout(boot,200);}
})();
