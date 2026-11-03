/**
 * Curriculum logic: what is next, what is unlocked, and what a test should ask.
 *
 * Kept out of the components on purpose. Choosing 20 questions for a mock exam
 * is the part of this app that decides whether a learner is ready for the real
 * thing, so it wants to be readable and testable on its own, not buried in
 * JSX.
 */

import {
  allQuestions,
  allSessions,
  curriculumModules,
  questionsForModule,
  questionsForSession,
} from "./index.ts";
import type { Module, Session, TestQuestion } from "./types.ts";
import type { ReviewDeck } from "../learning.ts";

/** The real test needs 15 of 20. Practice sets hold a slightly higher bar. */
export const PRACTICE_PASS_RATIO = 0.8;
export const MOCK_QUESTIONS = 20;
export const MOCK_PASS_MARK = 15;
export const MOCK_MINUTES = 45;

export type TestKind = "session" | "module" | "mixed" | "review" | "mock";

export type TestResult = {
  kind: TestKind;
  correct: number;
  total: number;
  pct: number;
  at: number;
  passed: boolean;
};

export type TestResults = Record<string, TestResult>;

export function sessionTestId(sessionId: string) {
  return `session:${sessionId}`;
}

export function moduleTestId(moduleId: string) {
  return `module:${moduleId}`;
}

export const MIXED_TEST_ID = "mixed";
export const MOCK_TEST_ID = "mock";

export function isSessionTestId(testId: string) {
  return testId.startsWith("session:");
}

export function sessionIdFromTest(testId: string) {
  return isSessionTestId(testId) ? testId.slice("session:".length) : null;
}

export function isModuleTestId(testId: string) {
  return testId.startsWith("module:");
}

export function moduleIdFromTest(testId: string) {
  return isModuleTestId(testId) ? testId.slice("module:".length) : null;
}

export function testLabel(testId: string): string {
  const sessionId = sessionIdFromTest(testId);
  if (sessionId)
    return allSessions.find((session) => session.id === sessionId)?.title ?? "Session test";
  const moduleId = moduleIdFromTest(testId);
  if (moduleId) {
    const module = curriculumModules.find((item) => item.id === moduleId);
    return module ? `${module.title} module test` : "Module test";
  }
  if (testId === MOCK_TEST_ID) return "Mock citizenship test";
  if (testId === MIXED_TEST_ID) return "Mixed check";
  return "Memory review";
}

/** Review is a test id too, it just has no fixed question list. */
export const REVIEW_TEST_ID = "review";

export function testKind(testId: string): TestKind {
  if (testId === REVIEW_TEST_ID) return "review";
  if (testId === MOCK_TEST_ID) return "mock";
  if (testId === MIXED_TEST_ID) return "mixed";
  if (isModuleTestId(testId)) return "module";
  return "session";
}

/** Share of the curriculum you should have read before a mock means anything. */
const MOCK_READY_RATIO = 0.4;

export function testAvailability(
  testId: string,
  studied: string[],
): { allowed: boolean; kind: TestKind; reason: string | null } {
  const kind = testKind(testId);
  if (kind === "session") {
    const sessionId = sessionIdFromTest(testId);
    const allowed = Boolean(sessionId && studied.includes(sessionId));
    return {
      allowed,
      kind,
      reason: allowed ? null : "Read this session first. Nothing is quizzed before it is taught.",
    };
  }
  if (kind === "module") {
    const moduleId = moduleIdFromTest(testId);
    const module = curriculumModules.find((item) => item.id === moduleId);
    const missing = module
      ? module.sessions.filter((session) => !studied.includes(session.id)).length
      : 1;
    return {
      allowed: missing === 0 && Boolean(module),
      kind,
      reason: missing
        ? `${missing} ${missing === 1 ? "session" : "sessions"} in this module still unread.`
        : null,
    };
  }
  if (kind === "mixed") {
    const allowed = studied.length >= 2;
    return { allowed, kind, reason: allowed ? null : "Read two sessions and a mixed check opens." };
  }
  if (kind === "mock") {
    const needed = Math.ceil(allSessions.length * MOCK_READY_RATIO);
    const short = needed - studied.length;
    return {
      allowed: short <= 0,
      kind,
      reason:
        short <= 0
          ? null
          : `Read ${short} more of the ${allSessions.length} sessions before a mock score means something.`,
    };
  }
  return { allowed: studied.length > 0, kind, reason: studied.length ? null : "Nothing is due." };
}

