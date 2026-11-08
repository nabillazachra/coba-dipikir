import React from 'react';
import {Audio} from '@remotion/media';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {publicAsset} from '../../brand/publicAsset';

const vo = (file: string) => publicAsset('audio/002-kulkas/voiceover/' + file + '.mp3');
const sfx = (file: string) => publicAsset('audio/002-kulkas/sfx/' + file + '.wav');

type AudioCue = {
  name: string;
  file: string;
  at: number;
  gain: number;
  rate?: number;
};

// VO timings are untouched: this list remains synchronized with the subtitle
// source in voiceover.config.ts and with the 53-second cinematic cut.
const narration: AudioCue[] = [
  {name:'01 Midnight', file:'01-midnight', at:.45, gain:.98},
  {name:'02 Curious pause', file:'02-why', at:4.45, gain:.98},
  {name:'02 Kitchen', file:'02-kitchen', at:6.15, gain:.98},
  {name:'03 Open', file:'03-open', at:8.55, gain:.98},
  {name:'03 Look', file:'03-look', at:10.75, gain:.98},
  {name:'04 But...', file:'04-but', at:13.45, gain:.98},
  {name:'04 Known contents', file:'04-know', at:15, gain:.98},
  {name:'05 Nothing new', file:'05-nothing', at:18.35, gain:.98},
  {name:'06 Five minutes', file:'06-five', at:21.25, gain:.98},
  {name:'06 Again', file:'06-again', at:23.25, gain:.98},
  {name:'08 Question', file:'08-question', at:29.35, gain:.98},
  {name:'09 Not hungry', file:'09-not-hungry', at:33.35, gain:.98},
  {name:'10 Bored', file:'10-bored', at:37.35, gain:.98},
  {name:'10 Reward', file:'10-reward', at:39.75, gain:.98},
  {name:'11 Habit', file:'11-habit', at:42.35, gain:.98},
  {name:'11 Bored again', file:'11-bored', at:45.1, gain:.98},
  {name:'11 Check again', file:'11-check', at:46.15, gain:.98},
  {name:'12 Maybe...', file:'12-maybe', at:47.35, gain:.98},
  {name:'12 Not food', file:'12-not-food', at:48.75, gain:.98},
  {name:'12 Something', file:'12-something', at:50.35, gain:.98},
];

