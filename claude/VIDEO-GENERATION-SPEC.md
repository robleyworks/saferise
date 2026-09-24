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

Open every video prompt with this.

> Cinematic scene, 1080p, shallow depth of field, muted restrained colour
> grade, dark overall exposure, warm available light. Natural performance,
> real-time pacing, no slow motion, no camera push, no crane, no reveal.

Close every one with this. Every exclusion is a failure that already happened.

> No earbuds, no headphones, no phone, no laptop, no visible screen. No
> signage, no branding, no logos, no readable text anywhere. Nobody smiling
> except where the script asks for it. No crying, no hands over the face, no
> head in hands. No overhead fluorescent light. No stock-photo posing, no
> looking into the lens, no gesture to camera.

**Why each matters.** Earbuds and devices say *already using the product* — none
of these characters has found it yet. Smiling is the stock failure mode that
killed three candidates in the last sourcing round. Hands over the face and
crying are theatrical; the cost sits in what the scene does to other people.
Overhead fluorescent is the light the grade cannot rescue.

---

## 3 · The register — one face, one object, one absence

**The person is in the scene of the issue.** Not observed from across a room,
not a portrait of a mood — inside the event the monologue describes.

But the expensive part of a scene is never the lead. It is **a second person
having to act.** A reaction shot is the hardest thing any of these models
renders: two faces, a timed exchange, an emotion that has to land on cue. That
is where the retakes go.

So the other party is present as **evidence, not performance**:

| instead of | use |
|---|---|
| a colleague reacting | a soft out-of-focus figure who never turns |
| someone handing him a page | **a hand entering frame** — no second face |
| a child watching and retreating | **a small backlit shape** in a doorway, stepping out |
| a manager mid-sentence | **the empty chair opposite**, and the letter already on the desk |
| a phone conversation | **the phone lighting up**, which is a light change, not a performance |

**One face has to work. Everything else is furniture, bokeh, or an object.**

This is not a retreat to the observational register. The scene is still the
event — the meeting is still happening, the daughter still came to the door, the
firing still happened. What changes is that the second party is shown by its
trace rather than by its acting.

### The render rules that follow

- **Camera locked or barely drifting.** Handheld micro-drift is free; a move,
  a push or a rack focus is a retake generator.
- **Nobody crosses in front of the lead.** Traffic across frame is where
  limbs and faces break.
- **Never ask for an expression to change mid-clip.** Ask for a held state and
  **one physical beat** — a hand set down, a head turning a few degrees, a
  light going out.
- **Hands at middle distance, resting or doing one simple thing.** Hands in
  close-up doing detail work is the second-worst case after two faces.
- **No mouths speaking.** The voice is interior monologue; nothing needs to
  be said on camera, and speech is where faces go wrong.
- **Never in frame:** children's faces in focus, crowds, mirrors, reflections,
  readable text, screens showing anything.

### Still true

**Faces are legible** — three-quarter, looking off, never locked to the lens.
**Compose vertical** — every panel ends up a 384 × 1080 slice, so the lead sits
centred with headroom and nothing load-bearing in the outer thirds.
**A panel is a scene cut into moments** — four clips, each a beat, chained from
the last frame of the one before.

---

## 4 · Casting

Caribbean first market, per the documented position, with range across the five.

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

One casting still each, approved before any video. Then the clips in order,
each chained from the last frame of the one before. Every panel ends on a
**held frame** — pull it from the clip, do not generate it.

---

### P1 · OVERWHELM — Black Caribbean man · 33s · 5 clips
**B2C 02** *My team stopped bringing me decisions because I guess I've become a
roadblock. And lately they've been making bad decisions without me, and we lost
a client.*
**B2B 03** *It's just overwhelming here every day… and then I'm to blame for how
I react.*

**The scene: the decision being made across the corridor, without him.**
One face. The others are light and shape through glass — never in focus, never
turning.

**Casting still**
> Cinematic scene, 1080p. A Black Caribbean man in his late thirties,
> open-collar shirt, sitting alone at his desk in a small side office, late
> afternoon. Through a glass partition behind him, a lit meeting room with two
> or three people standing — **far out of focus, soft shapes only, faces not
> resolved, backs to the glass.** On his desk a stack of unopened folders and a
> chair opposite him that nobody is sitting in. Warm low light from one side,
> deep shadow. Muted restrained colour grade, shallow depth of field, lead
> centred with headroom.

**Clip 1.** He sits. The shapes behind the glass shift slightly. He does not
turn. One slow breath.

**Clip 2.** A phone on his desk lights and goes dark again, unanswered. He
looks at it once. **Light change, not a performance.**

**Clip 3.** The meeting-room light behind him goes out. The shapes are gone.
He is still facing the same way.

**Clip 4.** He puts one hand flat on the stack of unopened folders and leaves
it there.

