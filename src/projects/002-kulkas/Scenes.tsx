import React from 'react';
import {CanvasImage, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../../brand/tokens';
import {publicAsset} from '../../brand/publicAsset';
import {Character} from './Character';
import {EpisodeSubtitle} from './EpisodeSubtitle';
import {Fridge} from './Fridge';
import {SceneBase} from './SceneBase';
import {voiceText} from './voiceover.config';

const NIGHT_FRIDGE = {left: 548, top: 666, width: 430} as const;
const NIGHT_CHAR = {left: 142, top: 844, width: 385} as const;

const blinkAt = (frame: number, fps: number) => {
  const cycle = frame % Math.round(2.7 * fps);
  return cycle > 2.53 * fps ? 1 : 0;
};

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const DigitalClock: React.FC<{time: string}> = ({time}) => (
  <div
    style={{
      position: 'absolute',
      left: 88,
      top: 205,
      padding: '12px 18px',
      borderRadius: 16,
      border: `3px solid ${brand.colors.ink}`,
      backgroundColor: '#FFFDF8',
      color: brand.colors.orange,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: 62,
      fontWeight: 950,
      letterSpacing: 4,
    }}
  >
    {time}
  </div>
);

const NightSubtitle: React.FC<{text: string; highlight?: string}> = ({text, highlight}) => (
  <EpisodeSubtitle text={text} highlight={highlight} dark={false} />
);

const PaperSubtitle: React.FC<{text: string; highlight?: string}> = ({text, highlight}) => (
  <EpisodeSubtitle text={text} highlight={highlight} dark={false} />
);

const PaperHeader: React.FC<{eyebrow: string; children: React.ReactNode}> = ({eyebrow, children}) => (
  <>
    <div
      style={{
        position: 'absolute',
        left: 88,
        top: 150,
        fontSize: 24,
        fontWeight: 850,
        letterSpacing: 2.2,
        color: brand.colors.orange,
      }}
    >
      {eyebrow}
    </div>
    <div
      style={{
        position: 'absolute',
        left: 88,
        right: 112,
        top: 205,
        fontSize: 78,
        fontWeight: 950,
        lineHeight: 0.98,
        letterSpacing: -3.1,
      }}
    >
      {children}
    </div>
  </>
);

const NightLight: React.FC<{strength: number}> = ({strength}) => (
  <div
    style={{
      position: 'absolute',
      left: 325,
      top: 640,
      width: 730,
      height: 860,
      opacity: strength,
      background:
        'radial-gradient(ellipse at 82% 44%, rgba(255,239,190,.42), rgba(255,239,190,.16) 38%, transparent 69%)',
      clipPath: 'polygon(37% 9%, 100% 0, 100% 100%, 18% 84%)',
      pointerEvents: 'none',
    }}
  />
);

export const MidnightScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const walk = frame / (0.52 * fps);

  return (
    <SceneBase>
      <DigitalClock time="00:13" />
      <Fridge {...NIGHT_FRIDGE} />

      <Character
        expression="sleepy"
        width={375}
        left={interpolate(frame, [0, 3.15 * fps], [-340, 160], {
          ...clamp,
          easing: Easing.bezier(0.22, 1, 0.36, 1),
        })}
        top={858}
        headTilt={7}
        lean={7}
        bob={Math.sin(walk * Math.PI * 2) * 6}
        step={walk}
        scarfSwing={Math.sin(walk * Math.PI * 2) * 7}
        blink={blinkAt(frame, fps)}
      />

      <div
        style={{
          position: 'absolute',
          left: 105,
          top: 1335,
          fontSize: 21,
          fontWeight: 800,
          letterSpacing: 5,
          color: 'rgba(32,37,31,.48)',
          opacity: interpolate(frame, [0.8 * fps, 1.25 * fps], [0, 1], clamp),
        }}
      >
        tap · tap · tap
      </div>

      <NightSubtitle text={voiceText('01-midnight')} />
    </SceneBase>
  );
};

