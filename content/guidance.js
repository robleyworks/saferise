/* ════════════════════════════════════════════════════════════════════════
   SafeRise — content/guidance.js
   SR-247 · Resource guidance audio. One short spoken introduction per
   RESOURCE TYPE, not per protocol: ten files covering every guidance-bearing
   resource page in the library.

   THE PATH LIVES HERE, NEVER IN MARKUP. Rule 24 — a `src` in the record is a
   claim the asset exists and is usable. All ten were verified present,
   mono/44.1kHz/128kbps, with the specified head and tail padding, before this
   file was written. A type with no file carries NO `src` and the surface
   renders no control, exactly as an absent image renders no request.

   GUIDED MEDITATION HAS NO ENTRY, BY DESIGN. The meditation script opens with
   its own framing and a second voice before the first would be one too many.
   Do not add one for symmetry.

   KEYED BY RESOURCE TYPE. The type names below are the authored content's own
   (`content/t1|t2|t3-resources.js`, `T*_PROTOCOL_KEYS`), which is the only
   inventory carrying all eleven types. `tracks.js` SHARED.resources carries
   ten and omits `raising` — see SR-249. Rule 22 applies: these keys are
   matched to files by CONTENT, never by name similarity.
   ════════════════════════════════════════════════════════════════════════ */

var GUIDANCE_BASE = 'assets/audio/guidance/';

var GUIDANCE = {
  /* meditation — deliberately absent. See the header. */
  crisiscard:     { file: 'rg-01-cue-card.mp3',               label: 'Cue Card' },
  guide:          { file: 'rg-02-how-this-works.mp3',         label: 'How This Works' },
  companion:      { file: 'rg-03-somatic-release.mp3',        label: 'Somatic Release Activities' },
  practice:       { file: 'rg-04-safe-practice.mp3',          label: 'Safe Practice' },
  advisory:       { file: 'rg-05-proximity-guide.mp3',        label: 'Proximity Guide' },
  disclosure:     { file: 'rg-06-disclosure-support.mp3',     label: 'Disclosure & Support' },
  raising:        { file: 'rg-07-raising-it.mp3',             label: 'Raising It' },
  repair:         { file: 'rg-08-invitation-to-repair.mp3',   label: 'Invitation to Repair' },
  record:         { file: 'rg-09-your-record.mp3',            label: 'Your Record' },
  accountability: { file: 'rg-10-accountability-empathy.mp3', label: 'Accountability & Empathy' }
};

/* The only way a surface should obtain a guidance path. Returns null where no
   guidance exists, which is a valid and expected answer — Guided Meditation
   returns null on every protocol, and a surface must render nothing for it. */
function guidanceFor(type) {
  var g = GUIDANCE[type];
  return g ? { src: GUIDANCE_BASE + g.file, label: g.label } : null;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GUIDANCE: GUIDANCE, GUIDANCE_BASE: GUIDANCE_BASE, guidanceFor: guidanceFor };
}
