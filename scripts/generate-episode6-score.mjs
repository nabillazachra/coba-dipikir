import {mkdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

// Original harmonic score. This file never imports a commercial song or sample.
// Local time t=0 corresponds to GLOBAL film 7.00s, following the approved
// acting proof's own original motif. Exactly 60s, PCM mono, 12000 Hz.
const RATE = 12000;
const LENGTH = 60;
const NUM = RATE * LENGTH;
const pcm = Buffer.alloc(44 + NUM * 2);
pcm.write('RIFF',0);
pcm.writeUInt32LE(36 + NUM*2,4);
pcm.write('WAVEfmt ',8);
pcm.writeUInt32LE(16,16); pcm.writeUInt16LE(1,20);
pcm.writeUInt16LE(1,22); pcm.writeUInt32LE(RATE,24);
pcm.writeUInt32LE(RATE*2,28); pcm.writeUInt16LE(2,32);
pcm.writeUInt16LE(16,34); pcm.write('data',36);
pcm.writeUInt32LE(NUM*2,40);

const notes = [
  [0.15, 392, 2.4, .67], [0.55,466.16,2.0,.70],
  [1.03,349.23,2.3,.63], [1.70,523.25,3.8,.64],
  [8.5, 392,2.1,.55],[8.9,466.16,2.1,.49],
  [9.4,349.23,2.2,.46],[10.0,523.25,2.9,.44],
  [18.9,392,1.6,.38],[19.3,466.16,1.6,.37],
  [24.3,349.23,1.6,.37],[24.7,523.25,2.0,.34],
  [31.0,392,2.0,.48],[31.4,466.16,2.0,.41],
  [31.9,349.23,2.2,.39],[32.5,523.25,2.5,.37],
  [42.0,392,1.2,.46],[42.3,466.16,1.3,.46],
  [42.7,349.23,1.4,.42],[43.1,523.25,2.0,.45],
  [47.2,392,2.4,.60],[47.6,466.16,2.4,.61],
  [48.0,349.23,2.5,.59],[48.6,523.25,4.1,.64],
  [54.5,392,1.3,.24],[54.9,466.16,1.4,.28],
];
const TAU = Math.PI*2;
const smooth = (a,b,t)=>{
  const p=Math.max(0,Math.min(1,(t-a)/(b-a)));
  return p*p*(3-2*p);
};
const pulse=(t,start,width)=>smooth(start,start+.09,t)*(1-smooth(start+width,start+width+.16,t));
for(let i=0;i<NUM;i++){
  const t=i/RATE;
  const global=t+7;
  const bus = (smooth(0,1.2,t)*(1-smooth(11.4,12.2,t))) +
    (smooth(47,48,t)*(1-smooth(54,55,t)));
  const room=smooth(12,13,t)*(1-smooth(35,36,t));
  const emotional=smooth(45,48,t)*(1-smooth(54,56,t));
  // No synthetic broadband noise without seeding: deterministic, organic hum.
  let v=.016*Math.sin(TAU*51*t)+.011*Math.sin(TAU*78*t);
  v+=.014*bus*Math.sin(TAU*(73+.4*Math.sin(t*.8))*t);
  v+=.014*room*Math.sin(TAU*132*t);
  v+=.017*emotional*Math.sin(TAU*196*t);
  // The same short 4-note identity returns as harmonics, not a lyric track.
  for(const [start,freq,len,gain] of notes){
    const age=t-start;
    if(age<0||age>len)continue;
    const env=Math.min(1,age*11)*Math.exp(-age/(len*.5));
    v+=.085*gain*env*(
      Math.sin(TAU*freq*age)+.19*Math.sin(TAU*freq*2*age)
    );
  }
  // Room-muted score drops out during intentional failed-memory silence.
  const silence = 1-.92*smooth(35.15,36.2,t)*(1-smooth(41.4,42.1,t));
  v*=silence;
  // Musical whoosh follows real visual transformation into surprise memory.
  const w=pulse(t,42.0,1.10)+.5*pulse(t,54.8,.50);
  v+=.040*w*(Math.sin(TAU*(135+230*t)*t)+.2*Math.sin(TAU*(500+45*t)*t));
  // Comic button: dry record scratch/stop and one sharp tap.
  const cut=smooth(56.0,56.05,t)*(1-smooth(56.16,56.24,t));
  v+=.13*cut*Math.sin(TAU*(630-410*(t-56))*t);
  v+=.09*pulse(t,57.7,.07)*Math.sin(TAU*890*t);
  // Dynamics and soft clip to protect VO headroom.
  const master=.83 * (1-smooth(59.0,59.7,t));
  const sample=Math.tanh(v*master);
  pcm.writeInt16LE(Math.round(sample*32767),44+i*2);
}
const dir=join('public','audio','006-lagu-masa-lalu');
mkdirSync(dir,{recursive:true});
writeFileSync(join(dir,'score.wav'),pcm);
console.log('Generated original soundtrack:',join(dir,'score.wav'),pcm.length,'bytes');
