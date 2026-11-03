import type { Module } from "../types.ts";
import { chapterUrl } from "../sources.ts";

/**
 * Canada's Regions. Every fact here comes from the chapter text in
 * `data/corpus/canadas-regions.txt`, including the guide's own region table,
 * which is the only place several capitals are named. Where the 2012 guide
 * gives a population figure or a count of officeholders, the answer follows the
 * guide and a `caveat` tells the learner to confirm the live number.
 */
const module: Module = {
  id: "regions",
  order: 11,
  title: "Canada's regions",
  guideChapter: "Canada's Regions",
  corpus: ["canadas-regions"],
  summary: "Five regions, ten provinces, three territories, and what each one is known for.",
  mission: "Name every province and territory with its capital, and the key facts about each.",
  icon: "mountain",
  tags: ["Geography", "Provinces", "Territories"],
  source: chapterUrl("regions"),
  testSize: 12,
  sessions: [
    {
      id: "regions.overview",
      moduleId: "regions",
      title: "Size, regions and population",
      summary: "How big Canada is, the five regions, the capital, and the population.",
      minutes: 6,
      source: chapterUrl("regions"),
      bites: [
        {
          id: "regions.overview.1",
          title: "Second largest country",
          body: "Canada is the second largest country on earth, at 10 million square kilometres. It has three ocean coasts: the Pacific to the west, the Atlantic to the east and the Arctic to the north. To the south is the border with the United States.",
          takeaway: "Second largest country, 10 million square kilometres, three oceans.",
          evidence: "Canada is the second largest country on earth - 10 million square kilometres.",
        },
        {
          id: "regions.overview.2",
          title: "Five regions, ten provinces, three territories",
          body: "Canada has five regions: the Atlantic Provinces, Central Canada, the Prairie Provinces, the West Coast and the Northern Territories. It has ten provinces and three territories, each with its own capital. Know the capital of Canada and of your own province or territory.",
          takeaway: "Five regions, ten provinces, three territories, each with a capital.",
          evidence: "Canada includes many different geographical areas and five distinct regions.",
        },
        {
          id: "regions.overview.3",
          title: "Ottawa, chosen in 1857",
          body: "Ottawa, on the Ottawa River, was chosen as the capital in 1857 by Queen Victoria, great-great-grandmother of Queen Elizabeth II. It is Canada's fourth largest metropolitan area.",
          takeaway: "Queen Victoria chose Ottawa as the capital in 1857.",
          evidence:
            "Ottawa, located on the Ottawa River, was chosen as the capital in 1857 by Queen Victoria",
        },
        {
          id: "regions.overview.4",
          title: "The National Capital Region",
          body: "The National Capital Region covers 4,700 square kilometres around Ottawa. It exists to protect and improve the area's heritage buildings and natural environment.",
          takeaway: "The National Capital Region covers 4,700 square kilometres around Ottawa.",
          evidence: "The National Capital Region, 4,700 square kilometres surrounding Ottawa",
        },
        {
          id: "regions.overview.5",
          title: "About 34 million people",
          body: "Canada has about 34 million people. Most live in cities, but Canadians also live in small towns, rural areas and everywhere in between.",
          takeaway: "About 34 million people, most of them in cities.",
          evidence:
            "Canada has a population of about 34 million people. While the majority live in cities",
        },
      ],
      teach: {
        prompt:
          "Without looking, say how big Canada is, name the five regions, and give two facts about Ottawa.",
        checklist: [
          "Second largest country on earth, 10 million square kilometres",
          "Pacific to the west, Atlantic to the east, Arctic to the north",
          "Atlantic Provinces, Central Canada, Prairie Provinces, West Coast, Northern Territories",
          "Queen Victoria chose Ottawa in 1857; the National Capital Region is 4,700 square kilometres",
        ],
        probe: "Which ocean is on the west coast, and which on the east?",
      },
      test: [
        {
          id: "rg-001",
          biteId: "regions.overview.2",
          kind: "choice",
          prompt: "How many regions does Canada have?",
          options: ["Five", "Three", "Four", "Six"],
          correctIndex: 0,
          rationale:
            "Five: the Atlantic Provinces, Central Canada, the Prairie Provinces, the West Coast and the Northern Territories.",
          evidence: "Canada includes many different geographical areas and five distinct regions.",
        },
        {
          id: "rg-002",
          biteId: "regions.overview.1",
          kind: "choice",
          prompt: "Which ocean is on Canada's west coast?",
          options: ["Atlantic", "Pacific", "Indian", "Arctic"],
          correctIndex: 1,
          rationale:
            "The Pacific is to the west, the Atlantic to the east and the Arctic to the north.",
          evidence: "the Pacific Ocean in the west, the Atlantic Ocean in the east",
        },
        {
          id: "rg-003",
          biteId: "regions.overview.1",
          kind: "choice",
          prompt: "How big is Canada?",
          options: [
            "3 million square kilometres",
            "18 million square kilometres",
            "10 million square kilometres",
            "1 million square kilometres",
          ],
          correctIndex: 2,
          rationale: "Canada is 10 million square kilometres, the second largest country on earth.",
          evidence: "Canada is the second largest country on earth - 10 million square kilometres.",
        },
        {
          id: "rg-004",
          biteId: "regions.overview.1",
          kind: "truefalse",
          prompt: "Canada is the largest country in the world.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "Canada is the second largest country on earth.",
          evidence: "Canada is the second largest country on earth",
        },
        {
          id: "rg-005",
          biteId: "regions.overview.3",
          kind: "truefalse",
          prompt: "Queen Victoria chose Ottawa as the capital of Canada in 1857.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale: "Queen Victoria chose Ottawa in 1857, ten years before Confederation.",
          evidence: "was chosen as the capital in 1857 by Queen Victoria",
        },
        {
          id: "rg-006",
          biteId: "regions.overview.4",
          kind: "choice",
          prompt: "About how large is the National Capital Region around Ottawa?",
          options: [
            "470 square kilometres",
            "44,000 square kilometres",
            "4.4 million square kilometres",
            "4,700 square kilometres",
          ],
          correctIndex: 3,
          rationale: "The National Capital Region covers 4,700 square kilometres around Ottawa.",
          evidence: "The National Capital Region, 4,700 square kilometres surrounding Ottawa",
        },
        {
          id: "rg-007",
          biteId: "regions.overview.2",
          kind: "truefalse",
          prompt: "Canada has ten provinces and three territories.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale: "Canada has ten provinces and three territories, each with its own capital.",
          evidence:
            "Canada has ten provinces and three territories. Each province and territory has its own capital city.",
        },
        {
          id: "rg-008",
          biteId: "regions.overview.5",
          kind: "choice",
          prompt: "What is Canada's population?",
          options: ["About 34 million", "About 14 million", "About 24 million", "About 54 million"],
          correctIndex: 0,
          rationale: "About 34 million, most of them in cities.",
          evidence: "Canada has a population of about 34 million people.",
          caveat:
            "This is the guide's 2012 figure, and Canada's population is now larger. Answer as the guide states it, but confirm the current number on Canada.ca.",
        },
      ],
    },
    {
      id: "regions.atlantic-provinces",
      moduleId: "regions",
      title: "The Atlantic provinces",
      summary: "Newfoundland and Labrador, Prince Edward Island, Nova Scotia and New Brunswick.",
      minutes: 8,
      source: chapterUrl("regions"),
      bites: [
        {
          id: "regions.atlantic-provinces.1",
          title: "Atlantic Canada",
          body: "Atlantic Canada is four provinces: Newfoundland and Labrador (capital St. John's), Prince Edward Island (Charlottetown), Nova Scotia (Halifax) and New Brunswick (Fredericton). Fishing, farming, forestry and mining shaped its history. The ocean brings cool winters and cool, humid summers.",
          takeaway: "Four Atlantic provinces, built on fishing, farming, forestry and mining.",
          evidence:
            "Atlantic Canada's coasts and natural resources, including fishing, farming, forestry and mining",
        },
        {
          id: "regions.atlantic-provinces.2",
          title: "Newfoundland and Labrador",
          body: "Newfoundland and Labrador is the most easterly point in North America and has its own time zone. It is the oldest colony of the British Empire, known for its fisheries, coastal villages and distinct culture. Today offshore oil and gas are a big part of the economy, and Labrador has huge hydro-electric resources.",
          takeaway:
            "The most easterly point in North America and the oldest colony of the British Empire.",
          evidence:
            "Newfoundland and Labrador is the most easterly point in North America and has its own time zone.",
        },
        {
          id: "regions.atlantic-provinces.3",
          title: "Prince Edward Island",
          body: "P.E.I. is the smallest province, known for beaches, red soil and potatoes. It is the birthplace of Confederation, and the Confederation Bridge, one of the longest in the world, links it to the mainland. Lucy Maud Montgomery set Anne of Green Gables there.",
          takeaway: "The smallest province and the birthplace of Confederation.",
          evidence:
            "Prince Edward Island (P.E.I.) is the smallest province, known for its beaches, red soil and agriculture, especially potatoes.",
        },
        {
          id: "regions.atlantic-provinces.4",
          title: "Nova Scotia",
          body: "Nova Scotia is the most populous Atlantic province, long the gateway to Canada. The Bay of Fundy has the world's highest tides. Halifax, the capital, is Canada's largest east coast port, deep-water and ice-free, and home to its largest naval base. Shipbuilding, fishing, coal mining and offshore oil and gas are part of its story, and Celtic and Gaelic traditions keep its culture lively.",
          takeaway:
            "The Bay of Fundy has the world's highest tides. Halifax is the largest east coast port.",
          evidence: "Known for the world's highest tides in the Bay of Fundy",
        },
        {
          id: "regions.atlantic-provinces.5",
          title: "New Brunswick",
          body: "New Brunswick, in the Appalachian mountains, was founded by the United Empire Loyalists. Its main industries are forestry, farming, fishing, mining, food processing and tourism. Saint John is its largest city and port, Moncton is the main Acadian centre, and Fredericton is the capital. It is the only officially bilingual province, and about one-third of its people live and work in French.",
          takeaway:
            "New Brunswick: the only bilingual province. Capital Fredericton, largest city Saint John.",
          evidence:
            "New Brunswick is the only officially bilingual province, and about one-third of the population lives and works in French.",
        },
      ],
      teach: {
        prompt: "Name the four Atlantic provinces and their capitals, with one key fact for each.",
        checklist: [
          "Newfoundland and Labrador, St. John's: the oldest colony of the British Empire",
          "Prince Edward Island, Charlottetown: the smallest province and birthplace of Confederation",
          "Nova Scotia, Halifax: the world's highest tides in the Bay of Fundy",
          "New Brunswick, Fredericton: the only officially bilingual province",
        ],
        probe: "Which Atlantic province's largest city is Saint John?",
      },
      test: [
        {
          id: "rg-009",
          biteId: "regions.atlantic-provinces.1",
          kind: "choice",
          prompt: "What is the capital of Newfoundland and Labrador?",
          options: ["Gander", "St. John's", "Corner Brook", "Grand Falls"],
          correctIndex: 1,
          rationale: "St. John's is the capital. The others are towns in the province.",
          evidence:
            "Atlantic region - Newfoundland and Labrador - Prince Edward Island - Nova Scotia - New Brunswick - St. John's - Charlottetown - Halifax - Fredericton",
        },
        {
          id: "rg-010",
          biteId: "regions.atlantic-provinces.2",
          kind: "truefalse",
          prompt: "Newfoundland and Labrador is the newest colony of the British Empire.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "It is the oldest colony of the British Empire.",
          evidence:
            "The oldest colony of the British Empire and a strategic prize in Canada's early history",
        },
        {
          id: "rg-011",
          biteId: "regions.atlantic-provinces.3",
          kind: "choice",
          prompt: "What is the capital of Prince Edward Island?",
          options: ["Alberton", "Summerside", "Charlottetown", "Souris"],
          correctIndex: 2,
          rationale: "Charlottetown is the capital of P.E.I.",
          evidence:
            "Atlantic region - Newfoundland and Labrador - Prince Edward Island - Nova Scotia - New Brunswick - St. John's - Charlottetown - Halifax - Fredericton",
        },
        {
          id: "rg-012",
          biteId: "regions.atlantic-provinces.3",
          kind: "choice",
          prompt: "Which province is known as the birthplace of Confederation?",
          options: ["Quebec", "Manitoba", "Ontario", "Prince Edward Island"],
          correctIndex: 3,
          rationale: "P.E.I. is the birthplace of Confederation.",
          evidence:
            "P.E.I. is the birthplace of Confederation, connected to mainland Canada by one of the longest continuous multispan bridges in the world, the Confederation Bridge.",
        },
        {
          id: "rg-013",
          biteId: "regions.atlantic-provinces.4",
          kind: "choice",
          prompt: "What is the capital of Nova Scotia?",
          options: ["Halifax", "Amherst", "Truro", "Sydney"],
          correctIndex: 0,
          rationale: "Halifax is the capital and Canada's largest east coast port.",
          evidence:
            "As Canada's largest east coast port, deep-water and ice-free, the capital, Halifax, has played an important role in Atlantic trade and defence",
        },
        {
          id: "rg-014",
          biteId: "regions.atlantic-provinces.4",
          kind: "choice",
          prompt: "Where are the world's highest tides?",
          options: ["Hudson Bay", "The Bay of Fundy", "The Gulf of Saint Lawrence", "Cook Inlet"],
          correctIndex: 1,
          rationale: "The world's highest tides are in the Bay of Fundy.",
          evidence: "Known for the world's highest tides in the Bay of Fundy",
        },
        {
          id: "rg-015",
          biteId: "regions.atlantic-provinces.5",
          kind: "choice",
          prompt: "What is the capital of New Brunswick?",
          options: ["Bathurst", "Edmundston", "Fredericton", "Campbellton"],
          correctIndex: 2,
          rationale: "Fredericton is the capital of New Brunswick.",
          evidence:
            "Saint John is the largest city, port and manufacturing centre; Moncton is the principal Francophone Acadian centre; and Fredericton, the historic capital.",
        },
        {
          id: "rg-016",
          biteId: "regions.atlantic-provinces.5",
          kind: "choice",
          prompt: "What is the largest city in New Brunswick?",
          options: ["Moncton", "Rimouski", "Sherbrooke", "Saint John"],
          correctIndex: 3,
          rationale: "Saint John is the largest city and port. Moncton is the main Acadian centre.",
          evidence: "Saint John is the largest city, port and manufacturing centre",
          caveat:
            "The guide is from 2012 and still defines the test, so answer Saint John. Moncton has grown since and has been the larger city since about 2016, so confirm the current ranking before you rely on it outside the test.",
        },
      ],
    },
    {
      id: "regions.central-canada",
      moduleId: "regions",
      title: "Central Canada: Quebec and Ontario",
      summary: "The industrial heartland along the Great Lakes and the St. Lawrence.",
      minutes: 7,
      source: chapterUrl("regions"),
      bites: [
        {
          id: "regions.central-canada.1",
          title: "The heartland",
          body: "More than half of Canadians live in southern Quebec and Ontario, near the Great Lakes and the St. Lawrence River. This is Central Canada, the industrial and manufacturing heartland, with cold winters and warm, humid summers. Ontario and Quebec make more than three-quarters of Canada's manufactured goods.",
          takeaway: "Quebec and Ontario are Canada's industrial heartland.",
          evidence: "known as Central Canada and the industrial and manufacturing heartland",
        },
        {
          id: "regions.central-canada.2",
          title: "Quebec: language and the river",
          body: "Nearly eight million people live in Quebec, most along the St. Lawrence River. More than three-quarters speak French as their first language. Quebec's films, music, books and food are known around the world, especially in La Francophonie.",
          takeaway: "Nearly eight million Quebecers, more than three-quarters French-speaking.",
          evidence:
            "Nearly eight million people live in Quebec, the vast majority along or near the St. Lawrence River. More than three-quarters speak French as their first language.",
        },
        {
          id: "regions.central-canada.3",
          title: "Quebec's industries",
          body: "Resources from the Canadian Shield helped Quebec build forestry, energy and mining industries. Quebec is Canada's main producer of pulp and paper, and its huge supply of fresh water makes it the largest producer of hydro-electricity. It also leads in pharmaceuticals and aeronautics.",
          takeaway: "Quebec leads in pulp and paper and in hydro-electricity.",
          evidence:
            "The province's huge supply of fresh water has made it Canada's largest producer of hydro-electricity.",
        },
        {
          id: "regions.central-canada.4",
          title: "Montreal",
          body: "Montreal is Canada's second largest city and the second largest mainly French-speaking city in the world, after Paris. It is famous for its cultural diversity.",
          takeaway:
            "Montreal: Canada's second largest city, and the second largest French-speaking city after Paris.",
          evidence:
            "Montreal, Canada's second largest city and the second largest mainly French-speaking city in the world after Paris",
        },
        {
          id: "regions.central-canada.5",
          title: "Ontario",
          body: "More than 12 million people, over one-third of Canadians, live in Ontario. Toronto is Canada's largest city and main financial centre. The Niagara region is known for vineyards and fruit, and Ontario farmers raise cattle, poultry, vegetables and grain. Ontario was founded by United Empire Loyalists and has the largest French-speaking population outside Quebec. The five Great Lakes lie between Ontario and the U.S., and Lake Superior is the largest freshwater lake in the world.",
          takeaway: "Over one-third of Canadians live in Ontario. Toronto is the largest city.",
          evidence:
            "Toronto is the largest city in Canada and the country's main financial centre.",
        },
      ],
      teach: {
        prompt:
          "Explain why Central Canada is called the industrial heartland, with one fact for Quebec and one for Ontario.",
        checklist: [
          "More than half of Canadians live near the Great Lakes and the St. Lawrence",
          "Ontario and Quebec make more than three-quarters of Canada's manufactured goods",
          "Quebec: mostly French-speaking, the largest producer of hydro-electricity",
          "Ontario: Toronto is the largest city and main financial centre",
        ],
        probe: "Which are Canada's largest and second largest cities?",
      },
      test: [
        {
          id: "rg-017",
          biteId: "regions.central-canada.1",
          kind: "truefalse",
          prompt:
            "Fewer than a quarter of Canadians live near the Great Lakes and the St. Lawrence River.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "More than half of Canadians live there.",
          evidence:
            "More than half the people in Canada live in cities and towns near the Great Lakes and the St. Lawrence River in southern Quebec and Ontario",
        },
        {
          id: "rg-018",
          biteId: "regions.central-canada.1",
          kind: "choice",
          prompt:
            "Which two provinces make more than three-quarters of Canada's manufactured goods?",
          options: [
            "Ontario and Quebec",
            "Manitoba and Saskatchewan",
            "Alberta and British Columbia",
            "Quebec and British Columbia",
          ],
          correctIndex: 0,
          rationale:
            "Central Canada is the industrial heartland, making the large majority of Canada's manufactured goods.",
          evidence:
            "Together, Ontario and Quebec produce more than three-quarters of all Canadian manufactured goods.",
        },
        {
          id: "rg-019",
          biteId: "regions.central-canada.2",
          kind: "choice",
          prompt: "What is the capital of Quebec?",
          options: ["Montréal", "Québec City", "Saguenay", "Sherbrooke"],
          correctIndex: 1,
          rationale: "Québec City is the capital. Montréal is the largest city.",
          evidence: "Central Canada - Quebec - Ontario - Québec City - Toronto",
        },
        {
          id: "rg-020",
          biteId: "regions.central-canada.2",
          kind: "choice",
          prompt: "What share of Quebecers speak French as their first language?",
          options: [
            "About 65 per cent",
            "About 25 per cent",
            "More than three-quarters",
            "Under 10 per cent",
          ],
          correctIndex: 2,
          rationale: "More than three-quarters speak French as their first language.",
          evidence: "More than three-quarters speak French as their first language.",
        },
        {
          id: "rg-021",
          biteId: "regions.central-canada.3",
          kind: "choice",
          prompt: "Quebec's huge supply of fresh water makes it Canada's largest producer of what?",
          options: ["Coal power", "Wind power", "Nuclear power", "Hydro-electricity"],
          correctIndex: 3,
          rationale:
            "Quebec's fresh water makes it Canada's largest producer of hydro-electricity.",
          evidence:
            "The province's huge supply of fresh water has made it Canada's largest producer of hydro-electricity.",
        },
        {
          id: "rg-022",
          biteId: "regions.central-canada.4",
          kind: "choice",
          prompt:
            "Montreal is the second largest French-speaking city in the world, after which city?",
          options: ["Paris", "Brussels", "Geneva", "Marseille"],
          correctIndex: 0,
          rationale: "Montreal is second only to Paris.",
          evidence: "the second largest mainly French-speaking city in the world after Paris",
        },
        {
          id: "rg-023",
          biteId: "regions.central-canada.5",
          kind: "choice",
          prompt: "What is the capital of Ontario?",
          options: ["Hamilton", "Toronto", "Kingston", "Ottawa"],
          correctIndex: 1,
          rationale:
            "Toronto is Ontario's capital and Canada's largest city. Ottawa is the national capital.",
          evidence: "Central Canada - Quebec - Ontario - Québec City - Toronto",
        },
        {
          id: "rg-024",
          biteId: "regions.central-canada.5",
          kind: "truefalse",
          prompt: "Lake Superior is the largest freshwater lake in the world.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale: "Lake Superior is the largest freshwater lake in the world.",
          evidence: "Lake Superior, the largest freshwater lake in the world.",
        },
      ],
    },
    {
      id: "regions.prairie-provinces",
      moduleId: "regions",
      title: "The Prairies: Manitoba and Saskatchewan",
      summary: "Winnipeg and St. Boniface, Regina and the RCMP academy, and the farmland.",
      minutes: 7,
      source: chapterUrl("regions"),
      bites: [
        {
          id: "regions.prairie-provinces.1",
          title: "The Prairie provinces",
          body: "Manitoba, Saskatchewan and Alberta are the Prairie provinces, rich in energy and in some of the most fertile farmland in the world. The region is mostly dry, with cold winters and hot summers.",
          takeaway:
            "Manitoba, Saskatchewan and Alberta: farmland and energy, cold winters, hot summers.",
          evidence:
            "Manitoba, Saskatchewan and Alberta are the Prairie Provinces, rich in energy resources and some of the most fertile farmland in the world.",
        },
        {
          id: "regions.prairie-provinces.2",
          title: "Manitoba",
          body: "Manitoba's economy rests on farming, mining and hydro-electric power. Its largest city and capital is Winnipeg, home to Portage and Main, Canada's most famous intersection. Winnipeg's French Quarter, St. Boniface, has Western Canada's largest Francophone community (45,000). Manitoba is a centre of Ukrainian culture and has the largest Aboriginal population of any province, over 15%.",
          takeaway:
            "Winnipeg is Manitoba's capital. St. Boniface is Western Canada's largest Francophone community.",
          evidence:
            "The province's most populous city is Winnipeg, whose Exchange District includes the most famous street intersection in Canada, Portage and Main.",
        },
        {
          id: "regions.prairie-provinces.3",
          title: "Saskatchewan",
          body: "Saskatchewan, once called the \"breadbasket of the world\", has 40% of Canada's farmland and is the largest producer of grains and oilseeds. It has the world's richest deposits of uranium and potash, used in fertilizer. Regina, the capital, is home to the RCMP training academy. Saskatoon, the largest city, is the centre of the mining industry.",
          takeaway:
            "Saskatchewan: capital Regina (RCMP academy), largest city Saskatoon, 40% of Canada's farmland.",
          evidence:
            "Regina, the capital, is home to the training academy of the Royal Canadian Mounted Police.",
        },
      ],
      teach: {
        prompt:
          "Name the three Prairie provinces and their capitals, with one fact each for Manitoba and Saskatchewan.",
        checklist: [
          "The Prairies are mostly dry, with cold winters and hot summers",
          "Manitoba, Winnipeg: Portage and Main, St. Boniface, the largest Aboriginal population",
          "Saskatchewan, Regina: the RCMP academy; Saskatoon is the largest city; 40% of the farmland",
          "Alberta, Edmonton: the largest producer of oil and gas",
        ],
        probe: "Which Prairie capital has the RCMP training academy?",
      },
      test: [
        {
          id: "rg-025",
          biteId: "regions.prairie-provinces.1",
          kind: "truefalse",
          prompt: "The Prairies are mostly dry, with mild winters and hot summers.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "The Prairie winters are cold, not mild.",
          evidence: "The region is mostly dry, with cold winters and hot summers.",
        },
        {
          id: "rg-026",
          biteId: "regions.prairie-provinces.2",
          kind: "choice",
          prompt: "What is the capital of Manitoba?",
          options: ["Dauphin", "Brandon", "Winnipeg", "The Pas"],
          correctIndex: 2,
          rationale: "Winnipeg is Manitoba's capital and largest city.",
          evidence:
            "Prairie Provinces - Manitoba - Saskatchewan - Alberta - Winnipeg - Regina - Edmonton",
        },
        {
          id: "rg-027",
          biteId: "regions.prairie-provinces.2",
          kind: "choice",
          prompt: "Which Winnipeg neighbourhood is Western Canada's largest Francophone community?",
          options: ["Tuxedo", "Corydon", "Kildonan", "St. Boniface"],
          correctIndex: 3,
          rationale:
            "St. Boniface, Winnipeg's French Quarter, has Western Canada's largest Francophone community.",
          evidence:
            "Winnipeg's French Quarter, St. Boniface, has Western Canada's largest Francophone community at 45,000.",
        },
        {
          id: "rg-028",
          biteId: "regions.prairie-provinces.3",
          kind: "choice",
          prompt: "What is the capital of Saskatchewan?",
          options: ["Regina", "Moose Jaw", "Saskatoon", "Yorkton"],
          correctIndex: 0,
          rationale:
            "Regina is the capital and home to the RCMP training academy. The largest city is a different one.",
          evidence:
            "Regina, the capital, is home to the training academy of the Royal Canadian Mounted Police.",
        },
        {
          id: "rg-029",
          biteId: "regions.prairie-provinces.3",
          kind: "choice",
          prompt: "Which province is Canada's largest producer of grains and oilseeds?",
          options: ["Ontario", "Saskatchewan", "Alberta", "Manitoba"],
          correctIndex: 1,
          rationale:
            "Saskatchewan has 40% of Canada's farmland and is the largest producer of grains and oilseeds.",
          evidence:
            "has 40% of the arable land in Canada and is the country's largest producer of grains and oilseeds",
        },
        {
          id: "rg-030",
          biteId: "regions.prairie-provinces.3",
          kind: "choice",
          prompt: "What is the largest city in Saskatchewan?",
          options: ["Melfort", "Eston", "Saskatoon", "Rosthern"],
          correctIndex: 2,
          rationale: "Saskatoon is the largest city and the centre of the mining industry.",
          evidence: "Saskatoon, the largest city, is the headquarters of the mining industry",
        },
      ],
    },
    {
      id: "regions.alberta",
      moduleId: "regions",
      title: "Alberta",
      summary: "Where the name comes from, the parks and Badlands, and oil, gas and cattle.",
      minutes: 5,
      source: chapterUrl("regions"),
      bites: [
        {
          id: "regions.alberta.1",
          title: "Alberta",
          body: "Alberta is the most populous Prairie province, and its capital is Edmonton. Alberta and Lake Louise in the Rockies are both named after Princess Louise Caroline Alberta, Queen Victoria's fourth daughter.",
          takeaway:
            "Alberta is named after Princess Louise Caroline Alberta. Its capital is Edmonton.",
          evidence: "Alberta is the most populous Prairie province.",
        },
        {
          id: "regions.alberta.2",
          title: "Five national parks and the Badlands",
          body: "Alberta has five national parks, including Banff National Park, founded in 1885. Its rugged Badlands hold some of the world's richest deposits of prehistoric fossils and dinosaur bones.",
          takeaway:
            "Five national parks, including Banff (1885). The Badlands are famous for dinosaur fossils.",
          evidence:
            "Alberta has five national parks, including Banff National Park, established in 1885.",
        },
        {
          id: "regions.alberta.3",
          title: "Oil, gas and cattle",
          body: "Alberta is Canada's largest producer of oil and gas, and the oil sands in the north are a major energy source. Its huge cattle ranches make Canada one of the world's major beef producers.",
          takeaway:
            "Alberta is Canada's largest producer of oil and gas, and is known for cattle ranching.",
          evidence:
            "Alberta is the largest producer of oil and gas, and the oil sands in the north are being developed as a major energy source.",
        },
      ],
      teach: {
        prompt:
          "Say who Alberta is named after, name its capital, and give one fact about its parks and one about its energy.",
        checklist: [
          "Alberta and Lake Louise are named after Princess Louise Caroline Alberta",
          "Edmonton is the capital; Alberta is the most populous Prairie province",
          "Five national parks, including Banff, founded in 1885",
          "Canada's largest producer of oil and gas, with the oil sands in the north",
        ],
        probe: "Which part of Alberta is known for fossils, and which for oil?",
      },
      test: [
        {
          id: "rg-031",
          biteId: "regions.alberta.1",
          kind: "choice",
          prompt: "What is the capital of Alberta?",
          options: ["Lethbridge", "Calgary", "Red Deer", "Edmonton"],
          correctIndex: 3,
          rationale: "Edmonton is the capital of Alberta.",
          evidence:
            "Prairie Provinces - Manitoba - Saskatchewan - Alberta - Winnipeg - Regina - Edmonton",
        },
        {
          id: "rg-032",
          biteId: "regions.alberta.1",
          kind: "truefalse",
          prompt: "Alberta and Lake Louise were both named after Princess Louise Caroline Alberta.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "Both are named after Princess Louise Caroline Alberta, Queen Victoria's fourth daughter.",
          evidence:
            "were both named after Princess Louise Caroline Alberta, fourth daughter of Queen Victoria.",
        },
        {
          id: "rg-033",
          biteId: "regions.alberta.3",
          kind: "choice",
          prompt: "Which province is Canada's largest producer of oil and gas?",
          options: ["Alberta", "Ontario", "Quebec", "Manitoba"],
          correctIndex: 0,
          rationale: "Alberta is the largest producer of oil and gas.",
          evidence: "Alberta is the largest producer of oil and gas",
        },
        {
          id: "rg-054",
          biteId: "regions.alberta.2",
          kind: "choice",
          prompt: "In what year was Banff National Park established?",
          options: ["1885", "1785", "1985", "1865"],
          correctIndex: 0,
          rationale: "Banff National Park was established in 1885.",
          evidence:
            "Alberta has five national parks, including Banff National Park, established in 1885.",
        },
        {
          id: "rg-055",
          biteId: "regions.alberta.2",
          kind: "truefalse",
          prompt: "Alberta's Badlands hold the world's richest deposits of uranium and potash.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale:
            "The Badlands are known for fossils and dinosaur bones. Uranium and potash are in Saskatchewan.",
          evidence:
            "The rugged Badlands house some of the world's richest deposits of prehistoric fossils and dinosaur finds.",
        },
      ],
    },
    {
      id: "regions.west-coast",
      moduleId: "regions",
      title: "The West Coast: British Columbia",
      summary: "Canada's Pacific gateway: its port, forests, parks and languages.",
      minutes: 6,
      source: chapterUrl("regions"),
      bites: [
        {
          id: "regions.west-coast.1",
          title: "British Columbia",
          body: "British Columbia, on the Pacific coast, is Canada's westernmost province, with four million people. It is known for its mountains and as Canada's gateway to the Pacific. Warm air from the Pacific gives the coast a mild climate.",
          takeaway: "B.C. is the westernmost province and Canada's Pacific gateway.",
          evidence:
            "British Columbia (B.C.), on the Pacific coast, is Canada's western most province, with a population of four million.",
        },
        {
          id: "regions.west-coast.2",
          title: "The Port of Vancouver",
          body: "The Port of Vancouver is Canada's largest and busiest port, handling billions of dollars in trade and serving as the gateway to Asia. Victoria, the capital, is a tourist centre and home to the navy's Pacific fleet.",
          takeaway: "Vancouver has Canada's largest port. Victoria is the capital.",
          evidence:
            "The Port of Vancouver, Canada's largest and busiest, handles billions of dollars in goods traded around the world.",
        },
        {
          id: "regions.west-coast.3",
          title: "Forestry and other industries",
          body: "About half of all goods produced in B.C. are forestry products, such as lumber, newsprint, and pulp and paper. It is the most valuable forestry industry in Canada. B.C. is also known for mining, fishing, and the orchards and wineries of the Okanagan Valley.",
          takeaway:
            "About half of B.C.'s goods come from forestry. The Okanagan is known for fruit and wine.",
          evidence:
            "About one-half of all the goods produced in B.C. are forestry products, including lumber, newsprint, and pulp and paper products",
        },
        {
          id: "regions.west-coast.4",
          title: "Parks and people",
          body: "B.C. has Canada's largest park system, with about 600 provincial parks. Thanks to its large Asian communities, Chinese and Punjabi are the most spoken languages in its cities after English.",
          takeaway:
            "About 600 provincial parks. Chinese and Punjabi follow English in B.C.'s cities.",
          evidence:
            "B.C. has the most extensive park system in Canada, with approximately 600 provincial parks.",
        },
      ],
      teach: {
        prompt:
          "Describe British Columbia in four sentences: where it is, its port, its main industry and its capital.",
        checklist: [
          "The westernmost province, on the Pacific, with four million people",
          "The Port of Vancouver is Canada's largest and busiest",
          "About half of everything B.C. produces is forestry products",
          "Victoria is the capital and home of the navy's Pacific fleet",
        ],
        probe: "Which B.C. city is the capital, and which has the big port?",
      },
      test: [
        {
          id: "rg-034",
          biteId: "regions.west-coast.1",
          kind: "choice",
          prompt: "What is the capital of British Columbia?",
          options: ["Nanaimo", "Victoria", "Vancouver", "Kamloops"],
          correctIndex: 1,
          rationale: "Victoria is the capital. Vancouver is the largest city and port.",
          evidence:
            "The capital, Victoria, is a tourist centre and headquarters of the navy's Pacific fleet.",
        },
        {
          id: "rg-035",
          biteId: "regions.west-coast.1",
          kind: "choice",
          prompt: "What gives the British Columbia coast its temperate climate?",
          options: [
            "Cold winds from the Arctic Ocean",
            "The large provincial park system",
            "Warm airstreams from the Pacific Ocean",
            "The shelter of the Rocky Mountains to the east",
          ],
          correctIndex: 2,
          rationale: "Warm air from the Pacific gives the coast its mild climate.",
          evidence:
            "Warm airstreams from the Pacific Ocean give the B.C. coast a temperate climate.",
        },
        {
          id: "rg-036",
          biteId: "regions.west-coast.2",
          kind: "choice",
          prompt: "Which is Canada's largest and busiest port?",
          options: [
            "The Port of Saint John",
            "The Port of Halifax",
            "The Port of Montreal",
            "The Port of Vancouver",
          ],
          correctIndex: 3,
          rationale: "The Port of Vancouver. Halifax is the largest east coast port.",
          evidence:
            "The Port of Vancouver, Canada's largest and busiest, handles billions of dollars in goods traded around the world.",
        },
        {
          id: "rg-037",
          biteId: "regions.west-coast.3",
          kind: "choice",
          prompt:
            "About half of all the goods produced in British Columbia come from which industry?",
          options: ["Forestry", "Mining", "Tourism", "Fishing"],
          correctIndex: 0,
          rationale:
            "About half of B.C.'s goods are forestry products: lumber, newsprint, pulp and paper.",
          evidence: "About one-half of all the goods produced in B.C. are forestry products",
        },
        {
          id: "rg-038",
          biteId: "regions.west-coast.3",
          kind: "choice",
          prompt: "The Okanagan Valley in British Columbia is known for which two products?",
          options: [
            "Wheat and barley",
            "Fruit orchards and wine",
            "Coal and iron ore",
            "Cattle ranches and dairy",
          ],
          correctIndex: 1,
          rationale: "The Okanagan Valley is known for fruit orchards and wine.",
          evidence: "the fruit orchards and wine industry of the Okanagan Valley",
        },
        {
          id: "rg-039",
          biteId: "regions.west-coast.4",
          kind: "choice",
          prompt: "About how many provincial parks does British Columbia have?",
          options: ["60", "160", "1,600", "600"],
          correctIndex: 3,
          rationale: "About 600, the largest park system in Canada.",
          evidence: "with approximately 600 provincial parks",
        },
        {
          id: "rg-040",
          biteId: "regions.west-coast.4",
          kind: "choice",
          prompt: "After English, which two languages are most spoken in B.C.'s cities?",
          options: [
            "French and Inuktitut",
            "Italian and Spanish",
            "Chinese and Punjabi",
            "Arabic and Tagalog",
          ],
          correctIndex: 2,
          rationale: "Chinese and Punjabi, thanks to large Asian communities.",
          evidence:
            "have made Chinese and Punjabi the most spoken languages in the cities after English",
        },
      ],
    },
    {
      id: "regions.northern-territories",
      moduleId: "regions",
      title: "The North and the Yukon",
      summary: "How big the North is, the midnight sun and the tundra, and the Yukon.",
      minutes: 6,
      source: chapterUrl("regions"),
      bites: [
        {
          id: "regions.northern-territories.1",
          title: "Huge land, few people",
          body: "The Northwest Territories, Nunavut and Yukon cover one-third of Canada's land but have only 100,000 people. There are gold, lead, copper, diamond and zinc mines, and oil and gas are being developed. Some people still live by hunting, fishing and trapping, and Inuit art is sold around the world.",
          takeaway: "The territories cover one-third of Canada but have only 100,000 people.",
          evidence:
            "The Northwest Territories, Nunavut and Yukon contain one-third of Canada's land mass but have a population of only 100,000.",
        },
        {
          id: "regions.northern-territories.2",
          title: "Midnight sun and tundra",
          body: 'The North is called the "Land of the Midnight Sun" because in midsummer daylight can last 24 hours. In winter, darkness lasts for three months. Winters are long and cold, and summers short and cool. Much of the North is tundra, a vast rocky Arctic plain where it is too cold for trees and the ground stays frozen.',
          takeaway: "Land of the Midnight Sun. The tundra is a treeless, frozen Arctic plain.",
          evidence:
            'the "Land of the Midnight Sun" because at the height of summer, daylight can last up to 24 hours',
        },
        {
          id: "regions.northern-territories.3",
          title: "Yukon",
          body: "Thousands of miners rushed to the Yukon in the Gold Rush of the 1890s, celebrated in Robert W. Service's poems, and mining is still important. In 1900 the White Pass and Yukon Railway opened from Skagway, Alaska, to Whitehorse, the capital. The Yukon holds Canada's coldest recorded temperature, -63°C, and has Canada's highest mountain, Mount Logan.",
          takeaway: "Yukon: capital Whitehorse, the 1890s Gold Rush, -63°C, and Mount Logan.",
          evidence:
            "Yukon holds the record for the coldest temperature ever recorded in Canada (-63°C).",
        },
        {
          id: "regions.northern-territories.4",
          title: "Mount Logan and Sir William Logan",
          body: "Mount Logan is named after Sir William Logan, a famous geologist born in Montreal in 1798. He founded the Geological Survey of Canada and led it from 1842 to 1869, and is one of Canada's greatest scientists.",
          takeaway:
            "Mount Logan is named after Sir William Logan, founder of the Geological Survey of Canada.",
          evidence:
            "It is named in honour of Sir William Logan, a world-famous geologist, born in Montreal in 1798 to Scottish immigrant parents.",
        },
      ],
      teach: {
        prompt: "Describe the North, then give two facts about the Yukon.",
        checklist: [
          "One-third of Canada's land, only 100,000 people",
          "Gold, diamond and other mines; oil and gas being developed",
          "The Land of the Midnight Sun; the tundra is a treeless, frozen Arctic plain",
          "Yukon: capital Whitehorse, the 1890s Gold Rush, -63°C, Mount Logan",
        ],
        probe: "What is Canada's highest mountain, and who is it named after?",
      },
      test: [
        {
          id: "rg-041",
          biteId: "regions.northern-territories.1",
          kind: "truefalse",
          prompt:
            "The territories cover one-third of Canada's land and hold about half its people.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "They cover one-third of the land but have only about 100,000 people.",
          evidence:
            "The Northwest Territories, Nunavut and Yukon contain one-third of Canada's land mass but have a population of only 100,000.",
          caveat:
            "The guide's 2012 figure for the territorial population has grown since; answer 100,000 as the guide states it and confirm the current number.",
        },
        {
          id: "rg-042",
          biteId: "regions.northern-territories.2",
          kind: "choice",
          prompt: "What is the tundra?",
          options: [
            "The boreal forest belt of the North",
            "A treeless river floodplain",
            "The frozen sea ice of the Arctic Ocean",
            "The vast rocky Arctic plain",
          ],
          correctIndex: 3,
          rationale:
            "The tundra is the vast rocky Arctic plain, too cold for trees, with permanently frozen ground.",
          evidence: "Much of the North is made up of tundra, the vast rocky Arctic plain.",
        },
        {
          id: "rg-043",
          biteId: "regions.northern-territories.2",
          kind: "truefalse",
          prompt:
            "The North is called the Land of the Midnight Sun because summer daylight can last 24 hours.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "In midsummer daylight can last 24 hours. In winter, darkness lasts three months.",
          evidence:
            'the "Land of the Midnight Sun" because at the height of summer, daylight can last up to 24 hours',
        },
        {
          id: "rg-044",
          biteId: "regions.northern-territories.3",
          kind: "choice",
          prompt: "What is the capital of the Yukon?",
          options: ["Whitehorse", "Skagway", "Haines Junction", "Dawson City"],
          correctIndex: 0,
          rationale: "Whitehorse is the capital. Skagway is in Alaska.",
          evidence:
            "The White Pass and Yukon Railway opened from Skagway in neighbouring Alaska to the territorial capital, Whitehorse in 1900",
        },
        {
          id: "rg-045",
          biteId: "regions.northern-territories.4",
          kind: "choice",
          prompt: "Mount Logan, the highest mountain in Canada, is located in which territory?",
          options: ["Labrador", "Yukon", "Nunavut", "Northwest Territories"],
          correctIndex: 1,
          rationale: "Mount Logan is in the Yukon, named after geologist Sir William Logan.",
          evidence: "Mount Logan, located in the Yukon, is the highest mountain in Canada.",
        },
      ],
    },
    {
      id: "regions.northwest-nunavut-and-rangers",
      moduleId: "regions",
      title: "Northwest Territories, Nunavut and the Rangers",
      summary: "Their capitals and rivers, and the reservists who guard the Arctic.",
      minutes: 7,
      source: chapterUrl("regions"),
      bites: [
        {
          id: "regions.northwest-nunavut-and-rangers.1",
          title: "Northwest Territories",
          body: "The Northwest Territories were formed in 1870 from Rupert's Land and the North-Western Territory. Yellowknife, the capital (population 20,000), is the \"diamond capital of North America\". More than half the people are Aboriginal: Dene, Inuit and Métis. The Mackenzie River, 4,200 kilometres long, is North America's second-longest river system after the Mississippi.",
          takeaway:
            "N.W.T.: formed in 1870, capital Yellowknife, the diamond capital of North America.",
          evidence:
            "The Northwest Territories (N.W.T.) were originally made up in 1870 from Rupert's Land and the North-Western Territory.",
        },
        {
          id: "regions.northwest-nunavut-and-rangers.2",
          title: "Nunavut",
          body: 'Nunavut, meaning "our land" in Inuktitut, was created in 1999 from the eastern part of the Northwest Territories. Its capital is Iqaluit, formerly Frobisher Bay, named after English explorer Martin Frobisher, who sailed into the Arctic in 1576. Its 19-member Legislative Assembly chooses a premier and ministers by consensus. About 85% of the people are Inuit, and Inuktitut is an official language and the first language in schools.',
          takeaway:
            'Nunavut ("our land") was created in 1999. Capital Iqaluit. Government by consensus.',
          evidence:
            'Nunavut, meaning "our land" in Inuktitut, was established in 1999 from the eastern part of the Northwest Territories, including all of the former District of Keewatin.',
        },
        {
          id: "regions.northwest-nunavut-and-rangers.3",
          title: "The Canadian Rangers",
          body: "Canada's vast North brings security and sovereignty challenges. The Canadian Rangers, part of the Canadian Forces Reserves, work in harsh weather in isolated places. Using Indigenous knowledge, they travel by snowmobile in winter and all-terrain vehicle in summer, from Resolute to the Magnetic North Pole, keeping the flag flying in the Arctic.",
          takeaway: "The Canadian Rangers, part of the Forces Reserves, guard Canada's Arctic.",
          evidence:
            "the Canadian Rangers, part of the Canadian Forces Reserves (militia), play a key role.",
        },
      ],
      teach: {
        prompt:
          "Name the capitals of the Northwest Territories and Nunavut, and say what the Canadian Rangers do.",
        checklist: [
          "Yellowknife, N.W.T.: the diamond capital of North America",
          "Iqaluit, Nunavut, formerly Frobisher Bay; Nunavut was created in 1999",
          "Nunavut's Assembly chooses its government by consensus",
          "The Rangers are reservists who keep the flag flying in the Arctic",
        ],
        probe: "Which territory's assembly governs by consensus?",
      },
      test: [
        {
          id: "rg-046",
          biteId: "regions.northwest-nunavut-and-rangers.1",
          kind: "choice",
          prompt: "What is Yellowknife, capital of the Northwest Territories, called?",
          options: [
            "The gold coast of the north",
            "The northern capital",
            "The diamond capital of North America",
            "The gateway to the Arctic",
          ],
          correctIndex: 2,
          rationale: "Yellowknife is the diamond capital of North America.",
          evidence: 'is called the "diamond capital of North America."',
        },
        {
          id: "rg-047",
          biteId: "regions.northwest-nunavut-and-rangers.1",
          kind: "choice",
          prompt: "How long is the Mackenzie River?",
          options: ["6,400 kilometres", "9,900 kilometres", "1,800 kilometres", "4,200 kilometres"],
          correctIndex: 3,
          rationale:
            "The Mackenzie is 4,200 kilometres long, second in North America after the Mississippi.",
          evidence:
            "The Mackenzie River, at 4,200 kilometres, is the second-longest river system in North America after the Mississippi",
        },
        {
          id: "rg-048",
          biteId: "regions.northwest-nunavut-and-rangers.1",
          kind: "choice",
          prompt: "In what year were the Northwest Territories formed?",
          options: ["1791", "1837", "1870", "1905"],
          correctIndex: 2,
          rationale:
            "The Northwest Territories were formed in 1870 from Rupert's Land and the North-Western Territory.",
          evidence:
            "The Northwest Territories (N.W.T.) were originally made up in 1870 from Rupert's Land and the North-Western Territory.",
        },
        {
          id: "rg-049",
          biteId: "regions.northwest-nunavut-and-rangers.2",
          kind: "choice",
          prompt: "In what year was Nunavut created?",
          options: ["1982", "1993", "2005", "1999"],
          correctIndex: 3,
          rationale:
            "Nunavut was created in 1999 from the eastern part of the Northwest Territories.",
          evidence:
            "was established in 1999 from the eastern part of the Northwest Territories, including all of the former District of Keewatin",
        },
        {
          id: "rg-050",
          biteId: "regions.northwest-nunavut-and-rangers.2",
          kind: "choice",
          prompt: "What is the capital of Nunavut, and what was it formerly called?",
          options: [
            "Iqaluit, formerly Frobisher Bay",
            "Yellowknife, formerly Fort Resolution",
            "Cambridge Bay, formerly Mould Bay",
            "Pangnirtung, formerly Frobisher Bay",
          ],
          correctIndex: 0,
          rationale: "Iqaluit was formerly Frobisher Bay, named after explorer Martin Frobisher.",
          evidence:
            "The capital is Iqaluit, formerly Frobisher Bay, named after the English explorer Martin Frobisher",
        },
        {
          id: "rg-051",
          biteId: "regions.northwest-nunavut-and-rangers.2",
          kind: "choice",
          prompt: "How does Nunavut's Legislative Assembly choose a premier and ministers?",
          options: [
            "By rotation among elders",
            "By consensus",
            "By party leadership contest",
            "By federal appointment",
          ],
          correctIndex: 1,
          rationale: "Nunavut's 19-member Assembly chooses a premier and ministers by consensus.",
          evidence:
            "The 19-member Legislative Assembly chooses a premier and ministers by consensus.",
          caveat:
            "The guide's count of 19 assembly members is from 2012; confirm the current number, but answer as the guide states it.",
        },
        {
          id: "rg-052",
          biteId: "regions.northwest-nunavut-and-rangers.3",
          kind: "choice",
          prompt: "Which organization are the Canadian Rangers part of?",
          options: [
            "The Canadian Coast Guard",
            "The Royal Canadian Navy",
            "The Canadian Forces Reserves",
            "The National Research Council",
          ],
          correctIndex: 2,
          rationale: "The Rangers are part of the Canadian Forces Reserves.",
          evidence:
            "the Canadian Rangers, part of the Canadian Forces Reserves (militia), play a key role.",
        },
        {
          id: "rg-053",
          biteId: "regions.northwest-nunavut-and-rangers.3",
          kind: "choice",
          prompt: "How do the Canadian Rangers travel in winter?",
          options: ["By horse team", "By snowcat", "By dog sled", "By snowmobile"],
          correctIndex: 3,
          rationale: "The Rangers use snowmobiles in winter and all-terrain vehicles in summer.",
          evidence:
            "the Rangers travel by snowmobile in the winter and all-terrain vehicles in the summer from Resolute to the Magnetic North Pole",
        },
      ],
    },
  ],
};

export default module;
