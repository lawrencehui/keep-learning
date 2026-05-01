import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function ChangeBasisBody() {
  return (
    <>
      <p>
        A vector exists independently of any basis. Its{" "}
        <em>coordinates</em> exist only relative to one. The
        same vector, viewed in two different bases, has two
        different lists of numbers. The same{" "}
        <em>linear map</em>, viewed in two different bases, is
        represented by two different matrices — but those
        matrices are <strong>similar</strong>:{" "}
        <InlineMath math="B = P^{-1} A P" />. Pick the right
        basis and a complicated map becomes diagonal.
      </p>
      <p>
        This chapter sets up the language for switching between
        bases, which is the foundation for diagonalisation
        (Tier II), PCA (Tier VI), normal modes in physics, and
        — closer to home — every "decorrelation" trick in
        machine learning.
      </p>

      <ReferenceResources
        items={[
          {
            title: "3Blue1Brown — EOLA 13",
            author: "Grant Sanderson",
            duration: "~13 min",
            url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
            note: "The geometric translation. Watch first.",
          },
          {
            title: "MIT 18.06 — Lecture 31 (change of basis)",
            author: "Gilbert Strang",
            duration: "~50 min",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
            note: "Most concise version; sets up everything we'll need for eigendecomposition.",
          },
          {
            title: "MML Ch 2.7",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "Linear mappings under change of basis — same equations, slightly different notation.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Coordinates in a basis</h2>

      <p>
        Fix a basis{" "}
        <InlineMath math="\mathcal{B} = \{\mathbf{b}_1, \dots, \mathbf{b}_n\}" />{" "}
        of <InlineMath math="V" />. By definition, every{" "}
        <InlineMath math="\mathbf{v} \in V" /> writes
        <em> uniquely</em> as
      </p>
      <BlockMath math="\mathbf{v} = c_1 \mathbf{b}_1 + c_2 \mathbf{b}_2 + \dots + c_n \mathbf{b}_n." />

      <p>
        We call the column{" "}
        <InlineMath math="(c_1, \dots, c_n)^T" /> the{" "}
        <strong>coordinates of <InlineMath math="\mathbf{v}" /> in <InlineMath math="\mathcal{B}" /></strong>,
        written{" "}
        <InlineMath math="[\mathbf{v}]_\mathcal{B}" />.
      </p>

      <Callout title="Vector vs coordinates">
        <p>
          The vector{" "}
          <InlineMath math="\mathbf{v}" /> is the geometric
          object. The coordinates{" "}
          <InlineMath math="[\mathbf{v}]_\mathcal{B}" /> are its
          name in basis{" "}
          <InlineMath math="\mathcal{B}" />. Different basis,
          different name, same object.
        </p>
      </Callout>

      <h3>The standard basis is special only because it's standard</h3>

      <p>
        For{" "}
        <InlineMath math="\mathbb{R}^n" />, the conventional
        basis is{" "}
        <InlineMath math="\mathcal{E} = \{\mathbf{e}_1, \dots, \mathbf{e}_n\}" />.
        When we write{" "}
        <InlineMath math="\mathbf{v} = (3, 5)^T" /> we
        implicitly mean "in the standard basis" — that is,{" "}
        <InlineMath math="3\mathbf{e}_1 + 5\mathbf{e}_2" />. But{" "}
        <InlineMath math="\mathcal{E}" /> isn't more "real"
        than any other basis; it's just our default
        coordinate system.
      </p>

      <Exercise prompt="Let $\mathcal{B} = \{(1, 1)^T, (1, -1)^T\}$ in $\mathbb{R}^2$. Find $[\mathbf{v}]_\mathcal{B}$ for $\mathbf{v} = (3, 5)^T$ (coordinates in the standard basis).">
        <p>
          Solve{" "}
          <InlineMath math="c_1 (1, 1)^T + c_2 (1, -1)^T = (3, 5)^T" />:{" "}
          <InlineMath math="c_1 + c_2 = 3" />,{" "}
          <InlineMath math="c_1 - c_2 = 5" />. So{" "}
          <InlineMath math="c_1 = 4, c_2 = -1" />. In{" "}
          <InlineMath math="\mathcal{B}" />,{" "}
          <InlineMath math="\mathbf{v}" /> has coordinates{" "}
          <InlineMath math="(4, -1)^T" />.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The change-of-basis matrix</h2>

      <p>
        Going between bases is a linear operation. If{" "}
        <InlineMath math="\mathcal{B} = \{\mathbf{b}_1, \dots, \mathbf{b}_n\}" />{" "}
        is a basis of{" "}
        <InlineMath math="\mathbb{R}^n" />, build the matrix
      </p>
      <BlockMath math="P_\mathcal{B} = \begin{pmatrix} | & | & & | \\ \mathbf{b}_1 & \mathbf{b}_2 & \cdots & \mathbf{b}_n \\ | & | & & | \end{pmatrix}" />

      <p>
        whose columns are the basis vectors{" "}
        <em>written in the standard basis</em>. Then for any
        vector{" "}
        <InlineMath math="\mathbf{v}" />,
      </p>
      <BlockMath math="\mathbf{v} = P_\mathcal{B} \, [\mathbf{v}]_\mathcal{B}." />

      <p>
        Why: the right-hand side is "coordinate-1 times{" "}
        <InlineMath math="\mathbf{b}_1" /> + coordinate-2 times{" "}
        <InlineMath math="\mathbf{b}_2" /> + ..." which is the
        definition of{" "}
        <InlineMath math="[\mathbf{v}]_\mathcal{B}" />. The
        column reading of matrix–vector multiplication does the
        work.
      </p>

      <p>
        Equivalently, given the standard-basis coordinates,
        the <InlineMath math="\mathcal{B}" />-coordinates are
      </p>
      <BlockMath math="[\mathbf{v}]_\mathcal{B} = P_\mathcal{B}^{-1} \, \mathbf{v}." />

      <p>
        <InlineMath math="P_\mathcal{B}^{-1}" /> exists because
        the columns of{" "}
        <InlineMath math="P_\mathcal{B}" /> are independent (
        that's what "basis" guarantees).
      </p>

      <h3>Between two arbitrary bases</h3>

      <p>
        For two bases{" "}
        <InlineMath math="\mathcal{B}, \mathcal{C}" />, the
        change-of-basis matrix from{" "}
        <InlineMath math="\mathcal{B}" /> to{" "}
        <InlineMath math="\mathcal{C}" /> is
      </p>
      <BlockMath math="P_{\mathcal{C} \leftarrow \mathcal{B}} = P_\mathcal{C}^{-1} P_\mathcal{B}." />

      <p>
        Apply it to{" "}
        <InlineMath math="\mathcal{B}" />-coordinates to get{" "}
        <InlineMath math="\mathcal{C}" />-coordinates. Standard
        basis is just the special case where{" "}
        <InlineMath math="P_\mathcal{C} = I" />.
      </p>

      <Pitfall>
        It's easy to mix up which direction the change-of-basis
        matrix goes. The mnemonic:{" "}
        <em>columns of <InlineMath math="P_{\mathcal{C} \leftarrow \mathcal{B}}" /> are the
        <InlineMath math="\mathcal{B}" />-vectors written in
        <InlineMath math="\mathcal{C}" />-coordinates.</em> The
        matrix takes input expressed in{" "}
        <InlineMath math="\mathcal{B}" /> and outputs the same
        vector expressed in{" "}
        <InlineMath math="\mathcal{C}" />.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Same map, similar matrix</h2>

      <p>
        Now the central question. Suppose{" "}
        <InlineMath math="T : V \to V" /> is a linear map (let's
        keep the same space for input and output). Its matrix
        depends on the basis we use. In basis{" "}
        <InlineMath math="\mathcal{E}" /> it's{" "}
        <InlineMath math="A" />; in basis{" "}
        <InlineMath math="\mathcal{B}" /> it's something else.
        How are the two related?
      </p>

      <p>
        Apply <InlineMath math="T" /> to{" "}
        <InlineMath math="\mathbf{v}" />:
      </p>
      <ol>
        <li>
          Convert from{" "}
          <InlineMath math="\mathcal{B}" /> to{" "}
          <InlineMath math="\mathcal{E}" />: multiply by{" "}
          <InlineMath math="P_\mathcal{B}" />.
        </li>
        <li>
          Apply <InlineMath math="A" /> in standard basis.
        </li>
        <li>
          Convert back: multiply by{" "}
          <InlineMath math="P_\mathcal{B}^{-1}" />.
        </li>
      </ol>

      <p>
        So{" "}
        <InlineMath math="T" /> in basis{" "}
        <InlineMath math="\mathcal{B}" /> is represented by:
      </p>

      <Callout title="Similarity transform">
        <BlockMath math="A_\mathcal{B} = P_\mathcal{B}^{-1} \, A \, P_\mathcal{B}" />
        <p>
          Two matrices related by{" "}
          <InlineMath math="B = P^{-1} A P" /> are{" "}
          <strong>similar</strong>. They represent the{" "}
          <em>same</em> linear map in different coordinate
          systems.
        </p>
      </Callout>

      <p>
        Reading the formula left-to-right:
      </p>
      <ul>
        <li>
          <InlineMath math="P_\mathcal{B}" />: take input{" "}
          <InlineMath math="\mathcal{B}" />-coords, give the
          standard-basis vector.
        </li>
        <li>
          <InlineMath math="A" />: apply the map in standard
          basis.
        </li>
        <li>
          <InlineMath math="P_\mathcal{B}^{-1}" />: convert
          standard-basis output back into{" "}
          <InlineMath math="\mathcal{B}" />-coordinates.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Invariants under similarity</h2>

      <p>
        Some properties of a linear map are intrinsic — they
        don't depend on which coordinates we use to represent
        it. These are the <strong>similarity invariants</strong>.
      </p>

      <ul>
        <li>
          <strong>Rank.</strong>{" "}
          <InlineMath math="\mathrm{rank}(P^{-1} A P) = \mathrm{rank}(A)" />.
          Of course — the dimension of "what gets reached" is
          a feature of <InlineMath math="T" />, not its
          notation.
        </li>
        <li>
          <strong>Determinant.</strong>{" "}
          <InlineMath math="\det(P^{-1} A P) = \det(A)" />, by
          multiplicativity:{" "}
          <InlineMath math="\det(P^{-1}) \det(A) \det(P) = \det(A)" />.
        </li>
        <li>
          <strong>Trace.</strong>{" "}
          <InlineMath math="\mathrm{tr}(P^{-1} A P) = \mathrm{tr}(A)" />,
          by the cyclic property of trace.
        </li>
        <li>
          <strong>Eigenvalues.</strong> Since the
          characteristic polynomial{" "}
          <InlineMath math="\det(A - \lambda I)" /> is invariant,
          so are the eigenvalues. (Eigenvectors are{" "}
          <em>not</em> invariant — they change basis like every
          other vector.)
        </li>
      </ul>

      <p>
        These invariants are the only things you can read off
        a linear map without first choosing coordinates. Every
        coordinate-dependent quantity (e.g., the matrix entries
        themselves) gets shuffled by{" "}
        <InlineMath math="P" />.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · The "best" basis: a preview of diagonalisation</h2>

      <p>
        If we get to pick the basis, what's the best one?
        Answer: a basis of{" "}
        <strong>eigenvectors</strong> of the map (when one
        exists). In that basis the matrix becomes diagonal:
      </p>
      <BlockMath math="A_\mathcal{B} = D = \begin{pmatrix} \lambda_1 & & \\ & \ddots & \\ & & \lambda_n \end{pmatrix}." />

      <p>
        Diagonal matrices are the easiest possible matrices —
        they act independently on each coordinate. Computing{" "}
        <InlineMath math="D^k" /> is just{" "}
        <InlineMath math="\lambda_i^k" /> on the diagonal.
        Computing{" "}
        <InlineMath math="e^{Dt}" /> is just{" "}
        <InlineMath math="e^{\lambda_i t}" /> on the diagonal.
        Hence the constant refrain:
      </p>

      <Callout title="Mantra">
        Find the right basis, and any well-behaved problem
        becomes <em>n</em> independent 1-D problems.
      </Callout>

      <p>
        Tier II's eigenvalue/SVD chapter is exactly the
        mechanics for finding that basis. We don't compute
        anything new here — we just establish that{" "}
        <em>once you have an eigenbasis</em>{" "}
        <InlineMath math="\mathcal{B}" />, similarity gives
        you{" "}
        <InlineMath math="A = P_\mathcal{B} D P_\mathcal{B}^{-1}" />,
        the diagonalisation.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Working examples</h2>

      <h3>Rotation in two bases</h3>

      <p>
        The 90°-rotation map on{" "}
        <InlineMath math="\mathbb{R}^2" /> is
      </p>
      <BlockMath math="R = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}" />

      <p>
        in the standard basis. Now use the basis{" "}
        <InlineMath math="\mathcal{B} = \{(1, 1)^T, (1, -1)^T\}" />.
        Build{" "}
        <InlineMath math="P_\mathcal{B} = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}" />,
        compute{" "}
        <InlineMath math="P_\mathcal{B}^{-1} = \tfrac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}" />,
        then{" "}
        <InlineMath math="R_\mathcal{B} = P_\mathcal{B}^{-1} R P_\mathcal{B} = \tfrac{1}{2}\begin{pmatrix} 0 & 2 \\ -2 & 0 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}" />.
      </p>

      <p>
        Same rotation, slightly different matrix. Determinant
        and trace match; the eigenvalues{" "}
        <InlineMath math="\pm i" /> are the same in both bases
        (try it).
      </p>

      <h3>A diagonalisable map</h3>

      <p>
        Consider{" "}
        <InlineMath math="A = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}" />.
        Its eigenvalues are 5 and 2, with eigenvectors{" "}
        <InlineMath math="(1, 1)^T, (1, -2)^T" />. In the
        eigenbasis,
      </p>
      <BlockMath math="A_\mathcal{B} = \begin{pmatrix} 5 & 0 \\ 0 & 2 \end{pmatrix}" />

      <p>
        — diagonal. Computing{" "}
        <InlineMath math="A^{100}" /> in the standard basis is
        a slog;{" "}
        <InlineMath math="A_\mathcal{B}^{100}" /> is{" "}
        <InlineMath math="\mathrm{diag}(5^{100}, 2^{100})" />.
        Similarity is the bridge between the two.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Diagonalisation.</strong> Eigendecomposition
          (Tier II) is{" "}
          <InlineMath math="A = P D P^{-1}" />. The whole
          construction <em>is</em> a change of basis to the
          eigenbasis.
        </li>
        <li>
          <strong>PCA.</strong> The principal components are an
          orthonormal basis — change of basis from the original
          features to the variance-decorrelated ones. The
          covariance matrix becomes diagonal in the PC basis.
        </li>
        <li>
          <strong>SVD.</strong>{" "}
          <InlineMath math="A = U \Sigma V^T" /> can be read as{" "}
          <em>two</em> changes of basis: align input with{" "}
          <InlineMath math="V" />, scale by{" "}
          <InlineMath math="\Sigma" />, align output with{" "}
          <InlineMath math="U" />.
        </li>
        <li>
          <strong>Whitening &amp; preconditioning.</strong> Many
          ML and numerical-optimisation methods rescale data
          via a change of basis ("decorrelate then standardise")
          to make gradient descent faster.
        </li>
        <li>
          <strong>Linear ODEs &amp; dynamics.</strong>{" "}
          <InlineMath math="\dot{\mathbf{x}} = A \mathbf{x}" />.
          In the eigenbasis, the system decouples into
          independent 1-D ODEs{" "}
          <InlineMath math="\dot{c}_i = \lambda_i c_i" />.
          Same trick underpins normal modes in classical
          mechanics and energy eigenstates in QM.
        </li>
        <li>
          <strong>Microstructure preview.</strong> Latent
          factor models in equity microstructure (e.g. PCA on
          cross-sectional returns) are coordinate-system
          rebuilds: switch from "asset by asset" to "factor by
          factor", and the noise becomes nearly diagonal.
        </li>
      </ul>

      <p>
        This closes Tier I. We now have the language: vectors
        live in spaces, bases name them, linear maps move them,
        and matrices are linear maps in coordinates. Tier II
        will use this language to extract the spectral structure
        of a matrix — eigenvalues, SVD, projections — which is
        where the real ML and microstructure machinery starts.
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
      "If $P_\\mathcal{B}$ has the basis vectors of $\\mathcal{B}$ as its columns (in standard coordinates), then for any vector $\\mathbf{v}$…",
    options: [
      "$\\mathbf{v} = P_\\mathcal{B} [\\mathbf{v}]_\\mathcal{B}$",
      "$[\\mathbf{v}]_\\mathcal{B} = P_\\mathcal{B} \\mathbf{v}$",
      "$\\mathbf{v} = [\\mathbf{v}]_\\mathcal{B}$",
      "$\\mathbf{v} = P_\\mathcal{B}^T \\, \\mathbf{v}$",
    ],
    correct: 0,
    explanation:
      "Multiplying the matrix of basis vectors by the $\\mathcal{B}$-coordinates returns the standard-basis representation of $\\mathbf{v}$. This is just the column reading of matrix-vector multiplication.",
  },
  {
    prompt:
      "Two matrices $A$ and $B$ are similar if $B = P^{-1} A P$ for some invertible $P$. What does similarity preserve?",
    options: [
      "matrix entries (they're literally equal)",
      "rank, determinant, trace, and eigenvalues",
      "rows but not columns",
      "only the dimension",
    ],
    correct: 1,
    explanation:
      "Similar matrices represent the same linear map in different bases. Map-intrinsic properties (rank, det, trace, eigenvalues) are invariant; basis-dependent ones (entries, eigenvectors) are not.",
  },
  {
    prompt:
      "The 'best' basis for a linear map $T$ — the one that makes its matrix as simple as possible — is typically…",
    options: [
      "the standard basis",
      "any orthonormal basis",
      "an eigenbasis of $T$, when one exists; in that basis the matrix is diagonal",
      "a random basis",
    ],
    correct: 2,
    explanation:
      "Eigenvectors get scaled (by their eigenvalues), so in the eigenbasis $T$ acts independently on each coordinate. Diagonal matrix → trivial powers, exponentials, ODE solutions.",
  },
  {
    prompt:
      "For an invertible $P$, what is $\\det(P^{-1} A P)$?",
    options: [
      "$\\det(A) \\cdot \\det(P)^2$",
      "$\\det(A)$",
      "$1 / \\det(A)$",
      "$\\det(P) / \\det(A)$",
    ],
    correct: 1,
    explanation:
      "$\\det$ is multiplicative: $\\det(P^{-1}) \\det(A) \\det(P) = \\det(A)$. Determinant is a similarity invariant — it's a property of the map, not the basis.",
  },
  {
    prompt:
      "Which is **not** a similarity invariant?",
    options: [
      "rank",
      "trace",
      "the actual entries of the matrix",
      "the set of eigenvalues",
    ],
    correct: 2,
    explanation:
      "Matrix entries shuffle entirely under change of basis. The map's intrinsic features (rank, trace, det, eigenvalues, characteristic polynomial) are invariant; coordinates of those features are not.",
  },
];
