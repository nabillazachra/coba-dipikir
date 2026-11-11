import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {brand} from '../../brand/tokens';
import {Character, type CharacterExpression} from '../002-kulkas/Character';

// E006 is deliberately ONLY a seven-second acting proof, not the full episode.
// The original Episode 002 Character is imported above and is never copied.
type ActingProofProps = {readonly showSafeOverlay?: boolean};
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (from: number, to: number, t: number) => {
  const k = Math.max(0, Math.min(1, (t - from) / (to - from)));
  return k * k * (3 - 2 * k);
};
const rgb = (a: [number, number, number], b: [number, number, number], t: number) =>
  'rgb(' + a.map((v, i) => Math.round(lerp(v, b[i], t))).join(',') + ')';

/**
 * Entirely original four-note motif. Generated deterministically from sine
 * oscillators as a 16-kHz PCM WAV so the proof has no licensed song dependency.
 * Keep one cached data URL: a frame must never generate a different soundtrack.
 */
let motifCache: string | undefined;
const originalMotif = () => {
  if (motifCache) return motifCache;
  const rate = 16000;
  const n = rate * 7;
  const buffer = new ArrayBuffer(44 + 2 * n);
  const view = new DataView(buffer);
  const tag = (at: number, word: string) => {
    for (let i = 0; i < word.length; i++) view.setUint8(at + i, word.charCodeAt(i));
  };
  tag(0, 'RIFF'); view.setUint32(4, 36 + n * 2, true);
  tag(8, 'WAVE'); tag(12, 'fmt ');
  view.setUint32(16, 16, true); view.setUint16(20, 1, true);
  view.setUint16(22, 1, true); view.setUint32(24, rate, true);
  view.setUint32(28, rate * 2, true); view.setUint16(32, 2, true);
  view.setUint16(34, 16, true); tag(36, 'data'); view.setUint32(40, n * 2, true);
  const notes: Array<[number, number]> = [
    [0.70, 392.00], [0.96, 466.16], [1.23, 349.23], [1.52, 523.25],
    [3.85, 392.00], [4.22, 466.16], [4.62, 349.23], [5.08, 523.25],
  ];
  for (let i = 0; i < n; i++) {
    const t = i / rate;
    let v = 0;
    // Distant room hum that ducks when the familiar motif is recognized.
    v += 0.015 * Math.sin(2 * Math.PI * 98 * t) * (1 - 0.65 * smooth(1, 2, t));
    for (const [start, frequency] of notes) {
      const age = t - start;
      if (age < 0 || age > 1.8) continue;
      const attack = Math.min(1, age * 26);
      const release = Math.exp(-age * (start < 2 ? 4.4 : 1.9));
      const body = Math.sin(2 * Math.PI * frequency * age) +
        0.20 * Math.sin(2 * Math.PI * frequency * 2 * age);
      v += 0.105 * attack * release * body * (start < 2 ? 0.48 : 0.93);
    }
    // Soft original transition sweep, not an external sample.
    const transition = smooth(3.20, 4.05, t) * (1 - smooth(5.4, 6.6, t));
    v += 0.023 * transition * Math.sin(2 * Math.PI * (160 + 85 * t) * t);
    view.setInt16(44 + i * 2, Math.round(Math.max(-1, Math.min(1, v)) * 32767), true);
  }
  const bytes = new Uint8Array(buffer);
  const chunks: string[] = [];
  for (let i = 0; i < bytes.length; i += 4096) {
    chunks.push(String.fromCharCode(...bytes.subarray(i, i + 4096)));
  }
  motifCache = 'data:audio/wav;base64,' + btoa(chunks.join(''));
  return motifCache;
};

