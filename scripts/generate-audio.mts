/**
 * Speak the whole curriculum with a local TTS model, in study order.
 *
 *   pnpm audio:generate          Phonon 31M, voice Miles (about 2 h)
 *   pnpm audio:generate:breeze   Breeze TTS 2, voice radio-man (about 28 h)
 *
 * Clips land in $DATA/apps/citizenship/audio/<voice>/<clip id>.mp3. Stop it any
 * time with Ctrl-C: a clip is only renamed into place once it is complete, and a
 * rerun skips every clip that already exists, so it picks up where it stopped.
 */

import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { curriculumLines } from "../src/audio.ts";

const data = process.env.DATA;
if (!data)
  throw new Error("Set DATA to the data folder (clips go to $DATA/apps/citizenship/audio).");

const tts = join(data, "apps/tts-scout");
const voices = {
  phonon: { folder: "phonon-miles", env: "phonon", worker: "speak-phonon.py", cwd: undefined },
  breeze: {
    folder: "breeze-radio-man",
    env: "breeze",
    worker: "speak-breeze.py",
    cwd: join(tts, "repos/breeze"),
  },
};
const name = process.argv[2] ?? "phonon";
if (!(name in voices))
  throw new Error(`Unknown voice "${name}". Use one of: ${Object.keys(voices).join(", ")}.`);
const voice = voices[name as keyof typeof voices];

const out = join(data, "apps/citizenship/audio", voice.folder);
const python = join(tts, "envs", voice.env, "bin/python");

const lines = await curriculumLines();

mkdirSync(out, { recursive: true });
const jobs = join(out, "lines.json");
writeFileSync(jobs, JSON.stringify(lines, null, 2));

const worker = resolve(import.meta.dirname, voice.worker);
const run = spawnSync(python, [worker, jobs, out], { stdio: "inherit", cwd: voice.cwd });
process.exit(run.status ?? 1);
