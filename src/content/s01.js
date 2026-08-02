/* s01 — Strait of Hormuz closure. P1 starter: Plain strings (voices fall back);
   P2 adds map/timeline/risk/signal kit cards + Calm/ELI5 triples. */
module.exports = {
  en: {
    story: "s01", tag: "Essential", conf: "Medium", voices: "54",
    nextTitle: "Should under-16s be banned from social media?",
    tabs: ["The Story", "Key Facts", "Why This Matters", "What's Next"],
    hero: {
      img: "../assets/img/hero-hormuz.svg",
      title: "The strait that [he:🌊] prices the world [he:🛢️] is closed. [he:🚫]",
      paras: [
        { p: "Twelve days of strikes have hit **more than 5,000 targets** across Iran, and the response has shut the [kw:Strait of Hormuz] — the channel a fifth of the world's oil passes through.",
          c: "Here's where things stand: twelve days of strikes, **more than 5,000 targets** hit — and in response, the [kw:Strait of Hormuz] has been closed. A fifth of the world's oil normally sails through it.",
          e: "For twelve days, one side has been striking targets — **over 5,000** so far. The other side answered by closing the [kw:Strait of Hormuz], the sea lane a fifth of the world's oil travels through." },
        { p: "Officials describe the campaign as pressure. What no briefing has offered is **any description of how it ends**.",
          c: "Officials keep calling the campaign 'pressure'. What nobody has offered yet is **any picture of how it ends**.",
          e: "The people in charge call it 'pressure'. But nobody — not one briefing — has said **how this is supposed to end**." }
      ]
    },
    heroConn: { def: "The numbers behind the campaign are not in dispute. Almost everything else is.",
                e5: "🔢 The numbers aren't in doubt — almost everything else is. 🤷" },
    cards: [
      { type: "keyfacts", data: {
          tiles: [{ fig: "5,000+", lab: "targets struck" }, { fig: "$140", lab: "Brent crude, past" }],
          paras: [
            { p: "The [g:Strait of Hormuz has closed to |shipping] — the first full closure in its history. Tanker transits have been at zero for seven days, and insurers have withdrawn cover entirely.",
              c: "The headline fact: the [g:Strait of Hormuz has closed to |shipping] — the first full closure ever. Tankers have made zero transits for seven days, and insurers have pulled cover completely.",
              e: "The big fact: the [g:Strait of Hormuz is closed to |ships] — that has never happened before. No tankers for seven days, and insurers won't cover the trip at all." },
            { p: "The death toll is [o:disputed by three thousand |lives] between the two sides' counts, and the stated objective has shifted from nuclear sites to [kw:restoring deterrence].",
              c: "The two sides' casualty counts are [o:three thousand lives |apart], and the stated goal has drifted — from nuclear sites to [kw:restoring deterrence].",
              e: "The two sides can't agree how many people have died — their counts are [o:three thousand |apart]. And the goal keeps changing: first nuclear sites, now [kw:restoring deterrence]." }
          ] },
        conn: { def: "Those are the facts on the record. Here's why they reach your wallet.",
                e5: "📋 Those are the facts. Now here's why they reach YOUR wallet. 👛" } },
      { type: "why", data: {
          boxes: [
            { vis: "⛽", lab: "Your fuel",
              para: { p: "A fifth of the world's oil normally transits the strait. With it shut, **every barrel everywhere reprices** — including the one in your tank.",
                      c: "A fifth of the world's oil normally passes through. With the strait shut, **every barrel reprices** — including the one in your tank.",
                      e: "A fifth of the world's oil goes through this one channel. Close it, and **every drop of petrol costs more** — yours too." } },
            { vis: "🛒", lab: "Your shelf",
              para: { p: "Shipping surcharges are already appearing in freight quotes; they reach **retail prices within weeks**.",
                      c: "Shipping surcharges are already showing up in freight quotes — and they reach **shelf prices within weeks**.",
                      e: "Shipping is already getting pricier. In a few weeks, **things in shops cost more** because of it." } },
            { vis: "📈", lab: "Your bills",
              para: { p: "Oil past $140 feeds into electricity, plastics and food logistics — the rise **spreads far beyond the pump**.",
                      c: "With oil past $140, the rise feeds into electricity, plastics and food logistics — it **spreads far beyond the pump**.",
                      e: "Oil over $140 makes electricity, plastic and food delivery dearer too — it's **not just petrol**." } }
          ],
          para: { p: "A closed strait seven thousand kilometres away lands on your receipts before any diplomat lands on a runway.",
                  c: "A closed strait seven thousand kilometres away reaches your receipts before any diplomat reaches a runway.",
                  e: "A blocked sea lane far, far away shows up on your receipts before the politicians even get on a plane." } },
        conn: { def: "That's the cost to you. Here's what could move it next.",
                e5: "💸 That's the cost to you. Here's what could change it next. ⏭️" } },
      { type: "next", data: {
          rows: [
            { vis: "🚢", lab: "Insurance is the signal",
              para: { p: "Insurers withdrew cover before every previous price spike. A single insured transit would mark the turn.",
                      c: "Insurers pulled cover before every previous spike. One insured tanker transit would mark the turn.",
                      e: "Watch the insurers. The moment one covered ship sails through, things are turning around." } },
            { vis: "🕊️", lab: "The Oman channel",
              para: { p: "Oman has hosted three quiet contacts. Collapsed is not the same as over.",
                      c: "Oman has hosted three quiet contacts already. Collapsed is not the same as over.",
                      e: "Oman keeps quietly passing messages between the two sides. The talks aren't dead — just sleeping." } },
            { vis: "🛰️", lab: "The target list",
              para: { p: "Strikes have drifted toward infrastructure over four days — the drift tells you more than the briefings.",
                      c: "Strikes have drifted toward infrastructure over the past four days — the drift says more than the briefings do.",
                      e: "The strikes keep moving toward power stations and ports. Where they land tells you more than what anyone says." } }
          ],
          para: { p: "No historical precedent exists for a full closure — which is why every forecast, including this one, is provisional.",
                  c: "There's no precedent for a full closure — which is why every forecast, including this one, is provisional.",
                  e: "This has never happened before. So every guess about what's next — even this one — is just a guess." } },
        conn: { def: "That's the strait. The next fight is over who your kids talk to online.",
                e5: "🌊 That's the strait. Next up: who your kids get to talk to online. 📵" } }
    ],
    ovConn: { def: "Nothing about being a teenager online changed overnight. What changed was the appetite to act.",
              e5: "⚠️ Nothing about being a teenager online 🌐 changed overnight — the grown-ups just decided to act. 🤯" }
  },
  zh: {
    story: "s01", tag: "必讀", conf: "中", voices: "54",
    nextTitle: "16歲以下應否禁用社交媒體？",
    tabs: ["本篇", "關鍵事實", "為何重要", "下一步"],
    hero: {
      img: "../assets/img/hero-hormuz.svg",
      title: "為全球定價的 [he:🌊] 海峽，[he:🛢️] 封了。[he:🚫]",
      paras: [
        "十二日空襲，擊中伊朗境內**逾5,000個目標**；報復之下，[kw:霍爾木茲海峽]宣告封鎖——全球五分之一的石油，平日正是取道這條水道。",
        "官員把行動形容為「施壓」。但十二日以來，沒有任何一場簡報講過**這一切如何收科**。"
      ]
    },
    heroConn: { def: "行動背後的數字並無爭議。其餘幾乎一切都有。" },
    cards: [
      { type: "keyfacts", data: {
          tiles: [{ fig: "5,000+", lab: "個目標被擊中" }, { fig: "$140", lab: "布蘭特期油升穿" }],
          paras: [
            "[g:霍爾木茲海峽已對商船|封閉]——歷史上首次全面封鎖。油輪通航量連續七日歸零，保險商已全面撤保。",
            "死亡數字[o:雙方統計相差|三千]，而宣稱目標已由核設施轉為[kw:重建威懾]。"
          ] },
        conn: { def: "這些是紀錄在案的事實。接下來看它們如何摸到你的錢包。" } },
      { type: "why", data: {
          boxes: [
            { vis: "⛽", lab: "你的燃油", para: "全球五分之一的石油平日取道此峽。一旦封鎖，**每一桶油都要重新定價**——包括你油缸裏那一桶。" },
            { vis: "🛒", lab: "你的貨架", para: "航運附加費已出現在運費報價；數星期內就會**傳到零售價**。" },
            { vis: "📈", lab: "你的帳單", para: "油價升穿140美元，電力、塑膠、食品物流全部受累——升幅**遠不止於油站**。" }
          ],
          para: "七千公里外一條封鎖的海峽，先落在你的單據上，然後才有外交官落在停機坪上。" },
        conn: { def: "這是你的代價。接下來看甚麼可以改變它。" } },
      { type: "next", data: {
          rows: [
            { vis: "🚢", lab: "保險是訊號", para: "過往每次油價急升之前，保險商都先行撤保。只要有一艘獲承保的油輪通過，就是轉勢的標記。" },
            { vis: "🕊️", lab: "阿曼渠道", para: "阿曼已促成三次低調接觸。破裂不等於玩完。" },
            { vis: "🛰️", lab: "打擊目標的走向", para: "過去四日，空襲明顯移向基礎設施——目標的漂移，比簡報講得更多。" }
          ],
          para: "全面封鎖史無前例——所以每一個預測，包括這一個，都只屬暫定。" },
        conn: { def: "海峽講完。下一場爭議：你的孩子在網上可以跟誰說話。" } }
    ],
    ovConn: { def: "青少年上網的處境並非一夜改變，改變的是社會出手處理的決心。" }
  }
};
