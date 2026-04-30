import type { ComponentType, LazyExoticComponent } from "react";

export interface QuizQuestion {
  /** Prompt text. KaTeX inline `$...$` and block `$$...$$` supported. */
  prompt: string;
  /** Choice texts (also KaTeX-able). */
  options: string[];
  /** Index of the correct option. */
  correct: number;
  /** Shown after the user answers. */
  explanation?: string;
}

export interface ChapterContentModule {
  default: ComponentType;
  quiz: QuizQuestion[];
}

export type ChapterContentLoader = () => Promise<ChapterContentModule>;

/** Wraps a loader with React.lazy for the body component. */
export interface RegisteredChapter {
  Body: LazyExoticComponent<ComponentType>;
  loadQuiz: () => Promise<QuizQuestion[]>;
}
