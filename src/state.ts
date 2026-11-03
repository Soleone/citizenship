/**
 * What the app remembers, and how an older save file is carried forward.
 *
 * Progress lives in localStorage and nowhere else. The one risky moment in a
 * local-first app is the migration, so it is written down here rather than
 * buried in a component: a version 3 save knew ten guide areas, and each area
 * becomes the first session of the module that replaced it.
 */

import { dayKey, rollDeckLapses, type ReviewDeck, type ReviewDecks } from "./learning.ts";
import { MOCK_MINUTES, type TestKind, type TestResults } from "./curriculum/plan.ts";
import { getModule, getQuestion } from "./curriculum/index.ts";
import type { Trip } from "./eligibility.ts";
import { emptyGameStats, type GameStats } from "./game.ts";

export type ProfileId = "you" | "partner";
/** Whose desk is open: one learner, or both studying together with shared answers and dual credit. */
export type ActiveProfile = ProfileId | "both";
export type View = "overview" | "blitz" | "together" | "runway";
type PracticeMode = TestKind;

export const emptyDecks: ReviewDecks = { you: {}, partner: {} };

type LearnerStats = {
  answered: number;
  correct: number;
  studySessions: number;
  checksCompleted: number;
  studyPoints: number;
};

/** The dates that decide eligibility. Names and dates only, never document numbers. */
export type LearnerApplication = {
  birthDate: string;
  prDate: string;
  firstStatusDate: string;
  /** Defaults to today, which answers "am I eligible if I sign now". */
  signDate: string;
  prCardExpiry: string;
  trips: Trip[];
  taxYearsFiled: number[];
  uncountedDays: number;
};

function emptyApplication(): LearnerApplication {
  return {
    birthDate: "",
    prDate: "",
    firstStatusDate: "",
    signDate: new Date().toISOString().slice(0, 10),
    prCardExpiry: "",
    trips: [],
    taxYearsFiled: [],
    uncountedDays: 0,
  };
}

export type RelayState = {
  profileNames: Record<ProfileId, string>;
  /** Session ids the learner has read end to end. Nothing is quizzed before that. */
  completedSessions: Record<ProfileId, string[]>;
  /** Best result per test id: `session:<id>`, `module:<id>`, `mixed`, `mock`. */
  results: Record<ProfileId, TestResults>;
  /** Application dates per learner: presence is not a shared fact. */
  applications: Record<ProfileId, LearnerApplication>;
  completedRunway: string[];
  stats: Record<ProfileId, LearnerStats>;
  /** Spaced-repetition queue, one deck per learner. */
  review: ReviewDecks;
  /** Day the decks were last rolled, so today's miss counters start clean. */
  reviewDay: string;
  targetDate: string;
  pairRounds: number;
  coachMode: boolean;
  /** Guide questions each learner has answered out loud, by id. */
  spokenOpenQuestions: Record<ProfileId, string[]>;
  /** Set once when the rebuilt curriculum absorbs an older save file. */
  carryOver: CarryOver | null;
  game: Record<ProfileId, GameStats>;
  /** The local answers the guide expects you to know: your province, its premier, your MP. Shared, you live together. */
  myCanada: MyCanada;
  sound: boolean;
};

export type MyCanada = { province: string; premier: string; mp: string };

export type CarryOver = {
  sessions: number;
  droppedCards: number;
  at: number;
};

export type PracticeState = {
  active: boolean;
  complete: boolean;
  testId: string | null;
  mode: PracticeMode;
  /** Live queue. A miss can append one extra attempt before the test ends. */
  questionIds: string[];
  /** Questions in the test before any requeue, used as the score base. */
  primaryIds: string[];
  questionIndex: number;
  selectedIndex: number | null;
  submitted: boolean;
  /** First-attempt correct answers only, so a requeue cannot inflate it. */
  score: number;
  primaryCount: number;
  firstAttemptIds: string[];
  missedIds: string[];
  requeued: Record<string, number>;
  /** Mock exam only: picks are held until the end, like the real test. */
  answers: Record<string, number>;
  /** Seconds left on the clock. Only counts down in mock mode. */
  secondsLeft: number;
};

