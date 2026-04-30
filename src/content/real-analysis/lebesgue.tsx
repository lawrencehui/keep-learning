import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function LebesgueBody() {
  return (
    <>
      <p>
        The Riemann integral, beautiful as it is, has limits. There
        are functions Riemann can't integrate, sequences of
        Riemann-integrable functions whose pointwise limit isn't
        Riemann-integrable, and convergence theorems much weaker
        than what analysis really wants. Henri Lebesgue's 1902
        thesis gave a different definition of integral that fixes
        all of this — at the cost of building a serious theory of{" "}
        <em>measure</em> first.
      </p>
      <p>
        This chapter is an intro: enough to use Lebesgue integration,
        appreciate the dominated convergence theorem, and meet the{" "}
        <InlineMath math="L^p" /> spaces. Full measure theory takes
        a graduate course; we're after the core ideas and the
        key payoff.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.125 — Measure and Integration",
            author: "MIT OCW",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/18-125-measure-and-integration-fall-2003/",
            note: "Full graduate-level measure theory course.",
          },
          {
            title: "Stein &amp; Shakarchi — Real Analysis",
            author: "Stein / Shakarchi",
            duration: "Reading",
            url: "https://press.princeton.edu/books/hardcover/9780691113869/real-analysis",
            note: "Companion to their Complex Analysis. Excellent introduction to Lebesgue.",
          },
          {
            title: "Royden — Real Analysis",
            author: "H.L. Royden",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Royden_(textbook)",
            note: "Classic graduate text. Worth knowing for reference.",
          },
          {
            title: "Tao — An Introduction to Measure Theory",
            author: "Terence Tao",
            duration: "Reading (free PDF)",
            url: "https://terrytao.wordpress.com/books/an-introduction-to-measure-theory/",
            note: "Self-contained build-up. Tao at his clearest.",
          },
          {
            title: "Probability essentials (Jacod &amp; Protter)",
            author: "Jacod / Protter",
            duration: "Reading",
            url: "https://www.springer.com/book/9783540438717",
            note: "How measure theory underpins probability. Worth reading once you've absorbed the basics.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The trouble with Riemann</h2>

      <p>
        Two showcase failures of the Riemann integral:
      </p>

      <h3>The Dirichlet function</h3>

      <p>
        Define <InlineMath math="f : [0, 1] \to \{0, 1\}" /> by{" "}
        <InlineMath math="f(x) = 1" /> if{" "}
        <InlineMath math="x \in \mathbb{Q}" />, else{" "}
        <InlineMath math="f(x) = 0" />. This function is{" "}
        <em>not Riemann-integrable</em> — every interval contains
        both rationals and irrationals, so the upper Riemann sum is
        always 1 and the lower sum always 0. The Riemann integral
        doesn't exist.
      </p>

      <p>
        But morally,{" "}
        <InlineMath math="f" /> is "almost everywhere" zero — the
        rationals are countable, hence "small". A reasonable
        integral should give 0. Riemann can't.
      </p>

      <h3>Pointwise limits not playing well</h3>

      <p>
        Enumerate the rationals in <InlineMath math="[0, 1]" /> as{" "}
        <InlineMath math="q_1, q_2, \dots" />. Define{" "}
        <InlineMath math="f_n(x) = 1" /> if{" "}
        <InlineMath math="x \in \{q_1, \dots, q_n\}" />, else 0. Each{" "}
        <InlineMath math="f_n" /> is Riemann-integrable (with{" "}
        <InlineMath math="\int f_n = 0" />), and{" "}
        <InlineMath math="f_n \to f" /> pointwise (the Dirichlet
        function). But <InlineMath math="f" /> is not Riemann-
        integrable. So{" "}
        <InlineMath math="\lim \int f_n" /> exists (it's 0) but{" "}
        <InlineMath math="\int \lim f_n" /> doesn't make sense.
      </p>

      <p>
        We want a richer integral that handles such limits cleanly.
        Lebesgue is the answer.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Lebesgue measure</h2>

      <p>
        Heuristically, "the size of a set". For an interval{" "}
        <InlineMath math="[a, b]" /> we want size{" "}
        <InlineMath math="b - a" />. For more complicated sets, we
        need a definition.
      </p>

      <h3>Outer measure</h3>

      <p>
        For any subset <InlineMath math="A \subseteq \mathbb{R}" />,
        the <strong>Lebesgue outer measure</strong>{" "}
        <InlineMath math="m^*(A)" /> is the infimum of{" "}
        <InlineMath math="\sum (b_i - a_i)" /> over all countable
        coverings of <InlineMath math="A" /> by open intervals{" "}
        <InlineMath math="(a_i, b_i)" />.
      </p>

      <p>Outer measure is well-defined for every subset, but it has a flaw — it isn't{" "}
        <em>countably additive</em> on all sets. There exist disjoint{" "}
        <InlineMath math="A, B" /> with{" "}
        <InlineMath math="m^*(A \cup B) < m^*(A) + m^*(B)" /> (using
        the axiom of choice, you can build "non-measurable" sets —
        e.g. the Vitali set).
      </p>

      <h3>Measurable sets</h3>

      <p>
        Restrict to a class of <strong>measurable sets</strong> on
        which outer measure is countably additive. A set{" "}
        <InlineMath math="E" /> is <strong>Lebesgue measurable</strong>{" "}
        (Carathéodory's criterion) if for every{" "}
        <InlineMath math="A \subseteq \mathbb{R}" />:
      </p>
      <BlockMath math="m^*(A) = m^*(A \cap E) + m^*(A \setminus E)." />

      <p>
        On the class of measurable sets, outer measure becomes the{" "}
        <strong>Lebesgue measure</strong>{" "}
        <InlineMath math="m" />. Properties:
      </p>
      <ul>
        <li>
          All open sets, all closed sets, and (essentially) all
          subsets you'll ever care about are measurable.
        </li>
        <li>
          <InlineMath math="m([a, b]) = b - a" />.
        </li>
        <li>
          Countable additivity: for disjoint measurable sets{" "}
          <InlineMath math="E_i" />,{" "}
          <InlineMath math="m(\bigcup E_i) = \sum m(E_i)" />.
        </li>
        <li>
          Translation-invariance:{" "}
          <InlineMath math="m(E + a) = m(E)" />.
        </li>
        <li>
          The rationals (as a subset of{" "}
          <InlineMath math="\mathbb{R}" />) have measure zero (
          countable). The Cantor set is uncountable but also has
          measure zero.
        </li>
      </ul>

      <Pitfall>
        Non-measurable sets exist (Vitali set) — but only via the
        axiom of choice. You'll never construct one in finite steps
        from explicit operations. For practical analysis, every
        set you can write down is measurable.
      </Pitfall>

      <h3>Almost everywhere</h3>

      <p>
        We say a property holds <strong>almost everywhere</strong>{" "}
        (a.e.) if the set where it fails has measure zero. The
        Dirichlet function above is "0 a.e." (rationals are measure
        zero). For Lebesgue's purposes, two functions equal a.e.
        are interchangeable — they have the same Lebesgue integral.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Measurable functions and the Lebesgue integral</h2>

      <p>
        A function <InlineMath math="f : \mathbb{R} \to \mathbb{R}" /> is{" "}
        <strong>measurable</strong> if{" "}
        <InlineMath math="\{x : f(x) > c\}" /> is a measurable set
        for every <InlineMath math="c \in \mathbb{R}" />. Continuous
        functions are measurable; sums, products, and pointwise
        limits of measurable functions are measurable. The class of
        measurable functions is enormous and stable.
      </p>

      <h3>Building the integral</h3>

      <p>
        Three steps:
      </p>

      <ol>
        <li>
          For a <strong>simple function</strong>{" "}
          <InlineMath math="\varphi = \sum_i a_i \mathbb{1}_{E_i}" />{" "}
          (finite sum of indicator functions on measurable{" "}
          <InlineMath math="E_i" />, with constants{" "}
          <InlineMath math="a_i \geq 0" />), define
          <BlockMath math="\int \varphi \, dm = \sum_i a_i \, m(E_i)." />
        </li>
        <li>
          For a non-negative measurable function{" "}
          <InlineMath math="f \geq 0" />, define
          <BlockMath math="\int f \, dm = \sup \left\{ \int \varphi \, dm : \varphi \text{ simple, } 0 \leq \varphi \leq f \right\}." />
        </li>
        <li>
          For a general measurable function, write{" "}
          <InlineMath math="f = f_+ - f_-" /> (positive minus
          negative parts) and define{" "}
          <InlineMath math="\int f = \int f_+ - \int f_-" /> when
          both pieces are finite. Then{" "}
          <InlineMath math="f" /> is <strong>integrable</strong>{" "}
          (or "Lebesgue integrable"); we write{" "}
          <InlineMath math="f \in L^1" />.
        </li>
      </ol>

      <p>
        The key conceptual shift: Riemann partitions the{" "}
        <em>domain</em>; Lebesgue partitions the <em>range</em>. To
        integrate <InlineMath math="f" /> Lebesgue-style, slice up
        the <InlineMath math="y" />-axis, find the measurable set
        in the <InlineMath math="x" />-axis where{" "}
        <InlineMath math="f \in [y, y + \Delta y]" />, multiply
        measure by <InlineMath math="y" />, sum.
      </p>

      <p>
        Why this works: the{" "}
        <em>level sets</em> <InlineMath math="\{f > c\}" /> are
        well-behaved (measurable) even when the function is wildly
        oscillatory. The Riemann approach (partition the domain)
        breaks when the function is too irregular.
      </p>

      <h3>Lebesgue extends Riemann</h3>

      <p>
        Every Riemann-integrable function on{" "}
        <InlineMath math="[a, b]" /> is Lebesgue-integrable, with the
        same value. So Lebesgue is a strict extension. The Dirichlet
        function: now Lebesgue-integrable with integral 0, since{" "}
        <InlineMath math="f = 0" /> a.e.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Convergence theorems</h2>

      <p>
        The killer features of the Lebesgue integral are its
        convergence theorems — telling you when{" "}
        <InlineMath math="\lim \int = \int \lim" /> works.
      </p>

      <Callout title="Monotone Convergence Theorem">
        If <InlineMath math="0 \leq f_1 \leq f_2 \leq \cdots" /> are
        measurable and <InlineMath math="f_n \to f" /> pointwise
        (a.e.), then
        <BlockMath math="\int f_n \, dm \;\to\; \int f \, dm" />
        (allowing both sides to be <InlineMath math="\infty" />).
      </Callout>

      <p>
        Hypothesis: monotone increasing, non-negative. Conclusion:
        the integrals converge to what they should, with no further
        regularity assumption.
      </p>

      <Callout title="Dominated Convergence Theorem (DCT)">
        Suppose <InlineMath math="f_n \to f" /> pointwise a.e. and
        there exists an integrable{" "}
        <InlineMath math="g \in L^1" /> with{" "}
        <InlineMath math="|f_n| \leq g" /> a.e. for all{" "}
        <InlineMath math="n" />. Then
        <BlockMath math="\lim_{n \to \infty} \int f_n \, dm = \int f \, dm." />
      </Callout>

      <p>
        DCT is the workhorse — much more flexible than uniform
        convergence. The only requirement is a single integrable
        majorant <InlineMath math="g" />. With DCT, you can
        interchange limit and integral in nearly every situation
        you'll encounter.
      </p>

      <p>
        Compare with the Riemann setting:
      </p>
      <ul>
        <li>
          Uniform convergence on compact: limit and integral commute
          (Real Analysis Chapter 2).
        </li>
        <li>
          Pointwise + uniform bound (Riemann): no general theorem.
        </li>
        <li>
          Pointwise + dominating integrable function (Lebesgue):
          DCT, very general.
        </li>
      </ul>

      <h3>Fubini's theorem</h3>

      <p>
        For "nice" (integrable) functions on a product space:
      </p>
      <BlockMath math="\iint f(x, y) \, dx \, dy = \int \left( \int f(x, y) \, dy \right) dx = \int \left( \int f(x, y) \, dx \right) dy." />

      <p>
        We met this earlier in Multivariable Calculus for Riemann
        integrals on rectangles. The Lebesgue version (Tonelli for
        non-negative measurable, Fubini for integrable) handles
        much more general situations. Knowing when iterated
        integrals can be swapped is one of the workhorses of
        applied analysis.
      </p>

      <Exercise
        number="4.1"
        prompt={
          <>
            Use DCT to compute{" "}
            <InlineMath math="\displaystyle \lim_{n \to \infty} \int_0^\infty \frac{n e^{-n x}}{1 + x} \, dx" />.
          </>
        }
      >
        <p>
          Substitute <InlineMath math="u = nx" />:{" "}
          <InlineMath math="\int_0^\infty e^{-u} / (1 + u/n) \, du" />.{" "}
          Pointwise limit (in <InlineMath math="u" />) is{" "}
          <InlineMath math="e^{-u}" />, dominated by{" "}
          <InlineMath math="e^{-u}" /> (which is integrable). By
          DCT,
        </p>
        <BlockMath math="\lim = \int_0^\infty e^{-u} \, du = 1." />
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · <InlineMath math="L^p" /> spaces</h2>

      <p>
        For <InlineMath math="1 \leq p < \infty" />, the space{" "}
        <InlineMath math="L^p(X)" /> consists of measurable functions{" "}
        <InlineMath math="f" /> on a measure space{" "}
        <InlineMath math="X" /> with
      </p>
      <BlockMath math="\|f\|_p = \left( \int |f|^p \, dm \right)^{1/p} < \infty," />

      <p>
        identifying functions equal a.e. The space{" "}
        <InlineMath math="L^\infty" /> consists of essentially
        bounded functions, with{" "}
        <InlineMath math="\|f\|_\infty = \mathrm{ess\,sup} |f|" />.
      </p>

      <p>
        Properties:
      </p>
      <ul>
        <li>
          <strong>Banach spaces</strong> for every{" "}
          <InlineMath math="p \in [1, \infty]" /> — they're
          complete normed vector spaces. (The completeness — every
          Cauchy sequence converges in <InlineMath math="L^p" /> —
          is the content of the Riesz–Fischer theorem.)
        </li>
        <li>
          <InlineMath math="L^2" /> is special — it's a Hilbert
          space, with inner product{" "}
          <InlineMath math="\langle f, g \rangle = \int f \bar g \, dm" />.
        </li>
        <li>
          <strong>Hölder's inequality:</strong>{" "}
          <InlineMath math="\int |fg| \leq \|f\|_p \|g\|_q" /> when{" "}
          <InlineMath math="1/p + 1/q = 1" /> (the special case{" "}
          <InlineMath math="p = q = 2" /> is Cauchy–Schwarz).
        </li>
        <li>
          <strong>Minkowski's inequality:</strong>{" "}
          <InlineMath math="\|f + g\|_p \leq \|f\|_p + \|g\|_p" />.
          This is the triangle inequality for{" "}
          <InlineMath math="\|\cdot\|_p" />.
        </li>
      </ul>

      <h3>Quantum mechanics' <InlineMath math="L^2" /></h3>

      <p>
        The Hilbert space of quantum wavefunctions is{" "}
        <InlineMath math="L^2(\mathbb{R}^3)" /> — square-integrable
        functions <InlineMath math="\psi : \mathbb{R}^3 \to \mathbb{C}" />.
        The norm <InlineMath math="\|\psi\|_2^2 = \int |\psi|^2 \, dV" />{" "}
        is the total probability (which must equal 1 for normalised
        states). The inner product is the quantum amplitude. Every
        operation in quantum mechanics — observables, time
        evolution, measurement — is defined in terms of{" "}
        <InlineMath math="L^2" /> structure.
      </p>

      <p>
        Without Lebesgue integration, this whole framework is
        ill-defined. Quantum mechanics is fundamentally a Lebesgue
        theory.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Probability theory.</strong> A probability space{" "}
          <InlineMath math="(\Omega, \mathcal F, P)" /> is a measure
          space with <InlineMath math="P(\Omega) = 1" />. Random
          variables are measurable functions; expectation is a
          Lebesgue integral. Convergence theorems (DCT, monotone
          convergence) underwrite the law of large numbers, central
          limit theorem, martingale theory, and stochastic
          processes. Modern probability is impossible without
          measure theory.
        </li>
        <li>
          <strong>Quantum mechanics.</strong> Wavefunctions live in{" "}
          <InlineMath math="L^2" />. The spectral theorem for
          unbounded self-adjoint operators (the operator-theoretic
          basis for quantum observables) is a Lebesgue/measure
          construction. Path integrals (Feynman) are formally
          measure-theoretic but actually rely on much subtler
          extensions (oscillatory integrals).
        </li>
        <li>
          <strong>Signal processing.</strong> The natural space for
          square-integrable signals is{" "}
          <InlineMath math="L^2(\mathbb{R})" />. Fourier transform
          is a unitary map{" "}
          <InlineMath math="L^2 \to L^2" />. Sampling theorems,
          aliasing, filter design — all live in this framework.
        </li>
        <li>
          <strong>PDEs.</strong> Sobolev spaces (
          <InlineMath math="W^{k, p}" />) are Lebesgue-style spaces
          for functions with{" "}
          <InlineMath math="L^p" /> derivatives. Modern PDE theory
          (existence, uniqueness, regularity) is a Sobolev/Hilbert
          space affair.
        </li>
        <li>
          <strong>Functional analysis.</strong> Banach and Hilbert
          spaces, bounded operators, spectral theory — all rest on
          measure theory and the{" "}
          <InlineMath math="L^p" /> framework.
        </li>
      </ul>

      <p>
        That closes Tier IX. Real analysis is the rigorous backbone
        of every later math/physics tier. The next module —{" "}
        <strong>Tier X: Abstract Algebra</strong> — turns from analysis
        to <em>structural</em> mathematics: groups, rings, fields. It's
        the algebraic complement to analytic thinking, and it's where
        the deeper number-theoretic results behind cryptography and
        quantum-computing algorithms live.
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
      "The Dirichlet function (1 on rationals, 0 on irrationals) is…",
    options: [
      "Riemann integrable with $\\int = 1/2$",
      "Riemann integrable with $\\int = 0$",
      "not Riemann integrable, but Lebesgue integrable with $\\int = 0$",
      "neither Riemann nor Lebesgue integrable",
    ],
    correct: 2,
    explanation:
      "Riemann's upper and lower sums never agree (every interval contains both rationals and irrationals). But the rationals have Lebesgue measure 0, so the function equals 0 a.e. and Lebesgue gives integral 0.",
  },
  {
    prompt:
      "The Lebesgue measure of $\\mathbb{Q} \\cap [0, 1]$ is…",
    options: ["1", "0", "$1/2$", "undefined"],
    correct: 1,
    explanation:
      "Countable sets have Lebesgue measure 0 — cover by intervals of total length $\\varepsilon$, take $\\varepsilon \\to 0$.",
  },
  {
    prompt:
      "By the Dominated Convergence Theorem, $\\lim \\int f_n = \\int \\lim f_n$ provided…",
    options: [
      "$f_n$ converges uniformly",
      "$f_n \\to f$ pointwise a.e. and there exists integrable $g$ with $|f_n| \\leq g$",
      "$f_n$ are continuous",
      "$f_n \\to f$ in $L^p$",
    ],
    correct: 1,
    explanation:
      "DCT: pointwise a.e. convergence + integrable dominating function. Much more flexible than uniform convergence.",
  },
  {
    prompt:
      "$L^p$ spaces are…",
    options: [
      "Banach spaces for $p \\in [1, \\infty]$, and $L^2$ in addition is a Hilbert space",
      "Hilbert spaces for all $p$",
      "finite-dimensional",
      "subsets of $\\mathbb{R}^n$",
    ],
    correct: 0,
    explanation:
      "All $L^p$ are complete normed spaces (Banach). $L^2$ has an inner product structure too — it's the Hilbert space of square-integrable functions, where quantum mechanics lives.",
  },
  {
    prompt:
      "The space of square-integrable wavefunctions in quantum mechanics is…",
    options: ["$L^1$", "$L^\\infty$", "$L^2$", "$C^\\infty$"],
    correct: 2,
    explanation:
      "$L^2(\\mathbb{R}^3)$. Norm-squared $\\int |\\psi|^2$ is total probability; the inner product gives transition amplitudes. The whole formalism rests on this Hilbert space structure.",
  },
];
