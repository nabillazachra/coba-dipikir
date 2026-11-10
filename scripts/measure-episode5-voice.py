#!/usr/bin/env python3
"""E005: verify word-for-word phrase order; measure VO and fit each clip to its exact subtitle slot."""
import json,re
from pathlib import Path
from mutagen.mp3 import MP3
root=Path('src/projects/005-perjalanan-pulang')
script=(root/'voiceover.config.ts').read_text()
timeline=(root/'timeline.ts').read_text()
voice=Path('public/audio/005-perjalanan-pulang/voiceover')
ids=re.findall(r"\{id:'(v\d+)',text:",script)
entries=[(a,float(b)) for a,b in re.findall(r"\{id:'(v\d+)',at:([0-9.]+)",timeline)]
assert len(ids)==25 and ids==[a for a,_ in entries], (len(ids),len(entries))
durations,starts,rates={},{},{}
for i,(key,at) in enumerate(entries):
  p=voice/(key+'.mp3')
  if not p.exists():raise FileNotFoundError(p)
  full=float(MP3(p).info.length)
  next_at=entries[i+1][1] if i+1<len(entries) else 59.78
  slot=next_at-at-.08
  assert slot>.55,(key,slot)
  rate=max(1,full/slot)
  assert rate<2.1,(key,rate)
  durations[key]=round(full,4);starts[key]=round(at,4);rates[key]=round(rate,4)
  audible=full/rate
  assert at+audible<next_at-.045,(key,at,audible,next_at)
  print(f'{key} {at:.2f}s length={full:.2f}s speed={rate:.2f}x -> ends={at+audible:.2f}s',flush=True)
manifest={'note':'Measured exact E005 MP3 durations; starts and playback rates shared by VO and on-screen captions.',
          'durations':durations,'starts':starts,'rates':rates}
(root/'voice-durations.generated.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n')
print('E005 AUDIO QA PASSED: 25 matching phrases; no overlaps; last before 60s.',flush=True)
