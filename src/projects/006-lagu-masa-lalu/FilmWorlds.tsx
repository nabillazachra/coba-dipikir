import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../../brand/tokens';
import {Character, type CharacterExpression} from '../002-kulkas/Character';

const lerp = (a:number,b:number,t:number)=>a+(b-a)*t;
const smooth=(a:number,b:number,t:number)=>{
  const p=Math.max(0,Math.min(1,(t-a)/(b-a)));
  return p*p*(3-2*p);
};
const colors=brand.colors;
const P = {
  ink:colors.ink, paper:colors.paper, orange:colors.orange, green:colors.green,
  city:'#5B655E', cityDeep:'#354C50', dusk:'#F2B36D', wall:'#E0D6C6',
};
const windows=Array.from({length:9},(_,i)=>i);

const CharacterAt:React.FC<{
  x:number;y:number;w:number;expression?:CharacterExpression;tilt?:number;
  lean?:number;blink?:number;leftArm?:number;rightArm?:number;scarf?:number;light?:number;
}>=({x,y,w,expression='neutral',tilt=0,lean=0,blink=0,leftArm=11,rightArm=-15,scarf=0,light=0})=>
  <Character left={x} top={y} width={w} expression={expression}
    headTilt={tilt} lean={lean} blink={blink} leftArm={leftArm}
    rightArm={rightArm} scarfSwing={scarf} light={light}/>;

const BusWindow:React.FC<{sec:number;warm?:number;large?:boolean}>=({sec,warm=1,large=false})=>{
  const drift=sec*34;
  const y=large?260:360;
  const h=large?850:730;
  return <svg width="1080" height="1920" viewBox="0 0 1080 1920"
    style={{position:'absolute',inset:0,overflow:'visible'}}>
    <defs>
      <linearGradient id="e6-bus-sky" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor={warm>0.5?'#E99683':'#ACBCC0'}/>
        <stop offset=".64" stopColor={warm>0.5?'#FBC58F':'#CED8CE'}/>
        <stop offset="1" stopColor="#D8A778"/>
      </linearGradient>
      <clipPath id="e6-bus-glass"><rect x="490" y={y+16} width="690" height={h-30} rx="44"/></clipPath>
    </defs>
    <rect width="1080" height="1920" fill={warm>0.5?'#A87A68':'#A6A8A0'}/>
    <rect y="1332" width="1080" height="588" fill="#5C6663"/>
    <path d="M0 1342 L1080 1342" stroke="#354744" strokeWidth="23"/>
    <rect x="478" y={y} width="730" height={h+18} rx="58" fill="#425755" stroke="#233D3E" strokeWidth="25"/>
    <g clipPath="url(#e6-bus-glass)">
      <rect x="485" y={y} width="735" height={h} fill="url(#e6-bus-sky)"/>
      <circle cx={865-drift*.04} cy={y+222} r="100" fill="#FFE2AC" opacity=".78"/>
      {windows.map(i=><g key={i} transform={'translate('+(-drift*(0.68+(i%3)*.23))+',0)'}>
        <rect x={462+i*104} y={y+420-(i%4)*38} width={126+(i%2)*32} height="650"
          fill={i%2?'#5E6468':'#746C6C'} opacity=".75"/>
        {[0,1,2,3].map(j=><rect key={j} x={482+i*104+(j%2)*36}
          y={y+455-(i%4)*38+Math.floor(j/2)*47} width="10" height="15"
          fill="#F7DAA7" opacity={warm*.58}/>)}
      </g>)}
      <path d="M490 730 Q650 690 830 730 T1220 725" stroke="#FCE6C2" strokeWidth="8" opacity=".24" fill="none"/>
      <path d="M917 285 L1015 285 L698 1098 L645 1098 Z" fill="#FFEDC8" opacity=".13"/>
    </g>
    <path d={'M610 '+y+' V'+(y+h)} stroke="#344B4C" strokeWidth="27"/>
    <path d={'M490 '+(y+h-110)+' H1172'} stroke="#394E4A" strokeWidth="24"/>
    <path d="M0 1427 H1100" stroke="#324744" strokeWidth="20"/>
    <path d="M920 1370 V1950 M1037 1370 V1950" stroke="#2F4945" strokeWidth="25"/>
    <path d="M100 0 V440 M287 0 V364" stroke="#314744" strokeWidth="17"/>
    <g transform={'rotate('+(3.2*Math.sin(sec*1.8))+' 100 0)'}>
      <rect x="62" y="429" width="78" height="90" rx="32"
        fill="none" stroke="#35564E" strokeWidth="19"/>
    </g>
    <g transform={'rotate('+(2.6*Math.sin(sec*1.8+1))+' 287 0)'}>
      <rect x="250" y="359" width="74" height="83" rx="30"
        fill="none" stroke="#35564E" strokeWidth="18"/>
    </g>
  </svg>;
};

