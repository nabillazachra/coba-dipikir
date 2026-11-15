import {mkdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

/**
 * Episode 006 original diegetic Foley, 69 seconds.
 * Deterministically synthesized; no licensed clips or external samples.
 * SFX are a light layer under the approved motif and 1.0x voice.
 */
const rate=16000,duration=69,n=rate*duration,tau=2*Math.PI;
const bytes=Buffer.alloc(44+n*2);
bytes.write('RIFF',0); bytes.writeUInt32LE(36+n*2,4);
bytes.write('WAVEfmt ',8); bytes.writeUInt32LE(16,16);
bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(1,22);
bytes.writeUInt32LE(rate,24);bytes.writeUInt32LE(rate*2,28);
bytes.writeUInt16LE(2,32);bytes.writeUInt16LE(16,34);
bytes.write('data',36);bytes.writeUInt32LE(n*2,40);

const events=[
  // t, length, gain, character
  [0.22, .52, .08, 'paper'],       // finish packing the book
  [3.08, .19, .20, 'click'],       // fingertip makes real speaker contact
  [3.27, 2.28, .055,'swirl'],      // original room-to-vehicle transformation
  [6.10, 1.0, .06, 'vehicle'],     // arriving inside the memory
  [11.30,.42,.06,'fabric'],        // earphone & scarf move
  [18.89,.68,.09,'swipe'],         // bus pole passes into current room
  [28.40,.82,.085,'drawer'],       // drawer pulls outward
  [34.20,.31,.07,'paper'],        // bus ticket lifted
  [42.35,.14,.17,'click'],        // tries the next song
  [45.91,.28,.05,'crickets'],     // a failed portal, awkward hold
  [47.72,.13,.13,'click'],        // next track
  [49.05,1.05,.095,'swirl'],      // surprising homework/noodles world
  [53.72,.20,.10,'plate'],        // absurd noodles punch
  [61.78,.16,.15,'click'],        // playlist button
  [64.66,.49,.13,'scratch'],      // embarrassing song
  [65.31,.16,.21,'click'],        // stop
  [67.48,.33,.055,'room'],        // tiny residual speaker hum in end-card
];
const ease=(a,b,t)=>{
  const k=Math.max(0,Math.min(1,(t-a)/(b-a)));
  return k*k*(3-2*k);
};
let seed=0x4a50f00d,low=0,peak=0,sumsq=0;
for(let i=0;i<n;i++){
  const t=i/rate;
  seed=(1664525*seed+1013904223)>>>0;
  const noise=seed/4294967296*2-1;
  low+=.062*(noise-low);
  const filtered=noise-low;
  let v=0;
  for(const [at,length,gain,type] of events){
    const dt=t-at;
    if(dt<0||dt>length)continue;
    const env=ease(0,Math.min(.04,length*.28),dt)*
      (1-ease(length*.56,length,dt));
    if(type==='click') v+=gain*env*(.72*Math.sin(tau*1320*dt)+.34*filtered);
    else if(type==='paper') v+=gain*env*(.53*filtered+.35*Math.sin(tau*132*dt));
    else if(type==='swirl')v+=gain*env*(.50*low+.36*Math.sin(tau*(140+330*dt)*dt));
    else if(type==='vehicle')v+=gain*env*(.77*Math.sin(tau*77*dt)+.29*low);
    else if(type==='fabric')v+=gain*env*(.9*filtered);
    else if(type==='swipe')v+=gain*env*(.50*filtered+.45*Math.sin(tau*(860-240*dt)*dt));
    else if(type==='drawer')v+=gain*env*(.60*filtered+.28*Math.sin(tau*220*dt));
    else if(type==='crickets')v+=gain*env*(Math.sin(tau*2500*dt)+.4*Math.sin(tau*2800*dt));
    else if(type==='plate')v+=gain*env*(Math.sin(tau*430*dt)+.3*Math.sin(tau*620*dt));
    else if(type==='scratch')v+=gain*env*(.62*filtered+.45*Math.sin(tau*(920-1500*dt)*dt));
    else if(type==='room')v+=gain*env*Math.sin(tau*110*dt);
  }
  // A nearly inaudible AC hum that subtly ducks as memory takes over.
  const room=(1-ease(3.08,5.7,t)) + ease(18.89,19.5,t)*(1-ease(49,49.3,t));
  v+=room*.004*Math.sin(tau*51*t);
  const out=Math.tanh(v*.78);
  peak=Math.max(peak,Math.abs(out));sumsq+=out*out;
  bytes.writeInt16LE(Math.round(out*32767),44+i*2);
}
const dir=join('public','audio','006-lagu-masa-lalu');
mkdirSync(dir,{recursive:true});
const file=join(dir,'foley.wav');
writeFileSync(file,bytes);
console.log('Original E006 diegetic Foley generated:',file,'events:',events.length,
 'duration:',duration,'peak:',peak.toFixed(5),'RMS:',Math.sqrt(sumsq/n).toFixed(5));
