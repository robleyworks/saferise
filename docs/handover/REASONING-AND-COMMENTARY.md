# SAFERISE — REASONING AND COMMENTARY LOG

**Covers:** 6–7 September 2026, across three compacted sessions.
**Purpose:** everything of substance that exists only as conversation — decision rationale, rejected work and why, flags raised, pushback given. The handover brief carries state. This carries *why*.

---

## 1. THE FILM DOES NOT EXIST

This is the single most load-bearing fact on the homepage and it is easy to lose.

Andre, 7 September:

> "I have not been able to finish developing the film as yet. It's gonna have to be done by AI. So in the meantime, I want the copy to carry the load of curating what the documentary was supposed to communicate implicitly. So let's be creative in reconciling that with the copy that we have right now and tell that story as best as we can so that it compels them into commit to one of those call to action boxes of personal transformation, relationship healing, or professional performance. And do that without expanding the word count."

Three consequences that must travel forward:

**The "survival, or choice" section was the film's stand-in.** The call not returned, the job never applied for, the relationship that ended on the ninth argument — those specifics existed because four filmed vignettes were supposed to supply them and cannot. v104 deleted that section. The play button remains in the hero, unlabelled, pointing at a modal containing four numbered vignettes for a film that has not been made.

**The design contract was: when the film lands, this copy shortens rather than gets replaced.** The voices stay, the descriptions go. That contract is now broken in the other direction — the descriptions went first.

**A judgement was recorded and never revisited:** the film reference should come out until the film exists. It did not come out. The caption was deleted in v101, which removed the *description* of the film while leaving the *control* that plays it.

---

## 2. HOMEPAGE COPY — THE FULL ITERATION ARC

Roughly a dozen versions across three sessions. Recorded so nothing gets re-proposed.

### The starting point (live in production today)

> **An unregulated nervous system is actively making poor life choices for you. Without your permission. *While making you think it's your personality.***
> So how much of your life did you actually choose?
> **SafeRise** — guided protocols for regulating the states that are hardest to get through, available in the moment you need them.
> WATCH THE FILM — FOUR PEOPLE, FOUR MOMENTS.
> **SURVIVAL, OR CHOICE** / None of them looked like the moment *your life changed.* / two paragraphs / pull-quote: *Triggered, everything you think, feel and decide can be wrong. For years.*
> **GETTING AUTHORSHIP BACK** / It doesn't stay in one part of your life. / *No course. No schedule. Nothing to install. Free to start.*

### Structural pivots, in order

1. **Three-speaker hero film concept** — third person throughout, deliberately. The reasoning: the reader watches three people rather than being told about themselves, which permits a strong claim without triggering resistance. Abandoned.
2. **"Same week, same person"** — Tuesday, Wednesday, Thursday as three versions of one person. Built, mocked at v99, abandoned.
3. **Andre: "let the existing copy dominate… improve it with the new version to enhance and provide credible narrative."** This is the instruction that governs everything after. New copy serves the existing structure rather than replacing it.
4. **Andre rewrote the H1 himself** and Claude flagged a grammar fault: *"...narrowing your choices for so long"* wants a completed span, against the ongoing *is narrowing*. Three fixes offered, one taken.
5. **20% word reduction** requested and applied.
6. **First-person quote hero** — the current form.
7. **Section deleted entirely** (v104), H2 replaced with the positioning statement (v105).

### Rejected headings — do not resurrect

| Line | Why |
|---|---|
| "None of them looked like the moment your life changed." | Abstract pronoun with no antecedent. Andre: *"None of 'them' is going back to that abstract wording again"* and later *"stop using abstract terms like 'none of it'."* This is now a standing rule for headings. |
| "It was never your personality." | Orphaned at both breakpoints — single word alone on the last line. |
| "You can't fix a temperament. You can regulate a state." | Explicitly disliked. The parallel-negation construction is the likely cause; avoid the shape, not just the words. |
| "You get to decide who arrives." | Explicitly disliked. |
| "The state came first. The name came later." | Explicitly disliked. |
| "A state that keeps repeating starts to look like a personality. It is still a state." | Replaced by the positioning statement in v105. |
| "And lost touch with reality." | Andre proposed adding it. Claude pushed back on two grounds: clinical psychosis language on a page carrying a scope-and-safety notice, and it overshoots the argument — narrowed options are not a break with reality. Andre dropped it. |

### Standing copy constraints established this session

- No paragraph may end with a single word alone on a line, at any breakpoint. Enforced by `check.py`, not by eye.
- No abstract pronoun placeholders in headings.
- Gold `<em>` clauses start their own line rather than continuing where white text ends. Implemented as `display:block`, not `<br>`.
- Word-count parity or reduction by default.
- Second person throughout, except the hero quote which is first person.

---

## 3. FLAGS RAISED AND NEVER ANSWERED

Four, in order of how much they matter.

**The hero quote is unattributed.** It sits over a photograph of a specific person. In quotation marks it reads as a testimonial from her. It is not one. Raised four separate times across two sessions; never answered. This matters more once money is being taken. An attribution line or a composite disclosure would close it.

