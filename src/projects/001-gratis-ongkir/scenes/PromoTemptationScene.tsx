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
      <SimulationNote />
      <Subtitle>Lalu muncul: tambah 30 ribu lagi buat gratis ongkir.</Subtitle>
    </SceneBase>
  );
};
