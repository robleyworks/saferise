# Guided Meditation Production — full pipeline

**31 protocols × 2 voices × audio and video = 124 deliverables**
Companion to `docs/VOICE-PROFILES.md` and `docs/VOICE-ARCHITECTURE.md`.

---

## The number that governs every decision below

**A guided meditation video is mostly not watched.** The member's eyes close two
minutes in. The visual is not the content — the voice is — and the visual's only
jobs are to hold the frame for the two minutes before that, and to give the player
something legitimate to be.

⚠ **Every impulse to make it more interesting makes it worse.** Movement pulls
attention outward at exactly the moment the script is asking for the opposite.

---

# PART ONE · SCRIPT PREPARATION

**Do this before a single file is generated.** All 31 scripts, once.

## 1 · Fix what is already known broken

**Five scripts carry spoken durations**, which are prohibited platform-wide:

| Script | Line |
|---|---|
| `t0-00` Clearing | *"That readiness you found **a minute ago**"* |
| `t1-02` Anger Alchemy | *"how these things fail in the **first ten seconds**"* |
| `t1-03` Overwhelm | *"nothing you could do about any of it in the **next minute**"* |
| `t1-04` Abandonment | *"It'll still be there in **a few minutes**"* |
| `t1-05` Shame Dissolution | *"you did that **a few minutes ago**, at the start"* |

Replacements: *a moment ago* · *right at the start* · *early on* · *in the first
breath or two* · *it will still be there afterwards*.

**Not every hit is a defect.** *"It takes a second"* and *"a second thing"* are
idiomatic. Leave them.

**`t0-00` also uses "practising"** — prohibited. *"one thing worth getting familiar
with here"*.

⚠ **Fixing after generation means regenerating. Fixing now costs nothing.**

## 2 · Notate the pacing

**No script carries a pause marker.** For recorded audio that was the largest risk
in the whole sprint — 97 minutes of pacing invented live. **Generated, it becomes
the biggest advantage available:** notate once, and all 62 files breathe
identically.

Use ElevenLabs break tags:

```
Find where it sits in your body, before any of the words. <break time="2.0s" />
Face and neck, often. <break time="1.5s" /> Heat there.
```

**Working values:**

| Where | Break |
|---|---|
| Between sentences inside an instruction | 1.0–1.5 s |
| After a question put to the member | 2.5–3.0 s |
| After "name the state" or any naming instruction | 3.0 s |
| Between the four steps | 4.0 s |
| Held breath cycles — four in, six out | 10.0 s per cycle |

⚠ **Long breaks still consume credits.** Budget accordingly; the cost is still
trivial, but the character count is not what the raw script says.

**Mark up `t0-00` and `t1-01` first, generate both, listen, then apply the pattern
to the remaining 29.** Do not mark up all 31 before hearing one.

## 3 · Lock the scripts

Once notated, **the script file is the master.** Any future copy change means
regenerating both voices for that protocol. Record the script version alongside
the audio in the fix register.

---

# PART TWO · AUDIO GENERATION

## 4 · Voice selection

Per `docs/VOICE-PROFILES.md`. **Audition on `t1-05` and `t1-07` in full**, not on
samples.

**Record permanently, in the fix register:** voice ID · model version · stability ·
similarity · style · speaker boost.

⚠ **A file regenerated in two years must match the ones beside it.** Voices get
retired and re-tuned upstream. Without these values that is not recoverable.

## 5 · Generate

| | |
|---|---|
| **Model** | Multilingual v2/v3 — better long-form prosody than Flash |
| **Format** | MP3 192 kbps for masters. 128 kbps mono for delivery |
| **Order** | `t0-00` and `t1-01` first, both voices. **Stop and listen before continuing** |

**Then the remaining 29 × 2.**

⚠ **Listen to all 62 back to back before mastering.** Not for defects — for
whether each voice sounds like one person on one day. That check catches the thing
nobody notices until a member does.

## 6 · Master

