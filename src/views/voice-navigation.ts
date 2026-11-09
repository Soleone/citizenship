/**
 * Voice mode on screens without spoken steps of their own (Home, tests): move
 * through the page's buttons and links like a keyboard with "down" and "up",
 * each read out, and "open" to press one. Labels are read by the phone's own
 * voice, since they change too often for clips.
 */

import { phrases } from "@/audio";
import { useVoiceTurn } from "@/voice";

const label = (element: HTMLElement) =>
  (element.getAttribute("aria-label") ?? element.innerText).replace(/\s+/g, " ").trim();

function choices() {
  const main = document.querySelector("main") ?? document.body;
  return [
    ...main.querySelectorAll<HTMLElement>("a[href], button:not(:disabled), [role=button]"),
  ].filter((element) => element.getClientRects().length > 0);
}

/** The heading, else the page's name ("Test" from "Test · Citizenship"); Home has neither. */
function screenName() {
  const heading = document.querySelector("main h1")?.textContent;
  const name = document.title.split(" · ")[0];
  return heading || (name === "Citizenship" ? "Home" : name);
}

let hinted = false;

/** `screen` names the current screen, so voice mode starts over on a new one; null is off. */
export function useVoiceNavigation(screen: string | null) {
  useVoiceTurn(screen, async (voice) => {
    await voice.say(screenName());
    if (!hinted) await voice.say(phrases.navigate);
    hinted = true;
    let silent = 0;
    for (;;) {
      const command = await voice.hear(["down", "up", "open", "repeat"]);
      if (!command) {
        if (++silent === 2) return voice.pause();
        continue;
      }
      silent = 0;
      const all = choices();
      const at = all.indexOf(document.activeElement as HTMLElement);
      const current = all[at];

      if (command === "repeat") await voice.say(current ? label(current) : screenName());
      else if (command === "open") {
        if (!current) {
          await voice.say(phrases.pickFirst);
          continue;
        }
        current.click(); // a link or test button moves to a new screen, which starts its own turn
        await new Promise((resolve) => setTimeout(resolve, 150));
        const expanded = current.getAttribute("aria-expanded");
        if (expanded) await voice.say(expanded === "true" ? phrases.opened : phrases.closed);
      } else {
        const to = Math.min(Math.max(at + (command === "down" ? 1 : -1), 0), all.length - 1);
        if (to === at) {
          await voice.say(command === "down" ? phrases.last : phrases.first);
          continue;
        }
        all[to].focus();
        all[to].scrollIntoView({ block: "center", behavior: "smooth" });
        await voice.say(label(all[to]));
      }
    }
  });
}
