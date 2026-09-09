/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — access gate · SR-326, real backend since pass/AUTH-PAYMENTS-BRIEF.md

   This is the "one file, not a rewrite" swap this module's own original
   header promised: nothing outside this file reads a session, a token or
   an entitlement flag, so wiring it to real Supabase-backed auth (via
   js/saferise-auth.js) only means rewriting the six functions' bodies.
   Every existing call site — protocol.html's SR-326 gate, dashboard.html's
   CTAs — keeps working unchanged.

   isFree() changed. The placeholder treated exactly one protocol id
   (FREE_PROTOCOL_ID = 't1-p01') as free; Phase 3 of the brief is explicit
   that all of Track 01 is free, not one protocol in it. Fixed to check
   the track prefix instead of a single id — this is a real behaviour
   change from the placeholder, flagged in the pass report, not a silent
   side effect.

   READY. New: SafeRiseAccess.ready, a promise that resolves once the real
   entitlement check has actually returned. hasAccess()/currentUser() are
   synchronous reads of srAuth's own cache, same shape as the placeholder
   always had — but a caller that runs its gate check before that cache is
   populated (page load, before any network round trip completes) reads a
   member as not-yet-entitled even when they are. protocol.html's own gate
   is updated to await this; anything else calling hasAccess() at load time
   should do the same. */
(function (global) {
  'use strict';

  if (!global.srAuth) {
    console.error('SafeRiseAccess: js/saferise-auth.js did not load before js/saferise-access.js on ' +
      (global.location ? global.location.pathname : 'this page') +
      ' — treating this session as unentitled.');
  }

  var FREE_TRACK_PREFIX = 't1-';

  /* PASS-protocol-access, Section B2 · the local-work bypass. A hostname
     check, not a flag, not a URL parameter, not a stored value — the only
     shape that cannot be triggered on the production domain at all, so
     there is nothing to remember to remove before launch. Deliberately
     excludes *.netlify.app: a preview deploy is a publicly reachable URL,
     and if any preview link has ever been shared, including it here opens
     the whole platform to whoever has that link. Reported in
     docs/fix-register.md rather than assumed. */
  function srIsDev() {
    var h = global.location ? global.location.hostname : '';
    return h === 'localhost' || h === '127.0.0.1' || h === '' || h.endsWith('.local');
  }

  function currentUser() {
    if (!global.srAuth) return null;
    var u = global.srAuth.user();
    return u ? { email: u.email, id: u.id } : null;
  }
  function isFree(id) {
    return typeof id === 'string' && id.indexOf(FREE_TRACK_PREFIX) === 0;
  }
  function hasAccess(id) {
    if (srIsDev()) return true;
    if (isFree(id)) return true;
    if (!global.srAuth) return false;
    return !!currentUser() && !!global.srAuth.entitled();
  }

  /* PASS-protocol-access, Section B4 · one prompt, one place. Every gated
     surface that is not already its own bespoke wall (protocol.html's
     in-page gate predates this and keeps its own richer markup) builds its
     sign-in/sign-up prompt from this one function, so the copy and the
     return-to-where-you-were-going behaviour stay in sync rather than
     drifting per page. `next` is the path (with query) to return to —
     login.html and signup.html already redirect there after auth. */
  function gateHTML(opts) {
    opts = opts || {};
    var next = encodeURIComponent(opts.next || (global.location ? global.location.pathname + global.location.search : ''));
    return '<div class="sr-tp-band" style="max-width:640px;margin:0 auto;text-align:center">' +
      '<h1 style="margin-bottom:10px">' + (opts.title || 'Sign in to continue') + '</h1>' +
      '<p class="sr-tp-body">' + (opts.body || '') + '</p>' +
      '<p style="margin-top:24px"><a class="sr-tp-pill" href="login.html?next=' + next + '">Sign in</a></p>' +
      '<p class="sr-tp-body" style="margin-top:16px"><a href="signup.html?next=' + next + '">Create an account</a></p>' +
    '</div>';
  }
  function signIn(email, password) {
    if (!global.srAuth) return Promise.reject(new Error('srAuth not loaded'));
    return global.srAuth.signIn(email, password);
  }
  function signOut() {
    if (!global.srAuth) return Promise.resolve();
    return global.srAuth.signOut();
  }
  function onChange(fn) {
    if (global.srAuth) global.srAuth.onChange(fn);
  }

  global.SafeRiseAccess = {
    ready: global.srAuth ? global.srAuth.ready : Promise.resolve(),
    currentUser: currentUser,
    isFree: isFree,
    hasAccess: hasAccess,
    isDev: srIsDev,
    gateHTML: gateHTML,
    signIn: signIn,
    signOut: signOut,
    onChange: onChange
  };
})(window);
