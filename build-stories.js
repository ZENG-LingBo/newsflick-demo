/* Build the 8 story pages by transplanting new content into the ORIGINAL demo UI.
   Base: templates/{en,zh}/s02.html (original decoded page — chrome, CSS, popover engine).
   Run: node build-stories.js */
const fs = require("fs");

const T = {
  en: fs.readFileSync("templates/en/s02.html", "utf8"),
  zh: fs.readFileSync("templates/zh/s02.html", "utf8"),
};

/* ---------- original-idiom helpers ---------- */
const CONN = t => `<div class="connector"><div class="rail"><div class="rail-inner"><div class="before"><div class="bar"></div></div><div class="node"><svg class="ico"><use href="#ic-arrow-down-01"/></svg></div><div class="after"><div class="bar"></div></div></div></div><div class="txt"><p>${t}</p></div></div>`;
const CARD = (n, head, inner, conn) => `<div class="card-std" data-card="${n}"><div class="card-body"><div class="section-heading"><p>${head}</p></div>${inner}</div>${conn ? CONN(conn) : ""}</div>`;
const P = html => `<div class="paragraph">${html}</div>`;
const I = t => `<span class="inline">${t}</span>`;
const CHIP = (cls, t) => `<span class="inline inline--${cls}">${t}${cls === "keyword" ? "" : `<svg class="ico"><use href="#ic-${cls}"/></svg>`}</span>`;
const HERO = (img, title, paras, conn) => `<div class="card-story" data-card="0"><div class="hero"><div class="img" style="background:#141613 url(${img}) center/cover no-repeat"><div class="scrim"></div><div class="titlewrap"><div class="title">${title.map(l => `<p>${l}</p>`).join("")}</div></div></div></div><div class="card-wrap"><div class="card-content"><div class="stack-12">${paras.join("")}</div></div>${CONN(conn)}</div></div>`;
const METRIC = (fig, txt, size) => `<div class="metric metric--row"><p class="fig" style="font-size:${size || 34}px;line-height:1;white-space:nowrap">${fig}</p><p class="mtxt">${txt}</p></div>`;
const QUOTE = (n, head, q, av, nm, role, view, conn) => CARD(n, head, `<div class="li" style="width:100%;gap:16px;overflow:hidden"><div class="li-quote" style="gap:16px"><div class="quoteblock"><p class="mark">“</p><div class="q">${q.map(l => `<p>${l}</p>`).join("")}</div></div><div class="voice"><div class="av"><img src="${av}" alt=""></div><div class="txt"><div class="nm"><p>${nm}</p></div><p class="role">${role}</p></div></div><p class="viewsource">${view}</p></div></div>`, conn);
const STATS = cells => `<div class="k-stats">${cells.map(c => `<div class="s"><b>${c[0]}</b><span>${c[1]}</span></div>`).join("")}</div>`;
const TL = (chips, rows) => `<div class="k-schips">${chips.map((c, i) => `<span class="${i === 0 ? "on" : ""}">${i === 0 ? "<i></i>" : ""}${c}</span>`).join("")}</div><div class="k-tl">${rows.map(r => `<div class="r"><span class="t">${r[0]}</span><span class="d"></span><span class="x">${r[1]}</span></div>`).join("")}</div>`;
const ACTORS = rows => `<div class="k-actors">${rows.map(r => `<div class="a"><span class="avi">${r[0]}</span><span class="who"><b>${r[1]}</b><span>${r[2]}</span></span><span class="tag tag--${r[3]}">${r[4]}</span></div>`).join("")}</div>`;
const RISK = rows => `<div class="k-risk">${rows.map(r => `<div class="r"><span class="lv lv--${r[0]}">${r[1]}</span><span class="rt"><b>${r[2]}</b><span>${r[3]}</span></span></div>`).join("")}</div>`;
const SIG = rows => `<div class="k-sigs" data-animate>${rows.map(r => `<div class="k-sig${r[3] ? " hot" : ""}" data-pct="${r[0]}"><svg viewBox="0 0 44 44"><circle class="tr" cx="22" cy="22" r="18"/><circle class="vl" cx="22" cy="22" r="18"/></svg><span class="sb"><b>${r[1]}</b><span class="note">${r[2]}</span></span><b class="pc">${r[0]}%</b></div>`).join("")}</div>`;
const POLL = rows => `<div class="k-poll" data-animate>${rows.map((r, i) => `<div class="pr${i === 1 ? " alt" : ""}" data-count="${r[3]}"><span class="pt"><span>${r[0]}</span><b class="pv" data-pct="${r[1]}%">${r[1]}%</b></span><span class="tk"><i style="--v:${r[1]}%"></i></span><span class="pc2">${r[2]}</span></div>`).join("")}</div>`;
const CHART = (goalPct, goalLabel, cols, xlabels) => `<div class="k-chart" data-animate><div class="gl" style="bottom:${32 + Math.round(goalPct * 1.68)}px"><em>${goalLabel}</em></div><div class="cols">${cols.map(c => `<button type="button" class="c" data-x="${c[1]}" data-val="${c[2]}"><i style="height:${c[0]}%"></i></button>`).join("")}</div><div class="xl">${xlabels.map(x => `<span>${x}</span>`).join("")}</div></div>`;
const MAP = (key, schem, legend, attr) => `<div class="k-map"><div class="k-mapbox" data-map="${key}">${schem}<div class="k-maplive"></div></div><div class="k-leg">${legend.map(l => `<span><i style="background:${l[0]}"></i>${l[1]}</span>`).join("")}</div><p class="k-attr">${attr}</p></div>`;
const GROUND = (rows, tiles) => `<div class="k-ground">${rows.map(r => `<div class="d"><b>${r[0]}</b><p>${r[1]}</p></div>`).join("")}<div class="strip">${tiles.map(t => `<span style="background:${t}"></span>`).join("")}</div></div>`;

const SCHEM_GULF = `<svg class="k-schem" viewBox="0 0 335 239" xmlns="http://www.w3.org/2000/svg"><rect width="335" height="239" fill="#dfe7ea"/><path d="M0 0 H335 V70 C300 82 270 72 244 92 C222 108 200 100 178 112 C150 126 118 112 84 120 C50 128 20 118 0 108 Z" fill="#eceeea"/><path d="M0 239 H335 V196 C310 184 288 194 266 182 C246 172 226 182 202 174 C172 164 140 182 104 176 C70 170 30 184 0 178 Z" fill="#eceeea"/><circle cx="130" cy="66" r="6" fill="#800080" opacity=".55"/><circle cx="175" cy="88" r="5" fill="#800080" opacity=".5"/><circle cx="228" cy="118" r="6" fill="#800080" opacity=".55"/><rect x="206" y="140" width="12" height="12" transform="rotate(45 212 146)" fill="#ec4837" stroke="#fff" stroke-width="2"/></svg>`;
const SCHEM_HK = `<svg class="k-schem" viewBox="0 0 335 239" xmlns="http://www.w3.org/2000/svg"><rect width="335" height="239" fill="#dfe7ea"/><path d="M0 0 H335 V60 C300 76 262 66 230 84 C204 98 170 90 140 100 C104 112 60 100 0 116 Z" fill="#eceeea"/><path d="M40 239 C80 210 140 224 200 206 C250 192 300 210 335 198 V239 Z" fill="#eceeea"/><circle cx="168" cy="120" r="7" fill="#800080" opacity=".6"/><circle cx="196" cy="96" r="6" fill="#800080" opacity=".5"/><circle cx="230" cy="140" r="6" fill="#800080" opacity=".5"/><circle cx="90" cy="104" r="5" fill="#800080" opacity=".4"/></svg>`;

/* ---------- shared per-language bits ---------- */
const ATTR = "© OpenStreetMap contributors © CARTO";
const MAPS = {
  gulf: {
    center: [30.8, 53.6], zoom: 5,
    zones: {
      en: [
        [[33.72, 51.72], 60, "Natanz province", "Repeated strikes on enrichment-linked sites through the first week."],
        [[32.65, 51.67], 50, "Isfahan province", "Industrial and air-defence targets; heaviest single night on day 9."],
        [[27.18, 56.28], 45, "Bandar Abbas", "Port facilities hit today — the closest strikes yet to the strait."],
        [[29.6, 52.5], 55, "Fars province", "Command and radar infrastructure struck across days 4–11."],
        [[35.7, 51.4], 50, "Tehran province", "Leadership and communications targets from day one."]],
      zh: [
        [[33.72, 51.72], 60, "納坦茲一帶", "首週起多次空襲濃縮相關設施。"],
        [[32.65, 51.67], 50, "伊斯法罕省", "工業及防空目標；第9晚攻勢最猛烈。"],
        [[27.18, 56.28], 45, "阿巴斯港", "今日港口設施被擊中——迄今最貼近海峽的一輪。"],
        [[29.6, 52.5], 55, "法爾斯省", "第4至11日間指揮及雷達設施接連被擊中。"],
        [[35.7, 51.4], 50, "德黑蘭省", "首日起針對指揮及通訊目標。"]]
    },
    points: {
      en: [[[26.6, 56.25], "Strait of Hormuz", "Closed to commercial shipping. A fifth of the world's oil normally passes through this channel."]],
      zh: [[[26.6, 56.25], "霍爾木茲海峽", "已對商船封閉。全球五分之一的石油平日取道此處。"]]
    }
  },
  hk: {
    center: [22.36, 114.13], zoom: 10,
    zones: {
      en: [
        [[22.306, 114.185], 2.2, "Hung Hom / Ho Man Tin", "+6.2% H1 — student influx around the universities; queues at walk-up viewings."],
        [[22.312, 114.263], 2.5, "Tseung Kwan O", "+5.3% H1 — new-town supply absorbed faster than completions."],
        [[22.382, 114.19], 2.5, "Sha Tin / Tai Wai", "+4.8% H1 — rail-line demand from cross-boundary commuters."],
        [[22.284, 114.22], 2.2, "Island East", "+4.1% H1 — returning expat leases concentrated here."],
        [[22.39, 113.973], 2.6, "Tuen Mun", "+2.9% H1 — the lagging district agents expect to move next."]],
      zh: [
        [[22.306, 114.185], 2.2, "紅磡／何文田", "上半年+6.2%——大學周邊學生湧入，唐樓睇樓要排隊。"],
        [[22.312, 114.263], 2.5, "將軍澳", "上半年+5.3%——新市鎮供應被吸納的速度快過落成。"],
        [[22.382, 114.19], 2.5, "沙田／大圍", "上半年+4.8%——鐵路沿線受跨境通勤需求帶動。"],
        [[22.284, 114.22], 2.2, "港島東", "上半年+4.1%——回流外派租約集中於此。"],
        [[22.39, 113.973], 2.6, "屯門", "上半年+2.9%——暫時落後，代理估計下一浪到此。"]]
    },
    points: {
      en: [[[22.306, 114.185], "Steepest: Hung Hom", "+6.2% in six months — the fastest district climb since 2016."]],
      zh: [[[22.306, 114.185], "升幅最急：紅磡", "半年+6.2%——2016年以來最快的地區升幅。"]]
    }
  }
};

