import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {brand} from '../../brand/tokens';
import {Character,type CharacterExpression} from '../002-kulkas/Character';

export const PAPER=brand.colors.paper, INK=brand.colors.ink, ORANGE=brand.colors.orange, GREEN=brand.colors.green;
export const FONT=brand.fontFamily;
export const clamp=(n:number)=>Math.max(0,Math.min(1,n));
export const ease=(n:number)=>{const a=clamp(n);return a*a*(3-2*a);};
export const lerp=(a:number,b:number,t:number)=>a+(b-a)*clamp(t);
export const heroShadow='0 12px 0 rgba(32,37,31,.10)';
const B='#FFFDF8', M='#BFCBBF';

export const Film:React.FC<{children:React.ReactNode;night?:boolean}> = ({children,night=false})=>
 <AbsoluteFill style={{background:night?'#273432':PAPER,overflow:'hidden',color:night?B:INK,fontFamily:FONT}}>
  <div style={{position:'absolute',inset:0,background:night?
  'radial-gradient(ellipse at 54% 30%,#55695C 0%,#273432 68%,#1D2928 100%)':
  'radial-gradient(ellipse at 45% 30%,#FFFDF7 0%,#F6F0E5 75%,#ECE0CD 100%)'}}/>
  <div style={{position:'absolute',left:0,top:1550,width:1080,height:370,background:night?'#273432':PAPER}}/>
  {children}
 </AbsoluteFill>;

export const SceneNote:React.FC<{children:React.ReactNode;night?:boolean;top?:number}> = ({children,night=false,top=282})=>
 <div style={{position:'absolute',left:94,top,width:780,color:night?'#F8DEC3':GREEN,fontSize:26,
 fontWeight:900,letterSpacing:2.4,lineHeight:1.2,zIndex:31,textTransform:'uppercase'}}>{children}</div>;

export const TextFocus:React.FC<{children:React.ReactNode;night?:boolean;top?:number;size?:number}> = ({children,night=false,top=332,size=74})=>
 <div style={{position:'absolute',left:94,top,right:148,fontWeight:950,fontSize:size,lineHeight:1.08,
 letterSpacing:-3.5,color:night?B:INK,zIndex:31,textShadow:night?'0 4px 10px rgba(0,0,0,.22)':'none'}}>{children}</div>;

export const Actor:React.FC<{
 x:number;y:number;w:number;expression?:CharacterExpression;tilt?:number;lean?:number;arm?:number;
 leftArm?:number;look?:number;walk?:number;bob?:number;scarf?:number;flip?:boolean
}> = ({x,y,w,expression='neutral',tilt=0,lean=0,arm=-12,leftArm=12,look=0,walk=0,bob=0,scarf=0,flip=false})=>{
 const frame=useCurrentFrame();
 return <Character left={x} top={y} width={w} expression={expression} headTilt={tilt}
  lean={lean} rightArm={arm} leftArm={leftArm} gazeX={look} step={walk}
  bob={bob+Math.sin(frame/17)*2} scarfSwing={scarf+Math.sin(frame/12)*3}
  blink={frame%127>121?1:0} flip={flip}/>;
};

export type LandmarkType='mini'|'tree'|'flyover'|'billboard'|'halte';
export const landmarkOrder:ReadonlyArray<LandmarkType>=['mini','tree','flyover','billboard','halte'];