**One batch, one chain, one session** — so loudness is consistent across the set
rather than drifting file to file.

| | |
|---|---|
| **Target** | **−19 LUFS mono** · −1 dBTP ceiling |
| **Process** | Two-pass EBU R128 |

⚠ **`BED-RHYTHM-SPEC.md` says −16 and the platform rule says −19.** They disagree
by 3 LU. **Settle this before the first master, not after** — getting it wrong is
62 re-renders.

## 7 · Beds

Per `BED-RHYTHM-SPEC.md`, still marked *proposal, awaiting decision*. **Promote it
to a rule before 62 files are built against it.**

| State | Bars | Pattern |
|---|---|---|
| Agitated | 5 | 4s in / 6s out |
| Unsteady | 6 | 6s / 6s |
| Numb | 4 | 4s / 4s |

⚠ **Clearing has no bed.** Its state is Steady and the spec defines three. Either
Steady takes the Unsteady bed or it gets its own — and Clearing is the first file
generated.

**Mix:** bed roughly 18 dB under the voice, measured. Keep bed content clear at
100–250 Hz where the voice fundamental lives.

**Generate the bed once per state, not per protocol.** Three beds, reused.

---

# PART THREE · VIDEO

## 8 · The visual, and what it is not

**One continuous ambient plate per protocol.** No cuts, no transitions, no
movement fast enough to notice.

| | |
|---|---|
| **Content** | Light moving very slowly across a surface. Water, cloud shadow, a room as light changes |
| **Motion** | Slow enough that a still frame and a frame ten seconds later look almost identical |
| **Colour** | The track's own palette — `--t1`, `--t2`, `--t3` — desaturated |
| **Brightness** | Dark. It is watched at night, in bed, on a phone |
| **Loop** | Seamless, 60–90 s, repeated to length |

**Never:** people · faces · text moving · particles · flares · anything that
resolves into a recognisable object · anything that could be mistaken for a
screensaver trying to impress.

⚠ **One plate per protocol, not per voice.** The same visual is muxed with both
audio tracks. **31 plates, 62 videos.** Generating a visual per voice doubles the
work for zero benefit.

## 9 · The branded opening

**4 seconds. Not longer.**

```
0.0 – 1.2s   Black. The SafeRise mark fades up, centred, small.
1.2 – 2.4s   Mark holds. "SAFERISE PROTOCOL" in Cinzel beneath, tracked wide.
2.4 – 3.4s   Both fade. Track label appears: PERSONAL TRANSFORMATION
3.4 – 4.0s   Protocol title in Cormorant Garamond: The Anxiety Reset Protocol
4.0s         Cross-dissolve into the plate. Voice begins at 5.0s.
```

⚠ **A member opens this protocol repeatedly.** Anything longer than four seconds
becomes friction on the fifth listen and something to skip by the tenth. **Resist
every impulse to make it more of an occasion.**

**Identical across all 62.** Same timing, same type, same fade. It is a signature,
not a title sequence.

## 10 · Text on screen

⚠ **Do not burn the script into the video.** Two reasons: it competes with the
voice for the attention the script is asking to turn inward, and it cannot be
turned off.

**Instead:**

| | |
|---|---|
| **Protocol title** | In the opening only, then gone |
| **Step markers** | RECOGNISE · REGULATE · RELEASE · RISE — small, lower third, fading in and out at each transition. **Four appearances in the whole video** |
| **The script** | **Captions, as a Wistia track the member turns on.** Not burned in |

**Captions are an accessibility requirement, not a design choice** — and an HR
buyer's procurement will ask. They also make the video indexable, which the site
currently is not.

**Generate captions from the script**, not from transcription. The script is the
ground truth and the timings come from the break tags.

## 11 · Render

| | |
|---|---|
| **Resolution** | 1920 × 1080 |
| **Frame rate** | 24 fps — the plate has no motion needing more |
| **Codec** | H.264, ~2.5 Mbps. The plate is nearly static and compresses hard |
| **Audio in video** | Same master as the standalone audio file. **Not a second render** |

