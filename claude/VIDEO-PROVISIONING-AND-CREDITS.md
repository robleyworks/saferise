# VIDEO — PROVISIONING LIST AND CREDIT SCOPE

24 September 2026. Against `claude/VIDEO-B2C-FINAL-SCRIPT.md` and
`claude/VIDEO-B2B-FINAL-SCRIPT.md`. Extends `claude/VIDEO-SHOT-PLAN-FINAL.md`.

**Balance today: 6,072 credits** (5,760 plan + 312 purchased). A credit is
$0.01, so the account holds about **$61**.

---

## 1 · Two rate findings that decide the whole approach

### Generate at 1080p. Never upscale to it.

| route | credits per second of finished 1080p |
|---|---|
| **Veo 3.1, 1080p, no audio** | **10** |
| video upscale, 720p → 1080p, 24fps | ~22 |
| Seedance 2.0 at 720p, then upscale | 36 + 22 = 58 |
| Seedance 2.5 at 1080p | 68 |

**Upscaling costs more than twice what generating natively costs.** Every
720p route is worse than simply asking for 1080p in the first place.

⚠ Veo's 1080p output requires **8-second clips**. That is the unit of
everything below: **one clip = 8s = 80 credits = $0.80.**

### Stills are almost free, so approve the person before animating

| | credits |
|---|---|
| Gen-4 Image Turbo, any resolution | **2** |
| Gen-4 Image, 1080p | 8 |
| Seedream 5 Lite | 4 |

A video retake costs **forty times** an image retake. So every character is
cast as a still first, iterated until it is right, and only then animated.
That is not a nicety — it is what keeps this inside the balance.

---

## 2 · Dual-purposing — three of the five panels serve both films

The two scripts describe the same states in the same places. Where a B2C
character and a B2B employee are in the same state at work, **one performer and
one setup serves both**: the B2C panel is the long cut, the B2B beat is a short
cut of the same person.

| performer | B2C beat | B2B beat | shared? |
|---|---|---|---|
| **P1** · man, manager, workplace | 02 OVERWHELM · 23.5s — *can't figure out how to get started, team stopped bringing me decisions* | 03 EMPLOYEE · 9.6s — *overwhelming here every day, then I'm to blame for how I react* | **yes** — same state, same room |
| **P2** · man, office, signing things | 05 INSECURITY · 34.6s — *waiting to be found out, I sign things, I smile, I don't understand* | 02 EMPLOYEE · 14.3s — *after I got promoted it broke me, now I'm a fish out of water* | **yes** — both are performing a competence they do not feel |
| **P3** · man, home and workplace | 03 ANGER · 25.7s — *once I feel hurt, anger just comes out, my daughter can read my face* | 01 EMPLOYEE · 9.1s — *I just speak direct, I don't care how people feel about it* | **partly** — same performer, two setups. The B2B cut needs its own room |
| **P4** · woman | 01 ANXIETY · 25.7s | — | no |
| **P5** · woman | 04 SHUTDOWN · 25.7s | — | no |
| — | — | 04 EMPLOYEE · 6.1s | **already shot** — V6, the woman behind glass |

**What sharing saves:** without it, eight separate characters. With it, **five
performers cover nine beats**, and the B2B employee beats cost only the extra
seconds, not a new setup. P3 is the only one needing a second environment.

⚠ B2C 04 SHUTDOWN has no B2B counterpart and never will. *I'm numb, my sister
stopped calling* is a domestic state; nothing in the B2B script goes there.

---

## 3 · The list

### A · Character panels — the job

| | seconds | clips at 8s |
|---|---|---|
| P1 · overwhelm, workplace (B2C 02 + B2B 03) | 33 | 5 |
| P2 · insecurity, office (B2C 05 + B2B 02) | 49 | 7 |
| P3 · anger, home + workplace (B2C 03 + B2B 01) | 35 | 5 |
| P4 · anxiety, woman | 26 | 4 |
| P5 · shutdown, woman | 26 | 4 |
| | **169s** | **25** |

