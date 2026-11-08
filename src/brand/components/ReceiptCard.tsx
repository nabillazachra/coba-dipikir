import type React from 'react';
import {brand} from '../tokens';

type ReceiptLine = {
  readonly label: string;
  readonly value: string;
  readonly emphasis?: 'normal' | 'accent' | 'success';
};

type ReceiptCardProps = {
  readonly title: string;
  readonly lines: readonly ReceiptLine[];
  readonly width?: number;
  readonly compact?: boolean;
};

export const ReceiptCard: React.FC<ReceiptCardProps> = ({
  title,
  lines,
  width = 780,
  compact = false,
}) => {
  return (
    <div
      style={{
        width,
        backgroundColor: brand.colors.white,
        border: `3px solid ${brand.colors.ink}`,
        borderRadius: 30,
        padding: compact ? '28px 28px 30px' : '38px 42px 42px',
        boxShadow: '0 12px 0 rgba(32,37,31,0.08)',
        fontFamily: brand.fontFamily,
        color: brand.colors.ink,
      }}
    >
      <div
        style={{
          fontSize: compact ? 28 : 34,
          fontWeight: 850,
          letterSpacing: 1.4,
          textTransform: 'uppercase',
          marginBottom: compact ? 22 : 30,
        }}
      >
        {title}
      </div>
      <div style={{height: 2, backgroundColor: brand.colors.rule, marginBottom: 8}} />
      {lines.map((line, index) => (
        <div
          key={`${line.label}-${index}`}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 18,
            padding: compact ? '13px 0' : '17px 0',
            borderBottom:
              index === lines.length - 2 ? `2px dashed ${brand.colors.rule}` : undefined,
            fontSize: compact ? 29 : 38,
            fontWeight: index === lines.length - 1 ? 850 : 600,
          }}
        >
          <span>{line.label}</span>
          <span
            style={{
              fontVariantNumeric: 'tabular-nums',
              color:
                line.emphasis === 'accent'
                  ? brand.colors.orange
                  : line.emphasis === 'success'
                    ? brand.colors.green
                    : brand.colors.ink,
            }}
          >
            {line.value}
          </span>
        </div>
      ))}
    </div>
  );
};