/** The questions a given test should ask right now. */
export function buildTest(testId: string, studied: string[], deck: ReviewDeck): TestQuestion[] {
  const kind = testKind(testId);
  if (kind === "session") return sessionTestQuestions(sessionIdFromTest(testId) ?? "");
  if (kind === "module") return moduleTestQuestions(moduleIdFromTest(testId) ?? "", studied);
  if (kind === "mixed") return mixedQuestions(studied);
  if (kind === "mock") return mockQuestions(studied, deck);
  return [];
}

export function scoreResult(
  kind: TestKind,
  correct: number,
  total: number,
  at = Date.now(),
): TestResult {
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const needed =
    kind === "mock"
      ? Math.ceil((total * MOCK_PASS_MARK) / MOCK_QUESTIONS)
      : Math.max(1, Math.round(total * PRACTICE_PASS_RATIO));
  return { kind, correct, total, pct, at, passed: correct >= needed && total > 0 };
}

type SessionProgress = {
  session: Session;
  module: Module;
  studied: boolean;
  result: TestResult | null;
  passed: boolean;
  /** Every question in this session that the learner has missed at least once. */
  lapsed: number;
};

export type ModuleProgress = {
  module: Module;
  sessions: SessionProgress[];
  studied: number;
  passed: number;
  /** All sessions read: the module test is available. */
  readable: boolean;
  /** All session tests passed: the module can be called done. */
  mastered: boolean;
  result: TestResult | null;
  questions: number;
};

function moduleProgress(
  module: Module,
  studied: string[],
  results: TestResults,
  deck: ReviewDeck,
): ModuleProgress {
  const sessions = module.sessions.map((session) => {
    const result = results[sessionTestId(session.id)] ?? null;
    return {
      session,
      module,
      studied: studied.includes(session.id),
      result,
      passed: Boolean(result?.passed),
      lapsed: session.test.filter((question) => (deck[question.id]?.lapses ?? 0) > 0).length,
    };
  });
  const studiedCount = sessions.filter((item) => item.studied).length;
  const passedCount = sessions.filter((item) => item.passed).length;
  return {
    module,
    sessions,
    studied: studiedCount,
    passed: passedCount,
    readable: studiedCount === sessions.length,
    mastered: passedCount === sessions.length,
    result: results[moduleTestId(module.id)] ?? null,
    questions: questionsForModule(module.id).length,
  };
}

export function curriculumProgress(studied: string[], results: TestResults, deck: ReviewDeck) {
  const modules = curriculumModules.map((module) => moduleProgress(module, studied, results, deck));
  const sessions = modules.reduce((sum, item) => sum + item.sessions.length, 0);
  const studiedSessions = modules.reduce((sum, item) => sum + item.studied, 0);
  const passedSessions = modules.reduce((sum, item) => sum + item.passed, 0);
  const masteredModules = modules.filter((item) => item.mastered || item.result?.passed).length;
  const mock = results[MOCK_TEST_ID] ?? null;
  const mockBest = bestOf(results, MOCK_TEST_ID);
  const minutes = modules.reduce(
    (sum, item) =>
      sum +
      item.sessions
        .filter((entry) => !entry.studied)
        .reduce((left, entry) => left + entry.session.minutes, 0),
    0,
  );
  const readinessPct = Math.round(
    100 *
      (0.45 * (sessions ? passedSessions / sessions : 0) +
        0.25 * (modules.length ? masteredModules / modules.length : 0) +
        0.3 * (mockBest ? Math.min(1, mockBest.correct / MOCK_PASS_MARK) : 0)),
  );
  return {
    modules,
    sessions,
    studiedSessions,
    passedSessions,
    masteredModules,
    moduleTestsPassed: modules.filter((item) => item.result?.passed).length,
    mock,
    mockBest,
    minutesLeft: minutes,
    readinessPct,
    questions: allQuestions.length,
  };
}

function bestOf(results: TestResults, testId: string): TestResult | null {
  return results[testId] ?? null;
}

/** Save a result only if it is the best run so far, so a bad day cannot erase a good one. */
export function mergeResult(existing: TestResult | undefined, next: TestResult): TestResult {
  if (!existing) return next;
  if (next.kind === "mock" || next.kind === "module") {
    return next.correct / Math.max(next.total, 1) >= existing.correct / Math.max(existing.total, 1)
      ? next
      : existing;
  }
  return next.passed && !existing.passed ? next : existing.pct >= next.pct ? existing : next;
}

export type CurriculumProgress = ReturnType<typeof curriculumProgress>;
export type NextStep = ReturnType<typeof nextAction>;

export function nextStudiableSession(studied: string[]): Session | null {
  return allSessions.find((session) => !studied.includes(session.id)) ?? null;
}

