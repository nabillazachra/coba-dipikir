import React from 'react';
import {Audio} from '@remotion/media';
import {useVideoConfig} from 'remotion';
import {publicAsset} from '../../brand/publicAsset';

export const EpisodeAudio: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <>
      <Audio
        name="VO · 01 Hook"
        src={publicAsset('audio/001-gratis-ongkir/voiceover/01-hook.mp3')}
        from={Math.round(0.18 * fps)}
        volume={0.98}
      />
      <Audio
        name="VO · 02 Belanja awal"
        src={publicAsset('audio/001-gratis-ongkir/voiceover/02-belanja-awal.mp3')}
        from={Math.round(5.2 * fps)}
        volume={0.98}
      />
      <Audio
        name="VO · 03 Godaan promo"
        src={publicAsset('audio/001-gratis-ongkir/voiceover/03-godaan-promo.mp3')}
        from={Math.round(11.25 * fps)}
        volume={0.98}
      />
      <Audio
        name="VO · 04 Keputusan"
        src={publicAsset('audio/001-gratis-ongkir/voiceover/04-keputusan.mp3')}
        from={Math.round(17.2 * fps)}
        volume={0.98}
      />
      <Audio
        name="VO · 05 Reveal"
        src={publicAsset('audio/001-gratis-ongkir/voiceover/05-reveal.mp3')}
        from={Math.round(23.25 * fps)}
        volume={0.98}
      />
      <Audio
        name="VO · 06 Penutup"
        src={publicAsset('audio/001-gratis-ongkir/voiceover/06-penutup.mp3')}
        from={Math.round(31.2 * fps)}
        volume={0.98}
      />

      <Audio
        name="SFX · Cart add"
        src="https://remotion.media/mouse-click.wav"
        from={Math.round(0.95 * fps)}
        volume={0.16}
      />
      <Audio
        name="SFX · Ongkir strike"
        src="https://remotion.media/switch.wav"
        from={Math.round(1.48 * fps)}
        volume={0.14}
      />
      <Audio
        name="SFX · Promo appears"
        src="https://remotion.media/switch.wav"
        from={Math.round(11.35 * fps)}
        volume={0.12}
      />
      <Audio
        name="SFX · Item added"
        src="https://remotion.media/mouse-click.wav"
        from={Math.round(17.55 * fps)}
        volume={0.17}
      />
      <Audio
        name="SFX · Promo success"
        src="https://remotion.media/ding.wav"
        from={Math.round(19.55 * fps)}
        volume={0.16}
      />
      <Audio
        name="SFX · Pre-reveal tap 1"
        src="https://remotion.media/mouse-click.wav"
        from={Math.round(22.15 * fps)}
        volume={0.1}
      />
      <Audio
        name="SFX · Pre-reveal tap 2"
        src="https://remotion.media/mouse-click.wav"
        from={Math.round(22.48 * fps)}
        volume={0.1}
      />
      <Audio
        name="SFX · Difference reveal"
        src="https://remotion.media/switch.wav"
        from={Math.round(26.2 * fps)}
        volume={0.14}
      />
    </>
  );
};
