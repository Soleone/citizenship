/**
 * Physical presence and the rest of the eligibility arithmetic.
 *
 * This is the part of the application that a study app can actually compute, and
 * the part where being wrong costs someone their application fee and months. So
 * the rules are written down as code with the IRCC sentence next to each one,
 * every date is handled as a whole day in UTC so daylight saving cannot move a
 * boundary, and `scripts/check-eligibility.mts` tests the arithmetic against
 * those sentences.
 *
 * It is an estimate. IRCC's own calculator is the authority, and IRCC tells
 * people to apply with more than the minimum in case the calculation goes
 * differently. Both of those belong in the interface, not here.
 */

const DAY_MS = 86_400_000;

/** Days physically in Canada required in the eligibility period. */
export const REQUIRED_DAYS = 1095;
/** Days of that period which must be spent as a permanent resident. */
export const REQUIRED_PR_DAYS = 730;
/** Length of the eligibility period. */
const PERIOD_YEARS = 5;
/** Each day as a temporary resident or protected person counts as half. */
const TEMPORARY_CREDIT_RATIO = 0.5;
/** ...and no more than this much of the total may come from that credit. */
export const MAX_TEMPORARY_CREDIT_DAYS = 365;
/** Years of Canadian income tax filing needed inside the period. */
export const REQUIRED_TAX_YEARS = 3;

export type Trip = {
  id: string;
  /** First day outside Canada, ISO date. */
  from: string;
  /** Day of return, ISO date. That day counts as outside; being back the next day counts as present. */
  to: string;
};

export type PresenceFacts = {
  /** The day the application is signed. The period is the five years before it. */
  signDate: string;
  /** The day permanent resident status began. */
  prDate: string;
  /** Earliest day in Canada as a visitor, student, worker or protected person. Optional. */
  firstStatusDate: string;
  /** Trips outside Canada. Overlapping or out-of-period trips are clipped, not rejected. */
  trips: Trip[];
  /** Calendar years in which Canadian income tax was filed. */
  taxYearsFiled: number[];
  /** Days inside the period that cannot be counted at all. */
  uncountedDays: number;
};

export const emptyPresenceFacts = (): PresenceFacts => ({
  signDate: "",
  prDate: "",
  firstStatusDate: "",
  trips: [],
  taxYearsFiled: [],
  uncountedDays: 0,
});

function dayNumber(iso: string): number {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return NaN;
  return Math.round(Date.UTC(year, month - 1, day) / DAY_MS);
}

function isoFromDayNumber(day: number): string {
  return new Date(day * DAY_MS).toISOString().slice(0, 10);
}

function addYears(iso: string, years: number): number {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return NaN;
  return Date.UTC(year + years, month - 1, day) / DAY_MS;
}

/** Whole days in [start, end). */
function spanDays(start: number, end: number) {
  return { start, end, length: Math.max(0, end - start) };
}

function intersect(a: { start: number; end: number }, b: { start: number; end: number }) {
  const start = Math.max(a.start, b.start);
  const end = Math.min(a.end, b.end);
  return Math.max(0, end - start);
}

export type PresenceReport = {
  valid: boolean;
  /** Why the inputs are not usable yet. */
  missing: string[];
  periodStart: string;
  periodEnd: string;
  /** Calendar days in the period. */
  periodDays: number;
  daysOutside: number;
  /** Days in the period spent as a permanent resident. */
  prDays: number;
  /** Days in the period spent as a temporary resident or protected person. */
  temporaryDays: number;
  /** Days in the period before any status at all, or excluded by the rules. */
  uncountableDays: number;
  /** Permanent resident days plus the capped half-day credit. */
  creditedDays: number;
  /** How much of the total came from temporary status, after the cap. */
  temporaryCredit: number;
  shortBy: number;
  meetsTotal: boolean;
  meetsPrFloor: boolean;
  /** Free days above the 1,095 requirement. Negative means short. */
  buffer: number;
  taxYearsInPeriod: number[];
  taxYearsMissing: number;
  meetsTaxRule: boolean;
  /** Everything that is true, in the order a person should read it. */
  notes: string[];
};

/**
 * Count the days.
 *
 * "You must have been physically in Canada for at least 1,095 days (3 years)
 * during your 5-year eligibility period." The period "is 5 years before the date
 * you sign your application" and "must include at least 730 days as a permanent
 * resident". "Each day as a temporary resident or protected person during your
 * eligibility period counts as 0.5 days", with "a maximum of 365 days of
 * physical presence" from that source.
 */
