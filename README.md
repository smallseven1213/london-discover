# London Discover

A bilingual London city guide built with Qwik City, Tailwind CSS 3 and Utopia-style fluid type/spacing.

- Website: https://smallseven1213.github.io/london-discover/
- English: https://smallseven1213.github.io/london-discover/en/
- Prototype: https://smallseven1213.github.io/london-discover/zh-tw/prototype/
- 3D Tower Bridge: https://smallseven1213.github.io/london-discover/zh-tw/bridge/

## Run locally

Requires Node.js 22 or later.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/london-discover/`.

```sh
npm run build
python3 -m http.server 5173 --bind 127.0.0.1 --directory dist
```

The complete static artifact is `dist/london-discover/`. It contains pre-rendered HTML for both locales, an XML sitemap, a 404 page, and assets. Serve the parent `dist/` locally to preserve the GitHub Pages base path.

## Pages and interactions

- `/` and `/zh-tw/`: Traditional Chinese; `/en/`: English.
- `walk/`: suggested Westminster → South Bank → Borough Market → Tower Bridge walk; four checkboxes persist on the current device and can be reset. Google Maps opens the walking directions.
- `prototype/`: React Flow canvas isolated through `@builder.io/qwik-react`. Drag nodes, connect handles, select/delete edges, pan/zoom, save the layout, reset it, or export JSON. Node links open the real pages. Saved positions and connections are shared between languages on the same device.
- `bridge/`: vgpu/WebGPU architectural study with a custom WGSL shader. Click to load, drag to orbit, use arrow keys and +/− to adjust the view, or choose front/angled presets. Rendering occurs on demand. Unsupported devices retain the reference photograph.
- `credits/`: individual photograph credits, source pages, licenses and official visitor information.

The 3D scene reconstructs recognisable bridge forms. It is an architectural interpretation, not a photogrammetry survey. Opening times, prices and travel durations are intentionally delegated to official sources.

## Design and implementation

- Warm paper and walnut palette; EB Garamond / Jost with Traditional Chinese system fallbacks.
- Utopia-style `clamp()` typography and spacing interpolate between 320 and 1440px; responsive composition adapts to phone, tablet and desktop.
- Design Taste 2.5.1 system, layout, motion and one photo-development moment are copied unchanged under `public/assets/`; project overrides live in `public/theme.css`.
- Tailwind v3 utilities are configured with preflight disabled to preserve the design system. Its fluid tokens are exposed in `tailwind.config.ts`.
- Main content is static HTML; React Flow and vgpu are loaded only for their dedicated experiences. The guide remains readable without JavaScript.
- No account, backend, analytics or application secret is required. Walk progress and prototype layouts use localStorage on the current device. Google Fonts and linked map providers are external services.

## Deploy

Push to `main` to run `.github/workflows/pages.yml`. The workflow installs from the lockfile, checks TypeScript, generates the static site, and deploys `dist/london-discover/` with GitHub's official Pages actions. Repository Pages must use **GitHub Actions** as the source.

For another repository name or account, update `vite.config.ts`, `src/lib/content.ts`, `src/root.tsx`, `adapters/static/vite.config.ts` and `scripts/finalize.mjs` consistently.

## Assets and validation

Eight photographs show the actual named London locations. Authors and Creative Commons licenses are published on the credits page. Responsive crops are adaptations under their respective original licenses. `scripts/photo-sources.json` records the original URLs; `node scripts/photos.mjs` regenerates WebP variants using Sharp.

```sh
npm run build.types
npx vgpu check src/lib/bridge.wgsl
node scripts/check-bridge.mjs
```

The render check requires a working native WebGPU adapter. It validates deterministic repeated frames and that a camera change alters the rendered pixels. See `docs/QA.md` for browser and deployment verification.
