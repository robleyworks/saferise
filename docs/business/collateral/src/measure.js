const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file:///home/claude/outreach/v7/' + process.argv[2], { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => {
    const out=[];
    document.querySelectorAll('.sheet').forEach((s,i)=>{
      out.push({sheet:i, sheetH:s.getBoundingClientRect().height, scrollH:s.scrollHeight});
    });
    const pg=document.querySelector('.page');
    const kids=[...pg.children].map(k=>({cls:k.className||k.tagName, h:Math.round(k.getBoundingClientRect().height)}));
    return {out, kids, pageScroll: pg.scrollHeight, pageH: Math.round(pg.getBoundingClientRect().height)};
  });
  console.log(JSON.stringify(r,null,1)); await b.close();
})();
