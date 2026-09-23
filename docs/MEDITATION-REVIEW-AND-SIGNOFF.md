# Meditation Library — Review and Sign-off

**Date:** 22 September 2026
**Status:** 31 of 31 mastered. 21 live on the site, 10 built and awaiting install.

Nothing is blocked on production. What remains is a listening pass, four decisions, and the install.

**Master spec, all 31:** speech level at momentary p90 of −12.6 LUFS, calibrated to the approved T1-07.
True peak under −1.3 dBFS. Bed 18 dB under the voice. 192 kbps, 44.1 kHz, stereo.
No ducking anywhere — beds carry static gain only.

Integrated LUFS is deliberately *not* the target. These files run up to half silence and R128 gating
counts the music-only stretches, which reads low on pause-heavy sessions and over-drives them when
corrected. That mistake was made once, on Resentment, and caught by comparing speech peaks.

---

## 1 · Listen with a purpose

Eleven sessions where a build decision needs an ear. Go to the timestamp rather than sitting through
the session.

| Session | Length | Go to | What to listen for |
|---|---|---|---|
| T1-06 Grief Integration | 17:37 | 9:37 on | Song 21 climbed 22 dB across six minutes. The loudness arc is removed and the last 90s thins out instead of landing. The **arrangement** still thickens — instruments enter, texture builds — and without stems that cannot be pulled out. Does it still resolve a grief the script refuses? |
| T2-01 Safe Conversation | 11:42 | 8:29 | Splice: the bed jumps back to 6:27 and replays 2:02. Spectrally matched, 20s crossfade. Reads as continuing, or as looping? |
| T3-02 Conflict Navigation | 13:33 | 9:00 | Same method, jumping back to 5:07 and replaying 3:53. Longer repeat, more exposed. |
| T1-03 Overwhelm (female) | 13:00 | 0:00–8:00 | Eight minutes with no bed at all. Interim, until song 8 has a partner. Does unaccompanied voice hold that long? |
| T1-03 Overwhelm (male) | 13:03 | 0:00–8:00 | Same, plus the voice comparison — the only male take built. |
| T3-01 High-Stakes Presence | 9:11 | 9:03–9:11 | Ends at full presence, no fade — song 3.4 cut at its peak, because the script ends with the member walking into the room. Deliberately unlike every other ending. |
| T2-07 Projection Clarity | 9:58 | 9:28 on | The same closing movement, allowed to resolve fully. Compare against High-Stakes to check both readings. |
| T1-04 Abandonment Wound | 12:58 | 5:40 on | Longest in the library. Song 4 carries 6:12 here against 3:12 on Projection, so it leans harder on that drum texture — which also runs under five song-18 sessions. |
| T1-05 Shame Dissolution | 8:32 | whole | Shortest in the library, and the female take. Song 10 + 11 gives 512s of usable bed and no more. |
| T3-07 Career Transition | 9:25 | 4:15 | Built on a 4:25 handover, but song 10 starts fading at 3:55 — there is a dip through the seam. Also seam-forced pacing: 11.7s pauses before Release, 3.6s after. |
| T3-10 Creative Flow | 9:25 | 4:15 | Same two problems, same bed pair. |

## 2 · Sign-off only

Twenty with nothing known to be wrong. Each still wants an end-to-end listen — a seam in the wrong
place and a bed resolving where the script refuses do not show up on a meter.

| Session | Length | Bed |
|---|---|---|
| T0-00 The Clearing | — | Song 20 |
| T1-01 Anxiety Reset | 11:51 | Song 11 + 22 |
| T1-02 Anger Alchemy | 10:47 | Song 18 + 18.1 + 4 |
| T1-07 Shutdown Recovery | 10:00 | Song 7 |
| T1-08 Jealousy Release | 9:11 | Song 18 + 18.1 + 4 |
| T1-10 Powerlessness & Despair | 10:00 | Song 7 |
| T2-03 Trust & Betrayal | 11:17 | Song 18 + 18.1 + 4 |
| T2-04 Resentment Release | 9:10 | Song 18 + 18.1 + 4 |
| T2-05 Intimacy Barrier | 10:00 | Song 1 |
| T2-06 Double Standard | 10:00 | Song 1 |
| T2-08 Appreciation & Support | 10:00 | Song 7 |
| T2-09 Pursue & Withdraw | 10:00 | Song 1 |
| T2-10 Conscious Separation | 10:00 | Song 7 |
| T3-03 Imposter Dissolution | 9:12 | Song 12 + 6 |
| T3-04 Perfectionism Release | 10:58 | Song 18 + 18.1 + 4 |
| T3-05 Performance Anxiety | 12:30 | Song 11 + 22 |
| T3-06 Belonging Gap | 9:11 | Song 12 + 6 |
| T3-08 Decision Fatigue | 10:00 | Song 7 |
| T3-09 Burnout & Overload | 10:00 | Song 7 |
| T1-09 Insecurity · T2-02 Rupture | — | Song 1 — rebuilding, section 4 |

**T3-06 Belonging Gap — one open question now closed.** Song 12 does not lift. It peaks at 2:00 and
dissolves. A lift at the close would have been the music performing a version that fits the room,
which is the one thing that protocol is about.

## 3 · Four decisions

Each unblocks a rebuild. A position is taken on all four so nothing is stalled; overrule any and that
session reruns.

