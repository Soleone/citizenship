import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { officialSources } from "@/curriculum";
import {
  REQUIRED_DAYS,
  REQUIRED_PR_DAYS,
  REQUIRED_TAX_YEARS,
  ageGates,
  assessPresence,
  type Trip,
} from "@/eligibility";
import { cn } from "@/lib/utils";
import type { LearnerApplication } from "@/state";

/** "Does You have the days?" is what interpolating a label into a sentence does. */
function daysTitle(name: string) {
  const trimmed = name.trim();
  if (/^you$/i.test(trimmed)) return "Do you have the days?";
  return `Does ${trimmed} have the days?`;
}

/**
 * The eligibility arithmetic, next to the inputs that feed it.
 *
 * It fails low: an unknown arrival date credits nothing, because an invented
 * 365 days here means an application filed too early. And it never pretends to
 * be the decision, which belongs to IRCC's own calculator.
 */
export function EligibilityPanel({
  learnerName,
  application,
  onChange,
}: {
  learnerName: string;
  application: LearnerApplication;
  onChange: (patch: Partial<LearnerApplication>) => void;
}) {
  const report = assessPresence({
    signDate: application.signDate,
    prDate: application.prDate,
    firstStatusDate: application.firstStatusDate,
    trips: application.trips,
    taxYearsFiled: application.taxYearsFiled,
    uncountedDays: application.uncountedDays,
  });
  const gates = ageGates(application.signDate, application.birthDate);
  // The five-year period ends on the signing day, so the years worth offering end there too.
  const signYear = Number(application.signDate.slice(0, 4));
  const taxOptions = signYear ? Array.from({ length: 6 }, (_, index) => signYear - 5 + index) : [];
  const ready = report.valid && report.meetsTotal && report.meetsPrFloor && report.meetsTaxRule;
  const idPrefix = learnerName.replace(/\W+/g, "-").toLowerCase();

  const patchTrip = (id: string, patch: Partial<Trip>) =>
    onChange({
      trips: application.trips.map((trip) => (trip.id === id ? { ...trip, ...patch } : trip)),
    });

  const toggleTaxYear = (year: number) =>
    onChange({
      taxYearsFiled: application.taxYearsFiled.includes(year)
        ? application.taxYearsFiled.filter((item) => item !== year)
        : [...application.taxYearsFiled, year].sort((a, b) => a - b),
    });

  const dateField = (
    key: "signDate" | "prDate" | "firstStatusDate" | "birthDate",
    label: string,
    hint?: string,
  ) => (
    <Field>
      <FieldLabel htmlFor={`${idPrefix}-${key}`}>{label}</FieldLabel>
      <Input
        id={`${idPrefix}-${key}`}
        type="date"
        value={application[key]}
        onChange={(event) => onChange({ [key]: event.target.value })}
      />
      {hint && <FieldDescription>{hint}</FieldDescription>}
    </Field>
  );

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">{daysTitle(learnerName)}</h2>
        <p className="text-sm text-muted-foreground">
          {REQUIRED_DAYS} days in Canada in the five years before you sign, {REQUIRED_PR_DAYS} of
          them as a permanent resident, and {REQUIRED_TAX_YEARS} tax years filed in that period.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {dateField("signDate", "Day you sign the application")}
        {dateField("prDate", "Became a permanent resident")}
        {dateField(
          "firstStatusDate",
          "First day in Canada with status",
          "Visitor, student or worker. Blank credits nothing before PR.",
        )}
        {dateField(
          "birthDate",
          "Date of birth",
          gates.age === null
            ? "18 to 54 on the signing day means the test applies."
            : gates.mustTakeTest
              ? `Age ${gates.age} then: the test applies.`
              : gates.exempt
                ? `Age ${gates.age} then: no test needed.`
                : `Age ${gates.age} then: a different route applies.`,
        )}
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-uncounted`}>Days that cannot count</FieldLabel>
          <Input
            id={`${idPrefix}-uncounted`}
            type="number"
            min={0}
            value={String(application.uncountedDays || "")}
            onChange={(event) => onChange({ uncountedDays: Number(event.target.value) || 0 })}
          />
          <FieldDescription>
            Prison, parole, probation, or waiting on a refugee claim.
          </FieldDescription>
        </Field>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Trips outside Canada</h3>
        {application.trips.map((trip) => (
          <div key={trip.id} className="flex items-center gap-2">
            <Input
              type="date"
              value={trip.from}
              aria-label="Left Canada"
              onChange={(event) => patchTrip(trip.id, { from: event.target.value })}
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="date"
              value={trip.to}
              aria-label="Back in Canada"
              onChange={(event) => patchTrip(trip.id, { to: event.target.value })}
            />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Remove trip"
              onClick={() =>
                onChange({ trips: application.trips.filter((item) => item.id !== trip.id) })
              }
            >
              <Trash2 />
            </Button>
          </div>
        ))}
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                trips: [...application.trips, { id: `trip-${Date.now()}`, from: "", to: "" }],
              })
            }
          >
            <Plus data-icon="inline-start" />
            Add a trip
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Tax years filed</h3>
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label="Years you filed Canadian income tax"
        >
          {taxOptions.map((year) => (
            <Button
              key={year}
              size="sm"
              variant={application.taxYearsFiled.includes(year) ? "default" : "outline"}
              aria-pressed={application.taxYearsFiled.includes(year)}
              onClick={() => toggleTaxYear(year)}
            >
              {year}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-muted/50 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-medium tabular-nums">
            {report.creditedDays} of {REQUIRED_DAYS} days
          </span>
          <span className="text-sm text-muted-foreground tabular-nums">
            {report.prDays}/{REQUIRED_PR_DAYS} as PR · {report.temporaryCredit} credited before PR ·{" "}
            {report.daysOutside} away
          </span>
        </div>
        <Progress
          value={Math.min(100, (report.creditedDays / REQUIRED_DAYS) * 100)}
          aria-label="Credited days"
        />
        <p className={cn("text-sm", ready ? "text-success" : "text-muted-foreground")}>
          {!report.valid
            ? `Still needed: ${report.missing.join(", ")}.`
            : ready
              ? `Clears it with ${report.buffer} days to spare. A thin buffer is worth knowing about.`
              : report.meetsTotal === false
                ? `Short by ${report.shortBy} days on that signing date.`
                : report.meetsPrFloor === false
                  ? `Only ${report.prDays} days as a permanent resident; ${REQUIRED_PR_DAYS} are required.`
                  : "The days work out; the tax years do not yet."}
        </p>
        {report.notes.map((note) => (
          <p key={note} className="text-sm text-muted-foreground">
            {note}
          </p>
        ))}
        <a
          className="text-sm underline underline-offset-4"
          href={officialSources.physicalPresence.href}
          target="_blank"
          rel="noreferrer"
        >
          IRCC's calculator decides. Open it.
        </a>
      </div>
    </section>
  );
}
