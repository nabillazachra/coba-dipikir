import type {ComponentType} from 'react';
import {GratisOngkirEpisode} from './projects/001-gratis-ongkir/Composition';
import {projectConfig as gratisOngkirConfig} from './projects/001-gratis-ongkir/project.config';

export type ProjectStatus = 'idea' | 'draft' | 'review' | 'published';

export type ProjectScene = {
  id: string;
  title: string;
  label: string;
  startFrame: number;
  durationInFrames: number;
};

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
  scenes: ProjectScene[];
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
    scenes: [
      {id: 'hook', title: 'Hook', label: '35K buat hemat 10K?', startFrame: 0, durationInFrames: 120},
      {id: 'awal', title: 'Belanja Awal', label: '70K + 10K = 80K', startFrame: 120, durationInFrames: 150},
      {id: 'promo', title: 'Godaan Promo', label: 'Kurang Rp30.000', startFrame: 270, durationInFrames: 150},
      {id: 'keputusan', title: 'Keputusan', label: 'Tambah barang Rp35.000', startFrame: 420, durationInFrames: 150},
      {id: 'reveal', title: 'Reveal', label: '80K vs 105K', startFrame: 570, durationInFrames: 210},
      {id: 'penutup', title: 'Penutup', label: 'Masih hemat?', startFrame: 780, durationInFrames: 210},
    ],
  },
];