// Beat design follows the NEW visual movements, not generic edit transitions.
// Varied high/low cues make the character mischievous without burying the VO.
const effects: AudioCue[] = [
  // 00–04: suspicious midnight tiptoe, NOT a four-on-the-floor march.
  {name:'Midnight step 1', file:'sneaky-step', at:.82, gain:.22},
  {name:'Midnight step 2', file:'sneaky-step', at:1.45, gain:.15, rate:1.15},
  {name:'Midnight step 3', file:'sneaky-step', at:2.12, gain:.21, rate:.86},
  {name:'Midnight step 4', file:'sneaky-step', at:2.73, gain:.15, rate:1.08},
  {name:'Tiny stop', file:'soft-bonk', at:3.47, gain:.10},

  // 04–08: looking from fridge to camera and back.
  {name:'Suspicious gaze', file:'side-eye', at:4.85, gain:.14},
  {name:'Eyebrow raise', file:'eyebrow-squeak', at:5.62, gain:.18},
  {name:'Look back at fridge', file:'side-eye', at:6.72, gain:.13, rate:1.2},
  {name:'Hand reaches handle', file:'sneaky-pluck', at:7.42, gain:.17},

  // 08–13: refrigerator latch, hinge, theatrical warm light.
  {name:'Fridge latch open', file:'fridge-latch', at:8.48, gain:.27},
  {name:'Real hinge creak', file:'door-creak', at:8.72, gain:.18},
  {name:'Ridiculous magic reveal', file:'light-shimmer', at:9.77, gain:.22},
  {name:'Fridge hum', file:'fridge-hum', at:9.05, gain:.30},
  {name:'Eyes dart inside', file:'blink-tick', at:11.27, gain:.12},
  {name:'One more look', file:'side-eye', at:12.09, gain:.12},

  // 13–18: an overly serious investigation of leftovers.
  {name:'Detective mode', file:'mystery-dun', at:13.59, gain:.24},
  {name:'Magnifier zoom', file:'detective-zoom', at:14.92, gain:.20},
  {name:'Found the exact same box', file:'suspense-hit', at:16.37, gain:.24},
  {name:'Disappointed blink', file:'blink-tick', at:17.31, gain:.12},

  // 18–21: quiet, defeated exit.
  {name:'Close the fridge', file:'fridge-latch', at:18.64, gain:.26},
  {name:'Sad little bonk', file:'soft-bonk', at:19.45, gain:.20},
  {name:'Walk-away tiny squeak', file:'side-eye', at:20.21, gain:.09},

  // 21–25: cut to five minutes later; tempo briefly accelerates.
  {name:'Five minute warp', file:'clock-skip', at:21.02, gain:.32},
  {name:'Back already step 1', file:'sneaky-step', at:22.13, gain:.21, rate:1.25},
  {name:'Back already step 2', file:'sneaky-step', at:22.55, gain:.18, rate:1.18},
  {name:'Back already step 3', file:'sneaky-step', at:22.97, gain:.19, rate:1.3},
  {name:'Sneaky little return', file:'rubber-boing', at:23.73, gain:.15},

  // 25–29: repeating the same ritual. Strip out music; let hum be awkward.
  {name:'Opening SAME fridge', file:'fridge-latch', at:25.30, gain:.27},
  {name:'Same hinge, same creak', file:'door-creak', at:25.51, gain:.17},
  {name:'Awkward fridge hum ONLY', file:'fridge-hum', at:25.63, gain:.36},
  {name:'One painfully lonely cricket', file:'tiny-cricket', at:27.65, gain:.25},
  {name:'Realization scratch', file:'record-scratch', at:28.41, gain:.24},

  // 29–37: curiosity & two options with characterful bubble sounds.
  {name:'Big question pop', file:'squish-pop', at:29.22, gain:.23},
  {name:'Confused look', file:'eyebrow-squeak', at:31.04, gain:.16},
  {name:'Question blink', file:'blink-tick', at:32.1, gain:.13},
  {name:'Lapar bubble', file:'bubble-pop', at:33.39, gain:.25},
  {name:'Bosan bubble', file:'rubber-boing', at:34.17, gain:.22},
  {name:'Wait a second', file:'side-eye', at:35.75, gain:.13},

  // 37–42: the brain seeks its small reward.
  {name:'Bored shrug', file:'sneaky-pluck', at:37.55, gain:.17},
  {name:'What if something good...', file:'eyebrow-squeak', at:38.62, gain:.15},
  {name:'Tiny idea!', file:'idea-chime', at:40.02, gain:.28},
  {name:'Reward mini pop', file:'cartoon-blip', at:40.81, gain:.16},

  // 42–47: each visible loop stage has a different sound.
  {name:'Loop 1 BOSAN', file:'soft-bonk', at:42.14, gain:.16},
  {name:'Loop 2 BUKA', file:'loop-zip', at:43.23, gain:.21},
  {name:'Loop 2 latch', file:'fridge-latch', at:43.55, gain:.14},
  {name:'Loop 3 CEK', file:'cartoon-blip', at:44.66, gain:.21},
  {name:'Loop 3 eye dart', file:'blink-tick', at:45.22, gain:.11},
  {name:'Loop 4 TUTUP', file:'fridge-latch', at:46.01, gain:.19},
  {name:'Loop resigns', file:'squish-pop', at:46.59, gain:.14},

  // 47–53: record scratch, breathing space, reopen, rubbery fail.
  {name:'Wait, maybe not food', file:'record-scratch', at:48.08, gain:.23},
  {name:'Blink of self-awareness', file:'blink-tick', at:50.14, gain:.13},
  {name:'...and opens it AGAIN', file:'fridge-latch', at:51.72, gain:.26},
  {name:'Punchline rubber fail', file:'little-fail', at:52.03, gain:.26},
];

export const EpisodeAudio: React.FC = () => {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();

  const time = frame / fps;
  // Lightweight sidechain approximation, smooth around the empty beat.
  const musicLevel = interpolate(time,
    [0, .4, 4.1, 8, 17.8, 18.2, 20.8, 21.4, 24.8, 25.1,
     28.75, 29.1, 41.8, 42.1, 47.1, 48.55, 49.6, 51.65, 52.3, 53],
    [.25, .45, .45, .40, .4, .24, .24, .48, .42, 0,
     0, .43, .44, .48, .48, .3, .34, .24, .1, 0], {
      extrapolateLeft:'clamp',
      extrapolateRight:'clamp',
    });

  return (
    <>
      <Audio
        name="E002 original quirky pizzicato score"
        src={sfx('comedy-bed')}
        volume={musicLevel}
        premountFor={fps}
      />

      {narration.map((cue) => (
        <Audio
          key={'vo-' + cue.file}
          name={'VO · ' + cue.name}
          src={vo(cue.file)}
          from={Math.round(cue.at * fps)}
          volume={cue.gain}
          premountFor={fps}
        />
      ))}

      {effects.map((cue) => (
        <Audio
          key={cue.name}
          name={'SFX · ' + cue.name}
          src={sfx(cue.file)}
          from={Math.round(cue.at * fps)}
          volume={cue.gain}
          playbackRate={cue.rate ?? 1}
          premountFor={fps}
        />
      ))}
    </>
  );
};
