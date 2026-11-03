/**
 * Every screen the app has is a URL, and every URL names exactly one screen.
 *
 * The reason is boring and real: a study desk that keeps its place in memory
 * loses that place on refresh, cannot go back, and shows nothing in the address
 * bar to tell you which learner you are editing. So the address bar is the
 * record and the back button works.
 *
 * Two rules decide how much goes into a path:
 *
 * 1. Anything that can be rebuilt from the URL alone belongs in the URL. A study
 *    session and its bite number are fixed content, so `/study/history.bite?bite=3`
 *    opens at the third bite with no help from storage.
 * 2. Anything that cannot is only *projected* there. A mixed or mock test draws
 *    its questions at random, so `/tests/mock/q/7` records where the run stands;
 *    a cold visit that cannot reproduce those questions starts a fresh run and the
 *    URL is corrected in place. In-flight answers live in localStorage
 *    (see `attempt.ts`), which is what makes a refresh resume rather than reset.
 */

import { matchPath } from "react-router";
import {
  MIXED_TEST_ID,
  MOCK_TEST_ID,
  REVIEW_TEST_ID,
  isModuleTestId,
  isSessionTestId,
  moduleIdFromTest,
  sessionIdFromTest,
} from "./curriculum/plan.ts";
// Types only, so `npm run routes:check` can load this file in plain Node.
import type { ActiveProfile, View } from "./state.ts";

export type Route =
  | { view: View }
  /** `/study/<session>` is the reading screen. The chapter list is Home. */
  | { view: "curriculum"; sessionId: string; complete: boolean }
  /** `/tests/<test>` is a run of that test. Tests are started from Home. */
  | { view: "practice"; testId: string; index: number | null; complete: boolean }
  | { view: "notFound" };

/** `?as=partner` or `?as=both` is the only mode worth a URL: it decides whose progress you see. */
export const PROFILE_PARAM = "as";
export const BITE_PARAM = "bite";

/** Keyed by the union in `state.ts`, so a fourth learner has to be named here too. */
const PROFILE_VALUES: Record<ActiveProfile, ActiveProfile> = {
  you: "you",
  partner: "partner",
  both: "both",
};
const PROFILE_NAMES = Object.values(PROFILE_VALUES);

export const VIEW_PATHS: Record<View, string> = {
  overview: "/",
  blitz: "/blitz",
  together: "/together",
  runway: "/application",
};

/** Test ids are storage keys (`session:<id>`); paths read like a station on a line. */
const BARE_TEST_SEGMENTS: Record<string, string> = {
  [REVIEW_TEST_ID]: "review",
  [MIXED_TEST_ID]: "mixed",
  [MOCK_TEST_ID]: "mock",
};
const BARE_TEST_IDS: Record<string, string> = Object.fromEntries(
  Object.entries(BARE_TEST_SEGMENTS).map(([testId, segment]) => [segment, testId]),
);

export function viewPath(view: View) {
  return VIEW_PATHS[view];
}

export function studyPath(
  sessionId: string,
  opts: { bite?: number | null; complete?: boolean } = {},
) {
  const base = `/study/${encode(sessionId)}`;
  if (opts.complete) return `${base}/complete`;
  // Bite 1 is the shape of the screen, so it needs no parameter.
  return opts.bite ? `${base}?${BITE_PARAM}=${opts.bite + 1}` : base;
}

/** Question 1 is the shape of a run too, so `/q/n` starts counting at 1. */
export function testPath(testId: string, opts: { index?: number | null; complete?: boolean } = {}) {
  const base = `/tests/${testSegment(testId)}`;
  if (opts.complete) return `${base}/complete`;
  return opts.index ? `${base}/q/${opts.index + 1}` : base;
}

function testSegment(testId: string) {
  if (BARE_TEST_SEGMENTS[testId]) return BARE_TEST_SEGMENTS[testId];
  if (isSessionTestId(testId)) return `session/${encode(sessionIdFromTest(testId) ?? "")}`;
  if (isModuleTestId(testId)) return `module/${encode(moduleIdFromTest(testId) ?? "")}`;
  return "";
}

/**
 * Match a pathname against the app's shape. Ordered most specific first: a path
 * that looks like a route but names something unknown comes back as `notFound`
 * rather than silently landing somewhere else.
 */
