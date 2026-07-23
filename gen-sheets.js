/* One-shot generator for the 16 sheet pages (confidence/pulse × s01-s04 × en/zh).
   Run: node gen-sheets.js   — safe to re-run; overwrites the generated files. */
const fs = require("fs");

const shell = (lang, dataName, dataObj, renderer) => `<!DOCTYPE html>
<html lang="${lang === "zh" ? "zh-Hant-HK" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NewsFlick</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@100..900&family=Noto+Sans+HK:wght@300..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/tokens.css">
<link rel="stylesheet" href="../assets/css/sheets.css">
</head>
<body>
<div class="sheetwrap">
  <div class="backdrop"></div>
  <div class="sheet">
    <div class="grab"><i></i></div>
    <div class="shead"><h2 id="shTitle"></h2><button class="x" type="button" aria-label="Close">×</button></div>
    <div class="sbody" id="shBody"></div>
  </div>
</div>
<script>window.${dataName} = ${JSON.stringify(dataObj)};</script>
<script src="../assets/js/app.js"></script>
<script src="../assets/js/${renderer}.js"></script>
</body>
</html>
`;

const D = {};

/* ================= s01 — Hormuz ================= */
D["confidence-s01"] = {
  en: {
    level: "Medium", stageAt: 0, basedOn: 11, verifiedMin: 28, more: 5,
    verdict: "The scale of the campaign and the closure itself are well documented. Casualty figures and intent are contested, and no independent monitor has ground access.",
    claims: [
      { tag: "ok", t: "The Strait of Hormuz is closed", d: "Tanker transits at zero for seven days; insurers have withdrawn cover. All parties acknowledge the closure." },
      { tag: "dev", t: "Over 5,000 targets struck", d: "Satellite tallies and both sides' claims align on scale; the target breakdown is still being verified." },
      { tag: "un", t: "1,255 deaths", d: "The two sides' counts differ by roughly three thousand. No third party can reach the strike zones." }
    ],
    terms: [
      { t: "Chokepoint", d: "A narrow passage that a large share of global trade must physically pass through. Hormuz carries about a fifth of the world's oil; there is no sea alternative." },
      { t: "War-risk premium", d: "The extra insurance cost for ships entering a conflict zone. When insurers withdraw cover entirely, traffic stops even without a formal blockade." }
    ],
    confirmed: [
      { t: "First full closure in the strait's history", d: "Transit data is measured independently of either government." },
      { t: "Brent crude above $140", d: "Exchange-traded prices are public record." },
      { t: "Oman has hosted three mediation contacts", d: "Confirmed by the Omani foreign ministry." }
    ],
    disputed: [
      { t: "The civilian death toll", d: "Counts serve each side's case; independent monitors cannot reach the zones." },
      { t: "The campaign's objective", d: "Stated aims have shifted from nuclear sites to 'restoring deterrence'." }
    ],
    unknown: [
      { t: "How long the closure holds", d: "No historical precedent exists to model against." },
      { t: "Whether talks resume", d: "The Oman channel is open but neither principal has re-engaged." }
    ],
    settle: [
      { t: "Independent ground access", d: "A UN or third-party mission could settle the casualty dispute." },
      { t: "A stated end condition", d: "Any published terms would let observers measure distance to resolution." },
      { t: "Reopened transit", d: "A single insured tanker transit would mark the turn." }
    ],
    interps: [
      { o: "Reuters", m: "Wire · 40m ago", h: "“Hormuz Closure Enters Second Week as Oil Passes $140”" },
      { o: "Al-Manar Digest", m: "Regional online · 2h ago", h: "“Resistance Holds the Strait; West Counts the Cost”" },
      { o: "The Daily Ledger", m: "Explainer · 5h ago", h: "“Why Nobody Has Ever Closed Hormuz — Until Now”" }
    ],
    sources: [
      { b: "R", n: "Reuters", m: "Wire · 40m ago", h: "Hormuz closure enters second week as oil passes $140" },
      { b: "AP", n: "Associated Press", m: "Wire · 1h ago", h: "Strikes reported near Bandar Abbas port facilities" },
      { b: "ST", n: "Sentinel Imagery", m: "Satellite analysis · 3h ago", h: "Cumulative strike count passes 5,000 distinct sites" },
      { b: "UN", n: "UN casualty monitors", m: "Statement · 1d ago", h: "No independent access to strike zones; figures unverified" }
    ],
    explore: ["Strait of Hormuz", "Oil price pass-through", "Oman back channel"]
  },
  zh: {
    level: "Medium", stageAt: 0, basedOn: 11, verifiedMin: 28, more: 5,
    verdict: "行動規模與封鎖本身均有充分紀錄。傷亡數字及意圖仍有爭議，且無獨立監察可進入現場。",
    claims: [
      { tag: "ok", t: "霍爾木茲海峽已封鎖", d: "油輪通航量連續七日歸零；保險商全面撤保。各方均承認封鎖。" },
      { tag: "dev", t: "逾5,000個目標被擊中", d: "衛星統計與雙方說法在規模上一致；目標細項仍在核實。" },
      { tag: "un", t: "1,255人死亡", d: "雙方統計相差約三千。無第三方能進入空襲區。" }
    ],
    terms: [
      { t: "咽喉要道", d: "全球貿易必經的狹窄水道。霍爾木茲承載全球約五分之一的石油，海路上並無替代。" },
      { t: "戰爭風險保費", d: "船隻駛入衝突區的額外保險成本。保險商一旦全面撤保，即使沒有正式封鎖，航運也會自行停頓。" }
    ],
    confirmed: [
      { t: "海峽歷史上首次全面封鎖", d: "通航數據由第三方獨立量度，不受任何一方政府左右。" },
      { t: "布蘭特期油升穿140美元", d: "交易所價格屬公開紀錄。" },
      { t: "阿曼已促成三次斡旋接觸", d: "阿曼外交部證實。" }
    ],
    disputed: [
      { t: "平民死亡數字", d: "兩邊數字各為其主；獨立監察無法進入現場。" },
      { t: "行動目標", d: "宣稱目標已由核設施轉為「重建威懾」。" }
    ],
    unknown: [
      { t: "封鎖會維持多久", d: "歷史上無先例可作參照。" },
      { t: "談判會否重啟", d: "阿曼渠道仍開，但兩位主角未有一位重新入局。" }
    ],
    settle: [
      { t: "獨立實地調查", d: "聯合國或第三方調查團可釐清傷亡爭議。" },
      { t: "公開的停火條件", d: "任何白紙黑字的條件，都能讓外界量度距離終局有多遠。" },
      { t: "恢復通航", d: "只要有一艘獲承保的油輪通過，就是轉勢的標記。" }
    ],
    interps: [
      { o: "路透社", m: "通訊社 · 40分鐘前", h: "「霍爾木茲封鎖踏入第二週　油價升穿140美元」" },
      { o: "Al-Manar文摘", m: "區內網媒 · 2小時前", h: "「抵抗力量守住海峽　西方埋單計數」" },
      { o: "The Daily Ledger", m: "解說 · 5小時前", h: "「為何從來無人封得住霍爾木茲——直到今日」" }
    ],
    sources: [
      { b: "R", n: "路透社", m: "通訊社 · 40分鐘前", h: "霍爾木茲封鎖踏入第二週，油價升穿140美元" },
      { b: "AP", n: "美聯社", m: "通訊社 · 1小時前", h: "阿巴斯港港口設施附近傳出空襲" },
      { b: "ST", n: "Sentinel影像", m: "衛星分析 · 3小時前", h: "累計打擊點突破5,000個" },
      { b: "UN", n: "聯合國傷亡監察", m: "聲明 · 1日前", h: "無法獨立進入空襲區；數字未經核實" }
    ],
    explore: ["霍爾木茲海峽", "油價轉嫁", "阿曼秘密渠道"]
  }
};

