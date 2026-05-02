import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function HamiltonBody() {
  return (
    <>
      <p>
        Hamiltonian mechanics is the third great formulation of
        classical mechanics. From Newton's <em>force-based</em>{" "}
        description to Lagrange's <em>action-based</em>{" "}
        description, Hamilton's contribution is a{" "}
        <em>phase-space</em> description: instead of tracking
        positions over time and computing velocities, treat
        positions and momenta as independent coordinates of a
        higher-dimensional space. The dynamics become a flow on
        this space, with elegant geometric structure.
      </p>
      <p>
        Why bother with a third formulation? Three reasons:
        canonical transformations and conserved quantities are
        cleanest here; the Hamiltonian generalises to statistical
        mechanics (with the Hamiltonian playing the role of
        energy in the Boltzmann distribution); and most
        importantly for us, <em>quantum mechanics is a Hamiltonian
        theory</em>. Operators play the role of phase-space
        functions; commutators replace Poisson brackets;{" "}
        <InlineMath math="i\hbar \, \partial_t = \hat H" /> is the
        Schrödinger equation.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Goldstein — Classical Mechanics, ch. 8–10",
            author: "Goldstein / Poole / Safko",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Classical_Mechanics_(Goldstein)",
            note: "The standard graduate-level treatment of Hamiltonian mechanics.",
          },
          {
            title: "Susskind — Theoretical Minimum",
            author: "Leonard Susskind",
            duration: "~5h on Hamiltonian mechanics",
            url: "https://www.youtube.com/playlist?list=PL47F408D36D4CF129",
            note: "Susskind connects Hamiltonian classical mechanics to QM directly.",
          },
          {
            title: "Arnold — Mathematical Methods of Classical Mechanics",
            author: "V.I. Arnold",
            duration: "Reading",
            url: "https://www.springer.com/book/9780387968902",
            note: "The geometric / symplectic-geometry view of Hamiltonian mechanics. Beautiful but demanding.",
          },
          {
            title: "Sussman &amp; Wisdom — Structure and Interpretation of Classical Mechanics",
            author: "Sussman / Wisdom",
            duration: "Reading (free online)",
            url: "https://mitpress.mit.edu/9780262028967/structure-and-interpretation-of-classical-mechanics/",
            note: "Develops mechanics in a 'computational' style. Free online via MIT Press.",
          },
          {
            title: "Hamiltonian mechanics (Khan / various)",
            author: "various",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=hamiltonian+mechanics+intuition",
            note: "Intuition-friendly intros if the Lagrange-to-Hamilton transition isn't obvious.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · From Lagrangian to Hamiltonian</h2>

      <p>
        Start with a Lagrangian{" "}
        <InlineMath math="L(q, \dot q, t)" />. Define the{" "}
        <strong>conjugate momentum</strong>:
      </p>
      <BlockMath math="p_i = \frac{\partial L}{\partial \dot q_i}." />

      <p>
        The Hamiltonian is the Legendre transform of{" "}
        <InlineMath math="L" /> with respect to{" "}
        <InlineMath math="\dot q" />:
      </p>

      <Callout title="Hamiltonian">
        <BlockMath math="H(q, p, t) = \sum_i p_i \dot q_i - L(q, \dot q, t)," />
        where <InlineMath math="\dot q" /> is expressed in terms of{" "}
        <InlineMath math="q" /> and <InlineMath math="p" /> by
        inverting <InlineMath math="p = \partial L/\partial \dot q" />.
      </Callout>

      <p>
        For "natural" mechanics (kinetic energy quadratic in
        velocity, potential depending only on position):
      </p>
      <BlockMath math="L = \tfrac{1}{2} m \dot q^2 - V(q) \;\Rightarrow\; p = m\dot q \;\Rightarrow\; H = p^2/(2m) + V(q)." />

      <p>
        — the Hamiltonian is just{" "}
        <InlineMath math="T + V" />, the total energy. (For more
        general Lagrangians this isn't always true; the
        Hamiltonian = energy iff{" "}
        <InlineMath math="L" /> doesn't depend explicitly on time.
        Noether's theorem, again.)
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Hamilton's equations</h2>

      <Callout title="Hamilton's equations">
        <BlockMath math="\dot q_i = \frac{\partial H}{\partial p_i}, \qquad \dot p_i = -\frac{\partial H}{\partial q_i}." />
      </Callout>

      <p>
        These are the equations of motion in Hamiltonian
        formulation. Two first-order ODEs replace the single
        second-order ODE of Newton or Lagrange. Same information,
        first-order.
      </p>

      <h3>Derivation</h3>

      <p>
        From <InlineMath math="H = p \dot q - L" />:
      </p>
      <BlockMath math="dH = \dot q \, dp + p \, d\dot q - \frac{\partial L}{\partial q} dq - \frac{\partial L}{\partial \dot q} d\dot q - \frac{\partial L}{\partial t} dt." />

      <p>
        The terms in <InlineMath math="d \dot q" /> cancel by
        definition of <InlineMath math="p" />. So
      </p>
      <BlockMath math="dH = \dot q \, dp - \frac{\partial L}{\partial q} dq - \frac{\partial L}{\partial t} dt." />

      <p>
        Comparing with the natural{" "}
        <InlineMath math="dH = (\partial H/\partial q) dq + (\partial H/\partial p) dp + (\partial H/\partial t) dt" />:
      </p>
      <BlockMath math="\frac{\partial H}{\partial p} = \dot q, \qquad \frac{\partial H}{\partial q} = -\frac{\partial L}{\partial q}." />

      <p>
        The second is{" "}
        <InlineMath math="-\dot p" /> by Euler–Lagrange (
        <InlineMath math="\partial L/\partial q = d/dt \, \partial L/\partial \dot q = \dot p" />).
        Hence Hamilton's equations. ∎
      </p>

      <h3>Worked example: harmonic oscillator</h3>

      <p>
        <InlineMath math="L = \tfrac{1}{2} m \dot q^2 - \tfrac{1}{2} k q^2" />.{" "}
        Conjugate momentum{" "}
        <InlineMath math="p = m \dot q" />, hence{" "}
        <InlineMath math="\dot q = p/m" />.
      </p>
      <BlockMath math="H = p \dot q - L = \frac{p^2}{2m} + \tfrac{1}{2} k q^2." />

      <p>
        Hamilton:{" "}
        <InlineMath math="\dot q = p/m" />,{" "}
        <InlineMath math="\dot p = -k q" />. Combining:{" "}
        <InlineMath math="\ddot q = -k q/m = -\omega_0^2 q" />.
        Same equation as Newton.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Phase space</h2>

      <p>
        For an <InlineMath math="n" />-dimensional configuration
        space, the <strong>phase space</strong> has dimension{" "}
        <InlineMath math="2n" />, with coordinates{" "}
        <InlineMath math="(q_1, \dots, q_n, p_1, \dots, p_n)" />.
        A point in phase space gives the complete state of the
        system: position <em>and</em> momentum.
      </p>

      <p>
        Hamilton's equations define a flow on phase space.
        Trajectories are curves; specific systems give specific
        flow patterns. Examples:
      </p>

      <ul>
        <li>
          Harmonic oscillator: ellipses in{" "}
          <InlineMath math="(q, p)" /> space, with axis ratio
          determined by <InlineMath math="\sqrt{k/m}" />.
        </li>
        <li>
          Free particle: horizontal lines (
          <InlineMath math="\dot p = 0" />, momentum constant; the
          particle slides through phase space at constant{" "}
          <InlineMath math="p" />).
        </li>
        <li>
          Pendulum: ellipses near the bottom (low energy);
          separatrix at the energy of an unstable equilibrium at
          the top; rotational orbits above that. Phase portrait
          captures the qualitative dynamics at a glance.
        </li>
      </ul>

      <h3>Liouville's theorem</h3>

      <Callout title="Liouville's theorem">
        Hamiltonian flow preserves volume in phase space.
      </Callout>

      <p>
        The proof is short: the flow has divergence{" "}
        <InlineMath math="\sum_i (\partial \dot q_i/\partial q_i + \partial \dot p_i/\partial p_i) = \sum_i (\partial^2 H/(\partial q_i \partial p_i) - \partial^2 H/(\partial p_i \partial q_i)) = 0" />.
        Mixed partials commute. So the flow is divergence-free —
        Hamiltonian dynamics is incompressible.
      </p>

      <p>
        Consequences:
      </p>
      <ul>
        <li>
          A blob of initial conditions evolves into a blob of the
          same volume, just deformed in shape.
        </li>
        <li>
          Statistical mechanics: the microcanonical ensemble (
          uniform on a constant-energy surface) is preserved by
          dynamics. This is the foundation of equilibrium
          statistical mechanics.
        </li>
        <li>
          Numerical integration: respect Liouville with{" "}
          <em>symplectic</em> integrators (preserve symplectic
          form / volume) for long-time stability. Standard Runge–
          Kutta methods are not symplectic and accumulate error.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Poisson brackets</h2>

      <Callout title="Poisson bracket">
        For functions{" "}
        <InlineMath math="f, g" /> on phase space, the{" "}
        <strong>Poisson bracket</strong>:
        <BlockMath math="\{f, g\} = \sum_i \left( \frac{\partial f}{\partial q_i} \frac{\partial g}{\partial p_i} - \frac{\partial f}{\partial p_i} \frac{\partial g}{\partial q_i} \right)." />
      </Callout>

      <p>
        Properties:
      </p>
      <ul>
        <li>
          <strong>Antisymmetric:</strong>{" "}
          <InlineMath math="\{f, g\} = -\{g, f\}" />.
        </li>
        <li>
          <strong>Bilinear and Leibniz</strong>:{" "}
          <InlineMath math="\{f g, h\} = f \{g, h\} + g \{f, h\}" />.
        </li>
        <li>
          <strong>Jacobi identity:</strong>{" "}
          <InlineMath math="\{f, \{g, h\}\} + \{g, \{h, f\}\} + \{h, \{f, g\}\} = 0" />.
        </li>
        <li>
          <strong>Canonical relations:</strong>{" "}
          <InlineMath math="\{q_i, q_j\} = 0" />,{" "}
          <InlineMath math="\{p_i, p_j\} = 0" />,{" "}
          <InlineMath math="\{q_i, p_j\} = \delta_{ij}" />.
        </li>
      </ul>

      <h3>Time evolution via brackets</h3>

      <p>
        For any phase-space function{" "}
        <InlineMath math="f(q, p, t)" />:
      </p>
      <BlockMath math="\frac{df}{dt} = \{f, H\} + \frac{\partial f}{\partial t}." />

      <p>
        Time evolution along Hamiltonian flow is "bracket with
        the Hamiltonian." Conservation laws have a clean
        characterisation: <InlineMath math="f" /> is conserved iff{" "}
        <InlineMath math="\{f, H\} = 0" /> (and{" "}
        <InlineMath math="\partial f/\partial t = 0" />).
      </p>

      <h3>Quantum correspondence</h3>

      <p>
        The single most important fact about Poisson brackets:
        they have a quantum-mechanical analogue. The
        correspondence is
      </p>
      <BlockMath math="\{f, g\}_{\text{Poisson}} \;\;\longleftrightarrow\;\; \frac{1}{i\hbar} [\hat f, \hat g]_{\text{commutator}}" />

      <p>
        where <InlineMath math="\hat f, \hat g" /> are the quantum
        operators corresponding to classical{" "}
        <InlineMath math="f, g" />. The canonical commutation
        relation
      </p>
      <BlockMath math="[\hat q, \hat p] = i\hbar" />

      <p>
        comes directly from the classical Poisson bracket{" "}
        <InlineMath math="\{q, p\} = 1" />, with the
        <InlineMath math="i\hbar" /> factor. Heisenberg's
        equation of motion
      </p>
      <BlockMath math="\frac{d\hat O}{dt} = \frac{1}{i\hbar} [\hat O, \hat H]" />

      <p>
        is the quantum analogue of{" "}
        <InlineMath math="df/dt = \{f, H\}" />.
      </p>

      <p>
        Dirac (1925) made this analogy precise. Quantising a
        classical theory (informally) means promoting phase-space
        coordinates to operators on a Hilbert space and replacing
        Poisson brackets with commutators. We'll see it formally
        in Module XIV.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Canonical transformations</h2>

      <p>
        A change of coordinates in phase space{" "}
        <InlineMath math="(q, p) \to (Q, P)" /> is{" "}
        <strong>canonical</strong> if it preserves Hamilton's
        equations — i.e. if there exists a new Hamiltonian{" "}
        <InlineMath math="K(Q, P, t)" /> giving the same dynamics.
      </p>

      <p>
        Canonical transformations preserve Poisson brackets:
      </p>
      <BlockMath math="\{Q_i, P_j\}_{(q, p)} = \delta_{ij}, \qquad \{Q_i, Q_j\} = 0, \qquad \{P_i, P_j\} = 0." />

      <p>
        This is the symplectic structure on phase space, the
        deep geometric content of Hamiltonian mechanics.
      </p>

      <h3>Why bother with canonical transformations</h3>

      <p>
        Sometimes you can find a canonical transformation that
        makes the new Hamiltonian trivial. If{" "}
        <InlineMath math="K(Q, P) = K(P)" /> only (no{" "}
        <InlineMath math="Q" /> dependence), then{" "}
        <InlineMath math="\dot P = 0" /> (
        <InlineMath math="P" /> conserved) and{" "}
        <InlineMath math="\dot Q = \partial K/\partial P" /> is
        constant — uniform motion in <InlineMath math="Q" />.
        Solved.
      </p>

      <p>
        This program — finding canonical transformations to "
        action-angle" variables where the Hamiltonian depends only
        on action variables — leads to the Hamilton–Jacobi
        equation, which (in turn) inspired Schrödinger's
        derivation of the wave equation.
      </p>

      <h3>Symplectic geometry</h3>

      <p>
        The canonical transformations form a group; their
        infinitesimal generators are vector fields on phase
        space. In modern language, phase space is a{" "}
        <strong>symplectic manifold</strong> — a manifold with a
        closed non-degenerate 2-form{" "}
        <InlineMath math="\omega = \sum dp_i \wedge dq_i" /> — and
        Hamiltonian flows are{" "}
        <em>symplectomorphisms</em>. Modern classical mechanics is
        symplectic geometry.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Quantum mechanics.</strong> The Hamiltonian
          becomes the operator <InlineMath math="\hat H" />.
          Schrödinger:{" "}
          <InlineMath math="i\hbar \, \partial_t \psi = \hat H \psi" />.
          Heisenberg:{" "}
          <InlineMath math="d\hat O / dt = [\hat O, \hat H]/(i\hbar)" />.
          Both come directly from Hamilton's classical equations
          via the Poisson-bracket-to-commutator correspondence.
        </li>
        <li>
          <strong>Statistical mechanics.</strong> Equilibrium
          distributions are functions on phase space (canonical{" "}
          <InlineMath math="\propto e^{-\beta H}" />,
          microcanonical uniform on energy surfaces). Liouville's
          theorem makes equilibrium possible.
        </li>
        <li>
          <strong>Symplectic integrators.</strong> Long-term
          stable numerical integration of Hamiltonian systems
          (planetary orbits, molecular dynamics) requires
          preserving the symplectic structure.
        </li>
        <li>
          <strong>Gauge theory.</strong> The Hamiltonian formalism
          generalises to constrained systems via Dirac brackets.
          Quantising gauge theories needs this formalism (BRST,
          BV).
        </li>
        <li>
          <strong>Optimal control.</strong> Pontryagin's principle
          extends Hamilton's equations to constrained
          optimisation. Used in robotics, aerospace, economics.
        </li>
      </ul>

      <p>
        That closes Module XII. We've now seen all three classical
        formulations: Newton (force-based), Lagrange (action-
        based), Hamilton (phase-space-based). The next module is{" "}
        <strong>Module XIII: Electromagnetism &amp; Waves</strong>,
        where Maxwell's equations are derived from a Lagrangian
        density and where the wave equation gives us our first
        physical look at concepts that quantum mechanics will
        upgrade.
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
      "The conjugate momentum to coordinate $q$ is…",
    options: [
      "$p = m \\dot q$",
      "$p = \\partial L / \\partial \\dot q$",
      "$p = q$",
      "$p = T - V$",
    ],
    correct: 1,
    explanation:
      "$p = \\partial L / \\partial \\dot q$. For natural Lagrangians ($T$ quadratic in velocity, $V$ position-only), this reduces to $m\\dot q$ — but the general definition handles fancier cases (relativity, electromagnetism).",
  },
  {
    prompt:
      "Hamilton's equations are…",
    options: [
      "$\\dot q = \\partial H / \\partial p$ and $\\dot p = -\\partial H / \\partial q$",
      "$\\dot q = -\\partial H / \\partial p$ and $\\dot p = \\partial H / \\partial q$",
      "$\\dot q = H$ and $\\dot p = -H$",
      "$\\dot q + \\dot p = 0$",
    ],
    correct: 0,
    explanation:
      "Two first-order equations replace one second-order Newton/Lagrange equation. The minus sign on $\\dot p$ is essential — without it the Hamiltonian wouldn't be conserved (when time-independent).",
  },
  {
    prompt:
      "By Liouville's theorem, Hamiltonian flow…",
    options: [
      "expands phase-space volume",
      "preserves phase-space volume",
      "shrinks phase-space volume to zero",
      "preserves only energy",
    ],
    correct: 1,
    explanation:
      "Hamiltonian flow is divergence-free in phase space (mixed partials of $H$ commute). Volume of any blob of initial conditions is preserved as it evolves.",
  },
  {
    prompt:
      "Time evolution of any phase-space function $f$ is given by…",
    options: [
      "$df/dt = \\{f, H\\} + \\partial f / \\partial t$",
      "$df/dt = f \\cdot H$",
      "$df/dt = H - f$",
      "$df/dt = 0$ always",
    ],
    correct: 0,
    explanation:
      "Bracket with $H$. Conservation laws: $\\{f, H\\} = 0$ (and no explicit time dependence) ⇒ $f$ conserved. This is the Hamiltonian form of Noether's theorem.",
  },
  {
    prompt:
      "The classical-quantum correspondence is…",
    options: [
      "$\\{f, g\\}_{\\text{Poisson}} \\leftrightarrow [\\hat f, \\hat g]_{\\text{commutator}} / (i\\hbar)$",
      "$f \\cdot g \\leftrightarrow \\hat f + \\hat g$",
      "$df/dt \\leftrightarrow d\\hat f / dt$",
      "no general correspondence exists",
    ],
    correct: 0,
    explanation:
      "Dirac's quantisation rule: classical Poisson brackets become quantum commutators with a factor of $1/(i\\hbar)$. Canonical commutator $[\\hat q, \\hat p] = i\\hbar$ comes from $\\{q, p\\} = 1$.",
  },
];
