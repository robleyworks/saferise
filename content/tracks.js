/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — content/tracks.js
   Single source of truth for all four tracks.
   Read by: public track pages, dashboard carousel + Arrive check-in,
            protocol page, library filter, plans, checkout, framework pages,
            and the image lane (track.art carries the illustration briefs).
   SHARED.fourSteps holds the PUBLIC-FACING step names (Recognition /
   Regulation / Release / Rehearsal). The member-facing method names stay
   inside the product, not on sales pages.
   SHARED.faq is 12 items; each track adds 6 of its own = 18 per page.
   Pricing locked 2026-08. Elevation hidden for launch (visible:false).
   ═══════════════════════════════════════════════════════════════════════ */

/* ── PRICING · locked 2026-08 · one record, referenced everywhere ── */
var PRICING = {
  t1:      { amount: '\u20AC9',   per: '/ month', words: 'Nine euros a month.' },
  t2:      { amount: '\u20AC19',  per: '/ month', words: 'Nineteen euros a month.' },
  t3:      { amount: '\u20AC29',  per: '/ month', words: 'Twenty-nine euros a month.' },
  workshop:{ amount: '\u20AC29',  per: 'per person' },
  premium1:{ amount: '\u20AC129', per: 'per hour' },
  premium3:{ amount: '\u20AC299', per: 'for three hours' }
};

/* ── SHARED · identical on every track. Edited here, never per track. ── */
var SHARED = {
  fourSteps: [
    { name: 'Recognition', body: 'Nothing settles while what you are feeling stays vague. The first step makes it specific.', cite: 'Porges \u00B7 Polyvagal Theory' },
    { name: 'Regulation',  body: 'The body needs evidence of safety, not an argument for it. The session gives it that, and paces it for you.', cite: 'HeartMath \u00B7 Cardiac coherence' },
    { name: 'Release',     body: 'What you stop fighting stops needing to be fought. Acceptance is a decision, not a feeling you wait for.', cite: 'Mat\u00E9 \u00B7 Compassionate Inquiry' },
    { name: 'Rise',        body: 'You finish as the person on the other side of it, and leave carrying the state rather than the memory of it.', cite: 'Mental rehearsal \u00B7 Observer stance' }
  ],
  resources: [
    ['play',  'Guided Meditation',    'Do it with me.',              'The full session, voiced and paced \u2014 audio, or follow-along video. Ten minutes, headphones, nothing to read.'],
    ['warn',  'Cue Card',             'Do it yourself.',             'Printable, two sides: the four-line version for when it is happening, and the full step sequence for when you have longer.'],
    /* SR-077 · Source Insights merged in here. Its subtitle stays 'Why it works.';
       the framework attribution it carried now sits in this description. */
    ['gear',  'How This Works',       'Why it works.',               'What is happening in your body during this state, why the four steps land in that order, and which framework each step rests on \u2014 in plain language.'],
    ['heart', 'Somatic Release Activities', 'Between sessions.',     'Small physical practices that hold the work on the days you will not sit down.'],
    ['comp',  'Safe Practice',        'When and how to proceed.',    'Pacing, what to expect, when to slow down, and when this is not the right tool today.'],
    ['pin',   'Proximity Guide',      'How close to stay.',          'Three tiers for what to stay engaged with, what to take distance from, and what is beyond self-regulation.'],
    ['shield','Disclosure &amp; Support','A script for someone close.','Words for explaining what you are doing and what you need, without over-explaining.'],
    ['mail',  'Invitation to Repair', 'Reopening it with them.',     'A structured way to open repair with another person when the pattern involves them.'],
    ['pen',   'Your Record',          'What changed, in your words.','Prompts tied to this protocol, and the log that tracks your state before and after each session.']
  ],
  resourceNote: 'The Proximity Guide and Invitation to Repair appear where an ongoing external source is genuinely part of the pattern, rather than on every protocol. The library grows \u2014 anything added to the track while you\u2019re a member is yours.',
  insight: {
    eyebrow: 'Why naming it isn\u2019t enough',
    h2: 'Understanding and integration<br><span class="gold">are two different events.</span>',
    lede: 'Insight arrives through language. Safety arrives through the body. You can\u2019t reason your way into a state that reasoning depends on.',
    points: [
      ['First', 'The body protects', 'Your nervous system commits to a survival response in the brainstem and amygdala \u2014 before your conscious mind has processed a single word.'],
      ['Then',  'The mind explains', 'In that state the higher functions you\u2019d need are not available. Not suppressed by weakness \u2014 offline by design. Which is why one more explanation of the pattern was never going to be enough.']
    ],
    pull: 'You weren\u2019t holding on out of weakness.<br>Your system was holding on out of survival.'
  },
  progress: {
    eyebrow: 'How you\u2019ll know it\u2019s working',
    h2: 'Where you land<br><span class="gold">keeps rising.</span>',
    lede: 'One session settles a state. What repetition changes is where you settle back to \u2014 and you don\u2019t have to take our word for it.',
    notices: [
      ['Every session, logged', 'Which step you reached, what shifted, noted against the protocol you ran.'],
      ['The tier moves',        'Your readout starts at Early Signs and shifts as the pattern in your own data becomes readable.'],
      ['The route shortens',    'What took the full session starts arriving sooner. The body has learned the sequence.']
    ]
  },
  scope: 'SafeRise is a self-guided nervous-system tool, not a replacement for therapy or crisis care \u2014 many members use both together. It is a practical nervous-system tool you can use in daily life, alongside any other support you are receiving.'
};

