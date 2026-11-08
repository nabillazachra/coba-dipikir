import type {Episode3VoiceId} from './voiceover.config';

export const scenePlan = [
  {id:'compare', title:'Dua Harga', start:0, end:4.75, label:'Dua produk yang identik'},
  {id:'choice', title:'Yang Murah', start:4.75, end:8.4, label:'Langsung memilih 99 ribu'},
  {id:'difference', title:'Selisih Seribu', start:8.4, end:13.6, label:'Selisihnya ternyata kecil'},
  {id:'distance', title:'Terasa Jauh', start:13.6, end:17.8, label:'Jarak yang dilebih-lebihkan'},
  {id:'first-digit', title:'Angka Pertama', start:17.8, end:23.5, label:'Mata berhenti di digit pertama'},
  {id:'brain', title:'Otak Mengelompokkan', start:23.5, end:32.18, label:'90 ribuan vs 100 ribu'},
  {id:'effect', title:'Left-Digit Effect', start:32.18, end:35.55, label:'Konsep dalam satu gestur'},
  {id:'other-prices', title:'Harga yang Familiar', start:35.55, end:41.15, label:'99.900 mental kembali'},
  {id:'calculator', title:'Tetap Menghitung', start:41.15, end:45.9, label:'Selisih tetap Rp1.000'},
  {id:'impression', title:'Kesan Pertama', start:45.9, end:51.25, label:'Angka pertama mengubah kesan'},
  {id:'ending', title:'Penutup Jahil', start:51.25, end:60.35, label:'Tetap pilih 99 ribu'},
  {id:'brand', title:'Final Card', start:60.35, end:62, label:'Yang biasa belum tentu sederhana'},
] as const;

export type Episode3SceneId = (typeof scenePlan)[number]['id'];

// Starts are shared by VO and subtitle. The measured MP3 duration determines
// exactly how long the corresponding subtitle stays visible.
export const phrasePlan: ReadonlyArray<{id: Episode3VoiceId; at: number; highlight?: string}> = [
  {id:'s01-choose', at:.18},
  {id:'s01-ninety-nine', at:1.18, highlight:'Rp99 ribu'},
  {id:'s01-hundred', at:3.06, highlight:'Rp100 ribu'},
  {id:'s02-cheaper', at:4.87, highlight:'lebih murah'},
  {id:'s02-but', at:7.33, highlight:'Tapi'},
  {id:'s03-difference', at:8.7},
  {id:'s03-one-thousand', at:11.0, highlight:'seribu rupiah'},
  {id:'s04-feels', at:13.86},
  {id:'s04-far', at:15.95},
  {id:'s05-brain', at:18.05},
  {id:'s05-left', at:21.48, highlight:'paling kiri'},
  {id:'s06-group', at:23.56, highlight:'Rp99 ribu'},
  {id:'s06-nineties', at:27.08, highlight:'sembilan puluh ribuan'},
  {id:'s06-but-hundred', at:28.63, highlight:'Rp100 ribu'},
  {id:'s06-hundred-feels', at:30.47, highlight:'seratus ribu'},
  {id:'s07-effect', at:32.32, highlight:'left-digit effect'},
  {id:'s08-often', at:35.75},
  {id:'s08-round', at:38.33, highlight:'sebelum angka bulat'},
  {id:'s09-not-fooled', at:41.4, highlight:'tidak selalu tertipu'},
  {id:'s09-know', at:43.68, highlight:'bedanya kecil'},
  {id:'s10-glance', at:46.15},
  {id:'s10-impression', at:48.65, highlight:'angka pertama'},
  {id:'s11-next', at:51.48, highlight:'Rp99 ribu'},
  {id:'s11-look', at:54.58, highlight:'bukan cuma angka depannya'},
  {id:'s11-punch', at:57.76, highlight:'seribu tetap seribu'},
];
export const EPISODE_SECONDS = 62;
export const EPISODE_FPS = 30;
