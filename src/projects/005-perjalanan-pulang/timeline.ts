export const scenePlan=[
{id:'opening',title:'Sudah Sampai?',label:'Cabin POV — 23 menit',start:0,end:3.35},
{id:'clock',title:'Jam Tidak Bergerak',label:'15:07 → 15:08',start:3.35,end:6.1},
{id:'outbound',title:'Perjalanan Pergi',label:'City side-scroll with 3-layer parallax',start:6.1,end:11.05},
{id:'checks',title:'Are We There Yet?',label:'Phone, window, map, watch',start:11.05,end:14.45},
{id:'arrival',title:'Sampai',label:'Wide destination',start:14.45,end:16.5},
{id:'return',title:'Waktu Sama',label:'Turnaround and 23 MIN',start:16.5,end:19.2},
{id:'flow',title:'Pulang Mengalir',label:'Reverse landmarks, relaxed acting',start:19.2,end:23.2},
{id:'fold',title:'Perjalanan Pulang Melipat',label:'Signature route accordion compression',start:23.2,end:29.6},
{id:'effect',title:'Return Trip Effect',label:'Paired equal-duration journeys',start:29.6,end:32.65},
{id:'scissors',title:'Memotong Jalan?',label:'Road scissors gag',start:32.65,end:35.2},
{id:'expect',title:'Ekspektasi Pergi',label:'Estimated vs experienced time',start:35.2,end:40.3},
{id:'adjust',title:'Ekspektasi Pulang',label:'Recalibrated time benchmark',start:40.3,end:44.1},
{id:'alternate',title:'Bukan Cuma Hafal',label:'Alternative return route top view',start:44.1,end:47.5},
{id:'unknown',title:'Ketidakpastian',label:'Fog of questions clears',start:47.5,end:50.4},
{id:'montage',title:'View Perjalanan',label:'Window, wheel, map, character',start:50.4,end:53},
{id:'compare',title:'Persepsinya Berubah',label:'23 MIN vs 23 MIN',start:53,end:55.15},
{id:'home',title:'Tiba di Rumah',label:'23-minute homecoming',start:55.15,end:56.8},
{id:'forgotten',title:'Barang Tertinggal',label:'The road stretches long again',start:56.8,end:62.2},
{id:'brand',title:'End Card',label:'Coba Dipikir 005',start:62.2,end:65}
] as const;
export type SceneId=(typeof scenePlan)[number]['id'];
export const phrasePlan:ReadonlyArray<{id:string;at:number;highlight?:string}>=[
{id:'v01',at:.38,highlight:'lama banget'},
{id:'v03',at:3.55},
{id:'v05',at:6.32},{id:'v06',at:8.7,highlight:'panjang'},
{id:'v07',at:11.2,highlight:'tujuh belas menit'},
{id:'v09',at:14.56},{id:'v10',at:16.6,highlight:'dua puluh tiga menit'},
{id:'v11',at:19.46,highlight:'lebih cepat'},
{id:'v12',at:23.45},{id:'v13',at:26.05,highlight:'dilipat'},
{id:'v14',at:29.78,highlight:'return trip effect'},
{id:'v15',at:32.72},{id:'v16',at:35.32,highlight:'ekspektasi'},
{id:'v17',at:37.8},
{id:'v19',at:40.48},
{id:'v21',at:44.45},{id:'v23',at:47.56},
{id:'v25',at:50.55},{id:'v26',at:53.13,highlight:'beda'},
{id:'v27',at:55.28},{id:'v28',at:57.0},{id:'v29',at:59.33}
];
export const EPISODE_SECONDS=65;
