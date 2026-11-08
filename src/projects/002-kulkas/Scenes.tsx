import React from 'react';
import {CanvasImage, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../../brand/tokens';
import {publicAsset} from '../../brand/publicAsset';
import {Character} from './Character';
import {EpisodeSubtitle} from './EpisodeSubtitle';
import {Fridge} from './Fridge';
import {SceneBase} from './SceneBase';
import {voiceText} from './voiceover.config';

const blinkAt = (frame: number, fps: number) => {
  const cycle = frame % Math.round(2.6 * fps);
  return cycle > 2.46 * fps ? 1 : 0;
};

const DigitalClock: React.FC<{time: string; top?: number}> = ({time, top = 145}) => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top,
      translate: '-50% 0px',
      padding: '14px 24px',
      borderRadius: 18,
      border: '2px solid rgba(246,240,229,.18)',
      backgroundColor: 'rgba(0,0,0,.32)',
      color: '#F8B45A',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: 40,
      fontWeight: 800,
      letterSpacing: 5,
      boxShadow: '0 0 24px rgba(248,180,90,.08)',
    }}
  >
    {time}
  </div>
);

const NightCaption: React.FC<{text: string; highlight?: string}> = ({text, highlight}) => (
  <EpisodeSubtitle text={text} highlight={highlight} dark />
);

const PaperCaption: React.FC<{text: string; highlight?: string}> = ({text, highlight}) => (
  <EpisodeSubtitle text={text} highlight={highlight} dark={false} />
);

export const MidnightScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const walk = frame / (0.55 * fps);

  return (
    <SceneBase>
      <DigitalClock time="00:13" />

      <div
        style={{
          position: 'absolute',
          right: 78,
          top: 275,
          fontSize: 18,
          fontWeight: 800,
          color: 'rgba(246,240,229,.34)',
          letterSpacing: 2,
        }}
      >
        DAPUR · MALAM
      </div>

      <Fridge left={610} top={390} width={370} />

      <Character
        expression="sleepy"
        width={310}
        left={interpolate(frame, [0, 3.2 * fps], [-180, 250], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.22, 1, 0.36, 1),
        })}
        top={980}
        headTilt={8}
        lean={7}
        bob={Math.sin(walk * Math.PI * 2) * 7}
        step={walk}
        scarfSwing={Math.sin(walk * Math.PI * 2) * 8}
        blink={blinkAt(frame, fps)}
      />

      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 1280,
          fontSize: 24,
          fontWeight: 800,
          color: 'rgba(246,240,229,.32)',
          letterSpacing: 5,
          opacity: interpolate(frame, [0.8 * fps, 1.2 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        tap… tap… tap…
      </div>

      <NightCaption text={voiceText('01-midnight')} />
    </SceneBase>
  );
};

