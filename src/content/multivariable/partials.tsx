import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function PartialsBody() {
  return (
    <>
      <p>
        Single-variable calculus answers "how does <InlineMath math="f(x)" />{" "}
        change as <InlineMath math="x" /> changes?" Multivariable
        calculus answers "how does{" "}
        <InlineMath math="f(x_1, \dots, x_n)" /> change as <em>each</em>{" "}
        input changes — and as they all change at once?" The answer
        introduces three new objects you'll see everywhere afterward:{" "}
        <strong>partial derivatives</strong> (rate of change in one
        coordinate while others are held fixed),{" "}
        <strong>the gradient</strong> (a vector pointing in the
        direction of fastest increase), and the{" "}
        <strong>Hessian</strong> (the matrix of second partials, which
        plays the role of <InlineMath math="f''" /> in higher
        dimensions).
      </p>
      <p>
        These tools then power optimisation. Critical points become
        points where <InlineMath math="\nabla f = \mathbf{0}" />, the
        Hessian classifies them as maxima/minima/saddles via its
        eigenvalues, and Lagrange multipliers extend the framework to
        constrained problems. Most modern numerical methods —
        gradient descent, Newton's method, neural-network training —
        are this chapter dressed up.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.02 — Multivariable Calculus (full course)",
            author: "Prof. Denis Auroux (MIT OCW)",
            duration: "~35h",
            url: "https://ocw.mit.edu/courses/18-02-multivariable-calculus-fall-2007/",
            note: "Lectures 8–14 cover this chapter. Auroux's section is one of the best-loved on OCW.",
          },
          {
            title: "Khan Academy — Multivariable Calculus (Grant Sanderson)",
            author: "Grant Sanderson (3Blue1Brown) for Khan Academy",
            duration: "~10h",
            url: "https://www.khanacademy.org/math/multivariable-calculus",
            note: "Visual, intuition-first. Especially good on gradients and directional derivatives.",
          },
          {
            title: "Stewart — Multivariable Calculus, chs. 14–15",
            author: "James Stewart",
            duration: "Reading",
            url: "https://www.stewartcalculus.com/",
            note: "The canonical applied textbook treatment.",
          },
          {
            title: "Apostol — Calculus Vol. II, chs. 8–9",
            author: "Tom Apostol",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Calculus_(Apostol)",
            note: "Rigorous version. Reach for it if Stewart feels hand-wavy.",
          },
          {
            title: "Lagrange multipliers explained — 3Blue1Brown / various",
            author: "various",
            duration: "10–20 min each",
            url: "https://www.youtube.com/results?search_query=lagrange+multipliers+intuition",
            note: "If Part 8 doesn't click, watch one of these — the intuition is purely visual.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Functions of several variables</h2>

      <p>
        A real-valued function of <InlineMath math="n" /> variables is
        a map <InlineMath math="f : \mathbb{R}^n \to \mathbb{R}" />.
        Concrete examples:
      </p>
      <ul>
        <li>
          Temperature in a room: <InlineMath math="T(x, y, z)" /> at
          position <InlineMath math="(x, y, z)" />.
        </li>
        <li>
          Height above sea level: <InlineMath math="h(\text{lat}, \text{long})" />.
        </li>
        <li>
          Loss surface of a neural network:{" "}
          <InlineMath math="L(\theta_1, \dots, \theta_m)" /> for{" "}
          <InlineMath math="m" /> parameters.
        </li>
        <li>
          Probability density of a random vector:{" "}
          <InlineMath math="p(x_1, \dots, x_n)" />.
        </li>
      </ul>

      <p>
        For <InlineMath math="n = 2" />, you can visualise the graph as
        a surface in 3D (the height of the surface above each{" "}
        <InlineMath math="(x, y)" />). For{" "}
        <InlineMath math="n \geq 3" />, the graph lives in 4+
        dimensions, so we don't draw it directly. Two practical tools
        instead:
      </p>

      <ul>
        <li>
          <strong>Level curves</strong> (or contour lines) for{" "}
          <InlineMath math="n = 2" />: the curve{" "}
          <InlineMath math="f(x, y) = c" /> for various constants{" "}
          <InlineMath math="c" />. A topographic map is exactly this.
        </li>
        <li>
          <strong>Level surfaces</strong> for{" "}
          <InlineMath math="n = 3" />: the set{" "}
          <InlineMath math="f(x, y, z) = c" />, a 2D surface in 3D
          space. Constant-temperature surfaces, equipotentials in
          electrostatics.
        </li>
      </ul>

      <h3>Limits and continuity</h3>

      <p>
        Limits in higher dimensions are subtler than the single-
        variable kind. We say{" "}
        <InlineMath math="\lim_{(x,y) \to (a,b)} f(x, y) = L" /> if for
        every <InlineMath math="\varepsilon > 0" /> there is{" "}
        <InlineMath math="\delta > 0" /> such that{" "}
        <InlineMath math="|f(x, y) - L| < \varepsilon" /> whenever{" "}
        <InlineMath math="0 < \sqrt{(x-a)^2 + (y-b)^2} < \delta" />. The
        new wrinkle: in 1D you approach <InlineMath math="a" /> from
        either side. In 2D you can approach <InlineMath math="(a, b)" />{" "}
        from <em>infinitely many</em> directions, and you need the
        same answer along all of them.
      </p>

      <Pitfall>
        Watch for direction-dependent limits.{" "}
        <InlineMath math="f(x, y) = xy / (x^2 + y^2)" /> approaches 0
        along the <InlineMath math="x" />-axis and along the{" "}
        <InlineMath math="y" />-axis, but along the line{" "}
        <InlineMath math="y = x" /> it equals{" "}
        <InlineMath math="1/2" /> for every nonzero{" "}
        <InlineMath math="x" />. So the limit at the origin doesn't
        exist. "It approaches the same value along every straight line"
        is necessary but not even sufficient.
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Partial derivatives</h2>

      <p>
        The <strong>partial derivative</strong> of{" "}
        <InlineMath math="f(x, y)" /> with respect to{" "}
        <InlineMath math="x" /> is the rate of change in{" "}
        <InlineMath math="x" /> with <InlineMath math="y" /> held
        fixed:
      </p>
      <BlockMath math="\frac{\partial f}{\partial x}(x, y) = \lim_{h \to 0} \frac{f(x + h, y) - f(x, y)}{h}." />
      <p>
        Compute it as a single-variable derivative, treating{" "}
        <InlineMath math="y" /> as a constant. Common notations: all
        equivalent.
      </p>
      <BlockMath math="\frac{\partial f}{\partial x} \;=\; f_x \;=\; \partial_x f." />

      <p>
        Worked example. Let{" "}
        <InlineMath math="f(x, y) = x^2 y + \sin(xy)" />. Then
      </p>
      <BlockMath math="f_x = 2x y + y \cos(xy), \qquad f_y = x^2 + x \cos(xy)." />

      <h3>Higher and mixed partials</h3>

      <p>
        Differentiate again:{" "}
        <InlineMath math="f_{xx} = \partial^2 f / \partial x^2" />,{" "}
        <InlineMath math="f_{yy}" />, and the mixed partials{" "}
        <InlineMath math="f_{xy} = \partial(\partial f/\partial x)/\partial y" />{" "}
        and <InlineMath math="f_{yx}" />.
      </p>

      <Callout title="Clairaut's theorem">
        If <InlineMath math="f_{xy}" /> and{" "}
        <InlineMath math="f_{yx}" /> are continuous in a neighbourhood
        of a point, then they're <em>equal</em> there:
        <BlockMath math="f_{xy} = f_{yx}." />
      </Callout>

      <p>
        For all functions you'll meet in this course, mixed partials
        commute. Pathological counterexamples exist (where the partial
        derivatives are discontinuous) but they're a footnote.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · The gradient</h2>

      <p>
        The <strong>gradient</strong> packages all the first partials
        into a vector:
      </p>
      <BlockMath math="\nabla f = \left( \frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \dots, \frac{\partial f}{\partial x_n} \right)." />

      <p>
        Two facts to internalise about{" "}
        <InlineMath math="\nabla f" /> at a point:
      </p>
      <ul>
        <li>
          <strong>It points in the direction of steepest ascent.</strong>{" "}
          Take a step in any direction; the function increases fastest
          if you step parallel to <InlineMath math="\nabla f" />.
        </li>
        <li>
          <strong>Its magnitude is the rate</strong> of that fastest
          ascent.
        </li>
        <li>
          <strong>It is perpendicular to level curves</strong> (in 2D)
          / level surfaces (in 3D). Level curves are{" "}
          "constant-<InlineMath math="f" />" curves, so moving along
          them doesn't change <InlineMath math="f" /> — perpendicular
          to "no change" is "maximum change."
        </li>
      </ul>

      <Callout title="Try it">
        The widget shows the contour plot of a function (level curves
        in colour). Click anywhere to drop a point; the gradient at
        that point is drawn as a green arrow. Notice it always points
        "uphill" and is perpendicular to the local contour.
      </Callout>

      <ContourGradientWidget />

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Directional derivatives</h2>

      <p>
        How fast does <InlineMath math="f" /> change if I step in a
        chosen direction <InlineMath math="\mathbf{u}" /> (a unit
        vector)? The <strong>directional derivative</strong>:
      </p>
      <BlockMath math="D_{\mathbf{u}} f(\mathbf{p}) = \lim_{h \to 0} \frac{f(\mathbf{p} + h \mathbf{u}) - f(\mathbf{p})}{h}." />
      <p>
        For differentiable <InlineMath math="f" />, this is just{" "}
        <em>the gradient dotted with the direction</em>:
      </p>
      <BlockMath math="D_{\mathbf{u}} f(\mathbf{p}) = \nabla f(\mathbf{p}) \cdot \mathbf{u}." />
      <p>
        That formula explains everything in Part 3:
      </p>
      <ul>
        <li>
          The directional derivative is maximised when{" "}
          <InlineMath math="\mathbf{u}" /> aligns with{" "}
          <InlineMath math="\nabla f" /> (Cauchy–Schwarz upper bound).
          Maximum value: <InlineMath math="\|\nabla f\|" />.
        </li>
        <li>
          Zero when <InlineMath math="\mathbf{u} \perp \nabla f" /> —
          you're moving along a level curve, no change.
        </li>
        <li>
          Most negative (steepest descent) when{" "}
          <InlineMath math="\mathbf{u} = -\nabla f / \|\nabla f\|" />.
        </li>
      </ul>

      <Pitfall>
        The formula{" "}
        <InlineMath math="D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u}" />{" "}
        requires <InlineMath math="\mathbf{u}" /> to be a{" "}
        <em>unit</em> vector. If you don't normalise, you'll
        accidentally get the directional derivative scaled by the
        length of <InlineMath math="\mathbf{u}" />.
      </Pitfall>

      <Exercise
        number="4.1"
        prompt={
          <>
            Compute the directional derivative of{" "}
            <InlineMath math="f(x, y) = x^2 + y^2" /> at the point{" "}
            <InlineMath math="(1, 2)" /> in the direction of{" "}
            <InlineMath math="(3, 4)" />.
          </>
        }
      >
        <p>
          Gradient: <InlineMath math="\nabla f = (2x, 2y)" />, evaluated
          at <InlineMath math="(1, 2)" />:{" "}
          <InlineMath math="(2, 4)" />.
        </p>
        <p>
          Direction unit vector:{" "}
          <InlineMath math="(3, 4) / 5 = (3/5, 4/5)" />.
        </p>
        <p>
          Dot product:{" "}
          <InlineMath math="(2)(3/5) + (4)(4/5) = 6/5 + 16/5 = 22/5" />.
          ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Tangent plane &amp; linear approximation</h2>

      <p>
        The single-variable tangent line{" "}
        <InlineMath math="f(x) \approx f(a) + f'(a)(x - a)" />{" "}
        generalises to multiple variables as a tangent{" "}
        <em>plane</em> (or hyperplane in higher dimensions):
      </p>
      <BlockMath math="f(\mathbf{x}) \approx f(\mathbf{a}) + \nabla f(\mathbf{a}) \cdot (\mathbf{x} - \mathbf{a})." />
      <p>
        This is the best linear approximation of{" "}
        <InlineMath math="f" /> near{" "}
        <InlineMath math="\mathbf{a}" />. For the surface{" "}
        <InlineMath math="z = f(x, y)" />, the tangent plane at{" "}
        <InlineMath math="(a, b, f(a, b))" /> is
      </p>
      <BlockMath math="z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)." />

      <p>
        For a level surface{" "}
        <InlineMath math="g(x, y, z) = c" />, the gradient{" "}
        <InlineMath math="\nabla g" /> is normal to the surface (the
        same fact as above: gradient ⊥ level set). Tangent plane to
        the surface at <InlineMath math="\mathbf{p}" />:
      </p>
      <BlockMath math="\nabla g(\mathbf{p}) \cdot (\mathbf{x} - \mathbf{p}) = 0." />

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · The multivariable chain rule</h2>

      <p>
        If <InlineMath math="\mathbf{r}(t) = (x(t), y(t), z(t))" /> is
        a curve in space and <InlineMath math="f" /> is a function on
        space, then{" "}
        <InlineMath math="(f \circ \mathbf{r})(t) = f(x(t), y(t), z(t))" />{" "}
        is a function of <InlineMath math="t" />. Its derivative:
      </p>
      <BlockMath math="\frac{d}{dt} f(\mathbf{r}(t)) = \nabla f(\mathbf{r}(t)) \cdot \mathbf{r}'(t) = f_x \, x'(t) + f_y \, y'(t) + f_z \, z'(t)." />

      <p>
        This is a generalisation of the single-variable chain rule,
        and it's worth pausing to confirm two consequences:
      </p>
      <ul>
        <li>
          If a particle moves along a level surface (
          <InlineMath math="f \circ \mathbf{r}" /> is constant), the
          left side is 0, so{" "}
          <InlineMath math="\nabla f \perp \mathbf{r}'" /> — the
          gradient is perpendicular to the velocity along level sets.
          That's another way to see "gradient perpendicular to level
          curves."
        </li>
        <li>
          The fastest way for a hiker to go uphill is to follow the
          gradient flow{" "}
          <InlineMath math="\mathbf{r}'(t) = \nabla f(\mathbf{r}(t))" />.
          This is gradient ascent — and{" "}
          <InlineMath math="\mathbf{r}'(t) = -\nabla f(\mathbf{r}(t))" /> is
          gradient descent, the foundation of modern ML.
        </li>
      </ul>

      <h3>Generalised chain rule</h3>
      <p>
        For <InlineMath math="z = f(x, y)" /> with{" "}
        <InlineMath math="x = x(s, t)" />,{" "}
        <InlineMath math="y = y(s, t)" />:
      </p>
      <BlockMath math="\frac{\partial z}{\partial s} = f_x \frac{\partial x}{\partial s} + f_y \frac{\partial y}{\partial s}, \quad \frac{\partial z}{\partial t} = f_x \frac{\partial x}{\partial t} + f_y \frac{\partial y}{\partial t}." />
      <p>
        The structure is "for each output variable in the chain, sum
        over each path to that variable, multiplying the partials
        along that path." This is what backpropagation in neural nets
        is doing — a giant chain-rule application.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Critical points &amp; the Hessian test</h2>

      <p>
        At an interior maximum, minimum, or saddle of a differentiable
        function, the gradient is zero:
      </p>
      <BlockMath math="\nabla f(\mathbf{p}) = \mathbf{0}." />
      <p>
        Such points are called <strong>critical points</strong>. To
        classify them, look at the second-order behaviour, captured
        by the <strong>Hessian matrix</strong>:
      </p>
      <BlockMath math="H f(\mathbf{p}) = \begin{pmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{pmatrix}_{\mathbf{p}}." />
      <p>
        By Clairaut's theorem, the Hessian is symmetric. By the
        spectral theorem (linear-algebra chapter), it has real
        eigenvalues and an orthonormal eigenbasis. The eigenvalues
        classify the critical point:
      </p>
      <ul>
        <li>
          <strong>All eigenvalues positive</strong> ⇒ local minimum (
          <InlineMath math="f" /> curves up in every direction).
        </li>
        <li>
          <strong>All eigenvalues negative</strong> ⇒ local maximum.
        </li>
        <li>
          <strong>Mixed signs</strong> ⇒ saddle point: up in some
          directions, down in others.
        </li>
        <li>
          <strong>Zero eigenvalue(s)</strong> ⇒ test inconclusive,
          examine higher-order terms.
        </li>
      </ul>

      <p>
        For 2×2 Hessians, you can do the test via determinant and
        trace without computing eigenvalues:
      </p>
      <ul>
        <li>
          <InlineMath math="\det H > 0" /> and{" "}
          <InlineMath math="f_{xx} > 0" /> ⇒ local min.
        </li>
        <li>
          <InlineMath math="\det H > 0" /> and{" "}
          <InlineMath math="f_{xx} < 0" /> ⇒ local max.
        </li>
        <li>
          <InlineMath math="\det H < 0" /> ⇒ saddle.
        </li>
        <li>
          <InlineMath math="\det H = 0" /> ⇒ inconclusive.
        </li>
      </ul>

      <Exercise
        number="7.1"
        prompt={
          <>
            Find and classify all critical points of{" "}
            <InlineMath math="f(x, y) = x^2 - y^2" />.
          </>
        }
      >
        <p>
          <InlineMath math="\nabla f = (2x, -2y) = (0, 0) \Rightarrow (x, y) = (0, 0)" />.
          Hessian:
        </p>
        <BlockMath math="H = \begin{pmatrix} 2 & 0 \\ 0 & -2 \end{pmatrix}." />
        <p>
          Determinant <InlineMath math="-4 < 0" />: saddle. Geometrically{" "}
          <InlineMath math="f" /> opens up along <InlineMath math="x" />{" "}
          and down along <InlineMath math="y" /> — the literal saddle
          shape.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Lagrange multipliers</h2>

      <p>
        Constrained optimisation: maximise (or minimise){" "}
        <InlineMath math="f(\mathbf{x})" /> subject to{" "}
        <InlineMath math="g(\mathbf{x}) = 0" /> (a constraint surface).
        The clever observation: at an extremum on the constraint
        surface, you can't increase <InlineMath math="f" /> by sliding
        along the surface. Equivalently,{" "}
        <InlineMath math="\nabla f" /> has no component tangent to the
        surface — it's perpendicular to the surface, i.e. parallel to{" "}
        <InlineMath math="\nabla g" />.
      </p>

      <Callout title="Lagrange multiplier theorem">
        At a constrained extremum of <InlineMath math="f" /> subject
        to <InlineMath math="g = 0" />, there exists a scalar{" "}
        <InlineMath math="\lambda" /> with
        <BlockMath math="\nabla f = \lambda \, \nabla g." />
        Solve this together with the constraint{" "}
        <InlineMath math="g = 0" /> to find candidate extrema.
      </Callout>

      <p>
        <strong>Worked example.</strong> Maximise{" "}
        <InlineMath math="f(x, y) = xy" /> on the unit circle{" "}
        <InlineMath math="g(x, y) = x^2 + y^2 - 1 = 0" />.
      </p>
      <p>
        Gradients: <InlineMath math="\nabla f = (y, x)" />,{" "}
        <InlineMath math="\nabla g = (2x, 2y)" />. Setting{" "}
        <InlineMath math="\nabla f = \lambda \nabla g" />:{" "}
        <InlineMath math="y = 2\lambda x" /> and{" "}
        <InlineMath math="x = 2\lambda y" />. Multiply:{" "}
        <InlineMath math="xy = 4\lambda^2 xy" />, so either{" "}
        <InlineMath math="xy = 0" /> (giving boundary cases on the
        axes) or <InlineMath math="\lambda = \pm 1/2" />, giving{" "}
        <InlineMath math="y = \pm x" />. Combined with the constraint,
        the candidates are{" "}
        <InlineMath math="(\pm 1/\sqrt 2, \pm 1/\sqrt 2)" />. The
        maximum of <InlineMath math="xy" /> at these is{" "}
        <InlineMath math="1/2" />, attained when <InlineMath math="x" /> and{" "}
        <InlineMath math="y" /> have the same sign. ∎
      </p>

      <h3>Multiple constraints</h3>
      <p>
        For two constraints{" "}
        <InlineMath math="g_1 = 0" />,{" "}
        <InlineMath math="g_2 = 0" />, the condition becomes{" "}
        <InlineMath math="\nabla f = \lambda_1 \nabla g_1 + \lambda_2 \nabla g_2" />.
        In general, with <InlineMath math="k" /> constraints, you get{" "}
        <InlineMath math="k" /> multipliers — one per constraint.
      </p>

      {/* ─────────────────────────────  PART 9  ───────────────────────────── */}
      <h2>Part 9 · Why this matters</h2>

      <ul>
        <li>
          <strong>Machine learning.</strong> Gradient descent —{" "}
          <InlineMath math="\theta_{n+1} = \theta_n - \alpha \nabla L" /> —
          is the workhorse algorithm for training neural networks,
          regression models, and SVMs. The chain rule is what makes
          backpropagation work in deep nets.
        </li>
        <li>
          <strong>Physics.</strong> Energy conservation laws come from
          Lagrangian mechanics, where the Euler–Lagrange equations are
          partial-derivative equations. Maxwell's equations involve
          gradients (electric potential), curls (magnetic field),
          and divergences (charge density).
        </li>
        <li>
          <strong>Quantum mechanics.</strong> The momentum operator{" "}
          <InlineMath math="\hat{\mathbf{p}} = -i\hbar \nabla" /> is
          the gradient (multiplied by{" "}
          <InlineMath math="-i\hbar" />). The Schrödinger equation
          for a particle in 3D is{" "}
          <InlineMath math="i\hbar \, \partial_t \psi = -\hbar^2/(2m) \nabla^2 \psi + V \psi" />,
          where <InlineMath math="\nabla^2 = \partial_x^2 + \partial_y^2 + \partial_z^2" />{" "}
          is the Laplacian — a sum of second partials.
        </li>
        <li>
          <strong>Economics &amp; statistics.</strong> Maximum-
          likelihood estimation, expected-utility maximisation,
          Lagrangians for budget constraints — all multivariable
          optimisation problems.
        </li>
      </ul>

      <p>
        Next chapter develops integration in higher dimensions: areas,
        volumes, masses, probabilities — and the Jacobian determinant,
        which makes "change of variables" in higher dimensions just
        as routine as <InlineMath math="u" />-substitution was in 1D.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: contour plot + gradient
// ════════════════════════════════════════════════════════════

type Surf = "bowl" | "saddle" | "wavy" | "valley";

const surfs: Record<Surf, { f: (x: number, y: number) => number; fx: (x: number, y: number) => number; fy: (x: number, y: number) => number; latex: string }> = {
  bowl: {
    f: (x, y) => x * x + y * y,
    fx: (x) => 2 * x,
    fy: (_x, y) => 2 * y,
    latex: "x^2 + y^2",
  },
  saddle: {
    f: (x, y) => x * x - y * y,
    fx: (x) => 2 * x,
    fy: (_x, y) => -2 * y,
    latex: "x^2 - y^2",
  },
  wavy: {
    f: (x, y) => Math.sin(x) * Math.cos(y),
    fx: (x, y) => Math.cos(x) * Math.cos(y),
    fy: (x, y) => -Math.sin(x) * Math.sin(y),
    latex: "\\sin x \\cos y",
  },
  valley: {
    f: (x, y) => 0.3 * x * x + y * y * y / 6 - y,
    fx: (x) => 0.6 * x,
    fy: (_x, y) => (y * y) / 2 - 1,
    latex: "0.3 x^2 + y^3/6 - y",
  },
};

function ContourGradientWidget() {
  const [key, setKey] = useState<Surf>("bowl");
  const [pt, setPt] = useState({ x: 1.2, y: 0.8 });
  const surf = surfs[key];

  const w = 360;
  const h = 320;
  const xMin = -3,
    xMax = 3,
    yMin = -3,
    yMax = 3;
  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * w;
  const sy = (y: number) => h - ((y - yMin) / (yMax - yMin)) * h;

  // Build a contour-flavoured background by drawing isolines via a coarse grid
  const N = 36;
  const cells: { x: number; y: number; v: number }[] = [];
  let minV = Infinity,
    maxV = -Infinity;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const x = xMin + ((xMax - xMin) * i) / (N - 1);
      const y = yMin + ((yMax - yMin) * j) / (N - 1);
      const v = surf.f(x, y);
      cells.push({ x, y, v });
      if (v < minV) minV = v;
      if (v > maxV) maxV = v;
    }
  }
  const dx = (xMax - xMin) / (N - 1);
  const dy = (yMax - yMin) / (N - 1);
  const cellW = sx(dx) - sx(0);
  const cellH = sy(0) - sy(dy);

  const colorFor = (v: number) => {
    const t = (v - minV) / (maxV - minV || 1);
    // dark navy → purple → cyan
    const r = Math.round(20 + 130 * t);
    const g = Math.round(20 + 80 * t);
    const b = Math.round(40 + 200 * (1 - Math.abs(t - 0.4) * 1.5));
    return `rgb(${r},${g},${b})`;
  };

  const grad = { x: surf.fx(pt.x, pt.y), y: surf.fy(pt.x, pt.y) };
  const gMag = Math.sqrt(grad.x * grad.x + grad.y * grad.y);
  const arrowScale = 0.35;
  const ax = pt.x + grad.x * arrowScale;
  const ay = pt.y + grad.y * arrowScale;

  const handle = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * (xMax - xMin) + xMin;
    const y = yMax - ((e.clientY - rect.top) / rect.height) * (yMax - yMin);
    setPt({ x, y });
  };

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(surfs) as Surf[]).map((k) => (
            <button
              key={k}
              onClick={() => setKey(k)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                key === k
                  ? "border-accent-soft bg-ink-800 text-white"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              <InlineMath math={`f = ${surfs[k].latex}`} />
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="w-full block touch-none cursor-crosshair"
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture?.(e.pointerId);
              handle(e);
            }}
            onPointerMove={(e) => {
              if (e.buttons !== 0 || e.pointerType === "touch") {
                handle(e);
              }
            }}
          >
            {cells.map((c, i) => (
              <rect
                key={i}
                x={sx(c.x) - cellW / 2}
                y={sy(c.y) - cellH / 2}
                width={cellW + 0.5}
                height={cellH + 0.5}
                fill={colorFor(c.v)}
              />
            ))}

            {/* axes */}
            <line x1={0} y1={sy(0)} x2={w} y2={sy(0)} stroke="#2a2a37" strokeOpacity={0.5} />
            <line x1={sx(0)} y1={0} x2={sx(0)} y2={h} stroke="#2a2a37" strokeOpacity={0.5} />

            {/* point */}
            <circle cx={sx(pt.x)} cy={sy(pt.y)} r={4} fill="#fbbf24" stroke="#fff" strokeWidth={1} />

            {/* gradient arrow */}
            {gMag > 0.01 && (
              <Arrow x1={sx(pt.x)} y1={sy(pt.y)} x2={sx(ax)} y2={sy(ay)} stroke="#22c55e" />
            )}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Stat label="point" value={`(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)})`} />
          <Stat
            label="∇f at point"
            value={`(${grad.x.toFixed(2)}, ${grad.y.toFixed(2)})  · |∇f| = ${gMag.toFixed(3)}`}
          />
        </div>
      </div>
      <figcaption>
        Contour map (dark = low <InlineMath math="f" />, light = high).
        Click to drop a point. Green arrow:{" "}
        <InlineMath math="\nabla f" /> at that point — always points
        "uphill" and perpendicular to the local contour.
      </figcaption>
    </figure>
  );
}

