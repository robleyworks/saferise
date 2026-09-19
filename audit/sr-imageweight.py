#!/usr/bin/env python3
"""
Measure what the site actually downloads in images, per viewport, and what it
would download if each slot were served at the size it is displayed at.

Real bytes from the response, real displayed size from the DOM, real "ideal"
bytes by re-encoding each image at the width that viewport needs.
"""
import os as _os
_HERE = _os.path.dirname(_os.path.abspath(__file__))
ROOT = _os.environ.get("SR_SITE_ROOT") or _os.path.abspath(_os.path.join(_HERE, ".."))
import asyncio, json, functools, http.server, socketserver, threading, io
from collections import defaultdict
from PIL import Image
Image.MAX_IMAGE_PIXELS = None

PORT = 8941; BASE = f"http://127.0.0.1:{PORT}"
VIEWPORTS = [("mobile", 390, 844, 3), ("tablet", 1024, 768, 2), ("desktop", 1440, 900, 2)]
PAGES = [
    ("home", "/index.html"), ("coming-soon", "/coming-soon.html"),
    ("organisations", "/organisations.html"), ("dashboard", "/dashboard.html"),
    ("method", "/method.html"), ("protocol", "/protocol.html?track=1&protocol=1"),
    ("about", "/about.html"), ("plans", "/plans.html"),
    ("member-frameworks", "/member-frameworks.html"),
    ("personal-transformation", "/personal-transformation.html"),
]

def serve():
    h = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
    class Q(socketserver.ThreadingTCPServer):
        allow_reuse_address = True; daemon_threads = True
        def handle_error(self, *a): pass
    s = Q(("127.0.0.1", PORT), h)
    threading.Thread(target=s.serve_forever, daemon=True).start(); return s

# cache of ideal encoded size: (path, target_width) -> bytes
_ideal = {}
def ideal_bytes(relpath, target_w):
    """Re-encode the real file at target_w and return the byte size."""
    key = (relpath, target_w)
    if key in _ideal: return _ideal[key]
    p = _os.path.join(ROOT, relpath.lstrip("/"))
    if not _os.path.exists(p): _ideal[key] = None; return None
    try:
        with Image.open(p) as im:
            w, h = im.size
            if target_w >= w:           # already smaller than needed
                _ideal[key] = _os.path.getsize(p); return _ideal[key]
            th = max(1, round(h * target_w / w))
            im2 = im.convert("RGB") if im.mode in ("P", "CMYK") else im
            im2 = im2.resize((target_w, th), Image.LANCZOS)
            buf = io.BytesIO()
            ext = _os.path.splitext(p)[1].lower()
            if ext == ".png" and im.mode in ("RGBA", "LA"):
                im2.save(buf, "PNG", optimize=True)
            elif ext == ".webp":
                im2.save(buf, "WEBP", quality=78, method=5)
            else:
                im2.convert("RGB").save(buf, "WEBP", quality=78, method=5)
            _ideal[key] = buf.tell()
    except Exception:
        _ideal[key] = None
    return _ideal[key]


async def run():
    from playwright.async_api import async_playwright
    s = serve(); out = []
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for vname, vw, vh, dpr in VIEWPORTS:
            ctx = await b.new_context(viewport={"width": vw, "height": vh},
                                      device_scale_factor=dpr, reduced_motion="reduce")
            page = await ctx.new_page()
            for pname, path in PAGES:
                seen = {}
                async def on_resp(r, seen=seen):
                    ct = (r.headers or {}).get("content-type", "")
                    if not ct.startswith("image/"): return
                    try: body = await r.body()
                    except Exception: return
                    u = r.url.replace(BASE, "")
                    seen[u] = len(body)
                page.on("response", lambda r: asyncio.create_task(on_resp(r)))
                try:
                    await page.goto(BASE + path, wait_until="domcontentloaded", timeout=30000)
                    try: await page.wait_for_load_state("networkidle", timeout=9000)
                    except Exception: pass
                    await page.evaluate("()=>window.scrollTo(0, document.body.scrollHeight)")
                    await page.wait_for_timeout(1500)
                    await page.evaluate("()=>window.scrollTo(0,0)")
                    await page.wait_for_timeout(600)
                    shown = await page.evaluate("""()=>{
                      const o={};
                      for(const im of document.querySelectorAll('img')){
                        const r=im.getBoundingClientRect();
                        if(r.width<2) continue;
                        const u=(im.currentSrc||im.src||'').replace(location.origin,'');
                        if(!u) continue;
                        o[u]=Math.max(o[u]||0, Math.round(r.width));
                      }
                      // background-images too
                      for(const el of document.querySelectorAll('*')){
                        const bi=getComputedStyle(el).backgroundImage;
                        if(!bi||bi==='none') continue;
                        const m=bi.match(/url\\(["']?([^"')]+)/); if(!m) continue;
                        const u=m[1].replace(location.origin,'');
                        const r=el.getBoundingClientRect();
                        if(r.width<2) continue;
                        o[u]=Math.max(o[u]||0, Math.round(r.width));
                      }
                      return o;}""")
                except Exception as e:
                    print("  ERR", pname, vname, str(e)[:90], flush=True); continue
                page.remove_listener("response", lambda r: None) if False else None
                actual = sum(seen.values())
                ideal = 0; unknown = 0
                detail = []
                for u, byts in seen.items():
                    disp = shown.get(u)
                    if not disp:
                        ideal += byts; continue          # not visible / can't attribute
                    need = int(disp * dpr)
                    ib = ideal_bytes(u, need)
                    if ib is None: ideal += byts; unknown += 1
                    else:
                        ideal += ib
                        if byts - ib > 20000:
                            detail.append((byts - ib, u, byts, ib, disp, need))
                out.append({"page": pname, "vp": vname, "dpr": dpr,
                            "requests": len(seen), "actual": actual, "ideal": ideal,
                            "waste": actual - ideal,
                            "worst": sorted(detail, reverse=True)[:6]})
                print(f"  {pname:24s} {vname:8s} {len(seen):3d} imgs  "
                      f"{actual/1e6:6.2f} MB -> {ideal/1e6:6.2f} MB  "
                      f"saves {(actual-ideal)/1e6:6.2f} MB", flush=True)
            await ctx.close()
        await b.close()
    s.shutdown()
    json.dump(out, open(_os.path.join(_HERE, "out", "imageweight.json"), "w"), indent=1)
    return out

if __name__ == "__main__":
    asyncio.run(run())
