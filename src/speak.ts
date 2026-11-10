/**
 * Says a line out loud: its pre-generated clip from the sync Worker's bucket, or
 * the phone's own voice when the line has no clip yet (edited text not
 * regenerated), so voice mode never goes silent.
 */

import { invoke, isTauri } from "@tauri-apps/api/core";
import { clipId } from "./audio.ts";
import { SYNC_URL } from "./sync.ts";

const CLIPS = `${SYNC_URL}/audio/phonon-miles`;

/** Text to a playable blob URL, or null when there is no clip. */
const clips = new Map<string, Promise<string | null>>();

async function fetchClip(text: string) {
  try {
    const response = await fetch(`${CLIPS}/${await clipId(text)}.mp3`);
    return response.ok ? URL.createObjectURL(await response.blob()) : null;
  } catch {
    clips.delete(text); // offline: try again next time
    return null;
  }
}

function load(text: string) {
  let clip = clips.get(text);
  if (!clip) {
    clip = fetchClip(text);
    clips.set(text, clip);
  }
  return clip;
}

/** Downloads ahead, so a dead zone on the road doesn't stall a session. */
export function prefetch(texts: string[]) {
  for (const text of texts) void load(text);
}

export async function say(text: string, signal: AbortSignal) {
  const url = await load(text);
  signal.throwIfAborted();
  await new Promise<void>((resolve) => {
    signal.addEventListener("abort", () => resolve(), { once: true });
    if (url) {
      const audio = new Audio(url);
      audio.onended = audio.onerror = () => resolve();
      signal.addEventListener("abort", () => audio.pause(), { once: true });
      audio.play().catch(() => resolve());
    } else if (isTauri()) {
      // The app's WebView has no speechSynthesis.
      void invoke("speak", { text }).finally(resolve);
      signal.addEventListener("abort", () => void invoke("silence"), { once: true });
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-CA";
      utterance.onend = utterance.onerror = () => resolve();
      signal.addEventListener("abort", () => speechSynthesis.cancel(), { once: true });
      speechSynthesis.speak(utterance);
    }
  });
  signal.throwIfAborted();
}
