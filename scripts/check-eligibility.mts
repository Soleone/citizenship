/**
 * Arithmetic check for the eligibility estimate.
 *
 *   npm run eligibility:check
 *
 * A presence calculation is a date problem dressed up as an immigration problem,
 * and date problems live in the edges: leap days, a trip that starts before the
 * period, the half-day cap, a birthday that has not happened yet. Each case here
 * is the sentence from data/corpus/irc-adult__who.txt it is testing.
 */

import {
  MAX_TEMPORARY_CREDIT_DAYS,
  REQUIRED_DAYS,
  REQUIRED_PR_DAYS,
  REQUIRED_TAX_YEARS,
  ageGates,
  assessPresence,
  emptyPresenceFacts,
} from "../src/eligibility.ts";

const failures: string[] = [];
function expect(label: string, condition: boolean, detail = "") {
  if (condition) console.log(`  ok  ${label}`);
  else failures.push(`${label}${detail ? ` (${detail})` : ""}`);
}

const facts = (over: Partial<ReturnType<typeof emptyPresenceFacts>> = {}) => ({
  ...emptyPresenceFacts(),
  ...over,
});

// --- nothing entered is not a zero -------------------------------------------
const blank = assessPresence(facts());
expect(
  "an empty record is not a result",
  blank.valid === false && blank.missing.length === 2,
  blank.missing.join("; "),
);
expect(
  "an empty record claims no days",
  blank.creditedDays === 0 && blank.shortBy === REQUIRED_DAYS,
);

// --- exactly three years as a permanent resident -----------------------------
// 2023-03-01 to 2026-03-01 is 1096 days, one of them a leap day.
const threeYears = assessPresence(facts({ signDate: "2026-03-01", prDate: "2023-03-01" }));
expect(
  "three years of permanent residence clears 1,095 days",
  threeYears.creditedDays >= REQUIRED_DAYS,
  `${threeYears.creditedDays} days`,
);
expect(
  "five years to the day, one leap day inside",
  threeYears.periodDays === 1826,
  `${threeYears.periodDays}`,
);
expect(
  "the permanent resident floor is met",
  threeYears.meetsPrFloor && threeYears.prDays === 1096,
);
expect(
  "the period starts five years before signing",
  threeYears.periodStart === "2021-03-01",
  threeYears.periodStart,
);

// --- trips come out of the count ---------------------------------------------
const withTrip = assessPresence(
  facts({
    signDate: "2026-03-01",
    prDate: "2023-03-01",
    trips: [{ id: "t1", from: "2024-06-01", to: "2024-06-20" }],
  }),
);
expect(
  "a 20-day trip removes 20 days",
  withTrip.daysOutside === 20 && withTrip.prDays === 1096 - 20,
  `${withTrip.prDays}`,
);
expect(
  "and the shortfall is reported",
  withTrip.shortBy === 19 && withTrip.buffer === -19,
  `short ${withTrip.shortBy}, buffer ${withTrip.buffer}`,
);

const beforePeriod = assessPresence(
  facts({
    signDate: "2026-03-01",
    prDate: "2023-03-01",
    trips: [{ id: "t1", from: "2019-01-01", to: "2019-06-01" }],
  }),
);
expect(
  "a trip entirely before the period changes nothing",
  beforePeriod.daysOutside === 0,
  `${beforePeriod.daysOutside}`,
);

const straddling = assessPresence(
  facts({
    signDate: "2026-03-01",
    prDate: "2023-03-01",
    trips: [{ id: "t1", from: "2020-12-25", to: "2021-03-31" }],
  }),
);
expect(
  "a trip that starts before the period is clipped to it",
  straddling.daysOutside === 31,
  `${straddling.daysOutside} (2021-03-01 through the 2021-03-31 return day)`,
);

// --- half-day credit and its cap ---------------------------------------------
// Four years as a worker, then permanent residence for the last year.
const longTemporary = assessPresence(
  facts({
    signDate: "2026-03-01",
    prDate: "2025-03-01",
    firstStatusDate: "2020-03-01",
  }),
);
expect(
  "temporary days are halved, not counted whole",
  longTemporary.temporaryCredit < longTemporary.temporaryDays / 2 + 2,
);
expect(
  `the credit never exceeds ${MAX_TEMPORARY_CREDIT_DAYS} days`,
  longTemporary.temporaryCredit === MAX_TEMPORARY_CREDIT_DAYS,
  `${longTemporary.temporaryCredit}`,
);
expect(
  "and the shortfall is shown instead of a pass",
  longTemporary.meetsTotal === false && longTemporary.creditedDays === 365 + 365,
  `${longTemporary.creditedDays} credited`,
);
expect(
  "the permanent resident floor also fails",
  longTemporary.meetsPrFloor === false,
  `${longTemporary.prDays} PR days`,
);

