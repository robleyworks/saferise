/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — access gate · SR-326

   A placeholder for real entitlements. Outseta (or whatever lands) becomes
   real by rewriting the bodies of the six functions below — nothing outside
   this file reads a session, a token or a plan name, so the swap is one
   file, not a rewrite. A grep for auth state anywhere else in the repo
   (`localStorage.*sr\.session`, `currentUser`, plan literals) must return
   nothing outside this module.

   currentUser() → the stored session, or null when signed out
   isFree(id)    → true for the free protocol only
   hasAccess(id) → isFree(id) || !!currentUser()
   signIn(email) → stores a session (email only — no password, no plan)
   signOut()     → clears it
   onChange(fn)  → fn is called after signIn/signOut

   STORAGE — localStorage, not sessionStorage. sessionStorage is this
   codebase's deliberate choice for the THEME toggle (a per-tab, per-visit
   preference — see docs/page-invariants.md). A sign-in is a different
   category of state: it should survive the tab closing, matches how a real
   auth session behaves, and matches protocol.html's/dashboard.html's own
   `Store` — both already persist member data (journal entries, resume
   points) to localStorage with this exact write-probe fallback, so a signed-
   in session follows the pattern already established for durable member
   state rather than inventing a second one.

   FREE PROTOCOL ID — confirmed against the record, not assumed. protocol.html's
   own PAGE_PROTOCOL resolver (SR-182) builds the canonical id as
   't' + trackId + '-p' + the two-digit protocol number from content/tracks.js
   (e.g. Track 1, protocol '01' → 't1-p01') — its FALLBACK object already
   uses exactly this value for the Anxiety Reset. The brief's assumed
   format, 't1-01', does not match what the codebase actually uses.
   ═══════════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  var KEY = 'sr.session';
  var FREE_PROTOCOL_ID = 't1-p01';

  var mem = {}, persistent = false;
  try {
    var probe = 'sr.probe';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    persistent = true;
  } catch (e) { persistent = false; }

  function read() {
    try {
      var raw = persistent ? window.localStorage.getItem(KEY) : mem[KEY];
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function write(val) {
    if (val === null) {
      try { if (persistent) window.localStorage.removeItem(KEY); } catch (e) {}
      delete mem[KEY];
      return;
    }
    var raw = JSON.stringify(val);
    try { if (persistent) window.localStorage.setItem(KEY, raw); else mem[KEY] = raw; }
    catch (e) { mem[KEY] = raw; }
  }

  var listeners = [];
  function notify() {
    listeners.forEach(function (fn) { try { fn(); } catch (e) {} });
  }

  function currentUser() {
    var s = read();
    return (s && s.email) ? s : null;
  }
  function isFree(id) {
    return id === FREE_PROTOCOL_ID;
  }
  function hasAccess(id) {
    return isFree(id) || !!currentUser();
  }
  function signIn(email) {
    email = (email || '').trim();
    if (!email) return;
    write({ email: email });
    notify();
  }
  function signOut() {
    write(null);
    notify();
  }
  function onChange(fn) {
    if (typeof fn === 'function') listeners.push(fn);
  }

  global.SafeRiseAccess = {
    currentUser: currentUser,
    isFree: isFree,
    hasAccess: hasAccess,
    signIn: signIn,
    signOut: signOut,
    onChange: onChange
  };
})(window);