/* ── TRACKS · four records. Elevation carries visible:false for launch. ── */
var TRACKS = {

  1: {
    id: 1, visible: true, status: 'live',
    name: 'Personal Transformation',
    kicker: 'Track 01 \u2014 Personal Transformation',
    heroTitle: 'Personal<br><span class="gold">Transformation</span>',
    heroRule: 'The distance between your best self and your worst reaction is measured in seconds.',
    heroBody: [
      'You know the pattern. Knowing it doesn\u2019t close the gap.',
      'These protocols work on the state that opens it \u2014 regulation you run yourself, in the moment it matters. No intake, no labels, nothing to fill in first.'
    ],
    relation: 'run alone',
    price: PRICING.t1,

    art: {
      band:   'one person alone: listening with headphones, writing, reading',
      cost:   'one person, same room \u2014 evening, three in the morning, next morning',
      range:  'the same person three times \u2014 braced, settled, absent',
      change: 'one person moving easily through an ordinary day at home'
    },

    protocols: [
      ['01','Regulate',   'The Anxiety Reset Protocol',            'Calm fear responses, quiet spiralling thoughts, and return to the present.',                        'Racing thoughts, shallow breath, chest tightness, scanning for threat.',        ['I cannot switch off','My mind runs the worst case on a loop','I brace before anything has happened']],
      ['02','Transmute',  'The Anger Alchemy Protocol',            'Turn anger into clarity, protect what matters, and choose your response.',                          'Adrenaline spike, jaw tension, heat in chest and face, tunnel vision.',         ['I keep snapping','It is out of my mouth before I decide','I go from nothing to furious']],
      ['03','Reduce Load','The Overwhelm Threshold Protocol',      'Reduce overload, regain your footing, and create space to think clearly.',                          'Your mind stops working, everything irritates, you just want out.',                 ['There is too much and I cannot start','I want to walk out of my own life','Everything is urgent']],
      ['04','Repair',     'The Abandonment Wound Protocol',        'Settle the fear of being left, and feel safe in the room again.',                'Braced for bad news, rushing to fix it, asking again if you are okay.',         ['I feel rejected','I need to know we are okay, again','I read silence as leaving']],
      ['05','Dissolve',   'The Shame Dissolution Protocol',        'Stop judging yourself for one moment, and stop it standing for who you are.',              'Heat, collapse inward, wanting to disappear from the room.',                    ['I want to disappear','One moment defines me','I cannot look at it directly']],
      ['06','Integrate',  'The Grief Integration Protocol',        'Make room for the loss, and carry forward what still matters.',                'Held tension, deep tiredness, waves that arrive without warning.',                   ['It arrives without warning','I do not know where to put it','I am tired in a way sleep does not fix']],
      ['07','Restore',    'The Shutdown Recovery Protocol',        'Come back to yourself slowly, and start feeling things again.',                          'Numb, flat, unreachable. Sleep that doesn\u2019t restore.',                     ['I feel nothing','I am unreachable, including to myself','I cannot make myself care']],
      ['08','Release',    'The Jealousy Release Protocol',         'See what the sting is telling you, and get back to your own path.',       'Tightening at others\u2019 success, a running tally you didn\u2019t choose.',    ['I keep score','Other people\u2019s wins take something from me','I cannot be glad for them']],
      ['09','Anchor',     'The Insecurity Anchor Protocol',        'Quiet the doubt, and stay steady when you feel judged or exposed.',       'Bracing to be seen. Doubt arriving before any evidence.',                       ['I doubt myself before anyone speaks','Being seen costs me something','I am waiting to be found out']],
      ['10','Reclaim',    'The Powerlessness &amp; Despair Protocol','Find what is still in your reach, and take the next step that matters.',          'No fight left. Sleep as escape. Nothing yours to influence.',                   ['Nothing I do changes anything','I have no fight left','Sleep is the only relief']]
    ],

    cost: {
      eyebrow: 'And why it matters now',
      h2: 'Think about what this costs.<br><span class="gold">Not in money.</span>',
      lede: 'Not the crisis. The ordinary hours it quietly takes, and the version of you that goes with them.',
      caps: [['6 PM','The day won\u2019t close'],['3 AM','Awake, and the loop starts again'],['8 AM','The morning pays for it']],
      note: 'Early-morning waking between three and five is tied to an early cortisol rise, and affects roughly 15\u201320% of adults.',
      items: [
        ['Sleep',      'The hours you don\u2019t get because the day won\u2019t close.',                                          'var(--mob)'],
        ['Patience',   'What\u2019s left for the people you\u2019d give anything for \u2014 and how little of it there is by evening.', '#C99A5A'],
        ['Clarity',    'The sharpness that used to be there, on decisions that now take days.',                                'var(--gold)'],
        ['Opportunity','The things you talked yourself out of quietly, and called it judgement.',                              '#8FA98C'],
        ['Self-trust', 'The version of yourself you keep waiting to come back.',                                              'var(--teal)']
      ],
      close: 'That person isn\u2019t gone. Your nervous system is holding a state it hasn\u2019t been given a reason to leave.'
    },

    range: {
      eyebrow: 'The state it\u2019s holding',
      h2: 'Your body already<br><span class="gold">knows which one.</span>',
      lede: 'Start from the state, not the story. Your autonomic nervous system moves across a range \u2014 and only one end of it gives you access to perspective, patience and judgement.',
      cols: [
        ['\u201CEverything needs handling, and it needs handling now.\u201D', 'Racing, bracing, scanning. Sharp with people you love. The reaction is out before you\u2019ve decided anything.', 'var(--mob)'],
        ['\u201CThis is hard. I can deal with it.\u201D',                     'Relief enters the body: shoulders lower, breath opens, attention returns. The hard thing remains \u2014 but you have options in front of it.', 'var(--safe)'],
        ['\u201CNone of it is worth the energy.\u201D',                       'Flat, distant, unreachable \u2014 including to yourself. Not laziness. The system conserving what\u2019s left.', 'var(--shut)']
      ],
      closeQ: 'You already know your regulated self.',
      closeK: 'The work is learning how to return there on purpose.'
    },

    journey: {
      title: 'Experience it. Record what shifts.<br>Go deeper when you\u2019re ready.',
      sub: 'Three parts, held inside one continuous practice.',
      experience: 'The guided meditation for the protocol you are running takes you from start to finish. Breathwork and Somatic Release sit here too \u2014 with clear direction on what to do.',
      log: 'Log the session directly in the app and note what shifted. Track your state, the practice you used and what helped.',
      deeper: 'Explore the full resource library: how the mechanism works, scripts, somatic practices and companion guides.',
      deeperNote: 'Individuation sits here: insight and shadow integration move into The Decision \u2014 who you choose to become.'
    },

    change: {
      eyebrow: 'What changes when it does',
      h2: 'Change becomes visible <span class="gold">across daily life.</span>',
      lede: 'Six areas where a more regulated state becomes visible \u2014 to you and to the people around you.',
      items: [
        ['\u25CD','Mind',         '#C97A5A','from loops, fog &amp; paralysis',   'The loop stops circling. Decisions that felt impossible become ordinary.'],
        ['\u25C7','Body',         '#C97A5A','from chronic tension &amp; pain',   'Jaw unclenches. Chest opens. Tension you had stopped noticing begins to let go.'],
        ['\u263E','Rest',         '#D4A843','from a racing mind at night',       'When the system winds down during the day, it stops keeping you up at night.'],
        ['\u26A1','Energy',       '#D4A843','from peaks &amp; crashes',          'Less swing. When you start regulated, the drops become smaller.'],
        ['\u25CE','Relationships','#7FA88C','from leaked irritability',          'Small things stop triggering large reactions. People often notice before you do.'],
        ['\u25C8','Identity',     '#4E9AA6','from eroded self-trust',            'The hard thing is still hard \u2014 but your state now supports how you meet it.']
      ],
      close: 'Calmer nights, shorter arguments, and decisions that stop taking days.'
    },

    priceList: [
      'Every protocol in the track, each with its full resource library',
      'Guided audio, follow-along video, cue cards',
      'Source citations at every step',
      'Journal and progress tracking, private to you',
      'New protocols and resources, included as the track grows'
    ],
    priceNote: 'Cancel anytime \u00B7 keep everything you\u2019ve written<br>Relationship and Professional build on this track \u2014 Track 01 is the prerequisite, not the cheap tier.',
    stickyLine: 'Your SafeRise is ready when you are.'
  },

  /* ── T2 and T3 hold structure and protocol names only.
        Empty strings are the matrix gaps and render as visible markers. ── */
  2: {
    id: 2, visible: true, status: 'live',
    name: 'Relationship Healing',
    kicker: 'Track 02 \u2014 Relationship Healing',
    heroTitle: 'Relationship<br><span class="gold">Healing</span>',
    heroRule: '',
    heroBody: [],
    relation: 'run with another',
    price: PRICING.t2,
    protocols: [
      ['01','Speak',     'The Safe Conversation Protocol',       '','',[]],
      ['02','Repair',    'The Rupture &amp; Repair Protocol',    '','',[]],
      ['03','Rebuild',   'The Trust &amp; Betrayal Protocol',    '','',[]],
      ['04','Release',   'The Resentment Release Protocol',      '','',[]],
      ['05','Open',      'The Intimacy Barrier Protocol',        '','',[]],
      ['06','Level',     'The Double Standard Protocol',         '','',[]],
      ['07','Clarify',   'The Projection Clarity Protocol',      '','',[]],
      ['08','Appreciate','The Appreciation &amp; Support Protocol','','',[]],
      ['09','Meet',      'The Pursue &amp; Withdraw Protocol',   '','',[]],
      ['10','Close',     'The Conscious Separation Protocol',    '','',[]]
    ],
    cost: null, range: null, journey: null, change: null,
    priceList: [], priceNote: '', stickyLine: ''
  },

  3: {
    id: 3, visible: true, status: 'live',
    name: 'Professional Performance',
    kicker: 'Track 03 \u2014 Professional Performance',
    heroTitle: 'Professional<br><span class="gold">Performance</span>',
    heroRule: '',
    heroBody: [],
    relation: 'run at work',
    price: PRICING.t3,
    protocols: [
      ['01','Steady',  'The High-Stakes Presence Protocol',   '','',[]],
      ['02','Navigate','The Conflict Navigation Protocol',    '','',[]],
      ['03','Dissolve','The Imposter Dissolution Protocol',   '','',[]],
      ['04','Loosen',  'The Perfectionism Release Protocol',  '','',[]],
      ['05','Perform', 'The Performance Anxiety Protocol',    '','',[]],
      ['06','Recover', 'The Ambition Recovery Protocol',      '','',[]],
      ['07','Cross',   'The Career Transition Protocol',      '','',[]],
      ['08','Decide',  'The Decision Fatigue Protocol',       '','',[]],
      ['09','Refill',  'The Burnout &amp; Overload Protocol', '','',[]],
      ['10','Unlock',  'The Creative Flow Protocol',          '','',[]]
    ],
    cost: null, range: null, journey: null, change: null,
    priceList: [], priceNote: '', stickyLine: ''
  },

  4: { id: 4, visible: false, status: 'hidden', name: 'Elevation Series' }
};