D["pulse-s01"] = {
  en: {
    basedOn: "9,400", verifiedMin: 12,
    temperature: "Angry and exhausted in equal measure — twelve days in, the loudest demand is not victory but an answer to “how does this end”.",
    tenor: { pct: 84, label: "negative" },
    segs: [
      { key: "anger", label: "Anger", pct: 38 },
      { key: "anxious", label: "Anxious", pct: 30 },
      { key: "grief", label: "Grief", pct: 20 },
      { key: "hope", label: "Hope", pct: 12 }
    ],
    clusters: {
      anger: [
        { t: "No endgame", n: "1,900", d: "Twelve days and past 5,000 targets in, people are angry that no one will say what ending this looks like.",
          posts: [
            { h: "@mideast_watch", m: "X · 22m", x: "Day 12. Five thousand targets. And still not one official will tell us how this ends." },
            { h: "@gulf_reader", m: "Reddit · 1h", x: "Asked three times in the briefing what the endgame is. Three non-answers." }
          ] },
        { t: "Hormuz and prices", n: "850", d: "Anger that a distant strait now sets the price of everything on a shelf.",
          posts: [
            { h: "@freight_daily", m: "Reddit · 33m", x: "Hormuz shut means everything on a shelf gets more expensive. That reaches everybody." }
          ] }
      ],
      anxious: [
        { t: "Escalation risk", n: "1,400", d: "Worry that the conflict widens beyond the two parties currently fighting.",
          posts: [
            { h: "@region_watch", m: "X · 27m", x: "One miscalculation and this stops being two countries very fast." }
          ] }
      ],
      grief: [
        { t: "Named losses", n: "720", d: "Posts mourning specific people and places, named or counted.",
          posts: [ { h: "@small_hours_", m: "X · 2h", x: "My aunt’s street is in the footage. That is all I have to say today." } ] }
      ],
      hope: [
        { t: "An off-ramp still exists", n: "700", d: "Posts pointing to a route out that has not closed yet.",
          posts: [ { h: "@track_two", m: "X · 48m", x: "Oman mediated three times. The channel is not dead, it is just quiet." } ] }
      ]
    },
    voices: [
      { cat: "Officials", b: "OM", n: "Omani Foreign Ministry", m: "Official statement · 2h ago", x: "The channel remains open. Both parties know where the door is." },
      { cat: "Experts", b: "SK", n: "Dr Samira Kazemi", m: "Energy security analyst · 3h ago", x: "Closing Hormuz hurts the closer as much as the closed-to. Nobody knows the rules now." },
      { cat: "Outlets", b: "DL", n: "The Daily Ledger", m: "Explainer · 5h ago", x: "Every barrel that doesn't transit is a bid on every barrel that already did." },
      { cat: "Commentators", b: "MW", n: "@mideast_watch", m: "public post · X · 22m ago", x: "Day 12. Five thousand targets. And still not one official will tell us how this ends." },
      { cat: "Commentators", b: "HL", n: "@harbour_lights", m: "public post · X · 1h ago", x: "The nuclear sites part is what keeps me up. That risk does not stay inside a border." },
      { cat: "Commentators", b: "FD", n: "@freight_daily", m: "public post · Reddit · 33m ago", x: "Hormuz shut means everything on a shelf gets more expensive. That reaches everybody." }
    ]
  },
  zh: {
    basedOn: "9,400", verifiedMin: 12,
    temperature: "憤怒與疲憊各佔一半——打到第12日，最響亮的訴求不是勝利，而是有人回答一句「呢件事點收科」。",
    tenor: { pct: 84, label: "負面" },
    segs: [
      { key: "anger", label: "憤怒", pct: 38 },
      { key: "anxious", label: "憂慮", pct: 30 },
      { key: "grief", label: "哀傷", pct: 20 },
      { key: "hope", label: "希望", pct: 12 }
    ],
    clusters: {
      anger: [
        { t: "看不到終局", n: "1,900", d: "打了十二日、逾5,000個目標，民眾憤怒的是無人肯講結局會是甚麼模樣。",
          posts: [
            { h: "@mideast_watch", m: "X · 22分鐘", x: "第12日。五千個目標。仍然冇一個官員肯講呢件事點收科。" },
            { h: "@gulf_reader", m: "Reddit · 1小時", x: "簡報上問咗三次終局係乜，三次都冇答案。" }
          ] },
        { t: "霍爾木茲與物價", n: "850", d: "一條遠方的海峽如今為貨架上每件貨定價，令人火滾。",
          posts: [
            { h: "@freight_daily", m: "Reddit · 33分鐘", x: "霍爾木茲一封，貨架上樣樣嘢都會加價，個個都走唔甩。" }
          ] }
      ],
      anxious: [
        { t: "升級風險", n: "1,400", d: "擔心衝突蔓延至交戰雙方以外。",
          posts: [ { h: "@region_watch", m: "X · 27分鐘", x: "只要一次誤判，好快就唔止係兩個國家嘅事。" } ] }
      ],
      grief: [
        { t: "有名有姓的損失", n: "720", d: "悼念具體人物與地方的帖文，有名有姓、有數可點。",
          posts: [ { h: "@small_hours_", m: "X · 2小時", x: "片入面嗰條街，係我姨媽住嗰條。今日我淨係想講呢句。" } ] }
      ],
      hope: [
        { t: "下台階仍在", n: "700", d: "指出仍有一條未關閉的出路的帖文。",
          posts: [ { h: "@track_two", m: "X · 48分鐘", x: "阿曼斡旋過三次。條渠道未死，只係靜咗。" } ] }
      ]
    },
    voices: [
      { cat: "Officials", b: "阿曼", n: "阿曼外交部", m: "官方聲明 · 2小時前", x: "渠道仍然打開。雙方都知道門在哪裏。" },
      { cat: "Experts", b: "SK", n: "Samira Kazemi博士", m: "能源安全分析師 · 3小時前", x: "封鎖霍爾木茲，傷封鎖者不亞於被封鎖者。如今無人知道遊戲規則。" },
      { cat: "Outlets", b: "DL", n: "The Daily Ledger", m: "解說 · 5小時前", x: "每一桶過不了海峽的油，都在為已經過了的每一桶抬價。" },
      { cat: "Commentators", b: "MW", n: "@mideast_watch", m: "公開帖文 · X · 22分鐘前", x: "第12日。五千個目標。仍然冇一個官員肯講呢件事點收科。" },
      { cat: "Commentators", b: "HL", n: "@harbour_lights", m: "公開帖文 · X · 1小時前", x: "最令我瞓唔着嘅係核設施嗰part。呢種風險唔會乖乖留喺國界入面。" },
      { cat: "Commentators", b: "FD", n: "@freight_daily", m: "公開帖文 · Reddit · 33分鐘前", x: "霍爾木茲一封，貨架上樣樣嘢都會加價，個個都走唔甩。" }
    ]
  }
};

