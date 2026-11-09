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
{id:'forgotten',title:'Barang Tertinggal',label:'The road stretches long again',start:56.8,end:58.8},
{id:'brand',title:'End Card',label:'Coba Dipikir 005',start:58.8,end:60}
] as const;
export type SceneId=(typeof scenePlan)[number]['id'];
export const phrasePlan:ReadonlyArray<{id:string;at:number;highlight?:string}>=[
{id:'v01',at:.2},{id:'v02',at:1.65,highlight:'lama banget'},
{id:'v03',at:3.42}
{id:'v05',at:6.2},{id:'v06',at:8.55,highlight:'panjang'},
{id:'v07',at:11.1}
{id:'v09',at:14.57},{id:'v10',at:16.62,highlight:'sama'},
{id:'v11',at:19.3,highlight:'lebih cepet'},
{id:'v12',at:23.32},{id:'v13',at:26.27,highlight:'dilipat'},
{id:'v14',at:29.7,highlight:'return trip effect'},
{id:'v15',at:32.75},{id:'v16',at:35.28,highlight:'ekspektasi'},
{id:'v17',at:37.08}
{id:'v19',at:40.41},{id:'v20',at:42.28},
{id:'v21',at:44.16},{id:'v22',at:45.83},
{id:'v23',at:47.54}
{id:'v25',at:50.51},{id:'v26',at:53.1,highlight:'merasakannya'},
{id:'v27',at:55.22},{id:'v28',at:56.75},{id:'v29',at:58.04}
];
export const EPISODE_SECONDS=60;
