/**
 * The guide's own open questions.
 *
 * The last chapter of Discover Canada prints three multiple-choice questions and
 * then a list of questions it asks the reader to answer out loud, saying plainly:
 * "Use these questions to prepare for your test." They are the only questions the
 * Government of Canada publishes, and they are all open-ended, which makes them
 * teach-back prompts rather than quiz items. So they live here, mapped to the
 * module that teaches the answer, and the Together screen offers them as a
 * round-the-table checklist.
 *
 * `evidence` is the question as printed in data/corpus/study-questions.txt.
 */

export type OpenQuestion = {
  id: string;
  /** The module whose sessions answer it. */
  moduleId: string;
  prompt: string;
  evidence: string;
};

export const guideOpenQuestions: OpenQuestion[] = [
  {
    id: "oq-01",
    moduleId: "rights-and-responsibilities",
    prompt: "Name two key documents that contain our rights and freedoms.",
    evidence: "Name two key documents that contain our rights and freedoms.",
  },
  {
    id: "oq-02",
    moduleId: "rights-and-responsibilities",
    prompt: "Identify four rights that Canadians enjoy.",
    evidence: "Identify four (4) rights that Canadians enjoy.",
  },
  {
    id: "oq-03",
    moduleId: "rights-and-responsibilities",
    prompt: "Name four fundamental freedoms that Canadians enjoy.",
    evidence: "Name four (4) fundamental freedoms that Canadians enjoy.",
  },
  {
    id: "oq-04",
    moduleId: "rights-and-responsibilities",
    prompt: "What is meant by the equality of women and men?",
    evidence: "What is meant by the equality of women and men?",
  },
  {
    id: "oq-05",
    moduleId: "rights-and-responsibilities",
    prompt: "What are some examples of taking responsibility for yourself and your family?",
    evidence: "What are some examples of taking responsibility for yourself and your family?",
  },
  {
    id: "oq-06",
    moduleId: "who-we-are",
    prompt: "Who were the founding peoples of Canada?",
    evidence: "Who were the founding peoples of Canada?",
  },
  {
    id: "oq-07",
    moduleId: "who-we-are",
    prompt: "Who are the Métis?",
    evidence: "Who are the Métis?",
  },
  {
    id: "oq-08",
    moduleId: "who-we-are",
    prompt: 'What does the word "Inuit" mean?',
    evidence: 'What does the word "Inuit" mean?',
  },
  {
    id: "oq-09",
    moduleId: "government",
    prompt: 'What is meant by the term "responsible government"?',
    evidence: 'What is meant by the term "responsible government"?',
  },
  {
    id: "oq-10",
    moduleId: "history",
    prompt: "Who was Sir Louis-Hippolyte La Fontaine?",
    evidence: "Who was Sir Louis-Hippolyte La Fontaine?",
  },
  {
    id: "oq-11",
    moduleId: "history",
    prompt: "What did the Canadian Pacific Railway symbolize?",
    evidence: "What did the Canadian Pacific Railway symbolize?",
  },
  {
    id: "oq-12",
    moduleId: "history",
    prompt: "What does Confederation mean?",
    evidence: "What does Confederation mean?",
  },
  {
    id: "oq-13",
    moduleId: "modern-canada",
    prompt:
      "What is the significance of the discovery of insulin by Sir Frederick Banting and Charles Best?",
    evidence:
      "What is the significance of the discovery of insulin by Sir Frederick Banting and Charles Best?",
  },
  {
    id: "oq-14",
    moduleId: "government",
    prompt: "What does it mean to say that Canada is a constitutional monarchy?",
    evidence: "What does it mean to say that Canada is a constitutional monarchy?",
  },
  {
    id: "oq-15",
    moduleId: "government",
    prompt: "What are the three branches of government?",
    evidence: "What are the three branches of government?",
  },
  {
    id: "oq-16",
    moduleId: "government",
    prompt: "What is the difference between the role of the Queen and that of the Prime Minister?",
    evidence:
      "What is the difference between the role of the Queen and that of the Prime Minister?",
  },
  {
    id: "oq-17",
    moduleId: "symbols",
    prompt: "What is the highest honour that Canadians can receive?",
    evidence: "What is the highest honour that Canadians can receive?",
  },
  {
    id: "oq-18",
    moduleId: "elections",
    prompt: "When you go to vote on election day, what do you do?",
    evidence: "When you go to vote on election day, what do you do?",
  },
  {
    id: "oq-19",
    moduleId: "elections",
    prompt: "Who is entitled to vote in Canadian federal elections?",
    evidence: "Who is entitled to vote in Canadian federal elections?",
  },
  {
    id: "oq-20",
    moduleId: "elections",
    prompt: "In Canada, are you obliged to tell other people how you voted?",
    evidence: "In Canada, are you obliged to tell other people how you voted?",
  },
  {
    id: "oq-21",
    moduleId: "elections",
    prompt: "After an election, which party forms the government?",
    evidence: "After an election, which party forms the government?",
  },
  {
    id: "oq-22",
    moduleId: "elections",
    prompt: "Who is your member of Parliament?",
    evidence: "Who is your member of Parliament?",
  },
  {
    id: "oq-23",
    moduleId: "government",
    prompt: "What are the three levels of government?",
    evidence: "What are the three levels of government?",
  },
  {
    id: "oq-24",
    moduleId: "justice",
    prompt: "What is the role of the courts in Canada?",
    evidence: "What is the role of the courts in Canada?",
  },
  {
    id: "oq-25",
    moduleId: "justice",
    prompt: "In Canada, are you allowed to question the police about their service or conduct?",
    evidence: "In Canada, are you allowed to question the police about their service or conduct?",
  },
  {
    id: "oq-26",
    moduleId: "symbols",
    prompt: "Name two Canadian symbols.",
    evidence: "Name two Canadian symbols.",
  },
  {
    id: "oq-27",
    moduleId: "regions",
    prompt: "What provinces are referred to as the Atlantic Provinces?",
    evidence: "What provinces are referred to as the Atlantic Provinces?",
  },
  {
    id: "oq-28",
    moduleId: "regions",
    prompt: "What is the capital of the province or territory that you live in?",
    evidence: "What is the capital of the province or territory that you live in?",
  },
];

/** The three questions the guide prints with options and the answer marked. */
export const guideAnsweredQuestions = [
  {
    id: "oqa-01",
    prompt: "What are three responsibilities of citizenship?",
    answer:
      "Obeying the law, taking responsibility for oneself and one's family, serving on a jury.",
    module: "rights-and-responsibilities",
  },
  {
    id: "oqa-02",
    prompt: "What is the meaning of the Remembrance Day poppy?",
    answer:
      "To remember the sacrifice of Canadians who have served or died in wars up to the present day.",
    module: "symbols",
  },
  {
    id: "oqa-03",
    prompt: "How are Members of Parliament chosen?",
    answer: "They are elected by voters in their local constituency (riding).",
    module: "elections",
  },
];
