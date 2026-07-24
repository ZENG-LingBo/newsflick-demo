/* Build 8 confidence sheets on the ORIGINAL sheet UI.
   Templates: confidence-s01 (→ new s01, s02), confidence-s03 (→ new s03), confidence-s02 (→ new s04).
   Run: node build-conf.js */
const fs = require("fs");

const TPL = { s01: "confidence-s01", s02: "confidence-s01", s03: "confidence-s03", s04: "confidence-s02" };

/* section rebuild helpers (exact original markup) */
const ITEM_TERM = (t, tag, p) => `<div class="cs-item cs-item--terms"><div class="cs-itemhead"><p class="cs-t cs-t--nowrap">${t}</p><span class="cs-etag cs-etag--term">${tag}</span></div><p class="cs-p">${p}</p></div>`;
const MINI = n => `<div class="cs-mini"><span class="f"><img src="../assets/img/av${(n % 9) + 1}.png" alt=""></span><span class="f"><img src="../assets/img/av${((n + 3) % 9) + 1}.png" alt=""></span><span class="f"><img src="../assets/img/av${((n + 6) % 9) + 1}.png" alt=""></span><span class="n">+4</span></div>`;
const FOOT = (view, n) => `<div class="cs-foot"><div class="rule"></div><div class="cs-footrow">${MINI(n)}<p class="cs-view">${view}</p></div></div>`;
const ITEM_CONF = (t, p, etags, view, n) => `<div class="cs-item"><div class="cs-itemhead"><span class="d"></span><p class="cs-t">${t}</p></div><p class="cs-p">${p}</p><div class="cs-etags">${etags}</div>${FOOT(view, n)}</div>`;
const ITEM_EV = (tagCls, tagTxt, t, p) => `<div class="cs-item"><div class="cs-etags cs-etags--one"><span class="cs-etag cs-etag--${tagCls}">${tagTxt}</span></div><p class="cs-t cs-t--block">${t}</p><p class="cs-p">${p}</p></div>`;
const ITEM_DISP = (t, k1, v1, k2, v2, view, n) => `<div class="cs-item"><div class="cs-itemhead"><span class="d d--disputed"></span><p class="cs-t">${t}</p></div><div class="cs-hr"></div><div class="cs-side"><p class="k">${k1}</p><p class="v">${v1}</p></div><div class="cs-hr"></div><div class="cs-side"><p class="k">${k2}</p><p class="v">${v2}</p></div>${FOOT(view, n)}</div>`;
const ITEM_UNK = (t, p, awaiting, view, n) => `<div class="cs-item"><div class="cs-itemhead"><span class="d d--disputed"></span><p class="cs-t">${t}</p></div><p class="cs-p">${p}</p><div class="cs-etags cs-etags--one"><span class="cs-etag cs-etag--awaiting">${awaiting}</span></div><div class="cs-foot"><div class="rule"></div><div class="cs-footrow"><div class="cs-mini cs-mini--one"><span class="f"><img src="../assets/img/av${(n % 9) + 1}.png" alt=""></span></div><p class="cs-view">${view}</p></div></div></div>`;
const ITEM_SETTLE = (t, p, awaiting) => `<div class="cs-item"><div class="cs-itemhead"><span class="d d--disputed"></span><p class="cs-t">${t}</p></div><p class="cs-p">${p}</p><div class="cs-etags cs-etags--one"><span class="cs-etag cs-etag--awaiting">${awaiting}</span></div></div>`;
const WHY = (i, tagCls, tagTxt, t, p) => `<div class="cs-why${i === 0 ? " cs-why--open" : ""}"><div class="cs-whyhead"><span class="cs-tag cs-tag--${tagCls}">${tagTxt}</span><svg class="ico"><use href="#ic-arrow-down-01"/></svg></div><p class="cs-whytitle">${t}</p><div class="cs-whybody-wrap"><div><p class="cs-whybody">${p}</p></div></div></div>`;

const L = {
  en: { term: "Term", view: "View sources &rarr;", awaiting: "Awaiting", tags: { ok: ["confirmed", "Confirmed"], dev: ["ongoing", "Ongoing"], un: ["unverified", "Unverified"] },
        et: { official: "Official", witness: "Witness", physical: "Physical", notyet: "Not yet" } },
  zh: { term: "詞條", view: "查看來源 &rarr;", awaiting: "有待進展", tags: { ok: ["confirmed", "已證實"], dev: ["ongoing", "持續中"], un: ["unverified", "未經核實"] },
        et: { official: "官方", witness: "目擊", physical: "實證", notyet: "暫未有" } }
};

