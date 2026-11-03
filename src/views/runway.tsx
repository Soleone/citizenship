import { useState } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { RowTrigger } from "@/components/variants/row";
import { cn } from "@/lib/utils";
import { officialSources, runwaySteps, testFacts, type RunwayStep } from "@/curriculum";
import type { ActiveProfile, LearnerApplication, ProfileId, RelayState } from "@/state";
import { EligibilityPanel } from "./eligibility";

export function RunwayView({
  activeProfile,
  relayState,
  onApplicationChange,
  onToggleStep,
}: {
  activeProfile: ActiveProfile;
  relayState: RelayState;
  onApplicationChange: (profile: ProfileId, patch: Partial<LearnerApplication>) => void;
  onToggleStep: (stepId: string) => void;
}) {
  // Presence is personal, so the shared desk shows both calculators.
  const learners: ProfileId[] = activeProfile === "both" ? ["you", "partner"] : [activeProfile];

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Application</h1>

      {learners.map((learner) => (
        <EligibilityPanel
          key={learner}
          learnerName={relayState.profileNames[learner]}
          application={relayState.applications[learner]}
          onChange={(patch) => onApplicationChange(learner, patch)}
        />
      ))}

      <section className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-3 pb-2">
          <h2 className="text-lg font-semibold">Steps</h2>
          <span className="text-sm text-muted-foreground tabular-nums">
            {relayState.completedRunway.length} of {runwaySteps.length}
          </span>
        </div>
        {runwaySteps.map((step) => (
          <StepRow
            key={step.id}
            step={step}
            done={relayState.completedRunway.includes(step.id)}
            onToggle={() => onToggleStep(step.id)}
          />
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Test day</h2>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-muted-foreground">
          <li>Computer or tablet with a webcam, Chrome or Safari.</li>
          <li>{testFacts.languages}. Valid ID, good light, nothing else open.</li>
          <li>No phone, VPN, notes or back button. The timer cannot be paused.</li>
        </ul>
        <a
          className="inline-flex items-center gap-1 text-sm underline-offset-4 hover:underline"
          href={officialSources.onlineTest.href}
          target="_blank"
          rel="noreferrer"
        >
          IRCC test-day instructions
          <ArrowUpRight className="size-3" aria-hidden="true" />
        </a>
      </section>

      <p className="text-sm text-muted-foreground">
        A study aid, not IRCC or legal advice.{" "}
        <a
          className="underline underline-offset-4"
          href={officialSources.apply.href}
          target="_blank"
          rel="noreferrer"
        >
          Apply on the official portal
        </a>
        .
      </p>
    </>
  );
}

/** A step is its title until opened: the detail is there when you need it, not in the way. */
function StepRow({
  step,
  done,
  onToggle,
}: {
  step: RunwayStep;
  done: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-1 pl-3">
        <Checkbox checked={done} onCheckedChange={onToggle} aria-label={step.title} />
        <RowTrigger>
          <span
            className={cn("flex-1", done ? "text-muted-foreground line-through" : "font-medium")}
          >
            {step.title}
          </span>
          <ChevronRight
            className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-90")}
            aria-hidden="true"
          />
        </RowTrigger>
      </div>
      <CollapsibleContent>
        <div className="flex flex-col gap-1 pr-3 pb-3 pl-13 text-sm text-muted-foreground">
          <p>{step.detail}</p>
          <a
            className="inline-flex items-center gap-1 text-foreground underline-offset-4 hover:underline"
            href={step.source}
            target="_blank"
            rel="noreferrer"
          >
            {step.sourceLabel}
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </a>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
