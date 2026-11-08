import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {SceneHeader} from '../SceneHeader';
import {voiceText} from '../voiceover.config';
import {SceneBase} from './SceneBase';

const Confetti = ({
  left,
  top,
  rotate,
  delay,
  frame,
  fps,
  color,
}: {
  left: number;
  top: number;
  rotate: string;
  delay: number;
  frame: number;
  fps: number;
  color: string;
}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width: 16,
      height: 52,
      borderRadius: 7,
      backgroundColor: color,
      rotate,
      opacity: interpolate(frame, [delay * fps, (delay + 0.25) * fps, 1.55 * fps], [0, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
      translate: interpolate(frame, [delay * fps, 1.55 * fps], ['0px -60px', '0px 100px'], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
    }}
  />
);

const CompareCard = ({
  left,
  label,
  total,
  detail,
  accent,
  frame,
  fps,
  delay,
}: {
  left: number;
  label: string;
  total: string;
  detail: string;
  accent: 'ink' | 'orange';
  frame: number;
  fps: number;
  delay: number;
}) => {
  const borderColor = accent === 'orange' ? brand.colors.orange : brand.colors.ink;
  const bg = accent === 'orange' ? '#FFF0EA' : '#FFFDF8';

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top: 560,
        width: 410,
        height: 360,
        padding: '32px 28px',
        borderRadius: 32,
        border: `4px solid ${borderColor}`,
        backgroundColor: bg,
        textAlign: 'center',
        opacity: interpolate(frame, [delay * fps, (delay + 0.45) * fps], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        translate: interpolate(frame, [delay * fps, (delay + 0.45) * fps], ['0px 55px', '0px 0px'], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <div
        style={{
          fontSize: 21,
          fontWeight: 850,
          color: accent === 'orange' ? brand.colors.orange : brand.colors.muted,
        }}
      >
        {label}
      </div>
      <div style={{fontSize: 96, fontWeight: 950, letterSpacing: -4, marginTop: 28}}>{total}</div>
      <div style={{height: 3, margin: '27px 24px 23px', backgroundColor: brand.colors.rule}} />
      <div style={{fontSize: 22, fontWeight: 780, color: brand.colors.muted}}>{detail}</div>
    </div>
  );
};

export const RevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const winOut = interpolate(frame, [1.55 * fps, 2.0 * fps], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const compareIn = interpolate(frame, [1.85 * fps, 2.35 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneBase>
      <div style={{position: 'absolute', inset: 0, opacity: winOut}}>
        <div
          style={{
            position: 'absolute',
            left: 170,
            right: 170,
            top: 430,
            padding: '54px 42px',
            borderRadius: 42,
            border: `5px solid ${brand.colors.green}`,
            backgroundColor: '#E7F0E9',
            textAlign: 'center',
            scale: interpolate(frame, [0, 0.55 * fps], [0.76, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.spring({damping: 150}),
              output: 'perceptual-scale',
            }),
          }}
        >
          <div style={{fontSize: 27, fontWeight: 850, color: brand.colors.green, letterSpacing: 1.5}}>PROMO BERHASIL</div>
          <div style={{fontSize: 112, fontWeight: 950, letterSpacing: -4.5, color: brand.colors.green, marginTop: 18}}>
            ONGKIR
          </div>
          <div style={{fontSize: 164, fontWeight: 950, letterSpacing: -6, lineHeight: 0.9, marginTop: 5}}>Rp0</div>
        </div>

        <Confetti left={145} top={360} rotate="-18deg" delay={0.1} frame={frame} fps={fps} color={brand.colors.orange} />
        <Confetti left={275} top={300} rotate="12deg" delay={0.2} frame={frame} fps={fps} color={brand.colors.green} />
        <Confetti left={825} top={320} rotate="22deg" delay={0.25} frame={frame} fps={fps} color={brand.colors.orange} />
        <Confetti left={920} top={420} rotate="-10deg" delay={0.15} frame={frame} fps={fps} color={brand.colors.green} />
      </div>

      <div style={{opacity: compareIn}}>
        <SceneHeader eyebrow="EITS. TOTALNYA?">
          Bandingin
          <br />dua jalur ini.
        </SceneHeader>

        <CompareCard
          left={88}
          label="CHECKOUT LANGSUNG"
          total="80K"
          detail="70K barang + 10K ongkir"
          accent="ink"
          frame={frame}
          fps={fps}
          delay={2.05}
        />
        <CompareCard
          left={558}
          label="KEJAR PROMO"
          total="105K"
          detail="70K + 35K + ongkir 0"
          accent="orange"
          frame={frame}
          fps={fps}
          delay={2.35}
        />

        <div
          style={{
            position: 'absolute',
            left: 160,
            right: 160,
            top: 1010,
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 18,
            alignItems: 'center',
            opacity: interpolate(frame, [3.55 * fps, 4.0 * fps], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div
            style={{
              padding: '18px 20px',
              borderRadius: 20,
              backgroundColor: '#E7F0E9',
              border: `3px solid ${brand.colors.green}`,
              color: brand.colors.green,
              textAlign: 'center',
            }}
          >
            <div style={{fontSize: 19, fontWeight: 850}}>ONGKIR HEMAT</div>
            <div style={{fontSize: 48, fontWeight: 950, marginTop: 3}}>-10K</div>
          </div>
          <div style={{fontSize: 42, fontWeight: 950}}>+</div>
          <div
            style={{
              padding: '18px 20px',
              borderRadius: 20,
              backgroundColor: '#FFF0EA',
              border: `3px solid ${brand.colors.orange}`,
              color: brand.colors.orange,
              textAlign: 'center',
            }}
          >
            <div style={{fontSize: 19, fontWeight: 850}}>BELANJA TAMBAHAN</div>
            <div style={{fontSize: 48, fontWeight: 950, marginTop: 3}}>+35K</div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 240,
            right: 240,
            top: 1245,
            padding: '24px 26px',
            borderRadius: 26,
            backgroundColor: brand.colors.ink,
            color: brand.colors.paper,
            textAlign: 'center',
            opacity: interpolate(frame, [4.95 * fps, 5.45 * fps], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            scale: interpolate(frame, [4.95 * fps, 5.45 * fps], [0.82, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.spring({damping: 155}),
              output: 'perceptual-scale',
            }),
          }}
        >
          <div style={{fontSize: 20, fontWeight: 820, color: '#C8C4BB'}}>SELISIH KELUAR</div>
          <div style={{fontSize: 92, fontWeight: 950, color: brand.colors.orange, lineHeight: 0.95, marginTop: 7}}>+25K</div>
        </div>
      </div>

      {frame < 2.25 * fps ? (
        <Subtitle>{voiceText('05-menang')}</Subtitle>
      ) : frame < 5.05 * fps ? (
        <Subtitle>{voiceText('05-total')}</Subtitle>
      ) : (
        <Subtitle>{voiceText('05-punch')}</Subtitle>
      )}
    </SceneBase>
  );
};
