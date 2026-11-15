import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../../brand/tokens';
import {voiceoverConfig} from './voiceover.config';
import manifest from './voice-durations.generated.json';

const m=manifest as {ready:boolean;durations:Record<string,number>;starts:Record<string,number>};

export const Episode6Captions:React.FC=()=>{
  const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
  // No fake spoken captions in a visual-only build awaiting audio generation.
  if (!m.ready) return null;
  const cue=voiceoverConfig.scenes.find(v=>{
    const a=m.starts[v.id]??v.at;
    const b=a+(m.durations[v.id]??0);
    return t>=a&&t<b;
  });
  if (!cue) return null;
  return <AbsoluteFill style={{pointerEvents:'none',zIndex:50}}>
    <div style={{
      position:'absolute',top:1340,left:92,width:782,minHeight:130,
      display:'flex',alignItems:'center',justifyContent:'center',
      color:brand.colors.white,textAlign:'center',
      fontFamily:brand.fontFamily,fontWeight:950,fontSize:50,
      lineHeight:1.12,letterSpacing:-0.6,
      WebkitTextStroke:'1.75px rgba(23,27,25,.89)',
      textShadow:'0 4px 10px rgba(12,18,19,.90),0 2px 2px #18201B',
    }}>
      {cue.text}
    </div>
  </AbsoluteFill>;
};
