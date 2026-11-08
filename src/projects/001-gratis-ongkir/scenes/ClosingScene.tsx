import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {SceneHeader} from '../SceneHeader';
import {voiceText} from '../voiceover.config';
import {SceneBase} from './SceneBase';

const MoneyStack = ({
  left,
  amount,
  label,
  accent,
  stackHeight,
  frame,
  fps,
  delay,
}: {
  left: number;
  amount: string;
  label: string;
  accent: string;
  stackHeight: number;
  frame: number;
  fps: number;
  delay: number;
}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top: 555,
      width: 250,
      height: 430,
      opacity: interpolate(frame, [delay * fps, (delay + 0.45) * fps], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
    }}
  >
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: 20, fontWeight: 850, color: brand.colors.muted}}>{label}</div>
      <div style={{fontSize: 68, fontWeight: 950, color: accent, marginTop: 6}}>{amount}</div>
    </div>

    <div style={{position: 'absolute', left: 30, right: 30, bottom: 0, height: stackHeight}}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: i * (stackHeight / 6),
            height: 62,
            borderRadius: 13,
            border: `3px solid ${brand.colors.ink}`,
            backgroundColor: i % 2 === 0 ? accent : '#FFFDF8',
            rotate: i % 2 === 0 ? '-1.5deg' : '1.5deg',
          }}
        />
      ))}
    </div>
  </div>
);

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <SceneHeader eyebrow="COBA DITIMBANG">
        Yang dihemat
        <br />vs yang ditambah.
      </SceneHeader>

      <MoneyStack
        left={165}
        amount="10K"
        label="ONGKIR HEMAT"
        accent={brand.colors.green}
        stackHeight={155}
        frame={frame}
        fps={fps}
        delay={0.3}
      />
      <MoneyStack
        left={665}
        amount="35K"
        label="BELANJA TAMBAHAN"
        accent={brand.colors.orange}
        stackHeight={305}
        frame={frame}
        fps={fps}
        delay={0.65}
      />

      <div
        style={{
          position: 'absolute',
          left: 240,
          top: 1040,
          width: 600,
          height: 9,
          borderRadius: 999,
          backgroundColor: brand.colors.ink,
          rotate: interpolate(frame, [0.85 * fps, 2.4 * fps], ['0deg', '7deg'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 490,
          top: 1037,
          width: 100,
          height: 130,
          backgroundColor: brand.colors.ink,
          clipPath: 'polygon(50% 0,100% 100%,0 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 130,
          right: 130,
          top: 1195,
          paddingTop: 30,
          borderTop: `3px solid ${brand.colors.rule}`,
          textAlign: 'center',
          opacity: interpolate(frame, [2.15 * fps, 2.75 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [2.15 * fps, 2.75 * fps], ['0px 40px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div style={{fontSize: 25, fontWeight: 820, color: brand.colors.muted}}>Pertanyaannya bukan cuma “gratis?”</div>
        <div style={{fontSize: 66, fontWeight: 950, letterSpacing: -2.6, marginTop: 12}}>
          Tanpa promo,
          <br />tetap dibeli?
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 1480,
          textAlign: 'center',
          fontSize: 30,
          fontWeight: 900,
          color: brand.colors.orange,
          opacity: interpolate(frame, [4.5 * fps, 5.15 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        ( coba dipikir. )
      </div>

      <Subtitle>{voiceText('06-penutup')}</Subtitle>
    </SceneBase>
  );
};
