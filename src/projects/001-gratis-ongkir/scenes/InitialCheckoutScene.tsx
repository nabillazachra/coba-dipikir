import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../../../brand/tokens';
import {SceneBase} from './SceneBase';

export const InitialCheckoutScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const card = (delay: number) => interpolate(frame, [delay * fps, (delay + 0.4) * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.spring({damping: 190}),
  });

  return (
    <SceneBase>
      <div style={{position:'absolute',left:84,top:165,fontSize:28,fontWeight:850,color:brand.colors.orange,letterSpacing:1.5}}>
        TANPA PROMO
      </div>
      <div style={{position:'absolute',left:84,right:110,top:225,fontSize:86,fontWeight:950,lineHeight:.98,letterSpacing:-3.2}}>
        Sebenarnya
        <br />udah simpel.
      </div>

      <div style={{position:'absolute',left:90,right:90,top:560,display:'grid',gridTemplateColumns:'1fr 90px 1fr',gap:18,alignItems:'center'}}>
        <div style={{opacity:card(.2),scale:card(.2),background:'#FFFDF8',border:`4px solid ${brand.colors.ink}`,borderRadius:32,padding:'42px 30px',textAlign:'center'}}>
          <div style={{fontSize:25,fontWeight:800,color:brand.colors.muted}}>BARANG</div>
          <div style={{fontSize:70,fontWeight:950,marginTop:8}}>70K</div>
        </div>
        <div style={{fontSize:56,fontWeight:900,textAlign:'center',opacity:card(.65)}}>+</div>
        <div style={{opacity:card(.95),scale:card(.95),background:'#FFFDF8',border:`4px solid ${brand.colors.ink}`,borderRadius:32,padding:'42px 30px',textAlign:'center'}}>
          <div style={{fontSize:25,fontWeight:800,color:brand.colors.muted}}>ONGKIR</div>
          <div style={{fontSize:70,fontWeight:950,marginTop:8}}>10K</div>
        </div>
      </div>

      <div
        style={{
          position:'absolute',left:120,right:120,top:980,
          display:'flex',alignItems:'center',justifyContent:'center',gap:26,
          opacity:interpolate(frame,[1.9*fps,2.45*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          translate:interpolate(frame,[1.9*fps,2.45*fps],['0px 35px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        <div style={{width:80,height:3,backgroundColor:brand.colors.rule}} />
        <div style={{fontSize:46,fontWeight:900,color:brand.colors.muted}}>=</div>
        <div style={{width:80,height:3,backgroundColor:brand.colors.rule}} />
      </div>

      <div
        style={{
          position:'absolute',left:120,right:120,top:1110,
          backgroundColor:brand.colors.ink,color:brand.colors.paper,borderRadius:34,
          padding:'34px 40px',textAlign:'center',
          opacity:interpolate(frame,[2.35*fps,2.9*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          scale:interpolate(frame,[2.35*fps,2.9*fps],[0.9,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:180}),output:'perceptual-scale'
          })
        }}
      >
        <div style={{fontSize:28,fontWeight:800,color:'#BEBEB6'}}>TOTAL</div>
        <div style={{fontSize:98,fontWeight:950,letterSpacing:-3,marginTop:4}}>80K</div>
      </div>

      <div style={{
        position:'absolute',right:110,top:1460,padding:'12px 18px',
        borderRadius:999,border:`2px solid ${brand.colors.green}`,color:brand.colors.green,
        fontSize:24,fontWeight:850,rotate:'-4deg',
        opacity:interpolate(frame,[3.5*fps,4.1*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
      }}>
        selesai.
      </div>
    </SceneBase>
  );
};
