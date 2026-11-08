import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {SceneHeader} from '../SceneHeader';
import {voiceText} from '../voiceover.config';
import {SceneBase} from './SceneBase';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <div
        style={{
          opacity: interpolate(frame, [0, 0.35 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [0, 0.35 * fps], ['0px 42px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <SceneHeader eyebrow="BELANJA ONLINE">
          GRATIS ONGKIR
          <br />
          <span style={{color: brand.colors.orange}}>enak, kan?</span>
        </SceneHeader>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 500,
          width: 820,
          height: 470,
          borderRadius: 38,
          border: `5px solid ${brand.colors.ink}`,
          backgroundColor: '#FFFDF8',
          overflow: 'hidden',
          opacity: interpolate(frame, [0.2 * fps, 0.65 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0.2 * fps, 0.65 * fps], [0.92, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.spring({damping: 180}),
            output: 'perceptual-scale',
          }),
        }}
      >
        <div
          style={{
            height: 68,
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: brand.colors.ink,
            color: brand.colors.paper,
            fontSize: 22,
            fontWeight: 850,
          }}
        >
          <span>KERANJANG</span>
          <span>1 barang</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 28,
            padding: '58px 52px 42px',
          }}
        >
          <div>
            <div style={{fontSize: 25, fontWeight: 800, color: brand.colors.muted}}>Subtotal</div>
            <div style={{fontSize: 66, fontWeight: 950, marginTop: 4}}>Rp70.000</div>
          </div>

          <div
            style={{
              padding: '15px 20px',
              borderRadius: 999,
              border: `3px solid ${brand.colors.green}`,
              backgroundColor: '#E7F0E9',
              color: brand.colors.green,
              fontSize: 23,
              fontWeight: 900,
              opacity: interpolate(frame, [0.65 * fps, 1.05 * fps], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            PROMO TERSEDIA
          </div>
        </div>

        <div style={{height: 3, margin: '0 52px', backgroundColor: brand.colors.rule}} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '34px 52px',
            fontSize: 31,
            fontWeight: 860,
          }}
        >
          <span>Ongkir</span>
          <span style={{color: brand.colors.orange}}>Rp10.000</span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 130,
          right: 130,
          top: 1040,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}
      >
        <div
          style={{
            padding: '24px 28px',
            borderRadius: 24,
            border: `4px solid ${brand.colors.orange}`,
            backgroundColor: '#FFF0EA',
            textAlign: 'center',
            opacity: interpolate(frame, [1.45 * fps, 1.95 * fps], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div style={{fontSize: 20, fontWeight: 850, color: brand.colors.orange}}>TAMBAH BELANJA</div>
          <div style={{fontSize: 50, fontWeight: 950, marginTop: 5}}>+35K</div>
        </div>

        <div
          style={{
            padding: '24px 28px',
            borderRadius: 24,
            border: `4px solid ${brand.colors.green}`,
            backgroundColor: '#E7F0E9',
            textAlign: 'center',
            opacity: interpolate(frame, [2.1 * fps, 2.6 * fps], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div style={{fontSize: 20, fontWeight: 850, color: brand.colors.green}}>ONGKIR HEMAT</div>
          <div style={{fontSize: 50, fontWeight: 950, marginTop: 5}}>-10K</div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 130,
          right: 130,
          top: 1285,
          padding: '24px 28px',
          borderTop: `3px solid ${brand.colors.ink}`,
          borderBottom: `3px solid ${brand.colors.ink}`,
          textAlign: 'center',
          fontSize: 64,
          fontWeight: 950,
          letterSpacing: -2.5,
          opacity: interpolate(frame, [2.85 * fps, 3.4 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <span style={{color: brand.colors.orange}}>35K</span>
        <span style={{color: brand.colors.muted}}> demi </span>
        <span style={{color: brand.colors.green}}>10K?</span>
      </div>

      <Subtitle>{voiceText('01-hook')}</Subtitle>
    </SceneBase>
  );
};
