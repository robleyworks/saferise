/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-flags.js · SR-464 A3
   Feature flags, one place. A plain global object; load it before any
   script that reads it.

   Why its own file and not js/saferise-system.js: the system JS is not
   loaded on protocol.html, which is the only page that reads a flag today
   (js/saferise-sovereign.js). A flag defined where its reader cannot see it
   is a switch wired to nothing — flipping it would silently do nothing.

   sovereign — the Sovereign session on protocol.html (SR-462/463/464).
   Stays false until the founder rules otherwise. On a local development
   host only, ?sovereign=1 turns it on for testing (see saferise-sovereign.js). */
window.SR_FLAGS = window.SR_FLAGS || {};
if (typeof window.SR_FLAGS.sovereign !== 'boolean') window.SR_FLAGS.sovereign = false;
