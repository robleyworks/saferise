#!/usr/bin/env python3
"""Targeted measurements for the defects visible in the screenshots."""
import os as _os
_HERE=_os.path.dirname(_os.path.abspath(__file__))
ROOT=_os.environ.get("SR_SITE_ROOT") or _os.path.abspath(_os.path.join(_HERE,".."))
import asyncio, json, functools, http.server, socketserver, threading

PORT=8903; BASE=f"http://127.0.0.1:{PORT}"
def serve():
    h=functools.partial(http.server.SimpleHTTPRequestHandler,directory=ROOT)
    class Q(socketserver.ThreadingTCPServer):
        allow_reuse_address=True; daemon_threads=True
        def handle_error(self,*a): pass
    s=Q(("127.0.0.1",PORT),h); threading.Thread(target=s.serve_forever,daemon=True).start(); return s

JS_DOORS = r"""
() => {
  const out={};
  const doors=[...document.querySelectorAll('.door')];
  out.doors = doors.map(d=>{
    const r=d.getBoundingClientRect();
    const h=d.querySelector('h2,.dh'); const p=d.querySelector('p,.dbody');
    const a=d.querySelector('a,.dgo,span');
    const hr=h?h.getBoundingClientRect():null, pr=p?p.getBoundingClientRect():null;
    const cs=p?getComputedStyle(p):null;
    return {cls:d.className, x:+r.x.toFixed(1), y:+r.y.toFixed(1),
            w:+r.width.toFixed(1), h:+r.height.toFixed(1),
            titleY: hr?+hr.y.toFixed(1):null, titleTxt: h?h.textContent.trim().slice(0,20):null,
            bodyY: pr?+pr.y.toFixed(1):null,
            bodyLines: pr&&cs? Math.round(pr.height/parseFloat(cs.lineHeight||16)) : null,
            bodyTransform: cs?cs.textTransform:null,
            bodyTracking: cs?cs.letterSpacing:null,
            bodyAlign: cs?cs.textAlign:null,
            bodyFS: cs?+parseFloat(cs.fontSize).toFixed(1):null,
            ctaTxt: a?a.textContent.trim().slice(0,44):null};
  });
  // icons inside doors
  out.doorIcons = doors.map(d=>{
    const ic=d.querySelector('svg,img,.dicon,[class*=icon]');
    if(!ic) return 'NONE';
    const r=ic.getBoundingClientRect();
    return {tag:ic.tagName, cls:(ic.className.baseVal||ic.className||'')+'',
            w:+r.width.toFixed(1), h:+r.height.toFixed(1),
            natural: ic.tagName==='IMG' ? ic.naturalWidth+'x'+ic.naturalHeight : null,
            childCount: ic.children.length, src: ic.getAttribute('src')||null};
  });
  return out;
}
"""

JS_PLAYER = r"""
() => {
  const q=s=>document.querySelector(s);
  const info=(s)=>{const e=q(s); if(!e) return null; const cs=getComputedStyle(e);
    const r=e.getBoundingClientRect();
    return {fs:+parseFloat(cs.fontSize).toFixed(1), color:cs.color, opacity:cs.opacity,
            ls:cs.letterSpacing, txt:(e.textContent||'').trim().slice(0,40),
            w:Math.round(r.width), h:Math.round(r.height)};};
  const steps=[...document.querySelectorAll('.sr-ps-steps *')].slice(0,8).map(e=>{
    const cs=getComputedStyle(e); const r=e.getBoundingClientRect();
    return {cls:e.className+'', fs:+parseFloat(cs.fontSize).toFixed(1), color:cs.color,
            op:cs.opacity, txt:(e.textContent||'').trim().slice(0,22), w:Math.round(r.width)};});
  return {ptitle:info('.sr-ps-ptitle'), theme:info('.sr-ps-theme'),
          lock:info('.sr-ps-lock .mark'), stepnow:info('.sr-ps-stepnow'),
          steps, stage: (()=>{const e=q('.sr-ps-stage')||q('.stage'); if(!e)return null;
            const r=e.getBoundingClientRect(); return {w:Math.round(r.width),h:Math.round(r.height)};})()};
}
"""

JS_CTA = r"""
() => {
  // every button/link that looks like a primary action: is the hierarchy consistent?
  const out=[];
  for(const e of document.querySelectorAll('a,button')){
    const cs=getComputedStyle(e); const r=e.getBoundingClientRect();
    if(r.width<40||r.height<16) continue;
    const bg=cs.backgroundColor, bw=parseFloat(cs.borderTopWidth)||0;
    const t=(e.textContent||'').trim();
    if(!t||t.length>46) continue;
    const solid = bg!=='rgba(0, 0, 0, 0)' && !/rgba\(.*,\s*0\)/.test(bg);
    out.push({t:t.slice(0,40), solid, bg, border:bw>0?cs.borderTopColor:'',
              r:cs.borderTopLeftRadius, fs:+parseFloat(cs.fontSize).toFixed(1),
              pad:cs.padding, h:Math.round(r.height), cls:(e.className+'').slice(0,40)});
  }
  return out;
}
"""

async def main():
    from playwright.async_api import async_playwright
    s=serve(); res={}
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={"width":1440,"height":900},device_scale_factor=2)
        p=await ctx.new_page()

        await p.goto(BASE+"/index.html",wait_until="networkidle",timeout=30000)
        await p.wait_for_timeout(900)
        res['home_doors']=await p.evaluate(JS_DOORS)

        await p.goto(BASE+"/protocol.html?track=1&protocol=1",wait_until="networkidle",timeout=30000)
        await p.wait_for_timeout(1400)
        res['player']=await p.evaluate(JS_PLAYER)
        res['protocol_ctas']=await p.evaluate(JS_CTA)

        await p.goto(BASE+"/plans.html",wait_until="networkidle",timeout=30000)
        await p.wait_for_timeout(900)
        res['plans_ctas']=await p.evaluate(JS_CTA)

        await b.close()
    s.shutdown()
    json.dump(res,open(_os.path.join(_HERE,"out","spot.json"),"w"))
    print("ok")

asyncio.run(main())