Each also needs **one held frame** — the freeze the panel keeps once it
retires to a fifth of the screen. That is a still, not a generation: pull it
from the clip.

### B · B2B narrator pictures still missing

| beat | s | what | clips |
|---|---|---|---|
| 00 · a workplace before anyone arrives, early not late | 16.5 | still open since round one | 2 |
| 01b · the chain — March, July, August | 28.7 | longest narrator beat in either film; needs three pictures | 4 |
| 02b · the performance conversation | 16.1 | | 2 |
| 03b · the notice in the drafts folder | 12.2 | | 2 |
| 04b · handover, feedback, decision | 16.5 | partly cuttable from panel material | 2 |
| | **90s** | | **12** |

### C · Rescuing the eleven existing clips

Seven of the eleven serve a beat: V1, V5, V6, V7, V8, V9, V10. All 720p,
roughly 28 seconds in total. Upscaling only those: **~620 credits**.

The other four — V2, V3, V4, V11 — have no beat. Leave them.

---

## 4 · The budget

| | credits | $ |
|---|---|---|
| Panels · 25 clips × 80 | 2,000 | 20.00 |
| B2B narrator · 12 clips × 80 | 960 | 9.60 |
| Casting stills · ~12 setups × 3 variants × 8 | 290 | 2.90 |
| Upscale the 7 existing clips | 620 | 6.20 |
| **Clean pass, no retakes** | **3,870** | **38.70** |
| Retakes at 1.8× on video only | +2,370 | +23.70 |
| **Realistic total** | **~6,240** | **~62.40** |

**Against 6,072 credits, that lands within about 170 credits of the balance** —
which is to say it fits if the still-first discipline holds, and does not if it
does not.

| scenario | credits | verdict |
|---|---|---|
| still-first, 1.8× video retakes | 6,240 | **fits, no headroom** |
| no still-first, 3× retakes | 9,000 | needs ~3,000 more · $30 |
| Seedance 2.0 at 720p + upscale instead of Veo | 22,400 | not viable |

**The recommendation: top up 2,000 credits ($20) before starting.** It is small
against the exposure of running out mid-slate and having to rebuild continuity
on a half-finished panel.

---

## 5 · The order

1. **Cast five performers as stills.** Gen-4 Image Turbo at 2 credits. Iterate
   freely — a hundred images is 200 credits. Approve the person, the room and
   the light before any video is generated.
2. **Animate P1 first, end to end**, and watch all 33 seconds. It proves the
   chaining, the continuity and the real retake rate on one panel before the
   other four are committed.
3. Re-forecast from P1's actual spend. Every number above is arithmetic from
   published rates, not from a generation this workspace has run.
4. Panels P2–P5, then the twelve B2B narrator clips.
5. Upscale the seven existing clips last — they are already usable for the
   animatic at 720p and nothing is learned by paying early.

---

## 6 · Prompt base

The five clips generated on 15 September establish the register, and their
language is the base for the panels:

> Restrained documentary shot, eye-level, subtly handheld. … Seen at middle
> distance, faces not fully legible, some turned away. … Contemporary everyday
> clothing. … No signage, no branding, no text anywhere. … muted restrained
> colour grade, shallow depth of field. Real-time pacing, no slow motion.

Three additions the panels need and those clips did not:

- **Casting named in the prompt**, not left to the model's default. The standing
  rule is that casting is a search parameter, not a review filter.
- **Vertical composition** — the subject centred with headroom, because each
  panel spends most of the film as a 384 × 1080 slice.
- **Almost no motion.** A person breathing, barely moving. It suits the register
  and it is what generative video holds best across a long hold.

⚠ The 15 September clips put **earbuds** in nearly every shot. Correct for the
member-experience imagery they were made for, wrong for the strain panels — the
character is not using the product yet. Exclude them explicitly.
