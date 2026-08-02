/* Build en/app.html + zh/app.html — v2 stage architecture, 4 stories, voice matrix.
   Run: node build-app.js */
const fs = require("fs");
const H = require("./src/harvest.js");
const C = require("./src/cards.js");

const STORIES = {
  s01: require("./src/content/s01.js"),
  s02: require("./src/content/s02.js"),
  s03: require("./src/content/s03.js"),
  s04: require("./src/content/s04.js"),
};
const ORDER = ["s01", "s02", "s03", "s04"];
const NEWS_COUNTS = [15, 14, 13, 12];
const HERO_TYPE = { s01: "s2story", s02: "story", s03: "s2story", s04: "s2story" };

const FEED_TEXT = {
  en: {
    greeting: "Hello, Michelle 👋",
    lede: "One closed strait, one landmark ban, one tariff wall and one overheating market are quietly repricing daily life. None are new; all are landing now.",
    bullets: [
      "Hormuz shut → oil past $140, day 12 of strikes",
      "France draws the under-16 line → all of Europe watches",
      "50% tariffs land on Canada → prices follow",
      "HK rents → steepest summer climb in a decade"],
    sources: "Across 17 sources", openSnap: "Open full snap", now: "What’s happening now",
    snapTitle: "Current snapshot", cue: "Scroll to feed", section: "Essential",
    ago: "1h ago", cardsWord: "cards", track: "Track",
    descs: {
      s01: "Twelve days of strikes have shut the Strait of Hormuz for the first time in history — and no briefing will say how this ends.",
      s02: "France passes the EU's first blanket under-16 ban. Supporters cite mental health; critics say it just moves the risk.",
      s03: "The steepest tariff wall between two allied economies in modern history — and prices move before the politics settle.",
      s04: "Rents rose almost 4% in six months. The squeeze is real, measurable — and mapped, district by district."
    },
    tags: { s01: ["Essential", "World"], s02: ["Essential", "Society"], s03: ["Essential", "Economy"], s04: ["Local", "Housing"] },
    titles: { s01: "The strait that prices the world is closed", s02: "Should under-16s be banned from social media?", s03: "50% tariffs, between allies", s04: "The steepest summer climb in a decade" },
    vsheet: null // keep harvested EN vsheet
  },
  zh: {
    greeting: "哈囉，Michelle 👋",
    lede: "一條封鎖的海峽、一道破天荒的禁令、一堵關稅牆、一個過熱的市場，正悄悄為日常生活重新定價。全部都不是新事，全部都在此刻埋單。",
    bullets: [
      "霍爾木茲封鎖 → 油價升穿140美元，空襲第12日",
      "法國劃下16歲界線 → 全歐洲都在看",
      "50%關稅落在加拿大 → 物價隨後就到",
      "香港租金 → 十年最急夏季升浪"],
    sources: "綜合17個來源", openSnap: "開啟完整概覽", now: "現正發生",
    snapTitle: "即時概覽", cue: "向下看報道", section: "必讀",
    ago: "1小時前", cardsWord: "張卡", track: "追蹤",
    descs: {
      s01: "十二日空襲令霍爾木茲海峽史上首次封鎖——而沒有一場簡報肯講這一切如何收科。",
      s02: "法國通過歐盟首個16歲以下全面禁令。支持者談精神健康；反對者話風險只係搬咗位。",
      s03: "近代史上盟友之間最高的關稅牆——價格效應比政治結果更快到埗。",
      s04: "半年租金升近4%。壓力真實、有數可計——而且逐區畫在地圖上。"
    },
    tags: { s01: ["必讀", "國際"], s02: ["必讀", "社會"], s03: ["必讀", "經濟"], s04: ["本地", "房屋"] },
    titles: { s01: "為全球定價的海峽，封了", s02: "16歲以下應否禁用社交媒體？", s03: "盟友之間，50%關稅", s04: "十年來最急的夏季升浪" },
    vsheet: {
      title: "選擇聲線", sub: "同一批事實、同一批數字——只是講法不同。",
      rows: [["Plain", "平實", "中性、直述事實。預設聲線。"],
             ["Calm explainer", "淡定解說", "從容安定，配襯柔和襯線字體。"],
             ["ELI5 friend", "朋友仔", "親切好玩，像朋友解釋給你聽。"]]
    }
  }
};

