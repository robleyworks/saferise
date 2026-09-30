/* ═════════════════════════════════════════════════════════════════
   SafeRise — content/dev-protocols.js
   SR-473 · made live (was content/dev-protocols.v2.js, committed as a draft
   by SR-465). SR-pending (PASS-AT-1) · THE PROTOCOL TITLES FOR THE TRACKS THAT ARE
   NOT WRITTEN YET.

   SUPERSEDES the SR-460 version. Source of truth is now the September 2026
   COMING SOON TRACK MIGRATION handover (revision B) plus the Substrate
   Development Directive, as ruled by the founder on 29 September.

   WHAT CHANGED FROM SR-460
     · entrepreneurs-journey  REMOVED. Retired as a consumer track. Its assets
       move to a retired path; they are not deleted until every reference is
       audited.
     · life-and-load          ADDED. A NEW track with its own ID — not a rename
       of entrepreneurs-journey. Nothing about the old track carries over.
     · embodied-nutrition     all ten titles replaced
     · strength-and-return    all ten titles replaced
     · sleep-and-recovery     all ten titles replaced
     · executive-presence, sex-and-intimacy, elevation-series — unchanged;
       verified identical to the handover, title for title.
     · money-shift, addiction-recovery — unchanged, and they STAY. The handover
       specifies seven Coming Soon tracks and is silent on both; the founder
       ruled on 29 September that both remain. Coming Soon is nine tracks, not
       seven. Do not remove them on the authority of the handover alone.

   FOUNDER RULING, 29 September: Strength & Return 04 is "The Discipline to
   Rest", not "Rest Without Guilt". The handover used one name for two
   protocols in two tracks. Sleep & Recovery 05 keeps "Rest Without Guilt".
     Sleep    — Rest Without Guilt   · can I stop producing and recover?
     Strength — The Discipline to Rest · can recovery be part of training
                                         rather than proof I am falling behind?

   Shape: DEV_PROTOCOLS[slug] = { kick: '<track kicker>', items: [ '<title>', ... x10 ] }
   Order is 01-10 and is also the order the covers at
   assets/coming/protocol/<slug>-NN.webp are numbered in.

   A track here has no protocol pages, no audio and no record. Anything
   reading this file renders locked, non-navigable cards.
   ═════════════════════════════════════════════════════════════════ */
var DEV_PROTOCOLS = {
  'life-and-load': {
    kick: 'LIFE STAGES, ROLES & TRANSITION',
    items: [
      'The Life You Entered',
      'Carrying It All',
      'The Man Beneath the Roles',
      'Away From Home',
      'The Social Thinning',
      'The Midlife Turn',
      'The Woman Beneath the Roles',
      'The Life on the Shelf',
      'When They Don’t Need You the Same Way',
      'When the Direction Reverses',
    ]
  },
  'executive-presence': {
    kick: 'RESPONSIBLE FOR OTHERS',
    items: [
      'Self-Disqualification',
      'The First Hire',
      'Peer to Boss',
      'Losing the Craft',
      'The Promised Number',
      'Asking for More',
      'Letting Someone Go',
      'Carrying What They Told You',
      'What It’s Costing at Home',
      'Role Drift',
    ]
  },
  'embodied-nutrition': {
    kick: 'FOOD & THE BODY',
    items: [
      'Hunger, Stress & State',
      'Emotional Eating & Urgency',
      'Restriction & Control',
      'Appetite Loss & Shutdown',
      'Cravings & Regulation',
      'When Health Becomes Uncertain',
      'Body Signals & Interoception',
      'Food Shame & Self-Judgment',
      'Consistency Without Rigidity',
      'Returning to Nourishment',
    ]
  },
  'strength-and-return': {
    kick: 'TRAINING & THE BODY',
    items: [
      'The Interrupted Routine',
      'Fear of Losing Progress',
      'Training as Control',
      'The Discipline to Rest',
      'Returning After a Break',
      'Body Comparison',
      'The All-or-Nothing Cycle',
      'Movement After Overload',
      'Rebuilding Trust With the Body',
      'Strength Without Self-Punishment',
    ]
  },
  'sleep-and-recovery': {
    kick: 'NIGHT & RECOVERY',
    items: [
      'The Body Won’t Stand Down',
      'Nighttime Rumination',
      'The 3 AM Wake-Up',
      'Fear of Not Sleeping',
      'Rest Without Guilt',
      'Waking Into Overwhelm',
      'Exhaustion & Emotional Load',
      'Recovery After a Bad Night',
      'Breaking the Sleep-Anxiety Loop',
      'Returning to Rest',
    ]
  },
  'sex-and-intimacy': {
    kick: 'INTIMACY & EMBODIMENT',
    items: [
      'Sexual Self',
      'Sexual Exploration',
      'Relationship Structure',
      'History & Inexperience',
      'Private Sexuality',
      'Sexual Seasons & Libido',
      'Desire Misalignment',
      'Forbidden Desire & Regret',
      'Shutdown & Reconnection',
      'Living With an STI',
    ]
  },
  'elevation-series': {
    kick: 'BEYOND SURVIVAL',
    items: [
      'Arrival Flatness',
      'Attention Capture',
      'The Urge to Leave',
      'Inherited Belief',
      'Deferred Life',
      'When Belief Collapses',
      'What You Won’t Let Go Of',
      'What You Cannot Keep',
      'What You Give Off',
      'Undefended',
    ]
  },
  'money-shift': {
    kick: 'VALUE & FREEDOM',
    items: [
      'Scarcity State',
      'The Balance Check',
      'Earning Shame',
      'The Inherited Ledger',
      'Spending Guilt',
      'Naming a Price',
      'Income Comparison',
      'Windfall Unease',
      'Money in the Room',
      'What Enough Means',
    ]
  },
  'addiction-recovery': {
    kick: 'URGE & REBUILD',
    items: [
      'The Urge',
      'The Trigger Room',
      'The Bargain',
      'Relapse Shame',
      'The Boredom Void',
      'Identity After',
      'Telling People',
      'The Repair Debt',
      'Celebration Risk',
      'Staying with Recovery',
    ]
  }
};
