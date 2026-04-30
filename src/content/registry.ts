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
  "calculus/limits": () => import("./calculus/limits"),
  "calculus/derivatives": () => import("./calculus/derivatives"),
  "calculus/integrals": () => import("./calculus/integrals"),
  "calculus/series": () => import("./calculus/series"),
  "linear-algebra/vectors-spaces": () =>
    import("./linear-algebra/vectors-spaces"),
  "linear-algebra/matrices": () => import("./linear-algebra/matrices"),
  "linear-algebra/eigen": () => import("./linear-algebra/eigen"),
  "linear-algebra/inner-product": () =>
    import("./linear-algebra/inner-product"),
  "multivariable/partials": () => import("./multivariable/partials"),
  "multivariable/multi-integrals": () =>
    import("./multivariable/multi-integrals"),
  "multivariable/vector-calc": () => import("./multivariable/vector-calc"),
  "diff-eq/first-order": () => import("./diff-eq/first-order"),
  "diff-eq/second-order": () => import("./diff-eq/second-order"),
  "diff-eq/laplace": () => import("./diff-eq/laplace"),
  "diff-eq/systems": () => import("./diff-eq/systems"),
  "diff-eq/fourier-pde": () => import("./diff-eq/fourier-pde"),
  "number-theory/divisibility": () => import("./number-theory/divisibility"),
  "number-theory/modular": () => import("./number-theory/modular"),
  "number-theory/rsa": () => import("./number-theory/rsa"),
  "number-theory/ecdsa": () => import("./number-theory/ecdsa"),
  "probability/combinatorics": () => import("./probability/combinatorics"),
  "probability/rv": () => import("./probability/rv"),
  "probability/distributions": () => import("./probability/distributions"),
  "probability/clt-bayes": () => import("./probability/clt-bayes"),
  "complex-analysis/complex-numbers": () =>
    import("./complex-analysis/complex-numbers"),
  "complex-analysis/analytic": () => import("./complex-analysis/analytic"),
  "complex-analysis/contour": () => import("./complex-analysis/contour"),
  "complex-analysis/residues": () => import("./complex-analysis/residues"),
  "real-analysis/metric-spaces": () => import("./real-analysis/metric-spaces"),
  "real-analysis/sequences": () => import("./real-analysis/sequences"),
  "real-analysis/lebesgue": () => import("./real-analysis/lebesgue"),
  "abstract-algebra/groups": () => import("./abstract-algebra/groups"),
  "abstract-algebra/rings": () => import("./abstract-algebra/rings"),
  "abstract-algebra/galois": () => import("./abstract-algebra/galois"),
  "advanced-la/inner-product": () => import("./advanced-la/inner-product"),
  "advanced-la/spectral-thm": () => import("./advanced-la/spectral-thm"),
  "advanced-la/tensor": () => import("./advanced-la/tensor"),
  "advanced-la/hilbert": () => import("./advanced-la/hilbert"),
  "classical-mech/newton": () => import("./classical-mech/newton"),
  "classical-mech/lagrange": () => import("./classical-mech/lagrange"),
  "classical-mech/hamilton": () => import("./classical-mech/hamilton"),
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