const Friend:React.FC<{x?:number;y?:number;scale?:number;smile?:boolean;sway?:number}>=({
  x=650,y=895,scale=1,smile=true,sway=0,
})=><div style={{position:'absolute',left:x,top:y,width:310*scale,height:610*scale,
  transform:'rotate('+sway+'deg)',transformOrigin:'50% 80%'}}>
  <svg width="100%" height="100%" viewBox="0 0 310 610" overflow="visible">
    <path d="M80 228 Q91 185 145 190 Q220 181 240 254 L238 502
      Q155 534 65 494 Z" fill="#42765B" stroke="#20251F" strokeWidth="13" strokeLinejoin="round"/>
    <path d="M100 496 L87 578 M204 496 L212 578" stroke="#20251F" strokeWidth="15" strokeLinecap="round"/>
    <path d="M84 270 Q25 308 22 359 M226 272 Q289 308 290 342"
      stroke="#20251F" strokeWidth="15" fill="none" strokeLinecap="round"/>
    <circle cx="22" cy="360" r="17" fill="#F6F0E5" stroke="#20251F" strokeWidth="8"/>
    <circle cx="289" cy="342" r="17" fill="#F6F0E5" stroke="#20251F" strokeWidth="8"/>
    <circle cx="150" cy="125" r="103" fill="#F6F0E5" stroke="#20251F" strokeWidth="13"/>
    <path d="M82 99 Q149 24 220 91" stroke="#20251F" strokeWidth="16" fill="none" strokeLinecap="round"/>
    <path d="M111 127 V139 M185 127 V139" stroke="#20251F" strokeWidth="13" strokeLinecap="round"/>
    <path d={smile?'M113 183 Q150 214 188 178':'M126 184 Q151 180 176 185'}
      fill="none" stroke="#20251F" strokeWidth="9" strokeLinecap="round"/>
    <circle cx="209" cy="145" r="15" fill="#E96B3C" stroke="#20251F" strokeWidth="6"/>
  </svg>
</div>;

const BusSeats:React.FC<{sec:number;front?:boolean}>=({sec,front=true})=>
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
    <path d="M-100 1397 Q105 1275 307 1370 L415 1920 H-120 Z"
      fill="#42766A" stroke="#202F2D" strokeWidth="17"/>
    <path d="M-42 1449 Q135 1346 294 1449" fill="none" stroke="#A4C4AE" strokeWidth="15" opacity=".7"/>
    {front&&<path d="M885 1530 Q1050 1450 1180 1547 L1180 1920 H840 Z"
      fill="#28584E" stroke="#213D37" strokeWidth="19"/>}
    <path d="M-30 1691 Q174 1599 366 1682" fill="none" stroke="#33675D" strokeWidth="18" opacity=".67"/>
    <path d={'M'+(510+Math.sin(sec*1.2)*19)+' 0 V1920'}
      stroke="#E6F6E1" strokeWidth="9" opacity=".025"/>
  </svg>;