export const Landmark:React.FC<{kind:LandmarkType;x:number;y:number;s?:number;dusk?:boolean}> = ({
 kind,x,y,s=1,dusk=false
})=>{
 const outline={stroke:INK,strokeWidth:7,strokeLinejoin:'round' as const,strokeLinecap:'round' as const};
 return <svg width={Math.round(380*s)} height={Math.round(330*s)}
  viewBox="0 0 380 330" style={{position:'absolute',left:x,top:y,overflow:'visible'}}>
  {kind==='mini'&&<>
    <rect x="28" y="91" width="318" height="203" rx="12" fill={dusk?'#7A8A80':'#D6D9CB'} {...outline}/>
    <rect x="45" y="145" width="286" height="34" rx="4" fill={ORANGE} {...outline}/>
    {Array.from({length:6},(_,i)=><path key={i} d={'M'+(51+i*46)+' 148 v29'} stroke={PAPER} strokeWidth="13"/>)}
    <rect x="70" y="203" width="86" height="91" rx="7" fill="#8EA8A0" {...outline}/>
    <rect x="198" y="199" width="103" height="65" rx="8" fill={B} {...outline}/>
    <rect x="80" y="72" width="224" height="66" rx="14" fill={GREEN} {...outline}/>
    <text x="192" y="115" fill={B} textAnchor="middle" fontWeight="950" fontSize="36" fontFamily={FONT}>MINI</text>
  </>}
  {kind==='tree'&&<>
    <path d="M189 297 L187 153 M190 219 L141 176 M190 192 L242 152" fill="none" stroke={INK} strokeWidth="22" strokeLinecap="round"/>
    <path d="M190 298 L187 153 M190 219 L141 176 M190 192 L242 152" fill="none" stroke="#C18A59" strokeWidth="12" strokeLinecap="round"/>
    <path d="M77 151 C35 103 66 46 120 55 C141 3 218 10 234 50 C296 23 353 106 301 160 C312 225 239 251 193 222 C133 257 62 213 77 151 Z"
      fill={dusk?'#638B73':'#83A98B'} {...outline}/>
    <path d="M111 110 C141 65 197 66 211 92 M261 117 Q282 145 262 168" fill="none" stroke="#C2D8B5" strokeWidth="11" strokeLinecap="round"/>
  </>}
  {kind==='flyover'&&<>
    <path d="M0 144 Q169 65 380 136 L380 187 Q185 121 0 195 Z" fill="#B6BFB5" {...outline}/>
    {[52,160,271].map((n)=><path key={n} d={'M'+n+' 170 V297'} stroke="#87958E" strokeWidth="27"/>)}
    <path d="M7 152 Q173 73 376 141" fill="none" stroke={PAPER} strokeWidth="9" strokeDasharray="30 23"/>
    <rect x="109" y="217" width="165" height="73" rx="15" fill="#DEE4D8" {...outline}/>
    <path d="M145 215 v79 M240 215 v79" stroke="#A3B1A9" strokeWidth="7"/>
  </>}
  {kind==='billboard'&&<>
    <path d="M187 295 V119 M125 295 H252" stroke="#7B9080" strokeWidth="21" strokeLinecap="round"/>
    <rect x="32" y="36" width="321" height="178" rx="13" fill={ORANGE} {...outline}/>
    <path d="M75 137 Q140 60 200 133 T313 115" fill="none" stroke={PAPER} strokeWidth="18" strokeLinecap="round"/>
    <circle cx="270" cy="83" r="18" fill={PAPER}/>
    <rect x="71" y="159" width="100" height="13" rx="7" fill={PAPER}/>
  </>}
  {kind==='halte'&&<>
    <path d="M40 126 Q183 39 332 122" stroke={INK} strokeWidth="13" fill="none" strokeLinecap="round"/>
    <path d="M50 122 Q190 65 321 125" stroke={GREEN} strokeWidth="26" fill="none" strokeLinecap="round"/>
    <path d="M76 137 V291 M302 138 V291 M44 292 H345" stroke={INK} strokeWidth="13" strokeLinecap="round"/>
    <rect x="104" y="180" width="153" height="76" rx="9" fill="#C9D8CD" stroke={INK} strokeWidth="7"/>
    <path d="M119 240 H260" stroke={ORANGE} strokeWidth="10"/>
    <rect x="277" y="58" width="62" height="52" rx="9" fill={ORANGE} {...outline}/>
    <text x="308" y="95" textAnchor="middle" fill={PAPER} fontWeight="900" fontSize="31">H</text>
  </>}
 </svg>;
};

