# PASS-CONSOLIDATED-2026-09-08 — Section 10 acceptance table

Re-run of SR-354's own acceptance test, after all of this pass's sections
(1–9). Measured live in the Browser pane against the served site
(`js/saferise-resources.js`'s `resolveSet(track, protocolNo)`, called
directly for all 30 protocols), not by reading source.

## Resource-count table, before/after

The only expected change is +1 per protocol, from The Decision (Section 1).
Confirmed: every one of the 30 protocols shows exactly +1, nothing else
moved.

| Protocol | Before | After | Delta |
|---|---|---|---|
| t1-01 | 9 | 10 | +1 |
| t1-02 | 10 | 11 | +1 |
| t1-03 | 9 | 10 | +1 |
| t1-04 | 10 | 11 | +1 |
| t1-05 | 8 | 9 | +1 |
| t1-06 | 8 | 9 | +1 |
| t1-07 | 8 | 9 | +1 |
| t1-08 | 10 | 11 | +1 |
| t1-09 | 10 | 11 | +1 |
| t1-10 | 10 | 11 | +1 |
| t2-01 | 10 | 11 | +1 |
| t2-02 | 10 | 11 | +1 |
| t2-03 | 11 | 12 | +1 |
| t2-04 | 11 | 12 | +1 |
| t2-05 | 10 | 11 | +1 |
| t2-06 | 10 | 11 | +1 |
| t2-07 | 9 | 10 | +1 |
| t2-08 | 9 | 10 | +1 |
| t2-09 | 11 | 12 | +1 |
| t2-10 | 10 | 11 | +1 |
| t3-01 | 9 | 10 | +1 |
| t3-02 | 11 | 12 | +1 |
| t3-03 | 9 | 10 | +1 |
| t3-04 | 9 | 10 | +1 |
| t3-05 | 9 | 10 | +1 |
| t3-06 | 10 | 11 | +1 |
| t3-07 | 9 | 10 | +1 |
| t3-08 | 10 | 11 | +1 |
| t3-09 | 10 | 11 | +1 |
| t3-10 | 9 | 10 | +1 |
| **Total** | **288** | **318** | **+30** |

Before-total (288) matches `docs/PASS-full-resource-access-acceptance-table.md`'s
own total exactly, confirming nothing else in the resource sets moved
between that pass and this one.

## Assertion results (all 30 protocols, all 318 resources)

Run in-browser via `window.SafeRiseResources.resolveSet(track, no)` for
every `t{1,2,3}-{01..10}`, with all three content stores loaded together
for the purpose of this cross-protocol test (`resource.html` itself now
loads only one store at a time per Section 3 — see that section's own
report):

- **Zero empty bodies** — every resolved resource's `body`, stripped of
  HTML tags, has non-zero trimmed length. 0 / 318.
- **Zero duplicate body text within a protocol** — no two resources on the
  same protocol share identical body HTML. 0 / 318.
- **Zero cross-protocol body-text leakage** — body strings that recur are
  checked for whether they appear under more than one protocol; none of
  the (very few) recurring long strings (see `T2_SHARED.twoParts`, a
  deliberately shared block) leaked into a protocol that shouldn't carry
  it. 0 leaks found among all bodies longer than 30 characters.
- **Every protocol's resource list ends in `decision`** — confirmed for
  all 30, matching the source's own ordering (Section 1, 0 exceptions).
- **Theme persistence** (`sessionStorage['sr-theme']`) — set and read back
  correctly on `resource.html?embed=1`.
- **`embed=1` suppression** — `document.documentElement` carries
  `sr-embedded` when the param is present.
- **Track pages render** after the Sections 1–2 `content/tracks.js`
  changes — `personal-transformation.html` loaded with 0 console errors,
  10 protocol cards present.
- **`dashboard.html` renders** after the Section 6 wording change — loaded
  with 0 console errors, `.sr-dash-idbody` reads "The identity you keep
  choosing...", 20 cards in the (doubled) carousel row.
- **Legal pages render** after Section 7 — `terms.html` and `privacy.html`
  loaded with 0 console errors; `Last updated: 23 October 2026`,
  the testing/efficacy paragraph, and the device-only-storage paragraph
  all present in rendered text.
- **Framework-page disclaimer removal verified live** — `member-kross.html`
  no longer contains the clinical-trial sentence; its crisis-note paragraph
  is untouched. `member-frameworks.html`'s now-empty `.sr-fw-disc` shell
  was removed rather than left as an empty glyph-only box (see Section 7c's
  own report) — confirmed absent from the rendered DOM, 0 console errors.
- **Section 8 (carousel) was classified TRANSFORM** — 8b did not run, so
  its own sub-checklist (computed card styles, drift rate, clone counts,
  Track 04) does not apply this pass. See Section 8's report for the full
  classification evidence.

## Track 01 rows (pasted into the report body per Section 11)

| Protocol | Before | After | Delta |
|---|---|---|---|
| t1-01 | 9 | 10 | +1 |
| t1-02 | 10 | 11 | +1 |
| t1-03 | 9 | 10 | +1 |
| t1-04 | 10 | 11 | +1 |
| t1-05 | 8 | 9 | +1 |
| t1-06 | 8 | 9 | +1 |
| t1-07 | 8 | 9 | +1 |
| t1-08 | 10 | 11 | +1 |
| t1-09 | 10 | 11 | +1 |
| t1-10 | 10 | 11 | +1 |
