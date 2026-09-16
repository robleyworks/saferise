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

   SR-394's first three entries (fan/ladder/dial) are all on Track 3 /
   Protocol 1 — see that fix-register entry for why: content/t{1,2,3}-
   resources.js's own key "t1-01-05" named in that pass's brief doesn't
   exist anywhere in this codebase (real ids are t{track}p{protocol}-
   {type}), and that brief's own dial example content ("who to tell, how
   much to say, what to ask for") is, verbatim, this file's own
   t3p1-raising.sub field — confirming the real target.

   SR-395 adds chain/floor/overlap on three further, different protocols
   (t1p3-guide, t3p7-practice, t2p9-accountability) — see that entry for
   why each one was chosen over the naive fullest-by-length candidate.
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
  },

  /* SR-395 (PASS-CLAUDE-CODE-remaining-shapes.md) · chain/floor/overlap.
     Three different protocols, each the true fullest real candidate for
     its type once two length-scan outliers were found and excluded —
     t1p1-guide and t1p2-guide each embed a large pre-existing inline
     <figure class="sr-rd-figure"><svg>...</svg></figure> chart directly in
     body (not a shapes-system mount, but a real diagram all the same —
     "one diagram per resource" excludes both). Accents reuse SR-394's
     already-verified --gold/--sage/--slate triples via rgb(var(--x)) —
     the brief's own examples wrote bare var(--gold)/var(--slate), which
     would resolve to an invalid colour given these tokens are stored as
     bare "R,G,B" triples, not full colour values (SR-394's own reason for
     scoping them that way in the first place). No new accent introduced;
     no new contrast ratio to compute. */

  /* chain — t1p3-guide, "How This Works" (Track 1 / Protocol 3, the
     agitated/overwhelm protocol). True fullest guide once the two inline-
     figure outliers above are excluded (6,788 characters of body copy,
     ahead of every other guide bar those two). Also the better fit on its
     own terms: t1p10-guide (the Numb/shutdown protocol) was the original
     candidate by a naive length count, but a chain that narrows toward a
     brighter, more certain conclusion fights a resource about a REDUCED
     state — shutdown is not a state that sharpens toward certainty. This
     protocol's own state is agitated/mobilised, where narrowing to one
     definite, actionable link is exactly the real mechanism its own text
     describes. Links taken from one real sentence: "The system is
     prepared for action and can't identify which action, so the
     preparation runs continuously without discharging." */
  't1p3-guide': {
    alt: 'Three narrowing links: mobilised with no target, so no action can be identified, therefore the preparation runs without discharging',
    accent: 'rgb(var(--gold))',
    links: [
      { label: 'The state',   lines: ['prepared for', 'action'] },
      { label: 'So',          lines: ["can't identify", 'which action'] },
      { label: 'Therefore',   lines: ['runs without', 'discharging'] }
    ],
    caption: 'Mobilised, with nothing to aim at.'
  },

  /* floor — t3p7-practice, "Safe Practice" (Track 3 / Protocol 7, an
     unresolved stay-or-go decision). Fullest real Safe Practice sitewide
     (3,774 characters). The four conditions are scattered across the
     resource's own "When to slow down" / "When the situation is the
     thing" / "Where staying is doing you harm" passages, not listed
     together anywhere — pulling them into one stack is the real editorial
     act this pass does. Each row is the resource's own wording,
     compressed to a short line, not paraphrased into new claims. Ordered
     widest at the bottom: a resource whose situation is actually harmful
     needs help regardless of pacing or advice, so that condition is what
     the other three rest on, not one beside them. */
  't3p7-practice': {
    alt: 'Four conditions stacked as a floor, widest at the bottom: stop if it turns into self-prosecution, stop if Release opens something larger, get advice where money or immigration status are involved, and where staying is doing you harm this is not a decision protocol',
    accent: 'rgb(var(--slate))',
    rows: [
      'Stop if it turns into self-prosecution',
      'Stop if Release opens something larger',
      'Get advice where money, contracts or immigration are involved',
      'Where staying is doing you harm, this isn’t a decision protocol'
    ],
    caption: 'Remove the last row and the other three stop holding.'
  },

  /* overlap — t2p9-accountability, "Accountability & Empathy" (Track 2 /
     Protocol 9, a pursue/withdraw pattern). Approved as found — fullest
     real Accountability & Empathy sitewide (3,601 characters), and its
     own text repeats an inside/outside framing three times.

     middle.label DIFFERS from the literal instruction to use "the
     certainty about the other person's motives" verbatim as a single
     label, reported rather than silently shortened: measured live via
     getBBox() on the rendered <text>, that 48-character phrase at this
     component's fixed 19px/text-anchor:middle geometry spans x=128.7 to
     x=471.3 of a 600-unit viewBox — it overlaps the left/right labels at
     x=152/448 no matter how short THEY are, because the middle text alone
     already covers both their positions. No renderer change is available
     to fix this (sr-resource-shapes.js stays byte-identical, per this
     pass's own constraint). Split the real phrase across label ("The
     certainty" — its own first three words, verbatim) and sub ("about
     their motives" — the rest, compressed from "about the other person's
     motives" only enough to fit) rather than dropping the mount entirely;
     each line measured clear of the side labels afterward. If verbatim as
     one unbroken line matters more than a legible diagram, this mount
     should be skipped instead — flagged for that decision, not made
     unilaterally. */
  't2p9-accountability': {
    alt: 'Two overlapping fields, from inside and from outside, with the certainty about the other person’s motives lit in the intersection',
    left:   { label: 'From inside',  sub: 'a conclusion drawn from evidence', accent: 'rgb(var(--slate))' },
    right:  { label: 'From outside', sub: 'an intention you never had',       accent: 'rgb(var(--sage))'  },
    middle: { label: 'The certainty', sub: 'about their motives' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SR_SHAPE_DATA: SR_SHAPE_DATA };
}
