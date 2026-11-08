import React from 'react';
import {brand} from '../../brand/tokens';

type EpisodeSubtitleProps = {
  readonly text: string;
  readonly highlight?: string;
  readonly dark?: boolean;
};

export const EpisodeSubtitle: React.FC<EpisodeSubtitleProps> = ({text, highlight, dark = true}) => {
  const index = highlight ? text.toLowerCase().indexOf(highlight.toLowerCase()) : -1;

  return (
    <div style={{position: 'absolute', left: 88, right: 112, bottom: 250, minHeight: 92, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'}}>
      <div
        style={{
          maxWidth: 835,
          padding: '15px 22px 17px',
          borderRadius: 20,
          backgroundColor: dark ? 'rgba(246,240,229,.94)' : 'rgba(32,37,31,.94)',
          color: dark ? brand.colors.ink : brand.colors.paper,
          boxShadow: dark ? '0 14px 34px rgba(0,0,0,.23)' : '0 10px 24px rgba(32,37,31,.12)',
          fontSize: 31,
          fontWeight: 760,
          lineHeight: 1.18,
          textAlign: 'center',
        }}
      >
        {index >= 0 && highlight ? (
          <>
            {text.slice(0, index)}
            <span style={{color: brand.colors.orange, fontWeight: 900}}>{text.slice(index, index + highlight.length)}</span>
            {text.slice(index + highlight.length)}
          </>
        ) : (
          text
        )}
      </div>
    </div>
  );
};
