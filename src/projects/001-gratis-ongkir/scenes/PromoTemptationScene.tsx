import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../../../brand/tokens';
import {SceneBase} from './SceneBase';

export const PromoTemptationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <div style={{position:'absolute',left:84,top:165,fontSize:28,fontWeight:850,color:brand.colors.green,letterSpacing:1.5}}>
        PROMO MASUK
      </div>
      <div style={{position:'absolute',left:84,right:110,top:225,fontSize:88,fontWeight:950,lineHeight:.98,letterSpacing:-3.4}}>
        “Kurang
        <br /><span style={{color:brand.colors.orange}}>30K</span> lagi.”
      </div>

      <div
        style={{
          position:'absolute',left:90,right:90,top:545,
          background:'#FFFDF8',border:`4px solid ${brand.colors.ink}`,borderRadius:38,padding:'42px',
          opacity:interpolate(frame,[.15*fps,.55*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          scale:interpolate(frame,[.15*fps,.55*fps],[.9,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:180}),output:'perceptual-scale'
          })
        }}
      >
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontSize:26,fontWeight:850,color:brand.colors.green}}>GRATIS ONGKIR</span>
          <span style={{fontSize:24,fontWeight:800,color:brand.colors.muted}}>MIN. 100K</span>
        </div>
        <div style={{height:44,borderRadius:999,overflow:'hidden',background:'#E8E0D5',border:`3px solid ${brand.colors.ink}`,marginTop:40}}>
          <div style={{
            height:'100%',
            width:`${interpolate(frame,[.75*fps,2.35*fps],[0,70],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}%`,
            backgroundColor:brand.colors.green
          }} />
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:28,fontWeight:850,marginTop:18}}>
          <span>70K</span>
          <span>100K</span>
        </div>
      </div>

      <div
        style={{
          position:'absolute',left:165,right:165,top:1045,
          backgroundColor:brand.colors.orange,color:brand.colors.white,borderRadius:30,
          padding:'28px 30px',textAlign:'center',
          opacity:interpolate(frame,[2.0*fps,2.55*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          scale:interpolate(frame,[2.0*fps,2.55*fps],[.82,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:160}),output:'perceptual-scale'
          })
        }}
      >
        <div style={{fontSize:24,fontWeight:800,opacity:.8}}>TINGGAL</div>
        <div style={{fontSize:96,fontWeight:950,lineHeight:1,letterSpacing:-3}}>30K</div>
      </div>

      <div
        style={{
          position:'absolute',left:215,right:215,top:1350,
          border:`3px dashed ${brand.colors.ink}`,borderRadius:24,padding:'18px 22px',
          textAlign:'center',fontSize:31,fontWeight:880,rotate:'-3deg',
          opacity:interpolate(frame,[3.2*fps,3.75*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        otak: “tanggung...”
      </div>
    </SceneBase>
  );
};
