import React from 'react';
import {brand} from '../../brand/tokens';

type EpisodeSubtitleProps = {
  readonly text: string;
  readonly highlight?: string;
  readonly dark?: boolean;
};

// Reels-native captions: high contrast, not corporate cards.
export const EpisodeSubtitle: React.FC<EpisodeSubtitleProps> = ({
  text,
  highlight,
  dark = true,
}) => {
  const index = highlight ? text.toLowerCase().indexOf(highlight.toLowerCase()) : -1;
  const foreground = dark ? '#FFFDF8' : '#20251F';
  return (
    <div style={{
      position: 'absolute',
      left: 100,
      right: 135,
      bottom: 256,
      minHeight: 116,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      zIndex: 40,
      pointerEvents: 'none',
    }}>
      <div style={{
        maxWidth: 820,
        padding: '14px 22px',
        fontSize: 45,
        fontWeight: 970,
        lineHeight: 1.1,
        letterSpacing: -.8,
        color: foreground,
        WebkitTextStroke: dark ? '2px rgba(20,24,24,.86)' : '0px',
        textShadow: dark
          ? '0 5px 12px rgba(0,0,0,.9), 0 2px 2px #141818'
          : '0 3px 2px rgba(246,240,229,.85)',
      }}>
        {index >= 0 && highlight ? (
          <>
            {text.slice(0,index)}
            <span style={{color: brand.colors.orange, fontWeight: 1000}}>
              {text.slice(index,index+highlight.length)}
            </span>
            {text.slice(index+highlight.length)}
          </>
        ) : text}
      </div>
    </div>
  );
};
