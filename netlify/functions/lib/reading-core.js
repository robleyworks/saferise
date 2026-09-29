/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — netlify/functions/lib/reading-core.js · SR-469 (SOV-4)
   The framework reading's server logic, as plain functions with no I/O of
   their own, so every branch can be unit-tested without a runtime
   (tests/sv-reading/). The Netlify handler (../sv-reading.mjs) is glue.

   Nothing here logs, stores or forwards content. The only thing ever sent to
   the model is what shapePayload() returns: phase-tagged transcript text and
   the two ratings. No name, email, member id or organisation.

   Loads as CommonJS (the function) and as a browser global (the tests). */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SRReadingCore = factory();
})(this, function () {
  'use strict';

  var PHASES = ['recognise', 'regulate', 'release', 'rise'];
  var LENSES = ['carried', 'body', 'shift', 'self', 'gap', 'measure'];

  var LIMITS = {
    maxEntries: 200,        // utterances per session
    maxEntryChars: 2000,
    maxTotalChars: 20000,
    sparseWords: 25,        // below this there is not enough to read: no model call
    maxBlocks: 6,
    maxBlockChars: 320,     // "one or two sentences"
    maxQuotes: 4,
    minQuoteChars: 4
  };

  /* Phrasing the specification rules out. A block containing any of these
     is dropped, not repaired. */
  var BANNED = [
    /\bit sounds like\b/i, /\bi notice\b/i, /\bperhaps you('| a)re\b/i, /\bthat must have been\b/i,
    /\bwell done\b/i, /\bcourage\b/i, /\bproud of you\b/i, /\bbrave\b/i,
    /\byou should\b/i, /\byou need to\b/i, /\btry to\b/i
  ];

  function isInt(n, lo, hi) { return typeof n === 'number' && Math.floor(n) === n && n >= lo && n <= hi; }

  /* A3 · the request carries exactly this and nothing else. */
  function shapePayload(body) {
    if (!body || typeof body !== 'object') return { error: 'payload' };
    if (!isInt(body.pre, 1, 10) || !isInt(body.post, 1, 10)) return { error: 'ratings' };
    if (!Array.isArray(body.transcript) || body.transcript.length > LIMITS.maxEntries) return { error: 'transcript' };
    var total = 0, transcript = [];
    for (var i = 0; i < body.transcript.length; i++) {
      var u = body.transcript[i];
      if (!u || PHASES.indexOf(u.phase) < 0 || typeof u.text !== 'string') return { error: 'transcript' };
      var text = u.text.replace(/\s+/g, ' ').trim();
      if (!text) continue;
      if (text.length > LIMITS.maxEntryChars) return { error: 'transcript' };
      total += text.length;
      if (total > LIMITS.maxTotalChars) return { error: 'transcript' };
      transcript.push({ phase: u.phase, text: text });
    }
    return { payload: { transcript: transcript, pre: body.pre, post: body.post } };
  }

  function wordCount(payload) {
    return payload.transcript.reduce(function (n, u) { return n + u.text.split(' ').filter(Boolean).length; }, 0);
  }
  function isSparse(payload) { return wordCount(payload) < LIMITS.sparseWords; }

  /* Verbatim, with only typography folded: whitespace runs, curly quotes and
     apostrophes. Case is kept. Nothing else is forgiven. */
  function norm(s) {
    return String(s).replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
  }

  /* B5 · validation before display. Every quote must appear verbatim in the
     transcript, and at least one in the phase the block claims as its source;
     any phrase the block's own text puts in double quotes must appear too.
     A block that fails is dropped — never repaired — and the reason kept. */
  function validateReading(raw, payload) {
    var data;
    try { data = typeof raw === 'string' ? JSON.parse(raw) : raw; } catch (e) { return { error: 'malformed' }; }
    if (!data || typeof data !== 'object' || !Array.isArray(data.reading) || !data.bridge || typeof data.bridge !== 'object') {
      return { error: 'malformed' };
    }
    var all = norm(payload.transcript.map(function (u) { return u.text; }).join(' \n '));
    var byPhase = {};
    PHASES.forEach(function (p) {
      byPhase[p] = norm(payload.transcript.filter(function (u) { return u.phase === p; }).map(function (u) { return u.text; }).join(' \n '));
    });
    var kept = [], dropped = [], seen = {};
    data.reading.forEach(function (b, i) {
      var why = null;
      if (!b || typeof b !== 'object') why = 'not an object';
      else if (LENSES.indexOf(b.lens) < 0) why = 'unknown lens';
      else if (seen[b.lens]) why = 'duplicate lens';
      else if (PHASES.indexOf(b.sourcePhase) < 0) why = 'unknown source phase';
      else if (typeof b.text !== 'string' || !norm(b.text) || b.text.length > LIMITS.maxBlockChars) why = 'text missing or too long';
      else if (!Array.isArray(b.quotes) || !b.quotes.length || b.quotes.length > LIMITS.maxQuotes) why = 'no quotes';
      else if (b.quotes.some(function (q) { return typeof q !== 'string' || norm(q).length < LIMITS.minQuoteChars; })) why = 'quote too short';
      else if (b.quotes.some(function (q) { return all.indexOf(norm(q)) < 0; })) why = 'quote not in transcript';
      else if (!b.quotes.some(function (q) { return byPhase[b.sourcePhase].indexOf(norm(q)) >= 0; })) why = 'no quote from its source phase';
      else if ((norm(b.text).match(/"([^"]{4,})"/g) || []).some(function (m) { return all.indexOf(m.slice(1, -1)) < 0; })) why = 'text quotes words not in transcript';
      else if (BANNED.some(function (re) { return re.test(b.text); })) why = 'phrasing the spec rules out';
      if (why) { dropped.push({ index: i, lens: b && b.lens, reason: why }); return; }
      seen[b.lens] = true;
      kept.push({ lens: b.lens, text: norm(b.text), quotes: b.quotes.map(norm), sourcePhase: b.sourcePhase });
    });
    kept.sort(function (a, b) { return LENSES.indexOf(a.lens) - LENSES.indexOf(b.lens); });
    if (kept.length > LIMITS.maxBlocks) {
      kept.slice(LIMITS.maxBlocks).forEach(function (b) { dropped.push({ lens: b.lens, reason: 'over the block limit' }); });
      kept = kept.slice(0, LIMITS.maxBlocks);
    }
    /* The bridge points at Addressing the Issue only if the member spoke in
       Release or Rise — the question it answers is asked there. */
    var spokeLate = byPhase.release.length > 0 || byPhase.rise.length > 0;
    var bridge = (data.bridge.shown === true && data.bridge.target === 'addressing-the-issue' && spokeLate)
      ? { shown: true, target: 'addressing-the-issue' } : { shown: false, target: null };
    return { reading: kept, bridge: bridge, dropped: dropped };
  }

  /* A4 · per-member allowance. record = { t: [epoch ms of each counted call] }.
     Pure: returns the new record; the caller persists it. */
  function checkAndCount(record, now, limits) {
    var DAY = 86400000;
    var t = (record && Array.isArray(record.t) ? record.t : []).filter(function (x) { return typeof x === 'number' && now - x < 30 * DAY; });
    var inDay = t.filter(function (x) { return now - x < DAY; }).length;
    if (inDay >= limits.perDay || t.length >= limits.per30Days) return { allowed: false, record: { t: t } };
    return { allowed: true, record: { t: t.concat([now]) } };
  }

  /* A5 · every failure maps to one of a few plain outcomes. Never a retry. */
  function classifyProviderFailure(f) {
    if (!f) return 'unavailable';
    if (f.kind) return f.kind;
    if (f.aborted) return 'timeout';
    if (f.status === 429) return 'provider_busy';
    if (f.status === 401 || f.status === 403 || f.status === 404) return 'config';
    if (f.status === 400) return 'config';
    if (f.status >= 500) return 'unavailable';
    return 'unavailable';
  }

  /* The whole server flow, with every dependency injected:
     deps = { verifyMember(token) -> Promise<id|null>, limitStore { get(key), set(key, value) },
              hashId(id) -> Promise<string>, callModel(payload) -> Promise<{ok, text}|{ok:false, status?, aborted?}>,
              now(), limits { perDay, per30Days } }
     Resolves to { status, body }. It never throws for an expected condition. */
  function runReading(deps, token, body) {
    var shaped = shapePayload(body);
    if (shaped.error) return Promise.resolve({ status: 400, body: { status: 'invalid' } });
    return Promise.resolve(token ? deps.verifyMember(token) : null).then(function (memberId) {
      if (!memberId) return { status: 401, body: { status: 'withheld', reason: 'signin' } };
      if (isSparse(shaped.payload)) return { status: 200, body: { status: 'sparse' } };
      return deps.hashId(memberId).then(function (key) {
        return Promise.resolve(deps.limitStore.get(key)).then(function (rec) {
          var c = checkAndCount(rec, deps.now(), deps.limits);
          if (!c.allowed) return { status: 429, body: { status: 'withheld', reason: 'limit' } };
          return Promise.resolve(deps.limitStore.set(key, c.record)).then(function () {
            return deps.callModel(shaped.payload).then(function (r) {
              if (!r || !r.ok) return { status: 200, body: { status: 'unavailable', reason: classifyProviderFailure(r) } };
              if (deps.onUsage && r.usage) { try { deps.onUsage(r.usage); } catch (e) {} }
              var v = validateReading(r.text, shaped.payload);
              if (v.error) return { status: 200, body: { status: 'unavailable', reason: 'malformed' } };
              return { status: 200, body: { status: 'ok', reading: v.reading, bridge: v.bridge, dropped: v.dropped.length } };
            }, function () { return { status: 200, body: { status: 'unavailable', reason: 'unavailable' } }; });
          });
        });
      });
    }).catch(function () { return { status: 200, body: { status: 'unavailable', reason: 'unavailable' } }; });
  }

  return {
    PHASES: PHASES, LENSES: LENSES, LIMITS: LIMITS,
    shapePayload: shapePayload, isSparse: isSparse, wordCount: wordCount, norm: norm,
    validateReading: validateReading, checkAndCount: checkAndCount,
    classifyProviderFailure: classifyProviderFailure, runReading: runReading
  };
});
