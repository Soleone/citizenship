import type { Module } from "../types.ts";
import { chapterUrl } from "../sources.ts";

/**
 * Module 6, built from the "How Canadians Govern Themselves" chapter.
 * Answers follow Discover Canada even where the guide has aged, and a `caveat`
 * tells the learner what to confirm. `npm run curriculum:check` rejects any
 * `evidence` string that is not verbatim guide text.
 */
const module: Module = {
  id: "government",
  order: 6,
  title: "Government",
  guideChapter: "How Canadians Govern Themselves",
  corpus: ["how-canadians-govern-themselves"],
  summary:
    "The three key facts, who does what, how Parliament works, how a bill becomes law, and the Crown.",
  mission:
    "Say the three key facts without hesitating, sort federal from provincial duties, and list the seven steps of a bill.",
  icon: "landmark",
  tags: ["Federalism", "Parliament", "Crown"],
  source: chapterUrl("government"),
  testSize: 10,
  sessions: [
    {
      id: "government.three-key-facts",
      moduleId: "government",
      title: "Three key facts about Canada's system",
      summary:
        "Federal state, parliamentary democracy, constitutional monarchy, and head of state versus head of government.",
      minutes: 5,
      source: chapterUrl("government"),
      bites: [
        {
          id: "government.three-key-facts.1",
          title: "The three key facts",
          body: "Canada's system of government rests on three key facts: Canada is a federal state, a parliamentary democracy and a constitutional monarchy. Each describes something different: how power is shared, how representatives are chosen, and who is Head of State.",
          takeaway:
            "Canada is a federal state, a parliamentary democracy and a constitutional monarchy.",
          evidence:
            "our country is a federal state, a parliamentary democracy and a constitutional monarchy",
        },
        {
          id: "government.three-key-facts.2",
          title: "A federal state: four orders of government",
          body: "In a federal state, more than one level of government makes decisions. Canada has four: federal, provincial, territorial and municipal. Each has its own responsibilities.",
          takeaway:
            "Federal state: federal, provincial, territorial and municipal governments, each with its own role.",
          evidence:
            "There are federal, provincial, territorial and municipal governments in Canada.",
        },
        {
          id: "government.three-key-facts.3",
          title: "A parliamentary democracy",
          body: "In a parliamentary democracy, the people elect members to the House of Commons in Ottawa and to the provincial and territorial legislatures. Citizens govern through these representatives rather than voting on each law themselves.",
          takeaway: "Parliamentary democracy: the people elect representatives to make laws.",
          evidence:
            "the people elect members to the House of Commons in Ottawa and to the provincial and territorial legislatures",
        },
        {
          id: "government.three-key-facts.4",
          title: "A constitutional monarchy",
          body: "In a constitutional monarchy, the Head of State is a hereditary Sovereign, a King or Queen, who reigns according to the Constitution. The position is inherited, and the Sovereign is bound by the rule of law.",
          takeaway:
            "Constitutional monarchy: a hereditary Sovereign who reigns according to the Constitution.",
          evidence:
            "Canada's Head of State is a hereditary Sovereign (Queen or King), who reigns in accordance with the Constitution: the rule of law",
        },
        {
          id: "government.three-key-facts.5",
          title: "Head of state is not head of government",
          body: "The head of state and the head of government are different people. The Sovereign is head of state. The Prime Minister is head of government and actually runs the country. Don't mix them up.",
          takeaway: "The Sovereign is head of state. The Prime Minister is head of government.",
          evidence:
            "the head of government - the Prime Minister, who actually directs the governing of the country",
        },
      ],
      teach: {
        prompt:
          "Say the three key facts about Canada's government, then explain each in one sentence.",
        checklist: [
          "Federal state, parliamentary democracy, constitutional monarchy",
          "Federal state: federal, provincial, territorial and municipal governments",
          "Parliamentary democracy: the people elect members to the House of Commons and the legislatures",
          "Constitutional monarchy: a hereditary Sovereign who reigns according to the Constitution",
        ],
        probe: "Who is the head of state, and who is the head of government?",
      },
      test: [
        {
          id: "gv-001",
          biteId: "government.three-key-facts.1",
          kind: "choice",
          prompt: "What are the three key facts about Canada's system of government?",
          options: [
            "A federal state, a parliamentary democracy and a constitutional monarchy",
            "A republic, a parliamentary democracy and a unitary state",
            "A monarchy, a federation and a direct democracy",
            "A colonial state, a federal system and a federation",
          ],
          correctIndex: 0,
          rationale:
            "Canada is a federal state, a parliamentary democracy and a constitutional monarchy.",
          evidence:
            "our country is a federal state, a parliamentary democracy and a constitutional monarchy",
        },
        {
          id: "gv-002",
          biteId: "government.three-key-facts.2",
          kind: "choice",
          prompt: "What are the levels of government in Canada?",
          options: [
            "Provincial, municipal, district and territorial",
            "Federal, provincial, territorial and municipal",
            "Federal, regional, city and village",
            "Federal, state, county and municipal",
          ],
          correctIndex: 1,
          rationale:
            "There are four: federal, provincial, territorial and municipal. Canada has no state or county governments.",
          evidence:
            "There are federal, provincial, territorial and municipal governments in Canada.",
        },
        {
          id: "gv-003",
          biteId: "government.three-key-facts.4",
          kind: "truefalse",
          prompt: "Canada's Head of State is elected.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "The Head of State is a hereditary Sovereign, a King or Queen.",
          evidence:
            "Canada's Head of State is a hereditary Sovereign (Queen or King), who reigns in accordance with the Constitution",
        },
        {
          id: "gv-004",
          biteId: "government.three-key-facts.5",
          kind: "truefalse",
          prompt: "The Prime Minister is the head of government and runs the country.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "The Sovereign is head of state, and the Prime Minister is head of government.",
          evidence:
            "the head of government - the Prime Minister, who actually directs the governing of the country",
        },
        {
          id: "gv-005",
          biteId: "government.three-key-facts.3",
          kind: "choice",
          prompt: "What happens in Canada's parliamentary democracy?",
          options: [
            "Judges review each bill before it can become law",
            "The Prime Minister is chosen directly by the people",
            "The people elect members to the House of Commons",
            "Citizens vote on every new law in a public meeting",
          ],
          correctIndex: 2,
          rationale:
            "The people elect members to the House of Commons and to the provincial and territorial legislatures.",
          evidence:
            "the people elect members to the House of Commons in Ottawa and to the provincial and territorial legislatures",
        },
      ],
    },
    {
      id: "government.federalism",
      moduleId: "government",
      title: "Federalism: who does what",
      summary:
        "The 1867 division of powers, federal and provincial lists, shared areas, and the territories.",
      minutes: 6,
      source: chapterUrl("government"),
      bites: [
        {
          id: "government.federalism.1",
          title: "1867: the division of powers",
          body: "The British North America Act of 1867 set out what the federal and provincial governments are each responsible for. That law is now called the Constitution Act, 1867. The test may use either name.",
          takeaway:
            "The British North America Act (now the Constitution Act, 1867) divided federal and provincial powers.",
          evidence:
            "The responsibilities of the federal and provincial governments were defined in 1867 in the British North America Act, now known as the Constitution Act, 1867",
        },
        {
          id: "government.federalism.2",
          title: "The federal list",
          body: "The federal government handles matters of national and international concern: defence, foreign policy, trade and communications between provinces, currency, navigation, criminal law and citizenship.",
          takeaway: "Federal: defence, foreign policy, currency, criminal law, citizenship.",
          evidence:
            "These include defence, foreign policy, interprovincial trade and communications, currency, navigation, criminal law and citizenship",
        },
        {
          id: "government.federalism.3",
          title: "The provincial list",
          body: "The provinces are responsible for municipal government, education, health, natural resources, property and civil rights, and highways. Cities and towns are created by the provinces, not by Ottawa.",
          takeaway:
            "Provincial: municipal government, education, health, natural resources, property and civil rights, highways.",
          evidence:
            "The provinces are responsible for municipal government, education, health, natural resources, property and civil rights, and highways",
        },
        {
          id: "government.federalism.4",
          title: "Shared jurisdiction",
          body: "Some areas are shared. The federal government and the provinces share responsibility for agriculture and immigration. The guide's table of elected officials also lists the environment as shared.",
          takeaway: "Agriculture and immigration are shared between Ottawa and the provinces.",
          evidence: "share jurisdiction over agriculture and immigration",
        },
        {
          id: "government.federalism.5",
          title: "Why federalism",
          body: "Federalism lets each province adopt policies suited to its own people, and gives provinces room to try new ideas.",
          takeaway: "Federalism lets provinces tailor policies to their people and try new ideas.",
          evidence:
            "Federalism allows different provinces to adopt policies tailored to their own populations",
        },
        {
          id: "government.federalism.6",
          title: "Provincial assemblies and the territories",
          body: "Every province has its own elected Legislative Assembly, like the House of Commons in Ottawa. The three northern territories have small populations and are not provinces, but their governments and assemblies do many of the same things.",
          takeaway:
            "Each province has an elected Legislative Assembly. The territories are not provinces.",
          evidence:
            "The three northern territories, which have small populations, do not have the status of provinces, but their governments and assemblies carry out many of the same functions",
        },
      ],
      teach: {
        prompt:
          "Without looking, name three federal responsibilities, three provincial ones, and the two shared areas.",
        checklist: [
          "Federal: defence, foreign policy, currency, criminal law, citizenship, navigation",
          "Provincial: education, health, natural resources, highways, municipal government, property and civil rights",
          "Shared: agriculture and immigration",
          "The split was set in 1867 by the British North America Act",
        ],
        probe: "Who is responsible for municipal government: Ottawa or the provinces?",
      },
      test: [
        {
          id: "gv-006",
          biteId: "government.federalism.1",
          kind: "choice",
          prompt: "Which law set out federal and provincial responsibilities in 1867?",
          options: [
            "The Statute of Westminster",
            "The Charter of Rights and Freedoms",
            "The Constitution Act, 1982",
            "The British North America Act",
          ],
          correctIndex: 3,
          rationale:
            "The British North America Act of 1867, now called the Constitution Act, 1867.",
          evidence:
            "The responsibilities of the federal and provincial governments were defined in 1867 in the British North America Act, now known as the Constitution Act, 1867",
        },
        {
          id: "gv-007",
          biteId: "government.federalism.4",
          kind: "choice",
          prompt: "Which two areas do the federal government and the provinces share?",
          options: [
            "Agriculture and immigration",
            "Highways and navigation",
            "Education and health",
            "Currency and citizenship",
          ],
          correctIndex: 0,
          rationale:
            "Agriculture and immigration are shared. The other pairs belong to one level of government.",
          evidence:
            "The federal government and the provinces share jurisdiction over agriculture and immigration.",
        },
        {
          id: "gv-008",
          biteId: "government.federalism.2",
          kind: "choice",
          prompt: "Which level of government is responsible for criminal law and citizenship?",
          options: ["State", "Federal", "Provincial", "Municipal"],
          correctIndex: 1,
          rationale: "Criminal law and citizenship are federal responsibilities.",
          evidence:
            "These include defence, foreign policy, interprovincial trade and communications, currency, navigation, criminal law and citizenship",
        },
        {
          id: "gv-009",
          biteId: "government.federalism.3",
          kind: "choice",
          prompt: "Which of these is a provincial responsibility?",
          options: ["Foreign policy", "Currency", "Health care", "Defence"],
          correctIndex: 2,
          rationale:
            "Health is provincial, with education, natural resources and highways. The others are federal.",
          evidence:
            "The provinces are responsible for municipal government, education, health, natural resources, property and civil rights, and highways",
        },
        {
          id: "gv-010",
          biteId: "government.federalism.6",
          kind: "choice",
          prompt: "What does every province have that is like the House of Commons in Ottawa?",
          options: [
            "A Senate",
            "A territorial council",
            "A federal delegation",
            "A Legislative Assembly",
          ],
          correctIndex: 3,
          rationale: "Every province has its own elected Legislative Assembly.",
          evidence:
            "Every province has its own elected Legislative Assembly, like the House of Commons in Ottawa.",
        },
        {
          id: "gv-011",
          biteId: "government.federalism.5",
          kind: "choice",
          prompt: "What is one benefit of federalism?",
          options: [
            "It lets provinces tailor policies to their own populations and try new ideas",
            "It gives the federal government control of provincial budgets",
            "It makes the territories equal to the provinces",
            "It removes municipal governments from provincial authority",
          ],
          correctIndex: 0,
          rationale:
            "Federalism lets provinces adopt policies suited to their own people and try new ideas.",
          evidence:
            "Federalism allows different provinces to adopt policies tailored to their own populations",
        },
        {
          id: "gv-012",
          biteId: "government.federalism.6",
          kind: "truefalse",
          prompt: "The three northern territories have the same status as provinces.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale:
            "The territories are not provinces, although their governments do many of the same things.",
          evidence:
            "do not have the status of provinces, but their governments and assemblies carry out many of the same functions",
        },
      ],
    },
    {
      id: "government.parliament-and-legislation",
      moduleId: "government",
      title: "How Parliament works",
      summary:
        "What elected representatives do, the confidence of the House, and the three parts of Parliament.",
      minutes: 5,
      source: chapterUrl("government"),
      bites: [
        {
          id: "government.parliament-and-legislation.1",
          title: "What elected representatives do",
          body: "Members elected to the House of Commons and to the provincial and territorial legislatures have three jobs: pass laws, approve and monitor government spending, and keep the government accountable.",
          takeaway:
            "Elected representatives pass laws, approve spending, and hold the government to account.",
          evidence:
            "These representatives are responsible for passing laws, approving and monitoring expenditures, and keeping the government accountable.",
        },
        {
          id: "government.parliament-and-legislation.2",
          title: "The confidence of the House",
          body: "Cabinet ministers answer to the elected representatives. They must keep the confidence of the House, and if they lose a non-confidence vote, they must resign.",
          takeaway: "Lose a non-confidence vote, and the Cabinet must resign.",
          evidence:
            'they must retain the "confidence of the House" and have to resign if they are defeated in a non-confidence vote',
        },
        {
          id: "government.parliament-and-legislation.3",
          title: "Parliament and its members",
          body: "Parliament has three parts: the Sovereign (King or Queen), the Senate and the House of Commons. The Prime Minister chooses the Cabinet ministers. Members of the House of Commons are elected by the people, traditionally every four years. Senators are appointed by the Governor General on the Prime Minister's advice and serve until age 75.",
          takeaway:
            "Parliament is the Sovereign, the Senate and the House of Commons. MPs are elected, Senators appointed.",
          evidence:
            "Parliament has three parts: the Sovereign (Queen or King), the Senate and the House of Commons.",
        },
        {
          id: "government.parliament-and-legislation.5",
          title: "Taking part",
          body: "Democracy gives citizens the right and the responsibility to take part in decisions that affect them. Canadians 18 and older should vote in federal, provincial or territorial, and municipal elections.",
          takeaway: "Canadians 18 and older should vote at every level of government.",
          evidence:
            "It is important for Canadians aged 18 or more to participate in their democracy by voting in federal, provincial or territorial and municipal elections.",
        },
      ],
      teach: {
        prompt:
          "Name the three parts of Parliament, and say what elected representatives are responsible for.",
        checklist: [
          "Pass laws, approve and monitor spending, keep the government accountable",
          "The Sovereign, the Senate and the House of Commons",
          "MPs are elected; Senators are appointed and serve until 75",
          "Cabinet ministers must keep the confidence of the House or resign",
        ],
        probe: "Who chooses Cabinet ministers, and who appoints Senators?",
      },
      test: [
        {
          id: "gv-013",
          biteId: "government.parliament-and-legislation.1",
          kind: "choice",
          prompt: "Which of these is a job of elected representatives?",
          options: [
            "Granting royal assent",
            "Approving and monitoring expenditures",
            "Commanding the armed forces",
            "Appointing Senators",
          ],
          correctIndex: 1,
          rationale:
            "They pass laws, approve and monitor spending, and keep the government accountable.",
          evidence:
            "These representatives are responsible for passing laws, approving and monitoring expenditures, and keeping the government accountable.",
        },
        {
          id: "gv-014",
          biteId: "government.parliament-and-legislation.3",
          kind: "choice",
          prompt: "Which of these is NOT one of the three parts of Parliament?",
          options: ["The House of Commons", "The Sovereign", "The Supreme Court", "The Senate"],
          correctIndex: 2,
          rationale:
            "Parliament is the Sovereign, the Senate and the House of Commons. The courts are separate.",
          evidence:
            "Parliament has three parts: the Sovereign (Queen or King), the Senate and the House of Commons.",
        },
        {
          id: "gv-015",
          biteId: "government.parliament-and-legislation.2",
          kind: "truefalse",
          prompt: "Cabinet ministers who lose a non-confidence vote have to resign.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "Ministers must keep the confidence of the House, and resign if they lose a non-confidence vote.",
          evidence:
            'they must retain the "confidence of the House" and have to resign if they are defeated in a non-confidence vote',
        },
        {
          id: "gv-016",
          biteId: "government.parliament-and-legislation.3",
          kind: "choice",
          prompt: "Who chooses the federal Cabinet ministers?",
          options: [
            "The Leader of the Opposition",
            "The Senate",
            "The Governor General's office",
            "The Prime Minister",
          ],
          correctIndex: 3,
          rationale: "The Prime Minister chooses the Cabinet ministers.",
          evidence:
            "the Prime Minister selects the Cabinet ministers and is responsible for the operations and policy of the government",
        },
        {
          id: "gv-017",
          biteId: "government.parliament-and-legislation.3",
          kind: "choice",
          prompt: "How are Senators chosen, and how long do they serve?",
          options: [
            "Appointed by the Governor General on the advice of the Prime Minister; they serve until age 75",
            "Elected by voters in each province; they serve for a fixed six-year term",
            "Appointed by the Sovereign on the advice of a Premier; they serve until age 65",
            "Named by the Senate itself; they serve for life",
          ],
          correctIndex: 0,
          rationale:
            "Senators are appointed by the Governor General on the advice of the head of government, and serve until age 75.",
          evidence:
            "Senators are appointed by the Governor General on the advice of the Prime Minister and serve until age 75.",
        },
        {
          id: "gv-021",
          biteId: "government.parliament-and-legislation.5",
          kind: "choice",
          prompt: "From what age should Canadians vote?",
          options: ["16 or more", "18 or more", "21 or more", "25 or more"],
          correctIndex: 1,
          rationale:
            "Canadians 18 and older should vote in federal, provincial or territorial, and municipal elections.",
          evidence:
            "It is important for Canadians aged 18 or more to participate in their democracy by voting",
        },
        {
          id: "gv-031",
          biteId: "government.parliament-and-legislation.3",
          kind: "choice",
          prompt: "How often are members of the House of Commons elected?",
          options: [
            "Once every ten years",
            "Every year",
            "About every four years",
            "About every two years",
          ],
          correctIndex: 2,
          rationale: "Members of the House of Commons are elected traditionally every four years.",
          evidence:
            "made up of members of Parliament elected by the people, traditionally every four years",
          caveat:
            "The guide says 'traditionally'. General elections have not always come every four years; answer from the guide and confirm the current rule.",
        },
      ],
    },
    {
      id: "government.making-laws",
      moduleId: "government",
      title: "How a bill becomes law",
      summary: "What a bill is, the seven steps in order, and royal assent.",
      minutes: 5,
      source: chapterUrl("government"),
      bites: [
        {
          id: "government.making-laws.1",
          title: "What a bill is",
          body: "A bill is a proposed law. The House of Commons and the Senate both review it. No bill becomes law until both have passed it and it has received royal assent.",
          takeaway: "A bill needs the House of Commons, the Senate, and royal assent.",
          evidence:
            "Both the House of Commons and the Senate consider and review bills (proposals for new laws).",
        },
        {
          id: "government.making-laws.2",
          title: "Steps 1 to 3: print, debate, study",
          body: "Step 1, First Reading: the bill is considered read for the first time and printed. Step 2, Second Reading: members debate the bill's principle. Step 3, Committee Stage: a committee studies the bill clause by clause.",
          takeaway:
            "First Reading prints it, Second Reading debates it, the committee studies it clause by clause.",
          evidence: "STEP 2 Second Reading - Members debate the bill's principle.",
        },
        {
          id: "government.making-laws.3",
          title: "Steps 4 to 6: amendments, the vote, the Senate",
          body: "Step 4, Report Stage: members can make further amendments. Step 5, Third Reading: members debate and vote on the bill. Step 6: the bill goes to the Senate, which follows a similar process.",
          takeaway:
            "Report Stage for amendments, Third Reading for the vote, then the Senate does it all again.",
          evidence: "STEP 5 Third Reading - Members debate and vote on the bill.",
        },
        {
          id: "government.making-laws.4",
          title: "Step 7: Royal Assent",
          body: "Step 7, Royal Assent, is the last step. Once both Houses have passed the bill, the Governor General grants royal assent on behalf of the Sovereign. Only then is it law.",
          takeaway: "Royal Assent, granted by the Governor General, is the final step.",
          evidence:
            "STEP 7 Royal Assent - The bill receives royal assent after being passed by both Houses.",
        },
      ],
      teach: {
        prompt: "Say the seven steps of passing a law, in order, and what happens at each.",
        checklist: [
          "First Reading: the bill is printed",
          "Second Reading: members debate the principle",
          "Committee Stage: study clause by clause; Report Stage: further amendments",
          "Third Reading: debate and vote; then the Senate; then Royal Assent",
        ],
        probe: "Can a bill become law if only the House of Commons has passed it?",
      },
      test: [
        {
          id: "gv-032",
          biteId: "government.making-laws.1",
          kind: "choice",
          prompt: "Which two bodies must pass a bill before it can become law?",
          options: [
            "The Cabinet and the Senate",
            "The House of Commons and the provincial assemblies",
            "The Governor General and the Cabinet",
            "The House of Commons and the Senate",
          ],
          correctIndex: 3,
          rationale: "Both the House of Commons and the Senate must pass a bill.",
          evidence:
            "Both the House of Commons and the Senate consider and review bills (proposals for new laws).",
        },
        {
          id: "gv-018",
          biteId: "government.making-laws.2",
          kind: "choice",
          prompt: "What happens at the Committee Stage of a bill?",
          options: [
            "Committee members study the bill clause by clause",
            "The bill is printed at First Reading",
            "The committee debates the bill's principle",
            "The Senate gives final approval",
          ],
          correctIndex: 0,
          rationale:
            "At the Committee Stage, members study the bill clause by clause. The principle is debated earlier, at Second Reading.",
          evidence: "STEP 3 Committee Stage - Committee members study the bill clause by clause.",
        },
        {
          id: "gv-033",
          biteId: "government.making-laws.2",
          kind: "choice",
          prompt: "What happens at the Second Reading of a bill?",
          options: [
            "The Governor General approves it",
            "Members debate the principle behind the bill",
            "Committee members study each part of it",
            "The bill is printed for members",
          ],
          correctIndex: 1,
          rationale:
            "At Second Reading, members debate the bill's principle. The vote comes at Third Reading.",
          evidence: "STEP 2 Second Reading - Members debate the bill's principle.",
        },
        {
          id: "gv-034",
          biteId: "government.making-laws.3",
          kind: "choice",
          prompt: "At the Report Stage, what can members do with a bill?",
          options: [
            "Vote on it for the last time",
            "Withdraw it and start a new one",
            "Propose other changes to it",
            "Send it straight to the provinces",
          ],
          correctIndex: 2,
          rationale:
            "At the Report Stage members can make further amendments. The final vote is at Third Reading.",
          evidence: "STEP 4 Report Stage - Members can make other amendments.",
        },
        {
          id: "gv-019",
          biteId: "government.making-laws.3",
          kind: "choice",
          prompt: "Which step comes right after the Third Reading?",
          options: ["Royal Assent", "Committee Stage", "Second Reading", "Senate"],
          correctIndex: 3,
          rationale:
            "After Third Reading the bill goes to the Senate. Royal Assent is the last step.",
          evidence: "STEP 6 Senate - The bill follows a similar process in the Senate.",
        },
        {
          id: "gv-020",
          biteId: "government.making-laws.1",
          kind: "truefalse",
          prompt: "A bill passed by the House of Commons alone is already law.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "A bill needs both the House and the Senate, plus royal assent.",
          evidence:
            "No bill can become law in Canada until it has been passed by both chambers and has received royal assent",
        },
      ],
    },
    {
      id: "government.crown-and-orders",
      moduleId: "government",
      title: "The Crown and the Governor General",
      summary: "The Sovereign's role, the Commonwealth, and the Governor General.",
      minutes: 5,
      source: chapterUrl("government"),
      bites: [
        {
          id: "government.crown-and-orders.1",
          title: "What the Sovereign does",
          body: "Canada's Head of State is a hereditary Sovereign, today King Charles III. The Sovereign is part of Parliament and plays a non-partisan role as the focus of citizenship and allegiance, most visibly during royal visits. The Sovereign is a symbol of Canadian sovereignty, a guardian of constitutional freedoms, and a reflection of our history.",
          takeaway:
            "The Sovereign is a non-partisan symbol of Canadian sovereignty and a guardian of freedoms.",
          evidence:
            "The Sovereign is a part of Parliament, playing an important, non-partisan role as the focus of citizenship and allegiance, most visibly during royal visits to Canada.",
        },
        {
          id: "government.crown-and-orders.2",
          title: "Head of the Commonwealth",
          body: "The Royal Family's lifelong service encourages citizens to give their best to their country. As Head of the Commonwealth, the Sovereign links Canada to 53 other nations that work together on social, economic and cultural progress. Other constitutional monarchies include Denmark, Norway, Sweden, Australia, New Zealand, the Netherlands, Spain, Thailand, Japan, Jordan and Morocco.",
          takeaway: "As Head of the Commonwealth, the Sovereign links Canada to 53 other nations.",
          evidence:
            "As Head of the Commonwealth, the Sovereign links Canada to 53 other nations that cooperate to advance social, economic and cultural progress.",
        },
        {
          id: "government.crown-and-orders.3",
          title: "The Governor General",
          body: "In Canada the Sovereign is represented by the Governor General, appointed by the Sovereign on the Prime Minister's advice, usually for five years. The Governor General grants royal assent to bills on the Sovereign's behalf. In each province, the Sovereign is represented by a Lieutenant Governor.",
          takeaway:
            "The Governor General represents the Sovereign, usually for five years, on the Prime Minister's advice.",
          evidence:
            "appointed by the Sovereign on the advice of the Prime Minister, usually for five years",
        },
      ],
      teach: {
        prompt:
          "Explain the Sovereign's role in Canada. Then say how the Governor General is chosen and what they do with a bill.",
        checklist: [
          "The Sovereign is part of Parliament and a non-partisan focus of citizenship and allegiance",
          "A symbol of Canadian sovereignty and a guardian of constitutional freedoms",
          "The Governor General is appointed by the Sovereign on the Prime Minister's advice, usually for five years",
          "The Governor General grants royal assent on the Sovereign's behalf",
        ],
        probe:
          "As Head of the Commonwealth, how many other nations does the Sovereign link Canada to?",
      },
      test: [
        {
          id: "gv-022",
          biteId: "government.crown-and-orders.3",
          kind: "choice",
          prompt: "Who grants royal assent to a bill, and in whose name?",
          options: [
            "The Governor General, on behalf of the Sovereign",
            "The Sovereign in person, during a royal visit",
            "The Prime Minister, as head of government",
            "The Speaker of the House of Commons",
          ],
          correctIndex: 0,
          rationale:
            "The Governor General grants royal assent on behalf of the Sovereign. It is the last step in passing a law.",
          evidence:
            "has received royal assent, granted by the Governor General on behalf of the Sovereign.",
        },
        {
          id: "gv-023",
          biteId: "government.crown-and-orders.1",
          kind: "choice",
          prompt: "Which of these is the Sovereign's role?",
          options: [
            "Appointing members of the House of Commons",
            "Playing a non-partisan role as the focus of citizenship and allegiance",
            "Selecting the Cabinet ministers",
            "Directing the governing of the country",
          ],
          correctIndex: 1,
          rationale:
            "The Sovereign plays a non-partisan role as the focus of citizenship and allegiance. Running the government is the Prime Minister's job.",
          evidence:
            "playing an important, non-partisan role as the focus of citizenship and allegiance",
        },
        {
          id: "gv-024",
          biteId: "government.crown-and-orders.2",
          kind: "choice",
          prompt:
            "As Head of the Commonwealth, the Sovereign links Canada to how many other nations?",
          options: ["10", "53", "23", "75"],
          correctIndex: 1,
          rationale: "The guide gives 53 other nations.",
          evidence: "the Sovereign links Canada to 53 other nations",
          caveat:
            "The guide is from 2012 and the number of Commonwealth nations has changed since then. Keep the guide's figure for the test, but confirm the current count.",
        },
        {
          id: "gv-025",
          biteId: "government.crown-and-orders.2",
          kind: "choice",
          prompt: "Which of these countries is also a constitutional monarchy?",
          options: ["Belgium", "Ireland", "Norway", "The United States"],
          correctIndex: 2,
          rationale:
            "Norway is a constitutional monarchy, like Denmark, Sweden, Australia, New Zealand, the Netherlands, Spain, Thailand, Japan, Jordan and Morocco.",
          evidence:
            "Other constitutional monarchies include Denmark, Norway, Sweden, Australia, New Zealand",
        },
        {
          id: "gv-026",
          biteId: "government.crown-and-orders.3",
          kind: "choice",
          prompt: "How is the Governor General chosen?",
          options: [
            "Chosen by the Senate, on the advice of the Cabinet",
            "Voted in by Canadian citizens in a general election",
            "Appointed by the Chief Justice, with the Cabinet's approval",
            "Appointed by the Sovereign on the advice of the Prime Minister, usually for five years",
          ],
          correctIndex: 3,
          rationale:
            "The Sovereign appoints the Governor General on the Prime Minister's advice, usually for five years.",
          evidence:
            "appointed by the Sovereign on the advice of the Prime Minister, usually for five years",
          caveat:
            "The guide says the term is usually five years; actual terms can differ. Confirm the current practice, but answer from the guide.",
        },
        {
          id: "gv-036",
          biteId: "government.crown-and-orders.1",
          kind: "choice",
          prompt: "Who is Canada's Head of State?",
          options: [
            "The Prime Minister",
            "A hereditary Sovereign (Queen or King)",
            "The Governor General",
            "The Chief Justice of Canada",
          ],
          correctIndex: 1,
          rationale:
            "Canada's Head of State is a hereditary Sovereign. The Prime Minister is head of government, and the Governor General represents the Sovereign.",
          evidence: "Canada's Head of State is a hereditary Sovereign (Queen or King)",
          caveat: "The Sovereign today is King Charles III.",
        },
        {
          id: "gv-037",
          biteId: "government.crown-and-orders.3",
          kind: "choice",
          prompt: "Who represents the Sovereign in Canada?",
          options: [
            "The Speaker of the Senate",
            "The Prime Minister",
            "The Governor General",
            "The Lieutenant Governor",
          ],
          correctIndex: 2,
          rationale:
            "The Governor General represents the Sovereign in Canada. Lieutenant Governors do so in the provinces.",
          evidence: "The Sovereign is represented in Canada by the Governor General",
          caveat: "The Governor General today is Louise Arbour, installed June 8, 2026.",
        },
        {
          id: "gv-038",
          biteId: "government.crown-and-orders.3",
          kind: "choice",
          prompt: "Who represents the Sovereign in each of the ten provinces?",
          options: [
            "The Premier",
            "The Lieutenant Governor",
            "The Commissioner",
            "The Governor General",
          ],
          correctIndex: 1,
          rationale:
            "A Lieutenant Governor represents the Sovereign in each province. In the territories, a Commissioner represents the federal government.",
          evidence:
            "In each of the ten provinces, the Sovereign is represented by the Lieutenant Governor",
        },
      ],
    },
    {
      id: "government.provinces-and-territories",
      moduleId: "government",
      title: "Provinces and territories",
      summary:
        "Lieutenant Governors, provincial legislatures, the three branches, and what legislators are called.",
      minutes: 5,
      source: chapterUrl("government"),
      bites: [
        {
          id: "government.provinces-and-territories.1",
          title: "The Lieutenant Governor",
          body: "In each province, the Sovereign is represented by a Lieutenant Governor, appointed by the Governor General on the Prime Minister's advice, normally for five years. A provincial legislature is made up of the Lieutenant Governor and the elected Assembly.",
          takeaway:
            "A Lieutenant Governor and the elected Assembly together form a provincial legislature.",
          evidence:
            "In each of the ten provinces, the Sovereign is represented by the Lieutenant Governor, who is appointed by the Governor General on the advice of the Prime Minister, also normally for five years.",
        },
        {
          id: "government.provinces-and-territories.2",
          title: "Three branches of government",
          body: "There are three branches of government: Executive, Legislative and Judicial. They work together, sometimes in creative tension, and that balance helps protect Canadians' rights and freedoms.",
          takeaway: "Three branches: Executive, Legislative and Judicial.",
          evidence:
            "The interplay between the three branches of government - the Executive, Legislative and Judicial - which work together but also sometimes in creative tension, helps to secure the rights and freedoms of Canadians.",
        },
        {
          id: "government.provinces-and-territories.3",
          title: "Provincial titles",
          body: "Each province and territory has an elected legislature that makes its laws. Depending on where you live, its members are called MLAs (Legislative Assembly), MNAs (National Assembly), MPPs (Provincial Parliament) or MHAs (House of Assembly). The Premier's role in a province is like the Prime Minister's in Canada, and the Lieutenant Governor's is like the Governor General's. In the territories, a Commissioner represents the federal government in a ceremonial role.",
          takeaway:
            "Provincial legislators are MLAs, MNAs, MPPs or MHAs. A Premier leads each province.",
          evidence:
            "members of the Legislative Assembly (MLAs), members of the National Assembly (MNAs), members of the Provincial Parliament (MPPs) or members of the House of Assembly (MHAs), depending on the province or territory",
        },
      ],
      teach: {
        prompt:
          "Explain the difference between the Governor General and a Lieutenant Governor, then name the four titles for provincial legislators.",
        checklist: [
          "The Governor General represents the Sovereign in Canada, appointed by the Sovereign on the Prime Minister's advice",
          "A Lieutenant Governor represents the Sovereign in a province, appointed by the Governor General on the Prime Minister's advice",
          "Both usually serve five years",
          "MLAs, MNAs, MPPs, MHAs; the Premier leads a province; a Commissioner represents Ottawa in a territory",
        ],
        probe:
          "Which is a branch of government, and which is a level of government: the judiciary, or municipalities?",
      },
      test: [
        {
          id: "gv-027",
          biteId: "government.provinces-and-territories.1",
          kind: "truefalse",
          prompt: "A Lieutenant Governor is appointed on the advice of the provincial Premier.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale:
            "The Governor General appoints the Lieutenant Governor on the advice of the Prime Minister, not the Premier.",
          evidence:
            "appointed by the Governor General on the advice of the Prime Minister, also normally for five years",
        },
        {
          id: "gv-028",
          biteId: "government.provinces-and-territories.3",
          kind: "choice",
          prompt: "Which of these is NOT a title for members of a provincial legislature?",
          options: [
            "Members of the Upper Chamber (MUCs)",
            "Members of the House of Assembly (MHAs)",
            "Members of the National Assembly (MNAs)",
            "Members of the Provincial Parliament (MPPs)",
          ],
          correctIndex: 0,
          rationale: "The titles are MLA, MNA, MPP and MHA. There is no Upper Chamber title.",
          evidence:
            "members of the Legislative Assembly (MLAs), members of the National Assembly (MNAs), members of the Provincial Parliament (MPPs) or members of the House of Assembly (MHAs)",
        },
        {
          id: "gv-029",
          biteId: "government.provinces-and-territories.2",
          kind: "choice",
          prompt: "What are the three branches of government?",
          options: [
            "The Federal, Provincial and Municipal",
            "The Executive, Legislative and Judicial",
            "The Senate, Commons and Courts",
            "The Crown, Cabinet and Parliament",
          ],
          correctIndex: 1,
          rationale:
            "The Executive, Legislative and Judicial. Federal, provincial and municipal are levels of government, not branches.",
          evidence: "the three branches of government - the Executive, Legislative and Judicial",
        },
        {
          id: "gv-030",
          biteId: "government.provinces-and-territories.3",
          kind: "truefalse",
          prompt: "In the territories, the Commissioner represents the federal government.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "In the territories, the Commissioner represents the federal government in a ceremonial role.",
          evidence:
            "In the three territories, the Commissioner represents the federal government and plays a ceremonial role.",
        },
        {
          id: "gv-035",
          biteId: "government.provinces-and-territories.1",
          kind: "choice",
          prompt: "What makes up a provincial legislature?",
          options: [
            "The Premier and the Cabinet",
            "The Sovereign and the judges",
            "The Lieutenant Governor and the elected Assembly",
            "The Governor General and the Senate",
          ],
          correctIndex: 2,
          rationale:
            "A provincial legislature is the Lieutenant Governor and the elected Assembly.",
          evidence:
            "Provincial legislatures comprise the Lieutenant Governor and the elected Assembly.",
        },
      ],
    },
  ],
};

export default module;
