import type { Module } from "../types.ts";
import { chapterUrl } from "../sources.ts";

/**
 * Canada's History. Ten sessions, following the chapter's own headings from
 * "Aboriginal Peoples" through "The Second World War". The chapter's two longest
 * stretches, Britain's Province of Quebec and Confederation, are each taught in a
 * pair of sessions so no session carries more than eight questions.
 *
 * Some facts come from the captions printed under the chapter's pictures; where a
 * bite teaches one of those, the bite body says so.
 *
 * Every `evidence` string is a verbatim excerpt from data/corpus/canadas-history.txt
 * and `npm run curriculum:check` proves it. The guide is from 2012, so where a fact
 * has aged (a banknote portrait, the guide's own wording for peoples) the guide's
 * answer stands and a `caveat` tells the learner what to confirm.
 */
const module: Module = {
  id: "history",
  order: 4,
  title: "Canada's history",
  guideChapter: "Canada's History",
  corpus: ["canadas-history"],
  summary: "From the first peoples to 1945, in order, with the dates that matter.",
  mission: "Put the names, dates and causes of Canada's history in order, and say who did what.",
  icon: "history",
  tags: ["History", "Indigenous peoples", "Confederation", "World wars"],
  source: chapterUrl("history"),
  testSize: 12,
  sessions: [
    {
      id: "history.first-peoples",
      moduleId: "history",
      title: "First peoples and the first Europeans",
      summary: "The nations already here, and the Vikings, Cabot and Cartier who arrived.",
      minutes: 6,
      source: chapterUrl("history"),
      bites: [
        {
          id: "history.first-peoples.1",
          title: "A country already occupied",
          body: "When Europeans explored Canada, every region was already home to native peoples. Europeans called them Indians because the first explorers thought they had reached the East Indies. The name stuck, and the test may use it. These peoples were many nations, not one.",
          takeaway: 'Every region was already occupied, and "Indians" was the explorers\' mistake.',
          evidence:
            "they found all regions occupied by native peoples they called Indians, because the first explorers thought they had reached the East Indies",
        },
        {
          id: "history.first-peoples.2",
          title: "Different nations, different ways of living",
          body: "Ways of life differed by region. The Huron-Wendat of the Great Lakes, like the Iroquois, farmed and hunted. The Cree and Dene of the Northwest hunted and gathered. The Sioux were nomadic and followed the bison herd. The Inuit lived off Arctic wildlife, and West Coast peoples preserved fish by drying and smoking it. Groups often fought over land, resources and prestige.",
          takeaway:
            "The Sioux followed the bison, the Inuit lived off Arctic wildlife, West Coast peoples dried and smoked fish.",
          evidence:
            "The Sioux were nomadic, following the bison (buffalo) herd. The Inuit lived off Arctic wildlife.",
        },
        {
          id: "history.first-peoples.3",
          title: "Disease, and 200 years of coexistence",
          body: "European traders, missionaries, soldiers and colonists changed the native way of life forever. Many Aboriginal people died of European diseases they had no immunity to. Yet in the first 200 years, Aboriginal peoples and Europeans also formed strong economic, religious and military bonds, and those bonds laid the foundations of Canada.",
          takeaway:
            "Disease killed many, but the first 200 years of cooperation laid the foundations of Canada.",
          evidence:
            "Large numbers of Aboriginals died of European diseases to which they lacked immunity.",
        },
        {
          id: "history.first-peoples.4",
          title: "Vikings, then Cabot in 1497",
          body: "The first Europeans were the Vikings from Iceland. About 1,000 years ago they settled Greenland and reached Labrador and Newfoundland. The remains of their settlement, l'Anse aux Meadows, are a World Heritage site. Real exploration began in 1497 with John Cabot, an Italian immigrant to England, who drew the first map of Canada's East Coast and claimed Newfoundland for England. English settlement began in 1610.",
          takeaway: "Vikings 1,000 years ago, Cabot's map in 1497, English settlement in 1610.",
          evidence:
            "The Vikings from Iceland who colonized Greenland 1,000 years ago also reached Labrador and the island of Newfoundland.",
        },
        {
          id: "history.first-peoples.5",
          title: "Cartier gives us the name Canada",
          body: "Between 1534 and 1542, Jacques Cartier crossed the Atlantic three times and claimed the land for King Francis I of France. He heard two captured guides use the Iroquoian word kanata, meaning village, and by the 1550s the name Canada was on maps. Cartier was also the first European to explore the St. Lawrence River and to see what are now Quebec City and Montreal.",
          takeaway:
            "Canada comes from kanata, Iroquoian for village. Cartier claimed the land for France.",
          evidence:
            'Cartier heard two captured guides speak the Iroquoian word kanata, meaning "village."',
        },
      ],
      teach: {
        prompt:
          "Say who lived in Canada before Europeans arrived and how one nation lived. Then put the Vikings, Cabot and Cartier in order, with a date for each.",
        checklist: [
          'Every region was already occupied; "Indians" came from explorers thinking they had reached the East Indies',
          "One nation and its way of life, e.g. the Sioux followed the bison, West Coast peoples dried and smoked fish",
          "Vikings 1,000 years ago (l'Anse aux Meadows), Cabot 1497, Cartier 1534 to 1542",
          "Kanata means village, and Canada appeared on maps by the 1550s",
        ],
        probe:
          "European disease killed huge numbers. Why are the first 200 years still called the foundations of Canada?",
      },
      test: [
        {
          id: "hi-001",
          biteId: "history.first-peoples.1",
          kind: "choice",
          prompt: "Why did the first Europeans call the native peoples Indians?",
          options: [
            "The explorers believed they had reached the East Indies",
            "It was the name the Huron-Wendat used for themselves",
            "It was the Spanish word for a native village",
            "The first explorers had come from India",
          ],
          correctIndex: 0,
          rationale: "The first explorers thought they had reached the East Indies.",
          evidence: "the first explorers thought they had reached the East Indies",
          caveat:
            "This is the guide's wording. Today people say First Nations, Métis or Inuit. Answer as the guide does on the test.",
        },
        {
          id: "hi-002",
          biteId: "history.first-peoples.2",
          kind: "choice",
          prompt: "Which people were nomadic and followed the bison herd?",
          options: [
            "The Cree of the Northwest",
            "The Sioux",
            "The Huron-Wendat farmers",
            "The Inuit of the Arctic",
          ],
          correctIndex: 1,
          rationale:
            "The Sioux followed the bison. The Cree and Dene hunted and gathered, the Huron-Wendat farmed, and the Inuit lived off Arctic wildlife.",
          evidence: "The Sioux were nomadic, following the bison (buffalo) herd.",
        },
        {
          id: "hi-003",
          biteId: "history.first-peoples.2",
          kind: "choice",
          prompt: "How did West Coast native peoples preserve fish?",
          options: [
            "By salting them in barrels",
            "By freezing them in winter",
            "By drying and smoking them",
            "By fermenting them in pits",
          ],
          correctIndex: 2,
          rationale: "West Coast peoples preserved fish by drying and smoking it.",
          evidence: "West Coast natives preserved fish by drying and smoking.",
        },
        {
          id: "hi-004",
          biteId: "history.first-peoples.3",
          kind: "truefalse",
          prompt:
            "The first 200 years of contact between Aboriginal peoples and Europeans laid Canada's foundations.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "Despite the deaths from disease, strong economic, religious and military bonds formed in those 200 years.",
          evidence:
            "Aboriginals and Europeans formed strong economic, religious and military bonds in the first 200 years of coexistence",
        },
        {
          id: "hi-005",
          biteId: "history.first-peoples.4",
          kind: "choice",
          prompt: "What is l'Anse aux Meadows?",
          options: [
            "The first French capital in Canada",
            "A Huron-Wendat longhouse site",
            "A Hudson's Bay Company fort",
            "The remains of a Viking settlement in Newfoundland",
          ],
          correctIndex: 3,
          rationale:
            "Vikings from Iceland reached Newfoundland about 1,000 years ago. Their settlement's remains are a World Heritage site.",
          evidence:
            "The remains of their settlement, l'Anse aux Meadows, are a World Heritage site.",
        },
        {
          id: "hi-006",
          biteId: "history.first-peoples.4",
          kind: "choice",
          prompt: "Who was the first to draw a map of Canada's East Coast?",
          options: [
            "John Cabot, in 1497",
            "Samuel de Champlain, in 1604",
            "Jacques Cartier, in 1534",
            "The Viking explorers of Greenland",
          ],
          correctIndex: 0,
          rationale:
            "John Cabot, an Italian immigrant to England, mapped the East Coast in 1497 and claimed Newfoundland for England.",
          evidence:
            "European exploration began in earnest in 1497 with the expedition of John Cabot, who was the first to draw a map of Canada's East Coast.",
        },
        {
          id: "hi-007",
          biteId: "history.first-peoples.5",
          kind: "choice",
          prompt: "For which European monarch did Jacques Cartier claim the land?",
          options: [
            "The King of England",
            "King Francis I of France",
            "The King of Spain",
            "The King of Norway",
          ],
          correctIndex: 1,
          rationale:
            "Cartier claimed the land for King Francis I of France. Cabot, not Cartier, claimed land for England.",
          evidence:
            "Between 1534 and 1542, Jacques Cartier made three voyages across the Atlantic, claiming the land for King Francis I of France.",
        },
      ],
    },
    {
      id: "history.new-france",
      moduleId: "history",
      title: "New France and the Conquest",
      summary:
        "Champlain, the fur trade, the Hudson's Bay Company, and 1759 on the Plains of Abraham.",
      minutes: 6,
      source: chapterUrl("history"),
      bites: [
        {
          id: "history.new-france.1",
          title: "1604: the first settlement",
          body: "In 1604, French explorers Pierre de Monts and Samuel de Champlain founded the first European settlement north of Florida: first on St. Croix Island (now in Maine), then at Port-Royal in Acadia (now Nova Scotia). In 1608 Champlain built a fortress at what is now Quebec City. The colonists struggled with the harsh climate.",
          takeaway:
            "1604: de Monts and Champlain settle Acadia. 1608: Champlain builds Quebec City.",
          evidence:
            "In 1604, the first European settlement north of Florida was established by French explorers Pierre de Monts and Samuel de Champlain",
        },
        {
          id: "history.new-france.2",
          title: "Champlain's allies and enemies",
          body: "Champlain allied with the Algonquin, Montagnais and Huron, long-time enemies of the Iroquois. The Iroquois, a confederacy of five (later six) First Nations, fought the French for a century. They made peace in 1701.",
          takeaway:
            "France sided with the Algonquin, Montagnais and Huron against the Iroquois. Peace came in 1701.",
          evidence:
            "Champlain allied the colony with the Algonquin, Montagnais, and Huron, historic enemies of the Iroquois",
        },
        {
          id: "history.new-france.3",
          title: "The fur trade and the empire",
          body: "The French and Aboriginal peoples worked together in a huge fur trade, driven by Europe's demand for beaver pelts. Leaders such as Jean Talon, Bishop Laval and Count Frontenac built a French empire in North America from Hudson Bay to the Gulf of Mexico. In 1690, when the English demanded Quebec's surrender, Frontenac refused: his only reply would come from the mouths of his cannons.",
          takeaway:
            "Europe wanted beaver pelts, and New France stretched from Hudson Bay to the Gulf of Mexico.",
          evidence:
            "The French and Aboriginal people collaborated in the vast fur-trade economy, driven by the demand for beaver pelts in Europe.",
        },
        {
          id: "history.new-france.4",
          title: "1670: the Hudson's Bay Company and the voyageurs",
          body: "In 1670, King Charles II of England gave the Hudson's Bay Company exclusive trading rights over all the land draining into Hudson Bay. For the next 100 years it competed with traders from Montreal. The skilled canoe travellers of the trade were called voyageurs and coureurs des bois, and they formed strong alliances with First Nations.",
          takeaway:
            "1670: the Hudson's Bay Company gets exclusive trading rights. Canoe men: voyageurs and coureurs des bois.",
          evidence:
            "In 1670, King Charles II of England granted the Hudson's Bay Company exclusive trading rights over the watershed draining into Hudson Bay.",
        },
        {
          id: "history.new-france.5",
          title: "1759: the Plains of Abraham",
          body: "By the 1700s the English colonies on the Atlantic coast were richer and more populous than New France, and France and Britain fought for North America. In 1759 the British defeated the French at the Battle of the Plains of Abraham at Quebec City, ending France's empire in America. Both commanders, James Wolfe and the Marquis de Montcalm, were killed.",
          takeaway:
            "1759, Plains of Abraham: Britain wins, France's empire in America ends, Wolfe and Montcalm both die.",
          evidence:
            "In 1759, the British defeated the French in the Battle of the Plains of Abraham at Québec City - marking the end of France's empire in America.",
        },
      ],
      teach: {
        prompt:
          "Tell the story of New France in five dates: 1604, 1608, 1670, 1701 and 1759. Say what happened and who was involved.",
        checklist: [
          "1604: de Monts and Champlain settle Acadia; 1608: Champlain's fortress at Quebec City",
          "Allied with the Algonquin, Montagnais and Huron against the Iroquois; peace in 1701",
          "1670: the Hudson's Bay Company gets trading rights; voyageurs and coureurs des bois",
          "1759: Plains of Abraham, Wolfe and Montcalm killed, France's empire in America ends",
        ],
        probe: "Why did the fur trade depend on what people in Europe wanted?",
      },
      test: [
        {
          id: "hi-008",
          biteId: "history.new-france.1",
          kind: "choice",
          prompt: "Who established the first European settlement north of Florida in 1604?",
          options: [
            "Jacques Cartier and Jean Talon",
            "The Hudson's Bay Company",
            "Samuel de Champlain and Pierre de Monts",
            "John Cabot and his English crew",
          ],
          correctIndex: 2,
          rationale:
            "Pierre de Monts and Samuel de Champlain settled first on St. Croix Island, then at Port-Royal in Acadia.",
          evidence:
            "In 1604, the first European settlement north of Florida was established by French explorers Pierre de Monts and Samuel de Champlain",
        },
        {
          id: "hi-009",
          biteId: "history.new-france.2",
          kind: "truefalse",
          prompt: "Champlain allied with the Iroquois against the Algonquin, Montagnais and Huron.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale:
            "It was the other way round. Champlain allied with the Algonquin, Montagnais and Huron against the Iroquois.",
          evidence:
            "Champlain allied the colony with the Algonquin, Montagnais, and Huron, historic enemies of the Iroquois",
        },
        {
          id: "hi-010",
          biteId: "history.new-france.3",
          kind: "choice",
          prompt: "What drove the fur trade of New France?",
          options: [
            "The demand for salmon in Britain",
            "The demand for timber in the American colonies",
            "The demand for horses in Spain",
            "The demand for beaver pelts in Europe",
          ],
          correctIndex: 3,
          rationale: "Europe's demand for beaver pelts drove the fur trade.",
          evidence: "driven by the demand for beaver pelts in Europe",
        },
        {
          id: "hi-011",
          biteId: "history.new-france.3",
          kind: "choice",
          prompt: "Which leader of New France refused to surrender Quebec to the English in 1690?",
          options: [
            "Count Frontenac",
            "Bishop François de Laval",
            "Jean Talon",
            "Le Moyne d'Iberville",
          ],
          correctIndex: 0,
          rationale: "Frontenac said his only reply would come from the mouths of his cannons.",
          evidence: "Count Frontenac refused to surrender Quebec to the English in 1690",
        },
        {
          id: "hi-012",
          biteId: "history.new-france.4",
          kind: "choice",
          prompt: "What did King Charles II grant the Hudson's Bay Company in 1670?",
          options: [
            "A fortress at what is now Quebec City",
            "Exclusive trading rights",
            "The right to govern the Thirteen Colonies",
            "Ownership of the Great Lakes region",
          ],
          correctIndex: 1,
          rationale:
            "The Company got exclusive trading rights over the land draining into Hudson Bay.",
          evidence:
            "In 1670, King Charles II of England granted the Hudson's Bay Company exclusive trading rights over the watershed draining into Hudson Bay.",
        },
        {
          id: "hi-013",
          biteId: "history.new-france.4",
          kind: "choice",
          prompt: "What were the skilled men who travelled by canoe called?",
          options: [
            "Fur brigades and porters",
            "Factors and clerks of the Company",
            "Voyageurs and coureurs des bois",
            "Settlers and surveyors",
          ],
          correctIndex: 2,
          rationale:
            "They were called voyageurs and coureurs des bois, and they formed strong alliances with First Nations.",
          evidence:
            "The skilled and courageous men who travelled by canoe were called voyageurs and coureurs des bois",
        },
        {
          id: "hi-014",
          biteId: "history.new-france.5",
          kind: "choice",
          prompt: "What happened on the Plains of Abraham in 1759?",
          options: [
            "The French and the Iroquois made peace",
            "The Americans invaded Quebec",
            "Champlain built a fortress at Quebec City",
            "The British defeated the French, ending France's empire in America",
          ],
          correctIndex: 3,
          rationale:
            "The British victory at Quebec City in 1759 ended France's empire in America. Wolfe and Montcalm were both killed.",
          evidence:
            "In 1759, the British defeated the French in the Battle of the Plains of Abraham at Québec City - marking the end of France's empire in America.",
        },
      ],
    },
    {
      id: "history.province-of-quebec",
      moduleId: "history",
      title: "The Quebec Act and the Loyalists",
      summary:
        "A conquered colony renamed, the Quebec Act of 1774, the Loyalists, and the first elected assemblies.",
      minutes: 5,
      source: chapterUrl("history"),
      bites: [
        {
          id: "history.province-of-quebec.1",
          title: "A conquered colony, renamed",
          body: "After the war, Britain renamed the colony the Province of Quebec. Its French-speaking Catholic people, the habitants or Canadiens, worked to keep their way of life inside an English-speaking, Protestant British Empire. As Governor of Quebec, Sir Guy Carleton (Lord Dorchester) defended their rights.",
          takeaway:
            "Britain renamed the colony the Province of Quebec. Its French Catholic people were the habitants or Canadiens.",
          evidence:
            "The Frenchspeaking Catholic people, known as habitants or Canadiens, strove to preserve their way of life in the English-speaking, Protestant-ruled British Empire.",
        },
        {
          id: "history.province-of-quebec.2",
          title: "The Quebec Act of 1774",
          body: "To govern the French Catholic majority, the British Parliament passed the Quebec Act of 1774, one of the constitutional foundations of Canada. It gave Catholics religious freedom and let them hold public office, which was not yet allowed in Britain. It restored French civil law and kept British criminal law.",
          takeaway:
            "The Quebec Act of 1774: religious freedom for Catholics, French civil law, British criminal law.",
          evidence:
            "The Quebec Act restored French civil law while maintaining British criminal law.",
        },
        {
          id: "history.province-of-quebec.3",
          title: "The United Empire Loyalists",
          body: "In 1776 the 13 British colonies to the south declared independence and became the United States. More than 40,000 people loyal to the Crown fled north to Nova Scotia and Quebec, and Joseph Brant led thousands of Loyalist Mohawks into Canada. About 3,000 Black Loyalists, free and enslaved, came too. In 1792, some Black Nova Scotians who had been given poor land moved on to found Freetown in Sierra Leone.",
          takeaway:
            "More than 40,000 Loyalists fled to Nova Scotia and Quebec. Joseph Brant led the Loyalist Mohawks.",
          evidence:
            'More than 40,000 people loyal to the Crown, called "Loyalists," fled the oppression of the American Revolution to settle in Nova Scotia and Quebec.',
        },
        {
          id: "history.province-of-quebec.4",
          title: "The beginnings of democracy, and the name Canada",
          body: "Democracy grew gradually and peacefully. The first elected assembly met in Halifax, Nova Scotia, in 1758, then Prince Edward Island in 1773 and New Brunswick in 1785. The Constitutional Act of 1791 split the Province of Quebec into Upper Canada (later Ontario) and Lower Canada (later Quebec), each with an elected assembly. The name Canada became official, and the Atlantic colonies and the two Canadas together were called British North America.",
          takeaway:
            "1791: Upper and Lower Canada, elected assemblies, and the official name Canada.",
          evidence:
            "The Constitutional Act of 1791 divided the Province of Quebec into Upper Canada (later Ontario)",
        },
      ],
      teach: {
        prompt:
          "Explain how Britain governed its new colony, in three steps: the Quebec Act, the Loyalists, and the Constitutional Act of 1791.",
        checklist: [
          "The Quebec Act of 1774 kept French civil law and allowed Catholic worship",
          "More than 40,000 Loyalists settled in Nova Scotia and Quebec after 1776",
          "The Constitutional Act of 1791 created Upper and Lower Canada, with elected assemblies and the official name Canada",
          "About 3,000 Black Loyalists came north; some left in 1792 to found Freetown",
        ],
        probe: "Which of the three was not Britain's decision?",
      },
      test: [
        {
          id: "hi-015",
          biteId: "history.province-of-quebec.1",
          kind: "choice",
          prompt: "What were the French-speaking Catholic people of the Province of Quebec called?",
          options: [
            "habitants or Canadiens",
            "Loyalists or Mohawk",
            "voyageurs or coureurs des bois",
            "Acadians or Métis",
          ],
          correctIndex: 0,
          rationale: "They were the habitants or Canadiens.",
          evidence: "The Frenchspeaking Catholic people, known as habitants or Canadiens",
        },
        {
          id: "hi-016",
          biteId: "history.province-of-quebec.2",
          kind: "choice",
          prompt: "What did the Quebec Act of 1774 do?",
          options: [
            "It made the colony an independent dominion",
            "It restored French civil law and kept British criminal law",
            "It gave women the vote in the province",
            "It united Upper and Lower Canada",
          ],
          correctIndex: 1,
          rationale:
            "The Act also gave Catholics religious freedom and the right to hold public office. Uniting the Canadas came later, in 1840.",
          evidence:
            "The Quebec Act restored French civil law while maintaining British criminal law.",
        },
        {
          id: "hi-017",
          biteId: "history.province-of-quebec.3",
          kind: "choice",
          prompt: "Who led thousands of Loyalist Mohawk into Canada?",
          options: ["Tecumseh", "Louis Riel", "Joseph Brant", "Poundmaker"],
          correctIndex: 2,
          rationale: "Joseph Brant led the Loyalist Mohawks north after the American Revolution.",
          evidence: "Joseph Brant led thousands of Loyalist Mohawk Indians into Canada.",
        },
        {
          id: "hi-018",
          biteId: "history.province-of-quebec.3",
          kind: "choice",
          prompt: "What did some Black Nova Scotians do in 1792?",
          options: [
            "They were granted the vote in Nova Scotia",
            "They moved to Upper Canada",
            "They joined Joseph Brant's Mohawk",
            "They established Freetown, Sierra Leone",
          ],
          correctIndex: 3,
          rationale:
            "Given poor land, some moved on to found Freetown in Sierra Leone, a new British colony for freed slaves.",
          evidence:
            "in 1792, some black Nova Scotians, who were given poor land, moved on to establish Freetown, Sierra Leone (West Africa), a new British colony for freed slaves",
        },
        {
          id: "hi-019",
          biteId: "history.province-of-quebec.4",
          kind: "choice",
          prompt: "What did the Constitutional Act of 1791 do?",
          options: [
            "It divided the Province of Quebec into Upper and Lower Canada",
            "It created the Dominion of Canada",
            "It made Quebec a province with French civil law",
            "It gave the colony responsible government",
          ],
          correctIndex: 0,
          rationale:
            "The Act created Upper Canada (mostly English-speaking and Protestant) and Lower Canada (mostly French-speaking and Catholic), each with an elected assembly.",
          evidence:
            "The Constitutional Act of 1791 divided the Province of Quebec into Upper Canada (later Ontario)",
        },
      ],
    },
    {
      id: "history.slavery-and-war-of-1812",
      moduleId: "history",
      title: "Ending slavery, a growing economy, and the War of 1812",
      summary:
        "Simcoe and abolition, the fur companies and the first stock exchange, and the American invasion.",
      minutes: 5,
      source: chapterUrl("history"),
      bites: [
        {
          id: "history.slavery-and-war-of-1812.1",
          title: "Ending slavery",
          body: "In the late 1700s, the British Parliament saw the first movement to abolish the slave trade. In 1793 Upper Canada, under Lieutenant Governor John Graves Simcoe, became the first province in the Empire to move toward abolition. Simcoe also founded York, now Toronto. Britain banned the buying and selling of slaves in 1807 and abolished slavery across the Empire in 1833. Thousands of slaves then escaped the United States to Canada on the Underground Railroad, a Christian anti-slavery network.",
          takeaway:
            "Upper Canada moved first, in 1793. Britain banned the slave trade in 1807 and slavery in 1833.",
          evidence:
            "In 1807, the British Parliament prohibited the buying and selling of slaves, and in 1833 abolished slavery throughout the Empire.",
        },
        {
          id: "history.slavery-and-war-of-1812.2",
          title: "A growing economy",
          body: "Canada's first companies were fur-trading rivals. The Hudson's Bay Company ran the northwest from Fort Garry, Fort Edmonton, Fort Langley and Fort Victoria, trading posts that later became cities. The first banks opened around 1800, and the Montreal Stock Exchange opened in 1832. For centuries the economy rested on farming and on exporting fur, fish and timber.",
          takeaway:
            "Trading posts became cities, the Montreal Stock Exchange opened in 1832, and fur, fish and timber paid the bills.",
          evidence: "The Montreal Stock Exchange opened in 1832.",
        },
        {
          id: "history.slavery-and-war-of-1812.3",
          title: "The War of 1812",
          body: "After Britain's navy beat Napoleon's fleet at Trafalgar in 1805, Americans resented British interference with their shipping. In June 1812 the United States invaded Canada, expecting an easy win. Canadian volunteers and First Nations, including the Shawnee led by Chief Tecumseh, fought alongside British soldiers, and by 1814 the invasion had failed. Britain then built costly defences, such as the Citadels at Halifax and Quebec City and Fort Henry at Kingston. Today's Canada-U.S. border is partly a result of this war.",
          takeaway:
            "The United States invaded in 1812 and failed by 1814. Today's border is partly a result.",
          evidence:
            "The present-day Canada-U.S.A. border is partly an outcome of the War of 1812, which ensured that Canada would remain independent of the United States.",
        },
        {
          id: "history.slavery-and-war-of-1812.4",
          title: "The War of 1812, battle by battle",
          body: "In 1812 Major-General Sir Isaac Brock captured Detroit, then was killed at Queenston Heights, a battle the Americans lost. In 1813 Charles de Salaberry and 460 soldiers, mostly Canadiens, turned back 4,000 Americans at Châteauguay, south of Montreal. Also in 1813, the Americans burned Government House and the Parliament Buildings at York (now Toronto). In 1814, in return, Major-General Robert Ross led an expedition from Nova Scotia that burned the White House in Washington.",
          takeaway:
            "Brock took Detroit and died at Queenston Heights. Americans burned York in 1813, Britain burned the White House in 1814.",
          evidence:
            "In 1813 the Americans burned Government House and the Parliament Buildings in York (now Toronto).",
        },
        {
          id: "history.slavery-and-war-of-1812.5",
          title: "Wellington, the Rideau Canal and Bytown",
          body: "In 1814 the Duke of Wellington sent some of his best soldiers to defend Canada. He then chose Bytown (now Ottawa) as the end of the Rideau Canal, part of a chain of forts against another American invasion. So Wellington, who defeated Napoleon in 1815, helped found Canada's capital.",
          takeaway:
            "Wellington chose Bytown, now Ottawa, as the end of the Rideau Canal, and so helped found the capital.",
          evidence:
            "He then chose Bytown (Ottawa) as the endpoint of the Rideau Canal, part of a network of forts to prevent the U.S.A. from invading Canada again.",
        },
      ],
      teach: {
        prompt:
          "Tell the story of the War of 1812, from the invasion to the outcome, with dates. Then say what Britain did about slavery in 1807 and 1833.",
        checklist: [
          "The United States invaded in June 1812, expecting an easy win",
          "Canadian volunteers and First Nations, including Tecumseh's Shawnee, fought with British soldiers",
          "The Americans burned York in 1813, Ross burned the White House in 1814, and the invasion had failed by 1814",
          "Britain banned the slave trade in 1807 and abolished slavery across the Empire in 1833",
        ],
        probe: "What did the War of 1812 leave behind that Canadians still live with?",
      },
      test: [
        {
          id: "hi-020",
          biteId: "history.slavery-and-war-of-1812.1",
          kind: "choice",
          prompt: "What did Upper Canada do in 1793?",
          options: [
            "It banned the fur trade with the United States",
            "It became the first province in the Empire to move toward abolition",
            "It became the first province to elect an assembly",
            "It joined the United States of America",
          ],
          correctIndex: 1,
          rationale:
            "Under Lieutenant Governor Simcoe, Upper Canada was the first province in the Empire to move toward abolition. Britain abolished slavery across the Empire in 1833.",
          evidence:
            "In 1793, Upper Canada, led by Lieutenant Governor John Graves Simcoe, a Loyalist military officer, became the first province in the Empire to move toward abolition",
        },
        {
          id: "hi-021",
          biteId: "history.slavery-and-war-of-1812.2",
          kind: "choice",
          prompt:
            "What were Fort Garry, Fort Edmonton and Fort Victoria before they became cities?",
          options: [
            "French army fortresses",
            "Loyalist settlement villages",
            "Hudson's Bay Company trading posts",
            "Royal Navy shipyards",
          ],
          correctIndex: 2,
          rationale: "They were Hudson's Bay Company trading posts that later grew into cities.",
          evidence:
            "came to dominate the trade in the northwest from Fort Garry (Winnipeg) and Fort Edmonton to Fort Langley (near Vancouver) and Fort Victoria - trading posts that later became cities",
        },
        {
          id: "hi-022",
          biteId: "history.slavery-and-war-of-1812.3",
          kind: "choice",
          prompt: "Who supported the defence of Canada during the War of 1812?",
          options: [
            "French troops sent by Napoleon",
            "The colonial militia of the United States",
            "Hudson's Bay Company voyageurs only",
            "British soldiers with Canadian volunteers and First Nations",
          ],
          correctIndex: 3,
          rationale:
            "Canadian volunteers and First Nations, including Tecumseh's Shawnee, fought alongside British soldiers.",
          evidence:
            "Canadian volunteers and First Nations, including Shawnee led by Chief Tecumseh, supported British soldiers in Canada's defence",
        },
        {
          id: "hi-057",
          biteId: "history.slavery-and-war-of-1812.4",
          kind: "choice",
          prompt: "What happened at York in 1813?",
          options: [
            "American forces burned Government House and the Parliament Buildings",
            "The Americans were turned back by French Canadian militia",
            "Major-General Sir Isaac Brock was killed defending the town",
            "The British navy sank the American fleet in the harbour",
          ],
          correctIndex: 0,
          rationale:
            "In 1813 American forces burned Government House and the Parliament Buildings at York, now Toronto. Britain answered in 1814 by burning the White House.",
          evidence:
            "In 1813 the Americans burned Government House and the Parliament Buildings in York (now Toronto).",
        },
        {
          id: "hi-058",
          biteId: "history.slavery-and-war-of-1812.1",
          kind: "choice",
          prompt: "What was the Underground Railroad?",
          options: [
            "A railway built to move grain out of the West",
            "A Christian anti-slavery network that helped slaves escape into Canada",
            "The route the Loyalists took into Nova Scotia",
            "A line of forts along the St. Lawrence",
          ],
          correctIndex: 1,
          rationale:
            "It was a Christian anti-slavery network. Thousands of slaves followed the North Star to freedom in Canada.",
          evidence:
            "settled in Canada via the Underground Railroad, a Christian anti-slavery network",
        },
        {
          id: "hi-063",
          biteId: "history.slavery-and-war-of-1812.5",
          kind: "choice",
          prompt: "How did the Duke of Wellington help found the national capital?",
          options: [
            "He drew up the terms that ended the American invasion of 1814",
            "He chose Bytown (Ottawa) as the endpoint of the Rideau Canal",
            "He ordered the fortification of the Citadels at Halifax and Quebec",
            "He served as the first Governor General of the Dominion",
          ],
          correctIndex: 1,
          rationale: "He chose Bytown, now Ottawa, as the end of the Rideau Canal.",
          evidence:
            "Wellington, who defeated Napoleon in 1815, therefore played a direct role in founding the national capital.",
        },
      ],
    },
    {
      id: "history.rebellions",
      moduleId: "history",
      title: "The 1837-38 rebellions and responsible government",
      summary:
        "Why the rebellions failed, what Lord Durham recommended, and who got responsible government first.",
      minutes: 6,
      source: chapterUrl("history"),
      bites: [
        {
          id: "history.rebellions.1",
          title: "Why the rebellions failed",
          body: "In the 1830s, reformers in Upper and Lower Canada felt democracy was coming too slowly. Some wanted American-style republican values, or even to join the United States. Armed rebellions broke out in 1837-38 near Montreal and in Toronto, but the rebels lacked public support. British troops and Canadian volunteers defeated them. Some rebels were hanged or exiled, and some exiles later returned.",
          takeaway: "The 1837-38 rebellions failed for lack of public support.",
          evidence:
            "When armed rebellions occurred in 1837-38 in the area outside Montreal and in Toronto, the rebels did not have enough public support to succeed.",
        },
        {
          id: "history.rebellions.2",
          title: "Lord Durham's report",
          body: "Lord Durham, an English reformer, was sent to report on the rebellions. He recommended uniting Upper and Lower Canada and giving them responsible government. That means the Crown's ministers need the support of a majority of elected representatives to govern. Several reformers of this time, including Étienne-Paschal Taché and George-Étienne Cartier, later became Fathers of Confederation, as did John A. Macdonald.",
          takeaway:
            "Responsible government: ministers need the support of a majority of elected representatives.",
          evidence:
            "This meant that the ministers of the Crown must have the support of a majority of the elected representatives in order to govern.",
        },
        {
          id: "history.rebellions.3",
          title: "Durham's mistake",
          body: "Durham also said the Canadiens would progress fastest by assimilating into English-speaking Protestant culture. This showed a complete lack of understanding of French Canadians, who wanted to keep French Canada's distinct identity.",
          takeaway:
            "Durham's call to assimilate the Canadiens showed a complete lack of understanding of French Canadians.",
          evidence:
            "Lord Durham also said that the quickest way for the Canadiens to achieve progress was to assimilate into English-speaking Protestant culture.",
        },
        {
          id: "history.rebellions.4",
          title: "Who got it first, and who led it",
          body: "In 1840 Upper and Lower Canada were united as the Province of Canada. Reformers Louis-Hippolyte La Fontaine and Robert Baldwin, along with Joseph Howe in Nova Scotia, worked with British governors toward responsible government. Nova Scotia got it first, in 1847-48. In 1848-49 Lord Elgin, governor of United Canada, introduced it there, and La Fontaine became the first leader of a responsible government in the Canadas.",
          takeaway:
            "Nova Scotia got responsible government first, in 1847-48. La Fontaine led the first one in the Canadas.",
          evidence:
            "The first British North American colony to attain full responsible government was Nova Scotia in 1847-48.",
        },
        {
          id: "history.rebellions.5",
          title: "The system we have today",
          body: "Responsible government is the system Canada still has: if the government loses a confidence vote in the assembly, it must resign. La Fontaine, a champion of democracy and French language rights, was the first head of a responsible government in Canada, a role similar to prime minister.",
          takeaway: "A government that loses a confidence vote must resign.",
          evidence: "if the government loses a confidence vote in the assembly it must resign",
        },
      ],
      teach: {
        prompt:
          "Explain responsible government to someone who has never heard of it: where it came from, what it means, and how a government loses power under it.",
        checklist: [
          "The 1837-38 rebellions came from frustration with slow democratic progress, and failed",
          "Lord Durham recommended uniting the Canadas and giving them responsible government",
          "Ministers need the support of a majority of elected representatives",
          "Nova Scotia got it first in 1847-48; the Canadas in 1848-49 under La Fontaine",
        ],
        probe:
          "The Canadas already had elected assemblies from 1791. What did responsible government add?",
      },
      test: [
        {
          id: "hi-023",
          biteId: "history.rebellions.1",
          kind: "choice",
          prompt: "Why did the rebellions of 1837-38 fail?",
          options: [
            "The United States refused to supply them",
            "Britain sent a large army from Europe",
            "The rebels did not have enough public support",
            "The rebels wanted responsible government too late",
          ],
          correctIndex: 2,
          rationale:
            "The rebels lacked public support and were defeated by British troops and Canadian volunteers.",
          evidence: "the rebels did not have enough public support to succeed.",
        },
        {
          id: "hi-024",
          biteId: "history.rebellions.2",
          kind: "choice",
          prompt: "What did Lord Durham recommend after the rebellions?",
          options: [
            "That the colonies be joined to the United States",
            "That Quebec become independent",
            "That the Governor be elected by the people",
            "That Upper and Lower Canada be merged and given responsible government",
          ],
          correctIndex: 3,
          rationale:
            "Durham recommended uniting the Canadas and giving them responsible government.",
          evidence:
            "recommended that Upper and Lower Canada be merged and given responsible government",
        },
        {
          id: "hi-025",
          biteId: "history.rebellions.3",
          kind: "truefalse",
          prompt: "Lord Durham wanted the Canadiens to assimilate into English-speaking culture.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale: "He did, and it showed a complete lack of understanding of French Canadians.",
          evidence:
            "Lord Durham also said that the quickest way for the Canadiens to achieve progress was to assimilate into English-speaking Protestant culture.",
        },
        {
          id: "hi-026",
          biteId: "history.rebellions.4",
          kind: "choice",
          prompt: "Which colony was the first to attain full responsible government?",
          options: [
            "Nova Scotia, in 1847-48",
            "Upper Canada, in 1837",
            "Lower Canada, in 1791",
            "The Province of Canada, in 1867",
          ],
          correctIndex: 0,
          rationale: "Nova Scotia came first, in 1847-48. United Canada followed in 1848-49.",
          evidence:
            "The first British North American colony to attain full responsible government was Nova Scotia in 1847-48.",
        },
        {
          id: "hi-027",
          biteId: "history.rebellions.5",
          kind: "choice",
          prompt:
            "Under responsible government, what happens if the government loses a confidence vote?",
          options: [
            "The assembly is dissolved and voters decide",
            "It must resign",
            "The Governor General decides the law instead",
            "It keeps governing until the next election",
          ],
          correctIndex: 1,
          rationale:
            "Under responsible government, a government that loses a confidence vote must resign.",
          evidence:
            "This is the system that we have today: if the government loses a confidence vote in the assembly it must resign.",
        },
        {
          id: "hi-028",
          biteId: "history.rebellions.4",
          kind: "choice",
          prompt: "Who became the first leader of a responsible government in the Canadas?",
          options: ["Baldwin", "Howe", "La Fontaine", "Elgin"],
          correctIndex: 2,
          rationale:
            "La Fontaine led the first responsible government in the Canadas, in 1848-49. Baldwin was his partner, Howe worked in Nova Scotia, and Elgin was the governor.",
          evidence:
            "La Fontaine, a champion of democracy and French language rights, became the first leader of a responsible government in the Canadas.",
        },
      ],
    },
    {
      id: "history.confederation",
      moduleId: "history",
      title: "Confederation: how the country was made",
      summary:
        "The Fathers of Confederation, the British North America Act, two levels of government, and the word Dominion.",
      minutes: 4,
      source: chapterUrl("history"),
      bites: [
        {
          id: "history.confederation.1",
          title: "How the country was made",
          body: "From 1864 to 1867, representatives of Nova Scotia, New Brunswick and the Province of Canada, with British support, worked together to create a new country. They are known as the Fathers of Confederation. The Province of Canada was split into Ontario and Quebec, which joined New Brunswick and Nova Scotia to form the Dominion of Canada. The British Parliament passed the British North America Act, and the Dominion was born on July 1, 1867.",
          takeaway:
            "The Fathers of Confederation built Canada from 1864 to 1867. It was born on July 1, 1867.",
          evidence:
            "From 1864 to 1867, representatives of Nova Scotia, New Brunswick and the Province of Canada, with British support, worked together to establish a new country.",
        },
        {
          id: "history.confederation.2",
          title: "Two levels of government",
          body: "The Fathers of Confederation created two levels of government: federal and provincial. Each province elects its own legislature and controls areas such as education and health. Until 1982, July 1 was called Dominion Day. Today it is Canada Day.",
          takeaway:
            "Federal and provincial governments, with education and health run by the provinces.",
          evidence: "They created two levels of government: federal and provincial.",
        },
        {
          id: "history.confederation.3",
          title: "Dominion from sea to sea",
          body: "In 1864 Sir Leonard Tilley, a Father of Confederation from New Brunswick, suggested the name Dominion of Canada. He took it from Psalm 72 in the Bible, which speaks of dominion from sea to sea. The title was written into the Constitution, was used officially for about 100 years, and is still part of Canada's heritage. In 1921 King George V gave Canada its national colours, white and red.",
          takeaway: "Leonard Tilley took the word Dominion from Psalm 72: from sea to sea.",
          evidence:
            'He was inspired by Psalm 72 in the Bible which refers to "dominion from sea to sea and from the river to the ends of the earth."',
        },
      ],
      teach: {
        prompt:
          "Say how Canada was made: which colonies took part, which law created it, what the two levels of government do, and where the word Dominion came from.",
        checklist: [
          "Nova Scotia, New Brunswick and the Province of Canada worked from 1864 to 1867: the Fathers of Confederation",
          "The British North America Act of 1867; the Dominion was born on July 1, 1867",
          "Each province elects a legislature and controls areas such as education and health",
          "Leonard Tilley took Dominion from Psalm 72; July 1 was Dominion Day until 1982",
        ],
        probe:
          "Why was Canada in 1867 a self-governing Dominion, and not a fully independent country?",
      },
      test: [
        {
          id: "hi-029",
          biteId: "history.confederation.1",
          kind: "choice",
          prompt: "Which law created the Dominion of Canada in 1867?",
          options: [
            "The Constitutional Act, 1791",
            "The Quebec Act, 1774",
            "The Statute of Westminster, 1931",
            "The British North America Act, 1867",
          ],
          correctIndex: 3,
          rationale:
            "The British Parliament passed the British North America Act in 1867, and the Dominion was born on July 1, 1867.",
          evidence: "The British Parliament passed the British North America Act in 1867.",
        },
        {
          id: "hi-031",
          biteId: "history.confederation.2",
          kind: "choice",
          prompt: "Which two areas do the provinces control?",
          options: [
            "Education and health",
            "Defence and money",
            "Trade and navigation",
            "Citizenship and treaties",
          ],
          correctIndex: 0,
          rationale:
            "Each province elects its own legislature and controls areas such as education and health.",
          evidence:
            "Each province would elect its own legislature and have control of such areas as education and health.",
        },
        {
          id: "hi-032",
          biteId: "history.confederation.2",
          kind: "truefalse",
          prompt: "July 1 has been called Canada Day since 1867.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "It was Dominion Day until 1982. Today it is officially Canada Day.",
          evidence:
            'Until 1982, July 1 was celebrated as "Dominion Day" to commemorate the day that Canada became a self-governing Dominion.',
        },
        {
          id: "hi-033",
          biteId: "history.confederation.3",
          kind: "choice",
          prompt: "Where did Sir Leonard Tilley get the word Dominion for Canada's name?",
          options: [
            "From the British North America Act",
            "From Psalm 72 in the Bible",
            "From a French fur-trade term",
            "From the Latin name for New France",
          ],
          correctIndex: 1,
          rationale:
            "Tilley took the word from Psalm 72, which speaks of dominion from sea to sea.",
          evidence:
            'He was inspired by Psalm 72 in the Bible which refers to "dominion from sea to sea and from the river to the ends of the earth."',
        },
        {
          id: "hi-059",
          biteId: "history.confederation.1",
          kind: "choice",
          prompt: "Which colonies' representatives created the new country between 1864 and 1867?",
          options: [
            "Ontario, Quebec and British Columbia",
            "Manitoba, Prince Edward Island and Newfoundland",
            "Nova Scotia, New Brunswick and the Province of Canada",
            "Upper Canada and the Northwest Territories",
          ],
          correctIndex: 2,
          rationale:
            "Representatives of Nova Scotia, New Brunswick and the Province of Canada were the Fathers of Confederation. Ontario and Quebec were carved out of the Province of Canada in 1867.",
          evidence:
            "From 1864 to 1867, representatives of Nova Scotia, New Brunswick and the Province of Canada, with British support, worked together to establish a new country.",
        },
      ],
    },
    {
      id: "history.dominion-expands",
      moduleId: "history",
      title: "The growing Dominion and its first leaders",
      summary:
        "The order in which provinces and territories joined, and the two men who led the new country.",
      minutes: 4,
      source: chapterUrl("history"),
      bites: [
        {
          id: "history.dominion-expands.1",
          title: "Canada grows",
          body: "In order: Ontario, Quebec, Nova Scotia and New Brunswick in 1867; Manitoba and the Northwest Territories in 1870; British Columbia in 1871; Prince Edward Island in 1873; the Arctic Islands added to the N.W.T. in 1880; Yukon Territory in 1898; Alberta and Saskatchewan in 1905; Newfoundland and Labrador in 1949; and Nunavut in 1999. In the 1920s some people wanted the British West Indies to join, but that never happened.",
          takeaway:
            "Manitoba 1870, B.C. 1871, P.E.I. 1873, Yukon 1898, Alberta and Saskatchewan 1905, Newfoundland 1949, Nunavut 1999.",
          evidence:
            "1898 - Yukon Territory 1905 - Alberta, Saskatchewan 1949 - Newfoundland and Labrador 1999 - Nunavut",
        },
        {
          id: "history.dominion-expands.2",
          title: "The first four provinces",
          body: "Canada began in 1867 with four provinces: Ontario, Quebec, Nova Scotia and New Brunswick. Manitoba and the Northwest Territories came next in 1870, then British Columbia in 1871 and Prince Edward Island in 1873.",
          takeaway: "The four provinces of 1867: Ontario, Quebec, Nova Scotia and New Brunswick.",
          evidence: "1867 - Ontario, Quebec, Nova Scotia, New Brunswick",
        },
        {
          id: "history.dominion-expands.3",
          title: "Macdonald and Cartier",
          body: "In 1867 Sir John A. Macdonald, a Father of Confederation, became Canada's first Prime Minister. Born in Scotland on January 11, 1815, he grew up in Upper Canada and was a lawyer in Kingston. January 11 is Sir John A. Macdonald Day. Sir George-Étienne Cartier, a Montreal railway lawyer, was the key architect of Confederation from Quebec. He led Quebec into Confederation and helped bring in the Northwest Territories, Manitoba and British Columbia.",
          takeaway:
            "Macdonald was the first Prime Minister. Cartier led Quebec into Confederation.",
          evidence:
            "In 1867, Sir John Alexander Macdonald, a Father of Confederation, became Canada's first Prime Minister.",
        },
      ],
      teach: {
        prompt:
          "Put the growth of Canada in order from 1867 to 1999. Then name the first Prime Minister and the man who led Quebec into Confederation.",
        checklist: [
          "1867: Ontario, Quebec, Nova Scotia, New Brunswick",
          "1870 Manitoba and the N.W.T., 1871 B.C., 1873 P.E.I., 1898 Yukon",
          "1905 Alberta and Saskatchewan, 1949 Newfoundland and Labrador, 1999 Nunavut",
          "Macdonald was the first Prime Minister; Cartier led Quebec into Confederation",
        ],
        probe: "Which two provinces were created in 1905, and which joined in 1949?",
      },
      test: [
        {
          id: "hi-030",
          biteId: "history.dominion-expands.2",
          kind: "choice",
          prompt: "Which four provinces formed Canada in 1867?",
          options: [
            "Ontario, Quebec, Manitoba, British Columbia",
            "Upper Canada, Lower Canada, Acadia, Rupert's Land",
            "Quebec, Nova Scotia, Prince Edward Island, Newfoundland",
            "Ontario, Quebec, Nova Scotia, New Brunswick",
          ],
          correctIndex: 3,
          rationale:
            "Canada began with Ontario, Quebec, Nova Scotia and New Brunswick. The other options mix in provinces that joined later.",
          evidence:
            "Ontario and Quebec, which, together with New Brunswick and Nova Scotia, formed the new country called the Dominion of Canada",
        },
        {
          id: "hi-034",
          biteId: "history.dominion-expands.3",
          kind: "choice",
          prompt: "Who became Canada's first Prime Minister in 1867?",
          options: [
            "Sir John A. Macdonald, born in Scotland",
            "Sir Leonard Tilley",
            "Sir George-Étienne Cartier",
            "Sir Wilfrid Laurier",
          ],
          correctIndex: 0,
          rationale:
            "Macdonald, born in Scotland in 1815, was the first Prime Minister. Tilley suggested the name Dominion, and Cartier led Quebec into Confederation.",
          evidence:
            "In 1867, Sir John Alexander Macdonald, a Father of Confederation, became Canada's first Prime Minister.",
        },
        {
          id: "hi-035",
          biteId: "history.dominion-expands.3",
          kind: "choice",
          prompt: "Who was the key architect of Confederation from Quebec?",
          options: ["Tilley", "Cartier", "Laurier", "Taché"],
          correctIndex: 1,
          rationale:
            "Cartier, a Montreal railway lawyer and Macdonald's ally, was the key architect of Confederation from Quebec.",
          evidence:
            "Sir George-Étienne Cartier was the key architect of Confederation from Quebec.",
        },
        {
          id: "hi-060",
          biteId: "history.dominion-expands.1",
          kind: "choice",
          prompt: "Which two provinces joined the Dominion in 1905?",
          options: [
            "Manitoba and British Columbia",
            "Yukon Territory and Nunavut",
            "Alberta and Saskatchewan",
            "Prince Edward Island and Newfoundland",
          ],
          correctIndex: 2,
          rationale: "Alberta and Saskatchewan joined in 1905.",
          evidence:
            "1898 - Yukon Territory 1905 - Alberta, Saskatchewan 1949 - Newfoundland and Labrador",
        },
      ],
    },
    {
      id: "history.the-west",
      moduleId: "history",
      title: "The West and the railway",
      summary:
        "Riel and the Métis, the Mounted Police, the railway's last spike, and settlement before 1914.",
      minutes: 7,
      source: chapterUrl("history"),
      bites: [
        {
          id: "history.the-west.1",
          title: "The Métis are not consulted",
          body: "In 1869 Canada took over the huge northwest region from the Hudson's Bay Company without consulting the 12,000 Métis of the Red River. Louis Riel led an armed uprising and seized Fort Garry, the territorial capital. It was a real threat: Canada could not stretch from sea to sea without control of the interior.",
          takeaway: "Canada took over the northwest in 1869 without consulting the Métis.",
          evidence:
            "the 12,000 Métis of the Red River were not consulted. In response, Louis Riel led an armed uprising and seized Fort Garry, the territorial capital",
        },
        {
          id: "history.the-west.2",
          title: "Manitoba, and Riel's two rebellions",
          body: "In 1870 Ottawa sent soldiers to retake Fort Garry. Riel fled to the United States, and Canada created a new province, Manitoba. Riel was elected to Parliament but never took his seat. As settlement again threatened Métis and Indian rights, a second rebellion broke out in 1885 in what is now Saskatchewan. Riel was tried and executed for high treason, which Quebec strongly opposed. Many see him as a hero and the father of Manitoba. Gabriel Dumont was the Métis' greatest military leader.",
          takeaway:
            "Riel's first uprising led to Manitoba in 1870. After the 1885 rebellion he was executed.",
          evidence:
            "a second rebellion in 1885 in present-day Saskatchewan led to Riel's trial and execution for high treason, a decision that was strongly opposed in Quebec",
        },
        {
          id: "history.the-west.3",
          title: "From the NWMP to the Mounties",
          body: "After the first Métis uprising, Prime Minister Macdonald created the North West Mounted Police in 1873 to pacify the West and help negotiate with the Indians. The NWMP founded Fort Calgary, Fort MacLeod and other posts that are now towns and cities, with headquarters in Regina. Today the Royal Canadian Mounted Police, the Mounties, are the national police force and one of Canada's best-known symbols.",
          takeaway: "The NWMP, created in 1873 to keep order in the West, became the RCMP.",
          evidence:
            "Prime Minister Macdonald established the North West Mounted Police (NWMP) in 1873 to pacify the West and assist in negotiations with the Indians.",
        },
        {
          id: "history.the-west.4",
          title: "A railway from sea to sea",
          body: "British Columbia joined Canada in 1871 because Ottawa promised a railway to the West Coast. On November 7, 1885, Donald Smith (Lord Strathcona), the Scottish-born director of the Canadian Pacific Railway, drove the last spike. British and American investors paid for it, and European and Chinese workers built it. Afterwards, Chinese people faced discrimination, including the Head Tax, a race-based entry fee. The Government of Canada apologized for it in 2006.",
          takeaway:
            "The railway's last spike: November 7, 1885. B.C. joined in 1871 for that railway.",
          evidence:
            "On November 7, 1885, a powerful symbol of unity was completed when Donald Smith (Lord Strathcona), the Scottish-born director of the Canadian Pacific Railway (CPR), drove the last spike.",
        },
        {
          id: "history.the-west.5",
          title: "Settling the West",
          body: "In the boom of the 1890s and early 1900s, Canada's economy grew and industrialized, and a million British and a million American immigrants arrived. Sir Wilfrid Laurier, the first French-Canadian prime minister since Confederation, encouraged settlement of the West. The railway brought 170,000 Ukrainians, 115,000 Poles and tens of thousands from Germany, France, Norway and Sweden, who built a thriving farm economy before 1914.",
          takeaway: "Laurier encouraged western settlement, and the railway brought the settlers.",
          evidence:
            "One million British and one million Americans immigrated to Canada at this time.",
        },
      ],
      teach: {
        prompt:
          "Explain in order how Canada took control of the West: the 1869 takeover, the Métis response, the police, the railway, and the settlers.",
        checklist: [
          "1869: Canada takes over the northwest without consulting the Métis",
          "Riel seizes Fort Garry; Manitoba is created in 1870; Riel is hanged after 1885",
          "The NWMP in 1873, and the railway's last spike in 1885",
          "Laurier encourages settlement, and immigrants farm the West before 1914",
        ],
        probe: "Why did British Columbia join Canada in 1871?",
      },
      test: [
        {
          id: "hi-036",
          biteId: "history.the-west.1",
          kind: "choice",
          prompt: "Why did Louis Riel lead an armed uprising in 1869?",
          options: [
            "The Hudson's Bay Company raised the price of furs",
            "Manitoba had been refused the right to vote",
            "The CPR route was moved away from Fort Garry",
            "Canada took over the northwest without consulting the Métis of the Red River",
          ],
          correctIndex: 3,
          rationale:
            "The 12,000 Métis of the Red River were not consulted when Canada took over the region.",
          evidence:
            "When Canada took over the vast northwest region from the Hudson's Bay Company in 1869, the 12,000 Métis of the Red River were not consulted.",
        },
        {
          id: "hi-037",
          biteId: "history.the-west.2",
          kind: "choice",
          prompt: "What happened to Louis Riel after the second rebellion in 1885?",
          options: [
            "He was tried and executed for high treason",
            "He became the first premier of Saskatchewan",
            "He was elected to Parliament and took his seat",
            "He was exiled to the United States and lived in peace",
          ],
          correctIndex: 0,
          rationale:
            "After the 1885 rebellion Riel was tried and executed for high treason, which Quebec strongly opposed.",
          evidence:
            "a second rebellion in 1885 in present-day Saskatchewan led to Riel's trial and execution for high treason",
        },
        {
          id: "hi-038",
          biteId: "history.the-west.3",
          kind: "choice",
          prompt: "Why did Prime Minister Macdonald create the North West Mounted Police in 1873?",
          options: [
            "To build the Canadian Pacific Railway",
            "To pacify the West and assist in negotiations with the Indians",
            "To collect the Head Tax at the border",
            "To guard the frontier against an American invasion",
          ],
          correctIndex: 1,
          rationale: "The NWMP was created to pacify the West and help negotiate with the Indians.",
          evidence:
            "Prime Minister Macdonald established the North West Mounted Police (NWMP) in 1873 to pacify the West and assist in negotiations with the Indians.",
        },
        {
          id: "hi-039",
          biteId: "history.the-west.4",
          kind: "choice",
          prompt: "Who drove the last spike of the Canadian Pacific Railway on November 7, 1885?",
          options: [
            "Sir Leonard Tilley",
            "Sir John A. Macdonald",
            "Donald Smith, Lord Strathcona",
            "Major General Sir Sam Steele",
          ],
          correctIndex: 2,
          rationale:
            "Donald Smith was the CPR's Scottish-born director. The railway kept the promise made to British Columbia in 1871.",
          evidence:
            "On November 7, 1885, a powerful symbol of unity was completed when Donald Smith (Lord Strathcona), the Scottish-born director of the Canadian Pacific Railway (CPR), drove the last spike.",
        },
        {
          id: "hi-040",
          biteId: "history.the-west.4",
          kind: "choice",
          prompt: "What was the Head Tax, which the Government of Canada apologized for in 2006?",
          options: [
            "A tax on First Nations furs",
            "A fee Métis settlers paid for land titles",
            "A toll on wheat shipped by rail",
            "A race-based entry fee charged to Chinese immigrants",
          ],
          correctIndex: 3,
          rationale:
            "After the railway was built, Chinese immigrants had to pay the Head Tax, a race-based entry fee.",
          evidence:
            "Afterwards the Chinese were subject to discrimination, including the Head Tax, a race-based entry fee.",
        },
        {
          id: "hi-041",
          biteId: "history.the-west.5",
          kind: "choice",
          prompt: "Which prime minister encouraged immigrants to settle the West?",
          options: ["Laurier", "Macdonald", "Borden", "Tilley"],
          correctIndex: 0,
          rationale:
            "Sir Wilfrid Laurier encouraged immigration to the West. The guide notes his portrait is on the five dollar bill.",
          evidence:
            "Sir Wilfrid Laurier became the first French-Canadian prime minister since Confederation and encouraged immigration to the West.",
          caveat: "Banknote designs change; confirm which bills carry which portraits today.",
        },
        {
          id: "hi-042",
          biteId: "history.the-west.5",
          kind: "choice",
          prompt: "What did the railway make possible in the West before 1914?",
          options: [
            "The founding of the Hudson's Bay Company",
            "Settlement by immigrants who developed a thriving agricultural sector",
            "The creation of the North West Mounted Police",
            "The first elected assembly in Manitoba",
          ],
          correctIndex: 1,
          rationale:
            "The railway let 170,000 Ukrainians, 115,000 Poles and many others settle and farm the West.",
          evidence: "to settle in the West before 1914 and develop a thriving agricultural sector",
        },
      ],
    },
    {
      id: "history.great-war",
      moduleId: "history",
      title: "The First World War and the vote for women",
      summary:
        "Vimy Ridge and the last hundred days, internment, women's suffrage, and Remembrance Day.",
      minutes: 8,
      source: chapterUrl("history"),
      bites: [
        {
          id: "history.great-war.1",
          title: "Before 1914: the South African War",
          body: 'Most Canadians were proud to be part of the British Empire. Over 7,000 volunteered to fight in the South African War (1899 to 1902), usually called the Boer War, and over 260 died. In 1900, Canadian victories at Paardeberg ("Horse Mountain") and Lillefontein boosted national pride.',
          takeaway: "Over 7,000 Canadians volunteered for the Boer War.",
          evidence:
            'In 1900, Canadians took part in the battles of Paardeberg ("Horse Mountain") and Lillefontein, victories that strengthened national pride in Canada.',
        },
        {
          id: "history.great-war.2",
          title: "Canada enters the Great War",
          body: "In 1914 Germany attacked Belgium and France, and Britain declared war. Ottawa formed the Canadian Expeditionary Force, later called the Canadian Corps. More than 600,000 Canadians served, most of them volunteers, from a population of only eight million. They proved tough, inventive soldiers on the Western Front.",
          takeaway: "More than 600,000 Canadians served, from a population of eight million.",
          evidence:
            "More than 600,000 Canadians served in the war, most of them volunteers, out of a total population of eight million.",
        },
        {
          id: "history.great-war.3",
          title: "Vimy Ridge and the last hundred days",
          body: "In April 1917 the Canadian Corps captured Vimy Ridge, with 10,000 killed or wounded, and earned a reputation as the shock troops of the Empire. April 9 is Vimy Day. In 1918 General Sir Arthur Currie, Canada's greatest soldier, led the Corps in the last hundred days, including the victory at Amiens on August 8, which the Germans called the black day of their army. The war ended with the Armistice on November 11, 1918. In total, 60,000 Canadians were killed and 170,000 wounded.",
          takeaway:
            "Vimy Ridge, April 1917. Armistice, November 11, 1918. 60,000 Canadians killed.",
          evidence:
            "The Canadian Corps captured Vimy Ridge in April 1917, with 10,000 killed or wounded",
        },
        {
          id: "history.great-war.4",
          title: "Internment at home",
          body: "From 1914 to 1920, Ottawa interned over 8,000 former Austro-Hungarian subjects, mostly Ukrainian men, as enemy aliens in 24 labour camps across Canada. Britain had advised against it.",
          takeaway:
            "1914 to 1920: over 8,000 people, mostly Ukrainian men, interned as enemy aliens.",
          evidence:
            'Ottawa interned over 8,000 former Austro-Hungarian subjects, mainly Ukrainian men, as "enemy aliens" in 24 labour camps across Canada',
        },
        {
          id: "history.great-war.5",
          title: "How women got the vote",
          body: "At Confederation, only white men who owned property could vote, as in most democracies then. Dr. Emily Stowe, the first Canadian woman to practise medicine in Canada, founded the women's suffrage movement. In 1916 Manitoba became the first province to give women the vote. In 1917 Sir Robert Borden's government gave the federal vote first to nurses at the front, then to women related to men serving in the war. By 1918 most women 21 and over could vote federally. In 1921 Agnes Macphail became the first woman MP, and thanks to Thérèse Casgrain and others, Quebec women got the vote in 1940.",
          takeaway: "Manitoba 1916, most women federally 1918, first woman MP 1921, Quebec 1940.",
          evidence: "In 1916, Manitoba became the first province to grant voting rights to women.",
        },
        {
          id: "history.great-war.6",
          title: "Remembrance Day",
          body: "Every November 11, Remembrance Day, Canadians honour veterans and those who died in all wars. They wear the red poppy and keep a moment of silence at the 11th hour of the 11th day of the 11th month. Over a million Canadians have served, and 110,000 have died. In 1915 Lieutenant-Colonel John McCrae, an army doctor, wrote the poem In Flanders Fields, which is often recited that day.",
          takeaway:
            "November 11: the poppy and a moment of silence. John McCrae wrote In Flanders Fields.",
          evidence:
            'Canadian medical officer Lieutenant-Colonel John McCrae composed the poem "In Flanders Fields" in 1915; it is often recited on Remembrance Day',
        },
      ],
      teach: {
        prompt:
          "Give the First World War numbers you should know. Then explain how women won the vote.",
        checklist: [
          "600,000 served from eight million people; 60,000 killed, 170,000 wounded",
          "Vimy Ridge, April 1917; Armistice, November 11, 1918",
          "Manitoba 1916, federal vote 1917 and 1918, Agnes Macphail 1921, Quebec 1940",
          "Nurses at the front were the first women to get the federal vote",
        ],
        probe: "Which women got the federal vote first, in 1917?",
      },
      test: [
        {
          id: "hi-043",
          biteId: "history.great-war.1",
          kind: "choice",
          prompt: "What is the South African War also called?",
          options: [
            "The Crimean War",
            "The Franco-Prussian War",
            "The Boer War",
            "The Spanish-American War",
          ],
          correctIndex: 2,
          rationale:
            "The South African War of 1899 to 1902 is usually called the Boer War. Over 7,000 Canadians volunteered.",
          evidence:
            "Over 7,000 volunteered to fight in the South African War 1899-1902), popularly known as the Boer War, and over 260 died.",
        },
        {
          id: "hi-044",
          biteId: "history.great-war.2",
          kind: "choice",
          prompt: "What did Ottawa form in 1914 that became the Canadian Corps?",
          options: [
            "The Canadian Corps of Volunteers",
            "The Royal Canadian Regiment",
            "The Canadian Militia",
            "The Canadian Expeditionary Force",
          ],
          correctIndex: 3,
          rationale:
            "Ottawa formed the Canadian Expeditionary Force, which later became the Canadian Corps.",
          evidence: "Ottawa formed the Canadian Expeditionary Force (later the Canadian Corps).",
        },
        {
          id: "hi-045",
          biteId: "history.great-war.3",
          kind: "choice",
          prompt: "What did the Canadian Corps achieve in April 1917?",
          options: [
            "It captured Vimy Ridge",
            "It won the Battle of Amiens",
            "It liberated Mons",
            "It broke through at Cambrai",
          ],
          correctIndex: 0,
          rationale:
            "The Corps captured Vimy Ridge in April 1917. Amiens came in the last hundred days of 1918.",
          evidence:
            "The Canadian Corps captured Vimy Ridge in April 1917, with 10,000 killed or wounded",
        },
        {
          id: "hi-046",
          biteId: "history.great-war.3",
          kind: "truefalse",
          prompt: "The First World War ended in the Armistice on November 11, 1918.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "The war ended with the Armistice on November 11, 1918, the date of Remembrance Day.",
          evidence:
            "the war ended in the Armistice on November 11, 1918. In total 60,000 Canadians were killed and 170,000 wounded.",
        },
        {
          id: "hi-047",
          biteId: "history.great-war.4",
          kind: "choice",
          prompt: "From 1914 to 1920, who did Ottawa intern as enemy aliens?",
          options: [
            "Canadians of Japanese origin living in British Columbia",
            "Over 8,000 former Austro-Hungarian subjects, mainly Ukrainian men",
            "German-born members of Parliament",
            "American settlers who refused to enlist",
          ],
          correctIndex: 1,
          rationale:
            "Over 8,000 former Austro-Hungarian subjects, mostly Ukrainian men, were interned. The relocation of Japanese Canadians came in the Second World War.",
          evidence:
            "Ottawa interned over 8,000 former Austro-Hungarian subjects, mainly Ukrainian men",
        },
        {
          id: "hi-048",
          biteId: "history.great-war.5",
          kind: "choice",
          prompt: "Which province was the first to grant women the right to vote?",
          options: ["Ontario", "Quebec", "Manitoba", "Alberta"],
          correctIndex: 2,
          rationale: "Manitoba was first, in 1916. Quebec was last, in 1940.",
          evidence: "In 1916, Manitoba became the first province to grant voting rights to women.",
        },
        {
          id: "hi-049",
          biteId: "history.great-war.5",
          kind: "choice",
          prompt: "Who founded the women's suffrage movement in Canada?",
          options: [
            "Agnes Macphail",
            "Thérèse Casgrain",
            "Laura Secord",
            "Dr. Emily Stowe, a physician",
          ],
          correctIndex: 3,
          rationale:
            "Dr. Emily Stowe founded it. Agnes Macphail was the first woman MP, and Thérèse Casgrain fought for the vote in Quebec.",
          evidence:
            "Its founder in Canada was Dr. Emily Stowe, the first Canadian woman to practise medicine in Canada.",
        },
        {
          id: "hi-061",
          biteId: "history.great-war.6",
          kind: "choice",
          prompt: "What do Canadians do at the 11th hour of the 11th day of the 11th month?",
          options: [
            "A moment of silence",
            "A parade in every capital",
            "A national day off work",
            "A 21-gun salute",
          ],
          correctIndex: 0,
          rationale: "Canadians wear the poppy and keep a moment of silence.",
          evidence:
            "observe a moment of silence at the 11th hour of the 11th day of the 11th month",
        },
      ],
    },
    {
      id: "history.interwar-wwii",
      moduleId: "history",
      title: "Between the wars and the Second World War",
      summary:
        "The Commonwealth, the Depression and the Bank of Canada, Juno Beach, and the war in the Pacific.",
      minutes: 8,
      source: chapterUrl("history"),
      bites: [
        {
          id: "history.interwar-wwii.1",
          title: "Empire becomes Commonwealth",
          body: "After the First World War, the British Empire became a free association of states called the British Commonwealth of Nations. Canada is still a leading member, with India, Australia, New Zealand and others. Phil Edwards, born in British Guiana, won bronze medals for Canada at three Olympics and later served as an army captain.",
          takeaway:
            "After the First World War the Empire became the Commonwealth, and Canada is still a leading member.",
          evidence:
            "the British Empire evolved into a free association of states known as the British Commonwealth of Nations",
        },
        {
          id: "history.interwar-wwii.2",
          title: "Boom, crash, Depression",
          body: "The Roaring Twenties were boom years. The stock market crash of 1929 led to the Great Depression, or the Dirty Thirties. Unemployment hit 27% in 1933 and many businesses failed. Western farmers were hit hardest, by low grain prices and a terrible drought.",
          takeaway: "The 1929 crash brought the Great Depression. Unemployment hit 27% in 1933.",
          evidence: "Unemployment reached 27% in 1933 and many businesses were wiped out.",
        },
        {
          id: "history.interwar-wwii.3",
          title: "A safety net and a central bank",
          body: "People wanted the government to create a social safety net: minimum wages, a standard work week, and programs such as unemployment insurance. In 1934 the Bank of Canada was created to manage the money supply and stabilize the financial system. Immigration fell, and many refugees were turned away, including Jews fleeing Nazi Germany in 1939.",
          takeaway: "The Bank of Canada, created in 1934, manages the money supply.",
          evidence:
            "The Bank of Canada, a central bank to manage the money supply and bring stability to the financial system, was created in 1934.",
        },
        {
          id: "history.interwar-wwii.4",
          title: "The Second World War",
          body: "The Second World War began in 1939, when Adolf Hitler, the Nazi dictator of Germany, invaded Poland and went on to conquer much of Europe. Canada joined its allies to defeat him. More than one million Canadians and Newfoundlanders served (Newfoundland was still a separate British colony), out of a population of 11.5 million. 44,000 were killed.",
          takeaway: "Over one million served from 11.5 million people, and 44,000 died.",
          evidence:
            "More than one million Canadians and Newfoundlanders (Newfoundland was a separate British entity) served in the Second World War, out of a population of 11.5 million.",
        },
        {
          id: "history.interwar-wwii.5",
          title: "Air war and sea war",
          body: "Canadians suffered losses defending Hong Kong against Japan in 1941 and in the failed raid on Dieppe in 1942. The Royal Canadian Air Force fought in the Battle of Britain, and Canada trained over 130,000 Allied air crew. The Royal Canadian Navy had its finest hour in the Battle of the Atlantic, protecting supply convoys from German submarines. By the end of the war, Canada had the third-largest navy in the world.",
          takeaway:
            "Canada trained 130,000 Allied air crew and ended the war with the third-largest navy.",
          evidence:
            "At the end of the Second World War, Canada had the third-largest navy in the world.",
        },
        {
          id: "history.interwar-wwii.6",
          title: "Juno Beach, the Netherlands, and the Pacific",
          body: "Canadians helped liberate Italy in 1943-44. On D-Day, June 6, 1944, 15,000 Canadian troops stormed and captured Juno Beach in Normandy, about one in ten Allied soldiers that day. The Canadian Army liberated the Netherlands in 1944-45, and Germany surrendered on May 8, 1945. In the Pacific, Japan attacked a lighthouse on Vancouver Island and sent fire balloons over B.C. and the Prairies. It surrendered on August 14, 1945.",
          takeaway:
            "D-Day, June 6, 1944: 15,000 Canadians took Juno Beach. Germany surrendered May 8, 1945, Japan August 14.",
          evidence: "15,000 Canadian troops stormed and captured Juno Beach from the German Army",
        },
        {
          id: "history.interwar-wwii.7",
          title: "Japanese Canadians relocated",
          body: "During the war, under pressure from public opinion in B.C., the federal government forcibly relocated Canadians of Japanese origin and sold their property without compensation. The military and the RCMP had said they posed little danger. In 1988 the government apologized and compensated the victims.",
          takeaway:
            "Japanese Canadians were relocated and lost their property. Canada apologized in 1988.",
          evidence:
            "The Government of Canada apologized in 1988 for wartime wrongs and compensated the victims.",
        },
      ],
      teach: {
        prompt:
          "Explain how the Depression changed what Canadians expected from government. Then say what Canada did at sea, in the air and on D-Day.",
        checklist: [
          "The 1929 crash, 27% unemployment in 1933, western farmers hit hardest",
          "Demand for a social safety net; the Bank of Canada in 1934",
          "One million served, 44,000 killed, Juno Beach on D-Day 1944",
          "Third-largest navy, 130,000 air crew trained",
        ],
        probe: "Name the two wartime wrongs on the home front, one from each world war.",
      },
      test: [
        {
          id: "hi-050",
          biteId: "history.interwar-wwii.2",
          kind: "choice",
          prompt: "What were the years after the 1929 stock market crash called?",
          options: [
            "The Quiet Revolution",
            "The Great Depression, or the Dirty Thirties",
            "The Roaring Twenties",
            "The Long Recession",
          ],
          correctIndex: 1,
          rationale:
            "The crash of 1929 brought the Great Depression, also called the Dirty Thirties.",
          evidence:
            'The stock market crash of 1929, however, led to the Great Depression or the "Dirty Thirties."',
        },
        {
          id: "hi-051",
          biteId: "history.interwar-wwii.2",
          kind: "choice",
          prompt: "How high did unemployment reach in 1933?",
          options: ["15%", "10%", "27%", "45%"],
          correctIndex: 2,
          rationale: "Unemployment reached 27% in 1933. Western farmers were hit hardest.",
          evidence: "Unemployment reached 27% in 1933",
        },
        {
          id: "hi-052",
          biteId: "history.interwar-wwii.3",
          kind: "choice",
          prompt: "Why was the Bank of Canada created in 1934?",
          options: [
            "To build the defence system at Halifax",
            "To fund the Canadian Expeditionary Force",
            "To pay unemployment insurance benefits",
            "To manage the money supply and bring stability to the financial system",
          ],
          correctIndex: 3,
          rationale:
            "The Bank of Canada is a central bank created to manage the money supply and stabilize the financial system.",
          evidence:
            "The Bank of Canada, a central bank to manage the money supply and bring stability to the financial system, was created in 1934.",
        },
        {
          id: "hi-053",
          biteId: "history.interwar-wwii.4",
          kind: "choice",
          prompt: "How many Canadians served in the Second World War?",
          options: [
            "More than one million served from a population of 11.5 million",
            "600,000 served from a population of eight million",
            "Over 7,000 volunteered from a population of five million",
            "44,000 served from a population of 11.5 million",
          ],
          correctIndex: 0,
          rationale:
            "More than one million served from a population of 11.5 million. The 600,000 figure is the First World War.",
          evidence:
            "More than one million Canadians and Newfoundlanders (Newfoundland was a separate British entity) served in the Second World War, out of a population of 11.5 million.",
        },
        {
          id: "hi-054",
          biteId: "history.interwar-wwii.5",
          kind: "choice",
          prompt: "Where did the Royal Canadian Navy have its finest hour?",
          options: [
            "The defence of Hong Kong in 1941",
            "The Battle of the Atlantic",
            "The air battle over Britain",
            "The raid on Dieppe in 1942",
          ],
          correctIndex: 1,
          rationale:
            "In the Battle of the Atlantic the navy protected supply convoys from German submarines. The Battle of Britain was fought in the air.",
          evidence:
            "The Royal Canadian Navy (RCN) saw its finest hour in the Battle of the Atlantic, protecting convoys of merchant ships against German submarines.",
        },
        {
          id: "hi-055",
          biteId: "history.interwar-wwii.6",
          kind: "choice",
          prompt: "How many Canadian troops captured Juno Beach on D-Day, June 6, 1944?",
          options: ["1,500", "15,000", "60,000", "30,000"],
          correctIndex: 1,
          rationale: "15,000 Canadians took Juno Beach, about one in ten Allied soldiers on D-Day.",
          evidence: "15,000 Canadian troops stormed and captured Juno Beach from the German Army",
        },
        {
          id: "hi-056",
          biteId: "history.interwar-wwii.7",
          kind: "truefalse",
          prompt:
            "The military and the RCMP said Japanese Canadians posed little danger to Canada.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "They gave that advice, yet the government relocated Japanese Canadians anyway. Canada apologized in 1988.",
          evidence:
            "This occurred even though the military and the RCMP told Ottawa that they posed little danger to Canada.",
        },
        {
          id: "hi-062",
          biteId: "history.interwar-wwii.1",
          kind: "truefalse",
          prompt: "The British Empire became the Commonwealth before the First World War.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "It happened after the First World War.",
          evidence:
            "After the First World War, the British Empire evolved into a free association of states known as the British Commonwealth of Nations",
        },
      ],
    },
  ],
};

export default module;
