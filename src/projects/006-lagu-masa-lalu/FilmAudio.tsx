import React from 'react';
import {Audio} from '@remotion/media';
import {useVideoConfig} from 'remotion';
import {publicAsset} from '../../brand/publicAsset';
import {voiceoverConfig} from './voiceover.config';
import manifest from './voice-durations.generated.json';

const m=manifest as {ready:boolean;durations:Record<string,number>;starts:Record<string,number>};
const path='audio/006-lagu-masa-lalu/';

export const Episode6Audio:React.FC=()=>{
  const {fps}=useVideoConfig();
  // E006 first 7s owns its original motif inside approved acting proof.
  // Once generated, a custom original 60s bed scores the remaining film.
  if (!m.ready) return null;
  return <>
    {/* Subtle original diegetic Foley; 69s, never a licensed effect. */}
    <Audio name="Original E006 physical Foley"
      from={0} premountFor={fps} src={publicAsset(path+'foley.wav')}
      volume={.42}/>
    <Audio name="Original E006 motif and atmospheric score"
      from={7*fps} premountFor={fps} src={publicAsset(path+'score.wav')}
      volume={.35}/>
    {voiceoverConfig.scenes.map(cue=><Audio
      key={cue.id}
      name={'Natural Indonesian VO '+cue.id}
      from={Math.round((m.starts[cue.id]??cue.at)*fps)}
      durationInFrames={Math.ceil((m.durations[cue.id]??1.8)*fps)}
      premountFor={fps}
      src={publicAsset(path+'voiceover/'+cue.id+'.mp3')}
      volume={.98}
    />)}
  </>;
};
