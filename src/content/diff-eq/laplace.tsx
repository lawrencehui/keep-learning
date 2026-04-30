import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function LaplaceBody() {
  return (
    <>
      <p>
        The Laplace transform converts differential equations into{" "}
        <em>algebraic equations</em>. Take an ODE in the time domain,
        Laplace-transform both sides, manipulate the resulting
        algebra, and inverse-transform to recover the time-domain
        solution. The differentiation operator{" "}
        <InlineMath math="d/dt" /> becomes the simple multiplication
        by <InlineMath math="s" />, so a chain of nested derivatives
        collapses to a polynomial. For initial-value problems, the
        Laplace transform also tucks the initial conditions
        <em>into</em> the algebra automatically — you don't fit
        constants at the end.
      </p>
      <p>
        Engineers love it because it turns block-diagram analysis
        into routine. Control theory, signal processing, and circuit
        analysis use Laplace (and its discrete-time cousin, the{" "}
        <InlineMath math="z" />-transform) constantly. We'll cover
        the definition, the standard table, the key properties,
        solving IVPs, and the convolution theorem — enough to
        recognise it when you see it in physics or engineering
        contexts.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.03 — Lectures 19–24 (Laplace transform)",
            author: "Prof. Arthur Mattuck (MIT OCW)",
            duration: "~6h",
            url: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
            note: "Standard treatment. Mattuck handles the inverse transform with unusual clarity.",
          },
          {
            title: "Khan Academy — Laplace transform",
            author: "Sal Khan",
            duration: "~5h, short videos",
            url: "https://www.khanacademy.org/math/differential-equations/laplace-transform",
            note: "Step-by-step worked examples. Ideal if you want a slow build-up to the table.",
          },
          {
            title: "Boyce & DiPrima — Elementary Diff Eqs, ch. 6",
            author: "Boyce / DiPrima",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Boyce_and_DiPrima",
            note: "Standard textbook treatment with hundreds of practice problems.",
          },
          {
            title: "What is the Laplace transform? (intuition)",
            author: "Zach Star / various YouTube",
            duration: "10–20 min",
            url: "https://www.youtube.com/results?search_query=intuition+laplace+transform",
            note: "Several friendly intuitions for what's going on inside the integral.",
          },
          {
            title: "Astrom & Murray — Feedback Systems, ch. 6",
            author: "Astrom / Murray",
            duration: "Reading (free PDF)",
            url: "https://www.cds.caltech.edu/~murray/amwiki/index.php?title=Second_Edition",
            note: "If you want to see Laplace in its native engineering habitat.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Definition</h2>

      <p>
        Given a function <InlineMath math="f(t)" /> defined for{" "}
        <InlineMath math="t \geq 0" />, its{" "}
        <strong>Laplace transform</strong> is
      </p>
      <BlockMath math="\mathcal{L}\{f\}(s) = F(s) = \int_0^{\infty} e^{-st} f(t)\,dt." />
      <p>
        It's a function of the new variable <InlineMath math="s" />,
        which lives in the <em>complex</em> plane. The integral
        converges only for <InlineMath math="\operatorname{Re}(s)" />{" "}
        large enough — specifically, larger than the exponential
        growth rate of <InlineMath math="f" />.
      </p>

      <p>
        Worked computation:{" "}
        <InlineMath math="\mathcal{L}\{1\}" />.
      </p>
      <BlockMath math="\int_0^{\infty} e^{-st}\,dt = \left[-\frac{e^{-st}}{s}\right]_0^{\infty} = \frac{1}{s}, \quad \operatorname{Re}(s) > 0." />

      <p>
        Worked computation:{" "}
        <InlineMath math="\mathcal{L}\{e^{at}\}" />.
      </p>
      <BlockMath math="\int_0^{\infty} e^{-st} e^{at}\,dt = \int_0^{\infty} e^{-(s-a)t}\,dt = \frac{1}{s - a}, \quad \operatorname{Re}(s) > a." />

      <p>
        Already a pattern: simple time-domain functions become simple
        rational functions of <InlineMath math="s" />. The catalog
        below extends this.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The standard transform table</h2>

      <p>
        Memorise these. Real Laplace work consists of{" "}
        <em>recognition</em> — spotting that some s-domain
        expression is the transform of a known time-domain function,
        possibly after partial fractions.
      </p>

      <BlockMath math="\mathcal{L}\{1\} = \frac{1}{s}" />
      <BlockMath math="\mathcal{L}\{t^n\} = \frac{n!}{s^{n+1}} \quad (n \in \mathbb{N})" />
      <BlockMath math="\mathcal{L}\{e^{at}\} = \frac{1}{s - a}" />
      <BlockMath math="\mathcal{L}\{\sin\omega t\} = \frac{\omega}{s^2 + \omega^2}" />
      <BlockMath math="\mathcal{L}\{\cos\omega t\} = \frac{s}{s^2 + \omega^2}" />
      <BlockMath math="\mathcal{L}\{e^{at} \sin\omega t\} = \frac{\omega}{(s - a)^2 + \omega^2}" />
      <BlockMath math="\mathcal{L}\{e^{at} \cos\omega t\} = \frac{s - a}{(s - a)^2 + \omega^2}" />
      <BlockMath math="\mathcal{L}\{u(t - a)\} = \frac{e^{-as}}{s} \quad \text{(unit step)}" />
      <BlockMath math="\mathcal{L}\{\delta(t - a)\} = e^{-as} \quad \text{(Dirac delta)}" />

      <p>
        Note the structural fact: shifting by{" "}
        <InlineMath math="a" /> in time multiplies by{" "}
        <InlineMath math="e^{-as}" />; multiplying by{" "}
        <InlineMath math="e^{at}" /> in time shifts{" "}
        <InlineMath math="s \to s - a" />. The two forms of "shift
        theorem" are mirror images.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Properties</h2>

      <p>The properties that make Laplace useful for ODEs:</p>

      <ul>
        <li>
          <strong>Linearity:</strong>{" "}
          <InlineMath math="\mathcal{L}\{\alpha f + \beta g\} = \alpha F + \beta G" />.
        </li>
        <li>
          <strong>Derivative theorem:</strong>{" "}
          <InlineMath math="\mathcal{L}\{f'(t)\} = s F(s) - f(0)" />.
        </li>
        <li>
          <strong>Second derivative:</strong>{" "}
          <InlineMath math="\mathcal{L}\{f''(t)\} = s^2 F(s) - s f(0) - f'(0)" />.
        </li>
        <li>
          <strong><InlineMath math="n" />-th derivative:</strong>{" "}
          <InlineMath math="\mathcal{L}\{f^{(n)}\} = s^n F(s) - s^{n-1} f(0) - \cdots - f^{(n-1)}(0)" />.
        </li>
        <li>
          <strong>Frequency shift:</strong>{" "}
          <InlineMath math="\mathcal{L}\{e^{at} f(t)\} = F(s - a)" />.
        </li>
        <li>
          <strong>Time shift:</strong>{" "}
          <InlineMath math="\mathcal{L}\{u(t - a) f(t - a)\} = e^{-as} F(s)" />.
        </li>
        <li>
          <strong>Convolution:</strong>{" "}
          <InlineMath math="\mathcal{L}\{f \ast g\} = F(s) G(s)" />{" "}
          (Part 5).
        </li>
      </ul>

      <Callout title="The headline fact">
        <strong>Differentiation in time becomes multiplication by{" "}
        <InlineMath math="s" /> in the transform.</strong> That's the
        whole reason Laplace turns ODEs into algebra. Initial
        conditions ride along as additional terms in the derivative
        theorem.
      </Callout>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Solving an IVP with Laplace</h2>

      <p>
        Standard recipe:
      </p>
      <ol>
        <li>
          Take Laplace transform of the ODE, using the derivative
          theorem to absorb initial conditions.
        </li>
        <li>
          Solve the resulting algebraic equation for{" "}
          <InlineMath math="Y(s)" />.
        </li>
        <li>
          Decompose <InlineMath math="Y(s)" /> into pieces (partial
          fractions, completing the square).
        </li>
        <li>
          Inverse-transform each piece back to{" "}
          <InlineMath math="y(t)" />.
        </li>
      </ol>

      <h3>Worked example</h3>
      <p>
        Solve <InlineMath math="y' + 3y = 6" />,{" "}
        <InlineMath math="y(0) = 2" />.
      </p>
      <p>
        Laplace both sides:{" "}
        <InlineMath math="(s Y - y(0)) + 3 Y = 6/s" />.
      </p>
      <p>
        Plug in <InlineMath math="y(0) = 2" />:{" "}
        <InlineMath math="(s + 3) Y = 6/s + 2" />.
      </p>
      <BlockMath math="Y(s) = \frac{6}{s(s + 3)} + \frac{2}{s + 3}." />
      <p>
        Partial fractions on the first term:{" "}
        <InlineMath math="6/(s(s + 3)) = 2/s - 2/(s + 3)" />. So
      </p>
      <BlockMath math="Y(s) = \frac{2}{s} - \frac{2}{s + 3} + \frac{2}{s + 3} = \frac{2}{s}." />
      <p>
        Wait — the <InlineMath math="2/(s+3)" /> terms cancel. Inverse
        transform: <InlineMath math="y(t) = 2" />. Check: derivative
        is 0, so <InlineMath math="0 + 3 \cdot 2 = 6" /> ✓ and{" "}
        <InlineMath math="y(0) = 2" /> ✓. The Laplace method
        recognised that the steady-state was already the solution.
      </p>

      <h3>Second-order example</h3>
      <p>
        Solve <InlineMath math="y'' + 4y = 0" />,{" "}
        <InlineMath math="y(0) = 1" />,{" "}
        <InlineMath math="y'(0) = 0" />.
      </p>
      <p>
        Laplace:{" "}
        <InlineMath math="s^2 Y - s \cdot 1 - 0 + 4 Y = 0" />, so{" "}
        <InlineMath math="Y = s/(s^2 + 4)" />. Inverse transform via
        the table: <InlineMath math="y(t) = \cos(2t)" />. ∎
      </p>

      <Pitfall>
        Laplace assumes initial conditions at{" "}
        <InlineMath math="t = 0" />. For other initial points, shift
        time first or use a different transform. And it works on
        functions of <em>one</em> variable defined for{" "}
        <InlineMath math="t \geq 0" /> — for general PDE problems
        the relative is the Fourier transform.
      </Pitfall>

      <Exercise
        number="4.1"
        prompt={
          <>
            Use Laplace to solve <InlineMath math="y'' + y = 0" />{" "}
            with <InlineMath math="y(0) = 0" />,{" "}
            <InlineMath math="y'(0) = 1" />.
          </>
        }
      >
        <p>
          Laplace:{" "}
          <InlineMath math="s^2 Y - 0 - 1 + Y = 0" /> ⇒{" "}
          <InlineMath math="Y = 1 / (s^2 + 1)" />. Inverse:{" "}
          <InlineMath math="y(t) = \sin t" />. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Convolution</h2>

      <p>
        The <strong>convolution</strong> of two functions is
      </p>
      <BlockMath math="(f \ast g)(t) = \int_0^t f(\tau) g(t - \tau)\,d\tau." />
      <p>
        Convolution captures a "running average with a kernel" or
        "input filtered through a system" — it's the time-domain
        version of "filter and combine signals."
      </p>

      <Callout title="Convolution theorem">
        <BlockMath math="\mathcal{L}\{f \ast g\} = F(s) \, G(s)." />
      </Callout>
      <p>
        Convolution in time is multiplication in the transform
        domain. This is enormous: complicated convolution integrals
        become products of simpler functions, which is why Laplace
        (and Fourier) are the workhorses of signal processing.
      </p>

      <p>
        Example application. Suppose a linear system has{" "}
        <strong>impulse response</strong>{" "}
        <InlineMath math="h(t)" /> — the output when the input is a
        delta function. Then for any input{" "}
        <InlineMath math="x(t)" />, the output is{" "}
        <InlineMath math="y(t) = (h \ast x)(t)" />. In the
        Laplace domain, <InlineMath math="Y(s) = H(s) X(s)" /> — the{" "}
        <em>transfer function</em>{" "}
        <InlineMath math="H(s)" /> multiplies the input. This is the
        starting point of all classical control theory.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Inverse transform via partial fractions</h2>

      <p>
        Finding <InlineMath math="\mathcal{L}^{-1}\{F(s)\}" /> in
        general is hard (it's a contour integral in the complex
        plane — Bromwich integral). For rational{" "}
        <InlineMath math="F(s) = P(s) / Q(s)" /> with{" "}
        <InlineMath math="\deg P < \deg Q" />, partial fractions
        reduces to terms in the table.
      </p>

      <p>
        The recipe:
      </p>
      <ol>
        <li>
          Factor the denominator <InlineMath math="Q(s)" /> into
          linear and irreducible quadratic factors.
        </li>
        <li>
          Decompose <InlineMath math="P/Q" /> as a sum of simple
          fractions, one per factor (with multiplicity giving extra
          terms).
        </li>
        <li>
          Recognise each term in the table and inverse-transform.
        </li>
      </ol>

      <p>
        Worked example. Inverse-transform{" "}
        <InlineMath math="F(s) = (s + 4)/((s+1)(s+2))" />.
      </p>
      <p>
        Partial fractions:{" "}
        <InlineMath math="F = A/(s+1) + B/(s+2)" />. Multiplying
        through and matching:{" "}
        <InlineMath math="s + 4 = A(s + 2) + B(s + 1)" />. Plug{" "}
        <InlineMath math="s = -1" />:{" "}
        <InlineMath math="3 = A" />. Plug{" "}
        <InlineMath math="s = -2" />:{" "}
        <InlineMath math="2 = -B" />, so{" "}
        <InlineMath math="B = -2" />.
      </p>
      <BlockMath math="F(s) = \frac{3}{s + 1} - \frac{2}{s + 2}, \quad f(t) = 3 e^{-t} - 2 e^{-2t}." />

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Control theory.</strong> The transfer function{" "}
          <InlineMath math="H(s)" /> of a system encodes its full
          input-output behaviour. Engineers analyse systems entirely
          in <InlineMath math="s" />-space — pole locations
          determine stability, zeros shape responses, and the loop
          gain at <InlineMath math="s = j\omega" /> determines
          whether feedback amplifies or stabilises. Robotics,
          autopilots, audio circuits, all rest on this.
        </li>
        <li>
          <strong>Circuit analysis.</strong> Resistors, capacitors,
          inductors all have nice impedances in the{" "}
          <InlineMath math="s" /> domain (<InlineMath math="R" />,{" "}
          <InlineMath math="1/(sC)" />,{" "}
          <InlineMath math="sL" />). Kirchhoff's laws plus these
          impedances solve any linear circuit by algebra.
        </li>
        <li>
          <strong>Probability.</strong> The{" "}
          <em>moment generating function</em>{" "}
          <InlineMath math="M_X(s) = \mathbb{E}[e^{sX}]" /> is the
          two-sided Laplace transform of a probability density.
          Convolution in densities (independent sums of random
          variables) becomes product of MGFs.
        </li>
        <li>
          <strong>Quantum field theory.</strong> Wick rotation
          (changing <InlineMath math="t \to -i\tau" />) connects
          time evolution with imaginary-time path integrals; the
          partition function in statistical mechanics is closely
          related to a Laplace transform of the energy density of
          states.
        </li>
      </ul>

      <p>
        Next chapter: systems of ODEs, where multiple unknowns
        evolve simultaneously. The matrix exponential from linear
        algebra finally cashes in, and we'll see phase portraits
        — the geometric pictures of dynamics that Strogatz built
        modern nonlinear dynamics on.
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
      "What is $\\mathcal{L}\\{e^{3t}\\}(s)$?",
    options: [
      "$\\dfrac{1}{s + 3}$",
      "$\\dfrac{1}{s - 3}$",
      "$\\dfrac{3}{s^2 + 9}$",
      "$\\dfrac{s}{s^2 - 9}$",
    ],
    correct: 1,
    explanation:
      "$\\mathcal{L}\\{e^{at}\\} = 1/(s - a)$. Here $a = 3$ — note the sign of $a$ in the denominator.",
  },
  {
    prompt:
      "By the derivative theorem, $\\mathcal{L}\\{f'(t)\\}$ equals…",
    options: [
      "$F(s) / s$",
      "$s F(s)$",
      "$s F(s) - f(0)$",
      "$F'(s)$",
    ],
    correct: 2,
    explanation:
      "Differentiation in time becomes multiplication by $s$, minus the initial value: $\\mathcal{L}\\{f'\\} = s F(s) - f(0)$. The $f(0)$ comes from the boundary term in integration by parts.",
  },
  {
    prompt:
      "Use Laplace to identify the inverse transform of $1/(s^2 + 4)$.",
    options: [
      "$\\cos 2t$",
      "$\\sin 2t / 2$",
      "$2 \\sin 2t$",
      "$e^{-2t}$",
    ],
    correct: 1,
    explanation:
      "$\\mathcal{L}\\{\\sin\\omega t\\} = \\omega / (s^2 + \\omega^2)$. With $\\omega = 2$, that's $2/(s^2+4)$. So $1/(s^2+4) = (1/2) \\cdot 2/(s^2+4)$, inverse-transforming to $(\\sin 2t)/2$.",
  },
  {
    prompt:
      "By the convolution theorem, $\\mathcal{L}\\{f \\ast g\\}$ equals…",
    options: [
      "$F(s) + G(s)$",
      "$F(s) \\cdot G(s)$",
      "$F(s) / G(s)$",
      "$F(s)^{G(s)}$",
    ],
    correct: 1,
    explanation:
      "Convolution in time becomes multiplication in the s-domain. This is what makes transfer functions and signal processing so neat.",
  },
  {
    prompt:
      "What's the chief reason Laplace turns linear ODEs with constant coefficients into algebra?",
    options: [
      "Laplace transforms multiply functions",
      "$\\mathcal{L}\\{f'\\} = s F(s) - f(0)$ — derivatives become multiplication by $s$, with initial conditions baked in",
      "It's only for first-order equations",
      "It removes initial conditions",
    ],
    correct: 1,
    explanation:
      "The derivative theorem turns $d/dt$ into multiplication by $s$, so $a y'' + b y' + c y$ becomes $a s^2 Y + b s Y + c Y$ minus terms involving the initial conditions — purely algebraic in $Y$.",
  },
];
