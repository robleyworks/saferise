/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-sovereign-stt.js · SR-463 (SOV-3)
   On-device transcription for the Sovereign session: the one-time model
   download, the cache check, microphone capture, voice-activity detection
   and chunking. The model itself runs in js/saferise-sovereign-stt-worker.js.

   Defines window.SafeRiseSTT and nothing else; it does no work until
   js/saferise-sovereign.js calls it, which only happens with the flag on.

   MODEL. moonshine-tiny, q8 (SR-463 evaluation: 28 MB of weights against
   whisper-tiny.en's 41 MB, and 3-9x faster on short chunks because Whisper
   always pays for a 30-second window). Pinned to one Hugging Face commit and
   one transformers.js release; the Cache Storage entry is named for both, so
   a new version downloads once and the old entry is deleted.

   NO CLOUD, EVER. Nothing in this file or the worker calls
   the browser's built-in speech API or any hosted speech service. The only network use is
   the one-time download below, which carries no audio and no text. Any
   failure — no WASM, no SIMD, worker blocked, download failed, model
   evicted — is reported to the caller, which offers the guided version.

   AUDIO IS NEVER KEPT. Capture arrives in ~43 ms blocks, is resampled to
   16 kHz and held only for the utterance in progress, capped at MAX_UTT
   seconds. When an utterance ends — on a pause, on a phase change, or at
   the cap — its audio is transferred to the worker and the reference here
   is dropped. There is no array that grows with the session.

   SILENCE IS A DISPLAY SIGNAL AND A CHUNKING BOUNDARY, NOTHING ELSE. The
   engine has no way to reach the session's state machine: it reports
   voice on/off, input level, interim text and final text, and that is all. */
