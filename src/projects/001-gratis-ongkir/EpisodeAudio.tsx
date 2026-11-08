import React from 'react';
import {Audio} from '@remotion/media';
import {useVideoConfig} from 'remotion';

export const EpisodeAudio: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <>
      <Audio
        name="SFX · Cart add"
        src="https://remotion.media/mouse-click.wav"
        from={Math.round(0.95 * fps)}
        volume={0.28}
      />
      <Audio
        name="SFX · Ongkir strike"
        src="https://remotion.media/switch.wav"
        from={Math.round(1.48 * fps)}
        volume={0.24}
      />

      <Audio
        name="SFX · Promo appears"
        src="https://remotion.media/switch.wav"
        from={Math.round(11.35 * fps)}
        volume={0.2}
      />

      <Audio
        name="SFX · Item added"
        src="https://remotion.media/mouse-click.wav"
        from={Math.round(17.55 * fps)}
        volume={0.3}
      />
      <Audio
        name="SFX · Promo success"
        src="https://remotion.media/ding.wav"
        from={Math.round(19.55 * fps)}
        volume={0.24}
      />

      <Audio
        name="SFX · Pre-reveal tap 1"
        src="https://remotion.media/mouse-click.wav"
        from={Math.round(22.15 * fps)}
        volume={0.18}
      />
      <Audio
        name="SFX · Pre-reveal tap 2"
        src="https://remotion.media/mouse-click.wav"
        from={Math.round(22.48 * fps)}
        volume={0.18}
      />
      <Audio
        name="SFX · Difference reveal"
        src="https://remotion.media/switch.wav"
        from={Math.round(26.2 * fps)}
        volume={0.24}
      />
    </>
  );
};
