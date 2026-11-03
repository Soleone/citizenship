import type { PlaceId, ProvinceId } from "./canada-shapes.ts";

/**
 * A picture that anchors a bite: a generated scene or pictogram (`public/images/<bite id>.webp`, described
 * by its alt text) or the study map. Geography is always the map, drawn from real boundaries,
 * because a generated map would teach wrong shapes with confidence. Shown with the bite and after
 * a test answer, never with a question, which it would often give away.
 */
export type BiteVisual = { image: string } | { map: ProvinceId[]; places?: PlaceId[] };

const maps: Record<string, BiteVisual> = {
  "who-we-are.official-languages.3": { map: ["nb"] },
  "regions.overview.3": { map: ["on"], places: ["ottawa"] },
  "regions.overview.4": { map: ["on", "qc"], places: ["ottawa"] },
  "regions.atlantic-provinces.1": { map: ["nl", "pe", "ns", "nb"], places: ["st-johns"] },
  "regions.atlantic-provinces.2": { map: ["nl"], places: ["st-johns"] },
  "regions.atlantic-provinces.3": { map: ["pe"], places: ["charlottetown"] },
  "regions.atlantic-provinces.4": { map: ["ns"], places: ["halifax"] },
  "regions.atlantic-provinces.5": { map: ["nb"], places: ["fredericton"] },
  "regions.central-canada.1": { map: ["on", "qc"] },
  "regions.central-canada.2": { map: ["qc"], places: ["quebec-city"] },
  "regions.central-canada.5": { map: ["on"], places: ["toronto"] },
  "regions.prairie-provinces.1": { map: ["mb", "sk", "ab"] },
  "regions.prairie-provinces.2": { map: ["mb"], places: ["winnipeg"] },
  "regions.prairie-provinces.3": { map: ["sk"], places: ["regina"] },
  "regions.alberta.1": { map: ["ab"], places: ["edmonton"] },
  "regions.west-coast.1": { map: ["bc"], places: ["victoria"] },
  "regions.northern-territories.1": { map: ["yt", "nt", "nu"] },
  "regions.northern-territories.3": { map: ["yt"], places: ["whitehorse"] },
  "regions.northwest-nunavut-and-rangers.1": { map: ["nt"], places: ["yellowknife"] },
  "regions.northwest-nunavut-and-rangers.2": { map: ["nu"], places: ["iqaluit"] },
};