/* ---------------- data ---------------- */
const D = {
  s01: {
    en: {
      level: "MEDIUM", state: "Developing", flags: true, basedOn: "11 sources", verified: "Last verified 28m ago",
      verdict: "The scale of the campaign and the closure itself are well documented. Casualty figures and intent are contested, and no independent monitor has ground access.",
      status: { Developing: "The scale of the campaign and the closure itself are well documented. Casualty figures and intent are contested, and no independent monitor has ground access.", Verifying: "The closure and the campaign's scale are established. Casualty figures remain contested.", Stabilised: "What remains open is named and is not expected to resolve soon." },
      claims: [["ok", "The Strait of Hormuz is closed", "Tanker transits at zero for seven days; insurers have withdrawn cover. All parties acknowledge the closure."],
               ["dev", "Over 5,000 targets struck", "Satellite tallies and both sides' claims align on scale; the target breakdown is still being verified."],
               ["un", "1,255 deaths", "The two sides' counts differ by roughly three thousand. No third party can reach the strike zones."]],
      terms: [["Chokepoint", "A narrow passage that a large share of global trade must physically pass through. Hormuz carries about a fifth of the world's oil; there is no sea alternative."],
              ["War-risk premium", "The extra insurance cost for ships entering a conflict zone. When insurers withdraw cover entirely, traffic stops even without a formal blockade."]],
      confirmed: [["First full closure in the strait's history", "Transit data is measured independently of either government.", ["official", "physical"]],
                  ["Brent crude above $140", "Exchange-traded prices are public record.", ["official", "witness", "physical"]]],
      evidence: [["official", "Tanker-transit records", "Seven consecutive days at zero transits, from independent shipping trackers."],
                 ["witness", "Port-city accounts", "Residents and crews describe halted loading and departures under escort."],
                 ["physical", "Satellite strike imagery", "Cumulative damage visible at more than 5,000 distinct sites."],
                 ["notyet", "Independent casualty count", "No third party has ground access; the toll cannot yet be verified."]],
      disputed: [["The civilian death toll", "One side's count", "Officials publish 1,255, concentrated at military-linked sites.", "The other side's count", "Authorities in the strike zones report over 4,000, including residential areas."],
                 ["What the campaign is for", "Stated aims, week one", "Briefings named nuclear facilities as the objective.", "Stated aims, now", "The language has shifted to 'restoring deterrence' — a posture, not a target list."]],
      unknown: [["How long the closure holds", "No historical precedent exists to model against."],
                ["Whether talks resume", "The Oman channel is open but neither principal has re-engaged."]],
      settle: [["Independent ground access", "A UN or third-party mission could settle the casualty dispute."],
               ["A stated end condition", "Any published terms would let observers measure distance to resolution."],
               ["Reopened transit", "A single insured tanker transit would mark the turn."]],
      settleNote: "Every gap here is Awaiting, expected to resolve with events rather than investigation alone — which is why the story is Developing and volatile in both directions.",
      explore: ["Strait of Hormuz", "Oil price pass-through", "Oman back channel"]
    },
    zh: {
      level: "MEDIUM", state: "Developing", flags: true, basedOn: "11 個來源", verified: "28分鐘前核實",
      verdict: "行動規模與封鎖本身均有充分紀錄。傷亡數字及意圖仍有爭議，且無獨立監察可進入現場。",
      status: { Developing: "行動規模與封鎖本身均有充分紀錄。傷亡數字及意圖仍有爭議，且無獨立監察可進入現場。", Verifying: "封鎖與行動規模已確立。傷亡數字仍有爭議。", Stabilised: "尚未解決的問題已一一列明，預期短期內不會有答案。" },
      claims: [["ok", "霍爾木茲海峽已封鎖", "油輪通航量連續七日歸零；保險商全面撤保。各方均承認封鎖。"],
               ["dev", "逾5,000個目標被擊中", "衛星統計與雙方說法在規模上一致；目標細項仍在核實。"],
               ["un", "1,255人死亡", "雙方統計相差約三千。無第三方能進入空襲區。"]],
      terms: [["咽喉要道", "全球貿易必經的狹窄水道。霍爾木茲承載全球約五分之一的石油，海路上並無替代。"],
              ["戰爭風險保費", "船隻駛入衝突區的額外保險成本。保險商一旦全面撤保，即使沒有正式封鎖，航運也會自行停頓。"]],
      confirmed: [["海峽歷史上首次全面封鎖", "通航數據由第三方獨立量度，不受任何一方政府左右。", ["official", "physical"]],
                  ["布蘭特期油升穿140美元", "交易所價格屬公開紀錄。", ["official", "witness", "physical"]]],
      evidence: [["official", "油輪通航紀錄", "獨立航運追蹤機構錄得連續七日零通航。"],
                 ["witness", "港口城市目擊", "居民與船員形容裝卸停頓、船隻須護航離港。"],
                 ["physical", "衛星空襲影像", "逾5,000個地點的累計損毀清晰可見。"],
                 ["notyet", "獨立傷亡統計", "無第三方能進入現場；數字暫時無法核實。"]],
      disputed: [["平民死亡數字", "一方的統計", "官方公布1,255人，集中於軍事相關地點。", "另一方的統計", "空襲區當局呈報逾4,000人，包括住宅區。"],
                 ["行動到底為了甚麼", "第一週的說法", "簡報點名核設施為目標。", "現在的說法", "措辭已轉為「重建威懾」——是姿態，不是目標清單。"]],
      unknown: [["封鎖會維持多久", "歷史上無先例可作參照。"],
                ["談判會否重啟", "阿曼渠道仍開，但兩位主角未有一位重新入局。"]],
      settle: [["獨立實地調查", "聯合國或第三方調查團可釐清傷亡爭議。"],
               ["公開的停火條件", "任何白紙黑字的條件，都能讓外界量度距離終局有多遠。"],
               ["恢復通航", "只要有一艘獲承保的油輪通過，就是轉勢的標記。"]],
      settleNote: "此處每項缺口均屬「有待進展」，預期隨事態而非單靠調查解決——這正是報道處於「發展中」、且可升可跌的原因。",
      explore: ["霍爾木茲海峽", "油價轉嫁", "阿曼秘密渠道"]
    }
  },
  s02: {
    en: {
      level: "MEDIUM", state: "Developing", flags: false, basedOn: "9 sources", verified: "Last verified 35m ago",
      verdict: "The law and its deadlines are settled record. Whether a ban makes teenagers safer is contested, and the evidence does not settle it.",
      status: { Developing: "The law and its deadlines are settled record. Whether a ban makes teenagers safer is contested, and the evidence does not settle it.", Verifying: "The core account is established. Whether a ban helps is still contested.", Stabilised: "What remains open is named and is not expected to resolve soon." },
      claims: [["ok", "The ban is law", "Passed both chambers, promulgated; platforms have six months to comply."],
               ["dev", "Age checks within six months", "The regulator has promised privacy-preserving verification; the technical decree is unpublished."],
               ["un", "A ban improves teen wellbeing", "Both camps cite the same correlational research and reach opposite conclusions."]],
      terms: [["Age verification", "Checking a user really is the age they claim — usually via ID or a face-estimation scan. The only way a ban can be enforced, and it applies to every user of every age."],
              ["Correlational", "Research showing two things move together without proving one causes the other. Most evidence in this debate is correlational."]],
      confirmed: [["First blanket ban in the EU", "The legislative record is public.", ["official"]],
                  ["Fines up to 4% of global turnover", "Written in the statute, alongside the six-month deadline.", ["official", "physical"]]],
      evidence: [["official", "The promulgated statute", "Age line, deadline and penalty schedule are published text."],
                 ["witness", "Correlational wellbeing studies", "Heavy early use is linked to worse wellbeing, concentrated in girls 11–15 — the average effect is small."],
                 ["physical", "Origin of the age-13 rule", "The old threshold came from privacy legislation, not from any study of what age is safe."],
                 ["notyet", "Outcome data from an enforced ban", "No country has enforced one long enough to measure. France will be first."]],
      disputed: [["Whether age checks can work at scale", "The regulator's position", "Verification can be privacy-preserving; a technical decree will specify how.", "Engineers' position", "No proven scheme exists at national scale without collecting identity data."],
                 ["Whether banned teens end up safer", "Supporters read the research as", "Protection for the identity-forming years, worth the trade-offs.", "Opponents read the same research as", "Displacement — teens move somewhere less visible, not safer."]],
      unknown: [["Where under-16s migrate", "Logged-out and unmoderated spaces are the open question."],
                ["Whether support survives enforcement", "Polling predates the technical decree."]],
      settle: [["France's own outcome data", "The first enforced ban will generate the evidence the debate has lacked."],
               ["A working privacy-safe age check", "Would remove the largest practical objection."],
               ["The technical decree itself", "Publication will show what enforcement actually requires of every user."]],
      settleNote: "Every gap here is Awaiting, expected to resolve as enforcement begins — which is why the story is Developing and likely to move within months.",
      explore: ["Age verification tech", "Teen mental health", "EU platform law"]
    },
    zh: {
      level: "MEDIUM", state: "Developing", flags: false, basedOn: "9 個來源", verified: "35分鐘前核實",
      verdict: "法例與期限已成定案。禁令能否令青少年更安全仍有爭議，證據未能一錘定音。",
      status: { Developing: "法例與期限已成定案。禁令能否令青少年更安全仍有爭議，證據未能一錘定音。", Verifying: "事件的基本輪廓已確立。禁令是否有效仍有爭議。", Stabilised: "尚未解決的問題已一一列明，預期短期內不會有答案。" },
      claims: [["ok", "禁令已成法", "兩院通過並正式頒布；平台有六個月合規期。"],
               ["dev", "六個月內落實年齡核查", "監管機構承諾「保障私隱」的核實方式；技術細則未公布。"],
               ["un", "禁令改善青少年身心", "兩個陣營引用同一批相關性研究，得出相反結論。"]],
      terms: [["年齡核實", "查證用戶申報的年齡屬實——通常靠身份證明或人臉年齡估算。禁令唯一的執行方法，並適用於所有年齡的每一位用戶。"],
              ["相關性研究", "只顯示兩件事同步變化、卻證明不了因果的研究。這場辯論的證據大多屬此類。"]],
      confirmed: [["歐盟首個全面禁令", "立法紀錄公開可查。", ["official"]],
                  ["罰款最高達全球營業額4%", "與六個月死線一同寫入法律。", ["official", "physical"]]],
      evidence: [["official", "已頒布的法例文本", "年齡界線、期限與罰則均屬公開文本。"],
                 ["witness", "相關性身心研究", "年幼重度使用與較差身心狀態相關，集中於11至15歲女童——平均影響輕微。"],
                 ["physical", "13歲界線的來歷", "舊門檻出自私隱法例，而非任何安全年齡研究。"],
                 ["notyet", "禁令執行後的結果數據", "未有國家執行夠久可供量度。法國將是第一個。"]],
      disputed: [["年齡核查能否大規模行得通", "監管機構立場", "核實可以保障私隱；技術細則將列明做法。", "工程師立場", "在全國規模下，不收集身份數據的成熟方案並不存在。"],
                 ["被禁的青少年是否更安全", "支持者對研究的解讀", "保護自我形成的關鍵年歲，值得付出代價。", "反對者對同一批研究的解讀", "只是轉移——青少年流向更隱蔽、而非更安全的地方。"]],
      unknown: [["16歲以下會流向何處", "不設登入、欠缺審核的空間是最大懸念。"],
                ["支持度能否捱過執行階段", "民調早於技術細則。"]],
      settle: [["法國自身的結果數據", "第一個被執行的禁令，將產生辯論一直欠缺的證據。"],
               ["一套可行的私隱友善年齡核查", "可消除最大的實際反對理由。"],
               ["技術細則本身", "細則公布，就會看清執行對每個用戶的實際要求。"]],
      settleNote: "此處每項缺口均屬「有待進展」，預期隨執行展開逐步解決——這正是報道處於「發展中」、數月內可望變動的原因。",
      explore: ["年齡核實技術", "青少年精神健康", "歐盟平台法規"]
    }
  },
  s03: {
    en: {
      level: "HIGH", state: "Verifying", flags: false, basedOn: "10 sources", verified: "Last verified 22m ago",
      verdict: "The order, the rate and the coverage are published record. What remains open is retaliation, legality under USMCA, and how fast prices move.",
      status: { Developing: "The order is published; scope and responses are being mapped.", Verifying: "The order, the rate and the coverage are published record. What remains open is retaliation, legality under USMCA, and how fast prices move.", Stabilised: "The record is settled; only the policy response is open." },
      claims: [["ok", "50% on most Canadian goods", "The signed order and its schedule are in the Federal Register."],
               ["ok", "Energy is carved out", "The exemption is written into the schedule."],
               ["dev", "Canada will retaliate", "Ottawa confirms a draft list (~$30B); nothing is law until gazetted."]],
      terms: [["Tariff pass-through", "How much of a tariff shows up in consumer prices. For integrated supply chains, studies of the 2018 round found pass-through was near-complete within months."],
              ["USMCA security carve-out", "A clause letting members act on 'essential security' — invoked here, and never tested at this scale."]],
      confirmed: [["The steepest allied-economy tariff wall in modern history", "No precedent between treaty allies exceeds it.", ["official", "physical"]],
                  ["$3.6B in goods cross the border daily", "Official trade statistics, both governments.", ["official"]]],
      evidence: [["official", "The signed order and schedule", "Rate and covered categories are published text in the Federal Register."],
                 ["official", "Ottawa's response statements", "Retaliation confirmed in principle; the list is drafted but not gazetted."],
                 ["physical", "Market repricing", "Automaker and retail equities repriced within hours of publication."],
                 ["notyet", "Price pass-through data", "The first affected CPI prints are weeks away."]],
      disputed: [["Whether USMCA dispute rules apply", "Ottawa's position", "The pact plainly applies; the panel process should hear it.", "Washington's position", "The security carve-out places the order outside the pact entirely."],
                 ["Who ultimately pays", "The administration's case", "Exporters absorb the cost to keep market access.", "Most trade economists' case", "Importers and households pay; 2018 pass-through was near-complete."]],
      unknown: [["The final retaliation list", "Provinces are pushing to widen the draft."],
                ["Whether talks convene", "Mexico has signalled willingness to host; neither principal has agreed."]],
      settle: [["The first CPI prints", "Two months of data will show the pass-through rate directly."],
               ["A USMCA panel ruling", "Would settle the legality question either way."],
               ["The gazetted counter-list", "Turns retaliation from signal into record."]],
      settleNote: "The record itself is strong — which is why this story sits at High and Verifying. The open items are responses, not facts.",
      explore: ["Tariff pass-through", "USMCA dispute process", "2018 steel round"]
    },
    zh: {
      level: "HIGH", state: "Verifying", flags: false, basedOn: "10 個來源", verified: "22分鐘前核實",
      verdict: "命令、稅率與範圍均屬公開紀錄。未定的是反制、《美墨加協定》下的合法性，以及價格傳導有多快。",
      status: { Developing: "命令已公布；範圍與各方回應正在整理。", Verifying: "命令、稅率與範圍均屬公開紀錄。未定的是反制、《美墨加協定》下的合法性，以及價格傳導有多快。", Stabilised: "紀錄已成定局；懸而未決的只剩政策回應。" },
      claims: [["ok", "對大部分加國貨品徵50%", "已簽署的命令及附表已刊於聯邦公報。"],
               ["ok", "能源獲豁免", "豁免白紙黑字寫入附表。"],
               ["dev", "加拿大將反制", "渥太華證實草擬清單（約300億美元）；刊憲前一切未成法律。"]],
      terms: [["關稅轉嫁", "關稅有多少反映在消費物價上。就深度融合的供應鏈而言，2018年一輪的研究發現，數月內轉嫁近乎完全。"],
              ["《美墨加》安全豁免", "允許成員以「根本安全」為由行事的條款——今次正是引用它，而它從未在此規模下受考驗。"]],
      confirmed: [["近代史上盟友之間最高的關稅牆", "條約盟友之間並無先例超越此水平。", ["official", "physical"]],
                  ["每日36億美元貨品跨境", "兩國官方貿易統計。", ["official"]]],
      evidence: [["official", "已簽署的命令及附表", "稅率與涵蓋類別是聯邦公報上的公開文本。"],
                 ["official", "渥太華的回應聲明", "原則上證實反制；清單已草擬、未刊憲。"],
                 ["physical", "市場重新定價", "命令公布數小時內，車廠及零售股價已被重估。"],
                 ["notyet", "價格轉嫁數據", "首批受影響的CPI數據仍需數週。"]],
      disputed: [["《美墨加》爭端機制是否適用", "渥太華立場", "協定明顯適用；應交由仲裁小組處理。", "華府立場", "安全豁免令命令完全置身協定之外。"],
                 ["最終由誰埋單", "當局的說法", "出口商為保市場准入，自行吸收成本。", "多數貿易經濟學者的說法", "進口商與家庭埋單；2018年的轉嫁近乎完全。"]],
      unknown: [["反制清單的最終版本", "各省正推動擴大草案。"],
                ["會談會否召開", "墨西哥已表示願意作東；兩位主角未有一位點頭。"]],
      settle: [["頭兩期CPI數據", "兩個月的數據將直接顯示轉嫁比率。"],
               ["《美墨加》仲裁小組裁決", "無論結果如何，都能了斷合法性之爭。"],
               ["刊憲的反制清單", "把反制由訊號變成紀錄。"]],
      settleNote: "紀錄本身相當扎實——所以本篇處於「高」與「核實中」。未定的是回應，不是事實。",
      explore: ["關稅轉嫁", "《美墨加》爭端機制", "2018年鋼鋁一役"]
    }
  },
  s04: {
    en: {
      level: "HIGH", state: "Verifying", flags: false, basedOn: "12 sources", verified: "Last verified 20m ago",
      verdict: "The rise is measured record from two independent indices. What remains open is the driver split and whether the climb converts into a price rebound.",
      status: { Developing: "The rise is being confirmed across indices.", Verifying: "The rise is measured record from two independent indices. What remains open is the driver split and whether the climb converts into a price rebound.", Stabilised: "The trend is settled; the causes remain contested." },
      claims: [["ok", "Rents up almost 4% in H1", "RVD index cross-checked against Centaline's leading index; they agree within 0.3 points."],
               ["ok", "Steepest summer pace since 2016", "Directly readable from the published monthly series."],
               ["dev", "Prices to rebound up to 19% over two years", "An analyst scenario resting on rental demand converting to purchases — not an official forecast."]],
      terms: [["Rating and Valuation Department (RVD)", "The government department whose rental index is compiled from stamped tenancy records — the closest thing Hong Kong has to a full-market measure."],
              ["Leading index", "An agency-compiled index built from live transactions, faster but narrower than the official series. Agreement between the two is the strongest signal either can give."]],
      confirmed: [["Seven straight months of index rises", "The streak is directly readable from the official monthly table.", ["official"]],
                  ["Hung Hom leads districts at +6.2%", "Two competing agencies publish the same ranking.", ["official", "witness"]]],
      evidence: [["official", "RVD monthly rental index", "Seven consecutive rises across all classes, compiled from stamped tenancies."],
                 ["official", "Centaline leading index", "Confirms +3.8% H1 from an independent live-transaction base."],
                 ["witness", "District leasing reports", "Agents describe queues at viewings and mid-week repricing in Hung Hom and Sha Tin."],
                 ["notyet", "Q3 data", "Whether the 2016 peak is passed will be readable within two months."]],
      disputed: [["Policy inflow vs regional cycle", "The government's reading", "Talent-scheme approvals drove the new demand; the policy is working.", "Independent economists' reading", "Regional markets moved together — the cycle would have turned anyway."],
                 ["Whether tenants' incomes can follow", "Landlords' case", "Rents are recovering to where the market clears; incomes adjust.", "Tenant advocates' case", "Wage growth is running at roughly half the rental pace — the gap compounds."]],
      unknown: [["Whether the New Territories follow", "Tuen Mun and Yuen Long lagged in H1; inquiry volumes suggest a turn."],
                ["Any student-housing policy response", "Hostel expansion has been floated, not funded."]],
      settle: [["Q3 index prints", "Two more months decide whether 2016's peak is passed."],
               ["A funded hostel programme", "Would directly relieve the steepest district pressure."],
               ["Wage data through year-end", "Shows whether incomes narrow or widen the gap."]],
      settleNote: "The measured record is strong — hence High and Verifying. What moves next is driven by data releases, not investigation.",
      explore: ["RVD rental index", "Talent-scheme inflow", "Student housing supply"]
    },
    zh: {
      level: "HIGH", state: "Verifying", flags: false, basedOn: "12 個來源", verified: "20分鐘前核實",
      verdict: "升幅出自兩個獨立指數的實測紀錄。未有定論的是成因比重，以及升浪會否轉化為樓價反彈。",
      status: { Developing: "升幅正透過多個指數互相核實。", Verifying: "升幅出自兩個獨立指數的實測紀錄。未有定論的是成因比重，以及升浪會否轉化為樓價反彈。", Stabilised: "趨勢已成定局；成因仍有爭議。" },
      claims: [["ok", "上半年租金升近4%", "差估署指數與中原領先指數互相核對，相差不足0.3點。"],
               ["ok", "2016年以來最急的夏季升速", "官方按月數列直接可讀。"],
               ["dev", "樓價兩年內反彈最多19%", "分析員情景推算，建基於租務需求轉化為置業——並非官方預測。"]],
      terms: [["差餉物業估價署（差估署）", "政府部門，其租金指數按已打釐印的租約紀錄編製——是香港最接近全市場的量度。"],
              ["領先指數", "代理行按實時成交編製的指數，較快但覆蓋較窄。兩者脗合，就是雙方能給出的最強訊號。"]],
      confirmed: [["指數連升七個月", "連升紀錄可直接從官方按月數表讀出。", ["official"]],
                  ["紅磡以+6.2%領先各區", "兩間互相競爭的代理行公布同一排名。", ["official", "witness"]]],
      evidence: [["official", "差估署按月租金指數", "各類別連升七個月，按已打釐印租約編製。"],
                 ["official", "中原城市領先指數", "以獨立實時成交數據，確認上半年+3.8%。"],
                 ["witness", "分區租務前線報告", "代理形容紅磡、沙田睇樓排隊、業主週中改價。"],
                 ["notyet", "第三季數據", "2016年高位破唔破，兩個月內見真章。"]],
      disputed: [["政策輸入定周期回升", "政府的解讀", "人才計劃批核帶動新需求；政策正在見效。", "獨立經濟學者的解讀", "區內市場同步向上——周期本來就會轉。"],
                 ["租客收入追唔追得上", "業主一方的說法", "租金只是回到市場出清的水平；收入會自行調整。", "租客組織的說法", "工資增速大約只及租金升速一半——落差會愈滾愈大。"]],
      unknown: [["新界會否接力", "屯門、元朗上半年落後；查詢量暗示風向轉變。"],
                ["學生宿舍政策會否出手", "擴建宿舍有人放風，未有撥款。"]],
      settle: [["第三季指數", "多兩個月數據，就知2016年高位破唔破。"],
               ["一個有撥款的宿舍計劃", "可直接紓緩升幅最急地區的壓力。"],
               ["年底前的工資數據", "顯示收入與租金的落差是收窄還是擴闊。"]],
      settleNote: "實測紀錄相當扎實——所以是「高」與「核實中」。下一步變動取決於數據公布，而非調查。",
      explore: ["差估署租金指數", "人才計劃流入", "學生宿舍供應"]
    }
  }
};

