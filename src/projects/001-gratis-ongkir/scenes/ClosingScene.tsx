import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {voiceText} from '../voiceover.config';
import {SceneBase} from './SceneBase';

const MoneyStack = ({x, amount, label, accent, height, frame, fps, delay}: {
  x: number;
  amount: string;
  label: string;
  accent: string;
  height: number;
  frame: number;
  fps: number;
  delay: number;
}) => (
  <div
    style={{
      position:'absolute',
      left:x,
      top:690,
      width:280,
      height:450,
      opacity:interpolate(frame,[delay*fps,(delay+.45)*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
    }}
  >
    <div style={{position:'absolute',left:30,right:30,bottom:0,height}}>
      {[0,1,2,3,4].map((i)=>(
        <div
          key={i}
          style={{
            position:'absolute',
            left:0,
            right:0,
            bottom:i*(height/6),
            height:68,
            borderRadius:14,
            backgroundColor:i%2===0 ? accent : '#FFFDF8',
            border:`3px solid ${brand.colors.ink}`,
            rotate:i%2===0 ? '-2deg' : '2deg'
          }}
        />
      ))}
    </div>
    <div style={{position:'absolute',left:0,right:0,top:0,textAlign:'center'}}>
      <div style={{fontSize:23,fontWeight:850,color:brand.colors.muted}}>{label}</div>
      <div style={{fontSize:72,fontWeight:950,marginTop:6,color:accent}}>{amount}</div>
    </div>
  </div>
);

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <div style={{position:'absolute',left:84,top:155,fontSize:27,fontWeight:850,color:brand.colors.orange,letterSpacing:1.6}}>
        COBA DITIMBANG
      </div>
      <div style={{position:'absolute',left:84,right:95,top:210,fontSize:82,fontWeight:950,lineHeight:.98,letterSpacing:-3.2}}>
        Yang dihemat
        <br />vs yang ditambah.
      </div>

      <MoneyStack x={120} amount="10K" label="ONGKIR HEMAT" accent={brand.colors.green} height={165} frame={frame} fps={fps} delay={.35} />
      <MoneyStack x={680} amount="35K" label="BELANJA TAMBAHAN" accent={brand.colors.orange} height={330} frame={frame} fps={fps} delay={.7} />

      <div
        style={{
          position:'absolute',
          left:235,
          top:1130,
          width:610,
          height:10,
          borderRadius:999,
          backgroundColor:brand.colors.ink,
          rotate:interpolate(frame,[.8*fps,2.4*fps],['0deg','8deg'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      />
      <div
        style={{
          position:'absolute',
          left:485,
          top:1125,
          width:110,
          height:145,
          backgroundColor:brand.colors.ink,
          clipPath:'polygon(50% 0,100% 100%,0 100%)'
        }}
      />

      <div
        style={{
          position:'absolute',
          left:110,
          right:110,
          top:1315,
          textAlign:'center',
          opacity:interpolate(frame,[2.2*fps,2.8*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          translate:interpolate(frame,[2.2*fps,2.8*fps],['0px 45px','0px 0px'],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)
          })
        }}
      >
        <div style={{fontSize:30,fontWeight:840,color:brand.colors.muted}}>Jadi pertanyaannya bukan cuma “gratis?”</div>
        <div style={{fontSize:76,fontWeight:950,letterSpacing:-3,marginTop:16}}>Tanpa promo,<br/>tetap dibeli?</div>
      </div>

      <div
        style={{
          position:'absolute',
          left:0,
          right:0,
          bottom:115,
          textAlign:'center',
          fontSize:34,
          fontWeight:900,
          color:brand.colors.orange,
          opacity:interpolate(frame,[4.5*fps,5.15*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        ( coba dipikir. )
      </div>

      <Subtitle>{voiceText('06-penutup')}</Subtitle>
    </SceneBase>
  );
};