export const ApproachScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const secondBeat = frame >= 1.8 * fps;

  return (
    <SceneBase>
      <Fridge left={615} top={385} width={365} />
      <Character
        expression={frame < 1.2 * fps ? 'neutral' : 'curious'}
        width={330}
        left={240}
        top={980}
        headTilt={interpolate(frame, [0.2 * fps, 0.8 * fps, 1.15 * fps, 1.55 * fps], [0, -9, 8, -5], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
        rightArm={interpolate(frame, [2.2 * fps, 3.5 * fps], [-10, -72], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}
        scarfSwing={2}
        blink={blinkAt(frame, fps)}
      />

      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 285,
          maxWidth: 520,
          color: 'rgba(246,240,229,.8)',
          fontSize: 64,
          fontWeight: 950,
          lineHeight: 0.97,
          letterSpacing: -2.5,
          opacity: interpolate(frame, [0.2 * fps, 0.7 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Tatap kulkas.
        <br />
        <span style={{color: brand.colors.orange}}>Tatap kamera.</span>
        <br />
        Tatap kulkas lagi.
      </div>

      <NightCaption text={secondBeat ? voiceText('02-kitchen') : voiceText('02-why')} />
    </SceneBase>
  );
};

export const OpenFridgeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const open = interpolate(frame, [0.45 * fps, 1.75 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <SceneBase>
      <div
        style={{
          position: 'absolute',
          left: 450,
          top: 420,
          width: 620,
          height: 780,
          background: 'radial-gradient(ellipse at 80% 48%, rgba(255,236,176,.42), rgba(255,236,176,.15) 38%, transparent 68%)',
          opacity: open,
          clipPath: 'polygon(45% 10%, 100% 0, 100% 100%, 22% 84%)',
        }}
      />

      <Fridge left={610} top={370} width={380} open={open} />

      <Character
        expression={open > 0.72 ? 'surprised' : 'curious'}
        width={350}
        left={218}
        top={960}
        rightArm={-76}
        headTilt={interpolate(frame, [0.6 * fps, 1.8 * fps], [-3, 5], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
        lean={interpolate(frame, [0.6 * fps, 1.8 * fps], [0, 4], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
        light={open}
        scarfSwing={open * 6}
        blink={0}
      />

      <div
        style={{
          position: 'absolute',
          left: 82,
          top: 245,
          fontSize: 24,
          fontWeight: 850,
          letterSpacing: 3,
          color: 'rgba(246,240,229,.45)',
        }}
      >
        VISUAL REVEAL YANG SANGAT DRAMATIS
      </div>

      <NightCaption
        text={frame < 2.35 * fps ? voiceText('03-open') : voiceText('03-look')}
        highlight={frame < 2.35 * fps ? 'Buka kulkas.' : 'Lihat isinya.'}
      />
    </SceneBase>
  );
};

export const InvestigationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const expression = frame < 1.5 * fps ? 'curious' : frame < 3.2 * fps ? 'thinking' : 'doubtful';

  return (
    <SceneBase>
      <Fridge left={605} top={360} width={385} open={1} />

      <Character
        expression={expression}
        width={360}
        left={205}
        top={960}
        headTilt={interpolate(frame, [0, 1.1 * fps, 2.2 * fps, 3.2 * fps], [-6, 8, -9, 4], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
        lean={interpolate(frame, [0, 2.6 * fps], [0, 8], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
        rightArm={frame > 1.7 * fps ? -116 : -34}
        light={0.9}
        blink={blinkAt(frame, fps)}
      />

      <div
        style={{
          position: 'absolute',
          left: interpolate(frame, [1.4 * fps, 3.2 * fps], [530, 740], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          top: interpolate(frame, [1.4 * fps, 3.2 * fps], [720, 905], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          width: 145,
          height: 145,
          borderRadius: 999,
          border: `8px solid ${brand.colors.ink}`,
          boxShadow: '0 0 0 5px rgba(246,240,229,.7)',
          opacity: interpolate(frame, [1.15 * fps, 1.55 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 112,
            top: 112,
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
          left: 420,
          right: 100,
          top: 250,
          textAlign: 'right',
          fontSize: 82,
          fontWeight: 950,
          letterSpacing: -3.2,
          lineHeight: 0.94,
          color: brand.colors.orange,
          opacity: interpolate(frame, [2.1 * fps, 2.45 * fps, 3.2 * fps, 3.55 * fps], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [2.1 * fps, 2.45 * fps], [0.82, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.spring({damping: 145}),
            output: 'perceptual-scale',
          }),
        }}
      >
        DUNNN…
      </div>

      <div
        style={{
          position: 'absolute',
          right: 94,
          top: 1180,
          padding: '16px 22px',
          borderRadius: 20,
          border: '2px solid rgba(246,240,229,.18)',
          backgroundColor: 'rgba(0,0,0,.3)',
          fontSize: 24,
          fontWeight: 820,
          color: 'rgba(246,240,229,.72)',
          opacity: interpolate(frame, [3.35 * fps, 3.8 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        plot twist: wadah kemarin.
      </div>

      <NightCaption text={frame < 1.55 * fps ? voiceText('04-but') : voiceText('04-know')} />
    </SceneBase>
  );
};

export const CloseFridgeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const close = interpolate(frame, [0.2 * fps, 1.1 * fps], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.3, 0, 0.6, 1),
  });
  const walk = Math.max(0, frame - 1.1 * fps) / (0.5 * fps);

  return (
    <SceneBase>
      <Fridge left={610} top={380} width={375} open={close} />
      <Character
        expression="deadpan"
        width={330}
        left={interpolate(frame, [1.05 * fps, 2.7 * fps], [235, -180], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.22, 1, 0.36, 1),
        })}
        top={995}
        flip
        headTilt={-3}
        bob={frame > 1.05 * fps ? Math.sin(walk * Math.PI * 2) * 6 : 0}
        step={walk}
        scarfSwing={frame > 1.05 * fps ? Math.sin(walk * Math.PI * 2) * 8 : 0}
      />

      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 330,
          fontSize: 74,
          fontWeight: 950,
          letterSpacing: -3,
          lineHeight: 0.95,
          color: 'rgba(246,240,229,.72)',
          opacity: interpolate(frame, [0.1 * fps, 0.55 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        yaudah.
      </div>

      <NightCaption text={voiceText('05-nothing')} />
    </SceneBase>
  );
};

export const FiveMinutesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cardOut = interpolate(frame, [1.2 * fps, 1.55 * fps], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const walk = Math.max(0, frame - 1.3 * fps) / (0.38 * fps);

  return (
    <SceneBase>
      <Fridge left={610} top={380} width={375} />
      <Character
        expression="curious"
        width={325}
        left={interpolate(frame, [1.25 * fps, 3.3 * fps], [-160, 250], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.22, 1, 0.36, 1),
        })}
        top={995}
        bob={frame > 1.25 * fps ? Math.sin(walk * Math.PI * 2) * 8 : 0}
        step={walk}
        scarfSwing={frame > 1.25 * fps ? Math.sin(walk * Math.PI * 2) * 12 : 0}
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
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: 28, fontWeight: 850, color: brand.colors.orange, letterSpacing: 4}}>HARD CUT</div>
          <div style={{fontSize: 112, fontWeight: 950, letterSpacing: -5, lineHeight: 0.9, marginTop: 18}}>
            5 MENIT
            <br />
            KEMUDIAN
          </div>
        </div>
      </div>

      <NightCaption text={frame < 2.15 * fps ? voiceText('06-five') : voiceText('06-again')} />
    </SceneBase>
  );
};

export const SameAgainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const open = interpolate(frame, [0.25 * fps, 1.25 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <SceneBase>
      <div
        style={{
          position: 'absolute',
          left: 450,
          top: 420,
          width: 620,
          height: 780,
          background: 'radial-gradient(ellipse at 80% 48%, rgba(255,236,176,.42), rgba(255,236,176,.15) 38%, transparent 68%)',
          opacity: open,
          clipPath: 'polygon(45% 10%, 100% 0, 100% 100%, 22% 84%)',
        }}
      />

      <Fridge left={610} top={370} width={380} open={open} />
      <Character
        expression="deadpan"
        width={350}
        left={218}
        top={960}
        rightArm={-76}
        headTilt={interpolate(frame, [1.5 * fps, 3.1 * fps], [0, 11], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
        light={open}
        blink={frame > 2.1 * fps ? 0 : blinkAt(frame, fps)}
      />

      <div
        style={{
          position: 'absolute',
          left: 92,
          top: 290,
          padding: '18px 24px',
          borderRadius: 999,
          border: `3px solid ${brand.colors.orange}`,
          color: brand.colors.orange,
          fontSize: 28,
          fontWeight: 900,
          letterSpacing: 2,
          opacity: interpolate(frame, [1.5 * fps, 2.0 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        SAMA. PERSIS.
      </div>

      <div
        style={{
          position: 'absolute',
          left: 100,
          right: 100,
          bottom: 290,
          textAlign: 'center',
          color: 'rgba(246,240,229,.45)',
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: 5,
          opacity: interpolate(frame, [2.0 * fps, 2.4 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        bzzzzzzzz…
      </div>
    </SceneBase>
  );
};

export const QuestionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase mode="paper">
      <div
        style={{
          position: 'absolute',
          left: 92,
          right: 92,
          top: 245,
          fontSize: 102,
          fontWeight: 950,
          lineHeight: 0.92,
          letterSpacing: -4.3,
          opacity: interpolate(frame, [0.15 * fps, 0.7 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [0.15 * fps, 0.7 * fps], ['0px 46px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Kenapa kita
        <br />
        buka kulkas…
        <br />
        <span style={{color: brand.colors.orange}}>padahal tahu isinya?</span>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 95,
          right: 95,
          top: 830,
          height: 420,
          borderTop: `3px solid ${brand.colors.rule}`,
          borderBottom: `3px solid ${brand.colors.rule}`,
        }}
      >
        <Character expression="deadpan" width={260} left={110} top={70} headTilt={8} />
        <Fridge left={500} top={55} width={260} open={1} />
      </div>

      <PaperCaption text={voiceText('08-question')} highlight="tahu isinya" />
    </SceneBase>
  );
};

export const NotHungryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneBase mode="paper">
      <div style={{position: 'absolute', left: 92, right: 92, top: 175, fontSize: 82, fontWeight: 950, lineHeight: 0.98, letterSpacing: -3.2}}>
        Bukan selalu
        <br />
        karena <span style={{color: brand.colors.orange}}>lapar.</span>
      </div>

      <Character expression="curious" width={340} left={360} top={720} headTilt={-5} blink={blinkAt(frame, fps)} />

      <div
        style={{
          position: 'absolute',
          left: 100,
          top: 650,
          width: 265,
          height: 220,
          borderRadius: 42,
          border: `4px solid ${brand.colors.ink}`,
          backgroundColor: '#FFFDF8',
          opacity: interpolate(frame, [0.5 * fps, 1.0 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        <div style={{position: 'absolute', left: 48, right: 48, bottom: 52, height: 68, border: `5px solid ${brand.colors.ink}`, borderTop: 0, borderRadius: '0 0 60px 60px'}} />
        <div style={{position: 'absolute', left: 78, top: 62, width: 105, height: 35, borderRadius: 999, backgroundColor: brand.colors.orange}} />
      </div>

      <div
        style={{
          position: 'absolute',
          right: 100,
          top: 650,
          width: 265,
          height: 220,
          borderRadius: 42,
          border: `4px solid ${brand.colors.ink}`,
          backgroundColor: '#FFFDF8',
          opacity: interpolate(frame, [0.8 * fps, 1.3 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        <div style={{position: 'absolute', left: 70, top: 55, width: 125, height: 90, borderRadius: '55% 45% 50% 45%', border: `5px solid ${brand.colors.ink}`, backgroundColor: '#E7F0E9'}} />
        <div style={{position: 'absolute', left: 98, top: 92, width: 12, height: 12, borderRadius: 999, backgroundColor: brand.colors.ink}} />
        <div style={{position: 'absolute', right: 98, top: 92, width: 12, height: 12, borderRadius: 999, backgroundColor: brand.colors.ink}} />
        <div style={{position: 'absolute', left: 110, top: 122, width: 42, height: 5, borderRadius: 999, backgroundColor: brand.colors.ink}} />
      </div>

      <PaperCaption text={voiceText('09-not-hungry')} highlight="nggak selalu" />
    </SceneBase>
  );
};

export const RewardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const secondBeat = frame >= 2.4 * fps;

  return (
    <SceneBase mode="paper">
      <div style={{position: 'absolute', left: 92, right: 92, top: 175, fontSize: 80, fontWeight: 950, lineHeight: 0.98, letterSpacing: -3.1}}>
        Otak lagi cari
        <br />
        <span style={{color: brand.colors.orange}}>reward kecil.</span>
      </div>

      <Character
        expression={secondBeat ? 'realization' : 'doubtful'}
        width={350}
        left={180}
        top={760}
        headTilt={secondBeat ? -11 : 6}
        blink={blinkAt(frame, fps)}
      />

      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 620,
          width: 380,
          minHeight: 190,
          padding: '34px 36px',
          borderRadius: '48px 48px 48px 12px',
          border: `4px solid ${brand.colors.ink}`,
          backgroundColor: '#FFFDF8',
          opacity: interpolate(frame, [0.55 * fps, 1.05 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          scale: interpolate(frame, [0.55 * fps, 1.05 * fps], [0.86, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.spring({damping: 165}),
            output: 'perceptual-scale',
          }),
        }}
      >
        <div style={{fontSize: 37, fontWeight: 880, lineHeight: 1.08}}>
          “ada yang enak
          <br />
          nggak ya?”
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 128,
          top: 920,
          width: 280,
          height: 300,
          borderRadius: 34,
          backgroundColor: '#E7F0E9',
          border: `4px solid ${brand.colors.green}`,
          opacity: interpolate(frame, [2.2 * fps, 2.75 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        <div style={{position: 'absolute', left: 54, top: 58, width: 170, height: 180, borderRadius: 24, border: `5px solid ${brand.colors.ink}`, backgroundColor: '#ECEDE7'}} />
        <div style={{position: 'absolute', right: 66, top: 94, width: 12, height: 64, borderRadius: 999, backgroundColor: brand.colors.ink}} />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{position: 'absolute', right: 18 + i * 28, top: 42 - i * 13, width: 12, height: 38, borderRadius: 999, backgroundColor: brand.colors.orange, rotate: `${18 + i * 18}deg`}} />
        ))}
      </div>

      <PaperCaption text={secondBeat ? voiceText('10-reward') : voiceText('10-bored')} highlight={secondBeat ? 'hadiah kecil' : 'bosan'} />
    </SceneBase>
  );
};

export const HabitLoopScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = Math.min(1, frame / (5 * fps));
  const points = [
    {x: 200, y: 540},
    {x: 690, y: 540},
    {x: 690, y: 1030},
    {x: 200, y: 1030},
  ];
  const loopPos = t * 4;
  const idx = Math.min(3, Math.floor(loopPos));
  const local = loopPos - idx;
  const a = points[idx];
  const b = points[(idx + 1) % points.length];
  const charX = a.x + (b.x - a.x) * local;
  const charY = a.y + (b.y - a.y) * local;

  const beat = frame < 2.8 * fps ? 'habit' : frame < 4.0 * fps ? 'bored' : 'check';

  return (
    <SceneBase mode="paper">
      <div style={{position: 'absolute', left: 92, right: 92, top: 170, fontSize: 80, fontWeight: 950, lineHeight: 0.98, letterSpacing: -3}}>
        Lama-lama jadi
        <br />
        <span style={{color: brand.colors.orange}}>habit loop.</span>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 145,
          top: 485,
          width: 790,
          height: 640,
          border: `4px dashed rgba(32,37,31,.28)`,
          borderRadius: 210,
        }}
      />

      {[
        ['BOSAN', 155, 445],
        ['BUKA', 735, 445],
        ['CEK', 760, 1060],
        ['TUTUP', 145, 1060],
      ].map(([label, x, y]) => (
        <div
          key={String(label)}
          style={{
            position: 'absolute',
            left: Number(x),
            top: Number(y),
            minWidth: 150,
            padding: '14px 18px',
            borderRadius: 999,
            border: `3px solid ${brand.colors.ink}`,
            backgroundColor: label === 'BUKA' ? '#FFF0EA' : '#FFFDF8',
            color: label === 'BUKA' ? brand.colors.orange : brand.colors.ink,
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 1.5,
          }}
        >
          {label}
        </div>
      ))}

      <Character
        expression={beat === 'check' ? 'curious' : 'neutral'}
        width={180}
        left={charX}
        top={charY}
        headTilt={beat === 'check' ? -8 : 0}
        bob={Math.sin(frame / 4) * 4}
        step={frame / 8}
        scarfSwing={Math.sin(frame / 6) * 8}
      />

      <PaperCaption
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
  const reopen = interpolate(frame, [4.75 * fps, 5.35 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <SceneBase>
      <Fridge left={610} top={385} width={375} open={reopen} />

      <Character
        expression={frame < 2.5 * fps ? 'thinking' : frame < 4.6 * fps ? 'realization' : 'deadpan'}
        width={335}
        left={245}
        top={985}
        rightArm={interpolate(frame, [0, 1.5 * fps, 3.1 * fps, 4.3 * fps], [-72, -72, -20, -72], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
        headTilt={interpolate(frame, [0, 1.5 * fps, 2.8 * fps, 4.3 * fps], [4, -8, 6, -3], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
        light={reopen}
        blink={blinkAt(frame, fps)}
      />

      <div
        style={{
          position: 'absolute',
          left: 88,
          right: 112,
          top: 215,
          fontSize: 72,
          fontWeight: 950,
          lineHeight: 0.96,
          letterSpacing: -2.8,
          color: 'rgba(246,240,229,.9)',
          opacity: interpolate(frame, [0.2 * fps, 0.65 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Tangan sudah
        <br />
        di handle.
        <br />
        <span style={{color: brand.colors.orange}}>Terus berhenti.</span>
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
            opacity: interpolate(frame, [5.15 * fps, 5.65 * fps], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div style={{textAlign: 'center'}}>
            <CanvasImage
              src={publicAsset('brand/coba-dipikir-logo.webp')}
              style={{width: 210, height: 210, objectFit: 'contain', margin: '0 auto 34px'}}
            />
            <div style={{fontSize: 86, fontWeight: 950, letterSpacing: -3.5}}>COBA DIPIKIR.</div>
            <div style={{fontSize: 28, fontWeight: 760, color: brand.colors.muted, marginTop: 18}}>
              Yang biasa, belum tentu sederhana.
            </div>
          </div>
        </div>
      ) : null}

      {frame <= 5.15 * fps ? (
        <NightCaption
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
