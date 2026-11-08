import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {SimulationNote} from '../../../brand/components/SimulationNote';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {SceneBase} from './SceneBase';

export const DecisionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = interpolate(frame, [3.5 * fps, 4.3 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <SceneBase>
      <div style={{position: 'absolute', left: 84, right: 170, top: 190, fontSize: 76, lineHeight: 1.02, fontWeight: 900, letterSpacing: -2.5}}>
        Ketemu barang
        <br />Rp35.000.
      </div>
      <div
        style={{
          position: 'absolute',
          left: 170,
          top: 520,
          width: 560,
          height: 470,
          border: `4px solid ${brand.colors.ink}`,
          borderRadius: 38,
          backgroundColor: brand.colors.white,
          padding: 34,
          translate: interpolate(frame, [0, 0.6 * fps, 1.8 * fps], ['0px 80px', '0px 0px', '170px 250px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: [Easing.spring({damping: 190}), Easing.bezier(0.16, 1, 0.3, 1)],
          }),
          scale: interpolate(frame, [0, 0.6 * fps, 1.8 * fps], [0.92, 1, 0.64], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            output: 'perceptual-scale',
          }),
        }}
      >
        <div style={{height: 255, borderRadius: 28, backgroundColor: '#E7D9C6', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{width: 160, height: 190, border: `6px solid ${brand.colors.ink}`, borderRadius: '34px 34px 52px 52px', position: 'relative'}}>
            <div style={{position: 'absolute', width: 86, height: 42, border: `6px solid ${brand.colors.ink}`, borderBottom: 0, borderRadius: '50px 50px 0 0', left: 31, top: -35}} />
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 30, fontSize: 38, fontWeight: 850}}>
          <span>Barang tambahan</span>
          <span style={{fontVariantNumeric: 'tabular-nums'}}>Rp35.000</span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 84,
          right: 170,
          top: 1030,
          opacity: interpolate(frame, [1.5 * fps, 2.3 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        <div
          style={{
            height: 34,
            borderRadius: 40,
            overflow: 'hidden',
            backgroundColor: '#E5DED3',
            border: `2px solid ${brand.colors.ink}`,
          }}
        >
          <div style={{height: '100%', width: `${interpolate(frame, [1.4 * fps, 2.8 * fps], [70, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}%`, backgroundColor: brand.colors.green}} />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 18, fontSize: 31, fontWeight: 750}}>
          <span>Rp105.000 belanja</span>
          <span>✓ minimum terpenuhi</span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 84,
          right: 170,
          top: 1220,
          textAlign: 'center',
          opacity: interpolate(frame, [2.4 * fps, 3.15 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        <div style={{fontSize: 102, fontWeight: 950, letterSpacing: -3.2, color: brand.colors.green}}>GRATIS</div>
        <div style={{fontSize: 50, fontWeight: 800, marginTop: 10}}>ongkir Rp0</div>
        <div style={{fontSize: 37, fontWeight: 750, color: brand.colors.orange, marginTop: 22, opacity: reveal, translate: `0px ${20 - reveal * 20}px`}}>
          (setelah tambah belanja)
        </div>
      </div>
      <SimulationNote />
      <Subtitle>
        Ketemu barang 35 ribu. Tambah.
        <br />Gratis ongkir!
      </Subtitle>
    </SceneBase>
  );
};
