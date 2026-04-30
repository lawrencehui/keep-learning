import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function NewtonBody() {
  return (
    <>
      <p>
        Classical mechanics is the physics of macroscopic motion at
        speeds much less than the speed of light. Newton's laws,
        published in 1687, give a complete and accurate description
        of everything from rolling balls to planetary orbits to
        spacecraft trajectories. This module reviews Newtonian
        mechanics, then reformulates it in two more powerful
        languages — Lagrangian and Hamiltonian — that generalise
        cleanly to relativity, statistical mechanics, and (most
        importantly for our journey) quantum mechanics.
      </p>
      <p>
        We assume the math from Tiers I–XI: vectors, calculus,
        differential equations, linear algebra. The physics here is
        the smallest classical foundation that QM modifies, and the
        Lagrangian/Hamiltonian formulations are not optional — they
        are how quantum mechanics is stated. Get comfortable.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 8.01 — Classical Mechanics (Lewin)",
            author: "Walter Lewin (MIT OCW)",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/",
            note: "Lewin's lectures are the gold standard for intro mechanics. Demonstrations are unforgettable.",
          },
          {
            title: "Feynman Lectures on Physics, Vol. I",
            author: "Richard Feynman",
            duration: "Reading (free online)",
            url: "https://www.feynmanlectures.caltech.edu/",
            note: "Volumes I–II cover classical mechanics and electromagnetism with Feynman's distinctive clarity. Free online.",
          },
          {
            title: "Kleppner &amp; Kolenkow — An Introduction to Mechanics",
            author: "Kleppner / Kolenkow",
            duration: "Reading",
            url: "https://www.cambridge.org/highereducation/books/an-introduction-to-mechanics/B6F5ED60CFB6E94CC2DCB35B7CCC1ED4",
            note: "Classic rigorous undergraduate textbook. Excellent problem sets.",
          },
          {
            title: "MIT 8.012 — Physics I (advanced)",
            author: "MIT OCW",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/8-012-physics-i-classical-mechanics-fall-2008/",
            note: "More mathematical version of 8.01.",
          },
          {
            title: "Susskind — Theoretical Minimum: Classical Mechanics",
            author: "Leonard Susskind",
            duration: "~10h",
            url: "https://www.youtube.com/playlist?list=PL47F408D36D4CF129",
            note: "Susskind's lectures are a brilliant bridge from intro to advanced mechanics, motivated by physics.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Newton's three laws</h2>

      <Callout title="Newton's laws (1687)">
        <ol>
          <li>
            <strong>First law (inertia):</strong> A body at rest
            stays at rest, and a body in motion continues in motion
            with constant velocity, unless acted on by a net force.
          </li>
          <li>
            <strong>Second law:</strong>{" "}
            <InlineMath math="\mathbf{F} = m \mathbf{a}" />, or
            more precisely{" "}
            <InlineMath math="\mathbf{F} = d\mathbf{p}/dt" /> with{" "}
            <InlineMath math="\mathbf{p} = m\mathbf{v}" /> the
            momentum.
          </li>
          <li>
            <strong>Third law (action-reaction):</strong> For every
            force <InlineMath math="\mathbf{F}_{12}" /> that body 1
            exerts on body 2, body 2 exerts an equal and opposite
            force <InlineMath math="\mathbf{F}_{21} = -\mathbf{F}_{12}" />{" "}
            on body 1.
          </li>
        </ol>
      </Callout>

      <p>
        The first law defines what we mean by an{" "}
        <em>inertial frame</em>: a reference frame in which a free
        particle moves at constant velocity. The second law gives
        the equation of motion. The third law guarantees momentum
        conservation in interactions.
      </p>

      <p>
        For a single particle of mass <InlineMath math="m" /> at
        position <InlineMath math="\mathbf{r}(t)" />, the equation
        of motion is
      </p>
      <BlockMath math="m \ddot{\mathbf{r}} = \mathbf{F}(\mathbf{r}, \dot{\mathbf{r}}, t)." />

      <p>
        This is a second-order ODE in <InlineMath math="\mathbf{r}" />.
        Given initial position{" "}
        <InlineMath math="\mathbf{r}(0)" /> and velocity{" "}
        <InlineMath math="\dot{\mathbf{r}}(0)" />, the solution is
        determined for all later times (Picard–Lindelöf, under
        Lipschitz conditions on the force).
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Energy</h2>

      <p>
        For a particle moving under a force{" "}
        <InlineMath math="\mathbf{F}" />, the{" "}
        <strong>kinetic energy</strong> is
      </p>
      <BlockMath math="T = \tfrac{1}{2} m |\dot{\mathbf{r}}|^2." />

      <p>
        Differentiating with respect to time:
      </p>
      <BlockMath math="\frac{dT}{dt} = m \dot{\mathbf{r}} \cdot \ddot{\mathbf{r}} = \dot{\mathbf{r}} \cdot \mathbf{F}." />

      <p>
        — the <strong>work-energy theorem</strong>: the rate of
        change of kinetic energy equals the power delivered by the
        force.
      </p>

      <h3>Conservative forces</h3>

      <p>
        A force <InlineMath math="\mathbf{F}(\mathbf{r})" /> is{" "}
        <strong>conservative</strong> if it can be written as the
        negative gradient of a scalar potential:
      </p>
      <BlockMath math="\mathbf{F} = -\nabla V(\mathbf{r})." />

      <p>
        Equivalently (Tier IV, vector calculus):{" "}
        <InlineMath math="\mathbf{F}" /> is conservative iff{" "}
        <InlineMath math="\nabla \times \mathbf{F} = 0" /> on a
        simply-connected domain.
      </p>

      <p>
        For a conservative force, the <strong>total energy</strong>
      </p>
      <BlockMath math="E = T + V = \tfrac{1}{2} m |\dot{\mathbf{r}}|^2 + V(\mathbf{r})" />

      <p>
        is conserved:
      </p>
      <BlockMath math="\frac{dE}{dt} = m \dot{\mathbf{r}} \cdot \ddot{\mathbf{r}} + \nabla V \cdot \dot{\mathbf{r}} = \dot{\mathbf{r}} \cdot \mathbf{F} - \dot{\mathbf{r}} \cdot \mathbf{F} = 0." />

      <p>
        Energy conservation is one of the most-used principles in
        physics. It works because of a deep symmetry — invariance
        under time translation (Noether's theorem, next chapter).
      </p>

      <Pitfall>
        Friction and air resistance are <em>not</em> conservative.
        They depend on velocity, not just position, and dissipate
        energy as heat. Many real systems have non-conservative
        forces; energy isn't conserved if you only count{" "}
        <InlineMath math="T + V" />, but the total including
        thermal energy is. Statistical mechanics is what bridges
        the gap.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Momentum and angular momentum</h2>

      <p>
        For a single particle:{" "}
        <InlineMath math="\mathbf{p} = m \mathbf{v}" />.
        Newton's second law is{" "}
        <InlineMath math="\mathbf{F} = d\mathbf{p}/dt" />. So in
        the absence of external forces,{" "}
        <strong>momentum is conserved</strong>.
      </p>

      <p>
        For a system of <InlineMath math="N" /> particles with
        internal forces only (no external forces),
      </p>
      <BlockMath math="\mathbf{P} = \sum_i \mathbf{p}_i = \text{constant}." />

      <p>
        Why: by Newton's third law, internal forces cancel in
        pairs. Only external forces change the total momentum.
        Conservation of total momentum is one of the most
        important consequences of the third law.
      </p>

      <h3>Angular momentum</h3>

      <p>
        The <strong>angular momentum</strong> about an origin:
      </p>
      <BlockMath math="\mathbf{L} = \mathbf{r} \times \mathbf{p} = m \mathbf{r} \times \dot{\mathbf{r}}." />

      <p>
        Differentiating:
      </p>
      <BlockMath math="\frac{d\mathbf{L}}{dt} = \mathbf{r} \times \mathbf{F} = \boldsymbol{\tau}," />

      <p>
        where{" "}
        <InlineMath math="\boldsymbol\tau = \mathbf{r} \times \mathbf{F}" />{" "}
        is the <strong>torque</strong>. So in the absence of
        torques, angular momentum is conserved.
      </p>

      <p>
        For <strong>central forces</strong> (
        <InlineMath math="\mathbf{F} \parallel \mathbf{r}" />),{" "}
        <InlineMath math="\boldsymbol\tau = 0" />, so angular
        momentum is conserved. This is why planets move in plane
        ellipses (Kepler's first and second laws).
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Three canonical examples</h2>

      <h3>Simple harmonic oscillator</h3>

      <p>
        Mass on a spring, spring constant{" "}
        <InlineMath math="k" />:
      </p>
      <BlockMath math="m \ddot x = -k x \;\;\Rightarrow\;\; \ddot x + \omega_0^2 x = 0, \quad \omega_0 = \sqrt{k/m}." />

      <p>
        Solution:{" "}
        <InlineMath math="x(t) = A \cos(\omega_0 t + \phi)" />.
        Energy:{" "}
        <InlineMath math="E = \tfrac{1}{2} m \omega_0^2 A^2" />,
        constant.
      </p>

      <p>
        Generalises: anything near a stable equilibrium of a
        conservative force is approximately a harmonic oscillator
        (Taylor-expand <InlineMath math="V" /> to second order).
        That's why the harmonic oscillator is the most-used model
        in physics — molecular vibrations, lattice phonons,
        quantum field modes, all approximately harmonic near
        equilibrium.
      </p>

      <h3>Projectile motion</h3>

      <p>
        A projectile launched at angle <InlineMath math="\theta" />{" "}
        with initial speed <InlineMath math="v_0" /> in uniform
        gravity:
      </p>
      <BlockMath math="\ddot{\mathbf{r}} = -g \hat{\mathbf{z}}" />

      <p>
        Solution: parabolic trajectory{" "}
        <InlineMath math="z(x) = x \tan\theta - \frac{g x^2}{2 v_0^2 \cos^2\theta}" />.
        Range maximised at{" "}
        <InlineMath math="\theta = 45°" /> (no air resistance).
      </p>

      <h3>Kepler problem</h3>

      <p>
        Two bodies attracting via{" "}
        <InlineMath math="\mathbf{F} = -G m_1 m_2 \hat{\mathbf{r}}/r^2" />.
        Reduces to a one-body problem in the relative coordinate{" "}
        <InlineMath math="\mathbf{r} = \mathbf{r}_2 - \mathbf{r}_1" />.
      </p>

      <p>
        With angular momentum conservation, motion is in a plane.
        With energy conservation, the orbit is a conic section.
        For bound states (<InlineMath math="E < 0" />): an ellipse
        with the centre of mass at one focus (Kepler's first law).
        Equal areas in equal times (Kepler's second law) is just
        angular momentum conservation. The period satisfies{" "}
        <InlineMath math="T^2 \propto a^3" /> with{" "}
        <InlineMath math="a" /> the semi-major axis (Kepler's
        third law).
      </p>

      <p>
        Newton derived all three Kepler laws from{" "}
        <InlineMath math="\mathbf{F} = -GMm/r^2" /> in the{" "}
        <em>Principia</em>. It was a tour de force.
      </p>

      <Exercise
        number="4.1"
        prompt={
          <>
            For the harmonic oscillator with potential energy{" "}
            <InlineMath math="V = \tfrac{1}{2} k x^2" />, verify
            that <InlineMath math="E = T + V" /> is constant on
            solutions <InlineMath math="x(t) = A \cos(\omega_0 t)" />.
          </>
        }
      >
        <p>
          <InlineMath math="x = A \cos(\omega_0 t)" />, so{" "}
          <InlineMath math="\dot x = -A \omega_0 \sin(\omega_0 t)" />.
        </p>
        <p>
          <InlineMath math="T = \tfrac{1}{2} m \dot x^2 = \tfrac{1}{2} m A^2 \omega_0^2 \sin^2(\omega_0 t)" />.
        </p>
        <p>
          <InlineMath math="V = \tfrac{1}{2} k x^2 = \tfrac{1}{2} k A^2 \cos^2(\omega_0 t)" />.
        </p>
        <p>
          Using <InlineMath math="m \omega_0^2 = k" />:{" "}
          <InlineMath math="E = T + V = \tfrac{1}{2} k A^2 (\sin^2 + \cos^2) = \tfrac{1}{2} k A^2" />,
          constant. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Why this matters</h2>

      <ul>
        <li>
          <strong>Engineering.</strong> Every machine, building,
          vehicle, or spacecraft is designed using Newtonian
          mechanics (often with finite-element methods, but the
          underlying physics is Newton).
        </li>
        <li>
          <strong>Astronomy.</strong> Solar-system dynamics, ​​
          spacecraft trajectories, and orbital mechanics are all
          Newtonian (with general-relativistic corrections for
          high precision).
        </li>
        <li>
          <strong>Statistical mechanics.</strong> The microscopic
          dynamics of atoms in a gas are Newtonian; statistical
          mechanics derives macroscopic thermodynamics from this
          picture. The bridge to QM happens at very low
          temperature or very small length scales, where wave
          effects matter.
        </li>
        <li>
          <strong>Foundation for QM.</strong> The Lagrangian and
          Hamiltonian formulations (next two chapters) <em>generalise</em>{" "}
          to QM directly. The Hamiltonian becomes the operator of
          the same name; Poisson brackets become commutators.
          Quantum mechanics is built on the skeleton of classical
          mechanics.
        </li>
      </ul>

      <p>
        Next chapter: Lagrangian mechanics — a more elegant
        formulation based on the principle of least action. It
        generalises better, ties symmetries to conservation laws
        directly (Noether), and is the natural language of every
        modern field theory.
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
      "Newton's second law states…",
    options: [
      "$F = ma$ only for constant mass",
      "$F = dp/dt$, with $p = mv$",
      "$F + ma = 0$",
      "force equals work",
    ],
    correct: 1,
    explanation:
      "$\\mathbf{F} = d\\mathbf{p}/dt$ is the precise statement. For constant mass it reduces to $F = ma$, but for variable mass (rocket equation) the more general form is needed.",
  },
  {
    prompt:
      "A force $\\mathbf{F}$ is conservative iff…",
    options: [
      "it does no work",
      "it equals $-\\nabla V$ for some potential $V$",
      "it depends only on velocity",
      "it is constant",
    ],
    correct: 1,
    explanation:
      "Conservative force = gradient of a potential. Equivalently, $\\nabla \\times \\mathbf{F} = 0$ on a simply-connected domain — the curl-free condition from vector calculus.",
  },
  {
    prompt:
      "Total mechanical energy $E = T + V$ is conserved…",
    options: [
      "always",
      "iff the force is conservative",
      "iff the motion is periodic",
      "iff $V = 0$",
    ],
    correct: 1,
    explanation:
      "Conservative force ⇒ energy conservation. The work-energy theorem says $dT/dt = \\dot{\\mathbf{r}} \\cdot \\mathbf{F}$; for $\\mathbf{F} = -\\nabla V$ this gives $d(T + V)/dt = 0$.",
  },
  {
    prompt:
      "Angular momentum $\\mathbf{L} = \\mathbf{r} \\times \\mathbf{p}$ is conserved when…",
    options: [
      "always",
      "the force is central (parallel to $\\mathbf{r}$)",
      "the force is uniform",
      "the body is at rest",
    ],
    correct: 1,
    explanation:
      "$d\\mathbf{L}/dt = \\boldsymbol\\tau = \\mathbf{r} \\times \\mathbf{F}$. Central forces have $\\mathbf{F} \\parallel \\mathbf{r}$, hence zero torque and conserved $\\mathbf{L}$. This is why planetary orbits are planar.",
  },
  {
    prompt:
      "Kepler's third law $T^2 \\propto a^3$ for planetary orbits comes from…",
    options: [
      "Newton's first law",
      "energy conservation alone",
      "Newton's law of universal gravitation $F = GMm/r^2$",
      "the equivalence principle",
    ],
    correct: 2,
    explanation:
      "All three Kepler laws are derived from $F = GMm/r^2$. Newton's accomplishment in the *Principia* was deriving these empirical regularities from a single mathematical force law.",
  },
];
