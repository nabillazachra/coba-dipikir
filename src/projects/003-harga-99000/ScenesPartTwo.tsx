import React from 'react';
import {CanvasImage, interpolate, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import {publicAsset} from '../../brand/publicAsset';
import {Actor, Burst, EditorNote, FONT, GREEN, INK, ORANGE, PAPER, PriceTag, ProductBox, SceneCanvas, TopText, clamp, tween} from './VisualSystem';

export const EffectScene:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const stamp=tween(f,[.25*fps,.7*fps],[.65,1]);
 return <SceneCanvas store={false}>
  <div style={{
    position:'absolute',left:98,right:98,top:387,
    padding:'25px 20px',boxSizing:'border-box',
    transform:'rotate(-2deg) scale('+stamp+')',
    border:'8px solid '+ORANGE,borderRadius:24,
    color:ORANGE,backgroundColor:'#FFF8EE',
    textAlign:'center',whiteSpace:'nowrap',letterSpacing:-1.8,fontSize:61,fontWeight:900,
    boxShadow:'12px 13px 0 rgba(233,107,60,.11)',
  }}>LEFT-DIGIT EFFECT</div>
  <Actor x={85} y={820} width={450} expression="realization"
    tilt={tween(f,[0,1.3*fps,3.8*fps],[-7,6,-5])}
    rightArm={71} gazeX={8} scarf={Math.sin(f/7)*5}/>
  {([
    {digit:'9',label:'90 ribuan',tone:GREEN,y:823},
    {digit:'1',label:'100 ribu',tone:ORANGE,y:1012},
  ] as const).map((entry) => <div key={entry.digit} style={{
    position:'absolute',left:574,top:entry.y,width:418,height:165,
    display:'flex',alignItems:'center',gap:20,padding:'10px 26px',
    boxSizing:'border-box',
    border:'5px solid '+INK,borderRadius:26,
    backgroundColor:'#FFFDF8',
    boxShadow:'8px 11px 0 rgba(32,37,31,.09)',
  }}>
    <span style={{fontSize:112,fontWeight:950,lineHeight:1,color:entry.tone}}>{entry.digit}</span>
    <span style={{fontSize:47,fontWeight:900,lineHeight:1.08,letterSpacing:-1.8,color:INK}}>{entry.label}</span>
  </div>)}
  <Burst x={493} y={789} visible={tween(f,[1.6*fps,1.98*fps],[0,1])} size={82}/>
 </SceneCanvas>;
};

const HangTag:React.FC<{value:string;x:number;y:number;rotate?:number;active?:boolean;opacity?:number}> = ({
 value,x,y,rotate=0,active=false,opacity=1,
}) => (
 <div style={{
  position:'absolute',left:x,top:y,width:343,height:144,
  rotate:rotate+'deg',opacity,
 }}>
  <div style={{
    position:'absolute',left:166,top:-72,width:5,height:75,
    backgroundColor:'#A5957B',transformOrigin:'top center',
  }}/>
  <div style={{
    position:'absolute',inset:0,display:'flex',
    alignItems:'center',justifyContent:'center',
    border:'6px solid '+(active?ORANGE:INK),
    backgroundColor:active?'#FFF0E6':'#FFFAF2',
    borderRadius:'24px 26px 22px 27px',
    boxShadow:'7px 12px 0 rgba(32,37,31,.1)',
    fontSize:Math.min(62,Math.floor((343-32)/(value.length*.62))),fontWeight:950,letterSpacing:-2.0,
  }}>{value}</div>
  <div style={{
    position:'absolute',left:157,top:11,
    width:22,height:22,borderRadius:999,
    backgroundColor:INK,opacity:.27,
  }}/>
 </div>
);

