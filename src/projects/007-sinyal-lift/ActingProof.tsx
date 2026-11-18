import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {brand} from '../../brand/tokens';
import {Character, type CharacterExpression} from '../002-kulkas/Character';

// E007 GATE B ONLY: 8-second acting proof. Not the full film.
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
    const ding = tone(t, 0.38, 710, 0.45, 0.12) + tone(t, 0.38, 1065, 0.36, 0.05);
    const beep = tone(t, 2.90, 890, 0.16, 0.10);
    const doorEnvelope = smooth(3.15, 3.34, t) * (1 - smooth(3.77, 3.98, t));
    const noise = (Math.sin(i * 1.93) * Math.sin(i * 0.117) * 0.025) * doorEnvelope;
    const pop = tone(t, 5.51, 880, 0.17, 0.077) + tone(t, 5.51, 1260, 0.12, 0.045);
    const fail = tone(t, 6.72, 270, 0.23, 0.058);
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

const Panel: React.FC<{pressed: number; floor: string}> = ({pressed, floor}) => (
  <g transform="translate(75 73)">
    <rect x="641" y="748" width="116" height="544" rx="16" fill="#454C47"
      stroke="#26332F" strokeWidth="10" />
    <rect x="661" y="785" width="76" height="107" rx="9" fill="#172421"
      stroke="#647269" strokeWidth="5" />
    <text x="699" y="861" fontFamily={brand.fontFamily} fontSize="62"
      fontWeight="850" textAnchor="middle" fill="#F5D5A0">{floor}</text>
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


/**
 * V4 ACTING GATE
 * Shot A: actual exterior lobby -> crosses threshold and disappears BEHIND the portal jamb.
 * Shot B: inside the same cab facing the doors -> press floor 12 -> shut -> signal comedy.
 * Transition is motivated by the door jamb occluding the camera, not a title or dissolve.
 * Every prop position is resolved from the E002 Character's real hand endpoints.
 */
export const LiftActingProof: React.FC<LiftActingProofProps> = ({
  showSafeOverlay = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const exterior = t < 2.35;
  const enter = smooth(0.20, 2.21, t);
  const entryStride = (1 - smooth(1.95, 2.28, t));
  const pressReach = smooth(2.48, 2.84, t) * (1 - smooth(3.00, 3.36, t));
  const buttonPress = smooth(2.83, 2.92, t) * (1 - smooth(3.03, 3.17, t));
  const doorClose = smooth(3.17, 3.95, t);
  const hearGlitch = smooth(3.86, 4.36, t);
  const inspectPhone = smooth(4.08, 4.56, t);
  const liftPhone = smooth(4.72, 5.43, t);
  const hope = smooth(5.48, 5.57, t);
  const signalLoss = smooth(6.69, 6.82, t);
  const deadpan = smooth(6.96, 7.24, t);

  // EXTERIOR: recognizable lobby, right-hand doorway, and walking across it.
  const eX = mix(-310, 480, enter);
  const eWidth = mix(475, 399, enter);
  const eY = mix(765, 901, enter);
  const walkingStep = t * 2.55 * entryStride;
  const eBob = Math.sin(t * 17) * 7 * entryStride;
  const eLeftAngle = -143;
  const eRightAngle = 13 + Math.sin(t * 11) * 12 * entryStride;
  const eHandX = eX + eWidth / 300 * (100 + Math.sin(eLeftAngle * Math.PI / 180) * 78);
  const eHandY = eY + eWidth / 300 * (235 + Math.cos(eLeftAngle * Math.PI / 180) * 78) + eBob;
  const ePhoneX = eHandX - 29;
  const ePhoneY = eHandY - 118;
  const exteriorCamera = -64 * enter;

  // INTERIOR: the actor finishes entering, then genuinely operates a real button.
  // At contact, right-hand endpoint ~ (797,1179), inside the button 12 surface.
  const iX = mix(352, 331, smooth(2.34, 2.64, t));
  const iY = 763;
  const iWidth = 510;
  const iRightAngle = mix(-15, 79, pressReach);
  const iLeftAngle = mix(-145, -78, inspectPhone) +
    mix(0, -82, liftPhone);
  const iBob = 3.2 * Math.sin(t * 14) * (1 - smooth(2.47, 2.76, t))
    + 4.5 * deadpan;
  const iLean = 2.6 * pressReach - 3.0 * liftPhone + 7.0 * deadpan;
  const iHeadTilt = -2 + 8 * hearGlitch - 9 * liftPhone + 2 * deadpan;
  const iHandX = iX + iWidth / 300 * (100 + Math.sin(iLeftAngle * Math.PI / 180) * 78);
  const iHandY = iY + iWidth / 300 * (235 + Math.cos(iLeftAngle * Math.PI / 180) * 78) + iBob;
  const iPhoneX = iHandX - 29;
  const iPhoneY = iHandY - 119;
  const iButtonX = iX + iWidth / 300 * (200 + Math.sin(iRightAngle * Math.PI / 180) * 78);
  const iButtonY = iY + iWidth / 300 * (235 + Math.cos(iRightAngle * Math.PI / 180) * 78) + iBob;
  const bars = t < 3.78 ? 4 : t < 4.12 ? 3 : t < 4.37 ? 2 : t < 4.87 ? 1
    : t < 5.51 ? 0 : t < 6.73 ? 1 : 0;
  const expression: CharacterExpression = deadpan > 0.73 ? 'deadpan'
    : signalLoss > 0.1 ? 'annoyed'
    : hope > 0.5 ? 'curious'
    : liftPhone > 0.18 ? 'surprised'
    : hearGlitch > 0.4 ? 'worried'
    : pressReach > 0.6 ? 'neutral'
    : 'happy';
  const blink = Math.max(0, 1 - Math.abs(t - 4.10) / 0.10);
  const iScarf = 5 * Math.sin((t - 2.35) * 8) *
    Math.exp(-Math.max(0, t - 2.35) * 2.4) * (1 - hope)
    + 8 * Math.sin((t - 4.72) * 11) *
    Math.exp(-Math.max(0, t - 4.72) * 3) * liftPhone * (1 - hope);
  const glow = smooth(5.51, 5.63, t) * (1 - smooth(6.68, 6.83, t));

  // Diegetic phone: wrist underneath device; never a separate floating diagram.
  const Phone: React.FC<{x: number; y: number; bars: number; tilt?: number; scale?: number}> =
    ({x, y, bars: n, tilt = 0, scale = 1}) => (
      <g transform={'translate(' + x + ' ' + y + ') rotate(' + tilt + ' 30 119) scale(' + scale + ')'}>
        <rect width="61" height="130" rx="15" fill="#25342F" stroke="#172820" strokeWidth="9"/>
        <rect x="7" y="10" width="47" height="104" rx="7" fill="#3A6D59"/>
        <SignalBars bars={n} x={8} y={16} scale={0.72}/>
        <circle cx="30" cy="84" r="14" fill="#E96B3C"/>
        <path d="M23 84 Q31 96 38 83" stroke="#F6F0E5"
          strokeWidth="4" fill="none" strokeLinecap="round"/>
        <rect x="23" y="121" width="16" height="3" rx="2" fill="#BCC7BC"/>
      </g>
    );

  return (
    <AbsoluteFill style={{background: '#43564D', overflow: 'hidden'}}>
      {exterior ? (
        // --- SHOT 1: outside the elevator, not an already-entered frontal scene. ---
        <div style={{
          position: 'absolute', inset: 0, width: 1080, height: 1920,
          transform: 'translateX(' + exteriorCamera + 'px)',
        }}>
          <svg width="1080" height="1920" viewBox="0 0 1080 1920"
            style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
            <defs>
              <linearGradient id="e007-lobby-wall" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#B9C6B3"/>
                <stop offset="1" stopColor="#8FA394"/>
              </linearGradient>
              <linearGradient id="e007-lobby-floor" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#9EA99A"/>
                <stop offset="1" stopColor="#5E7569"/>
              </linearGradient>
            </defs>
            {/* A complete 9:16 lobby — continuous walls, ceiling and floor. */}
            <rect x="-130" y="-100" width="1450" height="1700" fill="url(#e007-lobby-wall)"/>
            <path d="M-150 1415 H1280 V2030 H-150 Z" fill="url(#e007-lobby-floor)"/>
            <path d="M-130 1420 H1260" stroke="#394D41" strokeWidth="21"/>
            <path d="M-190 1690 H1260 M-80 1880 H1190" stroke="#CAD1BD" strokeWidth="7" opacity=".33"/>
            <path d="M110 1428 L-100 1920 M525 1428 L450 1920 M980 1428 L1190 1920"
              stroke="#E8E2CD" strokeWidth="9" opacity=".24"/>
            <rect x="0" y="54" width="1080" height="125" fill="#738E7B" opacity=".55"/>
            <rect x="90" y="201" width="408" height="22" rx="8" fill="#D8DEC7" opacity=".7"/>
            <rect x="79" y="250" width="283" height="590" rx="12" fill="#7C998B"
              stroke="#3E564A" strokeWidth="21"/>
            <rect x="107" y="281" width="227" height="530" fill="#A9BFAD" opacity=".6"/>
            <path d="M206 290 V799 M110 549 H332" stroke="#516E5E" strokeWidth="16"/>
            {/* Large elevator portal on the RIGHT; cabin visually recedes. */}
            <path d="M415 280 H1130 V1512 H415 Z" fill="#24362F" stroke="#34483F" strokeWidth="30"/>
            <path d="M448 312 H1085 V1460 H448 Z" fill="#A5B7A9"/>
            <path d="M448 312 L568 447 V1354 L448 1460 Z" fill="#6D8679"/>
            <path d="M1085 312 L1004 443 V1360 L1085 1460 Z" fill="#738B7C"/>
            <path d="M570 442 H1005 V1357 H570 Z" fill="#C6CAB7"/>
            <path d="M570 442 L787 604 L1005 442" fill="#AEBDAA" opacity=".44"/>
            <rect x="600" y="372" width="350" height="23" rx="10" fill="#FFF0C9" opacity=".87"/>
            <path d="M570 1357 L448 1460 H1085 L1005 1357 Z" fill="#7C9284"/>
            <path d="M444 1457 H1085" stroke="#ECDEBC" strokeWidth="18"/>
            <path d="M568 443 V1357 M1004 443 V1357"
              stroke="#72897C" strokeWidth="10"/>
            {/* Diegetic exterior lift indicator with lit arrow. */}
            <rect x="680" y="237" width="175" height="83" rx="16" fill="#293A32" stroke="#1C2D26" strokeWidth="8"/>
            <text x="770" y="294" fontFamily={brand.fontFamily}
              fontSize="49" fontWeight="800" textAnchor="middle" fill="#FFE0B1">G ↑</text>
            {/* Subtle lobby depth and a small plant, not a floating card. */}
            <path d="M0 1116 H158 V1415 H0 Z" fill="#5A7466"/>
            <path d="M55 1160 Q-8 1060 61 952 Q102 1022 62 1110" fill="#42765B" stroke="#2B5040" strokeWidth="9"/>
            <path d="M55 1130 Q156 1048 120 925 Q51 1012 55 1130" fill="#5B8662" stroke="#294A3B" strokeWidth="9"/>
          </svg>

          {/* Large recognizable actor crosses from x<0 through visible portal x~440. */}
          <Character width={eWidth} left={eX} top={eY} expression="happy"
            step={walkingStep} bob={eBob} leftArm={eLeftAngle}
            rightArm={eRightAngle} scarfSwing={10 * Math.sin(t * 11 - .7) * entryStride}
            headTilt={-2 + 2 * Math.sin(t * 6) * entryStride}/>
          <svg width="1080" height="1920" viewBox="0 0 1080 1920"
            style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
            <Phone x={ePhoneX} y={ePhoneY} bars={4} tilt={-12}/>
            {/* A real door jamb crosses IN FRONT of the actor, proving threshold depth. */}
            <rect x="426" y="270" width="29" height="1205" fill="#31463A"/>
            <path d="M451 301 V1457" stroke="#D6DBC7" strokeWidth="10" opacity=".62"/>
            <path d="M412 1459 L1095 1459" stroke="#2B4337" strokeWidth="13"/>
            {/* Foreground jamb persists in the lobby shot; the camera passes it. */}
          </svg>
        </div>
      ) : (
        // --- SHOT 2: camera is INSIDE cab, looking toward its closing doorway. ---
        <div style={{position: 'absolute', inset: 0, width: 1080, height: 1920,
          transform: 'translateX(' + (-14 * smooth(4.8, 7.5, t)) +
          'px) scale(' + (1.08 + .025 * smooth(4.8, 7.5, t)) + ')',
          transformOrigin: '52% 52%',
        }}>
          <svg width="1080" height="1920" viewBox="0 0 1080 1920"
            style={{position:'absolute',inset:0,overflow:'visible'}}>
            <defs>
              <linearGradient id="e007-int-wall" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#A9B8A4"/>
                <stop offset=".6" stopColor="#839889"/>
                <stop offset="1" stopColor="#536B5E"/>
              </linearGradient>
              <linearGradient id="e007-int-door" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#65786F"/>
                <stop offset=".5" stopColor="#D0D0BB"/>
                <stop offset="1" stopColor="#697C70"/>
              </linearGradient>
            </defs>
            <rect x="-170" y="-180" width="1450" height="2200" fill="url(#e007-int-wall)"/>
            <path d="M-160 1445 H1280 V2060 H-160 Z" fill="#536E61"/>
            <path d="M-130 1640 H1290 M-130 1785 H1290" stroke="#92A697" strokeWidth="8" opacity=".28"/>
            <path d="M160 1445 L-130 1920 M720 1445 L1000 1920" stroke="#D3D5B8" strokeWidth="8" opacity=".27"/>
            <path d="M0 290 L1080 290" stroke="#30463A" strokeWidth="26" opacity=".6"/>
            <rect x="130" y="360" width="590" height="1110" fill="#2A3C33"
              stroke="#30483D" strokeWidth="29"/>
            <rect x="153" y="379" width="544" height="1064" fill="#B5BCA9"/>
            {/* Door remains on back wall, never in front of actor's face. */}
            <rect x="153" y="379" width={272 * doorClose} height="1064"
              fill="url(#e007-int-door)" stroke="#41564A" strokeWidth="8"/>
            <rect x={697 - 272 * doorClose} y="379" width={272 * doorClose}
              height="1064" fill="url(#e007-int-door)" stroke="#41564A" strokeWidth="8"/>
            <path d={'M' + (153 + 272 * doorClose) + ' 379 V1443 M'
              + (697 - 272 * doorClose) + ' 379 V1443'}
              stroke="#E6E2CD" strokeWidth="10" opacity={doorClose}/>
            <path d="M128 367 V1464 M722 367 V1464" stroke="#263B32" strokeWidth="21"/>
            <path d="M121 1452 H729" stroke="#2D4739" strokeWidth="23"/>
            {/* Controls on the separate right wall, not on the sliding doors. */}
            <path d="M730 314 H1130 V1478 H730 Z" fill="#728D7C"
              stroke="#425B4B" strokeWidth="15"/>
            <path d="M742 331 V1440" stroke="#B8CAB3" strokeWidth="10" opacity=".6"/>
            <rect x="381" y="226" width="176" height="98" rx="15"
              fill="#263B30" stroke="#172920" strokeWidth="9"/>
            <text x="469" y="295" fontSize="60" textAnchor="middle" fontWeight="850"
              fontFamily={brand.fontFamily} fill="#F6DAAA">{t < 4.20 ? 'G' : '2'}</text>
            <Panel pressed={buttonPress} floor={t < 4.20 ? 'G' : '2'}/>
            {/* Occluding near-wall geometry extends to the screen edge. */}
            <path d="M-100 1550 L30 1455 L65 2020 H-100 Z"
              fill="#395548" opacity=".75"/>
            <path d="M1100 1550 L1007 1450 L968 2020 H1100 Z"
              fill="#395548" opacity=".75"/>
            <ellipse cx={iX + iWidth/2} cy="1458"
              rx="141" ry="25" fill="#243B30" opacity=".21"/>
          </svg>

          <Character width={iWidth} left={iX} top={iY}
            expression={expression} leftArm={iLeftAngle} rightArm={iRightAngle}
            headTilt={iHeadTilt} lean={iLean} bob={iBob}
            scarfSwing={iScarf} gazeX={deadpan > .8 ? 1 : liftPhone > .1 ? -8 : 7}
            blink={blink}/>
          <svg width="1080" height="1920" viewBox="0 0 1080 1920"
            style={{position:'absolute',inset:0,pointerEvents:'none'}}>
            <ellipse cx={iPhoneX+30} cy={iPhoneY+45} rx="60" ry="85"
              fill="#B6ECA5" opacity={glow*.22}/>
            <Phone x={iPhoneX} y={iPhoneY} bars={bars}
              tilt={mix(-12,-8,liftPhone)}/>
            {/* Wrist is drawn on top of phone edge, illustrating actual grip. */}
            <ellipse cx={iHandX} cy={iHandY-1} rx="15" ry="12"
              fill={brand.colors.paper} stroke={brand.colors.ink} strokeWidth="7"/>
            {/* Contact flash only when the real finger reaches button 12. */}
            <circle cx={iButtonX} cy={iButtonY} r={buttonPress*11}
              fill={brand.colors.orange} opacity={buttonPress*.4}/>
            <g opacity={glow * (1 - smooth(5.73, 6.12, t))}
              stroke="#EFAB6D" strokeWidth="7" strokeLinecap="round">
              <path d={'M' + (iPhoneX-12) + ' ' + (iPhoneY+10) + ' l-15 -19'}/>
              <path d={'M' + (iPhoneX+66) + ' ' + (iPhoneY+2) + ' l15 -19'}/>
            </g>
          </svg>
        </div>
      )}

      {/* Foreground architectural jamb wipes across BOTH shots at 2.35s,
          making the camera transition occur while its view is occluded. */}
      <div style={{
        position: 'absolute', top: 0,
        left: -1300 + 2350 * smooth(2.11, 2.59, t),
        width: 1400, height: 1920,
        background: 'linear-gradient(90deg,#273D32,#475F50 36%,#344B3E)',
        boxShadow: '24px 0 45px rgba(23,44,32,.14)',
        pointerEvents: 'none',
      }} />
      {showSafeOverlay ? (
        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{position:'absolute',inset:0,pointerEvents:'none'}}>
          <rect width="1080" height="300" fill="#DD4D53" fillOpacity=".18"/>
          <rect x="900" width="180" height="1920" fill="#DD4D53" fillOpacity=".16"/>
          <rect y="1620" width="1080" height="300" fill="#DD4D53" fillOpacity=".21"/>
          <rect x="72" y="330" width="800" height="1170" fill="none"
            stroke="#D8B76F" strokeWidth="6" strokeDasharray="17 14"/>
          <rect x="72" y="1340" width="800" height="160" fill="none"
            stroke="#E96B3C" strokeWidth="6" strokeDasharray="16 12"/>
        </svg>
      ) : null}
      <Audio name="Original elevator/call action cues (1.0x)"
        src={actingCues()} volume={0.85}/>
    </AbsoluteFill>
  );
};
