/**
 * Logic check for the curriculum engine.
 *
 *   npm run curriculum:logic
 *
 * The content check proves that a claim is in the guide. This proves the part
 * that decides what a learner is actually asked: gating, sampling, scoring and
 * the way a result is remembered. A mock exam that quietly returns 18 questions,
 * or a module test that can be taken before the module is read, is a bug in the
 * promise the app makes.
 */

import {
  curriculumModules,
  getQuestion,
  getStudyRef,
  allQuestions,
  allSessions,
} from "../src/curriculum/index.ts";
import {
  MOCK_QUESTIONS,
  MOCK_TEST_ID,
  MIXED_TEST_ID,
  REVIEW_TEST_ID,
  buildTest,
  curriculumProgress,
  mergeResult,
  moduleTestId,
  nextAction,
  scoreResult,
  sessionTestId,
  testAvailability,
  testKind,
  testLabel,
} from "../src/curriculum/plan.ts";
import {
  DAY_MS,
  dueAfter,
  dueCards,
  gradeAnswer,
  isSettled,
  needsReread,
  shouldRequeue,
  weakCards,
  deckCounts,
} from "../src/learning.ts";
import { emptyDeck } from "./helpers.mts";
import { addXp, dayStreak, emptyGameStats, levelFor, todayXp } from "../src/game.ts";

const failures: string[] = [];
const ok = (label: string) => console.log(`  ok  ${label}`);
function assert(condition: boolean, label: string) {
  if (condition) ok(label);
  else failures.push(label);
}

// --- every question resolves back to the bite that teaches it ---------------
const orphans = allQuestions.filter((question) => !getStudyRef(question.id));
assert(orphans.length === 0, `all ${allQuestions.length} questions resolve to a study bite`);

const badBites = allSessions.filter((session) =>
  session.test.some((question) => !session.bites.some((bite) => bite.id === question.biteId)),
);
assert(badBites.length === 0, "no question points at a bite outside its own session");

// --- gating: nothing is askable before it is read --------------------------
const firstSession = allSessions[0];
const firstModule = curriculumModules[0];
const nothing = [firstSession.id];

assert(
  testAvailability(sessionTestId(firstSession.id), []).allowed === false,
  "an unread session cannot be tested",
);
assert(
  testAvailability(sessionTestId(firstSession.id), nothing).allowed === true,
  "a read session can be tested",
);
assert(
  testAvailability(moduleTestId(firstModule.id), nothing).allowed === false,
  "a half-read module cannot be tested",
);
assert(
  testAvailability(
    moduleTestId(firstModule.id),
    firstModule.sessions.map((session) => session.id),
  ).allowed === true,
  "a fully read module can be tested",
);
assert(
  testAvailability(MIXED_TEST_ID, nothing).allowed === false,
  "one session is not a mixed check",
);
assert(
  testAvailability(MOCK_TEST_ID, nothing).allowed === false,
  "the mock stays locked while the curriculum is unread",
);

// every unread question must stay out of every generated test
const unreadOnly = allSessions
  .filter((session) => !nothing.includes(session.id))
  .flatMap((session) => session.test);
const leaked = [
  ...buildTest(moduleTestId(firstModule.id), nothing, emptyDeck()),
  ...buildTest(MIXED_TEST_ID, nothing, emptyDeck()),
  ...buildTest(MOCK_TEST_ID, nothing, emptyDeck()),
].filter((question) => unreadOnly.some((item) => item.id === question.id));
assert(leaked.length === 0, "unread material cannot appear in a module, mixed or mock test");

// --- sampling ---------------------------------------------------------------
for (const module of curriculumModules) {
  const ids = module.sessions.flatMap((session) => session.test.map((question) => question.id));
  for (let attempt = 0; attempt < 25; attempt++) {
    const sample = buildTest(
      moduleTestId(module.id),
      module.sessions.map((session) => session.id),
      emptyDeck(),
    );
    if (sample.length !== Math.min(module.testSize, ids.length)) {
      failures.push(
        `module ${module.id} test returned ${sample.length} questions, expected ${Math.min(module.testSize, ids.length)}`,
      );
      break;
    }
    if (new Set(sample.map((question) => question.id)).size !== sample.length) {
      failures.push(`module ${module.id} test repeated a question`);
      break;
    }
  }
}
ok("module tests return the promised size, with no repeats, across 25 draws each");

