import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function ProjectionsQrBody() {
  return (
    <>
      <p>
        Projections are the geometry of "closest point in a
        subspace." Gram–Schmidt is the explicit recipe for
        building an orthonormal basis from any starting set.
        QR is what you get when you bundle the recipe into a
        matrix decomposition. Together, these are the
        machinery that powers OLS, the Kalman filter, and
        every "fit a model to data" computation.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.06 — Lectures 15, 16, 17",
            author: "Gilbert Strang",
            duration: "~2.5h",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
            note: "15 (projections), 16 (projection matrices and least squares), 17 (orthogonal matrices and Gram-Schmidt).",
          },
          {
            title: "MML Ch 3.8",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "Orthogonal projections in tighter notation. Perfect companion before Module III's OLS chapter.",
          },
          {
            title: "Trefethen & Bau — Numerical Linear Algebra",
            author: "Trefethen, Bau",
            duration: "Reference",
            url: "https://people.maths.ox.ac.uk/trefethen/text.html",
            note: "Chapters 7–8 cover QR via Householder reflections and modified Gram-Schmidt at the right level.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Orthogonal projection</h2>

      <p>
        Given a subspace{" "}
        <InlineMath math="W \subseteq \mathbb{R}^n" /> and a
        vector{" "}
        <InlineMath math="\mathbf{b} \in \mathbb{R}^n" />, the{" "}
        <strong>projection</strong>{" "}
        <InlineMath math="\hat{\mathbf{b}} = \mathrm{proj}_W \mathbf{b}" />{" "}
        is the closest point in{" "}
        <InlineMath math="W" /> to{" "}
        <InlineMath math="\mathbf{b}" />.
      </p>

      <Callout title="Defining property">
        <InlineMath math="\hat{\mathbf{b}} \in W" />, and the
        residual{" "}
        <InlineMath math="\mathbf{b} - \hat{\mathbf{b}}" /> is{" "}
        orthogonal to every vector in{" "}
        <InlineMath math="W" />.
      </Callout>

      <p>
        That orthogonality is what makes the projection
        unique: the only point of{" "}
        <InlineMath math="W" /> for which{" "}
        <InlineMath math="\mathbf{b} - \hat{\mathbf{b}} \perp W" />.
      </p>

      <h3>Projection onto a line</h3>

      <p>
        Let <InlineMath math="W = \mathrm{span}(\mathbf{a})" />.
        Then{" "}
        <InlineMath math="\hat{\mathbf{b}} = c \mathbf{a}" /> for
        some scalar{" "}
        <InlineMath math="c" />, with{" "}
        <InlineMath math="\mathbf{a} \cdot (\mathbf{b} - c\mathbf{a}) = 0" />.
        Solve:
      </p>
      <BlockMath math="c = \frac{\mathbf{a} \cdot \mathbf{b}}{\mathbf{a} \cdot \mathbf{a}}, \qquad \hat{\mathbf{b}} = \frac{\mathbf{a}^T \mathbf{b}}{\mathbf{a}^T \mathbf{a}} \, \mathbf{a}." />

      <p>
        For unit{" "}
        <InlineMath math="\mathbf{a}" /> (
        <InlineMath math="\|\mathbf{a}\| = 1" />), this is
        the cleaner{" "}
        <InlineMath math="\hat{\mathbf{b}} = (\mathbf{a}^T \mathbf{b}) \mathbf{a}" />.
      </p>

      <h3>Projection onto a subspace</h3>

      <p>
        Let{" "}
        <InlineMath math="W = C(A)" /> for some matrix{" "}
        <InlineMath math="A \in \mathbb{R}^{n \times k}" /> with
        independent columns. The projection onto{" "}
        <InlineMath math="W" /> is
      </p>

      <Callout title="Projection formula">
        <BlockMath math="\hat{\mathbf{b}} = A (A^T A)^{-1} A^T \, \mathbf{b}." />
        The matrix{" "}
        <InlineMath math="P = A(A^T A)^{-1}A^T" /> is the{" "}
        <strong>projection matrix</strong> onto{" "}
        <InlineMath math="C(A)" />.
      </Callout>

      <p>
        Two properties characterise projection matrices:
      </p>
      <ul>
        <li>
          Idempotent:{" "}
          <InlineMath math="P^2 = P" /> (projecting twice =
          projecting once).
        </li>
        <li>
          Symmetric:{" "}
          <InlineMath math="P^T = P" /> (orthogonal projection,
          as opposed to oblique).
        </li>
      </ul>

      <h3>Decomposition into perpendicular pieces</h3>

      <p>
        Any{" "}
        <InlineMath math="\mathbf{b}" /> decomposes uniquely as
      </p>
      <BlockMath math="\mathbf{b} = \underbrace{P\mathbf{b}}_{\in W} + \underbrace{(I - P)\mathbf{b}}_{\in W^\perp}." />

      <p>
        That's the <em>orthogonal decomposition</em>. The two
        components live in orthogonal complement subspaces and
        are at right angles. Pythagoras then gives{" "}
        <InlineMath math="\|\mathbf{b}\|^2 = \|P\mathbf{b}\|^2 + \|(I-P)\mathbf{b}\|^2" />.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Why projections matter for OLS</h2>

      <p>
        Linear regression solves{" "}
        <InlineMath math="\min_{\boldsymbol\beta} \|X\boldsymbol\beta - \mathbf{y}\|^2" />.
        The minimum-norm-of-residual is achieved when{" "}
        <InlineMath math="X\boldsymbol\beta" /> is the
        projection of <InlineMath math="\mathbf{y}" /> onto{" "}
        <InlineMath math="C(X)" />:
      </p>
      <BlockMath math="X\hat{\boldsymbol\beta} = \mathrm{proj}_{C(X)} \mathbf{y} = X(X^T X)^{-1} X^T \mathbf{y}." />

      <p>
        Multiplying both sides by{" "}
        <InlineMath math="(X^T X)^{-1} X^T" />:
      </p>
      <BlockMath math="\hat{\boldsymbol\beta} = (X^T X)^{-1} X^T \mathbf{y}." />

      <p>
        The OLS normal equations <em>are</em> the projection
        formula in disguise. We'll re-derive them via calculus
        in Module III, but the geometric picture is the cleanest
        one: regression is just orthogonal projection.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Orthonormal bases</h2>

      <p>
        An <strong>orthonormal</strong> set{" "}
        <InlineMath math="\{\mathbf{q}_1, \dots, \mathbf{q}_k\}" />{" "}
        satisfies{" "}
        <InlineMath math="\mathbf{q}_i^T \mathbf{q}_j = \delta_{ij}" />:
        unit length and pairwise perpendicular. Stacked as
        columns of a matrix{" "}
        <InlineMath math="Q" />:{" "}
        <InlineMath math="Q^T Q = I" />.
      </p>

      <p>
        Why we love them:
      </p>
      <ul>
        <li>
          Coordinates are easy:{" "}
          <InlineMath math="\mathbf{v} = \sum_i (\mathbf{q}_i^T \mathbf{v}) \mathbf{q}_i" />.
          Just dot products.
        </li>
        <li>
          Projection is easy:{" "}
          <InlineMath math="P = Q Q^T" /> (when{" "}
          <InlineMath math="Q" /> is the basis of the target
          subspace).
        </li>
        <li>
          OLS becomes trivial: if{" "}
          <InlineMath math="X = Q" /> is orthonormal,{" "}
          <InlineMath math="X^T X = I" /> and{" "}
          <InlineMath math="\hat{\boldsymbol\beta} = Q^T \mathbf{y}" />.
        </li>
        <li>
          Numerical stability: orthogonal transformations
          preserve length, so they don't amplify
          floating-point errors.
        </li>
      </ul>

      <h3>Square orthogonal matrices</h3>

      <p>
        A square{" "}
        <InlineMath math="Q" /> with{" "}
        <InlineMath math="Q^T Q = I" /> is called{" "}
        <strong>orthogonal</strong> (slightly confusing
        terminology — its columns are orthonormal). It
        satisfies <InlineMath math="Q^{-1} = Q^T" /> — the
        cheapest inverse you'll ever encounter.
      </p>

      <p>
        Examples: rotation matrices, reflection matrices,
        permutation matrices. They all preserve lengths and
        angles.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Gram–Schmidt orthogonalisation</h2>

      <p>
        Given any independent set{" "}
        <InlineMath math="\{\mathbf{a}_1, \dots, \mathbf{a}_n\}" />,
        Gram–Schmidt produces an orthonormal set{" "}
        <InlineMath math="\{\mathbf{q}_1, \dots, \mathbf{q}_n\}" />{" "}
        spanning the same space. Step{" "}
        <InlineMath math="k" />:
      </p>

      <ol>
        <li>
          Start from{" "}
          <InlineMath math="\mathbf{a}_k" />.
        </li>
        <li>
          Subtract its projections onto the already-built{" "}
          <InlineMath math="\mathbf{q}_1, \dots, \mathbf{q}_{k-1}" />:
          <BlockMath math="\mathbf{u}_k = \mathbf{a}_k - \sum_{j < k} (\mathbf{q}_j^T \mathbf{a}_k) \mathbf{q}_j." />
        </li>
        <li>
          Normalise:{" "}
          <InlineMath math="\mathbf{q}_k = \mathbf{u}_k / \|\mathbf{u}_k\|" />.
        </li>
      </ol>

      <p>
        After running this through all{" "}
        <InlineMath math="\mathbf{a}_k" />, you have an
        orthonormal basis of the same span.
      </p>

      <Pitfall>
        Classical Gram–Schmidt as written is{" "}
        <em>numerically unstable</em>: floating-point round-off
        breaks orthogonality after a few steps.{" "}
        <strong>Modified Gram–Schmidt</strong> (subtract
        projections sequentially as you build up{" "}
        <InlineMath math="\mathbf{u}_k" />) is much better.
        Production code uses Householder reflections — even
        more stable.
      </Pitfall>

      <Exercise prompt="Run Gram-Schmidt on $\mathbf{a}_1 = (1, 1, 0)^T$, $\mathbf{a}_2 = (1, 0, 1)^T$.">
        <p>
          Step 1:{" "}
          <InlineMath math="\mathbf{q}_1 = \mathbf{a}_1 / \|\mathbf{a}_1\| = (1, 1, 0)^T / \sqrt 2" />.
        </p>
        <p>
          Step 2:{" "}
          <InlineMath math="\mathbf{q}_1^T \mathbf{a}_2 = 1/\sqrt 2" />,
          so{" "}
          <InlineMath math="\mathbf{u}_2 = (1, 0, 1)^T - \tfrac{1}{\sqrt 2} \cdot (1, 1, 0)^T/\sqrt 2 = (1, 0, 1)^T - (1/2, 1/2, 0)^T = (1/2, -1/2, 1)^T" />.
        </p>
        <p>
          Norm:{" "}
          <InlineMath math="\|\mathbf{u}_2\| = \sqrt{1/4 + 1/4 + 1} = \sqrt{3/2}" />.{" "}
          <InlineMath math="\mathbf{q}_2 = (1/2, -1/2, 1)^T / \sqrt{3/2}" />.
        </p>
        <p>
          Sanity check:{" "}
          <InlineMath math="\mathbf{q}_1 \cdot \mathbf{q}_2 = 0" />.{" "}
          ✓
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · QR decomposition</h2>

      <p>
        Bundling Gram–Schmidt's bookkeeping into a matrix
        equation gives:
      </p>

      <Callout title="QR decomposition">
        Any{" "}
        <InlineMath math="A \in \mathbb{R}^{m \times n}" /> with
        independent columns admits
        <BlockMath math="A = Q R" />
        where{" "}
        <InlineMath math="Q \in \mathbb{R}^{m \times n}" /> has
        orthonormal columns and{" "}
        <InlineMath math="R \in \mathbb{R}^{n \times n}" /> is
        upper-triangular.
      </Callout>

      <p>
        Why upper-triangular: at step{" "}
        <InlineMath math="k" /> in Gram–Schmidt,{" "}
        <InlineMath math="\mathbf{a}_k" /> is a linear
        combination of{" "}
        <InlineMath math="\mathbf{q}_1, \dots, \mathbf{q}_k" />{" "}
        only — never of later{" "}
        <InlineMath math="\mathbf{q}_j" /> (which haven't been
        built yet). The coefficients form the upper-triangular{" "}
        <InlineMath math="R" />.
      </p>

      <h3>QR for least squares</h3>

      <p>
        Substitute{" "}
        <InlineMath math="X = QR" /> into the OLS formula:
      </p>
      <BlockMath math="\hat{\boldsymbol\beta} = (X^T X)^{-1} X^T \mathbf{y} = (R^T Q^T Q R)^{-1} R^T Q^T \mathbf{y} = R^{-1} Q^T \mathbf{y}." />

      <p>
        So we solve{" "}
        <InlineMath math="R \boldsymbol\beta = Q^T \mathbf{y}" />{" "}
        — a triangular system —{" "}
        <em>without ever forming</em>{" "}
        <InlineMath math="X^T X" />. This is the modern,
        numerically stable way to solve OLS. It's what{" "}
        <code>numpy.linalg.lstsq</code> and statistical
        software use under the hood.
      </p>

      <h3>QR algorithms in software</h3>

      <p>
        Three production algorithms compute QR:
      </p>
      <ul>
        <li>
          <strong>Modified Gram–Schmidt</strong>: clear and
          decent. Works well in practice for moderate-size
          problems.
        </li>
        <li>
          <strong>Householder reflections</strong>: most
          common. Each Householder reflection zeros out a
          subdiagonal column. Numerically excellent.
        </li>
        <li>
          <strong>Givens rotations</strong>: zero one entry at
          a time. Useful for sparse matrices and updating
          existing factorisations.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>OLS is projection</strong>. The geometric
          picture eliminates a lot of bookkeeping. Once you
          see it, the calculus derivation in Module III is just
          confirmation.
        </li>
        <li>
          <strong>Numerical OLS</strong>. QR (or SVD) is the
          stable way to solve regression. Forming{" "}
          <InlineMath math="X^T X" /> can lose half your
          digits to round-off; QR avoids it entirely.
        </li>
        <li>
          <strong>Kalman filter</strong>. The "innovation"
          (residual after projecting state estimate forward)
          is the orthogonal complement, exactly the geometry
          we developed here.
        </li>
        <li>
          <strong>Decorrelation &amp; whitening</strong>. Apply{" "}
          <InlineMath math="Q^T" /> to your features and
          they're orthonormal — independent in a
          uniform-scaling sense. Sometimes more useful than
          PCA's max-variance ordering.
        </li>
        <li>
          <strong>SVD</strong>. The connection: SVD is a
          two-sided generalisation, with orthonormal column
          bases on both sides. Building intuition with QR is
          exactly the right warm-up.
        </li>
        <li>
          <strong>Microstructure preview</strong>. When fitting
          impact models or Hawkes kernels with regularisation,
          QR-based solvers avoid ill-conditioning when feature
          columns (lagged returns, sign indicators) become
          near-collinear.
        </li>
      </ul>

      <p>
        Module II is now complete. We have the spectral toolbox
        (eigendecomposition, SVD) and the geometric toolbox
        (projection, QR). Module III turns these into actual
        machine-learning machinery: gradients, matrix calculus,
        and the OLS derivation.
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
      "The orthogonal projection of $\\mathbf{b}$ onto $C(A)$ is…",
    options: [
      "$A^T \\mathbf{b}$",
      "$A (A^T A)^{-1} A^T \\mathbf{b}$",
      "$A \\mathbf{b}$",
      "$(A^T A)^{-1} \\mathbf{b}$",
    ],
    correct: 1,
    explanation:
      "The projection matrix is $P = A(A^T A)^{-1} A^T$. Defining property: $\\mathbf{b} - P\\mathbf{b} \\perp C(A)$. Idempotent ($P^2 = P$) and symmetric.",
  },
  {
    prompt:
      "An orthogonal matrix $Q$ (real, square) satisfies $Q^T Q = I$. Therefore…",
    options: [
      "$Q^{-1} = Q$",
      "$Q^{-1} = Q^T$",
      "$Q = I$",
      "$\\det Q = 0$",
    ],
    correct: 1,
    explanation:
      "$Q^T Q = I$ means $Q^T$ is the left-inverse, and for square matrices, that's also the right-inverse. So $Q^{-1} = Q^T$ — the cheapest inverse you'll ever compute.",
  },
  {
    prompt:
      "Why is forming $X^T X$ explicitly a bad idea for OLS?",
    options: [
      "it's slow",
      "it squares the condition number, losing numerical accuracy",
      "it gives the wrong answer",
      "it requires too much memory",
    ],
    correct: 1,
    explanation:
      "$\\kappa(X^T X) = \\kappa(X)^2$. With double precision and $\\kappa(X) \\sim 10^8$, $X^T X$ is at the edge of numerical breakdown. QR keeps things at $\\kappa(X)$.",
  },
  {
    prompt:
      "QR decomposition writes $A = QR$ with…",
    options: [
      "$Q$ orthonormal columns and $R$ upper-triangular",
      "$Q$ diagonal and $R$ orthogonal",
      "both upper-triangular",
      "$Q^2 = R$",
    ],
    correct: 0,
    explanation:
      "$Q$'s columns are an orthonormal basis for $C(A)$ (Gram-Schmidt of $A$'s columns). $R$ encodes the coefficients — upper-triangular because the $k$-th column of $A$ is a combination of $\\mathbf{q}_1, \\dots, \\mathbf{q}_k$ only.",
  },
  {
    prompt:
      "Geometrically, OLS is…",
    options: [
      "an iterative gradient descent",
      "the orthogonal projection of $\\mathbf{y}$ onto $C(X)$",
      "a Bayesian posterior",
      "the Cholesky factor of $X^T X$",
    ],
    correct: 1,
    explanation:
      "The closest vector to $\\mathbf{y}$ in $C(X)$ is its orthogonal projection. The OLS normal equations are exactly the projection formula. The probabilistic (Gaussian-noise) and calculus derivations confirm this.",
  },
];
