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

  function currentUser() {
    if (!global.srAuth) return null;
    var u = global.srAuth.user();
    return u ? { email: u.email, id: u.id } : null;
  }
  function isFree(id) {
    return typeof id === 'string' && id.indexOf(FREE_TRACK_PREFIX) === 0;
  }
  function hasAccess(id) {
    if (isFree(id)) return true;
    if (!global.srAuth) return false;
    return !!currentUser() && !!global.srAuth.entitled();
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
    signIn: signIn,
    signOut: signOut,
    onChange: onChange
  };
})(window);
