export const voiceoverConfig = {
  engine: {
    provider: 'edge-tts',
    voice: 'id-ID-ArdiNeural',
    rate: '+0%',
    pitch: '+3Hz',
    volume: '+0%',
  },
  style: {
    language: 'id-ID',
    tone: 'playful-observant',
    pace: 'middle',
    direction:
      'Conversational Indonesian. Slightly mischievous and curious, like telling a relatable observation to a friend. Leave short reaction pauses and never sound like a documentary narrator.',
  },
  scenes: [
    {id: '01-midnight', text: 'Jam dua belas lewat...', rate: '-4%', pitch: '+1Hz'},
    {id: '02-why', text: 'dan entah kenapa...', rate: '-3%', pitch: '+4Hz'},
    {id: '02-kitchen', text: 'kita ke dapur.', rate: '+0%', pitch: '+5Hz'},
    {id: '03-open', text: 'Buka kulkas.', rate: '+2%', pitch: '+5Hz'},
    {id: '03-look', text: 'Lihat isinya.', rate: '-1%', pitch: '+3Hz'},
    {id: '04-but', text: 'Padahal...', rate: '-7%', pitch: '-1Hz'},
    {id: '04-know', text: 'kita tahu isinya apa.', rate: '-2%', pitch: '+1Hz'},
    {id: '05-nothing', text: 'Nggak ada yang baru.', rate: '-2%', pitch: '-2Hz'},
    {id: '06-five', text: 'Lima menit kemudian...', rate: '-2%', pitch: '+4Hz'},
    {id: '06-again', text: 'dicek lagi.', rate: '+4%', pitch: '+7Hz'},
    {id: '08-question', text: 'Kenapa kita buka kulkas... padahal tahu isinya?', rate: '-1%', pitch: '+3Hz'},
    {id: '09-not-hungry', text: 'Ternyata, kita nggak selalu buka kulkas karena lapar.', rate: '+0%', pitch: '+2Hz'},
    {id: '10-bored', text: 'Kadang kita cuma bosan...', rate: '-2%', pitch: '+3Hz'},
    {id: '10-reward', text: 'dan otak lagi nyari hadiah kecil.', rate: '+1%', pitch: '+5Hz'},
    {id: '11-habit', text: 'Lama-lama, gerakannya jadi kebiasaan.', rate: '+0%', pitch: '+2Hz'},
    {id: '11-bored', text: 'Bosan sedikit...', rate: '-3%', pitch: '+5Hz'},
    {id: '11-check', text: 'cek kulkas.', rate: '+6%', pitch: '+8Hz'},
    {id: '12-maybe', text: 'Jadi mungkin...', rate: '-5%', pitch: '+1Hz'},
    {id: '12-not-food', text: 'yang kita cari bukan makanan.', rate: '-2%', pitch: '+1Hz'},
    {id: '12-something', text: 'Kita cuma pengin... menemukan sesuatu.', rate: '-4%', pitch: '+2Hz'},
  ],
} as const;

export type VoiceoverSceneId = (typeof voiceoverConfig.scenes)[number]['id'];

export const voiceText = (id: VoiceoverSceneId) =>
  voiceoverConfig.scenes.find((scene) => scene.id === id)?.text ?? '';
