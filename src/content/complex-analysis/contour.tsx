import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function ContourBody() {
  return (
    <>
      <p>
        Integration in the complex plane is along curves, called{" "}
        <em>contours</em>. The construction looks routine — slice the
        curve, sum up{" "}
        <InlineMath math="f(z) \, \Delta z" />, take a limit. But three
        Cauchy results turn it into something powerful: closed-contour
        integrals of holomorphic functions are <em>zero</em>; values
        inside a contour are completely determined by values on it; and
        the function is automatically infinitely differentiable, with
        all derivatives expressible as integrals. From these, almost
        every spectacular feature of complex analysis follows.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.04 — lectures 9–14 (contour integration)",
            author: "Prof. Jeremy Orloff (MIT OCW)",
            duration: "~5h",
            url: "https://ocw.mit.edu/courses/18-04-complex-variables-with-applications-spring-2018/",
            note: "Cauchy's theorem and integral formula in detail.",
          },
          {
            title: "Visual Complex Analysis — chs. 8–10",
            author: "Tristan Needham",
            duration: "Reading",
            url: "https://www.amazon.com/Visual-Complex-Analysis-25th-Anniversary/dp/0192868926",
            note: "Cauchy's theorem geometrically. The 'amplitwist' picture is unique to Needham.",
          },
          {
            title: "Cauchy's integral formula (Khan)",
            author: "Khan Academy / various",
            duration: "varies",
            url: "https://www.khanacademy.org/math/calculus-all-old",
            note: "Worked applications.",
          },
          {
            title: "Stein &amp; Shakarchi — chs. 2–3",
            author: "Stein / Shakarchi",
            duration: "Reading",
            url: "https://press.princeton.edu/books/hardcover/9780691113852/complex-analysis",
            note: "Cleanest modern proofs of Cauchy's theorem and its consequences.",
          },
          {
            title: "Complex integration (3Blue1Brown / Mathologer)",
            author: "various",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=cauchy+integral+formula+visualized",
            note: "Several short visualisations.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Contour integrals</h2>

      <p>
        Let <InlineMath math="\gamma" /> be a piecewise smooth curve
        in <InlineMath math="\mathbb{C}" /> parameterised as{" "}
        <InlineMath math="z(t)" /> for{" "}
        <InlineMath math="t \in [a, b]" />. The contour integral of{" "}
        <InlineMath math="f" /> along <InlineMath math="\gamma" /> is
      </p>
      <BlockMath math="\int_\gamma f(z) \, dz = \int_a^b f(z(t)) \, z'(t) \, dt." />

      <p>
        Reads: parameterise the curve, multiply <InlineMath math="f" />{" "}
        by the (complex) tangent <InlineMath math="z'(t)" />, integrate
        over the parameter. Note that <InlineMath math="z'(t)" /> is
        complex — its argument is the direction of travel.
      </p>

      <h3>Worked example</h3>

      <p>
        <InlineMath math="\int_\gamma 1 \, dz" /> where{" "}
        <InlineMath math="\gamma" /> is any path from{" "}
        <InlineMath math="z_1" /> to <InlineMath math="z_2" />:{" "}
        <InlineMath math="\int_a^b z'(t) \, dt = z(b) - z(a) = z_2 - z_1" />.
        Independent of the path — sensible, since{" "}
        <InlineMath math="1" /> has antiderivative{" "}
        <InlineMath math="z" />.
      </p>

      <p>
        <InlineMath math="\int_\gamma z \, dz" /> where{" "}
        <InlineMath math="\gamma" /> is any path from{" "}
        <InlineMath math="z_1" /> to <InlineMath math="z_2" />: also
        path-independent, equals{" "}
        <InlineMath math="(z_2^2 - z_1^2)/2" />. Antiderivative:{" "}
        <InlineMath math="z^2/2" />.
      </p>

      <p>
        <InlineMath math="\int_\gamma 1/z \, dz" /> where{" "}
        <InlineMath math="\gamma" /> is the unit circle traversed once
        counter-clockwise. Parameterise{" "}
        <InlineMath math="z(t) = e^{it}, t \in [0, 2\pi]" />:
      </p>
      <BlockMath math="\int_0^{2\pi} \frac{1}{e^{it}} \cdot i e^{it} \, dt = \int_0^{2\pi} i \, dt = 2\pi i." />

      <p>
        Not zero! The integral around a closed loop is{" "}
        <InlineMath math="2\pi i" />. The reason:{" "}
        <InlineMath math="1/z" /> has a singularity at{" "}
        <InlineMath math="z = 0" /> inside the loop. This is the
        prototype of the residue theorem.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Cauchy's theorem</h2>

      <Callout title="Cauchy's theorem">
        Let <InlineMath math="f" /> be holomorphic on a simply-
        connected open set <InlineMath math="U \subseteq \mathbb{C}" />,
        and let <InlineMath math="\gamma" /> be any closed contour in{" "}
        <InlineMath math="U" />. Then
        <BlockMath math="\oint_\gamma f(z) \, dz = 0." />
      </Callout>

      <p>
        "Simply-connected" means no holes — every closed loop can be
        continuously contracted to a point within{" "}
        <InlineMath math="U" />.
      </p>

      <h3>Why it's true</h3>

      <p>
        Write <InlineMath math="f = u + iv" /> and{" "}
        <InlineMath math="dz = dx + i \, dy" />. Then
      </p>
      <BlockMath math="\oint f \, dz = \oint (u \, dx - v \, dy) + i \oint (v \, dx + u \, dy)." />

      <p>
        Each is a real line integral over{" "}
        <InlineMath math="\gamma" />. Apply Green's theorem (last
        chapter of Multivariable Calculus):
      </p>
      <BlockMath math="\oint (u \, dx - v \, dy) = \iint_D (-v_x - u_y) \, dA," />
      <BlockMath math="\oint (v \, dx + u \, dy) = \iint_D (u_x - v_y) \, dA." />

      <p>
        Both integrands vanish by Cauchy–Riemann (
        <InlineMath math="u_x = v_y" />,{" "}
        <InlineMath math="u_y = -v_x" />). So both integrals are
        zero. ∎
      </p>

      <p>
        Cauchy's theorem is the engine of complex analysis. It says
        the contour integral of a holomorphic function only "feels"
        the topology of the contour, not its specific path —
        deformations that don't cross singularities don't change the
        integral.
      </p>

      <Pitfall>
        Simply-connectedness matters. On{" "}
        <InlineMath math="\mathbb{C} \setminus \{0\}" />, the loop
        around the origin can't be contracted. Cauchy's theorem
        doesn't apply directly to{" "}
        <InlineMath math="\oint 1/z \, dz" />, and indeed it equals{" "}
        <InlineMath math="2\pi i" />, not 0.
      </Pitfall>

      <h3>Path independence</h3>

      <p>
        Corollary: on a simply-connected domain where{" "}
        <InlineMath math="f" /> is holomorphic, the contour integral
        depends only on the endpoints, not the path. From this,{" "}
        <InlineMath math="f" /> has an antiderivative{" "}
        <InlineMath math="F" /> on the domain (
        <InlineMath math="F(z) = \int_{z_0}^z f \, dw" /> for any{" "}
        path), and <InlineMath math="\int_\gamma f \, dz = F(z_2) - F(z_1)" /> —
        FTC for holomorphic integrals.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Cauchy's integral formula</h2>

      <Callout title="Cauchy's integral formula">
        Let <InlineMath math="f" /> be holomorphic on and inside a
        simple closed contour <InlineMath math="\gamma" /> traversed
        counter-clockwise, and let <InlineMath math="z_0" /> be any
        point inside <InlineMath math="\gamma" />. Then
        <BlockMath math="f(z_0) = \frac{1}{2\pi i} \oint_\gamma \frac{f(z)}{z - z_0} \, dz." />
      </Callout>

      <p>
        Read this carefully. The value of{" "}
        <InlineMath math="f" /> at any interior point is determined by{" "}
        the values on the boundary. Holomorphic functions are{" "}
        completely controlled by their boundary data.
      </p>

      <h3>Proof sketch</h3>

      <p>
        Around a tiny circle <InlineMath math="\gamma_\varepsilon" /> of
        radius <InlineMath math="\varepsilon" /> centred at{" "}
        <InlineMath math="z_0" />:
      </p>
      <BlockMath math="\oint_{\gamma_\varepsilon} \frac{f(z)}{z - z_0} \, dz \approx f(z_0) \oint_{\gamma_\varepsilon} \frac{dz}{z - z_0} = f(z_0) \cdot 2\pi i." />

      <p>
        (Approximation gets exact as{" "}
        <InlineMath math="\varepsilon \to 0" />.) But by Cauchy's
        theorem applied to the annular region between{" "}
        <InlineMath math="\gamma" /> and <InlineMath math="\gamma_\varepsilon" />,
        the two contour integrals are equal (the integrand is
        holomorphic in the annulus). So
      </p>
      <BlockMath math="\oint_\gamma \frac{f(z)}{z - z_0} \, dz = 2\pi i \, f(z_0). \quad \blacksquare" />

      <h3>Cauchy's formula for derivatives</h3>

      <p>
        Differentiate both sides with respect to{" "}
        <InlineMath math="z_0" />:
      </p>
      <BlockMath math="f^{(n)}(z_0) = \frac{n!}{2\pi i} \oint_\gamma \frac{f(z)}{(z - z_0)^{n+1}} \, dz." />

      <p>
        So all derivatives of a holomorphic function are recoverable
        as boundary integrals — and they all exist! Holomorphic ⇒
        infinitely differentiable, just from the original assumption
        of differentiability. (Compare real analysis, where{" "}
        <InlineMath math="C^1" /> doesn't imply{" "}
        <InlineMath math="C^2" />.)
      </p>

      <h3>Worked example</h3>

      <p>
        Compute{" "}
        <InlineMath math="\oint_\gamma e^z / z \, dz" /> where{" "}
        <InlineMath math="\gamma" /> is the unit circle.
      </p>

      <p>
        With <InlineMath math="f(z) = e^z" />,{" "}
        <InlineMath math="z_0 = 0" />:
      </p>
      <BlockMath math="f(0) = \frac{1}{2\pi i} \oint \frac{e^z}{z} \, dz \;\Rightarrow\; \oint \frac{e^z}{z} \, dz = 2\pi i \cdot e^0 = 2\pi i." />

      <Exercise
        number="3.1"
        prompt={
          <>
            Compute{" "}
            <InlineMath math="\displaystyle \oint_\gamma \frac{\cos z}{z - 1} \, dz" />{" "}
            where <InlineMath math="\gamma" /> is the circle{" "}
            <InlineMath math="|z| = 2" /> (CCW).
          </>
        }
      >
        <p>
          Cauchy with <InlineMath math="f(z) = \cos z" /> (entire),{" "}
          <InlineMath math="z_0 = 1" /> (inside{" "}
          <InlineMath math="|z| = 2" />):{" "}
          <InlineMath math="\cos 1 = (1/2\pi i) \oint \cos z / (z - 1) \, dz" />.
          So the integral is{" "}
          <InlineMath math="2\pi i \cos 1 \approx 2\pi i \cdot 0.5403 \approx 3.394\, i" />.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Liouville's theorem and the Fundamental Theorem of Algebra</h2>

      <Callout title="Liouville's theorem">
        A bounded entire function is constant.
      </Callout>

      <p>
        Proof. Let <InlineMath math="f" /> be entire and{" "}
        <InlineMath math="|f| \leq M" /> everywhere. By the Cauchy
        formula for the derivative on the circle{" "}
        <InlineMath math="|z| = R" />:
      </p>
      <BlockMath math="|f'(z_0)| = \left| \frac{1}{2\pi i} \oint \frac{f(z)}{(z - z_0)^2} \, dz \right| \leq \frac{1}{2\pi} \cdot 2\pi R \cdot \frac{M}{(R - |z_0|)^2}." />

      <p>
        The right side <InlineMath math="\to 0" /> as{" "}
        <InlineMath math="R \to \infty" />. So{" "}
        <InlineMath math="f'(z_0) = 0" /> at every{" "}
        <InlineMath math="z_0" />, meaning <InlineMath math="f" /> is
        constant. ∎
      </p>

      <h3>The Fundamental Theorem of Algebra</h3>

      <Callout title="Fundamental Theorem of Algebra">
        Every non-constant polynomial with complex coefficients has
        at least one complex root.
      </Callout>

      <p>
        Proof. Suppose <InlineMath math="p(z)" /> is a non-constant
        polynomial with no roots. Then{" "}
        <InlineMath math="g(z) = 1/p(z)" /> is entire. Since{" "}
        <InlineMath math="|p(z)| \to \infty" /> as{" "}
        <InlineMath math="|z| \to \infty" />,{" "}
        <InlineMath math="g(z) \to 0" /> at infinity, which means{" "}
        <InlineMath math="g" /> is bounded everywhere. By Liouville's
        theorem, <InlineMath math="g" /> is constant — but{" "}
        <InlineMath math="g \to 0" /> at infinity, so the constant is
        zero, which contradicts{" "}
        <InlineMath math="g \neq 0" />. ∎
      </p>

      <p>
        FTA was proved many times by many mathematicians (Gauss did it
        four ways). The complex-analytic proof is the slickest known.
        Iterating: a degree-<InlineMath math="n" /> polynomial has
        exactly <InlineMath math="n" /> complex roots counting
        multiplicity.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Maximum modulus and identity</h2>

      <h3>Maximum modulus principle</h3>

      <p>
        A non-constant holomorphic function on a connected open set
        cannot attain a local maximum of <InlineMath math="|f|" /> in
        the interior. Maxima must occur on the boundary.
      </p>

      <p>
        Proof sketch: by the Cauchy integral formula,{" "}
        <InlineMath math="f(z_0)" /> is the average of{" "}
        <InlineMath math="f" /> on any circle around{" "}
        <InlineMath math="z_0" />. An average can never exceed the
        maximum, so if <InlineMath math="|f|" /> has a local max at{" "}
        <InlineMath math="z_0" />, the function must equal{" "}
        <InlineMath math="f(z_0)" /> on that circle — and by analytic
        continuation, on the whole domain.
      </p>

      <p>
        Practical use: to bound <InlineMath math="|f|" /> on a
        domain, you only need to bound it on the boundary. Show{" "}
        <InlineMath math="|f| \leq M" /> on the boundary; conclude{" "}
        <InlineMath math="|f| \leq M" /> throughout.
      </p>

      <h3>Identity theorem</h3>

      <p>
        If two functions holomorphic on a connected open set agree on
        a sequence of points with a limit point in the set, they
        agree everywhere. Equivalently: a holomorphic function
        vanishing on such a sequence is identically zero.
      </p>

      <p>
        This is wild. Knowing a holomorphic function on the interval{" "}
        <InlineMath math="[0, 1]" /> determines it on{" "}
        <em>all of <InlineMath math="\mathbb{C}" /></em> (or as far
        as it extends analytically). The function has{" "}
        <em>memory</em> — local data forces global behaviour.
      </p>

      <p>
        Practical consequence: the trigonometric / hyperbolic / log /
        exponential identities valid on{" "}
        <InlineMath math="\mathbb{R}" /> automatically extend to{" "}
        <InlineMath math="\mathbb{C}" /> wherever both sides are
        holomorphic. Just verify on the real axis (an accumulating
        set), and the identity theorem extends. Free lunch.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Computing real integrals.</strong> Many real
          integrals that look hopeless become easy when interpreted
          as contour integrals. Next chapter develops this systematically.
        </li>
        <li>
          <strong>Solving Laplace's equation.</strong> Cauchy's
          formula gives the value of a harmonic function at any
          interior point as an integral over the boundary —
          essentially solving the Dirichlet problem. The same
          idea (Poisson kernel) generalises to give the harmonic
          extension of any boundary data.
        </li>
        <li>
          <strong>Quantum field theory.</strong> Path integrals over
          field configurations involve contour-integral techniques.
          The "Wick rotation" between Euclidean and Lorentzian
          actions is a contour deformation in the complex time
          plane. Saddle points and steepest-descent contours are
          how we compute partition functions.
        </li>
        <li>
          <strong>Riemann surfaces &amp; holomorphic functions.</strong>{" "}
          A holomorphic function on a compact Riemann surface
          (e.g. a torus) must be constant — a generalisation of
          Liouville. Non-constant maps must have poles. The
          theory of meromorphic functions on Riemann surfaces is
          the start of complex algebraic geometry.
        </li>
        <li>
          <strong>Number theory.</strong> Riemann's analytic
          continuation of <InlineMath math="\zeta(s)" /> uses contour
          integration. The functional equation for{" "}
          <InlineMath math="\zeta" /> falls out from a clever
          contour deformation. Lots of modern analytic number theory
          rests on this.
        </li>
      </ul>

      <p>
        Final chapter of complex analysis: residues. We'll learn how
        to compute contour integrals around singularities, then turn
        the technique on real integrals to evaluate them in closed
        form — including some that don't have antiderivatives in
        elementary functions.
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
      "By Cauchy's theorem, $\\oint_\\gamma f(z) \\, dz$ is zero whenever…",
    options: [
      "$f$ is bounded",
      "$f$ is holomorphic on and inside $\\gamma$ (with $\\gamma$ in a simply-connected domain)",
      "$\\gamma$ is the unit circle",
      "$f(0) = 0$",
    ],
    correct: 1,
    explanation:
      "Cauchy's theorem requires $f$ holomorphic and the domain simply-connected so the contour can be contracted to a point. Outside these conditions, contour integrals can be nonzero (e.g. $\\oint 1/z \\, dz = 2\\pi i$).",
  },
  {
    prompt:
      "$\\oint_{|z| = 1} \\dfrac{1}{z} \\, dz$ equals…",
    options: ["0", "$2\\pi$", "$2\\pi i$", "$\\pi i$"],
    correct: 2,
    explanation:
      "Parameterise $z = e^{it}$: $\\oint = \\int_0^{2\\pi} (1/e^{it}) \\cdot i e^{it} \\, dt = \\int 0^{2\\pi} i \\, dt = 2\\pi i$. The singularity at the origin contributes.",
  },
  {
    prompt:
      "By Cauchy's integral formula with $f$ holomorphic and $\\gamma$ a CCW loop around $z_0$:",
    options: [
      "$f(z_0) = \\oint f(z) \\, dz$",
      "$f(z_0) = \\frac{1}{2\\pi i} \\oint f(z) / (z - z_0) \\, dz$",
      "$f'(z_0) = \\oint f(z) / (z - z_0) \\, dz$",
      "$f(z_0) = 0$",
    ],
    correct: 1,
    explanation:
      "Cauchy's integral formula: the value at any interior point is recoverable from boundary values, weighted by $1/(z - z_0)$.",
  },
  {
    prompt:
      "Liouville's theorem says…",
    options: [
      "every entire function has a root",
      "a bounded entire function is constant",
      "every non-constant entire function has infinitely many zeros",
      "every holomorphic function is integrable",
    ],
    correct: 1,
    explanation:
      "If $|f| \\leq M$ everywhere and $f$ is entire, $f$ must be constant. The Cauchy estimate for $f'$ on a large circle vanishes as the radius grows.",
  },
  {
    prompt:
      "By Liouville + a quick argument, the Fundamental Theorem of Algebra states:",
    options: [
      "every quadratic has a real root",
      "every degree-$n$ polynomial has at most $n$ roots",
      "every non-constant polynomial with complex coefficients has at least one complex root",
      "polynomials are dense in continuous functions",
    ],
    correct: 2,
    explanation:
      "Apply Liouville to $1/p(z)$: if $p$ never vanishes, $1/p$ is bounded entire, hence constant — contradiction unless $p$ is constant. So every non-constant polynomial has a complex root.",
  },
];