/* ======================= STORY DEFINITIONS ======================= */
const S = {};

/* ---------- s01 Hormuz ---------- */
S.s01 = {
  en: {
    title: "NewsFlick · The strait is closed", kicker: "US–Iran conflict · Day 12", lvl: "Medium", confBg: null,
    voices: "54 Voices", nextId: "s02", nextV: "France just drew the under-16 line",
    tabs: ["The Story", "Key Facts", "Timeline", "Map", "Risk", "Signal", "Expert View"],
    mapKey: "gulf",
    cards: [
      HERO("../assets/img/hero-hormuz.svg",
        ["The strait that", "prices the world", "is closed."],
        [P(I("Twelve days of strikes have hit ") + CHIP("confirmed", "more than 5,000 targets") + I(" across Iran, and the response has shut the ") + CHIP("keyword", "Strait of Hormuz") + I(" — the channel a fifth of the world's oil passes through.")),
         P(I("Officials describe the campaign as pressure. What no briefing has offered is ") + CHIP("analysis", "any description of how it ends") + I("."))],
        "The numbers behind the campaign are not in dispute. Almost everything else is."),
      CARD(1, "Key Facts",
        STATS([["900+", "strikes"], ["5,000+", "targets"], ["1,255", "deaths*"]]) +
        P(I("The ") + CHIP("confirmed", "Strait of Hormuz has closed") + I(" to commercial shipping — the first full closure in its history.")) +
        P(I("*The death toll is ") + CHIP("disputed", "disputed") + I(": the two sides' counts are roughly three thousand apart.")) +
        P(I("The stated objective has shifted from nuclear sites to ") + CHIP("analysis", "“restoring deterrence”") + I(".")),
        "What happened today, hour by hour…"),
      CARD(2, "Timeline",
        TL(["Breaking", "Developing"], [
          ["06:40", "Tanker traffic at zero for a seventh day; insurers suspend Gulf transit cover entirely."],
          ["09:15", "Strikes reported near Bandar Abbas port facilities — the closest yet to the strait itself."],
          ["11:52", "Oman confirms a third round of quiet mediation “remains open”."],
          ["14:30", "Brent crude passes $140; shipping surcharges begin appearing in retail freight quotes."]]),
        "Where it is happening…"),
      CARD(3, "Map",
        MAP("gulf", SCHEM_GULF, [["#800080", "Strike zones"], ["#ec4837", "Chokepoint"]], ATTR) +
        P(I("Strikes cluster across five provinces. The pivotal point is the Strait of Hormuz, ") + CHIP("confirmed", "now closed") + I(".")),
        "What could happen next…"),
      CARD(4, "Risk",
        RISK([
          ["high", "High", "A prolonged closure", "Supply strain spreads to nearby markets within weeks; surcharges reach shelf prices."],
          ["med", "Medium", "The conflict widens", "One miscalculation pulls in a third party; the risk does not stay inside a border."],
          ["low", "Low", "Fuel supply disruption at home", "Strategic reserves cover the near term."]]),
        "What to watch for…"),
      CARD(5, "Signal",
        SIG([
          [72, "Pressure on shipping routes", "Insurance withdrawal is the leading indicator — it moved before every previous spike.", true],
          [38, "Talks resume via Oman", "The channel has produced three quiet contacts; collapsed is not the same as over.", false],
          [55, "Further strikes near nuclear sites", "The target list has drifted toward infrastructure over the past four days.", false]]) +
        P(`<span class="inline" style="color:var(--content-secondary);font-size:13px">Tap a signal to see why it is moving. Probabilities are model estimates, not predictions.</span>`),
        "One read worth hearing…"),
      QUOTE(6, "Expert View",
        ["Closing Hormuz hurts the", "closer as much as the", "closed-to. That is why it has", "never happened before."],
        "../assets/img/av-expert.jpg", "Dr Samira Kazemi", "Energy security analyst, Meridian Institute", "View source ↗", "")
    ],
    pop: {
      "more than 5,000 targets": { rows: [["Who confirmed it", "Independent satellite-imagery tallies and both sides' own claims align above the 5,000 mark."], ["Why we're sure", "Three separate counting methods agree on the scale, if not the detail."], ["Why it matters", "Scale is the one thing not in dispute — this is far beyond a limited operation."]], src: ["Meridian Institute", "Sentinel Imagery Group"] },
      "strait of hormuz": { def: "A 33km-wide channel between Iran and Oman — the only sea route out of the Persian Gulf. About a fifth of global oil and a third of seaborne LNG normally pass through it. It has never been fully closed before now." },
      "any description of how it ends": { rows: [["Whose view this is", "Analysts noting that twelve days of briefings have offered no timeline, conditions, or exit."], ["Why it's analysis, not fact", "'No stated endgame' is an observation about statements — not proof there is no plan."]], src: ["Meridian Institute"] },
      "strait of hormuz has closed": { rows: [["Who confirmed it", "Shipping-traffic data shows tanker transits at zero for seven days; insurers have withdrawn cover."], ["Why we're sure", "Transit data is measured independently of either government."], ["Why it matters", "A first-in-history closure is what turns a regional conflict into a global price event."]], src: ["Global shipping trackers", "Lloyd's-listed insurers"] },
      "disputed": { rows: [["What's disputed", "The civilian death toll: the two sides' counts differ by roughly three thousand."], ["Who says what", "Officials on each side publish figures that serve their case; independent monitors cannot reach the strike zones."], ["Why the gap exists", "No third party has ground access, so nobody can settle the number."]], src: ["UN casualty monitors"] },
      "“restoring deterrence”": { rows: [["Whose view this is", "The campaign's own spokespeople, whose stated aim has shifted from nuclear sites to a broader posture."], ["Why it's analysis, not fact", "A change in language is documented; what it means about intent is interpretation."]], src: ["Official briefings, days 1–12"] },
      "now closed": { rows: [["Who confirmed it", "Tanker-transit data at zero for seven days; both governments acknowledge the closure."], ["Why we're sure", "It is one of the few points on which all parties agree."], ["Why it matters", "Every price effect in this story flows from this single fact."]], src: ["Global shipping trackers"] }
    }
  },
  zh: {
    title: "NewsFlick · 海峽封鎖", kicker: "美伊衝突 · 第12日", lvl: "中", confBg: null,
    voices: "54把聲音", nextId: "s02", nextV: "法國劃下16歲那條線",
    tabs: ["本篇", "關鍵事實", "時序", "地圖", "風險", "訊號", "專家之言"],
    mapKey: "gulf",
    cards: [
      HERO("../assets/img/hero-hormuz.svg",
        ["為全球定價的", "海峽，封了。"],
        [P(I("十二日空襲，擊中伊朗境內") + CHIP("confirmed", "逾5,000個目標") + I("；報復之下，") + CHIP("keyword", "霍爾木茲海峽") + I("宣告封鎖——全球五分之一的石油，平日正是取道這條水道。")),
         P(I("官員把行動形容為「施壓」。但十二日以來，沒有任何一場簡報講過") + CHIP("analysis", "這一切如何收科") + I("。"))],
        "行動背後的數字並無爭議。其餘幾乎一切都有。"),
      CARD(1, "關鍵事實",
        STATS([["900+", "次空襲"], ["5,000+", "個目標"], ["1,255", "人死亡*"]]) +
        P(CHIP("confirmed", "霍爾木茲海峽已對商船封閉") + I("——歷史上首次全面封鎖。")) +
        P(I("*死亡數字") + CHIP("disputed", "仍有爭議") + I("：交戰雙方的統計相差約三千。")) +
        P(I("宣稱目標已由核設施轉為") + CHIP("analysis", "「重建威懾」") + I("。")),
        "今日事態，逐個鐘看……"),
      CARD(2, "時序",
        TL(["突發", "發展中"], [
          ["06:40", "油輪通航量連續第七日歸零；保險商全面暫停波斯灣航運承保。"],
          ["09:15", "阿巴斯港港口設施附近傳出空襲——是迄今最貼近海峽的一輪攻擊。"],
          ["11:52", "阿曼證實第三輪低調斡旋「渠道仍然打開」。"],
          ["14:30", "布蘭特期油升穿140美元；航運附加費開始出現在零售運費報價。"]]),
        "事發地點……"),
      CARD(3, "地圖",
        MAP("gulf", SCHEM_GULF, [["#800080", "空襲區"], ["#ec4837", "咽喉要道"]], ATTR) +
        P(I("空襲集中於五個省份。整場危機的支點，是") + CHIP("confirmed", "已經封鎖") + I("的霍爾木茲海峽。")),
        "接下來可能發生……"),
      CARD(4, "風險",
        RISK([
          ["high", "高", "封鎖持續", "供應壓力數星期內波及鄰近市場；附加費直達零售價。"],
          ["med", "中", "衝突擴大", "一次誤判就足以捲入第三方；這種風險不會乖乖留在國界之內。"],
          ["low", "低", "本地燃料供應中斷", "戰略儲備足以應付短期。"]]),
        "值得盯住的訊號……"),
      CARD(5, "訊號",
        SIG([
          [72, "航運路線壓力升溫", "保險商撤保是領先指標——過往每次油價急升之前，它都先行變動。", true],
          [38, "阿曼渠道重啟談判", "這條渠道已促成三次低調接觸；破裂不等於玩完。", false],
          [55, "再有核設施附近遭空襲", "過去四日，打擊目標明顯移向基礎設施。", false]]) +
        P(`<span class="inline" style="color:var(--content-secondary);font-size:13px">輕按訊號可查看變動原因。百分比屬模型估算，並非預測。</span>`),
        "一個值得一聽的解讀……"),
      QUOTE(6, "專家之言",
        ["封鎖霍爾木茲，傷封鎖者", "不亞於被封鎖者。", "所以歷史上從未發生。"],
        "../assets/img/av-expert.jpg", "Samira Kazemi博士", "能源安全分析師，Meridian研究所", "查看原文 ↗", "")
    ],
    pop: {
      "逾5,000個目標": { rows: [["由誰證實", "獨立衛星影像統計與交戰雙方各自公布的數字，同樣指向5,000以上。"], ["為何可信", "三種互不相干的點算方法，在規模上得出一致結論。"], ["為何重要", "規模是唯一無爭議的事實——這遠超一次有限度行動。"]], src: ["Meridian研究所", "Sentinel影像組織"] },
      "霍爾木茲海峽": { def: "伊朗與阿曼之間一條闊33公里的水道，是波斯灣唯一出海口。全球約五分之一的石油、三分之一的海運液化天然氣平日取道於此。此前從未全面封鎖。" },
      "這一切如何收科": { rows: [["這是誰的觀點", "分析者指出，十二日的簡報未曾提出時間表、條件或退場安排。"], ["為何屬分析而非事實", "「未講終局」是對言論的觀察——不等於證明沒有計劃。"]], src: ["Meridian研究所"] },
      "霍爾木茲海峽已對商船封閉": { rows: [["由誰證實", "航運交通數據顯示油輪通航量連續七日歸零；保險商已全面撤保。"], ["為何可信", "通航數據由第三方獨立量度，不受任何一方政府左右。"], ["為何重要", "歷史首次的封鎖，正是把地區衝突變成全球價格事件的一步。"]], src: ["全球航運追蹤機構", "勞合社承保商"] },
      "仍有爭議": { rows: [["爭議所在", "平民死亡數字：雙方統計相差約三千。"], ["各方說法", "兩邊官方各自公布對己有利的數字；獨立監察無法進入空襲區。"], ["分歧從何而來", "無第三方能實地核查，數字無從釐清。"]], src: ["聯合國傷亡監察"] },
      "「重建威懾」": { rows: [["這是誰的觀點", "行動方發言人；宣稱目標已由核設施轉為更廣泛的姿態。"], ["為何屬分析而非事實", "措辭改變有紀錄可查；它反映甚麼意圖，則屬解讀。"]], src: ["第1至12日官方簡報"] },
      "已經封鎖": { rows: [["由誰證實", "油輪通航數據連續七日歸零；兩國政府均承認封鎖。"], ["為何可信", "這是各方罕有一致同意的事實。"], ["為何重要", "本篇報道中每一個價格效應，都由這一項事實而起。"]], src: ["全球航運追蹤機構"] }
    }
  }
};

