# Dashboard page banners — artwork and copy

30 September 2026. Founder-supplied artwork and copy, transcribed from the
composed reference images.

---

## How these are built — read first

The reference images the founder supplied have their copy **baked into the
picture** at 2912px wide. Those are compositions to design from, not assets to
ship: at 375px that text renders around 6px tall and is unreadable, it cannot
be selected, translated or read aloud, and it cannot reflow.

**Ship the clean plate and set the copy in HTML over it**, exactly as
`/records` does. Every asset below is a clean plate at **2400 × 806**, the house
page-banner size, `.webp` with a `.jpg` beside it, in `assets/dashboard/`.

The copy below is transcribed from the composed references and is what goes in
the markup.

---

## N3 · "Out Loud" is the umbrella — one destination, three sections

Founder-ruled, 30 September. **SafeRise Out Loud is the name for all of it** —
podcast, articles and short form. Not three pages. One destination with three
sections inside it.

This replaces the earlier open question about combining Article and the podcast.
Add it to `NAMING-DECISIONS.md`.

### How the banners serve that

The Out Loud plate carries the destination itself, full height.

Each section keeps its own banner and its own copy, but shown as a **shorter
band** when a member opens that section — same artwork, same words, less height.
The effect is moving *within* one place rather than arriving somewhere new.

So of the seven banners: Out Loud is the page, Articles and Shorter form are
sections within it, and Ask, Live practice, FAQ and Build next are their own
destinations.

---

## The seven banners

### 1 · Ask SafeRise → `banner-ask`

| | |
|---|---|
| Kicker | ASK SAFERISE |
| Headline | What are you trying to understand? |
| Subhead | ASK THE QUESTION AS PLAINLY AS YOU CAN. |
| Body | About the method. A resource. A pattern you keep noticing. Something you heard on Out Loud. The question does not have to arrive polished. |
| Pull quote | *Start where the question actually is.* |
| Rail | ASK · RECENT ANSWERS · METHOD · PLATFORM · COMMUNITY QUESTIONS |

Subject: man in a colonnade, mid-walk, looking out.

### 2 · Shorter form → `banner-shorter-form`

| | |
|---|---|
| Kicker | SHORTER FORM |
| Headline | A thought worth carrying with you. |
| Body | Short observations, clips and reminders from across SafeRise.<br><br>Not everything needs a full protocol. Sometimes one sentence is enough to interrupt the pattern and give you another place to stand. |
| Pull quote | *Small enough to take with you.* |
| Rail | WATCH — Short video. · LISTEN — Audio and excerpts. · READ — Short observations. · SAVE — Keep what lands. · SHARE — Send something useful. |

Subject: man walking a waterfront at night, city behind, earphones in.

### 3 · Articles → `banner-articles`

| | |
|---|---|
| Kicker | READ A LITTLE FURTHER. |
| Headline | Some things need more than a caption. |
| Subhead | Ideas worth staying with for longer than a scroll. |
| Body | Essays, observations and practical thinking around the states, patterns and situations SafeRise is built for. Read what helps. Leave what does not. |
| Pull quote | *Take your time with this one.* |
| Rail | LATEST. · METHOD. · RELATIONSHIPS. · WORK & LEADERSHIP. · LIFE & LOAD. |

Subject: woman walking a museum gallery, camel coat.

### 4 · Live practice → **NO PLATE SUPPLIED**

| | |
|---|---|
| Kicker | LIVE PRACTICE |
| Headline | Do the work together. |
| Subhead | SAME METHOD. MORE PEOPLE IN THE ROOM. |
| Body | Join guided sessions and workshops when you want structure, live practice or the experience of moving through something alongside others. You still do your own work. Someone simply holds the pace. |
| Pull quote | *Practice can be shared without becoming less yours.* |
| Rail | LIVE PRACTICE — Join a guided session. · WORKSHOPS — Go deeper around one theme. · UPCOMING — See what is scheduled next. · REPLAYS — Return where a recording is available. · YOUR BOOKINGS — Everything you have reserved. |

Subject: man in a chair, laptop on a stand, evening interior.

