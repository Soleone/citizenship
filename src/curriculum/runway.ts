import { officialSources, testFacts } from "./sources.ts";

/**
 * The paperwork around the studying. These are the steps between "we want this"
 * and the oath, with the official page next to each one, because the rules move
 * and this file is not allowed to be the place a learner finds out late.
 */
export type RunwayStep = {
  id: string;
  title: string;
  detail: string;
  sourceLabel: string;
  source: string;
  /** Show this step only when the earlier one is done. */
  after?: string;
};

export const runwaySteps: RunwayStep[] = [
  {
    id: "pr-status",
    title: "Confirm PR status and physical presence",
    detail:
      "You must be a permanent resident and not under a removal order. In the five years before the day you sign, you need 1,095 days physically in Canada, and that period must include at least 730 days as a permanent resident. Each day inside the period spent as a temporary resident or protected person counts as 0.5 days, up to 365 days of credit, which means 730 calendar days of that status. Time in prison, on parole or probation, and time waiting for a decision on a refugee claim cannot be counted. IRCC says to apply with more than 1,095 days in case the calculation goes differently, so treat the number below as a floor and not a target.",
    sourceLabel: officialSources.physicalPresence.label,
    source: officialSources.physicalPresence.href,
  },
  {
    id: "taxes",
    title: "Check your tax filing history",
    detail:
      "You generally have to have filed income tax in Canada for at least three of the five years before you signed, if the law required you to file for those years. Get your assessment history from the Canada Revenue Agency before you sign.",
    sourceLabel: officialSources.eligibility.label,
    source: officialSources.eligibility.href,
  },
  {
    id: "language",
    title: "Gather language proof",
    detail:
      "If you are 18 to 54 on the day you sign, you must show adequate ability to speak and listen in English or French, generally Canadian Language Benchmark level 4. Accepted proof includes designated test results, school transcripts, or certain immigration-program records.",
    sourceLabel: officialSources.eligibility.label,
    source: officialSources.eligibility.href,
  },
  {
    id: "study",
    title: "Work the curriculum, not the whole guide at once",
    detail: `Every module here maps to one chapter of Discover Canada, the only official study guide. Study the test facts: ${testFacts.questions} questions, ${testFacts.minutes} minutes, ${testFacts.passMark} right to pass, ${testFacts.chances} chances.`,
    sourceLabel: officialSources.study.label,
    source: officialSources.study.href,
  },
  {
    id: "apply",
    title: "Apply online as a linked group",
    detail:
      "Most applicants apply online. One adult per account can link the group; each adult signs their own application, and one adult submits the group together. Do not share account passwords. Keep the application numbers and receipts somewhere both of you can reach.",
    sourceLabel: officialSources.application.label,
    source: officialSources.application.href,
  },
  {
    id: "invitation",
    title: "Wait for the invitation",
    detail: `The invitation email usually gives a ${testFacts.invitationWindowDays}-day window and a link to the online test. You cannot book the test before you are invited. Watch spam folders and keep your address current in the applicant portal.`,
    sourceLabel: officialSources.invitation.label,
    source: officialSources.invitation.href,
  },
  {
    id: "mock",
    title: "Pass a timed mock exam before the real one",
    detail:
      "The mock exam in this app uses the same shape as the real test: 20 questions, 45 minutes, 15 to pass. Take it only when most modules are done, then work whatever the memory queue brings back.",
    sourceLabel: officialSources.test.label,
    source: officialSources.testHowItWorks.href,
  },
  {
    id: "test-day",
    title: "Run the test-day checklist",
    detail:
      "Online test: desktop, laptop or tablet with a working webcam and microphone, Chrome or Safari, no phone, no VPN, and a private room. The link is on the invitation. You have three chances to pass; a second failure leads to an interview.",
    sourceLabel: officialSources.onlineTest.label,
    source: officialSources.onlineTest.href,
  },
  {
    id: "ceremony",
    title: "Finish with the oath",
    detail:
      "If the application is approved, everyone 18 and older must take the Oath of Citizenship at a ceremony. You become a citizen when you take the oath, and the certificate records the date.",
    sourceLabel: officialSources.eligibility.label,
    source: officialSources.eligibility.href,
    after: "test-day",
  },
];
