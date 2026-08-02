# Handing this to Claude Code

Six sessions, each on its own branch, each independently revertable. Do them in order — later ones assume earlier ones landed.

---

## Step 0 — Put the files in the repo

Copy from the `saferise-system/` folder:

```
css/saferise-system.css
js/saferise-system.js
docs/INTEGRATION.md
docs/HANDOFF.md          ← this file
```

Commit on `main` before starting. Nothing is wired up yet, so this commit is safe and gives you a clean point to fall back to.

---

## Step 1 — Add this to `CLAUDE.md`

Append it to what you already have. These are the rules that stop sessions rediscovering the same failures.

```markdown
## Design system

All visual styling lives in `css/saferise-system.css` and `js/saferise-system.js`.
`docs/INTEGRATION.md` is the markup contract — read it before touching any UI.

- Do NOT add styles to page files. New styling goes in the system CSS.
- Prefix every new class `sr-`. A collision has already cost real time:
  `.track` was the video scrubber at `height:3px`, and the carousel
  silently collapsed to 36px when it reused the name.
- Never use `<button>` as a card containing an aspect-ratio child.
  Chromium renders the child and leaves the button at zero height.
  Use `<article role="button" tabindex="0">`.
- Never put a literal closing script tag inside a .js file, including
  in comments. It terminates the tag if the file is ever inlined.
- Reduced motion is handled centrally in the system CSS. Do not add
  per-component `prefers-reduced-motion` blocks.
- The system CSS must load LAST, after every existing stylesheet.
  It wins by cascade order, not by `!important`.

## Platform landmines

- All Track 02 resources route through the Reader via `READER_PROTOCOLS`,
  never simple modals. A new resource type must hook into BOTH
  `openResourceModal` and the Reader's page-building loop.
- Widget injection goes after `contentEl.appendChild(page)` in `openReader`,
  branching on `data.kind`.
- Fixed nav and resource modals have a history of z-index conflicts.
- Waveform loop init is tied to audio player IDs.

## Definition of done

No task is complete until all of these pass:
- `node --check` on every JS file touched
- `JSON.parse` succeeds on the extracted `RESOURCE_CONTENT` object
- Playwright: load the page, open two protocols and one Reader resource,
  assert zero console errors
- Screenshots are not sufficient evidence. Assert on measured values.
```

---

## Step 2 — Session prompts

One branch per session. Review the diff, check the Netlify deploy preview, then merge.

### Session 1 — Wire up the system (branch: `feat/design-system`)

```
Read docs/INTEGRATION.md first.

Load css/saferise-system.css and js/saferise-system.js into the platform.
The stylesheet goes last in <head>, after every existing stylesheet.
The script goes last before </body>, with defer.

Change nothing else. No markup edits, no other CSS edits.

Then verify with Playwright and report measured values:
- .proto-item computes border-radius: 14px
- body::before has animation-name: sr-breath
- clicking a .proto-item still adds the .open class
- opening a Track 02 Reader resource still renders its pages
- zero console errors on load and after both interactions

If .proto-item radius is still 0px, the stylesheet is loading too early —
fix the load order, do not add !important.
```

Expected: a two-line diff in `index.html`, plus visible restyling across every page and all eleven `.prog-overlay` blocks.

**Check in the deploy preview before merging:** open a Track 02 protocol and page through a Reader resource. The Reader is the surface most likely to have spacing that depended on the old styles.

---

### Session 2 — Footer partial (branch: `feat/footer`)

```
Read docs/INTEGRATION.md, section "Footer + scope notice".

Build the footer as a single reusable partial and include it on every
page and every .prog-overlay. It must contain the Scope & Safety notice
exactly as specified — that text is a safety requirement, not copy to
improve. Do not reword it.

Legal links point to /terms, /privacy, /cookies for now; those pages
don't exist yet, so leave them as hrefs.

Verify: the footer appears on the journey page and on all .prog-overlay
blocks, the Scope panel contains the findahelpline.com link, and there
are zero console errors.
```

