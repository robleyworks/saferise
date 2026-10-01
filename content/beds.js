/* ═════════════════════════════════════════════════════════════════════════
   SafeRise — content/beds.js
   SR-510 · Sovereign session sound beds. Follows content/meditation.js's own
   pattern — plain script, no ES module syntax, since this file (like every
   other content/*.js file) loads via a bare <script src> with no build step
   and no type="module".

   THE PATH LIVES HERE, NEVER IN MARKUP — same rule as meditation.js and
   guidance.js. `src` is a claim the asset exists; all twenty files below were
   confirmed present under assets/audio/beds/ before this file was written,
   and verified as twenty distinct decoded-audio hashes.

   BEDS_BASE is the single swap point. These files are in the repo for now and
   are expected to move to object storage later — when that happens, this one
   constant changes and nothing else does. Do not inline a path anywhere.

   ── Thirty protocols, twenty assets ────────────────────────────────────────
   Three assets are shared, because those sessions use one bed at one length.
   Verified by comparing DECODED audio, not file hashes: all 31 supplied files
   have distinct MD5s — the audio is identical and only the ID3 tag differs.
   Byte size is not evidence either; the eleven ten-minute files all measure
   14407256 bytes because 10:00 at 192 kbps CBR is that size whatever the
   music is, and two different songs sit inside that group.

     bed-song-07     t1-07 t1-10 t2-08 t2-10 t3-08 t3-09
     bed-song-01     t1-09 t2-02 t2-05 t2-06 t2-09
     bed-song-10-11  t3-07 t3-10

   They are named for what they are rather than for the first session that
   happened to use them, so nothing implies t1-07 owns a bed five other
   protocols also play.

   t1-03 ships the female take, matching the meditation ruling — one voice
   across the library. The male bed is NOT the same audio despite the supplied
   handover listing both as "song 8"; it stays on the Desktop.

   T0-00 The Clearing has no entry and needs none. The Clearing remains a
   guided practice (founder-ruled 1 October), so it has no Sovereign session.

   ── S4, and the one thing that must not happen ─────────────────────────────
   The beds play as supplied and DO NOT LOOP (founder-ruled). They keep their
   3 s fade in and 8 s fade out, and a bed shorter than the session ends.

   The end of the bed is NOT AN EVENT. Wire `ended` to nothing: no auto-
   advance, no phase change, no state change, no element appearing or
   disappearing, no unprompted offer to restart. The music stops and the
   session carries on exactly as it was. The fade is already audible at a
   fixed clock time in a session that has no clock — see S4 in
   claude/SOVEREIGN-SESSION-SCREEN-SPEC.md for why that was accepted and what
   was argued against it. The screen must not confirm it.

   Rulings and full verification: claude/SOVEREIGN-SOUND-BED-DECISIONS.md
   ═════════════════════════════════════════════════════════════════════════ */

/* Root-relative, for the reason SR-468 made MEDITATION_BASE root-relative:
   on the nested /protocols/{slug} route a relative base resolves under
   /protocols/ and nothing loads at all. */
var BEDS_BASE = '/assets/audio/beds/';

var BEDS = {
  /* ── Track 01 · Personal Transformation ─────────────────────────────── */
  't1-01': { key: 't1-01', src: BEDS_BASE + 'bed-t1-01-anxiety-reset.mp3' },
  't1-02': { key: 't1-02', src: BEDS_BASE + 'bed-t1-02-anger-alchemy.mp3' },
  't1-03': { key: 't1-03', src: BEDS_BASE + 'bed-t1-03-overwhelm-threshold.mp3' },
  't1-04': { key: 't1-04', src: BEDS_BASE + 'bed-t1-04-abandonment-wound.mp3' },
  't1-05': { key: 't1-05', src: BEDS_BASE + 'bed-t1-05-shame-dissolution.mp3' },
  't1-06': { key: 't1-06', src: BEDS_BASE + 'bed-t1-06-grief-integration.mp3' },
  't1-07': { key: 't1-07', src: BEDS_BASE + 'bed-song-07.mp3' },
  't1-08': { key: 't1-08', src: BEDS_BASE + 'bed-t1-08-jealousy-release.mp3' },
  't1-09': { key: 't1-09', src: BEDS_BASE + 'bed-song-01.mp3' },
  't1-10': { key: 't1-10', src: BEDS_BASE + 'bed-song-07.mp3' },

  /* ── Track 02 · Relationship Healing ────────────────────────────────── */
  't2-01': { key: 't2-01', src: BEDS_BASE + 'bed-t2-01-safe-conversation.mp3' },
  't2-02': { key: 't2-02', src: BEDS_BASE + 'bed-song-01.mp3' },
  't2-03': { key: 't2-03', src: BEDS_BASE + 'bed-t2-03-trust-betrayal.mp3' },
  't2-04': { key: 't2-04', src: BEDS_BASE + 'bed-t2-04-resentment-release.mp3' },
  't2-05': { key: 't2-05', src: BEDS_BASE + 'bed-song-01.mp3' },
  't2-06': { key: 't2-06', src: BEDS_BASE + 'bed-song-01.mp3' },
  't2-07': { key: 't2-07', src: BEDS_BASE + 'bed-t2-07-projection-clarity.mp3' },
  't2-08': { key: 't2-08', src: BEDS_BASE + 'bed-song-07.mp3' },
  't2-09': { key: 't2-09', src: BEDS_BASE + 'bed-song-01.mp3' },
  't2-10': { key: 't2-10', src: BEDS_BASE + 'bed-song-07.mp3' },

  /* ── Track 03 · Professional Performance ────────────────────────────── */
  't3-01': { key: 't3-01', src: BEDS_BASE + 'bed-t3-01-high-stakes-presence.mp3' },
  't3-02': { key: 't3-02', src: BEDS_BASE + 'bed-t3-02-conflict-navigation.mp3' },
  't3-03': { key: 't3-03', src: BEDS_BASE + 'bed-t3-03-imposter-dissolution.mp3' },
  't3-04': { key: 't3-04', src: BEDS_BASE + 'bed-t3-04-perfectionism-release.mp3' },
  't3-05': { key: 't3-05', src: BEDS_BASE + 'bed-t3-05-performance-anxiety.mp3' },
  't3-06': { key: 't3-06', src: BEDS_BASE + 'bed-t3-06-belonging-gap.mp3' },
  't3-07': { key: 't3-07', src: BEDS_BASE + 'bed-song-10-11.mp3' },
  't3-08': { key: 't3-08', src: BEDS_BASE + 'bed-song-07.mp3' },
  't3-09': { key: 't3-09', src: BEDS_BASE + 'bed-song-07.mp3' },
  't3-10': { key: 't3-10', src: BEDS_BASE + 'bed-song-10-11.mp3' }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BEDS: BEDS, BEDS_BASE: BEDS_BASE };
}
