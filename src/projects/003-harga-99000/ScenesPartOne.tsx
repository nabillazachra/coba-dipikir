import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Actor, Burst, EditorNote, GREEN, INK, ORANGE, PAPER, PriceTag, ProductBox, SceneCanvas, TopText, clamp, tween, FONT} from './VisualSystem';

export const CompareScene:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const eye=tween(f,[0,.75*fps,1.5*fps,2.4*fps,3.5*fps],[-9,-9,9,-9,8]);
 const tilt=tween(f,[0,.65*fps,1.55*fps,2.5*fps,4.1*fps],[-7,-8,9,-8,6]);
 return <SceneCanvas>
  <TopText eyebrow="DI RAK YANG SAMA" size={70}>DUA BARANG.<br/><span style={{color:ORANGE}}>DUA HARGA.</span></TopText>
  <PriceTag x={74} y={548} width={428} text="Rp99.000"
    highlight scale={tween(f,[0,.55*fps],[.78,1])}/>
  <PriceTag x={583} y={548} width={420} text="Rp100.000"
    scale={tween(f,[0,.8*fps],[.77,1])}/>
  <ProductBox x={132} y={820} width={290} bounce={Math.sin(f/12)*2}/>
  <ProductBox x={641} y={820} width={290} bounce={Math.sin(f/12)*2}/>
  <Actor x={tween(f,[0,.7*fps],[370,351])} y={738} width={335}
    expression={f<1.35*fps?'neutral':'curious'} tilt={tilt} gazeX={eye}
    leftArm={tween(f,[1.35*fps,2.2*fps,2.6*fps],[12,-66,12])}
    rightArm={tween(f,[2.3*fps,3.5*fps],[-10,64])}
    blink={f%90>84?1:0} scarf={Math.sin(f/9)*3}/>
  <div style={{position:'absolute',left:410,top:1186,width:230,height:20,
    borderRadius:40,background:'rgba(32,37,31,.10)',filter:'blur(10px)'}}/>
 </SceneCanvas>;
};

export const ChoiceScene:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const approach=interpolate(f,[0,1.1*fps],[395,135],{
  ...clamp,easing:Easing.bezier(.16,1,.3,1),
 });
 const mood=f<2.62*fps?'excited':'thinking';
 return <SceneCanvas>
  <TopText eyebrow="KEPUTUSAN SPONTAN" size={76}>YANG <span style={{color:ORANGE}}>INI!</span></TopText>
  <PriceTag x={128} y={548} width={395} text="Rp99.000" highlight
    scale={tween(f,[0,.45*fps],[1,1.08])}/>
  <PriceTag x={610} y={550} width={370} text="Rp100.000" dim
    scale={tween(f,[0,2.9*fps],[1,.88])}/>
  <ProductBox x={132} y={830} width={315} tilt={tween(f,[0,1.12*fps],[0,-5])} highlighted/>
  <ProductBox x={662} y={852} width={265} opacity={.45}/>
  <Actor x={approach} y={tween(f,[0,1.2*fps],[788,752])} width={320}
    expression={mood} tilt={f<2.62*fps?-9:12} leftArm={-58}
    rightArm={f<2.62*fps?72:19} scarf={Math.sin(f/7)*7} gazeX={f<2.6*fps?-5:4}/>
  <Burst x={460} y={855} size={96} visible={tween(f,[.7*fps,1.1*fps,2.3*fps,2.8*fps],[0,1,1,0])}/>
  {f>=2.65*fps?<div style={{
    position:'absolute',left:645,top:1050,
    fontSize:75,fontWeight:950,color:ORANGE,rotate:'8deg',
  }}>…EH?</div>:null}
 </SceneCanvas>;
};

export const DifferenceScene:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const p=tween(f,[2.6*fps,3.0*fps],[0,1]);
 const flash=tween(f,[2.58*fps,2.7*fps,2.9*fps],[0,1,0]);
 return <SceneCanvas dark store={false}>
  <TopText eyebrow="COBA DIHITUNG" dark size={73}>TUNGGU SEBENTAR.</TopText>
  <div style={{
    position:'absolute',left:92,width:535,top:630,
    fontSize:112,fontWeight:950,lineHeight:1.16,textAlign:'left',
    color:PAPER,letterSpacing:-4,
  }}>
    <span>100.000</span><br/>
    <span style={{color:ORANGE}}>− 99.000</span>
  </div>
  <div style={{
    position:'absolute',left:96,width:530,top:918,height:5,
    borderRadius:10,backgroundColor:PAPER,opacity:.6,
  }}/>
  <div style={{
    position:'absolute',left:94,width:535,top:972,
    color:ORANGE,textAlign:'left',fontWeight:950,
    fontSize:127,letterSpacing:-5,
    transform:'scale('+(.66+p*.34)+')',
    opacity:p,
    textShadow:'0 13px 0 rgba(0,0,0,.17)',
  }}>Rp1.000</div>
  <Actor x={683} y={780} width={282}
    expression={p>.6?'deadpan':'thinking'} tilt={p>.6?-8:6}
    gazeX={p>.6?-7:5} blink={p>.3&&p<.45?1:0}/>
  <div style={{position:'absolute',left:100,top:1195,width:620,height:5,
    borderRadius:12,backgroundColor:ORANGE,opacity:p*.55}}/>
  <div style={{position:'absolute',inset:0,backgroundColor:PAPER,opacity:flash*.12,pointerEvents:'none'}}/>
 </SceneCanvas>;
};