/* ── Proposed six areas for T2 and T3 — for the appendix, not yet live ── */
var CHANGE_PROPOSALS = {
  2: [
    ['\u25CD','Conversation',  '#C97A5A','from words landing as attack',      'The same sentence lands as information, not as an attack.'],
    ['\u25C7','Repair',        '#C97A5A','from ruptures left open',           'The gap after a fight closes in hours instead of days.'],
    ['\u263E','Predictability','#D4A843','from guessing what is safe to say', 'You stop rehearsing before you speak.'],
    ['\u26A1','Reactivity',    '#D4A843','from nought to furious',            'There is a gap between what they do and what you do next.'],
    ['\u25CE','Closeness',     '#7FA88C','from managed distance',             'Being known stops feeling like exposure.'],
    ['\u25C8','Separateness',  '#4E9AA6','from losing yourself in it',        'You can stay yourself and stay in the room.']
  ],
  3: [
    ['\u25CD','Presence',   '#C97A5A','from rehearsing the worst case',    'You arrive in the room instead of arriving braced.'],
    ['\u25C7','Recovery',   '#C97A5A','from carrying it home',             'The meeting ends when the meeting ends.'],
    ['\u263E','Endurance',  '#D4A843','from running on reserve',           'The week stops being something to survive.'],
    ['\u26A1','Judgement',  '#D4A843','from decisions that take days',     'Choices get made at the size they actually are.'],
    ['\u25CE','Conflict',   '#7FA88C','from avoidance or escalation',      'Disagreement becomes something you can stay in.'],
    ['\u25C8','Standing',   '#4E9AA6','from waiting to be found out',      'Competence stops needing constant re-proving.']
  ]
};


