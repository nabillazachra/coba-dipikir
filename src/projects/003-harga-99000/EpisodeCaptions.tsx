import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../../brand/tokens';
import {phrasePlan} from './timeline';
import {phraseText} from './voiceover.config';
import voiceDurations from './voice-durations.generated.json';

const durations:Record<string,number>=voiceDurations.durations;

// Exact source text + exact MP3-duration window, shared with the audio component.
export const EpisodeCaptions:React.FC=()=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const now=frame/fps;
  const cue=phrasePlan.find((entry)=> {
    const duration=durations[entry.id]??1.5;
    return now>=entry.at && now<entry.at+duration;
  });
  if(!cue)return null;
  const value=phraseText(cue.id);
  const highlight=cue.highlight;
  const idx=highlight?value.toLowerCase().indexOf(highlight.toLowerCase()):-1;
  const dark=now>=8.4&&now<13.6;
  return <div style={{
    position:'absolute',
    left:92,right:146,
    bottom:365,
    minHeight:95,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    zIndex:200,
    pointerEvents:'none',
    fontFamily:brand.fontFamily,
  }}>
    <div style={{
      maxWidth:860,
      color:dark?'#FFFDF8':brand.colors.ink,
      fontFamily:brand.fontFamily,
      fontSize:45,
      fontWeight:900,
      lineHeight:1.13,
      textAlign:'center',
      letterSpacing:-.8,
      textShadow:dark
        ?'0 5px 10px rgba(0,0,0,.82),0 2px 2px rgba(0,0,0,.65)'
        :'0 3px 4px rgba(246,240,229,.95),0 1px 0 #FFFDF8',
      padding:'12px 12px',
    }}>
      {idx>=0&&highlight ? <>
        {value.slice(0,idx)}
        <span style={{color:brand.colors.orange,fontWeight:950}}>
          {value.slice(idx,idx+highlight.length)}
        </span>
        {value.slice(idx+highlight.length)}
      </>:value}
    </div>
  </div>;
};
