import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { allSessions, getQuestion, getSession, type TestQuestion } from "@/curriculum";
import {
  MOCK_MINUTES,
  REVIEW_TEST_ID,
  buildTest,
  curriculumProgress,
  mergeResult,
  nextAction,
  nextStudiableSession,
  quizzableSessions,
  scoreResult,
  testAvailability,
  testKind,
} from "@/curriculum/plan";
import { DAILY_GOAL_XP, XP, addXp, answerXp, dayStreak, levelFor, todayXp } from "@/game";
import { confetti, play, setMuted } from "@/juice";
import { dueCards, gradeAnswer, shouldRequeue } from "@/learning";
import { combinedDeck, jointResults, jointSpoken, jointStudied } from "@/joint";
import {
  emptyDecks,
  emptyPracticeState,
  loadRelayState,
  STORAGE_KEY,
  type ActiveProfile,
  type LearnerApplication,
  type PracticeState,
  type ProfileId,
  type RelayState,
  type View,
} from "@/state";
import {
  biteFromSearch,
  parseRoute,
  profileFromSearch,
  studyPath,
  testPath,
  viewPath,
  withProfile,
} from "@/routes";
import {
  attemptKey,
  clearAttempt,
  loadAttempt,
  saveAttempt,
  startAttempt,
  type ActiveAttempt,
} from "@/attempt";
import { Header, MissingScreen, Page, SettingsDialog, Toast } from "@/views/shell";
import { navItems } from "@/views/nav";
import { HomeView } from "@/views/home";
import { SessionDone, SessionScreen } from "@/views/session";
import { TestResultScreen, TestRunner } from "@/views/test";
import { RunwayView } from "@/views/runway";
import { TogetherView } from "@/views/together";
import { BlitzView } from "@/views/blitz";
import { useHouseholdSync } from "@/sync";

const VIEW_LABELS = Object.fromEntries(navItems.map((item) => [item.value, item.label])) as Record<
  View,
  string
