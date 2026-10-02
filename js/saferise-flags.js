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

/* tierSelfSelect — SR-516. The member-checkout tier controls transact against
   set_my_tier() (supabase/migrations/0007) instead of a payment. Pre-launch
   only, for testing upgrade and downgrade across the ladder. The SERVER
   switch (test_switches.tier_self_select) is the real gate; this flag only
   decides whether the buttons are offered, so turning the flag off hides the
   controls and turning the server row off makes them fail closed. Both must
   be off before the payment rail goes live.
   SHIPS FALSE. The surface is only correct once 0007 is applied: before that
   every control would offer a change and then fail. Order: deploy with this
   off (nothing changes for anyone), apply 0007, then flip this to true in a
   commit of its own. */
if (typeof window.SR_FLAGS.tierSelfSelect !== 'boolean') window.SR_FLAGS.tierSelfSelect = false;