export const ApproachScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const secondBeat = frame >= 1.8 * fps;

  return (
    <SceneBase>
      <DigitalClock time="00:13" />
      <Fridge {...NIGHT_FRIDGE} />

      <Character
        expression={frame < 1.25 * fps ? 'neutral' : 'curious'}
        width={NIGHT_CHAR.width}
        left={NIGHT_CHAR.left}
        top={NIGHT_CHAR.top}
        headTilt={interpolate(
          frame,
          [0.2 * fps, 0.85 * fps, 1.25 * fps, 1.7 * fps],
          [0, -7, 7, -4],
          clamp,
        )}
        rightArm={interpolate(frame, [2.25 * fps, 3.45 * fps], [-10, -70], {
          ...clamp,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}
        blink={blinkAt(frame, fps)}
      />

      <div
        style={{
          position: 'absolute',
          left: 475,
          top: 880,
          width: 74,
          height: 74,
          borderRadius: 999,
          border: `3px solid ${brand.colors.orange}`,
          opacity: interpolate(frame, [1.05 * fps, 1.45 * fps, 2.0 * fps, 2.3 * fps], [0, 1, 1, 0], clamp),
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 490,
          top: 835,
          width: 12,
          height: 34,
          borderRadius: 999,
          backgroundColor: brand.colors.orange,
          rotate: '-22deg',
          opacity: interpolate(frame, [1.05 * fps, 1.45 * fps, 2.0 * fps, 2.3 * fps], [0, 1, 1, 0], clamp),
        }}
      />

      <NightSubtitle text={secondBeat ? voiceText('02-kitchen') : voiceText('02-why')} />
    </SceneBase>
  );
};

export const OpenFridgeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const open = interpolate(frame, [0.5 * fps, 1.75 * fps], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <SceneBase>
      <NightLight strength={open} />
      <Fridge {...NIGHT_FRIDGE} open={open} />
      <Character
        expression={open > 0.72 ? 'surprised' : 'curious'}
        width={395}
        left={138}
        top={845}
        rightArm={-70}
        headTilt={interpolate(frame, [0.55 * fps, 1.8 * fps], [-3, 5], clamp)}
        lean={interpolate(frame, [0.55 * fps, 1.8 * fps], [0, 4], clamp)}
        light={open}
        scarfSwing={open * 5}
      />

      <div
        style={{
          position: 'absolute',
          left: 775,
          top: 600,
          width: 18,
          height: 18,
          borderRadius: 999,
          backgroundColor: '#FFF1B4',
          boxShadow: '0 0 25px rgba(255,241,180,.9)',
          opacity: open,
        }}
      />

      <NightSubtitle
        text={frame < 2.35 * fps ? voiceText('03-open') : voiceText('03-look')}
        highlight={frame < 2.35 * fps ? 'Buka kulkas.' : 'Lihat isinya.'}
      />
    </SceneBase>
  );
};

export const InvestigationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const expression = frame < 1.4 * fps ? 'curious' : frame < 3.0 * fps ? 'thinking' : 'doubtful';
  const mag = interpolate(frame, [1.05 * fps, 1.45 * fps], [0, 1], {
    ...clamp,
    easing: Easing.spring({damping: 160}),
    output: 'perceptual-scale',
  });

  return (
    <SceneBase>
      <NightLight strength={0.95} />
      <Fridge {...NIGHT_FRIDGE} open={1} />
      <Character
        expression={expression}
        width={390}
        left={144}
        top={845}
        headTilt={interpolate(frame, [0, 1.2 * fps, 2.3 * fps, 3.2 * fps], [-5, 7, -8, 3], clamp)}
        lean={interpolate(frame, [0, 2.4 * fps], [0, 7], clamp)}
        rightArm={frame > 1.5 * fps ? -108 : -30}
        light={0.9}
        blink={blinkAt(frame, fps)}
      />

      <div
        style={{
          position: 'absolute',
          left: 565,
          top: 910,
          width: 160,
          height: 160,
          borderRadius: 999,
          border: `8px solid ${brand.colors.ink}`,
          boxShadow: '0 0 0 5px rgba(246,240,229,.82)',
          scale: mag,
          opacity: mag,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 125,
            top: 125,
            width: 105,
            height: 18,
            borderRadius: 999,
            backgroundColor: brand.colors.ink,
            rotate: '45deg',
            transformOrigin: '0% 50%',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 285,
          fontSize: 64,
          fontWeight: 950,
          color: brand.colors.orange,
          letterSpacing: -2.2,
          opacity: interpolate(frame, [2.25 * fps, 2.55 * fps, 3.25 * fps, 3.55 * fps], [0, 1, 1, 0], clamp),
        }}
      >
        DUN…
      </div>

      <NightSubtitle text={frame < 1.55 * fps ? voiceText('04-but') : voiceText('04-know')} />
    </SceneBase>
  );
};

