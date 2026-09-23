# SafeRise Meditation Library — Build Handover

**Date:** 18 September 2026
**Status:** 31 of 31 scripts written, trimmed and voiced. 31 of 31 beds allocated. Work moves to bed builds, assembly and mixing.
**Live roster:** the Sound Bed Roster artifact is the working view of this document and is updated as allocations change. This file is the snapshot for the tracker page.

> **Reconciliation note, added 18 Sep when this file was committed.** Section 2 below states that no beds
> have been built. Andre's position later the same day is that the beds are rendered and the remaining
> work is mix, engineer, master and upload. Treat §2's first bullet as superseded on that point; §6's
> outstanding *measurements* still stand, because a rendered bed whose length has not been checked
> against its script cannot be assembled. Tracker rows: LG-279 mix, LG-280 engineer, LG-281
> measurements, LG-282 master, LG-283 upload.

---

## 1. What is done

- All 30 protocols plus The Clearing are written, voice-reviewed and recorded in ElevenLabs Studio.
- Every session has a named sound bed.
- Every script carries the breath count matching its state. This was the main defect found in the audit — every script previously cued four in / six out regardless of state, which was actively counter-therapeutic on the Numb sessions.
- Three mix decisions are settled and recorded below so they are not relitigated at the desk.

## 2. What is not done

- **No beds have been built or assembled.** Section 6 lists every measurement still outstanding. *(See the reconciliation note above — the build half of this is superseded; the measurements are not.)*
- **The repo has not been updated.** Six passes were specified and never run. The production scripts still carry the old wording, the four-in/six-out breath cue on every state, and untimed pauses. This does not block the audio build, but the site is currently shipping text that does not match the recorded vocals. *(Tracker: LG-204.)*

---

## 3. Bed rhythm spec (adopted 16 September 2026)

90 BPM, 3/4. One bar = 2 seconds.

| State | Phrase | Breath | Window | Weighting |
|---|---|---|---|---|
| Agitated | 5 bars | 4 in / 6 out | 10 s | exhale-led |
| Unsteady | 6 bars | 6 in / 6 out | 12 s | symmetric |
| Numb | 4 bars | 4 in / 4 out | 8 s | symmetric, faster on purpose |

The Numb window is deliberately the fastest. Shutdown needs to come *up* into range, not down.

**Mix constraints.** Bed rooted around 41 Hz. Clear of 100–250 Hz, the voice fundamental. Soft at 2–4 kHz for consonant definition. Bed sits 18 dB under voice.

**Loudness.** −16 LUFS integrated, −1 dBTP, stereo. The −19 figure is the mono target and does not apply here.

**Pauses.** 3 s · long 6 s · extended 10 s · very long 15 s. Breath cues are silences on the timeline at the state's window length. Pauses are inserted at assembly, both voices from one timeline.

**Runtime estimation.** `words / 112 wpm + (pauses + breath windows) / 60`

---

## 4. Full allocation — 31 sessions

All vocals recorded. Window follows from state.

