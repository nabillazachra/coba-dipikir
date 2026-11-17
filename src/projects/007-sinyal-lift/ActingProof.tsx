import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {brand} from '../../brand/tokens';
import {Character, type CharacterExpression} from '../002-kulkas/Character';

// E007 GATE B ONLY: 7.5-second acting proof. Not the full film.
// Reuse the signed-off E002 master character; no copy or redesign.
// There is deliberately no VO, caption, reveal, vote or ending card here.
export type LiftActingProofProps = {readonly showSafeOverlay?: boolean};

const smooth = (a: number, b: number, t: number) => {
  const k = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return k * k * (3 - 2 * k);
};
const mix = (a: number, b: number, k: number) => a + (b - a) * k;
const clamp = (v: number, low = 0, high = 1) => Math.max(low, Math.min(high, v));

/** Original, quiet procedural action cues: no stock/licensed recordings. */
let cuesCache: string | undefined;
const actingCues = () => {
  if (cuesCache) return cuesCache;
  const rate = 16000;
  const count = rate * 8;
  const buffer = new ArrayBuffer(44 + count * 2);
  const view = new DataView(buffer);
  const word = (i: number, value: string) => {
    for (let c = 0; c < value.length; c++) view.setUint8(i + c, value.charCodeAt(c));
  };
  word(0, 'RIFF');
  view.setUint32(4, 36 + count * 2, true);
  word(8, 'WAVE');
  word(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, rate, true);
  view.setUint32(28, rate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  word(36, 'data');
  view.setUint32(40, count * 2, true);

  // Smooth envelope avoids abrupt clicks; deterministic noise creates door slide.
  const tone = (t: number, at: number, hz: number, duration: number, strength: number) => {
    const age = t - at;
    if (age < 0 || age > duration) return 0;
    const attack = Math.min(1, age * 70);
    return strength * attack * Math.pow(1 - age / duration, 2)
      * Math.sin(2 * Math.PI * hz * age);
  };
  for (let i = 0; i < count; i++) {
    const t = i / rate;
    const hum = t > 1 ? 0.011 * Math.sin(2 * Math.PI * 70 * t) : 0;
    const ding = tone(t, 0.69, 710, 0.45, 0.12) + tone(t, 0.69, 1065, 0.36, 0.05);
    const beep = tone(t, 1.59, 890, 0.16, 0.10);
    const doorEnvelope = smooth(2.10, 2.31, t) * (1 - smooth(2.87, 3.11, t));
    const noise = (Math.sin(i * 1.93) * Math.sin(i * 0.117) * 0.025) * doorEnvelope;
    const pop = tone(t, 4.97, 880, 0.17, 0.077) + tone(t, 4.97, 1260, 0.12, 0.045);
    const fail = tone(t, 6.23, 270, 0.23, 0.058);
    const sample = clamp(hum + ding + beep + noise + pop + fail, -1, 1);
    view.setInt16(44 + i * 2, Math.round(sample * 32767), true);
  }
  const bytes = new Uint8Array(buffer);
  const parts: string[] = [];
  for (let i = 0; i < bytes.length; i += 4096) {
    parts.push(String.fromCharCode(...bytes.subarray(i, i + 4096)));
  }
  cuesCache = 'data:audio/wav;base64,' + btoa(parts.join(''));
  return cuesCache;
};

const SignalBars: React.FC<{bars: number; x: number; y: number; scale?: number}> = ({
  bars, x, y, scale = 1,
}) => (
  <g transform={'translate(' + x + ' ' + y + ') scale(' + scale + ')'}>
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={i * 13} y={32 - i * 8} width="10" height={16 + i * 8}
        rx="3" fill={i < bars ? '#B1E1AC' : '#61716A'}
        opacity={i < bars ? 1 : 0.42} />
    ))}
    {bars === 0 ? (
      <g stroke="#F2AA89" strokeWidth="6" strokeLinecap="round">
        <path d="M10 6 L42 38 M42 6 L10 38" />
      </g>
    ) : null}
  </g>
);

