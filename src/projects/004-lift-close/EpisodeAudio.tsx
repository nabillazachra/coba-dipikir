import React from 'react';
import {Audio} from '@remotion/media';
import {useVideoConfig} from 'remotion';
import {publicAsset} from '../../brand/publicAsset';
import {phrasePlan} from './timeline';
import manifest from './voice-durations.generated.json';
const durations:Record<string,number>=manifest.durations;
const starts:Record<string,number>=('starts' in manifest?manifest.starts:{}) as Record<string,number>;
const sfx=(name:string)=>publicAsset('audio/004-lift-close/sfx/'+name+'.wav');
const voice=(id:string)=>publicAsset('audio/004-lift-close/voiceover/'+id+'.mp3');
type Cue={id:string;file:string;at:number;volume:number;rate?:number};
// Escalation: distinct click pitches/velocities, machine gag and deliberate silence.
const cues:Cue[]=[
 {id:'entry-ding',file:'elevator-ding',at:.1,volume:.23},
 {id:'walk-in',file:'footstep',at:1.25,volume:.2},
 {id:'floor-12',file:'floor-beep',at:2.63,volume:.17},
 {id:'hum',file:'hum',at:3.3,volume:.16},
 {id:'wait-tick',file:'tick',at:4.10,volume:.12},
 {id:'wait-tick2',file:'tick',at:5.32,volume:.12},
 {id:'awkward-music',file:'wait-jingle',at:6.43,volume:.15},
 {id:'discovery',file:'magic',at:8.19,volume:.23},
 {id:'finger-approaches',file:'whoosh',at:9.52,volume:.12},
 {id:'first-click',file:'click-wood',at:11.05,volume:.22},
 {id:'first-delay',file:'hum',at:11.65,volume:.12},
 {id:'second-click',file:'click-rubber',at:13.15,volume:.19},
 {id:'third-click',file:'click-wood',at:13.97,volume:.18,rate:1.13},
 {id:'fourth-click',file:'click-tiny',at:14.50,volume:.23},
 {id:'fifth-click',file:'click-wood',at:14.91,volume:.21,rate:1.23},
 {id:'sixth-click',file:'click-rubber',at:15.26,volume:.20,rate:1.13},
 {id:'seventh-click',file:'click-tiny',at:15.58,volume:.22,rate:1.22},
 {id:'eighth-click',file:'click-heavy',at:16.05,volume:.28},
 {id:'spam-drum',file:'comedy-drum',at:16.31,volume:.18},
 {id:'deadpan',file:'wait-jingle',at:19.80,volume:.17},
 {id:'door-glides',file:'door-slide',at:22.28,volume:.21},
 {id:'satisfied-ding',file:'elevator-ding',at:22.80,volume:.15,rate:1.18},
 {id:'record-stop',file:'record-stop',at:23.34,volume:.21},
 {id:'rewind',file:'rewind',at:24.32,volume:.22},
 {id:'doubtful',file:'comic-huh',at:26.54,volume:.19},
 {id:'one-click',file:'click-wood',at:28.90,volume:.23},
 {id:'signal',file:'signal',at:29.48,volume:.16},
 {id:'block-second',file:'bonk',at:31.28,volume:.15},
 {id:'timer-tick',file:'tick',at:33.14,volume:.13},
 {id:'sensor',file:'sensor-beep',at:35.34,volume:.20},
 {id:'setting',file:'gears',at:36.66,volume:.12},
 {id:'door-wait',file:'wait-jingle',at:38.9,volume:.1},
 {id:'timer-going',file:'tick',at:40.85,volume:.12},
 {id:'arrival-soft',file:'elevator-ding',at:42.3,volume:.14,rate:.93},
 {id:'attempt-close',file:'door-slide',at:44.62,volume:.16},
 {id:'sensor-breach',file:'sensor-beep',at:46.52,volume:.24},
 {id:'door-reopen',file:'door-slide',at:47.05,volume:.21,rate:.84},
 {id:'shocked',file:'comic-huh',at:48.12,volume:.22},
 {id:'model-a',file:'click-tiny',at:52.1,volume:.17},
 {id:'model-b',file:'click-rubber',at:53.44,volume:.15},
 {id:'model-c',file:'click-wood',at:54.89,volume:.17},
 {id:'patience-meter',file:'comic-bonk',at:58.4,volume:.17},
 {id:'aha-control',file:'magic',at:62.65,volume:.2},
 {id:'control-button',file:'click-wood',at:64.9,volume:.18},
 {id:'massive-machine',file:'machine',at:66.72,volume:.27},
 {id:'abrupt-reality',file:'record-stop',at:68.76,volume:.19},
 {id:'tiny-reality',file:'click-tiny',at:69.02,volume:.16},
 {id:'last-attempt',file:'click-wood',at:72.76,volume:.17},
 {id:'finger-tension',file:'rubber',at:75.40,volume:.16},
 {id:'final-click1',file:'click-wood',at:77.65,volume:.18},
 {id:'final-click2',file:'click-tiny',at:77.88,volume:.20},
 {id:'final-click3',file:'click-rubber',at:78.1,volume:.22},
 {id:'final-click4',file:'click-heavy',at:78.34,volume:.20},
 {id:'signoff',file:'elevator-ding',at:79.64,volume:.17},
 {id:'offscreen-click',file:'click-tiny',at:80.42,volume:.17},
];
export const Episode4Audio:React.FC=()=>{
 const {fps}=useVideoConfig();
 return <>
   <Audio name="E004 original quirky waiting-score" src={sfx('score')} volume={.27} premountFor={fps}/>
   {phrasePlan.map(p=><Audio key={p.id} name={'VO '+p.id} src={voice(p.id)}
     from={Math.round((starts[p.id]??p.at)*fps)}
     durationInFrames={Math.ceil((durations[p.id]??1.5)*fps)}
     volume={.99} premountFor={fps}/>)}
   {cues.map(c=><Audio key={c.id} name={'SFX '+c.id} src={sfx(c.file)}
     from={Math.round(c.at*fps)} playbackRate={c.rate??1} volume={c.volume}
     premountFor={fps}/>)}
 </>;
};
