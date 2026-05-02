import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function InnerProductDeepBody() {
  return (
    <>
      <p>
        We met inner product spaces in Module III: real and complex
        dot products, Cauchy–Schwarz, Gram–Schmidt, projections.
        This chapter goes deeper. We meet the <em>adjoint</em> of
        an operator (the operator that does the right thing with
        respect to the inner product), classify operators by their
        behaviour under conjugation by the adjoint
        (self-adjoint, unitary, normal), and develop the operator
        machinery that quantum mechanics speaks fluently.
      </p>
      <p>
        The whole module is laying foundations for{" "}
        <em>infinite-dimensional</em> linear algebra — Hilbert
        spaces, where wavefunctions and observables live. We start
        finite-dimensional and clean, then generalise.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Axler — Linear Algebra Done Right (3rd ed)",
            author: "Sheldon Axler",
            duration: "Reading",
            url: "https://linear.axler.net/",
            note: "Chapters 6–7 are the gold standard for inner-product-space theory done abstractly.",
          },
          {
            title: "MIT 18.700 — Linear Algebra (Cohn)",
            author: "MIT OCW",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/18-700-linear-algebra-fall-2013/",
            note: "Theoretical course covering everything in this module rigorously.",
          },
          {
            title: "Halmos — Finite-Dimensional Vector Spaces",
            author: "Paul Halmos",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Finite-Dimensional_Vector_Spaces",
            note: "The classic that built modern intuition for finite-dim operator theory. Beautiful prose.",
          },
          {
            title: "Reed &amp; Simon — Methods of Modern Mathematical Physics, Vol I",
            author: "Reed / Simon",
            duration: "Reading",
            url: "https://www.elsevier.com/books/methods-of-modern-mathematical-physics/reed/978-0-12-585003-0",
            note: "The reference for operator theory + functional analysis, motivated by quantum mechanics.",
          },
          {
            title: "Hall — Quantum Theory for Mathematicians",
            author: "Brian Hall",
            duration: "Reading",
            url: "https://www.springer.com/book/9781461471158",
            note: "Builds operator theory specifically for QM. Rigorous and motivated.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Recap and conventions</h2>

      <p>
        Throughout, <InlineMath math="V" /> is a finite-dimensional
        complex vector space with an inner product{" "}
        <InlineMath math="\langle \cdot, \cdot \rangle" />. We use
        the physicist convention (anti-linear in the first slot,
        linear in the second), so for{" "}
        <InlineMath math="\alpha \in \mathbb{C}" />:
      </p>
      <BlockMath math="\langle \alpha u, v \rangle = \bar\alpha \langle u, v\rangle, \qquad \langle u, \alpha v \rangle = \alpha \langle u, v \rangle." />

      <p>
        The norm{" "}
        <InlineMath math="\|v\| = \sqrt{\langle v, v \rangle}" />,
        Cauchy–Schwarz, and the Pythagorean theorem all from Module
        III still apply. New stuff begins here.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The adjoint</h2>

      <Callout title="Adjoint operator">
        For a linear operator{" "}
        <InlineMath math="T : V \to V" />, the{" "}
        <strong>adjoint</strong>{" "}
        <InlineMath math="T^* : V \to V" /> is the unique linear
        operator satisfying
        <BlockMath math="\langle T u, v \rangle = \langle u, T^* v \rangle" />
        for all <InlineMath math="u, v \in V" />.
      </Callout>

      <p>
        The adjoint exists and is unique (theorem; relies on the
        Riesz representation theorem in finite dimensions). For
        matrices in an orthonormal basis, the adjoint is the{" "}
        <em>conjugate transpose</em>:{" "}
        <InlineMath math="(A^*)_{ij} = \overline{A_{ji}}" />.
      </p>

      <p>
        Properties:
      </p>
      <ul>
        <li>
          <InlineMath math="(T^*)^* = T" />.
        </li>
        <li>
          <InlineMath math="(S + T)^* = S^* + T^*" />.
        </li>
        <li>
          <InlineMath math="(\alpha T)^* = \bar\alpha T^*" />{" "}
          (note the conjugation).
        </li>
        <li>
          <InlineMath math="(ST)^* = T^* S^*" /> (note the order
          flip).
        </li>
        <li>
          <InlineMath math="\ker T^* = (\operatorname{im} T)^\perp" />.
          The kernel of the adjoint is the orthogonal complement of
          the image — this is the deep relationship behind the
          four fundamental subspaces of Strang.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Self-adjoint, unitary, normal</h2>

      <p>
        Three families of operators stand out:
      </p>

      <Callout title="Operator types">
        <ul>
          <li>
            <strong>Self-adjoint</strong> (Hermitian, in physics):{" "}
            <InlineMath math="T = T^*" />.
          </li>
          <li>
            <strong>Unitary:</strong>{" "}
            <InlineMath math="T T^* = T^* T = I" />, i.e.{" "}
            <InlineMath math="T^{-1} = T^*" />.
          </li>
          <li>
            <strong>Normal:</strong>{" "}
            <InlineMath math="T T^* = T^* T" /> — adjoint commutes
            with the operator.
          </li>
        </ul>
        Self-adjoint and unitary are special cases of normal.
      </Callout>

      <h3>Self-adjoint = real eigenvalues</h3>

      <p>
        <strong>Theorem.</strong> All eigenvalues of a self-adjoint
        operator are real.
      </p>

      <p>
        <strong>Proof.</strong> Let{" "}
        <InlineMath math="T v = \lambda v" /> with{" "}
        <InlineMath math="v \neq 0" />. Then
      </p>
      <BlockMath math="\lambda \langle v, v \rangle = \langle v, T v \rangle = \langle T v, v \rangle = \langle \lambda v, v \rangle = \bar\lambda \langle v, v \rangle." />
      <p>
        Since <InlineMath math="\langle v, v \rangle \neq 0" />,{" "}
        <InlineMath math="\lambda = \bar\lambda" />, hence{" "}
        <InlineMath math="\lambda \in \mathbb{R}" />. ∎
      </p>

      <p>
        And: eigenvectors of a self-adjoint operator with{" "}
        <em>distinct</em> eigenvalues are orthogonal.
      </p>

      <h3>Unitary = preserves inner product</h3>

      <p>
        <strong>Theorem.</strong>{" "}
        <InlineMath math="T" /> is unitary iff{" "}
        <InlineMath math="\langle Tu, Tv\rangle = \langle u, v \rangle" />{" "}
        for all <InlineMath math="u, v" />.
      </p>

      <p>
        Equivalently, unitary operators preserve norms (
        <InlineMath math="\|Tv\| = \|v\|" />) and angles. They
        rotate / reflect — they don't stretch.
      </p>

      <p>
        Unitary operators have eigenvalues on the unit circle in{" "}
        <InlineMath math="\mathbb{C}" /> (since{" "}
        <InlineMath math="|\lambda| = 1" />), and orthogonal
        eigenvectors for distinct eigenvalues.
      </p>

      <h3>Normal = simultaneously diagonalisable with adjoint</h3>

      <p>
        Both self-adjoint and unitary are normal. The class is
        broader still — e.g. anti-Hermitian operators (
        <InlineMath math="T^* = -T" />) are normal too.
      </p>

      <Callout title="Spectral theorem (preview)">
        For a finite-dimensional complex vector space{" "}
        <InlineMath math="V" /> with inner product, an operator{" "}
        <InlineMath math="T : V \to V" /> is normal iff there is an
        orthonormal basis of <InlineMath math="V" /> consisting of
        eigenvectors of <InlineMath math="T" />.
      </Callout>

      <p>
        Normal ⇔ unitarily diagonalisable. Self-adjoint = normal
        with all eigenvalues real. Unitary = normal with all
        eigenvalues on the unit circle. The spectral theorem
        proper is the next chapter.
      </p>

      <Pitfall>
        Not every diagonalisable operator is normal. The matrix{" "}
        <InlineMath math="\begin{pmatrix} 1 & 1 \\ 0 & 2 \end{pmatrix}" />{" "}
        has distinct eigenvalues (1 and 2) and is diagonalisable
        — but its eigenvectors aren't orthogonal. So it's
        diagonalisable, but not <em>unitarily</em> diagonalisable,
        hence not normal.
      </Pitfall>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Operator norm and bounded operators</h2>

      <p>
        For an operator <InlineMath math="T : V \to W" /> between
        normed spaces, the <strong>operator norm</strong>:
      </p>
      <BlockMath math="\|T\| = \sup_{v \neq 0} \frac{\|Tv\|}{\|v\|} = \sup_{\|v\| = 1} \|Tv\|." />

      <p>
        In finite dimensions, <InlineMath math="\|T\|" /> is always
        finite (compactness of the unit sphere). In infinite
        dimensions, operators can be unbounded; only{" "}
        <em>bounded</em> operators satisfy{" "}
        <InlineMath math="\|T\| < \infty" />.
      </p>

      <p>
        Properties:
      </p>
      <ul>
        <li>
          <InlineMath math="\|S + T\| \leq \|S\| + \|T\|" />.
        </li>
        <li>
          <InlineMath math="\|ST\| \leq \|S\| \|T\|" />{" "}
          (sub-multiplicative).
        </li>
        <li>
          <InlineMath math="\|T^*\| = \|T\|" />.
        </li>
        <li>
          <InlineMath math="\|T^* T\| = \|T\|^2" /> (the C*
          property — the deep one).
        </li>
      </ul>

      <p>
        The <strong>spectral radius</strong>{" "}
        <InlineMath math="r(T) = \max |\lambda_i|" /> over
        eigenvalues <InlineMath math="\lambda_i" />. Always{" "}
        <InlineMath math="r(T) \leq \|T\|" />, with equality for
        normal operators.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Why this matters</h2>

      <ul>
        <li>
          <strong>Quantum mechanics.</strong> Observables are
          self-adjoint operators (real eigenvalues = real
          measurement outcomes). Time evolution is unitary
          (probability is conserved). Quantum gates in computing
          are unitary. The "operator + adjoint" pairing is the
          central structural object.
        </li>
        <li>
          <strong>Numerical linear algebra.</strong> Hermitian
          eigensolvers, unitary QR factorisations, SVD — all run
          on the operator vocabulary of this chapter. Stability
          guarantees come from the C* identity{" "}
          <InlineMath math="\|T^*T\| = \|T\|^2" />.
        </li>
        <li>
          <strong>Signal processing &amp; PCA.</strong> Covariance
          matrices are self-adjoint and positive-semidefinite;
          principal directions are eigenvectors. Whitening = unitary
          rotations. All downstream of operator theory.
        </li>
        <li>
          <strong>Functional analysis.</strong> The infinite-
          dimensional generalisation (Hilbert space) is where
          quantum mechanics actually lives. Most theorems
          generalise from this chapter cleanly to bounded operators
          on Hilbert space; unbounded operators (position,
          momentum) need extra care.
        </li>
      </ul>

      <p>
        Next chapter: spectral theorem in detail, plus SVD as the
        non-square cousin.
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
      "The adjoint $T^*$ of an operator $T$ on a finite-dim inner product space is defined by…",
    options: [
      "$T T^* = I$",
      "$\\langle T u, v \\rangle = \\langle u, T^* v \\rangle$ for all $u, v$",
      "$T^* = T^{-1}$",
      "$T^*$ is the matrix transpose",
    ],
    correct: 1,
    explanation:
      "Defining property: $T^*$ is the operator that 'moves' inside the inner product correctly. For matrices in an orthonormal basis, the adjoint is the conjugate transpose.",
  },
  {
    prompt:
      "An operator is self-adjoint iff all its eigenvalues are…",
    options: [
      "non-negative",
      "real",
      "on the unit circle",
      "zero",
    ],
    correct: 1,
    explanation:
      "Self-adjoint operators have real eigenvalues — proved by $\\lambda \\langle v, v\\rangle = \\bar\\lambda \\langle v, v\\rangle$. Quantum observables exploit this for real measurement outcomes.",
  },
  {
    prompt:
      "Unitary operators preserve…",
    options: [
      "only norms",
      "only angles",
      "the inner product (and hence norms and angles)",
      "rank but not anything else",
    ],
    correct: 2,
    explanation:
      "$\\langle Tu, Tv \\rangle = \\langle u, v \\rangle$ is the defining property of unitary. Norms and angles follow. Quantum time evolution is unitary precisely because probability is preserved.",
  },
  {
    prompt:
      "An operator $T$ is **normal** iff…",
    options: [
      "$T = T^{-1}$",
      "$T = T^*$",
      "$T T^* = T^* T$",
      "$\\det T = 1$",
    ],
    correct: 2,
    explanation:
      "Normal means $T$ commutes with its adjoint. Self-adjoint and unitary are special cases. Normal ⇔ unitarily diagonalisable (next chapter, the spectral theorem).",
  },
  {
    prompt:
      "Which inequality is the C*-property of operator norms?",
    options: [
      "$\\|T\\| \\leq \\|T\\|^2$",
      "$\\|T^* T\\| = \\|T\\|^2$",
      "$\\|T\\| \\leq r(T)$",
      "$\\|T + S\\| = \\|T\\| + \\|S\\|$",
    ],
    correct: 1,
    explanation:
      "$\\|T^* T\\| = \\|T\\|^2$ — the defining identity of a C*-algebra. Underlies stability of numerical algorithms and the operator-algebra approach to quantum theory.",
  },
];
