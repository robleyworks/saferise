# Resource migration — run report

Branch: `feat/resource-migration`. Covers the four-step verb-form rename
(Recognition/Regulation/Release/Rehearsal → Recognise/Regulate/Release/Rise),
the copy and routing fixes that followed it, and the Phase E/F combined pass
(motion suppression, two code defects, the fix-register header, and a final
verification sweep). SR IDs: **SR-293 through SR-307**.

---

## Phase A/B — the verb-form rename (SR-293–SR-298)

**SR-293** — `content/tracks.js`'s `SHARED.fourSteps` (the single source read
by every public-facing page) switched to the verb forms; a stale header
comment still claiming step 4 was "Rehearsal" (the array itself already said
"Rise") was corrected in place.

**SR-294** — 204 mechanical hits (headings, intro labels, the
"Recognition. Regulation. Release. Rise." summary line) swapped directly
across all 30 guide resources. Everywhere the old noun functioned as a
sentence's subject/object, reworked to "the Recognise/Regulate step" — a
construction the original copy already used elsewhere, not new phrasing.

**Known gap, found and fixed in the same phase:** Phase A's original sweep
searched a literal `&` only and missed the `&amp;`-encoded form used
throughout the markup, so labels like "Identify & Name" written as
`&amp;` were invisible to that first pass. **This is the gap the current
Phase F instruction ("search both forms") exists to prevent recurring.**

**SR-295, SR-296, SR-297** — re-swept with the entity-encoded pattern and
closed that gap: index.html's journal dropdown (23 instances) and four
other structural label sites, all four `<h3>` step-comparison headings
across the 7 `method-*.html` framework pages (not just step 2, which is
all Phase A's search had surfaced), and protocol.html's matching dropdown.

**SR-298** — the five member-facing prose spots that named the four steps
in full sentences (not labels), where a straight word-swap would have
broken grammar: resource.html's guided-protocol body, three index.html
marketing/workshop passages, and the identity-sequence section 5 copy
(which also retired "Manifest"/"Manifestation" vocabulary from that
unrelated 6-part sequence — `manifestations` and the `id-manifest-*`
classes are code identifiers and were explicitly left untouched). This
commit's own closing sweep reported zero remaining old-name instances
across both `&` encodings and the paraphrased-prose variants at the time —
see the Phase F finding below for what it still missed.

## Phase C — cleanup (SR-299, SR-300)

**SR-299** — removed a stale one-time-pricing "value stack" block from the
Personal Transformation card (retired €47/€27/€270/€40/€357 figures, none
sourced from `PRICING`; the model is subscription-only).

**SR-300** — standardised 11 instances of American "recognize" family
spellings to British "recognise" in `docs/PHILOSOPHY.md`. Two related spots
deliberately left open at the time: index.html's 23 "see progress
recognized over time" instances (awaiting founder wording — still open, see
below) and index.html:8397 "recognizable" (outside the literal word list
authorized at the time).

## Phase D — routing and copy corrections (SR-301, SR-302)

**SR-301** — `dashboard.html`'s `flat|work` recommendation was routing to
t3-06 (Belonging Gap, an Unsteady-state protocol) for a flatness signal —
a mismatched pairing. Re-routed to t3-07, The Career Transition Protocol
(title confirmed verbatim against `content/tracks.js`; confirmed no other
`RECS` entry already targeted t3-07 before making the change).

**SR-302** — t3-p6's Guided Meditation and Somatic Release body copy
(`index.html`) still described flatness/disengagement (the withdrawn
Ambition Recovery subject) rather than Belonging Gap's actual
belonging/self-editing subject. Rewrote the three affected strings. Bundled
in the same commit: index.html:8397 "recognizable" → "recognisable" (same
standardisation intent as SR-300, simply outside its literal word list).

**Left open at the end of Phase D**, and still open now:
`content/t3-resources.js:1385`'s diagram alt text for
`img-067-release-t3-06.svg`. Read the SVG's own text nodes directly (not
inferred from the alt attribute): the diagram's title, box labels ("The
flatness" / "Reproaching yourself") and captions all still depict the
withdrawn Ambition Recovery flatness/self-reproach subject. The alt text
matches the SVG faithfully — both are wrong for Belonging Gap. Fixing the
alt text alone would decouple it from the image it describes, so this
stays blocked on regenerating the SVG itself.

## Phase E — motion suppression removed site-wide (SR-303)

Removed every rule and script path that suppressed motion for
reduced-motion visitors; animations now run for everyone.

**Removed** (all pure suppression, no visibility role):
- `protocol.html`, `resource.html`, `css/saferise-dashboard.css`,
  `css/saferise-method.css` — the blanket
  `@media(prefers-reduced-motion:reduce){*{transition:none!important;
  animation:none!important}html{scroll-behavior:auto}}` rule.
