/* ══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-org-explorer.js
   SR-429 · Interactivity for organisations.html's #sr-org-explorer
   (PASS-F-ORGANISATIONS-EXPLORER-AND-SECTIONS.md §3/§4). Reads
   B2B_PROTOCOLS (content/b2b-protocols.js) and F8_TRACKS
   (content/f8-tracks.js), both of which must load before this file.

   Adapted from pass/PASS-F-assets/PASS-F-reference-explorer.html — the
   brief's own reference build ("open them; do not reinvent the layout
   from the prose") — with three additions that reference did not include:
     · the ?role=&industry= deep link (§3b)
     · prefers-reduced-motion disabling the wall's reflow animation (§3c)
     · the three missing covers (I11/I12/R01) rendering the §4b plate
       fallback instead of a broken <img>, since content/b2b-protocols.js
       still carries a `cover` path for all 30 (unmodified, per "do not
       edit copy here") but three of those paths are not on disk this pass.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (typeof B2B_PROTOCOLS === 'undefined' || typeof F8_TRACKS === 'undefined') return;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

  /* SR-429 · I11 Manufacturing, I12 Security Operations and R01 People
     Leadership are missing assets (§4b's "no substitute" rule — reported
     in the pass, not silently patched with an unrelated photograph). */
  var MISSING_COVERS = { I11: 1, I12: 1, R01: 1 };
  var LAYER_CLASS = {
    Capacity: 'sr-org-elay-capacity', Relational: 'sr-org-elay-relational',
    Application: 'sr-org-elay-application', Substrate: 'sr-org-elay-substrate',
    Beyond: 'sr-org-elay-beyond'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
    });
  }
  function byId(id) {
    for (var i = 0; i < B2B_PROTOCOLS.length; i++) { if (B2B_PROTOCOLS[i].id === id) return B2B_PROTOCOLS[i]; }
    return null;
  }
  /* A missing cover renders the same typographic-plate fallback the
     Foundation 8 uses for its own missing art (§4b), tinted by kind rather
     than by layer since a protocol tile has no "layer" of its own. */
  function coverOrPlate(p, sizeAttrs) {
    if (!MISSING_COVERS[p.id]) {
      return '<img' + (sizeAttrs || '') + ' src="' + esc(p.cover) + '" alt="" loading="lazy">';
    }
    var cls = p.kind === 'role' ? 'sr-org-elay-role' : 'sr-org-elay-industry';
    return '<div class="sr-org-eplate ' + cls + '"><div><i>' + esc(p.id) + '</i><u>Cover pending</u></div></div>';
  }

  function byTitle(a, b) { return a.title.localeCompare(b.title, 'en'); }
  var roles = B2B_PROTOCOLS.filter(function (p) { return p.kind === 'role'; }).sort(byTitle);
  var inds = B2B_PROTOCOLS.filter(function (p) { return p.kind === 'industry'; }).sort(byTitle);

  /* A role that only makes sense inside one environment is offered only
     there (§3b). R13 Athletic Performance describes athletes, not a
     corporate function — it belongs to I13 Sport Performance and reads as
     a mismatch anywhere else. */
  var ROLE_ONLY_IN = { R13: 'I13' };

  function rolesFor(indId) {
    return roles.filter(function (r) { var only = ROLE_ONLY_IN[r.id]; return !only || only === indId; });
  }

  var DEFAULT_ROLE = 'R04', DEFAULT_IND = 'I03'; /* Frontline Service / Hospitality */

  function opt(sel, list, keep) {
    sel.innerHTML = '';
    list.forEach(function (p) {
      var o = document.createElement('option');
      o.value = p.id; o.textContent = p.title; sel.appendChild(o);
    });
    if (keep && list.some(function (p) { return p.id === keep; })) sel.value = keep;
    return sel.value;
  }
  function startAt(sel, list, want) {
    var ok = list.some(function (x) { return x.id === want; });
    sel.value = ok ? want : list[0].id;
  }

  var selRole = document.getElementById('srOrgSelRole'), selInd = document.getElementById('srOrgSelInd');
  if (!selRole || !selInd) return;

  /* §3b deep link — ?role=Rnn&industry=Inn. Industry applied before role:
     applied the other way round, an R13 link is silently dropped because
     R13 is not yet in the role list. */
  function paramFrom(search, name) {
    var m = new RegExp('[?&]' + name + '=([^&]+)').exec(search);
    return m ? decodeURIComponent(m[1]) : '';
  }
  var wantInd = paramFrom(location.search, 'industry');
  var wantRole = paramFrom(location.search, 'role');
  var startInd = (wantInd && inds.some(function (p) { return p.id === wantInd; })) ? wantInd : DEFAULT_IND;

  opt(selInd, inds); startAt(selInd, inds, startInd);
  var startRoleList = rolesFor(selInd.value);
  var startRole = (wantRole && startRoleList.some(function (p) { return p.id === wantRole; })) ? wantRole : DEFAULT_ROLE;
  opt(selRole, startRoleList); startAt(selRole, startRoleList, startRole);

  function syncRoles() {
    var avail = rolesFor(selInd.value), had = selRole.value;
    opt(selRole, avail, had);
    if (!avail.some(function (r) { return r.id === had; })) startAt(selRole, avail, DEFAULT_ROLE);
  }

  function twoCard(p) {
    var mod = p.kind === 'role' ? 'role' : 'ind';
    var lab = p.kind === 'role' ? 'Role protocol' : 'Industry protocol';
    return '<div class="sr-org-ecard sr-org-ecard--' + mod + '">'
      + '<figure class="sr-org-efig">' + coverOrPlate(p) + '</figure>'
      + '<div class="sr-org-et"><p class="sr-org-ek">' + lab + '</p><h3>' + esc(p.title) + '</h3>'
      + '<p>' + esc(p.lead) + '</p>'
      + '<p class="sr-org-ea"><span>Anchor</span>' + esc(p.anchor) + '</p></div></div>';
  }

  var stackline = document.getElementById('srOrgStackline'), plusHost = document.getElementById('srOrgPlus');
  function build() {
    var r = byId(selRole.value), i = byId(selInd.value);
    if (!r || !i) return;
    if (stackline) stackline.innerHTML = 'Someone in <b>' + esc(r.title) + '</b>, working in <b>' + esc(i.title) + '</b>, receives ten tracks.';
    if (plusHost) plusHost.innerHTML = twoCard(r) + twoCard(i);
  }
  selRole.addEventListener('change', build);
  selInd.addEventListener('change', function () { syncRoles(); build(); });
  build();

  /* ---- Foundation 8: same card component as the +2, click to open ---- */
  var f8host = document.getElementById('srOrgF8');
  var f8detail = document.getElementById('srOrgF8Detail'), f8inner = document.getElementById('srOrgF8Inner');
  var f8open = null;

  if (f8host && f8detail && f8inner) {
    F8_TRACKS.forEach(function (t, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'sr-org-ecard sr-org-ecard--f8'; b.dataset.i = i;
      b.setAttribute('aria-expanded', 'false');
      var lay = LAYER_CLASS[t.layer] || '';
      b.innerHTML =
        '<div class="sr-org-eplate ' + lay + '"><div><i>' + esc(t.n) + '</i><u>' + esc(t.layer) + '</u></div></div>'
        + '<div class="sr-org-et"><p class="sr-org-ek">Foundation track</p><h3>' + esc(t.name) + '</h3>'
        + '<p>' + esc(t.lead) + '</p><span class="sr-org-ef8cue">Read the track</span></div>';
      f8host.appendChild(b);
    });

    function closeF8() {
      f8detail.classList.remove('sr-org-eopen'); f8open = null;
      f8host.querySelectorAll('.sr-org-ecard').forEach(function (x) {
        x.classList.remove('sr-org-eon'); x.setAttribute('aria-expanded', 'false');
      });
    }

    f8host.addEventListener('click', function (e) {
      var b = e.target.closest('.sr-org-ecard'); if (!b) return;
      var i = +b.dataset.i, t = F8_TRACKS[i];
      if (f8open === i) { closeF8(); b.focus(); return; }
      closeF8(); f8open = i;
      b.classList.add('sr-org-eon'); b.setAttribute('aria-expanded', 'true');
      var lay = LAYER_CLASS[t.layer] || '';
      /* SR-434 (PASS-I.md §1) · f8inner never carried this class — the wall
         panel a few lines down does (dinner.className, below), and
         .sr-org-edinner is the only rule holding the panel's 200px/1fr
         grid. Without it .sr-org-eside ran full-width and the plate (with
         the handler's own inline width:100%) resolved to ~1500x2000. */
      f8inner.className = 'sr-org-edinner';
      f8inner.innerHTML =
        '<button type="button" class="sr-org-eclose" data-f8close>Close</button>'
        + '<div class="sr-org-eside"><div class="sr-org-eplate ' + lay + '" style="width:100%">'
        + '<div><i>' + esc(t.n) + '</i><u>' + esc(t.layer) + '</u></div></div>'
        + '<div class="sr-org-eanchor"><span>Layer</span><b>' + esc(t.layer) + '</b></div>'
        + '<div class="sr-org-ewho"><span>Who it serves</span><p>' + esc(t.audience) + '</p></div></div>'
        + '<div class="sr-org-etext"><p class="sr-org-ek" style="color:var(--gold)">Track ' + esc(t.n) + ' · Foundation</p>'
        + '<h3>' + esc(t.name) + '</h3><p class="sr-org-elead">' + esc(t.lead) + '</p>'
        + '<div class="sr-org-efgrid">'
        + '<div class="sr-org-erow"><span>What this track works</span><p>' + esc(t.story) + '</p>'
        + '<span class="sr-org-emt">Depth specific to this track</span><p>' + esc(t.depth) + '</p></div>'
        + '<div class="sr-org-erow"><span>Ten protocols</span><ol class="sr-org-efp">'
        + t.protocols.map(function (x, j) { return '<li><em>' + (j < 9 ? '0' : '') + (j + 1) + '</em>' + esc(x) + '</li>'; }).join('')
        + '</ol>'
        + '<p class="sr-org-eguard">' + esc(t.guard) + '</p></div>'
        + '</div></div>';
      f8detail.classList.add('sr-org-eopen');
      requestAnimationFrame(function () {
        if (f8detail.getBoundingClientRect().top < 0) f8detail.scrollIntoView({ block: 'start' });
      });
    });
    f8detail.addEventListener('click', function (e) {
      if (e.target.closest('[data-f8close]')) {
        var b = f8host.querySelector('.sr-org-ecard[data-i="' + f8open + '"]'); closeF8(); if (b) b.focus();
      }
    });
  }

  /* ---- wall: all 30, role first then industry, alphabetical within each ---- */
  var wall = document.getElementById('srOrgWall');
  var detail = document.getElementById('srOrgDetail'), dinner = document.getElementById('srOrgDinner');
  var openId = null;

  if (wall && detail && dinner) {
    B2B_PROTOCOLS.slice().sort(function (a, b) {
      if (a.kind !== b.kind) return a.kind === 'role' ? -1 : 1;
      return a.title.localeCompare(b.title, 'en');
    }).forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'sr-org-etile'; b.dataset.k = p.kind; b.dataset.id = p.id;
      b.setAttribute('aria-label', p.title + ' — ' + (p.kind === 'role' ? 'role' : 'industry') + ' protocol');
      b.innerHTML = '<span class="sr-org-eid">' + esc(p.id) + '</span>' + coverOrPlate(p)
        + '<figcaption><b>' + esc(p.title) + '</b><i>' + esc(p.anchor) + '</i></figcaption>';
      wall.appendChild(b);
    });

    wall.addEventListener('click', function (e) {
      var t = e.target.closest('.sr-org-etile'); if (!t) return;
      var p = byId(t.dataset.id);
      if (openId === p.id) { detail.classList.remove('sr-org-eopen'); openId = null; return; }
      openId = p.id;
      var isRole = p.kind === 'role';
      /* Reuses this page's own existing role/industry-adjacent tokens
         (--sr-org-slate, --sr-org-sage — already carrying this exact
         blue/green split on #sr-org-impact's pathrail) rather than
         introducing a parallel colour pair for the same two meanings. */
      var accent = isRole ? 'rgb(var(--sr-org-slate))' : 'rgb(var(--sr-org-sage))';
      var askLabel = isRole ? 'What it asks' : 'What it exposes';
      dinner.className = 'sr-org-edinner' + (isRole ? ' sr-org-erole' : '');
      dinner.innerHTML =
        '<button type="button" class="sr-org-eclose" data-dclose>Close</button>'
        + '<div class="sr-org-eside">'
        + '<figure class="sr-org-ecover ' + (isRole ? 'sr-org-erol' : 'sr-org-eind') + '">' + coverOrPlate(p) + '</figure>'
        + '<div class="sr-org-eanchor"><span>Anchor experience</span><b>' + esc(p.anchor) + '</b></div>'
        + '<div class="sr-org-ewho"><span>Who it serves</span><p>' + esc(p.who) + '</p></div>'
        + '</div>'
        + '<div class="sr-org-etext">'
        + '<p class="sr-org-ek" style="color:' + accent + '">' + esc(p.id) + ' · ' + (isRole ? 'Role protocol' : 'Industry protocol') + '</p>'
        + '<h3>' + esc(p.title) + '</h3>'
        + '<p class="sr-org-elead">' + esc(p.lead) + '</p>'
        + '<p class="sr-org-esub">' + esc(p.sub) + '</p>'
        + '<div class="sr-org-erow"><span>Why this protocol matters</span>'
        + p.why.map(function (w) { return '<p>' + esc(w) + '</p>'; }).join('')
        + '</div>'
        + '<div class="sr-org-etwo">'
        + '<div class="sr-org-ewo"><span>Without relevant support</span><p>' + esc(p.without) + '</p></div>'
        + '<div class="sr-org-eturn" aria-hidden="true"></div>'
        + '<div class="sr-org-ewi"><span>With good integration</span><p>' + esc(p.with_good) + '</p></div>'
        + '</div>'
        + '<div class="sr-org-erow"><span>' + askLabel + ' — core territory</span><div class="sr-org-etags">'
        + p.core.map(function (c) { return '<i>' + esc(c) + '</i>'; }).join('')
        + '</div></div>'
        + '<div class="sr-org-erow"><span>Resources &amp; protocol-specific depth</span>'
        + '<ul class="sr-org-eres">' + p.resources.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>'
        + '</div>'
        + '<div class="sr-org-erow"><span>Organisational value</span><p>' + esc(p.org_value) + '</p></div>'
        + (p.guard ? '<p class="sr-org-eguard">' + esc(p.guard) + '</p>' : '')
        + '</div>';
      detail.classList.add('sr-org-eopen');
      requestAnimationFrame(function () {
        if (detail.getBoundingClientRect().top < 0) detail.scrollIntoView({ block: 'start' });
      });
    });
    detail.addEventListener('click', function (e) {
      if (e.target.closest('[data-dclose]')) {
        var t = wall.querySelector('.sr-org-etile[data-id="' + openId + '"]');
        detail.classList.remove('sr-org-eopen'); openId = null; if (t) t.focus();
      }
    });

    /* ---- filters (§3c) — hidden, not dimmed, so the grid reflows ---- */
    var countEl = document.getElementById('srOrgCount');
    var filterRow = document.querySelector('.sr-org-efilters');
    function applyFilter(f) {
      var shown = 0;
      if (openId) { detail.classList.remove('sr-org-eopen'); openId = null; }
      wall.querySelectorAll('.sr-org-etile').forEach(function (t) {
        var on = f === 'all' || t.dataset.k === f;
        t.classList.toggle('sr-org-egone', !on);
        if (on) shown++;
      });
      if (!(reduced && reduced.matches)) {
        wall.classList.remove('sr-org-ereflow'); void wall.offsetWidth; wall.classList.add('sr-org-ereflow');
      }
      if (countEl) countEl.textContent = f === 'all'
        ? 'All 30 context protocols. Each one sits on top of the same Foundation 8.'
        : 'Showing the ' + shown + ' ' + (f === 'role' ? 'role' : 'industry') + ' protocols. Each one sits on top of the same Foundation 8.';
    }
    if (filterRow) {
      filterRow.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        applyFilter(b.dataset.f);
      });
      applyFilter('all');
    }
  }

  /* ---- shared: Escape closes whichever panel is open, focus returns ---- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (f8open !== null) { var b1 = f8host.querySelector('.sr-org-ecard[data-i="' + f8open + '"]'); closeF8IfOpen(); if (b1) b1.focus(); }
    if (openId) { var b2 = wall.querySelector('.sr-org-etile[data-id="' + openId + '"]'); detail.classList.remove('sr-org-eopen'); openId = null; if (b2) b2.focus(); }
  });
  /* closeF8 is declared inside the f8host guard above; this indirection
     lets the shared Escape handler call it even when that block ran (f8host
     exists on every real load — the guard only protects a malformed page). */
  function closeF8IfOpen() {
    if (!f8host) return;
    f8open = null;
    if (f8detail) f8detail.classList.remove('sr-org-eopen');
    f8host.querySelectorAll('.sr-org-ecard').forEach(function (x) {
      x.classList.remove('sr-org-eon'); x.setAttribute('aria-expanded', 'false');
    });
  }

  /* ---- click anywhere outside an open panel dismisses it, no focus move ---- */
  document.addEventListener('pointerdown', function (e) {
    var t = e.target;
    if (f8open !== null && !t.closest('#srOrgF8Detail') && !t.closest('#srOrgF8')) closeF8IfOpen();
    if (openId && !t.closest('#srOrgDetail') && !t.closest('#srOrgWall') && !t.closest('.sr-org-efilters')) {
      if (detail) detail.classList.remove('sr-org-eopen'); openId = null;
    }
  }, true);

  /* ---- section ledes: expand the rest of the argument on request ---- */
  document.querySelectorAll('.sr-org-ermore').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var t = document.getElementById(btn.getAttribute('aria-controls'));
      if (!t) return;
      var open = t.classList.toggle('sr-org-eopen');
      btn.setAttribute('aria-expanded', String(open));
      btn.firstChild.nodeValue = open ? 'Read less' : 'Read more';
    });
  });
})();
