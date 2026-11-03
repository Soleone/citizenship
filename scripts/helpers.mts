import type { ReviewDeck } from "../src/learning.ts";

/** A deck with nothing in it. Tests build their own cards on purpose. */
export function emptyDeck(): ReviewDeck {
  return {};
}
