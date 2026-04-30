import { useEffect, useState } from "react";
import { Check, X, RotateCcw } from "lucide-react";
import { MathText } from "./MathBlock";
import type { QuizQuestion } from "../content/types";

interface Props {
  questions: QuizQuestion[];
  /** Stable id used to persist answers in localStorage. */
  storageKey?: string;
}

interface QuizState {
  selected: Record<number, number>; // qIndex -> chosen option
  submitted: Record<number, boolean>;
}

const empty: QuizState = { selected: {}, submitted: {} };

function load(key: string): QuizState {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

export function Quiz({ questions, storageKey }: Props) {
  const [state, setState] = useState<QuizState>(() =>
    storageKey ? load(storageKey) : empty
  );

  useEffect(() => {
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  const total = questions.length;
  const answered = Object.keys(state.submitted).length;
  const score = questions.reduce((n, q, i) => {
    if (!state.submitted[i]) return n;
    return state.selected[i] === q.correct ? n + 1 : n;
  }, 0);
  const allDone = answered === total;

  const reset = () => setState(empty);

  return (
    <div className="space-y-5">
      <div className="flex items-baseline justify-between">
        <h2 className="font-serif italic text-2xl">Check yourself</h2>
        <div className="text-xs text-ink-400">
          {answered}/{total} answered{" "}
          {answered > 0 && <>· {score} correct</>}
        </div>
      </div>

      {questions.map((q, i) => (
        <Question
          key={i}
          q={q}
          index={i}
          selected={state.selected[i]}
          submitted={Boolean(state.submitted[i])}
          onSelect={(opt) =>
            setState((s) => ({
              ...s,
              selected: { ...s.selected, [i]: opt },
            }))
          }
          onSubmit={() =>
            setState((s) => ({
              ...s,
              submitted: { ...s.submitted, [i]: true },
            }))
          }
        />
      ))}

      {allDone && (
        <div className="card p-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent-soft">
              Your score
            </div>
            <div className="text-2xl font-medium mt-1">
              {score} / {total}
            </div>
            <div className="text-sm text-ink-400 mt-1">
              {score === total
                ? "Perfect — onwards."
                : score >= Math.ceil(total * 0.6)
                ? "Solid. Re-read the ones you missed."
                : "Worth another pass through this chapter."}
            </div>
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-ink-700 hover:border-accent-soft text-ink-200"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      )}
    </div>
  );
}

function Question({
  q,
  index,
  selected,
  submitted,
  onSelect,
  onSubmit,
}: {
  q: QuizQuestion;
  index: number;
  selected: number | undefined;
  submitted: boolean;
  onSelect: (opt: number) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="card p-5">
      <div className="text-xs uppercase tracking-widest text-ink-500 mb-2">
        Question {index + 1}
      </div>
      <div className="text-base leading-relaxed">
        <MathText>{q.prompt}</MathText>
      </div>
      <ul className="mt-4 space-y-2">
        {q.options.map((opt, i) => {
          const chosen = selected === i;
          const isCorrect = i === q.correct;
          let classes =
            "w-full text-left px-4 py-3 rounded-xl border text-sm transition flex items-start gap-3";
          if (submitted) {
            if (isCorrect) classes += " border-emerald-500/60 bg-emerald-500/10";
            else if (chosen)
              classes += " border-rose-500/60 bg-rose-500/10";
            else classes += " border-ink-800 opacity-70";
          } else {
            classes += chosen
              ? " border-accent-soft bg-ink-800"
              : " border-ink-800 hover:border-ink-700";
          }
          return (
            <li key={i}>
              <button
                disabled={submitted}
                onClick={() => onSelect(i)}
                className={classes}
              >
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full border border-ink-600 flex items-center justify-center text-[11px]">
                  {submitted && isCorrect ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : submitted && chosen ? (
                    <X className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span className="flex-1">
                  <MathText>{opt}</MathText>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {!submitted ? (
        <div className="mt-4 flex justify-end">
          <button
            disabled={selected === undefined}
            onClick={onSubmit}
            className="text-sm px-4 py-2 rounded-lg bg-accent text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent/90"
          >
            Submit
          </button>
        </div>
      ) : (
        q.explanation && (
          <div className="mt-4 text-sm text-ink-300 border-t border-ink-800 pt-3">
            <span className="text-ink-500">Explanation: </span>
            <MathText>{q.explanation}</MathText>
          </div>
        )
      )}
    </div>
  );
}
