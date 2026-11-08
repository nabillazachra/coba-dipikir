import type React from 'react';
import {brand} from '../tokens';

type BracketFocusProps = {
  readonly children: React.ReactNode;
  readonly color?: string;
  readonly compact?: boolean;
};

export const BracketFocus: React.FC<BracketFocusProps> = ({
  children,
  color = brand.colors.orange,
  compact = false,
}) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: compact ? 10 : 16,
        color,
        fontWeight: 800,
        fontVariantNumeric: 'tabular-nums',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{fontWeight: 500}}>(</span>
      <span>{children}</span>
      <span style={{fontWeight: 500}}>)</span>
    </span>
  );
};