export const STORAGE_KEY = "civic-relay-state-v4";
const UNREADABLE_STORAGE_KEY = `${STORAGE_KEY}-unreadable`;
/** Where this device remembers its place in the household sync; see src/sync.ts. */
export const SYNC_STORAGE_KEY = "civic-relay-sync";
const LEGACY_STORAGE_KEYS = [
  "civic-relay-state-v3",
  "civic-relay-state-v2",
  "civic-relay-state-v1",
];
const profileIds: ProfileId[] = ["you", "partner"];
export const activeProfileIds: ActiveProfile[] = ["you", "partner", "both"];

/** Label for the switcher and headings. Stored names still come from profileNames. */
export function activeProfileLabel(
  active: ActiveProfile,
  names: Record<ProfileId, string>,
): string {
  if (active === "both") return `${names.you} + ${names.partner}`;
  return names[active];
}

/**
 * The first version of this app tracked ten "stations" that match the guide's
 * chapters. Those chapters are now the ten modules, so an old save can still say
 * which reading has happened even though the lessons inside were rebuilt.
 */
const legacyStationModules: Record<string, string> = {
  responsibilities: "rights-and-responsibilities",
  "who-we-are": "who-we-are",
  history: "history",
  "modern-canada": "modern-canada",
  government: "government",
  elections: "elections",
  justice: "justice",
  symbols: "symbols",
  economy: "economy",
  regions: "regions",
};

const defaultRelayState: RelayState = {
  profileNames: { you: "A", partner: "B" },
  completedSessions: { you: [], partner: [] },
  results: { you: {}, partner: {} },
  completedRunway: [],
  stats: {
    you: { answered: 0, correct: 0, studySessions: 0, checksCompleted: 0, studyPoints: 0 },
    partner: { answered: 0, correct: 0, studySessions: 0, checksCompleted: 0, studyPoints: 0 },
  },
  review: emptyDecks,
  reviewDay: dayKey(),
  targetDate: "",
  pairRounds: 0,
  coachMode: true,
  applications: { you: emptyApplication(), partner: emptyApplication() },
  spokenOpenQuestions: { you: [], partner: [] },
  carryOver: null,
  game: { you: emptyGameStats, partner: emptyGameStats },
  myCanada: { province: "", premier: "", mp: "" },
  sound: true,
};
export const emptyPracticeState: PracticeState = {
  active: false,
  complete: false,
  testId: null,
  mode: "session",
  questionIds: [],
  primaryIds: [],
  questionIndex: 0,
  selectedIndex: null,
  submitted: false,
  score: 0,
  primaryCount: 0,
  firstAttemptIds: [],
  missedIds: [],
  requeued: {},
  answers: {},
  secondsLeft: MOCK_MINUTES * 60,
};

/** The names used to default to "You" and "Partner"; a save that never changed them now says A and B. */
function renameOldDefaults(names: Record<ProfileId, string>): Record<ProfileId, string> {
  return {
    you: names.you === "You" ? "A" : names.you,
    partner: names.partner === "Partner" ? "B" : names.partner,
  };
}

/** Cards for questions that no longer exist cannot be reviewed, so they go. */
function pruneDeck(deck: ReviewDeck) {
  let dropped = 0;
  const kept: ReviewDeck = {};
  for (const [questionId, card] of Object.entries(deck)) {
    if (getQuestion(questionId)) kept[questionId] = card;
    else dropped += 1;
  }
  return { deck: kept, dropped };
}

/**
 * Read whatever save file exists and return a current-shape state. Version 3
 * knew ten guide areas; each area becomes the first session of the module that
 * replaced it, which is the most the old data can honestly claim.
 */
