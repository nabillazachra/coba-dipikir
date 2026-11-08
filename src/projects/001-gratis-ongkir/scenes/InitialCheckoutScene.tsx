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
      <SimulationNote />
      <Subtitle>
        Awalnya, barang 70 ribu. Ongkir 10 ribu.
        <br />Total, 80 ribu.
      </Subtitle>
    </SceneBase>
  );
};
