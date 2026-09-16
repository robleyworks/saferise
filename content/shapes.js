/* ════════════════════════════════════════════════════════════════════════
   SafeRise — content/shapes.js
   SR-394 · Shape diagram data for js/sr-resource-shapes.js. Follows
   content/guidance.js's own pattern — plain script, no ES module syntax,
   since this file loads via a bare <script src> with no build step and no
   type="module" (the pass brief's own example used `export const`, which
   would be a syntax error under how this file is actually loaded).

   Keyed exactly as content/t{1,2,3}-resources.js keys its own records
   (e.g. "t3p1-raising"), matching each [data-sr-shape-key] mount. No copy
   lives here beyond short diagram labels — shape furniture, per
   js/sr-resource-shapes.js's own comment — condensed from the real body
   text they sit beside, never the other way round.

   Three entries, one per shape this pass mounts, all on Track 3 / Protocol
   1 (Executive Presence under scrutiny) — see the SR-394 fix-register
   entry for why: content/t{1,2,3}-resources.js's own key "t1-01-05" named
   in the pass brief doesn't exist anywhere in this codebase (real ids are
   t{track}p{protocol}-{type}), and the brief's own dial example content
   ("who to tell, how much to say, what to ask for") is, verbatim, this
   file's own t3p1-raising.sub field — confirming the real target.
   ════════════════════════════════════════════════════════════════════════ */

var SR_SHAPE_DATA = {
  /* fan — t3p1-companion, "Somatic Release Activities". Parallel options,
     no order: five of the real seven actions in that resource's own body,
     condensed to short labels. All seven stay in the body text unabridged. */
  't3p1-companion': {
    alt: 'Five parallel ways to settle the body, no order: long exhale, jaw and tongue, a brief hum, feet into the floor, warm hands',
    hubKick: 'BETWEEN SESSIONS',
    hub: 'no order',
    caption: 'No order. No ceremony. Pick one.',
    accent: 'rgb(224,182,88)',
    items: [
      { label: 'Long exhale' },
      { label: 'Jaw apart, tongue down' },
      { label: 'Hum, briefly' },
      { label: 'Feet into the floor' },
      { label: 'Warm hands' }
    ]
  },

  /* ladder — t3p1-disclosure, "Disclosure & Support". Four real lines from
     the script, alternating "the line" (said) and "the move" (what it
     does) -- not a transcript of two speakers; this resource is a script
     one person says, not a recorded exchange. */
  't3p1-disclosure': {
    alt: 'Four beats of the disclosure script: the opening line, asking for it in one sentence, describing what helps, and confirming it afterwards in writing',
    leftLabel: 'THE LINE',
    rightLabel: 'THE MOVE',
    caption: 'A script, not a performance.',
    accent: 'rgb(157,179,136)',
    turns: [
      { text: '“I get keyed up before things that matter.”', exit: 'said once, before they wonder' },
      { text: 'Ask for the opening line — just one sentence.' },
      { text: '“I do better when I’ve had the material a day earlier.”', exit: 'a specific, answerable ask' },
      { text: 'Confirm it afterwards in a short email.' }
    ]
  },

  /* dial — t3p1-raising, "Raising It". The resource's own sub field, "Who
     to tell, how much, and what to ask for," is the three axes verbatim —
     not paraphrased, quoted from the record itself. targets are the three
     .sr-axis ids content/t3-resources.js now wraps around the real
     who/HR/GP list, the "how much" paragraphs, and the "make it a
     request" paragraphs, in that same file. Accents match --sr-reg on
     each of those three panels exactly. */
  't3p1-raising': {
    alt: 'Three axes: who to tell, how much to say, what to ask for',
    hubKick: 'RAISING IT',
    hub: ['three', 'questions'],
    caption: 'Not disclosing is a legitimate choice.',
    axes: [
      { label: 'Who to tell',     accent: 'rgb(224,182,88)',  target: 'ax-who' },
      { label: 'How much to say', accent: 'rgb(157,179,136)', target: 'ax-much' },
      { label: 'What to ask for', accent: 'rgb(130,152,187)', target: 'ax-ask' }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SR_SHAPE_DATA: SR_SHAPE_DATA };
}