**Clip 5 · the B2B cut and the freeze.** The office behind him dark now, his
own lamp still on. Jaw set, looking at nothing. Hold. **Freeze: last frame.**

---

### P2 · INSECURITY — Latino or mixed-heritage man · 49s · 7 clips
**B2C 05** *I sign things in the office, I smile, but I don't understand and I'm
not really even interested… I don't even ask questions… I'm just checked out.*
**B2B 02** *After I got promoted — it was a good thing, but it broke me. All my
best skills were in my old position.*

**The scene: signing what he does not understand.**
One face. The other party is **a hand entering frame** — never a second head.

**Casting still**
> Cinematic scene, 1080p. A Latino or mixed-heritage man in his early thirties
> seated alone at a meeting-room table, a printed document and a pen in front of
> him. He is looking at the page, eyes not moving across it. Empty chairs
> around him. Beyond a glass wall, the wider office is **far out of focus, soft
> shapes only.** Cool daylight from the glass, warm fill, deep shadow. Muted
> restrained colour grade, shallow depth of field, lead centred with headroom.

**Clip 1.** He looks at the page. His eyes do not track along the lines.

**Clip 2.** He signs. The pen moves; the eyes stay where they were.

**Clip 3.** **A hand enters frame from off-camera** and slides a second page in
front of him. No face, no body — just a forearm and a hand. He signs that too.

**Clip 4.** **The hand returns and takes the pages away.** He gives a brief,
courteous nod toward whoever it is, off-frame. The nod ends and his face
resets instantly. **This is the beat of the whole panel.**

**Clip 5.** Alone at the table. The chairs around him are empty.

**Clip 6.** He looks toward the door, off-frame, where they went.

**Clip 7 · the freeze.** Straight ahead, absent behind the eyes. **Freeze: last
frame.**

---

### P3 · ANGER — White European man · 35s · 5 clips
**B2C 03** *Once I feel hurt, anger just comes out of me. Even my daughter can
read my face before she asks me for anything.*
**B2B 01** *I just speak direct. I don't really care how people feel about it.*

**The scene: she came to ask, and decided not to.**
One face. The daughter is **a small backlit shape** in a doorway, never in
focus, never resolved — and the drawing she came to show him is on the counter.

**Casting still**
> Cinematic scene, 1080p. A white European man in his late thirties standing at
> a kitchen counter in the evening, both hands flat on the surface, jaw tight,
> looking down. A child's crayon drawing lies on the counter near his hands. In
> a doorway deep in the background, **a small child-sized silhouette, backlit
> and completely out of focus, no face visible.** Warm low light from one lamp,
> deep shadow, a lived-in family kitchen. Muted restrained colour grade, shallow
> depth of field, man centred with headroom.

**Clip 1.** He stands at the counter, contained. The small shape appears in the
doorway behind him and stops.

**Clip 2.** He turns his head a few degrees — not far enough to see her. The
shape does not come closer.

**Clip 3.** **The shape steps back out of the doorway.** The doorway is empty.
He has not moved.

**Clip 4.** He looks down at the drawing on the counter. One long breath out.
**Freeze: last frame.**

**Clip 5 · the B2B cut, workplace.** Same man in a workplace corridor,
mid-stride, saying something to somebody off-frame. Direct, unbothered,
certain. No second face in shot. Cool daylight, same grade.

---

### P4 · ANXIETY — Black Caribbean woman · 26s · 4 clips
**B2C 01** *It kept me off work for six weeks. But I told him it was my back
that was injured. They found out, and I got fired.*

**The scene: after. She is alone with the letter.**
No manager, no note-taker — **the empty chair opposite does the work.** This is
the cheapest of the five to render and the most brutal to watch.

**Casting still**
> Cinematic scene, 1080p. A Black Caribbean woman in her early thirties sitting
> alone on the visitor side of a desk in a small office, back straight, hands
> in her lap. A single printed letter on the desk in front of her, facing her. On
> the far side of the desk **an empty chair, pushed back from it.** The door
> behind her is open onto an empty corridor. Cool daylight from a window, deep
> shadow in the room. Muted restrained colour grade, shallow depth of field,
> lead centred with headroom.

**Clip 1.** She sits upright. She is not looking at the letter. One breath,
slightly too shallow.

**Clip 2.** Her hands tighten in her lap and release.

**Clip 3.** She looks at the letter for the first time. **She does not pick it
up.**

**Clip 4 · the freeze.** Still looking at it. Hold. **Freeze: last frame.**

---

### P5 · SHUTDOWN — East Asian or mixed-heritage woman · 26s · 4 clips
**B2C 04** *I feel nothing most days. I'm numb all the time… maybe that's why my
sister stopped calling — because I had nothing to say to her.*

**The scene: the phone rings, and stops.**
Already the simplest of the five. One person, one object, one light change.

