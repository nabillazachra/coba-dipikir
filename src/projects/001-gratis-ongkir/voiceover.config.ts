export const voiceoverConfig = {
  engine: {
    provider: 'edge-tts',
    voice: 'id-ID-ArdiNeural',
    rate: '-4%',
    pitch: '+1Hz',
    volume: '+0%',
  },
  style: {
    language: 'id-ID',
    tone: 'dry-playful',
    pace: 'sparse',
    direction:
      'Short Indonesian punchlines only. Dry, slightly teasing, conversational. Do not narrate what is already obvious on screen. Leave silence after each line.',
  },
  scenes: [
    {id: '01-hook', text: 'Gratis ongkir?'},
    {id: '02-awal', text: 'Barang tujuh puluh. Ongkir sepuluh.'},
    {id: '03-promo', text: 'Kurang tiga puluh.'},
    {id: '04-keputusan', text: 'Kita malah nambah tiga puluh lima.'},
    {id: '05-reveal-a', text: 'Ongkir nol. Total seratus lima.'},
    {id: '05-reveal-b', text: 'Hemat sepuluh. Keluar dua puluh lima.'},
    {id: '06-penutup', text: 'Masih hemat?'},
  ],
} as const;
