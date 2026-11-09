import React from 'react';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {phrasePlan} from './timeline';
import {phraseText} from './voiceover.config';
import manifest from './voice-durations.generated.json';
import {CaptionBand,FONT,INK,ORANGE,PAPER} from './VisualSystem';

const durations:Record<string,number>=manifest.durations;
const starts:Record<string,number>=('starts' in manifest?manifest.starts:{}) as Record<string,number>;

export const Episode4Captions:React.FC=()=>{
 const {fps}=useVideoConfig(),frame=useCurrentFrame(),now=frame/fps;
 const cue=phrasePlan.find(p=>now>=(starts[p.id]??p.at)&&now<(starts[p.id]??p.at)+(durations[p.id]??1.5));
 if(!cue)return null;
 const value=phraseText(cue.id);
 const from=starts[cue.id]??cue.at;
 const enter=Math.min(1,Math.max(0,(now-from)/.14));
 const hi=cue.highlight,idx=hi?value.toLowerCase().indexOf(hi.toLowerCase()):-1;
 return <CaptionBand>
   <div style={{maxWidth:840,boxSizing:'border-box',padding:'16px 28px',borderRadius:19,
      background:'rgba(255,253,248,.98)',border:'2px solid rgba(32,37,31,.08)',
      boxShadow:'0 6px 18px rgba(32,37,31,.09)',
      fontFamily:FONT,fontSize:value.length>63?37:value.length>47?39:42,
      fontWeight:850,lineHeight:1.18,letterSpacing:-.6,color:INK,
      textAlign:'center',opacity:enter,transform:'translateY('+((1-enter)*11)+'px)'}}>
     {idx<0||!hi?value:<>{value.slice(0,idx)}<span style={{color:ORANGE}}>{value.slice(idx,idx+hi.length)}</span>{value.slice(idx+hi.length)}</>}
   </div>
 </CaptionBand>;
};
