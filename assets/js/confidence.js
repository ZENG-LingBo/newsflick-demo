/* Confidence Signal sheet renderer — reads window.CONF */
(function(){
  var ZH = window.NF && NF.zh;
  var C = window.CONF || {};
  var T = ZH ? {
    title:"可信度訊號", stages:["發展中","核實中","趨於穩定"],
    basedOn:"根據 "+(C.basedOn||9)+" 個來源", verified:"分鐘前核實",
    claims:"關鍵論斷", terms:"名詞解釋", confirmed:"已證實", disputed:"有爭議",
    unknown:"未知之數", settle:"如何釐清", interps:"各方解讀", sources:"主要來源",
    explore:"深入探索", more:"另有 "+(C.more||4)+" 個來源",
    tags:{ok:"已證實",dev:"發展中",un:"未經核實"}
  } : {
    title:"Confidence Signal", stages:["Developing","Verifying","Stabilised"],
    basedOn:"Based on "+(C.basedOn||9)+" sources", verified:"m ago verified",
    claims:"Key claims", terms:"Key Terms", confirmed:"What’s confirmed", disputed:"What’s disputed",
    unknown:"What’s unknown", settle:"What would settle it", interps:"Interpretations", sources:"Top Sources",
    explore:"Explore deeper", more:"+ "+(C.more||4)+" additional sources",
    tags:{ok:"Confirmed",dev:"Developing",un:"Unverified"}
  };
  function esc(s){return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;");}
  function items(arr,cls){ return '<div class="scard sec--'+cls+'">'+
    '<h3>'+T[cls]+'</h3>'+ (arr||[]).map(function(x){
      return '<div class="sitem"><div><b>'+esc(x.t)+'</b><p>'+esc(x.d)+'</p></div></div>'; }).join("")+'</div>'; }

  var lvlCls = C.level==="High"?"lvl-high":C.level==="Low"?"lvl-low":"lvl-med";
  var lvlWord = ZH ? (C.level==="High"?"高":C.level==="Low"?"低":"中") : C.level;

  var html =
    '<div class="scard">'+
      '<div class="lvlrow"><span class="lvlchip '+lvlCls+'">'+lvlWord+'</span></div>'+
      '<p class="verdict">'+esc(C.verdict)+'</p>'+
      '<div class="stepper">'+T.stages.map(function(s,i){
        return '<span class="stage'+(i===C.stageAt?' stage--on':(i<C.stageAt?' stage--done':''))+'">'+s+'</span>'; }).join("")+'</div>'+
    '</div>'+
    '<div class="scard"><h3>'+T.claims+'</h3>'+ (C.claims||[]).map(function(c){
      return '<div class="claim"><span class="ctag ctag--'+c.tag+'">'+T.tags[c.tag]+'</span><b>'+esc(c.t)+'</b><p>'+esc(c.d)+'</p></div>'; }).join("")+
      '<div class="basedon" style="margin-top:10px"><span>'+T.basedOn+'</span><span>'+
      (ZH? (C.verifiedMin||28)+" "+T.verified : (C.verifiedMin||28)+T.verified)+'</span></div></div>'+
    '<div class="scard"><h3>'+T.terms+'</h3>'+ (C.terms||[]).map(function(t){
      return '<div class="term"><b>'+esc(t.t)+'</b><p>'+esc(t.d)+'</p></div>'; }).join("")+'</div>'+
    items(C.confirmed,"confirmed")+
    items(C.disputed,"disputed")+
    items(C.unknown,"unknown")+
    items(C.settle,"settle")+
    '<div class="scard"><h3>'+T.interps+'</h3>'+ (C.interps||[]).map(function(i){
      return '<div class="interp"><span class="io">'+esc(i.o)+'</span><p class="im">'+esc(i.m)+'</p><p class="ih">'+esc(i.h)+'</p></div>'; }).join("")+'</div>'+
    '<div class="scard"><h3>'+T.sources+'</h3>'+ (C.sources||[]).map(function(s){
      return '<div class="srcrow"><span class="sb">'+esc(s.b)+'</span><div class="st"><b>'+esc(s.n)+'</b><span>'+esc(s.m)+'</span><p>'+esc(s.h)+'</p></div></div>'; }).join("")+
      '<p class="snote" style="margin-top:8px">'+T.more+'</p></div>'+
    '<div class="scard"><h3>'+T.explore+'</h3><div class="chips">'+
      (C.explore||[]).map(function(x){return '<span>'+esc(x)+'</span>';}).join("")+'</div></div>';

  document.getElementById("shTitle").textContent = T.title;
  document.getElementById("shBody").innerHTML = html;

  function close(){ NF.closeSheet("confidence"); }
  document.querySelector(".backdrop").addEventListener("click",close);
  document.querySelector(".shead .x").addEventListener("click",close);
})();
