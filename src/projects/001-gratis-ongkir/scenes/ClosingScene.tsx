import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {EpisodeClosing} from '../../../brand/components/EpisodeClosing';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {SceneBase} from './SceneBase';

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <div
        style={{
          position: 'absolute',
          left: 155,
          top: 250,
          width: 255,
          height: 340,
          border: `3px solid ${brand.colors.rule}`,
          borderRadius: 26,
          rotate: '-8deg',
          opacity: interpolate(frame, [0, 0.8 * fps, 3.4 * fps, 4.2 * fps], [0, 0.38, 0.38, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 180,
          top: 265,
          width: 255,
          height: 340,
          border: `3px solid ${brand.colors.rule}`,
          borderRadius: 26,
          rotate: '9deg',
          opacity: interpolate(frame, [0.2 * fps, 1 * fps, 3.4 * fps, 4.2 * fps], [0, 0.28, 0.28, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 345,
          top: 310,
          width: 300,
          height: 300,
          border: `5px solid ${brand.colors.ink}`,
          borderRadius: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: interpolate(frame, [0, 0.7 * fps, 3.5 * fps, 4.4 * fps], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          scale: interpolate(frame, [0, 0.7 * fps], [0.9, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: 'perceptual-scale',
          }),
        }}
      >
        <div style={{width: 112, height: 140, border: `6px solid ${brand.colors.ink}`, borderRadius: '26px 26px 38px 38px', position: 'relative'}}>
          <div style={{position: 'absolute', width: 62, height: 28, border: `6px solid ${brand.colors.ink}`, borderBottom: 0, borderRadius: '40px 40px 0 0', left: 19, top: -27}} />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 84,
          right: 170,
          top: 680,
          fontSize: 72,
          fontWeight: 900,
          lineHeight: 1.04,
          textAlign: 'center',
          opacity: interpolate(frame, [0.6 * fps, 1.4 * fps, 3.5 * fps, 4.4 * fps], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        Memang perlu?
      </div>
      <div
        style={{
          opacity: interpolate(frame, [4.2 * fps, 5.1 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          translate: interpolate(frame, [4.2 * fps, 5.1 * fps], ['0px 35px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <EpisodeClosing
          question={
            <>
              Tanpa promo,
              <br />tetap dibeli?
            </>
          }
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 84,
          right: 170,
          top: 1060,
          textAlign: 'center',
          color: brand.colors.muted,
          fontSize: 27,
          fontWeight: 760,
          opacity: interpolate(frame, [1.3 * fps, 2 * fps, 3.4 * fps, 4.2 * fps], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        promo mengubah keputusan... atau cuma kelihatan begitu?
      </div>

      <Subtitle>
        Kalau barangnya memang perlu, ya masuk akal.
        <br />Tapi coba jujur... tanpa promo, tetap dibeli?
      </Subtitle>
    </SceneBase>
  );
};