const RoomSet:React.FC<{sec:number;lamp?:boolean;evening?:boolean}>=({sec,evening=true})=>
  <svg width="1080" height="1920" viewBox="0 0 1080 1920"
    style={{position:'absolute',inset:0}}>
    <defs>
      <linearGradient id="e6-room-wall" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#E7DED3"/>
        <stop offset="1" stopColor={evening?'#BEB0A0':'#D1CCBD'}/>
      </linearGradient>
      <linearGradient id="e6-room-window" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#9CB9B9"/>
        <stop offset="1" stopColor="#EEC6A3"/>
      </linearGradient>
    </defs>
    <rect width="1080" height="1920" fill="url(#e6-room-wall)"/>
    <rect x="0" y="1324" width="1080" height="596" fill="#8C8276"/>
    <path d="M0 1328 H1080" stroke="#554B44" strokeWidth="20"/>
    <path d="M0 1630 L1080 1550 M0 1870 L1080 1800" stroke="#E8DACC" strokeWidth="5" opacity=".18"/>
    <rect x="603" y="382" width="551" height="690" rx="27" fill="#5F6058" stroke="#45423D" strokeWidth="16"/>
    <rect x="619" y="399" width="519" height="656" rx="16" fill="url(#e6-room-window)"/>
    <circle cx="1013" cy="552" r="70" fill="#FFE0AA" opacity=".72"/>
    {windows.map(i=><rect key={i} x={626+i*67-9*Math.sin(sec*.35)}
      y={799-(i%4)*47} width="76" height="290" fill="#737976" opacity=".49"/>)}
    <path d="M845 393 V1070 M613 724 H1165" stroke="#646159" strokeWidth="17"/>
    <rect x="26" y="268" width="163" height="878" rx="10" fill="#756B60"/>
    <rect x="39" y="285" width="136" height="844" fill="#D4C1A7"/>
    {[0,1,2].map(i=><path key={i} d={'M39 '+(493+i*205)+' H178'} stroke="#6E6255" strokeWidth="17"/>)}
    {[0,1,2,3,4,5].map(i=><rect key={i} x={52+i%3*39}
      y={355+Math.floor(i/3)*425} width="24" height={89+(i%3)*22}
      rx="4" fill={i%3===0?P.orange:i%3===1?P.green:P.paper}
      stroke="#4D4A40" strokeWidth="5"/>)}
    <path d="M535 1137 H1150" stroke="#49463F" strokeWidth="30" strokeLinecap="round"/>
    <path d="M548 1155 L568 1919 H1168 V1150 Z" fill="#8A7463"/>
    <path d="M547 1154 V1919" stroke="#66584F" strokeWidth="17"/>
    <path d="M1110 1145 V1919" stroke="#66584F" strokeWidth="17"/>
    <rect x="605" y="1022" width="115" height="109" rx="18" fill="#738077" stroke="#252C2B" strokeWidth="9"/>
    <circle cx="663" cy="1065" r="29" fill="#C8D5BE" stroke="#252C2B" strokeWidth="7"/>
    <circle cx="664" cy="1112" r="7" fill="#E96B3C"/>
    <path d="M910 1138 L931 854 L850 827" fill="none" stroke="#4B4840" strokeWidth="20" strokeLinecap="round"/>
    <path d="M828 825 Q850 776 895 820 L890 849 Z" fill="#DF9C6C" stroke="#4B4840" strokeWidth="8"/>
    <path d="M36 1461 Q100 1414 259 1455 L308 1728 Q171 1815 -50 1721 Z"
      fill="#647369" stroke="#3C4841" strokeWidth="13"/>
    <path d="M50 1460 Q120 1336 206 1461" stroke="#40534C" strokeWidth="15" fill="none"/>
    <ellipse cx="170" cy="1782" rx="177" ry="23" fill="#2A302B" opacity=".19"/>
  </svg>;