/* ── TRACK 02 ─────────────────────────────────────────────────────── */
var T2 = {
  id: 2, visible: true, status: 'live',
  name: 'Relationship Healing',
  kicker: 'Track 02 \u2014 Relationship Healing',
  heroTitle: 'Relationship<br><span class="gold">Healing</span>',
  heroRule: 'Two nervous systems in one room, each reacting to the other\u2019s reaction.',
  heroBody: [
    'The argument is rarely the problem. The problem is what both bodies do in the seconds before either of you speaks.',
    'These protocols work on your half of it \u2014 the half you can actually reach. Run them alone or together. Nobody has to agree to anything first.'
  ],
  relation: 'run with another',
  price: PRICING.t2,

    art: {
      band:   'two people: one listening alone, one writing, both reading together',
      cost:   'two people in one room not looking at each other \u2014 evening, night, morning',
      range:  'the same pair three times \u2014 one pressing, both settled, one gone',
      change: 'two people at ease in a shared space, facing each other'
    },

  protocols: [
    ['01','Speak',     'The Safe Conversation Protocol',
     'Make it safe enough to say the true thing and be heard.',
     'Rehearsing the sentence, bracing for the reaction, saying the safe version instead.',
     ['I rehearse conversations before I have them','I say the safe version instead of the true one','It becomes a fight before I finish']],
    ['02','Repair',    'The Rupture &amp; Repair Protocol',
     'Close the gap after a fight instead of waiting for it to fade.',
     'Days of politeness, the subject stepped around, nothing actually settled.',
     ['We never finish a fight, we just stop','We go quiet until it passes','I do not know how to come back in']],
    ['03','Rebuild',   'The Trust &amp; Betrayal Protocol',
     'Rebuild ground under a relationship after trust was broken.',
     'Checking, replaying, needing a detail that never quite settles it.',
     ['I check things I should not check','I keep asking and it never lands','I cannot tell whether I am safe here']],
    ['04','Release',   'The Resentment Release Protocol',
     'Put down the score you have been keeping, so it stops running the room.',
     'A score you never meant to keep. Warmth that comes late, or not at all.',
     ['I keep a list I never say out loud','I give, then hold it against them','I am not angry any more, I am done']],
    ['05','Open',      'The Intimacy Barrier Protocol',
     'Stay open when someone gets close, instead of pulling away.',
     'Turning away right when they reach you. Distance you did not choose.',
     ['I go somewhere else when we get close','I want it and I avoid it','Being wanted makes me tense']],
    ['06','Level',     'The Double Standard Protocol',
     'Name the rule that only one of you has to follow.',
     'One person\u2019s needs read as reasonable, the other\u2019s as too much.',
     ['There is one rule for me and another for them','My needs feel like too much to ask','I accept things I would never do']],
    ['07','Clarify',   'The Projection Clarity Protocol',
     'Tell what they actually did apart from what your past says they meant.',
     'You are sure why they did it, before you have any proof.',
     ['I know exactly what they meant, and I am often wrong','This feels older than this relationship','I am reacting to someone who is not in the room']],
    ['08','Appreciate','The Appreciation &amp; Support Protocol',
     'Get back the habit of noticing what the other one is carrying.',
     'Everything lands as not enough. Neither of you says thank you any more.',
     ['I only notice what is missing','We have stopped thanking each other','I feel invisible inside my own effort']],
    ['09','Meet',      'The Pursue &amp; Withdraw Protocol',
     'Break the chase-and-retreat loop by changing your half of it.',
     'One reaching harder, one moving further. Neither able to stop first.',
     ['The more I reach, the further they go','I need space and it reads as leaving','We are stuck in the same loop']],
    ['10','Close',     'The Conscious Separation Protocol',
     'End it, or step back from it, without destroying what it was.',
     'Prolonged limbo. Sharpness neither of you means. The decision kept just out of reach.',
     ['We are ending and pretending not to','I want to leave this well','Neither of us will say it first']]
  ],

  cost: {
    eyebrow: 'And why it matters now',
    h2: 'Think about what this costs.<br><span class="gold">Not the fights.</span>',
    lede: 'Not the arguments you remember. The ordinary evenings in between, and who you both become inside them.',
    caps: [['9 PM','The room goes careful'],['2 AM','One of you is still awake'],['Morning','Neither of you mentions it']],
    note: 'Most couples live with a pattern for years before they name it out loud. By then it is rarely the argument \u2014 it is the architecture around the argument.',
    items: [
      ['Ease',      'Being in the same room without checking the mood every few minutes.',                       'var(--mob)'],
      ['Honesty',   'The things you stopped saying because of what saying them costs.',                       '#C99A5A'],
      ['Desire',    'What closeness turns into when the body is braced before contact.',                      'var(--gold)'],
      ['Time',      'Evenings spent managing a dynamic rather than living in one.',                           '#8FA98C'],
      ['Who you were', 'The person they met, and how rarely either of you sees them now.',                    'var(--teal)']
    ],
    close: 'Neither of you is the problem. Two nervous systems are running a pattern that neither of you chose, and both of you maintain.'
  },

  range: {
    eyebrow: 'The state it\u2019s holding',
    h2: 'Two systems,<br><span class="gold">one shared state.</span>',
    lede: 'Regulation is contagious in both directions. Whichever state you bring into the room is the one the other person\u2019s body starts answering.',
    cols: [
      ['\u201CIf I don\u2019t fix this right now it gets worse.\u201D', 'Pressing, explaining, needing resolution tonight. The urgency reads to them as attack, and their system answers accordingly.', 'var(--mob)'],
      ['\u201CThis is hard. It isn\u2019t a war.\u201D',                 'The subject stays hard, the room does not. You can hear a sentence you disagree with without your body preparing a response.', 'var(--safe)'],
      ['\u201CSay what you like. I\u2019m not here.\u201D',              'Present and unreachable. Not stonewalling as strategy \u2014 a system that has left the room to protect itself.', 'var(--shut)']
    ],
    closeQ: 'You have both been in the settled version of this.',
    closeK: 'The work is getting one of you there first, on purpose.'
  },

  journey: {
    title: 'Run it alone. Run it together.<br>Repair when you\u2019re both ready.',
    sub: 'Three parts, and none of them require the other person\u2019s agreement to start.',
    experience: 'The guided session, voiced start to finish, in a version for running alone and a version for running together. Most people start alone \u2014 changing your own half is the only half you control.',
    log: 'Log the session and note what shifted, in the dynamic as well as in you. What repeats becomes visible far faster in a relationship than it does on your own.',
    deeper: 'The full resource library, plus the two that carry the most weight here: the Invitation to Repair, and the Disclosure &amp; Support script for explaining what you are doing without turning it into a demand.',
    deeperNote: 'Individuation sits here too: what belongs to you, what belongs to them, and what belongs to something older than either of you.'
  },

  change: { eyebrow: 'What changes when it does',
    h2: 'Change becomes visible <span class="gold">in the room.</span>',
    lede: 'Six places where a more regulated state shows up between two people \u2014 usually noticed by the other person first.',
    items: CHANGE_PROPOSALS[2],
    close: 'Fewer fights, faster repair, and time together that stops costing you.' },

  priceList: [
    'All twenty protocols \u2014 Relationship Healing and Personal Transformation',
    'Solo and shared versions of every guided session',
    'Invitation to Repair and Disclosure scripts throughout',
    'Journal and progress tracking, private to you \u2014 not shared with a partner',
    'New protocols and resources, included as the tracks grow'
  ],
  priceNote: 'Cancel anytime \u00B7 keep everything you\u2019ve written<br>Access is cumulative \u2014 Relationship Healing includes the whole of Personal Transformation.',
  stickyLine: 'Your half of it is the half you can reach.'
};

