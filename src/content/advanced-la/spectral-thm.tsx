import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function SpectralThmBody() {
  return (
    <>
      <p>
        The spectral theorem is the most important result in linear
        algebra. It says, broadly: <em>every "nice enough"
        operator can be diagonalised, with an orthonormal basis of
        eigenvectors.</em> "Nice enough" means normal in finite
        dimensions, or self-adjoint / unitary / compact /
        bounded-normal in infinite dimensions. The theorem unifies
        concepts you've met under one roof: eigenvectors,
        diagonalisation, spectral decomposition, and (in infinite
        dimensions) the resolution of the identity.
      </p>
      <p>
        We develop the finite-dimensional spectral theorem
        carefully, prove SVD as the rectangular generalisation,
        then preview the infinite-dimensional setting (Hilbert
        spaces — chapter 4 of this module).
      </p>

      <ReferenceResources
        items={[
          {
            title: "Axler — Linear Algebra Done Right, ch. 7",
            author: "Sheldon Axler",
            duration: "Reading",
            url: "https://linear.axler.net/",
            note: "Cleanest finite-dimensional presentation. Real and complex spectral theorems.",
          },
          {
            title: "MIT 18.06 — Lectures 25, 28, 29 (eigenvalues, diagonalisation, SVD)",
            author: "Gilbert Strang",
            duration: "~3h",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/video_galleries/video-lectures/",
            note: "Strang on spectral theorems — applied flavour.",
          },
          {
            title: "Trefethen &amp; Bau — Numerical Linear Algebra",
            author: "Trefethen / Bau",
            duration: "Reading",
            url: "https://www.cs.cornell.edu/~bindel/class/cs6210-f12/notes/lec01.pdf",
            note: "Numerical perspective — SVD, conditioning, applications. Excellent.",
          },
          {
            title: "Reed &amp; Simon Vol. I, ch. 7 (spectral theorem)",
            author: "Reed / Simon",
            duration: "Reading",
            url: "https://www.elsevier.com/books/methods-of-modern-mathematical-physics/reed/978-0-12-585003-0",
            note: "Functional-analytic generalisations, motivated by QM.",
          },
          {
            title: "SVD applications — 3Blue1Brown / various",
            author: "various",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=singular+value+decomposition+visualised",
            note: "Visual treatments of SVD as the master factorisation.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The complex spectral theorem</h2>

      <Callout title="Spectral theorem (finite-dim, complex)">
        Let <InlineMath math="V" /> be a finite-dimensional complex
        inner-product space and{" "}
        <InlineMath math="T : V \to V" /> linear. The following
        are equivalent:
        <ul>
          <li>
            <InlineMath math="T" /> is normal (
            <InlineMath math="T T^* = T^* T" />).
          </li>
          <li>
            <InlineMath math="V" /> has an orthonormal basis
            consisting of eigenvectors of <InlineMath math="T" />.
          </li>
        </ul>
        In the second case,{" "}
        <InlineMath math="T = U D U^*" /> with{" "}
        <InlineMath math="U" /> unitary and{" "}
        <InlineMath math="D" /> diagonal.
      </Callout>

      <p>
        Specialisations:
      </p>
      <ul>
        <li>
          <strong>Self-adjoint</strong> operators: same theorem,
          plus all eigenvalues real.
        </li>
        <li>
          <strong>Unitary</strong> operators: eigenvalues on the
          unit circle.
        </li>
        <li>
          <strong>Anti-Hermitian</strong>{" "}
          (<InlineMath math="T^* = -T" />): eigenvalues purely
          imaginary.
        </li>
      </ul>

      <h3>Spectral decomposition</h3>

      <p>
        Equivalently, a normal operator <InlineMath math="T" /> can
        be written as
      </p>
      <BlockMath math="T = \sum_i \lambda_i P_i," />

      <p>
        where <InlineMath math="\lambda_i" /> are the distinct
        eigenvalues and <InlineMath math="P_i" /> is the orthogonal
        projection onto the corresponding eigenspace. The{" "}
        <InlineMath math="P_i" /> are mutually orthogonal (
        <InlineMath math="P_i P_j = 0" /> for{" "}
        <InlineMath math="i \neq j" />) and sum to the identity
        (resolution of the identity:{" "}
        <InlineMath math="\sum P_i = I" />).
      </p>

      <h3>The real spectral theorem</h3>

      <p>
        Over real inner product spaces the situation is more
        delicate. A real operator might not have any real
        eigenvalues (rotation by{" "}
        <InlineMath math="\pi/4" /> in <InlineMath math="\mathbb{R}^2" />).
        The clean statement:
      </p>

      <Callout title="Real spectral theorem">
        A real operator on a finite-dimensional real
        inner-product space is{" "}
        <em>self-adjoint</em> (<InlineMath math="T^T = T" />) iff it
        is orthogonally diagonalisable.
      </Callout>

      <p>
        For real, normal-but-not-self-adjoint operators (real
        rotations, for instance), you only get diagonalisation
        with <em>2×2 rotation blocks</em> rather than scalars.
        Going to <InlineMath math="\mathbb{C}" /> resolves this —
        the rotation block diagonalises with complex eigenvalues{" "}
        <InlineMath math="e^{\pm i\theta}" />.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Functional calculus</h2>

      <p>
        Once we can diagonalise, we can <em>apply functions</em>{" "}
        to operators — not just polynomials.
      </p>

      <Callout title="Functional calculus">
        Let{" "}
        <InlineMath math="T = \sum_i \lambda_i P_i" /> be the
        spectral decomposition of a normal operator. For any
        function <InlineMath math="f : \sigma(T) \to \mathbb{C}" />{" "}
        (defined on the spectrum, i.e. eigenvalues), define
        <BlockMath math="f(T) = \sum_i f(\lambda_i) P_i." />
      </Callout>

      <p>
        Examples:
      </p>
      <ul>
        <li>
          <InlineMath math="T^n" /> for any{" "}
          <InlineMath math="n" />: apply{" "}
          <InlineMath math="z \mapsto z^n" />.
        </li>
        <li>
          <InlineMath math="T^{-1}" /> when 0 is not an eigenvalue:
          apply{" "}
          <InlineMath math="z \mapsto 1/z" />.
        </li>
        <li>
          <InlineMath math="\sqrt T" /> for positive-semidefinite{" "}
          self-adjoint <InlineMath math="T" />: apply{" "}
          <InlineMath math="z \mapsto \sqrt z" />.
        </li>
        <li>
          <InlineMath math="e^T" />: apply{" "}
          <InlineMath math="z \mapsto e^z" />. Same as the matrix
          exponential we met in eigen + ODE chapters.
        </li>
        <li>
          <InlineMath math="\log T" /> for positive-definite{" "}
          self-adjoint <InlineMath math="T" />.
        </li>
      </ul>

      <p>
        Quantum-mechanical use: the time-evolution operator{" "}
        <InlineMath math="U(t) = e^{-iHt/\hbar}" /> is a functional
        calculus on the Hamiltonian{" "}
        <InlineMath math="H" /> (which is self-adjoint). Energy
        eigenstates pick up phases{" "}
        <InlineMath math="e^{-iE_n t/\hbar}" />.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Singular Value Decomposition</h2>

      <p>
        For non-square or non-normal operators, the right
        factorisation is the <strong>SVD</strong>.
      </p>

      <Callout title="Singular Value Decomposition">
        Every <InlineMath math="m \times n" /> matrix{" "}
        <InlineMath math="A" /> over{" "}
        <InlineMath math="\mathbb{C}" /> factors as
        <BlockMath math="A = U \Sigma V^*" />
        where:
        <ul>
          <li>
            <InlineMath math="U" /> is{" "}
            <InlineMath math="m \times m" /> unitary.
          </li>
          <li>
            <InlineMath math="V" /> is{" "}
            <InlineMath math="n \times n" /> unitary.
          </li>
          <li>
            <InlineMath math="\Sigma" /> is{" "}
            <InlineMath math="m \times n" /> diagonal (
            <InlineMath math="\Sigma_{ii} = \sigma_i" /> singular
            values, off-diagonal zero), with{" "}
            <InlineMath math="\sigma_1 \geq \sigma_2 \geq \cdots \geq 0" />.
          </li>
        </ul>
      </Callout>

      <p>
        Geometrically, every linear map factors as: rotate (
        <InlineMath math="V^*" />), scale along axes (
        <InlineMath math="\Sigma" />), rotate (
        <InlineMath math="U" />). Three of the cleanest geometric
        operations, in three steps.
      </p>

      <h3>Why it's true</h3>

      <p>
        The matrix <InlineMath math="A^* A" /> is positive-semi-
        definite self-adjoint, hence has a non-negative real
        spectrum and an orthonormal eigenbasis (spectral theorem).
        The eigenvalues of <InlineMath math="A^* A" /> are{" "}
        <InlineMath math="\sigma_i^2" />, and the right singular
        vectors (columns of <InlineMath math="V" />) are its
        eigenvectors. The left singular vectors come from{" "}
        <InlineMath math="A V = U \Sigma" />.
      </p>

      <h3>Pseudoinverse</h3>

      <p>
        The Moore–Penrose pseudoinverse:
      </p>
      <BlockMath math="A^+ = V \Sigma^+ U^*" />

      <p>
        where <InlineMath math="\Sigma^+" /> is{" "}
        <InlineMath math="\Sigma" /> transposed with non-zero
        diagonal entries inverted. <InlineMath math="A^+" />{" "}
        coincides with <InlineMath math="A^{-1}" /> when{" "}
        <InlineMath math="A" /> is square invertible. In general it
        gives the least-squares solution to{" "}
        <InlineMath math="A x = b" />:{" "}
        <InlineMath math="x = A^+ b" /> minimises{" "}
        <InlineMath math="\|A x - b\|" />.
      </p>

      <h3>Low-rank approximation</h3>

      <p>
        Truncating SVD to the top <InlineMath math="k" /> singular
        values gives the best rank-<InlineMath math="k" />{" "}
        approximation in operator norm (and Frobenius norm) — the
        Eckart–Young theorem. This is the basis of:
      </p>
      <ul>
        <li>
          <strong>Image compression.</strong> Truncate the SVD of
          the image matrix.
        </li>
        <li>
          <strong>Latent semantic indexing.</strong> Keep top
          singular vectors of a term-document matrix.
        </li>
        <li>
          <strong>Recommender systems.</strong> Matrix completion
          of user-item ratings via low-rank approximation.
        </li>
        <li>
          <strong>PCA.</strong> Principal components are right
          singular vectors of the centred data matrix.
        </li>
      </ul>

      <Pitfall>
        SVD is numerically robust where eigendecomposition can
        fail. For non-symmetric matrices, eigenvalues can be
        ill-conditioned (small perturbations cause large
        changes), but singular values are well-conditioned. SVD
        is the workhorse for serious numerical work.
      </Pitfall>

      <Exercise
        number="3.1"
        prompt={
          <>
            Compute the SVD of{" "}
            <InlineMath math="A = \begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix}" />.
          </>
        }
      >
        <p>
          Already diagonal with positive entries. Singular values{" "}
          <InlineMath math="\sigma_1 = 2, \sigma_2 = 1" /> (in
          descending order). To match the convention, swap the
          rows / columns: <InlineMath math="A = U \Sigma V^*" />{" "}
          with{" "}
          <InlineMath math="U = V = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}" /> and{" "}
          <InlineMath math="\Sigma = \begin{pmatrix} 2 & 0 \\ 0 & 1 \end{pmatrix}" />.
          (Or just keep <InlineMath math="A = I \cdot \mathrm{diag}(1, 2) \cdot I" /> as
          a "non-canonical" SVD — both work.) ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Operator decompositions</h2>

      <p>
        Beyond eigendecomposition and SVD, several other
        canonical factorisations are useful:
      </p>

      <ul>
        <li>
          <strong>QR decomposition.</strong>{" "}
          <InlineMath math="A = QR" /> with{" "}
          <InlineMath math="Q" /> orthogonal /{" "}
          unitary and{" "}
          <InlineMath math="R" /> upper triangular. Comes from
          Gram–Schmidt or Householder reflections. Used for
          numerically stable least squares.
        </li>
        <li>
          <strong>LU decomposition.</strong> From Gaussian
          elimination. We met this in Tier III.
        </li>
        <li>
          <strong>Cholesky decomposition.</strong>{" "}
          <InlineMath math="A = LL^*" /> for positive-definite
          self-adjoint <InlineMath math="A" />, with{" "}
          <InlineMath math="L" /> lower-triangular. Twice as fast
          as LU and numerically stable.
        </li>
        <li>
          <strong>Polar decomposition.</strong>{" "}
          <InlineMath math="A = U P" /> with{" "}
          <InlineMath math="U" /> unitary and{" "}
          <InlineMath math="P = \sqrt{A^* A}" /> positive-semi-
          definite self-adjoint. Generalises{" "}
          <InlineMath math="z = e^{i\theta} r" /> for complex
          numbers. Used in continuum mechanics for stress / strain
          decomposition.
        </li>
        <li>
          <strong>Schur decomposition.</strong>{" "}
          <InlineMath math="A = U T U^*" /> with{" "}
          <InlineMath math="U" /> unitary,{" "}
          <InlineMath math="T" /> upper-triangular. Always
          exists; for normal <InlineMath math="A" />,{" "}
          <InlineMath math="T" /> is diagonal — the spectral
          theorem.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Why this matters</h2>

      <ul>
        <li>
          <strong>Quantum mechanics.</strong> Energy eigenstates
          come from spectral decomposition of the Hamiltonian.
          Time evolution{" "}
          <InlineMath math="e^{-iHt/\hbar}" /> is exactly the
          functional calculus on a self-adjoint operator. Every
          observable's expectation value{" "}
          <InlineMath math="\langle \psi | A | \psi\rangle" /> uses
          spectral structure when interpreted as a sum over
          eigenvalues.
        </li>
        <li>
          <strong>Quantum computing.</strong> Quantum gates are
          unitary matrices with eigenvalues on the unit circle.
          The Quantum Phase Estimation algorithm extracts these
          eigenvalues — the heart of Shor's factoring algorithm.
        </li>
        <li>
          <strong>Data science.</strong> SVD is the master
          factorisation of data analysis. PCA, LSI, recommender
          systems, image compression, robust regression — all
          downstream of SVD.
        </li>
        <li>
          <strong>Numerical methods.</strong> Krylov subspace
          methods (CG, GMRES, Lanczos) use spectral structure to
          accelerate solvers. Convergence theory uses the
          eigenvalue distribution.
        </li>
        <li>
          <strong>Mathematical physics.</strong> Schrödinger
          operators, Dirac operators, and their spectra. The
          spectral theorem in unbounded form (next chapter)
          underpins stationary states, scattering, and bound-state
          existence.
        </li>
      </ul>

      <p>
        Next chapter: tensor products. The right way to combine
        vector spaces (and operators) into bigger ones — and the
        mathematical home of multi-particle quantum mechanics.
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
      "By the (complex finite-dim) spectral theorem, $T$ is normal iff…",
    options: [
      "$T$ has $n$ distinct eigenvalues",
      "$V$ has an orthonormal basis of eigenvectors of $T$",
      "$T$ is invertible",
      "$T = T^*$",
    ],
    correct: 1,
    explanation:
      "Normal ⇔ unitarily diagonalisable. Self-adjoint and unitary are special cases (with real / unit-circle eigenvalues respectively).",
  },
  {
    prompt:
      "By spectral decomposition, $T = \\sum \\lambda_i P_i$ where $P_i$ is…",
    options: [
      "the matrix exponential",
      "the orthogonal projection onto the $\\lambda_i$-eigenspace",
      "the inverse of $T$",
      "the i-th eigenvector",
    ],
    correct: 1,
    explanation:
      "$P_i$ projects orthogonally onto the eigenspace for $\\lambda_i$. They satisfy $\\sum P_i = I$ (resolution of the identity), $P_i P_j = 0$ for $i \\neq j$.",
  },
  {
    prompt:
      "The functional calculus extends the spectral theorem to…",
    options: [
      "applying any function $f$ on the spectrum to the operator",
      "computing the inverse only",
      "infinite-dimensional spaces only",
      "non-normal operators",
    ],
    correct: 0,
    explanation:
      "$f(T) = \\sum f(\\lambda_i) P_i$ for any $f$ defined on the spectrum. So $e^T$, $\\sqrt T$, $T^{-1}$, and many other functions of operators are all defined cleanly.",
  },
  {
    prompt:
      "The SVD $A = U \\Sigma V^*$ exists for…",
    options: [
      "only square matrices",
      "only symmetric matrices",
      "any rectangular matrix over $\\mathbb{C}$",
      "only unitary matrices",
    ],
    correct: 2,
    explanation:
      "Every $m \\times n$ complex matrix has an SVD. This generality (vs. eigendecomposition, which needs square + diagonalisable) is why SVD dominates numerical work.",
  },
  {
    prompt:
      "Truncating SVD to the top $k$ singular values gives the best rank-$k$ approximation in… (Eckart–Young theorem)",
    options: [
      "L^1 norm only",
      "operator norm and Frobenius norm",
      "no specific norm",
      "manhattan distance",
    ],
    correct: 1,
    explanation:
      "Eckart–Young: the rank-$k$ truncation $A_k = \\sum_{i=1}^{k} \\sigma_i u_i v_i^*$ is the best rank-$k$ approximation in both operator norm and Frobenius norm. The basis of PCA, image compression, etc.",
  },
];
