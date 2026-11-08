import type {ComponentType} from 'react';
import {GratisOngkirEpisode} from './projects/001-gratis-ongkir/Composition';
import {projectConfig as gratisOngkirConfig} from './projects/001-gratis-ongkir/project.config';
import {KulkasEpisode} from './projects/002-kulkas/Composition';
import {projectConfig as kulkasConfig} from './projects/002-kulkas/project.config';
import {Harga99000Episode} from './projects/003-harga-99000/Composition';
import {projectConfig as harga99000Config} from './projects/003-harga-99000/project.config';
import {scenePlan as harga99000Scenes} from './projects/003-harga-99000/timeline';
import {LiftCloseEpisode} from './projects/004-lift-close/Composition';
import {projectConfig as liftCloseConfig} from './projects/004-lift-close/project.config';
import {scenePlan as liftCloseScenes} from './projects/004-lift-close/timeline';

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
      {id: 'hook', title: 'Hook', label: '35K buat hemat 10K?', startFrame: 0, durationInFrames: 174},
      {id: 'awal', title: 'Belanja Awal', label: '70K + 10K = 80K', startFrame: 174, durationInFrames: 156},
      {id: 'promo', title: 'Godaan Promo', label: 'Kurang Rp30.000', startFrame: 330, durationInFrames: 174},
      {id: 'keputusan', title: 'Keputusan', label: 'Tambah barang Rp35.000', startFrame: 504, durationInFrames: 186},
      {id: 'reveal', title: 'Reveal', label: '80K vs 105K', startFrame: 690, durationInFrames: 255},
      {id: 'penutup', title: 'Penutup', label: 'Tanpa promo, tetap dibeli?', startFrame: 945, durationInFrames: 210},
    ],
  },
  {
    id: kulkasConfig.id,
    episode: kulkasConfig.episode,
    title: kulkasConfig.title,
    coverText: kulkasConfig.coverText,
    category: kulkasConfig.category,
    status: kulkasConfig.status,
    compositionId: 'E002-Kenapa-Buka-Kulkas',
    width: kulkasConfig.width,
    height: kulkasConfig.height,
    fps: kulkasConfig.fps,
    durationInFrames: kulkasConfig.durationInFrames,
    folder: 'src/projects/002-kulkas',
    component: KulkasEpisode,
    scenes: [
      {id: 'midnight', title: 'Jam Tengah Malam', label: '00:13 · jalan ke dapur', startFrame: 0, durationInFrames: 120},
      {id: 'approach', title: 'Tujuannya Sudah Jelas', label: 'Tatap kulkas · tatap kamera', startFrame: 120, durationInFrames: 120},
      {id: 'open', title: 'Buka Kulkas', label: 'Lighting reveal dramatis', startFrame: 240, durationInFrames: 150},
      {id: 'investigate', title: 'Investigasi', label: 'Detektif berlebihan · wadah biasa', startFrame: 390, durationInFrames: 150},
      {id: 'close', title: 'Tutup Kulkas', label: 'Nggak ada yang baru', startFrame: 540, durationInFrames: 90},
      {id: 'five-minutes', title: '5 Menit Kemudian', label: 'Hard cut · balik lagi', startFrame: 630, durationInFrames: 120},
      {id: 'same-again', title: 'Isinya Tetap Sama', label: 'Deadpan + awkward hum', startFrame: 750, durationInFrames: 120},
      {id: 'question', title: 'Pertanyaan', label: 'Kenapa buka kulkas padahal tahu isinya?', startFrame: 870, durationInFrames: 120},
      {id: 'not-hungry', title: 'Bukan Selalu Lapar', label: 'Lapar vs bosan', startFrame: 990, durationInFrames: 120},
      {id: 'reward', title: 'Bosan & Reward', label: 'Otak cari hadiah kecil', startFrame: 1110, durationInFrames: 150},
      {id: 'habit', title: 'Habit Loop', label: 'Bosan → buka → cek → tutup', startFrame: 1260, durationInFrames: 150},
      {id: 'ending', title: 'Ending', label: 'Bukan makanan · menemukan sesuatu', startFrame: 1410, durationInFrames: 180},
    ],
  },
  {
    id: harga99000Config.id,
    episode: harga99000Config.episode,
    title: harga99000Config.title,
    coverText: harga99000Config.coverText,
    category: harga99000Config.category,
    status: harga99000Config.status,
    compositionId: 'E003-Harga-99000',
    width: harga99000Config.width,
    height: harga99000Config.height,
    fps: harga99000Config.fps,
    durationInFrames: harga99000Config.durationInFrames,
    folder: 'src/projects/003-harga-99000',
    component: Harga99000Episode,
    scenes: harga99000Scenes.map((scene) => ({
      id: scene.id,
      title: scene.title,
      label: scene.label,
      startFrame: Math.round(scene.start * harga99000Config.fps),
      durationInFrames: Math.round((scene.end - scene.start) * harga99000Config.fps),
    })),
  },
  {
    id: liftCloseConfig.id,
    episode: liftCloseConfig.episode,
    title: liftCloseConfig.title,
    coverText: liftCloseConfig.coverText,
    category: liftCloseConfig.category,
    status: liftCloseConfig.status,
    compositionId: 'E004-Close-Lift',
    width: liftCloseConfig.width,
    height: liftCloseConfig.height,
    fps: liftCloseConfig.fps,
    durationInFrames: liftCloseConfig.durationInFrames,
    folder: 'src/projects/004-lift-close',
    component: LiftCloseEpisode,
    scenes: liftCloseScenes.map((scene) => ({
      id: scene.id,
      title: scene.title,
      label: scene.label,
      startFrame: Math.round(scene.start * liftCloseConfig.fps),
      durationInFrames: Math.round((scene.end - scene.start) * liftCloseConfig.fps),
    })),
  },
];
