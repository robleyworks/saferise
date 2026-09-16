/* ==========================================================================
   sr-resource-shapes.js
   Renders one structural diagram per resource type into a mount point, and
   wires segment clicks to the matching text section.

   Usage in markup — no copy lives here except shape furniture:
     <div class="sr-shape" data-sr-shape="fan" data-sr-shape-key="t1-01-02"></div>

   Shapes: chain · fan · floor · ladder · dial · arc · overlap · fork
   Content for a shape comes from SR_SHAPE_DATA, keyed the same way
   guidance.js keys its entries.
   ========================================================================== */
(function (global) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var REDUCED = global.matchMedia &&
    global.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = global.matchMedia &&
    global.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---- tiny svg helper ------------------------------------------------- */
  function el(name, attrs, kids) {
    var n = document.createElementNS(NS, name);
    if (attrs) for (var k in attrs) if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    (kids || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }
  function txt(cls, x, y, s, attrs) {
    var t = el('text', Object.assign({ class: cls, x: x, y: y }, attrs || {}));
    t.textContent = s;
    return t;
  }
  function polar(cx, cy, r, a) {
    var t = a * Math.PI / 180;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  }
  function band(cx, cy, ri, ro, a1, a2) {
    var lg = Math.abs(a2 - a1) > 180 ? 1 : 0;
    var p1 = polar(cx, cy, ro, a1), p2 = polar(cx, cy, ro, a2);
    var p3 = polar(cx, cy, ri, a2), p4 = polar(cx, cy, ri, a1);
    return 'M' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) +
      'A' + ro + ' ' + ro + ' 0 ' + lg + ' 1 ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1) +
      'L' + p3[0].toFixed(1) + ' ' + p3[1].toFixed(1) +
      'A' + ri + ' ' + ri + ' 0 ' + lg + ' 0 ' + p4[0].toFixed(1) + ' ' + p4[1].toFixed(1) + 'Z';
  }
  function arcPath(cx, cy, r, a1, a2, sweep) {
    var p1 = polar(cx, cy, r, a1), p2 = polar(cx, cy, r, a2);
    return 'M' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) +
      'A' + r + ' ' + r + ' 0 0 ' + sweep + ' ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
  }
  function grad(defs, id, stops, x1, y1, x2, y2) {
    var g = el('linearGradient', { id: id, x1: x1, y1: y1, x2: x2, y2: y2 });
    stops.forEach(function (s) {
      g.appendChild(el('stop', { offset: s[0], 'stop-color': s[1], 'stop-opacity': s[2] }));
    });
    defs.appendChild(g);
    return 'url(#' + id + ')';
  }
  function svg(vb) {
    var s = el('svg', { viewBox: vb, role: 'img' });
    s.appendChild(el('defs'));
    return s;
  }
  var uid = 0;
  function nextId(p) { return 'sr' + p + (++uid); }

  /* ---- shapes ---------------------------------------------------------- */
  var SHAPES = {};

  /* chain — an ordered causal sequence, each link narrower than the last */
  SHAPES.chain = function (d) {
    var s = svg('0 0 600 200'), defs = s.querySelector('defs');
    var f = grad(defs, nextId('c'), [['0%', d.accent, '.3'], ['100%', d.accent, '.08']], 0, 0, 1, 0);
    var boxes = [
      { d: 'M0 18H180L200 80L180 142H0Z', lip: 'M0 18H180', x: 24, o: 1, fs: 20, ly: 56, ty: 88 },
      { d: 'M212 30H372L392 80L372 130H212L232 80Z', lip: 'M212 30H372', x: 246, o: .84, fs: 18, ly: 62, ty: 90 },
      { d: 'M404 42H564L584 80L564 118H404L424 80Z', lip: 'M404 42H564', x: 436, o: .68, fs: 18, ly: 70, ty: 100 }
    ];
    (d.links || []).slice(0, 3).forEach(function (lk, i) {
      var b = boxes[i];
      var g = el('g', { class: 'sr-u', opacity: b.o });
      g.appendChild(el('path', { d: b.d, fill: f }));
      g.appendChild(el('path', { d: b.lip, fill: 'none', stroke: 'rgba(255,255,255,.3)', 'stroke-width': 1.3 }));
      g.appendChild(txt('sr-lb', b.x, b.ly, lk.label, { fill: d.accent, style: 'font-size:13px' }));
      (lk.lines || []).forEach(function (line, j) {
        g.appendChild(txt('sr-tx', b.x, b.ty + j * 24, line, { 'font-size': b.fs }));
      });
      s.appendChild(g);
    });
    s.appendChild(el('path', { d: 'M0 166h600', stroke: 'rgba(255,255,255,.07)' }));
    if (d.caption) s.appendChild(txt('sr-sm', 0, 190, d.caption));
    return s;
  };

  /* fan — parallel options with no order */
  SHAPES.fan = function (d) {
    var s = svg('0 0 600 340'), defs = s.querySelector('defs');
    var items = (d.items || []).slice(0, 5), n = items.length || 5;
    var f = grad(defs, nextId('f'), [['0%', d.accent, '.36'], ['100%', d.accent, '.07']], .5, 0, .5, 1);
    var span = 180 / n, GAP = 1.6, CX = 300, CY = 300, RI = 120, RO = 228;
    items.forEach(function (it, i) {
      var a1 = 180 + i * span + GAP, a2 = 180 + (i + 1) * span - GAP, mid = (a1 + a2) / 2;
      var g = el('g', { class: 'sr-seg', tabindex: 0, role: 'button', 'aria-label': it.label });
      if (it.target) g.setAttribute('data-target', it.target);
      g.appendChild(el('path', { d: band(CX, CY, RI, RO, a1, a2), fill: f }));
      var lid = nextId('a');
      defs.appendChild(el('path', { id: lid, d: arcPath(CX, CY, 196, mid - 16, mid + 16, 1), fill: 'none' }));
      var t = el('text', { class: 'sr-lb', fill: d.accent });
      var tp = el('textPath', { href: '#' + lid, startOffset: '50%', 'text-anchor': 'middle' });
      tp.textContent = it.label; t.appendChild(tp); g.appendChild(t);
      s.appendChild(g);
    });
    s.appendChild(el('path', {
      d: arcPath(CX, CY, RO, 181.6, 358.4, 1), fill: 'none',
      stroke: 'rgba(255,255,255,.28)', 'stroke-width': 1.3
    }));
    if (d.hubKick) s.appendChild(txt('sr-sm', 300, 268, d.hubKick, { 'text-anchor': 'middle', 'letter-spacing': 2.6 }));
    if (d.hub) s.appendChild(txt('sr-tx', 300, 298, d.hub, { 'text-anchor': 'middle', 'font-size': 21 }));
    if (d.caption) s.appendChild(txt('sr-sm', 300, 326, d.caption, { 'text-anchor': 'middle' }));
    return s;
  };

  /* floor — conditions that all have to hold */
  SHAPES.floor = function (d) {
    var rows = (d.rows || []).slice(0, 4), n = rows.length;
    var h = 46 * n + 36, s = svg('0 0 600 ' + h), defs = s.querySelector('defs');
    var f = grad(defs, nextId('fl'), [['0%', d.accent, '.3'], ['100%', d.accent, '.07']], .5, 0, .5, 1);
    rows.forEach(function (r, i) {
      var y = 10 + i * 46, w = 288 + i * 84, x = (600 - w) / 2;
      s.appendChild(el('rect', { x: x, y: y, width: w, height: 38, rx: 9, fill: f }));
      s.appendChild(el('path', {
        d: 'M' + (x + 9) + ' ' + (y + 1) + 'h' + (w - 18),
        stroke: 'rgba(255,255,255,.28)', 'stroke-width': 1.2, fill: 'none'
      }));
      s.appendChild(txt('sr-tx', 300, y + 25, r, {
        'text-anchor': 'middle', 'font-size': 17,
        fill: i === n - 1 ? 'var(--text)' : 'var(--text2)'
      }));
    });
    if (d.caption) s.appendChild(txt('sr-sm', 300, h - 8, d.caption, { 'text-anchor': 'middle' }));
    return s;
  };

  /* ladder — alternating conversational turns, with exits */
  SHAPES.ladder = function (d) {
    var turns = (d.turns || []).slice(0, 4);
    var s = svg('0 0 600 306'), defs = s.querySelector('defs');
    var fa = grad(defs, nextId('la'), [['0%', d.accent, '.32'], ['100%', d.accent, '.06']], 0, 0, 1, 0);
    var fb = grad(defs, nextId('lb'), [['0%', '#fff', '.11'], ['100%', '#fff', '.025']], 1, 0, 0, 0);
    s.appendChild(txt('sr-sm', 16, 16, d.leftLabel || 'YOU', { 'letter-spacing': 2.4, fill: d.accent }));
    s.appendChild(txt('sr-sm', 584, 16, d.rightLabel || 'THEM', { 'text-anchor': 'end', 'letter-spacing': 2.4 }));
    s.appendChild(el('path', { d: 'M300 26v250', stroke: 'rgba(255,255,255,.07)', 'stroke-dasharray': '2 8' }));
    turns.forEach(function (t, i) {
      var y = 30 + i * 62, mine = i % 2 === 0;
      var g = el('g', { class: 'sr-u', opacity: mine ? 1 : .9 });
      if (mine) {
        g.appendChild(el('path', { d: 'M16 ' + y + 'h284l-20 28H16Z', fill: fa }));
        g.appendChild(el('path', { d: 'M16 ' + y + 'h284', stroke: 'rgba(255,255,255,.3)', 'stroke-width': 1.2, fill: 'none' }));
        g.appendChild(txt('sr-tx', 34, y + 21, t.text, { 'font-size': 17 }));
        if (t.exit) {
          g.appendChild(el('path', { d: 'M312 ' + (y + 14) + 'h150', stroke: d.accent, 'stroke-opacity': .5, 'stroke-width': 1.2, fill: 'none' }));
          g.appendChild(el('path', { d: 'M458 ' + (y + 10) + 'l5 4-5 4', stroke: d.accent, 'stroke-opacity': .5, 'stroke-width': 1.2, fill: 'none' }));
          g.appendChild(txt('sr-sm', 470, y + 18, t.exit));
        }
      } else {
        g.appendChild(el('path', { d: 'M584 ' + y + 'H300l20 28h264Z', fill: fb }));
        g.appendChild(txt('sr-tx', 568, y + 21, t.text, { 'text-anchor': 'end', 'font-size': 17, fill: 'var(--text2)' }));
      }
      s.appendChild(g);
    });
    if (d.caption) s.appendChild(txt('sr-sm', 300, 292, d.caption, { 'text-anchor': 'middle' }));
    return s;
  };

  /* dial — independent axes, click scrolls to its section */
  SHAPES.dial = function (d) {
    var axes = (d.axes || []).slice(0, 3), n = axes.length || 3;
    var s = svg('0 0 600 600'), defs = s.querySelector('defs');
    var CX = 300, CY = 300, RI = 128, RO = 240, G = 2, span = 360 / n;
    axes.forEach(function (ax, i) {
      var a1 = -90 + i * span + G, a2 = -90 + (i + 1) * span - G, mid = (a1 + a2) / 2;
      var f = grad(defs, nextId('d'), [['0%', ax.accent, '.36'], ['100%', ax.accent, '.07']], .1, 0, .7, 1);
      var g = el('g', { class: 'sr-seg', tabindex: 0, role: 'button', 'aria-label': ax.label });
      if (ax.target) g.setAttribute('data-target', ax.target);
      g.appendChild(el('path', { d: band(CX, CY, RI, RO, a1, a2), fill: f }));
      g.appendChild(el('path', {
        d: arcPath(CX, CY, RO, a1, a2, 1), fill: 'none',
        stroke: 'rgba(255,255,255,.34)', 'stroke-width': 1.3
      }));
      var lid = nextId('l'), bottom = mid > 0 && mid < 180;
      defs.appendChild(el('path', {
        id: lid, fill: 'none',
        d: bottom ? arcPath(CX, CY, 196, mid + 40, mid - 40, 0)
                  : arcPath(CX, CY, 196, mid - 40, mid + 40, 1)
      }));
      var t = el('text', { class: 'sr-lb', fill: ax.accent });
      var tp = el('textPath', { href: '#' + lid, startOffset: '50%', 'text-anchor': 'middle' });
      tp.textContent = ax.label; t.appendChild(tp); g.appendChild(t);
      s.appendChild(g);
    });
    s.appendChild(el('circle', { cx: CX, cy: CY, r: 114, fill: 'var(--surface-raise)' }));
    s.appendChild(el('circle', { cx: CX, cy: CY, r: 114, fill: 'none', stroke: 'rgba(255,255,255,.13)' }));
    if (d.hubKick) s.appendChild(txt('sr-sm', CX, 278, d.hubKick, { 'text-anchor': 'middle', 'letter-spacing': 2.4 }));
    (d.hub || []).forEach(function (line, i) {
      s.appendChild(txt('sr-tx', CX, 311 + i * 27, line, { 'text-anchor': 'middle', 'font-size': 25 }));
    });
    return s;
  };

  /* arc — a shape over time */
  SHAPES.arc = function (d) {
    var s = svg('0 0 600 196'), defs = s.querySelector('defs');
    var line = grad(defs, nextId('ar'), [['0%', d.accent, '.28'], ['100%', d.accent, '.95']], 0, 0, 1, 0);
    var fill = grad(defs, nextId('af'), [['0%', d.accent, '.14'], ['100%', d.accent, '0']], .5, 0, .5, 1);
    var p = 'M22 150C160 150 200 62 330 50S520 36 578 30';
    s.appendChild(el('path', { d: p + 'L578 168H22Z', fill: fill }));
    s.appendChild(el('path', { d: p, fill: 'none', stroke: line, 'stroke-width': 2.2 }));
    [[22, 150, .45], [140, 141, .58], [240, 88, .72], [452, 39, .85], [578, 30, 1]].forEach(function (m) {
      s.appendChild(el('circle', { cx: m[0], cy: m[1], r: 3.4, fill: d.accent, 'fill-opacity': m[2] }));
    });
    s.appendChild(el('circle', { cx: 330, cy: 50, r: 7, fill: d.accent, 'fill-opacity': .22 }));
    s.appendChild(el('circle', { cx: 330, cy: 50, r: 3.8, fill: d.accent }));
    if (d.mark) {
      s.appendChild(el('path', { d: 'M330 58v16', stroke: d.accent, 'stroke-opacity': .4, 'stroke-dasharray': '2 4' }));
      s.appendChild(txt('sr-sm', 330, 88, d.mark, { 'text-anchor': 'middle', fill: 'var(--text2)' }));
    }
    s.appendChild(txt('sr-sm', 22, 172, d.start || 'First entry'));
    s.appendChild(txt('sr-sm', 578, 172, d.end || 'Now', { 'text-anchor': 'end' }));
    s.appendChild(el('path', { d: 'M22 182h556', stroke: 'rgba(255,255,255,.07)' }));
    return s;
  };

  /* overlap — two things held at once */
  SHAPES.overlap = function (d) {
    var s = svg('0 0 600 268'), defs = s.querySelector('defs');
    function radial(id, cx, color) {
      var g = el('radialGradient', { id: id, cx: cx, cy: '36%', r: '72%' });
      g.appendChild(el('stop', { offset: '0%', 'stop-color': color, 'stop-opacity': '.3' }));
      g.appendChild(el('stop', { offset: '100%', 'stop-color': color, 'stop-opacity': '.05' }));
      defs.appendChild(g); return 'url(#' + id + ')';
    }
    var idA = nextId('oa'), idB = nextId('ob'), clip = nextId('cl');
    var fa = radial(idA, '38%', d.left.accent), fb = radial(idB, '62%', d.right.accent);
    var cp = el('clipPath', { id: clip });
    cp.appendChild(el('circle', { cx: 366, cy: 122, r: 102 })); defs.appendChild(cp);
    s.appendChild(el('circle', { cx: 234, cy: 122, r: 102, fill: fa }));
    s.appendChild(el('circle', { cx: 366, cy: 122, r: 102, fill: fb }));
    var g = el('g', { 'clip-path': 'url(#' + clip + ')' });
    g.appendChild(el('circle', { cx: 234, cy: 122, r: 102, fill: '#f7f1e5', 'fill-opacity': .1 }));
    s.appendChild(g);
    s.appendChild(el('path', { d: 'M234 20a102 102 0 0 0 0 204', fill: 'none', stroke: 'rgba(255,255,255,.26)', 'stroke-width': 1.3 }));
    s.appendChild(el('path', { d: 'M366 20a102 102 0 0 1 0 204', fill: 'none', stroke: 'rgba(255,255,255,.26)', 'stroke-width': 1.3 }));
    s.appendChild(txt('sr-lb', 152, 116, d.left.label, { 'text-anchor': 'middle', fill: d.left.accent }));
    s.appendChild(txt('sr-sm', 152, 138, d.left.sub, { 'text-anchor': 'middle' }));
    s.appendChild(txt('sr-lb', 448, 116, d.right.label, { 'text-anchor': 'middle', fill: d.right.accent }));
    s.appendChild(txt('sr-sm', 448, 138, d.right.sub, { 'text-anchor': 'middle' }));
    s.appendChild(txt('sr-tx', 300, 116, d.middle.label, { 'text-anchor': 'middle', 'font-size': 19 }));
    s.appendChild(txt('sr-sm', 300, 138, d.middle.sub, { 'text-anchor': 'middle' }));
    if (d.caption) s.appendChild(txt('sr-sm', 300, 254, d.caption, { 'text-anchor': 'middle' }));
    return s;
  };

  /* fork — two branches, equal weight */
  SHAPES.fork = function (d) {
    var s = svg('0 0 600 250'), defs = s.querySelector('defs');
    var stem = grad(defs, nextId('fk'), [['0%', d.accent, '.2'], ['100%', d.accent, '.75']], 0, 0, 1, 0);
    var box = grad(defs, nextId('fb'), [['0%', d.accent, '.22'], ['100%', d.accent, '.05']], .5, 0, .5, 1);
    if (d.stem) s.appendChild(txt('sr-sm', 16, 104, d.stem));
    s.appendChild(el('path', { d: 'M16 122h146', stroke: stem, 'stroke-width': 2.4, fill: 'none' }));
    s.appendChild(el('circle', { cx: 172, cy: 122, r: 9, fill: d.accent, 'fill-opacity': .2 }));
    s.appendChild(el('circle', { cx: 172, cy: 122, r: 4.4, fill: d.accent }));
    if (d.node) s.appendChild(txt('sr-sm', 172, 150, d.node, { 'text-anchor': 'middle' }));
    [[118, 54, 26], [126, 190, 162]].forEach(function (b, i) {
      s.appendChild(el('path', {
        d: 'M180 ' + b[0] + 'C244 ' + b[0] + ' 244 ' + b[1] + ' 314 ' + b[1] + 'h18',
        stroke: d.accent, 'stroke-opacity': .45, 'stroke-width': 2, fill: 'none'
      }));
      var br = d.branches[i]; if (!br) return;
      s.appendChild(el('rect', { x: 332, y: b[2], width: 252, height: 56, rx: 10, fill: box }));
      s.appendChild(el('path', { d: 'M341 ' + (b[2] + 1) + 'h234', stroke: 'rgba(255,255,255,.26)', 'stroke-width': 1.2, fill: 'none' }));
      s.appendChild(txt('sr-tx', 352, b[2] + 26, br.title, { 'font-size': 18 }));
      s.appendChild(txt('sr-sm', 352, b[2] + 44, br.sub));
    });
    if (d.caption) s.appendChild(txt('sr-sm', 300, 242, d.caption, { 'text-anchor': 'middle' }));
    return s;
  };

  /* ---- cross-highlight + click-to-scroll ------------------------------- */
  function wire(mount) {
    var segs = [].slice.call(mount.querySelectorAll('.sr-seg'));
    if (!segs.length) return;
    var panels = segs.map(function (s) {
      return s.dataset.target ? document.getElementById(s.dataset.target) : null;
    });

    function set(i) {
      segs.forEach(function (s, j) { s.classList.toggle('is-on', i === j); });
      panels.forEach(function (p, j) {
        if (!p) return;
        p.classList.toggle('is-on', i === j);
        p.classList.toggle('is-dim', i !== j);
      });
    }
    function go(i) {
      set(i);
      var p = panels[i];
      if (p) p.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
    }

    segs.forEach(function (s, i) {
      if (FINE) s.addEventListener('pointerenter', function () { set(i); });
      s.addEventListener('click', function () { go(i); });
      s.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(i); }
      });
      if (FINE && panels[i]) {
        panels[i].addEventListener('pointerenter', function () { set(i); });
      }
    });
    if (panels.some(Boolean)) set(0);
  }

  /* ---- boot ------------------------------------------------------------ */
  function render(mount) {
    var kind = mount.dataset.srShape;
    var key = mount.dataset.srShapeKey;
    var data = (global.SR_SHAPE_DATA || {})[key];
    if (!kind || !data || !SHAPES[kind]) return;
    var node = SHAPES[kind](data);
    node.setAttribute('aria-label', data.alt || '');
    mount.appendChild(node);
    if (data.caption && kind === 'dial') {
      var c = document.createElement('p');
      c.className = 'sr-shape__cap';
      c.textContent = data.caption;
      mount.appendChild(c);
    }
    wire(mount);
  }

  function init(root) {
    var scope = root || document;
    [].slice.call(scope.querySelectorAll('[data-sr-shape]')).forEach(render);
  }

  global.SRResourceShapes = { init: init, render: render, shapes: SHAPES };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); });
  } else {
    init();
  }
})(window);
