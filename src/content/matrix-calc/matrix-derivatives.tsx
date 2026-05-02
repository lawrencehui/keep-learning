import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function MatrixDerivativesBody() {
  return (
    <>
      <p>
        Most ML and stats derivations involve gradients of
        forms like{" "}
        <InlineMath math="\mathbf{a}^T \mathbf{x}" />,{" "}
        <InlineMath math="\mathbf{x}^T A \mathbf{x}" />,{" "}
        <InlineMath math="\|A\boldsymbol\beta - \mathbf{y}\|^2" />,{" "}
        <InlineMath math="\log \det A" />. Expanding into
        components every time is unbearable; the rest of the
        world has tabulated the answers. This chapter
        introduces the conventions, the building blocks, and
        the fluency you need so that next chapter's OLS
        derivation is one line.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MML Ch 5.5",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "Gradients of matrices in the same notation we use here.",
          },
          {
            title: "The Matrix Cookbook",
            author: "Petersen & Pedersen",
            duration: "Reference (PDF)",
            url: "https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf",
            note: "The bible of matrix-derivative identities. Bookmark it. Don't read top to bottom — use it as a lookup.",
          },
          {
            title: "3Blue1Brown — Backpropagation calculus (NN 4)",
            author: "Grant Sanderson",
            duration: "~10 min",
            url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
            note: "What the chain rule actually does in a neural network.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The layout problem</h2>

      <p>
        Before deriving anything, pick a convention. There are
        two camps:
      </p>

      <ul>
        <li>
          <strong>Numerator layout</strong>: the gradient
          comes out as a row vector,{" "}
          <InlineMath math="\partial f/\partial \mathbf{x} \in \mathbb{R}^{1 \times n}" />.
          Compatible with treating Jacobians as the "shape of
          the output": a scalar function gives a row, a vector
          function gives a "row of rows" = matrix.
        </li>
        <li>
          <strong>Denominator layout</strong>: the gradient is
          a column,{" "}
          <InlineMath math="\nabla f \in \mathbb{R}^n" />.
          Compatible with treating gradients as members of the
          original input space.
        </li>
      </ul>

      <Callout title="Our convention">
        We use <strong>denominator layout</strong>:
        gradients of scalars are columns. So{" "}
        <InlineMath math="\nabla f \in \mathbb{R}^n" />, and
        for vector-valued{" "}
        <InlineMath math="\mathbf{f}" />, the Jacobian is
        <InlineMath math="J \in \mathbb{R}^{m \times n}" /> with
        row <InlineMath math="i" /> being{" "}
        <InlineMath math="(\nabla f_i)^T" />. This is what MML,
        Strang, and most ML literature use.
      </Callout>

      <Pitfall>
        Mixing conventions across sources is the easiest way
        to get a transposed result. When you see a derivation
        that looks "wrong by a transpose", the most common
        explanation is that the reference uses numerator
        layout. Quick fix: transpose the answer.
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Gradients of common scalar functions</h2>

      <p>
        Below: scalar functions of vectors{" "}
        <InlineMath math="\mathbf{x} \in \mathbb{R}^n" />, with{" "}
        <InlineMath math="\mathbf{a} \in \mathbb{R}^n" /> and{" "}
        <InlineMath math="A \in \mathbb{R}^{n \times n}" />{" "}
        constants.
      </p>

      <Callout title="Five identities to memorise">
        <BlockMath math="\nabla_\mathbf{x} (\mathbf{a}^T \mathbf{x}) = \mathbf{a}." />
        <BlockMath math="\nabla_\mathbf{x} (\mathbf{x}^T \mathbf{x}) = 2 \mathbf{x}." />
        <BlockMath math="\nabla_\mathbf{x} (\mathbf{x}^T A \mathbf{x}) = (A + A^T) \mathbf{x}, \quad \text{or } 2 A \mathbf{x} \text{ if } A \text{ is symmetric}." />
        <BlockMath math="\nabla_\mathbf{x} \|\mathbf{x}\|^2 = 2\mathbf{x}, \quad \nabla_\mathbf{x} \|A\mathbf{x} - \mathbf{b}\|^2 = 2 A^T(A\mathbf{x} - \mathbf{b})." />
        <BlockMath math="\nabla_\mathbf{x} (\mathbf{a}^T \mathbf{x} \mathbf{x}^T \mathbf{b}) = \mathbf{a}\mathbf{b}^T \mathbf{x} + \mathbf{b}\mathbf{a}^T \mathbf{x}." />
      </Callout>

      <h3>
        Why <InlineMath math="\nabla(\mathbf{a}^T \mathbf{x}) = \mathbf{a}" />
      </h3>

      <p>
        Write{" "}
        <InlineMath math="\mathbf{a}^T \mathbf{x} = \sum_i a_i x_i" />.
        Each partial:{" "}
        <InlineMath math="\partial / \partial x_j (\sum_i a_i x_i) = a_j" />.
        So the gradient is{" "}
        <InlineMath math="\mathbf{a}" />. Done.
      </p>

      <h3>
        Why{" "}
        <InlineMath math="\nabla(\mathbf{x}^T A \mathbf{x}) = (A + A^T)\mathbf{x}" />
      </h3>

      <p>
        Expand:{" "}
        <InlineMath math="\mathbf{x}^T A \mathbf{x} = \sum_{i,j} A_{ij} x_i x_j" />.
        Partial with respect to{" "}
        <InlineMath math="x_k" />:
      </p>
      <BlockMath math="\frac{\partial}{\partial x_k} \sum_{i,j} A_{ij} x_i x_j = \sum_j A_{kj} x_j + \sum_i A_{ik} x_i = (A\mathbf{x})_k + (A^T \mathbf{x})_k." />

      <p>
        Stack into a vector: gradient is{" "}
        <InlineMath math="(A + A^T) \mathbf{x}" />. When{" "}
        <InlineMath math="A" /> is symmetric, this is just{" "}
        <InlineMath math="2 A \mathbf{x}" />.
      </p>

      <Exercise prompt="Derive $\nabla \|A\mathbf{x} - \mathbf{b}\|^2$ from scratch.">
        <p>
          Expand:{" "}
          <InlineMath math="\|A\mathbf{x} - \mathbf{b}\|^2 = (A\mathbf{x} - \mathbf{b})^T(A\mathbf{x} - \mathbf{b}) = \mathbf{x}^T A^T A \mathbf{x} - 2 \mathbf{b}^T A \mathbf{x} + \mathbf{b}^T \mathbf{b}" />.
        </p>
        <p>
          Take gradients term by term:
        </p>
        <ul>
          <li>
            <InlineMath math="\nabla(\mathbf{x}^T A^T A \mathbf{x}) = 2 A^T A \mathbf{x}" />{" "}
            (since <InlineMath math="A^T A" /> is symmetric).
          </li>
          <li>
            <InlineMath math="\nabla(-2 \mathbf{b}^T A \mathbf{x}) = -2 A^T \mathbf{b}" />{" "}
            (using the linear identity with{" "}
            <InlineMath math="\mathbf{a} = -2 A^T \mathbf{b}" />
            ).
          </li>
          <li>
            <InlineMath math="\nabla \mathbf{b}^T \mathbf{b} = \mathbf{0}" />.
          </li>
        </ul>
        <p>
          Sum:{" "}
          <InlineMath math="\nabla \|A\mathbf{x} - \mathbf{b}\|^2 = 2 A^T A \mathbf{x} - 2 A^T \mathbf{b} = 2 A^T(A\mathbf{x} - \mathbf{b})" />.
          ✓
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Derivatives with respect to a matrix</h2>

      <p>
        Sometimes you need{" "}
        <InlineMath math="\partial f / \partial A" /> for a
        scalar function and a matrix variable. The result is a
        matrix of the same shape as{" "}
        <InlineMath math="A" />, with entries{" "}
        <InlineMath math="(\partial f/\partial A)_{ij} = \partial f / \partial A_{ij}" />.
      </p>

      <Callout title="Useful matrix-derivative identities">
        <BlockMath math="\frac{\partial}{\partial A} \mathrm{tr}(AB) = B^T." />
        <BlockMath math="\frac{\partial}{\partial A} \mathrm{tr}(A^T B) = B." />
        <BlockMath math="\frac{\partial}{\partial A} \log \det A = (A^{-1})^T \quad \text{(} A \text{ invertible)}." />
        <BlockMath math="\frac{\partial}{\partial A} \mathrm{tr}(A^{-1} B) = -(A^{-1})^T B^T (A^{-1})^T." />
      </Callout>

      <p>
        These come up in:
      </p>
      <ul>
        <li>
          Maximum-likelihood estimation of a covariance matrix
          (the log-det term).
        </li>
        <li>
          Bayesian linear regression (deriving the posterior
          covariance).
        </li>
        <li>
          Gaussian process kernels and their hyperparameters.
        </li>
        <li>
          The natural gradient (Fisher-information-weighted
          updates).
        </li>
      </ul>

      <p>
        Don't memorise these — keep the Cookbook open while
        you derive. Recognising the shape (matrix-valued
        gradient of a scalar) is the only skill that matters.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · The chain rule, fully matrix-aware</h2>

      <p>
        Re-state from last chapter:
      </p>
      <BlockMath math="\frac{\partial L}{\partial \mathbf{x}} = J^T \frac{\partial L}{\partial \mathbf{y}}, \quad \mathbf{y} = \mathbf{f}(\mathbf{x})." />

      <p>
        Here{" "}
        <InlineMath math="L" /> is a scalar (a loss), and we
        use denominator layout so all gradients are columns.{" "}
        <InlineMath math="J" /> is the Jacobian of{" "}
        <InlineMath math="\mathbf{y}" /> with respect to{" "}
        <InlineMath math="\mathbf{x}" /> (an{" "}
        <InlineMath math="m \times n" /> matrix). Note the{" "}
        <strong>transpose</strong>: in denominator layout, the
        chain rule pre-multiplies by{" "}
        <InlineMath math="J^T" />.
      </p>

      <h3>Why the transpose?</h3>

      <p>
        Think of{" "}
        <InlineMath math="L : \mathbb{R}^n \to \mathbb{R}" /> as
        the composition{" "}
        <InlineMath math="L = \ell \circ \mathbf{f}" /> with{" "}
        <InlineMath math="\ell : \mathbb{R}^m \to \mathbb{R}" />.
        Numerator-layout chain rule:
      </p>
      <BlockMath math="\underbrace{\frac{\partial L}{\partial \mathbf{x}}}_{1 \times n} = \underbrace{\frac{\partial \ell}{\partial \mathbf{y}}}_{1 \times m} \, \underbrace{\frac{\partial \mathbf{y}}{\partial \mathbf{x}}}_{m \times n}." />

      <p>
        Transposing both sides to convert to denominator
        layout:
      </p>
      <BlockMath math="\underbrace{\nabla_\mathbf{x} L}_{n \times 1} = \underbrace{J^T}_{n \times m} \, \underbrace{\nabla_\mathbf{y} \ell}_{m \times 1}." />

      <p>
        Same identity, just laid out as columns. The
        underlying geometry (gradients propagate backward
        through Jacobians) is the same.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Backpropagation in one line</h2>

      <p>
        A neural network with{" "}
        <InlineMath math="L" /> layers can be written as a
        chain
      </p>
      <BlockMath math="\mathbf{x}^{(L)} = f_L(f_{L-1}(\dots f_1(\mathbf{x}^{(0)}; \theta_1) \dots; \theta_{L-1}); \theta_L)" />

      <p>
        with parameters{" "}
        <InlineMath math="\theta_1, \dots, \theta_L" /> and
        loss <InlineMath math="\ell(\mathbf{x}^{(L)})" />. The
        gradient with respect to{" "}
        <InlineMath math="\theta_k" />, by the chain rule,
        is
      </p>
      <BlockMath math="\nabla_{\theta_k} \ell = J_k^T \, J_{k+1}^T \, \cdots \, J_L^T \, \nabla \ell" />

      <p>
        — a product of layer Jacobians, applied right-to-left,
        starting from the loss gradient. The "backward pass"
        in backprop is exactly this product, computed once
        for the whole network. The clever trick (caching
        intermediate values during the forward pass) is what
        makes it efficient.
      </p>

      <Pitfall>
        Reading research papers, you'll often see numerator
        layout used because the chain rule "flows" left-to-
        right without transposes. Both layouts give the same
        answer, but every transpose is a chance to introduce a
        sign error. Pick one, stick with it.
      </Pitfall>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Worked examples</h2>

      <h3>OLS gradient</h3>

      <p>
        Loss:{" "}
        <InlineMath math="L(\boldsymbol\beta) = \tfrac{1}{2} \|\mathbf{y} - X\boldsymbol\beta\|^2" />.
        From Part 2 (with{" "}
        <InlineMath math="\boldsymbol\beta" /> playing the role
        of <InlineMath math="\mathbf{x}" />):
      </p>
      <BlockMath math="\nabla_{\boldsymbol\beta} L = -X^T(\mathbf{y} - X\boldsymbol\beta) = X^T X \boldsymbol\beta - X^T \mathbf{y}." />

      <p>
        Setting this to zero gives the normal equations. Next
        chapter does the full story.
      </p>

      <h3>Ridge gradient</h3>

      <p>
        Add an L2 penalty:{" "}
        <InlineMath math="L = \tfrac{1}{2} \|\mathbf{y} - X\boldsymbol\beta\|^2 + \tfrac{\lambda}{2} \|\boldsymbol\beta\|^2" />.
        Gradient:
      </p>
      <BlockMath math="\nabla L = X^T X \boldsymbol\beta - X^T \mathbf{y} + \lambda \boldsymbol\beta = (X^T X + \lambda I)\boldsymbol\beta - X^T \mathbf{y}." />

      <p>
        Setting to zero:{" "}
        <InlineMath math="\hat{\boldsymbol\beta} = (X^T X + \lambda I)^{-1} X^T \mathbf{y}" />.
        The <InlineMath math="\lambda I" /> shifts every
        eigenvalue of{" "}
        <InlineMath math="X^T X" /> up by{" "}
        <InlineMath math="\lambda" />, killing the
        ill-conditioning we worried about in Module II's SVD
        chapter.
      </p>

      <h3>Logistic regression NLL gradient</h3>

      <p>
        Loss:{" "}
        <InlineMath math="L = -\sum_i [y_i \log \sigma(\mathbf{x}_i^T \mathbf{w}) + (1 - y_i) \log(1 - \sigma(\mathbf{x}_i^T \mathbf{w}))]" />.
        After some chain-rule work — try this on paper, it's
        an excellent exercise — the gradient takes a
        beautifully clean form:
      </p>
      <BlockMath math="\nabla_\mathbf{w} L = \sum_i (\sigma(\mathbf{x}_i^T \mathbf{w}) - y_i) \mathbf{x}_i = X^T (\hat{\mathbf{p}} - \mathbf{y})" />

      <p>
        — the same structure as OLS, but with predictions{" "}
        <InlineMath math="\hat{\mathbf{p}}" /> instead of{" "}
        <InlineMath math="X\boldsymbol\beta" />. Module VI will
        revisit this.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Closed-form OLS</strong>: one line of matrix
          calculus → normal equations. Without these
          identities, you'd be expanding into components for
          every model.
        </li>
        <li>
          <strong>Gradient-based ML</strong>: every
          autodiff/backprop framework implements the
          identities above (and more). Knowing them by hand
          lets you debug derivative bugs and design custom
          loss functions.
        </li>
        <li>
          <strong>Statistical inference</strong>: MLE for
          multivariate Gaussians (Module V), Fisher information
          matrices (next module), Bayesian-linear-regression
          posteriors — all involve matrix derivatives.
        </li>
        <li>
          <strong>Microstructure preview</strong>: Almgren–
          Chriss optimal execution sets up a quadratic
          objective in the trade trajectory, and
          minimising it is one matrix-calc identity away from
          the classical schedule.
        </li>
      </ul>

      <p>
        Next chapter: bring everything together — vectors,
        spaces, projections, eigendecompositions, gradients —
        and derive OLS from three independent angles. By the
        end you'll see linear regression as the same theorem
        in three different costumes.
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
      "In denominator layout, $\\nabla_\\mathbf{x}(\\mathbf{a}^T \\mathbf{x})$ is…",
    options: [
      "$\\mathbf{a}^T$ (a row)",
      "$\\mathbf{a}$ (a column)",
      "0",
      "$\\mathbf{x}^T \\mathbf{a}$",
    ],
    correct: 1,
    explanation:
      "Each partial $\\partial(\\sum_i a_i x_i)/\\partial x_j = a_j$. Stacked into a column gives $\\mathbf{a}$ in denominator layout. Numerator layout would give the row $\\mathbf{a}^T$.",
  },
  {
    prompt:
      "$\\nabla_\\mathbf{x} (\\mathbf{x}^T A \\mathbf{x}) = ?$",
    options: [
      "$A \\mathbf{x}$",
      "$(A + A^T)\\mathbf{x}$",
      "$2 \\mathbf{x}$",
      "$A^T A \\mathbf{x}$",
    ],
    correct: 1,
    explanation:
      "Two terms, one from differentiating each occurrence of $\\mathbf{x}$. When $A$ is symmetric, $(A + A^T)\\mathbf{x} = 2A\\mathbf{x}$ — the form most often used in ML where $A$ is a covariance or Hessian.",
  },
  {
    prompt:
      "$\\nabla \\|A\\mathbf{x} - \\mathbf{b}\\|^2 = ?$",
    options: [
      "$A\\mathbf{x} - \\mathbf{b}$",
      "$A^T(A\\mathbf{x} - \\mathbf{b})$",
      "$2 A^T(A\\mathbf{x} - \\mathbf{b})$",
      "$2 A(A\\mathbf{x} - \\mathbf{b})$",
    ],
    correct: 2,
    explanation:
      "Expand the quadratic, take gradients term by term, sum. Setting this to zero gives the OLS normal equations. The factor of 2 is sometimes absorbed by a $\\tfrac{1}{2}$ in the loss.",
  },
  {
    prompt:
      "$\\partial / \\partial A \\, [\\log \\det A] = ?$",
    options: [
      "$A$",
      "$\\det(A) \\cdot I$",
      "$(A^{-1})^T$",
      "0",
    ],
    correct: 2,
    explanation:
      "Famous identity, used in MLE for Gaussian covariances and in Bayesian linear regression. Looks magical but pops out from a determinant expansion + cofactor formula.",
  },
  {
    prompt:
      "Why is denominator-layout chain rule $\\nabla_\\mathbf{x} L = J^T \\nabla_\\mathbf{y} L$?",
    options: [
      "It's an arbitrary convention",
      "Because numerator-layout chain rule is $\\partial L / \\partial \\mathbf{x} = (\\partial L / \\partial \\mathbf{y}) (\\partial \\mathbf{y}/\\partial \\mathbf{x})$, and transposing it converts to denominator layout — picking up $J^T$",
      "Because gradients are matrices",
      "Because $L$ is a vector",
    ],
    correct: 1,
    explanation:
      "Numerator layout has the chain rule flow left-to-right (matrix multiplication of Jacobians). Denominator layout transposes everything — including the chain rule — which is why the Jacobian appears transposed.",
  },
];
