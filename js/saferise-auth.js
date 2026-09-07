/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — real auth + entitlement · js/saferise-auth.js
   Phase 2/3 of pass/AUTH-PAYMENTS-BRIEF.md.

   Talks to Supabase over plain fetch() against its REST endpoints
   (GoTrue for auth, PostgREST for the members/usage_events tables) rather
   than pulling in the supabase-js SDK. Nothing else in this repo loads an
   external <script>, and RLS does the real enforcement server-side either
   way — this file only needs to carry a bearer token and a URL, not a
   full client library.

   SUPABASE_URL / SUPABASE_ANON_KEY are placeholders. There is no Supabase
   project yet (Phase 1's migration has not been run against one) — fill
   these in once one exists. The anon key is safe in client JS by design
   (Supabase's anon key is meant to be public; RLS is what actually
   protects data, not keeping this key secret). The service-role key must
   NEVER appear here or in any other browser-loaded file — it belongs only
   in a Netlify environment variable, read by the Phase 5 webhook function.

   THE ENTITLEMENT CACHE IS MEMORY-ONLY, ON PURPOSE. A subscription can
   lapse between page loads; anything durable (localStorage, a cookie) is
   a stale "yes" a member could also just leave in place by never letting
   it expire, or edit directly in devtools. entitled() answers from a
   variable that resets to false on every fresh page load until
   checkEntitlement() has actually asked the server. */
(function (global) {
  'use strict';

  var SUPABASE_URL = 'https://YOUR-PROJECT-REF.supabase.co';
  var SUPABASE_ANON_KEY = 'YOUR-ANON-KEY';

  var SESSION_KEY = 'sr.auth.session';
  /* Session tokens DO persist (localStorage) — unlike the entitlement
     flag above, a JWT is signed by Supabase; a member editing it in
     devtools just produces a token the server rejects, not a forged
     session. This mirrors how js/saferise-access.js's placeholder
     session already persists, so signing in survives a reload the same
     way it always has. */

  var mem = {}, persistent = false;
  try {
    window.localStorage.setItem('sr.auth.probe', '1');
    window.localStorage.removeItem('sr.auth.probe');
    persistent = true;
  } catch (e) { persistent = false; }

  function readSession() {
    try {
      var raw = persistent ? window.localStorage.getItem(SESSION_KEY) : mem[SESSION_KEY];
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function writeSession(s) {
    if (s === null) {
      try { if (persistent) window.localStorage.removeItem(SESSION_KEY); } catch (e) {}
      delete mem[SESSION_KEY];
      return;
    }
    var raw = JSON.stringify(s);
    try { if (persistent) window.localStorage.setItem(SESSION_KEY, raw); else mem[SESSION_KEY] = raw; }
    catch (e) { mem[SESSION_KEY] = raw; }
  }

  /* Decodes the JWT payload to read id/email/exp without a network round
     trip. Does not verify the signature — that's the server's job on
     every request that matters (RLS runs against the token Supabase
     itself validates); this is only ever used to decide whether to
     bother sending a request at all. */
  function decodeJwt(token) {
    try {
      var part = token.split('.')[1];
      var json = atob(part.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(json);
    } catch (e) { return null; }
  }

  var session = readSession();     // {access_token, refresh_token}
  var entitledCache = false;       // memory-only — see header comment
  var statusCache = null;          // memory-only: {subscription_status, entitled_until} or null
  var listeners = [];

  function notify() { listeners.forEach(function (fn) { try { fn(); } catch (e) {} }); }

  function currentUser() {
    if (!session || !session.access_token) return null;
    var claims = decodeJwt(session.access_token);
    if (!claims || !claims.sub) return null;
    if (claims.exp && Date.now() / 1000 > claims.exp) return null; // expired, not yet refreshed
    return { id: claims.sub, email: claims.email || null };
  }

  function authHeaders(extra) {
    var h = { 'apikey': SUPABASE_ANON_KEY, 'Content-Type': 'application/json' };
    if (session && session.access_token) h['Authorization'] = 'Bearer ' + session.access_token;
    if (extra) for (var k in extra) h[k] = extra[k];
    return h;
  }

  function gotrue(path, body) {
    return fetch(SUPABASE_URL + '/auth/v1/' + path, {
      method: 'POST', headers: authHeaders(), body: JSON.stringify(body || {})
    }).then(function (r) {
      return r.json().then(function (json) {
        if (!r.ok) throw new Error((json && (json.error_description || json.msg || json.error)) || ('auth request failed: ' + r.status));
        return json;
      });
    });
  }

  function setSessionFromAuthResponse(json) {
    if (json && json.access_token) {
      session = { access_token: json.access_token, refresh_token: json.refresh_token };
      writeSession(session);
    }
  }

  /* Refreshes an expired access token using the stored refresh token.
     Best-effort: a failure just leaves the member signed out, same as
     never having a session, rather than throwing into a page's own
     render path. */
  function tryRefresh() {
    if (!session || !session.refresh_token) return Promise.resolve(false);
    return gotrue('token?grant_type=refresh_token', { refresh_token: session.refresh_token })
      .then(function (json) { setSessionFromAuthResponse(json); return true; })
      .catch(function () { session = null; writeSession(null); return false; });
  }

  function ensureLiveSession() {
    var u = currentUser();
    if (u) return Promise.resolve(u);
    if (session && session.refresh_token) {
      return tryRefresh().then(function () { return currentUser(); });
    }
    return Promise.resolve(null);
  }

  /* The only real check: asks PostgREST for this member's own row, which
     RLS restricts to `where id = auth.uid()` regardless of what id we ask
     for here. Absence of a row (a brand-new signup mid-trigger, or a
     network failure) reads as not entitled — fails closed, not open. */
  function checkEntitlement() {
    var u = currentUser();
    if (!u) { entitledCache = false; statusCache = null; notify(); return Promise.resolve(false); }
    return fetch(SUPABASE_URL + '/rest/v1/members?select=entitled,subscription_status,entitled_until&id=eq.' + encodeURIComponent(u.id), {
      headers: authHeaders()
    }).then(function (r) { return r.ok ? r.json() : []; })
      .then(function (rows) {
        var row = rows && rows[0];
        entitledCache = !!(row && row.entitled);
        statusCache = row
          ? { subscription_status: row.subscription_status || null, entitled_until: row.entitled_until || null }
          : null;
        notify();
        return entitledCache;
      })
      .catch(function () { entitledCache = false; statusCache = null; notify(); return false; });
  }

  function logSignupEvent(userId) {
    return fetch(SUPABASE_URL + '/rest/v1/usage_events', {
      method: 'POST', headers: authHeaders({ 'Prefer': 'return=minimal' }),
      body: JSON.stringify({ member_id: userId, event: 'signup' })
    }).catch(function () {}); // fire-and-forget, per Phase 6's own rule for events generally
  }

  function signUp(email, password) {
    return gotrue('signup', { email: email, password: password }).then(function (json) {
      setSessionFromAuthResponse(json);
      var u = currentUser();
      /* The members row itself is created server-side by the
         handle_new_user() trigger on auth.users (see the migration) —
         not here. A client-side insert would need entitled to be
         settable in the same request that creates the row, which is
         exactly the gap Phase 1's "no INSERT policy" closes. This call
         only logs the event; it never touches the members table. */
      if (u) logSignupEvent(u.id);
      notify();
      return u;
    });
  }

  function signIn(email, password) {
    return gotrue('token?grant_type=password', { email: email, password: password }).then(function (json) {
      setSessionFromAuthResponse(json);
      notify();
      return checkEntitlement().then(function () { return currentUser(); });
    });
  }

  function sendMagicLink(email) {
    // "magic link if trivial" — Phase 2. One call, no password involved.
    return gotrue('otp', { email: email, create_user: true });
  }

  function signOut() {
    var token = session && session.access_token;
    var done = token
      ? fetch(SUPABASE_URL + '/auth/v1/logout', { method: 'POST', headers: authHeaders() }).catch(function () {})
      : Promise.resolve();
    return done.then(function () {
      session = null; writeSession(null);
      entitledCache = false;
      notify();
    });
  }

  function onChange(fn) { if (typeof fn === 'function') listeners.push(fn); }

  /* Runs once, at load: revives the stored session (refreshing it if the
     access token has expired) and, if a member is signed in, fetches
     their real entitlement before anything else touches entitled().
     Every gated page should `await srAuth.ready` before deciding what to
     render — see relationship-healing.html / professional-performance.html
     for the pattern. */
  var ready = ensureLiveSession().then(function () { return checkEntitlement(); }).catch(function () {});

  global.srAuth = {
    ready: ready,
    user: currentUser,
    entitled: function () { return entitledCache; },
    status: function () { return statusCache; }, // {subscription_status, entitled_until} or null — memory-only, same as entitled()
    refreshEntitlement: checkEntitlement,
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    sendMagicLink: sendMagicLink,
    onChange: onChange
  };
})(window);