Highest priority after Session 1 — this is the one with an actual obligation attached.

---

### Session 3 — Personal Transformation portal (branch: `feat/portal-personal`)

```
Read docs/INTEGRATION.md, sections "Full-bleed banner", "Protocol covers",
"Section head, feature grid, testimonial, services, CTA band", and "FAQ".

Rebuild the #prog-personal portal using the system components, in this order:
banner, protocol covers, What's Included feature grid, testimonial,
services pair, CTA band, FAQ.

Constraints:
- Covers use <article role="button" tabindex="0">, never <button>.
- Each cover keeps the existing onclick that opens its protocol. Do not
  change routing or the accordion behaviour in this session.
- The testimonial is a placeholder. Leave the placeholder text in place.
- No prices on the services cards.
- Use the grid wrapper (.sr-covers), not the carousel, for now.

Verify: all ten covers render at a 3:4 ratio with non-zero height, clicking
a cover still opens its protocol, the FAQ details elements open and close,
and there are zero console errors at 1440px and 390px.
```

If a cover renders at zero height, it's the `<button>` problem — check the tag.

---

### Session 4 — Carousel, mobile only (branch: `feat/portal-carousel`)

```
Read docs/INTEGRATION.md, section "Protocol covers" → carousel wrapper.

Add the carousel as the mobile presentation of the protocol covers, keeping
the grid on desktop. Below 760px show the carousel, above it show the grid.
Same card markup for both — do not duplicate the cards in the DOM.

Verify: at 390px the counter reads 1 through 10 across ten next-clicks and
wraps to 1 on the eleventh; at 1440px the grid shows all ten; zero console
errors at both widths.
```

Rationale for mobile-only: a carousel hides seven of ten protocols, and someone arriving distressed is scanning for the word that matches their state. Horizontal swiping is natural on a phone and costly on a desktop.

---

### Session 5 — Remaining portals (branch: `feat/portals-remaining`)

```
Read docs/INTEGRATION.md.

Apply the same component structure from #prog-personal to #prog-couples
and #prog-corporate. Same markup, different copy, different sr-cNN colour
assignments per protocol.

Do not invent copy. Where you don't have real text, insert a clearly
marked TODO placeholder rather than writing plausible filler.

Verify the same assertions as Session 3, for each portal.
```

---

### Session 6 — Chapter rail (branch: `feat/chapter-rail`)

```
Read docs/INTEGRATION.md, section "Chapter rail".

Add data-sr-rail to the main journey page content wrapper only.
Do NOT add it to any .prog-overlay or to the Reader.

Verify: the rail builds chips from the section eyebrows, the active chip
tracks scroll position, and no rail appears inside any portal.
```

---

## Step 3 — Add the smoke test

Do this once, ideally after Session 1, and run it before every merge.

```
Add tests/smoke.spec.js — a Playwright test that:
- loads the platform
- opens two protocols from different tracks
- opens one Track 02 Reader resource and pages through it
- asserts zero console errors throughout
- asserts .proto-item border-radius is 14px

Add an npm script "test:smoke". Do not add any other test infrastructure.
```

Fifteen seconds per run, and it catches the exact class of breakage this codebase produces — routing, modal layering, waveform init.

---

## How to work with the sessions

**Scope one concern per request.** "In css/saferise-system.css, the modal is sitting behind the fixed nav — fix the stacking" gets a three-line diff you can read. "Improve the portal" gets plausible-looking edits across eight files that are hard to verify.

**Review every diff before committing.** The failure mode is not bad code, it's confident code that changes something you didn't ask about.

**When something breaks, ask for the measurement, not the fix.** "What is the computed height of `.sr-cover` and its children?" surfaces the cause. "Fix the card height" produces a workaround layered on top of the real bug — which is how the zero-height button issue would have been papered over with a hardcoded height instead of solved.

**Deploy previews are the gate.** Merge nothing you haven't clicked through on the preview URL.