- `css/saferise-system.css`'s reduced-motion block — `body::before{
  animation:none}`, the sitewide `.01ms!important` transition/animation
  collapse, and the `.sr-cover`/`.sr-svc` hover-transform suppression.
- `resource.html` — two per-effect `.01ms` duration overrides (`.sr-sky`/
  `.sr-cover-sun`, `.sr-lit:before`).
- `css/saferise-dashboard.css` — the `.shifting` opacity/transition
  override and `.sr-proto{animation:none}`.
- `dashboard.html` — three JS-level early-returns: the hero slider's
  autoplay (`heroStart`), the protocol carousel's arrival drift
  (`startFlow`), and `openProtocol`'s entire reduced-motion branch (which
  skipped the scroll/fade/glide sequence and jumped straight to the
  loaded state).
- `js/saferise-system.js` — the marketing carousel's `if (reduce) return;`
  autoplay opt-out, and three `behavior: reduce ? 'auto' : 'smooth'`
  ternaries (carousel nav, chapter-rail scroll, section scrollIntoView),
  now unconditionally `'smooth'`. The now-dead `reduce` var was removed.

**Kept** — SR-288's unconditional visibility override in
`css/saferise-system.css`'s reduced-motion block: `.sr-stagger>*` and the
full `.sr-tp-revealsec` target list still force `opacity:1;transform:none`
regardless of whether `.sr-tp-in`/`.sr-in` was ever added. This guarantees
visibility for a section whose scroll trigger never fires; it does not
suppress any animation, so it survives untouched.

Two stale comments that referenced the now-removed blanket rule (one in
`css/saferise-system.css` explaining SR-288's rationale, one in
`js/saferise-track.js` explaining why the carousel's slide transition used
to look instant under reduced motion) were corrected in place per Rule 21.

**Verified:** all three track pages, no scroll — every `.sr-tp-revealsec`
target confirmed to resolve `opacity:1` when the SR-288 rule is active (this
tool's browser tab does not report itself visible/sized to page JS even
when fronted, a known limitation also recorded against SR-287/SR-288, so
the exact selector list was tested live via an unconditional injected
stylesheet rather than genuine `prefers-reduced-motion` OS emulation, which
this tool cannot toggle). The protocol carousel's SR-290 auto-advance was
confirmed still ticking on its 7000ms interval and still pausing correctly
on hover (`document.hidden`'s pause condition was overridden for the test,
since this tool's tab also always reports itself hidden to page JS).

## Two code defects (SR-304, SR-305)

**SR-304** — `.sr-tp-costimg`'s declared `aspect-ratio` was `2172/545`
(≈3.985:1). Checked the actual files rather than trusting the report: all
three cost photos (`assets/t1/cost.jpg`, `t2/cost.jpg`, `t3/cost.jpg`) are
1600×700px, exactly 16:7 (≈2.286:1), matching `content/tracks.js`'s own
`ratio: '16/7'` metadata. Corrected the CSS to `16/7`. The mismatch had
`object-fit:cover` zooming into a box far wider than the photo, clipping
roughly 43% off vertically. Verified live: box ratio now measures exactly
16/7, matching the image's natural ratio, so `cover` no longer crops
anything.

**SR-305** — `protocol.html` carried two inline base64 PNGs duplicating
files already on disk. Checked both before touching either, per
instruction:
- The `<img class="journey-new">` blob (2172×724, ~1.77MB) is
  pixel-identical to `assets/pt/protocols/anxiety-journey.webp` (mean
  channel diff <0.6/255 on a downsampled compare) — swapped to a plain
  `src` reference. Verified the swap loads correctly (`naturalWidth:2172,
  naturalHeight:724, complete:true`). Saved ~2.35MB of page weight.
- The `#experience` section's CSS `background-image` blob (~1.78MB) was
  **not** touched. Despite matching pixel dimensions (1086×1448) to the
  named duplicate target (`assets/covers/t3-01.jpg`), the two are visually
  different photographs — `t3-01.jpg` is Track 3's cover (a man in an
  office), while this page is the static Anxiety Reset Protocol (Track 1),
  and the inline image is that protocol's own cover art with a
  "REGULATE"/"01" label baked into the pixels. No on-disk file carries
  that same baked-in label (`assets/covers/01.png`/`.jpg`/`.webp` are the
  same base photo without it). Left in place rather than silently
  replacing it with an image that drops the label.

## Fix-register header (SR-306)

