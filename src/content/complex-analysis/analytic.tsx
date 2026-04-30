import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function AnalyticBody() {
  return (
    <>
      <p>
        Complex differentiability looks like a routine extension of real
        differentiability — replace <InlineMath math="x" /> with{" "}
        <InlineMath math="z" /> in the limit definition and you're
        done. But in the complex plane, a derivative limit must give
        the same answer no matter which direction you approach from —{" "}
        and there are infinitely many directions, not just left and
        right. That extra rigidity has spectacular consequences:
        complex-differentiable functions are <em>analytic</em> (equal
        to their Taylor series), <em>infinitely differentiable</em>,
        and uniquely determined by their values on any small set. We'll
        unpack each of these claims and meet the Cauchy–Riemann
        equations — the local condition that detects holomorphicity.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.04 — lectures 4–8 (analytic functions, Cauchy–Riemann)",
            author: "Prof. Jeremy Orloff (MIT OCW)",
            duration: "~4h",
            url: "https://ocw.mit.edu/courses/18-04-complex-variables-with-applications-spring-2018/",
            note: "Lectures 4–8 derive Cauchy–Riemann and harmonic conjugates.",
          },
          {
            title: "Visual Complex Analysis — chs. 4–5",
            author: "Tristan Needham",
            duration: "Reading",
            url: "https://www.amazon.com/Visual-Complex-Analysis-25th-Anniversary/dp/0192868926",
            note: "The geometric/conformal view of holomorphicity.",
          },
          {
            title: "Cauchy–Riemann visualised",
            author: "Mathologer / various",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=cauchy+riemann+visualized",
            note: "Several short videos derive the equations from rotation invariance.",
          },
          {
            title: "Stein &amp; Shakarchi — chs. 1–2",
            author: "Stein / Shakarchi",
            duration: "Reading",
            url: "https://press.princeton.edu/books/hardcover/9780691113852/complex-analysis",
            note: "Tight rigorous treatment of analyticity and the relationship to power series.",
          },
          {
            title: "Conformal map gallery",
            author: "Wikipedia",
            duration: "Browse",
            url: "https://en.wikipedia.org/wiki/Conformal_map",
            note: "Beautiful visualisations of how holomorphic maps deform space.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Complex differentiability</h2>

      <p>
        A function <InlineMath math="f : U \subseteq \mathbb{C} \to \mathbb{C}" />{" "}
        is <strong>complex differentiable</strong> at a point{" "}
        <InlineMath math="z_0" /> if the limit
      </p>
      <BlockMath math="f'(z_0) = \lim_{h \to 0} \frac{f(z_0 + h) - f(z_0)}{h}" />
      <p>
        exists, where <InlineMath math="h \in \mathbb{C}" /> approaches{" "}
        zero from <em>any</em> direction. The result must be the same
        regardless of the direction of approach.
      </p>

      <p>
        That direction-independence is the crucial twist. In real
        analysis, "from the left" or "from the right" exhausts the
        possibilities. In <InlineMath math="\mathbb{C}" />,{" "}
        <InlineMath math="h" /> can come from any direction in the
        plane — and the limit must agree on all of them. Many
        innocent-looking functions fail this test.
      </p>

      <h3>The first counter-example: <InlineMath math="f(z) = \bar z" /></h3>

      <p>
        Conjugation. Innocent? Try the limit at any point{" "}
        <InlineMath math="z_0" />:
      </p>
      <BlockMath math="\frac{\overline{z_0 + h} - \overline{z_0}}{h} = \frac{\bar h}{h}." />

      <p>
        Approach from the real axis (<InlineMath math="h = t" /> real):{" "}
        <InlineMath math="\bar t / t = 1" />. Approach from the
        imaginary axis (<InlineMath math="h = i t" />):{" "}
        <InlineMath math="\overline{it}/(it) = -it/it = -1" />.
        Different. The limit doesn't exist; conjugation is not complex
        differentiable, anywhere.
      </p>

      <p>
        And yet conjugation is perfectly smooth as a map{" "}
        <InlineMath math="\mathbb{R}^2 \to \mathbb{R}^2" /> (
        <InlineMath math="(x, y) \mapsto (x, -y)" />). So{" "}
        <em>complex differentiable</em> is strictly stronger than{" "}
        <em>real differentiable in two variables</em>.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The Cauchy–Riemann equations</h2>

      <p>
        Write <InlineMath math="f(z) = u(x, y) + i v(x, y)" /> with
        real-valued <InlineMath math="u, v" /> and{" "}
        <InlineMath math="z = x + iy" />.
      </p>

      <p>
        Suppose <InlineMath math="f" /> is complex differentiable at{" "}
        <InlineMath math="z_0" />. Compute the derivative two ways —
        approaching <InlineMath math="z_0" /> along the real axis vs.
        the imaginary axis — and demand the answers agree.
      </p>

      <p>
        <strong>Real-axis approach</strong>{" "}
        (<InlineMath math="h = \Delta x \to 0" />):
      </p>
      <BlockMath math="f'(z_0) = \lim_{\Delta x \to 0} \frac{u(x_0 + \Delta x, y_0) + iv(x_0 + \Delta x, y_0) - u - iv}{\Delta x} = u_x + i v_x." />

      <p>
        <strong>Imaginary-axis approach</strong>{" "}
        (<InlineMath math="h = i \Delta y \to 0" />):
      </p>
      <BlockMath math="f'(z_0) = \lim_{\Delta y \to 0} \frac{u(x_0, y_0 + \Delta y) + iv(x_0, y_0 + \Delta y) - u - iv}{i\,\Delta y} = \frac{u_y + i v_y}{i} = v_y - i u_y." />

      <p>
        Setting these equal — real to real, imaginary to imaginary:
      </p>

      <Callout title="Cauchy–Riemann equations">
        <BlockMath math="u_x = v_y, \qquad u_y = -v_x." />
      </Callout>

      <p>
        These are necessary for complex differentiability. With a mild
        regularity assumption (continuous partials), they are also
        sufficient — Cauchy–Riemann + smoothness ⇒ complex
        differentiability.
      </p>

      <h3>Worked example</h3>
      <p>
        Verify <InlineMath math="f(z) = z^2" /> is complex
        differentiable.
      </p>
      <p>
        <InlineMath math="z^2 = (x + iy)^2 = (x^2 - y^2) + i(2xy)" />,
        so{" "}
        <InlineMath math="u = x^2 - y^2" /> and{" "}
        <InlineMath math="v = 2xy" />. Partials:
      </p>
      <BlockMath math="u_x = 2x, \;\; v_y = 2x \;\; \Rightarrow\;\; u_x = v_y\; ✓" />
      <BlockMath math="u_y = -2y, \;\; v_x = 2y \;\; \Rightarrow\;\; u_y = -v_x\; ✓" />
      <p>
        Cauchy–Riemann holds everywhere. <InlineMath math="z^2" /> is
        complex differentiable on all of <InlineMath math="\mathbb{C}" />.
        And we know <InlineMath math="(z^2)' = 2z" />, exactly as in real
        calculus.
      </p>

      <h3>Counter-example</h3>
      <p>
        Re-check <InlineMath math="f(z) = \bar z = x - iy" />:{" "}
        <InlineMath math="u = x" />,{" "}
        <InlineMath math="v = -y" />.{" "}
        <InlineMath math="u_x = 1" />,{" "}
        <InlineMath math="v_y = -1" /> — already broken (
        <InlineMath math="u_x \neq v_y" />). Conjugation fails Cauchy–
        Riemann at every point, confirming it isn't complex
        differentiable anywhere.
      </p>

      <Pitfall>
        Cauchy–Riemann is a <em>local</em> condition — it must hold at
        every point in the domain where you want analyticity. A
        function can be complex differentiable at <em>one</em> point
        and nowhere else (e.g.{" "}
        <InlineMath math="f(z) = |z|^2" /> is differentiable only at
        the origin). For the Cauchy theorem (next chapter) we need
        differentiability on an open set.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Holomorphic = analytic</h2>

      <p>
        A function complex-differentiable on an open set{" "}
        <InlineMath math="U" /> is called <strong>holomorphic</strong>{" "}
        on <InlineMath math="U" /> (or just "holomorphic" if{" "}
        <InlineMath math="U = \mathbb{C}" />). A function holomorphic
        on all of <InlineMath math="\mathbb{C}" /> is{" "}
        <strong>entire</strong>.
      </p>

      <p>
        A different but profound concept:{" "}
        <strong>analytic</strong> means equal to its Taylor series in
        a neighbourhood of every point. In real analysis, smooth
        functions are not always analytic — there exist{" "}
        <InlineMath math="C^\infty" /> functions whose Taylor series
        converge but to the wrong function. (Standard example:{" "}
        <InlineMath math="f(x) = e^{-1/x^2}" /> for{" "}
        <InlineMath math="x \neq 0" />,{" "}
        <InlineMath math="f(0) = 0" />. All derivatives at 0 vanish,
        so the Taylor series at 0 is identically 0 — but{" "}
        <InlineMath math="f \neq 0" />.)
      </p>

      <p>
        In complex analysis the situation is dramatically better:
      </p>

      <Callout title="The miracle of complex analysis">
        For functions of a complex variable,{" "}
        <em>holomorphic = analytic</em>. If <InlineMath math="f" /> is
        complex differentiable on an open set, it's automatically
        infinitely differentiable, and equal to its Taylor series in a
        neighbourhood of every point in that set.
      </Callout>

      <p>
        We'll prove this in the contour-integration chapter via Cauchy's
        integral formula. The intuition: complex differentiability is so
        restrictive that it pins down the function's behaviour
        everywhere from local data. There's no room for Taylor-series
        misbehaviour.
      </p>

      <h3>Consequences</h3>
      <ul>
        <li>
          <strong>Identity theorem.</strong> If two holomorphic
          functions on a connected open set agree on a sequence with
          a limit point in the set, they're identical. So{" "}
          <em>holomorphic functions are determined by tiny amounts of
          data</em>: knowing them on a short curve, or on a sequence
          accumulating somewhere, fixes them globally.
        </li>
        <li>
          <strong>Maximum modulus.</strong> A non-constant holomorphic
          function on a connected open set cannot attain a maximum of{" "}
          <InlineMath math="|f|" /> in the interior — only on the
          boundary. This is what makes "max-flow"-style arguments
          work in complex analysis.
        </li>
        <li>
          <strong>Liouville.</strong> A bounded entire function is
          constant. From this, an embarrassingly short proof of the
          Fundamental Theorem of Algebra falls out (see next chapter).
        </li>
      </ul>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Power series of complex functions</h2>

      <p>
        A power series <InlineMath math="\sum_{n=0}^{\infty} a_n (z - z_0)^n" /> in
        the complex variable converges in a disc:
      </p>

      <Callout title="Radius of convergence">
        Every complex power series has a (possibly zero or infinite){" "}
        <strong>radius of convergence</strong>{" "}
        <InlineMath math="R \in [0, \infty]" />: it converges
        absolutely for <InlineMath math="|z - z_0| < R" /> and diverges
        for <InlineMath math="|z - z_0| > R" />. The boundary{" "}
        <InlineMath math="|z - z_0| = R" /> needs case-by-case
        inspection.
      </Callout>

      <p>
        Inside the disc, the function is holomorphic and you can
        differentiate / integrate term-by-term.
      </p>

      <h3>The familiar Taylor series, now in <InlineMath math="\mathbb{C}" /></h3>

      <BlockMath math="e^z = \sum_{n=0}^{\infty} \frac{z^n}{n!} \quad (R = \infty)" />
      <BlockMath math="\sin z = \sum_{n=0}^{\infty} \frac{(-1)^n z^{2n+1}}{(2n+1)!} \quad (R = \infty)" />
      <BlockMath math="\cos z = \sum_{n=0}^{\infty} \frac{(-1)^n z^{2n}}{(2n)!} \quad (R = \infty)" />
      <BlockMath math="\frac{1}{1 - z} = \sum_{n=0}^{\infty} z^n \quad (R = 1)" />
      <BlockMath math="\log(1 + z) = \sum_{n=1}^{\infty} \frac{(-1)^{n+1} z^n}{n} \quad (R = 1)" />

      <p>
        Why <InlineMath math="1/(1-z)" /> has{" "}
        <InlineMath math="R = 1" />: there's a singularity at{" "}
        <InlineMath math="z = 1" />, distance 1 from the origin. The
        radius of convergence is exactly the distance to the nearest
        singularity.
      </p>

      <h3>Singularities limit the radius</h3>

      <p>
        Consider <InlineMath math="f(z) = 1/(1 + z^2)" /> as a real
        function. It's smooth on all of{" "}
        <InlineMath math="\mathbb{R}" /> — no problems anywhere. So why
        does its Taylor series at 0 only converge for{" "}
        <InlineMath math="|x| < 1" />?
      </p>

      <p>
        Looking at it as a complex function reveals the answer: the
        denominator vanishes at <InlineMath math="z = \pm i" />,{" "}
        distance 1 from the origin. Even though those are imaginary,
        they bound the disc of convergence in{" "}
        <InlineMath math="\mathbb{C}" /> — and hence on{" "}
        <InlineMath math="\mathbb{R}" />. Real-line behaviour is
        constrained by complex-plane singularities you can't see from
        the real line. This is one of the most beautiful facts in
        complex analysis.
      </p>

      <Exercise
        number="4.1"
        prompt={
          <>
            Find the radius of convergence of the Taylor series of{" "}
            <InlineMath math="1/(z^2 + 4)" /> at <InlineMath math="z = 0" />.
          </>
        }
      >
        <p>
          Singularities at <InlineMath math="z^2 = -4" />, i.e.{" "}
          <InlineMath math="z = \pm 2i" />, both at distance 2 from
          origin. Radius <InlineMath math="R = 2" />.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Harmonic functions</h2>

      <p>
        A function <InlineMath math="u : \mathbb{R}^2 \to \mathbb{R}" /> is{" "}
        <strong>harmonic</strong> if it satisfies Laplace's equation:
      </p>
      <BlockMath math="\Delta u = u_{xx} + u_{yy} = 0." />

      <p>
        Harmonic functions describe steady-state heat distributions,
        electrostatic potentials in 2D charge-free regions,
        gravitational potentials in matter-free regions, and the shape
        of a soap film stretched on a wire boundary.
      </p>

      <Callout title="Harmonic ↔ holomorphic">
        If <InlineMath math="f = u + iv" /> is holomorphic, then{" "}
        <InlineMath math="u" /> and <InlineMath math="v" /> are both
        harmonic. Conversely, every harmonic{" "}
        <InlineMath math="u" /> on a simply-connected open set has a{" "}
        <em>harmonic conjugate</em>{" "}
        <InlineMath math="v" /> such that{" "}
        <InlineMath math="f = u + iv" /> is holomorphic.
      </Callout>

      <p>
        Why: differentiate Cauchy–Riemann.{" "}
        <InlineMath math="u_x = v_y" /> ⇒{" "}
        <InlineMath math="u_{xx} = v_{yx}" />.{" "}
        <InlineMath math="u_y = -v_x" /> ⇒{" "}
        <InlineMath math="u_{yy} = -v_{xy}" />. Adding (mixed partials
        commute):{" "}
        <InlineMath math="u_{xx} + u_{yy} = v_{yx} - v_{xy} = 0" />. So{" "}
        <InlineMath math="u" /> is harmonic. Similarly for{" "}
        <InlineMath math="v" />.
      </p>

      <p>
        This is the source of complex analysis's power for 2D physics
        problems. Steady-state heat flow without sources is a harmonic
        function; that means it's the real part of some holomorphic
        function. Find that holomorphic function (often via conformal
        mapping, Part 6) and you've solved the heat problem.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Conformal maps</h2>

      <p>
        At every point where{" "}
        <InlineMath math="f'(z_0) \neq 0" />, a holomorphic function
        acts <em>locally</em> like a rotation + scaling — multiplication
        by the complex number <InlineMath math="f'(z_0)" />. In
        particular, it preserves <em>angles</em> between curves at{" "}
        <InlineMath math="z_0" /> (with sense). Maps with this property
        are called <strong>conformal</strong>.
      </p>

      <p>
        Conformal maps are spectacular for boundary-value problems:
        you can deform a complicated domain into a simple one (a disc
        or half-plane), solve the Laplace equation there (where the
        solution is often known), then pull back to the original
        domain. This is how you compute the field around a sharp edge,
        the flow around an airplane wing, or the resistance of a
        circuit.
      </p>

      <p>
        Examples of conformal maps:
      </p>
      <ul>
        <li>
          <strong>Linear:</strong>{" "}
          <InlineMath math="z \mapsto az + b" /> — rotation, scaling,
          translation.
        </li>
        <li>
          <strong>Squaring:</strong>{" "}
          <InlineMath math="z \mapsto z^2" /> — wraps the upper half-
          plane onto all of <InlineMath math="\mathbb{C}" /> minus a
          slit.
        </li>
        <li>
          <strong>Möbius transformations</strong>{" "}
          <InlineMath math="z \mapsto (az + b)/(cz + d)" /> with{" "}
          <InlineMath math="ad - bc \neq 0" /> — map circles and
          lines to circles and lines. The basis of much of hyperbolic
          geometry.
        </li>
        <li>
          <strong>Joukowski transformation</strong>{" "}
          <InlineMath math="z \mapsto z + 1/z" /> — maps a disc to an
          aerofoil shape; used in classical aerodynamics for
          computing lift.
        </li>
      </ul>

      <Pitfall>
        Conformality fails at zeros of <InlineMath math="f'" />. At
        such points (<em>critical points</em>), angles get multiplied.{" "}
        <InlineMath math="z \mapsto z^2" /> doubles all angles at{" "}
        <InlineMath math="z = 0" /> because{" "}
        <InlineMath math="(z^2)' = 0" /> there.
      </Pitfall>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>2D physics by conformal map.</strong> Every steady-
          state field problem in 2D — electrostatics, heat,
          irrotational fluid flow — reduces to finding harmonic
          functions, which reduces to finding holomorphic functions.
          The classical method: conformally map to a known geometry,
          solve, map back.
        </li>
        <li>
          <strong>String theory.</strong> The world-sheet swept by a
          string is a 2D surface, and conformal field theory (the
          quantum theory of fields invariant under conformal maps)
          is the mathematical core of perturbative string theory. The
          Cauchy–Riemann equations show up as the equations of motion.
        </li>
        <li>
          <strong>Riemann surfaces &amp; algebraic geometry.</strong>{" "}
          The natural domain of multi-valued functions like{" "}
          <InlineMath math="\sqrt z" /> isn't <InlineMath math="\mathbb{C}" />{" "}
          but a different surface (the Riemann surface) where the
          function is single-valued. This led to algebraic geometry,
          modular forms, and a chunk of modern number theory.
        </li>
        <li>
          <strong>Quantum field theory.</strong> Wick rotation
          (<InlineMath math="t \to -i\tau" />) connects Lorentzian
          quantum field theories to Euclidean ones whose path integrals
          are tractable. The "Wick" in Wick rotation is exactly{" "}
          analytic continuation in a complex time parameter —
          pure complex analysis applied to quantum mechanics.
        </li>
        <li>
          <strong>Riemann zeta &amp; the prime number theorem.</strong>{" "}
          The zeta function <InlineMath math="\zeta(s) = \sum 1/n^s" />,
          extended analytically to almost all of{" "}
          <InlineMath math="\mathbb{C}" />, encodes the distribution of
          primes. The standard proof of PNT (Hadamard / de la Vallée
          Poussin, 1896) is a complex-analysis tour-de-force.
        </li>
      </ul>

      <p>
        Next chapter: contour integration, where holomorphic functions
        reveal their most striking property — the integral around any
        closed loop is determined by the function's behaviour at
        isolated singularities inside the loop.
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
      "The Cauchy–Riemann equations for $f(z) = u + iv$ are…",
    options: [
      "$u_x = u_y$ and $v_x = v_y$",
      "$u_x = v_y$ and $u_y = -v_x$",
      "$u_x = v_x$ and $u_y = v_y$",
      "$u + v = 0$",
    ],
    correct: 1,
    explanation:
      "Comparing real-axis and imaginary-axis approaches to $f'(z_0)$ gives $u_x = v_y$ and $u_y = -v_x$.",
  },
  {
    prompt:
      "Is $f(z) = \\bar z$ complex differentiable?",
    options: [
      "Yes, everywhere",
      "Yes, but only at the origin",
      "No — it fails Cauchy–Riemann",
      "Only on the real axis",
    ],
    correct: 2,
    explanation:
      "$u = x, v = -y$, so $u_x = 1, v_y = -1$ — Cauchy–Riemann fails at every point.",
  },
  {
    prompt:
      "If $u(x, y)$ is the real part of a holomorphic function, then $u$ is…",
    options: ["constant", "harmonic ($\\Delta u = 0$)", "always positive", "linear"],
    correct: 1,
    explanation:
      "Cauchy–Riemann + smoothness implies $u_{xx} + u_{yy} = 0$. Real and imaginary parts of holomorphic functions are harmonic.",
  },
  {
    prompt:
      "What's the radius of convergence of the Taylor series for $1/(1 - z^2)$ at $z = 0$?",
    options: ["0", "1", "2", "$\\infty$"],
    correct: 1,
    explanation:
      "Singularities at $z = \\pm 1$, both distance 1 from origin. $R = 1$.",
  },
  {
    prompt:
      "A holomorphic function is called \"conformal\" at points where…",
    options: [
      "$f' = 0$",
      "$f' \\neq 0$",
      "$f = 0$",
      "$f$ is real",
    ],
    correct: 1,
    explanation:
      "At points where $f'(z_0) \\neq 0$, the map is locally a rotation + scaling, preserving angles. At critical points where $f' = 0$, angles are multiplied.",
  },
];
