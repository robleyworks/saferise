/* SafeRise — tests/sv-reading/tests.js · SR-469 (SOV-4)
   Unit tests for the framework reading's server logic, run in a browser
   (tests/sv-reading/index.html) because this environment has no Node. The
   modules under test are the same files the Netlify function requires.
   Nothing here calls a real provider: fetch is stubbed. */
(function () {
  'use strict';
  var core = window.SRReadingCore, contract = window.SRReadingPrompt, provider = window.SRReadingProvider;
  var results = [];
  function ok(name, cond, detail) { results.push({ name: name, pass: !!cond, detail: detail }); }
  var FAKE_KEY = 'sk-test-DO-NOT-LEAK-0123456789';

  var T = [
    { phase: 'recognise', text: 'I should have said something in the meeting and the whole thing is a mess' },
    { phase: 'recognise', text: 'I keep thinking I should have said something' },
    { phase: 'regulate', text: 'It sits in my chest and now it has moved up to my throat' },
    { phase: 'release', text: 'It is really one conversation I keep putting off with my manager' },
    { phase: 'rise', text: 'I want to stop bracing before these meetings and I will get through Thursday. It is not as loud' }
  ];
  var BODY = { pre: 7, post: 3, transcript: T };

  var GOOD = {
    reading: [
      { lens: 'carried', text: 'You came back to "I should have said something" twice.', quotes: ['I should have said something'], sourcePhase: 'recognise' },
      { lens: 'body', text: 'You put it in your chest, then said it had "moved up to my throat".', quotes: ['It sits in my chest', 'moved up to my throat'], sourcePhase: 'regulate' },
      { lens: 'shift', text: 'At the start it was "the whole thing is a mess". Later it was "one conversation I keep putting off".', quotes: ['the whole thing is a mess', 'one conversation I keep putting off'], sourcePhase: 'release' },
      { lens: 'gap', text: 'You said you wanted "to stop bracing before these meetings". What you said you would do was "get through Thursday".', quotes: ['to stop bracing before these meetings', 'get through Thursday'], sourcePhase: 'rise' },
      { lens: 'measure', text: 'You started at seven and finished at three. The last thing you said was "It is not as loud".', quotes: ['It is not as loud'], sourcePhase: 'rise' }
    ],
    bridge: { shown: true, target: 'addressing-the-issue' }
  };

  // ── shapePayload (A3) ────────────────────────────────────────────────
  var s = core.shapePayload({ pre: 7, post: 3, transcript: T, name: 'Ann', email: 'a@b.c', memberId: 'u1', organisation: 'Org', audio: 'AAAA', limitOverride: true });
  ok('A3 payload carries only transcript, pre, post', s.payload && JSON.stringify(Object.keys(s.payload).sort()) === '["post","pre","transcript"]', s.payload && Object.keys(s.payload));
  ok('A3 utterances carry only phase and text', s.payload.transcript.every(function (u) { return JSON.stringify(Object.keys(u).sort()) === '["phase","text"]'; }));
  ok('A3 no identity survives shaping', !/Ann|a@b\.c|u1|Org|AAAA/.test(JSON.stringify(s.payload)));
  ok('A3 rejects bad ratings', core.shapePayload({ pre: 11, post: 3, transcript: T }).error === 'ratings');
  ok('A3 rejects an unknown phase', core.shapePayload({ pre: 7, post: 3, transcript: [{ phase: 'pre_state', text: 'seven' }] }).error === 'transcript');
  ok('A3 rejects an oversized transcript', core.shapePayload({ pre: 7, post: 3, transcript: [{ phase: 'rise', text: new Array(2002).join('x') }] }).error === 'transcript');
  ok('sparse: a few words is not enough to read', core.isSparse({ transcript: [{ phase: 'rise', text: 'not much today really' }] }));
  ok('sparse: the fixture is enough', !core.isSparse(s.payload));

  // ── validateReading (B5 / V4) ─────────────────────────────────────────
  var v = core.validateReading(JSON.stringify(GOOD), s.payload);
  ok('B5 a faithful reading keeps every block', v.reading.length === 5 && v.dropped.length === 0, v.dropped);
  ok('B5 bridge kept when release/rise was spoken', v.bridge.shown === true);
  var bad = JSON.parse(JSON.stringify(GOOD));
  bad.reading[2].quotes = ['the situation is hopeless'];               // invented quote
  bad.reading[3].text = 'You said "I hate my job" and then planned Thursday.';  // quotes words not in transcript
  bad.reading[1].sourcePhase = 'rise';                                  // misattributed phase
  bad.reading.push({ lens: 'self', text: 'It sounds like you are hard on yourself.', quotes: ['I should have said something'], sourcePhase: 'recognise' }); // banned phrasing
  bad.reading.push({ lens: 'carried', text: 'Again.', quotes: ['I should have said something'], sourcePhase: 'recognise' }); // duplicate lens
  var vb = core.validateReading(JSON.stringify(bad), s.payload);
  var reasons = vb.dropped.map(function (d) { return d.lens + ': ' + d.reason; });
  ok('V4 invented quote → block dropped', reasons.indexOf('shift: quote not in transcript') >= 0, reasons);
  ok('V4 text quoting words not said → block dropped', reasons.indexOf('gap: text quotes words not in transcript') >= 0, reasons);
  ok('V4 quote from the wrong phase → block dropped', reasons.indexOf('body: no quote from its source phase') >= 0, reasons);
  ok('V4 therapy-register phrasing → block dropped', reasons.indexOf('self: phrasing the spec rules out') >= 0, reasons);
  ok('V4 duplicate lens → dropped', reasons.indexOf('carried: duplicate lens') >= 0, reasons);
  ok('V4 dropped blocks are never shown', vb.reading.map(function (b) { return b.lens; }).join() === 'carried,measure', vb.reading.map(function (b) { return b.lens; }));
  ok('B5 malformed JSON → error, nothing shown', core.validateReading('{not json', s.payload).error === 'malformed');
  ok('B5 wrong shape → error', core.validateReading(JSON.stringify({ reading: 'x' }), s.payload).error === 'malformed');
  ok('B5 curly apostrophes fold, words do not', !core.validateReading(JSON.stringify({ reading: [{ lens: 'measure', text: 'x', quotes: ['It is not as loud'], sourcePhase: 'rise' }], bridge: { shown: false, target: null } }), s.payload).dropped.length);
  var early = core.shapePayload({ pre: 5, post: 5, transcript: [T[0], T[1], T[2]] }).payload;
  ok('bridge suppressed when nothing was said in Release or Rise', core.validateReading(JSON.stringify({ reading: [], bridge: { shown: true, target: 'addressing-the-issue' } }), early).bridge.shown === false);

  // ── checkAndCount (A4) ────────────────────────────────────────────────
  var L = { perDay: 4, per30Days: 40 }, now = Date.UTC(2026, 8, 29, 12), H = 3600000, D = 24 * H;
  var rec = null, allowed = 0;
  for (var i = 0; i < 6; i++) { var c = core.checkAndCount(rec, now + i * 60000, L); if (c.allowed) allowed++; rec = c.record; }
  ok('A4 four per rolling 24 h, the fifth refused', allowed === 4, allowed);
  ok('A4 allowed again after 24 h', core.checkAndCount(rec, now + D + H, L).allowed);
  var month = { t: [] }; for (i = 0; i < 40; i++) month.t.push(now - (i + 2) * D * 0.7);
  ok('A4 forty per rolling 30 days, the next refused', !core.checkAndCount(month, now, L).allowed);
  ok('A4 entries older than 30 days are pruned', core.checkAndCount({ t: [now - 31 * D] }, now, L).record.t.length === 1);

  // ── provider (A5) — stubbed fetch, real AbortController ──────────────
  function stubFetch(behaviour) {
    var calls = [];
    var f = function (url, init) {
      calls.push({ url: url, init: init });
      if (behaviour === 'network') return Promise.reject(new TypeError('network down'));
      if (behaviour === 'hang') return new Promise(function (res, rej) { init.signal.addEventListener('abort', function () { var e = new Error('aborted'); e.name = 'AbortError'; rej(e); }); });
      var status = typeof behaviour === 'number' ? behaviour : 200;
      var body = behaviour === 'badjson' ? '{nope' : behaviour === 'refusal' ? JSON.stringify({ stop_reason: 'refusal', content: [] }) :
        JSON.stringify({ stop_reason: 'end_turn', content: [{ type: 'text', text: JSON.stringify(GOOD) }], usage: { input_tokens: 900, output_tokens: 300 } });
      return Promise.resolve({ ok: status >= 200 && status < 300, status: status, json: function () { return Promise.resolve().then(function () { return JSON.parse(body); }); } });
    };
    f.calls = calls; return f;
  }
  var CFG = { style: 'anthropic', endpoint: 'https://api.example.test/', apiKey: FAKE_KEY, model: 'test-model', timeoutMs: 150 };
  function run(behaviour, cfg) { var f = stubFetch(behaviour); return provider.callModel(cfg || CFG, s.payload, { fetch: f, AbortController: AbortController, contract: contract }).then(function (r) { return { r: r, calls: f.calls }; }); }

  var providerTests = [
    run(200).then(function (x) {
      var req = x.calls[0], sent = JSON.parse(req.init.body);
      ok('provider: request goes to {endpoint}/v1/messages', req.url === 'https://api.example.test/v1/messages', req.url);
      ok('provider: key only in the x-api-key header', req.init.headers['x-api-key'] === FAKE_KEY && req.init.body.indexOf(FAKE_KEY) < 0);
      /* SR-479 · inference_geo joins the whitelist — a location pin, carrying no member data */
      ok('provider: body is model, max_tokens, system, messages, output_config, inference_geo only', JSON.stringify(Object.keys(sent).sort()) === '["inference_geo","max_tokens","messages","model","output_config","system"]', Object.keys(sent));
      ok('provider: processing pinned to the United States (inference_geo "us")', sent.inference_geo === 'us', sent.inference_geo);
      ok('provider: the member message holds only pre, post and transcript', JSON.stringify(Object.keys(JSON.parse(sent.messages[0].content.replace(/^[^\n]*\n/, ''))).sort()) === '["post","pre","transcript"]');
      ok('provider: success returns the text', x.r.ok && typeof x.r.text === 'string');
      ok('provider: exactly one call', x.calls.length === 1);
    }),
    run(429).then(function (x) { ok('A5 429 → provider_busy, one call, no retry', !x.r.ok && core.classifyProviderFailure(x.r) === 'provider_busy' && x.calls.length === 1); }),
    run(529).then(function (x) { ok('A5 529 overloaded → unavailable, no retry', !x.r.ok && core.classifyProviderFailure(x.r) === 'unavailable' && x.calls.length === 1); }),
    run(500).then(function (x) { ok('A5 500 → unavailable', core.classifyProviderFailure(x.r) === 'unavailable'); }),
    run(401).then(function (x) { ok('A5 401 → config (never shown the key)', core.classifyProviderFailure(x.r) === 'config' && JSON.stringify(x.r).indexOf(FAKE_KEY) < 0); }),
    run('network').then(function (x) { ok('A5 network error → unavailable', core.classifyProviderFailure(x.r) === 'unavailable'); }),
    run('hang').then(function (x) { ok('A5 timeout → aborted at the configured limit', core.classifyProviderFailure(x.r) === 'timeout' && x.calls.length === 1); }),
    run('badjson').then(function (x) { ok('A5 unparseable provider body → malformed', core.classifyProviderFailure(x.r) === 'malformed'); }),
    run('refusal').then(function (x) { ok('A5 refusal → malformed (no reading), not a retry', !x.r.ok && x.calls.length === 1); }),
    run(200, { style: 'anthropic', endpoint: '', apiKey: FAKE_KEY, model: 'm' }).then(function (x) { ok('A5 missing config → no call at all', x.calls.length === 0 && x.r.kind === 'config'); })
  ];

  // ── runReading: the whole server flow (A1, A4, A5, B5, V6) ────────────
  function flowDeps(opts) {
    var store = {}, modelCalls = 0;
    var d = {
      verifyMember: function (tok) { return Promise.resolve(tok === 'good-token' ? 'member-1' : null); },
      hashId: function (id) { return Promise.resolve('h:' + id); },
      limitStore: { get: function (k) { return store[k] || null; }, set: function (k, v) { store[k] = v; } },
      callModel: function () { modelCalls++; return Promise.resolve(opts && opts.model ? opts.model() : { ok: true, text: JSON.stringify(GOOD) }); },
      now: function () { return now; },
      limits: { perDay: 4, per30Days: 40 }
    };
    d.count = function () { return modelCalls; }; d.store = store;
    return d;
  }
  var flowTests = [
    (function () { var d = flowDeps(); return core.runReading(d, null, BODY).then(function (o) { ok('signed out → withheld, no model call', o.status === 401 && o.body.status === 'withheld' && d.count() === 0); }); })(),
    (function () { var d = flowDeps(); return core.runReading(d, 'forged-token', BODY).then(function (o) { ok('forged token → withheld, no model call', o.status === 401 && d.count() === 0); }); })(),
    (function () { var d = flowDeps(); return core.runReading(d, 'good-token', { pre: 7, post: 3, transcript: [{ phase: 'rise', text: 'fine thanks' }] }).then(function (o) { ok('sparse → "sparse", no model call, not counted', o.body.status === 'sparse' && d.count() === 0 && !d.store['h:member-1']); }); })(),
    (function () { var d = flowDeps(); return core.runReading(d, 'good-token', BODY).then(function (o) { ok('success → ok with validated blocks', o.body.status === 'ok' && o.body.reading.length === 5 && o.body.dropped === 0); ok('A1 key never in a response', JSON.stringify(o).indexOf(FAKE_KEY) < 0); }); })(),
    (function () {
      var d = flowDeps(), seq = Promise.resolve(), outs = [];
      for (var k = 0; k < 6; k++) seq = seq.then(function () { return core.runReading(d, 'good-token', Object.assign({ limitOverride: true, perDay: 999, memberId: 'someone-else' }, BODY)).then(function (o) { outs.push(o); }); });
      return seq.then(function () {
        ok('V6 fifth and sixth refused server-side (429 withheld)', outs[4].status === 429 && outs[5].status === 429 && outs[4].body.reason === 'limit');
        ok('V6 client fields cannot lift the limit or change who is counted', d.count() === 4 && Object.keys(d.store).join() === 'h:member-1');
      });
    })(),
    (function () { var d = flowDeps({ model: function () { return { ok: false, status: 529 }; } }); return core.runReading(d, 'good-token', BODY).then(function (o) { ok('V7 provider down → "unavailable", plain status 200, one call', o.body.status === 'unavailable' && o.status === 200 && d.count() === 1); }); })(),
    (function () { var d = flowDeps({ model: function () { return { ok: false, aborted: true }; } }); return core.runReading(d, 'good-token', BODY).then(function (o) { ok('V7 timeout → "unavailable" (timeout)', o.body.status === 'unavailable' && o.body.reason === 'timeout'); }); })(),
    (function () { var d = flowDeps({ model: function () { return { ok: true, text: 'not json at all' }; } }); return core.runReading(d, 'good-token', BODY).then(function (o) { ok('malformed model output → "unavailable" (malformed)', o.body.reason === 'malformed'); }); })(),
    (function () { var d = flowDeps({ model: function () { return { ok: true, text: JSON.stringify(bad) }; } }); return core.runReading(d, 'good-token', BODY).then(function (o) { ok('V4 end to end: forced bad response → bad blocks dropped before the client sees them', o.body.status === 'ok' && o.body.dropped === 5 && o.body.reading.every(function (b) { return ['carried', 'measure'].indexOf(b.lens) >= 0; }), o.body); }); })(),
    (function () { var d = flowDeps({ model: function () { throw new Error('boom'); } }); return core.runReading(d, 'good-token', BODY).then(function (o) { ok('an exception anywhere → "unavailable", never a crash', o.body.status === 'unavailable'); }); })(),
    (function () { var d = flowDeps(); return core.runReading(d, 'good-token', { pre: 'x' }).then(function (o) { ok('invalid body → 400, no model call', o.status === 400 && d.count() === 0); }); })()
  ];

  window.SV_READING_TESTS = Promise.all(providerTests.concat(flowTests)).then(function () {
    var failed = results.filter(function (r) { return !r.pass; });
    var out = document.getElementById('out');
    if (out) out.textContent = results.map(function (r) { return (r.pass ? 'PASS  ' : 'FAIL  ') + r.name + (r.pass ? '' : '  ' + JSON.stringify(r.detail)); }).join('\n') + '\n\n' + (results.length - failed.length) + '/' + results.length + ' passed';
    return { total: results.length, passed: results.length - failed.length, failed: failed };
  });
})();
