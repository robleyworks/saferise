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
  },

  /* SR-396 (PASS-CLAUDE-CODE-shapes-all-types.md) · floor, rolled out across
     every Safe Practice resource. All 30 real ids follow t{track}p{protocol}
     -practice. t3p7-practice is SR-395's, not redone.

     Every one of the other 29 was read in full. The template holds with
     near-total consistency across all 30: Pacing / What people commonly
     notice / When to slow down (1-2 real stop conditions) / one or more
     protocol-specific "When X" / "Where Y" sections / a closing safety-net
     section (usually "When a person in the room is the right tool", or an
     equivalent phrasing) / Alongside other support. Every one of the 29
     had at least 3 genuine, simultaneously-true conditions to draw from —
     zero skips this type, reported as the finding itself per the brief's
     own instruction ("state plainly if it does not [have the shape]" — it
     does, cleanly, everywhere).

     Consistent across all 30 (SR-395's t3p7 included): accent slate, same
     caption, same row count where the source supports 4 (3 where it only
     has 3 real conditions — t1p4, t1p6, t3p1, t3p5 — never padded). The
     closing safety-net condition is always the last, widest row, matching
     t3p7's own precedent — it is the condition the others rest on. Every
     row is a compression of that resource's own real trigger, not a new
     claim; every row was measured with getBBox() against the shape's own
     per-row rect width before being committed here (row widths are fixed
     by row index — 288/372/456/540 of the 600-unit viewBox — not by text
     length, so the safe character count actually grows row to row; this
     was verified empirically, not assumed, since it isn't documented
     anywhere in the byte-identical renderer). Zero rows overflow. */
  't1p1-practice': {
    alt: 'Three conditions: stop if breathing gets worse, stop if Release opens something larger, contact someone if thinking of harm',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if breathing gets worse', 'Stop if Release opens something larger', "Contact someone if you're thinking of harm"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't1p2-practice': {
    alt: 'Four conditions: stop if Release opens too much, stop and change your situation if you act, get help if the anger turns violent, contact someone if frightening yourself',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if Release opens too much', 'Stop and change your situation if you act', 'Get help now if the anger turns violent', "Contact someone if you're frightening yourself"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't1p3-practice': {
    alt: 'Four conditions: stop counting if breathing worsens, move instead if you can’t sit still, get help if the volume tops one person, contact someone if it doesn’t let up over days',
    accent: 'rgb(var(--slate))',
    rows: ['Stop counting if breathing worsens', "Move instead if you can't sit still", 'Get help if the volume tops one person', "Contact someone if it doesn't let up over days"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't1p4-practice': {
    alt: 'Three conditions: stop if Release opens an older loss, stop if the state won’t settle, contact someone if a real loss needs different support',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if Release opens an older loss', "Stop if the state won't settle at all", 'Contact someone if a real loss needs different support'],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't1p5-practice': {
    alt: 'Three conditions: stop if step four turns to judgment, stop if Release opens something older, get help if what this attaches to was done to you',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if step four turns to judgment', 'Stop if Release opens something older', 'Get help if what this attaches to was done to you'],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't1p6-practice': {
    alt: 'Three conditions: stop if the session opens too much, use it before anniversaries not during, contact someone if the loss is recent — people first',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if the session opens too much', 'Use it before anniversaries, not during', 'Contact someone if the loss is recent — people first'],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't1p7-practice': {
    alt: 'Four conditions: use a somatic item if it’s a demand, stop if emotion is hard and you’re alone, contact someone if you haven’t eaten washed or left, ask someone else to make the call if you can’t',
    accent: 'rgb(var(--slate))',
    rows: ["Use a somatic item if it's a demand", "Stop if emotion is hard and you're alone", "Contact someone if you haven't eaten, washed or left", "Ask someone else to make the call if you can't"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't1p8-practice': {
    alt: 'Four conditions: stop if Release opens too much, end it if the comparing won’t drop, get help if monitoring someone else, contact someone if the checking is hard to describe',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if Release opens too much', "End it if the comparing won't drop", "Get help if you're monitoring someone else", 'Contact someone if the checking is hard to describe'],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't1p9-practice': {
    alt: 'Three conditions: stop if step four turns to judgment, stop if Release opens something older, contact someone if thoughts of harm or self-punishment',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if step four turns to judgment', 'Stop if Release opens something older', 'Contact someone if thoughts of harm or self-punishment'],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't1p10-practice': {
    alt: 'Four conditions: use a somatic item if it’s a demand, stop if emotion is hard and you’re alone, contact someone if not eating washing or leaving, ask someone else to make the call if you can’t',
    accent: 'rgb(var(--slate))',
    rows: ["Use a somatic item if it's a demand", "Stop if emotion is hard and you're alone", "Contact someone if you're not eating, washing, leaving", "Ask someone else to make the call if you can't"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't2p1-practice': {
    alt: 'Four conditions: stop if Release opens too much, notice if you don’t want this at all, some conversations shouldn’t happen yet or not alone, speak to someone first if frightened of them',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if Release opens too much', "Notice if you don't want this at all", "Some conversations shouldn't happen yet, or not alone", "Speak to someone first if you're frightened of them"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't2p2-practice': {
    alt: 'Four conditions: stop if step four argues their side, stop if Release opens something older, skip repair if the harm repeated and never changed, speak to someone outside if frightened of them',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if step four argues their side', 'Stop if Release opens something older', 'Skip repair if the harm repeated and never changed', "Speak to someone outside if you're frightened of them"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't2p3-practice': {
    alt: 'Four conditions: end it if the re-reading won’t drop, stop if Release opens something older, contact someone if not sleeping or eating, speak to someone outside if violence was involved',
    accent: 'rgb(var(--slate))',
    rows: ["End it if the re-reading won't drop", 'Stop if Release opens something older', "Contact someone if you're not sleeping or eating", 'Speak to someone outside if violence was involved'],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't2p4-practice': {
    alt: 'Four conditions: stop if Release opens an old room, stop if saying it starts a rehearsal, contact someone if the resentment turns constant, get outside help if the situation hasn’t stopped',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if Release opens an old room', 'Stop if saying it starts a rehearsal', 'Contact someone if the resentment turns constant', "Get outside help if the situation hasn't stopped"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't2p5-practice': {
    alt: 'Four conditions: stop if Release opens an old room, stop if this starts to feel like pressure, contact someone if the distance costs relationships, get help if what’s underneath was done to you',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if Release opens an old room', 'Stop if this starts to feel like pressure', 'Contact someone if the distance costs relationships', "Get help if what's underneath was done to you"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't2p6-practice': {
    alt: 'Four conditions: stop if Release opens an old room, stop if the sentence starts a rehearsal, contact someone if the unevenness is constant, get outside help if it hasn’t moved',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if Release opens an old room', 'Stop if the sentence starts a rehearsal', 'Contact someone if the unevenness is constant', "Get outside help if it hasn't moved"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't2p7-practice': {
    alt: 'Four conditions: stop if Release opens too much, stop if it becomes self-prosecution, stop if explaining their psychology to them, skip this if the reaction is proportionate',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if Release opens too much', 'Stop if it becomes self-prosecution', "Stop if you're explaining their psychology to them", 'Skip this if the reaction is proportionate'],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't2p8-practice': {
    alt: 'Four conditions: use a somatic item if it’s a demand, contact someone if not eating or leaving, get help if a flat month becomes ordinary, mention it if only good things won’t land',
    accent: 'rgb(var(--slate))',
    rows: ["Use a somatic item if it's a demand", 'Contact someone if not eating or leaving', 'Get help if a flat month becomes ordinary', "Mention it if only good things won't land"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't2p9-practice': {
    alt: 'Four conditions: stop if Release opens an old room, stop if your half feels one-sided, speak to someone outside if you recognise control, contact someone if health or sleep is affected',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if Release opens an old room', 'Stop if your half feels one-sided', 'Speak to someone outside if you recognise control', 'Contact someone if health or sleep is affected'],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't2p10-practice': {
    alt: 'Four conditions: use a somatic item if it’s a demand, stop if emotion is hard and you’re alone, get expert help for children money or legal matters, contact someone if thinking of harm',
    accent: 'rgb(var(--slate))',
    rows: ["Use a somatic item if it's a demand", "Stop if emotion is hard and you're alone", 'Get expert help for children, money or legal matters', "Contact someone if you're thinking of harm"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't3p1-practice': {
    alt: 'Three conditions: stop counting if breathing worsens, see a doctor if it’s arriving days ahead, get qualified advice if the stakes are your livelihood',
    accent: 'rgb(var(--slate))',
    rows: ['Stop counting if breathing worsens', "See a doctor if it's arriving days ahead", 'Get qualified advice if stakes are your livelihood'],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't3p2-practice': {
    alt: 'Four conditions: stop if Release opens an old room, stop if the state won’t shift, get advice from HR if this isn’t just conflict, contact someone if it costs sleep or health',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if Release opens an old room', "Stop if the state won't shift at all", "Get advice from HR if this isn't just conflict", 'Contact someone if it costs you sleep or health'],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't3p3-practice': {
    alt: 'Four conditions: stop if step four turns to judgment, stop if Release opens something older, contact someone if thoughts of harm, get help if undermined by someone with power',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if step four turns to judgment', 'Stop if Release opens something older', 'Contact someone if thoughts of harm', "Get help if undermined by someone with power"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't3p4-practice': {
    alt: 'Four conditions: stop if Release opens an old room, stop if the protocol audits old mistakes, get support if feedback was meant to diminish you, contact someone if it costs sleep for weeks',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if Release opens an old room', 'Stop if the protocol audits old mistakes', 'Get support if feedback was meant to diminish you', 'Contact someone if it costs you sleep for weeks'],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't3p5-practice': {
    alt: 'Three conditions: drop the breath if it worsens things, get help if avoiding things you want, be honest about using something to cope',
    accent: 'rgb(var(--slate))',
    rows: ['Drop the breath if it worsens things', "Get help if you're avoiding things you want", 'Be honest about using something to cope'],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't3p6-practice': {
    alt: 'Four conditions: stop if Release opens an old room, stop if the session audits every room, get advice from HR if treated differently, contact someone if it costs sleep for weeks',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if Release opens an old room', 'Stop if the session audits every room', "Get advice from HR if you're treated differently", 'Contact someone if it costs you sleep for weeks'],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't3p8-practice': {
    alt: 'Four conditions: stop using step four to decide, stop if Release opens too much, this may be burnout if it’s everything, contact someone if you can’t decide at all',
    accent: 'rgb(var(--slate))',
    rows: ['Stop using step four to decide', 'Stop if Release opens too much', "This may be burnout if it's everything", "Contact someone if you can't decide at all"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't3p9-practice': {
    alt: 'Four conditions: use a somatic item if it’s a demand, see a doctor if this has run for months, get outside help if the load’s too much, contact someone if thinking of harm',
    accent: 'rgb(var(--slate))',
    rows: ["Use a somatic item if it's a demand", 'See a doctor if this has run for months', "Get outside help if the load's too much", "Contact someone if you're thinking of harm"],
    caption: 'Remove the last row and the other three stop holding.'
  },
  't3p10-practice': {
    alt: 'Four conditions: stop if this repeats the attempt, stop if Release opens a bigger question, this may be depletion not a block if exhausted, contact someone if this has spread to everything',
    accent: 'rgb(var(--slate))',
    rows: ['Stop if this repeats the attempt', 'Stop if Release opens a bigger question', "This may be depletion, not a block, if exhausted", 'Contact someone if this has spread to everything'],
    caption: 'Remove the last row and the other three stop holding.'
  },

  /* SR-397 (PASS-CLAUDE-CODE-shapes-all-types.md) · overlap, rolled out
     across every Accountability & Empathy resource. All 30 real ids follow
     t{track}p{protocol}-accountability. t2p9-accountability is SR-395's,
     not redone (see its own comment above — its middle carries a sub,
     "about their motives," that these 29 deliberately don't; see why below).

     STRUCTURAL FINDING: every one of the other 29 opens its own blind-spot
     content with the exact same real shape — "[named behaviour] — From
     inside, [reading A]. From outside, [reading B]." — one behaviour, two
     simultaneous readings, not sequential steps. (The sequential part of
     each record — naming the act, no because, no self-attack, the
     checkable change — is a different section entirely and was not used
     for any of these.) A first pass at this search looked specifically for
     a second paragraph explicitly announcing "the one that belongs to
     both," the way t2p9's own text does — found that construction in
     exactly one other record (t2p2-accountability's "the wait... both of
     you are in it for the same reason") and nearly concluded the other 28
     should skip. That was checking for the wrong signal: t2p9's explicit
     call-out exists because ITS blind-spot content comes in two named
     variants (pursue, withdraw) that needed a third paragraph to name what
     they share. Records with only one blind-spot paragraph don't need a
     third paragraph to do that — the paragraph itself already names one
     behaviour and gives its two readings directly. Re-read on that basis:
     every one of the 29 has it. Zero skips this type, same finding as
     SR-396's, stated the same way: the type genuinely has the shape.

     LABEL BUDGET, measured, not carried forward from SR-395's estimate —
     per the redirect asking for exactly that. The first attempt re-used
     SR-395's own already-shipped t2p9 values as a sanity check and found
     they don't clear a rendered-in-context getBBox() check either (a real
     ~8-23 unit overlap between the side subs and t2p9's own middle.sub,
     "about their motives" — small, screenshotted as legible at the time,
     but a real number, not the near-zero this comment originally reported
     in the SR-395 entry). Root cause, found before drawing any conclusion
     from it: text measured on a bare SVG appended straight to
     document.body picks up neither --font-sans/--font-serif (defined on
     .sr-read, not global) nor the .sr-shape .sr-lb/.sr-sm size rules —
     browser default (16px, wrong font) rather than the real 12.5-19px set.
     Every measurement below was taken with the test shape mounted inside
     the page's live .sr-read, matching real conditions exactly.

     Real per-row-index budget, empirically: side labels ("From inside" /
     "From outside", fixed, reused everywhere) have room to spare. Side
     subs (12.5px) tolerate real, mostly-verbatim phrases up to
     t2p9's own 32 characters with no change needed. middle.label (19px,
     serif, centre-anchored, sitting on the SAME row as both side labels)
     is the tight one — safe only up to roughly 20 characters, well under
     the floor's per-row budgets and under what a flat "~40 character"
     estimate would suggest. middle.sub, stacked on the same row as both
     side subs, is tighter still — t2p9's own 20-character sub only just
     clears its neighbours, and repeating that pattern 29 more times against
     real (often longer) side subs did not clear safely. Dropped middle.sub
     for this batch rather than fight that margin on every one of 29 —
     .sr-tx's own serif label, larger and alone on its row, carries the
     naming without it. A real difference from t2p9, reported rather than
     silently matched or silently changed to fit.

     middle.label is verbatim or a minimal trim of the resource's own name
     for the behaviour in every case (confirmed against source: "Cancelling"
     / "Not-doing" / "Braced" / "Correctness" / "The certainty" etc. are the
     resource's own words). left.sub/right.sub are the same paragraph's own
     "from inside" / "from outside" clauses, compressed for length, not
     reworded in substance. Accent, caption and position (mounted directly
     after the blind-spot paragraph the labels are drawn from) held
     identical across all 29, and identical to t2p9 bar the middle.sub
     difference above. */
  't1p1-accountability': {
    alt: 'Two readings of cancelling on plans: from inside a small private decision, from outside disinterest that accumulates',
    left: { label: 'From inside', sub: 'a small private decision', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'disinterest, and it accumulates', accent: 'rgb(var(--sage))' },
    middle: { label: 'Cancelling', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't1p2-accountability': {
    alt: 'Two readings of the volume: from inside the sixth round and normal, from outside the first round and sudden',
    left: { label: 'From inside', sub: 'normal — the sixth round', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'sudden — the first round', accent: 'rgb(var(--sage))' },
    middle: { label: 'The volume', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't1p3-accountability': {
    alt: 'Two readings of short replies: from inside efficiency, from outside being deprioritised',
    left: { label: 'From inside', sub: 'efficiency, and necessary', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'being deprioritised', accent: 'rgb(var(--sage))' },
    middle: { label: 'Short replies', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't1p4-accountability': {
    alt: 'Two readings of the checking: from inside clarifying, from outside requests to be reassured',
    left: { label: 'From inside', sub: 'clarifying, staying close', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'requests to be reassured', accent: 'rgb(var(--sage))' },
    middle: { label: 'The checking', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't1p5-accountability': {
    alt: 'Two readings of declining: from inside protecting other people, from outside being shut out repeatedly',
    left: { label: 'From inside', sub: 'protecting other people', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'being shut out, repeatedly', accent: 'rgb(var(--sage))' },
    middle: { label: 'Declining', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't1p6-accountability': {
    alt: 'Two readings of unpredictability: from inside just what the day was, from outside ground that keeps moving',
    left: { label: 'From inside', sub: 'just what the day was', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'ground that keeps moving', accent: 'rgb(var(--sage))' },
    middle: { label: 'Unpredictability', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't1p7-accountability': {
    alt: 'Two readings of not-doing: from inside the absence of capacity, from outside an invisible difference',
    left: { label: 'From inside', sub: 'not a decision — an absence', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'the difference is invisible', accent: 'rgb(var(--sage))' },
    middle: { label: 'Not-doing', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't1p8-accountability': {
    alt: 'Two readings of being less generous: from inside managing yourself silently, from outside seeming least pleased',
    left: { label: 'From inside', sub: 'managing yourself, silently', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'seeming least pleased', accent: 'rgb(var(--sage))' },
    middle: { label: 'Less generous', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't1p9-accountability': {
    alt: 'Two readings of staying out of the way: from inside the same, from outside capable and absent',
    left: { label: 'From inside', sub: 'staying out of the way', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'capable, and didn’t show up', accent: 'rgb(var(--sage))' },
    middle: { label: 'Staying out of the way', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't1p10-accountability': {
    alt: 'Two readings of not-doing: from inside the absence of capacity, from outside a series of small closures',
    left: { label: 'From inside', sub: 'not a decision — an absence', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'a series of small closures', accent: 'rgb(var(--sage))' },
    middle: { label: 'Not-doing', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't2p1-accountability': {
    alt: 'Two readings of being braced: from inside being careful, from outside someone braced who braces back',
    left: { label: 'From inside', sub: 'being careful', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'someone braced, who braces back', accent: 'rgb(var(--sage))' },
    middle: { label: 'Braced', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't2p2-accountability': {
    alt: 'Two readings of the coldness: from inside holding a boundary, from outside punishment, said or not',
    left: { label: 'From inside', sub: 'holding a boundary', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'punishment, said or not', accent: 'rgb(var(--sage))' },
    middle: { label: 'The coldness', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't2p3-accountability': {
    alt: 'Two readings of the checking: from inside caution you’ve earned, from outside being treated as though they might',
    left: { label: 'From inside', sub: 'caution you’ve earned', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'treated as though they might', accent: 'rgb(var(--sage))' },
    middle: { label: 'The checking', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't2p4-accountability': {
    alt: 'Two readings of correctness: from inside restraint, from outside being frozen out with nothing to answer',
    left: { label: 'From inside', sub: 'restraint', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'frozen out, nothing to answer', accent: 'rgb(var(--sage))' },
    middle: { label: 'Correctness', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't2p5-accountability': {
    alt: 'Two readings of the redirect: from inside a single small movement, from outside a pattern they can predict',
    left: { label: 'From inside', sub: 'a single small movement', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'a pattern they can predict', accent: 'rgb(var(--sage))' },
    middle: { label: 'The redirect', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't2p6-accountability': {
    alt: 'Two readings of being correct, and cold: from inside restraint and pride, from outside held at a distance',
    left: { label: 'From inside', sub: 'restraint, and pride', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'held at a distance', accent: 'rgb(var(--sage))' },
    middle: { label: 'Correct, and cold', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't2p7-accountability': {
    alt: 'Two readings of the certainty: from inside accurate perception, from outside a conclusion, not a question',
    left: { label: 'From inside', sub: 'accurate perception', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'a conclusion, not a question', accent: 'rgb(var(--sage))' },
    middle: { label: 'The certainty', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't2p8-accountability': {
    alt: 'Two readings of the flatness: from inside knowing it isn’t true, from outside no evidence for anything else',
    left: { label: 'From inside', sub: 'you know that isn’t true', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'no evidence for anything else', accent: 'rgb(var(--sage))' },
    middle: { label: 'The flatness', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't2p10-accountability': {
    alt: 'Two readings of absence: from inside no decision at any point, from outside a series of small closures',
    left: { label: 'From inside', sub: 'no decision, at any point', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'a series of small closures', accent: 'rgb(var(--sage))' },
    middle: { label: 'Absence', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't3p1-accountability': {
    alt: 'Two readings of a clipped tone: from inside conserving yourself, from outside coldness to those nearest',
    left: { label: 'From inside', sub: 'conserving yourself', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'coldness, to those nearest', accent: 'rgb(var(--sage))' },
    middle: { label: 'A clipped tone', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't3p2-accountability': {
    alt: 'Two readings of the correctness: from inside professionalism under pressure, from outside someone who’s decided about you',
    left: { label: 'From inside', sub: 'professionalism, under pressure', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'someone who’s decided about you', accent: 'rgb(var(--sage))' },
    middle: { label: 'The correctness', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't3p3-accountability': {
    alt: 'Two readings of staying out of the way: from inside the same, from outside capable and absent',
    left: { label: 'From inside', sub: 'staying out of the way', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'capable, and didn’t show up', accent: 'rgb(var(--sage))' },
    middle: { label: 'Staying out of the way', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't3p4-accountability': {
    alt: 'Two readings of holding back: from inside care, from outside a thing that hasn’t arrived',
    left: { label: 'From inside', sub: 'care', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'a thing that hasn’t arrived', accent: 'rgb(var(--sage))' },
    middle: { label: 'Holding back', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't3p5-accountability': {
    alt: 'Two readings of the withdrawal: from inside not wanting to discuss it, from outside someone who won’t be thanked',
    left: { label: 'From inside', sub: 'not wanting to discuss it', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'someone who won’t be thanked', accent: 'rgb(var(--sage))' },
    middle: { label: 'The withdrawal', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't3p6-accountability': {
    alt: 'Two readings of the edited version: from inside careful and appropriate, from outside less interesting than you are',
    left: { label: 'From inside', sub: 'careful, appropriate', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'less interesting than you are', accent: 'rgb(var(--sage))' },
    middle: { label: 'The edited version', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't3p7-accountability': {
    alt: 'Two readings of being half-present: from inside weighing something enormous, from outside visibly on the way out',
    left: { label: 'From inside', sub: 'weighing something enormous', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'visibly on the way out', accent: 'rgb(var(--sage))' },
    middle: { label: 'Half-present', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't3p8-accountability': {
    alt: 'Two readings of the default: from inside being careful, from outside made by default by someone else',
    left: { label: 'From inside', sub: 'being careful', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'made by default, by someone else', accent: 'rgb(var(--sage))' },
    middle: { label: 'The default', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't3p9-accountability': {
    alt: 'Two readings of coping: from inside coping, from outside evidence the volume is fine',
    left: { label: 'From inside', sub: 'coping', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'evidence the volume is fine', accent: 'rgb(var(--sage))' },
    middle: { label: 'Coping', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  },
  't3p10-accountability': {
    alt: 'Two readings of the struggle: from inside three weeks of it, from outside indistinguishable from undone',
    left: { label: 'From inside', sub: 'three weeks of struggle', accent: 'rgb(var(--slate))' },
    right: { label: 'From outside', sub: 'indistinguishable from undone', accent: 'rgb(var(--sage))' },
    middle: { label: 'The struggle', sub: '' },
    caption: 'A reaction is information about the exterior of your state, not a verdict on you.'
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SR_SHAPE_DATA: SR_SHAPE_DATA };
}
