#!/usr/bin/env python3
"""
Pass 2: measure the REAL backdrop behind every piece of text that sits on a photo.

For each candidate: hide the text, screenshot exactly its box (so we capture only
the backdrop), compute the luminance distribution of those pixels, then compute
WCAG contrast of the text colour against the backdrop's best case (p90 luminance),
median, and worst case (p10). Text is only reliably readable if the WORST case
passes, because the eye reads the whole line, not the easy part.
"""
import os as _os
_HERE=_os.path.dirname(_os.path.abspath(__file__))
ROOT=_os.environ.get("SR_SITE_ROOT") or _os.path.abspath(_os.path.join(_HERE,".."))
import asyncio, json, os, io, functools, http.server, socketserver, threading, statistics
from collections import defaultdict
from PIL import Image
Image.MAX_IMAGE_PIXELS = None  # full-page shots legitimately exceed the bomb limit

PORT = 8901; BASE = f"http://127.0.0.1:{PORT}"
OUT = _os.path.join(_HERE,"out")

TARGETS = [
    ("home",            "/index.html"),
    ("coming-soon",     "/coming-soon.html"),
    ("organisations",   "/organisations.html"),
    ("personal-transformation", "/personal-transformation.html"),
    ("protocol-t2p9",   "/protocol.html?track=2&protocol=9"),
    ("protocol-t1p1",   "/protocol.html?track=1&protocol=1"),
    ("dashboard",       "/dashboard.html"),
    ("member-heartmath","/member-heartmath.html"),
    ("live-sessions",   "/live-sessions.html"),
    ("about",           "/about.html"),
    ("plans",           "/plans.html"),
    ("resource-t1p1",   "/resource.html?track=1&protocol=1"),
]
VIEWPORTS = [("desktop", 1440, 900, 2), ("mobile", 390, 844, 3)]
THEMES = ["midnight", "sunrise"]


def serve():
    h = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
    class Q(socketserver.ThreadingTCPServer):
        allow_reuse_address = True; daemon_threads = True
        def handle_error(self, *a): pass
    s = Q(("127.0.0.1", PORT), h)
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s


COLLECT = r"""
() => {
  const px = v => parseFloat(v)||0;
  const parseC = s => { const m=(s||"").match(/rgba?\(([^)]+)\)/); if(!m) return null;
    const p=m[1].split(/[,\s/]+/).filter(x=>x!=="").map(Number);
    return p.length<3?null:{r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}; };
  const hex = c => "#"+[c.r,c.g,c.b].map(v=>Math.round(v).toString(16).padStart(2,"0")).join("");
  const ownText = el => { let t=""; for(const n of el.childNodes) if(n.nodeType===3) t+=n.nodeValue; return t.trim(); };
  const vis = el => { const cs=getComputedStyle(el);
    if(cs.display==="none"||cs.visibility==="hidden"||px(cs.opacity)<0.05) return false;
    const r=el.getBoundingClientRect();
    if(r.right<1||r.left>window.innerWidth+2000) return false;
    return r.width>8&&r.height>4; };
  const effOp = el => { let o=1,n=el; while(n&&n.nodeType===1){o*=px(getComputedStyle(n).opacity)||1;n=n.parentElement;} return o; };
  function imgAnc(el){ let n=el; while(n&&n.nodeType===1){ const cs=getComputedStyle(n);
      if(cs.backgroundImage&&cs.backgroundImage!=="none") return n;
      n=n.parentElement; } return null; }
  function sel(el){ let s=el.tagName.toLowerCase();
    if(el.id) return s+"#"+el.id;
    const c=(typeof el.className==="string"&&el.className.trim())?el.className.trim().split(/\s+/).slice(0,2).join("."):"";
    if(c) s+="."+c;
    const p=el.parentElement;
    if(p&&p.tagName!=="BODY"){ const pc=(typeof p.className==="string"&&p.className.trim())?p.className.trim().split(/\s+/)[0]:"";
      s=(p.id?"#"+p.id:(pc?"."+pc:p.tagName.toLowerCase()))+" > "+s; }
    return s; }

  const out=[];
  let i=0;
  for (const el of document.querySelectorAll("*")) {
    if(/SCRIPT|STYLE|NOSCRIPT/.test(el.tagName)) continue;
    if(!vis(el)) continue;
    const t=ownText(el); if(t.length<3) continue;
    // also treat real <img> siblings underneath as image backdrop
    const ia = imgAnc(el);
    let imgBehind = !!ia;
    if(!imgBehind){
      // element positioned over an <img> in the same stacking parent
      const cs=getComputedStyle(el);
      if(cs.position==="absolute"||cs.position==="fixed"){
        const p=el.offsetParent;
        if(p && p.querySelector("img")) imgBehind=true;
      }
    }
    if(!imgBehind) continue;
    const cs=getComputedStyle(el);
    const c=parseC(cs.color); if(!c) continue;
    const r=el.getBoundingClientRect();
    if(r.top<-200 || r.width<12 || r.height<6) continue;
    const id="sroi"+(i++);
    el.setAttribute("data-sroi", id);
    out.push({id, sel:sel(el), text:t.slice(0,60), fs:+px(cs.fontSize).toFixed(1),
              fw:parseInt(cs.fontWeight)||400,
              color:hex(c), alpha:+(c.a*effOp(el)).toFixed(2),
              shadow:cs.textShadow && cs.textShadow!=="none" ? cs.textShadow.slice(0,60) : "",
              x:r.x, y:r.y+window.scrollY, w:r.width, h:r.height,
              imgSel: ia?sel(ia):"(img sibling)"});
  }
  return out;
}
"""

