import { useState } from "react";
import {
  ChevronRight,
  Circle,
  CircleCheck,
  CircleDot,
  ClipboardCheck,
  ExternalLink,
  Layers,
  Play,
  Repeat,
  Timer,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { RowTrigger, rowClass } from "@/components/variants/row";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  findYourMpUrl,
  officeholders,
  officeholdersCheckedOn,
  provinces,
} from "@/curriculum/canada-now";
import {
  MIXED_TEST_ID,
  MOCK_TEST_ID,
  moduleTestId,
  sessionTestId,
  testAvailability,
  type CurriculumProgress,
  type ModuleProgress,
  type NextStep,
} from "@/curriculum/plan";
import { DAILY_GOAL_XP, levelFor, todayXp, type GameStats } from "@/game";
import { cn } from "@/lib/utils";
import type { CarryOver, MyCanada, ProfileId } from "@/state";

/**
 * Home is the list: one line of where you stand, the one thing to do next, the
 * practice modes, and every chapter. Details open on demand.
 */
export function HomeView({
  players,
  profileNames,
  game,
  progress,
  completedSessions,
  nextStep,
  dueCount,
  targetDate,
  now,
  carryOver,
  myCanada,
  onMyCanadaChange,
  onDismissCarryOver,
  onStartStudy,
  onStartReview,
  onStartTest,
  onOpenBlitz,
}: {
  players: ProfileId[];
  profileNames: Record<ProfileId, string>;
  game: Record<ProfileId, GameStats>;
  /** The open desk's progress: for both, only what both have done. */
  progress: CurriculumProgress;
  completedSessions: string[];
  nextStep: NextStep;
  dueCount: number;
  targetDate: string;
  now: number;
  carryOver: CarryOver | null;
  myCanada: MyCanada;
  onMyCanadaChange: (patch: Partial<MyCanada>) => void;
  onDismissCarryOver: () => void;
  onStartStudy: (sessionId?: string) => void;
  onStartReview: () => void;
  onStartTest: (testId: string) => void;
  onOpenBlitz: () => void;
}) {
  const mixed = testAvailability(MIXED_TEST_ID, completedSessions);
  const mock = testAvailability(MOCK_TEST_ID, completedSessions);
  const daysToTest = targetDate
    ? Math.ceil((new Date(`${targetDate}T12:00:00`).getTime() - now) / 86_400_000)
    : null;

  const status = [
    ...players.map((player) => {
      const stats = game[player];
      const name = players.length > 1 ? `${profileNames[player]} ` : "";
      return `${name}level ${levelFor(stats.xp).level}, ${Math.min(todayXp(stats, now), DAILY_GOAL_XP)}/${DAILY_GOAL_XP} XP today`;
    }),
    `${progress.studiedSessions} of ${progress.sessions} sessions read`,
    ...(daysToTest !== null && daysToTest >= 0 ? [`${daysToTest} days to the test`] : []),
  ];

  return (
    <>
      {carryOver && (
        <p className="flex items-center justify-between gap-3 rounded-lg bg-muted px-3 py-2 text-sm">
          Your earlier progress moved into the new chapters: {carryOver.sessions} sessions kept.
          <Button variant="ghost" size="icon-sm" aria-label="Dismiss" onClick={onDismissCarryOver}>
            <X />
          </Button>
        </p>
      )}

      <p className="text-muted-foreground first-letter:uppercase">{status.join(" · ")}</p>

      <NextRow nextStep={nextStep} onStartStudy={onStartStudy} onStartTest={onStartTest} />

      <div className="-mt-4 flex flex-wrap gap-2" role="toolbar" aria-label="Practice">
        <Button
          variant="outline"
          size="sm"
          disabled={dueCount === 0}
          onClick={onStartReview}
          title="Questions you missed, when they are due"
        >
          <Repeat data-icon="inline-start" />
          Review{dueCount > 0 ? ` ${dueCount}` : ""}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenBlitz}
          title="60 seconds, as many as you can"
        >
          <Zap data-icon="inline-start" />
          Blitz
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!mixed.allowed}
          onClick={() => onStartTest(MIXED_TEST_ID)}
          title={mixed.reason ?? "12 questions from everything you have read"}
        >
          <Layers data-icon="inline-start" />
          Mixed
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!mock.allowed}
          onClick={() => onStartTest(MOCK_TEST_ID)}
          title={mock.reason ?? "20 questions, 45 minutes, 15 to pass"}
        >
          <Timer data-icon="inline-start" />
          Mock test
          {progress.mock ? ` ${progress.mock.correct}/${progress.mock.total}` : ""}
        </Button>
      </div>

      <section className="flex flex-col" aria-label="Chapters">
        {progress.modules.map((item) => (
          <ChapterRow
            key={item.module.id}
            item={item}
            onStartStudy={onStartStudy}
            onStartTest={onStartTest}
          />
        ))}
        <LocalAnswers myCanada={myCanada} onChange={onMyCanadaChange} />
      </section>

      <p className="text-sm text-muted-foreground">
        Unofficial practice from Discover Canada. Progress stays in this browser.
      </p>
    </>
  );
}

