# Type and contrast — standing specification

**Every text style on the site resolves to one of the steps below.** A size or colour not on
this sheet is a defect, not a design choice.

Measured against the ground `#0a0c14`.

---

## 1 · The problem this fixes

Eight different body sizes were in use across recent work — `.79 · .8 · .82 · .85 · .86 ·
.87 · .88 · .9rem` — and `--dim` was being used for body copy at **4.09:1**, which fails
WCAG AA for anything under 18.5px.

Technically passing is not the same as comfortable. **On a dark ground, low-contrast text at
small sizes reads as faint even when the ratio passes.** The scale below targets 6:1 as the
floor for anything a member actually reads.

---

## 2 · Colour

| Token | Was | **Now** | Ratio | Use |
|---|---|---|---|---|
| `--text` | `#f5edda` | `#f5edda` | 16.7:1 | Headings, the one emphasised word |
| `--ink` | `#ddd5c3` | **`#e4dccb`** | 14.3:1 | **Body copy. The default** |
| `--soft` | `#99938b` | **`#b3ada4`** | 8.8:1 | Secondary copy, ledes, descriptions |
| `--dim` | `#77726b` | **`#948e86`** | 6.0:1 | Captions, meta, footnotes only |

⚠ **`--dim` is never used for a sentence a member needs to read.** Captions and metadata
only. If a paragraph is set in `--dim`, it is set wrong.

### Accents

| | Was | **Now** | Ratio |
|---|---|---|---|
| Gold | `#d8aa43` | `#d8aa43` | 9.1:1 |
| Sage | `#8FA37B` | **`#9db388`** | 8.6:1 |
| Slate | `#6E86A8` | **`#8298bb`** | 6.7:1 |
| Bronze | `#B59666` | **`#c8a87a`** | 8.7:1 |

Slate at `#6E86A8` was 5.2:1 — passing but visibly the faintest thing on the page. The
lifted values sit within 2.5 ratio points of each other, so no accent reads weaker than the
others.

⚠ **An accent is never used for body copy.** Labels, numbers, prices, CTAs and single
emphasised phrases only.

---

## 3 · Size — seven steps, no others

| Step | Size | Face | Use |
|---|---|---|---|
| **Display** | `clamp(2.1rem, 3.7vw, 3.1rem)` | serif | Section headings |
| **Title** | `1.7rem` | serif | Card and panel headings |
| **Subtitle** | `1.3rem` | serif | Sub-headings, indicator names |
| **Lead** | `1.05rem` | sans | The paragraph under a heading |
| **Body** | **`0.95rem`** | sans | **Everything a member reads. The default** |
| **Caption** | **`0.85rem`** | sans | Notes, metadata. **The floor** |
| **Label** | `0.62rem` | sans, `.22em` tracking, uppercase | Eyebrows, keys, tags |

⚠ **Nothing below `0.85rem` renders on this site.** Not a note, not a footnote, not a
disclaimer. If it is too long at `0.85rem`, cut it.

⚠ **The old `.79`–`.9rem` range collapses into two steps** — `0.95rem` for anything read,
`0.85rem` for anything glanced. There is no third option.

### Line height

| | |
|---|---|
| Display and Title | `1.05–1.15` |
| Subtitle | `1.2` |
| Lead and Body | **`1.62`** |
| Caption | `1.55` |
| Label | `1` |

### Measure

Body copy caps at **`62ch`**. Leads at **`58ch`**. Card copy at **`38ch`**.
⚠ **A paragraph running the full width of a 1240px container is unreadable regardless of
size or colour.**

---

## 4 · Serif versus sans

| | |
|---|---|
| **Cormorant Garamond** | Headings, titles, prices, pull quotes, the closing line of a section |
| **DM Sans** | Body, labels, captions, CTAs, anything functional |
| **Cinzel** | Eyebrows only |

⚠ **Cormorant is a light face and loses weight fast at small sizes.** Do not use it below
`1.02rem`. A serif caption is a defect.

---

## 5 · What counts as drift

- A size not on the list in §3
- A colour not on the list in §2
- `--dim` used for a paragraph
- An accent used for body copy
- Cormorant below `1.02rem`
- A paragraph with no `max-width`
- A new token declared inline in a page rather than added to `saferise-system.css`

---

## 6 · Applying this

**Add every token to `saferise-system.css`.** Nothing inline, nothing page-local.

```css
:root{
  --text:#f5edda; --ink:#e4dccb; --soft:#b3ada4; --dim:#948e86;
  --c1:216,170,67;  --c2:157,179,136;  --c3:130,152,187;  --c4:200,168,122;

  --fs-display:clamp(2.1rem,3.7vw,3.1rem);
  --fs-title:1.7rem; --fs-sub:1.3rem; --fs-lead:1.05rem;
  --fs-body:0.95rem; --fs-caption:0.85rem; --fs-label:0.62rem;
  --lh-body:1.62; --lh-caption:1.55;
  --measure:62ch; --measure-lead:58ch; --measure-card:38ch;
}
```

**Then sweep every page and report anything that does not resolve to a token.** A hardcoded
`#99938b` or a bare `font-size:.82rem` anywhere is the thing this document exists to
prevent.
