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
        volume={0.25}
        premountFor={fps}
      />

      <Audio name="VO · Hook" src={vo('01-hook')} from={Math.round(0.35 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO · Baseline" src={vo('02-awal')} from={Math.round(6.15 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO · Promo" src={vo('03-promo')} from={Math.round(11.35 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO · Decision" src={vo('04-keputusan')} from={Math.round(17.15 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO · Win" src={vo('05-menang')} from={Math.round(23.4 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO · Total" src={vo('05-total')} from={Math.round(25.35 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO · Punch" src={vo('05-punch')} from={Math.round(28.15 * fps)} volume={0.98} premountFor={fps} />
      <Audio name="VO · Closing" src={vo('06-penutup')} from={Math.round(32.2 * fps)} volume={0.98} premountFor={fps} />

      <Audio name="SFX · Cold open" src="https://remotion.media/whoosh.wav" from={0} volume={0.09} premountFor={fps} />
      <Audio name="SFX · Price tag" src="https://remotion.media/mouse-click.wav" from={Math.round(1.6 * fps)} volume={0.13} premountFor={fps} />
      <Audio name="SFX · Promo stamp" src="https://remotion.media/switch.wav" from={Math.round(3.1 * fps)} volume={0.11} premountFor={fps} />
      <Audio name="SFX · Scene whip 1" src="https://remotion.media/whip.wav" from={Math.round(5.55 * fps)} volume={0.07} premountFor={fps} />

      <Audio name="SFX · Phone tap 1" src="https://remotion.media/mouse-click.wav" from={Math.round(6.7 * fps)} volume={0.10} premountFor={fps} />
      <Audio name="SFX · Phone tap 2" src="https://remotion.media/mouse-click.wav" from={Math.round(8.0 * fps)} volume={0.10} premountFor={fps} />
      <Audio name="SFX · Total ding" src="https://remotion.media/ding.wav" from={Math.round(9.45 * fps)} volume={0.09} premountFor={fps} />
      <Audio name="SFX · Promo pop" src="https://remotion.media/page-turn.wav" from={Math.round(11.05 * fps)} volume={0.09} premountFor={fps} />

      <Audio name="SFX · Progress switch" src="https://remotion.media/switch.wav" from={Math.round(12.4 * fps)} volume={0.10} premountFor={fps} />
      <Audio name="SFX · Tanggung tap" src="https://remotion.media/mouse-click.wav" from={Math.round(14.2 * fps)} volume={0.09} premountFor={fps} />
      <Audio name="SFX · Scene whip 2" src="https://remotion.media/whip.wav" from={Math.round(16.65 * fps)} volume={0.07} premountFor={fps} />

      <Audio name="SFX · Product A" src="https://remotion.media/mouse-click.wav" from={Math.round(17.55 * fps)} volume={0.08} premountFor={fps} />
      <Audio name="SFX · Product B" src="https://remotion.media/mouse-click.wav" from={Math.round(18.15 * fps)} volume={0.08} premountFor={fps} />
      <Audio name="SFX · Product selected" src="https://remotion.media/shutter-modern.wav" from={Math.round(19.15 * fps)} volume={0.09} premountFor={fps} />
      <Audio name="SFX · Add cart" src="https://remotion.media/mouse-click.wav" from={Math.round(20.35 * fps)} volume={0.14} premountFor={fps} />
      <Audio name="SFX · Free shipping" src="https://remotion.media/ding.wav" from={Math.round(22.35 * fps)} volume={0.13} premountFor={fps} />

      <Audio name="SFX · Win ding" src="https://remotion.media/yippee.wav" from={Math.round(23.45 * fps)} volume={0.05} premountFor={fps} />
      <Audio name="SFX · Record scratch" src="https://remotion.media/record-scratch.wav" from={Math.round(25.0 * fps)} volume={0.10} premountFor={fps} />
      <Audio name="SFX · Compare snap" src="https://remotion.media/switch.wav" from={Math.round(25.65 * fps)} volume={0.09} premountFor={fps} />
      <Audio name="SFX · Net reveal" src="https://remotion.media/dramatic-boomer.wav" from={Math.round(29.05 * fps)} volume={0.045} premountFor={fps} />
      <Audio name="SFX · Closing whoosh" src="https://remotion.media/whoosh.wav" from={Math.round(31.75 * fps)} volume={0.07} premountFor={fps} />
    </>
  );
};
