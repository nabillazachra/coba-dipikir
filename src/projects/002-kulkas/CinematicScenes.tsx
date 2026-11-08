import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig, CanvasImage} from 'remotion';
import {brand} from '../../brand/tokens';
import {publicAsset} from '../../brand/publicAsset';
import {Character, type CharacterExpression} from './Character';
import {Fridge} from './Fridge';
import {EpisodeSubtitle} from './EpisodeSubtitle';
import {voiceText, type VoiceoverSceneId} from './voiceover.config';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const motion = (frame: number, times: number[], values: number[]) =>
  interpolate(frame, times, values, clamp);
const secs = (fps: number, ...values: number[]) => values.map((v) => v * fps);

const Caption: React.FC<{id: VoiceoverSceneId; accent?: string; dark?: boolean}> = ({
  id, accent, dark = true,
}) => <EpisodeSubtitle text={voiceText(id)} highlight={accent} dark={dark} />;

type SetProps = {
  open?: number;
  clock?: string;
  heroX?: number;
  heroY?: number;
  heroWidth?: number;
  expression?: CharacterExpression;
  tilt?: number;
  lean?: number;
  eyeBlink?: number;
  step?: number;
  arm?: number;
  scarf?: number;
  heroOpacity?: number;
  cameraScale?: number;
  cameraX?: number;
  cameraY?: number;
  showHero?: boolean;
};

