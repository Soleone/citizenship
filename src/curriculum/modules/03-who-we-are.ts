import type { Module } from "../types.ts";
import { chapterUrl } from "../sources.ts";

/**
 * Module 3, built entirely from the "Who We Are" chapter of Discover Canada.
 *
 * The chapter has three headings (Aboriginal Peoples, English and French,
 * Diversity in Canada). This module follows them, with the chapter's opening
 * paragraphs (founding peoples, the constitutional framing) in session 2 and
 * the language facts split out into session 4, because the assignment fixes
 * four sessions. The two boxed notes, "Unity in Diversity" and "Becoming
 * Canadian", are sidebars rather than headings; they are taught in the session
 * whose topic they match. Every `evidence` string is copied verbatim from
 * data/corpus/who-are-canadians.txt, including the guide's own typos.
 */
const module: Module = {
  id: "who-we-are",
  order: 3,
  title: "Who we are",
  guideChapter: "Who We Are",
  corpus: ["who-are-canadians"],
  summary: "First peoples, founding peoples, newcomers, and what official bilingualism requires.",
  mission:
    "Name the three founding peoples and the three Aboriginal groups, and say what the law requires of the federal government on language.",
  icon: "users",
  tags: ["Indigenous peoples", "Founding peoples", "Immigration", "Official languages"],
  source: chapterUrl("whoWeAre"),
  testSize: 10,
  sessions: [
    {
      id: "who-we-are.indigenous-peoples",
      moduleId: "who-we-are",
      title: "Indigenous peoples then and now",
      summary:
        "Where Aboriginal peoples came from, the Royal Proclamation, residential schools, and the three groups today.",
      minutes: 8,
      source: chapterUrl("whoWeAre"),
      bites: [
        {
          id: "who-we-are.indigenous-peoples.1",
          title: "Here before the explorers",
          body: "The ancestors of Aboriginal peoples (today often called Indigenous peoples) migrated from Asia many thousands of years ago. They were well established long before European explorers reached North America. First Nations cultures were diverse and vibrant, rooted in beliefs about their relationship to the Creator, to nature and to each other.",
          takeaway:
            "Aboriginal peoples came from Asia thousands of years ago, long before Europeans arrived.",
          evidence:
            "The ancestors of Aboriginal peoples are believed to have migrated from Asia many thousands of years ago",
        },
        {
          id: "who-we-are.indigenous-peoples.2",
          title: "Rights, the Proclamation, and treaties",
          body: "Aboriginal and treaty rights are part of the Constitution. Territorial rights were first guaranteed by the Royal Proclamation of 1763, issued by King George III, which set the basis for negotiating treaties with the newcomers. Those treaties were not always fully respected.",
          takeaway:
            "The Royal Proclamation of 1763 guaranteed territorial rights and set the basis for treaties.",
          evidence:
            "Territorial rights were first guaranteed through the Royal Proclamation of 1763 by King George III",
        },
        {
          id: "who-we-are.indigenous-peoples.3",
          title: "Residential schools and the 2008 apology",
          body: "From the 1800s until the 1980s, the federal government placed many Aboriginal children in residential schools to educate them and assimilate them into mainstream Canadian culture. The schools were poorly funded and caused great hardship. Some students were physically abused, and Aboriginal languages and cultural practices were mostly banned. In 2008, Ottawa formally apologized to former students.",
          takeaway:
            "Residential schools ran from the 1800s to the 1980s. Ottawa apologized in 2008.",
          evidence: "Aboriginal languages and cultural practices were mostly prohibited",
        },
        {
          id: "who-we-are.indigenous-peoples.4",
          title: "Indian and First Nations",
          body: "Aboriginal peoples are three distinct groups: First Nations, Inuit and Métis. The term Indian refers to all Aboriginal people who are not Inuit or Métis; the term First Nations came into use in the 1970s. About half of First Nations people live on reserves in about 600 communities, and half live off-reserve, mostly in cities.",
          takeaway:
            "Indian means all Aboriginal people who are not Inuit or Métis. First Nations came into use in the 1970s.",
          evidence: "In the 1970s, the term First Nations began to be used.",
        },
        {
          id: "who-we-are.indigenous-peoples.5",
          title: "Inuit and the Métis",
          body: 'Inuit means "the people" in Inuktitut. Inuit live in small, scattered communities across the Arctic, and their knowledge of the land, sea and wildlife lets them thrive in one of the harshest places on earth. The Métis are a distinct people of mixed Aboriginal and European ancestry. Most live in the Prairie provinces, come from French- or English-speaking backgrounds, and speak their own dialect, Michif.',
          takeaway:
            'Inuit means "the people" in Inuktitut. The Métis have mixed ancestry, speak Michif and mostly live on the Prairies.',
          evidence:
            'The Inuit, which means "the people" in the Inuktitut language, live in small, scattered communities across the Arctic',
        },
        {
          id: "who-we-are.indigenous-peoples.6",
          title: "How many, and doing what",
          body: "Of all Aboriginal people, about 65% are First Nations, 30% Métis and 4% Inuit. Today they enjoy renewed pride and confidence, with major achievements in agriculture, the environment, business and the arts.",
          takeaway: "About 65% First Nations, 30% Métis, 4% Inuit.",
          evidence:
            "About 65% of the Aboriginal people are First Nations, while 30% are Métis and 4% Inuit.",
        },
      ],
      teach: {
        prompt:
          "Name the three Aboriginal groups and one fact about each: where they live, or what their name means.",
        checklist: [
          "First Nations, Inuit and Métis",
          'Inuit means "the people" in Inuktitut; the Métis speak Michif and mostly live in the Prairie provinces',
          "The Royal Proclamation of 1763 set the basis for treaties",
          "Residential schools ran from the 1800s to the 1980s; Ottawa apologized in 2008",
        ],
        probe: "Which document first guaranteed territorial rights, and who issued it?",
      },
      test: [
        {
          id: "ww-001",
          biteId: "who-we-are.indigenous-peoples.1",
          kind: "choice",
          prompt: "From which continent did the ancestors of Aboriginal peoples migrate?",
          options: ["Asia", "South America", "Africa", "Europe"],
          correctIndex: 0,
          rationale:
            "The ancestors of Aboriginal peoples migrated from Asia many thousands of years ago.",
          evidence:
            "The ancestors of Aboriginal peoples are believed to have migrated from Asia many thousands of years ago",
        },
        {
          id: "ww-002",
          biteId: "who-we-are.indigenous-peoples.2",
          kind: "choice",
          prompt: "Which document first guaranteed Aboriginal territorial rights?",
          options: [
            "The Indian Act",
            "The Royal Proclamation",
            "The Quebec Act",
            "The Treaty of Paris",
          ],
          correctIndex: 1,
          rationale:
            "The Royal Proclamation of 1763 first guaranteed territorial rights and set the basis for negotiating treaties.",
          evidence:
            "Territorial rights were first guaranteed through the Royal Proclamation of 1763 by King George III",
        },
        {
          id: "ww-003",
          biteId: "who-we-are.indigenous-peoples.3",
          kind: "truefalse",
          prompt: "Residential schools were meant to assimilate Aboriginal children.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "The federal government placed children in residential schools to educate and assimilate them. Their languages and cultural practices were mostly banned.",
          evidence:
            "the federal government placed many Aboriginal children in residential schools to educate and assimilate them into mainstream Canadian culture",
        },
        {
          id: "ww-004",
          biteId: "who-we-are.indigenous-peoples.3",
          kind: "choice",
          prompt: "What did the Government of Canada do in 2008 about residential schools?",
          options: [
            "The last school closed",
            "Treaty rights were added to the Constitution",
            "Ottawa formally apologized to the former students",
            "Aboriginal languages became official languages",
          ],
          correctIndex: 2,
          rationale:
            "In 2008 Ottawa formally apologized to former students. The schools ran from the 1800s until the 1980s.",
          evidence: "In 2008, Ottawa formally apologized to the former students.",
        },
        {
          id: "ww-005",
          biteId: "who-we-are.indigenous-peoples.4",
          kind: "choice",
          prompt: "What does the term Indian refer to?",
          options: [
            "Only people who live on reserve land",
            "Only people with treaty status",
            "People born in India",
            "All Aboriginal people who are not Inuit or Métis",
          ],
          correctIndex: 3,
          rationale: "Indian refers to all Aboriginal people who are not Inuit or Métis.",
          evidence: "Indian refers to all Aboriginal people who are not Inuit or Métis.",
          caveat:
            "This is the guide's wording, and the test follows it. Today the term First Nations, in use since the 1970s, is preferred.",
        },
        {
          id: "ww-006",
          biteId: "who-we-are.indigenous-peoples.5",
          kind: "choice",
          prompt: 'In which language does the word Inuit mean "the people"?',
          options: ["Inuktitut", "Innu", "Michif", "Cree"],
          correctIndex: 0,
          rationale: 'Inuit means "the people" in Inuktitut. Michif is the Métis dialect.',
          evidence: 'The Inuit, which means "the people" in the Inuktitut language',
        },
        {
          id: "ww-007",
          biteId: "who-we-are.indigenous-peoples.6",
          kind: "choice",
          prompt: "About 30% of the Aboriginal people in Canada belong to which group?",
          options: ["Acadians", "Métis", "First Nations", "Inuit"],
          correctIndex: 1,
          rationale: "About 65% are First Nations, 30% Métis and 4% Inuit.",
          evidence:
            "About 65% of the Aboriginal people are First Nations, while 30% are Métis and 4% Inuit.",
          caveat:
            "These shares are the 2012 guide's figures. The test follows the guide, but confirm current numbers on Canada.ca.",
        },
      ],
    },
    {
      id: "who-we-are.english-and-french",
      moduleId: "who-we-are",
      title: "The English and French founding peoples",
      summary: "The three founding peoples, the Acadians, Quebecers and English Canadians.",
      minutes: 7,
      source: chapterUrl("whoWeAre"),
      bites: [
        {
          id: "who-we-are.english-and-french.1",
          title: "Three founding peoples",
          body: "To understand what it means to be Canadian, you need to know the three founding peoples: Aboriginal, French and British. Canadian society today comes largely from the English-speaking and French-speaking Christian civilizations that settlers brought from Europe.",
          takeaway: "The three founding peoples are Aboriginal, French and British.",
          evidence:
            "it is important to know about our three founding peoples - Aboriginal, French and British.",
        },
        {
          id: "who-we-are.english-and-french.2",
          title: "Peace, Order, and Good Government",
          body: 'Canada has the oldest continuous constitutional tradition in the world and is the only constitutional monarchy in North America. Its institutions uphold Peace, Order, and Good Government, a phrase from the British North America Act of 1867. Poets and songwriters have called Canada the "Great Dominion". Its prosperity, from the Atlantic to the Pacific and the Arctic, rests on ordered liberty, enterprise, hard work and fair play.',
          takeaway:
            "Peace, Order, and Good Government comes from the British North America Act of 1867.",
          evidence:
            "a key phrase in Canada's original constitutional document in 1867, the British North America Act",
        },
        {
          id: "who-we-are.english-and-french.3",
          title: "The Acadians",
          body: 'The Acadians descend from French colonists who began settling in today\'s Maritime provinces in 1604. Between 1755 and 1763, during the war between Britain and France, more than two-thirds of them were deported. This ordeal is called the "Great Upheaval". The Acadians survived and kept their own identity.',
          takeaway:
            "Acadians settled the Maritimes from 1604 and were deported from 1755 to 1763: the Great Upheaval.",
          evidence:
            "The Acadians are the descendants of French colonists who began settling in what are now the Maritime provinces in 1604.",
        },
        {
          id: "who-we-are.english-and-french.4",
          title: "Quebecers",
          body: "Quebecers are the people of Quebec, and the vast majority speak French. Most descend from 8,500 French settlers of the 1600s and 1700s and keep a unique identity, culture and language. In 2006 the House of Commons recognized that the Quebecois form a nation within a united Canada. One million Anglo-Quebecers, with 250 years of history there, are also part of Quebec.",
          takeaway:
            "In 2006 the House of Commons recognized the Quebecois as a nation within a united Canada.",
          evidence:
            "The House of Commons recognized in 2006 that the Quebecois form a nation within a united Canada.",
        },
        {
          id: "who-we-are.english-and-french.5",
          title: "English Canadians",
          body: "Hundreds of thousands of English, Welsh, Scottish and Irish settlers, soldiers and migrants set the basic way of life in English-speaking Canada from the 1600s to the 20th century. That is why English speakers (Anglophones) are generally called English Canadians.",
          takeaway: "English, Welsh, Scottish and Irish settlers shaped English-speaking Canada.",
          evidence:
            "hundreds of thousands of English, Welsh, Scottish and Irish settlers, soldiers and migrants from the 1600s to the 20th century",
        },
        {
          id: "who-we-are.english-and-french.6",
          title: "Becoming Canadian",
          body: "Some Canadians come from places of war or conflict. That is no excuse to bring violent, extreme or hateful prejudices to Canada. Newcomers are expected to embrace democratic principles such as the rule of law.",
          takeaway:
            "Becoming Canadian means embracing democratic principles such as the rule of law.",
          evidence:
            "In becoming Canadian, newcomers are expected to embrace democratic principles such as the rule of law.",
        },
      ],
      teach: {
        prompt:
          "Explain the difference between the three founding peoples and the three Aboriginal groups. Then say who the Acadians and the Quebecers are.",
        checklist: [
          "Founding peoples: Aboriginal, French and British",
          "Aboriginal groups: First Nations, Inuit and Métis",
          "Acadians: settled the Maritimes from 1604, deported 1755 to 1763 in the Great Upheaval",
          "Quebecers: mostly descended from 8,500 French settlers, recognized as a nation in 2006",
        ],
        probe:
          "Which phrase from the British North America Act of 1867 do Canadian institutions uphold?",
      },
      test: [
        {
          id: "ww-008",
          biteId: "who-we-are.english-and-french.1",
          kind: "truefalse",
          prompt: "Canada has two founding peoples, the English and the French.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "There are three founding peoples: Aboriginal, French and British.",
          evidence:
            "it is important to know about our three founding peoples - Aboriginal, French and British.",
        },
        {
          id: "ww-009",
          biteId: "who-we-are.english-and-french.2",
          kind: "choice",
          prompt:
            "Which phrase from the British North America Act of 1867 do Canadian institutions uphold?",
          options: [
            "Peace, Commerce and Good Governance",
            "Liberty and Justice for All",
            "Peace, Order, and Good Government",
            "Freedom, Equality and Solidarity",
          ],
          correctIndex: 2,
          rationale:
            "Peace, Order, and Good Government is a key phrase in Canada's original constitutional document of 1867.",
          evidence: "Our institutions uphold a commitment to Peace, Order, and Good Government",
        },
        {
          id: "ww-010",
          biteId: "who-we-are.english-and-french.3",
          kind: "choice",
          prompt: "Where did the French colonists who became the Acadians begin settling in 1604?",
          options: [
            "Around the Great Lakes",
            "In the St. Lawrence River valley",
            "On Newfoundland's west coast",
            "In what are now the Maritime provinces",
          ],
          correctIndex: 3,
          rationale: "Acadian settlement began in 1604 in what are now the Maritime provinces.",
          evidence:
            "The Acadians are the descendants of French colonists who began settling in what are now the Maritime provinces in 1604.",
        },
        {
          id: "ww-011",
          biteId: "who-we-are.english-and-french.3",
          kind: "choice",
          prompt: "What is the deportation of the Acadians from 1755 to 1763 called?",
          options: ["The Great Upheaval", "The Great Fear", "The Expulsion", "The Long March"],
          correctIndex: 0,
          rationale:
            'It is called the "Great Upheaval". The Acadians survived and kept their identity.',
          evidence:
            'Despite this ordeal, known as the "Great Upheaval," the Acadians survived and maintained their unique identity.',
        },
        {
          id: "ww-012",
          biteId: "who-we-are.english-and-french.4",
          kind: "choice",
          prompt: "What did the House of Commons recognize in 2006?",
          options: [
            "That Quebec may leave the union",
            "That the Quebecois form a nation within a united Canada",
            "That Quebec controls its own immigration",
            "That French is the only language of Quebec",
          ],
          correctIndex: 1,
          rationale:
            "In 2006 the House of Commons recognized that the Quebecois form a nation within a united Canada.",
          evidence:
            "The House of Commons recognized in 2006 that the Quebecois form a nation within a united Canada.",
        },
        {
          id: "ww-013",
          biteId: "who-we-are.english-and-french.5",
          kind: "choice",
          prompt: "Which settlers set the basic way of life in English-speaking Canada?",
          options: [
            "English, Dutch, German and French",
            "French, Acadian and Black Loyalist",
            "English, Welsh, Scottish and Irish",
            "Scottish, Irish, Polish and Ukrainian",
          ],
          correctIndex: 2,
          rationale:
            "English, Welsh, Scottish and Irish settlers, soldiers and migrants, from the 1600s to the 20th century.",
          evidence:
            "hundreds of thousands of English, Welsh, Scottish and Irish settlers, soldiers and migrants from the 1600s to the 20th century",
        },
        {
          id: "ww-014",
          biteId: "who-we-are.english-and-french.6",
          kind: "choice",
          prompt: "What is expected of newcomers becoming Canadian?",
          options: [
            "That they serve in the Canadian Forces",
            "That they learn both official languages before applying",
            "That they give up their own traditions",
            "That they embrace democratic principles such as the rule of law",
          ],
          correctIndex: 3,
          rationale:
            "Newcomers are expected to embrace democratic principles such as the rule of law. War or conflict back home does not justify hateful prejudices.",
          evidence:
            "In becoming Canadian, newcomers are expected to embrace democratic principles such as the rule of law.",
        },
      ],
    },
    {
      id: "who-we-are.diversity",
      moduleId: "who-we-are",
      title: "Immigration, refugees and diversity",
      summary:
        "A land of immigrants, the largest groups, faiths, refugees, and what holds it together.",
      minutes: 8,
      source: chapterUrl("whoWeAre"),
      bites: [
        {
          id: "who-we-are.diversity.1",
          title: "Born here, yet a land of immigrants",
          body: "Most Canadians were born in Canada, and that has been true since the 1800s. Canada is still a land of immigrants: over the past 200 years, millions of newcomers have helped build and defend the Canadian way of life.",
          takeaway: "Most Canadians were born here, but newcomers helped build the country.",
          evidence:
            "The majority of Canadians were born in this country and this has been true since the 1800s.",
        },
        {
          id: "who-we-are.diversity.2",
          title: "The largest groups",
          body: "The largest ethnic and religious groups are the English, French, Scottish, Irish, German, Italian, Chinese, Aboriginal, Ukrainian, Dutch, South Asian and Scandinavian. Since the 1970s, most immigrants have come from Asian countries.",
          takeaway: "Since the 1970s, most immigrants have come from Asia.",
          evidence: "Since the 1970s, most immigrants have come from Asian countries.",
        },
        {
          id: "who-we-are.diversity.3",
          title: "Unity in Diversity",
          body: "John Buchan, Lord Tweedsmuir, was a popular Governor General from 1935 to 1940. In a 1937 speech in Halifax, he said immigrant groups should keep their individuality and each make its contribution to the national character. Each group could learn from the others and share a new loyalty born of their union.",
          takeaway:
            "John Buchan: immigrant groups should keep their individuality and contribute to the national character.",
          evidence:
            "John Buchan, the 1st Baron Tweedsmuir, was a popular Governor General of Canada (1935-40).",
        },
        {
          id: "who-we-are.diversity.4",
          title: "What Canadians believe",
          body: "Most Canadians identify as Christian. The largest religious affiliation is Catholic, followed by various Protestant churches. The number of Muslims, Jews, Hindus, Sikhs, members of other religions and people with no religion is growing.",
          takeaway: "Most Canadians are Christian, and Catholic is the largest affiliation.",
          evidence:
            "The largest religious affiliation is Catholic, followed by various Protestant churches.",
        },
        {
          id: "who-we-are.diversity.5",
          title: "The state and faith communities",
          body: "The state and faith communities have a long partnership. Together they promote social welfare, harmony and mutual respect, provide schools and health care, resettle refugees, and uphold freedom of religion, religious expression and conscience.",
          takeaway: "Faith communities work with the state, including to resettle refugees.",
          evidence:
            "to provide schools and health care; to resettle refugees; and to uphold religious freedom, religious expression and freedom of conscience",
        },
        {
          id: "who-we-are.diversity.6",
          title: "Everyone counted, one society",
          body: "Canada's diversity includes gay and lesbian Canadians, who enjoy full protection and equal treatment under the law, including access to civil marriage. All these groups share a Canadian identity and make up today's multicultural society.",
          takeaway:
            "Gay and lesbian Canadians have equal treatment under the law, including civil marriage.",
          evidence:
            "who enjoy the full protection of and equal treatment under the law, including access to civil marriage",
        },
        {
          id: "who-we-are.diversity.7",
          title: "Black Loyalists in Nova Scotia",
          body: "Black Loyalists, escaped slaves and free men and women of African origin fled from America to Canada in the 1780s. Slavery stayed legal in America until 1863. Olympian Marjorie Turner-Bailey of Nova Scotia is one of their descendants.",
          takeaway: "Black Loyalists and escaped slaves fled from America to Canada in the 1780s.",
          evidence:
            "who in the 1780s fled to Canada from America, where slavery remained legal until 1863",
        },
      ],
      teach: {
        prompt:
          "Explain how Canada can be a land of immigrants when most Canadians were born here. Then name two things faith communities do with the state.",
        checklist: [
          "Most Canadians have been born here since the 1800s",
          "Over the past 200 years, millions of newcomers helped build and defend the Canadian way of life",
          "Faith communities provide schools and health care and resettle refugees",
          "John Buchan: immigrant groups should keep their individuality and contribute to the national character",
        ],
        probe: "Since which decade have most immigrants come from Asian countries?",
      },
      test: [
        {
          id: "ww-015",
          biteId: "who-we-are.diversity.1",
          kind: "truefalse",
          prompt: "Most Canadians were born in another country.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "Most Canadians were born in Canada, and that has been true since the 1800s.",
          evidence:
            "The majority of Canadians were born in this country and this has been true since the 1800s.",
        },
        {
          id: "ww-016",
          biteId: "who-we-are.diversity.2",
          kind: "choice",
          prompt:
            "Since the 1970s, most immigrants to Canada have come from which part of the world?",
          options: [
            "Asian countries",
            "African countries",
            "South American countries",
            "European countries",
          ],
          correctIndex: 0,
          rationale: "Since the 1970s, most immigrants have come from Asian countries.",
          evidence: "Since the 1970s, most immigrants have come from Asian countries.",
          caveat: "This is the 2012 guide's statement, and the test follows it.",
        },
        {
          id: "ww-017",
          biteId: "who-we-are.diversity.2",
          kind: "choice",
          prompt: "Which of these is NOT one of Canada's largest ethnic groups?",
          options: ["Dutch", "Brazilian", "Scandinavian", "Ukrainian"],
          correctIndex: 1,
          rationale:
            "The largest groups are English, French, Scottish, Irish, German, Italian, Chinese, Aboriginal, Ukrainian, Dutch, South Asian and Scandinavian. Brazilian is not one of them.",
          evidence:
            "The largest groups are the English, French, Scottish, Irish, German, Italian, Chinese, Aboriginal, Ukrainian, Dutch, South Asian and Scandinavian.",
        },
        {
          id: "ww-018",
          biteId: "who-we-are.diversity.3",
          kind: "choice",
          prompt: "What did Governor General John Buchan say immigrant groups should do?",
          options: [
            "Settle only in rural areas, away from the cities",
            "Adopt the established church and speak English",
            "Retain their individuality and each contribute to the national character",
            "Assimilate fully within one generation",
          ],
          correctIndex: 2,
          rationale:
            "In 1937 Buchan said immigrant groups should keep their individuality and each make its contribution to the national character.",
          evidence:
            "should retain their individuality and each make its contribution to the national character",
        },
        {
          id: "ww-019",
          biteId: "who-we-are.diversity.4",
          kind: "choice",
          prompt: "What is the largest religious affiliation in Canada?",
          options: ["Sikh", "Muslim", "Jewish", "Catholic"],
          correctIndex: 3,
          rationale: "Catholic is the largest, followed by various Protestant churches.",
          evidence:
            "The largest religious affiliation is Catholic, followed by various Protestant churches.",
        },
        {
          id: "ww-020",
          biteId: "who-we-are.diversity.5",
          kind: "choice",
          prompt: "Which of these do the state and faith communities do together?",
          options: [
            "Resettling refugees",
            "Setting the tax rate",
            "Appointing Senators",
            "Running the federal courts",
          ],
          correctIndex: 0,
          rationale:
            "Together they promote social welfare and harmony, provide schools and health care, resettle refugees, and uphold freedom of religion and conscience.",
          evidence:
            "faith communities to promote social welfare, harmony and mutual respect; to provide schools and health care; to resettle refugees",
        },
        {
          id: "ww-021",
          biteId: "who-we-are.diversity.6",
          kind: "choice",
          prompt: "What rights do gay and lesbian Canadians have?",
          options: [
            "Their unions are a matter for the provinces only",
            "They enjoy full protection of and equal treatment under the law, including access to civil marriage",
            "They must register with a religious community",
            "They are protected by law only outside Quebec",
          ],
          correctIndex: 1,
          rationale:
            "Gay and lesbian Canadians enjoy full protection and equal treatment under the law, including access to civil marriage.",
          evidence:
            "who enjoy the full protection of and equal treatment under the law, including access to civil marriage",
        },
        {
          id: "ww-022",
          biteId: "who-we-are.diversity.7",
          kind: "choice",
          prompt:
            "In the 1780s, black Loyalists and escaped slaves fled to Canada from which country?",
          options: ["France", "Britain", "America", "Denmark"],
          correctIndex: 2,
          rationale: "They fled from America, where slavery stayed legal until 1863.",
          evidence:
            "who in the 1780s fled to Canada from America, where slavery remained legal until 1863",
        },
      ],
    },
    {
      id: "who-we-are.official-languages",
      moduleId: "who-we-are",
      title: "Official languages and bilingualism",
      summary:
        "What official bilingualism requires, how many speak each language, and other languages at home.",
      minutes: 5,
      source: chapterUrl("whoWeAre"),
      bites: [
        {
          id: "who-we-are.official-languages.1",
          title: "Two official languages",
          body: "English and French are Canada's official languages and shape daily life for most people. By law, the federal government must provide services in English and French everywhere in Canada.",
          takeaway:
            "The federal government must serve you in English or French anywhere in Canada.",
          evidence:
            "The federal government is required by law to provide services throughout Canada in English and French.",
        },
        {
          id: "who-we-are.official-languages.2",
          title: "Anglophones and Francophones",
          body: "About 18 million Canadians are Anglophones (English is their first language) and 7 million are Francophones (French is their first language). Most Francophones live in Quebec. One million live in Ontario, New Brunswick and Manitoba, and fewer in the other provinces.",
          takeaway:
            "18 million Anglophones, 7 million Francophones, and most Francophones live in Quebec.",
          evidence:
            "there are 18 million Anglophones - people who speak English as a first language",
        },
        {
          id: "who-we-are.official-languages.3",
          title: "One bilingual province",
          body: "New Brunswick is the only officially bilingual province. That is separate from the federal duty to serve Canadians in both languages across the country.",
          takeaway: "New Brunswick is the only officially bilingual province.",
          evidence: "New Brunswick is the only officially bilingual province.",
        },
        {
          id: "who-we-are.official-languages.4",
          title: "Other languages at home",
          body: "Many other languages are spoken in Canadian homes. Chinese languages are the second most spoken at home, after English, in Vancouver (13% of the population) and Toronto (7%).",
          takeaway: "Chinese languages come second to English at home in Vancouver and Toronto.",
          evidence:
            "Chinese languages are the second most-spoken at home, after English, in two of Canada's biggest cities.",
        },
      ],
      teach: {
        prompt:
          "Say what official language status requires of the federal government, and name Canada's one officially bilingual province.",
        checklist: [
          "English and French are Canada's official languages",
          "The federal government must provide services in both, everywhere in Canada",
          "New Brunswick is the only officially bilingual province",
          "Chinese languages come second to English at home in Vancouver and Toronto",
        ],
        probe:
          "Is the duty to serve in both languages on every province, or on the federal government?",
      },
      test: [
        {
          id: "ww-023",
          biteId: "who-we-are.official-languages.1",
          kind: "choice",
          prompt: "What status do English and French have in Canada?",
          options: [
            "English is official everywhere except Quebec",
            "French is official in Parliament only",
            "Both are official only in New Brunswick",
            "They are the country's official languages",
          ],
          correctIndex: 3,
          rationale: "English and French are Canada's official languages.",
          evidence:
            "English and French define the reality of day-to-day life for most people and are the country's official languages.",
        },
        {
          id: "ww-024",
          biteId: "who-we-are.official-languages.1",
          kind: "choice",
          prompt: "What does the law require the federal government to do about language?",
          options: [
            "Provide services throughout Canada in English and French",
            "Require every employee to be bilingual",
            "Fund French-language universities",
            "Publish every law in three languages",
          ],
          correctIndex: 0,
          rationale:
            "By law, the federal government must provide services in English and French throughout Canada.",
          evidence:
            "The federal government is required by law to provide services throughout Canada in English and French.",
        },
        {
          id: "ww-025",
          biteId: "who-we-are.official-languages.2",
          kind: "truefalse",
          prompt: "An Anglophone is a person whose first language is English.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale:
            "Anglophones speak English as a first language. There are about 18 million of them, and about 7 million Francophones.",
          evidence:
            "there are 18 million Anglophones - people who speak English as a first language",
          caveat:
            "The counts are from the 2012 guide and the test follows them. Confirm current population figures on Canada.ca.",
        },
        {
          id: "ww-026",
          biteId: "who-we-are.official-languages.3",
          kind: "choice",
          prompt: "Which is the only officially bilingual province?",
          options: ["Quebec", "New Brunswick", "Ontario", "Manitoba"],
          correctIndex: 1,
          rationale: "New Brunswick is the only officially bilingual province.",
          evidence: "New Brunswick is the only officially bilingual province.",
        },
        {
          id: "ww-027",
          biteId: "who-we-are.official-languages.4",
          kind: "choice",
          prompt: "In which two cities are Chinese languages the second most spoken at home?",
          options: [
            "Calgary and Edmonton",
            "Halifax and Winnipeg",
            "Vancouver and Toronto",
            "Montreal and Ottawa",
          ],
          correctIndex: 2,
          rationale:
            "Chinese languages are spoken at home by 13% of people in Vancouver and 7% in Toronto.",
          evidence:
            "In Vancouver, 13% of the population speak Chinese languages at home; in Toronto, the number is 7%",
          caveat: "These are the 2012 guide's figures, and the test follows them.",
        },
      ],
    },
  ],
};

export default module;