export const CloseFridgeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const close = interpolate(frame, [0.2 * fps, 1.05 * fps], [1, 0], {
    ...clamp,
    easing: Easing.bezier(0.3, 0, 0.6, 1),
  });
  const walk = Math.max(0, frame - 1.0 * fps) / (0.48 * fps);

  return (
    <SceneBase>
      <NightLight strength={close} />
      <Fridge {...NIGHT_FRIDGE} open={close} />
      <Character
        expression="deadpan"
        width={375}
        left={interpolate(frame, [1.0 * fps, 2.75 * fps], [160, -350], {
          ...clamp,
          easing: Easing.bezier(0.22, 1, 0.36, 1),
        })}
        top={858}
        flip
        headTilt={-3}
        bob={frame > 1.0 * fps ? Math.sin(walk * Math.PI * 2) * 5 : 0}
        step={walk}
        scarfSwing={frame > 1.0 * fps ? Math.sin(walk * Math.PI * 2) * 7 : 0}
      />

      <NightSubtitle text={voiceText('05-nothing')} />
    </SceneBase>
  );
};

export const FiveMinutesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cardOut = interpolate(frame, [1.15 * fps, 1.5 * fps], [1, 0], clamp);
  const walk = Math.max(0, frame - 1.35 * fps) / (0.36 * fps);

  return (
    <SceneBase>
      <Fridge {...NIGHT_FRIDGE} />
      <Character
        expression="curious"
        width={375}
        left={interpolate(frame, [1.25 * fps, 3.3 * fps], [-340, 160], {
          ...clamp,
          easing: Easing.bezier(0.22, 1, 0.36, 1),
        })}
        top={1000}
        bob={frame > 1.25 * fps ? Math.sin(walk * Math.PI * 2) * 7 : 0}
        step={walk}
        scarfSwing={frame > 1.25 * fps ? Math.sin(walk * Math.PI * 2) * 10 : 0}
        lean={-4}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          backgroundColor: brand.colors.paper,
          color: brand.colors.ink,
          opacity: cardOut,
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: 820,
            padding: '70px 70px 76px',
            borderTop: `4px solid ${brand.colors.ink}`,
            borderBottom: `4px solid ${brand.colors.ink}`,
            textAlign: 'center',
          }}
        >
          <div style={{fontSize: 26, fontWeight: 850, color: brand.colors.orange, letterSpacing: 4}}>TIME SKIP</div>
          <div style={{fontSize: 108, fontWeight: 950, letterSpacing: -4.5, lineHeight: 0.9, marginTop: 18}}>
            5 MENIT
            <br />
            KEMUDIAN
          </div>
        </div>
      </div>

      <NightSubtitle text={frame < 2.15 * fps ? voiceText('06-five') : voiceText('06-again')} />
    </SceneBase>
  );
};

