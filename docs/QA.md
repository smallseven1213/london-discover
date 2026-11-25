GATE: PASS

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

## Gate waivers

1. `copy-headline`, `h1#hero-h`: the Traditional Chinese heading explicitly names London and a city walking guide; the English-token heuristic does not parse Chinese words.
2. `copy-fact`, `h1#hero-h`: London and the Thames are concrete geographical facts on the first screen, written in Chinese outside the checker's English place vocabulary.
3. `hero-lines`, `section.hero h1`: final Chinese and English headings fit two lines. The synthetic 48-character stress copy does not account for Chinese word lengths; this check explicitly permits a waiver for final fitting copy.
4. `scroll-reveal`, footer primary button: the checker catches the unchanged kit button's colour hover transition. No project IntersectionObserver or reveal is attached to that button; it is visible at rest.

The final gate lists 11 non-blocking warnings. These include expected photo development, differing light/colour in photographs of actual locations, Chinese heading/skip-link heuristics, library photo attribution, and spacing/proximity observations. No copy-lint warning is retained. These warnings and the waivers are not represented as unqualified automatic passes.

## Sources and limits

Eight Wikimedia Commons photographs show the actual named London locations. Authors, source pages, Creative Commons licenses and crop/adaptation notices are published on both credits pages. Licensed public photographs serve the finished editorial guide; no replacement client photographs are required. Official visitor sources are linked from the relevant content and credits pages.

The 3D scene is an architectural interpretation, not a surveyed or photogrammetric reconstruction. Hardware rendering was tested through vgpu's native adapter; the browser test intentionally uses CPU Chrome and verifies the fallback. A matrix of physical phones/Safari/GPU drivers was not tested.

The website is static. LocalStorage retains walk progress and prototype layouts on the current device. It has no backend or analytics. Google Fonts and linked map/visitor sites remain external services.