const NightSet: React.FC<SetProps> = ({
  open = 0,
  clock,
  heroX = 120,
  heroY = 795,
  heroWidth = 480,
  expression = 'neutral',
  tilt = 0,
  lean = 0,
  eyeBlink = 0,
  step = 0,
  arm = -12,
  scarf = 0,
  heroOpacity = 1,
  cameraScale = 1,
  cameraX = 0,
  cameraY = 0,
  showHero = true,
}) => (
  <div style={{
    position: 'absolute', inset: 0, overflow: 'hidden',
    transform: 'translate(' + cameraX + 'px,' + cameraY + 'px) scale(' + cameraScale + ')',
    transformOrigin: '50% 60%',
  }}>
    <AbsoluteFill style={{
      background: 'linear-gradient(180deg,#2B3435 0%,#4A4841 30%,#685244 62%,#2A2927 100%)',
    }} />

    {/* The room is a continuous illustrated environment rather than a card. */}
    <div style={{
      position: 'absolute', left: 0, top: 0, width: 1080, height: 1420,
      background: 'radial-gradient(ellipse at 76% 70%,rgba(241,152,78,.27),transparent 55%)',
    }} />
    <div style={{
      position: 'absolute', left: 68, top: 245, width: 475, height: 516,
      border: '17px solid #262824', borderRadius: 16,
      background: 'linear-gradient(180deg,#172431,#263D50 58%,#C6775E 100%)',
      boxShadow: 'inset 0 0 0 7px #604C42, 17px 20px 0 rgba(0,0,0,.10)',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: 98, top: 70, width: 90, height: 90,
        backgroundColor: '#E9D3A7', borderRadius: '50%',
        boxShadow: '0 0 65px rgba(233,211,167,.26)',
      }} />
      {[0,1,2,3,4].map((i) => (
        <div key={i} style={{
          position: 'absolute', left: 45 + i * 78, bottom: 0,
          width: 90, height: 130 + (i % 3) * 54,
          backgroundColor: '#1B2A2D',
          clipPath: 'polygon(15% 30%,55% 0,100% 34%,100% 100%,0 100%)',
        }} />
      ))}
      <div style={{position: 'absolute', left: '50%', top: 0, bottom: 0, width: 12, backgroundColor: '#262824'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: '50%', height: 12, backgroundColor: '#262824'}} />
    </div>
    <div style={{
      position: 'absolute', left: 40, top: 225, height: 560, width: 78,
      background: 'linear-gradient(90deg,#46332F,#65473E)',
      borderRadius: '0 16px 22px 0', boxShadow: '17px 0 19px rgba(0,0,0,.13)',
    }} />
    <div style={{
      position: 'absolute', left: 512, top: 225, height: 560, width: 64,
      background: 'linear-gradient(90deg,#604039,#3B2A29)',
      borderRadius: '14px 0 0 22px', boxShadow: '-12px 0 20px rgba(0,0,0,.14)',
    }} />

    <div style={{position: 'absolute', left: 647, top: 315, width: 300, height: 18, backgroundColor: '#2C2B27', borderRadius: 8}} />
    <div style={{position: 'absolute', left: 665, top: 255, width: 58, height: 60, backgroundColor: '#C9AD8D', border: '5px solid #34312A', borderRadius: '8px 8px 4px 4px'}} />
    <div style={{position: 'absolute', left: 775, top: 220, width: 79, height: 93, backgroundColor: '#D8C4A4', border: '5px solid #34312A', borderRadius: '15px 15px 6px 6px'}} />
    <div style={{position: 'absolute', left: 875, top: 261, width: 37, height: 52, backgroundColor: '#E96B3C', border: '5px solid #34312A', borderRadius: '15px 15px 7px 7px'}} />
    <div style={{position: 'absolute', left: 632, top: 350, height: 30, width: 350, backgroundColor: 'rgba(0,0,0,.13)', filter: 'blur(20px)'}} />

    <div style={{position: 'absolute', left: 0, top: 1358, width: 1080, height: 32, backgroundColor: '#2D2825'}} />
    <div style={{position: 'absolute', left: 0, top: 1390, width: 1080, height: 530,
      background: 'linear-gradient(180deg,#4A4038 0%,#262727 100%)',
    }} />
    <div style={{position: 'absolute', left: 0, top: 1450, width: 1080, height: 4, backgroundColor: 'rgba(249,232,197,.09)'}} />
    <div style={{position: 'absolute', left: 0, top: 1580, width: 1080, height: 3, backgroundColor: 'rgba(249,232,197,.06)'}} />

    <div style={{position: 'absolute', left: 30, top: 1090, width: 135, height: 270,
      background: '#54463B', border: '8px solid #302C26', borderRadius: '16px 16px 0 0',
    }}>
      <div style={{position: 'absolute', top: 35, left: 40, width: 10, height: 60, background: '#292A28', borderRadius: 9}} />
      <div style={{position: 'absolute', top: 35, right: 40, width: 10, height: 60, background: '#292A28', borderRadius: 9}} />
    </div>

    <div style={{
      position: 'absolute', left: 300, top: 725, width: 720, height: 830,
      background: 'radial-gradient(ellipse at 72% 60%,rgba(255,229,162,.65),rgba(255,203,111,.26) 36%,transparent 73%)',
      opacity: open,
      clipPath: 'polygon(56% 9%,100% 1%,100% 100%,0 91%)',
      filter: 'blur(8px)',
      pointerEvents: 'none',
    }} />

    <div style={{position: 'absolute', left: 618, top: 1398, width: 380, height: 44,
      borderRadius: '50%', background: 'rgba(14,16,16,.38)', filter: 'blur(17px)',
    }} />
    <Fridge left={600} top={750} width={430} open={open} />

    {showHero ? <Character
      width={heroWidth}
      left={heroX}
      top={heroY}
      expression={expression}
      headTilt={tilt}
      lean={lean}
      blink={eyeBlink}
      step={step}
      rightArm={arm}
      scarfSwing={scarf}
      light={open}
      opacity={heroOpacity}
    /> : null}

    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at 50% 50%,transparent 35%,rgba(10,16,19,.46) 100%)',
      pointerEvents: 'none',
    }} />

    {clock ? (
      <div style={{
        position: 'absolute', left: 98, top: 105,
        fontSize: 58, fontWeight: 950, letterSpacing: 5,
        color: '#FFC486', fontFamily: 'ui-monospace, monospace',
        textShadow: '0 0 24px rgba(233,107,60,.30)',
      }}>
        {clock}
      </div>
    ) : null}
  </div>
);

