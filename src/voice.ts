/**
 * Voice mode: study without touching the phone. A switch, not a separate app:
 * each screen says its current step and listens for a command, and the command
 * does what a tap would. The screen stays awake while it is on.
 *
 * It lasts for the page's lifetime only, because playing audio needs a tap
 * first after every load.
 */

import { useEffect, useEffectEvent, useSyncExternalStore } from "react";
import { phrases } from "./audio.ts";
import { unlockSound } from "./juice.ts";
import { hear, loadRecognizer, type Command } from "./listen.ts";
import { say } from "./speak.ts";

export type VoiceStatus =
  | { kind: "off" }
  | { kind: "loading"; percent: number }
  | { kind: "idle" | "speaking" | "thinking" | "paused" }
  | { kind: "listening"; commands: Command[] };

let status: VoiceStatus = { kind: "off" };
const listeners = new Set<() => void>();
let wakeLock: WakeLockSentinel | null = null;
let paused: AbortController | null = null;

function setStatus(next: VoiceStatus) {
  status = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const useVoice = () => useSyncExternalStore(subscribe, () => status);
const isOn = (s: VoiceStatus) => s.kind !== "off" && s.kind !== "loading";
const isRunning = (s: VoiceStatus) => isOn(s) && s.kind !== "paused";

async function keepAwake() {
  if (!isOn(status) || document.visibilityState !== "visible") return;
  // Refused on low battery or in a background tab; the session still works, the screen may dim.
  wakeLock = await navigator.wakeLock?.request("screen").catch(() => null);
}
document.addEventListener("visibilitychange", () => void keepAwake());

export async function toggleVoice() {
  if (status.kind !== "off") {
    paused?.abort();
    setStatus({ kind: "off" });
    void wakeLock?.release();
    wakeLock = null;
    navigator.mediaSession.setActionHandler("pause", null);
    navigator.mediaSession.setActionHandler("play", null);
    return;
  }
  unlockSound(); // this tap is the only chance: the mic tones play later, without one
  setStatus({ kind: "loading", percent: 0 });
  try {
    await loadRecognizer((percent) => setStatus({ kind: "loading", percent }));
  } catch (error) {
    setStatus({ kind: "off" });
    throw error;
  }
  setStatus({ kind: "idle" });
  void keepAwake();
  // The headset or steering wheel button: the only way to stop a long paragraph mid-sentence,
  // since the page can't listen while it talks.
  navigator.mediaSession.setActionHandler("pause", pauseVoice);
  navigator.mediaSession.setActionHandler("play", resumeVoice);
}

/** Stops the current step and listens, without tones, until someone says resume. */
function pauseVoice() {
  if (!isRunning(status)) return;
  setStatus({ kind: "paused" });
  const controller = new AbortController();
  paused = controller;
  const { signal } = controller;
  void (async () => {
    await say(phrases.paused, signal);
    while ((await hear(["resume"], signal, () => {}, false)) !== "resume");
    resumeVoice();
  })().catch((error: unknown) => signal.aborted || console.error(error));
}

/** The current step starts again from its beginning. */
function resumeVoice() {
  if (status.kind !== "paused") return;
  paused?.abort();
  setStatus({ kind: "idle" });
}

export type Voice = {
  say: (text: string) => Promise<void>;
  hear: (commands: Command[]) => Promise<Command | null>;
  pause: () => void;
};

/** Is voice mode on, for screens that prepare ahead (prefetching clips). */
export const useVoiceOn = () => isOn(useVoice());

/**
 * Runs `turn` while voice mode is on, again whenever `step` changes; null runs
 * nothing. A new step, pausing or switching voice off stops the running turn
 * mid-sentence. "pause" and "back" work at every listening point.
 */
export function useVoiceTurn(step: string | null, turn: (voice: Voice) => Promise<void>) {
  const running = isRunning(useVoice());
  const run = useEffectEvent(turn);

  useEffect(() => {
    if (!running || step === null) return;
    const controller = new AbortController();
    const { signal } = controller;
    const voice: Voice = {
      say: (text) => (setStatus({ kind: "speaking" }), say(text, signal)),
      hear: async (commands) => {
        setStatus({ kind: "idle" }); // the mic takes a moment to open
        const heard = await hear([...commands, "pause", "back"], signal, (kind) =>
          setStatus(kind === "listening" ? { kind, commands } : { kind }),
        );
        if (heard !== "pause" && heard !== "back") return heard;
        if (heard === "pause") pauseVoice();
        else history.back(); // the screen it lands on starts its own turn
        controller.abort();
        throw signal.reason;
      },
      pause: pauseVoice,
    };
    run(voice)
      .then(() => isRunning(status) && !signal.aborted && setStatus({ kind: "idle" }))
      .catch((error: unknown) => {
        if (signal.aborted) return;
        console.error(error);
        void toggleVoice();
      });
    return () => controller.abort();
  }, [running, step]);
}
