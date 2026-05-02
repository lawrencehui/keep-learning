import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function SvdBody() {
  return (
    <>
      <p>
        The Singular Value Decomposition is the most useful
        single object in applied linear algebra. Every matrix
        — square or rectangular, full-rank or rank-deficient,
        diagonalisable or not — admits an SVD. It packages all
        four fundamental subspaces, the rank, and the
        action of the matrix into one factorisation.
      </p>
      <p>
        Practically: PCA, low-rank approximation, the
        pseudoinverse, total-least-squares, latent semantic
        analysis, recommender systems, denoising — all
        applications of SVD. Spend time getting comfortable
        with this chapter; the dividends across the rest of
        the pathway are enormous.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.06 — Lectures 29, 30",
            author: "Gilbert Strang",
            duration: "~2h",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
            note: "Lecture 29 ('Singular Value Decomposition') is the canonical exposition.",
          },
          {
            title: "MML Ch 4.5–4.6",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "SVD construction + matrix-approximation theorems (Eckart-Young).",
          },
          {
            title: "We Recommend a Singular Value Decomposition",
            author: "AMS feature column (David Austin)",
            duration: "Reading",
            url: "https://www.ams.org/publicoutreach/feature-column/fcarc-svd",
            note: "Beautiful applications-first walk-through. Pairs well with the videos.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The geometry of every linear map</h2>

      <p>
        Here is the SVD theorem in geometric form, before any
        algebra:
      </p>

      <Callout title="Geometric SVD">
        Every linear map{" "}
        <InlineMath math="\mathbb{R}^n \to \mathbb{R}^m" /> can
        be decomposed as <em>rotate × stretch × rotate</em>:
        an orthonormal change of basis on the input, an
        axis-aligned scaling, then an orthonormal change of
        basis on the output.
      </Callout>

      <p>
        In symbols, the decomposition is
      </p>
      <BlockMath math="A = U \, \Sigma \, V^T" />

      <p>
        with:
      </p>
      <ul>
        <li>
          <InlineMath math="U \in \mathbb{R}^{m \times m}" />:
          orthogonal (
          <InlineMath math="U^T U = I" />), columns called{" "}
          <strong>left singular vectors</strong>.
        </li>
        <li>
          <InlineMath math="V \in \mathbb{R}^{n \times n}" />:
          orthogonal, columns called{" "}
          <strong>right singular vectors</strong>.
        </li>
        <li>
          <InlineMath math="\Sigma \in \mathbb{R}^{m \times n}" />:
          diagonal-ish (zeros off the main "diagonal" even
          when non-square), with non-negative entries{" "}
          <InlineMath math="\sigma_1 \ge \sigma_2 \ge \dots \ge 0" />,
          the <strong>singular values</strong>.
        </li>
      </ul>

      <p>
        Reading{" "}
        <InlineMath math="A\mathbf{x} = U \Sigma V^T \mathbf{x}" />{" "}
        right-to-left:
      </p>
      <ol>
        <li>
          <InlineMath math="V^T \mathbf{x}" />: rotate{" "}
          <InlineMath math="\mathbf{x}" /> into the right-
          singular-vector frame.
        </li>
        <li>
          <InlineMath math="\Sigma" />: stretch each axis by
          the corresponding singular value (and possibly
          truncate dimensions if{" "}
          <InlineMath math="m \ne n" />).
        </li>
        <li>
          <InlineMath math="U" />: rotate the result into the
          left-singular-vector frame.
        </li>
      </ol>

      <p>
        Every linear map is <em>diagonal in the right basis</em>.
        SVD makes this explicit using two different bases (
        one for input, one for output) — that's why it works
        even for rectangular and non-diagonalisable matrices.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Building U, Σ, V</h2>

      <p>
        Where does the decomposition come from? Look at the
        matrices{" "}
        <InlineMath math="A^T A \in \mathbb{R}^{n \times n}" />{" "}
        and{" "}
        <InlineMath math="A A^T \in \mathbb{R}^{m \times m}" />.
        Both are symmetric and positive-semi-definite, so the
        spectral theorem applies.
      </p>

      <h3>Right singular vectors and singular values</h3>

      <p>
        Let{" "}
        <InlineMath math="\mathbf{v}_1, \dots, \mathbf{v}_n" />{" "}
        be an orthonormal eigenbasis of{" "}
        <InlineMath math="A^T A" /> with eigenvalues{" "}
        <InlineMath math="\mu_1 \ge \mu_2 \ge \dots \ge 0" />.
        Define{" "}
        <InlineMath math="\sigma_i = \sqrt{\mu_i}" />.
      </p>

      <p>
        Then for{" "}
        <InlineMath math="\sigma_i > 0" />, set{" "}
        <InlineMath math="\mathbf{u}_i = A\mathbf{v}_i / \sigma_i" />.
        These are the left singular vectors. A short
        calculation shows they're orthonormal.
      </p>

      <h3>Left singular vectors</h3>

      <p>
        Equivalently,{" "}
        <InlineMath math="\mathbf{u}_i" /> are the eigenvectors
        of{" "}
        <InlineMath math="A A^T" /> (with the same non-zero
        eigenvalues{" "}
        <InlineMath math="\sigma_i^2 = \mu_i" /> — a fact worth
        remembering).
      </p>

      <h3>Putting it together</h3>

      <p>
        The decomposition{" "}
        <InlineMath math="A = U\Sigma V^T" /> follows from
      </p>
      <BlockMath math="A \mathbf{v}_i = \sigma_i \mathbf{u}_i \quad \text{for all } i," />

      <p>
        which is just stacking the SVD relationships as
        columns. This is the "fundamental SVD identity" — a
        direct generalisation of{" "}
        <InlineMath math="A\mathbf{v} = \lambda \mathbf{v}" /> for
        eigenvectors.
      </p>

      <Pitfall>
        SVD computed by hand via{" "}
        <InlineMath math="A^T A" /> works for{" "}
        <InlineMath math="2 \times 2" /> matrices but is{" "}
        <em>numerically dangerous</em> for big problems —{" "}
        <InlineMath math="A^T A" /> squares the condition
        number. Real software computes SVD directly via
        Householder bidiagonalisation + QR sweeps, never
        through <InlineMath math="A^T A" />.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Reading off the four subspaces</h2>

      <p>
        SVD displays the four fundamental subspaces (Module I,
        Chapter 3) directly. Suppose the rank of{" "}
        <InlineMath math="A" /> is{" "}
        <InlineMath math="r" /> (the number of non-zero
        singular values). Then:
      </p>

      <Callout title="The four subspaces from SVD">
        <ul>
          <li>
            <InlineMath math="C(A)" /> = span of the first{" "}
            <InlineMath math="r" /> columns of{" "}
            <InlineMath math="U" />.
          </li>
          <li>
            <InlineMath math="N(A^T)" /> = span of the
            remaining columns of{" "}
            <InlineMath math="U" /> (
            <InlineMath math="m - r" /> of them).
          </li>
          <li>
            <InlineMath math="R(A)" /> = span of the first{" "}
            <InlineMath math="r" /> columns of{" "}
            <InlineMath math="V" />.
          </li>
          <li>
            <InlineMath math="N(A)" /> = span of the
            remaining columns of{" "}
            <InlineMath math="V" /> (
            <InlineMath math="n - r" /> of them).
          </li>
        </ul>
      </Callout>

      <p>
        The decomposition of{" "}
        <InlineMath math="\mathbb{R}^n = R(A) \oplus N(A)" /> is
        encoded in <InlineMath math="V" />; the decomposition
        of{" "}
        <InlineMath math="\mathbb{R}^m = C(A) \oplus N(A^T)" />{" "}
        is encoded in{" "}
        <InlineMath math="U" />. The four-subspace picture and
        SVD are the same fact in different presentations.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Reduced (thin) SVD</h2>

      <p>
        For an <InlineMath math="m \times n" /> matrix with{" "}
        <InlineMath math="m \gg n" />, the "full" SVD has{" "}
        <InlineMath math="U" /> of size{" "}
        <InlineMath math="m \times m" /> — wasteful. The{" "}
        <strong>reduced SVD</strong> uses only the columns of{" "}
        <InlineMath math="U" /> corresponding to non-zero
        singular values:
      </p>
      <BlockMath math="A = U_r \Sigma_r V_r^T" />

      <p>
        with{" "}
        <InlineMath math="U_r \in \mathbb{R}^{m \times r}" />,{" "}
        <InlineMath math="\Sigma_r \in \mathbb{R}^{r \times r}" /> diagonal,{" "}
        <InlineMath math="V_r \in \mathbb{R}^{n \times r}" />.
        Same answer, much smaller storage. This is what most
        software returns by default ("full_matrices=False" in
        NumPy / SciPy).
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Low-rank approximation: Eckart–Young</h2>

      <p>
        The single most powerful application of SVD: writing{" "}
        <InlineMath math="A" /> as a sum of rank-1 pieces and
        truncating to the top <InlineMath math="k" />.
      </p>

      <BlockMath math="A = \sum_{i=1}^r \sigma_i \, \mathbf{u}_i \mathbf{v}_i^T." />

      <p>
        Each <InlineMath math="\mathbf{u}_i \mathbf{v}_i^T" /> is
        rank-1; each <InlineMath math="\sigma_i" /> is the
        weight. Truncate to the top{" "}
        <InlineMath math="k < r" /> terms:
      </p>
      <BlockMath math="A_k = \sum_{i=1}^k \sigma_i \, \mathbf{u}_i \mathbf{v}_i^T." />

      <Callout title="Eckart–Young theorem">
        <InlineMath math="A_k" /> is the{" "}
        <em>best</em> rank-<InlineMath math="k" /> approximation
        of <InlineMath math="A" /> in both the Frobenius norm
        and the spectral (operator 2-norm) norm:
        <BlockMath math="A_k = \mathrm{argmin}_{\mathrm{rank}(B) \le k} \|A - B\|_F = \mathrm{argmin}_{\mathrm{rank}(B) \le k} \|A - B\|_2," />
        with errors{" "}
        <InlineMath math="\|A - A_k\|_F^2 = \sum_{i > k} \sigma_i^2" />,{" "}
        <InlineMath math="\|A - A_k\|_2 = \sigma_{k+1}" />.
      </Callout>

      <p>
        Why this matters: the singular value spectrum tells
        you how compressible the matrix is. If the spectrum
        decays fast, a low-rank approximation captures most of
        the matrix with tiny error. Image compression, matrix
        completion, and PCA all use this directly.
      </p>

      <Exercise prompt="Suppose $A$ has singular values $(10, 5, 1, 0.1)$. What's the relative Frobenius error of the rank-2 approximation?">
        <p>
          Total Frobenius squared norm:{" "}
          <InlineMath math="100 + 25 + 1 + 0.01 = 126.01" />.
        </p>
        <p>
          Truncation error squared:{" "}
          <InlineMath math="1 + 0.01 = 1.01" />.
        </p>
        <p>
          Relative error:{" "}
          <InlineMath math="\sqrt{1.01 / 126.01} \approx 0.090" />,
          about 9%. The matrix is highly compressible with the
          first two components.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · The Moore–Penrose pseudoinverse</h2>

      <p>
        For a square invertible matrix,{" "}
        <InlineMath math="A^{-1}" /> exists. For a rectangular
        or rank-deficient matrix, the right generalisation is
        the <strong>pseudoinverse</strong>:
      </p>
      <BlockMath math="A^+ = V \Sigma^+ U^T" />

      <p>
        where <InlineMath math="\Sigma^+" /> is built by
        inverting the non-zero singular values and
        transposing:{" "}
        <InlineMath math="\Sigma^+_{ii} = 1/\sigma_i" /> for{" "}
        <InlineMath math="\sigma_i > 0" />, zero otherwise.
      </p>

      <h3>Properties</h3>

      <ul>
        <li>
          When <InlineMath math="A" /> is square and
          invertible:{" "}
          <InlineMath math="A^+ = A^{-1}" />.
        </li>
        <li>
          For tall, full-column-rank{" "}
          <InlineMath math="A" />:{" "}
          <InlineMath math="A^+ = (A^T A)^{-1} A^T" /> — the
          OLS formula!
        </li>
        <li>
          For wide, full-row-rank{" "}
          <InlineMath math="A" />:{" "}
          <InlineMath math="A^+ = A^T (A A^T)^{-1}" />.
        </li>
        <li>
          <InlineMath math="\mathbf{x}^* = A^+ \mathbf{b}" /> is{" "}
          the <em>minimum-norm</em> least-squares solution:
          <ul>
            <li>
              minimises <InlineMath math="\|A\mathbf{x} - \mathbf{b}\|^2" />,
            </li>
            <li>
              and among minimisers, has the smallest{" "}
              <InlineMath math="\|\mathbf{x}\|^2" />.
            </li>
          </ul>
        </li>
      </ul>

      <p>
        This is the "right" solution when the system is
        rank-deficient. SVD-based pseudoinverse is the
        numerically stable way to compute it: discard
        singular values below a tolerance and invert the rest.
        That's how Python's{" "}
        <code>np.linalg.lstsq</code> and{" "}
        <code>scipy.linalg.pinv</code> work internally.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Condition number</h2>

      <p>
        SVD also gives the cleanest definition of conditioning:
      </p>
      <BlockMath math="\kappa(A) = \frac{\sigma_{\max}(A)}{\sigma_{\min}(A)}." />

      <p>
        For a square invertible matrix, this measures how much
        a small relative perturbation of{" "}
        <InlineMath math="\mathbf{b}" /> can change the
        solution of{" "}
        <InlineMath math="A\mathbf{x} = \mathbf{b}" />. Big{" "}
        <InlineMath math="\kappa" /> = ill-conditioned = small
        errors blow up.
      </p>

      <p>
        Heuristic: with double-precision arithmetic (16 digits)
        and condition number{" "}
        <InlineMath math="\kappa \sim 10^{12}" />, expect about
        4 reliable digits in your answer. If your{" "}
        <InlineMath math="X^T X" /> has a condition number near{" "}
        <InlineMath math="10^{16}" />, OLS is at the edge of
        numerical breakdown. Ridge regression's effect is to{" "}
        replace{" "}
        <InlineMath math="\sigma_i^2" /> with{" "}
        <InlineMath math="\sigma_i^2 + \lambda" /> in the
        spectrum — capping the condition number at{" "}
        <InlineMath math="(\sigma_{\max}^2 + \lambda)/\lambda" />.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>PCA</strong> via SVD: principal components
          of a centred data matrix{" "}
          <InlineMath math="X" /> are the right singular
          vectors of{" "}
          <InlineMath math="X" /> (= eigenvectors of{" "}
          <InlineMath math="X^T X" />). Singular values are
          the standard deviations along each component
          direction. We'll use this in Module VI.
        </li>
        <li>
          <strong>Recommender systems &amp; matrix
          completion</strong>: low-rank matrix factorisation
          via truncated SVD recovers user×item ratings
          matrices from sparse observations. Netflix Prize
          winning approaches were SVD-flavoured.
        </li>
        <li>
          <strong>Numerical OLS</strong>: SVD is the
          gold-standard numerical method for OLS — handles
          rank deficiency, gives clean diagnostics through
          singular value drops.
        </li>
        <li>
          <strong>Latent-semantic analysis</strong>: SVD on a
          term-document matrix uncovers latent topics. Same
          technique was the precursor to modern word
          embeddings.
        </li>
        <li>
          <strong>Microstructure preview</strong>:
          eigendecomposition of cross-sectional return
          covariances (Marchenko–Pastur, random matrix theory)
          is essentially SVD of the data matrix. The
          singular-value spectrum tells you how many "real"
          factors lurk beneath the noise.
        </li>
      </ul>

      <p>
        Next chapter: projections, Gram–Schmidt, and QR. These
        are the geometric/numerical tools behind least
        squares, and they prepare the way for the matrix
        calculus and OLS derivation in Module III.
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
      "Every $m \\times n$ real matrix $A$ admits the SVD $A = U \\Sigma V^T$, where…",
    options: [
      "$U, V$ are orthogonal and $\\Sigma$ has non-negative entries on the main diagonal",
      "$U, V$ are diagonal",
      "$\\Sigma$ may have negative entries",
      "this exists only when $A$ is square",
    ],
    correct: 0,
    explanation:
      "$U$ and $V$ are orthogonal matrices ($U^T U = I$, $V^T V = I$). $\\Sigma$ is rectangular-diagonal with non-negative entries — the singular values, conventionally sorted descending.",
  },
  {
    prompt:
      "Singular values of $A$ are…",
    options: [
      "eigenvalues of $A$",
      "the absolute values of eigenvalues of $A$",
      "the square roots of eigenvalues of $A^T A$",
      "always equal to 1",
    ],
    correct: 2,
    explanation:
      "$\\sigma_i^2$ are eigenvalues of $A^T A$ (and $A A^T$). For symmetric positive-semi-definite matrices, singular values equal eigenvalues — but in general they're different objects.",
  },
  {
    prompt:
      "The Eckart–Young theorem says the best rank-$k$ approximation of $A$ in Frobenius norm is…",
    options: [
      "any rank-$k$ matrix",
      "$A_k = \\sum_{i=1}^k \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T$ — truncate the SVD to the top-$k$ singular values",
      "the projection of $A$ onto the standard basis",
      "$A^k$ — the $k$-th power",
    ],
    correct: 1,
    explanation:
      "The truncated SVD gives the optimal rank-$k$ approximation in both Frobenius and spectral norms. Tail-sum-of-squared-singular-values is the squared Frobenius error.",
  },
  {
    prompt:
      "The pseudoinverse $A^+$ via SVD is…",
    options: [
      "$U \\Sigma V^T$",
      "$V \\Sigma^+ U^T$, with $\\Sigma^+_{ii} = 1/\\sigma_i$ for non-zero singular values",
      "$A^T A$",
      "always equal to $A^{-1}$",
    ],
    correct: 1,
    explanation:
      "Invert non-zero singular values and transpose. For square invertible $A$, $A^+ = A^{-1}$. For rectangular full-rank, $A^+$ matches the OLS formula.",
  },
  {
    prompt:
      "The condition number $\\kappa(A) = \\sigma_{\\max}/\\sigma_{\\min}$ measures…",
    options: [
      "the size of $A$",
      "the rank of $A$",
      "the sensitivity of solving $A\\mathbf{x} = \\mathbf{b}$ to perturbations in $\\mathbf{b}$",
      "the determinant of $A$",
    ],
    correct: 2,
    explanation:
      "Big condition number ⇔ ill-conditioned ⇔ small relative changes in $\\mathbf{b}$ can cause large relative changes in $\\mathbf{x}$. Ridge regression caps it by adding $\\lambda$ to each $\\sigma_i^2$.",
  },
];
