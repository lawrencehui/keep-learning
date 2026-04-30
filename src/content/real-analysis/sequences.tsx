import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function SequencesBody() {
  return (
    <>
      <p>
        We've worked with sequences of <em>numbers</em> in calculus
        and earlier chapters. This chapter studies sequences and
        series of <em>functions</em>: a much subtler topic, because
        "convergence" admits multiple inequivalent definitions, and
        the rules of when limits, derivatives, and integrals
        commute hinge on which kind of convergence you have.
      </p>
      <p>
        The headline distinction:{" "}
        <strong>pointwise</strong> vs.{" "}
        <strong>uniform</strong> convergence. Pointwise is what you'd
        guess (each <InlineMath math="x" /> separately); uniform is
        much stronger and is what makes term-by-term differentiation
        and integration safe. We develop both, prove the
        Weierstrass M-test, then end with the Stone–Weierstrass
        theorem that polynomials approximate every continuous
        function on a compact interval — the most spectacular
        density theorem in classical analysis.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.100A — Real Analysis (function sequences)",
            author: "MIT OCW",
            duration: "~6h on this topic",
            url: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
            note: "Lectures on uniform convergence and the M-test.",
          },
          {
            title: "Rudin — Principles of Mathematical Analysis, ch. 7",
            author: "Walter Rudin",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Principles_of_Mathematical_Analysis",
            note: "Standard rigorous treatment, including Stone–Weierstrass.",
          },
          {
            title: "Tao — Analysis II, chs. 1–3",
            author: "Terence Tao",
            duration: "Reading",
            url: "https://terrytao.wordpress.com/books/analysis-ii/",
            note: "Friendlier development with detailed motivation.",
          },
          {
            title: "Abbott — Understanding Analysis, ch. 6",
            author: "Stephen Abbott",
            duration: "Reading",
            url: "https://www.springer.com/book/9781493927111",
            note: "Most accessible introduction. Worth reading even if you have Rudin.",
          },
          {
            title: "Stone–Weierstrass approximation",
            author: "Wikipedia / various",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Stone%E2%80%93Weierstrass_theorem",
            note: "For Part 5; the modern formulation generalises the classical theorem to compact Hausdorff spaces.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Pointwise convergence</h2>

      <p>
        Let <InlineMath math="f_n : X \to \mathbb{R}" /> be a
        sequence of functions on a set <InlineMath math="X" />. The
        sequence converges <strong>pointwise</strong> to{" "}
        <InlineMath math="f" /> if for each fixed{" "}
        <InlineMath math="x" />,{" "}
        <InlineMath math="f_n(x) \to f(x)" /> as{" "}
        <InlineMath math="n \to \infty" /> (in the usual{" "}
        <InlineMath math="\varepsilon" />–<InlineMath math="N" />{" "}
        sense for sequences of numbers).
      </p>

      <h3>The cautionary example</h3>

      <p>
        On <InlineMath math="[0, 1]" />, let{" "}
        <InlineMath math="f_n(x) = x^n" />. Pointwise:
      </p>
      <BlockMath math="f_n(x) \to f(x) = \begin{cases} 0 & 0 \leq x < 1 \\ 1 & x = 1. \end{cases}" />

      <p>
        Each <InlineMath math="f_n" /> is continuous (it's just{" "}
        <InlineMath math="x^n" />), but the limit{" "}
        <InlineMath math="f" /> is not. Pointwise convergence{" "}
        <em>doesn't preserve continuity</em>.
      </p>

      <p>
        Worse examples are possible. There exist pointwise-convergent
        sequences of continuous functions whose limit isn't even
        Riemann-integrable, and where{" "}
        <InlineMath math="\int f_n \neq \int f" /> in general.
        Pointwise convergence is too weak to support the
        manipulations we casually do in calculus.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Uniform convergence</h2>

      <Callout title="Uniform convergence">
        <InlineMath math="f_n \to f" /> <strong>uniformly</strong> on{" "}
        <InlineMath math="X" /> if for every{" "}
        <InlineMath math="\varepsilon > 0" />, there exists{" "}
        <InlineMath math="N" /> (depending only on{" "}
        <InlineMath math="\varepsilon" />, <em>not</em> on{" "}
        <InlineMath math="x" />) such that
        <BlockMath math="|f_n(x) - f(x)| < \varepsilon \quad\text{for all } n \geq N \text{ and all } x \in X." />
      </Callout>

      <p>
        Equivalently:{" "}
        <InlineMath math="\sup_{x \in X} |f_n(x) - f(x)| \to 0" />.
        Uniform convergence in the sup metric, exactly as in the
        previous chapter.
      </p>

      <p>
        The single <InlineMath math="N" /> works for the worst-case
        point. The lonely{" "}
        <InlineMath math="x = 1" /> in the previous example would
        spoil this — for any <InlineMath math="N" />, there's an{" "}
        <InlineMath math="x" /> close to 1 where{" "}
        <InlineMath math="x^N" /> is still close to 1, far from the
        pointwise limit 0. So <InlineMath math="x^n" /> does{" "}
        <em>not</em> converge uniformly on <InlineMath math="[0, 1]" />.
      </p>

      <h3>What uniform convergence preserves</h3>

      <Callout title="Three key theorems">
        Suppose <InlineMath math="f_n \to f" /> uniformly on a set{" "}
        <InlineMath math="X" />.
        <ol>
          <li>
            <strong>Continuity:</strong> if each{" "}
            <InlineMath math="f_n" /> is continuous, then{" "}
            <InlineMath math="f" /> is continuous.
          </li>
          <li>
            <strong>Integration:</strong> on a compact interval{" "}
            <InlineMath math="[a, b]" />,
            <BlockMath math="\int_a^b f_n \, dx \;\to\; \int_a^b f \, dx." />
          </li>
          <li>
            <strong>Differentiation:</strong> if{" "}
            <InlineMath math="f_n" /> are differentiable and{" "}
            <InlineMath math="f_n' \to g" /> uniformly while{" "}
            <InlineMath math="f_n \to f" /> at one point, then{" "}
            <InlineMath math="f' = g" />.
          </li>
        </ol>
      </Callout>

      <p>
        The integration theorem is what justifies the operation
        "interchange limit and integral":{" "}
        <InlineMath math="\lim \int = \int \lim" />, when the
        convergence is uniform.
      </p>

      <p>
        Differentiation is more delicate — uniform convergence of{" "}
        <InlineMath math="f_n" /> alone is not enough to conclude{" "}
        <InlineMath math="f_n' \to f'" />. You need uniform
        convergence of the <em>derivatives</em>.
      </p>

      <Pitfall>
        Don't expect everything to commute. Pointwise + bounded
        doesn't preserve integration; uniform of{" "}
        <InlineMath math="f_n" /> doesn't preserve differentiation.
        The DCT (next chapter, Lebesgue) gives a more powerful
        integration theorem under weaker hypotheses than uniform
        convergence — but it requires the Lebesgue framework.
      </Pitfall>

      <Exercise
        number="2.1"
        prompt={
          <>
            Show that{" "}
            <InlineMath math="f_n(x) = nx e^{-n x^2}" /> on{" "}
            <InlineMath math="[0, 1]" /> converges pointwise to 0
            but not uniformly.
          </>
        }
      >
        <p>
          Pointwise: for any fixed{" "}
          <InlineMath math="x \in (0, 1]" />,{" "}
          <InlineMath math="n e^{-n x^2}" /> grows polynomially and
          decays exponentially, going to 0. At{" "}
          <InlineMath math="x = 0" />,{" "}
          <InlineMath math="f_n(0) = 0" /> always. So{" "}
          <InlineMath math="f_n(x) \to 0" />.
        </p>
        <p>
          Uniformly? Compute{" "}
          <InlineMath math="\sup f_n" />: differentiate w.r.t.{" "}
          <InlineMath math="x" />, set to zero. Maximum at{" "}
          <InlineMath math="x = 1/\sqrt{2n}" />, value{" "}
          <InlineMath math="\sqrt{n/(2e)} \to \infty" />. So{" "}
          <InlineMath math="\sup f_n \not\to 0" /> — not uniform.
        </p>
        <p>
          Consequence:{" "}
          <InlineMath math="\int_0^1 f_n = (1 - e^{-n})/2 \to 1/2" />,{" "}
          while{" "}
          <InlineMath math="\int_0^1 0 = 0" />. Limit and integral
          do not commute here.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · The Weierstrass M-test</h2>

      <p>
        For series of functions{" "}
        <InlineMath math="\sum_{n = 1}^{\infty} f_n(x)" />, uniform
        convergence has a beautiful sufficient condition:
      </p>

      <Callout title="Weierstrass M-test">
        Suppose <InlineMath math="|f_n(x)| \leq M_n" /> for all{" "}
        <InlineMath math="x \in X" />, and the numerical series{" "}
        <InlineMath math="\sum M_n" /> converges. Then{" "}
        <InlineMath math="\sum f_n" /> converges uniformly (and
        absolutely) on <InlineMath math="X" />.
      </Callout>

      <p>
        Proof sketch: the partial sums form a Cauchy sequence
        uniformly because their differences are bounded by tails of{" "}
        <InlineMath math="\sum M_n" />, which go to 0. Completeness
        of <InlineMath math="\mathbb{R}" /> finishes it.
      </p>

      <h3>Worked example</h3>

      <p>
        Show that <InlineMath math="\sum_{n = 1}^{\infty} \sin(n x) / n^2" />{" "}
        converges uniformly on <InlineMath math="\mathbb{R}" />.
      </p>

      <p>
        For all <InlineMath math="x" />,{" "}
        <InlineMath math="|\sin(n x) / n^2| \leq 1/n^2" />. The
        series <InlineMath math="\sum 1/n^2" /> converges (it equals{" "}
        <InlineMath math="\pi^2/6" />, the Basel problem). By the
        M-test, the original series converges uniformly. ∎
      </p>

      <p>
        Therefore the limit function is continuous (Part 2) and we
        can integrate term-by-term. Free.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Power series and uniform convergence</h2>

      <p>
        Power series{" "}
        <InlineMath math="\sum a_n (x - x_0)^n" /> have a clean
        story:
      </p>

      <Callout title="Power-series convergence">
        Inside its disc of convergence{" "}
        <InlineMath math="|x - x_0| < R" />, a power series
        converges uniformly on every <em>closed sub-disc</em>{" "}
        <InlineMath math="|x - x_0| \leq r < R" />.
      </Callout>

      <p>
        Why "closed sub-disc" and not "open disc": near the boundary{" "}
        <InlineMath math="|x - x_0| = R" />, convergence may slow
        down. But on any closed sub-disc strictly inside, you're
        away from the boundary and uniform convergence works.
      </p>

      <p>
        Consequences (both proved by appeals to uniform-convergence
        theorems):
      </p>
      <ul>
        <li>
          A function defined by a power series is continuous on the
          open disc of convergence.
        </li>
        <li>
          You can integrate term-by-term to find an antiderivative,
          and the resulting series has the same radius of
          convergence.
        </li>
        <li>
          You can differentiate term-by-term, again with the same
          radius.
        </li>
        <li>
          As we saw in the Calculus / Series chapter, all this means
          functions defined by power series are infinitely
          differentiable inside the disc — and equal to their
          Taylor series there.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Stone–Weierstrass</h2>

      <p>
        The classical Weierstrass approximation theorem (1885):
      </p>

      <Callout title="Weierstrass approximation theorem">
        Every continuous function on{" "}
        <InlineMath math="[a, b]" /> can be uniformly approximated
        by polynomials. That is, for every continuous{" "}
        <InlineMath math="f : [a, b] \to \mathbb{R}" /> and every{" "}
        <InlineMath math="\varepsilon > 0" />, there exists a
        polynomial <InlineMath math="p" /> with{" "}
        <InlineMath math="\sup |f - p| < \varepsilon" />.
      </Callout>

      <p>
        Polynomials are <em>dense</em> in the space of continuous
        functions (with the sup metric). This is one of the most
        useful facts in classical analysis: any time you need to
        prove something for continuous functions, you can often
        prove it for polynomials and extend by uniform
        approximation.
      </p>

      <p>
        Constructive proof exists (Bernstein polynomials):
      </p>
      <BlockMath math="B_n(f)(x) = \sum_{k = 0}^{n} \binom{n}{k} x^k (1 - x)^{n - k} f(k/n)." />

      <p>
        These approximate <InlineMath math="f" /> uniformly on{" "}
        <InlineMath math="[0, 1]" />, with a rate that depends on
        the modulus of continuity of <InlineMath math="f" />.
      </p>

      <h3>Stone's generalisation</h3>

      <p>
        Marshall Stone (1937) extended Weierstrass to abstract
        compact Hausdorff spaces:
      </p>

      <Callout title="Stone–Weierstrass">
        Let <InlineMath math="X" /> be a compact Hausdorff space and
        let <InlineMath math="A" /> be a subalgebra of{" "}
        <InlineMath math="C(X, \mathbb{R})" /> that contains the
        constants and separates points (for any{" "}
        <InlineMath math="x \neq y" />, some{" "}
        <InlineMath math="f \in A" /> has{" "}
        <InlineMath math="f(x) \neq f(y)" />). Then{" "}
        <InlineMath math="A" /> is dense in{" "}
        <InlineMath math="C(X)" />.
      </Callout>

      <p>
        Polynomials on <InlineMath math="[0, 1]" /> are a
        subalgebra (closed under sum and product), contain the
        constants (the constant polynomial 1 is in there), and
        separate points (the polynomial{" "}
        <InlineMath math="p(x) = x" /> distinguishes any two
        points). So Stone–Weierstrass gives Weierstrass for
        free, and much more.
      </p>

      <p>
        Application: trigonometric polynomials (linear combinations
        of <InlineMath math="\cos n x" /> and <InlineMath math="\sin n x" />)
        are dense in continuous periodic functions. This is the
        density that makes Fourier series work.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Numerical analysis.</strong> Approximating
          continuous functions by polynomials is the foundation of
          Chebyshev approximation, spectral methods, and Gaussian
          quadrature — everything uses Stone–Weierstrass-type
          density.
        </li>
        <li>
          <strong>Fourier analysis.</strong> The convergence of
          Fourier series is exactly a question about uniform
          (Cesàro / Abel) convergence of partial sums. Lebesgue's
          differentiation theorem and Carleson's theorem (almost-
          everywhere convergence of Fourier series) are deep
          results in this lineage.
        </li>
        <li>
          <strong>Differential equations.</strong> Solutions to PDEs
          via separation of variables or perturbation methods are
          often series of functions; <em>convergence</em> of those
          series, and whether limit / derivative / integral commute,
          is the rigour underlying our calculus-level confidence.
        </li>
        <li>
          <strong>Quantum mechanics.</strong> Eigenfunction
          expansions of wave-functions on bounded domains require
          uniform / <InlineMath math="L^2" /> convergence theorems.
          Operator perturbation theory uses Cauchy estimates and
          uniform convergence on resolvent sets.
        </li>
      </ul>

      <p>
        Final chapter of this module: Lebesgue integration. The
        Riemann integral handles continuous functions on compact
        intervals well, but breaks for the convergence theorems we'd
        like to have. Lebesgue's framework — measure theory, the
        dominated convergence theorem,{" "}
        <InlineMath math="L^p" /> spaces — fixes this and gives
        analysis a new ceiling. It's the language of probability,
        signal processing, and quantum theory.
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
      "Pointwise limits of continuous functions are…",
    options: [
      "always continuous",
      "always integrable",
      "not necessarily continuous",
      "always differentiable",
    ],
    correct: 2,
    explanation:
      "$f_n(x) = x^n$ on $[0, 1]$: each is continuous, but the pointwise limit jumps at $x = 1$. Pointwise convergence doesn't preserve continuity.",
  },
  {
    prompt:
      "Uniform convergence preserves which of the following?",
    options: [
      "continuity, but not always integrability",
      "continuity and integrability of the limit on compact intervals",
      "differentiability automatically",
      "nothing — pathological examples exist",
    ],
    correct: 1,
    explanation:
      "Uniform convergence preserves continuity and (on compact intervals) integration: $\\int \\lim = \\lim \\int$. Differentiation needs uniform convergence of the *derivatives*, not just the functions.",
  },
  {
    prompt:
      "By the Weierstrass M-test, $\\sum f_n$ converges uniformly if…",
    options: [
      "$f_n \\to 0$ pointwise",
      "there exist $M_n$ with $|f_n(x)| \\leq M_n$ and $\\sum M_n < \\infty$",
      "$\\sup |f_n| < \\infty$",
      "each $f_n$ is continuous",
    ],
    correct: 1,
    explanation:
      "M-test: dominate each $f_n$ uniformly by a numerical sequence $M_n$ whose sum converges. Then the function series converges uniformly. Used to show $\\sum \\sin(nx)/n^2$ converges uniformly on $\\mathbb{R}$.",
  },
  {
    prompt:
      "By the Weierstrass approximation theorem, every continuous function on $[a, b]$ is the uniform limit of…",
    options: [
      "step functions",
      "polynomials",
      "trigonometric polynomials",
      "differentiable functions",
    ],
    correct: 1,
    explanation:
      "Polynomials are dense in $C[a, b]$ under the sup metric. Bernstein polynomials give a constructive proof.",
  },
  {
    prompt:
      "Stone–Weierstrass requires the subalgebra $A \\subseteq C(X)$ to satisfy…",
    options: [
      "be infinite-dimensional",
      "contain constants and separate points",
      "be closed",
      "consist of polynomials",
    ],
    correct: 1,
    explanation:
      "On compact Hausdorff $X$: subalgebra closed under sum/product, contains constants, separates points. Density in $C(X)$ follows. The classical polynomial case is one instance.",
  },
];
