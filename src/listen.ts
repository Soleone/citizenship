/**
 * Voice answers: the mic, recorded by the page, into Moonshine running in the
 * page, then the closest command.
 *
 * Not the browser's SpeechRecognition: it hands the mic to the system recognizer,
 * which puts Android in call mode and garbles the next few seconds of playback.
 * Recording the mic ourselves leaves playback clean (voice lab, 2026-11-09).
 */

import type { AutomaticSpeechRecognitionPipeline } from "@huggingface/transformers";
import { cue } from "./juice.ts";

export type Command =
  | "A"
  | "B"
  | "C"
  | "D"
  | "true"
  | "false"
  | "next"
  | "repeat"
  | "up"
  | "down"
  | "open"
  | "back"
  | "pause"
  | "resume";

const SAYINGS: Record<Command, string[]> = {
  A: ["alpha", "alfa", "option a"],
  B: ["bravo", "option b"],
  C: ["charlie", "charley", "option c"],
  D: ["delta", "option d"],
  true: ["true"],
  false: ["false"],
  next: ["next", "continue", "go on"],
  repeat: ["repeat", "again"],
  up: ["up", "go up", "previous"],
  down: ["down", "go down", "next"],
  open: ["open", "select", "enter", "expand", "close"],
  back: ["back", "go back"],
  pause: ["pause", "stop", "cancel", "wait"],
  resume: ["resume", "unpause", "continue", "go on"],
};

/** The main word for a command, as shown while listening. */
export const saying = (command: Command) => SAYINGS[command][0];

let recognizer: Promise<AutomaticSpeechRecognitionPipeline> | null = null;

/** Downloads Moonshine base once (about 63 MB, then cached by the browser). */
export function loadRecognizer(onProgress: (percent: number) => void = () => {}) {
  const files = new Map<string, { loaded: number; total: number }>();
  recognizer ??= import("@huggingface/transformers")
    .then(({ pipeline }) =>
      pipeline("automatic-speech-recognition", "onnx-community/moonshine-base-ONNX", {
        dtype: "q8",
        device: "wasm",
        progress_callback: (info) => {
          if (info.status !== "progress") return;
          files.set(info.file, { loaded: info.loaded, total: info.total });
          const all = [...files.values()];
          const loaded = all.reduce((sum, file) => sum + file.loaded, 0);
          onProgress((loaded / all.reduce((sum, file) => sum + file.total, 0)) * 100);
        },
      }),
    )
    .catch((error: unknown) => {
      recognizer = null;
      throw error;
    });
  return recognizer;
}

const RATE = 16_000;
const FLOOR_MS = 150; // room noise, measured before the beep while nobody talks yet
const BEEP_MS = 400; // the chime, so the mic doesn't take it for speech
const QUIET_MS = 500; // this much silence after speech ends the answer
const LEAD_CHUNKS = 5; // about 0.3 s kept before speech starts; the silence before it only slows Moonshine
const WAIT_MS = 8000; // nobody spoke
const LONGEST_MS = 10_000;

/**
 * One answer from the mic, or null when nobody spoke. The mic sends silence for
 * a moment after it opens, so the beep waits for real sound; `onOpen` fires with
 * the beep. A low tone closes the window.
 */