export function assessPresence(facts: PresenceFacts): PresenceReport {
  const missing: string[] = [];
  if (!facts.signDate) missing.push("the date you signed or plan to sign");
  if (!facts.prDate) missing.push("the day you became a permanent resident");
  const signDay = dayNumber(facts.signDate);
  const prDay = dayNumber(facts.prDate);
  if (facts.signDate && Number.isNaN(signDay)) missing.push("a readable signing date");
  if (facts.prDate && Number.isNaN(prDay)) missing.push("a readable permanent resident date");
  if (!missing.length && prDay > signDay)
    missing.push("a signing date on or after the permanent resident date");

  if (missing.length) {
    return {
      valid: false,
      missing,
      periodStart: facts.signDate || "",
      periodEnd: facts.signDate || "",
      periodDays: 0,
      daysOutside: 0,
      prDays: 0,
      temporaryDays: 0,
      uncountableDays: 0,
      creditedDays: 0,
      temporaryCredit: 0,
      shortBy: REQUIRED_DAYS,
      meetsTotal: false,
      meetsPrFloor: false,
      buffer: -REQUIRED_DAYS,
      taxYearsInPeriod: [],
      taxYearsMissing: REQUIRED_TAX_YEARS,
      meetsTaxRule: false,
      notes: [],
    };
  }

  const period = spanDays(addYears(facts.signDate, -PERIOD_YEARS), signDay);
  const trips = facts.trips
    .map((trip) => ({ id: trip.id, start: dayNumber(trip.from), end: dayNumber(trip.to) + 1 }))
    .filter(
      (trip) => !Number.isNaN(trip.start) && !Number.isNaN(trip.end) && trip.end > trip.start,
    );

  const prSpan = spanDays(Math.max(prDay, period.start), period.end);
  // Without a first day of status, pre-residence time cannot be credited. The
  // estimate has to fail low: an invented 365 days here is an application
  // submitted too early.
  const statusStart = facts.firstStatusDate
    ? Math.max(dayNumber(facts.firstStatusDate), period.start)
    : period.end;
  const temporarySpan = spanDays(statusStart, Math.min(Math.max(prDay, statusStart), period.end));

  const outsideIn = (span: { start: number; end: number }) =>
    trips.reduce((sum, trip) => sum + intersect(span, trip), 0);

  const prDays = Math.max(0, prSpan.length - outsideIn(prSpan));
  const temporaryDays = Math.max(0, temporarySpan.length - outsideIn(temporarySpan));
  const daysOutside = trips.reduce((sum, trip) => sum + intersect(period, trip), 0);
  const temporaryCredit = Math.min(
    MAX_TEMPORARY_CREDIT_DAYS,
    Math.floor(temporaryDays * TEMPORARY_CREDIT_RATIO),
  );
  const uncounted = Math.max(0, Math.floor(facts.uncountedDays || 0));
  const creditedDays = Math.max(0, prDays + temporaryCredit - uncounted);
  // Calendar days inside the period that fall in neither status.
  const uncountableDays = Math.max(0, period.length - prSpan.length - temporarySpan.length);

  const signYear = Number(facts.signDate.slice(0, 4));
  // You file for a year after it ends, so the years that can be on the record
  // when you sign are the five calendar years before the signing year.
  const periodYears = Number.isNaN(signYear)
    ? []
    : Array.from({ length: PERIOD_YEARS }, (_, index) => signYear - PERIOD_YEARS + index);
  const taxYearsInPeriod = periodYears.filter((year) => facts.taxYearsFiled.includes(year));
  const taxYearsMissing = Math.max(0, REQUIRED_TAX_YEARS - taxYearsInPeriod.length);

  const notes: string[] = [];
  if (daysOutside > 0)
    notes.push(
      `${daysOutside} day${daysOutside === 1 ? "" : "s"} of the trips you entered fall inside the period.`,
    );
  if (
    temporaryCredit >= MAX_TEMPORARY_CREDIT_DAYS &&
    temporaryDays * TEMPORARY_CREDIT_RATIO > MAX_TEMPORARY_CREDIT_DAYS
  ) {
    notes.push(
      `You have more temporary or protected time than the cap allows: only ${MAX_TEMPORARY_CREDIT_DAYS} credited days can come from it.`,
    );
  }
  if (facts.uncountedDays > 0) {
    notes.push(
      "Days in prison, on parole or probation, and time waiting on a refugee claim cannot be counted.",
    );
  }
  if (!facts.firstStatusDate) {
    notes.push(
      "No first day of status given, so nothing before permanent residence is credited. Add the date you first arrived as a visitor, student, worker or protected person to see the half-day credit.",
    );
  }

  return {
    valid: missing.length === 0,
    missing,
    periodStart: isoFromDayNumber(period.start),
    periodEnd: isoFromDayNumber(period.end),
    periodDays: period.length,
    daysOutside,
    prDays,
    temporaryDays,
    uncountableDays,
    creditedDays,
    temporaryCredit,
    shortBy: Math.max(0, REQUIRED_DAYS - creditedDays),
    meetsTotal: creditedDays >= REQUIRED_DAYS,
    meetsPrFloor: prDays >= REQUIRED_PR_DAYS,
    buffer: creditedDays - REQUIRED_DAYS,
    taxYearsInPeriod,
    taxYearsMissing,
    meetsTaxRule: taxYearsMissing === 0,
    notes,
  };
}

/** The age on the day of signing decides the test and language-proof rules. */
function ageOn(signDate: string, birthDate: string): number | null {
  const birth = dayNumber(birthDate);
  const sign = dayNumber(signDate);
  if (Number.isNaN(birth) || Number.isNaN(sign) || sign < birth) return null;
  let age = Number(signDate.slice(0, 4)) - Number(birthDate.slice(0, 4));
  const hadBirthdayThisYear =
    Number(signDate.slice(5, 7)) * 100 + Number(signDate.slice(8, 10)) >=
    Number(birthDate.slice(5, 7)) * 100 + Number(birthDate.slice(8, 10));
  if (!hadBirthdayThisYear) age -= 1;
  return age;
}

export type AgeGate = {
  age: number | null;
  /** 18 to 54 on the day of signing: the test and the language requirement. */
  mustTakeTest: boolean;
  mustProveLanguage: boolean;
  /** 55 and over is exempt from both; the guide's own wording is "between 18 and 54". */
  exempt: boolean;
};

export function ageGates(signDate: string, birthDate: string): AgeGate {
  const age = ageOn(signDate, birthDate);
  if (age === null)
    return { age: null, mustTakeTest: false, mustProveLanguage: false, exempt: false };
  const inRange = age >= 18 && age <= 54;
  return { age, mustTakeTest: inRange, mustProveLanguage: inRange, exempt: age >= 55 };
}
