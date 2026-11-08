import React from 'react';
import {AbsoluteFill,interpolate,Easing,useCurrentFrame} from 'remotion';
import {brand} from '../../brand/tokens';
import {Character,type CharacterExpression} from '../002-kulkas/Character';
export const PAPER=brand.colors.paper,INK=brand.colors.ink,ORANGE=brand.colors.orange,GREEN=brand.colors.green;
export const FONT=brand.fontFamily;
export const CLAMP={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const mix=(a:number,b:number,p:number)=>a+(b-a)*Math.max(0,Math.min(1,p));
export const ease=(t:number,start:number,end:number)=>interpolate(t,[start,end],[0,1],{
  ...CLAMP,easing:Easing.bezier(.24,.84,.26,1),
});
export const range=(t:number,s:number,e:number,a=0,b=1)=>mix(a,b,ease(t,s,e));
export const pulse=(t:number,at:number,width=.18)=>Math.max(0,1-Math.abs(t-at)/width);
export const Canvas:React.FC<{children:React.ReactNode;dark?:boolean}> = ({children,dark=false})=>(
 <AbsoluteFill style={{overflow:'hidden',background:dark?INK:PAPER,color:dark?PAPER:INK,fontFamily:FONT}}>
   <div style={{position:'absolute',left:-200,top:590,width:510,height:670,borderRadius:'48%',background:dark?'#41463D':'#F3E3D2',opacity:.49}}/>
   <div style={{position:'absolute',right:-220,top:475,width:540,height:790,borderRadius:'48%',background:dark?'#394B40':'#E6EBDF',opacity:.52}}/>
   <div style={{position:'absolute',left:0,right:0,top:1485,height:435,background:dark?'#20251F':'#F6F0E5'}}/>
   {children}
 </AbsoluteFill>
);
export const Heading:React.FC<{eyebrow?:string;children:React.ReactNode;size?:number;center?:boolean;dark?:boolean}>=({eyebrow,children,size=75,center=false,dark=false})=>(
  <div style={{position:'absolute',top:302,left:92,right:120,zIndex:12,textAlign:center?'center':'left',color:dark?PAPER:INK}}>
    {eyebrow&&<div style={{fontSize:23,fontWeight:900,letterSpacing:3.4,color:ORANGE,marginBottom:14}}>{eyebrow}</div>}
    <div style={{fontSize:size,fontWeight:950,lineHeight:1.08,letterSpacing:-2.9}}>{children}</div>
  </div>
);
export const SmallStamp:React.FC<{text:string;left:number;top:number;color?:string;size?:number;rotate?:number;opacity?:number}>=({text,left,top,color=ORANGE,size=31,rotate=0,opacity=1})=>(
  <div style={{position:'absolute',left,top,rotate:rotate+'deg',fontSize:size,fontWeight:900,color,opacity,whiteSpace:'nowrap',letterSpacing:-.6}}>{text}</div>
);
export const Frame:React.FC<{children:React.ReactNode;x:number;y:number;w:number;h:number;fill?:string;radius?:number;border?:string}>=({children,x,y,w,h,fill='#FFF9EF',radius=34,border=INK})=>(
  <div style={{position:'absolute',left:x,top:y,width:w,height:h,boxSizing:'border-box',borderRadius:radius,
    background:fill,border:'6px solid '+border,boxShadow:'9px 12px 0 rgba(32,37,31,.08)',overflow:'hidden'}}>{children}</div>
);
export const Actor:React.FC<{x:number;y:number;width?:number;expression?:CharacterExpression;tilt?:number;lean?:number;arm?:number;leftArm?:number;walk?:number;gaze?:number;bob?:number;flip?:boolean;impatient?:boolean;scarf?:number;opacity?:number}>=({
  x,y,width=355,expression='neutral',tilt=0,lean=0,arm=-12,leftArm=12,walk=0,gaze=0,bob=0,flip=false,impatient=false,scarf=0,opacity=1
})=>{
  const frame=useCurrentFrame();
  const agitated=impatient?Math.sin(frame/3.5)*3:0;
  const blinking=frame%111>=107?1:0;
  return <Character left={x} top={y} width={width} opacity={opacity}
    expression={expression} headTilt={tilt+agitated} lean={lean}
    leftArm={leftArm} rightArm={arm+agitated}
    step={walk} gazeX={gaze}
    blink={blinking} flip={flip}
    bob={bob+(impatient?Math.sin(frame/2.7)*5:Math.sin(frame/16)*2)}
    scarfSwing={scarf+(impatient?Math.sin(frame/4.4)*8:Math.sin(frame/12)*2)}/>;
};
export const Indicator:React.FC<{x?:number;y?:number;floor?:string;size?:number}>=({x=273,y=552,floor='12',size=60})=>(
 <div style={{position:'absolute',left:x,top:y,width:190,height:88,background:INK,borderRadius:14,
 border:'5px solid #7D847D',boxShadow:'inset 0 0 0 5px #2E3830',color:ORANGE,
 fontSize:size,fontWeight:950,lineHeight:'77px',letterSpacing:-2,textAlign:'center'}}>
   <span style={{fontSize:32,marginRight:8}}>↑</span>{floor}
 </div>
);
export const Door:React.FC<{x?:number;y?:number;w?:number;h?:number;open:number;sensor?:boolean;person?:boolean;dark?:boolean}>=({
 x=86,y=630,w=636,h=572,open=1,sensor=false,person=false,dark=false
})=>{
 const slide=Math.max(0,Math.min(1,open));
 return <div style={{position:'absolute',left:x,top:y,width:w,height:h,
  border:'12px solid #626D66',background:'#E8E0D2',boxSizing:'border-box',
  overflow:'hidden',borderRadius:17,boxShadow:'0 13px 0 rgba(32,37,31,.12)'}}>
   <div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(90deg,#EBE4D7 0px,#EBE4D7 85px,#E1D5C7 88px,#EBE4D7 95px)',opacity:.8}}/>
   <div style={{position:'absolute',top:25,left:90,width:w-210,height:18,borderRadius:14,background:'#BFC6B9',opacity:.75}}/>
   <div style={{position:'absolute',top:78,right:55,width:60,height:h-110,borderRight:'5px solid #AAB7A9',opacity:.55}}/>
   {person&&<div style={{position:'absolute',left:w*.39,top:222,width:140,height:240,opacity:.9}}>
       <svg viewBox="0 0 140 240" width="100%" height="100%">
        <circle cx="70" cy="49" r="39" fill="#FFF7E9" stroke={INK} strokeWidth="9"/>
        <path d="M53 99 Q70 85 88 99 L101 179 L41 179 Z" fill="#D5DBCC" stroke={INK} strokeWidth="9" strokeLinejoin="round"/>
        <path d="M47 176 L38 222 M90 176 L97 222" stroke={INK} strokeWidth="10" strokeLinecap="round"/>
       </svg>
     </div>}
   {sensor&&<><div style={{position:'absolute',top:105,left:21,width:8,height:h-180,background:ORANGE,opacity:.85}}/>
     <div style={{position:'absolute',top:110,right:21,width:8,height:h-180,background:ORANGE,opacity:.85}}/>
     {[155,275,395].map(n=><div key={n} style={{position:'absolute',top:n,left:18,right:18,borderTop:'5px dashed '+ORANGE,opacity:.42}}/>)}</>}
   {(['left','right'] as const).map(side=><div key={side} style={{
      position:'absolute',top:0,height:'100%',width:'50%',
      [side==='left'?'left':'right']:0,
      background:dark?'linear-gradient(90deg,#616A63,#A1A79E)':
        side==='left'?'linear-gradient(90deg,#ABB1A7,#D4D5C9)':'linear-gradient(90deg,#D4D5C9,#AEB4AA)',
      boxSizing:'border-box',border: '4px solid #7D8880',
      borderTop:'none',borderBottom:'none',
      transform:'translateX('+((side==='left'?-1:1)*slide*100)+'%)',
    }}>
      <div style={{position:'absolute',top:'4%',bottom:'4%',
        [side==='left'?'right':'left']:15,width:7,borderRadius:9,background:'#7D867E',opacity:.76}}/>
      <div style={{position:'absolute',top:35,bottom:35,
        [side==='left'?'left':'right']:34,width:2,background:'rgba(255,255,255,.45)'}}/>
    </div>)}
 </div>;
};
export const Panel:React.FC<{x?:number;y?:number;scale?:number;pressed?:number;floorLit?:boolean;showLabels?:boolean}>=({
 x=779,y=660,scale=1,pressed=0,floorLit=true,showLabels=false
})=>(
  <div style={{position:'absolute',left:x,top:y,width:224,height:530,
   transform:'scale('+scale+')',transformOrigin:'top left',
   background:'linear-gradient(105deg,#D7D9D2,#A4AEA7 47%,#D8DAD2)',
   border:'8px solid #65716A',borderRadius:32,boxShadow:'10px 12px 0 rgba(32,37,31,.12)',boxSizing:'border-box'}}>
   <div style={{position:'absolute',left:18,top:18,right:18,
      background:'#414B44',height:74,borderRadius:12,color:ORANGE,fontWeight:900,
      fontSize:34,textAlign:'center',lineHeight:'74px'}}>12 ↑</div>
   {[9,10,11,12].map((n,i)=><div key={n} style={{
      position:'absolute',top:118+Math.floor(i/2)*87,left:25+(i%2)*91,width:76,height:70,
      borderRadius:18,border:'5px solid #5D655E',
      background:n===12&&floorLit?'#F8BC94':'#F8F7EF',
      textAlign:'center',lineHeight:'61px',fontSize:33,fontWeight:900,color:INK,
      boxShadow:'inset 0 3px 0 rgba(255,255,255,.5)',
    }}>{n}</div>)}
   <div style={{position:'absolute',left:18,top:325,right:18,height:6,background:'#8A938B',borderRadius:8}}/>
   {['OPEN','CLOSE'].map((b,i)=><div key={b} style={{
      position:'absolute',top:345,left:22+i*96,width:82,height:82,
      borderRadius:18,border:'5px solid '+(i===1&&pressed>0?ORANGE:'#56635B'),
      background:i===1&&pressed>0?'#FFE6D6':'#F9F7EF',
      transform:i===1?'scale('+(1-.07*pressed)+')':'none',
      display:'flex',alignItems:'center',justifyContent:'center',
      boxShadow:i===1&&pressed>0?'0 0 23px rgba(233,107,60,.55)':'inset 0 4px 0 rgba(255,255,255,.7)',
   }}>
     <svg width="65" height="55" viewBox="0 0 65 55">
      {i===0?<>
        <path d="M15 13 L4 27 L15 41 M50 13 L61 27 L50 41" fill="none" stroke={INK} strokeWidth="5" strokeLinejoin="round"/>
        <path d="M29 8 V47 M36 8 V47" stroke={INK} strokeWidth="4"/>
      </>:<>
        <path d="M4 13 L23 27 L4 41 M61 13 L42 27 L61 41" fill="none" stroke={INK} strokeWidth="5" strokeLinejoin="round"/>
        <path d="M28 8 V47 M37 8 V47" stroke={INK} strokeWidth="4"/>
      </>}
     </svg>
   </div>)}
   <div style={{position:'absolute',bottom:13,left:28,width:165,height:40,
      borderRadius:14,background:'#B6BDB5',fontSize:20,fontWeight:850,letterSpacing:1,
      textAlign:'center',lineHeight:'39px',color:INK}}>◉  ALARM</div>
   {showLabels&&<div style={{position:'absolute',top:434,left:112,fontSize:20,fontWeight:900,color:ORANGE}}>CLOSE</div>}
  </div>
);
export const Lift:React.FC<{open?:number;pressed?:number;character?:React.ReactNode;floor?:string;sensor?:boolean;person?:boolean}>=({
 open=1,pressed=0,character,floor='12',sensor=false,person=false
})=>(
  <>
   <div style={{position:'absolute',left:60,top:578,width:964,height:654,
       borderRadius:45,background:'linear-gradient(125deg,#E3E5DD,#B9C0B5 55%,#E1E3D9)',
       border:'8px solid #8D998E',boxSizing:'border-box',boxShadow:'12px 17px 0 rgba(32,37,31,.09)'}}/>
   <Indicator floor={floor} x={300} y={576}/>
   <Door x={96} y={690} w={635} h={504} open={open} sensor={sensor} person={person}/>
   <div style={{position:'absolute',left:93,top:1140,width:640,height:10,background:'#879186',borderRadius:9}}/>
   <Panel x={784} y={678} scale={.94} pressed={pressed}/>
   {character}
  </>
);
export const PressFinger:React.FC<{x:number;y:number;progress:number;angle?:number;size?:number;left?:boolean}>=({
 x,y,progress,angle=-16,size=1,left=false
})=>{
 const p=Math.max(0,Math.min(1,progress));
 return <div style={{position:'absolute',left:x-(left?0:220),top:y-55,width:260,height:170,
   zIndex:22,transform:'translateX('+((left?1:-1)*(1-p)*52)+'px) rotate('+angle+'deg) scale('+size+')',
   transformOrigin:'85% 50%'}}>
    <svg viewBox="0 0 260 170" width="100%" height="100%">
      <path d="M-4 111 Q45 110 73 100 L161 64 Q176 56 189 64 L227 84 Q239 91 232 102 Q226 114 212 109 L186 105 L174 121 L112 154 Q84 163 63 146 L-3 147 Z"
        fill="#FFF8ED" stroke={INK} strokeWidth="11" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="228" cy="97" r="9" fill="#E7BDA1"/>
      <path d="M47 114 Q62 124 67 147" stroke={ORANGE} strokeWidth="13" strokeLinecap="round"/>
    </svg>
 </div>;
};
export const Count:React.FC<{value:string;x?:number;y?:number;scale?:number}>=({value,x=725,y=552,scale=1})=>(
 <div style={{position:'absolute',left:x,top:y,minWidth:125,height:102,padding:'0 18px',
      transform:'rotate(-7deg) scale('+scale+')',border:'6px solid '+ORANGE,
      boxShadow:'8px 10px 0 rgba(233,107,60,.12)',borderRadius:24,
      background:'#FFF9EF',textAlign:'center',lineHeight:'95px',
      fontSize:68,fontWeight:950,color:ORANGE,zIndex:16}}>{value}</div>
);
export const CaptionBand:React.FC<{children:React.ReactNode}>=({children})=>(
 <div style={{position:'absolute',left:84,right:138,top:1325,minHeight:130,maxHeight:170,
   display:'flex',alignItems:'center',justifyContent:'center',zIndex:200,pointerEvents:'none'}}>
   {children}
 </div>
);
