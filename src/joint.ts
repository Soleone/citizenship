/**
 * Joint progress for "both" mode.
 *
 * Both means one shared run with shared answers and dual credit. To avoid
 * quizzing unread material, joint gating uses the intersection of read
 * sessions. To avoid missing earns, joint results exist only when both learners
 * hold them, and the joint deck keeps the weakest box and the earliest due
 * date from either learner.
 */

import type { ReviewCard, ReviewDeck } from "./learning";
import type { TestResults } from "./curriculum/plan";

function intersectSessions(a: string[], b: string[]): string[] {
  const setB = new Set(b);
  return a.filter((id) => setB.has(id));
}

/** Sessions readable together: only what both have read. Nothing is quizzed before it is taught to both. */
export function jointStudied(you: string[], partner: string[]): string[] {
  return intersectSessions(you, partner);
}

/**
 * A combined deck for drawing and display. Weakest box wins, earliest due
 * wins, lapses add so cards missed by both surface first, settled only when
 * both have settled it.
 */
export function combinedDeck(you: ReviewDeck, partner: ReviewDeck): ReviewDeck {
  const ids = new Set([...Object.keys(you), ...Object.keys(partner)]);
  const next: ReviewDeck = {};
  for (const id of ids) {
    const a = you[id];
    const b = partner[id];
    if (a && !b) {
      next[id] = a;
      continue;
    }
    if (b && !a) {
      next[id] = b;
      continue;
    }
    if (!a || !b) continue;
    const card: ReviewCard = {
      questionId: id,
      box: Math.min(a.box, b.box),
      dueAt: Math.min(a.dueAt, b.dueAt),
      lapses: a.lapses + b.lapses,
      lapsesToday: a.lapsesToday + b.lapsesToday,
      streak: Math.min(a.streak, b.streak),
      updatedAt: Math.max(a.updatedAt, b.updatedAt),
    };
    next[id] = card;
  }
  return next;
}

/**
 * Joint results for gating and display. An entry exists only when both learners
 * hold it, and the worse of the two is shown so a gap for either stays visible.
 * A bad day for one cannot be hidden by the other's best.
 */
export function jointResults(you: TestResults, partner: TestResults): TestResults {
  const next: TestResults = {};
  for (const testId of Object.keys(you)) {
    const a = you[testId];
    const b = partner[testId];
    if (!a || !b) continue;
    const aPct = a.total ? a.correct / a.total : 0;
    const bPct = b.total ? b.correct / b.total : 0;
    const worse = bPct < aPct || (bPct === aPct && b.correct < a.correct) ? b : a;
    next[testId] = {
      ...worse,
      passed: a.passed && b.passed,
    };
  }
  return next;
}

/** Spoken guide questions ticked by both. Ticking together fills the gap for whoever missed it. */
export function jointSpoken(you: string[], partner: string[]): string[] {
  return intersectSessions(you, partner);
}
