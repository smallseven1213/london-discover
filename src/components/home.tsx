import { component$ } from '@builder.io/qwik';
import { copy, places, pathFor, type Locale } from '../lib/content';
import { Header, ActionBar, Arrow } from './header';
import { Footer } from './footer';
import { Photo } from './photo';

export const Home = component$<{ locale: Locale }>(({ locale }) => {
  const t = copy[locale];
  return <>
    <Header locale={locale} />
    <main id="top" lang={locale === 'en' ? 'en' : 'zh-Hant'}>
      <section class="hero hero--place" data-enter aria-labelledby="hero-h">
        <Photo id="f131575562" hero class="hero__bg" alt={locale === 'en' ? 'The Palace of Westminster and Elizabeth Tower beside the Thames' : '泰晤士河畔的西敏宮與伊莉莎白塔'} />
        <div class="wrap"><div class="hero-text"><div class="hero__text">
          <h1 id="hero-h">{t.hero[0]}<br />{t.hero[1]}</h1><p class="hero__lead">{t.lead}</p>
          <div class="btn-row"><a class="btn btn--primary" href={pathFor(locale, 'walk/')}>{t.route}<Arrow /></a></div>
        </div></div></div>
      </section>
      <section class="section city-section" id="visit" data-place="visit" aria-labelledby="city-h">
        <div class="wrap">
          <h2 id="city-h">{t.introTitle}</h2>
          <div class="grid grid--top city-grid">
            <div class="span-6 city-copy"><p class="t-lead measure">{t.intro}</p><a class="link" href="https://www.towerbridge.org.uk/stories/history" target="_blank" rel="noopener noreferrer">{t.introLink}<Arrow /></a></div>
            <figure class="develop span-6 start-7"><a class="m-zoom" href={pathFor(locale, 'bridge/')} aria-label={t.scene}><Photo id="f152982562" moment alt={locale === 'en' ? 'The two stone towers and blue suspension chains of Tower Bridge' : '倫敦塔橋的石造雙塔與藍色吊索'} /></a></figure>
          </div>
        </div>
      </section>
      <section class="section places-section" id="places" aria-labelledby="places-h">
        <div class="wrap">
          <div class="section-head--split"><h2 id="places-h">{t.placesTitle}</h2><p>{t.placesLead}</p></div>
          <div class="place-grid">
            {places.map(place => <article class="place-item" key={place.id}>
              <a class="place-link" href={place.url} target="_blank" rel="noopener noreferrer"><div class="place-copy"><div class="place-name"><h3>{place.name[locale]}</h3><Arrow /></div><p>{place.text[locale]}</p></div><Photo id={place.image} alt={place.name[locale]} class="place-photo m-zoom" /></a>
            </article>)}
          </div>
        </div>
      </section>
      <section class="section neighbourhood-section" id="neighbourhoods" aria-labelledby="neighbourhood-h">
        <div class="wrap">
          <h2 id="neighbourhood-h">{t.neighbourhoodTitle}</h2>
          <div class="grid grid--top neighbourhood-grid">
            <div class="span-6 neighbourhood-copy"><p class="t-lead measure">{t.neighbourhood}</p><a class="link" href="https://www.openstreetmap.org/search?query=Notting%20Hill%20London" target="_blank" rel="noopener noreferrer">{t.neighbourhoodLink}<Arrow /></a><Photo id="f32590722" class="street-detail" alt={locale === 'en' ? 'The colourful shopfronts along Portobello Road' : '波多貝羅路上的彩色店面'} /></div>
            <Photo id="f145078262" class="span-6 start-7 neighbourhood-photo" alt={locale === 'en' ? 'Colourful terraced houses in Notting Hill' : '諾丁丘色彩鮮明的連棟排屋'} />
          </div>
        </div>
      </section>
    </main>
    <Footer locale={locale} /><ActionBar locale={locale} />
  </>;
});
