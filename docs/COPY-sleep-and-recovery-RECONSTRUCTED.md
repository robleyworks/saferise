# Sleep & Recovery — reconstructed

⚠ **This is a reconstruction, not a recovery.** `COPY-sleep-and-recovery.md` was not
available. This is rebuilt from the constraints recorded in `SESSION-HANDOVER.md`
and matched to the `tracks.js` record shape. **Diff against the original before
using it** — where they disagree, the original wins.

---

## The constraint that shapes every protocol

From the handover, marked load-bearing:

> *"We work the states around sleep, eating and training — not the plans. No
> diets, no programmes, no targets. Routes outward on deficiency or injury."*

⚠ **No sleep hygiene. No schedules. No screen rules. No wind-down routines.**
Every one of those is a plan, and the whole differentiation of the substrate layer
is that it does not give plans.

**What this track works is the state a person is in at 11pm, at 3am, and at 7am
having had four hours.** Not what time they went to bed.

---

## Track record

```js
5: {
  id: 5, visible: false, status: 'in development',
  name: 'Sleep & Recovery',
  kicker: 'Track 05 \u2014 Sleep & Recovery',
  heroTitle: 'Sleep &amp;<br><span class="gold">Recovery</span>',
  heroRule: 'The problem is rarely the sleep. It is the state you are in while
             not sleeping.',
  heroBody: [
    'You already know what you are supposed to do. Doing it has not worked.',
    'These protocols work the state \u2014 the one that arrives at eleven, the one
     that wakes you at three, the one already there when the alarm goes. No
     schedule, no rules, nothing to track.'
  ],
  relation: 'run alone',
  price: PRICING.t5,

  art: {
    band:   'one person awake in a dark room \u2014 not distressed, just awake',
    cost:   'the same room at eleven, at three, at seven',
    range:  'the same person three times \u2014 wired, settled, hollowed out',
    change: 'one person moving through an ordinary morning without dragging'
  },
```

---

## The ten protocols

```js
protocols: [
  ['01','Power Down','The Powering Down Protocol',
   'Let the system stand down when the day is over and it has not noticed.',
   'Mind starts working the moment the lights go out. Body still running.',
   ['My brain switches on when I lie down','I am exhausted until I get into bed','I have replayed the same day four times']],

  ['02','Return','The Three AM Protocol',
   'Wake, and find a way back that is not effort.',
   'Awake at once, fully. Heart going. Nothing actually happening.',
   ['I wake up and that is it','It is always the same time','The worst version of everything arrives at three']],

  ['03','Disarm','The Night Ahead Protocol',
   'Loosen the dread of not sleeping, which is most of what prevents it.',
   'Evening tightening. Watching the clock. Bracing for a bad night.',
   ['I am scared of going to bed','I am already counting how many hours are left','Bad nights make me dread the next one']],

  ['04','Discharge','The Tired and Wired Protocol',
   'Meet a body that is finished and a system that is not.',
   'Exhausted and buzzing at once. Too tired to do anything, too active to stop.',
   ['I am shattered and I cannot settle','My body is done and my head is not','I get a second wind at the wrong time']],

  ['05','Reset','The Deficit Protocol',
   'Begin a day that started behind, without spending it catching up.',
   'Waking already tired. The day beginning in debt.',
   ['I wake up more tired than I went to bed','I have not felt rested in months','I start every day already behind']],

  ['06','Meet','The Sunday Night Protocol',
   'Work the state that arrives before the week does.',
   'Chest tightening on a Sunday evening. Nothing wrong yet.',
   ['Sunday is ruined by Monday','It starts in the afternoon','I cannot enjoy the end of a weekend']],

  ['07','Permit','The Rest Guilt Protocol',
   'Stop rest costing more than it returns.',
   'Resting and monitoring. The sense of something undone.',
   ['I cannot relax without feeling I should be doing something','Rest feels like getting away with it','I only stop when I collapse']],

  ['08','Anchor','The Broken Rhythm Protocol',
   'Find something steady when the schedule will not be.',
   'No fixed pattern. Body never settling into one.',
   ['My hours are different every week','I never know when I will sleep','My body has given up guessing']],

  ['09','Carry','The Day After Protocol',
   'Function on nothing without the day becoming about that.',
   'Flat, slow, short-fused. Everything requiring more than it should.',
   ['I have nothing to give today','Everything is harder than it should be','I am not myself and everyone can tell']],

  ['10','Restore','The Return from Depletion Protocol',
   'Come back from empty as a state, not a schedule.',
   'Hollowed out. Recovered on paper and not in the body.',
   ['I slept and it did not help','I do not know how to refill','I have been running on empty so long it feels normal']]
]
```

---

## META

```js
't5-01': { extras: [],            state: 'agitated', frameworks: ['porges','heartmath'] },
't5-02': { extras: [],            state: 'agitated', frameworks: ['porges','watts'] },
't5-03': { extras: [],            state: 'agitated', frameworks: ['watts','heartmath'] },
't5-04': { extras: [],            state: 'agitated', frameworks: ['porges','heartmath'] },
't5-05': { extras: [],            state: 'numb',     frameworks: ['porges','mate'] },
't5-06': { extras: ['advisory'],  state: 'unsteady', frameworks: ['porges','kross'] },
't5-07': { extras: [],            state: 'unsteady', frameworks: ['mate','jung'] },
't5-08': { extras: ['advisory'],  state: 'unsteady', frameworks: ['porges','watts'] },
't5-09': { extras: [],            state: 'numb',     frameworks: ['porges','mate'] },
't5-10': { extras: [],            state: 'numb',     frameworks: ['mate','watts'] },
```

⚠ **`t1-09` and `t1-10` still list `dispenza` in `META`.** He was removed and
replaced by Kross. **That is a live defect in `tracks.js`, not something this track
introduces** — worth a separate fix.

---

## Why Watts carries four of these

**Non-resistance is the framework insomnia was made for.** *"The state is one
thing. The fight with the state is a second thing. The fight usually costs more,
and is the only one you can put down."*

That is a literal description of lying awake. The wakefulness is one thing; the
struggle against it is what turns a bad night into a bad week. **No other track in
the portfolio gives Watts this much to do.**

---

## The three protocols I would defend hardest

**07 · Rest Guilt.** The only protocol in the whole platform about not being able
to stop. It is the substrate layer's clearest statement that this is not a sleep
product — nothing about rest guilt is solved by going to bed earlier.

**03 · The Night Ahead.** Anticipatory dread of not sleeping is the mechanism that
makes insomnia self-sustaining, and almost nothing addresses it directly because
it happens hours before the problem.

**10 · Return from Depletion.** *"I slept and it did not help."* That is the state
sleep advice cannot reach, and it is where most people actually are by the time
they look for something.

---

## ⚠ LG-273 — what this does not fix

**Sleep & Recovery is promised on the organisations page and exists nowhere else.**
This reconstruction gives `tracks.js` and the coming-soon card something to render.

**It does not write the protocols.** Ten protocols × twelve resources is the
content build, and it is the same shape as any other track.

**Until then the track must carry an *in development* marker** wherever it appears
— `visible: false`, `status: 'in development'` — because the handover records five
tracks in that state and the rule is that they say so.

---

## What to check against the original

- Whether it is Track 05 or another number
- Whether the ten states match, and in what order
- Whether the transformation words match — these follow the T1 pattern
- Whether `PRICING.t5` exists
- Whether the original carries the substrate qualifier in its hero copy. **It
  should** — it is the line that stops this reading as a sleep app
