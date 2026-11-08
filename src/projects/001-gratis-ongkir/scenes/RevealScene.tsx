import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {CommercePhone} from '../CommercePhone';
import {voiceText} from '../voiceover.config';
import {SceneBase} from './SceneBase';

const Confetti = ({left, top, rotate, delay, frame, fps, color}: {
  left: number;
  top: number;
  rotate: string;
  delay: number;
  frame: number;
  fps: number;
  color: string;
}) => (
  <div
    style={{
      position:'absolute',
      left,
      top,
      width:18,
      height:58,
      borderRadius:8,
      backgroundColor:color,
      rotate,
      opacity:interpolate(frame,[delay*fps,(delay+.3)*fps,1.45*fps],[0,1,0],{
        extrapolateLeft:'clamp',extrapolateRight:'clamp'
      }),
      translate:interpolate(frame,[delay*fps,1.45*fps],['0px -80px','0px 120px'],{
        extrapolateLeft:'clamp',extrapolateRight:'clamp'
      })
    }}
  />
);

export const RevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const winOut = interpolate(frame,[1.45*fps,1.95*fps],[1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const compareIn = interpolate(frame,[1.85*fps,2.4*fps],[0,1],{
    extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)
  });

  return (
    <SceneBase>
      <div style={{position:'absolute',inset:0,opacity:winOut}}>
        <div
          style={{
            position:'absolute',
            left:150,
            right:150,
            top:330,
            padding:'50px 36px',
            borderRadius:44,
            backgroundColor:'#E7F0E9',
            border:`5px solid ${brand.colors.green}`,
            textAlign:'center',
            scale:interpolate(frame,[0,.55*fps],[.7,1],{
              extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:145}),output:'perceptual-scale'
            })
          }}
        >
          <div style={{fontSize:30,fontWeight:850,color:brand.colors.green,letterSpacing:1.6}}>PROMO BERHASIL</div>
          <div style={{fontSize:126,fontWeight:950,letterSpacing:-5,color:brand.colors.green,lineHeight:.9,marginTop:18}}>ONGKIR</div>
          <div style={{fontSize:176,fontWeight:950,letterSpacing:-7,lineHeight:.9,marginTop:10}}>Rp0</div>
        </div>

        <Confetti left={130} top={250} rotate="-18deg" delay={.1} frame={frame} fps={fps} color={brand.colors.orange} />
        <Confetti left={250} top={180} rotate="12deg" delay={.2} frame={frame} fps={fps} color={brand.colors.green} />
        <Confetti left={845} top={230} rotate="22deg" delay={.25} frame={frame} fps={fps} color={brand.colors.orange} />
        <Confetti left={930} top={330} rotate="-10deg" delay={.15} frame={frame} fps={fps} color={brand.colors.green} />
        <Confetti left={480} top={170} rotate="32deg" delay={.35} frame={frame} fps={fps} color={brand.colors.orange} />
      </div>

      <div
        style={{
          position:'absolute',
          left:84,
          top:145,
          fontSize:27,
          fontWeight:850,
          color:brand.colors.orange,
          letterSpacing:1.6,
          opacity:compareIn
        }}
      >
        EITS. TOTALNYA?
      </div>

      <div
        style={{
          position:'absolute',
          left:185,
          top:265,
          opacity:compareIn,
          translate:interpolate(frame,[1.85*fps,2.45*fps],['0px 100px','0px 0px'],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)
          }),
          scale:interpolate(frame,[1.85*fps,2.45*fps],[.9,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:180}),output:'perceptual-scale'
          })
        }}
      >
        <CommercePhone
          extraPrice="Rp35.000"
          shippingPrice="Rp0"
          totalPrice="Rp105.000"
          promoLabel="Gratis ongkir"
        />
      </div>

      <div
        style={{
          position:'absolute',
          left:95,
          top:855,
          width:245,
          padding:'22px 22px',
          borderRadius:26,
          backgroundColor:'#FFFDF8',
          border:`4px solid ${brand.colors.ink}`,
          rotate:'-8deg',
          textAlign:'center',
          opacity:interpolate(frame,[2.8*fps,3.35*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        <div style={{fontSize:20,fontWeight:850,color:brand.colors.muted}}>TANPA PROMO</div>
        <div style={{fontSize:66,fontWeight:950,marginTop:5}}>80K</div>
      </div>

      <div
        style={{
          position:'absolute',
          right:70,
          top:1045,
          width:265,
          padding:'22px 22px',
          borderRadius:26,
          backgroundColor:'#FFF0EA',
          border:`4px solid ${brand.colors.orange}`,
          rotate:'7deg',
          textAlign:'center',
          opacity:interpolate(frame,[3.4*fps,4.0*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        <div style={{fontSize:20,fontWeight:850,color:brand.colors.orange}}>KEJAR PROMO</div>
        <div style={{fontSize:66,fontWeight:950,marginTop:5}}>105K</div>
      </div>

      <div
        style={{
          position:'absolute',
          left:145,
          right:145,
          top:1380,
          padding:'25px 28px',
          borderRadius:30,
          backgroundColor:brand.colors.ink,
          color:brand.colors.paper,
          textAlign:'center',
          opacity:interpolate(frame,[5.0*fps,5.55*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          scale:interpolate(frame,[5.0*fps,5.55*fps],[.75,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:150}),output:'perceptual-scale'
          })
        }}
      >
        <div style={{fontSize:22,fontWeight:820,color:'#C8C4BB'}}>SELISIH KELUAR</div>
        <div style={{fontSize:100,fontWeight:950,letterSpacing:-4,color:brand.colors.orange,lineHeight:.95,marginTop:8}}>+25K</div>
      </div>

      {frame < 1.9 * fps ? (
        <Subtitle>{voiceText('05-menang')}</Subtitle>
      ) : frame < 4.85 * fps ? (
        <Subtitle>{voiceText('05-total')}</Subtitle>
      ) : (
        <Subtitle>{voiceText('05-punch')}</Subtitle>
      )}
    </SceneBase>
  );
};
