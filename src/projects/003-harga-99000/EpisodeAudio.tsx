import React from 'react';
import {Audio} from '@remotion/media';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {publicAsset} from '../../brand/publicAsset';
import {phrasePlan} from './timeline';
import voiceDurations from './voice-durations.generated.json';

const durations:Record<string,number>=voiceDurations.durations;
const voice=(id:string)=>publicAsset('audio/003-harga-99000/voiceover/'+id+'.mp3');
const sound=(name:string)=>publicAsset('audio/003-harga-99000/sfx/'+name+'.wav');

type SfxCue={name:string; file:string;time:number;volume:number;rate?:number};

const cues:SfxCue[]=[
 {name:'Choice ready',file:'game-show',time:.20,volume:.20},
 {name:'Tag 99 appears',file:'price-pop',time:1.19,volume:.19},
 {name:'Tag 100 appears',file:'price-pop',time:3.0,volume:.18,rate:.86},
 {name:'Dart left',file:'small-swipe',time:4.91,volume:.18},
 {name:'Hugged the cheaper one',file:'boing',time:5.63,volume:.17},
 {name:'Thinking hold',file:'record-stop',time:7.28,volume:.20},
 {name:'Dramatic arithmetic',file:'suspense',time:8.74,volume:.18},
 {name:'About to reveal...',file:'tick',time:9.69,volume:.10},
 {name:'One thousand tiny pop',file:'tiny-pop',time:11.05,volume:.23},
 {name:'Deadpan look',file:'blink',time:12.57,volume:.15},
 {name:'Elastic price gap',file:'elastic',time:14.16,volume:.22},
 {name:'Distant absurdity',file:'little-bonk',time:16.68,volume:.13},
 {name:'Look at digit 9',file:'scanner',time:18.44,volume:.16},
 {name:'Look at digit 1',file:'scanner',time:21.34,volume:.16,rate:.92},
 {name:'Mind categorizes',file:'thought-bubble',time:24.46,volume:.17},
 {name:'Nine tens aha',file:'tiny-pop',time:27.15,volume:.16},
 {name:'Category switch',file:'record-stop',time:28.59,volume:.14},
 {name:'Hundred feels heavier',file:'little-bonk',time:30.50,volume:.22},
 {name:'Left-digit stamp',file:'stamp',time:32.42,volume:.18},
 {name:'Point and discover',file:'scanner',time:33.2,volume:.11},
 {name:'19.900 tag',file:'price-pop',time:35.89,volume:.14},
 {name:'49.900 tag',file:'price-pop',time:36.51,volume:.13},
 {name:'199.900 tag',file:'price-pop',time:37.19,volume:.14},
 {name:'99.900 tag',file:'price-pop',time:38.03,volume:.16},
 {name:'Push almost to round',file:'elastic',time:39.1,volume:.19},
 {name:'Boing BACK',file:'boing',time:40.2,volume:.29},
 {name:'Calculator tap one',file:'calculator',time:41.9,volume:.16},
 {name:'Calculator tap two',file:'calculator',time:42.22,volume:.16},
 {name:'Calculator tap three',file:'calculator',time:42.55,volume:.17},
 {name:'Selisih checked',file:'cash',time:43.72,volume:.13},
 {name:'Front digit in',file:'price-pop',time:46.22,volume:.18},
 {name:'Other front digit in',file:'price-pop',time:46.5,volume:.18,rate:.77},
 {name:'Other digits slide',file:'small-swipe',time:47.25,volume:.12},
 {name:'Feels heavier',file:'little-bonk',time:49.14,volume:.16},
 {name:'Choice once again',file:'game-show',time:51.55,volume:.12},
 {name:'Comedic realization',file:'thought-bubble',time:55.35,volume:.13},
 {name:'Of course one thousand',file:'cash',time:58.26,volume:.23},
 {name:'Tiny shrug',file:'tiny-pop',time:59.04,volume:.12},
 {name:'Logo signoff',file:'stamp',time:60.52,volume:.10},
];

export const EpisodeAudio:React.FC=()=>{
  const {fps}=useVideoConfig();
  const frame=useCurrentFrame();
  const t=frame/fps;
  const duck=interpolate(t,
    [0,.3,8.3,9,10.8,11.2,12.6,13.2,17.7,18.5,31.3,32,38.7,39.4,40,40.9,57.4,58.05,59.35,60.4,62],
    [.20,.32,.3,.20,.15,.14,.22,.32,.26,.30,.3,.23,.28,.13,.10,.28,.25,.17,.12,.0,0],
    {extrapolateLeft:'clamp',extrapolateRight:'clamp'},
  );
  return <>
    <Audio name="E003 quirky original score" src={sound('score')}
      volume={duck} premountFor={fps}/>
    {phrasePlan.map((cue)=>(
      <Audio
        key={cue.id}
        name={'VO · '+cue.id}
        src={voice(cue.id)}
        from={Math.round(cue.at*fps)}
        durationInFrames={Math.ceil((durations[cue.id]??1.5)*fps)}
        volume={.99}
        premountFor={fps}
      />
    ))}
    {cues.map((cue)=>(
      <Audio
        key={cue.name}
        name={'SFX · '+cue.name}
        src={sound(cue.file)}
        from={Math.round(cue.time*fps)}
        volume={cue.volume}
        playbackRate={cue.rate??1}
        premountFor={fps}
      />
    ))}
  </>;
};