/* ---------- s02 France ---------- */
S.s02 = {
  en: {
    title: "NewsFlick · France's under-16 ban", kicker: "Under-16s and social media", lvl: "Medium", confBg: null,
    voices: "54 Voices", nextId: "s03", nextV: "50% tariffs on Canada, effective now",
    tabs: ["The Story", "Key Facts", "Who's Involved", "The Poll", "The Arguments", "Signal", "Expert View"],
    mapKey: null,
    cards: [
      HERO("../assets/img/hero-teens.jpg",
        ["France just drew", "the under-16", "line."],
        [P(I("France has become ") + CHIP("confirmed", "the first EU country") + I(" to pass a blanket ban on social media accounts for under-16s. Platforms get six months to ") + CHIP("keyword", "verify age") + I(" — or face fines of up to 4% of global turnover.")),
         P(I("Every government that debated this line is now watching one country ") + CHIP("analysis", "run the experiment") + I("."))],
        "The law is short. Its consequences are not."),
      CARD(1, "Key Facts",
        METRIC("16", "is the new age line. Six months to comply; fines up to 4% of global turnover.") +
        P(I("The law covers ") + CHIP("confirmed", "account holding, not viewing") + I(" — logged-out browsing stays legal.")) +
        P(I("How platforms verify age without ID-checking everyone is ") + CHIP("disputed", "unresolved") + I(".")) +
        P(I("Whether a ban makes teenagers safer ") + CHIP("disputed", "divides the research") + I(" it cites.")),
        "Who is driving this…"),
      CARD(2, "Who's Involved",
        ACTORS([
          ["FR", "French government", "Championed the bill through both chambers", "neutral", "Decider"],
          ["PL", "Major platforms", "Warn of “an identity checkpoint for everyone”", "against", "Opposed"],
          ["PA", "Parent associations", "Campaigned for the line for three years", "for", "Backer"],
          ["DR", "Digital-rights groups", "Say age checks break privacy for all ages", "against", "Opposed"]]),
        "Where people stand…"),
      CARD(3, "Where People Stand",
        POLL([
          ["Support the ban", 62, "Say the identity-forming years need protecting", "1,412 of 2,278 polled"],
          ["Oppose it", 31, "Say it pushes teens somewhere less visible, not safer", "707 of 2,278 polled"]]) +
        P(I("Tap a bar for raw counts. Polling was taken ") + CHIP("disputed", "before the enforcement rules were published") + I(".")),
        "The case each side makes…"),
      CARD(4, "The Arguments",
        `<div class="stats"><div class="args-col"><div class="args-lab args-lab--for"><p>For a ban</p></div><div class="args-stack"><div class="simple simple--positive"><div class="paragraph"><span class="inline">A feed built on comparison lands hardest when identity is least formed.</span></div></div><div class="simple simple--positive"><div class="paragraph"><span class="inline">A 12-year-old cannot consent to a trade they cannot understand.</span></div></div></div></div><div class="args-col"><div class="args-lab args-lab--against"><p>Against a ban</p></div><div class="args-stack"><div class="simple simple--negative"><div class="paragraph"><span class="inline">It removes a lifeline as well as a risk for isolated young people.</span></div></div><div class="simple simple--negative"><div class="paragraph"><span class="inline">Enforcement means age checks for every user of every age.</span></div></div></div></div></div>` +
        P(I("Neither side disputes that the old limit of 13 failed. The fight is over ") + CHIP("analysis", "what replaces it") + I(".")),
        "What to watch for…"),
      CARD(5, "Signal",
        SIG([
          [76, "VPN and workaround usage spikes", "Search interest in workarounds tripled the week the law passed.", true],
          [47, "Another EU country follows within a year", "Three governments have live bills; all cite the French text.", false],
          [58, "First platform fines within a year", "The regulator has said it will treat the six-month deadline as hard.", false]]),
        "One read worth hearing…"),
      QUOTE(6, "Expert View",
        ["The evidence points to harm", "from design — endless scroll,", "engagement loops — more than", "any single birthday threshold."],
        "../assets/img/av5.png", "Dr Priya Adeyemi", "Developmental psychologist, Meridian Institute", "View source ↗", "")
    ],
    pop: {
      "the first eu country": { rows: [["Who confirmed it", "The final vote passed both chambers; the law is promulgated."], ["Why we're sure", "The legislative record is public."], ["Why it matters", "A first mover turns a debate into an observable experiment."]], src: ["Journal Officiel", "EU press corps"] },
      "verify age": { def: "Checking a user really is the age they claim — usually via ID or a face-estimation scan — rather than trusting a typed birth date. It is the only way a ban can be enforced, and it applies to every user of every age." },
      "run the experiment": { rows: [["Whose view this is", "Policy analysts across the EU describing the ban as a natural experiment."], ["Why it's analysis, not fact", "Whether outcomes will transfer between countries is an assumption, not yet data."]], src: ["Meridian Institute"] },
      "account holding, not viewing": { rows: [["Who confirmed it", "The law's final text: the offence is providing an account, not the teenager's browsing."], ["Why we're sure", "The distinction is written in the statute."], ["Why it matters", "It shapes where under-16s actually go next — logged-out spaces with fewer protections."]], src: ["Journal Officiel"] },
      "unresolved": { rows: [["What's disputed", "How platforms can verify age without collecting IDs from the whole population."], ["Who says what", "The regulator promises 'privacy-preserving' checks; engineers say no proven scheme exists at this scale."], ["Why the gap exists", "The technical decree comes later — the law set the deadline first."]], src: ["CNIL statements", "Platform filings"] },
      "divides the research": { rows: [["What's disputed", "Whether banning accounts improves teenage wellbeing."], ["Who says what", "Both camps cite the same correlational studies and reach opposite conclusions."], ["Why the gap exists", "No country has enforced a ban long enough to produce outcome data — France will be first."]], src: ["Meridian Institute"] },
      "before the enforcement rules were published": { rows: [["What's disputed", "Whether support holds once people see what age checks require in practice."], ["Who says what", "Pollsters note support for bans typically falls when enforcement details land."], ["Why the gap exists", "The poll predates the technical decree."]], src: ["Polling house methodology note"] },
      "what replaces it": { rows: [["Whose view this is", "Policy analysts framing the debate as a choice of replacement, not a defence of the status quo."], ["Why it's analysis, not fact", "Both sides agree 13 failed; whether a ban is the right replacement is a judgement, not a settled outcome."]], src: ["Meridian Institute"] }
    }
  },
  zh: {
    title: "NewsFlick · 法國16歲以下禁令", kicker: "16歲以下與社交媒體", lvl: "中", confBg: null,
    voices: "54把聲音", nextId: "s03", nextV: "對加拿大貨品徵50%關稅",
    tabs: ["本篇", "關鍵事實", "持份者", "民意", "正反之爭", "訊號", "專家之言"],
    mapKey: null,
    cards: [
      HERO("../assets/img/hero-teens.jpg",
        ["法國劃下", "16歲", "那條線。"],
        [P(I("法國成為") + CHIP("confirmed", "歐盟首個") + I("全面禁止16歲以下持有社交媒體帳戶的國家。平台有六個月時間落實") + CHIP("keyword", "年齡核實") + I("——否則面臨最高全球營業額4%的罰款。")),
         P(I("辯論過這條線的每一個政府，如今都在看着一個國家") + CHIP("analysis", "親身做這場實驗") + I("。"))],
        "法例很短。它的後果不短。"),
      CARD(1, "關鍵事實",
        METRIC("16歲", "是新的年齡界線。六個月合規期；罰款最高達全球營業額4%。") +
        P(I("法例規管的是") + CHIP("confirmed", "持有帳戶，而非瀏覽") + I("——不登入照樣可以看。")) +
        P(I("如何核實年齡而毋須向全民查身份證明，") + CHIP("disputed", "仍未有答案") + I("。")) +
        P(I("禁令能否令青少年更安全，") + CHIP("disputed", "研究界一分為二") + I("。")),
        "誰在推動……"),
      CARD(2, "誰是持份者",
        ACTORS([
          ["法", "法國政府", "力推法案闖過兩院", "neutral", "決策者"],
          ["平", "大型平台", "警告將變成「全民身份關卡」", "against", "反對"],
          ["家", "家長組織", "為這條線奔走了三年", "for", "支持"],
          ["權", "數碼權益團體", "指年齡核查損害所有年齡層的私隱", "against", "反對"]]),
        "民意企喺邊……"),
      CARD(3, "民意所向",
        POLL([
          ["支持禁令", 62, "認為自我形成的關鍵年歲需要保護", "2,278人中1,412人"],
          ["反對", 31, "認為只會把青少年推向更隱蔽、而非更安全的角落", "2,278人中707人"]]) +
        P(I("輕按橫條可查看實際人數。民調在") + CHIP("disputed", "執行細則公布之前") + I("進行。")),
        "正反雙方的理據……"),
      CARD(4, "正反之爭",
        `<div class="stats"><div class="args-col"><div class="args-lab args-lab--for"><p>支持禁令</p></div><div class="args-stack"><div class="simple simple--positive"><div class="paragraph"><span class="inline">建基於比較的資訊流，對自我認同最未成形的人傷得最深。</span></div></div><div class="simple simple--positive"><div class="paragraph"><span class="inline">一個12歲小朋友，無法同意一項自己根本不能理解的交易。</span></div></div></div></div><div class="args-col"><div class="args-lab args-lab--against"><p>反對禁令</p></div><div class="args-stack"><div class="simple simple--negative"><div class="paragraph"><span class="inline">對孤立無援的年輕人，禁令拿走的不止風險，還有生命線。</span></div></div><div class="simple simple--negative"><div class="paragraph"><span class="inline">要執行禁令，就意味所有年齡的每一位用戶都要核實年齡。</span></div></div></div></div></div>` +
        P(I("雙方都不否認13歲那條舊線已經失效。爭的是") + CHIP("analysis", "用甚麼取代它") + I("。")),
        "值得盯住的訊號……"),
      CARD(5, "訊號",
        SIG([
          [76, "VPN及繞道用量急升", "法例通過那一週，規避方法的搜尋量升了三倍。", true],
          [47, "一年內另一歐盟國跟隨", "三個政府已有草案在議程上，全部引用法國文本。", false],
          [58, "一年內首張平台罰單", "監管機構已表明，六個月死線是硬指標。", false]]),
        "一個值得一聽的解讀……"),
      QUOTE(6, "專家之言",
        ["證據指向的是設計帶來的傷害", "——無限滾動、成癮迴圈——", "多於任何一條生日界線。"],
        "../assets/img/av5.png", "Priya Adeyemi博士", "發展心理學家，Meridian研究所", "查看原文 ↗", "")
    ],
    pop: {
      "歐盟首個": { rows: [["由誰證實", "法案已於兩院通過並正式頒布。"], ["為何可信", "立法紀錄公開可查。"], ["為何重要", "有了第一個行動者，辯論就變成一場可觀察的實驗。"]], src: ["法國政府公報", "歐盟駐地記者"] },
      "年齡核實": { def: "查證用戶申報的年齡屬實——通常靠身份證明文件或人臉年齡估算——而非單信一個自填的出生日期。這是禁令唯一的執行方法，並適用於所有年齡的每一位用戶。" },
      "親身做這場實驗": { rows: [["這是誰的觀點", "歐盟各地政策分析者把禁令形容為一場自然實驗。"], ["為何屬分析而非事實", "結果能否搬到別國，是假設，尚未有數據。"]], src: ["Meridian研究所"] },
      "持有帳戶，而非瀏覽": { rows: [["由誰證實", "法例定稿：違法的是提供帳戶，不是青少年瀏覽本身。"], ["為何可信", "這個區分白紙黑字寫在法律條文。"], ["為何重要", "它決定16歲以下實際會流向何處——不設登入、保護更少的空間。"]], src: ["法國政府公報"] },
      "仍未有答案": { rows: [["爭議所在", "平台如何核實年齡，而毋須向全民收集身份證明。"], ["各方說法", "監管機構承諾「保障私隱」的核查；工程師指這種規模下未有經驗證的方案。"], ["分歧從何而來", "技術細則後補——法律先定了死線。"]], src: ["法國資訊自由委員會聲明", "平台意見書"] },
      "研究界一分為二": { rows: [["爭議所在", "禁止帳戶能否改善青少年身心狀況。"], ["各方說法", "兩個陣營引用同一批相關性研究，得出相反結論。"], ["分歧從何而來", "未有國家執行禁令夠久、足以產生結果數據——法國將是第一個。"]], src: ["Meridian研究所"] },
      "執行細則公布之前": { rows: [["爭議所在", "一旦大家看清年齡核查實際要求甚麼，支持度會否維持。"], ["各方說法", "民調機構指出，執行細節出爐後，禁令支持度通常回落。"], ["分歧從何而來", "民調早於技術細則。"]], src: ["民調機構方法說明"] },
      "用甚麼取代它": { rows: [["這是誰的觀點", "政策分析者把辯論定性為「選擇替代方案」，而非「捍衛現狀」。"], ["為何屬分析而非事實", "雙方都同意13歲界線已失敗；禁令是否正確的替代方案，是判斷，不是定論。"]], src: ["Meridian研究所"] }
    }
  }
};

