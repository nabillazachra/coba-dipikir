import {mkdirSync,writeFileSync} from 'node:fs';
import {dirname} from 'node:path';
const SR=44100,TAU=Math.PI*2,ROOT='public/audio/004-lift-close/sfx';
let seed=4040434;
const noise=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/0xffffffff*2-1};
const sin=(f,t)=>Math.sin(TAU*f*t),env=(t,k)=>Math.exp(-k*Math.max(0,t));
const chirp=(a,b,t,d)=>Math.sin(TAU*(a*t+(b-a)*t*t/(2*d)));
function wav(name,len,fn){
 const n=Math.round(len*SR),data=Buffer.alloc(n*2),head=Buffer.alloc(44);
 for(let i=0;i<n;i++){
  let s=fn(i/SR,i);s=Math.min(1,Math.max(-1,s));
  data.writeInt16LE(Math.round(s*32767),i*2);
 }
 head.write('RIFF',0);head.writeUInt32LE(36+data.length,4);
 head.write('WAVE',8);head.write('fmt ',12);head.writeUInt32LE(16,16);
 head.writeUInt16LE(1,20);head.writeUInt16LE(1,22);
 head.writeUInt32LE(SR,24);head.writeUInt32LE(SR*2,28);
 head.writeUInt16LE(2,32);head.writeUInt16LE(16,34);
 head.write('data',36);head.writeUInt32LE(data.length,40);
 const path=ROOT+'/'+name+'.wav';mkdirSync(dirname(path),{recursive:true});
 writeFileSync(path,Buffer.concat([head,data]));
 console.log('WAV',name,len.toFixed(2));
}
const notes=(seq,t)=>seq.reduce((sum,[at,f,g])=>{
 const q=t-at;return q<0?sum:sum+(sin(f,q)+.27*sin(f*2,q))*env(q,10)*g;
},0);
wav('elevator-ding',1.34,t=>(sin(784,t)+.28*sin(1176,t)+.14*sin(1568,t))*env(t,3.2)*.32);
wav('floor-beep',.26,t=>sin(880,t)*env(t,13)*.24);
wav('footstep',.48,t=>noise()*env(t,26)*.21+chirp(94,55,t,.48)*env(t,14)*.16);
wav('hum',2.6,t=>(sin(75,t)+.16*sin(150,t)+.05*noise())*
 Math.min(1,t/.25,(2.6-t)/.31)*.20);
wav('tick',.17,t=>noise()*env(t,87)*.24+sin(510,t)*env(t,33)*.12);
wav('wait-jingle',1.52,t=>notes([[0,440,.17],[.27,523,.13],[.52,587,.14],[.8,523,.12],[1.07,440,.11]],t));
wav('magic',.84,t=>notes([[0,784,.15],[.12,988,.16],[.27,1174,.13],[.41,1568,.12]],t));
wav('whoosh',.51,t=>noise()*Math.sin(Math.PI*t/.51)**2*.15+chirp(370,810,t,.51)*env(t,7)*.09);
wav('click-wood',.24,t=>chirp(360,145,t,.24)*env(t,29)*.32+noise()*env(t,95)*.14);
wav('click-rubber',.26,t=>chirp(210,118,t,.26)*env(t,22)*.29+noise()*env(t,76)*.08);
wav('click-tiny',.15,t=>chirp(950,530,t,.15)*env(t,31)*.28);
wav('click-heavy',.51,t=>chirp(260,75,t,.51)*env(t,10)*.42+noise()*env(t,85)*.1);
wav('comedy-drum',.73,t=>notes([[0,205,.14],[.14,175,.17],[.32,110,.26]],t)+noise()*env(t,22)*.035);
wav('door-slide',1.83,t=>noise()*Math.sin(Math.PI*t/1.83)**2*.17+
 chirp(165,110,t,1.83)*Math.sin(Math.PI*t/1.83)**2*.11);
wav('record-stop',.52,t=>chirp(680,95,t,.52)*Math.sin(Math.PI*t/.52)**2*.26+
 noise()*env(t,12)*.04);
wav('rewind',.69,t=>chirp(890,250,t,.69)*Math.sin(Math.PI*t/.69)**2*.26);
wav('comic-huh',.62,t=>chirp(170,350,t,.62)*env(t,5)*.2+sin(740,t)*env(t,12)*.08);
wav('signal',.52,t=>chirp(430,990,t,.52)*env(t,7)*.19);
wav('bonk',.31,t=>chirp(164,65,t,.31)*env(t,13)*.47);
wav('sensor-beep',.54,t=>notes([[0,760,.17],[.19,590,.15]],t));
wav('gears',.62,t=>sin(98+Math.sin(TAU*10*t)*13,t)*env(t,6)*.18+noise()*env(t,8)*.07);
wav('comic-bonk',.38,t=>chirp(220,90,t,.38)*env(t,14)*.31);
wav('machine',2.23,t=>{
 const start=Math.min(1,t/.30),tail=Math.min(1,(2.23-t)/.25);
 return (sin(80+29*t,t)+.32*sin(165,t)+.17*sin(330,t)+noise()*.24)*start*tail*.18;
});
wav('rubber',1.18,t=>chirp(195,490,t,1.18)*Math.sin(Math.PI*t/1.18)**2*.21);
const D=81.3,N=Math.ceil(D*SR),score=new Float32Array(N);
const add=(at,d,fn,vol)=>{const beg=Math.round(at*SR),len=Math.round(d*SR);
 for(let i=0;i<len&&i+beg<N;i++)if(i+beg>=0)score[i+beg]+=fn(i/SR)*vol;};
const pizz=(at,f,g=.08)=>add(at,.43,t=>(sin(f,t)+.20*sin(f*2,t)+.08*sin(f*3,t))*env(t,13),g);
const bell=(at,f,g=.05)=>add(at,.63,t=>(sin(f,t)+.36*sin(f*1.5,t))*env(t,8),g);
const wood=(at,g=.025)=>add(at,.15,t=>noise()*env(t,80),g);
const pad=(at,d,f,g=.02)=>add(at,d,t=>{
 const fade=Math.max(0,Math.min(1,t/.3,(d-t)/.48));
 return (sin(f,t)+.12*sin(f*2,t))*fade;
},g);
const motif=[392,494,440,330,523,440,392,330,294,392,440,494];
for(let t=.5,i=0;t<D-2;t+=.64,i++){
 if((t>10.9&&t<12.75)||(t>18.4&&t<21.8)||(t>67.0&&t<69.4)||(t>76.5&&t<79.5))continue;
 pizz(t,motif[i%motif.length],.065+(i%4===0?.02:0));
 if(i%3===1)wood(t+.31,.024);
 if(i%7===0)bell(t+.24,[659,784,880,587][i%4],.045);
}
pad(0,4.3,110,.015);pad(35,10,98,.015);pad(52,11,115,.014);
[5.85,6.47,20.02,20.48,20.94,40.17,40.8,41.43,75.47,76.14].forEach((t,i)=>pizz(t,[523,587,523,440,392,494][i%6],.047));
for(let i=0;i<N;i++){
 const t=i/SR;
 const silence=(t>11&&t<12.6)||(t>18.3&&t<21.75)||(t>66.8&&t<69.2)||(t>76.5&&t<79.3);
 const fade=Math.max(0,Math.min(1,t/.35,(D-t)/.6));
 score[i]*=silence?.08:fade;
}
wav('score',D,(_,i)=>score[i]);
