import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function FourSubspacesBody() {
  return (
    <>
      <p>
        Every <InlineMath math="m \times n" /> matrix{" "}
        <InlineMath math="A" /> generates four canonical
        subspaces — Strang's "fundamental theorem of linear
        algebra" — and the geometry of these four subspaces
        completely determines what{" "}
        <InlineMath math="A\mathbf{x} = \mathbf{b}" /> can do.
        Existence, uniqueness, OLS, multicollinearity, the
        rank–nullity theorem: all four-subspace statements.
      </p>
      <p>
        The picture is the most useful diagram in linear
        algebra. Once you have it in your head, you read the
        solvability of a linear system off the matrix
        without computing anything.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.06 — Lectures 6, 7, 8, 10",
            author: "Gilbert Strang",
            duration: "~4h",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
            note: "Lecture 10 ('the four subspaces') is the canonical exposition. Worth watching twice.",
          },
          {
            title: "MML Ch 2.6",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "Basis & rank in tighter notation.",
          },
          {
            title: "3Blue1Brown — EOLA 7, 8",
            author: "Grant Sanderson",
            duration: "~25 min",
            url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
            note: "Inverse / null space geometry.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The four subspaces</h2>

      <p>
        Fix an{" "}
        <InlineMath math="m \times n" /> matrix{" "}
        <InlineMath math="A" />. Its four fundamental subspaces
        are:
      </p>

      <Callout title="The four subspaces of A">
        <ul>
          <li>
            <strong>Column space</strong>{" "}
            <InlineMath math="C(A) \subseteq \mathbb{R}^m" />:
            span of the columns. The set of{" "}
            <InlineMath math="\mathbf{b}" /> for which{" "}
            <InlineMath math="A\mathbf{x} = \mathbf{b}" /> has
            a solution.
          </li>
          <li>
            <strong>Row space</strong>{" "}
            <InlineMath math="R(A) = C(A^T) \subseteq \mathbb{R}^n" />:
            span of the rows.
          </li>
          <li>
            <strong>Null space</strong>{" "}
            <InlineMath math="N(A) \subseteq \mathbb{R}^n" />:
            all <InlineMath math="\mathbf{x}" /> with{" "}
            <InlineMath math="A\mathbf{x} = \mathbf{0}" />.
          </li>
          <li>
            <strong>Left null space</strong>{" "}
            <InlineMath math="N(A^T) \subseteq \mathbb{R}^m" />:
            all <InlineMath math="\mathbf{y}" /> with{" "}
            <InlineMath math="A^T \mathbf{y} = \mathbf{0}" />.
          </li>
        </ul>
      </Callout>

      <p>
        Two sit on the input side (
        <InlineMath math="\mathbb{R}^n" />): row space and
        null space. Two sit on the output side (
        <InlineMath math="\mathbb{R}^m" />): column space and
        left null space.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Column space — what's reachable</h2>

      <p>
        The column space <InlineMath math="C(A)" /> is exactly
        the image of the linear map{" "}
        <InlineMath math="\mathbf{x} \mapsto A\mathbf{x}" />.
        From the column reading,{" "}
        <InlineMath math="A\mathbf{x} = \sum_j x_j \mathbf{a}_j" />,
        so every output is a linear combination of the columns.
        The reachable set is their span.
      </p>

      <p>
        Implication for solvability:
      </p>

      <Callout title="Existence test">
        <InlineMath math="A\mathbf{x} = \mathbf{b}" /> has a
        solution{" "}
        <InlineMath math="\iff \mathbf{b} \in C(A)" />.
      </Callout>

      <p>
        For least squares (Module III), when{" "}
        <InlineMath math="\mathbf{b} \notin C(A)" />, you can't
        solve exactly — but you can find the closest point in{" "}
        <InlineMath math="C(A)" />, which is the orthogonal
        projection of <InlineMath math="\mathbf{b}" />. That is
        the entire content of OLS.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Null space — what gets killed</h2>

      <p>
        The null space{" "}
        <InlineMath math="N(A) = \{\mathbf{x} : A\mathbf{x} = \mathbf{0}\}" />{" "}
        captures the redundancy in the linear system. Two
        observations:
      </p>

      <ul>
        <li>
          <InlineMath math="N(A)" /> is a subspace (closed under
          addition and scalar multiplication; you can verify in
          one line).
        </li>
        <li>
          If{" "}
          <InlineMath math="\mathbf{x}_p" /> solves{" "}
          <InlineMath math="A\mathbf{x} = \mathbf{b}" /> and{" "}
          <InlineMath math="\mathbf{x}_h \in N(A)" />, then{" "}
          <InlineMath math="\mathbf{x}_p + \mathbf{x}_h" />{" "}
          also solves it. The solution set is{" "}
          <InlineMath math="\mathbf{x}_p + N(A)" />.
        </li>
      </ul>

      <Callout title="Uniqueness test">
        Given existence,{" "}
        <InlineMath math="A\mathbf{x} = \mathbf{b}" /> has a{" "}
        <em>unique</em> solution{" "}
        <InlineMath math="\iff N(A) = \{\mathbf{0}\}" />.
      </Callout>

      <p>
        For OLS in regression: if features are dependent, the
        null space is non-trivial, and you have infinitely many
        equally good <InlineMath math="\boldsymbol{\beta}" />s.
        You either drop dependent columns or regularise (ridge,
        which makes the solution unique by penalty).
      </p>

      <Pitfall>
        <InlineMath math="N(A) = \{\mathbf{0}\}" /> is what the
        textbook calls "trivial" — and it's the desired
        property. Don't mix this up with "<InlineMath math="N(A)" /> is empty";
        the null space always contains{" "}
        <InlineMath math="\mathbf{0}" />, so it's never truly
        empty.
      </Pitfall>

      <Exercise prompt="$A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \end{pmatrix}$. Find $N(A)$ and $C(A)$.">
        <p>
          The two rows are dependent. After row reduction,{" "}
          <InlineMath math="A" /> has one pivot in column 1.
          The reduced form is{" "}
          <InlineMath math="\begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \end{pmatrix}" />.
        </p>
        <p>
          <strong>Null space:</strong>{" "}
          <InlineMath math="x_1 + 2 x_2 + 3 x_3 = 0" />, so{" "}
          <InlineMath math="x_1 = -2 x_2 - 3 x_3" />.{" "}
          <InlineMath math="x_2, x_3" /> are free.{" "}
          <InlineMath math="N(A) = \mathrm{span}((-2, 1, 0)^T, (-3, 0, 1)^T)" />.
          Two-dimensional.
        </p>
        <p>
          <strong>Column space:</strong> all three columns are
          multiples of{" "}
          <InlineMath math="(1, 2)^T" />, so{" "}
          <InlineMath math="C(A) = \mathrm{span}((1, 2)^T)" />.
          One-dimensional. Rank 1.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Rank and the rank–nullity theorem</h2>

      <Callout title="Definition · Rank">
        The <strong>rank</strong> of{" "}
        <InlineMath math="A" /> is{" "}
        <BlockMath math="\mathrm{rank}(A) = \dim C(A) = \dim R(A)." />
        Both column space and row space have the same
        dimension — the number of pivots in the row-reduced
        form.
      </Callout>

      <p>
        Equality of column-rank and row-rank is one of those
        small miracles. The proof goes through row reduction:
        the same row operations don't change either rank, and
        the reduced echelon form makes both visibly equal to
        the number of pivots.
      </p>

      <Callout title="Rank–Nullity Theorem">
        For an{" "}
        <InlineMath math="m \times n" /> matrix:
        <BlockMath math="\dim C(A) + \dim N(A) = n." />
        Equivalently:{" "}
        <em>rank + nullity = number of columns.</em>
      </Callout>

      <p>
        Why it has to be true: each column either contributes
        a new dimension to{" "}
        <InlineMath math="C(A)" /> (a pivot column) or it
        doesn't (a free-variable column, which contributes a
        direction to <InlineMath math="N(A)" />). Pivots +
        free variables = total columns. Done.
      </p>

      <p>
        Dual statement on the output side:
      </p>
      <BlockMath math="\dim C(A) + \dim N(A^T) = m." />

      <p>
        So the four dimensions are completely determined by{" "}
        <InlineMath math="m" />, <InlineMath math="n" />, and{" "}
        <InlineMath math="\mathrm{rank}(A)" />:
      </p>
      <BlockMath math="\dim C(A) = r, \quad \dim N(A) = n - r," />
      <BlockMath math="\dim R(A) = r, \quad \dim N(A^T) = m - r." />

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Orthogonality of the four subspaces</h2>

      <p>
        The four subspaces come in two pairs, each pair{" "}
        <em>orthogonally complementing</em> each other.
      </p>

      <Callout title="Big Theorem">
        <BlockMath math="N(A) = R(A)^\perp \quad \text{(in } \mathbb{R}^n\text{)}" />
        <BlockMath math="N(A^T) = C(A)^\perp \quad \text{(in } \mathbb{R}^m\text{)}" />
      </Callout>

      <p>
        Why{" "}
        <InlineMath math="N(A) \perp R(A)" />: if{" "}
        <InlineMath math="\mathbf{x} \in N(A)" />, then{" "}
        <InlineMath math="A\mathbf{x} = \mathbf{0}" />, which
        means every row of <InlineMath math="A" /> dotted with{" "}
        <InlineMath math="\mathbf{x}" /> is zero. The rows span{" "}
        <InlineMath math="R(A)" />, so{" "}
        <InlineMath math="\mathbf{x}" /> is perpendicular to
        all of <InlineMath math="R(A)" />. ∎
      </p>

      <p>
        Geometric picture: the input space{" "}
        <InlineMath math="\mathbb{R}^n" /> decomposes as
      </p>
      <BlockMath math="\mathbb{R}^n = R(A) \oplus N(A)" />
      <p>
        with the two pieces perpendicular. Every input{" "}
        <InlineMath math="\mathbf{x}" /> writes uniquely as{" "}
        <InlineMath math="\mathbf{x}_R + \mathbf{x}_N" /> with{" "}
        <InlineMath math="\mathbf{x}_R \in R(A)" /> and{" "}
        <InlineMath math="\mathbf{x}_N \in N(A)" />. Only the{" "}
        <InlineMath math="\mathbf{x}_R" /> piece "matters" for
        what <InlineMath math="A" /> does.
      </p>

      <p>
        This decomposition is what powers the{" "}
        <strong>Moore–Penrose pseudoinverse</strong> in Module
        II: the minimum-norm solution to{" "}
        <InlineMath math="A\mathbf{x} = \mathbf{b}" /> is the
        one that lives entirely in{" "}
        <InlineMath math="R(A)" />.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>
        Part 6 · Solving <InlineMath math="A\mathbf{x} = \mathbf{b}" /> — the
        full story
      </h2>

      <p>
        Combining everything:
      </p>

      <ul>
        <li>
          <strong>Solution exists</strong>{" "}
          <InlineMath math="\iff \mathbf{b} \in C(A)" /> —
          equivalently,{" "}
          <InlineMath math="\mathbf{b} \perp N(A^T)" />.
        </li>
        <li>
          <strong>Solution is unique</strong> (when it exists){" "}
          <InlineMath math="\iff N(A) = \{\mathbf{0}\}" />.
        </li>
        <li>
          When solutions exist but{" "}
          <InlineMath math="N(A) \ne \{\mathbf{0}\}" />: the
          solution set is{" "}
          <InlineMath math="\mathbf{x}_p + N(A)" />.
        </li>
        <li>
          When no solution exists, the{" "}
          <em>least-squares</em> solution minimises{" "}
          <InlineMath math="\|A\mathbf{x} - \mathbf{b}\|^2" /> by
          replacing <InlineMath math="\mathbf{b}" /> with its
          projection onto <InlineMath math="C(A)" />.
        </li>
      </ul>

      <h3>Square matrices: the unified condition</h3>

      <p>
        For a square <InlineMath math="n \times n" /> matrix{" "}
        <InlineMath math="A" />, the following are{" "}
        <em>all equivalent</em>:
      </p>

      <ul>
        <li>
          <InlineMath math="A" /> is invertible.
        </li>
        <li>
          <InlineMath math="\mathrm{rank}(A) = n" />.
        </li>
        <li>
          <InlineMath math="N(A) = \{\mathbf{0}\}" />.
        </li>
        <li>
          The columns of <InlineMath math="A" /> are linearly
          independent.
        </li>
        <li>
          <InlineMath math="A\mathbf{x} = \mathbf{b}" /> has a
          unique solution for every{" "}
          <InlineMath math="\mathbf{b}" />.
        </li>
        <li>
          <InlineMath math="\det(A) \ne 0" />.
        </li>
        <li>
          0 is not an eigenvalue of{" "}
          <InlineMath math="A" />.
        </li>
      </ul>

      <p>
        This is sometimes called the "Invertible Matrix
        Theorem" — but it's really just the four-subspaces
        picture for the special case{" "}
        <InlineMath math="m = n" />.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>OLS singularity.</strong>{" "}
          <InlineMath math="X^T X" /> is singular iff{" "}
          <InlineMath math="X" /> has dependent columns,
          iff <InlineMath math="N(X) \ne \{\mathbf{0}\}" />,
          iff features are collinear. The fix is to remove
          collinear columns or regularise.
        </li>
        <li>
          <strong>Latent factors.</strong> When data lives near
          a low-rank subspace, the column space of the design
          matrix is the "true" feature space; the rest is
          noise. PCA finds it; SVD computes it.
        </li>
        <li>
          <strong>Constraints.</strong> Linear constraints{" "}
          <InlineMath math="A\mathbf{x} = \mathbf{b}" /> in
          optimisation (e.g. Almgren–Chriss with execution
          constraints) carve out an affine subspace{" "}
          <InlineMath math="\mathbf{x}_p + N(A)" />.
          Optimisation lives on it.
        </li>
        <li>
          <strong>Pseudoinverse and minimum-norm
          solutions.</strong> When <InlineMath math="A" /> is
          rank-deficient, the pseudoinverse picks the unique
          solution in <InlineMath math="R(A)" /> — the one
          orthogonal to <InlineMath math="N(A)" />. That's the
          Moore–Penrose / SVD solution we'll meet in Module II.
        </li>
      </ul>

      <p>
        Next chapter: change of basis. Same vector, different
        coordinates; same map, similar matrix. With the
        four-subspace picture in hand, change of basis becomes
        a friendly relabelling rather than a notational mystery.
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
      "$A\\mathbf{x} = \\mathbf{b}$ has at least one solution iff…",
    options: [
      "$\\det(A) \\ne 0$",
      "$\\mathbf{b} \\in C(A)$",
      "$\\mathbf{b} \\in N(A)$",
      "$A$ is square",
    ],
    correct: 1,
    explanation:
      "Solvability is exactly $\\mathbf{b}$ being a linear combination of the columns of $A$ — i.e. lying in the column space.",
  },
  {
    prompt:
      "For an $m \\times n$ matrix with rank $r$, the null space has dimension…",
    options: ["$r$", "$n - r$", "$m - r$", "$mn - r$"],
    correct: 1,
    explanation:
      "Rank–Nullity: $\\dim N(A) = n - \\dim C(A) = n - r$. Free-variable columns each contribute one direction.",
  },
  {
    prompt:
      "Which two subspaces are orthogonal complements in $\\mathbb{R}^n$?",
    options: [
      "$C(A)$ and $N(A)$",
      "$R(A)$ and $N(A)$",
      "$C(A)$ and $C(A^T)$",
      "$N(A)$ and $N(A^T)$",
    ],
    correct: 1,
    explanation:
      "Both live in $\\mathbb{R}^n$, and any $\\mathbf{x} \\in N(A)$ is perpendicular to every row, hence to all of $R(A)$. They span $\\mathbb{R}^n$ together.",
  },
  {
    prompt:
      "If $A$ is square and $N(A) = \\{\\mathbf{0}\\}$…",
    options: [
      "$A\\mathbf{x} = \\mathbf{b}$ may or may not have a solution",
      "$A$ is necessarily invertible and $A\\mathbf{x} = \\mathbf{b}$ has a unique solution for every $\\mathbf{b}$",
      "$A$ has rank 0",
      "$A^T = A$",
    ],
    correct: 1,
    explanation:
      "Trivial null space + square ⇒ rank $n$ ⇒ invertible ⇒ unique solution for every right-hand side. This is the Invertible Matrix Theorem.",
  },
  {
    prompt:
      "In OLS, $X^T X$ is singular iff…",
    options: [
      "the data is too small",
      "the columns of $X$ are linearly dependent (multicollinearity)",
      "$\\mathbf{y}$ is not in $C(X)$",
      "the residuals are zero",
    ],
    correct: 1,
    explanation:
      "$X^T X$ is singular ⇔ $N(X) \\ne \\{\\mathbf{0}\\}$ ⇔ columns of $X$ are dependent. The fix is to drop a column or regularise (ridge), which makes the OLS solution unique.",
  },
];
