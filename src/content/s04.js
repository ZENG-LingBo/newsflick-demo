/* s04 — HK rents: steepest summer climb in a decade. P1 starter (Plain; voices fall back).
   Structure borrows v2's story 2 (flatsharing). P2 adds HK Leaflet map + chart + ground. */
module.exports = {
  en: {
    story: "s04", tag: "Local", conf: "High", voices: "58",
    nextTitle: "The strait that prices the world is closed",
    tabs: ["The Story", "Key Facts", "Then vs Now", "Why This Matters", "What's Next"],
    hero: {
      img: "../assets/img/hero-flatshare.jpg",
      title: "The steepest [he:🏠] summer climb [he:📈] in a decade. [he:🇭🇰]",
      paras: [
        { p: "Hong Kong rents rose **almost 4% in the first half** — on pace for the biggest summer gain since 2016. The drivers are measurable: mainland professionals and students, returning expats, and thin supply.",
          c: "Hong Kong rents are up **almost 4% this half-year** — the fastest summer pace since 2016. The drivers are all measurable: mainland professionals and students arriving, expats returning, and very little new supply.",
          e: "Rents in Hong Kong jumped **almost 4% in six months** — the fastest summer rise in ten years. More people arriving, hardly any new flats. That's the whole recipe." },
        { p: "Whether this is recovery or squeeze depends on [kw:which side of a lease you sit].",
          c: "Whether you call it a recovery or a squeeze depends on [kw:which side of the lease you're on].",
          e: "Good news or bad news? Depends whether [kw:you own the flat or rent it]." }
      ]
    },
    heroConn: { def: "The numbers, measured — from two independent indices.",
                e5: "📏 The numbers — measured twice, by two different rulers. 📊" },
    cards: [
      { type: "keyfacts", data: {
          tiles: [{ fig: "+3.8%", lab: "rents, H1" }, { fig: "$18.9K", lab: "median 1-bed, urban" }],
          paras: [
            "The Rating and Valuation Department's index has risen [g:seven months |straight], cross-checked against Centaline's leading index — they agree within 0.3 points.",
            "Analysts see prices [b:rebounding up to 19% over two |years] on the back of rental growth, though how much is policy-driven inflow versus cycle is [o:still |debated]."
          ] },
        conn: { def: "Those are this summer's numbers. Put them beside 2016's.",
                e5: "🗓️ Those are this summer's numbers. Now put them next to 2016. 🪞" } },
      { type: "thennow", data: {
          then: { lab: "2016", fig: "124.9", desc: "the index peak — the last time landlords repriced mid-week" },
          now: { lab: "NOW", fig: "124.5", desc: "within one normal month's move of the record, after seven straight rises" },
          para: { p: "The pattern is district-led: **Hung Hom is up 6.2%**, fastest since 2016 — universities first, then the [b:rail |lines].",
                  c: "It's district-led: **Hung Hom leads at +6.2%**, the fastest since 2016 — university areas first, then the [b:rail |lines].",
                  e: "Some districts move first: **Hung Hom is up 6.2%**, the fastest anywhere. First near the universities, then along the [b:train |lines]." } },
        conn: { def: "A number at a record is one thing. Queuing on a staircase is another.",
                e5: "📈 A record number is one thing. Queuing on a staircase for a flat is another. 🪜" } },
      { type: "why", data: {
          boxes: [
            { vis: "✍️", lab: "Your lease", para: "Renewal letters now open **$1,500–2,000 higher**; agents call waiting 'paying'." },
            { vis: "🎓", lab: "Your district", para: "University areas move first — **Hung Hom +6.2%** — then the pressure rolls down the rail lines." },
            { vis: "💰", lab: "Your savings", para: "Wage growth runs at roughly **half the rental pace**; the gap compounds every renewal." }
          ],
          para: "A rental market can run ahead of incomes for a while, but not ahead of arithmetic — the question is who absorbs the gap." },
        conn: { def: "That's the squeeze today. Here's what decides the next six months.",
                e5: "🤏 That's the squeeze today. Here's what decides the next six months. 🗓️" } },
      { type: "next", data: {
          rows: [
            { vis: "🚄", lab: "The New Territories follow?", para: "Tuen Mun and Yuen Long lagged in H1 — agents report inquiry volume doubling." },
            { vis: "🏦", lab: "Renting converts to buying", para: "The 19% two-year price-rebound case rests entirely on this handover." },
            { vis: "🏗️", lab: "Student housing policy", para: "Hostel expansion has been floated by universities and government; nothing is funded yet." }
          ],
          para: "Q3 data lands within two months — it decides whether 2016's record [i:finally falls]." },
        conn: { def: "Story 4 / 4 read — you've completed today's essentials.",
                e5: "🏁 Story 4 of 4 — you've finished today's essentials! 🎉" } }
    ],
    ovConn: { def: "The numbers behind the campaign are not in dispute. Almost everything else is.",
              e5: "🔢 The numbers aren't in doubt — almost everything else is. 🤷" }
  },
  zh: {
    story: "s04", tag: "本地", conf: "高", voices: "58",
    nextTitle: "為全球定價的海峽，封了",
    tabs: ["本篇", "關鍵事實", "今昔對比", "為何重要", "下一步"],
    hero: {
      img: "../assets/img/hero-flatshare.jpg",
      title: "十年來最急的 [he:🏠] 夏季升浪。[he:📈][he:🇭🇰]",
      paras: [
        "香港住宅租金上半年**升近4%**——有望創2016年以來最大的夏季升幅。推手有數可依：內地專才與學生、回流外派人員，加上供應緊絀。",
        "這是復甦還是壓力，視乎你[kw:坐在租約的哪一邊]。"
      ]
    },
    heroConn: { def: "實測的數字——來自兩個獨立指數。" },
    cards: [
      { type: "keyfacts", data: {
          tiles: [{ fig: "+3.8%", lab: "上半年租金" }, { fig: "$18.9K", lab: "市區一房月租中位數" }],
          paras: [
            "差餉物業估價署指數已[g:連升七個|月]，並與中原領先指數互相核對——兩者相差不足0.3點。",
            "有分析預期樓價受租金帶動[b:兩年內反彈最多|19%]；至於幾多來自政策輸入人才、幾多屬周期回升，[o:仍有|爭論]。"
          ] },
        conn: { def: "這是今個夏天的數字。放到2016年旁邊看看。" } },
      { type: "thennow", data: {
          then: { lab: "2016", fig: "124.9", desc: "指數高位——上一次業主週中改價的年份" },
          now: { lab: "現在", fig: "124.5", desc: "連升七個月後，距離紀錄只差一個普通月份的升幅" },
          para: "格局由地區帶動：**紅磡升6.2%**、全港最快——大學周邊先行，然後沿[b:鐵路|線]擴散。" },
        conn: { def: "數字迫近紀錄是一回事，喺樓梯排隊睇樓係另一回事。" } },
      { type: "why", data: {
          boxes: [
            { vis: "✍️", lab: "你的租約", para: "續約信開價**貴$1,500至2,000**；代理話：等，就係付鈔。" },
            { vis: "🎓", lab: "你的地區", para: "大學周邊先行——**紅磡+6.2%**——然後壓力沿鐵路線滾落。" },
            { vis: "💰", lab: "你的積蓄", para: "工資增速大約只及**租金升速一半**；落差每次續約都在滾大。" }
          ],
          para: "租金可以跑贏收入一段時間，但跑不贏數學——問題是條數最後由誰埋單。" },
        conn: { def: "這是今日的擠壓。接下來看甚麼決定往後六個月。" } },
      { type: "next", data: {
          rows: [
            { vis: "🚄", lab: "新界接唔接力？", para: "屯門、元朗上半年落後——代理反映查詢量倍增。" },
            { vis: "🏦", lab: "租轉買", para: "兩年反彈19%的推算，正正建基於這一步接力。" },
            { vis: "🏗️", lab: "學生宿舍政策", para: "大學與政府都放過風擴建宿舍；至今未有一項落實撥款。" }
          ],
          para: "第三季數據兩個月內公布——它決定2016年的紀錄[i:破唔破]。" },
        conn: { def: "四篇讀完——今日的必讀，到此為止。" } }
    ],
    ovConn: { def: "行動背後的數字並無爭議。其餘幾乎一切都有。" }
  }
};
