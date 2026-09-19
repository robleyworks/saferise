# Design conventions — standing

**Apply to every page and mockup without being asked.** If any of this is missing from
something I produce, it is an error, not a style choice.

---

## 1 · Imagery is provisioned by default

**Every page gets image slots planned in, not added on request.**

Minimum per page:

- **Hero underlay** — full-bleed, running beneath the nav, under a 96° scrim
- **One full-bleed interlude band** between major sections to break the reading
- **Underlays on card groups** — sector panels, service cards, feature blocks
- **A band behind any block that would otherwise be a wall of text**

**Where a file does not exist, render the hatch placeholder** —
`repeating-linear-gradient(45deg,#141a2a,#141a2a 10px,#182034 10px,#182034 20px)` — under
the normal scrim, with a labelled tag naming the expected path. Never leave a slot blank,
never substitute an unrelated image, and always list the missing files in the handover.

**Scrim constructions:**

```
hero        linear-gradient(96deg, .96 → .9 → .6 → .3) + vertical fade to ground
band        linear-gradient(0deg, ground 2% → .5 48% → .3 100%)
card        linear-gradient(0deg, panel .97 → .72)
side-by-side linear-gradient(90deg, panel 0% → .34 34% → transparent 70%)
```

---

## 2 · Icons are default

**Stroke icons, 24×24, `fill:none`, `stroke:currentColor`, `stroke-width:1.4`,
round caps and joins.** Coloured with the section or track accent.

Every named thing gets one: sectors, delivery modes, process stages, layers, tracks.
Never a bare heading where an icon would carry meaning.

---

## 3 · Motion is default

Taken from the live site. **Do not invent alternatives.**

```
transition: .3s                 default
transition: .25s                buttons
transform: scale(1.06)          image breathing, 4s cubic-bezier(.4,0,.5,1)
transform: translateX(6px)      arrows travelling
padding-left: 14px              list items indenting
filter: brightness(1.09)        filled CTA hover
border-color: <accent>          the hover signal
```

**Reveal on scroll, on every section:**
`.rv { opacity:0; transform:translateY(26px) }` → `.in`, 1.15s
`cubic-bezier(.16,.8,.3,1)`, 70ms stagger, IntersectionObserver firing once per element.

**Nothing glows.** No inset rings as the primary hover signal, no lift shadows as
decoration. The site lights a border, brightens a fill, moves an arrow.

---

## 4 · Interaction is default

**A page of static blocks is an unfinished page.** At least one real interaction per
page, chosen to fit the content:

| Content shape | Interaction |
|---|---|
| A set the reader belongs to one of | **Tabs** — sector, role, plan |
| Detail that would crowd at rest | **Hover/focus reveal** — card descriptions, layer detail |
| Two pricing modes | **Toggle** — monthly/annual |
| A sequence | **Auto-advancing rail**, 7s, pauses on hover/focus/off-screen |
| A long list of questions | **`<details>` accordion** |

**Every interaction must:**

- work on `:focus-within` as well as hover
- show content by default under `@media (hover:none)`
- be disabled or shown-open under `prefers-reduced-motion: reduce`
- **not reflow the layout** — reserve the height

---

## 5 · Bezel and emboss, not hard borders

```
border: 1px solid rgba(245,237,218,.07)
border-radius: 4px
box-shadow: inset 0 1px 0 rgba(245,237,218,.045), 0 18px 55px rgba(0,0,0,.22)
hover:   border-color → accent, deeper shadow, translateY(-2px)
```

**CTAs are pills** — `border-radius: 50px`. Never square.

---

## 6 · Layout

- **No empty grid cells.** If the count does not fill the grid, change the grid or the
  count. A four-column grid with seven items is a bug
- **No gap between nav and hero** — the hero pulls up behind the nav
- **Headlines carry scale** — hero at `clamp(3rem, 5.6vw, 5.1rem)`, line-height ~0.94,
  letter-spacing ~−0.035em. Politely-sized headlines are why a page reads flat
- **Section heads are two columns** — heading left, supporting sentence right

---

## 7 · Order

**Recognition before expansion.** A reader wants to see themselves before they will care
about breadth.

On a page with both a specific-to-you section and a here-is-everything section, the
specific one comes first. Sectors before the library. Their state before the catalogue.

---

## 8 · The test

Before handing over any page:

- Does every section that could carry an image have a slot?
- Is there at least one real interaction?
- Does every section reveal on scroll?
- Are all CTAs pills?
- Any empty grid cells?
- Does it work with `prefers-reduced-motion`, with a keyboard, and at 390px?
- Is the missing-image list written down?

**If the answer to any is no, it is not ready to show.**
