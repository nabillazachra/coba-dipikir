export const voiceoverConfig = {
  engine: {
    provider: 'edge-tts',
    voice: 'id-ID-ArdiNeural',
    rate: '-2%',
    pitch: '+2Hz',
    volume: '+0%',
  },
  style: {
    language: 'id-ID',
    tone: 'casual-curious-playful',
    pace: 'deliberate',
    direction:
      'Natural Indonesian delivery. Conversational, observant, slightly mischievous. Leave room for reactions and punchlines. Avoid announcer energy.',
  },
  scenes: [
    {id: '01-hook-a', text: 'Nambah belanja tiga puluh lima ribu...'},
    {id: '01-hook-b', text: 'cuma biar ongkir sepuluh ribu hilang.'},
    {id: '01-hook-c', text: 'Nah, pernah?'},

    {id: '02-awal-a', text: 'Awalnya simpel.'},
    {id: '02-awal-b', text: 'Barang tujuh puluh ribu. Ongkir sepuluh ribu.'},
    {id: '02-awal-c', text: 'Totalnya delapan puluh ribu. Aman.'},

    {id: '03-promo-a', text: 'Terus muncul kalimat sakti.'},
    {id: '03-promo-b', text: 'Kurang tiga puluh ribu lagi buat gratis ongkir.'},
    {id: '03-promo-c', text: 'Nah, mulai.'},

    {id: '04-keputusan-a', text: 'Lalu, entah kenapa, kita nemu barang tiga puluh lima ribu.'},
    {id: '04-keputusan-b', text: 'Ya sudah... masuk keranjang.'},
    {id: '04-keputusan-c', text: 'Dan... gratis ongkir.'},

    {id: '05-reveal-a', text: 'Ongkirnya memang nol.'},
    {id: '05-reveal-b', text: 'Tapi totalnya jadi seratus lima ribu.'},
    {id: '05-reveal-c', text: 'Jadi demi hemat sepuluh ribu...'},
    {id: '05-reveal-d', text: 'kita keluar dua puluh lima ribu lebih banyak.'},

    {id: '06-penutup-a', text: 'Kalau barangnya memang perlu, ya masuk akal.'},
    {id: '06-penutup-b', text: 'Tapi coba jujur...'},
    {id: '06-penutup-c', text: 'kalau nggak ada promo, tadi tetap dibeli?'},
  ],
} as const;
