import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {brand} from '../../brand/tokens';
import {Character, type CharacterExpression} from '../002-kulkas/Character';

export const FONT = brand.fontFamily;
export const PAPER = brand.colors.paper;
export const INK = brand.colors.ink;
export const ORANGE = brand.colors.orange;
export const GREEN = brand.colors.green;
export const clamp = {extrapolateLeft:'clamp', extrapolateRight:'clamp'} as const;

export const tween = (f:number, frames:number[], values:number[]) =>
  interpolate(f,frames,values,clamp);

export const SceneCanvas: React.FC<{
  children:React.ReactNode;
  dark?:boolean;
  store?:boolean;
}> = ({children,dark=false,store=true}) => (
  <AbsoluteFill style={{
    overflow:'hidden',
    backgroundColor:dark?INK:PAPER,
    color:dark?PAPER:INK,
    fontFamily:FONT,
  }}>
    {!dark ? (
      <>
        <div style={{
          position:'absolute',left:-280,top:450,width:750,height:750,
          borderRadius:999,backgroundColor:'#F8E3D0',opacity:.33,
        }}/>
        <div style={{
          position:'absolute',right:-300,top:420,width:700,height:900,
          borderRadius:'48%',backgroundColor:'#E7ECE2',opacity:.52,
        }}/>
      </>
    ):(
      <div style={{
        position:'absolute',left:-160,top:160,width:1100,height:1150,
        background:'radial-gradient(circle at 50% 55%,#3A4037 0%,#20251F 74%)',
      }}/>
    )}
    {store ? (
      <>
        <div style={{
          position:'absolute',left:0,right:0,top:1208,height:8,
          backgroundColor:dark?'#D9CBB7':'#C7B49F',
        }}/>
        <div style={{
          position:'absolute',left:0,right:0,top:1216,height:222,
          background:dark?'linear-gradient(#2E3530,#262C28)':'linear-gradient(#E9DECF,#F0E7DA)',
        }}/>
        <div style={{
          position:'absolute',left:0,right:0,top:1438,bottom:0,
          backgroundColor:dark?INK:PAPER,
        }}/>
        {/* Keep the typography band completely clear of set dressing. */}
      </>
    ) : null}
    {children}
  </AbsoluteFill>
);

export const TopText: React.FC<{
  eyebrow?:string;
  children:React.ReactNode;
  align?:'left'|'center';
  size?:number;
  dark?:boolean;
}> = ({eyebrow,children,align='left',size=81,dark=false}) => (
  <div style={{
    position:'absolute',
    left:92,right:92,top:308,
    textAlign:align,
    color:dark?PAPER:INK,
    fontFamily:FONT,
    zIndex:6,
  }}>
    {eyebrow ? <div style={{
      fontSize:23,fontWeight:850,letterSpacing:3.2,
      color:ORANGE,marginBottom:16,
    }}>{eyebrow}</div> : null}
    <div style={{
      fontSize:size,fontWeight:900,
      lineHeight:1.08,letterSpacing:-2.3,
    }}>{children}</div>
  </div>
);

export const ProductBox: React.FC<{
  x:number;y:number;width?:number;
  tilt?:number;opacity?:number;bounce?:number;
  highlighted?:boolean;
}> = ({x,y,width=315,tilt=0,opacity=1,bounce=0,highlighted=false}) => {
  const height=width*1.2;
  return (
    <div style={{
      position:'absolute',left:x,top:y,width,height,opacity,
      transform:'translateY('+bounce+'px) rotate('+tilt+'deg)',
      transformOrigin:'50% 95%',
      filter:highlighted?'drop-shadow(0 0 35px rgba(233,107,60,.24))':'none',
    }}>
      <svg viewBox="0 0 315 378" width="100%" height="100%">
        <ellipse cx="160" cy="364" rx="123" ry="14" fill="rgba(32,37,31,.12)"/>
        <path d="M42 45 L274 45 L294 65 L294 338 L66 338 L42 313 Z"
          fill="#D8C5A7" stroke="#20251F" strokeWidth="9" strokeLinejoin="round"/>
        <path d="M42 45 L66 65 L294 65 L274 45 Z" fill="#E7D5B8"
          stroke="#20251F" strokeWidth="8" strokeLinejoin="round"/>
        <path d="M42 45 L66 65 L66 338 L42 313 Z" fill="#BDAA8F"
          stroke="#20251F" strokeWidth="7" strokeLinejoin="round"/>
        <rect x="84" y="93" width="187" height="194" rx="18"
          fill="#FFF9EA" stroke="#20251F" strokeWidth="7"/>
        <circle cx="176" cy="174" r="56" fill="#F1A85D" stroke="#20251F" strokeWidth="6"/>
        <circle cx="161" cy="162" r="9" fill="#20251F"/>
        <circle cx="199" cy="153" r="8" fill="#20251F"/>
        <circle cx="182" cy="193" r="8" fill="#20251F"/>
        <path d="M132 226 Q180 245 225 221" fill="none"
          stroke="#20251F" strokeWidth="7" strokeLinecap="round"/>
        <rect x="123" y="248" width="114" height="14" rx="7" fill="#D0D9CB"/>
        <rect x="110" y="301" width="130" height="10" rx="5" fill="#AD9A84" opacity=".65"/>
        <path d="M60 64 V337" stroke="#B3A38D" strokeWidth="3"/>
      </svg>
    </div>
  );
};

