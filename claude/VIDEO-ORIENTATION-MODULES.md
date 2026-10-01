# Orientation videos — the eight modules

30 September 2026. Founder-ruled. Sits with `VIDEO-PRODUCTION-METHOD.md` and the
other video documents; this one covers the in-product orientation set only, not
the marketing films.

Supersedes the twenty-item and fourteen-item lists discussed on 30 September.
Founder ruling: **focus on the primary set.** Eight modules, and a member ever
sees seven of them.

---

## 1 · One library, two doors

The two audiences arrive in opposite states, and only the first video differs.

A **consumer member** went looking for SafeRise, paid for it, and opens it
wanting to know *how do I do this properly*.

An **employee on an organisational seat** was handed access by their employer and
chose nothing. Their first question is not how to use it. It is *who is watching
me*. Until that is answered they will run one shallow session and not return.

So ORV-02 is the consumer's first video and ORV-01 is the employee's. After the
door, the sequence is identical and the library is shared. There are not two
libraries and there must never be two, because every duplicated asset is one
that goes stale separately.

## 2 · Film and screen capture never mix inside one module

The hardest production rule here, because breaking it is what costs money.

**Film carries the method** — the states, the human situations, the four phases.
No interface in frame, ever. These stay true through every redesign, they are
brand assets, and they are what an employer shows at rollout.

**Screen capture carries where to click, and nothing else.** Disposable by
design: every interface change invalidates them, so they are short, cheap and
easy to re-record.

The trap is a well-shot three-minute film about Recognise that also shows
someone tapping through the player. Change the player and the film dies with it.
Keep the expensive, durable material away from the interface.

## 3 · The eight modules

| ID | Title | Form | Length | Audience | Canonical home |
|---|---|---|---|---|---|
| **ORV-01** | Who can see this | Film + motion | 2–3 min | Organisational seats — **first** | Best Practice, and first sign-in on an employer seat |
| **ORV-02** | What this is, and what it isn't | Film | 2–3 min | Consumer — **first** | Best Practice |
| **ORV-03** | How a protocol works, start to finish | Capture | ≤90 s | Both | Best Practice |
| **ORV-04** | The four phases | Film | 2–3 min | Both | Best Practice |
| **ORV-05** | When it's harder than you expected | Film | 2–3 min | Both | Best Practice |
| **ORV-06** | Triggers — before, during, after | Film | 2–3 min | Both | Best Practice |
| **ORV-07** | My Records | Capture | ≤90 s | Both | Best Practice, and `/records` |
| **ORV-08** | AI feedback: your switch | Capture | ≤90 s | Organisational seats | Best Practice, and beside the B12 switch |

### What was cut, and why

**The method was four films; it is one.** Recognise, Regulate, Release and Rise
as separate pieces is a course, not an orientation, and someone who needs four
videos before a first session will not have one. ORV-04 moves through all four.
The depth belongs on the science page and in writing, where a member can go
when they want it rather than before they are allowed to start.

**Triggers were three; they are one.** Before, during and after are a single
arc, and splitting them obliges the person in the middle of it to choose the
right video while activated.

**The pre/post ratings are not a module.** They are thirty seconds inside
ORV-03.

### What needs no video at all

Setting up · the resources · Decisions and the Chosen Self · Saved · how
Sovereign's voice input works.

All of these are short written sections on Best Practice with a screenshot.
Video is for what needs demonstrating or needs a tone set. The rest is
reference, and reference is faster read than watched.

## 4 · ORV-08 is constrained by B12, and the constraint is unusual

`B2B-PORTAL-DECISIONS.md` B11/B12: on an employer-provisioned seat AI feedback
is **off** until the employee turns it on, and the prompt that offers it must be
a neutral offer rather than a nudge.

That constraint reaches this video. **A video that sells turning AI feedback on
undermines the consent it exists to collect**, exactly as a pre-ticked box
would. ORV-08 explains what happens if it is on, what happens if it is off, and
stops. It is the one piece in the set where persuasive production values are a
liability rather than an asset.

Per B9 the employer is never told the outcome, and ORV-08 says so.

## 5 · The placeholder contract

Every module gets a placeholder module in the product **before** the video
exists, so Best Practice is useful on the day it ships rather than an empty page
waiting on a shoot.

A placeholder renders: the module title, its one-line description, its form
(film or walkthrough) and its expected length — and in place of the player, the
honest line that it has not been made yet. It never renders a broken player, a
dead play button, or a thumbnail implying something is there.

This replaces the single blanket empty state currently on `member-start-here.html`
("The videos are still being made"), which tells a member nothing about what is
coming.

Namespace: the existing `sr-or-` surface code, extended. A module carries its
ORV id as a data attribute so a video can be dropped in later without touching
the markup around it.

**A placeholder is not a promise of a date.** No "coming soon", no month, no
ordering language that implies a schedule.

## 6 · Sequencing — this matters to the budget

**The three screen-capture modules (ORV-03, 07, 08) must not be shot until the
dashboard restructure lands.** The rail is being reordered, Start Here is being
renamed to Best Practice, the banner rails are being promoted to tab controls,
and the Clearing is returning to the dashboard. Every frame of capture recorded
before that is wrong afterwards.

**The five film modules have no such dependency** and carry the longer lead
time. They are what to start on.

**Best Practice does not exist yet** — it is `member-start-here.html` renamed, in
a pass not yet written. The placeholder modules land in that pass, not before.

## 7 · The film has a second job

ORV-01, 02, 04, 05 and 06 are not only onboarding. They are what an employer
shows at rollout, what goes into their internal comms, and what makes the
programme countable — which `B2B-ENTERPRISE-LAYER.md` §1 names as the thing HR
must be able to report in order to renew a budget line.

One shoot, two uses. That should shape the production value they are given, and
it is the argument for shooting them properly rather than quickly.

## 8 · Open

- **Casting and location** — not decided here. The standing imagery brief
  applies: no repeated faces across assets, ages 27–37, middle-class settings,
  subjects self-assured and composed, nothing reading as journalling or
  coaching.
- **Whether ORV-01 is live action or motion graphics.** The subject is an
  architectural claim about row-level security, which is hard to film and easy
  to animate. Motion with a voice is the likely answer, but it is the one module
  whose form is genuinely open.
- **Captions and transcripts** — required, not optional, and not yet specified.
