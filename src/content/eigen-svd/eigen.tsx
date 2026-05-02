import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function EigenBody() {
  return (
    <>
      <p>
        An <strong>eigenvector</strong> of a square matrix{" "}
        <InlineMath math="A" /> is a non-zero vector that the
        map only stretches — it doesn't rotate or shear.
        Geometrically: special directions that survive the
        transformation. Algebraically:{" "}
        <InlineMath math="A\mathbf{v} = \lambda \mathbf{v}" />,
        where the scalar{" "}
        <InlineMath math="\lambda" /> is the{" "}
        <strong>eigenvalue</strong>.
      </p>
      <p>
        Why we care: in an eigenbasis, a complicated linear
        map becomes diagonal — and the entire toolbox of
        diagonal-matrix tricks (powers, exponentials, ODEs)
        becomes available. PCA, normal modes, Markov-chain
        steady states, the matrix exponential, page-rank,
        spectral clustering — all are eigenvalue stories.
      </p>

      <ReferenceResources
        items={[
          {
            title: "3Blue1Brown — EOLA 14",
            author: "Grant Sanderson",
            duration: "~17 min",
            url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
            note: "The cleanest geometric introduction. Watch first.",
          },
          {
            title: "MIT 18.06 — Lectures 21, 22, 25",
            author: "Gilbert Strang",
            duration: "~3h",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
            note: "21 (eigenvalues), 22 (diagonalisation), 25 (symmetric matrices, positive-definiteness).",
          },
          {
            title: "MML Ch 4.2, 4.4",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "Eigendecomposition, diagonalisation, applications to PCA.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The eigenvalue equation</h2>

      <Callout title="Definition · Eigenvector & eigenvalue">
        For a square matrix{" "}
        <InlineMath math="A \in \mathbb{R}^{n \times n}" />,
        a non-zero vector{" "}
        <InlineMath math="\mathbf{v}" /> is an{" "}
        <strong>eigenvector</strong> with{" "}
        <strong>eigenvalue</strong>{" "}
        <InlineMath math="\lambda \in \mathbb{C}" /> if
        <BlockMath math="A \mathbf{v} = \lambda \mathbf{v}." />
      </Callout>

      <p>
        "On these directions the map is just multiplication
        by a number." That's the entire content. Everything
        else is mechanism.
      </p>

      <h3>Why a non-zero vector?</h3>

      <p>
        We exclude{" "}
        <InlineMath math="\mathbf{v} = \mathbf{0}" /> because{" "}
        <InlineMath math="A \cdot \mathbf{0} = \mathbf{0} = \lambda \cdot \mathbf{0}" />{" "}
        for every <InlineMath math="\lambda" /> — it would
        make the definition vacuous. Eigenvectors are special
        non-zero directions; eigenvalues are how much they
        get scaled.
      </p>

      <h3>Eigenspaces</h3>

      <p>
        For a fixed eigenvalue{" "}
        <InlineMath math="\lambda" />, the set of vectors
        satisfying{" "}
        <InlineMath math="A\mathbf{v} = \lambda \mathbf{v}" /> is
      </p>
      <BlockMath math="E_\lambda = N(A - \lambda I) = \{\mathbf{v} : (A - \lambda I)\mathbf{v} = \mathbf{0}\}." />

      <p>
        The <strong>eigenspace</strong>{" "}
        <InlineMath math="E_\lambda" /> is a subspace (it's a
        null space — Module I, Chapter 3). Its dimension is the{" "}
        <strong>geometric multiplicity</strong> of{" "}
        <InlineMath math="\lambda" />.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Computing eigenvalues</h2>

      <p>
        The eigenvalue equation{" "}
        <InlineMath math="(A - \lambda I)\mathbf{v} = \mathbf{0}" />{" "}
        has a non-zero solution iff{" "}
        <InlineMath math="A - \lambda I" /> is{" "}
        <em>singular</em>. Singular ⇔ determinant zero. So
        eigenvalues are roots of:
      </p>

      <Callout title="The characteristic polynomial">
        <BlockMath math="p_A(\lambda) := \det(A - \lambda I) = 0." />
        For an <InlineMath math="n \times n" /> matrix this is
        a polynomial of degree <InlineMath math="n" /> in{" "}
        <InlineMath math="\lambda" /> with{" "}
        <InlineMath math="n" /> roots in{" "}
        <InlineMath math="\mathbb{C}" /> (counting
        multiplicity).
      </Callout>

      <p>
        Procedure:
      </p>
      <ol>
        <li>
          Compute{" "}
          <InlineMath math="p_A(\lambda) = \det(A - \lambda I)" />.
        </li>
        <li>
          Solve{" "}
          <InlineMath math="p_A(\lambda) = 0" /> for the
          eigenvalues.
        </li>
        <li>
          For each <InlineMath math="\lambda" />, find the
          null space of{" "}
          <InlineMath math="A - \lambda I" /> — that's{" "}
          <InlineMath math="E_\lambda" />.
        </li>
      </ol>

      <h3>2×2 example</h3>

      <p>
        Take{" "}
        <InlineMath math="A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}" />.
        Then{" "}
        <InlineMath math="A - \lambda I = \begin{pmatrix} 2 - \lambda & 1 \\ 1 & 2 - \lambda \end{pmatrix}" />{" "}
        and
      </p>
      <BlockMath math="\det(A - \lambda I) = (2 - \lambda)^2 - 1 = \lambda^2 - 4\lambda + 3 = (\lambda - 1)(\lambda - 3)." />

      <p>
        Eigenvalues: <InlineMath math="\lambda = 1, 3" />.
      </p>

      <p>
        For{" "}
        <InlineMath math="\lambda = 1" />:{" "}
        <InlineMath math="(A - I)\mathbf{v} = \mathbf{0}" />{" "}
        gives{" "}
        <InlineMath math="\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}\mathbf{v} = \mathbf{0}" />,
        so{" "}
        <InlineMath math="\mathbf{v}_1 = (1, -1)^T" /> (any
        scalar multiple).
      </p>

      <p>
        For{" "}
        <InlineMath math="\lambda = 3" />:{" "}
        <InlineMath math="(A - 3I)\mathbf{v} = \mathbf{0}" />{" "}
        gives{" "}
        <InlineMath math="\mathbf{v}_2 = (1, 1)^T" />.
      </p>

      <Pitfall>
        Computing eigenvalues by hand via the characteristic
        polynomial is fine for{" "}
        <InlineMath math="2 \times 2" /> and{" "}
        <InlineMath math="3 \times 3" />. For larger matrices,
        the polynomial route is{" "}
        <em>numerically terrible</em> (roots are unstable
        functions of the coefficients). Real software uses
        iterative methods like the{" "}
        <strong>QR algorithm</strong> instead.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Trace, determinant, and eigenvalues</h2>

      <p>
        Two free identities, useful for sanity checks:
      </p>

      <Callout title="Sum and product">
        <BlockMath math="\mathrm{tr}(A) = \sum_{i=1}^n \lambda_i, \qquad \det(A) = \prod_{i=1}^n \lambda_i." />
        Both hold counting algebraic multiplicity.
      </Callout>

      <p>
        For the 2×2 example above:{" "}
        <InlineMath math="\mathrm{tr}(A) = 4" />,{" "}
        <InlineMath math="\det(A) = 3" />, and indeed{" "}
        <InlineMath math="1 + 3 = 4" />,{" "}
        <InlineMath math="1 \cdot 3 = 3" />. ✓
      </p>

      <p>
        Two important corollaries:
      </p>
      <ul>
        <li>
          <InlineMath math="A" /> is singular ⇔{" "}
          <InlineMath math="\det(A) = 0" /> ⇔ at least one
          eigenvalue is zero.
        </li>
        <li>
          A matrix with all eigenvalues positive has positive
          determinant; with all real positive eigenvalues, it
          is "positive-definite-ish" (we'll make this precise
          when discussing symmetric matrices).
        </li>
      </ul>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Algebraic vs geometric multiplicity</h2>

      <p>
        Two notions of how "fat" an eigenvalue is.
      </p>

      <ul>
        <li>
          <strong>Algebraic multiplicity</strong>{" "}
          <InlineMath math="m_a(\lambda)" />: how many times{" "}
          <InlineMath math="\lambda" /> appears as a root of{" "}
          <InlineMath math="p_A" />.
        </li>
        <li>
          <strong>Geometric multiplicity</strong>{" "}
          <InlineMath math="m_g(\lambda) = \dim E_\lambda" />:
          how many independent eigenvectors are associated
          with <InlineMath math="\lambda" />.
        </li>
      </ul>

      <p>
        Always{" "}
        <InlineMath math="m_g(\lambda) \le m_a(\lambda)" />.
        When the inequality is strict, the matrix is{" "}
        <strong>defective</strong> (not enough eigenvectors).
        Defective matrices cannot be diagonalised — they
        require Jordan form, which we'll skip; for ML and
        microstructure, the matrices we'll meet are
        diagonalisable in practice (often even orthogonally
        diagonalisable).
      </p>

      <Exercise prompt="Find eigenvalues, eigenspaces, and both multiplicities for $A = \begin{pmatrix} 2 & 1 \\ 0 & 2 \end{pmatrix}$.">
        <p>
          <InlineMath math="\det(A - \lambda I) = (2 - \lambda)^2" />.
          One eigenvalue:{" "}
          <InlineMath math="\lambda = 2" /> with{" "}
          <InlineMath math="m_a = 2" />.
        </p>
        <p>
          <InlineMath math="(A - 2I)\mathbf{v} = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}\mathbf{v} = \mathbf{0}" />{" "}
          forces{" "}
          <InlineMath math="v_2 = 0" />, so{" "}
          <InlineMath math="\mathbf{v} = (1, 0)^T" /> spans the
          eigenspace. <InlineMath math="m_g = 1" />.
        </p>
        <p>
          <InlineMath math="m_g < m_a" />: this is a defective
          matrix (a Jordan block). Not diagonalisable.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Symmetric matrices and the spectral theorem</h2>

      <p>
        The most important class of matrices for ML, statistics,
        and physics. They are <em>always</em> diagonalisable,
        with extra structure that makes everything easier.
      </p>

      <Callout title="Spectral theorem (real symmetric case)">
        If{" "}
        <InlineMath math="A = A^T \in \mathbb{R}^{n \times n}" />,
        then:
        <ul>
          <li>
            All eigenvalues are real.
          </li>
          <li>
            Eigenvectors of distinct eigenvalues are orthogonal.
          </li>
          <li>
            <InlineMath math="A" /> has an orthonormal basis of
            eigenvectors. In particular,{" "}
            <InlineMath math="A = Q \Lambda Q^T" /> with{" "}
            <InlineMath math="Q^T Q = I" /> (orthogonal) and{" "}
            <InlineMath math="\Lambda" /> diagonal.
          </li>
        </ul>
      </Callout>

      <p>
        Symmetric matrices are everywhere:
      </p>
      <ul>
        <li>
          Covariance matrices (always symmetric and positive
          semi-definite).
        </li>
        <li>
          Hessians of smooth functions.
        </li>
        <li>
          Gram matrices{" "}
          <InlineMath math="G_{ij} = \mathbf{v}_i \cdot \mathbf{v}_j" />.
        </li>
        <li>
          Adjacency matrices of undirected graphs.
        </li>
        <li>
          Most physically-meaningful operators in finite QM.
        </li>
      </ul>

      <h3>Positive-definite, positive-semi-definite</h3>

      <p>
        A symmetric matrix is{" "}
        <strong>positive-definite</strong> (PD) if{" "}
        <InlineMath math="\mathbf{x}^T A \mathbf{x} > 0" /> for
        all <InlineMath math="\mathbf{x} \ne \mathbf{0}" />, and{" "}
        <strong>positive-semi-definite</strong> (PSD) if the
        inequality is non-strict.
      </p>

      <p>
        Equivalent characterisations:
      </p>
      <ul>
        <li>
          PD ⇔ all eigenvalues{" "}
          <InlineMath math="> 0" />.
        </li>
        <li>
          PSD ⇔ all eigenvalues{" "}
          <InlineMath math="\ge 0" />.
        </li>
        <li>
          PD ⇔ Cholesky factorisation{" "}
          <InlineMath math="A = L L^T" /> with{" "}
          <InlineMath math="L" /> lower-triangular and
          positive diagonal.
        </li>
      </ul>

      <h3>Hermitian matrices (complex case)</h3>

      <p>
        For complex matrices, the right generalisation is{" "}
        <strong>Hermitian</strong>:{" "}
        <InlineMath math="A^* = A" /> where{" "}
        <InlineMath math="A^*" /> is the conjugate transpose.
        All the spectral-theorem statements carry over (real
        eigenvalues, unitary diagonalisation). Hermitian
        operators are the basis of QM (Module XV in the quantum
        pathway), but here we mostly work with real symmetric
        matrices.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Special eigenvalues</h2>

      <h3>Zero eigenvalue</h3>

      <p>
        <InlineMath math="\lambda = 0" /> ⇔ there's a non-zero{" "}
        <InlineMath math="\mathbf{v}" /> with{" "}
        <InlineMath math="A\mathbf{v} = \mathbf{0}" /> ⇔{" "}
        <InlineMath math="\mathbf{v} \in N(A)" /> non-trivially
        ⇔ <InlineMath math="A" /> is singular.
      </p>

      <p>
        So "0 is an eigenvalue" is just another way of saying{" "}
        <InlineMath math="A" /> is singular. Yet another item
        for the Invertible Matrix Theorem from Module I.
      </p>

      <h3>Repeated eigenvalues</h3>

      <p>
        Repeated eigenvalues are common in symmetric matrices
        (think: identity has{" "}
        <InlineMath math="\lambda = 1" /> with multiplicity{" "}
        <InlineMath math="n" />). For symmetric matrices,
        repeated eigenvalues come with full geometric
        multiplicity, so{" "}
        <InlineMath math="A" /> is still diagonalisable; you
        just have freedom in choosing an orthonormal basis of
        the eigenspace.
      </p>

      <h3>Complex eigenvalues</h3>

      <p>
        Real matrices can have complex eigenvalues (always in
        conjugate pairs). Pure rotations are the canonical
        example:{" "}
        <InlineMath math="R_\theta = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}" />{" "}
        has eigenvalues{" "}
        <InlineMath math="e^{\pm i\theta}" />. Symmetric
        matrices, however, always have real eigenvalues.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>PCA</strong>: principal components are the
          eigenvectors of the covariance matrix, ordered by
          eigenvalue. The biggest eigenvalue ↔ the direction of
          maximum variance. We'll do this in Module VI.
        </li>
        <li>
          <strong>Stability of dynamical systems</strong>:{" "}
          <InlineMath math="\dot{\mathbf{x}} = A\mathbf{x}" />{" "}
          is stable iff all eigenvalues of{" "}
          <InlineMath math="A" /> have negative real part.
          Same idea sets the criticality of Hawkes processes
          (Module VII): branching ratio{" "}
          <InlineMath math="\rho(\Phi) < 1" />.
        </li>
        <li>
          <strong>Markov chains &amp; spectral gap</strong>:
          the second-largest eigenvalue of a transition matrix
          controls how fast the chain mixes. Page-rank,
          MCMC convergence, opinion dynamics — all spectral.
        </li>
        <li>
          <strong>Conditioning of OLS</strong>: the condition
          number of{" "}
          <InlineMath math="X^T X" /> is{" "}
          <InlineMath math="\lambda_{\max}/\lambda_{\min}" />.
          Big gap = ill-conditioned = numerically painful.
          Ridge regression nudges the small eigenvalues away
          from zero.
        </li>
        <li>
          <strong>Microstructure preview</strong>:
          autocovariance matrices of order-flow signs, factor
          structure of equity returns, eigen-decompositions
          of Hawkes kernel matrices for branching-ratio
          estimation — all leverage the same machinery.
        </li>
      </ul>

      <p>
        Next chapter: diagonalisation. Once we have an
        eigenbasis, we can write{" "}
        <InlineMath math="A = P D P^{-1}" /> and powers,
        exponentials, and ODE solutions become easy.
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
      "$\\mathbf{v}$ is an eigenvector of $A$ with eigenvalue $\\lambda$ if…",
    options: [
      "$A\\mathbf{v} = \\mathbf{0}$",
      "$A\\mathbf{v} = \\lambda \\mathbf{v}$ and $\\mathbf{v} \\ne \\mathbf{0}$",
      "$A\\mathbf{v} = \\mathbf{v}$",
      "$\\mathbf{v}^T A = \\lambda \\mathbf{v}^T$",
    ],
    correct: 1,
    explanation:
      "Definition. The non-zero requirement is essential — otherwise every vector is trivially an 'eigenvector' for every $\\lambda$.",
  },
  {
    prompt:
      "Eigenvalues of $A$ are roots of…",
    options: [
      "$\\det(A) = 0$",
      "$\\det(A - \\lambda I) = 0$",
      "$\\mathrm{tr}(A) = 0$",
      "$A^2 = 0$",
    ],
    correct: 1,
    explanation:
      "$(A - \\lambda I)\\mathbf{v} = \\mathbf{0}$ has a non-zero $\\mathbf{v}$ iff $A - \\lambda I$ is singular iff $\\det(A - \\lambda I) = 0$. This polynomial in $\\lambda$ is the characteristic polynomial.",
  },
  {
    prompt:
      "For a real symmetric matrix $A$, the spectral theorem guarantees…",
    options: [
      "$A$ has only positive eigenvalues",
      "$A$ has an orthonormal basis of eigenvectors and all eigenvalues are real",
      "$A$ is diagonal",
      "$A^2 = I$",
    ],
    correct: 1,
    explanation:
      "Real symmetric ⇒ orthogonally diagonalisable ($A = Q \\Lambda Q^T$). Eigenvalues real, eigenvectors of distinct eigenvalues orthogonal. Foundation of PCA.",
  },
  {
    prompt:
      "$\\mathrm{tr}(A) = ?$ in terms of eigenvalues.",
    options: [
      "$\\prod \\lambda_i$",
      "$\\sum \\lambda_i$",
      "$\\max_i \\lambda_i$",
      "$\\det(A)$",
    ],
    correct: 1,
    explanation:
      "Sum of eigenvalues = trace; product of eigenvalues = determinant. Quick consistency check after computing eigenvalues by hand.",
  },
  {
    prompt:
      "If $\\mathrm{rank}(A) < n$, then…",
    options: [
      "$A$ has no eigenvalues",
      "0 is an eigenvalue of $A$",
      "$A$ is symmetric",
      "$A$ is diagonalisable",
    ],
    correct: 1,
    explanation:
      "$\\mathrm{rank} < n$ ⇒ $N(A) \\ne \\{\\mathbf{0}\\}$ ⇒ there's a non-zero $\\mathbf{v}$ with $A\\mathbf{v} = \\mathbf{0} = 0 \\cdot \\mathbf{v}$. So 0 is an eigenvalue.",
  },
];
