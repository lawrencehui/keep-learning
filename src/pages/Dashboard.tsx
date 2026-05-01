import { Link, Navigate, useParams } from "react-router-dom";
import {
  Flame,
  BookOpen,
  Target,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { useProgress, currentStreak } from "../hooks/useProgress";
import { getPathway } from "../data/pathways";
import type { Pathway } from "../types";

export function Dashboard() {
  const { pathwayId } = useParams();
  const pathway = getPathway(pathwayId);
  if (!pathway) return <Navigate to="/" replace />;

  const { state, isDone } = useProgress();
  const allLessonIds = pathway.modules.flatMap((m) =>
    m.chapters.flatMap((c) => c.lessons.map((l) => `${m.id}/${c.id}/${l.id}`))
  );
  const total = allLessonIds.length;
  const done = allLessonIds.filter((k) => isDone(k)).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const streak = currentStreak(state.studyDays);
  const resume = pickResume(pathway, state.lastVisited, isDone);

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-8 sm:py-12 space-y-10 safe-pl safe-pr">
      <header>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-ink-400 hover:text-accent-soft"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> All pathways
        </Link>
        <div className="text-xs uppercase tracking-[0.25em] text-ink-400 mt-3">
          Daily learning, compounding.
        </div>
        <h1 className="font-serif italic text-4xl sm:text-5xl mt-2">
          {pathway.title}.
        </h1>
        <p className="mt-3 text-ink-300 max-w-2xl">{pathway.description}</p>
      </header>

      {resume && (
        <Link
          to={`/${pathway.id}/module/${resume.moduleId}/chapter/${resume.chapterId}`}
          className="card block p-5 hover:border-accent/60 transition group"
        >
          <div className="flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-[11px] uppercase tracking-widest text-accent-soft">
                {resume.label}
              </div>
              <div className="mt-1 font-serif italic text-2xl sm:text-3xl truncate">
                {resume.chapterTitle}
              </div>
              <div className="mt-1 text-sm text-ink-400 truncate">
                {resume.moduleTitle}
                {typeof resume.scrollPct === "number" && resume.scrollPct > 0.05
                  ? ` · ${Math.round(resume.scrollPct * 100)}% in`
                  : ""}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-ink-400 group-hover:text-accent transition shrink-0" />
          </div>
        </Link>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat
          icon={<Flame className="w-5 h-5" />}
          label="Current streak"
          value={`${streak} day${streak === 1 ? "" : "s"}`}
        />
        <Stat
          icon={<BookOpen className="w-5 h-5" />}
          label="Lessons completed"
          value={`${done} / ${total}`}
        />
        <Stat
          icon={<Target className="w-5 h-5" />}
          label="Overall progress"
          value={`${pct}%`}
        />
      </section>

      <section>
        <h2 className="text-lg font-medium mb-3">The path</h2>
        <ol className="space-y-2">
          {pathway.modules.map((m) => {
            const t = m.chapters.reduce((n, c) => n + c.lessons.length, 0);
            const d = m.chapters.reduce(
              (n, c) =>
                n +
                c.lessons.filter((l) => isDone(`${m.id}/${c.id}/${l.id}`))
                  .length,
              0
            );
            const pct = t === 0 ? 0 : Math.round((d / t) * 100);
            return (
              <li key={m.id}>
                <Link
                  to={`/${pathway.id}/module/${m.id}`}
                  className="card p-4 flex items-center gap-4 hover:border-accent/60 transition"
                >
                  <span className="text-[11px] tracking-widest uppercase text-accent-soft w-10 shrink-0">
                    {m.tier}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-medium">{m.title}</span>
                    <span className="block text-sm text-ink-400 truncate">
                      {m.subtitle}
                    </span>
                  </span>
                  <span className="text-xs text-ink-400 w-12 text-right shrink-0">
                    {pct}%
                  </span>
                  <span className="hidden sm:block w-32 h-1.5 rounded-full bg-ink-800 overflow-hidden shrink-0">
                    <span
                      className="block h-full bg-accent"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

interface ResumeTarget {
  moduleId: string;
  chapterId: string;
  moduleTitle: string;
  chapterTitle: string;
  label: string;
  scrollPct?: number;
}

function pickResume(
  pathway: Pathway,
  lastVisited:
    | { pathwayId?: string; moduleId: string; chapterId: string; scrollPct?: number }
    | null,
  isDone: (key: string) => boolean
): ResumeTarget | null {
  // Prefer the chapter the user last opened, but only if it's in this pathway.
  if (
    lastVisited &&
    (lastVisited.pathwayId ?? "quantum") === pathway.id
  ) {
    const m = pathway.modules.find((mod) => mod.id === lastVisited.moduleId);
    const c = m?.chapters.find((ch) => ch.id === lastVisited.chapterId);
    if (m && c) {
      return {
        moduleId: m.id,
        chapterId: c.id,
        moduleTitle: m.title,
        chapterTitle: c.title,
        label: "Continue reading",
        scrollPct: lastVisited.scrollPct,
      };
    }
  }
  // Otherwise, the first chapter with any incomplete lesson.
  for (const m of pathway.modules) {
    for (const c of m.chapters) {
      const anyIncomplete = c.lessons.some(
        (l) => !isDone(`${m.id}/${c.id}/${l.id}`)
      );
      if (anyIncomplete) {
        return {
          moduleId: m.id,
          chapterId: c.id,
          moduleTitle: m.title,
          chapterTitle: c.title,
          label: "Start here",
        };
      }
    }
  }
  return null;
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 text-ink-400 text-xs">
        {icon}
        <span className="uppercase tracking-widest">{label}</span>
      </div>
      <div className="mt-2 font-serif italic text-3xl tracking-tight">
        {value}
      </div>
    </div>
  );
}
