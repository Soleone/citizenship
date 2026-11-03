import type { Module } from "../types.ts";
import { chapterUrl } from "../sources.ts";

/**
 * Modern Canada. Every claim below is quoted from the Discover Canada chapter
 * "Modern Canada" (data/corpus/modern-canada.txt). Where the chapter's own
 * headings do not match the planned session split, the headings win: the
 * Official Languages Act sits under "Canada and Quebec" in the guide, so
 * bilingualism is taught in the Quebec session, and the guide never names the
 * Parti Québécois or Pearson, so neither appears here.
 */
const module: Module = {
  id: "modern-canada",
  order: 5,
  title: "Modern Canada",
  guideChapter: "Modern Canada",
  corpus: ["modern-canada"],
  summary:
    "Postwar prosperity, Canada in the world, Quebec, a changing society, and what Canadians made.",
  mission:
    "Place the postwar dates and names: what grew, which alliances Canada joined, what Quebec voted on, and what Canadians invented.",
  icon: "waypoints",
  tags: ["Postwar", "NATO and UN", "Quebec", "Multiculturalism", "Inventions"],
  source: chapterUrl("modernCanada"),
  testSize: 10,
  sessions: [
    {
      id: "modern-canada.trade-and-growth",
      moduleId: "modern-canada",
      title: "Trade and economic growth",
      summary: "Record postwar prosperity, oil in Alberta, and the social programs it paid for.",
      minutes: 7,
      source: chapterUrl("modernCanada"),
      bites: [
        {
          id: "modern-canada.trade-and-growth.1",
          title: "Trade opens up",
          body: "Postwar Canada enjoyed record prosperity. Trade barriers from the Depression were lowered by treaties such as the General Agreement on Tariffs and Trade (GATT), which is now the World Trade Organization (WTO).",
          takeaway: "GATT lowered trade barriers, and it is now the WTO.",
          evidence:
            "opened up by such treaties as the General Agreement on Tariffs and Trade (GATT), now the World Trade Organization (WTO)",
        },
        {
          id: "modern-canada.trade-and-growth.2",
          title: "Where prosperity comes from",
          body: "From 1945 to 1970, as Canada traded more with the United States and other partners, it had one of the strongest economies in the industrialized world. Today's high standard of living comes from Canadians' hard work and from trade, above all with the United States.",
          takeaway:
            "Hard work and trade, above all with the United States, keep living standards high.",
          evidence:
            "maintained by the hard work of Canadians and by trade with other nations, in particular the United States.",
        },
        {
          id: "modern-canada.trade-and-growth.3",
          title: "1947: oil in Alberta",
          body: "Canada's modern energy industry began with the discovery of oil in Alberta in 1947.",
          takeaway: "Oil found in Alberta in 1947 began Canada's modern energy industry.",
          evidence:
            "The discovery of oil in Alberta in 1947 began Canada's modern energy industry.",
        },
        {
          id: "modern-canada.trade-and-growth.4",
          title: "1951: most can afford the basics",
          body: "In 1951, for the first time, a majority of Canadians could afford enough food, shelter and clothing.",
          takeaway:
            "1951: for the first time, most Canadians could afford food, shelter and clothing.",
          evidence:
            "In 1951, for the first time, a majority of Canadians were able to afford adequate food, shelter and clothing.",
        },
        {
          id: "modern-canada.trade-and-growth.5",
          title: "Prosperity built the social system",
          body: "Growing prosperity paid for social programs. The federal government introduced unemployment insurance (now employment insurance) in 1940. Old Age Security dates back to 1927, and the Canada and Quebec Pension Plans began in 1965. The Canada Health Act sets a basic standard of health coverage, and the provinces and territories provide publicly funded education.",
          takeaway:
            "Prosperity paid for social programs. The provinces and territories run education.",
          evidence: "As prosperity grew, so did the ability to support social assistance programs.",
        },
      ],
      teach: {
        prompt:
          "Explain why the postwar years were a time of record prosperity, and name the social programs that followed.",
        checklist: [
          "GATT opened up Depression-era trade barriers; it is now the WTO",
          "Oil in Alberta in 1947; by 1951 most Canadians could afford food, shelter and clothing",
          "Unemployment insurance 1940, Old Age Security from 1927, the Canada and Quebec Pension Plans 1965",
          "The Canada Health Act sets basic coverage; the provinces and territories run education",
        ],
        probe: "Which two things keep Canada's standard of living high?",
      },
      test: [
        {
          id: "mc-001",
          biteId: "modern-canada.trade-and-growth.1",
          kind: "choice",
          prompt: "The General Agreement on Tariffs and Trade (GATT) is now known as what?",
          options: [
            "The World Trade Organization",
            "The North American Free Trade Agreement",
            "The Bank of Canada",
            "The International Monetary Fund",
          ],
          correctIndex: 0,
          rationale: "GATT is now the World Trade Organization (WTO).",
          evidence:
            "the General Agreement on Tariffs and Trade (GATT), now the World Trade Organization (WTO)",
        },
        {
          id: "mc-002",
          biteId: "modern-canada.trade-and-growth.2",
          kind: "choice",
          prompt: "Which country is Canada's most important trading partner?",
          options: ["Mexico", "The United States", "Japan", "The United Kingdom"],
          correctIndex: 1,
          rationale:
            "Trade, above all with the United States, keeps Canada's standard of living high.",
          evidence: "by trade with other nations, in particular the United States.",
        },
        {
          id: "mc-003",
          biteId: "modern-canada.trade-and-growth.3",
          kind: "truefalse",
          prompt: "The 1947 discovery of oil in Alberta ended Canada's modern energy industry.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "It began the modern energy industry.",
          evidence:
            "The discovery of oil in Alberta in 1947 began Canada's modern energy industry.",
        },
        {
          id: "mc-004",
          biteId: "modern-canada.trade-and-growth.4",
          kind: "choice",
          prompt:
            "In what year could most Canadians first afford enough food, shelter and clothing?",
          options: ["1901", "1931", "1951", "1971"],
          correctIndex: 2,
          rationale: "1951 was the first year most Canadians could afford the basics.",
          evidence:
            "In 1951, for the first time, a majority of Canadians were able to afford adequate food, shelter and clothing.",
        },
        {
          id: "mc-005",
          biteId: "modern-canada.trade-and-growth.5",
          kind: "choice",
          prompt:
            "What is the federal benefit for people out of work, introduced in 1940, called today?",
          options: [
            "Family allowance",
            "Income support",
            "Employment insurance",
            "Emergency relief",
          ],
          correctIndex: 2,
          rationale:
            "Unemployment insurance, introduced by the federal government in 1940, is now called employment insurance.",
          evidence:
            'Unemployment insurance (now called "employment insurance") was introduced by the federal government in 1940.',
        },
        {
          id: "mc-006",
          biteId: "modern-canada.trade-and-growth.5",
          kind: "choice",
          prompt: "What does the Canada Health Act do?",
          options: [
            "Replaces provincial health plans",
            "Covers federal employees only",
            "Sets hospital salaries",
            "Sets a basic standard of coverage",
          ],
          correctIndex: 3,
          rationale:
            "The Canada Health Act ensures common elements and a basic standard of coverage.",
          evidence:
            "The Canada Health Act ensures common elements and a basic standard of coverage.",
        },
        {
          id: "mc-007",
          biteId: "modern-canada.trade-and-growth.5",
          kind: "truefalse",
          prompt: "Publicly funded education is provided by the provinces and territories.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "The provinces and territories provide publicly funded education, not the federal government.",
          evidence: "Publicly funded education is provided by the provinces and territories.",
        },
      ],
    },
    {
      id: "modern-canada.international-engagement",
      moduleId: "modern-canada",
      title: "Canada in the world",
      summary: "The Cold War, NATO and NORAD, the Korean War, and peacekeeping.",
      minutes: 6,
      source: chapterUrl("modernCanada"),
      bites: [
        {
          id: "modern-canada.international-engagement.1",
          title: "Independence, step by step",
          body: "Like Australia and New Zealand, Canada became independent gradually, not in a single break. That let it contribute a great deal internationally.",
          takeaway: "Canada became independent gradually, like Australia and New Zealand.",
          evidence:
            "Canada developed its autonomy gradually with a capacity to make significant contributions internationally.",
        },
        {
          id: "modern-canada.international-engagement.2",
          title: "How the Cold War started",
          body: "The Cold War began when several eastern European countries, freed from the Nazis, fell under a Communist bloc controlled by the Soviet Union and its dictator, Josef Stalin.",
          takeaway:
            "The Cold War began when the Soviet Union under Stalin took control of eastern Europe.",
          evidence:
            "became part of a Communist bloc controlled by the Soviet Union under the dictator Josef Stalin",
        },
        {
          id: "modern-canada.international-engagement.3",
          title: "NATO and NORAD",
          body: "Canada joined other Western democracies to form NATO, the North Atlantic Treaty Organization, a military alliance. Separately, Canada and the United States formed NORAD, the North American Aerospace Defence Command.",
          takeaway:
            "NATO is a military alliance of Western democracies. NORAD is aerospace defence with the United States.",
          evidence:
            "the North Atlantic Treaty Organization (NATO), a military alliance, and with the United States in the North American Aerospace Defence Command (NORAD)",
        },
        {
          id: "modern-canada.international-engagement.4",
          title: "The United Nations and Korea",
          body: "Canada joined international organizations such as the United Nations. In the Korean War (1950 to 1953), Canada took part in the UN operation defending South Korea. 500 Canadians died and 1,000 were wounded.",
          takeaway: "In the Korean War, Canada helped the UN defend South Korea.",
          evidence:
            "It participated in the UN operation defending South Korea in the Korean War (1950-53), with 500 dead and 1,000 wounded.",
        },
        {
          id: "modern-canada.international-engagement.5",
          title: "Peacekeeping and other operations",
          body: "Canada is known for UN peacekeeping, with missions in places such as Egypt, Cyprus and Haiti. It has also taken part in other international security operations, such as in the former Yugoslavia and Afghanistan.",
          takeaway:
            "Peacekeeping in Egypt, Cyprus and Haiti. Other operations in the former Yugoslavia and Afghanistan.",
          evidence:
            "Canada has taken part in numerous UN peacekeeping missions in places as varied as Egypt, Cyprus and Haiti",
        },
      ],
      teach: {
        prompt: "Explain why Canada joined these alliances, and what it did in them.",
        checklist: [
          "The Cold War began when the Soviet Union under Stalin took control of eastern Europe",
          "NATO is a military alliance; NORAD is aerospace defence with the United States",
          "Korea 1950-53: Canada defended South Korea with the UN; 500 dead, 1,000 wounded",
          "Peacekeeping in Egypt, Cyprus and Haiti; other operations in the former Yugoslavia and Afghanistan",
        ],
        probe:
          "Which of these was not a UN peacekeeping mission: Cyprus, the former Yugoslavia, or Haiti?",
      },
      test: [
        {
          id: "mc-008",
          biteId: "modern-canada.international-engagement.1",
          kind: "truefalse",
          prompt: "Canada became independent all at once, in a single step.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "Like Australia and New Zealand, Canada became independent gradually.",
          evidence:
            "Like Australia, New Zealand and other countries, Canada developed its autonomy gradually",
        },
        {
          id: "mc-009",
          biteId: "modern-canada.international-engagement.2",
          kind: "choice",
          prompt: "The Cold War began when eastern Europe fell under the control of which country?",
          options: ["The Soviet Union", "China", "Poland", "Germany"],
          correctIndex: 0,
          rationale: "The bloc was controlled by the Soviet Union under Josef Stalin.",
          evidence:
            "a Communist bloc controlled by the Soviet Union under the dictator Josef Stalin",
        },
        {
          id: "mc-010",
          biteId: "modern-canada.international-engagement.3",
          kind: "choice",
          prompt: "What kind of organization is NATO?",
          options: [
            "A customs authority",
            "A military alliance",
            "A United Nations program",
            "A trade bloc",
          ],
          correctIndex: 1,
          rationale:
            "NATO is a military alliance that Canada formed with other Western democracies.",
          evidence: "the North Atlantic Treaty Organization (NATO), a military alliance",
        },
        {
          id: "mc-011",
          biteId: "modern-canada.international-engagement.3",
          kind: "choice",
          prompt: "What does NORAD stand for?",
          options: [
            "The North American Defence Alliance",
            "The Western Hemisphere Air Force",
            "The North American Aerospace Defence Command",
            "The North Atlantic Air Command",
          ],
          correctIndex: 2,
          rationale:
            "NORAD is the North American Aerospace Defence Command, shared with the United States.",
          evidence:
            "with the United States in the North American Aerospace Defence Command (NORAD)",
        },
        {
          id: "mc-012",
          biteId: "modern-canada.international-engagement.4",
          kind: "choice",
          prompt: "In the Korean War, Canada helped the UN defend which country?",
          options: ["Japan", "China", "North Korea", "South Korea"],
          correctIndex: 3,
          rationale: "Canada fought in the UN operation defending South Korea against North Korea.",
          evidence: "the UN operation defending South Korea in the Korean War (1950-53)",
        },
        {
          id: "mc-013",
          biteId: "modern-canada.international-engagement.5",
          kind: "choice",
          prompt: "Where has Canada served on UN peacekeeping missions?",
          options: [
            "Egypt, Cyprus and Haiti",
            "Somalia and Rwanda",
            "Iraq and Syria",
            "Korea and Japan",
          ],
          correctIndex: 0,
          rationale:
            "Canada's peacekeeping examples are Egypt, Cyprus and Haiti. The former Yugoslavia and Afghanistan were other security operations.",
          evidence: "peacekeeping missions in places as varied as Egypt, Cyprus and Haiti",
        },
        {
          id: "mc-014",
          biteId: "modern-canada.international-engagement.5",
          kind: "truefalse",
          prompt:
            "Canada has taken part in security operations in the former Yugoslavia and Afghanistan.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "Both are examples of Canada's international security operations, separate from UN peacekeeping.",
          evidence:
            "other international security operations such as those in the former Yugoslavia and Afghanistan",
          caveat:
            "Canada's mission in Afghanistan has ended since the guide was written. The guide's list is what the test asks; confirm current operations separately.",
        },
      ],
    },
    {
      id: "modern-canada.quebec",
      moduleId: "modern-canada",
      title: "Canada and Quebec",
      summary:
        "The Quiet Revolution, official languages, La Francophonie, and the referendums of 1980 and 1995.",
      minutes: 6,
      source: chapterUrl("modernCanada"),
      bites: [
        {
          id: "modern-canada.quebec.1",
          title: "The Quiet Revolution",
          body: "French-Canadian culture flourished after the war, and in the 1960s Quebec went through an era of rapid change called the Quiet Revolution. During this time, many Quebecers began to want to separate from Canada.",
          takeaway: "The Quiet Revolution: Quebec's era of rapid change in the 1960s.",
          evidence:
            "Quebec experienced an era of rapid change in the 1960s known as the Quiet Revolution",
        },
        {
          id: "modern-canada.quebec.2",
          title: "1963: a commission on bilingualism",
          body: "In 1963 Parliament set up the Royal Commission on Bilingualism and Biculturalism, which led to the language laws that followed.",
          takeaway:
            "In 1963 Parliament set up the Royal Commission on Bilingualism and Biculturalism.",
          evidence:
            "In 1963 Parliament established the Royal Commission on Bilingualism and Biculturalism.",
        },
        {
          id: "modern-canada.quebec.3",
          title: "1969: the Official Languages Act",
          body: "The commission's work led to the Official Languages Act of 1969, which guarantees French and English services from the federal government across Canada.",
          takeaway:
            "The Official Languages Act of 1969 guarantees federal services in French and English.",
          evidence:
            "This led to the Official Languages Act (1969), which guarantees French and English services in the federal government across Canada.",
        },
        {
          id: "modern-canada.quebec.4",
          title: "1970: La Francophonie",
          body: "In 1970 Canada helped found La Francophonie, an international association of French-speaking countries.",
          takeaway:
            "La Francophonie, co-founded by Canada in 1970, unites French-speaking countries.",
          evidence:
            "In 1970, Canada helped found La Francophonie, an international association of French-speaking countries.",
        },
        {
          id: "modern-canada.quebec.5",
          title: "Two referendums, and 1982",
          body: "The sovereignty movement grew, but Quebec voters rejected it in a 1980 referendum. In 1982, after long negotiations, the Constitution was amended without Quebec's agreement. A second referendum in 1995 also defeated sovereignty. Quebec's place in Canada is still a lively debate.",
          takeaway:
            "Sovereignty lost in 1980 and 1995. The 1982 Constitution was amended without Quebec's agreement.",
          evidence:
            "The movement for Quebec sovereignty gained strength but was defeated in a referendum in the province in 1980.",
        },
      ],
      teach: {
        prompt: "Tell the story from the Quiet Revolution to the 1995 referendum, with dates.",
        checklist: [
          "The Quiet Revolution: rapid change in Quebec in the 1960s",
          "1963: a Royal Commission on bilingualism; 1969: the Official Languages Act",
          "1970: Canada helps found La Francophonie",
          "Sovereignty defeated in 1980 and 1995; the Constitution amended in 1982 without Quebec's agreement",
        ],
        probe: "In which two years did Quebec vote on sovereignty?",
      },
      test: [
        {
          id: "mc-015",
          biteId: "modern-canada.quebec.1",
          kind: "choice",
          prompt: "What was the Quiet Revolution?",
          options: [
            "A constitutional conference with the provinces",
            "An era of rapid change in Quebec in the 1960s",
            "A campaign to separate Quebec from Canada",
            "A postwar baby boom in Montreal",
          ],
          correctIndex: 1,
          rationale:
            "The Quiet Revolution was Quebec's era of rapid change in the 1960s. The separatist movement grew out of it but is not the same thing.",
          evidence:
            "Quebec experienced an era of rapid change in the 1960s known as the Quiet Revolution",
        },
        {
          id: "mc-016",
          biteId: "modern-canada.quebec.2",
          kind: "choice",
          prompt: "Who set up the Royal Commission on Bilingualism and Biculturalism in 1963?",
          options: ["The Privy Council", "The Senate", "Parliament", "The Supreme Court"],
          correctIndex: 2,
          rationale: "Parliament set up the commission.",
          evidence:
            "In 1963 Parliament established the Royal Commission on Bilingualism and Biculturalism.",
        },
        {
          id: "mc-017",
          biteId: "modern-canada.quebec.3",
          kind: "choice",
          prompt: "What does the Official Languages Act of 1969 guarantee?",
          options: [
            "Bilingual education in every province",
            "French as the only language of Parliament",
            "Translation services in all courts",
            "French and English services in the federal government across Canada",
          ],
          correctIndex: 3,
          rationale:
            "The Act guarantees French and English services from the federal government across Canada.",
          evidence:
            "which guarantees French and English services in the federal government across Canada",
        },
        {
          id: "mc-018",
          biteId: "modern-canada.quebec.4",
          kind: "choice",
          prompt: "What is La Francophonie?",
          options: [
            "An international association of French-speaking countries",
            "A treaty organization in the Americas",
            "A federal department of foreign affairs",
            "A group of European countries",
          ],
          correctIndex: 0,
          rationale:
            "La Francophonie is an international association of French-speaking countries. Canada helped found it in 1970.",
          evidence:
            "Canada helped found La Francophonie, an international association of French-speaking countries.",
        },
        {
          id: "mc-019",
          biteId: "modern-canada.quebec.5",
          kind: "choice",
          prompt: "In which year was the first referendum on Quebec sovereignty held?",
          options: ["1967", "1980", "1990", "1999"],
          correctIndex: 1,
          rationale: "The first referendum was defeated in 1980. The second was in 1995.",
          evidence: "was defeated in a referendum in the province in 1980",
        },
        {
          id: "mc-020",
          biteId: "modern-canada.quebec.5",
          kind: "truefalse",
          prompt: "The Constitution was amended in 1982 with the agreement of Quebec.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "The Constitution was amended in 1982 without Quebec's agreement.",
          evidence: "in 1982 the Constitution was amended without the agreement of Quebec",
        },
        {
          id: "mc-021",
          biteId: "modern-canada.quebec.5",
          kind: "choice",
          prompt: "What happened in the second Quebec referendum of 1995?",
          options: [
            "Quebec left the Canadian union",
            "Sovereignty was again defeated",
            "The Constitution was replaced",
            "A third referendum was called",
          ],
          correctIndex: 1,
          rationale: "Sovereignty was defeated again in 1995.",
          evidence: "sovereignty was again defeated in a second referendum in 1995",
          caveat: "The guide was written in 2012 and covers referendums up to 1995.",
        },
      ],
    },
    {
      id: "modern-canada.changing-society",
      moduleId: "modern-canada",
      title: "A changing society",
      summary: "Who won the vote, the refugees Canada welcomed, and multiculturalism.",
      minutes: 6,
      source: chapterUrl("modernCanada"),
      bites: [
        {
          id: "modern-canada.changing-society.1",
          title: "A more flexible and open society",
          body: "Over more than 50 years, social values changed and Canada became a more flexible and open society. More people went to high school, college and university, and more women entered professional work.",
          takeaway:
            "Canada became more open, with more education and more women in professional work.",
          evidence:
            "As social values changed over more than 50 years, Canada became a more flexible and open society.",
        },
        {
          id: "modern-canada.changing-society.2",
          title: "1948: Japanese Canadians get the vote",
          body: "Most Canadians of Asian descent were long denied the vote in federal and provincial elections. Japanese Canadians were the last of these groups to win it, in 1948.",
          takeaway: "Japanese Canadians were the last Asian group to win the vote, in 1948.",
          evidence: "In 1948 the last of these, the Japanese-Canadians, gained the right to vote.",
        },
        {
          id: "modern-canada.changing-society.3",
          title: "1960: the vote for Aboriginal people",
          body: "Aboriginal people won the right to vote in 1960. Today every Canadian citizen over the age of 18 may vote.",
          takeaway: "Aboriginal people got the vote in 1960. Today every citizen over 18 may vote.",
          evidence: "Aboriginal people were granted the vote in 1960.",
        },
        {
          id: "modern-canada.changing-society.4",
          title: "Refugees from Communist oppression",
          body: "Canada welcomed thousands of refugees fleeing Communism. About 37,000 fled Soviet rule in Hungary in 1956. After the Communists won the Vietnam War in 1975, over 50,000 Vietnamese found refuge in Canada.",
          takeaway: "About 37,000 Hungarians in 1956, over 50,000 Vietnamese after 1975.",
          evidence:
            "Canada welcomed thousands of refugees from Communist oppression, including about 37,000 who escaped Soviet tyranny in Hungary in 1956.",
        },
        {
          id: "modern-canada.changing-society.5",
          title: "Multiculturalism gains ground",
          body: "Multiculturalism grew out of immigration in the 1800s and 1900s. By the 1960s, one-third of Canadians had origins that were neither British nor French, and many were proud to keep their culture. Today diversity enriches Canadian life, especially in the cities.",
          takeaway:
            "By the 1960s, one-third of Canadians were neither British nor French in origin.",
          evidence:
            "By the 1960s, one-third of Canadians had origins that were neither British nor French",
        },
      ],
      teach: {
        prompt: "Describe how Canadian society opened up from 1948 on, with dates and numbers.",
        checklist: [
          "Japanese Canadians got the vote in 1948, Aboriginal people in 1960",
          "Today every citizen over 18 may vote",
          "About 37,000 Hungarians in 1956, over 50,000 Vietnamese after 1975",
          "By the 1960s, one-third of Canadians were neither British nor French in origin",
        ],
        probe: "Which came first: the vote for Aboriginal people, or the Hungarian refugees?",
      },
      test: [
        {
          id: "mc-022",
          biteId: "modern-canada.changing-society.2",
          kind: "choice",
          prompt: "Which group of Asian descent was the last to win the vote?",
          options: ["Chinese-Canadians", "Korean-Canadians", "Japanese-Canadians", "South Asians"],
          correctIndex: 2,
          rationale: "Japanese Canadians were the last, in 1948.",
          evidence: "In 1948 the last of these, the Japanese-Canadians, gained the right to vote.",
        },
        {
          id: "mc-023",
          biteId: "modern-canada.changing-society.3",
          kind: "choice",
          prompt: "In which year were Aboriginal people granted the vote?",
          options: ["1921", "1960", "1949", "1975"],
          correctIndex: 1,
          rationale:
            "Aboriginal people won the vote in 1960. 1948 is when Japanese Canadians won it.",
          evidence: "Aboriginal people were granted the vote in 1960.",
        },
        {
          id: "mc-024",
          biteId: "modern-canada.changing-society.3",
          kind: "truefalse",
          prompt: "The voting age in Canada is 21.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "Every citizen over 18 may vote.",
          evidence: "Today every citizen over the age of 18 may vote.",
        },
        {
          id: "mc-025",
          biteId: "modern-canada.changing-society.4",
          kind: "choice",
          prompt: "About how many Hungarian refugees did Canada welcome in 1956?",
          options: ["17,000", "37,000", "57,000", "73,000"],
          correctIndex: 1,
          rationale: "About 37,000 Hungarians fled Soviet rule and came to Canada in 1956.",
          evidence: "including about 37,000 who escaped Soviet tyranny in Hungary in 1956",
        },
        {
          id: "mc-026",
          biteId: "modern-canada.changing-society.4",
          kind: "choice",
          prompt:
            "After the Vietnam War ended in 1975, how many Vietnamese found refuge in Canada?",
          options: ["Under 10,000", "About 25,000", "Nearly 100,000", "Over 50,000"],
          correctIndex: 3,
          rationale:
            "Over 50,000 Vietnamese found refuge in Canada. The 37,000 figure is Hungary in 1956.",
          evidence:
            "With the Communist victory in the Vietnam War in 1975, many Vietnamese fled, including over 50,000 who sought refuge in Canada.",
        },
        {
          id: "mc-027",
          biteId: "modern-canada.changing-society.5",
          kind: "choice",
          prompt:
            "By the 1960s, what share of Canadians had origins that were neither British nor French?",
          options: ["One-third", "Two-thirds", "One-half", "One-quarter"],
          correctIndex: 0,
          rationale:
            "By the 1960s, one-third of Canadians had origins that were neither British nor French.",
          evidence: "one-third of Canadians had origins that were neither British nor French",
        },
        {
          id: "mc-028",
          biteId: "modern-canada.changing-society.1",
          kind: "truefalse",
          prompt: "As social values changed, more women entered professional work.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "More education and more women in professional work were two of the big changes.",
          evidence: "a growing number of women entered the professional work force",
        },
      ],
    },
    {
      id: "modern-canada.arts-and-inventions",
      moduleId: "modern-canada",
      title: "Arts, sport and inventions",
      summary:
        "Writers and painters, sport, Terry Fox and Rick Hansen, insulin, and Canadian inventions.",
      minutes: 11,
      source: chapterUrl("modernCanada"),
      bites: [
        {
          id: "modern-canada.arts-and-inventions.1",
          title: "Writers, musicians and film-makers",
          body: "Canadians have made major contributions to literature in English and French. Writers include Stephen Leacock, Louis Hémon, Charles G.D. Roberts, Pauline Johnson, Émile Nelligan, Robertson Davies, Margaret Laurence and Mordecai Richler, and later Joy Kogawa, Michael Ondaatje and Rohinton Mistry. Ernest MacMillan and Healey Willan became renowned musicians. Canada has regional theatres and world-famous performing arts companies. Denys Arcand's films won international awards, and Norman Jewison and Atom Egoyan are also well known.",
          takeaway:
            "Canadian literature is strong in English and French. Denys Arcand's films won international awards.",
          evidence:
            "Canadians have made significant contributions to literature in English and in French.",
        },
        {
          id: "modern-canada.arts-and-inventions.2",
          title: "The Group of Seven and others",
          body: "In painting, Canada is best known for the Group of Seven, founded in 1920, who created a style to capture the rugged wilderness. Emily Carr painted West Coast forests and Aboriginal artifacts. In the 1950s Les Automatistes of Quebec pioneered abstract art. Louis-Philippe Hébert sculpted historical figures, and Kenojuak Ashevak pioneered modern Inuit art.",
          takeaway: "The Group of Seven, founded in 1920, painted the rugged wilderness.",
          evidence:
            "the Group of Seven, founded in 1920, who developed a style of painting to capture the rugged wilderness landscapes",
        },
        {
          id: "modern-canada.arts-and-inventions.3",
          title: "Sport",
          body: 'Ice hockey is Canada\'s national sport, and Canadian teams have dominated the world. James Naismith, a Canadian, invented basketball in 1891. In 1972 Paul Henderson scored the winning goal against the Soviets, "the goal heard around the world". Wayne Gretzky played for the Edmonton Oilers from 1979 to 1988. Donovan Bailey won two Olympic golds in 1996, and Chantal Petitclerc became a Paralympic champion wheelchair racer. Canadian football teams play for the Grey Cup, donated by Governor General Lord Grey in 1909.',
          takeaway:
            "Hockey is the national sport, and Canadian James Naismith invented basketball in 1891.",
          evidence: "in the national sport of ice hockey, Canadian teams have dominated the world",
        },
        {
          id: "modern-canada.arts-and-inventions.4",
          title: "Terry Fox and Rick Hansen",
          body: "In 1980 Terry Fox, a British Columbian who lost his right leg to cancer at 18, began the Marathon of Hope, a run across Canada to raise money for cancer research. He died of cancer before finishing, but runs in his name raise money every year. In 1985 Rick Hansen went around the world in a wheelchair to raise money for spinal cord research.",
          takeaway:
            "Terry Fox ran the Marathon of Hope for cancer research. Rick Hansen wheeled around the world for spinal cord research.",
          evidence:
            'In 1980, Terry Fox, a British Columbian who lost his right leg to cancer at the age of 18, began a cross-country run, the "Marathon of Hope,"',
        },
        {
          id: "modern-canada.arts-and-inventions.5",
          title: "Science and space",
          body: "Sir Frederick Banting of Toronto and Charles Best discovered insulin, a hormone that treats diabetes. Marshall McLuhan and Harold Innis were pioneer thinkers about communication. Since 1989 the Canadian Space Agency and Canadian astronauts have explored space, often using the Canadian-built Canadarm. Nobel Prize-winning Canadian scientists include Gerhard Herzberg, John Polanyi, Sidney Altman, Richard E. Taylor, Michael Smith and Bertram Brockhouse.",
          takeaway:
            "Banting and Best discovered insulin. The Canadian Space Agency has worked in space since 1989.",
          evidence:
            "Sir Frederick Banting of Toronto and Charles Best discovered Insulin, a hormone to treat diabetes",
        },
        {
          id: "modern-canada.arts-and-inventions.6",
          title: "Canadian inventions",
          body: "Alexander Graham Bell came up with the telephone at his summer home in Canada. Joseph-Armand Bombardier invented the snowmobile. Sir Sandford Fleming invented standard time zones. Mathew Evans and Henry Woodward invented the first electric light bulb and sold the patent to Thomas Edison. Reginald Fessenden sent the first wireless voice message. Dr. Wilder Penfield was a pioneering brain surgeon, Dr. John A. Hopps invented the first cardiac pacemaker, and Research in Motion made the BlackBerry.",
          takeaway:
            "Bell's telephone, Bombardier's snowmobile, Fleming's time zones, Evans and Woodward's light bulb.",
          evidence:
            "Joseph-Armand Bombardier - invented the snowmobile, a light-weight winter vehicle.",
        },
      ],
      teach: {
        prompt:
          "Name five Canadian achievements in the arts, sport, science or invention, with a date for at least two.",
        checklist: [
          "The Group of Seven, founded in 1920, painted wilderness landscapes",
          "James Naismith invented basketball in 1891; ice hockey is the national sport",
          "Terry Fox's Marathon of Hope, 1980; Rick Hansen's world tour, 1985",
          "Banting and Best discovered insulin; Bombardier invented the snowmobile; Fleming invented time zones",
        ],
        probe:
          "Who invented the light bulb first: Edison, or the two Canadians who sold him the patent?",
      },
      test: [
        {
          id: "mc-029",
          biteId: "modern-canada.arts-and-inventions.1",
          kind: "choice",
          prompt: "In which two languages have Canadians made major contributions to literature?",
          options: [
            "French and Spanish",
            "English and French",
            "English and Inuktitut",
            "French and German",
          ],
          correctIndex: 1,
          rationale: "Canadian literature is strong in both English and French.",
          evidence: "significant contributions to literature in English and in French",
        },
        {
          id: "mc-030",
          biteId: "modern-canada.arts-and-inventions.2",
          kind: "choice",
          prompt: "What were the Group of Seven, founded in 1920, best known for?",
          options: [
            "Pioneering modern abstract art",
            "Writing novels in English and French",
            "Painting rugged wilderness landscapes",
            "Sculpting historical figures",
          ],
          correctIndex: 2,
          rationale:
            "The Group of Seven painted the rugged wilderness. Hébert sculpted, and Les Automatistes pioneered abstract art.",
          evidence: "who developed a style of painting to capture the rugged wilderness landscapes",
        },
        {
          id: "mc-031",
          biteId: "modern-canada.arts-and-inventions.3",
          kind: "choice",
          prompt: "In what year did Canadian James Naismith invent basketball?",
          options: ["1909", "1867", "1920", "1891"],
          correctIndex: 3,
          rationale:
            "Naismith invented basketball in 1891. The Grey Cup dates from 1909 and the Group of Seven from 1920.",
          evidence: "Basketball was invented by Canadian James Naismith in 1891.",
        },
        {
          id: "mc-032",
          biteId: "modern-canada.arts-and-inventions.3",
          kind: "choice",
          prompt: "What is Canada's national sport?",
          options: ["Curling", "Soccer", "Baseball", "Ice hockey"],
          correctIndex: 3,
          rationale:
            "Ice hockey is the national sport, and Canadian teams have dominated the world.",
          evidence: "in the national sport of ice hockey, Canadian teams have dominated the world",
          caveat:
            "The guide's answer is what the test asks. A federal law, the National Sports of Canada Act (1994), names hockey the national winter sport and lacrosse the national summer sport.",
        },
        {
          id: "mc-033",
          biteId: "modern-canada.arts-and-inventions.4",
          kind: "choice",
          prompt: "What was the name of Terry Fox's cross-country run?",
          options: [
            "The Marathon of Hope",
            "The Longest Run",
            "The Freedom Train",
            "The Coast to Coast Trek",
          ],
          correctIndex: 0,
          rationale: "Terry Fox's 1980 run was the Marathon of Hope, for cancer research.",
          evidence:
            'began a cross-country run, the "Marathon of Hope," to raise money for cancer research',
        },
        {
          id: "mc-034",
          biteId: "modern-canada.arts-and-inventions.5",
          kind: "choice",
          prompt: "Insulin, discovered by Banting and Best, treats which condition?",
          options: ["Polio", "Diabetes", "Arthritis", "Cancer"],
          correctIndex: 1,
          rationale:
            "Insulin is a hormone that treats diabetes. The guide says it has saved 16 million lives.",
          evidence:
            "discovered Insulin, a hormone to treat diabetes that has saved 16 million lives",
          caveat:
            "The 16 million figure is the guide's, from 2012. Keep it for the test; the real total today is higher.",
        },
        {
          id: "mc-035",
          biteId: "modern-canada.arts-and-inventions.6",
          kind: "choice",
          prompt: "What did Joseph-Armand Bombardier invent?",
          options: ["Radio", "Telephone", "The snowmobile", "Pacemaker"],
          correctIndex: 2,
          rationale:
            "Bombardier invented the snowmobile. Hopps invented the pacemaker and Bell the telephone.",
          evidence:
            "Joseph-Armand Bombardier - invented the snowmobile, a light-weight winter vehicle.",
        },
      ],
    },
  ],
};

export default module;
