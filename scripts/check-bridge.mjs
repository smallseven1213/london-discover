import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {init,target,effect} from 'vgpu/node';
import {prepareShader} from '@vgpu/wgsl/prepare';
const gpu=await init();
const failures=[];gpu.onError(e=>failures.push(String(e)));
try {
 const output=target(gpu,{size:[900,500]});
 const program=effect(gpu,prepareShader(await fs.readFile('src/lib/bridge.wgsl','utf8')),{set:{params:{resolution:[900,500],yaw:-.48,pitch:.27,distance:13.5}}});
 const started=performance.now();await program.compile(output);const compiled=performance.now();
 program.draw(output);const pixels=await output.color.read({mipLevel:0,region:'all'});
 const presented=performance.now();
 program.draw(output);const repeat=await output.color.read({mipLevel:0,region:'all'});
 assert.deepEqual(pixels,repeat,'The same camera should give identical pixels.');
 await fs.mkdir('work',{recursive:true});await sharp(Buffer.from(pixels),{raw:{width:900,height:500,channels:4}}).png().toFile('work/bridge.png');
 program.set({params:{yaw:0,pitch:.12}});program.draw(output);const front=await output.color.read({mipLevel:0,region:'all'});
 let different=0;for(let i=0;i<front.length;i+=4)if(Math.abs(front[i]-pixels[i])>8)different++;
 assert(different>30000,'Changing the camera must change the bridge view.');
 assert.equal(failures.length,0,failures.join('\n'));
 console.log(JSON.stringify({compileMs:Math.round(compiled-started),firstDrawAndReadMs:Math.round(presented-compiled),changedPixels:different,deterministic:true,errors:failures}));
} finally {gpu.dispose();}