The header claimed "Highest ID issued: SR-179" — already known stale and
self-corrected further down (by the earlier `fix/dashboard-dead-views` run)
to SR-292, the true last body entry at that time. This pass found a second
instance of the same gap: commits already carried **SR-293 through SR-302**
(the whole verb-form migration above, SR-301/302's routing and copy work)
with no matching register-body entries. Corrected the header field to the
true highest issued ID (SR-302 at the time of the check, now SR-307 after
this pass's own allocations), and left an explicit note — matching the
register's own established convention for recording this exact failure
mode — so a future run does not reissue SR-293–307. SR-293–307 still need
their body entries backfilled; this pass only fixed the header claim and
flagged the gap, per the section's own scope ("do not renumber anything").

## Phase F — verification sweep (SR-307)

**Full repo sweep, both `&` and `&amp;` forms, plus paraphrased prose.**
Zero remaining instances of "Recognition"/"Regulation"/"Rehearsal" as the
four-step names, **with one exception found and fixed**:
`method-jung.html`'s Step 04 card had already been migrated at the heading
level (`<h3>Rise</h3>`), but the body prose beneath it still read "Not this
framework. **Rehearsal forward** comes from the distance and rehearsal
work" — a direct leftover of the old step name that the SR-298 sweep's own
"zero remaining instances" claim missed, most likely because the phrase
doesn't match a clean word-boundary pattern the same way the other
instances did. Corrected to "Rise forward comes from…", preserving "the
distance and rehearsal work" — a real, unrelated reference to Kross &
Ayduk's actual self-distancing/mental-rehearsal technique, confirmed
legitimate and left alone. `method-kross.html`'s "Rehearsal applied where
the story about yourself is the problem" was checked the same way and is
also the real Kross & Ayduk technique name, not the old step name — left
untouched. Generic uses of "regulation" as an English word ("Emotional
Regulation" resource category, "Regulation practices are not universal…"
FAQ copy, the advisory tiers' "Beyond Self-Regulation" label) are unrelated
to the four-step naming and were left alone.

No `&`/`&amp;`-joined old-name pairs (e.g. "Recognition & Regulation")
remain anywhere in the tree.

**Historical records intentionally left untouched**, per the codebase's own
rule that dated records are annotated, not rewritten:
`docs/fix-register.md:2633`'s "Recognition, after the naming" (a dated
register entry) and `docs/reference/SHARED-t2-two-instruments.md`'s prose
using the old names (explicitly marked `⛔ SUPERSEDED` and retained only as
the dated record the file's own later sections refer back to).
`docs/reference/portal-personal-target.html` (an unlinked reference mockup,
confirmed via repo-wide search to be referenced from nowhere else) also
carries an old-style `prefers-reduced-motion` suppression block and a
"Regulation practices" sentence — left untouched for the same reason: it's
a frozen reference file, not a live page, for both Phase E and this sweep.

**`manifestations` / `id-manifest`** — confirmed present and untouched, as
SR-298 left them: the `manifestations` const at `index.html:9483`
(consumed at `:9532`), and the `id-manifest`/`id-manifest-row`/
`id-manifest-from`/`id-manifest-to`/`id-manifest-arrow` classes at
`index.html:9326, 9374–9378, 9402, 9532, 9965, 10048, 10208, 10211,
10432–10433`.

**esprima** — ran (via the Python `esprima` package; no `node`/npm esprima
available in this environment) over every inline `<script>` block in every
file touched by this combined pass: `protocol.html`, `resource.html`,
`dashboard.html`, `method-jung.html`, `js/saferise-system.js`,
`js/saferise-track.js`. All non-empty blocks parsed cleanly.

**`json.loads` on `RESOURCE_CONTENT`** — parsed cleanly, 91 keys.

## Items deliberately left open

- **23× "see progress recognized over time" (index.html)** — awaiting
  founder wording; this is progress-framing copy on a product whose stated
  position is that there is no linear "progress" to track. Left open since
  SR-300; still open.
- **`content/t3-resources.js:1385` alt text** — blocked on regenerating
  `img-067-release-t3-06.svg`, which still depicts the withdrawn Ambition
  Recovery subject rather than Belonging Gap's. Left open since SR-302;
  confirmed still blocking as of this pass (Phase E/F, Step 4a of the
  prior instruction set).
- **`content/tracks.js:565`** — reviewed and kept as-is. Track-wide journey
  copy, not Ambition Recovery residue; not part of this migration's scope.
- **`protocol.html`'s `#experience` background-image (~1.78MB base64)** —
  see SR-305 above. No on-disk file carries the same baked-in
  "REGULATE"/"01" label; needs a real source asset before it can be
  deduplicated.
- **SR-293–SR-307 register-body backfill** — see SR-306 above. The header
  now states the true highest issued ID; the body entries themselves for
  this whole range still need writing up as a separate pass.

## SR IDs allocated across the whole migration

| Range | Covers |
|---|---|
| SR-293 | `SHARED.fourSteps` verb forms + stale comment fix |
| SR-294 | 204 mechanical noun→verb swaps across 30 guide resources |
| SR-295 | index.html structural labels (closed the `&amp;`-encoding gap) |
| SR-296 | method-*.html step-comparison headings (all 4 steps, all 7 pages) |
| SR-297 | protocol.html dropdown |
| SR-298 | Substantive four-step prose rewrite + Manifest/Manifestation retirement |
| SR-299 | Stale one-time-pricing block removed |
| SR-300 | British "recognise" standardisation (docs/PHILOSOPHY.md) |
| SR-301 | flat\|work dashboard routing fix (→ t3-07) |
| SR-302 | t3-p6 body copy realigned + "recognisable" fix |
| SR-303 | Motion suppression removed site-wide (Phase E) |
| SR-304 | `.sr-tp-costimg` aspect-ratio fix |
| SR-305 | protocol.html base64 image dedup (one of two) |
| SR-306 | fix-register.md header correction |
| SR-307 | Phase F sweep fix (method-jung.html) + this report |

Next run: allocate from **SR-308**. Do not reissue SR-293–307.
