import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Actor,Door,Panel,PressFinger,INK,ORANGE,GREEN,PAPER,range} from './VisualSystem';
import {brand} from '../../brand/tokens';

export const SLATE='#293333',METAL='#ABB2A9',WARM='#F5D8B5';
export const FONT=brand.fontFamily;

// Every camera frame ends above subtitle y=1325. No important object is staged
// in the bottom 25% reserved for Instagram and TikTok interface.
export const FilmStage:React.FC<{children:React.ReactNode;night?:boolean;warm?:boolean}>=({
 children,night=false,warm=true
})=><AbsoluteFill style={{
 overflow:'hidden',fontFamily:FONT,color:night?'#FFF9EE':INK,
 background:night?'#263031':PAPER
}}>
 <div style={{position:'absolute',inset:0,
   background:night
     ?'radial-gradient(ellipse at 62% 44%,#5B5546 0%,#343B3A 47%,#232B2D 100%)'
     :'radial-gradient(ellipse at 67% 41%,#FFFAEF 0%,#F6F0E5 68%,#E9E2D5 100%)'}}/>
 <div style={{position:'absolute',left:-150,top:350,width:580,height:820,borderRadius:'48%',
 background:night?'rgba(242,170,101,.08)':'#E7EBE0',opacity:.78}}/>
 <div style={{position:'absolute',right:-150,top:475,width:600,height:750,borderRadius:'48%',
 background:night?'rgba(249,187,128,.07)':'#EFE3D3',opacity:.58}}/>
 <div style={{position:'absolute',left:0,right:0,top:1515,bottom:0,
 background:night?'#27302E':PAPER}}/>
 {warm&&<div style={{position:'absolute',left:60,top:330,width:960,height:850,
 borderRadius:'50%',background:'radial-gradient(ellipse,rgba(250,174,99,.10),transparent 70%)',
 pointerEvents:'none'}}/>}
 {children}
</AbsoluteFill>;

export const FilmTitle:React.FC<{
 eyebrow?:string;children:React.ReactNode;size?:number;night?:boolean;center?:boolean;
 top?:number;rotation?:number;opacity?:number
}>=({eyebrow,children,size=77,night=false,center=false,top=307,rotation=0,opacity=1})=><div style={{
 position:'absolute',left:86,right:105,top,zIndex:30,opacity,
 textAlign:center?'center':'left',transform:'rotate('+rotation+'deg)',
 color:night?'#FFF9EE':INK,
}}>
 {eyebrow&&<div style={{fontWeight:900,color:night?'#FFC493':ORANGE,
 fontSize:23,letterSpacing:3.1,marginBottom:16}}>{eyebrow}</div>}
 <div style={{fontSize:size,fontWeight:950,letterSpacing:-3.8,lineHeight:1.07,
 textShadow:night?'0 5px 12px rgba(0,0,0,.26)':'none'}}>{children}</div>
</div>;

export const Accent:React.FC<{children:React.ReactNode;night?:boolean}>=({children,night=false})=>
 <span style={{color:night?'#FFC18E':ORANGE}}>{children}</span>;

export const Camera:React.FC<{
 children:React.ReactNode;zoom?:number;panX?:number;panY?:number;top?:number;height?:number
}>=({children,zoom=1,panX=0,panY=0,top=565,height=730})=>
 <div style={{position:'absolute',left:0,right:0,top,height,overflow:'hidden'}}>
   <div style={{position:'absolute',left:0,top:0,width:1080,height:height+85,
     transform:'translate('+panX+'px,'+panY+'px) scale('+zoom+')',
     transformOrigin:'50% 47%'}}>{children}</div>
 </div>;

