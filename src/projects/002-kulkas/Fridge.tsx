import React from 'react';
import {brand} from '../../brand/tokens';

type FridgeProps = {
  readonly left?: number;
  readonly top?: number;
  readonly width?: number;
  readonly open?: number;
  readonly opacity?: number;
};

export const Fridge: React.FC<FridgeProps> = ({
  left = 500,
  top = 360,
  width = 430,
  open = 0,
  opacity = 1,
}) => {
  const height = width * 1.62;
  const doorAngle = -78 * open;

  return (
    <div style={{position: 'absolute', left, top, width, height, opacity, perspective: 1100, pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 34,
          border: `7px solid ${brand.colors.ink}`,
          backgroundColor: '#D8DDD5',
          boxShadow: '0 28px 0 rgba(0,0,0,0.16)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 26,
            right: 26,
            top: 32,
            bottom: 32,
            borderRadius: 24,
            background:
              'linear-gradient(180deg, rgba(255,245,206,.98) 0%, rgba(245,238,204,.96) 48%, rgba(230,233,216,.96) 100%)',
            opacity: Math.min(1, open * 1.7),
            boxShadow: `inset 0 0 ${34 + open * 48}px rgba(255,234,165,${0.22 + open * 0.33})`,
          }}
        >
          <div style={{position: 'absolute', left: 26, right: 26, top: 165, height: 5, borderRadius: 5, backgroundColor: '#AAB3AA'}} />
          <div style={{position: 'absolute', left: 26, right: 26, top: 355, height: 5, borderRadius: 5, backgroundColor: '#AAB3AA'}} />
          <div style={{position: 'absolute', left: 26, right: 26, top: 535, height: 5, borderRadius: 5, backgroundColor: '#AAB3AA'}} />

          <div style={{position: 'absolute', left: 54, top: 55, width: 54, height: 94, borderRadius: '18px 18px 15px 15px', border: `4px solid ${brand.colors.ink}`, backgroundColor: '#B9D4DF'}} />
          <div style={{position: 'absolute', right: 52, top: 83, width: 68, height: 46, borderRadius: 14, border: `4px solid ${brand.colors.ink}`, backgroundColor: '#C96036'}} />

          <div style={{position: 'absolute', left: 62, top: 220, display: 'flex', gap: 12}}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{width: 36, height: 46, borderRadius: '50% 50% 42% 42%', border: `4px solid ${brand.colors.ink}`, backgroundColor: '#F0E2B5', rotate: i % 2 === 0 ? '-6deg' : '5deg'}} />
            ))}
          </div>

          <div style={{position: 'absolute', right: 50, top: 205, width: 48, height: 120, borderRadius: '18px 18px 10px 10px', border: `4px solid ${brand.colors.ink}`, backgroundColor: '#E96B3C'}}>
            <div style={{position: 'absolute', left: 12, right: 12, top: 12, height: 22, borderRadius: 6, backgroundColor: '#F6F0E5'}} />
          </div>

          <div style={{position: 'absolute', left: 65, top: 405, width: 108, height: 70, borderRadius: '50% 50% 16px 16px', border: `4px solid ${brand.colors.ink}`, backgroundColor: '#E7B74C', overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 18, backgroundColor: '#F6F0E5'}} />
          </div>

          <div style={{position: 'absolute', right: 52, top: 390, width: 150, height: 105, borderRadius: 18, border: `4px solid ${brand.colors.ink}`, backgroundColor: '#C5B49C'}}>
            <div style={{height: 28, borderBottom: `4px solid ${brand.colors.ink}`, backgroundColor: '#8E7F6D', borderRadius: '14px 14px 0 0'}} />
            <div style={{textAlign: 'center', fontSize: 18, fontWeight: 900, color: brand.colors.ink, marginTop: 20}}>???</div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: '0% 50%',
          transform: `perspective(1100px) rotateY(${doorAngle}deg)`,
          borderRadius: 34,
          border: `7px solid ${brand.colors.ink}`,
          backgroundColor: '#ECEDE7',
          boxShadow: open > 0.03 ? '18px 20px 30px rgba(0,0,0,.2)' : '0 0 0 rgba(0,0,0,0)',
          backfaceVisibility: 'hidden',
        }}
      >
        <div style={{position: 'absolute', left: 0, right: 0, top: '58%', height: 6, backgroundColor: '#B8BDB7'}} />
        <div style={{position: 'absolute', right: 26, top: 120, width: 18, height: 200, borderRadius: 999, backgroundColor: brand.colors.ink}} />
        <div style={{position: 'absolute', right: 26, bottom: 130, width: 18, height: 160, borderRadius: 999, backgroundColor: brand.colors.ink}} />
      </div>
    </div>
  );
};
