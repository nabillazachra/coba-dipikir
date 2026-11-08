#!/usr/bin/env python3
"""Measure actual Edge TTS MP3 durations and write the shared subtitle/audio manifest.

Build fails if any phrase overlaps the next, so E003 never silently ships with
the VO/subtitle collision previously seen in earlier episodes.
"""
import json
import re
from pathlib import Path
from mutagen.mp3 import MP3

ROOT = Path("src/projects/003-harga-99000")
VOICE = Path("public/audio/003-harga-99000/voiceover")
source = (ROOT / "voiceover.config.ts").read_text()
timeline = (ROOT / "timeline.ts").read_text()

ids = re.findall(r"\{id:'([^']+)', text:", source)
entries = [(id_, float(at)) for id_, at in re.findall(r"\{id:'([^']+)', at:([0-9.]+)", timeline)]
assert ids and len(ids) == len(entries), f"Mismatch: config {len(ids)} vs timing {len(entries)}"
assert ids == [id_ for id_, _ in entries], "VO ID order differs from subtitle schedule"

measured = {}
errors = []
for i, (id_, start) in enumerate(entries):
    path = VO / f"{id_}.mp3"
    if not path.exists():
        raise FileNotFoundError(path)
    duration = float(MP3(path).info.length)
    measured[id_] = round(duration, 3)
    next_start = entries[i+1][1] if i + 1 < len(entries) else 60.35
    room = round(next_start - start, 3)
    slack = round(room - duration, 3)
    print(f"{id_:22} @ {start:6.2f}  voice={duration:5.2f}s  room={room:5.2f}s  free={slack:+.2f}s")
    if slack < 0.08:
        errors.append(f"{id_} overlaps or has <80ms gap: needs {duration:.2f}s, slot {room:.2f}s")

if errors:
    raise SystemExit("VOICE TIMING CONFLICT:\n" + "\n".join(errors))

manifest = {
    "note": "Durations measured from generated MP3 in this same build, used by both VO playback and captions.",
    "durations": measured,
}
output = ROOT / "voice-durations.generated.json"
output.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
print(f"Verified {len(entries)} exact VO/subtitle phrases. Wrote {output}")
