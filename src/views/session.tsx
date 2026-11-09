import { useEffect, useState } from "react";
import { ChevronDown, ExternalLink, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getModule, type Session, type TestQuestion } from "@/curriculum";
import type { TestResult } from "@/curriculum/plan";
import {
  answerLine,
  biteLine,
  introLine,
  phrases,
  questionLine,
  sessionTexts,
  takeawayLine,
} from "@/audio";
import type { Command } from "@/listen";
import { prefetch } from "@/speak";
import { useVoiceOn, useVoiceTurn } from "@/voice";
import { AnswerChoices, Continue, Feedback, MissList, XpPop } from "./quiz";
import { PlayBar, PlayPage, VoiceToggle } from "./shell";
import { BiteVisual } from "./visual";

/**
 * One bite, then its quick checks, in one column. Reading and recall alternate,
 * because a question right after the idea is what makes it stick. The checks
 * are the session test: answer them all and the result is on record.
 */
/** What picks each answer by voice. True/false also takes Alpha and Bravo. */
const ANSWERS: Partial<Record<Command, number>> = { A: 0, B: 1, C: 2, D: 3, true: 0, false: 1 };
const answerCommands = (question: TestQuestion): Command[] =>
  question.kind === "truefalse"
    ? ["true", "false", "A", "B"]
    : (["A", "B", "C", "D"] as const).slice(0, question.options.length);
const LISTEN_TRIES = 3;
const anyOf = (lines: string[]) => lines[Math.floor(Math.random() * lines.length)];

