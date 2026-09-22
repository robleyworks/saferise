# Imagery brief — standing

**Every image on the site and in every deck is judged against this.** It applies to
new provisioning and to anything already in place — a filled slot is not a passed
slot.

Referenced by `docs/IMAGE-INVENTORY-14SEP.md`. Add a pointer to this file in
`CLAUDE.md` so a pass does not have to be told it exists.

---

## 1 · Who

| | |
|---|---|
| **Primary bracket** | **27–37.** The customer. Most frames, most sets |
| **Others** | May appear, **primarily in group shots** — family, teams, workshops. Not as the single subject of a card or hero |
| **Origin** | Caribbean and European |
| **Class register** | Middle to upper middle. Contemporary, lively, unstyled-expensive rather than aspirational-poor or luxury |
| **Eyes** | No rule. Open or closed, whichever the frame needs |
| **Diversity** | Judged across the SET, never per image |

---

## 2 · No repetition across the site

⚠ **This is the rule most likely to be broken without anyone noticing**, because
each image is approved on its own and the repetition only appears when you scroll.

**Do not repeat, anywhere on the site:**

- **The same face.** One person, one appearance. A subject used on a track card
  does not reappear on a sector panel
- **The same hairstyle**, where it is distinctive enough to read as the same person
- **The same outfit**, or the same outfit formula. Four white t-shirts in a row is
  a repetition even with four different people
- **The same setting**, where it reads as the same room

**Audit for this at the set level.** Two images that are each fine can still be
wrong together.

**The cost/change pair is the one place a face repeats on purpose.** Each track's
`cost` and `change` images show the same person, in the same period of their life,
before and after. The repetition is the argument — a different face in the second
image would read as a different person's outcome. The same clothing across the pair
is part of that: it places both images in one stretch of time rather than in two
unrelated ones.

The rule still holds everywhere else, and **across** tracks: Personal
Transformation's subject must not appear in Professional Performance's images, or
anywhere else on the site.

*SR-415 (PASS-track-image-swap.md §2) · 22 September 2026 — recorded when Personal
Transformation's and Professional Performance's cost/change art was replaced.*

---

## 3 · Banned outright

**Props**

| | |
|---|---|
| **Coffee cups** | Massively over-used. Ban unless the shot is genuinely about a kitchen or a café, and never more than one across a set |
| **Writing in a book or notebook** | Never |
| **Pens, pencils, journals, paper** | Never |
| **Anything reading as journalling, coaching or therapy** | Never — no notepads, no facing chairs, no clipboard |

⚠ **The journalling ban has a product reason.** The journal is on the member's own
device. A photograph of someone writing in a paper notebook contradicts the
privacy architecture the whole corporate argument rests on.

**Aesthetic**

Beige linen · oatmeal palettes · lotus position · yoga mats · candles · incense ·
sunrise over water · beaches · anything that reads as minimalist wellness or
retreat-brochure.

---

## 4 · How SafeRise is used, when shown

Interaction with the platform is **digital, always**:

**Phone · iPad or tablet · laptop · headphones · AirPods or earbuds.**

Nothing else. No printed materials, no worksheets, no cue cards on paper, no
whiteboards.

---

## 5 · The range to cover

The set as a whole should reflect a life, not a demographic. Across the site,
aim for spread through:

| | |
|---|---|
| **Alone** | A real room, ordinary hour, nothing staged |
| **Couples** | Conversation, tension, repair. Not romance, not a beach |
| **Family** | Where a broader age range belongs |
| **Work** | Studio, kitchen pass, site office, desk at night. **Not only boardrooms** |
| **Movement** | Walking, training, arriving, leaving |
| **Transit** | Commute, plane, car. Where a protocol actually gets used |

---

## 6 · Composition and placement

### Heroes and banners run full page width

**Every hero and banner image spans the full viewport width**, edge to edge,
running beneath the nav. No page inset, no container margin.

⚠ **The track pages currently break this** — their banner section sits inside a
narrower margin than every other page. **That is a defect, not a variation.** Track
banners match the rest of the site: full-bleed.

### The scrim and the subject

Most slots use a left-weighted scrim, because the copy sits left.

```
object-position: 72% 30%     card images
scrim            96deg, .96 → .60 across the frame
```

**The subject belongs in the right third.** A centred face gets half-covered by the
scrim. This is a composition failure rather than a casting one, and it **only shows
up on the rendered page**, never in the file.

### Balanced presence

A hero should read as a photograph the page sits on, not as a texture behind type.
If the subject is invisible at normal viewing distance, the scrim is too heavy or
the image is wrong for the slot.

---

## 7 · Organisational surfaces

`organisations.html` and anything B2B:

- **Environments containing people**, not portraits. A buyer is looking for their
  own workplace
- **Distress is fine.** Strain, weariness and a guarded posture are what the
  product is for, and showing them is honest
- No clinical settings, patients or procedures — that is a different claim, not a
  different mood

---

## 8 · Known failures, already identified

| Set | Fails |
|---|---|
| **Relationship Healing covers** | Couples on beaches at sunset. Banned outright |
| **Professional Performance covers** | All suits and glass towers. Off-register against lively and contemporary, and a repetition of outfit formula across the set |
| **Investor deck poster set** | COMMAND and PIVOT are both suited men against towers, adjacent in the set |
| **Track page banners** | Sit inside a narrower margin than every other page. Must be full-bleed |
| **`assets/home/hero-film.webp`** | Subject functionally erased — face swallowed by the scrim, text grid over her torso |

---

## 9 · How to audit

**A filled slot is not a passed slot.** Missing-image reports never surface a wrong
image.

For every image currently rendering:

1. Does it break a §3 ban?
2. Is the subject, hair, outfit or setting repeated elsewhere on the site?
3. Does the subject sit where the scrim covers them?
4. Is the same image used in more than one place?
5. Is the hero or banner full page width, or inset?
6. Is the subject legible at normal viewing distance, or lost under the scrim?

**Report path plus the specific rule broken. Do not replace anything without a
human decision** — which image belongs where is a casting call, not a file
operation.