/* ---------- s03 Tariffs ---------- */
S.s03 = {
  en: {
    title: "NewsFlick · 50% tariffs on Canada", kicker: "US–Canada trade", lvl: "High", confBg: "#3f7a54",
    voices: "61 Voices", nextId: "s04", nextV: "HK rents: steepest summer in a decade",
    tabs: ["The Story", "Key Facts", "By the Numbers", "Who's Involved", "The Arguments", "Signal", "Expert View"],
    mapKey: null,
    cards: [
      HERO("../assets/img/hero-tariffs.svg",
        ["50% tariffs,", "between allies."],
        [P(I("The order is signed: ") + CHIP("confirmed", "50% tariffs on most Canadian goods") + I(", citing autos, alcohol and dairy. It is the steepest tariff wall between two allied economies in modern history.")),
         P(I("Ottawa calls it “economic coercion” and is ") + CHIP("developing", "drafting retaliation") + I(". The price effects will not wait for the politics."))],
        "The scale of what just changed…"),
      CARD(1, "Key Facts",
        STATS([["50%", "tariff rate"], ["$3.6B", "daily trade"], ["77%", "of exports go south"]]) +
        P(I("The rate applies to ") + CHIP("confirmed", "most goods categories") + I(", with energy carved out — for now.")) +
        P(I("Whether USMCA's dispute process even applies is ") + CHIP("disputed", "contested by both capitals") + I(".")) +
        P(I("Retailers say shelf-price effects land ") + CHIP("analysis", "within six to eight weeks") + I(".")),
        "How we got to 50…"),
      CARD(2, "By the Numbers",
        METRIC("50%", "average tariff on Canadian goods — up from 2% in January.", 30) +
        CHART(50, "2018 peak",
          [[4, "Jan", "2%"], [20, "Feb", "10%"], [24, "Mar", "12%"], [36, "Apr", "18%"], [44, "May", "22%"], [50, "Jun", "25%"], [100, "Jul", "50%"]],
          ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]) +
        `<p class="k-chartnote">Tap a column for the month's effective average rate. The dashed line marks the 2018 steel-dispute peak of 25% — this week's order doubles it.</p>`,
        "Who is driving this…"),
      CARD(3, "Who's Involved",
        ACTORS([
          ["WH", "The White House", "Signed the order Monday", "neutral", "Decider"],
          ["OT", "Ottawa", "Drafting counter-tariffs on US goods", "against", "Opposed"],
          ["AM", "US automakers", "Supply chains cross the border 7 times", "against", "Opposed"],
          ["SP", "Steel producers", "Long sought protection at this level", "for", "Backer"]]),
        "The case each side makes…"),
      CARD(4, "The Arguments",
        `<div class="stats"><div class="args-col"><div class="args-lab args-lab--for"><p>For the tariffs</p></div><div class="args-stack"><div class="simple simple--positive"><div class="paragraph"><span class="inline">Canada has “unfairly discriminated” against US autos, alcohol and dairy for years.</span></div></div><div class="simple simple--positive"><div class="paragraph"><span class="inline">Leverage now forces a better deal faster than another decade of panels.</span></div></div></div></div><div class="args-col"><div class="args-lab args-lab--against"><p>Against</p></div><div class="args-stack"><div class="simple simple--negative"><div class="paragraph"><span class="inline">A tax on your closest supply chain is a tax on your own factories.</span></div></div><div class="simple simple--negative"><div class="paragraph"><span class="inline">Households pay first: an estimated $2,400 a year per US family.</span></div></div></div></div></div>` +
        P(I("Both sides accept one thing: integrated industries ") + CHIP("analysis", "cannot re-shore in a single season") + I(".")),
        "What to watch for…"),
      CARD(5, "Signal",
        SIG([
          [81, "Canadian retaliation list expands", "Ottawa's draft already covers $30B in US goods; provincial premiers want more.", true],
          [63, "Pass-through visible in next CPI print", "Groceries and autos move first; the affected basket is a fifth of the index.", false],
          [44, "Emergency USMCA talks convene", "Mexico has quietly signalled it would host; neither principal has agreed.", false]]),
        "One read worth hearing…"),
      QUOTE(6, "Expert View",
        ["Tariff walls between integrated", "economies don't relocate factories.", "They relocate margins — from", "households to customs receipts."],
        "../assets/img/av2.png", "Prof Elena Marsh", "Trade economist, Fennwick School", "View source ↗", "")
    ],
    pop: {
      "50% tariffs on most canadian goods": { rows: [["Who confirmed it", "The signed executive order, published Monday, with the schedule of covered categories."], ["Why we're sure", "The text is public; the rate and coverage are not in dispute."], ["Why it matters", "Rates define everything downstream — retaliation, prices, and the legal fight."]], src: ["Federal Register", "Fennwick School"] },
      "drafting retaliation": { rows: [["What's developing", "Ottawa has confirmed counter-tariffs are being drafted but has not published the list."], ["Who says what", "Federal officials signal $30B in US goods; provinces are pushing for more."], ["Why it's still open", "Nothing is law until the list is gazetted."]], src: ["Government of Canada statements"] },
      "most goods categories": { rows: [["Who confirmed it", "The order's published schedule covers the large majority of trade lines."], ["Why we're sure", "Coverage can be read directly from the schedule against trade data."], ["Why it matters", "A near-blanket rate behaves differently from targeted tariffs — there is nowhere to reroute."]], src: ["Federal Register"] },
      "contested by both capitals": { rows: [["What's disputed", "Whether USMCA's dispute-resolution process applies to an order invoked on national-security grounds."], ["Who says what", "Ottawa says the pact plainly applies; Washington says the carve-out puts it outside the pact."], ["Why the gap exists", "The carve-out has never been tested at this scale."]], src: ["USMCA text", "Trade-law scholars"] },
      "within six to eight weeks": { rows: [["Whose view this is", "Retail and logistics analysts tracking inventory cycles."], ["Why it's analysis, not fact", "Pass-through speed depends on inventories and contracts; the range is an estimate, not a record."]], src: ["Fennwick School", "Retail industry groups"] },
      "cannot re-shore in a single season": { rows: [["Whose view this is", "Industry economists on both sides of the argument."], ["Why it's analysis, not fact", "Re-shoring timelines are projections from past cases, not a law of nature."]], src: ["Fennwick School"] }
    }
  },
  zh: {
    title: "NewsFlick · 對加拿大徵50%關稅", kicker: "美加貿易", lvl: "高", confBg: "#3f7a54",
    voices: "61把聲音", nextId: "s04", nextV: "香港租金十年最急夏季升浪",
    tabs: ["本篇", "關鍵事實", "數字看門道", "持份者", "正反之爭", "訊號", "專家之言"],
    mapKey: null,
    cards: [
      HERO("../assets/img/hero-tariffs.svg",
        ["盟友之間，", "50%關稅。"],
        [P(I("行政命令已簽署：") + CHIP("confirmed", "對大部分加拿大貨品徵收50%關稅") + I("，點名汽車、酒類及乳製品。這是近代史上兩個盟友經濟體之間最高的關稅牆。")),
         P(I("渥太華斥之為「經濟脅迫」，正") + CHIP("developing", "草擬反制清單") + I("。但價格效應不會等政治先埋單。"))],
        "剛剛改變的規模有多大……"),
      CARD(1, "關鍵事實",
        STATS([["50%", "關稅稅率"], ["36億", "美元日均貿易額"], ["77%", "出口輸往美國"]]) +
        P(I("稅率適用於") + CHIP("confirmed", "絕大部分貨品類別") + I("，能源暫獲豁免——暫時而已。")) +
        P(I("《美墨加協定》的爭端機制是否適用，") + CHIP("disputed", "兩國各執一詞") + I("。")) +
        P(I("零售商估計，貨架價格效應") + CHIP("analysis", "六至八星期內浮現") + I("。")),
        "50%是怎樣煉成的……"),
      CARD(2, "數字看門道",
        METRIC("50%", "對加拿大貨品的平均關稅——1月時僅為2%。", 30) +
        CHART(50, "2018年高位",
          [[4, "1月", "2%"], [20, "2月", "10%"], [24, "3月", "12%"], [36, "4月", "18%"], [44, "5月", "22%"], [50, "6月", "25%"], [100, "7月", "50%"]],
          ["1月", "2月", "3月", "4月", "5月", "6月", "7月"]) +
        `<p class="k-chartnote">輕按柱形可查看該月的實際平均稅率。虛線標示2018年鋼鋁爭端的25%高位——本週的命令直接翻倍。</p>`,
        "誰在推動……"),
      CARD(3, "誰是持份者",
        ACTORS([
          ["白宮", "白宮", "週一簽署行政命令", "neutral", "決策者"],
          ["渥", "渥太華", "正草擬對美反制關稅", "against", "反對"],
          ["車", "美國車廠", "供應鏈平均跨境七次才成車", "against", "反對"],
          ["鋼", "鋼鐵業", "爭取這種保護水平已有多年", "for", "支持"]]),
        "正反雙方的理據……"),
      CARD(4, "正反之爭",
        `<div class="stats"><div class="args-col"><div class="args-lab args-lab--for"><p>支持關稅</p></div><div class="args-stack"><div class="simple simple--positive"><div class="paragraph"><span class="inline">加拿大多年來對美國汽車、酒類及乳製品「不公平歧視」。</span></div></div><div class="simple simple--positive"><div class="paragraph"><span class="inline">即時施壓，好過再拖十年的仲裁小組。</span></div></div></div></div><div class="args-col"><div class="args-lab args-lab--against"><p>反對</p></div><div class="args-stack"><div class="simple simple--negative"><div class="paragraph"><span class="inline">向自己最緊密的供應鏈徵稅，等於向自己的工廠徵稅。</span></div></div><div class="simple simple--negative"><div class="paragraph"><span class="inline">住戶首當其衝：估計每個美國家庭每年多付2,400美元。</span></div></div></div></div></div>` +
        P(I("雙方都承認一件事：深度融合的產業，") + CHIP("analysis", "不可能一季之內搬回本土") + I("。")),
        "值得盯住的訊號……"),
      CARD(5, "訊號",
        SIG([
          [81, "加方反制清單擴大", "渥太華的草案已涵蓋300億美元美國貨品；各省省長還想加碼。", true],
          [63, "下期CPI現轉嫁跡象", "食品與汽車最先變動；受影響籃子佔整個指數五分之一。", false],
          [44, "《美墨加協定》緊急會談", "墨西哥已暗示願意作東；兩位主角未有一位點頭。", false]]),
        "一個值得一聽的解讀……"),
      QUOTE(6, "專家之言",
        ["在深度融合的經濟體之間", "築關稅牆，搬不動工廠，", "只搬得動利潤——由家庭荷包，", "搬去海關帳目。"],
        "../assets/img/av2.png", "Elena Marsh教授", "貿易經濟學者，Fennwick學院", "查看原文 ↗", "")
    ],
    pop: {
      "對大部分加拿大貨品徵收50%關稅": { rows: [["由誰證實", "週一刊憲的行政命令正文，連同受涵蓋類別清單。"], ["為何可信", "文本已公開；稅率與範圍並無爭議。"], ["為何重要", "稅率決定下游一切——反制、價格，以至法律戰。"]], src: ["聯邦公報", "Fennwick學院"] },
      "草擬反制清單": { rows: [["發展中", "渥太華證實正草擬反制關稅，但清單未公布。"], ["各方說法", "聯邦官員放風涵蓋300億美元美國貨品；各省要求加碼。"], ["為何未定", "清單刊憲之前，一切未成法律。"]], src: ["加拿大政府聲明"] },
      "絕大部分貨品類別": { rows: [["由誰證實", "命令附表覆蓋絕大多數貿易項目。"], ["為何可信", "把附表對照貿易數據，覆蓋面一目了然。"], ["為何重要", "近乎全面的稅率與針對性關稅性質迥異——根本無路可繞。"]], src: ["聯邦公報"] },
      "兩國各執一詞": { rows: [["爭議所在", "以國家安全為由頒布的命令，是否受《美墨加協定》爭端機制約束。"], ["各方說法", "渥太華指協定明顯適用；華府稱安全豁免令其置身協定之外。"], ["分歧從何而來", "這條豁免條款從未在如此規模下被考驗。"]], src: ["《美墨加協定》文本", "貿易法學者"] },
      "六至八星期內浮現": { rows: [["這是誰的觀點", "追蹤庫存周期的零售及物流分析師。"], ["為何屬分析而非事實", "轉嫁速度取決於庫存與合約；區間是估算，不是紀錄。"]], src: ["Fennwick學院", "零售業組織"] },
      "不可能一季之內搬回本土": { rows: [["這是誰的觀點", "爭論兩邊的產業經濟學者。"], ["為何屬分析而非事實", "回流時間表是按過往案例的推算，不是自然定律。"]], src: ["Fennwick學院"] }
    }
  }
};

