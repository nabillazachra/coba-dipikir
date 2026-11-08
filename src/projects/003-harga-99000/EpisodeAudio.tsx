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

// Every cue is motivated by an on-screen action; sparse jokes get breathing room.
const cues:SfxCue[]=[
 {name:'Opening sparkle',file:'sunny-intro',time:.20,volume:.23},
 {name:'99 price appears',file:'bubble-pop',time:1.19,volume:.23},
 {name:'100 tag responds',file:'wood-pluck',time:3.02,volume:.22,rate:.86},
 {name:'Decision swoosh',file:'airy-whoosh',time:4.91,volume:.23},
 {name:'Happy choice',file:'spring-boing',time:5.63,volume:.24},
 {name:'Wait a second',file:'comedy-brake',time:7.28,volume:.15},
 {name:'Math setup',file:'marimba-step',time:8.74,volume:.19},
 {name:'Math reveal anticipation',file:'soft-tick',time:9.69,volume:.13},
 {name:'Only a thousand',file:'coin-ding',time:11.05,volume:.26},
 {name:'Deadpan pause',file:'blink',time:12.57,volume:.12},
 {name:'Price gap stretches',file:'rubber-stretch',time:14.16,volume:.17},
 {name:'Too far reaction',file:'comic-bonk',time:16.68,volume:.19},
 {name:'Highlight first digit',file:'bright-plink',time:18.44,volume:.2},
 {name:'Highlight other digit',file:'bright-plink',time:21.34,volume:.2,rate:.78},
 {name:'Thought pops up',file:'bubble-rise',time:24.46,volume:.22},
 {name:'Nineties group',file:'wood-pluck',time:27.15,volume:.20},
 {name:'Hundreds group',file:'coin-ding',time:28.59,volume:.21,rate:.85},
 {name:'Hundred feels heavy',file:'comic-bonk',time:30.50,volume:.18},
 {name:'Aha concept',file:'aha-sparkle',time:32.42,volume:.26},
 {name:'Examples tag one',file:'bubble-pop',time:35.89,volume:.16},
 {name:'Examples tag two',file:'wood-pluck',time:36.51,volume:.17},
 {name:'Examples tag three',file:'bright-plink',time:37.19,volume:.17},
 {name:'Examples tag four',file:'coin-ding',time:38.03,volume:.18},
 {name:'Nearing round number',file:'rubber-stretch',time:39.1,volume:.15},
 {name:'Elastic punchline',file:'spring-boing',time:40.2,volume:.29},
 {name:'Calculator 1',file:'calculator',time:41.9,volume:.13},
 {name:'Calculator 2',file:'calculator',time:42.22,volume:.14,rate:1.12},
 {name:'Calculator 3',file:'calculator',time:42.55,volume:.15,rate:1.24},
 {name:'Verified',file:'success-chime',time:43.72,volume:.24},
 {name:'Left split',file:'bubble-pop',time:46.22,volume:.18},
 {name:'Right split',file:'wood-pluck',time:46.5,volume:.17},
 {name:'Other digits in',file:'airy-whoosh',time:47.25,volume:.12},
 {name:'Brain reacts',file:'comic-bonk',time:49.14,volume:.13},
 {name:'Final question',file:'sunny-intro',time:51.55,volume:.12,rate:.86},
 {name:'Realization',file:'bubble-rise',time:55.35,volume:.15},
 {name:'One thousand still matters',file:'coin-ding',time:58.26,volume:.23},
 {name:'Small shrug',file:'wood-pluck',time:59.04,volume:.12},
 {name:'Brand outro',file:'success-chime',time:60.52,volume:.15},
];

export const EpisodeAudio:React.FC=()=>{
  const {fps}=useVideoConfig();
  const frame=useCurrentFrame();
  const t=frame/fps;
  const duck=interpolate(t,
    [0,.3,8.3,9,10.8,11.2,12.6,13.2,17.7,18.5,31.3,32,38.7,39.4,40,40.9,57.4,58.05,59.35,60.4,62],
    [.17,.23,.21,.12,.06,.05,.15,.21,.18,.20,.20,.14,.18,.08,.06,.20,.16,.09,.06,.0,0],
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
