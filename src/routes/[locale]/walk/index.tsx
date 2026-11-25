import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation, type StaticGenerateHandler, type DocumentHead } from '@builder.io/qwik-city';
import { copy, pathFor, localeOf, stops } from '../../../lib/content';
import { Header } from '../../../components/header';
import { SmallFooter } from '../../../components/footer';
import { Photo } from '../../../components/photo';

const STORAGE = 'london-discover.walk.v1';
export default component$(() => {
  const locale = localeOf(useLocation().url.pathname);
  const t = copy[locale];
  const checked = useSignal<string[]>([]);
  const message = useSignal('');
  useVisibleTask$(() => {
    try { const saved = JSON.parse(localStorage.getItem(STORAGE) || '[]'); if (Array.isArray(saved)) checked.value = [...new Set<string>(saved.filter((id) => stops.some(s => s.id === id)))]; }
    catch { message.value = t.storageUnavailable; }
  }, { strategy: 'document-ready' });
  return <><Header locale={locale} /><main class="sub-main" id="top"><div class="wrap">
    <div class="sub-head"><a class="back-link link" href={pathFor(locale)}>{t.back}</a><h1>{t.walkTitle}</h1><p>{t.walkLead}</p></div>
    <div class="walk-layout">
      <div><p class="walk-progress" aria-live="polite">{checked.value.length} / {stops.length} {t.visited}</p><p class="walk-hint">{t.walkHint}</p>
        <ol class="walk-list">{stops.map(stop => <li class={`walk-stop ${checked.value.includes(stop.id) ? 'is-visited' : ''}`} key={stop.id}>
          <label for={`stop-${stop.id}`}><input id={`stop-${stop.id}`} type="checkbox" checked={checked.value.includes(stop.id)} onChange$={(_, el) => {
            checked.value = el.checked ? [...new Set([...checked.value, stop.id])] : checked.value.filter(id => id !== stop.id);
            try { localStorage.setItem(STORAGE, JSON.stringify(checked.value)); message.value = t.saved; } catch { message.value = t.storageUnavailable; }
          }} /><span class="stop-title">{stop.name[locale]}</span></label><p>{stop.detail[locale]}</p><a class="link" href={stop.url} target="_blank" rel="noopener noreferrer">{t.official}</a>
        </li>)}</ol>
        <div class="walk-actions"><a class="btn btn--primary" href="https://www.google.com/maps/dir/?api=1&origin=Westminster+Bridge+London&destination=Tower+Bridge+London&waypoints=Southbank+Centre+London%7CBorough+Market+London&travelmode=walking" target="_blank" rel="noopener noreferrer">{t.map}</a><button type="button" class="btn btn--secondary" onClick$={() => { checked.value=[]; try { localStorage.removeItem(STORAGE); message.value=t.saved; } catch { message.value=t.storageUnavailable; } }}>{t.reset}</button></div>
        <p class="walk-note" role="status">{message.value}</p><p class="walk-note">{t.walkFoot}</p>
      </div>
      <Photo class="walk-photo" id="f152982562" alt={locale === 'en' ? 'Tower Bridge across the Thames' : '橫跨泰晤士河的倫敦塔橋'} />
    </div>
  </div></main><SmallFooter locale={locale} /></>;
});
export const onStaticGenerate: StaticGenerateHandler = () => ({ params: [{locale:'en'},{locale:'zh-tw'}] });
export const head: DocumentHead = ({params}) => ({title: `${params.locale === 'en' ? 'A riverside walk' : '泰晤士河散步路線'} — London Discover`});
