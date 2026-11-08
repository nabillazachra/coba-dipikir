import React from 'react';
import {Canvas,Heading,Actor,Lift,Panel,Door,Indicator,PressFinger,Count,SmallStamp,Frame,PAPER,INK,ORANGE,GREEN,range,ease,pulse} from './VisualSystem';
import {scenePlan,type Episode4SceneId} from './timeline';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {publicAsset} from '../../brand/publicAsset';

// All staging is in a 1080x1920 coordinate system:
// heading 300–530, animated action 560–1240, subtitles 1325–1495,
// right UI safety beyond 950 and lower UI 1500–1920.
const BlinkDot:React.FC<{x:number;y:number;visible:number;color?:string}>=({x,y,visible,color=ORANGE})=>(
 <div style={{position:'absolute',left:x,top:y,width:28,height:28,borderRadius:99,
 background:color,opacity:visible,boxShadow:'0 0 21px '+color}}/>
);
const Note:React.FC<{children:React.ReactNode;x:number;y:number;large?:boolean;color?:string;rotate?:number}>=({children,x,y,large=false,color=ORANGE,rotate=-4})=>(
  <div style={{position:'absolute',left:x,top:y,rotate:rotate+'deg',fontSize:large?54:28,
    fontWeight:900,letterSpacing:-1.1,color,whiteSpace:'nowrap'}}>{children}</div>
);
const InteriorFloor:React.FC=()=>(
 <div style={{position:'absolute',left:0,right:0,top:1221,height:17,background:'#CBD0C4',opacity:.7}}/>
);
const QuestionMark:React.FC<{x:number;y:number;scale?:number}>=({x,y,scale=1})=>(
 <div style={{position:'absolute',left:x,top:y,fontSize:106,fontWeight:950,color:ORANGE,
 transform:'rotate(9deg) scale('+scale+')',textShadow:'5px 7px 0 rgba(233,107,60,.11)'}}>?</div>
);
const Clock:React.FC<{x:number;y:number;angle?:number;size?:number}>=({x,y,angle=0,size=115})=>(
 <svg style={{position:'absolute',left:x,top:y,transform:'rotate('+angle+'deg)'}} width={size} height={size} viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="43" fill="#FFF9F0" stroke={INK} strokeWidth="7"/>
  <path d="M50 18 V50 L72 62" stroke={ORANGE} strokeWidth="7" fill="none" strokeLinecap="round"/>
 </svg>
);
const MiniDoor:React.FC<{x:number;open:number;letter:string;delayLabel:string}>=({x,open,letter,delayLabel})=>(
 <div style={{position:'absolute',left:x,top:705,width:278,height:438}}>
   <div style={{height:55,textAlign:'center',color:INK,fontSize:49,fontWeight:950}}>{letter}</div>
   <div style={{position:'relative',width:278,height:290}}>
     <Door x={0} y={0} w={278} h={290} open={open}/>
   </div>
   <div style={{position:'absolute',top:363,width:'100%',textAlign:'center',
     color:ORANGE,fontSize:31,fontWeight:900}}>{delayLabel}</div>
 </div>
);
const ElevatorScenes:React.FC<{id:Episode4SceneId;t:number}>=({id,t})=>{
 switch(id){
 case 'enter':{
   const walk=range(t,.1,2.0);
   return <>
     <Heading eyebrow="EPISODE 004 · KEJADIAN SEHARI-HARI" size={68}>BURU-BURU<br/><span style={{color:ORANGE}}>MASUK LIFT?</span></Heading>
     <Lift open={1} pressed={0} character={<Actor x={140+235*walk} y={734} width={340}
         expression="worried" walk={t*3.1} lean={15} gaze={8} arm={-48} scarf={Math.sin(t*8)*13}/>}/>
     <Clock x={730} y={551} size={95} angle={t*13}/>
     <Note x={108} y={1166} rotate={-6}>dikejar waktu!</Note>
     <BlinkDot x={940} y={854} visible={pulse(t,2.65,.34)}/>
   </>;
 }
 case 'waiting':{
   const annoyed=t>2.4;
   return <>
    <Heading eyebrow="UDAH PILIH LANTAI 12" size={73}>TAPI PINTUNYA…<br/><span style={{color:ORANGE}}>SANTAI.</span></Heading>
    <Lift open={1} character={<Actor x={336} y={733} width={365}
      expression={annoyed?'annoyed':'curious'} tilt={annoyed?9:-8}
      impatient={annoyed} gaze={t%1.4>.8?9:-8}
      arm={annoyed?26:0} leftArm={30}/>}/>
    {t>2.8&&<Note x={102} y={625} large>…</Note>}
    <Clock x={670} y={576} size={89} angle={t*20}/>
    <InteriorFloor/>
   </>;
 }
 case 'discovery':{
   const p=range(t,.3,1);
   return <>
    <Heading eyebrow="MATA NEMU PENYELAMAT" size={73}>OH! ADA<br/><span style={{color:ORANGE}}>TOMBOL CLOSE.</span></Heading>
    <div style={{position:'absolute',left:100,top:610,width:880,height:600,
      borderRadius:40,background:'#E5E7DC',border:'6px solid #B0BCAF'}}/>
    <Actor x={105} y={748} width={335} expression="realization" tilt={-12} gaze={11} arm={56}/>
    <Panel x={574} y={605} scale={1.13} pressed={0}/>
    <div style={{position:'absolute',left:710,top:940,width:170,height:190,
      borderRadius:999,border:'9px solid '+ORANGE,opacity:p,
      boxShadow:'0 0 45px rgba(233,107,60,.25)'}}/>
    <PressFinger x={801} y={1052} progress={p*.35} size={.78}/>
    <Note x={208} y={1125} color={GREEN}>ketemu!</Note>
   </>;
 }
 case 'click':{
   const push=pulse(t,.55,.33);
   return <>
    <Heading eyebrow="TOMBOLNYA DIPENCET" size={73}>KLIK.<br/><span style={{color:ORANGE}}>…</span></Heading>
    <Lift open={1} pressed={push}
      character={<Actor x={286} y={741} width={370} expression={t<1.1?'excited':'deadpan'}
        arm={t<1?61:21} tilt={t<1?-6:7} gaze={t<1?11:0}/>}/>
    <PressFinger x={941} y={1067} progress={push*.85} size={.61}/>
    {t>1.1&&<Note x={98} y={677} rotate={-5}>masih terbuka.</Note>}
   </>;
 }
 case 'spam':{
   const timings=[.35,1.15,1.7,2.12,2.46,2.78,3.04,3.25];
   const hits=timings.filter(s=>t>=s).length;
   const isDown=Math.max(0,...timings.map(s=>pulse(t,s,.16)));
   const lean=hits<2?3:hits<4?11:hits<8?18:26;
   return <>
    <Heading eyebrow="KALAU BELUM BERGERAK…" size={76}>PENCET<br/><span style={{color:ORANGE}}>LAGI. LAGI.</span></Heading>
    <Lift open={1} pressed={isDown} character={<Actor x={310+lean*.5} y={725} width={360}
      expression={hits<3?'doubtful':hits<7?'annoyed':'surprised'} tilt={lean*.4} lean={lean}
      arm={hits<7?69:78} leftArm={-28} impatient={hits>=3} scarf={Math.sin(t*16)*15}/>}/>
    <PressFinger x={950} y={1068} progress={isDown} size={.68}/>
    {hits>0&&<Count value={'×'+(hits<2?1:hits<4?2:hits<8?4:8)} x={650} y={558}
      scale={1+pulse(t,timings[Math.max(0,hits-1)],.22)*.13}/>}
    {hits>=6&&<Note x={125} y={654}>INI DIA USAHANYA!</Note>}
   </>;
 }
 case 'punch':{
   return <>
    <Heading eyebrow="HASILNYA?" size={74}>DIPENCET <span style={{color:ORANGE}}>8×.</span><br/>PINTU MASIH…</Heading>
    <Lift open={1} character={<Actor x={298} y={735} width={385}
      expression="deadpan" tilt={-2} gaze={0} arm={-10} leftArm={-10}
      impatient={t<.4}/>}/>
    <Count value="×8" x={716} y={566}/>
    <Note x={104} y={1118} rotate={-4} large color={GREEN}>santai.</Note>
    <Clock x={90} y={596} angle={t*18} size={80}/>
   </>;
 }
 case 'close':{
   const closed=range(t,.28,1.77,1,0);
   return <>
    <Heading eyebrow="AKHIRNYA…" size={80}>NAH!<br/><span style={{color:ORANGE}}>…TAPI?</span></Heading>
    <Lift open={closed} character={<Actor x={320} y={733} width={365}
      expression={t<1.6?'happy':'thinking'} tilt={t<1.6?-5:7}
      arm={t<1.6?35:0} gaze={t<1.6?8:-6}/>}/>
    <Note x={113} y={661} rotate={-7}>tuh, berhasil?</Note>
    <BlinkDot x={619} y={581} visible={pulse(t,1.1,.38)}/>
   </>;
 }
 case 'rewind':{
   const r=range(t,0,.7);
   return <>
    <Heading eyebrow="TUNGGU DULU…" size={74}>EMANG<br/><span style={{color:ORANGE}}>KARENA 8×?</span></Heading>
    <div style={{position:'absolute',left:100,top:611,width:858,height:548,border:'7px solid '+INK,
      background:'#E1E8D9',borderRadius:40,transform:'rotate('+(1-r)*-4+'deg)'}}>
      <div style={{fontSize:140,fontWeight:950,textAlign:'center',color:ORANGE,marginTop:45}}>8×</div>
      <div style={{fontSize:64,fontWeight:950,textAlign:'center',color:INK}}>LEBIH CEPAT?</div>
      <div style={{height:10,background:ORANGE,borderRadius:10,margin:'34px 170px'}}/>
    </div>
    <Actor x={245} y={836} width={290} expression="thinking" tilt={12} gaze={-9} arm={24}/>
    <QuestionMark x={713} y={927} scale={.8+.2*r}/>
    <Note x={116} y={1180} rotate={-8}>WHOOP! ↶</Note>
   </>;
 }
 case 'once':{
   const touch=pulse(t,.82,.33);
   return <>
    <Heading eyebrow="KALAU TOMBOLNYA AKTIF" size={73}>SEKALI<br/><span style={{color:ORANGE}}>SUDAH CUKUP.</span></Heading>
    <Lift open={t>3.3?range(t,3.3,4.6,1,.28):1} pressed={touch}
      character={<Actor x={320} y={738} width={343} expression={t>2.4?'thinking':'curious'}
        tilt={t>2.4?8:0} arm={t<2?60:0} gaze={8}/>}/>
    <PressFinger x={950} y={1068} progress={touch} size={.7}/>
    <Count value="×1" x={690} y={552} scale={.9}/>
    <svg width={180} height={100} viewBox="0 0 180 100"
       style={{position:'absolute',left:578,top:923,opacity:range(t,1.05,1.5)}}>
      <path d="M5 52 C44 13 89 95 151 52" stroke={ORANGE} strokeWidth="9" strokeDasharray="15 13"
         fill="none" strokeLinecap="round"/>
      <path d="M132 30 L157 51 L132 73" fill="none" stroke={ORANGE} strokeWidth="9"/>
    </svg>
    {t>2.9&&<Note x={115} y={1102} color={GREEN}>tahan…</Note>}
   </>;
 }
 case 'system':{
   const idx=Math.min(2,Math.floor(t/1.8));
   const reasons=[
    {label:'TIMING',sub:'WAKTU PINTU',color:'#F6D4C0'},
    {label:'SENSOR',sub:'ADA YANG LEWAT?',color:'#E3EADB'},
    {label:'SETTING',sub:'PENGATURAN',color:'#E9E6D4'},
   ] as const;
   return <>
    <Heading eyebrow="BUKAN CUMA SOAL TOMBOL" size={73}>PINTU JUGA<br/><span style={{color:ORANGE}}>PUNYA ATURAN.</span></Heading>
    <div style={{position:'absolute',left:72,top:603,width:940,height:602,
      background:'#FFF9EF',border:'6px solid #D5D0C6',borderRadius:35}}/>
    {reasons.map((r,i)=><div key={r.label} style={{
       position:'absolute',left:91+i*308,top:680,width:284,height:439,
       border:'6px solid '+(idx===i?ORANGE:INK),borderRadius:28,
       background:r.color,
       transform:'translateY('+(idx===i?-19:9)+'px) scale('+(idx===i?1.025:.96)+')',
       boxShadow:idx===i?'8px 12px 0 rgba(233,107,60,.15)':'none',
       opacity:idx===i?1:.63,
      }}>
      {i===0?<Clock x={72} y={46} size={136} angle={t*32}/>:i===1?
        <svg viewBox="0 0 160 160" width="150" height="150"
          style={{position:'absolute',left:65,top:42}}>
          <path d="M28 15 V142 M131 15 V142" stroke={INK} strokeWidth="17" strokeLinecap="round"/>
          {[48,84,120].map(n=><path key={n} d={'M40 '+n+' H119'} stroke={ORANGE}
           strokeWidth="7" strokeDasharray="11 8"/>)}
        </svg>:
        <svg viewBox="0 0 160 160" width="150" height="150" style={{position:'absolute',left:65,top:42}}>
          <circle cx="80" cy="80" r="56" fill="none" stroke={INK} strokeWidth="15" strokeDasharray="18 12"/>
          <circle cx="80" cy="80" r="24" fill={ORANGE} stroke={INK} strokeWidth="8"/>
        </svg>}
      <div style={{position:'absolute',left:10,right:10,top:219,fontSize:42,fontWeight:950,
         textAlign:'center',letterSpacing:-1.3}}>{r.label}</div>
      <div style={{position:'absolute',left:8,right:8,top:289,fontSize:23,fontWeight:900,
         textAlign:'center',color:idx===i?ORANGE:GREEN,letterSpacing:1}}>{r.sub}</div>
    </div>)}
   </>;
 }
 case 'dwell':{
   const prog=Math.max(0,1-t/5.5);
   return <>
    <Heading eyebrow="SEBELUM PINTU BERGERAK" size={73}>ADA WAKTU<br/><span style={{color:ORANGE}}>UNTUK MASUK.</span></Heading>
    <Lift open={1} person={t>2.45}
      character={<Actor x={326} y={746} width={329} expression={t>2.5?'realization':'doubtful'}
       tilt={t>2.6?8:-8} gaze={t>2.5?-8:9} arm={-15}/>}/>
    <Frame x={100} y={556} w={510} h={126} fill="#FFF9F0" border="#667066">
      <div style={{fontSize:22,fontWeight:900,letterSpacing:2,color:GREEN,margin:'14px 25px'}}>DOOR DWELL TIME</div>
      <div style={{margin:'1px 24px',height:27,borderRadius:10,background:'#E3DED5',overflow:'hidden'}}>
        <div style={{height:'100%',width:Math.round(prog*100)+'%',background:ORANGE,borderRadius:10}}/>
      </div>
    </Frame>
    <Note x={104} y={1190} color={GREEN}>kasih kesempatan dulu…</Note>
   </>;
 }
 case 'sensor':{
   const doorOpen=t<1.65?range(t,.25,1.6,1,.34):t<3.45?range(t,1.7,3.38,.34,1):1;
   return <>
    <Heading eyebrow="EH, ADA YANG LEWAT!" size={72}>SENSOR<br/><span style={{color:ORANGE}}>BILANG: BUKA!</span></Heading>
    <Lift open={doorOpen} sensor={t>1.7} person={t>1.9}
      character={<Actor x={330} y={747} width={363}
      expression={t>3.25?'surprised':'annoyed'} lean={t>3.25?-10:0}
      tilt={t>3.25?-15:6} arm={t>3.25?73:34} leftArm={t>3.25?-76:15}
      impatient={t<3.2}/>}/>
    {t>2.9&&<Note x={116} y={1180} large>BEEP! ↶</Note>}
    <BlinkDot x={675} y={830} visible={t>1.7?.9:0}/>
   </>;
 }
 case 'variants':{
   return <>
    <Heading eyebrow="SETIAP GEDUNG BEDA" size={72}>NGGAK SEMUA<br/><span style={{color:ORANGE}}>LIFT SAMA.</span></Heading>
    <MiniDoor x={73} letter="A" delayLabel="cepat" open={range(t,.3,1.6,1,.35)}/>
    <MiniDoor x={401} letter="B" delayLabel="lebih lama" open={range(t,1.7,3.4,1,.62)}/>
    <MiniDoor x={732} letter="C" delayLabel="beda timing" open={range(t,2.7,4.1,1,.75)}/>
    <Note x={140} y={1200} rotate={-3} color={GREEN}>kondisinya beda.</Note>
   </>;
 }
 case 'behavior':{
   const clicks=Math.floor(t*1.9);
   const patience=Math.max(.06,1-t/4.3);
   return <>
    <Heading eyebrow="PERTANYAAN SEBENARNYA" size={73}>KENAPA<br/><span style={{color:ORANGE}}>KITA SPAM?</span></Heading>
    <Lift open={1} pressed={pulse(t,1.1,.21)+pulse(t,2.05,.23)+pulse(t,3.13,.24)}
      character={<Actor x={324} y={749} width={347} expression="annoyed"
         impatient tilt={t*4} gaze={10} arm={64}/>}/>
    <Frame x={90} y={561} w={370} h={138} fill="#FFFCF6">
      <div style={{fontSize:24,fontWeight:900,letterSpacing:2.2,color:GREEN,margin:'17px 24px 12px'}}>SABAR</div>
      <div style={{height:26,background:'#E8E4DB',margin:'0 23px',borderRadius:9}}>
        <div style={{width:Math.round(patience*100)+'%',height:26,background:ORANGE,borderRadius:9}}/>
      </div>
    </Frame>
    <Note x={726} y={591} large>“BELUM?!”</Note>
    {clicks>3&&<Count value="×?" x={669} y={744} scale={.77}/>}
   </>;
 }
 case 'control':{
   const active=t>3.05;
   return <>
    <Heading eyebrow="TERNYATA INI YANG KITA CARI" size={70}>RASA PUNYA<br/><span style={{color:ORANGE}}>KONTROL.</span></Heading>
    <div style={{position:'absolute',left:90,top:603,width:438,height:595,
       border:'6px solid '+INK,borderRadius:35,background:'#EBE7DD'}}/>
    <div style={{position:'absolute',left:551,top:603,width:438,height:595,
       border:'6px solid '+(active?ORANGE:INK),borderRadius:35,background:'#F6E2D2'}}/>
    <div style={{position:'absolute',left:177,top:650,fontWeight:950,fontSize:36,color:GREEN}}>NUNGGU</div>
    <div style={{position:'absolute',left:635,top:650,fontWeight:950,fontSize:36,color:ORANGE}}>MENCET</div>
    <Actor x={160} y={780} width={290} expression="worried" tilt={-9}/>
    <Actor x={609} y={765} width={305} expression={active?'excited':'curious'} tilt={active?9:0}
      arm={active?65:10} scarf={active?8:0}/>
    <div style={{position:'absolute',left:830,top:825,width:88,height:88,border:'7px solid '+INK,
       borderRadius:24,background:'#FFF9EE',boxShadow:'6px 8px 0 rgba(32,37,31,.10)'}}>
      <div style={{fontSize:56,lineHeight:'77px',textAlign:'center',color:ORANGE}}>↠</div>
    </div>
    <Note x={592} y={1139} color={ORANGE}>setidaknya ada aksi!</Note>
   </>;
 }
 case 'cockpit':{
   const reality=t>2;
   return <>
    <Heading eyebrow="DI KEPALA KITA…" size={73}>{reality?'TERNYATA…':'KAYAK JADI'}<br/><span style={{color:ORANGE}}>{reality?'CUMA TOMBOL.':'PILOT LIFT!'}</span></Heading>
    {reality?<><Actor x={280} y={720} width={376} expression="deadpan" tilt={3} arm={29}/>
      <Panel x={709} y={701} scale={1.03} pressed={pulse(t,2.24,.17)}/>
      <PressFinger x={840} y={1080} progress={pulse(t,2.24,.16)} size={.7}/>
    </>:<>
      <div style={{position:'absolute',left:68,top:562,width:947,height:657,border:'9px solid '+INK,
         borderRadius:42,background:'#D4DBCE',transform:'rotate(-2deg)'}}>
        {[0,1,2,3,4].map((n)=><div key={n} style={{
            position:'absolute',left:68+n*173,top:75,width:128,height:142,
            border:'7px solid '+INK,borderRadius:18,background:n%2?'#F6D6B7':'#FFF9ED'}}>
            <div style={{margin:28,width:58,height:58,borderRadius:99,background:n%2?ORANGE:GREEN}}/>
         </div>)}
        <div style={{position:'absolute',left:160,top:355,width:620,height:55,
           borderRadius:24,background:'#A0AFA2',border:'8px solid '+INK}}/>
        <div style={{position:'absolute',left:445,top:287,width:38,height:185,
           background:INK,borderRadius:16,rotate:'-14deg'}}/>
      </div>
      <Actor x={330} y={713} width={410} expression="excited" arm={75} leftArm={-62}
        lean={-8} scarf={14}/>
      <Note x={175} y={1170} large>VRRRROOOM!</Note>
    </>}
   </>;
 }
 case 'ending':{
   const touch=pulse(t,3.28,.24);
   const temptation=range(t,5.0,7.5);
   const spam=[8.15,8.43,8.67,8.84,9.03].map(s=>pulse(t,s,.11));
   const down=Math.max(touch,...spam);
   return <>
    <Heading eyebrow="LAIN KALI COBA…" size={70}>PENCET<br/><span style={{color:ORANGE}}>SEKALI AJA.</span></Heading>
    <Lift open={t>9.05?range(t,9.1,9.95,1,.65):1} pressed={down}
      character={<Actor x={325} y={735} width={362} expression={t<3.4?'thinking':t<7.5?'doubtful':'surprised'}
        tilt={t<7?5:10} gaze={11} arm={t>5?65:14}
        impatient={t>6.8} scarf={Math.sin(t*12)*6}/>}/>
    <PressFinger x={952} y={1060} progress={t<7.9?touch*.85+temptation*.6:down} size={.68}/>
    {t>3.6&&<Note x={95} y={1115} color={GREEN}>tenang… tenang…</Note>}
    {t>7.75&&<Count value="×8" x={650} y={562} scale={1+pulse(t,8.9,.32)*.16}/>}
   </>;
 }
 case 'brand':{
   return <>
    <div style={{position:'absolute',left:107,top:370,width:858,height:860,borderRadius:'50%',
        background:'#F1E2CF',opacity:.74}}/>
    <img src={publicAsset('brand/coba-dipikir-logo.webp')} style={{
        position:'absolute',left:340,top:598,width:400,height:400,objectFit:'contain'}}/>
    <div style={{position:'absolute',left:90,right:90,top:1070,textAlign:'center',fontSize:87,
      fontWeight:950,letterSpacing:-4}}>coba <span style={{color:ORANGE}}>dipikir.</span></div>
    <div style={{position:'absolute',left:100,right:100,top:1202,textAlign:'center',fontSize:35,
      fontWeight:750,color:GREEN}}>Yang biasa, belum tentu sederhana.</div>
    <div style={{position:'absolute',left:90,top:1475,width:180,height:85,borderRadius:24,
       background:'#FFF9F0',border:'6px solid '+INK,textAlign:'center',
       fontSize:46,lineHeight:'74px',fontWeight:900,rotate:'-11deg'}}>CLOSE</div>
    <PressFinger x={265} y={1544} progress={.8} size={.83}/>
    <SmallStamp text="004" left={922} top={1410} color={ORANGE} size={41}/>
   </>;
 }
 }
 return null;
};
export const Episode4Visuals:React.FC=()=>{
 const {fps}=useVideoConfig();
 const t=useCurrentFrame()/fps;
 const active=scenePlan.find(s=>t>=s.start&&t<s.end)??scenePlan[scenePlan.length-1];
 const elapsed=Math.max(0,t-active.start);
 return <Canvas dark={false}><ElevatorScenes id={active.id} t={elapsed}/></Canvas>;
};
