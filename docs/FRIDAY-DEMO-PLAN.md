# SafeRise — Friday Demo Plan

**Tuesday 8 → Thursday 11 September · Track 01 only**
Target: Dwight walks the full path — homepage → track → protocol → resource →
guided meditation — and nothing breaks in front of him.

---

## The one thing that decides this

**Track 01 protocols do not open. Only Anxiety Reset works.**

Dwight clicks Anger Alchemy and gets Anxiety Reset, or nothing. That ends the
tour at minute three and no amount of good content recovers it.
`pass/PASS-track01-routing.md` is queued and unrun. **It runs first, before
anything else, tonight.**

Everything below assumes that is fixed.

---

## Tuesday · after the nap · ~4 hours

### 1 · Routing pass — Claude Code, ~1 hour
Run `pass/PASS-track01-routing.md`. My read is still that
`FREE_TRACK_PREFIX = 't1-'` is being compared as a full identifier rather than a
prefix, which would gate nine of ten protocols invisibly — a gate with no lock
state looks exactly like a broken link.

**Then walk it yourself.** Open all ten. Do not take the report's word for it.

### 2 · Push — 5 minutes
Five commits are local: `4ac1dbd` through `fde2b05`, plus whatever tonight adds.
Production does not have The Decision, the download-control fix, or the wired
credentials. **If the demo is on the live site, none of it exists until you
push.**

### 3 · Delete the placeholder testimonial — 5 minutes
LG-44. A fabricated endorsement on a live page, and Dwight is exactly the kind of
person who reads testimonials. It is a delete, not a project.

### 4 · Start recording — 2–3 hours
**Foundation Protocol first, then Anxiety Reset.** Those two carry the demo.

Chain is already set: −19 LUFS mono, −1 dBTP, EBU R128 two-pass.

⚠ **Do not attempt all eleven before Friday.** Eleven recordings is six to eight
hours of studio time plus mastering, and it would eat the whole week. Four is
enough to demonstrate the product; eleven is enough to ship, and shipping is not
Friday.

---

## Wednesday · full day

### Morning — recording, 3–4 hours
Protocols 02, 03 and 04. That gives you four recorded plus Foundation — enough
that Dwight can open several protocols and hear real audio in each.

### Afternoon — Claude Code, in parallel with your recording

**Auth loop pass** — `pass/PASS-auth-loop.md`. Confirmation redirect and password
reset. The Supabase project is live now, so it can verify end to end rather than
producing a checklist. Needs Brevo SMTP in place first.

**Brevo SMTP into Supabase** — 15 minutes, yours. SMTP & API → SMTP, into
Project Settings → Authentication → SMTP Settings. **Flip Enable Custom SMTP** or
it silently stays on the built-in sender.

**Porkbun email forwarding** — 5 minutes. `contact@` → `andrerobley@live.com`.
It is in the footer, Terms, Privacy and Refunds and currently bounces.

### Late afternoon — the demo walk
Sign up as a new member with a real address. Receive the confirmation. Follow it.
Land signed in. Open a protocol. Play the audio. **Write down every seam.**

That list is Thursday's work.

---

## Thursday · full day

### Morning — fix the seams
Whatever Wednesday's walk turned up. Reserve the whole morning; something always
appears that nobody predicted.

### Midday — the two new surfaces
**Dashboard banner mockup** and **streaming page mockup**. Both are for showing
direction rather than shipping — Dwight is a collaborator, and seeing where it is
going matters as much as seeing what works. Scope for the streaming page is in
§ below.

### Afternoon — rehearse it
Walk the full path twice, start to finish, out loud. Not to check it works — to
find where *you* hesitate. Every hesitation is either a defect or a place the
story needs a sentence.

**Decide what you are not showing.** Tracks 02 and 03 have no audio. The coming
soon page still has old cards unless the track-boxes pass runs. Elevation is
unwritten. Naming those as roadmap is strong; being caught by them is not.

---

## What is deliberately not in this plan

**Track-boxes redesign.** Nice, not load-bearing. Run it if Thursday is calm.

**Tracks 02 and 03 audio.** Twenty more recordings. Not Friday.

**The reflection capture for The Decision.** Mockup exists, build does not. The
content reads well without it; the input is a Dwight conversation, not a demo
requirement.

**Anything on the roadmap.** Elevation, Intimacy, Executive Presence — all
prospectus-complete and none of it is Friday's problem.

---

## Priority order if the week compresses

1. Routing fixed — **without this there is no demo**
2. Push
3. Testimonial deleted
4. Foundation + Anxiety Reset recorded
5. Brevo SMTP + email forwarding
6. Two or three more recordings
7. Auth loop
8. Banner and streaming mockups
9. Track-boxes redesign

**Stop at 5 and you still have a demo.** Stop at 3 and you have a slideshow.

---

# Streaming page — scope

**Working name: The Signal.** *(Alternatives: Broadcast, The Room, Off Protocol.)*

## What it is

The one surface where SafeRise speaks in a voice that is not a protocol.
Everything else on the platform is instructional and second-person. This is
where the podcast, editorial and community material live — and where someone can
spend time with SafeRise without doing any work.

**Why it matters commercially:** protocols are used in crisis and put away.
Retention comes from a reason to return when nothing is wrong. That reason cannot
be another protocol.

## Four content types

**Podcast.** Episode list, player, show notes, guests. The Disciplined Man is the
first show; the architecture should assume more than one from day one.

**Editorial.** Written pieces that are not protocols — the founder's account, the
philosophy material, market observations, things that would otherwise be a
newsletter.

**Sessions.** Recorded live sessions, workshop excerpts, Q&A. Bridges into the
live-sessions offer without duplicating it.

**Community.** The lightest and the last. Member questions answered publicly,
recurring patterns named, a place where the population sees itself. **No forum,
no comments, no user-to-user contact for now** — moderation is a staffing
commitment nobody has.

## What it must not become

**Not a blog.** Dated posts nobody reads twice. Everything here is
evergreen-first, timestamped second.

**Not a marketing surface.** The moment it sells, it stops being the reason
someone returns.

**Not a second homepage.** It serves existing members and warm visitors, not
acquisition.

## Structural questions to settle before design

1. **Public, member-only, or mixed?** Mixed is likeliest — podcast public for
   reach, editorial and sessions behind sign-in. That also makes it a genuine
   reason to create a free account.
2. **Does it carry the pangolin, or its own identity?** It is the least
   protocol-like surface on the platform.
3. **Where does it live in the nav?** Currently Protocols, Method, Plans, Live
   sessions, About. This is a sixth item and the nav is already at capacity.
4. **Who produces it, and how often?** An empty streaming page is worse than no
   streaming page. What is the minimum cadence that can actually be held.
5. **Does Dwight's podcast sit here or at its own domain?** This is a Friday
   conversation and worth going in with a view.

## Minimum viable for Friday

**A single mockup, not a build.** One page showing: a featured episode with a
player, three or four episode cards beneath, an editorial strip, and a sessions
row. Placeholder content throughout, clearly marked.

Enough for Dwight to see where his podcast lands and what it would sit alongside.
Enough for you to have the cadence conversation with something concrete on the
screen.

---

## What I can build while you sleep is nothing — but next

Say the word and I will produce, in this order:

1. **Dashboard banner mockup** — the sliding strip at the top of the dashboard
2. **Streaming page mockup** — The Signal, per the scope above

Both as standalone HTML you can open, same treatment as the coming-soon cards.
