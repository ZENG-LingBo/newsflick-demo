/* The Pulse sheet renderer — reads window.PULSE */
(function(){
  var ZH = window.NF && NF.zh;
  var P = window.PULSE || {};
  var T = ZH ? {
    title:"輿論脈搏", temp:"情緒溫度", overall:"整體基調", neg:"負面", pos:"正面",
    voices:"各方聲音", all:"全部", cats:{Officials:"官方",Experts:"專家",Outlets:"傳媒",Commentators:"評論者"},
    posts:"則帖文", basedOn:"根據 "+(P.basedOn||"9,000")+" 則帖文", verified:(P.verifiedMin||12)+" 分鐘前核實",
    note:"內容經編輯精選，並非演算法資訊流；回應只代表立場，絕非平台流量數據。",
    show:"顯示回應 (", hide:"收起回應 (",
    rx:["🤔 未被說服","😟 令我擔憂","👀 密切留意"]
  } : {
    title:"The Pulse", temp:"Temperature", overall:"overall tenor", neg:"negative", pos:"positive",
    voices:"Voices", all:"All", cats:{Officials:"Officials",Experts:"Experts",Outlets:"Outlets",Commentators:"Commentators"},
    posts:"posts", basedOn:"Based on "+(P.basedOn||"9,000")+" posts", verified:"Verified "+(P.verifiedMin||12)+"m ago",
    note:"Curated, not a feed. Reactions are stance only, never platform metrics.",
    show:"Show reactions (", hide:"Hide reactions (",
    rx:["🤔 Not convinced","😟 This worries me","👀 Watching closely"]
  };
  var COLORS=["#800080","#667dff","#c56a3f","#8ba394","#5a616e"];
  function esc(s){return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;");}

  /* ring geometry */
  var R=58, CIRC=2*Math.PI*R;
  var segs=P.segs||[]; var sel=null;
  var acc=0;
  var segSvg=segs.map(function(s,i){
    var len=CIRC*s.pct/100-3, off=-acc; acc+=CIRC*s.pct/100;
    return '<circle class="rseg" data-i="'+i+'" cx="75" cy="75" r="'+R+'" stroke="'+COLORS[i%COLORS.length]+'"'+
      ' stroke-dasharray="'+len+' '+(CIRC-len)+'" stroke-dashoffset="'+off+'"/>';
  }).join("");

  var html =
    '<div class="scard"><h3>'+T.temp+'</h3><p class="temp">'+esc(P.temperature)+'</p>'+
      '<div class="ringwrap">'+
        '<div class="ring" id="ring"><svg viewBox="0 0 150 150">'+segSvg+'</svg>'+
          '<div class="ringc"><b id="ringPct"></b><span id="ringLbl"></span></div></div>'+
        '<div class="lgs" id="lgs">'+segs.map(function(s,i){
          return '<div class="lg" data-i="'+i+'"><i style="background:'+COLORS[i%COLORS.length]+'"></i><span>'+esc(s.label)+'</span><b>'+s.pct+'%</b></div>'; }).join("")+'</div>'+
      '</div>'+
      '<div class="basedon" style="margin-top:12px"><span>'+T.basedOn+'</span><span>'+T.verified+'</span></div>'+
    '</div>'+
    '<div class="scard" id="clusterCard" hidden></div>'+
    '<div class="scard"><h3>'+T.voices+'</h3>'+
      '<div class="vtabs" id="vtabs"></div><div id="vlist"></div>'+
      '<p class="snote">'+T.note+'</p></div>';

  document.getElementById("shTitle").textContent = T.title;
  document.getElementById("shBody").innerHTML = html;

  /* ring selection */
  function renderRing(){
    var ring=document.getElementById("ring");
    ring.classList.toggle("ring--sel", sel!==null);
    document.querySelectorAll(".rseg").forEach(function(c){ c.classList.toggle("on", sel!==null && +c.dataset.i===sel); });
    document.querySelectorAll(".lg").forEach(function(l){ l.classList.toggle("on", sel!==null && +l.dataset.i===sel); });
    var pct=document.getElementById("ringPct"), lbl=document.getElementById("ringLbl");
    if(sel===null){ pct.textContent=(P.tenor&&P.tenor.pct||66)+"%"; lbl.textContent=(P.tenor&&P.tenor.label)||T.neg; }
    else { pct.textContent=segs[sel].pct+"%"; lbl.textContent=segs[sel].label; }
    var cc=document.getElementById("clusterCard");
    var cl=sel!==null && (P.clusters||{})[segs[sel].key];
    if(cl){
      cc.hidden=false;
      cc.innerHTML='<h3>'+esc(segs[sel].label)+'</h3>'+cl.map(function(c){
        return '<div class="cluster"><div class="clh"><b>'+esc(c.t)+'</b><span>~'+c.n+' '+T.posts+'</span></div><p>'+esc(c.d)+'</p>'+
          (c.posts||[]).map(function(p){
            return '<div class="post"><div class="ph2"><b>'+esc(p.h)+'</b><span>'+esc(p.m)+'</span></div><p>'+esc(p.x)+'</p></div>'; }).join("")+'</div>';
      }).join("");
    } else cc.hidden=true;
  }
  function pick(i){ sel = (sel===i)?null:i; renderRing(); }
  document.getElementById("ring").addEventListener("click",function(e){
    var c=e.target.closest(".rseg"); if(c) pick(+c.dataset.i);
  });
  document.getElementById("lgs").addEventListener("click",function(e){
    var l=e.target.closest(".lg"); if(l) pick(+l.dataset.i);
  });
  renderRing();

  /* voices */
  var voices=P.voices||[]; var cat="All";
  var cats=["All"].concat(Object.keys(T.cats).filter(function(c){ return voices.some(function(v){return v.cat===c;}); }));
  var vt=document.getElementById("vtabs");
  vt.innerHTML=cats.map(function(c){
    var n=c==="All"?voices.length:voices.filter(function(v){return v.cat===c;}).length;
    return '<button class="vtab'+(c===cat?' vtab--on':'')+'" data-c="'+c+'" type="button">'+(c==="All"?T.all:T.cats[c])+' ('+n+')</button>';
  }).join("");
  function renderVoices(){
    vt.querySelectorAll(".vtab").forEach(function(b){ b.classList.toggle("vtab--on", b.dataset.c===cat); });
    document.getElementById("vlist").innerHTML=voices.filter(function(v){ return cat==="All"||v.cat===cat; }).map(function(v,i){
      return '<div class="vcard"><div class="vhead"><span class="vb">'+esc(v.b)+'</span><div class="vn"><b>'+esc(v.n)+'</b><span>'+esc(v.m)+'</span></div></div>'+
        '<p>'+esc(v.x)+'</p><div class="vfoot"><button class="rxbtn" type="button" data-rx>'+T.show+'3)</button>'+
        '<div class="rxlist">'+T.rx.map(function(r){return '<button class="stance" type="button">'+r+'</button>';}).join("")+'</div></div></div>';
    }).join("");
    document.querySelectorAll("[data-rx]").forEach(function(btn){
      btn.addEventListener("click",function(){
        var list=btn.parentNode.querySelector(".rxlist"); var on=list.classList.toggle("on");
        btn.textContent=(on?T.hide:T.show)+"3)";
      });
    });
    document.querySelectorAll(".stance").forEach(function(s){ s.addEventListener("click",function(){
      var list=s.closest(".rxlist"); var on=s.classList.contains("on");
      list.querySelectorAll(".stance").forEach(function(x){x.classList.remove("on");});
      if(!on) s.classList.add("on");
    });});
  }
  vt.addEventListener("click",function(e){ var b=e.target.closest(".vtab"); if(b){ cat=b.dataset.c; renderVoices(); } });
  renderVoices();

  function close(){ NF.closeSheet("pulse"); }
  document.querySelector(".backdrop").addEventListener("click",close);
  document.querySelector(".shead .x").addEventListener("click",close);
})();
