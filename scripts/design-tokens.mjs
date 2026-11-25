import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const readTokens = async (path) => {
  const css = (await readFile(new URL(path, root), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
  const block = css.match(/:root\s*\{([^}]+)\}/)?.[1];
  if (!block) throw new Error(`No root tokens in ${path}`);
  return Object.fromEntries([...block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, key, value]) => [key, value.trim()]));
};
const theme = await readTokens('public/theme.css');
const system = await readTokens('public/assets/system.css');
const motion = await readTokens('public/assets/motion/motion.css');
const select = (tokens, pattern) => Object.fromEntries(Object.entries(tokens).filter(([key]) => pattern.test(key)));
const data = {
  name: 'London Discover', version: 1,
  sources: ['theme.css', 'assets/system.css', 'assets/motion/motion.css'],
  colors: select(theme, /^--p-/),
  typography: select(theme, /^--(font-|display-)/),
  fluidType: select(theme, /^--step-/),
  fluidSpace: select(theme, /^--space-/),
  spacing: select(system, /^--s-\d+$/),
  controls: select(system, /^--(btn-h|btn-h-sm|ease|dur)$/),
  motion: select(motion, /^--m-/),
};
if (Object.keys(data.colors).length !== 16 || Object.keys(data.fluidType).length !== 5 || Object.keys(data.spacing).length !== 10) {
  throw new Error('Design token source changed; review the generated schema.');
}
const json = `${JSON.stringify(data, null, 2)}\n`;
await writeFile(new URL('src/lib/design-tokens.generated.json', root), json);
await writeFile(new URL('public/design-tokens.json', root), json);
console.log('Generated design tokens from the site CSS.');
