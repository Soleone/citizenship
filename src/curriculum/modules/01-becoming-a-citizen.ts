import type { Module } from "../types.ts";
import { chapterUrl } from "../sources.ts";

/**
 * Built from the two chapters that describe the process itself: Applying for
 * Citizenship and The Oath of Citizenship.
 *
 * This chapter is short, so nearly every sentence in it carries a fact. The
 * test format numbers people ask about (how many questions, how long, what
 * mark passes) are not stated in these two chapters, so they are not asked
 * here; the app shows the current IRCC figures separately. Answers follow the
 * guide, and a `caveat` tells the learner what to confirm before applying.
 */
const module: Module = {
  id: "becoming-a-citizen",
  order: 1,
  title: "Becoming a citizen",
  guideChapter: "Applying for Citizenship",
  corpus: ["applying-citizenship", "oath-citizenship"],
  summary: "The test, the application, the ceremony, and the Oath that finishes it.",
  mission:
    "Say what happens between applying and becoming a citizen, and explain what the Oath commits you to.",
  icon: "passport",
  tags: ["Citizenship test", "Ceremony", "Oath of Citizenship"],
  source: chapterUrl("applying"),
  testSize: 8,
  sessions: [
    {
      id: "becoming-a-citizen.test-and-application",
      moduleId: "becoming-a-citizen",
      title: "The citizenship test and how to apply",
      summary:
        "Who takes the test, what it covers, how to prepare, and what happens after you apply.",
      minutes: 7,
      source: chapterUrl("applying"),
      bites: [
        {
          id: "becoming-a-citizen.test-and-application.1",
          title: "Who has to take the test",
          body: "If you are 18 to 54 years old when you apply, you must take the citizenship test to show you know enough about Canada and about the rights and responsibilities of citizenship. You can take it in English or French. If you are 55 or older, you do not take it. What counts is your age on the day you apply.",
          takeaway: "18 to 54 when you apply: you take the test. 55 or older: you don't.",
          evidence:
            "Effective October 11, 2017 applicants who are 18-54 years of age when they apply",
        },
        {
          id: "becoming-a-citizen.test-and-application.2",
          title: "The two basic requirements",
          body: "To become a citizen you must meet two basic requirements: you know enough about Canada and about the rights and responsibilities of citizenship, and you speak English or French well enough. The test checks only the first one. It is not used to assess your English or French.",
          takeaway:
            "Two requirements: knowledge of Canada, and English or French. The test checks only knowledge.",
          evidence:
            "You will be tested on two basic requirements for citizenship: 1) knowledge of Canada",
        },
        {
          id: "becoming-a-citizen.test-and-application.3",
          title: "What the test looks like",
          body: "The test is usually written, but it could be an interview. Every question comes from subject areas set out in the Citizenship Regulations, and everything you need to know is in the guide.",
          takeaway: "Usually written, sometimes an interview, and every answer is in the guide.",
          evidence: "The citizenship test is usually a written test, but it could be an interview.",
        },
        {
          id: "becoming-a-citizen.test-and-application.4",
          title: "Four ways to prepare",
          body: "The guide suggests four things: study the guide, ask a friend or family member to quiz you on Canada, ask a school, college, community centre or immigrant serving organization about citizenship classes, and take English or French classes, which the Government of Canada offers free of charge.",
          takeaway:
            "Study the guide, practise with someone, look for citizenship classes, and take the free language classes.",
          evidence:
            "Take English or French language classes, which the Government of Canada offers free of charge.",
        },
        {
          id: "becoming-a-citizen.test-and-application.5",
          title: "What happens once you apply",
          body: "Once you apply, officials check your status, make sure nothing prohibits you from applying, and confirm you meet the requirements. Processing may take several months, so make sure the Call Centre always has your correct address.",
          takeaway:
            "Processing takes several months. Keep your address current with the Call Centre.",
          evidence: "Please ensure that the Call Centre always has your correct address",
        },
      ],
      teach: {
        prompt: "Explain who takes the citizenship test, what it covers, and how to prepare.",
        checklist: [
          "Applicants aged 18 to 54 when they apply take the test; 55 and over do not",
          "It covers knowledge of Canada and of the rights and responsibilities of citizenship; English or French is a separate requirement",
          "Usually a written test, sometimes an interview, and every answer is in the guide",
          "Practise with a friend or family member, ask about citizenship classes, and take the free language classes",
          "Processing can take several months, so keep your address current with the Call Centre",
        ],
        probe:
          "The test does not check your English or French. So how do you meet the language requirement?",
      },
      test: [
        {
          id: "bc-001",
          biteId: "becoming-a-citizen.test-and-application.1",
          kind: "choice",
          prompt: "Who must take the citizenship test?",
          options: [
            "Applicants who are 18 to 54 years of age when they apply",
            "Only applicants who do not have a Canadian diploma",
            "Only applicants who arrived in Canada within the last two years",
            "Every applicant, whatever their age",
          ],
          correctIndex: 0,
          rationale:
            "Applicants who are 18 to 54 years old when they apply must show their knowledge of Canada by taking the test.",
          evidence:
            "Effective October 11, 2017 applicants who are 18-54 years of age when they apply",
          caveat:
            "The Citizenship Act has been amended before and can change again. Confirm the current age range and requirements on the IRCC citizenship test page before you apply.",
        },
        {
          id: "bc-002",
          biteId: "becoming-a-citizen.test-and-application.1",
          kind: "truefalse",
          prompt: "An applicant who is 56 years old must still take the citizenship test.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale:
            "Applicants 55 and older do not take the test. Only those 18 to 54 when they apply do.",
          evidence:
            "Adult applicants 55 years of age and over do not need to write the citizenship test.",
          caveat:
            "Discover Canada exempts applicants 55 years of age and over, while the IRCC test page phrases the exemption as applicants over 55. Confirm which rule covers your own age with IRCC.",
        },
        {
          id: "bc-003",
          biteId: "becoming-a-citizen.test-and-application.2",
          kind: "choice",
          prompt: "What are the two basic requirements to become a Canadian citizen?",
          options: [
            "Your work history in Canada, and your knowledge of your own province",
            "Knowledge of Canada and of the rights and responsibilities of citizenship, and adequate knowledge of English or French",
            "Knowledge of Canadian sports, and the ability to pass a driving test",
            "Loyalty to the Prime Minister, and a signed job contract",
          ],
          correctIndex: 1,
          rationale:
            "You need knowledge of Canada and of the rights and responsibilities of citizenship, and adequate knowledge of English or French.",
          evidence:
            "1) knowledge of Canada and of the rights and responsibilities of citizenship, and 2) adequate knowledge of English or French.",
        },
        {
          id: "bc-004",
          biteId: "becoming-a-citizen.test-and-application.2",
          kind: "truefalse",
          prompt: "The citizenship test checks how well you know English or French.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale:
            "Language is a separate requirement. The test checks only your knowledge of Canada and of citizenship.",
          evidence:
            "The citizenship test is not used to assess an applicant's knowledge of English or French.",
        },
        {
          id: "bc-005",
          biteId: "becoming-a-citizen.test-and-application.3",
          kind: "choice",
          prompt: "What form does the citizenship test usually take?",
          options: [
            "A spoken presentation to a panel of citizens",
            "A written assignment you complete over several weeks",
            "A written test, although it could be an interview",
            "A group discussion with other applicants",
          ],
          correctIndex: 2,
          rationale: "The test is usually written, but it could be an interview.",
          evidence: "The citizenship test is usually a written test, but it could be an interview.",
          caveat:
            "How IRCC gives the test has changed since the guide was written. Your invitation tells you the format.",
        },
        {
          id: "bc-006",
          biteId: "becoming-a-citizen.test-and-application.3",
          kind: "truefalse",
          prompt: "Everything you need for the citizenship test is in the guide.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "Every question comes from subject areas in the Citizenship Regulations, and all the information you need is in the guide.",
          evidence: "all required information is provided in this study guide.",
        },
        {
          id: "bc-007",
          biteId: "becoming-a-citizen.test-and-application.4",
          kind: "choice",
          prompt: "Which classes does the Government of Canada offer free of charge?",
          options: [
            "Citizenship classes at a private college",
            "Job interview coaching",
            "Driving classes",
            "English or French language classes",
          ],
          correctIndex: 3,
          rationale:
            "The Government of Canada offers English and French language classes free of charge.",
          evidence:
            "Take English or French language classes, which the Government of Canada offers free of charge.",
        },
        {
          id: "bc-008",
          biteId: "becoming-a-citizen.test-and-application.5",
          kind: "choice",
          prompt: "What should you do while your application is being processed?",
          options: [
            "Make sure the Call Centre always has your correct address",
            "Retake the citizenship test every few months until the ceremony",
            "Avoid leaving the province where you applied",
            "Send a new application if you move to a different address",
          ],
          correctIndex: 0,
          rationale:
            "Processing may take several months, so keep the Call Centre up to date with your correct address.",
          evidence: "Please ensure that the Call Centre always has your correct address",
        },
      ],
    },
    {
      id: "becoming-a-citizen.after-the-test",
      moduleId: "becoming-a-citizen",
      title: "After the test: notice, ceremony, certificate",
      summary:
        "The Notice to Appear, the three things you do at the ceremony, and what happens if you fail.",
      minutes: 5,
      source: chapterUrl("applying"),
      bites: [
        {
          id: "becoming-a-citizen.after-the-test.1",
          title: "Passing leads to a Notice to Appear",
          body: "If you pass the test and meet all the other requirements, you receive a Notice to Appear to Take the Oath of Citizenship. It is the step before the ceremony.",
          takeaway:
            "Pass and meet the other requirements, and you get a Notice to Appear to take the Oath.",
          evidence: "you will receive a Notice to Appear to Take the Oath of Citizenship",
        },
        {
          id: "becoming-a-citizen.after-the-test.2",
          title: "What the notice tells you",
          body: "The Notice to Appear gives you the date, time and place of your citizenship ceremony.",
          takeaway: "The notice gives the date, time and place of your ceremony.",
          evidence:
            "This document tells you the date, time and place of your citizenship ceremony.",
        },
        {
          id: "becoming-a-citizen.after-the-test.3",
          title: "Three things you do at the ceremony",
          body: "At the ceremony you do three things: take the Oath of Citizenship, sign the oath form, and receive your Canadian Citizenship Certificate.",
          takeaway: "Take the Oath, sign the oath form, receive your Citizenship Certificate.",
          evidence: "Receive your Canadian Citizenship Certificate.",
        },
        {
          id: "becoming-a-citizen.after-the-test.4",
          title: "If you do not pass, and who to bring",
          body: "If you do not pass the test, you receive a notification that tells you the next steps. For the ceremony itself, you are encouraged to bring family and friends to celebrate.",
          takeaway:
            "Fail, and a letter tells you the next steps. Pass, and bring family and friends to the ceremony.",
          evidence:
            "If you do not pass the test, you will receive a notification indicating the next steps.",
        },
      ],
      teach: {
        prompt:
          "Walk your partner through what happens after the test, up to the document you leave the ceremony with.",
        checklist: [
          "Pass and meet the other requirements, and you get a Notice to Appear to Take the Oath of Citizenship",
          "The notice gives the date, time and place of the ceremony",
          "At the ceremony: take the Oath, sign the oath form, receive your Citizenship Certificate",
          "If you fail, a letter tells you the next steps",
        ],
        probe: "Which document do you leave the ceremony with?",
      },
      test: [
        {
          id: "bc-009",
          biteId: "becoming-a-citizen.after-the-test.1",
          kind: "choice",
          prompt: "What do you receive if you pass the test and meet the other requirements?",
          options: [
            "A refund of your application fee",
            "A Notice to Appear to Take the Oath of Citizenship",
            "A temporary travel document for citizens",
            "A letter confirming your permanent resident status",
          ],
          correctIndex: 1,
          rationale:
            "Passing and meeting the other requirements gets you a Notice to Appear to Take the Oath of Citizenship.",
          evidence: "you will receive a Notice to Appear to Take the Oath of Citizenship",
        },
        {
          id: "bc-010",
          biteId: "becoming-a-citizen.after-the-test.2",
          kind: "choice",
          prompt: "What does the Notice to Appear tell you?",
          options: [
            "How much you must pay for the ceremony",
            "The name of the judge who will grant your citizenship",
            "The date, time and place of your citizenship ceremony",
            "Which questions will be asked at the ceremony",
          ],
          correctIndex: 2,
          rationale:
            "The Notice to Appear gives the date, time and place of your citizenship ceremony.",
          evidence:
            "This document tells you the date, time and place of your citizenship ceremony.",
        },
        {
          id: "bc-011",
          biteId: "becoming-a-citizen.after-the-test.3",
          kind: "choice",
          prompt: "What do you sign at your citizenship ceremony?",
          options: [
            "A police clearance letter",
            "A citizenship test answer sheet",
            "A land purchase contract",
            "The oath form",
          ],
          correctIndex: 3,
          rationale:
            "At the ceremony you take the Oath, sign the oath form, and receive your Citizenship Certificate.",
          evidence: "Sign the oath form",
        },
        {
          id: "bc-012",
          biteId: "becoming-a-citizen.after-the-test.3",
          kind: "choice",
          prompt: "Which document do you receive at your ceremony?",
          options: [
            "Your Canadian Citizenship Certificate",
            "A Canadian birth certificate",
            "A voter information card",
            "A permanent resident card",
          ],
          correctIndex: 0,
          rationale:
            "The last of the three ceremony steps is receiving your Canadian Citizenship Certificate.",
          evidence: "Receive your Canadian Citizenship Certificate.",
        },
        {
          id: "bc-013",
          biteId: "becoming-a-citizen.after-the-test.4",
          kind: "truefalse",
          prompt: "If you do not pass the test, you receive a notification with the next steps.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "A failed test is not the end. You receive a notification that tells you what comes next.",
          evidence:
            "If you do not pass the test, you will receive a notification indicating the next steps.",
          caveat:
            "The guide does not list how many attempts you get or how long you wait. Confirm those in the letter you receive and on the IRCC test results page.",
        },
        {
          id: "bc-014",
          biteId: "becoming-a-citizen.after-the-test.4",
          kind: "choice",
          prompt: "Who are you encouraged to bring to your citizenship ceremony?",
          options: [
            "Your employer or a manager",
            "Your family and friends",
            "A witness who is already a citizen",
            "An interpreter from the school board",
          ],
          correctIndex: 1,
          rationale: "You are encouraged to bring your family and friends to celebrate.",
          evidence:
            "You are encouraged to bring your family and friends to celebrate this occasion.",
        },
      ],
    },
    {
      id: "becoming-a-citizen.the-oath",
      moduleId: "becoming-a-citizen",
      title: "The Oath of Citizenship and what it means",
      summary:
        "The words of the Oath, who it names, and why Canadians pledge loyalty to the Sovereign.",
      minutes: 6,
      source: chapterUrl("oath"),
      bites: [
        {
          id: "becoming-a-citizen.the-oath.1",
          title: "Swear, or affirm",
          body: 'The Oath begins "I swear (or affirm)", so you can affirm instead of swearing. You promise to be faithful and bear true allegiance to His Majesty King Charles the Third, King of Canada, his Heirs and Successors. The guide prints the Oath in English and French.',
          takeaway:
            "You swear or affirm allegiance to the King of Canada and his Heirs and Successors.",
          evidence: "I swear (or affirm) That I will be faithful",
        },
        {
          id: "becoming-a-citizen.the-oath.2",
          title: "The laws, the Constitution, and the duties",
          body: "The Oath is more than allegiance. You also promise to faithfully observe the laws of Canada, including the Constitution, which recognizes and affirms the Aboriginal and treaty rights of First Nations, Inuit and Métis peoples. And you promise to fulfil your duties as a Canadian citizen.",
          takeaway:
            "You promise to observe Canada's laws, including the Constitution, and to fulfil your duties as a citizen.",
          evidence:
            "And that I will faithfully observe The laws of Canada Including the Constitution",
        },
        {
          id: "becoming-a-citizen.the-oath.3",
          title: "What changed in the Oath",
          body: "The Oath has been updated since the 2012 guide. It now names King Charles the Third instead of the Queen, and it now refers to the Aboriginal and treaty rights of Indigenous peoples.",
          takeaway: "Today's Oath names King Charles the Third and Indigenous treaty rights.",
          evidence: "Aboriginal and treaty rights of Indigenous peoples in Canada",
        },
        {
          id: "becoming-a-citizen.the-oath.4",
          title: "Loyalty to a person, not a document",
          body: "In Canada, you pledge loyalty to a person who represents all Canadians. You do not pledge it to a document such as a constitution, a banner such as a flag, or a country.",
          takeaway: "Canadians pledge loyalty to a person, not to a document, a flag or a country.",
          evidence:
            "we profess our loyalty to a person who represents all Canadians and not to a document such as a constitution",
        },
        {
          id: "becoming-a-citizen.the-oath.5",
          title: "Why the Sovereign",
          body: "In a constitutional monarchy, the Sovereign (the King or Queen) stands for all of Canada. The guide puts it this way: Canada is personified by the Sovereign, just as the Sovereign is personified by Canada. At your ceremony, you repeat the Oath aloud.",
          takeaway: "The Sovereign stands for Canada, and you repeat the Oath at your ceremony.",
          evidence:
            "In our constitutional monarchy, these elements are encompassed by the Sovereign (Queen or King).",
        },
      ],
      teach: {
        prompt:
          "Say the Oath's promises from memory, then explain why Canadians pledge loyalty to a person.",
        checklist: [
          "I swear (or affirm) to be faithful and bear true allegiance to King Charles the Third, King of Canada, his Heirs and Successors",
          "Faithfully observe the laws of Canada, including the Constitution and its Aboriginal and treaty rights",
          "Fulfil my duties as a Canadian citizen",
          "Loyalty goes to a person who represents all Canadians: the Sovereign",
          "You repeat the Oath at the citizenship ceremony",
        ],
        probe: "Name one thing Canadians do not pledge loyalty to.",
      },
      test: [
        {
          id: "bc-015",
          biteId: "becoming-a-citizen.the-oath.1",
          kind: "choice",
          prompt: "In the Oath of Citizenship, who do you pledge allegiance to?",
          options: [
            "The Parliament of Canada",
            "The Constitution of Canada",
            "His Majesty King Charles the Third, King of Canada",
            "The Prime Minister of Canada",
          ],
          correctIndex: 2,
          rationale:
            "You promise to bear true allegiance to His Majesty King Charles the Third, King of Canada, his Heirs and Successors.",
          evidence: "And bear true allegiance To His Majesty King Charles the Third King of Canada",
          caveat:
            "The Oath was updated from the Queen to King Charles the Third after Queen Elizabeth II died in 2022.",
        },
        {
          id: "bc-016",
          biteId: "becoming-a-citizen.the-oath.1",
          kind: "truefalse",
          prompt: "You may affirm the Oath instead of swearing it.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale: 'The Oath begins "I swear (or affirm)", so either is allowed.',
          evidence: "I swear (or affirm) That I will be faithful",
        },
        {
          id: "bc-017",
          biteId: "becoming-a-citizen.the-oath.2",
          kind: "choice",
          prompt: "In the Oath, what does the Constitution recognize and affirm?",
          options: [
            "The rules for calling a federal election",
            "The right of each province to make its own laws",
            "The authority of the Senate over money bills",
            "The Aboriginal and treaty rights of First Nations, Inuit and Métis peoples",
          ],
          correctIndex: 3,
          rationale:
            "The Oath says the Constitution recognizes and affirms the Aboriginal and treaty rights of First Nations, Inuit and Métis peoples.",
          evidence: "The Aboriginal and treaty rights of First Nations, Inuit and Métis peoples",
        },
        {
          id: "bc-018",
          biteId: "becoming-a-citizen.the-oath.3",
          kind: "choice",
          prompt: "The Oath now refers to King Charles the Third and to what else?",
          options: [
            "The Aboriginal and treaty rights of Indigenous peoples in Canada",
            "The Supreme Court of Canada",
            "The charters of rights of each province",
            "The duties of the Governor General",
          ],
          correctIndex: 0,
          rationale:
            "The updated Oath names King Charles the Third and the Aboriginal and treaty rights of Indigenous peoples.",
          evidence: "Aboriginal and treaty rights of Indigenous peoples in Canada",
        },
        {
          id: "bc-019",
          biteId: "becoming-a-citizen.the-oath.4",
          kind: "choice",
          prompt: "In Canada, who or what do you pledge loyalty to?",
          options: [
            "The flag of Canada as a national symbol",
            "A person who represents all Canadians",
            "The Canadian Charter of Rights and Freedoms",
            "The Prime Minister and Cabinet",
          ],
          correctIndex: 1,
          rationale:
            "Loyalty goes to a person who represents all Canadians, not to a constitution, a flag or a country.",
          evidence:
            "we profess our loyalty to a person who represents all Canadians and not to a document such as a constitution",
        },
        {
          id: "bc-020",
          biteId: "becoming-a-citizen.the-oath.5",
          kind: "choice",
          prompt: "In Canada's constitutional monarchy, who stands for the whole nation?",
          options: [
            "The Senate and the House of Commons",
            "The Supreme Court of Canada",
            "The Sovereign, Queen or King",
            "The Premier of your province",
          ],
          correctIndex: 2,
          rationale:
            "The Sovereign, King or Queen, stands for Canada: Canada is personified by the Sovereign, and the Sovereign by Canada.",
          evidence:
            "Canada is personified by the Sovereign just as the Sovereign is personified by Canada",
        },
        {
          id: "bc-021",
          biteId: "becoming-a-citizen.the-oath.5",
          kind: "truefalse",
          prompt: "You do not repeat the Oath at your citizenship ceremony.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale:
            "You do repeat the Oath of Citizenship at the ceremony. That is why the guide prints it.",
          evidence: "At the citizenship ceremony, you will repeat the Oath of Citizenship.",
        },
      ],
    },
  ],
};

export default module;
