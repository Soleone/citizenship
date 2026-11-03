import type { Module } from "../types.ts";
import { chapterUrl } from "../sources.ts";

/**
 * The Justice System. A short chapter, mined close: the rule of law and due
 * process, every court the guide names, the police arrangements (provincial,
 * municipal, RCMP), and getting legal help. Every `evidence` string is verbatim
 * guide text from data/corpus/justice-system.txt; the captions under the
 * chapter's photos (Lady Justice, prisons) are part of the guide text too.
 */
const module: Module = {
  id: "justice",
  order: 8,
  title: "The justice system",
  guideChapter: "The Justice System",
  corpus: ["justice-system"],
  summary: "The rule of law, due process, the courts, and the police.",
  mission:
    "Say what due process and the presumption of innocence mean, name each court and what it handles, and explain who polices what.",
  icon: "scale",
  tags: ["Courts", "Police", "Legal aid"],
  source: chapterUrl("justice"),
  testSize: 8,
  sessions: [
    {
      id: "justice.rule-of-law",
      moduleId: "justice",
      title: "The rule of law and due process",
      summary: "Innocent until proven guilty, due process, and who the law applies to.",
      minutes: 5,
      source: chapterUrl("justice"),
      bites: [
        {
          id: "justice.rule-of-law.1",
          title: "Innocent until proven guilty",
          body: "Canada's justice system guarantees everyone due process under the law. In criminal matters, it rests on the presumption of innocence: everyone is innocent until proven guilty.",
          takeaway: "In criminal matters, you are innocent until proven guilty.",
          evidence: "The Canadian justice system guarantees everyone due process under the law.",
        },
        {
          id: "justice.rule-of-law.2",
          title: "What due process means",
          body: "Due process means the government must respect all the legal rights a person is entitled to under the law. It limits how the government may treat you.",
          takeaway: "Due process: the government must respect all your legal rights.",
          evidence:
            "Due process is the principle that the government must respect all of legal rights a person is entitled to under the law.",
        },
        {
          id: "justice.rule-of-law.3",
          title: "Four pillars of the legal system",
          body: "Canada's legal system rests on four ideas: the rule of law, freedom under the law, democratic principles, and due process.",
          takeaway: "Rule of law, freedom under the law, democratic principles, due process.",
          evidence:
            "a heritage that includes the rule of law, freedom under the law, democratic principles and due process",
        },
        {
          id: "justice.rule-of-law.4",
          title: "The law applies to everyone",
          body: "Canada is governed by a system of laws: written rules made by elected representatives to guide society. The law applies to everyone, including judges, politicians and the police.",
          takeaway: "Laws are made by elected representatives and apply to everyone.",
          evidence: "They are made by elected representatives.",
        },
        {
          id: "justice.rule-of-law.5",
          title: "What laws are for",
          body: "Laws keep order, give people a peaceful way to settle disputes, and express Canadians' values and beliefs. Lady Justice wears a blindfold because the law is applied impartially, blind to everything but the facts.",
          takeaway:
            "Laws keep order, settle disputes peacefully and express our values. The blindfold means impartial justice.",
          evidence: "blind to all considerations but the facts",
        },
      ],
      teach: {
        prompt:
          "Explain due process and the presumption of innocence, and name the four parts of Canada's legal heritage.",
        checklist: [
          "Due process: the government must respect all your legal rights",
          "In criminal matters, you are innocent until proven guilty",
          "Heritage: rule of law, freedom under the law, democratic principles, due process",
          "Laws are made by elected representatives and apply to everyone, including judges and police",
        ],
        probe: "Why is Lady Justice's blindfold a sign of fairness?",
      },
      test: [
        {
          id: "ju-001",
          biteId: "justice.rule-of-law.1",
          kind: "choice",
          prompt: "What does the presumption of innocence mean?",
          options: [
            "Everyone is innocent until proven guilty",
            "Charges are dropped after one year",
            "An accused person must prove they are innocent",
            "Judges decide guilt without evidence",
          ],
          correctIndex: 0,
          rationale: "In criminal matters, everyone is innocent until proven guilty.",
          evidence: "meaning everyone is innocent until proven guilty",
        },
        {
          id: "ju-002",
          biteId: "justice.rule-of-law.2",
          kind: "choice",
          prompt: "What does due process mean?",
          options: [
            "The police may act without rules in an emergency",
            "The government must respect all the legal rights a person is entitled to under the law",
            "Parliament may pass any law it chooses",
            "A person must pay court fees before a hearing",
          ],
          correctIndex: 1,
          rationale:
            "Due process means the government must respect all the legal rights a person is entitled to under the law.",
          evidence:
            "Due process is the principle that the government must respect all of legal rights a person is entitled to under the law.",
        },
        {
          id: "ju-003",
          biteId: "justice.rule-of-law.3",
          kind: "choice",
          prompt: "Which of these is one of the foundations of Canada's legal system?",
          options: [
            "Parliamentary privilege",
            "Military service",
            "Freedom under the law",
            "Provincial sovereignty",
          ],
          correctIndex: 2,
          rationale:
            "The four foundations are the rule of law, freedom under the law, democratic principles and due process.",
          evidence:
            "Canada's legal system is based on a heritage that includes the rule of law, freedom under the law",
        },
        {
          id: "ju-004",
          biteId: "justice.rule-of-law.4",
          kind: "truefalse",
          prompt:
            "In Canada, the law applies to ordinary people but not to judges and politicians.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "The law applies to everyone, including judges, politicians and the police.",
          evidence:
            "The law in Canada applies to everyone, including judges, politicians and the police.",
        },
        {
          id: "ju-005",
          biteId: "justice.rule-of-law.4",
          kind: "choice",
          prompt: "Who makes Canada's laws?",
          options: [
            "The judges of the Supreme Court",
            "The RCMP",
            "Legal aid clinics",
            "Elected representatives",
          ],
          correctIndex: 3,
          rationale:
            "Laws are made by elected representatives. Courts settle disputes, and police enforce the law.",
          evidence:
            "These laws are the written rules intended to guide people in our society. They are made by elected representatives.",
        },
        {
          id: "ju-006",
          biteId: "justice.rule-of-law.5",
          kind: "choice",
          prompt: "What does Lady Justice's blindfold stand for?",
          options: [
            "That laws are administered impartially, blind to all considerations but the facts",
            "That victims' faces are hidden from the court",
            "That trials are always held in private",
            "That judges do not know the accused",
          ],
          correctIndex: 0,
          rationale: "The blindfold shows that laws are applied impartially.",
          evidence: "The blindfolded Lady Justice symbolizes the impartial",
        },
      ],
    },
    {
      id: "justice.courts",
      moduleId: "justice",
      title: "The courts",
      summary: "The Supreme Court, the Federal Court, provincial courts, and the smaller courts.",
      minutes: 5,
      source: chapterUrl("justice"),
      bites: [
        {
          id: "justice.courts.1",
          title: "The highest court",
          body: "Courts settle disputes. The Supreme Court of Canada is the country's highest court, and no other court sits above it.",
          takeaway: "The Supreme Court of Canada is the highest court.",
          evidence: "The Supreme Court of Canada is our country's highest court.",
        },
        {
          id: "justice.courts.2",
          title: "The Federal Court",
          body: "The Federal Court of Canada deals with matters concerning the federal government.",
          takeaway: "The Federal Court handles matters concerning the federal government.",
          evidence:
            "The Federal Court of Canada deals with matters concerning the federal government.",
        },
        {
          id: "justice.courts.3",
          title: "Provincial courts of appeal and trial",
          body: 'Most provinces have an appeal court and a trial court. The trial court is sometimes called the Court of Queen\'s Bench or the Supreme Court. So "Supreme Court" can mean the national court or a provincial trial court.',
          takeaway:
            "Most provinces have an appeal court and a trial court, sometimes called the Court of Queen's Bench.",
          evidence: "sometimes called the Court of Queen's Bench or the Supreme Court",
        },
        {
          id: "justice.courts.4",
          title: "The smaller courts",
          body: "Provincial courts handle lesser offences. There are also family courts, traffic courts, and small claims courts for civil cases involving small sums of money.",
          takeaway:
            "Provincial courts take lesser offences. Small claims courts take civil cases over small sums.",
          evidence:
            "There are also provincial courts for lesser offences, family courts, traffic courts",
        },
        {
          id: "justice.courts.5",
          title: "What prisons are for",
          body: "Prisons play an essential role in the justice system: they punish criminals and deter crime.",
          takeaway: "Prisons punish criminals and deter crime.",
          evidence: "Prisons have an essential role in punishing criminals and deterring crime",
        },
      ],
      teach: {
        prompt: "Name the courts from highest to smallest, and say what each one handles.",
        checklist: [
          "Supreme Court of Canada: the highest court",
          "Federal Court: matters concerning the federal government",
          "Most provinces: an appeal court and a trial court (Court of Queen's Bench or Supreme Court)",
          "Provincial courts for lesser offences; family, traffic and small claims courts",
        ],
        probe: 'Why read carefully when an answer says "the Supreme Court"?',
      },
      test: [
        {
          id: "ju-007",
          biteId: "justice.courts.1",
          kind: "choice",
          prompt: "Which court is Canada's highest court?",
          options: [
            "The Constitutional Court of Canada",
            "The Supreme Court of Canada",
            "The High Court of Justice",
            "The Superior Court of Canada",
          ],
          correctIndex: 1,
          rationale: "The Supreme Court of Canada is the highest court.",
          evidence: "The Supreme Court of Canada is our country's highest court.",
        },
        {
          id: "ju-008",
          biteId: "justice.courts.2",
          kind: "choice",
          prompt: "What does the Federal Court of Canada deal with?",
          options: [
            "All criminal sentences in Canada",
            "Appeals from every provincial trial court",
            "Matters concerning the federal government",
            "Making the federal laws that courts apply",
          ],
          correctIndex: 2,
          rationale: "The Federal Court deals with matters concerning the federal government.",
          evidence:
            "The Federal Court of Canada deals with matters concerning the federal government.",
        },
        {
          id: "ju-009",
          biteId: "justice.courts.3",
          kind: "truefalse",
          prompt: "In most provinces, one court acts as both the trial court and the appeal court.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "Most provinces have two separate courts: an appeal court and a trial court.",
          evidence: "In most provinces there is an appeal court and a trial court",
        },
        {
          id: "ju-010",
          biteId: "justice.courts.3",
          kind: "choice",
          prompt: "What is a provincial trial court sometimes called?",
          options: [
            "The Magistrates' Court",
            "The Court of Common Pleas",
            "The County Court",
            "The Court of Queen's Bench",
          ],
          correctIndex: 3,
          rationale:
            "The trial court is sometimes called the Court of Queen's Bench or the Supreme Court.",
          evidence: "sometimes called the Court of Queen's Bench or the Supreme Court",
        },
        {
          id: "ju-011",
          biteId: "justice.courts.4",
          kind: "choice",
          prompt: "Which courts handle lesser offences in Canada?",
          options: [
            "Provincial courts",
            "Coroner's courts",
            "Military courts",
            "Bankruptcy courts",
          ],
          correctIndex: 0,
          rationale: "Provincial courts handle lesser offences.",
          evidence: "There are also provincial courts for lesser offences",
        },
        {
          id: "ju-012",
          biteId: "justice.courts.4",
          kind: "choice",
          prompt: "What kind of cases do small claims courts deal with?",
          options: [
            "Charges of impaired driving",
            "Civil cases involving small sums of money",
            "Small criminal cases against young offenders",
            "Divorce and custody disputes",
          ],
          correctIndex: 1,
          rationale: "Small claims courts handle civil cases involving small sums of money.",
          evidence: "small claims courts for civil cases involving small sums of money.",
        },
        {
          id: "ju-013",
          biteId: "justice.courts.5",
          kind: "choice",
          prompt: "What role do prisons play?",
          options: [
            "Requiring prisoners to serve in the armed forces",
            "Training prisoners for jobs after release",
            "An essential role in punishing criminals and deterring crime",
            "Holding accused people before their trial",
          ],
          correctIndex: 2,
          rationale: "Prisons have an essential role in punishing criminals and deterring crime.",
          evidence: "Prisons have an essential role in punishing criminals and deterring crime",
        },
      ],
    },
    {
      id: "justice.police-and-legal-help",
      moduleId: "justice",
      title: "Police, lawyers and legal aid",
      summary: "Who polices what, how to complain, and help when you can't afford a lawyer.",
      minutes: 5,
      source: chapterUrl("justice"),
      bites: [
        {
          id: "justice.police-and-legal-help.1",
          title: "What the police are there for",
          body: "The police keep people safe and enforce the law. You can ask them for help in many situations: an accident, a theft, an assault, a crime you witness, or someone you know who has gone missing.",
          takeaway: "Police keep people safe and enforce the law. Ask them for help.",
          evidence: "The police are there to keep people safe and to enforce the law.",
        },
        {
          id: "justice.police-and-legal-help.2",
          title: "Provincial and municipal police",
          body: "Only Ontario and Quebec have provincial police forces. Every province has municipal police departments.",
          takeaway:
            "Only Ontario and Quebec have provincial police. Every province has municipal police.",
          evidence:
            "There are provincial police forces in Ontario and Quebec and municipal police departments in all provinces.",
        },
        {
          id: "justice.police-and-legal-help.3",
          title: "The RCMP's three jobs",
          body: "The Royal Canadian Mounted Police (RCMP) has three jobs: it enforces federal laws across Canada, serves as the provincial police in every province and territory except Ontario and Quebec, and polices some municipalities.",
          takeaway:
            "The RCMP enforces federal law everywhere and is the provincial police outside Ontario and Quebec.",
          evidence:
            "The Royal Canadian Mounted Police (RCMP) enforce federal laws throughout Canada",
        },
        {
          id: "justice.police-and-legal-help.4",
          title: "Complaining about the police",
          body: "If you need to, you can question the police about their service or conduct. Almost every police force in Canada has a process for raising concerns.",
          takeaway: "You can question police service or conduct, and there is a process for it.",
          evidence:
            "You can also question the police about their service or conduct if you feel you need to.",
        },
        {
          id: "justice.police-and-legal-help.5",
          title: "Lawyers and legal aid",
          body: "Lawyers can help with legal problems and represent you in court. If you can't afford one, most communities have legal aid services that are free or low cost.",
          takeaway: "Can't afford a lawyer? Legal aid is free or low cost in most communities.",
          evidence: "there are legal aid services available free of charge or at a low cost",
        },
      ],
      teach: {
        prompt:
          "Explain how policing works in Canada: who the provincial police are in Ontario and Quebec, who they are elsewhere, and what the RCMP does nationally.",
        checklist: [
          "Ontario and Quebec have their own provincial police; every province has municipal police",
          "The RCMP enforces federal laws across Canada",
          "The RCMP is the provincial police everywhere except Ontario and Quebec, and serves some municipalities",
          "You can complain about police conduct, and legal aid helps if you can't pay a lawyer",
        ],
        probe: "If you live outside Ontario and Quebec, who are your provincial police?",
      },
      test: [
        {
          id: "ju-014",
          biteId: "justice.police-and-legal-help.1",
          kind: "choice",
          prompt: "Which of these is a reason to ask the police for help?",
          options: [
            "You need an income tax ruling",
            "Your car needs routine repairs",
            "You want to dispute a neighbour's property line",
            "Someone you know has gone missing",
          ],
          correctIndex: 3,
          rationale:
            "You can ask the police for help with an accident, a theft, an assault, a crime you see, or a missing person.",
          evidence: "if you see a crime taking place or if someone you know has gone missing",
        },
        {
          id: "ju-015",
          biteId: "justice.police-and-legal-help.2",
          kind: "choice",
          prompt: "Which provinces have their own provincial police forces?",
          options: [
            "Ontario and Quebec",
            "British Columbia and Alberta",
            "Manitoba and Saskatchewan",
            "Nova Scotia and New Brunswick",
          ],
          correctIndex: 0,
          rationale: "Only Ontario and Quebec. Elsewhere, the RCMP is the provincial police.",
          evidence: "There are provincial police forces in Ontario and Quebec",
        },
        {
          id: "ju-016",
          biteId: "justice.police-and-legal-help.2",
          kind: "choice",
          prompt: "Where are there municipal police departments?",
          options: [
            "They exist only in major cities",
            "They exist in all provinces",
            "They were replaced by the RCMP",
            "They exist only in the territories",
          ],
          correctIndex: 1,
          rationale: "Every province has municipal police departments.",
          evidence: "municipal police departments in all provinces",
        },
        {
          id: "ju-017",
          biteId: "justice.police-and-legal-help.3",
          kind: "truefalse",
          prompt: "The RCMP is the provincial police everywhere except Ontario and Quebec.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "Two provinces run their own provincial police. Everywhere else, the RCMP fills that role.",
          evidence:
            "serve as the provincial police in all provinces and territories except Ontario and Quebec",
        },
        {
          id: "ju-018",
          biteId: "justice.police-and-legal-help.4",
          kind: "choice",
          prompt: "What can you question the police about?",
          options: [
            "The sentences judges impose",
            "Their pay scales",
            "Their service or conduct",
            "Their hiring of officers",
          ],
          correctIndex: 2,
          rationale: "You can question the police about their service or conduct.",
          evidence: "question the police about their service or conduct",
        },
        {
          id: "ju-019",
          biteId: "justice.police-and-legal-help.5",
          kind: "choice",
          prompt: "What can lawyers do for you?",
          options: [
            "Arrest people who owe you money",
            "Make the laws that courts must apply",
            "Serve as judges without training",
            "Help with legal problems and act for you in court",
          ],
          correctIndex: 3,
          rationale: "Lawyers can help with legal problems and represent you in court.",
          evidence: "Lawyers can help you with legal problems and act for you in court.",
        },
        {
          id: "ju-020",
          biteId: "justice.police-and-legal-help.5",
          kind: "choice",
          prompt: "You can't afford a lawyer. What is available in most communities?",
          options: [
            "Legal aid services, free of charge or at a low cost",
            "A mandatory court-appointed witness",
            "A federal small claims judge",
            "A police mediation program",
          ],
          correctIndex: 0,
          rationale: "Most communities have legal aid services that are free or low cost.",
          evidence: "there are legal aid services available free of charge or at a low cost",
        },
      ],
    },
  ],
};

export default module;