/* ---------------- compose ---------------- */
function secReplace(h, sec, newInner) {
  // replace content of <div class="cs-list"> ... </div> inside a given data-sec block, keeping heading
  const start = h.indexOf(`<div class="sec" data-sec="${sec}">`);
  if (start < 0) throw new Error("sec not found: " + sec);
  const end = h.indexOf(`\n<div class="sec"`, start + 10);
  const block = h.slice(start, end < 0 ? h.length : end);
  const listStart = block.indexOf('<div class="cs-list"');
  const listOpenEnd = block.indexOf(">", listStart) + 1;
  // find matching close: the cs-list div closes right before either <p class="cs-biasnote" or </div> chain; use lastIndexOf of '</div>' before block's cs-rule-b
  const ruleIdx = block.indexOf('cs-rule-b');
  const bias = block.indexOf('cs-biasnote');
  const stop = bias > 0 ? block.lastIndexOf("</div>", bias) : block.lastIndexOf("</div>", block.lastIndexOf("</div>", ruleIdx) - 1);
  const nb = block.slice(0, listOpenEnd) + "\n" + newInner + "\n          " + block.slice(stop);
  return h.slice(0, start) + nb + h.slice(end < 0 ? h.length : end);
}

let n = 0;
for (const id of ["s01", "s02", "s03", "s04"]) {
  for (const lang of ["en", "zh"]) {
    const d = D[id][lang], l = L[lang];
    let h = fs.readFileSync(`templates/${lang}/${TPL[id]}.html`, "utf8");

    // hero: status + word + whys
    h = h.replace(/(<p class="cs-status"[^>]*>)[^<]+(<\/p>)/, `$1${d.verdict}$2`);
    // claims
    const whys = d.claims.map((c, i) => WHY(i, l.tags[c[0]][0], l.tags[c[0]][1], c[1], c[2])).join("\n");
    h = h.replace(/<div class="cs-whys"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\n/, `<div class="cs-whys">${whys}</div>\n</div>\n</div>\n`);
    // flags off?
    if (!d.flags) h = h.replace(/(var|const|let)?\s*/, m => m); // handled via S patch below
    // based on / verified
    h = h.replace(/(<p class="a">)[\s\S]*?(<\/p>)/, `$1${lang === "en" ? "Based on " : "根據 "}<u>${d.basedOn}<\/u>$2`);
    h = h.replace(/(<p class="b">)[^<]+(<\/p>)/, `$1${d.verified}$2`);
    // sections
    h = secReplace(h, "10", d.terms.map(t => ITEM_TERM(t[0], l.term, t[1])).join("\n"));
    h = secReplace(h, "11", d.confirmed.map((c, i) => ITEM_CONF(c[0], c[1], c[2].map(e => `<span class="cs-etag cs-etag--${e}">${l.et[e]}</span>`).join("\n"), l.view, i)).join("\n"));
    h = secReplace(h, "12", d.evidence.map(e => ITEM_EV(e[0], l.et[e[0]], e[1], e[2])).join("\n"));
    h = secReplace(h, "13", d.disputed.map((x, i) => ITEM_DISP(x[0], x[1], x[2], x[3], x[4], l.view, i + 3)).join("\n"));
    h = secReplace(h, "14", d.unknown.map((u, i) => ITEM_UNK(u[0], u[1], l.awaiting, l.view, i + 5)).join("\n"));
    h = secReplace(h, "15", d.settle.map(s => ITEM_SETTLE(s[0], s[1], l.awaiting)).join("\n"));
    h = h.replace(/(<p class="cs-biasnote"[^>]*>)[\s\S]*?(<\/p>)/, `$1${d.settleNote}$2`);
    // explore pills
    h = h.replace(/<div class="cs-pills"[^>]*>[\s\S]*?<\/div>/, `<div class="cs-pills">` + d.explore.map(x => `<a class="cs-pill">${x}</a>`).join("\n") + `</div>`);
    // diff pair for High stories
    if (d.level === "HIGH") {
      h = h.replace(/(<span class="was"[^>]*>)[^<]+(<\/span>)/, `$1${lang === "en" ? "Medium" : "中"}$2`);
      h = h.replace(/(<span class="now"[^>]*>)[^<]+(<\/span>)/, `$1${lang === "en" ? "High" : "高"}$2`);
    }
    // JS: computed level, state, flags, STATUS
    h = h.replace(/const \{level, why\} = computeLevel\(\);/, `const level='${d.level}', why=[];`);
    h = h.replace(/state:\s*'[A-Za-z]+'/, `state:'${d.state}'`);
    h = h.replace(/flags:\s*(true|false)/, `flags:${d.flags}`);
    h = h.replace(/const STATUS = \{[\s\S]*?\};/, `const STATUS = ${JSON.stringify(d.status)};`);

    h = h.replace("</body>", "<style>.scroll,.phone{scrollbar-width:none;-ms-overflow-style:none}.scroll::-webkit-scrollbar,.phone::-webkit-scrollbar{display:none!important}/*responsive-fill*/html,body{width:100%;height:100%}body{display:block!important;padding:0!important}.phone{width:100%!important;height:100%!important;border-radius:0!important}</style>" + "</body>");
    fs.writeFileSync(`${lang}/confidence-${id}.html`, h);
    n++;
  }
}
console.log("built", n, "confidence sheets on original UI");