/* ---------- s04 HK rents ---------- */
S.s04 = {
  en: {
    title: "NewsFlick · HK rents surge", kicker: "Hong Kong · Rental market", lvl: "High", confBg: "#3f7a54",
    voices: "58 Voices", nextId: "s01", nextV: "The strait that prices the world is closed",
    tabs: ["The Story", "Key Facts", "By the Numbers", "Map", "On the Ground", "Signal", "Expert View"],
    mapKey: "hk",
    cards: [
      HERO("../assets/img/hero-flatshare.jpg",
        ["The steepest", "summer climb", "in a decade."],
        [P(I("Hong Kong rents rose ") + CHIP("confirmed", "almost 4% in the first half") + I(" — on pace for the biggest summer gain since 2016. The drivers are measurable: a steady inflow of ") + CHIP("confirmed", "mainland professionals and students") + I(", returning expat demand, and thin supply.")),
         P(I("Whether this is recovery or squeeze ") + CHIP("analysis", "depends on which side of a lease you sit") + I("."))],
        "The numbers, measured…"),
      CARD(1, "Key Facts",
        STATS([["+3.8%", "rents, H1"], ["10 yr", "steepest since"], ["$18.9K", "median 1-bed"]]) +
        P(I("The Rating and Valuation Department's index has risen ") + CHIP("confirmed", "seven months straight") + I(".")) +
        P(I("Analysts see home prices ") + CHIP("developing", "rebounding up to 19% over two years") + I(" on the back of rental growth.")) +
        P(I("How much is policy-driven talent inflow versus cycle is ") + CHIP("disputed", "debated") + I(".")),
        "The climb, month by month…"),
      CARD(2, "By the Numbers",
        METRIC("+3.8%", "residential rental index, January to July.", 30) +
        CHART(96, "2016 peak",
          [[32, "Jan", "118.2"], [40, "Feb", "119.0"], [48, "Mar", "119.8"], [59, "Apr", "120.9"], [70, "May", "122.0"], [83, "Jun", "123.3"], [95, "Jul", "124.5"]],
          ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]) +
        `<p class="k-chartnote">Tap a column for the month's index level. The dashed line is the August 2016 peak — within one normal month's move. Sources: Rating and Valuation Department; Centaline leading index.</p>`,
        "Where it bites hardest…"),
      CARD(3, "Map",
        MAP("hk", SCHEM_HK, [["#800080", "Rent change, H1"], ["#ec4837", "Steepest district"]], ATTR) +
        P(I("The squeeze is not even. Districts near universities are climbing fastest, led by ") + CHIP("confirmed", "Hung Hom at +6.2%") + I(".")),
        "What it looks like on the ground…"),
      CARD(4, "On the Ground",
        GROUND([
          ["Hung Hom · Saturday 2PM", "Fifteen viewers queue on the stairs of a walk-up tenement for a 280 sq ft one-bed. It goes over asking within the hour."],
          ["Sha Tin · Thursday 7PM", "An agent's window reprices twice in one week. “Landlords are waiting — every week of waiting has been paying.”"],
          ["To Kwa Wan · Sunday 11AM", "A student WhatsApp group with 800 members trades leads on flats before they are listed."]],
          ["url(../assets/img/hero-flatshare.jpg) left center/cover", "url(../assets/img/card-flatshare.jpg) center/cover", "url(../assets/img/hero-flatshare.jpg) right center/cover", "url(../assets/img/card-flatshare.jpg) left top/cover"]),
        "What to watch for…"),
      CARD(5, "Signal",
        SIG([
          [68, "The climb spreads to the New Territories", "Tuen Mun and Yuen Long lagged in H1 — agents report inquiry volume doubling.", true],
          [57, "Rental demand converts to buying", "Analysts' 19% two-year price-rebound case rests on exactly this handover.", false],
          [35, "Policy response on student housing", "Universities and government have both floated hostel expansion; nothing is funded yet.", false]]),
        "One read worth hearing…"),
      QUOTE(6, "Expert View",
        ["A rental market can run ahead", "of incomes for a while, but not", "ahead of arithmetic. The question", "is who absorbs the gap."],
        "../assets/img/av8.png", "Dr Alicia Leung", "Housing researcher, City University of Hong Kong", "View source ↗", "")
    ],
    pop: {
      "almost 4% in the first half": { rows: [["Who confirmed it", "The Rating and Valuation Department index, cross-checked against Centaline's leading index."], ["Why we're sure", "Two independently-compiled indices agree within 0.3 points."], ["Why it matters", "This is measured record, not sentiment — the basis for every claim in this story."]], src: ["Rating and Valuation Department", "Centaline"] },
      "mainland professionals and students": { rows: [["Who confirmed it", "Visa-scheme approval counts and university enrolment data, both published."], ["Why we're sure", "Both series are official and current through June."], ["Why it matters", "Demand-side inflow is the single largest driver agents cite in leasing data."]], src: ["Immigration Department", "UGC enrolment statistics"] },
      "depends on which side of a lease you sit": { rows: [["Whose view this is", "Market commentators noting the same index reads as recovery to owners and squeeze to tenants."], ["Why it's analysis, not fact", "The number is one fact; 'good' or 'bad' is a position."]], src: ["HK01", "Ming Pao"] },
      "seven months straight": { rows: [["Who confirmed it", "The RVD's published monthly series."], ["Why we're sure", "The streak is directly readable from the official table."], ["Why it matters", "Duration separates a trend from a blip."]], src: ["Rating and Valuation Department"] },
      "rebounding up to 19% over two years": { rows: [["What's developing", "A widely-cited analyst scenario, not an official forecast."], ["Who says what", "Bloomberg Intelligence modelling projects 19% over 2026–27; others see single digits."], ["Why it's still open", "The scenario depends on rental demand converting to purchases."]], src: ["Bloomberg Intelligence", "HKET"] },
      "debated": { rows: [["What's disputed", "How much of the inflow is policy-driven (talent schemes) versus cyclical return."], ["Who says what", "Government points to scheme approvals; independent economists note regional cycles moved the same way."], ["Why the gap exists", "The two effects arrived in the same eighteen months and cannot be cleanly separated yet."]], src: ["Ming Pao", "SCMP"] },
      "hung hom at +6.2%": { rows: [["Who confirmed it", "District-level leasing data compiled by the major agencies, consistent across both."], ["Why we're sure", "Two competing agencies publish the same district ranking."], ["Why it matters", "The pattern — universities first — identifies the marginal renter driving the market."]], src: ["Centaline", "Midland Realty"] }
    }
  },
  zh: {
    title: "NewsFlick · 香港租金急升", kicker: "香港 · 租務市場", lvl: "高", confBg: "#3f7a54",
    voices: "58把聲音", nextId: "s01", nextV: "為全球定價的海峽，封了",
    tabs: ["本篇", "關鍵事實", "數字看門道", "地圖", "現場直擊", "訊號", "專家之言"],
    mapKey: "hk",
    cards: [
      HERO("../assets/img/hero-flatshare.jpg",
        ["十年來最急的", "夏季升浪。"],
        [P(I("香港住宅租金上半年") + CHIP("confirmed", "升近4%") + I("——有望創2016年以來最大的夏季升幅。推手有數可依：") + CHIP("confirmed", "內地專才與學生") + I("持續流入、外派需求回流，加上供應緊絀。")),
         P(I("這是復甦還是壓力，") + CHIP("analysis", "視乎你坐在租約的哪一邊") + I("。"))],
        "實測的數字……"),
      CARD(1, "關鍵事實",
        STATS([["+3.8%", "上半年租金"], ["10年", "最急夏季升幅"], ["$18.9K", "一房月租中位數"]]) +
        P(I("差餉物業估價署租金指數已") + CHIP("confirmed", "連升七個月") + I("。")) +
        P(I("有分析預期樓價受租金帶動，") + CHIP("developing", "兩年內反彈最多19%") + I("。")) +
        P(I("當中幾多來自政策輸入人才、幾多屬周期回升，") + CHIP("disputed", "仍有爭論") + I("。")),
        "逐月攀升的軌跡……"),
      CARD(2, "數字看門道",
        METRIC("+3.8%", "住宅租金指數，1月至7月。", 30) +
        CHART(96, "2016年高位",
          [[32, "1月", "118.2"], [40, "2月", "119.0"], [48, "3月", "119.8"], [59, "4月", "120.9"], [70, "5月", "122.0"], [83, "6月", "123.3"], [95, "7月", "124.5"]],
          ["1月", "2月", "3月", "4月", "5月", "6月", "7月"]) +
        `<p class="k-chartnote">輕按柱形可查看當月指數。虛線是2016年8月的指數高位——距離只差一個普通月份的升幅。資料來源：差餉物業估價署、中原城市領先指數。</p>`,
        "邊區最當炒……"),
      CARD(3, "地圖",
        MAP("hk", SCHEM_HK, [["#800080", "上半年租金變動"], ["#ec4837", "升幅最急地區"]], ATTR) +
        P(I("壓力並不平均。大學周邊地區升得最快，") + CHIP("confirmed", "紅磡以+6.2%領先") + I("。")),
        "現場實況……"),
      CARD(4, "現場直擊",
        GROUND([
          ["紅磡 · 星期六 2PM", "一個280呎一房唐樓單位，十五個準租客喺樓梯排隊睇樓。一個鐘之內，高過叫價成交。"],
          ["沙田 · 星期四 7PM", "地產舖櫥窗一星期改價兩次。經紀話：「業主家陣識得等——等一個禮拜，賺一個禮拜。」"],
          ["土瓜灣 · 星期日 11AM", "一個800人嘅學生WhatsApp群組，盤未上網先喺群入面流轉。"]],
          ["url(../assets/img/hero-flatshare.jpg) left center/cover", "url(../assets/img/card-flatshare.jpg) center/cover", "url(../assets/img/hero-flatshare.jpg) right center/cover", "url(../assets/img/card-flatshare.jpg) left top/cover"]),
        "值得盯住的訊號……"),
      CARD(5, "訊號",
        SIG([
          [68, "升浪蔓延新界", "屯門、元朗上半年落後——但代理反映查詢量倍增。", true],
          [57, "租務需求轉化為置業", "分析員兩年反彈19%的推算，正正建基於這一步接力。", false],
          [35, "學生宿舍政策出手", "大學與政府都放過風擴建宿舍；至今未有一項落實撥款。", false]]),
        "一個值得一聽的解讀……"),
      QUOTE(6, "專家之言",
        ["租金可以跑贏收入一段時間，", "但跑不贏數學。", "問題是條數最後由誰埋單。"],
        "../assets/img/av8.png", "梁凱晴博士", "房屋研究學者，香港城市大學", "查看原文 ↗", "")
    ],
    pop: {
      "升近4%": { rows: [["由誰證實", "差餉物業估價署指數，並與中原城市領先指數互相核對。"], ["為何可信", "兩個獨立編製的指數，相差不足0.3點。"], ["為何重要", "這是實測紀錄而非市場情緒——本篇所有論斷的基礎。"]], src: ["差餉物業估價署", "中原地產"] },
      "內地專才與學生": { rows: [["由誰證實", "人才計劃批核數字及大學收生數據，均已公布。"], ["為何可信", "兩組數列同屬官方，更新至6月。"], ["為何重要", "需求端流入是代理在租務數據中最常引述的單一推手。"]], src: ["入境事務處", "教資會收生統計"] },
      "視乎你坐在租約的哪一邊": { rows: [["這是誰的觀點", "市場評論者指出，同一個指數，業主讀作復甦，租客讀作壓力。"], ["為何屬分析而非事實", "數字是事實；「好事定壞事」是立場。"]], src: ["香港01", "明報"] },
      "連升七個月": { rows: [["由誰證實", "差估署按月公布的數列。"], ["為何可信", "連升紀錄可直接從官方數表讀出。"], ["為何重要", "持續時間，正是趨勢與雜音的分界。"]], src: ["差餉物業估價署"] },
      "兩年內反彈最多19%": { rows: [["發展中", "一個被廣泛引用的分析員情景推算，並非官方預測。"], ["各方說法", "彭博行業研究模型推算2026至27年累升19%；亦有分析估計只得單位數。"], ["為何未定", "情景成立與否，取決於租務需求能否轉化為置業。"]], src: ["彭博行業研究", "香港經濟日報"] },
      "仍有爭論": { rows: [["爭議所在", "流入需求有幾多來自政策（人才計劃）、幾多屬周期回升。"], ["各方說法", "政府引用計劃批核數字；獨立經濟學者指區內周期同步向上。"], ["分歧從何而來", "兩股力量在同一年半內同時出現，暫難乾淨分割。"]], src: ["明報", "南華早報"] },
      "紅磡以+6.2%領先": { rows: [["由誰證實", "大型代理行編製的分區租務數據，兩行結果一致。"], ["為何可信", "兩間互相競爭的代理行，公布同一個分區排名。"], ["為何重要", "「大學周邊先行」的模式，點出了正在推動整個市場的邊際租客。"]], src: ["中原地產", "美聯物業"] }
    }
  }
};

