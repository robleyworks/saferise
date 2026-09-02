# SafeRise — public-page invariants

This file exists because a hand-delivered drop of `plans.html`, `method.html`,
`live-sessions.html` and `about.html` silently reverted a committed fix (theme
persistence, `sessionStorage['sr-theme']` → `localStorage['sr.theme']`) along
with several other divergences from ground truth that had never been written
down anywhere. The fix was invisible in the drop's diff against itself — it
only showed up by comparing the new files against `dashboard.html` line by
line. This list exists so the next drop is checked against it, rather than
rediscovered.

Any hand-delivered public page must carry:

- **Theme**: `sessionStorage`, key `'sr-theme'`. Implementation copied
  verbatim from `dashboard.html`'s `setTheme`/`THEME_KEY` block — never
  reimplemented from a description of what it should do.
- **"Rests on:" lines**: verbatim from `dashboard.html`'s `SOURCES` object.
  Not paraphrased, even lightly — these are credibility claims, not
  descriptive copy.
- **Icons**: from `dashboard.html`'s `ICO` map, matched to the resource the
  same way `dashboard.html`'s `RES` array matches them (i.e. `gear` →
  "How This Works", `card` → "Cue Card", etc.).
- **Nav**: current public structure — Protocols ▾ (three tracks +
  coming-soon) · Method · Plans · Live sessions · About · Log in.
- `dashboard.html`'s member nav is a separate structure and must never be
  replaced by, or merged with, the public nav.
- **Prices**: €19 / €29 / €39 monthly tiers; €29 person and €39 couple
  workshops; €129 1:1; Elevation shows no figure.
- **Protocol titles**: from `content/tracks.js`, never from memory or an
  earlier drop.
- **Terms and Privacy**: remain `href="#"` until those pages exist.