/** Read the next session, or take the next test, so the loop never dead-ends. */
export function nextAction(studied: string[], results: TestResults) {
  // A session that has been read but never tested is the loose thread: take its
  // test while the material is still warm, before opening anything new.
  const untested = allSessions.find(
    (session) => studied.includes(session.id) && !results[sessionTestId(session.id)],
  );
  if (untested) return { type: "session-test" as const, session: untested };
  const unread = nextStudiableSession(studied);
  if (unread) return { type: "study" as const, session: unread };
  const failed = allSessions.find(
    (session) => studied.includes(session.id) && !results[sessionTestId(session.id)]?.passed,
  );
  if (failed) return { type: "session-test" as const, session: failed };
  const unmastered = curriculumModules.find((module) => !results[moduleTestId(module.id)]?.passed);
  if (unmastered) return { type: "module-test" as const, module: unmastered };
  return { type: "mock" as const };
}

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index--) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

/**
 * Spread a sample across groups so one topic cannot dominate a test.
 * `weight` lets weak questions be picked first inside their own group.
 */
function stratifiedSample<T>(groups: T[][], count: number, weight?: (item: T) => number) {
  const buckets = groups
    .map((group) => {
      const sorted = weight ? [...group].sort((a, b) => weight(b) - weight(a)) : shuffled(group);
      return { pool: sorted, taken: 0 };
    })
    .filter((bucket) => bucket.pool.length);
  if (!buckets.length) return [];

  const picked: T[] = [];
  let round = 0;
  while (picked.length < count) {
    const before = picked.length;
    for (const bucket of buckets) {
      if (picked.length >= count) break;
      const item = bucket.pool[round];
      if (item !== undefined) {
        picked.push(item);
        bucket.taken += 1;
      }
    }
    if (picked.length === before) break;
    round += 1;
  }
  return picked.slice(0, count);
}

function sessionTestQuestions(sessionId: string): TestQuestion[] {
  return questionsForSession(sessionId);
}

function moduleTestQuestions(moduleId: string, studied?: string[], count?: number): TestQuestion[] {
  const module = curriculumModules.find((item) => item.id === moduleId);
  if (!module) return [];
  const readable = studied
    ? module.sessions.filter((session) => studied.includes(session.id))
    : module.sessions;
  const groups = readable.map((session) => questionsForSession(session.id));
  const size = count ?? module.testSize;
  return stratifiedSample<TestQuestion>(groups, Math.min(size, groups.flat().length));
}

function mixedQuestions(studied: string[], count = 12): TestQuestion[] {
  const groups = studied
    .map((sessionId) => questionsForSession(sessionId))
    .filter((group) => group.length);
  return stratifiedSample(groups, Math.min(count, allQuestions.length));
}

/**
 * The mock exam. Twenty questions spread over everything read, one per studied
 * session where possible, weighted toward what has been missed, because the
 * point of a mock is to find the holes before IRCC does.
 */
function mockQuestions(studied: string[], deck: ReviewDeck): TestQuestion[] {
  const read = new Set(studied);
  const byModule = curriculumModules
    .map((module) => ({
      module,
      groups: module.sessions
        .filter((session) => read.has(session.id))
        .map((session) => session.test)
        .filter((group) => group.length),
    }))
    .filter((entry) => entry.groups.length);
  if (!byModule.length) return [];

  const totalGroups = byModule.reduce((sum, entry) => sum + entry.groups.length, 0);
  const weakness = (question: TestQuestion) => {
    const card = deck[question.id];
    return (card?.lapses ?? 0) * 10 + (card ? 5 - card.box : 0);
  };

  // Give every studied module a voice, then hand the rest to the biggest ones.
  const picked: TestQuestion[] = [];
  const remainder: TestQuestion[] = [];
  for (const entry of byModule) {
    const share = Math.max(1, Math.floor((MOCK_QUESTIONS * entry.groups.length) / totalGroups));
    const sample = stratifiedSample<TestQuestion>(
      entry.groups,
      Math.min(share, MOCK_QUESTIONS),
      weakness,
    );
    picked.push(...sample);
    const taken = new Set(sample.map((question) => question.id));
    remainder.push(...entry.groups.flat().filter((question) => !taken.has(question.id)));
  }

  if (picked.length < MOCK_QUESTIONS) {
    const have = new Set(picked.map((question) => question.id));
    const extra = shuffled(remainder.filter((question) => !have.has(question.id))).slice(
      0,
      MOCK_QUESTIONS - picked.length,
    );
    picked.push(...extra);
  }
  return shuffled(picked).slice(0, MOCK_QUESTIONS);
}

/** Sessions that can be quizzed on: read, and still holding questions. */
export function quizzableSessions(studied: string[]): Session[] {
  return allSessions.filter((session) => studied.includes(session.id) && session.test.length > 0);
}
