import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function GradientsBody() {
  return (
    <>
      <p>
        Multivariable calculus is the language of optimisation,
        which is the language of machine learning. Once a
        loss function depends on many parameters, "the
        derivative" is no longer a single number — it's a{" "}
        <em>vector</em> (the gradient) or a{" "}
        <em>matrix</em> (the Jacobian) or even a{" "}
        <em>tensor</em> (the Hessian). This chapter develops
        the geometric and algebraic vocabulary to make the
        rest of the pathway feel obvious.
      </p>
      <p>
        Two ideas matter most: the gradient is the direction
        of steepest ascent, and the Jacobian is the linear map
        that best approximates a vector-valued function near a
        point. Everything in optimisation flows from these
        two facts.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MML Ch 5",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading (~3h)",
            url: "https://mml-book.com/",
            note: "The cleanest single source for ML-flavoured matrix calculus. Read the whole chapter once.",
          },
          {
            title: "MIT 18.02SC — Multivariable Calculus",
            author: "MIT OCW",
            duration: "~25h (selected)",
            url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
            note: "Reference. Lectures 8-15 cover gradients, partial derivatives, and second-order behaviour.",
          },
          {
            title: "3Blue1Brown — Multivariable Calculus",
            author: "Khan Academy / Grant Sanderson",
            duration: "~3h playlist",
            url: "https://www.khanacademy.org/math/multivariable-calculus",
            note: "Geometric intuition for partials, gradients, and directional derivatives.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Partial derivatives</h2>

      <p>
        For a function{" "}
        <InlineMath math="f : \mathbb{R}^n \to \mathbb{R}" />,
        the <strong>partial derivative</strong>{" "}
        <InlineMath math="\partial f / \partial x_i" /> is the
        ordinary 1-D derivative obtained by treating every
        other variable as fixed:
      </p>
      <BlockMath math="\frac{\partial f}{\partial x_i}(\mathbf{x}) = \lim_{h \to 0} \frac{f(\mathbf{x} + h \mathbf{e}_i) - f(\mathbf{x})}{h}." />

      <p>
        Geometrically: slice the surface{" "}
        <InlineMath math="f(\mathbf{x})" /> with a 2-D plane
        parallel to the{" "}
        <InlineMath math="x_i" />–axis through your point, and
        the partial is the slope of that slice.
      </p>

      <p>
        Each partial captures behaviour along one coordinate
        direction — collectively, they tell you everything
        about <em>linear</em> behaviour at the point.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The gradient</h2>

      <Callout title="Definition · Gradient">
        Stack the partials into a column vector:
        <BlockMath math="\nabla f(\mathbf{x}) = \begin{pmatrix} \partial f / \partial x_1 \\ \vdots \\ \partial f / \partial x_n \end{pmatrix}." />
      </Callout>

      <p>
        Two key facts about the gradient:
      </p>

      <h3>1 · Steepest ascent</h3>

      <p>
        The directional derivative of{" "}
        <InlineMath math="f" /> in unit direction{" "}
        <InlineMath math="\mathbf{u}" /> is{" "}
        <InlineMath math="\mathbf{u}^T \nabla f" />. By
        Cauchy–Schwarz, this is maximised when{" "}
        <InlineMath math="\mathbf{u} = \nabla f / \|\nabla f\|" />.
      </p>

      <Callout title="Steepest ascent">
        At any point,{" "}
        <InlineMath math="\nabla f" /> points in the direction
        of fastest increase, and{" "}
        <InlineMath math="\|\nabla f\|" /> is the rate of
        increase in that direction. Pointing the opposite way
        gives steepest descent.
      </Callout>

      <p>
        That last fact is why{" "}
        <strong>gradient descent</strong> works:{" "}
        <InlineMath math="\mathbf{x}_{k+1} = \mathbf{x}_k - \eta \nabla f(\mathbf{x}_k)" />{" "}
        moves opposite the gradient, which is locally the
        fastest way down.
      </p>

      <h3>2 · Orthogonal to level sets</h3>

      <p>
        The level set{" "}
        <InlineMath math="\{\mathbf{x} : f(\mathbf{x}) = c\}" /> is
        a surface (or curve in 2-D). Walk along it, and{" "}
        <InlineMath math="f" /> doesn't change. Take the
        derivative of{" "}
        <InlineMath math="f(\mathbf{x}(t)) = c" /> via chain
        rule:
      </p>
      <BlockMath math="\nabla f \cdot \dot{\mathbf{x}} = 0," />

      <p>
        so the gradient is perpendicular to every tangent
        direction along the level set — i.e., normal to the
        level set. Useful for visualising contours.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · The Jacobian</h2>

      <p>
        For a vector-valued function{" "}
        <InlineMath math="\mathbf{f} : \mathbb{R}^n \to \mathbb{R}^m" />{" "}
        with components{" "}
        <InlineMath math="\mathbf{f} = (f_1, \dots, f_m)^T" />,
        the <strong>Jacobian matrix</strong> is{" "}
        <InlineMath math="m \times n" />:
      </p>
      <BlockMath math="J = \frac{\partial \mathbf{f}}{\partial \mathbf{x}} = \begin{pmatrix} \partial f_1/\partial x_1 & \cdots & \partial f_1/\partial x_n \\ \vdots & & \vdots \\ \partial f_m/\partial x_1 & \cdots & \partial f_m/\partial x_n \end{pmatrix}." />

      <p>
        Row <InlineMath math="i" /> is{" "}
        <InlineMath math="(\nabla f_i)^T" />. Column{" "}
        <InlineMath math="j" /> is{" "}
        <InlineMath math="\partial \mathbf{f}/\partial x_j" />,
        the way the whole vector{" "}
        <InlineMath math="\mathbf{f}" /> changes as you nudge{" "}
        <InlineMath math="x_j" />.
      </p>

      <h3>The Jacobian linearises</h3>

      <p>
        For small{" "}
        <InlineMath math="\Delta\mathbf{x}" />:
      </p>
      <BlockMath math="\mathbf{f}(\mathbf{x} + \Delta\mathbf{x}) \approx \mathbf{f}(\mathbf{x}) + J(\mathbf{x}) \, \Delta\mathbf{x}." />

      <p>
        The Jacobian is the linear map that{" "}
        <em>best approximates</em>{" "}
        <InlineMath math="\mathbf{f}" /> near{" "}
        <InlineMath math="\mathbf{x}" />. It generalises the
        ordinary derivative ("slope") from 1-D to multi-D.
        Linear maps are familiar — that's why this
        approximation is so useful.
      </p>

      <h3>Special case: scalar function</h3>

      <p>
        When <InlineMath math="m = 1" />, the Jacobian is a row
        vector{" "}
        <InlineMath math="\nabla f^T" />. This is also called
        "the gradient as a row" depending on layout convention
        (next chapter).
      </p>

      <Pitfall>
        Be careful with notation. Some textbooks write{" "}
        <InlineMath math="\partial \mathbf{f}/\partial \mathbf{x}" />{" "}
        as a column-of-rows (Jacobian); others as a
        row-of-columns (the transpose). Pick a convention and
        stick with it. We use{" "}
        <em>Jacobian = m × n</em> with row{" "}
        <InlineMath math="i" /> being the gradient of{" "}
        <InlineMath math="f_i" />.
      </Pitfall>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · The chain rule (vector form)</h2>

      <p>
        For composed functions{" "}
        <InlineMath math="\mathbf{h}(\mathbf{x}) = \mathbf{f}(\mathbf{g}(\mathbf{x}))" />:
      </p>
      <BlockMath math="J_\mathbf{h}(\mathbf{x}) = J_\mathbf{f}(\mathbf{g}(\mathbf{x})) \, J_\mathbf{g}(\mathbf{x})." />

      <p>
        Function composition becomes{" "}
        <em>matrix multiplication of Jacobians</em>. The order
        is the same as the function composition:{" "}
        <InlineMath math="\mathbf{f}" /> on the left,{" "}
        <InlineMath math="\mathbf{g}" /> on the right.
      </p>

      <p>
        This is the backbone of backpropagation: a neural
        network is a chain{" "}
        <InlineMath math="\ell \circ f_L \circ f_{L-1} \circ \dots \circ f_1" />,
        and gradient computation is just the product of
        Jacobians from output back to input.
      </p>

      <Exercise prompt="Compute the gradient of $f(\mathbf{x}) = \|\mathbf{x}\|^2 = \sum x_i^2$ via the chain rule.">
        <p>
          Direct: each partial is{" "}
          <InlineMath math="\partial f / \partial x_i = 2 x_i" />,
          so{" "}
          <InlineMath math="\nabla f = 2\mathbf{x}" />.
        </p>
        <p>
          Chain rule: write{" "}
          <InlineMath math="f = g(\mathbf{x}) = \mathbf{x}^T \mathbf{x}" />.
          Treat as{" "}
          <InlineMath math="g = h(\mathbf{u}, \mathbf{v}) = \mathbf{u}^T \mathbf{v}" />{" "}
          with{" "}
          <InlineMath math="\mathbf{u} = \mathbf{v} = \mathbf{x}" />.
          By the product rule for inner products:
          <InlineMath math="\nabla(\mathbf{x}^T \mathbf{x}) = 2\mathbf{x}" />.
          Same answer.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · The Hessian</h2>

      <Callout title="Definition · Hessian">
        For a scalar{" "}
        <InlineMath math="f : \mathbb{R}^n \to \mathbb{R}" />,
        the Hessian is the{" "}
        <InlineMath math="n \times n" /> matrix of second
        partials:
        <BlockMath math="H_{ij} = \frac{\partial^2 f}{\partial x_i \partial x_j}." />
        Equivalently:{" "}
        <InlineMath math="H = \nabla(\nabla f)" />, the Jacobian
        of the gradient.
      </Callout>

      <p>
        For smooth{" "}
        <InlineMath math="f" /> (twice continuously
        differentiable), Clairaut's theorem says mixed partials
        commute:{" "}
        <InlineMath math="\partial^2 f / (\partial x_i \partial x_j) = \partial^2 f / (\partial x_j \partial x_i)" />.
        So the Hessian is <strong>symmetric</strong>.
      </p>

      <h3>Second-order Taylor</h3>

      <p>
        Expanding{" "}
        <InlineMath math="f" /> around{" "}
        <InlineMath math="\mathbf{x}" />:
      </p>
      <BlockMath math="f(\mathbf{x} + \Delta) \approx f(\mathbf{x}) + \nabla f(\mathbf{x})^T \Delta + \tfrac{1}{2} \Delta^T H(\mathbf{x}) \Delta." />

      <p>
        This is the multivariate version of{" "}
        <InlineMath math="f(x_0 + h) \approx f(x_0) + f'(x_0) h + \tfrac{1}{2} f''(x_0) h^2" />.
        The Hessian plays the role of the second derivative.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Critical points and the second-order test</h2>

      <p>
        A <strong>critical point</strong> of{" "}
        <InlineMath math="f" /> is one where{" "}
        <InlineMath math="\nabla f = \mathbf{0}" />. Whether
        it's a min, max, or saddle depends on the Hessian's
        eigenvalues.
      </p>

      <Callout title="Second-order test">
        At a critical point{" "}
        <InlineMath math="\mathbf{x}^*" />:
        <ul>
          <li>
            <InlineMath math="H(\mathbf{x}^*)" /> positive
            definite ⇒ strict local{" "}
            <strong>minimum</strong>.
          </li>
          <li>
            <InlineMath math="H(\mathbf{x}^*)" /> negative
            definite ⇒ strict local{" "}
            <strong>maximum</strong>.
          </li>
          <li>
            <InlineMath math="H(\mathbf{x}^*)" /> indefinite
            (some eigenvalues positive, some negative) ⇒{" "}
            <strong>saddle point</strong>.
          </li>
          <li>
            <InlineMath math="H(\mathbf{x}^*)" /> singular ⇒
            inconclusive (need higher-order info).
          </li>
        </ul>
      </Callout>

      <p>
        This is just "diagonalise the Hessian and look at
        signs of eigenvalues" — directly using the spectral
        theorem from Module II. Each eigenvalue describes the
        curvature in the corresponding eigen-direction.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Convexity from the Hessian</h2>

      <p>
        A function is <strong>convex</strong> if the line
        between any two points on its graph lies above the
        graph. For smooth{" "}
        <InlineMath math="f" />, equivalent characterisations:
      </p>

      <ul>
        <li>
          <InlineMath math="f(\mathbf{y}) \ge f(\mathbf{x}) + \nabla f(\mathbf{x})^T (\mathbf{y} - \mathbf{x})" />{" "}
          (the tangent plane is below the graph).
        </li>
        <li>
          <InlineMath math="H(\mathbf{x})" /> is{" "}
          <em>positive-semi-definite</em> for every{" "}
          <InlineMath math="\mathbf{x}" />.
        </li>
      </ul>

      <p>
        Convex functions have only one minimum (which is also
        the global minimum). That's why convex problems are
        the "easy" ones in optimisation:
      </p>

      <ul>
        <li>
          OLS loss is convex (and quadratic): one global
          minimum, found in closed form.
        </li>
        <li>
          Logistic-regression NLL is convex (just not
          closed-form): unique global minimum, found by
          iterative methods.
        </li>
        <li>
          Neural-network loss is{" "}
          <em>not</em> convex: many local minima, many saddles
          — the source of much of modern optimisation
          research.
        </li>
      </ul>

      <p>
        We'll come back to convexity in Module III, Chapter 3
        (least-squares is the prototypical convex problem) and
        again in Module VI when we discuss why cross-entropy is
        the "right" loss for classification.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>Optimisation</strong>: gradient descent and
          its variants (momentum, Adam, Newton's method) all
          live or die by their use of the gradient and
          (sometimes) the Hessian.
        </li>
        <li>
          <strong>OLS</strong>: setting{" "}
          <InlineMath math="\nabla L = \mathbf{0}" /> for the
          quadratic loss directly gives the normal equations.
          Hessian-of-loss = positive-definite ⇒ that critical
          point is the global minimum. We'll do this fully in
          Chapter 3.
        </li>
        <li>
          <strong>Backprop</strong>: chain rule on Jacobians.
          Every gradient computation in a deep network is a
          product of Jacobians.
        </li>
        <li>
          <strong>Newton's method</strong>: uses the Hessian
          directly. Quadratic convergence near a minimum.
          Often impractical for big problems (Hessian is
          expensive to form and invert), so people use
          quasi-Newton (BFGS, L-BFGS) approximations.
        </li>
        <li>
          <strong>Microstructure preview</strong>: market-
          making policies (Avellaneda–Stoikov) are derived by
          taking gradients of an HJB-equation Hamiltonian and
          setting them to zero. Same machinery.
        </li>
      </ul>

      <p>
        Next chapter: matrix calculus identities — the
        cookbook of "what's the gradient of{" "}
        <InlineMath math="\mathbf{a}^T \mathbf{x}" />, of{" "}
        <InlineMath math="\mathbf{x}^T A \mathbf{x}" />, of a
        determinant, of a log-determinant" — so that you never
        have to expand into components again.
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
      "The gradient $\\nabla f$ of a scalar function $f : \\mathbb{R}^n \\to \\mathbb{R}$…",
    options: [
      "is always zero",
      "points in the direction of fastest increase, with magnitude equal to the rate",
      "is the same as the Hessian",
      "is a scalar",
    ],
    correct: 1,
    explanation:
      "By Cauchy-Schwarz, the unit direction maximising the directional derivative $\\mathbf{u}^T \\nabla f$ is $\\mathbf{u} = \\nabla f / \\|\\nabla f\\|$. Steepest ascent. Pointing opposite gives steepest descent.",
  },
  {
    prompt:
      "The Jacobian of $\\mathbf{f} : \\mathbb{R}^n \\to \\mathbb{R}^m$ is…",
    options: [
      "an $n \\times m$ matrix",
      "an $m \\times n$ matrix where row $i$ is $(\\nabla f_i)^T$",
      "a scalar",
      "always symmetric",
    ],
    correct: 1,
    explanation:
      "$m$ rows (one per output component, each a gradient row), $n$ columns. Linearises the function: $\\mathbf{f}(\\mathbf{x} + \\Delta) \\approx \\mathbf{f}(\\mathbf{x}) + J \\Delta$.",
  },
  {
    prompt:
      "The chain rule for vector-valued composed functions $\\mathbf{h} = \\mathbf{f} \\circ \\mathbf{g}$ is…",
    options: [
      "$J_\\mathbf{h} = J_\\mathbf{f} + J_\\mathbf{g}$",
      "$J_\\mathbf{h} = J_\\mathbf{g} J_\\mathbf{f}$",
      "$J_\\mathbf{h} = J_\\mathbf{f} J_\\mathbf{g}$",
      "$J_\\mathbf{h} = J_\\mathbf{f}^T J_\\mathbf{g}$",
    ],
    correct: 2,
    explanation:
      "Function composition order ($\\mathbf{f}$ outer, $\\mathbf{g}$ inner) corresponds to matrix multiplication in the same order. Backpropagation is exactly this product of Jacobians.",
  },
  {
    prompt:
      "At a critical point $\\mathbf{x}^*$ where $\\nabla f(\\mathbf{x}^*) = \\mathbf{0}$, $f$ has a strict local minimum if…",
    options: [
      "$H(\\mathbf{x}^*)$ is the identity",
      "$H(\\mathbf{x}^*)$ is positive definite",
      "$H(\\mathbf{x}^*)$ is positive semi-definite",
      "$H(\\mathbf{x}^*)$ is symmetric",
    ],
    correct: 1,
    explanation:
      "All Hessian eigenvalues > 0 ⇒ $\\Delta^T H \\Delta > 0$ for all non-zero $\\Delta$ ⇒ $f(\\mathbf{x}^* + \\Delta) > f(\\mathbf{x}^*)$ for small $\\Delta$. PSD allows non-strict (degenerate cases need higher orders).",
  },
  {
    prompt:
      "A smooth function is convex iff…",
    options: [
      "it has a unique critical point",
      "the Hessian is positive semi-definite everywhere",
      "the gradient is zero somewhere",
      "the function is increasing",
    ],
    correct: 1,
    explanation:
      "Smooth convexity ⇔ Hessian PSD globally. Strict convexity ⇔ PD globally. OLS loss is strictly convex (Hessian = $X^T X$, PD when $X$ has independent columns).",
  },
];