export function parseRoute(pathname: string): Route {
  const path = pathOnly(pathname);

  const studyStep = matchPath({ path: "/study/:sessionId/:step", end: true }, path);
  if (studyStep?.params.sessionId) {
    if (studyStep.params.step !== "complete") return NOT_FOUND;
    return { view: "curriculum", sessionId: decode(studyStep.params.sessionId), complete: true };
  }

  const studyRow = matchPath({ path: "/study/:sessionId", end: true }, path);
  if (studyRow?.params.sessionId) {
    return { view: "curriculum", sessionId: decode(studyRow.params.sessionId), complete: false };
  }

  const questionRun = matchPath({ path: "/tests/:kind/:subject/q/:index", end: true }, path);
  if (questionRun?.params.subject) {
    return questionRoute(
      testIdFromSegments(questionRun.params.kind, questionRun.params.subject),
      questionRun.params.index,
    );
  }

  const bareQuestionRun = matchPath({ path: "/tests/:kind/q/:index", end: true }, path);
  if (bareQuestionRun?.params.kind) {
    return questionRoute(
      testIdFromSegments(bareQuestionRun.params.kind),
      bareQuestionRun.params.index,
    );
  }

  const finishedRun = matchPath({ path: "/tests/:kind/:subject/complete", end: true }, path);
  if (finishedRun?.params.subject) {
    return completeRoute(testIdFromSegments(finishedRun.params.kind, finishedRun.params.subject));
  }

  const bareFinishedRun = matchPath({ path: "/tests/:kind/complete", end: true }, path);
  if (bareFinishedRun?.params.kind) {
    return completeRoute(testIdFromSegments(bareFinishedRun.params.kind));
  }

  const namedRun = matchPath({ path: "/tests/:kind/:subject", end: true }, path);
  if (namedRun?.params.subject) {
    return startedRoute(testIdFromSegments(namedRun.params.kind, namedRun.params.subject));
  }

  const bareRun = matchPath({ path: "/tests/:kind", end: true }, path);
  if (bareRun?.params.kind) {
    // `session` and `module` name a line, not a test: they need a subject.
    return startedRoute(testIdFromSegments(bareRun.params.kind));
  }

  for (const [view, prefix] of Object.entries(VIEW_PATHS) as Array<[View, string]>) {
    if (path === prefix) return { view };
  }

  return NOT_FOUND;
}

function questionRoute(testId: string | null, rawIndex: string | undefined): Route {
  if (!testId) return NOT_FOUND;
  const index = ordinal(rawIndex);
  return index === null ? NOT_FOUND : { view: "practice", testId, index, complete: false };
}

function completeRoute(testId: string | null): Route {
  return testId ? { view: "practice", testId, index: null, complete: true } : NOT_FOUND;
}

function startedRoute(testId: string | null): Route {
  return testId ? { view: "practice", testId, index: null, complete: false } : NOT_FOUND;
}

/** A `/tests/<kind>` path becomes the test id the plan and the deck already use. */
function testIdFromSegments(kind?: string, subject?: string): string | null {
  if (kind === "session") return subject ? `session:${decode(subject)}` : null;
  if (kind === "module") return subject ? `module:${decode(subject)}` : null;
  if (subject || !kind) return null;
  return BARE_TEST_IDS[kind] ?? null;
}

export function profileFromSearch(search: string): ActiveProfile {
  const value = new URLSearchParams(search).get(PROFILE_PARAM) ?? "";
  return PROFILE_NAMES.includes(value as ActiveProfile) ? (value as ActiveProfile) : "you";
}

export function biteFromSearch(search: string): number | null {
  return ordinal(new URLSearchParams(search).get(BITE_PARAM));
}

/**
 * Keep the learner you are studying as while moving around. `you` is the default,
 * so it stays out of the URL and most paths read clean. `both` is explicit.
 */
export function withProfile(path: string, profile: ActiveProfile) {
  // Any base will do: only the pieces of the path are wanted back out.
  const url = new URL(path, "http://relay.local");
  if (profile === "you") url.searchParams.delete(PROFILE_PARAM);
  else url.searchParams.set(PROFILE_PARAM, profile);
  const query = url.searchParams.toString();
  return `${url.pathname}${query ? `?${query}` : ""}${url.hash}`;
}

/** `?bite=3` and `/q/7` count from 1; the state arrays count from 0. */
function ordinal(value: string | undefined | null) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) return null;
  return parsed - 1;
}

/** A path, a path with a query, and a path with an anchor all name the same page. */
function pathOnly(value: string) {
  const bare = value.split("?")[0].split("#")[0];
  return bare.length > 1 && bare.endsWith("/") ? bare.slice(0, -1) : bare;
}

function encode(value: string) {
  return encodeURIComponent(value);
}

function decode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

const NOT_FOUND: Route = { view: "notFound" };