export const ElevatorShell:React.FC<{night?:boolean;lighting?:number;floor?:string}>=({
 night=false,lighting=1,floor='12'
})=><>
 <div style={{position:'absolute',left:42,top:5,width:998,height:700,
 borderRadius:'30px 30px 20px 20px',border:'11px solid '+(night?'#202B2B':'#68756C'),
 background:night?'linear-gradient(115deg,#545D58,#384849 44%,#67716A 90%)'
 :'linear-gradient(110deg,#A9B3AB,#E0E1D6 35%,#B4BBB1 78%,#8B9A8D)',
 boxSizing:'border-box',boxShadow:night?'18px 22px 0 rgba(0,0,0,.22)':'18px 22px 0 rgba(32,37,31,.09)'}}/>
 <div style={{position:'absolute',left:65,top:6,width:945,height:66,
 background:night?'linear-gradient(#515A52,#3A423F)':'linear-gradient(#DCE1D7,#BBC5B9)',
 borderRadius:'18px 18px 5px 5px',borderBottom:'6px solid '+(night?'#252D2B':'#A0AAA0')}}/>
 <div style={{position:'absolute',left:107,top:69,width:710,height:8,
 background:night?'#212B29':'#8B988E',borderRadius:10}}/>
 <div style={{position:'absolute',left:78,top:110,width:14,height:555,
 background:night?'#8D8F81':'#F6F0E5',opacity:.45,borderRadius:12}}/>
 <div style={{position:'absolute',left:1020,top:110,width:7,height:545,
 background:'#F3DAB4',opacity:night?.24:.34,borderRadius:12}}/>
 <div style={{position:'absolute',left:35,top:659,width:1008,height:12,
 borderRadius:12,background:night?'#222B29':'#87958B'}}/>
 <div style={{position:'absolute',left:40,top:672,width:1000,height:155,
 background:night?'linear-gradient(#444944,#313635)':'linear-gradient(#C9C9BC,#F3E9D8)',
 clipPath:'polygon(7% 0,93% 0,100% 100%,0 100%)'}}/>
 <div style={{position:'absolute',left:88,top:694,width:896,height:4,
 background:night?'#827868':'#ACA997',opacity:.45}}/>
 <div style={{position:'absolute',left:310,top:4,width:438,height:29,borderRadius:15,
 background:lighting?'rgba(255,216,153,.42)':'rgba(255,252,219,.15)',
 filter:'blur(13px)'}}/>
 <div style={{position:'absolute',left:360,top:15,width:347,height:12,borderRadius:15,
 background:night?'#E5BC87':'#F7F0D6',opacity:.75}}/>
 <div style={{position:'absolute',left:296,top:78,width:204,height:71,
 background:'#26332E',borderRadius:13,border:'6px solid #5C685D',boxSizing:'border-box',
 boxShadow:'inset 0 0 0 3px #354137',color:'#F4AD7F',fontWeight:950,fontSize:48,
 lineHeight:'60px',textAlign:'center'}}>↑ {floor}</div>
 </>;

export const LiftLocation:React.FC<{
 night?:boolean;open?:number;pressed?:number;hero?:React.ReactNode;behind?:boolean;
 sensor?:boolean;person?:React.ReactNode;zoom?:number;panX?:number;panY?:number;
 showPanel?:boolean;floor?:string;lighting?:number
}>=({
 night=false,open=1,pressed=0,hero,behind=false,sensor=false,
 person,zoom=1,panX=0,panY=0,showPanel=true,floor='12',lighting=1
})=><Camera zoom={zoom} panX={panX} panY={panY}>
 <ElevatorShell night={night} floor={floor} lighting={lighting}/>
 {hero&&behind&&hero}
 <Door x={119} y={154} w={640} h={489} open={open} sensor={sensor} dark={night}/>
 {/* The door component paints its own opaque shaft background. Passengers must
     be composited AFTER that backdrop or they disappear even when open=1. */}
 {person}
 {showPanel&&<Panel x={787} y={143} scale={.99} pressed={pressed}/>}

 {hero&&!behind&&hero}
 <div style={{position:'absolute',left:95,top:630,width:707,height:13,borderRadius:5,
 background:night?'rgba(253,212,167,.18)':'rgba(98,110,102,.16)'}}/>
 </Camera>;

export const Marker:React.FC<{children:React.ReactNode;x:number;y:number;
 size?:number;color?:string;rotate?:number;night?:boolean;opacity?:number}>=({
 children,x,y,size=33,color=ORANGE,rotate=-4,night=false,opacity=1
})=><div style={{position:'absolute',left:x,top:y,color:night?'#FDC095':color,
 transform:'rotate('+rotate+'deg)',fontSize:size,fontWeight:950,
 letterSpacing:-1.3,whiteSpace:'nowrap',zIndex:24,opacity}}>{children}</div>;

export const FloorClock:React.FC<{x:number;y:number;turn?:number;size?:number;night?:boolean}>=({
 x,y,turn=0,size=125,night=false
})=><svg style={{position:'absolute',left:x,top:y,transform:'rotate('+turn+'deg)'}}
 width={size} height={size} viewBox="0 0 100 100">
 <circle cx="50" cy="50" r="43" fill={night?'#4D5650':'#FFF9EF'}
 stroke={night?'#E7D7BD':INK} strokeWidth="7"/>
 <path d="M50 18 V50 L73 60" fill="none" stroke={ORANGE} strokeWidth="7" strokeLinecap="round"/>
 <circle cx="50" cy="50" r="6" fill={ORANGE}/>
 </svg>;

export const LightBurst:React.FC<{x:number;y:number;on:number;color?:string;size?:number}>=({
 x,y,on,color=ORANGE,size=130
})=><svg style={{position:'absolute',left:x-size/2,top:y-size/2,opacity:on,
 transform:'scale('+(0.7+on*.3)+')',zIndex:30}} width={size} height={size} viewBox="0 0 100 100">
 {[0,45,90,135].map(a=><path key={a} d="M50 6 V25 M50 75 V94"
 stroke={color} strokeWidth="7" strokeLinecap="round" transform={'rotate('+a+' 50 50)'}/>)}
 </svg>;