/* ================= s02 — France ban ================= */
D["confidence-s02"] = {
  en: {
    level: "Medium", stageAt: 0, basedOn: 9, verifiedMin: 35, more: 4,
    verdict: "The law and its deadlines are settled record. Whether a ban makes teenagers safer is contested, and the evidence does not settle it.",
    claims: [
      { tag: "ok", t: "The ban is law", d: "Passed both chambers, promulgated; platforms have six months to comply." },
      { tag: "dev", t: "Age checks within six months", d: "The regulator has promised privacy-preserving verification; the technical decree is unpublished." },
      { tag: "un", t: "A ban improves teen wellbeing", d: "Both camps cite the same correlational research and reach opposite conclusions." }
    ],
    terms: [
      { t: "Age verification", d: "Checking a user really is the age they claim — usually via ID or a face-estimation scan. The only way a ban can be enforced, and it applies to every user of every age." },
      { t: "Correlational", d: "Research showing two things move together without proving one causes the other. Most evidence in this debate is correlational." }
    ],
    confirmed: [
      { t: "First blanket ban in the EU", d: "The legislative record is public." },
      { t: "Fines up to 4% of global turnover", d: "Written in the statute." },
      { t: "The offence is providing accounts, not browsing", d: "The distinction is in the final text." }
    ],
    disputed: [
      { t: "Whether age checks can work at scale", d: "The regulator promises privacy-preserving checks; engineers say no proven scheme exists." },
      { t: "Whether banned teens end up safer", d: "Research divides; no country has enforced a ban long enough to measure." }
    ],
    unknown: [
      { t: "Where under-16s migrate", d: "Logged-out and unmoderated spaces are the open question." },
      { t: "Whether support survives enforcement", d: "Polling predates the technical decree." }
    ],
    settle: [
      { t: "France's own outcome data", d: "The first enforced ban will generate the evidence the debate has lacked." },
      { t: "A working privacy-safe age check", d: "Would remove the largest practical objection." }
    ],
    interps: [
      { o: "Le Monde (trans.)", m: "Daily · 3h ago", h: "“A Landmark for Child Protection, a Test for Privacy”" },
      { o: "The Daily Ledger", m: "Explainer · 6h ago", h: "“You Cannot Check a Child's Age Without Checking Everyone's”" },
      { o: "TechWire EU", m: "Industry · 4h ago", h: "“Platforms Face an Impossible Six-Month Clock”" }
    ],
    sources: [
      { b: "JO", n: "Journal Officiel", m: "Statute text · 2d ago", h: "The promulgated law, deadlines and penalty schedule" },
      { b: "CN", n: "CNIL", m: "Regulator statement · 1d ago", h: "Verification must be privacy-preserving; decree to follow" },
      { b: "MI", n: "Meridian Institute", m: "Research review · 5h ago", h: "The average measured harm is small, real, and concentrated in girls 11–15" },
      { b: "PL", n: "Platform filings", m: "Public response · 8h ago", h: "Compliance timeline 'not technically feasible' as drafted" }
    ],
    explore: ["Age verification tech", "Teen mental health", "EU platform law"]
  },
  zh: {
    level: "Medium", stageAt: 0, basedOn: 9, verifiedMin: 35, more: 4,
    verdict: "法例與期限已成定案。禁令能否令青少年更安全仍有爭議，證據未能一錘定音。",
    claims: [
      { tag: "ok", t: "禁令已成法", d: "兩院通過並正式頒布；平台有六個月合規期。" },
      { tag: "dev", t: "六個月內落實年齡核查", d: "監管機構承諾「保障私隱」的核實方式；技術細則未公布。" },
      { tag: "un", t: "禁令改善青少年身心", d: "兩個陣營引用同一批相關性研究，得出相反結論。" }
    ],
    terms: [
      { t: "年齡核實", d: "查證用戶申報的年齡屬實——通常靠身份證明或人臉年齡估算。禁令唯一的執行方法，並適用於所有年齡的每一位用戶。" },
      { t: "相關性研究", d: "只顯示兩件事同步變化、卻證明不了因果的研究。這場辯論的證據大多屬此類。" }
    ],
    confirmed: [
      { t: "歐盟首個全面禁令", d: "立法紀錄公開可查。" },
      { t: "罰款最高達全球營業額4%", d: "白紙黑字寫入法律。" },
      { t: "違法的是提供帳戶，不是瀏覽", d: "區分寫在法例定稿。" }
    ],
    disputed: [
      { t: "年齡核查能否大規模行得通", d: "監管機構承諾保障私隱；工程師指未有經驗證的方案。" },
      { t: "被禁的青少年是否更安全", d: "研究界一分為二；未有國家執行夠久可供量度。" }
    ],
    unknown: [
      { t: "16歲以下會流向何處", d: "不設登入、欠缺審核的空間是最大懸念。" },
      { t: "支持度能否捱過執行階段", d: "民調早於技術細則。" }
    ],
    settle: [
      { t: "法國自身的結果數據", d: "第一個被執行的禁令，將產生辯論一直欠缺的證據。" },
      { t: "一套可行的私隱友善年齡核查", d: "可消除最大的實際反對理由。" }
    ],
    interps: [
      { o: "世界報（譯）", m: "日報 · 3小時前", h: "「保護兒童的里程碑　私隱的一場大考」" },
      { o: "The Daily Ledger", m: "解說 · 6小時前", h: "「要查小朋友的年齡　就要查埋所有人的」" },
      { o: "TechWire EU", m: "行業媒體 · 4小時前", h: "「平台面對一個不可能的六個月死線」" }
    ],
    sources: [
      { b: "JO", n: "法國政府公報", m: "法例文本 · 2日前", h: "已頒布的法律、期限及罰則" },
      { b: "CN", n: "法國資訊自由委員會", m: "監管聲明 · 1日前", h: "核實方式須保障私隱；細則隨後公布" },
      { b: "MI", n: "Meridian研究所", m: "研究綜述 · 5小時前", h: "平均傷害輕微但真實，集中於11至15歲女童" },
      { b: "PL", n: "平台意見書", m: "公開回應 · 8小時前", h: "現行草案的合規時間表「技術上不可行」" }
    ],
    explore: ["年齡核實技術", "青少年精神健康", "歐盟平台法規"]
  }
};