async function record(
  signal: AbortSignal,
  onOpen: () => void,
  tones: boolean,
): Promise<Float32Array | null> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const context = new AudioContext({ sampleRate: RATE });
  const source = context.createMediaStreamSource(stream);
  // Deprecated, but it still works everywhere and spares a separate AudioWorklet module.
  const node = context.createScriptProcessor(1024, 1, 1);
  const chunks: Float32Array[] = [];

  return new Promise((resolve) => {
    let live: number | null = null;
    let open = false;
    let floor = 0;
    let spoke = false;
    let quiet = 0;
    let heard = 0;

    let done = false;
    function finish() {
      if (done) return;
      done = true;
      signal.removeEventListener("abort", finish);
      node.onaudioprocess = null;
      node.disconnect();
      source.disconnect();
      for (const track of stream.getTracks()) track.stop();
      void context.close();
      if (tones && open && !signal.aborted) cue("micClosed");
      if (!spoke || signal.aborted) return resolve(null);
      const audio = new Float32Array(chunks.reduce((sum, chunk) => sum + chunk.length, 0));
      chunks.reduce((at, chunk) => (audio.set(chunk, at), at + chunk.length), 0);
      resolve(audio);
    }
    signal.addEventListener("abort", finish, { once: true });

    node.onaudioprocess = (event) => {
      const data = new Float32Array(event.inputBuffer.getChannelData(0));
      const rms = Math.sqrt(data.reduce((sum, x) => sum + x * x, 0) / data.length);
      const ms = (data.length / RATE) * 1000;
      if (live === null) {
        if (rms < 1e-5) return;
        live = 0;
      }
      live += ms;
      if (live <= FLOOR_MS) return void (floor = Math.max(floor, rms));
      if (!open) {
        open = true;
        if (tones) cue("micOpen");
        onOpen();
      }
      if (live < FLOOR_MS + BEEP_MS) return; // the beep itself
      chunks.push(data);
      heard += ms;
      if (rms > Math.min(Math.max(floor * 3, 0.01), 0.05)) {
        spoke = true;
        quiet = 0;
      } else if (spoke) quiet += ms;
      else if (chunks.length > LEAD_CHUNKS) chunks.shift();
      if ((spoke && quiet > QUIET_MS) || heard > LONGEST_MS || (!spoke && heard > WAIT_MS))
        finish();
    };
    source.connect(node);
    node.connect(context.destination);
  });
}

let transcribing: Promise<unknown> = Promise.resolve();

/** One at a time: listening over a line can still be transcribing when the next listen starts. */
async function transcribe(audio: Float32Array) {
  const model = await loadRecognizer();
  const run = transcribing.then(() => model(audio));
  transcribing = run.catch(() => {});
  const output = await run;
  return (Array.isArray(output) ? output[0] : output).text;
}

/**
 * Listens once: what was heard and which of `commands` it was (null when it was
 * none of them), or null when nobody spoke. Paused listening goes without tones.
 */
export async function hear(
  commands: Command[],
  signal: AbortSignal,
  onPhase: (phase: "listening" | "thinking") => void,
  tones = true,
) {
  await loadRecognizer();
  const audio = await record(signal, () => onPhase("listening"), tones);
  signal.throwIfAborted();
  if (!audio) return null;
  onPhase("thinking");
  const text = await transcribe(audio);
  signal.throwIfAborted();
  return { text, command: match(text, commands) };
}

/**
 * Resolves once someone says pause (or stop, cancel, wait) while `line` plays.
 * The mic hears the line too, so only exact words count, and not ones the line
 * itself contains.
 */
export async function hearPause(line: string, signal: AbortSignal) {
  const own = ` ${clean(line)} `;
  const words = SAYINGS.pause.filter((saying) => !own.includes(` ${saying} `));
  for (;;) {
    const heard = await hear(["pause"], signal, () => {}, false);
    const said = ` ${clean(heard?.text ?? "")} `;
    if (words.some((saying) => said.includes(` ${saying} `))) return;
  }
}

const clean = (text: string) =>
  text
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .trim();

function distance(a: string, b: string) {
  let row = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const next = [i];
    for (let j = 1; j <= b.length; j++)
      next[j] = Math.min(row[j] + 1, next[j - 1] + 1, row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    row = next;
  }
  return row[b.length];
}

/** An exact saying anywhere in what was heard, else the closest by spelling ("brava"), if clearly closest. */
function match(text: string, commands: Command[]): Command | null {
  const said = clean(text);
  const sayings = commands.flatMap((command) => SAYINGS[command].map((s) => [command, s] as const));
  const exact = sayings.find(([, saying]) => ` ${said} `.includes(` ${saying} `));
  if (exact) return exact[0];

  const scores = new Map<Command, number>();
  for (const [command, saying] of sayings) {
    const score = 1 - distance(said, saying) / Math.max(said.length, saying.length);
    scores.set(command, Math.max(scores.get(command) ?? 0, score));
  }
  const [first, second] = [...scores].sort((a, b) => b[1] - a[1]);
  return first[1] >= 0.5 && first[1] - (second?.[1] ?? 0) >= 0.15 ? first[0] : null;
}
