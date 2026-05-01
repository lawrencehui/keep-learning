import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { pathways } from "../data/pathways";
import { useProgress } from "../hooks/useProgress";

export function PathwayHome() {
  const { isDone, state } = useProgress();
  const lastVisited = state.lastVisited;

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10 sm:py-16 space-y-12 safe-pl safe-pr">
      <header>
        <div className="text-xs uppercase tracking-[0.25em] text-ink-400">
          Pathways
        </div>
        <h1 className="font-serif italic text-4xl sm:text-5xl mt-2">
          Pick your path.
        </h1>
        <p className="mt-3 text-ink-300 max-w-2xl">
          Each pathway is a self-paced curriculum: tier-organised modules,
          lessons with reading + video resources, and short quizzes at the
          end of each chapter.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pathways.map((p) => {
          const lessons = p.modules.flatMap((m) =>
            m.chapters.flatMap((c) =>
              c.lessons.map((l) => `${m.id}/${c.id}/${l.id}`)
            )
          );
          const total = lessons.length;
          const done = lessons.filter((k) => isDone(k)).length;
          const pct = total === 0 ? 0 : Math.round((done / total) * 100);
          const moduleCount = p.modules.length;
          const chapterCount = p.modules.reduce(
            (n, m) => n + m.chapters.length,
            0
          );
          const isResume = lastVisited?.pathwayId === p.id;
          return (
            <Link
              key={p.id}
              to={`/${p.id}`}
              className="card p-5 hover:border-accent/60 transition group flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <span className="font-serif italic text-3xl shrink-0 leading-none">
                  {p.emblem}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-lg leading-snug truncate">
                    {p.title}
                  </div>
                  <div className="text-sm text-ink-400 truncate">
                    {p.subtitle}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-ink-400 group-hover:text-accent transition shrink-0 mt-1.5" />
              </div>
              <p className="text-sm text-ink-300">{p.description}</p>
              <div className="flex items-center justify-between text-[11px] text-ink-500 mt-1">
                <span>
                  {moduleCount} modules · {chapterCount} chapters · {total}{" "}
                  lessons
                </span>
                <span className="text-ink-400">{pct}%</span>
              </div>
              <div className="h-1 rounded-full bg-ink-800 overflow-hidden">
                <div
                  className="h-full bg-accent transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              {isResume && (
                <div className="text-[11px] text-accent-soft mt-1">
                  Last opened
                </div>
              )}
            </Link>
          );
        })}
      </section>
    </div>
  );
}
