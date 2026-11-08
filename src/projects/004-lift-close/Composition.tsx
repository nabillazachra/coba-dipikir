import React from 'react';
import {CinematicEpisode4Visuals} from './CinematicScenes';
import {Episode4Audio} from './EpisodeAudio';
import {Episode4Captions} from './EpisodeCaptions';
export const LiftCloseEpisode:React.FC=()=>(
 <>
  <CinematicEpisode4Visuals/>
  <Episode4Captions/>
  <Episode4Audio/>
 </>
);
