import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  ExternalLink,
  Video,
  GraduationCap,
  BookOpen,
  FileText,
  Wrench,
  ScrollText,
  Clock,
} from "lucide-react";
import { getPathway } from "../data/pathways";
import { useProgress } from "../hooks/useProgress";
import { MathText } from "../components/MathBlock";
import { Quiz } from "../components/Quiz";
import { getChapterContent } from "../content/registry";
import type { QuizQuestion } from "../content/types";
import type { Module, Chapter, Resource } from "../types";

const iconFor = (k: Resource["kind"]) => {
  switch (k) {
    case "video":
      return <Video className="w-3.5 h-3.5" />;
    case "course":
      return <GraduationCap className="w-3.5 h-3.5" />;
    case "book":
      return <BookOpen className="w-3.5 h-3.5" />;
    case "article":
      return <FileText className="w-3.5 h-3.5" />;
    case "tool":
      return <Wrench className="w-3.5 h-3.5" />;
    case "paper":
      return <ScrollText className="w-3.5 h-3.5" />;
  }
};

export function ChapterPage() {
  const { pathwayId, moduleId, chapterId } = useParams();
  const pathway = getPathway(pathwayId);
  const m = pathway?.modules.find((mod) => mod.id === moduleId);
  const c = m?.chapters.find((ch) => ch.id === chapterId);
  const { markVisited, updateScroll, state } = useProgress();

  // Track which chapter is currently open, and write scroll-pct on idle.
  useEffect(() => {
    if (!pathway || !m || !c) return;
    markVisited(pathway.id, m.id, c.id);
    const restorePct =
      (state.lastVisited?.pathwayId ?? "quantum") === pathway.id &&
      state.lastVisited?.moduleId === m.id &&
      state.lastVisited?.chapterId === c.id
        ? state.lastVisited.scrollPct ?? 0
        : 0;
    if (restorePct > 0.02) {
      requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: total * restorePct, behavior: "auto" });
      });
    }
    let timer: number | null = null;
    const onScroll = () => {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
        updateScroll(pathway.id, m.id, c.id, pct);
      }, 800);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) window.clearTimeout(timer);
    };
    // restorePct is read once on mount; markVisited/updateScroll are stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathway?.id, m?.id, c?.id]);

  if (!pathway) return <Navigate to="/" replace />;
  if (!m || !c) {
    return (
      <div className="px-6 py-12 max-w-3xl mx-auto">
        <p className="text-ink-300">Chapter not found.</p>
        <Link to={`/${pathway.id}`} className="text-accent-soft underline">
          Back to {pathway.title}
        </Link>
      </div>
    );
  }

  const registered = getChapterContent(m.id, c.id);
  const totalHours = c.lessons.reduce((n, l) => n + (l.hours ?? 0), 0);

  const idx = m.chapters.findIndex((ch) => ch.id === c.id);
  const prev = idx > 0 ? m.chapters[idx - 1] : null;
  const next = idx < m.chapters.length - 1 ? m.chapters[idx + 1] : null;

  return (
    <article className="w-full min-w-0 max-w-3xl mx-auto py-6 sm:py-10 chapter-px">
      <ReadingProgress />
      <Link
        to={`/${pathway.id}/module/${m.id}`}
        className="inline-flex items-center gap-1 text-xs text-ink-400 hover:text-accent-soft"
      >
        <ChevronLeft className="w-3.5 h-3.5" /> {m.title}
      </Link>

      <header className="mt-3 space-y-3 border-b border-ink-800 pb-6">
        <div className="text-xs uppercase tracking-[0.25em] text-accent-soft">
          Module {m.tier} · Chapter {idx + 1}
        </div>
        <h1 className="font-serif italic text-3xl sm:text-4xl leading-tight">
          {c.title}
        </h1>
        <p className="text-ink-300">{c.blurb}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-ink-400">
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> ~{totalHours}h
          </span>
          <span>{c.lessons.length} lessons</span>
        </div>
      </header>

      {registered ? (
        <Suspense fallback={<LoadingBody />}>
          <div className="ebook mt-8">
            <registered.Body />
          </div>
        </Suspense>
      ) : (
        <FallbackBody chapter={c} />
      )}

      <LessonChecklist module={m} chapter={c} />

      {registered && <ChapterQuiz registered={registered} moduleKey={`${m.id}/${c.id}`} />}

      <ChapterNav pathwayId={pathway.id} module={m} prev={prev} next={next} />
    </article>
  );
}

