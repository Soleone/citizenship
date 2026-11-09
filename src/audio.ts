import {
  allSessions,
  type Session,
  type StudyBite,
  type TestQuestion,
} from "./curriculum/index.ts";

/**
 * What the app says out loud, one clip per line. A clip is named by the hash of
 * its text, so editing a bite or question names a new clip and the old one goes
 * stale instead of playing the wrong words.
 */
export type SpokenLine = { id: string; text: string };

// Options are read as the words you say to pick them: single letters weren't
// recognised on the phones, Alpha to Delta were (voice lab, 2026-11-09).
const letters = ["Alpha", "Bravo", "Charlie", "Delta"];

const biteLine = (bite: StudyBite) => `${bite.title}. ${bite.body}`;
const takeawayLine = (bite: StudyBite) => `Remember: ${bite.takeaway}`;

function questionLine(question: TestQuestion) {
  if (question.kind === "truefalse") return `True or false? ${question.prompt}`;
  return `${question.prompt} ${question.options.map((o, i) => `${letters[i]}: ${o}.`).join(" ")}`;
}

function answerLine(question: TestQuestion) {
  const option = question.options[question.correctIndex];
  const answer =
    question.kind === "truefalse" ? option : `${letters[question.correctIndex]}: ${option}`;
  return `The answer is ${answer}. ${question.rationale}`;
}

function sessionTexts(session: Session): string[] {
  return [
    `${session.title}. ${session.summary}`,
    ...session.bites.flatMap((bite) => [biteLine(bite), takeawayLine(bite)]),
    ...session.test.flatMap((question) => [questionLine(question), answerLine(question)]),
  ];
}

async function clipId(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(text));
  return [...new Uint8Array(digest).slice(0, 8)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Every line the app speaks, once each, in study order. */
export async function curriculumLines(): Promise<SpokenLine[]> {
  const texts = [...new Set(allSessions.flatMap(sessionTexts))];
  return Promise.all(texts.map(async (text) => ({ id: await clipId(text), text })));
}
