📋 PASS F — /organisations: LIBRARY EXPLORER, FOUNDATION 8 REVEAL,
             AND THREE SECTION REBUILDS

SUPERSEDES PASS-E-ORGANISATIONS-PROTOCOL-DETAIL.md §3–§8.
PASS E's §1 (data file) and §2 (thirty covers) still stand and are
restated here. Its accordion is replaced by the explorer in §3 —
do not build both.

Touches organisations.html, css/saferise-system.css, one new content
file, one new script, and thirty new image assets.

RUN STRAIGHT THROUGH. One report at the end. One commit. Do not push.

STANDING RULES — no borders anywhere (bezel / inset ring / shadow
only); no durations, timers, scrubbers or progress bars on any
practice surface; colour tokens are hex consumed with plain var()
EXCEPT in resource.html's .sr-read scope and saferise-poster.css;
`export const` is a syntax error here — plain `var`. When you change
a font-size, check line-height in the same edit. --text2/--text3 are
theme-aware; --dim/--ink/--soft are NOT.

MATCH apply · DIFFERS adapt and report · AMBIGUOUS skip that item only
and continue · VERIFY-FAIL revert that step alone and continue.
Your fix-register entries outrank this brief. Report the disagreement.
Allocate an SR ID from `git log --grep`. Commit locally. Do not push.

REFERENCE BUILDS ship with this brief. Open them; do not reinvent the
layout from the prose.
  · `PASS-F-reference-explorer.html`  — §3 and §4, working
  · `f8-tracks.json`                  — §4, the Foundation 8 copy
  · `PASS-F-reference-sections.html`  — §5, working