export const DistanceScene:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const stretch=tween(f,[.2*fps,2.7*fps],[0,1]);
 const right=548+stretch*42;
 return <SceneCanvas>
  <TopText size={80}>KOK RASANYA<br/><span style={{color:ORANGE}}>JAUH BANGET?</span></TopText>
  <PriceTag x={70} y={563} width={380} text="Rp99.000" highlight/>
  <PriceTag x={right} y={563} width={375} text="Rp100.000"/>
  <div style={{
    position:'absolute',left:420,top:698,width:Math.max(30,right-420),
    borderTop:'8px dashed '+ORANGE,
    opacity:stretch,transformOrigin:'left center',
  }}/>
  <div style={{
    position:'absolute',left:479,top:662,fontSize:46,fontWeight:950,color:ORANGE,
    opacity:stretch,
  }}>↔</div>
  <Actor x={350} y={748} width={330} expression="doubtful"
    tilt={stretch*14-7} rightArm={-70} leftArm={45}
    gazeX={stretch*12-6} scarf={Math.sin(f/8)*4}/>
  <ProductBox x={120} y={975} width={198} opacity={.75}/>
  <ProductBox x={760} y={975} width={198} opacity={.75}/>
 </SceneCanvas>;
};

export const LeftDigitScene:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const glow=tween(f,[.25*fps,.9*fps],[.4,1]);
 const scan=tween(f,[1.15*fps,4.7*fps],[590,1070]);
 return <SceneCanvas store={false}>
  <TopText eyebrow="LIHAT ANGKA DEPANNYA" size={71}>MATA KITA<br/><span style={{color:ORANGE}}>KE SINI DULU.</span></TopText>
  <div style={{
    position:'absolute',left:104,top:630,fontSize:138,
    fontWeight:950,letterSpacing:-6,color:INK,
    lineHeight:1,
  }}>
    <span style={{color:ORANGE,display:'inline-block',
      transform:'scale('+glow+')',transformOrigin:'0 50%',
      textShadow:'0 6px 0 rgba(233,107,60,.15)',
    }}>9</span><span style={{opacity:.38}}>9.000</span>
  </div>
  <div style={{
    position:'absolute',left:104,top:919,fontSize:138,
    fontWeight:950,letterSpacing:-6,color:INK,
    lineHeight:1,
  }}>
    <span style={{color:ORANGE,display:'inline-block',
      transform:'scale('+glow+')',transformOrigin:'0 50%',
    }}>1</span><span style={{opacity:.38}}>00.000</span>
  </div>
  <div style={{
    position:'absolute',left:100,top:scan,
    width:530,height:8,borderRadius:8,
    backgroundColor:ORANGE,opacity:.55,
    boxShadow:'0 0 17px rgba(233,107,60,.45)',
  }}/>
  <Actor x={702} y={745} width={322} expression="curious"
    tilt={tween(f,[0,3*fps,5.4*fps],[-9,9,-6])}
    gazeX={tween(f,[0,2.2*fps,4.8*fps],[-8,8,-8])}
    rightArm={55}/>
  <EditorNote text="yang kiri duluan!" x={120} y={1172} rotate={-4}/>
 </SceneCanvas>;
};

export const BrainScene:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const phase=f<5.05*fps?0:1;
 const swap=tween(f,[5.02*fps,5.38*fps],[0,1]);
 const top=phase===0?'Rp99.000':'Rp100.000';
 const perceived=phase===0?'90 ribuan':'100 ribu';
 return <SceneCanvas>
  <TopText eyebrow="OTAK KITA CEPAT MENYEDERHANAKAN" size={67}>
    KESANNYA<br/><span style={{color:ORANGE}}>MASUK KATEGORI.</span>
  </TopText>
  <Actor x={78} y={720} width={345}
    expression={phase===0?'happy':'worried'}
    tilt={phase===0?-10:9} gazeX={phase===0?9:-8}
    leftArm={phase===0?20:34} rightArm={phase===0?64:-20}
    scarf={Math.sin(f/11)*4}/>
  <div style={{
    position:'absolute',left:456,top:658,width:550,height:526,
    border:'8px solid '+INK,borderRadius:'51% 46% 47% 49%',
    backgroundColor:phase===0?'#FFFAEE':'#F9E7DD',
    boxShadow:'10px 13px 0 rgba(32,37,31,.09)',
    rotate:phase===0?'-2deg':'3deg',
    opacity:1,
  }}>
    <div style={{
      position:'absolute',left:90,top:96,right:75,
      fontSize:65,fontWeight:900,textAlign:'center',color:INK,
    }}>{top}</div>
    <div style={{position:'absolute',left:80,right:80,top:235,
      height:6,backgroundColor:'#D4C9B8'}}/>
    <div style={{
      position:'absolute',left:35,right:35,top:300,
      fontSize:70,fontWeight:950,letterSpacing:-3,
      textAlign:'center',color:phase===0?GREEN:ORANGE,
      transform:'scale('+(phase===0?1:1+.05*swap)+')',
    }}>{perceived}</div>
    <div style={{
      position:'absolute',left:66,bottom:-49,width:95,height:95,
      backgroundColor:phase===0?'#FFFAEE':'#F9E7DD',
      rotate:'40deg',
      borderBottom:'8px solid '+INK,borderRight:'8px solid '+INK,
      zIndex:-1,
    }}/>
  </div>
  <Burst x={815} y={1129} size={90} visible={tween(f,[5.1*fps,5.45*fps],[0,1])}/>

 </SceneCanvas>;
};
