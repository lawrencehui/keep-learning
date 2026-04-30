import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function HilbertBody() {
  return (
    <>
      <p>
        A <strong>Hilbert space</strong> is an inner-product space
        that is complete (every Cauchy sequence converges).
        Quantum mechanics happens in Hilbert spaces. So do Fourier
        analysis, signal processing, and stochastic processes — but
        for our purposes the headline use is QM.
      </p>
      <p>
        This chapter consolidates the threads from earlier tiers
        (inner products from Tier III, completeness from Tier IX,
        operators from this module) into the framework you'll see
        used throughout quantum mechanics. We meet the canonical
        Hilbert spaces (
        <InlineMath math="\ell^2, L^2" />), develop the spectral
        theorem for bounded normal operators on Hilbert space, and
        preview the unbounded operators that quantum mechanics
        actually uses (position, momentum, the Hamiltonian).
      </p>

      <ReferenceResources
        items={[
          {
            title: "Reed &amp; Simon — Methods of Modern Mathematical Physics, Vol. I",
            author: "Reed / Simon",
            duration: "Reading",
            url: "https://www.elsevier.com/books/methods-of-modern-mathematical-physics/reed/978-0-12-585003-0",
            note: "Chapters on Hilbert space, bounded and unbounded operators, spectral theorem. The reference for quantum-mechanical analysis.",
          },
          {
            title: "Hall — Quantum Theory for Mathematicians",
            author: "Brian Hall",
            duration: "Reading",
            url: "https://www.springer.com/book/9781461471158",
            note: "Builds Hilbert space theory specifically for quantum mechanics. Highly motivated.",
          },
          {
            title: "Conway — A Course in Functional Analysis",
            author: "John Conway",
            duration: "Reading",
            url: "https://www.springer.com/book/9780387972459",
            note: "Standard graduate-level functional analysis text.",
          },
          {
            title: "MIT 18.102 — Introduction to Functional Analysis",
            author: "MIT OCW",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/18-102-introduction-to-functional-analysis-spring-2009/",
            note: "Lecture notes available; Hilbert space, $L^p$, spectral theorem.",
          },
          {
            title: "von Neumann — Mathematical Foundations of Quantum Mechanics",
            author: "John von Neumann",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Mathematical_Foundations_of_Quantum_Mechanics",
            note: "The book that put QM on rigorous footing. Worth a read once Tier XIV is done.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Definition</h2>

      <Callout title="Hilbert space">
        A <strong>Hilbert space</strong>{" "}
        <InlineMath math="\mathcal H" /> is a (real or complex)
        vector space with an inner product{" "}
        <InlineMath math="\langle \cdot, \cdot \rangle" /> such that
        the resulting metric{" "}
        <InlineMath math="d(u, v) = \|u - v\|" /> makes{" "}
        <InlineMath math="\mathcal H" /> a complete metric space.
      </Callout>

      <p>
        The completeness is essential: in finite dimensions every
        inner-product space is automatically complete (Heine–
        Borel), but in infinite dimensions completeness must be
        explicitly assumed. Without it, theorems break — Cauchy
        sequences need to converge.
      </p>

      <p>
        <strong>Separable</strong> Hilbert spaces are those with a
        countable dense subset. All Hilbert spaces in physics are
        separable; we'll only work with separable ones.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Canonical examples</h2>

      <h3><InlineMath math="\ell^2" /></h3>

      <p>
        The space of square-summable sequences:
      </p>
      <BlockMath math="\ell^2 = \left\{ (a_1, a_2, \dots) : \sum_n |a_n|^2 < \infty \right\}." />

      <p>
        Inner product:{" "}
        <InlineMath math="\langle a, b \rangle = \sum_n \overline{a_n} b_n" />.
        Complete (Riesz–Fischer). Separable: rationals with finite
        support are dense.
      </p>

      <h3><InlineMath math="L^2(\mathbb{R})" /></h3>

      <p>
        The space of (equivalence classes of) square-integrable
        functions:
      </p>
      <BlockMath math="L^2(\mathbb{R}) = \left\{ f : \int_{-\infty}^{\infty} |f(x)|^2 \, dx < \infty \right\}" />

      <p>
        identifying functions equal almost everywhere. Inner
        product:{" "}
        <InlineMath math="\langle f, g \rangle = \int \overline{f(x)} g(x) \, dx" />.
        Complete (Riesz–Fischer); the completion uses the Lebesgue
        integral from Tier IX.
      </p>

      <h3><InlineMath math="L^2[0, 1]" /></h3>

      <p>
        Same as <InlineMath math="L^2(\mathbb{R})" /> but on a
        bounded interval. The natural setting for Fourier series
        — periodic functions live here.
      </p>

      <p>
        All separable Hilbert spaces are{" "}
        <em>isomorphic</em>. Pick an orthonormal basis and you've
        established the iso. So{" "}
        <InlineMath math="\ell^2" />,{" "}
        <InlineMath math="L^2(\mathbb{R})" />, and{" "}
        <InlineMath math="L^2[0, 1]" /> are all "the same" Hilbert
        space, related by choice of basis (Fourier transform,
        Fourier series, etc.).
      </p>

      <Pitfall>
        Don't confuse <InlineMath math="L^2" /> with{" "}
        <InlineMath math="L^p" /> for{" "}
        <InlineMath math="p \neq 2" />. Only{" "}
        <InlineMath math="L^2" /> is a Hilbert space — the other{" "}
        <InlineMath math="L^p" /> spaces are Banach spaces but
        lack an inner product. The Hölder/Minkowski theory still
        applies, but no notion of "orthogonal" or "angle".
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Orthonormal bases</h2>

      <p>
        A subset{" "}
        <InlineMath math="\{e_n\}_{n \in \mathbb{N}} \subseteq \mathcal H" /> is an{" "}
        <strong>orthonormal basis</strong> if it's orthonormal (
        <InlineMath math="\langle e_m, e_n \rangle = \delta_{mn}" />)
        and every <InlineMath math="v \in \mathcal H" /> can be
        written as
      </p>
      <BlockMath math="v = \sum_{n} \langle e_n, v \rangle \, e_n" />

      <p>
        with the series converging in norm.
      </p>

      <p>
        Note: in infinite dimensions an "orthonormal basis" is not
        a Hamel basis (algebraic basis). It's a Schauder basis —
        every vector is a (potentially infinite) limit of finite
        linear combinations. Hamel bases for infinite-dimensional
        spaces exist (axiom of choice) but are uncountable and
        uninteresting.
      </p>

      <h3>Standard ONBs</h3>

      <ul>
        <li>
          For <InlineMath math="\ell^2" />: standard basis{" "}
          <InlineMath math="e_n = (0, \dots, 0, 1, 0, \dots)" />{" "}
          (1 in position <InlineMath math="n" />).
        </li>
        <li>
          For{" "}
          <InlineMath math="L^2[0, 2\pi]" />: the Fourier basis{" "}
          <InlineMath math="\{e^{i n x} / \sqrt{2\pi}\}_{n \in \mathbb{Z}}" />.
        </li>
        <li>
          For{" "}
          <InlineMath math="L^2(\mathbb{R})" />: Hermite functions{" "}
          <InlineMath math="h_n(x) = H_n(x) e^{-x^2/2}" />{" "}
          (eigenfunctions of the harmonic-oscillator Hamiltonian
          — we'll see them in QM).
        </li>
      </ul>

      <h3>Parseval's identity</h3>

      <p>
        For any orthonormal basis:
      </p>
      <BlockMath math="\|v\|^2 = \sum_n |\langle e_n, v \rangle|^2." />

      <p>
        The squared norm equals the sum of squared coefficients
        in any ONB. In QM, this is "total probability sums to 1".
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Bounded operators on Hilbert space</h2>

      <p>
        An operator <InlineMath math="T : \mathcal H \to \mathcal H" />{" "}
        is <strong>bounded</strong> if{" "}
        <InlineMath math="\|T\| < \infty" />, where the operator
        norm is as in Tier XI Chapter 1. Bounded operators form
        the algebra <InlineMath math="\mathcal B(\mathcal H)" />.
      </p>

      <p>
        Self-adjoint, unitary, normal carry over. Plus a few
        infinite-dimensional-only types:
      </p>
      <ul>
        <li>
          <strong>Compact</strong>: maps bounded sets to
          relatively compact sets. Generalises finite-rank.
          Important: compact normal operators on Hilbert space
          have a complete eigenbasis (the spectral theorem for
          compact operators).
        </li>
        <li>
          <strong>Trace class</strong>: <InlineMath math="\sum |\lambda_i| < \infty" />.
          The "smallest" operators — density matrices in QM are
          trace class.
        </li>
        <li>
          <strong>Hilbert–Schmidt</strong>:{" "}
          <InlineMath math="\sum |\lambda_i|^2 < \infty" />.
          Includes integral operators with{" "}
          <InlineMath math="L^2" /> kernels.
        </li>
      </ul>

      <h3>Spectrum</h3>

      <p>
        For a bounded operator{" "}
        <InlineMath math="T" />, the <strong>spectrum</strong>{" "}
        <InlineMath math="\sigma(T)" /> is the set of{" "}
        <InlineMath math="\lambda \in \mathbb{C}" /> such that{" "}
        <InlineMath math="T - \lambda I" /> is not invertible. In
        finite dimensions, this is just the set of eigenvalues.
        In infinite dimensions there are three sub-types:
      </p>
      <ul>
        <li>
          <strong>Point spectrum</strong>: classical eigenvalues
          (where <InlineMath math="T - \lambda I" /> is not
          injective).
        </li>
        <li>
          <strong>Continuous spectrum</strong>:{" "}
          <InlineMath math="T - \lambda I" /> is injective but
          its image isn't dense, or its inverse is unbounded.
          E.g. the position operator{" "}
          <InlineMath math="\hat x \psi(x) = x \psi(x)" /> on{" "}
          <InlineMath math="L^2(\mathbb{R})" /> has continuous
          spectrum <InlineMath math="\mathbb{R}" /> with no
          eigenvalues at all (no{" "}
          <InlineMath math="\psi" /> satisfies{" "}
          <InlineMath math="x\psi = a\psi" /> in{" "}
          <InlineMath math="L^2" />; "delta functions" aren't in{" "}
          <InlineMath math="L^2" />).
        </li>
        <li>
          <strong>Residual spectrum</strong>: rare; doesn't appear
          for normal operators.
        </li>
      </ul>

      <p>
        For self-adjoint <InlineMath math="T" />,{" "}
        <InlineMath math="\sigma(T) \subseteq \mathbb{R}" />.
      </p>

      <h3>Spectral theorem (bounded normal)</h3>

      <Callout title="Spectral theorem (Hilbert space)">
        Let <InlineMath math="T" /> be a bounded normal operator
        on a Hilbert space <InlineMath math="\mathcal H" />.
        There exists a projection-valued measure{" "}
        <InlineMath math="E" /> on the spectrum such that
        <BlockMath math="T = \int_{\sigma(T)} \lambda \, dE(\lambda)." />
        And for any bounded measurable function{" "}
        <InlineMath math="f" /> on the spectrum,
        <BlockMath math="f(T) = \int_{\sigma(T)} f(\lambda) \, dE(\lambda)." />
      </Callout>

      <p>
        Read: a bounded normal operator can be "diagonalised"
        even when its spectrum is continuous. Instead of a sum
        over eigenvalues, you have an integral against a
        measure-valued projection. This generalises the finite-
        dimensional spectral decomposition{" "}
        <InlineMath math="T = \sum \lambda_i P_i" /> in the
        natural way.
      </p>

      <p>
        Functional calculus follows: you can apply functions to
        bounded normal operators by integrating against the
        spectral measure. <InlineMath math="e^{itH}" /> for
        self-adjoint <InlineMath math="H" /> is well-defined this
        way — the basis of quantum time evolution.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Unbounded operators</h2>

      <p>
        Quantum mechanics needs unbounded operators. Position{" "}
        <InlineMath math="\hat x \psi = x \psi" />, momentum{" "}
        <InlineMath math="\hat p = -i\hbar \partial_x" />, kinetic
        energy{" "}
        <InlineMath math="\hat T = -\hbar^2 \Delta / (2m)" />, the
        full Hamiltonian — none of these are bounded operators on
        all of <InlineMath math="L^2" />. They're only defined on
        suitable dense subspaces (their{" "}
        <em>domains</em>) and grow without bound.
      </p>

      <p>
        Unbounded operator theory is a substantial topic. The
        key facts needed for QM:
      </p>

      <ul>
        <li>
          An unbounded operator{" "}
          <InlineMath math="T" /> with domain{" "}
          <InlineMath math="D(T) \subseteq \mathcal H" /> is{" "}
          <strong>self-adjoint</strong> if{" "}
          <InlineMath math="T = T^*" /> and{" "}
          <InlineMath math="D(T) = D(T^*)" /> — domain matters!
          Not all symmetric operators are self-adjoint.
        </li>
        <li>
          The spectral theorem still holds for self-adjoint
          unbounded operators: there's a projection-valued
          measure on <InlineMath math="\mathbb{R}" /> giving{" "}
          <InlineMath math="T = \int \lambda \, dE(\lambda)" />.
        </li>
        <li>
          By Stone's theorem, self-adjoint operators generate
          unitary groups:{" "}
          <InlineMath math="U(t) = e^{itT}" /> is well-defined
          and gives the time evolution.
        </li>
      </ul>

      <p>
        These are the tools that make the Schrödinger equation
        rigorous. Without them, "the wavefunction evolves under{" "}
        <InlineMath math="e^{-iHt/\hbar}" />" is hand-waving;
        with them, it's a precise statement about strongly-
        continuous one-parameter unitary groups.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Tensor products of Hilbert spaces</h2>

      <p>
        The tensor product of Hilbert spaces is defined the same
        way as for finite dimensions, but with completion: take
        the algebraic tensor product of the inner-product spaces,
        define an inner product by{" "}
        <InlineMath math="\langle u_1 \otimes v_1, u_2 \otimes v_2 \rangle = \langle u_1, u_2 \rangle \langle v_1, v_2 \rangle" />,
        and complete in the resulting norm.
      </p>

      <p>
        For two qubits, no completion needed (finite
        dimensions). For two particles in 3D space:{" "}
        <InlineMath math="L^2(\mathbb{R}^3) \otimes L^2(\mathbb{R}^3) \cong L^2(\mathbb{R}^6)" />{" "}
        — the Hilbert space of two particles is wave-functions of{" "}
        <em>both</em> positions, completed in{" "}
        <InlineMath math="L^2" />.
      </p>

      <p>
        For <InlineMath math="N" /> identical particles, the
        physical Hilbert space is the symmetric (boson) or
        antisymmetric (fermion) subspace. For{" "}
        <InlineMath math="N" /> fermions, the antisymmetric
        subspace is{" "}
        <InlineMath math="\Lambda^N L^2(\mathbb{R}^3)" /> — the
        wedge product space from the previous chapter, now in{" "}
        <InlineMath math="L^2" />.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Quantum mechanics.</strong> States are
          (equivalence classes of) unit vectors in a Hilbert
          space. Observables are self-adjoint operators (often
          unbounded). Time evolution is a unitary group{" "}
          <InlineMath math="U(t) = e^{-iHt/\hbar}" />.
          Measurement is projection onto eigenspaces, with
          probabilities given by Born's rule. The whole formalism
          is Hilbert-space mathematics.
        </li>
        <li>
          <strong>Quantum field theory.</strong> Fields are
          operator-valued distributions on space-time. Their
          natural setting is a tensor product of infinitely many
          Hilbert spaces — Fock space — built by symmetrising or
          antisymmetrising products of single-particle Hilbert
          spaces.
        </li>
        <li>
          <strong>Signal processing.</strong> Signals are{" "}
          <InlineMath math="L^2" /> functions; the Fourier
          transform is a unitary map{" "}
          <InlineMath math="L^2 \to L^2" />. Sampling theorems,
          aliasing, filter design — all live here.
        </li>
        <li>
          <strong>Stochastic processes.</strong> The space of
          square-integrable random variables on a probability
          space is a Hilbert space. Conditional expectations are
          orthogonal projections; martingale convergence
          theorems use Hilbert-space arguments.
        </li>
        <li>
          <strong>Numerical analysis.</strong> Finite-element
          methods for PDEs work in Hilbert spaces (Sobolev
          spaces). The Lax–Milgram and Riesz representation
          theorems give existence and uniqueness of solutions.
        </li>
      </ul>

      <p>
        That closes Tier XI and the entire pure-math half of the
        syllabus. We've built the mathematical toolkit needed for
        physics: calculus, linear algebra (with infinite
        dimensions), differential equations, complex analysis,
        and the structural theories (algebra, real analysis).
        From here on, the journey is physical: classical
        mechanics, electromagnetism, quantum mechanics. The math
        will be heavily reused but the questions become
        empirical and interpretational.
      </p>

      <p>
        Next: Tier XII — Classical Mechanics. Newton, Lagrange,
        Hamilton — the foundation that quantum mechanics
        modifies.
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
      "A Hilbert space is…",
    options: [
      "a Banach space",
      "an inner-product space that is complete",
      "a finite-dimensional vector space",
      "always infinite-dimensional",
    ],
    correct: 1,
    explanation:
      "Hilbert space = inner-product space + completeness. Cauchy sequences must converge in the space. Finite-dim inner-product spaces are automatically Hilbert (complete by Heine-Borel); infinite-dim ones must explicitly assume it.",
  },
  {
    prompt:
      "All separable Hilbert spaces are…",
    options: [
      "finite-dimensional",
      "complete but not equivalent",
      "isomorphic",
      "equal",
    ],
    correct: 2,
    explanation:
      "Pick an orthonormal basis: every separable Hilbert space corresponds to $\\ell^2$. So $\\ell^2$, $L^2(\\mathbb{R})$, $L^2[0, 1]$ are all isomorphic — different bases of the same abstract space.",
  },
  {
    prompt:
      "The standard inner product on $L^2(\\mathbb{R})$ is…",
    options: [
      "$\\int f g \\, dx$",
      "$\\int \\overline{f(x)} g(x) \\, dx$",
      "$\\sup |f \\cdot g|$",
      "$\\int |fg| \\, dx$",
    ],
    correct: 1,
    explanation:
      "Conjugate the first slot (physicist convention), no absolute values. The result is in general complex; positivity comes from $\\langle f, f \\rangle = \\int |f|^2 \\geq 0$.",
  },
  {
    prompt:
      "The position operator $\\hat x \\psi(x) = x \\psi(x)$ on $L^2(\\mathbb{R})$ has spectrum…",
    options: [
      "discrete eigenvalues only",
      "continuous spectrum equal to $\\mathbb{R}$, with no eigenvalues in $L^2$",
      "no spectrum",
      "purely imaginary",
    ],
    correct: 1,
    explanation:
      "Continuous spectrum $\\mathbb{R}$. There's no $L^2$ function $\\psi$ with $x\\psi = a\\psi$ — the 'eigenfunction' $\\delta(x - a)$ is a distribution, not a function in $L^2$. The spectral theorem still gives $\\hat x = \\int x \\, dE(x)$.",
  },
  {
    prompt:
      "By Stone's theorem, every self-adjoint operator $H$ generates…",
    options: [
      "a Hamel basis",
      "a strongly continuous unitary group $U(t) = e^{itH}$",
      "a compact operator",
      "a $C^*$-algebra",
    ],
    correct: 1,
    explanation:
      "Stone's theorem: self-adjoint operators are exactly the infinitesimal generators of strongly continuous one-parameter unitary groups. This is what makes the Schrödinger time-evolution $U(t) = e^{-iHt/\\hbar}$ rigorously well-defined.",
  },
];
