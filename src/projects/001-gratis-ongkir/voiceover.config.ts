export const voiceoverConfig = {
  engine: {
    provider: 'edge-tts',
    voice: 'id-ID-ArdiNeural',
    rate: '+1%',
    pitch: '+2Hz',
    volume: '+0%',
  },
  style: {
    language: 'id-ID',
    tone: 'playful-curious',
    pace: 'medium',
    direction:
      'Conversational Indonesian. Playful, slightly teasing, and energetic without sounding like an announcer. Use deliberate micro-pauses before punchlines.',
  },
  scenes: [
    {
      id: '01-hook',
      text: 'Gratis ongkir enak. Tapi nambah tiga puluh lima ribu cuma buat hemat ongkir sepuluh ribu?',
      rate: '+2%',
      pitch: '+5Hz',
    },
    {
      id: '02-awal',
      text: 'Awalnya simpel: barang tujuh puluh, ongkir sepuluh. Total delapan puluh.',
      rate: '+0%',
      pitch: '+1Hz',
    },
    {
      id: '03-promo',
      text: 'Lalu muncul promo: kurang tiga puluh ribu lagi buat gratis ongkir.',
      rate: '+2%',
      pitch: '+5Hz',
    },
    {
      id: '04-keputusan',
      text: 'Kita cari-cari... ketemu barang tiga puluh lima ribu. Ya sudah, masuk keranjang.',
      rate: '+1%',
      pitch: '+6Hz',
    },
    {
      id: '05-menang',
      text: 'Ongkirnya nol. Mantap.',
      rate: '+5%',
      pitch: '+8Hz',
    },
    {
      id: '05-total',
      text: 'Tapi totalnya jadi seratus lima ribu.',
      rate: '-1%',
      pitch: '+1Hz',
    },
    {
      id: '05-punch',
      text: 'Hemat sepuluh... keluar dua puluh lima ribu lebih banyak.',
      rate: '-3%',
      pitch: '-1Hz',
    },
    {
      id: '06-penutup',
      text: 'Kalau barangnya memang perlu, oke. Tapi kalau nggak ada promo... tetap dibeli?',
      rate: '-1%',
      pitch: '+3Hz',
    },
  ],
} as const;

export type VoiceoverSceneId = (typeof voiceoverConfig.scenes)[number]['id'];

export const voiceText = (id: VoiceoverSceneId) =>
  voiceoverConfig.scenes.find((scene) => scene.id === id)?.text ?? '';
