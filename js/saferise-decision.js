/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-decision.js · SR-373
   (PASS-resource-list-and-reflection.md §6) · The Decision, made interactive.

   content/t1|t2|t3-resources.js already carries a real, protocol-specific
   "-decision" body for all 30 protocols — confirmed byte-identical (after
   escape-decoding) to pass/quarantine/the-decision-recovered.js, which is
   NOT imported here or anywhere (§6c: the live copy already matches it, so
   there is nothing to recover). Every one of those 30 bodies was authored
   to one of exactly two fixed templates:

     FULL  (23 protocols) — 7 <h5> sections, 9 write-in prompts, matching
           pass/mock-decision-reader-v2.html's own field set exactly
           (running, protecting, cost1, cost2, attend, does1, does2,
           does3, during).
     SHORT (7 protocols, the grief/shutdown/rumination-style "this one
           asks very little" pages) — 4 <h5> sections, 2 prompts
           (line, during).

   splitFull()/splitShort() below cut each body at fixed anchor strings —
   the literal connective sentences every protocol in a family shares
   ("Does that sound like yours?", "Three. Yours.", "Write yours." …) —
   verified against all 30 live bodies before this was written. The prose
   between those anchors is each protocol's own, untouched, unrewritten;
   only a write-in field is inserted at each anchor. The mockup's own body
   copy was a proposed REWRITE the mockup's own banner asked to be diffed
   before anything landed — it is not reused here. What IS taken from the
   mockup, carried across verbatim per instruction, is the ask/helper
   question text (FIELDS.full below) and the interaction design: one ask
   box per prompt, autosave-as-typed, a composed "Your version" at the end.
   SHORT's own two questions are lifted verbatim from each body's own
   blockquote instead, since the mockup never designed a short form.

   Storage matches protocol.html's own journal Store exactly — same write
   probe, same in-memory fallback for private browsing — under its own key,
   'sr.decision.' + protocolId ('t1-p01' etc, the same id
   js/saferise-access.js already gates on). Not sr.journal.entries: that
   key is an append-only log of dated session notes, a different shape
   from one persistent per-protocol record with named fields. */
(function (global) {
  'use strict';

  var Store = (function () {
    var mem = {}, ok = false;
    try { var k = 'sr.probe'; window.localStorage.setItem(k, '1'); window.localStorage.removeItem(k); ok = true; }
    catch (e) { ok = false; }
    return {
      persistent: ok,
      get: function (key, fallback) {
        try {
          var raw = ok ? window.localStorage.getItem(key) : mem[key];
          return raw ? JSON.parse(raw) : fallback;
        } catch (e) { return fallback; }
      },
      set: function (key, val) {
        var raw = JSON.stringify(val);
        try { if (ok) window.localStorage.setItem(key, raw); else mem[key] = raw; }
        catch (e) { mem[key] = raw; }
      }
    };
  })();

  /* ── Anchors ─────────────────────────────────────────────────────────── */
  var FULL_A = {
    running:    "Does that sound like yours? If the wording's off, change it. It should read like your own head, not like something written about you.</p>",
    protecting: "Yours may be different. Write the one that's actually true.</p>",
    costHead:   "<h5>What it should be attending to instead</h5>",
    attend:     "Yours, in your words.</p>",
    does:       "Three. Yours.</p>",
    during:     "Write yours.</p>",
    close:      "<h5>Read it back tomorrow</h5>"
  };
  var SHORT_A = {
    line:  "Yours, if you've got one. If you haven't, leave it and come back — this one keeps.</p>",
    close: "<h5>Come back to it</h5>"
  };

  function classify(body) {
    if (body.indexOf(FULL_A.running) > -1 && body.indexOf(FULL_A.close) > -1) return 'full';
    if (body.indexOf(SHORT_A.line) > -1 && body.indexOf(SHORT_A.close) > -1) return 'short';
    return null;
  }

  function splitFull(body) {
    var iRunning = body.indexOf(FULL_A.running) + FULL_A.running.length;
    var iProtect = body.indexOf(FULL_A.protecting, iRunning) + FULL_A.protecting.length;
    var iCostH   = body.indexOf(FULL_A.costHead, iProtect);
    var iAttend  = body.indexOf(FULL_A.attend, iCostH) + FULL_A.attend.length;
    var iDoes    = body.indexOf(FULL_A.does, iAttend) + FULL_A.does.length;
    var iDuring  = body.indexOf(FULL_A.during, iDoes) + FULL_A.during.length;
    var iClose   = body.indexOf(FULL_A.close, iDuring);
    return [
      { html: body.slice(0, iRunning) },
      { field: 'running' },
      { html: body.slice(iRunning, iProtect) },
      { field: 'protecting' },
      { html: body.slice(iProtect, iCostH) },
      { field: 'cost' },
      { html: body.slice(iCostH, iAttend) },
      { field: 'attend' },
      { html: body.slice(iAttend, iDoes) },
      { field: 'does' },
      { html: body.slice(iDoes, iDuring) },
      { field: 'during' },
      { html: body.slice(iDuring, iClose) },
      { close: body.slice(iClose) }
    ];
  }

  function splitShort(body) {
    var iLine  = body.indexOf(SHORT_A.line) + SHORT_A.line.length;
    var iClose = body.indexOf(SHORT_A.close, iLine);
    return [
      { html: body.slice(0, iLine) },
      { field: 'line' },
      { html: body.slice(iLine, iClose) },
      { field: 'during' },
      { close: body.slice(iClose) }
    ];
  }

  /* ── Field copy — askq/askh carried verbatim from
     pass/mock-decision-reader-v2.html (FULL) where it applies to every
     protocol; SHORT's own two questions are lifted verbatim from each
     body's own blockquote text instead, since the mockup only designed
     the full nine-field form. 'attend' drops the mockup's own worked
     example sentence ("Something like: pay attention to what I'm
     building…") — that line was written for t1-01/Anxiety Reset
     specifically and does not generalise; the rest of its helper text
     is unchanged. */
  var FIELDS = {
    full: {
      running:    { ask: "Does that sound like yours?", help: "If those aren't your words, change them. This should sound like your own head — not like something someone else wrote about you." },
      protecting: { ask: "What's yours?", help: "One line. Go for the one that's actually true rather than the one that sounds better. Nobody else reads this.", placeholder: "One line is enough.", short: true },
      cost1:      { ask: "What has it cost you?", help: "Two. That's the whole thing.", placeholder: "One.", trio: true },
      cost2:      { placeholder: "Two.", trio: true },
      attend:     { ask: "So where should it point instead?", help: "Not a feeling — something real. The work, the person, the thing you'd be getting on with if you weren't checking. Write it as an instruction, the same way the old one is written. Your words." },
      does1:      { ask: "On an ordinary day, what do they do?", help: "Three. Keep them small.", placeholder: "One.", trio: true },
      does2:      { placeholder: "Two.", trio: true },
      does3:      { placeholder: "Three.", trio: true },
      during:     { ask: "What do they do in the middle of it?", help: "While it's happening. Not after. One thing you could actually manage on a bad day is worth more here than something impressive." }
    },
    short: {
      line:   { ask: "What should it be doing instead?", help: "One line is enough. If you've got one, write it. If you haven't, leave it and come back — this one keeps." },
      during: { ask: "What do they do, in the middle of one?", help: "One thing. While it's happening, not after." }
    }
  };
  var FIELD_GROUPS = {
    full: [['running'], ['protecting'], ['cost1', 'cost2'], ['attend'], ['does1', 'does2', 'does3'], ['during']],
    short: [['line'], ['during']]
  };

  function esc(s) { return (s || '').replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }

  function slot(data, key, ghost) {
    var v = (data[key] || '').trim();
    return v ? '<span class="sr-dc-mine">' + esc(v) + '</span>' : '<span class="sr-dc-ghost">' + ghost + '</span>';
  }

  function composeFull(data) {
    var costs = [data.cost1, data.cost2].filter(function (x) { return (x || '').trim(); });
    var does = [data.does1, data.does2, data.does3].filter(function (x) { return (x || '').trim(); });
    return '<p>What I do now: ' + slot(data, 'running', 'the rule you have been following') + '</p>'
      + '<p>What it keeps me safe from: ' + slot(data, 'protecting', 'the thing underneath it') + '</p>'
      + '<p>What it has cost me: ' + (costs.length ? '<span class="sr-dc-mine">' + costs.map(esc).join(', and ') + '</span>' : '<span class="sr-dc-ghost">two things</span>') + '</p>'
      + '<p>Where I want my attention instead: ' + slot(data, 'attend', 'the new instruction') + '</p>'
      + '<p>On an ordinary day, I ' + (does.length ? '<span class="sr-dc-mine">' + does.map(esc).join('; ') + '</span>' : '<span class="sr-dc-ghost">do three small things</span>') + '.</p>'
      + '<p>And in the middle of a hard one, I ' + slot(data, 'during', 'stay in it') + '.</p>';
  }
  function composeShort(data) {
    return '<p>What it should be doing instead: ' + slot(data, 'line', 'one line') + '</p>'
      + '<p>In the middle of it, I ' + slot(data, 'during', 'stay in it') + '.</p>';
  }

  function plainFull(data, protocolId) {
    var costs = [data.cost1, data.cost2].filter(function (x) { return (x || '').trim(); });
    var does = [data.does1, data.does2, data.does3].filter(function (x) { return (x || '').trim(); });
    return ['The Decision — ' + protocolId, '',
      'What I do now:', data.running || '—', '',
      'What it keeps me safe from:', data.protecting || '—', '',
      'What it has cost me:', costs.length ? costs.join('\n') : '—', '',
      'Where I want my attention instead:', data.attend || '—', '',
      'What that version of me does:', does.length ? does.join('\n') : '—', '',
      'In the middle of a hard one, I:', data.during || '—', ''
    ].join('\n');
  }
  function plainShort(data, protocolId) {
    return ['The Decision — ' + protocolId, '',
      'What it should be doing instead:', data.line || '—', '',
      'In the middle of it, I:', data.during || '—', ''
    ].join('\n');
  }

  /* render(container, record, protocolId) — replaces container's content
     with the interactive form when record.body matches one of the two
     known templates, or falls back to plain read-only body HTML
     (today's behaviour) when it does not, rather than breaking. */
  function render(container, record, protocolId) {
    var family = classify(record.body || '');
    if (!family) { container.innerHTML = record.body || ''; return; }

    var chunks = family === 'full' ? splitFull(record.body) : splitShort(record.body);
    var fieldCopy = FIELDS[family];
    var groups = FIELD_GROUPS[family];
    var storageKey = 'sr.decision.' + protocolId;
    var data = Store.get(storageKey, {});

    var html = '<div class="sr-dc-root">';
    var uid = 0;
    chunks.forEach(function (c) {
      if (c.html !== undefined) { html += c.html; return; }
      if (c.close !== undefined) { html += c.close; return; }
      var keys = c.field === 'cost' ? ['cost1', 'cost2'] : c.field === 'does' ? ['does1', 'does2', 'does3'] : [c.field];
      var lead = fieldCopy[keys[0]];
      html += '<div class="sr-dc-ask' + (keys.length > 1 ? ' sr-dc-trio' : '') + '">'
        + '<p class="sr-dc-askq" id="sr-dc-q-' + keys[0] + '">' + esc(lead.ask) + '</p>'
        + '<p class="sr-dc-askh" id="sr-dc-h-' + keys[0] + '">' + esc(lead.help) + '</p>';
      keys.forEach(function (k) {
        uid++;
        var fc = fieldCopy[k] || {};
        html += '<div class="sr-dc-field">'
          + '<label class="sr-visually-hidden" for="sr-dc-f-' + k + '">' + esc(lead.ask) + (keys.length > 1 ? ' (' + (keys.indexOf(k) + 1) + ' of ' + keys.length + ')' : '') + '</label>'
          + '<textarea id="sr-dc-f-' + k + '" data-k="' + k + '" aria-describedby="sr-dc-h-' + keys[0] + '"'
          + (fc.short ? ' style="min-height:72px"' : fc.trio ? ' style="min-height:60px"' : '')
          + (fc.placeholder ? ' placeholder="' + esc(fc.placeholder) + '"' : '') + '></textarea>'
          + '</div>';
      });
      html += '<div class="sr-dc-state"><span class="sr-dc-saved" data-saved-for="' + keys.join(',') + '" aria-live="polite">Saved on this device</span></div>'
        + '</div>';
    });

    html += '<section class="sr-dc-assembly" id="sr-dc-assembly">'
      + '<h2 class="sr-dc-assemblyh">Your version</h2>'
      + '<p class="sr-dc-cap">This is what you’ve written, put together in one place. It fills in as you go, and it’s here whenever you come back.</p>'
      + '<div class="sr-dc-compose" id="sr-dc-compose"></div>'
      + '<div class="sr-dc-acts">'
      + '<button type="button" class="sr-dc-tool" id="sr-dc-save">↓ Save a copy</button>'
      + '<button type="button" class="sr-dc-tool" id="sr-dc-copy">⌑ Copy the text</button>'
      + '<button type="button" class="sr-dc-tool sr-dc-ghosttool" id="sr-dc-clear">× Start over</button>'
      + '</div></section>'
      + '<p class="sr-dc-privacy">What you write here stays on this device. It never reaches SafeRise’s servers, which means nobody here can read it — and also that it can’t be recovered if this device is lost, or if you clear your browser. Save a copy of your own if you want one kept anywhere else.</p>'
      + '</div>';

    container.innerHTML = html;

    var areas = [].slice.call(container.querySelectorAll('textarea[data-k]'));
    var composeEl = container.querySelector('#sr-dc-compose');
    var compose = family === 'full' ? composeFull : composeShort;
    var plain = family === 'full' ? plainFull : plainShort;

    function autosize(t) { t.style.height = 'auto'; t.style.height = Math.max(t.scrollHeight + 2, 40) + 'px'; }

    var timers = {};
    function flag(k) {
      var s = container.querySelector('.sr-dc-saved[data-saved-for~="' + k + '"]');
      if (!s) return;
      s.classList.add('sr-dc-on');
      clearTimeout(timers[k]);
      timers[k] = setTimeout(function () { s.classList.remove('sr-dc-on'); }, 1400);
    }

    areas.forEach(function (t) {
      var k = t.dataset.k;
      if (data[k]) t.value = data[k];
      autosize(t);
      t.addEventListener('input', function () {
        autosize(t);
        data[k] = t.value;
        data._at = Date.now();
        Store.set(storageKey, data);
        flag(k);
        composeEl.innerHTML = compose(data);
      });
    });

    composeEl.innerHTML = compose(data);

    var saveBtn = container.querySelector('#sr-dc-save');
    var copyBtn = container.querySelector('#sr-dc-copy');
    var clearBtn = container.querySelector('#sr-dc-clear');
    if (saveBtn) saveBtn.addEventListener('click', function () {
      var b = new Blob([plain(data, protocolId)], { type: 'text/plain' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.download = 'the-decision-' + protocolId + '.txt';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    });
    if (copyBtn) copyBtn.addEventListener('click', function () {
      var orig = copyBtn.textContent;
      navigator.clipboard.writeText(plain(data, protocolId)).then(function () {
        copyBtn.textContent = '✓ Copied';
        setTimeout(function () { copyBtn.textContent = orig; }, 1400);
      });
    });
    if (clearBtn) clearBtn.addEventListener('click', function () {
      if (!window.confirm('Clear everything you’ve written here? You cannot undo this.')) return;
      data = {};
      Store.set(storageKey, data);
      areas.forEach(function (t) { t.value = ''; autosize(t); });
      composeEl.innerHTML = compose(data);
    });
  }

  global.SafeRiseDecision = { render: render, classify: classify };
})(window);
