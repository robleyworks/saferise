# Launch list — investor-presentable and beta-open by 30 September

**Sixteen days from 14 September.** Everything below is what stands between today
and two things: a site you can show a financier for the first $5,000, and one you
can put in front of real users.

⚠ **These are two different bars and only one of them is hard.** A financier needs
the site to be coherent and the story to be checkable. Beta users need it to
actually work. **Build for the second and the first comes free.**

---

## Block A · Blockers — nothing ships without these

### A1 · Payment rail

**Paddle seller approval.** Outside your control and the longest lead time on this
list.

- [ ] Application submitted — **if not done, today**
- [ ] Webhook verified: `Paddle-Signature`, raw body, `ts:body`, 5s tolerance,
      idempotent
- [ ] One real end-to-end transaction, start to receipt
- [ ] Refund path tested once

⚠ **The free tier launches without it.** If approval slips, beta still opens — you
lose the conversion number, not the beta.

### A2 · Accounts and access

- [ ] Sign-up, log-in, password reset, all verified end to end
- [ ] The free track genuinely free with an account — no card, no countdown
- [ ] Track 02/03 gated correctly against a paid account
- [ ] **A real person who is not you completes sign-up unaided**

### A3 · Legal and compliance

- [ ] Terms, Privacy, Refunds — drafted and reviewed
- [ ] **Consent banner live.** Required now Wistia analytics are on
- [ ] Scope-and-safety text consistent everywhere it appears
- [ ] Entity, invoicing and VAT registration in place

### A4 · Indexing

- [ ] **`noindex` removed** from the public pages — currently nobody can find any
      of this
- [ ] `sitemap.xml` correct. **`tools/check-sitemap.py` already found two
      divergences** — `/organisations` and `/pricing` missing, 30 `/protocols/*`
      URLs the generator cannot produce
- [ ] Canonicals correct after the `/pricing` → `/plans` consolidation

---

## Block B · Audio — the long pole

**31 protocols × 2 voices = 62 renders.** This is the single largest piece of work
on the list and it sits on the critical path for the beta.

### B1 · Resolve the tone-break first

⚠ **Do not start production until this is solved.** `build_protocol.py` renders each
passage separately, so the model has no context across seams and tone lurches
between passages. **ElevenLabs Studio — one continuous performance with gaps placed
on a timeline afterwards — is the likely fix and is untested.**

- [ ] Test Studio on one full protocol, both voices
- [ ] Compare against the current per-passage output
- [ ] **Decide before rendering 62 files the wrong way**

### B2 · Production

- [ ] SR-F `fbmnBhl0AKROCH04b4hT` · SR-M `7DhKLMri1c2Bkve4m7Ro`
- [ ] Loudness: **stereo, −16.0 LUFS integrated, −1.0 dBTP** (SR-378)
- [ ] Music beds — **one per state**, four in total, **none generated yet**
- [ ] Trim t1-05 Shame Dissolution, currently ~1,738 words against a ~850 average.
      **Do not voice until trimmed**
- [ ] Decide Clearing's length against the shortest-session requirement — it runs
      ~12 minutes against a written claim to be the platform's shortest

⚠ **Realistic scope for 16 days:** one voice complete across all 31, the second
following. **A beta with one voice is fine. A beta with half the protocols is not.**

### B3 · Voice toggle in the players

- [ ] Toggle in the audio player, male/female
- [ ] Toggle in the video player
- [ ] **Choice persists across protocols and sessions** — nobody wants to set it
      31 times
- [ ] Falls back gracefully when only one voice exists for a protocol
- [ ] Keyboard accessible, labelled for screen readers
- [ ] **Does not restart playback** when switched mid-session — or if it must,
      resumes at the same timestamp

---

## Block C · The pages a financier will open

They will click through the site while you talk. These have to hold.

- [ ] **Homepage** — video complete and playing
- [ ] **`/plans`** — SR-386 done; verify the €19/€190 model reads correctly and
      `/pricing` redirects
