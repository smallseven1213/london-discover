struct Params { resolution: vec2f, yaw: f32, pitch: f32, distance: f32 }
@group(0) @binding(0) var<uniform> params: Params;

fn box(p: vec3f, b: vec3f) -> f32 {
  let q=abs(p)-b;
  return length(max(q,vec3f(0.)))+min(max(q.x,max(q.y,q.z)),0.);
}
fn cylinder(p:vec3f,r:f32,h:f32)->f32 {
  let d=vec2f(length(p.xz)-r,abs(p.y)-h);
  return min(max(d.x,d.y),0.)+length(max(d,vec2f(0.)));
}
fn roof(p:vec3f,w:f32,h:f32)->f32 {
  return max((max(abs(p.x),abs(p.z))+p.y*w/h-w)*.65,max(-p.y,p.y-h));
}
fn join(a:vec2f,d:f32,m:f32)->vec2f { return select(a,vec2f(d,m),d<a.x); }

fn scene(p:vec3f)->vec2f {
  var hit=vec2f(p.y+.14,0.);
  hit=join(hit,box(p-vec3f(0.,.58,0.),vec3f(5.1,.10,.48)),2.);
  hit=join(hit,box(p-vec3f(0.,.70,0.),vec3f(5.1,.025,.39)),3.);
  // Mirrored towers, with stone piers and an opening through the road level.
  let q=vec3f(abs(p.x)-1.85,p.y,p.z);
  hit=join(hit,box(q-vec3f(0.,.07,0.),vec3f(.70,.25,.73)),1.);
  var tower=box(q-vec3f(0.,1.65,0.),vec3f(.47,1.28,.49));
  let arch=max(length(q.yz-vec2f(.90,0.))-.29,-q.y+.92);
  let gate=min(box(q-vec3f(0.,.78,0.),vec3f(.60,.30,.29)),max(length(q.yz-vec2f(1.08,0.))-.29,abs(q.x)-.60));
  tower=max(tower,-gate);
  hit=join(hit,tower,1.);
  for(var i=0;i<3;i++) {
    let y=1.3+f32(i)*.58;
    hit=join(hit,box(q-vec3f(0.,y,0.),vec3f(.50,.045,.52)),1.);
  }
  hit=join(hit,roof(q-vec3f(0.,2.93,0.),.40,.68),4.);
  let turret=vec3f(abs(q.x)-.40,q.y,abs(q.z)-.42);
  hit=join(hit,cylinder(turret-vec3f(0.,2.58,0.),.125,.49),1.);
  hit=join(hit,roof(turret-vec3f(0.,3.07,0.),.16,.48),4.);
  // Dark inset windows on both river-facing facades.
  let win=vec3f(q.x, q.y-1.75-round((q.y-1.75)/.52)*.52, abs(q.z)-.496);
  if(p.y>1.45 && p.y<2.9 && abs(q.x)<.31) {
    hit=join(hit,box(win,vec3f(.10,.15,.012)),5.);
  }
  // The pair of upper pedestrian walkways.
  let z=abs(p.z)-.31;
  hit=join(hit,box(vec3f(p.x,p.y-2.43,z),vec3f(1.85,.035,.06)),2.);
  hit=join(hit,box(vec3f(p.x,p.y-2.70,z),vec3f(1.85,.035,.06)),2.);
  if(abs(p.x)<1.85) {
    let u=p.x-round(p.x/.28)*.28;
    hit=join(hit,box(vec3f(u,p.y-2.565,z),vec3f(.018,.135,.023)),1.);
    let diagonal=abs((p.y-2.565)-u*.8)*.7;
    hit=join(hit,max(max(diagonal-.013,abs(z)-.025),abs(p.y-2.565)-.135),1.);
  }
  // Outer suspension chains follow a parabola; vertical hangers meet the deck.
  let x=abs(p.x);
  if(x>1.82 && x<5.1) {
    let t=clamp((x-1.85)/3.25,0.,1.);
    let cy=.78+1.75*(1.-t)*(1.-t);
    let chain=(abs(p.y-cy)-.045)/1.5;
    hit=join(hit,max(chain,abs(abs(p.z)-.40)-.045),2.);
    let sx=1.85+round((x-1.85)/.27)*.27;
    let st=clamp((sx-1.85)/3.25,0.,1.);
    let sy=.78+1.75*(1.-st)*(1.-st);
    hit=join(hit,box(vec3f(x-sx,p.y-(sy+.72)*.5,abs(p.z)-.40),vec3f(.012,(sy-.72)*.5,.012)),1.);
  }
  // Road railings.
  hit=join(hit,box(vec3f(p.x,p.y-.85,abs(p.z)-.47),vec3f(5.1,.018,.018)),2.);
  return hit;
}
fn normal(p:vec3f)->vec3f {
  let e=vec2f(.003,0.);
  return normalize(vec3f(scene(p+e.xyy).x-scene(p-e.xyy).x,scene(p+e.yxy).x-scene(p-e.yxy).x,scene(p+e.yyx).x-scene(p-e.yyx).x));
}
@fragment fn fs_main(@location(0) uv:vec2f)->@location(0) vec4f {
  let xy=(uv*2.-1.)*vec2f(params.resolution.x/params.resolution.y,-1.);
  let focusPoint=vec3f(0.,1.1,0.);
  let eye=focusPoint+params.distance*vec3f(sin(params.yaw)*cos(params.pitch),sin(params.pitch),cos(params.yaw)*cos(params.pitch));
  let fw=normalize(focusPoint-eye);let rt=normalize(cross(fw,vec3f(0.,1.,0.)));let up=cross(rt,fw);
  let ray=normalize(fw*2.35+rt*xy.x+up*xy.y);
  var distance=0.;var material=0.;var found=false;
  for(var i=0;i<128;i++) {
    let d=scene(eye+ray*distance);
    if(d.x<.0025){material=d.y;found=true;break;}
    distance+=d.x*.85;
    if(distance>45.){break;}
  }
  var color=vec3f(.914,.894,.858);
  if(found) {
    let p=eye+ray*distance;let n=normal(p);let light=normalize(vec3f(-.5,.9,.7));
    var albedo=vec3f(.34,.46,.47);
    if(material>.5){albedo=vec3f(.76,.70,.58);}
    if(material>1.5){albedo=vec3f(.15,.40,.51);}
    if(material>2.5){albedo=vec3f(.35,.34,.31);}
    if(material>3.5){albedo=vec3f(.30,.34,.35);}
    if(material>4.5){albedo=vec3f(.13,.17,.18);}
    var shadow=1.;var travel=.04;
    for(var j=0;j<22;j++) {
      let d=scene(p+n*.02+light*travel).x;
      shadow=min(shadow,12.*d/travel);
      travel+=clamp(d,.03,.4);
      if(travel>6.){break;}
    }
    let diffuse=max(dot(n,light),0.);
    color=albedo*(.52+.48*diffuse*clamp(shadow,.15,1.));
    if(material<.5){
      let ripple=sin(p.x*13.+p.z*4.)*sin(p.z*11.)*.012;
      color+=vec3f(ripple);
      let fade=1.-exp(-max(distance-12.,0.)*.08);
      color=mix(color,vec3f(.914,.894,.858),fade);
    }
    color=pow(color,vec3f(.85));
  }
  return vec4f(color,1.);
}