type PaperSetProps = Omit<SetProps, 'clock'> & {showFridge?: boolean};
const PaperSet: React.FC<PaperSetProps> = ({
  open = 0,
  heroX = 130,
  heroY = 790,
  heroWidth = 505,
  expression = 'curious',
  tilt = 0,
  lean = 0,
  eyeBlink = 0,
  step = 0,
  arm = -12,
  scarf = 0,
  heroOpacity = 1,
  showHero = true,
  showFridge = true,
  cameraScale = 1,
  cameraX = 0,
  cameraY = 0,
}) => (
  <div style={{
    position: 'absolute', inset: 0, overflow: 'hidden',
    transform: 'translate(' + cameraX + 'px,' + cameraY + 'px) scale(' + cameraScale + ')',
    transformOrigin: '50% 60%',
  }}>
    <AbsoluteFill style={{
      background: 'radial-gradient(ellipse at 72% 47%,#FDF9F0 0%,#F6F0E5 74%)',
    }} />
    <div style={{position: 'absolute', left: -120, top: 470, width: 650, height: 650,
      borderRadius: '50%', background: '#F1E4D2'}} />
    <div style={{position: 'absolute', right: -130, top: 340, width: 580, height: 620,
      borderRadius: '50%', background: 'rgba(233,107,60,.065)'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 1390, height: 530,
      background: 'linear-gradient(180deg,#E5D9C8,#D7C7B5)'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 1380, height: 11,
      background: '#B9A994'}} />
    {showFridge ? <Fridge left={608} top={754} width={422} open={open} /> : null}
    {showHero ? <Character
      left={heroX}
      top={heroY}
      width={heroWidth}
      expression={expression}
      headTilt={tilt}
      lean={lean}
      rightArm={arm}
      step={step}
      blink={eyeBlink}
      scarfSwing={scarf}
      light={open}
      opacity={heroOpacity}
    /> : null}
  </div>
);

const Night: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{overflow: 'hidden', backgroundColor: '#2B3435',
    color: brand.colors.paper, fontFamily: brand.fontFamily,
  }}>{children}</AbsoluteFill>
);
const Paper: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{overflow: 'hidden', backgroundColor: brand.colors.paper,
    color: brand.colors.ink, fontFamily: brand.fontFamily,
  }}>{children}</AbsoluteFill>
);

export const MidnightScene: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const step = f / (0.54 * fps);
  return <Night>
    <NightSet clock="00:13" heroX={motion(f, secs(fps,0,3.25), [-350,140])}
      heroY={825 + Math.sin(step * Math.PI * 2) * 8}
      heroWidth={460} expression="sleepy" lean={7} tilt={8} step={step}
      scarf={Math.sin(step * Math.PI * 2) * 9}
      eyeBlink={f > 2.4*fps && f < 2.55*fps ? 1 : 0} />
    <Caption id="01-midnight" />
  </Night>;
};

export const ApproachScene: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const tilt = motion(f, secs(fps,0,.8,1.5,2.4,3.4), [-6,9,-9,7,-4]);
  const arm = motion(f, secs(fps,0,2.3,3.75), [-15,-15,66]);
  return <Night>
    <NightSet heroX={170} heroY={715} heroWidth={535}
      expression={f > 1.15*fps ? 'curious' : 'neutral'}
      tilt={tilt} arm={arm} scarf={Math.sin(f/12)*3}
      eyeBlink={f > 1.7*fps && f < 1.82*fps ? 1 : 0}
      cameraScale={1.06} cameraX={-22} />
    <Caption id={f < 1.8*fps ? '02-why' : '02-kitchen'} />
  </Night>;
};

export const OpenFridgeScene: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const open = interpolate(f, secs(fps,.48,1.82), [0,1], {
    ...clamp, easing: Easing.bezier(.22,1,.36,1),
  });
  const cam = motion(f, secs(fps,0,4.8), [1.02,1.14]);
  return <Night>
    <NightSet open={open} heroX={180} heroY={715} heroWidth={555}
      expression={open > .72 ? 'surprised' : 'curious'}
      tilt={motion(f,secs(fps,0,2.1),[-6,7])}
      lean={open*6} arm={motion(f,secs(fps,0,.8,2.0),[3,62,75])}
      scarf={open*6} cameraScale={cam} cameraX={-28} cameraY={-25} />
    <Caption id={f < 2.35*fps ? '03-open' : '03-look'} accent={f < 2.35*fps ? 'Buka kulkas' : 'Lihat isinya'} />
  </Night>;
};