export const SameAgainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const open = interpolate(frame, [0.25 * fps, 1.2 * fps], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <SceneBase>
      <NightLight strength={open} />
      <Fridge {...NIGHT_FRIDGE} open={open} />
      <Character
        expression="deadpan"
        width={385}
        left={145}
        top={850}
        rightArm={-70}
        headTilt={interpolate(frame, [1.55 * fps, 3.0 * fps], [0, 10], clamp)}
        light={open}
      />

      <div
        style={{
          position: 'absolute',
          left: 88,
          top: 155,
          padding: '12px 18px',
          borderRadius: 999,
          border: `3px solid ${brand.colors.orange}`,
          color: brand.colors.orange,
          fontSize: 24,
          fontWeight: 900,
          letterSpacing: 1.8,
          opacity: interpolate(frame, [1.45 * fps, 1.9 * fps], [0, 1], clamp),
        }}
      >
        SAMA PERSIS.
      </div>
    </SceneBase>
  );
};

export const QuestionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase mode="paper">
      <PaperHeader eyebrow="COBA DIPIKIR">
        Kenapa kita
        <br />
        buka kulkas…
        <br />
        <span style={{color: brand.colors.orange}}>padahal tahu isinya?</span>
      </PaperHeader>

      <div
        style={{
          position: 'absolute',
          left: 88,
          right: 112,
          top: 760,
          height: 500,
          borderTop: `3px solid ${brand.colors.rule}`,
          borderBottom: `3px solid ${brand.colors.rule}`,
        }}
      >
        <Character expression="deadpan" width={260} left={100} top={115} headTilt={7} />
        <Fridge left={505} top={75} width={245} open={1} />
      </div>

      <PaperSubtitle text={voiceText('08-question')} highlight="tahu isinya" />
    </SceneBase>
  );
};

