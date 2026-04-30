import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function FirstOrderBody() {
  return (
    <>
      <p>
        A <strong>differential equation</strong> is an equation
        relating a function to its derivatives. Most physical laws and
        every interesting dynamical system arrive in this form:
        Newton's second law{" "}
        <InlineMath math="m \ddot{\mathbf{x}} = \mathbf{F}" />, the
        Schrödinger equation{" "}
        <InlineMath math="i\hbar \, \partial_t \psi = \hat H \psi" />,
        radioactive decay <InlineMath math="\dot N = -\lambda N" />,
        population growth, the spread of an epidemic, the cooling of
        coffee, the ringing of a bell. Solving a differential equation
        means finding the function — i.e. recovering trajectories from
        rules.
      </p>
      <p>
        This chapter starts with the simplest case: <em>first-order
        ordinary</em> differential equations (ODEs), where the
        unknown is a single function of one variable and only the
        first derivative appears. We'll cover the four solvable
        templates (separable, linear, exact, integrating-factor),
        the geometric picture (direction fields), and what you do
        when no closed form exists (Euler's method, equilibrium
        analysis).
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.03 — Differential Equations (full course)",
            author: "Prof. Arthur Mattuck (MIT OCW)",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
            note: "The canonical first ODE course. Lectures 1–7 align with this chapter.",
          },
          {
            title: "Differential equations — overview",
            author: "3Blue1Brown",
            duration: "27 min",
            url: "https://www.youtube.com/watch?v=p_di4Zn4wz4",
            note: "Big-picture intuition for what an ODE is and why direction fields work.",
          },
          {
            title: "But what is a partial differential equation?",
            author: "3Blue1Brown",
            duration: "16 min",
            url: "https://www.youtube.com/watch?v=ly4S0oi3Yz8",
            note: "PDE preview — useful for context, even though this chapter is ODEs only.",
          },
          {
            title: "Boyce & DiPrima — Elementary Differential Equations",
            author: "Boyce / DiPrima",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Boyce_and_DiPrima",
            note: "Standard undergraduate textbook. Chapters 1–2 cover this material.",
          },
          {
            title: "Professor Leonard — Differential Equations playlist",
            author: "Professor Leonard",
            duration: "~30h, classroom recordings",
            url: "https://www.youtube.com/playlist?list=PLDesaqWTN6ESsmwELdrzhcGiRhk5DjwLP",
            note: "Slow, walked-through worked problems — good gym/commute material.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · What is an ODE?</h2>

      <p>
        An ODE is an equation of the form
      </p>
      <BlockMath math="F(x,\, y,\, y',\, y'',\, \dots,\, y^{(n)}) = 0" />
      <p>
        where <InlineMath math="y = y(x)" /> is the unknown function.
        The <strong>order</strong> of the ODE is the highest derivative
        that appears.
      </p>

      <p>Some terminology:</p>
      <ul>
        <li>
          <strong>Linear</strong> (in <InlineMath math="y" />):{" "}
          coefficients of <InlineMath math="y, y', \dots" /> are
          functions of <InlineMath math="x" /> only — no products like{" "}
          <InlineMath math="y \, y'" /> or{" "}
          <InlineMath math="\sin(y)" />.
        </li>
        <li>
          <strong>Homogeneous</strong>: the right-hand side is zero.{" "}
          <InlineMath math="y' + p(x) y = 0" /> is homogeneous;{" "}
          <InlineMath math="y' + p(x) y = q(x)" /> with{" "}
          <InlineMath math="q \neq 0" /> is non-homogeneous.
        </li>
        <li>
          <strong>Autonomous</strong>: no explicit{" "}
          <InlineMath math="x" /> on the right —{" "}
          <InlineMath math="y' = f(y)" />.
        </li>
      </ul>

      <p>
        A <strong>solution</strong> is any function{" "}
        <InlineMath math="y(x)" /> that satisfies the equation on some
        interval. Solutions usually form a family parameterised by
        constants; pinning the constants requires{" "}
        <strong>initial conditions</strong>:
      </p>
      <BlockMath math="y' = f(x, y), \quad y(x_0) = y_0." />
      <p>
        First-order ODE plus one initial condition specifies a unique
        solution under reasonable hypotheses (Picard–Lindelöf
        theorem). For higher-order equations, you need more initial
        conditions — <InlineMath math="n" /> conditions for an{" "}
        <InlineMath math="n" />-th order equation.
      </p>

      <p>
        <strong>Sanity check.</strong> The function{" "}
        <InlineMath math="y(x) = e^{x}" /> solves{" "}
        <InlineMath math="y' = y" />. Verify:{" "}
        <InlineMath math="y' = e^x = y" /> ✓. So does{" "}
        <InlineMath math="y(x) = C e^{x}" /> for any{" "}
        <InlineMath math="C" />. The initial condition{" "}
        <InlineMath math="y(0) = 3" /> picks out{" "}
        <InlineMath math="y(x) = 3 e^x" />.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Separable equations</h2>

      <p>
        A first-order ODE is{" "}
        <strong>separable</strong> if it can be written as
      </p>
      <BlockMath math="\frac{dy}{dx} = f(x) \, g(y)." />
      <p>
        Separate variables: divide by <InlineMath math="g(y)" /> and
        multiply by <InlineMath math="dx" /> (treating{" "}
        <InlineMath math="dy/dx" /> as a fraction —{" "}
        Leibniz's notation rewards us):
      </p>
      <BlockMath math="\frac{dy}{g(y)} = f(x)\,dx." />
      <p>
        Now integrate both sides:
      </p>
      <BlockMath math="\int \frac{dy}{g(y)} = \int f(x)\,dx + C." />
      <p>
        That gives an implicit equation for <InlineMath math="y" />,
        which you may or may not be able to solve explicitly. Either
        way, the integration is the entire content of the method.
      </p>

      <h3>Worked example: exponential growth</h3>

      <p>
        Population <InlineMath math="N(t)" /> grows at a rate
        proportional to itself: <InlineMath math="dN/dt = kN" />.
        Separate:{" "}
        <InlineMath math="dN/N = k\,dt" />. Integrate:{" "}
        <InlineMath math="\ln |N| = kt + C" />. Exponentiate:{" "}
        <InlineMath math="N(t) = A e^{kt}" /> (where{" "}
        <InlineMath math="A = e^C" /> can be any nonzero
        constant; <InlineMath math="A = 0" /> recovers the trivial
        zero solution). With initial condition{" "}
        <InlineMath math="N(0) = N_0" />, the solution is{" "}
        <InlineMath math="N(t) = N_0 e^{kt}" />.
      </p>

      <h3>Worked example: logistic growth</h3>

      <p>
        Real populations don't grow forever. The logistic model adds
        a carrying capacity <InlineMath math="K" />:
      </p>
      <BlockMath math="\frac{dN}{dt} = rN \left(1 - \frac{N}{K}\right)." />
      <p>
        Separate (with partial fractions for the inner integral):
      </p>
      <BlockMath math="\frac{dN}{N(1 - N/K)} = r\,dt." />
      <BlockMath math="\int \left(\frac{1}{N} + \frac{1}{K - N}\right)dN = r\,dt." />
      <p>
        After integration and algebra:
      </p>
      <BlockMath math="N(t) = \frac{K}{1 + A e^{-rt}}" />
      <p>
        where <InlineMath math="A = (K - N_0)/N_0" />. As{" "}
        <InlineMath math="t \to \infty" />,{" "}
        <InlineMath math="N \to K" />: the population saturates at the
        carrying capacity. The same equation models the spread of a
        rumour, infectious disease (the SI model), and the adoption
        curve of new technologies.
      </p>

      <Exercise
        number="2.1"
        prompt={
          <>
            Solve <InlineMath math="dy/dx = x y^2" /> with{" "}
            <InlineMath math="y(0) = 1" />.
          </>
        }
      >
        <p>
          Separable: <InlineMath math="y^{-2} \, dy = x\,dx" />.
          Integrate:{" "}
          <InlineMath math="-1/y = x^2/2 + C" />. Initial condition{" "}
          <InlineMath math="y(0) = 1" /> gives{" "}
          <InlineMath math="-1 = 0 + C" />, so{" "}
          <InlineMath math="C = -1" />. Thus{" "}
          <InlineMath math="-1/y = x^2/2 - 1" />, i.e.{" "}
          <InlineMath math="y(x) = 2 / (2 - x^2)" />. Note the solution
          blows up at <InlineMath math="x = \sqrt 2" /> — solutions
          don't always exist for all <InlineMath math="x" />.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · First-order linear equations &amp; integrating factor</h2>

      <p>
        A first-order linear ODE has the form
      </p>
      <BlockMath math="\frac{dy}{dx} + p(x) \, y = q(x)." />
      <p>
        The trick: multiply both sides by the{" "}
        <strong>integrating factor</strong>
      </p>
      <BlockMath math="\mu(x) = e^{\int p(x)\,dx}." />
      <p>
        Then the left side becomes a perfect derivative:
      </p>
      <BlockMath math="\mu y' + \mu p y = (\mu y)'." />
      <p>
        Verify by the product rule:{" "}
        <InlineMath math="(\mu y)' = \mu y' + \mu' y" />, and by
        construction{" "}
        <InlineMath math="\mu' = p \mu" />. With the left side
        collapsed,
      </p>
      <BlockMath math="(\mu y)' = \mu \, q(x), \quad \mu y = \int \mu(x) q(x)\,dx + C." />
      <p>
        Then divide by <InlineMath math="\mu" />.
      </p>

      <h3>Worked example: Newton's law of cooling</h3>

      <p>
        A cup of coffee at temperature <InlineMath math="T(t)" /> in a
        room at <InlineMath math="T_{\text{room}} = 20" /> cools at
        rate proportional to the temperature difference:
      </p>
      <BlockMath math="\frac{dT}{dt} = -k (T - 20), \quad T(0) = 90." />
      <p>
        Rearrange: <InlineMath math="dT/dt + kT = 20k" />. Linear with{" "}
        <InlineMath math="p(t) = k" />. Integrating factor:{" "}
        <InlineMath math="\mu = e^{kt}" />. Then
      </p>
      <BlockMath math="(e^{kt} T)' = 20k\,e^{kt} \;\;\Rightarrow\;\; e^{kt} T = 20\,e^{kt} + C." />
      <p>
        So <InlineMath math="T(t) = 20 + C e^{-kt}" />. Initial:{" "}
        <InlineMath math="90 = 20 + C \Rightarrow C = 70" />.
      </p>
      <BlockMath math="T(t) = 20 + 70 \, e^{-kt}." />
      <p>
        Coffee approaches room temperature exponentially. Same
        differential equation models RC circuits charging/
        discharging, radioactive decay above background, and
        first-order chemical kinetics.
      </p>

      <Exercise
        number="3.1"
        prompt={
          <>
            Solve <InlineMath math="y' + 2y = 4" /> with{" "}
            <InlineMath math="y(0) = 0" />.
          </>
        }
      >
        <p>
          Linear, <InlineMath math="p = 2" />,{" "}
          <InlineMath math="\mu = e^{2x}" />.
        </p>
        <BlockMath math="(e^{2x} y)' = 4 e^{2x} \;\Rightarrow\; e^{2x} y = 2 e^{2x} + C \;\Rightarrow\; y = 2 + C e^{-2x}." />
        <p>
          Initial: <InlineMath math="0 = 2 + C \Rightarrow C = -2" />.
          Solution:{" "}
          <InlineMath math="y(x) = 2(1 - e^{-2x})" />. As{" "}
          <InlineMath math="x \to \infty" />,{" "}
          <InlineMath math="y \to 2" /> — that's the
          equilibrium (Part 6).
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Exact equations</h2>

      <p>
        A differential form{" "}
        <InlineMath math="M(x, y)\,dx + N(x, y)\,dy = 0" /> is{" "}
        <strong>exact</strong> if there is a potential function{" "}
        <InlineMath math="\phi(x, y)" /> with{" "}
        <InlineMath math="\partial \phi / \partial x = M" /> and{" "}
        <InlineMath math="\partial \phi / \partial y = N" />. Then the
        equation is just <InlineMath math="d\phi = 0" />, with
        solutions <InlineMath math="\phi(x, y) = C" /> (an implicit
        family of curves).
      </p>

      <p>
        Test for exactness: by Clairaut, this requires{" "}
        <InlineMath math="\partial M / \partial y = \partial N / \partial x" />
        . When the test holds, recover{" "}
        <InlineMath math="\phi" /> by integrating{" "}
        <InlineMath math="M" /> in <InlineMath math="x" />, then
        adjusting with a function of <InlineMath math="y" /> to match{" "}
        <InlineMath math="N" />.
      </p>

      <p>
        <strong>Worked example.</strong> Solve{" "}
        <InlineMath math="(2xy + 1)\,dx + (x^2 + 1)\,dy = 0" />.
      </p>
      <p>
        Test: <InlineMath math="M_y = 2x = N_x" /> ✓ exact. Find{" "}
        <InlineMath math="\phi" />:{" "}
        <InlineMath math="\phi = \int M\,dx = x^2 y + x + g(y)" />.
        Differentiate w.r.t.{" "}
        <InlineMath math="y" />:{" "}
        <InlineMath math="\phi_y = x^2 + g'(y) = N = x^2 + 1" />, so{" "}
        <InlineMath math="g'(y) = 1" /> and{" "}
        <InlineMath math="g(y) = y" />. Therefore{" "}
        <InlineMath math="\phi = x^2 y + x + y" /> and the implicit
        solution is <InlineMath math="x^2 y + x + y = C" />.
      </p>

      <Pitfall>
        Many ODEs are not exact as written but become so after
        multiplying by an <em>integrating factor</em>{" "}
        <InlineMath math="\mu(x, y)" />. Finding the right{" "}
        <InlineMath math="\mu" /> in general is hard; for first-order
        linear ODEs (Part 3), the integrating factor depends only on{" "}
        <InlineMath math="x" /> and is given by an explicit formula.
        Beyond that, integrating factors are an art.
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Direction fields &amp; Euler's method</h2>

      <p>
        Most ODEs <em>can't</em> be solved in closed form. Even when
        they can, the formula often hides what the solution{" "}
        <em>looks like</em>. The <strong>direction field</strong>{" "}
        gives a geometric picture without solving anything.
      </p>

      <p>
        For <InlineMath math="y' = f(x, y)" />, draw at each point{" "}
        <InlineMath math="(x, y)" /> a small line segment with
        slope <InlineMath math="f(x, y)" />. A solution curve through
        any point is the curve that "follows the slopes" — its
        tangent at every point matches the local direction. With the
        field drawn, you can sketch solution curves by eye.
      </p>

      <Callout title="Try it">
        Pick an ODE and the widget renders its direction field. Click
        anywhere to drop an initial condition; the integral curve is
        traced through the field by Euler's method.
      </Callout>

      <DirectionFieldWidget />

      <h3>Euler's method</h3>

      <p>
        The simplest numerical scheme. Discretise{" "}
        <InlineMath math="x" /> in steps of{" "}
        <InlineMath math="h" />. Use the slope to extrapolate:
      </p>
      <BlockMath math="x_{n+1} = x_n + h, \qquad y_{n+1} = y_n + h \cdot f(x_n, y_n)." />

      <p>
        That's just "follow the local tangent line for{" "}
        <InlineMath math="h" /> units, then re-check the slope and
        repeat." It converges to the true solution as{" "}
        <InlineMath math="h \to 0" /> (with global error{" "}
        <InlineMath math="O(h)" />). Real solvers use higher-order
        methods (Runge–Kutta, especially RK4) and adaptive step sizes,
        but the idea is the same.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Equilibria &amp; stability</h2>

      <p>
        For an autonomous equation <InlineMath math="y' = f(y)" />,
        equilibria are points <InlineMath math="y^*" /> where{" "}
        <InlineMath math="f(y^*) = 0" /> — the function "stops" there.
        Whether they're <em>stable</em> (nearby solutions tend
        towards them) or <em>unstable</em> depends on the sign of{" "}
        <InlineMath math="f" /> on either side, equivalently the sign
        of <InlineMath math="f'(y^*)" />:
      </p>
      <ul>
        <li>
          <InlineMath math="f'(y^*) < 0" />: stable equilibrium —
          nearby solutions decay toward <InlineMath math="y^*" />.
        </li>
        <li>
          <InlineMath math="f'(y^*) > 0" />: unstable — nearby
          solutions diverge away.
        </li>
        <li>
          <InlineMath math="f'(y^*) = 0" />: borderline; check the
          sign of <InlineMath math="f" /> directly.
        </li>
      </ul>

      <p>
        For the logistic equation <InlineMath math="N' = rN(1 - N/K)" />:
        equilibria at <InlineMath math="N = 0" /> (unstable) and{" "}
        <InlineMath math="N = K" /> (stable). Populations starting
        anywhere in <InlineMath math="(0, K)" /> rise to{" "}
        <InlineMath math="K" />. Above <InlineMath math="K" />, they
        fall to it. Below 0 (unphysical, but the math doesn't care),
        they go to <InlineMath math="-\infty" />.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Physics &amp; engineering.</strong> Newton's
          cooling, RC and RL circuits, terminal velocity with drag,
          radioactive decay, first-order chemical kinetics — all
          first-order ODEs with the same exponential solutions.
        </li>
        <li>
          <strong>Biology &amp; epidemiology.</strong> Population
          dynamics, the SI / SIS / SIR family of disease models,
          Lotka–Volterra predator–prey (a 2D system, next chapter).
        </li>
        <li>
          <strong>Economics.</strong> Continuously compounded
          interest, discounted cash flows, growth of capital under
          investment.
        </li>
        <li>
          <strong>Quantum mechanics.</strong> Time evolution of an
          unentangled state with a constant Hamiltonian:{" "}
          <InlineMath math="\dot{\boldsymbol\psi} = -i \hat H \boldsymbol\psi / \hbar" /> — a
          first-order linear vector ODE. Solution:{" "}
          <InlineMath math="\boldsymbol\psi(t) = e^{-i\hat H t / \hbar} \boldsymbol\psi(0)" />,
          a matrix exponential (Linear Algebra chapter 3).
        </li>
      </ul>

      <p>
        Next chapter: second-order linear ODEs, where damped
        oscillators, resonance, and the foundation of quantum
        harmonic oscillators all live.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: direction field
// ════════════════════════════════════════════════════════════

type ODE = "linear-decay" | "logistic" | "newton" | "shear";

const odes: Record<ODE, { f: (x: number, y: number) => number; latex: string; xRange: [number, number]; yRange: [number, number] }> = {
  "linear-decay": {
    f: (_x, y) => -y,
    latex: "y' = -y",
    xRange: [0, 5],
    yRange: [-3, 3],
  },
  logistic: {
    f: (_x, y) => y * (1 - y / 2),
    latex: "y' = y(1 - y/2)",
    xRange: [0, 5],
    yRange: [-0.5, 3],
  },
  newton: {
    f: (_x, y) => -(y - 1),
    latex: "y' = -(y - 1)",
    xRange: [0, 5],
    yRange: [-2, 4],
  },
  shear: {
    f: (x, _y) => x,
    latex: "y' = x",
    xRange: [-3, 3],
    yRange: [-3, 5],
  },
};

function DirectionFieldWidget() {
  const [key, setKey] = useState<ODE>("linear-decay");
  const [start, setStart] = useState<{ x: number; y: number } | null>({ x: 0.5, y: 2 });

  const ode = odes[key];
  const [xMin, xMax] = ode.xRange;
  const [yMin, yMax] = ode.yRange;

  const w = 360;
  const h = 280;
  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * w;
  const sy = (y: number) => h - ((y - yMin) / (yMax - yMin)) * h;

  const Nx = 16;
  const Ny = 12;
  const arrows: { x: number; y: number; slope: number }[] = [];
  for (let i = 0; i <= Nx; i++) {
    for (let j = 0; j <= Ny; j++) {
      const x = xMin + ((xMax - xMin) * i) / Nx;
      const y = yMin + ((yMax - yMin) * j) / Ny;
      arrows.push({ x, y, slope: ode.f(x, y) });
    }
  }

  const segLen = Math.min(w / Nx, h / Ny) * 0.4;

  // Euler integration
  const path: { x: number; y: number }[] = [];
  if (start) {
    let x = start.x;
    let y = start.y;
    path.push({ x, y });
    const hStep = 0.02;
    while (x < xMax && y > yMin && y < yMax) {
      const dy = ode.f(x, y);
      x += hStep;
      y += hStep * dy;
      path.push({ x, y });
      if (path.length > 800) break;
    }
    // Backwards
    let bx = start.x;
    let by = start.y;
    const back: { x: number; y: number }[] = [];
    while (bx > xMin && by > yMin && by < yMax) {
      const dy = ode.f(bx, by);
      bx -= hStep;
      by -= hStep * dy;
      back.push({ x: bx, y: by });
      if (back.length > 800) break;
    }
    path.unshift(...back.reverse());
  }

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(odes) as ODE[]).map((k) => (
            <button
              key={k}
              onClick={() => setKey(k)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                key === k
                  ? "border-accent-soft bg-ink-800 text-ink-50"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              <InlineMath math={odes[k].latex} />
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="w-full block touch-none cursor-crosshair"
            onPointerDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * (xMax - xMin) + xMin;
              const y = yMax - ((e.clientY - rect.top) / rect.height) * (yMax - yMin);
              setStart({ x, y });
            }}
          >
            {/* axes */}
            <line x1={0} y1={sy(0)} x2={w} y2={sy(0)} stroke="#2a2a37" strokeOpacity={0.5} />
            <line x1={sx(0)} y1={0} x2={sx(0)} y2={h} stroke="#2a2a37" strokeOpacity={0.5} />

            {/* direction field arrows */}
            {arrows.map((a, i) => {
              const len = Math.sqrt(1 + a.slope * a.slope);
              const ux = 1 / len;
              const uy = a.slope / len;
              const cx = sx(a.x);
              const cy = sy(a.y);
              const dx = (segLen / 2) * ux;
              const dy = (segLen / 2) * uy;
              return (
                <line
                  key={i}
                  x1={cx - dx}
                  y1={cy + dy}
                  x2={cx + dx}
                  y2={cy - dy}
                  stroke="#a78bfa"
                  strokeOpacity={0.5}
                  strokeWidth={1.2}
                />
              );
            })}

            {/* integral curve */}
            {start && path.length > 1 && (
              <path
                d={path.map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(" ")}
                fill="none"
                stroke="#22d3ee"
                strokeWidth={2}
              />
            )}

            {/* start point */}
            {start && (
              <circle cx={sx(start.x)} cy={sy(start.y)} r={4} fill="#fbbf24" stroke="#fff" strokeWidth={1} />
            )}
          </svg>
        </div>

        <p className="text-xs text-ink-400">
          Click anywhere to drop an initial condition. The cyan curve
          is the Euler-integrated solution through that point —
          forwards and backwards in <InlineMath math="x" />.
        </p>
      </div>
      <figcaption>
        Direction field for <InlineMath math={ode.latex} />. Each
        purple line shows the local slope. Solutions through any
        starting point flow tangentially through the field.
      </figcaption>
    </figure>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "What is the order of $y''' + (y')^2 + y = \\sin x$?",
    options: ["1", "2", "3", "4"],
    correct: 2,
    explanation:
      "The order is the highest derivative present. Here it's $y'''$ — third order. (And the equation is non-linear because of the $(y')^2$ term.)",
  },
  {
    prompt:
      "Solve $dy/dx = ky$ with $y(0) = y_0$.",
    options: [
      "$y = y_0 + kx$",
      "$y = y_0 e^{kx}$",
      "$y = y_0 \\sin(kx)$",
      "$y = k y_0 x^2$",
    ],
    correct: 1,
    explanation:
      "The simplest and most ubiquitous ODE: $y' = ky$. Separate, integrate, exponentiate. The result is exponential growth (or decay if $k < 0$).",
  },
  {
    prompt:
      "For the linear ODE $y' + p(x) y = q(x)$, the integrating factor is…",
    options: [
      "$e^{p(x)}$",
      "$e^{\\int p(x) \\, dx}$",
      "$\\int p(x) \\, dx$",
      "$1/p(x)$",
    ],
    correct: 1,
    explanation:
      "$\\mu = e^{\\int p \\, dx}$ — chosen so that $\\mu' = p \\mu$, which makes $(\\mu y)' = \\mu y' + p \\mu y$ a perfect derivative.",
  },
  {
    prompt:
      "An autonomous equation $y' = f(y)$ has a stable equilibrium at $y^*$ if…",
    options: [
      "$f(y^*) > 0$",
      "$f(y^*) = 0$ and $f'(y^*) < 0$",
      "$f(y^*) = 0$ and $f'(y^*) > 0$",
      "$y^* = 0$",
    ],
    correct: 1,
    explanation:
      "Equilibrium requires $f(y^*) = 0$. Stability: nearby solutions return, which requires $f$ to be positive just below and negative just above — captured by $f'(y^*) < 0$.",
  },
  {
    prompt:
      "Euler's method approximates $y' = f(x, y)$ by…",
    options: [
      "$y_{n+1} = y_n \\cdot f(x_n, y_n)$",
      "$y_{n+1} = y_n + h \\cdot f(x_n, y_n)$",
      "$y_{n+1} = h \\cdot f(x_n, y_n)$",
      "$y_{n+1} = y_n + h^2 \\cdot f(x_n, y_n)$",
    ],
    correct: 1,
    explanation:
      "Take a step along the local tangent line: new $y$ = old $y$ plus step size times slope. Higher-order methods refine the slope estimate.",
  },
];
