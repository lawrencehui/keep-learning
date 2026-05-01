import { NavLink } from "react-router-dom";
import { syllabus } from "../data/syllabus";
import { useProgress } from "../hooks/useProgress";
import { ThemeToggle } from "./ThemeToggle";
import { ReadingSettings } from "./ReadingSettings";
import {
  Sparkles,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface Props {
  /** When true, sidebar is rendered as a slide-in drawer (mobile). */
  mobile?: boolean;
  open?: boolean;
  onClose?: () => void;
  /** Desktop collapsed state (ignored when mobile). */
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
}

export function Sidebar({
  mobile = false,
  open = false,
  onClose,
  collapsed = false,
  onToggleCollapsed,
}: Props) {
  const { isDone } = useProgress();

  // Collapsed-strip rendering for desktop only.
  if (!mobile && collapsed) {
    return (
      <aside
        className="hidden md:flex flex-col w-12 shrink-0 h-dvh sticky top-0 border-r border-ink-800 bg-ink-950/70 backdrop-blur-md items-center py-3 gap-2"
        aria-label="Collapsed sidebar"
      >
        <button
          onClick={onToggleCollapsed}
          aria-label="Expand sidebar"
          className="p-2 rounded-lg text-ink-300 hover:text-ink-100 hover:bg-ink-800/60"
        >
          <PanelLeftOpen className="w-5 h-5" />
        </button>
        <NavLink
          to="/"
          aria-label="Dashboard"
          className="text-2xl leading-none mt-1"
        >
          <span aria-hidden="true">ψ</span>
        </NavLink>
        <div className="mt-auto flex flex-col items-center gap-1">
          <ReadingSettings />
          <ThemeToggle />
        </div>
      </aside>
    );
  }

  const inner = (
    <div className="flex flex-col h-full">
      <div className="px-4 pb-4 pt-2 border-b border-ink-800 flex items-center gap-2 safe-pt">
        <NavLink
          to="/"
          onClick={onClose}
          className="flex items-center gap-2 min-w-0 flex-1"
        >
          <span className="text-2xl shrink-0">ψ</span>
          <div className="min-w-0">
            <div className="font-serif italic text-base leading-none truncate">
              keep-learning
            </div>
            <div className="text-[11px] text-ink-400 truncate hidden lg:block">
              Numbers → Quantum
            </div>
          </div>
        </NavLink>
        {!mobile && (
          <button
            onClick={onToggleCollapsed}
            aria-label="Collapse sidebar"
            className="p-2 rounded-lg text-ink-300 hover:text-ink-100 hover:bg-ink-800/60 shrink-0"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        )}
        {mobile && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 -mr-1 text-ink-400 hover:text-ink-100 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="px-3 py-4 space-y-2 overflow-y-auto flex-1">
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

      <div className="px-3 py-3 border-t border-ink-800 flex items-center gap-1 safe-pb">
        <ReadingSettings />
        <ThemeToggle />
      </div>
    </div>
  );

  if (!mobile) {
    return (
      <aside className="hidden md:block md:w-60 lg:w-72 shrink-0 h-dvh sticky top-0 border-r border-ink-800 bg-ink-950/70 backdrop-blur-md">
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