| Code | Session | State | Bed | Runtime / notes |
|---|---|---|---|---|
| T0-00 | The Clearing | — (8 s) | Song 20 | length TBC |
| T1-01 | Anxiety Reset | Agitated | Song 11 + 22 | 10:28 · seam 4:28 |
| T1-02 | Anger Alchemy | Agitated | Song 18 + 18.1 | 13:36 · bed in at 2:36–3:36 |
| T1-03 | Overwhelm Threshold | Agitated | Song 8 + ? | 13:06 · trimmed 18 Sep |
| T1-04 | Abandonment Wound | Agitated | Song 3.2 + 4 + 3.4 | 12:44 · 3.4 from 10:44 |
| T1-05 | Shame Dissolution | Unsteady | Song 10 + 11 | 9:53 |
| T1-06 | Grief Integration | Unsteady | Song 2 + 21 | vocal 9:29 · 21 from 9:29 |
| T1-07 | Shutdown Recovery | Numb | Song 7 | 8:56 |
| T1-08 | Jealousy Release | Unsteady | Song 18 + 18.1 | 9:39 · head-trim |
| T1-09 | Insecurity Anchor | Unsteady | Song 1 | 9:52 |
| T1-10 | Powerlessness & Despair | Numb | Song 7 | 9:24 · loop at plateau |
| T2-01 | Safe Conversation | Agitated | Song 23 | 12:08 |
| T2-02 | Rupture & Repair | Unsteady | Song 1 | 9:53 |
| T2-03 | Trust & Betrayal | Agitated | Song 18 + 18.1 | 12:01 · bed in at 1:01–2:01 |
| T2-04 | Resentment Release | Unsteady | Song 18 + 18.1 | 9:52 · head-trim |
| T2-05 | Intimacy Barrier | Unsteady | Song 1 | 9:53 |
| T2-06 | Double Standard | Unsteady | Song 1 | 9:30 |
| T2-07 | Projection Clarity | Agitated | Song 3.2 + 4 + 3.4 | 12:09 · 3.4 from 9:59 |
| T2-08 | Appreciation & Support | Numb | Song 7 | 8:28 |
| T2-09 | Pursue & Withdraw | Unsteady | Song 1 | 9:44 |
| T2-10 | Conscious Separation | Numb | Song 7 | 8:16 |
| T3-01 | High-Stakes Presence | Agitated | Song 3.2 + 4 + 3.4 | 11:47 · 3.4 from 9:49 |
| T3-02 | Conflict Navigation | Agitated | Song 23 | 11:31 |
| T3-03 | Imposter Dissolution | Unsteady | Song 12 | 9:48 |
| T3-04 | Perfectionism Release | Agitated | Song 18 + 18.1 | 12:18 · bed in at 1:18–2:18 |
| T3-05 | Performance Anxiety | Agitated | Song 11 + 22 | 11:20 · seam 5:00 |
| T3-06 | Belonging Gap | Unsteady | Song 12 | 9:53 |
| T3-07 | Career Transition | Unsteady | Song 10 + 11 | 9:52 |
| T3-08 | Decision Fatigue | Numb | Song 7 | 9:05 · loop |
| T3-09 | Burnout & Overload | Numb | Song 7 | 9:23 · loop |
| T3-10 | Creative Flow | Unsteady | Song 10 + 11 | 9:48 |

State counts: 11 Agitated · 13 Unsteady · 6 Numb · 1 with no arriving state.

---

## 5. Bed inventory

| Bed | Sessions | Renders needed | Note |
|---|---|---|---|
| Song 1 | 5 — T1-09, T2-02, T2-05, T2-06, T2-09 | 12 s | light lift, limited percussion |
| Song 2 + 21 | 1 — T1-06 | 12 s | exclusive to grief; 21 plays on after the vocal ends |
| Song 3.2 + 4 + 3.4 | 3 — T1-04, T2-07, T3-01 | 10 s | only three-movement bed; 3.4 enters at Rise |
| Song 7 | 6 — T1-07, T1-10, T2-08, T2-10, T3-08, T3-09 | 8 s | rising arc, plateau under Rise |
| Song 8 + ? | 1 — T1-03 | 10 s | song 8 is 5:00; partner not chosen |
| Song 10 + 11 | 3 — T1-05, T3-07, T3-10 | 12 s | part two takes over at Release |
| Song 11 + 22 | 2 — T1-01, T3-05 | 10 s | song 11 also opens this pair, spliced |
| Song 12 | 2 — T3-03, T3-06 | 12 s | character not yet described |
| Song 18 + 18.1 | 5 — T1-02, T1-08, T2-03, T2-04, T3-04 | **10 s and 12 s** | 3 Agitated + 2 Unsteady — render twice |
| Song 19 | — | — | freed when Overwhelm moved to song 8 |
| Song 20 | 1 — T0-00 | 8 s | exclusive to Clearing |
| Song 23 | 2 — T2-01, T3-02 | 10 s | both Agitated, single render |

**Song 11 is used in two different builds** — as the second movement on song 10 + 11 (Unsteady, 12 s) and as the first movement on song 11 + 22 (Agitated, 10 s). Like song 18, it needs rendering at both windows.

**No longer in use:** the anger sound, song 3.3, song 19.

**Free in the 1–23 range:** 5, 6, 9, 13, 14, 15, 16, 17.

---

## 6. Outstanding — measurements, not decisions

