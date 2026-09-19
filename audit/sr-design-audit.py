#!/usr/bin/env python3
"""
SafeRise design audit.

Measures the real rendered DOM with Playwright across pages x themes x viewports
and reports everything that reads as low quality: unreadable contrast, text that
is too small or too tight, lines that are too long, edges that nearly line up but
don't, borders (house rule: none allowed), palette and font sprawl, spacing off
the scale, images at the wrong resolution or aspect, tap targets that are too
small, and horizontal overflow.

Writes audit-report.md, audit-raw.json and full-page screenshots.
"""
import os as _os
_HERE=_os.path.dirname(_os.path.abspath(__file__))
ROOT=_os.environ.get("SR_SITE_ROOT") or _os.path.abspath(_os.path.join(_HERE,".."))
import asyncio, json, os, re, sys, math, statistics, threading, http.server, socketserver, functools, io
from collections import defaultdict, Counter

OUT = _os.path.join(_HERE,"out")
PORT = 8899
BASE = f"http://127.0.0.1:{PORT}"

VIEWPORTS = [("mobile", 390, 844, 3), ("tablet", 1024, 768, 2), ("desktop", 1440, 900, 2)]
THEMES = ["midnight", "sunrise"]

PAGES = [
    ("home",            "/index.html"),
    ("method",          "/method.html"),
    ("coming-soon",     "/coming-soon.html"),
    ("dashboard",       "/dashboard.html"),
    ("protocol-t1p1",   "/protocol.html?track=1&protocol=1"),
    ("protocol-t2p9",   "/protocol.html?track=2&protocol=9"),
    ("resource-t1p1",   "/resource.html?track=1&protocol=1"),
    ("plans",           "/plans.html"),
    ("pricing",         "/pricing.html"),
    ("about",           "/about.html"),
    ("organisations",   "/organisations.html"),
    ("for-organisations","/for-organisations.html"),
    ("getting-help",    "/getting-help.html"),
    ("live-sessions",   "/live-sessions.html"),
    ("member-heartmath","/member-heartmath.html"),
    ("member-frameworks","/member-frameworks.html"),
    ("personal-transformation","/personal-transformation.html"),
    ("login",           "/login.html"),
    ("signup",          "/signup.html"),
    ("account",         "/account.html"),
    ("privacy",         "/privacy.html"),
    ("accessibility",   "/accessibility.html"),
]

# ---------------------------------------------------------------- static server
def serve():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
    class Q(socketserver.ThreadingTCPServer):
        allow_reuse_address = True
        daemon_threads = True
        def handle_error(self, *a): pass
    httpd = Q(("127.0.0.1", PORT), handler)
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()
    return httpd

