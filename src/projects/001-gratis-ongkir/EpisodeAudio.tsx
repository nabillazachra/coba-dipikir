import React from 'react';
import {Audio} from '@remotion/media';
import {useVideoConfig} from 'remotion';
import {publicAsset} from '../../brand/publicAsset';

const vo = (file: string) => publicAsset(`audio/001-gratis-ongkir/voiceover/${file}.mp3`);

export const EpisodeAudio: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <>
      <Audio name="VO · Hook 1" src={vo('01-hook-a')} from={Math.round(0.2 * fps)} volume={0.98} />
      <Audio name="VO · Hook 2" src={vo('01-hook-b')} from={Math.round(2.8 * fps)} volume={0.98} />
      <Audio name="VO · Hook punch" src={vo('01-hook-c')} from={Math.round(5.0 * fps)} volume={0.98} />

      <Audio name="VO · Awal 1" src={vo('02-awal-a')} from={Math.round(6.2 * fps)} volume={0.98} />
      <Audio name="VO · Awal 2" src={vo('02-awal-b')} from={Math.round(7.4 * fps)} volume={0.98} />
      <Audio name="VO · Awal punch" src={vo('02-awal-c')} from={Math.round(10.2 * fps)} volume={0.98} />

      <Audio name="VO · Promo 1" src={vo('03-promo-a')} from={Math.round(12.2 * fps)} volume={0.98} />
      <Audio name="VO · Promo 2" src={vo('03-promo-b')} from={Math.round(14.0 * fps)} volume={0.98} />
      <Audio name="VO · Promo punch" src={vo('03-promo-c')} from={Math.round(18.0 * fps)} volume={0.98} />

      <Audio name="VO · Keputusan 1" src={vo('04-keputusan-a')} from={Math.round(19.2 * fps)} volume={0.98} />
      <Audio name="VO · Keputusan 2" src={vo('04-keputusan-b')} from={Math.round(22.8 * fps)} volume={0.98} />
      <Audio name="VO · Keputusan punch" src={vo('04-keputusan-c')} from={Math.round(24.7 * fps)} volume={0.98} />

      <Audio name="VO · Reveal 1" src={vo('05-reveal-a')} from={Math.round(26.2 * fps)} volume={0.98} />
      <Audio name="VO · Reveal 2" src={vo('05-reveal-b')} from={Math.round(27.8 * fps)} volume={0.98} />
      <Audio name="VO · Reveal setup" src={vo('05-reveal-c')} from={Math.round(30.6 * fps)} volume={0.98} />
      <Audio name="VO · Reveal punch" src={vo('05-reveal-d')} from={Math.round(33.1 * fps)} volume={0.98} />

      <Audio name="VO · Closing 1" src={vo('06-penutup-a')} from={Math.round(36.2 * fps)} volume={0.98} />
      <Audio name="VO · Closing pause" src={vo('06-penutup-b')} from={Math.round(39.7 * fps)} volume={0.98} />
      <Audio name="VO · Closing question" src={vo('06-penutup-c')} from={Math.round(41.3 * fps)} volume={0.98} />

      <Audio name="SFX · Cart add" src="https://remotion.media/mouse-click.wav" from={Math.round(0.95 * fps)} volume={0.15} />
      <Audio name="SFX · Ongkir strike" src="https://remotion.media/switch.wav" from={Math.round(2.55 * fps)} volume={0.13} />
      <Audio name="SFX · Promo appears" src="https://remotion.media/switch.wav" from={Math.round(12.45 * fps)} volume={0.11} />
      <Audio name="SFX · Item added" src="https://remotion.media/mouse-click.wav" from={Math.round(23.0 * fps)} volume={0.16} />
      <Audio name="SFX · Promo success" src="https://remotion.media/ding.wav" from={Math.round(25.0 * fps)} volume={0.15} />
      <Audio name="SFX · Pre-reveal tap 1" src="https://remotion.media/mouse-click.wav" from={Math.round(25.55 * fps)} volume={0.08} />
      <Audio name="SFX · Pre-reveal tap 2" src="https://remotion.media/mouse-click.wav" from={Math.round(25.82 * fps)} volume={0.08} />
      <Audio name="SFX · Difference reveal" src="https://remotion.media/switch.wav" from={Math.round(31.3 * fps)} volume={0.13} />
    </>
  );
};