D["pulse-s02"] = {
  en: {
    basedOn: "7,800", verifiedMin: 18,
    temperature: "Split down the middle and jumpy about it — nearly everyone wants kids safer, but almost as many distrust how a ban would be enforced.",
    tenor: { pct: 61, label: "negative" },
    segs: [
      { key: "protective", label: "Protective", pct: 34 },
      { key: "wary", label: "Wary", pct: 31 },
      { key: "anxious", label: "Anxious", pct: 22 },
      { key: "skeptical", label: "Skeptical", pct: 13 }
    ],
    clusters: {
      protective: [
        { t: "Finally, a line", n: "1,600", d: "Relief from parents who wanted someone else to hold the line they couldn't.",
          posts: [ { h: "@plainspoken_dad", m: "X · 40m", x: "I'm exhausted defending a line the platforms drew for profit and left me to police." } ] }
      ],
      wary: [
        { t: "Who checks the checkers", n: "1,300", d: "Distrust of what age verification means for everyone's identity data.",
          posts: [ { h: "@opennet_eu", m: "X · 1h", x: "Age assurance at national scale becomes an identity checkpoint for the entire population, kids included." } ] }
      ],
      anxious: [
        { t: "Where do they go", n: "900", d: "Worry that banned teens migrate somewhere less visible, not safer.",
          posts: [ { h: "@teenframe_alex", m: "X · 25m", x: "Adults keep deciding this without asking us where we'd actually go instead. We'd just go somewhere worse." } ] }
      ],
      skeptical: [
        { t: "It won't hold", n: "500", d: "Bets that VPNs and workarounds hollow the ban out within a year.",
          posts: [ { h: "@grayroute", m: "Reddit · 2h", x: "Search interest in workarounds tripled the week it passed. The law has a leak before it has a decree." } ] }
      ]
    },
    voices: [
      { cat: "Officials", b: "FR", n: "Ministry for Digital Affairs", m: "Public regulator · 2h ago", x: "Our aim is a duty on platforms, not a search of every household's identity documents." },
      { cat: "Experts", b: "PA", n: "Dr Priya Adeyemi", m: "Developmental psychologist · 3h ago", x: "The evidence points to harm from design — endless scroll, engagement loops — more than any birthday threshold." },
      { cat: "Outlets", b: "DL", n: "The Daily Ledger", m: "Explainer · 5h ago", x: "Every workable ban so far has run into the same wall: you cannot check a child's age without checking everyone's." },
      { cat: "Commentators", b: "PD", n: "@plainspoken_dad", m: "parent · X · 40m ago", x: "I'm exhausted defending a line the platforms drew for profit and left me to police." },
      { cat: "Commentators", b: "ON", n: "Open Net Initiative", m: "digital-rights nonprofit · 1h ago", x: "Age assurance at national scale becomes an identity checkpoint for the entire population, kids included." },
      { cat: "Commentators", b: "TA", n: "@teenframe_alex", m: "15-year-old student blogger · 25m ago", x: "Adults keep deciding this without asking us where we'd actually go instead. We'd just go somewhere worse." }
    ]
  },
  zh: {
    basedOn: "7,800", verifiedMin: 18,
    temperature: "一半一半，而且相當敏感——幾乎人人想孩子更安全，但同樣多人信不過禁令會如何執行。",
    tenor: { pct: 61, label: "負面" },
    segs: [
      { key: "protective", label: "保護心切", pct: 34 },
      { key: "wary", label: "有戒心", pct: 31 },
      { key: "anxious", label: "憂慮", pct: 22 },
      { key: "skeptical", label: "質疑", pct: 13 }
    ],
    clusters: {
      protective: [
        { t: "終於有人劃線", n: "1,600", d: "家長鬆一口氣：終於有人替他們守住自己守不住的那條線。",
          posts: [ { h: "@plainspoken_dad", m: "X · 40分鐘", x: "條線係平台為咗賺錢畫出嚟，跟住留返畀我哋家長去把關，我真係好攰。" } ] }
      ],
      wary: [
        { t: "誰來查查人者", n: "1,300", d: "對年齡核查將如何處置全民身份數據的戒心。",
          posts: [ { h: "@opennet_eu", m: "X · 1小時", x: "年齡核證推到全國規模，就會變成覆蓋全民嘅身份關卡，細路都唔例外。" } ] }
      ],
      anxious: [
        { t: "佢哋會去邊", n: "900", d: "擔心被禁的青少年流向更隱蔽而非更安全的地方。",
          posts: [ { h: "@teenframe_alex", m: "X · 25分鐘", x: "大人不停幫我哋做決定，但從來冇問過我哋之後會走去邊。我哋只會走去更差嘅地方。" } ] }
      ],
      skeptical: [
        { t: "頂唔住一年", n: "500", d: "斷言VPN與繞道會在一年內把禁令蛀空。",
          posts: [ { h: "@grayroute", m: "Reddit · 2小時", x: "法例通過嗰個禮拜，翻牆方法嘅搜尋量升咗三倍。細則未出，個窿已經穿咗。" } ] }
      ]
    },
    voices: [
      { cat: "Officials", b: "法", n: "法國數碼事務部", m: "公共監管機構 · 2小時前", x: "我們的目標是向平台施加責任，而非翻查每個家庭的身份證明文件。" },
      { cat: "Experts", b: "PA", n: "Priya Adeyemi博士", m: "發展心理學家 · 3小時前", x: "證據指向的是設計帶來的傷害——無限滾動、成癮迴圈——多於任何一條生日界線。" },
      { cat: "Outlets", b: "DL", n: "The Daily Ledger", m: "解說 · 5小時前", x: "迄今每個可行的禁令都撞上同一道牆：要核實兒童的年齡，就必須核實所有人的。" },
      { cat: "Commentators", b: "PD", n: "@plainspoken_dad", m: "家長 · X · 40分鐘前", x: "條線係平台為咗賺錢畫出嚟，跟住留返畀我哋家長去把關，我真係好攰。" },
      { cat: "Commentators", b: "ON", n: "Open Net Initiative", m: "數碼權益組織 · 1小時前", x: "年齡核證一旦推展至全國規模，便會成為覆蓋全民的身份關卡，兒童亦不例外。" },
      { cat: "Commentators", b: "TA", n: "@teenframe_alex", m: "15歲學生博客 · 25分鐘前", x: "大人不停幫我哋做決定，但從來冇問過我哋之後會走去邊。我哋只會走去更差嘅地方。" }
    ]
  }
};