# ---------------------------------------------------------------- the in-page probe
PROBE = r"""
() => {
  const R = {text:[], borders:[], images:[], taps:[], overflow:[], align:[],
             spacing:[], radii:[], palette:{}, fonts:{}, clipped:[], overimg:[],
             counts:{}, meta:{}};

  const px = v => parseFloat(v) || 0;
  const parseC = s => {
    if (!s) return null;
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[,\s/]+/).filter(x=>x!=="").map(Number);
    if (p.length < 3 || p.some(isNaN)) return null;
    return {r:p[0], g:p[1], b:p[2], a:p.length>3?p[3]:1};
  };
  const over = (fg, bg) => ({
    r: fg.r*fg.a + bg.r*(1-fg.a),
    g: fg.g*fg.a + bg.g*(1-fg.a),
    b: fg.b*fg.a + bg.b*(1-fg.a), a:1});
  const lum = c => {
    const f = v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); };
    return 0.2126*f(c.r)+0.7152*f(c.g)+0.0722*f(c.b);
  };
  const ratio = (a,b) => { const l1=lum(a), l2=lum(b); const hi=Math.max(l1,l2), lo=Math.min(l1,l2);
    return (hi+0.05)/(lo+0.05); };
  const hex = c => "#"+[c.r,c.g,c.b].map(v=>Math.round(v).toString(16).padStart(2,"0")).join("");

  // composite background up the tree; returns {bg, imageAncestor}
  function bgOf(el) {
    let node = el, acc = null, img = null;
    const stack = [];
    while (node && node.nodeType === 1) {
      const cs = getComputedStyle(node);
      if (cs.backgroundImage && cs.backgroundImage !== "none" && !img) img = node;
      const c = parseC(cs.backgroundColor);
      if (c && c.a > 0) stack.push(c);
      if (c && c.a >= 0.999) break;
      node = node.parentElement;
    }
    let base = {r:255,g:255,b:255,a:1};
    for (let i = stack.length - 1; i >= 0; i--) base = over(stack[i], base);
    return {bg: base, img};
  }

  function sel(el) {
    if (!el || el.nodeType !== 1) return "";
    let s = el.tagName.toLowerCase();
    if (el.id) return s + "#" + el.id;
    const cls = (el.className && typeof el.className === "string")
      ? el.className.trim().split(/\s+/).slice(0,3).join(".") : "";
    if (cls) s += "." + cls;
    const p = el.parentElement;
    if (p && p.tagName !== "BODY") {
      const pc = (p.className && typeof p.className === "string")
        ? p.className.trim().split(/\s+/)[0] : "";
      s = (p.id ? "#"+p.id : (pc ? "."+pc : p.tagName.toLowerCase())) + " > " + s;
    }
    return s;
  }
  function vis(el) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") return false;
    if (px(cs.opacity) < 0.05) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return false;
    if (r.bottom < -2000) return false;
    // Off-canvas: the .skip / visually-hidden pattern parks elements at
    // left:-9999px. They are not on screen, so their unfocused colour is
    // not a real contrast failure. Reject anything entirely outside the
    // viewport's horizontal band.
    if (r.right < 1 || r.left > window.innerWidth + 2000) return false;
    if (cs.clip === "rect(0px, 0px, 0px, 0px)") return false;
    return true;
  }
  function ownText(el) {
    let t = "";
    for (const n of el.childNodes) if (n.nodeType === 3) t += n.nodeValue;
    return t.trim();
  }
  // effective opacity from ancestors
  function effOpacity(el) {
    let o = 1, n = el;
    while (n && n.nodeType === 1) { o *= px(getComputedStyle(n).opacity) || 1; n = n.parentElement; }
    return o;
  }

  const all = Array.from(document.querySelectorAll("*"));
  R.counts.elements = all.length;

  const colorUse = {}, fontUse = {}, radiusUse = {}, spaceUse = {};

  for (const el of all) {
    const tag = el.tagName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || tag === "HEAD") continue;
    if (!vis(el)) continue;
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    // ---- palette / fonts / radii / spacing census
    const cc = parseC(cs.color);
    if (cc && cc.a > 0.05) colorUse[hex(cc)] = (colorUse[hex(cc)]||0)+1;
    const bc = parseC(cs.backgroundColor);
    if (bc && bc.a > 0.05) colorUse[hex(bc)] = (colorUse[hex(bc)]||0)+1;
    const ff = (cs.fontFamily||"").split(",")[0].replace(/["']/g,"").trim();
    if (ff) fontUse[ff] = (fontUse[ff]||0)+1;
    for (const k of ["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]) {
      const v = px(cs[k]); if (v > 0 && v < 400) radiusUse[v] = (radiusUse[v]||0)+1;
    }
    for (const k of ["marginTop","marginBottom","paddingTop","paddingBottom","paddingLeft","paddingRight","gap","rowGap","columnGap"]) {
      const v = px(cs[k]); if (v > 0 && v < 200) spaceUse[v] = (spaceUse[v]||0)+1;
    }

    // ---- borders (house rule: none)
    for (const side of ["Top","Right","Bottom","Left"]) {
      const w = px(cs["border"+side+"Width"]);
      const st = cs["border"+side+"Style"];
      const c  = parseC(cs["border"+side+"Color"]);
      if (w >= 1 && st !== "none" && st !== "hidden" && c && c.a > 0.06) {
        R.borders.push({sel:sel(el), side, w, style:st, color:hex(c), alpha:+c.a.toFixed(2),
                        w_px:Math.round(rect.width), h_px:Math.round(rect.height)});
      }
    }

    // ---- text
    const t = ownText(el);
    if (t.length >= 2 && !/^[\s·•|—–-]+$/.test(t)) {
      const fs = px(cs.fontSize);
      const fw = parseInt(cs.fontWeight) || 400;
      const lh = cs.lineHeight === "normal" ? fs*1.2 : px(cs.lineHeight);
      const eo = effOpacity(el);
      const fgRaw = parseC(cs.color);
      if (fgRaw) {
        const fg0 = {r:fgRaw.r, g:fgRaw.g, b:fgRaw.b, a: Math.min(1, fgRaw.a * eo)};
        const {bg, img} = bgOf(el);
        const fg = over(fg0, bg);
        const cr = ratio(fg, bg);
        const large = fs >= 24 || (fs >= 18.66 && fw >= 700);
        const need = large ? 3.0 : 4.5;
        const rec = {
          sel: sel(el), text: t.slice(0,70), fs:+fs.toFixed(1), fw, lh:+lh.toFixed(1),
          lhr: fs ? +(lh/fs).toFixed(2) : 0,
          fg: hex(fg), bg: hex(bg), ratio:+cr.toFixed(2), need, large,
          alpha:+fg0.a.toFixed(2),
          w:Math.round(rect.width),
          chars: t.length,
          measure: fs ? +(rect.width / (fs*0.5)).toFixed(0) : 0,
          overImage: !!img,
          imgSel: img ? sel(img) : null
        };
        if (img) { R.overimg.push(rec); }
        else if (cr < need) { R.text.push(rec); }
        // small / tight / long regardless of contrast
        if (fs > 0 && fs < 12) R.text.push(Object.assign({}, rec, {issue:"tiny"}));
        else if (fs >= 12 && fs < 14.5 && t.length > 40) R.text.push(Object.assign({}, rec, {issue:"small-body"}));
        if (fs >= 14 && lh/fs < 1.35 && t.length > 60) R.text.push(Object.assign({}, rec, {issue:"tight-leading"}));
        if (t.length > 90 && rect.width/(fs*0.5) > 88) R.text.push(Object.assign({}, rec, {issue:"long-measure"}));
        if (fg0.a < 0.72 && t.length > 20) R.text.push(Object.assign({}, rec, {issue:"faded"}));
      }
      // clipped text
      if ((cs.overflow === "hidden" || cs.overflowY === "hidden") &&
          el.scrollHeight > el.clientHeight + 2 && el.clientHeight > 0 &&
          !el.className.toString().match(/clamp|marquee|carousel|track|rail/i)) {
        R.clipped.push({sel:sel(el), text:t.slice(0,50),
                        scrollH:el.scrollHeight, clientH:el.clientHeight});
      }
    }

    // ---- images
    if (tag === "IMG") {
      const nw = el.naturalWidth, nh = el.naturalHeight;
      const dw = rect.width, dh = rect.height;
      const src = (el.currentSrc || el.src || "").replace(location.origin, "");
      if (dw >= 4 && dh >= 4) {
        const rec = {sel:sel(el), src, nw, nh, dw:Math.round(dw), dh:Math.round(dh),
                     alt: el.getAttribute("alt"), loading: el.getAttribute("loading"),
                     fit: cs.objectFit, dpr: window.devicePixelRatio};
        if (!nw || !nh) { rec.issue = "broken"; R.images.push(rec); }
        else {
          const need = dw * window.devicePixelRatio;
          rec.ratioNeeded = +(nw/need).toFixed(2);
          if (nw < dw * 0.98) rec.issue = "upscaled";
          else if (nw < need * 0.75) rec.issue = "soft-on-retina";
          else if (nw > need * 2.2 && nw > 900) rec.issue = "oversized";
          const ar = nw/nh, dr = dw/dh;
          if (cs.objectFit !== "cover" && cs.objectFit !== "contain" &&
              Math.abs(ar-dr)/ar > 0.04) rec.issue = (rec.issue?rec.issue+"+":"")+"distorted";
          if (rec.issue) R.images.push(rec);
        }
      }
    }

    // ---- tap targets
    if (/^(A|BUTTON|SUMMARY)$/.test(tag) || el.getAttribute("role") === "button" ||
        (tag === "INPUT" && /button|submit|checkbox|radio/.test(el.type||""))) {
      if (rect.width > 0 && rect.height > 0 && (rect.height < 40 || rect.width < 28)) {
        const inline = el.parentElement && /P|LI|SPAN|TD/.test(el.parentElement.tagName)
                       && getComputedStyle(el).display === "inline";
        if (!inline)
          R.taps.push({sel:sel(el), text:(el.innerText||"").trim().slice(0,40),
                       w:Math.round(rect.width), h:Math.round(rect.height)});
      }
    }
  }

  // ---- horizontal overflow
  const de = document.documentElement;
  R.meta.scrollW = de.scrollWidth; R.meta.clientW = de.clientWidth;
  R.meta.docH = de.scrollHeight;
  if (de.scrollWidth > de.clientWidth + 1) {
    for (const el of all) {
      if (!vis(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.right > de.clientWidth + 1.5 && r.width < de.clientWidth * 3 && r.width > 8) {
        R.overflow.push({sel:sel(el), right:Math.round(r.right), over:Math.round(r.right-de.clientWidth),
                         w:Math.round(r.width)});
      }
    }
    R.overflow = R.overflow.slice(0, 25);
  }

  // ---- alignment: siblings that nearly line up
  const parents = new Map();
  for (const el of all) {
    if (!vis(el)) continue;
    const p = el.parentElement; if (!p) continue;
    if (!parents.has(p)) parents.set(p, []);
    parents.get(p).push(el);
  }
  for (const [p, kids] of parents) {
    const blocks = kids.filter(k => {
      const cs = getComputedStyle(k);
      if (/inline(?!-block|-flex|-grid)/.test(cs.display)) return false;
      if (cs.position === "absolute" || cs.position === "fixed") return false;
      const r = k.getBoundingClientRect();
      return r.width > 24 && r.height > 8;
    });
    if (blocks.length < 2 || blocks.length > 40) continue;
    const pcs = getComputedStyle(p);
    const row = /flex|grid/.test(pcs.display) &&
                !/column/.test(pcs.flexDirection||"");
    const key = row ? "top" : "left";
    const vals = blocks.map(b => ({el:b, v: b.getBoundingClientRect()[key],
                                  w: b.getBoundingClientRect().width,
                                  h: b.getBoundingClientRect().height}));
    // cluster
    const seen = new Set();
    for (let i=0;i<vals.length;i++) for (let j=i+1;j<vals.length;j++) {
      const d = Math.abs(vals[i].v - vals[j].v);
      if (d > 0.4 && d <= 8) {
        const k2 = sel(vals[i].el)+"|"+sel(vals[j].el);
        if (seen.has(k2)) continue; seen.add(k2);
        R.align.push({kind:key+"-edge", parent:sel(p), a:sel(vals[i].el), b:sel(vals[j].el),
                      delta:+d.toFixed(1)});
      }
      // near-equal widths that aren't equal
      if (!row) {
        const dw = Math.abs(vals[i].w - vals[j].w);
        if (dw > 0.4 && dw <= 8 && vals[i].w > 120) {
          const k3 = "w"+sel(vals[i].el)+"|"+sel(vals[j].el);
          if (seen.has(k3)) continue; seen.add(k3);
          R.align.push({kind:"width", parent:sel(p), a:sel(vals[i].el), b:sel(vals[j].el),
                        delta:+dw.toFixed(1), aw:+vals[i].w.toFixed(1), bw:+vals[j].w.toFixed(1)});
        }
      }
    }
  }
  R.align = R.align.slice(0, 120);

  R.palette = colorUse; R.fonts = fontUse;
  R.radii = radiusUse; R.spacing = spaceUse;
  return R;
}
"""

