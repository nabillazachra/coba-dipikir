import React from 'react';
import {CanvasImage, interpolate, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import {publicAsset} from '../../brand/publicAsset';
import {Actor, Burst, EditorNote, FONT, GREEN, INK, ORANGE, PAPER, PriceTag, ProductBox, SceneCanvas, TopText, clamp, tween} from './VisualSystem';

export const EffectScene:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const stamp=tween(f,[0,.48*fps],[.86,1]);
 const ideas=[
   {digit:'9',price:'Rp99.000',category:'90 RIBUAN',fill:'#E7F0E8',accent:GREEN,start:.22},
   {digit:'1',price:'Rp100.000',category:'100 RIBU',fill:'#FCE7D9',accent:ORANGE,start:.92},
 ] as const;
 return <SceneCanvas store={false}>
  <div style={{
    position:'absolute',left:75,top:305,
    fontSize:24,fontWeight:900,letterSpacing:3.3,color:GREEN,
  }}>TERNYATA ADA NAMANYA</div>
  <div style={{
    position:'absolute',left:85,top:374,width:900,height:125,
    boxSizing:'border-box',display:'flex',alignItems:'center',justifyContent:'center',
    transform:'rotate(-2deg) scale('+stamp+')',
    border:'8px solid '+ORANGE,borderRadius:27,
    backgroundColor:'#FFF9F0',color:ORANGE,
    boxShadow:'10px 13px 0 rgba(233,107,60,.14)',
    letterSpacing:-2.5,fontSize:71,fontWeight:950,
  }}>LEFT-DIGIT EFFECT</div>
  <div style={{
    position:'absolute',left:43,top:601,width:475,height:550,
    borderRadius:'48% 52% 44% 56%',backgroundColor:'#F5DDC9',opacity:.63,
  }}/>
  <div style={{
    position:'absolute',left:105,top:1180,width:375,height:12,borderRadius:20,
    backgroundColor:'rgba(32,37,31,.12)',
  }}/>
  <Actor x={75} y={727} width={334} expression="realization"
    tilt={tween(f,[0,.6*fps,2*fps],[-10,8,-4])}
    rightArm={tween(f,[0,.65*fps],[13,69])}
    gazeX={9} scarf={Math.sin(f/7)*6}/>
  <Burst x={427} y={705} size={94}
    visible={tween(f,[.5*fps,.77*fps],[0,1])}/>
  {ideas.map((item,i)=>{
    const entrance=tween(f,[item.start*fps,(item.start+.42)*fps],[0,1]);
    return <div key={item.digit} style={{
      position:'absolute',left:548,top:627+i*265,width:462,height:218,
      border:'5px solid '+INK,borderRadius:31,boxSizing:'border-box',
      backgroundColor:item.fill,boxShadow:'9px 12px 0 rgba(32,37,31,.10)',
      display:'flex',alignItems:'center',gap:14,padding:'18px 22px',
      transform:'translateX('+((1-entrance)*42)+'px)',
      opacity:entrance,
    }}>
      <div style={{
        width:108,flexShrink:0,textAlign:'center',
        color:item.accent,fontSize:127,lineHeight:1,fontWeight:950,
      }}>{item.digit}</div>
      <div style={{minWidth:0,flex:1}}>
        <div style={{fontSize:22,fontWeight:900,letterSpacing:2.2,color:INK,opacity:.7}}>TERBACA</div>
        <div style={{fontSize:55,fontWeight:950,letterSpacing:-2.6,whiteSpace:'nowrap',color:INK}}>{item.price}</div>
        <div style={{
          display:'inline-block',marginTop:8,borderRadius:10,
          backgroundColor:item.accent,color:'#FFFDF8',
          padding:'7px 13px',fontSize:25,fontWeight:900,letterSpacing:.5,
        }}>{item.category}</div>
      </div>
    </div>;
  })}
  <div style={{
    position:'absolute',left:748,top:853,fontSize:40,
    fontWeight:950,color:ORANGE,opacity:tween(f,[1.05*fps,1.3*fps],[0,1]),
  }}>↓</div>
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
 const examples=['Rp19.900','Rp49.900','Rp199.900'] as const;
 const highlight=tween(f,[1.1*fps,1.65*fps],[0,1]);
 const wobble=f>4.3*fps?Math.sin((f-4.3*fps)/3)*3:0;
 return <SceneCanvas store={false}>
  <TopText eyebrow="SERING KITA TEMUKAN" size={68}>
    HARGANYA<br/><span style={{color:ORANGE}}>NYARIS BULAT.</span>
  </TopText>
  <div style={{
    position:'absolute',left:74,top:579,width:930,height:636,
    backgroundColor:'#FFF9EE',border:'5px solid #E1D4C3',borderRadius:42,
    boxSizing:'border-box',boxShadow:'0 14px 0 rgba(32,37,31,.05)',
  }}/>
  {examples.map((price,i)=>{
    const p=tween(f,[(.12+i*.38)*fps,(.52+i*.38)*fps],[0,1]);
    return <div key={price} style={{
      position:'absolute',left:100,top:630+i*186,width:404,height:139,
      display:'flex',alignItems:'center',gap:14,padding:'14px 24px',
      boxSizing:'border-box',backgroundColor:'#F6F0E5',
      border:'5px solid '+INK,borderRadius:25,
      boxShadow:'5px 8px 0 rgba(32,37,31,.09)',
      transform:'translateX('+((1-p)*-35)+'px) rotate('+(i%2?-1:1)+'deg)',
      opacity:p,
    }}>
      <span style={{
        fontSize:26,fontWeight:900,color:GREEN,
        padding:'6px 8px',borderRadius:8,backgroundColor:'#E1EBDD',
      }}>{String(i+1).padStart(2,'0')}</span>
      <span style={{
        fontSize:62,fontWeight:950,whiteSpace:'nowrap',
        letterSpacing:-3,color:INK,
      }}>{price}</span>
    </div>;
  })}
  <div style={{
    position:'absolute',left:549,top:622,width:421,height:167,
    boxSizing:'border-box',border:'6px solid '+ORANGE,borderRadius:28,
    backgroundColor:'#FFF0E5',boxShadow:'8px 10px 0 rgba(233,107,60,.15)',
    padding:'14px 20px',textAlign:'center',
    transform:'rotate('+wobble+'deg) scale('+(0.92+.08*highlight)+')',
    opacity:highlight,
  }}>
    <div style={{fontSize:23,fontWeight:900,letterSpacing:2.3,color:ORANGE}}>
      PALING BIKIN MELIRIK
    </div>
    <div style={{
      marginTop:5,color:INK,fontSize:73,fontWeight:950,
      letterSpacing:-3.2,whiteSpace:'nowrap',
    }}>Rp99.900</div>
  </div>
  <div style={{
    position:'absolute',left:600,top:798,width:300,
    textAlign:'center',fontWeight:850,fontSize:32,
    color:GREEN,opacity:highlight,
  }}>sedikit lagi 100 ribu…</div>
  <Actor x={614} y={827} width={277}
    expression={f>4.2*fps?'surprised':'doubtful'}
    tilt={f>4.2*fps?11:-8}
    rightArm={f>2.5*fps?55:-9}
    gazeX={-8} scarf={Math.sin(f/7)*5}/>
  <Burst x={902} y={852} size={79}
    visible={tween(f,[4.1*fps,4.45*fps,5.12*fps],[0,1,0])}/>
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
  <Actor x={95} y={708} width={354}
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
    position:'absolute',left:540,top:1170,
    fontSize:36,fontWeight:950,letterSpacing:-1,
    color:GREEN,
    opacity:tween(f,[2.4*fps,2.8*fps],[0,1]),
  }}>SELISIH: Rp1.000</div>
 </SceneCanvas>;
};

