import { renderToStream, type RenderToStreamOptions } from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import Root from './root';
export default function (opts: RenderToStreamOptions) {
  const pathname = String(opts.serverData?.url || '');
  return renderToStream(<Root />, { manifest, ...opts, containerAttributes: {
    lang: pathname.includes('/en/') ? 'en' : 'zh-Hant', 'data-type': 'place',
    'data-radius': 'sharp', 'data-buttons': 'arrow', 'data-motion': '',
  } });
}