function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      if (ref.current) ref.current.style.width = `${pct * 100}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div
      className="sticky h-0.5 bg-ink-800 z-10 -mx-4 sm:-mx-7 lg:-mx-10 mb-4 top-[calc(env(safe-area-inset-top)+44px)] md:top-0"
      aria-hidden="true"
    >
      <span
        ref={ref}
        className="block h-full bg-accent transition-[width] duration-75"
        style={{ width: 0 }}
      />
    </div>
  );
}

function LoadingBody() {
  return (
    <div className="ebook mt-8 space-y-3">
      <div className="h-4 w-2/3 bg-ink-800 rounded animate-pulse" />
      <div className="h-4 w-full bg-ink-800 rounded animate-pulse" />
      <div className="h-4 w-5/6 bg-ink-800 rounded animate-pulse" />
    </div>
  );
}

function FallbackBody({ chapter }: { chapter: Chapter }) {
  return (
    <div className="ebook mt-8">
      <p className="text-ink-400 italic">
        Full ebook content for this chapter hasn't been written yet. The
        outline below shows what it'll cover.
      </p>
      {chapter.lessons.map((l) => (
        <section key={l.id}>
          <h2>{l.title}</h2>
          <p>
            <MathText>{l.summary}</MathText>
          </p>
          {l.topics.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {l.topics.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-ink-800 text-ink-300"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function LessonChecklist({ module: m, chapter: c }: { module: Module; chapter: Chapter }) {
  const { isDone, toggle } = useProgress();
  return (
    <section className="mt-12 card p-5">
      <h2 className="text-sm uppercase tracking-widest text-ink-400 mb-3">
        Lessons in this chapter
      </h2>
      <ul className="space-y-3">
        {c.lessons.map((l) => {
          const key = `${m.id}/${c.id}/${l.id}`;
          const done = isDone(key);
          return (
            <li key={l.id} className="flex items-start gap-3">
              <button
                onClick={() => toggle(key)}
                className="mt-0.5 shrink-0 text-accent-soft hover:scale-110 transition p-2 -m-2"
                aria-label={done ? "Mark incomplete" : "Mark complete"}
              >
                {done ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className={`text-sm font-medium ${
                      done ? "text-ink-400 line-through" : ""
                    }`}
                  >
                    {l.title}
                  </h3>
                  {l.hours ? (
                    <span className="text-[11px] text-ink-500 shrink-0">
                      ~{l.hours}h
                    </span>
                  ) : null}
                </div>
                {l.resources.length > 0 && (
                  <ul className="mt-1.5 space-y-1">
                    {l.resources.map((r) => (
                      <li key={r.url}>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-accent-soft hover:underline"
                        >
                          {iconFor(r.kind)}
                          <span>{r.title}</span>
                          {r.author ? (
                            <span className="text-ink-500">— {r.author}</span>
                          ) : null}
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ChapterQuiz({
  registered,
  moduleKey,
}: {
  registered: ReturnType<typeof getChapterContent>;
  moduleKey: string;
}) {
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);

  useEffect(() => {
    let alive = true;
    registered?.loadQuiz().then((q) => {
      if (alive) setQuestions(q);
    });
    return () => {
      alive = false;
    };
  }, [registered]);

  if (!questions || questions.length === 0) return null;

  return (
    <section className="mt-14">
      <Quiz
        questions={questions}
        storageKey={`learning.quiz.${moduleKey}.v1`}
      />
    </section>
  );
}

function ChapterNav({
  pathwayId,
  module: m,
  prev,
  next,
}: {
  pathwayId: string;
  module: Module;
  prev: Chapter | null;
  next: Chapter | null;
}) {
  return (
    <nav className="mt-14 pt-6 border-t border-ink-800 flex items-center justify-between gap-3">
      {prev ? (
        <Link
          to={`/${pathwayId}/module/${m.id}/chapter/${prev.id}`}
          className="card px-4 py-3 flex-1 max-w-[48%] hover:border-accent/60 transition"
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-500 flex items-center gap-1">
            <ChevronLeft className="w-3 h-3" /> Previous
          </div>
          <div className="text-sm font-medium mt-1 truncate">{prev.title}</div>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
      {next ? (
        <Link
          to={`/${pathwayId}/module/${m.id}/chapter/${next.id}`}
          className="card px-4 py-3 flex-1 max-w-[48%] hover:border-accent/60 transition text-right"
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-500 flex items-center gap-1 justify-end">
            Next <ChevronRight className="w-3 h-3" />
          </div>
          <div className="text-sm font-medium mt-1 truncate">{next.title}</div>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  );
}
