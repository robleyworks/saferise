/* ══════════════════════════════════════════════════════════════════
   SafeRise — content/f8-tracks.js
   SR-429 · Foundation 8 copy for organisations.html's #sr-org-explorer
   (PASS-F-ORGANISATIONS-EXPLORER-AND-SECTIONS.md §4c). Ships with that
   brief as f8-tracks.json — do NOT read content/tracks.js for this panel;
   the two sources disagree (§4f — 30 protocol names differ between this
   file and the live coming-soon.html, across 5 of these 8 tracks) and the
   reconciliation is not decided. Do not edit copy here.

   Market-outlook fields (interest/favourability/demand/revenue scores) are
   not present in the shipped f8-tracks.json at all — §4e forbids rendering
   them, and the source file already excludes them, so nothing here strips
   or hides them at render time.

   SR-434 (PASS-I.md §3, option (a)) · "Do not edit copy here" still
   stands for every field above — `cover` is new, not a copy edit, and is
   the one field on each object this pass is allowed to touch. Every path
   was confirmed present on disk before being added; none of the eight are
   original portrait covers — all are existing band images (two
   1400×380 journey bands, six 1200×640 "coming" bands) reused as-is, per
   §3's own table. The card and detail-panel cover slots moved to the
   band aspect ratio (16/7, matching the ratio this codebase already uses
   for the track pages' own cost/change images — not an invented number)
   to fit them without a portrait crop neither source shape supports
   cleanly. `coverOrPlate()`'s own fallback pattern (js/saferise-org-
   explorer.js) still applies if a path here is ever found missing later —
   the plate, not a broken <img>. */

