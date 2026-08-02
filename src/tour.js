/* Onboarding tour. Spotlight steps over the live UI; action steps advance when
   the user performs the real gesture (the cutout lets taps through), Next is
   always available as a fallback. Auto-starts once (localStorage nf-tour-done);
   replayable from the ? fab shown on the feed. */
(function(){
  var ZH = /^zh/i.test(document.documentElement.lang || '');
  var frame = document.getElementById('nf-frame');
  if (!frame) return;

  /* ---------- copy ---------- */
  var W = ZH ? {
    next: "下一步", start: "開始導覽", done: "完成", skip: "跳過導覽", hint: "試吓 →"
  } : {
    next: "Next", start: "Start tour", done: "Done", skip: "Skip tour", hint: "Try it →"
  };
  var TXT = ZH ? [
    ["歡迎嚟到 NewsFlick", "用大約一分鐘，互動式行一次這個示範的功能。之後隨時可按 ? 重播。"],
    ["今日一眼睇晒", "即時概覽把今日必讀濃縮成一張卡。時鐘與日期都是實時的——示範永遠不過期。"],
    ["每單新聞都是一疊卡", "封面標明可信度、卡數與題材。<b>輕按這單新聞打開它。</b>"],
    ["分頁跟住你讀", "一路碌，分頁一路亮；點一下即可跳去地圖、數字或下一步。"],
    ["呢單新聞有幾可信？", "<b>按可信度標籤</b>——來源、已證實、有爭議、未知數。睇完關閉便繼續。"],
    ["社會脈搏", "<b>按脈搏標籤</b>看社交反應——立場、熱度與引言。關閉後繼續。"],
    ["一個故事，三把聲", "<b>按「聲線」</b>揀「淡定解說」或「朋友仔」——每段文字即時重新演繹。關閉後繼續。"],
    ["圈住的詞語識自己解釋", "<b>輕按發光的字詞</b>，即彈出來源註解——證據、前提、定義。"],
    ["卡片任你玩", "地圖可拖可縮、圖表按柱有數、訊號按開有解說、民調一按翻出實數。一路讀一路試。"],
    ["冇死胡同", "碌到最後一張卡再往上拉——下一單新聞原地展開。在頂部往下拉即可返回。"],
    ["導覽完畢", "四單新聞、兩種語言、三把聲線——全部即場任試。隨時在動態頁按 ? 重播。"]
  ] : [
    ["Welcome to NewsFlick", "A quick interactive tour of what this demo can do — about a minute. Replay it anytime with the ? button."],
    ["Today at a glance", "The snapshot condenses today's essentials into one card. The clock and dates are live — the demo never goes stale."],
    ["Every story is a stack of cards", "Each cover shows a confidence read, card count and topics. <b>Tap this story to open it.</b>"],
    ["Tabs follow your reading", "They light up as you scroll — or tap one to jump straight to Map, Numbers or What's Next."],
    ["How verified is this story?", "<b>Tap the confidence pill</b> — sources, confirmed facts, disputes and unknowns. Close the sheet when you're done."],
    ["What people are saying", "<b>Tap the pulse pill</b> for social reaction — stances, heat and quotes. Close it to continue."],
    ["One story, three voices", "<b>Tap Voices</b> and pick Calm or the ELI5 friend — every paragraph re-tells itself in that register. Close to continue."],
    ["Highlighted terms explain themselves", "<b>Tap the glowing term</b> for a quick source note — evidence, caveats, definitions."],
    ["Cards you can touch", "Maps pan and zoom, chart bars answer taps, signals open up, polls flip to raw counts. Try them as you read."],
    ["Never a dead end", "Scroll past the last card and keep pulling — the next story grows open in place. Overscroll at the top to go back."],
    ["That's the tour", "Four stories, two languages, three voices — all live. Replay this anytime with the ? button on the feed."]
  ];

  /* ---------- step targets ---------- */
  function q(sel){ return function(){ return document.querySelector(sel); }; }
  function visibleKw(){
    var kws = document.querySelectorAll('.stage.active .kw');
    for (var i = 0; i < kws.length; i++) if (kws[i].getClientRects().length) return kws[i];
    return null;
  }
  function kitCard(){
    var sels = ['.c-map', '.c-numbers', '.c-poll', '.c-signal'];
    for (var i = 0; i < sels.length; i++) {
      var el = document.querySelector('.stage.active ' + sels[i]);
      if (el) return el;
    }
    return null;
  }
  function toTop(el){ var p = document.querySelector('.stage.active .nf-phone'); if (p) p.scrollTop = 0; }
  function toCenter(el){
    if (el && el.scrollIntoView) el.scrollIntoView({ block: 'center' });
    /* scrollIntoView also scrolls the root when the page is viewed standalone
       (outside the 375x812 shell iframe) — undo that so the frame stays put */
    document.documentElement.scrollTop = 0; document.body.scrollTop = 0;
  }

  var STEPS = [
    { center: 1, startBtn: 1 },
    { el: q('#stage-0 .snapshot') },
    { el: q('#stage-0 .mcard'), pre: toCenter, await: 'story', pad: 8 },
    { el: q('.stage.active .nf-tabs'), pre: toTop },
    { el: q('.stage.active .nf-conf'), pre: toTop, await: 'conf' },
    { el: q('.stage.active .nf-actionbar [data-social]'), await: 'pulse' },
    { el: q('.stage.active .js-voicebtn'), await: 'voice' },
    { el: visibleKw, pre: toCenter, await: 'pop', pad: 8 },
    { el: kitCard, pre: toCenter },
    { el: q('.stage.active .nf-next'), pre: toCenter },
    { center: 1, doneBtn: 1 }
  ];

  function mkAwait(kind){
    if (kind === 'story') return { test: function(){ return !!document.querySelector('.stage.active:not(#stage-0)'); } };
    if (kind === 'pop') return { test: function(){ var p = document.querySelector('.kit-pop'); return !!(p && p.classList.contains('on')); } };
    var id = kind === 'conf' ? 'layer-confidence' : kind === 'pulse' ? 'layer-pulse' : 'nf-vsheet';
    var cls = kind === 'voice' ? 'open' : 'on';
    var seen = false;
    return { test: function(){
      var el = document.getElementById(id); if (!el) return false;
      var on = el.classList.contains(cls);
      if (on) seen = true;
      return seen && !on;
    } };
  }

  /* ---------- DOM ---------- */
  var overlay = document.createElement('div');
  overlay.id = 'nf-tour';
  overlay.innerHTML =
    '<div class="tour-shade" data-p="t"></div><div class="tour-shade" data-p="b"></div>' +
    '<div class="tour-shade" data-p="l"></div><div class="tour-shade" data-p="r"></div>' +
    '<div class="tour-ring"></div>' +
    '<div class="tour-tip"><p class="tt-title"></p><p class="tt-text"></p>' +
    '<div class="tour-foot"><div class="tour-dots">' +
    STEPS.map(function(){ return '<i></i>'; }).join('') +
    '</div><div class="tour-btns"><span class="tour-hint" hidden><i></i><span>' + W.hint + '</span></span>' +
    '<button class="tour-skip" type="button">' + W.skip + '</button>' +
    '<button class="tour-next" type="button">' + W.next + '</button></div></div></div>';
  frame.appendChild(overlay);
  var sh = {}, ring = overlay.querySelector('.tour-ring'), tip = overlay.querySelector('.tour-tip');
  ['t', 'b', 'l', 'r'].forEach(function(p){ sh[p] = overlay.querySelector('[data-p="' + p + '"]'); });
  var elTitle = overlay.querySelector('.tt-title'), elText = overlay.querySelector('.tt-text'),
      dots = overlay.querySelectorAll('.tour-dots i'), hint = overlay.querySelector('.tour-hint'),
      btnSkip = overlay.querySelector('.tour-skip'), btnNext = overlay.querySelector('.tour-next');

  var fab = document.createElement('button');
  fab.id = 'tour-fab'; fab.type = 'button'; fab.textContent = '?';
  fab.setAttribute('aria-label', ZH ? '重播導覽' : 'Replay tour');
  frame.appendChild(fab);

  /* ---------- placement ---------- */
  var idx = -1, curAwait = null, ticker = null, advancing = false;

  function box(el, x, y, w, h){ el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.width = w + 'px'; el.style.height = h + 'px'; }
  function place(){
    var step = STEPS[idx]; if (!step) return;
    var fr = frame.getBoundingClientRect(), FW = fr.width, FH = fr.height;
    var hole = null;
    if (step.el) {
      var el = step.el();
      if (el && el.getClientRects().length) {
        var r = el.getBoundingClientRect(), pad = step.pad != null ? step.pad : 6;
        hole = { x: Math.max(0, r.left - fr.left - pad), y: Math.max(0, r.top - fr.top - pad) };
        hole.w = Math.min(FW - hole.x, r.width + pad * 2);
        hole.h = Math.min(FH - hole.y, r.height + pad * 2);
        if (hole.w < 24 || hole.h < 24) hole = null; /* target off-frame: fall back to centered tip */
      }
    }
    if (hole) {
      box(sh.t, 0, 0, FW, hole.y);
      box(sh.b, 0, hole.y + hole.h, FW, Math.max(0, FH - hole.y - hole.h));
      box(sh.l, 0, hole.y, hole.x, hole.h);
      box(sh.r, hole.x + hole.w, hole.y, Math.max(0, FW - hole.x - hole.w), hole.h);
      ring.style.display = 'block';
      box(ring, hole.x, hole.y, hole.w - 4, hole.h - 4); /* border 2px each side */
      var th = tip.offsetHeight || 120;
      var below = hole.y + hole.h + 12, above = hole.y - th - 12;
      var ty = below + th + 8 <= FH ? below : Math.max(8, above);
      var tx = Math.min(Math.max(8, hole.x + hole.w / 2 - 150), FW - 308);
      tip.style.top = ty + 'px'; tip.style.left = tx + 'px';
    } else {
      box(sh.t, 0, 0, FW, FH); box(sh.b, 0, FH, FW, 0); box(sh.l, 0, 0, 0, 0); box(sh.r, FW, 0, 0, 0);
      ring.style.display = 'none';
      var th2 = tip.offsetHeight || 140;
      tip.style.top = Math.max(8, (FH - th2) / 2) + 'px';
      tip.style.left = ((FW - 300) / 2 - 8) + 'px';
    }
  }

  function enter(){
    var step = STEPS[idx];
    if (step.el) {
      var el = step.el();
      if (!el || !document.contains(el)) { next(); return; } /* target missing -> skip step */
      if (step.pre) step.pre(el);
    }
    curAwait = step.await ? mkAwait(step.await) : null;
    elTitle.textContent = TXT[idx][0];
    elText.innerHTML = TXT[idx][1];
    for (var i = 0; i < dots.length; i++) dots[i].className = i === idx ? 'on' : '';
    hint.hidden = !step.await;
    btnSkip.style.display = step.doneBtn ? 'none' : '';
    btnNext.textContent = step.startBtn ? W.start : step.doneBtn ? W.done : W.next;
    advancing = false;
    place();
    setTimeout(place, 350); /* re-measure after pre-scroll / chrome settle */
  }
  function next(){
    idx++;
    if (idx >= STEPS.length) { end(true); return; }
    enter();
  }
  function start(){
    idx = -1;
    overlay.classList.add('on');
    fab.classList.remove('show');
    clearInterval(ticker);
    ticker = setInterval(function(){
      if (!overlay.classList.contains('on')) return;
      if (curAwait && !advancing && curAwait.test()) {
        advancing = true; curAwait = null;
        setTimeout(next, 500); /* let the result land before moving on */
      } else place();
    }, 320);
    next();
  }
  function end(markDone){
    overlay.classList.remove('on');
    clearInterval(ticker); ticker = null; curAwait = null;
    if (markDone) try { localStorage.setItem('nf-tour-done', '1'); } catch (e) {}
    syncFab();
  }

  btnNext.addEventListener('click', function(){ next(); });
  btnSkip.addEventListener('click', function(){ end(true); });
  fab.addEventListener('click', start);
  document.addEventListener('scroll', function(){ if (overlay.classList.contains('on')) place(); }, true);
  window.addEventListener('resize', function(){ if (overlay.classList.contains('on')) place(); });

  /* fab: visible on the feed only, never during the tour */
  function syncFab(){
    var onFeed = document.getElementById('stage-0').classList.contains('active');
    fab.classList.toggle('show', onFeed && !overlay.classList.contains('on'));
  }
  var mo = new MutationObserver(syncFab);
  document.querySelectorAll('.stage').forEach(function(s){ mo.observe(s, { attributes: true, attributeFilter: ['class'] }); });
  syncFab();

  var done = false;
  try { done = localStorage.getItem('nf-tour-done') === '1'; } catch (e) {}
  if (!done) setTimeout(function(){ if (!overlay.classList.contains('on')) start(); }, 1200);

  window.__tour = { start: start, end: end, next: next, step: function(){ return idx; } };
})();