type WorldProps={from?:number};
export const BusMemory:React.FC<WorldProps>=()=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const s=frame/fps;
  const smile=s>3.5&&s<9.2;
  // A brief window-focused truck lets the music-linked city become the subject,
  // before returning to the shared-earbud interaction.
  const cityLook=smooth(5.7,7.9,s)*(1-smooth(9.1,11.25,s));
  const lens=lerp(1,1.055,smooth(1,9,s))+.08*cityLook;
  return <AbsoluteFill style={{overflow:'hidden',background:'#A98170'}}>
    <div style={{position:'absolute',width:1080,height:1920,
      transform:'translate('+(-15*smooth(1,9,s)-94*cityLook)+'px,0px) scale('+lens+')',
      transformOrigin:'52% 55%'}}>
      <BusWindow sec={s}/>
      <Friend x={614} y={866} scale={.86} smile={smile}
        sway={3*Math.sin(s*1.55)+4*smooth(1.8,3,s)*(1-smooth(3.5,4.5,s))}/>
      {/* One shared cable ties both characters to the music as a physical prop. */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920"
        style={{position:'absolute',inset:0}}>
        <path d="M789 987 C758 1082 654 1155 602 1107 C533 1039 516 1060 489 1024"
          fill="none" stroke="#29312D" strokeWidth="6"/>
        <circle cx="487" cy="1023" r="15" fill="#E96B3C" stroke="#20251F" strokeWidth="5"/>
      </svg>
      <CharacterAt x={140} y={798} w={510}
        expression={smile?'happy':'curious'}
        tilt={-4+7*smooth(2,4,s)} lean={-3+Math.sin(s*2)*2}
        leftArm={20-35*smooth(2,3.8,s)}
        rightArm={-20+36*smooth(4.5,6,s)}
        scarf={8*Math.sin(s*2.2)} light={.33}/>
      <BusSeats sec={s}/>
      {/* Passing foreground pole creates a cut-ready moving spatial landmark. */}
      <div style={{position:'absolute',left:1120-167*smooth(9.7,11.9,s),top:-40,
        width:45,height:2050,background:'#304741',boxShadow:'-9px 0 12px rgba(10,20,20,.2)'}}/>
    </div>
  </AbsoluteFill>;
};

export const ReturnQuestion:React.FC=()=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const s=frame/fps;
  const wipe=smooth(0,.85,s);
  return <AbsoluteFill style={{overflow:'hidden',background:P.wall}}>
    <div style={{position:'absolute',width:1080,height:1920,
      transform:'translate('+(-22*smooth(1,5,s))+'px,0px) scale(1.03)'}}>
      <RoomSet sec={s}/>
      <CharacterAt x={194} y={782} w={498}
        expression={s<1.4?'surprised':s<3.4?'curious':'thinking'}
        tilt={8-14*smooth(1.5,4,s)}
        leftArm={8} rightArm={22-55*smooth(1.8,3,s)}
        scarf={9*Math.sin(s*3)*Math.exp(-s*.5)}/>
      {/* Headphone is held, not hovering independently of the hand. */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920"
        style={{position:'absolute',inset:0,pointerEvents:'none'}}>
        <path d="M521 1200 Q507 1125 560 1130 Q618 1129 607 1198"
          stroke="#273632" strokeWidth="17" fill="none" strokeLinecap="round"/>
        <rect x="497" y="1190" width="36" height="74" rx="14" fill="#E96B3C" stroke="#20251F" strokeWidth="7"/>
        <rect x="589" y="1190" width="36" height="74" rx="14" fill="#E96B3C" stroke="#20251F" strokeWidth="7"/>
      </svg>
    </div>
    <div style={{position:'absolute',left:lerp(250,-190,smooth(0,.87,s)),
      top:-45,width:63,height:2060,background:'#304742',
      boxShadow:'16px 0 17px rgba(20,28,28,.15)'}}/>
    {s>3.4&&s<6.7&&<div style={{position:'absolute',top:350,left:120,width:780,
      fontFamily:brand.fontFamily,fontSize:64,fontWeight:950,lineHeight:1.08,
      color:P.ink,textShadow:'0 2px 0 rgba(246,240,229,.4)'}}>
      KENAPA LAGU BISA<br/>BAWA KITA BALIK?
    </div>}
  </AbsoluteFill>;
};

