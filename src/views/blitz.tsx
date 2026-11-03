import { useCallback, useEffect, useMemo, useState } from "react";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TestQuestion } from "@/curriculum";
import type { ProfileId } from "@/state";
import { confetti, play } from "@/juice";
import { cn } from "@/lib/utils";
import { AnswerChoices, MissList } from "./quiz";
import { PlayBar, PlayPage } from "./shell";

const BLITZ_SECONDS = 60;
/** Fewer than this and the same handful of questions would loop all minute. */
const BLITZ_MIN_POOL = 6;
const FLASH_MS = 550;

/** "Partner takes it", but "You take it". */
function verb(name: string, third: string, second: string) {
  return `${name} ${name.trim().toLowerCase() === "you" ? second : third}`;
}

type Phase = "intro" | "play" | "handoff" | "done";
type Turn = { player: ProfileId; score: number; answered: number; misses: TestQuestion[] };

function shuffled<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index--) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

/**
 * Sixty seconds, as many as you can. Solo it chases your best; on the shared
 * desk it is a duel: same questions, one turn each, pass the device between.
 * Every answer still lands in the memory queue, so a blitz is real practice.
 */
export function BlitzView({
  pool,
  players,
  profileNames,
  best,
  combo,
  onAnswer,
  onFinish,
  onStartStudy,
  onClose,
}: {
  pool: TestQuestion[];
  players: ProfileId[];
  profileNames: Record<ProfileId, string>;
  best: Record<ProfileId, number>;
  combo: number;
  onAnswer: (questionId: string, correct: boolean, player: ProfileId[]) => void;
  onFinish: (player: ProfileId, score: number) => void;
  onStartStudy: () => void;
  onClose: () => void;
}) {
  const duel = players.length > 1;
  const [phase, setPhase] = useState<Phase>("intro");
  const [order, setOrder] = useState<TestQuestion[]>([]);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [endsAt, setEndsAt] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  /** Best scores as they stood before this game, so "new best" means something. */
  const [bestBefore, setBestBefore] = useState(best);

  const turn = turns[turns.length - 1];
  const question = order[index % Math.max(order.length, 1)];
  const secondsLeft = Math.max(0, Math.ceil((endsAt - now) / 1000));

  function start() {
    // Two passes through the pool, reshuffled, is more than anyone answers in a minute.
    setOrder([...shuffled(pool), ...shuffled(pool)]);
    setBestBefore(best);
    setTurns([]);
    beginTurn(players[0]);
  }

  function beginTurn(player: ProfileId) {
    setTurns((current) => [...current, { player, score: 0, answered: 0, misses: [] }]);
    setIndex(0);
    setPicked(null);
    const startAt = Date.now();
    setNow(startAt);
    setEndsAt(startAt + BLITZ_SECONDS * 1000);
    setPhase("play");
  }

  const endTurn = useCallback(() => {
    if (!turn) return;
    onFinish(turn.player, turn.score);
    if (turns.length < players.length) {
      setPhase("handoff");
      return;
    }
    setPhase("done");
    play("win");
    if (duel || turn.score > bestBefore[turn.player]) confetti();
  }, [turn, turns.length, players.length, duel, bestBefore, onFinish]);

  useEffect(() => {
    if (phase !== "play") return;
    const timer = window.setInterval(() => setNow(Date.now()), 200);
    return () => window.clearInterval(timer);
  }, [phase]);

  // The buzzer waits for the answer on screen to finish flashing, then ends the turn.
  useEffect(() => {
    if (phase !== "play" || picked !== null) return;
    const timer = window.setTimeout(endTurn, Math.max(0, endsAt - Date.now()));
    return () => window.clearTimeout(timer);
  }, [phase, endsAt, picked, endTurn]);

  const pick = useCallback(
    (choice: number) => {
      if (phase !== "play" || picked !== null || !question || !turn) return;
      const correct = choice === question.correctIndex;
      setPicked(choice);
      onAnswer(question.id, correct, [turn.player]);
      setTurns((current) =>
        current.map((entry, at) =>
          at !== current.length - 1
            ? entry
            : {
                ...entry,
                score: entry.score + (correct ? 1 : 0),
                answered: entry.answered + 1,
                misses: correct ? entry.misses : [...entry.misses, question],
              },
        ),
      );
      window.setTimeout(() => {
        setPicked(null);
        setIndex((current) => current + 1);
      }, FLASH_MS);
    },
    [phase, picked, question, turn, onAnswer],
  );

  // Enter starts a game or hands the device over, so the keyboard never has to leave home row.
  useEffect(() => {
    if (phase === "play") return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Enter") return;
      if (phase === "handoff") beginTurn(players[turns.length]);
      else if (pool.length >= BLITZ_MIN_POOL) start();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const winner = useMemo(() => {
    if (!duel || phase !== "done" || turns.length < 2) return null;
    const [a, b] = turns;
    if (a.score === b.score) return "tie";
    return a.score > b.score ? a.player : b.player;
  }, [duel, phase, turns]);

  const misses = turns.flatMap((entry) => entry.misses);
  const uniqueMisses = [...new Map(misses.map((miss) => [miss.id, miss])).values()];

  if (phase !== "play" || !question || !turn) {
    const solo = turns[0];
    const next = players[turns.length];
    const newBest = phase === "done" && !duel && solo && solo.score > bestBefore[solo.player];
    const title =
      pool.length < BLITZ_MIN_POOL
        ? "Read a session first"
        : phase === "intro"
          ? duel
            ? "Duel: 60 seconds each"
            : "Blitz: 60 seconds"
          : phase === "handoff" && turn
            ? `${profileNames[turn.player]} scored ${turn.score}`
            : duel
              ? winner === "tie"
                ? "A tie"
                : `${verb(profileNames[winner as ProfileId], "wins", "win")}`
              : `${solo?.score ?? 0} right${newBest ? ", a new best" : ""}`;
    const line =
      pool.length < BLITZ_MIN_POOL
        ? `Blitz only asks what ${duel ? "you have both" : "you have"} read.`
        : phase === "intro"
          ? duel
            ? `Same questions, one turn each. ${verb(profileNames[players[0]], "goes", "go")} first.`
            : `As many as you can. Best so far: ${best[players[0]]}.`
          : phase === "handoff"
            ? `Pass the device to ${profileNames[next]}.`
            : duel
              ? turns.map((entry) => `${profileNames[entry.player]} ${entry.score}`).join(" · ")
              : `of ${solo?.answered ?? 0} answered · best ${Math.max(best[solo.player], solo.score)}`;
    const action =
      pool.length < BLITZ_MIN_POOL
        ? { label: "Start a session", run: onStartStudy }
        : phase === "handoff"
          ? { label: `${profileNames[next]}, go`, run: () => beginTurn(next) }
          : { label: phase === "intro" ? "Start" : "Play again", run: start };

    return (
      <PlayPage
        bar={<PlayBar value={phase === "done" ? 100 : 0} label="Blitz" onClose={onClose} />}
      >
        <section className="flex flex-col gap-3 py-6 animate-in fade-in">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="text-lg text-muted-foreground">{line}</p>
        </section>
        {phase === "done" && uniqueMisses.length > 0 && (
          <MissList title="Worth another look" questions={uniqueMisses} />
        )}
        <div>
          <Button size="lg" onClick={action.run}>
            {action.label}
          </Button>
        </div>
      </PlayPage>
    );
  }

  return (
    <PlayPage
      bar={
        <PlayBar
          value={Math.min(100, ((endsAt - now) / (BLITZ_SECONDS * 1000)) * 100)}
          label={`${secondsLeft} seconds left`}
          onClose={onClose}
        >
          {combo >= 2 && (
            <span className="flex items-center gap-1 text-primary" key={`combo-${combo}`}>
              <Flame className="size-4" aria-hidden="true" />
              {combo}
            </span>
          )}
          <span className={cn(secondsLeft <= 10 && "font-medium text-destructive")}>
            {secondsLeft}s
          </span>
        </PlayBar>
      }
    >
      <article className="flex flex-col gap-5" key={index}>
        <p className="text-sm text-muted-foreground">
          {duel ? `${profileNames[turn.player]} · ` : ""}
          {turn.score} right
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-balance">{question.prompt}</h1>
        <AnswerChoices
          question={question}
          picked={picked}
          revealed={picked !== null}
          onPick={pick}
        />
      </article>
    </PlayPage>
  );
}