export const PriceTag:React.FC<{
  x:number;y:number;
  text:string;
  width?:number;
  highlight?:boolean;
  scale?:number;
  rotate?:number;
  dim?:boolean;
  color?:string;
}> = ({x,y,text,width=400,highlight=false,scale=1,rotate=0,dim=false,color}) => (
  <div style={{
    position:'absolute',left:x,top:y,width,
    transform:'scale('+scale+') rotate('+rotate+'deg)',
    transformOrigin:'50% 50%',
    zIndex:4,
    opacity:dim ? 0.33 : 1,
  }}>
    <div style={{
      position:'absolute',
      left:'50%',top:-27,width:4,height:30,
      backgroundColor:darken(color??INK),opacity:.34,
    }}/>
    <div style={{
      padding:'20px 16px 21px',
      borderRadius:24,
      border:'5px solid '+(highlight?ORANGE:INK),
      backgroundColor:color??(highlight?'#FFF0E7':'#FFFCF6'),
      boxShadow:highlight?'8px 10px 0 rgba(233,107,60,.15)':'7px 9px 0 rgba(32,37,31,.12)',
      fontSize:Math.min(75,Math.floor((width-54)/(text.length*.62))),
      fontFamily:FONT,
      lineHeight:1.05,
      textAlign:'center',
      fontWeight:950,
      letterSpacing:-2.5,
      whiteSpace:'nowrap',
      color:INK,
    }}>{text}</div>
  </div>
);
const darken=(_color:string)=>INK;

export const Actor: React.FC<{
  x:number;y:number;width?:number;
  expression?:CharacterExpression;
  tilt?:number;lean?:number;
  leftArm?:number;rightArm?:number;
  blink?:number;walk?:number;
  scarf?:number;
  flip?:boolean;bob?:number;
  gazeX?:number;
}> = ({
  x,y,width=350,expression='neutral',tilt=0,lean=0,
  leftArm=12,rightArm=-12,blink=0,walk=0,scarf=0,flip=false,bob=0,
  gazeX=0,
}) => {
  const frame=useCurrentFrame();
  // Anchor the larger actor to the same floor point, not the original top-left.
  const scale=1.14;
  return <Character
    left={x-width*(scale-1)/2}
    top={y-width*(scale-1)*1.4}
    width={width*scale}
    expression={expression}
    headTilt={tilt} lean={lean} leftArm={leftArm} rightArm={rightArm}
    blink={Math.max(blink,frame%109>105?1:0)}
    step={walk} scarfSwing={scarf} flip={flip}
    bob={bob+Math.sin(frame/11)*3}
    gazeX={gazeX}
  />;
};

export const Burst: React.FC<{
  x:number;y:number;visible:number;
  size?:number;
  color?:string;
}> = ({x,y,visible,size=100,color=ORANGE}) => (
  <div style={{
    position:'absolute',left:x,top:y,
    width:size,height:size,
    opacity:visible,
    scale:visible,
    pointerEvents:'none',
  }}>
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <path d="M50 1 L60 35 L85 10 L70 42 L99 50 L67 59 L86 91 L57 70 L49 100 L40 68 L12 89 L30 58 L1 48 L33 41 L14 14 L43 33 Z"
        fill={color} stroke={INK} strokeWidth="5" strokeLinejoin="round"/>
    </svg>
  </div>
);

export const EditorNote:React.FC<{text:string;x?:number;y?:number;rotate?:number}> = ({
  text,x=80,y=500,rotate=-3,
}) => (
  <div style={{
    position:'absolute',left:x,top:y,
    rotate:rotate+'deg',
    fontFamily:FONT,fontSize:29,fontWeight:850,letterSpacing:.2,
    color:ORANGE,
  }}>{text}</div>
);

export const FloatIn:React.FC<{
 children:React.ReactNode;
 from?:number;duration?:number;
 y?:number;scaleFrom?:number;
}> = ({children,from=0,duration=.4,y=32,scaleFrom=.87}) => {
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const progress=interpolate(f,[from*fps,(from+duration)*fps],[0,1],{
    ...clamp,easing:Easing.bezier(.18,1,.3,1),
  });
  return <div style={{
    opacity:progress,
    transform:'translateY('+((1-progress)*y)+'px) scale('+(scaleFrom+(1-scaleFrom)*progress)+')',
  }}>{children}</div>;
};
