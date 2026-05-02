import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function SecondOrderBody() {
  return (
    <>
      <p>
        Second-order linear ODEs are where physics gets started.
        Newton's law <InlineMath math="m \ddot{x} = F" /> for a force
        depending only on position is a second-order equation. Add
        damping (friction, air resistance, electrical resistance) and
        you get the canonical{" "}
        <strong>damped harmonic oscillator</strong>:
      </p>
      <BlockMath math="m \ddot x + c \dot x + k x = 0." />
      <p>
        Mass-spring-damper, RLC circuit, pendulum (linearised), even
        the bond between two atoms — all the same equation. Add a
        driving force on the right and you get resonance, the
        phenomenon that lets opera singers shatter wine glasses and
        bridges sway in step with marching soldiers. After this
        chapter, the <em>quantum</em> harmonic oscillator (a future
        chapter) will look almost familiar — same algebra, different
        algebra-of-operators.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.03 — Lectures 9–18 (second-order, oscillators)",
            author: "Prof. Arthur Mattuck (MIT OCW)",
            duration: "~10h",
            url: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
            note: "Mattuck on damped oscillators is a teaching tour de force.",
          },
          {
            title: "Resonance — visualised",
            author: "3Blue1Brown",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=3blue1brown+oscillator+resonance",
            note: "Short, visual explorations of forced oscillators.",
          },
          {
            title: "Strogatz — Nonlinear Dynamics and Chaos, ch. 1",
            author: "Steven Strogatz",
            duration: "Reading",
            url: "https://www.stevenstrogatz.com/books/nonlinear-dynamics-and-chaos",
            note: "More intuition for stability and qualitative behaviour, even though Strogatz is mostly first-order.",
          },
          {
            title: "Boyce & DiPrima — Elementary Diff Eqs, chs. 3–4",
            author: "Boyce / DiPrima",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Boyce_and_DiPrima",
            note: "Standard textbook treatment with hundreds of worked problems.",
          },
          {
            title: "Forced harmonic motion — full lecture",
            author: "Walter Lewin (MIT 8.03)",
            duration: "~50 min",
            url: "https://ocw.mit.edu/courses/8-03-physics-iii-vibrations-and-waves-fall-2004/",
            note: "Physics-flavoured cousin of MIT 18.03. Lewin's demos are unforgettable.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · General theory</h2>

      <p>
        A second-order linear ODE has the form
      </p>
      <BlockMath math="a(x)\, y'' + b(x)\, y' + c(x)\, y = f(x)." />
      <p>
        We focus on the <strong>constant-coefficient</strong> case
        where <InlineMath math="a, b, c" /> are constants. With{" "}
        <InlineMath math="f \equiv 0" /> the equation is{" "}
        <em>homogeneous</em>; otherwise non-homogeneous.
      </p>

      <h3>Linearity and superposition</h3>

      <p>
        The key structural fact: solutions to a homogeneous linear
        ODE form a vector space. Specifically, if{" "}
        <InlineMath math="y_1" /> and <InlineMath math="y_2" /> are
        solutions to the homogeneous equation, so is any linear
        combination <InlineMath math="\alpha y_1 + \beta y_2" />.
      </p>

      <p>
        For an <InlineMath math="n" />-th order linear homogeneous
        ODE, the solution space has dimension exactly{" "}
        <InlineMath math="n" /> (assuming nice coefficients). A{" "}
        <strong>fundamental solution set</strong>{" "}
        <InlineMath math="\{y_1, y_2\}" /> for a second-order
        equation is a basis of this space — two linearly independent
        solutions. Every solution is a linear combination of them.
      </p>

      <p>
        For a non-homogeneous equation, the solution structure is
      </p>
      <BlockMath math="y_{\text{general}} = y_p + y_h," />
      <p>
        where <InlineMath math="y_p" /> is any{" "}
        <strong>particular</strong> solution to the non-homogeneous
        equation and <InlineMath math="y_h" /> is the general
        solution to the homogeneous version. The same{" "}
        "particular + homogeneous" decomposition you saw for{" "}
        <InlineMath math="A\mathbf{x} = \mathbf{b}" /> in linear
        algebra — same idea, infinite-dimensional.
      </p>

      <p>
        Two initial conditions pin down a unique solution:{" "}
        <InlineMath math="y(x_0) = y_0" /> and{" "}
        <InlineMath math="y'(x_0) = v_0" />.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Homogeneous constant-coefficient ODEs</h2>

      <p>
        For
      </p>
      <BlockMath math="a y'' + b y' + c y = 0," />
      <p>
        try the ansatz <InlineMath math="y = e^{rx}" />. Then{" "}
        <InlineMath math="y' = r e^{rx}" />,{" "}
        <InlineMath math="y'' = r^2 e^{rx}" />, and substituting:
      </p>
      <BlockMath math="(a r^2 + b r + c) e^{rx} = 0." />
      <p>
        Since <InlineMath math="e^{rx} \neq 0" />, we need{" "}
        <InlineMath math="ar^2 + br + c = 0" />. This is the{" "}
        <strong>characteristic equation</strong>. Its two roots tell
        us everything about the homogeneous solution. Three cases,
        depending on the discriminant{" "}
        <InlineMath math="\Delta = b^2 - 4ac" />.
      </p>

      <h3>Case 1: Two distinct real roots (<InlineMath math="\Delta > 0" />)</h3>

      <p>
        Roots <InlineMath math="r_1 \neq r_2" /> both real. Two linearly
        independent solutions: <InlineMath math="e^{r_1 x}" /> and{" "}
        <InlineMath math="e^{r_2 x}" />. General solution:
      </p>
      <BlockMath math="y(x) = C_1 e^{r_1 x} + C_2 e^{r_2 x}." />
      <p>
        Both terms are pure exponentials — no oscillation. This is
        the <em>overdamped</em> regime in mechanical language.
      </p>

      <h3>Case 2: Repeated root (<InlineMath math="\Delta = 0" />)</h3>

      <p>
        One repeated root <InlineMath math="r" />. Only{" "}
        <InlineMath math="e^{rx}" /> as one solution from the ansatz —
        we need a second, linearly independent one. The trick: try{" "}
        <InlineMath math="x e^{rx}" />. It works (verify by
        substitution). General solution:
      </p>
      <BlockMath math="y(x) = (C_1 + C_2 x) e^{rx}." />
      <p>
        This is the <em>critically damped</em> regime: the fastest
        possible decay without oscillation.
      </p>

      <h3>Case 3: Complex conjugate roots (<InlineMath math="\Delta < 0" />)</h3>

      <p>
        Roots <InlineMath math="r = \alpha \pm i \beta" /> with{" "}
        <InlineMath math="\alpha = -b/(2a)" /> and{" "}
        <InlineMath math="\beta = \sqrt{4ac - b^2}/(2a)" />. Using
        Euler's formula:
      </p>
      <BlockMath math="e^{(\alpha + i\beta)x} = e^{\alpha x}(\cos\beta x + i \sin\beta x)." />
      <p>
        Take real and imaginary parts to get two real solutions:
      </p>
      <BlockMath math="y(x) = e^{\alpha x} (C_1 \cos\beta x + C_2 \sin\beta x)." />
      <p>
        This is the <em>underdamped</em> regime: oscillation at
        frequency <InlineMath math="\beta" /> with envelope{" "}
        <InlineMath math="e^{\alpha x}" />. If{" "}
        <InlineMath math="\alpha < 0" /> the oscillation decays;
        if <InlineMath math="\alpha > 0" /> it grows; if{" "}
        <InlineMath math="\alpha = 0" /> it neither decays nor grows
        (pure simple harmonic motion).
      </p>

      <Exercise
        number="2.1"
        prompt={
          <>
            Solve <InlineMath math="y'' - 5y' + 6y = 0" /> with{" "}
            <InlineMath math="y(0) = 1" />,{" "}
            <InlineMath math="y'(0) = 0" />.
          </>
        }
      >
        <p>
          Char poly: <InlineMath math="r^2 - 5r + 6 = (r-2)(r-3)" />.
          Roots <InlineMath math="2, 3" /> (Case 1). General:{" "}
          <InlineMath math="y = C_1 e^{2x} + C_2 e^{3x}" />.
        </p>
        <p>
          ICs: <InlineMath math="C_1 + C_2 = 1" />,{" "}
          <InlineMath math="2C_1 + 3C_2 = 0" />. Solve:{" "}
          <InlineMath math="C_2 = -2 C_1 / 3" />, and{" "}
          <InlineMath math="C_1(1 - 2/3) = 1 \Rightarrow C_1 = 3" />,{" "}
          <InlineMath math="C_2 = -2" />.
        </p>
        <p>
          Solution:{" "}
          <InlineMath math="y(x) = 3 e^{2x} - 2 e^{3x}" />. Both
          exponentials grow, so the solution blows up — there's no
          stable equilibrium. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · The damped harmonic oscillator</h2>

      <p>
        The mass-spring-damper equation:
      </p>
      <BlockMath math="m \ddot x + c \dot x + k x = 0." />

      <p>
        Three constants — mass <InlineMath math="m" />, damping{" "}
        <InlineMath math="c" />, spring constant{" "}
        <InlineMath math="k" /> — collapse to two dimensionless
        quantities:
      </p>
      <ul>
        <li>
          <strong>Natural frequency</strong>{" "}
          <InlineMath math="\omega_0 = \sqrt{k/m}" /> — the rate at
          which it would oscillate with no damping.
        </li>
        <li>
          <strong>Damping ratio</strong>{" "}
          <InlineMath math="\zeta = c / (2 \sqrt{mk})" /> — how heavily
          damped, dimensionless.
        </li>
      </ul>

      <p>
        With these, the equation becomes{" "}
        <InlineMath math="\ddot x + 2 \zeta \omega_0 \dot x + \omega_0^2 x = 0" />,
        and the three damping regimes correspond to:
      </p>
      <ul>
        <li>
          <InlineMath math="\zeta < 1" />: <strong>underdamped</strong> —
          oscillation with decaying envelope.
        </li>
        <li>
          <InlineMath math="\zeta = 1" />: <strong>critically damped</strong> —
          fastest non-oscillatory decay.
        </li>
        <li>
          <InlineMath math="\zeta > 1" />: <strong>overdamped</strong> —
          two decaying exponentials, slower than critical.
        </li>
      </ul>

      <Callout title="Try it">
        Drag the sliders to set the spring constant and damping. The
        widget plots <InlineMath math="x(t)" /> from initial
        condition <InlineMath math="x(0) = 1, \dot x(0) = 0" /> and
        labels the regime.
      </Callout>

      <OscillatorWidget />

      <p>
        Critical damping is the fastest return to equilibrium without
        overshoot — which is why door closers and shock absorbers
        target it. Slightly underdamped systems overshoot and ring;
        slightly overdamped systems take longer to settle than
        critical. The textbook example: a screen door with a
        properly-tuned closer.
      </p>

      <h3>The undamped limit</h3>

      <p>
        Setting <InlineMath math="c = 0" /> gives{" "}
        <InlineMath math="m \ddot x + k x = 0" /> with characteristic
        roots <InlineMath math="r = \pm i \omega_0" />. Solution:
      </p>
      <BlockMath math="x(t) = A \cos(\omega_0 t) + B \sin(\omega_0 t) = R \cos(\omega_0 t - \phi)." />
      <p>
        Pure simple harmonic motion forever, with{" "}
        <InlineMath math="R = \sqrt{A^2 + B^2}" /> the amplitude and{" "}
        <InlineMath math="\phi = \arctan(B/A)" /> the phase. Energy
        is conserved exactly.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Non-homogeneous: forcing &amp; resonance</h2>

      <p>
        Add a driving force on the right:
      </p>
      <BlockMath math="m \ddot x + c \dot x + k x = F(t)." />
      <p>
        General solution = particular + homogeneous. Two methods to
        find a particular solution:
      </p>

      <h3>Method 1: Undetermined coefficients</h3>

      <p>
        Guess a form for <InlineMath math="y_p" /> based on{" "}
        <InlineMath math="F(t)" />, then solve for the constants.
      </p>

      <ul>
        <li>
          <InlineMath math="F = e^{at}" /> (<InlineMath math="a" /> not
          a root of char eq): try <InlineMath math="A e^{at}" />.
        </li>
        <li>
          <InlineMath math="F = \cos\omega t" /> or{" "}
          <InlineMath math="\sin\omega t" />: try{" "}
          <InlineMath math="A \cos\omega t + B \sin\omega t" />.
        </li>
        <li>
          <InlineMath math="F" /> a polynomial of degree{" "}
          <InlineMath math="n" />: try a polynomial of degree{" "}
          <InlineMath math="n" />.
        </li>
        <li>
          If the guess is already a solution to the homogeneous
          equation (resonance, see below), multiply by{" "}
          <InlineMath math="t" /> to break the degeneracy.
        </li>
      </ul>

      <h3>Method 2: Variation of parameters</h3>

      <p>
        General method that works for any forcing. If{" "}
        <InlineMath math="\{y_1, y_2\}" /> is a fundamental set, write{" "}
        <InlineMath math="y_p = u_1 y_1 + u_2 y_2" /> with{" "}
        <InlineMath math="u_1, u_2" /> functions to be determined,
        and solve a 2×2 linear system. Reach for it when undetermined
        coefficients doesn't apply.
      </p>

      <h3>Resonance</h3>

      <p>
        Drive an undamped oscillator at exactly its natural
        frequency:{" "}
        <InlineMath math="\ddot x + \omega_0^2 x = \cos(\omega_0 t)" />.
        The naive guess{" "}
        <InlineMath math="A \cos(\omega_0 t)" /> fails — it's already
        a homogeneous solution. The correct guess is{" "}
        <InlineMath math="t (A \cos\omega_0 t + B \sin\omega_0 t)" />:
        solutions grow linearly in time without bound. That's{" "}
        <strong>resonance</strong>: forcing in sync with the natural
        frequency pumps energy in faster than it can dissipate.
      </p>

      <p>
        With damping, the response amplitude is finite but peaks
        when the driving frequency is near (slightly below){" "}
        <InlineMath math="\omega_0" />. The peak height grows as{" "}
        <InlineMath math="\zeta \to 0" /> — small damping, large
        amplification. Famous applications:
      </p>
      <ul>
        <li>
          Tacoma Narrows Bridge (1940) — wind-driven resonance.
        </li>
        <li>
          Tuning fork / opera singer / wine glass — sound-driven
          resonance.
        </li>
        <li>
          MRI scanners — radio-frequency resonance with nuclear
          spin precession.
        </li>
        <li>
          Quantum atomic transitions — photon-driven resonance with
          electronic energy gaps.
        </li>
      </ul>

      <Pitfall>
        Don't try to "guess and check" through resonance without
        recognising it first. If your trial particular solution is a
        homogeneous solution, the equation will reduce to{" "}
        <InlineMath math="0 = F(t)" /> — useless. Always check whether
        the forcing frequency matches a homogeneous mode before
        picking the trial form.
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Initial value problems and energy</h2>

      <p>
        For the undamped oscillator, the energy
      </p>
      <BlockMath math="E = \tfrac{1}{2} m \dot x^2 + \tfrac{1}{2} k x^2" />
      <p>
        is conserved — <InlineMath math="dE/dt = m\dot x \ddot x + k x \dot x = \dot x (m\ddot x + k x) = 0" />{" "}
        by the equation of motion. Damping makes{" "}
        <InlineMath math="dE/dt = -c \dot x^2 \leq 0" /> — energy
        always decreases. Forcing pumps energy in.
      </p>
      <p>
        Conservation laws are why classical mechanics is so
        powerful. Hamilton, Lagrange, and Noether (next module on
        classical mechanics, Module XII) systematise this.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Mechanical engineering.</strong> Suspension design,
          MEMS resonators, vibration damping in skyscrapers (mass
          dampers tuned to the building's natural frequency).
        </li>
        <li>
          <strong>Electrical engineering.</strong> RLC circuits are{" "}
          <em>identical</em> equations — replace mass by inductance,
          damping by resistance, spring by inverse capacitance,
          position by charge. Filter design, oscillator circuits,
          radio tuning.
        </li>
        <li>
          <strong>Quantum harmonic oscillator.</strong> The classical
          equation <InlineMath math="\ddot x + \omega_0^2 x = 0" />{" "}
          becomes the operator equation{" "}
          <InlineMath math="\hat H = \hat p^2 / 2m + \tfrac 1 2 m \omega_0^2 \hat x^2" />.
          Eigenvalues <InlineMath math="E_n = \hbar \omega_0 (n + 1/2)" /> —
          equally spaced energy levels. The oscillator is the
          single most-used quantum system, the basis of every
          molecular vibration spectroscopy and quantum field theory.
        </li>
        <li>
          <strong>Bessel, Hermite, Legendre.</strong> Variable-
          coefficient second-order ODEs (next paragraph)
          define the special functions that appear in 3D quantum
          problems (the hydrogen atom radial equation is a
          particular variable-coefficient 2nd-order ODE).
        </li>
      </ul>

      <p>
        Variable-coefficient second-order ODEs (where the
        coefficients depend on <InlineMath math="x" />) are harder —
        they typically don't have closed-form solutions. Their
        analysis uses <em>power series methods</em>: substitute{" "}
        <InlineMath math="y = \sum c_n x^n" /> and recurse on
        coefficients. Bessel's equation, Legendre's equation, and
        Hermite's equation (which gives the Gaussian × polynomial
        wavefunctions of the quantum harmonic oscillator) are all
        analysed this way. We'll return to these in the QM chapters.
      </p>

      <p>
        Next chapter: Laplace transforms, an algebraic tool that
        converts second-order ODEs (and systems thereof) into
        linear-algebra problems. They're the practical engineer's
        ODE solver.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: damped oscillator
// ════════════════════════════════════════════════════════════

function OscillatorWidget() {
  const [m, setM] = useState(1);
  const [c, setC] = useState(0.4);
  const [k, setK] = useState(4);
  const [drive, setDrive] = useState(false);
  const [fAmp, setFAmp] = useState(0.5);
  const [fOmega, setFOmega] = useState(2);

  const omega0 = Math.sqrt(k / m);
  const zeta = c / (2 * Math.sqrt(m * k));

  let regime: string;
  let regimeColor: string;
  if (zeta < 0.99) {
    regime = `Underdamped (ζ = ${zeta.toFixed(2)} < 1)`;
    regimeColor = "#22d3ee";
  } else if (zeta < 1.01) {
    regime = `Critically damped (ζ ≈ 1)`;
    regimeColor = "#fbbf24";
  } else {
    regime = `Overdamped (ζ = ${zeta.toFixed(2)} > 1)`;
    regimeColor = "#a78bfa";
  }

  // Numerical integration (RK4)
  const tMax = 12;
  const dt = 0.02;
  const N = Math.floor(tMax / dt);
  const path: { t: number; x: number }[] = [];
  let x = 1;
  let v = 0;
  for (let i = 0; i <= N; i++) {
    const t = i * dt;
    path.push({ t, x });
    const F = drive ? fAmp * Math.cos(fOmega * t) : 0;
    // dx/dt = v, dv/dt = (F - c v - k x)/m
    const a1x = v;
    const a1v = (F - c * v - k * x) / m;

    const F2 = drive ? fAmp * Math.cos(fOmega * (t + dt / 2)) : 0;
    const x2 = x + (a1x * dt) / 2;
    const v2 = v + (a1v * dt) / 2;
    const a2x = v2;
    const a2v = (F2 - c * v2 - k * x2) / m;

    const x3 = x + (a2x * dt) / 2;
    const v3 = v + (a2v * dt) / 2;
    const a3x = v3;
    const a3v = (F2 - c * v3 - k * x3) / m;

    const F3 = drive ? fAmp * Math.cos(fOmega * (t + dt)) : 0;
    const x4 = x + a3x * dt;
    const v4 = v + a3v * dt;
    const a4x = v4;
    const a4v = (F3 - c * v4 - k * x4) / m;

    x += ((a1x + 2 * a2x + 2 * a3x + a4x) / 6) * dt;
    v += ((a1v + 2 * a2v + 2 * a3v + a4v) / 6) * dt;
  }

  const w = 360;
  const h = 220;
  let yMin = Math.min(...path.map((p) => p.x));
  let yMax = Math.max(...path.map((p) => p.x));
  yMin = Math.min(yMin, -1.2);
  yMax = Math.max(yMax, 1.2);
  const pad = (yMax - yMin) * 0.1;
  yMin -= pad;
  yMax += pad;

  const sx = (t: number) => (t / tMax) * w;
  const sy = (x: number) => h - ((x - yMin) / (yMax - yMin)) * h;

  const pathD = path
    .map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.t).toFixed(1)},${sy(p.x).toFixed(1)}`)
    .join(" ");

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
            <line x1={0} y1={sy(0)} x2={w} y2={sy(0)} stroke="#2a2a37" strokeOpacity={0.5} />
            <path d={pathD} fill="none" stroke={regimeColor} strokeWidth={2} />
          </svg>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <SlideRow label={`m = ${m.toFixed(2)}`} value={m} min={0.2} max={3} step={0.05} onChange={setM} />
          <SlideRow label={`c = ${c.toFixed(2)}`} value={c} min={0} max={6} step={0.05} onChange={setC} />
          <SlideRow label={`k = ${k.toFixed(2)}`} value={k} min={0.5} max={10} step={0.1} onChange={setK} />
        </div>

        <div className="flex items-center gap-3 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={drive}
              onChange={(e) => setDrive(e.target.checked)}
              className="accent-accent-soft"
            />
            <span className="text-ink-300">Forcing on</span>
          </label>
        </div>

        {drive && (
          <div className="grid grid-cols-2 gap-3">
            <SlideRow label={`F₀ = ${fAmp.toFixed(2)}`} value={fAmp} min={0} max={3} step={0.05} onChange={setFAmp} />
            <SlideRow label={`ω = ${fOmega.toFixed(2)}`} value={fOmega} min={0.2} max={6} step={0.05} onChange={setFOmega} />
          </div>
        )}

        <div
          className="text-sm rounded-lg px-3 py-2"
          style={{ background: regimeColor + "20", color: regimeColor }}
        >
          {regime} · ω₀ = {omega0.toFixed(2)}
        </div>
      </div>
      <figcaption>
        Position <InlineMath math="x(t)" /> from initial condition{" "}
        <InlineMath math="x(0) = 1, \dot x(0) = 0" />. Try sweeping
        damping <InlineMath math="c" /> to see the three regimes; turn
        on forcing and tune <InlineMath math="\omega" /> close to{" "}
        <InlineMath math="\omega_0" /> to see resonance.
      </figcaption>
    </figure>
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

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "The characteristic equation of $y'' - 4y' + 3y = 0$ has roots…",
    options: ["$1, 3$", "$2, -2$", "$1, -3$", "$-1, -3$"],
    correct: 0,
    explanation:
      "$r^2 - 4r + 3 = (r-1)(r-3) = 0$, so $r = 1, 3$. Solution: $C_1 e^x + C_2 e^{3x}$.",
  },
  {
    prompt:
      "If the characteristic equation has complex roots $\\alpha \\pm i\\beta$, the general solution is…",
    options: [
      "$C_1 e^{\\alpha x} + C_2 e^{\\beta x}$",
      "$e^{\\alpha x}(C_1 \\cos\\beta x + C_2 \\sin\\beta x)$",
      "$(C_1 + C_2 x) e^{\\alpha x}$",
      "$C_1 \\cos\\alpha x + C_2 \\sin\\beta x$",
    ],
    correct: 1,
    explanation:
      "Real and imaginary parts of $e^{(\\alpha + i\\beta)x}$ via Euler's formula give the cos/sin form, modulated by $e^{\\alpha x}$.",
  },
  {
    prompt:
      "A mass-spring-damper system with $\\zeta = 1$ is…",
    options: [
      "underdamped (oscillates)",
      "critically damped (fastest non-oscillatory return)",
      "overdamped (slow exponential decay)",
      "undamped (oscillates forever)",
    ],
    correct: 1,
    explanation:
      "$\\zeta = 1$ is exactly the critical case: repeated root, no oscillation, fastest possible decay without overshoot. Engineers tune for this in shock absorbers.",
  },
  {
    prompt:
      "Resonance occurs when…",
    options: [
      "the system is overdamped",
      "the driving frequency equals the natural frequency",
      "the system is non-linear",
      "the spring constant equals the damping",
    ],
    correct: 1,
    explanation:
      "Forcing at the natural frequency pumps energy in faster than it can dissipate (or, with no damping, indefinitely). The response amplitude is maximised — and unbounded with $\\zeta = 0$.",
  },
  {
    prompt:
      "The general solution to a non-homogeneous linear ODE is…",
    options: [
      "the particular solution alone",
      "the homogeneous solution alone",
      "particular + homogeneous (with arbitrary constants)",
      "particular × homogeneous",
    ],
    correct: 2,
    explanation:
      "Standard structure: any particular solution $y_p$ to the non-homogeneous equation, plus the general solution $y_h$ to the homogeneous equation, gives all solutions.",
  },
];
