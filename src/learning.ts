/**
 * The memory layer.
 *
 * A check teaches you something the moment you answer it. This module decides
 * when that same question should come back, so nothing you missed quietly
 * disappears until the real test.
 *
 * Model: Leitner boxes. Every answered question gets a card. A correct answer
 * moves it one box forward (longer gap). A miss sends it back to box 0, due
 * tomorrow, and gets one more try before the current check ends.
 */

export const DAY_MS = 86_400_000;

/** Days until the next look, per box. Box 0 is the "this keeps slipping" box. */
const boxGaps = [1, 2, 4, 7, 16, 35] as const;

const masteredBox = boxGaps.length - 1;

/** Consecutive correct answers needed before a card counts as settled. */
const masteredStreak = 3;

/** How many extra attempts a miss buys you inside the same check. */
const maxRequeuesPerCheck = 1;

export type ReviewCard = {
  questionId: string;
  /** Leitner box, 0 = weakest. */
  box: number;
  /** Local midnight at the start of the day this card should be seen again. */
  dueAt: number;
  /** Total misses ever. Drives the weak-spot list. */
  lapses: number;
  /** Misses today, so the result screen can tell "once" from "again". */
  lapsesToday: number;
  /** Consecutive correct answers. */
  streak: number;
  updatedAt: number;
};

export type ReviewDeck = Record<string, ReviewCard>;
export type ReviewDecks = Record<string, ReviewDeck>;

export function startOfDay(ts: number) {
  const date = new Date(ts);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export function dayKey(ts = Date.now()) {
  return new Date(ts).toLocaleDateString("en-CA");
}

/** Local midnight `days` calendar days out, so a card is due for all of that day. */
export function dueAfter(now: number, days: number) {
  return startOfDay(now) + days * DAY_MS;
}

function freshCard(questionId: string, now = Date.now()): ReviewCard {
  return {
    questionId,
    box: 0,
    dueAt: now,
    lapses: 0,
    lapsesToday: 0,
    streak: 0,
    updatedAt: now,
  };
}

function gapForBox(box: number) {
  return boxGaps[Math.min(Math.max(box, 0), masteredBox)];
}

/**
 * Record one answer. Pure: returns a new deck, the old one stays untouched.
 */
export function gradeAnswer(
  deck: ReviewDeck,
  questionId: string,
  correct: boolean,
  now = Date.now(),
): ReviewDeck {
  const current = deck[questionId] ?? freshCard(questionId, now);
  const next: ReviewCard = correct
    ? (() => {
        const box = Math.min(current.box + 1, masteredBox);
        const promotedDue = dueAfter(now, gapForBox(box));
        // A card missed today still gets its tomorrow look, even if the
        // in-session second try went well.
        const keepEarlier = current.lapsesToday > 0 && current.dueAt > now;
        const dueAt = keepEarlier ? Math.min(current.dueAt, promotedDue) : promotedDue;
        return { ...current, box, dueAt, streak: current.streak + 1, updatedAt: now };
      })()
    : {
        ...current,
        box: 0,
        dueAt: dueAfter(now, gapForBox(0)),
        lapses: current.lapses + 1,
        lapsesToday: current.lapsesToday + 1,
        streak: 0,
        updatedAt: now,
      };

  return { ...deck, [questionId]: next };
}

/** Called when the day changes, so yesterday's miss counts stop applying. */
export function rollDeckLapses(deck: ReviewDeck, now = Date.now()): ReviewDeck {
  let changed = false;
  const next: ReviewDeck = {};
  for (const [questionId, card] of Object.entries(deck)) {
    const freshDay = now - card.updatedAt >= DAY_MS;
    next[questionId] = freshDay ? { ...card, lapsesToday: 0 } : card;
    changed = changed || freshDay;
  }
  return changed ? next : deck;
}

function cards(deck: ReviewDeck): ReviewCard[] {
  return Object.values(deck);
}

function isDue(card: ReviewCard, now = Date.now()) {
  return card.dueAt <= now;
}

/** Weakest first: a review session should feel like triage, not a lottery. */
export function dueCards(deck: ReviewDeck, now = Date.now()): ReviewCard[] {
  return cards(deck)
    .filter((card) => isDue(card, now))
    .sort((a, b) => a.box - b.box || a.dueAt - b.dueAt || b.lapses - a.lapses);
}

/** A miss buys exactly one more look at that question in the same check. */
export function shouldRequeue(alreadyRequeued: number) {
  return alreadyRequeued < maxRequeuesPerCheck;
}

export function isSettled(card: ReviewCard) {
  return card.box >= masteredBox && card.streak >= masteredStreak;
}

/** Anything that has been missed and not yet earned its way out. */
export function weakCards(deck: ReviewDeck, limit = 4): ReviewCard[] {
  return cards(deck)
    .filter((card) => card.lapses > 0 && !isSettled(card))
    .sort((a, b) => b.lapses - a.lapses || a.box - b.box || a.dueAt - b.dueAt)
    .slice(0, limit);
}

export function needsReread(card: ReviewCard) {
  return card.lapsesToday >= 2 || card.lapses >= 3;
}

export function deckCounts(deck: ReviewDeck, now = Date.now()) {
  const all = cards(deck);
  return {
    total: all.length,
    due: all.filter((card) => isDue(card, now)).length,
    settled: all.filter(isSettled).length,
    waiting: all.filter((card) => !isSettled(card) && !isDue(card, now)).length,
  };
}

function daysUntil(dueAt: number, now = Date.now()) {
  return Math.round((startOfDay(dueAt) - startOfDay(now)) / DAY_MS);
}

export function formatDue(dueAt: number, now = Date.now()) {
  if (dueAt <= now) return "due now";
  const days = daysUntil(dueAt, now);
  if (days <= 0) return "due today";
  if (days === 1) return "due tomorrow";
  if (days < 7) return `due in ${days} days`;
  return `due ${new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric" }).format(new Date(dueAt))}`;
}
