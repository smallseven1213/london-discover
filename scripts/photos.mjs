import fs from 'node:fs/promises';
import sharp from 'sharp';
const catalog = JSON.parse(await fs.readFile('scripts/photo-sources.json', 'utf8')).photos;
const credits = JSON.parse(await fs.readFile('public/assets/img/credits.json', 'utf8')).photos;
await fs.mkdir('work', {recursive:true});
await fs.mkdir('public/images', {recursive:true});
for (const item of credits) {
  const source = catalog.find(p => p.id === item.id);
  const cache = `work/${item.id}.jpg`;
  let buffer;
  try { buffer = await fs.readFile(cache); } catch {
    let response; for (let attempt = 0; attempt < 4; attempt++) { response = await fetch(source.url, {headers:{'User-Agent':'LondonDiscover/1.0 (editorial city guide)'}}); if (response.ok || response.status !== 429) break; await new Promise(r => setTimeout(r, 15000)); }
    if (!response.ok) throw new Error(`${item.id}: ${response.status}`);
    buffer = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(cache, buffer);
  }
  for (const w of item.id === 'f131575562' ? [600,1200,2400] : [600,1200]) {
    await sharp(buffer).rotate().resize(w).webp({quality:78}).toFile(`public/images/photo-${item.id}-${w}.webp`);
  }
  if (item.id === 'f131575562') {
    // Preserve Elizabeth Tower in the portrait crop, rather than the centre of the river.
    await sharp(buffer).extract({left:3400,top:300,width:2400,height:3000}).resize(780,975).webp({quality:80}).toFile(`public/images/photo-${item.id}-phone.webp`);
  }
  console.log(item.id, 'optimized');
}
await fs.writeFile('src/lib/photos.json', JSON.stringify(credits, null, 2));
