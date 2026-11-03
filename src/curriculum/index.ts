import type { Module, Session, StudyRefLite, TestQuestion } from "./types.ts";

import becomingACitizen from "./modules/01-becoming-a-citizen.ts";
import rightsAndResponsibilities from "./modules/02-rights-and-responsibilities.ts";
import whoWeAre from "./modules/03-who-we-are.ts";
import history from "./modules/04-history.ts";
import modernCanada from "./modules/05-modern-canada.ts";
import government from "./modules/06-government.ts";
import elections from "./modules/07-elections.ts";
import justice from "./modules/08-justice.ts";
import symbols from "./modules/09-symbols.ts";
import economy from "./modules/10-economy.ts";
import regions from "./modules/11-regions.ts";

export type { Module, Session, StudyBite, StudyRefLite, TestQuestion } from "./types.ts";
export * from "./sources.ts";

export const curriculumModules: Module[] = [
  becomingACitizen,
  rightsAndResponsibilities,
  whoWeAre,
  history,
  modernCanada,
  government,
  elections,
  justice,
  symbols,
  economy,
  regions,
].sort((a, b) => a.order - b.order);

export const allSessions: Session[] = curriculumModules.flatMap((module) => module.sessions);

const moduleById = new Map(curriculumModules.map((module) => [module.id, module]));
const sessionById = new Map(allSessions.map((session) => [session.id, session]));
const questionById = new Map(
  allSessions.flatMap((session) =>
    session.test.map((question) => [question.id, { question, session }] as const),
  ),
);

export function getModule(moduleId: string): Module | null {
  return moduleById.get(moduleId) ?? null;
}

export function getSession(sessionId: string): Session | null {
  return sessionById.get(sessionId) ?? null;
}

export function getQuestion(questionId: string): TestQuestion | null {
  return questionById.get(questionId)?.question ?? null;
}

export function getSessionForQuestion(questionId: string): Session | null {
  return questionById.get(questionId)?.session ?? null;
}

/** Where a question came from, so a miss reopens the exact bite. */
export function getStudyRef(questionId: string): StudyRefLite | null {
  const entry = questionById.get(questionId);
  if (!entry) return null;
  const bite =
    entry.session.bites.find((item) => item.id === entry.question.biteId) ?? entry.session.bites[0];
  return { session: entry.session, bite };
}

export function questionsForSession(sessionId: string): TestQuestion[] {
  return sessionById.get(sessionId)?.test ?? [];
}

export function questionsForModule(moduleId: string): TestQuestion[] {
  const module = moduleById.get(moduleId);
  if (!module) return [];
  return module.sessions.flatMap((session) => session.test);
}

export const allQuestions: TestQuestion[] = allSessions.flatMap((session) => session.test);

export const curriculumStats = {
  modules: curriculumModules.length,
  sessions: allSessions.length,
  bites: allSessions.reduce((sum, session) => sum + session.bites.length, 0),
  questions: allQuestions.length,
};

export function moduleOf(sessionId: string): Module | null {
  const session = sessionById.get(sessionId);
  return session ? (moduleById.get(session.moduleId) ?? null) : null;
}

export * from "./open-questions.ts";
export * from "./runway.ts";
