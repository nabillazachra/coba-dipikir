import React from 'react';
import {brand} from '../../brand/tokens';

type SceneHeaderProps = {
  readonly eyebrow: string;
  readonly children: React.ReactNode;
  readonly accent?: 'orange' | 'green';
};

export const SceneHeader: React.FC<SceneHeaderProps> = ({
  eyebrow,
  children,
  accent = 'orange',
}) => (
  <>
    <div
      style={{
        position: 'absolute',
        left: 88,
        right: 112,
        top: 150,
        fontSize: 26,
        fontWeight: 850,
        letterSpacing: 1.6,
        color: accent === 'green' ? brand.colors.green : brand.colors.orange,
      }}
    >
      {eyebrow}
    </div>

    <div
      style={{
        position: 'absolute',
        left: 88,
        right: 112,
        top: 205,
        fontSize: 82,
        fontWeight: 950,
        lineHeight: 0.98,
        letterSpacing: -3.2,
        color: brand.colors.ink,
      }}
    >
      {children}
    </div>
  </>
);
