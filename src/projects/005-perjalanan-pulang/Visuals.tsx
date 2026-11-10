import React from 'react';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {publicAsset} from '../../brand/publicAsset';
import {scenePlan,type SceneId} from './timeline';
import {Actor,Film,SceneNote,TextFocus,StreetWorld,WindowCabin,MapBoard,Landmark,landmarkOrder,Bus,
 INK,ORANGE,GREEN,PAPER,FONT,clamp,ease,lerp} from './StoryWorld';

const BG='#FFFDF8';
const Stage:React.FC<{children:React.ReactNode;top?:number;night?:boolean;zoom?:number;pan?:number}> = ({
 children,top=388,night=false,zoom=1,pan=0
})=><div style={{position:'absolute',left:0,top,width:1080,height:1340-top,overflow:'hidden',
 border:'none',borderRadius:0,
 boxShadow:'none',background:night?'#53685D':'#C7D9CB'}}>
 <div style={{position:'absolute',left:0,top:0,width:1080,height:970,
 transform:'translateX('+pan+'px) scale('+zoom+')',transformOrigin:'50% 55%'}}>{children}</div></div>;

const Pill:React.FC<{children:React.ReactNode;x:number;y:number;dark?:boolean;color?:string;size?:number}> = ({
 children,x,y,dark=false,color=ORANGE,size=32
})=><div style={{position:'absolute',left:x,top:y,background:dark?'#334840':BG,
 border:'6px solid '+(dark?'#F2E3C9':INK),color:color,fontSize:size,fontWeight:950,
 borderRadius:20,padding:'13px 23px',boxShadow:'6px 8px 0 rgba(0,0,0,.1)',zIndex:40,
 boxSizing:'border-box',maxWidth:Math.max(208,990-x),lineHeight:1.12,overflowWrap:'break-word',
 transform:'rotate(-3deg)',whiteSpace:'normal'}}>{children}</div>;

const Phone:React.FC<{x?:number;y?:number;minutes:string;rotate?:number;scale?:number;dark?:boolean}> = ({
 x=560,y=610,minutes,rotate=-9,scale=1,dark=false
})=><div style={{position:'absolute',left:x,top:y,width:280,height:435,
 transform:'rotate('+rotate+'deg) scale('+scale+')',transformOrigin:'center',zIndex:26,
 border:'13px solid '+INK,borderRadius:39,background:dark?'#253B35':'#FDF9ED',boxShadow:'18px 22px 0 rgba(0,0,0,.15)'}}>
 <div style={{width:95,height:13,margin:'15px auto 35px',background:INK,borderRadius:10}}/>
 <div style={{fontSize:25,textAlign:'center',fontWeight:900,color:GREEN}}>ESTIMASI</div>
 <div style={{fontSize:62,textAlign:'center',fontWeight:950,letterSpacing:-2.7,color:ORANGE,marginTop:19}}>{minutes}</div>
 <svg viewBox="0 0 250 160" width="240" style={{marginLeft:17,marginTop:27}}>
 <path d="M25 130 Q55 60 100 96 T210 22" fill="none" stroke={INK} strokeWidth="11"
 strokeDasharray="13 16" strokeLinecap="round"/>
 <circle cx="25" cy="130" r="13" fill={GREEN}/><circle cx="210" cy="22" r="13" fill={ORANGE}/>
 </svg></div>;

const Gauge:React.FC<{label:string;x:number;y:number;fill:number;width?:number}> = ({
 label,x,y,fill,width=780
})=><div style={{position:'absolute',left:x,top:y,width,background:BG,
 border:'6px solid '+INK,borderRadius:24,padding:'19px 23px'}}>
 <div style={{fontSize:25,fontWeight:950,letterSpacing:2,color:GREEN}}>{label}</div>
 <div style={{height:35,background:'#D5DED1',borderRadius:18,marginTop:13,overflow:'hidden'}}>
 <div style={{width:Math.round(clamp(fill)*100)+'%',background:ORANGE,height:'100%',borderRadius:18}}/></div></div>;

