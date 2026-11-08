export const voiceoverConfig = {
  engine: {
    provider: 'edge-tts',
    voice: 'id-ID-ArdiNeural',
    rate: '+0%',
    pitch: '+2Hz',
    volume: '+0%',
  },
  style: {
    language: 'id-ID',
    tone: 'playful-curious',
    pace: 'medium',
    direction:
      'Conversational Indonesian. Playful and slightly teasing, with clear contrast between setup and punchline. Never sound like an announcer. Use short pauses and varied energy.',
  },
  scenes: [
    {
      id: '01-hook',
      text: 'Gratis ongkir memang enak. Tapi... nambah tiga puluh lima ribu buat ngilangin ongkir sepuluh ribu?',
      rate: '+1%',
      pitch: '+5Hz',
    },
    {
      id: '02-awal',
      text: 'Padahal awalnya simpel: barang tujuh puluh, ongkir sepuluh. Total delapan puluh.',
      rate: '-2%',
      pitch: '+1Hz',
    },
    {
      id: '03-promo',
      text: 'Terus muncul tulisan kecil yang mulai bahaya: kurang tiga puluh ribu lagi.',
      rate: '+2%',
      pitch: '+6Hz',
    },
    {
      id: '04-keputusan',
      text: 'Dan entah kenapa... kita nemu barang tiga puluh lima ribu. Cocok banget, ya?',
      rate: '+1%',
      pitch: '+7Hz',
    },
    {
      id: '05-menang',
      text: 'Ongkirnya nol. Mantap.',
      rate: '+5%',
      pitch: '+8Hz',
    },
    {
      id: '05-total',
      text: 'Tapi total belanjanya jadi seratus lima ribu.',
      rate: '-1%',
      pitch: '+1Hz',
    },
    {
      id: '05-punch',
      text: 'Jadi hemat sepuluh... sambil keluar dua puluh lima ribu lebih banyak.',
      rate: '-5%',
      pitch: '-2Hz',
    },
    {
      id: '06-penutup',
      text: 'Kalau barangnya memang perlu, ya oke. Tapi kalau nggak ada promo... tadi tetap dibeli?',
      rate: '-2%',
      pitch: '+3Hz',
    },
  ],
} as const;


export type VoiceoverSceneId = (typeof voiceoverConfig.scenes)[number]['id'];

export const voiceText = (id: VoiceoverSceneId) =>
  voiceoverConfig.scenes.find((scene) => scene.id === id)?.text ?? '';