- [ ] **Song 8's partner, for Overwhelm.** Song 8 is 5:00 against a 13:00 session, so it covers only
      the last five minutes and the first eight have no bed. Song 6 is the only unused bed long enough
      to fill that in one piece; songs 5, 9 and 13–17 are shorter and suit a second movement rather
      than an opener. *Unblocks both Overwhelm builds.*
- [ ] **Career Transition and Creative Flow pacing.** Live with seam-forced pacing so Release lands on
      the bed change. Recommendation: take the even version. The crossfade is 25 seconds wide, so the
      precision is not audible, and 3.6s is not enough room to let go of anything.
      `MASTER_T3-07alt_Career-Transition-EVEN.mp3` is the comparison.
      *Unblocks two rebuilds, plus the 3:55 seam fix.*
- [ ] **Shame's length.** 8:32 because song 10 + 11 runs out. Extending song 11 by splice scored 0.49
      against song 23's 0.20 — an audible loop. Better to let the session fit the music. To lengthen
      it, song 11 needs a partner.
- [ ] **Shame's voice.** Built female, for consistency with the other thirty. `shame - male.mp3` is
      untouched; a switch is a ten-minute rebuild.

## 4 · Rebuilds already expected

Independent of what the review finds.

- [ ] **T1-09 Insecurity Anchor** — live, built from a take being re-rendered.
- [ ] **T2-02 Rupture & Repair** — live, source suspect: 3:53 against 6:41 expected. Every other single
      take falls between 70% and 100% of expected length; this one is 58%. Probably truncated — check
      the ElevenLabs render before re-recording.
- [ ] **T1-03 Overwhelm, both voices** — once song 8 has a partner.
- [ ] **T3-07 Career Transition** — pacing and the 3:55 seam.
- [ ] **T3-10 Creative Flow** — same.

**The song 10 handover affects the last two.** The original direction was to cross at 4:25 because song
10 begins to fade there. Measured, its continuous body ends at **2:10** and it is sparse after that,
bottoming at −38 dB. Shame was built with the handover at 3:50 and the sparse stretch lifted; those two
were not.

## 5 · Getting them live

- [ ] **Install the ten built since the last push** — T1-03 (both voices), T1-04, T1-05, T1-06, T2-01,
      T2-07, T3-01, T3-02, T3-03, T3-06. `INSTALL-MEDITATIONS.md` covers three and its table extends to
      the rest. Files go to `assets/audio/meditation/` as `<code>-<slug>.mp3`, registered in
      `content/meditation.js`.
- [ ] **T1-06 Grief needs a different route** — at 25 MB it exceeds the 20 MB per-file limit for writing
      to the local machine. Anything past about fourteen minutes will do the same.
- [ ] **Turn off `PLACEHOLDER_AUDIO`** at `protocol.html:1297`. While `true`, any protocol without a
      registered master plays The Clearing instead — silently, with no error.
- [ ] **Decide how Overwhelm's two voices are keyed.** `MEDITATION` holds one `src` per key. The
      9 September handover has member-toggled male/female as the intended architecture; until it exists,
      `t1-03` ships as one voice.
- [ ] **Watch the repo size.** The audio takes it past 500 MB and git keeps every version permanently,
      so each replaced master leaves its predecessor in history. Five rebuilds are already expected.

## 6 · The scripts still diverge from the audio

Outstanding since the September handover: six passes were specified against the production scripts and
none has run. The site currently ships text that does not match what was recorded.

- [ ] Step names — the verb forms Recognise · Regulate · Release · Rise are canonical; noun forms retired
- [ ] State-matched breath counts — production still cues four in / six out on every state, including Numb
- [ ] Timed pauses — production pauses are untimed
- [ ] "Hand to heart" and "chest" in place of "sternum"
- [ ] Dispenza — permanently banned from member-facing content
- [ ] Run the lint script — 265 problems in the original scripts, 0 in the revised set

---

## Appendix · How the masters were built

**Pacing.** The vocal takes are continuous reads with no written pauses. Forced alignment was
unavailable and re-rendering was not an option, so pacing works by *lengthening silences the voice
already left* — never inserting at a guessed position, which makes a pause landing mid-sentence
structurally impossible. Per-file threshold is chosen to hit roughly one pause per 11.9s of speech.

**Gap fill.** A gap's body is replaced with room tone tiled from the file's own quietest slice, chosen
by lowest peak, alternate tiles reversed to prevent periodicity, 30 ms crossfades at every join, and
80 ms of her own audio kept at each gap edge. A de-click pass zeroes isolated transients sitting inside
quiet — this fixed the tapping in Burnout, which turned out to be 36 low-level transients in the source.

**Reverb.** A synthetic impulse: 1.4 s, 0.34 decay, 22 ms pre-delay, 8 early reflections to 133 ms,
high-passed 170 Hz, low-passed 6.8 kHz, 30% wet.

**Beds.** Several needed their own loudness arc removed before they could sit under a voice — song 22
(a 20 dB crescendo), song 21 (22 dB), song 8 (16 dB), song 2, songs 10 and 11. Each was flattened with a
static gain curve derived from its own envelope. No compressor, no dynamics, no sidechain.

**Extension.** Song 23 was extended from inside itself: fingerprinted every half-second across sixteen
frequency bands, then searched every candidate pair at the required distance for the one where the
material either side of the join matches most closely. Song 11 was tested the same way and rejected —
it scored 0.49 against song 23's 0.20.
