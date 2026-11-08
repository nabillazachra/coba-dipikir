import type React from 'react';
import {brand} from '../tokens';

type EpisodeClosingProps = {
  readonly question: React.ReactNode;
};

export const EpisodeClosing: React.FC<EpisodeClosingProps> = ({question}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: `160px ${brand.safe.right}px 330px ${brand.safe.left}px`,
      fontFamily: brand.fontFamily,
      color: brand.colors.ink,
      textAlign: 'center',
    }}
  >
    <div
      style={{
        fontSize: 105,
        lineHeight: 0.98,
        fontWeight: 900,
        letterSpacing: -4.2,
        maxWidth: 820,
      }}
    >
      {question}
    </div>
    <div
      style={{
        marginTop: 54,
        fontSize: 34,
        fontWeight: 720,
        color: brand.colors.orange,
        letterSpacing: 0.2,
      }}
    >
      coba dipikir.
    </div>
  </div>
);
