// Exact spoken text is shared with per-phrase captions. Playback is ALWAYS 1.0x.
// Production instruction: no VO time stretching; allow the scene to breathe.
export const voiceoverConfig={
engine:{provider:'edge-tts',voice:'id-ID-ArdiNeural',rate:'+5%',pitch:'+2Hz',volume:'+0%'},
style:{language:'id-ID',tone:'observational, conversational, playful, relaxed'},
scenes:[
{id:'v01',text:'Pergi kok lama banget, ya?',rate:'+5%'},
{id:'v03',text:'Baru semenit?',rate:'+5%'},
{id:'v05',text:'Jalannya biasa aja.',rate:'+5%'},
{id:'v06',text:'Kok panjang banget?',rate:'+5%'},
{id:'v07',text:'Masih tujuh belas menit?',rate:'+5%'},
{id:'v09',text:'Akhirnya sampai.',rate:'+5%'},
{id:'v10',text:'Pulang, waktunya sama.',rate:'+5%'},
{id:'v11',text:'Tapi kok terasa lebih cepat?',rate:'+5%'},
{id:'v12',text:'Padahal jaraknya sama.',rate:'+5%'},
{id:'v13',text:'Rasanya kayak jalannya dilipat!',rate:'+5%'},
{id:'v14',text:'Return trip effect.',rate:'+5%'},
{id:'v15',text:'Jalannya nggak dipotong.',rate:'+5%'},
{id:'v16',text:'Ekspektasi juga berperan.',rate:'+5%'},
{id:'v17',text:'Ternyata lebih lama!',rate:'+5%'},
{id:'v19',text:'Pulang sudah punya patokan.',rate:'+5%'},
{id:'v21',text:'Rute berbeda pun bisa.',rate:'+5%'},
{id:'v23',text:'Pulang lebih terbayang.',rate:'+5%'},
{id:'v25',text:'Waktunya sama...',rate:'+5%'},
{id:'v26',text:'Rasanya beda.',rate:'+5%'},
{id:'v27',text:'Sampai!',rate:'+5%'},
{id:'v28',text:'Eh, barang ketinggalan!',rate:'+5%'},
{id:'v29',text:'Nah. Jauh lagi.',rate:'+5%'}
]} as const;
export const phraseText=(id:string)=>voiceoverConfig.scenes.find(s=>s.id===id)?.text??'';