export const ButtonMacro:React.FC<{press?:number;finger?:number;night?:boolean;camera?:number;
 showActor?:boolean;count?:number;shake?:number;spotlight?:boolean;
 agitation?:number;reaction?:boolean
}>=({press=0,finger=0,night=false,camera=1,showActor=true,count,shake=0,
 spotlight=false,agitation=0,reaction=false})=>
 <Camera zoom={camera} panX={shake} panY={0}>
  <div style={{position:'absolute',left:28,top:10,width:1024,height:700,borderRadius:40,
 background:night?'linear-gradient(110deg,#465651,#2C3C3C)':
 'linear-gradient(135deg,#DBDFD4,#BCC7B8)',border:'9px solid '+(night?'#1D2827':'#89978B'),
 boxShadow:'12px 17px 0 rgba(15,24,23,.15)',boxSizing:'border-box'}}/>
  <div style={{position:'absolute',left:76,top:50,width:740,height:17,
 background:night?'#899A85':'#F5F2E4',borderRadius:10,opacity:.65}}/>
  {showActor&&<Actor x={59} y={132} width={470}
   expression={reaction?'surprised':agitation>.65?'annoyed':agitation>.3?'doubtful':press>.4?'realization':'curious'}
   tilt={reaction?-16:press*12-5+agitation*8} gaze={reaction?-6:11}
   lean={agitation*12} arm={62+press*13+agitation*8} leftArm={-20}
   impatient={agitation>.24||press>.1} scarf={press*15+agitation*13}/>}
  <Panel x={585} y={46} scale={1.33} pressed={press}/>
  {spotlight&&<div style={{position:'absolute',left:687,top:456,width:180,height:176,
 border:'8px solid '+ORANGE,borderRadius:40,boxShadow:'0 0 38px rgba(233,107,60,.4)',
 pointerEvents:'none'}}/>}
  <PressFinger x={779} y={545} progress={finger} size={.92}/>
  {typeof count==='number'&&<div style={{position:'absolute',left:807,top:19,
 background:'#FFF7EE',border:'7px solid '+ORANGE,boxShadow:'8px 10px 0 rgba(0,0,0,.12)',
 color:ORANGE,borderRadius:21,padding:'6px 25px',fontSize:76,fontWeight:950,
 transform:'rotate(-7deg)'}}>×{count}</div>}
 </Camera>;

export const FaceCloseup:React.FC<{
 night?:boolean;expression?:'annoyed'|'doubtful'|'worried'|'deadpan'|'thinking'|'surprised'|'realization'|'happy'|'curious';
 tilt?:number;gaze?:number;lean?:number;shake?:number;mouth?:string;size?:number;shiftX?:number
}>=({night=false,expression='annoyed',tilt=0,gaze=0,lean=0,shake=0,size=650,shiftX=0})=>
 <Camera zoom={1.0+Math.abs(shake)*.0007} panX={shiftX+shake} top={575} height={696}>
  <div style={{position:'absolute',left:73,top:13,width:935,height:805,
   background:night?'linear-gradient(115deg,#6D746B,#343F3C)':
    'linear-gradient(120deg,#D6DDCE,#B3C4B6)',borderRadius:44,
   border:'9px solid '+(night?'#263230':'#738A7B')}}/>
  <div style={{position:'absolute',right:50,top:30,width:108,height:600,
   borderRadius:22,background:night?'#B7BCB0':'#FFFDF2',opacity:.5}}/>
  <div style={{position:'absolute',left:150,top:560,width:750,height:85,
   borderRadius:'50%',background:'rgba(32,37,31,.09)',filter:'blur(30px)'}}/>
  <Actor x={200} y={100} width={size} expression={expression}
    tilt={tilt} gaze={gaze} lean={lean} scarf={Math.sin(tilt/4)*4}
    impatient={expression==='annoyed'}/>
 </Camera>;

export const SensorBeam:React.FC<{pulse:number;night?:boolean;x?:number;y?:number}>=({
 pulse,night=false,x=136,y=185
})=><div style={{position:'absolute',left:x,top:y,width:601,height:395,pointerEvents:'none'}}>
 {[60,170,280].map((n,i)=><div key={n} style={{position:'absolute',left:0,right:0,top:n,
 borderTop:'6px dashed '+(night?'#FFB68C':ORANGE),opacity:pulse*(i===1?.85:.42),
 filter:pulse>.8?'drop-shadow(0 0 8px rgba(233,107,60,.5))':'none'}}/>)}
 </div>;

export const ProgressTrack:React.FC<{value:number;label?:string;x?:number;y?:number;
 w?:number;night?:boolean}>=({value,label='PINTU TERBUKA',x=95,y=52,w=575,night=false})=>
 <div style={{position:'absolute',left:x,top:y,width:w,padding:'18px 20px 22px',
 background:night?'rgba(29,42,40,.92)':'#FFF9EC',
 border:'5px solid '+(night?'#D4D2C3':INK),borderRadius:23,boxSizing:'border-box'}}>
  <div style={{fontSize:22,fontWeight:900,letterSpacing:2.3,color:night?'#FFE5C7':GREEN,marginBottom:13}}>{label}</div>
  <div style={{height:25,borderRadius:10,background:night?'#52635C':'#DBDED3',overflow:'hidden'}}>
    <div style={{width:Math.round(Math.max(0,Math.min(1,value))*100)+'%',height:'100%',
    background:ORANGE,borderRadius:10}}/>
  </div>
 </div>;
