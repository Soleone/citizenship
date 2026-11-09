"""Speak every line in LINES.json that has no clip in OUT_DIR yet, with Phonon 31M (voice Miles).

    python speak-phonon.py LINES.json OUT_DIR

Run by `pnpm audio:generate`, with the Phonon env from the tts-scout skill. Each
clip is loudness-matched to mp3 under a temporary name and renamed when done, so
an interrupted run never leaves a half clip behind.
"""
import json
import subprocess
import sys
import time
from pathlib import Path

lines, out = json.loads(Path(sys.argv[1]).read_text()), Path(sys.argv[2])
todo = [line for line in lines if not (out / f"{line['id']}.mp3").exists()]
print(f"{len(lines) - len(todo)} of {len(lines)} clips already done, {len(todo)} to go.", flush=True)
if not todo:
    sys.exit()

import ptts  # loading takes seconds, so only when there is work

tts = ptts.TTS("hf://gradium/phonon-31m-en", lang="en", quant="q8")
wav, part = out / "speaking.wav", out / "speaking.mp3.part"
start = time.time()
for n, line in enumerate(todo, 1):
    try:
        tts.save(str(wav), line["text"], voice="Miles")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", wav, "-af", "loudnorm=I=-18:TP=-1.5",
                        "-ac", "1", "-b:a", "96k", "-f", "mp3", part], check=True)
    except KeyboardInterrupt:
        sys.exit(f"Stopped after {n - 1} new clips. Run it again to continue.")
    part.rename(out / f"{line['id']}.mp3")
    left = (time.time() - start) / n * (len(todo) - n)
    print(f"{n}/{len(todo)}  about {left / 60:.0f} min left  {line['text'][:60]}", flush=True)
wav.unlink()
