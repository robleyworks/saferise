/* ════════════════════════════════════════════════════════════════════════
   SafeRise — content/t1-resources.js
   Track 01's authored resources. SR-192.

   One file per track, beside tracks.js, same `var` + module.exports shape, read
   synchronously. Chosen over inlining into index.html (which is already 10,552
   lines and cannot cache separately) and over per-protocol lazy files (which
   would make the Reader's synchronous reads asynchronous). SR-188 carries the
   comparison.

   GENERATED, NOT AUTHORED. Every string here is transformed from the Track 01
   content handover markdown. Correct the source and re-run the transform —
   editing this file by hand puts it out of agreement with the record.

   ── TWO MAPPINGS LIVE HERE, AND NEITHER SIDE GETS RENAMED ──

   1. THE KEY NAMESPACES DISAGREE, DELIBERATELY. META in tracks.js keys Track 01
      as `t1-01`…`t1-10`. The Reader keys the same ten as `p1`…`p10`. Both are
      load-bearing and neither is wrong. T1_PROTOCOL_KEYS below is the single
      place that mapping is written down. Same defect class SR-177 solved for
      `distance` → method-kross.html: where a key and its counterpart are
      different words, every consumer that re-derives the mapping by hand is a
      place it can go wrong.

   2. THE CONDITIONAL IS `invitation` IN THE DATA AND `-repair` IN THE KEY.
      META[].extras records `'invitation'`; CONDITIONAL_RESOURCES maps the
      display name *Invitation to Repair* → `'invitation'`; the served key is
      `p2-repair`. T1_RESOURCE_SUFFIX below records it. Do not rename either.

   ── CUES ARE DATA AND MUST NEVER RENDER ──

   Every resource carries `cues[]`: the illustration, music, pause, breath and
   action markers from the authored scripts, each anchored to the body block it
   preceded. These are production direction for the recording and art lanes, not
   member-facing copy. They are kept rather than stripped because they are the
   only link between the shipped copy and those lanes — the same principle
   CLAUDE.md sets for the original protocol descriptions, which stay in the data
   and stay off the card. A surface that renders `cues` is a defect.

   NO DURATIONS, NO COUNTS, NO POSITION. Nothing in this file carries a length,
   an ordinal out of a total, or a progress value, and nothing added to it may.
   ════════════════════════════════════════════════════════════════════════ */

/* Display name → key suffix. Recorded, never derived. */
var T1_RESOURCE_SUFFIX = {
    "Guided Meditation": "meditation",
    "Cue Card": "crisiscard",
    "How This Works": "guide",
    "Somatic Release Activities": "companion",
    "Safe Practice": "practice",
    "Proximity Guide": "advisory",
    "Disclosure & Support": "disclosure",
    "Invitation to Repair": "repair",
    "Your Record": "record",
    "Accountability & Empathy": "accountability"
  };

/* META key → Reader key, and the Reader key's ordered resource manifest.
   `keys` is the served order; a protocol carrying neither conditional simply
   has a shorter list. Never hardcode its length. */
var T1_PROTOCOL_KEYS = {
  "t1-01": { reader: "p1", keys: ["p1-meditation", "p1-crisiscard", "p1-guide", "p1-companion", "p1-practice", "p1-disclosure", "p1-record", "p1-accountability"] },
  "t1-02": { reader: "p2", keys: ["p2-meditation", "p2-crisiscard", "p2-guide", "p2-companion", "p2-practice", "p2-advisory", "p2-disclosure", "p2-repair", "p2-record", "p2-accountability"] },
  "t1-03": { reader: "p3", keys: ["p3-meditation", "p3-crisiscard", "p3-guide", "p3-companion", "p3-practice", "p3-advisory", "p3-disclosure", "p3-record", "p3-accountability"] },
  "t1-04": { reader: "p4", keys: ["p4-meditation", "p4-crisiscard", "p4-guide", "p4-companion", "p4-practice", "p4-advisory", "p4-disclosure", "p4-repair", "p4-record", "p4-accountability"] },
  "t1-05": { reader: "p5", keys: ["p5-meditation", "p5-crisiscard", "p5-guide", "p5-companion", "p5-practice", "p5-disclosure", "p5-record", "p5-accountability"] },
  "t1-06": { reader: "p6", keys: ["p6-meditation", "p6-crisiscard", "p6-guide", "p6-companion", "p6-practice", "p6-disclosure", "p6-record", "p6-accountability"] },
  "t1-07": { reader: "p7", keys: ["p7-meditation", "p7-crisiscard", "p7-guide", "p7-companion", "p7-practice", "p7-disclosure", "p7-record", "p7-accountability"] },
  "t1-08": { reader: "p8", keys: ["p8-meditation", "p8-crisiscard", "p8-guide", "p8-companion", "p8-practice", "p8-advisory", "p8-disclosure", "p8-repair", "p8-record", "p8-accountability"] },
  "t1-09": { reader: "p9", keys: ["p9-meditation", "p9-crisiscard", "p9-guide", "p9-companion", "p9-practice", "p9-advisory", "p9-disclosure", "p9-repair", "p9-record", "p9-accountability"] },
  "t1-10": { reader: "p10", keys: ["p10-meditation", "p10-crisiscard", "p10-guide", "p10-companion", "p10-practice", "p10-advisory", "p10-disclosure", "p10-record", "p10-accountability"] }
};

