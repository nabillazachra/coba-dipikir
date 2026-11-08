import React from 'react';
import {Series, useVideoConfig} from 'remotion';
import {EpisodeAudio} from './EpisodeAudio';
import {
  ApproachScene,
  CloseFridgeScene,
  EndingScene,
  FiveMinutesScene,
  HabitLoopScene,
  InvestigationScene,
  MidnightScene,
  NotHungryScene,
  OpenFridgeScene,
  QuestionScene,
  RewardScene,
  SameAgainScene,
} from './Scenes';

export const KulkasEpisode: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <>
      <Series>
        <Series.Sequence name="01 Jam tengah malam" durationInFrames={4 * fps} premountFor={fps}>
          <MidnightScene />
        </Series.Sequence>
        <Series.Sequence name="02 Tujuannya jelas" durationInFrames={4 * fps} premountFor={fps}>
          <ApproachScene />
        </Series.Sequence>
        <Series.Sequence name="03 Buka kulkas" durationInFrames={5 * fps} premountFor={fps}>
          <OpenFridgeScene />
        </Series.Sequence>
        <Series.Sequence name="04 Investigasi" durationInFrames={5 * fps} premountFor={fps}>
          <InvestigationScene />
        </Series.Sequence>
        <Series.Sequence name="05 Tutup kulkas" durationInFrames={3 * fps} premountFor={fps}>
          <CloseFridgeScene />
        </Series.Sequence>
        <Series.Sequence name="06 Lima menit kemudian" durationInFrames={4 * fps} premountFor={fps}>
          <FiveMinutesScene />
        </Series.Sequence>
        <Series.Sequence name="07 Isinya tetap sama" durationInFrames={4 * fps} premountFor={fps}>
          <SameAgainScene />
        </Series.Sequence>
        <Series.Sequence name="08 Pertanyaan" durationInFrames={4 * fps} premountFor={fps}>
          <QuestionScene />
        </Series.Sequence>
        <Series.Sequence name="09 Bukan selalu lapar" durationInFrames={4 * fps} premountFor={fps}>
          <NotHungryScene />
        </Series.Sequence>
        <Series.Sequence name="10 Bosan dan reward" durationInFrames={5 * fps} premountFor={fps}>
          <RewardScene />
        </Series.Sequence>
        <Series.Sequence name="11 Habit loop" durationInFrames={5 * fps} premountFor={fps}>
          <HabitLoopScene />
        </Series.Sequence>
        <Series.Sequence name="12 Ending" durationInFrames={6 * fps} premountFor={fps}>
          <EndingScene />
        </Series.Sequence>
      </Series>
      <EpisodeAudio />
    </>
  );
};