/** Bite id to alt text. Made with GPT image through Codex; see public/images. */
const images: Record<string, string> = {
  "becoming-a-citizen.after-the-test.1":
    "An envelope being opened, a formal letter inside with a red seal, and a small Canadian flag pin beside it.",
  "becoming-a-citizen.after-the-test.2":
    "A letter linked by three arrows to a calendar page, a clock face and a building with a flag.",
  "becoming-a-citizen.after-the-test.3":
    "A citizenship ceremony: a row of new citizens from behind, right hands raised, families watching, small Canadian flags.",
  "becoming-a-citizen.after-the-test.4":
    "Families and friends filling rows of seats in a bright hall, seen from behind, small Canadian flags in hand.",
  "becoming-a-citizen.test-and-application.1":
    "A row of adult silhouettes from young to grey-haired; the younger ones each hold a pencil over a paper, the oldest ones stand with empty hands.",
  "becoming-a-citizen.test-and-application.2":
    "Two separate scales or pillars side by side, one topped by a maple leaf, the other by a speech bubble with no letters.",
  "becoming-a-citizen.test-and-application.3":
    "A desk with a pencil and a blank answer sheet beside an open study booklet with a red maple leaf on its cover, and across the desk two empty chairs facing each other for an interview.",
  "becoming-a-citizen.test-and-application.4":
    "Two adults at a kitchen table at night, one holding an open booklet and quizzing the other, a cup of tea, seen from the side without detailed faces.",
  "becoming-a-citizen.test-and-application.5":
    "A wall calendar with months of pages flipping and a mailbox on a house front with an envelope arriving.",
  "becoming-a-citizen.the-oath.1":
    "A single raised right hand in silhouette in front of a large simple crown shape.",
  "becoming-a-citizen.the-oath.2":
    "A hand resting on a heavy bound book of laws, a gavel and a small flag nearby.",
  "becoming-a-citizen.the-oath.3":
    "A crown and a feather and a wampum-style beaded belt laid side by side on cloth.",
  "becoming-a-citizen.the-oath.4":
    "A crown in the centre, with a folded document, a flag and a globe set aside in faded ink, and many small figures facing the crown.",
  "becoming-a-citizen.the-oath.5":
    "A ceremony hall seen from the back rows: people standing with right hands raised toward a front table with a flag.",
  "economy.three-types-of-industry.1":
    "Three icons: a handshake, a factory, and a tree with a pickaxe.",
  "economy.three-types-of-industry.2":
    "A nurse, a teacher and a tour guide at work in one composition.",
  "economy.three-types-of-industry.3":
    "Four figures, three wearing service-worker clothes, one in a factory hardhat.",
  "economy.three-types-of-industry.4": "An auto assembly line in a factory, sparks and robots.",
  "economy.three-types-of-industry.5":
    "A logging truck, a fishing boat, a combine harvester and a mine headframe.",
  "economy.trade-with-the-united-states.1":
    "Two hands shaking across a border line, maple leaf on one sleeve, stars on the other.",
  "economy.trade-with-the-united-states.2":
    "Four crates, three sliding south across a border, one going elsewhere.",
  "economy.trade-with-the-united-states.3":
    "A busy border crossing with trucks queuing in both directions.",
  "economy.trade-with-the-united-states.4":
    "A cargo train with crates of oil, machinery, lumber, fish and grain.",
  "economy.trade-with-the-united-states.5":
    "A white arch monument straddling a border lawn, flags on both sides.",
  "economy.trading-nation.1": "A busy harbour with cargo ships, cranes, and containers.",
  "economy.trading-nation.2": "Two trucks crossing a border bridge, flags on each end, 1988.",
  "economy.trading-nation.3":
    "Three trucks crossing a long highway, flags of three countries along it.",
  "economy.trading-nation.4":
    "A vast continent of highways and railways filled with trucks and trains.",
  "economy.trading-nation.5":
    "A round table of eight chairs at a summit, one with a maple leaf flag.",
  "elections.after-an-election.1":
    "A party leader seen from behind entering a grand residence, a Governor General's flag waving.",
  "elections.after-an-election.2":
    "A chamber of seats coloured with one colour filling more than half, and another chamber where it fills less than half.",
  "elections.after-an-election.3":
    "A budget briefcase on the desk of a chamber, a vote going against the government.",
  "elections.after-an-election.4":
    "A Cabinet meeting table with ministers seen from behind, folders and a budget book.",
  "elections.after-an-election.5":
    "The opposition benches in a green chamber, a member rising to question the government.",
  "elections.after-an-election.6":
    "A green chamber with three blocks of seats in blue, red and orange.",
  "elections.levels-of-government.1":
    "A town council meeting with a mayor at the head of a table, a small town outside the window.",
  "elections.levels-of-government.2":
    "A snowplough, a garbage truck, a fire truck and a city bus on a town street.",
  "elections.levels-of-government.3": "A soldier, a passport, a globe and a courthouse together.",
  "elections.levels-of-government.4": "A schoolhouse, a hospital, a forest and a highway together.",
  "elections.levels-of-government.5":
    "Two overlapping circles; in the overlap a farm field, a suitcase and a tree.",
  "elections.levels-of-government.6":
    "A First Nations band council meeting in a community hall, new houses and a school outside.",
  "elections.ridings-and-mps.1":
    "A neat grid of square tiles like a quilt, no map or country outline, each tile holding one small standing figure.",
  "elections.ridings-and-mps.2":
    "Members walking into the House of Commons chamber with green benches.",
  "elections.ridings-and-mps.3":
    "A calendar page for October with a single Monday circled in red, autumn maple leaves falling.",
  "elections.ridings-and-mps.4":
    "A Prime Minister seen from behind walking to the Governor General's residence, an autumn day.",
  "elections.ridings-and-mps.5":
    "A candidate's campaign sign without letters on a lawn, a candidate knocking on a door.",
  "elections.ridings-and-mps.6":
    "Three stacks of ballots of different heights, the tallest one crowned with a seat icon.",
  "elections.secret-ballot.1": "A voter behind a cardboard voting screen, seen from behind.",
  "elections.secret-ballot.2":
    "A voter walking away from a polling station with a finger to lips, an employer and family members curious.",
  "elections.secret-ballot.3":
    "A calendar with an early date marked and an envelope ballot, a phone beside it.",
  "elections.secret-ballot.4": "A folded paper ballot going into a ballot box.",
  "elections.secret-ballot.5": "A hand folding a paper ballot behind a voting screen.",
  "elections.secret-ballot.6":
    "Election officials counting ballots under bright lights after closing, ballots in neat piles.",
  "elections.secret-ballot.7":
    "Three ballot boxes of different shapes, each behind its own voting screen.",
  "elections.who-can-vote.1": "Three checkmarks: a passport, a birthday cake, and a list.",
  "elections.who-can-vote.2":
    "A neutral agency office building with filing cabinets of voters' names.",
  "elections.who-can-vote.3": "A voter information card arriving in the mail on a doormat.",
  "elections.who-can-vote.4":
    "A voter at a registration table at the polling station, showing an ID card to an official.",
  "elections.who-can-vote.5":
    "A school gymnasium polling station with voting screens and a line of people.",
  "elections.your-government.1":
    "A crown above a residence, and a desk with a pen beside it, two roles at the federal level.",
  "elections.your-government.2":
    "A smaller crown above a provincial building, and a premier's desk beside it.",
  "elections.your-government.3":
    "An Arctic town hall with a commissioner's flag and a premier's desk.",
  "elections.your-government.4":
    "A small-town mayor in a chain of office standing on town hall steps.",
  "government.crown-and-orders.1":
    "A crown placed above a charter scroll like a guardian, a soft light.",
  "government.crown-and-orders.2": "A crown at the centre of a circle of many small flags.",
  "government.crown-and-orders.3":
    "A grand residence with a flag, an official in formal dress seen from behind on the steps.",
  "government.federalism.1":
    "A large parchment drawn in two halves, a line splitting it, sealed in 1867.",
  "government.federalism.2": "A soldier, a coin, a globe and a passport arranged together.",
  "government.federalism.3":
    "A schoolhouse, a hospital, a forest, a highway and a town hall together on a provincial landscape.",
  "government.federalism.4":
    "A farm field and an airport arrival hall split by a dotted line shared between two flags.",
  "government.federalism.5":
    "Ten different small labs or workshops, each trying a different shape of the same idea.",
  "government.federalism.6":
    "A provincial legislature with a dome, and three Arctic town halls under northern lights.",
  "government.making-laws.1":
    "A bill on paper passing from a green chamber across a hallway into a red chamber.",
  "government.making-laws.2":
    "A bill being printed, debated by a chamber, and studied at a committee table.",
  "government.making-laws.3":
    "A committee table with amendments being marked on a bill, then a chamber standing to vote.",
  "government.making-laws.4":
    "A Governor General's hand signing a bill with a quill, a crown nearby.",
  "government.parliament-and-legislation.1":
    "A parliament chamber with green benches, members debating, a stack of bills and a ledger.",
  "government.parliament-and-legislation.2":
    "A cabinet table with empty chairs and a fallen gavel, ballots scattered.",
  "government.parliament-and-legislation.3":
    "Three parts: a crown, a green chamber, and a red chamber, joined as one.",
  "government.parliament-and-legislation.5":
    "Three ballot boxes of decreasing size: country, province, town.",
  "government.provinces-and-territories.1":
    "A provincial legislature building with a royal coat of arms above the entrance, a crowd of elected members.",
  "government.provinces-and-territories.2":
    "Three pillars holding up a roof: one with a desk, one with a chamber, one with a gavel.",
  "government.provinces-and-territories.3":
    "A provincial legislature chamber, the premier rising to speak, seen from the gallery.",
  "government.three-key-facts.1":
    "Three icons side by side: several interlocking plain puzzle pieces (no country outline), a ballot box, and a crown.",
  "government.three-key-facts.2": "Four nested houses of decreasing size, the biggest with a flag.",
  "government.three-key-facts.3":
    "Voters dropping ballots into a box, and a parliament building with members walking in.",
  "government.three-key-facts.4": "A crown resting on a bound book of laws.",
  "government.three-key-facts.5":
    "A crown on the left, a desk with papers and a pen on the right, two separate roles.",
  "history.confederation.1":
    "Men in 1860s coats around a long conference table seen from behind, maps and papers spread out.",
  "history.confederation.2":
    "One large house roof covering several smaller houses, each smaller house with a schoolhouse and a hospital icon.",
  "history.confederation.3":
    "A broad landscape from Pacific waves through mountains and prairie to Atlantic waves, one continuous band.",
  "history.dominion-expands.1":
    "A long table where new chairs are being added one by one, each chair carved with a regional emblem: a wheat sheaf, a mountain, a fishing boat, an inuksuk.",
  "history.dominion-expands.2":
    "Four houses of different regional styles joined under one long roof, 1867.",
  "history.dominion-expands.3":
    "Two 1860s statesmen seen from behind shaking hands, one top hat, a railway and a river city in the distance.",
  "history.first-peoples.1":
    "Indigenous villages across every landscape of Canada, from coast to plains to forest to Arctic, seen as a panorama.",
  "history.first-peoples.2":
    "Left: a bison herd on the plains. Right: salmon drying on racks over smoke on the West Coast.",
  "history.first-peoples.3":
    "A European ship and Indigenous canoes trading on a river, a long shared shoreline, sombre sky.",
  "history.first-peoples.4":
    "Sod-roofed Viking houses on a Newfoundland shore, and a small 15th-century ship offshore.",
  "history.first-peoples.5":
    "A small Iroquoian village of longhouses by the St. Lawrence, a French ship anchored, a wooden cross on the shore.",
  "history.great-war.1":
    "Volunteer soldiers on the South African veldt, 1900, slouch hats, a small flag.",
  "history.great-war.2":
    "A long column of soldiers marching to a troopship from a town, crowds waving, 1914.",
  "history.great-war.3": "A tall white twin-pillar war memorial on a ridge.",
  "history.great-war.4":
    "A barbed wire fence around wooden labour camp huts in a mountain forest, 1915.",
  "history.great-war.5": "Women in 1910s dress lining up at a ballot box.",
  "history.great-war.6": "A field of red poppies and a clock face at eleven.",
  "history.interwar-wwii.1":
    "A circle of figures holding hands around a crown, each figure wearing a plain single-colour robe, no national flags or emblems.",
  "history.interwar-wwii.2": "A dry prairie farm with a dust storm, an empty bread line.",
  "history.interwar-wwii.3":
    "A solid stone bank building with columns, coins and bills stacked neatly, 1934.",
  "history.interwar-wwii.4":
    "A long line of soldiers, sailors and airmen in Second World War uniforms, seen from behind, heading to ships.",
  "history.interwar-wwii.5": "A convoy of cargo ships escorted by a destroyer on a grey Atlantic.",
  "history.interwar-wwii.6": "Landing craft approaching a beach at dawn, 1944.",
  "history.interwar-wwii.7":
    "A family with suitcases standing beside an empty house and a sold sign without letters, mountains of a remote camp beyond, 1942.",
  "history.new-france.1": "A small wooden fort settlement on a forested bay, 1604, French flag.",
  "history.new-france.2":
    "The Great Peace of Montreal, 1701: Eastern Woodlands Haudenosaunee, Huron-Wendat and Algonquin delegates in wool blankets, leggings and simple feathered caps, no Plains war bonnets, exchanging wampum belts with French officials by a river.",
  "history.new-france.3": "A stack of beaver pelts on a dock with a sailing ship bound for Europe.",
  "history.new-france.4":
    "Voyageurs paddling a large birchbark canoe loaded with bundles on a northern river.",
  "history.new-france.5":
    "Soldiers climbing cliffs above a river at dawn toward a plain, 1759, a fortress city beyond.",
  "history.province-of-quebec.1":
    "A habitant farmhouse with a steep roof and a long narrow field running to the river, a British flag over a distant fort.",
  "history.province-of-quebec.2":
    "A church steeple and a courthouse side by side in an old town, a French law book and a British law book on a table.",
  "history.province-of-quebec.3":
    "Loyalist families arriving by boat with trunks at a rugged Nova Scotia shore, 1780s.",
  "history.province-of-quebec.4":
    "One territory split into two halves along a river, an upper half and a lower half, each with a small assembly building.",
  "history.rebellions.1":
    "Rebels with muskets retreating across a snowy field toward a farmhouse, 1837.",
  "history.rebellions.2":
    "A cabinet table whose legs stand on a crowd of voters; take the crowd away and the table falls.",
  "history.rebellions.3":
    "A French-Canadian village church and farm standing firm while a British dispatch blows away in the wind.",
  "history.rebellions.4":
    "A colonial assembly building in Halifax with a lit lantern in its window, 1848.",
  "history.rebellions.5":
    "A government chair standing on a ballot box; a vote of no confidence tips the box and the chair slides off.",
  "history.slavery-and-war-of-1812.1":
    "A lantern in a window at night guiding travellers toward a northern road.",
  "history.slavery-and-war-of-1812.2":
    "A busy 1830s river port: fur bales, fish barrels and timber rafts on the water.",
  "history.slavery-and-war-of-1812.3":
    "A redcoat soldier and a militiaman defending a fort on a cliff over a river, 1812.",
  "history.slavery-and-war-of-1812.4":
    "A small colonial parliament building on fire at night, 1813.",
  "history.slavery-and-war-of-1812.5":
    "Canal locks with a small steamboat, a young town on the bluff above.",
  "history.the-west.1":
    "M\u00e9tis families with Red River carts on the prairie, surveyors with chains arriving from the east.",
  "history.the-west.2":
    "A prairie scene with a M\u00e9tis sash and a lone figure silhouetted on a horizon, 1870.",
  "history.the-west.3": "A mounted police rider in a red tunic crossing the prairie, 1870s.",
  "history.the-west.4":
    "A sledgehammer driving an iron spike into a railway tie, mountains beyond.",
  "history.the-west.5":
    "Settlers stepping off a train onto an empty prairie, wheat sheaves, sod houses.",
  "justice.courts.1": "A stately courthouse with a steep green copper roof on a river bluff.",
  "justice.courts.2": "A modern courtroom with a federal flag behind the bench.",
  "justice.courts.3":
    "Two levels of courts, a trial court below and an appeal court above, a staircase between.",
  "justice.courts.4":
    "A small claims courtroom with a modest table and a judge hearing two people.",
  "justice.courts.5": "A grey stone prison wall with a high window under a dark sky.",
  "justice.police-and-legal-help.1":
    "A police officer helping a lost child find their parents on a city street.",
  "justice.police-and-legal-help.2":
    "A provincial police cruiser and a city police cruiser side by side.",
  "justice.police-and-legal-help.3":
    "A mounted officer in red serge and an officer in modern patrol uniform, prairie behind.",
  "justice.police-and-legal-help.4":
    "A citizen at a police front desk filling in a form, an officer listening.",
  "justice.police-and-legal-help.5": "A lawyer and a client at a community legal clinic table.",
  "justice.rule-of-law.1":
    "A defendant in a courtroom with an empty scale in the balance, a judge seen from behind.",
  "justice.rule-of-law.2":
    "A judge's bench with a rulebook, a defendant's lawyer standing and the judge listening.",
  "justice.rule-of-law.3": "Four pillars holding up a courthouse roof.",
  "justice.rule-of-law.4":
    "A large printed statute book on a lectern, a crowd of everyone from a king to a farmer reading it.",
  "justice.rule-of-law.5": "Lady Justice, blindfolded, holding scales, as a statue.",
  "modern-canada.arts-and-inventions.1":
    "A film camera, a book and a guitar on a theatre stage under a spotlight.",
  "modern-canada.arts-and-inventions.2":
    "A windswept pine on a rocky lakeshore, in the spirit of early 20th-century Canadian landscape painting.",
  "modern-canada.arts-and-inventions.3":
    "A peach basket nailed to a gym balcony with an old leather ball, and a hockey stick and puck.",
  "modern-canada.arts-and-inventions.4":
    "A lone runner seen from behind on an empty highway, one prosthetic leg, a van following.",
  "modern-canada.arts-and-inventions.5":
    "A small glass vial of clear liquid and a vintage glass syringe on a 1920s laboratory bench.",
  "modern-canada.arts-and-inventions.6": "An early snowmobile on snow.",
  "modern-canada.changing-society.1":
    "A woman in a 1970s office with a briefcase, a university building behind.",
  "modern-canada.changing-society.2":
    "A Japanese-Canadian grandmother placing a ballot into a box, 1948.",
  "modern-canada.changing-society.3":
    "An Indigenous elder in a parka placing a ballot into a box, 1960.",
  "modern-canada.changing-society.4":
    "Two historical arrivals side by side: Hungarian refugees in 1956 winter coats stepping off a train in snow, and Vietnamese boat people in the late 1970s stepping off a small boat, welcomed by Canadians.",
  "modern-canada.changing-society.5":
    "A busy 1960s city street with shops and people of many backgrounds.",
  "modern-canada.international-engagement.1":
    "A young sailing ship sailing out on its own beside two other ships, the old mother ship behind.",
  "modern-canada.international-engagement.2":
    "A heavy curtain of iron dropping across a map of Europe.",
  "modern-canada.international-engagement.3":
    "Fighter jets and radar domes in the Arctic, ships of allied fleets in the North Atlantic.",
  "modern-canada.international-engagement.4":
    "Soldiers in winter gear on Korean hills, 1951, a UN blue flag.",
  "modern-canada.international-engagement.5":
    "A peacekeeper in a blue beret beside a white UN vehicle in a dusty town.",
  "modern-canada.quebec.1":
    "Montreal in the 1960s: a new modern skyscraper rising beside an old church.",
  "modern-canada.quebec.2":
    "A long commission table with two equal stacks of papers, one red and one blue.",
  "modern-canada.quebec.3":
    "A federal office counter with a two-sided sign of two colours and service offered on both sides.",
  "modern-canada.quebec.4":
    "Many flags around a round table in a hall, a French-speaking world on a globe.",
  "modern-canada.quebec.5":
    "Ballot boxes in a school gym in Quebec, two stacks of ballots nearly equal in height.",
  "modern-canada.trade-and-growth.1":
    "A trade barrier gate being lifted at a harbour, cargo ships flowing through.",
  "modern-canada.trade-and-growth.2":
    "A long freight train crossing a bridge from Canada into the United States, loaded with goods.",
  "modern-canada.trade-and-growth.3": "An oil derrick gushing on a frozen Alberta field, 1947.",
  "modern-canada.trade-and-growth.4":
    "A modest 1950s home with a full table, a winter coat hanging and a warm chimney.",
  "modern-canada.trade-and-growth.5":
    "A schoolhouse and a hospital on a prosperous town street, 1960s.",
  "regions.alberta.2":
    "A mountain lake and peaks, with a badlands ridge and a dinosaur skeleton in the foreground.",
  "regions.alberta.3": "Oil pumpjacks and cattle on rolling foothills.",
  "regions.central-canada.3": "A huge hydro-electric dam spilling water in the northern forest.",
  "regions.central-canada.4":
    "Montreal's old port and a cathedral, a mountain with a cross above the city.",
  "regions.northern-territories.2":
    "The midnight sun hanging low over treeless Arctic tundra, a pocket watch showing midnight resting on a rock in the foreground.",
  "regions.northern-territories.4": "A massive ice-covered mountain massif.",
  "regions.northwest-nunavut-and-rangers.3": "Rangers on snowmobiles crossing Arctic ice.",
  "regions.overview.1":
    "A coast-to-coast panorama in one band: Pacific waves, mountains, prairie, forest, Atlantic waves, with Arctic sea ice along the top edge.",
  "regions.overview.2":
    "Five landscapes side by side: an Atlantic lighthouse, a river city, prairie wheat, west coast mountains, Arctic tundra with an inuksuk.",
  "regions.overview.5": "A city at dusk with lit towers, a small farm in the distance.",
  "regions.west-coast.2": "A busy port with container cranes and ships, mountains behind.",
  "regions.west-coast.3": "Orchard rows and vineyards in a dry valley above a long lake.",
  "regions.west-coast.4":
    "A coastal rainforest in a provincial park, giant cedars, a city skyline across water.",
  "rights-and-responsibilities.charter-rights.1":
    "A traveller with a suitcase and a small passport walking along a road that crosses from mountains to prairie to sea.",
  "rights-and-responsibilities.charter-rights.2":
    "A large protective arch over a treaty scroll and a feather, a smaller charter scroll beside it that does not touch them.",
  "rights-and-responsibilities.charter-rights.3":
    "A perfectly balanced scale with two equal speech bubbles on each pan, one red and one black, no letters.",
  "rights-and-responsibilities.charter-rights.4":
    "A large patchwork quilt of many patterns spread on a table, a maple leaf pattern stitched in the centre.",
  "rights-and-responsibilities.equality-and-defending.1":
    "A balance scale with a woman figure and a man figure on the pans, perfectly level.",
  "rights-and-responsibilities.equality-and-defending.2":
    "A navy ship, an army jeep, an air force plane and a coast guard boat, each small, as one composition.",
  "rights-and-responsibilities.equality-and-defending.3":
    "A fire truck, a police car and a coast guard boat lined up together at a harbour town.",
  "rights-and-responsibilities.ordered-liberty.1":
    "A medieval parchment charter with a hanging wax seal on a table, 1215.",
  "rights-and-responsibilities.ordered-liberty.2":
    "Four simple icons in a row: a hand over the heart, an open mouth with sound waves, a peaceful crowd, and linked hands.",
  "rights-and-responsibilities.ordered-liberty.3":
    "A prison cell door swinging open with a sealed legal writ hanging from the bars.",
  "rights-and-responsibilities.ordered-liberty.4":
    "A rolled charter scroll with a red ribbon being set into a stone cornerstone of a building.",
  "rights-and-responsibilities.responsibilities.1":
    "A tall columned courthouse with a crowd of figures of all sizes, a crowned figure and a figure in a suit all standing at the same level beneath it.",
  "rights-and-responsibilities.responsibilities.2":
    "A parent carrying groceries home with a child, a lunch box and work tools by the door.",
  "rights-and-responsibilities.responsibilities.3":
    "An empty wooden jury box in a courtroom, twelve chairs.",
  "rights-and-responsibilities.responsibilities.4":
    "Volunteers planting trees and cleaning a riverbank, a polling station sign-free building in the background.",
  "symbols.anthems.1":
    "A crowd in a 1980 stadium singing with hands on hearts, a large Canadian flag.",
  "symbols.anthems.2": "A crowd outdoors in a 19th-century stone city on a cliff, singing, 1880.",
  "symbols.anthems.3":
    "Two choirs side by side singing from different sheets of music, one sheet red, one black.",
  "symbols.anthems.4": "A military band playing in front of a crowned royal standard.",
  "symbols.arms-motto-and-parliament.1":
    "Canadian soldiers returning home by troopship in 1919, crowds waving, a red ensign flag, no coat of arms or shield.",
  "symbols.arms-motto-and-parliament.2":
    "A heraldic shield divided into quarters with simple lions, harp and fleur-de-lys, three red maple leaves at the base.",
  "symbols.arms-motto-and-parliament.3":
    "A Gothic Revival parliament building with pointed arches and stone carvings, the tall tower.",
  "symbols.arms-motto-and-parliament.4":
    "A round Gothic Revival library with a tall clock tower beside it.",
  "symbols.arms-motto-and-parliament.5":
    "Five different legislature buildings filling the frame side by side, one with a tall French mansard roof in the centre, the others domed, columned or round-arched.",
  "symbols.crown-and-flags.1": "A crown resting on a cushion.",
  "symbols.crown-and-flags.2": "A crown beside a stone parliament building, 1867.",
  "symbols.crown-and-flags.3": "The red-white-red Canadian flag waving.",
  "symbols.crown-and-flags.4": "An old red naval-style ensign flag on a ship's stern.",
  "symbols.holidays-january-to-june.1":
    "New Year's fireworks over snowy rooftops, a calendar page for January.",
  "symbols.holidays-january-to-june.2":
    "Easter lilies and a sunrise over a ridge with a white memorial, spring.",
  "symbols.holidays-january-to-june.3":
    "A summer parade with fleur-de-lys flags and fireworks, a royal crown banner in the background.",
  "symbols.holidays-july-to-december.1":
    "Three seasons in a row: fireworks with a flag, a worker's tools, and a harvest turkey with pumpkins.",
  "symbols.holidays-july-to-december.2":
    "A wreath with poppies at a war memorial in November, then a Christmas tree in a snowy window.",
  "symbols.holidays-july-to-december.3": "A single red poppy pinned to a dark coat lapel.",
  "symbols.maple-leaf-and-fleur-de-lys.1": "A single red maple leaf on a branch, autumn light.",
  "symbols.maple-leaf-and-fleur-de-lys.2":
    "Rows of white military headstones in a cemetery, each carved with a maple leaf.",
  "symbols.maple-leaf-and-fleur-de-lys.3": "A single gold fleur-de-lys on a blue banner.",
  "symbols.maple-leaf-and-fleur-de-lys.4":
    "A blue flag with a white cross and four white fleurs-de-lys waving over an old city.",
  "symbols.official-languages.1":
    "Two speech bubbles side by side, one red, one black, joined by a maple leaf.",
  "symbols.official-languages.2":
    "A row of adult silhouettes from young to grey-haired; the younger ones with speech bubbles, the oldest without.",
  "symbols.official-languages.3":
    "A federal building with two identical doors side by side, one red and one black.",
  "symbols.order-of-canada.1":
    "Three items: a star-shaped insignia, a medal on a ribbon and a decoration badge.",
  "symbols.order-of-canada.2":
    "A snowflake-shaped insignia with a maple leaf on a white and red ribbon, 1967.",
  "symbols.order-of-canada.3":
    "A citizen writing a nomination letter at a kitchen table, a community volunteer in the window.",
  "symbols.order-of-canada.4": "A plain bronze cross medal on a crimson ribbon.",
  "symbols.sports-and-beaver.1": "Children playing hockey on a frozen pond, pine trees and snow.",
  "symbols.sports-and-beaver.2": "A tall silver championship cup on a pedestal.",
  "symbols.sports-and-beaver.3":
    "Two modern lacrosse players in helmets and team jerseys, netted sticks raised, on a summer field.",
  "symbols.sports-and-beaver.4":
    "A beaver building a dam in a northern pond, filling the frame, with a large coin-like circle of light behind it.",
  "symbols.victoria-cross.1": "A cavalry charge in the Crimean War, 1854, seen from far away.",
  "symbols.victoria-cross.2":
    "A Black Nova Scotian sailor in a 19th-century Royal Navy uniform loading a naval gun beside a fortress wall during the Siege of Lucknow, 1857.",
  "symbols.victoria-cross.3": "A First World War biplane in the sky.",
  "symbols.victoria-cross.4":
    "Left: soldiers in an Italian farm under fire, 1943. Right: a naval fighter plane diving on a ship, 1945.",
  "who-we-are.diversity.1":
    "A crowd of generations, from settlers with trunks to modern families, walking together across a bridge toward a city.",
  "who-we-are.diversity.2":
    "A jet airliner arriving over a Canadian city, a dotted flight path curving from Asia on a simple globe.",
  "who-we-are.diversity.3": "Many threads of different colours woven into a single strong rope.",
  "who-we-are.diversity.4": "A small white wooden church steeple among snowy pines in a village.",
  "who-we-are.diversity.5":
    "Volunteers from a church welcoming a refugee family with suitcases at an airport arrivals gate, seen from behind.",
  "who-we-are.diversity.6":
    "Two pairs of hands with wedding rings, one pair of two men, one pair of two women, on a table with flowers.",
  "who-we-are.diversity.7":
    "Black Loyalist families, African-descended men, women and children, stepping off a sailing ship onto a rocky Nova Scotia shore with bundles, 1780s.",
  "who-we-are.english-and-french.1":
    "Three paths converging on a single point: a canoe, a French sailing ship and a British sailing ship.",
  "who-we-are.english-and-french.2":
    "A calm village green with a parliament building, a farmer and a constable, peaceful orderly scene, 1867.",
  "who-we-are.english-and-french.3":
    "Acadian farmhouses by the sea and sailing ships taking people away: the Great Upheaval.",
  "who-we-are.english-and-french.4":
    "The skyline of an old walled city on a cliff above a wide river, a blue flag with white cross waving.",
  "who-we-are.english-and-french.5":
    "Four sailing ships flying the English, Welsh, Scottish and Irish colours arriving at a forested shore.",
  "who-we-are.english-and-french.6":
    "A diverse group of people seen from behind walking together up the steps of a parliament building.",
  "who-we-are.indigenous-peoples.1":
    "Ancient travellers crossing a land bridge from Asia toward North America, seen from far away.",
  "who-we-are.indigenous-peoples.2":
    "A royal parchment with a seal unrolled over a map of forest and rivers, and two hands about to shake above it.",
  "who-we-are.indigenous-peoples.3":
    "An empty schoolroom with small wooden desks, a single child's moccasin on the floor, sombre light.",
  "who-we-are.indigenous-peoples.4":
    "A longhouse and a totem pole and a birchbark canoe as one composition, symbolising First Nations across the land.",
  "who-we-are.indigenous-peoples.5":
    "Left: an inuksuk on Arctic tundra. Right: a M\u00e9tis sash with arrow pattern and a Red River cart on the prairie.",
  "who-we-are.indigenous-peoples.6":
    "Twenty identical standing figure icons in one row: the first thirteen red, the next six black, the last one light grey.",
  "who-we-are.official-languages.1":
    "A government service counter with two identical windows side by side, one red, one black, people queuing at both.",
  "who-we-are.official-languages.2":
    "A large red cluster of figures beside a smaller black cluster, a few black figures scattered away from it.",
  "who-we-are.official-languages.4":
    "A family dinner table in a Vancouver apartment with chopsticks and dumplings, city lights outside.",
};

export const biteVisuals: Record<string, BiteVisual> = {
  ...Object.fromEntries(Object.entries(images).map(([bite, image]) => [bite, { image }])),
  ...maps,
};