function NextRow({
  nextStep,
  onStartStudy,
  onStartTest,
}: {
  nextStep: NextStep;
  onStartStudy: (sessionId?: string) => void;
  onStartTest: (testId: string) => void;
}) {
  const next =
    nextStep.type === "study"
      ? {
          title: nextStep.session.title,
          detail: `${nextStep.session.minutes} min`,
          go: () => onStartStudy(nextStep.session.id),
        }
      : nextStep.type === "session-test"
        ? {
            title: nextStep.session.title,
            detail: "Session test",
            go: () => onStartTest(sessionTestId(nextStep.session.id)),
          }
        : nextStep.type === "module-test"
          ? {
              title: nextStep.module.title,
              detail: "Chapter test",
              go: () => onStartTest(moduleTestId(nextStep.module.id)),
            }
          : {
              title: "Mock test",
              detail: "20 questions, 45 minutes",
              go: () => onStartTest(MOCK_TEST_ID),
            };

  return (
    <button
      type="button"
      onClick={next.go}
      className="group flex items-center gap-4 rounded-xl bg-primary/10 px-4 py-3.5 text-left transition-colors hover:bg-primary/15"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
        <Play className="size-4" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-medium">{next.title}</span>
        <span className="text-sm text-muted-foreground">Up next · {next.detail}</span>
      </span>
      <ChevronRight
        className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </button>
  );
}

function ChapterRow({
  item,
  onStartStudy,
  onStartTest,
}: {
  item: ModuleProgress;
  onStartStudy: (sessionId?: string) => void;
  onStartTest: (testId: string) => void;
}) {
  const { module, sessions, studied, readable, result } = item;
  const done = item.mastered || Boolean(result?.passed);
  const [open, setOpen] = useState(false);
  const Status = done ? CircleCheck : studied > 0 ? CircleDot : Circle;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <RowTrigger>
        <Status
          className={cn("size-5 shrink-0", studied > 0 ? "text-primary" : "text-muted-foreground")}
          aria-hidden="true"
        />
        <span className="flex-1 font-medium">{module.title}</span>
        <span className="text-sm text-muted-foreground tabular-nums">
          {studied}/{sessions.length}
        </span>
        <ChevronRight
          className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-90")}
          aria-hidden="true"
        />
      </RowTrigger>
      <CollapsibleContent>
        <div className="flex flex-col pb-2 pl-8">
          {sessions.map((entry) => {
            const SessionStatus = entry.passed ? CircleCheck : entry.studied ? CircleDot : Circle;
            return (
              <div key={entry.session.id} className="group flex items-center gap-1">
                <button
                  type="button"
                  className={rowClass}
                  onClick={() => onStartStudy(entry.session.id)}
                >
                  <SessionStatus
                    className={cn(
                      "size-4 shrink-0",
                      entry.studied ? "text-primary" : "text-muted-foreground",
                    )}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{entry.session.title}</span>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {entry.result
                      ? `${entry.result.correct}/${entry.result.total}`
                      : `${entry.session.minutes} min`}
                  </span>
                </button>
                {entry.studied && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Test: ${entry.session.title}`}
                    title="Session test"
                    onClick={() => onStartTest(sessionTestId(entry.session.id))}
                  >
                    <ClipboardCheck />
                  </Button>
                )}
              </div>
            );
          })}
          <button
            type="button"
            className={cn(rowClass, !readable && "pointer-events-none opacity-50")}
            disabled={!readable}
            onClick={() => onStartTest(moduleTestId(module.id))}
          >
            <ClipboardCheck className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="flex-1">Chapter test</span>
            <span className="text-sm text-muted-foreground tabular-nums">
              {result
                ? `${result.correct}/${result.total}`
                : readable
                  ? `${module.testSize} questions`
                  : "read every session first"}
            </span>
          </button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

/**
 * The guide expects you to know who holds office today, and the local answers
 * no 2012 book could print: your capital, premier and MP.
 */
function LocalAnswers({
  myCanada,
  onChange,
}: {
  myCanada: MyCanada;
  onChange: (patch: Partial<MyCanada>) => void;
}) {
  const [open, setOpen] = useState(false);
  const capital = provinces.find((item) => item.name === myCanada.province)?.capital;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <RowTrigger>
        <Circle className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span className="flex-1 font-medium">Who's who today</span>
        <ChevronRight
          className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-90")}
          aria-hidden="true"
        />
      </RowTrigger>
      <CollapsibleContent>
        <p className="pt-2 pl-11 text-sm text-muted-foreground">
          Checked {officeholdersCheckedOn}.
        </p>
        <dl className="grid gap-x-6 gap-y-3 py-2 pr-3 pl-11 sm:grid-cols-2">
          {officeholders.map((item) => (
            <div key={item.role}>
              <dt className="text-sm text-muted-foreground">{item.role}</dt>
              <dd className="font-medium">{item.name}</dd>
              <dd className="text-sm text-muted-foreground">{item.note}</dd>
            </div>
          ))}
          <div>
            <dt className="pb-1 text-sm text-muted-foreground">Your province or territory</dt>
            <dd>
              <Select
                value={myCanada.province || null}
                onValueChange={(value) => onChange({ province: String(value ?? "") })}
              >
                <SelectTrigger aria-label="Your province or territory">
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </dd>
            {capital && <dd className="pt-1 text-sm text-muted-foreground">Capital: {capital}</dd>}
          </div>
          <div>
            <dt className="pb-1 text-sm text-muted-foreground">Your premier</dt>
            <dd>
              <Input
                value={myCanada.premier}
                placeholder="Look it up and type it"
                onChange={(event) => onChange({ premier: event.target.value })}
              />
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 pb-1 text-sm text-muted-foreground">
              Your MP
              <a
                className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
                href={findYourMpUrl}
                target="_blank"
                rel="noreferrer"
              >
                find by postal code
                <ExternalLink className="size-3" aria-hidden="true" />
              </a>
            </dt>
            <dd>
              <Input
                value={myCanada.mp}
                placeholder="Your member of Parliament"
                onChange={(event) => onChange({ mp: event.target.value })}
              />
            </dd>
          </div>
        </dl>
      </CollapsibleContent>
    </Collapsible>
  );
}