const wrap=(a:number,m:number)=>((a%m)+m)%m;
export const StreetWorld:React.FC<{progress:number;returning?:boolean;dusk?:boolean;velocity?:number;withVehicle?:boolean}> = ({
 progress,returning=false,dusk=false,velocity=1,withVehicle=true
})=>{
 const p=clamp(progress);const order=returning?[...landmarkOrder].reverse():[...landmarkOrder];
 const travel=p*(returning?3450:2870)*velocity;
 return <div style={{position:'absolute',left:0,top:0,width:1080,height:970,overflow:'hidden',
 background:dusk?'linear-gradient(#556A65 0%,#B6B2A0 65%,#D6C7AC 100%)':
 'linear-gradient(#CBDDD5 0%,#F1E7D2 70%,#F7E8D1 100%)'}}>
   <div style={{position:'absolute',top:90,right:83,width:131,height:131,borderRadius:'50%',
    background:dusk?'#F2BB83':'#F4D48F',boxShadow:'0 0 70px rgba(255,206,145,.36)'}}/>
   {Array.from({length:14},(_,i)=>{
     const x=wrap(i*193-travel*.18,3000)-220;
     const h=120+(i*61)%220;
     return <div key={'sky'+i} style={{position:'absolute',left:x,top:445-h,width:126+(i%3)*18,height:h+282,
      borderRadius:'20px 20px 0 0',background:dusk?'#668179':'#B7C8BC',
      opacity:.74,border:'5px solid rgba(32,37,31,.11)',boxSizing:'border-box'}}>
      {Array.from({length:6},(_,j)=><div key={j} style={{position:'absolute',left:20+(j%2)*40,top:25+Math.floor(j/2)*65,
      width:17,height:28,background:dusk?'#EFCA99':'#EFF2DD',opacity:.6,borderRadius:4}}/>)}
     </div>;
   })}
   <div style={{position:'absolute',top:640,width:1080,height:330,background:dusk?'#707C70':'#959D90'}}/>
   <div style={{position:'absolute',top:742,width:1080,borderTop:'8px dashed #EDE3CB'}}/>
   {order.map((kind,i)=><Landmark key={kind} kind={kind} x={i*585+110-travel*.78} y={395} s={1.0} dusk={dusk}/>)}
   {Array.from({length:16},(_,i)=>{
    const x=wrap(i*235-travel*1.43,3900)-185;
    return <g key={i}>
      <div style={{position:'absolute',left:x,top:160,width:17,height:790,borderRadius:15,
       background:dusk?'#263B38':'#62776C',boxShadow:'10px 0 0 rgba(255,255,255,.12)'}}/>
      <div style={{position:'absolute',left:x-12,top:148,width:83,height:24,borderRadius:14,
       background:dusk?'#F5C88F':'#394E46',transform:'rotate(7deg)'}}/>
    </g>;
   })}
   {withVehicle&&<Bus x={102} y={476} returning={returning} relaxed={returning} dusk={dusk}/>}
 </div>;
};

export const Bus:React.FC<{x:number;y:number;returning?:boolean;relaxed?:boolean;dusk?:boolean}> = ({
 x,y,returning=false,relaxed=false,dusk=false
})=><div style={{position:'absolute',left:x,top:y,width:870,height:370}}>
 <div style={{position:'absolute',top:42,left:18,width:810,height:277,background:dusk?'#E2DBCC':'#F7F2E3',
   border:'11px solid '+INK,borderRadius:'55px 84px 30px 30px',boxShadow:heroShadow}}/>
 <div style={{position:'absolute',top:88,left:85,width:610,height:160,borderRadius:26,
   background:dusk?'#9AB4AE':'#BFD7C9',border:'9px solid '+INK,overflow:'hidden'}}>
    {[130,330,525].map(n=><div key={n} style={{position:'absolute',left:n,top:0,height:166,width:9,background:INK}}/>)}
    <Actor x={210} y={-55} w={239} expression={relaxed?'sleepy':'annoyed'} tilt={relaxed?-11:8}
      lean={relaxed?-9:8} arm={relaxed?15:55} look={relaxed?-5:9} scarf={relaxed?5:19}/>
 </div>
 <div style={{position:'absolute',left:60,top:267,width:720,height:24,background:ORANGE,borderRadius:12}}/>
 {[168,673].map(x0=><div key={x0} style={{position:'absolute',left:x0,top:278,width:112,height:112,borderRadius:'50%',
   background:'#303A36',border:'12px solid '+INK,boxSizing:'border-box',boxShadow:'inset 0 0 0 20px #C6D1C7'}}/>)}
 <div style={{position:'absolute',left:760,top:172,width:48,height:35,background:'#FFD6A3',borderRadius:13}}/>
 </div>;

