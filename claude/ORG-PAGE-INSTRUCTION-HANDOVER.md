# ORGANISATION PAGE — INSTRUCTION HANDOVER

23 September. Every instruction given during development of `organisations.html`,
in the order given, reconciled against the actual files — not against memory.

**How each line was verified:** the working tree on the Mac (`organisations.html`,
`css/saferise-system.css`, `js/saferise-org-explorer.js`), the commit log, and a
fetch of the live page. Where a check could not settle something, it says so
rather than guessing.

**Status key**

| | |
|---|---|
| **LIVE** | implemented, committed, pushed — on the site now |
| **LOCAL** | implemented and committed, sitting in the 3 unpushed commits |
| **BLOCKED** | prepared but cannot deploy — see §3 |
| **NOT DONE** | no implementation found in any file |
| **OPEN** | waiting on a decision from Andre |

---

## 1 · The instructions, in order

### I-01 · The ring illustration was not appearing
> *"i'm not seeing this illustration on the page"*

**LIVE.** Ten arcs present in `organisations.html`, each `pathLength="100"`.

### I-02 · The Foundation 8 reveals were broken
> *"the foundation 8 reveals are not showing correctly"*

**LIVE.** Fixed under SR-434.

### I-03 · Foundation cover images
> *"what image is going in the foundation cover"*

**BLOCKED.** Covers prepared as `f01/f02/f03` in both as-supplied and graded
versions. They are in `pass/_f8-covers/`, which git cannot see. See §3.
Also **OPEN** — see §5.

### I-04 · The duplicated curriculum section
> *"why is that section still there"*

**LIVE.** Merged under SR-434. One occurrence of "The complete curriculum"
remains, which is correct.

### I-05 · An HR banner so the buyer sees themselves
> *"the organization page needs an image of an HR person banner sized. let the buyer see themselves being represented visually amidst the copy"*

**NOT DONE.** No `hr-band` / `band-hr` markup or CSS anywhere. Candidates were
assembled into `pass/_pool-sheets/hr-banner-candidates.jpg` for selection, and
neither the selection nor the placement was ever made. **This instruction was
never carried out.**

### I-06 · Reorder three images top-down
> *"image 1 should be this black guy, image 2 should be this couple. image 3 should be the chef"*

**BLOCKED.** Processed and staged; never moved into `assets/`.

### I-07 · Replace the photo in that section
> *"replace the photo in this section on the organization page with this one"*

**BLOCKED.** Same cause.

### I-08 · Match the exposure across the set
> *"adjust their exposure so they register with consistency next to each other"*

**BLOCKED.** The pair matcher was written and run — `match()` brings each frame
to an explicit shared mean, ceiling and chroma target with skin restored. Output
is in `pass/_org-twospace/graded/`. Never deployed.

### I-09 · Banner or underlay placement, and three missing protocol covers
> *"where on the organization page can this go as a banner or section underlay. also the protocol covers for three of them are missing"*

**BLOCKED** for the imagery. The three missing covers are the same f01–f03 above.

### I-10 · Keep the boxes translucent over the underlay
> *"so if we use the image as the underlay, can we keep the boxes translucent?"*

**LIVE**, by inheritance — `--card` is already a translucent gradient
(`rgba(24,24,34,.86)` -> `rgba(14,14,21,.92)`), so the boxes read translucent over
whatever sits behind them. The underlay image itself is **BLOCKED**.

### I-11 · Rail text unreadable, and subtext competing with headers
> *"this text isnt showing well against the underlay 'Directly supported / Reasonably expected / Observed / Not promised'"*
> *"i dont like subtext on the right side of the headers… competes for attention"*

**Section is LIVE** — "The impact pathway" is on the live page. The specific
underlay-masking and standfirst-below-the-rail treatment **could not be verified**;
no `sr-org-impact` rules were found under that name in the CSS, so either the
class differs or the treatment did not ship. **Needs a visual check.**

### I-12 · Text too close to the button
> *"this text sets too close to to button 'Private access for each person…'"*

**Unverified.** A spacing fix of this kind leaves no distinctive marker to grep
for. Check visually.

### I-13 · Turn the operating-layer copy into the film script and put the player there
> *"we should convert this into the script… and put the video player there"*
> *"no, i want only the player in the section… all of the copy goes into the script"*
> *"let the section keep a header with the player"*

**NOT DONE on the page.** No `<video>`, no player element, no player container in
`organisations.html`. The section still carries its copy.

**Done upstream:** the copy was folded into the B2B film script as v10 —
`claude/VIDEO-B2B-V10-AND-RUNTIME.md`. So the script half happened and the page
half did not. The page cannot change until the film exists, which is correct
sequencing, but it means this instruction is **still outstanding** and depends on
the film.

### I-14 · The colour is too dim to read
> *"the color of this is far too dim, i need it stronger so i can see the text easier"*

**LIVE.** Diagnosed by measurement rather than opinion: the contrast ratio was
already 7.12:1 and passing — the cause was Cormorant Garamond's hairline strokes
at 17px, not the colour. Fixed at the typeface level.

### I-15 · Illustrate The Gap with a sideways diagram
> *"cant we find a way to illustrate this text with a similar diagram as the one above but turned sideways on the right side of the image"*

