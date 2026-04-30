import { useState, type ReactNode } from "react";
import {
  Library,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

// ────────────────────────────────────────────────────────────
// ReferenceResources — chapter-level supplementary materials.
// ────────────────────────────────────────────────────────────

export interface ReferenceResource {
  title: string;
  author?: string;
  /** e.g. "~24h", "47 min", "Lectures 1–3" */
  duration?: string;
  url: string;
  note?: string;
}

export function ReferenceResources({ items }: { items: ReferenceResource[] }) {
  return (
    <aside className="not-italic my-6 card p-4 sm:p-5">
      <div className="flex items-center gap-2 text-accent-soft text-xs uppercase tracking-widest">
        <Library className="w-4 h-4" /> Reference resources
      </div>
      <p className="text-sm text-ink-300 mt-1">
        The chapter below is the primary teacher. These cover the same
        ground from other angles — pull one up if a section needs a second
        explanation, or queue a video for hands-busy time.
      </p>
      <ul className="mt-3 space-y-2.5">
        {items.map((c) => (
          <li key={c.url}>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2.5 rounded-lg border border-ink-800 hover:border-accent/60 active:bg-ink-900 transition"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-medium text-sm text-ink-100">
                  {c.title}
                </span>
                <ExternalLink className="w-3 h-3 text-ink-500 shrink-0" />
              </div>
              <div className="text-xs text-ink-500 mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5">
                {c.author && <span>{c.author}</span>}
                {c.duration && <span>· {c.duration}</span>}
              </div>
              {c.note && (
                <div className="text-xs text-ink-400 mt-1.5">{c.note}</div>
              )}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// ────────────────────────────────────────────────────────────
// Exercise — collapsible solution.
// ────────────────────────────────────────────────────────────

export function Exercise({
  prompt,
  children,
  number,
}: {
  prompt: ReactNode;
  children: ReactNode;
  number?: string | number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="not-italic my-5 rounded-xl border border-ink-800 bg-ink-900/40 overflow-hidden">
      <div className="px-4 py-3 sm:px-5">
        <div className="flex items-baseline gap-2 text-[11px] uppercase tracking-widest text-accent-soft">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Exercise{number !== undefined ? ` ${number}` : ""}</span>
        </div>
        <div className="mt-1 text-ink-100 text-[0.95rem] leading-relaxed">
          {prompt}
        </div>
      </div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full px-4 sm:px-5 py-2.5 text-left text-xs text-ink-400 hover:text-ink-200 border-t border-ink-800 flex items-center gap-1"
      >
        {open ? (
          <ChevronDown className="w-3.5 h-3.5" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5" />
        )}
        {open ? "Hide solution" : "Show solution"}
      </button>
      {open && (
        <div className="px-4 sm:px-5 py-4 border-t border-ink-800 bg-ink-950/40 text-sm text-ink-200 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Pitfall — common mistake / red-flag aside.
// ────────────────────────────────────────────────────────────

export function Pitfall({
  title = "Common pitfall",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="not-italic my-5 rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
      <div className="flex items-center gap-2 text-rose-300 text-[11px] uppercase tracking-widest">
        <AlertTriangle className="w-3.5 h-3.5" /> {title}
      </div>
      <div className="mt-1.5 text-sm text-ink-200 leading-relaxed">
        {children}
      </div>
    </aside>
  );
}

// ────────────────────────────────────────────────────────────
// Callout — neutral aside (definitions, "try it" hints).
// ────────────────────────────────────────────────────────────

export function Callout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <aside className="not-italic my-5 border-l-2 border-accent/60 pl-4 py-1 text-sm text-ink-300">
      <div className="text-[11px] uppercase tracking-widest text-accent-soft mb-1">
        {title}
      </div>
      <div>{children}</div>
    </aside>
  );
}
