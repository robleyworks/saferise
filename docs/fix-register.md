# SafeRise — fix register

Canonical record of defects and design decisions. Commits reference the ID:
`fix: SR-0NN …` or `feat: SR-0NN …`.

**Rules — numbering**
- Never renumber an existing ID.
- New items go at the bottom of their severity block with the next free number.
- The number is global — it does not restart per block.
- Items are marked complete when the branch carrying the fix merges to main, not
  when the commit is made.
- **A run script drafted outside this lane must reserve its IDs here before it is written.**
  Never assume the next free number: read this ceiling, extend the reservation, and write the
  script against the numbers it reserved. **Two collisions in two runs** — Run D found
  SR-108–SR-119 issued in commits but absent from the register, and a script queued after
  Run E had independently allocated SR-150, SR-151 and SR-152, which this run had already
  issued to the stale *"Pricing to be announced"* clause, the orphaned *"separately, above"*
  reference, and the carousel-clipping decision. The register is the allocator; a script is a
  consumer.
- **Highest ID issued: SR-179.** Reserved block open: **SR-154 to SR-175**, ceiling
  **SR-175**, reserved 21 Aug 2026 by the pricing-reconcile run. Allocate from SR-180. **The block SR-154–SR-175 is exhausted and the framework-pages run ran past its ceiling to SR-179**, extending the reservation rather than renumbering, exactly as the pricing run did at SR-150. **Reserve a fresh block before the next run is scripted.**
  The track-page-regressions run took SR-155 to SR-159 from a script drafted outside this
  lane, then allocated **SR-160**, **SR-161**, **SR-165**, **SR-166** and **SR-167** from findings raised mid-run, and **SR-154**
  for the sandbox record. The framework-pages run took **SR-168–SR-179**, issuing SR-176 to
  SR-179 beyond the ceiling as findings arrived mid-run.
  **SR-157, SR-158 and SR-159 are issued and permanently unused — this is the gap, and it is
  deliberate.** The run script named them for the card, the carousel and the white flash. Those
  three were re-scoped mid-run once the tree contradicted the brief, and reissued as SR-162,
  SR-163 and SR-164 with the corrected findings attached. The originals were **not** reused for
  the replacements, because a number already written into a script and a commit trail must not
  come to mean something else. **Do not reach back for 157-159**: they sit inside a range every
  later allocation has read past, which is exactly what caused the three collisions below.
  The previous block (SR-129–SR-150) is exhausted through SR-153; SR-150 was passed because
  the run issued beyond its ceiling and the reservation was extended rather than renumbered.

**Standing invariants — checkable in one command each**
- **Euro escapes exist only inside `PRICING` in `content/tracks.js`. Count: 8.** Corrected from
  9 by [[SR-168]]. **Counted inside the `PRICING` object only, with `/* */` comments stripped
  first** — an invariant that counts commentary breaks every time someone writes a note, which
  is what made the old number unreproducible. One command, and it prints `8`:

  ```
  python3 - <<'PY'
  import re
  b = open('content/tracks.js', encoding='utf-8').read().split('var PRICING = {')[1].split('\n};')[0]
  print(len(re.findall(r'\\u20AC', re.sub(r'/\*.*?\*/', '', b, flags=re.S))))
  PY
  ```

  The eight are `t1` €9, `t1.standard` €19, `t2` €29, `t3` €39, `workshopPersonal` €29,
  `workshopRelationship` €49, `premium1` €129, `premium3` €299. Companion halves, both **0**
  with comments stripped: escapes anywhere outside the `PRICING` block, and bare `€` glyphs
  anywhere in the file. Part of every close-out sweep.
- **The banned-vocabulary invariant is a list of words, and three of them have ordinary
  senses the tree legitimately needs.** Recorded at the close of Run H, unfixed, because it is a
  copy decision rather than a defect. The Track 01 content rules prohibit *quantum, frequency,
  manifest, rewire, streak, badge, graduate* "absolutely". Swept over prose, with identifiers
  and stated prohibitions excluded, the tree holds **six live hits and not one is the register
  the ban is aimed at**:
  - `frequency` ×5 in `method-heartmath.html` — the **resonance frequency**, peer-reviewed
    physiology: *"near the frequency at which the body's own blood-pressure regulation already
    oscillates"*. Enforcing the ban literally means rewriting the SME page's sourced claim.
  - `frequency` ×1 in `index.html` — the Proximity Guide's *"Reduce access, frequency,
    intensity, or dependence"*, where it plainly means **how often**.
  - `manifest` — a **data key** and a set of CSS class names (`id-manifest-row`), never rendered
    as copy.

  **THE INVARIANT NOW CARRIES ITS OWN EXCLUSIONS. All three are part of it, not notes beside
  it — a sweep that does not apply them is measuring something else.**

  1. **Identifiers are not copy.** Class names, ids, data attributes, object keys and CSS
     selectors are structure. `jprog-tier-badge` is not a badge; `manifest` as a data key is not
     a claim. The prohibition is on member-facing vocabulary, and nothing a member reads comes
     from a selector. Confirmed twice independently — this sweep, and [[SR-192]]'s transform
     check, which reported its own field names as authored copy until it excluded them.
  2. **A prohibition stated is not a prohibition broken.** `method-jung.html` and
     `method-mate.html` carry *"No streaks, no completion, no graduation anywhere on this
     platform."* A naive sweep scores that as three violations. It is the platform **promising**
     not to do the thing, which is the €275 failure mode one level up: an invariant that cannot
     tell a rule from its breach breaks the moment anyone writes the rule down. Exclude a hit
     whose immediate lead-in negates it.
  3. **An inert selector is not a render.** Rules surviving in a stylesheet with no element to
     match are recorded as inert by [[SR-181]] and [[SR-185]] and are not violations. Distinguish
     inert from **dormant** (Rule 14) — [[SR-191]]'s ribbon rendered nothing only because
     `sr.resume` has no writer, and that one *was* a violation, with a delayed fuse.

  **The word list itself needs replacing with sense-specific patterns** — *raise your frequency*,
  *manifest your* — because the register the ban is aimed at is pseudo-scientific, and three of
  the seven words have ordinary senses the tree legitimately needs. Until that lands, an
  unqualified word sweep produces six false positives, and **an invariant that cries wolf gets
  switched off by whoever tires of the noise** — which is precisely the outcome Rule 21 exists to
  prevent.
- **No price is spelled out except in `PRICING.words`.** Verified clean at the close of
  Run E: prices in words exist only in the record, one derived span and one comment.
- **`€59`, `€139` and `€275` appear nowhere — in values.** Retired by SR-136/SR-141.
  `\u20AC275` **does** appear in `content/tracks.js`, inside the SR-136/137 comment recording
  why the `premium` key must not be re-added. That is the invariant's own worked example of why
  comments are excluded: counted naively, a note explaining a removal reads as the removal
  having failed.
- **SR-044 to SR-227 are issued.** SR-215 was folded into SR-222; SR-223's finding is recorded there too. SR-180 to SR-193 by Run H (Track 01 content); SR-198 to
  SR-202 by Run I (Tracks 02/03 specification), which also issued **SR-197** for a missing
  source document. **SR-194 to SR-196 and SR-200 were never issued and are free** — SR-200's
  phase was resource authoring, which Run I was barred from.

  **SR-182 was reassigned and now carries a real entry** — protocol.html's query-string routing.
  It was recorded mid-run as spent-not-free on the assumption its phase had been absorbed
  elsewhere; Andre reassigned it, and the register follows the decision rather than the earlier
  bookkeeping. **SR-183 and SR-184 remain spent, not free** — their work was carried out under
  SR-189 and SR-190. Do not reach back for them.

  A number recorded as spent is a statement about intent, not a lock. When the person allocating
  reassigns one, the entry gets written and this note gets corrected — which is Rule 21 applied
  to the register's own bookkeeping.

  All are written up below except four:
  - **SR-064** — issued and referenced in `dashboard.html:1005` and `:1007`, but never
    written up here. It is the derived-price work `docs/SR-061-065-run-report.md` covers.
    Not free.
  - **SR-073, SR-114, SR-116** — raised and then dropped without ever being issued, so the
    numbers are free. **Do not reach back for them while a higher number is available.**
    They sit inside ranges other branches have already read past, and taking a number from
    the middle of a read range is what caused the three collisions below.

  IDs collided three times because parallel branches each read the ceiling and allocated
  from it at the same moment; reserving the range up front is what stops the fourth. A gap
  between the last written entry and the ceiling is expected — do not "tidy" it by lowering
  the number, and do not allocate inside a reserved range from another branch.

**Rules — method**

Earned across Runs C to G. Each cost something to learn; the worked example is named so
the rule can be checked rather than taken on trust. **Thirty-two rules.** (The count above
read twenty-four through Rule 27 — a second copy that did not regenerate when Rules 25–27
were added, the exact failure mode Rule 26 names. Corrected in passing, not chased further.)

1. **A deliberate non-fix gets a register entry** carrying the reasoning and an explicit
   do-not-tidy line. An undocumented correct refusal is indistinguishable from an oversight,
   and the next run will "fix" it. Worked examples: `extras: null` ([[SR-117]]), the
   `PRICING` launch/standard pair ([[SR-124]]), the relocated
   `#personal-protocol-page .sr-tile` rule ([[SR-123]]).
2. **Reproduce before fixing.** If it does not reproduce, stop and report rather than
   editing toward the brief. **Five items in Run D did not reproduce at all** — [[SR-111]],
   [[SR-112]], [[SR-113]], [[SR-117]], [[SR-118]] — and a sixth, 4c's "remove the
   Elevation-only rows", described a table shape the tree does not have: every row carried
   content in all four columns, so there was nothing to remove. A spec anticipating a case
   the tree lacks is a note for the record, not an instruction to satisfy.
3. **When notes and the tree disagree, the tree is right.** Held six times in one branch,
   including a brief that named a resource key which has never existed and a note claiming
   `SHARED.resources` held twelve entries when it holds nine.
4. **Run the JS parse check first**, before div balance and CSS braces. Neither of those can
   see a broken script brace. A splice that deleted one `}` passed both and took the whole
   page's JS down with it.
5. **Stop server → restore `launch.json` → stage → commit.** In that order. Committing
   first ships a dev-server config pointing at a scratchpad path that exists on no other
   machine.
6. **Anchor structural edits by line and assert against neighbours.** Never by pattern where
   the pattern repeats: `repeat(4,1fr)` appeared three times with one target;
   `€19/mo` sixteen times, three of them carrying the wrong ladder.
7. **Verification globs cover every tracked file and every encoding form.** Never `*.html` —
   SR-096 was declared complete against a `.html` glob and missed `content/tracks.js`, the
   source of truth. Never only the glyph — `PRICING` stores `\u20AC` escapes, so a `€`
   sweep misses the price record itself.
8. **Runtime-built values are invisible to static greps.** `index.html` builds much of
   `RESOURCE_CONTENT` through single-quoted assignments inside IIFEs; `dashboard.html`
   builds prices from `data-sr-price` at load. **Measure the live object graph.**
9. **Prove null results with a sentinel pair, and prove any new probe sensitive before
   trusting it** — but **a sentinel only proves a probe works within its own method. It
   cannot tell you the method itself is wrong.** [[SR-120]] is the worked example: a
   sensitive probe, a confident null, and a conclusion that was false because the whole
   approach could not see runtime-built keys.
10. **Report capture artifacts rather than letting them stand as evidence.** A black
    screenshot or a zero-width viewport invalidates **every** measurement taken in it,
    including ones already reported. A number that looks authoritative and is not is worse
    than no number.
11. **A template cloned into multiple overlays counts once at source and many times in the
    DOM.** `index.html`'s footer is one `<template>` rendered twelve times. Record the
    multiplier so a future count does not read as a discrepancy.
12. **A count is only as good as the artefact it is reconciled against.** Where a finding
    sits in prose but not in the table, **the table is wrong.** Reconcile against the
    enumerated list, and record every movement in a count with its cause — [[SR-110]] moved
    17 → 18 → 19 and both moves are written down.
13. **No undated promises.** "Soon", "coming soon", "opening soon", "TBA" and equivalents
    are marketing claims about something with no date.
14. **A rule with no visible effect is not necessarily dead.** Distinguish **inert** —
    matches nothing, or is fully overridden — from **dormant**: matches, wins on some
    properties, and is masked only on the one that would show. A dormant rule **resumes** the
    moment whatever masks it changes; it does not need re-adding. **Measure computed style,
    not rendered geometry, before concluding anything is dead.** [[SR-123]] is the worked
    example.
15. **A workaround that looks redundant may be load-bearing at a level the diff does not
    show.** Before removing scaffolding, prove what it was scaffolding. Module-level
    ordering, hoisting and object identity are invisible to checks that compare rendered
    output or resolved values. [[SR-129]]: promoting the T2/T3 literals as briefed would
    have thrown a `TypeError` that no div-balance, brace-count or JSON-equality check could
    have predicted.
16. **A brief is not evidence.** Any premise sourced from outside the working tree — a
    snapshot, a mockup, an earlier session's notes — is an unverified claim and must be
    stated as one. **Five premises inverted on contact with the tree in Run E alone**:
    SR-127's price contradiction, SR-130's €19, SR-132's `dispenza` key, SR-131's appendix
    data, and SR-142's seven `href="#"`. Name the source of an asserted value so it can be
    discounted when it conflicts. Rule 3 decides the conflict; this rule stops it being
    invisible.
    **This extends to the tester's own fixtures.** A seed is a premise too: [[SR-161]]'s
    fallback probe seeded a protocol name that exists in no track, and the correct
    behaviour — degrade to nothing ringed — read for a moment as the fallback failing.
    Check fixtures against the record before trusting any result taken from them.
    **Run K inverted a fourth premise of Andre's, and the CAUSE is the reusable part.**
    [[SR-213]] was briefed as "Track 01's four were wired under SR-193 — a file drop". Nothing was
    wired on any track, `SR-193` is the support advisory, and the slots were rendering
    placeholders with the path typed into a JS string. **The stated cause: the ID was read from a
    summary rather than from the register.** A register entry is the record; a summary of it is a
    copy, and Rule 16 applies to the copy exactly as it applies to a brief. **Check the ID against
    the register before building on what it claims** — the same run had already found a register
    entry propagating its own error into an instruction ([[SR-187]]).
    A second premise inverted in the same phase: Track 01's hero was described as having a bright
    left half; measured L=0.015, **darker** than Track 02's.
    **Run F inverted four more premises**: [[SR-155]]'s stub route being `dashboard.html`'s
    own rail rather than `protocol.html`, [[SR-156]]'s `|| ROUTES.dashboard` fallback being
    latent rather than live, [[SR-162]]'s `.pimgnote` emitting nothing anywhere, and
    [[SR-163]]'s carousel binding correctly all along.
17. **Facts spelled out in words evade every sweep aimed at symbols or identifiers.**
    "Four programs" survived a sweep for `Elevation`; "Nineteen euros a month" survived a
    sweep for `€19` and `€19`. Both sat in surfaces a dedicated pass had already
    swept. Cover the numeral, the escape **and** the spelled form. Where the record holds a
    canonical spelled value — `PRICING.words` — anything spelling it independently is a
    defect by construction.
18. **An assertion over rendered text only covers surfaces mounted at that moment.**
    Conditional UI — modals, readers, paywalls, overlays — must be opened and measured in
    its rendered state. [[SR-124]] asserted "no €49 anywhere" against
    `document.body.innerText` and was wrong for a release cycle, because the paywall holding
    €49 only exists once a locked resource opens. **This rule paid twice in Run E** — the
    `openReader` paywall and [[SR-149]]. Both were invisible to every static sweep and to a
    page at rest. Defects in conditional UI are found by *exercising* the page, and an
    entry-point inventory is what tells you which controls to exercise.
19. **Replace whole blocks, not first lines.** A multi-line comment or banner replaced by
    its opening line leaves the remainder stranded mid-sentence, attached to whatever
    follows. This happened twice in Run E — the `TRACKS` banner stranded by the SR-129
    hoist, and the SR-057 comment in SR-136. Neither would be caught by a parse check, a
    brace count or a JSON-equality proof, because a stranded comment is syntactically valid.
    Anchor block edits to the block's full extent and assert the closing line as well as the
    opening one.
20. **When a verification cannot run in the environment, test against a known-good control
    in the same environment and compare.** Smooth-scroll animation does not run in this
    preview, so a scroll measurement alone proved nothing; measuring the fixed target
    alongside two that already worked, under identical conditions, established the fix
    behaves identically to things known correct. A control turns an unusable measurement
    into a usable comparison, and separates an environment artifact from a page defect —
    the failure mode Rule 10 warns about, now with a technique attached. [[SR-149]].
21. **Correct live assertions; annotate dated records.** A standing invariant, a count, or any
    claim a future run will check is **live**: when it goes stale it must be rewritten, because
    an assertion nobody can reproduce stops being checkable and the next run either "fixes" the
    tree to match it or quietly stops trusting it. A report, a before-snapshot, or an entry
    recording what was true when it was raised is **evidence**: rewriting it falsifies the
    record and destroys the trail later entries depend on. Mark it superseded and point at what
    replaced it.
    Worked example: [[SR-168]] rewrote the euro invariant — live — and **annotated** Run E's
    `PRICING` table rather than editing it, because [[SR-136]]'s before/after pair and the €49
    ordering constraint both depend on those numbers standing as measured. [[SR-091]] and
    [[SR-127]] were left alone for the same reason.
    **The €275 finding is this rule's own worked example, and the strongest argument for it.**
    The invariant *"€59, €139 and €275 appear nowhere"* read as violated: `\u20AC275` sits in
    `content/tracks.js` inside the [[SR-136]]/[[SR-137]] comment recording **why the `premium`
    key must not be re-added**. A note explaining a removal was being counted as the removal
    having failed. An invariant that counts commentary breaks every time someone writes a note —
    which is exactly how a live assertion goes stale for a reason that has nothing to do with
    what it guards.

22. **Where two inventories share a key namespace, matching names are evidence of COLLISION
    RISK, not of correspondence. Verify by content, never by key.** [[SR-206]] is the worked
    example and it is the most dangerous shape found so far, because every structural check
    passes while the wrong resource is served. The Reader's Track 01 keys and the authored set
    share six type names — `guide`, `advisory`, `companion`, `disclosure`, `crisiscard`,
    `repair` — and **two of the six name different resources**: old `guide` is *Protocol Guide*,
    a walkthrough, while new `guide` is *How This Works*, the mechanism; old `advisory` is
    *Attention Advisory*, new is *Proximity Guide*. A key-by-key migration produces a page that
    renders, validates, balances and serves the wrong text.
    **Corollary, from the same entry: key on TYPE, never on POSITION.** A resource's ordinal
    shifts with the conditionals — Disclosure & Support is 06 on a protocol without an advisory
    and 07 on one with it — so an implementation indexing by number is correct on the first
    protocol anyone tests and wrong on every conditional-bearing one.
    **Second corollary, [[SR-209]]:** the same applies to placement. Anchor to text, not to a
    block index, because an index moves when a paragraph is added.

23. **A second inventory that disagrees with ITSELF is past reconciliation — replace it, do not
    sync it.** [[SR-206]]: the Reader's hardcoded key list drifted three separate ways from its
    own data. `p1` is served `advisory` while `META['t1-01'].extras` is `[]`; `p2-crisiscard`
    exists as data with no key slot, documented as dead at `index.html:4212`; and `p10` carries a
    one-off `crisis-p10` that fits no pattern. Reconciling a list in that state means choosing,
    per row, which of two wrong records to believe. **Derive it from the source the counts
    already use** — `SHARED.resources` plus `extras` — and the drift has nowhere to live.

24. **A PATH IN THE RECORD IS A CLAIM THE ASSET EXISTS.** Where a file is absent the record
    carries the brief and the ratio but **no `src`**, and the slot renders its placeholder having
    made **no request at all**. [[SR-214]] is the worked example: Track 03's four section slots
    were first given paths for unproduced files, which would have cost a 404 per slot on every
    page load to reach the same visible result as making no request.
    **An `onerror` fallback is a repair, not a design.** It exists for the file that vanishes
    after the record was written; it is not the mechanism for a file you already know is missing.
    The request should never be made.
    Corollary: the same applies to any record field a surface trusts. A `scrim`, a `ratio` or a
    duration in the record is a claim about something real, and a consumer is entitled to act on
    it without checking.

25. **Where a family of assets places against a family of documents, the rule is POSITIONAL
    CONSISTENCY, not content fit.** [[SR-256]] is the worked example and the reasoning inverts the
    intuitive answer. Asked where t3-05's Release diagram belonged, the natural move is to read the
    blocks and pick the one the picture describes — which gave block 6, the paragraph naming the
    split. **Every one of the other 29 places on the HEADING block, 29 of 29 with no exception**, so
    the answer is block 5. Content fit chooses a different block on any protocol whose prose runs
    differently, and the family stops being a family. **Measure what the siblings do before reasoning
    about what the asset means**, and record the convention so it is not re-argued each time.
    Corollary check, one command: a stored index that does not point at a heading is a defect.

26. **AN ASSET'S STORED DESCRIPTION IS A SECOND COPY THAT DOES NOT REGENERATE WITH IT.** [[SR-256]]
    found t3-06's `alt` reading *"The room and The editing"* while its SVG showed *"The flatness and
    Reproaching yourself"* — the file was reissued when the protocol was renamed and the description
    was not. **A screen reader was being handed a description of a diagram that is not on the page**,
    and no visual check could see it: the image was right, the page was right, only the invisible
    half was wrong. **Any asset swap must RE-DERIVE the alt from the new asset, never inherit the old
    one.** Nothing but a regression sweep across the whole family catches this, so sweep the family
    after any single-member replacement. Generalises past `alt`: captions, transcripts, `aria-label`,
    manifest titles and any stored text describing a binary are all second copies with the same
    failure mode.

27. **A DELIVERY IS VERIFIED PER FILE, NEVER PER FOLDER.** `assets 3` carried five files: `t1/range.jpg`
    was the [[SR-242]] fix and installing it was right ([[SR-257]]), while `journey/t1-band.jpg` in the
    same folder was 1400×583 and would have **regressed a currently-correct 1400×380 sibling**. Same
    delivery, same date, one file that fixes a defect and one that creates one. Measure every file
    against the slot it claims; a folder is not a unit of correctness.
    **Corollary — check the FORMAT, not the extension.** [[SR-254]]'s two Desktop candidates were
    **PNG data behind `.jpg` and `.jpeg` extensions at ~1.7 MB**, against siblings at 174–192 KB.
    Browsers sniff content type, so both would have rendered and shipped **nine times the expected
    bytes with the extension hiding it**. `PIL.Image.open(p).format` is the check; the filename is not.

28. **AN ID CITED IN A PREMISE IS A CLAIM THAT EVIDENCE EXISTS, NOT THE EVIDENCE ITSELF —
    CHECK IT AGAINST THE REGISTER BEFORE ACTING ON IT.** Extends Rule 16, and [[SR-277]] is the
    worked example — a different failure from the nine premises Rule 16 already catalogues.
    Those were **stale**: a real record, drifted since it was written. SR-238, SR-239 and
    SR-234, cited in a brief as completed work ("SR-238 rebuilt the cards as a fixed grid...",
    "SR-234 made the carousel a 13-second arrival gesture"), **do not exist anywhere in this
    repository** — no register entry, no commit, no code trace, checked against `git log --all
    --grep` and this file directly. They were invented and asserted with the appearance of
    provenance an ID carries by this project's own convention. **A fabricated ID is more
    dangerous than a stale document**: a stale document is still evidence of something, aged;
    a fabricated one borrows the register's credibility with nothing behind it, and reads as
    more trustworthy than an unsourced claim would have. Acting on it here would have meant
    rebuilding the working SR-174/174b/178/162/163/182 lineage against a history that never
    happened. The check costs one command and must run before the premise is acted on, not
    after — Rule 16 says name the source of an asserted value; this rule says an ID is not by
    itself a source, it is a pointer, and the pointer must resolve.

29. **WHERE TWO RULES SET THE SAME PROPERTY, THE LOSER FAILS SILENTLY — VERIFY A NEW
    TRANSITION OR ANIMATION BY COMPUTED STYLE, NOT BY WATCHING THE PAGE.** [[SR-277]] is the
    worked example: `.sr-tp-pcard`'s own `transition:border-color .2s` ([[SR-174]]) outranked
    `.sr-stagger>*`'s transition rule on specificity, and a shorthand re-declaration resets
    every longhand it does not name — silently deleting the new reveal's opacity/transform
    transition on every protocol card. **No error and no visual artefact beyond the plain
    absence of the thing that should have happened**: a screenshot of the broken state and a
    screenshot of the fixed one are identical, because both eventually show the card at full
    opacity — only the path there differs. `getComputedStyle(el).transitionProperty` and
    `.transitionDelay` are what distinguish them; a rendered screenshot is not. Extends Rule 14's
    "measure computed style, not rendered geometry" from diagnosing a dormant *existing* rule to
    verifying a newly *added* one is not itself arriving dormant.

30. **HORIZONTAL OVERFLOW: MEASURE THE CONTAINING BLOCK, NOT THE ELEMENT THAT LOOKS WRONG.**
    [[SR-280]] is the worked example. `#main-nav` (`position:fixed;left:0;right:0`) rendered 487px
    wide against a 390px viewport, and every symptom pointed at the nav — its own `.nav-link` row,
    its own `overflow-x:auto`. The nav was innocent. `body{overflow-x:hidden}` had no matching rule
    on `html`, so unrelated wide content elsewhere on the page widened the initial containing
    block, and the fixed element — having done nothing wrong itself — inherited the wider box
    resolving `left`/`right` against it. **A `body`-only `overflow-x:hidden` does not contain the
    viewport**; the symptom surfaces on whatever is `position:fixed`, which is rarely the cause.
    Confirmed, not inferred: setting `html{overflow-x:hidden}` alone collapsed both the page's
    `scrollWidth` and the nav's own computed width back to 390px, with nothing else touched.
    **Corollary — where the fix lives matters as much as what it is.** The same property change,
    applied to a stylesheet shared with pages using `position:sticky`, breaks sticky exactly the
    way a standing comment already documents (`overflow-x` on an ancestor forces the paired
    `overflow-y` to `auto`). Scope the fix to the page that has the defect, not to every page that
    shares a stylesheet with it.

31. **A DEFERRED ARCHITECTURAL FINDING RECURS AS NEW-LOOKING SYMPTOMS — CHECK AGAINST IT BEFORE
    LOGGING SOMETHING AS INDEPENDENT.** [[SR-084]] named and deferred `index.html`'s duplicate
    content store on 19 Aug — "index.html still carries the cut resources and every duration,"
    explicitly held back as its own reviewable pass. [[SR-281]] was briefed as five unrelated
    defects — stale pricing, stale durations, retired vocabulary, a second image set, and the
    question of whether they shared a cause. **Four of the five were one cause wearing four
    faces**, and the brief that raised them did not know that going in. A structural finding that
    is deferred rather than fixed does not stop producing symptoms; it produces a new one every
    time someone touches the page it lives on, and each will look like its own defect until it is
    checked against what was already deferred. Before logging a new finding on a surface with a
    known open architectural deferral, check the deferral first — the finding may already be
    explained.
    **Corollary, from [[SR-282]]'s own first-pass error: while two stores exist, the second one is
    never the reference.** [[SR-282]] initially reported `dashboard.html` as stale by checking it
    against `index.html` — the duplicate content store SR-281(e) exists to warn about, and
    therefore the least reliable source in the tree for exactly this question. `dashboard.html` was
    correct; `index.html` was wrong. Any comparison involving a page with a known duplicate-store
    deferral must run against the authored source (`content/tracks.js` here) — never against the
    duplicate, even when the duplicate is the page that happens to be open.

32. **A CONCATENATION AND A RENAME LOOK IDENTICAL IN A DIFF — ONLY THE SURROUNDING COPY TELLS THEM
    APART, AND IT HAS TO BE CHECKED BEFORE THE EDIT, NOT AFTER.** [[SR-285]] is the worked example.
    "The Creative Flow Unlock Protocol" → "The Creative Flow Protocol" is an eleven-occurrence
    string substitution regardless of which of the two defects caused it — a label word wrongly
    concatenated into a title (mechanical, no new copy needed) or an actual second name for the
    protocol that the surrounding copy still describes (a rename, where [[SR-279]]'s five
    copy-content sites would apply). The two are indistinguishable from the string change alone.
    What distinguished them here: every occurrence's surrounding prose — the card's own landing
    description, the meditation's own body — was checked for whether it described "unlocking" as a
    theme before the substitution ran, not after. It did not, so the edit was safe as mechanical.
    **Had any surrounding copy described unlocking, the identical string edit would have been a
    silent rename** — correcting the label residue while leaving the protocol's actual subject
    unaddressed, exactly the failure [[SR-279]] was raised to prevent. Confirm which case applies
    before treating a multi-occurrence string fix as mechanical; do not infer it from the fact that
    a clean substitution exists.

**Measurement artifacts — the standing pre-flight**

Seven now, every one found the same way: a plausible reading that was wrong. Run these before
trusting any measurement, and **report the check alongside the result**, not instead of it.

| artifact | how it lies | countermeasure |
|---|---|---|
| **Collapsed viewport.** `resize_window` with a *preset* leaves `innerWidth`/`innerHeight` at **0**. | Every geometry reading taken there is void. The mockup statebar measured **231px** tall at zero width and **51px** at 1280x860. | Set explicit `width`/`height`. Assert and report **`viewport_usable`** with every measurement. |
| **Stale scratchpad mirror.** The preview serves a copy of the tree ([[SR-154]]); a silently failed sync leaves you verifying pre-edit files. | A clean pass, with numbers that all look right, taken against the code you just changed away from. | **Sentinel every sync**: write a unique token into the file just edited, sync, confirm it appears in the mirror **and is absent from a control file**, remove it, sync again. |
| **Browser cache serving a pre-edit page.** | The first post-[[SR-155]] reading showed the removed statebar still present, while `curl` against the same server returned a file without it. | Cache-bust every verification URL. **A busted HTML URL does not bust its subresources** — `js/`, `css/` and `content/` survived both a query change and a forced navigation, and [[SR-162]] briefly read as not rendering at all because of it. `fetch(url,{cache:'reload'})` each one, then reload. |
| **The environment cannot reproduce the symptom.** | A false pass, or a working feature reported broken. The preview's canvas is *dark*, so an unfixed page passes the white-flash test ([[SR-164]]); CSS transitions never advance, so an applied transform reads as identity forever ([[SR-149]], [[SR-163]]). | Force the condition and compare against a known-good control — light colour scheme, a stalled stylesheet, `transition:none`. Report it **as a control-based result**, never as a direct observation. |
| **No JavaScript runtime — check, do not assume.** ⚠ **Corrected 23 Aug 2026: a runtime *is* now reachable.** `preview_start` runs against a scratchpad mirror when `launch.json` points at an **absolute** path inside the mirror, and `javascript_tool` then executes in the page. `node`, `deno`, `bun` and `jsc` remain absent on the host, and `preview_start` against the repo's own relative path is still denied — that is the trap, not the absence of a runtime. Two mirror-only gotchas cost a cycle each: `SimpleHTTPRequestHandler` must be passed `directory=` explicitly or its `__init__` calls `os.getcwd()` and raises `PermissionError` under the sandbox, and `navigate` to a **path** on the preview origin is refused where `navigate` to the **bare origin** followed by `location.href=` inside the page is not. | Before this was checked, Rule 8's "measure the live object graph" was reported unavailable and static readings stood in for runtime ones. The inverse now applies: assuming no runtime forfeits the only measurement that settles a conditional-UI or load-order question. | **Try `preview_start` against an absolute mirror path first.** Only fall back to Rule 20's control method if it genuinely fails. Where a count was taken control-based under the old assumption, re-take it. |
| **A console buffer that outlives the page.** | Errors persist across navigations **and across a preview-server restart**, so a stale failure reads as a live one. [[SR-169]] opened with 33 errors on a seed tab — one `openRoute` message and 32 × 404 — every one of them left over from Run F's deliberately-stalled control pages, on five files that were in fact clean. | **Read the console in a fresh tab.** A non-empty console on a reused tab proves nothing until the tab is new; a clean one in a fresh tab is the only reading worth reporting. |
| **A hidden pane: `requestAnimationFrame` never fires.** The preview tab reports `document.visibilityState === 'hidden'` even after `tabs_select` fronts it. Measured: **0** rAF callbacks in 800ms, against **2** `setInterval(…,20)` fires in the same window — timers are throttled to roughly one per 400ms. | **An rAF-based sampler returns an empty array, which reads exactly like a page that loaded instantly.** SR-233's first probe recorded zero mid-parse samples and the honest-looking conclusion — nothing to see — was the opposite of the truth: the nav shell was live for 49.6% of the load. A parent-frame sampler is doubly blind, because parsing a multi-megabyte child starves the parent's main thread as well. | **Never clock a measurement on rAF here.** Sample from *inside* the document under test with inline `<script>` at known parse points — those run regardless of visibility — or drive the clock from the server by throttling the response. Report `visibilityState` alongside any timing result. |



**Two notes on the runtime artifact, from the run that found it.** Kept as written: both were true when taken, and the first is now superseded by the row above (Rule 21 — the row is live and was corrected; these notes are dated evidence and are not).

**The documented workaround is itself now blocked.** The procedure recorded further down this
register — run the server from the scratchpad against a mirror of the working tree, with
`launch.json` temporarily repointed and restored — was attempted first and **denied by the
permission classifier**, as were `preview_start` on the repo's own config, `file://` access, and
`osascript`. A workaround written down in the register is not a guarantee it still runs; check
it, and record it when it stops working rather than leaving the next run to rediscover it.

**A control pinned to `HEAD` goes stale the moment you commit.** Rule 16 extends to the
tester's own fixtures, and this is the cheap version of that mistake: the SR-180 probe validated
against `HEAD:content/tracks.js`, which was correct while the work was uncommitted and became
wrong three commits later — the same probe then reported `FAIL` against a tree that was right.
**Pin a control to an immutable ref**, not to a moving one. The counts never changed; only the
fixture did.


*Note: IDs SR-001 to SR-043 were tracked in an earlier artifact and covered work that
has since shipped. Numbering continues from SR-044 so no ID is ever reused.*

---

## BLOCKER

*None open.*

---

## HIGH

### SR-045 · Track accent tokens conflict between design system and dashboard
`css/saferise-system.css` defines `--sr-track02:#FF6FA8`, `--sr-track03:#5BC8D8`,
`--sr-track04:#B57BFF`. The member dashboard defined a parallel set `--t2:#E87090`,
`--t3:#4E9AA6`, `--t4:#9B7FD4`. `--t1` and `--sr-track01` agreed at `#D4A843`.
A member moving between the marketing site and the dashboard would see the same track
in two different hues.

**Resolution.** System values adopted as the single source of truth. Dashboard
duplicates removed; `saferise-system.css` now loads in `dashboard.html` before the
dashboard stylesheet. If a hue reads wrong on the dashboard's darker ground, change it
in `saferise-system.css` so both surfaces move together — never fork it back.

`--t1`–`--t4` deleted from the dashboard's `:root`; all ten usages repointed to
`var(--sr-track01..04)` across `css/saferise-dashboard.css` (the `--accent`
default) and the `TRACKS` / `JOURNEY` objects in `dashboard.html`. Loading the
system sheet exposed [[SR-048]].

*Status:* complete · *Raised:* 17 Aug 2026 · *Merged:* 17 Aug 2026

### SR-046 · Class collisions between dashboard, index.html and the design system
- `.sr-hero`, `.sr-hero-title`, `.sr-hero-sub`, `.sr-hero-cta` are defined in both
  `index.html`'s inline style and the dashboard CSS, with different geometry.
- `.sr-player` carries 15 rules in `saferise-system.css`, including descendant
  selectors such as `.sr-player .exp-tabs`. The dashboard defines its own
  `.sr-player`.

Both were inert only because the two stylesheets never loaded together — a condition
SR-045 removes. Precedent: `.sr-dash-next`, dead code from a removed column, silently
restyled the carousel's next arrow into a 62×46 oval and went undetected until it
rendered.

**Resolution.** Dashboard classes namespaced to `sr-dash-hero*` and `sr-dash-player*`.
`index.html` and `saferise-system.css` untouched.

23 tokens renamed, 70 occurrences across `dashboard.html` (34) and
`css/saferise-dashboard.css` (36). The renames include the JS string literals
that build the hero slides and the `querySelectorAll('.sr-hero-slide')` /
`'.sr-hero-dot'` lookups, which is where a partial rename would have passed
static inspection and broken the slider at runtime. Verified live: four slides, four
dots, both arrows, dot↔slide index in sync, arrow wrap at both ends, and the
Clearing cover still opens `#mMedia` with `.sr-dash-player` styled by the
dashboard sheet.

*Status:* complete · *Raised:* 17 Aug 2026 · *Merged:* 17 Aug 2026

### SR-058 · Porges page rests on a live, unresolved scientific dispute
`method-porges.html` section 04 reports the February 2026 *Clinical Neuropsychiatry*
exchange: Grossman et al., "Why the Polyvagal Theory Is Untenable" (23(1), 100–112),
and Porges's rebuttal in the same issue (23(1), 113–128). The dispute is live and
public, so the section is accurate today and will go stale without anyone noticing.

Two decisions are outstanding and neither is a copy edit. First, the page needs a
review date and an owner — a claim this load-bearing cannot sit unchecked. Second,
Porges is currently framework 01 of 06 and the lead credibility anchor for the whole
`/method` section; if the dispute resolves against the theory, cardiac coherence
(HeartMath) is the candidate to take that position, because it carries the one
specific empirical claim SafeRise makes.

Section 04 and the sources list are not to be edited outside this item. Every
citation was verified against the published record; changes go through the register.

*Status:* open · *Raised:* 18 Aug 2026

### SR-060 · Duration-free copy rule
No page states or implies a session length — no "10 minutes", no "ten-minute", no
"≈10 min", no runtime on a player. Session lengths vary by protocol and by track, and
the real figures are not known until the recording sprint is complete. The rule holds
across all pages until every meditation audio and video asset is finished; only then
is it revisited against actual runtimes. It is a factual-accuracy rule, not a style
preference.

`method.html` and `method-porges.html` are clean and carry an inline comment saying
why, so the rule survives the next person to edit them.

**Known pre-existing conflict, out of scope for this branch.** The Track 03 scripts are
all built to ≈10 minutes, and `SafeRise_Claude_Source_Lite.html` renders "10:00" on
every audio player. Both contradict this rule. They need their own item when that page
is next touched — do not fix them here.

*Status:* open · *Raised:* 18 Aug 2026

### SR-108 · Track accent tokens did not hold the values the site renders
[[SR-045]] made `saferise-system.css` the single source of truth for the four track
accents, but tokens 02/03/04 still carried the pre-consolidation hues while `index.html`
restated the shipped ones as colour literals. The token and the rendered pixel disagreed,
so anyone editing the token moved nothing.

**Resolution.** Tokens 02/03/04 repointed to the values the site actually renders; 183
literals in `index.html` converted to `var(--sr-trackNN)`; the cover helpers repointed at
the tokens. `index.html` verified value-preserving across 217,680 probed element-rows.
`dashboard.html` shifts 7/6/9 elements on tracks 02/03/04 — that shift is the correction,
not a regression. No contrast pair falls below 4.5:1.

Deliberately not converted: the accent `rgba()` restatements — `--sr-accent-wash`,
`--sr-accent-border`, the nav-tab `border-bottom-color` and several tinted panel grounds.
A hex token cannot go inside `rgba()`; closing those needs an `--sr-trackNN-rgb` channel
triple, which is its own item and was not invented here.

Shipped `b9e5ff5`, merged to main in `7ba529b`. Run B — `docs/runs/RUN-B-accents-rails-a11y.md`.

*Status:* complete · *Raised:* 19 Aug 2026 · *Entry written:* 20 Aug 2026

### SR-109 · The modal layer did not keep the promise `aria-modal` makes
Seven dialogs declared `aria-modal="true"` with no focus trap and no inert background, so
Tab walked straight out of the dialog into the page behind it. Six close buttons carried
no accessible name.

**Resolution.** Focus trap and background `inert` added to the shared modal controller —
one place, all seven dialogs. Six close buttons named. Verified by running the actual
keystroke sequence, and regression-checked across all seven dialogs.

**Part (c) did not reproduce and was not edited.** The brief placed the mis-wired
Elevation CTA in `index.html`; it is in `dashboard.html`, and `index.html`'s Elevation
waitlist is a real, working Netlify form. Carried forward and issued as its own item —
see [[SR-110]].

Shipped `f259e1e`, merged to main in `7ba529b`. Run B — `docs/runs/RUN-B-accents-rails-a11y.md`.

*Status:* complete · *Raised:* 19 Aug 2026 · *Entry written:* 20 Aug 2026

### SR-110 · Track 04 is hidden in the data and sold on every public surface
`TRACKS[4].visible` is `false`, and that flag is read in **exactly two places in the whole
repo** — [js/saferise-track.js:352](js/saferise-track.js:352) (`renderNav`) and
[js/saferise-track.js:399](js/saferise-track.js:399) (`renderTrack`). Both live in the
track-page renderer, loaded only by the three track pages. `index.html`, `dashboard.html`
and `protocol.html` never read it.

There is no routing layer to fix. The site is static HTML served directly; Track 04 has no
page of its own and therefore no route to remove. Every Elevation surface is hardcoded
markup or hardcoded JS inside three pages, so `visible: false` never had anything to act
on. `renderNav` additionally gates on `ROUTES[k]`, which has no key `4` — Track 04 is
excluded twice over on the surfaces that consult the data, and not at all on the surfaces
that do not.

**17 surfaces, inventoried by Run C** — `index.html` 13, `dashboard.html` 3,
`protocol.html` 1. Not routes: they include a live Netlify waitlist form
(`name="elevation-waitlist"`, real `onsubmit`), a seven-record block in `RESOURCE_CONTENT`,
a public pricing tier (`€222 one-time`), a column in the plan comparison table, a workshop
card, and three pieces of body copy naming Elevation inside sentences about other tracks.

Scope confirmed 20 Aug 2026 as **all 17**, not the bounded subset. A partial removal leaves
the site arguing with itself — a hidden track with a public price is a worse state than
either a shipped track or an absent one. The comparison table goes to three columns
(Personal Transformation, Relationship Healing, Professional Performance), equal widths,
Elevation-only rows removed entirely rather than left empty, and no "coming soon"
placeholder column: an empty row asks the reader what was there.

Full inventory with line numbers: `docs/runs/RUN-C-consolidated.md` §1e.

**Done so far — the dashboard waitlist CTA and its route (20 Aug 2026).** Carried in from
[[SR-109]] §c. `dashboard.html:919` rendered
`<a class="sr-dash-go" href="#">Tell me when it opens →</a>` inside the `.sr-dash-empty`
block, and `TEXTMAP` carried `[/tell me when it opens/i,'plans']`. The delegated handler
matches on **text content**, so the control that promised a waitlist opened the Plans
route dialog — *"Not built yet · Plans · /plans"*. Reproduced by clicking it before any
edit.

Both removed, not repointed: there is no waitlist to reach, and a control promising one
that does not exist is worse than no control. A comment in place records why, so the next
reader does not restore it.

**Inventory correction.** `TEXTMAP:1262` is not one of Run C's 17 surfaces — the §1e table
lists three dashboard surfaces (240, 862, 917–919) and the route row is documented only in
the prose below it. The real dashboard total is **4**, and the repo-wide total **18**, not
17. Counted here so the end-of-run reconciliation balances.

**Still open — 16 surfaces, Phase 4.** The `.sr-dash-empty` block still renders its `<h3>`
and a paragraph ending *"Opening after the recording sprint"*, which is an undated promise
and goes with the rest of the block.

**Done — 4a, the bounded removals (20 Aug 2026).** Overlay, four navigation entries, the
routes and data behind them, and the live Netlify form.

- `index.html` — the whole `#prog-elevation` overlay (52 lines: back button, hero and
  head mounts, seven `elev-` protocol cards, workshop/1:1 pair, waitlist panel and the
  form); the `tab-purple` nav tab and its "Soon" badge; the footer `<li>`;
  `SERIES_CONFIG.elevation`; the seven `elev-1…7` records in `RESOURCE_CONTENT`; the dead
  `#elevation-protoList.pcard-grid` rule.
- `dashboard.html` — the `data-track="4"` rail button and its "Coming soon" meta.
- `protocol.html` — the inert `Elevation Series` footer link.

**The Netlify form.** `name="elevation-waitlist"`, `data-netlify="true"`, honeypot
`bot-field`, POST to `/`. Confirmed by Andre as holding **no submissions**; that was taken
on his word, not independently checked — this run has no Netlify credentials and did not
attempt to acquire any. Removing the markup stops collection and drops the form from
Netlify's next build detection; it does **not** delete anything already collected. Any
submissions remain in Netlify's own store under the site's Forms tab until deleted there.
The unrelated `affiliate-application` form is untouched and still present.

`TRACKS[4]` in `content/tracks.js` untouched throughout.

**Exposed by the removal — reported, not acted on.** See `docs/runs/RUN-D.md` §4a for the
full list with line numbers. The two that matter:

1. **`showProg('elevation')` now blanks the page.** `showProg` hides `#main-content` and
   activates `prog-<id>`; with no such overlay it activates nothing, leaving a blank
   viewport. Three callers remain — the plans-strip panel, the plans card and the workshop
   card — all of them 4b/4c surfaces. Reproduced. **This branch must not merge between 4a
   and 4b.**
2. **`SERIES_CONFIG` existed only to drive the Elevation overlay.** The only
   `hero-mount-*` / `protocols-head-mount-*` / `whats-included-mount-*` elements in
   `index.html` were the three `-elevation` ones — verified against `HEAD` before the edit,
   so this predates this run. `SERIES_CONFIG`, `renderSeriesHero`,
   `renderProtocolBrowseHead`, `renderWhatsIncludedHTML` and the `DOMContentLoaded` mount
   loop are now a closed island of dead code (~110 lines). The other three tracks render
   their heroes from hardcoded markup and are unaffected. Whether it goes is Andre's call.

**Done — 4b, copy fragments and the pricing tier (20 Aug 2026).**

- `index.html` — the plans-strip Elevation panel (*"Coming Soon / Pricing TBA"*), the
  Track 04 plans card (*"Premium tier · Waitlist open now"*), the Elevation workshop card,
  and the `key.indexOf('elev-')` branch carrying **`'€222 one-time'`** — verified
  unreachable first: 112 `RESOURCE_CONTENT` keys, none beginning `elev-`, and zero
  `[data-resource^="elev-"]` in the DOM.
- Two sentences rewritten to name only shipping tracks: the workshops line now ends
  *"…Relationship from €139/couple."* — the *"Professional & Elevation workshops coming
  soon"* clause went **entirely** rather than being trimmed to "Professional", because it
  fails the no-undated-promises rule on its own; and the button now reads **"See all
  plans"**.
- `dashboard.html` — `ENTITLED[4]`, `TRACKMETA[4]`, `JOURNEY[4]` and the `.sr-dash-empty`
  branch. All four were unreachable once the rail button went, and the branch existed only
  to render Track 04: every shipping track carries ten protocols, so `items.length` is
  never 0. A comment records that a future empty track needs its own copy, not the retired
  one's.

Three four-column grids closed to three — `1.7fr 1fr 1fr 1fr` → `1.7fr 1fr 1fr`,
`repeat(4,1fr)` → `repeat(3,1fr)`, `1fr 1fr 1fr 1fr` → `1fr 1fr 1fr`. Each verified at 3
children / 3 tracks with Professional last and no empty cell. Two *other* `repeat(4,1fr)`
grids on the page are unrelated and were not touched — the edits are anchored by line, not
by pattern.

**`showProg` now guards.** It resolves `prog-<id>` **first** and returns if absent, instead
of hiding `#main-content` and then activating nothing. Before: `{active: [], main: "none"}`
— a blank viewport with no way back. After: `{active: [], main: ""}`. Verified for both
`elevation` and a nonsense id, with a real overlay still opening from the same state. Any
future hidden series hits the same lookup, so the guard is general rather than a patch for
this removal.

**Final surface count: 19. It moved twice, and both moves are recorded here so a future
audit does not re-derive them.**

| count | when | why it changed |
|---|---|---|
| 17 | Run C's §1e table | the original inventory |
| 18 | Phase 3 | `TEXTMAP:1262` was in Run C's **prose** but not its **table**. The table is the artefact that gets reconciled against, so the table was wrong. |
| **19** | during [[SR-124]] | `dashboard.html:1004` `OWNED` still carried key `4` |

`OWNED[4]` was unreachable — its only reader is `OWNED[track]` at :1047, and `track` comes
from the recommender, whose covers map (`COVERDIR`) has keys 1–3 only. Dead rather than live,
so it was not worth reopening a closed phase; it was removed with [[SR-123]] as a one-line
change. **All 19 closed.**

**Remaining: 4c only** — the comparison-table column. Exactly one rendered "Elevation" text
node survives in `index.html`, and it is that `<th>`.

**Done — 4c, the comparison table (20 Aug 2026).** The `Elevation` `<th>` and the Elevation
`<td>` from all six body rows. Table goes from five columns to four — label plus Personal,
Couples, Career — with 6 rows × 4 cells, **zero empty cells**, no `colspan`/`rowspan`, and
no rendered "Elevation" anywhere in `index.html`.

**The spec's "Elevation-only rows removed rather than emptied" had no work to do.** Every
one of the six rows carried content in all four track columns — Format, Protocols, Who it's
for, Entry price, Best for, Available. There were no Elevation-only rows and no empty cells
before or after. Recorded so nobody looks for the removal later.

**"Equal widths" was NOT delivered — deliberately.** Before the removal the columns already
sized to content (200 / 123 / 123 / 121 / 133 px), and after it they were uneven again. A
`.sr-cmp-col{width:calc((100% - 200px)/3)}` rule was written into `saferise-system.css` with
a class on the three `<th>`s, then **reverted** when the preview viewport collapsed to 0×0
and every width and overflow number became unmeasurable — including the ones taken minutes
earlier. Shipping an unverifiable layout change would have contradicted this run's own
standard. The structural removal is verified by DOM facts, which the collapsed viewport does
not affect; column widths need one measurement in a real viewport before the rule is
restored. **Open sub-item, not forgotten.**

Two naming notes found while in the table, not acted on: the headers read "Couples" and
"Career", not the record's `Relationship Healing` and `Professional Performance`. [[SR-111]]
scanned for the full names and so never saw these. And the table still shows "TBA" /
"Coming Soon" for both — see [[SR-122]].

*Status:* open — one sub-item: comparison-table column widths, pending a usable viewport · *Raised:* 19 Aug 2026 · *Entry written:* 20 Aug 2026

### SR-115 · A dashboard cover loads from an ephemeral Netlify deploy preview
[dashboard.html:717](dashboard.html:717) sources a protocol cover from
`https://deploy-preview-14--the-saferise-protocol.netlify.app/assets/covers/01.jpg`. Deploy
previews are torn down; the member dashboard would show a broken cover the moment PR 14's
preview expires, and until then it makes the dashboard depend on a build of a branch.

Run C confirmed it at exactly that line and confirmed it is the **only** URL of that shape
in the repo — the two other grep hits are Run A's log describing it. The local
`assets/covers/01.jpg` exists.

**Resolution.** Replaced with `assets/covers/01.jpg` — document-relative, no leading
slash, no `./`, which is the convention every other asset reference on the page already
uses: `assets/dashboard/hero-corridor.jpg` at :106, `var COVER_01 = "assets/covers/01.jpg"`
at :784, `var BASE = 'assets/covers/'` at :1057. The page's own header comment at :13
already documented `assets/covers/01.jpg` as the intended path — line 717 was the single
survivor of the standalone-mockup era, when the file was reviewed outside the repo and had
no local assets to point at. One line changed; nothing invented.

Verified on a cold load (fresh tab, `no-store`, cache-busted, mirror served from the
working tree): the request resolves to `assets/covers/01.jpg` → 200, the image decodes at
900×1200, `onerror` does not fire, and the page issues **zero** requests to any
`netlify.app` host. The probe was proved live by repointing the same `<img>` at a
non-existent sentinel path — `naturalWidth` fell to 0 and the `onerror` handler set
`display:none` — then restored.

No `netlify.app` URL remains in any tracked non-doc file. The four remaining matches are
this register and the Run A / Run C logs describing the defect, which is historical record.

*Status:* complete on merge · *Raised:* 19 Aug 2026 · *Fixed:* 20 Aug 2026

### SR-124 · `index.html` contradicts the price record, and itself
`content/tracks.js` holds the canonical ladder, marked *locked 2026-08*:

```
PRICING.t1 €9 / month   ·   PRICING.t2 €19 / month   ·   PRICING.t3 €29 / month
```

`index.html` loads `content/tracks.js` and then ignores it, carrying **two different
hardcoded ladders of its own**:

| source | Personal | Relationship | Professional |
|---|---|---|---|
| `content/tracks.js` — the record | **€9** | **€19** | **€29** |
| [index.html:4746](index.html:4746) locked-resource mapping | €19 | €29 | €49 |
| [index.html:6103](index.html:6103) `.pt-note` | €19 | €29 | **€39** |

Every track disagrees with the record, and the two in-page ladders disagree with each other
on Professional (€49 vs €39). A visitor comparing the resource paywall against the pricing
note is told two different prices for the same plan.

This looks like [[SR-063]]'s consolidation reaching the dashboard but never reaching
`index.html`, leaving an older ladder — or ladders — behind. **Which ladder is correct is a
commercial decision, not a code fix**, so nothing was changed. Once it is settled the fix is
the same shape as SR-063: read `PRICING` from `content/tracks.js`, which the page already
loads, rather than typing figures into markup.

**It was live and public.** `personal-transformation.html` rendered **€9** for Personal
Transformation while `index.html` rendered **€19** for the same product, at the same time,
both reachable. Two prices for one thing, not a code-quality issue.

Found while logging [[SR-122]]; not part of the Elevation work and deliberately not fixed
inside it.

**Resolution (20 Aug 2026).** Ladder confirmed by Andre: standard **€19 / €29 / €39**,
access cumulative, and **€9 is an introductory rate on Track 01 only**. `index.html:6103`
was the correct ladder; `:4746` was wrong on Professional; `PRICING` was right only on t1.

`PRICING` now carries launch and standard **separately**:

```js
t1: { amount:'€9', per:'/ month', words:'Nine euros a month.',
      introductory:true,
      standard:{ amount:'€19', per:'/ month', words:'Nineteen euros a month.' },
      includes:['t1'] },
t2: { amount:'€29', …, includes:['t1','t2'] },
t3: { amount:'€39', …, includes:['t1','t2','t3'] },
```

`amount` keeps its existing meaning — **what a member is charged today** — so no consumer
changed behaviour as a side effect and Track 01 keeps showing €9. Making `amount` mean
*standard* was considered and rejected: it would have silently removed €9 from the live site
the moment it merged, and a data refactor must not change what a customer is charged.
`standard` holds the list price it returns to; deleting either figure destroys the evidence
that a promotion ran. **Both are correct. Do not collapse them** — the comment above `t1`
says so in place, same class of deliberate double-record as `extras: null` ([[SR-117]]).

`includes` states cumulative access as data rather than as copy.

**`index.html` now derives.** All 23 track-price strings replaced — 20 markup nodes using the
`data-sr-price` convention `dashboard.html` already had, plus the three-price cumulative
sentence at :6103, plus three JS assignments in the resource paywall that now read
`PRICING.tN.amount`. A hydrator mirroring `dashboard.html`'s `hydratePrices()` fills them at
load, with a `data-sr-price-form` attribute for the site's `€19` / `€19/mo` / `€19/month` /
`€19 / month` / word forms. Nodes for an introductory track also receive `data-sr-intro` and
`data-sr-standard`, so a label can be attached without a second lookup.

Anchored by line and asserted against neighbours, never by pattern — three of the lines
carried the wrong ladder and `€19/mo` appears sixteen times, so a pattern edit would have
been the `repeat(4,1fr)` hazard again.

**A pre-existing defect fixed as a side effect.** `index.html` already carried two
`data-sr-price="t3"` spans — markup wired for derivation with **no hydrator on the page**, so
they rendered empty. The public Professional section read *"part of the Professional plan —
/mo"* and a button read **"Start — /mo"**. Both now render €39.

Verified cold: 26 nodes hydrate, **0 empty after hydration**, no `€49` anywhere, 16 nodes
carry the introductory flag, the paywall reads €9 / €29 / €39 for t1/t2/t3, 11 inline blocks
parse, console clean. Nodes proved to genuinely derive by a sentinel — setting
`PRICING.t3.amount` to `€777` moved every t3 node and restoring returned them exactly.

Out of scope and untouched: competitor and value-stack figures, workshops, premium 1:1,
retreats, and `protocol.html` — see [[SR-126]] and [[SR-127]].

*Status:* complete on merge · *Raised:* 20 Aug 2026 · *Fixed:* 20 Aug 2026

### SR-125 · The declared library and the Reader's manifest are two different inventories
Every protocol page and the dashboard describe a resource library. **Two unrelated sources
answer that question, and neither knows about the other.**

| | `SHARED.resources` — the *declared* library | `READER_PROTOCOLS[pk].keys` — the *served* manifest |
|---|---|---|
| shape | one fixed 9-item list, identical for all 30 protocols | a per-protocol list, authored individually |
| filtered by | `META[].extras` and `CONDITIONAL_RESOURCES` | nothing — it is the literal content list |
| counted by | `protocolResourceCount()` | the Reader's own page-building loop |
| vocabulary | resource **titles** — "Proximity Guide", "Your Record" | key **suffixes** — `advisory`, `founder`, `decision` |

**The vocabularies do not correspond.** Three concepts line up cleanly — `crisiscard` = Cue
Card, `companion` = Somatic Release Activities, `disclosure` = Disclosure & Support. The rest
do not. The manifest carries `founder` (Founder Video), `decision` (The Decision) and
`safety` (Safety Score), **none of which appear in `SHARED.resources` at all**; the declared
library carries Guided Meditation, Safe Practice, How This Works and Your Record, none of
which has a matching key suffix.

### Measured, live, across all thirty protocols

| track | `protocolResourceCount` claims | Reader manifest serves | every manifest key has content? |
|---|---|---|---|
| 01 | 7 – 9 | 6 – 8 | **yes** |
| 02 | 7 (all ten) | **2** (all ten) | **yes** |
| 03 | 7 (all ten) | **2** (all ten) | **yes** |

### It is **missing content**, not a mapping artifact

This was the question worth settling, and the answer is unambiguous. Of **112**
`RESOURCE_CONTENT` keys, **112 are referenced** by a Reader manifest or a `data-resource`
attribute — **zero orphans**. There is no hidden Track 02/03 content sitting under names
nothing looks up. Track 02 has 20 content records for ten protocols; Track 03 has 20; Track
01 has 71.

Both probes were proved sensitive before their null results were trusted: injecting an
unbacked key into a manifest produced exactly one missing-content report, and injecting an
unreferenced record produced exactly one orphan. Both restored cleanly.

So Track 02 and Track 03 genuinely carry **two resources per protocol** — T2 a Session Guide
and a Safety Score, T3 a Meditation Script and Somatic Release Activities — against a page
that names nine.

### Where it is claimed — all derived, none hardcoded

| surface | file · line | derived from | renders |
|---|---|---|---|
| Track-page "What's included" list | [js/saferise-track.js:276](js/saferise-track.js:276) | `SHARED.resources` | **all nine, by name**, on all three track pages |
| Track-page copy numeral | [js/saferise-track.js:163](js/saferise-track.js:163) `resourceCount()` | `SHARED.resources.length` | nothing currently — no track copy contains a numeral+"resources" string, so the substitution is live but idle |
| Dashboard fold title | [dashboard.html:1262](dashboard.html:1262) | `SHARED.resources.length` | **"Nine resources, one for each kind of moment."** |
| `protocolResourceCount()` | [content/tracks.js:547](content/tracks.js:547) | `SHARED.resources` − conditionals | **nothing** — zero callers outside `tracks.js` and its `module.exports` |

**No hardcoded count exists anywhere.** [[SR-078]] and [[SR-054]] did that work and it held.
The overstatement is not a stale numeral — it is that the derived number is derived from the
wrong list.

**The sharpest surface is not a number.** `relationship-healing.html` renders all nine
resources **by title**, Proximity Guide and Invitation to Repair included, while the Reader
delivers two. A wrong numeral is a typo; a named list of nine is a specific promise.

### Not fixed. This is a product decision.

Three routes, and they are not equivalent:

1. **Make the count derive from the manifest.** Honest immediately, and Track 02/03 pages
   then advertise two resources.
2. **Author the missing Track 02/03 content** so the nine-item library is real.
3. **Reconcile the vocabularies** so one source answers the question.

Fixing the number without deciding the copy silently changes what the site promises, so
nothing was changed. [[SR-120]] is blocked on the same question: `p1-advisory` exists but is
*attention-inward* guidance, not the Proximity Guide's *relational distance*, so whether
`advisory` names one resource or two has to be settled before `t1-01`'s `extras` can be
corrected honestly.

*Status:* open · *Raised:* 20 Aug 2026

### SR-135 · A second paywall held a price ladder that no longer existed
`index.html` has **two** locked-resource paywalls. [[SR-124]] converted
`openResourceModal()` ([index.html:4664](index.html:4664)); **`openReader()`
([:5004](index.html:5004)) was never touched** and hardcoded `€19 / €29 / €49` — a ladder
retired in Run D.

Two independent reasons it survived every sweep, and both are now rules.

1. **It used a lowercase `€` escape.** Every sweep in Runs D and E targeted the glyph
   or the uppercase escape (Rule 7).
2. **The surface does not exist in the DOM until a locked resource is opened**, so SR-124's
   assertion over `document.body.innerText` could not see it (Rule 18).

**Resolution.** Converted to `PRICING.tN.amount + '/mo'`, mirroring the other paywall exactly.
Verified by *opening* a locked resource per track — €9 / €29 / €39, no €49 — after first
reproducing the blind spot: zero `.reader-page-locked` nodes and no €49 in body text before
opening, which is precisely the state SR-124 measured.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-136 · The price record carried two wrong service figures and a duplicate key
`workshopPersonal` €59 → **€29**, `workshopRelationship` €139 → **€49**, and the `premium`
key (€275 / session) removed. 8 keys → 7.

**The €49 ordering constraint.** The stale *track* €49 left the tree in [[SR-135]]; the live
*couples-workshop* €49 arrived here. Between those two commits a `€49` sweep returns only a
historical comment — **the only window in which the two unrelated values can be told apart
mechanically.** Preserve that order if these commits are ever reordered or cherry-picked.

**The intermediate state is visibly broken but does not throw**, and that is the finding:
`dashboard.html`'s hydrator guards with `if (rec)`, so the four orphaned `premium` spans
rendered **empty strings** — `/ session`, `Book this time ·`, a dangling `90 min ·` — with a
**clean console**. See the guard note under [[SR-137]]. **This branch must not merge between
SR-136 and SR-137.**

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-137 · `premium` and `premium1` were one offer under two names
`dashboard.html` and `protocol.html` sold "Premium 1:1" at **€275 / 90 min**; `index.html`
sold the same named product at **€129 / 60 min**. Not a retired product — a **stale second
representation of a live one**. The brief framed it as removal; the evidence overturned that
and it was a de-duplication and a re-pricing.

All four dashboard nodes repointed to `premium1`; `protocol.html:858` corrected as a literal
(that page has no hydrator — see [[SR-127]]). `protocol.html`'s internal contradiction
resolved: :860 said *"A private hour"* while :862 said *"Ninety minutes"*.

**The `if (rec)` guard, recorded as a finding in its own right.** A missing `PRICING` key
renders an **empty string**, with no exception and a clean console. That is the `Start — /mo`
failure mode as *designed behaviour*: it makes missing keys **invisible to error monitoring**.
**Any key removal must be verified by reading rendered text, never by absence of errors.**

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-149 · A purchase CTA scrolled to an element that did not exist
[index.html:8204](index.html:8204)'s *"Start Personal Transformation — €9/mo"* called
`scrollIntoView` on `#personal-pricing`, which exists nowhere. The overlay opened and the call
threw a `TypeError`, on a purchase-intent control.

**Option 1 applied — the id already existed.** `#pt-start` is the section holding the price,
the introductory label and the CTA, and **two other CTAs already anchor to it** via
`href="#pt-start"`. Retargeted to the established convention rather than inventing an id or
guarding the call; losing the scroll would have cost the CTA its promise.

Verified by clicking that exact control — a clean load proves nothing when the error is
conditional. Zero console errors where the TypeError fired. **Rule 20 was written from this
item**: smooth-scroll animation does not run in the preview, so the fix was measured against
two known-good targets under identical conditions — `#pt-start` moves 8543 → 130 exactly as
`#corporate-pricing` moves 3764 → 130.

Swept all four pages for `getElementById('literal')` with a same-line property access and a
missing target: **0, 0, 0, 0.** This was the only one.

**Found only because [[SR-145]]'s entry-point inventory said which CTAs to exercise.**

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-155 · Mockup scaffolding was live on the served domain
A persona switcher labelled **"Mockup control — not part of the build"** rendered at the top
of `protocol.html` — 51px tall, the first thing above the banner — reading *PREVIEW AS · FIRST
TIME · RETURNING · ANXIOUS · ESTABLISHED · 6 SESSIONS*. The brief named one. **There were
two**: `resource.html` carried the same component with different buttons — *"Open decisions ·
Proximity guide: off (p1 has none)"*, labelled *"Mockup only — not in the repo"*, which is
false twice over: it is in the repo and it is served.

**The "renders then disappears" report was a load-order artifact, and it is measurable.** The
embed bridge that hides this chrome under `?embed=1` sits at the very end of each file. On
`protocol.html` the statebar starts at byte **2,417,128** and the `<style>` that hides it is
injected at byte **4,802,722** — **2,385,594 bytes of markup in between**, on the exact path
the dashboard uses (`#srProtoFrame` loads `protocol.html?embed=1`). The same gap on
`resource.html` is 89,585 bytes. Removing the elements removes the flash; nothing else could.

**Rule 15 paid again.** `setState('new')` at the foot of `protocol.html` was not a mockup
call: it seeds the empty log and journal states, opens the journey details and closes the
journal. Its first line was
`['new','ret','est'].forEach(function(k){document.getElementById('btn-'+k).classList.toggle(...)})`.
Deleting the three buttons while leaving that line and its load-time call would have thrown a
`TypeError` on `null` and taken every script below it down, while still looking clean in a
diff. The seeding was kept as `seedArrivalState()`; only the persona branches went.

**Deliberately kept — do not tidy.** `advisoryOn` in `resource.html` is **dormant, not dead**
(Rule 14): `visible()` splices the `PROXIMITY` resource into the reader rail when it is true,
so the flag controls rail composition. Only the removed switcher ever set it. The variable and
the branch stay, with a comment naming what they control. Rail composition proved unchanged:
`RESOURCES` holds exactly 6 keys and 6 rail items render.

**Reported and not removed:** `protocol.html`'s `.bnavlinks` (5 links, all `href="#"`) and
`resource.html`'s `.sr-topnav` (6 links, all `href="#"`). Both are scaffold navs, but each is
its page's *only* navigation and four of five targets exist. Routing them is [[SR-156]], not
deletion work.

Verified on all nine served pages loaded fresh, and inside the dashboard shell with a protocol
open in the iframe: zero rendered hits for *mockup*, *preview as*, *not part of the build*,
*not in the repo*, *open decisions*, *you are here*, or any persona label. The remaining
source hits are this run's own explanatory comments, which do not render.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-160 · Invented member figures in a hidden block on protocol.html
`#resume` on `protocol.html` read **"Welcome back. Last practised 3 days ago · 4 sessions
logged · average drop -3.2"**. It carried `.hidden`, and **the only thing that ever revealed
it was the persona switcher [[SR-155]] removes** — so it was one CSS change from visible, which
is deferred, not safe.

Container and contents were separated before acting, as briefed. The container is not a real
surface with fake copy: **its entire text is the figures**, `#resume-count` exists only to hold
the session count, and there is no template, writer or data binding behind any of it. Nothing
else was bound to it — the only two `classList.remove('hidden')` calls on the page target
`invitation` and `cue`, and the page's sole `message` listener handles `type === 'theme'`
only. **The whole block went**, with its `.resume` rules, and with the `resume` variable it
would have left dangling in `seedArrivalState()` — the same null-reference trap as [[SR-155]].
`resource.html` carried an orphan copy of the `.resume` CSS with no `.resume` element anywhere;
inert, removed with it.

**Why this generalises:** the platform has no streaks, no scores, no completion and no targets,
because members arrive on their worst day. *"Average drop -3.2"* is a score. [[SR-085]] already
made this call once, on the dashboard, for the same reason.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-161 · The dashboard's "Step 03 of 07" ribbon is a literal
Raised by the sweep [[SR-160]] called for, and fixed in the same run.

`dashboard.html:885` holds `var CURRENT = 'The Anxiety Reset Protocol';` — a hardcoded literal.
Every visitor, including one who has opened nothing, sees the Anxiety Reset card ribboned
**"Step 03 of 07"** with a **"Continue"** action while every other card reads "Begin".
Confirmed in rendered text rather than source: the ribbon renders **twice**, because the card
set is doubled for the carousel loop.

`dashboard.html:915` writes the string into the card template with nothing behind it. Nothing
writes `sr.resume`, so `CURRENT` cannot be derived today — exactly what [[SR-085]] found for
the resume card and answered with an honest empty state. The same shape of fix applies: derive
it, or drop the ribbon and let the action read "Begin".

**Everything else the sweep turned up is derived or editorial**, recorded so a later run does
not re-raise it: `Sessions logged` / `Protocols run` / `Most run` compute from `runs.length`
and `Store`; `07 of 08` and `87%` at `dashboard.html:2194` sit inside the [[SR-085]] comment
describing what was removed; `index.html`'s *"No sessions logged yet"* is an honest empty
state; `1 of 1` at `index.html:3829` is initial markup overwritten at runtime; *"Session 1 of
7"* names a Practice Workbook item, not member progress; and the track pages' *"15-20% of
adults"* and the SVG label *"SESSION 01"* are editorial content. `protocol.html` renders no
metric-shaped string at all after [[SR-160]].

**The fix, in three parts.**

`CURRENT` is now **derived at render time**, not declared: `sr.resume`'s `protocol` first, then
the most recent `sr.journal.entries` protocol — the only `sr.*` key anything writes. Both empty
returns `''`, which matches no item, so every card reads **Begin** and none is ringed. It is
read inside `render()` rather than at the top of the IIFE because `Store` is assigned further
down the same closure.

**"Step 03 of 07" was deleted, not derived, and the reason generalises: where no writer exists
for a measurement, the nearest available number is a DIFFERENT measurement, and substituting it
is worse than showing nothing.** Nothing in the record holds a step position. The nearest
number is `resource N of total`, which is what `sr.resume` defines and what the resume card
reads — a different thing counted differently. [[SR-081]] refused exactly this substitution when
it declined to map a 0-10 activation reading onto a named nervous-system state, and wrote
`before`/`after` as null instead. The ribbon now emits **only** when `sr.resume` supplies both
`resource` and `resourceTotal`, phrased as the resume card phrases it, and emits nothing
otherwise. Today that is nothing.

`Continue` and the `is-current` accent stay: both derive cleanly from "which protocol you were
last in" and both vanish with no state.

**The template needed no guard — it already degraded correctly.** `cur === false` was live on 18
of 20 cards before the fix, and on all 20 of a locked track, so the empty path was already
proven in the page.

**Verified on both sides, because an empty path cannot otherwise be told from a broken one
(Rule 20).** Seeded `sr.resume` → **2 ribbons reading "Resource 07 of 08", 2 ringed, both named
"The Overwhelm Threshold Protocol"** — the protocol the record names, not the one that used to be
hardcoded — and 18 Begin. Entries only, no `sr.resume` → **2 ringed on "The Grief Integration
Protocol", 2 Continue, 0 ribbons**: the fallback fires and refuses to invent a position.
`localStorage` cleared → **20 cards, 0 ribbons, 0 ringed, 0 Continue, 20 Begin**, and no
`step N of M` string anywhere in the rendered page. Counter `1 / 10` throughout — `updateCount()`
already halves the doubled set, so the duplication was never the defect; it only doubled the
exposure of one. Zero new console errors.

**One test failure worth recording, because it was mine and not the page's.** The first fallback
probe seeded `"The Self-Worth Restoration Protocol"`, a name that exists in no track. Nothing
ringed, and for a moment that read as the fallback failing. It was the code behaving correctly:
an unknown or stale name degrades to *no card ringed* rather than throwing or ringing the wrong
one. Rule 16 applies to the tester's own fixtures as much as to a brief.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-165 · Nothing writes `sr.resume` — the platform has no progress writer
**Blocked, deliberately, and not on effort.** [[SR-161]] derives the current protocol from
`sr.resume` and falls back to journal entries. `sr.resume` has a reader (`buildResume`), a known
shape — `{protocol, no, track, resource, resourceTotal, resourceName, percent}` — and **no
writer anywhere in the repo**. The same is true of `sr.record.runs` and `sr.sessions.booked`.
The single `sr.*` write in the entire tree is `protocol.html:1089`,
`Store.set('sr.journal.entries', …)`.

Having `openProtocol()` write `sr.resume` is the obvious next move and **would give the platform
its first progress writer** — the thing [[SR-085]], [[SR-160]] and [[SR-161]] have each worked
around rather than solved.

**It belongs with the auth work, not here.** `Store` writes to `localStorage` only, with no
account behind it, so a progress writer would record progress **for whoever last used the
browser** — a shared machine hands one person's practice history to the next. That is a worse
defect than the empty state it would replace.

*Status:* blocked — needs accounts · *Raised:* 21 Aug 2026


### SR-156 · The Dashboard control answered "You are here" instead of going home
The rail's Dashboard button opened `mRoute` reading *"This page / You are here. / /dashboard"*
**over a protocol that stayed open behind it** — verified by clicking, with a protocol in the
shell: `body.reading` stayed `true` and the iframe kept its src. A control that reports success
while doing nothing.

**Two premises corrected against the tree (Rule 16 / Rule 3).**

1. **It is not on the protocol page.** `protocol.html` contains no `openRoute`, no `data-route`
   and no Dashboard control — zero occurrences. The button is `dashboard.html`'s own rail, which
   stays on screen while a protocol is open in the shell, which is what the report described.
2. **The `|| ROUTES.dashboard` fallback was latent, not live.** Every key that can reach
   `openRoute` was enumerated — rail `data-route` (4), `data-route-link` (3), `TEXTMAP` (11),
   and the `#route=` hash — and the union is **exactly the fourteen keys `ROUTES` defines**. The
   hash path is separately guarded at `:1216` by
   `if(PAGES[key] || !(LAYERS[key] || ROUTES[key])) return;`. Nothing fell through it. It was
   removed anyway, because the next `TEXTMAP` row or `data-route` typo would have landed on
   "You are here" **silently**, and a fallback that turns a typo into a confident wrong answer
   is worth removing before it fires, not after.

**The fix is a view, not a destination.** `dashboard` is intercepted before the `ROUTES` lookup
and calls `goHome()`: `closeModals()`, `closeProtocol()`, clear a `#route=` hash if one brought
us here, put the rail back on Dashboard. No navigation, so no reload — proved by a marker on
`window` surviving the click, with the URL unchanged. The `ROUTES.dashboard` entry was deleted
with it: **describing the page you are already standing on is what produced that copy.**
`method.html` and `method-porges.html` already had the right answer in their own
`PAGES = { method:…, dashboard: 'dashboard.html' }` — only `dashboard.html` lacked it.

**The distinction worth keeping, because it decided what NOT to touch.** The brief asked for
targetless routes to fail visibly instead of claiming success. **They already do.** *"Account &
plan · Not built yet · /account"* names the thing, names the path and states plainly that it
does not exist. **A control that reports its own absence is not the same defect as one that
silently claims success** — the first is honest signposting, the second is a lie. Replacing the
twelve with dead buttons would have removed information and added nothing. [[SR-103]] reached
this conclusion first, by clicking all six. The instruction was withdrawn; all twelve stand
unchanged.

**Nine dead nav links wired**, using the track pages' own `renderNav` map as the source of
truth rather than inference: `protocol.html`'s `.bnavlinks` (The Journey → `method.html`, and
the three track pages) and `resource.html`'s `.sr-topnav` (the same, plus About → `method.html`).

**Two left dead and blocked, deliberately — do not tidy:** *"My Practice"* on `protocol.html`
and *"Compare Plans"* on `resource.html`. No page answers to either. Inventing a destination
would be worse than the dead link, and pointing them at a near-miss would be worse still. They
resolve when a page exists.

**Verified by clicking (Rule 18), not by reading `href`s.** Every rail control and route-link
exercised: `coaching` → `mLayer`; `account`, `chosen`, `decisions` → `mRoute` with "Not built
yet" and the right path; `method` → navigates; `dashboard` → protocol closed, layer closed,
hash cleared, scroll lock released, rail reset, **no reload**. An unregistered key was injected
into a live rail button and clicked: **zero modals opened** and the console carried
`openRoute: no route registered for "sr156-nonexistent-key"`. For the nav links, a
capture-phase probe confirmed nothing swallows the click (`defaultPrevented: false` at document
level) and recorded each resolved URL, with a full click-through on one link per page as the
control (Rule 20) — landing on `relationship-healing.html` and `professional-performance.html`.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026


### SR-162 · The protocol cover is now one component, shared by two surfaces
The track pages cropped a 900x1200 portrait cover to a landscape band. `.sr-tp-pimg` carried a
fixed `height:152px` on a 236px card — but the real cause was worse and no rule anywhere
described it: **there was no `.sr-tp-pimg img` rule at all.** The image rendered unstyled at
212x283 inside a 152px flex box with `align-items:flex-end`, which put it **119px above its own
container**; the card's `overflow:hidden` clipped it to the strip that was visible. Measured
live before the fix: container top 1178, image top 1059.

**The brief said port the dashboard's card outward. The tree says the dashboard is only half
right, and the half it is right about is not the half that was assumed.** `.sr-dash-cardart`
had the correct image treatment — `aspect-ratio:3/4`, `object-fit:cover`, full bleed — but its
number and label came from a `.sr-dash-fallback` tile carrying
`onload="…querySelector('.sr-dash-fallback').remove()"`. **They deleted themselves the moment
the cover loaded**, because the number is burned into the current art. With covers being reshot
**bare**, that tile stops being a fallback and becomes the only thing that would carry the
number — while still removing itself. The track card was the closer of the two here: its
`.sr-tp-pkick` and `.sr-tp-pno` are drawn from the record (`p[1]`, `p[0]`) and persist.

So neither surface was the reference. The shared component takes the dashboard's art treatment
and the track card's record-drawn overlay, made permanent on both.

**One source, not two copies** — [[SR-125]], [[SR-148]] and [[SR-153]] are all second
inventories, and this was on its way to being a fourth. `js/saferise-card.js` owns the markup
and is loaded by `dashboard.html` and all three track pages; the CSS lives in
`css/saferise-system.css`, **the one stylesheet both of them already load** —
`saferise-dashboard.css` is the dashboard's alone. What is *not* shared is deliberate: the two
cards genuinely differ below the art, and the frame stays with each card because the dashboard
frames the cover directly while the track card frames the whole card and clips the cover with
it.

**Named `sr-pcover`, and the check mattered.** `sr-cover-*` is taken — `.sr-cover`,
`.sr-cover-art`, `.sr-cover-scrim`, `.sr-cover-kick`, `.sr-cover-sub` belong to the Clearing
card and the index tiles. CLAUDE.md's `.track` warning is this exact trap. `sr-pcover` was
confirmed at zero occurrences across every css, js and html file before a line was written.

**Removed:** the 152px height, `.sr-tp-pimg:before` (104x104) and `:after` (92x145),
**thirteen** nth-child rules — ten per-card gradients plus 2n/3n/4n pseudo-element variants, not
the ten in the brief — `.sr-tp-pkick`, `.sr-tp-pno`, the orphan `.sr-tp-pimgnote`, and on the
dashboard side `.sr-dash-cardart`, `.sr-dash-fallback`, `.sr-dash-verb`, `.sr-dash-no`. Six
dashboard rules plus seven `.t-N` ground gradients were repointed at `.sr-pcover`; specificity
keeps the per-track grounds winning over the shared default even though the shared sheet loads
last.

**`.sr-tp-pimgnote` did not reproduce as briefed.** It existed only as `display:none` in the
stylesheet with **no markup emitting it anywhere in the repo**. Nothing was emitting an asset
path as hidden text. Removed as an inert rule describing a defect that no longer existed, not
as the defect.

**Verified by rect equality, not by "it renders"** — the failure being fixed was an image
sitting 119px outside its own box while still rendering perfectly well.

| | track page | dashboard |
|---|---|---|
| image vs container | `dLeft 0, dTop 0, dW 0, dH 0` | fills the **padding box** exactly: `dW 0, dH -0.34` (sub-pixel), offset by exactly the 1px border |
| aspect | 0.7492 | 0.7489 (3/4 = 0.7500) |
| `object-fit` | cover | cover |
| natural | 900x1200 | 900x1200 |
| label after load | "Regulate", inside, visible | "Regulate", inside, visible |
| number after load | "01", inside, **low-right** | "01", inside, **low-right** |
| legacy classes | 0 | 0 |

Checked at 420px as well: cover still fills exactly, no horizontal overflow. Locked track 2
keeps its `saturate(.3) brightness(.62)` and its `.t-2` ground, with label and number intact.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-163 · The track carousel, and why "it does not move" was not the binding
**The briefed cause did not reproduce.** `initCarousel()` does not return early — `#carViewport`,
`#carPrev` and `#carNext` are all emitted by `rProtocols`. Clicking Next ran `go()`, advanced
the counter and set `track.style.transform` to `translateX(-512px)` correctly. Two other things
were wrong.

**One — two mechanisms driving one strip.** `.sr-tp-carviewport` carried `overflow-x:auto` with
`scroll-snap-type:x mandatory` *and* was moved by a JS transform. The tell was `scrollLeft: 56`
**at rest, with nobody having touched it** — snap had already moved the container. The viewport
is now a plain clip; the transform is the only mover. `scrollLeft` is **0** at rest and stays 0
through every step. The 56px gutter moved from padding to margin so the clip happens at the
gutter instead of inside it — otherwise a card sliding out shows through the padding.

**Two — `step()` returned `card.width + 18` while the gap is `14px`.** Four pixels of overshoot
per step, forty across ten cards. It now reads `columnGap` from the computed style, so it cannot
drift out of step with the stylesheet again.

**The counter became dots.** `1 / 10` reported the active index while four cards were on screen
— a position asserted, not measured. One dot per page of visible cards, active dot filled, same
pattern as the hero's `#srHeroDots` rather than a new one. **The last page is clamped, not a
full stride**, so its label says what it actually shows: with ten cards and four visible the
dots read *1 to 4 · 5 to 8 · **7 to 10***, not "9 onward". Getting that wrong would have been the
counter's own defect again, in words.

**Verified against a control, per Rule 20 — this measurement cannot be taken directly here.**
CSS transitions do not advance in this preview ([[SR-149]] found the same for smooth scroll), so
a computed transform read after a click is always the from-value. With `transition:none`
suppressing the ease, the same code path lands immediately and the transform is measurable:
rest `translateX(0)` first card at 107 → Next `-1008px`, first card at **-901** (a delta of
exactly 1008 = 4 x 252, the true border-box stride) → Next `-1512px`, clamped, `next` disabled →
dot 1 returns to `-1008px` → dot 0 to `0`. `scrollLeft` 0 at every step. **This is a
control-based result about the transform, not a claim that the animation was observed.**

At 420px `per()` falls to 1 and the rail correctly becomes ten dots, one per protocol.

**Not shared, deliberately — see [[SR-166]].** The dashboard runs a continuous constant-velocity
drift over a doubled card set; this is a stepped pager. Unifying them means choosing one model
for both, which is a design decision, not a refactor.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-166 · The two carousels are different interaction models
**Blocked on a design decision, not on effort.** `dashboard.html` moves its protocol row by
continuous constant-velocity drift over two identical card sets, wrapping by exactly one set's
width so the loop is invisible, easing to a halt on hover. The track pages step by a page of
visible cards with prev/next and a dot rail.

[[SR-162]] shared the cover because the cover is one thing rendered twice. **The carousels are
two different answers to two different questions** — the dashboard's row is ambient and browsable
while you decide, the track page's is an index you page through — and sharing them means picking
one behaviour for both surfaces. That is Andre's call. Recorded so the next run does not read
the duplication as drift and unify them by default.

*Status:* blocked — needs a design decision · *Raised:* 21 Aug 2026

### Premise withdrawn · there is no hover subtitle to port
Recorded so it is not re-raised. The brief held that the dashboard card reveals a subtitle on
hover and the track card only tints its border. **Both are border tints**, differing only in
alpha: `.sr-dash-card:hover .sr-pcover` at `rgba(212,168,67,.5)` and `.sr-tp-pcard:hover` at
`rgba(212,168,67,.45)`. The subtitle belongs to `.sr-cover-sub` on the Clearing card — a
different component — and is `display:block`, always visible, never revealed. Hover left as it
is on both.


### SR-164 · The white flash — and the fix was already in the repo, on two pages
Seven of the nine served pages painted the browser's default canvas until the stylesheet that
sets the background had downloaded and parsed. On a dark site that is a full-screen white flash
on every navigation.

**The premise held, but the "smallest possible change" was already written.** `protocol.html:21`
and `resource.html:11` each carried

```html
<meta name="color-scheme" content="dark">
<style>html,body{background:#08080C}</style>
```

as the first two things in `<head>`. The first pass added a second, slightly different block to
all nine pages — including those two, which would have made it a duplicate and a **second
pattern** for one problem. Reverted, and the existing pair copied verbatim to the other seven
instead. Rule 3: when the tree already answers the question, the tree's answer wins, and an
answer already shipping twice is not a candidate for improvement in passing.

The `color-scheme` half matters and a background alone does not do it: it also hands scrollbars,
form controls and the UA's default text colour their dark rendering, so the pre-stylesheet paint
is legible rather than merely dark.

Ground colour is a literal, not `var(--bg)` — the token is defined by the very stylesheet this
has to precede. `index.html` is `#080810`; the other eight are `#08080C`, each matching its own
`--bg`. Asserted structurally on all nine: the block precedes **every** `<link rel="stylesheet">`
and every other `<style>` in the document.

**Verified against a control, because this environment cannot show the symptom (Rule 20 and
Rule 10 together).** The preview browser's default canvas is *dark*, so a page with no ground
colour looks correct here while being wrong everywhere else — a false pass waiting to happen.
Two things were forced to make it measurable: a copy of a track page with its stylesheet pointed
at a path that never resolves (infinite stylesheet latency, held still), and the browser's colour
scheme set to **light**. Under identical conditions:

| | `html` background | screenshot |
|---|---|---|
| control, block removed | `rgba(0, 0, 0, 0)` | **full-screen white** |
| with the block | `rgb(8, 8, 12)` | the dark ground, text already legible |

Both control pages were built in the scratchpad mirror only and never existed in the tree.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-167 · The euro invariant no longer matches the record it guards
**Found by Run F's close-out sweep, reported and left alone. Resolved by [[SR-168]], which
carries Andre's decision on how the count is defined.**

The standing invariant at the top of this file reads: *"Euro escapes exist only inside `PRICING`
in `content/tracks.js`. Current count **9**."* The file holds **11**, plus **14** bare `€`
glyphs.

**`content/tracks.js` is byte-identical to `main` on this branch** — verified with
`git show main:content/tracks.js`, no diff, nothing in Run F touched it. The drift predates this
branch entirely and the sweep is what surfaced it.

Nothing is actually loose: all 11 escapes sit inside the `PRICING` object or the SR-136/137
comment above it, and all 14 glyphs are in the explanatory comment block at the head of the
file. The invariant's *intent* holds. **Its number does not**, and a checkable-in-one-command
invariant whose count is wrong stops being checkable — the next run either "fixes" the file to
match the note or stops trusting the note.

The likelier cause is that the prices moved and the line did not follow: Run E's own table
records `workshopPersonal` at €59, `workshopRelationship` at €139 and a `premium` key at €275.
The file now says **€29 per person**, **€49 per couple**, and has **no `premium` key** — the
SR-136/137 comment says so explicitly. The separate invariant *"€59, €139 and €275 appear
nowhere"* was re-verified this run and **holds: zero occurrences across every tracked file.**

Fixing it means recounting against the current `PRICING` and deciding whether comments count
toward the total — a decision about the invariant's definition, not a defect in the code.

*Status:* closed by [[SR-168]] · *Raised:* 21 Aug 2026 · *Closed:* 21 Aug 2026


### SR-168 · The euro invariant now counts values, not commentary
[[SR-167]] found the standing invariant claiming **9** where the file held **11** escapes and
**14** bare glyphs. Andre's decision: **count only inside `PRICING`, exclude comments.** An
invariant that counts commentary breaks every time someone writes a note — it becomes
unreproducible for a reason that has nothing to do with what it guards.

**The corrected number is 8**, and it is the eight `amount` values the record actually holds:
`t1` €9, `t1.standard` €19, `t2` €29, `t3` €39, `workshopPersonal` €29, `workshopRelationship`
€49, `premium1` €129, `premium3` €299.

**The rule, exactly, so the next close-out runs it in one command** — slice the `PRICING`
object, strip `/* */` comments, then count. It prints `8`:

```
python3 - <<'PY'
import re
b = open('content/tracks.js', encoding='utf-8').read().split('var PRICING = {')[1].split('\n};')[0]
print(len(re.findall(r'\\u20AC', re.sub(r'/\*.*?\*/', '', b, flags=re.S))))
PY
```

Two companion halves, both **0** with comments stripped: escapes anywhere outside the `PRICING`
block, and bare `€` glyphs anywhere in the file. Together those three numbers — 8 / 0 / 0 —
are the whole invariant.

**Why excluding comments is the substantive half, not a technicality.** The neighbouring
invariant says *"€59, €139 and €275 appear nowhere."* Counted naively it is violated:
`\u20AC275` sits in `content/tracks.js` inside the SR-136/137 comment recording **why the
`premium` key must not be re-added**. A note explaining a removal was reading as the removal
having failed. Under the corrected rule it is 0, which is what the invariant was always
asserting.

**It predates this branch, and the branch is not what moved it.** `content/tracks.js` is
byte-identical to `main` — `git diff --quiet main -- content/tracks.js` is silent, and the last
commit to touch it is `d2ed1fe`, [[SR-140]], from Run E. The count drifted when Run E changed
the record and the invariant line was not updated with it. Nothing in Run F or this run has
edited the file.

**What was deliberately NOT rewritten.** The invariant is a live assertion, so it was corrected.
Three other places name the old figures and are **dated history, not errors**:
[[SR-091]] (which set €59/€139 and is what [[SR-136]] later corrected), [[SR-127]] (recording
`protocol.html`'s literals as they stood), and `RUN-E-REPORT.md`'s Phase 0b table. Rewriting
those would falsify the record and destroy the before/after pair [[SR-136]] depends on —
including the €49 ordering constraint, which explicitly says to preserve that trail. The Phase
0b table got a forward reference instead, because the risk there is real: a reader hitting the
table has no signal that three of its rows were superseded 550 lines later in the same document.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-169 · The five framework pages verified structurally before wiring
Andre's claim — five pages authored against `method-porges.html`, using only classes that page
already uses — **held on every count.** Verified against the **repo's** Porges, not the Desktop
copy.

Zero classes outside Porges's 58 on any of the five. Balance 49/49 div, li balanced, **5/5
sections** on all five (Porges 50/50). One inline script each, **zero `<script src>`**, all six
parse. Every live asset resolves; band art and `res-somatic.jpg` are commented out and produce
**no 404** — confirmed against the served network log, every request 200. Nine internal hrefs
per page, all resolving, no bare `href="#"`, and each carries two working links back to
`method.html`. Zero hits on all seven critique terms.

**Section 04 has three wordings, and they are a system, not drift.** The heading states the
epistemic status before the reader reaches the content:

| wording | register | pages |
|---|---|---|
| **"What holds"** | peer-reviewed | Porges, HeartMath, Kross |
| **"What this is"** | clinical practice | Maté |
| **"What register this is" / "Where it sits"** | interpretive | Jung, Watts |

Each page documents its own choice in its head comment — Jung's reads *"there is no 'what holds'
here because there is no empirical literature to hold… This is deliberate — do not align it
back."* **Do not align any of the three.** The mapping is already in the record:
`FRAMEWORKS[x].register` holds exactly these three values — `peer-reviewed`, `clinical
practice`, `interpretive` — for exactly these pages, so the heading is derivable rather than
authored. See the shape note in [[SR-172]].

**Two pre-existing findings, neither caused by the five:** `sr-theme--bar` is inert on all six
([[SR-175]]), and the console-buffer artifact above, which produced 33 phantom errors on the
first read.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-175 · `sr-theme--bar` is inert on every framework page
`method-porges.html:69` and all five new pages carry
`<div class="sr-fw-barspacer sr-theme sr-theme--bar">`. The class is defined **once**, at
`css/saferise-dashboard.css:603` (`margin-left:auto`) — a stylesheet **no framework page
loads**. They load `css/saferise-method.css` only.

**Inert, not dormant** (Rule 14): it matches nothing and wins nothing, so no rule is masked and
nothing resumes if something changes. The reading-mode control simply does not get its
`margin-left:auto` on these six pages.

Pre-existing on Porges and inherited by the five from the template. Fixing it is a one-line
addition to `saferise-method.css` — but whether the control is *supposed* to be pushed right on
these pages is a layout decision, and the pages have shipped looking as they do. **Blocked on
that, not on effort.**

*Status:* blocked — needs a layout decision · *Raised:* 21 Aug 2026

### SR-170 · Porges drops the critique apparatus for a scope statement
Andre's editorial decision, applied to the one page that had not received it: remove criticism
of where others disagree; where he agrees is sufficient. The five new pages already reflected
it, so **the repo's Porges was the outlier**, not the five.

**This supersedes [[SR-058]], which is still open and says in terms:** *"Section 04 and the
sources list are not to be edited outside this item. Every citation was verified against the
published record; changes go through the register."* This is that change, going through the
register. SR-058's two outstanding decisions — a review date and owner, and whether HeartMath
takes framework 01 if the dispute resolves against the theory — are **not** answered by this;
the second is now moot on the page but the underlying exposure is unchanged, which is exactly
why the paragraph was replaced rather than deleted.

Removed: the *"and formally disputed since"* clause; the closing paragraph reporting the
February 2026 *Clinical Neuropsychiatry* exchange; and four sources — Grossman & Taylor 2007,
Grossman 2023, Grossman et al. 2026, and Porges's rebuttal in the same issue. **Sources 8 → 4**
(`Primary source` ×3, `Applied`). All seven critique terms now return **0**.

**Replaced, not deleted.** The page must not silently assert the theory is settled, so section
04 closes on a scope statement in the shape all five new pages use — HeartMath's *"That is not a
comment on their work; it is a statement of where this platform's claim ends"* is the pattern.
Porges now states that SafeRise takes no position on the anatomical or evolutionary account,
that nothing in the four steps depends on the answer, and that the five findings are what the
method runs on. **This is new prose and Andre should read it.**

**Deliberately NOT removed — do not tidy.** The REGION 6 comment (*"A reading list that only
cites the advocate is a reading list nobody trusts"*) and the heading *"Read the arguments
yourself"* are on **all six** pages, including the five Andre approved. They are shared
template, not Porges's critique apparatus. Removing them would have made Porges an outlier again
in the opposite direction.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-171 · The five framework pages lacked the SR-164 ground block
Confirmed live before the fix: `htmlBg` **`rgba(0, 0, 0, 0)`** on all five. Their template
predates [[SR-164]], so all five would have shipped with the white flash Run F removed from the
other nine pages.

The `color-scheme` meta and `html,body` pair were **lifted verbatim** from `method-porges.html`,
which already carried them, and each of the five now matches it byte for byte. No second pattern
was authored — that was Run F's own mistake in SR-164 and it reverted it. Asserted on all six:
the block precedes every `<link rel="stylesheet">` and every other `<style>`.

Verified against the forced-light-mode control, since this preview's canvas is dark and an
unfixed page passes here (see the pre-flight above): a copy of `method-jung.html` with its
stylesheet pointed at a path that never resolves paints **full-screen white** without the block
and **`rgb(8, 8, 12)`** with it. Both control pages lived in the scratchpad mirror only.

Committed with [[SR-172]], because it only ever changed these five files and they land there.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-172 · The six framework pages are one set
`method.html` linked one framework and disabled five: cards 02–06 were
`<div class="sr-mi-card … soon">` ending in *"Not yet published"*. Each is now an `<a>` pointing
at its page, with the *"Read the page"* span **lifted verbatim from card 01** rather than
authored twice. All six targets exist. Zero `soon` classes and zero *"Not yet published"*
remain; balance holds at 53/53 div, 9/9 a, 6/6 section.

**A numbering conflict this run did not resolve, because renumbering is a decision.**
`method.html` orders **03 Kross, 04 Maté**; the pages number themselves **03 Maté, 04 Kross**.
The record supports the pages: `FRAMEWORKS.mate.step` is 3 and `FRAMEWORKS.distance.step` is 4,
and the framework ordinal tracks `step` exactly for 01–04. The links are unambiguous either way
— each card points at the page naming the same author — so **only the displayed ordinal
disagrees**. Raised, not fixed.

**The `FRAMEWORKS` shape question — reported, deliberately not added.** Links are currently
authored in markup on `method.html` and would have to be re-authored anywhere else the set
appears. The record should carry the path, exactly as `PRICING` carries the amount:

```js
porges:    { …, page: 'method-porges.html' },
heartmath: { …, page: 'method-heartmath.html' },
distance:  { …, page: 'method-kross.html' },   // key and filename differ — the reason this belongs in the record
mate:      { …, page: 'method-mate.html' },
jung:      { …, page: 'method-jung.html' },
watts:     { …, page: 'method-watts.html' }
```

`distance` → `method-kross.html` is the case that proves the point: the key and the filename are
different words, so every consumer that authors the link re-derives that mapping by hand.
An `ordinal` field would settle the conflict above in the same place. `FRAMEWORKS.register`
already carries the three values [[SR-169]]'s section-04 mapping needs, so the heading is
derivable too. **Shape only — nothing added.**

**Deliberate non-fix, do not tidy.** `.sr-mi-card.soon` at `css/saferise-method.css:486-487` is
now orphaned — no markup carries `soon` anywhere. It is left in place: it is the state a
seventh, unbuilt framework would need, and removing it would mean re-authoring it the next time
one is added before its page exists.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-176 · method.html's framework ordinals now follow the record
`method.html` numbered Kross **03** and Maté **04**; the pages number themselves Maté 03 and
Kross 04. The record decides, and it backs the pages: `FRAMEWORKS.mate.step` is 3,
`FRAMEWORKS.distance.step` is 4, and the ordinal tracks `step` exactly for 01–04.

**Renumbered in place, not reordered — reordering is impossible here.** The cards sit in three
`sr-mi-band` sections grouped by register: *"The science we stand on"* (Porges, HeartMath,
Kross), *"The practice we learned from"* (Maté), *"The thinking we take our bearings from"*
(Jung, Watts). Maté cannot move into the science band. The bands were already right and already
carried the true mapping — the science band declares `data-steps="01,02,04"` and the practice
band declares `data-steps="03"`.

**Consequence, stated because it is visible:** the science band now reads 01, 02, **04** and the
practice band reads **03**, so the page sequence is 01 02 04 · 03 · 05 06. That is correct — the
number identifies the framework, not its position — but it is a change to what a reader sees
and it is reversible from the record alone.

*Status:* complete on merge · *Raised:* 22 Aug 2026 · *Fixed:* 22 Aug 2026

### SR-177 · `FRAMEWORKS` carries the page path and the ordinal
Links and framework numbers were authored in `method.html`'s markup. The record holds both now,
and the page derives them.

**`page`** because the key and the filename are different words — **`distance` is served by
`method-kross.html`** — so every consumer that authors the link re-derives that mapping by hand.
Same defect class as a price typed into a page instead of read from `PRICING`.

**`ordinal`** because `method.html` and the pages disagreed about 03 and 04 ([[SR-176]]), and two
places holding the same number is exactly how that happened. It tracks `step` for 01–04; `jung`
and `watts` are `step: 0` because they carry no single step, so their ordinal is stated rather
than derived.

`register` was already there and already carries what the pages' section-04 headings need —
`peer-reviewed`, `clinical practice`, `interpretive`, mapped in [[SR-169]].

`method.html` now loads `content/tracks.js` and keys its six cards with `data-fw`. The href and
ordinal **stay in the markup as the served fallback** if the record fails to load, and are
overwritten from the record on every load, so the two cannot drift apart again.

**Verified by mutating the record and re-deriving**, which is the only way to tell derivation
from a page echoing its own markup: the `distance` card followed to `09` and a sentinel href,
then returned to `04` and `method-kross.html` when the record was restored.

*Status:* complete on merge · *Raised:* 22 Aug 2026 · *Fixed:* 22 Aug 2026

### SR-174 · The protocol card — cursor control, disclosure, scale
Six items, and **the second did not reproduce.**

**(b) There is no auto-drift on the track pages, and nothing was removed.**
`js/saferise-track.js` has no `requestAnimationFrame`, no `setInterval` and no `@keyframes`
reaching it; the strip was measured stationary at `left: 107` for **65.8 seconds with no
input**. The drift lives on `dashboard.html`, a different surface, untouched. The complaint
describes the dashboard or a pre-Run F deploy — PR #30 merged ~21:10 and the screenshot was
21:17.

**Cursor control, on the same transform.** Pointer drag tracks 1:1 and snaps to the nearest
card on release; wheel and trackpad move the same transform and **accumulate across a flick** —
the first implementation recomputed from the index on every wheel event, so a hundred events
travelled as far as one, and a `wheeling` flag fixes it. `overflow-x:auto` and
`scroll-snap-type` did **not** come back: measured `overflowX hidden`, `scrollSnapType none`,
**`scrollLeft 0` through every gesture**. A vertical wheel is left alone so the page still
scrolls, and a drag that crossed the card swallows the click behind it. The viewport takes
`cursor:grab` — an affordance it can keep, the opposite case to [[SR-178]]'s card.

**(d) Progressive disclosure.** Visible at rest: title and promise. Revealed on hover **and
keyboard focus**: the signature line and the three chips. The reveal is absolutely positioned
over the foot of the cover, and that is **forced rather than chosen** — the card must get
shorter, the strip must not reflow, and `.sr-tp-carviewport` is `overflow:hidden`, so
out-of-flow is the only way to hold the first two and upward is the only direction with room
inside the card box. Timing is the sheet's existing reveal, `.28s var(--sr-ease)` on transform
and opacity, the pair already at lines 463 and 1739 — not a new curve. Reduced motion is handled
centrally and is not repeated here (CLAUDE.md). Touch and anything else without hover gets it
always-visible under `(hover:none),(max-width:560px)`, with the transition removed there so it
is not an entrance animation on load.

**(e) Typography.** The title was **13.5px — the same size as the promise beneath it**, so
nothing read as a title. It takes the system's own `.sr-tp h3`, **18px/1.34 Cinzel**. No new
size invented. **The `!important` is redundant, not load-bearing**: `.sr-tp .sr-tp-pdesc` is
defined at 12.5px and re-declared at 13.5px in the later "readability pass" block — identical
specificity, later in the same sheet, so it already wins on order. Reported and **left alone**;
removing it is a separate cleanup. **Do not tidy without checking that first.**

**(f) 733px → 561px, 172px shorter.** Text fell from **57% of the card to 39%**. Height constant
at 561 on focus and blur — card, strip and viewport all unchanged, so the strip cannot jump.

Reveal verified against a `transition:none` control, since transitions never advance in this
preview: opacity 0→1 and `translateY(8px)`→0 on focus, back on blur, height unchanged. Hover
shares one declaration block with `:focus-within`, so proving the declaration applies proves
both — CSS `:hover` cannot be driven synthetically and that is stated rather than glossed.

*Status:* complete on merge · *Raised:* 22 Aug 2026 · *Fixed:* 22 Aug 2026

### SR-178 · The protocol card promised an action nothing could deliver
`.sr-tp-pcard` carried `cursor:pointer` with **no handler, no `role` and no `tabindex`**.

**The destination does not exist.** `protocol.html` reads only `embed=1` and `theme=` from the
query string; `PAGE_PROTOCOL` is hardcoded to `t1-p01`, *The Anxiety Reset Protocol*, and
`?track=` and `?protocol=` are **ignored entirely** — the dashboard passes them and the page
never reads them. So any of the thirty cards could only ever land on Anxiety Reset, which on
Relationship Healing is worse than nothing.

Binding only the one card that works was rejected: 29 silently inert cards beside one that
behaves differently is a worse affordance than none. **The pointer cursor is removed and no
handler added.** `tabindex="0"` stays so a keyboard user can open the [[SR-174]] reveal — a
readable region, not a control, so no `role`. The cursor returns when there is something to
open.

**The real fix, blocked:** `protocol.html` must read `?track=` and `?protocol=` and become
data-driven. That is blocked on **content existing for the other 29 protocols** — resource
authoring, not a code task.

*Status:* open — blocked on protocol content · *Raised:* 22 Aug 2026

### SR-179 · The cover number and label are drawn twice
Reported and **deliberately unchanged**, because the thing that would settle it does not exist
yet.

The current art **burns both into the image**: `assets/covers/01.jpg` carries **"REGULATE"
top-left and a large "01" bottom-right**, and [[SR-162]]'s overlay draws the same two from the
record in the same two corners. Both collide. `t3-01.jpg` carries the numeral only, so the art
is not even consistent with itself.

**The drawn overlay is correct and stays** — it is the whole point of [[SR-162]], and it is what
lets the covers be reshot bare. The duplicate disappears when the new art lands.

**Measured, at 1280 with the cover at 236×315:** the drawn number sits **7px from the bottom and
12px from the right**. Andre reports the replacement covers will carry a rule and SAFERISE mark
in that same bottom-right corner, stacked beneath the number. **7px is not enough clearance for
any mark**, so the drawn number's position has to move up before the stack can be set.

**By how much cannot be decided yet.** No cover in the repo carries such a mark — checked
`01.jpg` and `t3-01.jpg`, both numeral-only — so there is nothing to measure "roughly the size
of the one in the current art" against. **Blocked on a real sample.** When one exists, re-measure
the drawn number's bottom offset against it and set the stack: drawn number above, in-image mark
below, both bottom-right, one mark only and it comes from the image.

**UPDATE, 22 Aug 2026 — unblocked by [[SR-189]], and the predicted collision is now real.**
The replacement covers have landed. The sample this entry was blocked on exists, so the
measurement it asked for can finally be taken — and it comes out badly.

The cover spec puts the rule and wordmark on a shared centreline at **y = 1370 of 1448**, i.e.
**78px above the base, 5.4% of the height**. The drawn number sits at **`bottom:7px`** on a card
measured at 236×315 — **2.2%** — at `font-size:30px`, so it occupies roughly the bottom **7px to
37px**. The in-image wordmark's centreline lands around **17px** on that same card. **They
overlap**, both bottom-right, exactly as this entry predicted when it said 7px was not enough
clearance for any mark.

The prediction was right and the fix is now measurable rather than blocked. `.sr-pcover-no` at
[css/saferise-system.css:2349](css/saferise-system.css:2349) has to move up clear of the
wordmark, drawn by [js/saferise-card.js:65](js/saferise-card.js:65). Not done here: this run was
scoped to installing the covers, and moving the overlay is a design change on a shared component
that renders on the dashboard and the portals as well.

⚠ This entry's opening paragraphs are **evidence, not live assertions** — they record the art
as measured when this was raised, and [[SR-189]] has since replaced those files. Left standing
rather than rewritten, per Rule 21: the collision above only makes sense against it.

*Status:* open — unblocked, ready to fix; overlay position needs moving · *Raised:* 22 Aug 2026






---

### SR-180 · The record grows a tenth resource, and t1-10 loses a framework it never used
Three data corrections were briefed from the Track 01 content handover. **Two reproduced. One
did not**, and that non-reproduction is the more useful finding.

**`SHARED.resources` 9 → 10.** Accountability & Empathy added after Your Record at
[content/tracks.js:93](content/tracks.js:93). It carries no `CONDITIONAL_RESOURCES` entry, so it
is universal across all thirty protocols and lifts the unconditional floor from seven to eight.
Track 01's per-protocol counts now resolve **8, 10, 9, 10, 8, 8, 8, 10, 10, 9**.
Its icon key is `face`, which already existed in `js/saferise-track.js`'s `ICONS` map — no new
icon was authored. Its description is the one field the handover did not supply; it is built
from the resource spec's own sentences and is the only line on the card that was not lifted
whole. **Do not re-add Source Insights above it** — [[SR-077]] merged that into How This Works
and the merge stands.

**`META['t1-10'].frameworks` loses `distance`.** The dispenza correction landed in this repo as a
**rename** (dispenza → distance, [[SR-118]]); the authored content treated it as a **drop**.
t1-10's own build note reads *"Authored against Porges and Watts"*, and no resource in that
protocol cites the fourth-step literature, so the third key was a false attribution — a resource
citing a framework its text never uses. The authored content decided it.
**t1-09 keeps `distance` deliberately**, because its text does rest on it. Do not "consistency
fix" the pair.

**`META[].extras` — briefed, does not reproduce (Rule 2).** All ten already matched the handover
exactly. No edit was made. This was the **seventh** stale claim in that document, after six the
author had already withdrawn, and it is why handover §3 is now treated as a **claim list, not a
work list**: every remaining item gets reproduced against the tree before anything is acted on.

**Consequence, intended, recorded so it does not read as a regression later:**
`frameworkReach('distance')` moves **6 → 5**, and `method-kross.html` now lists one fewer Track
01 protocol. The backlog entry asserting 6 was a live assertion and has been rewritten, per
Rule 21.

⚠ **The count is control-based and wants re-taking.** No JS runtime existed in the environment
(see the sixth measurement artifact), so `protocolResources()` could not be executed. The
resolution was re-implemented, validated against `HEAD` as a known-good control — which
reproduced the pre-edit truth `[7,9,8,9,7,7,7,9,9,8]` — and sentinel-checked for sensitivity by
emptying t1-02's `extras` and confirming the count moved. Rule 9 still applies: a sentinel proves
a probe works *within its own method*, not that the method is right. Nothing here is
runtime-built, which is the condition Rule 8 exists for, so the reasoning is sound — but
**re-take this with a real evaluator when one is available.**

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-181 · The Reader counted a member's position and timed their reading
Ninety authored Track 01 resources state that nothing counts a member's way through the library
and that no duration appears anywhere. The Reader did both.

**Removed:** the sidebar position readout (ordinal out of total, plus kind), and the
reading-length readout in **both** the places it rendered — the tab list and the content topbar.

**Rule 19 mattered three times here**, and none of the three was the string itself:
- the position readout's `<p>` carries `margin-bottom:8px`, so emptying it leaves a stranded 8px
  gap rather than a no-op. The element went with the write.
- the topbar readout sat **between two `<span class="topbar-divider">·</span>`**. Removing only
  the text renders a doubled separator. One divider went with it.
- the tab-list row is `display:flex` and held the duration plus an optional lock. It now renders
  **only when there is a lock to show**, instead of leaving an empty flex row on every unlocked
  resource.

**Now genuinely inert, reported rather than deleted:** `.reader-progress-line` in both the base
and light-mode blocks. Nothing can match it — this is not "dormant" in Rule 14's sense.

⚠ **Corrected at close-out.** The first version of this entry named only `index.html`'s inline
blocks. The close-out sweep found **two more inert rules in a second file** —
[css/saferise-system.css:1407](css/saferise-system.css:1407) and
[:1409](css/saferise-system.css:1409) carry `#reader-overlay .reader-rail-count` and
`#reader-overlay .reader-progress-fill`. A Reader rule living in the shared system sheet as well
as in the page's own `<style>` is exactly what Rule 7 warns about: one file swept, the other
missed. All of them are inert; none is deleted.

⚠ **The comments in the code deliberately do not quote the removed strings.** Rule 21's own
worked example is a sweep counting a note *about* a removal as the removal having failed, which
is exactly what a comment containing the banned string would cause. This was caught before
commit, on a sweep that hit the new comments.

**This fix was not sufficient on its own** — see [[SR-185]].

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-185 · Removing the two strings did not make the Reader shippable
[[SR-181]] removed what it was briefed to remove and the Reader still made the forbidden claim,
**eleven lines from the code that had just been changed**. Found by enumerating every DOM write
in the Reader rather than by sweeping for the strings — the surviving violations did not share a
string with the ones removed.

**A progress bar.** `reader-progress-track` / `reader-progress-fill`, driven by
`style.width = pct + '%'`. The content rule says "no progress bars" in those words; a bar is the
same claim drawn rather than written, and no text sweep would ever have found it.

**A second position readout,** under a rail literally headed **"Your Progress"**, rendering an
ordinal out of a total from two separate writes.

Both removed, with their containers — the track carries a 3px height, so emptying it leaves a
stranded band.

**The rail itself stays.** Its step list, Bookmark/Highlight/Listen and footer quote are not
progress claims, and removing them would be a design change rather than a removal.

**The lesson worth keeping:** a prohibition stated as a string ("no *Resource 7 of 8*") gets
verified as a string, and the drawn and re-worded forms survive. Rule 7 and Rule 17 cover
numerals, escapes and spelled forms; this adds the **drawn** form. When a rule forbids a claim,
enumerate the surfaces that could make it, not the strings that do.

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-186 · The duration field outlived every one of its consumers
After [[SR-181]] removed both renders, `KIND_META[].readtime` had **zero consumers** — the same
class as `premium1`/`premium3` in Run E, where a record with no reader was the finding rather
than the fix. Here the conclusion goes the other way, because the field is a **duration**, and
the content rule forbids durations platform-wide. A duration sitting unread in the record is what
a later run takes as permission to render one.

Removed from all 17 `KIND_META` entries, from the `kindMetaFor` fallback, and from the entry
added at runtime when The Decision becomes a Reader destination. 19 occurrences, one file.
Nothing broke: `KIND_META` still holds 17 entries and the script-block profile is identical to
`HEAD`.

No duration styling was added anywhere by this run's other work either. A hook in the stylesheet
is an invitation to render one.

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-188 · Where the Track 01 content should live — decision required before anything installs
**Report only. Nothing installed.** 43,743 words across 13 files, 231KB of markdown, ten
protocols by up to ten resources.

**How a resource body is stored today.** `RESOURCE_CONTENT[key].body` is an **array of HTML block
strings** — each entry one rendered block, already marked up. `READER_PROTOCOLS[key].keys` holds
the ordered manifest of resource keys for a protocol. The Reader reads both synchronously. The
incoming content is markdown, so a **one-time markdown → HTML-block transform, checked in**, is
required either way. Not a runtime conversion: that would put an authoring step on the member's
device and make the copy depend on a parser.

**Two key namespaces, and they do not agree.** `META` keys Track 01 as `t1-01` … `t1-10`.
`READER_PROTOCOLS` and `RESOURCE_CONTENT` key the same ten as `p1` … `p10`, with Tracks 02 and 03
as `t2-p1` … `t3-p10`. Anything installing content has to cross that boundary, and **the mapping
currently exists only in whoever is writing the code at the time.**

**Conditional resources are keyed `-repair`, not `-invitation`.** `META[].extras` records the
conditional as `'invitation'`; `CONDITIONAL_RESOURCES` maps the display name *Invitation to
Repair* → `'invitation'`; the served resource key is `p2-repair`. **This is the identical defect
class [[SR-177]] already solved once** for `distance` → `method-kross.html`, where a key and a
filename were different words and every consumer re-derived the mapping by hand.
**Recommendation: record the mapping once, in the data, as SR-177 did** — do not rename anything,
and do not let a third consumer re-derive it.

**Options for the body text.**

| | Where | Cost |
|---|---|---|
| A | Inline into `index.html`'s `RESOURCE_CONTENT` — the current pattern | `index.html` is already 10,552 lines. Adds ~231KB to a single file that every visitor loads, cannot be cached separately, and makes merge conflicts near-certain while three tracks are authored in parallel. **Not recommended.** |
| B | One file per track, `content/t1-resources.js`, beside `tracks.js` | Matches the established pattern exactly: plain `var` + the `module.exports` guard `tracks.js` already carries. Zero loader code, the Reader's synchronous access keeps working, `index.html` grows by one `<script>` tag. ~231KB raw, roughly 60KB gzipped. **Recommended.** |
| C | One file per protocol, `content/t1/01.js` … | Best weight — a member loads one protocol, not ten. But it needs a loader, and lazy loading means the Reader's synchronous reads become asynchronous, which touches the Reader's control flow rather than just its data. Worth doing later, on measured need, not now. |
| D | JSON + `fetch` | Fails on `file://`, needs a server this environment could not start, and adds a build step the repo does not have. **Not viable here.** |

**The illustration cues are the interesting question.** 360 markers across the ten protocols —
176 `TEAL/BREATH`, 132 `GOLD/PAUSE`, 20 `PURPLE/MUSIC`, 20 `BLUE/ILLUSTRATION`, 12 `RED/ACTION`.
These are **production direction for the audio and art lanes, not member-facing copy**, and must
never render. Two choices: strip them at transform time, or carry them as a parallel `cues:[]`
array indexed to the body blocks and simply not render them.
**Recommendation: carry them.** Stripping severs the only link between the shipped copy and the
recording and illustration briefs, and the ten-protocol art lane still needs them. This is the
same principle `CLAUDE.md` already sets for the original protocol descriptions — kept in the
data, not rendered on the card.

**Blocked on Andre confirming B over C**, and on the namespace mapping decision above. Nothing
should install until both are settled, because both change the shape of the transform.



---

### SR-189 · The covers in the repo were the defective ones, not the ones in the folder
The image inventory said `t3-01` … `t3-09` were undeployable — top word and numeral still burned
in, `-master` suffix, blocked on a generative removal pass. The supplied folder held them
plain-named with no suffix. **Both could not be true.** Inspected before installing anything, as
briefed.

**The inventory describes the repo's state, not the folder's.** The supplied covers are finished:
`t3-01` and `t3-05` carry no top word and no numeral, only the locked rule + SAFERISE lockup.
The defective files were the ones already committed — `assets/covers/01.jpg` carried
**"REGULATE"** top-left and a large **"01"** lower right, and `assets/covers/t3-01.jpg` carried
the same numeral. This is the art [[SR-179]] measured.

All 30 replaced at 1086×1448. Track 01 derivatives regenerated to the spec **read off the
existing set rather than invented**: `NN.png` at full resolution, `NN.jpg` and `NN.webp` at
900×1200, `-640` at 640×853, `-320` at 320×427. Tracks 02 and 03 keep their one-jpg convention.
Pillow 11.3.0 did the work; no `cwebp` or ImageMagick on the host, and none needed.

**90 files, every one a modification — none added, none removed.** The incoming names already
matched the repo's two conventions, so **no consumer moved**: the 103 cover references in
`index.html` alone are untouched. There was no rename work to do, which was the thing the phase
was scoped to report on.

⚠ **This unblocks [[SR-179]] and simultaneously creates the collision it predicted** — see that
entry, now updated with the measurement it was blocked on.

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-190 · The support advisory page had no target
Every Safe Practice resource points to *"a helpline in your country"* — ten references across
Track 01 alone — and the page those resolve to did not exist. Track 01 cannot ship without it.

`getting-help.html`, built from Part 1 of the supplied copy. **Nothing authored.** Verified
mechanically in both directions: no sentence on the page absent from the source, and no source
sentence missing from the page, after normalising markup, smart punctuation and whitespace.

**That check earned its place immediately.** It caught two things I had added without noticing:
an eyebrow label the source does not have, and a restructure that split one source sentence in
half around a pull quote. Both were reverted to the source's shape and the two CSS rules they
needed came out with them. **A transcription task fails silently by looking like good writing** —
the check is what makes "authored nothing" a claim rather than an intention.

**Deliberately not a directory, and do not make it one.** No helpline names, no numbers: services
differ by country, change without notice, and a stale number is worse than none. The two
organisations named are directories of services, not services.

No script and no gate — reachable without an account, as the copy requires. Styling is in
`css/saferise-system.css` under `.sr-adv`; nothing in the page styles itself, and `body` carries
`.sr-tp` because the tokens are scoped to that class rather than `:root`. No duration, count,
progress or score styling was added.

**Nothing links here yet.** The Safe Practice references arrive with the Track 01 content
([[SR-188]]), and the site-footer and cue-card-modal links the copy also specifies sit on
surfaces outside this run's scope. **The page is not reachable by a member until those land** —
it exists, it is correct, and it is currently an orphan.

*Status:* fixed, pending inbound links · *Raised and fixed:* 22 Aug 2026

---


### SR-191 · The count of a member goes; the count of a library stays
Applies the rule settled in [[SR-187]]: **what the string counts decides it, not which page it
sits on.**

Removed, all three counting the member:
- [resource.html:1003](resource.html:1003) — the rail numbered the open resource out of a total.
  It now names it. Naming which resource is open is orientation; numbering it is a report card.
- [dashboard.html:2297](dashboard.html:2297) — the resume card's position string **and the
  percentage bar eleven lines under it**. Both, for the reason [[SR-185]] records: removing the
  sentence and leaving the bar is the same claim, drawn instead of written.
- [dashboard.html:941](dashboard.html:941) — the cover ribbon, reading the same position from the
  same `sr.resume` record as the resume card.

Kept, both counting the library: `dashboard.html:1781` and `:1866`, *"N of M protocols still
unopened"*. A shelf showing what you have not read is not a report card.

**Two of the three removals were on the dashboard**, which is the clearest possible
demonstration that the page-based phrasing of the rule was wrong.

⚠ **The ribbon was not in the brief's list, and the reason matters.** [[SR-187]]'s original text
grouped it with the two library lines and described it as *"protocols still unopened"*, which it
never said. The instruction inherited the mislabel. See that entry — the correction is written up
there because that is where the error lives.

**Dormant, not inert (Rule 14), and that is the argument for removing them now rather than
later.** `sr.resume` has no writer ([[SR-165]]), so none of the three rendered anything today.
They would have rendered the day resume tracking shipped — a violation that arrives silently,
attached to a feature nobody was reviewing for copy. A dormant violation is not a smaller
violation; it is one with a delayed fuse.

`r.percent` is now unread. **Left in the record deliberately, unlike [[SR-186]]'s duration
field**, because a percentage is not itself a prohibited unit — the prohibition is on rendering
the member's position, not on the number existing. Reported rather than removed.

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-192 · Track 01's authored content enters the record
`content/t1-resources.js`, built to the shape [[SR-188]] recommended and Andre accepted: one file
per track beside `tracks.js`, same `var` + `module.exports` guard, read synchronously, no loader.
280KB, 90 resources, 1,462 body blocks.

**Counts reconcile against the handover's own verification block** — 90 of 90 resources;
per-protocol 8, 10, 9, 10, 8, 8, 8, 10, 10, 9, matching what [[SR-180]] made the record resolve
to; 360 cues at 176 breath, 132 pause, 20 music, 20 illustration, 12 action; four cue-card lines
on all ten.

**Generated, not authored, and proved so.** Every word in every body block traces to the source
markdown, checked per protocol. The check **failed twice before it passed, both times on the
probe rather than the data**: first every cue's block index read as an authored word, then the
generated structure's own field names did. Identifiers are not copy — the same distinction the
banned-vocabulary invariant needs, arrived at independently an hour later.

**The defect the check caught is the one worth recording.** The cue card's four lines are
separated in the source by a newline, not a blank line, and the first transform collapsed them
into a single paragraph. The handover is explicit that four lines is **the mechanism, not a
layout preference** — *"Four lines. Always here."* A transform that silently reflows authored
structure destroys meaning while producing valid output and a plausible word count.

**Two mappings live in the file, neither side renamed**, per [[SR-177]]'s precedent: META's
`t1-01`…`t1-10` to the Reader's `p1`…`p10`, and the conditional that is `invitation` in the data
and `-repair` in the key.

**All 360 cues kept as data and never rendered.** They are the only link between the shipped copy
and the recording and art lanes — the same principle `CLAUDE.md` sets for the original protocol
descriptions, which stay in the data and stay off the card. **A surface that renders `cues` is a
defect.**

⚠ **NOTHING READS THIS FILE YET, and wiring it is materially larger than installing it.** The
Reader serves Track 01 as six keys per protocol — `p1-advisory`, `p1-founder`, `p1-guide`,
`p1-companion`, `p1-disclosure`, `p1-crisiscard`. The authored set is eight to ten, and they do
not line up:
- **four resource types the tree has never seen** — `meditation`, `practice`, `record`,
  `accountability` — none of which exist in `PT_RES_ICONS` or `PT_RES_GROUPS`, so the protocol
  page cannot render a card for them.
- **`founder` is served and is a cut resource.** *Why I Built This One* is one of the three the
  handover retired; it is still in `READER_PROTOCOLS` for all ten.
- the existing `RESOURCE_CONTENT` entries for the retired keys are **shipped member-facing copy**
  that wiring would orphan or delete.

That is a rewrite of the Reader's Track 01 resource model inside `index.html`, deleting live
copy — not an install. **Blocked on a decision about the retired entries**, which is a content
question, not a code one.

*Status:* installed, unwired · *Raised:* 22 Aug 2026

---

### SR-193 · The support advisory stops being an orphan
Ten Safe Practice resources now link to `getting-help.html`, one each, which is what [[SR-190]]
built the page for.

The link is added **in the transform, not in the source markdown**: it is markup, the markdown is
the copy record, and the words are untouched — only wrapped. Fidelity re-checked after the change
and every word still traces to source.

⚠ **Two phrasings, not one.** The handover says *"ten references to 'a helpline in your
country'"*. **Nine say helpline. `t1-01` says "a crisis line in your country".** A linkifier keyed
to the exact quoted string wires nine of ten, reports success, and leaves one Safe Practice
resource pointing at nothing — Rule 17 exactly, a spelled variant of the same fact evading a
sweep aimed at one wording. Both forms are matched.

**Still outstanding**, and the page is not fully reachable until they land: the site-footer link
and the cue-card modal link the advisory copy also specifies. Both sit on surfaces outside this
run's scope.

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-182 · protocol.html resolves the protocol it was asked for
Reissued. This number was recorded at the Run H close-out as spent-not-free, on the assumption
its phase had been absorbed elsewhere. **Andre reassigned it to this work**, so it carries a real
entry and the ceiling note is corrected. The register follows the decision, not the earlier
bookkeeping.

The page read only `embed=` and `theme=`, and hardcoded `PAGE_PROTOCOL` to `t1-p01`. The dashboard
passed `?track=` and `?protocol=`; the page ignored both. All thirty cards could only land on
Anxiety Reset, which is why [[SR-178]] removed the card's pointer cursor rather than wire it to a
destination that did not exist.

`PAGE_PROTOCOL` now resolves against `TRACKS`, which `protocol.html` loads for the first time.
Protocol numbers compare numerically, so `?protocol=3` and `?protocol=03` resolve identically.

**Three outcomes, and only one renders the protocol page.** Resolved: the record answered.
Not requested: no query at all, so nothing was asked for and the page keeps its authored Track 01
content unchanged. **Unresolved: something was asked for and the record has no such protocol — a
visible not-found state renders and every other section is hidden.**

**The fallback is never a silent default, and the reason is the Journal.** `protocolId` is the
key the Journal view *filters* on while it *groups* on `protocol` for display. A wrong resolution
does not just show the wrong page — it files the member's entry against a protocol they never
ran. A silent fallback corrupts the record, not merely the view.

[[SR-178]]'s affordance is restored **on that entry's own stated condition** — *"the cursor
returns when there is something to open"*. `role="button"`, a delegated handler that survives a
re-render, and Enter/Space with `preventDefault`. A `role="button"` without keyboard parity is a
control that announces itself and then does nothing. The href is built from `t.id` and `p[0]`,
the same two record values `coverPath` already derives from — never typed.

**Not done, deliberately:** [[SR-179]]'s overlay move. It is a design change on a shared
component that renders on the dashboard and the portals, and Andre has not seen it.

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---


### SR-203 · The shipped copy is the canonical Track 02 shared block
[[SR-202]] found the block in three versions and did not guess which was canonical. **Andre
ruled: the shipped copy is authoritative, the standalone handover file is stale.**

**Re-verified at the point of extraction**, not carried over from SR-202's earlier measurement:
the block is **byte-identical** in t2-01 and t2-02 — same sha256, 2,950 bytes, 540 words.

**Extracted to `content/t2-resources.js` → `T2_SHARED.twoParts`**, verbatim from t2-01. Fidelity
checked both ways: no word in the output absent from the source, no source word missing from the
output. 18 body blocks, 536 rendered words, one cue.

**The reasoning, recorded because it decides future cases of the same kind.** Three grounds, and
the first is the general one:
1. **The file breaks its own stated rule.** Its `Vocabulary decisions` section — still live —
   says an invented label like *the first instrument* is worse than the word it replaces, and
   that describing the part beats naming it. The prose then uses *instrument* eight times, as a
   name. **The shipped copy does what the file only argues for.** Where a specification and its
   own worked example disagree, the example is the tell.
2. **Wrong register.** The shipped copy is second person and plain; the file is expository, which
   the platform does not use for member-facing copy.
3. **The shipped copy carries a `GOLD/PAUSE` production marker**, so it has been through the
   recording pass. The file has not. **A production marker is evidence of a pipeline stage the
   text has passed**, and it survived the extraction as a cue rather than as rendered copy.

**The closing element is the Track 01 recommendation, set italic — part of the block, not a
separate element.** This is why the file's `Related: where Track 01 comes in` section is
superseded along with the prose: the paragraph it quotes is an **earlier wording of that same
closing line**, and leaving it live would reintroduce the drift from the other end.

**The file is preserved, not deleted, because most of it is live.** It is now at
`docs/reference/SHARED-t2-two-instruments.md` with the superseded range marked in place and the
prose left standing beneath the marker — Rule 21, annotate the dated record rather than rewrite
it. Everything from `Vocabulary decisions` onward is untouched and byte-verified against the
original: the vocabulary rulings, the *energy* ruling, the no-aetiology line, and the safety
floor with the mutual-disclosure gate. **None of that was ever member-facing copy.**

⚠ **A standing constraint was honoured over a direct instruction, and this is the record of it.**
The instruction was to mark the block superseded in `SHARED-t2-two-instruments.md`. That file
lives under `~/Desktop`, which this project's standing rule puts permanently off-limits — *copy,
never move, never edit in place, never write to `~` or `~/Desktop`*. **The Desktop original is
untouched and verified so.** The file was brought into the repo and marked there, which serves
the instruction's purpose without breaching the constraint — and the spec sections belong under
version control regardless.

**Placement note.** The precedent cited was `SHARED.resources` and `CHANGE_PROPOSALS`, both in
`tracks.js`. The **pattern** was followed — one record, referenced by identity, never copied —
but the **file** is `content/t2-resources.js`, matching [[SR-192]]'s per-track shape. `tracks.js`
loads on every page including the marketing index, and 540 words of resource prose there is a
page-weight regression. Track 02's remaining resources land in the same file as they are authored.

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-197 · `CONTENT-STATUS-CORRECTION.md` does not exist
**Recorded because it was the stated precondition for the whole Run I amendment**, not because
anything was blocked by it.

The instruction was to read `CONTENT-STATUS-CORRECTION.md` in the brief folder **before acting on
the brief**, on the grounds that a correction document supersedes the brief's status line. **The
file is not in the folder and does not exist anywhere on the Desktop** — searched by name and by
the substrings *correction* and *status*. The folder holds seven markdown files and 31 SVGs; that
is not one of them.

**Proceeded anyway, and the reason is the one Rule 3 gives.** The correction's substance was
supplied directly in the instruction — 42 of 175 resources, four protocols complete (t2-01,
t2-02, t3-01, t3-05), eight meditation-only, eight empty — and **the tree corroborates it
exactly**: the folder contains four protocol content files, and they are those four. The brief's
own status line (18 of 91, 16 of 84) is the figure that disagrees with the tree.

So the document is missing but its content is verified by something better than the document:
the files themselves. **A missing source whose claims independently reproduce is a reporting
matter, not a blocker** — and none of SR-198, SR-199, SR-201 or SR-202 depended on it, because
all four read the build sheets, which are present.

**If a correction document does exist somewhere, it has not been seen by this run**, and anything
in it beyond the four facts above has not been applied.

**UPDATE, 22 Aug 2026 — the file exists after all, in a later bundle.**
`CONTENT-STATUS-CORRECTION.md` ships inside `SafeRise-Track02-Complete/specs/`. It was genuinely
absent from the Tracks 02/03 brief folder where the instruction placed it, and absent from the
Desktop entirely at the time — that observation stands as evidence and is not rewritten. It
arrived with the Track 02 complete bundle.

**Nothing this entry concluded changes.** The four facts were verified against the tree rather
than taken from the document, which is why its absence blocked nothing. Its Track 02 lines are now
superseded in turn by `TRACK-02-COMPLETE-HANDOVER.md`, which took Track 02 from 18 of 91 to 91 of
91. Track 03 remains as both describe it, 16 of 84.

**The lesson is about sequencing, not about the document.** A file named in an instruction may
exist in a bundle that has not arrived yet. Absence at the moment of checking is a fact about the
moment, not about the file — report it as such, verify the claims independently, and proceed.

*Status:* closed — source arrived in a later bundle, conclusions unchanged · *Raised:* 22 Aug 2026

---

### SR-198 · The twenty unverified `extras` are resolved
`META[].extras` was `null` on all twenty Track 02 and 03 protocols. `null` means **unverified,
not none** — a distinction [[SR-117]] records as a deliberate double-record. Written in from the
Tracks 02/03 build sheets.

Per-protocol counts now resolve to the sheets' **Res** column exactly, and the track totals
reconcile independently: **91** for Track 02 and **84** for Track 03, which are the figures the
brief states. **No `null` remains in `META`.**

**The honest-floor fallback in `protocolResources()` is kept even though no real data can now
reach it.** Both `null` and `[]` still yield the unconditional set. That branch is what a **new**
protocol added without a verified mapping falls back to, and removing it as dead code would let
the next unverified row silently claim a full library instead of the floor. A do-not-tidy line
sits on it (Rule 1).

Control-based, no JS runtime (see the sixth measurement artifact): the control is the pre-run tip,
where all twenty were `null` and every one resolved to the unconditional floor; the sentinel
returns t2-03 to `null` and confirms the count moves 10 → 8.

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-199 · Three of the four framework mappings were already correct
Checked before editing, as briefed. **Only t3-08 reproduced.**

| | in the record | the build sheet | |
|---|---|---|---|
| t2-08 | `['heartmath','distance']` | heartmath + kross | already correct |
| t3-03 | `['jung','distance']` | jung + kross | already correct |
| t3-10 | `['distance','watts']` | kross + watts | already correct |
| t3-08 | `['porges','distance']` | porges + **heartmath** | **fixed** |

**`kross` in the brief is `distance` in the record.** [[SR-177]] records why the key and the file
differ — `distance` is served by `method-kross.html`. Translated, never renamed, as instructed.

⚠ **t3-10 was flagged as the one that mattered, on the concern that removing `dispenza` would
leave Creative Flow resting on Watts alone — one interpretive framework with no peer-reviewed
support. That does not reproduce, and never could have.** The dispenza correction landed in this
repo as a **rename** ([[SR-118]]), not a deletion, so Kross has been the primary key on t3-10
since that fix. The credibility hole the brief was worried about was closed before the brief was
written.

**t3-08 is the same rename-versus-replacement split [[SR-180]] resolved on t1-10, and it resolves
the other way.** On t1-10 the authored content decided it — the text rested on Porges and Watts
and cited nothing else, so the third key was a false attribution. **t3-08 has no authored
resources at all**, so there is no text to arbitrate and the build sheet is the specification.
Decision Fatigue is a Numb protocol and cardiac coherence is the step-2 framework the sheet puts
under it. **Re-check this against the copy when t3-08 is written** — if the text does not rest on
HeartMath, this becomes the same false attribution in the other direction.

`frameworkReach`: `distance` 4, `heartmath` 8.

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-201 · Twenty labels and twenty states — nothing to do
Briefed as a data fix. **Does not reproduce (Rule 2).** All twenty labels and all twenty states
already match the build sheets exactly, checked before touching anything.

Recorded rather than skipped quietly, because a silent no-op is indistinguishable from an
oversight and the next run will re-raise it. This is the **eighth** briefed item this sequence
that turned out to be already done — see [[SR-180]] for the seventh and the point that a handover
§3 is a claim list, not a work list.

*Status:* no change required · *Raised:* 22 Aug 2026

---

### SR-202 · Where the shared blocks and the delivered diagrams live — report only
**Nothing installed.** Three questions, three answers.

#### 1 · The two shared blocks — and one has already drifted

**Track 03's *What this track works on* is present in both delivered protocols** and is the
straightforward case.

**Track 02's two-instruments block exists in three versions, and they are not the same.**
Measured on the section body, normalised:

| | words | |
|---|---|---|
| `SHARED-t2-two-instruments.md` | 459 | the standalone file |
| inside t2-01 | 525 | |
| inside t2-02 | 525 | |

**t2-01 and t2-02 are byte-identical to each other.** The standalone file matches neither —
similarity **0.43**, diverging by the second sentence (*"assembling"* against *"building"*). The
brief describes the block as *"identical everywhere"* and *"roughly 450 words"*; the shipped
copy is 525 words and the 450-word figure describes the standalone file only.

**So the standalone file is either a rewrite that never reached the protocols, or the protocols
are the newer text and the file is stale. That is a content decision and I have not guessed it.**
What is certain: two of the ten exist, they agree with each other, and a third version is sitting
in the same folder. **The drift the brief warns about has already happened, at n=2.**

**Recommendation: extract to shared data, and do it before the remaining eight are authored.**
- **Extract** — one record, referenced by all ten, exactly as `SHARED.resources` and
  `CHANGE_PROPOSALS` already work in `tracks.js`. Cost: one field, and the eight unwritten
  protocols must be authored to reference it rather than repeat it. Drift becomes structurally
  impossible.
- **Inline** — cost is ten copies of a 525-word block, 5,250 words of duplicated copy, and a
  correction that has to land in ten places. At n=2 it has already failed once.

The decision that must come first is **which of the two versions is canonical.**

#### 2 · The breath cycle exists. Do not build a duplicate.

Confirmed, and it was confirmed once already earlier in this run. **`method-heartmath.html:133`**
carries an inline `<svg class="sr-fw-diagram">`, commented *"the wave, drawn. one breath cycle,
ten seconds, turning at four."* Vector, authored in code, which is what the asset rules require
of it. The brief's *"Unverified — assumed to exist on method pages"* resolves to **it exists**.

#### 3 · The thirty release diagrams and the two-parts diagram

**Delivered and well-formed.** 30 release SVGs at `viewBox="0 0 780 300"`, plus
`img-090-two-parts.svg` at 780×450. Each carries `role="img"` and a `<title>` — accessible
without extra work — and the SAFERISE lockup the brief specifies.

**Nothing in the repo renders them, and the repo currently contains no `.svg` files at all.**
Zero consumers for `img-067`, `img-090`, or any release diagram.

⚠ **They are light-ground artwork and this platform is dark.** Colours across all thirty are
`#1B2A4A` navy (150 uses), `#2E7D6B` green (210), `#B08D57` bronze (60) and light greys
`#dcd9d2` / `#9a958b`. **There is no background rect.** Dropped onto the site's `#08080C` ground,
the navy structure and grey captions go nearly invisible. This needs either a light panel behind
each diagram or a recolour — **a design decision, not a code one, and it should be settled before
they are placed.**

⚠ **The brief's §5 says the release diagrams are delivered "SVG + PNG". Only SVG is present.**
Not a blocker — SVG is the better format here and the brief separately forbids raster for
code-authored diagrams — but the asset table and the folder disagree.

**Where they should live:** `assets/diagrams/`, as files rather than inlined. They are per-protocol
(30 variants of one shape), so inlining them would put ~30 copies of near-identical markup into a
page bundle; as files they cache individually and the protocol page references one by key. The
brief's own `min-width: 600px` inside a horizontally scrolling container is a stylesheet rule for
whatever renders them, and belongs in `saferise-system.css` under an `sr-` class when that lands.

*Status:* open — report delivered, two decisions required · *Raised:* 22 Aug 2026

---


### SR-205 · Recolouring the diagrams — closed as SUPERSEDED, not as done
[[SR-202]] found the delivered diagrams were light-ground artwork with no background rect,
navy and grey on a `#08080C` platform, and reported that they needed a panel or a recolour.
**Neither happened, and the reason is better than either.**

The redelivered set carries **no hardcoded colour at all**. Every value resolves through six
custom properties, each with a fallback. Nothing was recoloured; the diagrams inherit.

**Why that beats the fix this entry asked for.** A recolour produces one dark variant. The
Reader has **three** modes — dark, sepia, light — so a recolour would have had to be redone per
mode, per diagram, thirty-one times over, and redone again the next time a mode was added. The
token approach survives the theme switch because the diagram never holds a colour to begin with.

**The general form, worth keeping:** where a fix would produce one variant per theme, the fix is
usually in the wrong place. Move the decision to the consumer.

Placement and binding are [[SR-209]].

*Status:* closed — superseded by the redelivered set · *Raised:* 22 Aug 2026

---

### SR-206 · Wiring the Reader — seven consumers, three of which mutate at runtime
**Reported and NOT started.** The gate was whether the Reader is the only consumer of
`RESOURCE_CONTENT`. It is not, and it is not close.

**Seven consumers, all in `index.html`.** The Reader is one. The others are the protocol page's
resource cards ([[SR-030]], and **unguarded** — it calls `data.title` with no null check), the
card-title re-sync, `openResourceModal` (a separate surface), a v12 pass that **mutates**
`p2-guide` and `p2-disclosure`, a somatic pass that **mutates** `kind`/`title`/`meta` across a key
set, The Decision, which **creates** entries *and mutates* `READER_PROTOCOLS[pk].keys`, and
`classifyReaderPages`. Plus the founder generator, which creates ten entries at load.

This is Rule 8's warned case: the object is assembled and rewritten across five separate IIFEs at
different points in load order. **Superseding it is not a data swap.**

**The finding that matters most is the name collision — now Rule 22.** Six type names are shared
between the Reader's keys and the authored set, and **two of the six name different resources**.
A key-by-key migration serves the wrong text while every structural check passes.

**The second is that the hardcoded list has already drifted from itself — now Rule 23.** `p1` is
served `advisory` while `META['t1-01'].extras` is `[]`; `p2-crisiscard` exists as data with no key
slot; `p10` carries a one-off `crisis-p10`.

**Also displaced, and no home in the record:** `founder` — *Why I Built This One*, retired
alongside Source Insights and Reference Case, currently served on all ten.

**SCOPED AT FOUR COMMITS, 22 Aug 2026. Andre's answers, and the sequence.**

**The Decision keeps its Reader slot**, and stops mutating a keys array that will not exist.
*What it would take to register as a conditional:* `CONDITIONAL_RESOURCES` maps a display name to
an `extras` flag, and `protocolResources()` filters on it — so registering The Decision means
adding one map entry and one `extras` value per protocol that carries it. **That is small.** What
is not small is that The Decision is not in `SHARED.resources` at all, so it would have to be
added there, which changes every derived count on every surface that reads that array — the
dashboard fold title, the track-page list, the protocol page. **Recommendation: it stays as-is
and the derived set accommodates it** — the derivation appends any protocol-specific Reader entry
after the derived ten rather than requiring it to be in the shared library. One-line
accommodation against a count change that reaches five surfaces.

**The modal and the cards move WITH the Reader.** [[SR-030]]'s intent — cards and Reader read one
object so they can never disagree — survives; only the object changes.

**The sequence, and no intermediate state leaves a surface reading a half-migrated object:**

| | commit | why it is safe to stop here |
|---|---|---|
| 1 | **Additive only.** Add the four new icons to `PT_RES_ICONS`/`PT_RES_GROUPS`, guard `ptResFromContent`, and add the derivation helper — reading `SHARED.resources` + `extras` — without wiring it to anything. | Nothing consumes the helper yet. Every surface still reads the old object, whole. |
| 2 | **Cut over the three read surfaces together** — Reader, modal, cards — to the derived key set and `T1_RESOURCES`. | The only commit where the object changes, and all three consumers change in it. There is no point at which one reads new and another reads old. |
| 3 | **Retire what is displaced.** Remove `founder` and its generator, annotate the 50 superseded literal entries as superseded rather than deleting silently, and remove the `crisis-p10` one-off. | Nothing reads them after 2. |
| 4 | **Re-point the three mutation passes** — the v12 copy pass, the somatic pass, The Decision's registration — at the new keys. | Each is currently a silent no-op against the new set, not a crash, so the page works between 3 and 4; it just does not yet apply those rewrites. |

**The ordering constraint that decides it:** the three mutation passes run *after* the object is
built, so they must be fixed after the object changes, not before — fixing them first points them
at keys that do not exist yet. And the cut-over must be one commit, not three, because the cards
and the Reader are specified to agree.

⚠ **`ptResFromContent` gets its guard in commit 1, ahead of everything.** It calls `data.title`
with no null check, so the protocol page throws on the first missing key rather than degrading.
An unguarded lookup is how a content change takes a page down, and it should be guarded before
any content change is made — not in the same commit as one.

**The six Companion variants displaced by the collapse to one *Somatic Release Activities*,
quoted in full so what is lost is visible:**

- **Sensory Companion** (p3, Overwhelm Threshold) — *"Decluttering one small space, phone-free
  walks, noise-cancelling headphones — daily companions for narrowing the field"*
- **Relational Companion** (p4, Abandonment Wound) — *"A recurring class with the same group,
  volunteering, a consistency journal — daily companions for relational safety"*
- **Creative Companion** (p5, Shame Dissolution) — *"Unshared creative expression, a sharing
  circle, a private story journal — daily companions for reclaiming hidden parts"*
- **Ritual Companion** (p6, Grief Integration) — *"Visiting a meaningful place, a memory box,
  gentle rhythmic movement — daily companions for letting loss move through"*
- **Behavioral Companion** (p8, Jealousy Release) — *"A social-media boundary day, a skills-based
  class, a 'good for them' practice — daily companions for steady footing"*
- **Evidence Companion** (p9, Insecurity Anchor) — *"A wins log, a values card deck, one
  meaningful self-made object — daily companions for an internal floor of worth"*

Each is protocol-specific and none survives the collapse. The consolidation is deliberate in the
authored set; this is the record of what it costs.

*Status:* open — scoped at four commits, not started · *Raised:* 22 Aug 2026

---

### SR-207 · Track 02's authored content enters the record
91 of 91 into `content/t2-resources.js`, extending the file [[SR-203]] created. Counts
9, 9, 10, 10, 9, 9, 8, 8, 10, 9 — the build sheet exactly, totalling 91. 1,471 body blocks,
397 cues.

**Shape asserted independently of content**, which is the [[SR-192]] lesson: four cue-card line
blocks on all ten, and the *Before you start* suggestion line on exactly t2-08 and t2-10, the two
Numb protocols, and nowhere else. Fidelity checked per protocol — zero words in the output absent
from the source.

**`sharedRefs` is a new structure, deliberately not a body string.** `{block: N, ref: 'twoParts'}`
says `T2_SHARED.twoParts` belongs at index N and the body does not contain it. Ten protocols, one
record.

⚠ **The handover's §1 calls `SHARED-t2-two-instruments.md` the "canonical source". It is not**, and
this was re-checked against the new bundle rather than assumed from [[SR-203]]: the file is still
the stale expository version, 472 words against the shipped 538, similarity **0.44**. The shipped
block is unchanged between bundles — the new t2-01 and t2-02 inline copies are byte-identical to
each other and match SR-203's extraction once the cue marker and trailing separator are accounted
for. **SR-203's ruling stands; the handover's label is wrong.**

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-208 · All ten protocols reference the shared block, and the constraint becomes structural
t2-01 and t2-02 held the block inline; the other eight carried the marker. All ten now reference.

**The measurable result is the `ego` constraint.** Before: **3** occurrences across Track 02 data —
one in `T2_SHARED`, one in each inline copy. After: **1**, inside `T2_SHARED`, zero anywhere else.

**This is the argument for extraction, and it is stronger than the maintenance argument.** The
maintenance case is that ten copies drift and one record does not. The real case is that a
constraint enforced by structure is not a constraint anyone has to remember. There is one copy of
*"that's just your ego talking"* in the codebase, so it **cannot** appear in a heading, in
navigation, in metadata or in a second resource — not because a check would catch it, but because
there is nothing to copy from. A rule that cannot be broken needs no reviewer.

Body blocks 1,507 → 1,471; the 36 removed are the two 18-block inline copies, and nothing is lost.

⚠ **The transform was not idempotent and doubled the file on its second run.** The splice took
everything up to `if (typeof module` as the shared prefix, which swept in the previous run's
`T2_RESOURCES`. The boundary is now the declaration's own terminator and idempotence is asserted —
two consecutive runs produce identical byte counts. **A generator that is not idempotent corrupts
the moment anyone re-runs it**, and it will look like a content explosion rather than a tooling
bug.

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-209 · The diagrams are placed and inherit the platform's tokens
31 SVGs into `assets/diagrams/`, as files. Files rather than inline because they are thirty
per-protocol variants of one shape; inlining puts thirty near-identical copies in a page bundle.

**Placement is by ANCHOR TEXT, never by block index.** An index is a position, and positions move
the moment a paragraph is added — the same defect class as keying a resource by its number
([[SR-206]]). Ten Release anchors found, ten placed; the two-parts diagram resolves inside the
shared block. All 11 referenced files verified present on disk.

**`alt` is the SVG's own `<title>`, transcribed.** Alt text is authored copy and this run wrote
none; reusing the title the diagram already carries is transcription, and it is what a screen
reader would receive from the SVG regardless.

**Verified by resolving the token chain, not by rendering** — no browser is available (see the
sixth measurement artifact), so this is a static resolution check and is labelled as one. Every
token the 31 SVGs use is bound on the dark scope; the light mode restates all five inverting
tokens; sepia overrides the one it needs; every `var()` carries a fallback, so a diagram opened
standalone still renders.

**Both invariants the spec forbids touching are asserted rather than assumed.** Fills use
`--sr-ink`, the same token as strokes — ten uses on the two-parts diagram — so the gate dot
inverts with everything else. `--sr-surface` and the `--sr-bg` enclosure rect both default to
transparent.

⚠ **`--sr-accent` is the one token with no platform equivalent.** It is the diagram's second
structural colour. The platform's only comparable value is `--sr-track03`, which is Track 03's
identity colour — using it would borrow a semantic that does not apply. The values set are the
diagram author's own verified pair from the theming spec, flagged in the CSS for replacement.

Cormorant Garamond confirmed loaded on every page that renders a diagram, so the lockup does not
fall back to Georgia and stop reading as a mark.

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-210 · The awareness-moves placement spec — report only
**Nothing implemented.** `SHARED-awareness-moves.md` is a placement specification for additions to
the **meditation scripts**, which is resource content this run is barred from writing.

**Its own title is stale.** It reads *"The two awareness moves"* and defines **five** lettered
moves — A through E — with E splitting into E1, E1b and E2. Counting placements rather than
letters gives the six the brief refers to.

| | where it goes | what it does |
|---|---|---|
| A · out of the grip | Recognition, **after** the naming | separates the person from the state while still inside it |
| B · attention by choice | Rise, replacing or preceding the forward scene | names what awareness is for |
| C · the question underneath | Release, **after** *what was this for* | past what the state did, toward what it was built on |
| D · the decision | — | four rules, exclusions listed |
| E1 · forgiveness | closes Release | **travels with C — a protocol carrying C without E1 is unfinished** |
| E2 · gratitude and release | closes Rise | near-universal, reworded per protocol |

**What honouring it would take is not a rendering change.** The moves are script text placed at
named points inside the four steps, per protocol, with a table of eleven placements and **three
refusals**. The refusals carry more weight than the placements and are the reason this cannot be
applied mechanically:

- **Grief** — there is no forward version of the person to move attention toward, and offering one
  says the loss should be got past.
- **Shutdown** — the faculty being asked for is the one that has reduced.
- **Powerlessness** — telling someone whose situation genuinely cannot be moved that attention is
  a choice is the cruellest available version of the idea.

It also carries hard vocabulary exclusions in two registers: *higher self, true self, witness,
observer consciousness, ego death* on Move A, and *attract, draw in, create your reality, call it
in, align with, abundance, deserve it, the universe* on Move B — with the stated line that
rehearsing **doing the work** is supported and rehearsing **having the thing** is not, because
crossing it is manifestation with the vocabulary changed.

**Assessment: this is authoring work, not build work.** The build's only obligation is that
nothing in the data model prevents a meditation script carrying extra blocks at named points —
and nothing does; `body` is an ordered array and `cues` already anchor to indices.

*Status:* **blocked on a DECISION, not on a file** — `SHARED-awareness-moves.md` was located
at `~/Desktop/SafeRise-Track02-Complete/content/`, so [[SR-245]]'s "cannot install what I do not
have" no longer applies. Not installed: the reasoning stands that a `.md` nothing loads changes
no rendered pixel, and one of SR-221's three relabels still needs a content decision.
· *Raised:* 22 Aug 2026 · *Re-scoped:* 23 Aug 2026

---

### SR-211 · t2-09's safety gates — four, not three, and never identical
Asserted, and **two premises corrected**.

**There are four gate-bearing resources, not three.** The handover names Safe Practice, the
Proximity Guide and Resource 10. **Invitation to Repair carries one too.** All four verified
present.

**They are not identical passages, and could not have been deduplicated.** The concern was that a
transform might collapse three repeated passages into one. Pairwise similarity across the four is
**0.05 to 0.09** — they are written fresh per resource, exactly as the earlier brief specified for
this gate. The risk being guarded against was not available to occur.

**The assertion was rewritten because the first one was wrong.** It searched for a single quoted
string from the handover's §6 and found it once, in the Proximity Guide only — which would have
read as two missing gates. The gates share a **concept**, not a wording, so the assertion now
tests for the safety markers each passage must carry (*being controlled, monitored, made afraid,
not the resource for that*) rather than for a shared sentence. **An assertion keyed to a wording
fails on content that was specified to vary.**

All four are inline: no `<details>` or `<summary>` wrapper on any of them, so none sits behind a
disclosure.

*Status:* verified · *Raised:* 22 Aug 2026

---


### SR-216 · The SR-098 patch — one live change out of six claims
Checked against the tree first, as instructed. **The patch's central premise is false here.**

It is written as a **register-band correction**: `dispenza` occupying the `kross` slot as
*interpretive* with `var(--teal)`, and `kross` absent. The registry actually holds **`distance`** —
register **peer-reviewed**, `var(--gold)`, step 4, page `method-kross.html`. **The band correction
the patch calls its main substance was done under [[SR-118]]/[[SR-119]]/[[SR-132]].** Only the key
NAME differs, and [[SR-177]] records that divergence deliberately.

All six framework mappings **already hold** once `kross` reads as `distance`. Both traps check
out: t3-10 never lost kross, because this repo renamed rather than dropped; and the protocol count
citing it is **4**, matching the patch's own *"verification count is five, not six"*. The twenty
extras landed under [[SR-198]]; t1-04's label was already `Repair`.

**The build notes do not reproduce.** They sit above the first resource heading, so the transform
never collected them — zero `dispenza` in either generated content file.

**The one live change: t3-06 → The Belonging Gap.** Title, label `Stand`, state `unsteady`,
frameworks `['porges','jung']`, extras `['advisory']` — from the handover and corroborated by the
delivered content file's own header.

⚠ **The TRACKS row's promise, signature and three quotes still describe Ambition Recovery** —
*"I hit the goal and felt nothing"*. The bundle supplies no replacement and writing one would be
authoring member-facing copy. Unchanged, flagged in place.

⚠ **`CLAUDE.md` forbids renaming protocols.** This is an owner decision stated in the master
handover, not drift — but the conflict is real and recorded rather than glossed.

**Track 03 now has TWO Numb protocols, not three** — t3-08 and t3-09. Any count assuming three is
wrong.

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-221 · The t3-06 rename is incomplete, and one residue may not transfer
**Report only, nothing edited.** `content/shared/SHARED-awareness-moves.md` is **partially**
updated: a newer table at **:382** already reads *"t3-06 Belonging Gap"*, while two older ones
still read *"t3-06 Ambition Recovery"*.

**:132 and :194 are placement-table rows.** The tables key by **ID first, name second** —
`t1-01 Anxiety`, `t3-03 Imposter` — so the ID is the key and the name is a human label. **The
label is safe to update.** Whether the *decision* transfers is the open question: the placement
was reasoned about Ambition Recovery's content, and t3-06 is now a different protocol wearing the
same ID.

**:82 is different and probably does NOT transfer.** It is a productivity-framing warning: Move B
*"is one step from productivity framing. On t3-10 Creative Flow and t3-06 Ambition Recovery it
must stay on the person doing the work and never touch what the work produces."* That risk is
about **achievement and output**. The Belonging Gap is about **whether to stay in the room** — a
social question, not an achievement one. The warning was written for a protocol that no longer
exists at this ID. **Deleting it and re-deciding is the honest move; carrying it forward silently
is not.**

⚠ **`t3-06-SWAP-SPEC.md` is cited by the patch and is NOT in the bundle.** Confirmed absent. The
patch's §112 carries some of it inline — the new name, the label, and that Ambition Recovery is
**withdrawn from Track 03 and re-scoped for the Elevation Series** — but the spec itself has not
been seen by this run.

*Status:* open — three residues, one needing a content decision · *Raised:* 22 Aug 2026

---

### SR-224 · Track 03's images, minus the band — and the replacement that does not exist
Four of five installed: hero, cost, range, change, each measuring **exactly** its stated size.
Track 03's art entries gain `src`, and [[SR-214]]'s note is corrected — it claimed all five were
unproduced, which is now false for four.

⚠ **The band is not installed, and the ratio conflict is real.** `t3-band.jpg` measures
**1400×583 (2.401:1)** against t1 and t2 at **1400×380 (3.684:1)**, with `saferise-track.js`
declaring `'1400/380'`. Installing it would letterbox or crop it against its two siblings. Nothing
cropped, nothing regenerated, layout untouched; the slot keeps no `src`, so it renders its
placeholder and issues no request (Rule 24). **A third candidate exists** — `t3/band.jpg` at
1907×825 (2.312:1) — in no slot list and matching neither sibling.

⚠ **The t2 range replacement does not exist.** No 2048-wide image is present anywhere on the
Desktop or in Downloads. **And the defect it was meant to resolve is on `t1/range.jpg`, not t2:**
t1's corners measure L≈0.92, t2's 0.008–0.034. [[SR-222]] named t1; the instruction named t2.
Both facts reported; nothing installed for that slot.

**Source located after checking both places**, per the standing instruction — **three identical
copies** exist: `~/Desktop/assets`, `~/Desktop/assets 2` and `~/Downloads/assets`.

**Hero scrim, measured against its own pixels.** Track 03's is much the brightest of the three —
h1 mean **0.314** against t1's 0.097 and t2's 0.046, which is the bright detailed left half
originally attributed to t1.

| | h1 | pull | body |
|---|---|---|---|
| before | 1.11:1 | 1.49:1 | 1.44:1 |
| after | **5.76:1** | 12.34:1 | 11.31:1 |

Two candidates tested; the lighter taken, matching the t1/t2 band rather than over-darkening.

**Frames opened.** `cost` and `range` are dark and on-brief. `change` and `hero` are not — both are
recorded in [[SR-222]], and `hero`'s text and logo are a prohibition breach rather than a taste
question. `t3/range.jpg` is also a **healthcare worker in scrubs** where the rest of Track 03 is
corporate — a family-coherence note, not a defect.

*Status:* fixed for four slots; band and t2 replacement open · *Raised:* 22 Aug 2026

---

### SR-226 · t3-06's track row still carries Ambition Recovery's copy
[[SR-216]] renamed t3-06 to **The Belonging Gap** and moved its label, state, frameworks and
extras. The TRACKS row's **promise, signature and three quotes did not move**, because the bundle
supplies no replacement and writing one would be authoring member-facing copy.

The row now reads *The Belonging Gap Protocol* above *"Find what you actually want, under what you
were taught to want"* and quotes including *"I hit the goal and felt nothing"*. **A protocol titled
The Belonging Gap describing an achievement problem is a visible contradiction on a live page**,
not an internal inconsistency.

Blocked on the content lane. Four strings: promise, signature, and three quotes.

**CLOSED, 24 Aug 2026 — [[SR-258]] supplied the four strings and they are live.** Verified against
`content/tracks.js`, not against the entry that claimed to have written them:

| slot | renders |
|---|---|
| promise | *Say the thing in the room you were going to keep to yourself.* |
| signature | *The sentence edited before it leaves. Reading the room for whether you count in it.* |
| quote 1 | *I revise it before I say it* |
| quote 2 | *I do not know if I belong in this room* |
| quote 3 | *I say the safe version and then resent it* |

All five match SR-258's intended values exactly. No occurrence of *"I hit the goal and felt
nothing"* or *"Find what you actually want"* survives in the row. The label is `Stand`, the name is
*The Belonging Gap Protocol*.

**One residue removed with the closure.** The `SR-216` comment immediately above the row still read
*"The promise, signature and quotes BELOW still describe Ambition Recovery and are deliberately
unchanged"* — true when written, false since SR-258, and positioned where the next reader would
trust it over the strings themselves. Rewritten rather than annotated, per Rule 21. **A caveat that
outlives its condition is the same defect class as a stale `alt`** ([[SR-256]], Rule 26): a second
copy of a fact that did not regenerate when the fact changed.

*Status:* closed — resolved by [[SR-258]] · *Raised:* 22 Aug 2026 · *Closed:* 24 Aug 2026

---

---

### SR-261 · The hero photograph rendered on no track page, and nothing looked broken
`js/saferise-track.js` injected `--sr-hero-img:url(assets/t1/hero.jpg)` into an inline `style`
attribute. **A relative `url()` inside a custom property is resolved against the STYLESHEET that
consumes it, not the document that declared it.** The consumer is
`css/saferise-system.css:2965`, so the browser fetched **`/css/assets/t1/hero.jpg` — 404, five
per page load, on all three track pages.**

**It survived because the fallback is good.** `.sr-tp-hero--photo` layers the photograph over
`linear-gradient(135deg,#17131b,#4a3a24,#8a7148)`, and the `<img>` sibling is `display:none` at
desktop — so a missing photograph renders as a *designed* brown panel rather than a broken one.
**A well-built fallback hides the failure it exists for.** Nothing in the page looked wrong; only
the network log knew. Check the network panel on any surface with a designed fallback.

**Fixed by resolving against `document.baseURI` at the injection point, not by adding a leading
slash** — a leading slash asserts the site is served from the domain root, which it need not be.
**The record stays relative**: `hero.src` is untouched, and the `<img>` and `slot()` consumers
that already resolved correctly are unaffected. One injection site, one consumer, one change.

**Verified by FETCHING the resolved URL, not by looking at the page** — the point of the defect is
that the page looked fine either way:

| track | resolved URL | status | bytes |
|---|---|---|---|
| 01 | `/assets/t1/hero.jpg` | **200** | 675,192 |
| 02 | `/assets/t2/hero.jpg` | **200** | 400,280 |
| 03 | `/assets/t3/hero.jpg` | **200** | 686,259 |

Byte counts match the files on disk. `performance.getEntriesByType('resource')` reports **0**
requests under `/css/assets/` where there were five. Clean console.

*Status:* complete on merge · *Raised and fixed:* 23 Aug 2026

---

### SR-259 · Three `assets 3` replacements installed — recommendation overridden, and recorded
Installed in place, same paths and filenames, no suffixes and no `-old` copies:
`assets/shared/four-steps.jpg` (1600×500), `assets/t1/cost.jpg` and `assets/t1/change.jpg`
(1600×700). `assets 3/journey/t1-band.jpg` **remains excluded** at 1400×583 against a correct
1400×380 sibling (Rule 27).

**Andre's call, made with the assessment in front of him. The recommendation is set aside, not
overruled, and is kept so it survives:**
- **four-steps** — near-identical frame; only a less blown-out window. Marginal alone.
- **cost** — nails *"three in the morning"* literally (a clock reading 3:17) and adds a
  relational note, but drifts **further** from the brief's *"same room"* by introducing a train.
- **change** — neither file matches *"one person moving easily through an ordinary day at home"*.
  Installed was a man with a luxury car; the replacement is a man with a motorcycle at golden
  hour — **more** aspirational-lifestyle, not less. Recommendation was to install neither and
  re-brief.

Verified at render: all four slots 200, each rendering at **exactly** its natural ratio
(2.2857 / 2.6667 / 2.2857 / 3.2000) so nothing is distorted, each inside its container.
four-steps' improvement is real at render, canvas-sampled from the decoded image: brightest
corner **0.458 → 0.2456**.

**`t1/change.jpg` joins [[SR-222]]'s grouping — seven of fifteen frames now drift the same way,
plus one replacement that drifted further.** That ratio is the finding. It is a **lane-level
question about register**, not a list of bad images: the briefs ask for ordinary domestic
specificity and the lane keeps returning aspirational lifestyle stock. Re-briefing one file will
not change the next one.

*Status:* complete on merge · *Raised and fixed:* 23 Aug 2026

---

### SR-260 · The missing scrim — DOES NOT REPRODUCE, and the error was mine
**Briefed premise: the six-area text sits directly on `change.jpg` for the top 464px with nothing
between. Measured: it does not.** The section is **stacked, not overlaid**.

| | |
|---|---|
| photo block | y 0 → 466 |
| text column | y 466 → 1286 |
| **vertical overlap** | **0px** |
| first text element | starts at y 513 |
| elements over the photograph | **0 of 7** |

**The error was in my own earlier report and I am correcting it, not the tree.** I claimed
`innerOverlapsImage: true` from a test that compared only `left`/`right` — horizontal overlap on
two stacked blocks is trivially true and says nothing. **An overlap test must check both axes.**

**`.sr-tp-sixbg` and `.sr-tp-sixscrim` are INERT, not missing** (Rule 14). They were written for
an overlaid design — full-bleed background image, scrim, 70% text column over it — that the
renderer never built: `slot()` emits a `.sr-tp-ph` block with `aspect-ratio`, which stacks. Adding
the scrim as briefed would darken a photograph that has **no text on it**, achieving nothing.

**The overlay layout and the scrim are ONE piece of work, not two.** Handoff 04's "six areas
inside the image, 80–85% left overlay" is precisely the design those inert rules were written
for. Build the overlay and measure the scrim in the same pass; a scrim added first has nothing to
protect.

⚠ **A REAL CONTRAST FAILURE WAS FOUND, on plain background, unrelated to any photograph.**
`.sr-tp-sixfrom` — the italic *"from loops, fog & paralysis"* line — is `var(--text3)`
`rgb(106,104,116)` on `rgb(14,14,26)`: **3.51:1, against 4.5:1 required.** At 15px (12.5px below
760px) it does not qualify for the large-text exemption. Every other role passes: label 8.65,
area titles 5.85–8.65, body 12.95.

**`--text3` has 50 uses in the system stylesheet**, so this is a token-level question, not one
element. Reported, not fixed — changing a token that 50 rules consume is its own pass.

*Status:* premise withdrawn; one real defect raised · *Raised:* 23 Aug 2026

---

### SR-257 · The Track 01 range image — the "white ground" was a checkerboard baked into a JPEG
[[SR-242]] measured corners at L≈0.92 and called it a white ground. **Rendered, it is a
transparency checkerboard**: three photographs laid out as angled cards over a light chequered
field, exported to JPEG with the checker pattern baked in as image data. That is why every corner
read near-white and why no amount of scrim would have helped.

`assets 3/t1/range.jpg` is the same three states — braced, settled, absent, matching the record's
own brief — composed edge-to-edge at the same 1600×600. Worst corner **L 0.9283 → 0.0619**, from
**371:1** against the page ground to **25:1**, inside its siblings' range (t2 0.0275, t3 0.0149).
Confirmed by canvas-sampling the decoded image in the browser, not only the file on disk.

**[[SR-242]]'s instruction to pull the `src` is WITHDRAWN.** It was correct while no replacement
existed and is wrong now that one does. The record was never edited, so nothing had to be undone.

*Status:* complete on merge · *Raised and fixed:* 23 Aug 2026

---

### SR-258 · t3-06's card strings follow the protocol, a rename late
The four card strings were Ambition Recovery's and stayed behind when [[SR-216]] renamed t3-06.
Supplied by Andre, applied verbatim, with the reasoning recorded **beside the strings in
`content/tracks.js`** so a future run does not "improve" them back toward achievement framing:

> **Belonging is a KIND verdict with a PROSPECTIVE loop** — the pre-speech self-edit — where
> Imposter Dissolution is a **COMPETENCE verdict with a RETROSPECTIVE** one. The promise is
> behavioural rather than introspective because the state is **Unsteady** and **Porges** is in the
> mapping, so the win is being able to speak, not understanding why you could not. One quote
> deliberately echoes Track 02's Safe Conversation because the mechanism is related; **the
> resentment tail is what makes it Track 03.**

Retired, and now present nowhere in any served file: *"I hit the goal and felt nothing"*, *"I do
not know if I want this"*, *"I am chasing something I never chose"*, and the old promise and
signature. They survive here only as evidence (Rule 21).

Zero Track 03 banned-vocabulary hits across all six new strings — swept against *productivity,
optimise, performance target, output, efficiency, high performer, peak, elite, edge*.

⚠ **Two things at this ID are NOT resolved and are not card copy.**
- **t3-06's Release heading still reads *"Why Release goes after the editing"*** (block 13 of
  `t3p6-guide`) while its diagram now shows flatness and reproaching. Resource content; content
  lane. Quoted here verbatim so it can be commissioned.
- **[[SR-240]] cannot move on these strings.** Measured: `index.html`'s `proto-landing-desc` and
  `tracks.js`'s promise are **two independent sets of copy — 0 of 20 identical, all 16 comparable
  pairs different**. The homepage needs its own advisory sentence for The Belonging Gap, in its own
  longer register. Renaming the nine mechanical labels while that line still reads *"recover
  momentum when ambition has gone flat"* would put [[SR-226]]'s contradiction on the marketing
  homepage.

*Status:* card copy complete on merge; resource copy open · *Raised and fixed:* 23 Aug 2026

---

### SR-253 · The inventory derives; `SHARED.resources` becomes presentation only
`SHARED.resources` was **both** the inventory and the presentation table, and being both is how
`raising` went missing from three shipping surfaces while Track 03 shipped it on all ten
protocols. **Track 03 has ELEVEN resource types; Tracks 01 and 02 have ten. There is no single
library size across the three** — any surface stating one must resolve per track.

`content/inventory.js` is **generated** from the authored files by `tools/build-inventory.py`.
Checked in rather than derived at runtime: the authored files total ~913 KB of resource bodies
and no page should load them to learn a type list. **The generator refuses an unknown type**
rather than accepting it silently, so `RESOURCE_ORDER` is extended deliberately.

**Standing invariant — one command, prints PASS or exits 1:**

```
python3 tools/build-inventory.py --check
```

Expected: `inventory OK — tracks {1: 10, 2: 10, 3: 11}, library 276 pages`. Re-run it whenever
the authored files are regenerated. **Drift is now loud**: a type in the inventory with no
presentation row renders nothing and is visible, where the old shape under-reported in silence.

**No track-agnostic surface states a library size — and this was settled by measurement, not by
decision.**  Checked: `index.html`, `method.html` and
`getting-help.html` carry no such numeral, and the dashboard rail always has a selection
(track 1 by default). The question of what to say with no track selected **does not arise on any
existing surface** — record this before inventing a phrasing for it.

⚠ **`raising`'s DESCRIPTION IS EMPTY and needs one string from the content lane.** Its subtitle
is the authored `sub`, identical on all ten Track 03 protocols and matching the pattern six other
types follow verbatim, so nothing was authored here. The card renders without the paragraph
rather than with a placeholder.

*Status:* complete on merge · *Raised and fixed:* 23 Aug 2026

---

### SR-256 · The t3-05 Release diagram places — 30 of 30, and one alt was describing the wrong picture
**The asset existed and was already correct.** `img-067-release-t3-05.svg` carries *"The nerves /
they turned up on their own"* against *"Monitoring yourself / it splits your attention"* — t3-05's
own split, not the generic situation-versus-loop shape. **All thirty are per-protocol variants.**
[[SR-244]]'s conclusion stands on its own terms — there is no equivalent *anchor text* — but the
missing thing was the block index, not the diagram.

**Placed at block 5, not block 6, and the convention was measured rather than assumed.** All 29
existing placements land on the **`Why Release…` HEADING block, 29 of 29 with no exception.**
t3-05's equivalent heading is block 5, *"Why the split is the actual problem"*; block 6 is the
paragraph naming the split and block 7 develops the cost. **A stored index that is not a heading
is a defect** — that is the check to run after any block edit.

⚠ **Found by the regression sweep, unbriefed: t3-06's stored `alt` described a different
diagram.** It read *"The room and The editing"* while the SVG shows *"The flatness and
Reproaching yourself"* — the file was regenerated when t3-06 became The Belonging Gap and the alt
was not. **A screen reader was being given a description of a picture that is not on the page.**
Corrected by transcribing the SVG title, which is mechanical application of [[SR-209]]'s existing
rule, not authoring.

**The surrounding guide text still belongs to the old protocol**: t3-06's heading still reads
*"Why Release goes after the editing"* while its diagram now shows flatness and reproaching.
[[SR-226]]'s content-lane work, untouched.

Two checks worth keeping, both one command: every placement lands on a heading, and every `alt`
equals its SVG's `<title>` exactly. Both now pass 30 of 30.

*Status:* complete on merge · *Raised and fixed:* 23 Aug 2026

---

### SR-254 · The replacement Track 03 band is the same file at a new size — BLOCKED, unchanged
**Measured first, installed nothing.** Four candidates found across Desktop and Downloads, and
**not one is 1400×380**:

| source | pixels | ratio | format |
|---|---|---|---|
| `Downloads/saferise-t3-sections_1.zip` (newest) | **1400×583** | 2.4014 | JPEG |
| `Downloads/saferise-t3-sections.zip` | **1400×583** | 2.4014 | JPEG |
| `Desktop/saferise-t3-sections.zip` | **1400×583** | 2.4014 | JPEG |
| `Desktop/band.jpeg` | 1941×810 | 2.3963 | **PNG** |
| `Desktop/T3 landing images/band.jpg` | 1907×825 | 2.3115 | **PNG** |

The slot declares `1400/380` = 3.6842 and both installed siblings are 1400×380. **All three zips
are the previously blocked dimensions exactly.** The two loose Desktop files are the same ratio
class re-rendered larger, and **both are PNG data behind a `.jpg`/`.jpeg` extension** at ~1.7 MB
against siblings at 174–192 KB.

**Stop condition met. Not cropped, slot not changed, nothing installed.** [[SR-243]]'s
recommendation is unchanged: reissue the Track 03 band at **1400×380**. Vertical crop is the
safer axis — the brief is *"corridor moments before the room, desk log, reading at day's end"*,
three moments across the width.

*Status:* blocked — awaiting a 1400×380 render · *Raised:* 23 Aug 2026

---

### SR-247 · The resource guidance audio — installed, recorded, wired
Ten mastered mp3s in `assets/audio/guidance/`, served static. `master-guidance.sh` is the
mastering chain and is **not** a repo file; it is not installed. Source was
`~/Downloads/Mastered Resource Guidance.zip` — **spaces, not underscores as briefed, the fourth
source-name discrepancy in a row.** Copied, never moved; md5 verified per file after copy.

All ten: mono, 44.1 kHz, 128 kbps, 41.7–53.0 s, 653–829 KB. **Head silence 313.1 ms on every
file, tail 325–354 ms, against a 300 ms spec** — the head excess is 578 samples of MP3 decoder
delay and the tail excess is frame quantisation at 26.1 ms per frame, so the authored pad is
exactly 300 on both edges. Nothing clips.

**⚠ −19.4 LUFS against a briefed −16 IS NOT A DEFECT. Do not "fix" it.** `master-guidance.sh`
states the reasoning in its own comment: *"-19 LUFS for MONO. The -16 figure is the STEREO
target; a mono file played through both channels lands ~3 LU hotter."* Measured −19.35 to
−19.49, spread 0.13 LU; true peak −1.30 to −1.52 dBTP, all inside the −1.0 ceiling. A future
check against −16 would read a 3.4 LU miss that is not there. **If the meditations settle on a
different target, both sets move together or levels jump when a member crosses between them.**

**The loudness probe was validated before any reading was trusted.** No ffmpeg, ffprobe, sox or
mediainfo on this machine, so BS.1770-4 was implemented in pure Python and checked against
synthetic controls first: **0.00 dB** at two levels, sensitivity exactly 6.02 dB. The first
fixture read 0.70 dB "wrong" and **the fixture was the error, not the probe** — the K-weighting
chain measures **+0.700 dB at 1 kHz**, and the curve is textbook (+4.0 dB shelf, −2.9 dB at
60 Hz). Rule 16 applies to the tester's own expectations, not only to briefs.

**`.scrub` was REMOVED, not hidden, and the reasoning generalises.** It carried a progress rail
and a `#dur` span. [[SR-080]] left `#dur` empty with the note that it would *"fill from the media
once the real audio exists"*. The audio exists now and the decision is that no duration renders
— so **a hidden element waiting to be filled is how a forbidden thing comes back**. Delete the
element, not the value.

**Not autoplaying is structural.** One `Audio` object created once and reused as the rail moves,
`preload="none"`, no autoplay attribute, `.play()` reachable only from the click handler.
Changing resource stops playback and clears the source — arriving on a new resource with a voice
still running is autoplay by another route.

**⚠ TWO MAPPINGS ARE INFERENCES, NOT CORRESPONDENCES — Rule 22 applies to both.**
- **`fourline` → `crisiscard`** is inferred from the Cue Card record text naming *"the four-line
  version"*. It is not a verified identity. Check it against the content before relying on it.
- **`decision` has NO counterpart among the authored eleven.** *The Decision* exists only in
  `resource.html`'s prototype array. It renders no control, which is correct today, but whether
  it should have guidance at all is unanswered.

*Status:* complete on merge · *Raised and fixed:* 23 Aug 2026

---

### SR-248 · The synthetic-voice disclosure — CLOSED, NOT APPLICABLE
Recorded rather than deleted, because the reasoning is the reusable part.

**Andre never claimed his own voice for resource guidance, so there is nothing to disclose.** A
disclosure exists to correct an impression the product created; where no claim of a human voice
was made, a synthetic-voice line answers a question nobody was led to ask. The deployment doc
listing it as a go-live requirement was written against an assumption that does not hold here.

**The guided meditations are a different case and this closure does not extend to them.** There
the founder's own voice **is** the claim — it is part of what is being sold — so a synthetic
stand-in there would be a substitution a member would want to know about. **Do not read this
entry as settling the meditations.** See [[SR-251]].

*Status:* closed — not applicable · *Raised:* 23 Aug 2026 · *Closed:* 23 Aug 2026

---

### SR-249 · The library is 276, and the arithmetic hid a real defect
**Third counting discrepancy on this project, third real defect.** Recorded because the pattern
is now the finding: on this codebase a count that does not reconcile has never once been a
rounding error.

Counted from the record, not the document:

| | `tracks.js` | authored content |
|---|---|---|
| resource types | **10** | **11** |
| `Raising It` | **absent** | 10, Track 03 only |
| library total | **266** | **276** |
| meditations | 30 | 30 |
| guidance-bearing | 236 | **246** |

`tracks.js` derives 12×8 + 10×9 + 8×10 = **266**. The authored files hold 90 + 91 + 95 = **276**.

**The briefed figures were each off by one** — 31 meditations (there are 30, one per protocol)
and 247 guidance pages (there are 246), inflating the total to 278. There are no "two
unaccounted pages"; the library is 276 and always was.

**The whole 10-page gap is one resource type**, and that is [[SR-253]].

*Status:* resolved — count established · *Raised and resolved:* 23 Aug 2026

---

### SR-250 · The expert contribution claim is removed, not recounted
Ten instances of *"Contributes insight to N protocols"* in `index.html`: five derived from `META`
via `frameworkReach()` (porges, heartmath, mate, jung, watts) and five hardcoded on cards with no
`FRAMEWORKS` key. **A factual claim about a named person that had to be maintained every time a
protocol moved, and it had already been wrong once.**

**The eleventh `.expert-contrib-label` survives deliberately** — Dr Kenny Bastien's reads
*"Foundational — physical wellness, body optimization & lifestyle structure"*, which is a
description, not a count. A sweep that removes it is measuring the selector, not the claim.

**The `+N more` overflow went with it, and removing only the label would have been worse than
removing neither.** `data-sr-reach` lives **on the label**, so deleting the label alone leaves
`querySelectorAll('[data-sr-reach]')` matching nothing — and the five stale markup literals
**+15, +15, +9, +9, +4** would then render uncorrected. Those are precisely the hand-tallied
figures [[SR-066]] existed to stop. The script was the only thing holding them right.

[[SR-066]]'s derivation script is removed whole rather than left inert for a future run to
re-analyse. The curated pills stay as an unquantified sample — **38 still render**, and they still
name protocols, including *Ambition Recovery* at what was `index.html:8402`, which remains
[[SR-240]]'s open item.

**⚠ `frameworkReach()` in `content/tracks.js` NOW HAS NO CONSUMER.** Its only remaining
references are its own definition and its export. **Reported as dead code and deliberately NOT
deleted**, per the standing instruction.

Verified with the About overlay **open**, not at rest — these cards sit inside `.prog-overlay`,
`display:none` until shown, so an `innerText` assertion on the page at rest is a false pass
(Rule 18).

*Status:* complete on merge · *Raised and fixed:* 23 Aug 2026

---

### SR-227 · CLAUDE.md forbids renaming protocols, and SR-216 renamed one
Recorded so the rule and its exception are both on the record.

`CLAUDE.md` states, under a CRITICAL heading: *"PRESERVE every ORIGINAL protocol title exactly as
it currently exists… DO NOT rename protocols."* [[SR-216]] renamed t3-06 from *The Ambition
Recovery Protocol* to *The Belonging Gap Protocol*.

**This is an owner decision, not drift.** It is stated in the master handover, repeated in the
instruction, and corroborated by the delivered content file's own header. The patch records that
Ambition Recovery is **withdrawn from Track 03 and re-scoped for the Elevation Series**, so the
title did not change — the protocol did.

**The rule's purpose is intact.** It exists to stop a build inventing, shortening or substituting
titles from a reference image. An owner replacing a protocol is a different act. The rule should
probably say so, since as written it forbids this and a future run reading it literally would
revert a deliberate decision.

*Status:* open — recorded; CLAUDE.md may want an explicit exception clause · *Raised:* 22 Aug 2026

---

### SR-222 · Six of fifteen delivered frames read as lifestyle stock, not the briefed register
**Grouped deliberately.** These arrived as three separate observations and are recorded as one,
because the question is not whether three files are wrong. It is **whether the image lane has the
register the briefs specify.** Three separate notes invite three separate re-shoots; one note asks
the question that actually decides it.

**1 · `assets/t1/range.jpg` is built for a light surface.** Three tilted photo cards composited on
white. Corners measure **L≈0.92** against a page ground of **L=0.004**. It will render as a
glaring rectangle. **Not a crop or a ratio fault** — no build-side change fixes it, and a recolour
or a knockout is image work. Installed as delivered, unmodified.

**2 · `assets/t1/change.jpg` is not its brief.** Brief: *"one person moving easily through an
ordinary day at home."* Delivered: a man leaning on a **luxury car** outside an architectural
villa at golden hour. Reads as automotive advertising.

**3 · `assets/t2/hero.jpg` is not its brief** (previously [[SR-215]]). Brief: *"a warm domestic
interior … Seated"*, with a casting note requiring *"a genuinely different home environment"*.
Delivered: an outdoor coastal terrace, both standing, holding cocktails. Its **composition** is
correct — pair in the right third, dark foliage left — so it is the setting and the register that
differ, not the layout.

**The pattern:** an ordinary day at home became a luxury car; a quiet domestic moment became a
terrace with cocktails; and a set of three states became a light-surface composite. All three
drift the same way — toward aspirational lifestyle and away from the ordinary domestic register
the briefs are explicit about. **That is a lane question, not three file questions.**

**4 · `assets/t2/range.jpg`** ([[SR-225]]). Brief: *the same pair three times — one pressing,
both settled, one gone, with the other's absence felt.* Delivered shows the pair in panels one and
two and only the man alone in the third. Installed unmodified.

**5 · `assets/t3/change.jpg`.** Brief: *"someone leaving work at a reasonable hour, unhurried."*
Delivered is a man in a suit on a clifftop terrace beside an **infinity pool** overlooking the sea.
It reads as luxury real-estate advertising, and it is the furthest from its brief of any frame so
far. Its top-right corner also measures **L=0.554** — a bright sky against a page at 0.004.

**6 · `assets/t3/hero.jpg` breaks two absolute rules, not just the register.** The briefs say *"No
text, numerals, wordmarks or logos in any frame."* This frame carries **a whiteboard covered in
handwriting and sticky notes, monitors displaying code, and a laptop bearing a manufacturer's
logo.** It also inverts the hero composition rule: the figure stands **centre**, and the left half
— which the brief requires *"soft, dark and uncluttered"* for type — is the **busiest, brightest
part of the frame**. That is why its scrim needed 0.58 alpha out to 66% where Track 02 needed 0.48.

**Six of fifteen delivered frames now drift the same way** — toward aspirational lifestyle, and
away from the ordinary register the briefs are explicit about. An ordinary day at home became a
luxury car; leaving work on time became an infinity pool; a quiet domestic moment became cocktails
on a terrace. **This is not a per-file problem and re-shooting six files will not fix it.** The
question is whether the image lane has the brief's register at all.

⚠ **One frame is a build blocker rather than a taste question.** `t3/hero.jpg`'s text and logo are
prohibited outright, and no scrim removes them. It is installed and rendering.

All are installed. None was modified. [[SR-215]] and [[SR-225]] are folded into this entry.

*Status:* open — one content decision, not three · *Raised:* 22 Aug 2026

---

### SR-213 · The image slots read their path from the record
The slots were **never wired on any track**. `TRACKS[].art` held prose briefs only,
`content/tracks.js` contained **zero** `assets/` paths, and `js/saferise-track.js` built each path
as a string — `'assets/t' + t.id + '/cost.jpg · 1600×700 · ' + brief(t,'cost')` — so the path, the
pixel dimensions and the aspect ratio were all authored in the renderer. **That is the
hardcoded-path-in-markup pattern this project forbids**, and it is the reason a file drop was
never going to be enough.

Each art entry is now `{src, ratio, brief}`. `ph()` is replaced by `slot()`, which **receives** a
record entry rather than constructing one. `SHARED.art.fourSteps` holds the one asset that serves
all three pages, because a shared image does not belong in `TRACKS`.

Nine files installed. **The degrade is the normal state, not an error state:** no `src` renders
the labelled placeholder carrying the brief, and a `src` that 404s has its `img` removed by
`onerror`, revealing the same placeholder rather than a broken-image glyph.

**`alt` is empty by intent.** These illustrate copy that already says the thing, which makes them
decorative. The `brief` is art direction, not a description of what a sighted user sees, and
writing descriptive alt would be authoring member-facing copy.

**Three findings from opening every frame, none of which anything downstream would have caught:**

1. ⚠ **`assets/t1/range.jpg` has a white background.** Corners measure L≈0.92 against the
   platform's `#0B0B12` ground at L=0.004. It is three tilted photo cards composited on white, and
   it will render as a glaring rectangle in a dark page. **Not a crop or a ratio problem — the
   file is built for a light surface.**
2. ⚠ **`assets/t1/change.jpg` does not match its brief.** The brief reads *"one person moving
   easily through an ordinary day at home"*. Delivered is a man leaning on a **luxury car** outside
   an architectural villa at golden hour. It reads as automotive advertising.
3. No text, numerals, wordmarks or logos in any of the eleven frames.

**Verified control-based; no browser is available (sixth measurement artifact).** `esc()` and
`SHARED` are both in scope at `slot()`; `tracks.js` loads before `saferise-track.js` on all three
pages; script-block balance identical to `HEAD`; and the emitted markup was simulated against the
real record for all thirteen slots. **Rule 18's rendered-state check and [[SR-162]]'s
rect-against-container assertion are UNMET and are not claimed.**

*Status:* fixed · *Raised and fixed:* 22 Aug 2026

---

### SR-214 · Track 03's five landing images do not exist
No `assets/t3/` in the source folder, no `t3-band.jpg`, no `t3/hero.jpg`. Eleven files were
delivered; **five are missing and all five are Track 03.**

**Track 03's art entries carry `ratio` and `brief` but deliberately no `src`.** A path in the
record is a claim the asset exists. Left in, each absent file costs a **404 per slot on every page
load** before `onerror` could degrade it — four failed requests to reach the same visible result
as making no request at all. With no `src`, the slot renders its labelled placeholder silently.

**Add `src` when the files land.** Nothing else changes: the wiring, the ratios and the briefs are
already in place, so Track 03 becomes a genuine file drop even though Tracks 01 and 02 could not.

*Status:* open — blocked on production · *Raised:* 22 Aug 2026

---

### SR-215 · `assets/t2/hero.jpg` does not match its brief
Recorded for Andre, not blocked, and not judged further.

The Track 02 hero brief specifies *"Two people sharing a quiet moment in a **warm domestic
interior** at golden hour. **Seated**, turned partly toward each other"*, and the casting note
requires *"a genuinely different **home** environment in each image"*.

Delivered is an **outdoor coastal terrace** overlooking a Mediterranean town, both figures
**standing**, each **holding a cocktail**.

The composition brief is met — the pair sit in the right third, and the left third is dark olive
foliage, which is the soft dark left the type needs. It is the setting and the register that
differ, and the drinks are not in the brief at all.

Paired with [[SR-213]]'s finding that `t1/change.jpg` is a car advertisement, **two of the eleven
delivered frames read as lifestyle stock rather than as the brief's domestic register.** That is a
pattern worth a decision rather than two separate notes.

*Status:* open — recorded for a content decision · *Raised:* 22 Aug 2026

---


## MEDIUM

### SR-047 · Mobile hero: theme toggle overlaps slide kickers below ~560px
At 390px the Midnight/Sunrise toggle occupies x 182–354, y 38–70. Hero kickers sit at
x 36, y 60–77. Slides 3 ("Opening 1 September") and 4 ("The SafeRise podcast") run
underneath it; slides 1 and 2 clear.

**Resolution.** Toggle leaves the hero below 560px and sits as a static right-aligned
row above it. Deliberately not fixed by reflowing the kickers — the hero is a rotating
slider, so clearance tuned to the current slides expires the moment a new one is added.

Implemented as a single `@media(max-width:560px)` block turning `.sr-themewrap`
static and right-aligned; the slider track then begins beneath it. Measured at
390px: toggle occupies y 22–66, track starts at y 66, and all four slides report
zero overlapping elements. At 561px the toggle is `position:absolute`, top 16px,
right 20px inside the hero — unchanged.

*Status:* complete · *Raised:* 17 Aug 2026 · *Merged:* 17 Aug 2026

### SR-048 · System stylesheet's section padding is additive on the dashboard
Loading `saferise-system.css` (see [[SR-045]]) exposes
`section{padding-block:clamp(72px,9vw,128px)}`, written for the marketing page's
full-bleed bands. The dashboard spaces its sections with `margin-top:56px`, so the
padding is purely additive: 128px top and bottom across nine sections took the page
from 4737px to 6785px.

Three other system rules also began matching and were measured as harmless:
`section{position:relative;z-index:1}` (no stacking regression — nav rail 50, modals
80, sections 1, and the Cue Card still resolves topmost), `.eyebrow{letter-spacing:.38em}`
(the dashboard's `.24em` wins by cascade order — computed 2.64px either way), and
`.sr-cover` (dashboard rules already win on every property that affects the render).
`section{border-top:0!important}` cannot be overridden, but no `<section>` in the
dashboard draws a top border, so it lands on nothing.

**Resolution.** Neutralised locally with `section{padding-block:0}` in
`css/saferise-dashboard.css`, placed with the other reset rules near the top rather
than in the ALIGNMENT block, which stays single-purpose. The shared sheet is not
edited, so `index.html` is unaffected.

*Status:* complete · *Raised:* 17 Aug 2026 · *Merged:* 17 Aug 2026

### SR-050 · Iframe painted white before the embedded document resolved
An iframe paints white until its own document's background resolves, so opening a
protocol flashed white across the full frame width before the dark ground arrived.

**Resolution.** `protocol.html` and `resource.html` carry
`<meta name="color-scheme" content="dark">` and `<style>html,body{background:#08080C}</style>`
as the first two entries in `<head>`, before the stylesheet; `.sr-proto-frame` carries
`background:var(--bg)` and `color-scheme:dark`. Verified at 1440, 1100 and 390: the
frame's own background computes to `rgb(8,8,12)` before load and the embedded document's
`html` and `body` both resolve to the same value on arrival, so there is no frame at
which either surface is unpainted.

*Status:* complete · *Raised:* 18 Aug 2026

### SR-051 · Theme change eased in the reader but snapped in shell and protocol page
Only the reader carried a transition, so Midnight/Sunrise moved the three tiers at
different rates and read as a glitch rather than a change of light.

**Resolution.** All three tiers share
`transition: background-color 1.4s ease, border-color 1.4s ease, color 1.4s ease`.
Verified with a protocol open: the shell hero, the Begin row and `.sr-proto-frame` all
compute that transition, and the embedded body eases on the same 1.4s. Both toggles stay
in sync. Note when measuring this: sampling sooner than ~1.4s after the click catches the
ease in flight and reads the outgoing palette, which looks like a failure and is not.

*Status:* complete · *Raised:* 18 Aug 2026

### SR-052 · Embedded pages constrained to 1020px inside a 1292px frame
The protocol page's `.inner` and the reader's `.shell` kept their standalone max-width in
embed mode, so the embedded text sat well inside the dashboard's text line and the
two-line alignment system broke at the iframe boundary.

**Resolution.** Embed-mode CSS widens both to the frame with a 30px gutter. Measured at
1440: frame at x111 by 1292 wide, `.inner` 1232 wide at x30, embedded content landing on
x141 — the dashboard's text line exactly. At 1100: frame x98, content x128, dashboard
x128. Incomplete below 640px; see [[SR-054]].

*Status:* complete · *Raised:* 18 Aug 2026

### SR-054 · Embed gutter did not follow --pad below 640px
The embed-mode gutter added by [[SR-052]] is a fixed 30px, but the shell's `--pad` drops
to 20px at 640px and the embedded pages define no `--pad` of their own. At 390px the
embedded text sat at x46 against the dashboard's x36 — a 10px break in the same alignment
system SR-052 exists to hold, visible only at mobile widths.

**Resolution.** A `@media(max-width:640px)` rule in the embed CSS of both pages takes the
gutter to 20px. Embed mode only; standalone rendering is untouched. Measured at 390:
embedded content x36, dashboard x36. 1440 and 1100 unchanged at 30px.

*Status:* complete · *Raised:* 18 Aug 2026

### SR-055 · Preview server cannot read the repo under macOS file protection
`.claude/launch.json` ran `python3 -m http.server`, which dies before parsing arguments:
that module evaluates `os.getcwd()` as an argparse default at import, and the preview
runner's process is denied it. Replacing the module with `tools/serve.py`, which derives
its root from `__file__`, clears that — but the process then cannot open any file under
the repo either.

Probed directly from the preview process: `~/Documents` and `~/Desktop` both return
`Operation not permitted`, while `~/.claude`, `/etc` and `/private/tmp` all read
normally. That is macOS TCC file protection, not a repo or config fault — the Bash tool
has been granted Documents access and reads the repo fine; the preview runner has not.

**Resolution.** `tools/serve.py` added and `launch.json` repointed at it, which is the
correct configuration and fixes the half that is fixable. The remaining half needs a
grant that only Andre can give: System Settings → Privacy & Security → Files and Folders
(or Full Disk Access) for the app running Claude Code. Until then, local preview runs
against a sha256-verified mirror under the session scratchpad, which is what this
session's measurements were taken from.

*Status:* partial — repo-side fixed, needs a macOS permission grant · *Raised:* 18 Aug 2026

### SR-056 · Five /method framework pages not built
`/method` ships with one of six framework pages. `method-porges.html` exists; HeartMath,
Maté, Jung, the observer stance and Watts do not. On `method.html` those five cards
render as non-anchor `<div class="sr-mi-card … soon">` rather than links, mirroring the
`.sr-dash-navlinks a.soon` treatment from `css/saferise-dashboard.css` — restated in
`css/saferise-method.css` because the `/method` pages do not load the dashboard sheet.

Stub pages were considered and rejected: five stubs would be forgotten, and a card that
navigates to an empty page is worse than one that says it is not ready.

The pager on `method-porges.html` is single-item for the same reason — the HeartMath
"next" card is removed, not disabled, and comes back when page 02 lands.
`method-porges.html` is the template the other five are built against.

*Status:* open · *Raised:* 18 Aug 2026

### SR-057 · css/saferise-method.css carries its own :root token block
`css/saferise-method.css` opens with a `:root` block defining `--bg`, `--band`, `--hair`,
`--gold` and the rest. Those duplicate `css/saferise-dashboard.css:22` **by value** —
the four watched tokens are byte-identical.

The duplication is currently harmless because it is page-isolated: `method.html` and
`method-porges.html` load `saferise-method.css` and nothing else, and `dashboard.html`
loads system + dashboard and never loads method. No page resolves two competing `:root`
blocks, so there is no cascade collision to trip over.

**One token genuinely diverges.** The method sheet sets `--accent:var(--gold)`; the
dashboard sets `--accent:var(--sr-track01)`, sourced from `saferise-system.css`. The
method pages do not load `saferise-system.css`, so aligning them to the repo would
resolve `--accent` to nothing and silently kill the accent on `.sr-mi-step.on` and the
interpretive-layer cards. Do not "fix" this without moving the token source first.

Consolidation is deferred deliberately, not overlooked. The canonical token source is
still unresolved — see [[SR-045]], which is the same argument between the design system
and the dashboard. Merging the method sheet into either now would bury that question
rather than answer it.

*Status:* open · *Raised:* 18 Aug 2026

### SR-112 · Track 02 and 03 pages — already built, already data-driven
Raised on the belief that only the Track 01 page existed and that Tracks 02 and 03 needed
building. **All three pages exist and all three are fully data-driven.** Each is a shell —
empty `<nav id="navlinks">`, empty `<div id="page">` — that loads `content/tracks.js` and
`js/saferise-track.js` and calls `SafeRiseTrack.render(N)`:

| page | body | data |
|---|---|---|
| `personal-transformation.html` | 1,878 B | `SafeRiseTrack.render(1)` |
| `relationship-healing.html` | 1,865 B | `SafeRiseTrack.render(2)` |
| `professional-performance.html` | 1,872 B | `SafeRiseTrack.render(3)` |

Measured live by Run C: 0 gaps on all three, 10 protocol cards each, 18 FAQ entries each.
The renderer's template-inherited `GAPS` counter is renamed `MISSING` and surfaced on
`window.SR_TRACK_MISSING` rather than rendered, "so a live page stays quiet"
([js/saferise-track.js:43](js/saferise-track.js:43)).

Nothing to wire. Closed without code.

*Status:* closed — already satisfied · *Raised:* 19 Aug 2026 · *Closed:* 20 Aug 2026

### SR-113 · FAQ data — already in `content/tracks.js`, not only in the template
Raised on the belief that `faq` lived only in the upstream template. It is in the repo's
own data: `SHARED.faq` at [content/tracks.js:603](content/tracks.js:603) (12 entries), and
`TRACKS[1].faq` :655, `TRACKS[2].faq` :676, `TRACKS[3].faq` :697 (6 each). **18 render per
track page**, confirmed live on all three.

Run C's field-set comparison found zero fields present in the template and absent from the
repo, in either direction, for tracks 1–3 — and found the repo newer than the template on
every value that differs. Closed without code.

*Status:* closed — already satisfied · *Raised:* 19 Aug 2026 · *Closed:* 20 Aug 2026

### SR-118 · Dispenza in the track data — already removed; the key is `distance`
Raised as 7 `dispenza` occurrences in `content/tracks.js` and 6 in `META[].frameworks`.
**`content/tracks.js` has zero.** The framework is present under its real key:
`FRAMEWORKS.distance` at [content/tracks.js:507](content/tracks.js:507), and the six named
protocols carry `'distance'` — `t1-09`, `t1-10`, `t2-08`, `t3-03`, `t3-08`, `t3-10`,
exactly the list the brief named. [[SR-089]] did this work; the brief predated it.

The only non-comment residue repo-wide is `docs/reference/portal-personal-target.html`
lines 536 and 701, which this register already scopes out at [[SR-084]] as a reference
target under `docs/`, not a served page. Reported by Run C, not touched. Closed without code.

*Status:* closed — already satisfied · *Raised:* 19 Aug 2026 · *Closed:* 20 Aug 2026

### SR-122 · Undated promises on surfaces for tracks that have a price
Three surfaces on `index.html` still say a shipping track is unpriced or unavailable. They
fail the no-undated-promises rule independently of the Elevation removal, and were left
alone during [[SR-110]] because rewording them is not the fix.

| # | surface | where | what it promises | is it about the track or the team programme? | does that thing have a price in the data? |
|---|---|---|---|---|---|
| 1 | Plans-strip Professional panel | `index.html`, the four-panel strip under the plans heading | *"Coming Soon"* + *"Pricing TBA"* | **The track.** The panel sits beside Personal and Relationship panels and lists the same per-track contents. | **Yes** — `PRICING.t3` = €29/month, locked 2026-08 |
| 2 | Professional plans card | `index.html`, the three-card plans grid | *"Coming Soon"* + *"Pricing to be announced · team programmes priced separately"* | **Both, in one line.** The card is the track's; the trailing clause is about team programmes. | **Track: yes**, `PRICING.t3` = €29/month. **Team programmes: no** — no key for them exists in `PRICING`. |
| 3 | Comparison table, Relationship and Professional columns | `index.html`, `#prog-compare` | *"Entry price: TBA"* for both, *"Available: Coming Soon"* for both | **The tracks.** | **Yes for both** — `PRICING.t2` = €19/month, `PRICING.t3` = €29/month |

So surfaces 1 and 3 are **stale, not undecided** — the price exists and is locked. Surface 2
is a mixed case: the track half is stale, and the team-programme half names something that
genuinely has no price anywhere in the data, so **removing that clause is the fix rather
than filling it in**.

Blocked on [[SR-124]]: the page carries two hardcoded price ladders and both disagree with
the record, so writing a figure into these surfaces now would just add a third. Settle the
ladder first, then have these read `PRICING`.

*Status:* open · *Raised:* 20 Aug 2026

### SR-126 · The introductory rate has no label, on any surface
`PRICING.t1` is €9 with `introductory: true` and a standard of €19. **No surface says so.**
After [[SR-124]], sixteen nodes on `index.html` carry `data-sr-intro="true"` and
`data-sr-standard="€19…"`, and the three track pages render `t.price.amount` through
[js/saferise-track.js:302](js/saferise-track.js:302) — none of them prints a label.

A member who subscribes at €9 and later sees €19 without having been told has been switched,
whatever the intent.

**The promise, confirmed 20 Aug 2026:** early subscribers keep €9 **for as long as they stay
subscribed**. Cancel and return, and they return at the standard rate. That is not a
countdown, so the label must not read as one — "€9 for now" or any expiry framing fails the
no-undated-promises rule and misdescribes the offer besides.

**Where the label is needed** — reported, wording not written:

| surface | what renders €9 today |
|---|---|
| `personal-transformation.html` | the `€9` price numeral and the "Get Started — €9/month" pill, both from `rPrice()` |
| `index.html` — 16 nodes | the hero and plan CTAs, the compare row, the pricing note, the foundation panel, the resource paywall button |
| `dashboard.html` | no €9 surface today — Track 01 is the owned track, so no price is shown for it |

The hook exists and is unused: any node with `data-sr-intro` can be labelled without a second
lookup. On the track pages the natural place is the `priceNote` beneath the price, which
already carries the cumulative-access sentence.

**Resolution of the team-programme half (21 Aug 2026) — it does not reproduce.** The clause
*"team programmes priced separately"* was to be cut as an undated promise. **A team programme
exists and is priced:** `prog-retreats` sells the Corporate Retreat — intake, half-day agenda,
written debrief — at **€1,800 flat** up to 50 people and **€3,500 flat** over 50. The clause is
**accurate**, and cutting it would have removed a true statement about a sellable product.
Nothing was cut.

The defect on that line is the **other** clause, *"Pricing to be announced"*, now stale since
Track 03 is €39/mo — [[SR-151]]. A third occurrence at `index.html:6744` points at content
that is not there — [[SR-150]].

The two track-price halves of this entry were resolved by [[SR-124]] landing.

*Status:* open — the "Pricing to be announced" clause only, see SR-151 · *Raised:* 20 Aug 2026

### SR-127 · `protocol.html` prices have no connection to the record
`protocol.html` renders **€275**, **€59** and **€139** as hardcoded literals at :858, :875 and
:880. It **does not load `content/tracks.js` at all**, so `PRICING` is not merely unread — it
is unreachable.

Those three figures happen to match `PRICING.premium`, `workshopPersonal` and
`workshopRelationship` today. Nothing keeps them matching. This is the same defect class as
[[SR-124]] one layer removed: SR-124 was a page that loaded the record and ignored it; this is
a page that never sees it.

Fixing it means adding a `<script src="content/tracks.js">` to a page that currently has no
dependency on it, then converting three literals to `data-sr-price` nodes and adding the
hydrator — small, but it changes what the page loads, so it was not folded into SR-124.

Not in the Elevation or pricing-reconciliation scope. Logged, not fixed.

*Status:* open · *Raised:* 20 Aug 2026

### SR-128 · The comparison table prices three tracks as three products
`#prog-compare` on `index.html` shows Personal / Couples / Career with an **Entry price** row
and no statement anywhere in the table that access is cumulative. Three prices in three
columns read as three things to buy.

They are not. `PRICING[t].includes` now records it as data ([[SR-124]]): €29 buys Tracks
01–02 and €39 buys all three. Every other price surface says so in prose — the track pages
carry *"Access is cumulative — Relationship Healing includes the whole of Personal
Transformation"*, and `index.html`'s pricing note spells out all three. **The comparison
table, the one surface built specifically for comparing, is the only one that does not.**

The effect is the wrong way round: shown as three products, €39 is the expensive option;
shown with its inclusion, €39 is the obvious one.

Two further things the table says that no longer match the record — both resolved by
[[SR-122]] and its dependency on SR-124, listed here so the table is assessed once:
*"Entry price: TBA"* for Relationship and Professional, which both have prices; and
*"Available: Coming Soon"* for both.

Not fixed. The fix is a copy and layout decision — what the row is called, whether inclusion
is a row or a footnote, whether "Entry price" survives — and that is authoring, not a
correction. The data it would need is in place.

*Status:* open — copy and design decision · *Raised:* 20 Aug 2026

### SR-129 · `TRACKS[2]` and `TRACKS[3]` were defined twice
Empty skeletons in the literal, with the real objects declared 300 lines later as `var T2` /
`var T3` and assigned over them. The resolved data was correct; the mechanism was fragile —
anything reading `TRACKS` before the assignment got blank copy rather than an error.

**The stub pattern was a workaround, not an oversight, and Rule 15 came from finding out
why.** `TRACKS[2].change.items` **is** `CHANGE_PROPOSALS[2]` — the same object by identity —
and `CHANGE_PROPOSALS` was declared *after* the literal. A straight promote would have
evaluated it against a hoisted-but-undefined binding and thrown. `CHANGE_PROPOSALS` is now
hoisted above `TRACKS` with a do-not-move note.

**Equivalence proved, not assumed:** `JSON.stringify(TRACKS)` is **byte-identical** before and
after — 30,467 bytes, hash 2778865564 — with the probe proved sensitive by a one-character
perturbation first.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-134 · Spelled-out counts survived the Elevation removal
[index.html:2690](index.html:2690) read *"**Four plans.**"* above a grid of **three** panels,
and [:7359](index.html:7359) *"One methodology. **Four programs.**"* above **three** cards.
Two stale comments said the same. All four corrected.

They survived Run D's 19-surface removal because they **name a number, not the track** — no
sweep for `Elevation` could reach them. **Rule 17 was written from this and from
[[SR-126]]'s "Nineteen euros a month".**

Each claim was **asserted against the grid it describes**, not string-replaced — that pattern
is now standard for any count claim.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-139 · Sessions and workshops are one hour
21 duration strings corrected across `dashboard.html` and `protocol.html` — **six more than
the brief listed**, including a whole sessions module on `protocol.html` mirroring the
dashboard's. Time ranges `18:00–20:00` → `18:00–19:00`, asserted **verbatim in full** with a
single-occurrence check per line, never a bare end time.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-141 · Workshop prices are €29 per person and €49 per couple
Five `index.html` surfaces now derive from `PRICING`, including the services sentence, which
reads correctly at the new figures. `protocol.html`'s two corrected as literals — **that page
loads no external scripts at all**, so there is no mechanism to derive from; reported rather
than adding one ([[SR-127]]).

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-145 · index.html navigation routes to the standalone track pages
**Stage one of a two-stage migration.** Navigation goes to real URLs; in-page CTAs keep
opening overlays until the standalone pages carry what the overlays hold ([[SR-148]]).

Three nav tabs converted `<button onclick>` → `<a href>`, and three footer-template links
repointed. **The decisive reason is sequencing, not cost:** every block moved into the record
shrinks the eventual overlay retirement, while every block copied out of the overlays creates
another inventory to keep in step.

**The brief said three links; there are 19 call sites.** Its count came from a DOM figure
inflated by the footer template — **the second time a template multiplier has produced a wrong
count in a brief** (Rule 11). Source 19 → DOM 48; the three footer edits alone produce 33 DOM
instances across 11 cloned footers.

**A passing check worth recording:** all three overlays have **zero euro literals** — every
price is a `data-sr-price` node. There is no second pricing inventory. The drift concern holds
for content, not prices.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-147 · Thirteen in-page CTAs still open overlays
*"Begin Free — No Registration"* ×3, *"Start — €9/mo"*, *"Start Personal Transformation"*,
*"Back to…"*, five *"Join Waitlist"*, *"Start — €29/mo"* ×2. Deliberately untouched by
[[SR-145]]: repointing them now would delete four content blocks with no destination.
Blocked on stage two ([[SR-148]]).

*Status:* open — blocked on SR-148 · *Raised:* 21 Aug 2026

### SR-148 · The standalone pages and the overlays are not a superset either way
**Overlays have, standalone does not:** "What's Included" (hardcoded markup, ~10,934 chars per
overlay — see [[SR-153]]), the workshops and 1:1 cards (one JS template at
[index.html:4436](index.html:4436), ~1,411 chars, **needs nothing from the record**), and ten
inline per-protocol detail views (generated from `PT_PROTOCOLS`, **Track 01 only**, coupled to
Reader and identity-layer ordering — by far the largest).

**Standalone has, overlays do not:** 18 FAQ items, the 9-item resource list, the introductory
rate label. **All three already derive from the record**, and `index.html` already loads
`content/tracks.js`, so the overlays could read the same source — a mount point and a render
call, no new content.

**Decision: reverse direction first**, for the sequencing reason above rather than the cost
difference.

*Status:* open — stage two · *Raised:* 21 Aug 2026

### SR-153 · A third resource inventory
The overlay "What's Included" is **hardcoded markup** listing **6 / 6 / 10** items whose names
match neither each other nor `SHARED.resources`' **9**. [[SR-125]] covers the first two
inventories; this is the third.

Its copy is **genuinely track-specific** — *"both of you"*, *"each of your nervous systems"* —
so it **cannot** be replaced by the shared list. A per-track record structure
(`TRACKS[n].included[]`) would be needed, carrying ~22 item descriptions currently living in
markup.

*Status:* open — blocked on Andre · *Raised:* 21 Aug 2026

---

## LOW

### SR-059 · Framework page art slots unfilled
The `/method` pages carry placeholder markup for every art slot, with the real `<img>`
commented out beside a `NEEDS ART` / `Reuse` / `Tonal fallback` span stating exact
dimensions. Outstanding: six 1340×360 section bands (slot B, one per framework, the only
genuinely new commission) and six 200×200 symbol tiles (slot A, reused at 88px on the
index cards and 64px on the pager).

Two slots are already filled: the arrival check-in and Shutdown Recovery load cards on
`method-porges.html` point at `assets/covers/01.jpg` and `assets/covers/07.jpg`, both of
which exist in the repo. Every other `<img>` stays commented out — uncommenting one
without the asset produces a broken image, which is worse than the placeholder.

Covers carry their kicker word and number inside the image. Do not add CSS overlay text
to a cover or the text doubles.

*Status:* open · *Raised:* 18 Aug 2026

### SR-111 · Hardcoded track names — all correct; a coupling question, not a defect
Raised as nav showing stale or wrong track names. Run C read every occurrence of a Track
01–03 name across eight files: **121 strings, and every one matches `TRACKS[n].name`
exactly.** No stale value exists in the tree.

The nav the brief tabulates — the three track pages' — is already bound to `tracks.js` and
already correct. The three pages' one static occurrence each is the `<title>` and
`<meta name="description">`; `renderTrack` overwrites `document.title` from `t.name` at
runtime ([js/saferise-track.js:411](js/saferise-track.js:411)), so the served title is
data-driven and the static one is a no-JS fallback.

What remains is coupling, not correctness: 121 correct strings that are not bound to the
record and would go stale together if a track were ever renamed. That is a separate,
lower-value item and was not opened here.

Noted in passing: `CLAUDE.md` names the third series "Professional" where the data says
"Professional Performance". The document is out of step with the data, not the pages.

Closed without code.

*Status:* closed — already satisfied · *Raised:* 19 Aug 2026 · *Closed:* 20 Aug 2026

### SR-117 · `extras: null` — no consumer throws, and `null` is the intended value
Raised as `extras: null` crashing consumers. **There is one reader in the repo.**
`extras` appears in four places, all in `content/tracks.js`: three comment lines (523, 529,
532) and one read, `protocolResources` ([content/tracks.js:538](content/tracks.js:538)),
which array-checks before use:

```js
return Object.prototype.toString.call(extras) === '[object Array]' &&
       extras.indexOf(needs) > -1;
```

`protocolResourceCount` (:547) delegates to it. Neither has a caller outside `tracks.js`
and its `module.exports`. Verified live: `protocolResourceCount('t2-01')` → `7`, no error,
console clean on all three track pages. **The crash does not exist.**

§8b, on whether `null` is an unfilled field: it is not. [[SR-078]] wrote it as a
deliberate sentinel, documented in place at [content/tracks.js:523](content/tracks.js:523)
and :532 — *"null means UNVERIFIED, not none"* — distinct from `[]`, which means verified
and empty.

**Standing decision, 20 Aug 2026: the twenty `null` values stay `null`.** Changing them to
`[]` would assert a verification nobody performed. Do not "tidy" this in a later pass.

*Correction, same day:* this entry originally pointed at [[SR-120]] as the contrasting case
where `[]` is a wrong value. **It is not** — SR-120 was investigated and does not reproduce.
No `[]` in the tree contradicts its content. The `null` / `[]` distinction still stands as
written above; only the example was wrong.

Closed without code.

*Status:* closed — already satisfied · *Raised:* 19 Aug 2026 · *Closed:* 20 Aug 2026

### SR-119 · Dispenza re-verification across all tracked file types
The earlier sweep had been run over a subset of extensions. Re-run properly:
`git ls-files -z | xargs -0 grep -ni dispenza` — every tracked file, every extension.

Two files hit, both under `docs/`: this register (historical record of the removal,
acceptable) and `docs/reference/portal-personal-target.html` at 536 and 701, already scoped
out at [[SR-084]]. `content/tracks.js`, `index.html`, and every `.js`, `.css`, `.json` and
config file: clean.

Closed — verification performed, result clean, no code required.

*Status:* closed — already satisfied · *Raised:* 19 Aug 2026 · *Closed:* 20 Aug 2026

### SR-121 · `SERIES_CONFIG` and its three renderers were dead code
A closed island of 117 lines in `index.html`: `SERIES_CONFIG`, `renderSeriesHero`,
`renderProtocolBrowseHead`, `renderWhatsIncludedHTML`, and the `DOMContentLoaded` loop that
wired them to `hero-mount-*` / `protocols-head-mount-*` / `whats-included-mount-*`.

**It had no mount targets.** Checked against the tree before [[SR-110]] touched anything:
the only such elements in `index.html` were the three `-elevation` ones. The `personal`,
`couples` and `corporate` entries in `SERIES_CONFIG` had **never** rendered — those overlays
carry hardcoded hero markup. So this predates the Elevation removal; removing the overlay
only made it visible.

Verified as a closed island across every tracked file: the four symbols appear nowhere
except their own definitions and each other, and no mount id exists anywhere.

**Proved by rendering, not by reasoning.** Each of the seven surviving overlays was
fingerprinted before and after removal — rendered `innerHTML` byte length, normalised text
length, element count, `.proto-item` count, and a content hash over the full markup. **All
seven are byte-identical, hashes included.** `prog-personal` 319,380 B / hash 2607618881,
`prog-couples` 278,929 B / 3406980494, `prog-corporate` 237,185 B / 1164681881, and the four
non-track overlays likewise. The three track heroes still render their own headings. The
fingerprint was proved sensitive by appending one character to a paragraph, which moved both
byte count and hash, then restoring it.

After removal the four symbols throw `ReferenceError`, all ten inline blocks parse, and the
console is clean.

Removed rather than documented as a deliberate non-fix: there is no reason for it to stay.
Given its own ID and its own commit so it is revertable and reviewable apart from the
Elevation work.

*Status:* complete on merge · *Raised:* 20 Aug 2026 · *Fixed:* 20 Aug 2026

### SR-123 · `<style id="sr-series-hero">` is now dead
The block at [index.html:823](index.html:823) defines two families: `.sr-hero-badge` /
`.sr-hero-eyebrow` / `.sr-hero-accent`, and everything scoped under `.pcard-grid`.

Both are now unused on the page. The hero classes were emitted by `renderSeriesHero`,
removed by [[SR-121]]; the only `.pcard-grid` element was `#elevation-protoList`, removed by
[[SR-110]]. Measured on a cold load: **0** `.pcard-grid` elements, **0** `.sr-hero-*`
elements. The 62 surviving `.proto-item` elements sit outside any `.pcard-grid` and are
styled by the base rules defined earlier in the file, which the block's own comment says are
deliberately left untouched — so nothing regresses.

The three track pages do **not** load this block; they are separate documents rendered by
`js/saferise-track.js`. Repo-wide, `pcard-grid` and `pcard-cols` appear only inside this
block's own rules and comments.

**One of the 26 rules was not dead, and the block description was wrong.** The last rule,
`#personal-protocol-page .sr-tile{aspect-ratio:auto;height:240px}`, has nothing to do with
series heroes — it is a Personal-portal fix that happened to be appended to this block. It
**matches and applies**: the view-swap script relocates a `.proto-item` into
`#personal-protocol-page`, and the rule caps the tile there.

Its rendered effect is nil, because
[css/saferise-system.css:562](css/saferise-system.css:562) —
`#personal-protocol-page .proto-item .sr-tile{display:none}` — loads later and wins.
Measured with the view swap triggered, by deleting the rule from the live CSSOM and
restoring it:

| | rule present | rule removed |
|---|---|---|
| computed `aspect-ratio` | `auto` | `3 / 4` |
| computed `height` | `240px` | `auto` |
| rendered box | **0 × 0** | **0 × 0** |
| page height | **4051px** | **4051px** |

Computed style differs; nothing renders differently. **Deleting it would have looked safe and
been wrong** — the hazard it prevents (a 3/4 tile scaling to ~1300px in the full-width mount)
is real and merely masked. Remove the `display:none`, or stop nesting the tile inside
`.proto-item`, and the rule becomes load-bearing again with nothing connecting the two events.

**Resolution (20 Aug 2026).** The rule was **relocated into
`css/saferise-system.css`, directly adjacent to the `display:none` it interacts with**, under
a comment recording what it prevents, why it currently shows no effect, and that it must not
be tidied. Registered as a deliberate keep, same class as `extras: null` ([[SR-117]]) and the
launch/standard pair in `PRICING` ([[SR-124]]).

The move was proved cascade-neutral rather than assumed. `saferise-system.css` loads last and
wins by cascade order ([[SR-105]]), and the two properties do not collide with the
`display:none`; with the view swap triggered, computed `aspect-ratio`, `height`, `display` and
the rendered rect are **identical before and after**, and the rule is now served by
`saferise-system.css`.

The block then went — all 26 rules, 83 lines. After removal: `<style id="sr-series-hero">`
absent, **0** `.sr-hero*` elements, **0** `.pcard-grid` elements, 62 `.proto-item` elements
unaffected (they are styled by the base rules defined earlier, which the block's own comment
said were deliberately left alone). All ten surviving overlays fingerprinted before and after
— **byte-identical, hashes included** — with the probe proved sensitive by a one-character
perturbation that moved both byte count and hash and restored exactly.

*Status:* complete on merge · *Raised:* 20 Aug 2026 · *Fixed:* 20 Aug 2026

### SR-120 · `t1-01` extras — **reproduces.** My first finding was wrong.
Raised as: `p1-advisory` is written and the Reader serves it, but `META['t1-01'].extras` is
`[]`, so content and data disagree and the `[]` is a wrong value rather than an unverified
one.

**`p1-advisory` exists, and the Reader serves it.** Measured on the live object graph:
`RESOURCE_CONTENT['p1-advisory']` is present with `kind: 'Attention Advisory'`, title
*"Anxiety Reset — Where to Direct Your Attention"*, and `READER_PROTOCOLS['p1'].keys` lists
it **first** of seven.

**How I got this wrong the first time, and it matters.** My initial sweep matched
`"p1-advisory"` — double-quoted, the JSON-literal form. This resource is created by a
runtime assignment at [index.html:4691](index.html:4691),
`RESOURCE_CONTENT['p1-advisory'] = {…}`, single-quoted, inside an IIFE added by SR-002.
`index.html` builds a large part of `RESOURCE_CONTENT` this way — several later blocks add
and overwrite entries after the literal is parsed. **A static grep cannot enumerate this
file's resource keys.** Only the live object graph can. That is now the method for any
resource-key question here.

**The `extras` → content-key mapping, which is still worth recording.** The second
conditional is keyed `-repair`, not `-invitation` — the value in `extras` and the suffix in
the content key do not share a name, so any audit matching by name reports a gap that is not
there:

| conditional | `extras` key | content key | protocols claiming it | content present for |
|---|---|---|---|---|
| Proximity Guide | `advisory` | `pN-advisory` | t1-02, 03, 04, 08, 09, 10 | p1, p2, p3, p4, p8, p9, p10 |
| Invitation to Repair | `invitation` | `pN-repair` | t1-02, 04, 08, 09 | p2, p4, p8, p9 |

`p1` is the one row where content exists and `extras` does not claim it. Every other cell
matches in both directions, and no `extras` entry anywhere claims content that is absent.

**So `t1-01: extras: []` is wrong** — `[]` asserts *verified, neither conditional applies*,
while the Reader serves an Attention Advisory for that protocol. `protocolResourceCount('t1-01')`
returns **7**, omitting the Proximity Guide, while the Reader's `p1` manifest carries
`p1-advisory`.

**Not fixed yet, and it should not be fixed in isolation.** The two inventories are not the
same list — see [[SR-125]]. `p1-advisory` is *"how do I turn attention inward safely"*, while
`SHARED.resources`' Proximity Guide is *"How close to stay"* — relational distance, which is
the `p2-advisory` content. Setting `extras: ['advisory']` on `t1-01` would make the count 8
by claiming a **Proximity Guide the protocol does not have**. The honest fix depends on
whether `advisory` means one resource or two, which is the SR-125 question.

*Status:* open — reproduces; blocked on [[SR-125]] · *Raised:* 20 Aug 2026

### SR-133 · The `CHANGE_PROPOSALS` comment described unfinished material
It called live member-facing copy appendix material. Rewritten to state what the object is —
the `items` of the live `change` section on Tracks 02 and 03, referenced **by identity** and
never copied — with a **DO NOT MOVE BELOW `var TRACKS`** note and its reason.

Also repaired the `TRACKS` banner stranded by [[SR-129]]'s hoist. **Rule 19 was written from
that and from the SR-057 comment in [[SR-136]]** — both stranded by replacing a block's first
line, both syntactically valid, neither catchable by a parse check.

**A trap recorded:** the first draft *quoted* the phrases it replaced, failing the constraint
that no draft-status wording survive. Rewritten to describe rather than quote.

Follow-up: the name `CHANGE_PROPOSALS` is now misleading; renaming touches three references
plus `module.exports`.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-138 · The 1:1 prices derived from nothing
`index.html` rendered €129 and €299 as literals while `premium1`/`premium3` held the same
values with **zero consumers** — correct figures sitting in the record unrendered while copies
of them shipped. All four converted to `data-sr-price` spans. **Closes [[SR-057]]**: not
retired tiers, live products with no derivation.

**Follow-up, not done:** [:7681](index.html:7681) renders *"≈€99.67/session"* — arithmetic
over `premium3`, not a record value. Deriving it needs a computed-price mechanism that does
not exist. **If `premium3` changes, that figure goes stale silently.**

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-140 · `premium3` is three sessions, not three hours
`per: 'for three hours'` → `'for three sessions'`. One string aligned to seven that already
agreed; with the 1:1 at one hour, a three-hour block cannot coexist with *"space sessions out
as you need"*.

**No rendered sentence changed, and that is the honest result.** `premium3.per` had **zero
consumers** — no `data-sr-price-form="per"` node exists, and every `.per` reader operates on
track prices. The string was **inert**.

**This is the inverse of Rule 14.** Dormant *code* resumes when whatever masks it changes;
dormant *data* is read the moment someone adds a consumer. A wrong value in the record is a
defect by construction regardless of current readers.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-143 · index.html workshop durations
Three strings in `prog-workshops` said 90 minutes; corrected to 60 with each hedge and idiom
preserved. The retreat segments at :7888 and :7975 describe a **different product** and were
asserted intact.

The brief said index.html was already correct — **true of the 1:1, not of workshops.**

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-144 · The workshop agenda sums to two hours
`dashboard.html:567` reads *"Two hours, facilitated live"* above a run-sheet of
**15 + 40 + 45 + 20 = 120 minutes**. Both left exactly as they are, by decision: **a heading
that disagrees with its own run-sheet is better than a run-sheet with invented numbers.** The
four segment lengths are a facilitation decision. The only remaining "Two hours" in the tree.

**ANSWERED, 22 Aug 2026. The agenda is 10 / 20 / 20 / 10, summing to 60.** The heading becomes
"One hour" and the run-sheet agrees with it. Andre's decision — a facilitation call, not a code
one, which is exactly why this sat open rather than being guessed at.

**Not yet applied**: `dashboard.html:567` still carries the two-hour heading and the
15/40/45/20 run-sheet. This entry records the answer so the numbers are not invented a second
time. The edit is one line for the heading and four for the run-sheet.

*Status:* answered — ready to apply · *Raised:* 21 Aug 2026 · *Answered:* 22 Aug 2026

### SR-146 · Thirty-nine dead links on the member pages
`dashboard.html` **11**, `protocol.html` **22**, `resource.html` **6**; `index.html` **0**.
Highest-value: `protocol.html:599–600`, a five-item nav all dead on a page members read, and
:867/:884 — *"Book a session"* and *"Reserve a place"* — dead directly beneath the prices this
run corrected.

**Not all are dead**: `dashboard.html`'s TEXTMAP delegated handler wires several by text
content, so each must be **clicked**, not read (Rule 18). Targets that exist: `method.html`,
the three track pages, `dashboard.html`. Terms/Privacy/Support have **no target file**.

Queued and not started — the run closed first.

*Status:* open · *Raised:* 21 Aug 2026

### SR-150 · `protocol.html:6744`'s "billed separately, above" points at nothing
The corporate portal line reads *"Corporate team programmes are billed separately, **above**"*,
but nothing above it in that overlay describes team programmes — the preceding content is the
back-link and the hero. Found during [[SR-122]].

*Status:* open · *Raised:* 21 Aug 2026

### SR-151 · The Professional plans card says "Pricing to be announced"
[index.html:7385](index.html:7385) reads *"Pricing to be announced · team programmes priced
separately"* on a card that also says *"Coming Soon"* and *"Join Waitlist"*. **Track 03 has a
price** — €39/mo in `PRICING`, rendered correctly everywhere else after [[SR-124]]. The
*second* clause is accurate ([[SR-122]]); the first is stale. Copy decision.

*Status:* open · *Raised:* 21 Aug 2026

### SR-152 · The protocol carousel clips a card at every viewport
Measured on `personal-transformation.html`, `viewport_usable` asserted at each. Card width is
a constant **238px**; the carousel is a real scroller (`scrollWidth` 2562) and **the counter
reads "1 / 10" at every width**, never the number visible.

| viewport | carousel | full | clipped card | clipped by |
|---|---|---|---|---|
| 1440×1000 | 1178 | 4 | **5th** | **68px** |
| 1280×1000 | 1178 | 4 | **5th** | **68px** |
| 1024×900 | 958 | 3 | **4th** | **36px** |
| 768×900 | 702 | 2 | **3rd** | **40px** |
| 390×844 | 300 | 1 | **2nd** | **190px** |

1440 and 1280 are identical because the container caps at 1178. **No page-level horizontal
overflow at any width** — the clipping is inside the scroller, which is the intended pattern.
The mockup claim of *"1/10 with the fifth card clipped"* **reproduces exactly at 1440**.

Whether a partially-visible card is a defect or an affordance is a design decision. At 390 the
2nd card shows only 48px of 238, which reads as a layout error rather than a hint.

*Status:* open — design decision · *Raised:* 21 Aug 2026

### SR-142 · Seven dead `href="#"` on index.html — does not reproduce
Raised as three dead track cards at `:958, :965, :971` among seven `href="#"`.

**`index.html` contains zero `href="#"`.** Lines 958/965/971 are **CSS inside `<style>`
blocks**. The three track links are `href="javascript:void(0)"` with live handlers; all three
were clicked and all three opened their overlays. Of **113 anchors**, none has a dead href
with no handler.

**Cause, recorded because it is the fifth inversion in one run:** the brief was written from a
standalone homepage mockup that is not in the repo and is unrelated to `index.html` — Rule 16,
broken by its author.

The real finding was different in kind: **`index.html` links to no other HTML page in the
tree**, which became [[SR-145]]. The genuine dead links are on the member pages — [[SR-146]].

*Status:* closed — does not reproduce · *Raised:* 20 Aug 2026 · *Closed:* 21 Aug 2026

### SR-130 · Track 02 sold at Track 01's price — does not reproduce
`relationship-healing.html` renders **€29** in all three surfaces — sticky bar, panel numeral,
and the words *"Twenty-nine euros a month."* Track 03 renders €39, Track 01 €9. Observed
incidentally during [[SR-129]] while the evidence was in front of the run; Phase 2 was
formally held at the time and never needed to open.

*Status:* closed — does not reproduce · *Raised:* 20 Aug 2026 · *Closed:* 21 Aug 2026

### SR-131 · The appendix renders on the track pages — does not reproduce, and inverts
No track page renders *"proposed"* or *"appendix"*; the string *"Six areas of change —
proposed for Track 02"* **does not exist in the repo**. The rendered kicker is
*"Six areas of change"*, hardcoded in the renderer with no track name.

**`CHANGE_PROPOSALS[2]` and `[3]` are the `items` of the live `change` section** on Tracks 02
and 03, wrapped in ordinary live copy. **Following the brief would have deleted the six-areas
section from two of three track pages** — the most consequential near-miss of the run. The
comment was the defect; corrected under [[SR-133]].

*Status:* closed — does not reproduce · *Raised:* 20 Aug 2026 · *Closed:* 21 Aug 2026

### SR-132 · `FRAMEWORKS` still carries Dispenza — does not reproduce
**There is no `dispenza` key.** The fourth key is `distance` — `name: 'Distance & rehearsal'`,
`person: 'Kross & Ayduk'`, `register: 'peer-reviewed'`, gold. Every specific in the brief
inverts. Zero `dispenza` in any non-doc tracked file, plain or escaped, and
`mock-05-record-audit.html` **is not in the repo**. Duplicate of [[SR-118]]; briefed from a
pre-merge snapshot.

Carried for [[SR-107]]: five `data-sr-reach` cards exist — porges, heartmath, mate, jung,
watts — and **no `distance` card**, so its six protocols surface nowhere. Live reach across 30
META entries: porges 16, mate 14, jung 11, heartmath 7, watts 7, distance 6.

**`register` and `colour` are declared and read by nothing.** The gold/teal band split exists
only as hardcoded CSS and prose, so changing `register` moves nothing on any page — the same
class as `PRICING[t].includes`, which no `#prog-compare` surface reads. Fields that look
authoritative and drive nothing.

*Status:* closed — does not reproduce · *Raised:* 20 Aug 2026 · *Closed:* 21 Aug 2026

### SR-154 · The preview server cannot read the repo under this sandbox
Environmental, not a repo defect, and it will recur in every run until the sandbox changes.

`.claude/launch.json` as committed — `python3 tools/serve.py 8642` — fails to start:

```
/Library/Developer/CommandLineTools/usr/bin/python3: can't open file 'tools/serve.py':
[Errno 1] Operation not permitted
```

An absolute path fails identically, and a scratchpad script pointed at the repo fails one step
later:

```
PermissionError: [Errno 1] Operation not permitted:
'/Users/arobley/Documents/GitHub/saferise/dashboard.html'
```

The preview runner has no read access to `~/Documents` at all. **`tools/serve.py` is unchanged
and correct** — it runs normally from a shell. Do not "fix" it.

**Procedure:** run the server from the scratchpad against an `rsync -a --delete` mirror of the
working tree, with `launch.json` temporarily repointed at the scratchpad script and **restored
before staging** (Rule 5).

**The mirror needs a control, because a silently failed sync leaves you verifying a pre-edit
copy and reporting a pass with numbers that all look plausible.** Before each verification:
write a unique token into the file just edited, sync, confirm it appears in the mirror **and
that it is absent from a control file**, then remove it and sync again. Rule 20 applied to the
measurement path itself.

**Two capture artifacts this environment produces, both Rule 10:**
- `resize_window` with a **preset** leaves `innerWidth`/`innerHeight` at **0**, and every
  measurement taken there is void — the statebar measured 231px tall at zero width and 51px at
  1280x860. Set explicit `width`/`height` and report `viewport_usable` with each measurement.
- The browser **serves a cached page after an edit**. The first post-[[SR-155]] measurement
  showed the removed statebar still present, while `curl` against the same server returned a
  file that did not contain it. Cache-bust every verification URL and treat a stale reading as
  void.

*Status:* closed — environmental, recorded for reuse · *Raised:* 21 Aug 2026


---

## BACKLOG

### SR-187 · The same prohibition is violated on two more surfaces — scope decision required
**Recorded, not fixed.** [[SR-181]] and [[SR-185]] cleared the Reader. The same forbidden claims
render on two other surfaces, found by the Rule 7 / Rule 17 sweep and left alone deliberately
because the run was scoped to the Reader.

- [resource.html:1003](resource.html:1003) — `padN(current+1)+' of '+padN(v.length)+' · '+r.title`.
  Structurally identical to the readout removed from the Reader.
- [dashboard.html:2297](dashboard.html:2297) — `'Resource ' + r.resource + ' of ' + r.resourceTotal`.
  Literally the same string.
- [dashboard.html:1781](dashboard.html:1781), [:1866](dashboard.html:1866) —
  *"N of M protocols still unopened"*. A count of the library, not of the member.

⚠ **CORRECTED — this entry's original text is what caused the error it describes.** It listed
`dashboard.html:941` alongside the two lines above and described all three as *"N of M protocols
still unopened"*. **:941 never said that.** It rendered `Resource N of M` from the same
`sr.resume` record as `:2297` — a member's position inside a protocol. The brief that acted on
this entry inherited the mislabel and told the run to leave it. It was caught in the working
tree and fixed under [[SR-191]].

The lesson is Rule 16 turned inward: **a register entry is a premise too.** Rule 16 warns that a
brief is not evidence; an entry written from a hasty sweep is the same class of claim, and it is
worse, because the next run treats the register as the record rather than as a report. Quote the
string an entry is about. Do not paraphrase three sites into one description.

**ANSWERED, 22 Aug 2026. The test is what the string COUNTS, not which page it sits on.**

> A count of the **member** — their position, their progress, their completion — is prohibited
> on every surface without exception.
> A count of the **library** — what exists, what has not been opened — is permitted, because it
> describes a shelf rather than a person.

The first phrasing of this answer was page-based: prohibited on the surfaces a member practises
on, permitted on the dashboard. **That phrasing is what produced the mislabel above**, because it
invites you to sort strings by their address instead of by their subject — and the cover ribbon
sat on the permitted page while counting the forbidden thing. Dropped deliberately. Do not
reintroduce it.

Applied: [[SR-191]] removed the three sites that counted the member, two of them on the
dashboard, and left the two that count the library, both on the dashboard.

**Andre's call.** Once answered it is a small, mechanical change on both files, and the answer
should be written into the content rules so the next run does not re-raise it.

⚠ Note for whoever picks this up: `dashboard.html`'s single `min read` hit is inside a comment
guarding [[SR-080]] and is **not** a violation — counting it as one is the Rule 21 failure mode.
`resource.html`'s `read:` fields are empty strings but for one `'7 options'`, which is a count of
options, not a duration. The ten `N min` hits in `index.html` are the 60-minute 1:1 and workshop
product specs. None of those three is in scope here.

*Status:* open — blocked on a scope decision · *Raised:* 22 Aug 2026

---


### SR-053 · Frameworks fold promoted to a /method rail destination
"Where the method comes from" is removed from the dashboard and becomes a rail
destination at `/method`, with the six frameworks to follow as their own pages. The fold
markup, its initialiser entry and the section are gone; a rail button sits between The
Life Laboratory and Sessions & workshops; `ROUTES` carries the entry; and each resource's
`Rests on:` line in the twelve-resource reader now ends with a `Read the framework →`
link, handled by a `[data-route-link]` branch in the click handler. Until `/method`
exists both open the route layer, as every unbuilt destination does.

Verified: 9 rail buttons with `method` sixth, between `laboratory` and `coaching`; no
`#srFoldMethod` or `.sr-dash-sixgrid` anywhere in the page; the rail button and the
in-reader link both open `mRoute` without navigating away.

*Status:* complete · *Raised:* 18 Aug 2026

### SR-044 · Member dashboard integrated into the repo
Adds `dashboard.html`, `protocol.html` and `resource.html`. Styles extracted to
`css/saferise-dashboard.css`; hero image extracted to
`assets/dashboard/hero-corridor.jpg`. `index.html` untouched.

Two defects found and fixed during integration:
- Surplus `</div>` after the footer put div balance at −1.
- Selecting Elevation Series retained the previous track's paywall CTA
  ("Professional Performance is not on your plan yet… ADD FOR €49 / MONTH"), because
  the empty-track branch returned before the CTA-clearing block.

**Both recurred in v41 and were re-applied.** The design source is regenerated from a
base that predates this register, so neither fix survives a new drop. The surplus
`</div>` and the Elevation Series paywall both came back and were fixed again during
the v40/v41 integration. Any future dashboard drop should be checked for both before
anything else — the div balance check catches the first, and cycling all four track
tabs catches the second.

**Correction to the integration handoff.** The handoff states that
`scroll-behavior:auto` is "pinned on the viewport because the page sets
`html{scroll-behavior:smooth}` globally, which was competing for the same
property." No such declaration exists on `.sr-dash-carviewport`, and none is
needed: `scroll-behavior` is not an inherited property, so the rule on `html`
never reached the viewport. It computes to `auto` as the initial value. The
carousel's behaviour is correct and unchanged — only the stated mechanism was
wrong. The element is `overflow:hidden` and never scrolls in any case.

*Status:* complete · *Raised:* 17 Aug 2026 · *Merged:* 17 Aug 2026

### SR-049 · 335 orphaned CSS rules removed from the dashboard stylesheet
`css/saferise-dashboard.css` carried whole components whose markup was cut from the
design before integration: the Clearing panel, the Protocol Foundation band, the
Reflection lab, "Understanding SafeRise", older Begin/Resume/Hero variants, and the
`sr-proto-*` internals that styled the protocol page back when it was inlined rather
than iframed. Also the four `sr-dash-heroart` / `herocard` / `herogrid` / `heroscrim`
leftovers orphaned by [[SR-046]].

A rule was removed only when **every** comma-separated part of its selector names at
least one class absent from `dashboard.html`. A part naming no class at all
(`section`, `h1`, `body.reading`) counts as live.

**An earlier count of 343 was wrong.** It tested the union of classes across the whole
selector, which marks `.live, .dead` dead on account of `.dead` alone. Eight rules were
rescued by switching to per-part testing, among them the ALIGNMENT block's
`.sr-dash-jcols > .sr-dash-jcol:first-child, …` and the `body.shifting …` reading-mode
transition — both live, both would have been deleted. The audit is sound only because
no class name in this file is built by concatenation; the single dynamic case,
`className = 'sr-dash-carrow ' + t.cls`, takes `t.cls` from string literals present in
the file.

Three `NEEDS ART` markers sat inside the declaration blocks of removed rules and were
carried over to a labelled block near the top of the file rather than deleted with
their rules — the pangolin illustration in particular is still live outstanding work.
The total of 15 across both files is unchanged.

335 rules, 33.0 KB, and 8 emptied `@media` blocks plus 1 emptied `@supports` block
removed; stylesheet 99.5 KB → 67.2 KB. Verified with the stylesheet swapped in place
on a single page load, hero slide pinned to remove slider rotation as a variable:
page height, both alignment lines, `--pad`, and hero / Begin row / carousel / card /
footer heights are **byte-identical at 1440, 1100 and 390**, with zero horizontal
overflow and zero slide/toggle overlap at 390.

*Status:* complete · *Raised:* 17 Aug 2026 · *Merged:* 17 Aug 2026

### SR-061 · No single content source; every page held its own copy
`content/tracks.js` lands as the one record of PRICING, SHARED, TRACKS, STATES,
FRAMEWORKS, META, LIFE_LAB and `frameworkReach()`. Pages read it; pages never author.

Validated with JavaScriptCore (`jsc`, ships with macOS) rather than `node --check` —
node is not installed on this machine, so the handoff's validation gate could not run
as written. All three live tracks carry ten protocols, six own FAQ items and complete
cost/range/journey/change records. The approved mockup's Appendix C claims those fields
are Track 01 only; that appendix is stale and the delivered data is complete.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-062 · One track template, three routes
`personal-transformation.html`, `relationship-healing.html` and
`professional-performance.html` are thin shells over `js/saferise-track.js`, differing
only in the track id they pass. Eleven beats in the mockup's fixed order; the scope
block is unconditional.

Namespaced `sr-tp-`, not plain `sr-`: five template class names (`.note` `.on` `.scope`
`.sechead` `.pbody`) already existed under `sr-`. `.gold` keeps its literal name — it is
embedded in sixteen spans of copy inside the content source.

Covers are path references, verified 10/10 loading per track. No inline base64. Art is
unproduced, so every image slot renders its `track.art` brief as a labelled placeholder
and the pages are correct with zero art present.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-063 · Dashboard carried its own TRACKS, TRACKNAME and TRACKPRICE
All three duplicated the content source and all three had drifted — `TRACKPRICE` said
t2 €29 / t3 €49, the retired tiers. The local record is renamed `DASHTRACKS`, since
`content/tracks.js` owns the global `TRACKS` and shadowing it would give the two files a
silent disagreement. Accent token, theme class and plan entitlement stay local: those
are facts about a viewer, not about a track.

`RES` and `SOURCES` are deliberately retained. They are not duplicates of
`SHARED.resources` — both hold twelve entries but only four names overlap, and `RES`
carries per-resource "why" copy that exists nowhere else. See [[SR-067]].

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-065 · Stale strings repo-wide, and Track 03 still on a waitlist
`Crisis Card` → `Cue Card` (22), `Life Companion` → `Somatic Release Activities` (59),
`Career & Performance` → `Professional Performance` (4), all in `index.html`. Verified
safe first: `KIND_CLASS` keys on eight resource kinds, none of them these, and the
reader's only `kind` comparisons are Founder Video, Protocol Guide, Reference Case and
Safety Score.

`SERIES_CONFIG.corporate` loses its "Track 03 · Coming Soon" badge and its Join Waitlist
CTA now points at `corporate-protoList`, which already holds ten protocols. The
"content is in production — join the waitlist" sentence is deleted rather than reworded,
being a claim that is no longer true.

The Life Laboratory count in the dashboard's route table said "seven stages"; `LIFE_LAB`
holds eight. Now derived. Note there is **no stage rail** anywhere in this repo — that
one sentence was the only place the count appeared.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-066 · Framework protocol counts on the About page were hand-tallied
Every one of the six was wrong: Porges 21→16, HeartMath 21→7, Dispenza 15→6,
Maté 15→14, Jung 15→11, Watts 10→7. Now read from `frameworkReach()` over `META` at
load, along with the `+N more` overflow pill which carried the same bad arithmetic.

Five cards on that page — Mooji, David Bayer, Peter Levine, Kübler-Ross, Weller — have
no key in `FRAMEWORKS`, so there is nothing to derive them from. Left untouched.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-067 · Resource reader and content source name different resources
`SHARED.resources` and the dashboard's `RES` both hold twelve entries, but only four
names match: Cue Card, How This Works, Source Insights, Reference Case. The reader has
Guided Experience, Breathwork, Progress Journal, Progress Tracking, Protocol Guide,
Attention Advisory and Disclosure & Invitation; the content source has Guided
Meditation, Why I Built This One, Somatic Release Activities, Safe Practice, Proximity
Guide, Disclosure & Support and Invitation to Repair.

The track pages promise the content source's twelve. `RES` additionally carries
per-resource "why" copy with no home in `tracks.js`, so this cannot be resolved by
deleting either side — it needs a decision about which set of twelve is real.

*Status:* open · *Raised:* 19 Aug 2026

### SR-068 · Protocol Library, Your Record and Journal still in nav
Three nav destinations with nothing behind them. Removing the markup is only half of
it: the dashboard resolves in-page links by their text through `TEXTMAP`, so a route
stays reachable from any link carrying matching text even after its button is gone.

Removed the icon-rail buttons, the "Protocol Library" and Journal links in the top
nav, the three `ROUTES` entries, and every `TEXTMAP` row resolving to one of them —
`/full archive|in the archive/` and `/try source insights/` (record), `/all entries/`
(journal), `/browse your library/` (library). The last two matched no control text
anywhere in the markup and were already dead.

"My Journey" is a separate route and was not named by this item, so it stays.
`/write an entry/` → `entry` (`/journal/new`) also stays: SR-071 moves writing to the
protocol page, which leaves that control pointing at a concept that no longer exists.
Flagged rather than changed — it was not in scope.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-069 · Life Laboratory out of production until the Elevation Series
Every surface removed — rail button, `ROUTES` row, `TEXTMAP` row, identity card, and
the `sr-dash-identity--three` modifier and `sr-dash-idcard--lab` rule that existed only
for it. `SR_NUMWORD()`, added by SR-065 solely to word the stage count in that route
copy, went with them.

Done in the order agreed in Phase 0.2, option 1: reads removed first, confirmed at zero
by grep, and only then the object commented out in `content/tracks.js` — headed with
the reservation, the canonical eight-stage list including LEARN, and the rule that
`caveat` is never omitted from a surface showing the stages. `extension` and `caveat`
stay inside the block. Line comments, not a block comment: the object carries block
comments of its own. Removed from `module.exports`, which throws on require otherwise.

The `LIFE LABORATORY` header in `css/saferise-dashboard.css` had drifted — most of the
rules under it (`.sr-dash-readsrc`, `.sr-cadence`) are unrelated and live. Only the
Life Laboratory rules were removed, `.sr-lab` among them, which had no markup anywhere.

`method.html` and `method-porges.html` keep their laboratory rail button until SR-075
on `feat/method-updates`. Until that lands, the removal is incomplete on those two
pages.

*Status:* complete on merge, pending SR-075 for the two method pages · *Raised:* 19 Aug 2026

### SR-070 · Modal shell — one layer, three views
Record, Journal and Sessions render into a single `#mLayer` dialog driven by the same
`openModal()`/`closeModals()` pair as the six booking modals. `openModal` now takes a
view key and sets kicker, title, lede, art class and footer from a `VIEWS` config;
`openRoute()` no longer opens `#mRoute` itself but calls through the same function, so
scroll lock and focus handling live in one place. `closeModals()` restores focus to the
opening element — behaviour the old controller never had.

Two mockup selectors were deliberately not shipped. `.sr-modallabel` already exists and
is reused. `.sr-arrow` is already a 46px circular carousel button in
`saferise-system.css`, which loads last and wins by cascade, so the state-shift glyph is
emitted as bare text — the same class of collision as `.track` and the video scrubber.
The `.sr-dot` state modifiers are namespaced rather than the mockup's bare
`.d-mob`/`.d-shut`/`.d-safe`.

Helpers are `srEsc`/`srFmtDate`/`srShift`/`srEmpty`: the dashboard IIFE already has an
`esc()` for the track renderer that escapes only `&` and `<`, and a second
`function esc` would have replaced it for the whole scope.

The third stat card ships as `Most run / <protocol name>`, counted from logged runs. The
mockup's "Early signs / Where you land" is a tier the page cannot compute from local
data. "Build a protocol report" and "Open the full archive" are gone with the `report`
route; two further controls stranded by the SR-068 route removals were repointed at the
record and journal views rather than left dead.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-071 · Journal entries on the protocol page never persisted
The write block on `protocol.html` wrote to the DOM only — the entry vanished on reload
and never reached the dashboard. Now appends to `sr.journal.entries` through the same
`Store` adapter: read, push, write, never assigning a fresh array over the key.

Entries carry the full schema. `protocolId` (`t1-p01`, following the track/protocol key
already used for cover paths) is the join key the Journal view filters on, while display
groups on `protocol`.

`before`/`after` ship as null. The log on that page measures activation 0–10; the shift
row names a nervous-system state. They are not the same measurement, and mapping one
onto the other would be invention. Whether those two readings should be reconciled is
an open decision.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-072 · Sessions view — booked dates, no provider chosen
Shipped inside the SR-070 commit rather than its own: the sessions view is one of the
three bodies the shell renders, and there was no code to separate from it. Recorded
here so the ID stays traceable.

Booked dates only — booking itself stays with the third-party tool. Zoom and Calendly
are both still open, so the dashed `.sr-provider` block ships as the mockup has it,
naming the open decision. Nothing embeds either widget, loads either SDK, or calls an
API against a provider that has not been picked.

`sr.sessions.booked` has no writer anywhere in the repo, so the empty state is what
every member sees on day one. It reads as correct rather than broken, and the provider
block sits below it.

Reached from the "Sessions & workshops" rail button, through a `LAYERS` map inside
`openRoute()` rather than a `data-modal` on the button — the rail has its own click
listener that calls `openRoute()` for every rail button, so a `data-modal` there opens
two layers at once.

Verified in Chromium at 1440 and 390: empty state by default, and seeded data renders
the confirmed and awaiting-link states.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-076 · Method pages, rendered check
Chromium, 1440 and 390, both pages, Midnight and Sunrise. No console errors, no
horizontal overflow at 390, and the rail collapses to the bottom bar as designed.

**Measurement.** At 1440 every top-level enclosure sits on x=111 and body text on
x=141, as specified. Two classes of element sit 1–2px inside that, and both were
traced rather than padded back:

- `.sr-mi-claim`, `.sr-mi-veh` and `.sr-mi-note` carry `border:1px`, so their text
  starts at 142.
- `.sr-fw-limit` carries `border-left:2px`, so `.sr-fw-rests` lands on 113 and its
  text on 143.

Both rules are byte-identical to the mockups, so nothing was lost in the port — the
111/141 rule describes elements that are not nested inside a bordered container.

**Step rail.** Confirmed on the peer band from a live IntersectionObserver fire:
01, 02 and 04 lit, 03 unlit, railnote correct. The clinical and interpretive states
were confirmed by asserting the same mapping `light()` applies and reading the DOM
back — `all` puts every step into `.beneath` with `border-left-style: dashed`.

*Not fully settled in this harness.* The preview pane reports `document.hidden = true`
even when fronted, so IntersectionObserver only delivers when a screenshot forces a
composite, and `.sr-mi-step` transitions `opacity` and `border-color` over .45s — with
no frames being produced, `getComputedStyle` returns mid-transition values. The class
logic is proven; the settled *visual* states for the clinical and interpretive bands
need a real browser. Deep scroll offsets also return blank screenshots on both pages,
which is why every capture above was taken near the top of the document.

*Status:* complete on merge, visual rail states need a Safari pass · *Raised:* 19 Aug 2026

### SR-074 · Method page content deltas
Both pages diffed against the Desktop mockups and content applied only; structure, the
extracted stylesheet and the `soon` states are untouched. The repo was not where the
handoff described it — `method.html` was already clear of Dispenza and of "Where the
evidence stops"; `method-porges.html` was the page still holding the split columns.

Index: a third peer card (03 Distance & rehearsal, Kross & Ayduk), Maté 03→04, Jung
04→05, Dispenza deleted, `data-steps` 01,02→01,02,04 and 04→all with the `.beneath`
rail state, the breath-cycle SVG on the ≈6 claim, the five-voice footnote block, the
guided-meditation section with its image slot, and the founder-note side column
replaced by one affiliation line in the footer. Porges: section 04 rewritten as five
findings in a single `.sr-fw-rests` list, the 2026 dispute carried by one closing
paragraph.

`.sr-fw-split` / `.sr-fw-splitcol` confirmed orphaned before removal — the only markup
using them was the section this item replaces. `.sr-mi-noteside` went with the side
column.

Deliberate divergences: the five unbuilt framework pages stay `soon`, so the mockups'
"Read the page" links and the porges pager's HeartMath tile are not adopted — either
would have shipped a dead link. `rg "we do not claim"` still matches once, inside the
TEMPLATE REGION 5 comment the handoff says to port verbatim; it is a comment and
renders nothing.

Left open: `FRAMEWORKS.dispenza` and seven `META[].frameworks` references remain in
`content/tracks.js`, so `frameworkReach('dispenza')` returns protocols pointing at a
framework with no card and no page. The data layer was out of scope for this item.

Also open: the index hero still reads "three of them research, three of them ways of
seeing". After the reshuffle the six are three peer-reviewed, one clinical and two
interpretive, so the second half is wrong. The mockup carries the same line, so this
was flagged rather than silently rewritten — it needs a decision, not a guess.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-075 · Method rails still linked to four deleted routes
Both pages carried a copy of the dashboard rail taken before SR-068 and SR-069.
Protocol library, Journal, Your record and The Life Laboratory were live on both and
every one pointed at a route that no longer exists, so the buttons dropped the member
on dashboard.html with nothing matching what they clicked. All four removed; the
remaining set, order and wiring are identical to the dashboard.

The Cue Card button carries `data-modal`, not `data-route`, and was being caught by the
`|| 'dashboard.html'` fallback. Going to the dashboard is right — the crisis modal only
exists there — so it now says so in a comment instead of happening by omission. Same
root cause as SR-083.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-077 · Twelve resources to nine
`SHARED.resources` is now exactly the nine specified. Why I Built This One removed from
tracks.js, the dashboard RES strip, protocol.html (where it was live as "Why this
protocol exists") and the resource.html reader. Source Insights merged into How This
Works, which keeps "Why it works" as its subtitle and now carries the framework
attribution on every surface, including the dashboard `SOURCES` map. Reference Case
removed entirely — it was live on protocol.html naming a specific living public figure
and attributing a psychological pattern to her, which is what put this cut first.

Two consequences handled rather than left: the dashboard suggestion pointing at Source
Insights now names How This Works, and resource.html's hardcoded `n:'NN'` numbering —
which also supplied the "N of M" total from the last record — is derived from position
and length instead. Cutting two records had left the rail reading 02, 03, 05, 06, 07,
08 and the summary claiming "of 08" for a six-item list.

A third surfaced only on rendering: the reader opened on `var current=6`, an index that
no longer existed, so `renderMain()` threw before painting. The opening resource is
named now and its index looked up, with a clamp so a future cut cannot repeat it.

Left open: the merged How This Works body in resource.html still names Dispenza, which
SR-074 removed as a framework card.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-078 · Resource counts are derived
The word "nine" is not written anywhere. The three hardcoded twelves in tracks.js are
gone, `resourceCount()` in the track renderer now matches the spaced form as well as
the hyphenated one — "each with twelve resources" had slipped past it and gone stale on
its own — and `priceList` is passed through it, having rendered raw.

`protocolResources(key)` / `protocolResourceCount(key)` sit next to `META`. The
Proximity Guide and the Invitation to Repair are conditional on `META[].extras`;
`extras:null` means UNVERIFIED, not none, so null and `[]` both yield the unconditional
set. A protocol carrying neither shows seven, which is exactly why a hardcoded number
would have been wrong on every T2 and T3 protocol.

The dashboard fold title is set from `SHARED.resources.length` at load.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-079 · The three-column Get Started block
Renders from two places — `dashboard.html`'s `JOURNEY` and `TRACKS[n].journey` in
tracks.js, which the track pages draw on. Both were stale the same way and both were
fixed. Column 1 no longer names "the Protocol Foundation Meditation" or states a
length; column 2 was correct and untouched; column 3 was already corrected by SR-077
and SR-078. Structure, headings and tone unchanged.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-080 · No page states a session length
The rule applies site-wide, not just to `method*.html`. Every stated or implied
meditation length is gone from `content/tracks.js`, `js/saferise-track.js`,
`dashboard.html`, `protocol.html` and `resource.html`, including all nine JOURNEY
metadata strips, which were removed outright rather than trimmed. Players keep their
elements and lose their numbers — the dashboard bar, both protocol scrubbers and the
reader scrubber render empty and fill from the media once real files exist. No
placeholder was substituted.

Two things the greps could not have caught, both found by looking at the rendered page:
"Ten guided minutes" in the Clearing modal, which the acceptance regex does not match;
and the hero rendering the literal word "undefined" after the article slide lost its
"2 min read", because that field was concatenated unguarded.

Kept deliberately, and reported rather than hidden: workshop clock times
(18:00–20:00), the Premium 1:1 slot times and "90 min", "Ninety minutes, online",
"Two hours", the workshop agenda (15 / 40 / 45 / 20 minutes) and the 48- and 72-hour
cancellation windows. These are booked live events with a human on the other end;
their lengths are contractual and already known, which is the opposite of the
unrecorded meditation assets the rule exists for. "Six breaths a minute" is kept as
well — it is a rate, and the one specific empirical claim SafeRise makes.

`docs/reference/portal-personal-target.html` is excluded by decision: it is a stored
snapshot, and editing it would stop it being an accurate record of that page.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-081 · Journal shift row rendered for data that never arrives
Checked first, as specified: the arrival check-in state is not available in scope on
`protocol.html`. Its "Preview as" statebar is a prototype viewer control, labelled in
the markup "Mockup control — not part of the build"; the only state words on the page
are the slider endpoints Settled and Peak alarm on a 0–10 activation scale; and the
dashboard's arrival field is free text on another page, matched against `STATES` only
to suggest a protocol and never stored per session.

The repo also carries two incompatible state vocabularies — `STATES` is Agitated /
Unsteady / Numb, the shift row uses Mobilised / Shutdown / Settled / Braced / Present.

So the second branch applies: `before`/`after` stay null and the row is removed from
the Journal view. Activation and nervous-system state are different measurements and
mapping one onto the other would be invention.

The Record view keeps its shift row, which this item does not cover — though
`sr.record.runs` has no writer either, so it is equally unpopulated in practice.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-082 · Dead "Write an entry" control
`/write an entry/` resolved to the `entry` route at `/journal/new`, a route that does
not exist and a concept that stopped existing when SR-071 moved writing onto the
protocol page. Control, route and TEXTMAP row removed. Removed rather than repointed:
a control labelled "Write an entry" opening a read-only journal would have been a
second wrong answer.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-083 · Cue Card rail button opened two modals
Pre-existing, reproduced at `0c16c84` during the modal-shell pass and logged then
rather than fixed. The rail listener called `openRoute(data-route || 'dashboard')` for
every rail button; the Cue Card carries `data-modal` and fell to that default, opening
`mRoute` while the `[data-modal]` handler opened `mCrisis`. One click, two layers.

A rail button with no `data-route` is not a route — the listener returns early and
leaves it to whichever handler owns it. It also no longer takes the rail's active mark,
since the Cue Card is a layer over the current page rather than a destination.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-084 · index.html still carries the cut resources and every duration
Deferred from the SR-077 / SR-080 pass by decision, so the public page lands as one
reviewable change rather than buried in a ten-item consolidation. Nothing in
`index.html` was touched.

Inventory as of this branch:

- **Reference Case** — 50 literals and 205 `refcase` references, spanning
  `RESOURCE_CONTENT`, the `STORIES` prepare() wiring, `RES_META`, carousel copy and
  roughly fifteen dedicated CSS blocks. Includes named public figures in body copy,
  which is the specific risk that put the cut first.
- **Source Insights** — 32 literals, plus the six-perspective editorial grid and the
  four "visual chapters" CSS.
- **Why I Built This One** — 2 literals plus the `p1-story` hero tab.
- **Durations** — 80 strings matching the SR-080 acceptance pattern.

The acceptance greps for SR-077 and SR-080 will keep matching `index.html` until this
lands. That is expected and was reported, not hidden.

*Status:* open · *Raised:* 19 Aug 2026

### SR-085 · Dashboard showed fabricated member data
The page rendered a populated practice belonging to nobody, to every visitor, with
empty storage: twenty sessions logged, a twelve-bar before/after chart, an arc dot
marking where the last session finished, "Fourteen entries · about 2,100 words since
June", two dated entries, four recurring themes, a Chosen Self last revised 2 August,
four decisions recorded, and three suggestions citing entries nobody had written. The
Record modal on the same page read "Nothing logged yet", so the page contradicted
itself and the honest half was the modal.

Every surface in Your record now computes from `Store` or does not appear, reusing
`srEmpty` rather than introducing new empty states. Where the platform records nothing
the surface is removed rather than estimated: entry themes have no tagging behind them,
and minutes-to-settle is not recorded anywhere. Bar height is the state band the arc
legend already names, not an invented score — there is no numeric rating in the record
and adding one would have been the same defect in a new place.

Two surfaces not in the original list were fabricating the same way and were fixed with
the rest: the suggestions panel, and the "Where you left off" card above the fold, which
claimed the member was on "Resource 07 of 08 · The Decision" with an 87% progress rail.
Nothing writes `sr.resume` yet, so it follows the pattern already set for
`sr.sessions.booked` — the empty state is what every member sees on day one.

Found by rendering, not by grep: the arc dot carried `hidden` and stayed painted,
because the UA sheet's `[hidden]{display:none}` does not reach children of an `<svg>`.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-086 · Cue Card removed from the rail
The Cue Card is protocol-specific — four lines drawn from the protocol being run. With
no protocol in context the rail button showed the wrong card, and from the method pages
it did not even do that: those rails carry no `mCrisis`, so `PAGES[null]` fell through
to `dashboard.html` and the click bounced there, needing a second click to open.

Removed from all three rails with its wiring: the SR-083 guard for a routeless rail
button is gone, since every remaining button is a destination carrying `data-route`.
The card stays on `protocol.html`, and `mCrisis` stays reachable from the dashboard
resources strip, which is a real resource entry rather than a global control.

`LAYERS` was kept. Its comment attributes it to the Cue Card, but it is what lets
`coaching` be a rail destination that opens a view while keeping the active mark —
still needed, and needed more now that the routeless-button guard is gone.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-087 · Three dashboard controls going nowhere
The Chosen Self and Your Decisions were `<a href="#">`, so both advertised
`dashboard.html#` on hover and reached `openRoute()` only by matching their own label
text in `TEXTMAP`. Now `<button data-route-link>`: no false URL, and the route no longer
depends on the visible copy staying the same.

"Run a protocol" carried only `data-close`, so the one control in the Record empty state
did nothing but shut the modal it was written in. `srEmpty` now takes a destination — a
`.html` dest renders a real link, anything else is a `MODALS` key. Fixed in all three
empty states, not just the named one: Journal and Sessions were dead the same way.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-088 · Protocol names double-escaped to a literal `&amp;`
The entity lived in the data, not the renderer. `content/tracks.js` stored twenty
strings with HTML entities baked in, because `js/saferise-track.js` injects them raw.
The dashboard carousel escapes properly via `esc()`, so it escaped the escape.

Fixed at source: the data holds plain text, and the entity- and tag-preserving `esc()`
that the track renderer already defined but never called is wired at the ten sites that
consume those fields. It leaves `<br>` and `<span class="gold">` alone, which is why it
was written that way and why it is safe on fields carrying markup.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-089 · Dispenza was half-deleted from the framework data
Framework 05 was cut from `method.html` and replaced there by Distance & rehearsal, but
`content/tracks.js` still carried `FRAMEWORKS.dispenza` and six `META[].frameworks`
references. `frameworkReach('dispenza')` returned six protocols pointing at a framework
with no card and no page. Note the original report said seven references: it is six
`META` entries plus the record itself.

Replaced rather than deleted, by decision. Deleting would have left `FRAMEWORKS` at five
records while every surface says six sources, and dropped real attribution from six
protocols. The record is now Distance & rehearsal — Kross & Ayduk, Best Possible Self,
register peer-reviewed, step 4 — and record order now matches method.html's 01–06 cards.

`resource.html`'s How This Works named Dispenza on a member-facing surface. Rewritten to
describe the mechanism and move it into the measured band, leaving Jung as interpretive.

**Not closed:** `index.html` still carries twenty references including a full Dr. Joe
Dispenza expert bio whose counter is driven live by `frameworkReach` via
`data-sr-reach="dispenza"`, which now resolves to zero protocols. That file is SR-084
and deliberately out of scope, so `rg -ni "dispenza"` cannot come back clean until it
lands. Expected and reported, not hidden.

*Status:* complete on merge, with the index.html remainder open under SR-084
*Raised:* 19 Aug 2026

### SR-090 · Method index hero stated a split that is no longer true
"Three of them research, three of them ways of seeing." After Distance & rehearsal was
promoted into the peer-reviewed band the six are three peer-reviewed, one clinical
practice, two interpretive — wrong on the page whose whole argument is evidentiary
precision. Count dropped rather than restated: the register chips and three band headers
already say the split three ways, and a count in prose is a fourth place to drift. The
mockup in `docs/reference` carries the same stale line and was left alone, not copied.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-091 · Sessions and workshops pricing contradicted itself
`PRICING.workshop` held €29 — Track 03's monthly price, never a workshop price — so the
block advertised "from €29" directly above its own bullet reading Personal €59 ·
Relationship €139. One key could never have been right: workshops are priced per format.
Replaced with `workshopPersonal` €59 and `workshopRelationship` €139; the block reads
"from €59". Premium 1:1 was €275 hardcoded in four places; added `PRICING.premium` and
bound it. Twelve `data-sr-price` nodes, no euro amount left in the markup.

Durations kept — booked live events with a human on the other end, contractual and known.

Audited the rest of the record as asked: `t1`/`t2`/`t3` are each attached to the track
they are named for, and Elevation is priceless and hidden. `workshop` was the only key
named for one product and used for another.

`premium1` (€129/hr) and `premium3` (€299/3hr) left exactly as they were — SR-057 is an
open decision. Nothing in the repo renders either one; noted beside them in the data so
the next reader does not assume they are live.

**Remainder, no ID left in the reserved block:** `protocol.html` carries its own booking
block with €275 hardcoded twice. It cannot bind, because it does not load
`content/tracks.js` at all — so making it match the dashboard means giving that page the
pricing record first. Out of scope here, which was the dashboard block, but it is the
same defect and the same €275 that SR-091 was raised for.

*Status:* complete on merge, with the protocol.html booking block outstanding
*Raised:* 19 Aug 2026

### SR-092 · Dead links on the method pages — audited, none found
Every `href` on both pages resolves to a file that exists, all five unbuilt frameworks
are `<div class="soon">` rather than anchors, and neither page carries an `onclick`.
No change was needed; the item is closed as verified rather than fixed.

One adjacent gap found and **not** fixed, as it is outside this item: the method rails'
`coaching` and `account` buttons navigate to `dashboard.html` without opening the view
they name, because `PAGES` has no entry for either and the default is a bare redirect.
That is the same shape as the Cue Card bounce closed in SR-086 and needs its own ID.

*Status:* verified, no change · *Raised:* 19 Aug 2026

### SR-093 · Performance and layout shift — measurement
Profiled rather than optimised, per the item. No fix applied.

**Page weight, as served**

| page | doc | render-blocking in `<head>` | notes |
|---|---|---|---|
| `protocol.html` | 4.58 MB | 2.31 MB | `<body>` does not open until byte 2,417,113 — 50.3% into the file |
| `index.html` | 1.36 MB | 199 K inline CSS | 532 K inline JS |
| `resource.html` | 220 K | 127 K inline CSS | 83 K inline JS at 60% |
| `dashboard.html` | 118 K | 242 K external CSS | + 60 K `tracks.js`, + 1.5 MB of covers |
| `method.html` | 30 K | 35 K external CSS | cheapest page in the repo |

**Where protocol.html's 4.58 MB actually is:** two base64 PNGs, and nothing else of
consequence. One is 1086×1448px / 1.69 MB, embedded as a `url()` inside the head
`<style>` — so it is render-blocking. The other is 2172×724px / 1.68 MB as an `<img>`
in the body. Both are photographic content stored as PNG.

**The reflow is the webfont swap, not late CSS.** The stated hypothesis was
partially-styled content rendering before CSS resolves. That is not what happens: every
stylesheet on `protocol.html` is in `<head>` and blocking, so there is no window in
which unstyled content paints. The Google Fonts link carries `display=swap`, and the
measured metric gap is large:

| face | fallback width | webfont width | shift |
|---|---|---|---|
| Cinzel | 576 px | 775 px | **+34.6%** |
| Cormorant Garamond | 629 px | 551 px | −12.5% |
| DM Sans | 638 px | 658 px | +3.0% |

Cinzel sets every heading. Headings paint at fallback width and then jump a third wider
when the face arrives — "paints at one width and then reflows", exactly.

**Not measured, and why:** the preview pane keeps the page `document.hidden === true`,
so Chromium emits no `paint` entries and records no `layout-shift`. Time to first paint
and CLS could not be captured here and need a visible browser. Parse timings on
localhost were: `protocol.html` domInteractive 193 ms against 38 ms responseEnd — 155 ms
of it parsing; `dashboard.html` 83 ms; `resource.html` 33 ms; `method.html` 17 ms.

**Recommendations, logged as SR-094 and SR-095 below.** Two further findings need IDs
beyond the reserved range and are recorded here rather than left in a run report:
`dashboard.html` loads `saferise-system.css` *before* `saferise-dashboard.css`, against
the rule in CLAUDE.md that the system sheet loads last (blast radius is one class,
`.sr-cover`, but the ordering is wrong); and the dashboard requests all ten protocol
covers, ~1.5 MB, without `loading="lazy"` on the below-fold ones.

*Status:* measurement complete · *Raised:* 19 Aug 2026

### SR-094 · protocol.html carries 4.5 MB in two embedded PNGs
Extract both to `assets/`, convert to JPEG or WebP, and size them to the box they are
drawn in. At their rendered dimensions these are roughly 100–250 K each, so the page
goes from 4.58 MB to under 500 K — the largest single win available in the repo. The
head one matters twice over: it sits inside a `url()` in the render-blocking `<style>`,
so 2.26 MB of base64 must be parsed before the stylesheet can be used at all.

Not done in the SR-093 pass because the item asked for measurement only, and because
moving an image out of a data URI changes what the page requests at runtime — it wants
its own before/after render, not a drive-by edit.

*Status:* open · *Raised:* 19 Aug 2026

### SR-095 · Heading reflow on every page from the Cinzel swap
`display=swap` plus a 34.6% metric gap between Cinzel and its `serif` fallback means
every heading on the site paints narrow and then jumps. Options, cheapest first: add
`size-adjust` / `ascent-override` metric overrides on an `@font-face` for the fallback
so the two agree; self-host the three faces and preload the Cinzel weights actually used
(400 and 500); or accept the swap and stop the jump mattering by not sizing anything off
heading width. Measure with a visible browser — see the note in SR-093 about why CLS
could not be captured in the preview pane.

*Status:* open · *Raised:* 19 Aug 2026

### SR-104 · Method rails land on the dashboard without opening what they name
Found during SR-092 and recorded there for want of an ID. On `method.html` and
`method-porges.html` the rail's `coaching` and `account` buttons navigate to
`dashboard.html` and stop. `PAGES` on those pages holds only `method` and `dashboard`,
so both fall through to a bare redirect and the member arrives at the dashboard with
neither the Sessions view nor Account open.

Same shape as the Cue Card bounce closed in SR-086: a control that names a destination
and does not reach it. The dashboard already routes both through `openRoute`, so the fix
is a deep link the dashboard reads on load rather than new wiring on the method pages.

*Status:* open · *Raised:* 19 Aug 2026

### SR-105 · dashboard.html loads the system stylesheet before the dashboard one
Found during SR-093. `dashboard.html` loads `css/saferise-system.css` and then
`css/saferise-dashboard.css`, against the rule in CLAUDE.md that the system sheet loads
last and wins by cascade order rather than `!important`.

Blast radius today is one class, `.sr-cover`, which both files define — so the dashboard
copy currently wins where the system copy should. Small, but the ordering is wrong and
the next shared class will be a silent regression rather than a visible one. Swapping the
two lines is not trivially safe: it changes which declaration wins for any overlapping
selector, so it needs a render pass, which is why SR-093 measured it and left it.

*Status:* open · *Raised:* 19 Aug 2026

### SR-106 · Ten protocol covers load eagerly on the dashboard
Found during SR-093. The dashboard requests all ten covers — roughly 1.5 MB — with no
`loading="lazy"` on the below-fold ones. Only the first two or three are visible before
the carousel is scrolled.

Note the covers carry their kicker word and number inside the image, so they cannot be
swapped for a text overlay; lazy-loading is the whole fix.

*Status:* open · *Raised:* 19 Aug 2026

### SR-096 · Dispenza on index.html
Live regression from the SR-089 merge. `FRAMEWORKS.dispenza` was replaced by `distance`,
and index.html's expert card reads its count from `frameworkReach()` through
`data-sr-reach="dispenza"` — so the public page rendered "Contributes insight to 0
protocols". Reproduced in the browser before anything was touched.

53 occurrences, not the ~20 the line count suggested: lines 4009 and 4022 are
single-line JSON blobs carrying the same strings nine times over.

The `.expert-card2` bio and the `.sci-card` in the science strip were removed whole.
Both grids drop six to five and reflow 3+2; they are `auto-fit`, so the five keep full
width and the empty cell reads as whitespace.

**Deviation, easy to overturn:** the framework *lists* keep six. Dropping to five would
contradict method.html's "Six sources, one sequence" and the six records still in
FRAMEWORKS — the drift SR-089 and SR-090 were raised to end. The name became the
mechanism instead, "Mental rehearsal", which `SHARED.fourSteps` already uses for step 4,
so nothing was invented and no count changed. "the Quantum Field" attributions went with
the name rather than being reworded: that framing is his, not the method's.

**Not closed:** no card now carries the step-4 distancing framework that replaced him.
Logged as SR-107.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-097 · Reference Case, Source Insights and Why I Built This One on index.html
Taken in the order the handoff set, Reference Case first.

**Reference Case** assigned a psychological pattern to 30 named, identifiable people —
Monica Lewinsky, Simone Biles, Lady Gaga, Nelson Mandela, the Obamas, Jacinda Ardern to
burnout — each with a source URL and each labelled "true reference case" and "TRUE STORY
· RECENT HISTORY". Not a list but an ID convention through five layers. Nine dedicated
blocks removed whole (including the 84 KB `sr-v17-reference-system-runtime` holding the
29-person `STORIES` map, and four `anger-reference-case-v13..v16` pairs holding a 30th,
Terry Crews), 30 `RESOURCE_CONTENT` entries, 31 key-array members, 22 `res-item` blocks,
the map rows, and 19 refcase rules from *inside* the shared 151-rule sr-v29 stylesheet.

**Source Insights** was wired deeper still: 8 script blocks, 5 style blocks, 45
`data-v29-kind="insights"` selectors. Seven dedicated blocks removed whole, plus 20
`RESOURCE_CONTENT` entries, 32 key-array members, 12 `res-item` blocks, two feature
cards, the SR-002 title binder whose target no longer exists, and the p2 override.

**Why I Built This One** was two hero tabs and two slides. Both players are left with a
single tab — functional and correctly labelled, but a tab bar with nothing to switch to.
Reported, not changed; it is a design call.

index.html 1,413,723 → 1,104,000 chars.

Three things rendering and reading caught that grep did not:

- `ptResFromContent('refcase', …)` dereferences `RESOURCE_CONTENT[pk+'-refcase'].title`,
  so removing the data alone would have thrown a TypeError on every protocol page.
- Deleting the two builders orphaned whole CSS families — nothing sets
  `data-unified-reference` or emits `.rr-*`/`.sr28-*` any more. 53 + 29 rules removed
  after verifying nothing feeds them, and the `:where()` lists pruned; one emptied
  completely and would have shipped as `:where()` with no selector.
- **My own regex broke the file.** Stripping `'*-insights'` members assumed array
  position, but `READER_QUOTES` is an object literal keyed the same way, so it collapsed
  `'p1-insights':'…'` pairs into `'a':'b':'c'`. Audited across both passes afterwards:
  `-refcase` had zero key-style occurrences, so only that one object was affected.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-098 · No stated session length on index.html
Same rule and same precedent as SR-080: players keep their elements and lose their
numbers, no placeholder substituted. 147 `.v-time` / `.audio-time` readouts render empty.

Removed 80 static readouts, both dynamic ones, 10 `audioLabel` suffixes, 10 `audioMin`
properties, the `FOUNDER_VIDEOS` runtimes and the "Video · 2:50" meta they fed, 10
track-03 audio labels, 10 session-guide metas, and the prose. Three FAQ questions asked
"How long does a session take…" — the question changed with the answer, since answering
it without a length leaves it hanging.

Kept and reported: 60 minutes with the founder, 90-minute workshop and retreat segments,
half-day lengths, live-video booking lines, and "Walk for 5–15 minutes" in a Somatic
Release activity — an instruction, not the length of an unrecorded asset.

Two more found by reading rather than grepping. The journey strip concatenated
`parseInt(d.audioMin)` unguarded and would have shipped "One continuous experience · NaN
minutes" — the same defect class as the "undefined" SR-080 hit. And emptying the two
*dynamic* readouts terminated their JS strings early, leaving `<span class="v-time">'`;
JavaScriptCore caught it as Unexpected EOF.

Fixed in passing: a founder video caption read "Andre Robin", not Andre Robley.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-099 · Kenor International BV removed
SafeRise Protocol is independent and owned by Andre Robley personally. Wider than
scoped: Kenor was on six shipped pages and index.html was not one of them — the three
track pages, method.html twice (footer and founder signature) and method-porges.html;
index.html and protocol.html carried a bare "Sint Maarten".

The jurisdiction went with the company and nothing replaced it: no address, registration
number or trading name is settled. No sentence broke. `docs/INTEGRATION.md` updated too,
since it is the markup contract new pages are built from.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-100 · Site noindexed until soft launch
The domain was live and resolving with no crawl protection of any kind. `robots.txt` at
the root and `<meta name="robots" content="noindex, nofollow">` in all nine shipped
heads. Both, because robots.txt alone does not reliably keep a linked page out of an
index — the meta is what prevents indexing, and the crawler has to be allowed to read
the page to see it.

Verified served: each page fetched and parsed with `parentElement === HEAD` confirmed. A
meta landing after `</head>` is silently relocated into body and a source grep would not
have shown it.

**Comes off on soft-launch day**, both the file and the nine metas.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-101 · Social-proof strip corrected; no placeholder testimonials exist
The premise did not hold. There are no placeholder testimonial blocks and no "replace
before launch" anywhere in the repo, and no star ratings or attributed quotes. The
section already reads "Built and ready. Not yet reviewed… Nothing here is borrowed or
invented in the meantime", which is honest and was kept.

What was wrong was the stat strip, which a grep for "testimonial" does not reach. Each
claim checked against tracks.js under JavaScriptCore: "37 Modules Across 4 Tracks" was
false twice over (30 protocols, 3 visible tracks — Elevation is `visible:false` with no
protocols and no price) and "14m To Your First Shift" was a promised time to an outcome
on a page saying "Not yet reviewed" two lines above, and a duration SR-098's patterns
missed. "6 Science Frameworks" and "€0 To Begin" verified true and kept.

Found by screenshot: the same false counts were also in the **hero eyebrow**, above the
fold, the first factual claim a visitor reads.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-102 · Contact route added
No way to contact the business existed anywhere; the only `mailto:` was a share link
with an empty recipient. Raised as blocked, and `contact@thesaferiseprotocol.com`
supplied and confirmed as a live mailbox. One line beside the entity line on eight
pages — including index.html, whose footer is a `<template>` cloned into all twelve
surfaces, verified live rather than in source.

`resource.html` is the exception: the Reader has no footer element and no copyright line
at all, so there is nowhere to put it without inventing a component. It is always
reached from a page that carries the footer.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-103 · Dead footer legal links removed
Audited against what resolves, not intent. `index.html`'s `/terms`, `/privacy` and
`/cookies` all returned HTTP 404 against the server; `protocol.html`'s Terms, Privacy
and Cookies were `href="#"` and clicking each opened nothing — verified in the browser,
since `href="#"` alone does not tell you whether a handler is attached. All removed,
along with the `.footer-legal` CSS they orphaned.

`dashboard.html`'s FAQ, Account, Billing, Support, Terms and Privacy were kept: all six
open `mRoute`, confirmed opening, which renders "Not built yet" and names the path.

**Still missing, for scheduling:** Terms, Privacy, Cookies and a refund policy. They name
a contracting party and a data controller, so they need the entity question settled
first. When the privacy policy is written it has to state that journals never leave the
device — `Store` writes to localStorage only and there is no backend behind any of it.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-107 · No card carries the step-4 distancing framework
SR-096 removed the Dispenza expert card and science-strip card, leaving five of each
where there are six frameworks in `FRAMEWORKS`. The sixth — Distance & rehearsal, Kross
& Ayduk, the Best Possible Self literature, already written up on method.html by
SR-089/SR-090 — has no card on index.html, and no `data-sr-reach="distance"` anywhere,
so its six protocols are not shown.

Adding one means writing a bio, a role and an avatar for a literature rather than a
person, which is content authoring rather than a fix, so it was deliberately not done in
the removal pass.

**Blocker recorded 22 Aug 2026, and the refusal above was re-confirmed rather than
overruled.** The framework-pages run was briefed to add the sixth card and stopped instead.
Two reasons, both still standing:

1. **The card format cannot hold this framework.** One avatar, one name, one role, one bio.
   The sixth is **Kross & Ayduk plus the Best Possible Self literature (Laura King)** — two
   researchers and a third body of work. Filling it means inventing a display name, initials,
   an avatar colour and a bio for a literature rather than a person.
2. **It lives in `index.html`**, which that run's own scope statement excluded.

**Known and accepted, pending a decision on how a multi-author literature renders in a
one-person card:** the section heading at `index.html:8261` reads **"Six frameworks."** above
**five** cards. `frameworkReach('distance')` returns **5 protocols** — corrected from 6 by
[[SR-180]], which took `distance` off `t1-10` as a false attribution; this is a live assertion
and was rewritten rather than annotated, per Rule 21 — and the render loop
at `index.html:10489` picks up any `[data-sr-reach]`, so the data side is ready and only the
card content is missing.

**RESOLVED, 22 Aug 2026 — a FINDING card, not a person card.** Andre's decision, and it
dissolves the format objection rather than working around it: the other five cards are people,
this one is a body of work, and forcing it into a person shape means either picking one of three
researchers arbitrarily or inventing a composite. Neither is honest.

Same card, same dimensions, same grid, same hover. **One slot renders differently.** Where the
five carry their identity mark, this carries **the framework's mark in gold**. Where they carry a
name: **"Distance & rehearsal"**. Where they carry a role: **"Kross & Ayduk · Best Possible Self
literature"**. The bio becomes **the finding**, in the same voice as the others:

> Watching a state from outside it settles you more durably than distraction does. Rehearsed
> forward, in detail, it lifts what you expect of the day ahead.

**Why this is the right shape and not a compromise.** The peer-reviewed band is where findings
live; `distance` is `register: 'peer-reviewed'` alongside `porges` and `heartmath`. A finding card
sitting among people *inside that band* therefore reads as deliberate rather than as a gap someone
could not fill — the band already promises evidence rather than voice. It also generalises: any
future framework that is not one person now has a form to arrive in, instead of forcing the same
decision again. That is the difference between a resolution and a workaround.

**Re-blocked on the asset, not on the decision.** The mark does not exist.

    path        assets/method/marks/kross.png
    size        1024 × 1024
    format      transparent PNG
    constraint  legible at 96px

Do not build the card until it lands — a placeholder in the one slot that distinguishes this card
from the other five defeats the resolution.

### ⚠ Four facts in the paragraphs above went stale. Corrected here, 23 Aug 2026.

Measured against the tree, not inferred. The decision is untouched; only its premises move.

1. **There are no portraits.** `.expert-avatar` is a **two-letter monogram** on a flat colour
   (`SP`, `HM`, `GM`, `CJ`, `AW`). The differentiating slot is a 2-character text node inside a
   coloured circle, not an image — so the mark replaces a monogram, and the card is the first on
   the page to put an `<img>` in that position. Size the mark to the monogram's box, not to 1024.
2. **There is no reach line.** [[SR-250]] removed it along with the claim it derived.
   `frameworkReach()` in `content/tracks.js:761` now has **no consumer** and is recorded as dead
   code. What survives is `.expert-contrib > .expert-pills` — a **curated, unquantified** sample of
   protocol names. "The reach line is unchanged" above means *there is nothing to change*.
3. **`frameworkReach('distance')` returns 4, not 5.** Recomputed across all 30 `META` rows:
   `t1-09`, `t2-08`, `t3-03`, `t3-10`. The note below previously said 5; [[SR-216]] had already
   recorded 4. Since the pills are curated rather than counted, this number now constrains only
   which pills are honest to show.
4. **The section renders eleven cards, not five.** Five registered framework cards in
   `.experts2-grid`, then a divider reading **"Extended Voices"** at `index.html:8354`, then six
   more in `.experts2-grid-ext`: Dr. Kenny Bastien, Mooji, David Bayer, Peter Levine, Elisabeth
   Kübler-Ross, Francis Weller — **none with a `FRAMEWORKS` key**. The heading still reads "Six
   frameworks." The sixth card joins the **first** grid and takes the count from 5 to 6. See
   [[SR-274]] for the extended six.

**What building it takes once the mark lands — a drop-in, in one file.** Insert a sixth
`.expert-card2` into `.experts2-grid` at `index.html`, after Alan Watts (:8338) and before the
grid closes at :8352, matching the existing block exactly:

    <div class="expert-card2">
      <div class="expert-head">
        <div class="expert-avatar">          ← mark, not a monogram; gold
        <div>
          <p class="expert-name2">           ← Distance & rehearsal
          <p class="expert-role2">           ← Kross & Ayduk · Best Possible Self literature
      <p class="expert-bio">                 ← the finding, above
      <p class="expert-step">                ← Maps to Step 4 — …
      <div class="expert-contrib">
        <div class="expert-pills">           ← curated sample, per SR-250

`.expert-step` is a slot the five all carry and the resolution above does not mention;
`FRAMEWORKS.distance.step` is **4**, so it takes the same Step 4 wording Alan Watts already uses.
The `.expert-avatar` rule sets a background colour and centres text — the mark needs a rule that
does not inherit that centring, which is the only new CSS the card requires. `--gold` is the
declared `colour` on the record.

Nothing else moves: the heading already says six, the grid already reflows, and no count anywhere
is derived from the number of cards.

*Status:* open — resolved in design, blocked on `assets/method/marks/kross.png` ·
*Raised:* 19 Aug 2026 · *Resolved:* 22 Aug 2026 · *Premises corrected:* 23 Aug 2026

---

### SR-275 · t3-06's "Why Release" heading named the wrong mechanism

`content/t3-resources.js` (`t3p6-guide`) carried the heading **"Why Release goes after the
editing"**, naming only one of the two things the Release step addresses. The Release cue
itself (`t3p6-crisiscard`) already names both: *"Two things. The gap... And the editing..."* —
the gap being the room's verdict, the editing being the persona maintained in response to it.
Heading corrected to **"Why Release goes after the reading of the room"**, which names the
first of the two and matches the card's own signature line (*"Reading the room for whether you
count in it"*, [[SR-258]]).

**The paragraph under the heading is not rewritten, and stays out of scope here.** It runs
four sentences on the cost of maintaining an edited persona and does not develop "the reading
of the room" as its own idea — it earns the old heading, not fully the new one. Rewriting it is
authoring member-facing copy, the same boundary [[SR-226]] and [[SR-258]] drew. **Blocked on the
content lane**, same class of block as SR-226 before SR-258 closed it.

*Status:* heading fixed; body paragraph open — blocked on content lane · *Raised:* 24 Aug 2026

---

### SR-276 · `.sr-testi` CSS survived its own markup

"Protocol work" (24 Aug 2026, no SR ID) removed every `<section class="sr-testi">` — the two on
`index.html` and the template in `docs/INTEGRATION.md` — closing the testimonial-placeholder
question. The three CSS rule blocks that styled the class did not move with it: the base rule
in `css/saferise-system.css`, the `#prog-couples`/`#prog-corporate` scoped override, and a
`max-width:760px` responsive tweak. No markup referenced `.sr-testi` anywhere in the tree, so
the CSS rendered nothing — but a fully-styled dead selector is exactly the kind of slot Rule 19
exists to close: it would make a re-added `<section class="sr-testi">` look finished on sight,
with none of the friction that should come from resurrecting a removed pattern. Removed, along
with the explanatory comment above `section{border-top:0}` that still named `.sr-testi` as a
section carrying its own border.

*Status:* closed · *Raised:* 24 Aug 2026

---

### SR-277 · One section-reveal and card-entrance system for all three tracks

**What existed before this.** js/saferise-track.js already renders all three track pages
(personal-transformation.html, relationship-healing.html, professional-performance.html) from one
module — SR-209's precedent (one spec, token-driven, many variants) was already satisfied at the
template layer; there was nothing to extract there. What did not exist was any entrance animation
at all: the file never loaded js/saferise-system.js (which owns `.sr-stagger`/IntersectionObserver
for index.html's grids), so every section on every track page rendered instantly, fully visible,
with zero reveal.

**The four zero-argument, wholly-identical section renderers this run measured — not two.**
`rInsight()`, `rFourSteps()`, `rProgress()` and `rScope()` take no track argument and emit the same
markup regardless of which of the three tracks calls them. `rResources(t)` looked like a fifth
candidate but takes `t.id` for `trackResources(t.id)` ([[SR-253]] — Track 03 has eleven resource
types, Tracks 01/02 have ten) so it is shared *structure*, not shared *output*. Reported as
measured, since the count did not match the brief.

**SR-238, SR-239 and SR-234 do not exist.** No register entry, no commit (`git log --all --grep`),
no code comment anywhere in the tree. The actual card — SR-174/SR-174b/SR-178/SR-162/SR-163/SR-182
— already satisfies the brief's own card model without changes: `p[1]` (*"the one-word verb"*) is
the transformation word burned into `.sr-pcover-label`, `p[2]` the title, `p[3]` the promise,
`p[4]` the signature revealed on hover *and* `:focus-within`, border-color emphasis on hover, and a
`(hover:none),(max-width:560px)` query that already renders the reveal statically with no
transition. Nothing here needed rebuilding, so nothing was rebuilt.

**The four Track 01 diagram handoffs — two-pathway flow, breathing waveform, circular sequence,
baseline graph — are not files in this repo.** No document under `docs/` matches that description.
They are, however, already *built*: `GRAPHICS.trigger` ("A trigger travels on two timelines"),
`GRAPHICS.breath` ("The coherence rhythm"), `GRAPHICS.spiral` ("The sequence becomes familiar") and
`GRAPHICS.progress` ("The floor moves") in js/saferise-track.js are those four diagrams, verbatim,
already placed in `rInsight()`/`rFourSteps()`/`rProgress()`. Decision: they survive as-is. They
inherit the shared section's own entrance (fade + rise, the same mechanism as the surrounding
text) rather than gaining a separate idle-loop animation — a second, diagram-only motion pattern
would be the "spectacle" the brief rules out, not "attention."

**What was built — reused mechanisms, no new ones:**
- `.sr-tp-revealsec`/`.sr-tp-in` (css/saferise-system.css, new A9 block): eyebrow 0ms, heading
  100ms, supporting text 200ms, the first block after them 300ms — plain CSS transitions keyed off
  one class, added by `initReveal()` in js/saferise-track.js via one IntersectionObserver per page
  (threshold .12, rootMargin -8%, the same shape `initStagger()` already uses on index.html).
  Selectors key on class names (`.sr-tp-eyebrow`, `h1`/`h2`, `.sr-tp-lede`, `.sr-tp-sechead+*`),
  which is why the hero (no `.sr-tp-sechead`) and the price panel (manual markup, also no
  `.sr-tp-sechead`) both reveal correctly without a special case for either.
- Card and resource-item groups (the protocol carousel, cost items, range columns, resource
  items) reuse the platform's own `.sr-stagger`/`.sr-in`/`--i` pair verbatim — the same class
  wired onto new containers, not a new stagger mechanism.
- Never targets an `<img>` or the hero photograph. Images stay static by the selectors' own scope,
  not by a rule fighting one that would otherwise move them.

**One real bug found and fixed in the process, not introduced by it.** `.sr-tp .sr-tp-pcard`'s
own `transition:border-color .2s` (SR-174) carries higher specificity than `.sr-stagger>*`'s
transition rule. A shorthand re-declaration resets every longhand it doesn't name, so wiring
`.sr-stagger` onto `.sr-tp-cartrack` was silently deleting the opacity/transform transition on
every protocol card — confirmed live: `getComputedStyle` on a hydrated card reported
`transition-property: border-color` only, and `transition-delay: 0s` on every card regardless of
its `--i`. Restated at higher specificity (`.sr-tp .sr-tp-cartrack.sr-stagger>.sr-tp-pcard`),
adding opacity/transform rather than replacing border-color. Verified after the fix: card index 3
reports `transition-delay: 0.21s` (3 × 70ms) and `transition-property: opacity, transform,
border-color`.

**Reduced motion, keyboard, touch — asserted, not re-implemented.** The blanket rule already in
this file (`*,*::before,*::after{transition-duration:.01ms!important;...}`, inside
`@media (prefers-reduced-motion:reduce)`) collapses every transition added here without a
per-component block, per CLAUDE.md. Keyboard already has parity — `:focus-within` already
accompanies every `:hover` this run touches; nothing new was added that lacks it. Touch has no
hover, and needed none here either: the section reveal is scroll-driven (IntersectionObserver),
not hover-gated, so it fires identically on a touch device; the one hover-gated surface (the card's
signature reveal) was already handled by SR-174b's `(hover:none)` query before this run started.

**Verification.** IntersectionObserver never fires in this environment's preview tab —
`document.hidden` is `true` even on the "active" tab, which is standard Page Visibility throttling
for a backgrounded renderer, confirmed by a bare test observer also never firing. Verified instead
by toggling `.sr-tp-in`/`.sr-in` directly and reading `getComputedStyle`: eyebrow/heading/lede/next
-block delays measured at 0/100/200/300ms exactly, per-card delay measured at `--i × 70ms` after
the specificity fix. All three pages loaded with zero console errors and no horizontal overflow at
1440/1024/768/390. Euro invariant re-run: 8 inside `PRICING`, 0 escapes elsewhere, 0 bare `€` —
unchanged, since content/tracks.js's `PRICING` object was not touched.

*Status:* closed · *Raised:* 25 Aug 2026

---

### SR-278 · "Subject matter voices" and "Science framework" derived from `META[].frameworks`, not hand-typed

**Per-protocol verdict, checked before anything was built, per instruction.** For each of Track
03's ten protocols, read every authored resource this repo carries for it — content/t3-resources.js's
full `t3p{N}-guide` (including its own `<h4>What we rest on</h4>` citation section), `t3p{N}-crisiscard`
and `t3p{N}-companion`, plus index.html's shorter `t3-p{N}-guide` overlay copy — and searched all of
it for Mooji, David Bayer, Peter Levine, Elisabeth Kübler-Ross and Francis Weller, the five names the
old line carried. **Zero hits, on any of the ten, in either content store, outside the line itself.**
None of the five names are decoration in the sense of "unnecessary but not false" — they are not
present in the actual authored content at all. Meanwhile `content/t3-resources.js`'s own
`<h4>What we rest on</h4>` section — the platform's own citation of what a protocol's science
actually is — **matches `META['t3-0N'].frameworks` exactly, 10 protocols for 10**, including the
six protocols whose old "Subject matter voices" line named nothing in that pair at all. The verdict
for every one of the ten is therefore the same: **derive, do not delete.** The framework registry is
not incomplete and the resources do not cite anyone they shouldn't — the old line was simply invented
independently of both the registry and the platform's own citations, and never checked against
either.

**What was built.** Both `index.html` occurrences per protocol — the authored-resource-body string
inside each `t3-p{N}-guide` object and the always-visible card-surface `<p>` in `#corporate-protoList`
— were regenerated from `content/tracks.js`'s `FRAMEWORKS`/`META` pair: `FRAMEWORKS[k].name` em-dash
`FRAMEWORKS[k].person`, joined `·`, for each key in `META['t3-0N'].frameworks`, in that order.
Mechanical, reproducible, and matches the exact em-dash format `t3p{N}-guide`'s own "What we rest on"
section already uses, so the two now agree instead of contradicting each other on the same page.

    Before (t3-06): Subject matter voices: David Bayer · HeartMath Coherence
    After  (t3-06): Subject matter voices: Polyvagal Theory — Stephen Porges · Shadow & individuation — Carl Jung

Neither name in the old line matches `META['t3-06'].frameworks: ['porges','jung']`; both names in
the new one do. All 20 occurrences (10 protocols × 2 surfaces) regenerated
identically per protocol — verified live: `#corporate-protoList [data-proto="6"]` renders the derived
Porges/Jung line with zero console errors.

**Track 01 carries no such line anywhere** — no `personal-protoList` container exists in `index.html`
at all, and `js/saferise-track.js`'s card renderer (the standalone personal-transformation.html)
never emits a framework-attribution string. Nothing to fix or report further.

**Track 02 carries the same defect class, less severely, and got the same treatment.** Its
`#couples-protoList` overlay uses a singular `Science framework:` line, one name, never an outside
figure — but checked against `META['t2-0N'].frameworks`, it named the *wrong* registered framework
on 4 of 10 (`t2-02`, `t2-05`, `t2-06` each named one framework absent from that protocol's actual
pair; `t2-07` named Jung twice under two different labels — "Individuation" and "Shadow Work" are
the same framework, not two — and never named `mate` at all, its actual second framework), and on
the other 6 was correct-but-partial: naming one real member of the pair and silently dropping the
other. Same fix, same source: regenerated from `META['t2-0N'].frameworks` using both registered
names, not one. The label changed from `Science framework:` to `Science frameworks:` because the
content it introduces is now, correctly, sometimes two — the singular label was never a deliberate
choice, it was a symptom of the same one-name-at-a-time authoring that produced the wrong name 4
times out of 10.

**One more finding, out of scope here and not fixed.** `index.html`'s embedded `#corporate-protoList`
overlay — a second, older content store for Track 03 that parallels `content/t3-resources.js` rather
than reading from it — still titles protocol 6 **"The Ambition Recovery Protocol."**
`content/tracks.js` and `content/t3-resources.js` both carry [[SR-216]]'s rename to **"The Belonging
Gap Protocol"**; this surface was never touched by it. Two further titles read as wording variants
rather than clear staleness (`"The Decision Fatigue &amp; Isolation Protocol"` vs. `content/tracks.js`'s
"The Decision Fatigue Protocol"; `"The Burnout &amp; Chronic Overload Protocol"` vs. "The Burnout &
Overload Protocol") and were left alone pending the same judgement. Under the CLAUDE.md rename
procedure this branch's "Protocol work" commit added, a rename is a founder decision requiring a
full rename pass across every representation — not something to fold into a content-accuracy fix
touching a different string on the same card. Flagged, not corrected.

*Status:* closed (Tracks 02/03 derivation); Track 01 not applicable; the `#corporate-protoList`
title residue open, flagged for a rename pass · *Raised:* 25 Aug 2026

---

### SR-279 · The t3-06 rename pass — "Ambition Recovery" swept, its old copy is not

Andre's decision, authorised as a rename pass under CLAUDE.md's new rename procedure — not folded
into another fix. **Full sweep, every tracked file, case-insensitive:** `index.html` (11), `dashboard.html`
(1), `content/tracks.js` (2, one live, one a deliberate [[SR-258]] historical comment), plus four
docs files carrying it as a dated historical record (`docs/fix-register.md`, `docs/SafeRise_File_Inventory.md`,
`docs/runs/RUN-C-consolidated.md`, `docs/reference/image-manifest.csv`) — left untouched, per the
brief's own grouping rule.

**Fourteen live occurrences renamed, name only:**

| file | occurrences | what |
|---|---|---|
| `index.html` | 11 | card `h3`/`aria-label`, `t3-p6-guide` resource title, the `t3-p6` Reader-title lookup table, audio/video labels, `res-title`, `jprog-section` title, the `consultsummary` default string, an `expert-pill`, a compact protocol-list widget |
| `content/tracks.js` | 1 | a FAQ answer on the live professional-performance.html page: *"The Career Transition and Ambition Recovery protocols exist..."* |
| `dashboard.html` | 1 | the `'flat|work'` mood-lookup suggestion title |

All fourteen verified renamed to **The Belonging Gap Protocol** / bare **Belonging Gap**; zero
`Ambition Recovery` remains outside the one deliberate SR-258 comment and the four dated docs.

**Copy that carries the old protocol's SUBJECT, not just its name — reported, not authored, per
instruction:**

1. **`index.html`'s `t3-p6-guide` resource** — `meta`/`body`: *"Reconnecting to drive when the
   mission has gone flat or cynical"* / *"Low-arousal flattening — motivation present in memory
   but absent in the body, sometimes masking exhaustion or grief for work that used to feel
   alive."* This is Ambition Recovery's subject (motivation, drive, ambition gone flat), not
   Belonging Gap's (reading a room, editing yourself to fit it — confirmed against
   `content/t3-resources.js`'s actual `t3p6-guide`, which already carries the correct Belonging Gap
   content and was unaffected, since it is a separate content store from `index.html`'s).
2. **The card's `.proto-landing-desc`** — *"Reconnect to what originally drove you, and recover
   momentum when ambition has gone flat."* Same subject mismatch.
3. **The card's hidden `.proto-trigger`** — *"Reconnecting to drive when the mission has gone flat
   or cynical."* Same.
4. **`index.html`'s `t3-p6-companion` body** — *"Keep a short list, updated monthly, of the parts
   of the work that still genuinely interest you — revisit it on the low days."* Same.
5. **`dashboard.html`'s `'flat|work'` suggestion text** — *"Flat about work you used to want has
   its own protocol."* Same subject, kept exactly as-is; only the title field beside it was renamed.

None of these five were rewritten. Inventing Belonging-Gap-themed copy to fill them would be
authoring member-facing content, the same boundary [[SR-226]]/[[SR-258]]/[[SR-275]] have already
drawn around this exact protocol.

**Found in passing, reported here, corrected below in [[SR-282]] — and this entry had it backwards
on first pass.** `dashboard.html`'s mood-lookup table carries **"The Creative Flow Protocol"** for
t3-10. Checked against `content/tracks.js:524` (`['10','Unlock','The Creative Flow Protocol', ...]`)
rather than against `index.html` as this entry first did: `dashboard.html` is **correct**.
`index.html` is the one carrying the wrong name — **"The Creative Flow Unlock Protocol,"** eleven
occurrences, apparently the label field (`'Unlock'`) merged into the title rather than a rename
residue. Corrected here per Rule 28/16: an unchecked comparison asserted the wrong file was stale.
See [[SR-282]] for the full accounting.

*Status:* name renamed everywhere live; five copy sites flagged for the content lane ·
*Raised:* 25 Aug 2026

---

### SR-280 · index.html's nav overflows at 390px — a viewport-widening bug, not a nav design flaw

**Root cause, measured, not guessed.** `body{overflow-x:hidden}` (`index.html:36`) has no matching
rule on `html`. Content elsewhere on the page exceeds 390px in normal flow; because `html` still
computes `overflow-x:visible`, the browser's initial containing block — what `#main-nav`
(`position:fixed;left:0;right:0`) resolves its width against — widens to match it (measured at
487px against a 390px visual viewport), and the nav's own `.nav-link` row, which already has a
correctly-configured `overflow-x:auto` wrapper, inherits that widened box instead of the true
viewport. The nav's internal scroll handling was never the defect; the box it was handling scroll
*within* was already wrong.

Confirmed empirically, not just by inspection: setting `html{overflow-x:hidden}` alone (matching
what `body` already carries) dropped `document.documentElement.scrollWidth` from 487 to 390 and
`#main-nav`'s own computed width from 487px to 390px, with no other change.

**Contained — one line, scoped to `index.html`.** Added to the existing `html{...}` rule at
`index.html:35`, next to `body`'s. Not added to `css/saferise-system.css`: that file is shared by
personal-transformation.html / relationship-healing.html / professional-performance.html, whose
`.sr-tp-nav` and `.sr-tp-stickycta` both use `position:sticky` — and `overflow-x:hidden` on an
ancestor forces the paired axis (`overflow-y`) to `auto`, which is the exact mechanism a standing
comment at `index.html:5381` already documents breaking `position:sticky` (it is why that one
sticky candidate on `index.html` was built with `position:fixed` instead). Scoping this fix to
`index.html`'s own inline stylesheet, where the matching `body` rule already lives, avoids
reintroducing that exact defect on the three track pages. Verified after the fix: `html.overflow-y`
does become `auto` (the documented side effect), `#main-nav` still measures `top:0` after a
programmatic scroll (position:fixed unaffected), and `index.html` carries no
`position:sticky` element of its own to break.

**Scope, as asked:** `index.html` only. `dashboard.html` and `protocol.html` (both on this week's
demo list) checked directly at 390px — no overflow, and neither sets `overflow-x` on `body` or
`html` at all, because neither has content wide enough to trigger the defect. The three track pages
were already confirmed overflow-free at 390/768/1024/1440 in [[SR-277]]'s pass and are unaffected by
this change, since it lives in `index.html`'s own `<style>` block, not the shared stylesheet.

*Status:* closed · *Raised and fixed:* 25 Aug 2026

---

### SR-281 · index.html is a second, unreconciled copy of all three tracks — one cause, four symptoms

**(e) answered first, per instruction, because it reframes (a)–(d).** Yes. `index.html` embeds a
complete, independent copy of every track: its own protocol-card carousels (`#protoList`,
`#couples-protoList`, `#corporate-protoList` — titles, promises, hover reveals), its own full
resource library (a single ~2,800-line object literal carrying every `p{N}`/`t2-p{N}`/`t3-p{N}`
resource — kind, title, meta, body — independent of `content/t1|t2|t3-resources.js`), its own
pricing UI (`#all-plans-pricing`, `#couples-pricing`, `#corporate-pricing`, a three-card plan trio,
two "compact, coming soon" teaser panels), and its own image set. None of these four read from
`content/tracks.js` or the authored resource files at render time — the one exception is
`PRICING`, which [[SR-124]] already wired through a `data-sr-price` hydration script, which is
exactly why (a) was fixable by converting markup to that existing pattern rather than inventing a
second one.

**This is not new** — [[SR-084]] recorded it by name on 19 Aug 2026 ("index.html still carries the
cut resources and every duration... 80 strings"), explicitly deferred as its own reviewable pass
rather than folded into other work. (a)–(d) below are that same fork surfacing in four different
places: a pricing UI that never got the [[SR-124]] treatment applied to two of its three tracks, a
resource library that was never regenerated from the authored files the way `content/inventory.js`
now is for the live pages, a duration sweep ([[SR-080]]) that explicitly excluded `index.html` by
scope, and photography sourced before the current `assets/t1/` set existed.

**The size of the surface, quantified rather than argued.** [[SR-285]]'s sweep for one rename-class
defect alone compared **130 rendered title instances across four independent surfaces on this one
page** — and that was only the thirty protocol titles, one narrow slice of what this fork
duplicates alongside the pricing, resource vocabulary and photography in (a)–(d) above. An
architectural finding stated in principle is easy to defer; a defect surface measured at 130
instances for title strings alone is the strongest argument available for the scoped fix named
above, not an abstract one.

**The shape of the real fix, reported per instruction, not built now.** The durable fix is
architectural: stop `index.html` maintaining a second content store, and either (a) delete the
embedded overlays and route `showProg('couples'|'corporate'|'personal')` to the standalone track
pages instead, or (b) rewrite `index.html`'s card/resource/price rendering to consume
`content/tracks.js` and the authored resource files at load, the way `js/saferise-track.js` already
does. Either is a multi-file rewrite touching the page's largest structures, days not hours, and
not something to start three days before a demo of the exact pages it would rewrite. **Applied
instead: the contained fix** — correct today's content within the existing fork, the same shape as
[[SR-278]], leaving the architectural merge as a named, scoped follow-up.

**Stated once, plainly, so it does not get lost in the four parts below: the fix is to stop
`index.html` maintaining a second content store. It is scoped — named, with the two candidate
shapes above and the reason neither runs this week — not abandoned. Everything in (a)–(d) is a
correction inside the fork that still exists after this branch merges, not a substitute for
closing it.**

**(a) Pricing — the tracks are correct, index was stale.** `content/tracks.js`: `TRACKS[2].status`
and `TRACKS[3].status` are both `'live'`, with real entries in `PRICING` (`t2` €29/mo, `t3` €39/mo)
in the same object [[SR-124]]'s hydration script already reads. Confirmed further: one of
`index.html`'s own three plan-trio cards (Track 02's) was *already* hydrated correctly
(`data-sr-price="t2"`) — proof this exact pattern was already applied here once and simply never
reached Track 03's sibling card or the other locations. Every "Join Waitlist" button's `onclick` is
`showProg('couples'|'corporate')` — the identical call the real "Discover More" links already use;
there is no separate waitlist capture anywhere, so relabelling was safe with zero logic change.
Fixed, all real-plan locations: the "Personal Transformation is live today... Relationship and
Professional are... pricing announced closer to release" intro sentence; both compact teaser panels
(badge, price line, button); the Track 03 plan-trio card (now matching Track 02's sibling exactly);
both comparison-table rows (`Available`, `Entry price`) — six locations, all now deriving their
number from `PRICING` via the existing `data-sr-price` mechanism, none hand-typed.
**Left alone, deliberately:** the Track 03 **workshop** card still reads Coming Soon / Pricing TBA
/ Join Waitlist. `PRICING` has `workshopPersonal` and `workshopRelationship` but **no
`workshopProfessional` key** — Tracks 01 and 02's workshop cards on the same page are correctly
`Book — €29` / `Book — €49/couple`, live-hydrated; Track 03's genuinely has no price to hydrate
from. This is very likely still true (the workshop is a distinct product from the Track 03
subscription, which is live) — flagged as a content-lane question (does a Track 03 workshop exist
yet?) rather than guessed at.

**(b) Durations — the [[SR-080]] rule, applied to the page [[SR-084]] deferred it from.**
[[SR-080]]'s own text is explicit about scope: banned are stated/implied lengths of **unrecorded
self-guided assets** (meditations, scripts, PDFs); kept are **booked live events with a human on
the other end** — 1:1 and workshop slot times — because those are contractual and already known,
"the opposite of the unrecorded meditation assets the rule exists for." Checked against that
boundary, not the naive one: `Length: 60 minutes` (Premium 1:1) and `roughly`/`approximately 60
minutes` (workshops) are **kept**, correctly, as [[SR-080]] and the `N min` note on the still-open
[[SR-053]] entry already establish. Removed — all self-guided-asset claims: `PDF · N pages` (14,
across four page counts) → `PDF · [rest]`; `10-Min`/`10-Minute Guided Meditation` (21, titles and a
compact-list label) → `Guided Meditation`; the two `Full 10-minute ... is production-ready`
sentences (20, T2 and T3) → `Full ... is production-ready`; the Foundation Protocol's `14-minute`/
`14-Min` guided-audio claims (4, hero copy, a waveform label, a feature-list line, a bullet) →
duration-free; `Session 1 of 7` (2, a Cue Card description that additionally didn't describe the
resource it sat on) → removed; `Tier: Early Signs` (22, the `consultsummary` default string on
every jprog section) → removed. 83 strings corrected in total — close to [[SR-084]]'s original
estimate of 80, confirming that count rather than inverting it.

**(c) Resource vocabulary — full mapping, kind field and card-surface label both.** Current
canonical names come from `content/tracks.js`'s `SHARED.resources` (11 types, the same table
`content/inventory.js` derives from):

| `index.html`'s label | canonical replacement | occurrences fixed |
|---|---|---|
| Meditation Script | Guided Meditation | 10 (`"kind"`) + 10 (`res-kind`) |
| Protocol Guide | How This Works | 10 (`"kind"`) + 2 (`res-kind`) |
| Attention Advisory | Proximity Guide | 6 (`"kind"`) + 1 (a prose note) |
| Somatic Release *(bare)* | Somatic Release Activities | 2 (`"kind"`) + 2 (`res-kind`) |
| Progress Tracking + Progress Journal | **merged** into Your Record | 3 pairs → 3 single feature blocks |
| Cue Card, Disclosure & Support, Invitation to Repair, Somatic Release Activities *(full)* | — | already correct, untouched |

"Progress Tracking"/"Progress Journal" were two resources; the current model consolidated them into
one ("Your Record" already carries both the log and the prompts, verbatim in
`SHARED.resources`). Renaming one and orphaning the other would have left a duplicate; the redundant
block was removed outright, per Rule 19, not hidden. `T2`'s "Session Guide"/"Safety Score" kind
labels were **not** touched — Track 02 has always used its own two-person resource model, distinct
from the eleven-type system, and neither name is retired.
**No counterpart, reported not invented:** three current resource types have **zero** presence
anywhere in `index.html`'s embedded library — **Safe Practice**, **Accountability & Empathy**, and
**Raising It** (T3-only). Not mislabelled; simply never added to this older content store when they
were authored for the real pages.

**(d) Images — two different sets, not one set at two paths.** `assets/pt/*.webp` (5 files,
last modified 13 Aug) and `assets/t1/*.jpg` (4 files, last modified 22–23 Aug — the same window as
the recent [[SR-213]]/[[SR-257]]/[[SR-259]] photography installs) share no filenames, no format,
and no comparable byte sizes (`cost-triptych.webp` 38 KB vs `cost.jpg` 250 KB). `change.jpg` has no
`assets/pt/` counterpart at all. `index.html` is rendering an older, separate photography set;
nothing here was touched, per instruction — report only.

*Status:* (a) closed, one workshop-price question flagged for the content lane · (b) closed ·
(c) closed, three resource types flagged as having no counterpart · (d) reported, not fixed ·
(e) architectural merge reported as a scoped follow-up, not built · *Raised and fixed:* 25 Aug 2026

---

**A decision, recorded — not work left undone.** This pass fixed a page a demo depends on, in the
week of the demo, without touching the architecture underneath it. That was the correct trade, and
it should read here as a choice rather than as a gap: [[SR-281]] found the architectural cause
plainly enough to fix it, and did not, because the fix is a multi-file rewrite of the exact pages
the demo shows. The contained corrections in (a)–(d) hold until that rewrite happens; they are not
a substitute for it, and the rewrite is not a task this record has lost track of — it is named,
scoped, and waiting on time the week of a demo does not have.

---

### SR-282 · report only · "Creative Flow" — the earlier entry had the wrong file

**`dashboard.html` renders the correct title.** `'steady|work': [3,'10','The Creative Flow
Protocol', ...]` (`dashboard.html:1071`) matches `content/tracks.js:524` —
`['10','Unlock','The Creative Flow Protocol', ...]` — exactly. `'Unlock'` is the one-word verb/
label field (the same field that gave t3-06 its label `'Stand'`), not part of the title; no title
in `dashboard.html`'s table concatenates the two.

**`index.html` renders the wrong one, eleven times**, all reading **"The Creative Flow Unlock
Protocol"** — the label word folded into the title, not a rename residue: the compact protocol-list
widget; the `t3-p10-guide` resource's `title`; the `t3-p10` Reader-title lookup entry; the card's
`aria-label` and visible `h3`; the audio-waveform label and video title (bare "Creative Flow
Unlock"); `res-title`; `jprog-section`'s `data-jprog-title`; the `consultsummary` default string;
an `expert-pill` (bare "Creative Flow Unlock"). The same eleven-location shape as [[SR-279]]'s
Ambition Recovery sweep, on a different protocol, and — unlike SR-279 — with no rename behind it:
this looks like a plain transcription error at authoring time, title and label merged into one
string, then copied across all eleven surfaces from that one error.

**The rest of `dashboard.html`'s fifteen-row mood-lookup table, checked against
`content/tracks.js` directly** (not against `index.html`, which is what produced the wrong
accusation in [[SR-279]]'s first pass): all fifteen titles match their track's canonical title
exactly —

| key | track/no | title | matches canonical |
|---|---|---|---|
| wired\|self | 1/01 | The Anxiety Reset Protocol | yes |
| heavy\|self | 1/06 | The Grief Integration Protocol | yes |
| flat\|self | 1/07 | The Shutdown Recovery Protocol | yes |
| raw\|self | 1/05 | The Shame Dissolution Protocol | yes |
| steady\|self | 1/09 | The Insecurity Anchor Protocol | yes |
| wired\|person | 2/01 | The Safe Conversation Protocol | yes |
| heavy\|person | 2/02 | The Rupture & Repair Protocol | yes |
| flat\|person | 2/09 | The Pursue & Withdraw Protocol | yes |
| raw\|person | 2/03 | The Trust & Betrayal Protocol | yes |
| steady\|person | 2/08 | The Appreciation & Support Protocol | yes |
| wired\|work | 3/01 | The High-Stakes Presence Protocol | yes |
| heavy\|work | 3/09 | The Burnout & Overload Protocol | yes |
| flat\|work | 3/06 | The Belonging Gap Protocol | yes ([[SR-279]]) |
| raw\|work | 3/03 | The Imposter Dissolution Protocol | yes |
| steady\|work | 3/10 | The Creative Flow Protocol | yes |

**Zero stale titles in `dashboard.html`'s lookup table.** Not fixed, because there is nothing to
fix here — the finding is that `index.html` needs the same rename-pass treatment [[SR-279]] gave
"Ambition Recovery," authorised as its own procedure, not corrected inline in this report.

*Status:* report only, not fixed · *Raised:* 25 Aug 2026

---

### SR-283 · report only · Track 03's workshop has no price to hydrate from

**What Track 03's workshop card currently renders**, in the plan-trio at `index.html`'s
`prog-services`/workshops section (badge, heading, price line, description, button):

    [Coming Soon]
    Professional
    Coming Soon
    Pricing TBA
    Working a Track 03 career & performance protocol live, with peers — launching alongside the
    Professional plan.
    [Join Waitlist]

**What `PRICING` holds for the other two tracks' workshops** (`content/tracks.js:51-52`):

    workshopPersonal:     { amount: '€29', per: 'per person' }
    workshopRelationship: { amount: '€49', per: 'per couple' }

Both are hydrated live via `data-sr-price="workshopPersonal|workshopRelationship"`, the same
mechanism [[SR-124]] built and [[SR-281]]a reused. Their sibling cards render, verbatim:

    Personal Transformation — €29/person — "Group size: 5–10 people" — "Best for working one
    Track 01 protocol live, with peers." — [Book — €29]

    Relationship — €49/couple — "Group size: 3–5 couples" — "Best for working a relationship
    pattern live, alongside your partner and other couples." — [Book — €49/couple]

**No `workshopProfessional` key exists.** This is not a hydration gap — there is nothing in the
record for the Track 03 card to read, which is exactly why it still shows the honest unhydrated
state rather than a wrong number. It may be that the Track 03 workshop genuinely has not launched
yet (the Track 03 *subscription* is `status: 'live'`; a workshop is a separate, later product in
this codebase's own history — Tracks 01 and 02's workshops evidently landed after their core
subscriptions did too).

**What a third entry would need, structurally — not proposed as the actual numbers:**
- `amount` — a price. Track 03 is individual (like Personal Transformation, not paired like
  Relationship), which suggests `per: 'per person'` follows the Personal Transformation shape
  rather than the Relationship one — a structural observation, not a number.
- A group-size line, matching "Group size: 5–10 people" / "Group size: 3–5 couples" in form.
- A one-line "Best for working..." description, matching the other two in length and register.
- Whether it launches on its own timeline or "alongside the Professional plan," as the current
  (unhydrated) description already claims — that claim itself is unverified and not carried over
  into any proposed fix.

None of this was invented or applied. This is a founder question — whether the workshop is priced
yet at all — and the report above is what makes it answerable in one read.

*Status:* report only, not fixed · *Raised:* 25 Aug 2026

---

### SR-284 · report only · Five sites still carrying Ambition Recovery's subject under Belonging Gap's name

Quoted verbatim, per instruction, so the content lane can commission replacements without
re-deriving them from [[SR-279]]. None of these were authored over.

**Card-surface strings — short, formulaic, matching a pattern already used across other cards.
I can supply replacements if asked; I have not.**

1. `index.html`, the card's `.proto-landing-desc` (visible, directly under the title on
   `#corporate-protoList`'s t3-06 card):
   > Reconnect to what originally drove you, and recover momentum when ambition has gone flat.

2. `index.html`, the card's hidden `.proto-trigger` (not rendered, used for matching/search):
   > Reconnecting to drive when the mission has gone flat or cynical

3. `dashboard.html:1069`, the `'flat|work'` mood-lookup suggestion text (rendered when a member
   answers a check-in as "flat" and "work"):
   > Flat about work you used to want has its own protocol.

**Resource content — substantive authored copy requiring the same clinical/therapeutic voice as
the rest of the protocol's material. I cannot supply replacements; this needs the content lane.**

4. `index.html`, the `t3-p6-guide` resource's `meta` and first two `body` strings (shown wherever
   this resource is previewed or opened):
   > Reconnecting to drive when the mission has gone flat or cynical.
   >
   > What you may notice in your body: Low-arousal flattening — motivation present in memory but
   > absent in the body, sometimes masking exhaustion or grief for work that used to feel alive.

5. `index.html`, the `t3-p6-companion` resource's body (the Somatic Release Activities / daily
   practice suggestion):
   > Keep a short list, updated monthly, of the parts of the work that still genuinely interest
   > you — revisit it on the low days.

**Why the line falls where it does.** 1–3 restate a feeling already named elsewhere on the same
card in Belonging-Gap-correct terms ("reading the room," "editing before it leaves") — a
new sentence in the same register is a copy-editing task. 4–5 recommend or describe specific
psychological mechanisms and practices tied to *ambition going flat*; a Belonging Gap replacement
has to name what Belonging Gap actually does to a person's body and behaviour, which is clinical
content, not marketing copy, and not mine to invent even at the short lengths involved here.

*Status:* report only, not fixed · *Raised:* 25 Aug 2026

---

### SR-285 · t3-10's title fixed — the label folded into the title, mechanically, everywhere it appeared

**Confirmed before applying, per instruction.** All eleven occurrences read against their
surrounding copy: none describe a distinct "unlocking" theme. The card's own `.proto-landing-desc`
— *"Release the rigidity that blocks original thinking, and restore access to creative flow"* —
and the meditation's body — *"Releasing the rigidity that blocks original thinking..."* — are both
about creative flow as the subject; "Unlock" never appears as a concept in the surrounding prose,
only as the mechanically-duplicated label word inside the title string. Cleared as mechanical:
`'Unlock'` is `content/tracks.js:524`'s label field for t3-10, not a second title component, and no
copy needed writing.

**Both stores swept.** `content/tracks.js` and `content/t3-resources.js`: zero occurrences of
"Creative Flow Unlock" — the defect was `index.html`-only, confirming SR-282's finding rather than
surfacing a new site. `index.html`: all eleven occurrences — compact protocol-list widget,
`t3-p10-guide` resource title, the `t3-p10` Reader-title lookup, `aria-label`, `h3`, the
audio-waveform label, the video title, `res-title`, `jprog-section`'s `data-jprog-title`, the
`consultsummary` default, an `expert-pill` — corrected mechanically: `"Creative Flow Unlock"` →
`"Creative Flow"`, one substring replacement, verified to leave every surrounding sentence
grammatical (the word simply drops, it was never load-bearing punctuation or a hyphenation).

**The rest of `index.html` checked for the same class — label word folded into title — not for
every kind of title drift.** Extracted all thirty canonical `(label, title)` pairs from
`content/tracks.js` and compared against all thirty rendered titles across four independent
surfaces on `index.html` (`h3.proto-name`, `aria-label`, the two Reader-title lookup patterns
`'title': '...'`/`title: '...'`, and the eleven `"title": "..."` resource fields carrying
`— Guided Meditation`/`— Session Guide`/`— Safety Score Check` suffixes) — 130 comparisons in
total. **t3-10 was the only instance of this defect class.** Two titles differ from canonical for
an unrelated reason already on record from [[SR-278]] — `"The Decision Fatigue & Isolation
Protocol"` (canonical: `"The Decision Fatigue Protocol"`) and `"The Burnout & Chronic Overload
Protocol"` (canonical: `"The Burnout & Overload Protocol"`) — extra descriptive words with no
relationship to either protocol's label field (`'Decide'`, `'Refill'`), so not the same defect and
not touched here.

**Verified by rendered text**, both required widths: `#corporate-protoList [data-proto="10"]`'s
`h3` reads **"The Creative Flow Protocol"** at both 1440 and 390, zero console errors, no
horizontal overflow at either width. Bracket/div balance unchanged from baseline
(`{0/()−6/[0`, div 2804/2804).

*Status:* closed · *Raised and fixed:* 25 Aug 2026

---

### SR-286 · report only · index.html carries two more protocol titles with words unrelated to either label

Given its own ID, per instruction, rather than left findable only inside [[SR-278]]'s text. A third
variant of the rename-class defect family: not a rename residue ([[SR-279]]), not a label word
concatenated into its own title ([[SR-282]]/[[SR-285]]), but **extra descriptive words added to a
title, matching neither the canonical title nor either protocol's label field.**

| protocol | `index.html` renders | canonical (`content/tracks.js`) | label field | extra words match the label? |
|---|---|---|---|---|
| t3-08 | The Decision Fatigue **& Isolation** Protocol | The Decision Fatigue Protocol | `'Decide'` | no |
| t3-09 | The Burnout **& Chronic** Overload Protocol | The Burnout & Overload Protocol | `'Refill'` | no |

**Ten occurrences each** (`&amp;`- and `&`-encoded forms combined), the same four-store sweep as
[[SR-285]]: compact protocol-list widget, resource `"title"`, the Reader-title `keys` lookup,
`aria-label`, `h3`, audio-waveform label, video title, `res-title`, `jprog-section`'s
`data-jprog-title`, the `consultsummary` default — one short of the eleven-location pattern each,
missing only an `expert-pill` (curated per [[SR-250]], not one-per-protocol, so its absence here is
not itself a finding). `content/tracks.js` and `content/t3-resources.js`: zero occurrences of
either variant — `index.html`-only, consistent with every other member of this defect family.

**Not fixed, and not confirmed mechanical.** Per Rule 32, a multi-occurrence string
substitution is only safe as a rename-free mechanical edit once the surrounding copy is checked for
whether it describes the extra words as a theme. That check has not been run here — unlike
[[SR-285]], where "Unlock" traced cleanly to a known label field, "Isolation" and "Chronic" trace to
neither protocol's label, which raises rather than lowers the chance they reflect real copy
somewhere (an earlier, more specific version of either title) rather than pure noise. Confirming
that is the next step, not assumed by this entry.

*Status:* report only, not fixed · *Raised:* 25 Aug 2026

---

### SR-287 · report only · the SR-277 reveal system, verified as served, not from source

**Binding order: correct, confirmed two ways.** Source: `renderTrack()` assigns `#page`'s
`innerHTML` at `js/saferise-track.js:731`; `initReveal()` runs at line 744, after. Empirical: on a
fresh load of `personal-transformation.html` served from `tools/serve.py` (not opened from disk),
the hero — the one section intersecting the viewport at load — carried `.sr-tp-in` and a rendered
opacity of 1 within 500ms; a section with nothing bound to it cannot acquire a class an observer
never registered. The observer is not firing against an empty page.

**Counts, as served, before any interaction:** 11 `.sr-tp-revealsec` elements in the DOM (hero + 10
bands; `rScope()` is deliberately excluded from the reveal system, per SR-277's own text). **1**
carries `.sr-tp-in` immediately after load — the hero. The other 10 `.sr-tp-eyebrow` elements read
`opacity: 0` at the same moment, matching their un-revealed state exactly.

**A transition genuinely runs — caught directly, not inferred.** `document.querySelector('.sr-tp-
hero .sr-tp-eyebrow').getAnimations()` returned two live `Animation` objects immediately after
load, `playState: "running"`, `duration: 600` (matching the CSS's `.6s`), `easing:
cubic-bezier(0.22, 0.61, 0.36, 1)` (matching `var(--sr-ease)`), `progress: 0` — caught at the first
frame of the transition the CSS declares, on the properties (`opacity`, `transform`) the CSS
declares. This is the Web Animations API reporting an active transition directly; it is not read
from a screenshot or inferred from a before/after diff. One inconsistency in the same sample:
`hero.classList.contains('sr-tp-in')` read `false` in the same synchronous script that read the
running animations and an opacity of `1` — reported as observed rather than resolved, since the
weight of evidence (matching duration, easing and target properties, `playState: running`) leaves
little room for the transition to be anything other than SR-277's, whatever produced the `classList`
read's apparent lag.

**Below-the-fold sections do not reveal within this test tool, and the cause is the tool, not the
code.** Scrolling `#protocols` into view (`window.scrollTo`, confirmed by `getBoundingClientRect()`
afterward) did not add `.sr-tp-in` after an 800ms wait, nor after 4s. Isolated the cause before
attributing it: a brand-new, unrelated `IntersectionObserver` bound to the same already-intersecting
element in the same tab **also never fired once** in 4 seconds — not even its guaranteed initial
callback. `document.hidden` reads `true` and `document.visibilityState` reads `"hidden"`
throughout, including immediately after explicitly fronting the tab — this browser pane never
reports itself as foregrounded to page script, regardless of what the tool is showing the user.
Chromium suspends `IntersectionObserver` callback delivery and throttles `requestAnimationFrame`
uniformly for any content in a `document.hidden` context; a `requestAnimationFrame`-based polling
loop run in the same tab never completed within 30 seconds, and `setTimeout` requests for 50ms
gaps arrived at 111ms and then 1000ms — the standard Chromium background-tab timer clamp, applied
to everything in the page, not to this reveal system specifically. A real visitor's foregrounded
tab does not run in this state.

**What this does and does not establish.** Confirmed: the binding order is correct, the observer is
live against real DOM nodes (not observing nothing), and a transition matching the CSS exactly does
run when a section is revealed. Not directly observable in this tool: a scroll-triggered reveal
firing in real time, because the tool's tab never reports itself visible to the page. The mechanism
exercised for the below-the-fold case is the same unmodified `IntersectionObserver` construct
already used elsewhere in this codebase (`js/saferise-system.js`'s `initStagger`) — there is no
code path specific to `initReveal()` that would behave differently under real foreground conditions
than the hero's already-confirmed success does.

*Status:* report only · *Raised:* 25 Aug 2026

---

### SR-288 · reduced motion had no unconditional visibility override for the SR-277 reveal system

`.sr-tp-revealsec`'s target selectors (eyebrow, h1/h2, lede, herorule, body, the post-sechead and
post-lede beats) start at `opacity:0` and only reach `opacity:1` once `js/saferise-track.js`'s
`initReveal()` adds `.sr-tp-in`, which happens on an `IntersectionObserver` firing as a section
scrolls into view. The adjacent `.sr-stagger` system (`css/saferise-system.css`'s A8 block) carries
its own unconditional escape hatch inside `@media (prefers-reduced-motion:reduce)` —
`.sr-stagger>*{opacity:1;transform:none}` — that forces the visible end state regardless of whether
`.sr-in` was ever added. `.sr-tp-revealsec` had no equivalent. Its own comment block (A9) asserted
reduced motion "needs nothing added here" because the blanket
`*,*::before,*::after{transition-duration:.01ms!important}` rule "handles it centrally" — true only
for a section that has already received `.sr-tp-in`; a section that never does (JS blocked, the
observer never fires, ten of eleven sections on every one of these pages sit below the fold and are
never scrolled into view during an unattended load) stays at `opacity:0` indefinitely, near-zero
transition duration notwithstanding. A near-zero duration still needs a trigger to run at all.

**Fixed** by adding the same class of override `.sr-stagger` already has, for the same selector list
A9 already declares, inside the existing `prefers-reduced-motion` block:
`css/saferise-system.css`'s reduced-motion block now also forces `.sr-tp-revealsec`'s eyebrow/h1/h2/
lede/herorule/body/post-sechead/post-lede targets to `opacity:1;transform:none` unconditionally. The
A9 comment block was corrected in place (Rule 21 — live, not a dated record) rather than left
asserting the disproven "needs nothing added" claim.

**Verified with Playwright** (`reduced_motion: 'reduce'` context), all three track pages, on a fresh
load with no scroll or interaction: 11 `.sr-tp-revealsec` sections each, 10 of 11 below the fold and
never intersected. Every eyebrow/h1/h2/lede/herorule/body element inside every section read
`opacity: 1` and had zero running `Animation` objects (`el.getAnimations()`) — visible immediately,
nothing left running or pending. A same-script control run without `reduced_motion` confirmed the
fix is scoped correctly: below-the-fold sections on the same three pages still measured `opacity: 0`
(or a genuine in-flight `0.6s` transition value) under normal motion, so the override does not leak
outside the media query.

*Status:* closed · *Raised and fixed:* 25 Aug 2026

---

### SR-289 · the active track's own nav pill clips mid-word at ≤480px

At ≤480px, `.sr-tp-navlinks` (`css/saferise-system.css`'s `max-width:480px` block) is deliberately a
one-line horizontal scroll strip — `flex-wrap:nowrap;overflow-x:auto`, scrollbar hidden — rather than
wrapping, so the six links (The Journey, About, the three tracks, Dashboard) stay reachable without
growing the header. Nothing ever moved that strip's initial scroll position, though: every page loads
with `scrollLeft` at 0, and on `relationship-healing.html` at 390px the row's `scrollWidth` (597px)
exceeds its `clientWidth` (346px) by exactly 251px — the reported figure. The fifth link, the
visitor's own current-page pill (`.sr-tp-on`, "Relationship Healing"), sits past that 251px, so the
one link telling a visitor where they are renders as "RELATION" with "SHIP" clipped out of view by
the container's own scroll boundary. The other five links were always reachable by scrolling; the
active one is the link nobody scrolls to find because it is supposed to already say where they are.

**Fixed** in `renderNav()` (`js/saferise-track.js`): after building the link markup, if the active
link (`.sr-tp-on`) would sit partly outside `#navlinks`' visible clientWidth, its scroll position is
set so the pill's right edge is fully in view (`el.scrollLeft = max(0, onLink.offsetLeft +
onLink.offsetWidth - el.clientWidth)`) — a no-op when the active link already fits. Not a redesign:
the scroll-strip pattern stands as-is, no string is truncated, no nav item is hidden, and the type
scale (11px, `.13em` tracking, uppercase) is untouched.

**Verified with Playwright**, all three track pages, 390×844 and 320px, on a fresh load with no
interaction:

| page | width | active label | doc-level overflow | active pill fully inside `#navlinks` |
|---|---|---|---|---|
| personal-transformation.html | 390 | Personal Transformation | 0px | yes (scrollLeft 0, already fit) |
| personal-transformation.html | 320 | Personal Transformation | 0px | yes (scrollLeft 18px) |
| relationship-healing.html | 390 | Relationship Healing | 0px | yes (scrollLeft 56px) |
| relationship-healing.html | 320 | Relationship Healing | 0px | yes (scrollLeft 126px) |
| professional-performance.html | 390 | Professional Performance | 0px | yes (scrollLeft 169px) |
| professional-performance.html | 320 | Professional Performance | 0px | yes (scrollLeft 239px) |

`document.documentElement.scrollWidth - window.innerWidth` measured `0` on every row above, both
before and after the fix — this was never page-level overflow (SR-280's `index.html` failure mode),
only the nav strip's own internal scroll position being wrong.

*Status:* closed · *Raised and fixed:* 25 Aug 2026

---

### SR-290 · feat · the protocol carousel auto-advances

**History checked first, per instruction.** `js/saferise-track.js`'s own SR-163 comment states
directly: "this file has no `requestAnimationFrame`, no `setInterval` and no animation" — confirmed
against the file, `initCarousel()` had pointer-drag, wheel and arrow/dot navigation and nothing that
runs on its own. The one existing autoplay in this codebase, `js/saferise-system.js`'s marketing-page
carousel (`initCarousel(root)` for `[data-sr-carousel]`), is a different mechanism for a different
markup contract — continuous sub-pixel `scrollLeft` drift against a cloned, doubled track for a
seamless loop, not a discrete one-card step — and it explicitly disables itself under reduced motion
(`if (reduce) return;`), which this brief requires the opposite of. Neither is a match to extend, so
this is new behaviour, not a restore.

**Interval:** no prior "one card at a time" implementation exists to match, so **7000ms**, chosen
fresh, as instructed.

**Built** in `initCarousel()` (`js/saferise-track.js`), reusing the function's own `i`/`per()`/
`maxIndex()`/`go()` already driving the arrows: a `setInterval(advance, 7000)` where `advance()`
steps `i` by exactly 1 (never by `per()`, the arrows' page stride) and wraps to 0 past `maxIndex()`
so it loops continuously. Paused (interval cleared, not just gated) while the pointer is over the
carousel, while any element inside it holds focus, or while `document.hidden` — resumed the instant
none of those three are true. The markup gained one wrapping `<div id="carousel" aria-live="off">`
around the existing carhead+viewport (not `rJourney`, which was already a sibling and stays outside
the live region) so hover/focus can be scoped to the carousel without touching cards, arrows or dots.
Arrow clicks, drag and wheel are untouched code, still delegate to the same `go()`/`place()`.

Reduced motion runs the same interval unchanged — no `reduce` check gates it. The sliding transition
it would otherwise animate is already collapsed by the existing blanket
`*,*::before,*::after{transition-duration:.01ms!important}` rule: an `!important` stylesheet
declaration overrides this file's non-`!important` inline `transition:transform .45s…` regardless of
selector specificity, so reduced motion needed no new CSS, only confirming the existing mechanism
reaches this component too. No progress bar or completion-reading indicator was added; the existing
dot rail (SR-163, page position, not a countdown) is unchanged.

**Verified with Playwright**, reading `.sr-tp-cartrack`'s computed transform, all three track pages:

| check | result |
|---|---|
| auto-advance occurs, default motion (all 3 pages) | yes — one 252px step (one card) every ~7s, both of two consecutive intervals |
| transition duration during an auto-advanced step, default motion | `0.45s` |
| auto-advance occurs, `reduced_motion:'reduce'` (all 3 pages) | yes — same 252px/~7s cadence |
| transition duration during an auto-advanced step, reduced motion | `0.00001s` (the blanket rule) — no visible slide |
| hover over `#carViewport` pauses | yes — track unchanged across an 8s hover |
| unhover resumes | yes |
| focus inside carousel (`#carNext`) pauses | yes — track unchanged across an 8s focus hold |
| blur resumes | yes |
| `document.hidden = true` pauses | yes |
| `document.hidden` restored to `false` resumes | yes |
| `aria-live` on `#carousel` | `off` |
| keyboard focus moved by an auto-advance tick | no — `document.activeElement` unchanged across 7.5s of autoplay |
| arrow click (`#carNext`) still moves the track | yes |
| console errors, either motion setting, any page | none |

Swipe (pointer drag) and wheel navigation were not modified — the new code was appended after the
existing `pointerdown`/`pointermove`/`wheel` listeners and `go(0)` call, none of which were touched.

*Status:* closed · *Raised and fixed:* 25 Aug 2026