const CharacterClose:React.FC<{emotion?:'tired'|'happy'|'shocked'|'annoyed'|'calm'|'thinking';t:number;left?:number;top?:number;scale?:number}> = ({
 emotion='annoyed',t,left=135,top=535,scale=1
})=><Actor x={left} y={top} w={Math.round(505*scale)}
 expression={emotion==='tired'||emotion==='calm'?'sleepy':emotion==='shocked'?'surprised':emotion==='happy'?'happy':emotion==='thinking'?'thinking':'annoyed'}
 tilt={emotion==='calm'?-14:emotion==='shocked'?-18:emotion==='tired'?16:9}
 lean={emotion==='calm'?-14:emotion==='tired'?19:3}
 arm={emotion==='shocked'?76:emotion==='calm'?-18:50} leftArm={emotion==='shocked'?-55:4}
 look={emotion==='calm'?-7:Math.sin(t*3)*7} scarf={Math.sin(t*5)*8}/>;

const scenery=(t:number,ret=false,night=false)=><Stage night={night} zoom={1.02}>
 <StreetWorld progress={clamp(t/(ret?3.95:4.95))} returning={ret} dusk={night} velocity={1}/>
 </Stage>;

const windowScene=(t:number,ret=false,minutes='23 MIN',night=false)=><WindowCabin t={t} returning={ret} minutes={minutes} night={night}/>;

const FoldHero:React.FC<{t:number}> = ({t})=>{
 const fold=ease((t-1.5)/3.15);
 const bounce=Math.sin(clamp((t-1.5)/3)*Math.PI)*8;
 const panelW=184;
 return <>
  <SceneNote top={264}>JARAK YANG SAMA, RASA YANG BEDA</SceneNote>
  <div style={{position:'absolute',left:74,top:350,width:934,height:835,border:'9px solid '+INK,
   borderRadius:40,background:'#D9E3D6',overflow:'hidden',boxShadow:'16px 19px 0 rgba(32,37,31,.12)'}}>
   <div style={{position:'absolute',left:0,top:15,width:940,height:210,background:'linear-gradient(#D0DACE,#E6E7D4)'}}/>
   <div style={{position:'absolute',left:45,top:220,width:850,height:290,
    display:'flex',justifyContent:'center',alignItems:'center',perspective:850}}>
     {[...landmarkOrder].reverse().map((kind,i)=>{
       const direction=i%2?-1:1;
       const individual=ease((fold-i*.085)/.65);
       const w=lerp(panelW,65,individual);
       return <div key={kind} style={{position:'relative',height:300,width:w,
         overflow:'hidden',marginLeft:-2,borderLeft:'5px solid rgba(32,37,31,.28)',
         background:i%2?'#C7D6C7':'#E9E2D0',transform:'rotateY('+(direction*individual*57)+'deg)',
         boxShadow:fold>.2?'inset -10px 0 18px rgba(32,37,31,.15)':'none'}}>
        <Landmark kind={kind} x={-10} y={-1} s={.64}/>
       </div>;
     })}
   </div>
   <svg style={{position:'absolute',left:76,top:512}} width="785" height="145" viewBox="0 0 785 145">
     <path d={'M20 72 H'+(765-480*fold)} stroke={INK} strokeWidth="25" strokeLinecap="round"
      strokeDasharray="36 23"/>
     <path d={'M20 72 H'+(765-480*fold)} stroke={ORANGE} strokeWidth="9" strokeLinecap="round"
      strokeDasharray="42 17" strokeDashoffset={-fold*200}/>
   </svg>
   <div style={{position:'absolute',left:70,top:659,fontSize:29,fontWeight:950,color:GREEN}}>TUJUAN</div>
   <div style={{position:'absolute',right:64,top:659,fontSize:29,fontWeight:950,color:GREEN}}>RUMAH</div>
   <Bus x={225} y={427-bounce} returning relaxed/>
   <div style={{position:'absolute',left:285,top:745,width:383,height:64,borderRadius:19,
     background:BG,border:'6px solid '+INK,textAlign:'center',fontSize:30,fontWeight:950,
     lineHeight:'53px',color:ORANGE}}>JARAK = TETAP SAMA</div>
  </div>
  {fold>.25&&<div style={{position:'absolute',left:622,top:324,fontWeight:950,fontSize:75,
   color:ORANGE,rotate:'-11deg',zIndex:40}}>ZIP!</div>}
 </>;
};

