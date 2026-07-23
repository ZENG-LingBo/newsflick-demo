/* NewsFlick card kit interactions: reveal, chart, poll, signal, quote, maps, story chrome */
(function(){
  var ZH = window.NF && NF.zh;

  /* ---- reveal-on-scroll (drives all card animations) ----
     rect-sweep rather than IntersectionObserver: IO does not fire while a
     document is hidden (background tab / offscreen iframe), a state this demo
     is legitimately in while preloaded behind the feed. */
  var pendingAnim=[].slice.call(document.querySelectorAll("[data-animate]"));
  var pendingMaps=[];
  function sweep(){
    var vh=window.innerHeight||812;
    pendingAnim=pendingAnim.filter(function(el){
      var r=el.getBoundingClientRect();
      if(r.top < vh-80 && r.bottom > 0){ el.classList.add("in"); return false; }
      return true;
    });
    pendingMaps=pendingMaps.filter(function(el){
      var r=el.getBoundingClientRect();
      if(r.top < vh+220 && r.bottom > -220){ initMap(el); return false; }
      return true;
    });
  }

  /* ---- signal gauges: set dashoffset from data-pct ---- */
  document.querySelectorAll(".sig").forEach(function(s){
    var pct=+s.dataset.pct||0, C=113;
    s.style.setProperty("--o", String(C - C*pct/100));
    s.addEventListener("click",function(){ s.classList.toggle("open"); });
  });

  /* ---- chart: tap column for value ---- */
  var tip=null;
  function chartTip(box){ if(!tip){ tip=document.createElement("div"); tip.className="chart-tip"; }
    if(tip.parentNode!==box) box.appendChild(tip); return tip; }
  document.addEventListener("click",function(e){
    var col=e.target.closest(".col");
    if(!col){ if(tip) tip.classList.remove("on"); return; }
    var box=col.closest(".chartbox"); var t=chartTip(box);
    t.textContent=(col.dataset.x?col.dataset.x+" · ":"")+col.dataset.val;
    var br=box.getBoundingClientRect(), cr=col.getBoundingClientRect();
    var fill=col.querySelector("i"), fr=fill.getBoundingClientRect();
    t.style.left=(cr.left-br.left+cr.width/2)+"px";
    t.style.top=(fr.top-br.top-6)+"px";
    t.classList.add("on");
    e.stopPropagation();
  });
  /* goal line label toggles its note */
  document.querySelectorAll(".goal em").forEach(function(em){
    em.addEventListener("click",function(e){ e.stopPropagation();
      var note=em.closest(".card").querySelector(".goalnote"); if(note) note.hidden=!note.hidden; });
  });

  /* ---- poll: tap row flips % <-> counts ---- */
  document.querySelectorAll(".prow").forEach(function(r){
    r.addEventListener("click",function(){
      var v=r.querySelector(".pv"); if(!v||!v.dataset.count) return;
      var showingPct = v.textContent.indexOf("%")>=0;
      v.textContent = showingPct ? v.dataset.count : v.dataset.pct;
      v.style.fontSize = showingPct ? "13px" : "";
    });
    var v=r.querySelector(".pv"); if(v&&!v.dataset.pct) v.dataset.pct=v.textContent;
  });

  /* ---- expert quote: reactions ---- */
  document.querySelectorAll(".rxbtn").forEach(function(btn){
    var n=(btn.textContent.match(/\((\d+)\)/)||[])[1]||"3";
    btn.addEventListener("click",function(){
      var list=btn.parentNode.querySelector(".rxlist"); var on=list.classList.toggle("on");
      btn.textContent=(on?(ZH?"收起回應 (":"Hide reactions ("):(ZH?"顯示回應 (":"Show reactions ("))+n+")";
    });
  });
  document.querySelectorAll(".stance").forEach(function(s){ s.addEventListener("click",function(){
    var list=s.closest(".rxlist"); var on=s.classList.contains("on");
    list.querySelectorAll(".stance").forEach(function(x){x.classList.remove("on");});
    if(!on) s.classList.add("on");
  });});

  /* ---- Leaflet maps (lazy) ---- */
  function popupHtml(p){ return "<b>"+p.name+"</b><br>"+(p.note||""); }
  function initMap(box){
    if(box._nfmap) return;
    var cfg=(window.NF_MAPS||{})[box.dataset.map];
    if(!cfg || typeof L==="undefined"){ box.classList.add("map--fallback"); return; }
    box._nfmap=true;
    var map=L.map(box.querySelector(".map-live"),{
      scrollWheelZoom:false, attributionControl:false, zoomControl:true,
      center:cfg.center, zoom:cfg.zoom, maxZoom:11, minZoom:Math.max(3,cfg.zoom-2)
    });
    var loaded=false;
    var tl=L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",{subdomains:"abcd",maxZoom:12});
    tl.on("load",function(){ loaded=true; box.classList.add("map--ready"); });
    tl.on("tileerror",function(){ if(!loaded) box.classList.add("map--fallback"); });
    setTimeout(function(){ if(!loaded) box.classList.add("map--fallback"); },6000);
    tl.addTo(map);
    (cfg.zones||[]).forEach(function(z){
      L.circle(z.at,{radius:(z.r||40)*1000,color:"#800080",weight:1.5,opacity:.6,fillColor:"#800080",fillOpacity:.16})
        .addTo(map).bindPopup(popupHtml(z));
      L.marker(z.at,{icon:L.divIcon({className:"nf-pulse",iconSize:[13,13]})}).addTo(map).bindPopup(popupHtml(z));
    });
    (cfg.points||[]).forEach(function(p){
      L.marker(p.at,{icon:L.divIcon({className:"nf-diamond",html:"<span></span>",iconSize:[16,16]})})
        .addTo(map).bindPopup(popupHtml(p));
    });
    setTimeout(function(){ map.invalidateSize(); },80);
  }
  pendingMaps=[].slice.call(document.querySelectorAll(".mapbox[data-map]"));

  /* sweep triggers: page scroll, resize, and a light poll until everything fired */
  var scrollHost=document.querySelector(".scroll")||window;
  scrollHost.addEventListener("scroll",function(){ requestAnimationFrame(sweep); },{passive:true});
  window.addEventListener("resize",sweep);
  var sweepTimer=setInterval(function(){
    sweep();
    if(!pendingAnim.length && !pendingMaps.length) clearInterval(sweepTimer);
  },700);
  sweep();

  /* ---- story chrome: tabs scroll-spy, actions ---- */
  var scroller=document.querySelector(".scroll");
  var tabs=[].slice.call(document.querySelectorAll(".tabsrow .tab"));
  var sections=[].slice.call(document.querySelectorAll("[data-card]"));
  if(scroller && tabs.length && sections.length){
    var NAV=60;
    function activate(i){ tabs.forEach(function(t,j){ t.classList.toggle("tab--on", i===j); });
      var t=tabs[i]; if(t&&t.scrollIntoView) t.scrollIntoView({block:"nearest",inline:"center",behavior:"smooth"}); }
    tabs.forEach(function(t,i){ t.addEventListener("click",function(){
      var target=sections[i]; if(!target) return;
      scroller.scrollTo({top:Math.max(0,target.offsetTop-NAV),behavior:"smooth"}); activate(i);
    });});
    var spyQ=false;
    scroller.addEventListener("scroll",function(){ if(spyQ) return; spyQ=true;
      requestAnimationFrame(function(){ spyQ=false;
        var y=scroller.scrollTop+NAV+40, cur=0;
        sections.forEach(function(s,i){ if(s.offsetTop<=y) cur=i; });
        if(!tabs[cur].classList.contains("tab--on")) activate(cur);
      });
    },{passive:true});
  }
  var backBtn=document.querySelector("[data-nf-back]");
  if(backBtn) backBtn.addEventListener("click",function(){ NF.back(); });
  document.querySelectorAll("[data-nf-sheet]").forEach(function(el){
    el.addEventListener("click",function(){ NF.openSheet(el.dataset.nfSheet); });
  });
  var next=document.querySelector("[data-nf-next]");
  if(next) next.addEventListener("click",function(){ NF.openStory(next.dataset.nfNext); });
})();
