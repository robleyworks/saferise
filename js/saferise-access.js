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

  /* SR-431 (PASS-J.md Part C) · the locked-cover upsell (dashboard.html's
     .sr-dash-locked / #srLockCta) has been verified by inspection only
     since SR-422, because hasAccess() below returns true for everything on
     localhost — there is no real way to make a track report as locked in
     this environment. Guarded on hostname (srIsDev()), same as the dev
     bypass itself — not a build flag, not a stored value — so it can only
     ever fire where the bypass already applies, and is a no-op everywhere
     else including every *.netlify.app preview. */
  function srMockLockedTrack() {
    if (!srIsDev()) return null;
    var m = /[?&]srmock=locked:(\d+)/.exec(global.location ? global.location.search : '');
    return m ? m[1] : null;
  }

  /* ── SR-470 (TIER-1) · the tier resolver — the single source of truth for
     "what can this member do". Every gate calls it: hasAccess() below, the
     voice service (js/saferise-sovereign-stt.js), the Sovereign session and
     its reading (js/saferise-sovereign.js), the dashboard and account page.

     The ladder (founder-set): free < standard < premium < sovereign.
       free       the first track only
       standard   the tracks released so far (STANDARD_TRACKS, fixed at the
                  ladder's date — later releases are Premium's)
       premium    every track, as it releases (every live track)
       sovereign  premium + voice + the AI reading

     WHERE THE TIER COMES FROM. There is no plan column yet: members has only
     `entitled` (supabase/migrations/0001). Storing a tier is a schema change
     and belongs to ORG-1, so until it lands:
       - srAuth.plan(), if ORG-1 provides it, is read first;
       - otherwise a signed-in, entitled member resolves to STANDARD — exactly
         what €19 buys today — and everyone else to FREE.
     Unknown or missing always resolves to FREE; an entitled member never
     resolves below STANDARD, so a paying member is never locked out by a
     missing or malformed tier. Premium and Sovereign become reachable when
     ORG-1 records them.

     ?srtier=free|standard|premium|sovereign simulates a tier for testing on
     local hosts only (srIsDev) — like srmock, never on a public URL. Without
     it the local bypass resolves to SOVEREIGN (everything), as hasAccess()
     always has. */
  var TIERS = ['free', 'standard', 'premium', 'sovereign'];
  var FIRST_TRACK = 1;
  var STANDARD_TRACKS = [1, 2, 3];   // released when the ladder was set, 29 September 2026

  function liveTracks() {
    var T = global.TRACKS, out = [];
    if (T) Object.keys(T).forEach(function (k) { if (T[k] && T[k].status === 'live' && +k > 0) out.push(+k); });
    return out.length ? out.sort(function (a, b) { return a - b; }) : STANDARD_TRACKS.slice();
  }
  function devTier() {
    if (!srIsDev()) return null;
    var m = /[?&]srtier=(free|standard|premium|sovereign)\b/.exec(global.location ? global.location.search : '');
    try {
      if (m) global.sessionStorage.setItem('sr.tier.dev', m[1]);
      var kept = global.sessionStorage.getItem('sr.tier.dev');
      return TIERS.indexOf(kept) >= 0 ? kept : null;
    } catch (e) { return m ? m[1] : null; }
  }
  function storedTier() {
    var p = global.srAuth && typeof global.srAuth.plan === 'function' ? global.srAuth.plan() : null;
    return TIERS.indexOf(p) >= 0 ? p : null;
  }
  function resolve() {
    var dt = devTier(), tier, source;
    if (dt) { tier = dt; source = 'simulated'; }
    else if (srIsDev()) { tier = 'sovereign'; source = 'local'; }
    else {
      var user = global.srAuth ? global.srAuth.user() : null;
      var entitled = !!(global.srAuth && global.srAuth.entitled && global.srAuth.entitled());
      var st = storedTier();
      tier = user ? (st || 'free') : 'free';
      if (user && entitled && TIERS.indexOf(tier) < 1) tier = 'standard';
      source = !user ? 'none' : st ? 'plan' : (entitled ? 'entitlement' : 'none');
    }
    var rank = TIERS.indexOf(tier);
    return {
      tier: tier, rank: rank, source: source,
      tracks: rank <= 0 ? [FIRST_TRACK] : rank === 1 ? STANDARD_TRACKS.slice() : liveTracks(),
      voice: tier === 'sovereign',
      reading: tier === 'sovereign'
    };
  }
  function canAccessTrack(n) { return resolve().tracks.indexOf(+n) >= 0; }

  /* SR-470 2.3 · a locked track is presented as locked — named, with the
     membership that opens it and the way there — never as broken or empty.
     One wording for every page that shows a lock. No counts. */
  function lockedCopy(trackNumber) {
    var n = +trackNumber, T = global.TRACKS && global.TRACKS[n];
    var name = T && T.name ? T.name : 'This track';
    var level = STANDARD_TRACKS.indexOf(n) >= 0 ? 'Standard' : 'Premium';
    return {
      title: name + ' is part of the membership.',
      body: name + ' opens with ' + level + ' or above. The first track, Personal Transformation, is yours in full already.',
      level: level,
      href: '/checkout',
      cta: 'See the memberships'
    };
  }
  function can(capability) { return !!resolve()[capability]; }

  function currentUser() {
    if (!global.srAuth) return null;
    var u = global.srAuth.user();
    return u ? { email: u.email, id: u.id } : null;
  }
  function isFree(id) {
    return typeof id === 'string' && id.indexOf(FREE_TRACK_PREFIX) === 0;
  }
  function hasAccess(id) {
    var mockTrack = srMockLockedTrack();
    if (mockTrack && typeof id === 'string' && id.indexOf('t' + mockTrack + '-') === 0) return false;
    if (srIsDev() && !devTier()) return true;
    if (isFree(id)) return true;          // the first track stays open, signed in or not, as before
    var m = /^t(\d+)-/.exec(typeof id === 'string' ? id : '');
    return !!m && canAccessTrack(+m[1]);   // SR-470 · the resolver decides
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
      '<p style="margin-top:24px"><a class="sr-tp-pill" href="/login.html?next=' + next + '">Sign in</a></p>' +
      '<p class="sr-tp-body" style="margin-top:16px"><a href="/signup.html?next=' + next + '">Create an account</a></p>' +
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
    /* SR-470 · the tier resolver. */
    TIERS: TIERS,
    resolve: resolve,
    canAccessTrack: canAccessTrack,
    can: can,
    lockedCopy: lockedCopy,
    isDev: srIsDev,
    gateHTML: gateHTML,
    signIn: signIn,
    signOut: signOut,
    onChange: onChange
  };
})(window);