/* ================= s03 — Tariffs ================= */
D["confidence-s03"] = {
  en: {
    level: "High", stageAt: 1, basedOn: 10, verifiedMin: 22, more: 5,
    verdict: "The order, the rate and the coverage are published record. What remains open is retaliation, legality under USMCA, and how fast prices move.",
    claims: [
      { tag: "ok", t: "50% on most Canadian goods", d: "The signed order and its schedule are in the Federal Register." },
      { tag: "ok", t: "Energy is carved out", d: "The exemption is written into the schedule." },
      { tag: "dev", t: "Canada will retaliate", d: "Ottawa confirms a draft list (~$30B); nothing is law until gazetted." }
    ],
    terms: [
      { t: "Tariff pass-through", d: "How much of a tariff shows up in consumer prices. For integrated supply chains, studies of the 2018 round found pass-through was near-complete within months." },
      { t: "USMCA security carve-out", d: "A clause letting members act on 'essential security' — invoked here, and never tested at this scale." }
    ],
    confirmed: [
      { t: "The steepest allied-economy tariff wall in modern history", d: "No precedent between treaty allies exceeds it." },
      { t: "$3.6B in goods cross the border daily", d: "Official trade statistics." },
      { t: "Markets repriced automakers within hours", d: "Exchange data is public." }
    ],
    disputed: [
      { t: "Whether USMCA dispute rules apply", d: "Ottawa says plainly yes; Washington says the security carve-out puts the order outside the pact." },
      { t: "Who ultimately pays", d: "The administration says exporters; most trade economists say importers and households." }
    ],
    unknown: [
      { t: "The final retaliation list", d: "Provinces are pushing to widen the draft." },
      { t: "Whether talks convene", d: "Mexico has signalled willingness to host; neither principal has agreed." }
    ],
    settle: [
      { t: "The first CPI prints", d: "Two months of data will show the pass-through rate directly." },
      { t: "A USMCA panel ruling", d: "Would settle the legality question either way." }
    ],
    interps: [
      { o: "Reuters", m: "Wire · 30m ago", h: "“50% Tariffs on Canada Take Effect as Markets Reprice Autos”" },
      { o: "The Globe & Mail", m: "Canadian daily · 2h ago", h: "“Economic Coercion, By the Numbers”" },
      { o: "The Wattline Report", m: "Industry · 6h ago", h: "“The Supply Chain That Crosses the Border Seven Times”" }
    ],
    sources: [
      { b: "FR", n: "Federal Register", m: "Official record · 2d ago", h: "The signed order and full schedule of covered categories" },
      { b: "GC", n: "Government of Canada", m: "Statement · 1d ago", h: "Counter-tariff list being drafted; ~$30B in US goods" },
      { b: "FS", n: "Fennwick School", m: "Analysis · 8h ago", h: "Estimated $2,400 annual cost per US household" },
      { b: "R", n: "Reuters", m: "Wire · 30m ago", h: "Markets reprice automakers as tariffs take effect" }
    ],
    explore: ["Tariff pass-through", "USMCA dispute process", "2018 steel round"]
  },
  zh: {
    level: "High", stageAt: 1, basedOn: 10, verifiedMin: 22, more: 5,
    verdict: "命令、稅率與範圍均屬公開紀錄。未定的是反制、《美墨加協定》下的合法性，以及價格傳導有多快。",
    claims: [
      { tag: "ok", t: "對大部分加國貨品徵50%", d: "已簽署的命令及附表已刊於聯邦公報。" },
      { tag: "ok", t: "能源獲豁免", d: "豁免白紙黑字寫入附表。" },
      { tag: "dev", t: "加拿大將反制", d: "渥太華證實草擬清單（約300億美元）；刊憲前一切未成法律。" }
    ],
    terms: [
      { t: "關稅轉嫁", d: "關稅有多少反映在消費物價上。就深度融合的供應鏈而言，2018年一輪的研究發現，數月內轉嫁近乎完全。" },
      { t: "《美墨加》安全豁免", d: "允許成員以「根本安全」為由行事的條款——今次正是引用它，而它從未在此規模下受考驗。" }
    ],
    confirmed: [
      { t: "近代史上盟友之間最高的關稅牆", d: "條約盟友之間並無先例超越此水平。" },
      { t: "每日36億美元貨品跨境", d: "官方貿易統計。" },
      { t: "市場數小時內為車廠重新定價", d: "交易所數據公開可查。" }
    ],
    disputed: [
      { t: "《美墨加》爭端機制是否適用", d: "渥太華稱明顯適用；華府稱安全豁免令命令置身協定之外。" },
      { t: "最終由誰埋單", d: "當局稱出口商；大多數貿易經濟學者稱進口商與家庭。" }
    ],
    unknown: [
      { t: "反制清單的最終版本", d: "各省正推動擴大草案。" },
      { t: "會談會否召開", d: "墨西哥已表示願意作東；兩位主角未有一位點頭。" }
    ],
    settle: [
      { t: "頭兩期CPI數據", d: "兩個月的數據將直接顯示轉嫁比率。" },
      { t: "《美墨加》仲裁小組裁決", d: "無論結果如何，都能了斷合法性之爭。" }
    ],
    interps: [
      { o: "路透社", m: "通訊社 · 30分鐘前", h: "「對加50%關稅生效　市場即時重估車廠」" },
      { o: "環球郵報", m: "加拿大日報 · 2小時前", h: "「經濟脅迫　有數為證」" },
      { o: "The Wattline Report", m: "行業媒體 · 6小時前", h: "「一條跨境七次先成車嘅供應鏈」" }
    ],
    sources: [
      { b: "FR", n: "聯邦公報", m: "官方紀錄 · 2日前", h: "已簽署的命令及受涵蓋類別完整附表" },
      { b: "GC", n: "加拿大政府", m: "聲明 · 1日前", h: "反制清單草擬中；涉約300億美元美國貨品" },
      { b: "FS", n: "Fennwick學院", m: "分析 · 8小時前", h: "估算每個美國家庭每年多付2,400美元" },
      { b: "R", n: "路透社", m: "通訊社 · 30分鐘前", h: "關稅生效，市場重估車廠估值" }
    ],
    explore: ["關稅轉嫁", "《美墨加》爭端機制", "2018年鋼鋁一役"]
  }
};