**Blocked.** Only the composed version exists — the clean plate was not
supplied. Either the founder sends it, or this page keeps its current artwork
and the copy above is applied over that.

### 5 · Help and FAQ → `banner-faq`

| | |
|---|---|
| Kicker | WHEN YOU NEED CLARITY. |
| Headline | Questions are part of the process. |
| Subhead | You do not have to figure out the platform while you are trying to use it. |
| Body | How the method works. What each feature does. What stays private. Where to go when something does not behave the way you expected.<br><br>Start with the question you actually have. |
| Pull quote | *Clear enough to keep moving.* |
| Rail | GETTING STARTED — Accounts, access and first steps. · THE METHOD — Recognise, Regulate, Release, Rise. · YOUR PRIVACY — What is yours and what stays yours. · FEATURES — Guided, Sovereign and My Records. · TROUBLESHOOTING — When something is not working. |

Subject: woman seated by a window with a tablet, city at sunset.

**Check before shipping:** "YOUR PRIVACY — What is yours and what stays yours"
must agree with the reconciled privacy pages. A Sovereign session record with AI
feedback on does not stay on the device. Whatever sits behind that rail item is
held to the same standard as `privacy.html`.

### 6 · Build next → `banner-build-next`

| | |
|---|---|
| Kicker | WHAT SHOULD WE BUILD NEXT? |
| Headline | Help shape what comes next. |
| Subhead | You use the platform. Your friction matters. |
| Body | Vote on ideas already being considered, suggest something missing and see what has moved into development.<br><br>Popular does not automatically mean next — but every signal helps us make better decisions. |
| Pull quote | *Built closer to the people using it.* |
| Rail | VOTE NOW — Ideas currently under consideration. · SUGGEST — Tell us what is missing. · IN REVIEW — What we are exploring. · BUILDING — What has moved into development. · SHIPPED — What members helped shape. |

Subject: woman in an unfinished floor of a building, lake beyond.

### 7 · SafeRise Out Loud → `banner-out-loud`

| | |
|---|---|
| Kicker | CONVERSATIONS THAT GO SOMEWHERE |
| Headline | SafeRise *Out Loud* — "Out Loud" in italic gold, "SafeRise" in ivory |
| Subhead | Say the thing underneath the thing. |
| Body | Conversations about pressure, relationships, identity, work, desire, responsibility and the private experiences people often carry without language.<br><br>Not interviews for performance. Conversations for recognition. |
| Pull quote | *Real conversations. A more human tomorrow.* |
| Rail | LATEST EPISODE — Start with the newest conversation. · PEOPLE — Guests and perspectives. · THEMES — Find the conversations that meet you. · CLIPS — Short moments worth keeping. · JOIN IN — Questions from the SafeRise community. |

Subject: a podcast studio at night, two microphones, ON AIR sign. No people.

### 8 · The private seat and pricing sheet → `banner-org-pricing`

Founder-assigned from the spare plate. Subject: woman standing at a window with
a tablet, warm interior. No copy supplied — it takes the page's existing
headings.

---

## What does not exist yet

**Out Loud** replaces the current Article and The SafeRise podcast rail entries
with one entry and three sections. That is a restructure of surfaces that exist.

**Ask SafeRise** and **Build next** are genuinely new — no page, no route, no
rail entry. Build next is a voting and roadmap feature, not a banner with a list
under it. Each needs its own pass; neither should be built from this document
alone.

## Standing rule · privacy copy is held to the same standard everywhere

Founder-ruled, 30 September: **always update privacy copy to reflect the truth.**
Not only on the legal pages.

Any surface that describes what stays private — the FAQ's "YOUR PRIVACY" section,
Out Loud, Start Here, a banner line, a tooltip — is held to exactly the standard
`privacy.html` is held to. The three claims, as reconciled:

- the member's voice is never sent anywhere
- what they type stays on their device
- a Sovereign session record with AI feedback on is sent to Anthropic to be read,
  is never used to train anything, and can be switched off

Anything that says or implies otherwise is a defect, whoever wrote it and however
long it has been there. Report it rather than leaving it.

## Unchanged

`organisations.html` keeps its existing banner — founder-ruled, 30 September.
