import {mkdirSync,writeFileSync} from 'node:fs';
import {dirname} from 'node:path';
const SR=32000,TAU=2*Math.PI,ROOT='public/audio/005-perjalanan-pulang/sfx';
let seed=5050505;
const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/0xffffffff*2-1;};
const sin=(f,t)=>Math.sin(TAU*f*t);
const env=(t,s)=>Math.exp(-s*Math.max(0,t));
const chirp=(a,b,t,d)=>Math.sin(TAU*(a*t+(b-a)*t*t/(2*d)));
function wav(name,d,fn){
 const n=Math.round(SR*d),data=Buffer.allocUnsafe(n*2),hdr=Buffer.alloc(44);
 for(let i=0;i<n;i++){const v=Math.max(-1,Math.min(1,fn(i/SR,i)));
   data.writeInt16LE(Math.round(v*32767),i*2);}
 hdr.write('RIFF',0);hdr.writeUInt32LE(36+data.length,4);
 hdr.write('WAVEfmt ',8);hdr.writeUInt32LE(16,16);hdr.writeUInt16LE(1,20);
 hdr.writeUInt16LE(1,22);hdr.writeUInt32LE(SR,24);
 hdr.writeUInt32LE(SR*2,28);hdr.writeUInt16LE(2,32);
 hdr.writeUInt16LE(16,34);hdr.write('data',36);hdr.writeUInt32LE(data.length,40);
 const path=ROOT+'/'+name+'.wav';mkdirSync(dirname(path),{recursive:true});
 writeFileSync(path,Buffer.concat([hdr,data]));console.log('E005 SFX',name,d);
}
wav('tick',.15,t=>rand()*env(t,105)*.20+sin(860,t)*env(t,38)*.13);
wav('tap',.24,t=>rand()*env(t,55)*.17+sin(115,t)*env(t,16)*.17);
wav('pop',.4,t=>chirp(285,570,t,.4)*env(t,15)*.24);
wav('click',.27,t=>chirp(800,290,t,.27)*env(t,21)*.29+rand()*env(t,61)*.1);
wav('map',.55,t=>chirp(440,950,t,.55)*Math.sin(Math.PI*t/.55)**2*.18);
wav('pole',.31,t=>rand()*Math.sin(Math.PI*t/.31)**2*.22+chirp(600,210,t,.31)*env(t,12)*.13);
wav('vehicle',3.4,t=>(sin(66,t)+.35*sin(126,t)+rand()*.19)*Math.min(1,t/.23,(3.4-t)/.3)*.18);
wav('travel',2.9,t=>(sin(95+7*t,t)+rand()*.25)*Math.min(1,t/.29,(2.9-t)/.4)*.21);
wav('swipe',.64,t=>rand()*Math.sin(Math.PI*t/.64)**2*.2+chirp(320,900,t,.64)*env(t,5)*.15);
wav('ding',1.3,t=>(sin(785,t)+.31*sin(1177,t)+.14*sin(1568,t))*env(t,3.4)*.31);
wav('waiting',1.24,t=>[420,490,444].reduce((v,f,i)=>v+(t>.23*i?sin(f,t-.23*i)*env(t-.23*i,9)*.13:0),0));
wav('zip',1.48,t=>rand()*Math.sin(Math.PI*t/1.48)**2*.22+chirp(180,1050,t,1.48)*Math.sin(Math.PI*t/1.48)**2*.19);
wav('warp',1.83,t=>chirp(130,720,t,1.83)*Math.sin(Math.PI*t/1.83)**2*.32+rand()*Math.sin(Math.PI*t/1.83)**2*.13);
wav('snip',.4,t=>rand()*env(t,43)*.18+chirp(600,180,t,.4)*env(t,12)*.22);
wav('bonk',.85,t=>chirp(190,59,t,.85)*env(t,8)*.5);
wav('stretch',1.54,t=>chirp(170,420,t,1.54)*Math.sin(Math.PI*t/1.54)**2*.23+sin(87,t)*Math.sin(Math.PI*t/1.54)**2*.18);
const N=60*SR,score=new Float32Array(N);
function add(at,d,fn,vol){
 const beg=Math.round(at*SR),num=Math.round(d*SR);
 for(let i=0;i<num&&i+beg<N;i++)if(beg+i>=0)score[beg+i]+=fn(i/SR)*vol;
}
const melody=[392,440,523,392,330,440,494,392,349,392,523,440];
for(let t=.65,i=0;t<58.9;i++){
 const incoming=t<19;
 const beat=incoming?1.12:t<29.6?.69:t<40?.92:.74;
 if(!((t>3.45&&t<6)||(t>24.7&&t<28.5)||(t>56.4&&t<58.5))){
  const note=melody[i%melody.length];const level=incoming?.048:.069;
  add(t,.50,q=>(sin(note,q)+sin(note*2,q)*.22)*env(q,10),level);
  if(!incoming&&i%2===0)add(t+.33,.13,q=>rand()*env(q,75),.020);
 }
 t+=beat;i++;
}
for(const [at,d,f] of [[0,9,110],[19,10,147],[30,11,123],[45,10,131]])
 add(at,d,t=>(sin(f,t)+.14*sin(f*1.5,t))*Math.min(1,t/.3,(d-t)/.8),.014);
for(let i=0;i<N;i++){
 const t=i/SR;const fade=Math.max(0,Math.min(1,t/.45,(60-t)/.58));
 score[i]*=fade;
}
wav('score',60,(_,i)=>score[i]);
