#!/usr/bin/env python3
"""Trim edge silence, measure actual VO length, verify zero speech overlaps.

Every subtitle uses the SAME measured duration and start as its MP3 track.
We trim only leading/trailing silence, never internal pauses or speech.
"""
import array
import json
import math
import re
import subprocess
import tempfile
from pathlib import Path
from mutagen.mp3 import MP3
import imageio_ffmpeg

ROOT = Path("src/projects/003-harga-99000")
VOICE = Path("public/audio/003-harga-99000/voiceover")
source = (ROOT / "voiceover.config.ts").read_text()
timeline = (ROOT / "timeline.ts").read_text()
ids = re.findall(r"\{id:'([^']+)', text:", source)
entries = [(id_, float(at)) for id_, at in re.findall(r"\{id:'([^']+)', at:([0-9.]+)", timeline)]
assert ids and len(ids) == len(entries), f"Mismatch: config {len(ids)} vs timing {len(entries)}"
assert ids == [id_ for id_, _ in entries], "VO ID order differs from subtitle schedule"
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

def trim_edge_silence(path):
    """Analyze PCM volume in 20ms windows; keep 80ms pre/140ms post roll."""
    result = subprocess.run([
        ffmpeg, '-hide_banner', '-loglevel', 'error',
        '-i', str(path), '-ar', '24000', '-ac', '1',
        '-f', 's16le', 'pipe:1',
    ], capture_output=True, check=True)
    audio = array.array('h')
    audio.frombytes(result.stdout)
    if not audio:
        raise RuntimeError(f"Empty voice file: {path}")
    sr, window = 24000, 480
    peak = max(abs(v) for v in audio)
    gate = max(95, peak * .013)
    activity = []
    for start in range(0, len(audio), window):
        segment = audio[start:start+window]
        if not segment:
            continue
        level = math.sqrt(sum(v*v for v in segment)/len(segment))
        if level > gate:
            activity.append(start)
    if not activity:
        raise RuntimeError(f"No detected voice in {path}")
    start_sec = max(0, activity[0]/sr - .09)
    end_sec = min(len(audio)/sr, (activity[-1]+window)/sr + .14)
    original = float(MP3(path).info.length)
    if start_sec < .025 and original - end_sec < .08:
        return original, original, 0
    with tempfile.NamedTemporaryFile(suffix='.mp3', dir=path.parent, delete=False) as tmp:
        temporary = Path(tmp.name)
    try:
        subprocess.run([
            ffmpeg, '-hide_banner', '-loglevel','error','-y',
            '-ss', f'{start_sec:.3f}', '-i', str(path),
            '-t', f'{(end_sec-start_sec):.3f}',
            '-acodec','libmp3lame','-b:a','96k',
            str(temporary),
        ], capture_output=True, check=True)
        final = float(MP3(temporary).info.length)
        if final < .2:
            raise RuntimeError(f"Trim suspiciously short: {path}")
        temporary.replace(path)
        return original, final, original-final
    finally:
        if temporary.exists():
            temporary.unlink()

measured = {}
errors = []
print("VOICE TRIM AND SYNC REPORT:", flush=True)
for i, (id_, start) in enumerate(entries):
    path = VOICE / f"{id_}.mp3"
    if not path.exists():
        raise FileNotFoundError(path)
    original, duration, removed = trim_edge_silence(path)
    measured[id_] = round(duration, 3)
    next_start = entries[i+1][1] if i + 1 < len(entries) else 60.35
    room = round(next_start - start, 3)
    slack = round(room - duration, 3)
    print(f"{id_:22} @ {start:6.2f}  before={original:.2f}s  after={duration:.2f}s  trimmed={removed:.2f}s  free={slack:+.2f}s", flush=True)
    if slack < .06:
        errors.append(f"{id_}: after trim {duration:.2f}s but slot {room:.2f}s; overlap by {-slack:.2f}s")

if errors:
    raise SystemExit("VOICE TIMING CONFLICT:\n" + "\n".join(errors))

manifest = {
    "note": "Silence-trimmed measured MP3 durations from this build, shared by VO and captions.",
    "durations": measured,
}
output = ROOT / "voice-durations.generated.json"
output.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n")
print(f"Verified {len(entries)} exact synchronized phrases. Wrote {output}", flush=True)
