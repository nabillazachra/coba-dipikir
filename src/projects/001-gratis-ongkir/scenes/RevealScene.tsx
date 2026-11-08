import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../../../brand/tokens';
import {SceneBase} from './SceneBase';

export const RevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const celebrateOut = interpolate(frame,[.9*fps,1.35*fps],[1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const compareIn = interpolate(frame,[1.05*fps,1.55*fps],[0,1],{
    extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:180})
  });

  return (
    <SceneBase>
      <div
        style={{
          position:'absolute',inset:'160px 90px 360px',
          display:'grid',placeItems:'center',
          opacity:celebrateOut,
          scale:interpolate(frame,[0,.45*fps],[.75,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:150}),output:'perceptual-scale'
          })
        }}
      >
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:32,fontWeight:850,color:brand.colors.green,letterSpacing:1.6}}>BERHASIL!</div>
          <div style={{fontSize:156,fontWeight:950,letterSpacing:-6,color:brand.colors.green,lineHeight:.9,marginTop:12}}>ONGKIR</div>
          <div style={{fontSize:180,fontWeight:950,letterSpacing:-7,lineHeight:.9}}>Rp0</div>
        </div>
      </div>

      <div style={{position:'absolute',left:70,right:70,top:180,opacity:compareIn}}>
        <div style={{fontSize:28,fontWeight:850,color:brand.colors.orange,letterSpacing:1.5}}>EH. TOTALNYA?</div>
        <div style={{fontSize:82,fontWeight:950,lineHeight:.98,letterSpacing:-3.3,marginTop:12}}>
          Bandingin aja.
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginTop:95}}>
          <div style={{border:`4px solid ${brand.colors.ink}`,borderRadius:34,background:'#FFFDF8',padding:'34px 28px',textAlign:'center'}}>
            <div style={{fontSize:25,fontWeight:850,color:brand.colors.muted}}>CHECKOUT LANGSUNG</div>
            <div style={{fontSize:94,fontWeight:950,letterSpacing:-3,marginTop:24}}>80K</div>
            <div style={{fontSize:24,fontWeight:800,color:brand.colors.muted,marginTop:16}}>70K + ongkir 10K</div>
          </div>
          <div style={{border:`4px solid ${brand.colors.orange}`,borderRadius:34,background:'#FFF3EC',padding:'34px 28px',textAlign:'center'}}>
            <div style={{fontSize:25,fontWeight:850,color:brand.colors.orange}}>KEJAR PROMO</div>
            <div style={{fontSize:94,fontWeight:950,letterSpacing:-3,marginTop:24}}>105K</div>
            <div style={{fontSize:24,fontWeight:800,color:brand.colors.muted,marginTop:16}}>70K + 35K + ongkir 0</div>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 70px 1fr',gap:14,alignItems:'center',marginTop:70,
          opacity:interpolate(frame,[3.1*fps,3.6*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}>
          <div style={{backgroundColor:'#E7F0E9',border:`3px solid ${brand.colors.green}`,borderRadius:22,padding:'20px 18px',textAlign:'center',color:brand.colors.green}}>
            <div style={{fontSize:22,fontWeight:850}}>HEMAT ONGKIR</div>
            <div style={{fontSize:58,fontWeight:950,marginTop:4}}>-10K</div>
          </div>
          <div style={{fontSize:52,fontWeight:950,textAlign:'center'}}>+</div>
          <div style={{backgroundColor:'#FFF0EA',border:`3px solid ${brand.colors.orange}`,borderRadius:22,padding:'20px 18px',textAlign:'center',color:brand.colors.orange}}>
            <div style={{fontSize:22,fontWeight:850}}>TAMBAH BARANG</div>
            <div style={{fontSize:58,fontWeight:950,marginTop:4}}>+35K</div>
          </div>
        </div>

        <div
          style={{
            marginTop:70,textAlign:'center',
            opacity:interpolate(frame,[4.7*fps,5.25*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
            scale:interpolate(frame,[4.7*fps,5.25*fps],[.78,1],{
              extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:150}),output:'perceptual-scale'
            })
          }}
        >
          <div style={{fontSize:28,fontWeight:850,color:brand.colors.muted}}>HASIL AKHIR</div>
          <div style={{fontSize:122,fontWeight:950,letterSpacing:-4,color:brand.colors.orange,lineHeight:.95}}>+25K</div>
          <div style={{fontSize:28,fontWeight:800,color:brand.colors.muted,marginTop:12}}>lebih banyak keluar</div>
        </div>
      </div>
    </SceneBase>
  );
};
