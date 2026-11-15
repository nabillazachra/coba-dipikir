#!/usr/bin/env python3
"""Measure actual TTS audio against editorial start positions; never stretch VO."""
from __future__ import annotations
import re
import json
from pathlib import Path
from mutagen.mp3 import MP3

root=Path('src/projects/006-lagu-masa-lalu')
cfg=(root/'voiceover.config.ts').read_text(encoding='utf-8')
pat=r"\{id:'([^']+)',at:([0-9.]+),text:'([^']+)',rate:'([^']+)'\}"
cues=[{'id':m.group(1),'at':float(m.group(2)),'text':m.group(3)}
      for m in re.finditer(pat,cfg)]
assert len(cues)==24, len(cues)
durations={}
starts={}
for i,cue in enumerate(cues):
    path=Path('public/audio/006-lagu-masa-lalu/voiceover')/(cue['id']+'.mp3')
    assert path.exists(),path
    duration=round(float(MP3(path).info.length),3)
    if duration <=0.1: raise ValueError(f"Bad audio: {cue['id']}")
    at=cue['at']
    if i+1<len(cues):
        next_at=cues[i+1]['at']
        if at+duration+0.10>next_at:
            raise RuntimeError(f"OVERLAP {cue['id']}: actual {duration:.3f}s "
                               f"at {at:.2f}s exceeds next at {next_at:.2f}s; "
                               "change editorial timing or script, never rate")
    elif at+duration > 66.8:
        raise RuntimeError(f"Final VO {cue['id']} exceeds 67 seconds")
    durations[cue['id']]=duration
    starts[cue['id']]=at
out={'ready':True,'durations':durations,'starts':starts}
(root/'voice-durations.generated.json').write_text(
    json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('E006 VO measured:',len(cues),'clips, natural speed, zero overlaps')
print('Maximum spoken end:',max(starts[k]+durations[k] for k in durations))
