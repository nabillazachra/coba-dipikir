import type React from 'react';
import {brand} from '../tokens';

export const SimulationNote: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      left: brand.safe.left,
      bottom: 242,
      fontFamily: brand.fontFamily,
      color: brand.colors.muted,
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: 0.2,
    }}
  >
    Simulasi • Ketentuan promo dapat berbeda.
  </div>
);
