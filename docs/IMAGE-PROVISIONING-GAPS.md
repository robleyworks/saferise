# Image provisioning — the actual gaps

Audited against the live tree, 13 September 2026. **428 images on hand.** Nineteen paths
are referenced and unresolved; **six need generating.** The other thirteen are broken
references to assets that exist, and are a code fix rather than a production job.

⚠ **This supersedes `IMAGE-MANIFEST-PHOTOGRAPHY.md` (IMG-200–231).** That document was
written without an audit and specified images the site already has. **Do not generate
from it.**

---

## Part 1 — thirteen path bugs, not missing images

These are referenced in code and do not resolve. **Do not generate replacements.**

| Reference | Almost certainly |
|---|---|
| `assets/covers/NN.jpg` | A template literal caught by the grep, not a real path. Confirm and ignore. |
| `assets/covers/t1-01.jpg` … `t1-10.jpg` | Ten of them. Covers resolve at runtime as `covers/05.jpg` — **by position, without the `t1-` prefix.** So these references use a naming scheme the files don't follow. The covers exist; the references are wrong. |
| `assets/anxiety-hero.webp` | Exists in the project record. Likely moved or renamed. |
| `assets/brand/logo.png` | The wordmark. Almost certainly present under a different path — the site renders it. |

**For the code pass, not the generation lane:** resolve each against what's actually on
disk and correct the reference. **Report any that genuinely has no file behind it** — that
one becomes a production job.

The ten cover references are the important ones. If a protocol page ever falls back to
that path, it will show nothing.

---

## Part 2 — the six to generate

### Casting and register

Everything in this section that contains a person follows the same brief.

**Ages 27–37. Caribbean and European, genuinely mixed across the set.** Black, mixed-race,
South Asian, White European, Latin — no set should read as one ethnicity with exceptions.

**Upper middle class, and it should show** — in the rooms, the materials, the quality of
what they're wearing. Not wealth on display.

**Lively and contemporary.** Colour, pattern, texture, jewellery, good hair. Real personal
style.

**Not minimalist wellness.** No beige linen, no oatmeal knitwear, no white loungewear, no
quiet luxury.

**Not a meditation app.** No lotus, no mat, no candle, no incense, no sunrise, no beach,
no mountain, no hands in prayer.

**Eyes open.** Closed eyes read as stock and as absence; this product is about attention.

**Not stock-photo happy.** Nobody is having a breakthrough.

### Technical

```
Aspect      16:9 · 2400 × 1350   (heroes)
            4:5  · 1600 × 2000   (method blocks)
Format      JPEG q94 master · WebP q82 for delivery
Colour      sRGB
```

**Grade to the platform.** Dark ground `#0C0C12`, gold `#E0B658`, warm ink `#EAE2CE`.
These sit on a near-black page — deep shadow, warm highlights, real contrast. Nothing
washed out, nothing pastel, nothing cool-blue. Slight filmic grain.

**No text burned in, ever.**

---

### `assets/pages/plans-hero.jpg`

**16:9 · hero, carries live copy**

A woman early thirties, mixed race, in a good apartment in the late afternoon. Sitting
on the arm of a sofa, phone face down beside her, looking out of frame. Patterned shirt,
gold hoops. Composed, not serene.

**Compose with a quiet left third** — pricing copy sits over this.

---

### `assets/method/m-attention.jpg`

**4:5 · the method page, attention**

Close portrait, eyes open, neutral expression, natural light from one side. Someone
looking at something outside the frame with actual focus — not gazing, not dreaming.

This one is about attention being placed. The eyes are the whole image.

---

### `assets/method/m-vessel.jpg`

**4:5 · the method page, regulation**

A hand flat on a sternum, over clothing. Close, warm, no face. Rings and a watch visible.
Shoulders and the edge of a jaw at most.

Still, not tender. This is someone doing something deliberate, not comforting themselves.

---

### `assets/method/m-built.jpg`

**4:5 · the method page, what gets built**

A man early thirties, Black, at a desk in a real office, hands on something he's working
on, looking down at it. Colourful shirt, no tie. Absorbed rather than posed.

The subject is application — attention put somewhere on purpose.

---

### `assets/method/m-outward.jpg`

**4:5 · the method page, what it does outside you**

Two people mid-conversation across a kitchen island in the late afternoon. One listening
properly — not waiting to speak. Early thirties, different ethnicities, both well dressed.

The listening is the subject. Whatever is being said doesn't matter.

---

### `assets/method/res-somatic.jpg`

**4:5 · somatic release**

A person unclenching their hands on a table, mid-motion. Close, no face, natural light.
Jewellery visible.

Mid-motion is the instruction — a released hand reads as rest; a hand opening reads as
the act.

---

## Part 3 — check the set before delivering

Four of the six contain a recognisable person. **Lay them out together before sending.**

If they read as predominantly one ethnicity, regenerate whichever makes the set lopsided.
Generated one at a time, each image drifts toward the model's default, and the default is
White.

**Reject and regenerate** for any of: beige or oatmeal clothing · eyes closed · lotus,
mat, candle, incense · sunrise, sunset, beach, mountain · anyone mid-breakthrough ·
clinical setting · text in frame · washed-out or cool-blue grade.

---

## Part 4 — separately, the Relationship Healing covers

Not in the audit, and not a missing file — a register problem.

The live Relationship Healing carousel shows couples on beaches at sunset, embracing in
warm golden light. **That is precisely the imagery the casting brief above excludes**, and
it reads as stock romance rather than as this product.

Ten covers, all currently live. **Regenerating them is a real job and a separate
decision** — flagging it here so it isn't discovered later as a surprise.
