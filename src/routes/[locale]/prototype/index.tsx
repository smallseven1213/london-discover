import { component$ } from '@builder.io/qwik';
import { useLocation, type StaticGenerateHandler, type DocumentHead } from '@builder.io/qwik-city';
import { Header } from '../../../components/header';
import { SmallFooter } from '../../../components/footer';
import { QPrototype } from '../../../components/prototype';
import { localeOf, copy, pathFor } from '../../../lib/content';
export default component$(()=>{
  const locale=localeOf(useLocation().url.pathname);const t=copy[locale];
  return <><Header locale={locale}/><main class="sub-main prototype-page" id="top"><div class="wrap">
    <div class="sub-head"><a class="link back-link" href={pathFor(locale)}>{t.back}</a><h1>{t.protoTitle}</h1><p>{t.protoLead}</p></div>
    <link rel="stylesheet" href="/london-discover/prototype.css" /><QPrototype locale={locale}/>
    <nav class="flow-sitemap" aria-label={locale==='en'?'Page list':'頁面清單'}><a href={pathFor(locale)}>{locale==='en'?'City guide':'城市指南'}</a><a href={pathFor(locale,'walk/')}>{t.route}</a><a href={pathFor(locale,'bridge/')}>{t.scene}</a><a href={pathFor(locale,'design-system/')}>{t.designSystem}</a><a href={pathFor(locale,'credits/')}>{t.credits}</a></nav>
  </div></main><SmallFooter locale={locale}/></>;
});
export const onStaticGenerate:StaticGenerateHandler=()=>({params:[{locale:'en'},{locale:'zh-tw'}]});
export const head:DocumentHead=({params})=>({title:`${params.locale==='en'?'Website path prototype':'網站路徑原型'} — London Discover`});
