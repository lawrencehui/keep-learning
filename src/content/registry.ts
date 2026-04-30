import { lazy } from "react";
import type {
  ChapterContentLoader,
  RegisteredChapter,
} from "./types";

/**
 * Map of `${moduleId}/${chapterId}` → lazy loader for that chapter's ebook content.
 * Add new chapters here as they're written.
 */
const loaders: Record<string, ChapterContentLoader> = {
  "foundations/logic-sets": () => import("./foundations/logic-sets"),
  "foundations/precalc": () => import("./foundations/precalc"),
};

/** Returns the registered chapter (lazy body + quiz loader) or null if no content yet. */
export function getChapterContent(
  moduleId: string,
  chapterId: string
): RegisteredChapter | null {
  const key = `${moduleId}/${chapterId}`;
  const loader = loaders[key];
  if (!loader) return null;
  return {
    Body: lazy(() => loader().then((m) => ({ default: m.default }))),
    loadQuiz: () => loader().then((m) => m.quiz),
  };
}

export function hasChapterContent(moduleId: string, chapterId: string): boolean {
  return Boolean(loaders[`${moduleId}/${chapterId}`]);
}
