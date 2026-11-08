import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname} from 'node:path';

// Original, reproducible SFX for E002. No meme samples or external audio.
const SR=44100, ROOT='public/audio/002-kulkas/sfx', PI=Math.PI, TAU=PI*2;
let seed=20261108;
const noise=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/0xffffffff*2-1;};
const osc=(f,t)=>Math.sin(TAU*f*t);
const slide=(a,b,t,d)=>Math.sin(TAU*(a*t+(b-a)*t*t/(2*d)));
const decay=(t,s)=>Math.exp(-t*s);
const edge=(t,d)=>Math.max(0,Math.min(1,t/.08,(d-t)/.1));
const write=(name,duration,sample)=>{
 const n=Math.floor(SR*duration),pcm=Buffer.alloc(n*2),h=Buffer.alloc(44);
 for(let i=0;i<n;i++){
  const v=Math.max(-1,Math.min(1,sample(i/SR,i)));
  pcm.writeInt16LE(Math.round(v*32767),i*2);
 }
 h.write('RIFF',0);h.writeUInt32LE(36+pcm.length,4);h.write('WAVE',8);
 h.write('fmt ',12);h.writeUInt32LE(16,16);h.writeUInt16LE(1,20);
 h.writeUInt16LE(1,22);h.writeUInt32LE(SR,24);h.writeUInt32LE(SR*2,28);
 h.writeUInt16LE(2,32);h.writeUInt16LE(16,34);h.write('data',36);h.writeUInt32LE(pcm.length,40);
 const out=ROOT+'/'+name+'.wav';mkdirSync(dirname(out),{recursive:true});
 writeFileSync(out,Buffer.concat([h,pcm]));console.log(name,duration);
};

write('sneaky-step',.2,t=>slide(138,86,t,.2)*decay(t,33)*.5+noise()*decay(t,65)*.14);
write('eyebrow-squeak',.33,t=>slide(410,800,t,.33)*decay(t,8)*.34);
write('side-eye',.28,t=>slide(720,340,t,.28)*decay(t,14)*.39);
write('sneaky-pluck',.4,t=>(osc(333,t)+.3*osc(666,t))*decay(t,12)*.28);
write('cartoon-blip',.3,t=>slide(360,850,t,.3)*decay(t,13)*.46);
write('squish-pop',.35,t=>(slide(205,465,t,.35)+.24*slide(410,930,t,.35))*decay(t,13)*.39);
write('rubber-boing',.52,t=>{
 const freq=210+260*decay(t,11)+48*Math.sin(TAU*12*t)*decay(t,5);
 return osc(freq,t)*decay(t,6.5)*.47;
});
write('soft-bonk',.42,t=>slide(172,68,t,.42)*decay(t,12)*.58+noise()*decay(t,80)*.09);
write('fridge-latch',.26,t=>{
 const d=t>.083?t-.083:0;
 return noise()*decay(t,78)*.52+(t>.083?noise()*decay(d,63)*.34:0)
  +slide(145,82,t,.26)*decay(t,22)*.28;
});
write('door-creak',1.15,t=>{
 const swell=Math.sin(PI*t/1.15)**2;
 return slide(212,97,t,1.15)*swell*.22+osc(123+9*Math.sin(18*t),t)*swell*.07+noise()*swell*.019;
});
write('fridge-hum',5.1,t=>Math.max(0,Math.min(1,t/.2,(5.1-t)/.3))*
 (osc(56,t)*.079+osc(112,t)*.025+noise()*.004));
