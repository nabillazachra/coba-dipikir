import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {CommercePhone} from '../CommercePhone';
import {voiceText} from '../voiceover.config';
import {SceneBase} from './SceneBase';

export const InitialCheckoutScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <div style={{position:'absolute',left:84,top:150,fontSize:27,fontWeight:850,color:brand.colors.orange,letterSpacing:1.6}}>
        CHECKOUT NORMAL
      </div>

      <div style={{position:'absolute',left:84,right:100,top:205,fontSize:80,fontWeight:950,lineHeight:.98,letterSpacing:-3.1}}>
        Sebelum promo
        <br />ikut campur.
      </div>

      <div
        style={{
          position:'absolute',
          left:205,
          top:475,
          opacity:interpolate(frame,[0,.45*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          translate:interpolate(frame,[0,.55*fps],['0px 90px','0px 0px'],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)
          }),
          rotate:interpolate(frame,[0,.8*fps],['-5deg','-1deg'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          scale:interpolate(frame,[0,.55*fps],[.9,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:180}),output:'perceptual-scale'
          })
        }}
      >
        <CommercePhone />
      </div>

      <div
        style={{
          position:'absolute',
          left:100,
          top:925,
          width:165,
          height:165,
          borderRadius:999,
          display:'grid',
          placeItems:'center',
          backgroundColor:brand.colors.orange,
          color:brand.colors.white,
          border:`5px solid ${brand.colors.ink}`,
          fontSize:32,
          fontWeight:950,
          rotate:'-11deg',
          opacity:interpolate(frame,[1.3*fps,1.75*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          scale:interpolate(frame,[1.3*fps,1.75*fps],[.5,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:140}),output:'perceptual-scale'
          })
        }}
      >
        70K
      </div>

      <div
        style={{
          position:'absolute',
          right:100,
          top:1060,
          width:155,
          height:155,
          borderRadius:999,
          display:'grid',
          placeItems:'center',
          backgroundColor:'#E7F0E9',
          color:brand.colors.green,
          border:`5px solid ${brand.colors.green}`,
          fontSize:30,
          fontWeight:950,
          rotate:'9deg',
          opacity:interpolate(frame,[2.1*fps,2.55*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        +10K
      </div>

      <div
        style={{
          position:'absolute',
          left:115,
          top:1410,
          padding:'14px 20px',
          borderRadius:18,
          backgroundColor:brand.colors.ink,
          color:brand.colors.paper,
          fontSize:25,
          fontWeight:850,
          rotate:'-4deg',
          opacity:interpolate(frame,[3.2*fps,3.7*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        totalnya 80K. selesai.
      </div>

      <Subtitle>{voiceText('02-awal')}</Subtitle>
    </SceneBase>
  );
};
