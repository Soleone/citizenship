/**
 * Voice mode: study without touching the phone. A switch, not a separate app:
 * each screen says its current step and listens for a command, and the command
 * does what a tap would. The screen stays awake while it is on.
 *
 * It lasts for the page's lifetime only, because playing audio needs a tap
 * first after every load.
 */

import { useEffect, useEffectEvent, useSyncExternalStore } from "react";
import { hear, loadRecognizer, type Command } from "./listen.ts";
import { say } from "./speak.ts";

export type VoiceStatus =
  | { kind: "off" }
  | { kind: "loading"; percent: number }
  | { kind: "idle" | "speaking" | "listening" };

let status: VoiceStatus = { kind: "off" };
const listeners = new Set<() => void>();
let wakeLock: WakeLockSentinel | null = null;

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

async function keepAwake() {
  if (!isOn(status) || document.visibilityState !== "visible") return;
  // Refused on low battery or in a background tab; the session still works, the screen may dim.
  wakeLock = await navigator.wakeLock?.request("screen").catch(() => null);
}
document.addEventListener("visibilitychange", () => void keepAwake());

export async function toggleVoice() {
  if (status.kind !== "off") {
    setStatus({ kind: "off" });
    void wakeLock?.release();
    wakeLock = null;
    return;
  }
  setStatus({ kind: "loading", percent: 0 });
  try {
    await loadRecognizer((percent) => setStatus({ kind: "loading", percent }));
  } catch (error) {
    setStatus({ kind: "off" });
    throw error;
  }
  setStatus({ kind: "idle" });
  void keepAwake();
}

export type Voice = {
  say: (text: string) => Promise<void>;
  hear: (commands: Command[]) => Promise<Command | null>;
  stop: () => void;
};

/** Is voice mode on, for screens that prepare ahead (prefetching clips). */
export const useVoiceOn = () => isOn(useVoice());

/**
 * Runs `turn` while voice mode is on, again whenever `step` changes. A new step,
 * or switching voice off, stops the running turn mid-sentence.
 */
export function useVoiceTurn(step: string, turn: (voice: Voice) => Promise<void>) {
  const on = useVoiceOn();
  const run = useEffectEvent(turn);

  useEffect(() => {
    if (!on) return;
    const controller = new AbortController();
    const { signal } = controller;
    const voice: Voice = {
      say: (text) => (setStatus({ kind: "speaking" }), say(text, signal)),
      hear: (commands) => (setStatus({ kind: "listening" }), hear(commands, signal)),
      stop: () => void toggleVoice(),
    };
    run(voice)
      .then(() => isOn(status) && !signal.aborted && setStatus({ kind: "idle" }))
      .catch((error: unknown) => {
        if (signal.aborted) return;
        console.error(error);
        void toggleVoice();
      });
    return () => controller.abort();
  }, [on, step]);
}
