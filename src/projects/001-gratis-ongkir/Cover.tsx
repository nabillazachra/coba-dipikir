import React from 'react';
import {BracketFocus} from '../../brand/components/BracketFocus';
import {brand} from '../../brand/tokens';

export const GratisOngkirCover: React.FC = () => (
  <div style={{position: 'absolute', inset: 0, backgroundColor: brand.colors.paper, color: brand.colors.ink, fontFamily: brand.fontFamily, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 84, right: 170, top: 180, fontSize: 34, fontWeight: 800, color: brand.colors.orange}}>COBA DIPIKIR • #001</div>
    <div style={{position: 'absolute', left: 84, right: 170, top: 290, fontSize: 108, fontWeight: 950, lineHeight: 0.94, letterSpacing: -5}}>
      Niat hemat.
      <br />Kok nambah?
    </div>
    <div style={{position: 'absolute', left: 150, top: 770, width: 650, height: 420, border: `9px solid ${brand.colors.ink}`, borderTop: 0, borderRadius: '0 0 50px 50px'}}>
      <div style={{position: 'absolute', left: 70, right: 70, top: 95, height: 130, backgroundColor: brand.colors.orange, borderRadius: 28}} />
      <div style={{position: 'absolute', left: 90, bottom: -44, width: 82, height: 82, borderRadius: 50, backgroundColor: brand.colors.ink}} />
      <div style={{position: 'absolute', right: 90, bottom: -44, width: 82, height: 82, borderRadius: 50, backgroundColor: brand.colors.ink}} />
    </div>
    <div style={{position: 'absolute', left: 84, right: 170, top: 1330, fontSize: 76, fontWeight: 920, textAlign: 'center'}}>
      <BracketFocus>Rp35.000</BracketFocus>
    </div>
    <div style={{position: 'absolute', left: 84, bottom: 170, fontSize: 31, fontWeight: 700, color: brand.colors.muted}}>Yang biasa, belum tentu sederhana.</div>
  </div>
);
