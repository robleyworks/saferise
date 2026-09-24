# VIDEO — RUNWAY GENERATION SPECIFICATION

24 September 2026. Everything needed to generate the missing footage, in the
order to generate it. Against `claude/VIDEO-B2C-FINAL-SCRIPT.md` and
`claude/VIDEO-B2B-FINAL-SCRIPT.md`. Budget in
`claude/VIDEO-PROVISIONING-AND-CREDITS.md`.

---

## 1 · Settings, every clip

| | |
|---|---|
| Model | **Veo 3.1** |
| Resolution | **1080p** |
| Duration | **8 seconds** — 1080p requires it |
| Aspect | **16:9** |
| Audio | **off** — it is voiced separately and audio quadruples the rate |
| Cost | 10 credits/second · **80 credits a clip** |

Casting stills first: **Gen-4 Image Turbo, 2 credits.** Iterate there. A video
retake costs forty times an image retake.

---

## 2 · The house block

Open every video prompt with this. It is the register the 15 September clips
proved, tightened for the panels.

> Restrained documentary shot, eye-level, subtly handheld. Muted restrained
> colour grade, dark overall exposure, warm available light, shallow depth of
> field. Real-time pacing, no slow motion, no camera push, no crane, no reveal.

And close every one with this. Every exclusion below has a reason — most of
them are failures that already happened.

> No earbuds, no headphones, no phone, no laptop, no visible screen. No
> signage, no branding, no logos, no readable text anywhere. Nobody smiling.
> No crying, no hands over the face, no head in hands. No overhead fluorescent
> light. No stock-photo posing, no looking into the lens, no gesture to camera.

**Why each matters.** Earbuds and devices say *already using the product* — the
panel characters have not found it yet. Smiling is the stock failure mode that
killed three candidates in the last sourcing round. Hands over the face and
crying are theatrical; the strain sits in the body, not in a gesture. Overhead
fluorescent is the light the grade cannot rescue.

---

## 3 · Two rules specific to these panels

**Faces are now legible, and that is a change.** The old no-face rule came from
a structure that no longer exists. A person cannot carry twenty-five seconds of
first-person confession from the back of the head. But hold the face
three-quarter and looking off, not locked to the lens — a generated face
pinned frontally for twenty-five seconds is the single hardest thing to ask of
any of these models, and obliqueness is what keeps it clean.

**Compose vertical.** Every panel spends most of the film as a **384 × 1080
slice** of the screen. Subject centred, upright, with headroom, nothing
load-bearing in the outer thirds. A wide composition dies the moment it
retires into its fifth.

**Almost no motion.** Breathing. A blink. A small shift of weight. That is the
whole movement. It suits the register and it is what the models hold best
across a long take.

---

## 4 · Casting

Caribbean first market, per the documented position, with range across the
five.

| | who | B2C | B2B |
|---|---|---|---|
| **P1** | Black Caribbean man, late 30s–40s, a manager | 02 OVERWHELM | 03 EMPLOYEE |
| **P2** | Latino or mixed-heritage man, early 30s | 05 INSECURITY | 02 EMPLOYEE |
| **P3** | White European man, late 30s–40s, a father | 03 ANGER | 01 EMPLOYEE |
| **P4** | Black Caribbean woman, early 30s | 01 ANXIETY | — |
| **P5** | East Asian or mixed-heritage woman, early 30s | 04 SHUTDOWN | — |

Casting goes **in the prompt**. It is a search parameter, not a review filter —
left to the model's default it comes back white and smiling.

---

## 5 · The five panels

Each panel: one casting still, approved before any video. Then the clips in
order, each starting from the previous clip's last frame so the person, the
room and the light hold.

Every panel ends on a **held frame** — pull it from the clip, do not generate
it. It is the freeze the panel keeps once it retires.

---

### P1 · OVERWHELM — Black Caribbean man · 33s · 5 clips
**B2C 02** (23.5s) *There's so much going on that I cannot even figure out how
to get started… my team stopped bringing me decisions… we lost a client.*
**B2B 03** (9.6s) *It's just overwhelming here every day… and then I'm to blame
for how I react.*

**Casting still**
> Editorial documentary portrait. A Black Caribbean man in his late thirties,
> short hair, open-collar shirt, sitting at a desk in a small side office late
> in the working day. Papers and a closed notebook in front of him. He is
> looking at none of it, turned slightly away, one hand flat on the desk. Not
> distressed, not crying — stalled. Warm low window light from one side, deep
> shadow on the other. Muted restrained colour grade, shallow depth of field.
> Vertical composition, subject centred with headroom. No earbuds, no phone, no
> laptop, no visible screen, no signage, no branding, no readable text, not
> smiling.

**Clip 1 — 8s.** He sits still. One slow breath in and out. His eyes move once
across the desk and settle on nothing. Nothing else happens.

