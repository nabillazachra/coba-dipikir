import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../../../brand/tokens';
import {SceneBase} from './SceneBase';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <div
        style={{
          position: 'absolute',
          left: 84,
          right: 84,
          top: 155,
          fontSize: 108,
          fontWeight: 950,
          lineHeight: 0.92,
          letterSpacing: -5,
          color: brand.colors.green,
          opacity: interpolate(frame, [0, 0.32 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          translate: interpolate(frame, [0, 0.32 * fps], ['0px 42px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        GRATIS
        <br />ONGKIR?
      </div>

      <div
        style={{
          position: 'absolute',
          left: 105,
          top: 530,
          width: 800,
          height: 520,
          border: `5px solid ${brand.colors.ink}`,
          borderRadius: 44,
          backgroundColor: '#FFFDF8',
          overflow: 'hidden',
          rotate: interpolate(frame, [0, 0.7 * fps], ['-5deg', '0deg'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          scale: interpolate(frame, [0, 0.55 * fps], [0.84, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.spring({damping: 180}),
            output: 'perceptual-scale',
          }),
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 72,
            right: 72,
            top: 155,
            height: 170,
            border: `7px solid ${brand.colors.ink}`,
            borderTop: 0,
            borderRadius: '0 0 36px 36px',
          }}
        />
        <div style={{position:'absolute',left:155,top:108,width:145,height:118,borderRadius:22,backgroundColor:'#E7D9C6',border:`4px solid ${brand.colors.ink}`,rotate:'-9deg',
          opacity:interpolate(frame,[0.7*fps,1.1*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          translate:interpolate(frame,[0.7*fps,1.1*fps],['0px -90px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }} />
        <div style={{position:'absolute',right:145,top:95,width:155,height:128,borderRadius:22,backgroundColor:brand.colors.orange,border:`4px solid ${brand.colors.ink}`,rotate:'7deg',
          opacity:interpolate(frame,[1.0*fps,1.35*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          translate:interpolate(frame,[1.0*fps,1.35*fps],['0px -100px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
        }} />
        <div style={{position:'absolute',left:180,bottom:82,width:74,height:74,borderRadius:50,backgroundColor:brand.colors.ink}} />
        <div style={{position:'absolute',right:180,bottom:82,width:74,height:74,borderRadius:50,backgroundColor:brand.colors.ink}} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 1120,
          width: 350,
          padding: '22px 26px',
          borderRadius: 24,
          backgroundColor: brand.colors.orange,
          color: brand.colors.white,
          fontSize: 52,
          fontWeight: 920,
          textAlign: 'center',
          rotate: '-5deg',
          opacity: interpolate(frame, [1.55 * fps, 2.05 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          translate: interpolate(frame, [1.55 * fps, 2.05 * fps], ['-80px 20px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        +35K
      </div>

      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 1120,
          width: 350,
          padding: '22px 26px',
          borderRadius: 24,
          backgroundColor: '#E7F0E9',
          border: `3px solid ${brand.colors.green}`,
          color: brand.colors.green,
          fontSize: 48,
          fontWeight: 900,
          textAlign: 'center',
          rotate: '4deg',
          opacity: interpolate(frame, [2.05 * fps, 2.5 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        -10K ongkir
      </div>

      <div
        style={{
          position: 'absolute',
          left: 84,
          right: 84,
          top: 1390,
          textAlign: 'center',
          fontSize: 70,
          fontWeight: 950,
          letterSpacing: -2.5,
          opacity: interpolate(frame, [2.6 * fps, 3.15 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          scale: interpolate(frame, [2.6 * fps, 3.15 * fps], [0.85, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.spring({damping: 180}),
            output: 'perceptual-scale',
          }),
        }}
      >
        35K <span style={{color:brand.colors.muted}}>&gt;</span> 10K
      </div>
    </SceneBase>
  );
};
