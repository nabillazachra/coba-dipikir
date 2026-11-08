import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {voiceText} from '../voiceover.config';
import {SceneBase} from './SceneBase';

const ProductCard = ({x, label, price, delay, selected, frame, fps}: {
  x: number;
  label: string;
  price: string;
  delay: number;
  selected?: boolean;
  frame: number;
  fps: number;
}) => (
  <div
    style={{
      position:'absolute',
      left:x,
      top:585,
      width:300,
      height:430,
      borderRadius:34,
      backgroundColor:selected ? '#FFF0E8' : '#FFFDF8',
      border:`${selected ? 5 : 3}px solid ${selected ? brand.colors.orange : brand.colors.ink}`,
      padding:22,
      opacity:interpolate(frame,[delay*fps,(delay+.4)*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
      translate:interpolate(frame,[delay*fps,(delay+.4)*fps],['0px 85px','0px 0px'],{
        extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)
      }),
      scale:selected
        ? interpolate(frame,[2.15*fps,2.75*fps],[1,1.08],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:155}),output:'perceptual-scale'
          })
        : 1,
      boxShadow:selected ? '0 22px 0 rgba(233,107,60,.15)' : '0 12px 0 rgba(32,37,31,.07)'
    }}
  >
    <div style={{height:260,borderRadius:26,backgroundColor:selected?'#F2C9B7':'#E8D8C3',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',left:'50%',top:'50%',translate:'-50% -50%',width:112,height:138,border:`5px solid ${brand.colors.ink}`,borderRadius:'28px 28px 38px 38px'}} />
      <div style={{position:'absolute',left:34,bottom:28,width:54,height:54,borderRadius:999,backgroundColor:'rgba(255,255,255,.55)'}} />
      <div style={{position:'absolute',right:26,top:26,width:36,height:36,borderRadius:999,border:`3px solid ${brand.colors.ink}`}} />
    </div>
    <div style={{fontSize:21,fontWeight:820,color:brand.colors.muted,marginTop:18}}>{label}</div>
    <div style={{fontSize:50,fontWeight:950,marginTop:5}}>{price}</div>
    {selected ? (
      <div style={{marginTop:12,fontSize:20,fontWeight:900,color:brand.colors.orange}}>pas banget buat promo 👀</div>
    ) : null}
  </div>
);

export const DecisionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <div style={{position:'absolute',left:84,top:150,fontSize:27,fontWeight:850,color:brand.colors.orange,letterSpacing:1.6}}>
        MULAI CARI-CARI
      </div>
      <div style={{position:'absolute',left:84,right:95,top:205,fontSize:83,fontWeight:950,lineHeight:.97,letterSpacing:-3.2}}>
        “Sekalian lihat
        <br />yang lain deh...”
      </div>

      <div style={{position:'absolute',left:58,right:58,top:515,height:560,overflow:'hidden'}}>
        <div
          style={{
            position:'absolute',
            inset:0,
            translate:interpolate(frame,[0,2.6*fps],['80px 0px','-45px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
          }}
        >
          <ProductCard x={20} label="yang lucu" price="15K" delay={.2} frame={frame} fps={fps} />
          <ProductCard x={350} label="yang lumayan" price="20K" delay={.55} frame={frame} fps={fps} />
          <ProductCard x={680} label="nah, ini dia" price="35K" delay={.9} selected frame={frame} fps={fps} />
        </div>
      </div>

      <div
        style={{
          position:'absolute',
          left:205,
          right:205,
          top:1110,
          borderRadius:28,
          backgroundColor:brand.colors.ink,
          color:brand.colors.paper,
          padding:'24px 28px',
          textAlign:'center',
          fontSize:37,
          fontWeight:920,
          opacity:interpolate(frame,[2.75*fps,3.2*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          scale:interpolate(frame,[2.75*fps,3.2*fps],[.88,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:180}),output:'perceptual-scale'
          })
        }}
      >
        + Tambah ke Keranjang
      </div>

      <div
        style={{
          position:'absolute',
          left:495,
          top:1203,
          width:90,
          height:90,
          borderRadius:999,
          backgroundColor:brand.colors.orange,
          border:`4px solid ${brand.colors.ink}`,
          display:'grid',
          placeItems:'center',
          color:brand.colors.white,
          fontSize:42,
          fontWeight:950,
          opacity:interpolate(frame,[3.05*fps,3.5*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          translate:interpolate(frame,[3.05*fps,3.5*fps],['80px -80px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        ✓
      </div>

      <div
        style={{
          position:'absolute',
          left:125,
          right:125,
          top:1355,
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between',
          padding:'20px 24px',
          borderRadius:24,
          backgroundColor:'#E7F0E9',
          border:`3px solid ${brand.colors.green}`,
          color:brand.colors.green,
          opacity:interpolate(frame,[4.05*fps,4.55*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        <span style={{fontSize:24,fontWeight:850}}>Minimum tercapai</span>
        <span style={{fontSize:46,fontWeight:950}}>105K ✓</span>
      </div>

      <Subtitle>{voiceText('04-keputusan')}</Subtitle>
    </SceneBase>
  );
};
