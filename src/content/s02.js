/* s02 — France's under-16 social media ban.
   Structure mirrors v2's story 1 (9 cards); facts are the France/EU framing.
   EN: full Plain/Calm/ELI5 triples. zh: Plain now (Calm/ELI5 land in P3 — fallback covers them). */
module.exports = {
  en: {
    story: "s02", tag: "Essential", conf: "Medium", voices: "54",
    nextTitle: "50% tariffs, between allies",
    tabs: ["The Story", "Key Facts", "Who's Involved", "The Arguments", "Different Reads", "Expert View", "Impact", "Why This Matters", "What's Next"],
    hero: {
      img: "../assets/img/hero-teens.jpg",
      title: "Should [he:👶] under-16s be [he:❌] banned from social media? [he:📵]",
      paras: [
        { p: "France has passed a law barring under-16s from holding a social-media **account**, requiring platforms to [kw:verify age] and close the accounts of anyone younger — the first blanket ban in the EU.",
          c: "The short version: France now bars under-16s from holding an **account**, asks platforms to [kw:verify age], and closes the accounts of anyone younger. It's the first law of its kind in the EU — and it isn't settled yet.",
          e: "France made a new rule. If you're under 16, you can't have an **account** — and apps must [kw:verify age] and close accounts that are too young. No other EU country has done this before." },
        { p: "Supporters say the years between 11 and 15 are when a person's sense of **self** is still forming. Critics say a ban simply pushes young people onto quieter, less-moderated corners of the web.",
          c: "Supporters point to the years between 11 and 15, when your sense of **self** is still taking shape. Critics worry the ban wouldn't remove the risk so much as move it somewhere quieter and harder to see.",
          e: "Some people think it's smart, because 11 to 15 is when you're still working out who you **are**. Others worry kids would just move to quieter apps that are harder to keep safe." }
      ]
    },
    heroConn: { def: "Nothing about being a teenager online changed overnight. What changed was the appetite to act.",
                e5: "⚠️ Nothing about being a teenager online 🌐 changed overnight — the grown-ups just decided to finally do something. 🤯" },
    cards: [
      { type: "keyfacts", data: {
          tiles: [{ fig: "16", lab: "minimum age" }, { fig: "4%", lab: "max fine, global turnover" }],
          paras: [
            { p: "The minimum age is set at 16, with [g:no exemption for parental |consent] and none for accounts that already exist. Platforms must take [kw:reasonable steps] to find and remove under-16s.",
              c: "Here's what the law actually says. The minimum age is 16, with [g:no exemption for parental |consent] — and no pass for accounts you already have. Platforms have to take [kw:reasonable steps] to find under-16s and remove them.",
              e: "The cut-off age is 16. There's [g:no exemption for parental |consent], and old accounts don't get a pass either. Apps have to take [kw:reasonable steps] to find under-16s and take them down." },
            { p: "Companies that fail systematically face fines of up to [g:4% of global |turnover], and platforms get [g:six months to |comply] — the technical decree on age checks is still to come.",
              c: "If a company keeps failing, it faces fines of up to [g:4% of global |turnover]. There's some time built in: platforms get [g:six months to |comply], and the technical decree on age checks hasn't been published yet.",
              e: "If an app keeps breaking the rule, the fine can reach [g:4% of global |turnover]. It doesn't start right away — apps get [g:six months to |comply], and the exact age-check rules are still being written." }
          ] },
        conn: { def: "That's the letter of the law. Now the people pushing it, policing it, and living with it.",
                e5: "📜 That's the rule on paper. Now meet the people pushing it, policing it, and living with it. 🎭" } },

      { type: "whos", data: {
          items: [
            { lab: "Proposed by", av: "FR", name: "French Government", badge: true,
              desc: { p: "Wrote and passed the ban", c: "Wrote and passed the ban", e: "Made the new rule" } },
            { lab: "Enforcing", av: "CN", name: "CNIL", badge: true,
              desc: { p: "Will police platform compliance", c: "Polices whether platforms comply", e: "Checks that apps follow it" } },
            { lab: "Affected", av: "TU", name: "Teens Under 16",
              desc: { p: "Lose account access within six months", c: "Lose access within six months", e: "Can't use the apps within six months" } }
          ],
          para: { p: "<span class=\"lead\">The platforms that must build age checks</span> carry the cost, but [o:no company has been |fined] yet.",
                  c: "<span class=\"lead\">The platforms building the age checks</span> are the ones paying for it — though so far, [o:no company has been |fined].",
                  e: "<span class=\"lead\">The apps have to build the age checks</span> and pay for them. But so far, [o:no company has been |fined]." } },
        conn: { def: "Those are the players. Now the case each side is making.",
                e5: "🎭 Those are the players. Now here's what each side is shouting. 📣" } },

      { type: "args", data: {
          for: { label: "For a ban", cards: [
            { vis: "🪞", txt: { p: "A feed built on comparison lands hardest when identity is least formed.",
                                c: "When your sense of self is least formed, a feed built on comparison hits hardest.",
                                e: "When you're still figuring out who you are, a feed full of comparison hurts the most." } },
            { vis: "🧒", txt: { p: "A 12-year-old cannot consent to a trade they cannot understand.",
                                c: "A 12-year-old can't really agree to a deal they don't understand.",
                                e: "A 12-year-old can't really agree to a deal they don't get." } }
          ] },
          against: { label: "Against a ban", cards: [
            { vis: "🛟", txt: { p: "It removes a lifeline as well as a risk for isolated young people.",
                                c: "For a lonely teen, the same app can be a lifeline, not just a risk.",
                                e: "For a lonely kid, the app can be a lifeline, not just a danger." } },
            { vis: "🔞", txt: { p: "Enforcement means age checks for every user of every age.",
                                c: "To check under-16s, platforms have to check everyone's age.",
                                e: "To check under-16s, apps have to check everyone's age." } }
          ] },
          para: { p: "Neither side disputes that the old limit of 13 failed. The **real** fight is over [b:the thing that replaces |it]",
                  c: "Both sides agree the old limit of 13 failed. The **real** question is [b:what replaces |it].",
                  e: "Both sides agree the old rule didn't work. The **real** question is [b:what comes |next]." } },
        conn: { def: "Both sides land real points. Watch the same week get told two ways.",
                e5: "⚖️ Both sides have a point — now watch the same week get spun two different ways. 📰" } },

      { type: "dreads", data: {
          a: { av: "LM", lab: "Le Monde", headline: "A landmark for child protection: France leads Europe in shielding minors from documented harms." },
          b: { av: "TW", lab: "TechWire EU", headline: "Six-month deadline is unworkable and will push teens onto VPNs, platform engineers warn." },
          para: { p: "<span class=\"lead\">Same law, same week, two headlines.</span> [kw:Framing] shapes what feels [b:|central], and noticing the frame is a different skill from checking the facts.",
                  c: "<span class=\"lead\">Same law, same week — two very different headlines.</span> [kw:Framing] decides what feels [b:|central], and spotting the frame is a different skill from checking the facts.",
                  e: "<span class=\"lead\">Same law, same week, two different headlines.</span> The [kw:framing] changes what feels [b:|important]. Noticing the frame isn't the same as checking if it's true." } },
        conn: { def: "Two frames, same facts. So what does the research actually show?",
                e5: "🖼️ Two frames, same facts. So what does the science actually say? 🔬" } },

      { type: "expert", data: {
          quote: "Correlation keeps showing up in the data, but almost none of these studies can prove that social media is what actually harms under-16s.",
          av: "PR", name: "Dr Priya Raman", role: "Developmental psychologist",
          para: { p: "Almost all the research is [kw:correlational,] **not causal** — which is why the evidence stays contested.",
                  c: "Nearly all of it shows [kw:correlation,] **not cause** — the studies see a pattern, but can't prove social media is what does the harm. That's why experts still disagree.",
                  e: "Almost all the studies show a [kw:link,] **not proof.** They notice a pattern, but can't show social media is the cause. That's why experts still don't agree." } },
        conn: { def: "The evidence stays contested. Either way, here's who it lands on.",
                e5: "🤔 The evidence is genuinely messy — but either way, here's who feels it. 🎯" } },

      { type: "impact", data: {
          rows: [
            { ring: [32, 24], lab: "For under-16s",
              para: { p: "Millions of existing accounts would be closed, cutting teens off from the friends, creators and [i:group chats] they use every day.",
                      c: "Millions of accounts you already have would be closed, cutting you off from the friends, creators and [i:group chats] you use every day.",
                      e: "Millions of accounts would be shut off. Teens lose the friends, creators and [i:group chats] they see every day." } },
            { ring: [40, 16], lab: "For families & schools",
              para: { p: "Parents and teachers become the enforcers, checking ages and policing the [i:workarounds] most kids already know.",
                      c: "Parents and teachers become the enforcers — checking ages and policing the [i:workarounds] most kids already know.",
                      e: "Parents and teachers have to be the police now — checking ages and the [i:workarounds] most kids already know." } },
            { ring: [40, 8], lab: "For the platforms",
              para: { p: "Companies face new age-check costs and legal risk, while losing one of their fastest-growing [i:audiences].",
                      c: "Platforms face new age-check costs and legal risk, and lose one of their fastest-growing [i:audiences].",
                      e: "Apps get new costs and legal risk, and lose one of their fastest-growing [i:audiences]." } }
          ],
          para: { p: "The ban lands hardest on the youngest users and ripples out to everyone responsible for them.",
                  c: "It lands hardest on the youngest users, and ripples out to everyone who looks after them.",
                  e: "It hits the youngest users the hardest, and touches everyone who takes care of them." } },
        conn: { def: "That's who it touches. Here's what changes for you.",
                e5: "💥 That's who it hits. Now here's what actually changes for YOU. 👇" } },

      { type: "why", data: {
          boxes: [
            { vis: "🪪", lab: "Your ID",
              para: { p: "To keep your account you may have to **prove your age**, uploading an ID or a face scan the apps never [b:asked for |before].",
                      c: "To keep your account, you might have to **prove your age** — handing over an ID or a face scan the apps never [b:asked for |before].",
                      e: "To keep your account, you might have to **prove your age** — showing an ID or a face scan the apps never [b:asked for |before]." } },
            { vis: "📱", lab: "Your feed",
              para: { p: "Under-16 accounts get switched off, so **younger friends and siblings** vanish from the group chats and shared feeds you [b:use every |day].",
                      c: "Under-16 accounts get switched off, so **younger friends and siblings** quietly disappear from the group chats and feeds you [b:use every |day].",
                      e: "Under-16 accounts get turned off. So **younger friends and siblings** disappear from the chats and feeds you [b:use every |day]." } },
            { vis: "👪", lab: "Your family",
              para: { p: "Parents become the **enforcers of the limit**, deciding for themselves when a younger child is really [b:old |enough].",
                      c: "Parents turn into the **enforcers**, deciding for themselves when a younger child is really [b:old |enough].",
                      e: "Your parents become the **rule-keepers**. They decide when a younger kid is really [b:old |enough]." } }
          ],
          para: { p: "None of it lands evenly. The same rule **feels different** depending on how old you are and how you [b:already use these |apps].",
                  c: "None of this lands evenly. The same rule **feels different** depending on your age and how you [b:already use these |apps].",
                  e: "It doesn't hit everyone the same. The rule **feels different** depending on your age and how you [b:already use these |apps]." } },
        conn: { def: "That's the personal cost. Here's what happens from here.",
                e5: "🫵 That's the personal cost. Here's what happens next. ⏭️" } },

      { type: "next", data: {
          rows: [
            { vis: "🗓️", lab: "The decree lands within months",
              para: { p: "CNIL's technical rules on age checks are due before the six-month deadline — they decide what enforcement really looks like.",
                      c: "CNIL's technical rules on age checks arrive before the six-month deadline. They'll decide what enforcement actually looks like.",
                      e: "The regulator's exact age-check rules come out in a few months. Those rules decide what really happens." } },
            { vis: "⚖️", lab: "Court challenges expected",
              para: { p: "Rights groups and some platforms are preparing legal challenges that could delay or narrow how the rules apply.",
                      c: "Rights groups and some platforms are lining up legal challenges that could delay the rules or narrow how far they reach.",
                      e: "Some groups and apps are getting ready to fight it in court. That could slow the rules down or shrink them." } },
            { vis: "🌍", lab: "The EU is watching",
              para: { p: "Three governments already have bills citing the French text — the outcome here could set the template across Europe.",
                      c: "Three governments already have bills that cite the French text, so what happens here could become Europe's template.",
                      e: "Three other countries are already copying the French law. If it works here, they say they'll pass their own." } }
          ],
          para: { p: "Three open questions, one deadline between them. The next real move is as likely to come from a [i:courtroom] as from parliament.",
                  c: "Three open questions, one deadline between them. The next real move is as likely to come from a [i:courtroom] as from parliament.",
                  e: "Three big questions, one deadline. The next move is just as likely to come from a [i:courtroom] as from parliament." } },
        conn: { def: "One deadline, several open questions — and the rest of Europe taking notes.",
                e5: "🗓️ One deadline, a stack of open questions — and all of Europe watching. 🌍" } }
    ],
    ovConn: { def: "The change shows up in the price tags before it shows up in any treaty.",
              e5: "📈 The change shows up in the price tags 🏷️ before it shows up in any treaty. 📜" }
  },

  zh: {
    story: "s02", tag: "必讀", conf: "中", voices: "54",
    nextTitle: "盟友之間，50%關稅",
    tabs: ["本篇", "關鍵事實", "誰是持份者", "正反之爭", "各報各表", "專家之言", "衝擊", "為何重要", "下一步"],
    hero: {
      img: "../assets/img/hero-teens.jpg",
      title: "16歲以下 [he:👶] 應否禁用 [he:❌] 社交媒體？[he:📵]",
      paras: [
        "法國已立法禁止16歲以下持有社交媒體**帳戶**，要求平台[kw:核實年齡]、關閉未足齡用戶的帳戶——是歐盟首個全面禁令。",
        "支持者認為，11至15歲正是一個人**自我意識**仍在成形的年紀。反對者則說，禁令只會把年輕人推向更隱蔽、審核更少的網絡角落。"
      ]
    },
    heroConn: { def: "青少年上網的處境並非一夜改變，改變的是社會出手處理的決心。" },
    cards: [
      { type: "keyfacts", data: {
          tiles: [{ fig: "16歲", lab: "最低年齡" }, { fig: "4%", lab: "最高罰款（全球營業額）" }],
          paras: [
            "最低年齡定於16歲，[g:家長同意也|不獲豁免]，現有帳戶亦不例外。平台必須採取[kw:合理措施]找出並移除16歲以下用戶。",
            "屢次違規的企業，面臨最高[g:全球營業額|4%]的罰款；平台有[g:六個月|合規期]——年齡核查的技術細則仍未公布。"
          ] },
        conn: { def: "這是白紙黑字的法律。接下來看推動它、執行它、承受它的人。" } },
      { type: "whos", data: {
          items: [
            { lab: "提出", av: "法", name: "法國政府", badge: true, desc: "起草並通過禁令" },
            { lab: "執行", av: "CN", name: "法國資訊自由委員會", badge: true, desc: "監察平台是否合規" },
            { lab: "受影響", av: "TU", name: "16歲以下青少年", desc: "六個月內失去帳戶" }
          ],
          para: "<span class=\"lead\">要建年齡核查系統的平台</span>承擔成本，但至今[o:未有任何公司被|罰款]。" },
        conn: { def: "這些是台上的角色。接下來是雙方各自的理據。" } },
      { type: "args", data: {
          for: { label: "支持禁令", cards: [
            { vis: "🪞", txt: "建基於比較的資訊流，對自我認同最未成形的人傷得最深。" },
            { vis: "🧒", txt: "一個12歲小朋友，無法同意一項自己根本不能理解的交易。" }
          ] },
          against: { label: "反對禁令", cards: [
            { vis: "🛟", txt: "對孤立無援的年輕人，禁令拿走的不止風險，還有生命線。" },
            { vis: "🔞", txt: "要執行禁令，就意味所有年齡的每一位用戶都要核實年齡。" }
          ] },
          para: "雙方都不否認13歲那條舊線已經失效。**真正**的爭議是[b:用甚麼取代|它]。" },
        conn: { def: "雙方都有實在的論點。看看同一星期如何被寫成兩個故事。" } },
      { type: "dreads", data: {
          a: { av: "世", lab: "世界報", headline: "保護兒童的里程碑：法國領先歐洲，為未成年人擋住有紀錄可查的傷害。" },
          b: { av: "TW", lab: "TechWire EU", headline: "平台工程師警告：六個月死線不切實際，只會把青少年推向VPN。" },
          para: "<span class=\"lead\">同一法例，同一星期，兩個標題。</span>[kw:敘事框架]決定了甚麼顯得[b:|重要]；察覺框架與查核事實，是兩種不同的能力。" },
        conn: { def: "兩個框架，同一批事實。那研究本身怎麼說？" } },
      { type: "expert", data: {
          quote: "數據裏不斷出現相關性，但幾乎沒有一項研究能證明，社交媒體就是傷害16歲以下的元兇。",
          av: "PR", name: "Priya Raman博士", role: "發展心理學家", viewSource: "查看原文 ↗",
          para: "幾乎所有研究都屬[kw:相關性，]**並非因果**——所以證據仍然眾說紛紜。" },
        conn: { def: "證據仍有爭議。無論如何，先看它落在誰身上。" } },
      { type: "impact", data: {
          rows: [
            { ring: [32, 24], lab: "對16歲以下", para: "數以百萬計現有帳戶將被關閉，青少年與每日相見的朋友、創作者和[i:群組]一刀兩斷。" },
            { ring: [40, 16], lab: "對家庭與學校", para: "家長和老師變成執法者，查年齡、堵住孩子們早已熟知的[i:繞道方法]。" },
            { ring: [40, 8], lab: "對平台", para: "企業面對新的核查成本與法律風險，還要失去增長最快的[i:用戶群]。" }
          ],
          para: "禁令對最年輕的用戶打擊最重，並波及每一個要為他們負責的人。" },
        conn: { def: "這是它觸及的人。接下來是你自己會有甚麼改變。" } },
      { type: "why", data: {
          boxes: [
            { vis: "🪪", lab: "你的身份", para: "要保住帳戶，你或需**證明年齡**——交出應用程式以前從未[b:要求過的|身份證明或人臉掃描]。" },
            { vis: "📱", lab: "你的資訊流", para: "16歲以下帳戶被關閉，**年紀較小的朋友和弟妹**會從你[b:每日使用的|群組和動態]中消失。" },
            { vis: "👪", lab: "你的家庭", para: "家長成為**界線的執行者**，自行判斷孩子何時才算[b:真正|夠大]。" }
          ],
          para: "衝擊並不平均。同一條規則，因你的年齡和你[b:使用這些應用的|方式]而**感受迥異**。" },
        conn: { def: "這是個人代價。接下來看事情如何發展。" } },
      { type: "next", data: {
          rows: [
            { vis: "🗓️", lab: "細則數月內出爐", para: "法國資訊自由委員會的年齡核查技術細則，將在六個月死線前公布——它決定執法的真正模樣。" },
            { vis: "⚖️", lab: "司法挑戰在望", para: "權益團體與部分平台正準備法律挑戰，或會拖延規則生效、收窄適用範圍。" },
            { vis: "🌍", lab: "歐盟都在看", para: "已有三國草案引用法國文本——這裏的結果，可能成為全歐洲的範本。" }
          ],
          para: "三個懸念，一條死線。下一步棋，來自[i:法庭]的機會不比來自國會低。" },
        conn: { def: "一條死線，幾個懸念——整個歐洲都在做筆記。" } }
    ],
    ovConn: { def: "改變先出現在價錢牌上，然後才出現在任何條約裏。" }
  }
};