export function loadRelayState(): RelayState {
  if (typeof window === "undefined") return defaultRelayState;

  const stored =
    window.localStorage.getItem(STORAGE_KEY) ??
    LEGACY_STORAGE_KEYS.map((key) => window.localStorage.getItem(key)).find(Boolean);
  if (!stored) return defaultRelayState;
  try {
    return normalizeRelayState(JSON.parse(stored));
  } catch (error) {
    // The fresh state is saved over STORAGE_KEY next, so the unreadable one is kept aside first,
    // and this device rejoins the household as new so it takes the shared copy instead of pushing.
    console.error("Unreadable save kept as", UNREADABLE_STORAGE_KEY, error);
    window.localStorage.setItem(UNREADABLE_STORAGE_KEY, stored);
    window.localStorage.removeItem(SYNC_STORAGE_KEY);
    return defaultRelayState;
  }
}

/** Turn any saved or synced state, of any age, into the current shape. Throws when it is not one. */
export function normalizeRelayState(input: unknown): RelayState {
  if (typeof input !== "object" || input === null) throw new Error("Not a saved state");
  const parsed = input as Partial<RelayState> & {
    completedStations?: Record<ProfileId, string[]>;
    completedStudy?: Record<ProfileId, string[]>;
  };

  const now = Date.now();
  let carryOver: CarryOver | null = parsed.carryOver ?? null;
  let completedSessions = { ...defaultRelayState.completedSessions, ...parsed.completedSessions };
  if (!parsed.completedSessions) {
    const legacyAreas = parsed.completedStations ?? { you: [], partner: [] };
    const carried = Object.fromEntries(
      profileIds.map((profile) => {
        const done = new Set<string>();
        for (const stationId of legacyAreas[profile] ?? []) {
          const moduleId = legacyStationModules[stationId];
          const first = moduleId ? getModule(moduleId)?.sessions[0] : undefined;
          if (first) done.add(first.id);
        }
        return [profile, [...done]];
      }),
    ) as Record<ProfileId, string[]>;
    completedSessions = carried;
    const sessions = profileIds.reduce((sum, profile) => sum + carried[profile].length, 0);
    const hadLegacyProgress = profileIds.some((profile) => (legacyAreas[profile] ?? []).length > 0);
    if (!carryOver && hadLegacyProgress) carryOver = { sessions, droppedCards: 0, at: now };
  }

  const storedDecks = { ...emptyDecks, ...parsed.review };
  const pruned = {
    you: pruneDeck(storedDecks.you),
    partner: pruneDeck(storedDecks.partner),
  };
  if (carryOver)
    carryOver = { ...carryOver, droppedCards: pruned.you.dropped + pruned.partner.dropped };

  // A new day clears the "missed today" counters without touching the queue.
  const today = dayKey(now);
  const review =
    parsed.reviewDay === today
      ? { you: pruned.you.deck, partner: pruned.partner.deck }
      : {
          you: rollDeckLapses(pruned.you.deck, now),
          partner: rollDeckLapses(pruned.partner.deck, now),
        };

  return {
    ...defaultRelayState,
    ...parsed,
    profileNames: renameOldDefaults({ ...defaultRelayState.profileNames, ...parsed.profileNames }),
    completedSessions,
    results: {
      you: { ...parsed.results?.you },
      partner: { ...parsed.results?.partner },
    },
    completedRunway: parsed.completedRunway ?? defaultRelayState.completedRunway,
    spokenOpenQuestions: {
      you: parsed.spokenOpenQuestions?.you ?? [],
      partner: parsed.spokenOpenQuestions?.partner ?? [],
    },
    applications: {
      you: { ...emptyApplication(), ...parsed.applications?.you },
      partner: { ...emptyApplication(), ...parsed.applications?.partner },
    },
    stats: {
      you: { ...defaultRelayState.stats.you, ...parsed.stats?.you },
      partner: { ...defaultRelayState.stats.partner, ...parsed.stats?.partner },
    },
    review,
    reviewDay: today,
    carryOver,
    game: {
      you: { ...emptyGameStats, ...parsed.game?.you },
      partner: { ...emptyGameStats, ...parsed.game?.partner },
    },
    myCanada: { ...defaultRelayState.myCanada, ...parsed.myCanada },
  };
}