export const InvestigationScene: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const magIn = motion(f, secs(fps,1.18,1.58,3.12,3.48), [0,1,1,0]);
  const magnifierX = motion(f, secs(fps,1.5,3.1), [630,770]);
  return <Night>
    <NightSet open={1} heroX={112} heroY={688} heroWidth={585}
      expression={f < 1.6*fps ? 'curious' : f < 3.25*fps ? 'thinking' : 'doubtful'}
      tilt={motion(f,secs(fps,0,1.4,2.8,4.1),[-11,8,-8,11])}
      lean={motion(f,secs(fps,0,2.6),[0,9])}
      arm={f > 1.5*fps ? 73 : 22}
      cameraScale={1.09} cameraX={-24} cameraY={-50} />
    <div style={{
      position:'absolute', left:magnifierX, top:865,
      width:205,height:205,borderRadius:'50%',
      border:'13px solid #252724',
      boxShadow:'0 0 0 6px #F7F0E5, 10px 15px 0 rgba(0,0,0,.15)',
      background:'rgba(255,249,209,.12)',opacity:magIn,
      rotate: String(motion(f,secs(fps,1.5,3.2),[-18,8]))+'deg',
    }}>
      <div style={{
        position:'absolute',left:164,top:160,width:128,height:22,
        borderRadius:22,rotate:'46deg',transformOrigin:'0 50%',
        background:'#252724',
      }} />
    </div>
    {f>2.55*fps && f<3.6*fps ? <div style={{
      position:'absolute',left:130,top:440,
      fontWeight:1000,fontSize:108,letterSpacing:-3,
      color:brand.colors.orange,
      transform:'rotate(-7deg)',
      textShadow:'8px 10px 0 rgba(0,0,0,.2)',
    }}>DUN…</div> : null}
    <Caption id={f < 1.65*fps ? '04-but' : '04-know'} />
  </Night>;
};

export const CloseFridgeScene: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const open = motion(f, secs(fps,.2,1.1), [1,0]);
  const walking = Math.max(0,f-1.1*fps)/(fps*.38);
  return <Night>
    <NightSet open={open} heroX={motion(f,secs(fps,1.0,2.9),[120,-520])}
      heroY={805+Math.sin(walking*Math.PI*2)*7}
      heroWidth={475} expression="deadpan" tilt={-7} lean={6} step={walking}
      scarf={Math.sin(walking*Math.PI*2)*7} />
    <Caption id="05-nothing" />
  </Night>;
};

export const FiveMinutesScene: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const title = motion(f,secs(fps,0,.1,1.15,1.52),[1,1,1,0]);
  const walking = Math.max(0,f-1.25*fps)/(fps*.35);
  return <Night>
    <NightSet clock="00:18" heroX={motion(f,secs(fps,1.2,3.65),[-390,150])}
      heroY={810+Math.sin(walking*Math.PI*2)*10}
      heroWidth={470} expression="curious" tilt={-6} lean={-5}
      step={walking} scarf={Math.sin(walking*Math.PI*2)*12} />
    <div style={{position:'absolute',inset:0,display:'flex',justifyContent:'center',alignItems:'center',
      backgroundColor:'#F6F0E5',opacity:title,pointerEvents:'none'}}>
      <div style={{textAlign:'center',color:brand.colors.ink,
        transform:'rotate(-3deg)'}}>
        <div style={{fontSize:44,fontWeight:900,color:brand.colors.orange,letterSpacing:6}}>EH, BENTAR…</div>
        <div style={{fontSize:144,lineHeight:.87,fontWeight:1000,letterSpacing:-8,
          marginTop:38}}>5 MENIT<br />KEMUDIAN.</div>
      </div>
    </div>
    <Caption id={f < 2.15*fps ? '06-five' : '06-again'} dark={!(f < 1.5*fps)} />
  </Night>;
};

export const SameAgainScene: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const open = motion(f,secs(fps,.25,1.22),[0,1]);
  const tilt = motion(f,secs(fps,0,1.2,2.8,3.8),[0,0,12,17]);
  return <Night>
    <NightSet open={open} heroX={170} heroY={715} heroWidth={560}
      expression={f>1.6*fps ? 'deadpan' : 'curious'}
      tilt={tilt} arm={75}
      cameraScale={1.06} cameraX={-15} />
    <div style={{position:'absolute',left:270,top:435,
      fontSize:118,fontWeight:1000,color:'#FFC38B',
      opacity:motion(f,secs(fps,1.7,2.25),[0,1]),
      letterSpacing:12}}>…</div>
  </Night>;
};

