"""Speak every line in LINES.json that has no clip in OUT_DIR yet, with Breeze TTS 2 (designed voice radio-man).

    python speak-breeze.py LINES.json OUT_DIR

Run by `pnpm audio:generate:breeze`, with the Breeze env from the tts-scout skill and
its repo as the working directory. Each clip is loudness-matched to mp3 under a
temporary name and renamed when done, so an interrupted run never leaves a half clip.
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

# loading takes about two minutes, so only when there is work
sys.path.insert(0, ".")
import soundfile as sf
from breeze_infer.runtime import load_runtime, resolve_device, set_all_seeds, update_generation_config_for_breeze
from breeze_infer.templates import get_template, prepare_inputs, select_template_name
from models.fast_streaming import FastBreezeStreamingRuntime, FastStreamingConfig

SEED = 42  # fixed, so the designed voice stays the same voice from clip to clip
VOICE = "A relaxed American man in his forties with a deep, smooth voice, like a public radio host."

tokenizer, model, audio_tokenizer = load_runtime(
    Path.home() / "data/apps/tts-scout/models/breeze-tts-2", device=resolve_device(), attn_implementation="eager")
update_generation_config_for_breeze(model)
runtime = FastBreezeStreamingRuntime(model, audio_tokenizer, FastStreamingConfig(
    max_new_tokens=1500, max_seq_len=2048, repetition_penalty=1.1), tokenizer=tokenizer)

wav, part = out / "speaking.wav", out / "speaking.mp3.part"
start = time.time()
for n, line in enumerate(todo, 1):
    try:
        request = {"id": line["id"], "text": line["text"], "speaker": "S0", "instruction": VOICE}
        set_all_seeds(SEED)
        inputs = prepare_inputs(tokenizer, audio_tokenizer, model, [request], get_template(select_template_name(request)),
                                guidance_scale=4.0, guidance_scale_ref=None, guidance_scale_ins=None)
        with sf.SoundFile(wav, mode="w", samplerate=runtime.sample_rate, channels=1, subtype="PCM_16") as f:
            for chunk in runtime.iter_audio_chunks(inputs, request_id=line["id"], seed=SEED):
                f.write(chunk.audio)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", wav, "-af", "loudnorm=I=-18:TP=-1.5",
                        "-ac", "1", "-b:a", "96k", "-f", "mp3", part], check=True)
    except KeyboardInterrupt:
        sys.exit(f"Stopped after {n - 1} new clips. Run it again to continue.")
    part.rename(out / f"{line['id']}.mp3")
    left = (time.time() - start) / n * (len(todo) - n)
    print(f"{n}/{len(todo)}  about {left / 3600:.1f} h left  {line['text'][:60]}", flush=True)
wav.unlink()