/* ======================= EXTRAS (CSS + JS in original tokens) ======================= */
const EXTRA_CSS = `<style>
/* new card modules, styled with the original page tokens */
/* .card-body is a centered flex column — k-blocks must claim full width;
   min-width:0 stops wide children (photo strip) inflating the card via min-content */
.k-stats,.k-schips,.k-tl,.k-actors,.k-risk,.k-sigs,.k-poll,.k-chart,.k-map,.k-ground{width:100%;align-self:stretch;min-width:0}
/* hide scrollbars on the page scroller */
.phone{overflow-x:hidden;scrollbar-width:none;-ms-overflow-style:none}
.phone::-webkit-scrollbar{display:none!important;width:0!important}
/* responsive: fill the iframe whatever its size (375px on desktop shell, full screen on phones) */
html,body{width:100%;height:100%}
body{display:block!important;padding:0!important}
.phone{width:100%!important;height:100%!important;min-height:100%!important;border-radius:0!important}
.cards,.tabs,.home,.topnav,.bottom,.tabs-inner,.nextrow,.actions,.hero .scrim{width:100%!important}
.card-std,.card-story,.card-story .hero,.card-story .img,.card-wrap,.card-content{width:100%!important}
/* args columns: original stack is fixed-height (244px) for line-broken Figma copy —
   free it so full sentences fit instead of clipping */
.card-std .args-stack{height:auto!important}
.card-std .args-stack .simple{flex:none!important;height:auto!important}
.card-std .stats{overflow:visible!important;align-items:flex-start!important}
.card-std .simple{width:100%}
.k-stats{display:flex;gap:8px;margin:2px 0 4px}
.k-stats .s{flex:1;background:var(--background-secondary);border-radius:12px;padding:12px 8px;text-align:center}
.k-stats .s b{display:block;font-family:var(--display);font-weight:700;font-size:20px;line-height:23px;color:var(--colour-content-primary)}
.k-stats .s span{font-size:12px;line-height:17px;color:var(--content-secondary)}
.k-schips{display:flex;gap:6px;margin-bottom:4px}
.k-schips span{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:4px 10px;font-size:12px;font-weight:600;background:var(--background-secondary);color:var(--content-secondary)}
.k-schips span.on{background:#fdeceb;color:var(--status-negative)}
.k-schips span.on i{width:7px;height:7px;border-radius:50%;background:var(--status-negative);animation:kblink 1.6s infinite}
@keyframes kblink{0%,100%{opacity:1}50%{opacity:.35}}
.k-tl{display:flex;flex-direction:column}
.k-tl .r{display:flex;gap:12px;position:relative;padding-bottom:14px}
.k-tl .r:last-child{padding-bottom:0}
.k-tl .r::before{content:"";position:absolute;left:47px;top:20px;bottom:-2px;width:1.5px;background:var(--stroke-opaque)}
.k-tl .r:last-child::before{display:none}
.k-tl .t{flex:none;width:40px;font-size:12px;line-height:18px;font-weight:600;color:var(--content-secondary);padding-top:1px}
.k-tl .d{position:absolute;left:43px;top:5px;width:9px;height:9px;border-radius:50%;background:#fff;border:2.5px solid var(--content-brand-primary)}
.k-tl .x{padding-left:24px;font-size:14px;line-height:20px;color:var(--content-primary)}
.k-actors{display:flex;flex-direction:column}
.k-actors .a{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--stroke-transparent)}
.k-actors .a:last-child{border-bottom:0}
.k-actors .avi{flex:none;min-width:36px;height:36px;border-radius:999px;background:var(--background-brand-tertiary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;padding:0 6px}
.k-actors .who{flex:1;min-width:0}
.k-actors .who b{display:block;font-size:14px;line-height:19px;color:var(--content-primary)}
.k-actors .who span{font-size:12px;line-height:17px;color:var(--content-secondary)}
.k-actors .tag{flex:none;border-radius:999px;padding:4px 10px;font-size:11px;font-weight:700}
.k-actors .tag--for{background:#e7f4ec;color:var(--inline-confirmed)}
.k-actors .tag--against{background:#fdeceb;color:var(--status-negative)}
.k-actors .tag--neutral{background:var(--background-secondary);color:var(--content-secondary)}
.k-risk{display:flex;flex-direction:column;gap:12px}
.k-risk .r{display:flex;gap:10px;align-items:flex-start}
.k-risk .lv{flex:none;border-radius:6px;padding:3px 8px;font-size:11px;font-weight:700;margin-top:1px}
.k-risk .lv--low{background:#e7f4ec;color:var(--inline-confirmed)}
.k-risk .lv--med{background:#fbf1e7;color:var(--inline-developing)}
.k-risk .lv--high{background:#fdeceb;color:var(--status-negative)}
.k-risk .rt b{display:block;font-size:14px;line-height:19px;color:var(--content-primary)}
.k-risk .rt span{font-size:12.5px;line-height:17px;color:var(--content-secondary)}
.k-sigs{display:flex;flex-direction:column}
.k-sig{display:flex;align-items:center;gap:14px;padding:10px 0;border-bottom:1px solid var(--stroke-transparent);cursor:pointer}
.k-sig:last-child{border-bottom:0}
.k-sig svg{flex:none;width:44px;height:44px;transform:rotate(-90deg)}
.k-sig .tr{fill:none;stroke:var(--background-secondary);stroke-width:5}
.k-sig .vl{fill:none;stroke:var(--content-brand-primary);stroke-width:5;stroke-linecap:round;stroke-dasharray:113;stroke-dashoffset:113;transition:stroke-dashoffset 1s cubic-bezier(.2,.7,.2,1)}
.k-sig.hot .vl{stroke:var(--status-negative)}
.k-sigs.in .k-sig .vl{stroke-dashoffset:var(--o,113)}
.k-sig .sb{flex:1;min-width:0}
.k-sig .sb b{display:block;font-size:14px;line-height:19px;font-weight:600;color:var(--content-primary)}
.k-sig .note{font-size:12.5px;line-height:17px;color:var(--content-secondary);margin-top:3px;display:none}
.k-sig.open .note{display:block}
.k-sig .pc{font-family:var(--display);font-weight:700;font-size:16px;color:var(--content-primary)}
.k-poll .pr{display:block;padding:10px 0;cursor:pointer}
.k-poll .pt{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}
.k-poll .pt span{font-size:14px;font-weight:600;color:var(--content-primary)}
.k-poll .pv{font-family:var(--display);font-size:20px;font-weight:700;color:var(--content-brand-primary)}
.k-poll .pr.alt .pv{color:#667dff}
.k-poll .tk{display:block;height:10px;border-radius:999px;background:var(--background-secondary);overflow:hidden}
.k-poll .tk i{display:block;height:100%;width:var(--v,0%);border-radius:999px;background:var(--content-brand-primary);transform:scaleX(0);transform-origin:left;transition:transform .8s cubic-bezier(.2,.7,.2,1)}
.k-poll .pr.alt .tk i{background:#667dff;transition-delay:.15s}
.k-poll.in .tk i{transform:scaleX(1)}
.k-poll .pc2{display:block;margin-top:6px;font-size:12.5px;line-height:18px;color:var(--content-secondary)}
.k-chart{position:relative;height:200px;margin-top:6px}
.k-chart::before{content:"";position:absolute;left:0;right:0;bottom:32px;height:168px;pointer-events:none;background:repeating-linear-gradient(to top,var(--stroke-transparent),var(--stroke-transparent) 1px,transparent 1px,transparent 24px)}
.k-chart .cols{position:absolute;left:0;right:0;top:0;bottom:32px;display:flex;align-items:flex-end;gap:10px;padding:0 4px}
.k-chart .c{flex:1;height:100%;display:flex;align-items:flex-end;background:none;border:0;cursor:pointer;padding:0 6px}
.k-chart .c i{display:block;width:100%;background:var(--content-brand-primary);border-radius:6px 6px 0 0;transform:scaleY(0);transform-origin:bottom;transition:transform .7s cubic-bezier(.2,.7,.2,1);opacity:.9}
.k-chart.in .c i{transform:scaleY(1)}
.k-chart .c:nth-child(2) i{transition-delay:.06s}.k-chart .c:nth-child(3) i{transition-delay:.12s}.k-chart .c:nth-child(4) i{transition-delay:.18s}.k-chart .c:nth-child(5) i{transition-delay:.24s}.k-chart .c:nth-child(6) i{transition-delay:.3s}.k-chart .c:nth-child(7) i{transition-delay:.36s}
.k-chart .xl{position:absolute;left:0;right:0;bottom:0;display:flex;gap:10px;padding:0 4px}
.k-chart .xl span{flex:1;text-align:center;font-size:11px;line-height:16px;color:var(--content-secondary)}
.k-chart .gl{position:absolute;left:0;right:0;border-top:2px dashed var(--status-negative);z-index:1;pointer-events:none}
.k-chart .gl em{position:absolute;right:0;top:-20px;font-style:normal;font-size:11px;font-weight:700;color:var(--status-negative);background:#fdeceb;border-radius:6px;padding:2px 6px}
.k-tip{position:absolute;z-index:5;transform:translate(-50%,-100%);background:var(--common-primary-inverted);color:#fff;border-radius:8px;padding:6px 10px;font-size:12px;font-weight:600;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s}
.k-tip.on{opacity:1}
.k-chartnote{margin-top:10px;font-size:12.5px;line-height:18px;color:var(--content-secondary)}
.k-map .k-mapbox{position:relative;height:320px;margin:0 -16px;border-radius:0;overflow:hidden;background:#dde3e6}
.k-maplive{position:absolute;inset:0;z-index:2}
.k-schem{position:absolute;inset:0;z-index:1;width:100%;height:100%}
.k-mapbox.ready .k-schem{opacity:0;transition:opacity .4s}
.k-mapbox.fallback .k-maplive{display:none}
.k-leg{display:flex;justify-content:center;gap:16px;margin-top:10px}
.k-leg span{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--content-secondary)}
.k-leg i{width:7px;height:7px;border-radius:50%}
.k-attr{font-size:10px;line-height:14px;color:var(--content-tertiary);margin-top:6px;text-align:right}
.k-pulsemark{border-radius:50%;background:var(--content-brand-primary);border:2px solid #fff;box-shadow:0 0 0 3px rgba(128,0,128,.25);animation:kpulse 2.2s infinite}
@keyframes kpulse{0%{box-shadow:0 0 0 2px rgba(128,0,128,.35)}70%{box-shadow:0 0 0 12px rgba(128,0,128,0)}100%{box-shadow:0 0 0 2px rgba(128,0,128,0)}}
.k-diamond span{display:block;width:12px;height:12px;background:var(--status-negative);transform:rotate(45deg);border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35)}
.leaflet-popup-content-wrapper{border-radius:12px!important;box-shadow:0 8px 24px rgba(0,0,0,.18)!important}
.leaflet-popup-content{font-family:var(--body)!important;font-size:13px!important;line-height:18px!important;margin:10px 14px!important}
.leaflet-container{font-family:var(--body)!important}
.k-ground .d{padding:9px 0;border-bottom:1px solid var(--stroke-transparent)}
.k-ground .d:last-of-type{border-bottom:0}
.k-ground .d b{display:block;font-size:12px;font-weight:700;color:var(--content-brand-primary);margin-bottom:3px}
.k-ground .d p{font-size:14px;line-height:20px;color:var(--content-primary)}
.k-ground .strip{display:flex;gap:8px;overflow-x:auto;margin-top:10px;padding-bottom:4px;scrollbar-width:none;max-width:100%}
.k-ground .strip::-webkit-scrollbar{display:none}
.k-ground .strip span{flex:none;width:156px;height:104px;border-radius:10px;background-size:cover;background-position:center}
</style>`;