/* ── TRACK 03 ─────────────────────────────────────────────────────── */
var T3 = {
  id: 3, visible: true, status: 'live',
  name: 'Professional Performance',
  kicker: 'Track 03 \u2014 Professional Performance',
  heroTitle: 'Professional<br><span class="gold">Performance</span>',
  heroRule: 'You are the same nervous system at nine in the morning that you are at home.',
  heroBody: [
    'Pressure, exposure, conflict and self-doubt do not become different problems because they happen at work. They become the same problems with a professional face on.',
    'Ten protocols for the states that follow high performers into every room \u2014 run before the meeting, not discussed after it.'
  ],
  relation: 'run at work',
  price: PRICING.t3,

    art: {
      band:   'corridor four minutes before the room, desk log, reading at day\u2019s end',
      cost:   'one person at work \u2014 early, midday, still there late',
      range:  'the same professional before a meeting \u2014 braced, settled, absent',
      change: 'someone leaving work at a reasonable hour, unhurried'
    },

  protocols: [
    ['01','Steady',  'The High-Stakes Presence Protocol',
     'Settle before you walk in, so you arrive as yourself.',
     'Shallow breath, rehearsed worst cases, the meeting running before the meeting.',
     ['I rehearse the worst version on the way in','I am not myself in the room that matters','My best thinking arrives afterwards']],
    ['02','Navigate','The Conflict Navigation Protocol',
     'Stay in the disagreement without blowing it up or walking away.',
     'Heat, then either the sharp version of the point or the silent one.',
     ['I go sharp or I go quiet','I win the exchange and lose the room','I avoid the conversation for weeks']],
    ['03','Dissolve','The Imposter Dissolution Protocol',
     'Stop believing you only got here by luck.',
     'Praise slides off. You work twice as hard for the confidence others get free.',
     ['I am waiting to be found out','Praise does not land, criticism does','I over-prepare for things I already know']],
    ['04','Loosen',  'The Perfectionism Release Protocol',
     'Let it be finished when it is good enough.',
     'Final passes that add nothing. Deadlines met, at a private cost nobody sees.',
     ['I cannot call it done','The last ten percent takes half the time','Good enough feels like failing']],
    ['05','Perform', 'The Performance Anxiety Protocol',
     'Keep access to what you know while people are watching you use it.',
     'You did the work, and it leaves you the moment people look.',
     ['I know it until people are watching','My mind goes blank on cue','I dread the thing I am good at']],
    ['06','Recover', 'The Ambition Recovery Protocol',
     'Find what you actually want, under what you were taught to want.',
     'Arriving and feeling nothing. The next target set before the last one landed.',
     ['I hit the goal and felt nothing','I do not know if I want this','I am chasing something I never chose']],
    ['07','Cross',   'The Career Transition Protocol',
     'Move from one role to the next without losing your footing in between.',
     'The old role gone, the new one unproven, no ground underneath either.',
     ['I do not know who I am without the title','I left and I have not landed','Everything I was good at is behind me']],
    ['08','Decide',  'The Decision Fatigue Protocol',
     'Make small decisions small again.',
     'Small choices cost as much as big ones. Putting it off, and calling it care.',
     ['Every decision costs the same now','I keep gathering information instead of deciding','I am exhausted by choices that do not matter']],
    ['09','Refill',  'The Burnout &amp; Overload Protocol',
     'Refill enough to work at the level you are actually being paid for.',
     'You stopped caring about work you used to love. Rest that does not rest.',
     ['I do not care about work I used to love','The weekend does not touch it','I am running on reserve and have been for months']],
    ['10','Unlock',  'The Creative Flow Protocol',
     'Get back to the work that used to come easily.',
     'Starting, stopping, judging it before it even exists.',
     ['I judge it before it is finished','I cannot start','It used to come easily and now it does not']]
  ],

  cost: {
    eyebrow: 'And why it matters now',
    h2: 'Think about what this costs.<br><span class="gold">Not the salary.</span>',
    lede: 'Not the crisis quarter. The ordinary weeks, and how much of your capacity is spent on the state rather than the work.',
    caps: [['7 AM','Already behind'],['1 PM','The good hours, spent bracing'],['9 PM','Still answering']],
    note: 'The hours are rarely the issue. What costs is running them in a state that removes access to judgement, patience and the work you are actually paid for.',
    items: [
      ['Focus',      'The deep hours lost to a background hum that never fully quiets.',       'var(--mob)'],
      ['Recovery',   'Evenings and weekends spent decompressing rather than living.',          '#C99A5A'],
      ['Judgement',  'Decisions made from urgency, and the cost of unwinding them later.',     'var(--gold)'],
      ['People',     'What your team gets from you on a Thursday, versus what you meant to give.', '#8FA98C'],
      ['The work',   'The reaction you would take back, the room that remembers it, and the promotion that quietly went elsewhere.', 'var(--teal)']
    ],
    close: 'You have not lost the capability. It is unavailable in the state you are running it from.'
  },

  range: {
    eyebrow: 'The state it\u2019s holding',
    h2: 'The room reads<br><span class="gold">your state first.</span>',
    lede: 'Competence is not the variable. Access to it is \u2014 and access closes in exactly the conditions where the stakes are highest.',
    cols: [
      ['\u201CIt\u2019s all urgent and it\u2019s all on me.\u201D', 'Fast, short, over-committed. Decisive in a way that costs later. The email sent before the sentence was finished thinking.', 'var(--mob)'],
      ['\u201CHard week. I know what comes first.\u201D',            'The load is unchanged. Priority is available again, and so is the difference between what is urgent and what is loud.', 'var(--safe)'],
      ['\u201CNone of it matters, so why start.\u201D',              'Flat, detached, present in name. Not laziness \u2014 a system rationing what is left of itself.', 'var(--shut)']
    ],
    closeQ: 'You already know your regulated professional self.',
    closeK: 'The work is arriving as that person on the days it counts.'
  },

  journey: {
    title: 'Ten minutes before the room.<br>Not a debrief afterwards.',
    sub: 'Three parts, built for a working day rather than a retreat.',
    experience: 'The guided meditation for the protocol you are running, plus a short version for the gap between meetings and a Cue Card sized for the walk down the corridor. Nothing here requires a quiet house.',
    log: 'Log the session against the situation \u2014 the pitch, the review, the conversation you were dreading. The pattern in your own working week becomes readable within a month.',
    deeper: 'The full resource library, with the Attention Advisory doing real work here: where your energy belongs today, and which fights are not yours.',
    deeperNote: 'Ambition, identity and what you were trained to want sit in this layer \u2014 the questions underneath the performance.'
  },

  change: { eyebrow: 'What changes when it does',
    h2: 'Change becomes visible <span class="gold">at work.</span>',
    lede: 'Six places where a more regulated state shows up professionally \u2014 usually in how the week ends rather than how it starts.',
    items: CHANGE_PROPOSALS[3],
    close: 'Clearer decisions, weeks you recover from, and reactions that stop costing you.' },

  priceList: [
    'All thirty protocols \u2014 Professional, Relationship Healing and Personal Transformation',
    'Full sessions plus four-minute versions built for a working day',
    'Attention Advisory and conflict scripts throughout',
    'Journal and progress tracking, private to you \u2014 never visible to an employer',
    'New protocols and resources, included as the tracks grow'
  ],
  priceNote: 'Cancel anytime \u00B7 keep everything you\u2019ve written<br>Access is cumulative \u2014 Professional includes Relationship Healing and Personal Transformation in full.',
  stickyLine: 'Ten minutes before the room, not a debrief after it.'
};

