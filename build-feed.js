/* Build en/zh feed on the ORIGINAL feed UI (templates/{lang}/feed.html) with 4 story cards.
   Run: node build-feed.js */
const fs = require("fs");

const FEED = {
  en: {
    title: "NewsFlick · Feed",
    lede: ["Rules and market designs set years ago are quietly shaping the money, homes and freedoms people feel right now",
           "One closed strait, one landmark ban and two overheating markets are quietly repricing daily life"],
    bullets: [
      ["1998 energy market → today's higher winter bills", "Hormuz shut → oil past $140, day 12 of strikes"],
      ["Decades-old housing math → a generation still sharing flats at 34", "France draws the under-16 line → the world watches"],
      ["New age-line rules → a fight over who controls kids online", "50% tariffs land on Canada → prices follow"]],
    bullet4: "HK rents → steepest summer climb in a decade",
    sources: ["Across 14 sources", "Across 17 sources"],
    date: "Sunday, 19 July",
    cards: {
      s01: { title: ["Should under-16s lose social media?", "The strait that prices the world is closed"],
             desc: ["Governments want to bar under-16s from social accounts — but no one agrees if it protects kids or just pushes them somewhere worse.",
                    "Twelve days of strikes have shut the Strait of Hormuz for the first time in history — and no briefing will say how this ends."],
             tag: [">Society<", ">World<"], conf: ["Low", "Medium"], time: ["1h ago", 55], stories: ["5 Stories", "7 Stories"] },
      s02: { title: ["Flatsharing stopped being a phase", "France just drew the under-16 line"],
             desc: ["The share of 25–34s living with housemates has tripled in 20 years — for many it is no longer a stopgap but the plan.",
                    "The first blanket ban in the EU is law. Every other government is now watching one country run the experiment they debated."],
             tag: [">Housing<", ">Society<"], conf: null, time: ["3h ago", 130], stories: null },
      s03: { title: ["Your bill rose. You changed nothing.", "50% tariffs on Canada, effective now"],
             desc: ["Winter bills are about a fifth higher for the same usage — traced to a 1998 rule that lets gas set the price most of the time.",
                    "The steepest tariff wall between two allied economies in modern history — and the price effects arrive before the politics settle."],
             tag: [">Energy<", ">Economy<"], conf: null, time: ["5h ago", 200], stories: null },
      s04: { title: "HK rents: steepest summer climb in a decade",
             desc: "Rents rose almost 4% in six months. The squeeze is real, measurable — and mapped, district by district.",
             tag: ">Housing<", time: 320, stories: "5 Stories" }
    }
  },
  zh: {
    title: "NewsFlick · 主頁",
    lede: ["多年前訂下的規則與市場設計，正悄悄左右大家眼前的金錢、居所與自由",
           "一條封鎖的海峽、一道破天荒的禁令、兩個過熱的市場，正悄悄為日常生活重新定價"],
    bullets: [
      ["1998年電力市場改革 → 今日更貴的冬季電費", "霍爾木茲封鎖 → 油價升穿140美元，空襲第12日"],
      ["數十年前的住屋數學 → 一代人34歲仍在合租", "法國劃下16歲界線 → 全世界都在看"],
      ["新的年齡界線 → 誰來管孩子上網的爭議", "50%關稅落在加拿大 → 物價隨後就到"]],
    bullet4: "香港租金 → 十年最急夏季升浪",
    sources: ["綜合14個來源", "綜合17個來源"],
    date: "7月19日 星期日",
    cards: {
      s01: { title: ["16歲以下應否禁用社交媒體？", "為全球定價的海峽，封了"],
             desc: ["多國政府擬禁止16歲以下開設社交帳戶——但這究竟是保護孩子，還是把他們推向更差的角落，各方莫衷一是。",
                    "十二日空襲令霍爾木茲海峽史上首次封鎖——而沒有一場簡報肯講這一切如何收科。"],
             tag: [">社會<", ">國際<"], conf: ["低", "中"], time: ["1小時前", 55], stories: ["5篇報道", "7篇報道"] },
      s02: { title: ["合租不再是過渡期", "法國劃下16歲那條線"],
             desc: ["25至34歲與室友合住的比例二十年間增至三倍——對許多人而言，這已不是權宜之計，而是人生計劃。",
                    "歐盟首個全面禁令正式成法。其他政府辯論多年的實驗，如今由一個國家親身示範。"],
             tag: [">房屋<", ">社會<"], conf: null, time: ["3小時前", 130], stories: null },
      s03: { title: ["電費升了，你甚麼都沒改過。", "對加拿大徵50%關稅，即時生效"],
             desc: ["用電如常，冬季電費卻貴了約兩成——元兇是1998年一條讓天然氣大部分時間話事的定價規則。",
                    "近代史上盟友之間最高的關稅牆——價格效應比政治結果更快到埗。"],
             tag: [">能源<", ">經濟<"], conf: null, time: ["5小時前", 200], stories: null },
      s04: { title: "香港租金：十年最急夏季升浪",
             desc: "半年租金升近4%。壓力真實、有數可計——而且逐區畫在地圖上。",
             tag: ">房屋<", time: 320, stories: "5篇報道" }
    }
  }
};