function Arrow({ x1, y1, x2, y2, stroke }: { x1: number; y1: number; x2: number; y2: number; stroke: string }) {
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
      <line x1={x1} y1={y1} x2={tipBackX} y2={tipBackY} strokeWidth={2.4} />
      <polygon
        points={`${x2},${y2} ${tipBackX + px * headW},${tipBackY + py * headW} ${tipBackX - px * headW},${tipBackY - py * headW}`}
        strokeLinejoin="round"
      />
    </g>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ink-800/60 border border-ink-800 px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-ink-500">{label}</div>
      <div className="font-mono text-ink-100 mt-0.5 text-xs">{value}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "Compute $\\partial f / \\partial y$ for $f(x, y) = x^2 y^3 + \\sin x$.",
    options: ["$2xy^3$", "$3x^2 y^2$", "$2xy^3 + \\cos x$", "$3x^2 y^2 + \\cos x$"],
    correct: 1,
    explanation:
      "Treat $x$ as constant. The first term is $x^2 \\cdot y^3$, derivative w.r.t. $y$ is $3 x^2 y^2$. $\\sin x$ has no $y$, so its $\\partial/\\partial y$ is 0.",
  },
  {
    prompt:
      "The gradient $\\nabla f$ at a point is…",
    options: [
      "tangent to the level set there",
      "perpendicular to the level set there, pointing in the direction of fastest increase",
      "parallel to the y-axis",
      "always $\\mathbf{0}$ at a saddle point",
    ],
    correct: 1,
    explanation:
      "$\\nabla f$ is perpendicular to level sets and points 'uphill' in the steepest direction. (It is $\\mathbf{0}$ at critical points — saddles included — but option D is too narrow.)",
  },
  {
    prompt:
      "If $f(x, y) = x^2 + y^2$, the directional derivative at $(1, 0)$ in the unit direction $(0, 1)$ is…",
    options: ["0", "1", "2", "$\\sqrt{2}$"],
    correct: 0,
    explanation:
      "$\\nabla f(1, 0) = (2, 0)$. Dot with $(0, 1)$: 0. The function doesn't change locally if you move purely in the $y$ direction at that point — $f$ has no $y$-slope when $y = 0$.",
  },
  {
    prompt:
      "A critical point with Hessian eigenvalues $+3$ and $-1$ is…",
    options: ["a local min", "a local max", "a saddle", "indeterminate"],
    correct: 2,
    explanation:
      "Mixed signs in the eigenvalues mean the function curves up in one direction and down in another — a saddle.",
  },
  {
    prompt:
      "Lagrange's condition for a constrained extremum is $\\nabla f = \\lambda \\nabla g$ because…",
    options: [
      "the gradients always point in the same direction",
      "at an extremum on the constraint, $\\nabla f$ has no component tangent to $g = 0$, so it's parallel to $\\nabla g$",
      "$\\lambda$ equals the maximum value of $f$",
      "it's only true for linear constraints",
    ],
    correct: 1,
    explanation:
      "If $\\nabla f$ had a tangential component, you could increase $f$ by sliding along the constraint surface — so at an extremum $\\nabla f$ is purely normal to the surface, hence parallel to $\\nabla g$.",
  },
];