**Casting still**
> Cinematic scene, 1080p. An East Asian or mixed-heritage woman in her early
> thirties sitting on a sofa in a dim living room in the evening, upright but
> slack, hands loose beside her, looking at the middle of the room. On the low
> table in front of her a phone lies face up, its screen lit but **not
> readable** — no text, no name, no interface. One lamp across the room, most of
> the frame in shadow. Muted restrained colour grade, shallow depth of field,
> lead centred with headroom.

**Clip 1.** She sits. The phone lights on the table. She does not look at it.

**Clip 2.** It keeps going. Her eyes move to it once and away.

**Clip 3.** **The screen goes dark.** The room is quieter than before it
started. She has not moved.

**Clip 4 · the freeze.** Eyes open, focused on nothing. **Freeze: last frame.**

---

## 5b · What this bought

| | before | now |
|---|---|---|
| Clips with a second face in shot | 14 | **0** |
| Clips needing a timed reaction | 9 | 0 |
| Clips carried by a light change or an object | 2 | 7 |
| A child's face rendered | yes | **never in focus** |

Every narrative beat survives. The team still decides without him, the pages
still get signed unread, the daughter still comes and goes, she is still fired,
the sister still stops calling. **What went is the second performer, which is
where the render cost lived.**

The retake forecast goes back to roughly **1.8×**, not the 2–3× that two-face
scenes implied — which puts the whole slate at about **5,000 credits** against
the 6,072 balance.

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

---

## 8 · Where a still does the job instead of a clip

**The rule.** Generate video only where **a person must be alive in frame**, or
where **the motion is the argument**. Everywhere the subject is a room, an
object or an aftermath, generate a still and move it in the edit.

**The saving is not the still — it is that the move is free.** A 2% scale drift
or a slow drift across a still, done in the editor, costs nothing and looks
identical to a Runway clip that held almost motionless anyway. Paying 80 credits
for eight seconds of a room where nothing happens buys nothing but noise.

### Swap these six clips for stills

| beat | was | why a still is enough |
|---|---|---|
| B2B 00 · before anyone arrives | 2 clips | Nobody is in it. The whole point is that nothing is happening yet |
| B2B 01b · the empty desk | 1 clip | Make the neighbouring desk empty too, and nothing needs to move |
| B2B 01b · the phone face down | 1 clip | An object on a counter |
| B2B 02b · the room after it ended | 1 clip | Two chairs, one pushed back. An aftermath |
| B2B 03b · the desk at end of day | 1 clip | Work stacked, chair empty, one lamp on |
| B2B 03b · the corridor, one light on | 1 clip | Nothing moves in it |

**Seven clips become seven stills.** 560 credits becomes 56 — and because an
image retake costs 2 credits against 80, the retake exposure on these
effectively disappears. Counting realistic iteration, this is **roughly 700
credits back**, or about 11% of the balance.

### Where a still is actually better, not just cheaper

**An empty room on video draws attention to the fact that nothing is
happening.** Eight seconds of a still corridor with a faint camera wobble reads
as a mistake. The same frame held and drifted slowly reads as deliberate — as a
held look. For every aftermath beat in the B2B film, the still is the stronger
picture as well as the cheaper one.

### Where video is not negotiable

- **All five character panels.** A person held for twenty-five seconds as a
  still is a photograph, and the film's whole claim is that these are living
  people in a state. This is what the budget is for.
- **B2C 11, the walk.** The motion *is* the meaning — one session is where it
  begins, movement outward.
- **B2B 04b, the feedback and the decision.** Both have a person close enough to
  read. A held still of somebody depleted looks posed; the involuntary stillness
  of a real hold is what sells it.

### Stills the spec does not yet list, and should

| | why |
|---|---|
| **Poster frame, each film** | What shows before play. Never a random first frame — choose it |
| **End card, each film** | Type over a still, not over motion |
| **Five held frames** | Already covered — pull from the panel clips, do not generate. They must match the clip exactly or the freeze jumps |

### Revised clip count

| | clips | stills | credits |
|---|---|---|---|
| Five character panels | 25 | 5 casting + 5 pulled freezes | 2,000 + 10 |
| B2B narrator | 5 | 7 | 400 + 56 |
| Poster and end cards | — | 4 | 32 |
| Upscale the seven existing | — | — | 620 |
| **Clean pass** | **30** | **21** | **3,118** |

⚠ **The retake multiplier is now the whole question.** Scenes with a second
person in frame miss more often than a single figure nearly still — a reaction
has to land, and a second face is a second thing that can go wrong. At 2× the
panels come to about 5,100 credits all in, which fits. At 3× they come to about
7,100, which does not.

**This is exactly what P1 answers.** Generate its five clips end to end, count
how many attempts each took, and multiply out from a real number instead of an
assumed one. 400 credits to remove the largest unknown in the project.