SET_THEME = """
(theme) => {
  try {
    localStorage.setItem('sr-theme', theme);
    localStorage.setItem('saferise-theme', theme);
    localStorage.setItem('theme', theme);
  } catch(e) {}
  document.documentElement.setAttribute('data-theme', theme);
}
"""


async def run():
    from playwright.async_api import async_playwright
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(os.path.join(OUT, "shots"), exist_ok=True)
    results = []
    console_errs = defaultdict(list)
    net_fail = defaultdict(list)

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(
            executable_path="/opt/pw-browsers/chromium" if os.path.exists("/opt/pw-browsers/chromium") else None,
            args=["--force-color-profile=srgb", "--disable-lcd-text"])
        for vname, vw, vh, dpr in VIEWPORTS:
            ctx = await browser.new_context(viewport={"width": vw, "height": vh},
                                            device_scale_factor=dpr,
                                            reduced_motion="reduce")
            page = await ctx.new_page()
            for theme in THEMES:
                await page.add_init_script(f"""
                  try {{
                    localStorage.setItem('sr-theme', {json.dumps(theme)});
                    localStorage.setItem('saferise-theme', {json.dumps(theme)});
                    localStorage.setItem('theme', {json.dumps(theme)});
                  }} catch(e) {{}}
                """)
                for pname, path in PAGES:
                    key = f"{pname}|{theme}|{vname}"
                    errs, fails = [], []
                    page.on("console", lambda m, E=errs: E.append(m.text) if m.type == "error" else None)
                    page.on("requestfailed", lambda r, F=fails: F.append(r.url))
                    page.on("response", lambda r, F=fails: F.append(f"{r.status} {r.url}") if r.status >= 400 else None)
                    try:
                        await page.goto(BASE + path, wait_until="domcontentloaded", timeout=30000)
                        try:
                            await page.wait_for_load_state("networkidle", timeout=8000)
                        except Exception:
                            pass
                        await page.evaluate(SET_THEME, theme)
                        await page.wait_for_timeout(700)
                        data = await page.evaluate(PROBE)
                    except Exception as e:
                        results.append({"page": pname, "theme": theme, "vp": vname,
                                        "error": str(e)[:300]})
                        page.remove_listener("console", lambda *a: None) if False else None
                        continue
                    data.update({"page": pname, "theme": theme, "vp": vname,
                                 "url": path, "vw": vw, "dpr": dpr})
                    data["console"] = list(dict.fromkeys(errs))[:12]
                    data["netfail"] = list(dict.fromkeys(fails))[:25]
                    results.append(data)
                    if vname == "desktop" and theme == "midnight":
                        try:
                            await page.screenshot(path=os.path.join(OUT, "shots", f"{pname}-{theme}-{vname}.png"),
                                                  full_page=True, timeout=25000)
                        except Exception:
                            pass
                    if vname == "mobile" and theme == "sunrise":
                        try:
                            await page.screenshot(path=os.path.join(OUT, "shots", f"{pname}-{theme}-{vname}.png"),
                                                  full_page=True, timeout=25000)
                        except Exception:
                            pass
                    print(f"  {key}: text={len(data['text'])} over-img={len(data['overimg'])} "
                          f"borders={len(data['borders'])} img={len(data['images'])} "
                          f"align={len(data['align'])} taps={len(data['taps'])} "
                          f"ovf={len(data['overflow'])}", flush=True)
            await ctx.close()
        await browser.close()

    with open(os.path.join(OUT, "audit-raw.json"), "w") as f:
        json.dump(results, f)
    print(f"\nwrote {os.path.join(OUT,'audit-raw.json')}  ({len(results)} runs)")
    return results


if __name__ == "__main__":
    httpd = serve()
    try:
        asyncio.run(run())
    finally:
        httpd.shutdown()
