import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head';
import './global.css';

export default component$(() => <QwikCityProvider>
  <head><meta charset="utf-8" /><RouterHead /></head>
  <body data-deal="warm-paper-walnut / garamond / place / nav-split / footer-visit / space / arrow / ring / strip / story / name">
    <RouterOutlet />
    <script type="module" src="/london-discover/assets/system.js" />
    <script type="module" src="/london-discover/assets/layout/layout.js" />
    <script type="module" src="/london-discover/assets/motion/motion.js" />
  </body>
</QwikCityProvider>);
