import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../tokens';

export const EditorialDecor: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.26,
          backgroundImage:
            'linear-gradient(rgba(32,37,31,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(32,37,31,0.035) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 28,
          top: 735,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          rotate: '-90deg',
          transformOrigin: 'left center',
          color: 'rgba(32,37,31,0.28)',
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: 2.4,
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}
      >
        <span style={{width: 46, height: 2, backgroundColor: 'rgba(32,37,31,0.2)'}} />
        Coba Dipikir · 001
      </div>

      <div
        style={{
          position: 'absolute',
          right: 48,
          top: 82,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          opacity: interpolate(frame, [0, 0.8 * fps], [0.25, 0.55], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          pointerEvents: 'none',
        }}
      >
        <span style={{width: 7, height: 7, borderRadius: 20, backgroundColor: brand.colors.orange}} />
        <span style={{fontSize: 24, fontWeight: 800, color: brand.colors.ink}}>( )</span>
      </div>

      <div
        style={{
          position: 'absolute',
          right: -70,
          bottom: 310,
          width: 220,
          height: 220,
          border: '2px solid rgba(66,118,91,0.09)',
          borderRadius: 999,
          translate: interpolate(frame, [0, 6 * fps], ['0px 0px', '-12px -8px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          pointerEvents: 'none',
        }}
      />
    </>
  );
};
