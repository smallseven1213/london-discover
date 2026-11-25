import { init, surface, effect, frame } from 'vgpu';
import shader from './bridge.wgsl';

export async function createBridge(canvas: HTMLCanvasElement, onLost: () => void) {
  const gpu = await init({powerPreference:'low-power'});
  const view = { yaw: -.48, pitch: .27, distance: 13.5 };
  let disposed=false, compiled=false;
  const stage=surface(gpu,canvas,{dpr:1,autoResize:false});
  const bridge=effect(gpu,shader,{set:{params:{resolution:[canvas.width,canvas.height],...view}}});
  let scheduled=0;
  const draw=()=>{if(disposed||!compiled)return;bridge.set({params:{...view,resolution:[canvas.width,canvas.height]}});frame(gpu,f=>f.pass(stage,bridge));};
  const schedule=()=>{if(!scheduled&&!disposed)scheduled=requestAnimationFrame(()=>{scheduled=0;draw();});};
  const resize=()=>{const rect=canvas.getBoundingClientRect();const scale=Math.min(1,1200/rect.width);stage.resize([Math.max(1,Math.round(rect.width*scale)),Math.max(1,Math.round(rect.height*scale))]);schedule();};
  const observer=new ResizeObserver(resize);observer.observe(canvas);
  let drag: {x:number;y:number}|null=null;
  const down=(e:PointerEvent)=>{drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);};
  const move=(e:PointerEvent)=>{if(!drag)return;view.yaw-=(e.clientX-drag.x)*.006;view.pitch=Math.max(.08,Math.min(1.1,view.pitch+(e.clientY-drag.y)*.005));drag={x:e.clientX,y:e.clientY};schedule();};
  const up=()=>{drag=null;};
  const key=(e:KeyboardEvent)=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-'].includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')view.yaw-=.1;if(e.key==='ArrowRight')view.yaw+=.1;if(e.key==='ArrowUp')view.pitch=Math.min(1.1,view.pitch+.08);if(e.key==='ArrowDown')view.pitch=Math.max(.08,view.pitch-.08);if(e.key==='+'||e.key==='=')view.distance=Math.max(9,view.distance-1);if(e.key==='-')view.distance=Math.min(19,view.distance+1);schedule();};
  canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);canvas.addEventListener('keydown',key);
  try { resize();await bridge.compile(stage);compiled=true;draw(); } catch(error) { dispose();throw error; }
  gpu.lost.then(()=>{if(!disposed){dispose();onLost();}});
  function dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(scheduled);observer.disconnect();canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up);canvas.removeEventListener('keydown',key);bridge.dispose();stage.dispose();gpu.dispose();}
  return { dispose, setView(preset:'front'|'angle'){view.yaw=preset==='front'?0:-.48;view.pitch=preset==='front'?.12:.27;view.distance=13.5;schedule();} };
}