export const CueRoom:React.FC=()=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const s=frame/fps;
  const look=smooth(0.8,2.0,s);
  const drawer=smooth(2.2,4.9,s);
  const glow=smooth(4.3,6.2,s);
  const objects=smooth(7.1,11.5,s);
  const pulse=Math.sin((s-4)*9);
  const inspect=smooth(7.6,10.5,s)*(1-smooth(12.1,15.2,s));
  return <AbsoluteFill style={{overflow:'hidden',background:P.wall}}>
    <div style={{position:'absolute',width:1080,height:1920,
      transform:'translate('+(-22*smooth(3,11,s)-150*inspect)+'px,'+(-92*inspect)+'px) scale('+(1.01+.055*smooth(2,11,s)+.31*inspect)+')',
      transformOrigin:'50% 60%'}}>
      <RoomSet sec={s}/>
      {/* The old desk drawer opens on actual rails. */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920"
        style={{position:'absolute',inset:0}}>
        {/* The familiar sound briefly gives the existing window an older,
            warmer city reflection instead of spawning an infographic card. */}
        <rect x="615" y="397" width="525" height="660" rx="20"
          fill="#E96B3C" opacity={objects*.115*(1-smooth(13.2,15.3,s))}/>
        <path d="M638 873 Q748 808 853 872 T1115 861"
          fill="none" stroke="#FFE0B0" strokeWidth="21"
          opacity={objects*.34*(1-smooth(13.2,15.3,s))}/>
        <circle cx="1015" cy="554" r={75+58*objects}
          fill="#FFE0A0" opacity={objects*.21}/>
        <rect x={645-45*drawer} y={1224+111*drawer} width={335+60*drawer}
          height={151+62*drawer} rx="12" stroke="#51473C" strokeWidth="13"
          fill="#B49A7D"/>
        <rect x={666-43*drawer} y={1244+116*drawer} width={293+48*drawer}
          height={88} rx="8" fill="#7D6554" stroke="#5E5144" strokeWidth="10"/>
        <rect x={798-42*drawer} y={1286+113*drawer} width="38" height="10" rx="5"
          fill="#DDC5A7" stroke="#56473E" strokeWidth="6"/>
        {/* A bus ticket is already inside the drawer, not a floating polaroid. */}
        <g transform={'translate('+(730-50*drawer)+' '+(1290-240*objects)+') rotate('+(8-25*objects)+' 68 45)'}>
          <rect x="0" y="0" width="166" height="90" rx="10"
            fill="#F4D9AE" stroke="#373B34" strokeWidth="8"/>
          <path d="M18 23 H140 M18 48 H111 M18 69 H80"
            stroke="#986F54" strokeWidth="6" strokeLinecap="round"/>
          <circle cx="137" cy="63" r="11" fill="#E96B3C" opacity=".7"/>
        </g>
        {/* A musician's contour energizes ONLY the tangible drawer and ticket. */}
        <path d={'M670 1100 Q800 '+(1090-40*glow)+' 880 1175 '+
          'C910 1220 810 1255 '+(822-120*objects)+' '+(1320-232*objects)}
          fill="none" stroke="#E96B3C" strokeWidth={8+2*pulse}
          strokeLinecap="round" opacity={glow*(1-smooth(11.8,14.7,s))}
          pathLength={1} strokeDasharray={String(smooth(4.1,7.7,s))+' 1'}/>
        <ellipse cx={795-40*drawer} cy={1380+111*drawer} rx="170" ry="50"
          fill="#FFD8A0" opacity={glow*.11}/>
      </svg>
      <CharacterAt x={169} y={797} w={495}
        expression={s<3?'curious':s<10?'thinking':'happy'}
        tilt={-6+11*look} leftArm={15-38*drawer}
        rightArm={-21+107*drawer}
        scarf={5*Math.sin(s*2.7)*glow}/>
    </div>
  </AbsoluteFill>;
};

