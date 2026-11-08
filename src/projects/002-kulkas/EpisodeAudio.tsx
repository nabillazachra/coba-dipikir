import React from 'react';
import {Audio} from '@remotion/media';
import {useVideoConfig} from 'remotion';
import {publicAsset} from '../../brand/publicAsset';

const vo = (file: string) => publicAsset(`audio/002-kulkas/voiceover/${file}.mp3`);
const sfx = (file: string) => publicAsset(`audio/002-kulkas/sfx/${file}.wav`);

export const EpisodeAudio: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <>
      <Audio name="Quirky bed" src={publicAsset('audio/common/coba-dipikir-bed.wav')} volume={0.21} premountFor={fps} />

      <Audio name="VO 01" src={vo('01-midnight')} from={Math.round(0.45 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 02a" src={vo('02-why')} from={Math.round(4.45 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 02b" src={vo('02-kitchen')} from={Math.round(6.15 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 03a" src={vo('03-open')} from={Math.round(8.55 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 03b" src={vo('03-look')} from={Math.round(10.75 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 04a" src={vo('04-but')} from={Math.round(13.45 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 04b" src={vo('04-know')} from={Math.round(15.0 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 05" src={vo('05-nothing')} from={Math.round(18.35 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 06a" src={vo('06-five')} from={Math.round(21.25 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 06b" src={vo('06-again')} from={Math.round(23.25 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 08" src={vo('08-question')} from={Math.round(29.35 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 09" src={vo('09-not-hungry')} from={Math.round(33.35 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 10a" src={vo('10-bored')} from={Math.round(37.35 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 10b" src={vo('10-reward')} from={Math.round(39.75 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 11a" src={vo('11-habit')} from={Math.round(42.35 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 11b" src={vo('11-bored')} from={Math.round(45.1 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 11c" src={vo('11-check')} from={Math.round(46.15 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 12a" src={vo('12-maybe')} from={Math.round(47.35 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 12b" src={vo('12-not-food')} from={Math.round(48.75 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO 12c" src={vo('12-something')} from={Math.round(50.35 * fps)} volume={0.98} premountFor={fps} />

      <Audio name="Footstep 1" src={sfx('footstep')} from={Math.round(0.75 * fps)} volume={0.16} premountFor={fps} />
      <Audio name="Footstep 2" src={sfx('footstep')} from={Math.round(1.35 * fps)} volume={0.13} premountFor={fps} />
      <Audio name="Footstep 3" src={sfx('footstep')} from={Math.round(1.95 * fps)} volume={0.15} premountFor={fps} />
      <Audio name="Footstep 4" src={sfx('footstep')} from={Math.round(2.55 * fps)} volume={0.12} premountFor={fps} />

      <Audio name="Suspicious sting" src={sfx('detective-sting')} from={Math.round(5.15 * fps)} volume={0.11} premountFor={fps} />
      <Audio name="Fridge click" src={sfx('fridge-click')} from={Math.round(8.48 * fps)} volume={0.22} premountFor={fps} />
      <Audio name="Fridge hum 1" src={sfx('fridge-hum')} from={Math.round(8.7 * fps)} volume={0.11} premountFor={fps} />
      <Audio name="Light sparkle" src="https://remotion.media/ding.wav" from={Math.round(9.8 * fps)} volume={0.08} premountFor={fps} />
      <Audio name="Detective zoom" src={sfx('detective-sting')} from={Math.round(15.1 * fps)} volume={0.16} premountFor={fps} />
      <Audio name="Container boom" src="https://remotion.media/dramatic-boomer.wav" from={Math.round(15.65 * fps)} volume={0.045} premountFor={fps} />

      <Audio name="Fridge close" src={sfx('fridge-click')} from={Math.round(18.65 * fps)} volume={0.22} premountFor={fps} />
      <Audio name="Time skip" src={sfx('time-skip')} from={Math.round(21.0 * fps)} volume={0.14} premountFor={fps} />
      <Audio name="Rush step 1" src={sfx('footstep')} from={Math.round(22.2 * fps)} volume={0.14} premountFor={fps} />
      <Audio name="Rush step 2" src={sfx('footstep')} from={Math.round(22.62 * fps)} volume={0.14} premountFor={fps} />
      <Audio name="Rush step 3" src={sfx('footstep')} from={Math.round(23.04 * fps)} volume={0.14} premountFor={fps} />

      <Audio name="Fridge click again" src={sfx('fridge-click')} from={Math.round(25.35 * fps)} volume={0.22} premountFor={fps} />
      <Audio name="Awkward fridge hum" src={sfx('fridge-hum')} from={Math.round(25.55 * fps)} volume={0.15} premountFor={fps} />
      <Audio name="Tiny error" src="https://remotion.media/windows-xp-error.wav" from={Math.round(28.15 * fps)} volume={0.045} premountFor={fps} />

      <Audio name="Question whoosh" src="https://remotion.media/whoosh.wav" from={Math.round(29.0 * fps)} volume={0.07} premountFor={fps} />
      <Audio name="Bubble pop 1" src="https://remotion.media/mouse-click.wav" from={Math.round(33.8 * fps)} volume={0.1} premountFor={fps} />
      <Audio name="Bubble pop 2" src="https://remotion.media/mouse-click.wav" from={Math.round(34.15 * fps)} volume={0.1} premountFor={fps} />
      <Audio name="Reward sparkle" src="https://remotion.media/ding.wav" from={Math.round(40.2 * fps)} volume={0.08} premountFor={fps} />
      <Audio name="Loop skedaddle" src="https://remotion.media/skedaddle.wav" from={Math.round(45.9 * fps)} volume={0.055} premountFor={fps} />

      <Audio name="Ending pause hit" src="https://remotion.media/switch.wav" from={Math.round(49.0 * fps)} volume={0.06} premountFor={fps} />
      <Audio name="Reopen fridge" src={sfx('fridge-click')} from={Math.round(51.85 * fps)} volume={0.22} premountFor={fps} />
      <Audio name="Tiny fail" src={sfx('tiny-fail')} from={Math.round(52.05 * fps)} volume={0.11} premountFor={fps} />
    </>
  );
};
