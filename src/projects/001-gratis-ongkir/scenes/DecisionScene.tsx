import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {SimulationNote} from '../../../brand/components/SimulationNote';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {SceneBase} from './SceneBase';

export const DecisionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const itemIn = interpolate(frame, [0, 0.55 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const successIn = interpolate(frame, [2.45 * fps, 3.15 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const detailIn = interpolate(frame, [3.3 * fps, 4.05 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneBase>
      <div
        style={{
          position: 'absolute',
          left: 84,
          right: 170,
          top: 180,
          fontSize: 74,
          lineHeight: 1.02,
          fontWeight: 900,
          letterSpacing: -2.5,
        }}
      >
        Ketemu barang
        <br />Rp35.000.
      </div>

      <div
        style={{
          position: 'absolute',
          left: 84,
          right: 170,
          top: 500,
          height: 360,
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: 34,
          alignItems: 'center',
          border: `3px solid ${brand.colors.ink}`,
          borderRadius: 34,
          backgroundColor: brand.colors.white,
          padding: 34,
          opacity: itemIn,
          translate: `0px ${Math.round((1 - itemIn) * 36)}px`,
        }}
      >
        <div
          style={{
            height: 292,
            borderRadius: 26,
            backgroundColor: '#E7D9C6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 132,
              height: 168,
              border: `6px solid ${brand.colors.ink}`,
              borderRadius: '30px 30px 44px 44px',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 72,
                height: 34,
                border: `6px solid ${brand.colors.ink}`,
                borderBottom: 0,
                borderRadius: '44px 44px 0 0',
                left: 24,
                top: -31,
              }}
            />
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 27,
              fontWeight: 760,
              color: brand.colors.muted,
              marginBottom: 12,
            }}
          >
            BARANG TAMBAHAN
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 920,
              letterSpacing: -2.2,
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            Rp35.000
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 30,
              fontWeight: 700,
              color: brand.colors.orange,
            }}
          >
            Masuk keranjang
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 84,
          right: 170,
          top: 960,
          opacity: interpolate(frame, [1.15 * fps, 1.9 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <div
          style={{
            height: 32,
            borderRadius: 40,
            overflow: 'hidden',
            backgroundColor: '#E5DED3',
            border: `2px solid ${brand.colors.ink}`,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${interpolate(frame, [1.2 * fps, 2.45 * fps], [70, 100], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}%`,
              backgroundColor: brand.colors.green,
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 16,
            fontSize: 28,
            fontWeight: 720,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          <span>Rp105.000 belanja</span>
          <span style={{color: brand.colors.green}}>minimum terpenuhi ✓</span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 84,
          right: 170,
          top: 1165,
          textAlign: 'center',
          opacity: successIn,
          scale: interpolate(frame, [2.45 * fps, 3.15 * fps], [0.94, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: 'perceptual-scale',
          }),
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 18,
            padding: '20px 34px',
            borderRadius: 26,
            backgroundColor: '#E7F0E9',
            border: `3px solid ${brand.colors.green}`,
          }}
        >
          <span
            style={{
              fontSize: 79,
              fontWeight: 950,
              letterSpacing: -2.8,
              color: brand.colors.green,
            }}
          >
            GRATIS
          </span>
          <span style={{fontSize: 41, fontWeight: 820}}>ongkir Rp0</span>
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 33,
            fontWeight: 760,
            color: brand.colors.orange,
            opacity: detailIn,
            translate: `0px ${Math.round((1 - detailIn) * 14)}px`,
          }}
        >
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
