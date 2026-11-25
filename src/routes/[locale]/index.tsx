import { component$ } from '@builder.io/qwik';
import { useLocation, type StaticGenerateHandler } from '@builder.io/qwik-city';
import { Home } from '../../components/home';
import { localeOf } from '../../lib/content';
export default component$(() => {
  const location = useLocation();
  const locale = localeOf(location.url.pathname);
  return <Home locale={locale} />;
});
export const onStaticGenerate: StaticGenerateHandler = () => ({ params: [{ locale: 'zh-tw' }, { locale: 'en' }] });