export const WrongSong:React.FC=()=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const s=frame/fps;
  const press=smooth(0.3,1.4,s);const wait=smooth(1.7,3.6,s);
  const peep=smooth(4.3,5.7,s);
  return <AbsoluteFill style={{background:P.wall,overflow:'hidden'}}>
    <RoomSet sec={s}/>
    <CharacterAt x={178} y={793} w={507}
      expression={s<2.1?'excited':s<5.2?'sleepy':'deadpan'}
      tilt={-4+4*press+6*peep}
      leftArm={-24+34*wait}
      rightArm={-60+58*press}
      blink={Math.max(0,wait*(1-peep))}
      scarf={3*Math.sin(s*2.8)}/>
    {/* Playlist phone is diegetic, physically held; no floating UI card. */}
    <svg width="1080" height="1920" viewBox="0 0 1080 1920"
      style={{position:'absolute',inset:0,pointerEvents:'none'}}>
      <g transform={'rotate('+(2*Math.sin(s*3)*press)+' 613 1204)'}>
        <rect x="570" y="1145" width="101" height="176" rx="20"
          fill="#323735" stroke="#20251F" strokeWidth="11"/>
        <rect x="588" y="1164" width="65" height="133" rx="8" fill="#B8C4B0"/>
        <path d="M605 1219 H637 M620 1204 V1235" stroke="#42765B"
          strokeWidth="7" strokeLinecap="round"/>
        <circle cx="620" cy="1273" r="9" fill="#E96B3C"/>
      </g>
    </svg>
    {wait>.60&&<ellipse style={{position:'absolute',left:360,top:1000,
      width:45,height:12,background:'#3E423D',opacity:.09*wait,borderRadius:'50%'}}/>}
  </AbsoluteFill>;
};

export const SuddenMemory:React.FC=()=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const s=frame/fps;
  const rush=smooth(.15,1.42,s);const smile=smooth(1.2,2.6,s);
  const y=1220;
  return <AbsoluteFill style={{overflow:'hidden',background:'#E4C7A5'}}>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920"
      style={{position:'absolute',inset:0}}>
      <rect width="1080" height="1920" fill="#A57B70"/>
      <rect y="1300" width="1080" height="620" fill="#6B5D56"/>
      <rect x="565" y="325" width="570" height="700" rx="19"
        stroke="#493E3A" strokeWidth="19" fill="#323F50"/>
      <circle cx="900" cy="482" r="70" fill="#F6E9D3" opacity=".74"/>
      <path d="M620 710 L1080 710 M820 335 V1023" stroke="#6E6260" strokeWidth="18"/>
      {[0,1,2,3,4].map(i=><rect key={i} x={605+i*103}
        y={800-(i%3)*58} width="90" height="250" fill="#454854"/>)}
      {/* Physical paper pages scattered around a genuine study desk. */}
      <path d="M-40 1263 H1120 V1920 H-40 Z" fill="#8D6D58"/>
      <path d="M-30 1244 H1120" stroke="#3E3B35" strokeWidth="27"/>
      {[0,1,2,3,4].map(i=><g key={i}
        transform={'translate('+(70+i*186-28* rush)+' '+(1180+(i%2)*30-40*rush)+') rotate('+((i-2)*6+7*Math.sin(s*5+i)*rush)+')'}>
        <rect width="138" height="100" rx="6" fill="#F6E9D2"
          stroke="#69584A" strokeWidth="7"/>
        <path d="M14 30 H115 M14 51 H107 M14 74 H83" stroke="#B2A08B" strokeWidth="5"/>
      </g>)}
      {/* Noodle bowl is the absurd autobiographical detail. */}
      <ellipse cx="744" cy="1205" rx="142" ry="39" fill="#F9E2A8" stroke="#2C322D" strokeWidth="13"/>
      <path d="M609 1209 Q632 1394 742 1407 Q859 1388 881 1209 Z"
        fill="#E96B3C" stroke="#20251F" strokeWidth="13"/>
      {[0,1,2,3].map(i=><path key={i}
        d={'M'+(689+i*38)+' 1166 Q'+(673+i*42)+' 1122 '+(700+i*22)+' 1095'}
        stroke="#F7DE93" strokeWidth="7" fill="none" strokeLinecap="round"/>)}
      <path d="M826 1195 L925 1040" stroke="#20251F" strokeWidth="10"/>
      <path d="M842 1202 L945 1072" stroke="#20251F" strokeWidth="10"/>
      {/* Study lamp throws an energetic light hit as the room changes. */}
      <circle cx="865" cy="445" r={120+400*rush} fill="#FFDA97" opacity={.12*rush}/>
    </svg>
    <CharacterAt x={124} y={794} w={515}
      expression={smile>.55?'surprised':'deadpan'}
      tilt={-6+17*smile}
      lean={-3-8*rush}
      leftArm={22} rightArm={-22+48*smile}
      scarf={14*Math.sin(s*9)*Math.exp(-s*.5)}/>
  </AbsoluteFill>;
};

