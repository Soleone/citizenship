import type { Module } from "../types.ts";
import { chapterUrl } from "../sources.ts";

/**
 * Module 9: Canadian Symbols.
 *
 * Built from data/corpus/canadian-symbols.txt, plus one question copied from the
 * guide's own Study Questions page (data/corpus/study-questions.txt), so every
 * evidence string is a verbatim excerpt of those files (the guide's own spelling
 * stays). The chapter's "Canada's Official Languages" heading is its own session,
 * and the flat list under "National Public Holidays and Other Important Dates" is
 * two sessions, January to June and July to December, so each one stays a few
 * minutes of reading with a short test.
 */
const module: Module = {
  id: "symbols",
  order: 9,
  title: "Canadian symbols",
  guideChapter: "Canadian Symbols",
  corpus: ["canadian-symbols", "study-questions"],
  summary:
    "The Crown and flags, the maple leaf, the arms and buildings, sports, anthems, honours and holidays.",
  mission: "Match each Canadian symbol, honour and holiday to what it means.",
  icon: "flag",
  tags: ["Symbols", "Honours", "Holidays"],
  source: chapterUrl("symbols"),
  testSize: 12,
  sessions: [
    {
      id: "symbols.crown-and-flags",
      moduleId: "symbols",
      title: "The Crown and the flag",
      summary: "Four centuries of the Crown, the 1965 flag, and the flags before it.",
      minutes: 6,
      source: chapterUrl("symbols"),
      bites: [
        {
          id: "symbols.crown-and-flags.1",
          title: "The Crown",
          body: "The Crown has been a symbol of the state in Canada for 400 years. It also stands for the institutions of government: Parliament, the legislatures, the courts, police services and the Canadian Forces.",
          takeaway:
            "The Crown stands for the state and its institutions, including the courts and the Canadian Forces.",
          evidence:
            "The Crown is a symbol of government, including Parliament, the legislatures, the courts, police services and the Canadian Forces.",
        },
        {
          id: "symbols.crown-and-flags.2",
          title: "A constitutional monarchy since 1867",
          body: "Canada has been a constitutional monarchy in its own right since Confederation in 1867, during Queen Victoria's reign. The guide was written under Queen Elizabeth II, Queen of Canada from 1952, and marks her Diamond Jubilee (60 years) in 2012.",
          takeaway: "Canada has been a constitutional monarchy since Confederation in 1867.",
          evidence:
            "Canada has been a constitutional monarchy in its own right since Confederation in 1867 during Queen Victoria's reign.",
        },
        {
          id: "symbols.crown-and-flags.3",
          title: "The red and white flag",
          body: "Canada's current flag was first raised in 1965. Its red-white-red pattern comes from the flag of the Royal Military College in Kingston, founded in 1876. Red and white had been colours of France and England since the Middle Ages, and became Canada's national colours in 1921.",
          takeaway:
            "The 1965 flag's pattern comes from the Royal Military College. Red and white became national colours in 1921.",
          evidence:
            "The red-white-red pattern comes from the flag of the Royal Military College, Kingston, founded in 1876.",
        },
        {
          id: "symbols.crown-and-flags.4",
          title: "Other flags",
          body: "The Union Jack is Canada's official Royal Flag. Before 1965, the Canadian Red Ensign was Canada's flag for about 100 years, and veterans have carried it officially since 2005. Each province and territory also has its own flag.",
          takeaway:
            "The Union Jack is the Royal Flag. The Red Ensign was Canada's flag for about 100 years.",
          evidence: "The Union Jack is our official Royal Flag.",
        },
      ],
      teach: {
        prompt:
          "Say what the Crown stands for, when Canada became a constitutional monarchy, and where the flag's red and white come from.",
        checklist: [
          "The Crown: a symbol of the state for 400 years, and of Parliament, the legislatures, courts, police and the Canadian Forces",
          "A constitutional monarchy since Confederation in 1867",
          "The 1965 flag's pattern comes from the Royal Military College flag in Kingston",
          "Red and white: Canada's national colours since 1921",
          "The Union Jack is the Royal Flag; the Red Ensign was Canada's flag for about 100 years",
        ],
        probe: "What does the Royal Military College have to do with the flag?",
      },
      test: [
        {
          id: "sy-001",
          biteId: "symbols.crown-and-flags.1",
          kind: "choice",
          prompt: "For how long has the Crown been a symbol of the state in Canada?",
          options: ["400 years", "1,000 years", "150 years", "200 years"],
          correctIndex: 0,
          rationale: "The Crown has been a symbol of the state in Canada for 400 years.",
          evidence: "The Crown has been a symbol of the state in Canada for 400 years.",
        },
        {
          id: "sy-002",
          biteId: "symbols.crown-and-flags.1",
          kind: "choice",
          prompt: "The Crown stands for Parliament, the courts and police services. What else?",
          options: ["the Senate", "the Canadian Forces", "the Privy Council", "the Cabinet"],
          correctIndex: 1,
          rationale: "The list ends with the Canadian Forces.",
          evidence:
            "The Crown is a symbol of government, including Parliament, the legislatures, the courts, police services and the Canadian Forces.",
        },
        {
          id: "sy-003",
          biteId: "symbols.crown-and-flags.2",
          kind: "choice",
          prompt: "Canada has been a constitutional monarchy in its own right since which event?",
          options: [
            "the signing of the Treaty of Versailles",
            "the patriation of the Constitution in 1982",
            "Confederation in 1867",
            "the arrival of the Loyalists in 1784",
          ],
          correctIndex: 2,
          rationale:
            "Canada has been a constitutional monarchy in its own right since Confederation in 1867.",
          evidence:
            "Canada has been a constitutional monarchy in its own right since Confederation in 1867",
        },
        {
          id: "sy-004",
          biteId: "symbols.crown-and-flags.2",
          kind: "truefalse",
          prompt: "Queen Elizabeth II became Queen in 1952 and had her Diamond Jubilee in 2012.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale: "A Diamond Jubilee marks 60 years as Sovereign: 1952 to 2012.",
          evidence:
            "Queen Elizabeth II who has been Queen of Canada since 1952, marked her Golden Jubilee in 2002",
          caveat:
            "The guide is from 2012. Queen Elizabeth II died in September 2022 and King Charles III is now King of Canada.",
        },
        {
          id: "sy-005",
          biteId: "symbols.crown-and-flags.3",
          kind: "choice",
          prompt: "Where does the red-white-red pattern of the Canadian flag come from?",
          options: [
            "a design chosen by the Senate in 1964",
            "the navy of Free French Canada",
            "Buckingham Palace in London",
            "the flag of the Royal Military College, Kingston",
          ],
          correctIndex: 3,
          rationale:
            "The pattern comes from the flag of the Royal Military College in Kingston, founded in 1876.",
          evidence:
            "The red-white-red pattern comes from the flag of the Royal Military College, Kingston, founded in 1876.",
        },
        {
          id: "sy-006",
          biteId: "symbols.crown-and-flags.3",
          kind: "choice",
          prompt: "Since what year have red and white been the national colours of Canada?",
          options: ["1876", "1921", "1948", "1965"],
          correctIndex: 1,
          rationale:
            "Red and white have been Canada's national colours since 1921, long before the 1965 flag.",
          evidence: "the national colours of Canada since 1921",
        },
        {
          id: "sy-007",
          biteId: "symbols.crown-and-flags.4",
          kind: "truefalse",
          prompt: "The Canadian Red Ensign is Canada's official Royal Flag.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale:
            "The Union Jack is the Royal Flag. The Red Ensign was Canada's flag before 1965.",
          evidence: "The Union Jack is our official Royal Flag.",
        },
        {
          id: "sy-008",
          biteId: "symbols.crown-and-flags.4",
          kind: "choice",
          prompt: "For about how long did the Canadian Red Ensign serve as the Canadian flag?",
          options: ["100 years", "200 years", "20 years", "50 years"],
          correctIndex: 0,
          rationale: "The Red Ensign was Canada's flag for about 100 years, until 1965.",
          evidence: "The Canadian Red Ensign served as the Canadian flag for about 100 years.",
        },
      ],
    },
    {
      id: "symbols.maple-leaf-and-fleur-de-lys",
      moduleId: "symbols",
      title: "The maple leaf and the fleur-de-lys",
      summary: "The maple leaf and the French royal lily.",
      minutes: 5,
      source: chapterUrl("symbols"),
      bites: [
        {
          id: "symbols.maple-leaf-and-fleur-de-lys.1",
          title: "The maple leaf",
          body: "The maple leaf is Canada's best-known symbol. French-Canadians adopted it in the 1700s, and it has been on Canadian uniforms and insignia since the 1850s.",
          takeaway:
            "The maple leaf, Canada's best-known symbol, was adopted by French-Canadians in the 1700s.",
          evidence: "The maple leaf is Canada's best-known symbol.",
        },
        {
          id: "symbols.maple-leaf-and-fleur-de-lys.2",
          title: "On the headstones",
          body: "The maple leaf is carved on the headstones of fallen Canadian soldiers, both overseas and in Canada.",
          takeaway: "Maple leaves mark the headstones of fallen soldiers.",
          evidence:
            "are carved into the headstones of our fallen soldiers buried overseas and in Canada",
        },
        {
          id: "symbols.maple-leaf-and-fleur-de-lys.3",
          title: "The fleur-de-lys",
          body: "The fleur-de-lys, or lily flower, was adopted by the French king in 496. For more than a thousand years it was the symbol of French royalty, including in New France.",
          takeaway:
            "Adopted by the French king in 496, the fleur-de-lys stood for French royalty for over 1,000 years.",
          evidence:
            'It is said that the lily flower ("fleur-de-lys") was adopted by the French king in the year 496.',
        },
        {
          id: "symbols.maple-leaf-and-fleur-de-lys.4",
          title: "Revived at Confederation, kept by Quebec",
          body: "The fleur-de-lys was revived at Confederation and included in the Canadian Red Ensign. In 1948 Quebec adopted its own flag, based on the Cross and the fleur-de-lys.",
          takeaway:
            "The fleur-de-lys returned in the Red Ensign, and Quebec's 1948 flag pairs it with the Cross.",
          evidence:
            "Revived at Confederation, the fleur-de-lys was included in the Canadian Red Ensign.",
        },
      ],
      teach: {
        prompt: "Say how old each emblem is, and name a place you can still see each one.",
        checklist: [
          "The maple leaf is Canada's best-known symbol",
          "French-Canadians adopted it in the 1700s; on uniforms and insignia since the 1850s",
          "It is carved on the headstones of fallen soldiers",
          "The fleur-de-lys: adopted by the French king in 496, the symbol of New France",
          "Revived at Confederation in the Red Ensign; on Quebec's 1948 flag with the Cross",
        ],
        probe: "Which emblem appears on both the Red Ensign and Quebec's flag?",
      },
      test: [
        {
          id: "sy-009",
          biteId: "symbols.maple-leaf-and-fleur-de-lys.1",
          kind: "choice",
          prompt: "When did French-Canadians adopt the maple leaf as a symbol?",
          options: ["the 1600s", "the 1700s", "the 1900s", "the 1800s"],
          correctIndex: 1,
          rationale: "French-Canadians adopted the maple leaf in the 1700s.",
          evidence: "Maple leaves were adopted as a symbol by French-Canadians in the 1700s",
        },
        {
          id: "sy-010",
          biteId: "symbols.maple-leaf-and-fleur-de-lys.1",
          kind: "truefalse",
          prompt: "Maple leaves have appeared on Canadian uniforms and insignia since the 1950s.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale:
            "Maple leaves have been on uniforms and insignia since the 1850s, a century earlier.",
          evidence: "have appeared on Canadian uniforms and insignia since the 1850s",
        },
        {
          id: "sy-011",
          biteId: "symbols.maple-leaf-and-fleur-de-lys.2",
          kind: "choice",
          prompt: "Where is the maple leaf carved?",
          options: [
            "on the clock of the Peace Tower",
            "on the front page of the books",
            "on the headstones of fallen soldiers",
            "on the door of the Senate",
          ],
          correctIndex: 2,
          rationale: "It is carved on the headstones of fallen soldiers, overseas and in Canada.",
          evidence:
            "are carved into the headstones of our fallen soldiers buried overseas and in Canada",
        },
        {
          id: "sy-012",
          biteId: "symbols.maple-leaf-and-fleur-de-lys.3",
          kind: "choice",
          prompt: "In what year did the French king adopt the fleur-de-lys?",
          options: ["968", "1066", "1492", "496"],
          correctIndex: 3,
          rationale: "The French king adopted the lily flower in 496.",
          evidence:
            "was adopted by the French king in the year 496. It became the symbol of French royalty",
        },
        {
          id: "sy-013",
          biteId: "symbols.maple-leaf-and-fleur-de-lys.3",
          kind: "choice",
          prompt: "For how long was the fleur-de-lys the symbol of French royalty?",
          options: [
            "About three hundred years",
            "More than a thousand years",
            "Fewer than two hundred years",
            "Exactly five hundred years",
          ],
          correctIndex: 1,
          rationale: "More than a thousand years, including in New France.",
          evidence:
            "It became the symbol of French royalty for more than a thousand years, including the colony of New France.",
        },
        {
          id: "sy-014",
          biteId: "symbols.maple-leaf-and-fleur-de-lys.4",
          kind: "choice",
          prompt: "Quebec's own flag, adopted in 1948, is based on which two emblems?",
          options: [
            "the Cross and the fleur-de-lys",
            "the lion and the unicorn",
            "the beaver and the maple leaf",
            "the Crown and the mace",
          ],
          correctIndex: 0,
          rationale: "Quebec's 1948 flag is based on the Cross and the fleur-de-lys.",
          evidence: "In 1948 Quebec adopted its own flag, based on the Cross and the fleur-de-lys.",
        },
        {
          id: "sy-015",
          biteId: "symbols.maple-leaf-and-fleur-de-lys.4",
          kind: "truefalse",
          prompt:
            "The fleur-de-lys was revived at Confederation and included in the Canadian Red Ensign.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale: "At Confederation the fleur-de-lys came back, as part of the Red Ensign.",
          evidence:
            "Revived at Confederation, the fleur-de-lys was included in the Canadian Red Ensign.",
        },
      ],
    },
    {
      id: "symbols.arms-motto-and-parliament",
      moduleId: "symbols",
      title: "The coat of arms, the motto and Parliament",
      summary:
        "A Mari Usque Ad Mare, the 1916 fire, the Peace Tower and the provincial legislatures.",
      minutes: 7,
      source: chapterUrl("symbols"),
      bites: [
        {
          id: "symbols.arms-motto-and-parliament.1",
          title: "The arms and the motto",
          body: 'After the First World War, as an expression of national pride, Canada adopted an official coat of arms and a national motto: A Mari Usque Ad Mare, Latin for "from sea to sea".',
          takeaway: 'The motto A Mari Usque Ad Mare means "from sea to sea".',
          evidence:
            'Canada adopted an official coat of arms and a national motto, A Mari Usque Ad Mare, which in Latin means "from sea to sea."',
        },
        {
          id: "symbols.arms-motto-and-parliament.2",
          title: "What the arms show",
          body: "The arms carry symbols of England, France, Scotland and Ireland, and red maple leaves. You can see them on dollar bills, government documents and public buildings.",
          takeaway: "The arms show England, France, Scotland, Ireland and red maple leaves.",
          evidence:
            "The arms contain symbols of England, France, Scotland and Ireland as well as red maple leaves.",
        },
        {
          id: "symbols.arms-motto-and-parliament.3",
          title: "The Parliament Buildings",
          body: "The towers, arches, sculptures and stained glass of the Parliament Buildings reflect French, English and Aboriginal traditions, in the Gothic Revival style popular under Queen Victoria. They were completed in the 1860s.",
          takeaway:
            "The Parliament Buildings are Gothic Revival, with French, English and Aboriginal traditions.",
          evidence:
            "embody the French, English and Aboriginal traditions and the Gothic Revival architecture popular in the time of Queen Victoria",
        },
        {
          id: "symbols.arms-motto-and-parliament.4",
          title: "The fire, the Library and the Peace Tower",
          body: "An accidental fire destroyed the Centre Block in 1916, and it was rebuilt by 1922. The Library is the only part of the original building left. The Peace Tower was finished in 1927 in memory of the First World War. Its Memorial Chamber holds the Books of Remembrance, with the names of those who died serving Canada.",
          takeaway:
            "Fire in 1916 spared only the Library. The Peace Tower of 1927 holds the Books of Remembrance.",
          evidence:
            "The Centre Block was destroyed by an accidental fire in 1916 and rebuilt in 1922. The Library is the only part of the original building remaining.",
        },
        {
          id: "symbols.arms-motto-and-parliament.5",
          title: "The provincial legislatures",
          body: "The provincial legislatures are architectural treasures. Quebec's National Assembly is in the French Second Empire style. The others are Baroque, Romanesque or neoclassical, echoing the Greek and Roman roots of democracy.",
          takeaway:
            "Quebec's National Assembly is French Second Empire. Other legislatures are Baroque, Romanesque or neoclassical.",
          evidence: "The Quebec National Assembly is built in the French Second Empire style",
        },
      ],
      teach: {
        prompt:
          "Give the motto and its meaning. Then explain what burned in 1916, what was finished in 1927, and what survived.",
        checklist: [
          'A Mari Usque Ad Mare means "from sea to sea"',
          "The arms and motto came from national pride after the First World War",
          "The arms show England, France, Scotland, Ireland and red maple leaves",
          "Fire destroyed the Centre Block in 1916; rebuilt by 1922; only the Library survived",
          "The Peace Tower, 1927, holds the Books of Remembrance",
        ],
        probe: "Which Centre Block date is the fire, and which is the rebuilding?",
      },
      test: [
        {
          id: "sy-016",
          biteId: "symbols.arms-motto-and-parliament.1",
          kind: "choice",
          prompt: "What is the meaning of Canada's motto, A Mari Usque Ad Mare?",
          options: [
            "beyond the western sea",
            "from sea to sea",
            "unity through strength",
            "one people, one crown",
          ],
          correctIndex: 1,
          rationale: 'The Latin motto means "from sea to sea".',
          evidence: 'A Mari Usque Ad Mare, which in Latin means "from sea to sea."',
        },
        {
          id: "sy-017",
          biteId: "symbols.arms-motto-and-parliament.1",
          kind: "choice",
          prompt:
            "Canada adopted its coat of arms and motto out of national pride after which event?",
          options: [
            "the War of 1812",
            "the Second Boer War",
            "the First World War",
            "the American Revolution",
          ],
          correctIndex: 2,
          rationale: "Both came from national pride after the First World War.",
          evidence:
            "As an expression of national pride after the First World War, Canada adopted an official coat of arms",
        },
        {
          id: "sy-018",
          biteId: "symbols.arms-motto-and-parliament.2",
          kind: "choice",
          prompt: "Which countries' symbols appear in the coat of arms, with red maple leaves?",
          options: [
            "Portugal, Spain, Ireland and Iceland",
            "England, Scotland, Wales and Normandy",
            "France, Belgium, Switzerland and Acadia",
            "England, France, Scotland and Ireland",
          ],
          correctIndex: 3,
          rationale: "The arms show the symbols of England, France, Scotland and Ireland.",
          evidence:
            "The arms contain symbols of England, France, Scotland and Ireland as well as red maple leaves.",
        },
        {
          id: "sy-019",
          biteId: "symbols.arms-motto-and-parliament.2",
          kind: "truefalse",
          prompt: "The coat of arms appears only on government documents and public buildings.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "It also appears on dollar bills.",
          evidence:
            "Today the arms can be seen on dollar bills, government documents and public buildings.",
        },
        {
          id: "sy-020",
          biteId: "symbols.arms-motto-and-parliament.3",
          kind: "choice",
          prompt: "What architectural style are the Parliament Buildings?",
          options: ["Gothic Revival", "Modernist", "Art Deco", "Chateauesque"],
          correctIndex: 0,
          rationale:
            "The Parliament Buildings are Gothic Revival, a style popular under Queen Victoria.",
          evidence: "the Gothic Revival architecture popular in the time of Queen Victoria",
        },
        {
          id: "sy-021",
          biteId: "symbols.arms-motto-and-parliament.4",
          kind: "truefalse",
          prompt:
            "The Library is the only part of the original Parliament building still standing.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale: "Fire destroyed the Centre Block in 1916. Only the Library survived.",
          evidence: "The Library is the only part of the original building remaining.",
        },
        {
          id: "sy-022",
          biteId: "symbols.arms-motto-and-parliament.4",
          kind: "choice",
          prompt: "What does the Memorial Chamber, inside the Peace Tower, contain?",
          options: [
            "the original Mace",
            "the Books of Remembrance",
            "the Crown jewels",
            "the journals of Parliament",
          ],
          correctIndex: 1,
          rationale:
            "The Memorial Chamber holds the Books of Remembrance, with the names of those who died serving Canada.",
          evidence: "The Memorial Chamber within the Tower contains the Books of Remembrance",
        },
        {
          id: "sy-023",
          biteId: "symbols.arms-motto-and-parliament.5",
          kind: "choice",
          prompt: "Which legislature is built in the French Second Empire style?",
          options: [
            "the Canadian embassy in Paris",
            "the Supreme Court building in Ottawa",
            "the Quebec National Assembly",
            "the British Columbia Parliament Buildings",
          ],
          correctIndex: 2,
          rationale:
            "Quebec's National Assembly. The other legislatures are Baroque, Romanesque or neoclassical.",
          evidence: "The Quebec National Assembly is built in the French Second Empire style",
        },
      ],
    },
    {
      id: "symbols.sports-and-beaver",
      moduleId: "symbols",
      title: "Sports and the beaver",
      summary: "Hockey and four other sports, two cups, and the beaver.",
      minutes: 6,
      source: chapterUrl("symbols"),
      bites: [
        {
          id: "symbols.sports-and-beaver.1",
          title: "Hockey",
          body: "Hockey is Canada's most popular spectator sport and its national winter sport. Ice hockey was developed in Canada in the 1800s. Many young Canadians play it at school, in leagues, or on the street, and children have collected hockey cards for generations.",
          takeaway: "Hockey is the most popular sport to watch and the national winter sport.",
          evidence:
            "Hockey is Canada's most popular spectator sport and is considered to be the national winter sport.",
        },
        {
          id: "symbols.sports-and-beaver.2",
          title: "The Stanley Cup and the Clarkson Cup",
          body: "National Hockey League teams play for the Stanley Cup, donated by Governor General Lord Stanley in 1892. The Clarkson Cup, created in 2005 by Adrienne Clarkson, the first Governor General of Asian origin, is for women's hockey.",
          takeaway:
            "The Stanley Cup dates from 1892. The Clarkson Cup, from 2005, is for women's hockey.",
          evidence: "donated by Lord Stanley, the Governor General, in 1892.",
        },
        {
          id: "symbols.sports-and-beaver.3",
          title: "Football, curling, lacrosse and soccer",
          body: "Canadian football is the second most popular sport. Curling, an ice game brought by Scottish pioneers, is popular too. Lacrosse, an ancient sport first played by Aboriginal peoples, is the official summer sport. Soccer has the most registered players of any sport.",
          takeaway:
            "Football is second most popular, lacrosse is the summer sport, soccer has the most players.",
          evidence:
            "Lacrosse, an ancient sport first played by Aboriginals, is the official summer sport.",
        },
        {
          id: "symbols.sports-and-beaver.4",
          title: "The beaver",
          body: "Centuries ago, the Hudson's Bay Company adopted the beaver as its symbol. In 1834 it became an emblem of the St. Jean Baptiste Society, a French-Canadian patriotic group. Today it is on the five-cent coin and on the coats of arms of Saskatchewan, Alberta, Montreal and Toronto.",
          takeaway:
            "The beaver was the Hudson's Bay Company's symbol and is on the five-cent coin.",
          evidence: "The beaver was adopted centuries ago as a symbol of the Hudson's Bay Company.",
        },
      ],
      teach: {
        prompt:
          "Name the five sports and one fact about each. Then say where the beaver appeared before the five-cent coin.",
        checklist: [
          "Hockey: most popular to watch, the national winter sport, developed in Canada in the 1800s",
          "The Stanley Cup from Lord Stanley in 1892; the Clarkson Cup for women's hockey",
          "Canadian football is second most popular; curling came with Scottish pioneers",
          "Lacrosse is the official summer sport; soccer has the most registered players",
          "The beaver: the Hudson's Bay Company, then the St. Jean Baptiste Society in 1834",
        ],
        probe: "Which two sports are easy to mix up, and what is the fact for each?",
      },
      test: [
        {
          id: "sy-024",
          biteId: "symbols.sports-and-beaver.1",
          kind: "choice",
          prompt: "What is Canada's most popular spectator sport?",
          options: ["Curling", "Football", "Baseball", "Hockey"],
          correctIndex: 3,
          rationale: "Hockey is the most popular to watch. Soccer has the most registered players.",
          evidence: "Hockey is Canada's most popular spectator sport",
        },
        {
          id: "sy-025",
          biteId: "symbols.sports-and-beaver.1",
          kind: "truefalse",
          prompt: "Ice hockey was developed in Canada in the 1800s.",
          options: ["True", "False"],
          correctIndex: 0,
          rationale: "Ice hockey was developed in Canada in the 1800s.",
          evidence: "Ice hockey was developed in Canada in the 1800s.",
        },
        {
          id: "sy-026",
          biteId: "symbols.sports-and-beaver.2",
          kind: "choice",
          prompt: "Which Governor General donated the NHL's championship cup?",
          options: [
            "Lord Stanley",
            "Earl Grey",
            "the Marquess of Lorne",
            "Admiral Sir David Beatty",
          ],
          correctIndex: 0,
          rationale: "Lord Stanley donated the Stanley Cup in 1892.",
          evidence: "donated by Lord Stanley, the Governor General, in 1892.",
        },
        {
          id: "sy-027",
          biteId: "symbols.sports-and-beaver.2",
          kind: "truefalse",
          prompt: "The Clarkson Cup, established in 2005, is awarded for men's hockey.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "The Clarkson Cup is for women's hockey. The NHL plays for the Stanley Cup.",
          evidence: "is awarded for women's hockey.",
        },
        {
          id: "sy-028",
          biteId: "symbols.sports-and-beaver.3",
          kind: "choice",
          prompt: "Which is Canada's official summer sport?",
          options: ["Curling", "Lacrosse", "Rowing", "Football"],
          correctIndex: 1,
          rationale:
            "Lacrosse, first played by Aboriginal peoples, is the official summer sport. Hockey is the winter one.",
          evidence:
            "Lacrosse, an ancient sport first played by Aboriginals, is the official summer sport.",
        },
        {
          id: "sy-029",
          biteId: "symbols.sports-and-beaver.3",
          kind: "choice",
          prompt: "Which sport has the most registered players in Canada?",
          options: ["Curling", "Baseball", "Soccer", "Ice hockey"],
          correctIndex: 2,
          rationale:
            "Soccer has the most registered players, though hockey draws the biggest crowds.",
          evidence: "Soccer has the most registered players of any game in Canada.",
        },
        {
          id: "sy-030",
          biteId: "symbols.sports-and-beaver.4",
          kind: "choice",
          prompt: "Centuries ago, the beaver was adopted as a symbol of which organization?",
          options: [
            "the Canadian Pacific Railway",
            "the North West Company",
            "the Bank of Montreal",
            "the Hudson's Bay Company",
          ],
          correctIndex: 3,
          rationale:
            "The Hudson's Bay Company adopted the beaver centuries ago. The St. Jean Baptiste Society followed in 1834.",
          evidence: "The beaver was adopted centuries ago as a symbol of the Hudson's Bay Company.",
        },
        {
          id: "sy-031",
          biteId: "symbols.sports-and-beaver.4",
          kind: "choice",
          prompt: "Which Canadian coin shows the beaver?",
          options: [
            "the five-cent coin",
            "the twenty-five cent coin",
            "the one-dollar coin",
            "the two-dollar coin",
          ],
          correctIndex: 0,
          rationale: "The beaver is on the five-cent coin.",
          evidence: "This industrious rodent can be seen on the five-cent coin",
        },
      ],
    },
    {
      id: "symbols.official-languages",
      moduleId: "symbols",
      title: "English and French as symbols",
      summary:
        "The two official languages, who must know one, and the Official Languages Act of 1969.",
      minutes: 4,
      source: chapterUrl("symbols"),
      bites: [
        {
          id: "symbols.official-languages.1",
          title: "Languages as symbols",
          body: "English and French are Canada's two official languages and important symbols of identity. English speakers (Anglophones) and French speakers (Francophones) have lived together, in partnership and creative tension, for more than 300 years.",
          takeaway:
            "English and French are the official languages and important symbols of identity.",
          evidence:
            "English and French are the two official languages and are important symbols of identity.",
        },
        {
          id: "symbols.official-languages.2",
          title: "The language requirement for citizenship",
          body: "To become a citizen, you need adequate knowledge of English or French. The guide exempts applicants 55 and over. Since 2017, the requirement applies to applicants aged 18 to 54.",
          takeaway: "Applicants 18 to 54 need adequate English or French.",
          evidence: "Adult applicants 55 years of age and over are exempted from this requirement.",
        },
        {
          id: "symbols.official-languages.3",
          title: "The Official Languages Act, 1969",
          body: "Parliament passed the Official Languages Act in 1969. It has three main goals: equality of French and English in Parliament, the Government of Canada and federal institutions; supporting official language minority communities; and promoting equality of French and English across Canadian society.",
          takeaway:
            "The Official Languages Act of 1969 has three main goals, including equality of French and English.",
          evidence:
            "Parliament passed the Official Languages Act in 1969. It has three main objectives:",
        },
      ],
      teach: {
        prompt:
          "Say what else the two official languages are, who doesn't need to show knowledge of one, and what the 1969 Act aims to do.",
        checklist: [
          "English and French are the official languages and important symbols of identity",
          "Anglophones and Francophones have lived together for more than 300 years",
          "Citizenship needs adequate English or French; the guide exempts applicants 55 and over",
          "Parliament passed the Official Languages Act in 1969",
          "One of its three goals: support official language minority communities",
        ],
        probe: "Why is language counted as a national symbol?",
      },
      test: [
        {
          id: "sy-032",
          biteId: "symbols.official-languages.1",
          kind: "choice",
          prompt: "Besides being the official languages, what are English and French?",
          options: [
            "the working languages of the legislature",
            "important symbols of identity",
            "the languages of the coinage",
            "the languages of the honours system",
          ],
          correctIndex: 1,
          rationale: "English and French are important symbols of identity.",
          evidence:
            "English and French are the two official languages and are important symbols of identity.",
        },
        {
          id: "sy-033",
          biteId: "symbols.official-languages.2",
          kind: "truefalse",
          prompt:
            "Every adult applicant for citizenship must show adequate knowledge of English or French.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "Older applicants are exempt. The guide says 55 and over.",
          evidence: "Adult applicants 55 years of age and over are exempted from this requirement.",
          caveat:
            "Since October 11, 2017, the requirement applies to applicants aged 18 to 54. The citizenship test itself does not assess language.",
        },
        {
          id: "sy-034",
          biteId: "symbols.official-languages.3",
          kind: "choice",
          prompt: "In what year did Parliament pass the Official Languages Act?",
          options: ["1982", "1969", "1925", "1949"],
          correctIndex: 1,
          rationale: "Parliament passed the Official Languages Act in 1969.",
          evidence: "Parliament passed the Official Languages Act in 1969.",
        },
        {
          id: "sy-035",
          biteId: "symbols.official-languages.3",
          kind: "choice",
          prompt: "Which of these is a goal of the Official Languages Act?",
          options: [
            "Require every federal employee to be bilingual",
            "Create a language school in each province",
            "Maintain and develop official language minority communities in Canada",
            "Make English and French official languages of every province",
          ],
          correctIndex: 2,
          rationale:
            "Its goals are equality of French and English in federal institutions, supporting official language minority communities, and promoting equality of the two languages in society.",
          evidence: "Maintain and develop official language minority communities in Canada;",
        },
      ],
    },
    {
      id: "symbols.anthems",
      moduleId: "symbols",
      title: "The anthems",
      summary: "O Canada, its two dates and two sets of words, and God Save the King.",
      minutes: 4,
      source: chapterUrl("symbols"),
      bites: [
        {
          id: "symbols.anthems.1",
          title: "O Canada: 1880 and 1980",
          body: "O Canada was first sung in 1880 and proclaimed the national anthem a century later, in 1980. Keep the dates straight: 1880 is the first performance, 1980 the proclamation.",
          takeaway: "O Canada was first sung in 1880 and became the national anthem in 1980.",
          evidence: "O Canada was proclaimed as the National Anthem in 1980.",
        },
        {
          id: "symbols.anthems.2",
          title: "Where it was first sung",
          body: "O Canada was first sung in Québec City in 1880. The guide prints its words in both English and French.",
          takeaway: "O Canada was first sung in Québec City.",
          evidence: "It was first sung in Québec City in 1880.",
        },
        {
          id: "symbols.anthems.3",
          title: "Two sets of words",
          body: 'The English words begin "O Canada! Our home and native land!" and end "we stand on guard for thee." English and French Canadians sing different words to the same anthem.',
          takeaway: "English and French Canadians sing different words to the anthem.",
          evidence: "French and English Canadians sing different words to the National Anthem.",
        },
        {
          id: "symbols.anthems.4",
          title: "The Royal Anthem",
          body: 'Canada\'s Royal Anthem is "God Save the King" (or Queen). It can be played or sung on any occasion when Canadians wish to honour the Sovereign.',
          takeaway: "The Royal Anthem is God Save the King, sung to honour the Sovereign.",
          evidence:
            'The Royal Anthem of Canada, "God Save the King (or Queen)," can be played or sung on any occasion when Canadians wish to honour the Sovereign.',
        },
      ],
      teach: {
        prompt:
          "Give the two O Canada dates, then explain how the Royal Anthem differs from the national anthem.",
        checklist: [
          "O Canada was first sung in Québec City in 1880",
          "It was proclaimed the national anthem in 1980",
          "English and French Canadians sing different words",
          "The Royal Anthem is God Save the King (or Queen), sung to honour the Sovereign",
        ],
        probe: "Which anthem honours the Sovereign rather than the country?",
      },
      test: [
        {
          id: "sy-036",
          biteId: "symbols.anthems.1",
          kind: "choice",
          prompt: "In what year did O Canada become the national anthem?",
          options: ["1917", "1939", "1980", "1992"],
          correctIndex: 2,
          rationale:
            "O Canada was proclaimed the national anthem in 1980, a century after it was first sung.",
          evidence: "O Canada was proclaimed as the National Anthem in 1980.",
        },
        {
          id: "sy-037",
          biteId: "symbols.anthems.2",
          kind: "choice",
          prompt: "Where and when was O Canada first sung?",
          options: ["Montréal in 1921", "Paris in 1780", "Ottawa in 1867", "Québec City in 1880"],
          correctIndex: 3,
          rationale: "O Canada was first sung in Québec City in 1880.",
          evidence: "It was first sung in Québec City in 1880.",
        },
        {
          id: "sy-038",
          biteId: "symbols.anthems.3",
          kind: "truefalse",
          prompt: "French and English Canadians sing the same words to the national anthem.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "English and French Canadians sing different words.",
          evidence: "French and English Canadians sing different words to the National Anthem.",
        },
        {
          id: "sy-039",
          biteId: "symbols.anthems.4",
          kind: "choice",
          prompt: "What is the Royal Anthem of Canada?",
          options: [
            "God Save the King (or Queen)",
            "Canada, Our Home and Native Land",
            "O Canada",
            "The Maple Leaf Forever",
          ],
          correctIndex: 0,
          rationale:
            "The Royal Anthem is God Save the King (or Queen). O Canada is the national anthem.",
          evidence: 'The Royal Anthem of Canada, "God Save the King (or Queen),"',
        },
        {
          id: "sy-040",
          biteId: "symbols.anthems.4",
          kind: "choice",
          prompt: "When may the Royal Anthem be played or sung?",
          options: [
            "only on the Monday preceding May 25",
            "on any occasion when Canadians wish to honour the Sovereign",
            "only at the opening of Parliament",
            "only at citizenship ceremonies",
          ],
          correctIndex: 1,
          rationale: "On any occasion when Canadians wish to honour the Sovereign.",
          evidence:
            "can be played or sung on any occasion when Canadians wish to honour the Sovereign.",
        },
      ],
    },
    {
      id: "symbols.order-of-canada",
      moduleId: "symbols",
      title: "Honours and the Order of Canada",
      summary: "What honours are, Canada's own system since 1967, and who may nominate.",
      minutes: 4,
      source: chapterUrl("symbols"),
      bites: [
        {
          id: "symbols.order-of-canada.1",
          title: "What honours are",
          body: "Every country recognizes outstanding citizens. Canada's official awards are called honours, and they come in three kinds: orders, decorations and medals.",
          takeaway: "Honours are orders, decorations and medals.",
          evidence:
            "Official awards are called honours, consisting of orders, decorations, and medals.",
        },
        {
          id: "symbols.order-of-canada.2",
          title: "Canada's own system began in 1967",
          body: "Canada used British honours for many years. In 1967, Canada's 100th birthday, it created its own system, starting with the Order of Canada.",
          takeaway: "The Order of Canada, created in 1967, began Canada's own honours.",
          evidence:
            "Canada started its own honours system with the Order of Canada in 1967, the centennial of Confederation.",
        },
        {
          id: "symbols.order-of-canada.3",
          title: "Anyone can nominate",
          body: "If you know someone you think deserves recognition, you are welcome to nominate them. The Governor General's website explains how.",
          takeaway: "Anyone can nominate a fellow citizen for an honour.",
          evidence:
            "If you know of fellow citizens who you think are worthy of recognition, you are welcome to nominate them.",
        },
        {
          id: "symbols.order-of-canada.4",
          title: "The Victoria Cross",
          body: "The Victoria Cross (V.C.) is the highest honour available to Canadians. It is awarded for the most conspicuous bravery, a daring act of valour or self-sacrifice, or extreme devotion to duty in the presence of the enemy. 96 Canadians have received it since 1854.",
          takeaway:
            "The Victoria Cross is the highest honour. 96 Canadians have received it since 1854.",
          evidence: "The Victoria Cross (V.C.) is the highest honour available to Canadians",
        },
      ],
      teach: {
        prompt:
          "Name the three kinds of honours, the year Canada's own system began, and what the Victoria Cross is for.",
        checklist: [
          "Honours are orders, decorations and medals",
          "Canada used British honours until it created the Order of Canada in 1967",
          "Anyone may nominate a fellow citizen",
          "The Victoria Cross is the highest honour: for bravery in the presence of the enemy",
          "96 Canadians have received it since 1854",
        ],
        probe: "Which is the highest honour: the Order of Canada or the Victoria Cross?",
      },
      test: [
        {
          id: "sy-041",
          biteId: "symbols.order-of-canada.1",
          kind: "choice",
          prompt: "What are the three kinds of honours?",
          options: [
            "decorations, ranks, and land grants",
            "orders, titles, and pensions",
            "orders, decorations, and medals",
            "medals, certificates, and bursaries",
          ],
          correctIndex: 2,
          rationale: "Honours are orders, decorations and medals.",
          evidence:
            "Official awards are called honours, consisting of orders, decorations, and medals.",
        },
        {
          id: "sy-042",
          biteId: "symbols.order-of-canada.2",
          kind: "choice",
          prompt: "Canada began its own honours system with the Order of Canada in which year?",
          options: ["1967", "1949", "1975", "1982"],
          correctIndex: 0,
          rationale: "The Order of Canada came in 1967, Canada's 100th birthday.",
          evidence:
            "Canada started its own honours system with the Order of Canada in 1967, the centennial of Confederation.",
        },
        {
          id: "sy-043",
          biteId: "symbols.order-of-canada.3",
          kind: "truefalse",
          prompt: "Only the Governor General may nominate someone for a Canadian honour.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "Anyone may nominate a fellow citizen they think deserves recognition.",
          evidence:
            "If you know of fellow citizens who you think are worthy of recognition, you are welcome to nominate them.",
        },
        {
          id: "sy-044",
          biteId: "symbols.order-of-canada.4",
          kind: "choice",
          prompt: "What is the highest honour available to Canadians?",
          options: [
            "The Cross of Valour",
            "The Star of Courage",
            "The Order of Merit",
            "The Victoria Cross",
          ],
          correctIndex: 3,
          rationale: "The Victoria Cross is the highest honour.",
          evidence: "The Victoria Cross (V.C.) is the highest honour available to Canadians",
        },
        {
          id: "sy-045",
          biteId: "symbols.order-of-canada.4",
          kind: "choice",
          prompt: "What is the Victoria Cross awarded for?",
          options: [
            "the most conspicuous bravery in the presence of the enemy",
            "a lifetime of outstanding achievement",
            "winning a national championship",
            "long service in the Canadian Forces",
          ],
          correctIndex: 0,
          rationale:
            "The V.C. is for bravery, valour, self-sacrifice or devotion to duty in the presence of the enemy.",
          evidence:
            "is awarded for the most conspicuous bravery, a daring or pre-eminent act of valour or self-sacrifice",
        },
        {
          id: "sy-046",
          biteId: "symbols.order-of-canada.4",
          kind: "choice",
          prompt: "How many Canadians has the Victoria Cross been awarded to since 1854?",
          options: ["54", "75", "120", "96"],
          correctIndex: 3,
          rationale: "96 Canadians have received the V.C. since 1854.",
          evidence: "The V.C. has been awarded to 96 Canadians since 1854",
        },
      ],
    },
    {
      id: "symbols.victoria-cross",
      moduleId: "symbols",
      title: "Six Victoria Cross recipients",
      summary: "Dunn, Hall, Konowal, Bishop, Triquet and Gray, and what each did.",
      minutes: 4,
      source: chapterUrl("symbols"),
      bites: [
        {
          id: "symbols.victoria-cross.1",
          title: "Alexander Roberts Dunn, 1854",
          body: "Lieutenant Alexander Roberts Dunn, born in what is now Toronto, rode in the Charge of the Light Brigade at Balaclava in 1854, during the Crimean War. He was the first Canadian awarded the Victoria Cross.",
          takeaway: "Dunn was the first Canadian to win the V.C., at Balaclava in 1854.",
          evidence: "was the first Canadian to be awarded the Victoria Cross.",
        },
        {
          id: "symbols.victoria-cross.2",
          title: "William Hall at Lucknow",
          body: "Able Seaman William Hall of Horton, Nova Scotia, the son of American slaves, was the first Black person awarded the V.C. He won it at the Siege of Lucknow in India in 1857.",
          takeaway: "William Hall was the first Black V.C. recipient, at the Siege of Lucknow.",
          evidence:
            "was the first black man to be awarded the V.C. for his role in the Siege of Lucknow",
        },
        {
          id: "symbols.victoria-cross.3",
          title: "Filip Konowal and Billy Bishop",
          body: "Corporal Filip Konowal, born in Ukraine, won the V.C. at the Battle of Hill 70 in 1917. He was the first member of the Canadian Corps born outside the British Empire to receive it. Captain Billy Bishop of Owen Sound, Ontario, a flying ace, won his in the Royal Flying Corps in the First World War.",
          takeaway: "Konowal at Hill 70 in 1917. Bishop as a fighter pilot.",
          evidence: "showed exceptional courage in the Battle of Hill 70 in 1917",
        },
        {
          id: "symbols.victoria-cross.4",
          title: "Paul Triquet and Hampton Gray",
          body: "Captain Paul Triquet of Cabano, Quebec, won the V.C. in 1943 leading his men and a few tanks at Casa Berardi in Italy. Lieutenant Robert Hampton Gray of Trail, B.C., a navy pilot, was killed sinking a Japanese warship in August 1945. He is the last Canadian to receive the V.C.",
          takeaway:
            "Triquet at Casa Berardi in 1943. Gray, in 1945, was the last Canadian recipient.",
          evidence: "was the last Canadian to receive the V.C. to date.",
        },
      ],
      teach: {
        prompt: "Name the six Victoria Cross recipients, and the place or action for each.",
        checklist: [
          "Dunn: the first Canadian, Balaclava, 1854",
          "Hall: the first Black recipient, the Siege of Lucknow, 1857",
          "Konowal: Hill 70, 1917",
          "Bishop: a flying ace in the First World War",
          "Triquet: Casa Berardi, Italy, 1943",
          "Gray: August 1945, the last Canadian recipient",
        ],
        probe: "Which two won theirs in the First World War, and which two in the Second?",
      },
      test: [
        {
          id: "sy-047",
          biteId: "symbols.victoria-cross.1",
          kind: "choice",
          prompt: "Who was the first Canadian to be awarded the Victoria Cross?",
          options: ["Hall", "Dunn", "Triquet", "Bishop"],
          correctIndex: 1,
          rationale: "Alexander Roberts Dunn won it at Balaclava in 1854, during the Crimean War.",
          evidence: "was the first Canadian to be awarded the Victoria Cross.",
        },
        {
          id: "sy-048",
          biteId: "symbols.victoria-cross.2",
          kind: "choice",
          prompt: "William Hall, the first Black Victoria Cross recipient, won it at which siege?",
          options: ["Louisbourg", "Khartoum", "Lucknow", "Ava"],
          correctIndex: 2,
          rationale: "Hall won the V.C. at the Siege of Lucknow in 1857.",
          evidence:
            "was the first black man to be awarded the V.C. for his role in the Siege of Lucknow",
        },
        {
          id: "sy-049",
          biteId: "symbols.victoria-cross.3",
          kind: "choice",
          prompt: "Who won the Victoria Cross at the Battle of Hill 70 in 1917?",
          options: ["Bishop", "Triquet", "Gray", "Konowal"],
          correctIndex: 3,
          rationale: "Filip Konowal, born in Ukraine.",
          evidence: "showed exceptional courage in the Battle of Hill 70 in 1917",
        },
        {
          id: "sy-050",
          biteId: "symbols.victoria-cross.4",
          kind: "choice",
          prompt: "Where did Captain Paul Triquet win the Victoria Cross?",
          options: ["Casa Berardi", "Balaclava", "Hill 70", "Casablanca"],
          correctIndex: 0,
          rationale: "At Casa Berardi in Italy, in 1943.",
          evidence: "the attack on Casa Berardi in Italy in 1943 during the Second World War",
        },
        {
          id: "sy-051",
          biteId: "symbols.victoria-cross.4",
          kind: "choice",
          prompt: "Who was the last Canadian to receive the Victoria Cross?",
          options: ["Bishop", "Gray", "Konowal", "Triquet"],
          correctIndex: 1,
          rationale:
            "Robert Hampton Gray, a navy pilot killed sinking a Japanese warship in August 1945.",
          evidence: "was the last Canadian to receive the V.C. to date.",
        },
        {
          id: "sy-052",
          biteId: "symbols.victoria-cross.3",
          kind: "choice",
          prompt: "Which service was Billy Bishop in when he won the Victoria Cross?",
          options: [
            "the Canadian Tank Corps",
            "the Royal Canadian Artillery",
            "the Royal Flying Corps",
            "the Royal Newfoundland Regiment",
          ],
          correctIndex: 2,
          rationale: "Bishop was a flying ace in the Royal Flying Corps.",
          evidence: "earned the V.C. in the Royal Flying Corps during the First World War",
        },
      ],
    },
    {
      id: "symbols.holidays-january-to-june",
      moduleId: "symbols",
      title: "Holidays and dates: January to June",
      summary: "New Year's, Macdonald Day, Easter, Vimy Day, Victoria Day and the Fête Nationale.",
      minutes: 4,
      source: chapterUrl("symbols"),
      bites: [
        {
          id: "symbols.holidays-january-to-june.1",
          title: "January",
          body: "The year opens with New Year's Day on January 1 and Sir John A. Macdonald Day on January 11.",
          takeaway: "New Year's Day is January 1. Sir John A. Macdonald Day is January 11.",
          evidence: "Sir John A. Macdonald Day - January 11",
        },
        {
          id: "symbols.holidays-january-to-june.2",
          title: "Easter and Vimy Day",
          body: "Good Friday is the Friday before Easter Sunday, and Easter Monday is the Monday after it, so both move from year to year. Vimy Day is always April 9.",
          takeaway: "Good Friday and Easter Monday move with Easter. Vimy Day is April 9.",
          evidence: "Good Friday - Friday immediately preceding Easter Sunday",
        },
        {
          id: "symbols.holidays-january-to-june.3",
          title: "Victoria Day and Fête Nationale",
          body: "Victoria Day, the Sovereign's Birthday, is the Monday before May 25. Quebec's Fête Nationale, the Feast of St. John the Baptist, is June 24.",
          takeaway: "Victoria Day is the Monday before May 25. Fête Nationale is June 24.",
          evidence: "Victoria Day - Monday preceding May 25 (Sovereign's Birthday)",
        },
      ],
      teach: {
        prompt: "Go through the dates from January to June, and say which two move each year.",
        checklist: [
          "New Year's Day: January 1",
          "Sir John A. Macdonald Day: January 11",
          "Good Friday and Easter Monday: the days around Easter Sunday",
          "Vimy Day: April 9",
          "Victoria Day: the Monday before May 25",
          "Fête Nationale (Quebec): June 24",
        ],
        probe: "Which two holidays move each year?",
      },
      test: [
        {
          id: "sy-053",
          biteId: "symbols.holidays-january-to-june.1",
          kind: "choice",
          prompt: "When is Sir John A. Macdonald Day?",
          options: ["January 1", "January 15", "January 2", "January 11"],
          correctIndex: 3,
          rationale: "Sir John A. Macdonald Day is January 11, his birthday.",
          evidence: "Sir John A. Macdonald Day - January 11",
        },
        {
          id: "sy-054",
          biteId: "symbols.holidays-january-to-june.2",
          kind: "choice",
          prompt: "When is Good Friday?",
          options: [
            "the Friday immediately preceding Easter Sunday",
            "the Friday immediately following Easter Sunday",
            "the first Friday of April",
            "the Friday before Victoria Day",
          ],
          correctIndex: 0,
          rationale:
            "Good Friday is the Friday before Easter Sunday. Easter Monday is the Monday after.",
          evidence: "Good Friday - Friday immediately preceding Easter Sunday",
        },
        {
          id: "sy-055",
          biteId: "symbols.holidays-january-to-june.3",
          kind: "choice",
          prompt: "Which holiday falls on the Monday before May 25?",
          options: ["Louis Riel Day", "Victoria Day", "Labour Day", "Family Day"],
          correctIndex: 1,
          rationale: "Victoria Day, the Sovereign's Birthday, is the Monday before May 25.",
          evidence: "Victoria Day - Monday preceding May 25 (Sovereign's Birthday)",
        },
        {
          id: "sy-056",
          biteId: "symbols.holidays-january-to-june.3",
          kind: "choice",
          prompt: "When is Quebec's Fête Nationale?",
          options: ["June 29", "June 2", "June 24", "June 9"],
          correctIndex: 2,
          rationale: "Fête Nationale is June 24, the Feast of St. John the Baptist.",
          evidence: "Fête Nationale (Quebec) - June 24 (Feast of St. John the Baptist)",
        },
        {
          id: "sy-057",
          biteId: "symbols.holidays-january-to-june.2",
          kind: "choice",
          prompt: "When is Vimy Day?",
          options: ["April 12", "April 25", "April 6", "April 9"],
          correctIndex: 3,
          rationale: "Vimy Day is April 9, the anniversary of the battle.",
          evidence: "Vimy Day - April 9",
        },
      ],
    },
    {
      id: "symbols.holidays-july-to-december",
      moduleId: "symbols",
      title: "Holidays and dates: July to December",
      summary:
        "Canada Day, Labour Day, Thanksgiving, Remembrance Day, Laurier Day and the December holidays.",
      minutes: 4,
      source: chapterUrl("symbols"),
      bites: [
        {
          id: "symbols.holidays-july-to-december.1",
          title: "July to October",
          body: "Canada Day is July 1. Labour Day is the first Monday of September, and Thanksgiving is the second Monday of October. Don't mix up the two Mondays.",
          takeaway:
            "Canada Day July 1, Labour Day the first Monday of September, Thanksgiving the second Monday of October.",
          evidence: "Canada Day - July 1 - Labour Day - First Monday of September",
        },
        {
          id: "symbols.holidays-july-to-december.2",
          title: "November and December",
          body: "Remembrance Day is November 11, and Sir Wilfrid Laurier Day is November 20. The year ends with Christmas Day on December 25 and Boxing Day on December 26.",
          takeaway:
            "Remembrance Day November 11, Laurier Day November 20, Christmas 25, Boxing Day 26.",
          evidence: "Remembrance Day - November 11 - Sir Wilfrid Laurier Day - November 20",
        },
        {
          id: "symbols.holidays-july-to-december.3",
          title: "The poppy",
          body: "The poppy worn on Remembrance Day honours the sacrifice of Canadians who have served or died in wars, up to the present day. This is one of the guide's own study questions.",
          takeaway: "The poppy remembers Canadians who served or died in wars.",
          evidence:
            "To remember the sacrifice of Canadians who have served or died in wars up to the present day.",
        },
      ],
      teach: {
        prompt:
          "Go through the dates from July to December, then say in one sentence what the poppy is for.",
        checklist: [
          "Canada Day: July 1",
          "Labour Day: the first Monday of September",
          "Thanksgiving: the second Monday of October",
          "Remembrance Day: November 11; Sir Wilfrid Laurier Day: November 20",
          "Christmas: December 25; Boxing Day: December 26",
          "The poppy remembers Canadians who served or died in war",
        ],
        probe: "Which two dates are one day apart, and which two are nine days apart?",
      },
      test: [
        {
          id: "sy-058",
          biteId: "symbols.holidays-july-to-december.1",
          kind: "choice",
          prompt: "Which holiday is matched with the right date?",
          options: [
            "Canada Day - July 1",
            "Canada Day - July 4",
            "Labour Day - second Monday of September",
            "Thanksgiving Day - first Monday of October",
          ],
          correctIndex: 0,
          rationale:
            "Canada Day is July 1. The Labour Day and Thanksgiving options have their Mondays swapped.",
          evidence: "Canada Day - July 1",
        },
        {
          id: "sy-059",
          biteId: "symbols.holidays-july-to-december.2",
          kind: "choice",
          prompt: "When is Sir Wilfrid Laurier Day?",
          options: ["November 2", "November 20", "November 21", "November 14"],
          correctIndex: 1,
          rationale: "Sir Wilfrid Laurier Day is November 20, nine days after Remembrance Day.",
          evidence: "Sir Wilfrid Laurier Day - November 20",
        },
        {
          id: "sy-060",
          biteId: "symbols.holidays-july-to-december.2",
          kind: "truefalse",
          prompt: "Boxing Day is December 25.",
          options: ["True", "False"],
          correctIndex: 1,
          rationale: "Boxing Day is December 26, the day after Christmas.",
          evidence: "Boxing Day - December 26",
        },
        {
          id: "sy-061",
          biteId: "symbols.holidays-july-to-december.3",
          kind: "choice",
          prompt: "What is the meaning of the Remembrance Day poppy?",
          options: [
            "To mark the anniversary of Confederation",
            "To honour prime ministers who have died in office",
            "To remember the sacrifice of Canadians who have served or died in wars up to the present day",
            "To remember the reigning Sovereign of Canada",
          ],
          correctIndex: 2,
          rationale:
            "This question comes from the guide's own study questions. The poppy remembers Canadians who have served or died in wars up to the present day.",
          evidence:
            "To remember the sacrifice of Canadians who have served or died in wars up to the present day.",
          official: true,
        },
      ],
    },
  ],
};

export default module;