export const OtherPricesScene:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const progress=tween(f,[2.4*fps,3.9*fps,4.45*fps,5.2*fps],[0,1,1,0]);
 const push=progress*70;
 const wobble=f>4.4*fps?Math.sin((f-4.4*fps)/3)*9:0;
 return <SceneCanvas>
  <TopText eyebrow="DI MANA-MANA KETEMU" size={68}>
    HARGANYA<br/><span style={{color:ORANGE}}>NYARIS BULAT.</span>
  </TopText>
  <HangTag x={105} y={606} value="Rp19.900" rotate={-2}
    opacity={tween(f,[0,.4*fps],[0,1])}/>
  <HangTag x={105} y={792} value="Rp49.900" rotate={2}
    opacity={tween(f,[.45*fps,.85*fps],[0,1])}/>
  <HangTag x={105} y={978} value="Rp199.900" rotate={-2}
    opacity={tween(f,[1.0*fps,1.4*fps],[0,1])}/>
  <HangTag x={105+push*.52+wobble*.45} y={1164}
    value="Rp99.900" rotate={-2+progress*4} active
    opacity={tween(f,[1.4*fps,1.8*fps],[0,1])}/>
  <Actor x={570} y={822} width={420}
    expression={f>4.3*fps?'surprised':'doubtful'}
    tilt={f>4.3*fps?13:-8}
    rightArm={f>2.6*fps?75:12}
    leftArm={f>4.3*fps?-44:20}
    lean={f>4.4*fps?-11:f>2.5*fps?13:0}
    scarf={Math.sin(f/6)*6}/>
  <EditorNote text={f>4.3*fps?'MENTAL BALIK!':'dikit lagi bulat…'} x={600} y={629}/>
 </SceneCanvas>;
};

export const CalculatorScene:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const typing=f>1.2*fps;
 const count=tween(f,[1.2*fps,2.7*fps],[0,1000]);
 return <SceneCanvas store={false}>
  <TopText eyebrow="BUKAN BERARTI TERTIPU" size={69}>
    KITA TETAP<br/><span style={{color:ORANGE}}>BISA NGITUNG.</span>
  </TopText>
  <Actor x={95} y={735} width={485}
    expression={typing?'thinking':'neutral'}
    tilt={tween(f,[0,2.3*fps,4.2*fps],[-9,10,-6])}
    rightArm={typing?70:5} leftArm={typing?-55:10}
    blink={f>2.65*fps&&f<2.82*fps?1:0}/>
  <div style={{
    position:'absolute',left:558,top:665,width:415,height:555,
    backgroundColor:'#D7D6C4',
    border:'9px solid '+INK,
    borderRadius:43,rotate:'5deg',
    boxShadow:'15px 20px 0 rgba(32,37,31,.14)',
  }}>
   <div style={{
    margin:'30px 28px 20px',height:132,
    backgroundColor:'#F8F7E4',border:'6px solid '+INK,
    borderRadius:22,textAlign:'right',padding:'28px 20px',
    fontSize:70,fontWeight:950,letterSpacing:-3,
   }}>{Math.round(count).toLocaleString('id-ID')}</div>
   <div style={{
    padding:'14px 35px',display:'grid',
    gridTemplateColumns:'repeat(3, 1fr)',gap:17,
   }}>
    {['7','8','9','4','5','6','1','2','3'].map((label,i)=>(
      <div key={label} style={{
        height:74,backgroundColor:i===7&&typing?ORANGE:'#FFFDF4',
        border:'4px solid '+INK,borderRadius:14,
        textAlign:'center',lineHeight:'67px',fontSize:42,fontWeight:900,
      }}>{label}</div>
    ))}
   </div>
  </div>
  <div style={{
    position:'absolute',left:570,top:1225,
    fontSize:52,fontWeight:950,letterSpacing:-2,
    color:GREEN,
    opacity:tween(f,[2.4*fps,2.8*fps],[0,1]),
  }}>SELISIH: Rp1.000</div>
 </SceneCanvas>;
};