const everything = allSessions.map((session) => session.id);
for (let attempt = 0; attempt < 40; attempt++) {
  const mock = buildTest(MOCK_TEST_ID, everything, emptyDeck());
  if (mock.length !== MOCK_QUESTIONS) {
    failures.push(`mock returned ${mock.length} questions instead of ${MOCK_QUESTIONS}`);
    break;
  }
  if (new Set(mock.map((question) => question.id)).size !== MOCK_QUESTIONS) {
    failures.push("mock repeated a question");
    break;
  }
  if (attempt === 39) ok(`mock always returns ${MOCK_QUESTIONS} distinct questions`);
}

const mockModules = new Set(
  buildTest(MOCK_TEST_ID, everything, emptyDeck()).map(
    (question) => getStudyRef(question.id)?.session.moduleId,
  ),
);
assert(mockModules.size >= 5, `a mock spans ${mockModules.size} modules rather than one chapter`);

// weak questions should surface in the mock
const deck = emptyDeck();
const weakIds = curriculumModules[0].sessions[0].test.slice(0, 3).map((question) => question.id);
for (const id of weakIds) {
  deck[id] = {
    questionId: id,
    box: 0,
    dueAt: 0,
    lapses: 6,
    lapsesToday: 0,
    streak: 0,
    updatedAt: 0,
  };
}
let surfaced = 0;
for (let attempt = 0; attempt < 60; attempt++) {
  const mock = buildTest(MOCK_TEST_ID, everything, deck);
  if (mock.some((question) => weakIds.includes(question.id))) surfaced += 1;
}
assert(
  surfaced > 40,
  `missed questions appear in ${surfaced}/60 mocks instead of being sampled away`,
);

// --- scoring ----------------------------------------------------------------
const sessionEight = scoreResult("session", 6, 8);
assert(sessionEight.passed === true, "6 of 8 passes a session test (80 percent bar)");
assert(scoreResult("session", 5, 8).passed === false, "5 of 8 does not");
const mockPass = scoreResult("mock", 15, 20);
assert(mockPass.passed === true, "15 of 20 passes a mock, matching the official mark");
assert(scoreResult("mock", 14, 20).passed === false, "14 of 20 fails a mock");
assert(scoreResult("review", 0, 0).passed === false, "an empty test is never a pass");

// --- results and readiness ---------------------------------------------------
const first = scoreResult("mock", 12, 20);
const better = scoreResult("mock", 18, 20);
const worse = scoreResult("mock", 9, 20);
assert(mergeResult(first, better) === better, "a better mock replaces the stored result");
assert(mergeResult(better, worse) === better, "a worse mock cannot erase a good one");

const emptyProgress = curriculumProgress([], {}, emptyDeck());
assert(emptyProgress.readinessPct === 0, "readiness starts at zero");
assert(
  emptyProgress.sessions === allSessions.length,
  `progress counts all ${allSessions.length} sessions`,
);
const passedAll = curriculumProgress(
  everything,
  Object.fromEntries([
    ...allSessions.map((session) => [sessionTestId(session.id), scoreResult("session", 8, 8)]),
    ...curriculumModules.map((module) => [moduleTestId(module.id), scoreResult("module", 12, 12)]),
    [MOCK_TEST_ID, scoreResult("mock", 20, 20)],
  ]),
  emptyDeck(),
);
assert(
  passedAll.readinessPct >= 95,
  `a fully passed curriculum reads ${passedAll.readinessPct}% ready`,
);

// --- next action never dead-ends -------------------------------------------
assert(nextAction([], {}).type === "study", "with nothing read, the next action is to study");
const studiedOnly = nextAction([firstSession.id], {});
assert(
  studiedOnly.type === "session-test",
  "after reading one session, the next action is its test",
);
assert(
  nextAction(everything, {}).type === "session-test",
  "with everything read, the next action is a test",
);
const done: Record<string, ReturnType<typeof scoreResult>> = {
  ...Object.fromEntries(
    allSessions.map((session) => [sessionTestId(session.id), scoreResult("session", 8, 8)]),
  ),
  ...Object.fromEntries(
    curriculumModules.map((module) => [moduleTestId(module.id), scoreResult("module", 12, 12)]),
  ),
};
assert(
  nextAction(everything, done).type === "mock",
  "once every test is passed, the app points at the mock",
);

