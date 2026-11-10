import React from 'react';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {phrasePlan} from './timeline';
import {phraseText} from './voiceover.config';
import manifest from './voice-durations.generated.json';
import {INK,ORANGE,FONT} from './StoryWorld';
const m=manifest as {durations:Record<string,number>;starts?:Record<string,number>};
export const Episode5Captions:React.FC=()=>{
 const {fps}=useVideoConfig();const time=useCurrentFrame()/fps;
 const cue=phrasePlan.find(p=>{
  const st=m.starts?.[p.id]??p.at;
  const duration=(m.durations[p.id]??1.5);
  return time>=st&&time<st+duration;
 });
 if(!cue)return null;
 const val=phraseText(cue.id),start=m.starts?.[cue.id]??cue.at;
 const entering=Math.min(1,Math.max(0,(time-start)/.13));
 const hit=cue.highlight;const idx=hit?val.toLowerCase().indexOf(hit.toLowerCase()):-1;
 return <div style={{position:'absolute',left:97,right:153,top:1354,height:142,zIndex:180,
  display:'flex',justifyContent:'center',alignItems:'center',pointerEvents:'none'}}>
  <div style={{boxSizing:'border-box',maxWidth:830,padding:'18px 27px',
  background:'rgba(255,253,248,.98)',border:'3px solid rgba(32,37,31,.08)',borderRadius:23,
  boxShadow:'0 8px 22px rgba(32,37,31,.10)',fontFamily:FONT,
  fontSize:val.length>46?37:val.length>35?40:43,fontWeight:850,
  lineHeight:1.18,letterSpacing:-.8,textAlign:'center',color:INK,
  opacity:entering,transform:'translateY('+((1-entering)*14)+'px)'}}>
   {idx<0?val:<>{val.slice(0,idx)}<span style={{color:ORANGE}}>{val.slice(idx,idx+hit!.length)}</span>{val.slice(idx+hit!.length)}</>}
  </div>
 </div>;
};