var T1_RESOURCES = {
  "p1-meditation": {
    kind: "Guided Meditation", title: "Guided Meditation", sub: "Do it with me.",
    body: [
      "<p>Settle where you are. You don't need to sit any particular way. If your eyes want to close, let them. If they don't, find one spot on the floor and leave them there.</p>",
      "<p>Something is running fast. We're going at it in four moves. You don't have to remember them \u2014 I'll take you through.</p>",
      "<h4>Recognition</h4>",
      "<p>Somewhere in your body there's a signal. Find where it's loudest.</p>",
      "<p>Chest. Throat. Stomach. Jaw. Behind the eyes. There's no correct location.</p>",
      "<p>Now say what it is, in one word. Not a story about it. One word for the state.</p>",
      "<p><strong>Agitated.</strong> Your body has moved into a fast state. That's all the word has to carry.</p>",
      "<p>Notice you just did something. You were inside it, and for a second you were also looking at it. Both at once.</p>",
      "<p>That second is the thing everything else here is built on.</p>",
      "<h4>Regulation</h4>",
      "<p>Now the breath. The count matters more than the size.</p>",
      "<p>Four counts in.</p>",
      "<p>Six counts out. Longer out than in. Every time.</p>",
      "<p>Don't pull for a big breath. A big breath asks for effort, and effort is the wrong direction. Small is fine. Long is what matters.</p>",
      "<p>Attention into the middle of your chest. Not the count \u2014 that keeps going on its own.</p>",
      "<p>If a hand there helps, put one there.</p>",
      "<p>Nothing to do but this.</p>",
      "<h4>Release</h4>",
      "<p>Something in you is fighting the fact that this is happening. Not the situation \u2014 the state itself. It sounds like <em>not now</em>, or <em>not again</em>, or <em>what is wrong with me</em>.</p>",
      "<p>That second thing costs more than the first.</p>",
      "<p>The state is here. It arrived. You're not being asked to want it, or approve of it. Only to stop spending force on the fact that it came.</p>",
      "<p>Try a different question. Instead of <em>what is wrong with me</em> \u2014</p>",
      "<p><strong>What was this for?</strong></p>",
      "<p>Your body has a fast state because a fast state is useful. It runs ahead of thought, which is the point of it. It doesn't check with you first.</p>",
      "<p>Don't answer now. Let it sit there in place of the other one.</p>",
      "<p>What you decide to do about any of it is separate, and it comes easier from here.</p>",
      "<h4>Rise</h4>",
      "<p>Step outside it.</p>",
      "<p>Picture yourself from a little way off. Across the room. Not close up.</p>",
      "<p>There's a person there, breathing four and six. Talk to them the way you'd talk to someone else. Use <em>you</em>.</p>",
      "<p><em>You are having a fast day. You've had these before.</em></p>",
      "<p>Stay out there a moment. The distance does its own work.</p>",
      "<p>Now forward. Not a wish \u2014 one concrete thing. Later today, somewhere specific, doing something specific, in this steadier state.</p>",
      "<p>Where are you. What's in your hands. Who's there, or nobody. What's the first thing you say.</p>",
      "<p>Detail is what makes this work. A general hope does nothing.</p>",
      "<p>And one thing already true, before you come back. Small is better than large. The chair. The light. That you stopped and did this.</p>",
      "<p>Come back when you're ready. Feet on the floor.</p>",
      "<p>You may feel different. You may not. Either is ordinary and neither is a verdict.</p>",
      "<p>The four are yours now. Recognition. Regulation. Release. Rise. You can run them without me, anywhere, with your eyes open.</p>"
    ],
    cues: [{"block": 0, "type": "PURPLE/MUSIC", "note": "bed in, 90 BPM, 3/4. Five-bar phrase. Turn at four seconds."}, {"block": 1, "type": "GOLD/PAUSE", "note": ""}, {"block": 4, "type": "GOLD/PAUSE", "note": ""}, {"block": 6, "type": "BLUE/ILLUSTRATION", "note": "a single word settling onto a still surface. No ripple."}, {"block": 7, "type": "GOLD/PAUSE", "note": ""}, {"block": 12, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 12, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 13, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 13, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 14, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 14, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 15, "type": "RED/ACTION", "note": "hand to centre of chest, flat, light. Offered, not instructed."}, {"block": 16, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 16, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 16, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 16, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 17, "type": "GOLD/PAUSE", "note": "extended"}, {"block": 19, "type": "GOLD/PAUSE", "note": ""}, {"block": 21, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 21, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 23, "type": "GOLD/PAUSE", "note": "long"}, {"block": 25, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 25, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 29, "type": "BLUE/ILLUSTRATION", "note": "figure at middle distance, room around it, unhurried."}, {"block": 31, "type": "GOLD/PAUSE", "note": ""}, {"block": 32, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 32, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 34, "type": "GOLD/PAUSE", "note": "long"}, {"block": 35, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 35, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 36, "type": "GOLD/PAUSE", "note": ""}, {"block": 36, "type": "PURPLE/MUSIC", "note": "bed lifts, resolves on the turn."}]
  },
  "p1-crisiscard": {
    kind: "Cue Card", title: "Cue Card", sub: "Do it yourself.",
    body: [
      "<blockquote>Second person throughout \u2014 deliberate, not stylistic.</blockquote>",
      "<h4>Front</h4>",
      "<p class=\"sr-cue-line\"><strong>Name it</strong> \u2014 <em>You are agitated.</em> One word. No verdict.</p>",
      "<p class=\"sr-cue-line\"><strong>Breathe it</strong> \u2014 Four in, six out. Attention on your chest.</p>",
      "<p class=\"sr-cue-line\"><strong>Stop fighting it</strong> \u2014 Ask <em>what was this for</em>, not <em>what's wrong with me</em>.</p>",
      "<p class=\"sr-cue-line\"><strong>Step out</strong> \u2014 See yourself from across the room. Say <em>you</em>.</p>",
      "<h4>Back</h4>",
      "<p><strong>Recognition</strong> \u2014 Find where it's loudest in your body. Name the state in one word. Notice you can see it while you're inside it. That noticing is the faculty everything else runs on.</p>",
      "<p><strong>Regulation</strong> \u2014 Four counts in, six counts out. Longer out than in, every time. Small breath is fine \u2014 a big one asks for effort and effort points the wrong way. Attention in the centre of your chest. Hand there if it helps. Keep going past where you'd normally stop.</p>",
      "<p><strong>Release</strong> \u2014 The state is one thing. Fighting the state is a second thing, and it costs more. Let the fact of it stand. Change the question to <em>what was this for</em> and leave it unanswered. What you do about it is separate, and comes later.</p>",
      "<p><strong>Rise</strong> \u2014 See yourself from a distance. Address yourself as <em>you</em>. Then one concrete scene, later today: where, what's in your hands, first thing you say. Detail, not hope. Then one thing already here.</p>"
    ],
    cues: []
  },
  "p1-guide": {
    kind: "How This Works", title: "How This Works", sub: "*What the fast state is*",
    body: [
      "<p>Before you have a thought about a situation, your body has already read it. That reading happens below awareness and runs faster than deliberation \u2014 it had to, because it evolved for situations where waiting to think was expensive.</p>",
      "<p>In that state the body does specific things. Heart rate rises. Breathing goes shallow and fast and moves up into the chest. Blood shifts toward large muscle. Attention narrows and scans. Digestion slows, which is why the stomach is one of the common places to feel it.</p>",
      "<p>None of that is malfunction. It's a working system doing its job.</p>",
      "<p><strong>Why Recognition comes first</strong></p>",
      "<p>The rest needs a subject. Naming a state in plain specific language does something describing it at length does not: it puts a small distance between you and the state while you are still inside it. That gap is where the next three steps operate. Without it there's nothing to work on, only weather.</p>",
      "<p><strong>Why the exhale is longer than the inhale</strong></p>",
      "<p>You can't decide your heart rate down. You can decide your breathing, and it's the one reachable control on a system you otherwise can't get at. The exhale is where the work happens \u2014 lengthening the out-breath relative to the in-breath is the part that shifts the system toward settled.</p>",
      "<p>Which is why the count is uneven, and why a bigger breath isn't a better one. Pulling hard for volume recruits effort, and effort points the other way.</p>",
      "<p><strong>Why Release addresses the second problem</strong></p>",
      "<p>The state turned up on its own. Then a second thing started: fighting the fact that it's here. <em>Not now. Not again. What's wrong with me.</em></p>",
      "<p>Those are two different costs, and the second one is usually bigger. It's also the only one you can do anything about. Setting it down doesn't mean you're fine with the state. It means you stop spending yourself on the fact that it turned up.</p>",
      "<p>The question changes for the same reason. <em>What is wrong with me</em> asks about defect and returns answers about defect. <em>What was this for</em> asks about function and returns something you can use.</p>",
      "<p><strong>Why Rise is fourth</strong></p>",
      "<p>Distance is available once the system has settled, and not much before. The forward rehearsal has one condition: it has to be concrete. Specific detailed scenes change outlook; general optimism doesn't.</p>",
      "<h4>What we rest on</h4>",
      "<p><strong>Polyvagal Theory \u2014 Stephen Porges</strong> \u00b7 <em>peer-reviewed</em> \u00b7 supplies Recognition and the three state labels</p>",
      "<p>Threat detection runs ahead of thought. The body reads a situation and moves before deliberation catches up, which is what makes the response fast and also what makes it non-negotiable in the moment. Porges describes three broad conditions: settled and socially available, mobilised for action, and shut down. Agitated, Unsteady and Numb are the member-facing names for those three. <em>Here it names the fast state without attaching a verdict to it.</em></p>",
      "<p><em>The anatomical premises are contested: a 2026 evaluation in</em> Clinical Neuropsychiatry <em>challenged them, with Porges replying in the same issue. The state distinctions are what this platform uses, and they hold independently of that dispute.</em></p>",
      "<p><strong>Cardiac coherence \u2014 HeartMath</strong> \u00b7 <em>peer-reviewed</em> \u00b7 supplies Regulation and the count</p>",
      "<p>At roughly six breath cycles a minute, heart rhythm and breath settle into a single smooth wave rather than two competing ones, close to a rhythm the body's blood-pressure regulation already runs at. Four in, six out lands near that rate. The uneven ratio is the mechanism. <em>Here it is the whole of the second step, and the reason a small breath beats a large one.</em></p>",
      "<p><em>The finding is used here; the wider programme is not. There is no measurement of coherence anywhere on this platform and no score attached to any breath.</em></p>",
      "<p><strong>Where the reading is yours</strong> \u2014 this explains the machinery. What any of it means about you, your history or your life is a reading that belongs to you.</p>"
    ],
    cues: []
  },
  "p1-companion": {
    kind: "Somatic Release Activities", title: "Somatic Release Activities", sub: "Between sessions.",
    body: [
      "<p><strong>Long exhale, no ceremony.</strong> Four in, six out, three or four cycles. Eyes open, mid-conversation. Nobody can see you doing it.</p>",
      "<p><strong>Weight into the chair.</strong> Push your feet gently into the floor and let the chair take you, for a slow count of ten. The body treats supported and unsupported differently and stops noticing support unless attention is sent there.</p>",
      "<p><strong>Hand to sternum.</strong> Flat hand, centre of the chest, light. Contact and warmth at that spot is one of the quickest available signals of the settled state.</p>",
      "<p><strong>Unclench the jaw, drop the shoulders.</strong> Teeth apart, tongue off the roof of the mouth, shoulders down away from the ears. It creeps back. Do it again.</p>",
      "<p><strong>Walk, and count something.</strong> Lamp posts, red cars, doors. Not thinking while walking \u2014 counting while walking. The counting is what makes it different.</p>",
      "<p><strong>Name three things in the room.</strong> Something you can see, something you can hear, something you can feel against your skin. Recognition, applied outward.</p>",
      "<p><em>Cool water on the wrists at a sink also works. Comfortable, not shocking.</em></p>"
    ],
    cues: []
  },
  "p1-practice": {
    kind: "Safe Practice", title: "Safe Practice", sub: "*What this practice does*",
    body: [
      "<p>Works with a fast state while it's happening, using breath, attention and observation. You run it on your own, at the moment you need it, without booking anything or telling anyone.</p>",
      "<p><strong>Pacing</strong></p>",
      "<p>Once through is a complete use. Use it when the state is there rather than to a schedule. If four and six is a stretch, shorten both and keep the ratio uneven \u2014 three and five works, two and four works. The relationship between the counts is the mechanism, not the numbers.</p>",
      "<p><strong>What people commonly notice</strong></p>",
      "<p>Tingling in the hands or face during the breathing, which comes from breathing more evenly than usual and passes. Yawning, or a sigh arriving on its own. Feeling more of the state before less, particularly at Release, because you've stopped pushing against it. Tiredness afterwards. Or nothing much, which is also an ordinary result and not a sign you did it wrong.</p>",
      "<p><strong>When to slow down</strong></p>",
      "<p>If the breathing itself makes you feel worse \u2014 lightheaded, more panicked \u2014 stop counting and let your breath do whatever it does. Focusing on the breath increases alarm in some people rather than settling it. Use Recognition and Rise on their own and leave the count out. The protocol still works with three moves.</p>",
      "<p>If Release opens something much larger than the day's state \u2014 a memory, a grief you weren't looking for \u2014 you can stop there. Surfacing isn't an instruction to follow it.</p>",
      "<p><strong>When a person in the room is the right tool</strong></p>",
      "<p>Some states need another human being, and no self-guided practice substitutes for one. Contact someone today \u2014 a doctor, a crisis line in your country, or a person you trust \u2014 if you're having thoughts of harming yourself, if the fast state doesn't let up over days rather than hours, if you're avoiding leaving the house, or if you're using something to get through it.</p>",
      "<p><strong>Alongside other support</strong></p>",
      "<p>If you're already working with a therapist, doctor or counsellor, this sits alongside that. It replaces nothing and competes with nothing. Tell them you're using it \u2014 most will want to know, and some will have views about the breathing worth hearing.</p>"
    ],
    cues: []
  },
  "p1-disclosure": {
    kind: "Disclosure & Support", title: "Disclosure & Support", sub: "A script for someone close.",
    body: [
      "<p>Take these exactly, or change every word.</p>",
      "<p><strong>Saying it</strong> &gt; \"I get a thing where my body goes into a fast state \u2014 heart, breathing, everything speeds up. It's happening a fair bit at the moment. I wanted you to know so it isn't a mystery if you see it.\"</p>",
      "<p><strong>Describing what it's actually like</strong></p>",
      "<p>Most people name the mood and not the body, so the other person hears worry rather than a description. The body is the part that makes it land.</p>",
      "<blockquote>\"It's physical before it's anything else. Chest goes tight, breathing goes shallow and high up, stomach turns over. My attention narrows down and starts scanning. All of that happens before I've had a thought about anything.\"</blockquote>",
      "<blockquote>\"The part that's hard to explain is that it often has no subject. People assume there's a thing I'm worried about. Sometimes there is. Often the state arrives first and then goes looking for something to be about.\"</blockquote>",
      "<p><strong>How to tell it's coming</strong></p>",
      "<blockquote>\"There are signs before I feel it. I start checking things. My sentences get shorter. I go still in a way that isn't calm, or I can't sit down at all.\"</blockquote>",
      "<blockquote>\"If you notice that, something simple helps \u2014 not 'what's wrong', just 'do you want to go outside'. Earlier is much easier than later.\"</blockquote>",
      "<p><strong>What helps</strong></p>",
      "<blockquote>\"Stay nearby without making it an event. Being in the same room doing something else is genuinely better than being asked about it.\"</blockquote>",
      "<blockquote>\"Offer the specific thing rather than asking what I need \u2014 a walk, some air, leaving where we are. I usually can't answer an open question while it's happening.\"</blockquote>",
      "<p><strong>What doesn't</strong></p>",
      "<blockquote>\"Being told to calm down, or asked what's wrong when I don't have an answer yet. Not your fault \u2014 the question needs a reason and I often haven't got one.\"</blockquote>",
      "<p><strong>If they ask what you're doing about it</strong></p>",
      "<p>The version with parts in it is more reassuring than the vague one.</p>",
      "<blockquote>\"I run a method when it starts. Four steps. First I name the state instead of the story \u2014 that alone puts a bit of distance in. Then a breathing pattern, four counts in and six out, which is the part that brings the physical side down. Then I stop fighting the fact that it's happening, which is a separate cost from the thing itself. Then I look at it from across the room and pick one concrete thing to do next.\"</blockquote>",
      "<blockquote>\"There's more than the session. A card with the four steps for when there's no time to think, a few physical things for in between, and something I write in afterwards.\"</blockquote>",
      "<p><em>Tell one person. It doesn't have to be the closest person, and it can be a professional rather than a friend. States like this get heavier in proportion to how privately they're carried.</em></p>"
    ],
    cues: []
  },
  "p1-record": {
    kind: "Your Record", title: "Your Record", sub: "What changed, in your words.",
    body: [
      "<p>Written on your device and kept there. Your account, in your language, for you to read back \u2014 nobody else sees it, and it's never measured against anything you wrote before.</p>",
      "<p>Any of these, or none.</p>",
      "<p>- Where in your body was it loudest? - What word did you use? The accurate one, or the nearest to hand? - What was happening in the hour before it started? - At Release, what did the resistance actually sound like? Write the sentence it used. - <em>What was this for</em> \u2014 what turned up, without needing to answer it? - What did you say to yourself from across the room? - What was the concrete scene? Has any of it happened since? - What did you write here last time? Read it back.</p>"
    ],
    cues: []
  },
  "p1-accountability": {
    kind: "Accountability & Empathy", title: "Accountability & Empathy", sub: "What it does outside you.",
    body: [
      "<p>The protocol trains the interior half of the state. The other half exits \u2014 into a room, a tone, a silence, something you did or didn't do \u2014 and lands somewhere you can't see from where you're standing.</p>",
      "<p><strong>The specific blind spot here</strong> \u2014 anxiety mostly exits as absence. Cancelling. Not replying. Being physically present and clearly elsewhere. Leaving early. From inside, each of those is a small private management decision. From outside, they read as disinterest, and they accumulate. Nobody tells you, because the polite reading of a cancelled plan is to say it's fine.</p>",
      "<p><strong>Their earlier information</strong> \u2014 people close to you often see the onset before you feel it. That makes them a genuine instrument, and worth asking directly: <em>what do you see, before I know?</em></p>",
      "<p><strong>Naming the act, not the character</strong> \u2014 <em>\"I cancelled on you three times and didn't explain why\"</em> is ownership. <em>\"I'm a terrible friend\"</em> is not; it names nothing and asks them to disagree with it.</p>",
      "<p><strong>No because.</strong> The state is a real reason and it still doesn't belong in the sentence. It can be said afterwards, if they ask.</p>",
      "<p><strong>No self-attack.</strong> <em>\"I'm so sorry, I'm useless\"</em> moves the burden across \u2014 now they're managing your distress about the thing. Self-attack is <em>what is wrong with me</em> wearing the clothes of accountability; it returns nothing usable.</p>",
      "<p><strong>Describe what was observable, ask about the rest.</strong> You don't know their interior. <em>\"I've cancelled a lot lately. I'm not going to tell you what that's been like \u2014 I'd rather you told me.\"</em> The asking is how the information arrives.</p>",
      "<p><strong>The checkable change</strong> \u2014 anxiety repairs by saying the true short thing at the time rather than explaining later. <em>\"I'm not going to make it, and it isn't about you\"</em> sent on the day is worth more than a full account a week on.</p>",
      "<p><strong>Where this stops</strong> \u2014 a reaction is information about the exterior of your state. It isn't a verdict on you, and someone else's account of you isn't automatically more accurate than your own. What you find when you look is yours to read.</p>"
    ],
    cues: []
  },
  "p2-meditation": {
    kind: "Guided Meditation", title: "Guided Meditation", sub: "Do it with me.",
    body: [
      "<p>Sit or stand, whichever your body wants. Anger often doesn't want to sit. If standing is what's available, stand.</p>",
      "<p>This works on the anger while it's here, and it leaves your position exactly where you're holding it. You're not being asked to let it go, be bigger than it, or see the other side.</p>",
      "<h4>Recognition</h4>",
      "<p>Find it in your body, before any of the words about it.</p>",
      "<p>Jaw. Hands. Back of the neck. Heat across the chest or the face. Find where it's loudest.</p>",
      "<p>Now name the state. One word. <strong>Agitated.</strong></p>",
      "<p>Notice what that word leaves out. It leaves out who. What they did. Whether you're right.</p>",
      "<p>You're probably right. That isn't what this step is for. It separates the state from the case, because right now they're welded together.</p>",
      "<p>The case can wait. It'll still be there, intact, with all its evidence.</p>",
      "<h4>Regulation</h4>",
      "<p>Four counts in.</p>",
      "<p>Six counts out. Longer out than in.</p>",
      "<p>Anger wants a sharp breath. Short in, hard out. Don't follow it.</p>",
      "<p>Attention into the centre of your chest. Not the jaw. Not the hands.</p>",
      "<p>If your hands are closed, open them.</p>",
      "<p>It may come up before it comes down. Keep counting.</p>",
      "<h4>Release</h4>",
      "<p>Here's the part that costs the most, and it isn't the anger.</p>",
      "<p>It's the rehearsal. The conversation you're having with them in your head, where you say the thing and they answer and you answer better. You've run it several times. Each time lands the body back where it started.</p>",
      "<p>The anger arrived on its own. The rerun you're doing, without deciding to.</p>",
      "<p>Let the anger stand. It's here, it's yours, nobody's taking it off you.</p>",
      "<p>Set down the rerun. Only the rerun. Not the position.</p>",
      "<p>And the question. Not <em>what's wrong with me for being this angry.</em> That returns nothing you can use.</p>",
      "<p><strong>What was this for?</strong></p>",
      "<p>Anger moves toward. It shows up where something is being crossed, and it mobilises you to meet it. On its own terms it's competent.</p>",
      "<p>Understanding what it was doing doesn't excuse anyone. It doesn't drop the charge.</p>",
      "<h4>Rise</h4>",
      "<p>Step outside it.</p>",
      "<p>See yourself from across the room. Someone standing there, jaw set, running a conversation for the fifth time.</p>",
      "<p>Speak to them as <em>you</em>.</p>",
      "<p><em>You are angry, and you have a reason.</em></p>",
      "<p>Both halves. Neither cancels the other.</p>",
      "<p>Now forward. Not the confrontation where you win. The version where you're steady and it still matters to you.</p>",
      "<p>Where are you. What's your voice doing. What's the first sentence \u2014 the actual words. What do your hands do while you say it.</p>",
      "<p>Detail. A general intention to handle it well does nothing.</p>",
      "<p>And one thing already true, before you come back. Small. Not gratitude for the situation \u2014 nobody's asking that.</p>",
      "<p>Come back. Feet on the floor. Hands open.</p>",
      "<p>The anger may still be here. If it is, that's the right result \u2014 it was never the target. What you have now is a decision to make about it, from somewhere steadier than where you were standing.</p>",
      "<p>Recognition. Regulation. Release. Rise. Yours.</p>"
    ],
    cues: [{"block": 0, "type": "PURPLE/MUSIC", "note": "bed in, 90 BPM, 3/4. Five-bar phrase. Turn at four seconds."}, {"block": 1, "type": "GOLD/PAUSE", "note": ""}, {"block": 4, "type": "GOLD/PAUSE", "note": ""}, {"block": 5, "type": "BLUE/ILLUSTRATION", "note": "heat rendered as light, contained, not spreading."}, {"block": 6, "type": "GOLD/PAUSE", "note": ""}, {"block": 8, "type": "GOLD/PAUSE", "note": ""}, {"block": 11, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 11, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 12, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 12, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 13, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 13, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 14, "type": "RED/ACTION", "note": "hands unclench. Offered, not instructed."}, {"block": 15, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 15, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 15, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 15, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 16, "type": "GOLD/PAUSE", "note": "extended"}, {"block": 18, "type": "GOLD/PAUSE", "note": ""}, {"block": 20, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 20, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 22, "type": "GOLD/PAUSE", "note": "long"}, {"block": 24, "type": "GOLD/PAUSE", "note": "long"}, {"block": 25, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 25, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 26, "type": "GOLD/PAUSE", "note": ""}, {"block": 29, "type": "BLUE/ILLUSTRATION", "note": "figure at middle distance, room around it, unhurried."}, {"block": 31, "type": "GOLD/PAUSE", "note": ""}, {"block": 32, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 32, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 34, "type": "GOLD/PAUSE", "note": "long"}, {"block": 35, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 35, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 36, "type": "GOLD/PAUSE", "note": ""}, {"block": 36, "type": "PURPLE/MUSIC", "note": "bed lifts, resolves on the turn."}]
  },
  "p2-crisiscard": {
    kind: "Cue Card", title: "Cue Card", sub: "Do it yourself.",
    body: [
      "<blockquote>Second person throughout \u2014 deliberate, not stylistic.</blockquote>",
      "<h4>Front</h4>",
      "<p class=\"sr-cue-line\"><strong>Name it</strong> \u2014 <em>You are agitated.</em> The state, not the case.</p>",
      "<p class=\"sr-cue-line\"><strong>Breathe it</strong> \u2014 Four in, six out. Hands open.</p>",
      "<p class=\"sr-cue-line\"><strong>Drop the rerun</strong> \u2014 Not the position. Ask <em>what was this for</em>.</p>",
      "<p class=\"sr-cue-line\"><strong>Step out</strong> \u2014 <em>You are angry, and you have a reason.</em></p>",
      "<h4>Back</h4>",
      "<p><strong>Recognition</strong> \u2014 Find it in your body before you find words for it. Jaw, hands, neck, chest. Name the state in one word. Keep who and what they did out of it \u2014 you can be entirely right and this step still isn't about that. The case waits. It doesn't spoil.</p>",
      "<p><strong>Regulation</strong> \u2014 Four in, six out. Anger wants short and sharp; go the other way. Attention in the centre of your chest, not the jaw or the hands. Open your hands. If it rises before it settles, keep counting.</p>",
      "<p><strong>Release</strong> \u2014 Two things are running. The anger, which arrived on its own. And the rerun, where you get the line right. The rerun is the expensive one and the one you have a say in. Set down the rerun. Keep the anger. Keep the position. Ask <em>what was this for</em> and leave it open.</p>",
      "<p><strong>Rise</strong> \u2014 See yourself from a distance. <em>You are angry, and you have a reason.</em> Both. Then one concrete scene: your actual words, your voice, your hands. Not the version where you win.</p>"
    ],
    cues: []
  },
  "p2-guide": {
    kind: "How This Works", title: "How This Works", sub: "*What the state is doing*",
    body: [
      "<p>Anger is a mobilised state with a feature that distinguishes it from fear: it moves toward rather than away. Fear pulls you back from the thing. Anger sends you at it.</p>",
      "<p>In the body \u2014 raised heart rate, blood toward the large muscles and the hands, faster shallower breathing, heat in the face and chest, tension gathering in jaw and grip. Attention narrows onto the source and holds there. That narrowing is the point of the state: it stops you being distracted from what it has identified as needing dealing with.</p>",
      "<p>All of it happens before you have decided anything.</p>",
      "<p><strong>Why Recognition leaves the person out</strong></p>",
      "<p>Two things arrive fused \u2014 a physiological condition, and an evaluation of what happened. The evaluation may be entirely accurate. But while they are welded, settling the body feels like conceding the position, which is why people stay lit. Splitting them lets you bring the state down without giving up anything, then look at the case with a system that is no longer narrowed.</p>",
      "<p><strong>Why the exhale is longer than the inhale</strong></p>",
      "<p>You cannot decide your heart rate down. You can decide your breathing, and it is the one reachable control on a system that otherwise runs without consulting you. Anger pushes toward the opposite pattern \u2014 short in, hard out, or held breath entirely. Going deliberately against that pattern is most of this step.</p>",
      "<p><strong>Why Release targets the rerun</strong></p>",
      "<p>The anger turned up once. The argument in your head is a different thing \u2014 you're running that one, again and again, getting your line better each time.</p>",
      "<p>It feels like getting ready. It isn't. Nothing comes out of it, and every run puts your body back where it started.</p>",
      "<p><strong>Why Rise uses distance before it uses the future</strong></p>",
      "<p>Distance does what intensity alone will not. The forward scene then has to be concrete: detail transfers, general intention does not.</p>",
      "<h4>What we rest on</h4>",
      "<p><strong>Polyvagal Theory \u2014 Stephen Porges</strong> \u00b7 <em>peer-reviewed</em> \u00b7 supplies Recognition and the three state labels</p>",
      "<p>Threat detection runs ahead of thought. The body reads a situation and moves before deliberation catches up, which is what makes the response fast and also what makes it non-negotiable in the moment. Porges describes three broad conditions: settled and socially available, mobilised for action, and shut down. Agitated, Unsteady and Numb are the member-facing names for those three. <em>Here it distinguishes anger from fear \u2014 both are mobilised, but anger moves toward rather than away.</em></p>",
      "<p><em>The anatomical premises are contested: a 2026 evaluation in</em> Clinical Neuropsychiatry <em>challenged them, with Porges replying in the same issue. The state distinctions are what this platform uses, and they hold independently of that dispute.</em></p>",
      "<p><strong>Compassionate Inquiry \u2014 Gabor Mat\u00e9</strong> \u00b7 <em>clinical practice</em> \u00b7 supplies Release and its register</p>",
      "<p>A response is treated as an adaptation rather than a defect \u2014 something that was doing a job, whether or not it is still the right job. The register of the question decides the answer: <em>what is wrong with me</em> asks about defect and returns answers about defect; <em>what was this for</em> asks about function and returns something workable. Understanding is not endorsement, of the response or of anyone's behaviour. <em>Here it is what lets you understand what the anger was protecting without dropping the charge.</em></p>",
      "<p><em>A clinical practice, not a controlled research programme. Used here for the register of the question and nothing wider.</em></p>",
      "<p><strong>Where the reading is yours</strong> \u2014 this explains the machinery. What your anger means, and what to do about it, is a reading that belongs to you.</p>"
    ],
    cues: []
  },
  "p2-companion": {
    kind: "Somatic Release Activities", title: "Somatic Release Activities", sub: "Between sessions.",
    body: [
      "<p><strong>Open the hands.</strong> Spread the fingers wide, hold, let them go soft. Anger closes the grip constantly, which gives you constant chances.</p>",
      "<p><strong>Unclench the jaw.</strong> Teeth apart, tongue off the roof of the mouth, lower face heavy. It creeps back quickly. Do it again.</p>",
      "<p><strong>Push against something immovable.</strong> Palms flat to a wall or the underside of a desk. Steady firm pressure for a slow five, then release completely and let the arms hang.</p>",
      "<p><strong>Walk it, with a destination.</strong> Anger is an approach state \u2014 give it approach. A specific door, a specific corner, brisk. Arrive. Stop. Then breathe.</p>",
      "<p><strong>Shoulders down and back.</strong> Blades gently together, then sliding down away from the ears. Anger rides high in the shoulders and the position feeds it.</p>",
      "<p><strong>Say it out loud, once, alone.</strong> The actual thing you want to say. Once is discharge. Twice is rehearsal, which is what the protocol asks you to set down.</p>",
      "<p><em>Four in, six out is always available \u2014 eyes open, in the room, nobody watching.</em></p>"
    ],
    cues: []
  },
  "p2-practice": {
    kind: "Safe Practice", title: "Safe Practice", sub: "*What this practice does*",
    body: [
      "<p>Works with anger while it is present, using breath, attention and observation. Leaves your position, your grievance and your judgement of what happened intact.</p>",
      "<p><strong>Pacing</strong></p>",
      "<p>Once through is a complete use. Use it when the state is there. If four and six is a stretch, shorten both and keep the ratio uneven \u2014 three and five works, two and four works. The relationship between the counts is the mechanism, not the specific numbers.</p>",
      "<p><strong>What people commonly notice</strong></p>",
      "<p>Anger rising rather than falling during the breathing, particularly early on. Heat becoming more noticeable before it becomes less. Tiredness afterwards, sometimes considerable \u2014 mobilised states are expensive and the bill arrives when they end. Tears, in some people, which surprises them and means nothing in particular. Or very little, which is also an ordinary result.</p>",
      "<p><strong>When to slow down</strong></p>",
      "<p>If Release opens something much larger than today's anger, you can stop there and come back to the breath. Surfacing is not an instruction to follow it.</p>",
      "<p>If working with the anger makes you feel you might act on it, stop and change your physical situation instead. Leave the room. Go outside. The protocol is not the priority in that moment.</p>",
      "<p><strong>Where violence is anywhere in the picture</strong></p>",
      "<p>If your anger has become violent \u2014 if you have hurt someone, damaged things, or you are worried you might \u2014 that needs a person rather than a protocol, and it needs one now. Speak to a doctor, or to a helpline for people concerned about their own behaviour. Most countries have one and it exists for exactly this call. Making it is not an admission of anything and it is the single most effective move available.</p>",
      "<p>If someone is being violent toward you, this protocol is a way to steady yourself in it. It is not a way to manage them, and it is not a substitute for getting out of range. Your safety is a separate question from your regulation and it comes first.</p>",
      "<p><strong>When a person in the room is the right tool</strong></p>",
      "<p>Contact someone today \u2014 a doctor, a helpline in your country, or a person you trust \u2014 if you are frightening yourself with the intensity of it, if anger is arriving with no identifiable trigger and staying for days, if you are using something to manage it, or if you are having thoughts of harming yourself.</p>",
      "<p><strong>Alongside other support</strong></p>",
      "<p>If you are with a therapist, doctor or counsellor, this sits alongside that and replaces nothing. Tell them you are using it.</p>"
    ],
    cues: []
  },
  "p2-advisory": {
    kind: "Proximity Guide", title: "Proximity Guide", sub: "How close to stay.",
    body: [
      "<p>Some anger has a live external source that keeps supplying it. Where that is the case, how much contact you have is a real variable \u2014 and one you have more say over than you have over the state.</p>",
      "<p>Three tiers. Which one anything belongs in is your read, on information nobody here has.</p>",
      "<p><strong>Worth staying engaged with</strong></p>",
      "<p>The difficulty is real but the relationship can hold it. There is a version of the conversation you have not yet had. Behaviour changes when it is named. Your anger tends to be proportionate to the event and settles once the event is dealt with.</p>",
      "<p>Distance is not the tool here. The conversation is, and the protocol is what makes you fit to have it. The Invitation to Repair on this protocol is written for exactly this tier.</p>",
      "<p><strong>Worth taking some distance from</strong></p>",
      "<p>Contact reliably produces the state, and the conversation has been had more than once without changing anything. Your anger consistently exceeds the event.</p>",
      "<p>That surplus is worth attending to \u2014 when a reaction outruns its occasion, the excess is carrying information about something other than the event. An interpretive lens rather than a finding, and what it shows you is yours to read.</p>",
      "<p>Distance here is rarely all-or-nothing. More often it is specific: fewer occasions, shorter ones, ones you can leave, ones with other people present, topics you decline. Reducing the surface area is a real option and it is not the same as ending anything.</p>",
      "<p><strong>Past what self-regulation is for</strong></p>",
      "<p>Where you are being threatened, intimidated, controlled or harmed. Where you are frightened of someone.</p>",
      "<p>This is not a regulation problem, and treating it as one has a cost. A practice will help you think clearly inside it and will not change it. What this needs is other people \u2014 a doctor, a lawyer, a union, a helpline, a friend who knows the whole picture rather than the version you can bear to tell.</p>",
      "<p><strong>Using this</strong></p>",
      "<p>Notice the tier. Then notice whether it is the tier you would assign if a friend described the same thing. That is the exercise. Where it goes next is yours \u2014 nobody here knows what you would be giving up.</p>"
    ],
    cues: []
  },
  "p2-disclosure": {
    kind: "Disclosure & Support", title: "Disclosure & Support", sub: "A script for someone close.",
    body: [
      "<p>Take these exactly, or change every word.</p>",
      "<p><strong>Saying it</strong> &gt; \"I've been carrying a lot of anger lately. Not at you. I'd rather you knew what you were seeing than guessed at it.\"</p>",
      "<p><strong>Describing what it's actually like</strong></p>",
      "<p>Most people can name the mood and not the body, so the other person hears a complaint rather than a description. The body is the part that makes it land.</p>",
      "<blockquote>\"It's physical before it's anything else. My jaw goes tight, my hands close up, there's heat across my chest and face. My attention narrows down onto one thing and won't move off it. That's all happening before I've decided anything about it.\"</blockquote>",
      "<blockquote>\"The bit that's hardest to explain is the loop. I end up running the same argument in my head over and over, getting my line better each time. It feels like I'm preparing. I'm not \u2014 I'm just putting myself back through it.\"</blockquote>",
      "<p><strong>How to tell it's coming</strong></p>",
      "<p>Worth saying out loud, because the other person often sees the early signs before you feel them.</p>",
      "<blockquote>\"There are signs before it arrives. My replies get shorter. I stop asking you things. I go quiet in a way that isn't relaxed. My jaw sets and I start moving faster than the situation needs.\"</blockquote>",
      "<blockquote>\"If you spot that and say something simple \u2014 not 'what's wrong', just 'you've gone quiet, do you want a minute' \u2014 that's usually enough to catch it. Earlier is much easier than later.\"</blockquote>",
      "<p><strong>What helps while it's happening</strong></p>",
      "<blockquote>\"A bit of room, without it becoming a thing. If I go outside for a bit, I'm not storming off \u2014 I'm doing something that works. I'll come back.\"</blockquote>",
      "<blockquote>\"Stay nearby without needing it to be a conversation. Being in the same room, doing something else, is genuinely better than being asked about it.\"</blockquote>",
      "<blockquote>\"If you want to offer something concrete \u2014 a walk, going outside, getting out of the room we're in \u2014 say the specific thing rather than asking what I need. I usually can't answer that one while it's happening.\"</blockquote>",
      "<p><strong>What doesn't</strong></p>",
      "<blockquote>\"Being told to calm down does the opposite, every time. And being asked what's wrong while it's still happening \u2014 I can't answer that yet, but I can afterwards, and I will.\"</blockquote>",
      "<blockquote>\"Following me into the other room. If I've taken myself out of the room, that's the method working, not me shutting you out.\"</blockquote>",
      "<p><strong>When the anger is about them</strong> &gt; \"I'm angry with you about something. I don't want to get into it while I'm still this lit, because I'll say it badly and then we'll be dealing with how I said it. Can we do it tomorrow? I'm not going anywhere.\"</p>",
      "<p><strong>If they ask what you're doing about it</strong></p>",
      "<p>The honest version is more reassuring than the vague one, because it describes something with parts rather than an intention.</p>",
      "<blockquote>\"I've got a method I run when it starts. Four steps. First I name the state instead of the argument \u2014 that separates my body being lit from whether I'm right about the thing. Then a breathing pattern, four counts in and six out, which is the part that actually brings the physical side down. Then I stop replaying the argument, without dropping my position on it. Then I look at the whole thing from a bit of distance and work out what I'm actually going to do.\"</blockquote>",
      "<blockquote>\"It doesn't make me not angry. It makes me able to decide what to do about being angry. That was the part I was missing.\"</blockquote>",
      "<blockquote>\"There's more than the session. I've got a card I keep on me with the four steps for when there's no time to think. A few physical things for the days in between \u2014 opening my hands, unclenching my jaw, walking somewhere with a purpose. And something I write in afterwards, which is mostly how I've noticed the loop is the same one every time.\"</blockquote>",
      "<p><strong>If someone is frightened of you</strong></p>",
      "<p>No script for this one. Say the true thing plainly, do not explain it, then get a professional involved: &gt; \"I've frightened you. I'm sorry. I'm going to get proper help with this, not just manage it myself.\"</p>",
      "<p>Then do that, today.</p>",
      "<p><em>Tell one person. It can be a professional rather than a friend. Anger kept entirely private finds its own exits, and the exits it finds are worse than the telling.</em></p>"
    ],
    cues: []
  },
  "p2-repair": {
    kind: "Invitation to Repair", title: "Invitation to Repair", sub: "Reopening it with them.",
    body: [
      "<p>Send it from the far side of the protocol, not the middle. An invitation written from inside the state reads as an opening move in a case, and gets answered as one.</p>",
      "<p><strong>The rule that makes it sendable:</strong> no prosecution of them. Not a soft one either \u2014 no <em>I've been reflecting and I've realised what you did</em>. The moment it contains a charge it stops being an invitation, and they will read it correctly and defend accordingly. You are not conceding by leaving the charge out. You are declining to open with it.</p>",
      "<p><strong>Sendable</strong> &gt; Hi \u2014 I've been sitting with what happened and I don't want to leave it where it is. &gt; &gt; I'm not writing to relitigate it. I've got my version and I imagine you've got yours, and I don't think trading them gets us anywhere useful. &gt; &gt; What I'd like is to talk, without either of us arriving with a position. No rush and no pressure. If you'd rather not, or not yet, I'll take that.</p>",
      "<p><strong>Shorter</strong> &gt; I don't want to leave this where it is. Can we talk \u2014 not to settle who was right, just to talk?</p>",
      "<p><strong>Where you did the damage</strong> &gt; I've been thinking about how I was with you. I'm not going to explain it, because an explanation is a defence and that isn't what I want to hand you. I'd like to hear what it was like on your end, and to say sorry properly rather than in passing.</p>",
      "<p><strong>Before sending</strong> \u2014 read it back for a case in disguise. <em>Always, never, actually, to be fair, I've realised.</em> Cut them. Then check what you are expecting back: if a slow reply would anger you, it is early. An invitation with a required answer is not one.</p>",
      "<p><em>If they don't take it, you have done the part that was yours. Whether they meet it is theirs, and always was.</em></p>"
    ],
    cues: []
  },
  "p2-record": {
    kind: "Your Record", title: "Your Record", sub: "What changed, in your words.",
    body: [
      "<p>Written on your device and kept there. Your account, in your language, for you to read back \u2014 nobody else sees it, and it is never measured against anything you wrote before.</p>",
      "<p>Reading your own words back is the most direct version of the distance the fourth step trains.</p>",
      "<p>Any of these, or none.</p>",
      "<p>- Where did it sit in your body? - What was the rerun? Write the line you kept getting right. - How many times had you run it before you noticed you were running it? - What was actually crossed? Not who \u2014 what. - <em>What was this for</em> \u2014 what came up, without needing to answer it? - What did you say to yourself from across the room? - Is this the same anger as last time, or a different one wearing the same clothes? - What did you write here last time? Read it back.</p>"
    ],
    cues: []
  },
  "p2-accountability": {
    kind: "Accountability & Empathy", title: "Accountability & Empathy", sub: "What it does outside you.",
    body: [
      "<p>The protocol trains the interior half of the state. The other half exits \u2014 into a room, a tone, a silence, something you did or didn't do \u2014 and lands somewhere you can't see from where you're standing.</p>",
      "<p><strong>The specific blind spot here</strong> \u2014 anger's exterior is the one people misjudge by the widest margin. Volume feels normal from inside. Your face feels neutral. And the rerun you've been running is silent, so what arrives on the other side has no build-up attached to it. From where you stand it was the sixth round of an argument. From where they stand it was the first, and it was sudden.</p>",
      "<p><strong>Their earlier information</strong> \u2014 people close to you can usually see it coming before you feel it. That makes them a real early-warning instrument, and it's worth asking directly: <em>what do you see, before I know?</em></p>",
      "<p><strong>Naming the act, not the character</strong> \u2014 <em>\"I raised my voice at you on Sunday, in front of the kids\"</em> is ownership. <em>\"I've been a nightmare lately\"</em> is not; it names nothing and quietly asks them to disagree with it. Pick the act they'd name if someone asked them.</p>",
      "<blockquote>\"I said the thing about your job. I knew where it would land and I said it anyway.\" \"I walked out mid-conversation and didn't come back.\"</blockquote>",
      "<p><strong>No because.</strong> Anger arrives with an unusually complete case attached, and the case is what wants to go into the sentence. You may be entirely right about the underlying thing. It still has no place here. Two conversations, not one.</p>",
      "<p><strong>No self-attack.</strong> <em>\"I've got a problem, I'm sorry, I'm working on it\"</em> said with enough distress asks them to reassure you about your anger. That's a lot to ask of the person it arrived at.</p>",
      "<p><strong>Describe what was observable, ask about the rest.</strong> You don't know their interior, and asserting it puts words in their mouth. <em>\"You went very still. I don't want to guess what that was like \u2014 I'd rather hear it.\"</em> Then let them answer without correcting it.</p>",
      "<p><strong>The checkable change</strong> \u2014 anger repairs by leaving earlier, not by leaving better. <em>\"I'm going to go outside when it starts, before it gets loud\"</em> is small, specific and something they can watch for. <em>\"I'll never do that again\"</em> isn't.</p>",
      "<p><strong>Where this stops</strong> \u2014 a reaction is information about the exterior of your state, not a verdict on you. Someone else's account of you isn't automatically more accurate than your own. And if someone is being violent or controlling toward you, this isn't the resource for that situation \u2014 the Proximity Guide's third tier is, and your safety is a separate question from your regulation.</p>"
    ],
    cues: []
  },
  "p3-meditation": {
    kind: "Guided Meditation", title: "Guided Meditation", sub: "Do it with me.",
    body: [
      "<p>Before anything else \u2014 is there too much coming in right now? Noise, light, screens, people talking.</p>",
      "<p>If there is, deal with that first. Go somewhere quieter. Turn something off. Put headphones on. That isn't skipping the practice \u2014 when too much is coming in, turning the input down <em>is</em> the practice, and everything after this works better once you have.</p>",
      "<p>You don't have time for this. That's the state talking, and it says the same thing every time.</p>",
      "<p>Sit anyway. Nothing to arrange. Eyes closed if they'll close, or one spot on the floor if they won't.</p>",
      "<p>This works on the state, which is the part that's actually reachable right now. Your list stays your list \u2014 sorting it is a separate job, and it goes better from the far side of this one.</p>",
      "<h4>Recognition</h4>",
      "<p>Find where it is in your body, before any of the words about it.</p>",
      "<p>Chest, usually. Tightness across the top. Sometimes the throat. Sometimes a lightness in the head, or a hum through the arms with nowhere to go.</p>",
      "<p>Now name the state. One word. <strong>Agitated.</strong></p>",
      "<p>Notice what that word leaves out. The list. The deadline. The person waiting. The thing you forgot.</p>",
      "<p>Overwhelm feels like a fact about how much there is. In the body it's a state \u2014 and the state and the volume are two different things. Related. Not the same. They come apart.</p>",
      "<p>Now one sorting question. It takes a second. Too much of <em>what</em>?</p>",
      "<p>Too much to do \u2014 the list, the deadlines, the people waiting.</p>",
      "<p>Too much coming in \u2014 noise, light, people, screens.</p>",
      "<p>Or too much at once inside you \u2014 angry and frightened and sad, all live, and no way to pick one.</p>",
      "<p>No wrong answer, and some days it's all three. The reason for asking comes at the third step.</p>",
      "<p>And if the honest answer is <em>I don't know, I just can't tell what's wrong with me today</em> \u2014 that is a real answer, and it's the third one. Not being able to pick is what several things at once feels like from inside.</p>",
      "<p>The load is real. Nobody's telling you it isn't. It just isn't what we're working on right now.</p>",
      "<h4>Regulation</h4>",
      "<p>Four counts in.</p>",
      "<p>Six counts out. Longer out than in.</p>",
      "<p>Overwhelm breathes high and fast, up at the top of the chest. We're going the other way.</p>",
      "<p>Attention into the centre of your chest. Not the list.</p>",
      "<p>The list will interrupt. That's what it does. When it does, you haven't failed at this \u2014 you've noticed, which is the whole skill. Come back to the count.</p>",
      "<p>Press your feet into the floor. Feel the floor push back.</p>",
      "<p>There's nothing you could do about any of it in the next minute anyway.</p>",
      "<h4>Release</h4>",
      "<p>Two things are running, and only one of them is the load.</p>",
      "<p>The first is that there's genuinely a lot. That one's real and it isn't going anywhere.</p>",
      "<p>The second is something you're doing \u2014 and which one depends on your answer a moment ago.</p>",
      "<p>Too much to do: you're going round the list. Checking it, then checking it again, touching everything and starting nothing. Each pass tells you what you already knew.</p>",
      "<p>Too much coming in: you're pushing through. Carrying on as though the noise and the light weren't landing. Holding a normal face on. Spending everything on looking fine.</p>",
      "<p>Too much at once inside you: you're sorting. Trying to work out which feeling to deal with first, as though there were an order, and getting nowhere because there isn't one.</p>",
      "<p>Different in each case. The same in the way that matters \u2014 it's the expensive one, it doesn't finish, and it's the one you can put down.</p>",
      "<p>Let the amount be the amount. It isn't being denied and it isn't being minimised.</p>",
      "<p>Set down the scanning. Only the scanning.</p>",
      "<p>And the question. Not <em>what's wrong with me that I can't cope with this</em> \u2014 that returns nothing usable, and it may not even be the right question. The volume might be genuinely unreasonable.</p>",
      "<p><strong>What was this for?</strong></p>",
      "<p>The state came up because something registered as more than could be met. That's a system doing its job, loudly, with no way to reduce the input.</p>",
      "<p>Don't answer it. Just have that question in the room instead of the other one.</p>",
      "<h4>Rise</h4>",
      "<p>Step outside it.</p>",
      "<p>Picture yourself from a little way off. Someone with a great deal on, breathing four and six.</p>",
      "<p>Speak to them as <em>you</em>.</p>",
      "<p><em>You have a lot on. It is a lot. And you are steadier now than when you sat down.</em></p>",
      "<p>Now forward, and small. Not the version where it's all done \u2014 that scene isn't available and building it would be a lie.</p>",
      "<p>One thing. The next thing. Where are you, what's in front of you, what's the first movement you make.</p>",
      "<p>Not the most important one. Not the one you're most behind on. The next one.</p>",
      "<p>And one thing already handled. Something on the pile that's done, or was never as bad as it looked, or is somebody else's now.</p>",
      "<p>Come back. Feet on the floor.</p>",
      "<p>The load hasn't changed. It was never going to, and the offer was never that. What's changed is which state you approach it from \u2014 and a narrowed, scanning system is worse at this than a settled one, reliably.</p>",
      "<p>Recognition. Regulation. Release. Rise.</p>",
      "<p>Go and do the next thing.</p>"
    ],
    cues: [{"block": 0, "type": "PURPLE/MUSIC", "note": "bed in, 90 BPM, 3/4. Five-bar phrase. Turn at four seconds."}, {"block": 1, "type": "GOLD/PAUSE", "note": ""}, {"block": 2, "type": "GOLD/PAUSE", "note": ""}, {"block": 7, "type": "GOLD/PAUSE", "note": ""}, {"block": 8, "type": "BLUE/ILLUSTRATION", "note": "many fine lines converging on one point, none resolving."}, {"block": 9, "type": "GOLD/PAUSE", "note": ""}, {"block": 11, "type": "GOLD/PAUSE", "note": ""}, {"block": 15, "type": "GOLD/PAUSE", "note": ""}, {"block": 16, "type": "GOLD/PAUSE", "note": ""}, {"block": 17, "type": "GOLD/PAUSE", "note": ""}, {"block": 20, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 20, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 21, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 21, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 22, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 22, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 23, "type": "GOLD/PAUSE", "note": ""}, {"block": 24, "type": "RED/ACTION", "note": "feet pressed into the floor, steady, not straining."}, {"block": 25, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 25, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 25, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 25, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 26, "type": "GOLD/PAUSE", "note": "extended"}, {"block": 28, "type": "GOLD/PAUSE", "note": ""}, {"block": 30, "type": "GOLD/PAUSE", "note": ""}, {"block": 33, "type": "GOLD/PAUSE", "note": ""}, {"block": 34, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 34, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 36, "type": "GOLD/PAUSE", "note": "long"}, {"block": 38, "type": "GOLD/PAUSE", "note": "long"}, {"block": 39, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 39, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 43, "type": "BLUE/ILLUSTRATION", "note": "figure at middle distance, converging lines now behind them rather than around them."}, {"block": 45, "type": "GOLD/PAUSE", "note": ""}, {"block": 45, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 45, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 47, "type": "GOLD/PAUSE", "note": "long"}, {"block": 48, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 48, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 49, "type": "GOLD/PAUSE", "note": ""}, {"block": 49, "type": "PURPLE/MUSIC", "note": "bed lifts, resolves on the turn."}]
  },
  "p3-crisiscard": {
    kind: "Cue Card", title: "Cue Card", sub: "Do it yourself.",
    body: [
      "<blockquote>Second person throughout \u2014 deliberate, not stylistic.</blockquote>",
      "<h4>Front</h4>",
      "<p><em>Before you start \u2014 if too much is coming in, turn it down. Somewhere quieter, one thing off, headphones on.</em></p>",
      "<p class=\"sr-cue-line\"><strong>Name it</strong> \u2014 <em>You are agitated.</em> Too much to do, coming in, or at once inside you?</p>",
      "<p class=\"sr-cue-line\"><strong>Breathe it</strong> \u2014 Four in, six out. Feet into the floor.</p>",
      "<p class=\"sr-cue-line\"><strong>Put down the second thing</strong> \u2014 Not the load. Ask <em>what was this for</em>.</p>",
      "<p class=\"sr-cue-line\"><strong>Step out</strong> \u2014 Then one thing. The next thing, not the biggest.</p>",
      "<h4>Back</h4>",
      "<p><strong>Recognition</strong> \u2014 If too much is coming in, turn it down before you start. Then find it in your body before you find words for it \u2014 usually high in the chest, sometimes the throat. Name the state in one word. Then sort it: too much to do, too much coming in, or too much at once inside you? If you can't tell what's wrong, that's the third one.</p>",
      "<p><strong>Regulation</strong> \u2014 Four in, six out. Overwhelm breathes high and fast; go slow and uneven. Attention in the centre of your chest. Press your feet into the floor and feel it push back. The list will interrupt \u2014 noticing that is the skill, not a failure at it. Come back to the count.</p>",
      "<p><strong>Release</strong> \u2014 There's the amount, which is real. And there's the thing you're doing on top of it. Too much to do: going round the list. Too much coming in: pushing through as if it weren't landing. Too much at once: trying to work out which feeling comes first. Whichever it is, it's the expensive one, it doesn't finish, and it's the one you can put down. Keep the load. Ask <em>what was this for</em> and leave it open.</p>",
      "<p><strong>Rise</strong> \u2014 See yourself from a distance. <em>You have a lot on. It is a lot.</em> Then one concrete scene: the next thing, not the biggest thing. Where you are, what's in front of you, the first movement. Then one thing already handled.</p>"
    ],
    cues: []
  },
  "p3-guide": {
    kind: "How This Works", title: "How This Works", sub: "*What the state is doing*",
    body: [
      "<p>Overwhelm is a mobilised state with a particular signature: mobilisation with no single target.</p>",
      "<p>Fear has an object. Anger has an object. Overwhelm has a volume. The system is prepared for action and can't identify which action, so the preparation runs continuously without discharging.</p>",
      "<p>In the body that's fast shallow breathing high in the chest, raised heart rate, and attention that scans rather than settles. Working memory narrows \u2014 the capacity to hold several things at once goes down. That's the part people take personally, and it's a feature of the state rather than a fact about your competence. It reverses when the state does.</p>",
      "<p><strong>Three ways it arrives</strong></p>",
      "<p>Overwhelm isn't one thing with one source. Three fairly different situations produce it.</p>",
      "<p><strong>Too much to do.</strong> Volume of tasks, demands and deadlines.</p>",
      "<p><strong>Too much coming in.</strong> Noise, light, screens, several people talking. This one has nothing to do with quantity of work \u2014 the input itself is more than the system can process at the rate it's arriving.</p>",
      "<p><strong>Too much at once inside you.</strong> Several states live simultaneously \u2014 angry and frightened and sad together. Overwhelm here isn't a separate state; it's what several of them at the same time feels like from the inside. Being unable to say what's wrong is characteristic, not a failure of self-knowledge.</p>",
      "<p>The body does the same thing in all three, so the second and fourth steps don't change. What changes is the third step, because what you're doing on top of the load is different in each case \u2014 going round the list, pushing through as if the input weren't landing, or trying to sort feelings into an order they don't have.</p>",
      "<p><strong>When too much is coming in, the breath is not the first move.</strong> Reducing input comes first: leave the room, turn something off, put headphones on. Counting to six in a loud bright room asks the system to settle while the thing unsettling it is still arriving. That order matters, and it's the one thing on this protocol that overrides the sequence.</p>",
      "<p><strong>Why Recognition separates the state from the load</strong></p>",
      "<p>Overwhelm presents itself as a fact about quantity: there's too much. That framing has no handle on it, because the quantity often can't be changed today.</p>",
      "<p>The volume may be genuinely unreasonable \u2014 nothing here assumes it isn't. But the state is a physiological condition running in you, and it answers to different tools than the schedule does. Naming it as a state rather than as a verdict on the day puts a handle where there wasn't one.</p>",
      "<p><strong>Why the exhale is longer than the inhale</strong></p>",
      "<p>You can't decide your heart rate down. You can decide your breathing, and it's the one reachable control on a system you otherwise can't get at. Lengthening the out-breath relative to the in-breath is what shifts the system toward settled \u2014 which is why a bigger breath isn't a better one. Pulling for volume recruits effort, and effort points the wrong way.</p>",
      "<p>The feet into the floor do something related: a mobilised system with no target benefits from a definite physical signal, and pressure against a fixed surface is the simplest one available.</p>",
      "<p><strong>Why Release targets the scanning</strong></p>",
      "<p>There's the load, which is real. And there's a second thing you're doing on top of it, which differs by source.</p>",
      "<p><strong>Going round the list.</strong> Checking it, then checking it again, touching everything and starting nothing. Each pass tells you what you already knew: it's all still there. Nothing gets done and the list is the same length. It feels like staying on top of things. It's a circle.</p>",
      "<p><strong>Pushing through.</strong> Carrying on as though the noise and the light weren't landing, holding a normal expression, answering normally. That costs a great deal and none of it goes into the thing you're actually doing. It feels like coping. It's paying twice.</p>",
      "<p><strong>Sorting.</strong> Trying to decide which feeling to deal with first, as though there were a correct order. There isn't one, so it doesn't resolve, and the attempt keeps all of them live.</p>",
      "<p>In each case the load sits there whether or not you do the second thing \u2014 and the second thing is the one that keeps your body in the state that started it.</p>",
      "<p><strong>Why Rise goes small</strong></p>",
      "<p>Rehearsing the completed pile is rehearsing a scene you have no route to, and the system doesn't accept it. Rehearsing the next single action is a scene that's actually available, and that's the one that transfers.</p>",
      "<h4>What we rest on</h4>",
      "<p><strong>Polyvagal Theory \u2014 Stephen Porges</strong> \u00b7 <em>peer-reviewed</em> \u00b7 supplies Recognition and the three state labels</p>",
      "<p>Threat detection runs ahead of thought. The body reads a situation and moves before deliberation catches up. Porges describes three broad conditions: settled and socially available, mobilised for action, and shut down. Agitated, Unsteady and Numb are the member-facing names for those three. <em>Here it names mobilisation with no single target, which is why the preparation runs without discharging.</em></p>",
      "<p><em>The anatomical premises are contested: a 2026 evaluation in</em> Clinical Neuropsychiatry <em>challenged them, with Porges replying in the same issue. The state distinctions are what this platform uses, and they hold independently of that dispute.</em></p>",
      "<p><strong>Cardiac coherence \u2014 HeartMath</strong> \u00b7 <em>peer-reviewed</em> \u00b7 supplies Regulation and the count</p>",
      "<p>At roughly six breath cycles a minute, heart rhythm and breath settle into a single smooth wave rather than two competing ones, close to a rhythm the body's blood-pressure regulation already runs at. Four in, six out lands near that rate. The uneven ratio is the mechanism. <em>Here the feet into the floor do a related job \u2014 a definite signal for a system that can't find one.</em></p>",
      "<p><em>The finding is used here; the wider programme is not. There is no measurement of coherence anywhere on this platform and no score attached to any breath.</em></p>",
      "<p><strong>Where the reading is yours</strong> \u2014 this explains what the body does under load. Whether your load is reasonable, and what it says about your work or the choices in front of you, is a reading that belongs to you.</p>"
    ],
    cues: []
  },
  "p3-companion": {
    kind: "Somatic Release Activities", title: "Somatic Release Activities", sub: "Between sessions.",
    body: [
      "<p><strong>Turn something off.</strong> One source of input, removed. The radio, a screen, the overhead light, the notifications. The most effective thing on this list and the one people skip, because it feels too simple to count.</p>",
      "<p><strong>Headphones, no music.</strong> Or ear plugs. Taking the top off the noise is often enough on its own, and it's socially invisible.</p>",
      "<p><strong>Long exhale, no ceremony.</strong> Four in, six out, three or four cycles, eyes open, at your desk. Nobody can see you doing it.</p>",
      "<p><strong>Feet into the floor.</strong> Press both down steadily, feel the floor push back, hold for a slow five, release.</p>",
      "<p><strong>One horizon.</strong> Look at the furthest thing you can see. Overwhelm pulls focus to arm's length and holds it there; changing the focal distance changes something in the state, and it takes seconds.</p>",
      "<p><strong>One at a time, out loud.</strong> When several feelings are live, name them one after another rather than trying to rank them. <em>Angry. Frightened. Tired.</em> Naming them separately stops the sorting, which is the part that was costing you.</p>",
      "<p><strong>Forearms flat on the desk.</strong> Weight through them, shoulders dropped. Overwhelm holds the arms slightly lifted and ready, and the readiness feeds the state.</p>",
      "<p><strong>Name three things in the room.</strong> Something you can see, hear, and feel against your skin. This interrupts the scan by giving attention a finite set.</p>",
      "<p><strong>Write the list down and turn the paper over.</strong> Not to organise it \u2014 to get it out of working memory and onto a surface. It's still there. It doesn't need watching.</p>",
      "<p><em>Walking to a door and back also works. The point is that it finishes.</em></p>"
    ],
    cues: []
  },
  "p3-practice": {
    kind: "Safe Practice", title: "Safe Practice", sub: "*What this practice does*",
    body: [
      "<p>Works with the state that arrives under load, using breath, attention and observation. It doesn't organise your workload and doesn't claim to reduce it. It changes which state you meet it from, which matters more than it sounds \u2014 a narrowed, scanning system performs worse at exactly the work the load requires.</p>",
      "<p><strong>Pacing</strong></p>",
      "<p>Once through is a complete use. Use it when the state is there. If four and six is a stretch \u2014 and under load it often is \u2014 shorten both and keep the ratio uneven. Three and five works. Two and four works.</p>",
      "<p><strong>What people commonly notice</strong></p>",
      "<p>Restlessness during the breathing, and a strong pull to get up and start doing something. The list interrupting repeatedly \u2014 noticing that is the skill rather than a failure at it. Tiredness afterwards, sometimes sudden; mobilised states are expensive and the bill arrives when they end. Or very little change, which is an ordinary result.</p>",
      "<p><strong>When too much is coming in</strong></p>",
      "<p>If the source is noise, light, screens or people rather than workload, reduce the input before you do anything else. Leave the room, turn something off, put headphones on. This is the one place on this protocol where the order changes \u2014 asking the body to settle while the thing unsettling it is still arriving doesn't work, and concluding the method failed would be the wrong lesson.</p>",
      "<p>If you can't leave and can't turn it down, use the somatic activities rather than the session, and come back to it later.</p>",
      "<p><strong>When several things are live at once</strong></p>",
      "<p>If you can't tell what's wrong, this protocol is the right place to be. It's the one that doesn't ask you to identify which state you're in before you start. You don't have to pick, and picking wasn't going to work anyway.</p>",
      "<p><strong>When to slow down</strong></p>",
      "<p>If the breathing itself makes things worse \u2014 lightheaded, more alarmed \u2014 stop counting and let your breath do what it does. Focusing on the breath increases alarm in some people rather than settling it. Run the protocol on Recognition and Rise alone. Three steps still works.</p>",
      "<p>If sitting still is genuinely unbearable today, use the somatic activities and come back to the session later. That's a legitimate use of the protocol, not a lesser one.</p>",
      "<p><strong>When a person in the room is the right tool</strong></p>",
      "<p>Contact someone today \u2014 a doctor, a helpline in your country, or a person you trust \u2014 if the state isn't letting up over days rather than hours, if you've stopped sleeping, if you're unable to start anything at all rather than merely behind, if you're using something to get through the day, or if you're having thoughts of harming yourself.</p>",
      "<p><strong>When the load itself is the thing to address</strong></p>",
      "<p>A regulation practice helps you think clearly inside an unreasonable situation. It won't make the situation reasonable and wasn't built to. If the volume is beyond what one person can carry, the useful next moves are outside this platform \u2014 a conversation with a manager, a doctor, a union, or whoever holds the authority to change the input. The Proximity Guide goes further into that.</p>",
      "<p><strong>Alongside other support</strong></p>",
      "<p>If you're with a therapist, doctor or counsellor, this sits alongside that and replaces nothing. Tell them you're using it.</p>"
    ],
    cues: []
  },
  "p3-advisory": {
    kind: "Proximity Guide", title: "Proximity Guide", sub: "How close to stay.",
    body: [
      "<p>Overwhelm usually has an external source that keeps supplying it \u2014 a job, a caring responsibility, a household, a set of people who route things to you. How much of it you're in contact with is a real variable, and often more available than it feels from inside the state.</p>",
      "<p>Three tiers. Which one your situation belongs in is your read, on information nobody here has.</p>",
      "<p><strong>Worth staying engaged with</strong></p>",
      "<p>Heavy but finite, and responsive when named. There's a version of the conversation you haven't had \u2014 about scope, about the deadline, about what comes off if something goes on. The volume moves when you ask for it to move.</p>",
      "<p>Distance isn't the tool here. Regulation plus a specific request is, and the protocol is what makes you fit to make the request rather than absorb the load silently a fourth time.</p>",
      "<p><strong>Worth reducing the surface area of</strong></p>",
      "<p>The conversation has been had, more than once, and nothing changed. Your capacity is treated as the variable that flexes. Things arrive addressed to you because you've historically absorbed them rather than because they're yours.</p>",
      "<p>Reduction here is rarely dramatic. It's specific: things you stop volunteering for, hours you stop being available in, a channel you leave, a standing commitment you let end, a request you answer with a date rather than a yes. Declining one thing is not a change of life.</p>",
      "<p>There's also the load you've arranged for yourself, which is the harder one to see. If a reaction to being asked for something exceeds what was asked, the surplus is worth attending to \u2014 an interpretive lens rather than a finding, and what it shows you is yours to read.</p>",
      "<p><strong>Past what self-regulation is for</strong></p>",
      "<p>Where the volume is structurally impossible and no arrangement of your own state will meet it. Where you're held responsible for outcomes you have no authority over. Where the caring responsibility has no relief built into it and no end date. Where you're being made unwell by it.</p>",
      "<p>Treating that as a regulation problem has a cost: it converts a situation that needs other people into a private failure of coping. What it needs is a doctor, a manager with actual authority, a union, a carers' service, or someone who can see the whole picture rather than the version you can bear to describe.</p>",
      "<p><strong>Using this</strong></p>",
      "<p>Notice the tier. Then notice whether it's the tier you'd assign if a friend described the same situation. Most people place their own load one tier lower than they'd place someone else's. Where it goes next is yours \u2014 nobody here knows what you'd be putting down.</p>"
    ],
    cues: []
  },
  "p3-disclosure": {
    kind: "Disclosure & Support", title: "Disclosure & Support", sub: "A script for someone close.",
    body: [
      "<p>Take these exactly, or change every word.</p>",
      "<p><strong>Saying it</strong> &gt; \"I'm carrying more than I can comfortably hold at the moment. I'm not asking you to fix it. I just didn't want to keep pretending everything was fine.\"</p>",
      "<p><strong>Describing what it's actually like</strong></p>",
      "<blockquote>\"It's physical. Tight across the top of my chest, breathing high and fast, and my attention won't settle on anything \u2014 it goes round the whole pile and lands on nothing.\"</blockquote>",
      "<blockquote>\"The part that's hardest to explain is that I get worse at things, not just slower. I can't hold several things in my head at once when it's like this. That isn't me being careless. It comes back when the state does.\"</blockquote>",
      "<p><strong>How to tell it's coming</strong></p>",
      "<blockquote>\"I start doing the small easy things and avoiding the big one. I check things repeatedly. I stop finishing sentences.\"</blockquote>",
      "<blockquote>\"If you see that, the useful thing isn't a suggestion \u2014 it's asking whether there's one thing you could take. Or just saying you've noticed.\"</blockquote>",
      "<p><strong>What helps</strong></p>",
      "<blockquote>\"Specific rather than general. If you can take one actual thing off me \u2014 not offer, take \u2014 that's worth more than a conversation about it.\"</blockquote>",
      "<blockquote>\"And if there's nothing to take, just say you know. That helps too.\"</blockquote>",
      "<p><strong>What doesn't</strong></p>",
      "<blockquote>\"Suggestions are hard right now. It isn't that they're wrong \u2014 it's that another thing I could be doing lands as another thing on the list. If I want ideas I'll ask.\"</blockquote>",
      "<p><strong>If they ask what you're doing about it</strong></p>",
      "<blockquote>\"I run a method when it peaks. Four steps. First I name the state rather than the list \u2014 the load and the state are different things and separating them gives me something to work on. Then a breathing pattern, four in and six out, with my feet pressed into the floor. Then I drop the scanning, which is the loop that produces nothing. Then I look at it from a distance and pick the next single thing rather than the biggest thing.\"</blockquote>",
      "<blockquote>\"It doesn't shrink the pile. It makes me better at facing it. That was the missing part.\"</blockquote>",
      "<p><strong>If it's at work and you're asking for something</strong></p>",
      "<blockquote>\"I'm at capacity. If this new piece comes to me, I need to know what comes off. I'm not saying no \u2014 I'm asking which.\"</blockquote>",
      "<p>That last sentence is the one that changes the conversation. It moves the decision to the person who owns it.</p>",
      "<p><em>Tell one person. It can be a doctor rather than a friend. Overwhelm carried entirely privately tends to get quietly worse, because nobody adjusts anything for a load they can't see.</em></p>"
    ],
    cues: []
  },
  "p3-record": {
    kind: "Your Record", title: "Your Record", sub: "What changed, in your words.",
    body: [
      "<p>Written on your device and kept there. Your account, in your language, for you to read back \u2014 nobody else sees it, and it's never measured against anything you wrote before.</p>",
      "<p>Any of these, or none.</p>",
      "<p>- Where did it sit in your body? - Which kind was it \u2014 too much to do, too much coming in, or too much at once inside you? - What was on the list at the moment it peaked? Write it as it was, unsorted. - If it was input: what was in the room? Would turning one thing off have changed it? - When did the second thing start? Is there a point before it you can find? - Is the volume the thing, or is it one specific item wearing the whole pile's clothes? - <em>What was this for</em> \u2014 what turned up, without answering it? - What did you say to yourself from across the room? - What was the next thing you built? Did you do it? - What's on this list because it's yours, and what's on it because you were the one who'd take it? - What did you write here last time? Read it back.</p>"
    ],
    cues: []
  },
  "p3-accountability": {
    kind: "Accountability & Empathy", title: "Accountability & Empathy", sub: "What it does outside you.",
    body: [
      "<p>The protocol trains the interior half of the state. The other half exits \u2014 into a room, a tone, a silence \u2014 and lands somewhere you can't see from where you're standing.</p>",
      "<p><strong>The specific blind spot here</strong> \u2014 overwhelm exits as shortness and unavailability. Replies that answer the question and nothing else. Not asking how anyone is. Being in the room and clearly not in the room. From inside, each of those is efficiency, and it feels necessary. From outside it reads as being deprioritised, and the people closest to you absorb the most of it because they're the ones who complain least.</p>",
      "<p><strong>The one nobody sees coming</strong> \u2014 under load you get worse at things, not just slower. Working memory narrows and you drop details you'd normally hold. Other people experience that as carelessness about them specifically, because they don't have the state in view.</p>",
      "<p><strong>Their earlier information</strong> \u2014 people around you usually see the onset before you feel it. Worth asking directly: <em>what do you see, before I know?</em></p>",
      "<p><strong>Naming the act, not the character</strong> \u2014 <em>\"I've been giving you two-word answers for a fortnight\"</em> is ownership. <em>\"I've been useless lately\"</em> is not; it names nothing and asks them to disagree with it.</p>",
      "<p><strong>No because.</strong> The load is a real reason and it still doesn't belong in the sentence. It can be said afterwards, if they ask. Attached here it converts the account into a defence.</p>",
      "<p><strong>No self-attack.</strong> <em>\"I'm so sorry, I'm dropping everything, I'm a mess\"</em> moves the burden across the table \u2014 now they're managing your distress about the thing. Self-attack is <em>what's wrong with me</em> wearing the clothes of accountability, and it returns nothing usable.</p>",
      "<p><strong>Describe what was observable, ask about the rest.</strong> <em>\"I've been short with you for weeks. I'm not going to tell you what that's been like \u2014 I'd rather you told me.\"</em> The asking is how the information arrives.</p>",
      "<p><strong>The checkable change</strong> \u2014 overwhelm repairs by saying the true thing at the time rather than absorbing and going quiet. <em>\"I've got nothing left today, it isn't you\"</em> said on the day is worth more than an explanation a month later.</p>",
      "<p><strong>Where this stops</strong> \u2014 a reaction is information about the exterior of your state. It isn't a verdict on you, and someone else's account of you isn't automatically more accurate than your own. What you find when you look is yours to read.</p>"
    ],
    cues: []
  },
  "p4-meditation": {
    kind: "Guided Meditation", title: "Guided Meditation", sub: "Do it with me.",
    body: [
      "<p>Sit somewhere you can stay for a while. Eyes closed if they'll close, or one spot on the floor.</p>",
      "<p>This works on the state that's arrived while you don't know. Whether the thing you're afraid of is happening stays an open question \u2014 it's a real one, and it isn't the one we're working on.</p>",
      "<h4>Recognition</h4>",
      "<p>Find where it is in your body first, before any of the words.</p>",
      "<p>Usually low. A drop through the stomach. Sometimes a pull in the chest, or a tightness in the throat. Sometimes a hum through the whole of you that won't sit still.</p>",
      "<p>Now name the state. One word. <strong>Agitated.</strong></p>",
      "<p>Notice what that word leaves out. It leaves out them. It leaves out the unanswered message, the tone of the last thing they said, what it probably means.</p>",
      "<p>The state is here. Whether the thing you're afraid of is happening is a separate question, and it's still open.</p>",
      "<p>You have been treating an unanswered question as an answer. That's what the body does with silence \u2014 it fills it, fast, so it isn't standing in an unknown.</p>",
      "<h4>Regulation</h4>",
      "<p>Four counts in.</p>",
      "<p>Six counts out. Longer out than in.</p>",
      "<p>Attention into the centre of your chest.</p>",
      "<p>If a hand there helps, put one there. The contact is doing something on its own.</p>",
      "<p>This state pulls hard toward the phone. Toward checking. Toward saying something now that will settle it.</p>",
      "<p>Not yet. The count first.</p>",
      "<h4>Release</h4>",
      "<p>Two things are running.</p>",
      "<p>There's the state. And there's the search \u2014 going back through it, looking for the moment it changed, rereading the message, finding the sentence where the tone shifted.</p>",
      "<p>The search feels like getting to the bottom of it. What it actually does is keep producing the state, because every pass through finds something, and everything found is ambiguous.</p>",
      "<p>Let the state stand. It's here and it isn't being argued with.</p>",
      "<p>Set down the search. Only the search.</p>",
      "<p>And the question. Not <em>what's wrong with me that I'm like this about people</em> \u2014 that returns nothing you can use, and it's the question you've already asked a hundred times.</p>",
      "<p><strong>What was this for?</strong></p>",
      "<p>Something in you moves very fast when connection looks like it might be going. It moves before you've thought about it. Fast, early, and hard to argue with \u2014 which is what a protective response looks like from the inside.</p>",
      "<p>It was doing a job. Understanding that doesn't tell you whether it's the right job now, and it doesn't tell you what's happening with this person today.</p>",
      "<p>Don't answer it. Let it sit there in place of the other one.</p>",
      "<h4>Rise</h4>",
      "<p>Step outside it.</p>",
      "<p>See yourself from across the room. Someone sitting with a phone face-down, breathing four and six.</p>",
      "<p>Speak to them as <em>you</em>.</p>",
      "<p><em>You don't know yet. And you are steady enough to not know for a while.</em></p>",
      "<p>That's the whole sentence. Not that it's fine. That you can stand in the not-knowing without the state deciding it for you.</p>",
      "<p>Now forward, and concrete. Later today, and not the scene where they reply. That one isn't yours to build.</p>",
      "<p>You, somewhere specific, doing something specific, with this still unresolved. What's in your hands. What's around you. What are you doing that isn't waiting.</p>",
      "<p>And one thing already here. Something that hasn't gone anywhere. Small.</p>",
      "<p>Come back. Feet on the floor.</p>",
      "<p>You still don't know. Nothing here was going to change that. What's changed is that the state isn't answering the question for you.</p>",
      "<p>Recognition. Regulation. Release. Rise.</p>"
    ],
    cues: [{"block": 0, "type": "PURPLE/MUSIC", "note": "bed in, 90 BPM, 3/4. Five-bar phrase. Turn at four seconds."}, {"block": 1, "type": "GOLD/PAUSE", "note": ""}, {"block": 4, "type": "GOLD/PAUSE", "note": ""}, {"block": 5, "type": "BLUE/ILLUSTRATION", "note": "a held breath rendered as a suspended shape, not falling."}, {"block": 6, "type": "GOLD/PAUSE", "note": ""}, {"block": 8, "type": "GOLD/PAUSE", "note": ""}, {"block": 11, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 11, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 12, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 12, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 13, "type": "RED/ACTION", "note": "hand to sternum, flat, light. Offered, not instructed."}, {"block": 14, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 14, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 16, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 16, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 16, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 16, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 16, "type": "GOLD/PAUSE", "note": "extended"}, {"block": 18, "type": "GOLD/PAUSE", "note": ""}, {"block": 20, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 20, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 22, "type": "GOLD/PAUSE", "note": "long"}, {"block": 24, "type": "GOLD/PAUSE", "note": "long"}, {"block": 25, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 25, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 30, "type": "BLUE/ILLUSTRATION", "note": "figure at middle distance, room around it, unhurried."}, {"block": 32, "type": "GOLD/PAUSE", "note": ""}, {"block": 33, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 33, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 35, "type": "GOLD/PAUSE", "note": "long"}, {"block": 35, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 35, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 36, "type": "GOLD/PAUSE", "note": ""}, {"block": 36, "type": "PURPLE/MUSIC", "note": "bed lifts, resolves on the turn."}]
  },
  "p4-crisiscard": {
    kind: "Cue Card", title: "Cue Card", sub: "Do it yourself.",
    body: [
      "<blockquote>Second person throughout \u2014 deliberate, not stylistic.</blockquote>",
      "<h4>Front</h4>",
      "<p class=\"sr-cue-line\"><strong>Name it</strong> \u2014 <em>You are agitated.</em> The state, not them.</p>",
      "<p class=\"sr-cue-line\"><strong>Breathe it</strong> \u2014 Four in, six out. Hand to your chest. Phone down.</p>",
      "<p class=\"sr-cue-line\"><strong>Drop the search</strong> \u2014 Not the question. Ask <em>what was this for</em>.</p>",
      "<p class=\"sr-cue-line\"><strong>Step out</strong> \u2014 <em>You don't know yet, and you can not-know for a while.</em></p>",
      "<h4>Back</h4>",
      "<p><strong>Recognition</strong> \u2014 Find where it sits, usually low \u2014 stomach, chest, throat. Name the state in one word. Keep them out of the naming. You've been treating an unanswered question as an answer; the body fills silence fast, so it isn't standing in an unknown. Whether the thing you fear is happening is still open.</p>",
      "<p><strong>Regulation</strong> \u2014 Four in, six out. Attention in the centre of your chest, hand there if it helps. This state pulls hard toward checking, and toward saying the thing that will settle it now. The count first. Everything else after.</p>",
      "<p><strong>Release</strong> \u2014 Two things are running. The state, which arrived on its own. And the search \u2014 rereading, going back through, finding the sentence where the tone changed. Every pass finds something and everything found is ambiguous, so the search keeps producing the state. Set down the search. Keep the question. Ask <em>what was this for</em> and leave it open.</p>",
      "<p><strong>Rise</strong> \u2014 See yourself from a distance. <em>You don't know yet, and you are steady enough to not know for a while.</em> Then one concrete scene later today with this still unresolved \u2014 not the scene where they reply. Then one thing that hasn't gone anywhere.</p>"
    ],
    cues: []
  },
  "p4-guide": {
    kind: "How This Works", title: "How This Works", sub: "*What the state is doing*",
    body: [
      "<p>This is a mobilised state triggered by a signal about connection rather than about physical danger. The machinery is the same: the reading happens below awareness and moves before deliberation catches up.</p>",
      "<p>In the body that's a drop or pull low in the torso, raised heart rate, tightness in the chest or throat, and attention that locks onto one source and won't move off it. Sleep goes first. The pull toward checking is part of the state, not a decision inside it.</p>",
      "<p><strong>Why an unanswered question becomes an answer</strong></p>",
      "<p>An unresolved signal is expensive to hold. The system prefers a bad answer to no answer, because a bad answer permits a response and no answer permits nothing. So ambiguity gets closed, fast, usually in the direction the system already leans.</p>",
      "<p>Recognition interrupts that by naming the state without naming the conclusion. It doesn't tell you the conclusion is wrong. It reopens the question the state had already shut.</p>",
      "<p><strong>Why the exhale is longer than the inhale</strong></p>",
      "<p>You can't decide your heart rate down. You can decide your breathing, and it's the one reachable control on a system you otherwise can't get at. Lengthening the out-breath relative to the in-breath is what shifts the system toward settled. A bigger breath isn't a better one \u2014 pulling for volume recruits effort, and effort points the wrong way.</p>",
      "<p>Contact at the sternum is a related signal, and one of the quickest available.</p>",
      "<p><strong>Why Release targets the search</strong></p>",
      "<p>There's the state, and there's the search \u2014 the rereading, the going back through, the hunt for the moment it changed.</p>",
      "<p>It feels like working it out. But every time you go back through it you find something, and everything you find could mean two things. So you go through it again.</p>",
      "<p>You never reach the end, because there isn't one. That's the tell.</p>",
      "<p>The change of question works the same way. <em>What is wrong with me</em> asks about defect and returns answers about defect. <em>What was this for</em> asks about function, and what it tends to surface is that something in you moves very fast when connection looks like it might be going \u2014 early, hard to argue with, which is what a protective response looks like from inside.</p>",
      "<p>Understanding what a response was doing is not the same as knowing whether it's the right response now. It also says nothing about what's happening with this person today.</p>",
      "<p><strong>Why Rise rehearses the unresolved version</strong></p>",
      "<p>Rehearsing the scene where they reply is rehearsing an event you don't control, and the system doesn't accept it. Rehearsing yourself steady while it's still open is a scene that's actually available. That's the one that transfers.</p>",
      "<h4>What we rest on</h4>",
      "<p><strong>Polyvagal Theory \u2014 Stephen Porges</strong> \u00b7 <em>peer-reviewed</em> \u00b7 supplies Recognition and the three state labels</p>",
      "<p>Threat detection runs ahead of thought. The body reads a situation and moves before deliberation catches up. Porges describes three broad conditions: settled and socially available, mobilised for action, and shut down. Agitated, Unsteady and Numb are the member-facing names for those three. <em>Here it accounts for why a signal about connection produces the same machinery as a signal about danger.</em></p>",
      "<p><em>The anatomical premises are contested: a 2026 evaluation in</em> Clinical Neuropsychiatry <em>challenged them, with Porges replying in the same issue. The state distinctions are what this platform uses, and they hold independently of that dispute.</em></p>",
      "<p><strong>Compassionate Inquiry \u2014 Gabor Mat\u00e9</strong> \u00b7 <em>clinical practice</em> \u00b7 supplies Release and its register</p>",
      "<p>A response is treated as an adaptation rather than a defect \u2014 something that was doing a job, whether or not it's still the right job. The register of the question decides the answer: <em>what is wrong with me</em> asks about defect and returns answers about defect; <em>what was this for</em> asks about function and returns something workable. <em>Here it is what stops the protocol becoming another round of self-interrogation.</em></p>",
      "<p><em>A clinical practice, not a controlled research programme. Used here for the register of the question and nothing wider. It makes no claim about where any pattern came from, and neither does this platform.</em></p>",
      "<p><strong>Where the reading is yours</strong> \u2014 this explains the machinery. What your response means, where it came from, and what to do about this relationship are readings that belong to you.</p>"
    ],
    cues: []
  },
  "p4-companion": {
    kind: "Somatic Release Activities", title: "Somatic Release Activities", sub: "Between sessions.",
    body: [
      "<p><strong>Long exhale, no ceremony.</strong> Four in, six out, three or four cycles. Available anywhere, eyes open.</p>",
      "<p><strong>Hand to sternum.</strong> Flat, light, centre of the chest. Contact and warmth there is one of the quickest signals of the settled state. Under a jacket, on a train, nobody notices.</p>",
      "<p><strong>Phone face-down, out of reach.</strong> Not away forever \u2014 just further than an arm. The checking is a physical loop and putting distance in it interrupts the loop rather than the wanting.</p>",
      "<p><strong>Weight into the chair or the floor.</strong> Press down, feel it push back, hold for a slow five. Something is holding you up and the body stops registering it unless attention is sent there.</p>",
      "<p><strong>One thing that is still here.</strong> Look at something in the room that was there last week and will be there next week. Not a thought exercise \u2014 an actual object, looked at.</p>",
      "<p><strong>Walk with someone, or near someone.</strong> A shop, a busy street, a room with other people in it. This state worsens in isolation faster than most, and undirected proximity to people helps without requiring anything of you.</p>",
      "<p><em>Unclenching the jaw and dropping the shoulders is always available and always creeping back.</em></p>"
    ],
    cues: []
  },
  "p4-practice": {
    kind: "Safe Practice", title: "Safe Practice", sub: "*What this practice does*",
    body: [
      "<p>Works with the state that arrives when connection looks uncertain, using breath, attention and observation. It doesn't tell you what's happening in your relationship, and it doesn't tell you whether your read is right.</p>",
      "<p><strong>Pacing</strong></p>",
      "<p>Once through is a complete use. Use it when the state is there. If four and six is a stretch, shorten both and keep the ratio uneven \u2014 three and five works, two and four works.</p>",
      "<p><strong>What people commonly notice</strong></p>",
      "<p>The pull toward the phone getting stronger before it gets weaker, particularly during Regulation. Tears at the Release step, which is an ordinary end to a mobilised state. Tiredness afterwards. The urge to send a message immediately after finishing, which is worth waiting out \u2014 the protocol works better as a delay than as a preparation.</p>",
      "<p>Or very little, which is also an ordinary result.</p>",
      "<p><strong>When to slow down</strong></p>",
      "<p>If Release opens something much larger than today \u2014 an older loss, something from a long way back \u2014 you can stop there and come back to the breath. Surfacing isn't an instruction to follow it, and this protocol will surface things more often than most.</p>",
      "<p>If the state doesn't settle at all across several attempts, that's information rather than failure, and it points toward a person rather than a practice.</p>",
      "<p><strong>When a person in the room is the right tool</strong></p>",
      "<p>Contact someone today \u2014 a doctor, a helpline in your country, or a person you trust \u2014 if you're having thoughts of harming yourself, if you can't eat or sleep across days rather than one night, if you're using something to get through it, or if the state is now attached to almost everyone rather than one person.</p>",
      "<p>Grief and abandonment overlap, and a real loss is not a pattern to be worked on. If someone has died or has genuinely gone, that needs a different kind of support and probably a person.</p>",
      "<p><strong>Alongside other support</strong></p>",
      "<p>If you're with a therapist, doctor or counsellor, this sits alongside that and replaces nothing. This is one of the protocols where having a person is worth a great deal, and the practice doesn't substitute for it.</p>"
    ],
    cues: []
  },
  "p4-advisory": {
    kind: "Proximity Guide", title: "Proximity Guide", sub: "How close to stay.",
    body: [
      "<p>This state usually has a live external source \u2014 a specific person whose availability is the variable. How much contact you have is real, and it's the one part of the situation you have any say over.</p>",
      "<p>Three tiers. Which one your situation belongs in is your read, on information nobody here has.</p>",
      "<p><strong>Worth staying engaged with</strong></p>",
      "<p>The uncertainty is real but the relationship can hold being asked about. There's a version of the conversation you haven't had. When you've named something, it's been received rather than punished. Their unavailability, when you've checked, has usually turned out to be about their life rather than about you.</p>",
      "<p>Distance isn't the tool here. Asking is \u2014 and the protocol is what makes you fit to ask once, plainly, rather than eleven times in a way that asks them to reassure you. The Invitation to Repair on this protocol is written for this tier.</p>",
      "<p><strong>Worth taking some distance from</strong></p>",
      "<p>Where availability is inconsistent in a way that produces the state reliably. Where asking has been answered with irritation, or with reassurance that doesn't hold past the next day. Where you've noticed you're managing your own behaviour constantly to keep the connection level.</p>",
      "<p>Distance here is rarely all-or-nothing. It's specific: not being the one who always messages first, letting a gap sit, having other people in the week, declining an occasion. Reducing the surface area is a real option and it isn't the same as ending anything.</p>",
      "<p>There's also the surplus to attend to \u2014 where the reaction outruns the event repeatedly, the excess is carrying information about something other than the event. An interpretive lens rather than a finding, and what it shows you is yours to read.</p>",
      "<p><strong>Past what self-regulation is for</strong></p>",
      "<p>Where someone controls your access to them as a way of managing you. Where reassurance is given and withdrawn in a pattern. Where you're being isolated from other people. Where you're frightened.</p>",
      "<p>That isn't a regulation problem, and treating it as one has a cost \u2014 it converts a situation that needs other people into a private failure of coping. What it needs is a doctor, a helpline, or a friend who knows the whole picture rather than the version you can bear to tell.</p>",
      "<p><strong>Using this</strong></p>",
      "<p>Notice the tier. Then notice whether it's the tier you'd assign if a friend described the same thing. Where it goes next is yours \u2014 this platform doesn't tell members to leave or stay, and nobody here knows what you'd be giving up.</p>"
    ],
    cues: []
  },
  "p4-disclosure": {
    kind: "Disclosure & Support", title: "Disclosure & Support", sub: "A script for someone close.",
    body: [
      "<p>Take these exactly, or change every word.</p>",
      "<p><strong>Saying it</strong> &gt; \"I get a thing where I'm suddenly certain someone's pulling away, and it takes over completely. It isn't always about anything. I'd rather you knew than kept wondering what was going on with me.\"</p>",
      "<p><strong>Describing what it's actually like</strong></p>",
      "<blockquote>\"It's physical first. Drops through my stomach, chest goes tight, and my attention locks onto one person and won't move. It happens before I've thought anything.\"</blockquote>",
      "<blockquote>\"The part that's hard to explain is what silence does. An unanswered message isn't neutral to me \u2014 my body fills it in, fast, and then I'm reacting to the version it filled in rather than to anything that happened.\"</blockquote>",
      "<p><strong>How to tell it's coming</strong></p>",
      "<blockquote>\"I go quiet and start checking things. Or I get very light and jokey in a way that isn't quite right. I start rereading old messages.\"</blockquote>",
      "<blockquote>\"If you notice, the useful thing is small and direct \u2014 'I'm here, I'm just busy today'. A short specific sentence does more than a long reassuring one.\"</blockquote>",
      "<p><strong>What helps</strong></p>",
      "<blockquote>\"Say the specific thing. 'I'll message you tonight' is worth ten times 'don't worry'. My body accepts times and facts; it doesn't accept reassurance.\"</blockquote>",
      "<blockquote>\"If you're going to be out of contact for a while, telling me beforehand costs you nothing and saves me a day.\"</blockquote>",
      "<p><strong>What doesn't</strong></p>",
      "<blockquote>\"Being told I'm overthinking. I know I am. Knowing doesn't stop it, and hearing it means I've now got to manage the state and hide it.\"</blockquote>",
      "<blockquote>\"Reassurance with no specifics in it. It sounds like being handled, and it wears off in about an hour.\"</blockquote>",
      "<p><strong>If they ask what you're doing about it</strong></p>",
      "<blockquote>\"I run a method when it starts. Four steps. First I name the state instead of naming what I think they're doing \u2014 that reopens the question my body had already closed. Then a breathing pattern, four in and six out, with a hand on my chest. Then I stop the searching-back-through-it, which is the loop that keeps regenerating the whole thing. Then I look at it from a distance and get on with something while it's still unresolved.\"</blockquote>",
      "<blockquote>\"It doesn't tell me whether I'm right. It stops my body deciding for me.\"</blockquote>",
      "<p><em>Tell one person. It can be a professional rather than a friend. This state gets worse in isolation faster than most, and the isolation is often the thing the state itself produces.</em></p>"
    ],
    cues: []
  },
  "p4-repair": {
    kind: "Invitation to Repair", title: "Invitation to Repair", sub: "Reopening it with them.",
    body: [
      "<p>Send it from the far side of the protocol, not the middle. Sent from inside the state, it asks them to fix how you feel \u2014 and it will be read that way and answered defensively, however carefully it's worded.</p>",
      "<p><strong>The rule that makes it sendable:</strong> no prosecution of them, and no request for reassurance disguised as a question. <em>\"Are we okay?\"</em> is not an invitation. It's a demand for a specific answer, and both of you know which one.</p>",
      "<p><strong>Sendable</strong> &gt; Hi \u2014 something's been sitting with me and I'd rather say it than carry it. &gt; &gt; I've noticed I've been reading a lot into how much we've been in touch, and I don't want to do that quietly and let it turn into something. &gt; &gt; I'm not asking you to reassure me. I'd just rather tell you than manage it on my own. If there's something on your end, I'd want to know that too.</p>",
      "<p><strong>Shorter</strong> &gt; I've been in my head about us a bit. Not asking you to fix it \u2014 just didn't want to go quiet about it.</p>",
      "<p><strong>Where you've asked too often and you know it</strong> &gt; I've been checking in a lot lately, and I think it's been landing as pressure. I'm going to stop doing that. Not going cold on you \u2014 just not making you the answer to something that's mine.</p>",
      "<p><strong>Before sending</strong> \u2014 read it back for a required answer. If a slow reply or a short one would land badly, it's early. An invitation with a required answer isn't one.</p>",
      "<p>Also read it back for the case in disguise: <em>always, never, actually, you never.</em> Cut them.</p>",
      "<p><em>If they don't take it, you've done the part that was yours. Whether they meet it is theirs, and always was.</em></p>"
    ],
    cues: []
  },
  "p4-record": {
    kind: "Your Record", title: "Your Record", sub: "What changed, in your words.",
    body: [
      "<p>Written on your device and kept there. Your account, in your language, for you to read back \u2014 nobody else sees it, and it's never measured against anything you wrote before.</p>",
      "<p>Any of these, or none.</p>",
      "<p>- Where did it sit in your body? - What was the signal? Write the actual thing that happened, plainly, without the reading attached. - What did your body fill the silence in with? - How long between the signal and the certainty? - What did the search find? Was any of it unambiguous? - <em>What was this for</em> \u2014 what turned up, without answering it? - What did you say to yourself from across the room? - Is this the same state as last time, with a different person in it? - What did you write here last time? Read it back. How did that one turn out?</p>",
      "<p>That last one matters more here than anywhere. This state produces confident predictions, and your own record of how the previous ones landed is the only evidence you have that isn't generated by the state itself.</p>"
    ],
    cues: []
  },
  "p4-accountability": {
    kind: "Accountability & Empathy", title: "Accountability & Empathy", sub: "What it does outside you.",
    body: [
      "<p>The protocol trains the interior half of the state. The other half exits \u2014 into messages, into a tone, into what you did while you were certain \u2014 and lands on someone who has no view of what produced it.</p>",
      "<p><strong>The specific blind spot here</strong> \u2014 this state exits as pressure, and it doesn't feel like pressure from inside. From inside it's checking, or clarifying, or one more message. From outside it's a series of requests to be reassured, arriving faster than they can be answered, each one raising the cost of a slow reply. The other person often can't name it either. They just start feeling watched.</p>",
      "<p><strong>The second one</strong> \u2014 the pre-emptive withdrawal. Going cold first, to be the one who did it. From inside that's protection. From outside it's the thing you were afraid of, arriving from your side.</p>",
      "<p><strong>Their earlier information</strong> \u2014 the people closest to you can usually see it before you feel it. Worth asking directly: <em>what do you see, before I know?</em></p>",
      "<p><strong>Naming the act, not the character</strong> \u2014 <em>\"I sent you nine messages on Tuesday and then went silent for two days\"</em> is ownership. <em>\"I'm too much\"</em> is not. It names nothing, it's a verdict on you rather than an account of anything, and it asks them to talk you out of it \u2014 which is another request for reassurance.</p>",
      "<p><strong>No because.</strong> The state is a real reason and it doesn't belong in the sentence. It can be said later, if they ask.</p>",
      "<p><strong>No self-attack.</strong> This is the protocol where self-attack is most likely to arrive dressed as accountability, and where it does the most damage \u2014 because <em>I'm too much, I'm sorry, I don't know why you put up with me</em> hands the other person the job of proving otherwise. That's the pattern, repeating inside the apology for the pattern.</p>",
      "<p><strong>Describe what was observable, ask about the rest.</strong> <em>\"I've been checking in a lot. I'm not going to tell you what that's been like on your end \u2014 I'd rather you told me.\"</em> Then let them answer without correcting it.</p>",
      "<p><strong>The checkable change</strong> \u2014 this repairs by saying it once, plainly, and then not raising it again that day. <em>\"I'm going to tell you when I'm in it, and then leave it with you\"</em> is small, specific and observable.</p>",
      "<p><strong>Where this stops</strong> \u2014 a reaction is information about the exterior of your state, not a verdict on you. Someone else's account of you isn't automatically more accurate than your own \u2014 and on this protocol especially, a person who benefits from your uncertainty is not a reliable narrator of your conduct. What you find when you look is yours to read.</p>"
    ],
    cues: []
  },
  "p5-meditation": {
    kind: "Guided Meditation", title: "Guided Meditation", sub: "Do it with me.",
    body: [
      "<p>Sit somewhere you won't be interrupted. Eyes closed if they'll close.</p>",
      "<p>This state doesn't want to be looked at. That's not incidental \u2014 it's most of what it is. So we'll go slowly, and nothing here is going to ask you to say anything out loud, to anyone, ever.</p>",
      "<h4>Recognition</h4>",
      "<p>Find where it sits in your body, before any of the words.</p>",
      "<p>Face and neck, often. Heat there. A sinking through the chest. Something in the shoulders that curls forward. A wish to be smaller, which is a physical wish before it's an idea.</p>",
      "<p>Now name the state. One word. <strong>Unsteady.</strong></p>",
      "<p>Notice what that word doesn't do. It doesn't agree with you. It doesn't say the verdict is correct.</p>",
      "<p>Because this state arrives with a verdict already attached, and the verdict presents itself as simply true. Not <em>I did something bad</em>. Something closer to <em>I am the thing that's wrong</em>.</p>",
      "<p>For now, only this: that's a state. Whatever else it is, it is first a state, running in a body, with a name.</p>",
      "<h4>Regulation</h4>",
      "<p>Four counts in.</p>",
      "<p>Six counts out. Longer out than in.</p>",
      "<p>Attention into the centre of your chest.</p>",
      "<p>If a hand there helps, put one there. This state pulls the body inward, and warmth at the chest is one of the few things it accepts.</p>",
      "<p>Let the shoulders come back a little. Not straightening up. Just less curled.</p>",
      "<h4>Release</h4>",
      "<p>Two things are running.</p>",
      "<p>There's the state. And there's the case being built against you, which has been running quietly and has been gathering evidence for a while. Old things. Things nobody else remembers. Things that weren't your fault, filed as if they were.</p>",
      "<p>That prosecution is doing the expensive work. It's not investigating anything \u2014 it's confirming.</p>",
      "<p>Let the state be here. It arrived, it's unpleasant, and it isn't being argued with.</p>",
      "<p>Set down the case. Only the case. Not whatever real thing may be underneath it \u2014 that stays, and you can look at it later, from somewhere steadier.</p>",
      "<p>And the question. You already know the other one. <em>What is wrong with me</em> \u2014 you've asked it many times and it has never once returned anything you could use. It only ever returns more of itself.</p>",
      "<p><strong>What was this for?</strong></p>",
      "<p>Something in you learned to go small and quiet and hidden. That's not a defect. It's a manoeuvre, and it's aimed at something \u2014 usually at not being cast out.</p>",
      "<p>We're not going to work out what it was aimed at right now. Just notice that it's aimed at something. Things that are aimed at something were built.</p>",
      "<h4>Rise</h4>",
      "<p>Step outside it.</p>",
      "<p>See yourself from across the room. Someone sitting there, shoulders forward, breathing four and six.</p>",
      "<p>Speak to them as <em>you</em>, not <em>I</em>.</p>",
      "<p><em>You are having a bad hour with yourself. That's what this is.</em></p>",
      "<p>Stay out there.</p>",
      "<p>Notice something about the distance: from here, there's a person and there's a state, and they aren't the same object. From inside, they were the same object. That's what this state does \u2014 it fuses them.</p>",
      "<p>Now forward, and concrete. Later today, somewhere specific, doing something ordinary. Not a scene where you've resolved anything about yourself.</p>",
      "<p>Where are you. What's in your hands. Who can see you.</p>",
      "<p>Ordinary is the point. This state says you should be hidden. The scene where you're just out, doing a normal thing, in view, is the one that contradicts it \u2014 without arguing with it.</p>",
      "<p>And one thing already true. Not about your worth \u2014 nothing about your worth. Something outside you. The chair. The light. That you stayed for this.</p>",
      "<p>Come back. Feet on the floor. Shoulders where they are.</p>",
      "<p>The verdict may still be here. It doesn't get overturned by a session, and nothing here was pretending it would be. What's changed is that there's a bit of space between you and it, and space is the thing it's never had.</p>",
      "<p>Recognition. Regulation. Release. Rise.</p>"
    ],
    cues: [{"block": 0, "type": "PURPLE/MUSIC", "note": "bed in, 90 BPM, 3/4. Five-bar phrase. Turn at four seconds."}, {"block": 1, "type": "GOLD/PAUSE", "note": ""}, {"block": 4, "type": "GOLD/PAUSE", "note": ""}, {"block": 5, "type": "BLUE/ILLUSTRATION", "note": "a form turning inward, not crushed. Contained, not diminished."}, {"block": 6, "type": "GOLD/PAUSE", "note": ""}, {"block": 8, "type": "GOLD/PAUSE", "note": "long"}, {"block": 11, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 11, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 12, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 12, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 13, "type": "RED/ACTION", "note": "hand to sternum, flat, light. Offered, not instructed."}, {"block": 14, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 14, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 15, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 15, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 15, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 15, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 15, "type": "GOLD/PAUSE", "note": "extended"}, {"block": 17, "type": "GOLD/PAUSE", "note": ""}, {"block": 19, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 19, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 21, "type": "GOLD/PAUSE", "note": "long"}, {"block": 23, "type": "GOLD/PAUSE", "note": "long"}, {"block": 24, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 24, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 28, "type": "BLUE/ILLUSTRATION", "note": "figure at middle distance, room around it, unhurried."}, {"block": 30, "type": "GOLD/PAUSE", "note": ""}, {"block": 32, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 32, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 34, "type": "GOLD/PAUSE", "note": "long"}, {"block": 35, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 35, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 36, "type": "GOLD/PAUSE", "note": ""}, {"block": 36, "type": "PURPLE/MUSIC", "note": "bed lifts, resolves on the turn."}]
  },
  "p5-crisiscard": {
    kind: "Cue Card", title: "Cue Card", sub: "Do it yourself.",
    body: [
      "<blockquote>Second person throughout \u2014 deliberate, not stylistic. On this protocol it does more than anywhere: <em>you</em> is the word that puts space between the person and the verdict.</blockquote>",
      "<h4>Front</h4>",
      "<p class=\"sr-cue-line\"><strong>Name it</strong> \u2014 <em>You are unsteady.</em> A state, not a verdict.</p>",
      "<p class=\"sr-cue-line\"><strong>Breathe it</strong> \u2014 Four in, six out. Hand to your chest. Shoulders back a little.</p>",
      "<p class=\"sr-cue-line\"><strong>Drop the case</strong> \u2014 Not what's underneath. Ask <em>what was this for</em>.</p>",
      "<p class=\"sr-cue-line\"><strong>Step out</strong> \u2014 <em>You are having a bad hour with yourself.</em></p>",
      "<h4>Back</h4>",
      "<p><strong>Recognition</strong> \u2014 Find it in your body first: heat in the face, sinking chest, shoulders curling, a physical wish to be smaller. Name the state in one word. The word doesn't agree with the verdict \u2014 this state arrives with one already attached, presenting itself as simply true. Whatever else it is, it's first a state, running in a body.</p>",
      "<p><strong>Regulation</strong> \u2014 Four in, six out. Attention in the centre of your chest, hand there if it helps \u2014 this state pulls the body inward and warmth at the chest is one of the few things it accepts. Let the shoulders come back a little. Not straightening. Less curled.</p>",
      "<p><strong>Release</strong> \u2014 Two things are running. The state, and the case being built against you, gathering old evidence, including things that weren't yours. The case isn't investigating \u2014 it's confirming. Set down the case. Keep whatever real thing is underneath; you can look at that later from somewhere steadier. Ask <em>what was this for</em>. You already know what the other question returns.</p>",
      "<p><strong>Rise</strong> \u2014 See yourself from across the room. <em>You are having a bad hour with yourself.</em> Notice that from out here, the person and the state are two objects. From inside they were one. Then a concrete ordinary scene later today, in view of people. Ordinary is the point.</p>"
    ],
    cues: []
  },
  "p5-guide": {
    kind: "How This Works", title: "How This Works", sub: "*What the state is doing*",
    body: [
      "<p>This is a state that pulls inward and downward rather than mobilising. In the body: heat in the face and neck, a sinking through the chest, the shoulders drawing forward, reduced eye contact, a lowered voice. The physical wish to be smaller is a real motor pattern, not a metaphor.</p>",
      "<p>It has a social shape rather than a danger shape. The behaviours it produces \u2014 hiding, withdrawing, going quiet, appeasing \u2014 are the behaviours of avoiding exclusion.</p>",
      "<p><strong>Why it arrives with a verdict</strong></p>",
      "<p>The distinguishing feature of this state is fusion. Most states describe a situation. This one describes you \u2014 and it presents that description as an observation rather than as a symptom.</p>",
      "<p>That's why arguing with it fails. You cannot reason with a state by producing counter-evidence, because the state generated the evidence in the first place and will generate more.</p>",
      "<p>Recognition doesn't dispute the verdict. It names the state, which does something different and more useful: it puts the verdict inside a category. A verdict that has a category is no longer simply true.</p>",
      "<p><strong>Why the exhale is longer than the inhale</strong></p>",
      "<p>You can't decide your way out of a physiological state. You can decide your breathing, and it's the one reachable control. Lengthening the out-breath relative to the in-breath is what shifts the system toward settled. Contact and warmth at the sternum is a related signal and one this state accepts unusually well, because it works below the level the verdict operates at.</p>",
      "<p>Opening the shoulders slightly matters for the same reason \u2014 the inward posture is part of the state's machinery, not just a sign of it.</p>",
      "<p><strong>Why Release targets the case</strong></p>",
      "<p>There's the state, and there's the prosecution \u2014 the accumulating case, drawing on old material, including things that weren't your responsibility.</p>",
      "<p>Two different costs, and the case is the one that keeps going. It feels like being honest with yourself, or like taking responsibility.</p>",
      "<p>But it never looks for anything that might let you off, and it never reaches a verdict. It isn't weighing anything up. It's only collecting.</p>",
      "<p>Setting it down isn't a claim that you've done nothing wrong. Whatever real thing sits underneath stays available, and it's easier to look at from a settled state than from inside a prosecution.</p>",
      "<p>The change of question is the whole of this step's design. <em>What is wrong with me</em> is the question this state already asks, constantly, and it has never returned anything usable \u2014 it returns more of itself. <em>What was this for</em> asks about function. What it tends to surface is that going small and quiet and hidden is a manoeuvre aimed at something, usually at not being cast out. Things aimed at something were built.</p>",
      "<p><strong>Why Rise rehearses the ordinary</strong></p>",
      "<p>Distance breaks the fusion mechanically. From outside, there's a person and there's a state, and they're two objects. From inside they were one. That separation is what the fourth step is for here, more than the future scene.</p>",
      "<p>The scene itself is deliberately unremarkable. This state instructs you to be hidden; a scene of being ordinarily in view contradicts the instruction without arguing with the verdict. Rehearsing having resolved something about your worth would be rehearsing a scene you have no route to.</p>",
      "<h4>What we rest on</h4>",
      "<p><strong>Compassionate Inquiry \u2014 Gabor Mat\u00e9</strong> \u00b7 <em>clinical practice</em> \u00b7 supplies Release and its register</p>",
      "<p>A response is treated as an adaptation rather than a defect \u2014 something that was doing a job, whether or not it's still the right job. The register of the question decides the answer: <em>what is wrong with me</em> asks about defect and returns answers about defect; <em>what was this for</em> asks about function and returns something workable. Understanding is not endorsement. <em>Here it is the entire mechanism of the third step, because this state's native question is the defect one.</em></p>",
      "<p><em>A clinical practice, not a controlled research programme. Used here for the register of the question and nothing wider. It makes no claim about where any pattern came from, and neither does this platform.</em></p>",
      "<p><strong>Shadow &amp; individuation \u2014 C. G. Jung</strong> \u00b7 <em>interpretive</em> \u00b7 informs Release</p>",
      "<p>What you decline to look at keeps running unattended. The usable test is proportion: when a reaction outruns the event that occasioned it, the surplus is carrying information about something other than the event. There's no finish line and nothing to complete. <em>Here it accounts for why this state attaches to small occasions \u2014 the size of the reaction is rarely about the size of the event.</em></p>",
      "<p><em>Offered as a lens rather than a finding, with no controlled evidence behind it. What it shows you, if anything, is yours to read \u2014 this platform will not tell you what your surplus means.</em></p>",
      "<p><strong>Where the reading is yours</strong> \u2014 this explains the machinery. What the verdict is about, where it came from, and whether any part of it is warranted are readings that belong to you.</p>"
    ],
    cues: []
  },
  "p5-companion": {
    kind: "Somatic Release Activities", title: "Somatic Release Activities", sub: "Between sessions.",
    body: [
      "<p><strong>Long exhale, no ceremony.</strong> Four in, six out, three or four cycles. Available anywhere.</p>",
      "<p><strong>Hand to sternum.</strong> Flat, light, centre of the chest. This state pulls the body inward and accepts warmth there when it accepts very little else.</p>",
      "<p><strong>Shoulders back a little, not straight.</strong> Let the collarbones widen slightly. The inward posture is part of the machinery rather than a sign of it, and the correction doesn't need to be dramatic to register.</p>",
      "<p><strong>Lift your eyes to the horizon of the room.</strong> This state lowers the gaze. Raising it a few degrees \u2014 not staring at anyone, just looking further \u2014 changes something. Do it in a shop, a corridor, anywhere.</p>",
      "<p><strong>Be in view, doing nothing.</strong> Sit in a caf\u00e9, a park, a waiting room. No task, no performance, no requirement to speak. The instruction this state gives is <em>hide</em>; being ordinarily visible contradicts it without any argument.</p>",
      "<p><strong>Warm water on the hands.</strong> Slow, at a sink, longer than necessary. Warmth rather than cold on this protocol \u2014 the cold version belongs on the agitated states.</p>",
      "<p><em>Unclench the jaw when you notice it. It holds here as much as in anger, more quietly.</em></p>"
    ],
    cues: []
  },
  "p5-practice": {
    kind: "Safe Practice", title: "Safe Practice", sub: "*What this practice does*",
    body: [
      "<p>Works with a state that arrives with a verdict attached, using breath, attention and observation. It doesn't dispute the verdict and it doesn't confirm it. It puts space between you and it, which is the thing the state has never had.</p>",
      "<p><strong>Pacing</strong></p>",
      "<p>Once through is a complete use. Use it when the state is there. If four and six is a stretch, shorten both and keep the ratio uneven \u2014 three and five works, two and four works.</p>",
      "<p><strong>What people commonly notice</strong></p>",
      "<p>Resistance to starting at all, which is the state doing what it does. Heat in the face increasing before it settles. Tears at Release, which is ordinary. A pull to stop at Rise, because looking at yourself from outside is uncomfortable when the view is unkind \u2014 go slowly there, or stay out at the distance without describing anything.</p>",
      "<p>Or very little, which is an ordinary result.</p>",
      "<p><strong>When to slow down</strong></p>",
      "<p>If the fourth step turns into an inventory of everything you've done wrong, stop. That's the case restarting inside the step designed to interrupt it. Come back to the breath and end there. You can run three steps.</p>",
      "<p>If Release opens something much larger \u2014 something old, something you weren't looking for \u2014 you can stop and come back to the breath. Surfacing isn't an instruction to follow it, and on this protocol it will surface things more often than most.</p>",
      "<p><strong>When a person in the room is the right tool</strong></p>",
      "<p>Some of what this state attaches to needs another person, and no self-guided practice substitutes for that. Contact someone today \u2014 a doctor, a helpline in your country, or a person you trust \u2014 if you're having thoughts of harming yourself or punishing yourself in any way, if you can't be around people at all, if you're using something to get through it, or if the verdict is now constant rather than episodic.</p>",
      "<p>If what this attaches to is something that was done to you, that is not a pattern to be managed alone. It needs a person, and it isn't a failure of this practice that it needs one.</p>",
      "<p><strong>Alongside other support</strong></p>",
      "<p>If you're with a therapist, doctor or counsellor, this sits alongside that and replaces nothing. This is one of the protocols where having a person is worth a great deal.</p>"
    ],
    cues: []
  },
  "p5-disclosure": {
    kind: "Disclosure & Support", title: "Disclosure & Support", sub: "A script for someone close.",
    body: [
      "<p>This is the hardest state to disclose, because disclosure is the exact thing it's built to prevent. You don't have to say much. Saying anything is the move.</p>",
      "<p><strong>Saying it, minimally</strong> &gt; \"I get into a thing sometimes where I turn on myself pretty hard. I'm not asking you to talk me out of it. I just don't want to be doing it entirely in private.\"</p>",
      "<p><strong>Describing what it's actually like</strong></p>",
      "<blockquote>\"It's physical first \u2014 heat in my face, everything sinking, wanting to be smaller. And it doesn't feel like a mood. It feels like finally seeing something true about myself. That's the part that makes it hard to argue with.\"</blockquote>",
      "<blockquote>\"It usually attaches to something small. The size of the reaction has almost nothing to do with the size of the thing.\"</blockquote>",
      "<p><strong>How to tell it's coming</strong></p>",
      "<blockquote>\"I go quiet and stop looking at people. I start apologising for things that don't need it. I turn down plans with a reason attached.\"</blockquote>",
      "<blockquote>\"If you notice, the useful thing isn't reassurance \u2014 it's just including me. 'Come anyway' does more than 'you're being hard on yourself'.\"</blockquote>",
      "<p><strong>What helps</strong></p>",
      "<blockquote>\"Being around you without having to talk about it. Ordinary company is genuinely the thing.\"</blockquote>",
      "<blockquote>\"If you can say a specific factual thing \u2014 not 'you're great', something like 'you did the thing on Tuesday and it helped' \u2014 that lands. Compliments about who I am bounce off. Facts about what happened don't.\"</blockquote>",
      "<p><strong>What doesn't</strong></p>",
      "<blockquote>\"Being told I'm too hard on myself. I know. Being told makes it another thing I'm getting wrong.\"</blockquote>",
      "<blockquote>\"Being asked what it's about, while it's happening. I usually can't answer that, and trying makes it worse.\"</blockquote>",
      "<p><strong>If they ask what you're doing about it</strong></p>",
      "<blockquote>\"I run a method when it comes. Four steps. First I name it as a state, which sounds small but it's the whole thing \u2014 this one arrives disguised as a fact about me, and calling it a state puts it in a category. Then breathing, four in and six out, with a hand on my chest. Then I stop the case I'm building against myself, which is a separate thing from whatever's actually true. Then I look at myself from across the room, and from out there the person and the verdict are two things instead of one.\"</blockquote>",
      "<p><em>Tell one person. It can be a professional rather than a friend. This state's central instruction is to stay hidden, and telling anyone at all is the move that contradicts it.</em></p>"
    ],
    cues: []
  },
  "p5-record": {
    kind: "Your Record", title: "Your Record", sub: "What changed, in your words.",
    body: [
      "<p>Written on your device and kept there. Your account, in your language, for you to read back \u2014 nobody else sees it, and it's never measured against anything you wrote before.</p>",
      "<p>Any of these, or none. Skipping them entirely is a legitimate use of this resource, and on this protocol it's sometimes the right one.</p>",
      "<p>- Where did it sit in your body? - What was the occasion? Write the actual event, plainly, without the verdict attached. - What did the case bring in? How old was the oldest thing on the list? - Was any of it something that wasn't yours? - <em>What was this for</em> \u2014 what turned up, without needing to answer it? - What did you say to yourself from across the room? Was it something you'd say to somebody else? - What was the ordinary scene? Did you go and be in view? - What did you write here last time? Read it back \u2014 as if someone else wrote it.</p>",
      "<p>That last instruction is deliberate. Reading your own account as though it were someone else's is the same distancing move as the fourth step, and it's usually where people first notice how they're speaking to themselves.</p>"
    ],
    cues: []
  },
  "p5-accountability": {
    kind: "Accountability & Empathy", title: "Accountability & Empathy", sub: "What it does outside you.",
    body: [
      "<p>The protocol trains the interior half of the state. The other half exits \u2014 and this one exits in a way almost nobody recognises as exiting at all.</p>",
      "<p><strong>The specific blind spot here</strong> \u2014 this state exits as withdrawal, and withdrawal is invisible to the person doing it. Declining the invitation. Not replying. Being present and unreachable. Leaving early. From inside, each of those is protecting other people from you. From outside, it's being shut out, repeatedly, by someone who then seems fine with everyone else.</p>",
      "<p><strong>The second one</strong> \u2014 the pre-emptive apology. Apologising for existing in the room, for taking time, for having asked. From inside it's manners. From outside it asks the other person to keep reassuring you that you're welcome, which is a small ongoing tax they didn't agree to and usually can't name.</p>",
      "<p><strong>Their earlier information</strong> \u2014 people close to you often see the onset before you feel it. Worth asking directly: <em>what do you see, before I know?</em></p>",
      "<p><strong>Naming the act, not the character</strong> \u2014 this is the protocol where that distinction matters most, and where it's hardest. <em>\"I cancelled on you three times and didn't say why\"</em> is ownership. <em>\"I'm a burden\"</em> is not \u2014 it's the verdict again, wearing accountability's clothes, and it asks the other person to argue with it.</p>",
      "<p>If your account of yourself is a verdict rather than an act, you haven't done accountability. You've done the state, out loud, at somebody.</p>",
      "<p><strong>No because.</strong> The state is a real reason and it doesn't belong in the sentence.</p>",
      "<p><strong>No self-attack.</strong> On every other protocol that's a guideline. Here it's the whole thing \u2014 self-attack is this state's native mode, and an apology built out of it hands the other person the job of managing your distress about yourself. Ownership is a statement about an act. It is not a verdict on you, and this protocol is where that distinction is worth the most.</p>",
      "<p><strong>Describe what was observable, ask about the rest.</strong> <em>\"I've pulled back a lot lately. I'm not going to tell you what that's been like \u2014 I'd rather you told me.\"</em> Then let them answer without correcting it, and without apologising for the answer.</p>",
      "<p><strong>The checkable change</strong> \u2014 this repairs by showing up rather than by explaining. <em>\"I'm going to come to the thing even when I don't want to, and I'll tell you if I need to leave early\"</em> is small, specific and observable.</p>",
      "<p><strong>Where this stops</strong> \u2014 a reaction is information about the exterior of your state, not a verdict on you. On this protocol especially: this state will take any external information and feed it straight into the case. If that's what's happening, you're not doing this resource \u2014 you're doing the thing the third step asked you to set down. Come back to it another day.</p>"
    ],
    cues: []
  },
  "p6-meditation": {
    kind: "Guided Meditation", title: "Guided Meditation", sub: "Do it with me.",
    body: [
      "<p>Sit somewhere you can stay. Eyes closed if they'll close, or one spot on the floor.</p>",
      "<p>What we're doing here is small and useful: making the carrying cost less. There's no stage you're behind on, and no version of this where it's finished.</p>",
      "<h4>Recognition</h4>",
      "<p>Find where it is in your body, before any of the words.</p>",
      "<p>Chest, often. A weight, or a hollow, and sometimes both at once. The throat. Behind the eyes. Sometimes a tiredness that has nothing to do with sleep.</p>",
      "<p>Now name the state. One word. <strong>Unsteady.</strong></p>",
      "<p>Grief doesn't hold still. It comes in and goes out with no schedule, and the arriving is not a setback. There's nothing here you're doing wrong by being in it today.</p>",
      "<p>Naming it doesn't reduce it. It just means that for a second you were the one looking rather than only the one inside.</p>",
      "<h4>Regulation</h4>",
      "<p>Four counts in.</p>",
      "<p>Six counts out. Longer out than in.</p>",
      "<p>If the breath catches, let it catch. Don't smooth it out. Come back to the count when you can.</p>",
      "<p>Attention into the centre of your chest \u2014 including the part of it that hurts. We're not going around that.</p>",
      "<p>If a hand there helps, put one there.</p>",
      "<p>If crying arrives, that's the session working, not interrupting it.</p>",
      "<h4>Release</h4>",
      "<p>Two things are running, and only one of them is the grief.</p>",
      "<p>The first is the loss, which is not going to be argued with, reduced, or set down. It stays.</p>",
      "<p>The second is the fight with it. Bracing before it arrives. Trying to have it at convenient times. The part of you monitoring whether this is too much grief, or too long, or the wrong kind. And underneath that, often, a low quarrel with the fact of it \u2014 <em>this shouldn't have happened</em>, run again and again against something that already did.</p>",
      "<p>That second thing is the larger expense, and it's the only one you have any say over.</p>",
      "<p>Set down the fight. Only the fight. Not the grief, not the love it's made of, not the person or the thing.</p>",
      "<p>This isn't being at peace with it. Nobody is asking you to accept that it happened in the sense of finding it acceptable. It isn't acceptable. It happened.</p>",
      "<p>And the question. Not <em>what's wrong with me that I'm still like this</em> \u2014 there's a schedule implied in that question and no such schedule exists.</p>",
      "<p><strong>What was this for?</strong></p>",
      "<p>Grief is the shape love takes when the thing it's pointed at isn't there. It isn't a malfunction. It's the cost of having been attached to something, and it's proportionate to that.</p>",
      "<p>Don't answer it. Let it sit there.</p>",
      "<h4>Rise</h4>",
      "<p>Step outside it.</p>",
      "<p>See yourself from across the room. Someone sitting there, carrying something, breathing four and six.</p>",
      "<p>Speak to them as <em>you</em>.</p>",
      "<p><em>You are carrying something heavy. Of course you are.</em></p>",
      "<p>No correction in that sentence. Nothing to fix.</p>",
      "<p>Now forward, and concrete. Not the day this is over \u2014 that day isn't available and building it would be a lie.</p>",
      "<p>Later today, somewhere specific, doing something ordinary, carrying this. Where are you. What's in your hands. What's around you.</p>",
      "<p>Both things at once. That's the whole of what this step is asking. Not instead of the grief. Alongside it.</p>",
      "<p>And one thing that remains. Not something to be grateful for about the loss \u2014 nobody is asking that of you, and anyone who does is wrong. Something that is still here. Something the loss didn't take.</p>",
      "<p>Come back when you're ready. Feet on the floor.</p>",
      "<p>You'll be in this again, probably soon. That isn't a failure of the practice and it isn't a sign of anything. This is a thing you carry, and the practice is about the carrying.</p>",
      "<p>Recognition. Regulation. Release. Rise.</p>"
    ],
    cues: [{"block": 0, "type": "PURPLE/MUSIC", "note": "bed in, 90 BPM, 3/4. Five-bar phrase. Turn at four seconds."}, {"block": 1, "type": "GOLD/PAUSE", "note": ""}, {"block": 4, "type": "GOLD/PAUSE", "note": ""}, {"block": 5, "type": "BLUE/ILLUSTRATION", "note": "a shape with a space in it. The space is part of the form, not damage to it."}, {"block": 6, "type": "GOLD/PAUSE", "note": ""}, {"block": 7, "type": "GOLD/PAUSE", "note": ""}, {"block": 10, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 10, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 11, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 11, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 12, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 12, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 13, "type": "RED/ACTION", "note": "hand to sternum, flat, light. Offered, not instructed."}, {"block": 14, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 14, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 14, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 14, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 15, "type": "GOLD/PAUSE", "note": "extended"}, {"block": 17, "type": "GOLD/PAUSE", "note": ""}, {"block": 19, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 19, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 21, "type": "GOLD/PAUSE", "note": "long"}, {"block": 22, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 22, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 24, "type": "GOLD/PAUSE", "note": "long"}, {"block": 25, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 25, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 29, "type": "BLUE/ILLUSTRATION", "note": "figure at middle distance, room around it, unhurried."}, {"block": 31, "type": "GOLD/PAUSE", "note": ""}, {"block": 32, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 32, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 34, "type": "GOLD/PAUSE", "note": "long"}, {"block": 35, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 35, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 36, "type": "GOLD/PAUSE", "note": ""}, {"block": 36, "type": "PURPLE/MUSIC", "note": "bed lifts, resolves on the turn."}]
  },
  "p6-crisiscard": {
    kind: "Cue Card", title: "Cue Card", sub: "Do it yourself.",
    body: [
      "<blockquote>Second person throughout \u2014 deliberate, not stylistic.</blockquote>",
      "<h4>Front</h4>",
      "<p class=\"sr-cue-line\"><strong>Name it</strong> \u2014 <em>You are unsteady.</em> Arriving isn't a setback.</p>",
      "<p class=\"sr-cue-line\"><strong>Breathe it</strong> \u2014 Four in, six out. Let it catch if it catches.</p>",
      "<p class=\"sr-cue-line\"><strong>Drop the fight</strong> \u2014 Not the grief. Ask <em>what was this for</em>.</p>",
      "<p class=\"sr-cue-line\"><strong>Step out</strong> \u2014 <em>You are carrying something heavy. Of course you are.</em></p>",
      "<h4>Back</h4>",
      "<p><strong>Recognition</strong> \u2014 Find where it sits: chest, throat, behind the eyes, a tiredness unrelated to sleep. Name the state in one word. Grief doesn't hold still and it comes with no schedule \u2014 being in it today isn't something you're doing wrong. Naming it doesn't reduce it. It means for a second you were the one looking.</p>",
      "<p><strong>Regulation</strong> \u2014 Four in, six out. If the breath catches, let it. Attention in the centre of your chest, including the part that hurts \u2014 you're not going around it. Hand there if it helps. If crying arrives, that's the session working.</p>",
      "<p><strong>Release</strong> \u2014 Two things are running. The loss, which stays. And the fight with it \u2014 bracing, trying to have it at convenient times, monitoring whether it's too much or too long, and the quarrel with the fact of it. The fight is the larger expense and the only one you have a say over. Set down the fight, not the grief. This isn't peace with it and it isn't calling it acceptable.</p>",
      "<p><strong>Rise</strong> \u2014 See yourself from a distance. <em>You are carrying something heavy. Of course you are.</em> Then one concrete ordinary scene later today, carrying this \u2014 not the day it's over. Both things at once. Then one thing that remains.</p>"
    ],
    cues: []
  },
  "p6-guide": {
    kind: "How This Works", title: "How This Works", sub: "*What the state is doing*",
    body: [
      "<p>Grief isn't a single state and doesn't behave like one. It moves \u2014 heaviness, agitation, numbness, ordinary functioning, and back \u2014 sometimes within an hour. Unsteady is the accurate label because instability is the characteristic, not any one of the states it passes through.</p>",
      "<p>In the body: weight or hollowness in the chest, tightness in the throat, pressure behind the eyes, and a fatigue disproportionate to activity. Appetite and sleep both change. Attention is unreliable in a way people frequently mistake for something wrong with their mind.</p>",
      "<p><strong>Why nothing here is arranged in stages</strong></p>",
      "<p>Grief doesn't proceed through a sequence, and the widely known stage model was never a description of how bereaved people move through loss. What it produces in practice is a member measuring themselves against a schedule that doesn't exist and concluding they're behind.</p>",
      "<p>There's no completion here, no arc with a good end, and nothing to finish. The practice is about the carrying.</p>",
      "<p><strong>Why the exhale is longer than the inhale</strong></p>",
      "<p>You can't decide a state down. You can decide your breathing, and it's the one reachable control. Lengthening the out-breath relative to the in-breath is what shifts the system toward settled.</p>",
      "<p>The instruction to let the breath catch matters. A caught breath is what the body does under this state, and smoothing it deliberately turns the step into another thing to be managed. The count is somewhere to return to, not a standard to hold.</p>",
      "<p><strong>Why Release targets the fight and not the grief</strong></p>",
      "<p>There's the loss, which stays. And there's the resistance to it \u2014 bracing for its arrival, timing it, monitoring whether it's proportionate, and the low running argument with the fact that it happened.</p>",
      "<p>Two different costs. The first isn't optional \u2014 the loss stays. The second starts again every day, changes nothing, and is the only one you can put down.</p>",
      "<p>Setting the fight down isn't acceptance in the sense of finding the loss acceptable, and it isn't peace with it. The distinction matters because people asked to <em>accept</em> a loss usually hear that they're being asked to approve of it, and refuse \u2014 correctly. What's being set down is the argument with a fact, not the feeling about it.</p>",
      "<p>The change of question does related work. <em>What's wrong with me that I'm still like this</em> has a timetable built into it. <em>What was this for</em> asks about function, and what it surfaces is that grief is proportionate to attachment \u2014 the cost of having been attached to something, rather than a malfunction to be corrected.</p>",
      "<p><strong>Why Rise rehearses carrying rather than finishing</strong></p>",
      "<p>Rehearsing the day it's over is rehearsing a scene you have no route to. Rehearsing an ordinary hour, carried out while carrying this, is a scene that's actually available \u2014 and it's the one that transfers.</p>",
      "<p>The final move asks for something that remains, not for gratitude about the loss. Gratitude for a loss is not a thing this platform will ask anyone for.</p>",
      "<h4>What we rest on</h4>",
      "<p><strong>Compassionate Inquiry \u2014 Gabor Mat\u00e9</strong> \u00b7 <em>clinical practice</em> \u00b7 supplies Release and its register</p>",
      "<p>A response is treated as an adaptation rather than a defect \u2014 something that was doing a job. The register of the question decides the answer: <em>what is wrong with me</em> asks about defect and returns answers about defect; <em>what was this for</em> asks about function and returns something workable. <em>Here it removes the implied timetable from the question people ask themselves about grief.</em></p>",
      "<p><em>A clinical practice, not a controlled research programme. Used here for the register of the question and nothing wider.</em></p>",
      "<p><strong>Non-resistance \u2014 Alan Watts</strong> \u00b7 <em>interpretive</em> \u00b7 informs why the third step says <em>accept</em></p>",
      "<p>The state is one thing. The fight with the state is a second thing. The fight usually costs more, and it's the only one of the two you can put down. Setting the fight down isn't passivity, isn't approval, and isn't agreement that the situation is acceptable. <em>Here it is the distinction the whole protocol turns on \u2014 the loss stays, the quarrel with the fact of it doesn't have to.</em></p>",
      "<p><em>Watts is an interpreter rather than an originator; the older sources are Laozi and, for the framing used here, D. T. Suzuki. Offered as a lens rather than a finding.</em></p>",
      "<p><strong>Where the reading is yours</strong> \u2014 this explains the machinery. What your grief means, what the relationship was, and what you carry forward from it are readings that belong entirely to you.</p>"
    ],
    cues: []
  },
  "p6-companion": {
    kind: "Somatic Release Activities", title: "Somatic Release Activities", sub: "Between sessions.",
    body: [
      "<p><strong>Long exhale, no ceremony.</strong> Four in, six out. If it catches, let it catch.</p>",
      "<p><strong>Hand to sternum.</strong> Flat, light, centre of the chest. Warmth and contact at the place the weight sits.</p>",
      "<p><strong>Weight into the chair or the ground.</strong> Press down, feel it push back, hold for a slow five. Grief makes the body feel unsupported and this is a direct contradiction of that, at the level the body reads.</p>",
      "<p><strong>Walk without a destination.</strong> Not exercise and not a task. Movement with nothing required of it. This state tolerates walking when it tolerates almost nothing else.</p>",
      "<p><strong>Warm water on the hands, or a hot drink held.</strong> Held rather than drunk. Warmth in the hands is one of the few inputs that reliably registers.</p>",
      "<p><strong>Be near people without talking to them.</strong> A caf\u00e9, a park, a shop. Undirected proximity, nothing required of you. This state isolates, and the isolation compounds it.</p>",
      "<p><em>If you need to lie on the floor, lie on the floor. Getting lower is a real option and it isn't giving up.</em></p>"
    ],
    cues: []
  },
  "p6-practice": {
    kind: "Safe Practice", title: "Safe Practice", sub: "*What this practice does*",
    body: [
      "<p>Works with a state that moves and doesn't resolve, using breath, attention and observation. It doesn't reduce grief, doesn't shorten it, and doesn't move you through anything. It makes the carrying less expensive.</p>",
      "<p><strong>Pacing</strong></p>",
      "<p>Use it when you want it. There's no rate that's correct and no interval that means anything. Some people use it daily for a period and then rarely. Both are ordinary.</p>",
      "<p>If four and six is a stretch, shorten both and keep the ratio uneven.</p>",
      "<p><strong>What people commonly notice</strong></p>",
      "<p>Crying, often, and often at the Regulation step rather than where they expected. Grief arriving harder during the session than before it \u2014 that's the state having room rather than the practice going wrong. Exhaustion afterwards. Long stretches of feeling almost nothing, which people worry about and which is an ordinary part of this.</p>",
      "<p><strong>When to slow down</strong></p>",
      "<p>If the session opens something you're not ready to be in on your own, stop and come back to the breath, and end there. That's not a failure. Grief is one of the few states where stopping partway through is often the correct decision.</p>",
      "<p>Anniversaries, birthdays and the ordinary dates are heavier and arrive with less warning than people expect. Using the protocol before one rather than during it is worth knowing about.</p>",
      "<p><strong>When a person in the room is the right tool</strong></p>",
      "<p>Grief is not a condition and doesn't need treating. But it isn't meant to be carried alone, and a self-guided practice is not company.</p>",
      "<p>Contact someone \u2014 a doctor, a bereavement service, a helpline in your country, or a person you trust \u2014 if you're having thoughts of harming yourself or of not being here, if you can't eat or sleep across an extended period, if you're using something to get through the days, if you can't function at all rather than functioning badly, or if the loss was sudden, violent, or a death by suicide. That last one specifically: it carries things ordinary bereavement support isn't built for, and there are services specifically for it in most countries.</p>",
      "<p>If the loss is recent \u2014 days or a few weeks \u2014 a practice is not the priority. People are. Come back to this when you want it.</p>",
      "<p><strong>Alongside other support</strong></p>",
      "<p>If you're with a therapist, doctor, counsellor or bereavement service, this sits alongside that and replaces nothing.</p>"
    ],
    cues: []
  },
  "p6-disclosure": {
    kind: "Disclosure & Support", title: "Disclosure & Support", sub: "A script for someone close.",
    body: [
      "<p>People want to help and have no idea what to do, so they either avoid the subject or produce something clumsy. Telling them what actually helps spares everyone.</p>",
      "<p><strong>Saying it</strong> &gt; \"I'm still in it. I know it's been a while by everyone else's clock. I'd rather say that than keep performing being fine.\"</p>",
      "<p><strong>Describing what it's actually like</strong></p>",
      "<blockquote>\"It isn't constant. It comes and goes with no pattern, and it can arrive over nothing \u2014 a song, a supermarket aisle. That's the part people don't expect, and it's why I sometimes go strange out of nowhere.\"</blockquote>",
      "<blockquote>\"It's physical. Weight in my chest, throat closing, tired in a way sleep doesn't touch. And my concentration is genuinely worse. That's not me being distant from you.\"</blockquote>",
      "<p><strong>What helps</strong></p>",
      "<blockquote>\"Say their name. People avoid it and the avoiding is worse than the mentioning. I'd rather hear it than have everyone step around it.\"</blockquote>",
      "<blockquote>\"Specific offers rather than 'let me know if you need anything'. I won't let you know. 'I'm bringing food Thursday' is something I can accept.\"</blockquote>",
      "<blockquote>\"Just be around. You don't have to say anything at all, and it's better if you don't try to.\"</blockquote>",
      "<p><strong>What doesn't</strong></p>",
      "<blockquote>\"Anything with a silver lining in it. That they're at peace, or it was their time, or that I'll be stronger for this. I know it's meant kindly and it lands as being asked to feel better for your benefit.\"</blockquote>",
      "<blockquote>\"Asking how I'm doing in a particular voice. Just ask normally, or don't ask.\"</blockquote>",
      "<p><strong>If they ask what you're doing about it</strong></p>",
      "<blockquote>\"There's a method I run. It doesn't fix anything and it isn't meant to \u2014 there's nothing here to fix. It makes the carrying cost less. I name the state, do a breathing pattern, stop fighting the fact that it's happening, and then look at it from a bit of distance and get on with an ordinary hour while still carrying it.\"</blockquote>",
      "<blockquote>\"The main thing it did was stop me measuring myself against a schedule that doesn't exist.\"</blockquote>",
      "<p><strong>If you need to say the hard version</strong> &gt; \"I don't want to be talked out of this. I want someone to sit near me while I'm in it. That's the whole ask.\"</p>",
      "<p><em>Tell someone. This is the state that most reliably isolates the person in it, and the isolation is produced by the grief rather than chosen.</em></p>"
    ],
    cues: []
  },
  "p6-record": {
    kind: "Your Record", title: "Your Record", sub: "What changed, in your words.",
    body: [
      "<p>Written on your device and kept there. Your account, in your language, for you to read back \u2014 nobody else sees it, and it's never measured against anything you wrote before.</p>",
      "<p>There's no arc here and nothing accumulating toward a good end. Some entries will be much worse than earlier ones and that means nothing about how you're doing.</p>",
      "<p>Any of these, or none.</p>",
      "<p>- Where did it sit in your body today? - What brought it in? Sometimes there's nothing. Write that if there's nothing. - What was the fight today \u2014 bracing, timing it, monitoring it, or arguing with the fact of it? - What did you say to yourself from across the room? - What was the ordinary thing you did while carrying it? - What remains? Something the loss didn't take. - Is there anything you'd want to say to them, that you can write here instead? - What did you write here last time? Read it back, without comparing.</p>"
    ],
    cues: []
  },
  "p6-accountability": {
    kind: "Accountability & Empathy", title: "Accountability & Empathy", sub: "What it does outside you.",
    body: [
      "<p>The protocol trains the interior half of the state. The other half exits \u2014 and grief's exterior is one of the least discussed, because nobody wants to be the person raising it with someone bereaved.</p>",
      "<p><strong>The specific blind spot here</strong> \u2014 grief exits as unpredictability. Fine on Tuesday, unreachable on Wednesday, sharp with someone on Thursday over nothing. From inside, each of those is just what the day was. From outside, the people around you are walking on ground that moves, and they've stopped knowing which version of you they're going to get.</p>",
      "<p><strong>The second one</strong> \u2014 the disappearing. Not returning calls, letting things lapse, being unavailable for months. From inside it's having nothing to give. From outside it's being dropped, and the people who care most usually say nothing about it because raising it feels like an accusation against someone who's grieving.</p>",
      "<p><strong>Their earlier information</strong> \u2014 people close to you often see the day going before you feel it. Worth asking: <em>what do you see, before I know?</em></p>",
      "<p><strong>Naming the act, not the character</strong> \u2014 <em>\"I snapped at you on Thursday over the thing with the car\"</em> is ownership. <em>\"I've been impossible\"</em> is not; it names nothing and it invites them to say it's understandable, which lets both of you skip it.</p>",
      "<p><strong>No because.</strong> And this one is unusually hard, because the because is enormous and everybody already knows it. It's still a defence when it's attached to the sentence. Grief explains conduct. It doesn't dissolve it, and the person on the receiving end knows that even if they'd never say so.</p>",
      "<p><strong>No self-attack.</strong> <em>\"I'm a mess, I'm sorry, I don't know why anyone bothers\"</em> asks them to reassure you, which is a thing they've probably been doing for months already.</p>",
      "<p><strong>Describe what was observable, ask about the rest.</strong> <em>\"I've been unreliable for a while and I've stopped asking how you are. I'd rather hear what that's been like than assume.\"</em></p>",
      "<p><strong>The checkable change</strong> \u2014 grief repairs by flagging rather than by improving. <em>\"I'm going to tell you when it's a bad day instead of just going quiet\"</em> is small, specific, observable, and doesn't require you to be different.</p>",
      "<p><strong>Where this stops</strong> \u2014 this resource is not an instruction to be less grieving for other people's comfort, and it isn't a suggestion that you owe anyone a better performance. It's the missing half of the information about your own state. A reaction is data about the exterior, not a verdict on you. And if you're not up to this today, that's a legitimate answer \u2014 this is the one resource on this protocol you can leave for a long time.</p>"
    ],
    cues: []
  },
  "p7-meditation": {
    kind: "Guided Meditation", title: "Guided Meditation", sub: "Do it with me.",
    body: [
      "<p>You're here. That's the hard part done, and it's more than it looks like from where you're sitting.</p>",
      "<p>This one starts differently. Sit or lie down, whichever is nearer. Eyes open or closed, either.</p>",
      "<p>You may not feel much of this. That's expected, and it isn't a sign it isn't working.</p>",
      "<h4>Before we start \u2014 move something</h4>",
      "<p>Wiggle your toes. That's all.</p>",
      "<p>Now your fingers. One hand is enough.</p>",
      "<p>Press your feet into whatever's under them. Not hard. Just enough to notice the floor is there.</p>",
      "<p>That's the first step done. We're not going to do anything larger than that for a while.</p>",
      "<h4>Recognition</h4>",
      "<p>One word. We're not going hunting for it.</p>",
      "<p><strong>Numb.</strong></p>",
      "<p>That's the whole step. You don't have to find where it sits in your body \u2014 in this state that's often hard, and not finding it is part of the state rather than a failure to look.</p>",
      "<p>Numb isn't nothing. It's a state your body has moved into, and it moved there for a reason. It's doing something.</p>",
      "<p>You noticed you're in it. That's the part that matters, and you've done it.</p>",
      "<h4>Regulation</h4>",
      "<p>Now some contact, before any counting.</p>",
      "<p>Put a hand on your chest, or hold your own arm. Whichever is easier to arrange.</p>",
      "<p>Let it stay there. Warmth and pressure is the input this state takes when it won't take much else.</p>",
      "<p>Now the breath, gently, and it doesn't have to be four and six today.</p>",
      "<p>Longer out than in. That's the only part that matters.</p>",
      "<p>If you want the count, it's four in and six out. If counting is too much right now, don't count. Just longer out than in.</p>",
      "<p>Nothing to achieve here.</p>",
      "<h4>Release</h4>",
      "<p>Two things are running, and this is the one that surprises people.</p>",
      "<p>There's the shutdown. And there's what you're doing about the shutdown \u2014 the low steady contempt for being like this. <em>Pathetic. Lazy. Everyone else manages.</em></p>",
      "<p>That runs underneath, quietly, all day. It isn't gentler than the loud states. It's just quieter.</p>",
      "<p>Let the state be here. It arrived. It isn't being argued with and it isn't being ranked against how you were last month.</p>",
      "<p>Put down the contempt. Only that.</p>",
      "<p>And the question. Not <em>what's wrong with me that I can't function</em> \u2014 you've been asking that all week and it's returned nothing.</p>",
      "<p><strong>What was this for?</strong></p>",
      "<p>Shutting down is something a body does when what's arriving is more than it can meet, and mobilising isn't working or isn't available. It's protective. It's expensive, but it's protective.</p>",
      "<p>This isn't nothing happening. It's something happening, at a level you don't have direct access to.</p>",
      "<p>Leave the question there. No answer needed today.</p>",
      "<h4>Rise</h4>",
      "<p>Step outside it, and gently.</p>",
      "<p>See yourself from across the room. Someone sitting or lying there, hand on their chest.</p>",
      "<p>Speak to them as <em>you</em>.</p>",
      "<p><em>You are shut down today. You did this anyway.</em></p>",
      "<p>Both halves of that.</p>",
      "<p>Now forward, and make it very small. Not the day you're back to yourself \u2014 that scene isn't available and building it would be a lie.</p>",
      "<p>One thing. Standing up. A glass of water. Opening a window. Where are you, and what's the first movement.</p>",
      "<p>Small is not a lower version of this step. On a day like today, small is the whole of it.</p>",
      "<p>And one thing that's still here. Not something you're grateful for. Something that exists. The floor. The light. That you got this far.</p>",
      "<p>Come back when you're ready, and slowly. This state doesn't like being stood up quickly.</p>",
      "<p>You may feel nothing different. That's an ordinary result here, more than anywhere else on this platform, and it doesn't mean nothing happened.</p>",
      "<p>Recognition. Regulation. Release. Rise. You did all four.</p>"
    ],
    cues: [{"block": 0, "type": "PURPLE/MUSIC", "note": "bed in, 90 BPM, 3/4. Five-bar phrase. Turn at four seconds. Enters later than on other protocols and sits lower."}, {"block": 1, "type": "GOLD/PAUSE", "note": ""}, {"block": 2, "type": "GOLD/PAUSE", "note": ""}, {"block": 4, "type": "RED/ACTION", "note": "small deliberate movement. Offered, never insisted on."}, {"block": 5, "type": "GOLD/PAUSE", "note": "long"}, {"block": 6, "type": "GOLD/PAUSE", "note": "long"}, {"block": 7, "type": "GOLD/PAUSE", "note": "long"}, {"block": 10, "type": "GOLD/PAUSE", "note": ""}, {"block": 11, "type": "GOLD/PAUSE", "note": "long"}, {"block": 12, "type": "BLUE/ILLUSTRATION", "note": "a still surface with movement beneath it. The surface is not the whole of it."}, {"block": 12, "type": "GOLD/PAUSE", "note": ""}, {"block": 13, "type": "GOLD/PAUSE", "note": ""}, {"block": 16, "type": "RED/ACTION", "note": "hand to sternum or to the opposite arm. Offered, not instructed."}, {"block": 17, "type": "GOLD/PAUSE", "note": "long"}, {"block": 18, "type": "GOLD/PAUSE", "note": ""}, {"block": 19, "type": "TEAL/BREATH", "note": "in, slow"}, {"block": 19, "type": "TEAL/BREATH", "note": "out, longer"}, {"block": 20, "type": "TEAL/BREATH", "note": "in, slow"}, {"block": 20, "type": "TEAL/BREATH", "note": "out, longer"}, {"block": 21, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 21, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 21, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 21, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 21, "type": "GOLD/PAUSE", "note": "extended"}, {"block": 24, "type": "GOLD/PAUSE", "note": ""}, {"block": 26, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 26, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 28, "type": "GOLD/PAUSE", "note": "long"}, {"block": 30, "type": "GOLD/PAUSE", "note": "long"}, {"block": 31, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 31, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 36, "type": "BLUE/ILLUSTRATION", "note": "figure at middle distance, room around it, unhurried."}, {"block": 38, "type": "GOLD/PAUSE", "note": ""}, {"block": 39, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 39, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 41, "type": "GOLD/PAUSE", "note": "long"}, {"block": 42, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 42, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 43, "type": "GOLD/PAUSE", "note": ""}, {"block": 43, "type": "PURPLE/MUSIC", "note": "bed lifts, resolves on the turn."}]
  },
  "p7-crisiscard": {
    kind: "Cue Card", title: "Cue Card", sub: "Do it yourself.",
    body: [
      "<blockquote>Second person throughout \u2014 deliberate, not stylistic.</blockquote>",
      "<h4>Front</h4>",
      "<p><em>Before you start \u2014 move something. Toes, fingers, feet into the floor. That's all it takes to begin.</em></p>",
      "<p class=\"sr-cue-line\"><strong>Name it</strong> \u2014 <em>You are numb.</em> One word. Don't go hunting for where.</p>",
      "<p class=\"sr-cue-line\"><strong>Contact, then breath</strong> \u2014 Hand on your chest. Longer out than in. Count only if you can.</p>",
      "<p class=\"sr-cue-line\"><strong>Put down the contempt</strong> \u2014 Not the state. Ask <em>what was this for</em>.</p>",
      "<p class=\"sr-cue-line\"><strong>One small thing</strong> \u2014 Standing up. A glass of water.</p>",
      "<h4>Back</h4>",
      "<p><strong>Move first</strong> \u2014 Before anything else, move something small. Toes, fingers, feet pressed into the floor. In this state movement comes before attention, because attention is the part that's reduced.</p>",
      "<p><strong>Recognition</strong> \u2014 One word. <em>Numb.</em> Don't search for where it sits \u2014 in this state that's often hard, and not finding it is part of the state rather than a failure to look. Numb isn't nothing; it's a state your body moved into for a reason.</p>",
      "<p><strong>Regulation</strong> \u2014 Contact before counting. A hand on your chest, or hold your own arm. Warmth and pressure is what this state takes when it won't take much else. Then breathe, longer out than in. Four and six if you can. If counting is too much, don't count.</p>",
      "<p><strong>Release</strong> \u2014 Two things are running. The shutdown, and the contempt for being in it \u2014 <em>pathetic, lazy, everyone else manages</em>. That runs underneath all day and it isn't gentler for being quiet. Put down the contempt. Keep the state. Ask <em>what was this for</em> and leave it open.</p>",
      "<p><strong>Rise</strong> \u2014 See yourself from a distance. <em>You are shut down today. You did this anyway.</em> Then one very small thing: standing up, a glass of water, opening a window. Small isn't a lesser version of this step. Today it's the whole of it.</p>"
    ],
    cues: []
  },
  "p7-guide": {
    kind: "How This Works", title: "How This Works", sub: "*What the state is doing*",
    body: [
      "<p>Shutdown is the third of the three broad conditions the body moves between \u2014 not settled, not mobilised, but reduced. It's what a system does when what's arriving is more than it can meet and mobilising either isn't working or isn't available.</p>",
      "<p>In the body: heaviness, a sense of distance from your own limbs, flattened sensation, slowed thought, and a marked drop in the capacity to start things. Sensation is muffled rather than absent, which is why locating anything precisely is hard.</p>",
      "<p>None of that is nothing happening. It's something happening, at a level below deliberate access.</p>",
      "<p><strong>Why movement comes before attention</strong></p>",
      "<p>Every other protocol opens by asking you to find where the state sits and hold attention there. In this state, sustained attention is precisely the faculty that has reduced \u2014 so opening that way asks for the thing that's least available and produces a member who concludes they've failed at step one.</p>",
      "<p>Small deliberate movement doesn't require it. Toes, fingers, feet against the floor \u2014 these are motor actions with immediate proprioceptive return, and they work whether or not attention is holding. They also confirm the body is responsive, which is information this state does not currently have.</p>",
      "<p><strong>Why Recognition is one word here</strong></p>",
      "<p>Naming the state is doing the same job as everywhere else: putting a small distance between you and it. But the hunt for a bodily location, which is useful in the mobilised states, tends to fail here and the failure gets read as personal.</p>",
      "<p>So the step is reduced to the naming and nothing else. Not finding a location is characteristic of the state, not a shortfall in looking.</p>",
      "<p><strong>Why contact comes before the count</strong></p>",
      "<p>Warmth and pressure at the sternum or on the arm is a direct physical input that requires nothing of you. It registers when finer inputs don't.</p>",
      "<p>The breath then does what it does everywhere \u2014 lengthening the out-breath relative to the in-breath shifts the system toward settled. The count is offered rather than required on this protocol, because in a reduced state counting can itself become a demand, and a demand is what the state has too much of already.</p>",
      "<p><strong>Why Release goes after the contempt</strong></p>",
      "<p>There's the shutdown, and there's the running commentary about being in it \u2014 <em>pathetic, lazy, everyone else manages</em>.</p>",
      "<p>Two different costs. The commentary is quieter than the loud states' loops but it runs continuously and it doesn't clear. It also adds load to a system that entered this state because of load, which is the part that makes it more than a matter of tone.</p>",
      "<p>Putting it down isn't approving of the state. It's stopping the second thing.</p>",
      "<p>The change of question does the rest. <em>What is wrong with me that I can't function</em> asks about defect and returns answers about defect, and it's the question already running. <em>What was this for</em> asks about function \u2014 and what it surfaces is that reducing is protective, expensive, and a response rather than an absence of one.</p>",
      "<p><strong>Why Rise stays small</strong></p>",
      "<p>Rehearsing a return to normal function is rehearsing a scene there's no route to today, and the system doesn't take it. Rehearsing standing up, or a glass of water, is a scene that's actually available. That's the one that transfers, and on this protocol small is the whole step rather than a reduced version of it.</p>",
      "<h4>What we rest on</h4>",
      "<p><strong>Polyvagal Theory \u2014 Stephen Porges</strong> \u00b7 <em>peer-reviewed</em> \u00b7 supplies Recognition and the three state labels</p>",
      "<p>Threat detection runs ahead of thought. The body reads a situation and moves before deliberation catches up. Porges describes three broad conditions: settled and socially available, mobilised for action, and shut down. Agitated, Unsteady and Numb are the member-facing names for those three. <em>This protocol works entirely in the third, and the account of shutdown as a protective response rather than a failure is where the whole approach comes from.</em></p>",
      "<p><em>The anatomical premises are contested: a 2026 evaluation in</em> Clinical Neuropsychiatry <em>challenged them, with Porges replying in the same issue. The state distinctions are what this platform uses, and they hold independently of that dispute.</em></p>",
      "<p><strong>Cardiac coherence \u2014 HeartMath</strong> \u00b7 <em>peer-reviewed</em> \u00b7 supplies Regulation and the count</p>",
      "<p>At roughly six breath cycles a minute, heart rhythm and breath settle into a single smooth wave rather than two competing ones, close to a rhythm the body's blood-pressure regulation already runs at. Four in, six out lands near that rate. The uneven ratio is the mechanism. <em>Here the ratio is kept and the count is optional \u2014 the relationship between in and out is what does the work, not the numbers.</em></p>",
      "<p><em>The finding is used here; the wider programme is not. There is no measurement of coherence anywhere on this platform and no score attached to any breath.</em></p>",
      "<p><strong>Where the reading is yours</strong> \u2014 this explains the machinery. What brought this on, what it means, and what to do next are readings that belong to you.</p>"
    ],
    cues: []
  },
  "p7-companion": {
    kind: "Somatic Release Activities", title: "Somatic Release Activities", sub: "Between sessions.",
    body: [
      "<p>Smaller than on any other protocol, deliberately. Any one of these on its own is a complete use.</p>",
      "<p><strong>Move one small thing.</strong> Toes, fingers, ankles. Movement before attention, always, in this state.</p>",
      "<p><strong>Feet into the floor.</strong> Press down, feel it push back. Confirms the ground is there and that you're getting a return.</p>",
      "<p><strong>Hand to sternum, or hold your own arm.</strong> Warmth and pressure. The input this state takes when it takes little else.</p>",
      "<p><strong>Longer out than in.</strong> Three or four breaths. No counting required.</p>",
      "<p><strong>Stand up.</strong> That's the whole item. Standing is a different physiological position from sitting and this state settles into whatever position it finds.</p>",
      "<p><strong>Open a window, or go to a door.</strong> Air and light on skin, briefly. Nothing further required.</p>",
      "<p><strong>Say one sentence out loud.</strong> To anyone, or to nobody. Voice is one of the things that goes quiet first, and using it is a direct contradiction of the state.</p>",
      "<p><em>Warm water on the hands, held longer than necessary, is worth knowing about on the days none of the rest is available.</em></p>"
    ],
    cues: []
  },
  "p7-practice": {
    kind: "Safe Practice", title: "Safe Practice", sub: "*What this practice does*",
    body: [
      "<p>Works with a reduced state, using movement, contact, breath and observation. It doesn't ask you to be more active than you are, and it treats getting through it as a complete use.</p>",
      "<p><strong>Pacing</strong></p>",
      "<p>Any single part of this is a complete use. Moving your toes and stopping there counts. There is no requirement to reach the fourth step, and stopping early is not a partial anything.</p>",
      "<p><strong>What people commonly notice</strong></p>",
      "<p>Feeling nothing during or after, which is more common on this protocol than anywhere else on the platform and does not mean nothing happened. Heaviness increasing before it eases. Emotion arriving suddenly as the state lifts \u2014 sometimes tears, sometimes anger \u2014 which is what tends to happen when a reduced state comes up rather than a sign of something going wrong. Tiredness.</p>",
      "<p><strong>When to slow down</strong></p>",
      "<p>If the practice itself feels like one more demand, do a single item from the somatic list instead and leave the session. That's a correct decision, not an avoidance of one.</p>",
      "<p>If emotion arrives hard as the state lifts and you're on your own with it, stop and let it be there, and consider whether there's someone you could be near.</p>",
      "<p><strong>When this needs a person rather than a practice</strong></p>",
      "<p>Reduced states are the ones people most often carry alone and longest, because the state itself removes the impulse to reach for anyone.</p>",
      "<p>Contact someone today \u2014 a doctor, a helpline in your country, or a person you trust \u2014 if you're having thoughts of harming yourself or of not being here, if you haven't been able to eat, wash or leave the house for days, if you can't remember when this started, if you're using something to get through it, or if this has been going on for weeks rather than days.</p>",
      "<p>That last one particularly. A day like this is ordinary. A month like this is a reason to see a doctor, and going is not an admission of anything.</p>",
      "<p><strong>If you're not sure you can make the call</strong></p>",
      "<p>Ask someone else to make it, or send a message rather than speaking. <em>\"I need to see someone and I can't do the phone today\"</em> sent to one person is enough, and it's a legitimate way to do it.</p>",
      "<p><strong>Alongside other support</strong></p>",
      "<p>If you're with a therapist, doctor or counsellor, this sits alongside that and replaces nothing. This is one of the protocols where having a person matters most.</p>"
    ],
    cues: []
  },
  "p7-disclosure": {
    kind: "Disclosure & Support", title: "Disclosure & Support", sub: "A script for someone close.",
    body: [
      "<p>This state removes the impulse to tell anyone, which is what makes it the one most worth having a script for. You can send any of these as a message rather than saying them.</p>",
      "<p><strong>Saying it</strong> &gt; \"I've gone quite flat. It isn't a mood exactly \u2014 it's more that everything's got heavy and far away. I'd rather tell you than have you think I've gone cold on you.\"</p>",
      "<p><strong>Describing what it's actually like</strong></p>",
      "<blockquote>\"It's physical. Heavy, slowed down, a bit distant from my own body. Starting anything is the hard part \u2014 not doing it, starting it.\"</blockquote>",
      "<blockquote>\"The thing people misread is that it isn't sadness. It's more like the volume's been turned down on everything, including the bad stuff.\"</blockquote>",
      "<p><strong>How to tell it's coming</strong></p>",
      "<blockquote>\"I stop replying to things. I go still. I say I'm fine in a flat voice. I stop suggesting anything.\"</blockquote>",
      "<blockquote>\"If you notice, the useful thing is specific and small \u2014 'I'm coming round at four' rather than 'let me know if you need anything'. I won't let you know. That's the state, not me not wanting to.\"</blockquote>",
      "<p><strong>What helps</strong></p>",
      "<blockquote>\"Turn up. You don't have to do anything. Being in the room with me is genuinely most of it.\"</blockquote>",
      "<blockquote>\"Do a small thing rather than ask what I need. Put the kettle on. Open a window. Go for a short walk with me. Decisions are the expensive part right now.\"</blockquote>",
      "<p><strong>What doesn't</strong></p>",
      "<blockquote>\"Being encouraged to snap out of it, or told about someone who had it worse. And big plans \u2014 anything that needs me to be organised lands as another thing I'm failing.\"</blockquote>",
      "<p><strong>If they ask what you're doing about it</strong></p>",
      "<blockquote>\"There's a method I run. It starts smaller than the others \u2014 move something, then just name the state, then a hand on my chest before any breathing. Then I stop the running commentary about being pathetic for being like this, which turns out to cost more than the state does. Then one very small next thing.\"</blockquote>",
      "<blockquote>\"It doesn't fix it. It stops me adding to it.\"</blockquote>",
      "<p><strong>If you need someone to act</strong> &gt; \"I need to see a doctor and I can't face arranging it. Could you help me do that this week?\"</p>",
      "<p><em>Tell one person. This is the state that most reliably keeps people silent, and the silence is produced by the state rather than chosen.</em></p>"
    ],
    cues: []
  },
  "p7-record": {
    kind: "Your Record", title: "Your Record", sub: "What changed, in your words.",
    body: [
      "<p>Written on your device and kept there. Your account, in your language, for you to read back \u2014 nobody else sees it, and it's never measured against anything you wrote before.</p>",
      "<p>One line is a complete entry. On this protocol especially, writing nothing is a legitimate use.</p>",
      "<p>- What did you manage today? Anything at all. - Could you find where it sat in your body, or not? Either answer is fine. - What did the commentary say? Write the actual words it used. - <em>What was this for</em> \u2014 anything, or nothing? Nothing is a real answer. - What did you say to yourself from across the room? - What was the small thing? Did you do it? - Is anything different from yesterday? Including no. - What did you write here last time? Read it back \u2014 without comparing today to it.</p>"
    ],
    cues: []
  },
  "p7-accountability": {
    kind: "Accountability & Empathy", title: "Accountability & Empathy", sub: "What it does outside you.",
    body: [
      "<p>The protocol trains the interior half of the state. The other half exits \u2014 and this one exits as absence, which is the hardest kind to see from inside because from inside it feels like nothing happening at all.</p>",
      "<p><strong>The specific blind spot here</strong> \u2014 shutdown exits as not-doing. Unanswered messages. Plans that quietly lapse. Being in the room and not in it. From inside, each is not a decision \u2014 it's the absence of the capacity to make one. From outside, the difference between <em>couldn't</em> and <em>didn't</em> is invisible, and what lands is being dropped.</p>",
      "<p><strong>The second one</strong> \u2014 the flat <em>I'm fine</em>. From inside it's the only available answer. From outside it's a door closing, repeatedly, on someone who keeps trying it.</p>",
      "<p><strong>Their earlier information</strong> \u2014 people close to you usually see it before you do, because the first signs are things you stop doing rather than things you start.</p>",
      "<p><strong>Naming the act, not the character</strong> \u2014 <em>\"I didn't reply to you for three weeks and I didn't say why\"</em> is ownership. <em>\"I'm a waste of space\"</em> is not; it names nothing, it's the commentary again, and it asks them to argue with it.</p>",
      "<p><strong>No because.</strong> And this is the protocol where the because is most true and most tempting. It still doesn't belong in the sentence. It can be said afterwards, if they ask.</p>",
      "<p><strong>No self-attack.</strong> On this protocol that's the whole thing, because the state's own commentary is already self-attack running all day. An apology built out of it is the state, out loud, at somebody \u2014 and it hands them the job of reassuring you about the thing you did to them.</p>",
      "<p><strong>Describe what was observable, ask about the rest.</strong> <em>\"I went quiet on you for a long time. I'm not going to tell you what that was like \u2014 I'd rather you told me.\"</em> Then let them answer without correcting it.</p>",
      "<p><strong>The checkable change</strong> \u2014 this repairs by sending something rather than by improving. <em>\"When I go under, I'll send you one line saying so, even if that's all I can manage\"</em> is small, specific, observable, and doesn't require you to be different.</p>",
      "<p><strong>Where this stops</strong> \u2014 this resource is not an instruction to be less shut down for other people's convenience, and you don't owe anyone a better performance. If today isn't the day for this one, that's a legitimate answer \u2014 it's the resource on this protocol you can leave for as long as you need to.</p>"
    ],
    cues: []
  },
  "p8-meditation": {
    kind: "Guided Meditation", title: "Guided Meditation", sub: "Do it with me.",
    body: [
      "<p>Sit somewhere you can stay a while. Eyes closed if they'll close, or one spot on the floor.</p>",
      "<p>This works on the state, and it leaves your read of the situation exactly where it is. Whatever you think is happening might be happening \u2014 that question stays open.</p>",
      "<h4>Recognition</h4>",
      "<p>Find where it is in your body, before any of the words.</p>",
      "<p>Stomach, usually. A turning-over. Sometimes heat up through the chest and into the face. Sometimes a coldness instead, which surprises people. A restlessness in the hands.</p>",
      "<p>Now name the state. One word. <strong>Unsteady.</strong></p>",
      "<p>Notice what that word leaves out. It leaves out them. It leaves out the other person, what they have, what they did, what you saw.</p>",
      "<p>This state comes with a lot of content attached \u2014 a whole scene, usually, with people in it. Underneath the scene there's a state, running in a body. That's what we've got hold of.</p>",
      "<p>The scene can wait.</p>",
      "<h4>Regulation</h4>",
      "<p>Four counts in.</p>",
      "<p>Six counts out. Longer out than in.</p>",
      "<p>Attention into the centre of your chest.</p>",
      "<p>If a hand there helps, put one there.</p>",
      "<p>This state pulls hard toward looking. Checking a phone, a profile, a room. Not now. The count first.</p>",
      "<h4>Release</h4>",
      "<p>Two things are running.</p>",
      "<p>There's the state. And there's the comparing \u2014 running yourself against them, over and over, in a contest nobody called and nobody is judging.</p>",
      "<p>Each round produces the same result, and each round puts your body straight back where it started.</p>",
      "<p>Let the state stand. It's here, it's uncomfortable, it isn't being argued with.</p>",
      "<p>Set down the comparing. Only the comparing.</p>",
      "<p>And the question. Not <em>what's wrong with me that I'm this person</em> \u2014 you've asked that already and it gave you nothing.</p>",
      "<p><strong>What was this for?</strong></p>",
      "<p>Here's what tends to turn up. Jealousy points at something. Not always at the person \u2014 often past them, at something you want and haven't said out loud, sometimes not even to yourself.</p>",
      "<p>The size of it is worth noticing too. When a reaction is much bigger than the thing that caused it, the extra is about something. Not necessarily about them.</p>",
      "<p>Don't work it out now. Just let the question sit there instead of the other one.</p>",
      "<h4>Rise</h4>",
      "<p>Step outside it.</p>",
      "<p>See yourself from across the room. Someone sitting there with their phone face-down, breathing four and six.</p>",
      "<p>Speak to them as <em>you</em>.</p>",
      "<p><em>You want something. That's all this is so far.</em></p>",
      "<p>No verdict in that. Nothing about whether you deserve it, or whether they do.</p>",
      "<p>Now forward, and concrete. Not the scene where they lose something. That one costs you and changes nothing.</p>",
      "<p>You, later, doing something that's actually yours. Where are you. What's in your hands. What are you making, or asking for, or starting.</p>",
      "<p>Specific. A general resolve to be less jealous does nothing. The particular thing you'd be doing does.</p>",
      "<p>And one thing already yours. Not compared to anyone. Just yours, and here.</p>",
      "<p>Come back. Feet on the floor. Phone still face-down.</p>",
      "<p>The state may still be here. It doesn't clear in one go. What's changed is that it's pointing somewhere now instead of just running.</p>",
      "<p>Recognition. Regulation. Release. Rise.</p>"
    ],
    cues: [{"block": 0, "type": "PURPLE/MUSIC", "note": "bed in, 90 BPM, 3/4. Five-bar phrase. Turn at four seconds."}, {"block": 1, "type": "GOLD/PAUSE", "note": ""}, {"block": 4, "type": "GOLD/PAUSE", "note": ""}, {"block": 5, "type": "BLUE/ILLUSTRATION", "note": "two shapes, one lit and one in shadow, the shadow slightly larger."}, {"block": 6, "type": "GOLD/PAUSE", "note": ""}, {"block": 8, "type": "GOLD/PAUSE", "note": ""}, {"block": 11, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 11, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 12, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 12, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 13, "type": "RED/ACTION", "note": "hand to sternum, flat, light. Offered, not instructed."}, {"block": 14, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 14, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 15, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 15, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 15, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 15, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 15, "type": "GOLD/PAUSE", "note": "extended"}, {"block": 17, "type": "GOLD/PAUSE", "note": ""}, {"block": 19, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 19, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 21, "type": "GOLD/PAUSE", "note": "long"}, {"block": 23, "type": "GOLD/PAUSE", "note": "long"}, {"block": 24, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 24, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 25, "type": "GOLD/PAUSE", "note": ""}, {"block": 29, "type": "BLUE/ILLUSTRATION", "note": "figure at middle distance, room around it, unhurried."}, {"block": 31, "type": "GOLD/PAUSE", "note": ""}, {"block": 32, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 32, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 34, "type": "GOLD/PAUSE", "note": "long"}, {"block": 35, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 35, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 36, "type": "GOLD/PAUSE", "note": ""}, {"block": 36, "type": "PURPLE/MUSIC", "note": "bed lifts, resolves on the turn."}]
  },
  "p8-crisiscard": {
    kind: "Cue Card", title: "Cue Card", sub: "Do it yourself.",
    body: [
      "<blockquote>Second person throughout \u2014 deliberate, not stylistic.</blockquote>",
      "<h4>Front</h4>",
      "<p class=\"sr-cue-line\"><strong>Name it</strong> \u2014 <em>You are unsteady.</em> The state, not the scene.</p>",
      "<p class=\"sr-cue-line\"><strong>Breathe it</strong> \u2014 Four in, six out. Phone down. Hand to your chest.</p>",
      "<p class=\"sr-cue-line\"><strong>Stop comparing</strong> \u2014 Ask <em>what was this for</em>, not <em>what's wrong with me</em>.</p>",
      "<p class=\"sr-cue-line\"><strong>Step out</strong> \u2014 <em>You want something. That's all this is so far.</em></p>",
      "<h4>Back</h4>",
      "<p><strong>Recognition</strong> \u2014 Find it in your body first: stomach turning over, heat through the chest, sometimes cold instead. Name the state in one word. Leave them out of the naming \u2014 this state arrives with a whole scene attached, and underneath the scene is a state running in a body. That's the part you can work on. The scene can wait.</p>",
      "<p><strong>Regulation</strong> \u2014 Four in, six out. Attention in the centre of your chest, hand there if it helps. This state pulls hard toward looking \u2014 a phone, a profile, a room. The count first. Looking after, if you still want to.</p>",
      "<p><strong>Release</strong> \u2014 Two things are running. The state, which turned up on its own. And the comparing \u2014 running yourself against them, again and again, in a contest nobody called. Every round gives the same result and puts you back at the start. Set down the comparing. Keep the state. Ask <em>what was this for</em> and leave it open.</p>",
      "<p><strong>Rise</strong> \u2014 See yourself from a distance. <em>You want something. That's all this is so far.</em> Then one concrete scene, later, doing something that's actually yours \u2014 not the scene where they lose. Then one thing already yours, uncompared.</p>"
    ],
    cues: []
  },
  "p8-guide": {
    kind: "How This Works", title: "How This Works", sub: "*What the state is doing*",
    body: [
      "<p>This is an unsettled state rather than a fully mobilised one. In the body: the stomach turning over, heat rising through the chest and face, sometimes a coldness instead, restlessness in the hands, and attention that locks onto one person and won't move off.</p>",
      "<p>It has a comparing shape. Where anger moves toward and fear moves away, this one measures \u2014 you against them, repeatedly, on whatever dimension is live.</p>",
      "<p><strong>Why Recognition leaves the other person out</strong></p>",
      "<p>This state arrives with unusual amounts of content attached: a scene, a cast, a history, often a plausible case. That content is what makes it feel like information rather than a state.</p>",
      "<p>Some of it may be accurate. But while the state and the scene are fused, working on the state feels like conceding the scene \u2014 so people stay in it. Naming the state without naming them separates the two, and the scene is still there afterwards, unchanged, to be looked at from somewhere steadier.</p>",
      "<p><strong>Why the exhale is longer than the inhale</strong></p>",
      "<p>You can't decide a state down. You can decide your breathing, and it's the one reachable control on a system you otherwise can't get at. Lengthening the out-breath relative to the in-breath is what shifts the system toward settled. Contact at the sternum is a related signal and one of the quickest available.</p>",
      "<p><strong>Why Release goes after the comparing</strong></p>",
      "<p>There's the state, and there's the comparing \u2014 running yourself against them, again and again.</p>",
      "<p>Two different costs. The comparing feels like assessment, or like facing facts. But it returns the same answer every round, it doesn't finish, and each pass puts the body back where it started. Nothing comes out of it.</p>",
      "<p>Setting it down isn't deciding you don't mind. It's stopping a measurement that was never going to produce a number.</p>",
      "<p>The change of question does the rest. <em>What is wrong with me that I'm like this</em> asks about defect and returns answers about defect. <em>What was this for</em> asks about function \u2014 and what it usually surfaces is that the state is pointing at something wanted and unsaid. Often the other person is standing in front of the thing rather than being the thing.</p>",
      "<p><strong>The size of it is information</strong></p>",
      "<p>When a reaction is much larger than the event that caused it, the extra is carrying something. That's the one interpretive move this protocol makes, and it's offered as a way of looking rather than as a fact: the surplus is worth attending to, and what it turns out to be about is yours to work out.</p>",
      "<p>Understanding what a response was doing is not the same as endorsing it, and it says nothing about whether your read of the situation is correct.</p>",
      "<p><strong>Why Rise rehearses your own thing</strong></p>",
      "<p>Rehearsing a scene where the other person loses something is rehearsing an event you don't control, and it changes nothing about your position. Rehearsing yourself doing the thing you actually want is a scene that's available. That's the one that transfers \u2014 and it's the practical form of what the third step just surfaced.</p>",
      "<h4>What we rest on</h4>",
      "<p><strong>Shadow &amp; individuation \u2014 C. G. Jung</strong> \u00b7 <em>interpretive</em> \u00b7 informs Release</p>",
      "<p>What you decline to look at keeps running unattended, and you tend to meet it as other people's faults. The usable test is proportion: when a reaction outruns the event that occasioned it, the surplus is carrying information about something other than the event. There's no finish line and nothing to complete. <em>Here it is the reason the size of the reaction is treated as data rather than as something to be ashamed of.</em></p>",
      "<p><em>Offered as a lens rather than a finding, with no controlled evidence behind it. What it shows you, if anything, is yours to read \u2014 this platform will not tell you what your surplus means.</em></p>",
      "<p><strong>Compassionate Inquiry \u2014 Gabor Mat\u00e9</strong> \u00b7 <em>clinical practice</em> \u00b7 supplies Release and its register</p>",
      "<p>A response is treated as an adaptation rather than a defect. The register of the question decides the answer: <em>what is wrong with me</em> asks about defect and returns answers about defect; <em>what was this for</em> asks about function and returns something workable. Understanding is not endorsement. <em>Here it turns a state most people are ashamed of into one they can look at directly.</em></p>",
      "<p><em>A clinical practice, not a controlled research programme. Used here for the register of the question and nothing wider.</em></p>",
      "<p><strong>Where the reading is yours</strong> \u2014 this explains the machinery. What your jealousy is pointing at, whether your read of the situation is right, and what to do about it are readings that belong to you.</p>"
    ],
    cues: []
  },
  "p8-companion": {
    kind: "Somatic Release Activities", title: "Somatic Release Activities", sub: "Between sessions.",
    body: [
      "<p><strong>Phone face-down, out of reach.</strong> Not away forever \u2014 further than an arm. The looking is a physical loop and putting distance into it interrupts the loop rather than the wanting.</p>",
      "<p><strong>Long exhale, no ceremony.</strong> Four in, six out, three or four cycles. Available anywhere.</p>",
      "<p><strong>Hand to sternum.</strong> Flat, light, centre of the chest. Warmth where the heat sits.</p>",
      "<p><strong>Unclench the hands.</strong> This state closes the grip quietly, without the heat that anger brings. Open them, spread the fingers, let them go soft.</p>",
      "<p><strong>Do one thing that's yours.</strong> Twenty minutes on the thing you'd be doing if nobody else existed. Not as a distraction \u2014 as the actual answer to what the state was pointing at.</p>",
      "<p><strong>Walk somewhere with people in it.</strong> A shop, a street. This state feeds on isolation and on screens, and undirected proximity to actual people interrupts both.</p>",
      "<p><em>Cool water on the wrists helps when the heat is the main thing.</em></p>"
    ],
    cues: []
  },
  "p8-practice": {
    kind: "Safe Practice", title: "Safe Practice", sub: "*What this practice does*",
    body: [
      "<p>Works with the state, using breath, attention and observation. It doesn't tell you whether what you suspect is happening, and it doesn't tell you what your jealousy means. It gets you steady enough to look at the situation with a system that isn't narrowed.</p>",
      "<p><strong>Pacing</strong></p>",
      "<p>Once through is a complete use. Use it when the state is there. If four and six is a stretch, shorten both and keep the ratio uneven.</p>",
      "<p><strong>What people commonly notice</strong></p>",
      "<p>Shame arriving alongside the jealousy, sometimes larger than it \u2014 this is one of the few states people are embarrassed to admit to, and the embarrassment often runs hotter than the thing itself. That's ordinary.</p>",
      "<p>A strong pull to check something immediately after finishing. Worth waiting out; the protocol works better as a delay than as a preparation.</p>",
      "<p>Something unrelated surfacing at the third step \u2014 an old ambition, something you gave up on. That's usually the point rather than a distraction.</p>",
      "<p><strong>When to slow down</strong></p>",
      "<p>If Release opens something much larger than today's situation, you can stop there and come back to the breath.</p>",
      "<p>If the comparing continues right through the session and won't drop at all, end it and use the somatic activities instead. Repeating the protocol while the loop is running teaches your body that the protocol is part of the loop.</p>",
      "<p><strong>When a person in the room is the right tool</strong></p>",
      "<p>Contact someone \u2014 a doctor, a helpline in your country, or a person you trust \u2014 if you're checking or monitoring someone in ways you'd be uncomfortable describing out loud, if you can't be around a specific person at all, if you're using something to manage it, or if you're having thoughts of harming yourself.</p>",
      "<p><strong>Where this affects someone else</strong></p>",
      "<p>If the state has turned into monitoring another person \u2014 their phone, their movements, their messages, who they're with \u2014 that has crossed from a state you're managing into conduct affecting somebody else, and it's worth telling a professional rather than working on privately. That's a straightforward observation, not a judgement.</p>",
      "<p>If someone is monitoring <em>you</em>, this protocol will help you stay steady and is not a way to manage them. Your safety and your privacy are separate questions from your regulation and they come first.</p>",
      "<p><strong>Alongside other support</strong></p>",
      "<p>If you're with a therapist, doctor or counsellor, this sits alongside that and replaces nothing.</p>"
    ],
    cues: []
  },
  "p8-advisory": {
    kind: "Proximity Guide", title: "Proximity Guide", sub: "How close to stay.",
    body: [
      "<p>This state usually has a live external source \u2014 a person, a rivalry, a feed. How much contact you have is real, and it's often the part you have most say over.</p>",
      "<p>Three tiers. Which one yours belongs in is your read, on information nobody here has.</p>",
      "<p><strong>Worth staying engaged with</strong></p>",
      "<p>The comparison is uncomfortable but the contact is genuinely good for you. You'd miss them. When you've named something, it was received rather than used against you. Your reaction is roughly proportionate and settles once it's been named.</p>",
      "<p>Distance isn't the tool here. Saying it is \u2014 once, plainly \u2014 and the protocol is what makes you fit to. The Invitation to Repair is written for this tier.</p>",
      "<p><strong>Worth reducing the surface area of</strong></p>",
      "<p>Contact reliably produces the state, and naming it changed nothing. Where your reaction consistently exceeds the event. Where you've noticed you're managing your own behaviour to look unbothered.</p>",
      "<p>Reduction here is rarely dramatic. It's specific: muting rather than unfollowing, fewer occasions, not being the one who checks, a feed you stop opening at night. Reducing the surface area is a real option and isn't the same as ending anything.</p>",
      "<p>This is also the tier where the surplus is worth attending to. Where the reaction is much bigger than the event, the extra is about something \u2014 and quite often not about them.</p>",
      "<p><strong>Past what self-regulation is for</strong></p>",
      "<p>Where someone is deliberately provoking it. Where you're being kept uncertain as a way of managing you. Where information is withheld and then produced. Where you're frightened.</p>",
      "<p>That isn't a regulation problem, and treating it as one converts a situation needing other people into a private failure of coping. What it needs is a doctor, a helpline, or a friend who knows the whole picture rather than the version you can bear to tell.</p>",
      "<p><strong>Using this</strong></p>",
      "<p>Notice the tier. Then notice whether it's the tier you'd assign if a friend described the same thing. Where it goes next is yours \u2014 this platform doesn't tell members to leave or stay, and nobody here knows what you'd be giving up.</p>"
    ],
    cues: []
  },
  "p8-disclosure": {
    kind: "Disclosure & Support", title: "Disclosure & Support", sub: "A script for someone close.",
    body: [
      "<p>This is a hard one to say out loud, because the word itself carries a verdict. Most people would rather admit to almost anything else. Saying it plainly is most of the work.</p>",
      "<p><strong>Saying it</strong> &gt; \"I've been getting jealous about something and I don't like it much. I'm telling you because carrying it privately is making it bigger, not because I want you to fix it.\"</p>",
      "<p><strong>Describing what it's actually like</strong></p>",
      "<blockquote>\"It's physical. Stomach turns over, heat up through my chest, and my attention locks onto one thing and won't move. That all happens before I've thought anything.\"</blockquote>",
      "<blockquote>\"The part that's hardest to explain is the comparing. It runs on a loop, gives the same answer every time, and I can't switch it off by deciding to.\"</blockquote>",
      "<p><strong>How to tell it's coming</strong></p>",
      "<blockquote>\"I go quiet in a specific way. I start checking things. I get strangely light and jokey about a subject I clearly mind about.\"</blockquote>",
      "<blockquote>\"If you notice, the useful thing is direct and small \u2014 'you've gone quiet, is this about the thing?' Being named gently takes most of the charge out of it.\"</blockquote>",
      "<p><strong>What helps</strong></p>",
      "<blockquote>\"Facts rather than reassurance. A specific true thing about what's actually happening lands. 'You've got nothing to worry about' bounces straight off.\"</blockquote>",
      "<blockquote>\"If it's about you, telling me the thing before I find it out is worth an enormous amount. Not being surprised is most of it.\"</blockquote>",
      "<p><strong>What doesn't</strong></p>",
      "<blockquote>\"Being told I'm being ridiculous. I know. Knowing hasn't stopped it once, and now I've got to hide it as well as have it.\"</blockquote>",
      "<p><strong>If it's about them, and you want to say so</strong> &gt; \"I got jealous about something and I want to say it out loud rather than let it turn into a mood you have to work out. I'm not accusing you of anything.\"</p>",
      "<p><strong>If they ask what you're doing about it</strong></p>",
      "<blockquote>\"There's a method I run. Four steps. First I name it as a state rather than as the whole scene it comes with. Then breathing, four in and six out, with my phone face-down. Then I stop the comparing, which is the loop that keeps it going. Then I look at it from a distance \u2014 and the useful bit is that it's usually pointing at something I want and haven't said.\"</blockquote>",
      "<p><em>Tell one person. It can be a professional. This is the state people most reliably keep entirely private, and privacy is what lets it grow.</em></p>"
    ],
    cues: []
  },
  "p8-repair": {
    kind: "Invitation to Repair", title: "Invitation to Repair", sub: "Reopening it with them.",
    body: [
      "<p>Send it from the far side of the protocol, not the middle. From inside the state, an invitation reads as an accusation with a question mark on the end, and gets answered as one.</p>",
      "<p><strong>The rule that makes it sendable:</strong> no prosecution of them, and no request that they change to manage your state. <em>\"Can you stop being so friendly with him?\"</em> is not an invitation. It's a request to be managed, and it will be resented even if granted.</p>",
      "<p><strong>Sendable</strong> &gt; There's something I want to say rather than carry around. &gt; &gt; I've been jealous about something, and I'd rather tell you than have it come out sideways in how I am with you. I'm not accusing you of anything and I'm not asking you to change what you're doing. &gt; &gt; I'd just rather you knew. And if there's anything you want to say back, I'd want to hear it.</p>",
      "<p><strong>Shorter</strong> &gt; I've been jealous about something and I'd rather say it than let it become a mood. Not an accusation. Just telling you.</p>",
      "<p><strong>Where you've behaved badly with it</strong> &gt; I've been checking up on you, and I don't want to be someone who does that. I'm not going to explain why, because an explanation would be a defence. I'd rather hear what it's been like from your side.</p>",
      "<p><strong>Where it's a friend rather than a partner</strong> &gt; Something's been off with me around you lately and it's mine, not yours. I've been comparing myself to you and it's made me strange. I'd rather say that than keep being slightly distant about it.</p>",
      "<p><strong>Before sending</strong> \u2014 read it back for a request in disguise. If the message would only be successful if they changed something, it isn't an invitation. Also look for the case: <em>always, never, you clearly, obviously.</em> Cut them.</p>",
      "<p><em>If they don't take it, you've done the part that was yours. Whether they meet it is theirs, and always was.</em></p>"
    ],
    cues: []
  },
  "p8-record": {
    kind: "Your Record", title: "Your Record", sub: "What changed, in your words.",
    body: [
      "<p>Written on your device and kept there. Your account, in your language, for you to read back \u2014 nobody else sees it, and it's never measured against anything you wrote before.</p>",
      "<p>Any of these, or none.</p>",
      "<p>- Where did it sit in your body? - What was the actual event? Write it plainly, without the reading attached. - What was the comparison? On what dimension, exactly? - Was the size of the reaction proportionate to the event? If not, how far off? - <em>What was this for</em> \u2014 what turned up, without needing to answer it? - What is it you want? Write it even if it seems unreasonable, even if it isn't about them at all. - What did you say to yourself from across the room? - Is this the same jealousy as last time, with different people in it? - What did you write here last time? Read it back.</p>"
    ],
    cues: []
  },
  "p8-accountability": {
    kind: "Accountability & Empathy", title: "Accountability & Empathy", sub: "What it does outside you.",
    body: [
      "<p>The protocol trains the interior half of the state. The other half exits \u2014 and this one exits in ways that are unusually hard to see, because most of it is done privately.</p>",
      "<p><strong>The specific blind spot here</strong> \u2014 this state exits as withdrawal of warmth. Slightly less generous. Slightly slower to congratulate. A flatness when their good news comes up. From inside, each of those is you managing yourself and saying nothing. From outside, it's the person closest to your success being the one who seems least pleased about it, and they usually notice long before you do.</p>",
      "<p><strong>The second one</strong> \u2014 the small diminishing. The qualifying remark, the joke with an edge, the <em>well, they had help.</em> From inside it's a passing thought said out loud. From outside it's a pattern, and it's the one that damages friendships quietly over years.</p>",
      "<p><strong>The third one, where it applies</strong> \u2014 checking. Looking at what you weren't invited to look at. From inside it's needing to know. From outside it's a breach, and it stays a breach regardless of what you found.</p>",
      "<p><strong>Their earlier information</strong> \u2014 people close to you often see it before you feel it. Worth asking directly: <em>what do you see, before I know?</em></p>",
      "<p><strong>Naming the act, not the character</strong> \u2014 <em>\"I went quiet when you told me about the promotion, and I never said congratulations properly\"</em> is ownership. <em>\"I'm a jealous person\"</em> is not; it names nothing, it's a verdict, and it asks them to talk you out of it.</p>",
      "<p><strong>No because.</strong> The want underneath is real and it doesn't belong in the sentence. It can be said afterwards, if they ask.</p>",
      "<p><strong>No self-attack.</strong> <em>\"I'm horrible, I don't know why you put up with me\"</em> hands them the job of reassuring you about the thing you did to them.</p>",
      "<p><strong>Describe what was observable, ask about the rest.</strong> <em>\"I've been flat with you about your news. I'm not going to tell you what that was like \u2014 I'd rather you told me.\"</em> Then let them answer without correcting it.</p>",
      "<p><strong>The checkable change</strong> \u2014 this repairs by saying the good thing out loud, promptly, and by not qualifying it. <em>\"I'm going to congratulate you properly when things go well for you\"</em> is small, specific and immediately observable.</p>",
      "<p><strong>Where this stops</strong> \u2014 a reaction is information about the exterior of your state, not a verdict on you. If someone is deliberately provoking this state, their account of your conduct isn't a reliable one. And if the checking has become monitoring, that needs a professional rather than a repair conversation.</p>"
    ],
    cues: []
  },
  "p9-meditation": {
    kind: "Guided Meditation", title: "Guided Meditation", sub: "Do it with me.",
    body: [
      "<p>Sit somewhere you can stay. Eyes closed if they'll close, or one spot on the floor.</p>",
      "<p>This works on the state and puts some ground under you. It leaves the opinion where it is \u2014 reassurance is something you'd have argued with anyway, so we're doing something else.</p>",
      "<h4>Recognition</h4>",
      "<p>Find where it is in your body, before any of the words.</p>",
      "<p>Chest, often \u2014 something unsteady rather than heavy. The stomach. A tightness in the throat that arrives just before speaking. Hands that want something to do.</p>",
      "<p>Now name the state. One word. <strong>Unsteady.</strong></p>",
      "<p>That word is doing something precise. It describes how you're standing, not what you're worth.</p>",
      "<p>Because this state has an opinion attached, and the opinion presents itself as a fact you've finally noticed. <em>Not enough. Not really. Found out eventually.</em></p>",
      "<p>We're not going to argue with it. Arguing gives it something to answer. We're going to notice that it's a state, and states have a shape and a location and a name.</p>",
      "<h4>Regulation</h4>",
      "<p>Four counts in.</p>",
      "<p>Six counts out. Longer out than in.</p>",
      "<p>Attention into the centre of your chest.</p>",
      "<p>Press your feet into the floor. Feel the floor push back. This state is unsteady and the floor is not.</p>",
      "<p>Nothing to be good at here. Nobody's watching this bit.</p>",
      "<h4>Release</h4>",
      "<p>Two things are running.</p>",
      "<p>There's the state. And there's the auditing \u2014 checking yourself against everyone in the room, replaying what you said, working out how it landed, deciding what it revealed about you.</p>",
      "<p>It feels like being careful. It runs constantly and it never clears you.</p>",
      "<p>Let the state be here. It arrived, it's uncomfortable, it isn't being argued with.</p>",
      "<p>Set down the auditing. Only the auditing.</p>",
      "<p>And the question. Not <em>what's wrong with me</em> \u2014 that's the question the auditing is already asking, on repeat, and it has never once returned an answer you could use.</p>",
      "<p><strong>What was this for?</strong></p>",
      "<p>Watching yourself closely in a room is a skill. It was learned somewhere, and it was learned because at some point it was useful to know exactly how you were landing.</p>",
      "<p>It's still running. It hasn't been told the situation changed.</p>",
      "<p>Don't work out where it came from. That's not today's job, and this platform isn't going to tell you.</p>",
      "<h4>Rise</h4>",
      "<p>Step outside it.</p>",
      "<p>See yourself from across the room. Someone sitting there, feet on the floor, breathing four and six.</p>",
      "<p>Speak to them as <em>you</em>, not <em>I</em>.</p>",
      "<p><em>You are unsteady today. That's a state, and it's a state you've been in before.</em></p>",
      "<p>Notice something about being out here. From this distance there's a person, and there's an opinion about the person, and they're two things. From inside, they were one thing.</p>",
      "<p>Now forward, and concrete. Not the scene where you feel confident \u2014 that one isn't available on demand and building it would be a lie.</p>",
      "<p>The scene where you do the thing anyway, unsteady. Where are you. What are you about to say. What are your hands doing. What's the first sentence.</p>",
      "<p>Unsteady and doing it. Both. That's the scene, and it's the one that's actually available.</p>",
      "<p>And one thing already true. Something you did, not something you are. Small and factual.</p>",
      "<p>Come back. Feet on the floor.</p>",
      "<p>The opinion may still be here. It doesn't get overturned in one go and nothing here pretended it would. What's changed is that there's a bit of ground under you, and some space between you and it.</p>",
      "<p>Recognition. Regulation. Release. Rise.</p>"
    ],
    cues: [{"block": 0, "type": "PURPLE/MUSIC", "note": "bed in, 90 BPM, 3/4. Five-bar phrase. Turn at four seconds."}, {"block": 1, "type": "GOLD/PAUSE", "note": ""}, {"block": 4, "type": "GOLD/PAUSE", "note": ""}, {"block": 5, "type": "BLUE/ILLUSTRATION", "note": "a form on an uneven base. Upright. Not falling."}, {"block": 6, "type": "GOLD/PAUSE", "note": ""}, {"block": 8, "type": "GOLD/PAUSE", "note": "long"}, {"block": 11, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 11, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 12, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 12, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 13, "type": "RED/ACTION", "note": "feet flat, pressed into the floor. Offered, not instructed."}, {"block": 14, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 14, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 14, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 14, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 15, "type": "GOLD/PAUSE", "note": "extended"}, {"block": 17, "type": "GOLD/PAUSE", "note": ""}, {"block": 19, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 19, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 21, "type": "GOLD/PAUSE", "note": "long"}, {"block": 23, "type": "GOLD/PAUSE", "note": "long"}, {"block": 24, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 24, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 29, "type": "BLUE/ILLUSTRATION", "note": "figure at middle distance, room around it, unhurried."}, {"block": 31, "type": "GOLD/PAUSE", "note": ""}, {"block": 32, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 32, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 34, "type": "GOLD/PAUSE", "note": "long"}, {"block": 35, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 35, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 36, "type": "GOLD/PAUSE", "note": ""}, {"block": 36, "type": "PURPLE/MUSIC", "note": "bed lifts, resolves on the turn."}]
  },
  "p9-crisiscard": {
    kind: "Cue Card", title: "Cue Card", sub: "Do it yourself.",
    body: [
      "<blockquote>Second person throughout \u2014 deliberate, not stylistic. On this protocol it carries most of the work: <em>you</em> is what puts space between the person and the opinion.</blockquote>",
      "<h4>Front</h4>",
      "<p class=\"sr-cue-line\"><strong>Name it</strong> \u2014 <em>You are unsteady.</em> How you're standing, not what you're worth.</p>",
      "<p class=\"sr-cue-line\"><strong>Breathe it</strong> \u2014 Four in, six out. Feet into the floor.</p>",
      "<p class=\"sr-cue-line\"><strong>Stop auditing</strong> \u2014 Ask <em>what was this for</em>, not <em>what's wrong with me</em>.</p>",
      "<p class=\"sr-cue-line\"><strong>Step out</strong> \u2014 <em>Unsteady, and doing it anyway.</em></p>",
      "<h4>Back</h4>",
      "<p><strong>Recognition</strong> \u2014 Find it in your body first: chest, stomach, a tightness in the throat before speaking. Name the state in one word. That word describes how you're standing, not what you're worth. This state comes with an opinion attached that presents itself as a fact you've finally noticed. Don't argue with it \u2014 arguing gives it something to answer.</p>",
      "<p><strong>Regulation</strong> \u2014 Four in, six out. Attention in the centre of your chest. Press your feet into the floor and feel it push back \u2014 the state is unsteady and the floor isn't. Nothing to be good at here.</p>",
      "<p><strong>Release</strong> \u2014 Two things are running. The state, and the auditing \u2014 checking yourself against the room, replaying what you said, working out what it revealed. It feels like being careful. It runs constantly and it never clears you. Set down the auditing. Ask <em>what was this for</em> and leave it open.</p>",
      "<p><strong>Rise</strong> \u2014 See yourself from a distance. From out there, the person and the opinion about the person are two things; from inside they were one. Then one concrete scene: doing the thing anyway, unsteady. Not the scene where you feel confident. Then one thing you did \u2014 not something you are.</p>"
    ],
    cues: []
  },
  "p9-guide": {
    kind: "How This Works", title: "How This Works", sub: "*What the state is doing*",
    body: [
      "<p>This is an unsettled state rather than a fully mobilised one. In the body: an unsteadiness through the chest, something turning in the stomach, tightness in the throat immediately before speaking, restlessness in the hands, and a raised sensitivity to how a room is responding.</p>",
      "<p>That last part is the distinguishing feature. Attention is turned outward, monitoring, and simultaneously turned inward, evaluating the returns. Both at once, continuously.</p>",
      "<p><strong>Why the state comes with an opinion</strong></p>",
      "<p>Like shame, this state doesn't describe a situation \u2014 it describes you, and it presents that description as an observation rather than as a symptom. <em>Not enough. Not really. Found out eventually.</em></p>",
      "<p>Arguing with it fails, reliably. Counter-evidence gives the auditing something new to process, and it will find the flaw in it. That's why nothing on this protocol attempts reassurance.</p>",
      "<p>What Recognition does instead is give the opinion a category. Naming the state doesn't dispute the content; it changes the status of the content from fact to symptom. A symptom can be worked on. A fact can only be argued with.</p>",
      "<p><strong>Why the exhale is longer, and why the feet</strong></p>",
      "<p>You can't decide a state down. You can decide your breathing, and it's the one reachable control. Lengthening the out-breath relative to the in-breath is what shifts the system toward settled.</p>",
      "<p>The feet do something specific here. This state is characterised by unsteadiness, and pressure against a fixed surface is the most direct available contradiction of that \u2014 not as a metaphor, but because the body registers support and stops registering it unless attention is sent there.</p>",
      "<p><strong>Why Release goes after the auditing</strong></p>",
      "<p>There's the state, and there's the auditing \u2014 checking yourself against the room, replaying what you said, working out how it landed.</p>",
      "<p>Two different costs. The auditing feels like conscientiousness. But it runs whether or not anything happened, it finds something every time, and it never returns a verdict of fine. It doesn't finish, which is the tell.</p>",
      "<p>The change of question is the whole design of this step. <em>What is wrong with me</em> is precisely what the auditing already asks, all day. Asking it again inside a protocol would be running the loop with better lighting. <em>What was this for</em> asks about function instead \u2014 and what tends to surface is that close self-monitoring in a room is a learned skill, learned because knowing exactly how you were landing was once useful information.</p>",
      "<p>It's still running. It hasn't been told the situation changed. Where it was learned is not something this platform will tell you, and working it out is not required for the protocol to do its job.</p>",
      "<p><strong>Why Rise rehearses doing it anyway</strong></p>",
      "<p>Observing an experience from outside it lowers distress at the time and reactivity afterwards; distraction does neither. Second-person self-address is one of the reliable ways to produce that shift, which is why the cue card says <em>you</em>.</p>",
      "<p>There's a second effect on this protocol specifically. From the outside, there's a person and there's an opinion about the person, and they're two objects. From inside they were one. That separation is most of what the fourth step is for here.</p>",
      "<p>The forward scene has to be concrete, and on this protocol it also has to include the state. Rehearsing feeling confident is rehearsing something you can't produce on demand, and the system doesn't accept it. Rehearsing doing the thing while unsteady is a scene that's actually available, and it's the one that transfers.</p>",
      "<h4>What we rest on</h4>",
      "<p><strong>Shadow &amp; individuation \u2014 C. G. Jung</strong> \u00b7 <em>interpretive</em> \u00b7 informs Release</p>",
      "<p>What you decline to look at keeps running unattended. The usable test is proportion: when a reaction outruns the event that occasioned it, the surplus is carrying information about something other than the event. There's no finish line and nothing to complete. <em>Here it accounts for why an ordinary remark can produce a disproportionate day.</em></p>",
      "<p><em>Offered as a lens rather than a finding, with no controlled evidence behind it. What it shows you, if anything, is yours to read \u2014 this platform will not tell you what your surplus means.</em></p>",
      "<p><strong>Distance &amp; rehearsal \u2014 Kross &amp; Ayduk, with King</strong> \u00b7 <em>peer-reviewed</em> \u00b7 supplies Rise</p>",
      "<p>Observing an experience from outside it, rather than from inside looking out, lowers distress and later reactivity. Distraction does neither. Second-person self-address is one of the reliable ways to produce that shift. Rehearsing a specific future scene in concrete detail lifts outlook; general optimism does not. <em>Here it is what separates you from the opinion about you \u2014 two objects from outside, one from inside.</em></p>",
      "<p><em>The effect is on the person rehearsing. It acts on your own steadiness and makes no claim to act on anyone else, or on how anything turns out.</em></p>",
      "<p><strong>Where the reading is yours</strong> \u2014 this explains the machinery. What the opinion is about, where it was learned, and whether any part of it is warranted are readings that belong to you.</p>"
    ],
    cues: []
  },
  "p9-companion": {
    kind: "Somatic Release Activities", title: "Somatic Release Activities", sub: "Between sessions.",
    body: [
      "<p><strong>Feet into the floor.</strong> Press both down steadily, feel the floor push back, hold for a slow five. The most direct thing available for a state whose whole signature is unsteadiness. Works sitting, standing, in a meeting.</p>",
      "<p><strong>Long exhale, no ceremony.</strong> Four in, six out, three or four cycles. Available anywhere.</p>",
      "<p><strong>Both forearms on the surface in front of you.</strong> Weight through them. This state holds the arms slightly lifted and ready; putting them down changes something.</p>",
      "<p><strong>Take up your actual amount of room.</strong> Not expanding \u2014 just stopping the small contraction. Feet apart rather than tucked, elbows off your sides, back against the chair.</p>",
      "<p><strong>Say one thing early.</strong> In any room, say something in the first few minutes \u2014 a question, an agreement, anything. The auditing gets heavier the longer you go without speaking, and the first contribution is the expensive one regardless of when you make it.</p>",
      "<p><strong>One horizon.</strong> Look at the furthest thing you can see. This state pulls focus to the faces nearest you.</p>",
      "<p><em>Unclench the jaw when you notice it. It holds here quietly.</em></p>"
    ],
    cues: []
  },
  "p9-practice": {
    kind: "Safe Practice", title: "Safe Practice", sub: "*What this practice does*",
    body: [
      "<p>Works with a state that arrives with an opinion attached, using breath, attention and observation. It doesn't dispute the opinion and it doesn't confirm it. It puts ground underneath you and space between you and it.</p>",
      "<p><strong>Pacing</strong></p>",
      "<p>Once through is a complete use. Use it when the state is there. Before a specific occasion is a legitimate use \u2014 this is one of the protocols people run in a car park before going in.</p>",
      "<p>If four and six is a stretch, shorten both and keep the ratio uneven.</p>",
      "<p><strong>What people commonly notice</strong></p>",
      "<p>The auditing starting up about the protocol itself \u2014 whether you're doing it correctly, whether you're feeling the right things. That's the loop finding a new subject, and it's ordinary. Note it and come back to the count.</p>",
      "<p>Resistance at the fourth step, because looking at yourself from outside is uncomfortable when you expect the view to be unkind.</p>",
      "<p>Relief that's smaller than hoped for. This state doesn't clear in one session and nothing here suggests it should.</p>",
      "<p><strong>When to slow down</strong></p>",
      "<p>If the fourth step turns into an inventory of everything you've got wrong, stop. That's the auditing restarting inside the step built to interrupt it. Come back to the breath and end there. Three steps is a complete use.</p>",
      "<p>If Release opens something much larger \u2014 something old, something you weren't looking for \u2014 you can stop and come back to the breath. Surfacing isn't an instruction to follow it.</p>",
      "<p><strong>When a person in the room is the right tool</strong></p>",
      "<p>Contact someone today \u2014 a doctor, a helpline in your country, or a person you trust \u2014 if you're having thoughts of harming yourself or punishing yourself, if you've stopped going to things entirely, if you're using something to get through occasions, or if the opinion is now constant rather than episodic.</p>",
      "<p><strong>Alongside other support</strong></p>",
      "<p>If you're with a therapist, doctor or counsellor, this sits alongside that and replaces nothing. This is one of the protocols where having a person is worth a great deal.</p>"
    ],
    cues: []
  },
  "p9-advisory": {
    kind: "Proximity Guide", title: "Proximity Guide", sub: "How close to stay.",
    body: [
      "<p>This state often has a live external source \u2014 a person, a group, a workplace, a feed \u2014 where contact reliably produces it. How much contact you have is a real variable.</p>",
      "<p>Three tiers. Which one yours belongs in is your read, on information nobody here has.</p>",
      "<p><strong>Worth staying engaged with</strong></p>",
      "<p>Contact is uncomfortable but the discomfort is about the newness or the stretch, not about how you're treated. You're taken seriously when you speak. Your reaction is roughly proportionate and settles once the occasion is over.</p>",
      "<p>Distance isn't the tool here \u2014 it's the thing the state is asking for and it would cost you the room. Regulation before, and going anyway, is the tool.</p>",
      "<p><strong>Worth reducing the surface area of</strong></p>",
      "<p>Contact produces the state reliably, and you've noticed you're smaller in that room than in others. Where you're spoken over, or corrected in front of people, or your contributions surface later under someone else's name.</p>",
      "<p>Reduction here is specific: fewer occasions, a channel you leave, a feed you stop opening, conversations you decline to be drawn into. That isn't the same as ending anything.</p>",
      "<p>Also worth attending to at this tier: where the reaction consistently outruns the event, the extra is carrying information about something other than the event. An interpretive lens rather than a finding, and what it shows you is yours to read.</p>",
      "<p><strong>Past what self-regulation is for</strong></p>",
      "<p>Where you're being belittled, undermined or humiliated, particularly in front of others. Where someone manages you by keeping you uncertain. Where you're being made unsafe at work.</p>",
      "<p>That isn't a regulation problem, and treating it as one converts a situation needing other people into a private failure of coping. What it needs is a doctor, HR, a union, a lawyer, or a friend who knows the whole picture rather than the version you can bear to tell.</p>",
      "<p><strong>Using this</strong></p>",
      "<p>Notice the tier. Then notice whether it's the tier you'd assign if a friend described the same thing. People in this state place their own situation lower than they'd place someone else's, more reliably than on any other protocol. Where it goes next is yours.</p>"
    ],
    cues: []
  },
  "p9-disclosure": {
    kind: "Disclosure & Support", title: "Disclosure & Support", sub: "A script for someone close.",
    body: [
      "<p>The obvious response to this one is reassurance, which doesn't work and which everyone offers. Telling someone what does work spares you both.</p>",
      "<p><strong>Saying it</strong> &gt; \"I get a thing where I'm convinced I'm not up to something and I'm about to be found out. It isn't tied to how things are actually going. I'd rather you knew than kept wondering why I go strange before things.\"</p>",
      "<p><strong>Describing what it's actually like</strong></p>",
      "<blockquote>\"It's physical. Chest goes unsteady, stomach turns, throat tightens just before I speak. That's all happening before I've thought anything.\"</blockquote>",
      "<blockquote>\"The part that's hard to explain is the auditing. I'm watching how I'm landing in a room the whole time I'm in it, and then replaying it afterwards. It's exhausting and it isn't a choice.\"</blockquote>",
      "<p><strong>How to tell it's coming</strong></p>",
      "<blockquote>\"I go quiet in groups. Or I talk too much and too fast. I start deferring to everyone. I decline things with a reason attached.\"</blockquote>",
      "<blockquote>\"If you notice, the useful thing is small and specific \u2014 'you should say the thing you told me earlier'. Being handed a concrete opening works. Being told I'm great doesn't.\"</blockquote>",
      "<p><strong>What helps</strong></p>",
      "<blockquote>\"Facts about what happened, not opinions about who I am. 'The thing you did on Tuesday worked' lands. 'You're brilliant' bounces off \u2014 the auditing takes it apart in about ten seconds.\"</blockquote>",
      "<blockquote>\"In a room, bringing me in by name once. That's usually all it takes.\"</blockquote>",
      "<p><strong>What doesn't</strong></p>",
      "<blockquote>\"Reassurance. I know you mean it. It gives the loop something new to argue with, and it always wins.\"</blockquote>",
      "<blockquote>\"Being told I'm overthinking. I am. Being told adds a second thing I'm getting wrong.\"</blockquote>",
      "<p><strong>If they ask what you're doing about it</strong></p>",
      "<blockquote>\"I run a method when it comes. Four steps. First I name it as a state \u2014 this one arrives disguised as a fact I've finally noticed about myself, and calling it a state puts it in a category rather than making it true. Then breathing, four in and six out, with my feet pressed into the floor, because the state is unsteady and the floor isn't. Then I stop the auditing, which is the loop that never clears me. Then I look at myself from across the room \u2014 and from out there, me and the opinion about me are two different things.\"</blockquote>",
      "<blockquote>\"It doesn't make me confident. It gets me into the room anyway.\"</blockquote>",
      "<p><em>Tell one person. It can be a professional rather than a friend. This state's instruction is to keep the doubt hidden in case anyone agrees with it, and telling someone contradicts that directly.</em></p>"
    ],
    cues: []
  },
  "p9-repair": {
    kind: "Invitation to Repair", title: "Invitation to Repair", sub: "Reopening it with them.",
    body: [
      "<p>Send it from the far side of the protocol, not the middle. From inside the state, an invitation becomes a request to be reassured, and it will be answered with reassurance rather than with anything true.</p>",
      "<p><strong>The rule that makes it sendable:</strong> no prosecution of them, and no fishing. If the message would only be successful if they told you that you're fine, it isn't an invitation.</p>",
      "<p><strong>Sendable</strong> &gt; There's something I'd rather say than keep managing quietly. &gt; &gt; I've been finding things hard around this and I've been going quiet rather than saying so. That's on me, not on you, and I didn't want it to keep reading as distance. &gt; &gt; I'm not looking for reassurance. I just wanted it said out loud.</p>",
      "<p><strong>Shorter</strong> &gt; I've been quiet lately and it isn't about you. I'd rather tell you than let you guess.</p>",
      "<p><strong>Where you've withdrawn from them</strong> &gt; I've pulled back from you over the last while and I know you'll have noticed. It wasn't about anything you did. I'd rather hear what that's been like than assume it didn't land.</p>",
      "<p><strong>Where it's about how you were treated</strong> &gt; Something happened in that meeting that I've been sitting with. I'm not looking for an apology and I'm not making it a thing. I'd rather say it than let it change how I am around you.</p>",
      "<p><strong>Before sending</strong> \u2014 read it back and ask what answer would make it a success. If the only successful answer is <em>you're fine</em>, it's fishing. Rewrite it so that no reply at all would still leave it worth having sent.</p>",
      "<p><em>If they don't take it, you've done the part that was yours. Whether they meet it is theirs, and always was.</em></p>"
    ],
    cues: []
  },
  "p9-record": {
    kind: "Your Record", title: "Your Record", sub: "What changed, in your words.",
    body: [
      "<p>Written on your device and kept there. Your account, in your language, for you to read back \u2014 nobody else sees it, and it's never measured against anything you wrote before.</p>",
      "<p>Any of these, or none.</p>",
      "<p>- Where did it sit in your body? - What was the occasion? Write what actually happened, without the reading attached. - What did the auditing find? Write the sentence it used. - Had anything actually gone wrong, or only possibly gone wrong? - <em>What was this for</em> \u2014 what turned up, without needing to answer it? - What did you say to yourself from across the room? Would you say it to someone else? - What was the scene where you did it anyway? Did you do it? - What did you write here last time? Read it back \u2014 as if someone else wrote it.</p>",
      "<p>That last instruction is deliberate. Reading your own account as though it were someone else's is the same distancing move as the fourth step, and it's usually where people first hear how they talk to themselves.</p>"
    ],
    cues: []
  },
  "p9-accountability": {
    kind: "Accountability & Empathy", title: "Accountability & Empathy", sub: "What it does outside you.",
    body: [
      "<p>The protocol trains the interior half of the state. The other half exits \u2014 and this one exits in ways that look like modesty from inside and like something else entirely from outside.</p>",
      "<p><strong>The specific blind spot here</strong> \u2014 this state exits as absence. Not putting yourself forward, not saying the thing, not taking the place. From inside that's staying out of the way. From outside it's a person who was capable and didn't show up, and other people had to cover it. They rarely say so, because complaining about someone's self-doubt feels unkind.</p>",
      "<p><strong>The second one</strong> \u2014 the pre-emptive undercut. Getting there first: <em>this is probably rubbish, don't expect much, I'm not the right person for this.</em> From inside it's honesty, or managing expectations. From outside it hands them the job of talking you up before they can respond to the actual thing, every time, and it's the version people tire of quietly.</p>",
      "<p><strong>The third one</strong> \u2014 deferring. Agreeing with the room, not saying the objection, going along. From inside it's not being difficult. From outside it's the loss of your actual view, and the people who wanted it are the ones who notice.</p>",
      "<p><strong>Their earlier information</strong> \u2014 people close to you often see it before you feel it. Worth asking directly: <em>what do you see, before I know?</em></p>",
      "<p><strong>Naming the act, not the character</strong> \u2014 <em>\"I didn't say the thing I thought in that meeting, and you ended up making the argument alone\"</em> is ownership. <em>\"I'm useless in meetings\"</em> is not; it names nothing, it's the opinion again, and it asks them to argue with it.</p>",
      "<p>If your account of yourself is a verdict rather than an act, you haven't done accountability. You've done the state, out loud, at somebody.</p>",
      "<p><strong>No because.</strong> The state is a real reason and it doesn't belong in the sentence.</p>",
      "<p><strong>No self-attack.</strong> On this protocol that's not a matter of manners. Self-attack is the state's native mode, and an apology built out of it hands the other person the job of reassuring you \u2014 which is the whole pattern, repeating inside the apology for the pattern.</p>",
      "<p><strong>Describe what was observable, ask about the rest.</strong> <em>\"I've been quiet in things where I'd normally have said something. I'm not going to tell you what that's been like \u2014 I'd rather you told me.\"</em> Then let them answer without correcting it or apologising for the answer.</p>",
      "<p><strong>The checkable change</strong> \u2014 this repairs by saying one thing early rather than by becoming confident. <em>\"I'm going to say something in the first few minutes of things, even when I don't want to\"</em> is small, specific and observable.</p>",
      "<p><strong>Where this stops</strong> \u2014 a reaction is information about the exterior of your state, not a verdict on you. This state will take anything external and feed it straight into the auditing; if that's what's happening, you're not doing this resource, you're doing the thing the third step asked you to put down. Come back another day. And if someone has been belittling you, their account of your conduct isn't a reliable one.</p>"
    ],
    cues: []
  },
  "p10-meditation": {
    kind: "Guided Meditation", title: "Guided Meditation", sub: "Do it with me.",
    body: [
      "<p>You're here. Given how things are, that's not a small thing.</p>",
      "<p>Sit or lie down, whichever is nearer. Eyes open or closed.</p>",
      "<p>This works on the state, and it leaves the situation exactly as it is. Whatever you can't change is still there afterwards. That's not what we're touching.</p>",
      "<h4>Before we start \u2014 move something</h4>",
      "<p>Move your fingers. One hand.</p>",
      "<p>Now your feet. Press them into whatever's underneath.</p>",
      "<p>That happened because you decided it would. Small, and real, and yours.</p>",
      "<p>We'll come back to that later.</p>",
      "<h4>Recognition</h4>",
      "<p>One word. We're not going hunting for it.</p>",
      "<p><strong>Numb.</strong></p>",
      "<p>You don't have to find where it sits. In this state that's often hard, and not finding it is part of the state rather than a failure to look.</p>",
      "<p>There are two things stacked here and they get treated as one. There's what you can't change. And there's the state you're in about it.</p>",
      "<p>They're not the same. The second one is reachable.</p>",
      "<h4>Regulation</h4>",
      "<p>Contact first, before any counting.</p>",
      "<p>Put a hand on your chest, or hold your own arm.</p>",
      "<p>Let it stay. Warmth and pressure is what this state accepts when it accepts very little.</p>",
      "<p>Now the breath. Longer out than in. Count it if you can, don't if you can't.</p>",
      "<p>Nothing to get right.</p>",
      "<h4>Release</h4>",
      "<p>Two things are running.</p>",
      "<p>There's the situation, and whatever part of it genuinely can't be moved. That's real. Nobody here is going to tell you it isn't, or that you haven't tried, or that there's an angle you've missed.</p>",
      "<p>And there's the arguing with it. Going back over how it should have gone. Running the version where it was different. The low steady quarrel with a fact.</p>",
      "<p>The quarrel is the second thing, and it's the expensive one, and it's the only one of the two you can put down.</p>",
      "<p>This isn't accepting the situation in the sense of finding it acceptable. It probably isn't acceptable. It's stopping the argument with something that already happened.</p>",
      "<p>That's a different move, and it's much smaller than being at peace with anything.</p>",
      "<p>And the question. Not <em>what's wrong with me that I can't cope with this</em> \u2014 the situation may be genuinely unbearable, and that question puts the fault in the wrong place.</p>",
      "<p><strong>What was this for?</strong></p>",
      "<p>Reducing is what a body does when what's arriving is more than it can meet and there's nothing to push against. It's protective. It costs a great deal, and it's protective.</p>",
      "<p>Leave the question there. Nothing needs answering today.</p>",
      "<h4>Rise</h4>",
      "<p>Step outside it.</p>",
      "<p>See yourself from across the room. Someone sitting there with a hand on their chest, in the middle of something hard.</p>",
      "<p>Speak to them as <em>you</em>.</p>",
      "<p><em>This is a lot, and it isn't your fault, and you're still here.</em></p>",
      "<p>No correction in that. Nothing being fixed.</p>",
      "<p>Now \u2014 remember your fingers moving, at the start. That happened because you chose it.</p>",
      "<p>Almost everything might be outside your reach right now. That was inside it.</p>",
      "<p>So: one thing, later, that's yours to decide. It should be small enough to be certain of. Standing up. A glass of water. A window. Where are you, and what's the first movement.</p>",
      "<p>Not a step toward fixing anything. Just something that's yours.</p>",
      "<p>And one thing that's still here. Not something to be grateful for about any of this \u2014 nobody's asking that. Something that exists. The floor. The light. That you got this far today.</p>",
      "<p>Come back slowly.</p>",
      "<p>Nothing about the situation has changed. That was never the offer, and you'd have known if I'd pretended otherwise.</p>",
      "<p>What you've got is a bit of ground, and one thing that's yours.</p>",
      "<p>Recognition. Regulation. Release. Rise.</p>"
    ],
    cues: [{"block": 0, "type": "PURPLE/MUSIC", "note": "bed in, 90 BPM, 3/4. Five-bar phrase. Turn at four seconds. Enters late, sits low."}, {"block": 1, "type": "GOLD/PAUSE", "note": ""}, {"block": 2, "type": "GOLD/PAUSE", "note": ""}, {"block": 4, "type": "RED/ACTION", "note": "small deliberate movement. Offered, never insisted on."}, {"block": 5, "type": "GOLD/PAUSE", "note": "long"}, {"block": 6, "type": "GOLD/PAUSE", "note": "long"}, {"block": 7, "type": "GOLD/PAUSE", "note": ""}, {"block": 10, "type": "GOLD/PAUSE", "note": ""}, {"block": 11, "type": "GOLD/PAUSE", "note": "long"}, {"block": 12, "type": "BLUE/ILLUSTRATION", "note": "a wide flat horizon, one small fixed point on it. The point is not moving."}, {"block": 12, "type": "GOLD/PAUSE", "note": ""}, {"block": 16, "type": "RED/ACTION", "note": "hand to sternum or to the opposite arm. Offered, not instructed."}, {"block": 17, "type": "GOLD/PAUSE", "note": "long"}, {"block": 18, "type": "GOLD/PAUSE", "note": ""}, {"block": 19, "type": "TEAL/BREATH", "note": "in, slow"}, {"block": 19, "type": "TEAL/BREATH", "note": "out, longer"}, {"block": 19, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 19, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 19, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 19, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 19, "type": "GOLD/PAUSE", "note": "extended"}, {"block": 22, "type": "GOLD/PAUSE", "note": ""}, {"block": 24, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 24, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 25, "type": "GOLD/PAUSE", "note": "long"}, {"block": 27, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 27, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 29, "type": "GOLD/PAUSE", "note": "long"}, {"block": 30, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 30, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 34, "type": "BLUE/ILLUSTRATION", "note": "figure at middle distance, room around it, unhurried."}, {"block": 36, "type": "GOLD/PAUSE", "note": ""}, {"block": 37, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 37, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 38, "type": "GOLD/PAUSE", "note": ""}, {"block": 39, "type": "GOLD/PAUSE", "note": "long"}, {"block": 40, "type": "GOLD/PAUSE", "note": "long"}, {"block": 41, "type": "TEAL/BREATH", "note": "in, four"}, {"block": 41, "type": "TEAL/BREATH", "note": "out, six"}, {"block": 42, "type": "GOLD/PAUSE", "note": ""}, {"block": 42, "type": "PURPLE/MUSIC", "note": "bed lifts, resolves on the turn."}]
  },
  "p10-crisiscard": {
    kind: "Cue Card", title: "Cue Card", sub: "Do it yourself.",
    body: [
      "<blockquote>Second person throughout \u2014 deliberate, not stylistic.</blockquote>",
      "<h4>Front</h4>",
      "<p><em>Before you start \u2014 move something. Fingers, feet into the floor. Small, and it happened because you decided it would.</em></p>",
      "<p class=\"sr-cue-line\"><strong>Name it</strong> \u2014 <em>You are numb.</em> Don't go hunting for where.</p>",
      "<p class=\"sr-cue-line\"><strong>Contact, then breath</strong> \u2014 Hand on your chest. Longer out than in.</p>",
      "<p class=\"sr-cue-line\"><strong>Put down the quarrel</strong> \u2014 Not the situation. Ask <em>what was this for</em>.</p>",
      "<p class=\"sr-cue-line\"><strong>One thing that's yours</strong> \u2014 Small enough to be certain of.</p>",
      "<h4>Back</h4>",
      "<p><strong>Move first</strong> \u2014 Before anything else, move something. Fingers, feet pressed into the floor. It's small and it happened because you decided it would. That matters later.</p>",
      "<p><strong>Recognition</strong> \u2014 One word. <em>Numb.</em> Don't search for where it sits; not finding it is part of the state. Two things are stacked here and get treated as one: what you can't change, and the state you're in about it. They're not the same, and the second one is reachable.</p>",
      "<p><strong>Regulation</strong> \u2014 Contact before counting. Hand on your chest, or hold your own arm. Then longer out than in. Count if you can. Don't if you can't.</p>",
      "<p><strong>Release</strong> \u2014 There's what genuinely can't be moved, which is real. And there's arguing with it \u2014 going back over how it should have gone, running the version where it was different. The quarrel is the expensive one and the only one you can put down. This isn't calling the situation acceptable. It's stopping an argument with something that already happened.</p>",
      "<p><strong>Rise</strong> \u2014 See yourself from a distance. <em>This is a lot, it isn't your fault, and you're still here.</em> Then one thing that's yours to decide, small enough to be certain of. Not a step toward fixing anything. Then one thing that's still here.</p>"
    ],
    cues: []
  },
  "p10-guide": {
    kind: "How This Works", title: "How This Works", sub: "*What the state is doing*",
    body: [
      "<p>This is a reduced state \u2014 the third of the three broad conditions, alongside settled and mobilised. It's what a system does when what's arriving exceeds what it can meet and there's nothing available to push against.</p>",
      "<p>That last part is the distinguishing feature. Mobilised states need a target. Where there isn't one \u2014 where the situation genuinely can't be moved \u2014 the system doesn't stay mobilised. It reduces.</p>",
      "<p>In the body: heaviness, distance from your own limbs, flattened sensation, slowed thought, and a marked drop in the capacity to begin anything. Sensation is muffled rather than gone, which is why locating it precisely is hard.</p>",
      "<p><strong>Why movement comes before attention</strong></p>",
      "<p>Every other protocol opens by asking you to find where the state sits and hold attention there. Here, sustained attention is exactly what has reduced, so opening that way asks for the least available thing and produces a member who has failed at step one.</p>",
      "<p>Small deliberate movement asks nothing of attention. It also does something specific on this protocol: it is a small act with a chosen cause and an immediate result, in a state whose central feature is the sense that nothing you do produces an effect. The fourth step returns to it deliberately.</p>",
      "<p><strong>Why Recognition separates two things</strong></p>",
      "<p>Powerlessness arrives as one object: an impossible situation and a flattened state, fused. While they're fused, working on the state looks like pretending the situation is fine, so people won't.</p>",
      "<p>Naming the state separates them. The situation is what it is and this protocol makes no claim about it. The state is a physiological condition, and it answers to different tools than the situation does.</p>",
      "<p><strong>Why contact comes before the count</strong></p>",
      "<p>Warmth and pressure at the sternum or the arm is a direct input requiring nothing of you, and it registers when finer inputs don't. The breath follows: lengthening the out-breath relative to the in-breath is what shifts the system toward settled. The count is offered rather than required, because in a reduced state counting can itself become a demand.</p>",
      "<p><strong>Why Release goes after the quarrel</strong></p>",
      "<p>There's the situation, including whatever part of it genuinely can't be moved. And there's the arguing with it \u2014 going back over how it should have gone, running the version where it was different.</p>",
      "<p>Two different costs. The first isn't optional. The second starts again every day, changes nothing, and is the only one you can put down.</p>",
      "<p>Setting it down is not acceptance in the sense of finding the situation acceptable, and it is not agreement that it's fair. That distinction matters, because people asked to accept something usually hear that they're being asked to approve of it, and refuse \u2014 correctly. What's being put down is an argument with a fact, not the feeling about it.</p>",
      "<p>The change of question does related work. <em>What is wrong with me that I can't cope</em> puts the fault in the wrong place when the situation may be genuinely unbearable. <em>What was this for</em> asks about function, and what it surfaces is that reducing is protective \u2014 expensive, and protective.</p>",
      "<p><strong>Why Rise returns to the movement</strong></p>",
      "<p>Rehearsing the situation resolving is rehearsing something outside your control, and the system doesn't accept it.</p>",
      "<p>What's available is something small and genuinely yours. The step returns to the fingers moving at the start because that was a chosen act with an observed result \u2014 the exact thing this state reports as impossible. It isn't a step toward fixing the situation, and framing it as one would make it another failure.</p>",
      "<h4>What we rest on</h4>",
      "<p><strong>Polyvagal Theory \u2014 Stephen Porges</strong> \u00b7 <em>peer-reviewed</em> \u00b7 supplies Recognition and the three state labels</p>",
      "<p>Threat detection runs ahead of thought. The body reads a situation and moves before deliberation catches up. Porges describes three broad conditions: settled and socially available, mobilised for action, and shut down. Agitated, Unsteady and Numb are the member-facing names for those three. <em>Here it accounts for why an unmovable situation produces reduction rather than mobilisation \u2014 mobilising needs something to push against.</em></p>",
      "<p><em>The anatomical premises are contested: a 2026 evaluation in</em> Clinical Neuropsychiatry <em>challenged them, with Porges replying in the same issue. The state distinctions are what this platform uses, and they hold independently of that dispute.</em></p>",
      "<p><strong>Non-resistance \u2014 Alan Watts</strong> \u00b7 <em>interpretive</em> \u00b7 informs why the third step says <em>accept</em></p>",
      "<p>The state is one thing. The fight with the state is a second thing. The fight usually costs more, and it is the only one of the two you can put down. Setting it down isn't passivity, isn't approval, and isn't agreement that the situation is acceptable. <em>Here it is the distinction the protocol turns on \u2014 the situation stays, the quarrel with the fact of it doesn't have to.</em></p>",
      "<p><em>Watts is an interpreter rather than an originator; the older sources are Laozi and, for the framing used here, D. T. Suzuki. Offered as a lens rather than a finding.</em></p>",
      "<p><strong>Where the reading is yours</strong> \u2014 this explains the machinery. What your situation means, what can and can't be changed in it, and what to do next are readings that belong entirely to you.</p>"
    ],
    cues: []
  },
  "p10-companion": {
    kind: "Somatic Release Activities", title: "Somatic Release Activities", sub: "Between sessions.",
    body: [
      "<p>Small, deliberately. Any one of these on its own is a complete use.</p>",
      "<p><strong>Move one small thing.</strong> Fingers, toes, ankles. A chosen act with an immediate result.</p>",
      "<p><strong>Feet into the floor.</strong> Press down, feel it push back.</p>",
      "<p><strong>Hand to sternum, or hold your own arm.</strong> Warmth and pressure. The input this state accepts when it accepts little else.</p>",
      "<p><strong>Longer out than in.</strong> Three or four breaths. No counting required.</p>",
      "<p><strong>Stand up.</strong> That's the whole item.</p>",
      "<p><strong>One decision, any size.</strong> Which mug. Which window. Whether to sit or lie down. The point is not the outcome; it's that you chose and something followed.</p>",
      "<p><strong>Go outside the door and come back.</strong> Air and light on skin. Nothing further required.</p>",
      "<p><em>Saying one sentence out loud, to anyone or nobody, is worth knowing about. Voice goes quiet early in this state.</em></p>"
    ],
    cues: []
  },
  "p10-practice": {
    kind: "Safe Practice", title: "Safe Practice", sub: "*What this practice does*",
    body: [
      "<p>Works with a reduced state, using movement, contact, breath and observation. It makes no claim about your situation, doesn't suggest the situation is smaller than it is, and treats getting through this as a complete use.</p>",
      "<p><strong>Pacing</strong></p>",
      "<p>Any single part is a complete use. Moving your fingers and stopping there counts. There's no requirement to reach the fourth step.</p>",
      "<p><strong>What people commonly notice</strong></p>",
      "<p>Feeling nothing during or after \u2014 common here, and it doesn't mean nothing happened. Heaviness increasing before it eases. Emotion arriving suddenly as the state lifts, sometimes tears and sometimes anger, which is what tends to happen when a reduced state comes up. Considerable tiredness.</p>",
      "<p><strong>When to slow down</strong></p>",
      "<p>If the practice feels like one more demand, do a single somatic item instead and leave the session. That's a correct decision.</p>",
      "<p>If emotion arrives hard as the state lifts and you're on your own, stop and let it be there, and consider whether there's someone you could be near.</p>",
      "<p><strong>Where the situation itself is the thing</strong></p>",
      "<p>A regulation practice helps you meet an unbearable situation with a system that isn't reduced. It doesn't change the situation and was never built to. Where something can be moved \u2014 money, housing, legal, medical, work \u2014 the useful next steps are outside this platform and they involve other people. The Proximity Guide goes further into that.</p>",
      "<p><strong>When this needs a person rather than a practice</strong></p>",
      "<p>Reduced states are the ones people carry alone and longest, because the state removes the impulse to reach for anyone.</p>",
      "<p>Contact someone today \u2014 a doctor, a helpline in your country, or a person you trust \u2014 if you're having thoughts of harming yourself or of not being here, if you feel there's no point continuing, if you haven't been able to eat, wash or leave the house for days, if you're using something to get through it, or if this has been going on for weeks rather than days.</p>",
      "<p><strong>If you can't face making the call</strong></p>",
      "<p>Ask someone else to make it, or send a message rather than speaking. <em>\"I need to see someone and I can't do the phone today\"</em> sent to one person is enough, and it's a legitimate way to do it.</p>",
      "<p><strong>Alongside other support</strong></p>",
      "<p>If you're with a therapist, doctor or counsellor, this sits alongside that and replaces nothing. This is one of the protocols where having a person matters most, and the practice is not a substitute for one.</p>"
    ],
    cues: []
  },
  "p10-advisory": {
    kind: "Proximity Guide", title: "Proximity Guide", sub: "How close to stay.",
    body: [
      "<p>This state usually has a genuine external source \u2014 a situation, a system, a person, a set of circumstances. Contact with it is often the one variable available, and often more available than it feels from inside.</p>",
      "<p>Three tiers. Which one yours belongs in is your read, on information nobody here has.</p>",
      "<p><strong>Worth staying engaged with</strong></p>",
      "<p>Where something in the situation can still move, even a little, and engaging with it produces some return. Where the difficulty is real but the effort isn't entirely absorbed without effect. Where there's a conversation, a form, a call that hasn't been made yet.</p>",
      "<p>Distance isn't the tool here. Regulation and one specific action is, and the protocol is what makes that action possible on a day like today.</p>",
      "<p><strong>Worth reducing the surface area of</strong></p>",
      "<p>Where contact reliably produces the state and nothing you do changes anything. Where you've been engaging for a long time with the same result. Where the situation has become something you monitor rather than something you affect \u2014 checking the news about it, rereading the letter, going back over the account.</p>",
      "<p>Reduction here is specific: not checking daily, having a set time for it rather than all day, letting someone else hold a part of it. Putting something down for a period is not giving up on it.</p>",
      "<p><strong>Past what self-regulation is for</strong></p>",
      "<p>Where you're without money, housing, safety, care or legal standing. Where you're being harmed. Where the situation is genuinely beyond one person and has been for some time.</p>",
      "<p>That isn't a regulation problem and treating it as one has a real cost \u2014 it converts a situation that needs other people and institutions into a private failure of coping. What it needs is a doctor, a lawyer, a debt or housing service, a union, a social worker, or someone who can see the whole picture rather than the version you can bear to describe.</p>",
      "<p>Asking for that kind of help is not a last resort and it is not an admission of anything.</p>",
      "<p><strong>Using this</strong></p>",
      "<p>Notice the tier. Then notice whether it's the tier you'd assign if a friend described the same thing. People in this state place their own situation lower than they'd place someone else's, more reliably than anywhere else. Where it goes next is yours.</p>"
    ],
    cues: []
  },
  "p10-disclosure": {
    kind: "Disclosure & Support", title: "Disclosure & Support", sub: "A script for someone close.",
    body: [
      "<p>This state removes the impulse to tell anyone. Any of these can be sent as a message rather than said.</p>",
      "<p><strong>Saying it</strong> &gt; \"Things are hard and I've gone quite flat about it. I'm not looking for solutions. I'd rather you knew where I am than kept guessing.\"</p>",
      "<p><strong>Describing what it's actually like</strong></p>",
      "<blockquote>\"It's physical. Heavy, slowed down, a bit far away from myself. Starting anything is the hard part \u2014 not doing it, starting it.\"</blockquote>",
      "<blockquote>\"The thing people misread is that it isn't only sadness. It's more that everything's turned down, including the parts that would normally make me do something about it.\"</blockquote>",
      "<p><strong>How to tell it's coming</strong></p>",
      "<blockquote>\"I stop replying. I go still. I say I'm fine in a flat voice. I stop suggesting anything or making plans.\"</blockquote>",
      "<blockquote>\"If you see that, the useful thing is specific \u2014 'I'm coming round at four' rather than 'let me know if you need anything'. I won't let you know. That's the state, not me not wanting to.\"</blockquote>",
      "<p><strong>What helps</strong></p>",
      "<blockquote>\"Turn up. You don't have to do or say anything. Being in the room is most of it.\"</blockquote>",
      "<blockquote>\"Do a small thing rather than ask what I need. Decisions are the expensive part right now.\"</blockquote>",
      "<blockquote>\"If you want to help with the actual situation, ask for one specific job rather than offering generally. 'Give me the letter and I'll ring them' is something I can say yes to.\"</blockquote>",
      "<p><strong>What doesn't</strong></p>",
      "<blockquote>\"Silver linings, or being told it'll work out. I can't tell whether it will and neither can you, and hearing it means I've got to manage your optimism as well.\"</blockquote>",
      "<blockquote>\"Being told about someone who had it worse.\"</blockquote>",
      "<p><strong>If they ask what you're doing about it</strong></p>",
      "<blockquote>\"There's a method I run. It starts small \u2014 move something, name the state, hand on my chest before any breathing. Then I stop arguing with the part that can't be changed, which is different from being fine about it. Then one small thing that's actually mine to decide.\"</blockquote>",
      "<blockquote>\"It doesn't change the situation. It stops me adding to it.\"</blockquote>",
      "<p><strong>If you need someone to act</strong> &gt; \"I need to see a doctor and I can't face arranging it. Could you help me do that this week?\"</p>",
      "<p><em>Tell one person. This is the state that most reliably keeps people silent, and the silence is produced by the state rather than chosen.</em></p>"
    ],
    cues: []
  },
  "p10-record": {
    kind: "Your Record", title: "Your Record", sub: "What changed, in your words.",
    body: [
      "<p>Written on your device and kept there. Your account, in your language, for you to read back \u2014 nobody else sees it, and it's never measured against anything you wrote before.</p>",
      "<p>One line is a complete entry. Writing nothing is a legitimate use.</p>",
      "<p>- What did you manage today? Anything at all. - What's the part that genuinely can't be moved? Write it plainly. - Is there any part of it that could move, even slightly? Including no. - What did the quarrel sound like today? Write the sentence it used. - <em>What was this for</em> \u2014 anything, or nothing? Nothing is a real answer. - What did you say to yourself from across the room? - What was the one thing that was yours? Did you do it? - What did you write here last time? Read it back \u2014 without comparing today to it.</p>"
    ],
    cues: []
  },
  "p10-accountability": {
    kind: "Accountability & Empathy", title: "Accountability & Empathy", sub: "What it does outside you.",
    body: [
      "<p>The protocol trains the interior half of the state. The other half exits as absence, which is the hardest kind to see from inside because from inside it feels like nothing happening at all.</p>",
      "<p><strong>The specific blind spot here</strong> \u2014 this exits as not-doing. Messages unanswered, plans lapsed, things left. From inside each is not a decision but the absence of the capacity to make one. From outside, the difference between <em>couldn't</em> and <em>didn't</em> is invisible, and what lands is being dropped.</p>",
      "<p><strong>The second one</strong> \u2014 the flatness in the face of other people's news, good or bad. From inside there's nothing available to respond with. From outside it reads as not caring, particularly to the people who've been carrying you.</p>",
      "<p><strong>The third one</strong> \u2014 the people around you are often carrying the situation too, and doing so in a state you can't currently see. Not being able to ask how they are is characteristic. Not knowing that it lands is the blind spot.</p>",
      "<p><strong>Their earlier information</strong> \u2014 people close to you usually see it before you do, because the first signs are things you stop doing.</p>",
      "<p><strong>Naming the act, not the character</strong> \u2014 <em>\"I haven't asked how you are in weeks\"</em> is ownership. <em>\"I'm dead weight\"</em> is not; it names nothing, it's the commentary again, and it asks them to argue with it.</p>",
      "<p><strong>No because.</strong> On this protocol the because is enormous and everybody already knows it, and it still doesn't belong in the sentence.</p>",
      "<p><strong>No self-attack.</strong> This is the whole thing here, because the commentary is already running all day. An apology built out of it is the state, out loud, at somebody \u2014 and it hands them the job of reassuring you about the thing you did to them.</p>",
      "<p><strong>Describe what was observable, ask about the rest.</strong> <em>\"I've been gone for a long time. I'm not going to tell you what that's been like for you \u2014 I'd rather you told me.\"</em></p>",
      "<p><strong>The checkable change</strong> \u2014 this repairs by sending something rather than by improving. <em>\"When I'm under, I'll send you one line saying so, even if that's all I can manage\"</em> is small, specific, observable, and doesn't ask you to be different.</p>",
      "<p><strong>Where this stops</strong> \u2014 this is not an instruction to be less flattened for other people's convenience, and you don't owe anyone a better performance while you're in the middle of something hard. If today isn't the day for this one, that's a legitimate answer \u2014 it's the resource here you can leave for as long as you need to.</p>"
    ],
    cues: []
  }
};

if (typeof module !== 'undefined') {
  module.exports = { T1_RESOURCES: T1_RESOURCES,
                     T1_PROTOCOL_KEYS: T1_PROTOCOL_KEYS,
                     T1_RESOURCE_SUFFIX: T1_RESOURCE_SUFFIX };
}