D["pulse-s03"] = {
  en: {
    basedOn: "8,600", verifiedMin: 15,
    temperature: "Loud, sustained anger on both sides of the border — cooling only slightly into grim arithmetic once people work out who actually pays.",
    tenor: { pct: 78, label: "negative" },
    segs: [
      { key: "anger", label: "Anger", pct: 36 },
      { key: "betrayal", label: "Betrayal", pct: 26 },
      { key: "anxious", label: "Anxious", pct: 24 },
      { key: "clarity", label: "Clarity", pct: 14 }
    ],
    clusters: {
      anger: [
        { t: "Allies don't do this", n: "1,700", d: "Fury at the framing of a treaty ally as a security threat.",
          posts: [
            { h: "@northline_ott", m: "X · 18m", x: "Seventy years of shared defence and we're a 'security threat' the week the order needs a legal basis." },
            { h: "@midwest_maker", m: "Reddit · 1h", x: "My parts cross that border five times before they're a truck. Tell me who this protects." }
          ] }
      ],
      betrayal: [
        { t: "The handshake era is over", n: "1,100", d: "A sense on both sides that something structural, not cyclical, just broke.",
          posts: [ { h: "@bordertown_kate", m: "X · 45m", x: "Our town literally straddles the line. Half my family shops on the other side. What are we now?" } ] }
      ],
      anxious: [
        { t: "Grocery math", n: "1,000", d: "Households pre-calculating what 50% does to weekly baskets.",
          posts: [ { h: "@cartprice_log", m: "Reddit · 30m", x: "Dairy, beer, winter produce. I did the list. It's $40 a week for my family before anything retaliatory lands." } ] }
      ],
      clarity: [
        { t: "Read the schedule", n: "600", d: "Posts walking others through what is actually covered and when.",
          posts: [ { h: "@tradelaw_annie", m: "X · 1h", x: "Energy is carved out. Autos are not. That asymmetry is the whole story — read the schedule, not the headlines." } ] }
      ]
    },
    voices: [
      { cat: "Officials", b: "GC", n: "Government of Canada", m: "Official statement · 1d ago", x: "This is economic coercion, and Canada will respond in kind and in scale." },
      { cat: "Experts", b: "EM", n: "Prof Elena Marsh", m: "Trade economist · 3h ago", x: "Tariff walls between integrated economies relocate margins, not factories." },
      { cat: "Outlets", b: "GM", n: "The Globe & Mail", m: "Canadian daily · 2h ago", x: "The counter-list will be political theatre and economic self-harm in equal measure — and it will still happen." },
      { cat: "Commentators", b: "NO", n: "@northline_ott", m: "public post · X · 18m ago", x: "Seventy years of shared defence and we're a 'security threat' the week the order needs a legal basis." },
      { cat: "Commentators", b: "MM", n: "@midwest_maker", m: "auto-parts machinist · Reddit · 1h ago", x: "My parts cross that border five times before they're a truck. Tell me who this protects." },
      { cat: "Commentators", b: "TA", n: "@tradelaw_annie", m: "trade lawyer · X · 1h ago", x: "Energy is carved out. Autos are not. That asymmetry is the whole story." }
    ]
  },
  zh: {
    basedOn: "8,600", verifiedMin: 15,
    temperature: "邊界兩側同樣怒火高漲——待人們計清楚條數、知道最終邊個埋單，怒意才稍稍冷卻成一盤冷峻的算術。",
    tenor: { pct: 78, label: "負面" },
    segs: [
      { key: "anger", label: "憤怒", pct: 36 },
      { key: "betrayal", label: "被背叛", pct: 26 },
      { key: "anxious", label: "憂慮", pct: 24 },
      { key: "clarity", label: "清醒", pct: 14 }
    ],
    clusters: {
      anger: [
        { t: "盟友唔係咁做", n: "1,700", d: "把條約盟友定性為安全威脅，令兩地網民同樣火滾。",
          posts: [
            { h: "@northline_ott", m: "X · 18分鐘", x: "共同防衛七十年，到你份命令要搵法律根據嗰個禮拜，我哋就變咗『安全威脅』。" },
            { h: "@midwest_maker", m: "Reddit · 1小時", x: "我啲零件過五次邊境先砌得成一架車。你話畀我聽呢樣嘢保護緊邊個。" }
          ] }
      ],
      betrayal: [
        { t: "握手年代玩完", n: "1,100", d: "兩邊都有一種感覺：斷裂的是結構，不是周期。",
          posts: [ { h: "@bordertown_kate", m: "X · 45分鐘", x: "我哋個鎮真係橫跨條界線。我半個家族喺對面買嘢。咁而家我哋算係乜？" } ] }
      ],
      anxious: [
        { t: "餸菜條數", n: "1,000", d: "家庭提前計算50%對每週餸籃的影響。",
          posts: [ { h: "@cartprice_log", m: "Reddit · 30分鐘", x: "乳製品、啤酒、冬天菜。我列咗張單：反制未到，我屋企每個禮拜已經貴40蚊美金。" } ] }
      ],
      clarity: [
        { t: "睇附表，唔好睇標題", n: "600", d: "帶大家逐項核對實際涵蓋範圍與時間表的帖文。",
          posts: [ { h: "@tradelaw_annie", m: "X · 1小時", x: "能源獲豁免，汽車冇。呢個不對稱就係成個故事——睇附表，唔好淨係睇標題。" } ] }
      ]
    },
    voices: [
      { cat: "Officials", b: "GC", n: "加拿大政府", m: "官方聲明 · 1日前", x: "這是經濟脅迫，加拿大將以同等方式、同等規模回應。" },
      { cat: "Experts", b: "EM", n: "Elena Marsh教授", m: "貿易經濟學者 · 3小時前", x: "深度融合經濟體之間的關稅牆，搬得動的是利潤，不是工廠。" },
      { cat: "Outlets", b: "GM", n: "環球郵報", m: "加拿大日報 · 2小時前", x: "反制清單將是政治劇場與經濟自傷各佔一半——但它仍然一定會出場。" },
      { cat: "Commentators", b: "NO", n: "@northline_ott", m: "公開帖文 · X · 18分鐘前", x: "共同防衛七十年，到你份命令要搵法律根據嗰個禮拜，我哋就變咗「安全威脅」。" },
      { cat: "Commentators", b: "MM", n: "@midwest_maker", m: "汽車零件技工 · Reddit · 1小時前", x: "我啲零件過五次邊境先砌得成一架車。你話畀我聽呢樣嘢保護緊邊個。" },
      { cat: "Commentators", b: "TA", n: "@tradelaw_annie", m: "貿易律師 · X · 1小時前", x: "能源獲豁免，汽車冇。呢個不對稱就係成個故事。" }
    ]
  }
};