(function (global) {
  'use strict';

  var SELF = document.currentScript && document.currentScript.src;
  function sibling(name) { return new URL(name, SELF || location.href).href; }

  var TJS = '3.8.1';
  var MODEL = 'onnx-community/moonshine-tiny-ONNX';
  var REVISION = 'a6da1241cd305dcd64eab1edbd615f2bb9aabb95';
  var CACHE_PREFIX = 'sr-sv-stt-';
  var CACHE = CACHE_PREFIX + 'moonshine-tiny-q8@' + REVISION.slice(0, 7) + '+tjs' + TJS;
  var CDN = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@' + TJS + '/dist/';
  var HF = 'https://huggingface.co/' + MODEL + '/resolve/' + REVISION + '/';
  var LIB = {
    transformers: CDN + 'transformers.min.js',
    ortMjs: CDN + 'ort-wasm-simd-threaded.jsep.mjs',
    ortWasm: CDN + 'ort-wasm-simd-threaded.jsep.wasm'
  };
  var FILES = [
    LIB.transformers, LIB.ortMjs, LIB.ortWasm,
    HF + 'config.json', HF + 'generation_config.json', HF + 'preprocessor_config.json',
    HF + 'tokenizer.json', HF + 'tokenizer_config.json',
    HF + 'onnx/encoder_model_quantized.onnx', HF + 'onnx/decoder_model_merged_quantized.onnx'
  ];
  var COMPLETE = new URL('/__sr-sv-stt-complete', location.href).href;

  /* Tuning. Internal only — never shown, never counted down. */
  var RATE = 16000;
  var MIN_UTT = 0.35;       // seconds; shorter voiced bursts are dropped
  var MAX_UTT = 15;         // seconds; an utterance is committed at this length
  var HANG_MS = 800;        // silence after speech that ends an utterance
  var INTERIM_EVERY = 1.0;  // seconds of new speech between interim passes
  var PREROLL_BLOCKS = 8;   // ~340 ms kept before voice onset

  /* ── Capability probe ──────────────────────────────────────────────── */
  var SIMD_TEST = new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);
  function probe() {
    if (typeof WebAssembly !== 'object') return 'wasm';
    try { new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0])); } catch (e) { return 'wasm'; }
    if (!WebAssembly.validate(SIMD_TEST)) return 'simd';
    if (typeof Worker !== 'function') return 'worker';
    if (!global.caches || !global.isSecureContext) return 'cache';
    var AC = global.AudioContext || global.webkitAudioContext;
    if (!AC || !AC.prototype || !('audioWorklet' in AC.prototype)) return 'worklet';
    return null;
  }

  /* ── Cache ─────────────────────────────────────────────────────────── */
  function isCached() {
    if (!global.caches) return Promise.resolve(false);
    return caches.has(CACHE).then(function (has) {
      if (!has) return false;
      return caches.open(CACHE).then(function (c) {
        return Promise.all([COMPLETE].concat(FILES).map(function (u) { return c.match(u); }))
          .then(function (rs) { return rs.every(Boolean); });
      });
    }).catch(function () { return false; });
  }

  function dropStale() {
    return caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k.indexOf(CACHE_PREFIX) === 0 && k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    });
  }

  /* One-time download. opts.onSize(bytes) fires once the real size is
     known, before any body is read; opts.onProgress(0..1) as bytes land.
     Sizes are what travels over the wire (Content-Length), so a compressed
     file counts as its compressed size. A failure or abort deletes the
     partial entry — a half-cached model is never mistaken for a whole one. */
  function download(opts) {
    opts = opts || {};
    var signal = opts.signal;
    var sizes = [];
    return dropStale().then(function () {
      return Promise.all(FILES.map(function (u) {
        return fetch(u, { method: 'HEAD', signal: signal, credentials: 'omit' }).then(function (r) {
          if (!r.ok) throw new Error('size check failed');
          return +r.headers.get('content-length') || 0;
        });
      }));
    }).then(function (s) {
      sizes = s;
      var total = s.reduce(function (a, b) { return a + b; }, 0);
      if (opts.onSize) opts.onSize(total);
      return caches.open(CACHE).then(function (cache) {
        var done = 0, k = 0;
        function nextFile() {
          if (k === FILES.length) return cache.put(COMPLETE, new Response('ok'));
          var url = FILES[k], size = sizes[k];
          return fetch(url, { signal: signal, credentials: 'omit' }).then(function (r) {
            if (!r.ok || !r.body) throw new Error('download failed');
            var reader = r.body.getReader(), parts = [], read = 0;
            function pump() {
              return reader.read().then(function (x) {
                if (x.done) return;
                parts.push(x.value); read += x.value.length;
                if (opts.onProgress && total) opts.onProgress((done + Math.min(read, size)) / total);
                return pump();
              });
            }
            return pump().then(function () {
              var blob = new Blob(parts, { type: r.headers.get('content-type') || 'application/octet-stream' });
              parts = null;
              return cache.put(url, new Response(blob, { headers: { 'content-type': blob.type } }));
            });
          }).then(function () {
            done += size; k++;
            if (opts.onProgress && total) opts.onProgress(done / total);
            return nextFile();
          });
        }
        return nextFile();
      }).then(function () { return sizes.reduce(function (a, b) { return a + b; }, 0); });
    }).catch(function (err) {
      return caches.delete(CACHE).then(function () { throw err; });
    });
  }

  /* ── Engine ────────────────────────────────────────────────────────── */
  function createEngine(cb) {
    cb = cb || {};
    var worker = null, readyP = null, failed = false;
    var ctx = null, modP = null, src = null, node = null, track = null, onTrackEnd = null;
    var phase = null, uttId = 0;
    var utt = [], uttLen = 0, sinceInterim = 0, preroll = [];
    var speaking = false, voiceRun = 0, silentMs = 0, noise = 0.004;
    var interimBusy = false, pendingFinals = 0, finalWaiters = [];
    var finalized = {};
    var dbg = { maxBuffered: 0, commits: 0 };
    var resAcc = 0, resCnt = 0, resFrac = 0, resStep = 3;

    function fail(kind, detail) {
      if (kind === 'transcribe') {
        if (failed) return;
        failed = true;
        utt = []; uttLen = 0; preroll = [];
        pendingFinals = 0; flushWaiters();
      }
      if (cb.onError) cb.onError(kind, detail);
    }
    function flushWaiters() { var w = finalWaiters; finalWaiters = []; w.forEach(function (f) { f(); }); }

    /* The audio graph and its worklet module are set up here, with the
       model, so that once PRE_STATE is showing the session needs nothing
       further from the network — not even this site. The context stays
       suspended until start(). */
    function audio() {
      if (ctx) return modP;
      var AC = global.AudioContext || global.webkitAudioContext;
      ctx = new AC();
      resStep = ctx.sampleRate / RATE;
      modP = ctx.audioWorklet.addModule(sibling('saferise-sovereign-capture.js'));
      return modP;
    }

    function prepare() {
      if (readyP) return readyP;
      var modReady = audio();
      readyP = new Promise(function (resolve, reject) {
        try { worker = new Worker(sibling('saferise-sovereign-stt-worker.js'), { type: 'module' }); }
        catch (e) { reject({ code: 'worker' }); return; }
        worker.onerror = function (e) {
          if (e && e.preventDefault) e.preventDefault();
          reject({ code: 'worker' });
          fail('transcribe', 'worker');
        };
        worker.onmessage = function (e) {
          var m = e.data;
          if (m.type === 'ready') {
            modReady.then(function () { resolve({ ms: m.ms }); }, function () { reject({ code: 'worklet' }); });
            return;
          }
          if (m.type === 'error' && m.stage === 'init') { reject({ code: m.code, message: m.message }); fail('transcribe', m.code); return; }
          if (m.type === 'error') {
            if (m.kind === 'interim') { interimBusy = false; return; }
            fail('transcribe', m.message); return;
          }
          if (m.type === 'result') onResult(m);
        };
        worker.postMessage({ type: 'init', cacheName: CACHE, model: MODEL, revision: REVISION, lib: LIB });
      });
      return readyP;
    }

    function onResult(m) {
      if (m.kind === 'interim') {
        interimBusy = false;
        if (!finalized[m.id] && m.id === uttId && cb.onInterim) cb.onInterim(m.phase || phase, m.text);
        return;
      }
      finalized[m.id] = true;
      var p = pending[m.id]; delete pending[m.id];
      if (cb.onInterim) cb.onInterim(p, '');
      if (m.text && cb.onFinal) cb.onFinal(p, m.text);
      pendingFinals = Math.max(0, pendingFinals - 1);
      if (!pendingFinals) flushWaiters();
    }
    var pending = {};

    function concat(blocks, len) {
      var out = new Float32Array(len), o = 0;
      for (var i = 0; i < blocks.length; i++) { out.set(blocks[i], o); o += blocks[i].length; }
      return out;
    }

    function commit() {
      var id = uttId, len = uttLen, blocks = utt;
      utt = []; uttLen = 0; sinceInterim = 0; uttId++;
      if (failed || len < MIN_UTT * RATE) { finalized[id] = true; if (cb.onInterim) cb.onInterim(phase, ''); return; }
      var audio = concat(blocks, len);
      blocks = null;
      pending[id] = phase; pendingFinals++; dbg.commits++;
      worker.postMessage({ type: 'transcribe', id: id, kind: 'final', audio: audio }, [audio.buffer]);
    }

    function interim() {
      if (failed || interimBusy || pendingFinals || !worker) return;
      interimBusy = true; sinceInterim = 0;
      var copy = concat(utt, uttLen);
      worker.postMessage({ type: 'transcribe', id: uttId, kind: 'interim', audio: copy }, [copy.buffer]);
    }

    function resample(block) {
      var out = new Float32Array(Math.ceil(block.length / resStep) + 2), n = 0;
      for (var i = 0; i < block.length; i++) {
        resAcc += block[i]; resCnt++; resFrac += 1;
        if (resFrac >= resStep) { out[n++] = resAcc / resCnt; resAcc = 0; resCnt = 0; resFrac -= resStep; }
      }
      return out.subarray(0, n);
    }

    function onBlock(raw) {
      var b = resample(raw);
      raw = null;
      if (!b.length) return;
      var sum = 0;
      for (var i = 0; i < b.length; i++) sum += b[i] * b[i];
      var rms = Math.sqrt(sum / b.length);
      var blockMs = b.length / RATE * 1000;
      if (cb.onLevel) cb.onLevel(rms);

      var voiced = rms > Math.max(0.012, noise * 3.5);
      if (!speaking && !voiced) noise = noise * 0.95 + rms * 0.05;

      if (voiced) {
        voiceRun++; silentMs = 0;
        if (!speaking && voiceRun >= 2) {
          speaking = true;
          utt = preroll; uttLen = preroll.reduce(function (a, x) { return a + x.length; }, 0); preroll = [];
          if (cb.onVoice) cb.onVoice(true);
        }
      } else {
        voiceRun = 0;
        if (speaking) silentMs += blockMs;
      }

      if (speaking) {
        utt.push(b); uttLen += b.length; sinceInterim += b.length;
        if (uttLen > dbg.maxBuffered) dbg.maxBuffered = uttLen;
        if (silentMs >= HANG_MS) {
          speaking = false;
          if (cb.onVoice) cb.onVoice(false);
          commit();
        } else if (uttLen >= MAX_UTT * RATE) {
          commit();
        } else if (sinceInterim >= INTERIM_EVERY * RATE) {
          interim();
        }
      } else {
        preroll.push(b);
        if (preroll.length > PREROLL_BLOCKS) preroll.shift();
      }
    }

    function start(stream, ph) {
      phase = ph;
      stopCapture();
      track = stream.getAudioTracks()[0] || null;
      if (track) {
        onTrackEnd = function () { fail('mic-ended'); };
        track.addEventListener('ended', onTrackEnd);
      }
      return audio().then(function () {
        if (!ctx) return;
        src = ctx.createMediaStreamSource(stream);
        node = new AudioWorkletNode(ctx, 'sr-sv-capture');
        node.port.onmessage = function (e) { onBlock(e.data); };
        src.connect(node);
        return ctx.resume();
      });
    }

    function endUtterance() {
      if (speaking) { speaking = false; if (cb.onVoice) cb.onVoice(false); }
      if (uttLen) commit();
      preroll = []; voiceRun = 0; silentMs = 0;
    }

    function setPhase(ph) { endUtterance(); phase = ph; }

    function stopCapture() {
      if (node) { node.port.onmessage = null; try { node.disconnect(); } catch (e) {} node = null; }
      if (src) { try { src.disconnect(); } catch (e) {} src = null; }
      if (track && onTrackEnd) track.removeEventListener('ended', onTrackEnd);
      track = null; onTrackEnd = null;
      if (ctx && ctx.state === 'running') ctx.suspend();
      resAcc = 0; resCnt = 0; resFrac = 0;
    }

    /* Ends capture and resolves once every committed utterance has been
       transcribed (or the transcriber has failed). */
    function stop() {
      endUtterance();
      stopCapture();
      if (!pendingFinals || failed) return Promise.resolve();
      return new Promise(function (r) { finalWaiters.push(r); });
    }

    function destroy() {
      stopCapture();
      if (ctx) { ctx.close(); ctx = null; modP = null; }
      utt = []; uttLen = 0; preroll = [];
      if (worker) { worker.terminate(); worker = null; }
      flushWaiters();
    }

    return {
      prepare: prepare, start: start, setPhase: setPhase, stop: stop, destroy: destroy,
      failed: function () { return failed; },
      _debug: function () { return { buffered: uttLen, preroll: preroll.length, maxBuffered: dbg.maxBuffered, commits: dbg.commits, pendingFinals: pendingFinals }; }
    };
  }

  global.SafeRiseSTT = {
    MODEL: MODEL, REVISION: REVISION, CACHE: CACHE, FILES: FILES,
    probe: probe, isCached: isCached, download: download, createEngine: createEngine
  };
})(window);
