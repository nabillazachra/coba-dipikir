import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {SceneBase} from './SceneBase';

const ProductCard = ({label, price, left, rotate, active, frame, fps, delay}: {
  label: string;
  price: string;
  left: number;
  rotate: string;
  active?: boolean;
  frame: number;
  fps: number;
  delay: number;
}) => (
  <div
    style={{
      position:'absolute',
      left,
      top:560,
      width:260,
      height:360,
      borderRadius:30,
      backgroundColor:active ? '#FFF3EC' : '#FFFDF8',
      border:`${active ? 5 : 3}px solid ${active ? brand.colors.orange : brand.colors.ink}`,
      padding:22,
      rotate,
      opacity:interpolate(frame,[delay*fps,(delay+.35)*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
      translate:interpolate(frame,[delay*fps,(delay+.35)*fps],['0px 70px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
      scale:active
        ? interpolate(frame,[2.05*fps,2.55*fps],[1,1.08],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:170}),output:'perceptual-scale'
          })
        : 1,
      boxShadow:active ? '0 18px 0 rgba(233,107,60,.14)' : '0 12px 0 rgba(32,37,31,.06)',
    }}
  >
    <div style={{height:210,borderRadius:22,backgroundColor:active?'#F0C6B5':'#E7D9C6',display:'grid',placeItems:'center'}}>
      <div style={{width:94,height:118,border:`5px solid ${brand.colors.ink}`,borderRadius:'24px 24px 34px 34px',position:'relative'}}>
        <div style={{position:'absolute',left:18,top:-25,width:48,height:24,border:`5px solid ${brand.colors.ink}`,borderBottom:0,borderRadius:'30px 30px 0 0'}} />
      </div>
    </div>
    <div style={{marginTop:18,fontSize:21,fontWeight:800,color:brand.colors.muted}}>{label}</div>
    <div style={{marginTop:5,fontSize:48,fontWeight:950}}>{price}</div>
  </div>
);

export const DecisionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <div style={{position:'absolute',left:84,top:165,fontSize:28,fontWeight:850,color:brand.colors.orange,letterSpacing:1.5}}>
        MULAI CARI-CARI
      </div>
      <div style={{position:'absolute',left:84,right:90,top:225,fontSize:86,fontWeight:950,lineHeight:.98,letterSpacing:-3.3}}>
        “Sekalian aja...”
      </div>

      <ProductCard label="opsi A" price="15K" left={70} rotate="-6deg" frame={frame} fps={fps} delay={.25} />
      <ProductCard label="opsi B" price="20K" left={410} rotate="3deg" frame={frame} fps={fps} delay={.55} />
      <ProductCard label="nah ini" price="35K" left={750} rotate="-2deg" active frame={frame} fps={fps} delay={.85} />

      <div
        style={{
          position:'absolute',left:115,right:115,top:1035,
          display:'grid',gridTemplateColumns:'1fr 150px 1fr',gap:20,alignItems:'center',
          opacity:interpolate(frame,[2.45*fps,2.9*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        <div style={{backgroundColor:'#FFFDF8',border:`3px solid ${brand.colors.ink}`,borderRadius:24,padding:'25px 28px'}}>
          <div style={{fontSize:23,fontWeight:800,color:brand.colors.muted}}>SEBELUM</div>
          <div style={{fontSize:64,fontWeight:950,marginTop:4}}>70K</div>
        </div>
        <div style={{fontSize:64,fontWeight:950,textAlign:'center',color:brand.colors.orange}}>→</div>
        <div style={{backgroundColor:brand.colors.ink,color:brand.colors.paper,borderRadius:24,padding:'25px 28px'}}>
          <div style={{fontSize:23,fontWeight:800,color:'#BDBDB5'}}>SESUDAH</div>
          <div style={{fontSize:64,fontWeight:950,marginTop:4}}>105K</div>
        </div>
      </div>

      <div
        style={{
          position:'absolute',left:180,right:180,top:1370,
          borderRadius:999,backgroundColor:'#E7F0E9',border:`4px solid ${brand.colors.green}`,
          color:brand.colors.green,padding:'22px 28px',textAlign:'center',
          fontSize:50,fontWeight:950,
          opacity:interpolate(frame,[3.5*fps,4.0*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          scale:interpolate(frame,[3.5*fps,4.0*fps],[.78,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:150}),output:'perceptual-scale'
          })
        }}
      >
        ONGKIR 0 ✓
      </div>

      <Subtitle>
        Dan entah kenapa... nemu barang 35 ribu.
        <br />Cocok banget, ya?
      </Subtitle>
    </SceneBase>
  );
};
