import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function MatricesBody() {
  return (
    <>
      <p>
        Matrices look intimidating because they're written as grids of
        numbers, but their content is geometric: a matrix{" "}
        <em>is a linear transformation</em>. Multiplication of two
        matrices is composition of two transformations, in the order
        you read them from right to left. The determinant of a matrix is
        the volume scaling factor of its transformation. Once those
        three facts click, the algebra of matrices stops being
        bookkeeping and starts being geometry.
      </p>
      <p>
        This chapter develops linear maps from scratch, derives matrix
        multiplication from the requirement that maps compose, and
        builds the practical machinery for solving{" "}
        <InlineMath math="A\mathbf{x} = \mathbf{b}" /> — Gaussian
        elimination, LU decomposition, and inverses.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Essence of Linear Algebra — chs. 3–4 (matrices, composition)",
            author: "3Blue1Brown",
            duration: "~25 min",
            url: "https://www.youtube.com/watch?v=kYB8IZa5AuE",
            note: "Watch this once. The grid-deformation visualisation is the canonical mental picture for matrices.",
          },
          {
            title: "MIT 18.06 — Lectures 2–4, 7–11",
            author: "Gilbert Strang (MIT OCW)",
            duration: "~9h",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/video_galleries/video-lectures/",
            note: "Strang's elimination + LU lectures are the model for the procedural parts of this chapter.",
          },
          {
            title: "Essence of Linear Algebra — Ch. 5: Determinant",
            author: "3Blue1Brown",
            duration: "10 min",
            url: "https://www.youtube.com/watch?v=Ip3X9LOh2dk",
            note: "Pair with Part 4.",
          },
          {
            title: "Strang — Introduction to Linear Algebra (book)",
            author: "Gilbert Strang",
            duration: "Reading",
            url: "https://math.mit.edu/~gs/linearalgebra/",
            note: "Chapters 2–3 mirror this chapter exactly.",
          },
          {
            title: "Linear Algebra Done Right — chs. 3, 10",
            author: "Sheldon Axler",
            duration: "Reading",
            url: "https://linear.axler.net/",
            note: "Treats linear maps abstractly first; matrices come later. Worth a second pass once Strang feels routine.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Linear maps</h2>

      <p>
        A function <InlineMath math="T : V \to W" /> between vector
        spaces is a <strong>linear map</strong> (or <em>linear
        transformation</em>) if it preserves both operations:
      </p>
      <ol>
        <li>
          <InlineMath math="T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})" />{" "}
          (additivity).
        </li>
        <li>
          <InlineMath math="T(\alpha \mathbf{v}) = \alpha \, T(\mathbf{v})" />{" "}
          (homogeneity).
        </li>
      </ol>
      <p>
        Combined: <InlineMath math="T(\alpha \mathbf{u} + \beta \mathbf{v}) = \alpha T(\mathbf{u}) + \beta T(\mathbf{v})" />.
        A linear map turns linear combinations into linear combinations,
        with the same coefficients. That single property is enormously
        restrictive — it means a linear map on{" "}
        <InlineMath math="\mathbb{R}^n" /> is completely determined by
        its action on any one basis. Know{" "}
        <InlineMath math="T(\mathbf{e}_1), \dots, T(\mathbf{e}_n)" /> and
        you know <InlineMath math="T(\mathbf{v})" /> for every{" "}
        <InlineMath math="\mathbf{v}" /> by linear combination.
      </p>

      <p>
        Linear maps on <InlineMath math="\mathbb{R}^2" /> include:
      </p>
      <ul>
        <li>
          <strong>Rotation</strong> by angle{" "}
          <InlineMath math="\theta" /> about the origin.
        </li>
        <li>
          <strong>Scaling</strong> (uniform or nonuniform along axes).
        </li>
        <li>
          <strong>Reflection</strong> across an axis or arbitrary line
          through the origin.
        </li>
        <li>
          <strong>Shear</strong>:{" "}
          <InlineMath math="(x, y) \mapsto (x + ky, y)" /> tilts vertical
          lines.
        </li>
        <li>
          <strong>Projection</strong> onto a line or plane through the
          origin.
        </li>
      </ul>
      <p>
        Crucially, a linear map always sends{" "}
        <InlineMath math="\mathbf{0}" /> to <InlineMath math="\mathbf{0}" />:
        from <InlineMath math="T(\mathbf{0}) = T(0 \cdot \mathbf{v}) = 0 \cdot T(\mathbf{v}) = \mathbf{0}" />.
        Translations (which move the origin) are <em>not</em> linear.
      </p>

      <Pitfall>
        Many functions you'd casually call "linear" in everyday usage —{" "}
        <InlineMath math="f(x) = mx + b" /> with{" "}
        <InlineMath math="b \neq 0" />, for instance — fail
        the linear-map test because they don't send 0 to 0. Those are{" "}
        <em>affine</em> maps. Linear algebra, strictly speaking, is
        about <em>linear</em> maps; affine maps are linear maps plus a
        translation.
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Matrices as transformations</h2>

      <p>
        Suppose <InlineMath math="T : \mathbb{R}^n \to \mathbb{R}^m" />{" "}
        is linear. By the observation above,{" "}
        <InlineMath math="T" /> is determined by its action on the
        standard basis. Stack those images side-by-side as columns:
      </p>
      <BlockMath math="A = \bigl[\, T(\mathbf{e}_1) \;\;\big|\;\; T(\mathbf{e}_2) \;\;\big|\;\; \cdots \;\;\big|\;\; T(\mathbf{e}_n) \,\bigr]." />
      <p>
        This is the <strong>matrix of <InlineMath math="T" /></strong>{" "}
        in the standard basis — an{" "}
        <InlineMath math="m \times n" /> array. To compute{" "}
        <InlineMath math="T(\mathbf{v})" /> for any{" "}
        <InlineMath math="\mathbf{v} = (v_1, \dots, v_n)" />, write{" "}
        <InlineMath math="\mathbf{v}" /> as a linear combination of the{" "}
        <InlineMath math="\mathbf{e}_i" /> and use linearity:
      </p>
      <BlockMath math="T(\mathbf{v}) = T\!\left(\sum_i v_i \mathbf{e}_i\right) = \sum_i v_i \, T(\mathbf{e}_i) = \sum_i v_i \, A \mathbf{e}_i = A\mathbf{v}." />
      <p>
        That last step is the definition of matrix-times-vector:
      </p>
      <BlockMath math="A \mathbf{v} = v_1 (\text{col}_1) + v_2 (\text{col}_2) + \cdots + v_n (\text{col}_n)." />
      <p>
        Read it as: <em>the result is a linear combination of the
        columns of <InlineMath math="A" />, with coefficients from{" "}
        <InlineMath math="\mathbf{v}" /></em>. Strang calls this the{" "}
        <strong>column picture</strong> of matrix multiplication, and
        emphasises it over the row-by-row computational rule.
      </p>

      <h3>Worked example: rotation</h3>
      <p>
        Rotation by <InlineMath math="\theta" /> sends{" "}
        <InlineMath math="\mathbf{e}_1 = (1, 0)" /> to{" "}
        <InlineMath math="(\cos\theta, \sin\theta)" /> and{" "}
        <InlineMath math="\mathbf{e}_2 = (0, 1)" /> to{" "}
        <InlineMath math="(-\sin\theta, \cos\theta)" />. Stacking as
        columns:
      </p>
      <BlockMath math="R_\theta = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}." />
      <p>
        Verify: <InlineMath math="R_\theta \mathbf{e}_1 = (\cos\theta, \sin\theta)" />,{" "}
        <InlineMath math="R_\theta \mathbf{e}_2 = (-\sin\theta, \cos\theta)" />.
        ✓
      </p>

      <Callout title="Try it">
        Adjust the entries of a 2×2 matrix and watch the unit grid +
        basis vectors deform. The yellow vector is{" "}
        <InlineMath math="A \mathbf{e}_1" /> and the cyan is{" "}
        <InlineMath math="A \mathbf{e}_2" /> — exactly the columns of{" "}
        <InlineMath math="A" />.
      </Callout>

      <TransformWidget />

      <Exercise
        number="2.1"
        prompt={
          <>
            Write the matrix for "reflect across the line{" "}
            <InlineMath math="y = x" />" in <InlineMath math="\mathbb{R}^2" />.
          </>
        }
      >
        <p>
          The reflection sends <InlineMath math="(x, y) \to (y, x)" />.
          So <InlineMath math="T(\mathbf{e}_1) = T((1, 0)) = (0, 1)" />{" "}
          and <InlineMath math="T(\mathbf{e}_2) = T((0, 1)) = (1, 0)" />.
          Stack as columns:
        </p>
        <BlockMath math="A = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}." />
      </Exercise>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Composition = matrix multiplication</h2>

      <p>
        If <InlineMath math="T_1 : \mathbb{R}^n \to \mathbb{R}^m" /> and{" "}
        <InlineMath math="T_2 : \mathbb{R}^m \to \mathbb{R}^p" /> are
        linear, the composition <InlineMath math="T_2 \circ T_1" /> is
        also linear (compositions of linear maps are linear). Its
        matrix should be expressible in terms of the matrices of{" "}
        <InlineMath math="T_1" /> and <InlineMath math="T_2" /> alone.
        That requirement <em>defines</em> matrix multiplication.
      </p>

      <p>
        If <InlineMath math="A" /> is the matrix of{" "}
        <InlineMath math="T_2" /> and <InlineMath math="B" /> is the
        matrix of <InlineMath math="T_1" />, then{" "}
        <InlineMath math="AB" /> is the matrix of{" "}
        <InlineMath math="T_2 \circ T_1" />:
      </p>
      <BlockMath math="(AB) \mathbf{x} = A(B\mathbf{x})." />

      <p>
        Working out what the product matrix's entries have to be: the{" "}
        <InlineMath math="j" />-th column of <InlineMath math="AB" /> is{" "}
        <InlineMath math="(AB) \mathbf{e}_j = A(B \mathbf{e}_j) = A(\text{col}_j \text{ of } B)" />.
        So <em>each column of <InlineMath math="AB" /> is{" "}
        <InlineMath math="A" /> times a column of <InlineMath math="B" />
        </em>. Working out individual entries gives the familiar
        row-times-column rule:
      </p>
      <BlockMath math="(AB)_{ij} = \sum_{k} A_{ik} B_{kj}." />
      <p>
        Read: row <InlineMath math="i" /> of <InlineMath math="A" /> dot
        column <InlineMath math="j" /> of <InlineMath math="B" />. The
        sizes have to match: an{" "}
        <InlineMath math="m \times n" /> matrix can multiply an{" "}
        <InlineMath math="n \times p" /> matrix on the right (yielding{" "}
        <InlineMath math="m \times p" />). The "inner dimensions" must
        agree.
      </p>

      <h3>Properties</h3>
      <ul>
        <li>
          <strong>Associative:</strong>{" "}
          <InlineMath math="(AB)C = A(BC)" />. (Composition of functions
          is always associative.)
        </li>
        <li>
          <strong>Distributive:</strong>{" "}
          <InlineMath math="A(B + C) = AB + AC" />.
        </li>
        <li>
          <strong>Not commutative:</strong>{" "}
          <InlineMath math="AB \neq BA" /> in general. (Try a rotation
          and a non-square scaling — order matters.)
        </li>
      </ul>

      <p>
        The <strong>identity matrix</strong>{" "}
        <InlineMath math="I_n" /> has 1s on the diagonal and 0s
        elsewhere. It's the matrix of the identity transformation, and{" "}
        <InlineMath math="I A = A I = A" /> for compatible{" "}
        <InlineMath math="A" />.
      </p>

      <Pitfall>
        Non-commutativity in matrices is the rule, not the exception. A
        rotation followed by a horizontal shear does not equal the
        shear followed by the rotation — geometrically, the curves
        traced by two compositions are different. Quantum mechanics
        relies entirely on this: position and momentum operators don't
        commute, and that fact <em>is</em> the uncertainty principle.
      </Pitfall>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Determinant</h2>

      <p>
        For square matrices, the <strong>determinant</strong>{" "}
        <InlineMath math="\det A" /> is a single scalar that captures
        a great deal about <InlineMath math="A" />. Geometrically, it's
        the <em>signed volume scaling factor</em> of the
        transformation. If you take a unit square / cube / hypercube
        and apply <InlineMath math="A" />, the result has area / volume
        equal to <InlineMath math="|\det A|" />. The sign tells you
        whether <InlineMath math="A" /> preserves or reverses
        orientation.
      </p>

      <p>
        The 2×2 formula:
      </p>
      <BlockMath math="\det \begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc." />
      <p>
        For a rotation, <InlineMath math="\det = \cos^2\theta + \sin^2\theta = 1" />:
        rotations preserve area and orientation. For a uniform scaling
        by <InlineMath math="k" />,{" "}
        <InlineMath math="\det = k^2" />: the unit square becomes{" "}
        <InlineMath math="k \times k" />. For a reflection,{" "}
        <InlineMath math="\det = -1" />: reflection preserves area but
        flips orientation.
      </p>

      <p>
        The 3×3 formula (cofactor expansion along the first row):
      </p>
      <BlockMath math="\det \begin{pmatrix} a & b & c \\ d & e & f \\ g & h & i \end{pmatrix} = a(ei - fh) - b(di - fg) + c(dh - eg)." />

      <h3>The big property</h3>

      <Callout title="Determinant theorem">
        <InlineMath math="\det A = 0" /> if and only if{" "}
        <InlineMath math="A" /> is{" "}
        <strong>singular</strong> (i.e. non-invertible, equivalently
        the columns are linearly dependent, equivalently{" "}
        <InlineMath math="A\mathbf{x} = \mathbf{0}" /> has nonzero
        solutions).
      </Callout>

      <p>
        Why: the transformation crushes the unit hypercube down to
        something of zero volume — a lower-dimensional pancake. There's
        no way to invert that.
      </p>

      <p>
        Other useful identities:
      </p>
      <ul>
        <li>
          <InlineMath math="\det(AB) = \det(A) \det(B)" /> (determinants
          are multiplicative).
        </li>
        <li>
          <InlineMath math="\det(A^T) = \det(A)" />.
        </li>
        <li>
          <InlineMath math="\det(A^{-1}) = 1 / \det(A)" />.
        </li>
        <li>
          For a diagonal or triangular matrix, the determinant is the
          product of the diagonal entries.
        </li>
      </ul>

      <Exercise
        number="4.1"
        prompt={
          <>
            Compute{" "}
            <InlineMath math="\det \begin{pmatrix} 3 & 5 \\ 2 & 4 \end{pmatrix}" />
            . Is the matrix invertible?
          </>
        }
      >
        <p>
          <InlineMath math="3 \cdot 4 - 5 \cdot 2 = 12 - 10 = 2" />.
          Nonzero, so invertible.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Inverse matrices</h2>

      <p>
        The <strong>inverse</strong> of a square matrix{" "}
        <InlineMath math="A" /> is the matrix{" "}
        <InlineMath math="A^{-1}" /> with{" "}
        <InlineMath math="A A^{-1} = A^{-1} A = I" />. It exists iff{" "}
        <InlineMath math="A" /> is non-singular (equivalently,{" "}
        <InlineMath math="\det A \neq 0" />). When it exists,{" "}
        <InlineMath math="A^{-1}" /> is unique.
      </p>

      <p>
        For a 2×2 matrix:
      </p>
      <BlockMath math="A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}, \qquad A^{-1} = \frac{1}{ad - bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}." />
      <p>
        Note the swap and sign flip; the formula falls out directly
        from solving <InlineMath math="A A^{-1} = I" /> entry by entry.
      </p>

      <p>
        For larger matrices, use Gauss–Jordan elimination: form the
        augmented block <InlineMath math="[A \mid I]" />, apply row
        operations until the left side is <InlineMath math="I" />, and
        the right side is then <InlineMath math="A^{-1}" />.
      </p>

      <p>
        With <InlineMath math="A^{-1}" /> in hand, solving{" "}
        <InlineMath math="A\mathbf{x} = \mathbf{b}" /> is just{" "}
        <InlineMath math="\mathbf{x} = A^{-1} \mathbf{b}" />. In
        practice, computing <InlineMath math="A^{-1}" /> explicitly is
        usually the wrong move — Gaussian elimination on{" "}
        <InlineMath math="\mathbf{b}" /> directly is faster and more
        numerically stable. The inverse formula is mainly a theoretical
        tool.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Gaussian elimination</h2>

      <p>
        The fundamental algorithm of computational linear algebra. To
        solve <InlineMath math="A\mathbf{x} = \mathbf{b}" />, augment{" "}
        <InlineMath math="A" /> with <InlineMath math="\mathbf{b}" />{" "}
        as a column on the right, then apply{" "}
        <strong>elementary row operations</strong> until the matrix is
        in <em>row echelon form</em> (or reduced row echelon, RREF, if
        you also clear columns above pivots). Three operations are
        legal:
      </p>
      <ol>
        <li>Swap two rows.</li>
        <li>Multiply a row by a nonzero scalar.</li>
        <li>Add a multiple of one row to another.</li>
      </ol>
      <p>
        Each operation preserves the solution set of{" "}
        <InlineMath math="A\mathbf{x} = \mathbf{b}" />. Once you reach
        echelon form, back-substitute from the bottom row up.
      </p>

      <h3>Worked example</h3>
      <p>
        Solve{" "}
        <InlineMath math="\begin{pmatrix} 1 & 2 & 1 \\ 2 & 6 & 1 \\ 1 & 1 & 4 \end{pmatrix} \mathbf{x} = \begin{pmatrix} 7 \\ 18 \\ 13 \end{pmatrix}" />
        .
      </p>
      <p>
        Subtract 2× row 1 from row 2; subtract 1× row 1 from row 3:
      </p>
      <BlockMath math="\left[\begin{array}{ccc|c} 1 & 2 & 1 & 7 \\ 0 & 2 & -1 & 4 \\ 0 & -1 & 3 & 6 \end{array}\right]." />
      <p>
        Add (½)× row 2 to row 3:
      </p>
      <BlockMath math="\left[\begin{array}{ccc|c} 1 & 2 & 1 & 7 \\ 0 & 2 & -1 & 4 \\ 0 & 0 & 5/2 & 8 \end{array}\right]." />
      <p>
        Back-substitute:{" "}
        <InlineMath math="z = 16/5" />,{" "}
        <InlineMath math="2y - 16/5 = 4" />, so{" "}
        <InlineMath math="y = 18/5" />, then{" "}
        <InlineMath math="x = 7 - 2 \cdot 18/5 - 16/5 = 7 - 36/5 - 16/5 = -17/5" />
        . Wait — check arithmetic: should be{" "}
        <InlineMath math="x = 7 - 36/5 - 16/5 = 7 - 52/5 = -17/5" /> ✓.
        Plug back to verify if you like.
      </p>

      <h3>Existence and uniqueness</h3>
      <p>
        After elimination, count <strong>pivots</strong> (nonzero
        leading entries in the row-echelon matrix). The rank{" "}
        <InlineMath math="r" /> equals the pivot count.
      </p>
      <ul>
        <li>
          If the elimination produces a row{" "}
          <InlineMath math="[0 \;\; 0 \;\; \cdots \;\; 0 \mid c]" /> with{" "}
          <InlineMath math="c \neq 0" />, the system is{" "}
          <strong>inconsistent</strong> — no solution.
        </li>
        <li>
          If <InlineMath math="r = n" /> (one pivot per column,{" "}
          <InlineMath math="n" /> = number of unknowns): unique
          solution.
        </li>
        <li>
          If <InlineMath math="r < n" /> and the system is consistent:
          infinitely many solutions, parameterised by the{" "}
          <InlineMath math="n - r" /> free variables.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · LU decomposition</h2>

      <p>
        Gaussian elimination is itself a <em>matrix factorisation</em>.
        If you do elimination without row swaps, the operations
        encode as a lower-triangular matrix{" "}
        <InlineMath math="L" /> (with 1s on the diagonal and the
        multipliers below); the resulting upper-triangular row-echelon
        matrix is <InlineMath math="U" />. Together,
      </p>
      <BlockMath math="A = L U." />

      <p>
        Why this is useful: solving <InlineMath math="A\mathbf{x} = \mathbf{b}" />{" "}
        becomes solving two triangular systems:
      </p>
      <ol>
        <li>
          Solve <InlineMath math="L \mathbf{y} = \mathbf{b}" /> by{" "}
          <em>forward</em> substitution.
        </li>
        <li>
          Solve <InlineMath math="U \mathbf{x} = \mathbf{y}" /> by{" "}
          <em>backward</em> substitution.
        </li>
      </ol>
      <p>
        Triangular systems are cheap; the expensive part of
        elimination (computing <InlineMath math="U" />) only happens
        once even if you change <InlineMath math="\mathbf{b}" />. So if
        you have to solve <InlineMath math="A\mathbf{x} = \mathbf{b}" />{" "}
        for many right-hand sides — common in engineering and physics —{" "}
        LU pays for itself.
      </p>

      <p>
        When row swaps are needed (some pivots end up in the wrong
        place), the factorisation becomes{" "}
        <InlineMath math="P A = L U" />, where <InlineMath math="P" /> is
        a permutation matrix recording the swaps.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Change of basis</h2>

      <p>
        The same linear map looks like different matrices in different
        bases. If <InlineMath math="P" /> is the matrix whose columns
        are a new basis (expressed in the old standard basis), then a
        vector with old-coordinates <InlineMath math="\mathbf{x}" /> has
        new-coordinates <InlineMath math="\mathbf{x}' = P^{-1} \mathbf{x}" />,
        and a linear map with old-matrix <InlineMath math="A" /> has
        new-matrix
      </p>
      <BlockMath math="A' = P^{-1} A P." />
      <p>
        Two matrices related this way are called{" "}
        <strong>similar</strong>. Similarity is an equivalence relation
        (Foundations Part 8) — it's the right notion of "same map,
        different coordinates."
      </p>

      <p>
        Many calculations dramatically simplify in the right basis.
        That observation is exactly the punchline of the Eigenvalues
        chapter: for many matrices, there's a basis in which the
        matrix becomes diagonal, and diagonal matrices are trivial to
        manipulate.
      </p>

      {/* ─────────────────────────────  PART 9  ───────────────────────────── */}
      <h2>Part 9 · Why this matters for quantum</h2>

      <ul>
        <li>
          <strong>Quantum gates</strong> are matrices. The Hadamard,
          Pauli-X/Y/Z, CNOT, Toffoli — all <em>unitary</em> matrices on
          a complex vector space. Composing gates = multiplying their
          matrices.
        </li>
        <li>
          <strong>Quantum circuits</strong> are products of these
          matrices. Reading a circuit left-to-right and composing
          gates literally means multiplying the matrices in reverse
          order (because composition reads right-to-left).
        </li>
        <li>
          <strong>Tensor products</strong>{" "}
          <InlineMath math="A \otimes B" /> describe how two quantum
          systems combine. Same algebra as matrices, but the dimensions
          multiply: a 2-qubit system lives in{" "}
          <InlineMath math="\mathbb{C}^2 \otimes \mathbb{C}^2 = \mathbb{C}^4" />.
          We'll meet this in the Quantum Information chapter.
        </li>
        <li>
          <strong>Basis change</strong> in QM is choosing the
          measurement basis. Famously, measuring{" "}
          <InlineMath math="|+\rangle = (|0\rangle + |1\rangle)/\sqrt 2" />{" "}
          in the computational basis gives 50/50 outcomes; in the
          Hadamard basis it gives a deterministic outcome. Same state,
          different basis, different statistics.
        </li>
        <li>
          <strong>Numerical linear algebra</strong> still matters —
          quantum simulation algorithms boil down to large matrix
          factorisations, just like classical simulation. LU and its
          cousins are the workhorses.
        </li>
      </ul>

      <p>
        Next chapter: eigenvalues. We've seen that a matrix is a
        transformation; eigenvalues identify the directions in which
        the transformation acts simplest.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: 2D linear transformation
// ════════════════════════════════════════════════════════════

function TransformWidget() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(1);

  const w = 360;
  const h = 280;
  const cx = w / 2;
  const cy = h / 2;
  const scale = 35;
  const sx = (x: number) => cx + x * scale;
  const sy = (y: number) => cy - y * scale;

  const det = a * d - b * c;

  const apply = (x: number, y: number) => ({ x: a * x + b * y, y: c * x + d * y });

  // grid lines under transform
  const lines: Array<{ x1: number; y1: number; x2: number; y2: number; v: boolean }> = [];
  const range = 4;
  for (let i = -range; i <= range; i++) {
    const p1 = apply(i, -range);
    const p2 = apply(i, range);
    lines.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, v: true });
    const p3 = apply(-range, i);
    const p4 = apply(range, i);
    lines.push({ x1: p3.x, y1: p3.y, x2: p4.x, y2: p4.y, v: false });
  }

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
            {/* original grid (faint) */}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`og-x${i}`} x1={sx(i - 5)} y1={0} x2={sx(i - 5)} y2={h} stroke="#1c1c28" strokeWidth={0.5} />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`og-y${i}`} x1={0} y1={sy(i - 4)} x2={w} y2={sy(i - 4)} stroke="#1c1c28" strokeWidth={0.5} />
            ))}

            {/* transformed grid */}
            {lines.map((l, i) => (
              <line
                key={i}
                x1={sx(l.x1)}
                y1={sy(l.y1)}
                x2={sx(l.x2)}
                y2={sy(l.y2)}
                stroke="#a78bfa"
                strokeOpacity={0.4}
                strokeWidth={0.8}
              />
            ))}

            {/* transformed unit square */}
            <polygon
              points={`${sx(0)},${sy(0)} ${sx(a)},${sy(c)} ${sx(a + b)},${sy(c + d)} ${sx(b)},${sy(d)}`}
              fill="#a78bfa"
              fillOpacity={0.2}
            />

            <line x1={0} y1={cy} x2={w} y2={cy} stroke="#2a2a37" />
            <line x1={cx} y1={0} x2={cx} y2={h} stroke="#2a2a37" />

            {/* transformed basis vectors */}
            <Arrow x1={sx(0)} y1={sy(0)} x2={sx(a)} y2={sy(c)} stroke="#fbbf24" />
            <Arrow x1={sx(0)} y1={sy(0)} x2={sx(b)} y2={sy(d)} stroke="#22d3ee" />

            <text x={sx(a) + 6} y={sy(c) - 4} fill="#fbbf24" fontSize={11}>
              A·e₁
            </text>
            <text x={sx(b) + 6} y={sy(d) - 4} fill="#22d3ee" fontSize={11}>
              A·e₂
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <SlideRow label={`a = ${a.toFixed(2)}`} value={a} min={-2} max={2} step={0.01} onChange={setA} />
          <SlideRow label={`b = ${b.toFixed(2)}`} value={b} min={-2} max={2} step={0.01} onChange={setB} />
          <SlideRow label={`c = ${c.toFixed(2)}`} value={c} min={-2} max={2} step={0.01} onChange={setC} />
          <SlideRow label={`d = ${d.toFixed(2)}`} value={d} min={-2} max={2} step={0.01} onChange={setD} />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-ink-400">
            <InlineMath math={`A = \\begin{pmatrix} ${a.toFixed(2)} & ${b.toFixed(2)} \\\\ ${c.toFixed(2)} & ${d.toFixed(2)} \\end{pmatrix}`} />
          </span>
          <span
            className={`text-xs px-2 py-1 rounded font-mono ${
              Math.abs(det) < 0.01
                ? "bg-rose-500/15 text-rose-300"
                : "bg-emerald-500/15 text-emerald-300"
            }`}
          >
            det A = {det.toFixed(3)}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Preset
            label="Rotation 30°"
            onClick={() => {
              const t = Math.PI / 6;
              setA(Math.cos(t));
              setB(-Math.sin(t));
              setC(Math.sin(t));
              setD(Math.cos(t));
            }}
          />
          <Preset label="Scale 2×" onClick={() => { setA(2); setB(0); setC(0); setD(2); }} />
          <Preset label="Shear" onClick={() => { setA(1); setB(0.7); setC(0); setD(1); }} />
          <Preset label="Reflect y=x" onClick={() => { setA(0); setB(1); setC(1); setD(0); }} />
          <Preset label="Singular" onClick={() => { setA(1); setB(2); setC(0.5); setD(1); }} />
          <Preset label="Identity" onClick={() => { setA(1); setB(0); setC(0); setD(1); }} />
        </div>
      </div>
      <figcaption>
        Yellow / cyan: where <InlineMath math="A" /> sends the standard
        basis vectors — these are exactly the columns of{" "}
        <InlineMath math="A" />. Purple shaded: the image of the unit
        square. <InlineMath math="|\det A|" /> is its area.
      </figcaption>
    </figure>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  stroke,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return null;
  const ux = dx / len;
  const uy = dy / len;
  const headLen = 8;
  const headW = 4;
  const tipBackX = x2 - ux * headLen;
  const tipBackY = y2 - uy * headLen;
  const px = -uy;
  const py = ux;
  return (
    <g stroke={stroke} fill={stroke}>
      <line x1={x1} y1={y1} x2={tipBackX} y2={tipBackY} strokeWidth={2.2} />
      <polygon
        points={`${x2},${y2} ${tipBackX + px * headW},${tipBackY + py * headW} ${tipBackX - px * headW},${tipBackY - py * headW}`}
        strokeLinejoin="round"
      />
    </g>
  );
}

function SlideRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="text-xs text-ink-400 mb-1">{label}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent-soft"
      />
    </label>
  );
}

function Preset({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg text-xs border border-ink-800 hover:border-accent-soft text-ink-300"
    >
      {label}
    </button>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "If $T$ is a linear map and $T(\\mathbf{e}_1) = (1, 2)$, $T(\\mathbf{e}_2) = (3, 4)$, what is $T((5, 6))$?",
    options: ["$(5, 6)$", "$(8, 10)$", "$(23, 34)$", "$(15, 30)$"],
    correct: 2,
    explanation:
      "By linearity, $T((5, 6)) = 5 T(\\mathbf{e}_1) + 6 T(\\mathbf{e}_2) = 5(1,2) + 6(3,4) = (5+18, 10+24) = (23, 34)$.",
  },
  {
    prompt:
      "What does $\\det A$ tell you geometrically about the linear map $A$ on $\\mathbb{R}^2$?",
    options: [
      "The angle of rotation",
      "The signed area scaling factor of the unit square",
      "The eigenvalues of $A$",
      "The trace of $A$",
    ],
    correct: 1,
    explanation:
      "$|\\det A|$ is the area of the image of the unit square; the sign tells you whether orientation is preserved (+) or reversed (−).",
  },
  {
    prompt:
      "When does $A^{-1}$ exist?",
    options: [
      "Always, for square matrices",
      "Iff $A$ is symmetric",
      "Iff $\\det A \\neq 0$",
      "Iff $A$ has all positive entries",
    ],
    correct: 2,
    explanation:
      "$A$ is invertible iff its determinant is nonzero, equivalently iff its columns are linearly independent.",
  },
  {
    prompt:
      "If $A$ is $3 \\times 4$ and $B$ is $4 \\times 5$, what is the size of $AB$?",
    options: ["$3 \\times 5$", "$4 \\times 4$", "$3 \\times 4$", "Not defined"],
    correct: 0,
    explanation:
      "Inner dimensions must agree (both 4 here, ✓), and the result has the outer dimensions: $3 \\times 5$.",
  },
  {
    prompt:
      "In LU decomposition $A = LU$, what's the main computational reason it's useful?",
    options: [
      "$L$ and $U$ are both diagonal",
      "Triangular systems can be solved with cheap forward/back substitution; only one factorisation per matrix is needed",
      "$LU$ exists only for symmetric matrices",
      "It computes the determinant",
    ],
    correct: 1,
    explanation:
      "The expensive part is finding $L$ and $U$ (one Gaussian elimination). Once you have them, solving $A\\mathbf{x} = \\mathbf{b}$ for any $\\mathbf{b}$ is fast — two triangular substitutions. Big win when many right-hand sides share the same $A$.",
  },
];