════════════════════════════════════════════
0 · READ FIRST, THEN REPORT, THEN EDIT
════════════════════════════════════════════
Four defects on this project came from briefs written against guessed
selectors. Before editing anything, read and report:

  a. organisations.html — the two protocol sections (#sr-org-verticals,
     #sr-org-fit) and the three in §5 (#sr-org-trust, #sr-org-capacity,
     #sr-org-impact). Confirm the 30 `.sr-org-proto` articles still
     match the PASS D shape, and report any that do not.
  b. css/saferise-system.css — report the current rules for
     `.sr-org-trust`, `.sr-org-capacity-grid`, `.sr-org-fit-note`,
     `.sr-org-pathgrid`, `.sr-org-pathrail`, `.sr-org-explore`.
  c. Byte size of organisations.html and css/saferise-system.css.
  d. Report which of the live `coming-soon.html` protocol names
     differ from `f8-tracks.json`. §4f names the count expected;
     if yours disagrees, report the difference and continue.

Report a–d BEFORE making any change.

════════════════════════════════════════════
1 · CONTENT DATA FILE  (unchanged from PASS E §1)
════════════════════════════════════════════
`b2b-protocols.json` ships with this brief — 30 records, extracted
from the B2B Protocol Catalogue v6 and reconciled against the live
page.

  1a. Place at `content/b2b-protocols.js`, wrapped as a plain var:

        /* SR-nnn · B2B protocol detail. Source: B2B Protocol Catalogue
           v6, reconciled 22 Sep. Do not edit copy here — edit the
           register and regenerate. */
        var B2B_PROTOCOLS = [ … ];

  1b. Do NOT compose new copy. Every string comes from this file, from
      content/tracks.js, or from the existing card. Report anything
      that reads wrong rather than rewriting it.

════════════════════════════════════════════
2 · COVERS — THIRTY ASSETS  (unchanged from PASS E §2)
════════════════════════════════════════════
Source: `~/Desktop/B2B protocol covers`, mapped in
`docs/business/B2B-COVER-MAP.md`.

  ⚠ THE SOURCE FOLDER IS IN REVERSE REGISTER ORDER — files run
  I16→I01 then R14→R02. Use the map, never the file order.

  2a. Target `assets/org/covers/{i01…i16,r01…r14}.webp` at 1086×1448.
  2b. `cwebp -q 78 -m 5`, plus a .jpg sibling at q82 progressive
      subsampling=1, matching the other cover sets.
  2c. i11, i12 and r01 do NOT come from that folder and ship with this
      brief already at 1086×1448.
  2d. Report total added bytes; if over 6 MB, report before committing.

  Do NOT substitute or reuse an unrelated photograph to fill a slot.
  Matching an image to a slot on dimensions rather than subject was
  done on 19 Sep and had to be retracted.

════════════════════════════════════════════
3 · THE LIBRARY EXPLORER — REPLACES THE TWO PROTOCOL SECTIONS
════════════════════════════════════════════
An HR lead does not need to read thirty protocols. They need to see
what one employee receives, then find their own industry. Thirty
collapsed rows tell them "there are a lot" and nothing else.

REPLACE the contents of #sr-org-fit and #sr-org-verticals with ONE
section, `id="sr-org-explorer"`, in the position #sr-org-fit occupies
today. Remove the other section's wrapper. Two parts:

  3a. ⚠ REVISED 22 Sep — the order below REVERSES the earlier
      instruction that the +2 come first. Build this order.

      The section reads as the agreement does: what everyone gets,
      then what varies, then what the variable part draws from.
      THREE sub-sections, in this order:

      ① `#sr-org-base` — THE BASE.
         An equation strip directly under the page lede, before any
         heading: 8 Foundation + 1 Role (14 to draw from) + 1 Industry
         (16 to draw from) = 10 tracks per person (224 combinations).
         The total cell is the only one on accent ground. It is a
         flex row that becomes a stacked grid under 820px with the
         operators hidden.

         ⚠ ALL COPY ON THIS SECTION WAS REWRITTEN 22 Sep. The strings
         below supersede every earlier version in this brief. Take them
         from `PASS-F-reference-explorer.html` verbatim — do not
         retype from this prose and do not compose replacements.

         Every header is pain-point → solution. None describes the
         product. The assessment is in
         `claude/COPY-ASSESSMENT-ORGANISATIONS.md`; if a header has to
         change, it must still name a cost the HR lead carries and
         answer it with what is supplied.

         Headers, as they now read:
           ① "The expertise is already paid for. These eight keep it
              reachable."
           ② "Support that fits everyone fits no one, and goes unused"
           ③ "Answer every department without buying a vendor for
              each one"

         Each of the three section ledes shows TWO sentences, with the
         remainder behind a `Read more` control that toggles
         `aria-expanded` on itself and swaps its own label to
         `Read less`. The reveal is a real button, not a hover — these
         are paragraphs a reader needs time inside. The visible opener
         always carries the concrete image; the reveal carries the
         reasoning.

         Then three benefit items — One vocabulary / Nobody nominated /
         Private by construction. Each is a 26px line ICON (not an
         illustration — illustrated versions were rejected), a short
         title, one visible line, and a detail revealed on hover and
         on `:focus-within`. Hairline dividers between them, no boxes.
         Always-revealed under `(hover:none)` and 900px.

         ⛔ NO OUTCOME CLAIMS ANYWHERE IN THIS SECTION. No retention,
         absence, turnover, productivity or engagement figure, and no
         multiplier. Every claim is about what is supplied — who can
         reach it, how many invoices, what the team has to run — or
         about a cost the buyer already recognises. The privacy line
         is verbatim: "You fund access. They own what happens inside
         it."

      ② `#sr-org-plustwo` — THE TWO THAT VARY.
         Heading ② above, then the two `<select>`
         controls — Role (14) and Industry (16) — then the serif line:

           "Someone in <Role>, working in <Industry>, receives ten
            tracks."

         then the two selected protocols as cards with cover, kicker,
         name, lead and anchor.

      ③ `#sr-org-wall` — what the last two draw from (§3c).

  3b. ⚠ REVISED 22 Sep — BOTH SELECTS ARE ALPHABETICAL, AND THEY ARE
      NO LONGER INDEPENDENT.

      Sort both lists by title, not by ID.

      A role that only makes sense inside one environment is offered
      only there. Drive it from one map, so a second case is one line
      and not new logic:

        var ROLE_ONLY_IN = { R13: "I13" };

      **R13 Athletic Performance** is the case. Its register entry
      serves "competitive amateur, academy, collegiate, elite and
      professional athletes" — a population, not a corporate function,
      and the only one of the fourteen that is not a job family. It is
      correct for I13 Sport Performance buyers and reads as a mismatch
      to every other buyer. So the role list carries 13 entries
      normally and 14 when the environment is Sport Performance.
      Rebuild the role list on every environment change, keep the
      current role when it is still valid, and fall back to the
      default when it is not — never leave a dead selection.

      Default: **R04 Frontline Service / I03 Hospitality**, with a
      fallback to the first entry if either ID leaves the register.
      NOT the alphabetical first — that is Athletic Performance, which
      is the worst possible first impression for this buyer.

      ⚠ The deep link in the next paragraph must apply INDUSTRY BEFORE
      ROLE. Applied the other way round, an `?role=R13` link is
      silently dropped because R13 is not in the list yet.

      If the page is reached with `?role=Rnn&industry=Inn`, honour it —
      this lets a single combination be sent to a buyer. Report
      whether you wired it.

  3c. THE WALL. All 30 context protocols as cover tiles,
      `repeat(auto-fill,minmax(124px,1fr))`, role first then industry,
      each with an ID chip, name and anchor, and the green/blue corner
      marker. Three filter buttons — All 30 / Role 14 / Industry 16 —
      using `aria-pressed`.

      ⚠ REVISED 22 Sep — this replaces "dim in place". A filtered-out
      tile is set `display:none` so the grid REFLOWS and the matching
      tiles pack to the top-left. Dimming in place leaves the reader
      hunting through gaps. Re-running the filter replays a short
      enter animation on the visible tiles so the regroup is legible
      rather than a jump. Changing the filter also closes any open
      detail panel — the panel it described may no longer be visible.
      Honour `prefers-reduced-motion`.

  3d. Selecting a tile opens ONE detail panel above the wall carrying
      the full catalogue entry: lead, subtitle, Why this protocol
      matters, the Without/With pair, core territory as tags, the six
      resources, organisational value, and the guard line on the six
      that carry one. Cover, anchor and who-it-serves sit in a 200px
      left rail so the reading column keeps a sane measure.

  3e. THE WITHOUT/WITH PAIR IS THE MOST PERSUASIVE CONTENT ON THE
      PAGE. It must not read as two matching boxes. "Without" is
      recessed — dim ground, grey top rule, muted text, dull pip.
      "With" is lifted — accent ground, solid accent top bar, haloed
      pip, white text, drop shadow. A chevron between them points
      from one to the other, rotating to point down when they stack.
      Body copy at 14.5px, NOT the 12.5px used elsewhere in the panel.

  3f. Detail content renders from B2B_PROTOCOLS at runtime here — this
      section is an interactive tool, not a document, and thirty
      expanded panels in the served HTML would triple the page weight
      for content nobody reads at rest. BUT see §7a: the thirty
      protocol names, leads and anchors must still exist in the served
      markup for indexing.

════════════════════════════════════════════
4 · THE FOUNDATION 8 — MATCHING CARDS, WITH A READABLE SUMMARY
════════════════════════════════════════════
  4a. The eight tracks use the SAME card component as the +2 — same
      box, same padding, same image slot, same kicker/title/lead
      hierarchy. They are buttons, not divs.

  4b. NO PORTRAIT COVER ART EXISTS FOR THE EIGHT TRACKS. `assets/tracks`
      holds only `t1-card`; `assets/home` holds landscape door and
      panel images for the three live tracks only. Do NOT crop a
      landscape image to fill a portrait slot and do NOT leave three
      cards with photography and five without.

      Until eight covers at 1086×1448 exist, every card uses a
      typographic plate in the cover slot: the track numeral in
      Cormorant, the layer word beneath it, on a ground tinted by
      layer — Capacity gold, Relational #C08A76, Application #7BA3CC,
      Substrate #6E9080, Beyond #9C8FC4 — with the same corner marker.
      Report this as an outstanding asset request: 8 portrait covers.

  4c. ⚠ REVISED 22 Sep — this replaces the earlier instruction to read
      `content/tracks.js`. Copy for ALL EIGHT tracks now exists and
      ships with this brief as `f8-tracks.json`. Do not read
      `content/tracks.js` for this panel; the two sources disagree and
      the reconciliation is not yet decided (see §4f).

      Selecting a track opens a panel BELOW the eight, in the same
      treatment as §3d. Every panel carries the SAME six fields — this
      uniformity is the point, and is what fixed the earlier version
      where five of eight looked unfinished:

        left rail   · the layer plate, the layer name,
                      and `audience` under "Who it serves"
        column one  · `story`  → "What this track works"
                    · `depth`  → "Depth specific to this track"
        column two  · `protocols[]` → "Ten protocols", numbered 01–10,
                      one column, in the order given
                    · `guard` → the boundary line, in the `.dguard`
                      treatment

      Two columns, not one. A single column left a third of the panel
      empty and ran it ~30% taller.

  4d. The resource sentence — "guided practice, cue cards, expert
      insights, safe practice, private journaling and progress
      reporting, decision support, and communication and repair
      resources" — is IDENTICAL for all twelve tracks in the source.
      Render it ONCE, above the eight cards, as a single quiet line.
      Do NOT repeat it inside eight panels.

  4e. ⛔ DO NOT RENDER the Market outlook block — Interest,
      Favourability, Demand, Revenue contribution, or any of its three
      commentary paragraphs. The source file states these are
      "editorial hypotheses on a 1–5 scale, not measured demand or
      revenue forecasts". They are internal and they are also a
      development-status signal, which is not customer-facing
      (decided 22 Sep). The boundary line IS rendered — it is a scope
      commitment, not a forecast.

  4f. ⚠ CONFLICT — READ BEFORE TOUCHING coming-soon.html.
      The protocol names in `f8-tracks.json` differ from the names
      rendered on the LIVE `coming-soon.html` in **40 places across 9
      tracks**. Strength & Return differs in all ten and is a
      different track, not a rename. Full diff:
      `claude/PROTOCOL-NAME-CONFLICTS.md`.

      For THIS pass: render `f8-tracks.json` as given.
      Do NOT change `coming-soon.html`. Do NOT reconcile the two.
      Report that you have read the conflict document.

  4h. ⚠ ADDED 22 Sep — SECTION BANNER UNDERLAYS.
      The base section header (§1 of §3a) and the plus-two section
      header each sit on a photographic band behind the copy.

      Structure: the band is the first child of `.sechead`, absolutely
      positioned, `z-index:0`; every sibling in that header is
      `position:relative; z-index:2`. The band is NOT a sibling of the
      header and NOT a foreground image.

      Treatment, matching the house rules — no borders anywhere:
        · a horizontal mask fading the band out at both ends, so it
          dissolves into the page rather than sitting in a frame;
        · a two-axis scrim — dark at the left where the copy sits,
          lightening to the right, plus top and bottom — so the type
          stays legible whatever the photograph does;
        · the two bands take different `background-position` values
          and slightly different scrim stops, so they read as a set
          rather than as the same image twice.

      ⛔ OVERFLOW. Do NOT bleed the band with `width:100vw` and a
      negative margin. `100vw` includes the scrollbar and pushes the
      page sideways at every width. The band is inset to the wrap's
      padding edge (`left:-20px; right:-20px`) and the WRAP carries
      `overflow-x:clip` — clip, not hidden, so no scroll container is
      created and in-page anchors keep working.

      While fixing this in the reference build, a PRE-EXISTING defect
      surfaced: the hero's background glow uses a negative percentage
      inset and had been pushing the page sideways on its own, at
      1440, 1280 and 390. The same `overflow-x:clip` on the wrap
      contains both. **Check for this on the live page and report it**
      — the earlier version of this table wrongly recorded the before
      value as 0.

      ✅ RESOLVED 22 Sep — BOTH PHOTOGRAPHS NOW EXIST and are already
      in the repo at `assets/org/`, as .jpg and .webp, both 2360×640:

        band-base.webp      — a warehouse worker seated mid-shift with
                              a flask, head above the crop so there is
                              no face and no eye contact. Sourced from
                              `Desktop/Organization/exec-c4ae1ccd-…png`,
                              mirrored so the subject sits right and
                              the copy has quiet ground left.
                              Upscaled 1.63× from 1448px — acceptable
                              at 30% opacity behind a scrim, but if a
                              native-width source appears, replace it.

        band-plustwo.webp   — an emergency-dispatch operator turned
                              away, monitor wall behind. Sourced from
                              `Desktop/Organization/ChatGPT Image 21
                              Sept 2026, 06_15_40.png`, mirrored.
                              Same 1.63× upscale caveat.
                              Carries `filter:brightness(1.22)` and a
                              lighter scrim than band-base — without
                              it the environment is unreadable, and
                              the environment IS the argument in that
                              section.

        band-plustwo-alt.webp — an empty sunlit corridor, 2400px
                              native, no upscale, no people. Held as
                              the alternate if the dispatch image
                              reads as too sector-specific. Do not
                              ship both.

      The placement-slot markup is removed. If a band ever has no
      image, restore a slot rather than substituting another
      photograph.

  4g. COLLAPSE — FOUR WAYS, ALL REQUIRED. Every opened panel —
      Foundation 8 and protocol detail alike — closes by:
        · a visible **Close** control at its top right;
        · selecting the open card again;
        · Escape;
        · ⚠ ADDED 22 Sep — clicking ANYWHERE outside the open panel
          and its own grid.

      The fourth is the one readers reach for first. Without it they
      must scroll back to find the card they opened, which on the
      wall can be most of a screen away.

      Implement it as a single capture-phase `pointerdown` listener on
      `document` that closes the Foundation panel when the event
      target is outside both `#f8detail` and the eight cards, and the
      protocol panel when it is outside `#detail`, the wall and the
      filter row. Capture phase matters: a bubbling listener races the
      card's own handler and the panel closes and reopens.

      On close by Close, re-select or Escape, focus returns to the
      card that opened it. On close by clicking out, do NOT move
      focus — the reader is already going somewhere else.

════════════════════════════════════════════
5 · THREE SECTIONS REBUILT
════════════════════════════════════════════
Reference build: `PASS-F-reference-sections.html`.

  5a. HEADERS — ALL THREE. `.sr-org-head` is currently a two-column
      grid with the supporting paragraph to the right of the heading.
      It competes with the heading for attention. Make it ONE column:
      eyebrow → h2 (max-width 22ch) → lede (max-width 58ch, one step
      down in both size and colour). Apply to every section on the
      page that uses `.sr-org-head`, not only these three, and report
      how many you changed.

  5b. SPACING. Define a six-step scale as tokens (6/10/16/24/34/48/64)
      and take every gap in the sections you touch from it. Section
      padding drops from 88px to 64px. Report any value you had to
      leave off-scale and why.

  5c. #sr-org-trust — the six refusals. Three columns with one
      four-sentence item and five one-liners means row height is set
      by the longest and the short ones sit over voids. Go to TWO
      columns. Give each item a struck-circle mark at the left: they
      are all refusals and nothing in the current design says so.
      Body copy is hidden at rest and revealed on hover or focus.
      `.sr-org-fit-note` — Good fit takes the sage accent and a lifted
      treatment; Not a fit is recessed and grey. They are currently
      identical, which wastes the contrast.

  5d. #sr-org-capacity — Recognise / Regulate / Recover choice is a
      SEQUENCE rendered as three unconnected columns. Add one
      continuous gold rail across all three with the numerals as nodes
      on it. `h3` currently carries `margin:8px 0 24px`; the 24px is
      what creates the gap under each title — take it to 6px.
      `.sr-org-pull` HAS NO CSS AT ALL — that is why the closing line
      floats. Style it: serif italic, 56ch, hairline above.

  5e. #sr-org-impact — the confidence dots are positioned at 9%, 40%,
      70% and 91% against a grid whose first column is 1.18fr and the
      rest 1fr. THEY CAN NEVER ALIGN. Make the four columns equal and
      give the rail its own four-column grid with identical gaps, so
      alignment is structural rather than numeric. Split "Observed,
      not promised" across the third and fourth cells so all four
      stages are labelled. Equalise card heights (`min-height:2.28em`
      on the h3, aligned to its bottom). Card descriptions reveal on
      hover/focus like §5c.
      `.sr-org-explore>span` carries `max-width:110px`, which is why
      "Areas teams explore" wraps to three lines; a later rule tries to
      override it and loses. Resolve the collision rather than adding
      a third rule.

  5f. ENTRANCE ANIMATION, used sparingly: the capacity rail draws
      across on load and its three steps rise in sequence behind it;
      the four pathway cards stagger in. Nothing else animates.

  5g. HOVER IS NOT THE ONLY ROUTE. Every reveal in §5c and §5e also
      triggers on `:focus-within`, and under `@media(hover:none)` or
      below 900px all hidden copy is shown unconditionally. Content
      reachable only by hover is a defect.

  5h. `prefers-reduced-motion: reduce` disables every animation and
      transition added by this pass.

════════════════════════════════════════════
6 · BORDER VIOLATIONS TO FIX WHILE YOU ARE IN THERE
════════════════════════════════════════════
These three rules use `border` and predate the standing rule:

    .sr-org-trust article        border-top:1px solid var(--gold)
    .sr-org-capacity-grid article border-top:1px solid var(--gold)
    .sr-org-fit-note>div          border:1px solid var(--hair)

Replace all three with inset box-shadows. Then grep the whole of
css/saferise-system.css for `border:` and `border-top:` and REPORT
the count — do not fix others in this pass, just report them.

════════════════════════════════════════════
7 · WHAT THIS PASS DELIBERATELY DOES NOT DO
════════════════════════════════════════════
  7a. No separate cover-preview grid. The covers live in the explorer.
      But the thirty protocol names, leads and anchors MUST remain in
      the served HTML — render them as a visually-hidden list inside
      #sr-org-explorer, or as the tiles' own markup, so the page is
      still indexable with JS disabled. Report which you chose.
  7b. No development status anywhere. Decided 22 Sep, still in force.
  7c. No cover taglines. The anchor is the better line.
  7d. No internal editorial scores, no proposed success measures, and
      no "best-fit deployment" — that last is verbatim identical to
      Organisational value in all 30 records.
  7e. Do NOT build PASS E's accordion. This supersedes it.

════════════════════════════════════════════
8 · TWO ANCHORS DISAGREE — RENDER THE SITE'S, REPORT BOTH
════════════════════════════════════════════
Matched by title, 28 of 30 anchors agree between the live page and
Catalogue v6. Two do not:

  R02 Business Ownership  site "The Weight of Ownership" · v6 "Ownership Weight"
  I13 Sport Performance   site "Competition to Recovery"  · v6 "Competition Recovery"

Render the SITE forms; b2b-protocols.json already carries them. Report
both to Andre as an open decision. Do not reconcile them yourself — an
anchor is a product name and must be frozen deliberately.

════════════════════════════════════════════
9 · VERIFY
════════════════════════════════════════════
  cd audit && python3 sr-design-audit.py

  metric                                          before   after
  protocol tiles rendered                              –      30
  Foundation 8 cards rendered                          –       8
  Foundation panels with all six fields                –       8
  Market-outlook scores rendered anywhere              –       0
  repeats of the shared resource sentence              –       1
  covers referenced and resolving                      0      30
  broken image references                              0       0
  `border:` declarations added by this pass            –       0
  `border:` removed (§6)                               –       3
  two-column .sr-org-head remaining                    ?       0
  tiles hidden (not dimmed) under Role filter          –      16
  tiles hidden (not dimmed) under Industry filter      –      14
  ways to close an open panel                          –       4
  section bands rendering a real image (§4h)           –       2
  horizontal overflow at 1440 / 1280 / 390           > 0       0  ← see §4h
  console errors across the page                       0       0
  orphaned aria-controls                               –       0
  contrast failures on the page                        ?  ≤ before

  9a. Verify through the visitor's route, not by opening files.
  9b. Confirm the section order is base → plus two → wall, and that
      the equation strip sits above the first heading. Change both
      selects and confirm the +2 cards and the sentence update, and
      that the Foundation 8 does not.
  9c. Open a Foundation 8 track, a protocol tile, and at least three
      further Foundation tracks. Every Foundation panel must carry all
      six fields — no panel is thinner than any other, and none shows
      a Market outlook score. Confirm Close, re-select and Escape
      all dismiss, and that focus returns to the originating card.
  9d. Tab the whole section: one stop per card, Enter and Space both
      activate, focus ring visible throughout.
  9e. At 390px confirm no hidden copy is unreachable and no
      horizontal scroll.
  9g. ⚠ MEASURE horizontal overflow, do not eyeball it. At 1440, 1280
      and 390, `document.body.scrollWidth` must equal
      `document.documentElement.clientWidth`. The reference build
      failed this at all three widths before §4h was applied, and it
      was invisible on screen — the page simply scrolled sideways into
      empty ground. If a width fails, find the element with
      `[...document.querySelectorAll("*")].filter(el =>
      el.scrollWidth > innerWidth)` and report it rather than adding a
      second clip.
  9f. With JS disabled, confirm the thirty protocol names are still in
      the served HTML (§7a).

════════════════════════════════════════════
10 · COMMIT AND REPORT
════════════════════════════════════════════
One commit. Next free SR ID from `git log --grep`. Do not push.
Fix-register entry as the codebase already does it.

Report:
  1. Anything in this brief wrong against live code (§0).
  2. The §9 table.
  3. Byte growth: organisations.html, saferise-system.css, assets, JS.
  4. The §6 repo-wide `border:` count.
  5. How many `.sr-org-head` blocks you converted (§5a).
  6. Any off-scale spacing value you kept, and why (§5b).
  7. Which indexing route you chose for §7a.
  8. Whether the query-string deep link landed (§3b).
  9. The two anchor conflicts (§8), restated for Andre's decision.
 10. Outstanding assets, all three of them:
       · 8 Foundation track covers at 1086×1448 (§4b)
       · ~~band-base.webp~~ ✅ delivered 22 Sep
       · ~~band-plustwo.webp~~ ✅ delivered 22 Sep
     ✅ The two bands are DONE and in `assets/org/` (§4h). Only the
     8 Foundation covers remain outstanding. Do NOT substitute an
     existing photograph for a missing asset — a placement slot with
     its brief is the correct state until the real asset exists.