export const Bittersweet:React.FC=()=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const s=frame/fps;
  const reach=smooth(2.4,4.2,s);
  return <AbsoluteFill style={{overflow:'hidden',background:'#A87A68'}}>
    <div style={{position:'absolute',width:1080,height:1920,
      transform:'translate('+(-18*smooth(2,6,s))+'px,0px) scale('+(1+.04*smooth(1,7,s))+')',
      transformOrigin:'50% 60%'}}>
      <BusWindow sec={s+4} large/>
      <Friend x={663} y={815} scale={.82} sway={3*Math.sin(s*1.2)} />
      <CharacterAt x={426} y={789} w={390} expression="happy"
        scarf={4*Math.sin(s*2)} leftArm={12}
        rightArm={-28+20*Math.sin(s*1.4)} light={.15}/>
      <CharacterAt x={92} y={907} w={367} expression={s<3?'curious':'happy'}
        tilt={-8} lean={-4} rightArm={-28+52*reach}
        scarf={6*Math.sin(s*2.4)} light={.25}/>
      <BusSeats sec={s+7}/>
      {/* A passing pole progressively covers the unreachable past. */}
      <div style={{position:'absolute',left:lerp(1190,150,smooth(5.3,7,s)),
        top:-30,height:2020,width:67,background:'#344D47'}}/>
    </div>
  </AbsoluteFill>;
};

export const EndingCringe:React.FC=()=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const s=frame/fps;
  const stage=smooth(1.6,2.42,s)*(1-smooth(4.4,5.3,s));
  const stop=smooth(4.13,4.61,s);
  const quake=stage*15*Math.sin(s*16);
  return <AbsoluteFill style={{overflow:'hidden',background:P.wall}}>
    <div style={{position:'absolute',inset:0,transform:'translate('+quake+'px,0px)'}}>
      <RoomSet sec={s}/>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920"
        style={{position:'absolute',inset:0}}>
        <rect width="1080" height="1920" fill="#4F5570" opacity={stage}/>
        <path d="M0 180 L370 480 L650 480 L1080 140 V1920 H0 Z"
          fill="#7F7491" opacity={stage*.65}/>
        <ellipse cx="570" cy="1380" rx="460" ry="170" fill="#F4CC86" opacity={stage*.72}/>
        {[0,1,2].map(i=><circle key={i}
          cx={176+i*340} cy={319} r={90+10*Math.sin(s*8+i)}
          fill="#FAD3A2" opacity={stage*.42}/>)}
        {/* A visible diegetic stop button, not a floating annotation. */}
        <rect x="615" y="1120" width="112" height="155" rx="22"
          fill="#373D38" stroke="#20251F" strokeWidth="11" opacity={1-stage*.4}/>
        <circle cx="671" cy="1182" r={29-5*stop}
          fill="#E96B3C" stroke="#F6F0E5" strokeWidth="7"/>
        <path d="M662 1170 H680 V1191 H662 Z" fill="#20251F"/>
      </svg>
      <CharacterAt x={stage>.4?173:177} y={795} w={508}
        expression={stage>.2?'surprised':stop>.6?'deadpan':'happy'}
        lean={stage*(19*Math.sin(s*12))}
        leftArm={stage?(-65+55*Math.sin(s*11)):15}
        rightArm={stage?(55+65*Math.cos(s*12)):-18-82*stop}
        scarf={stage*20*Math.sin(s*13)}/>
    </div>
    {s>5.30&&<div style={{position:'absolute',left:120,top:430,width:770,
      color:'#20251F',fontFamily:brand.fontFamily,textAlign:'left'}}>
      <div style={{fontWeight:1000,fontSize:82,letterSpacing:-2}}>COBA DIPIKIR.</div>
      <div style={{fontSize:34,fontWeight:650,marginTop:12}}>Yang biasa, belum tentu sederhana.</div>
    </div>}
  </AbsoluteFill>;
};
