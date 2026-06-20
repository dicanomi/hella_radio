(function(){
var CSS="#hrGlobalNav{position:fixed;top:16px;left:18px;z-index:2147483647;display:flex;align-items:center;gap:6px;font-family:'DM Mono',ui-monospace,'SF Mono',Menlo,Consolas,monospace}#hrGlobalNav .hr-back{display:flex;align-items:center;gap:7px;padding:0 13px;height:34px;background:rgba(8,8,6,.72);border:1px solid rgba(255,255,255,.14);border-radius:3px;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);text-decoration:none;color:rgba(255,255,255,.62)}#hrGlobalNav .hr-back:hover{background:rgba(255,255,255,.08);color:#fff}#hrGlobalNav .hr-bl{font-size:10px;letter-spacing:.18em;text-transform:uppercase;line-height:1}#hrGlobalNav .hr-sw{width:32px;height:32px;border-radius:3px;background:rgba(8,8,6,.72);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);cursor:pointer;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.62)}#hrGlobalNav .hr-sw:hover{background:rgba(255,255,255,.08);color:#fff}#hrGlobalNav .hr-dd{position:absolute;top:40px;left:0;min-width:172px;background:rgba(8,8,6,.96);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.14);border-radius:3px;padding:4px;box-shadow:0 8px 32px rgba(0,0,0,.5);display:none}#hrGlobalNav .hr-dd.open{display:block}#hrGlobalNav .hr-ddl{padding:5px 8px;font-size:8px;letter-spacing:.22em;color:rgba(255,255,255,.3);text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:3px}#hrGlobalNav .hr-it{display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:2px;text-decoration:none}#hrGlobalNav .hr-it:hover{background:rgba(255,255,255,.07)}#hrGlobalNav .hr-it.cur{background:rgba(255,255,255,.06)}#hrGlobalNav .hr-dot{width:4px;height:4px;border-radius:50%;background:rgba(80,200,120,.7)}#hrGlobalNav .hr-t{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.7);line-height:1}";
var P=[["THE EYE","the-eye"],["LOW BATTERY","low-battery"],["SPACE DRONE","space-drone"],["AETHER","aether"],["DEAD AIR","dead-air"],["ORB","orb"],["FOURCAST","fourcast"]];
function mk(){
if(document.getElementById("hrGlobalNav"))return;
if(!document.getElementById("hrNavCss")){var st=document.createElement("style");st.id="hrNavCss";st.textContent=CSS;document.head.appendChild(st);}
var items="";
for(var i=0;i<P.length;i++){items+='<a href="https://hella.rich/'+P[i][1]+'" class="hr-it"><span class="hr-dot"></span><span class="hr-t">'+P[i][0]+'</span></a>';}
items+='<a href="https://radio.hella.rich/" class="hr-it cur"><span class="hr-dot"></span><span class="hr-t">RADIO</span></a>';
var w=document.createElement("div");
w.id="hrGlobalNav";
w.innerHTML='<a href="https://hella.rich/" class="hr-back"><svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M6 1L1 4L6 7M1 4H11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="hr-bl">hella.rich</span></a><div style="position:relative"><button class="hr-sw" id="hrSw"><svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 2H13M1 5H13M1 8H13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button><div class="hr-dd" id="hrDd"><div class="hr-ddl">Products</div>'+items+'</div></div>';
document.body.appendChild(w);
var b=document.getElementById("hrSw"),d=document.getElementById("hrDd");
b.addEventListener("click",function(e){e.stopPropagation();d.classList.toggle("open");});
document.addEventListener("click",function(e){if(!d.contains(e.target)&&e.target!==b)d.classList.remove("open");});
document.addEventListener("keydown",function(e){if(e.key==="Escape")d.classList.remove("open");});
}
function boot(){mk();new MutationObserver(function(){mk();}).observe(document.body,{childList:true});}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){setTimeout(boot,200);});}else{setTimeout(boot,200);}
})();
