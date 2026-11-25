import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import sharp from 'sharp';

// Exercise the shipped Qwik UI with a real WebGPU browser, including the CSS layer.
// The native shader test alone cannot detect a photograph covering a working canvas.
const url = process.argv.find(arg => /^https?:\/\//.test(arg)) || 'http://127.0.0.1:5173/london-discover/zh-tw/bridge/';
const fallback = process.argv.includes('--fallback');
const binary = process.env.CHROME_BIN || [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
].find(existsSync);
assert(binary, 'Install Chrome or set CHROME_BIN to its executable.');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
await fs.mkdir('work/bridge-browser', { recursive: true });
const profile = await fs.mkdtemp(`${process.cwd()}/work/bridge-browser/chrome-`);
const chrome = spawn(binary, [
  '--headless=new', '--enable-unsafe-webgpu', '--ignore-gpu-blocklist',
  `--user-data-dir=${profile}`, '--remote-debugging-port=0', '--no-first-run',
  '--no-default-browser-check', '--disable-extensions', '--window-size=1280,1000', 'about:blank',
], { stdio: 'ignore' });
let socket, sequence = 0;
const pending = new Map(), errors = [];
function call(method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => { pending.delete(id); reject(Error(`CDP timed out: ${method}`)); }, 20000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
}
try {
  let port;
  for (let i = 0; i < 100 && !port; i++) {
    await sleep(100);
    try { port = parseInt(await fs.readFile(`${profile}/DevToolsActivePort`, 'utf8')); } catch {}
  }
  assert(port, 'Chrome did not start.');
  const version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
  socket = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const request = pending.get(message.id);
      if (!request) return;
      clearTimeout(request.timer); pending.delete(message.id);
      if (message.error) request.reject(Error(JSON.stringify(message.error)));
      else request.resolve(message.result);
    } else if (message.method === 'Runtime.exceptionThrown') {
      errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    } else if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') {
      errors.push(message.params.entry.text);
    }
  });
  const { targetId } = await call('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await call('Target.attachToTarget', { targetId, flatten: true });
  const send = (method, params) => call(method, params, sessionId);
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  const until = async (expression, message) => {
    for (let i = 0; i < 100; i++) { if (await evaluate(expression)) return; await sleep(100); }
    throw Error(message);
  };
  const click = async selector => {
    await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center'})`);
    const point = await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', ...point, button: 'left', clickCount: 1 });
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...point, button: 'left', clickCount: 1 });
  };
  const capture = async name => {
    await evaluate("document.querySelector('.bridge-stage').scrollIntoView({block:'center'})");
    await sleep(500);
    const clip = await evaluate("(()=>{const r=document.querySelector('.bridge-stage').getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height,scale:1}})()");
    const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip });
    const buffer = Buffer.from(data, 'base64');
    await fs.writeFile(`work/bridge-browser/${name}.png`, buffer);
    return sharp(buffer).ensureAlpha().raw().toBuffer();
  };
  const difference = (a, b) => {
    assert.equal(a.length, b.length, 'Camera changes must not resize the canvas.');
    let count = 0;
    for (let i = 0; i < a.length; i += 4) {
      if (Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2]) > 20) count++;
    }
    return count;
  };
  const visibility = () => evaluate("({active:document.querySelector('.bridge-stage').dataset.active,canvas:getComputedStyle(document.querySelector('.bridge-stage canvas')).opacity,photo:getComputedStyle(document.querySelector('.bridge-stage picture')).opacity})");
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
  await send('Emulation.setDeviceMetricsOverride', { width:1280, height:1000, deviceScaleFactor:1, mobile:false });
  if (fallback) await send('Page.addScriptToEvaluateOnNewDocument', { source:"Object.defineProperty(navigator,'gpu',{value:undefined,configurable:true})" });
  await send('Page.navigate', { url });
  await until("!!document.querySelector('.bridge-controls button')", 'The bridge page did not load.');
  await sleep(1000);
  const initialVisibility = await visibility();
  assert.equal(initialVisibility.photo, '1'); assert.equal(initialVisibility.canvas, '0');
  if (!fallback) {
    const adapter = await evaluate('(async()=>{const a=await navigator.gpu?.requestAdapter();return a?{vendor:a.info.vendor,architecture:a.info.architecture}:null})()');
    assert(adapter, 'This test requires a real WebGPU adapter; use --fallback only for the separate fallback test.');
    console.log('adapter', JSON.stringify(adapter));
  }
  await click('.bridge-controls button');
  if (fallback) {
    await until("/無法|unavailable/.test(document.querySelector('[role=status]').textContent)", 'Expected the unsupported-browser message.');
    assert.deepEqual(await visibility(), { active:'false', canvas:'0', photo:'1' });
    assert.equal(await evaluate("document.querySelectorAll('.bridge-controls button').length"), 1);
    console.log(JSON.stringify({ fallback:true, referencePhotoVisible:true, modelHidden:true, errors }));
  } else {
    await until("document.querySelectorAll('.bridge-controls button').length===2", 'The model did not initialize.');
    await sleep(300);
    assert.deepEqual(await visibility(), { active:'true', canvas:'1', photo:'0' }, 'A ready model must replace the photograph.');
    const initial = await capture('initial');
    await click('.bridge-controls button:nth-of-type(1)'); const front = await capture('front');
    await click('.bridge-controls button:nth-of-type(2)'); const angle = await capture('angle');
    const changed = { front:difference(initial,front), angle:difference(front,angle) };
    assert(changed.front > 5000 && changed.angle > 5000, 'Both view buttons must visibly change the rendered model.');
    const point = await evaluate("(()=>{const r=document.querySelector('.bridge-stage canvas').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()");
    await send('Input.dispatchMouseEvent', { type:'mousePressed', ...point, button:'left', clickCount:1 });
    await send('Input.dispatchMouseEvent', { type:'mouseMoved', x:point.x+110, y:point.y+30, button:'left', buttons:1 });
    await send('Input.dispatchMouseEvent', { type:'mouseReleased', x:point.x+110, y:point.y+30, button:'left', clickCount:1 });
    const dragged = await capture('dragged'); changed.drag = difference(angle,dragged);
    assert(changed.drag > 5000, 'Dragging must rotate the visible model.');
    await evaluate("document.querySelector('.bridge-stage canvas').focus()");
    await send('Input.dispatchKeyEvent', { type:'keyDown', key:'ArrowRight', code:'ArrowRight', windowsVirtualKeyCode:39 });
    await send('Input.dispatchKeyEvent', { type:'keyUp', key:'ArrowRight', code:'ArrowRight', windowsVirtualKeyCode:39 });
    const keyboard = await capture('keyboard'); changed.keyboard = difference(dragged,keyboard);
    assert(changed.keyboard > 1000, 'Keyboard navigation must change the visible model.');
    await send('Emulation.setDeviceMetricsOverride', { width:390, height:844, deviceScaleFactor:1, mobile:false });
    await sleep(500);
    await click('.bridge-controls button:nth-of-type(1)'); const mobileFront = await capture('mobile-front');
    await click('.bridge-controls button:nth-of-type(2)'); const mobileAngle = await capture('mobile-angle');
    changed.mobile = difference(mobileFront,mobileAngle);
    assert(changed.mobile > 1000, 'View switching must continue to work after a mobile resize.');
    assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'),true);
    assert.deepEqual(errors, [], 'The browser must not report runtime or resource errors.');
    console.log(JSON.stringify({ visibleModel:true, changedPixels:changed, mobileOverflow:false, errors }));
  }
} finally {
  try { await call('Browser.close'); } catch {}
  socket?.close();
  if (chrome.exitCode === null) await Promise.race([new Promise(resolve=>chrome.once('exit',resolve)),sleep(3000)]);
  if (chrome.exitCode === null) chrome.kill();
  await fs.rm(profile,{recursive:true,force:true});
}
