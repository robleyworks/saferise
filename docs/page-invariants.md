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

## The two surfaces (SR-320)

Every page on this site belongs to exactly one of two surfaces. A third
visual language is not permitted — a new page is either public or member,
never something in between.

**PUBLIC · decorated.** Headings in Cormorant Garamond 300 with italic
gold-lt accents, gradient band/card fills
(`linear-gradient(145deg,rgba(24,24,34,.86),rgba(14,14,21,.92))`), 18px
band radius, ground `#0A0A0F`, hairline `rgba(245,237,216,.09)`. Public
pages persuade someone who has not joined yet.

- `plans.html`, `method.html`, `live-sessions.html`, `about.html`,
  `coming-soon.html`, `anxiety-reset.html` — hand-authored, own inline `<style>`.
- `personal-transformation.html`, `relationship-healing.html`,
  `professional-performance.html` — rendered by `js/saferise-track.js`
  from `content/tracks.js`, styled by the `.sr-tp` block in
  `css/saferise-system.css`.
- `frameworks.html` and the six `method-*.html` pages (jung, kross, watts,
  mate, porges, heartmath) — styled by `css/saferise-method.css`.

**MEMBER · restrained.** Cinzel headings, flat card fills, no gradient.
Member pages get out of the way while someone is in a difficult state —
this is deliberate, not an oversight to "fix" toward the public look.

- `dashboard.html`, `protocol.html`, `resource.html`.
- The resource reader inside `index.html` (`openReader`/`READER_PROTOCOLS`
  and everything `docs/INTEGRATION.md` and `CLAUDE.md`'s platform-landmines
  section describe).

**Never differs across either line** — same value in both palettes, both
surfaces: `--gold` `#D4A843`/`#FFD894` (sunrise), `--gold-lt`, `--teal`,
`--text`, `--text2`, `--text3`, `--mob`, `--safe`, `--shut` (autonomic
states, not tracks — never rename or repurpose them), the icon set, and
`sessionStorage['sr-theme']` plus both its palettes (midnight and
sunrise render differently, but the same two palettes apply everywhere
that theme is implemented at all). A page that changes any of these to
look more "its own" has drifted off both surfaces at once.

A page's surface is fixed by what kind of moment it serves, not by when
it was built or who built it. When adding a new page, decide which
surface it belongs to before writing its first line of CSS — never
average the two, and never invent a third look because a mockup made it
look like a nice middle ground.
