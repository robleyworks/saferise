/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — /plans render module · SR-476 (SR-475 Part A)

   Rebuilt to the founder's approved mockup (_incoming/plans-mockup.html,
   SR-475). The mockup carries the measurements; the brief carries the rules
   (no borders, no counts except the tier scope row, zero layout shift, one
   spacing scale). Where they differ the difference is recorded in the
   SR-476 register entry. Styling: css/saferise-system.css, sr-pl-.

   Sections, top to bottom: hero · membership band (header + billing toggle,
   the four cards, the comparison) · the protocol library · tools and
   resources · closing band · the closing line.

   Data:
     tiers and the comparison ....... declared once below (TIERS, ROWS)
     the protocol library ........... read, never typed: the live tracks from
                                      content/tracks.js (TRACKS, status
                                      'live'), then every in-development track
                                      in content/dev-protocols.js order
                                      (DEV_PROTOCOLS); names and images from
                                      content/track-images.js
   The mockup's six library tiles were blurred placeholders and are not used.

   USAGE — plans.html:
     <div id="srPlans"></div> inside <main>; content/tracks.js,
     content/dev-protocols.js and content/track-images.js load first;
     then this file and SafeRisePlans.render().
   ═══════════════════════════════════════════════════════════════════════ */
(function (global, document) {
  'use strict';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* The four memberships. The annual state changes ONLY the displayed price
     (a monthly figure, billed annually). annualTotal is what checkout will
     charge for a year; it is carried on the CTA for checkout and never shown
     on the page. Checkout does not yet exist for any of this (SR-470 §4). */
  var TIERS = [
    { key: 'free',      name: 'Free',      tag: 'Get a feel for the method.', monthly: '€0',  annual: '€0',  per: '',        annualTotal: null, cta: 'Create an account', ghost: true, href: 'signup.html' },
    { key: 'standard',  name: 'Standard',  tag: 'Go deeper.',                 monthly: '€19', annual: '€16', per: '/ month', annualTotal: '€192', cta: 'Start', href: 'signup.html' },
    { key: 'premium',   name: 'Premium',   tag: 'Access everything.',         monthly: '€29', annual: '€25', per: '/ month', annualTotal: '€300', cta: 'Start', href: 'signup.html', popular: true },
    { key: 'sovereign', name: 'Sovereign', tag: 'Use your own voice.',        monthly: '€39', annual: '€33', per: '/ month', annualTotal: '€396', cta: 'Start', href: 'signup.html' }
  ];

  /* The comparison, row order and wording exactly as the mockup. true = gold
     tick, false = em dash, a string = that text. "3 tracks max" is the one
     count this site allows (founder ruling, SR-475). */
  var ROWS = [
    ['What you can practise', ['The first track, in full', '3 tracks max', 'Every track, as it releases', 'Every track, as it releases']],
    ['Guided sessions', [true, true, true, true]],
    ['The resources behind each protocol', [true, true, true, true]],
    ['The Clearing', [true, true, true, true]],
    ['My Records', [true, true, true, true]],
    ['Journal', ['Written', 'Written', 'Written', 'Written or spoken']],
    ['The Chosen Self and Decisions', [true, true, true, true]],
    ['Speak instead of type', [false, false, false, true]],
    ['Sessions in your own voice', [false, false, false, true]],
    ['Transcription on your device', [false, false, false, true]],
    ['AI feedback — what you said and how you moved', [false, false, false, true]],
    ['New tracks the day they open', [false, false, true, true]],
    ['Live sessions and workshops', ['Bookable', 'Bookable', 'Bookable', 'Bookable']],
    ['Card required', ['No', 'Yes', 'Yes', 'Yes']]
  ];

  var TOOLS = [
    ['Guided Sessions', 'Audio meditations for each protocol', '<circle cx="12" cy="12" r="9"/><path d="M10.2 8.6l5.4 3.4-5.4 3.4z" fill="currentColor" stroke="none"/>'],
    ['How This Works', 'Plain language guidance', '<path d="M6 3.6h8l4 4v12.8H6z"/><path d="M14 3.6v4h4"/><path d="M9 12h6M9 15.4h6"/>'],
    ['In-the-Moment Tools', 'Quick practices when you need them', '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>'],
    ['Journal', 'Written or spoken (Sovereign)', '<path d="M4.5 4.4h6a2.5 2.5 0 0 1 2.5 2.5v13a2 2 0 0 0-2-2H4.5z"/><path d="M19.5 4.4h-6A2.5 2.5 0 0 0 11 6.9v13a2 2 0 0 1 2-2h6.5z"/>'],
    ['The Clearing', 'Process what’s ready to be released', '<path d="M3 12h2.5l2-5 3 10 3-8 2 3H21"/>'],
    ['My Records', 'Track your progress over time', '<circle cx="12" cy="8" r="3.4"/><path d="M5.2 20c0-3.5 3-5.8 6.8-5.8S18.8 16.5 18.8 20"/>'],
    ['The Chosen Self', 'Reflection and decision tools', '<path d="M20 4c0 8.5-4.6 12.6-10.4 12.6C6.5 16.6 4 14.2 4 11.2 4 6.6 9.4 4 20 4z"/><path d="M15.5 8.4C11 10.6 8 14.4 7 20"/>'],
    ['Safe Practice', 'Guidance for pacing and care', '<path d="M12 3.2l8 3.4v6c0 4.4-3.3 7.8-8 8.4-4.7-.6-8-4-8-8.4v-6z"/><path d="M8.8 12.2l2.3 2.3 4.2-4.6"/>']
  ];

  var TICK = '<svg viewBox="0 0 24 24" role="img" aria-label="Included"><path d="M4.5 12.6l5 5 10-11"/></svg>';
  var DASH = '<span aria-label="Not included">&mdash;</span>';

  function picture(webp, jpg, w, h, cls, alt, lazy) {
    return '<picture>' + (webp ? '<source type="image/webp" srcset="' + esc(webp) + '">' : '') +
      '<img class="' + cls + '" src="' + esc(jpg || webp) + '" width="' + w + '" height="' + h + '" alt="' + esc(alt || '') + '"' +
      (lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"') + '></picture>';
  }

  function rHero() {
    return '<header class="sr-pl-hero">' +
      picture('assets/plans/hero.webp', 'assets/plans/hero.jpg', 1700, 734, 'sr-pl-heroimg', '', false) +
      '<div class="sr-pl-wrap sr-pl-herogrid"><div>' +
        '<p class="sr-pl-kick">Plans</p>' +
        '<h1>Build more capacity where life asks the most of you.</h1>' +
        '<p class="sr-pl-herocopy">Regulation gives you back access to internal resources that become harder to reach when a triggered state is governing you.</p>' +
        '<p class="sr-pl-herocopy">With more command of attention, you can perceive more clearly, judge more soundly, and respond with greater authenticity to who you are, what you value, and what you genuinely desire.</p>' +
      '</div><p class="sr-pl-rail">Same<br>method.<br>Further<br>possibilities.<span aria-hidden="true"></span></p></div>' +
    '</header>';
  }

  function cell(v) {
    if (v === true) return '<span class="sr-pl-cmptick">' + TICK + '</span>';
    if (v === false) return '<span class="sr-pl-cmpdash">' + DASH + '</span>';
    return '<span class="sr-pl-cmptext">' + esc(v) + '</span>';
  }

  function rMembership() {
    var cards = TIERS.map(function (t) {
      return '<article class="sr-pl-card' + (t.popular ? ' sr-pl-card--pop' : '') + '">' +
        (t.popular ? '<span class="sr-pl-pop">Most popular</span>' : '') +
        '<div class="sr-pl-cardhead"><p class="sr-pl-tier">' + esc(t.name) + '</p><p class="sr-pl-tag">' + esc(t.tag) + '</p></div>' +
        '<p class="sr-pl-price"><span class="sr-pl-amt" data-m="' + esc(t.monthly) + '" data-a="' + esc(t.annual) + '">' + esc(t.monthly) + '</span>' +
          '<span class="sr-pl-per">' + esc(t.per) + '</span></p>' +
        '<a class="sr-pl-cta' + (t.ghost ? ' sr-pl-cta--ghost' : '') + '" href="' + esc(t.href) + '" data-tier="' + t.key + '"' +
          (t.annualTotal ? ' data-annual-total="' + esc(t.annualTotal) + '"' : '') + '>' + esc(t.cta) + '</a>' +
      '</article>';
    }).join('');

    /* Wide screens: one row per feature — its label on a line of its own,
       then four cells on the cards' own grid, so every column sits under its
       card. The Premium wash is one layer down the full height. */
    var grid = '<div class="sr-pl-cmp" role="table" aria-label="What each membership includes">' +
      '<div class="sr-pl-cmphead" role="row">' + TIERS.map(function (t) { return '<span role="columnheader">' + esc(t.name) + '</span>'; }).join('') + '</div>' +
      ROWS.map(function (r) {
        return '<div class="sr-pl-cmprow" role="row"><span class="sr-pl-cmplabel" role="rowheader">' + esc(r[0]) + '</span>' +
          r[1].map(function (v) { return '<span class="sr-pl-cmpcell" role="cell">' + cell(v) + '</span>'; }).join('') + '</div>';
      }).join('') + '</div>';

    /* Narrow screens: one block per tier, on the same grid as the cards. */
    var stacked = '<div class="sr-pl-tierlist">' + TIERS.map(function (t, i) {
      return '<section class="sr-pl-tierblock' + (t.popular ? ' sr-pl-tierblock--pop' : '') + '" aria-label="' + esc(t.name) + ' includes">' +
        '<p class="sr-pl-tier">' + esc(t.name) + '</p><dl>' +
        ROWS.map(function (r) { return '<div><dt>' + esc(r[0]) + '</dt><dd>' + cell(r[1][i]) + '</dd></div>'; }).join('') +
        '</dl></section>';
    }).join('') + '</div>';

    return '<section class="sr-pl-band" aria-labelledby="srPlMemH"><div class="sr-pl-wrap">' +
      '<div class="sr-pl-planhead"><div>' +
        '<h2 id="srPlMemH">Choose your membership</h2>' +
        '<p class="sr-pl-lede">Same method. More access. A private space to do the work in your own time, in your own way.</p>' +
      '</div><div class="sr-pl-toggle" role="group" aria-label="Billing period">' +
        '<button type="button" data-billing="monthly" aria-pressed="true"><span class="sr-pl-tl" data-text="Pay monthly">Pay monthly</span></button>' +
        '<button type="button" data-billing="annual" aria-pressed="false"><span class="sr-pl-tl" data-text="Pay annually">Pay annually</span><small>Save up to 15%</small></button>' +
      '</div></div>' +
      '<div class="sr-pl-cards">' + cards + '</div>' +
      grid + stacked +
    '</div></section>';
  }

  function slugOf(name) {
    return String(name).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  /* Track images come from content/track-images.js, never a typed path
     (SR-448; tools/check-track-images.py reads this helper). 'panel' falls
     back to the track's own band where it has no panel — the road-map
     tracks — inside trackImage() itself. */
  function planImage(slug) { return typeof trackImage === 'function' ? trackImage(slug, 'panel') : null; }
  function imgFor(slug) {
    var rec = (typeof TRACK_IMAGES === 'object' && TRACK_IMAGES) ? TRACK_IMAGES[slug] : null;
    var webp = planImage(slug), jpg = null;
    if (rec) Object.keys(rec).forEach(function (k) { if (rec[k] === webp && rec[k + 'Jpg']) jpg = rec[k + 'Jpg']; });
    return { webp: webp, jpg: jpg };
  }
  /* The library, read from the data: live tracks first (content/tracks.js),
     then the in-development tracks in content/dev-protocols.js order. */
  function libraryTracks() {
    var out = [];
    if (typeof TRACKS === 'object' && TRACKS) {
      Object.keys(TRACKS).forEach(function (k) {
        var t = TRACKS[k];
        if (t && t.status === 'live') { var s = slugOf(t.name); out.push({ name: t.name, href: s + '.html', img: imgFor(s) }); }
      });
    }
    if (typeof DEV_PROTOCOLS === 'object' && DEV_PROTOCOLS) {
      Object.keys(DEV_PROTOCOLS).forEach(function (s) {
        var rec = (typeof TRACK_IMAGES === 'object' && TRACK_IMAGES) ? TRACK_IMAGES[s] : null;
        out.push({ name: rec && rec.name ? rec.name : s, href: 'coming-soon.html', img: imgFor(s) });
      });
    }
    return out;
  }

  function rLibrary() {
    var tiles = libraryTracks().map(function (t) {
      return '<a class="sr-pl-track" href="' + esc(t.href) + '">' +
        (t.img.webp ? picture(t.img.webp, t.img.jpg, 640, 480, 'sr-pl-thumb', '', true) : '') +
        '<span class="sr-pl-tname">' + esc(t.name) + '</span><span class="sr-pl-arrow" aria-hidden="true">&rarr;</span></a>';
    }).join('');
    return '<section class="sr-pl-sec" aria-labelledby="srPlLibH"><div class="sr-pl-wrap">' +
      '<div class="sr-pl-rowhead"><div><h2 id="srPlLibH">Explore the Protocol Library</h2>' +
        '<p class="sr-pl-lede">A growing collection of guided protocols, each designed for a specific area of life.</p></div>' +
        '<a class="sr-pl-more" href="index.html#router">View all protocols &rarr;</a></div>' +
      '<div class="sr-pl-tracks">' + tiles + '</div>' +
    '</div></section>';
  }

  function rTools() {
    return '<section class="sr-pl-sec" aria-labelledby="srPlToolsH"><div class="sr-pl-wrap">' +
      '<div class="sr-pl-rowhead"><div><h2 id="srPlToolsH">Tools and resources included</h2>' +
        '<p class="sr-pl-lede">Every protocol is supported by practical resources to help you understand, integrate and apply the work.</p></div>' +
        '<a class="sr-pl-more" href="resource.html">View all resources &rarr;</a></div>' +
      '<div class="sr-pl-tools">' + TOOLS.map(function (t) {
        return '<div class="sr-pl-tool"><span class="sr-pl-ti" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">' + t[2] + '</svg></span>' +
          '<p class="sr-pl-tn">' + esc(t[0]) + '</p><p class="sr-pl-td">' + esc(t[1]) + '</p></div>';
      }).join('') + '</div>' +
    '</div></section>';
  }

  function rClose() {
    return '<section class="sr-pl-close" aria-labelledby="srPlCloseH">' +
      picture('assets/plans/closing-band.webp', 'assets/plans/closing-band.jpg', 1400, 824, 'sr-pl-closeimg', '', true) +
      '<div class="sr-pl-wrap sr-pl-closegrid"><div>' +
        '<p class="sr-pl-kick">Not sure where to start?</p>' +
        '<h2 id="srPlCloseH">Take a closer look.</h2>' +
        '<p class="sr-pl-closecopy">Explore every track, protocol and resource before you choose a plan.</p>' +
      '</div><a class="sr-pl-browse" href="index.html#router">Browse the library &rarr;</a></div>' +
    '</section>' +
    '<p class="sr-pl-endline">Real change has a place to land.</p>';
  }

  /* The billing toggle. Only the four prices change; each price box reserves
     the width of its widest figure, so nothing moves. */
  function bindToggle(root) {
    var btns = [].slice.call(root.querySelectorAll('.sr-pl-toggle button'));
    var amts = [].slice.call(root.querySelectorAll('.sr-pl-amt'));
    function set(period) {
      btns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-billing') === period ? 'true' : 'false'); });
      amts.forEach(function (a) { a.textContent = period === 'annual' ? a.getAttribute('data-a') : a.getAttribute('data-m'); });
      root.setAttribute('data-billing', period);
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { set(b.getAttribute('data-billing')); }); });
    set('monthly');
  }

  function render(opts) {
    opts = opts || {};
    var mount = typeof opts.mount === 'string' ? document.getElementById(opts.mount)
      : (opts.mount || document.getElementById('srPlans'));
    if (!mount) return;
    mount.innerHTML = rHero() + rMembership() + rLibrary() + rTools() + rClose();
    bindToggle(mount);
  }

  global.SafeRisePlans = { render: render, TIERS: TIERS };
})(window, document);
