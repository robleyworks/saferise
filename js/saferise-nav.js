/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — shared public nav · SR-341

   Same pattern as SafeRiseRail.render() and SafeRiseFooter.render(): one
   module owns the markup, the data and the open/close/theme behavior; the
   host page keeps an empty mount and calls render(). Extracted from
   method.html, the one canonical copy that already carried the "bridge the
   gap" dropdown fix (live-sessions.html had its own copy of the same fix;
   about.html, anxiety-reset.html, coming-soon.html and plans.html did not).
   The CSS is NOT duplicated here — css/saferise-system.css already carried
   almost this entire .nav/.ndrop/.nmenu block from an earlier pass (SR-332,
   for index.html's own use); SR-341 only added the missing gap-fix and a
   current-page marker rule to that existing block rather than starting a
   second CSS copy. See that stylesheet's own SR-341 comments.

   USAGE — the host page:
     1. An empty mount point: <div id="srNav"></div>
     2. <link rel="stylesheet" href="css/saferise-system.css"> (every page
        this was built for already loads it for other reasons)
     3. <script src="js/saferise-nav.js"></script>
     4. <script>SafeRiseNav.render('personal-transformation.html');</script>
        — the argument is this page's own filename, used only to mark the
        matching Protocols-dropdown item current (aria-current="page"),
        the dropdown equivalent of how js/saferise-track.js's old renderNav()
        marked the active pill in the pill-strip nav these three pages used
        to carry. Omit it, or pass a filename with no match, for a page with
        no "current" item to mark — every flat link (Method/Plans/Live
        sessions/About) stays unmarked either way, matching method.html's
        own nav, which does not mark itself active when visited.

   Written for the three track pages (personal-transformation.html,
   relationship-healing.html, professional-performance.html), which had no
   public nav at all — SR-325 removed the member-page links their old
   pill-strip nav pointed at and nothing replaced them. Not yet wired into
   the six self-contained public pages, which still carry this same markup
   and script by hand; folding them onto this module too is a separate,
   later consolidation, not part of this regression fix. */
(function (global) {
  'use strict';

  var TRACKS = [
    { key: 't1', href: 'personal-transformation.html', label: 'Track 01',
      name: 'Personal Transformation', desc: 'What happens inside me' },
    { key: 't2', href: 'relationship-healing.html', label: 'Track 02',
      name: 'Relationship Healing', desc: 'What keeps happening between us' },
    { key: 't3', href: 'professional-performance.html', label: 'Track 03',
      name: 'Professional Performance', desc: 'What changes when the stakes rise' }
  ];

  var LINKS = [
    ['method.html', 'Method'],
    ['plans.html', 'Plans'],
    ['live-sessions.html', 'Live sessions'],
    ['about.html', 'About']
  ];

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function markup(current) {
    var items = TRACKS.map(function (t) {
      return '<a role="menuitem" href="' + t.href + '" class="nm ' + t.key + '"' +
        (t.href === current ? ' aria-current="page"' : '') + '>' +
        '<span class="nmk">' + t.label + '</span><span class="nmn">' + esc(t.name) + '</span>' +
        '<span class="nmd">' + esc(t.desc) + '</span></a>';
    }).join('');
    items += '<a role="menuitem" href="coming-soon.html" class="nm soon"' +
      (current === 'coming-soon.html' ? ' aria-current="page"' : '') + '>' +
      '<span class="nmk">Not yet open</span><span class="nmn">What&#8217;s coming</span>' +
      '<span class="nmd">Six more tracks in development</span></a>';

    var flat = LINKS.map(function (l) {
      return '<a href="' + l[0] + '">' + l[1] + '</a>';
    }).join('');

    return '<nav class="nav"><div class="navin">' +
      '<a class="brand" href="index.html"><span class="bmark">&#9672;</span><span class="bname">SafeRise</span></a>' +
      '<div class="navlinks">' +
        '<div class="ndrop">' +
          '<button class="ntop" type="button" aria-expanded="false" aria-haspopup="true" id="ptrig">' +
            'Protocols <span class="ncar" aria-hidden="true">&#9662;</span></button>' +
          '<div class="nmenu" role="menu" aria-labelledby="ptrig">' + items + '</div>' +
        '</div>' + flat +
      '</div>' +
      '<button class="themetog" id="tog" type="button" aria-label="Switch theme">' +
        '<span class="tdot"></span><span id="togl">Midnight</span></button>' +
      '<a class="navcta" href="dashboard.html">Log in</a>' +
    '</div></nav>';
  }

  function bind(root) {
    var dd = root.querySelector('.ndrop'), dt = root.querySelector('#ptrig');
    /* SR · one setter for both class and aria so they cannot disagree.
       Previously mouseenter added .open without touching aria-expanded, so
       aria read false while the menu was visible; the next click then toggled
       the already-open class shut. */
    var hoverOpened = false;
    function setOpen(v) {
      dd.classList.toggle('open', v);
      dt.setAttribute('aria-expanded', v ? 'true' : 'false');
    }
    function close() { hoverOpened = false; setOpen(false); }
    dt.addEventListener('click', function (e) {
      e.stopPropagation();
      if (hoverOpened) { hoverOpened = false; return; }
      setOpen(!dd.classList.contains('open'));
    });
    dd.addEventListener('mouseenter', function () { hoverOpened = true; setOpen(true); });
    dd.addEventListener('mouseleave', close);
    dd.addEventListener('focusin', function () { setOpen(true); });
    dd.addEventListener('focusout', function (e) { if (!dd.contains(e.relatedTarget)) close(); });
    document.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { dt.focus(); close(); } });

    var t = root.querySelector('#tog'), l = root.querySelector('#togl');
    function applyTheme(n) {
      global.document.documentElement.setAttribute('data-theme', n);
      if (l) l.textContent = n === 'midnight' ? 'Midnight' : 'Sunrise';
      try { sessionStorage.setItem('sr-theme', n); } catch (e) {}
    }
    try {
      var saved = sessionStorage.getItem('sr-theme');
      if (saved === 'midnight' || saved === 'sunrise') applyTheme(saved);
    } catch (e) {}
    if (t) t.addEventListener('click', function () {
      var c = global.document.documentElement.getAttribute('data-theme');
      applyTheme(c === 'midnight' ? 'sunrise' : 'midnight');
    });
  }

  function render(current, opts) {
    opts = opts || {};
    var mount = typeof opts.mount === 'string' ? document.getElementById(opts.mount)
      : (opts.mount || document.getElementById('srNav'));
    if (!mount) return;
    mount.innerHTML = markup(current || '');
    bind(mount.querySelector('.nav'));
  }

  global.SafeRiseNav = { render: render };
})(window);
