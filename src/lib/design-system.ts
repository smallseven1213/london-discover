import tokens from './design-tokens.generated.json';
export { tokens };

// Evaluate the actual rem/vw clamp tokens, using a 16px reference root.
export function fluidPixels(value: string, width: number): number {
  const match = value.match(/^clamp\(([\d.]+)rem,\s*([\d.]+)rem\s*\+\s*([\d.]+)vw,\s*([\d.]+)rem\)$/);
  if (!match) throw new Error(`Unsupported fluid token: ${value}`);
  const [, min, intercept, slope, max] = match.map(Number);
  return Math.round(Math.min(max * 16, Math.max(min * 16, intercept * 16 + slope * width / 100)) * 100) / 100;
}

export const colorRoles: [keyof typeof tokens.colors, string, string][] = [
  ['--p-bg', 'Paper', '紙色・頁面底色'],
  ['--p-surface', 'Surface', '米色・區塊底色'],
  ['--p-ink', 'Ink', '深褐・主要文字'],
  ['--p-muted', 'Secondary text', '褐灰・次要文字'],
  ['--p-accent', 'Walnut', '胡桃・品牌強調'],
  ['--p-action', 'Action', '胡桃・互動操作'],
  ['--p-action-ink', 'On action', '白色・按鈕文字'],
  ['--p-inv-bg', 'Inverse surface', '深色區塊'],
];

