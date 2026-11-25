export type Locale = 'zh-tw' | 'en';
export const BASE = '/london-discover/';
export const ORIGIN = 'https://smallseven1213.github.io';
export const localeOf = (pathname: string): Locale => pathname.includes('/en/') ? 'en' : 'zh-tw';
export const pathFor = (locale: Locale, page = '') => `${BASE}${locale}/${page}`;
export const copy = {
  'zh-tw': {
    title: '倫敦，城市散步指南', description: '從泰晤士河到諾丁丘，用地標、街區與一段河岸散步，開始認識倫敦。',
    nav: ['倫敦', '地標', '街區'], skip: '跳到主要內容', menu: '開啟選單', route: '查看散步路線',
    hero: ['倫敦，', '城市散步指南。'], lead: '從泰晤士河出發，看看熟悉的地標，走進街區，再安排一段自己的倫敦散步。',
    introTitle: '沿著泰晤士河，認識倫敦。', intro: '從西敏寺一帶出發，沿南岸向東走。國會大廈、河岸藝廊與 1894 年啟用的倫敦塔橋，串起城市不同年代的風景。',
    introLink: '閱讀塔橋故事', introNote: '河的兩岸，都是散步的起點。',
    placesTitle: '四個地方，四種倫敦。', placesLead: '看一座圓頂，逛一個市場，留點時間給河岸。',
    neighbourhoodTitle: '諾丁丘，留給午後。', neighbourhood: '彩色排屋、古董攤位與一條條住宅街道。沿波多貝羅路逛逛，再轉進旁邊的小巷。拍照時，也把門前的空間留給住戶。',
    neighbourhoodLink: '查看街區位置', close: '排一段自己的倫敦散步。', closeLead: '從西敏寺到倫敦塔橋，把南岸與波羅市場一起放進路線。',
    credits: '攝影與資料來源', prototype: '網站路徑原型', scene: '轉動 3D 塔橋', transit: '查詢倫敦交通',
    independent: '一份獨立製作的倫敦城市指南。', sourceLine: '攝影來源：Wikimedia Commons', back: '回到城市指南',
    walkTitle: '沿河走一段倫敦。', walkLead: '西敏寺 → 南岸 → 波羅市場 → 倫敦塔橋。四站依序向東，停留多久由你決定。',
    walkHint: '勾選已走過的地點，進度會保存在這台裝置。', visited: '已走過', reset: '重設散步進度', saved: '進度已儲存', storageUnavailable: '目前無法儲存進度，仍可在這一頁勾選。',
    official: '查看官方資訊', map: '在地圖查看路線', walkFoot: '這是建議的散步順序。出發前，請向各景點確認開放時間與無障礙路線。',
    protoTitle: '倫敦網站的每一條路。', protoLead: '拖曳節點排列頁面，從接點拉出連線。選取節點後，開啟對應頁面。',
    sceneTitle: '從另一個角度，看倫敦塔橋。', sceneLead: '轉動一座建築模型，看看雙塔、高架步道與藍色吊索如何跨過泰晤士河。',
    start3d: '開啟互動模型', loading3d: '正在準備模型…', fallback3d: '這個瀏覽器目前無法開啟互動模型，仍可查看塔橋照片。',
    modelNote: '建築形體研究，非測繪模型。拖曳旋轉；方向鍵調整視角；＋／－縮放。', front: '正面視角', angle: '河岸視角',
  },
  en: {
    title: 'Your London city guide', description: 'Get to know London through its landmarks, neighbourhood streets and a walk along the Thames.',
    nav: ['London', 'Landmarks', 'Neighbourhoods'], skip: 'Skip to content', menu: 'Open menu', route: 'See the walking route',
    hero: ['Your London', 'city guide.'], lead: 'Start with the Thames. Find familiar landmarks, neighbourhood streets and a walk to make your own.',
    introTitle: 'A city along the Thames.', intro: 'London looks different from the river. Start at Westminster, follow the South Bank, then head towards Tower Bridge, opened in 1894.',
    introLink: 'Read the bridge’s story', introNote: 'A walk begins on either bank.',
    placesTitle: 'Four stops, four sides of London.', placesLead: 'A dome, a market, and a little time by the river.',
    neighbourhoodTitle: 'An afternoon in Notting Hill.', neighbourhood: 'Coloured terraces, antique stalls and streets worth taking slowly. Walk along Portobello Road, then turn into the surrounding residential streets. Leave residents room at their doorsteps.',
    neighbourhoodLink: 'See the neighbourhood', close: 'A London walk of your own.', closeLead: 'Westminster to Tower Bridge, with time for the South Bank and Borough Market.',
    credits: 'Photography & sources', prototype: 'Website path prototype', scene: 'Turn the 3D bridge', transit: 'Plan London transport',
    independent: 'An independent introduction to London.', sourceLine: 'Photographs via Wikimedia Commons', back: 'Back to the city guide',
    walkTitle: 'A London walk along the river.', walkLead: 'Westminster → South Bank → Borough Market → Tower Bridge. Four stops heading east, at your own pace.',
    walkHint: 'Check off the places you visit. Your progress stays on this device.', visited: 'Visited', reset: 'Reset walk progress', saved: 'Progress saved', storageUnavailable: 'Progress cannot be saved here. You can still use the checklist on this page.',
    official: 'See visitor information', map: 'See the route on a map', walkFoot: 'This is a suggested walking order. Check each venue for opening hours and accessible routes before setting out.',
    protoTitle: 'Every path through London.', protoLead: 'Drag pages into place and connect their handles. Select a node to open its page.',
    sceneTitle: 'Another view of Tower Bridge.', sceneLead: 'Turn an architectural model to see how the twin towers, high walkways and blue suspension chains cross the Thames.',
    start3d: 'Open the interactive model', loading3d: 'Preparing the model…', fallback3d: 'The interactive model is unavailable in this browser. You can still view the bridge photograph.',
    modelNote: 'An architectural study, not a survey model. Drag to orbit; arrow keys change the view; + / − zoom.', front: 'Front view', angle: 'River view',
  },
};