1. Song 20's length against The Clearing, and confirm it neither settles nor lifts. This is the one session that assumes no arriving state; a bed with a direction would give it one.
2. Song 21's length, and that it ends without a lift. It plays on after the vocal ends at 9:29, so it is the last thing the member hears. Song 3.3 was dropped, so there is no fallback file — if 21 lifts, the tail gets edited: percussion and harmonic lift out, bed thinning to nothing.
3. Song 12's length and whether it lifts. If it lifts it is the wrong bed for Belonging Gap — that protocol is about editing yourself to fit a room, and a lift at the close is the music performing a version that fits.
4. Song 22 against the ten-second window, on T1-01 and T3-05.
5. Song 23's length against 12:08 and 11:31, and confirm it does not resolve at the close — neither script does.
6. Song 18 + 18.1 total length, measured after the trims.
7. Song 3.2 + 4 total length, and hear the flute under an actual dialogue take. Airy tone sits in 1–3 kHz, over the band kept soft for consonants, and breath noise lands in the same place. The timpani is safer — low, sustaining, at or under one stroke per phrase.
8. Confirm T3-06 reads Unsteady in the live `tracks.js` META.
9. Every master at −16 LUFS stereo, bed 18 dB under voice.

The former item 4 (song 8's partner on Overwhelm Threshold) moved to §7 — SR-431, 23 September
2026 (PASS-J.md E2): decided, not outstanding.

---

## 7. Mix decisions already settled

**Song 7's build, on T1-10 and T2-10.** Both sessions end on an explicit refusal to resolve — *nothing about the situation has changed* and *nothing's resolved, that was never the offer*. Song 7's rise would argue with that. The fix is a mix move, not an edit: automate the bed 2–3 dB down across the build so the net level stays flat. The arc survives as timbre and density, the loudness never climbs, and the member still comes up into range without being told they will. Take T2-10 at 3 dB rather than 2 and start earlier — it is the shortest session in the library, so the build lands more steeply. **Do T1-07 first**: it gets song 7's build at full depth, and the level set there is what the other two come off.

**Song 18's climax, on T2-03, T2-04 and T1-08.** Only T1-02 and T3-04 have a line at the 5:15 mark. The other three were voiced without a resistance beat and signed off that way, so the climax has nothing to land on. Ride it back in the mix rather than letting it peak against silence.

**T3-01 ends at full presence, no fade.** The script supplies the energy — *you're keyed up, and you're ready* — and the session ends with the member walking into the room. A fade would drain it.

**Song 8's partner, on Overwhelm Threshold — SR-431, 23 September 2026 (PASS-J.md E2).**
Extend song 8 to 6:44 so the seam lands on Release, partner then runs 6:22. Recommended in
§6 with reasoning (the partner must hold without arriving anywhere and must not resolve —
the script ends on *the load is still there*) and nothing has contradicted it since. No
re-edit, no re-render of song 8 itself. `t1-03` still ships interim regardless — see
`docs/INSTALL-MEDITATIONS.md` §4: the master has no bed at all for its first eight minutes
until this partner exists, which is a separate, larger rebuild than choosing the partner.

---

## 8. Editorial principle behind all of the above

**The beds carry a breathing rhythm, not an ending.** Music must not supply a resolution the script refuses. This caught three separate problems during allocation — the grief lift, the Numb reassurance build, and a bed that travelled from wronged to redeemed — and it is the rule to apply to any bed decision still open.

---

## 9. Repo passes never run

Six passes were specified and none has been executed. Until they are, the production scripts diverge from the recorded audio on:

- Step names — the verb forms Recognise · Regulate · Release · Rise are canonical; the noun forms Recognition and Regulation are retired
- State-matched breath counts — production still cues four in / six out on every state
- Timed pauses — production pauses are untimed
- "Hand to heart" and "chest" in place of "sternum"
- Dispenza — permanently banned from member-facing content

A lint script exists that enforces these rules. It found 265 problems in the original scripts and 0 in the revised set.

---

## 10. Related documents

- `docs/VOICEOVER-HANDOVER.md` — the script → ElevenLabs Studio pipeline: render settings, formatting and splitting rules, and the open items on guide persona and the Insecurity close. Its script inventory is superseded by §4 above (see tracker LG-290).
- `docs/tracker-v34.html` — the Go-Live Register. Audio rows are LG-279 to LG-290.
- `docs/TRACKER-LINEAGE.md` — which tracker version supersedes which, and why v33 does not exist.
