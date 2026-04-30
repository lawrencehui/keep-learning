import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function MetricSpacesBody() {
  return (
    <>
      <p>
        Real analysis is calculus done with the safety off. Every
        argument is forced down to first principles — the{" "}
        <InlineMath math="\varepsilon" />–<InlineMath math="\delta" />{" "}
        definitions, the careful set-theoretic constructions, the
        rigorous proofs that limit-and-derivative interchange{" "}
        <em>only when</em> hypotheses we used to wave at actually
        hold. The pay-off: a foundation strong enough to support
        functional analysis, measure theory, probability, and
        ultimately the mathematical structure of quantum mechanics
        (Hilbert spaces, observables, the spectral theorem in
        infinite dimensions).
      </p>
      <p>
        We open with <strong>metric spaces</strong> — the right
        abstraction for "distance" — and the topology they generate.
        Concepts we used informally in calculus (open intervals,
        convergent sequences, continuous functions) get redefined for
        any setting with a notion of distance. The big new ideas:{" "}
        <strong>compactness</strong> (a generalisation of closed-and-
        bounded that powers nearly every existence theorem in
        analysis) and <strong>completeness</strong> (the property
        that says limits stay inside).
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.100A — Real Analysis (full course)",
            author: "MIT OCW",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
            note: "Lectures on metric spaces, sequences, continuity, the works.",
          },
          {
            title: "Rudin — Principles of Mathematical Analysis",
            author: "Walter Rudin",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Principles_of_Mathematical_Analysis",
            note: "Affectionately called 'Baby Rudin'. The standard rigorous reference. Chapter 2 covers metric spaces.",
          },
          {
            title: "Tao — Analysis I",
            author: "Terence Tao",
            duration: "Reading",
            url: "https://terrytao.wordpress.com/books/analysis-i/",
            note: "Builds analysis from the natural numbers up. Slower than Rudin, much more accessible.",
          },
          {
            title: "Abbott — Understanding Analysis",
            author: "Stephen Abbott",
            duration: "Reading",
            url: "https://www.springer.com/book/9781493927111",
            note: "Friendliest first introduction to real analysis. Strong on motivation.",
          },
          {
            title: "Real Analysis (Royden, Stein-Shakarchi)",
            author: "various",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Real_analysis",
            note: "For graduate-level treatment — useful once Rudin has been digested.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · From <InlineMath math="\mathbb{R}" /> to metric spaces</h2>

      <p>
        A <strong>metric space</strong> is a set{" "}
        <InlineMath math="X" /> together with a function{" "}
        <InlineMath math="d : X \times X \to [0, \infty)" /> (the
        "distance") satisfying:
      </p>

      <Callout title="Metric axioms">
        <ol>
          <li>
            <strong>Identity:</strong>{" "}
            <InlineMath math="d(x, y) = 0 \iff x = y" />.
          </li>
          <li>
            <strong>Symmetry:</strong>{" "}
            <InlineMath math="d(x, y) = d(y, x)" />.
          </li>
          <li>
            <strong>Triangle inequality:</strong>{" "}
            <InlineMath math="d(x, z) \leq d(x, y) + d(y, z)" />.
          </li>
        </ol>
      </Callout>

      <p>Examples:</p>
      <ul>
        <li>
          <InlineMath math="\mathbb{R}" /> with{" "}
          <InlineMath math="d(x, y) = |x - y|" />. The original.
        </li>
        <li>
          <InlineMath math="\mathbb{R}^n" /> with the Euclidean
          metric{" "}
          <InlineMath math="d(\mathbf x, \mathbf y) = \sqrt{\sum (x_i - y_i)^2}" />.
        </li>
        <li>
          <InlineMath math="\mathbb{R}^n" /> with the <em>taxicab</em>{" "}
          (
          <InlineMath math="\ell^1" />){" "}
          metric{" "}
          <InlineMath math="d_1(\mathbf x, \mathbf y) = \sum |x_i - y_i|" />,
          or the <em>max</em> (<InlineMath math="\ell^\infty" />)
          metric{" "}
          <InlineMath math="d_\infty(\mathbf x, \mathbf y) = \max_i |x_i - y_i|" />.
        </li>
        <li>
          The space <InlineMath math="C[0, 1]" /> of continuous real-
          valued functions on{" "}
          <InlineMath math="[0, 1]" /> with the supremum metric{" "}
          <InlineMath math="d(f, g) = \sup_{x \in [0, 1]} |f(x) - g(x)|" />.
        </li>
        <li>
          Any set <InlineMath math="X" /> with the discrete metric{" "}
          <InlineMath math="d(x, y) = 0" /> if{" "}
          <InlineMath math="x = y" /> else 1. Strange but legal.
        </li>
      </ul>

      <p>
        The point of the abstraction: theorems proved for general
        metric spaces apply to <em>all</em> the examples above. We
        pay once and use everywhere.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Open and closed sets</h2>

      <p>
        The <strong>open ball</strong> of radius{" "}
        <InlineMath math="r" /> around <InlineMath math="x" />:
      </p>
      <BlockMath math="B(x, r) = \{ y \in X : d(x, y) < r \}." />

      <p>
        A set <InlineMath math="U \subseteq X" /> is{" "}
        <strong>open</strong> if every point of{" "}
        <InlineMath math="U" /> has a small open ball entirely inside{" "}
        <InlineMath math="U" />. A set is <strong>closed</strong> if
        its complement is open.
      </p>

      <p>
        Properties (fall out from the definitions):
      </p>
      <ul>
        <li>
          Arbitrary unions of open sets are open.
        </li>
        <li>
          Finite intersections of open sets are open.
        </li>
        <li>
          By complement: arbitrary intersections of closed sets are
          closed; finite unions of closed sets are closed.
        </li>
        <li>
          The whole space and the empty set are <em>both</em> open
          and closed.
        </li>
      </ul>

      <Pitfall>
        "Closed" is not the opposite of "open." In{" "}
        <InlineMath math="\mathbb{R}" />, the half-open interval{" "}
        <InlineMath math="[0, 1)" /> is neither open nor closed.{" "}
        <InlineMath math="\mathbb{R}" /> itself is both. Sets can be
        any of: open, closed, both (called <em>clopen</em>), or
        neither.
      </Pitfall>

      <h3>Closure, interior, boundary</h3>

      <p>
        <strong>Closure</strong>{" "}
        <InlineMath math="\bar A" />: smallest closed set containing{" "}
        <InlineMath math="A" />. Equivalently, all limit points of
        sequences in <InlineMath math="A" />.{" "}
        <strong>Interior</strong>{" "}
        <InlineMath math="A^\circ" />: largest open set inside{" "}
        <InlineMath math="A" />.{" "}
        <strong>Boundary</strong>{" "}
        <InlineMath math="\partial A = \bar A \setminus A^\circ" />.
      </p>

      <p>
        Worked: <InlineMath math="A = (0, 1] \subset \mathbb{R}" />.
        Closure <InlineMath math="[0, 1]" />, interior{" "}
        <InlineMath math="(0, 1)" />, boundary{" "}
        <InlineMath math="\{0, 1\}" />.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Sequences and convergence</h2>

      <p>
        A sequence <InlineMath math="(x_n)" /> in{" "}
        <InlineMath math="X" /> <strong>converges</strong> to{" "}
        <InlineMath math="x \in X" /> if for every{" "}
        <InlineMath math="\varepsilon > 0" /> there is an{" "}
        <InlineMath math="N" /> such that{" "}
        <InlineMath math="d(x_n, x) < \varepsilon" /> for all{" "}
        <InlineMath math="n \geq N" />. Same definition as in
        Calculus, just with <InlineMath math="d" /> in place of{" "}
        <InlineMath math="|\cdot|" />.
      </p>

      <p>
        Limits, when they exist, are unique (proof: assume two
        limits and use the triangle inequality to bound their
        distance below by anything). A convergent sequence is{" "}
        <strong>bounded</strong> (sits in some ball).
      </p>

      <h3>Closure via sequences</h3>

      <p>
        A point <InlineMath math="x" /> is in the closure{" "}
        <InlineMath math="\bar A" /> iff there's a sequence in{" "}
        <InlineMath math="A" /> converging to <InlineMath math="x" />.
        Equivalent characterisations of "closed":
      </p>
      <ul>
        <li>
          The complement is open.
        </li>
        <li>
          Every convergent sequence in <InlineMath math="A" /> has
          its limit in <InlineMath math="A" />.
        </li>
        <li>
          Equals its own closure.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Compactness</h2>

      <Callout title="Compactness — the central concept">
        A subset <InlineMath math="K \subseteq X" /> is{" "}
        <strong>compact</strong> if every open cover has a finite
        subcover. That is, whenever{" "}
        <InlineMath math="K \subseteq \bigcup_\alpha U_\alpha" /> with
        each <InlineMath math="U_\alpha" /> open, some finite
        sub-collection still covers <InlineMath math="K" />.
      </Callout>

      <p>
        This is one of those definitions that looks bizarre on first
        reading but turns out to be exactly the right
        generalisation of "finite". Compact sets behave a lot like
        finite ones in many proofs — and the corresponding theorems
        are some of the most-used tools in analysis.
      </p>

      <h3>Equivalent: sequential compactness</h3>

      <p>
        A subset is <strong>sequentially compact</strong> if every
        sequence has a convergent subsequence (with limit in the
        set). For metric spaces, sequential compactness is{" "}
        <em>equivalent</em> to compactness. So in practice, you can
        check either definition.
      </p>

      <h3>Heine–Borel theorem</h3>

      <Callout title="Heine–Borel (in <InlineMath math='\mathbb{R}^n' />)">
        A subset of <InlineMath math="\mathbb{R}^n" /> is compact iff
        it is closed and bounded.
      </Callout>

      <p>
        This is incredibly useful and not at all generalisable —
        e.g. the closed unit ball in an infinite-dimensional Banach
        space (the analogue of "closed and bounded") is{" "}
        <em>not</em> compact. The "closed and bounded ⇒ compact"
        direction is a Euclidean-space miracle.
      </p>

      <p>
        Why compactness is the right concept (some headlines):
      </p>
      <ul>
        <li>
          A continuous function on a compact set attains its max and
          min (Extreme Value Theorem). This is the "infinity-
          dimensional" version of "a continuous function on{" "}
          <InlineMath math="[a, b]" /> attains its max" from
          calculus.
        </li>
        <li>
          A continuous function on a compact set is{" "}
          <em>uniformly continuous</em> (the same{" "}
          <InlineMath math="\delta" /> works for every point — much
          stronger than ordinary continuity).
        </li>
        <li>
          A continuous bijection from a compact space to a Hausdorff
          space is automatically a homeomorphism.
        </li>
        <li>
          The Bolzano–Weierstrass theorem (every bounded sequence in{" "}
          <InlineMath math="\mathbb{R}" /> has a convergent
          subsequence) is sequential compactness of closed bounded
          sets in <InlineMath math="\mathbb{R}" />.
        </li>
      </ul>

      <Pitfall>
        Compactness is the workhorse of existence proofs in analysis.
        "There exists an{" "}
        <InlineMath math="x" /> minimising some functional" almost
        always uses: take a minimising sequence, extract a
        convergent subsequence by compactness, the limit is the
        minimiser. If the relevant set isn't compact, the proof
        fails — and there might genuinely be no minimiser, even
        though the infimum exists.
      </Pitfall>

      <Exercise
        number="4.1"
        prompt={
          <>
            Show that the closed unit ball in{" "}
            <InlineMath math="\ell^2" /> (the space of square-summable
            sequences) is <em>not</em> compact, by exhibiting a
            sequence with no convergent subsequence.
          </>
        }
      >
        <p>
          Consider the standard basis{" "}
          <InlineMath math="e_n = (0, 0, \dots, 0, 1, 0, \dots)" />{" "}
          (the 1 in position <InlineMath math="n" />). Each has{" "}
          <InlineMath math="\|e_n\| = 1" />, so they're in the closed
          unit ball.
        </p>
        <p>
          For <InlineMath math="m \neq n" />,{" "}
          <InlineMath math="\|e_m - e_n\| = \sqrt 2" />. So no
          subsequence is Cauchy, and no subsequence converges. The
          ball is bounded and closed, but not compact. Heine–Borel
          fails in infinite dimensions.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Completeness</h2>

      <p>
        A sequence <InlineMath math="(x_n)" /> is{" "}
        <strong>Cauchy</strong> if for every{" "}
        <InlineMath math="\varepsilon > 0" /> there exists{" "}
        <InlineMath math="N" /> such that{" "}
        <InlineMath math="d(x_m, x_n) < \varepsilon" /> for all{" "}
        <InlineMath math="m, n \geq N" />. The terms eventually
        cluster together, regardless of where they cluster.
      </p>

      <p>
        Every convergent sequence is Cauchy (triangle inequality).
        The converse — every Cauchy sequence converges — is the
        definition of <strong>completeness</strong>.
      </p>

      <Callout title="Completeness">
        A metric space is <strong>complete</strong> if every Cauchy
        sequence converges (within the space).
      </Callout>

      <p>
        Examples and non-examples:
      </p>
      <ul>
        <li>
          <InlineMath math="\mathbb{R}" /> is complete. (This is, in
          a sense, the defining property of{" "}
          <InlineMath math="\mathbb{R}" /> — the rationals'
          completion.)
        </li>
        <li>
          <InlineMath math="\mathbb{R}^n" /> with any standard metric
          is complete.
        </li>
        <li>
          <InlineMath math="\mathbb{Q}" /> is <em>not</em> complete:{" "}
          <InlineMath math="3, 3.1, 3.14, 3.141, \dots" /> is Cauchy
          but its limit (<InlineMath math="\pi" />) is not in{" "}
          <InlineMath math="\mathbb{Q}" />.
        </li>
        <li>
          The space <InlineMath math="C[0, 1]" /> with the sup metric
          is complete. Same space with the{" "}
          <InlineMath math="L^1" /> metric is not.
        </li>
      </ul>

      <h3>Banach spaces and Hilbert spaces</h3>

      <p>
        A complete normed vector space is a{" "}
        <strong>Banach space</strong>; a complete inner-product space
        is a <strong>Hilbert space</strong>. These are the
        infinite-dimensional analogues of the finite-dimensional
        vector spaces from linear algebra.
      </p>

      <p>
        <strong>Quantum mechanics' Hilbert space</strong> — the home
        of all wavefunctions — is exactly an infinite-dimensional
        complex Hilbert space (typically{" "}
        <InlineMath math="L^2(\mathbb{R}^3)" /> for a particle in
        space). Its completeness is essential: Cauchy sequences of
        wavefunctions must converge to wavefunctions, otherwise
        approximation theorems and limiting procedures break.
      </p>

      <h3>Banach contraction theorem</h3>

      <Callout title="Banach fixed-point theorem">
        Let <InlineMath math="X" /> be a complete metric space and{" "}
        <InlineMath math="T : X \to X" /> a contraction (i.e.{" "}
        <InlineMath math="d(T x, T y) \leq c \, d(x, y)" /> for some{" "}
        <InlineMath math="c < 1" />). Then{" "}
        <InlineMath math="T" /> has a unique fixed point{" "}
        <InlineMath math="x^*" /> with{" "}
        <InlineMath math="T(x^*) = x^*" />, and iterating from any
        starting point converges to it geometrically.
      </Callout>

      <p>
        This is the existence-and-uniqueness theorem behind:
      </p>
      <ul>
        <li>
          Picard–Lindelöf for ODEs (under Lipschitz conditions, the
          equation <InlineMath math="y' = f(x, y)" /> has a unique
          local solution).
        </li>
        <li>
          The implicit function theorem.
        </li>
        <li>
          Newton's method, quadratic convergence.
        </li>
        <li>
          Stochastic processes' invariant distributions.
        </li>
      </ul>

      <p>
        Same theorem, many incarnations.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Continuity</h2>

      <p>
        Three equivalent definitions of "<InlineMath math="f" /> is
        continuous at <InlineMath math="x_0" />":
      </p>

      <ul>
        <li>
          <strong>ε–δ:</strong> for every{" "}
          <InlineMath math="\varepsilon > 0" /> there exists{" "}
          <InlineMath math="\delta > 0" /> such that{" "}
          <InlineMath math="d_X(x, x_0) < \delta \Rightarrow d_Y(f(x), f(x_0)) < \varepsilon" />.
        </li>
        <li>
          <strong>Sequential:</strong> for every sequence{" "}
          <InlineMath math="x_n \to x_0" />,{" "}
          <InlineMath math="f(x_n) \to f(x_0)" />.
        </li>
        <li>
          <strong>Topological:</strong> for every open set{" "}
          <InlineMath math="V \ni f(x_0)" />,{" "}
          <InlineMath math="f^{-1}(V)" /> is open at{" "}
          <InlineMath math="x_0" />.
        </li>
      </ul>

      <p>
        Function <InlineMath math="f" /> is continuous (everywhere)
        iff <InlineMath math="f^{-1}(V)" /> is open for every open{" "}
        <InlineMath math="V" />. The topological definition is the
        cleanest in proofs and generalises most readily.
      </p>

      <h3>Uniform continuity</h3>

      <p>
        Continuity says: at each point, you can find a{" "}
        <InlineMath math="\delta" /> that depends on both{" "}
        <InlineMath math="\varepsilon" /> and the point.{" "}
        <strong>Uniform continuity</strong> demands a single{" "}
        <InlineMath math="\delta" /> that works for{" "}
        <em>every</em> point. Stronger.
      </p>

      <p>
        The standard counter-example:{" "}
        <InlineMath math="f(x) = 1/x" /> is continuous on{" "}
        <InlineMath math="(0, 1)" /> but not uniformly continuous —
        as <InlineMath math="x \to 0" />, smaller{" "}
        <InlineMath math="\delta" /> are needed.
      </p>

      <p>
        Heine–Cantor theorem: a continuous function on a compact set
        is automatically uniformly continuous. Compactness rescues
        you here as everywhere.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Quantum mechanics.</strong> Hilbert space is a
          complete inner-product space. Cauchy sequences of
          wavefunctions must converge — this is what makes the
          spectral theorem, perturbation series, and limiting
          arguments rigorous. Quantum mechanics is real analysis
          dressed in physical clothing.
        </li>
        <li>
          <strong>Differential equations.</strong> Picard–Lindelöf
          (existence and uniqueness for ODEs under Lipschitz
          conditions) is the Banach fixed-point theorem in
          disguise. Continuous dependence on initial conditions is a
          continuity statement on a function space.
        </li>
        <li>
          <strong>Numerical analysis.</strong> Iterative methods
          converge by contraction; convergence rates are read off
          the contraction constant. Gradient descent, Newton's
          method, Krylov methods — all live in metric / Banach
          space frameworks.
        </li>
        <li>
          <strong>Topology &amp; manifolds.</strong> The
          generalisation of metric spaces — topological spaces — is
          the foundation for differential geometry, general
          relativity, and the global structure of physical theories.
          Compactness, completeness, Hausdorff-ness etc. all
          generalise.
        </li>
      </ul>

      <p>
        Next chapter: sequences and series of <em>functions</em>{" "}
        — an even more delicate convergence story, where pointwise
        and uniform convergence behave very differently. The
        Weierstrass M-test, term-by-term integration, and uniform
        approximation theorems all live there.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "A metric $d : X \\times X \\to [0, \\infty)$ must satisfy three properties. Which is **not** required?",
    options: [
      "$d(x, y) = 0 \\iff x = y$",
      "$d(x, y) = d(y, x)$",
      "$d(x, z) \\leq d(x, y) + d(y, z)$",
      "$d(x, y) \\leq d(x, y)^2$",
    ],
    correct: 3,
    explanation:
      "Identity, symmetry, triangle inequality — those are the three. Option D isn't a metric axiom (and isn't usually true).",
  },
  {
    prompt:
      "A subset of $\\mathbb{R}^n$ is compact iff…",
    options: [
      "it is open",
      "it is bounded",
      "it is closed and bounded (Heine–Borel)",
      "it is connected",
    ],
    correct: 2,
    explanation:
      "Heine–Borel: in $\\mathbb{R}^n$, compact = closed + bounded. This fails in infinite-dimensional spaces (the closed unit ball in $\\ell^2$ isn't compact).",
  },
  {
    prompt:
      "A complete metric space is one where…",
    options: [
      "every sequence converges",
      "every Cauchy sequence converges",
      "every set is closed",
      "every continuous function is bounded",
    ],
    correct: 1,
    explanation:
      "Completeness: Cauchy ⇒ convergent. $\\mathbb{R}$ is complete; $\\mathbb{Q}$ is not (the rationals approximating $\\pi$ are Cauchy but their limit isn't rational).",
  },
  {
    prompt:
      "By the Banach fixed-point theorem, a contraction on a complete metric space has…",
    options: [
      "no fixed point in general",
      "exactly one fixed point, found by iterating",
      "infinitely many fixed points",
      "a fixed point only when the space is compact",
    ],
    correct: 1,
    explanation:
      "Unique fixed point, and you find it by iterating from any starting point — geometric convergence at rate $c$.",
  },
  {
    prompt:
      "Which is **stronger**: continuity or uniform continuity?",
    options: [
      "continuity is stronger",
      "uniform continuity is stronger",
      "they are equivalent",
      "neither implies the other",
    ],
    correct: 1,
    explanation:
      "Uniform continuity demands a single $\\delta$ for every $x$. On compact domains they're equivalent (Heine–Cantor); in general uniform is strictly stronger ($1/x$ on $(0, 1)$ is continuous but not uniformly continuous).",
  },
];
