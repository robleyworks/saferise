# VIDEO — ADOBE STOCK SOURCING, ROUND 1

23 September. Sourcing the eight empty photographic slots from Adobe Stock.
Companion to `claude/VIDEO-SHOT-BRIEF-BY-BEAT.md` (what each picture must mean)
and `claude/VIDEO-FRAME-MANIFEST.md` (what already qualifies).

**Every asset below is Adobe Stock free-tier — `pricing: "free"`, no payment.**
All licensed to the connected account and reviewed at size, not by caption.

---

## 1. The casting failure, and the rule going forward

**First pass skewed white.** Andre caught it. The position was already documented —
*"B2B casting is Caribbean first market. Mixed, plausible for hospitality,
healthcare, aviation, education"* — and it was not being applied as a search
constraint. Adobe Stock's default relevance ranking skews white and Western, and
accepting that ranking is how the bias entered.

**Standing rule: casting is a search parameter, not a review filter.** Every
people-slot query names the casting explicitly. Reviewing afterwards is too late —
by then the candidate set is already wrong.

### The harder finding underneath it

Re-running the people slots with explicit Black and mixed casting surfaced a
structural problem with this source:

| asset | caption |
|---|---|
| 705065631 | "**Happy** African American woman standing with arms crossed…" |
| 564316728 | "**Happy** African - black professional chef cooking…" |
| 552297969 | "Portrait of **smiling** african american male healthcare worker…" |
| 1897266680 | "Group of chefs **smiling** and working together… with **joy**" |

**Adobe Stock's Black-cast results are overwhelmingly tagged happy or smiling.**
That collides head-on with the brief's rule that nobody smiles in the strain
beats — and the strain beats (B2B-03, 04, 05) are precisely where the casting
matters most, because they are the film's only evidence.

So the empty-room slots source easily from stock and the **people slots do not**.
Casting the strain beats properly will likely need either a paid stock tier with
better documentary coverage, or commissioned photography. That is a sourcing
decision, not a search-query problem.

---

## 2. What was found

### Strong — take these

| slot | asset | size | note |
|---|---|---|---|
| **B2B-R2** the close | **539160375** | 3843x5765 | **Best find.** Apartment block at night, many windows lit, each a separate household. Unbranded, emphatically not a glass tower. The separateness *is* the privacy position made visual. 16:9 crop yields 3843x2162 — double the floor. |
| **B2B-R1** assistance programme | **407957008** | 5568x3712 | Chairs in rows, lights on, blank screen, nobody there, no branding. Caveat: rows are very neat, so it reads slightly **pre-session** rather than unused — the brief wants one chair out of line and something left behind. Close, not perfect. |

### Usable with a caveat

| slot | asset | size | caveat |
|---|---|---|---|
| **B2B-08** attention | **447052376** | 6000x4000 | Air traffic controller at a console, back to camera, radar screens — content is exactly the brief. But it is **high-key daylight with blown-out windows**, and the grade deepens blacks, so there is little shadow information to work with. Also white, male. |
| **B2B-10** every employee | **451517772** | 6000x3776 | Three chefs mid-service, nobody smiling, nobody to camera, working not posing, mixed casting, real available light. Register is right. But it is supplied **black and white** — it cannot be graded back into the warm house palette. |
| **B2C-08** threshold | **322345824** | 5594x3729 | Empty domestic corridor, doors, daylight from the far end. Nobody in it, correctly domestic rather than institutional. But flat, bright and estate-agent-ish — thin on shadow information. Marginal. |

### Rejected on sight — captions concealed all of these

| asset | slot | why |
|---|---|---|
| 228320293 | B2B-10 | Housekeeper **smiling beatifically**, looking up. The exact stock failure mode; undercuts the line. |
| 515501991 | B2B-03 | Composition good (two staff walking away, no faces) but **overhead fluorescent** and a **readable fire-exit sign plus red wall notices** — two rule breaks. |
| 130547739 | B2B-03 | White nurse collapsed on the floor, head in hand, bright clinical corridor. Casting, overhead light, and it reads as **despair** rather than a handover given while still shaking. |
| 970723617 | B2B-03 | Black male nurse, eyes closed, head back, in a white room with a plant and a vase. Reads as **therapy or a wellness room** (rule 5) and the pose is **resolved**, which contradicts the line. Ironically the closest thing to SafeRise practice imagery — which is exactly why it is wrong on a strain beat. |

---

## 3. Slot status after round 1

| slot | before | after |
|---|---|---|
| B2C-08 threshold | none | marginal candidate |
| B2C-12 ordinary/unremarkable | none | **none** — queries pulled the product-mockup genre |
| B2B-01 before anyone arrives | none | **none** — queries pulled people-at-reception |
| B2B-03 the handover | none | **none** — four candidates reviewed, four rejected |
| B2B-08 attention | none | candidate, exposure caveat |
| B2B-10 every employee | none | candidate, black-and-white caveat |
| B2B-R1 assistance programme | none | **strong** |
| B2B-R2 the close | none | **strong** |

Two of eight solved outright, three usable with caveats, three still open.

---

## 4. What the method proved

- Adobe Stock free-tier carries **4096x2304 to 8688x5792** — four to eight times
  the 1080p floor. Resolution is a solved problem from this source.
- Captions are unreliable: three of the four rejects looked correct by title and
  failed on sight. **Every candidate must be reviewed at size.**
- The thumbnail CDN is blocked from the session, so review requires licensing
  first. Free-tier assets make that cost nothing, but it means the workflow is
  license-then-judge rather than judge-then-license.
- Empty rooms, buildings and interiors source well. **People under strain do not** —
  see §1.
