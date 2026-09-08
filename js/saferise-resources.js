/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-resources.js · PASS-full-resource-access, Step 3

   srResolveSet(track, protocolNo) reads the content store
   (content/t1|t2|t3-resources.js) and returns the ordered, normalised
   resource records for one protocol, or null. It does not read
   tracks.js's META[].extras or content/inventory.js's PROTOCOL_RESOURCE_TYPES
   — both are per-protocol lists maintained BESIDE the content rather than
   inside it, and inventory.js was found stale against the actual store
   during this pass (t1-01/Anxiety Reset carries a real "advisory" resource
   in content/t1-resources.js that content/inventory.js's checked-in snapshot
   omits — reported in docs/fix-register.md's PASS-full-resource-access
   entry, not fixed here, since regenerating it is tools/build-inventory.py's
   job, not this file's).

   The single per-protocol list this DOES read is T{n}_PROTOCOL_KEYS[key].keys
   — authored inside the same file as the resource bodies themselves, not a
   parallel mapping maintained by hand. That is "the content store", per
   Step 3's own distinction from a maintained map.

   NORMALISED RECORD SHAPE:
     { id, title, sub, body, glyph, audio, pdf, order, type, gtype,
       eyebrow, meta, railTitle, railMeta, advisory }
   The first eight are Step 1's contract. The rest are display fields the
   old inline RESOURCES/PROXIMITY stub carried that the content store does
   not — carried here from TYPE_META (Step 5's merge), not invented per
   protocol.

   LOAD ORDER: after content/t1-resources.js, t2-resources.js,
   t3-resources.js. Does not require content/guidance.js or content/tracks.js
   — glyphs and order come from TYPE_META below (this pass's own canonical
   table, Step 3), not from tracks.js SHARED.resources, which uses a
   different glyph system entirely (icon keywords like 'play'/'gear' for a
   different UI, not the single-character glyphs this reader shows).
   ═══════════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  /* Step 3's reported canonical table. order is 1-based position; used both
     for the glyph/eyebrow/meta lookup and, where a protocol's own `.keys`
     order ever needs a tie-break, as the fallback ordering. */
  var TYPE_META = {
    meditation:     { order: 1,  glyph: '◫', eyebrow: 'Practise',  meta: 'Guided practice · Video' },
    crisiscard:     { order: 2,  glyph: '▤', eyebrow: 'Carry',     meta: 'Portable version' },
    guide:          { order: 3,  glyph: '◑', eyebrow: 'Understand', meta: 'Mechanism &amp; sources' },
    companion:      { order: 4,  glyph: '♡', eyebrow: 'Release',   meta: 'Somatic Release Guide' },
    practice:       { order: 5,  glyph: '⚖', eyebrow: 'Proceed',   meta: 'Safe Practice' },
    advisory:       { order: 6,  glyph: '◎', eyebrow: 'Locate',    meta: 'Proximity Guide · Three tiers' },
    disclosure:     { order: 7,  glyph: '❏', eyebrow: 'Tell',      meta: 'Disclosure &amp; Support Guide' },
    raising:        { order: 8,  glyph: '▲', eyebrow: 'Raise',     meta: 'Raising It' },
    repair:         { order: 9,  glyph: '✉', eyebrow: 'Reopen',    meta: 'Invitation to Repair' },
    record:         { order: 10, glyph: '✎', eyebrow: 'Record',    meta: 'Your Record' },
    accountability: { order: 11, glyph: '◍', eyebrow: 'Widen',     meta: 'Accountability &amp; Empathy' },
    decision:       { order: 12, glyph: '◈', eyebrow: 'Choose',    meta: 'The Decision' },
    /* Not in this pass's own canonical table, tracks.js SHARED.resources,
       or content/inventory.js -- found live in content/t2-resources.js
       while testing (t2p3-safety), kind "Safety Score", present on all 10
       Track 02 protocols (~10 occurrences), absent from Track 01 and
       Track 03 entirely. A real, well-formed 13th resource type
       ("Capacity Check" -- matches the pre-engagement check named in
       relationship-healing.html's own FAQ copy), reported in
       docs/fix-register.md rather than silently folded into an existing
       type. glyph/eyebrow below are this pass's own placeholder, not
       sourced from anywhere -- Andre should assign the real ones. */
    safety:         { order: 13, glyph: '☐', eyebrow: 'Check',     meta: 'Safety Score' },
    /* Also not in the canonical table -- found on exactly one protocol,
       t1-10, kind "Support Resources": an extra crisis-support card
       ("You don't have to carry this alone"), one-off rather than a
       platform type. Placeholder glyph/eyebrow, as above. */
    crisis:         { order: 14, glyph: '✚', eyebrow: 'Reach',     meta: 'Support Resources' }
  };

  function storeFor(track) {
    var t = String(track);
    if (t === '1') return { KEYS: global.T1_PROTOCOL_KEYS, RES: global.T1_RESOURCES };
    if (t === '2') return { KEYS: global.T2_PROTOCOL_KEYS, RES: global.T2_RESOURCES };
    if (t === '3') return { KEYS: global.T3_PROTOCOL_KEYS, RES: global.T3_RESOURCES };
    return null;
  }

  function protocolKey(track, no) {
    return 't' + track + '-' + no;
  }

  /* Step 1's normalised body: body[] is an array of HTML fragment strings
     in every one of the 275 standard-shape records; joined verbatim, never
     reflowed. The 3 locked/meta-shaped Anger Alchemy records (Step 1,
     Attention Advisory/Disclosure/Invitation to Repair) carry body as a
     single string already, not an array — Array.isArray guards both. */
  function joinBody(body) {
    if (Array.isArray(body)) return body.join('');
    return body || '';
  }

  function normaliseOne(id, rec, order, reader) {
    if (!rec) return null;
    var type = id.indexOf(reader + '-') === 0 ? id.slice(reader.length + 1) : id;
    var tm = TYPE_META[type] || {};
    return {
      id: id,
      title: rec.title || rec.kind || '',
      sub: rec.sub || rec.meta || '',
      body: joinBody(rec.body),
      glyph: tm.glyph || '•',
      /* content/guidance.js's own ten keys, verbatim -- 'meditation' has no
         entry by design (its own body is the narrated script, not a
         separate guide-audio track) and 'decision'/'safety' have none
         because neither is a guidance.js type at all. Not actually
         consumed by resource.html's own mountGuidance(), which reads
         gtype/guidanceFor() directly -- kept accurate anyway, since Step 1
         asked for it in the normalised shape. */
      audio: ['crisiscard','guide','companion','practice','advisory','disclosure','raising','repair','record','accountability'].indexOf(type) > -1,
      pdf: true,
      order: order,
      type: type,
      gtype: type,
      eyebrow: tm.eyebrow || '',
      meta: tm.meta || rec.kind || '',
      railTitle: rec.title || rec.kind || '',
      railMeta: rec.sub || rec.meta || '',
      advisory: type === 'advisory'
    };
  }

  /* srResolveSet(track, protocolNo) -> ordered array of normalised records,
     or null if the track/protocol isn't in the store at all. An empty
     array (protocol found, zero resources) is a real, different answer
     from null (protocol not found) and both are meaningful to a caller. */
  function srResolveSet(track, protocolNo) {
    var store = storeFor(track);
    if (!store || !store.KEYS || !store.RES) return null;
    var key = protocolKey(track, protocolNo);
    var entry = store.KEYS[key];
    if (!entry || !entry.keys) return null;
    var reader = entry.reader;
    var out = [];
    for (var i = 0; i < entry.keys.length; i++) {
      var rid = entry.keys[i];
      var rec = normaliseOne(rid, store.RES[rid], i, reader);
      if (rec) out.push(rec);
    }
    return out;
  }

  /* Title matching, Step 4.3's exact normalisation: lowercase, &/and
     folded, &amp; decoded, punctuation and repeated spaces stripped. */
  function normTitle(s) {
    s = String(s || '').replace(/&amp;/gi, '&');
    s = s.toLowerCase().replace(/&/g, ' and ');
    s = s.replace(/[^a-z0-9\s]/g, ' ');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
  }

  global.SafeRiseResources = {
    resolveSet: srResolveSet,
    normTitle: normTitle,
    TYPE_META: TYPE_META
  };
})(window);