export const NotHungryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase mode="paper">
      <PaperHeader eyebrow="BUKAN SELALU LAPAR">
        Kadang yang
        <br />
        bergerak duluan
        <br />
        <span style={{color: brand.colors.orange}}>bukan perut.</span>
      </PaperHeader>

      <div
        style={{
          position: 'absolute',
          left: 88,
          right: 112,
          top: 700,
          height: 520,
          display: 'grid',
          gridTemplateColumns: '1fr 220px 1fr',
          alignItems: 'center',
          gap: 26,
        }}
      >
        <div
          style={{
            height: 330,
            borderRadius: 34,
            border: `4px solid ${brand.colors.ink}`,
            backgroundColor: '#FFFDF8',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <div style={{textAlign: 'center'}}>
            <div
              style={{
                width: 160,
                height: 92,
                margin: '0 auto 24px',
                border: `5px solid ${brand.colors.ink}`,
                borderTop: 0,
                borderRadius: '0 0 90px 90px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 32,
                  right: 32,
                  top: 18,
                  height: 24,
                  borderRadius: 999,
                  backgroundColor: brand.colors.orange,
                }}
              />
            </div>
            <div style={{fontSize: 25, fontWeight: 900}}>LAPAR</div>
          </div>
        </div>

        <div
          style={{
            gridColumn: 3,
            height: 330,
            borderRadius: 34,
            border: `4px solid ${brand.colors.green}`,
            backgroundColor: '#EAF1EB',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <div style={{textAlign: 'center'}}>
            <div
              style={{
                width: 150,
                height: 112,
                margin: '0 auto 18px',
                borderRadius: '55% 45% 50% 45%',
                border: `5px solid ${brand.colors.ink}`,
                backgroundColor: '#DDE9DE',
                position: 'relative',
              }}
            >
              <div style={{position: 'absolute', left: 40, top: 45, width: 13, height: 13, borderRadius: 999, backgroundColor: brand.colors.ink}} />
              <div style={{position: 'absolute', right: 40, top: 45, width: 13, height: 13, borderRadius: 999, backgroundColor: brand.colors.ink}} />
              <div style={{position: 'absolute', left: 53, top: 78, width: 42, height: 5, borderRadius: 999, backgroundColor: brand.colors.ink}} />
            </div>
            <div style={{fontSize: 25, fontWeight: 900}}>BOSAN</div>
          </div>
        </div>
        <Character
          expression="curious"
          width={235}
          left={360}
          top={106}
          headTilt={-5}
          blink={blinkAt(frame, fps)}
        />
      </div>

      <PaperSubtitle text={voiceText('09-not-hungry')} highlight="nggak selalu" />
    </SceneBase>
  );
};

export const RewardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const secondBeat = frame >= 2.4 * fps;

  return (
    <SceneBase mode="paper">
      <PaperHeader eyebrow="REWARD KECIL">
        Otak lagi cari
        <br />
        sesuatu yang
        <br />
        <span style={{color: brand.colors.orange}}>terasa baru.</span>
      </PaperHeader>

      <Character
        expression={secondBeat ? 'realization' : 'doubtful'}
        width={340}
        left={140}
        top={790}
        headTilt={secondBeat ? -10 : 6}
        blink={blinkAt(frame, fps)}
      />

      <div
        style={{
          position: 'absolute',
          right: 105,
          top: 720,
          width: 430,
          padding: '34px 36px 38px',
          borderRadius: '42px 42px 42px 12px',
          border: `4px solid ${brand.colors.ink}`,
          backgroundColor: '#FFFDF8',
          opacity: interpolate(frame, [0.5 * fps, 1.0 * fps], [0, 1], clamp),
          scale: interpolate(frame, [0.5 * fps, 1.0 * fps], [0.88, 1], {
            ...clamp,
            easing: Easing.spring({damping: 165}),
            output: 'perceptual-scale',
          }),
        }}
      >
        <div style={{fontSize: 38, fontWeight: 880, lineHeight: 1.08}}>
          “ada yang enak
          <br />
          nggak ya?”
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 165,
          top: 1035,
          width: 260,
          height: 230,
          borderRadius: 30,
          border: `4px solid ${brand.colors.green}`,
          backgroundColor: '#EAF1EB',
          opacity: interpolate(frame, [2.2 * fps, 2.7 * fps], [0, 1], clamp),
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 56,
            top: 45,
            width: 150,
            height: 150,
            borderRadius: 26,
            border: `5px solid ${brand.colors.ink}`,
            backgroundColor: '#ECEDE7',
          }}
        />
        <div style={{position: 'absolute', left: 75, top: 86, width: 11, height: 55, borderRadius: 999, backgroundColor: brand.colors.ink}} />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              right: 28 + i * 28,
              top: 35 - i * 10,
              width: 11,
              height: 34,
              borderRadius: 999,
              backgroundColor: brand.colors.orange,
              rotate: `${18 + i * 18}deg`,
            }}
          />
        ))}
      </div>

      <PaperSubtitle
        text={secondBeat ? voiceText('10-reward') : voiceText('10-bored')}
        highlight={secondBeat ? 'hadiah kecil' : 'bosan'}
      />
    </SceneBase>
  );
};

export const HabitLoopScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const beat = frame < 2.8 * fps ? 'habit' : frame < 4.0 * fps ? 'bored' : 'check';

  const points = [
    {x: 170, y: 720},
    {x: 680, y: 720},
    {x: 680, y: 1110},
    {x: 170, y: 1110},
  ];

  const t = Math.min(1, frame / (5 * fps));
  const pos = t * 4;
  const idx = Math.min(3, Math.floor(pos));
  const local = pos - idx;
  const a = points[idx];
  const b = points[(idx + 1) % points.length];

  return (
    <SceneBase mode="paper">
      <PaperHeader eyebrow="HABIT LOOP">
        Lama-lama
        <br />
        tubuhnya
        <br />
        <span style={{color: brand.colors.orange}}>hafal sendiri.</span>
      </PaperHeader>

      <div
        style={{
          position: 'absolute',
          left: 155,
          top: 675,
          width: 770,
          height: 500,
          border: '4px dashed rgba(32,37,31,.22)',
          borderRadius: 190,
        }}
      />

      {[
        ['BOSAN', 135, 635],
        ['BUKA', 745, 635],
        ['CEK', 765, 1125],
        ['TUTUP', 125, 1125],
      ].map(([label, x, y]) => (
        <div
          key={String(label)}
          style={{
            position: 'absolute',
            left: Number(x),
            top: Number(y),
            minWidth: 155,
            padding: '13px 18px',
            borderRadius: 999,
            border: `3px solid ${brand.colors.ink}`,
            backgroundColor: label === 'BUKA' ? '#FFF0EA' : '#FFFDF8',
            color: label === 'BUKA' ? brand.colors.orange : brand.colors.ink,
            textAlign: 'center',
            fontSize: 21,
            fontWeight: 900,
            letterSpacing: 1.4,
          }}
        >
          {label}
        </div>
      ))}

      <Character
        expression={beat === 'check' ? 'curious' : 'neutral'}
        width={175}
        left={a.x + (b.x - a.x) * local}
        top={a.y + (b.y - a.y) * local}
        headTilt={beat === 'check' ? -7 : 0}
        bob={Math.sin(frame / 4) * 3}
        step={frame / 8}
        scarfSwing={Math.sin(frame / 6) * 7}
      />

      <PaperSubtitle
        text={
          beat === 'habit'
            ? voiceText('11-habit')
            : beat === 'bored'
              ? voiceText('11-bored')
              : voiceText('11-check')
        }
        highlight={beat === 'check' ? 'cek kulkas' : beat === 'bored' ? 'Bosan' : 'kebiasaan'}
      />
    </SceneBase>
  );
};

