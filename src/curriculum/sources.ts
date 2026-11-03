/**
 * Every outbound link in the curriculum. Content files import from here so a
 * dead or renamed canada.ca page is one edit, not a search.
 */

const GUIDE_BASE =
  "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online";

export type GuideChapterKey =
  | "oath"
  | "applying"
  | "rights"
  | "whoWeAre"
  | "history"
  | "modernCanada"
  | "government"
  | "elections"
  | "justice"
  | "symbols"
  | "economy"
  | "regions"
  | "studyQuestions";

/** Basename under `data/corpus/`, matching the canada.ca slug. */
export const chapterFile: Record<GuideChapterKey, string> = {
  oath: "oath-citizenship",
  applying: "applying-citizenship",
  rights: "rights-resonsibilities-citizenship",
  whoWeAre: "who-are-canadians",
  history: "canadas-history",
  modernCanada: "modern-canada",
  government: "how-canadians-govern-themselves",
  elections: "federal-elections",
  justice: "justice-system",
  symbols: "canadian-symbols",
  economy: "canadas-economy",
  regions: "canadas-regions",
  studyQuestions: "study-questions",
};

export const chapterTitle: Record<GuideChapterKey, string> = {
  oath: "The Oath of Citizenship",
  applying: "Applying for Citizenship",
  rights: "Rights and Responsibilities of Citizenship",
  whoWeAre: "Who We Are",
  history: "Canada's History",
  modernCanada: "Modern Canada",
  government: "How Canadians Govern Themselves",
  elections: "Federal Elections",
  justice: "The Justice System",
  symbols: "Canadian Symbols",
  economy: "Canada's Economy",
  regions: "Canada's Regions",
  studyQuestions: "Study Questions",
};

export function chapterUrl(key: GuideChapterKey) {
  return `${GUIDE_BASE}/${chapterFile[key]}.html`;
}

export const guideSources = {
  root: "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html",
  readOnline: `${GUIDE_BASE}.html`,
  studyQuestions: chapterUrl("studyQuestions"),
  download:
    "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/download.html",
} as const;

export const officialSources = {
  eligibility: {
    label: "Adult eligibility",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/adult-minor/who.html",
  },
  application: {
    label: "How to apply",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/adult-minor/how.html",
  },
  physicalPresence: {
    label: "Physical presence calculator",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/adult-minor/how/physical-presence.html",
  },
  test: {
    label: "Citizenship test overview",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/test.html",
  },
  testHowItWorks: {
    label: "How the test works",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/test/how-it-works.html",
  },
  study: {
    label: "Study for the test",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/test/study.html",
  },
  invitation: {
    label: "Test invitation",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/test/invitation.html",
  },
  onlineTest: {
    label: "Take the online test",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/test/online.html",
  },
  results: {
    label: "Test results and next steps",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/test/results.html",
  },
  apply: {
    label: "Start an online application",
    href: "https://citapply-citdemande.apps.cic.gc.ca/en/landing",
  },
  status: {
    label: "Check application status",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-status.html",
  },
} as const;

/**
 * Facts about the test itself. Sourced from IRCC pages, dated, and shown in
 * the app rather than hard-coded into questions.
 */
export const testFacts = {
  questions: 20,
  minutes: 45,
  passMark: 15,
  chances: 3,
  ageRange: "18 to 54 on the day you sign the application",
  languages: "English or French",
  formats: "Online for most people; in person or on Microsoft Teams with an accommodation",
  invitationWindowDays: 30,
  reviewedOn: "2026-03-31",
  source: officialSources.study.href,
} as const;
