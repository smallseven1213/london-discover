import { component$, useSignal, useVisibleTask$, noSerialize, type NoSerialize } from '@builder.io/qwik';
import { useLocation, type StaticGenerateHandler, type DocumentHead } from '@builder.io/qwik-city';
import { Header } from '../../../components/header';
import { SmallFooter } from '../../../components/footer';
import { Photo } from '../../../components/photo';
import { localeOf, copy, pathFor } from '../../../lib/content';
import type { createBridge } from '../../../lib/bridge';

export default component$(()=>{
 const locale=localeOf(useLocation().url.pathname);const t=copy[locale];
 const canvas=useSignal<HTMLCanvasElement>();const state=useSignal<'idle'|'loading'|'ready'|'error'>('idle');
 const runtime=useSignal<NoSerialize<Awaited<ReturnType<typeof createBridge>>>>();
 useVisibleTask$(({cleanup})=>{cleanup(()=>runtime.value?.dispose());});
 return <><Header locale={locale}/><main class="sub-main" id="top"><div class="wrap">
   <div class="sub-head"><a class="link back-link" href={pathFor(locale)}>{t.back}</a><h1>{t.sceneTitle}</h1><p>{t.sceneLead}</p></div>
   {/* Qwik renders boolean data attributes as presence flags; CSS needs the literal string "true". */}
   <div class="bridge-stage" data-active={state.value==='ready' ? 'true' : 'false'}><Photo id="f152982562" alt={locale==='en'?'Tower Bridge, London':'倫敦塔橋'}/><canvas ref={canvas} width="1200" height="650" tabIndex={state.value==='ready'?0:-1} role="img" aria-label={t.modelNote}/></div>
   <div class="bridge-controls">
   {state.value!=='ready' ? <button class="btn btn--primary" type="button" disabled={state.value==='loading'} onClick$={async()=>{
     if(!canvas.value)return;state.value='loading';
     try { const {createBridge}=await import('../../../lib/bridge');runtime.value=noSerialize(await createBridge(canvas.value,()=>{state.value='error';}));state.value='ready';canvas.value.focus(); }
     catch {state.value='error';}
   }}>{state.value==='loading'?t.loading3d:t.start3d}</button> : <><button class="btn btn--secondary" onClick$={()=>runtime.value?.setView('front')}>{t.front}</button><button class="btn btn--secondary" onClick$={()=>runtime.value?.setView('angle')}>{t.angle}</button></>}
   <a class="link" href="https://www.towerbridge.org.uk/stories/history" target="_blank" rel="noopener noreferrer">{t.introLink}</a></div>
   <p role="status" class="bridge-note">{state.value==='error'?t.fallback3d:t.modelNote}</p>
 </div></main><SmallFooter locale={locale}/></>;
});
export const onStaticGenerate:StaticGenerateHandler=()=>({params:[{locale:'en'},{locale:'zh-tw'}]});
export const head:DocumentHead=({params})=>({title:`${params.locale==='en'?'Tower Bridge in 3D':'3D 倫敦塔橋'} — London Discover`});