/* ================= s04 — HK rents ================= */
D["confidence-s04"] = {
  en: {
    level: "High", stageAt: 1, basedOn: 12, verifiedMin: 20, more: 6,
    verdict: "The rise is measured record from two independent indices. What remains open is the driver split and whether the climb converts into a price rebound.",
    claims: [
      { tag: "ok", t: "Rents up almost 4% in H1", d: "RVD index cross-checked against Centaline's leading index; they agree within 0.3 points." },
      { tag: "ok", t: "Steepest summer pace since 2016", d: "Directly readable from the published monthly series." },
      { tag: "dev", t: "Prices to rebound up to 19% over two years", d: "An analyst scenario resting on rental demand converting to purchases — not an official forecast." }
    ],
    terms: [
      { t: "Rating and Valuation Department (RVD)", d: "The government department whose rental index is compiled from stamped tenancy records — the closest thing Hong Kong has to a full-market measure." },
      { t: "Leading index", d: "An agency-compiled index built from live transactions, faster but narrower than the official series. Agreement between the two is the strongest signal either can give." }
    ],
    confirmed: [
      { t: "Seven straight months of index rises", d: "Official monthly series." },
      { t: "Hung Hom leads districts at +6.2%", d: "Two competing agencies publish the same ranking." },
      { t: "Talent-scheme approvals and enrolment are both up", d: "Immigration Department and UGC data, current through June." }
    ],
    disputed: [
      { t: "Policy inflow vs regional cycle", d: "Government cites scheme approvals; independent economists note regional markets moved together." },
      { t: "Whether tenants' incomes can follow", d: "Wage growth is running at roughly half the rental pace." }
    ],
    unknown: [
      { t: "Whether the New Territories follow", d: "Tuen Mun and Yuen Long lagged in H1; inquiry volumes suggest a turn." },
      { t: "Any student-housing policy response", d: "Hostel expansion has been floated, not funded." }
    ],
    settle: [
      { t: "Q3 index prints", d: "Two more months decide whether 2016's peak is passed." },
      { t: "A funded hostel programme", d: "Would directly relieve the steepest district pressure." }
    ],
    interps: [
      { o: "Ming Pao", m: "HK daily · 3h ago", h: "“Rents Climb Seven Months Straight as Students Return”" },
      { o: "HK01", m: "HK online · 5h ago", h: "“The Queue on the Tenement Stairs: Hung Hom's +6.2%”" },
      { o: "SCMP", m: "HK daily · 6h ago", h: "“Recovery or Squeeze? Depends Which Side of the Lease You're On”" }
    ],
    sources: [
      { b: "差估", n: "Rating and Valuation Dept", m: "Official index · monthly", h: "Residential rental index, seven consecutive rises" },
      { b: "中原", n: "Centaline", m: "Leading index · weekly", h: "H1 rental gain confirmed at +3.8%; district ranking led by Hung Hom" },
      { b: "美聯", n: "Midland Realty", m: "Agency data · weekly", h: "Same district ranking from an independent transaction base" },
      { b: "BI", n: "Bloomberg Intelligence", m: "Analyst scenario · this week", h: "19% two-year price-rebound case, conditional on demand handover" }
    ],
    explore: ["RVD rental index", "Talent-scheme inflow", "Student housing supply"]
  },
  zh: {
    level: "High", stageAt: 1, basedOn: 12, verifiedMin: 20, more: 6,
    verdict: "升幅出自兩個獨立指數的實測紀錄。未有定論的是成因比重，以及升浪會否轉化為樓價反彈。",
    claims: [
      { tag: "ok", t: "上半年租金升近4%", d: "差估署指數與中原領先指數互相核對，相差不足0.3點。" },
      { tag: "ok", t: "2016年以來最急的夏季升速", d: "官方按月數列直接可讀。" },
      { tag: "dev", t: "樓價兩年內反彈最多19%", d: "分析員情景推算，建基於租務需求轉化為置業——並非官方預測。" }
    ],
    terms: [
      { t: "差餉物業估價署（差估署）", d: "政府部門，其租金指數按已打釐印的租約紀錄編製——是香港最接近全市場的量度。" },
      { t: "領先指數", d: "代理行按實時成交編製的指數，較快但覆蓋較窄。兩者脗合，就是雙方能給出的最強訊號。" }
    ],
    confirmed: [
      { t: "指數連升七個月", d: "官方按月數列。" },
      { t: "紅磡以+6.2%領先各區", d: "兩間互相競爭的代理行公布同一排名。" },
      { t: "人才計劃批核與大學收生同步上升", d: "入境處及教資會數據，更新至6月。" }
    ],
    disputed: [
      { t: "政策輸入定周期回升", d: "政府引用計劃批核；獨立經濟學者指區內市場同步向上。" },
      { t: "租客收入追唔追得上", d: "工資增速大約只及租金升速的一半。" }
    ],
    unknown: [
      { t: "新界會否接力", d: "屯門、元朗上半年落後；查詢量暗示風向轉變。" },
      { t: "學生宿舍政策會否出手", d: "擴建宿舍有人放風，未有撥款。" }
    ],
    settle: [
      { t: "第三季指數", d: "多兩個月數據，就知2016年高位破唔破。" },
      { t: "一個有撥款的宿舍計劃", d: "可直接紓緩升幅最急地區的壓力。" }
    ],
    interps: [
      { o: "明報", m: "香港日報 · 3小時前", h: "「學生回流帶動　租金連升七個月」" },
      { o: "香港01", m: "香港網媒 · 5小時前", h: "「唐樓樓梯上的人龍　紅磡+6.2%的租金現場」" },
      { o: "南華早報", m: "香港日報 · 6小時前", h: "「復甦定壓力？睇你坐喺租約邊一邊」" }
    ],
    sources: [
      { b: "差估", n: "差餉物業估價署", m: "官方指數 · 按月", h: "住宅租金指數連升七個月" },
      { b: "中原", n: "中原地產", m: "領先指數 · 按週", h: "上半年租金升3.8%獲確認；分區排名紅磡居首" },
      { b: "美聯", n: "美聯物業", m: "代理數據 · 按週", h: "以獨立成交數據得出同一分區排名" },
      { b: "BI", n: "彭博行業研究", m: "分析情景 · 本週", h: "兩年樓價反彈19%的推算，前提是需求接力" }
    ],
    explore: ["差估署租金指數", "人才計劃流入", "學生宿舍供應"]
  }
};

