import { Link } from "react-router-dom";
import { syllabus, allLessonIds } from "../data/syllabus";
import { useProgress, currentStreak } from "../hooks/useProgress";
import { Flame, BookOpen, Target } from "lucide-react";

export function Dashboard() {
  const { state, isDone } = useProgress();
  const total = allLessonIds.length;
  const done = allLessonIds.filter((k) => isDone(k)).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const streak = currentStreak(state.studyDays);

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-8 sm:py-12 space-y-10 safe-pl safe-pr">
      <header>
        <div className="text-xs uppercase tracking-[0.25em] text-ink-400">
          Daily learning, compounding.
        </div>
        <h1 className="font-serif italic text-4xl sm:text-5xl mt-2">From numbers to quantum.</h1>
        <p className="mt-3 text-ink-300 max-w-2xl">
          A self-paced curriculum modeled on MIT's path through math and
          physics, all the way to quantum information. Mark lessons as you go;
          a daily streak keeps you honest.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat icon={<Flame className="w-5 h-5" />} label="Current streak" value={`${streak} day${streak === 1 ? "" : "s"}`} />
        <Stat icon={<BookOpen className="w-5 h-5" />} label="Lessons completed" value={`${done} / ${total}`} />
        <Stat icon={<Target className="w-5 h-5" />} label="Overall progress" value={`${pct}%`} />
      </section>

      <section>
        <h2 className="text-lg font-medium mb-3">The path</h2>
        <ol className="space-y-2">
          {syllabus.map((m) => {
            const t = m.chapters.reduce((n, c) => n + c.lessons.length, 0);
            const d = m.chapters.reduce(
              (n, c) => n + c.lessons.filter((l) => isDone(`${m.id}/${c.id}/${l.id}`)).length,
              0
            );
            const pct = t === 0 ? 0 : Math.round((d / t) * 100);
            return (
              <li key={m.id}>
                <Link
                  to={`/module/${m.id}`}
                  className="card p-4 flex items-center gap-4 hover:border-accent/60 transition"
                >
                  <span className="text-[11px] tracking-widest uppercase text-accent-soft w-10 shrink-0">
                    {m.tier}
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium">{m.title}</span>
                    <span className="block text-sm text-ink-400">{m.subtitle}</span>
                  </span>
                  <span className="text-xs text-ink-400 w-16 text-right">{pct}%</span>
                  <span className="hidden sm:block w-32 h-1 rounded-full bg-ink-800 overflow-hidden">
                    <span className="block h-full bg-accent" style={{ width: `${pct}%` }} />
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
      <div className="mt-2 text-2xl font-medium">{value}</div>
    </div>
  );
}
