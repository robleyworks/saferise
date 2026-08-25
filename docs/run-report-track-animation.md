# Track animation fixes · run report (`fix/track-animation`)

Three items, all three track pages (`personal-transformation.html`,
`relationship-healing.html`, `professional-performance.html`). Files touched:
`css/saferise-system.css`, `js/saferise-track.js`, `docs/fix-register.md`.
Nothing else.

Commits: `f938c5d` (SR-288), `ab8ede5` (SR-289), `8347265` (SR-290).

---

## 1 · SR-288 — reduced-motion visibility

**Selector added**, inside the existing `@media (prefers-reduced-motion:reduce)`
block in `css/saferise-system.css`, mirroring `.sr-stagger>*{opacity:1;
transform:none}`:

```
.sr-tp-revealsec .sr-tp-eyebrow,
.sr-tp-revealsec h1,
.sr-tp-revealsec h2,
.sr-tp-revealsec .sr-tp-lede,
.sr-tp-revealsec .sr-tp-herorule,
.sr-tp-revealsec .sr-tp-body,
.sr-tp-revealsec .sr-tp-sechead+*,
.sr-tp-revealsec .sr-tp-lede+*{opacity:1;transform:none}
```

**Result, Playwright (`reduced_motion: 'reduce'`), fresh load, no scroll:**

| page | `.sr-tp-revealsec` sections | below fold, untouched | elements not at opacity 1 | running transitions |
|---|---|---|---|---|
| personal-transformation.html | 11 | 10 | 0 | 0 |
| relationship-healing.html | 11 | 10 | 0 | 0 |
| professional-performance.html | 11 | 10 | 0 | 0 |

No-reduced-motion control on the same three pages: below-fold sections
measured `opacity: 0` (or a genuine in-flight `0.6s` value) — override
confirmed scoped to the media query.

---

## 2 · SR-289 — nav overflow at 390px

**Cause:** `.sr-tp-navlinks` at ≤480px is a horizontal scroll strip
(`overflow-x:auto`), initial `scrollLeft` always 0. On `relationship-healing.html`
at 390px: `scrollWidth` 597px, `clientWidth` 346px — 251px overflow, matching
the reported figure, clipping the active pill (`.sr-tp-on`) mid-word.

**Fix:** `renderNav()` now sets `#navlinks.scrollLeft` so the active link's
right edge is inside the visible width, once, after building the markup.

**Measured, Playwright, fresh load, no interaction:**

| page | width | doc overflow before | doc overflow after | active pill clipped before | active pill clipped after |
|---|---|---|---|---|---|
| personal-transformation.html | 390 | 0px | 0px | no (fits) | no |
| personal-transformation.html | 320 | 0px | 0px | no (fits) | no |
| relationship-healing.html | 390 | 0px | 0px | **yes — 251px** | no |
| relationship-healing.html | 320 | 0px | 0px | yes | no |
| professional-performance.html | 390 | 0px | 0px | yes | no |
| professional-performance.html | 320 | 0px | 0px | yes | no |

Document-level overflow was 0px in every case, before and after — the defect
was never page-level scroll (cf. SR-280); only the strip's own resting scroll
position.

---

## 3 · SR-290 — carousel auto-advance

**Prior implementation:** none for this component. `js/saferise-track.js`'s
SR-163 comment states this carousel has no timer/animation loop; confirmed
against the file. `js/saferise-system.js`'s marketing carousel autoplays by
continuous drift on a cloned track (different mechanism, different markup)
and disables itself under reduced motion — not reusable, and the opposite of
this brief. **Interval: 7000ms, chosen fresh.**

**Result, Playwright, all three track pages:**

| check | default motion | reduced motion |
|---|---|---|
| auto-advance occurs (7s interval, 1 card = 252px) | yes | yes |
| transition duration during a step | 0.45s | 0.00001s |
| console errors | 0 | 0 |

| check | result |
|---|---|
| hover over `#carViewport` pauses | yes |
| unhover resumes | yes |
| focus on `#carNext` pauses | yes |
| blur resumes | yes |
| `document.hidden=true` pauses | yes |
| visibility restored resumes | yes |
| `aria-live` on `#carousel` | `off` |
| keyboard focus moved by a tick | no |
| arrow click still moves track | yes |
| new progress/completion indicator added | no |

Swipe and wheel handlers were not modified.