const HalfJourney:React.FC<{y:number;ret?:boolean;t:number}> = ({y,ret=false,t})=>
 <div style={{position:'absolute',left:96,top:y,width:866,height:270,
  border:'7px solid '+INK,borderRadius:35,background:ret?'#E0E9DC':'#F7E9D2',overflow:'hidden'}}>
 <div style={{position:'absolute',top:19,left:27,fontSize:39,fontWeight:950,color:ret?GREEN:ORANGE}}>{ret?'PULANG':'PERGI'}</div>
 <svg style={{position:'absolute',left:45,top:80}} width="770" height="145">
 <path d="M43 83 H730" stroke={INK} strokeWidth="11" strokeLinecap="round"/>
 <circle cx="43" cy="83" r="19" fill={ret?ORANGE:GREEN}/><circle cx="730" cy="83" r="19" fill={ret?GREEN:ORANGE}/>
 <circle cx={lerp(43,730,ease(t/2.8))} cy="83" r="29" fill={ORANGE} stroke={INK} strokeWidth="7"/>
 </svg>
 <div style={{position:'absolute',right:42,top:24,fontSize:40,fontWeight:950,color:INK}}>23 MIN</div>
 <Actor x={ret?570:545} y={93} w={138} expression={ret?'happy':'annoyed'} tilt={ret?-13:13}/>
 </div>;

const House:React.FC<{x?:number;y?:number;scale?:number}> = ({x=490,y=465,scale=1})=>
 <svg width={490*scale} height={520*scale} viewBox="0 0 490 520" style={{position:'absolute',left:x,top:y}}>
 <path d="M31 208 L238 31 L461 208" stroke={INK} strokeWidth="16" fill="#DDA57C" strokeLinejoin="round"/>
 <rect x="75" y="201" width="335" height="282" rx="18" fill="#D1DCCC" stroke={INK} strokeWidth="13"/>
 <rect x="204" y="289" width="107" height="194" rx="10" fill="#BC8B69" stroke={INK} strokeWidth="10"/>
 <circle cx="288" cy="386" r="8" fill={PAPER}/><rect x="105" y="263" width="73" height="100" rx="7" fill="#B9E2D9" stroke={INK} strokeWidth="8"/>
 <path d="M144 266 V361 M107 317 H177" stroke={INK} strokeWidth="7"/></svg>;

const Scissor:React.FC<{t:number}> = ({t})=><svg width="355" height="380" viewBox="0 0 355 380"
 style={{position:'absolute',left:495,top:694,transform:'rotate('+(-18+Math.sin(t*5)*12)+'deg)'}}>
 <g fill="none" stroke={INK} strokeLinecap="round" strokeWidth="18">
 <circle cx="72" cy="260" r="48" fill="#E8B9A3"/><circle cx="197" cy="284" r="48" fill="#E8B9A3"/>
 <path d="M107 226 L302 55 M168 246 L297 60"/>
 </g><circle cx="167" cy="214" r="16" fill={ORANGE} stroke={INK} strokeWidth="7"/></svg>;

