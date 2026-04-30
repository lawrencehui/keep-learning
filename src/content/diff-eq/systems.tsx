import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function SystemsBody() {
  return (
    <>
      <p>
        Most real dynamical systems involve more than one quantity
        evolving simultaneously — predator and prey populations,
        position and velocity of a particle, voltages on multiple
        capacitors, three-body gravitational orbits. Each becomes a{" "}
        <strong>system of ODEs</strong>, and the right tool to analyse
        them is the linear algebra you already built. This chapter
        ties together eigenvalues, matrix exponentials, and ODEs in
        one geometric picture: <strong>phase portraits</strong>.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.03 — Lectures 25–30 (linear systems, phase plane)",
            author: "Prof. Arthur Mattuck (MIT OCW)",
            duration: "~6h",
            url: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
            note: "Mattuck on phase portraits is a classic. Lectures 25–30 cover this chapter.",
          },
          {
            title: "Strogatz — Nonlinear Dynamics and Chaos, chs. 5–6",
            author: "Steven Strogatz",
            duration: "Reading",
            url: "https://www.stevenstrogatz.com/books/nonlinear-dynamics-and-chaos",
            note: "The reference for 2D phase plane analysis. Strogatz makes this material come alive.",
          },
          {
            title: "Differential equations — chapters on systems",
            author: "3Blue1Brown",
            duration: "varies",
            url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNPOjrT6KVlfJuKtYTftqH6",
            note: "Visual treatment of vector fields and phase flow.",
          },
          {
            title: "Boyce & DiPrima, ch. 7",
            author: "Boyce / DiPrima",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Boyce_and_DiPrima",
            note: "Standard textbook treatment with worked phase-portrait classifications.",
          },
          {
            title: "Predator-prey + chaos demos",
            author: "various",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=lotka+volterra+phase+portrait",
            note: "Watching a real biological system trace out its phase portrait makes the abstraction concrete.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · From higher-order to systems</h2>

      <p>
        Any <InlineMath math="n" />-th order ODE can be rewritten as
        a system of <InlineMath math="n" /> first-order equations.
        For{" "}
        <InlineMath math="y'' + b y' + c y = 0" />, introduce{" "}
        <InlineMath math="u_1 = y" /> and{" "}
        <InlineMath math="u_2 = y'" />. Then
      </p>
      <BlockMath math="\dot u_1 = u_2, \qquad \dot u_2 = -c u_1 - b u_2." />
      <p>
        In matrix form,
      </p>
      <BlockMath math="\dot{\mathbf{u}} = A \mathbf{u}, \qquad A = \begin{pmatrix} 0 & 1 \\ -c & -b \end{pmatrix}." />

      <p>
        Same equation, two different presentations. Higher-order
        single ODEs and first-order systems are
        interchangeable — pick whichever the problem prefers. Phase
        portraits prefer systems.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Linear systems &amp; the matrix exponential</h2>

      <p>
        For a linear system <InlineMath math="\dot{\mathbf{x}} = A \mathbf{x}" />{" "}
        with constant matrix <InlineMath math="A" />, the solution is
        exactly the matrix-exponential analogue of the scalar{" "}
        <InlineMath math="\dot x = a x \Rightarrow x = x_0 e^{at}" />:
      </p>
      <BlockMath math="\mathbf{x}(t) = e^{At} \mathbf{x}_0." />
      <p>
        We met <InlineMath math="e^{At}" /> in the linear-algebra
        chapter on eigenvalues. When <InlineMath math="A" /> is
        diagonalisable as <InlineMath math="A = P D P^{-1}" />,
      </p>
      <BlockMath math="e^{At} = P \, e^{Dt} \, P^{-1} = P \begin{pmatrix} e^{\lambda_1 t} & & \\ & \ddots & \\ & & e^{\lambda_n t} \end{pmatrix} P^{-1}." />
      <p>
        Reading: in the eigenvector basis, the system decouples into{" "}
        <InlineMath math="n" /> independent scalar equations{" "}
        <InlineMath math="\dot{\tilde x}_i = \lambda_i \tilde x_i" />,
        each with solution{" "}
        <InlineMath math="\tilde x_i(t) = \tilde x_i(0) e^{\lambda_i t}" />.
        Eigenvalues <InlineMath math="\lambda_i" /> are the{" "}
        <em>natural rates</em> of the system; eigenvectors are the
        natural directions.
      </p>

      <p>
        For 2D systems, two eigenvalues completely determine the
        long-term behaviour. Their nature — real or complex,
        positive or negative — sorts the phase portrait into one of
        a small number of canonical pictures.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Phase portraits in 2D</h2>

      <p>
        For a 2D system, plot trajectories in the{" "}
        <InlineMath math="(x_1, x_2)" /> plane. Each starting point
        produces a curve; together they form the <strong>phase
        portrait</strong> — a map of all possible motions. The
        origin (assuming{" "}
        <InlineMath math="A" /> non-singular) is the unique{" "}
        <em>fixed point</em>, and its character classifies the
        portrait.
      </p>

      <Callout title="Try it">
        Pick a 2×2 matrix preset; the widget renders the vector
        field of <InlineMath math="\dot{\mathbf{x}} = A \mathbf{x}" />{" "}
        and traces a few sample trajectories.
      </Callout>

      <PhasePortraitWidget />

      <h3>Classification by eigenvalues</h3>

      <p>Let <InlineMath math="\lambda_{1,2}" /> be eigenvalues:</p>

      <ul>
        <li>
          <strong>Two real, distinct, both negative:</strong>{" "}
          <em>stable node</em>. All trajectories spiral inward
          along the slow eigenvector eventually. (Even more stable
          if both <em>very</em> negative.)
        </li>
        <li>
          <strong>Two real, distinct, both positive:</strong>{" "}
          <em>unstable node</em>. Mirror image — everything flies
          outward.
        </li>
        <li>
          <strong>Real, opposite signs:</strong>{" "}
          <em>saddle</em>. One eigenvector is unstable (positive
          eigenvalue), one is stable (negative). Generic
          trajectories shoot off along the unstable direction.
        </li>
        <li>
          <strong>Complex conjugate, negative real part:</strong>{" "}
          <em>stable spiral</em>. Trajectories spiral inward toward
          the origin — oscillation that decays.
        </li>
        <li>
          <strong>Complex conjugate, positive real part:</strong>{" "}
          <em>unstable spiral</em>. Mirror image — outward spirals.
        </li>
        <li>
          <strong>Pure imaginary (zero real part):</strong>{" "}
          <em>center</em>. Closed orbits — periodic motion. Rare;
          requires special structure (Hamiltonian systems give it
          generically).
        </li>
        <li>
          <strong>Repeated real eigenvalue:</strong>{" "}
          <em>improper node</em> or <em>star</em>, depending on
          whether <InlineMath math="A" /> is diagonalisable.
        </li>
      </ul>

      <h3>The trace–determinant plane</h3>

      <p>
        For a 2×2 matrix <InlineMath math="A" />, the eigenvalues are
        determined by{" "}
        <InlineMath math="\tau = \operatorname{tr}(A) = \lambda_1 + \lambda_2" />{" "}
        and{" "}
        <InlineMath math="\Delta = \det(A) = \lambda_1 \lambda_2" />.
        Plot all 2×2 matrices in the{" "}
        <InlineMath math="(\tau, \Delta)" /> plane — a famous map of
        2D dynamics:
      </p>
      <ul>
        <li>
          <InlineMath math="\Delta < 0" />: saddle (always).
        </li>
        <li>
          <InlineMath math="\Delta > 0" />,{" "}
          <InlineMath math="\tau^2 > 4\Delta" />: node (real
          eigenvalues, same sign).{" "}
          <InlineMath math="\tau < 0" /> stable,{" "}
          <InlineMath math="\tau > 0" /> unstable.
        </li>
        <li>
          <InlineMath math="\Delta > 0" />,{" "}
          <InlineMath math="\tau^2 < 4\Delta" />: spiral (complex
          conjugate eigenvalues).{" "}
          <InlineMath math="\tau < 0" /> stable,{" "}
          <InlineMath math="\tau > 0" /> unstable,{" "}
          <InlineMath math="\tau = 0" /> center.
        </li>
      </ul>

      <Pitfall>
        Centers (<InlineMath math="\tau = 0,\, \Delta > 0" />) are
        non-generic: a tiny perturbation of <InlineMath math="A" />{" "}
        moves you off the boundary line and turns the center into a
        spiral. This matters in physics: real conservative systems
        (Hamiltonian) sit exactly on this border because energy
        conservation forces it. Add any dissipation and the center
        becomes a stable spiral.
      </Pitfall>

      <Exercise
        number="3.1"
        prompt={
          <>
            Classify the fixed point at the origin for{" "}
            <InlineMath math="A = \begin{pmatrix} -1 & 4 \\ -2 & -1 \end{pmatrix}" />.
          </>
        }
      >
        <p>
          Trace <InlineMath math="\tau = -2" />, determinant{" "}
          <InlineMath math="\Delta = (-1)(-1) - (4)(-2) = 1 + 8 = 9" />.
          Discriminant <InlineMath math="\tau^2 - 4\Delta = 4 - 36 = -32 < 0" />,
          so eigenvalues are complex conjugate. Real part{" "}
          <InlineMath math="\tau / 2 = -1 < 0" />, so it's a stable
          spiral. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Nonlinear systems &amp; linearisation</h2>

      <p>
        Real-world systems are usually nonlinear:{" "}
        <InlineMath math="\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})" />.
        Closed-form solutions almost never exist. But near a fixed
        point <InlineMath math="\mathbf{x}^*" /> (where{" "}
        <InlineMath math="\mathbf{f}(\mathbf{x}^*) = \mathbf{0}" />),
        Taylor-expand:
      </p>
      <BlockMath math="\dot{\mathbf{x}} = J(\mathbf{x}^*) (\mathbf{x} - \mathbf{x}^*) + \text{higher order}," />
      <p>
        where <InlineMath math="J(\mathbf{x}^*)" /> is the{" "}
        Jacobian of <InlineMath math="\mathbf{f}" /> at the fixed
        point. The linearised system is{" "}
        <InlineMath math="\dot{\mathbf{u}} = J \mathbf{u}" /> with{" "}
        <InlineMath math="\mathbf{u} = \mathbf{x} - \mathbf{x}^*" />.
      </p>

      <Callout title="Hartman–Grobman theorem">
        If the Jacobian eigenvalues at a fixed point all have nonzero
        real part (a <em>hyperbolic</em> fixed point), then the local
        nonlinear phase portrait is topologically equivalent to the
        linearised one. Translation: the linear classification is
        correct nearby.
      </Callout>

      <p>
        Worked example: the predator–prey (Lotka–Volterra) system
      </p>
      <BlockMath math="\dot x = \alpha x - \beta x y, \qquad \dot y = \delta x y - \gamma y" />
      <p>
        models prey <InlineMath math="x" /> and predator{" "}
        <InlineMath math="y" />. Fixed points at{" "}
        <InlineMath math="(0, 0)" /> and{" "}
        <InlineMath math="(\gamma/\delta,\, \alpha/\beta)" />. The
        Jacobian at the non-trivial fixed point has pure imaginary
        eigenvalues — a center in the linearisation. The system is
        Hamiltonian-ish, so the center persists in the nonlinear
        system: predator and prey populations oscillate forever in
        closed orbits. (This is why hare–lynx populations cycle in
        Canada — observed for over a century.)
      </p>

      <p>
        Beyond hyperbolic fixed points (real part = 0 cases), more
        delicate analysis is needed. <em>Limit cycles</em> (closed
        attracting orbits like in the van der Pol oscillator) and{" "}
        <em>chaotic attractors</em> (Lorenz, Rössler) are non-linear-
        only phenomena. Strogatz's textbook is the standard guide.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Why this matters</h2>

      <ul>
        <li>
          <strong>Physics.</strong> Hamilton's equations of classical
          mechanics — the canonical form{" "}
          <InlineMath math="\dot q = \partial H/\partial p" />,{" "}
          <InlineMath math="\dot p = -\partial H/\partial q" /> — are
          a 2<InlineMath math="n" />-dimensional system. Coupled
          oscillators, planetary orbits, plasma physics.
        </li>
        <li>
          <strong>Chemistry &amp; biology.</strong> Reaction kinetics,
          gene regulatory networks, neural firing models (Hodgkin–
          Huxley) — all systems of nonlinear ODEs. Bifurcation
          theory analyses how their phase portraits change as
          parameters vary.
        </li>
        <li>
          <strong>Quantum mechanics.</strong> The Schrödinger equation
          for an <InlineMath math="n" />-state system is{" "}
          <InlineMath math="i \hbar \, \dot{\boldsymbol\psi} = \hat H \boldsymbol\psi" />:{" "}
          a complex linear system. Solution{" "}
          <InlineMath math="\boldsymbol\psi(t) = e^{-i \hat H t / \hbar} \boldsymbol\psi(0)" />.
          Hermitian <InlineMath math="\hat H" /> has real
          eigenvalues, so all eigenvalues of{" "}
          <InlineMath math="-i \hat H / \hbar" /> are pure
          imaginary — the system is a (high-dimensional){" "}
          <em>center</em>. Probability is conserved exactly. Quantum
          mechanics is the linear systems of this chapter, in
          complex Hilbert space.
        </li>
        <li>
          <strong>Engineering.</strong> Control of multi-input
          multi-output systems, robotics, aircraft dynamics — all
          systems of ODEs (or PDEs after spatial discretisation).
        </li>
      </ul>

      <p>
        Last chapter of this module: Fourier series and PDEs.
        Linear PDEs (heat, wave, Laplace, Schrödinger) get reduced
        to families of ODEs by separation of variables, and the
        Fourier basis emerges as the natural eigenbasis for periodic
        problems.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: 2D phase portrait
// ════════════════════════════════════════════════════════════

interface MPreset {
  name: string;
  a: number;
  b: number;
  c: number;
  d: number;
  desc: string;
}

const mPresets: MPreset[] = [
  { name: "Stable node", a: -1, b: 0, c: 0, d: -2, desc: "λ = −1, −2 (stable node)" },
  { name: "Saddle", a: 1, b: 0, c: 0, d: -1, desc: "λ = +1, −1 (saddle)" },
  { name: "Stable spiral", a: -0.5, b: -1, c: 1, d: -0.5, desc: "λ = −0.5 ± i (stable spiral)" },
  { name: "Center", a: 0, b: -1, c: 1, d: 0, desc: "λ = ±i (center — periodic orbits)" },
  { name: "Unstable spiral", a: 0.3, b: -1, c: 1, d: 0.3, desc: "λ = 0.3 ± i (unstable spiral)" },
  { name: "Unstable node", a: 1, b: 0, c: 0, d: 0.5, desc: "λ = +1, +0.5 (unstable node)" },
];

function PhasePortraitWidget() {
  const [preset, setPreset] = useState(0);
  const m = mPresets[preset];
  const { a, b, c, d } = m;

  const w = 360;
  const h = 280;
  const cx = w / 2;
  const cy = h / 2;
  const span = 6;
  const sx = (x: number) => cx + (x / span) * w;
  const sy = (y: number) => cy - (y / span) * w;

  // small arrows on grid
  const arrows: { x: number; y: number; vx: number; vy: number }[] = [];
  const N = 13;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < Math.floor((h / w) * N); j++) {
      const x = -span / 2 + ((span * i) / (N - 1));
      const y = -span * (h / w) / 2 + (span * (h / w) * j) / Math.max(1, Math.floor((h / w) * N) - 1);
      const vx = a * x + b * y;
      const vy = c * x + d * y;
      arrows.push({ x, y, vx, vy });
    }
  }
  const maxLen = Math.max(...arrows.map((q) => Math.sqrt(q.vx * q.vx + q.vy * q.vy)), 0.001);
  const aScale = ((w / N) * 0.8) / maxLen;

  // sample trajectories
  const starts: [number, number][] = [
    [2.5, 0.5],
    [-2, 1.2],
    [1, -2],
    [-1.5, -1.5],
    [0.3, 2],
    [-2.5, -0.5],
  ];
  const trajs: { x: number; y: number }[][] = starts.map((s) => {
    const traj: { x: number; y: number }[] = [];
    let x = s[0];
    let y = s[1];
    const dt = 0.02;
    for (let i = 0; i < 600; i++) {
      traj.push({ x, y });
      const vx = a * x + b * y;
      const vy = c * x + d * y;
      x += vx * dt;
      y += vy * dt;
      if (x * x + y * y > 50) break;
    }
    return traj;
  });

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          {mPresets.map((p, i) => (
            <button
              key={i}
              onClick={() => setPreset(i)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                preset === i
                  ? "border-accent-soft bg-ink-800 text-white"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
            <line x1={0} y1={cy} x2={w} y2={cy} stroke="#2a2a37" strokeOpacity={0.5} />
            <line x1={cx} y1={0} x2={cx} y2={h} stroke="#2a2a37" strokeOpacity={0.5} />

            {arrows.map((q, i) => {
              const x1 = sx(q.x);
              const y1 = sy(q.y);
              const x2 = x1 + q.vx * aScale;
              const y2 = y1 - q.vy * aScale;
              const dx = x2 - x1;
              const dy = y2 - y1;
              const len = Math.sqrt(dx * dx + dy * dy);
              if (len < 0.5) return null;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#a78bfa" strokeOpacity={0.4} strokeWidth={1} />;
            })}

            {trajs.map((traj, i) => (
              <path
                key={i}
                d={traj.map((p, j) => `${j === 0 ? "M" : "L"}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(" ")}
                fill="none"
                stroke="#22d3ee"
                strokeWidth={1.5}
                strokeOpacity={0.85}
              />
            ))}

            {trajs.map((traj, i) => (
              <circle key={`s${i}`} cx={sx(traj[0].x)} cy={sy(traj[0].y)} r={3} fill="#fbbf24" />
            ))}

            <circle cx={cx} cy={cy} r={4} fill="#fff" />
          </svg>
        </div>

        <p className="text-xs text-ink-400">{m.desc}</p>
      </div>
      <figcaption>
        Vector field (purple arrows) of{" "}
        <InlineMath math="\dot{\mathbf{x}} = A \mathbf{x}" />, with
        sample trajectories (cyan) starting from yellow points.
        Different eigen-structures of <InlineMath math="A" />{" "}
        produce visually distinct portraits.
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
      "What is the solution to $\\dot{\\mathbf{x}} = A \\mathbf{x}$ with $\\mathbf{x}(0) = \\mathbf{x}_0$?",
    options: [
      "$\\mathbf{x}_0 + A t$",
      "$e^{At} \\mathbf{x}_0$",
      "$A^t \\mathbf{x}_0$",
      "$\\sin(At) \\mathbf{x}_0$",
    ],
    correct: 1,
    explanation:
      "The matrix exponential, defined as $\\sum (At)^n/n!$, generalises the scalar $e^{at}$. When $A$ is diagonalisable, $e^{At} = P e^{Dt} P^{-1}$ — the system decouples in the eigenvector basis.",
  },
  {
    prompt:
      "A 2×2 system has $\\det(A) = -1$. The fixed point at the origin is…",
    options: ["a stable node", "a saddle", "a center", "an unstable spiral"],
    correct: 1,
    explanation:
      "$\\det A = \\lambda_1 \\lambda_2 < 0$ forces the eigenvalues to have opposite signs — the saddle case.",
  },
  {
    prompt:
      "If the eigenvalues of $A$ are $-2 \\pm 3i$, the phase portrait near the origin is a…",
    options: ["stable node", "stable spiral", "unstable spiral", "center"],
    correct: 1,
    explanation:
      "Complex eigenvalues with negative real part give an inward (stable) spiral. Imaginary part magnitude controls the angular speed; real part magnitude controls how fast it decays.",
  },
  {
    prompt:
      "For the linear system $\\dot{\\mathbf{x}} = A \\mathbf{x}$, what role do the eigenvectors of $A$ play in the dynamics?",
    options: [
      "They give the natural directions along which the system evolves with a single exponential rate",
      "They are perpendicular to all trajectories",
      "They determine the period of oscillation",
      "They are the same as the principal axes of an ellipsoid",
    ],
    correct: 0,
    explanation:
      "Along an eigenvector, the system reduces to scalar exponential growth/decay at the corresponding eigenvalue. Eigenvectors are the directions where dynamics are simple.",
  },
  {
    prompt:
      "For a non-linear system at a hyperbolic fixed point (no eigenvalues on the imaginary axis), the local phase portrait is…",
    options: [
      "always a center",
      "always a saddle",
      "topologically equivalent to the linearised system at the fixed point",
      "completely unrelated to the linearisation",
    ],
    correct: 2,
    explanation:
      "Hartman–Grobman theorem: at a hyperbolic fixed point, the nonlinear flow is topologically conjugate to the linearised flow. Linearisation is reliable away from the borderline cases (real part = 0 eigenvalues).",
  },
];
