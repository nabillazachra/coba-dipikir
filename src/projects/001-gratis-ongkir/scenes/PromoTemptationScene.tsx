import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Subtitle} from '../../../brand/components/Subtitle';
import {brand} from '../../../brand/tokens';
import {CommercePhone} from '../CommercePhone';
import {SceneHeader} from '../SceneHeader';
import {voiceText} from '../voiceover.config';
import {SceneBase} from './SceneBase';

export const PromoTemptationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase>
      <SceneHeader eyebrow="PROMO MASUK" accent="green">
        Kurang <span style={{color: brand.colors.orange}}>30K</span>
        <br />lagi.
      </SceneHeader>

      <div
        style={{
          position: 'absolute',
          left: 230,
          top: 470,
          opacity: interpolate(frame, [0, 0.35 * fps], [0, 0.52], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: 0.88,
          transformOrigin: 'top center',
        }}
      >
        <CommercePhone dimmed />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 140,
          right: 140,
          top: 610,
          padding: '34px 38px 38px',
          borderRadius: 36,
          border: `5px solid ${brand.colors.ink}`,
          backgroundColor: brand.colors.white,
          boxShadow: '0 22px 0 rgba(32,37,31,0.13)',
          opacity: interpolate(frame, [0.45 * fps, 0.95 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [0.45 * fps, 0.95 * fps], ['0px -80px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <div style={{fontSize: 22, fontWeight: 850, color: brand.colors.green}}>VOUCHER OTOMATIS</div>
            <div style={{fontSize: 54, fontWeight: 950, letterSpacing: -2, marginTop: 5}}>GRATIS ONGKIR</div>
          </div>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              backgroundColor: '#E7F0E9',
              border: `3px solid ${brand.colors.green}`,
              display: 'grid',
              placeItems: 'center',
              fontSize: 31,
              fontWeight: 950,
              color: brand.colors.green,
            }}
          >
            %
          </div>
        </div>

        <div style={{height: 3, margin: '28px 0', backgroundColor: brand.colors.rule}} />

        <div style={{display: 'flex', alignItems: 'end', justifyContent: 'space-between'}}>
          <div>
            <div style={{fontSize: 24, fontWeight: 780, color: brand.colors.muted}}>Minimum belanja</div>
            <div style={{fontSize: 66, fontWeight: 950, letterSpacing: -2.5, marginTop: 5}}>Rp100.000</div>
          </div>
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 16,
              backgroundColor: '#FFF0EA',
              color: brand.colors.orange,
              fontSize: 22,
              fontWeight: 900,
            }}
          >
            kurang 30K
          </div>
        </div>

        <div style={{marginTop: 28}}>
          <div
            style={{
              height: 34,
              borderRadius: 999,
              border: `3px solid ${brand.colors.ink}`,
              backgroundColor: '#E8E0D5',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${interpolate(frame, [1.0 * fps, 2.4 * fps], [0, 70], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}%`,
                backgroundColor: brand.colors.green,
              }}
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 11, fontSize: 22, fontWeight: 820}}>
            <span>70K</span>
            <span>100K</span>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 210,
          right: 210,
          top: 1265,
          padding: '18px 22px',
          borderRadius: 22,
          border: `3px dashed ${brand.colors.orange}`,
          backgroundColor: '#FFF7F1',
          textAlign: 'center',
          fontSize: 30,
          fontWeight: 900,
          color: brand.colors.orange,
          opacity: interpolate(frame, [2.7 * fps, 3.25 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        “cuma kurang 30K... tanggung.”
      </div>

      <Subtitle>{voiceText('03-promo')}</Subtitle>
    </SceneBase>
  );
};