export const EndingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const beat = frame < 1.4 * fps ? 'maybe' : frame < 3.2 * fps ? 'not-food' : 'something';
  const reopen = interpolate(frame, [4.75 * fps, 5.32 * fps], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <SceneBase>
      <NightLight strength={reopen} />
      <Fridge {...NIGHT_FRIDGE} open={reopen} />

      <Character
        expression={frame < 2.4 * fps ? 'thinking' : frame < 4.55 * fps ? 'realization' : 'deadpan'}
        width={385}
        left={145}
        top={850}
        rightArm={interpolate(frame, [0, 1.4 * fps, 3.05 * fps, 4.3 * fps], [-70, -70, -18, -70], clamp)}
        headTilt={interpolate(frame, [0, 1.45 * fps, 2.8 * fps, 4.3 * fps], [4, -7, 6, -3], clamp)}
        light={reopen}
        blink={blinkAt(frame, fps)}
      />

      <div
        style={{
          position: 'absolute',
          left: 88,
          top: 155,
          width: 470,
          fontSize: 24,
          fontWeight: 850,
          letterSpacing: 2.2,
          color: 'rgba(32,37,31,.52)',
          opacity: interpolate(frame, [0.2 * fps, 0.65 * fps], [0, 1], clamp),
        }}
      >
        TANGAN SUDAH DI HANDLE.
      </div>

      {frame > 5.15 * fps ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 6,
            display: 'grid',
            placeItems: 'center',
            backgroundColor: brand.colors.paper,
            color: brand.colors.ink,
            opacity: interpolate(frame, [5.15 * fps, 5.65 * fps], [0, 1], clamp),
          }}
        >
          <div style={{textAlign: 'center'}}>
            <CanvasImage
              src={publicAsset('brand/coba-dipikir-logo.webp')}
              style={{
                width: 190,
                height: 190,
                objectFit: 'contain',
                margin: '0 auto 34px',
              }}
            />
            <div style={{fontSize: 82, fontWeight: 950, letterSpacing: -3.3}}>COBA DIPIKIR.</div>
            <div style={{fontSize: 27, fontWeight: 760, color: brand.colors.muted, marginTop: 16}}>
              Yang biasa, belum tentu sederhana.
            </div>
          </div>
        </div>
      ) : null}

      {frame <= 5.15 * fps ? (
        <NightSubtitle
          text={
            beat === 'maybe'
              ? voiceText('12-maybe')
              : beat === 'not-food'
                ? voiceText('12-not-food')
                : voiceText('12-something')
          }
          highlight={beat === 'not-food' ? 'bukan makanan' : beat === 'something' ? 'menemukan sesuatu' : undefined}
        />
      ) : null}
    </SceneBase>
  );
};
