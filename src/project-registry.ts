import type {ComponentType} from 'react';
import {GratisOngkirEpisode} from './projects/001-gratis-ongkir/Composition';
import {projectConfig as gratisOngkirConfig} from './projects/001-gratis-ongkir/project.config';

export type ProjectStatus = 'idea' | 'draft' | 'review' | 'published';

export type ProjectRegistryEntry = {
  id: string;
  episode: number;
  title: string;
  coverText: string;
  category: string;
  status: ProjectStatus;
  compositionId: string;
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  folder: string;
  component: ComponentType;
};

export const projectRegistry: ProjectRegistryEntry[] = [
  {
    id: gratisOngkirConfig.id,
    episode: gratisOngkirConfig.episode,
    title: gratisOngkirConfig.title,
    coverText: gratisOngkirConfig.coverText,
    category: gratisOngkirConfig.category,
    status: gratisOngkirConfig.status,
    compositionId: 'E001-Gratis-Ongkir',
    width: gratisOngkirConfig.width,
    height: gratisOngkirConfig.height,
    fps: gratisOngkirConfig.fps,
    durationInFrames: gratisOngkirConfig.durationInFrames,
    folder: 'src/projects/001-gratis-ongkir',
    component: GratisOngkirEpisode,
  },
];
