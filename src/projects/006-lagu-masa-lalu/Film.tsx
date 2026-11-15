import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {LaguActingProof} from './ActingProof';
import {BusMemory, ReturnQuestion, CueRoom, WrongSong, SuddenMemory,
  Bittersweet, EndingCringe} from './FilmWorlds';
import {Episode6Audio} from './FilmAudio';
import {Episode6Captions} from './FilmCaptions';
import {DURATION_SECONDS} from './timeline';

// Approved 7-second proof is reused unchanged. All later worlds are
// continuous full-bleed scenes; no infographic cards or generic fades.
// The parent composition is 67 s / 2010f at 30 fps.
export const LaguMasaLaluEpisode:React.FC=()=>{
  const {fps}=useVideoConfig();
  return <AbsoluteFill style={{background:'#F6F0E5',overflow:'hidden'}}>
    <Sequence from={0} durationInFrames={7*fps} premountFor={fps}>
      <LaguActingProof />
    </Sequence>
    <Sequence from={7*fps} durationInFrames={12*fps} premountFor={fps}>
      <BusMemory />
    </Sequence>
    <Sequence from={19*fps} durationInFrames={7*fps} premountFor={fps}>
      <ReturnQuestion />
    </Sequence>
    <Sequence from={26*fps} durationInFrames={16*fps} premountFor={fps}>
      <CueRoom />
    </Sequence>
    <Sequence from={42*fps} durationInFrames={7*fps} premountFor={fps}>
      <WrongSong />
    </Sequence>
    <Sequence from={49*fps} durationInFrames={5*fps} premountFor={fps}>
      <SuddenMemory />
    </Sequence>
    <Sequence from={54*fps} durationInFrames={7*fps} premountFor={fps}>
      <Bittersweet />
    </Sequence>
    <Sequence from={61*fps} durationInFrames={(DURATION_SECONDS-61)*fps} premountFor={fps}>
      <EndingCringe />
    </Sequence>
    <Episode6Audio />
    <Episode6Captions />
  </AbsoluteFill>;
};
