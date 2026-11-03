/**
 * The run that is standing on the desk right now.
 *
 * A test cannot be rebuilt from its URL: mixed and mock draws are sampled, and a
 * score is the sum of choices already made. So an in-flight attempt is kept here,
 * one per learner per test, and the URL only names which one is open. That pair is
 * what makes a refresh resume the test you were taking instead of quietly
 * restarting it, and it is why the mock clock counts against a wall-clock
 * deadline rather than a number that pauses when the tab closes.
 */

import { getQuestion } from "@/curriculum";
import { testKind } from "@/curriculum/plan";
import { activeProfileIds, type ActiveProfile, type PracticeState } from "@/state";

const ATTEMPT_STORAGE_KEY = "civic-relay-attempt-v1";

/** An attempt nobody resumed is stale content, not a promise to keep it forever. */
const ATTEMPT_TTL_MS = 14 * 24 * 60 * 60 * 1000;

type StoredAttempt = {
  profile: ActiveProfile;
  testId: string;
  state: PracticeState;
  /** Mock exams only: when the clock runs out, in epoch ms. */
  deadlineAt: number | null;
  savedAt: number;
};

export type ActiveAttempt = {
  profile: ActiveProfile;
  testId: string;
  state: PracticeState;
};

export function startAttempt(
  profile: ActiveProfile,
  testId: string,
  state: PracticeState,
): ActiveAttempt {
  const attempt = { profile, testId, state };
  saveAttempt(attempt);
  return attempt;
}

export function saveAttempt(attempt: ActiveAttempt) {
  const stored = readStore();
  stored[attemptKey(attempt.profile, attempt.testId)] = {
    profile: attempt.profile,
    testId: attempt.testId,
    state: attempt.state,
    deadlineAt:
      attempt.state.mode === "mock" && attempt.state.active
        ? Date.now() + attempt.state.secondsLeft * 1000
        : null,
    savedAt: Date.now(),
  };
  writeStore(prune(stored));
}

export function clearAttempt(profile: ActiveProfile, testId: string) {
  const stored = readStore();
  delete stored[attemptKey(profile, testId)];
  writeStore(stored);
}

/**
 * A saved run is only worth resuming if this build still recognises it: the
 * learner, the test, the questions it drew. Anything else is dropped so a
 * rebuilt curriculum cannot hand back a run made of questions that no longer
 * exist.
 */
export function loadAttempt(profile: ActiveProfile, testId: string): ActiveAttempt | null {
  const entry = readStore()[attemptKey(profile, testId)];
  if (!entry) return null;
  if (entry.state.testId !== testId) return null;
  if (!entry.state.active && !entry.state.complete) return null;
  if (!entry.state.questionIds.length || !entry.state.questionIds.every((id) => getQuestion(id))) {
    clearAttempt(profile, testId);
    return null;
  }

  const state = { ...entry.state };
  if (entry.deadlineAt !== null && state.active && state.mode === "mock") {
    // The real test does not pause when you close the laptop, so neither does this.
    state.secondsLeft = Math.max(0, Math.round((entry.deadlineAt - Date.now()) / 1000));
  }
  return { profile: entry.profile, testId: entry.testId, state };
}

/** Which learner is standing at which test: the desk slot an attempt occupies. `both` is its own slot. */
export function attemptKey(profile: ActiveProfile, testId: string) {
  return `${profile}|${testId}`;
}

function prune(store: Record<string, StoredAttempt>) {
  const now = Date.now();
  const kept: Record<string, StoredAttempt> = {};
  for (const [key, entry] of Object.entries(store)) {
    const fresh = now - entry.savedAt < ATTEMPT_TTL_MS;
    const known = activeProfileIds.includes(entry.profile) && testKind(entry.testId);
    const real = entry.state.questionIds.every((id) => getQuestion(id));
    if (fresh && known && real) kept[key] = entry;
  }
  return kept;
}

function readStore(): Record<string, StoredAttempt> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(ATTEMPT_STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Record<string, StoredAttempt>) : {};
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, StoredAttempt>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ATTEMPT_STORAGE_KEY, JSON.stringify(store));
  } catch {
    // A full or blocked localStorage costs a resume, never the study session.
  }
}
