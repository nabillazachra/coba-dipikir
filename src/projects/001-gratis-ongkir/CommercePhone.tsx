import React from 'react';
import {brand} from '../../brand/tokens';

type CommercePhoneProps = {
  readonly itemPrice?: string;
  readonly extraPrice?: string | null;
  readonly shippingPrice?: string;
  readonly totalPrice?: string;
  readonly promoLabel?: string | null;
  readonly dimmed?: boolean;
};

const Row: React.FC<{label: string; value: string; accent?: 'green' | 'orange'}> = ({
  label,
  value,
  accent,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: 25,
      fontWeight: 780,
      padding: '12px 0',
      color:
        accent === 'green'
          ? brand.colors.green
          : accent === 'orange'
            ? brand.colors.orange
            : brand.colors.ink,
    }}
  >
    <span style={{color: accent ? undefined : brand.colors.muted}}>{label}</span>
    <span>{value}</span>
  </div>
);

export const CommercePhone: React.FC<CommercePhoneProps> = ({
  itemPrice = 'Rp70.000',
  extraPrice = null,
  shippingPrice = 'Rp10.000',
  totalPrice = 'Rp80.000',
  promoLabel = null,
  dimmed = false,
}) => (
  <div
    style={{
      width: 650,
      height: 960,
      borderRadius: 62,
      border: `7px solid ${brand.colors.ink}`,
      backgroundColor: '#FFFCF7',
      boxShadow: '0 26px 0 rgba(32,37,31,0.08)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: 18,
        translate: '-50% 0px',
        width: 160,
        height: 34,
        borderRadius: 999,
        backgroundColor: brand.colors.ink,
      }}
    />

    <div style={{padding: '78px 38px 34px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <div style={{fontSize: 21, fontWeight: 800, color: brand.colors.muted}}>KERANJANG</div>
          <div style={{fontSize: 41, fontWeight: 930, marginTop: 4}}>Belanja kita</div>
        </div>
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: 20,
            border: `3px solid ${brand.colors.ink}`,
            display: 'grid',
            placeItems: 'center',
            fontSize: 30,
            fontWeight: 900,
          }}
        >
          1
        </div>
      </div>

      <div
        style={{
          marginTop: 32,
          display: 'grid',
          gridTemplateColumns: '132px 1fr',
          gap: 24,
          alignItems: 'center',
          padding: 22,
          borderRadius: 28,
          backgroundColor: '#F1E7D9',
        }}
      >
        <div
          style={{
            height: 130,
            borderRadius: 22,
            backgroundColor: '#E0CDB8',
            border: `3px solid ${brand.colors.ink}`,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 32,
              top: 34,
              width: 64,
              height: 62,
              border: `4px solid ${brand.colors.ink}`,
              borderRadius: '18px 18px 24px 24px',
            }}
          />
        </div>
        <div>
          <div style={{fontSize: 22, fontWeight: 800, color: brand.colors.muted}}>Barang utama</div>
          <div style={{fontSize: 41, fontWeight: 930, marginTop: 6}}>{itemPrice}</div>
          <div style={{fontSize: 20, color: brand.colors.muted, marginTop: 6}}>Qty 1 · siap dikirim</div>
        </div>
      </div>

      {extraPrice ? (
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 22px',
            borderRadius: 22,
            border: `3px solid ${brand.colors.orange}`,
            backgroundColor: '#FFF1EA',
          }}
        >
          <span style={{fontSize: 22, fontWeight: 820, color: brand.colors.orange}}>+ Barang tambahan</span>
          <span style={{fontSize: 28, fontWeight: 920}}>{extraPrice}</span>
        </div>
      ) : null}

      <div
        style={{
          marginTop: 28,
          padding: '18px 22px',
          borderRadius: 24,
          border: `2px solid ${brand.colors.rule}`,
          backgroundColor: brand.colors.white,
        }}
      >
        <Row label="Subtotal" value={extraPrice ? 'Rp105.000' : itemPrice} />
        <Row
          label="Ongkir"
          value={shippingPrice}
          accent={shippingPrice === 'Rp0' ? 'green' : undefined}
        />
        {promoLabel ? <Row label="Promo" value={promoLabel} accent="green" /> : null}
      </div>
    </div>

    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '26px 38px 34px',
        borderTop: `3px solid ${brand.colors.ink}`,
        backgroundColor: brand.colors.ink,
        color: brand.colors.paper,
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
        <span style={{fontSize: 24, fontWeight: 760, color: '#C9C6BD'}}>TOTAL</span>
        <span style={{fontSize: 55, fontWeight: 950, letterSpacing: -2}}>{totalPrice}</span>
      </div>
    </div>

    {dimmed ? (
      <div style={{position: 'absolute', inset: 0, backgroundColor: 'rgba(32,37,31,0.3)'}} />
    ) : null}
  </div>
);
