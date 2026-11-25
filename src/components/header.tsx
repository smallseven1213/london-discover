import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { copy, pathFor, type Locale } from '../lib/content';

export const Arrow = component$(() => <svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path class="m-arrow__stem" d="M1 6h8" /><path class="m-arrow__head" d="m4.5 2.5 3.5 3.5-3.5 3.5" /></svg>);

export const Header = component$<{ locale: Locale }>(({ locale }) => {
  const loc = useLocation();
  const t = copy[locale];
  const altPath = loc.url.pathname.includes(`/${locale}/`) ? loc.url.pathname.replace(`/${locale}/`, locale === 'en' ? '/zh-tw/' : '/en/') : pathFor(locale === 'en' ? 'zh-tw' : 'en');
  return <header class="nav nav--split">
    <div class="wrap nav__bar">
      <a class="skip-link" href="#top">{t.skip}</a>
      <a class="nav__logo" href={pathFor(locale)} aria-label="London Discover"><span class="mark" data-mark="ring" aria-hidden="true" />London<span class="logo-small">Discover</span></a>
      <nav class="nav__links" aria-label={locale === 'en' ? 'Main navigation' : '主要導覽'}>
        {t.nav.map((label, i) => <div class="nav__item" key={label}><a class="nav__link" href={`${pathFor(locale)}#${['visit', 'places', 'neighbourhoods'][i]}`}>{label}</a></div>)}
      </nav>
      <div class="nav__actions">
        <a class="locale-switch" href={altPath} hreflang={locale === 'en' ? 'zh-Hant' : 'en'} aria-label={locale === 'en' ? '切換為繁體中文' : 'Switch to English'} preventdefault:click onClick$={() => { window.location.assign(altPath + window.location.hash); }}>{locale === 'en' ? '繁中' : 'EN'}</a>
        <a class="btn btn--primary nav-route" href={pathFor(locale, 'walk/')}>{t.route}<Arrow /></a>
      </div>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-label={t.menu}>
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M2 6h16M2 14h16" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>
      </button>
    </div>
  </header>;
});

export const ActionBar = component$<{ locale: Locale }>(({ locale }) => <nav class="actionbar" aria-label={locale === 'en' ? 'Walking route' : '散步路線'}><a class="btn btn--primary" href={pathFor(locale, 'walk/')}>{copy[locale].route}<Arrow /></a></nav>);