var F8_TRACKS = [
  {
    "n": "01",
    "name": "Personal Transformation",
    "layer": "Capacity",
    "cover": "assets/journey/t1-band.webp",
    "lead": "Everyday emotional states. A steadier place to choose.",
    "story": "Family life, schooling, culture and repeated adversity can teach us to anticipate rejection, hide emotion or remain on guard. Those responses can persist as anxiety, anger, shame or shutdown, shaping what feels possible long after the circumstances change. Knowing the pattern does not always make another response accessible. SafeRise helps members notice the state beneath the reaction, explore its learned meaning and practise regulation with compassion. Attention becomes awareness, and awareness becomes authorship: resources support healing, behaviour change, consistency and sound judgment in pursuit of a life and accomplishments that feel personally meaningful.",
    "protocols": [
      "Anxiety Reset",
      "Anger Alchemy",
      "Overwhelm Threshold",
      "Abandonment Wound",
      "Shame Dissolution",
      "Grief Integration",
      "Shutdown Recovery",
      "Jealousy Release",
      "Insecurity Anchor",
      "Powerlessness & Despair"
    ],
    "audience": "Adults navigating everyday distress, transitions and self-doubt; a broad entry point for individuals and organisational members.",
    "depth": "Use a session in a difficult moment, then record the experience. Return to the same protocol to notice recurring triggers, responses and what helps.",
    "guard": "Support for everyday states, alongside professional care where needed."
  },
  {
    "n": "02",
    "name": "Relationship Healing",
    "layer": "Relational",
    "cover": "assets/org/track-t2.webp",
    "lead": "Communication, connection and repair.",
    "story": "How we see and treat ourselves can shape what we expect from others and how we meet them. When disagreement feels like rejection or a need feels dangerous to express, defensiveness, pursuit or withdrawal can erode trust and leave both people unheard. SafeRise helps members recognise their part in the dynamic and where safety is missing, without reducing either person to a label. Regulation, reflection and practical language support an engagement culture of listening, boundaries and repair, creating room for healthier patterns and mutually respectful connection.",
    "protocols": [
      "Safe Conversation",
      "Rupture & Repair",
      "Trust & Betrayal",
      "Resentment Release",
      "Intimacy Barrier",
      "Double Standard",
      "Projection Clarity",
      "Appreciation & Support",
      "Pursue & Withdraw",
      "Conscious Separation"
    ],
    "audience": "Partners, people dating or separating, and adults navigating recurring patterns in close relationships.",
    "depth": "Prepare before a conversation, reflect afterwards and revisit the pattern. Disclosure, support and repair resources help carry private practice into shared life.",
    "guard": "Personal choice and safety come first; repair is never an obligation."
  },
  {
    "n": "03",
    "name": "Professional Performance",
    "layer": "Application",
    "cover": "assets/journey/t3-band.webp",
    "lead": "Access to judgment when the stakes rise.",
    "story": "Work occupies much of waking life within rules, hierarchy, scrutiny and obligations we cannot always choose. These demands can bring up threat, self-doubt or overload, narrowing judgment, silencing useful contributions and making conflict, decisions or performance harder to manage. SafeRise focuses on the person carrying out the work: recognising the state beneath task pressure, role uncertainty, belonging concerns or decision fatigue. The resources support regulation, adaptive habits and clearer communication so existing skills remain more accessible, alongside boundaries and action on working conditions that need to change.",
    "protocols": [
      "High-Stakes Presence",
      "Conflict Navigation",
      "Imposter Dissolution",
      "Perfectionism Release",
      "Performance Anxiety",
      "Belonging Gap",
      "Career Transition",
      "Decision Fatigue",
      "Burnout & Overload",
      "Creative Flow"
    ],
    "audience": "Professionals, individual contributors, managers and client-facing teams; HR, People and learning leaders as organisational sponsors.",
    "depth": "Pair a guided practice with a quick cue before the room. Use decision, communication and progress resources to reflect on what changed under pressure.",
    "guard": "Complements training; workplace harm is not reduced to an individual regulation problem."
  },
  {
    "n": "04",
    "name": "Executive Presence",
    "layer": "Application",
    "cover": "assets/coming/band-08.webp",
    "lead": "Responsibility for others without losing yourself.",
    "story": "Managing people changes the consequences of how someone expresses emotion, speaks and makes decisions. Venting, gossip or uncertainty that once circulated among peers can carry different weight when expressed by the person holding authority. Under pressure, control, avoidance or unpredictable communication can leave a team guarded and a leader isolated. SafeRise addresses this transition into responsibility for people. Members practise recognising their own state, communicating deliberately and creating conditions that support others' safety and agency, with consistent judgment, boundaries and accountability rather than an expectation to control others' emotions.",
    "protocols": [
      "Self-Disqualification",
      "The First Hire",
      "Peer to Boss",
      "Losing the Craft",
      "The Promised Number",
      "Asking for More",
      "Letting Someone Go",
      "Holding Their Confidence",
      "The Home Cost",
      "Role Drift"
    ],
    "audience": "First-time managers, founders making early hires, experienced leaders and People teams supporting leadership transitions.",
    "depth": "Leadership-specific reflection, difficult-message preparation and boundaries around what is yours to hold. Personal progress remains separate from employer reporting.",
    "guard": "Coaching around responsibility; employment procedure and clinical support stay with qualified services."
  },
  {
    "n": "05",
    "name": "Embodied Nutrition",
    "layer": "Substrate",
    "cover": "assets/coming/band-04.webp",
    "lead": "Awareness, enjoyment and sustainable food choices.",
    "story": "Stress, time pressure and social expectations can change how people notice hunger, organise meals and choose food or drink. Learned associations with comfort, scarcity, control or belonging may turn those choices into automatic habits, guilt or intentions that repeatedly collapse. SafeRise develops attention to these patterns and a proactive approach to nutritional balance. Members practise gradual change, enjoyment with balance and confidence in environments that challenge their choices. Qualified nutritional insight supports informed meal and beverage choices, with individual needs and practical circumstances shaping the approach.",
    "protocols": [
      "Before the Reach",
      "The Hour After",
      "Reading Your Signals",
      "Inherited Food Rules",
      "Changing Your Defaults",
      "Enjoying with Balance",
      "Your Own Plate",
      "Control and Safety",
      "When Plans Shift",
      "Nourishment Under Pressure"
    ],
    "audience": "Adults changing dietary habits, maintaining personal choices in unsupportive settings or seeking a calmer relationship with food.",
    "depth": "Dietitian-informed insights, transition reflections and social-boundary scripts support practical choices. Enjoying with Balance spans food and drink; alcohol is one context.",
    "guard": "Clinical review shapes the track; no presumed nutrient deficiency, prescribed diet or detox guidance."
  },
  {
    "n": "06",
    "name": "Strength & Return",
    "layer": "Substrate",
    "cover": "assets/coming/band-03.webp",
    "lead": "Movement goals, changing bodies and recovery.",
    "story": "A fitness goal meets a real body and life: fatigue, overstimulation, embarrassment, insecurity, injury, parenthood, available time and support. Ignoring that context can turn ambition into overreaching, avoidance or shame; a disrupted routine can become a verdict on personal worth. SafeRise works with the mental and emotional transition required to begin, return or pursue a higher level. Members practise recognising their state, adapting expectations and establishing habits that support their chosen goal, including changes in timing, social movement and recovery alongside appropriate specialist guidance.",
    "protocols": [
      "Returning Without Judgment",
      "Your Own Goal",
      "Starting from Exhaustion",
      "Today's Body",
      "Returning After Injury",
      "Movement After Parenthood",
      "A Higher Level",
      "When Motivation Changes",
      "Your Own Pace",
      "Recovery Builds Strength"
    ],
    "audience": "Exercise returners, new parents, people adapting to bodily change and regular exercisers considering athletic goals.",
    "depth": "Distinct goal and parenthood pathways, recovery reflections and expert exercise or rehabilitation resources. Social movement offers alternatives when the gym no longer fits.",
    "guard": "Exercise prescriptions and rehabilitation stay with qualified practitioners; unexplained bodily changes warrant assessment."
  },
  {
    "n": "07",
    "name": "Sleep & Recovery",
    "layer": "Substrate",
    "cover": "assets/coming/band-09.webp",
    "lead": "Purposeful sleep, daytime rest and restoration.",
    "story": "Sleep and rest happen within real demands: night shifts, active households, unfinished work and beliefs that stopping means falling behind. Vigilance, frustration or guilt can make recovery another performance test; depletion can spill into patience, judgment and the next day's choices. SafeRise helps members recognise these states and separate practical constraints from learned pressure. The track supports settling, daytime-sleep boundaries and purposeful time away from work or conflict, building consistent restoration habits. Waking rest complements sufficient sleep, helping members resource the life and goals they want to sustain.",
    "protocols": [
      "Powering Down",
      "Three AM",
      "The Night Ahead",
      "Daytime Rest",
      "Borrowing from Sleep",
      "Sunday Night",
      "Permission to Stop",
      "Leaving Demands Behind",
      "After Little Rest",
      "Choosing Restoration"
    ],
    "audience": "Shift workers, stretched professionals, caregivers and adults whose routines or productivity beliefs make rest difficult.",
    "depth": "Daytime-sleep and household-boundary resources sit alongside sleep-specialist insights. Journaling explores pressure and recovery patterns; waking rest is distinct from sleep.",
    "guard": "Does not endorse chronic sleep restriction or substitute for assessment of persistent sleep problems."
  },
  {
    "n": "08",
    "name": "Elevation Series",
    "layer": "Beyond",
    "cover": "assets/coming/band-01.webp",
    "lead": "Attention, meaning and life beyond survival.",
    "story": "When life is organised around safety, approval or inherited expectations, accomplishment can coexist with flatness, comparison and a sense of postponing oneself. Attention stays occupied by what must be protected or proven; personally meaningful interests remain unexplored. SafeRise helps members notice how these patterns shape their state, interpretation and choices, then explore what matters beyond them. Paced inquiry, regulation and reflection support clearer values and chosen direction, translating awareness into consistent action toward a life and achievements that feel their own.",
    "protocols": [
      "Arrival Flatness",
      "Attention Capture",
      "Urge to Leave",
      "Inherited Belief",
      "Deferred Life",
      "Belief Collapse",
      "Loosening Your Grip",
      "What Cannot Stay",
      "Your Felt Presence",
      "Undefended"
    ],
    "audience": "Existing members, reflective professionals and adults exploring meaning, transition or a deeper direction for their lives.",
    "depth": "Guided inquiry, private journaling and values-based decisions support exploration at the member's pace. Expert insights deepen understanding without prescribing a worldview.",
    "guard": "Inquiry is voluntary; no required belief change, forgiveness or metaphysical explanation."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { F8_TRACKS: F8_TRACKS };
}
