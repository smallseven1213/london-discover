import { component$ } from '@builder.io/qwik';
import { BASE } from '../lib/content';

export const Photo = component$<{ id: string; alt: string; hero?: boolean; moment?: boolean; class?: string }>(({ id, alt, hero, moment, class: className }) => <picture class={className} data-phone-fill={hero || undefined} data-moment={moment ? 'picture-develops' : undefined}>
  {hero && <source media="(max-width: 639px)" srcset={`${BASE}images/photo-${id}-phone.webp`} />}
  <img src={`${BASE}images/photo-${id}-1200.webp`} srcset={['f152982562', 'f145078262'].includes(id) ? undefined : `${BASE}images/photo-${id}-600.webp 600w, ${BASE}images/photo-${id}-1200.webp 1200w${hero ? `, ${BASE}images/photo-${id}-2400.webp 2400w` : ''}`} sizes={hero ? '100vw' : className?.includes('place-photo') ? '(min-width: 1440px) 282px, (min-width: 1024px) calc((100vw - 312px) / 4), (min-width: 640px) calc((100vw - 120px) / 2), calc(100vw - 48px)' : className?.includes('street-detail') ? '(min-width: 1440px) 282px, (min-width: 1024px) calc((100vw - 312px) / 4), (min-width: 640px) calc((100vw - 120px) / 2), calc(100vw - 48px)' : '100vw'}
    width={hero ? 2400 : 1200} height={hero ? 1600 : 900} alt={alt} loading={hero ? 'eager' : 'lazy'} fetchPriority={hero ? 'high' : 'auto'} decoding="async" data-source="stand-in" data-subject={alt} />
</picture>);
