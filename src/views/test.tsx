import { Flame, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getQuestion, getStudyRef, type TestQuestion } from "@/curriculum";
import {
  MOCK_PASS_MARK,
  MOCK_QUESTIONS,
  PRACTICE_PASS_RATIO,
  testLabel,
  type TestResult,
} from "@/curriculum/plan";
import { formatDue, type ReviewCard } from "@/learning";
import { cn } from "@/lib/utils";
import type { PracticeState } from "@/state";
import { AnswerChoices, Continue, Feedback, MissList, XpPop } from "./quiz";
import { PlayBar, PlayPage, VoiceToggle } from "./shell";
import { BiteVisual } from "./visual";

export function TestRunner({
  practice,
  question,
  questions,
  card,
  combo,
  lastGain,
  onSelect,
  onNext,
  onLeave,
}: {
  practice: PracticeState;
  question: TestQuestion;
  questions: TestQuestion[];
  /** The question's memory card, to say when a miss comes back. */
  card: ReviewCard | null;
  combo: number;
  lastGain: { amount: number; id: number };
  onSelect: (index: number) => void;
  onNext: () => void;
  onLeave: () => void;
}) {
  const mock = practice.mode === "mock";
  const last = practice.questionIndex === questions.length - 1;
  const picked = mock ? (practice.answers[question.id] ?? null) : practice.selectedIndex;
  const repeat = practice.questionIds.slice(0, practice.questionIndex).includes(question.id);
  const lowTime = practice.secondsLeft <= 300;
  const ref = getStudyRef(question.id);

  const nextLabel = mock
    ? last
      ? "Hand in"
      : picked === null
        ? "Skip"
        : "Next"
    : last
      ? "See result"
      : "Next";

  return (
    <PlayPage
      bar={
        <PlayBar
          value={((practice.questionIndex + (practice.submitted ? 1 : 0)) / questions.length) * 100}
          label={`Question ${practice.questionIndex + 1} of ${questions.length}`}
          onClose={onLeave}
        >
          <VoiceToggle />
          {mock ? (
            <span
              className={cn("flex items-center gap-1", lowTime && "font-medium text-destructive")}
            >
              <Timer className="size-4" aria-hidden="true" />
              {clock(practice.secondsLeft)}
            </span>
          ) : (
            <>
              <XpPop key={`xp-${lastGain.id}`} amount={lastGain.amount} />
              {combo >= 2 && (
                <span className="flex items-center gap-1 text-primary" key={`combo-${combo}`}>
                  <Flame className="size-4" aria-hidden="true" />
                  {combo}
                </span>
              )}
            </>
          )}
        </PlayBar>
      }
    >
      <article
        className="flex flex-col gap-5 animate-in fade-in"
        key={`${question.id}-${practice.questionIndex}`}
      >
        <p className="text-sm text-muted-foreground">
          {testLabel(practice.testId ?? "")} · {practice.questionIndex + 1} of {questions.length}
          {repeat && " · second look"}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-balance">{question.prompt}</h1>
        <AnswerChoices
          question={question}
          picked={picked}
          revealed={practice.submitted && !mock}
          onPick={onSelect}
        />
        {practice.submitted && !mock && picked !== null && (
          <Feedback
            question={question}
            picked={picked}
            extra={
              picked !== question.correctIndex && (
                <p className="text-sm text-muted-foreground">
                  {repeat ? "Back" : "One more look before the end, then back"}{" "}
                  {card ? formatDue(card.dueAt) : "tomorrow"}.
                  {ref && ` Remember: ${ref.bite.takeaway}`}
                </p>
              )
            }
          />
        )}
        {practice.submitted && !mock && (
          <BiteVisual biteId={question.biteId} className="max-w-sm" />
        )}
        {mock && lowTime && (
          <p className="text-sm text-destructive">
            Under five minutes left. At zero the exam hands itself in.
          </p>
        )}
        <Continue label={nextLabel} onClick={onNext} disabled={!mock && !practice.submitted} />
      </article>
    </PlayPage>
  );
}

export function TestResultScreen({
  practice,
  questions,
  missedQuestions,
  previous,
  onRetake,
  onHome,
  onReread,
}: {
  practice: PracticeState;
  questions: TestQuestion[];
  missedQuestions: TestQuestion[];
  previous: TestResult | undefined;
  onRetake: () => void;
  onHome: () => void;
  onReread: (sessionId: string) => void;
}) {
  const mock = practice.mode === "mock";
  const total = practice.primaryCount || questions.length;
  const score = mock
    ? practice.primaryIds.filter((id) => practice.answers[id] === getQuestion(id)?.correctIndex)
        .length
    : practice.score;
  const needed = mock
    ? Math.ceil((total * MOCK_PASS_MARK) / MOCK_QUESTIONS)
    : Math.ceil(total * PRACTICE_PASS_RATIO);
  const passed = score >= needed;

  return (
    <PlayPage
      bar={
        <PlayBar value={100} label="Test finished" onClose={onHome}>
          <VoiceToggle />
        </PlayBar>
      }
    >
      <section className="flex flex-col gap-3 py-6 animate-in fade-in">
        <p className="text-sm text-muted-foreground">{testLabel(practice.testId ?? "")}</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          {score} of {total}
          <span className={cn("ml-3 text-xl", passed ? "text-success" : "text-muted-foreground")}>
            {passed ? "Passed" : "Not yet"}
          </span>
        </h1>
        <p className="text-muted-foreground">
          {mock
            ? `The real test needs ${MOCK_PASS_MARK} of ${MOCK_QUESTIONS}.`
            : `${needed} of ${total} passes, first tries only.`}
          {previous && !mock && ` Best so far ${previous.correct}/${previous.total}.`}
        </p>
      </section>
      {missedQuestions.length > 0 && (
        <MissList
          title={mock ? "Missed, now in your review queue" : "Coming back for review"}
          questions={missedQuestions}
          onReread={onReread}
        />
      )}
      <div className="flex flex-wrap gap-2">
        <Button size="lg" onClick={onHome}>
          Done
        </Button>
        <Button size="lg" variant="outline" onClick={onRetake}>
          Take it again
        </Button>
      </div>
    </PlayPage>
  );
}

function clock(seconds: number) {
  const safe = Math.max(0, seconds);
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}
