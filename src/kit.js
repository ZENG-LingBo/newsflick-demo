/* Kit runtime: Leaflet maps, chart tooltips, gauges, poll flips, popovers.
   Runs inside the app document, after engine.js. Config injected as NF_KIT. */
(function(){
  var K = window.NF_KIT || { maps:{}, pop:{} };
  var ZH = /^zh/i.test(document.documentElement.lang || '');

  /* ---- Leaflet maps: lazy-init when a map's stage becomes active ---- */
  function initMap(box){
    if(box.getAttribute('data-init')) return;
    var cfg = K.maps[box.getAttribute('data-map')];
    if(!cfg || typeof L === 'undefined'){ box.classList.add('fallback'); return; }
    box.setAttribute('data-init','1');
    var map = L.map(box.querySelector('.maplive'), { scrollWheelZoom:false, attributionControl:false,
      zoomControl:true, center:cfg.center, zoom:cfg.zoom, maxZoom:11, minZoom:3, dragging:!L.Browser.mobile });
    var loaded = false;
    var tl = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { subdomains:'abcd', maxZoom:12 });
    tl.on('load', function(){ loaded = true; box.classList.add('ready'); });
    tl.on('tileerror', function(){ if(!loaded) box.classList.add('fallback'); });
    setTimeout(function(){ if(!loaded) box.classList.add('fallback'); }, 6000);
    tl.addTo(map);
    var pts = [];
    (cfg.zones || []).forEach(function(z){
      pts.push(z[0]);
      L.circle(z[0], { radius:z[1]*1000, color:'#800080', weight:1.5, opacity:.6, fillColor:'#800080', fillOpacity:.16 })
        .addTo(map).bindPopup('<b>'+z[2]+'</b><br>'+z[3]);
      L.marker(z[0], { icon:L.divIcon({ className:'kit-pulse', iconSize:[13,13] }) }).addTo(map).bindPopup('<b>'+z[2]+'</b><br>'+z[3]);
    });
    (cfg.points || []).forEach(function(p){
      pts.push(p[0]);
      L.marker(p[0], { icon:L.divIcon({ className:'kit-diamond', html:'<span></span>', iconSize:[16,16] }) })
        .addTo(map).bindPopup('<b>'+p[1]+'</b><br>'+p[2]);
    });
    box.__map = map; /* exposed for scripted walkthroughs (tour / demo film) */
    setTimeout(function(){ map.invalidateSize();
      if(pts.length) map.fitBounds(L.latLngBounds(pts), { padding:[32,32], animate:false }); }, 120);
  }
  function initStageMaps(stage){
    stage.querySelectorAll('.mapbox[data-map]').forEach(initMap);
  }
  /* watch stage activation */
  var mo = new MutationObserver(function(muts){
    muts.forEach(function(m){
      if(m.target.classList.contains('active')) initStageMaps(m.target);
    });
  });
  document.querySelectorAll('.stage').forEach(function(s){
    mo.observe(s, { attributes:true, attributeFilter:['class'] });
    if(s.classList.contains('active')) initStageMaps(s);
  });
  /* belt & braces: init on first scroll of a stage too */
  document.querySelectorAll('.nf-phone').forEach(function(p){
    p.addEventListener('scroll', function once(){ p.removeEventListener('scroll', once);
      initStageMaps(p.closest('.stage')); }, { passive:true });
  });

  /* ---- signal gauges: dashoffset from data-pct; tap toggles note ---- */
  document.querySelectorAll('.c-signal .sig').forEach(function(s){
    var pct = +s.getAttribute('data-pct') || 0, C = 113;
    s.style.setProperty('--o', String(C - C * pct / 100));
    s.addEventListener('click', function(){ s.classList.toggle('open'); });
  });

  /* ---- chart: tap column for value tooltip ---- */
  document.addEventListener('click', function(e){
    var col = e.target.closest ? e.target.closest('.c-numbers .chart .col') : null;
    document.querySelectorAll('.kit-tip').forEach(function(t){ t.remove(); });
    if(!col) return;
    var tip = document.createElement('span');
    tip.className = 'kit-tip';
    tip.textContent = col.getAttribute('data-val') || col.querySelector('.bval').textContent;
    col.appendChild(tip);
    setTimeout(function(){ tip.remove(); }, 2600);
  }, true);

  /* ---- poll: tap flips % <-> counts ---- */
  document.querySelectorAll('.c-poll .prow').forEach(function(r){
    r.addEventListener('click', function(){
      var v = r.querySelector('.pv'); if(!v || !r.getAttribute('data-count')) return;
      var showing = v.textContent.indexOf('%') >= 0;
      if(!v.getAttribute('data-pct')) v.setAttribute('data-pct', v.textContent);
      v.textContent = showing ? r.getAttribute('data-count') : v.getAttribute('data-pct');
      v.style.fontSize = showing ? '13px' : '';
    });
  });

  /* ---- popovers on .kw / .chip spans ---- */
  var pop = null;
  function norm(s){ return (s||'').replace(/\s+/g,' ').trim().toLowerCase().replace(/[.,;:。，；：]+$/,''); }
  function closePop(){ if(pop){ pop.classList.remove('on'); } }
  document.addEventListener('click', function(e){
    var el = e.target.closest ? e.target.closest('.kw,.chip,.chip-i') : null;
    if(!el){ closePop(); return; }
    var key = norm(el.textContent);
    var entry = K.pop[key];
    if(!entry) return;
    e.stopPropagation();
    var host = el.closest('.nf-phone') || document.body;
    if(!pop || pop.parentNode !== host){
      if(pop) pop.remove();
      pop = document.createElement('div'); pop.className = 'kit-pop';
      pop.addEventListener('click', function(ev){ ev.stopPropagation(); });
      host.appendChild(pop);
    }
    pop.innerHTML = '<div class="hd2"><span class="lbl">' + (ZH ? '關鍵詞' : 'KEY TERM') +
      '</span><button class="x" type="button">×</button></div><p class="def"></p>';
    pop.querySelector('.def').textContent = entry;
    pop.querySelector('.x').addEventListener('click', function(ev){ ev.stopPropagation(); closePop(); });
    pop.classList.add('on');
    var hr = host.getBoundingClientRect(), r = el.getBoundingClientRect();
    var top = r.top - hr.top + host.scrollTop - pop.offsetHeight - 10;
    if(top < host.scrollTop + 8) top = r.bottom - hr.top + host.scrollTop + 10;
    var left = Math.min(Math.max(8, r.left - hr.left + r.width/2 - pop.offsetWidth/2), 375 - pop.offsetWidth - 8);
    pop.style.top = top + 'px'; pop.style.left = left + 'px';
  }, false);
  document.querySelectorAll('.nf-phone,.scroll').forEach(function(p){
    p.addEventListener('scroll', closePop, { passive:true });
  });
  document.querySelectorAll('.vs-row').forEach(function(r){ r.addEventListener('click', closePop); });
})();
