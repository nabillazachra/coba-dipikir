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
      bottom: 300,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}
  >
    <div
      style={{
        maxWidth: 760,
        backgroundColor: 'rgba(32,37,31,0.93)',
        color: brand.colors.paper,
        borderRadius: 18,
        padding: '14px 20px 16px',
        fontFamily: brand.fontFamily,
        fontSize: 31,
        fontWeight: 700,
        lineHeight: 1.2,
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  </div>
);
