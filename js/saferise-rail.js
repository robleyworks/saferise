/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — shared member nav rail · SR-335

   Same pattern as SafeRiseTrack.render() and SafeRiseCover.art(): one
   module owns the markup, the data and the behavior; the host page keeps
   an empty mount point and calls render(). Previously, dashboard.html,
   member-frameworks.html, member-coming-soon.html and the six
   member-*.html framework pages each carried their own copy of the rail
   markup PLUS their own copy of the PAGES map, click delegation and theme
   toggle — nine copies of essentially the same ~40 lines, already caught
   drifting once (SR-333's Log-out divider landed in the rail's CSS on
   dashboard.html only, see css/saferise-rail.css).

   USAGE — the host page:
     1. An empty mount point: <nav class="sr-dash-navrail" id="srRail"
        aria-label="Sections"></nav>
     2. <script src="js/saferise-access.js"></script> (Log out needs it —
        harmless to include even on a page that never signs anyone out)
     3. <script src="js/saferise-rail.js"></script>
     4. <script>SafeRiseRail.render('coming');</script> — the second
        argument is optional: { onRoute: fn } lets the host intercept a
        click instead of the module's own default behavior. Only
        dashboard.html needs this — it has its OWN openRoute(), the one
        place LAYERS (in-shell modals) and ROUTES (the "not built yet"
        placeholder) actually resolve, and its own goHome() for clicking
        Dashboard while already on it. Passing onRoute: openRoute makes
        the module's click handler behave exactly as dashboard.html's own
        inline handler always did — every other page needs no onRoute at
        all; its default is the SR-104 "leave for the dashboard and let it
        answer" behavior every member-*.html page already used.

   PAGES is this module's own map, not each host page's local variable.
   dashboard.html's openRoute() keeps its OWN PAGES map for its OTHER two
   callers (the #route= hash resolver on arrival, and in-page
   [data-route-link] elements elsewhere on the dashboard) — reading
   SafeRiseRail.PAGES there instead of retyping the same three lines is
   one shared source of truth for the values, even though the two code
   paths that consume them stay separate on purpose (this module only
   resolves a RAIL click; dashboard.html's own router resolves everything
   else that isn't a rail click).
   ═══════════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  var ICONS = {
    dashboard: {
      round: false,
      d: '<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>'
    },
    method: {
      round: false,
      d: '<path d="M12 3v9"/><path d="M12 12c0 4-3 6-6 6M12 12c0 4 3 6 6 6"/>' +
         '<circle cx="12" cy="3" r="1.6"/><circle cx="6" cy="18" r="1.8"/><circle cx="18" cy="18" r="1.8"/>'
    },
    coming: {
      /* horizon + a rising arc and point — SR-333 */
      round: true,
      d: '<path d="M3 17h18"/><path d="M5 17c3-6 5-9 7-9s4 3 7 9"/><circle cx="12" cy="8" r="1.3"/>'
    },
    coaching: {
      round: false,
      d: '<circle cx="12" cy="8" r="3.4"/><path d="M4.6 20a7.6 7.6 0 0 1 14.8 0"/>'
    },
    account: {
      round: false,
      d: '<circle cx="12" cy="12" r="3"/>' +
         '<path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1' +
         'A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 14.2H3a2 2 0 1 1 0-4h.1' +
         'A1.6 1.6 0 0 0 4.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9.8 3a2 2 0 1 1 4 0v.1' +
         'A1.6 1.6 0 0 0 17 4.6a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a2 2 0 1 1 0 4h-.1"/>'
    },
    /* SR-453 (PASS-AH §1) · icons for the eight routes SR-444 wired into
       PAGES but never rendered. None existed anywhere in the repo, so each
       is new, drawn on the same 24-unit grid and stroke as the rest. */
    clearing: {
      /* a still point inside an open field */
      round: true,
      d: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/>'
    },
    chosen: {
      round: true,
      d: '<path d="M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.4l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z"/>'
    },
    decisions: {
      /* signpost */
      round: true,
      d: '<path d="M12 3v18"/><path d="M5 6h11l2 2-2 2H5z"/><path d="M19 13H8l-2 2 2 2h11z"/>'
    },
    article: {
      round: true,
      d: '<path d="M6 3h9l3 3v15H6z"/><path d="M9 10h6M9 14h6M9 18h4"/>'
    },
    podcast: {
      round: true,
      d: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/>'
    },
    faq: {
      round: true,
      d: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7"/><path d="M12 17h.01"/>'
    },
    checkout: {
      round: true,
      d: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8M8 12h8"/>'
    },
    legal: {
      /* shield */
      round: true,
      d: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/>'
    },
    signout: {
      /* door + exit arrow — SR-333 */
      round: true,
      d: '<path d="M15 4H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h8"/><path d="M11 12h9"/><path d="M17 8l4 4-4 4"/>'
    }
  };

  /* order is render order */
  var ROUTES = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'method',    label: 'Where the method comes from' },
    { key: 'coming',    label: 'What’s coming' },
    { key: 'coaching',  label: 'Sessions &amp; workshops' },
    /* SR-453 (PASS-AH §1) · SR-444's seven, labels copied from
       dashboard.html's own ROUTES map, in that map's order */
    { key: 'clearing',  label: 'The Clearing' },
    { key: 'checkout',  label: 'Add a track' },
    { key: 'article',   label: 'Article' },
    { key: 'podcast',   label: 'The SafeRise podcast' },
    { key: 'faq',       label: 'FAQ' },
    { key: 'chosen',    label: 'The Chosen Self' },
    { key: 'decisions', label: 'Your Decisions' }
  ];
  var FOOT_ROUTES = [
    { key: 'account', label: 'Account &amp; plan' },
    { key: 'legal',   label: 'Terms and privacy' }
  ];

  /* the rail routes with a real page — began as the same three destinations
     every host page's own PAGES map already agreed on before this file
     existed, confirmed identical across all nine before merging them here */
  /* SR-438 (PASS-N §1) · account added. Without it, a rail click on any
     member-*.html page hands off to dashboard.html#route=account, and the
     dashboard's hash resolver deliberately ignores PAGES keys (so a stray
     #route= cannot bounce a member back out) — once account joined the
     dashboard's own PAGES map the member would land on the dashboard with
     nothing opened. account.html carries no rail, so there is no bounce. */
  var PAGES = {
    dashboard: 'dashboard.html',
    method: 'member-frameworks.html',
    coming: 'member-coming-soon.html',
    account: 'account.html',
    /* SR-444 (PASS-X §5) · the four member templates, mirrored from
       dashboard.html's PAGES so a rail click never falls through to
       dashboard.html#route= (whose resolver ignores PAGES keys). */
    chosen: 'member-record.html?r=chosen',
    decisions: 'member-record.html?r=decisions',
    faq: 'member-reading.html?r=faq',
    article: 'member-reading.html?r=article',
    podcast: 'member-reading.html?r=podcast',
    clearing: 'member-clearing.html',
    checkout: 'member-checkout.html',
    /* SR-453 (PASS-AH §1) · legal, for the same reason as account above:
       it is in dashboard.html's PAGES, so without it here a rail click on a
       member page would land on the dashboard with nothing opened */
    legal: 'legal.html'
  };

  function svg(key) {
    var icon = ICONS[key];
    var attrs = icon.round ? ' stroke-linecap="round" stroke-linejoin="round"' : '';
    return '<svg viewBox="0 0 24 24"' + attrs + '>' + icon.d + '</svg>';
  }

  function btnHTML(route, activeRoute, extraAttrs) {
    var on = route.key === activeRoute ? ' on' : '';
    return '<button class="sr-dash-navrailbtn' + on + '" data-route="' + route.key + '"' +
      (extraAttrs || '') + '>' + svg(route.key) + '<span>' + route.label + '</span></button>';
  }

  function render(activeRoute, opts) {
    opts = opts || {};
    var mount = typeof opts.mount === 'string' ? document.getElementById(opts.mount)
      : (opts.mount || document.getElementById('srRail'));
    if (!mount) return;

    var html = '<span class="sr-dash-navrailmark">◈</span>';
    /* SR-454 (PASS-AI §1) · the main routes sit in their own scroll box so
       the panel scrolls instead of shrinking them below 44px; the foot
       (account, legal, Log out) stays outside it, pinned to the bottom. */
    /* SR-454 (PASS-AI §2) · opts.toggle — dashboard.html only. Renders the
       expander at the head of the panel; its behaviour (state, storage,
       breakpoint guard) lives in dashboard.html beside the track rail's
       own toggle, which it copies. No other page passes it. */
    if (opts.toggle) {
      html += '<button type="button" class="sr-dash-railtoggle sr-dash-navrailtoggle" id="srNavRailToggle"' +
        ' aria-expanded="false" aria-label="Expand navigation">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5l-7 7 7 7"/></svg></button>';
    }
    html += '<div class="sr-dash-navraillist">';
    ROUTES.forEach(function (r) { html += btnHTML(r, activeRoute); });
    html += '</div>';
    html += '<div class="sr-dash-navrailfoot">';
    FOOT_ROUTES.forEach(function (r) { html += btnHTML(r, activeRoute); });
    html += btnHTML({ key: 'signout', label: 'Log out' }, null, ' id="srSignOut" type="button"');
    html += '</div>';
    mount.innerHTML = html;
    /* signout carries no data-route (it isn't a PAGES/LAYERS/ROUTES
       destination — it leaves the shell entirely), so strip the one this
       loop gave it for free via btnHTML's shared markup shape */
    var signOutBtn = mount.querySelector('#srSignOut');
    if (signOutBtn) signOutBtn.removeAttribute('data-route');

    mount.querySelectorAll('.sr-dash-navrailbtn[data-route]').forEach(function (b) {
      b.addEventListener('click', function () {
        mount.querySelectorAll('.sr-dash-navrailbtn').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        var key = b.getAttribute('data-route');
        if (key === activeRoute) { if (opts.onRoute) opts.onRoute(key); return; }
        if (PAGES[key]) { global.location.href = PAGES[key]; return; }
        if (opts.onRoute) { opts.onRoute(key); return; }
        global.location.href = 'dashboard.html#route=' + encodeURIComponent(key);
      });
    });

    /* SR-454 (PASS-AI §1) · a scroll box clips anything that leaves it, and
       the hover label sits outside the 74px panel. Inside the list the label
       is position:fixed (css/saferise-rail.css) and placed here, against its
       button, each time it is about to show. */
    function placeLabel(b) {
      var span = b.querySelector('span');
      if (!span || getComputedStyle(span).position !== 'fixed') return;
      var r = b.getBoundingClientRect();
      span.style.left = (r.left + 56) + 'px';
      span.style.top = (r.top + (r.height - span.offsetHeight) / 2) + 'px';
    }
    mount.querySelectorAll('.sr-dash-navraillist .sr-dash-navrailbtn').forEach(function (b) {
      b.addEventListener('mouseenter', function () { placeLabel(b); });
      b.addEventListener('focus', function () { placeLabel(b); });
    });

    if (signOutBtn) {
      signOutBtn.addEventListener('click', function () {
        if (global.SafeRiseAccess) global.SafeRiseAccess.signOut();
        global.location.href = 'index.html';
      });
    }

    /* opts.theme === false opts out — dashboard.html only. It already wires
       every [data-theme] button itself (its theme script also broadcasts
       the mode via postMessage for embedded iframes), so wiring the same
       elements here too would attach a second click listener and run
       setTheme() twice per click. */
    if (opts.theme !== false) wireTheme();
  }

  /* ── reading mode, shared with the dashboard and reader (body.rd-soft) ──
     Wires whatever [data-theme] buttons already exist on the page — it
     does not render them, since their markup and placement (dashboard.html's
     header pill vs member-frameworks.html's .sr-fw-backbar toggle) differ
     by page family. dashboard.html keeps its own separate, richer theme
     script (it also broadcasts the mode via postMessage for embedded
     iframes) and is NOT wired through here — only its rail is. */
  function wireTheme() {
    var THEME_KEY = 'sr-theme';
    function setTheme(mode) {
      document.body.classList.toggle('rd-soft', mode === 'sunrise');
      document.querySelectorAll('[data-theme]').forEach(function (b) {
        b.classList.toggle('on', b.getAttribute('data-theme') === mode);
      });
      try { sessionStorage.setItem(THEME_KEY, mode); } catch (e) {}
    }
    var themeBtns = document.querySelectorAll('[data-theme]');
    if (!themeBtns.length) return;
    themeBtns.forEach(function (b) {
      b.addEventListener('click', function () { setTheme(b.getAttribute('data-theme')); });
    });
    var saved = 'midnight';
    try { saved = sessionStorage.getItem(THEME_KEY) || 'midnight'; } catch (e) {}
    setTheme(saved);
  }

  global.SafeRiseRail = { render: render, PAGES: PAGES };
})(window);