TRACKS[2] = T2;
TRACKS[3] = T3;


/* ═══════════════════════════════════════════════════════════════════════
   META — state and framework mapping, all thirty protocols.
   Keyed t{track}-{no}. Kept separate from the protocol arrays so the
   mapping can be audited and corrected without touching copy.

   state       drives the dashboard Arrive check-in and the library filter
   frameworks  drives the framework pages' "what rests on this" section and
               the About page's protocol counts. Never hand-count again.
   ═══════════════════════════════════════════════════════════════════════ */

var FRAMEWORKS = {
  porges:    { name: 'Polyvagal Theory',      person: 'Stephen Porges', short: 'Porges',  register: 'peer-reviewed',    step: 1, colour: 'var(--gold)' },
  heartmath: { name: 'Cardiac coherence',     person: 'HeartMath', short: 'HeartMath',       register: 'peer-reviewed',    step: 2, colour: 'var(--gold)' },
  mate:      { name: 'Compassionate Inquiry', person: 'Gabor Mat\u00E9', short: 'Mat\u00E9', register: 'clinical practice',step: 3, colour: 'var(--gold)' },
  jung:      { name: 'Shadow &amp; individuation', person: 'Carl Jung', short: 'Jung',  register: 'interpretive',     step: 0, colour: 'var(--teal)' },
  dispenza:  { name: 'Observer stance',       person: 'mechanism only', short: 'Dispenza',  register: 'interpretive',     step: 4, colour: 'var(--teal)' },
  watts:     { name: 'Non-resistance',        person: 'Alan Watts', short: 'Watts',      register: 'interpretive',     step: 0, colour: 'var(--teal)' }
};


/* Member-facing state labels. Direction matters more than severity:
   the arc runs up (mobilised) or down (collapsed), and a member has to be
   able to say which without knowing any of the theory. */
var STATES = {
  agitated: { label: 'Agitated', line: 'Racing, on edge, cannot settle.',                        colour: 'var(--mob)'  },
  unsteady: { label: 'Unsteady', line: 'Tips between wound up and switched off. Never level.',   colour: 'var(--gold)' },
  numb:     { label: 'Numb',     line: 'Flat, distant, hard to reach \u2014 including for you.', colour: 'var(--shut)' }
};

/* extras — the two conditional resources. null means UNVERIFIED, not none.
   T1 mapping is taken from SafeRise_PersonalTransformation_ProductionChecklist.
   T2 and T3 need the same confirmation before the protocol page can be honest. */
/* SR-078 · a protocol's library size is derived, never typed.
   SHARED.resources holds every resource. Two of them are conditional: the
   Proximity Guide and the Invitation to Repair only appear where an ongoing
   external source is genuinely part of the pattern, which META[].extras
   records as 'advisory' and 'invitation'.

   extras:null means UNVERIFIED, not none — T2 and T3 still need the same
   confirmation T1 got. Both null and [] therefore yield the unconditional set,
   which is the honest floor: a protocol carrying neither conditional resource
   shows seven, and a hardcoded number would be wrong on every one of them. */
var CONDITIONAL_RESOURCES = { 'Proximity Guide': 'advisory', 'Invitation to Repair': 'invitation' };

function protocolResources(key) {
  var extras = (META[key] || {}).extras;
  return SHARED.resources.filter(function (r) {
    var needs = CONDITIONAL_RESOURCES[r[1]];
    if (!needs) return true;
    return Object.prototype.toString.call(extras) === '[object Array]' &&
           extras.indexOf(needs) > -1;
  });
}
function protocolResourceCount(key) { return protocolResources(key).length; }

var META = {
  /* Track 01 · Personal Transformation */
  't1-01': { extras: [], state: 'agitated',    frameworks: ['porges','heartmath'] },
  't1-02': { extras: ['advisory', 'invitation'], state: 'agitated',    frameworks: ['porges','mate'] },
  't1-03': { extras: ['advisory'], state: 'agitated',    frameworks: ['porges','heartmath'] },
  't1-04': { extras: ['advisory', 'invitation'], state: 'agitated',    frameworks: ['porges','mate'] },
  't1-05': { extras: [], state: 'unsteady',    frameworks: ['mate','jung'] },
  't1-06': { extras: [], state: 'unsteady',    frameworks: ['mate','watts'] },
  't1-07': { extras: [], state: 'numb', frameworks: ['porges','heartmath'] },
  't1-08': { extras: ['advisory', 'invitation'], state: 'unsteady',    frameworks: ['jung','mate'] },
  't1-09': { extras: ['advisory', 'invitation'], state: 'unsteady',    frameworks: ['jung','dispenza'] },
  't1-10': { extras: ['advisory'], state: 'numb', frameworks: ['porges','watts','dispenza'] },

  /* Track 02 · Relationship Healing */
  't2-01': { extras: null, state: 'agitated',    frameworks: ['porges','heartmath'] },
  't2-02': { extras: null, state: 'unsteady',    frameworks: ['porges','mate'] },
  't2-03': { extras: null, state: 'agitated',    frameworks: ['porges','mate'] },
  't2-04': { extras: null, state: 'unsteady',    frameworks: ['mate','jung'] },
  't2-05': { extras: null, state: 'unsteady',    frameworks: ['porges','jung'] },
  't2-06': { extras: null, state: 'unsteady',    frameworks: ['jung','mate'] },
  't2-07': { extras: null, state: 'agitated',    frameworks: ['jung','mate'] },
  't2-08': { extras: null, state: 'numb', frameworks: ['heartmath','dispenza'] },
  't2-09': { extras: null, state: 'unsteady',    frameworks: ['porges','mate'] },
  't2-10': { extras: null, state: 'numb', frameworks: ['mate','watts'] },

  /* Track 03 · Professional Performance */
  't3-01': { extras: null, state: 'agitated',    frameworks: ['porges','heartmath'] },
  't3-02': { extras: null, state: 'agitated',    frameworks: ['porges','mate'] },
  't3-03': { extras: null, state: 'unsteady',    frameworks: ['jung','dispenza'] },
  't3-04': { extras: null, state: 'agitated',    frameworks: ['jung','mate'] },
  't3-05': { extras: null, state: 'agitated',    frameworks: ['heartmath','porges'] },
  't3-06': { extras: null, state: 'numb', frameworks: ['jung','watts'] },
  't3-07': { extras: null, state: 'unsteady',    frameworks: ['jung','watts'] },
  't3-08': { extras: null, state: 'numb', frameworks: ['porges','dispenza'] },
  't3-09': { extras: null, state: 'numb', frameworks: ['porges','watts'] },
  't3-10': { extras: null, state: 'unsteady',    frameworks: ['dispenza','watts'] }
};

