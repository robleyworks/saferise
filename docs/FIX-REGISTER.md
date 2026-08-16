# Fix register

`SR-0NN` IDs referenced by commits and by code comments. Until now these
lived only in commit messages; this file is the index.

Entries are either **fixed** (shipped, recorded for traceability) or **open**
(a constraint or a debt that outlives the branch that found it). Open entries
are not TODOs to be closed quietly — they change what later work is allowed
to assume.

---

## Open

### SR-035 · Track 01 is 92 resources, not 89
**Found:** `feat/resource-reader` · **Affects:** anything counting or iterating Track 01 resources

`READER_PROTOCOLS` lists 82 Track 01 keys statically. A tenth resource,
`p<N>-decision` ("The Decision", Identity & Embodiment), is spliced into
**every** Track 01 protocol at runtime by the identity layer
(`index.html`, the `Object.keys(IDENTITY_DATA).forEach` block that ends in
`proto.keys.splice(insertAt, 0, key)`). It is inserted before the first key
matching `crisis` or `support`, so it lands between disclosure and the crisis
card.

The real total is **92**. Any count derived by reading the source array is
wrong by ten. Count at runtime, after the identity layer has run.

### SR-036 · Widget hydrators are coupled to the Reader's DOM contract
**Found:** `feat/resource-reader` · **Affects:** any future work on any reader surface

Resource bodies are not self-contained. Several ship empty or partial in
`RESOURCE_CONTENT` and are filled in afterwards by scripts that query the
Reader's DOM directly:

- **7** script blocks monkey-patch `openReader()`; **7** patch `selectReaderTab()`
- **115** references to `data-reader-page`
- **106** references to `.reader-page-body`
- **6** `querySelectorAll('.reader-page')` hydrators

`p<N>-decision` is the extreme case: it ships as `body:['']` and gets all
~3,800 characters of its content from `hydrateDecisionPages()`. The founder
video, protocol-guide video, evidence cards, resource rows and the
reference-case person card are all hydrated the same way.

**Constraint:** a new reader surface must either preserve the inner contract
`.reader-page[data-reader-page] > .reader-page-body` **and** let content be
built through `openReader()`, or port seven layers of hydration. The
standalone reader (SR-034) does the former — it calls `openReader()`, un-shows
the overlay in the same synchronous turn, and relocates the built node. Do not
"simplify" that indirection away; it is the only reason the reader renders
anything but empty pages.

### SR-037 · 91 eyebrow labels outstanding
**Found:** `feat/resource-reader` · **Owner:** copy, not engineering

`READER_META_COPY` carries the written eyebrow chain for **p1 only** (nine
labels: origin, practise, understand, recognise, release, choose, tell,
become, carry). The other **91** resources across p2–p10 have `eyebrow: null`
and fall back to the resource's kind label, which renders correctly but does
not chain down the rail as an argument the way p1 does.

Eyebrow copy is register-sensitive and is written by hand. It is deliberately
**not** generated. Do not derive it.

### SR-038 · No PDF assets exist
**Found:** `feat/resource-reader` · **Affects:** the reader's download region

The repo contains **zero** `.pdf` files, though resource metadata advertises
them ("PDF · 4 pages · Printable") and a `.pdf-placeholder` component exists.
`readerMeta().hasPdf` is therefore `false` for all 92 Track 01 resources and
the download region does not render at all — no disabled state, no
placeholder. It begins rendering on its own once `hasPdf` can return true.

### SR-039 · node and Playwright are not installed
**Found:** `feat/resource-reader` · **Affects:** what verification can claim

Neither `node` nor Homebrew is present on the development machine, so the
brief's `node --check` and "Playwright over screenshot QA" cannot run.
Verification for SR-032/033/034 used the in-app browser instead: inline
scripts were parsed by loading the page and reading the console, and
behaviour was driven programmatically rather than by screenshot comparison.

Two environment facts worth keeping, both of which produced misleading
readings before they were understood:

- **CSS transitions do not advance while the browser pane is backgrounded**,
  and `requestAnimationFrame` never fires. Measure end states with
  transitions suppressed rather than trusting timed reads.
- Scrolled screenshots can composite stale while the pane is hidden. An
  unscrolled capture is trustworthy; a scrolled one may not be.

---

## Fixed

| ID | Summary |
|---|---|
| SR-002 | Bound Source Insights title; added the Anxiety Reset attention advisory to per-protocol data. Supersedes any source claiming p1 has no advisory — seven protocols have one, not six. |
| SR-027 | Track 01 protocol page brought to the approved mockup. |
| SR-029 | Empty WATCH pane replaced with an honest "not yet available" state. |
| SR-030 | Go Deeper card subtitles unified with Reader titles. |
| SR-031 | Founder video title grammar fixed for p4 and p10. |
| SR-032 | Resource reader CSS (B18) + nav theming. `.sr-cover`/`.sr-head` renamed to `.sr-rdcover`/`.sr-rdhead` to clear live collisions. |
| SR-033 | Reader data: advisory/repair moved before disclosure; `p2-crisiscard` made reachable; `READER_META` scaffold added. |
| SR-034 | Standalone resource reader page for Track 01, theme layer, guidance light. |
