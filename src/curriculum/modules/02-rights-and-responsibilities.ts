import type { Module } from "../types.ts";
import { chapterUrl } from "../sources.ts";

/**
 * Reference module. Every other module file follows this shape:
 *
 *   one session = one idea cluster you can read in a few minutes,
 *   one bite = one fact the guide actually states, with the guide's own words
 *   in `evidence`, and one test question that only asks about what was read.
 *
 * Answers follow Discover Canada even where the guide has aged, and a `caveat`
 * tells the learner the live value may differ. `npm run curriculum:check`
 * rejects any `evidence` string that is not verbatim guide text.
 */
const module: Module = {
  id: "rights-and-responsibilities",
  order: 2,
  title: "Rights & responsibilities",
  guideChapter: "Rights and Responsibilities of Citizenship",
  corpus: ["rights-resonsibilities-citizenship", "study-questions"],
  summary: "The freedoms Canada guarantees, and the six things it asks back.",
  mission: "Name your rights, and never mix up a right with a responsibility.",
  icon: "shield",
  tags: ["Charter", "Rights", "Civic duty"],
  source: chapterUrl("rights"),
  testSize: 10,
  sessions: [
    {
      id: "rights-and-responsibilities.ordered-liberty",
      moduleId: "rights-and-responsibilities",
      title: "Where our rights come from",
      summary: "Magna Carta, the four fundamental freedoms, habeas corpus and the 1982 Charter.",
      minutes: 6,
      source: chapterUrl("rights"),
      bites: [
        {
          id: "rights-and-responsibilities.ordered-liberty.1",
          title: "800 years of ordered liberty",
          body: "Canadian law has several sources: laws passed by Parliament and the provincial legislatures, English common law, the civil code of France, and the unwritten constitution inherited from Great Britain. Together they carry an 800-year tradition of ordered liberty that began with Magna Carta in 1215.",
          takeaway:
            "Canadian law has several sources, and its tradition of liberty starts with Magna Carta in 1215.",
          evidence: "the unwritten constitution that we have inherited from Great Britain",
        },
        {
          id: "rights-and-responsibilities.ordered-liberty.2",
          title: "The four fundamental freedoms",
          body: "There are four fundamental freedoms: freedom of conscience and religion; freedom of thought, belief, opinion and expression, including freedom of speech and of the press; freedom of peaceful assembly; and freedom of association.",
          takeaway:
            "Four freedoms: conscience and religion, thought and expression, peaceful assembly, association.",
          evidence: "Freedom of conscience and religion;",
        },
        {
          id: "rights-and-responsibilities.ordered-liberty.3",
          title: "Habeas corpus",
          body: "Habeas corpus is the right to challenge being held unlawfully by the state. It comes from English common law, not from a law passed by Parliament.",
          takeaway: "Habeas corpus lets you challenge being detained unlawfully.",
          evidence:
            "Habeas corpus, the right to challenge unlawful detention by the state, comes from English common law.",
        },
        {
          id: "rights-and-responsibilities.ordered-liberty.4",
          title: "1982: the Charter",
          body: "In 1982 the Constitution of Canada was amended to entrench the Canadian Charter of Rights and Freedoms. The Charter begins by recognizing the supremacy of God and the rule of law. It sums up the fundamental freedoms and adds further rights.",
          takeaway: "The Charter became part of the Constitution in 1982.",
          evidence:
            "The Constitution of Canada was amended in 1982 to entrench the Canadian Charter of Rights and Freedoms",
        },
      ],
      teach: {
        prompt:
          "Explain where Canadian rights come from without looking at the guide. Name the four fundamental freedoms and one older source.",
        checklist: [
          "Magna Carta, 1215, starts the tradition of ordered liberty",
          "Four freedoms: conscience and religion, thought and expression, peaceful assembly, association",
          "Habeas corpus comes from English common law",
          "The Charter was entrenched in the Constitution in 1982",
        ],
        probe: "The Charter only arrived in 1982. What protected rights before that?",
      },
      test: [
        {
          id: "rr-001",
          biteId: "rights-and-responsibilities.ordered-liberty.1",
          kind: "choice",
          prompt: "Which document, signed in 1215, began Canada's tradition of ordered liberty?",
          options: [
            "Magna Carta",
            "The Quebec Act",
            "The British North America Act",
            "The Charter of Fundamentals",
          ],
          correctIndex: 0,
          rationale:
            "The tradition of ordered liberty dates to Magna Carta, the Great Charter of Freedoms, signed in England in 1215.",
          evidence: "which dates back to the signing of Magna Carta in 1215 in England",
        },
        {
          id: "rr-002",
          biteId: "rights-and-responsibilities.ordered-liberty.2",
          kind: "choice",
          prompt: "Which of these is one of the four fundamental freedoms?",
          options: [
            "Freedom to own property",
            "Freedom of peaceful assembly",
            "Freedom from taxation without representation",
            "Freedom of movement between provinces only",
          ],
          correctIndex: 1,
          rationale:
            "The four freedoms are conscience and religion, thought and expression, peaceful assembly, and association.",
          evidence: "Freedom of peaceful assembly;",
        },
        {
          id: "rr-003",
          biteId: "rights-and-responsibilities.ordered-liberty.3",
          kind: "choice",
          prompt: "What does habeas corpus let a person do?",
          options: [
            "Ask for a trial in either official language",
            "Appeal a tax decision to the Supreme Court",
            "Challenge being detained by the state without lawful cause",
            "Refuse to serve on a jury",
          ],
          correctIndex: 2,
          rationale: "Habeas corpus is the right to challenge unlawful detention by the state.",
          evidence:
            "Habeas corpus, the right to challenge unlawful detention by the state, comes from English common law.",
        },
        {
          id: "rr-004",
          biteId: "rights-and-responsibilities.ordered-liberty.4",
          kind: "choice",
          prompt:
            "In what year was the Charter of Rights and Freedoms entrenched in the Constitution?",
          options: ["1867", "1931", "1982", "1995"],
          correctIndex: 2,
          rationale: "The Constitution was amended in 1982 to entrench the Charter.",
          evidence:
            "The Constitution of Canada was amended in 1982 to entrench the Canadian Charter of Rights and Freedoms",
        },
        {
          id: "rr-005",
          biteId: "rights-and-responsibilities.ordered-liberty.4",
          kind: "truefalse",
          prompt: "The Charter begins by recognizing the supremacy of God and the rule of law.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "The Charter's opening words recognize the supremacy of God and the rule of law.",
          evidence:
            'which begins with the words, "Whereas Canada is founded upon principles that recognize the supremacy of God and the rule of law."',
        },
        {
          id: "rr-006",
          biteId: "rights-and-responsibilities.ordered-liberty.1",
          kind: "choice",
          prompt: "Which of these is a source of Canadian law?",
          options: [
            "Treaties signed only with European powers",
            "Municipal bylaws as the foundation",
            "Roman imperial edicts",
            "The civil code of France",
          ],
          correctIndex: 3,
          rationale:
            "The civil code of France is one source, along with laws passed by Parliament and the provinces, English common law and the unwritten constitution.",
          evidence: "the civil code of France and the unwritten constitution",
        },
      ],
    },
    {
      id: "rights-and-responsibilities.charter-rights",
      moduleId: "rights-and-responsibilities",
      title: "Rights the Charter adds",
      summary: "Mobility, Aboriginal peoples' rights, official languages and multiculturalism.",
      minutes: 5,
      source: chapterUrl("rights"),
      bites: [
        {
          id: "rights-and-responsibilities.charter-rights.1",
          title: "Mobility rights",
          body: "Mobility rights mean you can live and work anywhere in Canada, enter and leave the country freely, and apply for a passport.",
          takeaway:
            "Mobility rights: live and work anywhere in Canada, come and go freely, get a passport.",
          evidence: "Mobility Rights - Canadians can live and work anywhere they choose in Canada",
        },
        {
          id: "rights-and-responsibilities.charter-rights.2",
          title: "Aboriginal peoples' rights",
          body: "The Charter does not override treaty rights. The rights it guarantees will not adversely affect any treaty or other rights or freedoms of Aboriginal peoples.",
          takeaway: "Charter rights do not take away treaty or other Aboriginal rights.",
          evidence:
            "The rights guaranteed in the Charter will not adversely affect any treaty or other rights or freedoms of Aboriginal peoples.",
        },
        {
          id: "rights-and-responsibilities.charter-rights.3",
          title: "Official languages",
          body: "French and English have equal status in Parliament and throughout the federal government. The Charter also protects minority language education rights.",
          takeaway: "English and French are equal in Parliament and the federal government.",
          evidence:
            "Official Language Rights and Minority Language Educational Rights - French and English have equal status in Parliament",
        },
        {
          id: "rights-and-responsibilities.charter-rights.4",
          title: "Multiculturalism",
          body: "Multiculturalism is a fundamental characteristic of Canadian heritage and identity. In practice it means respecting pluralism and living together in harmony.",
          takeaway: "Multiculturalism is a fundamental part of Canadian heritage and identity.",
          evidence: "A fundamental characteristic of the Canadian heritage and identity.",
        },
      ],
      teach: {
        prompt: "Name the four kinds of rights the Charter adds, with one example of each.",
        checklist: [
          "Mobility rights: live and work anywhere in Canada",
          "Aboriginal peoples' rights: the Charter does not harm treaty rights",
          "Official language rights: French and English are equal in Parliament",
          "Multiculturalism: a fundamental part of Canadian identity",
        ],
        probe: "Which of the four limits what the Charter itself can do?",
      },
      test: [
        {
          id: "rr-007",
          biteId: "rights-and-responsibilities.charter-rights.1",
          kind: "choice",
          prompt: "What do mobility rights let a citizen do?",
          options: [
            "Live and work anywhere in Canada",
            "Vote in any province regardless of residence",
            "Exit any country without showing a passport",
            "Claim free education in any province",
          ],
          correctIndex: 0,
          rationale:
            "Mobility rights let you live and work anywhere in Canada, enter and leave freely, and apply for a passport.",
          evidence:
            "Canadians can live and work anywhere they choose in Canada, enter and leave the country freely",
        },
        {
          id: "rr-008",
          biteId: "rights-and-responsibilities.charter-rights.2",
          kind: "truefalse",
          prompt: "Charter rights can override the treaty rights of Aboriginal peoples.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale:
            "Charter rights will not adversely affect any treaty or other rights or freedoms of Aboriginal peoples.",
          evidence:
            "will not adversely affect any treaty or other rights or freedoms of Aboriginal peoples",
        },
        {
          id: "rr-009",
          biteId: "rights-and-responsibilities.charter-rights.3",
          kind: "choice",
          prompt: "How do French and English compare in Parliament and the federal government?",
          options: [
            "English is primary, French is symbolic",
            "Both have equal status",
            "French is primary in the Senate only",
            "Each department chooses one language",
          ],
          correctIndex: 1,
          rationale:
            "French and English have equal status in Parliament and throughout the federal government.",
          evidence:
            "French and English have equal status in Parliament and throughout the government.",
        },
        {
          id: "rr-010",
          biteId: "rights-and-responsibilities.charter-rights.3",
          kind: "choice",
          prompt: "Which right goes together with official language rights?",
          options: [
            "Indigenous language translation rights",
            "Second language workplace rights",
            "Minority language educational rights",
            "Provincial language sovereignty",
          ],
          correctIndex: 2,
          rationale: "Official language rights come with minority language education rights.",
          evidence: "Official Language Rights and Minority Language Educational Rights",
        },
        {
          id: "rr-011",
          biteId: "rights-and-responsibilities.charter-rights.4",
          kind: "choice",
          prompt: "How is multiculturalism described?",
          options: [
            "A provincial jurisdiction over culture",
            "A benefit limited to recent newcomers",
            "A transitional stage of immigration policy",
            "A fundamental characteristic of the Canadian heritage and identity",
          ],
          correctIndex: 3,
          rationale:
            "Multiculturalism is a fundamental characteristic of Canadian heritage and identity.",
          evidence: "A fundamental characteristic of the Canadian heritage and identity.",
        },
      ],
    },
    {
      id: "rights-and-responsibilities.responsibilities",
      moduleId: "rights-and-responsibilities",
      title: "What citizenship asks back",
      summary: "The six responsibilities, and the one the law requires.",
      minutes: 6,
      source: chapterUrl("rights"),
      bites: [
        {
          id: "rights-and-responsibilities.responsibilities.1",
          title: "Obey the law, and the rule of law behind it",
          body: "The first responsibility is to obey the law. Behind it is the rule of law: people and governments are governed by laws, not by arbitrary decisions. No person or group is above the law.",
          takeaway: "The rule of law: no person or group is above the law.",
          evidence:
            "Individuals and governments are regulated by laws and not by arbitrary actions.",
        },
        {
          id: "rights-and-responsibilities.responsibilities.2",
          title: "Take responsibility for yourself and your family",
          body: "Getting a job, caring for your family and working hard in keeping with your abilities are Canadian values. Work brings dignity and self-respect, and it builds the country's prosperity.",
          takeaway: "Supporting yourself and your family is a responsibility of citizenship.",
          evidence:
            "Getting a job, taking care of one's family and working hard in keeping with one's abilities are important Canadian values.",
        },
        {
          id: "rights-and-responsibilities.responsibilities.3",
          title: "Jury duty is required",
          body: "If you are called to serve on a jury, the law requires you to serve. It is also a privilege: the justice system depends on fair juries of ordinary citizens.",
          takeaway: "When you are called for jury duty, you must serve.",
          evidence: "When called to do so, you are legally required to serve.",
        },
        {
          id: "rights-and-responsibilities.responsibilities.4",
          title: "Voting, community, heritage",
          body: "With the right to vote comes the responsibility to vote in federal, provincial or territorial, and local elections. The last two responsibilities are helping others in your community, for example as a volunteer, and protecting and enjoying Canada's heritage and environment by avoiding waste and pollution.",
          takeaway:
            "Vote at every level, help your community, and protect the heritage and environment.",
          evidence:
            "The right to vote comes with a responsibility to vote in federal, provincial or territorial and local elections.",
        },
      ],
      teach: {
        prompt: "Name the six responsibilities of citizenship, and say which one is a legal duty.",
        checklist: [
          "Obey the law; take responsibility for yourself and your family",
          "Serve on a jury; vote in elections",
          "Help others in the community; protect and enjoy the heritage and environment",
          "Jury service is legally required when you are called",
        ],
        probe: "Which of the six could get you into legal trouble if you skipped it?",
      },
      test: [
        {
          id: "rr-012",
          biteId: "rights-and-responsibilities.responsibilities.1",
          kind: "choice",
          prompt: "Which founding principle is behind the responsibility to obey the law?",
          options: [
            "The rule of law",
            "Collective responsibility",
            "Parliamentary privilege",
            "Provincial sovereignty",
          ],
          correctIndex: 0,
          rationale:
            "The rule of law: people and governments are governed by laws, not by arbitrary actions.",
          evidence: "One of Canada's founding principles is the rule of law.",
        },
        {
          id: "rr-013",
          biteId: "rights-and-responsibilities.responsibilities.3",
          kind: "choice",
          prompt: "You are called for jury duty. What does the law say?",
          options: [
            "You may decline without consequence",
            "You are legally required to serve",
            "You may serve only if you own property",
            "You must ask your employer's permission first",
          ],
          correctIndex: 1,
          rationale: "When you are called, you are legally required to serve on a jury.",
          evidence: "Serving on a jury is a privilege that makes the justice system work",
        },
        {
          id: "rr-014",
          biteId: "rights-and-responsibilities.responsibilities.4",
          kind: "choice",
          prompt: "In which elections is voting a responsibility?",
          options: [
            "Federal elections, not provincial ones",
            "Provincial and territorial elections only",
            "Federal, provincial or territorial and local elections",
            "Federal and provincial elections, but not municipal",
          ],
          correctIndex: 2,
          rationale:
            "With the right to vote comes the responsibility to vote in federal, provincial or territorial, and local elections.",
          evidence: "vote in federal, provincial or territorial and local elections",
        },
        {
          id: "rr-015",
          biteId: "rights-and-responsibilities.responsibilities.2",
          kind: "truefalse",
          prompt:
            "Taking responsibility for yourself and your family is a responsibility of citizenship.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale: "It is one of the six responsibilities of citizenship.",
          evidence: "Taking responsibility for oneself and one's family",
        },
        {
          id: "rr-016",
          biteId: "rights-and-responsibilities.responsibilities.4",
          kind: "choice",
          prompt: "Which responsibility is about what you leave for future generations?",
          options: [
            "Serving in the Canadian Forces",
            "Learning both official languages",
            "Owning property in Canada",
            "Protecting and enjoying our heritage and environment",
          ],
          correctIndex: 3,
          rationale:
            "Every citizen should avoid waste and pollution and protect Canada's natural, cultural and architectural heritage for future generations.",
          evidence: "Protecting and enjoying our heritage and environment",
        },
        {
          id: "rr-017",
          biteId: "rights-and-responsibilities.responsibilities.2",
          kind: "choice",
          prompt: "What are three responsibilities of citizenship?",
          options: [
            "Obeying the law, taking responsibility for oneself and one's family, serving on a jury",
            "Learning both official languages, voting in elections, belonging to a union",
            "Buying Canadian products, owning your own business, using less water",
            "Being loyal to Canada, recycling newspapers, serving in the navy, army or air force",
          ],
          correctIndex: 0,
          rationale:
            "This question comes from the guide's own study questions. Obeying the law, taking responsibility for yourself and your family, and serving on a jury are all responsibilities of citizenship.",
          evidence:
            "Obeying the law, taking responsibility for oneself and one's family, serving on a jury.",
          official: true,
        },
      ],
    },
    {
      id: "rights-and-responsibilities.equality-and-defending",
      moduleId: "rights-and-responsibilities",
      title: "Equality and defending Canada",
      summary:
        "Equality under the law, gender-based violence, and why military service is voluntary.",
      minutes: 5,
      source: chapterUrl("rights"),
      bites: [
        {
          id: "rights-and-responsibilities.equality-and-defending.1",
          title: "Men and women are equal",
          body: "In Canada, men and women are equal under the law. Culture is no excuse: spousal abuse, honour killings, female genital mutilation and forced marriage are crimes and are severely punished.",
          takeaway: "Men and women are equal under the law, and no culture overrides that.",
          evidence: "In Canada, men and women are equal under the law.",
        },
        {
          id: "rights-and-responsibilities.equality-and-defending.2",
          title: "No compulsory military service",
          body: "Canada has no compulsory military service. Joining the regular Canadian Forces (navy, army and air force) is a choice. You can also serve part-time in the reserves, or as a cadet.",
          takeaway: "Military service in Canada is voluntary.",
          evidence: "There is no compulsory military service in Canada.",
        },
        {
          id: "rights-and-responsibilities.equality-and-defending.3",
          title: "Serving close to home",
          body: "You can also defend Canada outside the military, in the Coast Guard or in local emergency services such as a police force or fire department.",
          takeaway: "The Coast Guard, police and fire services are also ways to serve.",
          evidence: "You may also serve in the Coast Guard or emergency services in your community",
        },
      ],
      teach: {
        prompt:
          "Explain what Canada says about equality between women and men, and about defending the country.",
        checklist: [
          "Men and women are equal under the law",
          "Spousal abuse, honour killings, female genital mutilation and forced marriage are crimes, whatever the culture",
          "There is no compulsory military service",
          "The Coast Guard, police and fire services are other ways to serve",
        ],
        probe: "Name one way to serve your community outside the Canadian Forces.",
      },
      test: [
        {
          id: "rr-018",
          biteId: "rights-and-responsibilities.equality-and-defending.2",
          kind: "truefalse",
          prompt: "Canadian citizens are required to serve in the military.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "Canada has no compulsory military service.",
          evidence: "There is no compulsory military service in Canada.",
        },
        {
          id: "rr-019",
          biteId: "rights-and-responsibilities.equality-and-defending.2",
          kind: "choice",
          prompt: "Which three services make up the Canadian Forces?",
          options: [
            "Militia, reserves and constabulary",
            "Navy, army and air force",
            "Navy, marines and coast guard",
            "Army, air force and border service",
          ],
          correctIndex: 1,
          rationale: "The regular Canadian Forces are the navy, army and air force.",
          evidence: "serving in the regular Canadian Forces (navy, army and air force)",
        },
        {
          id: "rr-020",
          biteId: "rights-and-responsibilities.equality-and-defending.1",
          kind: "choice",
          prompt: "What happens to people who commit gender-based violence in the name of culture?",
          options: [
            "They are tolerated where communities choose them",
            "They are handled by provincial human rights commissions only",
            "Those guilty of these crimes are severely punished under Canada's criminal laws",
            "They are addressed through mandatory mediation",
          ],
          correctIndex: 2,
          rationale:
            "Spousal abuse, honour killings, female genital mutilation and forced marriage are crimes, and those guilty are severely punished under Canada's criminal laws.",
          evidence:
            "Those guilty of these crimes are severely punished under Canada's criminal laws.",
        },
        {
          id: "rr-021",
          biteId: "rights-and-responsibilities.equality-and-defending.1",
          kind: "choice",
          prompt: "What does Canadian law say about women and men?",
          options: [
            "Women receive priority in hiring",
            "Equality applies only to citizens by birth",
            "Each province defines equality itself",
            "Men and women are equal under the law",
          ],
          correctIndex: 3,
          rationale: "Men and women are equal under the law.",
          evidence: "In Canada, men and women are equal under the law.",
        },
        {
          id: "rr-022",
          biteId: "rights-and-responsibilities.equality-and-defending.3",
          kind: "choice",
          prompt: "Besides the Canadian Forces, which service is a way to protect your community?",
          options: [
            "The Coast Guard",
            "The Senate pages",
            "The Privy Council Office",
            "The Canada Revenue Agency",
          ],
          correctIndex: 0,
          rationale:
            "You can also serve in the Coast Guard or in local emergency services such as police or fire departments.",
          evidence: "You may also serve in the Coast Guard or emergency services in your community",
        },
      ],
    },
  ],
};

export default module;
