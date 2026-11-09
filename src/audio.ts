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

/** What voice mode says between the curriculum lines. Feedback has a few wordings, picked at random, so it doesn't drone. */
export const phrases = {
  correct: ["Correct.", "That's right.", "Exactly.", "Yes, well done.", "Spot on."],
  wrong: ["Not quite.", "Not this time.", "That's not it.", "No, not that one."],
  repeating: "Repeating.",
  sayLetter: "Say Alpha, Bravo, Charlie or Delta.",
  sayTrueFalse: "Say true or false.",
  done: "Session complete. Say next for the next session.",
  paused: "Paused. Say resume to go on.",
  navigate: "Say down and up to move, and open to choose.",
  opened: "Opened.",
  closed: "Closed.",
  first: "That's the first one.",
  last: "That's the last one.",
  pickFirst: "Say down to pick something first.",
};

export const introLine = (session: Session) => `${session.title}. ${session.summary}`;
export const biteLine = (bite: StudyBite) => `${bite.title}. ${bite.body}`;
export const takeawayLine = (bite: StudyBite) => `Remember: ${bite.takeaway}`;

export function questionLine(question: TestQuestion) {
  if (question.kind === "truefalse") return `True or false? ${question.prompt}`;
  return `${question.prompt} ${question.options.map((o, i) => `${letters[i]}: ${o}.`).join(" ")}`;
}

export function answerLine(question: TestQuestion) {
  const option = question.options[question.correctIndex];
  const answer =
    question.kind === "truefalse" ? option : `${letters[question.correctIndex]}: ${option}`;
  return `The answer is ${answer}. ${question.rationale}`;
}

export function sessionTexts(session: Session): string[] {
  return [
    introLine(session),
    ...session.bites.flatMap((bite) => [biteLine(bite), takeawayLine(bite)]),
    ...session.test.flatMap((question) => [questionLine(question), answerLine(question)]),
  ];
}

export async function clipId(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(text));
  return [...new Uint8Array(digest).slice(0, 8)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Every line the app speaks, once each, in study order. */
export async function curriculumLines(): Promise<SpokenLine[]> {
  const texts = [
    ...new Set([...Object.values(phrases).flat(), ...allSessions.flatMap(sessionTexts)]),
  ];
  return Promise.all(texts.map(async (text) => ({ id: await clipId(text), text })));
}
