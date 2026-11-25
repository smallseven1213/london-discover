GATE: OFF (no build active)

The last active finish gate returned **GATE: PASS**, closing its build marker. A later invocation after image-size optimisation correctly reported OFF; it was not rearmed or represented as a new pass.

Validation date: 2026-11-25. Design Taste 2.5.1 finish gate passed on round 2, with no open failures and the four explicit waivers below.

## Scope and design

Independent London city guide (`place` editorial adaptation). Warm paper/walnut suits the stone and brick photographs; EB Garamond/Jost; photo-led place hero, split navigation, visit footer, arrow buttons, ring mark, spacious sections, and one `picture-develops` film moment. The homepage uses photographs and flat colours. The requested vgpu architectural scene has a separate, opt-in page.

Voice: short geographical descriptions, concrete names, direct actions; no invented prices, opening hours, travel durations or commercial claims. `London Discover` follows the requested project name. No form, fabricated contact, client asset slot or canonical-domain placeholder remains.

## Verification

- TypeScript and production static build pass; 11 pre-rendered pages.
- 399 internal HTML references checked against the built artifact; no missing files.
- Traditional Chinese and English routes, locale-specific HTML language metadata, mobile navigation, Escape-to-close and overflow checks verified.
- Walking checklist: checking, saving, restoring in the other language and resetting all pass.
- React Flow: eight initial nodes and eight edges; keyboard movement, adding a ninth connection, saving, restoring across languages, resetting and exporting valid JSON all pass. Edge SVGs and light theme were visually verified after resolving global CSS conflicts.
- WebGPU shader validation passes with no diagnostics. Native GPU test produces identical repeated frames; the front-view camera changes 133,383 sampled pixels, with no GPU errors. The CPU-only browser correctly retains the reference photograph and displays the fallback when WebGPU is unavailable.
- Copy lint: zero failures, zero warnings.
- Full consistency sweep was run at 1440, 1024, 820, 768 and 390px. Its actionable layout findings were corrected; the final finish gate retested 1440/390px, narrow-screen overflow at 320px, and the layout stress checks.

## Final layout, performance and deployment

Full-page screenshots were reviewed at 1440×900, 1024×768, 820×1180, 768×1024 and 390×844. The layout check's only findings were the synthetic Chinese headline stress tests at 1440/390px, covered by the explicit waiver below; the other three sizes had no findings. A final tablet correction gives every landmark photograph the same frame height; the updated 820px screenshot is exactly five screens.

The final performance run reports **0 FAIL, 1 WARN**. Three CPU-browser loads per size produced:

| Metric | Desktop 1440px | Phone 390px |
|---|---:|---:|
| Total transfer | 1029.7 KiB | 808.2 KiB |
| Parsed JavaScript | 224.8 KiB | 224.8 KiB |
| Layout shift | 0.000 | 0.000 |
| Long tasks / blocking time | 0 / 0ms | 0 / 0ms |
| Median FCP / LCP | 96 / 96ms | 56 / 56ms |
| Broken requests | 0 | 0 |

These are local CPU-browser observations, not real-user network timings. The one warning concerns two 1200px photographs shown in narrower phone frames. Their larger sources preserve enough vertical resolution for the taller cover crops on tablets.

The final React Flow visual probe confirms all eight nodes fit inside the canvas and every edge SVG has a nonzero width. A real language-switch click from the Chinese walking page opens the English walking page.

GitHub Actions builds and deploys the site. Live HTTP checks returned 200 for all 11 page URLs, the social image, both page-specific stylesheets and the sitemap. The canonical URL is https://smallseven1213.github.io/london-discover/.

## Gate waivers

1. `copy-headline`, `h1#hero-h`: the Traditional Chinese heading explicitly names London and a city walking guide; the English-token heuristic does not parse Chinese words.
2. `copy-fact`, `h1#hero-h`: London and the Thames are concrete geographical facts on the first screen, written in Chinese outside the checker's English place vocabulary.
3. `hero-lines`, `section.hero h1`: final Chinese and English headings fit two lines. The synthetic 48-character stress copy does not account for Chinese word lengths; this check explicitly permits a waiver for final fitting copy.
4. `scroll-reveal`, footer primary button: the checker catches the unchanged kit button's colour hover transition. No project IntersectionObserver or reveal is attached to that button; it is visible at rest.

