import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {CommercePhone} from '../CommercePhone';
import {SceneHeader} from '../SceneHeader';
import {voiceText} from '../voiceover.config';
import {SceneBase} from './SceneBase';

export const InitialCheckoutScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <SceneHeader eyebrow="CHECKOUT NORMAL">
        Sebelum promo
        <br />ikut campur.
      </SceneHeader>

      <div
        style={{
          position: 'absolute',
          left: 230,
          top: 465,
          opacity: interpolate(frame, [0, 0.45 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [0, 0.55 * fps], ['0px 70px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 0.55 * fps], [0.94, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.spring({damping: 180}),
            output: 'perceptual-scale',
          }),
        }}
      >
        <CommercePhone />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 210,
          right: 210,
          top: 1400,
          padding: '16px 24px',
          borderRadius: 18,
          backgroundColor: brand.colors.ink,
          color: brand.colors.paper,
          textAlign: 'center',
          fontSize: 25,
          fontWeight: 850,
          opacity: interpolate(frame, [3.15 * fps, 3.65 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        70K + 10K = <span style={{color: brand.colors.orange}}>80K</span>
      </div>

      <Subtitle>{voiceText('02-awal')}</Subtitle>
    </SceneBase>
  );
};
