import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {CommercePhone} from '../CommercePhone';
import {voiceText} from '../voiceover.config';
import {SceneBase} from './SceneBase';

export const PromoTemptationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <div
        style={{
          position:'absolute',
          left:230,
          top:330,
          opacity:interpolate(frame,[0,.4*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          scale:interpolate(frame,[0,.5*fps],[.94,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:190}),output:'perceptual-scale'
          })
        }}
      >
        <CommercePhone dimmed />
      </div>

      <div
        style={{
          position:'absolute',
          left:92,
          right:92,
          top:305,
          borderRadius:42,
          border:`5px solid ${brand.colors.ink}`,
          backgroundColor:brand.colors.white,
          padding:'38px 42px 42px',
          boxShadow:'0 28px 0 rgba(32,37,31,.16)',
          opacity:interpolate(frame,[.5*fps,1.05*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          translate:interpolate(frame,[.5*fps,1.05*fps],['0px -110px','0px 0px'],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)
          }),
          rotate:interpolate(frame,[.5*fps,1.05*fps],['-5deg','0deg'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontSize:23,fontWeight:850,color:brand.colors.green,letterSpacing:1.2}}>PROMO MUNCUL</div>
            <div style={{fontSize:58,fontWeight:950,letterSpacing:-2.2,marginTop:7}}>GRATIS ONGKIR</div>
          </div>
          <div style={{width:74,height:74,borderRadius:20,backgroundColor:'#E7F0E9',display:'grid',placeItems:'center',fontSize:38}}>🎟</div>
        </div>

        <div
          style={{
            marginTop:34,
            borderTop:`3px dashed ${brand.colors.rule}`,
            borderBottom:`3px dashed ${brand.colors.rule}`,
            padding:'28px 0'
          }}
        >
          <div style={{fontSize:27,fontWeight:780,color:brand.colors.muted}}>Belanja minimum</div>
          <div style={{fontSize:82,fontWeight:950,letterSpacing:-3,color:brand.colors.orange,marginTop:6}}>Rp100.000</div>
        </div>

        <div style={{marginTop:32}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:25,fontWeight:850}}>
            <span>Keranjang 70K</span>
            <span style={{color:brand.colors.orange}}>kurang 30K</span>
          </div>
          <div style={{height:38,borderRadius:999,border:`3px solid ${brand.colors.ink}`,background:'#E8E0D5',overflow:'hidden',marginTop:15}}>
            <div
              style={{
                height:'100%',
                width:`${interpolate(frame,[1.0*fps,2.5*fps],[0,70],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}%`,
                backgroundColor:brand.colors.green
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          position:'absolute',
          left:155,
          top:1115,
          padding:'18px 24px',
          borderRadius:999,
          backgroundColor:brand.colors.orange,
          color:brand.colors.white,
          fontSize:31,
          fontWeight:900,
          rotate:'-6deg',
          opacity:interpolate(frame,[2.65*fps,3.1*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          scale:interpolate(frame,[2.65*fps,3.1*fps],[.72,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:150}),output:'perceptual-scale'
          })
        }}
      >
        “cuma kurang 30K...”
      </div>

      <div
        style={{
          position:'absolute',
          right:118,
          top:1270,
          fontSize:66,
          fontWeight:950,
          color:brand.colors.ink,
          rotate:'8deg',
          opacity:interpolate(frame,[3.35*fps,3.8*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        → tanggung.
      </div>

      <Subtitle>{voiceText('03-promo')}</Subtitle>
    </SceneBase>
  );
};