The final gate lists 11 non-blocking warnings. These include expected photo development, differing light/colour in photographs of actual locations, Chinese heading/skip-link heuristics, library photo attribution, and spacing/proximity observations. No copy-lint warning is retained. These warnings and the waivers are not represented as unqualified automatic passes.

## Sources and limits

Eight Wikimedia Commons photographs show the actual named London locations. Authors, source pages, Creative Commons licenses and crop/adaptation notices are published on both credits pages. Licensed public photographs serve the finished editorial guide; no replacement client photographs are required. Official visitor sources are linked from the relevant content and credits pages.

The 3D scene is an architectural interpretation, not a surveyed or photogrammetric reconstruction. Hardware rendering was initially tested through vgpu's native adapter, while the original CPU-browser check covered only fallback. The controls regression below now covers the actual browser renderer and UI on Apple Metal. A matrix of physical phones/Safari/GPU drivers was not tested.

The website is static. LocalStorage retains walk progress and prototype layouts on the current device. It has no backend or analytics. Google Fonts and linked map/visitor sites remain external services.

## 3D view-control regression fix

A user report revealed a missing integration check. The original page passed a boolean into `data-active`. Qwik rendered the ready value as an empty attribute, while the CSS required `[data-active=true]`. The runtime and buttons worked underneath a fully visible photograph; the canvas remained transparent.

Reproduction on the deployed page with WebGPU enabled and Apple Metal showed both buttons present, `data-active=""`, no runtime errors, and **0 changed pixels** for either view button. The fix writes explicit `"true"` / `"false"` strings so the photograph and canvas switch visibility correctly.

The new browser regression test uses the actual Qwik controls and screenshot pixels, with these local results:

| Interaction | Changed canvas pixels |
|---|---:|
| River to front view | 195,040 |
| Front to river view | 195,040 |
| Drag to rotate | 286,980 |
| Arrow-key camera movement | 43,098 |
| Switch views after resizing to 390px | 36,554 |

The visible model replaces the photograph; there is no horizontal overflow or browser error. A separate unsupported-browser test verifies the photograph remains visible and the canvas stays hidden. TypeScript and the static production build pass. This test supplements the shader-only test, which could not detect the original display-layer failure.

## Design system page

GATE: OFF (no build active). The previous landing-page gate is closed. This addition is reference documentation, using natural content heights and the established theme; no new landing-page gate pass is claimed. See `docs/design-system.md` for the scope adaptation.

The production build generates 13 pages, including both design system locales. The public and imported token JSON files are identical and generated from the actual CSS. There is one description meta tag per page, with the correct localized design-system text.

Headless Chrome checks at 1440, 1024, 820, 768, 390 and 320px found no horizontal overflow or elements beyond the page edges. Full-page desktop and phone screenshots were inspected, along with tablet first-screen captures. The English phone layout also passes. The Chinese 390px and English 320px home footers retain separate CTA and directory areas after adding the design-system link.

The editable type sample, font toggle, viewport slider and checklist update in the production build. The largest fluid step measures 32px, 41.14px and 48px at simulated widths of 320, 960 and 1440px respectively. The focus outline is visible and the disabled control retains its native disabled state. The clipboard success handler was tested with an isolated clipboard stub, verifying the exact hex value and announcement without overwriting the user's system clipboard; the unavailable-clipboard path was tested separately in the restricted headless browser. No runtime errors were reported.

The English documentation copy lint has 0 FAIL and 1 retained WARN: its six numbered sections are a reference index, not a sequence of instructions. No copied kit asset was changed.

React Flow verification confirms nine visible nodes and nine default edges. An older eight-node saved layout retains its edited coordinates and receives the design-system node/edge. A saved layout that already contains the new node preserves an intentionally deleted edge; reset restores all nine defaults. The image loads at its full 1200px source width, the contents anchor navigates correctly, the JSON download returns 200 with all 16 colour tokens, and reduced-motion mode reduces the image transition to the kit's effectively instant duration.
