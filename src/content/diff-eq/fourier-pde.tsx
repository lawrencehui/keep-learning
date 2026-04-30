import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function FourierPDEBody() {
  return (
    <>
      <p>
        Two new ideas in this final chapter of the differential
        equations module: <strong>Fourier series</strong>, which
        decompose periodic functions into sines and cosines, and{" "}
        <strong>partial differential equations</strong> (PDEs),
        equations involving partial derivatives of an unknown
        function of several variables. They turn out to be the same
        topic in disguise: the workhorse method for solving linear
        PDEs is{" "}
        <em>separation of variables</em>, which reduces a PDE to
        ODEs whose periodic-domain solutions are exactly Fourier
        series.
      </p>
      <p>
        We'll cover Fourier series for periodic functions, the
        Gibbs phenomenon (what happens at jumps), the three
        canonical PDEs (heat, wave, Laplace), separation of variables
        for the heat equation on a rod, and a preview of the Fourier
        transform — the continuous-frequency version that becomes
        the natural language for the Schrödinger equation in QM.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.03 — Lectures 31–35 (Fourier series, PDEs)",
            author: "Prof. Arthur Mattuck (MIT OCW)",
            duration: "~5h",
            url: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
            note: "End-of-course material on PDE methods.",
          },
          {
            title: "But what is a Fourier series? (3Blue1Brown)",
            author: "3Blue1Brown",
            duration: "25 min",
            url: "https://www.youtube.com/watch?v=r6sGWTCMz2k",
            note: "Visualises Fourier series via rotating epicycles. Worth watching once.",
          },
          {
            title: "But what is the Heat Equation?",
            author: "3Blue1Brown",
            duration: "27 min",
            url: "https://www.youtube.com/watch?v=ToIXSwZ1pJU",
            note: "Beautiful derivation of the heat equation and Fourier's solution. The setup for our Part 4.",
          },
          {
            title: "Stewart — Calculus, ch. 17",
            author: "James Stewart",
            duration: "Reading",
            url: "https://www.stewartcalculus.com/",
            note: "Applied treatment of basic Fourier series and PDE separation.",
          },
          {
            title: "Strauss — Partial Differential Equations: An Introduction",
            author: "Walter Strauss",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Walter_A._Strauss",
            note: "Excellent textbook for going deeper into PDEs once this chapter feels routine.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Fourier series</h2>

      <p>
        A function <InlineMath math="f" /> on{" "}
        <InlineMath math="[-\pi, \pi]" /> (or any interval, with
        appropriate scaling) can — under broad conditions — be
        written as
      </p>
      <BlockMath math="f(x) = \frac{a_0}{2} + \sum_{n = 1}^{\infty} \bigl( a_n \cos(nx) + b_n \sin(nx) \bigr)," />
      <p>
        with coefficients
      </p>
      <BlockMath math="a_n = \frac{1}{\pi} \int_{-\pi}^{\pi} f(x) \cos(nx)\,dx, \qquad b_n = \frac{1}{\pi} \int_{-\pi}^{\pi} f(x) \sin(nx)\,dx." />
      <p>
        The decomposition expresses any periodic function as a sum
        of pure tones. Engineers call <InlineMath math="n" /> a{" "}
        <em>harmonic</em> and <InlineMath math="a_n, b_n" /> the
        Fourier coefficients of the <InlineMath math="n" />-th
        harmonic.
      </p>

      <h3>Why the integral formulas work</h3>

      <p>
        The functions{" "}
        <InlineMath math="\{1, \cos x, \sin x, \cos 2x, \sin 2x, \dots\}" />{" "}
        are <strong>orthogonal</strong> with respect to the inner
        product
      </p>
      <BlockMath math="\langle f, g \rangle = \int_{-\pi}^{\pi} f(x) g(x)\,dx." />

      <p>
        Specifically:{" "}
        <InlineMath math="\int_{-\pi}^{\pi} \cos(mx) \cos(nx)\,dx = \pi \delta_{mn}" />{" "}
        for{" "}
        <InlineMath math="m, n \geq 1" />, similarly for sines, and
        sin–cos integrate to zero. So{" "}
        <InlineMath math="\{\cos(nx), \sin(nx)\}" /> (with{" "}
        <InlineMath math="1" />) form an <em>orthogonal basis</em> of
        the function space — and the coefficients{" "}
        <InlineMath math="a_n, b_n" /> are exactly inner products
        with the basis functions, exactly as in the linear-algebra
        chapter on inner products. Fourier series is{" "}
        <em>orthonormal expansion in an infinite-dimensional Hilbert
        space</em>.
      </p>

      <h3>Complex form</h3>

      <p>
        Combining sines and cosines into{" "}
        <InlineMath math="e^{inx}" /> using Euler's formula, the
        Fourier series gets cleaner:
      </p>
      <BlockMath math="f(x) = \sum_{n = -\infty}^{\infty} c_n \, e^{inx}, \qquad c_n = \frac{1}{2\pi} \int_{-\pi}^{\pi} f(x) e^{-inx}\,dx." />
      <p>
        Now <InlineMath math="n" /> ranges over all integers (
        positive and negative). The complex form is
        equivalent — the coefficients relate as{" "}
        <InlineMath math="a_n = c_n + c_{-n}" />,{" "}
        <InlineMath math="b_n = i(c_n - c_{-n})" /> — but it's nicer
        algebraically because <em>one</em> formula handles all{" "}
        <InlineMath math="n" />, and complex exponentials are the
        eigenfunctions of differentiation.
      </p>

      <Callout title="Try it">
        Watch the Fourier series of a square wave converge as you
        add more terms. Notice the ringing near the jumps — that's
        the Gibbs phenomenon.
      </Callout>

      <FourierWidget />

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Convergence &amp; the Gibbs phenomenon</h2>

      <p>
        Fourier series convergence is delicate — there are smooth
        functions, jump discontinuities, and outright pathological
        examples. Three useful flavours:
      </p>
      <ul>
        <li>
          <strong>Pointwise:</strong> at every continuity point, the
          partial sums converge to <InlineMath math="f" /> (Dirichlet,
          1829, for piecewise-smooth <InlineMath math="f" />). At a
          jump, they converge to the average of the left and right
          limits.
        </li>
        <li>
          <strong>Uniform:</strong> if{" "}
          <InlineMath math="f" /> is continuous and{" "}
          <InlineMath math="f'" /> is integrable, partial sums
          converge uniformly. Continuity required throughout.
        </li>
        <li>
          <strong>L²:</strong> for any{" "}
          <InlineMath math="f \in L^2" />, partial sums converge in
          mean-square. The Hilbert-space convergence is the
          easiest, and Parseval's identity{" "}
          <InlineMath math="\|f\|^2 = \sum |c_n|^2" /> holds.
        </li>
      </ul>

      <p>
        The <strong>Gibbs phenomenon</strong>: near a jump
        discontinuity, partial sums overshoot by about{" "}
        <InlineMath math="9\%" /> of the jump size, regardless of
        how many terms you add. The overshoot becomes localised but
        doesn't shrink. Visible as the "ears" near jumps in the
        widget above.
      </p>

      <Pitfall>
        Pointwise convergence at a jump: the Fourier series gives
        the <em>average</em> of the two sides, not the value of{" "}
        <InlineMath math="f" /> there. If{" "}
        <InlineMath math="f(0^-) = -1" /> and{" "}
        <InlineMath math="f(0^+) = 1" />, the partial sum at{" "}
        <InlineMath math="x = 0" /> tends to 0 as you add more
        terms — regardless of what <InlineMath math="f(0)" /> was
        defined to be.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Three classical PDEs</h2>

      <p>
        A <strong>partial differential equation</strong> involves
        partial derivatives of an unknown function of several
        variables. Three model equations together cover an enormous
        amount of physics:
      </p>

      <h3>The heat equation (parabolic)</h3>
      <BlockMath math="u_t = \alpha \nabla^2 u." />
      <p>
        <InlineMath math="u(\mathbf{x}, t)" /> is temperature (or
        concentration of a diffusing chemical, or the probability
        density of a Brownian motion). It says: the rate of change
        in time equals a constant times the spatial Laplacian.
        Solutions diffuse, smooth out, and decay toward equilibrium.
      </p>

      <h3>The wave equation (hyperbolic)</h3>
      <BlockMath math="u_{tt} = c^2 \nabla^2 u." />
      <p>
        <InlineMath math="u" /> is the displacement of a vibrating
        string, the pressure of a sound wave, the components of an
        electromagnetic wave. Solutions oscillate at speed{" "}
        <InlineMath math="c" />, conserving energy.
      </p>

      <h3>Laplace's equation (elliptic)</h3>
      <BlockMath math="\nabla^2 u = 0." />
      <p>
        Time-independent. Describes equilibrium temperatures,
        electrostatic potentials in charge-free regions,
        gravitational potentials in matter-free regions, the
        steady-state heat distribution. Solutions are{" "}
        <em>harmonic functions</em> — exceptionally smooth, with the{" "}
        "mean value property" (the value at any point equals the
        average over any sphere around it).
      </p>

      <p>
        These three are the <em>linear, second-order, constant-
        coefficient</em> PDEs in two variables, classified by the
        sign of the discriminant of the principal symbol — but for
        practical purposes you can recognise them by their physics:
        diffusion, oscillation, equilibrium.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Separation of variables</h2>

      <p>
        The classic recipe for solving a linear PDE on a rectangular
        / spherical / cylindrical domain. Look for solutions in the
        product form{" "}
        <InlineMath math="u(x, t) = X(x) T(t)" />, plug into the
        PDE, and exploit the fact that the equation will separate
        into ODEs for <InlineMath math="X" /> and{" "}
        <InlineMath math="T" />.
      </p>

      <p>
        We'll do the heat equation on a rod of length{" "}
        <InlineMath math="L" /> with both ends held at zero
        temperature.
      </p>

      <BlockMath math="u_t = \alpha u_{xx}, \quad u(0, t) = u(L, t) = 0, \quad u(x, 0) = f(x)." />

      <p>
        Try <InlineMath math="u = X(x) T(t)" />. Plug in:{" "}
        <InlineMath math="X T' = \alpha X'' T" />. Divide by{" "}
        <InlineMath math="\alpha X T" />:
      </p>
      <BlockMath math="\frac{T'(t)}{\alpha T(t)} = \frac{X''(x)}{X(x)}." />
      <p>
        Left side depends only on <InlineMath math="t" />, right
        only on <InlineMath math="x" />. The only way they can be
        equal is if both equal the same constant — call it{" "}
        <InlineMath math="-\lambda" />. The PDE has split into two
        ODEs:
      </p>
      <BlockMath math="X''(x) = -\lambda X(x), \qquad T'(t) = -\alpha \lambda T(t)." />

      <p>
        With boundary conditions{" "}
        <InlineMath math="X(0) = X(L) = 0" />, the eigenvalue
        problem for <InlineMath math="X" /> has solutions only for{" "}
        <InlineMath math="\lambda_n = (n\pi/L)^2" /> with{" "}
        <InlineMath math="n = 1, 2, 3, \dots" /> and{" "}
        <InlineMath math="X_n(x) = \sin(n\pi x / L)" />. For each{" "}
        <InlineMath math="n" />, the temporal equation gives{" "}
        <InlineMath math="T_n(t) = e^{-\alpha \lambda_n t}" />. So
        the elementary solutions are
      </p>
      <BlockMath math="u_n(x, t) = \sin\!\left(\frac{n\pi x}{L}\right) e^{-\alpha (n\pi/L)^2 t}." />

      <p>
        By linearity, any sum is a solution. The general solution
        is
      </p>
      <BlockMath math="u(x, t) = \sum_{n = 1}^{\infty} b_n \sin\!\left(\frac{n\pi x}{L}\right) e^{-\alpha (n\pi/L)^2 t}." />

      <p>
        Match the initial condition: at{" "}
        <InlineMath math="t = 0" />,{" "}
        <InlineMath math="u(x, 0) = \sum b_n \sin(n\pi x/L) = f(x)" />.
        That's a Fourier sine series — solve for{" "}
        <InlineMath math="b_n" /> by integration:
      </p>
      <BlockMath math="b_n = \frac{2}{L} \int_0^L f(x) \sin\!\left(\frac{n\pi x}{L}\right)dx." />

      <p>
        Done. We've solved a PDE by reducing it to an ODE
        eigenvalue problem (in space) plus a Fourier expansion of
        the initial data. The high-frequency modes (large{" "}
        <InlineMath math="n" />) decay fastest because the time
        factor <InlineMath math="e^{-\alpha n^2 \pi^2 t/L^2}" />{" "}
        kills them — that's why temperature distributions smooth
        out: high-frequency wiggles die off first.
      </p>

      <Exercise
        number="4.1"
        prompt={
          <>
            Apply the same procedure to the wave equation{" "}
            <InlineMath math="u_{tt} = c^2 u_{xx}" /> on{" "}
            <InlineMath math="[0, L]" /> with{" "}
            <InlineMath math="u(0, t) = u(L, t) = 0" />. What
            replaces the exponential decay in time?
          </>
        }
      >
        <p>
          Same separation gives{" "}
          <InlineMath math="X_n = \sin(n\pi x/L)" /> with{" "}
          <InlineMath math="\lambda_n = (n\pi/L)^2" />, and the
          temporal equation is{" "}
          <InlineMath math="T_n'' = -c^2 \lambda_n T_n" />, which is
          oscillatory:{" "}
          <InlineMath math="T_n(t) = A_n \cos(\omega_n t) + B_n \sin(\omega_n t)" />{" "}
          with{" "}
          <InlineMath math="\omega_n = c \, n\pi / L" />. So a
          vibrating string has discrete modes — the harmonics of a
          guitar — at frequencies that are integer multiples of the
          fundamental. Music is Fourier theory in physics costume.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · The Fourier transform (preview)</h2>

      <p>
        For functions on the entire real line (not periodic), the
        Fourier <em>series</em> generalises to the Fourier
        <em>transform</em>:
      </p>
      <BlockMath math="\hat f(k) = \int_{-\infty}^{\infty} f(x) \, e^{-i k x}\,dx," />
      <p>
        with inverse
      </p>
      <BlockMath math="f(x) = \frac{1}{2\pi} \int_{-\infty}^{\infty} \hat f(k) \, e^{i k x}\,dk." />

      <p>
        This is the limit of Fourier series as the period goes to
        infinity — the discrete sum over{" "}
        <InlineMath math="n" /> becomes an integral over a
        continuous frequency variable <InlineMath math="k" />. Same
        idea, infinite-dimensional version.
      </p>

      <p>
        Properties (which mirror the Laplace properties from the
        previous chapter):
      </p>
      <ul>
        <li>
          <InlineMath math="\widehat{f'}(k) = i k \, \hat f(k)" />.
        </li>
        <li>
          <InlineMath math="\widehat{f \ast g}(k) = \hat f(k) \, \hat g(k)" />.
        </li>
        <li>
          Plancherel:{" "}
          <InlineMath math="\int |f|^2 \, dx = \frac{1}{2\pi} \int |\hat f|^2 \, dk" />.
        </li>
        <li>
          Gaussians transform to Gaussians:{" "}
          <InlineMath math="\widehat{e^{-x^2/2}}(k) = \sqrt{2\pi} \, e^{-k^2/2}" />.
        </li>
      </ul>

      <p>
        The Fourier transform is the natural tool whenever a
        problem has translation invariance (the system doesn't care
        where the origin is). The momentum operator in quantum
        mechanics is exactly the Fourier-conjugate variable to
        position; we'll see this in QM.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · The Schrödinger equation</h2>

      <p>
        Time to start anticipating quantum mechanics. The
        Schrödinger equation for a particle in a potential is a PDE:
      </p>
      <BlockMath math="i\hbar \, \frac{\partial \psi}{\partial t} = -\frac{\hbar^2}{2m} \nabla^2 \psi + V(\mathbf{x}) \psi." />

      <p>
        It's like the heat equation with{" "}
        <InlineMath math="i" /> in front of the time derivative —
        which transforms diffusion into wave-like behaviour. (
        Mathematicians sometimes call it the "free Schrödinger
        equation" with imaginary time, or talk about Wick rotation
        between heat and Schrödinger equations.)
      </p>

      <p>
        Separation of variables in the time-independent case gives
        the <em>time-independent Schrödinger equation</em>:
      </p>
      <BlockMath math="-\frac{\hbar^2}{2m} \nabla^2 \psi + V \psi = E \psi," />
      <p>
        an eigenvalue problem for the Hamiltonian operator. The
        eigenvalues <InlineMath math="E_n" /> are the allowed
        energies; the eigenfunctions{" "}
        <InlineMath math="\psi_n" /> are the stationary states.
        This eigenproblem is the principal computation of all of
        non-relativistic quantum mechanics.
      </p>

      <p>
        For a free particle (<InlineMath math="V = 0" />), Fourier
        transforms diagonalise the equation — the Hamiltonian becomes{" "}
        <InlineMath math="\hbar^2 k^2 / (2m)" /> in{" "}
        <InlineMath math="k" />-space, the kinetic energy of a wave
        with momentum <InlineMath math="\hbar k" />. The full
        formalism of Fourier analysis maps directly onto quantum
        wavefunctions: position-space ↔ momentum-space is the
        position–momentum Fourier transform.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Signal processing.</strong> Fourier analysis
          underlies audio compression (MP3), image compression
          (JPEG via DCT), telecommunications (modulation), denoising,
          and everything in DSP.
        </li>
        <li>
          <strong>Physics — fields and waves.</strong> Solutions to
          Maxwell's equations in vacuum are sums of plane-wave
          modes — a Fourier expansion. Same for sound waves, water
          waves, seismic waves.
        </li>
        <li>
          <strong>Quantum mechanics.</strong> Energy eigenstates of
          a quantum system are Fourier-style eigenfunctions of the
          Hamiltonian. Free-particle wavefunctions are{" "}
          <InlineMath math="e^{ikx}" />. Position and momentum are
          Fourier-conjugate variables — that's where the
          uncertainty principle comes from.
        </li>
        <li>
          <strong>Quantum computing.</strong> The Quantum Fourier
          Transform is the heart of Shor's algorithm. It's the
          quantum analogue of the discrete Fourier transform, and
          its exponential speedup is what makes factoring large
          numbers tractable on a quantum computer.
        </li>
        <li>
          <strong>Probability.</strong> Characteristic functions are
          Fourier transforms of densities. The central limit
          theorem follows from the algebra of Fourier transforms.
        </li>
      </ul>

      <p>
        That closes Tier V. The path so far: Foundations → Calculus →
        Linear Algebra → Multivariable → Differential Equations.
        Five tiers of mathematics, each setting up the next. Tier
        VI (Number Theory), Tier VII (Probability), Tier VIII
        (Complex Analysis), and Tiers IX–XI cover analysis and
        algebra in the depth that quantum mechanics needs. Then
        Tier XII (Classical Mechanics) starts the physics journey
        and Tier XIV finally reaches quantum.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: Fourier square wave
// ════════════════════════════════════════════════════════════

type WaveKind = "square" | "sawtooth" | "triangle";

function FourierWidget() {
  const [N, setN] = useState(7);
  const [kind, setKind] = useState<WaveKind>("square");

  const w = 360;
  const h = 200;
  const xMin = -Math.PI;
  const xMax = Math.PI;
  const yMin = -1.4;
  const yMax = 1.4;
  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * w;
  const sy = (y: number) => h - ((y - yMin) / (yMax - yMin)) * h;

  const partial = (x: number): number => {
    let s = 0;
    if (kind === "square") {
      for (let n = 1; n <= N; n += 2) s += Math.sin(n * x) / n;
      return (4 / Math.PI) * s;
    } else if (kind === "sawtooth") {
      for (let n = 1; n <= N; n++) s += ((-1) ** (n + 1) * Math.sin(n * x)) / n;
      return 2 * s;
    } else {
      // triangle
      for (let n = 1; n <= N; n += 2) s += Math.cos(n * x) / (n * n);
      return (8 / (Math.PI * Math.PI)) * s;
    }
  };

  const truth = (x: number): number => {
    if (kind === "square") return x > 0 ? 1 : x < 0 ? -1 : 0;
    if (kind === "sawtooth") return x / Math.PI;
    // triangle: 1 − 2|x|/π
    return 1 - (2 * Math.abs(x)) / Math.PI;
  };

  const points = 240;
  const partialPath: string[] = [];
  const truthPath: string[] = [];
  let prevP = false;
  let prevT = false;
  for (let i = 0; i <= points; i++) {
    const x = xMin + ((xMax - xMin) * i) / points;
    const yp = partial(x);
    const yt = truth(x);
    if (isFinite(yp)) {
      partialPath.push(`${prevP ? "L" : "M"}${sx(x).toFixed(1)},${sy(yp).toFixed(1)}`);
      prevP = true;
    } else {
      prevP = false;
    }
    if (isFinite(yt)) {
      truthPath.push(`${prevT ? "L" : "M"}${sx(x).toFixed(1)},${sy(yt).toFixed(1)}`);
      prevT = true;
    } else {
      prevT = false;
    }
  }

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          {(["square", "sawtooth", "triangle"] as WaveKind[]).map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition capitalize ${
                kind === k
                  ? "border-accent-soft bg-ink-800 text-ink-50"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
            <line x1={0} y1={sy(0)} x2={w} y2={sy(0)} stroke="#2a2a37" strokeOpacity={0.5} />
            <line x1={sx(0)} y1={0} x2={sx(0)} y2={h} stroke="#2a2a37" strokeOpacity={0.5} />

            <path d={truthPath.join(" ")} fill="none" stroke="#fbbf24" strokeWidth={1.4} strokeOpacity={0.6} strokeDasharray="3 3" />
            <path d={partialPath.join(" ")} fill="none" stroke="#22d3ee" strokeWidth={2} />
          </svg>
        </div>

        <div>
          <div className="flex items-baseline justify-between text-xs text-ink-400 mb-1">
            <span>Number of harmonics</span>
            <span className="font-mono text-ink-200">N = {N}</span>
          </div>
          <input
            type="range"
            min={1}
            max={50}
            step={1}
            value={N}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full accent-accent-soft"
          />
        </div>

        <p className="text-xs text-ink-400">
          Yellow dashed: the true wave. Cyan: partial Fourier sum
          with <InlineMath math="N" /> terms. Watch how square and
          sawtooth waves develop overshoot near jumps (Gibbs); the
          triangle wave converges smoothly because it's continuous.
        </p>
      </div>
      <figcaption>
        Fourier partial sums approach the target wave as{" "}
        <InlineMath math="N \to \infty" />. The Gibbs ~9% overshoot
        near jumps doesn't go away even as <InlineMath math="N" />{" "}
        grows; it just becomes more localised.
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
      "What does the Fourier coefficient $b_n$ measure?",
    options: [
      "The amplitude of the $\\sin(nx)$ component of $f$",
      "The maximum value of $f$",
      "The integral of $f$",
      "The derivative of $f$ at the origin",
    ],
    correct: 0,
    explanation:
      "Fourier coefficients are inner products of $f$ with the basis functions: $b_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\sin(nx) \\, dx$ — the projection of $f$ onto $\\sin(nx)$.",
  },
  {
    prompt:
      "The heat equation $u_t = \\alpha u_{xx}$ describes…",
    options: [
      "oscillating waves",
      "diffusion / smoothing of an initial profile over time",
      "static equilibrium",
      "exponential growth in time",
    ],
    correct: 1,
    explanation:
      "Solutions to the heat equation diffuse: high-frequency components decay as $e^{-\\alpha k^2 t}$, smoothing the profile.",
  },
  {
    prompt:
      "Separation of variables for $u_t = \\alpha u_{xx}$ on $[0, L]$ with $u(0,t) = u(L,t) = 0$ gives spatial eigenfunctions…",
    options: [
      "$\\cos(n\\pi x / L)$",
      "$\\sin(n\\pi x / L)$",
      "$e^{n\\pi x / L}$",
      "constant",
    ],
    correct: 1,
    explanation:
      "Boundary conditions $X(0) = X(L) = 0$ pick out sines (cosines wouldn't vanish at $x = 0$). Eigenvalues $\\lambda_n = (n\\pi/L)^2$.",
  },
  {
    prompt:
      "The Gibbs phenomenon at a jump is a fixed-percentage overshoot of about…",
    options: ["1%", "5%", "9%", "30%"],
    correct: 2,
    explanation:
      "About 9% of the jump size. It doesn't shrink with more terms — it just gets concentrated near the jump.",
  },
  {
    prompt:
      "Under the Fourier transform, what does differentiation $\\partial_x$ become?",
    options: [
      "an integral",
      "multiplication by $i k$",
      "exponentiation",
      "convolution",
    ],
    correct: 1,
    explanation:
      "$\\widehat{f'}(k) = i k \\, \\hat f(k)$. That's why Fourier transforms turn linear PDEs (especially constant-coefficient ones) into algebraic equations in $k$-space — the same trick as Laplace's $s$.",
  },
];