const extraJs = (mapKey, lang) => `<script>
(function(){
  var MAPCFG=${mapKey ? JSON.stringify({ center: MAPS[mapKey].center, zoom: MAPS[mapKey].zoom, zones: MAPS[mapKey].zones[lang], points: MAPS[mapKey].points[lang], key: mapKey }) : "null"};
  var phone=document.querySelector('.phone');
  /* signal gauges */
  document.querySelectorAll('.k-sig').forEach(function(s){
    var pct=+s.getAttribute('data-pct')||0,C=113;
    s.style.setProperty('--o',String(C-C*pct/100));
    s.addEventListener('click',function(){s.classList.toggle('open');});
  });
  /* poll flip */
  document.querySelectorAll('.k-poll .pr').forEach(function(r){
    r.addEventListener('click',function(){
      var v=r.querySelector('.pv'); if(!v) return;
      var pct=v.getAttribute('data-pct'), cnt=r.getAttribute('data-count');
      var showing=v.textContent.indexOf('%')>=0;
      v.textContent=showing?cnt:pct; v.style.fontSize=showing?'13px':'';
    });
  });
  /* chart tip */
  var tip=null;
  document.addEventListener('click',function(e){
    var c=e.target.closest?e.target.closest('.k-chart .c'):null;
    if(!c){ if(tip) tip.classList.remove('on'); return; }
    var box=c.closest('.k-chart');
    if(!tip||tip.parentNode!==box){ tip=document.createElement('div'); tip.className='k-tip'; box.appendChild(tip); }
    tip.textContent=(c.getAttribute('data-x')?c.getAttribute('data-x')+' · ':'')+c.getAttribute('data-val');
    var br=box.getBoundingClientRect(), cr=c.getBoundingClientRect(), fr=c.querySelector('i').getBoundingClientRect();
    tip.style.left=(cr.left-br.left+cr.width/2)+'px'; tip.style.top=(fr.top-br.top-6)+'px';
    tip.classList.add('on');
  },true);
  /* map (lazy) */
  function initMap(box){
    if(box._m||!MAPCFG) return;
    if(typeof L==='undefined'){ box.classList.add('fallback'); return; }
    box._m=true;
    var map=L.map(box.querySelector('.k-maplive'),{scrollWheelZoom:false,attributionControl:false,zoomControl:true,center:MAPCFG.center,zoom:MAPCFG.zoom,maxZoom:11,minZoom:3});
    var pts=[];MAPCFG.zones.forEach(function(z){pts.push(z[0]);});MAPCFG.points.forEach(function(p){pts.push(p[0]);});
    var loaded=false;
    var tl=L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{subdomains:'abcd',maxZoom:12});
    tl.on('load',function(){loaded=true;box.classList.add('ready');});
    tl.on('tileerror',function(){if(!loaded)box.classList.add('fallback');});
    setTimeout(function(){if(!loaded)box.classList.add('fallback');},6000);
    tl.addTo(map);
    MAPCFG.zones.forEach(function(z){
      L.circle(z[0],{radius:z[1]*1000,color:'#800080',weight:1.5,opacity:.6,fillColor:'#800080',fillOpacity:.16}).addTo(map).bindPopup('<b>'+z[2]+'</b><br>'+z[3]);
      L.marker(z[0],{icon:L.divIcon({className:'k-pulsemark',iconSize:[13,13]})}).addTo(map).bindPopup('<b>'+z[2]+'</b><br>'+z[3]);
    });
    MAPCFG.points.forEach(function(p){
      L.marker(p[0],{icon:L.divIcon({className:'k-diamond',html:'<span></span>',iconSize:[16,16]})}).addTo(map).bindPopup('<b>'+p[1]+'</b><br>'+p[2]);
    });
    setTimeout(function(){map.invalidateSize();
      map.fitBounds(L.latLngBounds(pts),{padding:[34,34],animate:false});},80);
  }
  /* rect-sweep reveal (IO does not fire in hidden/offscreen iframes) */
  var anim=[].slice.call(document.querySelectorAll('[data-animate]'));
  var maps=[].slice.call(document.querySelectorAll('.k-mapbox[data-map]'));
  function sweep(){
    var vh=window.innerHeight||812;
    anim=anim.filter(function(el){var r=el.getBoundingClientRect();
      if(r.top<vh-60&&r.bottom>0){el.classList.add('in');return false;}return true;});
    maps=maps.filter(function(el){var r=el.getBoundingClientRect();
      if(r.top<vh+220&&r.bottom>-220){initMap(el);return false;}return true;});
  }
  if(phone) phone.addEventListener('scroll',function(){requestAnimationFrame(sweep);},{passive:true});
  window.addEventListener('resize',sweep);
  var t=setInterval(function(){sweep();if(!anim.length&&!maps.length)clearInterval(t);},700);
  sweep();
})();
<\/script>`;

