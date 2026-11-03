/**
 * Curriculum data model.
 *
 * Shape of the whole app:
 *
 *   Module   = one chapter of Discover Canada (the unit a learner finishes)
 *   Session  = one short lesson inside a module (read bites, then take its test)
 *   Bite     = one idea, taught in plain language, tied to guide text
 *   Test     = session test (authored), module test (sampled), mock exam (sampled)
 *
 * Two rules keep this honest, because the app exists to get someone through a
 * real test:
 *
 * 1. `evidence` on a bite or question must be a verbatim excerpt from the
 *    official guide text stored in `data/corpus/`. `npm run curriculum:check`
 *    fails if it is not found there.
 * 2. Anything the 2012 guide says that has since changed carries a `caveat`.
 *    The guide still defines the test, so the answer follows the guide; the
 *    caveat tells the learner to confirm the live value.
 */

/** One `###`/`####` idea inside a session. */
export type StudyBite = {
  /** Stable id. Questions point at it so a miss can reopen the exact bite. */
  id: string;
  title: string;
  /** Two to four plain-language sentences. No filler. */
  body: string;
  /** The one thing to remember, phrased for recall out loud. */
  takeaway: string;
  /** Verbatim excerpt from the official guide (see data/corpus). */
  evidence: string;
};

type QuestionKind = "choice" | "truefalse";

export type TestQuestion = {
  /** Stable across releases; the Leitner deck keys on it. */
  id: string;
  /** Which bite teaches this. Must exist in the same session. */
  biteId: string;
  kind: QuestionKind;
  prompt: string;
  /** Two options for `truefalse`, three or four for `choice`. */
  options: string[];
  correctIndex: number;
  /** Why the answer is right, in the guide's terms. */
  rationale: string;
  /** Verbatim excerpt from the official guide that supports the answer. */
  evidence: string;
  /** Where the guide text is behind current reality. */
  caveat?: string;
  /** Copied from the guide's own Study Questions page. */
  official?: boolean;
};

/** The explain-it-to-your-partner round for a session. */
type TeachPrompt = {
  prompt: string;
  /** What the listener should hear. Revealed after the explanation. */
  checklist: string[];
  probe: string;
};

export type Session = {
  /** `moduleSlug.noun`, e.g. `parliament.bicameral`. Unique app-wide. */
  id: string;
  moduleId: string;
  title: string;
  summary: string;
  /** Realistic minutes to read the bites. */
  minutes: number;
  bites: StudyBite[];
  /** The session test. Unlocked by reading the session. */
  test: TestQuestion[];
  teach: TeachPrompt;
  /** Canada.ca URL for the chapter section this session teaches. */
  source: string;
};

/** What a miss should reopen: the session and the one bite inside it. */
export type StudyRefLite = {
  session: Session;
  bite: StudyBite;
};

export type Module = {
  /** kebab-case slug. Unique app-wide. */
  id: string;
  /** Display order, 1 first. */
  order: number;
  title: string;
  /** Chapter title as printed in Discover Canada. */
  guideChapter: string;
  /** Basenames under `data/corpus/` this module is built from. */
  corpus: string[];
  summary: string;
  /** What the learner should be able to do when the module is done. */
  mission: string;
  /** Key in the app icon map. */
  icon: string;
  tags: string[];
  sessions: Session[];
  /** Canada.ca URL for the chapter. */
  source: string;
  /** Question count in the generated module test. */
  testSize: number;
};
