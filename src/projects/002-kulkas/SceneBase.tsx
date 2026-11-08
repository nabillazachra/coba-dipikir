import type React from 'react';
import {brand} from '../../brand/tokens';

type SceneBaseProps = {
  readonly children: React.ReactNode;
  readonly mode?: 'night' | 'paper';
};

export const SceneBase: React.FC<SceneBaseProps> = ({children, mode = 'night'}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      fontFamily: brand.fontFamily,
      color: mode === 'night' ? brand.colors.paper : brand.colors.ink,
      background:
        mode === 'night'
          ? 'linear-gradient(180deg, #111719 0%, #151D1D 58%, #0C1112 100%)'
          : brand.colors.paper,
    }}
  >
    {mode === 'night' ? (
      <>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 480,
            background:
              'radial-gradient(circle at 78% 25%, rgba(75,95,82,.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,.01), transparent)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 70,
            right: 70,
            bottom: 385,
            height: 225,
            borderRadius: '26px 26px 0 0',
            backgroundColor: '#18201F',
            border: '4px solid rgba(246,240,229,.055)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 42,
              top: 36,
              width: 210,
              height: 90,
              borderRadius: 18,
              backgroundColor: '#111717',
              border: '3px solid rgba(246,240,229,.045)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 310,
              right: 42,
              top: 40,
              height: 18,
              borderRadius: 999,
              backgroundColor: 'rgba(246,240,229,.055)',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 385,
            backgroundColor: '#090D0E',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 380,
            height: 5,
            backgroundColor: 'rgba(246,240,229,.07)',
          }}
        />
      </>
    ) : (
      <>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.15,
            backgroundImage:
              'linear-gradient(rgba(32,37,31,0.026) 1px, transparent 1px), linear-gradient(90deg, rgba(32,37,31,0.026) 1px, transparent 1px)',
            backgroundSize: '84px 84px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 88,
            right: 112,
            top: 112,
            height: 3,
            borderRadius: 999,
            backgroundColor: brand.colors.rule,
          }}
        />
      </>
    )}

    {children}
  </div>
);
