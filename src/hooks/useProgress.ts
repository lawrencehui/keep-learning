import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "learning.progress.v1";

export interface LastVisited {
  moduleId: string;
  chapterId: string;
  ts: number;
  scrollPct?: number;
}

export interface ProgressState {
  /** keys are `${moduleId}/${chapterId}/${lessonId}` */
  completed: Record<string, boolean>;
  /** ISO date strings (YYYY-MM-DD) on which user marked anything complete */
  studyDays: string[];
  /** the chapter the user last opened (for "Continue learning") */
  lastVisited: LastVisited | null;
}

const initial: ProgressState = {
  completed: {},
  studyDays: [],
  lastVisited: null,
};

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw);
    return { ...initial, ...parsed };
  } catch {
    return initial;
  }
}

function save(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Safari private mode etc. — silently drop.
  }
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(load);

  useEffect(() => {
    save(state);
  }, [state]);

  const isDone = useCallback(
    (key: string) => Boolean(state.completed[key]),
    [state]
  );

  const toggle = useCallback((key: string) => {
    setState((prev) => {
      const wasDone = Boolean(prev.completed[key]);
      const completed = { ...prev.completed };
      if (wasDone) delete completed[key];
      else completed[key] = true;

      const today = todayISO();
      const studyDays = !wasDone && !prev.studyDays.includes(today)
        ? [...prev.studyDays, today]
        : prev.studyDays;

      return { ...prev, completed, studyDays };
    });
  }, []);

  const markVisited = useCallback((moduleId: string, chapterId: string) => {
    setState((prev) => {
      const same =
        prev.lastVisited?.moduleId === moduleId &&
        prev.lastVisited?.chapterId === chapterId;
      return {
        ...prev,
        lastVisited: {
          moduleId,
          chapterId,
          ts: Date.now(),
          scrollPct: same ? prev.lastVisited?.scrollPct : 0,
        },
      };
    });
  }, []);

  const updateScroll = useCallback(
    (moduleId: string, chapterId: string, scrollPct: number) => {
      setState((prev) => {
        if (
          !prev.lastVisited ||
          prev.lastVisited.moduleId !== moduleId ||
          prev.lastVisited.chapterId !== chapterId
        ) {
          return prev;
        }
        const prevPct = prev.lastVisited.scrollPct ?? 0;
        if (Math.abs(prevPct - scrollPct) < 0.01) return prev;
        return {
          ...prev,
          lastVisited: { ...prev.lastVisited, scrollPct, ts: Date.now() },
        };
      });
    },
    []
  );

  const reset = useCallback(() => setState(initial), []);

  return { state, isDone, toggle, markVisited, updateScroll, reset };
}

/** Compute current daily streak ending today (or yesterday). */
export function currentStreak(studyDays: string[]): number {
  if (studyDays.length === 0) return 0;
  const set = new Set(studyDays);
  let streak = 0;
  const cursor = new Date();
  // Allow today OR yesterday as the endpoint of the streak.
  if (!set.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!set.has(cursor.toISOString().slice(0, 10))) return 0;
  }
  while (set.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
