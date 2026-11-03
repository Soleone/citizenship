/**
 * The reward layer: XP, levels, a daily goal and a day streak.
 *
 * Kept separate from the Leitner deck on purpose. The deck decides what you
 * should see again; this only decides how good it feels to keep showing up.
 * Pure functions over a small per-learner record, so it is easy to test.
 */

import { DAY_MS, dayKey, startOfDay } from "./learning.ts";

export type GameStats = {
  xp: number;
  /** XP earned per local day, keyed by `dayKey`. The streak is read from this. */
  days: Record<string, number>;
  /** Most correct answers in one 60-second blitz. */
  bestBlitz: number;
};

export const emptyGameStats: GameStats = { xp: 0, days: {}, bestBlitz: 0 };

export const DAILY_GOAL_XP = 100;

export const XP = {
  correct: 10,
  /** Added per answer already in a row, capped, so a hot streak pays a little more. */
  comboStep: 2,
  comboCap: 10,
  blitzCorrect: 5,
  sessionDone: 25,
  testPassed: 25,
  mockPassed: 100,
} as const;

export function answerXp(combo: number) {
  return XP.correct + Math.min(combo * XP.comboStep, XP.comboCap);
}

export function addXp(stats: GameStats, amount: number, now = Date.now()): GameStats {
  if (amount <= 0) return stats;
  const today = dayKey(now);
  return {
    ...stats,
    xp: stats.xp + amount,
    days: { ...stats.days, [today]: (stats.days[today] ?? 0) + amount },
  };
}

export function todayXp(stats: GameStats, now = Date.now()) {
  return stats.days[dayKey(now)] ?? 0;
}

/**
 * Consecutive days with any XP, counting back from today. A streak that has not
 * been extended yet today still counts until midnight, so the morning does not
 * open with a broken streak.
 */
export function dayStreak(stats: GameStats, now = Date.now()) {
  let cursor = startOfDay(now);
  if (!stats.days[dayKey(cursor)]) cursor -= DAY_MS;
  let streak = 0;
  // Noon avoids a daylight-saving hour pushing the key onto the wrong day.
  while (stats.days[dayKey(cursor + DAY_MS / 2)]) {
    streak += 1;
    cursor -= DAY_MS;
  }
  return streak;
}

/** Titles follow the road to the oath, not a fantasy game. */
const LEVELS = [
  { xp: 0, title: "Newcomer" },
  { xp: 150, title: "Explorer" },
  { xp: 400, title: "Voyageur" },
  { xp: 800, title: "Pathfinder" },
  { xp: 1400, title: "Trailblazer" },
  { xp: 2200, title: "Northern Star" },
  { xp: 3200, title: "Test-ready" },
  { xp: 4500, title: "Oath-ready" },
] as const;

export function levelFor(xp: number) {
  let index = 0;
  while (index + 1 < LEVELS.length && xp >= LEVELS[index + 1].xp) index += 1;
  const current = LEVELS[index];
  const next = LEVELS[index + 1] ?? null;
  const span = next ? next.xp - current.xp : 1;
  return {
    level: index + 1,
    title: current.title,
    nextTitle: next?.title ?? null,
    toNext: next ? next.xp - xp : 0,
    pct: next ? Math.round(((xp - current.xp) / span) * 100) : 100,
  };
}
