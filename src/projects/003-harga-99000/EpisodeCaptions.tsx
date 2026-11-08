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
  const entry=Math.min(1,Math.max(0,(now-cue.at)/.13));
  return <div style={{
    position:'absolute',
    left:70,right:70,
    top:1242,
    height:184,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    zIndex:200,
    pointerEvents:'none',
    fontFamily:brand.fontFamily,
  }}>
    <div style={{
      maxWidth:920,
      boxSizing:'border-box',
      color:dark?'#FFFDF8':brand.colors.ink,
      backgroundColor:dark?'rgba(32,37,31,.94)':'rgba(255,253,248,.95)',
      border:'2px solid '+(dark?'rgba(255,253,248,.14)':'rgba(32,37,31,.07)'),
      borderRadius:20,
      boxShadow:'0 8px 22px rgba(32,37,31,.09)',
      fontFamily:brand.fontFamily,
      fontSize:41,
      fontWeight:850,
      lineHeight:1.16,
      textAlign:'center',
      letterSpacing:-.65,
      padding:'14px 26px',
      opacity:entry,
      transform:'translateY('+((1-entry)*10)+'px)',
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
