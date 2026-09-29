/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-sovereign-stt-worker.js · SR-463 (SOV-3)
   On-device speech-to-text for the Sovereign session. A module worker, so
   the model never runs on the main thread while a member is speaking.

   Model: onnx-community/moonshine-tiny-ONNX, q8, pinned to one commit, run
   by transformers.js 3.8.1 on ONNX Runtime's WASM backend, single-threaded.

   THIS WORKER NEVER TOUCHES THE NETWORK. fetch is replaced below, before
   anything else loads, with one that refuses every URL except blob: and
   data:. Everything it needs — the library, the runtime, the WASM binary,
   the model — is read out of the Cache Storage entry the main thread filled
   during the one-time download (js/saferise-sovereign-stt.js). A cache miss
   is an error, never a quiet fetch: there is no cloud fallback of any kind.

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
  const libURL = URL.createObjectURL(new Blob([await (await get(msg.lib.transformers)).text()], { type: 'text/javascript' }));
  const mjsURL = URL.createObjectURL(new Blob([await (await get(msg.lib.ortMjs)).text()], { type: 'text/javascript' }));
  const wasmURL = URL.createObjectURL(new Blob([await (await get(msg.lib.ortWasm)).arrayBuffer()], { type: 'application/wasm' }));

  const T = await import(libURL);
  T.env.allowLocalModels = false;
  T.env.useBrowserCache = false;
  T.env.useCustomCache = true;
  T.env.customCache = {
    match: async (key) => (await cache.match(String(key))) || undefined,
    put: async () => {}
  };
  const wa = T.env.backends.onnx.wasm;
  wa.numThreads = 1;
  wa.proxy = false;
  /* Both halves of the runtime point at blob: URLs made from the cache.
     Handing over wasmBinary instead does not work: the loader then builds a
     path from import.meta.url, which is itself a blob: URL, and throws. */
  wa.wasmPaths = { mjs: mjsURL, wasm: wasmURL };

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
