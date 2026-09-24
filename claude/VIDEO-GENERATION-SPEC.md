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

## 3 · The register — the person is in the scene, not observed from it

**These are scenes, not portraits.** Each panel shows the character inside the
event their monologue is describing, with the other people it happens to in
frame. Not a man stalled at a desk — the meeting going on without him. Not a
tense father in a kitchen — the daughter in the doorway reading his face before
she asks.

That is the difference between a picture of a state and the cost of a state,
and the cost is what the script spent five rewrites getting to.

**Three rules follow from it.**

**Faces are legible.** A scene needs faces — the other person's reaction is
half the shot. Keep the lead three-quarter and looking off rather than locked to
the lens; a generated face pinned frontally for a long hold is the hardest
thing to ask of any of these models.

**A panel is a scene cut into moments, not one hold.** Twenty-five seconds is
four clips. Each is a beat of the same scene, chained from the last frame of
the one before — not four variations of the same pose.

**Compose vertical anyway.** Every panel ends up a **384 × 1080 slice**. Keep
the lead centred with headroom and the second person just inside the frame on
one side, so the slice still reads once it retires.

⚠ **Two people in frame roughly doubles the retake rate.** A second face is a
second thing that can go wrong, and a reaction is harder to land than
stillness. Budget for it — this is why P1 is generated end to end first.

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
**B2C 02** *There's so much going on that I cannot even figure out how to get
started. My team stopped bringing me decisions because I guess I've become a
roadblock. And lately they've been making bad decisions without me, and we lost
a client.*
**B2B 03** *It's just overwhelming here every day… and then I'm to blame for how
I react.*

**The scene: the meeting that is happening without him.**

**Casting still**
> Cinematic scene. A Black Caribbean man in his late thirties, open-collar
> shirt, sitting alone at his desk in a side office. Through the glass behind
> him, three colleagues stand around a table mid-discussion, deciding something.
> Nobody is looking at him. He is not looking at them. Work stacked in front of
> him, untouched. Late afternoon light from one side, deep shadow. Muted
> restrained colour grade, shallow depth of field, lead centred with headroom.

**Clip 1.** He is at the desk. Behind the glass the discussion is animated.
One colleague gestures, another nods. **He does not turn.**

**Clip 2.** He starts to rise as if to join them — and sits back down. Behind
him the group is already moving on.

**Clip 3.** A colleague walks past his door carrying papers toward the group,
glances in, and keeps going. **The glance that does not become a stop.**

**Clip 4.** The meeting breaks up behind the glass. People disperse. He is
still at the desk, still looking at nothing.

**Clip 5 · the B2B cut and the freeze.** Alone now, the room behind him empty.
He looks at the stacked work. Jaw set. Hold. **Freeze: the last frame.**

---

### P2 · INSECURITY — Latino or mixed-heritage man · 49s · 7 clips
**B2C 05** *I think I'm just waiting to be found out… I sign things in the
office, I smile, but I don't understand and I'm not really even interested… I
don't even ask questions… I'm just checked out.*
**B2B 02** *After I got promoted — it was a good thing, but it broke me. All my
best skills were in my old position. Now I'm a fish out of water.*

**The scene: being briefed on something he is not following, and signing it.**

**Casting still**
> Cinematic scene. A Latino or mixed-heritage man in his early thirties in a
> meeting room, seated, while a colleague standing beside him points at a
> printed document on the table and explains it. He is nodding. His eyes are on
> the page but not moving across it. A second colleague across the table waits.
> Cool daylight from a window wall, warm fill, deep shadow. Muted restrained
> colour grade, shallow depth of field, lead centred with headroom.

**Clip 1.** The colleague explains, pointing. He nods along.

**Clip 2.** The colleague pauses — an opening for a question. **He does not
take it.** He nods again. The explanation resumes.

**Clip 3.** He is handed a pen. He signs without re-reading.

**Clip 4.** A brief warm smile to the room as the document is taken away. The
smile goes the instant they turn. **This is the beat of the whole panel.**

