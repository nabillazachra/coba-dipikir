import type React from 'react';
import {brand} from '../tokens';

type SubtitleProps = {
  readonly children: React.ReactNode;
};

export const Subtitle: React.FC<SubtitleProps> = ({children}) => (
  <div
    style={{
      position: 'absolute',
      left: brand.safe.left,
      right: brand.safe.right,
      bottom: 255,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}
  >
    <div
      style={{
        maxWidth: 820,
        backgroundColor: 'rgba(32,37,31,0.93)',
        color: brand.colors.paper,
        borderRadius: 20,
        padding: '15px 22px 17px',
        fontFamily: brand.fontFamily,
        fontSize: 30,
        fontWeight: 700,
        lineHeight: 1.2,
        textAlign: 'center',
        boxShadow: '0 10px 24px rgba(32,37,31,0.12)',
      }}
    >
      {children}
    </div>
  </div>
);