# Hide only the GLYPHS, never the element's own background — otherwise a gold
# button reads as "dark text on whatever is behind the button", which is wrong.
HIDE = ("(ids) => { ids.forEach(i=>{const e=document.querySelector('[data-sroi=\"'+i+'\"]');"
        " if(!e) return;"
        " [e].concat(Array.from(e.querySelectorAll('*'))).forEach(n=>{"
        "   n.style.setProperty('color','transparent','important');"
        "   n.style.setProperty('text-shadow','none','important');"
        "   n.style.setProperty('-webkit-text-fill-color','transparent','important'); }); }); }")
SHOW = ("(ids) => { ids.forEach(i=>{const e=document.querySelector('[data-sroi=\"'+i+'\"]');"
        " if(!e) return;"
        " [e].concat(Array.from(e.querySelectorAll('*'))).forEach(n=>{"
        "   n.style.removeProperty('color'); n.style.removeProperty('text-shadow');"
        "   n.style.removeProperty('-webkit-text-fill-color'); }); }); }")


def srgb_lum(px3):
    def f(v):
        v /= 255.0
        return v/12.92 if v <= 0.03928 else ((v+0.055)/1.055) ** 2.4
    return 0.2126*f(px3[0]) + 0.7152*f(px3[1]) + 0.0722*f(px3[2])


def contrast(l1, l2):
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi+0.05)/(lo+0.05)


async def run():
    from playwright.async_api import async_playwright
    os.makedirs(OUT, exist_ok=True)
    findings = []
    s = serve()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for vname, vw, vh, dpr in VIEWPORTS:
            ctx = await b.new_context(viewport={"width": vw, "height": vh},
                                      device_scale_factor=dpr, reduced_motion="reduce")
            page = await ctx.new_page()
            for theme in THEMES:
                await page.add_init_script(
                    f"try{{localStorage.setItem('sr-theme',{json.dumps(theme)});"
                    f"localStorage.setItem('saferise-theme',{json.dumps(theme)});}}catch(e){{}}")
                for pname, path in TARGETS:
                    try:
                        await page.goto(BASE+path, wait_until="domcontentloaded", timeout=30000)
                        try: await page.wait_for_load_state("networkidle", timeout=7000)
                        except Exception: pass
                        await page.evaluate(
                            "(t)=>{document.documentElement.setAttribute('data-theme',t);}", theme)
                        await page.wait_for_timeout(600)
                        cands = await page.evaluate(COLLECT)
                    except Exception as e:
                        print("  ERR", pname, theme, vname, str(e)[:120], flush=True)
                        continue
                    if not cands:
                        continue
                    ids = [c["id"] for c in cands]
                    await page.evaluate(HIDE, ids)
                    await page.wait_for_timeout(120)
                    try:
                        shot = await page.screenshot(full_page=True, timeout=40000)
                    except Exception as e:
                        print("  shot fail", pname, str(e)[:80], flush=True); continue
                    await page.evaluate(SHOW, ids)
                    im = Image.open(io.BytesIO(shot)).convert("RGB")
                    IW, IH = im.size
                    sx = IW / vw
                    for c in cands:
                        x0 = int(max(0, c["x"]*sx)); y0 = int(max(0, c["y"]*sx))
                        x1 = int(min(IW, (c["x"]+c["w"])*sx)); y1 = int(min(IH, (c["y"]+c["h"])*sx))
                        if x1-x0 < 3 or y1-y0 < 3: continue
                        crop = im.crop((x0, y0, x1, y1))
                        if crop.width*crop.height > 40000:
                            crop = crop.resize((max(1,crop.width//3), max(1,crop.height//3)))
                        pxs = list(crop.getdata())
                        if not pxs: continue
                        lums = sorted(srgb_lum(p) for p in pxs)
                        n = len(lums)
                        p10 = lums[int(n*0.10)]; p50 = lums[n//2]; p90 = lums[int(n*0.90)-1 if n>1 else 0]
                        fg = c["color"].lstrip("#")
                        fgrgb = tuple(int(fg[i:i+2],16) for i in (0,2,4))
                        # text alpha composited over the median backdrop for a fair number
                        a = c["alpha"]
                        def comp(bl):
                            # approximate: composite fg over a grey of that luminance
                            bg = 255*(bl**(1/2.2))
                            return tuple(fgrgb[i]*a + bg*(1-a) for i in range(3))
                        l_best  = contrast(srgb_lum(comp(p90)), p90)
                        l_typ   = contrast(srgb_lum(comp(p50)), p50)
                        l_worst = contrast(srgb_lum(comp(p10)), p10)
                        large = c["fs"] >= 24 or (c["fs"] >= 18.66 and c["fw"] >= 700)
                        need = 3.0 if large else 4.5
                        spread = p90 - p10
                        if min(l_worst, l_best) < need:
                            findings.append({
                                "page": pname, "theme": theme, "vp": vname,
                                "sel": c["sel"], "text": c["text"], "fs": c["fs"], "fw": c["fw"],
                                "color": c["color"], "alpha": a, "shadow": bool(c["shadow"]),
                                "imgSel": c["imgSel"],
                                "best": round(l_best,2), "typical": round(l_typ,2),
                                "worst": round(l_worst,2), "need": need,
                                "bgLum_p10": round(p10,3), "bgLum_p50": round(p50,3),
                                "bgLum_p90": round(p90,3), "bgSpread": round(spread,3),
                            })
                    print(f"  {pname}|{theme}|{vname}: {len(cands)} over-image, "
                          f"{sum(1 for f in findings if f['page']==pname and f['theme']==theme and f['vp']==vname)} fail",
                          flush=True)
            await ctx.close()
        await b.close()
    s.shutdown()
    with open(os.path.join(OUT, "overimage.json"), "w") as f:
        json.dump(findings, f)
    print("\nfindings:", len(findings))

if __name__ == "__main__":
    asyncio.run(run())
