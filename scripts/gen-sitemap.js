#!/usr/bin/env node
/* Regenerate sitemap.xml from the split page set + content/tracks.js.
   Run AFTER index.html is split. Before that it will produce one URL, correctly. */
const fs = require('fs'), path = require('path');
const ORIGIN = 'https://thesaferiseprotocol.com';
const EXCLUDE = /^(dashboard|account|signup|login|member-|404|pass|mock)/;

const pages = fs.readdirSync('.')
  .filter(f => f.endsWith('.html'))
  .map(f => f.replace(/\.html$/, ''))
  .filter(f => !EXCLUDE.test(f));

const urls = pages.map(p => {
  const loc = p === 'index' ? ORIGIN + '/' : `${ORIGIN}/${p}`;
  const stat = fs.statSync(`${p}.html`);
  const pri = p === 'index' ? '1.0'
            : /^(personal-transformation|relationship-healing|professional-performance|method)$/.test(p) ? '0.9'
            : /^protocols\//.test(p) ? '0.8' : '0.6';
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${stat.mtime.toISOString().slice(0,10)}</lastmod>\n    <priority>${pri}</priority>\n  </url>`;
});

fs.writeFileSync('sitemap.xml',
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>\n`);
console.log(`sitemap.xml written — ${urls.length} URLs`);
