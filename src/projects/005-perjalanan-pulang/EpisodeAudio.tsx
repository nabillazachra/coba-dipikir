import React from 'react';
import {Audio} from '@remotion/media';
import {useVideoConfig} from 'remotion';
import {publicAsset} from '../../brand/publicAsset';
import {phrasePlan} from './timeline';
import manifest from './voice-durations.generated.json';
const m=manifest as {durations:Record<string,number>;starts?:Record<string,number>};
const sfx=(name:string)=>publicAsset('audio/005-perjalanan-pulang/sfx/'+name+'.wav');
const voice=(id:string)=>publicAsset('audio/005-perjalanan-pulang/voiceover/'+id+'.mp3');
type Cue={name:string;file:string;at:number;volume:number;speed?:number};
const cues:Cue[]=[
 {name:'arrival-hum',file:'vehicle',at:.1,volume:.11},
 {name:'window-pole',file:'pole',at:1.35,volume:.17},
 {name:'clock-check',file:'tick',at:3.5,volume:.22},
 {name:'clock-change',file:'tick',at:4.91,volume:.21},
 {name:'awkward-wait',file:'waiting',at:5.12,volume:.13},
 {name:'bus-whoosh',file:'travel',at:6.3,volume:.19},
 {name:'passing-pole-1',file:'pole',at:7.5,volume:.21},
 {name:'passing-pole-2',file:'pole',at:8.7,volume:.18,speed:1.1},
 {name:'passing-pole-3',file:'pole',at:9.8,volume:.23,speed:1.24},
 {name:'phone-pop',file:'pop',at:11.22,volume:.16},
 {name:'window-tap',file:'tap',at:12.13,volume:.13},
 {name:'map-click',file:'map',at:12.83,volume:.19},
 {name:'phone-click',file:'click',at:13.67,volume:.19},
 {name:'arrival-ding',file:'ding',at:14.65,volume:.25},
 {name:'time-swipe',file:'swipe',at:16.45,volume:.22},
 {name:'return-travel',file:'travel',at:19.3,volume:.17,speed:1.16},
 {name:'reverse-landmark',file:'pole',at:20.2,volume:.18,speed:1.25},
 {name:'reverse-landmark2',file:'pole',at:21.1,volume:.20,speed:1.33},
 {name:'return-comfort',file:'ding',at:22.6,volume:.11,speed:1.23},
 {name:'fold-start',file:'map',at:23.3,volume:.16},
 {name:'fold-zipper',file:'zip',at:25.05,volume:.30},
 {name:'fold-timewarp',file:'warp',at:26.7,volume:.31},
 {name:'fold-pop',file:'pop',at:28.9,volume:.18},
 {name:'two-routes',file:'map',at:29.72,volume:.16},
 {name:'science-note',file:'ding',at:31.05,volume:.16},
 {name:'scissors-snips',file:'snip',at:33.3,volume:.20},
 {name:'comedic-bonk',file:'bonk',at:34.47,volume:.25},
 {name:'road-stretch',file:'stretch',at:38.42,volume:.20},
 {name:'expectation-pop',file:'pop',at:40.55,volume:.15},
 {name:'route-alternate',file:'map',at:45.7,volume:.18},
 {name:'uncertainty',file:'warp',at:47.8,volume:.10},
 {name:'question-clear',file:'swipe',at:49.2,volume:.14},
 {name:'montage-1',file:'pole',at:50.55,volume:.18},
 {name:'montage-2',file:'travel',at:51.1,volume:.15},
 {name:'montage-3',file:'map',at:51.8,volume:.19},
 {name:'home-ding',file:'ding',at:55.27,volume:.22},
 {name:'memory-pop',file:'pop',at:56.96,volume:.29},
 {name:'road-re-stretch',file:'stretch',at:57.55,volume:.32},
 {name:'bass-drop',file:'bonk',at:58.16,volume:.38},
 {name:'footstep-1',file:'tap',at:59.01,volume:.13},
 {name:'footstep-2',file:'tap',at:59.37,volume:.12},
 {name:'footstep-3',file:'tap',at:59.74,volume:.11}
];
export const Episode5Audio:React.FC=()=>{
 const {fps}=useVideoConfig();
 return <>
   <Audio name="Original outgoing-to-return score" src={sfx('score')} volume={.22} premountFor={fps}/>
   {phrasePlan.map((p,i)=>{
      const start=m.starts?.[p.id]??p.at;
      const duration=(m.durations[p.id]??1.5);
      return <Audio key={p.id} name={'VO '+p.id} src={voice(p.id)}
       from={Math.round(start*fps)}
       durationInFrames={Math.ceil(duration*fps)} volume={.98} premountFor={fps}/>;
   })}
   {cues.map(c=><Audio key={c.name} name={'SFX '+c.name} src={sfx(c.file)}
      from={Math.round(c.at*fps)} playbackRate={c.speed??1} volume={c.volume} premountFor={fps}/>)}
 </>;
};