export const LaguActingProof: React.FC<ActingProofProps> = ({showSafeOverlay = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;
  // Eyes shift before brows, head precedes torso, finger activates the morph.
  const hear = smooth(0.68, 0.88, sec);
  const eyeShift = smooth(0.82, 1.13, sec);
  const browChange = smooth(1.14, 1.40, sec);
  const headTurn = smooth(1.48, 1.99, sec);
  const bodyTurn = smooth(1.82, 2.26, sec);
  const recognize = smooth(0.92, 2.18, sec);
  const reach = smooth(2.30, 3.11, sec);
  const contact = smooth(3.07, 3.15, sec);
  const press = contact * (1 - smooth(3.27, 3.60, sec));
  const morph = smooth(3.34, 6.42, sec);
  const edgeMorph = smooth(3.35, 4.46, sec);
  const lampMorph = smooth(3.80, 5.08, sec);
  const windowMorph = smooth(4.19, 5.69, sec);
  const seatMorph = smooth(4.65, 6.03, sec);
  const cityMorph = smooth(4.37, 6.10, sec);
  const floorMorph = smooth(4.75, 6.43, sec);
  const arrival = smooth(5.72, 6.86, sec);
  const ripple = smooth(3.14, 5.32, sec);
  const heroX = lerp(218, 197, morph);
  const heroY = lerp(704, 797, morph);
  const heroWidth = lerp(486, 510, morph);
  // No cartoon shock rays: subtle brow recognition, then a quiet smile.
  const expression: CharacterExpression =
    arrival > 0.73 ? 'happy' : browChange > 0.68 ? 'curious' : 'neutral';
  const blink = Math.max(
    0, 1 - Math.abs(sec - 1.59) / 0.10,
    1 - Math.abs(sec - 6.31) / 0.11,
  );
  const scarfSwing =
    1.3 * Math.sin(sec * 3.5) * (1 - hear) +
    3.4 * Math.sin(Math.max(0, sec - 1.51) * 7.5) * headTurn * (1 - bodyTurn) +
    17 * Math.sin(Math.max(0, sec - 3.15) * 8) *
      Math.exp(-Math.max(0, sec - 3.15) * 0.82) * contact;
  const windowX = lerp(646, 552, windowMorph);
  const windowY = lerp(420, 371, windowMorph);
  const windowW = lerp(485, 614, windowMorph);
  const windowH = lerp(550, 691, windowMorph);
  // Push for recognition, then track into the emerging vehicle.
  const pan = -23 * headTurn * (1 - morph) - 67 * morph;
  const zoom = 1 + 0.081 * headTurn + 0.021 * morph;
  const deskY = lerp(1170, 1128, edgeMorph);
  const accentLight = 0.11 + 0.49 * morph;
  const handAngle = lerp(-29, 70, reach) - 17 * seatMorph;
  const bookSettle = smooth(0.05, 0.71, sec);
  const exteriorMove = cityMorph * Math.max(0, sec - 4.37) * 36;

  return (
    <AbsoluteFill style={{background: brand.colors.paper, overflow: 'hidden'}}>
      <div style={{
        position: 'absolute', width: 1080, height: 1920, inset: 0,
        transform: 'translate(' + pan + 'px, ' + lerp(0, -20, morph) + 'px) scale(' + zoom + ')',
        transformOrigin: '51% 53%',
      }}>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
          <defs>
            <linearGradient id="e006-wall" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor={rgb([230, 222, 211], [239, 185, 133], floorMorph)} />
              <stop offset="1" stopColor={rgb([184, 176, 166], [155, 107, 92], floorMorph)} />
            </linearGradient>
            <linearGradient id="e006-floor" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={rgb([178, 159, 139], [116, 100, 94], floorMorph)} />
              <stop offset="1" stopColor={rgb([104, 101, 96], [56, 62, 68], floorMorph)} />
            </linearGradient>
            <linearGradient id="e006-sky" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={rgb([169, 189, 188], [227, 126, 105], cityMorph)} />
              <stop offset="0.62" stopColor={rgb([216, 199, 173], [250, 181, 104], cityMorph)} />
              <stop offset="1" stopColor={rgb([203, 185, 156], [214, 120, 91], floorMorph)} />
            </linearGradient>
            <radialGradient id="e006-sun" cx="73%" cy="44%" r="58%">
              <stop offset="0" stopColor="#FFD090" stopOpacity={accentLight} />
              <stop offset="1" stopColor="#FFD090" stopOpacity="0" />
            </radialGradient>
            <clipPath id="e006-friend-wipe">
              <rect x="537" y="780" width={520 * arrival} height="825" />
            </clipPath>
            <clipPath id="e006-window-clip">
              <rect x={windowX + 16} y={windowY + 16} width={windowW - 32} height={windowH - 32} rx={lerp(12, 48, morph)} />
            </clipPath>
          </defs>

          {/* One continuous world: no external scenery frame or cream padding. */}
          <rect width="1080" height="1920" fill="url(#e006-wall)" />
          <path d="M0 1374 L1080 1374 L1080 1920 L0 1920 Z" fill="url(#e006-floor)" />
          <path d="M0 1371 H1080" stroke="#493C37" strokeWidth="22" opacity={1 - morph * 0.53} />
          <path d="M0 1650 L1080 1550 M0 1880 L1080 1755" stroke="#F2DDC2" strokeWidth="6" opacity={0.11 + 0.13 * morph} />
          <rect x="0" y="0" width="1080" height="1920" fill="url(#e006-sun)" />
          {/* A foreground travel bag and its cast shadow keep the lower
              world inhabited without placing information under platform UI. */}
          <ellipse cx={185 + 40 * floorMorph} cy="1749"
            rx={190} ry="42" fill="#2D3030" opacity={0.20 + 0.09 * floorMorph} />
          <path d={
            'M-80 ' + lerp(1558, 1525, floorMorph) +
            ' Q57 ' + lerp(1460, 1495, floorMorph) +
            ' 230 1491 Q322 1510 327 1633 L340 1732' +
            ' Q192 1827 -78 1720 Z'}
            fill={rgb([113, 119, 109], [67, 102, 93], floorMorph)}
            stroke="#44443F" strokeWidth="15" />
          <path d="M51 1503 Q96 1391 195 1469"
            fill="none" stroke="#353E39" strokeWidth="18" strokeLinecap="round" />
          <path d="M27 1601 Q144 1647 285 1610"
            fill="none" stroke="#DECBAD" strokeWidth="7" opacity=".51" />
          <path d="M-31 1700 Q86 1764 250 1735"
            fill="none" stroke="#2D3532" strokeWidth="13" opacity=".39" />
          {/* Warm late-afternoon rim lighting belongs to the environment. */}
          <path d="M0 1375 Q500 1260 1080 1385 L1080 1560 Q566 1457 0 1567 Z"
            fill="#FFCB8F" opacity={morph * 0.115} />


          {/* The real room window becomes the bus window by reshaping the same border. */}
          <rect x={windowX - 12} y={windowY - 12} width={windowW + 24}
            height={windowH + 24} rx={lerp(24, 75, windowMorph)}
            fill={rgb([115, 109, 101], [59, 73, 74], windowMorph)} />
          <rect x={windowX} y={windowY} width={windowW} height={windowH}
            rx={lerp(16, 65, windowMorph)} fill="url(#e006-sky)" />
          <g clipPath="url(#e006-window-clip)">
            <circle cx={lerp(952, 885, windowMorph)} cy={lerp(576, 600, windowMorph)} r={lerp(65, 114, windowMorph)}
              fill="#FDE0A6" opacity={0.48 + 0.3 * windowMorph} />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <g key={i}>
                <rect x={lerp(641, 480, windowMorph) + i * 79 - windowMorph * exteriorMove}
                  y={lerp(765, 690, windowMorph) - (i % 3) * (38 + 20 * windowMorph)}
                  width={69 + (i % 2) * 16}
                  height="470" fill={i % 2 ? '#7C7473' : '#85766E'}
                  opacity={0.36 + 0.28 * windowMorph} />
                {[0,1,2].map((j) => <rect key={j}
                  x={lerp(667, 506, windowMorph) + i * 79 + (j % 2) * 21 - windowMorph * exteriorMove}
                  y={798 + j * 37 - (i % 3) * 44}
                  width="9" height="12" rx="3" fill="#FBE2AA" opacity={windowMorph * 0.75} />)}
              </g>
            ))}
            <path d={'M' + windowX + ' ' + (windowY + windowH - 30) +
              ' H' + (windowX + windowW)} stroke="#665B57" strokeWidth="20" opacity={windowMorph} />
          </g>
          <path d={'M' + (windowX + windowW * lerp(0.52, 0.34, windowMorph)) + ' ' + windowY +
            ' V' + (windowY + windowH)}
            stroke={rgb([109, 104, 94], [62, 73, 73], windowMorph)}
            strokeWidth={lerp(13, 26, windowMorph)} />
          <path d={'M' + windowX + ' ' + (windowY + windowH * lerp(0.48, 0.81, windowMorph)) +
            ' H' + (windowX + windowW)} stroke="#5D5F59"
            strokeWidth={lerp(14, 23, windowMorph)} opacity={1 - 0.38 * windowMorph} />

          {/* Bus ceiling hand straps, anchored above camera crop.
              Their delayed entrance is a world clue, not a typography overlay. */}
          <g opacity={smooth(5.07, 6.20, sec)}>
            <path d="M180 -30 V452 M340 -40 V395" stroke="#344B48"
              strokeWidth="21" strokeLinecap="round" />
            <rect x="136" y="442" width="84" height="85" rx="28"
              fill="none" stroke="#365952" strokeWidth="19" />
            <rect x="301" y="385" width="75" height="76" rx="28"
              fill="none" stroke="#365952" strokeWidth="18" />
          </g>

          {/* Bookshelf straight lines become the vertical building rhythms. */}
          <g opacity={1 - cityMorph * 0.92}>
            <rect x="42" y="315" width="153" height="850" rx="10" fill="#73695E" />
            <rect x="55" y="329" width="128" height="835" rx="7" fill="#D7C3AC" />
            {[0,1,2].map((i) => <path key={i} d={'M55 ' + (515 + 220*i) + ' H183'}
              stroke="#514B43" strokeWidth="19" />)}
            {[0,1,2,3,4,5].map((i) => <rect key={i} x={65 + (i%3)*36}
              y={400 + Math.floor(i/3)*440} width={25+(i%2)*7}
              height={90+(i%3)*28} rx="4"
              fill={i%3===0?'#E96B3C':i%3===1?'#42765B':'#F6F0E5'}
              stroke="#47443E" strokeWidth="5" />)}
          </g>
          <g opacity={cityMorph * 0.74}>
            {[0,1,2,3].map((i) => <path key={i}
              d={'M' + (-80+i*94) + ' 350 V' + (800+i%2*130)}
              stroke="#665A51" strokeWidth="30" />)}
          </g>

          {/* Desk lamp's arm becomes the streetlight viewed from the bus. */}
          <path d={'M' + lerp(930, 898, lampMorph) + ' ' + lerp(1147, 1051, lampMorph) +
            ' L' + lerp(923, 901, lampMorph) + ' ' + lerp(955, 574, lampMorph) +
            ' L' + lerp(855, 813, lampMorph) + ' ' + lerp(922, 563, lampMorph)}
            fill="none" stroke={rgb([74, 71, 67], [62, 75, 75], lampMorph)}
            strokeWidth={lerp(22, 17, lampMorph)} strokeLinecap="round" strokeLinejoin="round" />
          <path d={'M' + lerp(828, 788, lampMorph) + ' ' + lerp(916, 557, lampMorph) +
            ' Q' + lerp(851, 798, lampMorph) + ' ' + lerp(865, 530, lampMorph) +
            ' ' + lerp(887, 853, lampMorph) + ' ' + lerp(914, 564, lampMorph) + ' Z'}
            fill="#F1A96D" stroke="#4D4A43" strokeWidth="9" />
          <circle cx={lerp(854, 811, lampMorph)} cy={lerp(930, 588, lampMorph)}
            r={lerp(27, 52, lampMorph)} fill="#FFD9A0" opacity={0.20 + lampMorph*0.38} />

          {/* Chair turns into a bus passenger seat in exactly the same place. */}
          <rect x={lerp(175, 131, seatMorph)} y={lerp(1015, 960, seatMorph)}
            width={lerp(320, 370, seatMorph)} height={lerp(390, 490, seatMorph)}
            rx={lerp(38, 74, seatMorph)}
            fill={rgb([139, 123, 109], [74, 118, 110], seatMorph)}
            stroke="#4D4A43" strokeWidth="16" />
          <path d={'M' + lerp(212, 154, seatMorph) + ' ' + lerp(1066, 1015, seatMorph) +
            ' Q' + lerp(336, 320, seatMorph) + ' ' + lerp(980, 969, seatMorph) +
            ' ' + lerp(461, 473, seatMorph) + ' ' + lerp(1060, 1015, seatMorph)}
            stroke="#F6F0E5" strokeWidth="9" opacity={seatMorph * .52} fill="none" />

          {/* The friend is revealed spatially inside the memory, not in a card. */}
          <g clipPath="url(#e006-friend-wipe)">
            <ellipse cx="748" cy="1295" rx="166" ry="195" fill="#4C7F5A" stroke="#20251F" strokeWidth="15" />
            <circle cx="750" cy="932" r="105" fill="#F6F0E5" stroke="#20251F" strokeWidth="13" />
            <path d="M691 895 Q750 824 817 891" stroke="#20251F" strokeWidth="17" fill="none" strokeLinecap="round" />
            <path d="M713 940 L713 953 M776 940 L776 953" stroke="#20251F" strokeWidth="13" strokeLinecap="round" />
            <path d="M721 997 Q751 1026 786 992" stroke="#20251F" strokeWidth="9" fill="none" strokeLinecap="round" />
            <path d="M671 1175 Q614 1151 566 1164" stroke="#20251F" strokeWidth="22" fill="none" strokeLinecap="round" />
            <circle cx="565" cy="1164" r="23" fill="#F6F0E5" stroke="#20251F" strokeWidth="10" />
            <path d="M729 1041 C764 1093 728 1124 682 1119" stroke="#292A28" strokeWidth="6" fill="none" />
            <circle cx="727" cy="1028" r="20" fill="#343734" stroke="#20251F" strokeWidth="6" />
            <path d="M727 1042 C683 1081 652 1048 629 1023 C603 992 560 1007 551 1044"
              fill="none" stroke="#292D2A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="549" cy="1045" r="11" fill="#E96B3C" stroke="#20251F" strokeWidth="5" />
          </g>

          {/* Table edge remains a single drawn geometry as it turns into bus railing. */}
          <path d={'M' + lerp(544, 518, edgeMorph) + ' ' + deskY +
            ' L1110 ' + lerp(1169, 1115, edgeMorph) + ' L1110 1920 L' +
            lerp(572, 560, edgeMorph) + ' 1920 Z'}
            fill={rgb([114, 94, 78], [81, 93, 91], edgeMorph)}
            opacity={0.91 - 0.63 * edgeMorph} />
          <path d={'M' + lerp(540, 512, edgeMorph) + ' ' + deskY +
            ' Q' + lerp(845, 845, edgeMorph) + ' ' + lerp(1171, 1100, edgeMorph) +
            ' 1120 ' + lerp(1170, 1116, edgeMorph)}
            fill="none" stroke={rgb([59, 55, 50], [58, 71, 73], edgeMorph)}
            strokeWidth={lerp(29, 21, edgeMorph)} strokeLinecap="round" />
          <path d={'M' + lerp(757, 737, edgeMorph) + ' ' + deskY +
            ' L' + lerp(757, 737, edgeMorph) + ' ' + lerp(1430, 1570, edgeMorph)}
            stroke="#425252" strokeWidth="17" opacity={edgeMorph} />
          <path d={'M' + lerp(990, 970, edgeMorph) + ' ' + deskY +
            ' L' + lerp(990, 970, edgeMorph) + ' 1710'}
            stroke="#425252" strokeWidth="17" opacity={edgeMorph} />

          {/* The paperback is being put down before music interrupts. */}
          <g transform={'translate(' + lerp(420, 518, bookSettle) + ' ' +
            lerp(1096, 1130, bookSettle) + ') rotate(' + lerp(-13, 0, bookSettle) + ')'}
            opacity={1 - 0.93 * edgeMorph}>
            <rect width="93" height="48" rx="6" fill="#42765B" stroke="#20251F" strokeWidth="7" />
            <path d="M16 12 H71 M16 25 H54" stroke="#F6F0E5" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* Speaker's geometry folds into a little join on the bus railing. */}
          <g opacity={1 - arrival * 0.83}
             transform={'translate(' + (-5 * press) + ' ' + (9 * press) +
               ') rotate(' + (-5 * press) + ' 695 1105)'}>
            <rect x={lerp(649, 665, edgeMorph)} y={lerp(1049, 1101, edgeMorph)}
              width={lerp(95, 35, edgeMorph)} height={lerp(113, 44, edgeMorph)}
              rx={lerp(18, 9, edgeMorph)} stroke="#20251F" strokeWidth="9"
              fill={rgb([103, 112, 104], [90, 113, 107], edgeMorph)} />
            <circle cx={lerp(696, 682, edgeMorph)} cy={lerp(1091, 1118, edgeMorph)}
              r={lerp(24, 8, edgeMorph)} stroke="#20251F" strokeWidth="6"
              fill="#C3C7B9" opacity={1 - edgeMorph * 0.68} />
            <circle cx="691" cy="1144" r="6" fill="#E96B3C" opacity={1-edgeMorph} />
          </g>
        </svg>

        {/* Never fork or redraw the approved 002 protagonist. */}
        <Character
          width={heroWidth} left={heroX} top={heroY}
          expression={expression}
          gazeX={lerp(0, 15, eyeShift) * (1 - arrival * 0.45)}
          blink={blink}
          headTilt={lerp(-2, 11, headTurn) - 6 * arrival}
          lean={lerp(-3, 3, bodyTurn) - 7 * morph}
          leftArm={lerp(26, 8, bookSettle) + 4 * morph}
          rightArm={handAngle}
          scarfSwing={scarfSwing}
          bob={-2.2 * (1 - hear) * Math.sin(sec * 6) + 7 * morph}
        />

        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          <defs>
            <filter id="e006-glow"><feGaussianBlur stdDeviation="16" /></filter>
          </defs>
          {/* A foreground seat edge hides the legs as the character settles. */}
          <g opacity={seatMorph}>
            <path d={'M100 ' + lerp(1460, 1342, seatMorph) +
              ' Q270 ' + lerp(1400, 1320, seatMorph) + ' 575 1401 L565 1920 H0 V1515 Z'}
              fill="#38685E" stroke="#20251F" strokeWidth="17" />
            <path d="M-50 1620 Q250 1533 552 1592"
              stroke="#B3C6A2" strokeWidth="16" fill="none" opacity=".45" />
            <rect x="1012" y="0" width="24" height="1920" rx="12"
              fill="#344744" opacity=".67" />
          </g>

          
          {/* Light is carried by the *real object edges*. The line becomes their outline
              before disappearing into the finished bus, never a floating audio meter. */}
          <path
            d={'M690 1090 C669 1133 635 1150 583 1166 L' +
              lerp(540, 512, edgeMorph) + ' ' + deskY +
              ' Q830 ' + lerp(1170, 1120, edgeMorph) +
              ' 1092 ' + lerp(1170, 1117, edgeMorph)}
            stroke="#FFBB74" strokeWidth={18 - 8 * edgeMorph} fill="none"
            strokeLinecap="round" strokeLinejoin="round"
            opacity={smooth(3.14, 3.48, sec) * (1 - smooth(4.28, 4.70, sec))}
            pathLength={1}
            strokeDasharray={String(smooth(3.14, 4.11, sec)) + ' 1'}
          />
          <path
            d={'M934 ' + lerp(1131, 1021, lampMorph) +
              ' Q977 ' + lerp(1037, 770, lampMorph) +
              ' 900 ' + lerp(929, 575, lampMorph) +
              ' L820 ' + lerp(910, 560, lampMorph)}
            stroke="#FFB66B" strokeWidth={16 - 7 * lampMorph} fill="none"
            strokeLinecap="round" strokeLinejoin="round"
            opacity={smooth(3.72, 4.03, sec) * (1 - smooth(4.83, 5.35, sec))}
            pathLength={1}
            strokeDasharray={String(smooth(3.77, 4.72, sec)) + ' 1'}
          />
          <path
            d={'M854 905 Q729 847 ' + (windowX + 8) + ' ' +
              (windowY + windowH - 18) +
              ' L' + (windowX + 8) + ' ' + (windowY + 25) +
              ' Q' + (windowX + 10) + ' ' + (windowY + 6) +
              ' ' + (windowX + 50) + ' ' + (windowY + 5)}
            stroke="#FFB66B" strokeWidth={15 - 7 * windowMorph} fill="none"
            strokeLinecap="round" strokeLinejoin="round"
            opacity={smooth(4.11, 4.39, sec) * (1 - smooth(5.41, 5.93, sec))}
            pathLength={1}
            strokeDasharray={String(smooth(4.21, 5.31, sec)) + ' 1'}
          />
          {/* Speaker push sends a shock into the near edge, with a small
              impact ring that touches the protagonist's actual hand. */}
          <ellipse cx="697" cy="1091" rx={18 + contact * 49}
            ry={14 + contact * 26} fill="none"
            stroke="#FFD5A1" strokeWidth={6 * (1 - contact) + 1}
            opacity={press * 0.74} />
          {/* A few sparks travel toward architectural corners, not over the face. */}
          {[0,1,2].map((i) => {
            const p = smooth(3.45 + i * 0.25, 4.37 + i * 0.31, sec);
            return <circle key={i}
              cx={790 + i * 45 + 8 * Math.sin(sec * 2 + i)}
              cy={1129 - i * 121 - 30 * p}
              r={4 + 4 * p}
              fill="#FFE0AA" opacity={p * (1 - smooth(5.31, 6.10, sec))} />;
          })}
          {/* Passing pole supplies a foreground depth cue, not a flat crossfade. */}
          <path d={'M' + lerp(552, 1115, arrival) + ' -80 L' +
            lerp(552, 1115, arrival) + ' 2010'}
            stroke="#263D3B" strokeWidth="34" opacity={arrival * .78} />
        </svg>
      </div>

      {/* A QA-only overlay; the main proof never contains these boxes. */}
      {showSafeOverlay ? (
        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          <rect x="0" y="0" width="1080" height="300" fill="#D14D4D" fillOpacity=".18" />
          <rect x="900" y="0" width="180" height="1920" fill="#D14D4D" fillOpacity=".17" />
          <rect x="0" y="1620" width="1080" height="300" fill="#D14D4D" fillOpacity=".2" />
          <rect x="72" y="330" width="800" height="1170" fill="none"
            stroke="#47816D" strokeWidth="8" strokeDasharray="20 15" />
          <rect x="72" y="1340" width="800" height="160" fill="none"
            stroke="#E96B3C" strokeWidth="8" strokeDasharray="16 12" />
        </svg>
      ) : null}
      <Audio name="Original four-note music cue (1.0x)" src={originalMotif()} volume={0.82} />
    </AbsoluteFill>
  );
};
