/* NewsFlick shared page runtime: messaging, dynamic dates, glossary popovers */
(function(){
  var ZH = /^zh/i.test(document.documentElement.lang||"");
  window.NF = window.NF || {};
  NF.zh = ZH;

  /* ---- shell messaging ---- */
  NF.openStory = function(id){ parent.postMessage({nf:"open-story",id:id||"s01"},"*"); };
  NF.back      = function(){ parent.postMessage({nf:"back"},"*"); };
  NF.openSheet = function(name){ parent.postMessage({nf:"open",sheet:name},"*"); };
  NF.closeSheet= function(name){ parent.postMessage({nf:"close",sheet:name},"*"); };

  /* ---- dynamic dates: demo never goes stale ----
     data-ago="minutes"  -> "22m ago" / "22分鐘前" (hours/days auto)
     data-today          -> "Wednesday, 23 July" / "7月23日 星期三"
     data-date-offset="-3" -> short date N days from today: "20 Jul" / "7月20日" */
  function ago(mins){
    if(mins<60)  return ZH ? mins+"分鐘前" : mins+"m ago";
    var h=Math.round(mins/60);
    if(h<24) return ZH ? h+"小時前" : h+"h ago";
    var d=Math.round(h/24);
    return ZH ? d+"日前" : d+"d ago";
  }
  var WD_EN=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var WD_ZH=["日","一","二","三","四","五","六"];
  var MO_EN=["January","February","March","April","May","June","July","August","September","October","November","December"];
  var MO_EN_S=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function fmtToday(d){
    return ZH ? (d.getMonth()+1)+"月"+d.getDate()+"日 星期"+WD_ZH[d.getDay()]
              : WD_EN[d.getDay()]+", "+d.getDate()+" "+MO_EN[d.getMonth()];
  }
  function fmtShort(d){
    return ZH ? (d.getMonth()+1)+"月"+d.getDate()+"日" : d.getDate()+" "+MO_EN_S[d.getMonth()];
  }
  function renderDates(){
    var now=new Date();
    document.querySelectorAll("[data-ago]").forEach(function(el){ el.textContent=ago(+el.dataset.ago||1); });
    document.querySelectorAll("[data-today]").forEach(function(el){ el.textContent=fmtToday(now); });
    document.querySelectorAll("[data-date-offset]").forEach(function(el){
      var d=new Date(now); d.setDate(d.getDate()+(+el.dataset.dateOffset||0)); el.textContent=fmtShort(d);
    });
    document.querySelectorAll("[data-clock]").forEach(function(el){ el.textContent="9:41"; });
  }
  renderDates();

  /* ---- glossary popover engine (NF_POP global per page) ---- */
  var LABELS = ZH
    ? {keyword:"關鍵詞",confirmed:"已證實",developing:"發展中",disputed:"有爭議",analysis:"分析"}
    : {keyword:"Key term",confirmed:"Confirmed",developing:"Developing",disputed:"Disputed",analysis:"Analysis"};
  var CLASSES=["inline--keyword","inline--confirmed","inline--developing","inline--disputed","inline--analysis"];
  function norm(s){return (s||"").replace(/’/g,"'").replace(/\s+/g," ").trim().toLowerCase().replace(/[.,;:]+$/,"");}
  function esc(s){return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
  var pop=null;
  function ensure(){ if(!pop){pop=document.createElement("div");pop.className="nf-pop";
    pop.addEventListener("click",function(e){e.stopPropagation();}); document.body.appendChild(pop);} return pop; }
  function close(){ if(pop) pop.classList.remove("on"); }
  function srcHtml(src){ if(!src||!src.length) return "";
    var chips=src.map(function(n){return '<span class="chip">'+esc(n)+"</span>";});
    var joined=chips.length>1?chips.slice(0,-1).join(ZH?"、":", ")+(ZH?"及":" and ")+chips[chips.length-1]:chips[0];
    return '<p class="src">'+(ZH?"來源：":"Sources: ")+joined+"</p>"; }
  function body(type,data){
    if(type==="keyword"){
      return '<p class="def">'+esc(data&&data.def||(ZH?"理解這宗新聞值得認識的詞語。":"A term worth knowing to follow this story."))+"</p>"
        +'<button class="save" type="button">'+(ZH?"存入詞彙簿":"Save to keyword diary")+"</button>";
    }
    var rows=(data&&data.rows)||[["",(ZH?"本篇報道中此處標示為「":"This is marked ")+(LABELS[type]||"")+(ZH?"」。":" in this story.")]];
    return rows.map(function(r){return '<p class="row">'+(r[0]?"<b>"+esc(r[0])+":</b> ":"")+esc(r[1])+"</p>";}).join("")
      +srcHtml(data&&data.src);
  }
  document.addEventListener("click",function(e){
    var el=e.target.closest?e.target.closest(CLASSES.map(function(c){return "."+c;}).join(",")):null;
    if(!el){ close(); return; }
    e.preventDefault(); e.stopPropagation();
    var type=CLASSES.filter(function(c){return el.classList.contains(c);})[0].replace("inline--","");
    var data=(window.NF_POP||{})[norm(el.textContent)];
    var p=ensure(); p.className="nf-pop t-"+type;
    p.innerHTML='<div class="hd"><span class="lbl"><span class="dot"></span>'+(LABELS[type]||"").toUpperCase()
      +'</span><button class="x" type="button" aria-label="Close">×</button></div>'+body(type,data);
    var x=p.querySelector(".x"); if(x) x.addEventListener("click",function(ev){ev.stopPropagation();close();});
    var sv=p.querySelector(".save"); if(sv) sv.addEventListener("click",function(ev){ev.stopPropagation();
      sv.innerHTML='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 6"/></svg>'+(ZH?"已存入":"Saved to diary"); sv.style.opacity=".75";});
    p.style.left="-9999px"; p.style.top="0"; p.classList.add("on");
    var r=el.getBoundingClientRect(), pw=p.offsetWidth, ph=p.offsetHeight;
    var left=Math.min(Math.max(8, r.left+r.width/2-pw/2), window.innerWidth-pw-8);
    var top=r.top-ph-10; if(top<8) top=r.bottom+10;
    p.style.left=left+"px"; p.style.top=top+"px";
  },true);
  window.addEventListener("scroll",close,true);
  window.addEventListener("resize",close);
  NF.closePop=close;
})();