const Panel: React.FC<{pressed: number}> = ({pressed}) => (
  <g>
    <rect x="641" y="748" width="116" height="544" rx="16" fill="#454C47"
      stroke="#26332F" strokeWidth="10" />
    <rect x="661" y="785" width="76" height="107" rx="9" fill="#172421"
      stroke="#647269" strokeWidth="5" />
    <text x="699" y="861" fontFamily={brand.fontFamily} fontSize="62"
      fontWeight="850" textAnchor="middle" fill="#F5D5A0">G</text>
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="665" y={926 + i * 83 + (i === 2 ? pressed * 6 : 0)}
          width="68" height="61" rx="13"
          fill={i === 2 && pressed > 0.1 ? '#E96B3C' : '#BBC0AE'}
          stroke="#26332F" strokeWidth="7"/>
        <text x="699" y={967 + i * 83 + (i === 2 ? pressed * 6 : 0)}
          fontSize="31" fontFamily={brand.fontFamily} textAnchor="middle"
          fontWeight="850" fill="#20251F">{[3, 8, 12, 15][i]}</text>
      </g>
    ))}
    {/* The selected button becomes orange only AFTER finger contact. */}
    <circle cx="746" cy="1134" r={9 + pressed * 8}
      fill={brand.colors.orange} opacity={pressed * 0.42} />
  </g>
);