---

# PART FOUR · NAMING, STORAGE, DELIVERY

## 12 · Naming

```
{protocol}-gm--{voice}--{lang}.{ext}

t1-01-gm--f--en.mp3      audio, female
t1-01-gm--m--en.mp3      audio, male
t1-01-gm--f--en.mp4      video, female audio
t1-01-gm--m--en.mp4      video, male audio
t1-01-gm--plate.mp4      the shared visual, source only — never shipped
t1-01-gm--f--en.vtt      captions
```

⚠ **Keep `--en` even though only English is being produced.** Three characters
now, against renaming the entire library when French arrives.

**`f` and `m` rather than voice names**, so a voice can be replaced without
renaming anything.

## 13 · Folder structure

```
/production
  /scripts        31 notated masters, version stamped
  /plates         31 source visuals
  /audio-raw      62 unmastered
  /audio-master   62 delivered
  /video          62 delivered
  /captions       62 vtt
  /reference      voice IDs, settings, the loudness decision
```

**`/production` sits outside the deployed repository.** 62 videos is not something
Git should carry, and `docs/` being publicly served has already been an incident
this week.

## 14 · Wistia

**Upload after the whole batch is mastered, not as each finishes.** One session,
consistent settings.

| | |
|---|---|
| **Naming in Wistia** | Match the filename exactly. `t1-01-gm--f--en` |
| **Project structure** | One project per track |
| **Captions** | Upload the `.vtt` with each video |
| **Player** | No related videos, no share controls, no Wistia branding |
| **Analytics** | ⚠ **Off.** Decided 9 September — viewing analytics beyond delivery stay off, and that decision is what keeps the consent banner unnecessary |

⚠ **Confirm the storage region** before uploading 62 files. It goes in the Article
30 register, and re-uploading to change it is a bad afternoon.

---

# PART FIVE · WHAT I WOULD ADVISE

## Sequence, and why

1. **Fix the five scripts and the "practising" instance.** Free now, 62 regenerations later
2. **Notate `t0-00` and `t1-01` only.** Generate both voices. **Listen.**
3. **Settle the loudness target and the Clearing bed.** Both are open, both are cheap now
4. **Then the remaining 29.**

⚠ **The pause between steps 2 and 4 is the most valuable hour in this pipeline.**
Everything wrong with the pacing, the voice choice or the bed mix is visible after
two protocols and expensive after sixty-two.

## Three things that will decide whether it feels like one product

**Identical opening, to the frame.** Any drift reads as amateur, and it is the
first thing on every single video.

**One mastering session.** Loudness drifting between files is the defect nobody
can name but everybody feels.

**Both voices from the same script version.** If the female is generated before a
copy fix and the male after, a member switching voices hears a different session.
**Version the script, not just the audio.**

## What I would not do

**Do not make the visual interesting.** Every request to add movement, imagery or
transition is a request to make the video better at being watched — and it is not
supposed to be watched.

**Do not burn in the script.** It cannot be turned off, and it competes with the
one instruction the whole thing is built around.

**Do not generate all 62 before listening to two.**

## Effort estimate

| Stage | Time |
|---|---|
| Script fixes | 1 hr |
| Pacing notation, all 31 | 4–5 hrs |
| Voice audition and selection | 2 hrs |
| Generation, 62 files | 2 hrs mostly unattended |
| Listening pass | 2 hrs |
| Mastering | 3 hrs |
| Plates, 31 | 6–10 hrs depending on source |
| Opening template | 2 hrs once |
| Video render and mux | 3 hrs mostly unattended |
| Captions | 2 hrs |
| Wistia upload and configuration | 2 hrs |
| **Total** | **≈ 30 hours** |

**Against roughly 53 hours of studio recording for the same set** — and that
comparison holds only for the 31 that exist. At eleven tracks the recorded route
is not available to one person at all.
