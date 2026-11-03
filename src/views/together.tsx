import { CircleCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { curriculumModules, guideOpenQuestions, type Session } from "@/curriculum";
import type { ProfileId } from "@/state";

/**
 * Teach it back. One explains a session they have read, out loud and without
 * notes; the other listens, asks one question, and then both compare against
 * what the session actually said.
 */
export function TogetherView({
  teachSession,
  pairTurn,
  profileNames,
  revealed,
  coachMode,
  pairRounds,
  studiedModuleIds,
  spoken,
  onToggleReveal,
  onCompleteRound,
  onNextPrompt,
  onStartStudy,
  onToggleSpoken,
  onClearSpoken,
}: {
  teachSession: Session | null;
  pairTurn: ProfileId;
  profileNames: Record<ProfileId, string>;
  revealed: boolean;
  coachMode: boolean;
  pairRounds: number;
  studiedModuleIds: string[];
  spoken: string[];
  onToggleReveal: () => void;
  onCompleteRound: () => void;
  onNextPrompt: () => void;
  onStartStudy: (sessionId?: string) => void;
  onToggleSpoken: (questionId: string) => void;
  onClearSpoken: () => void;
}) {
  if (!teachSession) {
    return (
      <section className="flex flex-col items-start gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Explain it to each other</h1>
        <p className="text-muted-foreground">
          Teaching works on something you have read. Finish one session and come back.
        </p>
        <Button onClick={() => onStartStudy()}>Start a session</Button>
      </section>
    );
  }

  const speaker = profileNames[pairTurn];
  const listener = profileNames[pairTurn === "you" ? "partner" : "you"];
  const { teach } = teachSession;

  return (
    <>
      <section className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          {said(speaker, "explains", "explain")} for a minute, no notes. One question from{" "}
          {listener}.{pairRounds > 0 && ` ${pairRounds} rounds so far.`}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-balance">{teach.prompt}</h1>
        <p className="text-sm text-muted-foreground">From "{teachSession.title}"</p>
        {coachMode && !revealed && (
          <p className="border-l-2 border-primary pl-4">
            {listener}, ask: {teach.probe}
          </p>
        )}
        {revealed && (
          <div className="flex flex-col gap-3 animate-in fade-in">
            <ul className="flex flex-col gap-2">
              {teach.checklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              className="inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:underline"
              href={teachSession.source}
              target="_blank"
              rel="noreferrer"
            >
              Read it in Discover Canada
              <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          </div>
        )}
        <div className="flex flex-wrap gap-2 pt-2">
          {revealed ? (
            <Button onClick={onCompleteRound}>Done, swap roles</Button>
          ) : (
            <Button onClick={onToggleReveal}>Show what to cover</Button>
          )}
          <Button variant="ghost" onClick={onNextPrompt}>
            Another session
          </Button>
          <Button variant="ghost" onClick={() => onStartStudy(teachSession.id)}>
            Re-read it
          </Button>
        </div>
      </section>

      <GuideQuestions
        studiedModuleIds={studiedModuleIds}
        spoken={spoken}
        onToggleSpoken={onToggleSpoken}
        onClearSpoken={onClearSpoken}
      />
    </>
  );
}

/** "Partner listens", but "You listen". */
function said(name: string, third: string, second: string) {
  return `${name} ${/^you$/i.test(name.trim()) ? second : third}`;
}

/**
 * The only questions the Government of Canada publishes are these, printed at
 * the back of the guide with the instruction to answer them out loud. They are
 * open-ended, so they belong here rather than in a quiz.
 */
function GuideQuestions({
  studiedModuleIds,
  spoken,
  onToggleSpoken,
  onClearSpoken,
}: {
  studiedModuleIds: string[];
  spoken: string[];
  onToggleSpoken: (questionId: string) => void;
  onClearSpoken: () => void;
}) {
  const open = guideOpenQuestions.filter((item) => studiedModuleIds.includes(item.moduleId));
  if (!open.length) return null;
  const said = open.filter((item) => spoken.includes(item.id)).length;
  const groups = curriculumModules
    .map((module) => ({ module, items: open.filter((item) => item.moduleId === module.id) }))
    .filter((group) => group.items.length);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold">The guide's own questions</h2>
        <span className="text-sm text-muted-foreground tabular-nums">
          {said} of {open.length} said out loud
          {said > 0 && (
            <Button variant="link" size="sm" onClick={onClearSpoken}>
              Reset
            </Button>
          )}
        </span>
      </div>
      {groups.map((group) => (
        <div key={group.module.id} className="flex flex-col gap-1">
          <h3 className="pb-1 text-sm text-muted-foreground">{group.module.title}</h3>
          {group.items.map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2 hover:bg-muted/60"
            >
              <Checkbox
                className="mt-0.5"
                checked={spoken.includes(item.id)}
                onCheckedChange={() => onToggleSpoken(item.id)}
              />
              <span
                className={
                  spoken.includes(item.id) ? "text-muted-foreground line-through" : undefined
                }
              >
                {item.prompt}
              </span>
            </label>
          ))}
        </div>
      ))}
    </section>
  );
}