/* Derived — never hand-counted. Used by the About page and the framework pages. */
function frameworkReach(key){
  var out = [];
  Object.keys(META).forEach(function(k){
    if (META[k].frameworks.indexOf(key) > -1) out.push(k);
  });
  return out;
}


/* ═══════════════════════════════════════════════════════════════════════
   FAQ — 12 shared + 6 per track = 18 per page, matching v29's count.
   Shared items are written once. A track-specific edit to a shared item
   is a defect, not a variation.
   ═══════════════════════════════════════════════════════════════════════ */

SHARED.faq = [
  ['Is this therapy?',
   ['No. SafeRise is a structured self-guided practice, not psychotherapy, counselling or medical treatment. Andre is trained in shadow-work frameworks, somatic coaching and meditation practice \u2014 he is not a licensed therapist or psychiatrist, and nothing here is a diagnosis.',
    'Plenty of people use it alongside therapy. It gives you something practical to do in the moment a pattern shows up, between the sessions where you work out why it is there.']],

  ['What if I am already working with a therapist?',
   ['That combination tends to work well, and it is worth telling them you are doing it. Every protocol includes a Disclosure &amp; Support script partly for this \u2014 a short way to explain what the practice involves so they can tell you whether it fits what you are working on together.',
    'If your therapist advises against it, follow their guidance. They know your situation. A website does not.']],

  ['Do I need any experience with meditation?',
   ['None. Every protocol is guided from start to finish \u2014 you are told what to do, when, and for how long. If you have tried meditation before and found that being left alone with your thoughts made things worse, this is deliberately not that.']],

  ['How long does a session take, and what do I need?',
   ['Around ten minutes. Headphones if you have them, somewhere you will not be interrupted, and the ability to sit or lie down. Nothing else \u2014 no journal to prepare, no reading first.',
    'There is also a Cue Card in every protocol: a four-line version for moments when ten minutes is not realistic.']],

  ['Is any of this based on real science?',
   ['The core of it rests on peer-reviewed work: Stephen Porges on the nervous system, the HeartMath Institute on heart-rhythm coherence, and Gabor Mat\u00E9\u2019s clinical practice. Carl Jung\u2019s frameworks and the observer stance are included as interpretive layers rather than clinical evidence, and we try to be clear about which is which.',
    'SafeRise itself has not been through a clinical trial. It is a structured practice built on established frameworks, not a treatment with proven outcomes of its own. The frameworks carry the research. The specific combination here does not, and we would rather say so.']],

  ['Is my journal private?',
   ['Your entries and your progress data are yours. They are not shared, not sold, and not used to target advertising. Full detail is in the Privacy Policy.']],

  ['How long before it works?',
   ['There is no timeline here, and no permanent state on offer. No \u201Cnew you in ninety days.\u201D',
    'Most people notice something settle in the first session. Whether the floor rises over weeks depends on repetition, and on what else is happening in your life. The tracker exists so you can see what is actually changing rather than take our word for it.']],

  ['Will the feeling go away for good?',
   ['No, and we would not claim it. States come back \u2014 that is what nervous systems do. What changes is the route back: shorter, more familiar, and available to you rather than dependent on the situation resolving.',
    'Anything promising a feeling will never return is making a claim about you it has no way of making.']],

  ['What actually comes with a protocol?',
   ['A guided audio session, a printable step guide, an explanation of what is happening in your body, body-based practices for between sessions, journalling prompts, and a Cue Card. Some protocols also carry an Attention Advisory or an Invitation to Repair where another person is genuinely part of the pattern.',
    'You are not expected to use all of it. Most people use two or three and ignore the rest.']],

  ['What if it does not work for me?',
   ['Cancel any time from your account. No contract, no cancellation call. If it is not landing within the first month, we would rather you stopped than kept paying out of obligation.',
    'Regulation practices are not universal. Some people respond faster to movement, or to another person in the room, than to a guided sequence alone.']],

  ['Will I need this forever?',
   ['The goal is not that you keep using the protocol. It is that eventually you stop needing all four steps to get there \u2014 the sequence gets shorter, and becomes something you carry rather than something you run.',
    'A method that needs you permanently is built around its own retention, not your regulation.']],

  ['What if I am in crisis right now?',
   ['SafeRise is not crisis support and should not be used in place of it. If you are in immediate danger, contact your local emergency number.',
    'If you need to talk to someone now, findahelpline.com lists free, confidential helplines by country. Reaching out there is the right move, and it is not an overreaction.']]
];

/* ── Track 01 ── */
TRACKS[1].faq = [
  ['Which protocol should I start with?',
   ['The one that names what you are feeling right now. That is the whole design \u2014 you do not need to work out an underlying cause first, and there is no correct order.',
    'If nothing obviously matches, start with the Foundation Protocol. It teaches the four steps in their simplest form, and every other protocol is a version of it.']],
  ['What if I cannot name what I am feeling?',
   ['That is common, and it is not a failure of the method \u2014 it is usually the state itself making words hard to reach.',
    'Start from the body instead. The check-in asks whether you feel agitated, unsteady or numb, and routes you from there. You do not have to be precise to begin.']],
  ['Does this erase what happened to me?',
   ['No. Nothing gets erased, and integration is not deletion. What changes is what drives you \u2014 the pattern stops running the room \u2014 not the history that formed it.',
    'Anything promising a clean slate is describing something other than how this works.']],
  ['I have tried things like this before and they did not stick.',
   ['Then you already know the part that does not work: understanding a pattern does not interrupt it. This is not more insight \u2014 it is a fixed sequence you run during the state, not an explanation of it afterwards.',
    'That is a different thing to try, not a louder version of what did not hold.']],
  ['Can I use it while it is actually happening?',
   ['Yes \u2014 that is what the Cue Card is for, and it is written to be readable when concentration is poor. The full session works better once things have settled slightly.',
    'If you are having severe physical symptoms, or symptoms you have not had before, treat that as a medical question first and speak to a doctor.']],
  ['Can I use it with a partner?',
   ['Track 01 is work you do alone, with your own system. Relationship Healing is the track built for two people, and it includes the whole of this one.']]
];