export const ImpressionScene:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const first=tween(f,[.15*fps,.52*fps],[0,1]);
 const rest=tween(f,[1.2*fps,1.65*fps],[0,1]);
 const leftItems=['9','9.000'],rightItems=['1','00.000'];
 return <SceneCanvas store={false}>
  <TopText size={70} align="center">
    ANGKA DEPAN,<br/><span style={{color:ORANGE}}>KESAN BEDA.</span>
  </TopText>
  {([
    {x:72,fill:'#E3EDDD',text:GREEN,label:'TERASA LEBIH RINGAN',parts:leftItems,mood:'happy' as const,tilt:-8},
    {x:556,fill:'#F8DED0',text:ORANGE,label:'TERASA LEBIH BERAT',parts:rightItems,mood:'worried' as const,tilt:8},
  ] as const).map((entry,i)=>(
    <React.Fragment key={entry.x}>
      <div style={{
        position:'absolute',left:entry.x,top:577,width:452,height:642,
        backgroundColor:entry.fill,borderRadius:36,
        border:'4px solid rgba(32,37,31,.12)',boxSizing:'border-box',
      }}/>
      <div style={{
        position:'absolute',left:entry.x+20,top:608,width:412,height:151,
        backgroundColor:'#FFFDF8',border:'5px solid '+INK,borderRadius:27,
        boxSizing:'border-box',textAlign:'center',padding:'17px 12px',
        boxShadow:'5px 8px 0 rgba(32,37,31,.08)',
      }}>
        <div style={{
          fontSize:23,fontWeight:900,letterSpacing:1.4,color:entry.text,
        }}>{entry.label}</div>
        <div style={{
          fontSize:79,fontWeight:950,letterSpacing:-4,color:INK,lineHeight:1.07,
          whiteSpace:'nowrap',
        }}>
          <span style={{color:ORANGE,opacity:first}}>{entry.parts[0]}</span>
          <span style={{opacity:rest}}>{entry.parts[1]}</span>
        </div>
      </div>
      <Actor x={entry.x+82} y={816} width={279} expression={entry.mood}
        tilt={entry.tilt}
        leftArm={i===0?-23:34}
        rightArm={i===0?32:-28}
        lean={i===0?-3:8} scarf={Math.sin(f/8)*3}/>
      <div style={{
        position:'absolute',left:entry.x+40,top:1143,width:372,height:49,
        display:'flex',alignItems:'center',justifyContent:'center',
        backgroundColor:'#FFFDF8',borderRadius:16,
        color:entry.text,fontSize:31,fontWeight:900,
        boxShadow:'0 4px 0 rgba(32,37,31,.09)',
      }}>{i===0?'90 RIBUAN':'100 RIBU'}</div>
    </React.Fragment>
  ))}
  <div style={{
    position:'absolute',left:502,top:828,width:78,height:78,
    borderRadius:999,backgroundColor:INK,color:PAPER,
    border:'6px solid '+PAPER,
    display:'flex',alignItems:'center',justifyContent:'center',
    fontSize:32,fontWeight:950,transform:'scale('+first+')',
  }}>VS</div>
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
  <ProductBox x={130} y={849} width={276} highlighted/>
  <ProductBox x={632} y={849} width={276}/>
  <Actor x={stop?moved-14:moved} y={743} width={331}
    expression={final?'deadpan':stop?'realization':'thinking'}
    tilt={stop?6:-7} gazeX={final?8:stop?0:-8}
    leftArm={final?-40:20} rightArm={final?70:-45}
    scarf={Math.sin(f/8)*4}
    lean={stop?0:-5}/>
  {stop?<div style={{
    position:'absolute',left:635,top:535,
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
