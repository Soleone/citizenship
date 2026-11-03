import { useEffect, type ReactNode } from "react";
import { ArrowRight, Check, TriangleAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";
import { getStudyRef, type TestQuestion } from "@/curriculum";

/**
 * The answer rows every quiz screen shares. A tap commits, there is no separate
 * "check" step, and 1 to 4 (or A to D) pick from the keyboard.
 *
 * `revealed` decides whether the right answer lights up. The mock exam keeps it
 * off so nothing is marked before the hand-in, like the real test.
 */
export function AnswerChoices({
  question,
  picked,
  revealed,
  onPick,
}: {
  question: TestQuestion;
  picked: number | null;
  revealed: boolean;
  onPick: (index: number) => void;
}) {
  const locked = revealed && picked !== null;

  useEffect(() => {
    if (locked) return;
    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if ((event.target as HTMLElement | null)?.closest("input, textarea, select")) return;
      const key = event.key.toLowerCase();
      const index = /^[1-4]$/.test(key) ? Number(key) - 1 : "abcd".indexOf(key);
      if (index >= 0 && index < question.options.length) {
        event.preventDefault();
        onPick(index);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locked, onPick, question.options.length]);

  return (
    <div className="flex flex-col gap-2" role="group" aria-label="Answers">
      {question.options.map((option, index) => {
        const selected = picked === index;
        const right = locked && index === question.correctIndex;
        const wrong = locked && selected && !right;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onPick(index)}
            disabled={locked}
            aria-pressed={selected}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-base transition-colors",
              !locked && "hover:bg-muted",
              selected && !locked && "border-primary bg-primary/10",
              right && "border-success bg-success/10",
              wrong && "border-destructive bg-destructive/10",
              locked && !right && !wrong && "opacity-50",
            )}
          >
            <Kbd>{index + 1}</Kbd>
            <span className="flex flex-1 items-center gap-2">
              {question.kind === "truefalse" &&
                (index === 0 ? (
                  <Check className="size-5 text-success" aria-hidden="true" />
                ) : (
                  <X className="size-5 text-destructive" aria-hidden="true" />
                ))}
              {option}
            </span>
            {right && <Check className="size-5 text-success" aria-hidden="true" />}
            {wrong && <X className="size-5 text-destructive" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}

/** Right or wrong, and why, directly under the answers so the eyes do not travel. */
export function Feedback({
  question,
  picked,
  extra,
}: {
  question: TestQuestion;
  picked: number;
  extra?: ReactNode;
}) {
  const right = picked === question.correctIndex;
  return (
    <div className="flex flex-col gap-2 animate-in fade-in" aria-live="polite">
      <p className={cn("font-medium", right ? "text-success" : "text-destructive")}>
        {right ? praise(question.id) : `It's "${question.options[question.correctIndex]}".`}
      </p>
      <p className="text-muted-foreground">{question.rationale}</p>
      {question.caveat && (
        <p className="flex gap-2 text-sm text-muted-foreground">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {question.caveat}
        </p>
      )}
      {extra}
    </div>
  );
}

const PRAISE = ["Nice!", "Spot on.", "Exactly.", "Yes!", "Nailed it.", "Correct."];

/** Stable per question, so a re-render does not change the word under you. */
function praise(questionId: string) {
  let hash = 0;
  for (const char of questionId) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return PRAISE[Math.abs(hash) % PRAISE.length];
}

/** The one way forward on a play screen. Enter presses it, unless focus is on another control. */
export function Continue({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  /** Secondary actions on the left of the row. */
  children?: ReactNode;
}) {
  useEffect(() => {
    if (disabled) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Enter") return;
      if ((event.target as HTMLElement | null)?.closest("button, a, input, summary, [role=button]"))
        return;
      event.preventDefault();
      onClick();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [disabled, onClick]);

  return (
    <div className="flex items-center justify-between gap-3 pt-2">
      <div className="flex items-center gap-2">{children}</div>
      <Button size="lg" onClick={onClick} disabled={disabled}>
        {label}
        <ArrowRight data-icon="inline-end" />
      </Button>
    </div>
  );
}

/** "+12" that floats up next to the score. Give it a fresh `key` per gain so it replays. */
export function XpPop({ amount }: { amount: number }) {
  if (amount <= 0) return null;
  return (
    <span className="font-medium text-primary animate-in fade-in slide-in-from-bottom-2">
      +{amount}
    </span>
  );
}

/** Questions that went wrong, with the right answer beside each and a way back to the reading. */
export function MissList({
  title,
  questions,
  onReread,
}: {
  title: string;
  questions: TestQuestion[];
  onReread?: (sessionId: string) => void;
}) {
  return (
    <section className="flex flex-col gap-1">
      <h2 className="pb-2 text-sm font-medium text-muted-foreground">{title}</h2>
      {questions.map((question) => {
        const ref = getStudyRef(question.id);
        return (
          <div
            key={question.id}
            className="flex items-start justify-between gap-4 rounded-lg px-3 py-2.5 hover:bg-muted/50"
          >
            <div className="flex flex-col gap-0.5">
              <span>{question.prompt}</span>
              <span className="text-sm font-medium text-success">
                {question.options[question.correctIndex]}
              </span>
            </div>
            {onReread && ref && (
              <Button variant="ghost" size="sm" onClick={() => onReread(ref.session.id)}>
                Re-read
              </Button>
            )}
          </div>
        );
      })}
    </section>
  );
}