**The play button has no label.** The caption that explained it was deleted in v101. It is now an orphaned gold ring in the middle of the hero. Compounded by §1 — it opens a modal describing a film that does not exist.

**"And affected my life" is the vaguest phrase on the page.** Raised twice. The defence was that the section below supplied the specifics. That section is now deleted, so nothing on the page is concrete above the door cards.

**The body paragraph beneath the v105 H2 is stranded.** "And it doesn't stay in one place" was written to follow a claim about states. Following a description of what SafeRise sells, "it" reads as the protocols. Same abstract-pronoun problem Andre banned in headings, arriving through a different door.

---

## 4. DECISION RATIONALE NOT RECORDED ELSEWHERE

**Payments — Paddle, not Stripe or Mollie.** Stripe does not support Sint Maarten. Mollie ruled out on research. Paddle selected as merchant of record, which moves EU VAT liability off Andre. CX Pay / Orco Bank downgraded from primary rail to a possible second provider, sitting behind an adapter at `js/saferise-pay.js` so the choice stays reversible.

**Refunds — 14 days, not 30.** Revised down to mirror Paddle's MSA §10.2 rather than write a policy the processor would not honour.

**Data residency — Supabase Frankfurt, eu-central-1.** Creates the hardest legal problem on the project: EU-resident data, Sint Maarten controller, no adequacy decision. Needs SCCs plus a transfer impact assessment, and needs a lawyer. This is not a form to fill in.

**Music — ElevenLabs Music, not Suno.** Suno ruled out after the Munich Regional Court / GEMA ruling in July 2026. Three beds cover all 31 protocols.

**Auth — server-side, not client-side.** The trigger was finding a live gating bypass at `protocol.html:1313`. Client-side gating on a single HTML file is not security, it is decoration.

**"Frequency" vocabulary carve-out.** The word is permitted in two narrow cases: describing physics, or declining a claim. Never as a benefit. This exists because the competitor segment sells frequency *as* the active ingredient, and SafeRise has to be able to answer "what frequencies do you use?" honestly rather than by silence. See `COPY-frequency-answer.md`.

**Music beds specify breathing pace, not mood.** "Make it calmer" is not a generation target and returns something different every time. The spec fixes 90 BPM in 3/4 — one bar equals two seconds — and assigns bar counts per state: Agitated 5 bars (2 in, 3 out), Unsteady 6 (3 in, 3 out), Numb 4 (2 in, 2 out, deliberately faster). Root around 41 Hz. The honest claim the rest of the category makes dishonestly: someone noticing their breathing has changed without deciding to is having a real experience, not a mystical one.

---

## 5. PUSHBACK GIVEN, AND WHY

Recorded because the pattern is part of the working relationship, not because the individual calls need revisiting.

- **"And lost touch with reality"** — refused on clinical-overreach grounds. Withdrawn.
- **The commit-and-push instruction** — commit accepted, push withheld, because Netlify deploys from `main` and Stage K was about to surface pricing copy contradicting the settled model. Deploy control stays with Andre.
- **The pricing premise** — Claude Code refused to resolve a conflict where the repo record was dated and signed and the brief's claim was not. That refusal was correct, and the brief was wrong to assert it.
- **The footer fallback** — Claude's own instruction, correctly executed, produced a navigation regression. Owned and reversed rather than defended.
- **The v105 duplicate** — the requested H2 replacement was already on the page as the hero positioning line. Flagged rather than silently shipping the same sentence twice.

---

## 6. ERRORS MADE, FOR PATTERN RECOGNITION

Four in two days, all the same shape: **asserting state without verifying it.**

1. `pass/HOMEPAGE-WEBP-PASS.md` reported as placed in the repo. It was not. Cost a round trip.
2. `pass/method-sections.txt` reported as possibly missing. It existed.
3. SR-084 described as covering the single-page architecture and a second content store. It covers neither — it is SR-077/SR-080 leftover content. Three problems filed under one ID across several passes.
4. Cover inventory given as 66 JPEGs. Actually 55 JPEG, 11 PNG, 33 WebP.

**The rule this produces:** never state repo contents without a `ls` or `grep` behind it, and never cite an SR ID without `git log --grep`.

There is a fifth, of a different kind: in the middle of this session Claude responded to a clear typed instruction by claiming it could not hear a voice note and proposing to start a fresh conversation. The instruction was legible and specific. It was recovered in the following turn.

---

## 7. WHAT THE SECTION DELETION COST, STATED PLAINLY

For the next chat to weigh, not to relitigate.

Deleting "survival, or choice" removed:
- The only place on the page where a reader recognises themselves — *"Quick-tempered. Anxious. Bad with criticism. I thought that was just who I am."*
- The specifics that cash the hero's abstract claims.
- The prose standing in for a film that does not exist (§1).
- The target the authorship H2 was written to answer.

What it bought: the door cards arrive 655px sooner at 1440.

The pull-quote is the strongest nineteen words on the page and does in nineteen what the two body paragraphs did in eighty. If any single line comes back, it is that one — and it could sit under the play button, where it would give that unlabelled control something to be about.
