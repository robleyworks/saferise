/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-sovereign.js · SR-462 (SOV-2), SR-463 (SOV-3)
   The Sovereign player shell and its state machine, on protocol.html.

   OFF BY DEFAULT. With the flag off this file defines window.SafeRiseSovereign
   (pure functions, no DOM) and returns: no toggle, no listeners, no
   getUserMedia. The flag is window.SR_FLAGS.sovereign === true, defined false
   in js/saferise-flags.js (SR-464 A3), which protocol.html loads first, so off
   everywhere. On a local development host only (localhost, 127.0.0.1,
   *.localhost, *.test) ?sovereign=1 turns it on for testing and remembers it
   under sr.sv.enabled; ?sovereign=0 forgets it. Neither works on any other
   host.

   THE MACHINE. Seven states, strictly in order, advanced only by a member's
   own click — there is no timer anywhere in this file, so nothing can
   auto-advance:

     PRE_STATE → RECOGNISE → REGULATE → RELEASE → RISE → POST_STATE → SYNTHESIS

   INVITE and PERMISSION sit in front of the machine. PERMISSION renders
   once ever (sr.sv.micIntroSeen), so a second session goes INVITE → PRE_STATE.
   getUserMedia is never called before PERMISSION has been shown and accepted.
   SR-463 adds MODEL (the one-time speech-model download, shown only when the
   model is not cached) between the microphone and PRE_STATE, and FAIL, which
   every unrecoverable condition ends on: told plainly, offered guided.

   TRANSCRIPTION (SR-463). js/saferise-sovereign-stt.js runs speech-to-text
   on the device during the four phases. It can report text, input level and
   voice on/off to this file; it has no handle on the machine. Silence never
   advances, ends or changes anything here — only a member's click does.

   WRITE ORDER (binding). preState is written when the member leaves
   PRE_STATE, before RECOGNISE exists. postState is written when the member
   closes the session, before SYNTHESIS renders. No synthesis is generated in
   this pass at all — SYNTHESIS is the settling screen and nothing else.

   STORE. js/saferise-decision.js keeps its Store inside its own closure and
   never exports it (checked, SR-462), and that file is owned by another
   session. So this file carries a local adapter of the identical shape —
   same write probe, same silent in-memory fallback. createMachine() takes
   any object with get/set, which is how the verification drives it with a
   recording fake rather than a spy on localStorage (a spy proves nothing
   when the fallback is silently in play).

   NOT HERE: any hosted speech service (never), AI synthesis, Supabase
   writes, record editing, entitlement checks. */
