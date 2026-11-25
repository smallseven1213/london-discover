import { component$, useSignal } from '@builder.io/qwik';
import { useLocation, type DocumentHead, type StaticGenerateHandler } from '@builder.io/qwik-city';
import { Header, Arrow } from '../../../components/header';
import { SmallFooter } from '../../../components/footer';
import { Photo } from '../../../components/photo';
import { BASE, copy, localeOf, pathFor } from '../../../lib/content';
import { tokens, dsCopy, colorRoles, fluidPixels, contrastRatio } from '../../../lib/design-system';

const sectionIds = ['identity', 'colour', 'typography', 'spacing', 'components', 'images'];
const motionKeys = ['--m-in', '--m-out', '--m-press', '--m-image'] as const;

export default component$(() => {
  const location = useLocation();
  const locale = localeOf(location.url.pathname);
  const t = dsCopy[locale];
  const zh = locale === 'zh-tw';
  const width = useSignal(960);
  const sample = useSignal(t.sampleText);
  const font = useSignal<'display' | 'text'>('display');
  const clipboard = useSignal('');
  const visited = useSignal(false);

  return <><Header locale={locale} /><main class="sub-main ds-page" id="top"><div class="wrap">
    <div class="sub-head ds-head">
      <a class="link back-link" href={pathFor(locale)}>{copy[locale].back}</a>
      <p class="ds-eyebrow">London Discover / {t.label}</p>
      <h1>{t.title}</h1><p>{t.intro}</p>
      <a class="btn btn--primary" href={`${BASE}design-tokens.json`} download="london-design-tokens.json">{t.download}<Arrow /></a>
      <p class="ds-note">{t.source}</p>
    </div>
    <div class="ds-layout">
      <aside class="ds-sidebar"><nav aria-label={zh ? '設計系統目錄' : 'Design system contents'}>
        {sectionIds.map((id, i) => <a key={id} href={`#${id}`}><span aria-hidden="true">0{i + 1}</span>{t.sections[i]}</a>)}
      </nav><a class="ds-sidebar-top" href="#top">{zh ? '回到頁首 ↑' : 'Back to top ↑'}</a></aside>
      <article class="ds-content">
        <section class="ds-section" id="identity" aria-labelledby="identity-title">
          <div class="ds-section-head"><span class="ds-number">01</span><h2 id="identity-title">{t.sections[0]}</h2></div><p class="ds-lead">{t.brandLead}</p>
          <div class="ds-brand"><span class="mark" data-mark="ring" aria-hidden="true" /><span>London<br />Discover.</span></div>
          <div class="ds-type-pair">
            <div><p class="ds-label">{t.serif} / EB Garamond</p><p class="ds-glyph ds-display">Aa 倫敦</p><code>--font-display</code></div>
            <div><p class="ds-label">{t.sans} / Jost</p><p class="ds-glyph ds-text">Aa 倫敦</p><code>--font-text</code></div>
          </div><p class="ds-note">{t.fallback}</p>
        </section>
        <section class="ds-section" id="colour" aria-labelledby="colour-title">
          <div class="ds-section-head"><span class="ds-number">02</span><h2 id="colour-title">{t.sections[1]}</h2></div><p class="ds-lead">{t.colorsLead}</p>
          <div class="ds-swatches">{colorRoles.map(([key, en, chinese]) => <div class="ds-swatch" key={key}>
            <div class="ds-swatch-color" style={{ backgroundColor: `var(${key})` }} aria-hidden="true" />
            <h3>{zh ? chinese : en}</h3><code>{key}</code>
            <button type="button" class="ds-copy" aria-label={`${t.copy} ${tokens.colors[key]}`} onClick$={async () => {
              try { await navigator.clipboard.writeText(tokens.colors[key]); clipboard.value = `${t.copied} ${tokens.colors[key]}`; }
              catch { clipboard.value = t.copyFailed; }
            }}><span>{tokens.colors[key].toUpperCase()}</span><svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="7" y="7" width="9" height="10" /><path d="M12 7V3H3v10h4" /></svg></button>
          </div>)}</div>
          <p class="ds-copy-status ds-note" role="status" aria-live="polite">{clipboard.value || '\u00a0'}</p>
          <div class="ds-contrast"><h3>{t.contrast}</h3><p class="ds-note">{t.contrastNote}</p><dl>
            {(['--p-ink', '--p-muted', '--p-action'] as const).map(key => <div key={key}><dt><code>{key}</code></dt><dd>{contrastRatio(tokens.colors[key], tokens.colors['--p-bg'])}:1 <span>{Number(contrastRatio(tokens.colors[key], tokens.colors['--p-bg'])) >= 4.5 ? 'AA' : '—'}</span></dd></div>)}
          </dl></div>
        </section>
        <section class="ds-section" id="typography" aria-labelledby="typography-title">
          <div class="ds-section-head"><span class="ds-number">03</span><h2 id="typography-title">{t.sections[2]}</h2></div><p class="ds-lead">{t.typeLead}</p>
          <div class="ds-type-controls">
            <label class="ds-field" for="ds-sample"><span>{t.sample}</span><input id="ds-sample" type="text" maxLength={100} value={sample.value} onInput$={(_, el) => { sample.value = el.value; }} /></label>
            <div class="ds-font-toggle" role="group" aria-label={zh ? '預覽字體' : 'Preview typeface'}>
              <button type="button" aria-pressed={font.value === 'display' ? 'true' : 'false'} onClick$={() => { font.value = 'display'; }}>EB Garamond</button>
              <button type="button" aria-pressed={font.value === 'text' ? 'true' : 'false'} onClick$={() => { font.value = 'text'; }}>Jost</button>
            </div>
            <label class="ds-range-label" for="ds-width"><span>{t.width}</span><output for="ds-width">{width.value} px</output></label>
            <input id="ds-width" class="ds-range" type="range" min="320" max="1440" step="1" value={width.value} onInput$={(_, el) => { width.value = Number(el.value); }} />
            <div class="ds-range-ends" aria-hidden="true"><span>320 px</span><span>1440 px</span></div>
          </div>
          <div class="ds-type-scale">{Object.entries(tokens.fluidType).reverse().map(([key, value]) => <div class="ds-type-row" key={key} data-token={key}>
            <div class="ds-type-meta"><code>{key}</code><span>{fluidPixels(value, width.value)} px</span></div>
            <p style={{ fontFamily: `var(--font-${font.value})`, fontSize: `${fluidPixels(value, width.value)}px` }}>{sample.value || t.sampleText}</p>
            <code class="ds-formula">{value}</code>
          </div>)}</div><p class="ds-note">{t.reference}</p>
        </section>
        <section class="ds-section" id="spacing" aria-labelledby="spacing-title">
          <div class="ds-section-head"><span class="ds-number">04</span><h2 id="spacing-title">{t.sections[3]}</h2></div><p class="ds-lead">{t.spacingLead}</p>
          <h3 class="ds-subtitle">{t.fixed}</h3><div class="ds-space-list">{Object.entries(tokens.spacing).map(([key, value]) => <div key={key}><code>{key}</code><span class="ds-space-bar" style={{ width: `var(${key})` }} aria-hidden="true" /><span>{value}</span></div>)}</div>
          <h3 class="ds-subtitle">{t.fluid}</h3><div class="ds-fluid-spaces">{Object.entries(tokens.fluidSpace).map(([key, value]) => <div key={key}><div><code>{key}</code><span>{fluidPixels(value, 320)}–{fluidPixels(value, 1440)} px</span></div><code class="ds-formula">{value}</code></div>)}</div>
          <h3 class="ds-subtitle">{t.layout}</h3><div class="ds-layout-diagram" aria-hidden="true"><div /><div /><div /><div /></div>
          <table class="ds-table"><thead><tr><th scope="col">{t.device}</th><th scope="col">{t.edge}</th><th scope="col">{t.gap}</th></tr></thead><tbody>
            <tr><th scope="row">&lt; 640 px</th><td>24 px</td><td>12 px</td></tr><tr><th scope="row">640–1023 px</th><td>48 px</td><td>24 px</td></tr><tr><th scope="row">1024–1440 px</th><td>120 px</td><td>24 px</td></tr>
          </tbody></table><p class="ds-note">{t.container}</p>
        </section>
        <section class="ds-section" id="components" aria-labelledby="components-title">
          <div class="ds-section-head"><span class="ds-number">05</span><h2 id="components-title">{t.sections[4]}</h2></div><p class="ds-lead">{t.componentsLead}</p>
          <div class="ds-specimen"><h3>{t.buttons}</h3><div class="ds-button-row"><a class="btn btn--primary" href={pathFor(locale, 'walk/')}>{t.primary}<Arrow /></a><a class="btn btn--secondary" href={pathFor(locale, 'bridge/')}>{t.secondary}<Arrow /></a></div><div class="ds-disabled-row"><button type="button" class="btn btn--primary" disabled>{t.unavailable}<Arrow /></button><span class="ds-note">{t.disabled}</span></div><p class="ds-note">{t.focus}</p></div>
          <div class="ds-specimen"><h3>{t.checklist}</h3><div class={`walk-stop ds-check ${visited.value ? 'is-visited' : ''}`}>
            <label for="ds-visited"><input id="ds-visited" type="checkbox" checked={visited.value} onChange$={(_, el) => { visited.value = el.checked; }} /><span class="stop-title">{t.check}</span></label>
          </div><p class="ds-check-status" role="status">{visited.value ? t.visited : t.unvisited}</p><p class="ds-note">{t.demoNote}</p></div>
        </section>
        <section class="ds-section" id="images" aria-labelledby="images-title">
          <div class="ds-section-head"><span class="ds-number">06</span><h2 id="images-title">{t.sections[5]}</h2></div><p class="ds-lead">{t.imageLead}</p>
          <a class="link ds-credit-link" href={pathFor(locale, 'credits/')}>{t.imageLink}<Arrow /></a>
          <a class="ds-photo-link m-zoom" href={pathFor(locale, 'bridge/')} aria-label={t.secondary}><Photo id="f152982562" alt={zh ? '泰晤士河上的倫敦塔橋' : 'Tower Bridge across the Thames'} class="ds-photo" /></a>
          <div class="ds-motion"><p class="ds-lead">{t.motionLead}</p><dl>{motionKeys.map((key, i) => <div key={key}><dt>{t.motionNames[i]}<code>{key}</code></dt><dd>{tokens.motion[key]}</dd></div>)}</dl></div>
        </section>
        <div class="ds-end"><h2>{t.ending}</h2><a class="link" href={pathFor(locale, 'prototype/')}>{t.prototype}<Arrow /></a></div>
      </article>
    </div>
  </div></main><SmallFooter locale={locale} /></>;
});

export const onStaticGenerate: StaticGenerateHandler = () => ({ params: [{ locale: 'en' }, { locale: 'zh-tw' }] });
export const head: DocumentHead = ({ params }) => {
  const t = dsCopy[params.locale === 'en' ? 'en' : 'zh-tw'];
  return { title: `${t.label} — London Discover`, meta: [{ name: 'description', content: t.intro }], links: [{ rel: 'stylesheet', href: `${BASE}design-system.css` }] };
};