const DATE_JS = lang => `<script>
(function(){var ZH=${lang === "zh"};
function ago(m){if(m<60)return ZH?m+"分鐘前":m+"m ago";var h=Math.round(m/60);if(h<24)return ZH?h+"小時前":h+"h ago";var d=Math.round(h/24);return ZH?d+"日前":d+"d ago";}
var W_EN=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],W_ZH=["日","一","二","三","四","五","六"],M_EN=["January","February","March","April","May","June","July","August","September","October","November","December"];
var now=new Date();
document.querySelectorAll("[data-ago]").forEach(function(e){e.textContent=ago(+e.getAttribute("data-ago")||1);});
document.querySelectorAll("[data-today]").forEach(function(e){e.textContent=ZH?(now.getMonth()+1)+"月"+now.getDate()+"日 星期"+W_ZH[now.getDay()]:W_EN[now.getDay()]+", "+now.getDate()+" "+M_EN[now.getMonth()];});
})();
<\/script>`;

function one(h, from, to, file) {
  const n = h.split(from).length - 1;
  if (n !== 1) throw new Error(`expected 1 occurrence of "${String(from).slice(0, 50)}" in ${file}, found ${n}`);
  return h.replace(from, to);
}

let count = 0;
for (const lang of ["en", "zh"]) {
  const F = FEED[lang];
  const file = `templates/${lang}/feed.html`;
  let h = fs.readFileSync(file, "utf8");

  h = h.replace(/<title>[^<]*<\/title>/, `<title>${F.title}</title>`);
  h = one(h, F.lede[0], F.lede[1], file);
  for (const [a, b] of F.bullets) h = one(h, a, b, file);
  h = one(h, F.sources[0], F.sources[1], file);
  h = one(h, `>${F.date}<`, ` data-today><`, file).replace(`class="date" data-today>`, `class="date" data-today>`);
  // fix the date div opening tag mangled by the swap above
  h = h.replace(/<div class="date"([^>]*)\sdata-today></, `<div class="date" data-today><`);

  /* per-card scoped transforms */
  const arts = [...h.matchAll(/<article class="mcard" data-story="(s0\d)">[\s\S]*?<\/article>/g)];
  if (arts.length !== 3) throw new Error("expected 3 articles, got " + arts.length);
  let rebuilt = h;
  for (const m of arts) {
    const id = m[1]; let a = m[0]; const c = F.cards[id];
    a = one(a, c.title[0], c.title[1], id);
    a = one(a, c.desc[0], c.desc[1], id);
    a = one(a, c.tag[0], c.tag[1], id);
    if (c.conf) {
      a = one(a, `>${c.conf[0]}<`, `>${c.conf[1]}<`, id);
      a = a.replace("conf-slate", "conf-med").replace("b-mid off", "b-mid on");
    }
    a = one(a, `<span>${c.time[0]}</span>`, `<span data-ago="${c.time[1]}"></span>`, id);
    if (c.stories) a = one(a, c.stories[0], c.stories[1], id);
    rebuilt = rebuilt.replace(m[0], a);
  }
  h = rebuilt;

  /* clone s03 article -> s04 */
  const s03m = h.match(/<article class="mcard" data-story="s03">[\s\S]*?<\/article>/);
  const c4 = F.cards.s04;
  let a4 = s03m[0].replace('data-story="s03"', 'data-story="s04"').replace("media--s03", "media--s04");
  a4 = one(a4, F.cards.s03.title[1], c4.title, "s04");
  a4 = one(a4, F.cards.s03.desc[1], c4.desc, "s04");
  a4 = one(a4, F.cards.s03.tag[1], c4.tag, "s04");
  a4 = a4.replace(/data-ago="\d+"/, `data-ago="${c4.time}"`);
  a4 = one(a4, lang === "en" ? "6 Stories" : "6篇報道", c4.stories, "s04");
  a4 = a4.replace(lang === "en" ? ">Essential<" : ">必讀<", lang === "en" ? ">Local<" : ">本地<");
  h = h.replace(s03m[0], s03m[0] + "\n      " + a4);

  /* 4th snapshot bullet */
  const li3 = `<li>${F.bullets[2][1]}</li>`;
  h = one(h, li3, li3 + `<li>${F.bullet4}</li>`, file);

  /* nav pill count 3 -> 4 */
  h = h.replace(/(<div class="pill news">[\s\S]*?<span>)3(<\/span>)/, "$14$2");

  /* media images: override the three data-URI backgrounds + add s04 */
  const mediaCss = `<style>
.media--s01{background-image:url(../assets/img/hero-hormuz.svg)!important}
.media--s02{background-image:url(../assets/img/hero-teens.jpg)!important}
.media--s03{background-image:url(../assets/img/hero-tariffs.svg)!important}
.media--s04{background-image:url(../assets/img/hero-flatshare.jpg)!important}
</style>`;
  h = h.replace("</body>", mediaCss + DATE_JS(lang) + "\n</body>");

  fs.writeFileSync(`${lang}/feed.html`, h);
  count++;
}
console.log("built", count, "feeds on original UI");