export const ImpressionScene:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const firstDigit=tween(f,[.25*fps,.62*fps],[0,1]);
 const otherDigit=tween(f,[1.2*fps,1.55*fps],[0,1]);
 return <SceneCanvas store={false}>
  <div style={{
    position:'absolute',left:0,top:260,width:540,height:1250,
    backgroundColor:'#F2E8D8',
  }}/>
  <div style={{
    position:'absolute',left:540,top:260,width:540,height:1250,
    backgroundColor:'#F4D7C5',
  }}/>
  <div style={{
    position:'absolute',left:537,top:260,width:6,height:1250,
    backgroundColor:INK,opacity:.24,
  }}/>
  <TopText size={70} align="center">ANGKA DEPAN,<br/><span style={{color:ORANGE}}>KESAN BEDA.</span></TopText>
  <div style={{
    position:'absolute',left:50,top:690,width:475,
    textAlign:'center',fontSize:93,fontWeight:950,
    letterSpacing:-4,whiteSpace:'nowrap',
  }}><span style={{color:ORANGE,opacity:firstDigit}}>9</span>
    <span style={{opacity:otherDigit}}>9.000</span></div>
  <div style={{
    position:'absolute',left:564,top:690,width:475,
    textAlign:'center',fontSize:93,fontWeight:950,
    letterSpacing:-4,whiteSpace:'nowrap',
  }}><span style={{color:ORANGE,opacity:firstDigit}}>1</span>
    <span style={{opacity:otherDigit}}>00.000</span></div>
  <Actor x={90} y={920} width={365}
    expression="happy" tilt={-9} gazeX={-5}
    leftArm={-32} rightArm={37} scarf={Math.sin(f/8)*4}/>
  <Actor x={603} y={924} width={365}
    expression="worried" tilt={10} gazeX={-8}
    leftArm={33} rightArm={-25} lean={12}
    scarf={Math.sin(f/8)*2}/>
  <div style={{
    position:'absolute',left:168,top:835,
    fontSize:40,fontWeight:950,color:GREEN,
  }}>santai.</div>
  <div style={{
    position:'absolute',left:680,top:835,
    fontSize:40,fontWeight:950,color:ORANGE,
  }}>eh, 100K!</div>
 </SceneCanvas>;
};

export const EndingScene:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const moved=tween(f,[.1*fps,1.4*fps],[435,272]);
 const stop=f>=3.2*fps;
 const final=f>=6.3*fps;
 return <SceneCanvas>
  <TopText eyebrow="LAIN KALI KETEMU BEGINI" size={64}>
    ANGKANYA<br/><span style={{color:ORANGE}}>BISA NGECOH KESAN.</span>
  </TopText>
  <PriceTag x={78} y={665} width={416} text="Rp99.000" highlight
    scale={final?1.07:1}/>
  <PriceTag x={571} y={665} width={422} text="Rp100.000"/>
  <ProductBox x={130} y={885} width={335} highlighted/>
  <ProductBox x={632} y={885} width={335}/>
  <Actor x={stop?moved-14:moved} y={1000} width={330}
    expression={final?'deadpan':stop?'realization':'thinking'}
    tilt={stop?6:-7} gazeX={final?8:stop?0:-8}
    leftArm={final?-40:20} rightArm={final?70:-45}
    scarf={Math.sin(f/8)*4}
    lean={stop?0:-5}/>
  {stop?<div style={{
    position:'absolute',left:648,top:1310,
    backgroundColor:'#FFF9F0',
    border:'4px solid '+INK,borderRadius:22,
    padding:'12px 14px',fontSize:34,fontWeight:900,
    color:ORANGE,rotate:'-5deg',
    opacity:tween(f,[3.1*fps,3.5*fps],[0,1]),
  }}>CUMA Rp1.000.</div>:null}
  <Burst x={440} y={930} size={86}
    visible={tween(f,[6.3*fps,6.7*fps],[0,1])}/>
 </SceneCanvas>;
};

export const BrandEndScene:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const arrival=tween(f,[0,.6*fps],[.82,1]);
 return <SceneCanvas store={false}>
  <div style={{
    position:'absolute',left:80,top:350,width:910,height:800,
    borderRadius:'50%',backgroundColor:'#F4E3D0',
    opacity:.7,transform:'scale('+arrival+')',
  }}/>
  <CanvasImage src={publicAsset('brand/coba-dipikir-logo.webp')}
    style={{
      position:'absolute',left:341,top:576,
      width:400,height:400,objectFit:'contain',
      transform:'scale('+arrival+')',
    }}/>
  <div style={{
    position:'absolute',top:1105,left:76,right:130,
    fontSize:93,fontWeight:950,letterSpacing:-4.5,
    textAlign:'center',color:INK,
  }}>coba <span style={{color:ORANGE}}>dipikir.</span></div>
  <div style={{
    position:'absolute',top:1240,left:105,right:130,
    textAlign:'center',fontSize:39,fontWeight:730,
    color:GREEN,
  }}>Yang biasa, belum tentu sederhana.</div>
 </SceneCanvas>;
};