write('light-shimmer',1.05,t=>[0,.12,.29,.46].reduce((a,on,i)=>{
 const d=t-on;return a+(d>=0?osc([740,990,1175,1480][i],d)*decay(d,10)*.14:0);
},0));
write('mystery-dun',.95,t=>[0,.2,.43].reduce((a,on,i)=>{
 const d=t-on;return a+(d>=0?(osc([392,330,247][i],d)+.25*osc([784,660,494][i],d))*decay(d,14)*.27:0);
},0));
write('detective-zoom',.63,t=>slide(280,850,t,.63)*Math.sin(PI*t/.63)*.27+noise()*decay(t,47)*.09);
write('suspense-hit',.69,t=>slide(110,54,t,.69)*decay(t,8)*.45+noise()*decay(t,115)*.25);
write('record-scratch',.59,t=>{
 const e=Math.sin(PI*t/.59)**2;
 return noise()*e*(.2+.11*Math.sin(TAU*29*t))+slide(660,160,t,.59)*e*.23;
});
write('tiny-cricket',.49,t=>(t%.13<.07?1:0)*(osc(3100,t)*.12+osc(3540,t)*.04)*decay(t,2));
write('clock-skip',.94,t=>{
 const clicks=[.02,.2,.41,.65].reduce((a,on)=>{
  const d=t-on;return a+(d>=0?noise()*decay(d,95)*.26:0);
 },0);
 return clicks+slide(215,1050,t,.94)*Math.sin(PI*t/.94)*.23;
});
write('bubble-pop',.29,t=>slide(285,655,t,.29)*decay(t,16)*.42+noise()*decay(t,64)*.06);
write('idea-chime',.92,t=>[0,.12,.28].reduce((a,on,i)=>{
 const d=t-on;return a+(d>=0?(osc([587,784,1175][i],d)+.18*osc([1174,1568,2350][i],d))*decay(d,7.5)*.15:0);
},0));
write('blink-tick',.17,t=>slide(980,470,t,.17)*decay(t,28)*.34);
write('loop-zip',.31,t=>slide(360,760,t,.31)*decay(t,14)*.4+noise()*decay(t,72)*.06);
write('little-fail',.84,t=>osc(405-270*Math.min(1,t/.75),t)*decay(t,4.5)*.31+
 slide(135,55,t,.84)*decay(t,7.4)*.3);

// Distinct act-based musical score: pizzicato, offbeats, intentional dead-air.
// In contrast to the old one-beat-per-second bed, notes follow story accents.
const D=53,n=Math.round(D*SR),score=new Float32Array(n);
const add=(at,d,fn,gain=1)=>{
 const start=Math.round(at*SR),len=Math.round(d*SR);
 for(let i=0;i<len&&start+i<n;i++){
  if(start+i>=0)score[start+i]+=fn(i/SR)*gain;
 }
};
const pizz=(at,f,g=.1)=>add(at,.32,t=>(osc(f,t)+.23*osc(f*2,t)+.09*osc(f*3,t))*decay(t,15),g);
const wood=(at,g=.065)=>add(at,.16,t=>slide(143,72,t,.16)*decay(t,38)+noise()*decay(t,73)*.15,g);
const pad=(at,d,f,g=.023)=>add(at,d,t=>{
 const e=Math.max(0,Math.min(1,t/.35,(d-t)/.42));
 return (osc(f,t)+.14*osc(2*f,t))*e;
},g);
pad(0,7.8,110,.025);
[.52,1.42,2.4,3.2].forEach((t,i)=>pizz(t,[330,392,294,330][i],.062));
[4.1,4.8,5.7,6.75,7.35].forEach((t,i)=>pizz(t,[330,370,294,440,392][i],.10));
pad(8,9.4,130,.019);
[8.35,9.7,11.1,12.4,13.5,14.35,16.9].forEach((t,i)=>pizz(t,[262,330,392,330,294,247,262][i],.085));
[10.3,12.75,17.2].forEach(t=>wood(t,.05));
pizz(18.1,196,.05);pizz(19.85,164,.04);
[21.25,21.75,22.12,22.47,22.82,23.14,23.45,23.78].forEach((t,i)=>
 pizz(t,[294,330,392,440,392,330,294,330][i],.095));
wood(24,.05);
// 25-29 seconds: fridge hum and awkward cricket only.
[29.12,29.75,30.62,31.45,32.48,33.2,34.35,35.3,36.3,37.2,
 38.05,38.77,39.6,40.46,41.3].forEach((t,i)=>{
 if(i%3!==1)pizz(t,[392,440,330,494,392][i%5],.10);
});
pad(34,7.5,164,.02);
[42.15,43.23,44.62,45.9,46.43].forEach((t,i)=>{
 wood(t,i===1?.08:.062);pizz(t+.13,[294,392,494,330,262][i],.085);
});
pizz(47.25,294,.051);pizz(49.72,247,.045);pizz(51.15,220,.04);
for(let i=0;i<n;i++){
 const t=i/SR;
 const duck=t>=15.1&&t<16.5?.23:t>=17.8&&t<21?.34:
  t>=24.95&&t<29?0:t>=48.65&&t<49.55?0:t>=51.8?.13:1;
 const fade=Math.max(0,Math.min(1,t/.35,(D-t)/.6));
 score[i]*=duck*fade;
}
write('comedy-bed',D,(_,i)=>score[i]);
