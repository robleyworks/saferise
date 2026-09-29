/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-sovereign-stt-worker.js · SR-463 (SOV-3)
   On-device speech-to-text for the Sovereign session. A module worker, so
   the model never runs on the main thread while a member is speaking.

   Model: onnx-community/moonshine-tiny-ONNX, q8, pinned to one commit, run
   by transformers.js 3.8.1 on ONNX Runtime's WASM backend, single-threaded.
   All of it self-hosted under assets/vendor/speech/ (SR-464 A2).

   THIS WORKER NEVER FETCHES. fetch is replaced below, before anything else
   loads, with one that refuses every URL except blob: and data:. The model
   weights and the WASM binary are read out of the Cache Storage entry the
   main thread filled during the one-time download. The two JS modules are
   imported from their same-origin URLs — the production CSP allows scripts
   from 'self' only, so blob: modules are not an option — and are covered by
   /assets/* immutable HTTP caching. A cache miss is an error, never a quiet
   fetch: there is no cloud fallback of any kind.

   Audio arrives as a Float32Array at 16 kHz, one utterance at a time, is
   transcribed, and is dropped. Nothing here keeps it. */

const netFetch = self.fetch.bind(self);
self.fetch = function (input, init) {
  const url = typeof input === 'string' ? input : (input && input.url) || String(input);
  if (/^(blob|data):/.test(url)) return netFetch(input, init);
  return Promise.reject(new TypeError('sr-sv: the speech worker does not use the network'));
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
  async function get(url) {
    const r = await cache.match(url);
    if (!r) { const e = new Error('model file missing from cache'); e.code = 'evicted'; throw e; }
    return r;
  }
  const wasm = await (await get(msg.lib.ortWasm)).arrayBuffer();

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
  /* The loader module comes from its same-origin URL; the binary is handed
     over from the cache so it is never fetched again. (SR-463 used blob:
     URLs here; the production CSP does not allow blob: scripts.) */
  wa.wasmPaths = { mjs: msg.lib.ortMjs, wasm: msg.lib.ortWasm };
  wa.wasmBinary = wasm;

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