**LIVE.** Built as a narrowing channel rather than a rotated copy of the arc
diagram — the arc means three co-equal layers, whereas BEFORE/DURING/AFTER is one
quantity collapsing, so a rotated arc would have stated the wrong thing.

### I-16 · Automated three-part reveal on the Gap
> *"i need an automated reveal for each part break it up the reveal in 3 parts that align with the ilustration section that glows"*

**LIVE.** Staged reveal attributes present in the markup.

### I-17 · The twelve-item Base / Foundation 8 rebuild

| | instruction | status |
|---|---|---|
| a | spacing above and below the tight text | **LIVE** |
| b | 10-tracks illustration to the right of "The base" copy | **LIVE** |
| c | remove the read-more text reveal | **LIVE** — no remnant found |
| d | remove the image behind it | **LIVE** |
| e | F8 boxes open to the **right**, box moves left — not below | **LIVE** — `.sr-org-f8dwrap` is a `300px 1fr` grid, card left, detail right |
| f | "THE FOUNDATION 8" header too small | **LIVE** |
| g | the two copy blocks are in the wrong place, they interrupt the B2B track flow | **LIVE** |
| h | remove the borders around the foundation boxes | **LIVE** — no border rule on the f8 classes; bezel and inset ring only |
| i | images should fill the box area | **LIVE** markup (`.sr-org-f8art`, `aspect-ratio:4/3`, `overflow:hidden`) — but the images themselves are **BLOCKED** |
| j | the copy layout is unusable | **LIVE** |
| k | each track must address the pain and the stuck-ness | **PARTIAL** — 01 and 02 written; **03–08 not written** |
| l | "what this track works" must deliver workplace benefits | **PARTIAL** — same, blocked on the register being approved |

### I-18 · Equal ring segments
> *"the divisions of the circle illustration need to be equally sized. parts"*

**LIVE.** Ten explicit arcs, each `stroke-dasharray="8.4 91.6"` with
`stroke-dashoffset="-(i*10 + 0.8)"` on `pathLength="100"`. The earlier version
stacked three circles with competing dash arrays, which is why they were unequal.

### I-19 · Script handover for the coder
> *"give me the script handover for coder to run this"*

**LIVE.** Written as `pass/PASS-I` (SR-434) and `pass/PASS-J` (SR-436). Both ran,
both committed, both pushed.

---

## 2 · Where the work actually sits

**Executed and pushed:** SR-434 (two commits) and SR-436 (two commits). The
structural and copy work is on the live site now — *The base*, *The gap*,
*One method, two spaces*, *The impact pathway*, *The 8 + 2 model* are all there.

**Committed but unpushed — 3 commits:**
- `c8d4080` SR-440 §3 · `.sr-org-head>p` exempts eyebrows and kickers
- `6c514aa` SR-440 §2 · explorer stack line: the 8 + 2 model, not "ten tracks"
- `09efe7e` SR-440 §1 · lower-case "ten protocols" and "these eight"

All copy and counts. Nothing layout-affecting, so nothing visibly missing.

---

## 3 · Why none of the images deployed — root cause

Every image prepared for this page is in `pass/`:

| folder | files |
|---|---|
| `pass/_f8-covers/as-supplied` + `/graded` | 12 |
| `pass/_org-gap` | 4 |
| `pass/_org-twospace` | 4 |

**`pass/` is line 5 of `.gitignore`.** Git has never been able to see those
files. They were never committable, so they were never deployable.

The markup was also never repointed. Line 139 of `organisations.html` — the
two-space section — still loads:

```
assets/sessions/workshops.webp         <- "The shared space"
assets/frameworks/guided-session.webp  <- "The private space"
```

Both of which appear **again elsewhere on the same page**: `workshops.webp` in
Delivery, `guided-session.webp` in the closing section. So that section currently
shows recycled images — the exact problem the new pair was made to solve. The
whole page references only four image files.

**This was a fault in the brief, not in execution.** Staging the images in `pass/`
for review was right. Writing briefs that changed the markup without a step to
copy the files into `assets/` and repoint the `src` was not. Claude Code did
exactly what it was told.

---

## 4 · Outstanding, in the order they bite

1. **Deploy the imagery** — copy the staged files into `assets/org/`, generate the
   webp/jpg pairs at the house encoder settings, repoint the markup. Blocked on §5.
2. **The HR banner (I-05)** — never selected, never placed. Candidates assembled.
3. **The operating-layer player (I-13)** — depends on the B2B film existing.
4. **Track copy 03–08 (I-17k, I-17l)** — blocked on the 01/02 register being approved.
5. **Push the 3 commits.**
6. **Visually check I-11 and I-12** — neither can be settled by grep.

---

## 5 · Open decisions blocking the image pass

1. **Foundation covers — as-supplied or page-graded?** Both versions are staged.
2. **Cover shape — portrait 1086x1448, or landscape 4:3 to match the band?**
   The markup currently declares `aspect-ratio:4/3`, which argues for landscape,
   but the protocol-cover standard elsewhere is portrait 1086x1448.

Answer those two and the image pass can be written as PASS-K.
