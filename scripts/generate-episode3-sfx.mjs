import {mkdirSync,writeFileSync} from 'node:fs';
import {dirname} from 'node:path';

const SR=44100,TAU=Math.PI*2,ROOT='public/audio/003-harga-99000/sfx';
let seed=99000100;
const noise=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/0xffffffff*2-1};
const s=(f,t)=>Math.sin(TAU*f*t);
const gl=(a,b,t,d)=>Math.sin(TAU*(a*t+(b-a)*t*t/(2*d)));
const e=(t,k)=>Math.exp(-k*Math.max(0,t));
function wav(name,length,fn){
 const count=Math.round(length*SR),data=Buffer.alloc(count*2),header=Buffer.alloc(44);
 for(let i=0;i<count;i++){const value=Math.max(-1,Math.min(1,fn(i/SR,i)));data.writeInt16LE(Math.round(32767*value),i*2)}
 header.write('RIFF',0);header.writeUInt32LE(36+data.length,4);header.write('WAVE',8);
 header.write('fmt ',12);header.writeUInt32LE(16,16);header.writeUInt16LE(1,20);
 header.writeUInt16LE(1,22);header.writeUInt32LE(SR,24);header.writeUInt32LE(SR*2,28);
 header.writeUInt16LE(2,32);header.writeUInt16LE(16,34);
 header.write('data',36);header.writeUInt32LE(data.length,40);
 const file=ROOT+'/'+name+'.wav';
 mkdirSync(dirname(file),{recursive:true});
 writeFileSync(file,Buffer.concat([header,data]));
 console.log('Generated',name,length+'s');
}

wav('price-pop',.31,t=>gl(245,680,t,.31)*e(t,15)*.46+noise()*e(t,70)*.07);
wav('game-show',.82,t=>[0,.15,.31].reduce((v,b,i)=>t>=b?v+(s([587,740,988][i],t-b)+.22*s([1174,1480,1976][i],t-b))*e(t-b,14)*.19:v,0));
wav('small-swipe',.4,t=>gl(450,900,t,.4)*Math.sin(Math.PI*t/.4)*.27+noise()*e(t,44)*.09);
wav('boing',.65,t=>{
 const wobble=47*Math.sin(TAU*13*t)*e(t,4.9);
 return s(165+280*e(t,11)+wobble,t)*e(t,6)*.43;
});
wav('record-stop',.6,t=>{
 const a=Math.sin(Math.PI*t/.6)**2;
 return noise()*a*(.18+.09*Math.sin(TAU*22*t))+gl(640,190,t,.6)*a*.23;
});
wav('suspense',1.2,t=>[0,.27,.56].reduce((v,b,i)=>{
 const dt=t-b;return dt>=0?v+(s([392,330,247][i],dt)+.19*s([784,660,494][i],dt))*e(dt,8)*.19:v;
},0));
wav('tick',.14,t=>noise()*e(t,105)*.48+gl(740,370,t,.14)*e(t,42)*.14);
wav('tiny-pop',.2,t=>gl(250,550,t,.2)*e(t,19)*.45+noise()*e(t,84)*.08);
wav('blink',.16,t=>gl(860,470,t,.16)*e(t,23)*.24);
wav('elastic',1.8,t=>{
 const a=Math.sin(Math.PI*t/1.8)**2;
 return gl(220,600,t,1.8)*a*.16+
 s(140+22*Math.sin(TAU*7*t),t)*a*.13+noise()*a*.012;
});
wav('little-bonk',.48,t=>gl(183,75,t,.48)*e(t,13)*.55+noise()*e(t,86)*.07);
wav('scanner',.39,t=>gl(960,470,t,.39)*e(t,8)*.30+noise()*e(t,82)*.05);
wav('thought-bubble',.59,t=>gl(205,450,t,.59)*e(t,7)*.26+
 s(740,t)*e(t,17)*.11);
wav('stamp',.43,t=>gl(130,75,t,.43)*e(t,15)*.62+noise()*e(t,100)*.23);
wav('calculator',.15,t=>gl(560,270,t,.15)*e(t,28)*.3+noise()*e(t,89)*.09);
wav('cash',.93,t=>[0,.16,.32].reduce((v,b,i)=>{
 const dt=t-b;return dt>=0?v+(s([740,988,1480][i],dt)+.17*s([1480,1976,2960][i],dt))*e(dt,8.8)*.15:v;
},0));


