# SafeRise Meditation Library — Production Roadmap

**Date:** 18 September 2026
**Scope:** everything between the 31 recorded vocals and 31 finished masters.
**Where the work happens:** scripted, in this environment. Not Adobe — see §8.

---

## The shape of the problem

31 vocals are recorded as continuous reads. They contain no protocol pauses and no breath
windows — a 7:51 spoken take has to become a 10:28 session. That gap, roughly two to three
minutes per session, is silence that has to be inserted at the right places, 31 times.

That single fact decides the method. Inserting ~900 timed silences by hand in a DAW is where
this job either takes a month or goes wrong quietly. Done as a script driven by the scripts
themselves, it is deterministic and re-runnable.

---

## Stage 0 — Asset hygiene *(yours, ~30 minutes)*

Nothing downstream is safe until this is done.

1. **Pick the library voice.** Six sessions have two versions in different voices — Shame,
   Grief, Insecurity, Overwhelm, Abandonment. This is one decision, not six. Members move
   between sessions in sequence; a voice change between them reads as a fault.
2. **Identify the four unnamed files** (`ElevenLabs_2026-09-18T…`, 4:15 / 4:51 / 3:44 / 3:24).
   One is probably The Clearing.
3. **Delete the two fragments** — `shutdown recover vocal2.mp3` (6s), `Burnout & overload 2.mp3` (41s).
4. **Check `Rupture.mp3`** — 3:53 against 6:41 expected, the shortest ratio in the set. Listen
   to the last 20 seconds for a truncation.
5. **Re-export at higher quality if it costs nothing.** The vocals came down as 128 kbps MP3.
   If ElevenLabs will hand you WAV or a higher bitrate from the same generations without
   re-rendering the voice, take it. If it means regenerating, don't — the approved takes matter more.

**Gate:** one folder, one voice, every file named by code. Nothing proceeds until then.

---

## Stage 1 — Normalise the source *(scripted, ~10 minutes)*

- Beds are 48 kHz MP3. Vocals are 44.1 kHz MP3. Convert **the beds** to 44.1 kHz WAV, once.
  Never the vocals — upsampling adds nothing and costs a conversion.
- Everything downstream works at 44.1 kHz, 32-bit float, so the bed sum has headroom before
  the limiter.
- Measure every file: true length, peak, integrated loudness. Replaces the last of the estimates.

---

## Stage 2 — Pause insertion *(scripted, gated by one listen)*

The method: the voice already pauses briefly at paragraph breaks. `silencedetect` finds those
gaps; the script lengthens the chosen ones to the spec durations rather than cutting into speech.

- Cue sheet generated per session from the reading copy: every paragraph boundary, every breath
  cue, mapped to a pause class — 3 s · long 6 s · extended 10 s · very long 15 s — and each breath
  window to its state's length (Agitated 10 s, Unsteady 12 s, Numb 8 s).
- The script aligns the cue sheet to the detected gaps and reports any it could not match, rather
  than guessing.
- Output: 31 timed vocal stems whose section marks land where the roster says they do.

**Gate: you listen to one.** T1-07 Shutdown Recovery, start to finish. If the pauses breathe
correctly there, the other 30 run unattended. If they don't, the pause classes get adjusted once
and it re-runs — that is the advantage of doing it this way.

---

## Stage 3 — Bed assembly *(scripted)*

Per the roster, each session's bed is built and placed:

- **Late entries** where the bed is shorter than the session — song 18 + 18.1 at 3:36 / 2:01 / 2:18,
  song 23 at 2:08 / 1:31.
- **Head trims** where the bed is longer — song 1, song 7 (all six), song 20, song 10 + 11.
- **Seams** at exact positions — song 11 → 22 at 4:28 and 5:00; song 3.4 entering at Rise;
  song 8 → its partner at 6:44 on Overwhelm.
- **Two renders each for song 11 and song 18**, which are used across states at different windows.

**Blocked on measurement:** song 12 is 5:00 against two ~9:50 sessions, and song 8 needs its
partner chosen. Those two cannot be assembled until resolved.

---

## Stage 4 — Mix *(scripted from one template, gated by one listen)*

Built once on **T1-07**, which gets song 7's build at full depth and sets the reference level.

- Bed 18 dB under voice.
- EQ carve: bed clear of 100–250 Hz (voice fundamental), soft at 2–4 kHz (consonant definition),
  rooted around 41 Hz.
- **Three decided automations**, applied as overrides:
  - T1-10 and T2-10 — song 7's build ridden 2–3 dB down so the net level never climbs.
  - T2-03, T2-04, T1-08 — song 18's climax held back; none of those three has a line at the 5:15 mark.
  - T3-01 — ends at full presence, no fade.

**Gate: you listen to two.** T1-07 for the level template, and one song 3.2 session for the flute
— airy tone sits in 1–3 kHz, exactly where breath noise and consonants live. That one is a genuine
conflict and it is easier to hear than to reason about.

---

## Stage 5 — Master *(scripted, ~15 minutes)*

Two-pass EBU R128 normalisation across all 31: **−16 LUFS integrated, −1 dBTP, stereo, 44.1 kHz**.
This is a measurement, not taste, and a batch gets it more consistent than hand-mastering would.

Delivery encode happens exactly once, from the WAV masters. Never MP3 → MP3.

---

## Stage 6 — QC and upload *(yours)*

- **Listen to all 31 end to end.** Not spot checks. The two failure modes here — a seam in the
  wrong place, and a bed resolving where the script refuses — do not show up on a meter.
- Then into `assets/audio/meditation/` and the tracker rows close.

---

## 7. What is genuinely blocked, and on what

| Blocker | Blocks | Needs |
|---|---|---|
| Library voice not chosen | everything | one decision |
| Song 12 is 5:00, needs ~9:50 | T3-03, T3-06 | extend, loop, or repair |
| Song 8's partner not chosen | T1-03 | song 6 is the only unused bed long enough |
| Does song 12 lift? | T3-06 | one listen — if it lifts it is the wrong bed |
| Does song 21 lift? | T1-06 | one listen — no fallback file since 3.3 was dropped |
| Does song 20 settle or lift? | T0-00 | one listen |
| Flute vs consonants | T1-04, T2-07, T3-01 | one listen under a dialogue take |
| Clearing vocal unidentified | T0-00 | find it among the four unnamed files |

Everything else is measurable and can run.

---

## 8. Why not Adobe, and why not a DAW

**Adobe.** The connector available here exposes image, video, PDF and Express tools. There is no
multitrack audio mixer in it. Its one audio tool, Enhance Speech, is built to rescue noisy human
recordings by resynthesising the voice — run on clean synthetic output it imposes its own
artefacts on takes that have already been approved. Audition is real software, but it is not
reachable from here and it is a manual DAW.

**A DAW generally.** Audition or Reaper would do this job well for one session. For 31, with ~900
timed silences, fixed seam positions and a fixed loudness target, hand work is slower and less
consistent than a script — and when a rule changes, every session has to be revisited instead of
re-run.

**What a human is still needed for.** Everything in the gates above. A script cannot hear whether
a bed resolves where the script refuses to, whether a seam reads as a change or a mistake, or
whether the flute is eating consonants. Those are the decisions that make it sound finished, and
they are yours — or an engineer's, for the two or three hardest.

**If any of it is outsourced**, buy one or two reference mixes with the session file and settings
delivered, not just audio. Then batch the other 29 against that template. Paying someone to mix
all 31 buys less than it looks like, because the decisions that matter are editorial ones already
made — an engineer does not know that the grief bed must not lift.