**Clip 2 — 8s.** He lifts a hand as if to start something, then sets it down
again. The gesture does not complete. He stays looking away.

**Clip 3 — 8s.** Somebody passes the doorway behind him, out of focus, and does
not stop. He does not turn. The room continues without him.

**Clip 4 — 8s.** He closes his eyes for a long moment and opens them. His
shoulders drop very slightly.

**Clip 5 — 8s · the B2B cut and the freeze.** He is very still, jaw set,
looking at the middle distance. Hold. **Freeze frame: the last frame of this
clip.**

---

### P2 · INSECURITY — Latino or mixed-heritage man · 49s · 7 clips
**B2C 05** (34.6s) *I think I'm just waiting to be found out… I sign things in
the office, I smile, but I don't understand… I'm just checked out.*
**B2B 02** (14.3s) *After I got promoted — it was a good thing, but it broke
me. All my best skills were in my old position.*

**Casting still**
> Editorial documentary portrait. A Latino or mixed-heritage man in his early
> thirties, neat shirt, in a meeting room with glass to a wider office. He is
> holding a pen over a printed document, mid-signature, not reading it. His
> attention is somewhere else entirely. Colleagues soft and out of focus beyond
> the glass. Cool daylight from the glass side, warm fill from the room, deep
> shadow. Muted restrained colour grade, shallow depth of field. Vertical
> composition, subject centred with headroom. No earbuds, no phone, no laptop,
> no visible screen, no signage, no branding, no readable text, not smiling.

**Clip 1 — 8s.** He signs. The pen moves, the eyes do not follow it.

**Clip 2 — 8s.** He turns a page and rests his hand on it without reading.

**Clip 3 — 8s.** He looks up toward the glass, at the colleagues beyond it,
and away again.

**Clip 4 — 8s.** A small courteous nod to someone off-frame. The face resets to
neutral the instant it is done. **This is the beat — the nod that costs him
nothing and means nothing.**

**Clip 5 — 8s.** He sits back. One hand goes to the back of his neck and comes
down.

**Clip 6 — 8s.** He is still, looking at the document, unfocused.

**Clip 7 — 8s · the freeze.** Straight ahead, entirely absent behind the eyes.
Hold. **Freeze frame: the last frame.**

---

### P3 · ANGER — White European man · 35s · 5 clips
**B2C 03** (25.7s) *Once I feel hurt, anger just comes out of me… even my
daughter can read my face before she asks me for anything.*
**B2B 01** (9.1s) *I just speak direct. I don't really care how people feel
about it.*

Two environments. Clips 1–4 are home; clip 5 is the workplace cut.

**Casting still — home**
> Editorial documentary portrait. A white European man in his late thirties in
> a kitchen at home in the evening, standing at the counter, both hands resting
> on it. Jaw tight, looking down at the surface. The room is lived-in — a
> child's drawing on the fridge, a school bag on a chair, out of focus. Warm
> low domestic light from one lamp, deep shadow. Muted restrained colour grade,
> shallow depth of field. Vertical composition, subject centred with headroom.
> Not distressed, not shouting — contained. No earbuds, no phone, no laptop, no
> visible screen, no signage, no branding, no readable text, not smiling.

**Clip 1 — 8s.** Both hands on the counter. One slow breath. The jaw stays set.

**Clip 2 — 8s.** His grip tightens on the edge of the counter, then releases.
That is the only movement.

**Clip 3 — 8s.** He glances toward a doorway, off-frame, where a child would
be. He does not move toward it. **The held-in part is the beat.**

**Clip 4 — 8s.** He looks down again. One long breath out through the nose.
**Freeze frame: the last frame.**

**Clip 5 — 8s · the B2B cut, workplace.** Same man, now in a workplace
corridor or a doorway, mid-sentence to someone off-frame, direct and
unbothered. Not angry — certain. Cool daylight, same grade.

---

### P4 · ANXIETY — Black Caribbean woman · 26s · 4 clips
**B2C 01** (25.7s) *My mind runs worst case scenarios on a loop… it kept me off
work for six weeks. But I told him it was my back. They found out, and I got
fired.*

**Casting still**
> Editorial documentary portrait. A Black Caribbean woman in her early
> thirties, natural hair, at home in a chair by a window, early morning. She is
> upright rather than relaxed, hands together in her lap, scanning the room
> rather than resting. Awake and braced before anything has happened. Cool
> early light through the window, deep shadow in the room. Muted restrained
> colour grade, shallow depth of field. Vertical composition, subject centred
> with headroom. No earbuds, no phone, no laptop, no visible screen, no
> signage, no branding, no readable text, not smiling.

**Clip 1 — 8s.** She sits upright. Her eyes move — window, door, back — without
her head turning. The scanning is the performance.

**Clip 2 — 8s.** Her hands tighten in her lap and release. She takes a breath
that is slightly too shallow.

**Clip 3 — 8s.** She looks toward the door as though she has heard something.
Nothing happens. She stays looking a beat too long.