// Cheery, deliberately distinct cartoon palette (deterministic synthesis).
wav('sunny-intro',.74,t=>[0,.13,.27,.40].reduce((v,b,i)=>t>=b?v+(s([523,659,784,1047][i],t-b)+.14*s([1046,1318,1568,2094][i],t-b))*e(t-b,11)*.19:v,0));
wav('bubble-pop',.27,t=>gl(185,745,t,.27)*e(t,17)*.38+noise()*e(t,82)*.035);
wav('wood-pluck',.34,t=>(s(370,t)+.24*s(740,t)+.08*s(1110,t))*e(t,18)*.38);
wav('airy-whoosh',.37,t=>noise()*Math.sin(Math.PI*t/.37)**2*.12+gl(300,820,t,.37)*Math.sin(Math.PI*t/.37)**2*.13);
wav('spring-boing',.59,t=>s(190+80*Math.sin(TAU*11*t)*e(t,5),t)*e(t,5)*.36);
wav('comedy-brake',.43,t=>gl(850,130,t,.43)*Math.sin(Math.PI*t/.43)**2*.32);
wav('marimba-step',.67,t=>[0,.18,.36].reduce((v,b,i)=>t>=b?v+(s([392,330,262][i],t-b)+.18*s([784,660,524][i],t-b))*e(t-b,18)*.17:v,0));
wav('soft-tick',.13,t=>noise()*e(t,90)*.19+s(540,t)*e(t,45)*.15);
wav('coin-ding',.81,t=>(s(988,t)+.48*s(1481,t)+.21*s(1976,t))*e(t,7)*.23);
wav('rubber-stretch',1.3,t=>gl(205,515,t,1.3)*Math.sin(Math.PI*t/1.3)**2*.18+s(130+20*Math.sin(TAU*8*t),t)*e(t,3)*.07);
wav('comic-bonk',.42,t=>gl(195,88,t,.42)*e(t,14)*.42+noise()*e(t,94)*.04);
wav('bright-plink',.54,t=>(s(784,t)+.34*s(1176,t)+.18*s(1568,t))*e(t,12)*.27);
wav('bubble-rise',.59,t=>gl(245,680,t,.59)*e(t,6)*.20+s(890,t)*e(t,18)*.09);
wav('aha-sparkle',.86,t=>[0,.12,.24,.36].reduce((v,b,i)=>t>=b?v+(s([659,784,988,1318][i],t-b)+.17*s([1318,1568,1976,2636][i],t-b))*e(t-b,10)*.17:v,0));
wav('success-chime',1.05,t=>[0,.20,.37].reduce((v,b,i)=>t>=b?v+(s([523,659,784][i],t-b)+.28*s([1046,1318,1568][i],t-b))*e(t-b,6)*.21:v,0));

// Cheerful bouncing pizzicato: varied phrases and occasional comedic silence.
const D=62,count=D*SR,score=new Float32Array(count);
const add=(at,d,fn,level)=>{
 const start=Math.round(at*SR),len=Math.round(d*SR);
 for(let i=0;i<len&&start+i<count;i++){
  if(start+i>=0)score[start+i]+=fn(i/SR)*level;
 }
};
const pizz=(at,f,g=.09)=>add(at,.43,t=>(s(f,t)+.23*s(f*2,t)+.12*s(f*3,t))*e(t,13),g);
const bell=(at,f,g=.06)=>add(at,.62,t=>(s(f,t)+.4*s(f*1.5,t)+.14*s(f*2,t))*e(t,10),g);
const shaker=(at,g=.022)=>add(at,.10,t=>noise()*e(t,60),g);
const knock=(at,g=.06)=>add(at,.14,t=>gl(165,77,t,.14)*e(t,36)+noise()*e(t,83)*.08,g);
const pad=(at,d,f,g=.022)=>add(at,d,t=>{
 const edge=Math.max(0,Math.min(1,t/.42,(d-t)/.48));
 return (s(f,t)+.18*s(f*2,t))*edge;
},g);
pad(0,8.1,115,.018);
[.48,1.65,2.78,3.39,4.42,5.02,6.48,7.35].forEach((t,i)=>
 pizz(t,[392,440,494,392,330,440,370,330][i],.087));
[8.6,9.5,10.15].forEach((t,i)=>pizz(t,[294,247,196][i],.068));
pad(8.5,5.1,98,.02);
// Gap after the Rp1.000 reveal, to let the deadpan land.
[13.85,14.62,15.49,16.7,17.8,18.55,19.6,20.8,22.0,23.7].forEach((t,i)=>
 pizz(t,[330,392,440,330,294,392][i%6],.074));
pad(24,11,110,.02);
[24.2,25.4,26.8,28.1,29.55,31.58,32.55,33.45].forEach((t,i)=>
 pizz(t,[392,330,494,392,294,440,392,330][i],.085));
[35.75,36.48,37.14,37.89,38.7,39.54,40.4].forEach((t,i)=>
 pizz(t,[440,494,587,494,440,370,294][i],.12));
[40.38,42.1,42.43,42.77,44.02].forEach((t,i)=>knock(t,i===0?.085:.05));
pad(45.9,10.7,110,.017);
[46.02,47.2,48.55,49.7,51.45,52.65,54.15,55.55,57.45].forEach((t,i)=>
 pizz(t,[330,440,392,294,330,392,247][i%7],.077));
// Off-beat wooden percussion and a few bright bells lend forward motion.
[.91,2.19,3.92,5.85,6.81,14.18,15.85,17.31,19.24,20.47,22.76,25.12,26.3,29.0,31.04,33.03,34.2,36.05,37.42,39.14,42.14,43.05,44.53,46.72,48.1,50.52,52.3,53.2,56.31].forEach((t,i)=>shaker(t,i%3===0?.027:.018));
[1.85,6.06,17.25,24.68,33.05,37.63,43.85,50.06,56.64].forEach((t,i)=>bell(t,[784,659,587,784,988,659,784,587,523][i],.044));
pizz(58.46,523,.052);
pizz(60.54,740,.035);
for(let i=0;i<count;i++){
 const t=i/SR;
 let level=1;
 if(t>=11&&t<13.3)level=.10;
 if(t>=39.7&&t<41.1)level=.12;
 if(t>=57.4&&t<59.5)level=.20;
 if(t>=60.3)level=.16;
 const fade=Math.max(0,Math.min(1,t/.28,(62-t)/.45));
 score[i]*=level*fade;
}
wav('score',D,(_,i)=>score[i]);
