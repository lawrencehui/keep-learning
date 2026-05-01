import { NavLink } from "react-router-dom";
import { syllabus } from "../data/syllabus";
import { useProgress } from "../hooks/useProgress";
import { ThemeToggle } from "./ThemeToggle";
import { ReadingSettings } from "./ReadingSettings";
import { Sparkles, X } from "lucide-react";

interface Props {
  /** When true, sidebar is rendered as a slide-in drawer (mobile). */
  mobile?: boolean;
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobile = false, open = false, onClose }: Props) {
  const { isDone } = useProgress();

  const inner = (
    <div className="flex flex-col h-full">
      <div className="px-5 pb-5 border-b border-ink-800 flex items-center justify-between safe-pt">
        <NavLink to="/" onClick={onClose} className="flex items-center gap-2">
          <span className="text-2xl">ψ</span>
          <div>
            <div className="font-serif italic text-lg leading-none">keep-learning</div>
            <div className="text-xs text-ink-400">Numbers → Quantum</div>
          </div>
        </NavLink>
        <div className="flex items-center gap-1 -mr-1">
          {!mobile && (
            <>
              <ReadingSettings />
              <ThemeToggle />
            </>
          )}
          {mobile && (
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 -mr-2 text-ink-400 hover:text-ink-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <nav className="px-3 py-4 space-y-2 overflow-y-auto flex-1 safe-pb">
        <NavLink
          to="/"
          end
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-3 rounded-lg text-sm ${
              isActive ? "bg-ink-800 text-ink-50" : "text-ink-300 hover:bg-ink-800/60"
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
              c.lessons.filter((l) => isDone(`${m.id}/${c.id}/${l.id}`)).length,
            0
          );
          const pct = total === 0 ? 0 : Math.round((done / total) * 100);
          return (
            <NavLink
              key={m.id}
              to={`/module/${m.id}`}
              onClick={onClose}
              className={({ isActive }) =>
                `block px-3 py-3 rounded-lg ${
                  isActive ? "bg-ink-800" : "hover:bg-ink-800/60"
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
    </div>
  );

  if (!mobile) {
    return (
      <aside className="hidden md:block md:w-64 lg:w-72 shrink-0 h-dvh sticky top-0 border-r border-ink-800 bg-ink-950/70 backdrop-blur-md">
        {inner}
      </aside>
    );
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-dvh w-[82%] max-w-sm bg-ink-950 border-r border-ink-800 transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {inner}
      </aside>
    </>
  );
}
