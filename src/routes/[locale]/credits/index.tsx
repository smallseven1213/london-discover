import { component$ } from '@builder.io/qwik';
import { useLocation, type StaticGenerateHandler, type DocumentHead } from '@builder.io/qwik-city';
import { Header } from '../../../components/header';
import { SmallFooter } from '../../../components/footer';
import { localeOf, copy, pathFor } from '../../../lib/content';
import photos from '../../../lib/photos.json';

export default component$(()=>{
 const locale=localeOf(useLocation().url.pathname);const t=copy[locale];const zh=locale==='zh-tw';
 return <><Header locale={locale}/><main class="sub-main" id="top"><div class="wrap"><div class="sub-head"><a class="link back-link" href={pathFor(locale)}>{t.back}</a><h1>{t.credits}</h1><p>{zh?'本網站使用實際倫敦景點的開放授權攝影。影像經裁切、縮放及 WebP 壓縮；原作授權適用於衍生影像。':'This guide uses openly licensed photographs of the actual London places. Images are cropped, resized and compressed as WebP; their original licenses apply to the adapted images.'}</p></div>
 <div class="credits-list">{photos.map(p=><article class="credit-entry" key={p.id}><h2>{p.alt}</h2><p>{p.by} · {p.licence}</p><a href={p.page} target="_blank" rel="noopener noreferrer">{zh?'查看原作':'View original'}</a><a href={p.licenceUrl} target="_blank" rel="noopener noreferrer">{zh?'閱讀授權':'Read license'}</a></article>)}</div>
 <ul class="source-links"><li><a href="https://www.parliament.uk/about/living-heritage/building/palace/big-ben/">UK Parliament — Big Ben</a></li><li><a href="https://www.towerbridge.org.uk/stories/history">Tower Bridge — History</a></li><li><a href="https://boroughmarket.org.uk/visit-us/">Borough Market — Visit us</a></li><li><a href="https://tfl.gov.uk/plan-a-journey/">Transport for London — Journey planner</a></li></ul>
 <p class="walk-note">{zh?'網站不使用分析追蹤或註冊表單。散步進度與原型排列儲存在瀏覽器的 localStorage，可用各頁的重設按鈕清除。外部地圖、景點網站與字型服務適用各自的隱私政策。':'There are no analytics or registration forms. Walk progress and prototype layouts are stored in your browser’s localStorage and can be cleared with each page’s reset button. External maps, venue websites and font services have their own privacy policies.'}</p>
 </div></main><SmallFooter locale={locale}/></>;
});
export const onStaticGenerate:StaticGenerateHandler=()=>({params:[{locale:'en'},{locale:'zh-tw'}]});
export const head:DocumentHead=({params})=>({title:`${params.locale==='en'?'Photography and sources':'攝影與資料來源'} — London Discover`});
