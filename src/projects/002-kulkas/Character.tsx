import React from 'react';
import {brand} from '../../brand/tokens';

export type CharacterExpression =
  | 'neutral'
  | 'sleepy'
  | 'curious'
  | 'thinking'
  | 'realization'
  | 'surprised'
  | 'doubtful'
  | 'worried'
  | 'happy'
  | 'excited'
  | 'deadpan';

type CharacterProps = {
  readonly expression?: CharacterExpression;
  readonly width?: number;
  readonly left?: number;
  readonly top?: number;
  readonly flip?: boolean;
  readonly headTilt?: number;
  readonly lean?: number;
  readonly bob?: number;
  readonly step?: number;
  readonly leftArm?: number;
  readonly rightArm?: number;
  readonly scarfSwing?: number;
  readonly blink?: number;
  readonly opacity?: number;
  readonly light?: number;
  readonly gazeX?: number;
};

const pointFrom = (x: number, y: number, length: number, angleDeg: number) => {
  const rad = (angleDeg * Math.PI) / 180;
  return {x: x + Math.sin(rad) * length, y: y + Math.cos(rad) * length};
};

export const Character: React.FC<CharacterProps> = ({
  expression = 'neutral',
  width = 300,
  left = 0,
  top = 0,
  flip = false,
  headTilt = 0,
  lean = 0,
  bob = 0,
  step = 0,
  leftArm = 12,
  rightArm = -12,
  scarfSwing = 0,
  blink = 0,
  opacity = 1,
  light = 0,
  gazeX = 0,
}) => {
  const leftHand = pointFrom(100, 235, 78, leftArm);
  const rightHand = pointFrom(200, 235, 78, rightArm);
  const stride = Math.sin(step * Math.PI * 2) * 18;

  const eyeHeight = expression === 'sleepy' ? 3 : Math.max(3, 16 * (1 - blink));
  const eyeY = expression === 'surprised' || expression === 'realization' ? 124 : 128;
  const browLift = expression === 'curious' || expression === 'surprised' || expression === 'realization' ? -9 : 0;

  const mouth =
    expression === 'happy' || expression === 'excited'
      ? 'M132 168 Q150 192 168 168'
      : expression === 'worried'
        ? 'M133 179 Q150 164 167 179'
        : expression === 'surprised' || expression === 'realization'
          ? 'M150 168 m-8 0 a8 13 0 1 0 16 0 a8 13 0 1 0 -16 0'
          : expression === 'doubtful'
            ? 'M136 176 Q150 170 165 175'
            : expression === 'thinking'
              ? 'M137 173 Q151 166 164 172'
              : expression === 'deadpan'
                ? 'M139 174 L162 174'
                : 'M141 173 Q150 177 160 173';

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height: (width * 420) / 300,
        opacity,
        // Camera staging controls the actual size; never scale in two places.
        transformOrigin: '50% 100%',
        scale: flip ? '-1 1' : '1 1',
        translate: `0px ${bob}px`,
        filter: light > 0 ? `drop-shadow(0 0 ${16 + light * 32}px rgba(255,238,188,${0.2 + light * 0.35}))` : undefined,
        pointerEvents: 'none',
      }}
    >
      <svg viewBox="0 0 300 420" width="100%" height="100%" overflow="visible">
        <g transform={`rotate(${lean} 150 260)`}>
          <ellipse cx="150" cy="393" rx="58" ry="11" fill="rgba(246,240,229,0.14)" />

          <path
            d="M121 260 C126 245 137 237 150 237 C163 237 174 245 179 260 L181 326 C178 342 168 351 150 351 C132 351 122 342 119 326 Z"
            fill={brand.colors.paper}
            stroke={brand.colors.ink}
            strokeWidth="10"
            strokeLinejoin="round"
          />

          <path d={`M128 348 L${126 + stride} 388`} stroke={brand.colors.ink} strokeWidth="11" strokeLinecap="round" />
          <path d={`M172 348 L${174 - stride} 388`} stroke={brand.colors.ink} strokeWidth="11" strokeLinecap="round" />

          <path d={`M100 235 L${leftHand.x} ${leftHand.y}`} stroke={brand.colors.ink} strokeWidth="11" strokeLinecap="round" />
          <circle cx={leftHand.x} cy={leftHand.y} r="13" fill={brand.colors.paper} stroke={brand.colors.ink} strokeWidth="8" />
          <path d={`M200 235 L${rightHand.x} ${rightHand.y}`} stroke={brand.colors.ink} strokeWidth="11" strokeLinecap="round" />
          <circle cx={rightHand.x} cy={rightHand.y} r="13" fill={brand.colors.paper} stroke={brand.colors.ink} strokeWidth="8" />

          <g transform={`rotate(${headTilt} 150 130)`}>
            <circle cx="150" cy="132" r="92" fill={brand.colors.paper} stroke={brand.colors.ink} strokeWidth="11" />

            <path
              d="M83 221 C104 206 128 201 151 202 C175 202 198 208 218 221 L207 247 C184 236 169 232 151 232 C131 232 113 237 94 248 Z"
              fill={brand.colors.orange}
              stroke={brand.colors.ink}
              strokeWidth="9"
              strokeLinejoin="round"
            />
            <path
              d="M198 232 C225 240 237 255 245 276 L220 286 C211 266 204 253 187 245 Z"
              fill={brand.colors.orange}
              stroke={brand.colors.ink}
              strokeWidth="8"
              strokeLinejoin="round"
              transform={`rotate(${scarfSwing} 199 232)`}
            />
            <path
              d="M105 232 C89 246 81 261 73 282 L96 290 C104 269 112 254 124 246 Z"
              fill={brand.colors.orange}
              stroke={brand.colors.ink}
              strokeWidth="8"
              strokeLinejoin="round"
              transform={`rotate(${-scarfSwing * 0.55} 105 232)`}
            />

            <rect x={113 + gazeX} y={eyeY - browLift} width="11" height={eyeHeight} rx="6" fill={brand.colors.ink} />
            <rect x={176 + gazeX} y={eyeY + browLift * 0.2} width="11" height={eyeHeight} rx="6" fill={brand.colors.ink} />

            {expression === 'curious' || expression === 'thinking' || expression === 'doubtful' || expression === 'worried' ? (
              <>
                <path d="M104 104 Q117 96 129 103" fill="none" stroke={brand.colors.ink} strokeWidth="7" strokeLinecap="round" />
                <path
                  d={expression === 'doubtful' ? 'M170 104 Q185 111 197 103' : 'M170 101 Q184 94 197 100'}
                  fill="none"
                  stroke={brand.colors.ink}
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </>
            ) : null}

            {expression === 'sleepy' ? (
              <>
                <path d="M106 124 Q118 130 130 124" fill="none" stroke={brand.colors.ink} strokeWidth="6" strokeLinecap="round" />
                <path d="M171 124 Q183 130 195 124" fill="none" stroke={brand.colors.ink} strokeWidth="6" strokeLinecap="round" />
              </>
            ) : null}

            <path d={mouth} fill="none" stroke={brand.colors.ink} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

            {expression === 'worried' ? <path d="M82 146 Q70 162 80 176" fill="#A9CFDC" stroke={brand.colors.ink} strokeWidth="5" /> : null}
            {expression === 'realization' || expression === 'surprised' || expression === 'excited' ? (
              <g stroke={brand.colors.orange} strokeWidth="8" strokeLinecap="round">
                <path d="M218 74 L238 59" />
                <path d="M225 95 L251 91" />
                <path d="M204 60 L211 36" />
              </g>
            ) : null}
          </g>
        </g>

        {light > 0 ? <ellipse cx="170" cy="170" rx="135" ry="165" fill={`rgba(255,239,190,${0.08 + light * 0.18})`} /> : null}
      </svg>
    </div>
  );
};
