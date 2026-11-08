import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {BracketFocus} from '../../../brand/components/BracketFocus';
import {Subtitle} from '../../../brand/components/Subtitle';
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
          right: 170,
          top: 205,
          fontSize: 68,
          fontWeight: 900,
          lineHeight: 1.02,
          letterSpacing: -2.4,
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Nambah belanja supaya
        <br />
        <span style={{color: brand.colors.orange}}>nggak bayar ongkir?</span>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 84,
          right: 170,
          top: 590,
          height: 560,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 52,
          translate: interpolate(frame, [0, 0.65 * fps], ['0px 70px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 0.65 * fps], [0.88, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: 'perceptual-scale',
          }),
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 500,
            height: 275,
            border: `8px solid ${brand.colors.ink}`,
            borderTop: 0,
            borderRadius: '0 0 38px 38px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 65,
              right: 65,
              top: 60,
              height: 105,
              backgroundColor: brand.colors.orange,
              borderRadius: 24,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 105,
              top: 20,
              width: 82,
              height: 82,
              borderRadius: 18,
              backgroundColor: '#FFFDF8',
              border: `4px solid ${brand.colors.ink}`,
              rotate: '-8deg',
              opacity: interpolate(frame, [0.45 * fps, 0.9 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
              translate: interpolate(frame, [0.45 * fps, 0.9 * fps], ['0px -50px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 108,
              top: 12,
              width: 96,
              height: 96,
              borderRadius: 20,
              backgroundColor: '#E7D9C6',
              border: `4px solid ${brand.colors.ink}`,
              rotate: '7deg',
              opacity: interpolate(frame, [0.7 * fps, 1.1 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
              translate: interpolate(frame, [0.7 * fps, 1.1 * fps], ['0px -60px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            }}
          />
          <div style={{position: 'absolute', left: 80, bottom: -36, width: 64, height: 64, borderRadius: 40, backgroundColor: brand.colors.ink}} />
          <div style={{position: 'absolute', right: 80, bottom: -36, width: 64, height: 64, borderRadius: 40, backgroundColor: brand.colors.ink}} />
        </div>

        <div style={{fontSize: 84, lineHeight: 1, fontWeight: 900}}>
          <BracketFocus>Rp35.000</BracketFocus>
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            padding: '14px 24px',
            position: 'relative',
          }}
        >
          ongkir Rp10.000
          <div
            style={{
              position: 'absolute',
              left: 8,
              right: 8,
              top: '54%',
              height: 6,
              backgroundColor: brand.colors.orange,
              rotate: '-3deg',
              scale: `${interpolate(frame, [3.0 * fps, 3.45 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} 1`,
              transformOrigin: 'left center',
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 520,
          border: `2px solid ${brand.colors.orange}`,
          borderRadius: 999,
          padding: '10px 16px',
          color: brand.colors.orange,
          fontSize: 23,
          fontWeight: 800,
          rotate: '6deg',
          opacity: interpolate(frame, [4.35 * fps, 4.85 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        hemat... katanya
      </div>

      <Subtitle>
        Nambah belanja 35 ribu cuma biar ongkir 10 ribu hilang.
        <br />Nah, pernah?
      </Subtitle>
    </SceneBase>
  );
};