export const LiftActingProof: React.FC<LiftActingProofProps> = ({
  showSafeOverlay = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const walk = smooth(0.02, 1.32, t);
  const pressReach = smooth(0.98, 1.55, t) * (1 - smooth(1.86, 2.24, t));
  const pressed = smooth(1.55, 1.64, t) * (1 - smooth(1.78, 1.91, t));
  const closed = smooth(2.10, 3.07, t);
  const suspicious = smooth(3.06, 3.55, t);
  const lifting = smooth(3.65, 4.82, t);
  const freeze = smooth(4.91, 5.11, t);
  const signalLost = smooth(6.17, 6.30, t);
  const deadpan = smooth(6.42, 6.72, t);

  // The actor is staged large (525px master width) and tracks IN to the cabin.
  const heroX = mix(-235, 356, walk);
  const heroY = 702 - 10 * walk;
  const heroWidth = 525;
  const leftArmAngle = mix(-16, 83, pressReach);
  const rightArmAngle = mix(140, 179, lifting);
  const walkEnergy = 1 - smooth(1.19, 1.49, t);
  const step = t * 2.5 * walkEnergy;
  const bob = 5 * Math.sin(t * 18) * walkEnergy - 7 * suspicious + 7 * deadpan;
  const handRecoil = (1 - smooth(6.23, 6.51, t)) * signalLost;
  const headTilt = -3 + 6 * suspicious - 9 * lifting + 3 * deadpan;
  const lean = 3 * Math.sin(t * 12) * walkEnergy - 3 * lifting + 8 * deadpan
    - 5 * handRecoil;
  // Scarf continues after the torso stops, and settles completely in the freeze.
  const scarfSwing = 8 * Math.sin(t * 16 - 0.6) * walkEnergy
    + 8 * Math.sin((t - 3.65) * 10) * Math.exp(-Math.max(0, t - 3.65) * 2)
      * lifting * (1 - freeze)
    - 5 * Math.sin(Math.max(0, t - 6.18) * 13)
      * Math.exp(-Math.max(0, t - 6.18) * 6) * signalLost;
  const expression: CharacterExpression =
    deadpan > 0.8 ? 'deadpan'
      : signalLost > 0.1 ? 'annoyed'
        : freeze > 0.35 ? 'curious'
          : lifting > 0.55 ? 'surprised'
            : suspicious > 0.38 ? 'worried'
              : 'happy';
  // A microscopic anticipatory blink; absolutely NO blink during signal freeze.
  const blink = Math.max(0, 1 - Math.abs(t - 3.22) / 0.105);
  const cameraPush = smooth(4.7, 6.96, t);
  const cameraTrack = -42 * walk - 13 * cameraPush;
  const cameraZoom = 1 + 0.064 * cameraPush;

  // Calculate true hand endpoint from Character.tsx pointFrom(200,235,78,angle).
  const handX = heroX + heroWidth / 300
    * (200 + Math.sin(rightArmAngle * Math.PI / 180) * 78);
  const handY = heroY + heroWidth / 300
    * (235 + Math.cos(rightArmAngle * Math.PI / 180) * 78) + bob;
  const phoneX = handX - 42;
  const phoneY = handY - 119 - 17 * lifting;
  const bars = t < 2.85 ? 4
    : t < 3.21 ? 3
      : t < 3.51 ? 2
        : t < 4.21 ? 1
          : t < 4.98 ? 0
            : t < 6.22 ? 1 : 0;
  const glow = smooth(4.96, 5.11, t) * (1 - smooth(6.2, 6.33, t));

  return (
    <AbsoluteFill style={{background: '#34403B', overflow: 'hidden'}}>
      <div style={{
        position: 'absolute', width: 1080, height: 1920, left: 0, top: 0,
        transform: 'translateX(' + cameraTrack + 'px) scale(' + cameraZoom + ')',
        transformOrigin: '55% 55%',
      }}>
        <svg viewBox="0 0 1080 1920" width="1080" height="1920"
          style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
          <defs>
            <linearGradient id="e007-wall" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6F776D" />
              <stop offset="0.5" stopColor="#92988A" />
              <stop offset="1" stopColor="#4F5B53" />
            </linearGradient>
            <linearGradient id="e007-floor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#70776B" />
              <stop offset="1" stopColor="#293B36" />
            </linearGradient>
            <linearGradient id="e007-door" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#56665F" />
              <stop offset="0.48" stopColor="#B0B6A5" />
              <stop offset="1" stopColor="#526259" />
            </linearGradient>
          </defs>

          {/* Architectural planes bleed to EVERY edge, including both safe zones. */}
          <rect x="-200" y="-200" width="1480" height="2200"
            fill="url(#e007-wall)" />
          <path d="M-200 1462 H1280 V2120 H-200 Z" fill="url(#e007-floor)"/>
          <path d="M0 1475 L1080 1475 M-160 1705 L1300 1705"
            fill="none" stroke="#C9C7AD" strokeWidth="7" opacity=".32"/>
          <path d="M235 1465 L-110 1920 M848 1465 L1190 1920"
            fill="none" stroke="#BFC3B2" strokeWidth="11" opacity=".23"/>
          {/* Lobby wall accents and foreground depth remain after the door closes. */}
          <path d="M20 -100 V1545 M1014 -100 V1555" fill="none"
            stroke="#33463F" strokeWidth="36" opacity=".62"/>
          <path d="M75 0 V1460 M991 0 V1460" fill="none"
            stroke="#BCC0AD" strokeWidth="8" opacity=".50"/>
          <rect x="38" y="468" width="79" height="710" rx="7"
            fill="#536E61" stroke="#2B3C34" strokeWidth="14" />
          <rect x="958" y="421" width="95" height="769" rx="9"
            fill="#4E695D" stroke="#25382F" strokeWidth="15" />
          {/* Real portal, not a standalone framed illustration. */}
          <rect x="132" y="226" width="812" height="1290" rx="9"
            fill="#2A332E" stroke="#283D36" strokeWidth="35"/>
          <rect x="157" y="258" width="762" height="1200"
            fill="#9EA99B"/>
          <path d="M157 258 L305 405 V1380 L157 1458 Z"
            fill="#77877E"/>
          <path d="M919 258 L783 405 V1380 L919 1458 Z"
            fill="#6C8076"/>
          <path d="M315 411 L775 411 L845 1380 H235 Z"
            fill="#B6B8A8" opacity=".36"/>
          <rect x="355" y="274" width="366" height="27" rx="11"
            fill="#FAE8C9" opacity=".82"/>
          <rect x="373" y="306" width="334" height="60" rx="26"
            fill="#FFE3B2" opacity=".17"/>
          <path d="M145 1458 L928 1458" stroke="#283E36" strokeWidth="28"/>
          <path d="M157 1450 L310 1356 L767 1356 L919 1450"
            fill="#718179" stroke="#475D50" strokeWidth="12" />

          {/* Button panel has a real world position; finger contacts "12". */}
          <Panel pressed={pressed}/>
          {/* Doors are behind our actor after the camera travels inside. */}
          <rect x="160" y="260" width={378 * closed} height="1195"
            fill="url(#e007-door)" stroke="#31453E" strokeWidth="11"/>
          <rect x={920 - 378 * closed} y="260" width={378 * closed}
            height="1195" fill="url(#e007-door)" stroke="#31453E"
            strokeWidth="11"/>
          <path d={'M' + (159 + 378 * closed) + ' 260 V1452 M'
            + (921 - 378 * closed) + ' 260 V1452'}
            fill="none" stroke="#DBDFCB" strokeWidth="11" opacity={closed}/>
          <path d="M139 254 V1457 M942 254 V1457"
            stroke="#23382F" strokeWidth="26"/>
          <rect x="428" y="347" width="225" height="101" rx="15"
            fill="#293A33" stroke="#1F2F28" strokeWidth="9"/>
          <text x="540" y="422" textAnchor="middle"
            fill="#FBE0AD" fontWeight="850" fontSize="62"
            fontFamily={brand.fontFamily}>{t < 3.54 ? 'G' : '2'}</text>
          {/* A narrow parallax foreground for a lived-in cabin, not a stage. */}
          <path d="M0 1580 L124 1485 L143 1920 H0 Z"
            fill="#344D41" opacity=".74"/>
          <path d="M1080 1573 L975 1478 L960 1920 H1080 Z"
            fill="#344D41" opacity=".67"/>
          <ellipse cx={heroX + 265} cy="1440" rx="171" ry="31"
            fill="#26352F" opacity={0.23 + 0.08 * walk}/>
        </svg>

        <Character
          width={heroWidth} left={heroX} top={heroY}
          expression={expression} headTilt={headTilt} lean={lean}
          bob={bob} step={step} leftArm={leftArmAngle}
          rightArm={rightArmAngle}
          scarfSwing={scarfSwing}
          gazeX={t < 3 ? -3 : t < 5 ? 12 : deadpan > 0.9 ? 0 : 9}
          blink={blink}
        />

        {/* A single diegetic telephone follows the real hand endpoint. */}
        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          <ellipse cx={phoneX + 43} cy={phoneY + 59}
            rx={65 + glow * 17} ry={92 + glow * 15}
            fill="#D6F0B1" opacity={0.11 * glow}/>
          <g transform={'translate(' + phoneX + ' ' + phoneY
            + ') rotate(' + mix(9, -12, lifting) + ' 42 124)'}>
            <rect width="85" height="163" rx="20"
              fill="#2B3632" stroke="#192720" strokeWidth="11"/>
            <rect x="8" y="12" width="69" height="134" rx="12"
              fill="#3A6355"/>
            <path d="M20 36 H65" stroke="#D8E3C5" strokeWidth="4"
              opacity=".24"/>
            <SignalBars bars={bars} x={16} y={22} scale={0.96}/>
            <circle cx="42" cy="100" r="18" fill="#E96B3C"/>
            <path d="M33 102 Q43 115 51 101"
              fill="none" stroke="#F6F0E5" strokeWidth="6"
              strokeLinecap="round"/>
            <rect x="27" y="154" width="30" height="4" rx="2"
              fill="#ABB7A9"/>
          </g>
          {/* Foreground thumb communicates an actual held prop. */}
          <ellipse cx={handX + 4} cy={handY + 4} rx="18" ry="15"
            fill={brand.colors.paper} stroke={brand.colors.ink}
            strokeWidth="7" opacity={walk > 0.03 ? 1 : 0.95}/>
          {/* Momentary little POP belongs to the phone, not a floating diagram. */}
          <g opacity={glow * (1 - smooth(5.22, 5.61, t))}
            stroke="#E9A56C" strokeWidth="9" strokeLinecap="round">
            <path d={'M' + (phoneX - 18) + ' ' + (phoneY + 10)
              + ' l-18 -22'}/>
            <path d={'M' + (phoneX + 88) + ' ' + (phoneY - 5)
              + ' l19 -22'}/>
          </g>
        </svg>
      </div>

      {/* QA-only layer; never included in the clean proof. */}
      {showSafeOverlay ? (
        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          <rect width="1080" height="300" fill="#DE4D57" fillOpacity=".19"/>
          <rect x="900" width="180" height="1920"
            fill="#DE4D57" fillOpacity=".17"/>
          <rect y="1620" width="1080" height="300"
            fill="#DE4D57" fillOpacity=".20"/>
          <rect x="72" y="330" width="800" height="1170"
            fill="none" stroke="#E0B96E" strokeWidth="6"
            strokeDasharray="17 14"/>
          <rect x="72" y="1340" width="800" height="160"
            fill="none" stroke="#E96B3C" strokeWidth="6"
            strokeDasharray="14 12"/>
        </svg>
      ) : null}
      <Audio name="Original lift + phone acting cues" src={actingCues()} volume={0.85}/>
    </AbsoluteFill>
  );
};
