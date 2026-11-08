import React from 'react';
import {Episode4Visuals} from './Scenes';
import {Episode4Audio} from './EpisodeAudio';
import {Episode4Captions} from './EpisodeCaptions';
export const LiftCloseEpisode:React.FC=()=>(
 <>
  <Episode4Visuals/>
  <Episode4Captions/>
  <Episode4Audio/>
 </>
);
