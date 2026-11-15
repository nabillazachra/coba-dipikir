// E006: exact single source for voiceover and on-screen captions.
// TTS playback is always 1.00x; schedule is revised against measured durations.
export const voiceoverConfig = {
  engine: {provider: 'edge-tts', voice: 'id-ID-ArdiNeural', rate: '+0%', pitch: '+0Hz', volume: '+0%'},
  style: {language: 'id-ID', tone: 'natural, curious, bittersweet, slightly playful'},
  scenes: [
    {id:'v01',at:1.48,text:'Eh.',rate:'+0%'},
    {id:'v02',at:2.33,text:'Lagu ini.',rate:'+0%'},
    {id:'v03',at:7.43,text:'Cuma beberapa nada.',rate:'+0%'},
    {id:'v04',at:10.12,text:'Tapi tempatnya ikut balik.',rate:'+0%'},
    {id:'v05',at:12.72,text:'Orangnya.',rate:'+0%'},
    {id:'v06',at:14.37,text:'Suasananya.',rate:'+0%'},
    {id:'v07',at:16.49,text:'Bahkan rasanya.',rate:'+0%'},
    {id:'v08',at:19.63,text:'Padahal tadi cuma denger musik.',rate:'+0%'},
    {id:'v09',at:22.43,text:'Kok bisa sekuat itu?',rate:'+0%'},
    {id:'v10',at:26.31,text:'Musik bisa jadi pemicu memori.',rate:'+0%'},
    {id:'v11',at:29.61,text:'Terutama lagu yang familiar.',rate:'+0%'},
    {id:'v12',at:32.41,text:'Dan nyambung sama pengalaman kita.',rate:'+0%'},
    {id:'v13',at:35.56,text:'Bukan cuma ingat tempatnya.',rate:'+0%'},
    {id:'v14',at:38.49,text:'Kadang suasananya terasa hidup lagi.',rate:'+0%'},
    {id:'v15',at:42.45,text:'Tapi...',rate:'+0%'},
    {id:'v16',at:43.88,text:'Nggak semua lagu punya portal.',rate:'+0%'},
    {id:'v17',at:47.24,text:'Kan?',rate:'+0%'},
    {id:'v18',at:49.46,text:'Eh, yang ini...',rate:'+0%'},
    {id:'v19',at:51.36,text:'Malah ingat kejadian itu.',rate:'+0%'},
    {id:'v20',at:54.49,text:'Mungkin itu kenapa lagu lama...',rate:'+0%'},
    {id:'v21',at:57.55,text:'Kadang bawa versi kita yang dulu.',rate:'+0%'},
    {id:'v22',at:60.28,text:'Dan rasanya masih dekat.',rate:'+0%'},
    {id:'v23',at:62.00,text:'Tapi yang satu ini...',rate:'+0%'},
    {id:'v24',at:64.55,text:'Nggak usah diinget!',rate:'+0%'},
  ],
} as const;

export const phraseText = (id: string) =>
  voiceoverConfig.scenes.find((cue) => cue.id === id)?.text ?? '';