(function (global) {
  'use strict';

  var SELF_SRC = document.currentScript && document.currentScript.src;
  var STATES = ['PRE_STATE', 'RECOGNISE', 'REGULATE', 'RELEASE', 'RISE', 'POST_STATE', 'SYNTHESIS'];
  var PHASES = ['RECOGNISE', 'REGULATE', 'RELEASE', 'RISE'];
  var KEYS = {
    enabled: 'sr.sv.enabled',
    micIntroSeen: 'sr.sv.micIntroSeen',
    session: 'sr.sv.session',
    soundbed: 'sr.sv.soundbed'
  };

  var LocalStore = (function () {
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

  /* ── The machine — no DOM, no timers ───────────────────────────────────── */
  function createMachine(store, ctx) {
    ctx = ctx || {};
    var i = 0, pre = null, post = null;

    function state() { return STATES[i]; }
    function must(s) { if (STATES[i] !== s) throw new Error('sovereign: ' + s + ' expected, in ' + STATES[i]); }
    function valid(n) { return typeof n === 'number' && n >= 1 && n <= 10 && Math.floor(n) === n; }

    return {
      state: state,
      preState: function () { return pre; },
      postState: function () { return post; },
      choosePre: function (n) { must('PRE_STATE'); if (valid(n)) pre = n; },
      /* PRE_STATE → RECOGNISE. preState is on the record before RECOGNISE. */
      begin: function () {
        must('PRE_STATE');
        if (!valid(pre)) return false;
        store.set(KEYS.session, {
          protocolId: ctx.protocolId || null,
          trackId: ctx.trackId || null,
          startedAt: new Date().toISOString(),
          preState: { activation: pre },
          transcript: []
        });
        i++;
        return true;
      },
      /* "You can correct this at any point during the session." */
      correctPre: function (n) {
        if (i === 0 || i > 5 || !valid(n)) return;
        pre = n;
        var s = store.get(KEYS.session, null) || {};
        s.preState = { activation: n, corrected: true };
        store.set(KEYS.session, s);
      },
      /* RECOGNISE → REGULATE → RELEASE → RISE → POST_STATE, one step a click. */
      next: function () {
        if (i < 1 || i > 4) throw new Error('sovereign: next() outside the four phases, in ' + STATES[i]);
        i++;
      },
      /* Record-only writes. Neither moves the machine. A chunk can resolve
         after RISE → POST_STATE, so both are accepted up to POST_STATE, and
         the phase is passed in rather than read from the current state. */
      appendTranscript: function (phase, text) {
        if (i < 1 || i > 5 || PHASES.indexOf(phase) < 0 || !text) return;
        var s = store.get(KEYS.session, null) || {};
        (s.transcript = s.transcript || []).push({ phase: phase.toLowerCase(), text: text, at: new Date().toISOString() });
        store.set(KEYS.session, s);
      },
      setTranscriptStatus: function (status) {
        if (i < 1 || i > 5) return;
        var s = store.get(KEYS.session, null) || {};
        s.transcriptStatus = status;
        store.set(KEYS.session, s);
      },
      choosePost: function (n) { must('POST_STATE'); if (valid(n)) post = n; },
      /* POST_STATE → SYNTHESIS. postState is on the record before SYNTHESIS. */
      close: function () {
        must('POST_STATE');
        if (!valid(post)) return false;
        var s = store.get(KEYS.session, null) || {};
        s.postState = { activation: post };
        s.closedAt = new Date().toISOString();
        store.set(KEYS.session, s);
        i++;
        return true;
      },
      discard: function () { store.set(KEYS.session, null); }
    };
  }

  global.SafeRiseSovereign = { STATES: STATES, PHASES: PHASES, KEYS: KEYS, createMachine: createMachine };

  /* ── Flag ──────────────────────────────────────────────────────────────── */
  var flagOn = !!(global.SR_FLAGS && global.SR_FLAGS.sovereign === true);
  var devHost = /^(localhost|127\.0\.0\.1|\[::1\])$|\.(localhost|test)$/.test(location.hostname);
  if (!flagOn && devHost) {
    var q = /[?&]sovereign=([01])/.exec(location.search);
    if (q) LocalStore.set(KEYS.enabled, q[1] === '1');
    flagOn = LocalStore.get(KEYS.enabled, false) === true;
  }
  if (!flagOn) return;

  var root = document.getElementById('sr-sv-root');
  var guided = document.getElementById('pane-listen');
  var player = document.querySelector('.player');
  if (!root || !guided || !player) return;

  /* ── Copy ──────────────────────────────────────────────────────────────── */
  /* Main and deeper prompts per phase. Keep going reveals the next deeper
     prompt, one at a time, never all at once; when they run out it offers
     the soft-maximum line instead of moving on. */
  var PROMPTS = {
    RECOGNISE: { lead: '', main: 'What is present right now?',
      deeper: ['Where do you notice it in the body?', 'What emotion seems closest to it?',
               'What thoughts are moving with it?', 'What does this seem to mean to you?'] },
    REGULATE: { lead: 'You’ve noticed what is here. Let’s give your system somewhere to settle.',
      main: 'Where are you carrying this most strongly?',
      deeper: ['Let the out-breath be a little longer than the in-breath.',
               'What changes when you stop trying to solve it for a moment?',
               'What would help your system feel a little more supported here?'] },
    RELEASE: { lead: 'You don’t have to carry every part of what you found forward.',
      main: 'What are you ready to put down?',
      deeper: ['Is there something you’ve been judging yourself for carrying?',
               'What belongs to this circumstance, and what no longer needs to belong to you?',
               'Is there something here that still needs a decision, conversation or action rather than release?'] },
    RISE: { lead: '', main: 'Who are you choosing to be from here?',
      deeper: ['What do you know now?', 'What are you choosing?', 'What do you want to carry forward?',
               'If there is an “I AM” statement here, speak it.', 'Is there a next action?'] }
  };
  var SOFT_MAX = 'Stay here if there is more. When you’re ready, we can move forward.';

  var ICON = {
    voice: '<path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2"/>',
    record: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    dot: '<circle cx="12" cy="12" r="4"/>'
  };
  function svg(name, size) {
    return '<svg class="sr-sv-ico" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" aria-hidden="true">' + ICON[name] + '</svg>';
  }

  /* ── Soundbed · generated, no file, no track name, no duration ─────────── */
  var Soundbed = (function () {
    var ac = null, gain = null, src = null, want = LocalStore.get(KEYS.soundbed, false) === true, live = false;
    function build() {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      ac = new AC();
      var len = ac.sampleRate * 4, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0), last = 0;
      for (var n = 0; n < len; n++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[n] = last * 3.2; }
      src = ac.createBufferSource(); src.buffer = buf; src.loop = true;
      var lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420;
      gain = ac.createGain(); gain.gain.value = 0;
      src.connect(lp); lp.connect(gain); gain.connect(ac.destination);
      src.start();
      return true;
    }
    function fade(to) { if (gain) { gain.gain.cancelScheduledValues(ac.currentTime); gain.gain.setTargetAtTime(to, ac.currentTime, 0.6); } }
    return {
      on: function () { return want; },
      toggle: function () { want = !want; LocalStore.set(KEYS.soundbed, want); if (want) this.resume(); else this.pause(); return want; },
      resume: function () {
        if (!want) return;
        if (!ac && !build()) return;
        if (ac.state === 'suspended') ac.resume();
        if (!live) { gain.gain.value = 0; fade(0.09); }
        live = true;
      },
      pause: function () { if (ac && live) { live = false; ac.suspend(); } }
    };
  })();

  /* ── Voice prompts (SR-464 B2) ─────────────────────────────────────────
     sv-prestate asks the opening rating question, sv-poststate the closing
     one. Each plays once per session, when its screen first opens, and
     never automatically again; the screen carries one replay control.
     Nothing is fetched until the member presses Begin Sovereign session,
     when both elements are primed inside that click so the later, async
     play() is allowed. A failed play() changes nothing: the screen works
     exactly as it does without a voice. Paths resolve from this script's
     own URL, not the page's, so they hold under the /protocols/{slug}
     rewrite. */
  var Voice = (function () {
    var files = { pre: 'sv-prestate.mp3', post: 'sv-poststate.mp3' };
    var els = {}, played = {}, playing = null, listeners = [];
    function changed() { listeners.forEach(function (f) { f(playing); }); }
    function el(k) {
      if (!els[k]) {
        var a = new Audio();
        a.preload = 'auto';
        a.src = new URL('../assets/audio/sovereign/' + files[k], SELF_SRC || location.href).href;
        var done = function () { if (playing === k) { playing = null; changed(); } };
        a.addEventListener('ended', done);
        a.addEventListener('error', done);
        els[k] = a;
      }
      return els[k];
    }
    return {
      prime: function () {
        Object.keys(files).forEach(function (k) {
          var a = el(k);
          if (playing === k) return;
          a.muted = true;
          var p;
          try { p = a.play(); } catch (e) { a.muted = false; return; }
          var settle = function () { if (a.muted) { a.pause(); try { a.currentTime = 0; } catch (e) {} } a.muted = false; };
          if (p && p.then) p.then(settle, function () { a.muted = false; }); else settle();
        });
      },
      play: function (k) {
        var a = el(k);
        try { a.pause(); a.currentTime = 0; } catch (e) {}
        a.muted = false;
        playing = k; changed();
        var p;
        try { p = a.play(); } catch (e) { playing = null; changed(); return; }
        if (p && p.catch) p.catch(function () { if (playing === k) { playing = null; changed(); } });
      },
      playOnce: function (k) { if (played[k]) return; played[k] = true; this.play(k); },
      stop: function () {
        Object.keys(els).forEach(function (k) { try { els[k].pause(); } catch (e) {} });
        if (playing) { playing = null; changed(); }
      },
      reset: function () { played = {}; this.stop(); },
      playing: function () { return playing; },
      onChange: function (f) { listeners.push(f); }
    };
  })();

  /* ── Microphone · opened only after PERMISSION is accepted ─────────────── */
  var Mic = { stream: null, status: 'idle' };
  function openMic() {
    if (Mic.stream) return Promise.resolve(true);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { Mic.status = 'off'; return Promise.resolve(false); }
    return navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
    }).then(function (s) {
      Mic.stream = s; Mic.status = 'on'; return true;
    }, function () { Mic.status = 'off'; return false; });
  }
  function closeMic() {
    if (Mic.stream) Mic.stream.getTracks().forEach(function (t) { t.stop(); });
    Mic.stream = null; Mic.status = 'idle';
  }

  /* ── Transcription state ───────────────────────────────────────────────── */
  var STT = global.SafeRiseSTT || null;
  var engine = null, transcriptDone = null;
  var words = null, interim = null, voice = false, levels = [], tFailed = false, micLost = false;
  var wordsOpen = null;
  var dl = null, failReason = null;
  var reduceMotion = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var WAVE_BARS = 9;

  function resetWords() {
    words = { RECOGNISE: [], REGULATE: [], RELEASE: [], RISE: [] };
    interim = null; voice = false; levels = []; tFailed = false; micLost = false; transcriptDone = null;
  }
  function hasWords() {
    return !!words && PHASES.some(function (p) { return words[p].length > 0; });
  }

  function ensureEngine() {
    if (engine) return engine;
    engine = STT.createEngine({
      onFinal: function (phase, text) {
        if (!machine) return;
        words[phase].push(text);
        machine.appendTranscript(phase, text);
        domFinal(phase, text);
      },
      onInterim: function (phase, text) {
        interim = text ? { phase: phase, text: text } : null;
        domInterim(phase, text);
      },
      onVoice: function (on) { voice = on; domVoice(); },
      onLevel: function (rms) {
        levels.push(rms); if (levels.length > WAVE_BARS) levels.shift();
        domLevels();
      },
      onError: function (kind) {
        if (kind === 'mic-ended') {
          micLost = true; closeMic(); Mic.status = 'off';
          if (machine && PHASES.indexOf(machine.state()) > -1) rerender();
          return;
        }
        tFailed = true; interim = null; voice = false;
        if (machine && machine.state() === 'PRE_STATE') { showFail('load'); return; }
        if (machine && PHASES.indexOf(machine.state()) > -1) rerender();
      }
    });
    return engine;
  }
  function dropEngine() {
    if (engine) engine.destroy();
    engine = null;
  }

  /* ── View ──────────────────────────────────────────────────────────────── */
  var ctx = (typeof PAGE_PROTOCOL !== 'undefined' && PAGE_PROTOCOL) ? PAGE_PROTOCOL : {};
  var machine = null, view = 'INVITE', deeperShown = 0;

  var toggle = document.createElement('div');
  toggle.className = 'sr-sv-toggle';
  toggle.setAttribute('role', 'group');
  toggle.setAttribute('aria-label', 'Session mode');
  toggle.innerHTML =
    '<button type="button" class="sr-sv-tbtn" data-sv-mode="guided" aria-pressed="true">Guided protocol</button>' +
    '<button type="button" class="sr-sv-tbtn" data-sv-mode="sovereign" aria-pressed="false">Sovereign</button>';
  player.parentNode.insertBefore(toggle, player);

  function inSession() { return machine && machine.state() !== 'SYNTHESIS' && machine.state() !== 'PRE_STATE'; }

  function teardown() {
    Voice.stop();
    if (dl && dl.abort) dl.abort.abort();
    dl = null;
    dropEngine(); closeMic(); Soundbed.pause();
    machine = null; failReason = null;
  }

  function setMode(mode) {
    if (mode === 'guided' && inSession() &&
        !window.confirm('Leave this Sovereign session? The starting point you rated stays on this device.')) return;
    var sov = mode === 'sovereign';
    Array.prototype.forEach.call(toggle.querySelectorAll('.sr-sv-tbtn'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-sv-mode') === mode));
    });
    guided.hidden = sov;
    root.hidden = !sov;
    if (sov) {
      var a = guided.querySelector('audio');
      if (a && !a.paused) a.pause();
      go('INVITE');
    } else {
      teardown(); view = 'INVITE';
      root.innerHTML = '';
    }
  }

  function scale(kind, chosen) {
    var h = '<div class="sr-sv-scalewrap"><div class="sr-sv-scale sr-sv-scale--' + kind + '" role="radiogroup" aria-label="Activation, 1 settled to 10 at its loudest">';
    for (var n = 1; n <= 10; n++) {
      var on = chosen === n;
      h += '<button type="button" class="sr-sv-num" role="radio" aria-checked="' + on + '" tabindex="' +
           (on || (!chosen && n === 1) ? '0' : '-1') + '" data-sv-num="' + n + '">' + n + '</button>';
    }
    return h + '</div><div class="sr-sv-ends"><span>Settled</span><span>At its loudest</span></div></div>';
  }

  function phaseName(p) { return p.charAt(0) + p.slice(1).toLowerCase(); }

  function phaseRow(allDone) {
    var cur = machine ? machine.state() : '';
    var ci = PHASES.indexOf(cur);
    return '<ol class="sr-sv-phases" aria-label="The four movements">' + PHASES.map(function (p, k) {
      var st = allDone || (ci > -1 && k < ci) || ci === -1 && STATES.indexOf(cur) > 4 ? 'done' : (k === ci ? 'now' : 'next');
      return '<li class="sr-sv-ph sr-sv-ph--' + st + '"' + (st === 'now' ? ' aria-current="step"' : '') + '>' +
        (st === 'done' ? svg('check', 12) : '') + '<span>' + phaseName(p) + '</span>' +
        '<span class="sr-sv-vh">' + (st === 'done' ? ', done' : st === 'now' ? ', now' : '') + '</span></li>';
    }).join('') + '</ol>';
  }

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* Microphone status in text, the live waveform, and LISTENING — which
     shows while the member is speaking and is simply absent otherwise. */
  function micLine() {
    if (micLost || Mic.status !== 'on') {
      return '<div class="sr-sv-note" role="status"><p>The microphone has stopped. Your session is still here — you can carry on with the buttons, try the microphone again, or switch to the guided version.</p>' +
        '<p class="sr-sv-noteacts"><button type="button" class="sr-sv-link" data-sv="mic-retry">Try the microphone again</button>' +
        '<button type="button" class="sr-sv-link" data-sv="to-guided">Switch to the guided version</button></p></div>';
    }
    var bars = '';
    for (var k = 0; k < WAVE_BARS; k++) bars += '<i class="sr-sv-bar"></i>';
    return '<div class="sr-sv-live">' +
      '<p class="sr-sv-mic"><span class="sr-sv-gdot" aria-hidden="true"></span>Microphone on</p>' +
      '<span class="sr-sv-wave" aria-hidden="true">' + bars + '</span>' +
      '<span class="sr-sv-listen"' + (voice ? '' : ' hidden') + '>Listening</span>' +
      '</div>';
  }

  function replayBtn(k) {
    return '<button type="button" class="sr-sv-link sr-sv-replay" data-sv="voice-replay" data-sv-voice="' + k + '">Hear the question again</button>';
  }

  function soundbedBtn() {
    var on = Soundbed.on();
    return '<button type="button" class="sr-sv-bed" data-sv="soundbed" aria-pressed="' + on + '">' +
           '<span class="sr-sv-bedpip" aria-hidden="true"></span>Soundbed ' + (on ? 'on' : 'off') + '</button>';
  }

  /* "Your words". Open by default on desktop, collapsed on mobile, and never
     opened for the member once they have chosen. Read-only while the session
     runs; interim text is quieter and settles in place — settled text is
     never rewritten. */
  function wordsHTML() {
    var open = wordsOpen === null ? !!(global.matchMedia && global.matchMedia('(min-width: 761px)').matches) : wordsOpen;
    var cur = PHASES.indexOf(machine.state());
    var body = '';
    PHASES.forEach(function (p, k) {
      if (k > cur) return;
      var said = words[p], live = interim && interim.phase === p ? interim.text : '';
      if (!said.length && !live) return;
      body += '<section class="sr-sv-tph" data-ph="' + p + '"><p class="sr-sv-tphn">' + phaseName(p) + '</p><p class="sr-sv-ttext">' +
        said.map(function (t) { return '<span class="sr-sv-tset">' + esc(t) + ' </span>'; }).join('') +
        (live ? '<span class="sr-sv-tint">' + esc(live) + '</span>' : '') + '</p></section>';
    });
    if (!body) body = '<p class="sr-sv-tempty">Your words will appear here as you speak.</p>';
    return '<details class="sr-sv-words"' + (open ? ' open' : '') + '><summary>Your words</summary>' +
      '<div class="sr-sv-tlist" tabindex="0" role="log" aria-live="off" aria-label="Your words, transcribed on this device">' + body + '</div>' +
      (tFailed ? '<p class="sr-sv-tnote">The transcript has stopped, but your session hasn’t. Keep going — saying it out loud has value with or without a written record.</p>' : '') +
      '</details>';
  }

  function tlist() { return root.querySelector('.sr-sv-tlist'); }
  function nearBottom(el) { return el.scrollHeight - el.scrollTop - el.clientHeight < 24; }
  function phaseLine(phase) {
    var list = tlist();
    if (!list) return null;
    var sec = list.querySelector('.sr-sv-tph[data-ph="' + phase + '"]');
    if (!sec) {
      var empty = list.querySelector('.sr-sv-tempty');
      if (empty) empty.remove();
      sec = document.createElement('section');
      sec.className = 'sr-sv-tph'; sec.setAttribute('data-ph', phase);
      sec.innerHTML = '<p class="sr-sv-tphn">' + phaseName(phase) + '</p><p class="sr-sv-ttext"></p>';
      list.appendChild(sec);
    }
    return sec.querySelector('.sr-sv-ttext');
  }
  function domFinal(phase, text) {
    var list = tlist(), line = phaseLine(phase);
    if (!line) return;
    var stick = nearBottom(list);
    var old = line.querySelector('.sr-sv-tint');
    if (old) old.remove();
    var span = document.createElement('span');
    span.className = 'sr-sv-tset'; span.textContent = text + ' ';
    line.appendChild(span);
    if (stick) list.scrollTop = list.scrollHeight;
  }
  function domInterim(phase, text) {
    var list = tlist();
    if (!list) return;
    if (!text) { Array.prototype.forEach.call(list.querySelectorAll('.sr-sv-tint'), function (n) { n.remove(); }); return; }
    var line = phaseLine(phase), stick = nearBottom(list);
    var span = line.querySelector('.sr-sv-tint');
    if (!span) { span = document.createElement('span'); span.className = 'sr-sv-tint'; line.appendChild(span); }
    span.textContent = text;
    if (stick) list.scrollTop = list.scrollHeight;
  }
  function domVoice() {
    var el = root.querySelector('.sr-sv-listen');
    if (el) el.hidden = !voice;
  }
  function domLevels() {
    if (reduceMotion) return;
    var bars = root.querySelectorAll('.sr-sv-bar');
    for (var k = 0; k < bars.length; k++) {
      var v = levels[levels.length - bars.length + k] || 0;
      bars[k].style.height = (3 + Math.pow(Math.min(1, v * 14), 0.6) * 23).toFixed(1) + 'px';
    }
  }

  function transcriptLine() {
    var s = machine && LocalStore.get(KEYS.session, null);
    var status = s && s.transcriptStatus;
    if (status === 'complete') return '<li class="sr-sv-st sr-sv-st--done">' + svg('check', 15) + '<span>Transcript written</span><span class="sr-sv-vh">, done</span></li>';
    if (status === 'incomplete') return '<li class="sr-sv-st sr-sv-st--done">' + svg('check', 15) + '<span>Transcript written, up to where it stopped</span><span class="sr-sv-vh">, done</span></li>';
    return '<li class="sr-sv-st sr-sv-st--none">' + svg('dot', 15) + '<span>No transcript this time</span></li>';
  }

  function failCopy(r) {
    if (r === 'mic') return {
      h: 'A Sovereign session needs your microphone.',
      b: 'Your browser didn’t allow it. You can allow the microphone for this site in your browser’s settings and try again, or use the guided version now.',
      retry: true };
    if (r === 'load') return {
      h: 'The speech model couldn’t be started.',
      b: 'Nothing you said was recorded or sent anywhere. You can try again — if the model has been cleared from this device it will download once more — or use the guided version now.',
      retry: true };
    if (r === 'unavailable') return {
      h: 'Sovereign sessions aren’t available on this page right now.',
      b: 'The part of SafeRise that turns your voice into text didn’t load. Nothing was recorded. The guided version works here.',
      retry: false };
    return {
      h: 'This device can’t run the speech model.',
      b: 'A Sovereign session turns your voice into text on the device itself, and this browser can’t do that. SafeRise won’t send your voice anywhere else instead. The guided version works here.',
      retry: false };
  }

  function mb(bytes) { return Math.max(1, Math.round(bytes / 1e6)); }

  function dlBody() {
    if (!dl || dl.state === 'sizing') return 'Checking the size of the download…';
    return 'This is a one-time download of about ' + mb(dl.total) + ' MB. It is what lets SafeRise turn your voice into text here, on this device, so your voice is never sent anywhere. Once it is here, Sovereign sessions work offline.';
  }
  function dlStatus() {
    if (!dl) return '';
    if (dl.state === 'loading') return 'Downloaded. Getting it ready…';
    if (dl.state === 'ready') return 'Ready.';
    return '';
  }

  var SCREENS = {
    INVITE: function () {
      return '<div class="sr-sv-stage sr-sv-stage--invite">' +
        '<p class="sr-sv-kick">Sovereign practice</p>' +
        '<h2 class="sr-sv-h sr-sv-h--34" tabindex="-1">Your voice, your record. SafeRise holds the pathway.</h2>' +
        '<p class="sr-sv-body">You move through Recognise, Regulate, Release and Rise in your own words, out loud. ' +
        'SafeRise offers one question at a time and keeps the order. Nothing rushes you from one movement to the next — you decide when you are ready.</p>' +
        '<div class="sr-sv-acts"><button type="button" class="sr-sv-btn sr-sv-btn--pri" data-sv="invite-begin">Begin Sovereign session</button></div>' +
        '<p class="sr-sv-quiet">Prefer to be guided? Switch back at any time.</p>' +
        '</div>' +
        '<p class="sr-sv-outer">Nothing is recorded until you begin, and you will be told exactly what happens first.</p>';
    },
    PERMISSION: function () {
      var facts = [
        ['voice', 'Your voice is turned into text on this device. The recording itself is not sent anywhere.'],
        ['record', 'Only the written record is kept — what surfaced, what you chose, what you decided.'],
        ['edit', 'You can read, edit or delete any part of it afterwards, including the transcript.'],
        ['shield', 'Nobody at your organisation can see any of it. Not a summary, not a statement, not a word.']
      ];
      return '<div class="sr-sv-stage">' +
        '<p class="sr-sv-kick">Before you speak</p>' +
        '<h2 class="sr-sv-h sr-sv-h--30" tabindex="-1">SafeRise needs your microphone, and you should know exactly what happens to what you say.</h2>' +
        '<ul class="sr-sv-facts">' + facts.map(function (f, k) {
          return '<li class="sr-sv-fact' + (k === 3 ? ' sr-sv-fact--gold' : '') + '">' + svg(f[0], 17) + '<span>' + f[1] + '</span></li>';
        }).join('') + '</ul>' +
        '<div class="sr-sv-acts">' +
          '<button type="button" class="sr-sv-btn sr-sv-btn--pri" data-sv="allow">Allow microphone</button>' +
          '<button type="button" class="sr-sv-btn sr-sv-btn--ghost" data-sv="to-guided">Use the guided version instead</button>' +
        '</div>' +
        '<p class="sr-sv-right"><a class="sr-sv-link" href="privacy.html">How your record is stored</a></p>' +
        '</div>';
    },
    /* Not a practice surface: the one place a progress indicator is allowed. */
    MODEL: function () {
      if (dl && dl.state === 'failed') {
        return '<div class="sr-sv-stage">' +
          '<p class="sr-sv-kick">One-time setup</p>' +
          '<h2 class="sr-sv-h sr-sv-h--30" tabindex="-1">The speech model didn’t finish downloading.</h2>' +
          '<p class="sr-sv-body">Nothing you said has been recorded or sent anywhere — the session hasn’t started. SafeRise won’t use an online speech service instead. You can try the download again, or use the guided version now.</p>' +
          '<div class="sr-sv-acts">' +
            '<button type="button" class="sr-sv-btn sr-sv-btn--pri" data-sv="dl-retry">Retry</button>' +
            '<button type="button" class="sr-sv-btn sr-sv-btn--ghost" data-sv="to-guided">Use the guided version instead</button>' +
          '</div></div>';
      }
      var pct = dl ? Math.round((dl.state === 'loading' || dl.state === 'ready' ? 1 : dl.frac) * 100) : 0;
      return '<div class="sr-sv-stage">' +
        '<p class="sr-sv-kick">One-time setup</p>' +
        '<h2 class="sr-sv-h sr-sv-h--30" tabindex="-1">SafeRise is downloading the speech model to your device.</h2>' +
        '<p class="sr-sv-body sr-sv-dlbody">' + dlBody() + '</p>' +
        '<div class="sr-sv-dl">' +
          '<div class="sr-sv-dlbar" role="progressbar" aria-label="Speech model download" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '">' +
            '<span class="sr-sv-dlfill" style="width:' + pct + '%"></span></div>' +
          '<span class="sr-sv-dlpct">' + pct + '%</span>' +
        '</div>' +
        '<p class="sr-sv-quiet sr-sv-dlstatus" role="status">' + dlStatus() + '</p>' +
        '<div class="sr-sv-acts">' +
          '<button type="button" class="sr-sv-btn sr-sv-btn--pri" data-sv="dl-continue"' + (dl && dl.state === 'ready' ? '' : ' disabled') + '>Continue</button>' +
          '<button type="button" class="sr-sv-btn sr-sv-btn--ghost" data-sv="to-guided">Use the guided version instead</button>' +
        '</div></div>';
    },
    FAIL: function () {
      var c = failCopy(failReason);
      return '<div class="sr-sv-stage">' +
        '<p class="sr-sv-kick">Sovereign practice</p>' +
        '<h2 class="sr-sv-h sr-sv-h--30" tabindex="-1">' + c.h + '</h2>' +
        '<p class="sr-sv-body">' + c.b + '</p>' +
        '<div class="sr-sv-acts">' +
          '<button type="button" class="sr-sv-btn sr-sv-btn--pri" data-sv="to-guided">Use the guided version</button>' +
          (c.retry ? '<button type="button" class="sr-sv-btn sr-sv-btn--ghost" data-sv="retry">Try again</button>' : '') +
        '</div></div>';
    },
    PRE_STATE: function () {
      var pre = machine.preState();
      return '<div class="sr-sv-stage">' +
        '<p class="sr-sv-label">Where you are starting</p>' + replayBtn('pre') +
        '<h2 class="sr-sv-h sr-sv-h--34" tabindex="-1">How activated does your system feel right now?</h2>' +
        scale('pre', pre) +
        '<p class="sr-sv-say"><span class="sr-sv-gdot" aria-hidden="true"></span>Or just say it — ‘I’m agitated, about a seven.’</p>' +
        '<p class="sr-sv-quiet">You can correct this at any point during the session.</p>' +
        '<div class="sr-sv-acts"><button type="button" class="sr-sv-btn sr-sv-btn--pri" data-sv="begin"' + (pre ? '' : ' disabled') + '>Begin</button></div>' +
        '<div class="sr-sv-foot"><span>' + soundbedBtn() + '</span>' +
        '<span class="sr-sv-footr">We will ask again at the end, before you see anything written.</span></div>' +
        '</div>';
    },
    PHASE: function () {
      var st = machine.state(), P = PROMPTS[st];
      var deeper = P.deeper.slice(0, deeperShown);
      var more = deeperShown >= P.deeper.length;
      return '<div class="sr-sv-stage sr-sv-stage--phase">' +
        phaseRow(false) +
        '<div class="sr-sv-centre">' +
          (P.lead ? '<p class="sr-sv-lead">' + P.lead + '</p>' : '') +
          '<h2 class="sr-sv-h sr-sv-h--34" tabindex="-1">' + P.main + '</h2>' +
          '<div class="sr-sv-deeper" aria-live="polite">' + deeper.map(function (d) { return '<p>' + d + '</p>'; }).join('') +
          (more && deeperShown > 0 ? '<p class="sr-sv-soft">' + SOFT_MAX + '</p>' : '') + '</div>' +
        '</div>' +
        '<div class="sr-sv-meta">' + micLine() +
          '<p class="sr-sv-began">You began at <span class="sr-sv-mini">' + machine.preState() + '</span>' +
          '<button type="button" class="sr-sv-step" data-sv="pre-dn" aria-label="Lower your starting point">−</button>' +
          '<button type="button" class="sr-sv-step" data-sv="pre-up" aria-label="Raise your starting point">+</button></p>' +
          soundbedBtn() +
        '</div>' +
        wordsHTML() +
        '<div class="sr-sv-dock">' +
          '<button type="button" class="sr-sv-btn sr-sv-btn--ghost" data-sv="keep">Keep going</button>' +
          '<button type="button" class="sr-sv-btn sr-sv-btn--pri" data-sv="next">Next →</button>' +
        '</div>' +
        '</div>';
    },
    POST_STATE: function () {
      var post = machine.postState();
      return '<div class="sr-sv-stage">' +
        phaseRow(true) +
        '<p class="sr-sv-label">Where you are now</p>' + replayBtn('post') +
        '<h2 class="sr-sv-h sr-sv-h--34" tabindex="-1">And how activated does your system feel now?</h2>' +
        scale('post', post) +
        '<p class="sr-sv-began sr-sv-began--big">You began at <span class="sr-sv-chip">' + machine.preState() + '</span></p>' +
        '<p class="sr-sv-say"><span class="sr-sv-gdot" aria-hidden="true"></span>Or say it — ‘a lot quieter, maybe a three.’</p>' +
        '<div class="sr-sv-acts"><button type="button" class="sr-sv-btn sr-sv-btn--pri" data-sv="close"' + (post ? '' : ' disabled') + '>Close the session</button></div>' +
        '<div class="sr-sv-foot"><span>' + soundbedBtn() + '</span>' +
        '<span class="sr-sv-footr sr-sv-footr--430">Nothing has been written up yet. You are rating your own state, not a summary of it.</span></div>' +
        '</div>';
    },
    SYNTHESIS: function () {
      return '<div class="sr-sv-stage sr-sv-stage--settle">' +
        '<div class="sr-sv-breath" aria-hidden="true"><span class="sr-sv-ring sr-sv-ring--o"></span><span class="sr-sv-ring sr-sv-ring--i"></span><span class="sr-sv-core"></span></div>' +
        '<h2 class="sr-sv-h sr-sv-h--34" tabindex="-1">Creating your record.</h2>' +
        '<p class="sr-sv-body">Your words are being gathered into a written record on this device. Sit for a moment before you read it.</p>' +
        '<ul class="sr-sv-status">' +
          transcriptLine() +
          '<li class="sr-sv-st sr-sv-st--done">' + svg('check', 15) + '<span>What you chose, in your own words</span><span class="sr-sv-vh">, done</span></li>' +
          '<li class="sr-sv-st sr-sv-st--now">' + svg('dot', 15) + '<span>Gathering the decisions you named</span><span class="sr-sv-vh">, in progress</span></li>' +
        '</ul>' +
        '<div class="sr-sv-foot"><span class="sr-sv-footl">Nothing leaves this device.</span>' +
        '<button type="button" class="sr-sv-btn sr-sv-btn--ghost" data-sv="leave">Leave without saving</button></div>' +
        '</div>';
    }
  };

  function go(v) {
    if (v !== view && Voice.playing()) Voice.stop();
    view = v;
    var key = PHASES.indexOf(v) > -1 ? 'PHASE' : v;
    root.innerHTML = SCREENS[key]();
    root.setAttribute('data-sv-view', v);
    var h = root.querySelector('.sr-sv-h');
    if (h) h.focus({ preventScroll: true });
    var d = root.querySelector('.sr-sv-words');
    if (d) {
      d.addEventListener('toggle', function () { wordsOpen = d.open; });
      var list = tlist(); if (list) list.scrollTop = list.scrollHeight;
    }
    domLevels();
    var inBed = v === 'PRE_STATE' || v === 'POST_STATE' || PHASES.indexOf(v) > -1;
    if (inBed) Soundbed.resume(); else Soundbed.pause();
  }
  function rerender() { go(view); }

  function showFail(reason) {
    if (dl && dl.abort) dl.abort.abort();
    dl = null;
    dropEngine(); closeMic();
    machine = null; failReason = reason;
    go('FAIL');
  }

  /* INVITE → (PERMISSION, once) → microphone → (MODEL, if not cached) → PRE_STATE */
  function beginFlow() {
    if (!STT) { showFail('unavailable'); return; }
    var why = STT.probe();
    if (why) { showFail(why); return; }
    if (LocalStore.get(KEYS.micIntroSeen, false) === true) requestMic();
    else go('PERMISSION');
  }
  function requestMic() {
    openMic().then(function (ok) {
      if (!ok) { showFail('mic'); return; }
      STT.isCached().then(function (cached) { if (cached) startMachine(); else startDownload(); });
    });
  }

  function startDownload() {
    var abort = new AbortController();
    dl = { state: 'sizing', total: 0, frac: 0, abort: abort };
    var mine = dl;
    go('MODEL');
    function paint() {
      if (dl !== mine || view !== 'MODEL') return;
      var pct = Math.round((mine.state === 'loading' || mine.state === 'ready' ? 1 : mine.frac) * 100);
      var body = root.querySelector('.sr-sv-dlbody'), bar = root.querySelector('.sr-sv-dlbar'),
          fill = root.querySelector('.sr-sv-dlfill'), num = root.querySelector('.sr-sv-dlpct'),
          status = root.querySelector('.sr-sv-dlstatus'), cont = root.querySelector('[data-sv="dl-continue"]');
      if (body) body.textContent = dlBody();
      if (bar) bar.setAttribute('aria-valuenow', pct);
      if (fill) fill.style.width = pct + '%';
      if (num) num.textContent = pct + '%';
      if (status) status.textContent = dlStatus();
      if (cont) cont.disabled = mine.state !== 'ready';
    }
    STT.download({
      signal: abort.signal,
      onSize: function (bytes) { mine.total = bytes; mine.state = 'downloading'; paint(); },
      onProgress: function (f) { mine.frac = f; paint(); }
    }).then(function () {
      mine.state = 'loading'; paint();
      return ensureEngine().prepare();
    }).then(function () {
      mine.state = 'ready'; paint();
    }, function (err) {
      if (dl !== mine || abort.signal.aborted) return;
      if (engine) { dropEngine(); }
      if (err && err.code) { showFail('load'); return; }
      mine.state = 'failed'; go('MODEL');
    });
  }

  function startMachine() {
    machine = createMachine(LocalStore, { protocolId: ctx.protocolId, trackId: ctx.trackId });
    deeperShown = 0;
    resetWords();
    dl = null;
    ensureEngine().prepare().catch(function (err) {
      if (machine && machine.state() === 'PRE_STATE') showFail('load');
    });
    Voice.reset();
    go('PRE_STATE');
    Voice.playOnce('pre');
  }

  function pick(btn) {
    var n = +btn.getAttribute('data-sv-num');
    if (machine.state() === 'PRE_STATE') machine.choosePre(n); else machine.choosePost(n);
    go(machine.state());
    var sel = root.querySelector('.sr-sv-num[data-sv-num="' + n + '"]');
    if (sel) sel.focus();
  }

  toggle.addEventListener('click', function (e) {
    var b = e.target.closest('.sr-sv-tbtn');
    if (b && b.getAttribute('aria-pressed') !== 'true') setMode(b.getAttribute('data-sv-mode'));
  });

  root.addEventListener('click', function (e) {
    var num = e.target.closest('.sr-sv-num');
    if (num) { pick(num); return; }
    var b = e.target.closest('[data-sv]');
    if (!b || b.disabled) return;
    switch (b.getAttribute('data-sv')) {
      case 'invite-begin': Voice.prime(); beginFlow(); break;
      case 'allow':
        LocalStore.set(KEYS.micIntroSeen, true);
        requestMic();
        break;
      case 'to-guided': setMode('guided'); break;
      case 'retry':
        if (failReason === 'mic' || failReason === 'load') { failReason = null; beginFlow(); }
        break;
      case 'dl-retry': startDownload(); break;
      case 'dl-continue': startMachine(); break;
      case 'mic-retry':
        openMic().then(function (ok) {
          if (!ok || !machine) return;
          micLost = false;
          if (PHASES.indexOf(machine.state()) > -1 && engine && !engine.failed()) {
            engine.start(Mic.stream, machine.state()).catch(function () { tFailed = true; rerender(); });
          }
          rerender();
        });
        break;
      case 'soundbed': Soundbed.toggle(); go(machine.state()); break;
      case 'voice-replay': Voice.play(b.getAttribute('data-sv-voice')); break;
      case 'begin':
        if (machine.begin()) {
          deeperShown = 0;
          if (engine && Mic.stream && !engine.failed()) {
            engine.start(Mic.stream, 'RECOGNISE').catch(function () { tFailed = true; rerender(); });
          }
          go(machine.state());
        }
        break;
      case 'keep':
        deeperShown = Math.min(deeperShown + 1, PROMPTS[machine.state()].deeper.length);
        go(machine.state());
        break;
      case 'next':
        machine.next(); deeperShown = 0;
        if (engine) {
          if (PHASES.indexOf(machine.state()) > -1) engine.setPhase(machine.state());
          else { transcriptDone = engine.stop(); voice = false; interim = null; closeMic(); }
        }
        go(machine.state());
        if (machine.state() === 'POST_STATE') Voice.playOnce('post');
        break;
      case 'pre-dn': machine.correctPre(machine.preState() - 1); go(machine.state()); break;
      case 'pre-up': machine.correctPre(machine.preState() + 1); go(machine.state()); break;
      case 'close':
        if (machine.postState() === null) break;
        b.disabled = true;
        (transcriptDone || Promise.resolve()).then(function () {
          if (!machine || machine.state() !== 'POST_STATE') return;
          machine.setTranscriptStatus(tFailed ? (hasWords() ? 'incomplete' : 'none') : (hasWords() ? 'complete' : 'none'));
          if (machine.close()) { dropEngine(); closeMic(); go(machine.state()); }
        });
        break;
      case 'leave': machine.discard(); teardown(); go('INVITE'); break;
    }
  });

  /* Radiogroup arrow keys — the ten-button row is one tab stop. */
  root.addEventListener('keydown', function (e) {
    var num = e.target.closest && e.target.closest('.sr-sv-num');
    if (!num) return;
    var d = (e.key === 'ArrowRight' || e.key === 'ArrowUp') ? 1 : (e.key === 'ArrowLeft' || e.key === 'ArrowDown') ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    var n = Math.max(1, Math.min(10, +num.getAttribute('data-sv-num') + d));
    pick(root.querySelector('.sr-sv-num[data-sv-num="' + n + '"]'));
  });

  /* The soundbed pauses with the session — and with the page. */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) Soundbed.pause();
    else if (!root.hidden && machine && machine.state() !== 'SYNTHESIS') Soundbed.resume();
  });
})(window);
