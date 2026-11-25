import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import { BASE, ORIGIN, localeOf, copy, pathFor } from '../lib/content';

export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();
  const locale = localeOf(loc.url.pathname);
  const t = copy[locale];
  const title = head.title || `${t.title} — London Discover`;
  const description = head.meta.find(m => m.name === 'description')?.content || t.description;
  const page = loc.url.pathname.slice(BASE.length).replace(/^(en|zh-tw)\//, '');
  return <>
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="description" content={description} />
    <meta name="page-type" content="place" /><meta name="site-kind" content="other" /><meta name="page-kind" content="place" />
    <meta name="theme-color" content="#f7f3ec" />
    <meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:type" content="website" />
    <meta property="og:image" content={`${ORIGIN}${BASE}share.jpg`} /><meta name="twitter:card" content="summary_large_image" />
    <link rel="canonical" href={`${ORIGIN}${loc.url.pathname}`} />
    <link rel="alternate" hreflang="en" href={`${ORIGIN}${pathFor('en', page)}`} />
    <link rel="alternate" hreflang="zh-Hant" href={`${ORIGIN}${pathFor('zh-tw', page)}`} />
    <link rel="icon" type="image/svg+xml" href={`${BASE}favicon.svg`} />
    <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500&family=Jost:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href={`${BASE}assets/system.css`} /><link rel="stylesheet" href={`${BASE}assets/ui/cards.css`} /><link rel="stylesheet" href={`${BASE}assets/motion/motion.css`} /><link rel="stylesheet" href={`${BASE}assets/layout/layout.css`} />
    <script dangerouslySetInnerHTML={`document.documentElement.lang='${locale === 'en' ? 'en' : 'zh-Hant'}';Object.assign(document.documentElement.dataset,{type:'place',radius:'sharp',buttons:'arrow',motion:''});document.documentElement.classList.add('m-enter','mo-js');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700);setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500);`} />
    <link rel="stylesheet" href={`${BASE}theme.css`} />
    {head.links.map((link) => <link key={link.key || link.href} {...link} />)}
    <link rel="modulepreload" href={`${BASE}assets/moments/moments.js`} /><link rel="modulepreload" href={`${BASE}assets/moments/lib.js`} /><link rel="modulepreload" href={`${BASE}assets/moments/picture-develops/moment.js`} />
    {head.meta.filter(m => m.name !== 'description').map((m) => <meta key={m.key || m.name || m.property} {...m} />)}
  </>;
});
