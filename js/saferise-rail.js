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
    { key: 'coaching',  label: 'Sessions &amp; workshops' }
  ];
  var FOOT_ROUTES = [
    { key: 'account', label: 'Account &amp; plan' }
  ];

  /* the ONLY routes with a real page today — same three destinations
     every host page's own PAGES map already agreed on before this file
     existed, confirmed identical across all nine before merging them here */
  var PAGES = {
    dashboard: 'dashboard.html',
    method: 'member-frameworks.html',
    coming: 'member-coming-soon.html'
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
    ROUTES.forEach(function (r) { html += btnHTML(r, activeRoute); });
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
