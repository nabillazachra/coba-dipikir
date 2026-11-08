export const voiceoverConfig = {
  engine: {
    provider: 'edge-tts',
    voice: 'id-ID-ArdiNeural',
    rate: '+5%',
    pitch: '+0Hz',
    volume: '+0%',
  },
  style: {
    language: 'id-ID',
    tone: 'casual-curious',
    pace: 'medium',
    direction:
      'Natural Indonesian delivery. Conversational, observant, slightly playful. Avoid announcer energy and avoid sounding instructional.',
  },
  scenes: [
    {
      id: '01-hook',
      text: 'Nambah belanja tiga puluh lima ribu supaya nggak bayar ongkir sepuluh ribu. Pernah?',
    },
    {
      id: '02-belanja-awal',
      text: 'Awalnya, barang tujuh puluh ribu. Ongkir sepuluh ribu. Total, delapan puluh ribu.',
    },
    {
      id: '03-godaan-promo',
      text: 'Lalu muncul: tambah tiga puluh ribu lagi buat gratis ongkir.',
    },
    {
      id: '04-keputusan',
      text: 'Ketemu barang tiga puluh lima ribu. Tambah. Gratis ongkir!',
    },
    {
      id: '05-reveal',
      text: 'Tapi totalnya sekarang seratus lima ribu. Kita keluar dua puluh lima ribu lebih banyak.',
    },
    {
      id: '06-penutup',
      text: 'Kalau barangnya perlu, bisa masuk akal. Tapi tanpa promo, barang itu tetap kamu beli?',
    },
  ],
} as const;
