/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-flags.js · SR-464 A3
   Feature flags, one place. A plain global object; load it before any
   script that reads it.

   Why its own file and not js/saferise-system.js: the system JS is not
   loaded on protocol.html, which is the only page that reads a flag today
   (js/saferise-sovereign.js). A flag defined where its reader cannot see it
   is a switch wired to nothing — flipping it would silently do nothing.

   sovereign — the Sovereign session on protocol.html (SR-462/463/464).
   ON since SR-483, by founder ruling. The deploy-preview condition in SR-469
   was waived, and the fix register records why beside SR-469. The flag only
   opens the surface: the tier decides who can use it (js/saferise-access.js
   resolve()). A member without the Sovereign tier sees the option locked,
   with the membership that opens it (SR-470), and never reaches sv-reading.
   Set it back to false to withdraw the surface for everyone. */
window.SR_FLAGS = window.SR_FLAGS || {};
if (typeof window.SR_FLAGS.sovereign !== 'boolean') window.SR_FLAGS.sovereign = true;