export const QuestionScene: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <Paper>
    <PaperSet heroX={-36} heroY={585} heroWidth={720}
      expression="thinking" tilt={motion(f,secs(fps,0,1.5,3.7),[-8,8,-5])}
      arm={34} open={1}
      cameraScale={motion(f,secs(fps,0,3.9),[1.0,1.055])}
      cameraX={-22} />
    <div style={{position:'absolute',left:85,top:235,
      fontSize:148,fontWeight:1000,letterSpacing:-8,
      color:brand.colors.ink,rotate:'-5deg',
      opacity:motion(f,secs(fps,.05,.5),[0,1]),
      textShadow:'6px 8px 0 rgba(233,107,60,.18)'}}>KENAPA?</div>
    <div style={{position:'absolute',left:97,top:435,
      fontSize:54,fontWeight:850,letterSpacing:-1.3,
      color:brand.colors.orange,
      opacity:motion(f,secs(fps,1.5,2.05),[0,1])}}>
      Padahal tahu isinya.
    </div>
    <Caption id="08-question" dark={false} accent="tahu isinya" />
  </Paper>;
};

const Bubble: React.FC<{left:number;top:number;text:string;tint:string;scale?:number}> = ({
  left,top,text,tint,scale=1,
}) => <div style={{
  position:'absolute',left,top,width:360,height:245,
  border:'8px solid #20251F',borderRadius:'50%',
  backgroundColor:tint,display:'flex',alignItems:'center',
  justifyContent:'center',textAlign:'center',
  fontSize:58,fontWeight:950,letterSpacing:-2,
  scale,
  boxShadow:'10px 12px 0 rgba(32,37,31,.1)',
}}>
  {text}
  <div style={{position:'absolute',left:135,bottom:-55,width:53,height:53,
    background:tint,borderRight:'8px solid #20251F',borderBottom:'8px solid #20251F',
    rotate:'34deg',zIndex:-1}}/>
</div>;

export const NotHungryScene: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <Paper>
    <PaperSet showFridge={false} heroX={270} heroY={810} heroWidth={540}
      expression={f<2*fps?'curious':'doubtful'} tilt={motion(f,secs(fps,0,1,2.8),[-8,8,-8])} />
    <Bubble left={48} top={405} text="Lapar?" tint="#FBEBD6"
      scale={motion(f,secs(fps,.2,.72),[.66,1])}/>
    <Bubble left={660} top={455} text="Bosan?" tint="#DBE7DA"
      scale={motion(f,secs(fps,1.0,1.5),[.66,1])}/>
    <Caption id="09-not-hungry" dark={false} accent="nggak selalu" />
  </Paper>;
};

const Spark: React.FC<{left:number;top:number;size:number;rotate?:number;opacity:number}> = ({
  left,top,size,rotate=0,opacity,
}) => <div style={{position:'absolute',left,top,width:size,height:size,opacity,rotate:String(rotate)+'deg'}}>
  <svg width="100%" height="100%" viewBox="0 0 100 100">
    <path d="M50 0 L59 38 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40Z"
      fill="#E96B3C" stroke="#20251F" strokeWidth="6" strokeLinejoin="round" />
  </svg>
</div>;

export const RewardScene: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const open = motion(f,secs(fps,2.0,3.1),[0,.78]);
  const spark = motion(f,secs(fps,2.45,3.15,4.8),[0,1,0.75]);
  return <Paper>
    <PaperSet heroX={92} heroY={800} heroWidth={520} open={open}
      expression={f<2.1*fps?'doubtful':'realization'}
      tilt={motion(f,secs(fps,0,1.5,3.0),[9,-8,9])}
      arm={motion(f,secs(fps,0,2.2,3.6),[-12,-12,72])} />
    <div style={{position:'absolute',left:95,top:290,
      fontSize:106,fontWeight:1000,lineHeight:.92,
      letterSpacing:-5}}>
      Bukan lapar.
      <br /><span style={{color:brand.colors.orange}}>Cuma bosan.</span>
    </div>
    <div style={{position:'absolute',left:480,top:560,
      padding:'24px 35px',border:'6px solid #20251F',borderRadius:55,
      fontSize:43,fontWeight:850,background:'#FFFDF8',
      transform:'rotate(-8deg)',
      opacity:motion(f,secs(fps,.5,1.1),[0,1])}}>
      Ada yang enak<br/>nggak, ya?
    </div>
    <Spark left={665} top={670} size={105} rotate={8} opacity={spark}/>
    <Spark left={825} top={560} size={76} rotate={25} opacity={spark}/>
    <Spark left={540} top={805} size={61} rotate={-12} opacity={spark}/>
    <Caption id={f<2.4*fps?'10-bored':'10-reward'} dark={false}
      accent={f<2.4*fps?'bosan':'hadiah kecil'} />
  </Paper>;
};

