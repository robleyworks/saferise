/* ═════════════════════════════════════════════════════════════════════════
   SafeRise — content/meditation.js
   SR-393 · Meditation player data. Follows content/guidance.js's own
   pattern — plain script, no ES module syntax, since this file (like every
   other content/*.js file) loads via a bare <script src> with no build step
   and no type="module". Keyed by meditation key, matching MEDITATION_BASE +
   the source-of-truth naming SRMedPlayer.open() expects.

   THE PATH LIVES HERE, NEVER IN MARKUP — same rule as guidance.js. `src` is
   a claim the asset exists; every file below was confirmed present under
   assets/audio/meditation/ before this file was written.

   `eyebrow` and `sub` are copied from the protocol records in tracks.js and
   are not authored here — tracks.js stays the source of truth for copy.

   SR-431 · 23 September 2026 — 28 of 31 present (t1-05, t2-01, t3-02, t3-03
   added this pass). PLACEHOLDER_AUDIO (protocol.html) stays true until the
   last three land. All three failed the loudness/peak preflight and were
   held rather than installed (docs/INSTALL-MEDITATIONS.md §A3):
     t1-03 — LRA 6.9 against 18–19 elsewhere; the master has no bed for its
             first eight minutes and is a known-interim render, not a defect.
     t1-06 — −15.5 LUFS / LRA 15.0, quieter and flatter than the library;
             needs a listen before deciding whether to re-run the chain.
     t3-06 — peak −0.4 dBFS, the hottest file in the library; re-run the
             mastering chain at the shared peak target before installing.
   ═════════════════════════════════════════════════════════════════════════ */

var MEDITATION_BASE = 'assets/audio/meditation/';

