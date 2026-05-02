export type ResourceKind = "video" | "course" | "book" | "article" | "tool" | "paper";

export interface Resource {
  kind: ResourceKind;
  title: string;
  author?: string;
  url: string;
  note?: string;
}

export interface Lesson {
  id: string;
  title: string;
  /** TeX-flavored summary; rendered with KaTeX inline ($...$) and block ($$...$$). */
  summary: string;
  topics: string[];
  resources: Resource[];
  /** Estimated study time in hours. */
  hours?: number;
}

export interface Chapter {
  id: string;
  title: string;
  blurb: string;
  lessons: Lesson[];
}

export interface Module {
  id: string;
  /** Roman module number for grouping (e.g. "I — Foundations") */
  tier: string;
  title: string;
  subtitle: string;
  /** University reference courses, e.g. "MIT 18.01" */
  references: string[];
  prerequisites: string[]; // module ids
  chapters: Chapter[];
}

export interface Pathway {
  id: string;
  title: string;
  /** One-line tagline shown on cards */
  subtitle: string;
  /** Longer description shown on the pathway dashboard */
  description: string;
  /** Symbol shown on the picker card (a single character or short symbol) */
  emblem: string;
  modules: Module[];
}
