import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function LagrangeBody() {
  return (
    <>
      <p>
        Newton's <InlineMath math="\mathbf{F} = m \ddot{\mathbf{r}}" />{" "}
        works, but it picks a particular set of coordinates
        (Cartesian) and a particular concept (force). The{" "}
        <strong>Lagrangian formulation</strong>, due to Lagrange
        (1788), reformulates mechanics around a different central
        idea: the <em>action</em>. From this single scalar function,
        you derive the equations of motion in <em>any</em> coordinate
        system, you read off conservation laws from symmetries, and
        — most relevant for our journey — you generalise directly
        to quantum mechanics (Feynman's path integral) and field
        theory.
      </p>
      <p>
        This is the most powerful elementary formulation of
        physics. Don't skip it.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Susskind — Theoretical Minimum",
            author: "Leonard Susskind",
            duration: "~10h",
            url: "https://www.youtube.com/playlist?list=PL47F408D36D4CF129",
            note: "The Lagrangian/Hamiltonian half of Susskind's classical mechanics is excellent.",
          },
          {
            title: "Goldstein — Classical Mechanics",
            author: "Goldstein / Poole / Safko",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Classical_Mechanics_(Goldstein)",
            note: "The standard graduate-level mechanics textbook. Chapter 2 develops Lagrangian mechanics rigorously.",
          },
          {
            title: "Landau &amp; Lifshitz — Mechanics",
            author: "Landau / Lifshitz",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Course_of_Theoretical_Physics",
            note: "Famously dense and elegant. Develops mechanics from the principle of least action in 200 pages.",
          },
          {
            title: "MIT 8.223 — Classical Mechanics II",
            author: "MIT OCW",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/8-223-classical-mechanics-ii-january-iap-2017/",
            note: "Dedicated course on Lagrangian and Hamiltonian mechanics.",
          },
          {
            title: "Feynman Lectures, Vol. II ch. 19",
            author: "Richard Feynman",
            duration: "Reading",
            url: "https://www.feynmanlectures.caltech.edu/II_19.html",
            note: "Feynman's chapter on the principle of least action — beautiful and motivated.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Generalised coordinates</h2>

      <p>
        For a system of <InlineMath math="N" /> particles in 3D
        with <InlineMath math="k" /> constraints, the system has{" "}
        <InlineMath math="3N - k" /> degrees of freedom. Pick any{" "}
        <em>generalised coordinates</em>{" "}
        <InlineMath math="q_1, \dots, q_n" /> (with{" "}
        <InlineMath math="n = 3N - k" />) parametrising the
        constraint surface.
      </p>

      <p>
        Examples:
      </p>
      <ul>
        <li>
          A bead on a circular wire: 1 coordinate (angle{" "}
          <InlineMath math="\theta" />).
        </li>
        <li>
          A double pendulum: 2 angles{" "}
          <InlineMath math="(\theta_1, \theta_2)" />.
        </li>
        <li>
          Free particle in 3D: 3 coordinates{" "}
          <InlineMath math="(x, y, z)" /> or{" "}
          <InlineMath math="(r, \theta, \varphi)" /> in spherical.
        </li>
      </ul>

      <p>
        The point of generalised coordinates: physics shouldn't
        care about which coordinates you pick. Newton's equations
        in spherical coordinates have nasty Christoffel-symbol-like
        terms; the Lagrangian formulation handles them automatically.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The action and the principle of least action</h2>

      <Callout title="Lagrangian and action">
        For a system with kinetic energy <InlineMath math="T" /> and
        potential energy <InlineMath math="V" />, the{" "}
        <strong>Lagrangian</strong> is
        <BlockMath math="L(q, \dot q, t) = T - V." />
        The <strong>action</strong> over a time interval{" "}
        <InlineMath math="[t_1, t_2]" /> is
        <BlockMath math="S[q] = \int_{t_1}^{t_2} L(q(t), \dot q(t), t) \, dt." />
        The action is a <em>functional</em> — a function of the
        whole trajectory <InlineMath math="q(t)" />.
      </Callout>

      <Callout title="Principle of least action (Hamilton's principle)">
        The classical trajectory <InlineMath math="q(t)" />{" "}
        connecting given start <InlineMath math="q(t_1)" /> and end{" "}
        <InlineMath math="q(t_2)" /> is the one that{" "}
        <em>extremises</em> (typically minimises) the action{" "}
        <InlineMath math="S[q]" />.
      </Callout>

      <p>
        Among all conceivable paths from{" "}
        <InlineMath math="q(t_1)" /> to{" "}
        <InlineMath math="q(t_2)" />, nature picks the one with
        stationary action — typically a minimum. This is a global
        statement about the entire trajectory, not a local
        differential equation. Yet it produces local equations via
        the Euler–Lagrange formalism.
      </p>

      <p>
        Why "least" is in quotes: nature picks{" "}
        <em>stationary</em> action — the variation{" "}
        <InlineMath math="\delta S = 0" />. For most physical
        problems this is a minimum; sometimes it's a saddle.
        "Stationary" is the precise word.
      </p>

      <Pitfall>
        Hamilton's principle is a "boundary value" formulation:
        you specify positions at two times. Newton's second law
        is "initial value": position and velocity at one time.
        These give the same trajectory, but the variational
        formulation often makes the geometry clearer.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · The Euler–Lagrange equations</h2>

      <p>
        Hamilton's principle <InlineMath math="\delta S = 0" /> is
        equivalent (under standard regularity) to the{" "}
        <strong>Euler–Lagrange equations</strong>:
      </p>

      <Callout title="Euler–Lagrange equations">
        For each generalised coordinate{" "}
        <InlineMath math="q_i" />,
        <BlockMath math="\frac{d}{dt} \frac{\partial L}{\partial \dot q_i} - \frac{\partial L}{\partial q_i} = 0." />
      </Callout>

      <p>
        These are the equations of motion in{" "}
        <InlineMath math="q_i" />-coordinates. They look more
        complicated than{" "}
        <InlineMath math="F = ma" /> but generalise to arbitrary
        coordinates without modification.
      </p>

      <h3>Derivation sketch</h3>

      <p>
        Consider a small variation{" "}
        <InlineMath math="q(t) \to q(t) + \delta q(t)" /> with{" "}
        <InlineMath math="\delta q(t_1) = \delta q(t_2) = 0" />{" "}
        (endpoints fixed). The variation in action:
      </p>
      <BlockMath math="\delta S = \int_{t_1}^{t_2} \left( \frac{\partial L}{\partial q} \delta q + \frac{\partial L}{\partial \dot q} \delta \dot q \right) dt." />

      <p>
        Integrate the second term by parts (boundary terms vanish
        because <InlineMath math="\delta q" /> is zero at
        endpoints):
      </p>
      <BlockMath math="\delta S = \int_{t_1}^{t_2} \left( \frac{\partial L}{\partial q} - \frac{d}{dt} \frac{\partial L}{\partial \dot q} \right) \delta q \, dt." />

      <p>
        Demanding <InlineMath math="\delta S = 0" /> for{" "}
        <em>arbitrary</em>{" "}
        <InlineMath math="\delta q" /> forces the bracketed
        expression to vanish — that's the Euler–Lagrange equation.
        ∎
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Worked examples</h2>

      <h3>Free particle</h3>

      <p>
        <InlineMath math="L = \tfrac{1}{2} m \dot x^2" />.{" "}
        Euler–Lagrange:{" "}
        <InlineMath math="d(m \dot x)/dt = 0" />, i.e.{" "}
        <InlineMath math="m \ddot x = 0" />. Free motion. ✓
      </p>

      <h3>Harmonic oscillator</h3>

      <p>
        <InlineMath math="L = \tfrac{1}{2} m \dot x^2 - \tfrac{1}{2} k x^2" />.{" "}
        Euler–Lagrange:{" "}
        <InlineMath math="m \ddot x + k x = 0" />. Same equation
        as Newton.
      </p>

      <h3>Pendulum</h3>

      <p>
        Pendulum of length <InlineMath math="\ell" />, angle{" "}
        <InlineMath math="\theta" /> from vertical:
      </p>
      <BlockMath math="T = \tfrac{1}{2} m \ell^2 \dot\theta^2, \qquad V = -m g \ell \cos\theta." />

      <p>
        <InlineMath math="L = \tfrac{1}{2} m \ell^2 \dot\theta^2 + m g \ell \cos\theta" />.
      </p>

      <p>
        <InlineMath math="\partial L/\partial \dot\theta = m \ell^2 \dot\theta" />,{" "}
        <InlineMath math="\partial L/\partial \theta = -m g \ell \sin\theta" />.
        Euler–Lagrange:
      </p>
      <BlockMath math="m \ell^2 \ddot\theta + m g \ell \sin\theta = 0 \;\;\Rightarrow\;\; \ddot\theta + (g/\ell) \sin\theta = 0." />

      <p>
        For small oscillations <InlineMath math="\sin\theta \approx \theta" />,
        and we recover the simple harmonic oscillator with{" "}
        <InlineMath math="\omega = \sqrt{g/\ell}" />. The full
        nonlinear equation is solvable in elliptic functions; the
        linearisation is good for small amplitudes.
      </p>

      <h3>Particle in central potential</h3>

      <p>
        In polar coordinates{" "}
        <InlineMath math="(r, \theta)" /> for a planar problem:
      </p>
      <BlockMath math="L = \tfrac{1}{2} m (\dot r^2 + r^2 \dot\theta^2) - V(r)." />

      <p>
        Euler–Lagrange for{" "}
        <InlineMath math="\theta" />:{" "}
        <InlineMath math="d(m r^2 \dot\theta)/dt = 0" /> — angular
        momentum is conserved. Euler–Lagrange for{" "}
        <InlineMath math="r" />:
      </p>
      <BlockMath math="m \ddot r - m r \dot\theta^2 + V'(r) = 0." />

      <p>
        The second term is the "centrifugal force" — it appears
        automatically. Newton's law in polar coordinates would
        require remembering this; Lagrange gives it for free.
      </p>

      <Exercise
        number="4.1"
        prompt={
          <>
            For a free particle in polar coordinates{" "}
            <InlineMath math="(r, \theta)" />, derive the equations
            of motion from{" "}
            <InlineMath math="L = \tfrac{1}{2} m (\dot r^2 + r^2 \dot\theta^2)" />.
            Verify they describe straight-line motion.
          </>
        }
      >
        <p>
          E-L for <InlineMath math="r" />:{" "}
          <InlineMath math="m \ddot r - m r \dot\theta^2 = 0" />.
          E-L for <InlineMath math="\theta" />:{" "}
          <InlineMath math="d(m r^2 \dot\theta)/dt = 0" />.
        </p>
        <p>
          The second equation says angular momentum{" "}
          <InlineMath math="L = m r^2 \dot\theta" /> is conserved.
          The first is the radial equation with{" "}
          <InlineMath math="\dot\theta = L/(m r^2)" /> substituted:
        </p>
        <BlockMath math="m \ddot r = L^2/(m r^3)." />
        <p>
          A particle moving in a straight line in Cartesian
          coordinates does have this radial / angular dependence —
          straight lines look curved in polar coordinates. Verify
          by parameterising{" "}
          <InlineMath math="x = vt, y = b" /> in Cartesian, then
          converting. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Conservation laws and Noether's theorem</h2>

      <Callout title="Noether's theorem (1918)">
        For every continuous symmetry of the Lagrangian, there is
        a conserved quantity.
      </Callout>

      <p>
        This is one of the deepest theorems in physics — the
        bridge between symmetry and conservation. Examples:
      </p>

      <ul>
        <li>
          <strong>Time translation invariance</strong> (
          <InlineMath math="L" /> doesn't depend explicitly on{" "}
          <InlineMath math="t" />) ⇒{" "}
          <strong>energy conservation</strong>.
        </li>
        <li>
          <strong>Space translation invariance</strong> (
          <InlineMath math="L" /> doesn't depend on{" "}
          <InlineMath math="\mathbf{r}" />) ⇒{" "}
          <strong>momentum conservation</strong>.
        </li>
        <li>
          <strong>Rotational invariance</strong> (
          <InlineMath math="L" /> invariant under rotations) ⇒{" "}
          <strong>angular momentum conservation</strong>.
        </li>
      </ul>

      <p>
        For each cyclic coordinate{" "}
        <InlineMath math="q_i" /> (one that doesn't appear
        explicitly in <InlineMath math="L" />, only its
        derivative), the conjugate momentum
      </p>
      <BlockMath math="p_i = \frac{\partial L}{\partial \dot q_i}" />

      <p>
        is conserved. This is direct from Euler–Lagrange:{" "}
        <InlineMath math="\partial L/\partial q_i = 0" /> implies{" "}
        <InlineMath math="dp_i/dt = 0" />.
      </p>

      <p>
        Cyclic coordinate examples:
      </p>
      <ul>
        <li>
          For a free particle, all coordinates are cyclic — all
          momenta conserved.
        </li>
        <li>
          For a central potential{" "}
          <InlineMath math="V(r)" />, the angular variable{" "}
          <InlineMath math="\theta" /> is cyclic — angular momentum
          conserved.
        </li>
        <li>
          For a particle in a uniform gravitational field, the{" "}
          horizontal coordinate is cyclic — horizontal momentum
          conserved.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Constraints</h2>

      <p>
        The Lagrangian formulation handles{" "}
        <strong>holonomic constraints</strong> (constraints
        expressible as equations{" "}
        <InlineMath math="f(q, t) = 0" />) elegantly: you simply
        use generalised coordinates that already incorporate the
        constraint, and the Lagrangian deals with it
        automatically.
      </p>

      <p>
        Bead on a wire: parameterise position on the wire by arc
        length <InlineMath math="s" />, treat as 1D mechanics
        with the wire's geometry baked in.
      </p>

      <p>
        Pendulum: don't use Cartesian{" "}
        <InlineMath math="(x, y)" /> with the constraint{" "}
        <InlineMath math="x^2 + y^2 = \ell^2" />. Use the angle{" "}
        <InlineMath math="\theta" /> directly. The constraint
        disappears from the equations of motion.
      </p>

      <p>
        Non-holonomic constraints (e.g. rolling without slipping)
        are harder; they require Lagrange multipliers or
        d'Alembert's principle.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Field theory.</strong> Every modern physics
          theory (electromagnetism, general relativity, the
          Standard Model) is formulated as a Lagrangian field
          theory. Maxwell's equations come from a Lagrangian
          density{" "}
          <InlineMath math="-\tfrac{1}{4} F_{\mu\nu} F^{\mu\nu}" />.
          GR's Einstein equations come from the Einstein–Hilbert
          action <InlineMath math="\int R \sqrt{-g} \, d^4 x" />.
          Quantum field theory is an integral over field
          configurations weighted by{" "}
          <InlineMath math="e^{iS/\hbar}" />.
        </li>
        <li>
          <strong>Quantum mechanics (Feynman path integral).</strong>{" "}
          A quantum particle takes <em>all</em> paths from{" "}
          <InlineMath math="A" /> to <InlineMath math="B" />, with
          each path contributing an amplitude{" "}
          <InlineMath math="e^{iS/\hbar}" />. The classical limit
          <InlineMath math="\hbar \to 0" /> picks out the path of
          stationary action — and that's why classical particles
          obey the Euler–Lagrange equations.
        </li>
        <li>
          <strong>Symmetries everywhere.</strong> Noether's theorem
          guides what to look for in any new theory: identify
          symmetries, derive conserved quantities. Charge
          conservation comes from gauge symmetry, isospin from{" "}
          <InlineMath math="SU(2)" /> symmetry, colour from{" "}
          <InlineMath math="SU(3)" />.
        </li>
        <li>
          <strong>Optimization.</strong> The Lagrangian /
          Hamiltonian framework generalises to optimal control
          theory (Pontryagin's principle), economics (Hamiltonian
          mechanics for optimisation under constraints), and
          machine learning (variational methods).
        </li>
      </ul>

      <p>
        Next: Hamiltonian mechanics. The third major formulation,
        and the most direct bridge to quantum mechanics — Poisson
        brackets in classical Hamiltonian mechanics correspond to
        commutators in quantum mechanics.
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
      "The Lagrangian is defined as…",
    options: [
      "$L = T + V$",
      "$L = T - V$",
      "$L = T \\cdot V$",
      "$L = mc^2$",
    ],
    correct: 1,
    explanation:
      "$L = T - V$, kinetic minus potential. (The total energy is $H = T + V$ — that's the Hamiltonian, next chapter. They're different.)",
  },
  {
    prompt:
      "The Euler–Lagrange equation for coordinate $q$ is…",
    options: [
      "$L = 0$",
      "$\\frac{d}{dt} \\frac{\\partial L}{\\partial \\dot q} - \\frac{\\partial L}{\\partial q} = 0$",
      "$\\frac{\\partial L}{\\partial \\dot q} = 0$",
      "$L = T - V$",
    ],
    correct: 1,
    explanation:
      "Euler–Lagrange equation. Derived by demanding the action $\\int L \\, dt$ be stationary under variations vanishing at the endpoints.",
  },
  {
    prompt:
      "By Noether's theorem, every continuous symmetry of $L$ corresponds to…",
    options: [
      "a Lagrange multiplier",
      "a conserved quantity",
      "a constraint",
      "a coordinate transformation",
    ],
    correct: 1,
    explanation:
      "Symmetry ⇒ conservation law. Time translation ⇒ energy; space translation ⇒ momentum; rotation ⇒ angular momentum. Holds in any Lagrangian theory, classical or quantum.",
  },
  {
    prompt:
      "If $q$ is a cyclic coordinate (doesn't appear in $L$, only $\\dot q$ does), then…",
    options: [
      "$q$ is constant",
      "the conjugate momentum $p = \\partial L / \\partial \\dot q$ is conserved",
      "the Lagrangian vanishes",
      "$q$ must be an angle",
    ],
    correct: 1,
    explanation:
      "Cyclic coordinate ⇒ conjugate momentum conserved. From E-L: $\\partial L / \\partial q = 0 \\Rightarrow dp/dt = 0$. This is the cleanest way to find conserved quantities.",
  },
  {
    prompt:
      "Hamilton's principle says the classical trajectory…",
    options: [
      "minimises energy",
      "maximises action",
      "extremises (typically minimises) action $S = \\int L \\, dt$ between fixed endpoints",
      "always has constant velocity",
    ],
    correct: 2,
    explanation:
      "Stationary action: $\\delta S = 0$. Among all paths with given start and end, nature picks the one for which $S$ is stationary. Often a minimum, sometimes a saddle.",
  },
];
