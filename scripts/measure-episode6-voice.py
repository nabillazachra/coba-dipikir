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
    planned=cue['at']
    # TTS often includes natural pauses (e.g. a full-stop after "Eh.").
    # Move the next start forward only when necessary; never change playbackRate.
    prev_end=0 if not starts else max(starts[k]+durations[k] for k in starts)
    at=max(planned,round(prev_end+0.12,3))
    drift=round(at-planned,3)
    if drift>0.05:
        print(f"ADJUST {cue['id']}: planned {planned:.2f} -> {at:.2f}; "
              f"natural audio {duration:.3f}s; delay {drift:.3f}s")
    if at+duration > 66.8:
        raise RuntimeError(f"Final VO {cue['id']} ends at {at+duration:.3f}s "
                           "after 67s composition. Extend editorial scene, "
                           "trim wording, or adjust pauses; never time-stretch.")
    durations[cue['id']]=duration
    starts[cue['id']]=at
out={'ready':True,'durations':durations,'starts':starts}
(root/'voice-durations.generated.json').write_text(
    json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('E006 VO measured:',len(cues),'clips, natural speed, zero overlaps')
print('Maximum spoken end:',max(starts[k]+durations[k] for k in durations))