- [ ] **Three track pages** — SR-383/384 done; verify hero, rail and cards live
- [ ] **`/method`** — five images still missing per the earlier audit
- [ ] **`/team`** — ⚠ **does not exist.** Carries the founder account plus the
      whole team. **The most visible gap on the list** — a financier will look for
      who is behind this and there is nowhere to send them. Spec in
      `PAGES-team-and-podcast.md`
- [ ] Three team portraits sourced — Kirsten, Aleksandra, Dwight. **Ask each person, do not generate them**
- [ ] `/about` — decide whether it redirects to `/team`, becomes the platform's
      story with no people on it, or retires
- [ ] `/podcast` — **only if episodes exist.** An empty podcast page is worse than
      no podcast page
- [ ] **`/organisations`** — pricing bands live, tabs working
- [ ] **`/coming-soon`** — Sleep & Recovery added, counts reconciled

---

## Block D · Imagery

- [ ] **Nine beach/sunset images** replaced across all three cover sets
- [ ] **Five corporate-stiff** Professional Performance covers replaced
- [ ] `hero-film.webp` — subject erased under the scrim; replace or re-scrim
- [ ] **Track page banners run full-bleed** — currently inset, unlike every other
      page
- [ ] Repetition swept: no repeated face, hair, outfit or setting

⚠ **Not all of this is needed for the 30th.** For a financier, the beach images are
the ones that matter — they undercut the positioning in a way a busy image does
not. **Do those; defer the rest.**

---

## Block E · Beta mechanics

- [ ] **Instrumentation live before the first user.** Signup source · first protocol
      opened · **second protocol opened and when** · free→paid with days-to-convert ·
      tier chosen · cancellation with tenure
- [ ] Feedback route that is not an email address — one link, one box
- [ ] A way to contact beta users as a group
- [ ] Known-issues page or a line you can send when something breaks
- [ ] **Decide the cohort size.** 20 people you can actually talk to beats 200 you
      cannot

⚠ **This is measurement, not member-facing progress tracking.** Nothing here goes
on a screen a user sees.

---

## Block F · The financier conversation

- [ ] Deck final — 41 slides, forecast figures replaced with yours
- [ ] Financial model — **actual cash spent to date still blank**
- [ ] One-page overview to leave behind
- [ ] Founder salary decided. **They will ask**
- [ ] A number for month six you are willing to be held to

---

## The sixteen-day shape

| | |
|---|---|
| **Days 1–2** | Paddle submitted. **Audio tone-break tested and decided. Team portraits requested** — this is the item with real-world lead time. Founder account written |
| **Days 3–7** | Audio production, voice one. Legal pages. Voice toggle built |
| **Days 8–11** | Audio voice one completes. Beach images replaced. `noindex` off. Instrumentation live |
| **Days 12–14** | End-to-end testing by someone who is not you. Voice two begins |
| **Days 15–16** | Beta cohort invited. First financier conversation |

---

## What to cut if the days run out

**In this order:**

1. Voice two — ship with one, add the second in October
2. Everything in Block D except the beach images
3. The podcast page — a growth asset, not a launch requirement
4. `/coming-soon` Sleep & Recovery — it is a roadmap page
5. The video toggle, if the audio toggle works

**What cannot be cut:** payment or free-tier access, legal pages, the consent
banner, **the team page**, instrumentation, and the tone-break decision.

---

## The two honest risks

**The audio.** 62 renders in 16 days with an unresolved pipeline problem, alongside
a full-time job. **If Studio does not solve the seam problem in the first two days,
the beta opens with one voice and fewer protocols — decide that early rather than
discovering it on the 28th.**

**The team page.** It does not exist, and it carries the founder account — the
platform's strongest asset. Three portraits need asking for, which takes real-world
days you do not control. **Ask for them today, write the founder account this
week.**
