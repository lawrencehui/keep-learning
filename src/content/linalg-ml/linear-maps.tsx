import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function LinearMapsBody() {
  return (
    <>
      <p>
        With vectors in hand, the next question is: what kinds
        of functions move them around in a way we can analyse?
        The answer is <strong>linear maps</strong>. They are
        the only functions that respect addition and scalar
        multiplication, and once we fix a basis, every linear
        map is faithfully represented by a{" "}
        <strong>matrix</strong>. This chapter establishes that
        equivalence and develops the geometric reading of
        matrix–vector and matrix–matrix products.
      </p>
      <p>
        The single most important sentence in linear algebra
        is{" "}
        <em>the columns of a matrix are the images of the basis vectors</em>.
        Internalise that and most "matrix calculations" become
        geometric stories.
      </p>

      <ReferenceResources
        items={[
          {
            title: "3Blue1Brown — EOLA 3 & 4",
            author: "Grant Sanderson",
            duration: "~30 min",
            url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
            note: "EOLA 3 (transformations as matrices) is the *single best* video on this topic. Watch first.",
          },
          {
            title: "MIT 18.06 — Lectures 2, 3, 4",
            author: "Gilbert Strang",
            duration: "~3h",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
            note: "Elimination, multiplication, inverses, A = LU.",
          },
          {
            title: "MML Ch 2.7",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "Linear mappings, image, kernel — same notation we use.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · What is a linear map?</h2>

      <Callout title="Definition · Linear map">
        A function{" "}
        <InlineMath math="T : V \to W" /> is a{" "}
        <strong>linear map</strong> (or linear transformation)
        if for all{" "}
        <InlineMath math="\mathbf{u}, \mathbf{v} \in V" /> and{" "}
        <InlineMath math="c \in \mathbb{R}" />:
        <BlockMath math="T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v}), \qquad T(c \mathbf{v}) = c \, T(\mathbf{v})." />
      </Callout>

      <p>
        Equivalent (and very useful) shorthand:
      </p>
      <BlockMath math="T(c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2) = c_1 T(\mathbf{v}_1) + c_2 T(\mathbf{v}_2)." />

      <p>
        Linearity respects every linear combination —{" "}
        <em>this is the entire content</em> of "being linear."
        Because a basis spans <InlineMath math="V" />, knowing{" "}
        <InlineMath math="T" /> on the basis vectors tells you{" "}
        <InlineMath math="T" /> on every vector. That fact is
        what makes finite-dimensional linear maps tractable.
      </p>

      <h3>Examples and non-examples</h3>

      <p>
        Linear:
      </p>
      <ul>
        <li>
          Rotation about the origin in{" "}
          <InlineMath math="\mathbb{R}^2" />.
        </li>
        <li>
          Scaling by a fixed factor.
        </li>
        <li>
          Projection onto a subspace.
        </li>
        <li>
          Differentiation, on the space of differentiable
          functions.
        </li>
        <li>
          Expectation, on a vector space of random variables.
        </li>
      </ul>

      <p>
        Not linear:
      </p>
      <ul>
        <li>
          Translation by a nonzero vector (
          <InlineMath math="T(\mathbf{0}) \ne \mathbf{0}" />, so
          fails).
        </li>
        <li>
          Squaring, <InlineMath math="x \mapsto x^2" /> (fails
          additivity).
        </li>
        <li>
          Adding a bias: <InlineMath math="\mathbf{x} \mapsto A\mathbf{x} + \mathbf{b}" />{" "}
          with{" "}
          <InlineMath math="\mathbf{b} \ne \mathbf{0}" />. This
          is <strong>affine</strong>, not linear.
        </li>
      </ul>

      <Pitfall>
        Many ML "linear models" are technically affine (they
        include a bias term). The standard trick is to absorb
        the bias by appending a constant 1 feature; then the
        map is genuinely linear in the augmented input.
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Why matrices?</h2>

      <p>
        Here's the key construction. Pick a basis{" "}
        <InlineMath math="\{\mathbf{b}_1, \dots, \mathbf{b}_n\}" />{" "}
        of <InlineMath math="V" />. Any{" "}
        <InlineMath math="\mathbf{v} \in V" /> writes as{" "}
        <InlineMath math="\mathbf{v} = \sum_j c_j \mathbf{b}_j" />.
        By linearity:
      </p>
      <BlockMath math="T(\mathbf{v}) = T\!\left(\sum_j c_j \mathbf{b}_j\right) = \sum_j c_j T(\mathbf{b}_j)." />

      <p>
        Each <InlineMath math="T(\mathbf{b}_j)" /> is just a
        vector in <InlineMath math="W" />. Stack those vectors
        as the <em>columns</em> of a matrix{" "}
        <InlineMath math="A" />:
      </p>
      <BlockMath math="A = \begin{pmatrix} | & | & & | \\ T(\mathbf{b}_1) & T(\mathbf{b}_2) & \cdots & T(\mathbf{b}_n) \\ | & | & & | \end{pmatrix}." />

      <p>
        Then{" "}
        <InlineMath math="T(\mathbf{v})" /> in coordinates is
        the column-weighted sum of{" "}
        <InlineMath math="A" />'s columns by the entries of{" "}
        <InlineMath math="\mathbf{v}" /> — which is exactly the
        operation we call{" "}
        <InlineMath math="A\mathbf{v}" />.
      </p>

      <Callout title="The column view of $A\mathbf{v}$">
        <BlockMath math="A\mathbf{v} = v_1 \, \mathbf{a}_1 + v_2 \, \mathbf{a}_2 + \cdots + v_n \, \mathbf{a}_n" />
        where{" "}
        <InlineMath math="\mathbf{a}_j" /> is the{" "}
        <InlineMath math="j" />th column. Read it left-to-right
        as <em>"weights of input → linear combination of
        output basis vectors."</em>
      </Callout>

      <p>
        This is the master picture. Once you can read{" "}
        <InlineMath math="A\mathbf{v}" /> as "blend the columns
        of <InlineMath math="A" /> using{" "}
        <InlineMath math="\mathbf{v}" /> as weights", every
        later identity becomes obvious.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>
        Part 3 · Three readings of <InlineMath math="A\mathbf{v}" />
      </h2>

      <p>
        For an{" "}
        <InlineMath math="m \times n" /> matrix{" "}
        <InlineMath math="A" /> and{" "}
        <InlineMath math="\mathbf{v} \in \mathbb{R}^n" />, the
        product <InlineMath math="A\mathbf{v}" /> can be viewed
        three ways. Hold all three in your head; each is right
        in a different context.
      </p>

      <h3>1. Column view (geometric)</h3>

      <BlockMath math="A\mathbf{v} = \sum_{j=1}^n v_j \, \mathbf{a}_j." />

      <p>
        The output is a linear combination of{" "}
        <InlineMath math="A" />'s columns. This is the right
        view when you ask <em>"what's reachable?"</em> — the
        image of <InlineMath math="A" />, the column space.
      </p>

      <h3>2. Row view (computational)</h3>

      <BlockMath math="(A\mathbf{v})_i = \sum_{j=1}^n A_{ij} v_j = \mathbf{r}_i \cdot \mathbf{v}," />

      <p>
        where{" "}
        <InlineMath math="\mathbf{r}_i" /> is the{" "}
        <InlineMath math="i" />th row. Each output component is
        a dot product of a row with the input vector. This is
        the row-by-row computation a CPU does.
      </p>

      <h3>3. Function view (abstract)</h3>

      <p>
        <InlineMath math="A : \mathbb{R}^n \to \mathbb{R}^m" /> is
        a linear function. Apply it, get a new vector. This view
        treats matrices as objects-of-study in their own right
        and underlies operator theory.
      </p>

      <Exercise prompt="Compute $A\mathbf{v}$ both ways for $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \\ 5 & 6 \end{pmatrix}$ and $\mathbf{v} = (10, 20)^T$.">
        <p>
          <strong>Column view:</strong>{" "}
          <InlineMath math="10 \cdot (1, 3, 5)^T + 20 \cdot (2, 4, 6)^T = (10, 30, 50)^T + (40, 80, 120)^T = (50, 110, 170)^T" />.
        </p>
        <p>
          <strong>Row view:</strong> dot products{" "}
          <InlineMath math="(1, 2) \cdot (10, 20) = 50" />,{" "}
          <InlineMath math="(3, 4) \cdot (10, 20) = 110" />,{" "}
          <InlineMath math="(5, 6) \cdot (10, 20) = 170" />.
          Same answer.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Matrix multiplication is composition</h2>

      <p>
        If <InlineMath math="A" /> represents a linear map{" "}
        <InlineMath math="T_A : \mathbb{R}^n \to \mathbb{R}^m" />{" "}
        and <InlineMath math="B" /> represents{" "}
        <InlineMath math="T_B : \mathbb{R}^p \to \mathbb{R}^n" />,
        what represents{" "}
        <InlineMath math="T_A \circ T_B" />?
      </p>

      <p>
        Apply <InlineMath math="T_B" /> first, then{" "}
        <InlineMath math="T_A" />: as a function, the
        composition takes{" "}
        <InlineMath math="\mathbf{v} \mapsto A(B\mathbf{v}) = (AB)\mathbf{v}" />.
        The matrix that represents the composition is the
        product <InlineMath math="AB" />. Matrix multiplication
        is, by construction, function composition.
      </p>

      <h3>The formula</h3>

      <BlockMath math="(AB)_{ij} = \sum_{k=1}^n A_{ik} B_{kj}." />

      <p>
        That's "row of <InlineMath math="A" /> dotted with
        column of <InlineMath math="B" />." But the more
        useful gloss is:
      </p>

      <Callout title="Column reading of $AB$">
        The <InlineMath math="j" />th column of{" "}
        <InlineMath math="AB" /> is{" "}
        <InlineMath math="A \cdot \mathbf{b}_j" />, where{" "}
        <InlineMath math="\mathbf{b}_j" /> is the{" "}
        <InlineMath math="j" />th column of{" "}
        <InlineMath math="B" />. So{" "}
        <InlineMath math="AB" /> is{" "}
        <em>A applied separately to each column of B</em>.
      </Callout>

      <h3>Two non-obvious facts</h3>

      <ul>
        <li>
          <strong>Non-commutative</strong>:{" "}
          <InlineMath math="AB \ne BA" /> in general. Composing
          rotations in different orders gives different
          results.
        </li>
        <li>
          <strong>Associative</strong>:{" "}
          <InlineMath math="(AB)C = A(BC)" />. Function
          composition is associative; matrix multiplication
          inherits this.
        </li>
      </ul>

      <Pitfall>
        For an unknown{" "}
        <InlineMath math="A" /> and known column-result, you
        can solve column-by-column:{" "}
        <InlineMath math="AB = C" /> means{" "}
        <InlineMath math="A \mathbf{b}_j = \mathbf{c}_j" /> for
        every <InlineMath math="j" />. That's how Gaussian
        elimination "inverts" matrices in practice.
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Block matrices</h2>

      <p>
        For large or structured matrices, treat blocks as
        scalars. The same column/row rules apply, with the
        proviso that block dimensions must be compatible.
      </p>
      <BlockMath math="\begin{pmatrix} A_{11} & A_{12} \\ A_{21} & A_{22} \end{pmatrix} \begin{pmatrix} B_{11} \\ B_{21} \end{pmatrix} = \begin{pmatrix} A_{11} B_{11} + A_{12} B_{21} \\ A_{21} B_{11} + A_{22} B_{21} \end{pmatrix}." />

      <p>
        Block tricks are the workhorse of numerical linear
        algebra: GPU matrix multiplies, the Schur complement
        in Bayesian inference, structured factorisations of
        covariance matrices in finance.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>
        Part 6 · Solving <InlineMath math="A\mathbf{x} = \mathbf{b}" /> via
        elimination
      </h2>

      <p>
        We won't grind through every step — Strang covers it
        beautifully — but the structure is worth knowing
        because it foreshadows decompositions in Module II.
      </p>

      <h3>Gaussian elimination</h3>

      <p>
        Apply row operations (swap rows, scale a row,
        add-multiple-of-one-row-to-another) to{" "}
        <InlineMath math="[A | \mathbf{b}]" /> until{" "}
        <InlineMath math="A" /> becomes upper-triangular. Then
        back-substitute.
      </p>

      <p>
        The clean way to think about row operations:{" "}
        <strong>each row operation is left-multiplication by
        an elementary matrix</strong>{" "}
        <InlineMath math="E_k" />. Stacking them up:
      </p>
      <BlockMath math="E_p \cdots E_2 E_1 A = U" />

      <p>
        with <InlineMath math="U" /> upper-triangular. Setting{" "}
        <InlineMath math="L = (E_p \cdots E_1)^{-1}" />, we
        get the <strong>LU factorisation</strong>:
      </p>
      <BlockMath math="A = LU." />

      <p>
        <InlineMath math="L" /> is lower-triangular,{" "}
        <InlineMath math="U" /> is upper-triangular. Solving{" "}
        <InlineMath math="A\mathbf{x} = \mathbf{b}" /> becomes
        two triangular solves, each{" "}
        <InlineMath math="O(n^2)" />. The factorisation itself
        is <InlineMath math="O(n^3)" /> but you do it once and
        re-use it for many right-hand sides — exactly the
        situation in repeated linear regression with rolling
        windows.
      </p>

      <h3>Pivots, free variables, and what failure looks like</h3>

      <p>
        During elimination, each leading non-zero in a row is a{" "}
        <strong>pivot</strong>. Variables corresponding to
        non-pivot columns are{" "}
        <strong>free</strong>. The number of pivots equals the{" "}
        <strong>rank</strong> of <InlineMath math="A" />.
      </p>

      <p>
        Failure modes:
      </p>
      <ul>
        <li>
          A zero pivot when one is expected: row-swap to
          recover (
          <em>partial pivoting</em>).
        </li>
        <li>
          A row of zeros in <InlineMath math="A" /> with
          non-zero RHS in <InlineMath math="\mathbf{b}" />: no
          solution exists (<InlineMath math="\mathbf{b}" /> is
          outside the column space).
        </li>
        <li>
          A row of zeros in <InlineMath math="A" /> with zero
          RHS: free variable; infinitely many solutions.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Inverses</h2>

      <p>
        For a square <InlineMath math="A" />, an{" "}
        <strong>inverse</strong>{" "}
        <InlineMath math="A^{-1}" /> satisfies{" "}
        <InlineMath math="A A^{-1} = A^{-1} A = I" />. It
        exists iff <InlineMath math="A" /> has rank{" "}
        <InlineMath math="n" /> (full rank).
      </p>

      <h3>What inverses are good for (mostly: thinking)</h3>

      <p>
        Inverses are mathematical objects, not numerical tools.
        For solving <InlineMath math="A\mathbf{x} = \mathbf{b}" />,{" "}
        <em>never</em> compute{" "}
        <InlineMath math="A^{-1} \mathbf{b}" /> explicitly:
        factorise (LU, QR, Cholesky) and solve. Forming{" "}
        <InlineMath math="A^{-1}" /> is{" "}
        <InlineMath math="O(n^3)" /> work to produce a numerically
        worse answer than a single triangular solve.
      </p>

      <h3>Useful identities</h3>

      <ul>
        <li>
          <InlineMath math="(AB)^{-1} = B^{-1} A^{-1}" />{" "}
          (order reverses).
        </li>
        <li>
          <InlineMath math="(A^T)^{-1} = (A^{-1})^T" />.
        </li>
        <li>
          A symmetric positive-definite matrix has a real,
          symmetric, positive-definite inverse.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>Every ML model with linear structure.</strong>{" "}
          Linear regression's design matrix{" "}
          <InlineMath math="X" />, the weight matrix in a
          fully-connected layer, the covariance matrix in PCA
          — all are matrices, all are linear maps. The
          column-view interpretation is what lets you predict
          how parameter changes propagate through a model.
        </li>
        <li>
          <strong>Composition is differentiability.</strong>{" "}
          Chain rule for vector-valued functions:{" "}
          <InlineMath math="\partial (f \circ g) = (\partial f)(\partial g)" />.
          Backpropagation is a sequence of matrix products
          along a computation graph.
        </li>
        <li>
          <strong>Microstructure preview.</strong> The
          propagator model writes price changes as{" "}
          <InlineMath math="\Delta p = G \cdot \boldsymbol{\xi}" />{" "}
          where <InlineMath math="G" /> is a (lower-
          triangular) impact kernel matrix. Matrix-vector
          intuition is exactly what you need.
        </li>
        <li>
          <strong>Numerical hygiene.</strong> Knowing that{" "}
          <InlineMath math="A = LU" /> exists, and that solving
          via factorisation costs{" "}
          <InlineMath math="O(n^3)" /> but each subsequent
          right-hand side costs only{" "}
          <InlineMath math="O(n^2)" />, is the kind of detail
          that turns a slow model into a fast one.
        </li>
      </ul>

      <p>
        Next chapter: the four fundamental subspaces. Once you
        have a matrix, four canonical subspaces fall out, and
        every solvability question about{" "}
        <InlineMath math="A\mathbf{x} = \mathbf{b}" /> reduces
        to which subspaces things live in.
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
      "Which of the following maps from $\\mathbb{R}^2 \\to \\mathbb{R}^2$ is **not** linear?",
    options: [
      "$\\mathbf{x} \\mapsto 2\\mathbf{x}$",
      "$\\mathbf{x} \\mapsto R\\mathbf{x}$ for a rotation matrix $R$",
      "$\\mathbf{x} \\mapsto \\mathbf{x} + (1, 0)^T$",
      "$\\mathbf{x} \\mapsto (x_1 + x_2, x_1 - x_2)^T$",
    ],
    correct: 2,
    explanation:
      "Translation by a non-zero vector fails $T(\\mathbf{0}) = \\mathbf{0}$. It's *affine*. The bias-augmentation trick (append a constant 1 feature) makes it linear in the augmented input.",
  },
  {
    prompt:
      "The columns of the matrix representation of a linear map $T$ are…",
    options: [
      "the eigenvectors of $T$",
      "the images $T(\\mathbf{e}_j)$ of the basis vectors",
      "the kernel of $T$",
      "the original basis vectors",
    ],
    correct: 1,
    explanation:
      "$A_{:,j} = T(\\mathbf{e}_j)$ — the *single most useful sentence* in linear algebra. It says how $T$ acts on the basis, and linearity extends that to every input.",
  },
  {
    prompt:
      "$A\\mathbf{v}$ should be read primarily as…",
    options: [
      "row-by-row dot products (a computer's view)",
      "a linear combination of the columns of $A$ with weights from $\\mathbf{v}$",
      "the identity",
      "the determinant of $A$",
    ],
    correct: 1,
    explanation:
      "Both readings give the same answer, but the column-view is the one that makes geometric sense and powers the column-space and rank machinery in the next chapter.",
  },
  {
    prompt:
      "If $A$ is $3 \\times 4$ and $B$ is $4 \\times 5$, then $AB$ is…",
    options: [
      "$3 \\times 5$",
      "$4 \\times 4$",
      "$5 \\times 3$",
      "undefined",
    ],
    correct: 0,
    explanation:
      "Inner dimensions must match (both 4). The product is (rows of $A$) × (columns of $B$) = $3 \\times 5$. Composition: $\\mathbb{R}^5 \\to \\mathbb{R}^4 \\to \\mathbb{R}^3$.",
  },
  {
    prompt:
      "In practice, to solve $A\\mathbf{x} = \\mathbf{b}$ for square $A$, you should…",
    options: [
      "compute $A^{-1}$ explicitly, then multiply",
      "use Cramer's rule",
      "factor $A$ (LU/QR/Cholesky) and back-substitute",
      "guess and check",
    ],
    correct: 2,
    explanation:
      "Forming $A^{-1}$ explicitly is $O(n^3)$ work for a numerically worse answer. LU + two triangular solves is the standard. Cramer's rule is only useful pedagogically.",
  },
];
