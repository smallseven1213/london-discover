import { component$ } from '@builder.io/qwik';
import { copy, pathFor, type Locale } from '../lib/content';
import { Arrow } from './header';

export const FooterLinks = component$<{ locale: Locale }>(({ locale }) => {
  const t = copy[locale];
  return <div class="closing__links">
    <div class="footer-directory flex flex-wrap items-start justify-between gap-8">
      <div><a class="nav__logo" href={pathFor(locale)}><span class="mark" data-mark="ring" aria-hidden="true" />London Discover</a><p class="footer__lede">{t.independent}</p></div>
      <nav aria-label={locale === 'en' ? 'More pages' : '其他頁面'} class="footer-nav">
        <a href={pathFor(locale, 'bridge/')}>{t.scene}</a><a href={pathFor(locale, 'prototype/')}>{t.prototype}</a>
        <a href="https://tfl.gov.uk/plan-a-journey/" target="_blank" rel="noopener noreferrer">{t.transit}</a><a href={pathFor(locale, 'credits/')}>{t.credits}</a>
      </nav>
    </div>
    <div class="footer__legal"><span>© 2026 London Discover</span><a href={pathFor(locale, 'credits/')}>{t.sourceLine}</a></div>
  </div>;
});

export const Footer = component$<{ locale: Locale }>(({ locale }) => <footer class="footer closing footer--visit" id="plan">
  <div class="wrap">
    <div class="closing__cta close--word">
      <div class="section-head--split"><div><h2>{copy[locale].close}</h2><p class="t-lead">{copy[locale].closeLead}</p></div><a class="btn btn--primary" href={pathFor(locale, 'walk/')}>{copy[locale].route}<Arrow /></a></div>
      <p class="london-word" aria-hidden="true">London.</p>
    </div>
    <FooterLinks locale={locale} />
  </div>
</footer>);

export const SmallFooter = component$<{ locale: Locale }>(({ locale }) => <footer class="footer sub-footer"><div class="wrap"><FooterLinks locale={locale} /></div></footer>);
