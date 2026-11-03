/**
 * Facts the 2012 guide cannot know: who holds the offices today, and the
 * provincial answers the guide expects you to look up yourself ("What is the
 * capital of the province or territory that you live in?", "Who is your member
 * of Parliament?"). These change, so they carry the date they were checked.
 */

export const officeholdersCheckedOn = "2026-11-02";

export const officeholders = [
  {
    role: "Head of State",
    name: "King Charles III",
    note: "King of Canada since September 2022. The guide still names Queen Elizabeth II.",
    source: "https://www.canada.ca/en/canadian-heritage/services/crown-canada.html",
  },
  {
    role: "Governor General",
    name: "Louise Arbour",
    note: "The King's representative in Canada, installed June 8, 2026 as the 31st Governor General.",
    source: "https://www.gg.ca/en",
  },
  {
    role: "Prime Minister",
    name: "Mark Carney",
    note: "Head of government since March 2025.",
    source: "https://www.pm.gc.ca/en",
  },
  {
    role: "Seats in the House of Commons",
    name: "343",
    note: "Since the 2025 election. The guide says 308; on the test, answer as the guide does.",
    source: "https://www.elections.ca",
  },
] as const;

/** Capitals as the guide's regions chapter gives them. */
export const provinces = [
  { name: "Alberta", capital: "Edmonton", kind: "province" },
  { name: "British Columbia", capital: "Victoria", kind: "province" },
  { name: "Manitoba", capital: "Winnipeg", kind: "province" },
  { name: "New Brunswick", capital: "Fredericton", kind: "province" },
  { name: "Newfoundland and Labrador", capital: "St. John's", kind: "province" },
  { name: "Nova Scotia", capital: "Halifax", kind: "province" },
  { name: "Ontario", capital: "Toronto", kind: "province" },
  { name: "Prince Edward Island", capital: "Charlottetown", kind: "province" },
  { name: "Quebec", capital: "Québec City", kind: "province" },
  { name: "Saskatchewan", capital: "Regina", kind: "province" },
  { name: "Northwest Territories", capital: "Yellowknife", kind: "territory" },
  { name: "Nunavut", capital: "Iqaluit", kind: "territory" },
  { name: "Yukon", capital: "Whitehorse", kind: "territory" },
] as const;

export const findYourMpUrl = "https://www.ourcommons.ca/members/en";
