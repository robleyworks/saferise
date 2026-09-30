/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-records.js · SR-478 (SR-475 Part C)
   MY RECORDS — the member's records hub, /records. claude/MY-RECORDS-HUB.md
   (L1–L6) and claude/NAMING-DECISIONS.md (N1, N2).

   DEVICE-FIRST. Everything here is read from, and written back to, the
   stores already on this device. Nothing is sent anywhere. The server copy
   (supabase/migrations/0004_records.sql, not yet applied) plugs in at ONE
   seam per tab — the functions in `Source` below. Each currently returns
   from the device; when the server read is wired it must be scoped to the
   signed-in member (user_id = the session's user) even though RLS already
   is, so a policy change can never widen the page. The device copy stays
   intact until a server copy is confirmed. No sync is built here.

   THE STORES (the corrected key list — see the SR-478 register entry):
     All Sessions     sr.sv.records        Sovereign session records
                      (no guided-run store exists: sr.record.runs has no
                       writer; the Guided filter says so plainly)
     The Chosen Self  sr.sv.records        each record's Rise transcript lines
                      sr.record.chosen     entries the member wrote on the old
                                           /record/chosen-self page
     Decisions        sr.decision.<id>     The Decision worksheet, per protocol
                      sr.record.decisions  entries written on /record/decisions
     Journal          sr.journal.entries   written on a protocol's journal
     Saved            sr.saved             the one typed store (L3): protocol |
                                           resource | content — created here
                      sr-saved-v1          the dashboard's protocol hearts
                                           ('track:no'), read as protocols

   Every read and write goes through the Store js/saferise-decision.js
   already uses (write probe, in-memory fallback, JSON, try/catch) — its
   export, not a fourth copy.

   RULES: the feature is "AI feedback". The Chosen Self shows only what the
   member said or wrote — SafeRise never adds a statement. No counts of
   protocols, resources or tracks. No timers or progress. Classes sr-mr-.
   ═══════════════════════════════════════════════════════════════════════ */
(function (global, document) {
  'use strict';

  var Store = global.SafeRiseDecision && global.SafeRiseDecision.Store;
  if (!Store) return;

  var K = {
    sv: 'sr.sv.records',
    chosenWritten: 'sr.record.chosen',
    decisionsWritten: 'sr.record.decisions',
    journal: 'sr.journal.entries',
    saved: 'sr.saved',
    savedHearts: 'sr-saved-v1',
    decision: 'sr.decision.'
  };
  var TABS = ['sessions', 'chosen', 'decisions', 'journal', 'saved'];
  var PHASES = ['recognise', 'regulate', 'release', 'rise'];

  function arr(v) { return Array.isArray(v) ? v : []; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmtDate(iso) {
    /* a date-only value (the journal's 'YYYY-MM-DD') is a local day, not UTC
       midnight — parsed as UTC it shows the day before west of Greenwich */
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
    var d = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(iso);
    return isNaN(d) ? '' : d.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
  }
  function cap(p) { p = String(p || ''); return p.charAt(0).toUpperCase() + p.slice(1).toLowerCase(); }
  function uid(prefix) { return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  /* protocol id → name and page, from content/tracks.js (never typed here) */
  function protocolInfo(id) {
    var m = /^t(\d+)-p?(\d+)$/.exec(String(id || ''));
    var T = m && global.TRACKS && global.TRACKS[+m[1]];
    var row = T && (T.protocols || []).filter(function (r) { return +r[0] === +m[2]; })[0];
    return row ? { name: row[2], href: '/protocols/' + row[row.length - 2] } : null;
  }
  function protocolName(id, fallback) { var p = protocolInfo(id); return p ? p.name : (fallback || ''); }

  /* ═══ THE SEAM — one function per tab. Device today; server later. ═══ */
  var Source = {
    sessions: function () {
      return arr(Store.get(K.sv, [])).map(function (r) {
        return { kind: 'sovereign', rec: r, date: r.createdAt };
      }).sort(function (a, b) { return String(b.date || '').localeCompare(String(a.date || '')); });
    },
    chosen: function () {
      var spoken = arr(Store.get(K.sv, [])).map(function (r) {
        return { rec: r, lines: arr(r.transcript).filter(function (t) { return String(t.phase).toLowerCase() === 'rise' && String(t.text || '').trim(); }) };
      });
      var written = arr(Store.get(K.chosenWritten, []));
      return { spoken: spoken, written: written };
    },
    decisions: function () {
      var sheets = [];
      var T = global.TRACKS || {};
      Object.keys(T).forEach(function (n) {
        arr(T[n].protocols).forEach(function (row) {
          var id = 't' + n + '-p' + row[0];
          var data = Store.get(K.decision + id, null);
          if (data && typeof data === 'object' && Object.keys(data).some(function (k) { return String(data[k] || '').trim(); })) {
            sheets.push({ id: id, data: data });
          }
        });
      });
      return { sheets: sheets, written: arr(Store.get(K.decisionsWritten, [])) };
    },
    journal: function () {
      return arr(Store.get(K.journal, [])).slice().sort(function (a, b) { return String(b.date || '').localeCompare(String(a.date || '')); });
    },
    saved: function () {
      var typed = arr(Store.get(K.saved, [])).filter(function (s) { return s && s.type && s.id; });
      var seen = {};
      typed.forEach(function (s) { seen[s.type + ':' + s.id] = true; });
      arr(Store.get(K.savedHearts, [])).forEach(function (h) {
        var m = /^(\d+):(\d+)$/.exec(String(h));
        if (!m) return;
        var id = 't' + m[1] + '-p' + (m[2].length < 2 ? '0' : '') + m[2];
        if (!seen['protocol:' + id]) typed.push({ type: 'protocol', id: id, heart: String(h) });
      });
      return typed;
    }
  };

  /* ═══ writes, all through Store ═══ */
  var Write = {
    svUpdate: function (recId, fn) {
      var list = arr(Store.get(K.sv, []));
      list.forEach(function (r) { if (r.id === recId) fn(r); });
      Store.set(K.sv, list);
    },
    svRemove: function (recId) { Store.set(K.sv, arr(Store.get(K.sv, [])).filter(function (r) { return r.id !== recId; })); },
    listUpdate: function (key, match, fn) {
      var list = arr(Store.get(key, []));
      list.forEach(function (e) { if (match(e)) fn(e); });
      Store.set(key, list);
    },
    listRemove: function (key, match) { Store.set(key, arr(Store.get(key, [])).filter(function (e) { return !match(e); })); },
    listAdd: function (key, entry) { var l = arr(Store.get(key, [])); l.push(entry); Store.set(key, l); },
    unsave: function (item) {
      if (item.heart) Store.set(K.savedHearts, arr(Store.get(K.savedHearts, [])).filter(function (h) { return String(h) !== item.heart; }));
      Store.set(K.saved, arr(Store.get(K.saved, [])).filter(function (s) { return !(s.type === item.type && s.id === item.id); }));
    }
  };

  /* ═══ rendering ═══ */
  var state = { tab: 'sessions', filter: 'all', open: null, editing: null };
  var root;

  function empty(title, body, action) {
    return '<div class="sr-mr-empty"><p class="sr-mr-emptyh">' + title + '</p><p class="sr-mr-emptyb">' + body + '</p>' +
      (action || '') + '</div>';
  }
  function acts(kind, id) {
    return '<p class="sr-mr-acts"><button type="button" class="sr-mr-link" data-mr="edit" data-kind="' + kind + '" data-id="' + esc(id) + '">Edit</button>' +
      '<button type="button" class="sr-mr-link sr-mr-link--quiet" data-mr="delete" data-kind="' + kind + '" data-id="' + esc(id) + '">Delete</button></p>';
  }
  function editBox(kind, id, value) {
    return '<div class="sr-mr-editbox"><label class="sr-mr-vh" for="sr-mr-edit">Edit</label>' +
      '<textarea class="sr-mr-edit" id="sr-mr-edit" data-kind="' + kind + '" data-id="' + esc(id) + '">' + esc(value) + '</textarea>' +
      '<p class="sr-mr-acts"><button type="button" class="sr-mr-btn" data-mr="edit-save">Save</button>' +
      '<button type="button" class="sr-mr-link" data-mr="edit-cancel">Cancel</button></p></div>';
  }
  function isEditing(kind, id) { return state.editing && state.editing.kind === kind && state.editing.id === id; }
  function textOrEdit(kind, id, text, cls) {
    return isEditing(kind, id) ? editBox(kind, id, text) : '<p class="' + cls + '">' + esc(text) + '</p>' + acts(kind, id);
  }

  /* ── All Sessions ── */
  function sessionDetail(r) {
    var h = '';
    if (r.pre != null || r.post != null) {
      h += '<p class="sr-mr-ratings">' + (r.pre != null ? 'You began at ' + esc(r.pre) : '') +
        (r.pre != null && r.post != null ? ' and finished at ' + esc(r.post) : (r.post != null ? 'You finished at ' + esc(r.post) : '')) + '.</p>';
    }
    var t = arr(r.transcript);
    h += '<section class="sr-mr-sub"><h3 class="sr-mr-label">Your words</h3>';
    if (!t.length) h += '<p class="sr-mr-quiet">No transcript was kept for this session.</p>';
    PHASES.forEach(function (p) {
      var items = t.filter(function (u) { return String(u.phase).toLowerCase() === p; });
      if (!items.length) return;
      h += '<div class="sr-mr-phase"><p class="sr-mr-phasen">' + cap(p) + '</p>' + items.map(function (u) {
        return '<div class="sr-mr-utt">' + textOrEdit('utt', r.id + '|' + u.id, u.text, 'sr-mr-text') + '</div>';
      }).join('') + '</div>';
    });
    h += '</section>';
    var rd = r.reading || {};
    var blocks = arr(rd.blocks);
    h += '<section class="sr-mr-sub"><h3 class="sr-mr-label">AI feedback</h3>';
    if (rd.status === 'ok' && blocks.length) {
      h += blocks.map(function (b) {
        var id = r.id + '|' + b.id;
        return '<article class="sr-mr-fb">' +
          (isEditing('fb', id) ? editBox('fb', id, b.text) : '<p class="sr-mr-text">' + esc(b.text) + '</p>') +
          '<ul class="sr-mr-quotes" aria-label="Your words this came from">' + arr(b.quotes).map(function (q) { return '<li>“' + esc(q) + '”</li>'; }).join('') + '</ul>' +
          '<p class="sr-mr-src">From ' + esc(cap(b.sourcePhase)) + '</p>' +
          (isEditing('fb', id) ? '' : acts('fb', id)) + '</article>';
      }).join('');
    } else {
      h += '<p class="sr-mr-quiet">' + (rd.status === 'off' ? 'AI feedback was switched off for this session.'
        : rd.status === 'pending' ? 'AI feedback for this session has not arrived yet.'
        : 'There is no AI feedback for this session.') + '</p>';
    }
    h += '</section><p class="sr-mr-acts"><button type="button" class="sr-mr-link sr-mr-link--quiet" data-mr="delete" data-kind="session" data-id="' + esc(r.id) + '">Delete this session</button></p>';
    return h;
  }
  function renderSessions() {
    var all = Source.sessions();
    var filterRow = '<div class="sr-mr-filter" role="group" aria-label="Show">' +
      [['all', 'All'], ['guided', 'Guided'], ['sovereign', 'Sovereign']].map(function (f) {
        return '<button type="button" data-mr="filter" data-f="' + f[0] + '" aria-pressed="' + (state.filter === f[0]) + '">' + f[1] + '</button>';
      }).join('') + '</div>';
    if (state.filter === 'guided') {
      return filterRow + empty('No guided sessions are kept here yet.',
        'A guided session is not saved as a record of its own on this device. What you write after one is in your Journal.',
        '<p><button type="button" class="sr-mr-btn" data-mr="tab" data-tab="journal">Open your Journal</button></p>');
    }
    if (!all.length) {
      return filterRow + empty('Every session you run will be here, newest first.',
        'Guided and Sovereign alike. Open one to read what you said, the AI feedback and where you started and finished. Begin one from the dashboard.',
        '<p><a class="sr-mr-btn" href="/dashboard.html">Go to the dashboard</a></p>');
    }
    return filterRow + '<ol class="sr-mr-list">' + all.map(function (s) {
      var r = s.rec, open = state.open === r.id;
      return '<li class="sr-mr-item' + (open ? ' is-open' : '') + '">' +
        '<button type="button" class="sr-mr-row" data-mr="open" data-id="' + esc(r.id) + '" aria-expanded="' + open + '">' +
          '<span class="sr-mr-kind">Sovereign</span>' +
          '<span class="sr-mr-name">' + esc(protocolName(r.protocolId, r.protocol) || 'A session') + '</span>' +
          '<span class="sr-mr-date">' + esc(fmtDate(r.createdAt)) + '</span></button>' +
        (open ? '<div class="sr-mr-detail">' + sessionDetail(r) + '</div>' : '') + '</li>';
    }).join('') + '</ol>';
  }

  /* ── The Chosen Self ── */
  function renderChosen() {
    var d = Source.chosen();
    var h = '<p class="sr-mr-rule">Only your own words. SafeRise never adds a statement you did not make.</p>';
    var bySession = d.spoken.filter(function (s) { return true; });
    var any = bySession.some(function (s) { return s.lines.length; }) || d.written.length;
    if (!any && !bySession.length) {
      h += empty('Statements you speak in Rise will be here.',
        'In a Sovereign session, what you say in Rise is kept here, with the session it came from. You can also write one yourself below.');
    }
    if (bySession.length) {
      h += '<ol class="sr-mr-list">' + bySession.map(function (s) {
        var r = s.rec;
        return '<li class="sr-mr-item sr-mr-group"><p class="sr-mr-meta"><span class="sr-mr-kind">Spoken in Rise</span> ' +
          esc(protocolName(r.protocolId, r.protocol) || 'A session') + ' · ' + esc(fmtDate(r.createdAt)) + '</p>' +
          (s.lines.length ? s.lines.map(function (u) {
            return '<div class="sr-mr-stmt">' + textOrEdit('utt', r.id + '|' + u.id, u.text, 'sr-mr-statement') + '</div>';
          }).join('') : '<p class="sr-mr-quiet">Nothing was spoken in Rise in this session.</p>') + '</li>';
      }).join('') + '</ol>';
    }
    if (d.written.length) {
      h += '<ol class="sr-mr-list">' + d.written.slice().sort(function (a, b) { return String(b.date || '').localeCompare(String(a.date || '')); }).map(function (e) {
        return '<li class="sr-mr-item"><p class="sr-mr-meta"><span class="sr-mr-kind">Written by you</span> ' + esc(fmtDate(e.date)) + '</p>' +
          textOrEdit('chosenW', e.date, e.text, 'sr-mr-statement') + '</li>';
      }).join('') + '</ol>';
    }
    h += compose('chosenW', 'Write a statement', 'In your own words.');
    return h;
  }

  /* ── Decisions ── */
  var SHEET_LABELS = {
    running: 'What I do now', protecting: 'What it keeps me safe from', cost1: 'What it has cost me', cost2: 'What it has cost me',
    attend: 'Where I want my attention instead', does1: 'On an ordinary day, I', does2: 'On an ordinary day, I', does3: 'On an ordinary day, I',
    during: 'In the middle of a hard one, I', line: 'What it should be doing instead'
  };
  var SHEET_ORDER = ['running', 'protecting', 'cost1', 'cost2', 'attend', 'does1', 'does2', 'does3', 'line', 'during'];
  function renderDecisions() {
    var d = Source.decisions();
    var h = '';
    if (!d.sheets.length && !d.written.length) {
      h += empty('What you decide will be here.',
        'When you work through The Decision on a protocol, what you wrote is kept here with the protocol it belongs to. You can also record a decision yourself below.');
    }
    if (d.sheets.length) {
      h += '<ol class="sr-mr-list">' + d.sheets.map(function (s) {
        var p = protocolInfo(s.id);
        var lines = SHEET_ORDER.filter(function (k) { return String(s.data[k] || '').trim(); });
        return '<li class="sr-mr-item"><p class="sr-mr-meta"><span class="sr-mr-kind">The Decision</span> ' + esc(p ? p.name : s.id) + '</p>' +
          '<dl class="sr-mr-sheet">' + lines.map(function (k) {
            return '<div><dt>' + SHEET_LABELS[k] + '</dt><dd>' + esc(s.data[k]) + '</dd></div>';
          }).join('') + '</dl>' +
          (p ? '<p class="sr-mr-acts"><a class="sr-mr-link" href="' + esc(p.href) + '">Open it on the protocol</a></p>' : '') + '</li>';
      }).join('') + '</ol>';
    }
    if (d.written.length) {
      h += '<ol class="sr-mr-list">' + d.written.slice().sort(function (a, b) { return String(b.date || '').localeCompare(String(a.date || '')); }).map(function (e) {
        return '<li class="sr-mr-item"><p class="sr-mr-meta"><span class="sr-mr-kind">Written by you</span> ' + esc(fmtDate(e.date)) + '</p>' +
          textOrEdit('decW', e.date, e.text, 'sr-mr-statement') + '</li>';
      }).join('') + '</ol>';
    }
    h += compose('decW', 'Record a decision', 'One line is enough.');
    return h;
  }

  /* ── Journal ── */
  function renderJournal() {
    var list = Source.journal();
    if (!list.length) {
      return empty('Your journal entries will be here, newest first.',
        'Write one on any protocol&rsquo;s page, before or after a session, or from a resource. It is kept with the protocol or resource it belongs to.',
        '<p><a class="sr-mr-btn" href="/dashboard.html">Choose a protocol</a></p>');
    }
    return '<ol class="sr-mr-list">' + list.map(function (e) {
      var p = protocolInfo(e.protocolId);
      return '<li class="sr-mr-item"><p class="sr-mr-meta"><span class="sr-mr-kind">' + (e.input === 'spoken' ? 'Spoken' : 'Written') + '</span> ' +
        esc(fmtDate(e.date)) + (p || e.protocol ? ' · ' + esc(p ? p.name : e.protocol) : '') +
        (e.resource ? ' · from ' + esc(e.resource) : '') + '</p>' +
        textOrEdit('journal', e.id, e.text, 'sr-mr-text') + '</li>';
    }).join('') + '</ol>';
  }

  /* ── Saved ── */
  function renderSaved() {
    var list = Source.saved();
    if (!list.length) {
      return empty('What you keep to come back to will be here.',
        'Save a protocol with the heart on its card in the dashboard library, and it appears here.',
        '<p><a class="sr-mr-btn" href="/dashboard.html">Go to the library</a></p>');
    }
    return '<ol class="sr-mr-list">' + list.map(function (s) {
      var p = s.type === 'protocol' ? protocolInfo(s.id) : null;
      var name = p ? p.name : (s.title || s.id);
      var href = p ? p.href : (s.href || '');
      return '<li class="sr-mr-item"><p class="sr-mr-meta"><span class="sr-mr-kind">' + cap(s.type) + '</span></p>' +
        (href ? '<a class="sr-mr-name sr-mr-savedlink" href="' + esc(href) + '">' + esc(name) + '</a>' : '<p class="sr-mr-name">' + esc(name) + '</p>') +
        '<p class="sr-mr-acts"><button type="button" class="sr-mr-link sr-mr-link--quiet" data-mr="unsave" data-type="' + esc(s.type) + '" data-id="' + esc(s.id) + '"' +
        (s.heart ? ' data-heart="' + esc(s.heart) + '"' : '') + '>Remove</button></p></li>';
    }).join('') + '</ol>';
  }

  function compose(kind, label, hint) {
    return '<div class="sr-mr-compose"><label class="sr-mr-label" for="sr-mr-new-' + kind + '">' + label + '</label>' +
      '<textarea class="sr-mr-edit" id="sr-mr-new-' + kind + '" placeholder="' + esc(hint) + '"></textarea>' +
      '<p class="sr-mr-acts"><button type="button" class="sr-mr-btn" data-mr="add" data-kind="' + kind + '">' + label + '</button></p></div>';
  }

  var RENDER = { sessions: renderSessions, chosen: renderChosen, decisions: renderDecisions, journal: renderJournal, saved: renderSaved };

  function paint() {
    TABS.forEach(function (t) {
      var btn = root.querySelector('[data-tabbtn="' + t + '"]'), panel = root.querySelector('[data-panel="' + t + '"]');
      var on = t === state.tab;
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
      btn.tabIndex = on ? 0 : -1;
      panel.hidden = !on;
      if (on) panel.innerHTML = RENDER[t]();
    });
    /* SR-484 · the banner rail names the same five tabs (L7); the open one is marked */
    Array.prototype.forEach.call(document.querySelectorAll('[data-mr-rail]'), function (r) {
      if (r.getAttribute('data-mr-rail') === state.tab) r.setAttribute('aria-current', 'true');
      else r.removeAttribute('aria-current');
    });
  }

  /* ═══ tabs: no page load; ?tab= in the address so Back restores it ═══ */
  function tabFromUrl() {
    var m = /[?&]tab=(sessions|chosen|decisions|journal|saved)\b/.exec(location.search);
    return m ? m[1] : 'sessions';
  }
  function go(tab, push) {
    if (TABS.indexOf(tab) < 0) tab = 'sessions';
    if (tab !== state.tab) { state.open = null; state.editing = null; }
    state.tab = tab;
    if (push) history.pushState({ tab: tab }, '', location.pathname + (tab === 'sessions' ? '' : '?tab=' + tab));
    paint();
  }

  function findUtt(recId, uttId, fn) {
    Write.svUpdate(recId, function (r) { arr(r.transcript).forEach(function (u) { if (u.id === uttId) fn(u, r); }); });
  }

  function onClick(e) {
    var b = e.target.closest('[data-mr]');
    if (!b || !root.contains(b)) return;
    var a = b.getAttribute('data-mr'), kind = b.getAttribute('data-kind'), id = b.getAttribute('data-id');
    if (a === 'tab') { go(b.getAttribute('data-tab'), true); var tb = root.querySelector('[data-tabbtn="' + state.tab + '"]'); if (tb) tb.focus(); return; }
    if (a === 'filter') { state.filter = b.getAttribute('data-f'); paint(); return; }
    if (a === 'open') { state.open = state.open === id ? null : id; state.editing = null; paint(); return; }
    if (a === 'edit') { state.editing = { kind: kind, id: id }; paint(); var ta = root.querySelector('#sr-mr-edit'); if (ta) ta.focus(); return; }
    if (a === 'edit-cancel') { state.editing = null; paint(); return; }
    if (a === 'edit-save') {
      var box = root.querySelector('#sr-mr-edit');
      var val = box ? box.value.replace(/\s+/g, ' ').trim() : '';
      var ed = state.editing;
      if (ed && val) saveEdit(ed.kind, ed.id, val);
      state.editing = null; paint(); return;
    }
    if (a === 'delete') {
      if (!global.confirm(kind === 'session' ? 'Delete this session? Its transcript and AI feedback go with it, and it cannot be undone.' : 'Delete this? It cannot be undone.')) return;
      remove(kind, id); if (kind === 'session') state.open = null; paint(); return;
    }
    if (a === 'unsave') { Write.unsave({ type: b.getAttribute('data-type'), id: id, heart: b.getAttribute('data-heart') }); paint(); return; }
    if (a === 'add') {
      var field = root.querySelector('#sr-mr-new-' + kind);
      var text = field ? field.value.trim() : '';
      if (!text) { if (field) field.focus(); return; }
      Write.listAdd(kind === 'chosenW' ? K.chosenWritten : K.decisionsWritten, { date: new Date().toISOString(), origin: 'Unprompted', text: text });
      paint(); return;
    }
  }

  function saveEdit(kind, id, val) {
    var parts = String(id).split('|');
    if (kind === 'utt') return findUtt(parts[0], parts[1], function (u) { u.text = val; u.edited = true; });
    if (kind === 'fb') return Write.svUpdate(parts[0], function (r) { arr(r.reading && r.reading.blocks).forEach(function (bl) { if (bl.id === parts[1]) { bl.text = val; bl.edited = true; } }); });
    if (kind === 'journal') return Write.listUpdate(K.journal, function (e) { return e.id === id; }, function (e) { e.text = val; e.edited = true; });
    if (kind === 'chosenW') return Write.listUpdate(K.chosenWritten, function (e) { return e.date === id; }, function (e) { e.text = val; });
    if (kind === 'decW') return Write.listUpdate(K.decisionsWritten, function (e) { return e.date === id; }, function (e) { e.text = val; });
  }
  function remove(kind, id) {
    var parts = String(id).split('|');
    if (kind === 'session') return Write.svRemove(id);
    if (kind === 'utt') return Write.svUpdate(parts[0], function (r) { r.transcript = arr(r.transcript).filter(function (u) { return u.id !== parts[1]; }); });
    /* a deleted AI feedback block stays deleted: its lens is remembered, as the
       Sovereign session itself does, so a late response can never restore it */
    if (kind === 'fb') return Write.svUpdate(parts[0], function (r) {
      if (!r.reading) return;
      r.reading.blocks = arr(r.reading.blocks).filter(function (bl) {
        if (bl.id === parts[1]) { (r.deletedLenses = arr(r.deletedLenses)).push(bl.lens); return false; }
        return true;
      });
    });
    if (kind === 'journal') return Write.listRemove(K.journal, function (e) { return e.id === id; });
    if (kind === 'chosenW') return Write.listRemove(K.chosenWritten, function (e) { return e.date === id; });
    if (kind === 'decW') return Write.listRemove(K.decisionsWritten, function (e) { return e.date === id; });
  }

  function onKey(e) {
    var t = e.target.closest('[data-tabbtn]');
    if (!t) return;
    var i = TABS.indexOf(t.getAttribute('data-tabbtn'));
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      var next = TABS[(i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length];
      go(next, true);
      root.querySelector('[data-tabbtn="' + next + '"]').focus();
    }
  }

  function mount(el) {
    root = el;
    root.addEventListener('click', function (e) {
      var tb = e.target.closest('[data-tabbtn]');
      if (tb) { go(tb.getAttribute('data-tabbtn'), true); return; }
      onClick(e);
    });
    root.addEventListener('keydown', onKey);
    /* SR-484 · a rail item selects its tab, the same as the tab row, then brings
       the tab row into view and moves focus to the tab it opened */
    document.addEventListener('click', function (e) {
      var r = e.target.closest('[data-mr-rail]');
      if (!r) return;
      go(r.getAttribute('data-mr-rail'), true);
      var tb = root.querySelector('[data-tabbtn="' + state.tab + '"]');
      if (tb) { tb.focus({ preventScroll: true }); tb.scrollIntoView({ block: 'nearest' }); }
    });
    global.addEventListener('popstate', function () { go(tabFromUrl(), false); });
    state.tab = tabFromUrl();
    history.replaceState({ tab: state.tab }, '', location.pathname + location.search + location.hash);
    paint();
  }

  global.SafeRiseRecords = { mount: mount, Source: Source, KEYS: K };
})(window, document);