**Clip 4 — 8s · the freeze.** She holds still, eyes fixed on nothing, braced.
**Freeze frame: the last frame.**

---

### P5 · SHUTDOWN — East Asian or mixed-heritage woman · 26s · 4 clips
**B2C 04** (25.7s) *I feel nothing most days… I couldn't tell you one thing
that happened this week. Maybe that's why my sister stopped calling.*

**Casting still**
> Editorial documentary portrait. An East Asian or mixed-heritage woman in her
> early thirties sitting on a sofa in a dim living room in the evening, one
> lamp on across the room. She is upright but slack, hands loose beside her,
> looking at the middle of the room at nothing. Present in the room and absent
> from it. Not sad, not crying — flat. Warm low lamplight, most of the frame in
> shadow. Muted restrained colour grade, shallow depth of field. Vertical
> composition, subject centred with headroom. No earbuds, no phone, no laptop,
> no visible screen, no signage, no branding, no readable text, not smiling.

**Clip 1 — 8s.** She sits. She blinks. Nothing else moves. Hold the stillness —
**the absence of event is the shot.**

**Clip 2 — 8s.** Light changes very slightly across the room, as if outside. She
does not react to it.

**Clip 3 — 8s.** She shifts her weight once, minimally, and settles back into
the same position.

**Clip 4 — 8s · the freeze.** Eyes open, focused on nothing. **Freeze frame:
the last frame.**

---

## 6 · B2B narrator pictures — 12 clips

No people in close-up here. These are rooms and aftermaths. The house block and
the exclusions apply unchanged.

### 00 · before anyone arrives — 2 clips · 16.5s
*You hired them for their expertise.*

> A working interior at the very start of a day, before anyone has arrived. A
> hotel back-of-house corridor, or a ward station, or a kitchen pass — clean,
> ready, equipment in place. **Early light, not late** — low warm daylight
> coming in, lights not yet on. Competence implied by the equipment, not
> demonstrated by a person. Nobody in frame.

⚠ The difference between early and abandoned is **entirely in the light**. If
it reads as after-hours the beat inverts.

**Clip 1.** The still room. Dust in a shaft of light. Nothing moves but air.
**Clip 2.** A door opens somewhere off-frame and light widens across the floor.
Nobody enters yet.

### 01b · the chain — 4 clips · 28.7s
*Two people stopped speaking properly in March… by July one had resigned… in
August a customer got the end of that chain.*

**Clip 1 — the silence.** Two colleagues at adjacent workstations, both working,
neither acknowledging the other. Middle distance, faces not legible. The gap
between them is the subject.
**Clip 2 — the same room, one desk empty.** Chair pushed in, surface clear,
the neighbouring desk occupied. Nothing dramatic.
**Clip 3 — the handover of the gap.** A customer-facing counter, one person
covering alone, another position unstaffed behind them.
**Clip 4 — the aftermath.** A phone face down on a counter beside a cold cup.
No screen visible.

⚠ The review itself cannot be shown — a readable screen breaks the rule.
**Imply it.** The phone face down does the work.

### 02b · the performance conversation — 2 clips · 16.1s
*They are now the person you are having a performance conversation about.*

**Clip 1.** Two people either side of a small table in a side room, mid
conversation, both composed, neither comfortable. Middle distance, faces not
fully legible. Cool daylight.
**Clip 2.** The same room from the doorway after it has ended. Two chairs, one
pushed back.

### 03b · the notice in the drafts folder — 2 clips · 12.2s
*The work still goes out, so nobody has asked. It goes out later, and thinner.*

**Clip 1.** A desk at the end of a day, work finished and stacked, the chair
empty, one lamp still on.
**Clip 2.** A corridor with a light on in one room and the rest dark. Somebody
is still here, and it is late.

### 04b · handover, feedback, decision — 2 clips · 16.5s
*The handover after a bad shift, given while still shaking…*

Cut the first of the three from **254790848**, the already-cast frame — the
woman in the white coat, head back against the chair. Generate two:

**Clip 1 — the feedback.** Two people at a desk, one mid-sentence, the other
already closed — arms in, turned a few degrees away. **The moment listening
stopped**, which is a posture, not an expression.
**Clip 2 — the decision.** One person alone at a desk late, signing or
deciding, depleted. The decision is not visible. The state that produced it is.

---

## 7 · Order

1. **Five casting stills.** 2 credits each. Iterate until the person, the room
   and the light are right. Nothing moves until they are.
2. **P1, end to end — all five clips.** Watch the full 33 seconds before
   committing to the others. It proves the chaining and gives the real retake
   rate.
3. Re-forecast from what P1 actually cost.
4. P2–P5.
5. The twelve B2B narrator clips.
6. Upscale the seven existing 720p clips last.

⚠ Chain every clip from the **last frame of the one before**, never from the
casting still again. Restarting from the still drifts the room.
