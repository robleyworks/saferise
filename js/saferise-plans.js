/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — /plans render module · SR-386 (PASS-plans-final.md)

   Rebuilds plans.html from pass/mock-plans-final.html, merging the old
   /plans (rich content, stale €19/€29/€39 ladder) and /pricing (correct
   prices, no traffic, thin content) into one page. Same pattern as
   js/saferise-track.js and js/saferise-organisations-equivalent work this
   session: one render() call, everything read from content/tracks.js —
   no price, protocol title, state tag or track name is a literal in this
   file except the five tracks that have no data record at all (see the
   core-library section below).

   USAGE — plans.html:
     1. <div id="srPlans"></div> inside <main>
     2. content/tracks.js loaded first (PRICING, SHARED, TRACKS)
     3. <script src="js/saferise-plans.js"></script>
     4. <script>SafeRisePlans.render();</script>
   ═══════════════════════════════════════════════════════════════════════ */
(function (global, document) {
  'use strict';

  function cardTitle(s) { return String(s).replace(/^The\s+/, '').replace(/\s+Protocol$/, ''); }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* SR-386 §4 · eight core-library cards. The three live tracks read their
     name from TRACKS[id].name and their accent from the REAL system
     --t1/--t2/--t3 tokens (css/saferise-system.css) — not the mock's own
     standalone preview colours (--t1:#D4A843 etc in mock-plans-final.html),
     which exist only because the mock is a self-contained static file with
     no access to the live token set and would visibly disagree with how
     t1/t2/t3 are coloured everywhere else on the site (nav dropdown, track
     pages). The five in-development tracks have no TRACKS[] record at all
     except id 4 (Elevation Series, visible:false) — coming-soon.html
     hardcodes the other four the same way this does, for the same reason:
     nothing to read from. Images are coming-soon.html's own per-track band
     photos, confirmed by direct comparison of that page's own kicker/name
     pairs to its <img src> attributes (band-01=Elevation, band-03=Strength
     & Return, band-04=Embodied Nutrition, band-08=Executive Presence).
     Colours are the mock's own inline --ca/--cglow values, carried over
     unchanged per the brief's own instruction ("report them — they are not
     yet system tokens"). "Sleep & Recovery" was the brief's own fifth named
     track when SR-386 shipped it, and matched no track anywhere in
     coming-soon.html, tracks.js or any nav at the time — flagged in the
     SR-386 register entry rather than guessed at, and given the hatch
     placeholder rather than a wrong photo. SR-430 (PASS-G-IMAGERY…) found
     this stale: coming-soon.html now carries a Sleep & Recovery card
     (band-09.webp, "NIGHT & RECOVERY"), and assets/coming/band-09.webp
     exists — wired below instead of the hatch. */
  var CORE_LIVE = [
    { id: 1, kicker: 'Capacity', ca: 'var(--t1)', cglow: 'rgba(201,123,90,.22)',
      img: 'assets/home/panel-t1-v2.webp', alt: 'Personal Transformation' },
    { id: 3, kicker: 'Application', ca: 'var(--t3)', cglow: 'rgba(110,144,128,.22)',
      img: 'assets/home/panel-t3-v2.webp', alt: 'Professional Performance' },
    { id: 2, kicker: 'Application', ca: 'var(--t2)', cglow: 'rgba(122,143,168,.22)',
      img: 'assets/home/panel-t2-v2.webp', alt: 'Relationship Healing' }
  ];
  var CORE_DEV = [
    { name: 'Executive Presence', kicker: 'Application', ca: '#B9A17A', cglow: 'rgba(185,161,122,.20)',
      img: 'assets/coming/band-08.webp', alt: 'Executive Presence' },
    { name: 'Sleep & Recovery', kicker: 'Substrate', ca: '#7B87A8', cglow: 'rgba(123,135,168,.20)',
      img: 'assets/coming/band-13.webp', alt: 'Sleep & Recovery' },
    { name: 'Embodied Nutrition', kicker: 'Substrate', ca: '#8FA37B', cglow: 'rgba(143,163,123,.20)',
      img: 'assets/coming/band-12.webp', alt: 'Embodied Nutrition' },
    { name: 'Strength & Return', kicker: 'Substrate', ca: '#C08A5E', cglow: 'rgba(192,138,94,.20)',
      img: 'assets/coming/band-17.webp', alt: 'Strength & Return' },
    { name: 'Elevation Series', kicker: 'Beyond', ca: '#AEB7CE', cglow: 'rgba(174,183,206,.20)',
      img: 'assets/coming/band-11.webp', alt: 'Elevation Series' }
  ];

  /* SR-386 §5 (rTP) · four stages, three real SHARED.resources each,
     regrouped from the mock's own mixed real/invented list (Guided
     Experience, Breathwork, Perspectives, Capacity Check and Protocol
     Guide are not resource types this platform ships — grepped directly).
     11 of SHARED.resources' 12 entries are universal; the twelfth,
     "Raising It" (case/raising), ships on Track 03 only (its own comment:
     "Track 03 only") and is left out of this cross-track summary rather
     than implied as something every protocol carries. */
  var STAGES = [
    { num: '01', name: 'Regulate', h3: 'When the state has already taken hold.',
      lede: 'Start where your system actually is. These resources create enough regulation and internal resource for attention and reflection to become available again.',
      keys: ['meditation', 'crisiscard', 'companion'] },
    { num: '02', name: 'Understand', h3: 'When you need to know what just happened.',
      lede: 'Regulation creates room. These resources help you use that room to examine the pattern, the meaning you made and what captured your attention.',
      keys: ['guide', 'practice', 'advisory'] },
    { num: '03', name: 'Integrate', h3: 'When the moment has passed but the learning should not.',
      lede: 'Turn an experience into something you can see, name and return to — without turning it into a score.',
      keys: ['record', 'accountability', 'decision'] },
    { num: '04', name: 'Use it in real life', h3: 'When the work has to leave the screen with you.',
      lede: 'Condensed, practical supports for returning to the method when there is no time for the full experience.',
      keys: ['disclosure', 'repair'] }
  ];

  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" ' +
    'stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 13c2.6-5 5.2-5 7.8 0s5.2 5 7.8 0"/>' +
    '<path d="M2.5 18h19"/></svg>';

  var TRACK_ICON = {
    1: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.4"/><path d="M5.5 20c.7-3.6 3.3-5.4 6.5-5.4S17.8 16.4 18.5 20"/></svg>',
    2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="9" r="2.8"/><circle cx="15.5" cy="9" r="2.8"/><path d="M3.5 19c.6-3 2.4-4.4 5-4.4M20.5 19c-.6-3-2.4-4.4-5-4.4"/></svg>',
    3: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18l5-5 3.5 3.5L20 8"/><path d="M15.5 8H20v4.5"/></svg>'
  };
  var TRACK_KICKER = { 1: '--t1', 2: '--t2', 3: '--t3' };
  var TRACK_GLOW = { 1: 'rgba(201,123,90,.11)', 2: 'rgba(122,143,168,.11)', 3: 'rgba(110,144,128,.11)' };
  var TRACK_BAND = {
    1: { src: 'assets/journey/t1-band.webp', alt: 'Personal Transformation' },
    2: { src: 'assets/journey/t2-band.webp', alt: 'Relationship Healing' },
    3: { src: 'assets/journey/t3-band.webp', alt: 'Professional Performance' }
  };

  function rHero() {
    return '<header class="sr-pl-hero rv">' +
      '<div class="sr-pl-ph-fill"></div><div class="sr-pl-ph-scrim"></div>' +
      '<div class="wrap">' +
      '<p class="eyebrow">Plans</p>' +
      '<h1>Build more capacity where life asks the most of you.</h1>' +
      '<p class="sr-pl-lede">Regulation gives you back access to internal resources that become harder to reach when a triggered state is governing you.</p>' +
      '<p class="sr-pl-lede">With more command of attention, you can perceive more clearly, judge more soundly, and respond with greater authenticity to who you are, what you value, and what you genuinely desire.</p>' +
      '</div></header>';
  }

  function rPlans() {
    var t1 = PRICING.t1, t2 = PRICING.t2;
    /* t2.annual is one combined string ("€190 / year") — content/tracks.js
       has no separate amount/period split for the annual rate the way it
       does for the monthly one, so it's parsed here rather than read as
       two fields that don't exist. The amount half is still 100% data —
       only "a month"/"a year" as connecting words are authored here, the
       same way "with an account" is for Track 01's free plan. */
    var annualAmount = String(t2.annual).split('/')[0].trim();
    return '<section id="plans"><div class="wrap">' +
      '<div class="sr-pl-shead rv"><div><p class="eyebrow">What it costs</p>' +
      '<h2>Track 01 is free.<br>One price opens the rest.</h2></div>' +
      '<p>You make an account and the protocols in Personal Transformation are yours — not a trial, not a sample, not a countdown. Everything below is what funds the rest of it.</p></div>' +
      '<div class="sr-pl-plans rv">' +
        '<article class="sr-pl-plan">' +
          '<p class="sr-pl-tag">Track 01 · Personal</p>' +
          '<p class="sr-pl-price sr-pl-free">' + esc(t1.amount) + '<small>with an account</small></p>' +
          '<h3>Personal Transformation</h3>' +
          '<p class="sr-pl-quote">What happens inside me?</p>' +
          '<p class="sr-pl-d"><b>Your inner life.</b> Work with the states that pull attention away from you — fear, anger, overwhelm, grief, insecurity and shutdown — so you have more room to decide what deserves your attention and what you do next.</p>' +
          '<p class="sr-pl-d">A protocol for each state, each with the full resource set.</p>' +
          '<p class="sr-pl-note">No card required. Your journal stays on your device.</p>' +
          '<a class="sr-pl-cta" href="signup.html">Create an account</a>' +
        '</article>' +
        '<article class="sr-pl-plan sr-pl-plan-paid">' +
          '<p class="sr-pl-tag">Membership · everything else</p>' +
          '<p class="sr-pl-price" id="srPlPrice">' + esc(t2.amount) + '<small id="srPlPer">a month</small></p>' +
          '<div class="sr-pl-toggle" aria-label="Billing period">' +
            '<button class="sr-pl-on" type="button" data-p="' + esc(t2.amount) + '" data-per="a month" ' +
              'data-note="Billed monthly. Cancel whenever.">Monthly</button>' +
            '<button type="button" data-p="' + esc(annualAmount) + '" data-per="a year" ' +
              'data-note="Ten months for twelve. No discount code, no deadline.">Annual</button>' +
            '<span id="srPlToggleNote">Billed monthly. Cancel whenever.</span>' +
          '</div>' +
          '<h3>Every other track, and every track added after</h3>' +
          '<p class="sr-pl-quote">What keeps happening between us — and what changes when the stakes rise?</p>' +
          '<p class="sr-pl-d"><b>One membership, the whole library.</b> Relationship Healing and Professional Performance now, and every track that follows — at no change to what you already pay.</p>' +
          '<p class="sr-pl-d">Cancel whenever. Nothing expires, nothing locks, and nothing gets taken away mid-month.</p>' +
          '<a class="sr-pl-cta sr-pl-cta-solid" href="signup.html">Start</a>' +
        '</article>' +
      '</div></div></section>';
  }

  function rTrackSection(id) {
    var t = TRACKS[id];
    var band = TRACK_BAND[id];
    var name = t.name, split = name.split(' ');
    var first = split.shift(), rest = split.join(' ');
    var rows = t.protocols.map(function (p) {
      var title = cardTitle(p[2]);
      var state = p[p.length - 1];
      var desc = p[4];
      return '<li tabindex="0"><em>' + p[0] + '</em><div class="sr-pl-t"><b>' + esc(title) + '</b>' +
        '<i>' + esc(state) + '</i><span>' + esc(desc) + '</span></div></li>';
    }).join('');
    var meta = id === 1 ? '<b>' + esc(t.protocols.length) + ' protocols</b> · <b>Free with an account</b>'
      : '<b>' + esc(t.protocols.length) + ' protocols</b> · <b>Included with membership</b>';
    return '<div class="sr-pl-tsec" style="--tc:var(' + TRACK_KICKER[id] + ');--tglow:' + TRACK_GLOW[id] + '">' +
      '<div class="sr-pl-ph-fill"></div><div class="sr-pl-ph-scrim"></div>' +
      (band ? '<img src="' + band.src + '" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-3;opacity:.5" aria-hidden="true">' : '') +
      '<div class="wrap"><div class="sr-pl-tinner rv">' +
      '<div><div class="sr-pl-thead">' + TRACK_ICON[id] + 'Track 0' + id + '</div>' +
      '<h3 class="sr-pl-ttitle">' + esc(first) + '<i>' + esc(rest) + '</i></h3>' +
      '<p class="sr-pl-tq">' + esc(id === 1 ? 'What happens inside me?' : id === 2 ? 'What keeps happening between us?' : 'What changes when the stakes rise?') + '</p>' +
      '<p class="sr-pl-tmeta">' + meta + '</p></div>' +
      '<div><ul class="sr-pl-list">' + rows + '</ul></div>' +
      '</div></div></div>';
  }

  function rLibrary() {
    return '<section id="library"><div class="wrap">' +
      '<div class="sr-pl-shead rv"><div><p class="eyebrow">The library</p>' +
      '<h2>Every state has<br>a way through it.</h2></div>' +
      '<p>Each protocol is written for one situation rather than for calm in general. The state you arrive in decides which one you open.</p></div></div>' +
      rTrackSection(1) + rTrackSection(2) + rTrackSection(3) +
      '<div class="wrap"><p class="sr-pl-hint">Hover a protocol to read what it is for</p></div>' +
      '</section>';
  }

  function rCoreCard(c) {
    var img = c.img ? '<img src="' + c.img + '" alt="' + esc(c.alt) + '">' : '';
    return '<div class="sr-pl-core" tabindex="0" style="--ca:' + c.ca + ';--cglow:' + c.cglow + '">' +
      '<div class="sr-pl-ctimg">' + img + '</div><div class="sr-pl-ctscrim"></div>' +
      '<em>' + esc(c.kicker) + '</em><b>' + esc(c.name) + '</b>' +
      (c.dev ? '<i>In development</i>' : '') +
      '</div>';
  }

  function rCore() {
    var cards = CORE_LIVE.map(function (c) {
      return rCoreCard({ name: TRACKS[c.id].name, kicker: c.kicker, ca: c.ca, cglow: c.cglow, img: c.img, alt: c.alt });
    }).concat(CORE_DEV.map(function (c) {
      return rCoreCard({ name: c.name, kicker: c.kicker, ca: c.ca, cglow: c.cglow, img: c.img, alt: c.alt, dev: true });
    })).join('');
    return '<section id="core"><div class="wrap">' +
      '<div class="sr-pl-shead rv"><div><p class="eyebrow">The core library</p>' +
      '<h2>Eight tracks.<br>One membership.</h2></div>' +
      '<p>Every track sits inside the same membership. When a new one opens it is simply there — no upgrade, no new tier, no change to what you already pay.</p></div>' +
      '<div class="sr-pl-coregrid rv">' + cards + '</div>' +
      '</div></section>';
  }

  function rStage(stage) {
    var cards = stage.keys.map(function (key) {
      var r = SHARED.resources.filter(function (row) { return row[4] === key; })[0];
      if (!r) return '';
      return '<div class="sr-pl-rc"><h4>' + esc(r[1]) + '</h4><p>' + esc(r[3]) + '</p></div>';
    }).join('');
    return '<div class="sr-pl-rstage rv">' +
      '<div class="sr-pl-rleft"><div class="sr-pl-ic">' + ICON + '<em>' + stage.num + '</em></div>' +
      '<p class="sr-pl-rname">' + esc(stage.name) + '</p>' +
      '<h3>' + esc(stage.h3) + '</h3>' +
      '<p class="sr-pl-rlede">' + esc(stage.lede) + '</p></div>' +
      '<div class="sr-pl-rcards">' + cards + '</div></div>';
  }

  function rInside() {
    return '<section id="inside"><div class="wrap">' +
      '<div class="sr-pl-shead rv"><div><p class="eyebrow">Inside every protocol</p>' +
      '<h2>A complete session,<br>and what surrounds it.</h2></div>' +
      '<p>What you need changes depending on where you are in the moment. Every protocol carries support for regulation, understanding, integration and real-life use — all built around the same specific state.</p></div>' +
      STAGES.map(rStage).join('') +
      '<p class="sr-pl-hint" style="margin-top:34px">One state can need regulation in the body, understanding in the mind, reflection afterwards and language for the next real conversation</p>' +
      '</div></section>';
  }

  function rLive() {
    var p1 = PRICING.premium1, p3 = PRICING.premium3;
    var wp = PRICING.workshopPersonal, wr = PRICING.workshopRelationship;
    return '<section id="live"><div class="wrap">' +
      '<div class="sr-pl-shead rv"><div><p class="eyebrow">When self-guided is not enough</p>' +
      '<h2>Work with<br>someone directly.</h2></div>' +
      '<p>Separate from membership. Choose it when you want someone in the room with you — not because the library is incomplete.</p></div>' +
      '<div class="sr-pl-live rv">' +
        '<article class="sr-pl-livecard"><div class="sr-pl-ph-fill"></div><div class="sr-pl-ph-scrim"></div>' +
          '<h3>Premium 1:1</h3>' +
          '<p class="sr-pl-p">' + esc(p1.amount) + ' a session · ' + esc(p3.amount) + ' for three</p>' +
          '<p>An hour, one to one, on whatever you are actually in. Not the protocols read aloud — those are self-guided by design. This is the thing they cannot do.</p>' +
          '<a href="live-sessions.html">Enquire →</a></article>' +
        '<article class="sr-pl-livecard"><div class="sr-pl-ph-fill"></div><div class="sr-pl-ph-scrim"></div>' +
          '<h3>Guided workshops</h3>' +
          '<p class="sr-pl-p">' + esc(wp.amount) + ' ' + esc(wp.per) + ' · ' + esc(wr.amount) + ' ' + esc(wr.per) + '</p>' +
          '<p>Ninety minutes, remote, in a group. Someone takes you through it rather than you taking yourself through it.</p>' +
          '<a href="live-sessions.html">See upcoming dates →</a></article>' +
        '<article class="sr-pl-livecard"><div class="sr-pl-ph-fill"></div><div class="sr-pl-ph-scrim"></div>' +
          '<h3>Retreats</h3>' +
          '<p class="sr-pl-p">Dates and pricing on enquiry</p>' +
          '<p>In person, over a few days. Cost depends on where and how long, so there is no useful number to put here.</p>' +
          '<a href="mailto:contact@thesaferiseprotocol.com">Ask about retreats →</a></article>' +
      '</div>' +
      '<div class="sr-pl-orgstrip rv"><div class="sr-pl-ph-fill"></div><div class="sr-pl-ph-scrim"></div>' +
        '<div><h3>Bringing this into an organisation</h3>' +
        '<p>Programmes delivered to your teams, and platform access for employees.</p></div>' +
        '<a href="organisations.html">For teams and organisations →</a>' +
      '</div></div></section>';
  }

  function rClose() {
    return '<section class="sr-pl-close"><div class="wrap" style="width:auto">' +
      '<h4>What the price is for</h4>' +
      '<p>Research, protocol design, production, hosting, and keeping the whole thing maintained. It is what lets Track 01 stay free and stay good.</p>' +
      '<p>We do not run sales, streaks, scores or countdowns. If the work is worth paying for, it should be worth paying for on an ordinary day.</p>' +
      '</div></section>';
  }

  function bindToggle() {
    var out = document.getElementById('srPlPrice'), per = document.getElementById('srPlPer'),
      note = document.getElementById('srPlToggleNote'),
      bs = document.querySelectorAll('.sr-pl-toggle button');
    [].forEach.call(bs, function (b) {
      b.addEventListener('click', function () {
        [].forEach.call(bs, function (x) { x.classList.toggle('sr-pl-on', x === b); });
        out.childNodes[0].nodeValue = b.dataset.p;
        per.textContent = b.dataset.per;
        note.textContent = b.dataset.note;
      });
    });
  }

  function bindReveal() {
    var els = [].slice.call(document.querySelectorAll('.sr-pl-page .rv'));
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: .06 });
    els.forEach(function (e, i) { e.style.transitionDelay = (Math.min(i, 6) * 70) + 'ms'; io.observe(e); });
  }

  function render(opts) {
    opts = opts || {};
    var mount = typeof opts.mount === 'string' ? document.getElementById(opts.mount)
      : (opts.mount || document.getElementById('srPlans'));
    if (!mount) return;
    mount.innerHTML = rHero() + rPlans() + rLibrary() + rCore() + rInside() + rLive() + rClose();
    bindToggle();
    bindReveal();
  }

  global.SafeRisePlans = { render: render };
})(window, document);
