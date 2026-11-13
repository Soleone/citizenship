/**
 * Voice mode on screens without spoken steps of their own (Home, tests): move
 * through the page's buttons and links with "down" and "up" between rows and
 * "left" and "right" inside one, the landing place read out, and "open" to
 * press it. Several in one breath ("down down right") are one move. Labels are
 * read by the phone's own voice, since they change too often for clips.
 */

import { phrases } from "@/audio";
import type { Command } from "@/listen";
import { useVoiceTurn } from "@/voice";

const label = (element: HTMLElement) =>
  (element.getAttribute("aria-label") ?? element.innerText).replace(/\s+/g, " ").trim();

function choices() {
  const main = document.querySelector("main") ?? document.body;
  return [
    ...main.querySelectorAll<HTMLElement>("a[href], button:not(:disabled), [role=button]"),
  ].filter((element) => element.getClientRects().length > 0);
}

/** Choices side by side are one row: each one's middle is level with the row's first. */
function rows(all: HTMLElement[]) {
  const lines: HTMLElement[][] = [];
  let first: DOMRect | null = null;
  for (const element of all) {
    const rect = element.getBoundingClientRect();
    const middle = (rect.top + rect.bottom) / 2;
    if (first && middle > first.top && middle < first.bottom) lines.at(-1)?.push(element);
    else {
      lines.push([element]);
      first = rect;
    }
  }
  return lines;
}

type Move = "down" | "up" | "left" | "right";
const isMove = (command: Command): command is Move =>
  command === "down" || command === "up" || command === "left" || command === "right";

/** Where `move` lands from `at`, or `at` itself at an edge. From nowhere, every move starts at the top. */
function land(all: HTMLElement[], at: number, move: Move) {
  if (at < 0) return 0;
  const lines = rows(all);
  const row = lines.findIndex((line) => line.includes(all[at]));
  const to =
    move === "down" || move === "up"
      ? lines[row + (move === "down" ? 1 : -1)]?.[0]
      : lines[row][lines[row].indexOf(all[at]) + (move === "right" ? 1 : -1)];
  return to ? all.indexOf(to) : at;
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
      const said = await voice.hearAll(["down", "up", "left", "right", "open", "repeat"]);
      if (said.length === 0) {
        if (++silent === 2) return voice.pause();
        continue;
      }
      silent = 0;
      const all = choices();
      const from = all.indexOf(document.activeElement as HTMLElement);

      const moves = said.filter(isMove);
      let at = from;
      for (const move of moves) at = land(all, at, move);
      if (at !== from) {
        all[at].focus();
        all[at].scrollIntoView({ block: "center", behavior: "smooth" });
      }
      const current = all.at(at);

      // "down down open" presses where it lands, without reading it out first.
      if (said.includes("open")) {
        if (!current) {
          await voice.say(phrases.pickFirst);
          continue;
        }
        current.click(); // a link or test button moves to a new screen, which starts its own turn
        await new Promise((resolve) => setTimeout(resolve, 150));
        const expanded = current.getAttribute("aria-expanded");
        if (expanded) await voice.say(expanded === "true" ? phrases.opened : phrases.closed);
      } else if (moves.length > 0 && at === from) {
        const forward = moves[0] === "down" || moves[0] === "right";
        await voice.say(forward ? phrases.last : phrases.first);
      } else await voice.say(current ? label(current) : screenName());
    }
  });
}