export const WindowCabin:React.FC<{t:number;returning?:boolean;minutes?:string;showPhone?:boolean;night?:boolean}> = ({
 t,returning=false,minutes='23 MIN',showPhone=true,night=false
})=>{
 const look=returning?-8:(Math.sin(t*2)>0?10:-7);
 return <div style={{position:'absolute',left:0,top:395,width:1080,height:951,overflow:'hidden',
  border:'none',borderRadius:0,
  background:night?'#556B62':'#C3D6C7',boxShadow:'none'}}>
  <div style={{position:'absolute',left:519,top:52,width:505,height:730,overflow:'hidden',
    background:night?'#4C6866':'#C9DCCF',border:'11px solid '+INK,borderRadius:37}}>
    <StreetWorld progress={wrap(t*.16,1)} returning={returning} dusk={night} withVehicle={false}/>
    <div style={{position:'absolute',left:198,top:0,width:17,height:620,background:'#9AABA0',opacity:.8}}/>
  </div>
  <div style={{position:'absolute',left:0,top:705,width:1080,height:245,background:night?'#43534E':'#C7B9A3'}}/>
  <div style={{position:'absolute',left:42,top:660,width:510,height:285,
     background:'#879D8E',border:'10px solid '+INK,borderRadius:'140px 140px 10px 10px'}}/>
  <Actor x={60} y={115} w={532} expression={returning?'sleepy':t>1.9?'annoyed':'curious'}
   tilt={returning?-14:t>1.9?9:-5} lean={returning?-15:t>1.9?8:0}
   arm={showPhone?62:returning?4:30} look={look} scarf={returning?4:12}/>
  {showPhone&&<div style={{position:'absolute',left:394,top:577,width:159,height:251,
    transform:'rotate(-12deg)',background:'#283832',borderRadius:23,border:'8px solid '+INK,
    boxShadow:'7px 13px 0 rgba(0,0,0,.13)'}}>
    <div style={{position:'absolute',inset:12,background:PAPER,borderRadius:12,paddingTop:30,textAlign:'center'}}>
      <div style={{fontSize:23,color:GREEN,fontWeight:950}}>RUTE</div>
      <div style={{fontSize:33,color:ORANGE,fontWeight:950,whiteSpace:'nowrap'}}>{minutes}</div>
      <svg width="105" height="72"><path d="M15 48 L36 21 L68 46 L91 12" fill="none" stroke={ORANGE} strokeWidth="7" strokeLinecap="round"/>
      <circle cx="15" cy="48" r="8" fill={INK}/><circle cx="91" cy="12" r="8" fill={INK}/></svg>
    </div>
  </div>}
 </div>;
};

