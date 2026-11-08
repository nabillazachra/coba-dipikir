import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {CommercePhone} from '../CommercePhone';
import {SceneHeader} from '../SceneHeader';
import {voiceText} from '../voiceover.config';
import {SceneBase} from './SceneBase';

const ProductCard = ({
  x,
  label,
  price,
  delay,
  selected,
  frame,
  fps,
}: {
  x: number;
  label: string;
  price: string;
  delay: number;
  selected?: boolean;
  frame: number;
  fps: number;
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: 20,
      width: 260,
      height: 400,
      padding: 20,
      borderRadius: 30,
      border: `${selected ? 5 : 3}px solid ${selected ? brand.colors.orange : brand.colors.ink}`,
      backgroundColor: selected ? '#FFF0E8' : '#FFFDF8',
      boxShadow: selected ? '0 18px 0 rgba(233,107,60,0.14)' : '0 10px 0 rgba(32,37,31,0.06)',
      opacity: interpolate(frame, [delay * fps, (delay + 0.35) * fps], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
      translate: interpolate(frame, [delay * fps, (delay + 0.35) * fps], ['0px 60px', '0px 0px'], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      }),
      scale: selected
        ? interpolate(frame, [1.9 * fps, 2.55 * fps], [1, 1.05], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.spring({damping: 165}),
            output: 'perceptual-scale',
          })
        : 1,
    }}
  >
    <div
      style={{
        height: 225,
        borderRadius: 24,
        backgroundColor: selected ? '#F2C9B7' : '#E8D8C3',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          translate: '-50% -50%',
          width: 100,
          height: 125,
          border: `5px solid ${brand.colors.ink}`,
          borderRadius: '26px 26px 36px 36px',
        }}
      />
    </div>
    <div style={{fontSize: 20, fontWeight: 820, color: brand.colors.muted, marginTop: 17}}>{label}</div>
    <div style={{fontSize: 46, fontWeight: 950, marginTop: 4}}>{price}</div>
    {selected ? (
      <div style={{fontSize: 18, fontWeight: 900, color: brand.colors.orange, marginTop: 7}}>pas buat promo</div>
    ) : null}
  </div>
);

export const DecisionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const browseOut = interpolate(frame, [3.15 * fps, 3.55 * fps], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const checkoutIn = interpolate(frame, [3.35 * fps, 3.85 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneBase>
      <SceneHeader eyebrow="MULAI CARI-CARI">
        “Sekalian lihat
        <br />yang lain deh...”
      </SceneHeader>

      <div style={{position: 'absolute', left: 88, right: 112, top: 495, height: 485, overflow: 'hidden', opacity: browseOut}}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            translate: interpolate(frame, [0, 2.55 * fps], ['35px 0px', '-10px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <ProductCard x={0} label="yang lucu" price="15K" delay={0.2} frame={frame} fps={fps} />
          <ProductCard x={300} label="yang lumayan" price="20K" delay={0.5} frame={frame} fps={fps} />
          <ProductCard x={600} label="nah, ini dia" price="35K" delay={0.8} selected frame={frame} fps={fps} />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 210,
          right: 210,
          top: 1030,
          padding: '20px 24px',
          borderRadius: 24,
          backgroundColor: brand.colors.ink,
          color: brand.colors.paper,
          textAlign: 'center',
          fontSize: 34,
          fontWeight: 920,
          opacity: interpolate(frame, [2.55 * fps, 3.05 * fps, 3.2 * fps, 3.55 * fps], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        + Tambah ke Keranjang
      </div>

      <div
        style={{
          position: 'absolute',
          left: 230,
          top: 500,
          opacity: checkoutIn,
          scale: 0.72,
          transformOrigin: 'top center',
          translate: interpolate(frame, [3.35 * fps, 3.85 * fps], ['0px 80px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <CommercePhone
          extraPrice="Rp35.000"
          shippingPrice="Rp0"
          totalPrice="Rp105.000"
          promoLabel="Gratis ongkir"
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 190,
          right: 190,
          top: 1240,
          padding: '18px 22px',
          borderRadius: 22,
          border: `3px solid ${brand.colors.green}`,
          backgroundColor: '#E7F0E9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: brand.colors.green,
          opacity: interpolate(frame, [4.0 * fps, 4.45 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <span style={{fontSize: 22, fontWeight: 850}}>Cart sekarang 2 barang</span>
        <span style={{fontSize: 38, fontWeight: 950}}>105K ✓</span>
      </div>

      <Subtitle>{voiceText('04-keputusan')}</Subtitle>
    </SceneBase>
  );
};
