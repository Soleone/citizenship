import type { Module } from "../types.ts";
import { chapterUrl } from "../sources.ts";

/**
 * Built only from the Canada's Economy chapter. The chapter has two headings,
 * "A Trading Nation" and "Canada's Economy Includes Three Main Types of
 * Industries", plus a closing passage on trade with the United States. It says
 * nothing about wages, employers or unions, so session 3 teaches the passage
 * that is there instead. Every answer follows the 2012 guide, and a `caveat`
 * flags the trade facts that have visibly aged.
 */
const module: Module = {
  id: "economy",
  order: 10,
  title: "Canada's economy",
  guideChapter: "Canada's Economy",
  corpus: ["canadas-economy"],
  summary: "Trade, the three types of industry, and the U.S. relationship.",
  mission:
    "Name the three types of industry, say where most Canadians work, and give the key trade facts.",
  icon: "factory",
  tags: ["Trade", "Industry", "Jobs"],
  source: chapterUrl("economy"),
  testSize: 8,
  sessions: [
    {
      id: "economy.trading-nation",
      moduleId: "economy",
      title: "A trading nation",
      summary: "Why trade matters, free trade and NAFTA, and the G8.",
      minutes: 5,
      source: chapterUrl("economy"),
      bites: [
        {
          id: "economy.trading-nation.1",
          title: "Commerce is the engine",
          body: "Canada has always been a trading nation, and commerce is still the engine of its economic growth. Without trade with other countries, Canadians could not keep their standard of living.",
          takeaway: "Canada is a trading nation, and commerce is the engine of growth.",
          evidence:
            "Canada has always been a trading nation and commerce remains the engine of economic growth.",
        },
        {
          id: "economy.trading-nation.2",
          title: "1988: free trade with the United States",
          body: "In 1988, Canada enacted free trade with the United States, its largest trading partner. Mexico joined six years later.",
          takeaway: "Canada enacted free trade with the United States in 1988.",
          evidence: "In 1988, Canada enacted free trade with the United States.",
        },
        {
          id: "economy.trading-nation.3",
          title: "1994: Mexico joins, and it becomes NAFTA",
          body: "In 1994, Mexico joined Canada and the United States in a broader deal: the North American Free Trade Agreement, or NAFTA.",
          takeaway: "In 1994 Mexico joined, and the deal became NAFTA.",
          evidence:
            "Mexico became a partner in 1994 in the broader North American Free Trade Agreement (NAFTA)",
        },
        {
          id: "economy.trading-nation.4",
          title: "How big NAFTA was",
          body: "NAFTA covered over 444 million people and over $1 trillion in merchandise trade in 2008.",
          takeaway: "NAFTA: over 444 million people and over $1 trillion in trade.",
          evidence:
            "with over 444 million people and over $1 trillion in merchandise trade in 2008",
        },
        {
          id: "economy.trading-nation.5",
          title: "A top ten economy in the G8",
          body: "Canada has one of the world's ten largest economies and belongs to the G8 group of leading industrialized countries, along with the United States, Germany, the United Kingdom, Italy, France, Japan and Russia.",
          takeaway: "Canada is a top-ten economy and a member of the G8.",
          evidence: "is part of the G8 group of leading industrialized countries",
        },
      ],
      teach: {
        prompt:
          "Explain why trade matters to Canada, then give the two free trade dates and the two NAFTA numbers.",
        checklist: [
          "Commerce is the engine of growth; without trade, living standards would fall",
          "1988: free trade with the United States; 1994: Mexico joins in NAFTA",
          "Over 444 million people and over $1 trillion in trade in 2008",
          "One of the ten largest economies, and a member of the G8",
        ],
        probe: "Which came first: free trade with the U.S., or NAFTA with Mexico?",
      },
      test: [
        {
          id: "ec-001",
          biteId: "economy.trading-nation.1",
          kind: "choice",
          prompt: "What is the engine of Canada's economic growth?",
          options: ["Commerce", "Tourism", "Banking", "Retail"],
          correctIndex: 0,
          rationale:
            "Commerce is the engine of economic growth. Tourism, banking and retail are service industries.",
          evidence:
            "Canada has always been a trading nation and commerce remains the engine of economic growth.",
        },
        {
          id: "ec-002",
          biteId: "economy.trading-nation.1",
          kind: "truefalse",
          prompt: "Canadians could keep their standard of living without trade.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale:
            "Without trade with other nations, Canadians could not keep their standard of living.",
          evidence:
            "we could not maintain our standard of living without engaging in trade with other nations.",
        },
        {
          id: "ec-003",
          biteId: "economy.trading-nation.2",
          kind: "choice",
          prompt: "In what year did Canada enact free trade with the United States?",
          options: ["1982", "1988", "1994", "2008"],
          correctIndex: 1,
          rationale: "Free trade with the United States came in 1988. Mexico joined in 1994.",
          evidence: "In 1988, Canada enacted free trade with the United States.",
        },
        {
          id: "ec-004",
          biteId: "economy.trading-nation.3",
          kind: "choice",
          prompt: "Which country joined the North American Free Trade Agreement in 1994?",
          options: ["Brazil", "Mexico", "Guatemala", "Spain"],
          correctIndex: 1,
          rationale: "Mexico joined in 1994, creating NAFTA.",
          evidence:
            "Mexico became a partner in 1994 in the broader North American Free Trade Agreement (NAFTA)",
        },
        {
          id: "ec-005",
          biteId: "economy.trading-nation.4",
          kind: "choice",
          prompt: "About how many people lived in the NAFTA area?",
          options: [
            "About 144 million",
            "Over 1 billion",
            "Over 444 million",
            "Just under 300 million",
          ],
          correctIndex: 2,
          rationale: "Over 444 million people, with over $1 trillion in trade in 2008.",
          evidence:
            "with over 444 million people and over $1 trillion in merchandise trade in 2008",
          caveat:
            "These are 2008 figures from the 2012 guide, and NAFTA was later replaced by the Canada-United States-Mexico Agreement. Answer with the guide's numbers, then confirm the current ones.",
        },
        {
          id: "ec-006",
          biteId: "economy.trading-nation.5",
          kind: "choice",
          prompt: "Which country is NOT a member of the G8?",
          options: ["Japan", "Russia", "Italy", "China"],
          correctIndex: 3,
          rationale:
            "The G8 is Canada, the United States, Germany, the United Kingdom, Italy, France, Japan and Russia. China is not a member.",
          evidence:
            "the United States, Germany, the United Kingdom, Italy, France, Japan and Russia",
          caveat:
            "The guide names the G8 with Russia. Russia was suspended from the group in 2014, so it is now usually called the G7.",
        },
        {
          id: "ec-007",
          biteId: "economy.trading-nation.5",
          kind: "truefalse",
          prompt: "Canada has one of the ten largest economies in the world.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale: "Canada is one of the world's ten largest economies.",
          evidence: "Canada has one of the ten largest economies in the world",
          caveat:
            "Economy rankings move around, and the guide's figure is from 2012. The test follows the guide.",
        },
      ],
    },
    {
      id: "economy.three-types-of-industry",
      moduleId: "economy",
      title: "Three types of industry",
      summary: "Service, manufacturing and natural resources, and where Canadians work.",
      minutes: 5,
      source: chapterUrl("economy"),
      bites: [
        {
          id: "economy.three-types-of-industry.1",
          title: "The three types",
          body: "Canada's economy has three main types of industry: service, manufacturing and natural resources. Many questions ask you to sort a job or product into one of these.",
          takeaway: "Three types of industry: service, manufacturing and natural resources.",
          evidence: "Canada's Economy Includes Three Main Types of Industries:",
        },
        {
          id: "economy.three-types-of-industry.2",
          title: "Service industries",
          body: "Service industries provide thousands of different jobs in transportation, education, health care, construction, banking, communications, retail, tourism and government.",
          takeaway:
            "Service jobs: health care, education, banking, retail, tourism, government and more.",
          evidence:
            "Service industries provide thousands of different jobs in areas like transportation, education, health care, construction, banking, communications, retail services, tourism and government.",
        },
        {
          id: "economy.three-types-of-industry.3",
          title: "Where most Canadians work",
          body: "More than 75% of working Canadians now have jobs in service industries, far more than in factories or natural resources.",
          takeaway: "More than 75% of working Canadians work in services.",
          evidence: "More than 75% of working Canadians now have jobs in service industries.",
        },
        {
          id: "economy.three-types-of-industry.4",
          title: "Manufacturing industries",
          body: "Manufacturing industries make products to sell in Canada and around the world, such as paper, high-tech equipment, aerospace technology, cars, machinery, food and clothing. The United States is our largest trading partner.",
          takeaway: "Manufacturing makes products to sell in Canada and abroad.",
          evidence:
            "Manufacturing industries make products to sell in Canada and around the world.",
        },
        {
          id: "economy.three-types-of-industry.5",
          title: "Natural resources industries",
          body: "Natural resources industries include forestry, fishing, agriculture, mining and energy. They played a big part in Canada's history, many regions still depend on them, and a large share of Canada's exports are natural resources.",
          takeaway: "Natural resources: forestry, fishing, agriculture, mining and energy.",
          evidence:
            "Natural resources industries include forestry, fishing, agriculture, mining and energy.",
        },
      ],
      teach: {
        prompt:
          "Name the three types of industry with two examples each, and say what share of Canadians work in services.",
        checklist: [
          "Service, manufacturing and natural resources",
          "More than 75% of working Canadians are in services",
          "Manufacturing: paper, cars, machinery, food, clothing",
          "Natural resources: forestry, fishing, agriculture, mining, energy",
          "Natural resources make up a large share of exports",
        ],
        probe: "Which type employs most Canadians, and which supplies a large share of exports?",
      },
      test: [
        {
          id: "ec-008",
          biteId: "economy.three-types-of-industry.1",
          kind: "choice",
          prompt: "Which of these is NOT one of the three main types of industry?",
          options: [
            "Import brokerage industries",
            "Service industries",
            "Manufacturing industries",
            "Natural resources industries",
          ],
          correctIndex: 0,
          rationale: "The three are service, manufacturing and natural resources.",
          evidence: "Canada's Economy Includes Three Main Types of Industries:",
        },
        {
          id: "ec-009",
          biteId: "economy.three-types-of-industry.2",
          kind: "choice",
          prompt: "Which of these is NOT a service industry?",
          options: ["Government", "Automobile manufacturing", "Transportation", "Banking"],
          correctIndex: 1,
          rationale:
            "Car making is manufacturing. Services include transportation, banking, health care and government.",
          evidence:
            "Service industries provide thousands of different jobs in areas like transportation, education, health care, construction, banking, communications, retail services, tourism and government.",
        },
        {
          id: "ec-010",
          biteId: "economy.three-types-of-industry.3",
          kind: "choice",
          prompt: "About what share of working Canadians have jobs in service industries?",
          options: ["About 10%", "Less than 25%", "More than 75%", "About 50%"],
          correctIndex: 2,
          rationale: "More than 75% of working Canadians are in service industries.",
          evidence: "More than 75% of working Canadians now have jobs in service industries.",
        },
        {
          id: "ec-011",
          biteId: "economy.three-types-of-industry.4",
          kind: "choice",
          prompt: "What do manufacturing industries do?",
          options: [
            "They resell goods bought from other countries",
            "They provide services to government and households",
            "They extract raw materials from the land and sea",
            "They make products to sell in Canada and around the world",
          ],
          correctIndex: 3,
          rationale:
            "They make products to sell in Canada and around the world. Extracting raw materials is natural resources.",
          evidence:
            "Manufacturing industries make products to sell in Canada and around the world.",
        },
        {
          id: "ec-012",
          biteId: "economy.three-types-of-industry.4",
          kind: "choice",
          prompt: "Which of these is NOT a manufactured product?",
          options: ["Coal", "Clothing", "Machinery", "Paper"],
          correctIndex: 0,
          rationale:
            "Coal comes from mining, a natural resources industry. Paper, machinery and clothing are manufactured.",
          evidence:
            "Manufactured products include paper, high technology equipment, aerospace technology, automobiles, machinery, food, clothing and many other goods.",
        },
        {
          id: "ec-013",
          biteId: "economy.three-types-of-industry.5",
          kind: "choice",
          prompt: "Which of these are natural resources industries?",
          options: [
            "Textiles, shipbuilding and steelmaking",
            "Forestry, fishing, agriculture, mining and energy",
            "Transportation, banking, communications and tourism",
            "Paper, machinery, food and clothing",
          ],
          correctIndex: 1,
          rationale:
            "Natural resources industries include forestry, fishing, agriculture, mining and energy.",
          evidence:
            "Natural resources industries include forestry, fishing, agriculture, mining and energy.",
        },
        {
          id: "ec-014",
          biteId: "economy.three-types-of-industry.5",
          kind: "truefalse",
          prompt: "Natural resources make up only a small share of Canada's exports.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "A large share of Canada's exports are natural resources.",
          evidence: "a large percentage of Canada's exports are natural resources commodities",
        },
      ],
    },
    {
      id: "economy.trade-with-the-united-states",
      moduleId: "economy",
      title: "Trade with the United States",
      summary: "The largest trading partner, exports, the undefended border and the Peace Arch.",
      minutes: 5,
      source: chapterUrl("economy"),
      bites: [
        {
          id: "economy.trade-with-the-united-states.1",
          title: "Each other's largest partner",
          body: "Canada and the United States have close relations, and each is the other's largest trading partner.",
          takeaway: "Canada and the U.S. are each other's largest trading partner.",
          evidence:
            "Canada enjoys close relations with the United States and each is the other's largest trading partner.",
        },
        {
          id: "economy.trade-with-the-united-states.2",
          title: "Three-quarters of exports",
          body: "Over three-quarters of Canadian exports go to the United States. No other market comes close.",
          takeaway: "Over three-quarters of Canada's exports go to the U.S.",
          evidence: "Over three-quarters of Canadian exports are destined for the U.S.A.",
        },
        {
          id: "economy.trade-with-the-united-states.3",
          title: "The biggest bilateral relationship",
          body: "Canada-U.S. trade is the biggest bilateral (two-country) trading relationship in the world. Supply chains that span both countries compete together against the rest of the world.",
          takeaway: "Canada-U.S. trade is the biggest two-way trading relationship in the world.",
          evidence: "In fact we have the biggest bilateral trading relationship in the world.",
        },
        {
          id: "economy.trade-with-the-united-states.4",
          title: "What Canada sends abroad",
          body: "Every year Canada exports billions of dollars of energy products, industrial goods, machinery and equipment, cars and car parts, farm, fish and forest products, and consumer goods.",
          takeaway:
            "Canada exports energy, machinery, cars, farm, fish and forest products, and consumer goods.",
          evidence:
            "Canada exports billions of dollars worth of energy products, industrial goods, machinery, equipment, automotive, agricultural, fishing and forestry products, and consumer goods every year.",
        },
        {
          id: "economy.trade-with-the-united-states.5",
          title: "The undefended border and the Peace Arch",
          body: 'Every year, millions of Canadians and Americans safely cross what is traditionally called the world\'s longest undefended border. At Blaine, Washington, the Peace Arch bears the words "children of a common mother" and "brethren dwelling together in unity".',
          takeaway:
            "The world's longest undefended border, marked by the Peace Arch at Blaine, Washington.",
          evidence: 'what is traditionally known as "the world\'s longest undefended border."',
        },
      ],
      teach: {
        prompt:
          "Describe Canada's trade with the United States with the key numbers, then say what the Peace Arch marks.",
        checklist: [
          "Each country is the other's largest trading partner",
          "Over three-quarters of Canadian exports go to the U.S.",
          "It is the biggest two-way trading relationship in the world",
          "The Peace Arch at Blaine, Washington, on the world's longest undefended border",
        ],
        probe: "In which town and state is the Peace Arch?",
      },
      test: [
        {
          id: "ec-015",
          biteId: "economy.trade-with-the-united-states.1",
          kind: "choice",
          prompt: "What is Canada's largest international trading partner?",
          options: ["Japan", "Mexico", "The United States", "Germany"],
          correctIndex: 2,
          rationale: "The United States. Each is the other's largest trading partner.",
          evidence: "Our largest international trading partner is the United States.",
        },
        {
          id: "ec-016",
          biteId: "economy.trade-with-the-united-states.2",
          kind: "choice",
          prompt: "What share of Canadian exports go to the United States?",
          options: ["About one half", "Nearly all", "Less than a quarter", "Over three-quarters"],
          correctIndex: 3,
          rationale: "Over three-quarters of Canadian exports are destined for the U.S.A.",
          evidence: "Over three-quarters of Canadian exports are destined for the U.S.A.",
          caveat:
            "This is the guide's 2012 figure. Canada now ships a smaller share of exports to the United States, but the test follows the guide.",
        },
        {
          id: "ec-017",
          biteId: "economy.trade-with-the-united-states.3",
          kind: "truefalse",
          prompt: "Canada-U.S. trade is the biggest bilateral trading relationship in the world.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "Canada-U.S.A. trade is the biggest bilateral trading relationship in the world.",
          evidence: "In fact we have the biggest bilateral trading relationship in the world.",
          caveat:
            "The guide was written in 2012, and other trade relationships have grown since. Answer as the guide does.",
        },
        {
          id: "ec-018",
          biteId: "economy.trade-with-the-united-states.3",
          kind: "choice",
          prompt: "What do integrated Canada-U.S. supply chains do?",
          options: [
            "They compete with the rest of the world",
            "They are run by provincial trade offices",
            "They replaced Canadian manufacturing",
            "They are limited to raw materials",
          ],
          correctIndex: 0,
          rationale: "Integrated Canada-U.S. supply chains compete with the rest of the world.",
          evidence: "Integrated Canada-U.S.A. supply chains compete with the rest of the world.",
        },
        {
          id: "ec-019",
          biteId: "economy.trade-with-the-united-states.4",
          kind: "choice",
          prompt: "Which of these is NOT listed among Canada's yearly exports?",
          options: ["Energy products", "Commercial aircraft", "Consumer goods", "Machinery"],
          correctIndex: 1,
          rationale:
            "Canada's exports include energy, industrial goods, machinery, cars, farm, fish and forest products, and consumer goods. Aircraft are not on the list.",
          evidence:
            "Canada exports billions of dollars worth of energy products, industrial goods, machinery, equipment, automotive, agricultural, fishing and forestry products, and consumer goods every year.",
        },
        {
          id: "ec-020",
          biteId: "economy.trade-with-the-united-states.5",
          kind: "choice",
          prompt: "What is the Canada-U.S. border traditionally called?",
          options: [
            "The world's longest fortified border",
            "The world's longest undefended border",
            "The world's most heavily guarded border",
            "The world's oldest patrolled border",
          ],
          correctIndex: 1,
          rationale: "It is traditionally called the world's longest undefended border.",
          evidence:
            'Millions of Canadians and Americans cross every year and in safety what is traditionally known as "the world\'s longest undefended border."',
        },
        {
          id: "ec-021",
          biteId: "economy.trade-with-the-united-states.5",
          kind: "choice",
          prompt: "Which words are inscribed on the Peace Arch at Blaine, Washington?",
          options: [
            "Freedom under one crown",
            "E pluribus unum",
            "Unity through diversity",
            "Children of a common mother",
          ],
          correctIndex: 3,
          rationale:
            'The Peace Arch reads "children of a common mother" and "brethren dwelling together in unity".',
          evidence:
            'the Peace Arch, inscribed with the words "children of a common mother" and "brethren dwelling together in unity," symbolizes our close ties and common interests.',
        },
      ],
    },
  ],
};

export default module;
