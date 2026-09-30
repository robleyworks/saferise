/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — netlify/functions/lib/provider.js · SR-469 (SOV-4)
   One interface for the model call:
     callModel(cfg, payload, deps) -> Promise<{ ok:true, text, usage }
                                       | { ok:false, status?, aborted?, kind? }>
   cfg  = { style, endpoint, apiKey, model, timeoutMs }   (from environment)
   deps = { fetch, AbortController, contract }            (injected, so tests stub them)

   Provider-agnostic by configuration: endpoint, key and model are each one
   environment variable. The wire format is chosen by SR_READING_API_STYLE;
   'anthropic' (the Messages API) is the one implemented. Moving to a provider
   with a different wire format means adding one style function here — the
   handler, the contract and the guard do not change.

   No retries. One call, one timeout, one answer. The key is only ever read
   from cfg, which the handler fills from process.env; it never appears in a
   response, a log line or an error message. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SRReadingProvider = factory();
})(this, function () {
  'use strict';

  var STYLES = {
    /* Anthropic Messages API: POST {endpoint}/v1/messages, x-api-key,
       anthropic-version 2023-06-01; JSON output via output_config.format. */
    anthropic: function (cfg, payload, contract) {
      return {
        url: String(cfg.endpoint).replace(/\/+$/, '') + '/v1/messages',
        headers: { 'content-type': 'application/json', 'x-api-key': cfg.apiKey, 'anthropic-version': '2023-06-01' },
        body: {
          model: cfg.model,
          max_tokens: 1500,
          system: contract.SYSTEM,
          messages: [{ role: 'user', content: contract.userMessage(payload) }],
          output_config: { format: { type: 'json_schema', schema: contract.SCHEMA } },
          /* SR-479 · processing pinned to the United States, so the location is
             known and matches privacy.html §6 rather than "wherever capacity is".
             The API offers us | global only; there is no EU option. */
          inference_geo: 'us'
        },
        read: function (data) {
          if (!data || data.stop_reason === 'refusal' || data.stop_reason === 'max_tokens') return null;
          var block = (data.content || []).filter(function (b) { return b && b.type === 'text'; })[0];
          return block ? { text: block.text, usage: data.usage || null } : null;
        }
      };
    }
  };

  function callModel(cfg, payload, deps) {
    var style = STYLES[cfg.style || 'anthropic'];
    if (!style || !cfg.endpoint || !cfg.apiKey || !cfg.model) return Promise.resolve({ ok: false, kind: 'config' });
    var req = style(cfg, payload, deps.contract);
    var ctrl = new deps.AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, cfg.timeoutMs || 8000);
    return deps.fetch(req.url, { method: 'POST', headers: req.headers, body: JSON.stringify(req.body), signal: ctrl.signal })
      .then(function (res) {
        if (!res.ok) return { ok: false, status: res.status };
        return res.json().then(function (data) {
          var out = req.read(data);
          return out ? { ok: true, text: out.text, usage: out.usage } : { ok: false, kind: 'malformed' };
        }, function () { return { ok: false, kind: 'malformed' }; });
      }, function (err) {
        return { ok: false, aborted: !!(err && (err.name === 'AbortError' || ctrl.signal.aborted)) };
      })
      .then(function (r) { clearTimeout(timer); return r; });
  }

  return { callModel: callModel, STYLES: Object.keys(STYLES) };
});
