import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {BracketFocus} from '../../../brand/components/BracketFocus';
import {SimulationNote} from '../../../brand/components/SimulationNote';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {SceneBase} from './SceneBase';

export const PromoTemptationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <div style={{position: 'absolute', left: 84, right: 170, top: 205, fontSize: 76, lineHeight: 1.02, fontWeight: 900, letterSpacing: -2.5}}>
        Tinggal sedikit lagi.
      </div>
      <div
        style={{
          position: 'absolute',
          left: 84,
          right: 170,
          top: 470,
          backgroundColor: brand.colors.white,
          border: `3px solid ${brand.colors.ink}`,
          borderRadius: 34,
          padding: '42px 42px 46px',
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          scale: interpolate(frame, [0, 0.45 * fps], [0.94, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: 'perceptual-scale',
          }),
        }}
      >
        <div style={{fontSize: 34, fontWeight: 750, color: brand.colors.green, marginBottom: 20}}>PROMO GRATIS ONGKIR</div>
        <div style={{fontSize: 62, fontWeight: 900, lineHeight: 1.05, marginBottom: 48}}>
          Tambah <BracketFocus compact>Rp30.000</BracketFocus>
          <br />untuk gratis ongkir.
        </div>
        <div style={{height: 34, borderRadius: 40, overflow: 'hidden', backgroundColor: '#E5DED3', border: `2px solid ${brand.colors.ink}`}}>
          <div
            style={{
              height: '100%',
              width: `${interpolate(frame, [0.35 * fps, 1.15 * fps], [0, 70], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}%`,
              backgroundColor: brand.colors.green,
            }}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 18, fontSize: 30, fontWeight: 700, fontVariantNumeric: 'tabular-nums'}}>
          <span>Rp70.000</span>
          <span>minimum Rp100.000</span>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 110,
          top: 405,
          padding: '10px 17px',
          borderRadius: 999,
          backgroundColor: brand.colors.orange,
          color: brand.colors.white,
          fontSize: 22,
          fontWeight: 850,
          rotate: '-4deg',
          opacity: interpolate(frame, [0.75 * fps, 1.2 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        nah, mulai nih...
      </div>

      <div
        style={{
          position: 'absolute',
          left: 84,
          top: 1110,
          fontSize: 42,
          lineHeight: 1.18,
          fontWeight: 780,
          color: brand.colors.muted,
        }}
      >
        Mata kita pindah dari
        <br />“total berapa?” ke “kurang berapa?”.
      </div>
      <div
        style={{
          position: 'absolute',
          left: 615,
          top: 935,
          padding: '8px 14px',
          border: `2px solid ${brand.colors.green}`,
          borderRadius: 12,
          color: brand.colors.green,
          fontSize: 22,
          fontWeight: 850,
          opacity: interpolate(frame, [1.2 * fps, 1.7 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        tinggal 30k
      </div>

      <SimulationNote />
      <Subtitle>
        Terus muncul kalimat sakti: kurang 30 ribu lagi.
        <br />Biar gratis ongkir.
      </Subtitle>
    </SceneBase>
  );
};
