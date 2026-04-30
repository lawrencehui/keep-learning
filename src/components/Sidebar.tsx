import { NavLink } from "react-router-dom";
import { syllabus } from "../data/syllabus";
import { useProgress } from "../hooks/useProgress";
import { Sparkles } from "lucide-react";

export function Sidebar() {
  const { isDone } = useProgress();

  return (
    <aside className="w-72 shrink-0 h-screen overflow-y-auto border-r border-ink-800 bg-ink-950/70 backdrop-blur-md sticky top-0">
      <div className="px-5 py-5 border-b border-ink-800">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-2xl">ψ</span>
          <div>
            <div className="font-serif italic text-lg leading-none">Foundations</div>
            <div className="text-xs text-ink-400">Numbers → Quantum</div>
          </div>
        </NavLink>
      </div>

      <nav className="px-3 py-4 space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
              isActive ? "bg-ink-800 text-white" : "text-ink-300 hover:bg-ink-900"
            }`
          }
        >
          <Sparkles className="w-4 h-4" /> Dashboard
        </NavLink>

        {syllabus.map((m) => {
          const total = m.chapters.reduce((n, c) => n + c.lessons.length, 0);
          const done = m.chapters.reduce(
            (n, c) =>
              n +
              c.lessons.filter((l) => isDone(`${m.id}/${c.id}/${l.id}`))
                .length,
            0
          );
          const pct = total === 0 ? 0 : Math.round((done / total) * 100);
          return (
            <NavLink
              key={m.id}
              to={`/m/${m.id}`}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg ${
                  isActive ? "bg-ink-800" : "hover:bg-ink-900"
                }`
              }
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] uppercase tracking-widest text-accent-soft">
                  {m.tier}
                </span>
                <span className="text-sm font-medium">{m.title}</span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-ink-800 overflow-hidden">
                <div
                  className="h-full bg-accent transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-1 text-[10px] text-ink-500">
                {done}/{total} lessons
              </div>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