export const MapBoard:React.FC<{progress?:number;alternate?:boolean;reversed?:boolean;small?:boolean}> = ({
 progress=0,alternate=false,reversed=false,small=false
})=>{
 // A real full-stage aerial camera, never a tiny card abandoned at the top.
 const p=clamp(progress);
 const route=alternate?'M143 692 C302 571 392 433 515 474 S727 320 868 196':
                       'M143 692 C302 573 393 656 518 514 S736 293 868 196';
 const posX=lerp(reversed?868:143,reversed?143:868,p);
 const posY=lerp(reversed?196:692,reversed?692:196,p)+Math.sin(p*8)*37;
 return <div style={{position:'absolute',left:44,top:391,width:991,height:940,
 overflow:'hidden',borderRadius:40,boxSizing:'border-box',
 border:'9px solid '+INK,background:'#E7ECDD',boxShadow:'11px 13px 0 rgba(32,37,31,.10)'}}>
  <svg viewBox="0 0 1000 920" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
   <rect width="1000" height="920" fill="#E6ECDD"/>
   <g fill="none" stroke="#F8F3E7" strokeWidth="74" opacity=".95">
    <path d="M-48 205 L1060 138 M62 -80 L292 1030 M515 -120 L359 980 M816 -70 L1030 980"/>
    <path d="M-40 590 Q525 620 1045 550 M-40 820 L1050 730"/>
   </g>
   <g fill="none" stroke="#AABFB0" strokeWidth="5" opacity=".76">
    <path d="M-48 205 L1060 138 M62 -80 L292 1030 M515 -120 L359 980 M816 -70 L1030 980"/>
    <path d="M-40 590 Q525 620 1045 550 M-40 820 L1050 730"/>
   </g>
   {Array.from({length:16},(_,i)=>{
    const x=68+(i%4)*218+((i%2)*35);
    const y=48+Math.floor(i/4)*205;
    return <g key={i} transform={'translate('+x+','+y+')'} opacity={.88}>
      <rect x="0" y="0" width={103+(i%3)*17} height={89+(i%2)*33} rx="12"
       fill={i%3===0?'#D2B9A0':i%3===1?'#CAD9C5':'#B6CBBF'} stroke="#779486" strokeWidth="5"/>
      <rect x="16" y="15" width="20" height="12" rx="3" fill="#FFF8E9"/>
      <rect x="58" y="15" width="22" height="12" rx="3" fill="#FFF8E9"/>
    </g>;
   })}
   {[{x:136,y:318},{x:700,y:633},{x:885,y:787},{x:77,y:771}].map(({x,y},i)=>
     <g key={i} transform={'translate('+x+','+y+')'}>
      <circle r="45" fill="#83A98B" stroke="#5C8368" strokeWidth="7"/>
      <circle cx="-21" cy="-13" r="22" fill="#B4D5AB"/>
      <circle cx="21" cy="16" r="20" fill="#639779"/>
     </g>)}
   <path d={route} fill="none" stroke="#FDF9EE" strokeWidth="55" strokeLinecap="round"/>
   <path d={route} fill="none" stroke={INK} strokeWidth="12" strokeDasharray="27 20" strokeLinecap="round"/>
   <circle cx="143" cy="692" r="29" fill={GREEN} stroke={INK} strokeWidth="9"/>
   <circle cx="868" cy="196" r="29" fill={ORANGE} stroke={INK} strokeWidth="9"/>
   <g transform={'translate('+posX+','+posY+')'}>
     <rect x="-52" y="-29" width="104" height="62" rx="13" fill={ORANGE} stroke={INK} strokeWidth="7"/>
     <rect x="-38" y="-20" width="50" height="18" rx="4" fill="#FAF6E9"/>
     <circle cx="-26" cy="35" r="13" fill={INK}/><circle cx="29" cy="35" r="13" fill={INK}/>
   </g>
   <g fill={INK} fontSize="32" fontWeight="950" fontFamily={FONT}>
    <text x="94" y="761">RUMAH</text>
    <text x="768" y="145">TUJUAN</text>
   </g>
   <rect x="48" y="37" width="229" height="62" rx="16" fill="#FFF9E8" stroke={INK} strokeWidth="6"/>
   <text x="164" y="79" textAnchor="middle" fill={ORANGE} fontSize="35" fontWeight="950" fontFamily={FONT}>23 MIN</text>
   <rect x="525" y="814" width="427" height="64" rx="16" fill="#FFF9E8" stroke={INK} strokeWidth="6"/>
   <text x="738" y="857" textAnchor="middle" fill={GREEN} fontSize="24" fontWeight="950" fontFamily={FONT}>JARAKNYA TETAP SAMA</text>
  </svg>
 </div>;
};
