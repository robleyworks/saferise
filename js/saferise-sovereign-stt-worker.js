/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-sovereign-stt-worker.js · SR-463 (SOV-3)
   On-device speech-to-text for the Sovereign session. A module worker, so
   the model never runs on the main thread while a member is speaking.

   Model: onnx-community/moonshine-tiny-ONNX, q8, pinned to one commit, run
   by transformers.js 3.8.1 on ONNX Runtime's WASM backend, single-threaded.
   All of it self-hosted under assets/vendor/speech/ (SR-464 A2).

   THIS WORKER NEVER REACHES THE NETWORK. fetch is replaced below, before
   anything else loads, with one that answers only from the Cache Storage
   entry the main thread filled during the one-time download (and blob:/
   data:), and refuses everything else. The model weights and the WASM
   binary come from that cache. The two JS modules are
   imported from their same-origin URLs — the production CSP allows scripts
   from 'self' only, so blob: modules are not an option — and are covered by
   /assets/* immutable HTTP caching. A cache miss is an error, never a quiet
   fetch: there is no cloud fallback of any kind.

   Audio arrives as a Float32Array at 16 kHz, one utterance at a time, is
   transcribed, and is dropped. Nothing here keeps it. */

/* fetch answers from the model's Cache Storage entry and nowhere else:
   blob:/data: pass through, a URL the one-time download cached is served
   from the cache, and everything else is refused. This is how ONNX Runtime
   gets its WASM by URL — which lets it compile while streaming — without
   the worker ever reaching the network. */
const netFetch = self.fetch.bind(self);
let modelCache = null;
self.fetch = function (input, init) {
  const url = typeof input === 'string' ? input : (input && input.url) || String(input);
  if (/^(blob|data):/.test(url)) return netFetch(input, init);
  if (!modelCache) return Promise.reject(new TypeError('sr-sv: the speech worker does not use the network'));
  return modelCache.match(url).then((r) => r || Promise.reject(new TypeError('sr-sv: not in the model cache; the speech worker does not use the network')));
};

let asr = null;
let ready = null;
let chain = Promise.resolve();

/* A rejection the library leaves unhandled during load would otherwise
   hang the session silently. It fails the load instead. */
let failLoad = null;
self.addEventListener('unhandledrejection', (e) => {
  if (failLoad) { e.preventDefault(); failLoad(e.reason); }
});

async function load(msg) {
  const t0 = performance.now();
  const cache = await caches.open(msg.cacheName);
  modelCache = cache;
  async function get(url) {
    const r = await cache.match(url);
    if (!r) { const e = new Error('model file missing from cache'); e.code = 'evicted'; throw e; }
    return r;
  }
  await get(msg.lib.ortWasm);   // present, or fail now with 'evicted'

  const T = await import(msg.lib.transformers);
  T.env.allowLocalModels = false;
  T.env.useBrowserCache = false;
  T.env.useCustomCache = true;
  /* transformers.js asks for model files by Hugging Face URL (and by a
     /models/ local path first). Both are mapped onto the self-hosted copy
     in the cache; nothing is ever fetched from Hugging Face. */
  const tail = new RegExp(msg.model.split('/').pop().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '/(?:resolve/[^/]+/)?(.+)$');
  T.env.customCache = {
    match: async (key) => {
      const m = tail.exec(String(key));
      return m ? ((await cache.match(msg.modelBase + m[1])) || undefined) : undefined;
    },
    put: async () => {}
  };
  const wa = T.env.backends.onnx.wasm;
  wa.numThreads = 1;
  wa.proxy = false;
  /* The loader module comes from its same-origin URL. The binary is named
     by URL too, so it compiles while streaming; the fetch above serves it
     from the cache. Handing it over as wasmBinary instead took cold start
     from ~1.4 s to ~12.5 s (non-streaming compile of 21.6 MB) — SR-464 B4.
     (SR-463 used blob: URLs; the production CSP allows 'self' scripts only.) */
  wa.wasmPaths = { mjs: msg.lib.ortMjs, wasm: msg.lib.ortWasm };

  asr = await T.pipeline('automatic-speech-recognition', msg.model, {
    dtype: 'q8', device: 'wasm', revision: msg.revision
  });
  /* One short pass on silence so the first real utterance is not the one
     that pays for compilation. */
  await asr(new Float32Array(8000));
  return performance.now() - t0;
}

self.onmessage = (e) => {
  const msg = e.data;
  if (msg.type === 'init') {
    if (!ready) {
      ready = Promise.race([load(msg), new Promise((_, reject) => { failLoad = reject; })]);
      ready.then(() => { failLoad = null; }, () => { failLoad = null; });
      ready.then(
        (ms) => self.postMessage({ type: 'ready', ms }),
        (err) => self.postMessage({ type: 'error', stage: 'init', code: err.code || 'load', message: String(err && err.message || err) })
      );
    }
    return;
  }
  if (msg.type === 'transcribe') {
    chain = chain.then(async () => {
      try {
        await ready;
        const t0 = performance.now();
        const out = await asr(msg.audio);
        msg.audio = null;
        self.postMessage({ type: 'result', id: msg.id, kind: msg.kind, text: (out && out.text || '').trim(), ms: performance.now() - t0 });
      } catch (err) {
        msg.audio = null;
        self.postMessage({ type: 'error', stage: 'transcribe', id: msg.id, kind: msg.kind, message: String(err && err.message || err) });
      }
    });
  }
};
