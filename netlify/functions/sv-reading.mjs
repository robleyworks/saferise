/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — netlify/functions/sv-reading.mjs · SR-469 (SOV-4)
   POST /.netlify/functions/sv-reading — the framework reading.

   Glue only: every decision is in lib/reading-core.js (tested without a
   runtime in tests/sv-reading/). This file wires it to the environment,
   Netlify Blobs (the per-member allowance) and Supabase (who is asking).

   ENVIRONMENT (set in Netlify → Site configuration → Environment variables;
   never in code, never in a client-delivered file):
     SR_READING_API_KEY      provider key — required
     SR_READING_ENDPOINT     e.g. https://api.anthropic.com — required
     SR_READING_MODEL        e.g. claude-haiku-4-5 — required
     SR_READING_API_STYLE    wire format; default 'anthropic'
     SR_READING_TIMEOUT_MS   default 8000 (under Netlify's 10 s function limit)
     SR_READING_LIMIT_DAY    readings per member per rolling 24 h; default 4
     SR_READING_LIMIT_30D    readings per member per rolling 30 days; default 40
     SR_READING_ID_SALT      secret salt for hashing member ids in the limit store — required
     SR_SUPABASE_URL         the project URL — required
     SR_SUPABASE_ANON_KEY    the publishable key (already public in js/saferise-auth.js) — required

   What leaves this function for the provider: phase-tagged transcript text
   and the two ratings (lib/prompt-contract.js userMessage). No identity.
   Nothing here logs content. */
import { createRequire } from 'node:module';
import { getStore } from '@netlify/blobs';

const require = createRequire(import.meta.url);
const core = require('./lib/reading-core.js');
const contract = require('./lib/prompt-contract.js');
const provider = require('./lib/provider.js');

const env = (k, d) => (process.env[k] !== undefined && process.env[k] !== '' ? process.env[k] : d);
const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
});

async function verifyMember(token) {
  const url = env('SR_SUPABASE_URL'), anon = env('SR_SUPABASE_ANON_KEY');
  if (!url || !anon) return null;
  const res = await fetch(url.replace(/\/+$/, '') + '/auth/v1/user', {
    headers: { apikey: anon, authorization: 'Bearer ' + token }
  });
  if (!res.ok) return null;
  const user = await res.json();
  return user && user.id ? String(user.id) : null;
}

async function hashId(id) {
  const salt = env('SR_READING_ID_SALT');
  if (!salt) throw new Error('config');
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + ':' + id));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default async (req) => {
  if (req.method !== 'POST') return json(405, { status: 'invalid' });
  let body;
  try { body = await req.json(); } catch (e) { return json(400, { status: 'invalid' }); }
  const auth = req.headers.get('authorization') || '';
  const token = /^Bearer\s+(.+)$/i.exec(auth);

  const store = getStore('sr-sv-reading-allowance');
  const deps = {
    verifyMember,
    hashId,
    limitStore: {
      get: (key) => store.get(key, { type: 'json' }),
      set: (key, value) => store.setJSON(key, value)
    },
    callModel: (payload) => provider.callModel({
      style: env('SR_READING_API_STYLE', 'anthropic'),
      endpoint: env('SR_READING_ENDPOINT'),
      apiKey: env('SR_READING_API_KEY'),
      model: env('SR_READING_MODEL'),
      timeoutMs: +env('SR_READING_TIMEOUT_MS', 8000)
    }, payload, { fetch, AbortController, contract }),
    /* Token counts only — never content — so per-reading cost can be read
       from the function log (V13). */
    onUsage: (u) => console.log('sv-reading usage', JSON.stringify({ input_tokens: u.input_tokens, output_tokens: u.output_tokens })),
    now: () => Date.now(),
    limits: { perDay: +env('SR_READING_LIMIT_DAY', 4), per30Days: +env('SR_READING_LIMIT_30D', 40) }
  };
  const out = await core.runReading(deps, token ? token[1] : null, body);
  return json(out.status, out.body);
};