/* ── Track 02 ── */
TRACKS[2].faq = [
  ['Do we both have to do this?',
   ['No, and most people start alone. Your half of the pattern is the half you can actually reach, and changing it changes what the other person\u2019s body is responding to.',
    'Every protocol has a version for running alone and a version for running together. You can move between them whenever you want.']],
  ['What if my partner will not take part?',
   ['Then run it alone. Nothing here requires their agreement, their attendance or their belief in it.',
    'If and when you want to open the subject, each protocol includes a Disclosure &amp; Support script \u2014 a way to explain what you are doing without it landing as a demand or an accusation.']],
  ['Is this couples therapy?',
   ['No. Couples therapy is a professional relationship with a trained clinician in the room. This is a structured practice the two of you can run yourselves, and it does not replace that.',
    'If there is abuse, coercion or fear in the relationship, this is not the right tool. Speak to a professional.']],
  ['Will they see what I write?',
   ['No. Your journal is yours, even on the shared sessions. Nothing you write is visible to a partner, and there is no shared account.']],
  ['Can I use it if we are separating?',
   ['Yes. The Conscious Separation Protocol is built for exactly that \u2014 ending something, or stepping back from it, without doing damage on the way out.',
    'Several of the others still apply afterwards. Resentment and projection do not end when the relationship does.']],
  ['What if the other person is the problem?',
   ['Sometimes they are, and this track does not ask you to pretend otherwise. It asks a narrower question: what your own system does in response, and what that is costing you.',
    'The Attention Advisory exists for this. Some patterns have an ongoing external source, and the honest answer is to say so rather than practise around it.']]
];

/* ── Track 03 ── */
TRACKS[3].faq = [
  ['Will my employer see any of this?',
   ['No. This is a personal account. Nothing is reported to an employer, and there is no manager view.',
    'If your company buys access for a team, that stays true \u2014 they get licences, not your data.']],
  ['When am I supposed to do this during a workday?',
   ['Before the thing, not after it. Every protocol in this track has a four-minute version for the gap between meetings, and a Cue Card sized for the walk down the corridor.',
    'The full ten-minute session is for the start or the end of the day, if you want it.']],
  ['Is this the same as executive coaching?',
   ['No. A coach works on your decisions, your strategy and your career. This works on the state you are making those decisions from.',
    'They combine well. Plenty of people bring what surfaces here into a coaching session.']],
  ['I do not have ten minutes.',
   ['Then use the four-minute version, or the Cue Card. The method is designed to compress rather than to be skipped.',
    'If you genuinely cannot find four minutes in a day, that is worth noticing. The Burnout &amp; Overload Protocol starts there.']],
  ['What if the problem is the job, not me?',
   ['Then regulating will not fix it, and this track does not claim it will. What it does is give you access to your own judgement, which is what you need in order to see the situation clearly and decide what to do about it.',
    'The Career Transition and Ambition Recovery protocols exist because sometimes the answer is to leave.']],
  ['Can my company buy this for a team?',
   ['Yes. Team access and in-person sessions are handled separately from personal subscriptions \u2014 get in touch and we will put something together.']]
];


/* ═══════════════════════════════════════════════════════════════════════
   THE LIFE LABORATORY — canonical stage list.
   Eight stages, resolved 2026-08 from PHILOSOPHY.md §23 against the
   seven-stage version carried in the dashboard rail and the build plan.
   LEARN is restored: it is the step where material becomes knowledge,
   and the doctrine's central qualification — experience creates material,
   not wisdom — has nowhere to live without it.
   Read by: the Life Laboratory surface, the dashboard rail, the founder
   page, and the Elevation Series.
   ═══════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════
   SR-069 · COMMENTED OUT — RESERVED FOR THE ELEVATION SERIES.

   Not deleted. The Life Laboratory returns with the Elevation Series, and
   this is the record it returns from.

   The eight-stage list below is CANONICAL — LIVE NOTICE EXAMINE LEARN TEST
   DOCUMENT TRANSLATE SERVE. LEARN is part of it. It was missing from an
   earlier seven-stage version carried in the dashboard rail; do not restore
   that version, and do not re-derive the count from anything else.

   The `caveat` string must NEVER be omitted from any surface that shows the
   stages. It is the qualification that keeps the doctrine honest, not a
   footnote to it.

   `extension` (the second arc — Elevation Series only) and `caveat` are both
   kept inside this block.

   Commented with line comments rather than a block comment on purpose: the
   object carries block comments of its own, and a wrapping block comment
   would terminate at the first inner close marker.

   Also removed while this is out: LIFE_LAB from module.exports below (the
   export throws otherwise), the dashboard rail button, the laboratory ROUTES
   row, its TEXTMAP row, the identity card, and the LIFE LABORATORY block in
   css/saferise-dashboard.css.
   ═══════════════════════════════════════════════════════════════════════ */

// var LIFE_LAB = {
//   stages: [
//     ['LIVE',      'You already did this part. The material is the life you actually lived.'],
//     ['NOTICE',    'Something repeats, or something lands harder than it should. You catch it happening.'],
//     ['EXAMINE',   'Look at what actually happened \u2014 not the story you have been telling about it.'],
//     ['LEARN',     'Take the principle out of the event. This is where material becomes knowledge, and it is the step almost everyone skips.'],
//     ['TEST',      'Try it on purpose, in a situation you choose. If it does not hold up, it was a story rather than a lesson.'],
//     ['DOCUMENT',  'Write it down while it is still accurate. Memory rewrites what it cannot hold.'],
//     ['TRANSLATE', 'Put it in words someone who has not lived it can actually use.'],
//     ['SERVE',     'Give it to someone it would save time, or save from something.']
//   ],
//
//   /* The second arc — Elevation Series only. Not shown on member surfaces
//      before someone has run the first eight. */
//   extension: [
//     ['CREATE VALUE', 'What you know becomes something other people can hold.'],
//     ['EARN',         'Being paid for it is not a betrayal of it.'],
//     ['REINVEST',     'Earnings buy reach.'],
//     ['SERVE MORE',   'The laboratory of one life enters the laboratories of others.']
//   ],
//
//   /* The qualification that keeps this honest. Never omit it from a surface
//      that shows the stages. */
//   caveat: 'Experience does not automatically become wisdom. It becomes material. What happens to the material is the work \u2014 and it needs examination, humility, context, testing and discernment before it is worth handing to anyone else.'
// };


if (typeof module !== 'undefined') {
  /* SR-069 · LIFE_LAB is commented out above and must stay out of this list
     while it is — exporting an undeclared binding throws on require(). */
  module.exports = { PRICING:PRICING, SHARED:SHARED, TRACKS:TRACKS, STATES:STATES,
                     FRAMEWORKS:FRAMEWORKS, META:META, frameworkReach:frameworkReach,
                     CONDITIONAL_RESOURCES:CONDITIONAL_RESOURCES,
                     protocolResources:protocolResources,
                     protocolResourceCount:protocolResourceCount,
                     CHANGE_PROPOSALS:CHANGE_PROPOSALS };
}