**Clip 5.** The others gather papers and leave, talking to each other. He stays
seated.

**Clip 6.** Alone at the table. He looks at the door they left through.

**Clip 7 · the freeze.** Straight ahead, absent behind the eyes. **Freeze: the
last frame.**

---

### P3 · ANGER — White European man · 35s · 5 clips
**B2C 03** *Once I feel hurt, anger just comes out of me. Even my daughter can
read my face before she asks me for anything. And I guess she could just tell
that I'm just going to blow up.*
**B2B 01** *I just speak direct. I don't really care how people feel about it.*

**The scene: the daughter in the doorway, deciding not to ask.**

**Casting still**
> Cinematic scene. A white European man in his late thirties standing at a
> kitchen counter in the evening, both hands on the surface, jaw tight, looking
> down. In the doorway behind him, a girl of about nine has stopped. She is
> watching his back, holding something she came to show him. She has not spoken.
> Warm low light from one lamp, deep shadow, a lived-in family kitchen. Muted
> restrained colour grade, shallow depth of field, both figures in frame, the
> man centred with headroom.

**Clip 1.** He stands at the counter, contained. Behind him the girl appears in
the doorway and stops.

**Clip 2.** She takes half a step in, watching his back. **Reading him.**

**Clip 3.** He turns his head very slightly — not all the way to her. She sees
enough.

**Clip 4.** She lowers what she was holding and steps back out of the doorway.
He does not see her go. **Freeze: the last frame — the empty doorway behind
him.**

**Clip 5 · the B2B cut, workplace.** Same man in a workplace corridor,
mid-sentence to a colleague, direct and unbothered. The colleague's face
absorbs it. Not angry — certain, which is worse. Cool daylight, same grade.

---

### P4 · ANXIETY — Black Caribbean woman · 26s · 4 clips
**B2C 01** *My mind runs worst case scenarios on a loop… it was so bad it kept
me off work for six weeks. But I told him it was my back that was injured. They
found out, and I got fired.*

**The scene: the meeting where she is told.**

**Casting still**
> Cinematic scene. A Black Caribbean woman in her early thirties sitting across
> a desk from a manager in a small office, a printed letter on the desk between
> them facing her. Her hands are in her lap, her back straight. She is not
> arguing. The manager is mid-sentence, not unkind. A second person sits to one
> side taking a note. Cool daylight from a window behind them, deep shadow in
> the room. Muted restrained colour grade, shallow depth of field, lead centred
> with headroom.

**Clip 1.** She sits upright while the manager speaks. She does not look at the
letter.

**Clip 2.** She nods once. The note-taker writes. Nobody raises their voice.

**Clip 3.** The manager stops speaking. A silence she is expected to fill.
**She does not fill it.**

**Clip 4 · the freeze.** She looks at the letter for the first time. Hold.
**Freeze: the last frame.**

---

### P5 · SHUTDOWN — East Asian or mixed-heritage woman · 26s · 4 clips
**B2C 04** *I feel nothing most days, honestly. I'm numb all the time… maybe
that's why my sister stopped calling — because I had nothing to say to her.
Where did my life go?*

**The scene: the phone ringing, and not answering it.**

**Casting still**
> Cinematic scene. An East Asian or mixed-heritage woman in her early thirties
> sitting on a sofa in a dim living room in the evening, upright but slack,
> hands loose. On the low table in front of her a phone is lit and ringing,
> face up but its screen not readable. She is looking at the middle of the room,
> not at it. One lamp across the room, most of the frame in shadow. Muted
> restrained colour grade, shallow depth of field, lead centred with headroom.

**Clip 1.** She sits. The phone lights and buzzes on the table. She does not
look at it.

**Clip 2.** It keeps going. Her eyes move to it, once, and away again.

**Clip 3.** It stops. The room is quieter than before it started. **The
stopping is the beat.**

**Clip 4 · the freeze.** She has not moved. Eyes open, focused on nothing.
**Freeze: the last frame.**

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
