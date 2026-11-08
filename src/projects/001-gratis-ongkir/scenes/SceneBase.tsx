import type React from 'react';
import {brand} from '../../../brand/tokens';

type SceneBaseProps = {
  readonly children : React.ReactNode;
};

export const SceneBase: React.FC<SceneBaseProps> = ({children}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      backgroundColor: brand.colors.paper,
      color: brand.colors.ink,
      fontFamily: brand.fontFamily,
    }}
  >
    {children}
  </div>
);
