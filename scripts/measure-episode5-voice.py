#!/usr/bin/env python3
"""E005 natural VO: measure actual MP3 durations, NEVER change playback speed."""
import json,re
from pathlib import Path
from mutagen.mp3 import MP3
root=Path('src/projects/005-perjalanan-pulang')
script=(root/'voiceover.config.ts').read_text()
timeline=(root/'timeline.ts').read_text()
voice=Path('public/audio/005-perjalanan-pulang/voiceover')
ids=re.findall(r"\{id:'(v\d+)',text:",script)
entries=[(key,float(at)) for key,at in re.findall(r"\{id:'(v\d+)',at:([0-9.]+)",timeline)]
assert len(ids)==22 and ids==[key for key,_ in entries], (ids,entries)
durations,starts={},{}
previous_end=0.0
issues=[]
for key,planned in entries:
  path=voice/(key+'.mp3')
  if not path.is_file():raise FileNotFoundError(path)
  length=float(MP3(path).info.length)
  if length<.2:raise ValueError(f'Unexpected short recording {key}: {length:.3f}s')
  start=max(planned,previous_end+.10)
  drift=start-planned
  if drift>.35:issues.append(f'{key} slips {drift:.2f}s')
  durations[key]=round(length,3)
  starts[key]=round(start,3)
  previous_end=start+length
  print(f'{key:4s} planned={planned:5.2f}s start={start:5.2f}s natural={length:4.2f}s end={previous_end:5.2f}s speed=1.00x',flush=True)
if previous_end>62.16:issues.append(f'Voice ends {previous_end:.2f}s, overlaps ending')
if issues:raise RuntimeError('; '.join(issues)+'; never time stretch voice')
for (k,_),(n,_) in zip(entries,entries[1:]):
  assert starts[k]+durations[k]<=starts[n]-.075,(k,n)
(root/'voice-durations.generated.json').write_text(json.dumps({
 'note':'Measured natural 1.00x TTS duration and explicit starts; captions and audio share this manifest; no playback-rate changes.',
 'durations':durations,'starts':starts
},ensure_ascii=False,indent=2)+'\n')
print(f'E005 NATURAL VO QA PASSED: {len(entries)} exact phrases, no overlap, speed 1.00x, last={previous_end:.2f}s.',flush=True)