const IMG = { s01: "../assets/img/hero-hormuz.svg", s02: "../assets/img/hero-teens.jpg", s03: "../assets/img/hero-tariffs.svg", s04: "../assets/img/hero-flatshare.jpg" };

/* ---------- feed ---------- */
function mcard(lang, sid, idx, cardCount) {
  const F = FEED_TEXT[lang];
  const dots = Array.from({ length: Math.min(cardCount, 5) }, (_, i) => `<span class="dot ${i === 0 ? "on" : ""}"></span>`).join("");
  /* harvest the first mcard as a template */
  const tmplStart = H.FEED_STAGE.indexOf('<article class="mcard"');
  let t = H.element(H.FEED_STAGE, tmplStart);
  t = t.replace(/data-story="\d+"/, `data-story="${idx}"`);
  t = t.replace(/(background-image:url\(')[^']+('\))/, `$1${IMG[sid]}$2`);
  t = t.replace(/(<h3 class="mc-title">)[^<]*(<\/h3>)/, `$1${F.titles[sid]}$2`);
  t = t.replace(/(<p class="mc-desc">)[^<]*(<\/p>)/, `$1${F.descs[sid]}$2`);
  t = t.replace(/(<span class="tag-t">)Essential(<\/span>)/, `$1${F.tags[sid][0]}$2`);
  t = t.replace(/(<span class="tag-t">)(Society|Housing|Energy)(<\/span>)/, `$1${F.tags[sid][1]}$3`);
  t = t.replace(/(<span>)\d+ cards(<\/span>)/, `$1${cardCount} ${F.cardsWord}$2`);
  t = t.replace(/(<span>)1h ago(<\/span>)/, `$1${F.ago}$2`);
  t = t.replace(/(<span class="track-t">)Track(<\/span>)/, `$1${F.track}$2`);
  t = t.replace(/<div class="pagedots">[\s\S]*?<\/div>/, `<div class="pagedots">${dots}</div>`);
  const conf = STORIES[sid][lang].conf;
  t = t.replace(/(<span class="conf-word">)[^<]*(<\/span>)/, `$1${conf}$2`);
  if (conf === "Medium" || conf === "中") t = t.replace('conf-high', 'conf-med').replace('b-low on', 'b-low off');
  return t;
}
function feedStage(lang) {
  const F = FEED_TEXT[lang];
  let h = H.FEED_STAGE;
  h = h.replace(/(<div class="greeting"><h1>)[^<]*(<\/h1><div class="date">)[^<]*(<\/div>)/,
    `$1${F.greeting}$2<span data-today></span>$3`);
  h = h.replace(/(<div class="snap-head"><p>)[^<]*(<\/p>)/, `$1${F.snapTitle}$2`);
  h = h.replace(/(<span class="liveDot"><\/span><span>)[^<]*(<\/span>)/, `$1${F.now}$2`);
  h = h.replace(/(<p class="snap-lede">)[\s\S]*?(<\/p>)/, `$1${F.lede}$2`);
  h = h.replace(/<ul class="snap-list">[\s\S]*?<\/ul>/, `<ul class="snap-list">${F.bullets.map(b => `<li>${b}</li>`).join("")}</ul>`);
  h = h.replace(/(<span class="l">)[^<]*(<\/span><span class="r">)[^<]*(<\/span>)/, `$1${F.sources}$2${F.openSnap}$3`);
  h = h.replace(/(<div class="scrollcue" role="button">)([\s\S]*?)(<span>)[^<]*(<\/span>)/, `$1$2$3${F.cue}$4`);
  h = h.replace(/(<div class="section-title">)[^<]*(<\/div>)/, `$1${F.section}$2`);
  /* swap the 3 mcards for 4 generated ones */
  const first = h.indexOf('<article class="mcard"');
  let last = first, probe = first;
  while ((probe = h.indexOf('<article class="mcard"', probe + 1)) !== -1) last = probe;
  const lastEl = H.element(h, last);
  const cardsHtml = ORDER.map((sid, k) => {
    const story = STORIES[sid][lang];
    return mcard(lang, sid, k + 1, story.cards.length + 1);
  }).join("");
  h = h.slice(0, first) + cardsHtml + h.slice(last + lastEl.length);
  return h;
}

/* ---------- stages + overlays ---------- */
function storyStage(i, sid, lang) {
  const d = STORIES[sid][lang];
  const cards = [{ type: HERO_TYPE[sid], data: d.hero, conn: d.heroConn }].concat(d.cards);
  const next = i === 4 ? 1 : i + 1;
  const prev = i - 1; /* stage 1's prev is the feed (0) */
  return C.stage(i, {
    tag: d.tag, conf: d.conf, story: sid, voices: d.voices,
    tabs: d.tabs, nextTitle: d.nextTitle, next, prev,
    cards, newsCount: NEWS_COUNTS[i - 1]
  });
}
function overlayFor(i, lang) {
  const nextIdx = i === 4 ? 1 : i + 1;
  const nsid = ORDER[nextIdx - 1];
  const n = STORIES[nsid][lang];
  const after = STORIES[ORDER[(nextIdx === 4 ? 1 : nextIdx + 1) - 1]][lang];
  return C.overlay(i, {
    img: n.hero.img, title: n.hero.title.replace(/\s*\[he:[^\]]+\]\s*/g, " ").replace(/\s+/g, " ").trim(),
    paras: n.hero.paras, conn: n.ovConn || n.heroConn,
    tag: n.tag, conf: n.conf, count: NEWS_COUNTS[nextIdx - 1],
    tabs: n.tabs, nextTitle: n.nextTitle, story: nsid, voices: n.voices
  });
}

/* ---------- vsheet ---------- */
function vsheet(lang) {
  let h = H.SCRIM + H.VSHEET_FULL;
  const V = FEED_TEXT[lang].vsheet;
  if (!V) return h;
  h = h.replace(/(<div class="vs-title">)[^<]*(<\/div>)/, `$1${V.title}$2`);
  h = h.replace(/(<div class="vs-sub">)[^<]*(<\/div>)/, `$1${V.sub}$2`);
  for (const [key, name, desc] of V.rows) {
    h = h.replace(new RegExp(`(data-voice="${key}"[^>]*>\\s*<span class="vs-rt"><span class="vs-name">)[^<]*(</span><span class="vs-desc">)[^<]*(</span>)`),
      `$1${name}$2${desc}$3`);
  }
  return h;
}

/* ---------- appendix script: sheets + clock + date ---------- */
const APPENDIX = `
(function(){
  function openSheet(kind, sid){
    var fr = document.getElementById(kind);
    if(fr.getAttribute('data-for') !== sid){ fr.src = kind + '-' + sid + '.html'; fr.setAttribute('data-for', sid); }
    document.getElementById('layer-' + kind).classList.add('on');
  }
  document.querySelectorAll('.nf-conf[data-story]').forEach(function(el){
    el.style.cursor = 'pointer';
    el.addEventListener('click', function(){ openSheet('confidence', el.getAttribute('data-story')); });
  });
  document.querySelectorAll('[data-social][data-story]').forEach(function(el){
    el.addEventListener('click', function(){ openSheet('pulse', el.getAttribute('data-story')); });
  });
  window.addEventListener('message', function(e){
    var m = e.data || {};
    if(m.nf === 'close' && m.sheet) document.getElementById('layer-' + m.sheet).classList.remove('on');
  });
  var ZH = /^zh/i.test(document.documentElement.lang || '');
  function tick(){
    var d = new Date(), h = d.getHours(), m = d.getMinutes(), x = h % 12 === 0 ? 12 : h % 12;
    var s = x + ':' + (m < 10 ? '0' : '') + m;
    document.querySelectorAll('.time,.nf-time').forEach(function(n){ n.textContent = s; });
  }
  tick(); setInterval(tick, 10000); document.addEventListener('visibilitychange', tick);
  var W_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      W_ZH = ['日','一','二','三','四','五','六'],
      M_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var now = new Date();
  document.querySelectorAll('[data-today]').forEach(function(e){
    e.textContent = ZH ? (now.getMonth()+1) + '月' + now.getDate() + '日 星期' + W_ZH[now.getDay()]
                       : W_EN[now.getDay()] + ', ' + now.getDate() + ' ' + M_EN[now.getMonth()];
  });
})();`;

/* ---------- assemble ---------- */
const SPRITE = H.S.slice(0, H.S.indexOf('<div class="nf-frame"'));
const ENGINE = fs.readFileSync("src/engine.js", "utf8");
const APP_CSS = fs.readFileSync("src/app.css", "utf8");

const COUNTER_CSS = lang => `
/* 4-story counter overrides */
${[1, 2, 3, 4].map(i => `#stage-${i} .conn.end::after{content:"${lang === "zh" ? `第 ${i} / 15 篇讀畢` : `Story ${i} / 15 read`}"}`).join("\n")}
`;

function head(lang) {
  const zh = lang === "zh";
  return `<!DOCTYPE html>
<html lang="${zh ? "zh-Hant-HK" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NewsFlick</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@100..900&family=Noto+Sans+HK:wght@300..900&family=Noto+Serif+HK:wght@400..700&family=Source+Serif+4:opsz,wght@8..60,400..700&display=swap" rel="stylesheet">
<style>${APP_CSS}
${COUNTER_CSS(lang)}
/* nf-flush: inside the shell iframe the frame sits at 0,0 with no page chrome —
   v2 centered itself with body padding, which made the document 48px taller than
   the viewport and produced a root scrollbar on classic-scrollbar platforms */
html,body{height:100%;overflow:hidden}
body{display:block;padding:0;min-height:0}
.nf-frame{margin:0;border-radius:0;box-shadow:none}
/* nf-noscrollbars: simulated phone — never show scrollbars anywhere */
*{scrollbar-width:none;-ms-overflow-style:none}
*::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}
${zh ? `/* CJK: extend stacks */
body,.nf-frame{font-family:'Inter','Noto Sans HK',sans-serif}
.voice-calm .para,.voice-calm .conn-t{font-family:var(--serif),'Noto Serif HK',serif!important}` : ""}
</style>
</head>
<body>`;
}

function buildApp(lang) {
  const stages = ORDER.map((sid, k) => storyStage(k + 1, sid, lang)).join("\n");
  const overlays = [1, 2, 3, 4].map(i => overlayFor(i, lang)).join("\n");
  return head(lang) +
    SPRITE +
    `<div class="nf-frame" id="nf-frame">\n` +
    feedStage(lang) + "\n" + stages + "\n" + overlays + "\n" +
    vsheet(lang) + "\n" +
    `<div class="sheet-layer" id="layer-confidence"><iframe id="confidence"></iframe></div>\n` +
    `<div class="sheet-layer" id="layer-pulse"><iframe id="pulse"></iframe></div>\n` +
    `</div>\n<script>${ENGINE}</scr` + `ipt>\n<script>${APPENDIX}</scr` + `ipt>\n</body></html>`;
}

for (const lang of ["en", "zh"]) {
  const html = buildApp(lang);
  fs.writeFileSync(`${lang}/app.html`, html);
  console.log(`${lang}/app.html`, Math.round(html.length / 1024) + "KB");
}
