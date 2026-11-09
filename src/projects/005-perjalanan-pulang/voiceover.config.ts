// Same phrase text is used for Edge TTS AND exact on-screen captions.
export const voiceoverConfig={
engine:{provider:'edge-tts',voice:'id-ID-ArdiNeural',rate:'+24%',pitch:'+4Hz',volume:'+0%'},
style:{language:'id-ID',tone:'conversational-playful'},
scenes:[
{id:'v01',text:'Pernah pergi ke suatu tempat...',rate:'+24%'},
{id:'v02',text:'terus rasanya lama banget?',rate:'+20%'},
{id:'v03',text:'Lihat jam. Baru satu menit.',rate:'+14%'},
{id:'v05',text:'Padahal perjalanannya biasa aja.',rate:'+26%'},
{id:'v06',text:'Tapi kok terasa panjang banget?',rate:'+26%'},
{id:'v07',text:'Cek peta lagi. Tujuh belas menit?',rate:'+30%'},
{id:'v09',text:'Akhirnya sampai.',rate:'+16%'},
{id:'v10',text:'Pas pulang, waktunya sama.',rate:'+24%'},
{id:'v11',text:'Tapi kok rasanya lebih cepet?',rate:'+22%'},
{id:'v12',text:'Padahal jaraknya... ya sama.',rate:'+18%'},
{id:'v13',text:'Rasanya kayak jalannya dilipat!',rate:'+27%'},
{id:'v14',text:'Ini sering disebut return trip effect.',rate:'+28%'},
{id:'v15',text:'Bukan jalannya mendadak lebih pendek.',rate:'+28%'},
{id:'v16',text:'Salah satunya: ekspektasi.',rate:'+25%'},
{id:'v17',text:'Pergi dikira sebentar. Ternyata lama.',rate:'+27%'},
{id:'v19',text:'Pulang, sudah punya patokan.',rate:'+29%'},
{id:'v20',text:'Jadi terasa lebih ringan.',rate:'+22%'},
{id:'v21',text:'Bukan cuma hafal jalan.',rate:'+29%'},
{id:'v22',text:'Rute berbeda pun bisa.',rate:'+30%'},
{id:'v23',text:'Pergi nggak pasti. Pulang lebih terbayang.',rate:'+28%'},
{id:'v25',text:'Jadi, waktunya bisa sama...',rate:'+19%'},
{id:'v26',text:'Tapi rasanya yang berubah.',rate:'+24%'},
{id:'v27',text:'Sampai rumah.',rate:'+25%'},
{id:'v28',text:'Barang ketinggalan!',rate:'+28%'},
{id:'v29',text:'Nah. Jauh lagi.',rate:'+25%'}
]} as const;
export const phraseText=(id:string)=>voiceoverConfig.scenes.find(s=>s.id===id)?.text??'';
