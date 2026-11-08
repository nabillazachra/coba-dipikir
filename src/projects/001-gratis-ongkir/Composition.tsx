import React from 'react';
import {Series, useVideoConfig} from 'remotion';
import {HookScene} from './scenes/HookScene';
import {InitialCheckoutScene} from './scenes/InitialCheckoutScene';
import {PromoTemptationScene} from './scenes/PromoTemptationScene';
import {DecisionScene} from './scenes/DecisionScene';
import {RevealScene} from './scenes/RevealScene';
import {ClosingScene} from './scenes/ClosingScene';
import {EpisodeAudio} from './EpisodeAudio';

export const GratisOngkirEpisode: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <>
      <Series>
      <Series.Sequence name="01 Hook" durationInFrames={6 * fps} premountFor={fps}>
        <HookScene />
      </Series.Sequence>
      <Series.Sequence name="02 Belanja awal" durationInFrames={6 * fps} premountFor={fps}>
        <InitialCheckoutScene />
      </Series.Sequence>
      <Series.Sequence name="03 Godaan promo" durationInFrames={7 * fps} premountFor={fps}>
        <PromoTemptationScene />
      </Series.Sequence>
      <Series.Sequence name="04 Keputusan" durationInFrames={7 * fps} premountFor={fps}>
        <DecisionScene />
      </Series.Sequence>
      <Series.Sequence name="05 Reveal" durationInFrames={10 * fps} premountFor={fps}>
        <RevealScene />
      </Series.Sequence>
      <Series.Sequence name="06 Penutup" durationInFrames={9 * fps} premountFor={fps}>
        <ClosingScene />
      </Series.Sequence>
      </Series>
      <EpisodeAudio />
    </>
  );
};
