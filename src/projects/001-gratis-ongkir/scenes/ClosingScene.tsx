import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {voiceText} from '../voiceover.config';
import {SceneBase} from './SceneBase';

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <div
        style={{
          position:'absolute',left:115,right:115,top:300,height:420,
          opacity:interpolate(frame,[0,.45*fps,2.1*fps,2.65*fps],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        <div style={{position:'absolute',left:0,top:70,width:300,borderRadius:30,background:'#E7F0E9',border:`4px solid ${brand.colors.green}`,padding:'28px',textAlign:'center',rotate:'-7deg'}}>
          <div style={{fontSize:24,fontWeight:850,color:brand.colors.green}}>YANG DIHEMAT</div>
          <div style={{fontSize:82,fontWeight:950,color:brand.colors.green,marginTop:8}}>10K</div>
        </div>
        <div style={{position:'absolute',right:0,top:30,width:330,borderRadius:30,background:'#FFF0EA',border:`4px solid ${brand.colors.orange}`,padding:'28px',textAlign:'center',rotate:'6deg'}}>
          <div style={{fontSize:24,fontWeight:850,color:brand.colors.orange}}>YANG DITAMBAH</div>
          <div style={{fontSize:82,fontWeight:950,color:brand.colors.orange,marginTop:8}}>35K</div>
        </div>
        <div style={{position:'absolute',left:300,right:300,top:295,height:5,backgroundColor:brand.colors.ink,rotate:'5deg'}} />
        <div style={{position:'absolute',left:420,top:295,width:70,height:150,backgroundColor:brand.colors.ink,clipPath:'polygon(50% 0,100% 100%,0 100%)'}} />
      </div>

      <div
        style={{
          position:'absolute',left:84,right:84,top:500,textAlign:'center',
          opacity:interpolate(frame,[2.3*fps,2.9*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          translate:interpolate(frame,[2.3*fps,2.9*fps],['0px 42px','0px 0px'],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)
          })
        }}
      >
        <div style={{fontSize:31,fontWeight:850,color:brand.colors.orange,letterSpacing:1.4}}>JADI...</div>
        <div style={{fontSize:108,fontWeight:950,lineHeight:.92,letterSpacing:-4.5,marginTop:24}}>
          Masih
          <br />hemat?
        </div>
      </div>

      <div
        style={{
          position:'absolute',left:95,right:95,top:1040,
          borderTop:`3px solid ${brand.colors.ink}`,paddingTop:54,textAlign:'center',
          opacity:interpolate(frame,[3.55*fps,4.2*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }}
      >
        <div style={{fontSize:31,fontWeight:800,color:brand.colors.muted}}>Tanpa promo,</div>
        <div style={{fontSize:82,fontWeight:950,lineHeight:.98,letterSpacing:-3,marginTop:10}}>
          tetap dibeli?
        </div>
        <div style={{
          display:'inline-flex',alignItems:'center',gap:16,marginTop:70,
          color:brand.colors.orange,fontSize:34,fontWeight:850,
          scale:interpolate(frame,[4.8*fps,5.3*fps],[.8,1],{
            extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.spring({damping:170}),output:'perceptual-scale'
          })
        }}>
          <span>(</span><span>coba dipikir.</span><span>)</span>
        </div>
      </div>

      <Subtitle>{voiceText('06-penutup')}</Subtitle>
    </SceneBase>
  );
};
