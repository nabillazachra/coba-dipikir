import React from 'react';
import {CanvasImage} from 'remotion';
import {publicAsset} from '../../brand/publicAsset';

type Props = {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly tilt?: number;
  readonly bob?: number;
  readonly flip?: boolean;
  readonly opacity?: number;
};

// An exact crop from the supplied Coba Dipikir character sheet.
// Explicit dimensions and top-level placement avoid percentage-height
// collapse in nested layouts.
export const OriginalCharacter: React.FC<Props> = ({
  left,
  top,
  width,
  tilt = 0,
  bob = 0,
  flip = false,
  opacity = 1,
}) => (
  <CanvasImage
    src={publicAsset('characters/ep2-front34.png')}
    style={{
      position: 'absolute',
      left,
      top,
      width,
      height: Math.round(width * (174 / 102)),
      objectFit: 'contain',
      transformOrigin: '50% 80%',
      rotate: `${tilt}deg`,
      translate: `0px ${bob}px`,
      scale: flip ? '-1 1' : '1 1',
      opacity,
      imageRendering: 'auto',
      pointerEvents: 'none',
      filter: 'drop-shadow(0 10px 0 rgba(32,37,31,.07))',
    }}
  />
);
