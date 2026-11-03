import type { Module } from "../types.ts";
import { chapterUrl } from "../sources.ts";

/**
 * Module 7: Federal Elections.
 *
 * Every claim here is quoted from data/corpus/federal-elections.txt, the guide's
 * own chapter. The 2012 facts that have visibly aged (the number of ridings, the
 * parties sitting in the House, the gender of the Sovereign) keep the guide's
 * answer and carry a `caveat` telling the learner to confirm the live value.
 */
const module: Module = {
  id: "elections",
  order: 7,
  title: "Elections",
  guideChapter: "Federal Elections",
  corpus: ["federal-elections", "study-questions"],
  summary: "How a vote in your riding becomes a government, and who does what at each level.",
  mission:
    "Explain how a riding's vote leads to a majority or minority government, and name what each level of government handles.",
  icon: "vote",
  tags: ["House of Commons", "Voting", "Levels of government"],
  source: chapterUrl("elections"),
  testSize: 10,
  sessions: [
    {
      id: "elections.ridings-and-mps",
      moduleId: "elections",
      title: "Ridings and MPs",
      summary: "Electoral districts, who may run, the election date, and how a winner is decided.",
      minutes: 6,
      source: chapterUrl("elections"),
      bites: [
        {
          id: "elections.ridings-and-mps.1",
          title: "One riding, one MP",
          body: "Canada is divided into electoral districts, also called ridings or constituencies. Each one is a geographic area that elects one member of Parliament (MP) to represent it, and all Canadians, in the House of Commons.",
          takeaway: "Each riding elects one MP to the House of Commons.",
          evidence:
            "An electoral district is a geographical area represented by a member of Parliament (MP).",
        },
        {
          id: "elections.ridings-and-mps.2",
          title: "MP means member of Parliament",
          body: "The people elected to the House of Commons are called members of Parliament, or MPs. At each election, voters may re-elect them or choose new ones.",
          takeaway: "Members of the House of Commons are called members of Parliament, or MPs.",
          evidence:
            "Members of the House of Commons are also known as members of Parliament or MPs.",
        },
        {
          id: "elections.ridings-and-mps.3",
          title: "The election date",
          body: "By law, federal elections are held on the third Monday in October, every four years after the last general election.",
          takeaway:
            "Federal elections: the third Monday in October, four years after the last one.",
          evidence:
            "federal elections must be held on the third Monday in October every four years following the most recent general election",
        },
        {
          id: "elections.ridings-and-mps.4",
          title: "An earlier election",
          body: "The Prime Minister may ask the Governor General to call an election before the fixed date. This usually happens when a majority of MPs vote against a major government decision.",
          takeaway: "The Prime Minister may ask the Governor General to call an earlier election.",
          evidence: "The Prime Minister may ask the Governor General to call an earlier election.",
        },
        {
          id: "elections.ridings-and-mps.5",
          title: "Who may run",
          body: "Any Canadian citizen 18 or older may run in a federal election. People who run for office are called candidates, and a riding can have many of them.",
          takeaway: "Any citizen 18 or older may run. People who run are called candidates.",
          evidence:
            "Canadian citizens who are 18 years old or older may run in a federal election.",
        },
        {
          id: "elections.ridings-and-mps.6",
          title: "The most votes wins the seat",
          body: "Voters in each riding choose the candidate and party they prefer. The candidate with the most votes becomes the MP. They do not need more than half.",
          takeaway: "The candidate with the most votes wins the riding.",
          evidence:
            "The candidate who receives the most votes becomes the MP for that electoral district.",
        },
      ],
      teach: {
        prompt:
          "Explain how a federal election fills the House of Commons, from the map to the count.",
        checklist: [
          "Canada is divided into electoral districts, also called ridings or constituencies",
          "Each district elects one MP to the House of Commons",
          "Elections are on the third Monday in October every four years, unless the Prime Minister asks for an earlier one",
          "The candidate with the most votes wins",
        ],
        probe: "Can a candidate win a riding with less than half the votes?",
      },
      test: [
        {
          id: "el-001",
          biteId: "elections.ridings-and-mps.1",
          kind: "choice",
          prompt: "What is another name for a federal electoral district?",
          options: ["A riding", "A precinct", "A borough", "A township"],
          correctIndex: 0,
          rationale: "Electoral districts are also called ridings or constituencies.",
          evidence:
            "Canada is divided into 308 electoral districts, also known as ridings or constituencies.",
        },
        {
          id: "el-002",
          biteId: "elections.ridings-and-mps.1",
          kind: "choice",
          prompt: "How many electoral districts are there in Canada?",
          options: ["105", "202", "308", "415"],
          correctIndex: 2,
          rationale: "The 2012 guide gives 308 electoral districts, each electing one MP.",
          evidence:
            "Canada is divided into 308 electoral districts, also known as ridings or constituencies.",
          caveat:
            "Ridings are redrawn after each census, and there have been 343 since the 2025 election. On the test, answer with the guide's 308.",
        },
        {
          id: "el-003",
          biteId: "elections.ridings-and-mps.2",
          kind: "choice",
          prompt: "Members of the House of Commons are also known as what?",
          options: [
            "Members of the Senate",
            "members of Parliament",
            "Crown appointees",
            "Provincial delegates",
          ],
          correctIndex: 1,
          rationale: "Members of the House of Commons are called members of Parliament, or MPs.",
          evidence:
            "Members of the House of Commons are also known as members of Parliament or MPs.",
        },
        {
          id: "el-004",
          biteId: "elections.ridings-and-mps.3",
          kind: "truefalse",
          prompt: "Federal elections are held on the third Monday in October, every four years.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale: "That date is set by a law passed by Parliament.",
          evidence:
            "Under legislation passed by Parliament, federal elections must be held on the third Monday in October every four years",
        },
        {
          id: "el-005",
          biteId: "elections.ridings-and-mps.4",
          kind: "choice",
          prompt: "Who may ask the Governor General to call an earlier election?",
          options: [
            "The Speaker of the House of Commons",
            "A majority of voters by petition",
            "The Prime Minister",
            "The Chief Justice of Canada",
          ],
          correctIndex: 2,
          rationale:
            "The Prime Minister may ask the Governor General to call an election before the fixed date.",
          evidence: "The Prime Minister may ask the Governor General to call an earlier election.",
        },
        {
          id: "el-006",
          biteId: "elections.ridings-and-mps.5",
          kind: "choice",
          prompt: "Who may run as a candidate in a federal election?",
          options: [
            "Any permanent resident who has lived in Canada for a year",
            "Only people born in Canada",
            "Only members of a registered party",
            "Canadian citizens who are 18 years old or older",
          ],
          correctIndex: 3,
          rationale:
            "Any Canadian citizen 18 or older may run. Where you were born does not matter.",
          evidence:
            "Canadian citizens who are 18 years old or older may run in a federal election.",
        },
        {
          id: "el-007",
          biteId: "elections.ridings-and-mps.6",
          kind: "choice",
          prompt: "How is the MP for an electoral district chosen?",
          options: [
            "The candidate who receives the most votes becomes the MP",
            "The Governor General appoints the most qualified candidate",
            "Every party gets a seat in proportion to its votes",
            "The party leader names the local representative",
          ],
          correctIndex: 0,
          rationale: "The candidate with the most votes becomes the MP.",
          evidence:
            "The candidate who receives the most votes becomes the MP for that electoral district.",
        },
        {
          id: "el-040",
          biteId: "elections.ridings-and-mps.2",
          kind: "choice",
          prompt: "How are Members of Parliament chosen?",
          options: [
            "They are chosen by the provincial premiers",
            "They are elected by voters in their local constituency (riding)",
            "They are elected by landowners and police chiefs",
            "They are appointed by the United Nations",
          ],
          correctIndex: 1,
          rationale:
            "This question comes from the guide's own study questions. Voters in each riding elect one member of the House of Commons.",
          evidence: "They are elected by voters in their local constituency (riding).",
          official: true,
        },
      ],
    },
    {
      id: "elections.who-can-vote",
      moduleId: "elections",
      title: "Who can vote",
      summary:
        "The three requirements, Elections Canada, the National Register of Electors, and the voter information card.",
      minutes: 6,
      source: chapterUrl("elections"),
      bites: [
        {
          id: "elections.who-can-vote.1",
          title: "Three requirements",
          body: "Voting is a privilege of citizenship. To vote in a federal election or referendum, you must be a Canadian citizen, be at least 18 on voting day, and be on the voters' list.",
          takeaway: "To vote federally: be a citizen, be 18 on voting day, be on the voters' list.",
          evidence:
            "You are eligible to vote in a federal election or cast a ballot in a federal referendum if you are: - a Canadian citizen; and - at least 18 years old on voting day; and - on the voters' list.",
        },
        {
          id: "elections.who-can-vote.2",
          title: "Elections Canada and the National Register of Electors",
          body: "The voters' lists come from the National Register of Electors, kept by Elections Canada, a neutral agency of Parliament. The register is a permanent database of Canadian citizens 18 or older who are qualified to vote.",
          takeaway:
            "Elections Canada, a neutral agency of Parliament, keeps the National Register of Electors.",
          evidence:
            "The voters' lists used during federal elections and referendums are produced from the National Register of Electors by a neutral agency of Parliament called Elections Canada.",
        },
        {
          id: "elections.who-can-vote.3",
          title: "The voter information card",
          body: "Once an election is called, Elections Canada mails a voter information card to everyone in the National Register of Electors. It tells you when and where to vote, and the number to call if you need an interpreter or other special services.",
          takeaway:
            "The voter information card says when and where to vote, and how to get special services.",
          evidence:
            "The card lists when and where you vote and the number to call if you require an interpreter or other special services.",
        },
        {
          id: "elections.who-can-vote.4",
          title: "Not on the list?",
          body: "Even if you are not in the National Register of Electors, or never got a card, you can be added to the voters' list at any time, including on election day.",
          takeaway: "You can be added to the voters' list at any time, even on election day.",
          evidence:
            "you can still be added to the voters' list at any time, including on election day",
        },
        {
          id: "elections.who-can-vote.5",
          title: "Where to vote",
          body: "Whether you vote on election day or at an advance poll, go to the polling station listed on your voter information card.",
          takeaway: "Vote at the polling station on your voter information card.",
          evidence:
            "To vote either on election day or at advance polls, go to the polling station listed on your voter information card.",
        },
      ],
      teach: {
        prompt:
          "Name the three things you need to vote federally, and explain what the voter information card is for.",
        checklist: [
          "Canadian citizen, 18 or older on voting day, on the voters' list",
          "Elections Canada makes the lists from the National Register of Electors",
          "The card says when and where to vote, and the number to call for an interpreter or other help",
          "You can be added to the list even on election day",
        ],
        probe:
          "A friend who is a permanent resident wants to vote in the federal election. What do you tell them?",
      },
      test: [
        {
          id: "el-008",
          biteId: "elections.who-can-vote.1",
          kind: "truefalse",
          prompt: "The right to vote is one of the privileges of Canadian citizenship.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale: "Voting is a privilege of citizenship.",
          evidence: "One of the privileges of Canadian citizenship is the right to vote.",
        },
        {
          id: "el-009",
          biteId: "elections.who-can-vote.1",
          kind: "choice",
          prompt: "Which of these is NOT required to vote in a federal election?",
          options: [
            "Being at least 18 years old on voting day",
            "Being on the voters' list for the federal election",
            "Having voted in the previous federal election",
            "Being a Canadian citizen",
          ],
          correctIndex: 2,
          rationale:
            "You need only citizenship, age 18 on voting day, and a place on the voters' list.",
          evidence:
            "You are eligible to vote in a federal election or cast a ballot in a federal referendum if you are: - a Canadian citizen; and - at least 18 years old on voting day; and - on the voters' list.",
        },
        {
          id: "el-010",
          biteId: "elections.who-can-vote.1",
          kind: "choice",
          prompt: "Besides a general election, what else can an eligible voter cast a ballot in?",
          options: [
            "A provincial by-election",
            "A municipal plebiscite",
            "A school board vote",
            "A federal referendum",
          ],
          correctIndex: 3,
          rationale: "The same rules apply to federal elections and federal referendums.",
          evidence:
            "You are eligible to vote in a federal election or cast a ballot in a federal referendum",
        },
        {
          id: "el-011",
          biteId: "elections.who-can-vote.2",
          kind: "choice",
          prompt: "What is the National Register of Electors?",
          options: [
            "A permanent database of Canadian citizens 18 years of age or older who are qualified to vote",
            "A list of everyone living in Canada, including visitors",
            "A record of everyone who has voted in past elections",
            "A register kept separately by each province",
          ],
          correctIndex: 0,
          rationale:
            "It is a permanent database of citizens 18 or older who are qualified to vote.",
          evidence:
            "This is a permanent database of Canadian citizens 18 years of age or older who are qualified to vote in federal elections and referendums.",
        },
        {
          id: "el-012",
          biteId: "elections.who-can-vote.2",
          kind: "choice",
          prompt: "Which body produces the voters' lists for federal elections?",
          options: [
            "The Privy Council",
            "Elections Canada",
            "The Canadian Elections Commission",
            "The Premier's office",
          ],
          correctIndex: 1,
          rationale:
            "Elections Canada makes the voters' lists from the National Register of Electors.",
          evidence:
            "produced from the National Register of Electors by a neutral agency of Parliament called Elections Canada",
        },
        {
          id: "el-013",
          biteId: "elections.who-can-vote.3",
          kind: "choice",
          prompt: "Your voter information card gives a number to call if you need what?",
          options: [
            "A ride to the polling station",
            "A copy of the candidates' platform",
            "An interpreter or other special services",
            "A second voter information card",
          ],
          correctIndex: 2,
          rationale:
            "The card gives when and where to vote, and the number to call for an interpreter or other special services.",
          evidence:
            "The card lists when and where you vote and the number to call if you require an interpreter or other special services.",
        },
        {
          id: "el-014",
          biteId: "elections.who-can-vote.4",
          kind: "truefalse",
          prompt:
            "If you never received a voter information card, you cannot vote on election day.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "You can be added to the voters' list at any time, even on election day.",
          evidence:
            "Even if you choose not to be listed in the National Register of Electors or do not receive a voter information card, you can still be added to the voters' list at any time",
        },
      ],
    },
    {
      id: "elections.secret-ballot",
      moduleId: "elections",
      title: "The secret ballot and how to vote",
      summary:
        "What secrecy protects, advance polls, what happens at the polling station, and other elections.",
      minutes: 6,
      source: chapterUrl("elections"),
      bites: [
        {
          id: "elections.secret-ballot.1",
          title: "What a secret ballot protects",
          body: "Canadian law guarantees a secret ballot. No one may watch you vote, and no one should look at how you voted.",
          takeaway: "Secret ballot: no one watches you vote or sees your choice.",
          evidence:
            "Canadian law secures the right to a secret ballot. This means that no one can watch you vote and no one should look at how you voted.",
        },
        {
          id: "elections.secret-ballot.2",
          title: "No one can demand to know",
          body: "You may tell others how you voted if you want to, but no one can insist. That includes family members, your employer and your union representative.",
          takeaway: "No one, not even family or your employer, can make you say how you voted.",
          evidence:
            "no one, including family members, your employer or union representative, has the right to insist that you tell them how you voted",
        },
        {
          id: "elections.secret-ballot.3",
          title: "Voting early",
          body: "If you can't or don't want to vote on election day, you can vote at an advance poll or by special ballot. The dates and places are on your voter information card. If your card doesn't arrive, call your local elections office to check you are on the list, or Elections Canada at 1-800-463-6868.",
          takeaway: "Can't vote on election day? Use an advance poll or a special ballot.",
          evidence:
            "If you cannot or do not wish to vote on election day, you can vote at the advance polls or by special ballot. The dates and location are on your voter information card.",
        },
        {
          id: "elections.secret-ballot.4",
          title: "At the polling station",
          body: "Bring your voter information card and proof of your identity and address to the polling station. On the ballot, mark an X in the circle next to the candidate you choose.",
          takeaway: "Bring your card and ID, then mark an X in the circle next to your candidate.",
          evidence:
            "Bring this card and proof of your identity and address to the polling station.",
        },
        {
          id: "elections.secret-ballot.5",
          title: "Marking and casting the ballot",
          body: "Go behind the screen to mark your ballot, so no one can see it. Fold it and show it to the poll officials. The official tears off the ballot number and hands it back, and you put it in the ballot box yourself.",
          takeaway:
            "Mark it behind the screen, fold it, show it, then drop it in the box yourself.",
          evidence:
            "You will be invited to go behind the screen to mark your ballot. Once marked, fold it and present it to the poll officials.",
        },
        {
          id: "elections.secret-ballot.6",
          title: "The count",
          body: "As soon as the polls close, election officers count the ballots. The results are announced on radio, television and in newspapers, and posted on the Elections Canada website, www.elections.ca.",
          takeaway:
            "Ballots are counted as soon as the polls close, and the results are made public.",
          evidence:
            "When the polls close, every ballot is counted and the results are made public.",
        },
        {
          id: "elections.secret-ballot.7",
          title: "Other elections",
          body: "Provincial, territorial and municipal elections also use a secret ballot, but their rules differ from federal ones. Check the rules where you live before you vote.",
          takeaway: "Other elections are secret too, but their rules differ.",
          evidence:
            "Provincial, territorial and municipal elections are held by secret ballot, but the rules are not the same as those for federal elections.",
        },
      ],
      teach: {
        prompt: "Walk your partner through voting, from what to bring to where the ballot ends up.",
        checklist: [
          "Bring your voter information card and proof of identity and address",
          "Mark an X in the circle, behind the screen",
          "Fold the ballot and show it to the poll officials",
          "The official tears off the number and you put the ballot in the box",
          "Counting starts as soon as the polls close",
        ],
        probe: "What do you do with the ballot after the official tears off the number?",
      },
      test: [
        {
          id: "el-015",
          biteId: "elections.secret-ballot.1",
          kind: "choice",
          prompt: "What does the right to a secret ballot mean?",
          options: [
            "Your name is removed from the voters' list after voting",
            "Results are kept confidential until a new government is sworn in",
            "Ballots are printed without party names",
            "No one can watch you vote and no one should look at how you voted",
          ],
          correctIndex: 3,
          rationale:
            "A secret ballot means no one can watch you vote and no one should look at how you voted.",
          evidence:
            "Canadian law secures the right to a secret ballot. This means that no one can watch you vote",
        },
        {
          id: "el-016",
          biteId: "elections.secret-ballot.2",
          kind: "choice",
          prompt: "After you vote, your employer asks which party you chose. What are your rights?",
          options: [
            "No one, including your employer, has the right to insist that you tell them how you voted",
            "You must report the request to a poll official",
            "Only a union representative may ask how you voted, and only in private",
            "You must answer questions from your employer",
          ],
          correctIndex: 0,
          rationale:
            "No one, including family, your employer or your union representative, can insist you tell them how you voted.",
          evidence:
            "no one, including family members, your employer or union representative, has the right to insist that you tell them how you voted",
        },
        {
          id: "el-017",
          biteId: "elections.secret-ballot.3",
          kind: "choice",
          prompt: "You will be away on election day. How can you still vote?",
          options: [
            "Apply to the Governor General for a delayed ballot",
            "Vote at the advance polls or by special ballot",
            "Ask an MP to cast a proxy vote",
            "Vote in any riding on election night",
          ],
          correctIndex: 1,
          rationale:
            "You can vote at an advance poll or by special ballot. The dates and places are on your voter information card.",
          evidence:
            "If you cannot or do not wish to vote on election day, you can vote at the advance polls or by special ballot.",
        },
        {
          id: "el-018",
          biteId: "elections.secret-ballot.3",
          kind: "choice",
          prompt: "You did not receive a voter information card. Who do you call first?",
          options: [
            "Your provincial representative",
            "The candidate you support",
            "Your local elections office",
            "The Clerk of the Privy Council",
          ],
          correctIndex: 2,
          rationale:
            "Call your local elections office to make sure you are on the voters' list. If you don't have that number, call Elections Canada.",
          evidence:
            "If you do not receive a voter information card, call your local elections office to ensure that you are on the voters' list.",
        },
        {
          id: "el-019",
          biteId: "elections.secret-ballot.4",
          kind: "choice",
          prompt: "What do you bring to the polling station, and what do you do on the ballot?",
          options: [
            "Your ballot paper, which officials fill in for you",
            "Your citizenship certificate, and write the candidate's name on the line",
            "Nothing; officials look you up in the register",
            "The voter information card and proof of identity and address, then mark an X in the circle",
          ],
          correctIndex: 3,
          rationale:
            "Bring your voter information card and proof of identity and address, and mark an X in the circle next to your candidate.",
          evidence: 'Mark an "X" in the circle next to the name of the candidate of your choice.',
        },
        {
          id: "el-020",
          biteId: "elections.secret-ballot.5",
          kind: "choice",
          prompt: "What happens to your ballot once it is marked and folded?",
          options: [
            "The official tears off the ballot number, gives it back to you, and you deposit it in the ballot box",
            "Your ballot stays in the booth for officials to collect later",
            "The ballot is scanned at the door and returned to you",
            "The poll official keeps your ballot until the count",
          ],
          correctIndex: 0,
          rationale:
            "The official tears off the ballot number, and you put the ballot in the box yourself.",
          evidence:
            "The poll official will tear off the ballot number and give your ballot back to you to deposit in the ballot box.",
        },
        {
          id: "el-021",
          biteId: "elections.secret-ballot.6",
          kind: "truefalse",
          prompt:
            "Election officers count the ballots immediately after the polling stations close.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "Counting starts as soon as the polls close, and the results are made public that night.",
          evidence:
            "Immediately after the polling stations close, election officers count the ballots",
        },
        {
          id: "el-022",
          biteId: "elections.secret-ballot.7",
          kind: "truefalse",
          prompt:
            "Provincial and municipal elections use the same voting rules as federal elections.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "They all use a secret ballot, but their rules differ from federal ones.",
          evidence:
            "Provincial, territorial and municipal elections are held by secret ballot, but the rules are not the same as those for federal elections.",
        },
      ],
    },
    {
      id: "elections.after-an-election",
      moduleId: "elections",
      title: "After an election",
      summary: "Majority and minority governments, confidence, the Cabinet, and the Opposition.",
      minutes: 7,
      source: chapterUrl("elections"),
      bites: [
        {
          id: "elections.after-an-election.1",
          title: "Forming a government",
          body: "Usually, the Governor General invites the leader of the party with the most seats in the House of Commons to form the government. Once appointed, that leader is the Prime Minister.",
          takeaway: "The leader of the party with the most seats becomes Prime Minister.",
          evidence:
            "the leader of the political party with the most seats in the House of Commons is invited by the Governor General to form the government",
        },
        {
          id: "elections.after-an-election.2",
          title: "Majority or minority",
          body: "If the governing party holds at least half the seats in the House of Commons, it is a majority government. If it holds fewer than half, it is a minority government.",
          takeaway: "Majority: at least half the seats. Minority: fewer than half.",
          evidence:
            "If the party in power holds at least half of the seats in the House of Commons, this is called a majority government.",
        },
        {
          id: "elections.after-an-election.3",
          title: "Confidence",
          body: "The Prime Minister and the governing party stay in power only while they have the support, or confidence, of most MPs. A vote on a major issue such as the budget is a confidence vote. If most MPs vote against a major government decision, the government is defeated, and the Prime Minister usually asks the Governor General to call an election.",
          takeaway: "Lose a confidence vote, such as the budget, and there is usually an election.",
          evidence:
            "When the House of Commons votes on a major issue such as the budget, this is considered a matter of confidence.",
        },
        {
          id: "elections.after-an-election.4",
          title: "The Cabinet",
          body: "The Prime Minister chooses the ministers of the Crown, mostly from the House of Commons. Each minister runs a federal department. Together, the Prime Minister and ministers form the Cabinet, which prepares the budget and proposes most new laws. Any MP can question its decisions.",
          takeaway:
            "The Prime Minister picks the ministers. The Cabinet prepares the budget and proposes most laws.",
          evidence:
            "The Prime Minister chooses the ministers of the Crown, most of them from among members of the House of Commons.",
        },
        {
          id: "elections.after-an-election.5",
          title: "The Opposition",
          body: "Parties not in power are opposition parties. Their job is to peacefully oppose or improve the government's proposals. The opposition party with the most seats is the Official Opposition, or the Loyal Opposition.",
          takeaway: "The Official Opposition is the opposition party with the most seats.",
          evidence:
            "The opposition party with the most members of the House of Commons is the Official Opposition or Her Majesty's Loyal Opposition.",
        },
        {
          id: "elections.after-an-election.6",
          title: "The main parties",
          body: "The 2012 guide lists three major parties in the House of Commons: the Conservative Party, the Liberal Party and the New Democratic Party. Which parties hold seats changes from one election to the next.",
          takeaway: "The guide's three major parties: Conservative, Liberal, New Democratic.",
          evidence:
            "There are three major political parties currently represented in the House of Commons: the Conservative Party, the Liberal Party, and the New Democratic Party.",
        },
      ],
      teach: {
        prompt:
          "Explain how an election result becomes a government, and what can end that government early.",
        checklist: [
          "The Governor General invites the leader of the party with the most seats",
          "At least half the seats is a majority; less than half is a minority",
          "The government needs the confidence of a majority of MPs, and the budget is a confidence vote",
          "If it loses, the Prime Minister usually asks for an election",
        ],
        probe: "Why is a budget vote risky for a minority government?",
      },
      test: [
        {
          id: "el-023",
          biteId: "elections.after-an-election.1",
          kind: "choice",
          prompt: "Who invites the leader of the party with the most seats to form the government?",
          options: [
            "The Speaker of the House of Commons",
            "The Governor General",
            "The Chief Justice of Canada",
            "The Premier of the largest province",
          ],
          correctIndex: 1,
          rationale: "The Governor General invites the leader, who then becomes Prime Minister.",
          evidence:
            "the leader of the political party with the most seats in the House of Commons is invited by the Governor General to form the government",
        },
        {
          id: "el-024",
          biteId: "elections.after-an-election.2",
          kind: "truefalse",
          prompt: "A minority government holds at least half the seats in the House of Commons.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "At least half the seats is a majority. Fewer than half is a minority.",
          evidence:
            "If the party in power holds less than half of the seats in the House of Commons, this is called a minority government.",
        },
        {
          id: "el-025",
          biteId: "elections.after-an-election.3",
          kind: "choice",
          prompt: "Which House of Commons vote is a matter of confidence?",
          options: [
            "A public petition",
            "A committee's membership",
            "A major issue such as the budget",
            "The Cabinet's choice of committees",
          ],
          correctIndex: 2,
          rationale: "A vote on a major issue such as the budget is a confidence vote.",
          evidence:
            "When the House of Commons votes on a major issue such as the budget, this is considered a matter of confidence.",
        },
        {
          id: "el-026",
          biteId: "elections.after-an-election.3",
          kind: "choice",
          prompt: "Most MPs vote against a major government decision. What usually happens next?",
          options: [
            "The Senate steps in to pass the decision",
            "The Governor General picks a new Prime Minister from the opposition",
            "The defeated party stays in power until the fixed election date",
            "The Prime Minister asks the Governor General, on behalf of the Sovereign, to call an election",
          ],
          correctIndex: 3,
          rationale:
            "The government has lost the confidence of the House, so the Prime Minister usually asks the Sovereign's representative to call an election.",
          evidence:
            "which usually results in the Prime Minister asking the Governor General, on behalf of the Sovereign, to call an election",
        },
        {
          id: "el-027",
          biteId: "elections.after-an-election.4",
          kind: "choice",
          prompt: "Which statement about the Cabinet is correct?",
          options: [
            "The Prime Minister chooses the ministers of the Crown",
            "The Cabinet is made up of senators who review bills",
            "The Cabinet decides court cases involving the government",
            "The Cabinet is chosen by the voters directly",
          ],
          correctIndex: 0,
          rationale:
            "The Prime Minister chooses the ministers, and the Cabinet prepares the budget and proposes most new laws.",
          evidence:
            "The Prime Minister chooses the ministers of the Crown, most of them from among members of the House of Commons.",
        },
        {
          id: "el-028",
          biteId: "elections.after-an-election.5",
          kind: "choice",
          prompt: "Which party is the Official Opposition?",
          options: [
            "The largest party in the Senate",
            "The opposition party with the most members of the House of Commons",
            "The second-largest party in the Cabinet",
            "The opposition caucus of the largest province",
          ],
          correctIndex: 1,
          rationale:
            "The Official Opposition is the opposition party with the most seats in the House of Commons. Its job is to peacefully oppose or improve government proposals.",
          evidence:
            "The opposition party with the most members of the House of Commons is the Official Opposition or Her Majesty's Loyal Opposition.",
          caveat:
            "The guide calls it Her Majesty's Loyal Opposition. With a King on the throne, it is now His Majesty's Loyal Opposition.",
        },
        {
          id: "el-029",
          biteId: "elections.after-an-election.6",
          kind: "choice",
          prompt: "Which three major parties does the guide name in the House of Commons?",
          options: [
            "The Progressive Conservative Party, the CCF, and the Credit Union Party",
            "The Unity Party, the Reform Party, and the Cooperative Commonwealth Federation",
            "The Conservative Party, the Liberal Party, and the New Democratic Party",
            "The Liberal Party, the Green Party, and the Bloc Québécois",
          ],
          correctIndex: 2,
          rationale: "The 2012 guide lists the Conservative, Liberal and New Democratic parties.",
          evidence:
            "There are three major political parties currently represented in the House of Commons: the Conservative Party, the Liberal Party, and the New Democratic Party.",
          caveat:
            "This is the guide's 2012 snapshot. Other parties have held seats since, so check the current House lineup separately.",
        },
      ],
    },
    {
      id: "elections.levels-of-government",
      moduleId: "elections",
      title: "The other levels of government",
      summary:
        "Municipal by-laws and services, who handles what at each level, and First Nations governance.",
      minutes: 6,
      source: chapterUrl("elections"),
      bites: [
        {
          id: "elections.levels-of-government.1",
          title: "Municipal councils and by-laws",
          body: "Local, or municipal, government matters a lot in daily life. A municipal council passes laws called by-laws, which apply only to the local community. It is usually led by a mayor or reeve, with councillors or aldermen.",
          takeaway: "A municipal council, led by a mayor or reeve, passes by-laws.",
          evidence:
            'Municipal governments usually have a council that passes laws called "by-laws" that affect only the local community.',
        },
        {
          id: "elections.levels-of-government.2",
          title: "What a municipality handles",
          body: "Municipalities handle urban and regional planning, streets and roads, garbage, snow removal, firefighting, ambulances and other emergency services, recreation, public transit, and some local health and social services. Most large cities also have their own police.",
          takeaway: "Streets, snow, garbage, fire, transit and recreation are municipal.",
          evidence:
            "Municipalities are normally responsible for urban or regional planning, streets and roads, sanitation (such as garbage removal), snow removal, firefighting",
        },
        {
          id: "elections.levels-of-government.3",
          title: "Federal responsibilities",
          body: "Federal responsibilities, handled by Members of Parliament, include national defence, foreign policy, citizenship, policing, criminal justice, international trade and Aboriginal affairs. Immigration, agriculture and the environment are shared.",
          takeaway: "Defence, foreign policy, citizenship and criminal justice are federal.",
          evidence:
            "Federal - Members of Parliament (MPs) - National Defence - Foreign Policy - Citizenship - Policing - Criminal Justice - International Trade - Aboriginal Affairs",
        },
        {
          id: "elections.levels-of-government.4",
          title: "Provincial and territorial responsibilities",
          body: "Provincial and territorial members are called MLAs, MNAs, MPPs or MHAs, depending on where they sit. They handle education, health care, natural resources, highways, property and civil rights, and policing in Ontario and Quebec.",
          takeaway:
            "Education, health care, natural resources and highways are provincial or territorial.",
          evidence:
            "- Education - Health Care - Natural Resources - Highways - Policing (Ontario, Quebec) - Property and Civil Rights",
        },
        {
          id: "elections.levels-of-government.5",
          title: "Three areas marked shared",
          body: "Immigration, agriculture and the environment are shared between the federal and provincial or territorial governments. Policing happens at all three levels: federal, provincial (in Ontario and Quebec) and municipal.",
          takeaway: "Immigration, agriculture and the environment are shared.",
          evidence: "- Immigration (shared) - Agriculture (shared) - Environment (shared)",
        },
        {
          id: "elections.levels-of-government.6",
          title: "First Nations governance",
          body: "First Nations have band chiefs and councillors with major responsibilities on reserves, including housing and schools. Aboriginal organizations at the provincial, regional and national levels speak for First Nations, Métis and Inuit people in dealing with governments.",
          takeaway: "Band chiefs and councillors run reserve services such as housing and schools.",
          evidence:
            "The First Nations have band chiefs and councillors who have major responsibilities on First Nations reserves, including housing, schools and other services.",
        },
      ],
      teach: {
        prompt:
          "Say which level of government handles each: a school, a garbage truck, the army, and a provincial highway.",
        checklist: [
          "Schools: provincial or territorial",
          "Garbage: municipal",
          "The army: federal",
          "Highways: provincial or territorial",
          "Band chiefs and councillors run many services on First Nations reserves",
        ],
        probe: "Who heads your municipal council, and what are its laws called?",
      },
      test: [
        {
          id: "el-030",
          biteId: "elections.levels-of-government.1",
          kind: "choice",
          prompt: "What are the laws passed by a municipal council called?",
          options: ["Royal assents", "Resolutions", "Statutes", "By-laws"],
          correctIndex: 3,
          rationale:
            "Municipal laws are called by-laws, and they apply only to the local community.",
          evidence:
            'Municipal governments usually have a council that passes laws called "by-laws" that affect only the local community.',
        },
        {
          id: "el-031",
          biteId: "elections.levels-of-government.2",
          kind: "choice",
          prompt: "Which of these is a municipal responsibility?",
          options: [
            "Recycling programs and snow removal",
            "The national currency",
            "International trade",
            "Criminal sentencing",
          ],
          correctIndex: 0,
          rationale:
            "Snow removal and recycling are municipal, along with streets, garbage, firefighting and transit.",
          evidence:
            "Municipal (local) - Mayor or Reeve - Councillors or Aldermen - Social and Community Health - Recycling Programs - Transportation and Utilities - Snow Removal",
        },
        {
          id: "el-032",
          biteId: "elections.levels-of-government.3",
          kind: "choice",
          prompt: "Which of these is a federal responsibility?",
          options: ["Highways", "Citizenship", "Recycling", "Education"],
          correctIndex: 1,
          rationale:
            "Citizenship is federal. Education and highways are provincial or territorial, and recycling is municipal.",
          evidence:
            "Federal - Members of Parliament (MPs) - National Defence - Foreign Policy - Citizenship",
        },
        {
          id: "el-033",
          biteId: "elections.levels-of-government.4",
          kind: "choice",
          prompt: "Which is NOT a name for members of a provincial or territorial legislature?",
          options: [
            "Members of the Legislative Assembly (MLAs)",
            "Members of the National Assembly (MNAs)",
            "Members of the House of Commons (MHCs)",
            "Members of the Provincial Parliament (MPPs)",
          ],
          correctIndex: 2,
          rationale: "The names are MLA, MNA, MPP and MHA. The House of Commons is federal.",
          evidence:
            "Provincial and Territorial - Members of the Legislative Assembly (MLAs) or - Members of the National Assembly (MNAs) or - Members of the Provincial Parliament (MPPs) or - Members of the House of Assembly (MHAs)",
        },
        {
          id: "el-034",
          biteId: "elections.levels-of-government.5",
          kind: "choice",
          prompt: "Which three areas do the federal and provincial governments share?",
          options: [
            "Education, health care and natural resources",
            "Currency, trade and taxation",
            "Defence, policing and citizenship",
            "Immigration, agriculture and environment",
          ],
          correctIndex: 3,
          rationale: "Immigration, agriculture and the environment are shared.",
          evidence: "- Immigration (shared) - Agriculture (shared) - Environment (shared)",
        },
        {
          id: "el-035",
          biteId: "elections.levels-of-government.6",
          kind: "choice",
          prompt:
            "Who has major responsibilities on First Nations reserves, including housing and schools?",
          options: [
            "Band chiefs and councillors",
            "The federal Minister of Citizenship",
            "Provincial school boards",
            "Mayors of nearby municipalities",
          ],
          correctIndex: 0,
          rationale:
            "Band chiefs and councillors have major responsibilities on reserves, including housing and schools.",
          evidence:
            "The First Nations have band chiefs and councillors who have major responsibilities on First Nations reserves, including housing, schools and other services.",
        },
      ],
    },
    {
      id: "elections.your-government",
      moduleId: "elections",
      title: "Your representatives",
      summary:
        "Who represents the Crown, who heads each government, and the names to know for where you live.",
      minutes: 5,
      source: chapterUrl("elections"),
      bites: [
        {
          id: "elections.your-government.1",
          title: "Federal",
          body: "The guide asks you to write down who holds each federal role. The Governor General represents the Sovereign (the guide says the Queen; today it is the King) and acts for the Head of State. The Prime Minister is the Head of Government. Also note the party in power, the Leader of the Opposition, your MP and your riding.",
          takeaway:
            "The Governor General represents the Sovereign. The Prime Minister heads the government.",
          evidence:
            "Head of State: The name of the representative of the Queen of Canada, the Governor General, is... The Head of Government, the Prime Minister, is...",
        },
        {
          id: "elections.your-government.2",
          title: "Provincial",
          body: "In your province, the Lieutenant Governor represents the Sovereign and the Premier is the Head of Government. Also note the party in power, the opposition parties and their leaders, and your provincial representative.",
          takeaway:
            "In a province, the Lieutenant Governor represents the Sovereign and the Premier heads the government.",
          evidence:
            "The representative of the Queen in my province, the Lieutenant Governor, is...",
        },
        {
          id: "elections.your-government.3",
          title: "Territorial",
          body: "In a territory, the Commissioner represents the federal government. Also note the territory's Premier and your territorial representative.",
          takeaway: "In a territory, the Commissioner represents the federal government.",
          evidence:
            "The name of the Commissioner, who represents the federal government in my territory, is...",
        },
        {
          id: "elections.your-government.4",
          title: "Municipal",
          body: "Note the name of your municipality and the head of its government, who is called either a mayor or a reeve.",
          takeaway: "The head of a municipal government is a mayor or a reeve.",
          evidence: "The name of the head of the municipal government (mayor or reeve) is...",
        },
      ],
      teach: {
        prompt:
          "Say who represents the Crown in Canada and in your province, and who heads the government federally, provincially and locally.",
        checklist: [
          "Federally: the Governor General represents the Sovereign, and the Prime Minister heads the government",
          "In a province: the Lieutenant Governor represents the Sovereign, and the Premier heads the government",
          "In a territory: the Commissioner represents the federal government",
          "Your municipality is headed by a mayor or reeve",
          "Name your own MP and riding",
        ],
        probe: "Who is your MP, and what is your riding called?",
      },
      test: [
        {
          id: "el-036",
          biteId: "elections.your-government.1",
          kind: "truefalse",
          prompt: "The Governor General represents the Sovereign in Canada.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "The Governor General represents the Sovereign. The Prime Minister is the Head of Government.",
          evidence:
            "The name of the representative of the Queen of Canada, the Governor General, is...",
          caveat:
            'The guide says "the Queen of Canada". Today the Governor General, Louise Arbour since June 2026, represents King Charles III.',
        },
        {
          id: "el-037",
          biteId: "elections.your-government.2",
          kind: "choice",
          prompt: "In a Canadian province, who is the Head of Government?",
          options: [
            "The Mayor",
            "The Premier",
            "The Speaker",
            "The Member of the Legislative Assembly",
          ],
          correctIndex: 1,
          rationale:
            "The Premier heads a provincial government. The Lieutenant Governor represents the Sovereign.",
          evidence: "The Head of Government (the Premier) is...",
        },
        {
          id: "el-038",
          biteId: "elections.your-government.3",
          kind: "truefalse",
          prompt: "In a territory, the Commissioner represents the federal government.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale: "The Commissioner represents the federal government in a territory.",
          evidence:
            "The name of the Commissioner, who represents the federal government in my territory, is...",
        },
        {
          id: "el-039",
          biteId: "elections.your-government.4",
          kind: "truefalse",
          prompt: "The head of a municipal government is always called the mayor.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "The head of a municipal council is a mayor or a reeve.",
          evidence: "The name of the head of the municipal government (mayor or reeve) is...",
        },
      ],
    },
  ],
};

export default module;