const LEAFLET = `<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">\n<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>\n`;

/* ======================= COMPOSE ======================= */
function splice(str, startMark, endMark, replacement, fromIdx) {
  const a = str.indexOf(startMark, fromIdx || 0);
  if (a < 0) throw new Error("start mark not found: " + startMark.slice(0, 60));
  const b = str.indexOf(endMark, a);
  if (b < 0) throw new Error("end mark not found: " + endMark.slice(0, 60));
  return str.slice(0, a) + replacement + str.slice(b);
}

let count = 0;
for (const id of ["s01", "s02", "s03", "s04"]) {
  for (const lang of ["en", "zh"]) {
    const d = S[id][lang];
    let h = T[lang];

    // title
    h = h.replace(/<title>[^<]*<\/title>/, `<title>${d.title}</title>`);
    // thread-row kicker
    h = h.replace(/(<div class="thread-row"[^>]*>\s*<p>)[^<]+(<\/p>)/, `$1${d.kicker}$2`);
    // conf level word
    h = h.replace(/(<p class="lvl">)[^<]+(<\/p>)/, `$1${d.lvl}$2`);
    // cards block
    h = splice(h, '<div class="cards"', '<div class="bottom"',
      `<div class="cards" data-node-id="36:47673">${d.cards.join("\n")}</div>\n`);
    // tabs
    h = splice(h, '<div class="tabs-inner" data-node-id="39:49629">', "</div></div>",
      `<div class="tabs-inner" data-node-id="39:49629">` +
      d.tabs.map((t, i) => `<button class="tab${i === 0 ? " tab--on" : ""}" data-tab="${i}" type="button"><span class="sel"></span><span class="lbl"><p>${t}</p></span></button>`).join("\n"));
    // next pill value + wiring target
    h = h.replace(/(<p class="v">)[^<]+(<\/p>)/, `$1${d.nextV}$2`);
    h = h.replace(/nf:'open-story',id:'[^']+'/, `nf:'open-story',id:'${d.nextId}'`);
    // voices count
    h = h.replace(/(<span class="cc"><p>)[^<]+(<\/p><\/span>)/, `$1${d.voices}$2`);
    // NF_POP
    h = h.replace(/var NF_POP = \{[\s\S]*?\};(?=\s*\n\s*var LABELS)/, `var NF_POP = ${JSON.stringify(d.pop)};`);
    // conf chip colour override for High
    const confCss = d.confBg ? `<style>.conf{background:${d.confBg}!important}</style>` : "";
    // leaflet in head
    if (d.mapKey) h = h.replace("</head>", LEAFLET + "</head>");
    // extras before </body>
    h = h.replace("</body>", EXTRA_CSS + confCss + extraJs(d.mapKey, lang) + "\n</body>");

    fs.writeFileSync(`${lang}/${id}.html`, h);
    count++;
  }
}
console.log("built", count, "story pages on original UI");
