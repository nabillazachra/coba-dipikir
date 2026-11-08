import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {voiceText} from '../voiceover.config';
import {SceneBase} from './SceneBase';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <div
        style={{
          position:'absolute',
          left:84,
          right:84,
          top:145,
          fontSize:103,
          fontWeight:950,
          lineHeight:.92,
          letterSpacing:-4.5,
          opacity:interpolate(frame,[0,.35*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          translate:interpolate(frame,[0,.35*fps],['0px 50px','0px 0px'],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)
          })
        }}
      >
        GRATIS ONGKIR
        <br /><span style={{color:brand.colors.orange}}>enak, kan?</span>
      </div>

      <div
        style={{
          position:'absolute',
          left:115,
          top:520,
          width:850,
          height:520,
          borderRadius:42,
          border:`5px solid ${brand.colors.ink}`,
          backgroundColor:'#FFFDF8',
          overflow:'hidden',
          rotate:interpolate(frame,[0,.7*fps],['-4deg','0deg'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          scale:interpolate(frame,[0,.55*fps],[.88,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:180}),output:'perceptual-scale'
          })
        }}
      >
        <div style={{position:'absolute',left:0,right:0,top:0,height:72,backgroundColor:brand.colors.ink,color:brand.colors.paper,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 28px',fontSize:23,fontWeight:850}}>
          <span>KERANJANG</span>
          <span>1 barang</span>
        </div>

        <div style={{position:'absolute',left:55,right:55,top:135,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <div style={{fontSize:26,fontWeight:800,color:brand.colors.muted}}>Subtotal</div>
            <div style={{fontSize:64,fontWeight:950,marginTop:3}}>Rp70.000</div>
          </div>
          <div
            style={{
              padding:'16px 22px',
              borderRadius:999,
              backgroundColor:'#E7F0E9',
              color:brand.colors.green,
              fontSize:25,
              fontWeight:900,
              border:`3px solid ${brand.colors.green}`,
              opacity:interpolate(frame,[.55*fps,1.0*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
            }}
          >
            PROMO TERSEDIA
          </div>
        </div>

        <div style={{position:'absolute',left:55,right:55,top:300,height:3,backgroundColor:brand.colors.rule}} />

        <div style={{position:'absolute',left:55,right:55,top:345,display:'flex',justifyContent:'space-between',fontSize:32,fontWeight:860}}>
          <span>Ongkir</span>
          <span style={{color:brand.colors.orange}}>Rp10.000</span>
        </div>
      </div>

      <div
        style={{
          position:'absolute',
          left:88,
          top:1115,
          padding:'22px 28px',
          borderRadius:26,
          backgroundColor:brand.colors.orange,
          color:brand.colors.white,
          border:`4px solid ${brand.colors.ink}`,
          fontSize:49,
          fontWeight:950,
          rotate:'-7deg',
          opacity:interpolate(frame,[1.45*fps,1.95*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          translate:interpolate(frame,[1.45*fps,1.95*fps],['-120px 30px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        + Rp35.000
      </div>

      <div
        style={{
          position:'absolute',
          right:85,
          top:1160,
          padding:'22px 28px',
          borderRadius:26,
          backgroundColor:'#E7F0E9',
          color:brand.colors.green,
          border:`4px solid ${brand.colors.green}`,
          fontSize:43,
          fontWeight:950,
          rotate:'6deg',
          opacity:interpolate(frame,[2.15*fps,2.65*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          translate:interpolate(frame,[2.15*fps,2.65*fps],['90px 10px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        hemat Rp10.000
      </div>

      <div
        style={{
          position:'absolute',
          left:100,
          right:100,
          top:1420,
          textAlign:'center',
          fontSize:71,
          fontWeight:950,
          letterSpacing:-2.8,
          opacity:interpolate(frame,[3.0*fps,3.55*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          scale:interpolate(frame,[3.0*fps,3.55*fps],[.82,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:160}),output:'perceptual-scale'
          })
        }}
      >
        <span style={{color:brand.colors.orange}}>35K</span>
        <span style={{color:brand.colors.muted}}> demi </span>
        <span style={{color:brand.colors.green}}>10K?</span>
      </div>

      <Subtitle>{voiceText('01-hook')}</Subtitle>
    </SceneBase>
  );
};
