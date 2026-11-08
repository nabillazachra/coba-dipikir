// Episode 004 — single source of truth for all spoken/subtitled words.
export const voiceoverConfig = {
  engine: {
    provider: 'edge-tts',
    voice: 'id-ID-ArdiNeural',
    rate: '+15%',
    pitch: '+4Hz',
    volume: '+0%',
  },
  style: {
    language: 'id-ID',
    tone: 'observational-playful',
    direction: 'Conversational and a little impatient. Let the comic silence after CLICK and the final seven clicks land. Never sound like an announcer.',
  },
  scenes: [
    {id:'s01',text:'Pernah buru-buru masuk lift?',rate:'+12%',pitch:'+5Hz'},
    {id:'s02a',text:'Lantainya udah dipencet.',rate:'+11%',pitch:'+3Hz'},
    {id:'s02b',text:'Tapi pintunya…',rate:'-4%',pitch:'+2Hz'},
    {id:'s02c',text:'santai.',rate:'-10%',pitch:'-2Hz'},
    {id:'s03',text:'Untung ada ini.',rate:'+9%',pitch:'+7Hz'},
    {id:'s04',text:'Klik.',rate:'-4%',pitch:'+2Hz'},
    {id:'s05a',text:'Yaudah, pencet lagi.',rate:'+11%',pitch:'+5Hz'},
    {id:'s05b',text:'Siapa tahu…',rate:'+1%',pitch:'+4Hz'},
    {id:'s05c',text:'yang tadi kurang niat.',rate:'+8%',pitch:'+6Hz'},
    {id:'s06a',text:'Dipencet delapan kali…',rate:'+10%',pitch:'+4Hz'},
    {id:'s06b',text:'pintunya tetap santai.',rate:'-6%',pitch:'-1Hz'},
    {id:'s07a',text:'Nah!',rate:'+4%',pitch:'+10Hz'},
    {id:'s07b',text:'Tapi…',rate:'-8%',pitch:'-1Hz'},
    {id:'s08',text:'Emang karena dipencet delapan kali?',rate:'+12%',pitch:'+3Hz'},
    {id:'s09a',text:'Kalau tombolnya aktif…',rate:'+9%',pitch:'+3Hz'},
    {id:'s09b',text:'sekali pencet sebenarnya sudah cukup.',rate:'+14%',pitch:'+5Hz'},
    {id:'s10a',text:'Karena pintu lift juga mengikuti timing…',rate:'+14%',pitch:'+3Hz'},
    {id:'s10b',text:'sensor…',rate:'+7%',pitch:'+5Hz'},
    {id:'s10c',text:'dan pengaturan sistem.',rate:'+11%',pitch:'+3Hz'},
    {id:'s11a',text:'Ada waktu tertentu pintu dibiarkan terbuka…',rate:'+15%',pitch:'+3Hz'},
    {id:'s11b',text:'supaya orang sempat masuk atau keluar.',rate:'+15%',pitch:'+4Hz'},
    {id:'s12a',text:'Kalau sensor masih mendeteksi sesuatu…',rate:'+14%',pitch:'+3Hz'},
    {id:'s12b',text:'ya pintunya nggak bakal nurut sama rasa buru-buru kita.',rate:'+19%',pitch:'+5Hz'},
    {id:'s13',text:'Dan tiap lift bisa punya pengaturan yang beda.',rate:'+17%',pitch:'+4Hz'},
    {id:'s14',text:'Tapi kenapa kita tetap pencet berkali-kali?',rate:'+14%',pitch:'+3Hz'},
    {id:'s15a',text:'Karena menunggu doang rasanya nggak enak.',rate:'+14%',pitch:'+2Hz'},
    {id:'s15b',text:'Pencet tombol bikin kita merasa…',rate:'+14%',pitch:'+4Hz'},
    {id:'s15c',text:'lagi melakukan sesuatu.',rate:'+8%',pitch:'+6Hz'},
    {id:'s17a',text:'Jadi kalau lain kali pintunya belum nutup…',rate:'+15%',pitch:'+3Hz'},
    {id:'s17b',text:'pencet sekali aja.',rate:'+6%',pitch:'+4Hz'},
    {id:'s17c',text:'Yang tujuh sisanya…',rate:'-3%',pitch:'+5Hz'},
    {id:'s17d',text:'buat nenangin diri.',rate:'-6%',pitch:'+7Hz'},
  ],
} as const;

export type Episode4VoiceId = (typeof voiceoverConfig.scenes)[number]['id'];
export const phraseText=(id:Episode4VoiceId):string =>
  voiceoverConfig.scenes.find((item)=>item.id===id)?.text??'';
