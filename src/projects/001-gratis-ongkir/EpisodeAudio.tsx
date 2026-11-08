import React from 'react';
import {Audio} from '@remotion/media';
import {useVideoConfig} from 'remotion';
import {publicAsset} from '../../brand/publicAsset';

const vo = (file: string) => publicAsset(`audio/001-gratis-ongkir/voiceover/${file}.mp3`);

export const EpisodeAudio: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <>
      <Audio
        name="Music bed"
        src={publicAsset('audio/common/coba-dipikir-bed.wav')}
        volume={0.28}
        premountFor={fps}
      />

      <Audio name="VO · Hook" src={vo('01-hook')} from={Math.round(0.25 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO · Baseline" src={vo('02-awal')} from={Math.round(5.25 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO · Promo" src={vo('03-promo')} from={Math.round(10.75 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO · Decision" src={vo('04-keputusan')} from={Math.round(16.2 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO · Win" src={vo('05-menang')} from={Math.round(22.15 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO · Total" src={vo('05-total')} from={Math.round(23.9 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO · Punch" src={vo('05-punch')} from={Math.round(26.2 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO · Closing" src={vo('06-penutup')} from={Math.round(29.8 * fps)} volume={0.98} premountFor={fps} />

      <Audio name="SFX · Cold open whoosh" src="https://remotion.media/whoosh.wav" from={0} volume={0.10} premountFor={fps} />
      <Audio name="SFX · Add 35K" src="https://remotion.media/mouse-click.wav" from={Math.round(1.7 * fps)} volume={0.16} premountFor={fps} />
      <Audio name="SFX · Cross ongkir" src="https://remotion.media/switch.wav" from={Math.round(2.8 * fps)} volume={0.13} premountFor={fps} />
      <Audio name="SFX · Scene whip 1" src="https://remotion.media/whip.wav" from={Math.round(4.85 * fps)} volume={0.08} premountFor={fps} />

      <Audio name="SFX · Card 70" src="https://remotion.media/mouse-click.wav" from={Math.round(5.45 * fps)} volume={0.11} premountFor={fps} />
      <Audio name="SFX · Card 10" src="https://remotion.media/mouse-click.wav" from={Math.round(6.35 * fps)} volume={0.11} premountFor={fps} />
      <Audio name="SFX · Total 80" src="https://remotion.media/ding.wav" from={Math.round(8.1 * fps)} volume={0.10} premountFor={fps} />
      <Audio name="SFX · Page turn promo" src="https://remotion.media/page-turn.wav" from={Math.round(10.35 * fps)} volume={0.10} premountFor={fps} />

      <Audio name="SFX · Promo switch" src="https://remotion.media/switch.wav" from={Math.round(10.75 * fps)} volume={0.12} premountFor={fps} />
      <Audio name="SFX · Threshold tick" src="https://remotion.media/mouse-click.wav" from={Math.round(12.6 * fps)} volume={0.10} premountFor={fps} />
      <Audio name="SFX · Scene whip 2" src="https://remotion.media/whip.wav" from={Math.round(15.85 * fps)} volume={0.08} premountFor={fps} />

      <Audio name="SFX · Product A" src="https://remotion.media/mouse-click.wav" from={Math.round(16.45 * fps)} volume={0.09} premountFor={fps} />
      <Audio name="SFX · Product B" src="https://remotion.media/mouse-click.wav" from={Math.round(16.8 * fps)} volume={0.09} premountFor={fps} />
      <Audio name="SFX · Product 35" src="https://remotion.media/mouse-click.wav" from={Math.round(17.15 * fps)} volume={0.15} premountFor={fps} />
      <Audio name="SFX · Cart move" src="https://remotion.media/whoosh.wav" from={Math.round(18.4 * fps)} volume={0.08} premountFor={fps} />
      <Audio name="SFX · Free shipping ding" src="https://remotion.media/ding.wav" from={Math.round(20.3 * fps)} volume={0.14} premountFor={fps} />

      <Audio name="SFX · Win ding" src="https://remotion.media/ding.wav" from={Math.round(22.2 * fps)} volume={0.12} premountFor={fps} />
      <Audio name="SFX · Record scratch" src="https://remotion.media/record-scratch.wav" from={Math.round(23.45 * fps)} volume={0.11} premountFor={fps} />
      <Audio name="SFX · Compare switch" src="https://remotion.media/switch.wav" from={Math.round(24.0 * fps)} volume={0.10} premountFor={fps} />
      <Audio name="SFX · Net reveal" src="https://remotion.media/dramatic-boomer.wav" from={Math.round(27.15 * fps)} volume={0.05} premountFor={fps} />
      <Audio name="SFX · Scene whoosh close" src="https://remotion.media/whoosh.wav" from={Math.round(29.4 * fps)} volume={0.08} premountFor={fps} />
      <Audio name="SFX · Final question" src="https://remotion.media/switch.wav" from={Math.round(32.0 * fps)} volume={0.07} premountFor={fps} />
    </>
  );
};
