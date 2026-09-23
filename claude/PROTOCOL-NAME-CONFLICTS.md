# Protocol-name conflicts — new track copy vs. live `coming-soon.html`

Recorded 22 September. Source A: `coming-soon.html` as it renders today.
Source B: the twelve-track executive summaries supplied 22 September.

Per Rule 7 nothing has been silently merged. **The explorer mockup now renders Source B.**
The live page still renders Source A. They must be reconciled before either surface ships.

---

## Summary

| Track | Names that differ | Character of the change |
|---|---|---|
| Executive Presence | 2 of 10 | Two titles shortened. Same subject matter. |
| Embodied Nutrition | 8 of 10 | Eight replaced. **A substantially different track.** |
| Strength & Return | 10 of 10 | **All ten replaced. This is a different track**, not a rename — see below. |
| Sleep & Recovery | 5 of 10 | Five replaced. **04, 05, 08, 09, 10 are new subjects**, not rewordings — the track pivots toward daytime rest and restoration. |
| Elevation Series | 5 of 10 | Five retitled — plainer, shorter. Same subject matter. |
| Entrepreneur's Journey | 3 of 10 | Three changed; 01 inserted, pushing The Leap to 02. |
| Money Shift | 1 of 10 | One reworded. |
| Sex & Intimacy | 5 of 10 | Five — four are punctuation or shortening, one (06) is a retitle. |
| Addiction Recovery | 1 of 10 | One — and it **resolves a live duplicate** (see below). |

**40 protocol names differ in total, across 9 of the 12 tracks.**

Personal Transformation, Relationship Healing and Professional Performance are live tracks
with no coming-soon card; their names in the new copy match `content/tracks.js`.

---

## Three that are more than renames

**1 · Strength & Return is a different track.** The live ten are shame-and-comparison
subjects (Lapse Shame, The Mirror, Room Comparison, Being Watched). The new ten are
goal, parenthood and recovery subjects (Your Own Goal, Movement After Parenthood,
A Higher Level, Recovery Builds Strength). Only the theme of returning survives.
Treating this as a rename would misrepresent what was decided.

**2 · `Rest Guilt` no longer exists.** It was Strength & Return 07 on the live page.
`PASS-sleep-track-coming-soon.md` §1 renamed Sleep 07 to **Permission to Stop** solely to
avoid colliding with it. Permission to Stop survives in the new copy and is the better name,
so the outcome stands — but **the reason recorded for it is now void**. Noted so nobody
later reverts the rename on the grounds that the collision is gone.

**3 · A live duplicate is resolved.** `The Long Middle` currently appears twice on
`coming-soon.html` — Entrepreneur's Journey 10 and Addiction Recovery 10. The new copy
renames the Addiction one to **Staying with Recovery**. That is a live defect fixed.

---

## Full diff

### Executive Presence

| # | Live on `coming-soon.html` | New copy |
|---|---|---|
| 08 | Carrying What They Told You | **Holding Their Confidence** |
| 09 | What It's Costing at Home | **The Home Cost** |

### Embodied Nutrition

| # | Live on `coming-soon.html` | New copy |
|---|---|---|
| 01 | Eating Without Hunger | **Before the Reach** |
| 03 | Hunger Signals | **Reading Your Signals** |
| 05 | The Body Verdict | **Changing Your Defaults** |
| 06 | Eating in Company | **Enjoying with Balance** |
| 07 | When Control Feels Safer | **Your Own Plate** |
| 08 | Comfort Reach | **Control and Safety** |
| 09 | The Plan That Broke | **When Plans Shift** |
| 10 | Knowing Enough | **Nourishment Under Pressure** |

### Strength & Return

| # | Live on `coming-soon.html` | New copy |
|---|---|---|
| 01 | Lapse Shame | **Returning Without Judgment** |
| 02 | The Mirror | **Your Own Goal** |
| 03 | Effort Tolerance | **Starting from Exhaustion** |
| 04 | Room Comparison | **Today's Body** |
| 05 | Injury Fear | **Returning After Injury** |
| 06 | The Missed Week | **Movement After Parenthood** |
| 07 | Rest Guilt | **A Higher Level** |
| 08 | Being Watched | **When Motivation Changes** |
| 09 | Body Change Lag | **Your Own Pace** |
| 10 | Training Through Load | **Recovery Builds Strength** |

### Sleep & Recovery

| # | Live on `coming-soon.html` | New copy |
|---|---|---|
| 04 | Tired and Wired | **Daytime Rest** |
| 05 | The Deficit | **Borrowing from Sleep** |
| 08 | Broken Rhythm | **Leaving Demands Behind** |
| 09 | The Day After | **After Little Rest** |
| 10 | Return from Depletion | **Choosing Restoration** |

### Elevation Series

| # | Live on `coming-soon.html` | New copy |
|---|---|---|
| 03 | The Urge to Leave | **Urge to Leave** |
| 06 | When Belief Collapses | **Belief Collapse** |
| 07 | What You Won't Let Go Of | **Loosening Your Grip** |
| 08 | What You Cannot Keep | **What Cannot Stay** |
| 09 | What You Give Off | **Your Felt Presence** |

### Entrepreneur's Journey

| # | Live on `coming-soon.html` | New copy |
|---|---|---|
| 01 | The Leap | **Your Lived Value** |
| 02 | No One Is Coming | **The Leap** |
| 06 | Founder Isolation | **Supported Responsibility** |

### Money Shift

| # | Live on `coming-soon.html` | New copy |
|---|---|---|
| 09 | Money in the Room | **Money in Company** |

### Sex & Intimacy

| # | Live on `coming-soon.html` | New copy |
|---|---|---|
| 04 | History & Inexperience | **History and Inexperience** |
| 06 | Sexual Seasons & Libido | **Changing Desire** |
| 08 | Forbidden Desire & Regret | **Desire and Regret** |
| 09 | Shutdown & Reconnection | **Shutdown and Reconnection** |
| 10 | Living With an STI | **Living with STI** |

### Addiction Recovery

| # | Live on `coming-soon.html` | New copy |
|---|---|---|
| 10 | The Long Middle | **Staying with Recovery** |

---

## What is not in the explorer

The executive summaries carry a **Market outlook** block per track — Interest, Favourability,
Demand and Revenue-contribution scores plus commentary. The source file states these are
*"editorial hypotheses on a 1–5 scale, not measured demand or revenue forecasts"*.
They are internal. **None of it is rendered in the explorer**, consistent with the 22 September
decision that development status is not customer-facing.

The boundary line closing each track's outlook **is** rendered — it is a scope
commitment, not a forecast.

---

## Decision needed

Which source wins. The explorer can be switched back in one data file.

1. **New copy wins** — `coming-soon.html` needs 40 name changes across 9 cards, and the
   Strength & Return card needs its body copy rewritten, not just its list.
2. **Live page wins** — the explorer reverts and the new copy is filed as a proposal.
3. **Split** — adopt per track. Only defensible if each is decided deliberately.

Until this is resolved, **no pass should touch `coming-soon.html`'s protocol lists.**
