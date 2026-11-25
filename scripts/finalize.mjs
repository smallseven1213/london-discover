import fs from 'node:fs/promises';
await fs.writeFile('dist/london-discover/.nojekyll', '');
const fallback = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found — London Discover</title><link rel="stylesheet" href="/london-discover/assets/system.css"><link rel="stylesheet" href="/london-discover/theme.css"></head><body><main class="sub-main"><div class="wrap"><h1>This London page has moved.</h1><p>這個頁面不存在，請回到倫敦城市指南。</p><a class="btn btn--primary" href="/london-discover/zh-tw/">回到城市指南</a><a class="btn btn--secondary" href="/london-discover/en/">Open the English guide</a></div></main></body></html>`;
await fs.writeFile('dist/london-discover/404.html',fallback);
await fs.writeFile('dist/london-discover/robots.txt','User-agent: *\nAllow: /\nSitemap: https://smallseven1213.github.io/london-discover/sitemap.xml\n');
console.log('Static site ready: dist/london-discover');