export const places = [
  { id: 'eye', image: 'f133433027', name: { en: 'London Eye', 'zh-tw': '倫敦眼' }, text: { en: 'See the river from above.', 'zh-tw': '換個角度看河岸。' }, url: 'https://www.londoneye.com/' },
  { id: 'paul', image: 'f100551953', name: { en: 'St Paul’s Cathedral', 'zh-tw': '聖保羅大教堂' }, text: { en: 'A dome above the City.', 'zh-tw': '倫敦城上方的圓頂。' }, url: 'https://www.stpauls.co.uk/' },
  { id: 'borough', image: 'f23076202', name: { en: 'Borough Market', 'zh-tw': '波羅市場' }, text: { en: 'Make room for lunch.', 'zh-tw': '把午餐留給市場。' }, url: 'https://boroughmarket.org.uk/visit-us/' },
  { id: 'covent', image: 'f109496782', name: { en: 'Covent Garden', 'zh-tw': '柯芬園' }, text: { en: 'A market square in the West End.', 'zh-tw': '西區裡的市集廣場。' }, url: 'https://www.coventgarden.london/' },
];

export const stops = [
  { id: 'westminster', name: { en: 'Westminster', 'zh-tw': '西敏寺一帶' }, detail: { en: 'Start by Parliament and cross Westminster Bridge to the south bank.', 'zh-tw': '從國會大廈旁出發，走過西敏橋，來到泰晤士河南岸。' }, url: 'https://www.parliament.uk/visiting/' },
  { id: 'southbank', name: { en: 'South Bank', 'zh-tw': '南岸' }, detail: { en: 'Follow the riverside past the London Eye and the Southbank Centre.', 'zh-tw': '沿著河畔步道向東，經過倫敦眼與南岸中心。' }, url: 'https://www.southbankcentre.co.uk/visit-us/' },
  { id: 'borough', name: { en: 'Borough Market', 'zh-tw': '波羅市場' }, detail: { en: 'Continue through Bankside to the market near London Bridge. Stop for something to eat.', 'zh-tw': '穿過 Bankside，來到倫敦橋附近的市場。停下來，找點想吃的東西。' }, url: 'https://boroughmarket.org.uk/visit-us/' },
  { id: 'tower', name: { en: 'Tower Bridge', 'zh-tw': '倫敦塔橋' }, detail: { en: 'Walk east past HMS Belfast. Finish with the twin towers ahead of you.', 'zh-tw': '繼續往東，經過貝爾法斯特號，讓眼前的塔橋雙塔為散步收尾。' }, url: 'https://www.towerbridge.org.uk/plan-your-visit' },
];
