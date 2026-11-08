import React from 'react';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {Actor,Door,Panel,PressFinger,INK,ORANGE,GREEN,PAPER,range,pulse} from './VisualSystem';
import {scenePlan,type Episode4SceneId} from './timeline';
import {publicAsset} from '../../brand/publicAsset';
import {FilmStage,FilmTitle,Accent,Camera,ElevatorShell,LiftLocation,Marker,FloorClock,
 LightBurst,ButtonMacro,FaceCloseup,SensorBeam,ProgressTrack} from './CinematicSet';

const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const hop=(t:number,at:number,d=.22)=>Math.max(0,1-Math.abs(t-at)/d);
const warm='#FFC38B';
const guide=(text:string,x:number,y:number,night=false,size=34)=>
 <Marker x={x} y={y} night={night} size={size}>{text}</Marker>;

const Scene:React.FC<{id:Episode4SceneId;t:number}>=({id,t})=>{
 const n=['enter','waiting','discovery','click','spam','punch','close','rewind','cockpit','ending'].includes(id);
 switch(id){
 case 'enter':{
   const entering=range(t,.48,2.8);
   const early=t<1.02;
   return <>
    {early?<FilmTitle night eyebrow="EPISODE 004 · COBA DIPIKIR" size={75}>
      DIPENCET <Accent night>8 KALI.</Accent><br/>PINTUNYA SANTAI.
    </FilmTitle>:<FilmTitle night eyebrow="PERNAH KAYAK GINI?" size={77}>
      BURU-BURU<br/><Accent night>MASUK LIFT?</Accent>
    </FilmTitle>}
    {early?<ButtonMacro night press={hop(t,.38,.30)} finger={hop(t,.38,.30)}
       camera={1.14} count={8} spotlight agitation={1}/>:
     <>
       <LiftLocation night open={range(t,1.04,1.59,.24,1)}
         zoom={1.01+entering*.055} panX={entering*-17}
         hero={<Actor x={-305+600*entering} y={190} width={405}
           expression="worried" walk={t*3.5} lean={15} tilt={11}
           arm={t>2.4?64:-45} scarf={Math.sin(t*14)*14} gaze={12}/>}/>
       <FloorClock x={842} y={556} size={106} turn={t*19} night/>
       {guide('cepet… cepet…',109,1217,true,34)}
     </>}
   </>;
 }
 case 'waiting':{
   const annoyance=t>2.2;
   const glance=Math.sin(t*5)*8;
   return <>
    <FilmTitle night eyebrow="LANTAINYA UDAH DIPENCET" size={76}>
      TAPI PINTUNYA…<br/><Accent night>SANTAI.</Accent>
    </FilmTitle>
    <LiftLocation night open={1} zoom={1.10+range(t,.1,3.4)*.075}
      panX={-24} panY={-15}
      hero={<Actor x={246} y={130} width={477} expression={annoyance?'annoyed':'curious'}
        tilt={annoyance?8+glance*.3:-10} gaze={t%1.6>.8?10:-9}
        walk={annoyance?t*1.25:0} arm={annoyance?32:4} impatient={annoyance}
        scarf={Math.sin(t*6)*4}/>}/>
    <FloorClock x={74} y={726} size={100} turn={t*39} night/>
    {t>2.65&&guide('…',155,985,true,104)}
    <div style={{position:'absolute',left:90,top:1188,color:warm,
      fontSize:30,fontWeight:900,letterSpacing:1.2,opacity:range(t,3.2,3.55)}}>nunggu… nunggu…</div>
   </>;
 }
 case 'discovery':{
   const p=range(t,.4,1.9);
   return <>
    <FilmTitle night eyebrow="MENDADAK ADA HARAPAN" size={72}>
       EH! ADA <Accent night>CLOSE!</Accent>
    </FilmTitle>
    <ButtonMacro night finger={p*.9} press={0} camera={1.035+range(t,.2,2.4)*.055}
       spotlight/>
    <LightBurst x={833} y={1035} on={range(t,.7,1.1)} color={warm} size={155}/>
    {guide('penyelamat?',107,1195,true,42)}
   </>;
 }
 case 'click':{
   const down=hop(t,.54,.34);
   const pause=t>1.06;
   return <>
    {pause?<FilmTitle night eyebrow="SFX: SUARA HENING" size={84}>KLIK.<br/><Accent night>…</Accent></FilmTitle>:
      <FilmTitle night eyebrow="COBA SEKALI" size={80}>KLIK!</FilmTitle>}
    {pause?<FaceCloseup night expression="deadpan" size={735}
       tilt={t>1.65?6:-6} gaze={t>1.6?-7:9} shiftX={range(t,1.05,2.2)*-30}/>:
       <ButtonMacro night press={down} finger={down} camera={1.20+down*.03}
         showActor={true} spotlight/>}
    {pause&&guide('pintunya: masih santai.',145,1194,true,39)}
   </>;
 }
 case 'spam':{
   const beat=[.35,1.15,1.70,2.12,2.46,2.78,3.25];
   const hits=beat.filter(b=>t>=b).length;
   const active=Math.max(0,...beat.map(b=>hop(t,b,.16)));
   const count=hits<=1?1:hits<=3?2:hits<=6?4:8;
   const zoom=1.06+hits*.022;
   return <>
    <FilmTitle night eyebrow="KALAU KURANG MEMUASKAN…" size={79}>
      PENCET<br/><Accent night>LAGI. LAGI!</Accent>
    </FilmTitle>
    <ButtonMacro night press={active} finger={active}
      camera={zoom} shake={hits>3?Math.sin(t*43)*hits*1.6:0}
      agitation={hits/7} count={hits?count:undefined} spotlight={hits>=2}/>
    {hits>=6&&<LightBurst x={850} y={1080} on={.7+hop(t,3.25,.25)*.3}
      color={warm} size={165}/>}
   </>;
 }
 case 'punch':{
   return <>
    <FilmTitle night eyebrow="8 KALI KEMUDIAN…" size={80}>
       PINTUNYA<br/><Accent night>TETAP SANTAI.</Accent>
    </FilmTitle>
    <FaceCloseup night expression="deadpan" size={760}
      tilt={t<.8?7:0} gaze={t<1.7?11:0} shiftX={range(t,.4,2.3)*-30}/>
    <div style={{position:'absolute',right:103,top:604,
      color:warm,fontWeight:950,fontSize:119,rotate:'9deg'}}>×8</div>
    {t>1.4&&guide('…',104,1161,true,99)}
   </>;
 }
 case 'close':{
   const open=range(t,.22,1.74,1,0);
   return <>
    <FilmTitle night eyebrow="DAN SETELAH MENUNGGU…" size={84}>
      NAH!<br/><Accent night>…TAPI?</Accent>
    </FilmTitle>
    <LiftLocation night open={open} zoom={1.075}
      hero={<Actor x={250} y={150} width={490}
         expression={t<1.1?'happy':t<1.8?'realization':'thinking'}
         tilt={t<1.3?-11:9} gaze={7} arm={t<1.3?51:9}
         scarf={Math.sin(t*7)*8}/>}/>
    <div style={{position:'absolute',left:108,top:1204,
      color:warm,fontSize:39,fontWeight:950,
      opacity:range(t,.6,.85),rotate:'-4deg'}}>berhasil… atau kebetulan?</div>
   </>;
 }
 case 'rewind':{
   const rewind=range(t,0,.7);
   return <>
    <FilmTitle night eyebrow="REWIND DULU" size={80}>
      EMANG<br/><Accent night>KARENA 8×?</Accent>
    </FilmTitle>
    <Camera zoom={1.03+rewind*.075}>
      <div style={{position:'absolute',left:60,top:40,width:958,height:612,
       border:'10px solid #D9C7AF',borderRadius:39,
       boxShadow:'15px 18px 0 rgba(0,0,0,.18)',
       background:'repeating-linear-gradient(95deg,#53645F 0px,#53645F 86px,#576E66 91px,#53645F 96px)'}}/>
      {[0,1,2].map((i)=><div key={i} style={{
        position:'absolute',left:77+i*304,top:78,width:283,height:518,
        border:'5px solid #E0CDB7',background:i===1?'#E8D2B8':'#384947',
        overflow:'hidden',opacity:i===1?1:.68,
        transform:'translateX('+(1-rewind)*(i-1)*44+'px)'
      }}>
        <Actor x={-33} y={86} width={340} expression={i===1?'surprised':'annoyed'}
          tilt={i===1?-15:11} arm={i===1?65:30}/>
      </div>)}
    </Camera>
    {guide('⟲',809,1128,true,127)}
   </>;
 }
 case 'once':{
   const press=hop(t,.83,.31);
   const signal=range(t,.86,1.67);
   return <>
    <FilmTitle eyebrow="KALAU TOMBOLNYA AKTIF" size={77}>
      <Accent>SEKALI</Accent><br/>UDAH CUKUP.
    </FilmTitle>
    <ButtonMacro press={press} finger={press} camera={1.06} spotlight/>
    <svg style={{position:'absolute',left:85,top:1057,width:900,height:150,
       opacity:signal,zIndex:18}} viewBox="0 0 900 150">
       <path d="M65 98 C272 40 418 130 695 55" stroke={ORANGE}
         strokeWidth="12" fill="none" strokeLinecap="round"
         strokeDasharray="22 15" strokeDashoffset={-signal*150}/>
       <path d="M675 27 L723 49 L680 82" stroke={ORANGE}
         strokeWidth="10" fill="none" strokeLinecap="round"/>
    </svg>
    <div style={{position:'absolute',left:88,top:1191,fontSize:40,
      fontWeight:950,color:GREEN,opacity:signal}}>1 sentuhan → sinyal masuk.</div>
   </>;
 }
 case 'system':{
   const part=t<1.88?0:t<3.65?1:2;
   return <>
    <FilmTitle eyebrow="ADA HAL LAIN YANG IKUT BEKERJA" size={70}>
      {part===0?'TIMING.':part===1?'SENSOR.':'PENGATURAN.'}<br/>
      <Accent>{part===0?'BUKAN SULAP.':part===1?'ADA YANG LEWAT.':'TIAP LIFT BEDA.'}</Accent>
    </FilmTitle>
    {part===0?<>
      <Camera zoom={1.04}>
        <div style={{position:'absolute',left:90,top:90,width:910,height:550,
          background:'#E0E8DC',borderRadius:41,border:'8px solid #7F8F82'}}/>
        <FloorClock x={283} y={137} size={350} turn={t*35}/>
        <Actor x={650} y={210} width={345} expression="doubtful" tilt={-9}
           arm={-18} impatient/>
        <div style={{position:'absolute',left:115,top:545,fontSize:38,
         color:GREEN,fontWeight:950}}>pintu masih menghitung…</div>
      </Camera>
    </>:part===1?<>
      <Camera zoom={1.08}>
        <ElevatorShell/>
        <Door x={145} y={151} w={640} h={480} open={.87} sensor/>
        <SensorBeam pulse={1}/>
        <Actor x={272+range(t,1.88,3.6)*160} y={255} width={300}
          expression="happy" walk={t*2.7}/>
        <Marker x={102} y={602} size={37}>BEEP!</Marker>
      </Camera>
    </>:<>
      <Camera zoom={1.04}>
        <div style={{position:'absolute',left:72,top:43,width:935,height:648,
          background:'#E0E6DC',border:'8px solid #819084',borderRadius:37}}/>
        <div style={{position:'absolute',left:146,top:154,width:392,height:375,
          background:'#FFF9EC',border:'7px solid '+INK,borderRadius:32}}>
          {[0,1,2].map(i=><div key={i} style={{position:'absolute',
           left:43,top:55+i*103,width:290,height:29,borderRadius:15,
           background:'#C9D6C6'}}>
            <div style={{position:'absolute',left:35+i*77,top:-20,width:58,
              height:72,borderRadius:17,background:i===1?ORANGE:GREEN,
              border:'7px solid '+INK}}/>
          </div>)}
        </div>
        <Actor x={570} y={142} width={418} expression="curious" tilt={10} gaze={-12}
          arm={27}/>
      </Camera>
    </>}
   </>;
 }
 case 'dwell':{
   const walk=range(t,2.1,4.8);
   return <>
    <FilmTitle eyebrow="MAKANYA PINTU DIKASIH WAKTU" size={73}>
      BIAR ORANG<br/><Accent>KEBAGIAN MASUK.</Accent>
    </FilmTitle>
    <LiftLocation open={1} zoom={1.055}
      hero={<Actor x={355} y={186} width={405}
        expression={t>2.6?'realization':'annoyed'} tilt={t>2.6?12:-5}
        gaze={t>2.6?-10:9} arm={t>2.6?-8:52}/>}
      person={t>1.95?<Actor x={-80+440*walk} y={335} width={235}
        expression="happy" walk={t*2.9} tilt={-3} arm={16} scarf={3}/>:undefined}/>
    <Camera zoom={1.0}>
      <ProgressTrack value={1-t/5.9} x={97} y={42} w={480}/>
    </Camera>
    {t>2.8&&guide('oh… iya juga.',106,1202,false,38)}
   </>;
 }
 case 'sensor':{
   const open=t<1.65?range(t,.2,1.65,1,.34):
     t<3.55?range(t,1.75,3.53,.34,1):1;
   const crossing=range(t,1.75,3.45);
   return <>
    <FilmTitle eyebrow="SENSOR NGELIAT SESUATU" size={75}>
      MAU NUTUP?<br/><Accent>BUKA LAGI!</Accent>
    </FilmTitle>
    <Camera zoom={1.04+crossing*.05} panX={-12}>
      <ElevatorShell/>
      <Door x={120} y={150} w={640} h={490} open={open} sensor={false}/>
      {t>1.65&&<Actor x={75+240*crossing} y={308} width={230}
        expression="happy" walk={t*3.1} scarf={6}/>}
      <SensorBeam pulse={t>1.8?Math.min(1,range(t,1.7,2.2)+hop(t,3,.6)):.25}/>
      <Actor x={490} y={175} width={360}
        expression={t>3?'surprised':'annoyed'}
        tilt={t>3?-19:10} gaze={-9}
        arm={t>3?78:44} leftArm={t>3?-68:2} impatient={t<3}
        scarf={Math.sin(t*8)*9}/>
      <Panel x={787} y={143} scale={.99} pressed={0}/>
      {t>2.8&&<div style={{position:'absolute',left:132,top:465,
       transform:'rotate(-8deg)',color:ORANGE,
       fontSize:101,fontWeight:950,textShadow:'6px 7px 0 rgba(233,107,60,.14)'}}>BEEP!</div>}
    </Camera>
    {t>3.7&&guide('WHY?!',100,1198,false,51)}
   </>;
 }
 case 'variants':{
   const which=Math.min(2,Math.floor(t/1.42));
   return <>
    <FilmTitle eyebrow="TOMBOLNYA BISA BERBEDA PERILAKU" size={74}>
      <Accent>NGGAK SEMUA</Accent><br/>LIFT SAMA.
    </FilmTitle>
    <Camera zoom={1.04} panX={-10}>
      <div style={{position:'absolute',left:34,top:25,width:1018,height:670,
       background:'linear-gradient(110deg,#D0D8CA,#ADBBAF)',border:'10px solid #889C8B',
       borderRadius:41}}/>
      {(['A','B','C'] as const).map((s,i)=>{
        const start=i===0?.35:i===1?1.6:2.76;
        const progress=range(t,start,start+1.15,1,.27+(i*.08));
        return <React.Fragment key={s}>
          <Door x={65+i*339} y={147} w={303} h={413} open={progress}/>
          <div style={{position:'absolute',left:88+i*339,top:63,width:259,
            fontSize:61,fontWeight:950,color:which===i?ORANGE:INK,
            textAlign:'center'}}>{s}</div>
          <div style={{position:'absolute',left:74+i*339,top:581,width:289,
           background:which===i?'#FFF9EF':'rgba(255,252,241,.68)',
           borderRadius:13,padding:'8px 0',textAlign:'center',fontSize:28,
           fontWeight:900,color:which===i?ORANGE:GREEN}}>
           {i===0?'RESPONSIF':i===1?'ADA DELAY':'SETTING LAIN'}
          </div>
        </React.Fragment>;
      })}
      <Actor x={25+which*333+range(t,which*1.42,which*1.42+.55)*75}
        y={404} width={248} expression="doubtful" walk={t*2.4}
        tilt={which%2?-12:9} scarf={Math.sin(t*9)*9}/>
    </Camera>
   </>;
 }
 case 'behavior':{
   return <>
    <FilmTitle eyebrow="SEKARANG GANTIAN KITA YANG DIPERIKSA" size={78}>
      KENAPA<br/><Accent>KITA SPAM?</Accent>
    </FilmTitle>
    <FaceCloseup expression="annoyed" size={755} tilt={-6+Math.sin(t*6)*5}
       gaze={t%1.3>.7?11:-9} shake={Math.sin(t*16)*4}/>
    <Camera top={575} height={698}>
      <ProgressTrack value={Math.max(.035,1-t/4.2)} label="SABAR TERSISA" x={75} y={35} w={400}/>
      <div style={{position:'absolute',right:74,top:41,color:ORANGE,
        fontSize:82,fontWeight:950,transform:'rotate(10deg)'}}>BELUM?!</div>
    </Camera>
   </>;
 }
 case 'control':{
   const action=range(t,2.8,3.4);
   return <>
    <FilmTitle eyebrow="YANG KITA CARI BUKAN SEKADAR CEPAT" size={73}>
      PENGEN<br/><Accent>MERASA NGATUR.</Accent>
    </FilmTitle>
    <Camera zoom={1.02}>
      <div style={{position:'absolute',left:56,top:39,width:972,height:650,
       borderRadius:38,background:'#E1E8DC',border:'9px solid #829286',
       boxShadow:'14px 15px 0 rgba(32,37,31,.08)'}}/>
      <div style={{position:'absolute',left:546,top:56,width:15,height:615,
       background:'#9AADA0',borderRadius:10}}/>
      <div style={{position:'absolute',left:108,top:89,fontSize:42,
       fontWeight:950,color:GREEN}}>MENUNGGU</div>
      <div style={{position:'absolute',left:611,top:89,fontSize:42,
       fontWeight:950,color:ORANGE}}>MENCET</div>
      <Actor x={107} y={218} width={401} expression="worried" tilt={-9} arm={10}
        gaze={-9}/>
      <Actor x={620} y={189} width={426}
        expression={action>.8?'excited':'curious'}
        tilt={action*12} arm={64} scarf={action*15}/>
      <div style={{position:'absolute',left:883,top:464,width:83,height:83,
        borderRadius:23,background:action?'#FFBB91':'#FFF9E9',
        border:'7px solid '+INK,boxShadow:'6px 7px 0 rgba(0,0,0,.12)',
        textAlign:'center',lineHeight:'70px',fontSize:52,color:INK}}>›‹</div>
      <LightBurst x={915} y={498} on={action} size={116}/>
    </Camera>
   </>;
 }
 case 'cockpit':{
   const fantasy=t<2;
   return <>
    {fantasy?<FilmTitle night eyebrow="VERSI DI KEPALA KITA" size={79}>
       JADI<br/><Accent night>PILOT LIFT!</Accent>
    </FilmTitle>:<FilmTitle night eyebrow="REALITANYA…" size={83}>
       CUMA<br/><Accent night>SATU TOMBOL.</Accent>
    </FilmTitle>}
    {fantasy?<Camera zoom={1.065} panX={Math.sin(t*10)*4}>
      <div style={{position:'absolute',left:42,top:15,width:988,height:688,
        background:'linear-gradient(125deg,#626658,#303D3D 65%,#6F5A48)',
        border:'13px solid #151F1F',borderRadius:50,
        boxShadow:'13px 19px 0 rgba(0,0,0,.25)'}}/>
      {[0,1,2,3,4].map((i)=><div key={i} style={{
        position:'absolute',left:90+i*185,top:65,width:126,height:153,
        background:'#1B2929',border:'7px solid #D4C2A7',borderRadius:18,
        boxShadow:'inset 0 0 27px rgba(0,0,0,.34)',
      }}>
        <div style={{position:'absolute',left:25,top:26,width:61,height:61,
          borderRadius:'50%',background:i%2?ORANGE:GREEN,
          boxShadow:'0 0 28px '+(i%2?ORANGE:GREEN)}}/>
        <div style={{position:'absolute',left:29,top:103,
          width:57,height:6,background:'#D4C6AA'}}/>
      </div>)}
      <div style={{position:'absolute',left:175,top:305,width:713,height:110,
       borderRadius:55,background:'#232C2A',border:'12px solid #B3BAAA'}}/>
      <div style={{position:'absolute',left:504,top:330,width:24,height:238,
       borderRadius:12,background:INK,transform:'rotate(-13deg)'}}/>
      <Actor x={210} y={185} width={585} expression="excited" lean={-10}
         tilt={12} leftArm={-66} arm={76} scarf={Math.sin(t*18)*15}/>
      <LightBurst x={870} y={280} on={hop(t,.9,.4)} color={warm} size={150}/>
      <div style={{position:'absolute',left:127,top:620,fontSize:52,
       fontWeight:950,color:warm,transform:'rotate(-5deg)'}}>VROOOOM!</div>
    </Camera>:<ButtonMacro night press={hop(t,2.26,.18)}
      finger={hop(t,2.26,.18)} camera={1.16} showActor={true}/>}
   </>;
 }
 case 'ending':{
   const tempting=range(t,5.08,7.55);
   const late=[8.47,8.7,8.93,9.16,9.37];
   const slam=Math.max(0,...late.map(s=>hop(t,s,.12)));
   const first=hop(t,3.28,.27);
   const final=t>5.65;
   return <>
    <FilmTitle night eyebrow="COBA LAIN KALI…" size={81}>
      PENCET<br/><Accent night>SEKALI AJA.</Accent>
    </FilmTitle>
    {!final?<LiftLocation night open={1} pressed={first} zoom={1.09}
      hero={<Actor x={285} y={160} width={426}
        expression={t<3.5?'thinking':'doubtful'}
        tilt={t>3.5?8:-4} gaze={10} arm={t>3.1?51:16}
        impatient={t>4.8}/>}/>:<ButtonMacro night
       camera={1.20+tempting*.10} finger={t<7.9?tempting*.86:slam}
       press={slam} shake={t>7.8?Math.sin(t*35)*5:Math.sin(t*11)*tempting*3}
       showActor spotlight agitation={tempting} reaction={t>8.83}/>}
    {t>4&&<Marker x={111} y={1192} night size={t>6?45:35}>
       {t>9.31?'GAGAL.':t>6.8?'TAAAHAN…':'tenang…'}
    </Marker>}
    {t>9.3&&<Marker x={750} y={635} night size={69}>×8</Marker>}
   </>;
 }
 case 'brand':{
   return <>
    <div style={{position:'absolute',left:140,top:515,width:802,height:826,
     borderRadius:'50%',background:'#F0DFCB',
     boxShadow:'0 0 0 23px rgba(233,107,60,.06)'}}/>
    <img src={publicAsset('brand/coba-dipikir-logo.webp')}
      style={{position:'absolute',left:337,top:642,width:411,height:370,objectFit:'contain'}}/>
    <div style={{position:'absolute',top:1090,left:90,right:90,textAlign:'center',
      color:INK,fontSize:94,fontWeight:950,letterSpacing:-5}}>coba <Accent>dipikir.</Accent></div>
    <div style={{position:'absolute',top:1211,left:86,right:86,textAlign:'center',
       color:GREEN,fontWeight:750,fontSize:34}}>Yang biasa, belum tentu sederhana.</div>
    <div style={{position:'absolute',left:93,top:1435,width:247,height:94,
       background:'#FFF9EC',border:'7px solid '+INK,
       borderRadius:23,textAlign:'center',lineHeight:'83px',
       fontWeight:950,fontSize:47,transform:'rotate(-9deg)'}}>CLOSE</div>
    <PressFinger x={350} y={1523} progress={.92} size={.92}/>
    <Marker x={915} y={1429} size={46}>004</Marker>
   </>;
 }
 }
 return null;
};

export const CinematicEpisode4Visuals:React.FC=()=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),time=frame/fps;
 const active=scenePlan.find(s=>time>=s.start&&time<s.end)??scenePlan[scenePlan.length-1];
 const t=Math.max(0,time-active.start);
 const dark=['enter','waiting','discovery','click','spam','punch','close','rewind','cockpit','ending'].includes(active.id);
 return <FilmStage night={dark} warm={true}>
   <Scene id={active.id} t={t}/>
 </FilmStage>;
};
