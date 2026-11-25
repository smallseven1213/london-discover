# Design system page

The `/zh-tw/design-system/` and `/en/design-system/` routes document the established London Discover identity: paper/walnut colours, EB Garamond and Jost with Chinese system fallbacks, Utopia fluid scales, and the existing component and motion kit.

This is reference documentation within the existing site. It uses natural section heights, a sticky desktop contents column and a two-column contents list on phones. The landing page's full-screen section and decorative-moment rules are not applied to this documentation page. The palette is not redealt, and the copied kit assets remain unchanged. Page-specific styles are loaded only on this route.

## Source of truth

`scripts/design-tokens.mjs` extracts CSS custom properties from `public/theme.css`, `public/assets/system.css`, and `public/assets/motion/motion.css`. It writes identical, deterministic JSON to the public download and the typed UI import. Run `npm run tokens` after changing source tokens, or use the standard development/build commands which do this automatically. Generated JSON is committed so standalone TypeScript checks can resolve it.

The viewport slider evaluates the same `clamp(rem, rem + vw, rem)` expressions as the CSS at a documented 16px reference root size. It changes only the specimen sizes, not the browser viewport. Actual site CSS remains responsive to browser font preferences. The preview supports custom text and both typefaces. Contrast ratios are calculated from the exported colours; the AA indicator appears only at a normal-text ratio of at least 4.5:1.

## Interactions

- Each colour button copies its hex value and announces success or clipboard unavailability.
- The JSON download includes all colour aliases, typography, fluid and fixed spacing, controls and motion tokens.
- Component example links open the real walk and bridge routes; the disabled control demonstrates native disabled behavior.
- The example checklist has local page state only. It never reads or writes walking progress.
- The footer exposes the page in both languages. The language switch preserves the page and URL fragment.
- React Flow has a ninth node and a home-to-design-system edge. Older version 1 saved layouts receive this new default edge once; a deliberately removed edge in a layout already containing the new node is preserved.

Static HTML contains the documentation and download link before JavaScript loads. React Flow and WebGPU are not mounted on this page.
