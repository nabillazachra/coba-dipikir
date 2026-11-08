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
          ? 'radial-gradient(circle at 68% 42%, rgba(60,79,71,.24), transparent 30%), linear-gradient(180deg, #111719 0%, #171E1E 68%, #0F1415 100%)'
          : brand.colors.paper,
    }}
  >
    {mode === 'night' ? (
      <>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 380, backgroundColor: '#0B1011'}} />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 375, height: 4, backgroundColor: 'rgba(246,240,229,.08)'}} />
        <div style={{position: 'absolute', left: 70, bottom: 385, width: 280, height: 155, borderRadius: '22px 22px 0 0', backgroundColor: '#151D1C', border: '4px solid rgba(246,240,229,.06)'}} />
      </>
    ) : (
      <>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.26,
            backgroundImage:
              'linear-gradient(rgba(32,37,31,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(32,37,31,0.035) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div style={{position: 'absolute', right: 55, top: 72, fontSize: 25, fontWeight: 900, color: brand.colors.orange}}>( )</div>
      </>
    )}
    {children}
  </div>
);