export function SessionScreen({
  session,
  biteIndex,
  combo,
  lastGain,
  onAnswer,
  onAdvance,
  onClose,
}: {
  session: Session;
  biteIndex: number;
  combo: number;
  lastGain: { amount: number; id: number };
  onAnswer: (question: TestQuestion, index: number) => void;
  onAdvance: () => void;
  onClose: () => void;
}) {
  const bite = session.bites[biteIndex] ?? session.bites[0];
  const checks = session.test.filter((question) => question.biteId === bite.id);
  const isLast = biteIndex === session.bites.length - 1;
  /** 0 is the reading; 1..n is the nth quick check. */
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<Record<string, number>>({});
  /** Bumped by "repeat", so voice mode says the same step again. */
  const [replays, setReplays] = useState(0);
  const question = step > 0 ? checks[step - 1] : null;
  const picked = question ? (picks[question.id] ?? null) : null;

  // Every bite and every check counts as a step, so the bar moves on each tap.
  const steps = session.bites.length + session.test.length;
  const before = session.bites
    .slice(0, biteIndex)
    .reduce(
      (sum, item) => sum + 1 + session.test.filter((check) => check.biteId === item.id).length,
      0,
    );
  const progress = ((before + step) / steps) * 100;

  function next() {
    if (step < checks.length) setStep(step + 1);
    else onAdvance();
  }

  function pick(index: number) {
    if (!question || picked !== null) return;
    setPicks((current) => ({ ...current, [question.id]: index }));
    onAnswer(question, index);
  }

  const voiceOn = useVoiceOn();
  useEffect(() => {
    if (voiceOn) prefetch(sessionTexts(session));
  }, [voiceOn, session]);

  // Silence after a reading or an answer goes on by itself; a question waits for an answer.
  useVoiceTurn(`${step}:${picked}:${replays}`, async (voice) => {
    const again = async () => {
      await voice.say(phrases.repeating);
      setReplays((n) => n + 1);
    };
    if (!question) {
      if (biteIndex === 0 && replays === 0) await voice.say(introLine(session));
      await voice.say(biteLine(bite));
      await voice.say(takeawayLine(bite));
      return (await voice.hear(["next", "repeat"])) === "repeat" ? again() : next();
    }
    if (picked !== null) {
      await voice.say(anyOf(picked === question.correctIndex ? phrases.correct : phrases.wrong));
      await voice.say(answerLine(question));
      return (await voice.hear(["next", "repeat"])) === "repeat" ? again() : next();
    }
    await voice.say(questionLine(question));
    for (let tries = 0; tries < LISTEN_TRIES; tries++) {
      const command = await voice.hear([...answerCommands(question), "repeat"]);
      if (command === "repeat") {
        await voice.say(phrases.repeating);
        await voice.say(questionLine(question));
      } else if (command) return pick(ANSWERS[command] ?? 0);
      else
        await voice.say(question.kind === "truefalse" ? phrases.sayTrueFalse : phrases.sayLetter);
    }
    voice.pause(); // nobody is answering: wait for resume rather than nag
  });

  const nextLabel =
    step < checks.length
      ? step === 0
        ? "Quick check"
        : "Next question"
      : isLast
        ? "Finish"
        : "Next";
  const module = getModule(session.moduleId);

  return (
    <PlayPage
      bar={
        <PlayBar
          value={progress}
          label={`${session.title}, step ${before + step + 1} of ${steps}`}
          onClose={onClose}
        >
          <XpPop key={`xp-${lastGain.id}`} amount={lastGain.amount} />
          <VoiceToggle />
          {combo >= 2 && (
            <span className="flex items-center gap-1 text-primary" key={`combo-${combo}`}>
              <Flame className="size-4" aria-hidden="true" />
              {combo}
            </span>
          )}
        </PlayBar>
      }
    >
      {question === null ? (
        <article className="flex flex-col gap-5 animate-in fade-in" key={bite.id}>
          <p className="text-sm text-muted-foreground">
            {module?.title} · {session.title}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {bite.title}
          </h1>
          <BiteVisual biteId={bite.id} />
          <p className="text-lg leading-relaxed">{bite.body}</p>
          <p className="border-l-2 border-primary pl-4 font-medium">{bite.takeaway}</p>
          <Collapsible>
            <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
              Source
              <ChevronDown data-icon="inline-end" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <blockquote className="mt-2 border-l-2 pl-4 text-sm text-muted-foreground italic">
                "{bite.evidence}"{" "}
                <a
                  className="inline-flex items-center gap-1 not-italic underline-offset-4 hover:underline"
                  href={session.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  Discover Canada
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
              </blockquote>
            </CollapsibleContent>
          </Collapsible>
          <Continue label={nextLabel} onClick={next} />
        </article>
      ) : (
        <article className="flex flex-col gap-5 animate-in fade-in" key={question.id}>
          <p className="text-sm text-muted-foreground">
            Quick check {step} of {checks.length}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-balance">{question.prompt}</h1>
          <AnswerChoices
            question={question}
            picked={picked}
            revealed={picked !== null}
            onPick={pick}
          />
          {picked !== null && <Feedback question={question} picked={picked} />}
          <Continue label={nextLabel} onClick={next} disabled={picked === null} />
        </article>
      )}
    </PlayPage>
  );
}

export function SessionDone({
  session,
  result,
  run,
  firstRead,
  onNext,
  onRetake,
  onHome,
  onReread,
}: {
  session: Session;
  result: TestResult | null;
  run: { answers: Record<string, boolean>; xp: number } | null;
  /** True the first time through, when the session itself pays out. */
  firstRead: boolean;
  onNext: () => void;
  onRetake: () => void;
  onHome: () => void;
  onReread: (sessionId: string) => void;
}) {
  const answers = run ? Object.values(run.answers) : [];
  const correct = answers.filter(Boolean).length;
  const complete = answers.length === session.test.length;
  const missed = run ? session.test.filter((question) => run.answers[question.id] === false) : [];
  const [replays, setReplays] = useState(0);
  useVoiceTurn(`done:${replays}`, async (voice) => {
    await voice.say(phrases.done);
    const command = await voice.hear(["next", "repeat"]);
    if (command === "next") onNext();
    if (command === "repeat") {
      await voice.say(phrases.repeating);
      setReplays((n) => n + 1);
    }
  });

  return (
    <PlayPage
      bar={
        <PlayBar value={100} label="Session complete" onClose={onHome}>
          <VoiceToggle />
        </PlayBar>
      }
    >
      <section className="flex flex-col gap-3 py-6 animate-in fade-in">
        <p className="text-sm text-muted-foreground">{session.title}</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          {firstRead ? "Session complete" : "Session replayed"}
        </h1>
        {answers.length > 0 && (
          <p className="text-lg text-muted-foreground">
            {correct} of {answers.length} right
            {complete && result ? (result.passed ? " · test passed" : " · retake to pass") : ""}
            {run && run.xp > 0 ? ` · +${run.xp} XP` : ""}
          </p>
        )}
      </section>
      {missed.length > 0 && (
        <MissList title="Coming back tomorrow" questions={missed} onReread={onReread} />
      )}
      <div className="flex flex-wrap gap-2">
        <Button size="lg" onClick={onNext}>
          Next session
        </Button>
        {(!complete || !result?.passed) && (
          <Button size="lg" variant="outline" onClick={onRetake}>
            {complete ? "Retake the test" : "Take the test"}
          </Button>
        )}
        <Button size="lg" variant="ghost" onClick={onHome}>
          Home
        </Button>
      </div>
    </PlayPage>
  );
}
