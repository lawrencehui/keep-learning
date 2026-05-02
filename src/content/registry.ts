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
  "em-waves/maxwell": () => import("./em-waves/maxwell"),
  "em-waves/waves": () => import("./em-waves/waves"),
  "em-waves/optics": () => import("./em-waves/optics"),
  "qm-1/wave-particle": () => import("./qm-1/wave-particle"),
  "qm-1/schrodinger": () => import("./qm-1/schrodinger"),
  "qm-1/1d-systems": () => import("./qm-1/1d-systems"),
  "qm-1/operators": () => import("./qm-1/operators"),
  "qm-2/dirac": () => import("./qm-2/dirac"),
  "qm-2/spin": () => import("./qm-2/spin"),
  "qm-2/entanglement": () => import("./qm-2/entanglement"),
  "qm-2/perturbation": () => import("./qm-2/perturbation"),
  "quantum-computing/qubits": () => import("./quantum-computing/qubits"),
  "quantum-computing/gates": () => import("./quantum-computing/gates"),
  "quantum-computing/algorithms": () =>
    import("./quantum-computing/algorithms"),
  "quantum-computing/shor": () => import("./quantum-computing/shor"),
  "quantum-computing/qec": () => import("./quantum-computing/qec"),
  "quantum-computing/pqc": () => import("./quantum-computing/pqc"),
  "linalg-ml/vectors-spaces": () => import("./linalg-ml/vectors-spaces"),
  "linalg-ml/linear-maps": () => import("./linalg-ml/linear-maps"),
  "linalg-ml/four-subspaces": () => import("./linalg-ml/four-subspaces"),
  "linalg-ml/change-basis": () => import("./linalg-ml/change-basis"),
  "eigen-svd/eigen": () => import("./eigen-svd/eigen"),
  "eigen-svd/diagonalisation": () => import("./eigen-svd/diagonalisation"),
  "eigen-svd/svd": () => import("./eigen-svd/svd"),
  "eigen-svd/projections-qr": () => import("./eigen-svd/projections-qr"),
  "matrix-calc/gradients": () => import("./matrix-calc/gradients"),
  "matrix-calc/matrix-derivatives": () =>
    import("./matrix-calc/matrix-derivatives"),
  "matrix-calc/least-squares": () => import("./matrix-calc/least-squares"),
  "prob-foundations/axioms-bayes": () =>
    import("./prob-foundations/axioms-bayes"),
  "prob-foundations/discrete-continuous": () =>
    import("./prob-foundations/discrete-continuous"),
  "prob-foundations/joint-distributions": () =>
    import("./prob-foundations/joint-distributions"),
  "prob-foundations/mgf-clt": () => import("./prob-foundations/mgf-clt"),
  "stat-inference/mle": () => import("./stat-inference/mle"),
  "stat-inference/fisher-information": () =>
    import("./stat-inference/fisher-information"),
  "stat-inference/hypothesis-testing": () =>
    import("./stat-inference/hypothesis-testing"),
  "stat-inference/bayesian-inference": () =>
    import("./stat-inference/bayesian-inference"),
  "ml-fundamentals/linear-regression": () =>
    import("./ml-fundamentals/linear-regression"),
  "ml-fundamentals/logistic-softmax": () =>
    import("./ml-fundamentals/logistic-softmax"),
  "ml-fundamentals/pca": () => import("./ml-fundamentals/pca"),
  "ml-fundamentals/loss-functions": () =>
    import("./ml-fundamentals/loss-functions"),
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