/* ===== P2: poll card + popovers ===== */
{
const en = module.exports.en, zh = module.exports.zh;
en.cards.splice(3, 0, { type: "poll", data: { title: "Where People Stand", rows: [
    ["Support the ban", 62, "Say the identity-forming years need protecting", "1,412 of 2,278 polled"],
    ["Oppose it", 31, "Say it pushes teens somewhere less visible, not safer", "707 of 2,278 polled"]],
    para: { p: "Tap a bar for raw counts. Polling was taken [o:before the enforcement rules were |published].",
            c: "Tap a bar to see the raw counts. One caveat: the poll ran [o:before the enforcement rules were |published].",
            e: "Tap a bar to see the real numbers. Just know: people were asked [o:before the exact rules came |out]." } },
  conn: { def: "That is the public mood. Now watch the same week get told two ways.",
          e5: "🗳️ That's the mood. Now watch the same week get spun two ways. 📰" } });
en.tabs.splice(4, 0, "The Poll");
zh.cards.splice(3, 0, { type: "poll", data: { title: "民意所向", rows: [
    ["支持禁令", 62, "認為自我形成的關鍵年歲需要保護", "2,278人中1,412人"],
    ["反對", 31, "認為只會把青少年推向更隱蔽、而非更安全的角落", "2,278人中707人"]],
    para: "輕按橫條可查看實際人數。民調在[o:執行細則公布|之前]進行。" },
  conn: { def: "這是民情。接下來看同一星期如何被寫成兩個故事。" } });
zh.tabs.splice(4, 0, "民意");
en.pop = {
  "verify age": "Checking a user really is the age they claim — usually via ID or a face-estimation scan — rather than trusting a typed birth date. The only way a ban can be enforced, and it applies to every user of every age.",
  "reasonable steps": "The legal standard platforms must meet: demonstrable, proportionate efforts to detect and remove under-16 accounts. What counts as reasonable is what the courts will end up defining.",
  "no exemption for parental consent": "Unlike earlier proposals, a parent's approval changes nothing — under 16 means no account, full stop.",
  "framing": "The choice of which facts to place at the centre of a story. The same vote can be told as protecting children or restricting freedom — both true, each steering the reader differently.",
  "correlational": "Research showing two things move together without proving one causes the other. Most evidence in this debate is correlational — which is why it stays contested.",
  "the thing that replaces it": "Both sides agree the old limit of 13 failed. Whether a ban is the right replacement is a judgement, not a settled outcome."
};
zh.pop = {
  "核實年齡": "查證用戶申報的年齡屬實——通常靠身份證明或人臉年齡估算，而非單信自填的出生日期。禁令唯一的執行方法，適用於所有年齡的每一位用戶。",
  "合理措施": "平台須達到的法律標準：可證明、成比例地偵測及移除16歲以下帳戶。何謂「合理」，最終由法庭定義。",
  "家長同意也不獲豁免": "與早年方案不同：家長批准也改變不了甚麼——未滿16歲就是不能有帳戶。",
  "敘事框架": "選擇把哪些事實放在報道中心。同一次表決，可以寫成「保護兒童」，也可以寫成「限制自由」——兩者皆真，卻把讀者引向不同結論。",
  "相關性": "只顯示兩件事同步變化、卻證明不了因果的研究。這場辯論的證據大多屬此類——所以爭議不散。",
  "用甚麼取代它": "雙方都同意13歲那條線已失敗。禁令是否正確的替代，是判斷，不是定論。"
};
}
