import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {ReceiptCard} from '../../../brand/components/ReceiptCard';
import {SimulationNote} from '../../../brand/components/SimulationNote';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {SceneBase} from './SceneBase';

export const InitialCheckoutScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <div style={{position: 'absolute', left: 84, top: 170, fontSize: 34, fontWeight: 750, color: brand.colors.orange}}>
        BELANJA AWAL
      </div>
      <div style={{position: 'absolute', left: 84, right: 170, top: 235, fontSize: 78, fontWeight: 900, lineHeight: 1.02, letterSpacing: -2.5}}>
        Sebelum promonya
        <br />ikut campur.
      </div>
      <div
        style={{
          position: 'absolute',
          left: 84,
          top: 585,
          opacity: interpolate(frame, [0, 0.55 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          translate: interpolate(frame, [0, 0.55 * fps], ['0px 58px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <ReceiptCard
          title="Checkout langsung"
          lines={[
            {label: 'Barang', value: 'Rp70.000'},
            {label: 'Ongkir', value: 'Rp10.000'},
            {label: 'Total', value: 'Rp80.000', emphasis: 'accent'},
          ]}
          width={800}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 505,
          padding: '10px 16px',
          border: `2px solid ${brand.colors.green}`,
          borderRadius: 14,
          color: brand.colors.green,
          fontSize: 22,
          fontWeight: 800,
          rotate: '4deg',
          opacity: interpolate(frame, [4.05 * fps, 4.55 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        belum ada drama
      </div>

      <div
        style={{
          position: 'absolute',
          left: 150,
          right: 220,
          top: 1135,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 22,
          color: brand.colors.muted,
          fontSize: 34,
          fontWeight: 800,
          opacity: interpolate(frame, [3.2 * fps, 3.8 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        <span>70k</span><span>+</span><span>10k</span><span>=</span>
        <span style={{color: brand.colors.orange, fontSize: 42}}>80k</span>
      </div>

      <SimulationNote />
      <Subtitle>
        Awalnya simpel. Barang 70 ribu, ongkir 10 ribu.
        <br />Totalnya 80 ribu. Aman.
      </Subtitle>
    </SceneBase>
  );
};