// --- labels and kinds --------------------------------------------------------
assert(
  testKind(sessionTestId(firstSession.id)) === "session",
  "a session test id reads as a session test",
);
assert(
  testKind(moduleTestId(firstModule.id)) === "module",
  "a module test id reads as a module test",
);
assert(
  testKind(MOCK_TEST_ID) === "mock" && testKind(MIXED_TEST_ID) === "mixed",
  "mock and mixed ids read correctly",
);
assert(testKind(REVIEW_TEST_ID) === "review", "the review queue is its own kind");
assert(
  testLabel(moduleTestId(firstModule.id)).includes("module test"),
  "module tests are labelled honestly",
);
assert(getQuestion(allQuestions[0].id) === allQuestions[0], "question lookup round-trips");

// --- the memory engine the queue is built on ------------------------------
const day0 = new Date(2026, 0, 15, 9, 0, 0).getTime();
const question = allQuestions[0].id;

let drill = gradeAnswer(emptyDeck(), question, false, day0);
assert(drill[question].box === 0, "a miss drops the card to the weakest box");
assert(
  drill[question].lapses === 1 && drill[question].lapsesToday === 1,
  "a miss is counted once in total and once today",
);
assert(dueCards(drill, day0 + DAY_MS).length === 1, "the missed card is due tomorrow");
assert(dueCards(drill, day0 + DAY_MS / 2).length === 0, "and not before then");

let settledDeck = emptyDeck();
for (let box = 0; box < 6; box++)
  settledDeck = gradeAnswer(settledDeck, question, true, day0 + box * 40 * DAY_MS);
assert(isSettled(settledDeck[question]), "six boxes in a row settles a card");
assert(settledDeck[question].box === 5, "the top box is the 35-day box");

// Answer it correctly on the second try, a minute after the miss, and it still
// owes you a look tomorrow. That second try proved recognition, not recall.
const missed = gradeAnswer(settledDeck, question, false, day0);
const retried = gradeAnswer(missed, question, true, day0 + 60_000);
assert(
  retried[question].dueAt === dueAfter(day0, 1),
  "an in-session second try cannot postpone tomorrow's look",
);

const twice = gradeAnswer(
  gradeAnswer(emptyDeck(), question, false, day0),
  question,
  false,
  day0 + 60_000,
);
assert(needsReread(twice[question]), "missing twice today calls for a re-read");
assert(shouldRequeue(0) && !shouldRequeue(1), "a miss buys exactly one extra look inside a test");
assert(
  weakCards(retried, 4).length === 1,
  "a card that has ever slipped shows up in the weak list",
);
assert(deckCounts(retried, day0).total === 1, "the deck tally counts the card");

// --- rewards ------------------------------------------------------------------
const noon = new Date(2026, 10, 2, 12).getTime();
const played = (days: number[]) =>
  days.reduce((stats, back) => addXp(stats, 10, noon - back * DAY_MS), emptyGameStats);
assert(dayStreak(played([0, 1, 2]), noon) === 3, "three days in a row is a three-day streak");
assert(
  dayStreak(played([1, 2]), noon) === 2,
  "a streak not yet extended today still counts until midnight",
);
assert(dayStreak(played([0, 2]), noon) === 1, "a missed day breaks the streak");
assert(dayStreak(played([2, 3]), noon) === 0, "a streak that missed yesterday is gone");
assert(todayXp(played([0, 0, 1]), noon) === 20, "today's XP counts only today");
assert(
  levelFor(0).level === 1 && levelFor(150).level === 2 && levelFor(149).toNext === 1,
  "levels start at the threshold",
);
assert(
  levelFor(1_000_000).nextTitle === null && levelFor(1_000_000).pct === 100,
  "the top level has nowhere left to go",
);

console.log("");
if (failures.length) {
  console.log(`logic failures (${failures.length})`);
  for (const failure of failures) console.log(`  x ${failure}`);
  process.exitCode = 1;
} else {
  console.log("curriculum logic checks passed");
}