export const dsCopy = {
  'zh-tw': {
    title: '倫敦的設計語言。', label: '設計系統',
    intro: '紙色底、胡桃色、兩套字體。這裡收錄 London Discover 正在使用的視覺規格與可操作的元件。',
    download: '下載設計 tokens', source: '數值取自網站 CSS，隨每次建置同步。',
    sections: ['品牌與字體', '色彩', '流動字級', '間距與版面', '互動元件', '影像與動態'],
    brandLead: '用書頁般的留白與襯線標題，搭配清楚、易讀的導覽文字。',
    serif: '標題字體', sans: '內文字體',
    fallback: '中文字體依裝置顯示：標題優先宋體，內文優先黑體。',
    colorsLead: '色彩依用途命名。點選色票下方的色碼即可複製；所有反白與互動別名也包含在下載檔中。',
    copy: '複製色碼', copied: '已複製', copyFailed: '無法使用剪貼簿，請選取色碼手動複製。',
    contrast: '文字對比', contrastNote: '以下為 sRGB 對比率，採用頁面紙色作為背景。',
    typeLead: 'Utopia 流動尺度在 320–1440 px 間連續變化。調整預覽寬度，看看同一組 CSS clamp 如何改變字級。',
    sample: '預覽文字', sampleText: '沿著河，慢慢認識倫敦。', width: '模擬視窗寬度',
    reference: '此預覽以 1 rem = 16 px 計算；實際網站會尊重瀏覽器的字體設定。',
    token: 'Token', size: '預覽尺寸', formula: 'CSS 數值',
    spacingLead: '固定間距用於元件細節；流動間距讓內容隨畫面呼吸。頁面左右使用相同的邊界。',
    fixed: '固定間距', fluid: '流動間距', layout: 'RWD 版面',
    device: '視窗寬度', edge: '單側邊界', gap: '欄間距',
    container: '內容最大寬度 1200 px；超過 1440 px 時置中。首頁四欄地標在平板改為兩欄、手機改為一欄。',
    componentsLead: '下方使用和網站相同的按鈕、連結與勾選樣式。用滑鼠、觸控或 Tab 鍵試試看。',
    buttons: '按鈕與連結', primary: '查看散步路線', secondary: '轉動 3D 塔橋', unavailable: '尚未開放',
    disabled: '停用狀態', focus: '鍵盤焦點為 2 px 胡桃色外框；主要操作的觸控高度至少 44 px。',
    checklist: '清單狀態', check: '標記塔橋為已走過', unvisited: '尚未走過', visited: '已走過塔橋',
    demoNote: '這裡的勾選僅供示範，不會更動散步路線的進度。',
    imageLead: '真實城市照片、方正裁切，不加濾鏡。文字留在照片之外，讓街景與建築自己說話。',
    imageLink: '查看攝影來源', motionLead: '互動以短促回饋為主。照片在游標停留時輕微放大；系統偏好減少動態時停用轉場。',
    motionNames: ['滑入回饋', '滑出回饋', '按下回饋', '照片放大'],
    ending: '從規格，走回城市。', prototype: '查看網站路徑',
  },
  en: {
    title: 'The shape of London.', label: 'Design system',
    intro: 'Paper, walnut and two typefaces. The visual foundations and working components behind London Discover.',
    download: 'Download design tokens', source: 'Values come from the site CSS and update with every build.',
    sections: ['Identity & type', 'Colour', 'Fluid typography', 'Spacing & layout', 'Components', 'Images & motion'],
    brandLead: 'Book-like space and serif headings, paired with clear navigation and readable body text.',
    serif: 'Display typeface', sans: 'Text typeface',
    fallback: 'Chinese uses local serif and sans-serif fallbacks, depending on the device.',
    colorsLead: 'Colours are named by their role. Select a colour value to copy it. The download includes every inverse and action alias.',
    copy: 'Copy colour', copied: 'Copied', copyFailed: 'Clipboard unavailable. Select the colour value and copy it manually.',
    contrast: 'Text contrast', contrastNote: 'sRGB contrast ratios against the paper background.',
    typeLead: 'The Utopia scale moves continuously between 320 and 1440 px. Change the preview width to see the same CSS clamp values at work.',
    sample: 'Preview text', sampleText: 'Get to know London, one walk at a time.', width: 'Simulated viewport width',
    reference: 'This preview uses 1 rem = 16 px. The live site respects browser font preferences.',
    token: 'Token', size: 'Preview size', formula: 'CSS value',
    spacingLead: 'Fixed spacing handles component details. Fluid spacing gives the content room to breathe. Left and right page edges stay equal.',
    fixed: 'Fixed spacing', fluid: 'Fluid spacing', layout: 'Responsive layout',
    device: 'Viewport', edge: 'Each page edge', gap: 'Column gap',
    container: 'Content is capped at 1200 px and centred beyond 1440 px. The four-column landmark grid becomes two columns on tablets and one on phones.',
    componentsLead: 'These are the same buttons, links and checklist styles used on the site. Try a mouse, touch or the Tab key.',
    buttons: 'Buttons & links', primary: 'See the walking route', secondary: 'Turn the 3D bridge', unavailable: 'Not available yet',
    disabled: 'Disabled state', focus: 'Keyboard focus uses a 2 px walnut outline. Main controls have a touch height of at least 44 px.',
    checklist: 'Checklist states', check: 'Mark Tower Bridge as visited', unvisited: 'Not visited', visited: 'Tower Bridge visited',
    demoNote: 'This example stays on this page. It does not change your saved walking progress.',
    imageLead: 'Real city photography, square edges and no filters. Text stays outside the frame, leaving room for the streets and buildings.',
    imageLink: 'See photography credits', motionLead: 'Motion gives brief feedback. Photographs gently zoom on hover; transitions stop when reduced motion is preferred.',
    motionNames: ['Hover in', 'Hover out', 'Press', 'Image zoom'],
    ending: 'From the guide to the city.', prototype: 'Explore the website paths',
  },
};

export function contrastRatio(a: string, b: string): string {
  const luminance = (hex: string) => {
    const full = hex.length === 4 ? hex.slice(1).split('').map(c => c + c).join('') : hex.slice(1);
    const channels = [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16) / 255).map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  };
  const la = luminance(a), lb = luminance(b);
  return ((Math.max(la, lb) + .05) / (Math.min(la, lb) + .05)).toFixed(2);
}