D["pulse-s04"] = {
  en: {
    basedOn: "6,900", verifiedMin: 10,
    temperature: "Weary tenants, satisfied landlords, and a city doing arithmetic out loud — resignation with a sharp edge of gallows humour.",
    tenor: { pct: 64, label: "negative" },
    segs: [
      { key: "resigned", label: "Resigned", pct: 33 },
      { key: "frustrated", label: "Frustrated", pct: 27 },
      { key: "wry", label: "Wry", pct: 22 },
      { key: "hopeful", label: "Hopeful", pct: 18 }
    ],
    clusters: {
      resigned: [
        { t: "Renewal-letter season", n: "1,300", d: "Tenants comparing renewal increases, mostly resigned to signing.",
          posts: [
            { h: "@tokwawan_amy", m: "Threads · 25m", x: "Landlord wants $1,800 more. Agent says be grateful it isn't $2,500. This is the conversation now." },
            { h: "@island_east_t", m: "X · 1h", x: "Viewed six flats in two weekends. Four were gone before the viewing." }
          ] }
      ],
      frustrated: [
        { t: "Wages didn't get the memo", n: "1,000", d: "The gap between pay rises and rent rises, done as arithmetic.",
          posts: [ { h: "@payslip_vs_rent", m: "Reddit · 40m", x: "Pay up 2%, rent up 6% in my district. The spreadsheet doesn't care about the recovery narrative." } ] }
      ],
      wry: [
        { t: "Gallows humour", n: "800", d: "The city's traditional coping mechanism, in full effect.",
          posts: [ { h: "@shoebox_deluxe", m: "Threads · 2h", x: "My 280 sq ft is now 'a rare gem with strong rental support'. I live inside an investment thesis." } ] }
      ],
      hopeful: [
        { t: "At least the market moves", n: "600", d: "Owners and would-be sellers reading the same data as a thaw.",
          posts: [ { h: "@mortgage_finally", m: "X · 3h", x: "Negative equity for three years. If rents hold, we finally list in spring." } ] }
      ]
    },
    voices: [
      { cat: "Officials", b: "差估", n: "Rating and Valuation Dept", m: "Official data · monthly", x: "The index has recorded seven consecutive monthly increases across all classes." },
      { cat: "Experts", b: "AL", n: "Dr Alicia Leung", m: "Housing researcher, CityU · 3h ago", x: "A rental market can run ahead of incomes for a while, but not ahead of arithmetic." },
      { cat: "Outlets", b: "01", n: "HK01", m: "HK online · 5h ago", x: "On the tenement stairs in Hung Hom, the queue is the story: fifteen viewers, one flat, sixty minutes." },
      { cat: "Outlets", b: "明", n: "Ming Pao", m: "HK daily · 3h ago", x: "Agents report landlords repricing mid-week — a behaviour last routine in 2016." },
      { cat: "Commentators", b: "TA", n: "@tokwawan_amy", m: "tenant · Threads · 25m ago", x: "Landlord wants $1,800 more. Agent says be grateful it isn't $2,500. This is the conversation now." },
      { cat: "Commentators", b: "SD", n: "@shoebox_deluxe", m: "renter · Threads · 2h ago", x: "My 280 sq ft is now 'a rare gem with strong rental support'. I live inside an investment thesis." }
    ]
  },
  zh: {
    basedOn: "6,900", verifiedMin: 10,
    temperature: "租客疲憊、業主稱心，一座城市在公開計數——無奈之中，帶一股黑色幽默的鋒利。",
    tenor: { pct: 64, label: "負面" },
    segs: [
      { key: "resigned", label: "無奈", pct: 33 },
      { key: "frustrated", label: "沮喪", pct: 27 },
      { key: "wry", label: "自嘲", pct: 22 },
      { key: "hopeful", label: "有盼頭", pct: 18 }
    ],
    clusters: {
      resigned: [
        { t: "續約信季節", n: "1,300", d: "租客互相比較續租加幅，大多數無奈照簽。",
          posts: [
            { h: "@tokwawan_amy", m: "Threads · 25分鐘", x: "業主話加$1,800。經紀叫我偷笑，話唔係加$2,500。而家嘅對話就係咁。" },
            { h: "@island_east_t", m: "X · 1小時", x: "兩個週末睇咗六個盤，有四個未到睇樓時間已經租咗出去。" }
          ] }
      ],
      frustrated: [
        { t: "人工冇收到通知", n: "1,000", d: "加薪與加租之間的落差，被逐條數擺上枱。",
          posts: [ { h: "@payslip_vs_rent", m: "Reddit · 40分鐘", x: "人工加2%，我區租金加6%。張試算表唔會理咩復甦故事。" } ] }
      ],
      wry: [
        { t: "黑色幽默", n: "800", d: "呢個城市的傳統應對機制，全速運作中。",
          posts: [ { h: "@shoebox_deluxe", m: "Threads · 2小時", x: "我間280呎而家叫做「租務支持強勁的罕有筍盤」。原來我住喺一份投資論文入面。" } ] }
      ],
      hopeful: [
        { t: "起碼個市郁", n: "600", d: "業主與準賣家把同一組數據讀成解凍訊號。",
          posts: [ { h: "@mortgage_finally", m: "X · 3小時", x: "負資產捱咗三年。租金企得穩嘅話，我哋春天終於可以放盤。" } ] }
      ]
    },
    voices: [
      { cat: "Officials", b: "差估", n: "差餉物業估價署", m: "官方數據 · 按月", x: "指數於各類別均錄得連續七個月按月上升。" },
      { cat: "Experts", b: "AL", n: "梁凱晴博士", m: "房屋研究學者，城大 · 3小時前", x: "租金可以跑贏收入一段時間，但跑不贏數學。" },
      { cat: "Outlets", b: "01", n: "香港01", m: "香港網媒 · 5小時前", x: "紅磡唐樓樓梯上，人龍本身就是新聞：十五個準租客，一個單位，六十分鐘。" },
      { cat: "Outlets", b: "明", n: "明報", m: "香港日報 · 3小時前", x: "代理反映業主週中改價——上一次成為常態，已是2016年。" },
      { cat: "Commentators", b: "TA", n: "@tokwawan_amy", m: "租客 · Threads · 25分鐘前", x: "業主話加$1,800。經紀叫我偷笑，話唔係加$2,500。而家嘅對話就係咁。" },
      { cat: "Commentators", b: "SD", n: "@shoebox_deluxe", m: "租客 · Threads · 2小時前", x: "我間280呎而家叫做「租務支持強勁的罕有筍盤」。原來我住喺一份投資論文入面。" }
    ]
  }
};

/* ---- emit ---- */
let n = 0;
for (const key of Object.keys(D)) {
  const renderer = key.startsWith("confidence") ? "confidence" : "pulse";
  const dataName = renderer === "confidence" ? "CONF" : "PULSE";
  for (const lang of ["en", "zh"]) {
    fs.writeFileSync(`${lang}/${key}.html`, shell(lang, dataName, D[key][lang], renderer));
    n++;
  }
}
console.log("wrote", n, "sheet pages");