var MEDITATION = {
  't0-00': {
    key:     't0-00',
    eyebrow: 'Settle in',
    title:   'The Clearing',
    sub:     'Quiet the noise and arrive in a state where the work can land.',
    src:     MEDITATION_BASE + 't0-00-the-clearing.mp3'
  },
  't1-01': {
    key:     't1-01',
    eyebrow: 'Regulate',
    title:   'Anxiety Reset',
    sub:     'Calm fear responses, quiet spiralling thoughts, and return to the present.',
    src:     MEDITATION_BASE + 't1-01-anxiety-reset.mp3'
  },
  't1-02': {
    key:     't1-02',
    eyebrow: 'Transmute',
    title:   'Anger Alchemy',
    sub:     'Turn anger into clarity, protect what matters, and choose your response.',
    src:     MEDITATION_BASE + 't1-02-anger-alchemy.mp3'
  },
  't1-07': {
    key:     't1-07',
    eyebrow: 'Restore',
    title:   'Shutdown Recovery',
    sub:     'Come back to yourself slowly, and start feeling things again.',
    src:     MEDITATION_BASE + 't1-07-shutdown-recovery.mp3'
  },
  't1-08': {
    key:     't1-08',
    eyebrow: 'Release',
    title:   'Jealousy Release',
    sub:     'See what the sting is telling you, and get back to your own path.',
    src:     MEDITATION_BASE + 't1-08-jealousy-release.mp3'
  },
  't1-09': {
    key:     't1-09',
    eyebrow: 'Anchor',
    title:   'Insecurity Anchor',
    sub:     'Quiet the doubt, and stay steady when you feel judged or exposed.',
    src:     MEDITATION_BASE + 't1-09-insecurity-anchor.mp3'
  },
  't1-10': {
    key:     't1-10',
    eyebrow: 'Reclaim',
    title:   'Powerlessness & Despair',
    sub:     'Find what is still in your reach, and take the next step that matters.',
    src:     MEDITATION_BASE + 't1-10-powerlessness-despair.mp3'
  },
  't2-02': {
    key:     't2-02',
    eyebrow: 'Repair',
    title:   'Rupture & Repair',
    sub:     'Close the gap after a fight instead of waiting for it to fade.',
    src:     MEDITATION_BASE + 't2-02-rupture-repair.mp3'
  },
  't2-03': {
    key:     't2-03',
    eyebrow: 'Rebuild',
    title:   'Trust & Betrayal',
    sub:     'Rebuild ground under a relationship after trust was broken.',
    src:     MEDITATION_BASE + 't2-03-trust-betrayal.mp3'
  },
  't2-04': {
    key:     't2-04',
    eyebrow: 'Release',
    title:   'Resentment Release',
    sub:     'Put down the score you have been keeping, so it stops running the room.',
    src:     MEDITATION_BASE + 't2-04-resentment-release.mp3'
  },
  't2-05': {
    key:     't2-05',
    eyebrow: 'Open',
    title:   'Intimacy Barrier',
    sub:     'Stay open when someone gets close, instead of pulling away.',
    src:     MEDITATION_BASE + 't2-05-intimacy-barrier.mp3'
  },
  't2-06': {
    key:     't2-06',
    eyebrow: 'Level',
    title:   'Double Standard',
    sub:     'Name the rule that only one of you has to follow.',
    src:     MEDITATION_BASE + 't2-06-double-standard.mp3'
  },
  't2-08': {
    key:     't2-08',
    eyebrow: 'Appreciate',
    title:   'Appreciation & Support',
    sub:     'Get back the habit of noticing what the other one is carrying.',
    src:     MEDITATION_BASE + 't2-08-appreciation-support.mp3'
  },
  't2-09': {
    key:     't2-09',
    eyebrow: 'Meet',
    title:   'Pursue & Withdraw',
    sub:     'Break the chase-and-retreat loop by changing your half of it.',
    src:     MEDITATION_BASE + 't2-09-pursue-withdraw.mp3'
  },
  't2-10': {
    key:     't2-10',
    eyebrow: 'Close',
    title:   'Conscious Separation',
    sub:     'End it, or step back from it, without destroying what it was.',
    src:     MEDITATION_BASE + 't2-10-conscious-separation.mp3'
  },
  't3-04': {
    key:     't3-04',
    eyebrow: 'Loosen',
    title:   'Perfectionism Release',
    sub:     'Let it be finished when it is good enough.',
    src:     MEDITATION_BASE + 't3-04-perfectionism-release.mp3'
  },
  't3-05': {
    key:     't3-05',
    eyebrow: 'Perform',
    title:   'Performance Anxiety',
    sub:     'Keep access to what you know while people are watching you use it.',
    src:     MEDITATION_BASE + 't3-05-performance-anxiety.mp3'
  },
  't3-07': {
    key:     't3-07',
    eyebrow: 'Cross',
    title:   'Career Transition',
    sub:     'Move from one role to the next without losing your footing in between.',
    src:     MEDITATION_BASE + 't3-07-career-transition.mp3'
  },
  't3-08': {
    key:     't3-08',
    eyebrow: 'Decide',
    title:   'Decision Fatigue',
    sub:     'Make small decisions small again.',
    src:     MEDITATION_BASE + 't3-08-decision-fatigue.mp3'
  },
  't3-09': {
    key:     't3-09',
    eyebrow: 'Refill',
    title:   'Burnout & Overload',
    sub:     'Refill enough to work at the level you are actually being paid for.',
    src:     MEDITATION_BASE + 't3-09-burnout-overload.mp3'
  },
  't3-10': {
    key:     't3-10',
    eyebrow: 'Unlock',
    title:   'Creative Flow',
    sub:     'Get back to the work that used to come easily.',
    src:     MEDITATION_BASE + 't3-10-creative-flow.mp3'
  },
  't1-04': {
    key:     't1-04',
    eyebrow: 'Repair',
    title:   'Abandonment Wound',
    sub:     'Settle the fear of being left, and feel safe in the room again.',
    src:     MEDITATION_BASE + 't1-04-abandonment-wound.mp3'
  },
  't2-07': {
    key:     't2-07',
    eyebrow: 'Clarify',
    title:   'Projection Clarity',
    sub:     'Tell what they actually did apart from what your past says they meant.',
    src:     MEDITATION_BASE + 't2-07-projection-clarity.mp3'
  },
  't3-01': {
    key:     't3-01',
    eyebrow: 'Steady',
    title:   'High-Stakes Presence',
    sub:     'Settle before you walk in, so you arrive as yourself.',
    src:     MEDITATION_BASE + 't3-01-high-stakes-presence.mp3'
  },
  't1-05': {
    key:     't1-05',
    eyebrow: 'Dissolve',
    title:   'Shame Dissolution',
    sub:     'Stop judging yourself for one moment, and stop it standing for who you are.',
    src:     MEDITATION_BASE + 't1-05-shame-dissolution.mp3'
  },
  't2-01': {
    key:     't2-01',
    eyebrow: 'Speak',
    title:   'Safe Conversation',
    sub:     'Make it safe enough to say the true thing and be heard.',
    src:     MEDITATION_BASE + 't2-01-safe-conversation.mp3'
  },
  't3-02': {
    key:     't3-02',
    eyebrow: 'Navigate',
    title:   'Conflict Navigation',
    sub:     'Stay in the disagreement without blowing it up or walking away.',
    src:     MEDITATION_BASE + 't3-02-conflict-navigation.mp3'
  },
  't3-03': {
    key:     't3-03',
    eyebrow: 'Dissolve',
    title:   'Imposter Dissolution',
    sub:     'Stop believing you only got here by luck.',
    src:     MEDITATION_BASE + 't3-03-imposter-dissolution.mp3'
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MEDITATION: MEDITATION, MEDITATION_BASE: MEDITATION_BASE };
}
