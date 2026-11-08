import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {BracketFocus} from '../../../brand/components/BracketFocus';
import {ReceiptCard} from '../../../brand/components/ReceiptCard';
import {SimulationNote} from '../../../brand/components/SimulationNote';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {SceneBase} from './SceneBase';

export const RevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <div style={{position: 'absolute', left: 84, top: 165, fontSize: 34, fontWeight: 780, color: brand.colors.orange}}>
        COBA LIHAT TOTALNYA
      </div>
      <div style={{position: 'absolute', left: 84, right: 170, top: 230, fontSize: 78, fontWeight: 920, lineHeight: 1.02, letterSpacing: -2.9}}>
        Hemat ongkir.
        <br />Totalnya naik.
      </div>
      <div
        style={{
          position: 'absolute',
          left: 70,
          top: 535,
          display: 'flex',
          gap: 24,
          opacity: interpolate(frame, [0.5 * fps, 1.3 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          translate: interpolate(frame, [0.5 * fps, 1.3 * fps], ['0px 50px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <ReceiptCard
          compact
          width={416}
          title="Checkout langsung"
          lines={[
            {label: 'Barang', value: 'Rp70.000'},
            {label: 'Tambahan', value: '—'},
            {label: 'Ongkir', value: 'Rp10.000'},
            {label: 'Total', value: 'Rp80.000'},
          ]}
        />
        <ReceiptCard
          compact
          width={416}
          title="Kejar gratis ongkir"
          lines={[
            {label: 'Barang awal', value: 'Rp70.000'},
            {label: 'Tambahan', value: 'Rp35.000'},
            {label: 'Ongkir', value: 'Rp0', emphasis: 'success'},
            {label: 'Total', value: 'Rp105.000', emphasis: 'accent'},
          ]}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 84,
          right: 170,
          top: 1265,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 74,
          fontWeight: 930,
          opacity: interpolate(frame, [3.2 * fps, 4.0 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          scale: interpolate(frame, [3.2 * fps, 4.0 * fps], [0.88, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: 'perceptual-scale',
          }),
        }}
      >
        <BracketFocus>+Rp25.000</BracketFocus>
      </div>
      <div style={{position: 'absolute', left: 84, right: 170, top: 1382, textAlign: 'center', fontSize: 27, fontWeight: 670, color: brand.colors.muted}}>
        tambahan pengeluaran dibanding checkout langsung
      </div>
      <SimulationNote />
      <Subtitle>
        Tapi totalnya sekarang 105 ribu.
        <br />Kita keluar 25 ribu lebih banyak.
      </Subtitle>
    </SceneBase>
  );
};