export const HabitLoopScene: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const phase = f<1.1*fps?0:f<2.5*fps?1:f<3.9*fps?2:3;
  const word = ['BOSAN','BUKA!','CEK…','TUTUP.'][phase];
  const open = motion(f,secs(fps,0,1.1,2.05,3.55,4.4,5),[0,0,1,1,0,0]);
  const fStep = Math.max(0,f-1.0*fps)/(fps*.28);
  return <Paper>
    <PaperSet open={open}
      heroX={motion(f,secs(fps,0,1.1,1.65,5),[75,75,110,110])}
      heroY={685+Math.sin(fStep*Math.PI*2)*(phase===1?10:2)}
      heroWidth={615}
      expression={phase===0?'doubtful':phase===1?'curious':phase===2?'surprised':'deadpan'}
      tilt={phase===0?9:phase===1?-7:phase===2?7:-5}
      arm={phase===0?-12:phase===1?65:phase===2?73:6}
      scarf={Math.sin(f/7)*6}
      step={phase===1?fStep:0}
      cameraScale={phase===1?1.05:1} />
    <div style={{position:'absolute',left:75,top:225,
      fontSize:148,fontWeight:1000,letterSpacing:-6,
      color:phase===1?brand.colors.orange:brand.colors.ink,
      rotate:phase===1?'-5deg':'-2deg',
      textShadow:'5px 9px 0 rgba(32,37,31,.08)',
    }}>{word}</div>
    <div style={{position:'absolute',right:100,top:260,
      fontSize:62,fontWeight:900,color:brand.colors.orange,
      opacity:phase===2?1:0}}>↻</div>
    <Caption id={f<2.8*fps?'11-habit':f<4.0*fps?'11-bored':'11-check'}
      dark={false} accent={f<2.8*fps?'kebiasaan':f<4*fps?'Bosan':'cek kulkas'} />
  </Paper>;
};

export const EndingScene: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const open = motion(f,secs(fps,4.65,5.34),[0,1]);
  const final = motion(f,secs(fps,5.3,5.85),[0,1]);
  return <Night>
    <NightSet open={open} heroX={170} heroY={725} heroWidth={550}
      expression={f<1.8*fps?'thinking':f<4.45*fps?'realization':'deadpan'}
      tilt={motion(f,secs(fps,0,1.65,2.9,4.1),[8,-8,12,-4])}
      arm={motion(f,secs(fps,0,1.8,3.4,4.2,4.9),[70,70,-12,25,71])}
      cameraScale={1.02} />
    {f > 5.3*fps ? <div style={{
      position:'absolute',inset:0,opacity:final,
      display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
      backgroundColor:brand.colors.paper,color:brand.colors.ink,
      textAlign:'center'}}>
      <CanvasImage src={publicAsset('brand/coba-dipikir-logo.webp')}
        style={{width:230,height:230,objectFit:'contain'}} />
      <div style={{marginTop:48,fontSize:92,fontWeight:1000,letterSpacing:-5}}>coba dipikir.</div>
      <div style={{marginTop:18,fontSize:34,fontWeight:650,color:brand.colors.muted}}>
        Yang biasa, belum tentu sederhana.
      </div>
    </div> : null}
    {f<5.3*fps ? <Caption id={f<1.4*fps?'12-maybe':f<3.2*fps?'12-not-food':'12-something'}
      accent={f<1.4*fps?undefined:f<3.2*fps?'bukan makanan':'menemukan sesuatu'}/> : null}
  </Night>;
};