const Frame:React.FC<{id:SceneId;t:number}> = ({id,t})=>{
 switch(id){
 case 'opening':return <>
  <SceneNote night>COBA DIPIKIR · 005</SceneNote>
  <TextFocus night size={71}>PERGI KOK<br/><span style={{color:'#FFC18E'}}>LAMA BANGET?</span></TextFocus>
  <div style={{position:'absolute',inset:0,transform:'scale('+(1+.055*ease(t/3.35))+')',transformOrigin:'55% 65%'}}>{windowScene(t,false,'23 MIN',true)}</div>
  <div style={{position:'absolute',left:790,top:455,width:65,height:500,background:'rgba(252,193,131,.08)',
   transform:'translateX('+Math.sin(t*2)*70+'px)'}}/>
 </>;
 case 'clock':return <>
   <SceneNote>JAM YANG CURIGA</SceneNote>
   <div style={{position:'absolute',left:115,top:442,width:805,height:350,background:BG,
    border:'11px solid '+INK,borderRadius:56,boxShadow:'14px 17px 0 rgba(32,37,31,.11)',
    display:'flex',alignItems:'center',justifyContent:'center'}}>
    <div style={{fontSize:177,fontWeight:950,letterSpacing:-9,color:INK}}>
      {t<1.48?'15:07':'15:08'}
    </div>
   </div>
   <CharacterClose t={t} emotion={t>1.53?'annoyed':'thinking'} left={318} top={808} scale={.72}/>
   {t>1.6&&<Pill x={690} y={965}>...SERIUS?</Pill>}
 </>;
 case 'outbound':return <>
   <SceneNote>PERGI · SISI JALAN</SceneNote>
   <TextFocus size={62}>RASANYA <span style={{color:ORANGE}}>PANJANG.</span></TextFocus>
   {scenery(t,false,false)}
   <div style={{position:'absolute',left:120,top:1255,width:850,height:26,
      background:'#B5C4B4',borderRadius:13,overflow:'hidden'}}>
     <div style={{height:'100%',width:(20+Math.round(t*7))+'%',background:ORANGE,borderRadius:13}}/>
   </div>
 </>;
 case 'checks':{
   const phase=Math.floor(t/.82)%4;
   return <>
    <SceneNote>ARE WE THERE YET?</SceneNote>
    {phase===0?<><CharacterClose t={t} emotion="annoyed"/><Phone minutes="17 MIN" x={536} y={551}/></>:
     phase===1?<WindowCabin t={t} showPhone={false}/>:
     phase===2?<><MapBoard progress={.35} small/><Pill x={622} y={1070}>17 MIN</Pill></>:
     <><CharacterClose t={t} emotion="annoyed" left={90} top={590} scale={.76}/><Phone minutes="16 MIN" x={505} y={545} scale={1.05}/></>}
    {t>2.75&&<Pill x={675} y={1187}>...</Pill>}
   </>;
 }
 case 'arrival':return <>
    <SceneNote>AKHIRNYA!</SceneNote>
    <Stage top={448}>
      <div style={{width:1080,height:810,background:'linear-gradient(#C8DBCE,#F2E4CD)'}}/>
      <Landmark kind="mini" x={400} y={205} s={1.13}/>
      <Actor x={150} y={253} w={403} expression="excited" tilt={-12} arm={-55} leftArm={60}/>
      <Pill x={710} y={154}>TUJUAN</Pill>
    </Stage>
 </>;
 case 'return':return <>
   <SceneNote>SORE HARINYA</SceneNote>
   <TextFocus size={64}>PULANG. <span style={{color:ORANGE}}>23 MENIT.</span></TextFocus>
   <Stage night zoom={1.05}>
     <StreetWorld progress={0} dusk returning/>
   </Stage>
   <Phone minutes="23 MIN" x={663} y={827} rotate={6} scale={.78}/>
 </>;
 case 'flow':return <>
   <SceneNote night>PULANG · LANDMARK YANG SAMA</SceneNote>
   <TextFocus night size={64}>TAPI KOK <span style={{color:'#FFC18E'}}>ENTENG?</span></TextFocus>
   {t<2.65?scenery(t,true,true):<WindowCabin t={t} returning showPhone={false} night/>}
   {t<2.65&&<Pill x={724} y={1166} dark color="#F9B88D">PULANG</Pill>}
 </>;
 case 'fold':return <FoldHero t={t}/>;
 case 'effect':return <>
   <SceneNote>RETURN TRIP EFFECT</SceneNote>
   <TextFocus size={59}>DUA PERJALANAN.<br/><span style={{color:ORANGE}}>WAKTU SAMA.</span></TextFocus>
   <HalfJourney y={590} t={t}/>
   <HalfJourney y={912} t={t} ret/>
 </>;
 case 'scissors':return <>
   <SceneNote>BUKAN TRIK FISIKA</SceneNote>
   <TextFocus size={64}>JALANNYA NGGAK<br/><span style={{color:ORANGE}}>DIPOTONG.</span></TextFocus>
   <Stage top={440} zoom={1.08}><StreetWorld progress={.23} dusk={false} withVehicle={false}/></Stage>
   <svg width="920" height="315" viewBox="0 0 920 315"
   style={{position:'absolute',left:73,top:912}}>
    <path d="M15 196 H906" stroke="#B4C0B0" strokeWidth="115" strokeLinecap="round"/>
    <path d="M15 196 H906" stroke={INK} strokeWidth="9" strokeDasharray="33 29"/>
   </svg>
   <CharacterClose t={t} emotion={t>1.5?'shocked':'thinking'} left={80} top={549} scale={.92}/>
   <Scissor t={t}/>
 </>;
 case 'expect':return <>
   <SceneNote>TERKADANG, KITA TERLALU OPTIMISTIS</SceneNote>
   <TextFocus size={65}>“OH, <span style={{color:ORANGE}}>SEBENTAR.</span>”</TextFocus>
   <Stage top={483}>
    <StreetWorld progress={clamp(t/6)} withVehicle={false}/>
    <div style={{position:'absolute',top:625,left:0,width:Math.round(500+Math.max(0,t-1.4)*190),
     height:75,background:'#A9B7A5',borderRadius:29}}/>
    <Actor x={120} y={267} w={415} expression={t>2.5?'worried':'curious'}
     tilt={t>2.5?15:-6} arm={t>2.5?48:16} look={t>2.5?10:-8}/>
    <div style={{position:'absolute',top:60,right:105,width:265,height:119,
     borderRadius:32,border:'8px solid '+INK,background:BG,fontSize:47,
     fontWeight:950,textAlign:'center',lineHeight:'105px'}}>20 MIN</div>
   </Stage>
   {t>2.55&&<Pill x={599} y={1140}>KOK PANJANG?</Pill>}
 </>;
 case 'adjust':return <>
   <SceneNote>SETELAH PERGI, EKSPEKTASI IKUT BERUBAH</SceneNote>
   <TextFocus size={64}>“OH… KIRA-KIRA <span style={{color:ORANGE}}>SEGINI.</span>”</TextFocus>
   <WindowCabin t={t} returning showPhone={false}/>
   <Gauge x={164} y={1149} width={759} label="PERKIRAAN WAKTU" fill={lerp(.48,.92,ease(t/3.5))}/>
 </>;
 case 'alternate':return <>
   <SceneNote>BUKAN HARUS HAFAL JALAN</SceneNote>
   <MapBoard progress={clamp(t/3.45)} alternate={t>1.55}/>
   <Pill x={130} y={1166} size={28}>RUTE PULANG BISA BERBEDA</Pill>
 </>;
 case 'unknown':return <>
   <SceneNote>PERGI TERASA BELUM PASTI</SceneNote>
   <WindowCabin t={t} returning={t>1.7} showPhone={false}/>
   {Array.from({length:6},(_,i)=><div key={i} style={{
    position:'absolute',left:170+(i%3)*243,top:490+Math.floor(i/3)*250,
    fontSize:100,fontWeight:950,color:ORANGE,
    opacity:clamp(1-(t-1.0)*1.2)*(i%2?.65:.9),
    transform:'translateY('+(-t*27)+'px)'}}>?</div>)}
   {t>1.8&&<Pill x={538} y={1099} color={GREEN} size={28}>RUMAH SUDAH TERBAYANG</Pill>}
 </>;
 case 'montage':{
   const p=Math.floor(t/.65);
   return <>
     <SceneNote>GANTI VIEW, WAKTU TETAP SAMA</SceneNote>
     {p===0?<WindowCabin t={t} returning night showPhone={false}/>:
      p===1?<Stage><svg width="1080" height="800"><path d="M0 260 H1100 M0 660 H1100" stroke="#8CA497" strokeWidth="60"/><path d="M0 468 H1100" stroke={INK} strokeWidth="16" strokeDasharray="90 60" strokeDashoffset={t*660}/></svg>
       <div style={{position:'absolute',left:340,top:196,width:395,height:395,borderRadius:'50%',border:'44px solid #364A41',
       background:'#D7DECC',boxShadow:'inset 0 0 0 31px '+INK,rotate:(t*225)+'deg'}}/></Stage>:
      p===2?<MapBoard progress={.76} small/>:
      <><CharacterClose t={t} emotion="calm" left={225} top={492} scale={1}/><Pill x={663} y={1083}>75% → 100%</Pill></>}
   </>;
 }
 case 'compare':return <>
   <SceneNote>BUKAN JARAKNYA</SceneNote>
   <TextFocus size={63}>YANG BERUBAH:<br/><span style={{color:ORANGE}}>RASANYA.</span></TextFocus>
   <HalfJourney t={0.3} y={590}/>
   <HalfJourney t={0.3} y={914} ret/>
 </>;
 case 'home':return <>
   <SceneNote>23 MENIT KEMUDIAN...</SceneNote>
   <House x={405} y={518} scale={.89}/>
   <CharacterClose t={t} emotion="happy" left={90} top={656} scale={.7}/>
   <Pill x={561} y={1151} color={GREEN}>SAMPAI RUMAH!</Pill>
 </>;
 case 'forgotten':{
   const stretch=ease((t-.55)/1.1);
   return <>
    <SceneNote>OH. ADA YANG TERTINGGAL.</SceneNote>
    <House x={560} y={610} scale={.62}/>
    <CharacterClose t={t} emotion={t>.65?'shocked':'calm'} left={80} top={526} scale={.88}/>
    <svg width="950" height="280" viewBox="0 0 950 280" style={{position:'absolute',left:72,top:1050}}>
      <path d={'M65 135 Q'+(300+stretch*240)+' '+(150-stretch*140)+' '+(480+stretch*400)+' 135'}
      fill="none" stroke={INK} strokeWidth="22" strokeLinecap="round" strokeDasharray="35 25"/>
    </svg>
    <Pill x={609} y={911}>23 MIN?!</Pill>
    {t>.4&&<div style={{position:'absolute',left:688,top:502,width:190,height:118,
     border:'7px solid '+INK,background:BG,borderRadius:33,
     textAlign:'center',fontSize:76,fontWeight:950,color:ORANGE}} ><svg width="135" height="90" viewBox="0 0 135 90"><path d="M36 30 Q38 5 68 5 Q98 5 100 30" fill="none" stroke={INK} strokeWidth="10"/><rect x="16" y="29" width="104" height="57" rx="13" fill={ORANGE} stroke={INK} strokeWidth="9"/><rect x="55" y="45" width="26" height="19" rx="6" fill={PAPER}/></svg></div>}
   </>;
 }
 case 'brand':return <>
   <div style={{position:'absolute',left:142,top:448,width:802,height:758,borderRadius:'50%',background:'#E6DCCA'}}/>
   <img src={publicAsset('brand/coba-dipikir-logo.webp')} style={{position:'absolute',
    left:350,top:560,width:380,height:355,objectFit:'contain'}}/>
   <div style={{position:'absolute',left:96,right:96,top:941,textAlign:'center',
    fontSize:98,fontWeight:950,letterSpacing:-5}}>coba <span style={{color:ORANGE}}>dipikir.</span></div>
   <div style={{position:'absolute',left:100,right:100,top:1068,textAlign:'center',
    fontSize:36,color:GREEN,fontWeight:750}}>Yang biasa, belum tentu sederhana.</div>
   <svg width="840" height="150" style={{position:'absolute',left:116,top:1190}}>
    <path d="M0 95 H840" fill="none" stroke={INK} strokeWidth="9" strokeDasharray="25 25"/></svg>
   <Actor x={690-t*64} y={1130} w={143} expression="worried" tilt={15} lean={17} walk={t*3}/>
   <Pill x={159} y={1182} size={24}>EPISODE 005</Pill>
 </>;
 }
 return null;
};