>;

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const route = useMemo(() => parseRoute(location.pathname), [location.pathname]);
  /** Whose desk this is comes from the URL, so a refresh cannot switch learners. `both` is a shared desk. */
  const profile: ActiveProfile = profileFromSearch(location.search);

  const [relayState, setRelayState] = useState<RelayState>(loadRelayState);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [attempt, setAttempt] = useState<ActiveAttempt | null>(null);
  /** The desk slot already dealt with, so a run is drawn exactly once per visit. */
  const dealt = useRef<string | null>(null);
  const [rewardEarned, setRewardEarned] = useState(false);
  const [pairIndex, setPairIndex] = useState(0);
  const [pairTurn, setPairTurn] = useState<ProfileId>("you");
  const [pairReveal, setPairReveal] = useState(false);
  /** Correct answers in a row in the current run; a miss or a new run resets it. */
  const [combo, setCombo] = useState(0);
  /** The latest XP payout, with a counter so the same amount twice still replays the pop. */
  const [lastGain, setLastGain] = useState({ amount: 0, id: 0 });
  const [toast, setToast] = useState<string | null>(null);
  /** Answers given inside the session being read: they become its test result at the end. */
  const [studyRun, setStudyRun] = useState<{
    sessionId: string;
    answers: Record<string, boolean>;
    xp: number;
  } | null>(null);
  /** Shared clock, so the countdowns are read from render rather than computed in it. */
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(relayState));
  }, [relayState]);

  const syncStatus = useHouseholdSync(relayState, setRelayState);

  useEffect(() => {
    setMuted(!relayState.sound);
  }, [relayState.sound]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    const label =
      route.view === "curriculum"
        ? getSession(route.sessionId)?.title
        : route.view === "practice"
          ? "Test"
          : route.view === "notFound"
            ? "No such page"
            : route.view === "overview"
              ? null
              : VIEW_LABELS[route.view];
    document.title = label ? `${label} · Citizenship` : "Citizenship";
  }, [route]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const isBoth = profile === "both";
  /** Which stored learners the open desk writes to. Both is a shared desk, so it credits both. */
  const activeTargets: ProfileId[] = isBoth ? ["you", "partner"] : [profile];
  const youSessions = relayState.completedSessions.you;
  const partnerSessions = relayState.completedSessions.partner;
  const youResults = relayState.results.you;
  const partnerResults = relayState.results.partner;
  const youDeck = relayState.review.you ?? emptyDecks.you;
  const partnerDeck = relayState.review.partner ?? emptyDecks.partner;

  /**
   * What the open desk can use. Alone it is that learner's reading; together
   * it is only what both have read, so nothing quizzes an unread learner.
   */
  const completedSessions = isBoth
    ? jointStudied(youSessions, partnerSessions)
    : relayState.completedSessions[profile];
  const results = isBoth ? jointResults(youResults, partnerResults) : relayState.results[profile];
  const deck = isBoth
    ? combinedDeck(youDeck, partnerDeck)
    : profile === "you"
      ? youDeck
      : partnerDeck;

  const progressYou = useMemo(
    () => curriculumProgress(youSessions, youResults, youDeck),
    [youSessions, youResults, youDeck],
  );
  const progressPartner = useMemo(
    () => curriculumProgress(partnerSessions, partnerResults, partnerDeck),
    [partnerSessions, partnerResults, partnerDeck],
  );
  const progressSingle = useMemo(
    () => curriculumProgress(completedSessions, results, deck),
    [completedSessions, results, deck],
  );
  // Joint readiness only climbs when both climb, so nothing still needed hides.
  const progress = progressSingle;
  const dueReviewCards = useMemo(() => dueCards(deck), [deck]);

  /** The one thing worth doing next, in the order that actually works. Joint next needs both. */
  const nextStep = useMemo(
    () => nextAction(completedSessions, results),
    [completedSessions, results],
  );
  const teachSessions = useMemo(() => {
    // Together is for teaching what either of you has read. Gating elsewhere
    // stays on the intersection so Both never quizzes unread material.
    if (isBoth)
      return allSessions.filter(
        (session) => youSessions.includes(session.id) || partnerSessions.includes(session.id),
      );
    return allSessions.filter((session) => completedSessions.includes(session.id));
  }, [isBoth, youSessions, partnerSessions, completedSessions]);
  const teachSession = teachSessions.length
    ? teachSessions[pairIndex % teachSessions.length]
    : null;

  /* ------------------------------------------------------------------ reading */

  const studySessionId = route.view === "curriculum" ? route.sessionId : null;
  const studySession = studySessionId ? (getSession(studySessionId) ?? null) : null;
  const studyComplete = route.view === "curriculum" && route.complete;
  const biteParam =
    route.view === "curriculum" && !studyComplete ? biteFromSearch(location.search) : null;
  const biteCount = studySession?.bites.length ?? 0;
  const lastBite = Math.max(0, biteCount - 1);
  const biteIndex = Math.min(Math.max(biteParam ?? 0, 0), lastBite);

  /** A URL that names a session this build no longer has goes back home. */
  useEffect(() => {
    if (!studySessionId || studySession) return;
    go(viewPath("overview"), { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studySessionId, studySession]);

  /** A bite number outside the session is corrected in the URL rather than clamped in silence. */
  useEffect(() => {
    if (!studySession || biteParam === null || biteParam === biteIndex) return;
    go(studyPath(studySession.id, { bite: biteIndex }), { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studySession, biteParam, biteIndex]);

  /**
   * Arriving at the end of a session cold still means the session has been read:
   * the reward screen offers the session test, and that test stays locked until
   * the read is on record. Nothing is counted twice.
   */
  useEffect(() => {
    if (!studyComplete || !studySession) return;
    if (!completedSessions.includes(studySession.id)) {
      recordSessionRead(studySession.id);
      setRewardEarned(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyComplete, studySession?.id, profile]);

  /* ------------------------------------------------------- the run on the desk */

  const routeTestId = route.view === "practice" ? route.testId : null;
  const routeComplete = route.view === "practice" && route.complete;
  const activeRun =
    attempt && attempt.profile === profile && attempt.testId === routeTestId ? attempt : null;
  const practice: PracticeState = activeRun ? activeRun.state : emptyPracticeState;

  /**
   * Open the run the address asks for. Either it is still on the desk from before
   * the refresh, or it has to be drawn from scratch. Drawn from scratch means
   * question 1: a mixed or mock run cannot be reproduced from an address, and a
   * handed-in result cannot be conjured at all, which is why the effect below
   * corrects a cold visit to `/q/7` or `/complete` instead of honouring it.
   */
  useEffect(() => {
    if (!routeTestId) return;
    const key = attemptKey(profile, routeTestId);
    if (dealt.current === key) return;
    dealt.current = key;

    const saved = loadAttempt(profile, routeTestId);
    // A finished run is only ever shown at its own address. Arriving at the bare
    // test address means "take this test", so a stale result gets replaced.
    if (saved && (routeComplete || saved.state.active)) {
      setAttempt(saved);
      return;
    }
    if (!testAvailability(routeTestId, completedSessions).allowed) {
      setAttempt(null);
      go(viewPath("overview"), { replace: true });
      return;
    }
    const questionIds = drawQuestions(routeTestId);
    if (!questionIds.length) {
      setAttempt(null);
      go(viewPath("overview"), { replace: true });
      return;
    }
    setAttempt(startAttempt(profile, routeTestId, attemptStateFor(routeTestId, questionIds)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeTestId, profile, routeComplete]);

  /** Keep the address bar where the run actually stands. */
  useEffect(() => {
    if (!activeRun) return;
    const { state } = activeRun;
    if (!state.testId) return;
    const wanted = state.active
      ? testPath(state.testId, { index: state.questionIndex })
      : testPath(state.testId, { complete: true });
    if (`${location.pathname}${location.search}` === withProfile(wanted, profile)) return;
    go(wanted, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRun?.state.questionIndex, activeRun?.state.active, activeRun?.state.complete, profile]);

  /** The run on the desk survives a refresh. */
  useEffect(() => {
    if (activeRun) saveAttempt(activeRun);
  }, [activeRun]);

  const isMock = practice.mode === "mock";
  const currentPracticeQuestions = useMemo(
    () =>
      practice.questionIds
        .map((questionId) => getQuestion(questionId))
        .filter((question): question is TestQuestion => question !== null),
    [practice.questionIds],
  );
  const practiceQuestion = currentPracticeQuestions[practice.questionIndex] ?? null;
  const activeCard = practiceQuestion ? (deck[practiceQuestion.id] ?? null) : null;
  const missedQuestions = useMemo(
    () =>
      practice.missedIds
        .map((questionId) => getQuestion(questionId))
        .filter((missed): missed is TestQuestion => missed !== null),
    [practice.missedIds],
  );

  /* --------------------------------------------------------------- navigation */

  /** Every hop keeps `?as=` so the learner you are studying as survives navigation. */
  function go(to: string, opts: { replace?: boolean } = {}) {
    const next = withProfile(to, profile);
    if (`${location.pathname}${location.search}${location.hash}` === next) return;
    void navigate(next, opts);
  }

  /**
   * Switch desks at any moment. In-flight runs stay saved under their own
   * slot (`you|test`, `partner|test`, `both|test`), so switching never
   * discards progress and coming back resumes where you left off.
   */
  function changeProfile(next: ActiveProfile) {
    if (next === profile) return;
    if (activeRun) saveAttempt(activeRun);
    void navigate(withProfile(`${location.pathname}${location.search}`, next), { replace: true });
  }

  function startStudy(sessionId?: string) {
    const session = sessionId
      ? getSession(sessionId)
      : (nextStudiableSession(completedSessions) ?? allSessions[0]);
    if (!session) return;
    setRewardEarned(false);
    setStudyRun(null);
    setCombo(0);
    go(studyPath(session.id));
  }

  function recordSessionRead(sessionId: string) {
    const session = getSession(sessionId);
    if (!session) return;
    const targets: ProfileId[] = isBoth ? ["you", "partner"] : [profile as ProfileId];
    if (targets.every((target) => relayState.completedSessions[target].includes(session.id)))
      return;
    setRelayState((current) => {
      const nextCompleted = { ...current.completedSessions };
      const nextStats = { ...current.stats };
      for (const target of targets) {
        const alreadyRead = current.completedSessions[target].includes(session.id);
        if (!alreadyRead) {
          nextCompleted[target] = [...current.completedSessions[target], session.id];
          nextStats[target] = {
            ...current.stats[target],
            studySessions: current.stats[target].studySessions + 1,
            studyPoints: current.stats[target].studyPoints + 10,
          };
        }
      }
      return { ...current, completedSessions: nextCompleted, stats: nextStats };
    });
  }

  function advanceStudy() {
    const session = studySession;
    if (!session) return;
    if (biteIndex >= session.bites.length - 1) {
      const alreadyComplete = completedSessions.includes(session.id);
      recordSessionRead(session.id);
      setRewardEarned(!alreadyComplete);
      const run = studyRun?.sessionId === session.id ? studyRun : null;
      let bonus = alreadyComplete ? 0 : XP.sessionDone;
      // Every check answered on the way through is the session test, taken in place.
      if (run && session.test.every((question) => question.id in run.answers)) {
        const correct = Object.values(run.answers).filter(Boolean).length;
        const result = scoreResult("session", correct, session.test.length);
        const testId = `session:${session.id}`;
        setRelayState((current) => {
          const nextResults = { ...current.results };
          const nextStats = { ...current.stats };
          for (const target of activeTargets) {
            nextResults[target] = {
              ...current.results[target],
              [testId]: mergeResult(current.results[target][testId], result),
            };
            nextStats[target] = {
              ...current.stats[target],
              checksCompleted: current.stats[target].checksCompleted + 1,
            };
          }
          return { ...current, results: nextResults, stats: nextStats };
        });
        if (result.passed) bonus += XP.testPassed;
      }
      gainXp(activeTargets, bonus);
      if (!alreadyComplete) {
        play("win");
        confetti();
      }
      go(studyPath(session.id, { complete: true }));
      return;
    }
    go(studyPath(session.id, { bite: biteIndex + 1 }));
  }

  function answerInStudy(question: TestQuestion, index: number) {
    if (!studySession) return;
    const run =
      studyRun?.sessionId === studySession.id
        ? studyRun
        : { sessionId: studySession.id, answers: {}, xp: 0 };
    if (question.id in run.answers) return;
    const correct = index === question.correctIndex;
    const xp = recordAnswer(question.id, correct);
    setStudyRun({ ...run, answers: { ...run.answers, [question.id]: correct }, xp: run.xp + xp });
  }

  /**
   * Pay XP to every learner the answer counts for. Crossing the daily goal or a
   * level is the moment worth a fanfare, so that is checked against the state
   * before the payout.
   */
  function gainXp(targets: ProfileId[], amount: number) {
    if (amount <= 0) return;
    const now = Date.now();
    let message: string | null = null;
    for (const target of targets) {
      const before = relayState.game[target];
      const after = addXp(before, amount, now);
      const name = isBoth ? `${relayState.profileNames[target]}: ` : "";
      const level = levelFor(after.xp);
      if (level.level > levelFor(before.xp).level)
        message = `${name}Level ${level.level}, ${level.title}!`;
      else if (todayXp(before, now) < DAILY_GOAL_XP && todayXp(after, now) >= DAILY_GOAL_XP) {
        message ??= `Daily goal done. ${dayStreak(after, now)}-day streak 🔥`;
      }
    }
    setRelayState((current) => {
      const game = { ...current.game };
      for (const target of targets) game[target] = addXp(current.game[target], amount, now);
      return { ...current, game };
    });
    setLastGain((current) => ({ amount, id: current.id + 1 }));
    if (message) {
      setToast(message);
      play("win");
      confetti();
    }
  }

  /**
   * One answer, wherever it was given: grade it into the memory deck, count it,
   * play the sound, move the combo, pay the XP. Returns the XP paid.
   */
  function recordAnswer(
    questionId: string,
    correct: boolean,
    {
      targets = activeTargets,
      counts = true,
      xpFor = answerXp,
    }: { targets?: ProfileId[]; counts?: boolean; xpFor?: (combo: number) => number } = {},
  ) {
    setRelayState((current) => {
      const nextReview = { ...current.review };
      const nextStats = { ...current.stats };
      for (const target of targets) {
        nextReview[target] = gradeAnswer(current.review[target], questionId, correct);
        nextStats[target] = {
          ...current.stats[target],
          answered: current.stats[target].answered + (counts ? 1 : 0),
          correct: current.stats[target].correct + (correct && counts ? 1 : 0),
        };
      }
      return { ...current, review: nextReview, stats: nextStats };
    });
    play(correct ? "correct" : "wrong");
    const xp = correct ? xpFor(combo) : 0;
    setCombo(correct ? combo + 1 : 0);
    gainXp(targets, xp);
    return xp;
  }

  function closeStudy() {
    setRewardEarned(false);
    go(viewPath("overview"));
  }

  /**
   * The questions a run asks. The memory review has no fixed list, so it is
   * whatever is due at the moment the run is drawn, from a click or a URL alike.
   */
  function drawQuestions(testId: string) {
    if (testId === REVIEW_TEST_ID) return dueReviewCards.map((card) => card.questionId);
    return buildTest(testId, completedSessions, deck).map((question) => question.id);
  }

  function openAttempt(next: ActiveAttempt) {
    dealt.current = attemptKey(next.profile, next.testId);
    setAttempt(next);
  }

  function startTest(testId: string) {
    if (!testAvailability(testId, completedSessions).allowed) return;
    const questionIds = drawQuestions(testId);
    if (!questionIds.length) return;
    setCombo(0);
    openAttempt(startAttempt(profile, testId, attemptStateFor(testId, questionIds)));
    go(testPath(testId));
  }

  function startReview() {
    startTest(REVIEW_TEST_ID);
  }

  function setPractice(update: (current: PracticeState) => PracticeState) {
    setAttempt((current) => (current ? { ...current, state: update(current.state) } : current));
  }

  function selectAnswer(index: number) {
    if (!practiceQuestion) return;
    if (isMock) {
      // No feedback until the exam is handed in, same as the real thing.
      setPractice((current) => ({
        ...current,
        selectedIndex: index,
        answers: { ...current.answers, [practiceQuestion.id]: index },
      }));
      return;
    }
    if (practice.submitted) return;
    submitAnswer(index);
  }

  /** Outside the mock a tap is the answer: no separate check step. */
  function submitAnswer(index: number) {
    if (!practiceQuestion || isMock || practice.submitted) return;
    const questionId = practiceQuestion.id;
    const isCorrect = index === practiceQuestion.correctIndex;
    const firstAttempt = !practice.firstAttemptIds.includes(questionId);
    const requeueTimes = practice.requeued[questionId] ?? 0;
    const requeue = firstAttempt && !isCorrect && shouldRequeue(requeueTimes);

    setPractice((current) => ({
      ...current,
      selectedIndex: index,
      submitted: true,
      score: current.score + (isCorrect && firstAttempt ? 1 : 0),
      firstAttemptIds: firstAttempt
        ? [...current.firstAttemptIds, questionId]
        : current.firstAttemptIds,
      missedIds:
        isCorrect || current.missedIds.includes(questionId)
          ? current.missedIds
          : [...current.missedIds, questionId],
      requeued: requeue
        ? { ...current.requeued, [questionId]: requeueTimes + 1 }
        : current.requeued,
      questionIds: requeue ? [...current.questionIds, questionId] : current.questionIds,
    }));
    // Shared answers, dual credit: one answer updates every desk that is open.
    recordAnswer(questionId, isCorrect, { counts: firstAttempt });
  }

  /**
   * Hand the test in. A mock exam is graded here in one go because nothing is
   * revealed while it runs; every other test has already been graded answer by
   * answer.
   */
  function finishPractice() {
    const testId = practice.testId;
    if (!testId) return;
    const kind = practice.mode;
    const primary = practice.primaryIds
      .map((questionId) => getQuestion(questionId))
      .filter((question): question is TestQuestion => question !== null);

    let correct = practice.score;
    let missedIds = practice.missedIds;
    let answered = 0;
    // Shared run, dual credit: grade every open desk from the same answers.
    const targets: ProfileId[] = isBoth ? ["you", "partner"] : [profile as ProfileId];
    if (kind === "mock") {
      answered = primary.length;
      const wrong: string[] = [];
      for (const question of primary) {
        const isCorrect = practice.answers[question.id] === question.correctIndex;
        if (isCorrect) correct += 1;
        else wrong.push(question.id);
      }
      missedIds = wrong;
    }

    const result = scoreResult(kind, correct, primary.length);
    setPractice((current) => ({ ...current, active: false, complete: true, missedIds }));
    setRelayState((current) => {
      const nextReview = { ...current.review };
      const nextResults = { ...current.results };
      const nextStats = { ...current.stats };
      for (const target of targets) {
        // Recompute mock grading from stored state at hand-in time so both
        // learners get identical cards even if state moved under us.
        if (kind === "mock") {
          let graded = current.review[target];
          for (const question of primary) {
            graded = gradeAnswer(
              graded,
              question.id,
              practice.answers[question.id] === question.correctIndex,
            );
          }
          nextReview[target] = graded;
        } else {
          nextReview[target] = current.review[target];
        }
        nextResults[target] = {
          ...current.results[target],
          [testId]: mergeResult(current.results[target][testId], result),
        };
        nextStats[target] = {
          ...current.stats[target],
          checksCompleted: current.stats[target].checksCompleted + 1,
          answered: current.stats[target].answered + answered,
          correct: current.stats[target].correct + (kind === "mock" ? correct : 0),
        };
      }
      return { ...current, review: nextReview, results: nextResults, stats: nextStats };
    });
    const passBonus = result.passed ? (kind === "mock" ? XP.mockPassed : XP.testPassed) : 0;
    gainXp(targets, passBonus + (kind === "mock" ? correct * XP.correct : 0));
    if (result.passed) {
      play("win");
      confetti();
    }
  }

  function advancePractice() {
    if (practice.questionIndex >= currentPracticeQuestions.length - 1) {
      finishPractice();
      return;
    }
    setPractice((current) => {
      const nextIndex = current.questionIndex + 1;
      return {
        ...current,
        questionIndex: nextIndex,
        selectedIndex: current.answers[currentPracticeQuestions[nextIndex]?.id ?? ""] ?? null,
        submitted: false,
      };
    });
  }

  /** Abandon a run or close a result: both mean the desk is cleared. */
  function leavePractice() {
    const testId = practice.testId ?? routeTestId;
    if (testId) {
      clearAttempt(profile, testId);
      if (dealt.current === attemptKey(profile, testId)) dealt.current = null;
    }
    setAttempt(null);
    go(viewPath("overview"));
  }

  // The mock clock. Forward only, never paused, and it hands the exam in when
  // it runs out, because that is what the real one does.
  useEffect(() => {
    if (!practice.active || practice.mode !== "mock") return;
    if (practice.secondsLeft <= 0) {
      finishPractice();
      return;
    }
    const timer = window.setTimeout(() => {
      setPractice((current) => ({ ...current, secondsLeft: Math.max(0, current.secondsLeft - 1) }));
    }, 1000);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [practice.active, practice.mode, practice.secondsLeft]);

  function answerInBlitz(questionId: string, correct: boolean, player: ProfileId[]) {
    recordAnswer(questionId, correct, { targets: player, xpFor: () => XP.blitzCorrect });
  }

  function finishBlitz(player: ProfileId, score: number) {
    setCombo(0);
    setRelayState((current) => {
      const stats = current.game[player];
      if (score <= stats.bestBlitz) return current;
      return { ...current, game: { ...current.game, [player]: { ...stats, bestBlitz: score } } };
    });
  }

  const toggleRunwayStep = (stepId: string) => {
    setRelayState((current) => {
      const alreadyComplete = current.completedRunway.includes(stepId);
      return {
        ...current,
        completedRunway: alreadyComplete
          ? current.completedRunway.filter((id) => id !== stepId)
          : [...current.completedRunway, stepId],
      };
    });
  };

  const updateProfileName = (target: ProfileId, value: string) => {
    setRelayState((current) => ({
      ...current,
      profileNames: {
        ...current.profileNames,
        [target]: value || (target === "you" ? "A" : "B"),
      },
    }));
  };

  const updateApplication = (target: ProfileId, patch: Partial<LearnerApplication>) => {
    setRelayState((current) => ({
      ...current,
      applications: {
        ...current.applications,
        [target]: { ...current.applications[target], ...patch },
      },
    }));
  };

  /** Tick a guide question off once it has actually been said out loud. Both ticks both. */
  const toggleSpokenQuestion = (questionId: string) => {
    const targets: ProfileId[] = isBoth ? ["you", "partner"] : [profile as ProfileId];
    setRelayState((current) => {
      const next = { ...current.spokenOpenQuestions };
      for (const target of targets) {
        const spoken = current.spokenOpenQuestions[target];
        next[target] = spoken.includes(questionId)
          ? spoken.filter((id) => id !== questionId)
          : [...spoken, questionId];
      }
      return { ...current, spokenOpenQuestions: next };
    });
  };

  const clearSpokenQuestions = () => {
    const targets: ProfileId[] = isBoth ? ["you", "partner"] : [profile as ProfileId];
    setRelayState((current) => {
      const next = { ...current.spokenOpenQuestions };
      for (const target of targets) next[target] = [];
      return { ...current, spokenOpenQuestions: next };
    });
  };

  const dismissCarryOver = () => {
    setRelayState((current) => ({ ...current, carryOver: null }));
  };

  /* "Another session" moves on; finishing a round keeps the session and swaps speakers. */
  const switchPairPrompt = () => {
    setPairIndex((current) => current + 1);
    setPairTurn((current) => (current === "you" ? "partner" : "you"));
    setPairReveal(false);
  };

  const completePairRound = () => {
    setRelayState((current) => ({ ...current, pairRounds: current.pairRounds + 1 }));
    setPairTurn((current) => (current === "you" ? "partner" : "you"));
    setPairReveal(false);
  };

  const spokenYou = relayState.spokenOpenQuestions.you;
  const spokenPartner = relayState.spokenOpenQuestions.partner;
  const spokenEffective = isBoth
    ? jointSpoken(spokenYou, spokenPartner)
    : relayState.spokenOpenQuestions[profile as ProfileId];
  const studiedModuleIdsSingle = progress.modules
    .filter((item) => item.studied > 0)
    .map((item) => item.module.id);
  const studiedModuleIdsBoth = [
    ...new Set([
      ...progressYou.modules.filter((item) => item.studied > 0).map((item) => item.module.id),
      ...progressPartner.modules.filter((item) => item.studied > 0).map((item) => item.module.id),
    ]),
  ];
  const studiedModuleIds = isBoth ? studiedModuleIdsBoth : studiedModuleIdsSingle;

  const blitzPool = useMemo(
    () => quizzableSessions(completedSessions).flatMap((session) => session.test),
    [completedSessions],
  );

  const header = (
    <Header
      profile={profile}
      profileNames={relayState.profileNames}
      players={activeTargets}
      game={relayState.game}
      now={now}
      sound={relayState.sound}
      onProfileChange={changeProfile}
      onOpen={(view) => go(viewPath(view))}
      onToggleSound={() => setRelayState((current) => ({ ...current, sound: !current.sound }))}
      onOpenSettings={() => setSettingsOpen(true)}
    />
  );

  return (
    <>
      {renderScreen()}
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        relayState={relayState}
        syncStatus={syncStatus}
        onRestore={setRelayState}
        onNameChange={updateProfileName}
        onTargetDateChange={(value) =>
          setRelayState((current) => ({ ...current, targetDate: value }))
        }
        onCoachModeChange={(checked) =>
          setRelayState((current) => ({ ...current, coachMode: checked }))
        }
      />
      {toast && <Toast key={toast} message={toast} />}
    </>
  );

  function renderScreen() {
    if (route.view === "curriculum") {
      if (!studySession) return null;
      if (studyComplete) {
        return (
          <SessionDone
            session={studySession}
            result={results[`session:${studySession.id}`] ?? null}
            run={studyRun?.sessionId === studySession.id ? studyRun : null}
            firstRead={rewardEarned}
            onNext={() => startStudy()}
            onRetake={() => startTest(`session:${studySession.id}`)}
            onHome={closeStudy}
            onReread={startStudy}
          />
        );
      }
      return (
        <SessionScreen
          key={`${studySession.id}:${biteIndex}`}
          session={studySession}
          biteIndex={biteIndex}
          combo={combo}
          lastGain={lastGain}
          onAnswer={answerInStudy}
          onAdvance={advanceStudy}
          onClose={closeStudy}
        />
      );
    }

    if (route.view === "practice") {
      // Between the address and the run being dealt there is one render with nothing on the desk.
      if (!activeRun) return null;
      if (practice.complete) {
        return (
          <TestResultScreen
            practice={practice}
            questions={currentPracticeQuestions}
            missedQuestions={missedQuestions}
            previous={practice.testId ? results[practice.testId] : undefined}
            onRetake={() => practice.testId && startTest(practice.testId)}
            onHome={leavePractice}
            onReread={startStudy}
          />
        );
      }
      if (!practiceQuestion) return null;
      return (
        <TestRunner
          practice={practice}
          question={practiceQuestion}
          questions={currentPracticeQuestions}
          card={activeCard}
          combo={combo}
          lastGain={lastGain}
          onSelect={selectAnswer}
          onNext={advancePractice}
          onLeave={leavePractice}
        />
      );
    }

    if (route.view === "blitz") {
      return (
        <BlitzView
          key={profile}
          pool={blitzPool}
          players={activeTargets}
          profileNames={relayState.profileNames}
          best={{ you: relayState.game.you.bestBlitz, partner: relayState.game.partner.bestBlitz }}
          combo={combo}
          onAnswer={answerInBlitz}
          onFinish={finishBlitz}
          onStartStudy={() => startStudy()}
          onClose={() => go(viewPath("overview"))}
        />
      );
    }

    return (
      <Page header={header}>
        {route.view === "overview" && (
          <HomeView
            players={activeTargets}
            profileNames={relayState.profileNames}
            game={relayState.game}
            progress={progress}
            completedSessions={completedSessions}
            nextStep={nextStep}
            dueCount={dueReviewCards.length}
            targetDate={relayState.targetDate}
            now={now}
            carryOver={relayState.carryOver}
            myCanada={relayState.myCanada}
            onMyCanadaChange={(patch) =>
              setRelayState((current) => ({
                ...current,
                myCanada: { ...current.myCanada, ...patch },
              }))
            }
            onDismissCarryOver={dismissCarryOver}
            onStartStudy={startStudy}
            onStartReview={startReview}
            onStartTest={startTest}
            onOpenBlitz={() => go(viewPath("blitz"))}
          />
        )}
        {route.view === "together" && (
          <TogetherView
            teachSession={teachSession}
            pairTurn={pairTurn}
            profileNames={relayState.profileNames}
            revealed={pairReveal}
            coachMode={relayState.coachMode}
            pairRounds={relayState.pairRounds}
            studiedModuleIds={studiedModuleIds}
            spoken={spokenEffective}
            onToggleReveal={() => setPairReveal((current) => !current)}
            onCompleteRound={completePairRound}
            onNextPrompt={switchPairPrompt}
            onStartStudy={startStudy}
            onToggleSpoken={toggleSpokenQuestion}
            onClearSpoken={clearSpokenQuestions}
          />
        )}
        {route.view === "runway" && (
          <RunwayView
            relayState={relayState}
            activeProfile={profile}
            onToggleStep={toggleRunwayStep}
            onApplicationChange={updateApplication}
          />
        )}
        {route.view === "notFound" && <MissingScreen path={location.pathname} />}
      </Page>
    );
  }
}

/** A freshly drawn run, before a single answer is given. */
function attemptStateFor(testId: string, questionIds: string[]): PracticeState {
  return {
    ...emptyPracticeState,
    active: true,
    testId,
    mode: testKind(testId),
    questionIds,
    primaryIds: questionIds,
    primaryCount: questionIds.length,
    secondsLeft: MOCK_MINUTES * 60,
  };
}

export default App;
