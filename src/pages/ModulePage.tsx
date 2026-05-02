import { Link, Navigate, useParams } from "react-router-dom";
import { getPathway } from "../data/pathways";
import { useProgress } from "../hooks/useProgress";
import { hasChapterContent } from "../content/registry";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";

export function ModulePage() {
  const { pathwayId, moduleId } = useParams();
  const pathway = getPathway(pathwayId);
  if (!pathway) return <Navigate to="/" replace />;
  const m = pathway.modules.find((mod) => mod.id === moduleId);
  const { isDone } = useProgress();

  if (!m) {
    return (
      <div className="px-6 py-12 max-w-3xl mx-auto">
        <p className="text-ink-300">Module not found.</p>
        <Link to={`/${pathway.id}`} className="text-accent-soft underline">
          Back to {pathway.title}
        </Link>
      </div>
    );
  }

  const totalLessons = m.chapters.reduce((n, c) => n + c.lessons.length, 0);
  const doneLessons = m.chapters.reduce(
    (n, c) =>
      n +
      c.lessons.filter((l) => isDone(`${m.id}/${c.id}/${l.id}`)).length,
    0
  );
  const pct =
    totalLessons === 0 ? 0 : Math.round((doneLessons / totalLessons) * 100);

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-8 sm:py-12 safe-pl safe-pr space-y-8">
      <header className="space-y-2">
        <Link
          to={`/${pathway.id}`}
          className="inline-flex items-center gap-1 text-xs text-ink-400 hover:text-accent-soft"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> {pathway.title}
        </Link>
        <div className="text-xs uppercase tracking-[0.25em] text-accent-soft pt-1">
          Module {m.tier}
        </div>
        <h1 className="font-serif italic text-3xl sm:text-4xl">{m.title}</h1>
        <p className="text-ink-300">{m.subtitle}</p>

        <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-400">
          {m.references.length > 0 && (
            <span>
              <span className="text-ink-500">References:</span>{" "}
              {m.references.join(" · ")}
            </span>
          )}
          {m.prerequisites.length > 0 && (
            <span>
              <span className="text-ink-500">Prereqs:</span>{" "}
              {m.prerequisites.map((p, i) => (
                <span key={p}>
                  <Link
                    to={`/${pathway.id}/module/${p}`}
                    className="text-accent-soft hover:underline"
                  >
                    {p}
                  </Link>
                  {i < m.prerequisites.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          )}
        </div>

        {totalLessons > 0 && (
          <div className="pt-2">
            <div className="flex items-baseline justify-between text-xs text-ink-400 mb-1">
              <span>
                {doneLessons} / {totalLessons} lessons complete
              </span>
              <span>{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-ink-800 overflow-hidden">
              <div
                className="h-full bg-accent transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}
      </header>

      <section>
        <h2 className="text-sm uppercase tracking-widest text-ink-400 mb-3">
          Chapters
        </h2>
        <ol className="space-y-3">
          {m.chapters.map((c, i) => {
            const total = c.lessons.length;
            const done = c.lessons.filter((l) =>
              isDone(`${m.id}/${c.id}/${l.id}`)
            ).length;
            const hours = c.lessons.reduce((n, l) => n + (l.hours ?? 0), 0);
            const isReady = hasChapterContent(m.id, c.id);

            return (
              <li key={c.id}>
                <Link
                  to={`/${pathway.id}/module/${m.id}/chapter/${c.id}`}
                  className="card block p-5 sm:p-6 hover:border-accent/60 transition active:bg-ink-800/40"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-9 h-9 rounded-xl bg-ink-800 border border-ink-700 flex items-center justify-center text-base font-serif italic">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-medium text-base sm:text-lg leading-snug">
                          {c.title}
                        </h3>
                        <ChevronRight className="w-4 h-4 text-ink-500 shrink-0" />
                      </div>
                      <p className="text-sm text-ink-400 mt-1">{c.blurb}</p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink-500">
                        <span className="inline-flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" /> {total} lesson
                          {total === 1 ? "" : "s"}
                        </span>
                        {hours > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> ~{hours}h
                          </span>
                        )}
                        {isReady ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] tracking-widest uppercase bg-accent/10 text-accent-soft">
                            <Sparkles className="w-3 h-3" /> Interactive
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] tracking-widest uppercase bg-ink-800 text-ink-400">
                            Outline only
                          </span>
                        )}
                        {total > 0 && (
                          <span>
                            {done}/{total} done
                          </span>
                        )}
                      </div>

                      {total > 0 && (
                        <div className="mt-2 h-1 rounded-full bg-ink-800 overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all"
                            style={{
                              width: `${total ? (done / total) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
