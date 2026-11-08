#!/usr/bin/env python3
"""Measure and trim E004 VO, calculate nonoverlapping starts used by BOTH VO and captions."""
import array
import json
import math
import re
import subprocess
import tempfile
from pathlib import Path
from mutagen.mp3 import MP3
import imageio_ffmpeg
root=Path('src/projects/004-lift-close')
voice=Path('public/audio/004-lift-close/voiceover')
script=(root/'voiceover.config.ts').read_text()
timing=(root/'timeline.ts').read_text()
ids=re.findall(r"\{id:'([^']+)',\s*text:",script)
entries=[(key,float(at)) for key,at in re.findall(r"\{id:'([^']+)',\s*at:([0-9.]+)",timing)]
assert ids and ids==[key for key,_ in entries], f'Phrase list/order mismatch: {len(ids)} vs {len(entries)}'
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
def trim(path):
 raw=subprocess.run([ffmpeg,'-hide_banner','-loglevel','error','-i',str(path),
   '-ar','24000','-ac','1','-f','s16le','pipe:1'],capture_output=True,check=True).stdout
 audio=array.array('h');audio.frombytes(raw)
 if not audio:raise RuntimeError(f'Empty file {path}')
 peak=max(abs(x) for x in audio)
 gate=max(95,peak*.013)
 hits=[]
 for k in range(0,len(audio),480):
  seg=audio[k:k+480]
  if seg and math.sqrt(sum(x*x for x in seg)/len(seg))>gate:hits.append(k)
 if not hits:raise RuntimeError(f'Silent file {path}')
 begin=max(0,hits[0]/24000-.08)
 end=min(len(audio)/24000,(hits[-1]+480)/24000+.13)
 original=float(MP3(path).info.length)
 if begin<.024 and original-end<.085:return original
 with tempfile.NamedTemporaryFile(suffix='.mp3',dir=path.parent,delete=False) as tmp:
  temp=Path(tmp.name)
 try:
  subprocess.run([ffmpeg,'-hide_banner','-loglevel','error','-y','-ss',f'{begin:.3f}',
   '-i',str(path),'-t',f'{end-begin:.3f}','-acodec','libmp3lame','-b:a','96k',str(temp)],
   capture_output=True,check=True)
  result=float(MP3(temp).info.length)
  if result<.24:raise RuntimeError(f'Suspiciously short voice: {path}')
  temp.replace(path);return result
 finally:
  if temp.exists():temp.unlink()
durations,starts={},{}
previous_end=0
large_shifts=[]
for key,planned in entries:
 path=voice/(key+'.mp3')
 if not path.exists():raise FileNotFoundError(path)
 length=trim(path)
 at=max(planned,previous_end+.075)
 durations[key]=round(length,3)
 starts[key]=round(at,3)
 drift=at-planned
 previous_end=at+length
 if drift>.4:large_shifts.append(f'{key}: moved +{drift:.2f}s')
 print(f'{key:8s} planned {planned:5.2f} actual {at:5.2f} length {length:4.2f} end {previous_end:5.2f}',flush=True)
assert previous_end<=79.35, f'VO ends {previous_end:.2f}s, overlaps final card 79.5s'
for i,(key,_) in enumerate(entries[:-1]):
 next_key=entries[i+1][0]
 assert starts[key]+durations[key]<=starts[next_key]-.06, f'VO overlap {key} {next_key}'
if large_shifts:print('TIMING SHIFTS: '+', '.join(large_shifts),flush=True)
manifest={'note':'MP3 trimmed and measured by Episode 004 CI. Starts are shared by VO and subtitles.',
 'durations':durations,'starts':starts}
(root/'voice-durations.generated.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(f'VERIFIED {len(entries)} VO phrases; last ends {previous_end:.2f}s',flush=True)