// Two years of temporary status is under the cap, so half of it counts.
// 2023-06-01 to 2024-03-01 is 275 days of status, well under the cap.
const shortTemporary = assessPresence(
  facts({ signDate: "2026-03-01", prDate: "2024-03-01", firstStatusDate: "2023-06-01" }),
);
expect(
  "the case is under the cap",
  shortTemporary.temporaryDays < 730,
  `${shortTemporary.temporaryDays}`,
);
expect(
  "under the cap, half the temporary days count",
  shortTemporary.temporaryCredit === Math.floor(shortTemporary.temporaryDays / 2),
  `${shortTemporary.temporaryDays} -> ${shortTemporary.temporaryCredit}`,
);

// --- time with no status at all is not creditable ----------------------------
const lateArrival = assessPresence(
  facts({ signDate: "2026-03-01", prDate: "2024-03-01", firstStatusDate: "2024-01-01" }),
);
// 2024-03-01 to 2026-03-01 is 730 days (the leap day fell before it), and
// Jan and Feb 2024 are 60 days of status. The rest of the five years is no status.
expect(
  "days before any status are not counted",
  lateArrival.prDays === 730 &&
    lateArrival.temporaryDays === 60 &&
    lateArrival.uncountableDays === 1036,
  `pr ${lateArrival.prDays}, temporary ${lateArrival.temporaryDays}, uncountable ${lateArrival.uncountableDays}`,
);

// --- excluded days ------------------------------------------------------------
const excluded = assessPresence(
  facts({ signDate: "2026-03-01", prDate: "2023-03-01", uncountedDays: 200 }),
);
expect(
  "excluded days come off the total",
  excluded.creditedDays === 1096 - 200,
  `${excluded.creditedDays}`,
);
const noArrival = assessPresence(facts({ signDate: "2026-03-01", prDate: "2025-03-01" }));
expect(
  "unknown arrival credits nothing, even though the gap is real",
  noArrival.temporaryCredit === 0 && noArrival.creditedDays === 365,
  `${noArrival.creditedDays} credited`,
);
expect(
  "and it says so",
  noArrival.notes.some((note) => /first day of status/.test(note)),
);
expect(
  "and the reason is surfaced",
  excluded.notes.some((note) => /parole/.test(note)),
);

// --- tax years ---------------------------------------------------------------
const taxes = assessPresence(
  facts({ signDate: "2026-03-01", prDate: "2023-03-01", taxYearsFiled: [2019, 2021, 2023, 2025] }),
);
expect(
  "only the recent filing years matter",
  taxes.taxYearsInPeriod.join(",") === "2021,2023,2025",
  taxes.taxYearsInPeriod.join(","),
);
expect(
  "three filed years inside the period is enough",
  taxes.meetsTaxRule && taxes.taxYearsMissing === 0,
);
const currentYear = assessPresence(
  facts({ signDate: "2026-03-01", prDate: "2023-03-01", taxYearsFiled: [2026] }),
);
expect(
  "the year you are signing in cannot be a filed year yet",
  currentYear.taxYearsInPeriod.length === 0 && currentYear.meetsTaxRule === false,
  currentYear.taxYearsInPeriod.join(","),
);
const thinTaxes = assessPresence(
  facts({ signDate: "2026-03-01", prDate: "2023-03-01", taxYearsFiled: [2019, 2020] }),
);
expect(
  "filing years outside the period do not help",
  thinTaxes.meetsTaxRule === false && thinTaxes.taxYearsMissing === REQUIRED_TAX_YEARS,
  `${thinTaxes.taxYearsMissing} missing`,
);

// --- ages --------------------------------------------------------------------
expect(
  "18 to 54 on the signing day takes the test",
  ageGates("2026-05-01", "1972-05-01").mustTakeTest === true,
);
expect(
  "the day before the 55th birthday still takes it",
  ageGates("2026-05-01", "1971-05-02").age === 54 &&
    ageGates("2026-05-01", "1971-05-02").mustTakeTest === true,
);
expect("55 on the signing day is exempt", ageGates("2026-05-01", "1971-05-01").exempt === true);
expect(
  "a birthday later in the year has not happened yet",
  ageGates("2026-03-01", "1980-12-01").age === 45,
  `${ageGates("2026-03-01", "1980-12-01").age}`,
);
expect("an unreadable date is not an age", ageGates("", "1980-12-01").age === null);

// --- the floor is a floor -----------------------------------------------------
expect(
  "the requirement is 1,095 days and 730 of them as a permanent resident",
  REQUIRED_DAYS === 1095 && REQUIRED_PR_DAYS === 730,
);

console.log("");
if (failures.length) {
  console.log(`eligibility failures (${failures.length})`);
  for (const failure of failures) console.log(`  x ${failure}`);
  process.exitCode = 1;
} else {
  console.log("eligibility checks passed");
}