export const Episode5Visuals:React.FC=()=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),time=frame/fps;
 const scene=scenePlan.find(s=>time>=s.start&&time<s.end)??scenePlan[scenePlan.length-1];
 const t=Math.max(0,time-scene.start);
 const night=['opening','flow','return'].includes(scene.id);
 const cut=ease(t/.17);
 const view=['outbound','flow','return','fold','montage'].includes(scene.id);
 return <Film night={night}>
  <div style={{position:'absolute',left:94,top:178,right:125,zIndex:60,display:'flex',alignItems:'center',
    justifyContent:'space-between',color:night?'#EDD9C8':GREEN,fontSize:23,fontWeight:950,letterSpacing:2.8}}>
    <span>COBA DIPIKIR</span><span>EP. 005</span>
  </div>
  <Frame id={scene.id} t={t}/>
  {/* Motion transition is a passing post/vehicle pillar, not a global opacity fade. */}
  {time>0&&t<.17&&<div style={{position:'absolute',zIndex:90,top:230,left:lerp(-190,1220,cut)-55,
    height:1160,width:view?158:95,background:night?'#253B34':'#6E8D79',
    border:'12px solid '+INK,borderRadius:30,transform:'rotate(4deg)',pointerEvents:'none'}}/>}
 </Film>;
};
