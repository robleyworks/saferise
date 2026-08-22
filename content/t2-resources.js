/* ════════════════════════════════════════════════════════════════════════
   SafeRise — content/t2-resources.js
   Track 02's shared material. SR-203.

   Same shape as content/t1-resources.js (SR-192): one file per track beside
   tracks.js, plain `var` plus the module.exports guard, read synchronously.
   Track 02's ten protocols land here as they are authored; today it holds the
   one block that is required on all ten.

   ── WHY THIS BLOCK IS HERE AT ALL ──

   It appears in How This Works on every Track 02 protocol, immediately before
   *What we rest on*, and must be identical on all ten. It had already drifted
   before install: two protocols were authored carrying it inline and a third
   version sat in the handover as a standalone file. Referenced by identity from
   here, never copied, drift becomes structurally impossible — the same reason
   CHANGE_PROPOSALS is referenced rather than duplicated across two tracks.

   ── WHICH VERSION THIS IS, AND WHY ──

   The SHIPPED copy, lifted verbatim from t2-01, byte-identical to t2-02.
   SR-203 ruled the standalone handover file stale on three grounds: it breaks
   its own stated vocabulary rule by naming the part "the instrument" eight
   times after arguing that describing beats naming; it is written expository
   where the platform is second person and plain; and the shipped copy carries a
   GOLD/PAUSE production marker, so it has been through the recording pass and
   the file has not.

   The handover file is NOT wholly stale and was not discarded — everything
   after this block is live specification. It is preserved at
   docs/reference/SHARED-t2-two-instruments.md with the superseded section
   marked in place.

   ── THE CLOSING LINE IS PART OF THE BLOCK ──

   The Track 01 recommendation, set italic, is the block's closing element and
   not a separate one. Do not lift it out, and do not render it as a footnote.

   GENERATED, NOT AUTHORED. Every word is the shipped word. Cues are data and
   must never render — see t1-resources.js for the rule.
   ════════════════════════════════════════════════════════════════════════ */

var T2_SHARED = {
  twoParts: {
    heading: "The part that's on your side, and the part that can hear them",
    body: [
    "<h4>The part that's on your side, and the part that can hear them</h4>",
    "<p>Almost everyone in a conflict is doing the same thing: building the case for their own version. It doesn't feel like building a case. It feels like thinking clearly, or finally being honest with yourself about what happened.</p>",
    "<p>What's worth knowing is which part of you is doing the building.</p>",
    "<p><strong>One part of you is entirely on your side.</strong> It's the part that keeps you safe, and you need it \u2014 nothing here is telling you to get rid of it. But it works to a few fixed rules, and the rules aren't about fairness. They're about keeping you standing.</p>",
    "<p>You come first. Not out of selfishness \u2014 that's just the job.</p>",
    "<p>Nobody else's version can simply be as true as yours. It has to be measured against yours first.</p>",
    "<p>And it decides what's real. Whether something is fair, or reasonable, or true gets settled by whether it fits what this part already believes.</p>",
    "<p>Run an argument through a part of you with those rules and you win. Every time. Not because you're lying \u2014 because that's what it's for.</p>",
    "<p>Which is the most useful thing to know about your own case: you'd already won it before you started going over the evidence.</p>",
    "<p><strong>There's another part, and it works differently.</strong> It can hear someone else's version as a whole thing in its own right, rather than as a wrong version of yours. It doesn't mean agreeing. It isn't the same as being nice. It's a way of taking in something the first part isn't built to accept.</p>",
    "<p>You need both. The first one stops you being flattened in an argument. The second one is the only one that can end it.</p>",
    "<p><strong>One rule, and it matters more than the rest of this.</strong></p>",
    "<p>You can look at your own. You can't look at theirs.</p>",
    "<p>You can hold that they've got the same two parts, and that theirs is doing the same job for them. That's what puts you level, rather than one of you above the other.</p>",
    "<p>What you can't do is tell them what their side is up to. You can't see it from where you're standing, and saying it out loud is just the first part again, wearing better clothes. <em>That's just your ego talking</em> dismisses their whole version while sounding wise.</p>",
    "<p>If you're explaining someone else's psychology to them in the middle of an argument, that's not insight. That's the case, still being built.</p>",
    "<p><strong>This sits underneath all four steps here.</strong> Naming the state separates it from your version of events. The breathing settles the body that's producing the case. The third step puts the case-building down. And the fourth asks you to stand somewhere that isn't your own spot \u2014 which is the second part, used on purpose, for as long as you can hold it.</p>",
    "<p><em>This is easier once you can catch your own state while you're in it. That's what Track 01 builds, and it's why it comes first. Nothing here needs it, and nothing here is judging whether you're ready \u2014 but the second part is hard to reach for while the first one is running unwatched.</em></p>"
    ],
    cues: [{"block": 7, "type": "GOLD/PAUSE", "note": ""}]
  }
};

if (typeof module !== 'undefined') {
  module.exports = { T2_SHARED: T2_SHARED };
}
