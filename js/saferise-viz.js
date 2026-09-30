/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-viz.js · SR-472 §1
   The live audio visualiser. One component, used by every player: the
   guided-meditation (galaxy) player, The Clearing (dashboard modal and its
   own page), resource guidance, and the Sovereign session's spoken
   questions.

   It shows that sound is coming out, and nothing else. Bars are the real
   output level of the <audio> element, read through a Web Audio
   AnalyserNode: silent audio gives still bars at rest. It is NOT a progress
   indicator — it never reads currentTime or duration, and draws no
   playhead, elapsed or remaining time, and nothing to scrub.

   The look is the Sovereign waveform's (css/saferise-sovereign.css
   .sr-sv-bar): nine 3px bars in #7FB59B, each a recent level with the
   newest on the right. Styling in css/saferise-viz.css (surface code sr-av-).

   PLAYBACK COMES FIRST. createMediaElementSource() is permanent — once an
   element is routed through an AudioContext, it is only audible while that
   context runs. So an element is routed only after its context has been
   confirmed 'running'; if it cannot be (no Web Audio, a browser that keeps
   the context suspended), the element is never touched, keeps playing
   exactly as before, and the visualiser removes itself. Nothing here runs
   before the first 'play' event, so nothing delays the start.

   One tap per element, shared: js/saferise-poster.js's aura reads the same
   analyser through SRViz.level() rather than building a second graph —
   an element can only ever have one MediaElementSource.

   API
     SRViz.attach(audio, host, opts) → { destroy }   opts: { bars, gain }
     SRViz.level(audio)                → 0..1 smoothed level, 0 if no tap
     SRViz.tap(audio)                  → the shared tap (internal, exported for the aura)
   ═══════════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  var Ctx = global.AudioContext || global.webkitAudioContext;
  var taps = typeof WeakMap === 'function' ? new WeakMap() : null;
  var reduced = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function available() { return !!(Ctx && taps); }

  /* The shared tap for one element. state: 'pending' | 'ready' | 'failed'. */
  function tap(audio) {
    if (!available() || !audio) return null;
    var t = taps.get(audio);
    if (t) {
      if (t.state === 'ready' && t.ctx.state === 'suspended') { try { t.ctx.resume(); } catch (e) {} }
      return t;
    }
    t = { state: 'pending', ctx: null, analyser: null, data: null, smoothed: 0, listeners: [] };
    taps.set(audio, t);
    try { t.ctx = new Ctx(); } catch (e) { t.state = 'failed'; return t; }
    function settle(state) { t.state = state; t.listeners.forEach(function (f) { try { f(t); } catch (e) {} }); t.listeners = []; }
    function route() {
      try {
        var src = t.ctx.createMediaElementSource(audio);
        var an = t.ctx.createAnalyser();
        an.fftSize = 1024;
        an.smoothingTimeConstant = 0;
        src.connect(t.ctx.destination);          /* always: this is what keeps it audible */
        src.connect(an);
        t.analyser = an;
        t.data = new Uint8Array(an.fftSize);
        settle('ready');
      } catch (e) { settle('failed'); }
    }
    if (t.ctx.state === 'running') route();
    else {
      var p;
      try { p = t.ctx.resume(); } catch (e) { p = null; }
      var check = function () { if (t.state === 'pending') { if (t.ctx.state === 'running') route(); else settle('failed'); } };
      if (p && p.then) p.then(check, function () { settle('failed'); });
      /* A context that never answers is treated as unavailable, not waited on. */
      setTimeout(check, 400);
    }
    return t;
  }

  /* Time-domain RMS of what is playing right now, 0..~1. */
  function rms(t) {
    if (!t || t.state !== 'ready') return 0;
    t.analyser.getByteTimeDomainData(t.data);
    var sum = 0;
    for (var i = 0; i < t.data.length; i++) { var v = (t.data[i] - 128) / 128; sum += v * v; }
    return Math.sqrt(sum / t.data.length);
  }

  /* Smoothed level for the galaxy aura (same EMA it always used). */
  function level(audio) {
    var t = taps && taps.get(audio);
    if (!t || t.state !== 'ready') return 0;
    t.smoothed += (rms(t) - t.smoothed) * 0.25;
    return Math.max(0, Math.min(1, t.smoothed * 2.2));
  }

  function attach(audio, host, opts) {
    opts = opts || {};
    if (!host || !audio) return { destroy: function () {} };
    if (!available()) { host.hidden = true; return { destroy: function () {} }; }
    var n = opts.bars || 9, gain = opts.gain || 5;
    host.classList.add('sr-av');
    host.setAttribute('aria-hidden', 'true');
    host.innerHTML = '';
    var bars = [], levels = [];
    for (var i = 0; i < n; i++) { var b = document.createElement('i'); host.appendChild(b); bars.push(b); levels.push(0); }

    var raf = null, last = 0, alive = true;
    function paint() {
      for (var k = 0; k < n; k++) {
        var v = levels[k];
        bars[k].style.height = (3 + Math.pow(Math.min(1, v * gain), 0.6) * 23).toFixed(1) + 'px';
      }
    }
    function rest() { for (var k = 0; k < n; k++) levels[k] = 0; paint(); }
    function frame(now) {
      raf = null;
      if (!alive) return;
      if (!host.isConnected) { destroy(); return; }
      var t = taps.get(audio);
      if (!t || t.state !== 'ready' || audio.paused) return;
      if (now - last >= 70) {                     /* a new level every ~70ms, newest on the right */
        last = now;
        levels.shift(); levels.push(rms(t));
        paint();
      }
      raf = global.requestAnimationFrame(frame);
    }
    function onPlay() {
      var t = tap(audio);
      if (!t) return;
      host.classList.add('sr-av--on');
      if (t.state === 'failed') { host.hidden = true; return; }
      if (reduced) return;                        /* the platform's reduced-motion rule: bars stay at rest */
      var start = function () { if (t.state === 'failed') { host.hidden = true; return; } if (!raf && alive) raf = global.requestAnimationFrame(frame); };
      if (t.state === 'ready') start(); else t.listeners.push(start);
    }
    function onStop() {
      host.classList.remove('sr-av--on');
      if (raf) { global.cancelAnimationFrame(raf); raf = null; }
      rest();
    }
    function destroy() {
      alive = false;
      if (raf) { global.cancelAnimationFrame(raf); raf = null; }
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('playing', onPlay);
      audio.removeEventListener('pause', onStop);
      audio.removeEventListener('ended', onStop);
      audio.removeEventListener('emptied', onStop);
    }
    audio.addEventListener('play', onPlay);
    audio.addEventListener('playing', onPlay);
    audio.addEventListener('pause', onStop);
    audio.addEventListener('ended', onStop);
    audio.addEventListener('emptied', onStop);
    var existing = taps.get(audio);
    if (existing && existing.state === 'failed') host.hidden = true;
    rest();
    if (!audio.paused) onPlay();
    return { destroy: destroy };
  }

  global.SRViz = { attach: attach, level: level, tap: tap, available: available };
})(window);
