/* ════════════════════════════════════════════════════════════════════════
   SafeRise — content/meditation.js
   SR-393 · Meditation player data. Follows content/guidance.js's own
   pattern — plain script, no ES module syntax, since this file (like every
   other content/*.js file) loads via a bare <script src> with no build step
   and no type="module". Keyed by meditation key, matching MEDITATION_BASE +
   the source-of-truth naming SRMedPlayer.open() expects.

   THE PATH LIVES HERE, NEVER IN MARKUP — same rule as guidance.js. `src` is
   a claim the asset exists; both t0-00-the-clearing.mp3 and .m4a were
   confirmed present under assets/audio/meditation/ before this file was
   written.

   One entry for now (T0-00 The Clearing). Thirty more follow the same shape.
   ════════════════════════════════════════════════════════════════════════ */

var MEDITATION_BASE = 'assets/audio/meditation/';

var MEDITATION = {
  't0-00': {
    key:     't0-00',
    eyebrow: 'Settle in',
    title:   'The Clearing',
    sub:     'Quiet the noise and arrive in a state where the work can land.',
    src:     MEDITATION_BASE + 't0-00-the-clearing.mp3'
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MEDITATION: MEDITATION, MEDITATION_BASE: MEDITATION_BASE };
}
