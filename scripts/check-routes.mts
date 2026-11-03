/**
 * Route check for the address bar.
 *
 *   npm run routes:check
 *
 * Every screen this app has is a URL, so a URL has to be enough to get back to
 * that screen: after a refresh, from a bookmark, or from the back button. This
 * walks the real curriculum and the real test ids and proves that each one has an
 * address that names it and nothing else. It also proves the addresses stay
 * readable, because a percent-encoded session id is the kind of thing that makes
 * a person stop trusting the URL bar.
 */

import { allSessions, curriculumModules } from "../src/curriculum/index.ts";
import {
  MIXED_TEST_ID,
  MOCK_TEST_ID,
  REVIEW_TEST_ID,
  moduleTestId,
  sessionTestId,
} from "../src/curriculum/plan.ts";
import {
  BITE_PARAM,
  PROFILE_PARAM,
  VIEW_PATHS,
  biteFromSearch,
  parseRoute,
  profileFromSearch,
  studyPath,
  testPath,
  withProfile,
} from "../src/routes.ts";
import { navItems } from "../src/views/nav.ts";

const failures: string[] = [];
function expect(label: string, condition: boolean, detail = "") {
  if (condition) console.log(`  ok  ${label}`);
  else failures.push(`${label}${detail ? ` (${detail})` : ""}`);
}

// --- the rail ----------------------------------------------------------------
const paths = Object.values(VIEW_PATHS);
expect("every view has its own address", new Set(paths).size === paths.length, paths.join(" "));
expect(
  "the rail has an entry for every view",
  navItems.length === paths.length,
  `${navItems.length}`,
);

for (const item of navItems) {
  const path = VIEW_PATHS[item.value];
  const parsed = parseRoute(path);
  expect(
    `${item.label} answers at ${path || "/"}`,
    parsed.view === item.value,
    JSON.stringify(parsed),
  );
}

// --- reading -----------------------------------------------------------------
expect(
  "no session id needs escaping",
  allSessions.every((s) => studyPath(s.id) === `/study/${s.id}`),
);

for (const session of allSessions) {
  const route = parseRoute(studyPath(session.id));
  expect(
    `${session.id} comes back as itself`,
    route.view === "curriculum" && route.sessionId === session.id && !route.complete,
    JSON.stringify(route),
  );

  const lastBite = session.bites.length - 1;
  const deep = parseRoute(studyPath(session.id, { bite: lastBite }));
  expect(
    `bite ${lastBite + 1} of ${session.id} stays at bite ${lastBite + 1}`,
    biteFromSearch(`?${BITE_PARAM}=${lastBite + 1}`) === lastBite &&
      deep.view === "curriculum" &&
      deep.sessionId === session.id,
    JSON.stringify(deep),
  );

  const done = parseRoute(studyPath(session.id, { complete: true }));
  expect(
    `the end of ${session.id} is its own address`,
    done.view === "curriculum" && done.sessionId === session.id && done.complete,
    JSON.stringify(done),
  );
}

expect("the first bite needs no parameter", !studyPath("a.b").includes("?"));
expect("a bite numbered from 1 means the second bite", biteFromSearch(`?${BITE_PARAM}=2`) === 1);
expect("bite 0 is not a bite", biteFromSearch(`?${BITE_PARAM}=0`) === null);
expect("a bite that is not a number is not a bite", biteFromSearch(`?${BITE_PARAM}=x`) === null);

// --- tests -------------------------------------------------------------------
const allTestId = [
  REVIEW_TEST_ID,
  MIXED_TEST_ID,
  MOCK_TEST_ID,
  ...allSessions.map((session) => sessionTestId(session.id)),
  ...curriculumModules.map((module) => moduleTestId(module.id)),
];

for (const testId of allTestId) {
  const path = testPath(testId);
  expect(
    `${testId} has a readable address`,
    path.startsWith("/tests/") && !path.includes("%"),
    path,
  );

  const opened = parseRoute(path);
  expect(
    `${path} is that test`,
    opened.view === "practice" &&
      opened.testId === testId &&
      !opened.complete &&
      opened.index === null,
    JSON.stringify(opened),
  );

  const fifth = parseRoute(testPath(testId, { index: 4 }));
  expect(
    `${path}/q/5 is the fifth question of ${testId}`,
    fifth.view === "practice" && fifth.testId === testId && fifth.index === 4,
    JSON.stringify(fifth),
  );

  const graded = parseRoute(testPath(testId, { complete: true }));
  expect(
    `${path}/complete is the result of ${testId}`,
    graded.view === "practice" && graded.testId === testId && graded.complete,
    JSON.stringify(graded),
  );
}

expect(
  "the first question is the shape of a run",
  !testPath(MOCK_TEST_ID, { index: 0 }).includes("/q/"),
);

// --- addresses that are not screens ------------------------------------------
const bogus = [
  "/nope",
  "/tests/session",
  "/tests/module",
  "/tests/nonsense",
  "/tests/mock/question/2",
  "/tests/mock/q/0",
  "/tests/mock/q/xx",
  "/tests/mock/extra/deep",
  "/study/some.session/open",
  "/Study",
  "/study",
  "/tests",
  "/sprint",
  "",
];

for (const path of bogus) {
  const parsed = parseRoute(path);
  expect(`${path || "(root)"} is not a page`, parsed.view === "notFound", JSON.stringify(parsed));
}

expect("a trailing slash is the same page", parseRoute("/study/a.b/").view === "curriculum");
expect("the root is the start here", parseRoute("/").view === "overview");

// --- the learner in the address ----------------------------------------------
expect("no learner named means you", profileFromSearch("") === "you");
expect(
  "an unknown learner is not a learner",
  profileFromSearch(`?${PROFILE_PARAM}=cousin`) === "you",
);
expect(
  "partner is a person, not a string typo",
  profileFromSearch(`?${PROFILE_PARAM}=partner`) === "partner",
);
expect("both is a shared desk", profileFromSearch(`?${PROFILE_PARAM}=both`) === "both");
expect(
  "studying together is a shareable address",
  withProfile("/tests/mock", "both") === "/tests/mock?as=both",
  withProfile("/tests/mock", "both"),
);
expect(
  "studying as partner is a shareable address",
  withProfile("/tests/mock", "partner") === "/tests/mock?as=partner",
  withProfile("/tests/mock", "partner"),
);
expect(
  "you is the default and stays out of the URL",
  withProfile("/tests/mock?as=partner", "you") === "/tests/mock",
);
expect(
  "a hop keeps the bite number and the learner",
  withProfile(`/study/a.b?${BITE_PARAM}=3`, "partner") === "/study/a.b?bite=3&as=partner",
  withProfile(`/study/a.b?${BITE_PARAM}=3`, "partner"),
);

console.log("");
if (failures.length) {
  console.log(`route failures (${failures.length})`);
  for (const failure of failures) console.log(`  x ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `route checks passed (${allSessions.length} sessions, ${allTestId.length} tests, ${paths.length} views)`,
  );
}
