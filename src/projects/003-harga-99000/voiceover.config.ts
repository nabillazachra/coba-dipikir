export const voiceoverConfig = {
  engine: {
    provider: 'edge-tts',
    voice: 'id-ID-ArdiNeural',
    rate: '+6%',
    pitch: '+3Hz',
    volume: '+0%',
  },
  style: {
    language: 'id-ID',
    tone: 'curious-playful',
    direction:
      'Natural conversational Indonesian. Jaunty and observant, slightly mischievous. Pause after contrast and punchlines. Avoid announcer energy.',
  },
  scenes: [
    {id:'s01-choose', text:'Coba pilih.', rate:'+3%', pitch:'+4Hz'},
    {id:'s01-ninety-nine', text:'Rp99 ribu…', rate:'+4%', pitch:'+5Hz'},
    {id:'s01-hundred', text:'atau Rp100 ribu?', rate:'+4%', pitch:'+6Hz'},
    {id:'s02-cheaper', text:'Yang ini jelas lebih murah.', rate:'+6%', pitch:'+5Hz'},
    {id:'s02-but', text:'Tapi…', rate:'-6%', pitch:'-1Hz'},
    {id:'s03-difference', text:'Bedanya…', rate:'-5%', pitch:'+1Hz'},
    {id:'s03-one-thousand', text:'cuma seribu rupiah.', rate:'+3%', pitch:'+6Hz'},
    {id:'s04-feels', text:'Tapi kok rasanya…', rate:'-1%', pitch:'+3Hz'},
    {id:'s04-far', text:'beda jauh?', rate:'-3%', pitch:'+6Hz'},
    {id:'s05-brain', text:'Karena otak kita cepat banget membaca…', rate:'+10%', pitch:'+3Hz'},
    {id:'s05-left', text:'angka yang paling kiri.', rate:'+2%', pitch:'+5Hz'},
    {id:'s06-group', text:'Jadinya, Rp99 ribu terasa masuk kelompok…', rate:'+9%', pitch:'+3Hz'},
    {id:'s06-nineties', text:'sembilan puluh ribuan.', rate:'+4%', pitch:'+5Hz'},
    {id:'s06-but-hundred', text:'Sementara Rp100 ribu…', rate:'+6%', pitch:'+3Hz'},
    {id:'s06-hundred-feels', text:'sudah terasa seratus ribu.', rate:'+5%', pitch:'+3Hz'},
    {id:'s07-effect', text:'Efek ini sering disebut left-digit effect.', rate:'+7%', pitch:'+3Hz'},
    {id:'s08-often', text:'Makanya kita sering ketemu harga…', rate:'+7%', pitch:'+3Hz'},
    {id:'s08-round', text:'yang berhenti tepat sebelum angka bulat.', rate:'+8%', pitch:'+3Hz'},
    {id:'s09-not-fooled', text:'Bukan berarti kita selalu tertipu.', rate:'+7%', pitch:'+2Hz'},
    {id:'s09-know', text:'Kita tetap tahu bedanya kecil.', rate:'+7%', pitch:'+3Hz'},
    {id:'s10-glance', text:'Tapi saat lihat harga sekilas…', rate:'+7%', pitch:'+3Hz'},
    {id:'s10-impression', text:'angka pertama bisa ngubah kesan.', rate:'+6%', pitch:'+5Hz'},
    {id:'s11-next', text:'Jadi lain kali lihat Rp99 ribu…', rate:'+6%', pitch:'+3Hz'},
    {id:'s11-look', text:'coba lihat bukan cuma angka depannya.', rate:'+7%', pitch:'+3Hz'},
    {id:'s11-punch', text:'Ya… seribu tetap seribu sih.', rate:'-1%', pitch:'+7Hz'},
  ],
} as const;

export type Episode3VoiceId = (typeof voiceoverConfig.scenes)[number]['id'];
export const phraseText = (id: Episode3VoiceId): string =>
  voiceoverConfig.scenes.find((item) => item.id === id)?.text ?? '';
