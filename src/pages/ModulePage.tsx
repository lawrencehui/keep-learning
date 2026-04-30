import { Link, useParams } from "react-router-dom";
import { syllabus } from "../data/syllabus";
import { useProgress } from "../hooks/useProgress";
import { MathText } from "../components/MathBlock";
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  Video,
  GraduationCap,
  BookOpen,
  FileText,
  Wrench,
  ScrollText,
} from "lucide-react";
import type { Resource } from "../types";

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

export function ModulePage() {
  const { moduleId } = useParams();
  const m = syllabus.find((mod) => mod.id === moduleId);
  const { isDone, toggle } = useProgress();

  if (!m) {
    return (
      <div className="p-12">
        <p className="text-ink-300">Module not found.</p>
        <Link to="/" className="text-accent-soft underline">Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-12 space-y-8">
      <header className="space-y-2">
        <div className="text-xs uppercase tracking-[0.25em] text-accent-soft">
          Tier {m.tier}
        </div>
        <h1 className="font-serif italic text-4xl">{m.title}</h1>
        <p className="text-ink-300">{m.subtitle}</p>

        <div className="pt-2 flex flex-wrap gap-3 text-xs text-ink-400">
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
                  <Link to={`/m/${p}`} className="text-accent-soft hover:underline">
                    {p}
                  </Link>
                  {i < m.prerequisites.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          )}
        </div>
      </header>

      {m.chapters.map((c) => (
        <section key={c.id} className="card p-6">
          <h2 className="text-xl font-medium">{c.title}</h2>
          <p className="text-sm text-ink-400 mt-1">{c.blurb}</p>

          <ul className="mt-4 space-y-3">
            {c.lessons.map((l) => {
              const key = `${m.id}/${c.id}/${l.id}`;
              const done = isDone(key);
              return (
                <li key={l.id} className="border-t border-ink-800 pt-3 first:border-t-0 first:pt-0">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggle(key)}
                      className="mt-1 shrink-0 text-accent-soft hover:scale-110 transition"
                      aria-label={done ? "Mark incomplete" : "Mark complete"}
                    >
                      {done ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className={`font-medium ${done ? "text-ink-400 line-through" : ""}`}>
                          {l.title}
                        </h3>
                        {l.hours ? (
                          <span className="text-[11px] text-ink-500">~{l.hours}h</span>
                        ) : null}
                      </div>
                      <div className="prose-tight text-sm mt-1">
                        <MathText>{l.summary}</MathText>
                      </div>
                      {l.topics.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {l.topics.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-ink-800 text-ink-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      {l.resources.length > 0 && (
                        <ul className="mt-3 space-y-1">
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
                              {r.note ? (
                                <span className="ml-2 text-[11px] text-ink-500">
                                  {r.note}
                                </span>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
