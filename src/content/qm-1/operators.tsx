import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function OperatorsBody() {
  return (
    <>
      <p>
        Quantum mechanics has a precise structure: states are
        vectors in a Hilbert space, observables are self-adjoint
        operators on that space, and measurement outcomes are
        eigenvalues of those operators. This chapter develops the
        formalism we'll need throughout the QM journey:
        operators, expectation values, commutators, and the
        Heisenberg uncertainty principle that follows from
        non-commutativity.
      </p>
      <p>
        It's the most algebraic chapter in QM I. Module XI's
        operator theory pays off here directly.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 8.04 — Lectures 6–9 (operators)",
            author: "Allan Adams (MIT OCW)",
            duration: "~5h",
            url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
            note: "Operator approach to QM. Lectures align with this chapter.",
          },
          {
            title: "Griffiths — ch. 3 (formalism)",
            author: "David Griffiths",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Introduction_to_Quantum_Mechanics_(book)",
            note: "Hilbert space + operator approach to the QM postulates.",
          },
          {
            title: "Sakurai — ch. 1",
            author: "Sakurai / Napolitano",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Modern_Quantum_Mechanics",
            note: "Sakurai opens with the abstract operator formalism. Worth reading even at undergrad level.",
          },
          {
            title: "Hall — Quantum Theory for Mathematicians",
            author: "Brian Hall",
            duration: "Reading",
            url: "https://www.springer.com/book/9781461471158",
            note: "Mathematically rigorous unbounded operator theory for physicists.",
          },
          {
            title: "Visualising operators",
            author: "various",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=quantum+operators+visualized",
            note: "Pictures and intuition for what operators 'do' to wavefunctions.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Operators on Hilbert space</h2>

      <p>
        For a single particle in 3D, the Hilbert space is{" "}
        <InlineMath math="\mathcal H = L^2(\mathbb{R}^3)" />.
        States are unit vectors{" "}
        <InlineMath math="|\psi\rangle \in \mathcal H" />{" "}
        (equivalence classes mod overall phase, but we'll ignore
        that subtlety).
      </p>

      <p>
        An <strong>operator</strong>{" "}
        <InlineMath math="\hat A" /> is a map{" "}
        <InlineMath math="\hat A : \mathcal H \to \mathcal H" />{" "}
        (or possibly defined on a dense subspace, for unbounded
        operators).
      </p>

      <h3>Position and momentum</h3>

      <p>
        Two basic operators:
      </p>
      <ul>
        <li>
          <strong>Position</strong>{" "}
          <InlineMath math="\hat{\mathbf r} \, \psi(\mathbf r) = \mathbf r \, \psi(\mathbf r)" />.
          Multiplication by the position vector.
        </li>
        <li>
          <strong>Momentum</strong>{" "}
          <InlineMath math="\hat{\mathbf p} = -i\hbar \nabla" />.
          Differentiation, with{" "}
          <InlineMath math="-i\hbar" /> factor.
        </li>
      </ul>

      <p>
        Both are unbounded. Position takes a square-integrable{" "}
        <InlineMath math="\psi" /> to{" "}
        <InlineMath math="x \psi(x)" />, which may not be square-
        integrable. Domains are technical; we usually proceed
        formally and trust that the math works out for
        physically reasonable states.
      </p>

      <h3>The Hamiltonian</h3>

      <p>
        The total-energy operator:
      </p>
      <BlockMath math="\hat H = \frac{\hat p^2}{2m} + V(\hat{\mathbf r})." />

      <p>
        Notice <InlineMath math="V(\hat{\mathbf r})" /> means
        "apply <InlineMath math="V" />, which is a function of
        position, treating position as the operator{" "}
        <InlineMath math="\hat{\mathbf r}" />". Multiplication by{" "}
        <InlineMath math="V(\mathbf r)" /> as a function on
        wavefunctions.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Hermitian operators and observables</h2>

      <Callout title="Quantum measurement postulate">
        Every observable physical quantity (position, momentum,
        energy, angular momentum, spin component, ...) is
        represented by a self-adjoint operator{" "}
        <InlineMath math="\hat A" /> on the Hilbert space.
        Measurement of <InlineMath math="\hat A" /> yields one of
        its eigenvalues; the post-measurement state is the
        corresponding eigenstate.
      </Callout>

      <p>
        Why self-adjoint:
      </p>
      <ul>
        <li>
          Self-adjoint operators have real eigenvalues —
          measurement outcomes are real numbers.
        </li>
        <li>
          They have a complete orthonormal eigenbasis — we can
          expand any state in measurement eigenstates.
        </li>
        <li>
          They generate unitary one-parameter groups (Stone's
          theorem) — useful for symmetries.
        </li>
      </ul>

      <p>
        For a self-adjoint{" "}
        <InlineMath math="\hat A" /> with eigenstates{" "}
        <InlineMath math="|a_n\rangle" /> (eigenvalues{" "}
        <InlineMath math="a_n" />) and a state{" "}
        <InlineMath math="|\psi\rangle = \sum c_n |a_n\rangle" />,
        the probability of measuring{" "}
        <InlineMath math="a_n" /> is{" "}
        <InlineMath math="|c_n|^2" />. After measurement, the
        state collapses to{" "}
        <InlineMath math="|a_n\rangle" />.
      </p>

      <p>
        This is the <strong>Born rule</strong>, generalised from
        position to any observable. We met it for{" "}
        <InlineMath math="|\psi(\mathbf r)|^2 = " /> probability
        density of position; this is the same thing in arbitrary
        eigenbases.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Expectation values</h2>

      <p>
        The <strong>expectation value</strong> of an observable{" "}
        <InlineMath math="\hat A" /> in state{" "}
        <InlineMath math="|\psi\rangle" />:
      </p>
      <BlockMath math="\langle \hat A \rangle = \langle \psi | \hat A | \psi \rangle = \int \psi^*(\mathbf r) \hat A \psi(\mathbf r) \, d^3 r." />

      <p>
        Reads: average value of{" "}
        <InlineMath math="\hat A" /> if you make many
        measurements on identically-prepared copies of the
        state. By the Born rule:{" "}
        <InlineMath math="\langle \hat A \rangle = \sum_n a_n |c_n|^2" />.
      </p>

      <p>
        Standard deviation:
      </p>
      <BlockMath math="(\Delta A)^2 = \langle \hat A^2 \rangle - \langle \hat A \rangle^2." />

      <p>
        This <em>uncertainty</em>{" "}
        <InlineMath math="\Delta A" /> is the spread of
        measurement outcomes. For an eigenstate of{" "}
        <InlineMath math="\hat A" />,{" "}
        <InlineMath math="\Delta A = 0" /> — every measurement
        gives the same value.
      </p>

      <h3>Time evolution of expectation values</h3>

      <p>
        For Hermitian{" "}
        <InlineMath math="\hat A" /> with no explicit time
        dependence:
      </p>
      <BlockMath math="\frac{d}{dt} \langle \hat A \rangle = \frac{1}{i\hbar} \langle [\hat A, \hat H] \rangle." />

      <p>
        — <strong>Heisenberg's equation of motion</strong> for
        expectation values. Quantum analogue of classical{" "}
        <InlineMath math="d f / dt = \{f, H\}" />.{" "}
        <InlineMath math="\hat A" /> is conserved iff{" "}
        <InlineMath math="[\hat A, \hat H] = 0" /> — its
        commutator with the Hamiltonian vanishes.
      </p>

      <h3>Ehrenfest's theorem</h3>

      <p>
        Apply Heisenberg's equation to position and momentum:
      </p>
      <BlockMath math="\frac{d\langle \hat{\mathbf r} \rangle}{dt} = \frac{\langle \hat{\mathbf p} \rangle}{m}, \qquad \frac{d\langle \hat{\mathbf p} \rangle}{dt} = \langle -\nabla V \rangle = \langle \mathbf F \rangle." />

      <p>
        — <strong>Ehrenfest's theorem</strong>: expectation values
        of position and momentum obey classical equations of
        motion. So classical mechanics is recovered as the limit
        of quantum mechanics for narrow wave packets where{" "}
        <InlineMath math="\langle \mathbf F(\mathbf r) \rangle \approx \mathbf F(\langle \mathbf r \rangle)" />.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Commutators</h2>

      <p>
        For two operators <InlineMath math="\hat A, \hat B" />,
        the <strong>commutator</strong>:
      </p>
      <BlockMath math="[\hat A, \hat B] = \hat A \hat B - \hat B \hat A." />

      <p>
        For commuting operators (
        <InlineMath math="[\hat A, \hat B] = 0" />), the order of
        application doesn't matter; for non-commuting, it does.
        This is the deep new feature of quantum mechanics —
        observables don't always commute, and that's where
        uncertainty comes from.
      </p>

      <h3>The canonical commutation relation</h3>

      <Callout title="Canonical commutation relation">
        For position and momentum:
        <BlockMath math="[\hat x, \hat p] = i\hbar." />
        More generally: <InlineMath math="[\hat r_i, \hat p_j] = i\hbar \delta_{ij}" />,{" "}
        and{" "}
        <InlineMath math="[\hat r_i, \hat r_j] = [\hat p_i, \hat p_j] = 0" />.
      </Callout>

      <p>
        Verify by direct calculation: take{" "}
        <InlineMath math="[\hat x, \hat p] \psi = -i\hbar [x \, d\psi/dx - d(x\psi)/dx] = -i\hbar (x \psi' - \psi - x \psi') = i\hbar \psi" />.
        ✓
      </p>

      <p>
        Position and momentum don't commute. Their commutator is
        Planck's constant — non-commutativity is fundamental, not
        accidental, and the scale is{" "}
        <InlineMath math="\hbar" />.
      </p>

      <p>
        Recall: classical Poisson brackets give{" "}
        <InlineMath math="\{x, p\} = 1" />. The
        classical-quantum correspondence sends{" "}
        <InlineMath math="\{ \cdot, \cdot \}" /> to{" "}
        <InlineMath math="[\cdot, \cdot] / (i\hbar)" />, exactly
        consistent.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Heisenberg uncertainty principle</h2>

      <Callout title="Heisenberg uncertainty principle">
        For any two observables{" "}
        <InlineMath math="\hat A, \hat B" /> and any state:
        <BlockMath math="\Delta A \, \Delta B \geq \frac{1}{2} |\langle [\hat A, \hat B] \rangle|." />
      </Callout>

      <p>
        Specialised to position and momentum:
      </p>
      <BlockMath math="\Delta x \, \Delta p \geq \frac{\hbar}{2}." />

      <p>
        Position and momentum cannot both be known with
        arbitrary precision in the same state. A state with very
        narrow position spread necessarily has wide momentum
        spread, and vice versa. This isn't a measurement
        limitation; it's a fundamental property of the quantum
        state.
      </p>

      <p>
        The proof uses Cauchy–Schwarz on{" "}
        <InlineMath math="(\hat A - \langle A\rangle) |\psi\rangle" /> and{" "}
        <InlineMath math="(\hat B - \langle B\rangle) |\psi\rangle" />.
        The bound is <em>tight</em>: Gaussian wave packets
        saturate it for position-momentum.
      </p>

      <p>
        Other uncertainty relations:
      </p>
      <ul>
        <li>
          Energy-time:{" "}
          <InlineMath math="\Delta E \cdot \Delta t \geq \hbar/2" />.
          (More subtle — time isn't an operator in standard QM,
          so the meaning differs.)
        </li>
        <li>
          Number-phase for the harmonic oscillator:{" "}
          <InlineMath math="\Delta N \cdot \Delta \phi \geq 1/2" />.
        </li>
        <li>
          Angular momentum components don't commute:{" "}
          <InlineMath math="[\hat L_x, \hat L_y] = i\hbar \hat L_z" />,
          giving uncertainty between different components of
          angular momentum.
        </li>
      </ul>

      <Pitfall>
        Uncertainty is not measurement disturbance. It's a
        property of the <em>state itself</em>: in any quantum
        state, there's an irreducible spread in non-commuting
        observables. Even before measurement. The "I disturbed
        it by measuring it" intuition is sometimes pedagogically
        useful but mathematically misleading — the bound holds
        for ensemble averages, not single measurements.
      </Pitfall>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Compatible observables and complete sets</h2>

      <p>
        Two observables{" "}
        <InlineMath math="\hat A, \hat B" /> are{" "}
        <strong>compatible</strong> if{" "}
        <InlineMath math="[\hat A, \hat B] = 0" />. They share a
        common eigenbasis: there's a basis of states each of
        which is simultaneously an eigenstate of both. Both can
        be measured simultaneously to arbitrary precision.
      </p>

      <p>
        Examples of compatible sets:
      </p>
      <ul>
        <li>
          Energy and any conserved quantity (anything commuting
          with <InlineMath math="\hat H" />).
        </li>
        <li>
          For a free particle: energy, momentum (all components),
          and any function of momentum.
        </li>
        <li>
          For hydrogen:{" "}
          <InlineMath math="\hat H, \hat L^2, \hat L_z" /> all
          commute. Hydrogen states labelled by{" "}
          <InlineMath math="(n, \ell, m)" /> are simultaneous
          eigenstates of all three.
        </li>
      </ul>

      <p>
        A <strong>complete set of commuting observables</strong>{" "}
        (CSCO) is a maximal set of mutually commuting
        observables. Their joint eigenstates uniquely label every
        state of the system. Hydrogen's CSCO is{" "}
        <InlineMath math="\{\hat H, \hat L^2, \hat L_z, \hat S_z\}" />{" "}
        (4 quantum numbers <InlineMath math="(n, \ell, m_\ell, m_s)" />).
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Measurement</h2>

      <p>
        The standard ("Copenhagen") account of quantum
        measurement has two distinct dynamics:
      </p>

      <ul>
        <li>
          <strong>Schrödinger evolution</strong> between
          measurements: deterministic, unitary, linear.
        </li>
        <li>
          <strong>Collapse upon measurement</strong>:
          probabilistic, non-unitary, non-linear. The state{" "}
          <InlineMath math="|\psi\rangle = \sum c_n |a_n\rangle" />{" "}
          jumps to <InlineMath math="|a_n\rangle" /> with
          probability <InlineMath math="|c_n|^2" />.
        </li>
      </ul>

      <p>
        This dual structure is the so-called{" "}
        <em>measurement problem</em>: the boundary between the
        two regimes is fuzzy in fundamental theory. Many
        interpretations have been proposed (Copenhagen, many-
        worlds, hidden variables, decoherence-based), each
        making the same predictions for any actual experiment
        but disagreeing on what's "really happening." We don't
        resolve this here — it's an active topic of research
        and philosophy.
      </p>

      <p>
        Practical takeaway: between measurements, evolve via
        Schrödinger; at measurement, project onto an eigenstate
        of the measured observable, with probability given by
        Born's rule.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>Predicting any quantum experiment.</strong>{" "}
          Given a Hamiltonian and an initial state, you can
          predict probability distributions for any measurable
          quantity using the formalism here. That's quantum
          mechanics in operation.
        </li>
        <li>
          <strong>Spectroscopy.</strong> Atomic and molecular
          spectra come from the energy eigenvalues. The selection
          rules for transitions come from commutators with the
          electromagnetic perturbation. CSCO labels classify
          states; commutators predict which transitions are
          allowed.
        </li>
        <li>
          <strong>Quantum computing.</strong> Qubits are
          two-level systems; gates are unitary operators acting
          on them. Measurement = projection onto computational
          basis. Algorithms like Shor's, Grover's, and quantum
          phase estimation are sequences of unitaries followed
          by measurement.
        </li>
        <li>
          <strong>Quantum cryptography.</strong> No-cloning
          theorem (you can't perfectly copy an unknown quantum
          state) follows from the linearity of the
          evolution and the structure of unitaries. BB84 quantum
          key distribution exploits this for unconditional
          security.
        </li>
      </ul>

      <p>
        That closes Module XIV. Module XV picks up with the
        Hilbert-space formalism in full generality (Dirac
        notation), spin and angular momentum, entanglement and
        Bell inequalities, and perturbation theory. Everything
        we've used informally here gets formalised, and the
        stage is set for quantum information.
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
      "Observables in QM are represented by…",
    options: [
      "any operator",
      "self-adjoint operators (real eigenvalues, orthogonal eigenbasis)",
      "unitary operators",
      "complex numbers",
    ],
    correct: 1,
    explanation:
      "Self-adjoint = Hermitian. Real eigenvalues (= measurement outcomes), orthonormal eigenbasis (= probability decomposition). Energy, momentum, position, spin — all self-adjoint.",
  },
  {
    prompt:
      "The expectation value $\\langle \\hat A \\rangle$ in state $\\psi$ is…",
    options: [
      "$\\hat A \\psi$",
      "$\\int \\psi^* \\hat A \\psi \\, d^3 r$",
      "the maximum eigenvalue of $\\hat A$",
      "always zero",
    ],
    correct: 1,
    explanation:
      "Average over many measurements: $\\langle \\hat A \\rangle = \\langle \\psi | \\hat A | \\psi \\rangle$. Expectation value, not a single measurement result.",
  },
  {
    prompt:
      "The canonical commutator $[\\hat x, \\hat p]$ equals…",
    options: ["0", "$\\hbar$", "$i \\hbar$", "$-i\\hbar$"],
    correct: 2,
    explanation:
      "$[\\hat x, \\hat p] = i\\hbar$. Position and momentum don't commute. This non-commutativity is the source of the uncertainty principle.",
  },
  {
    prompt:
      "Heisenberg's uncertainty for position-momentum:",
    options: [
      "$\\Delta x = \\Delta p$",
      "$\\Delta x \\cdot \\Delta p \\geq \\hbar/2$",
      "$\\Delta x + \\Delta p \\geq \\hbar$",
      "$\\Delta x = 0$ implies $\\Delta p = 0$",
    ],
    correct: 1,
    explanation:
      "$\\Delta x \\cdot \\Delta p \\geq \\hbar/2$. Bound is tight (saturated by Gaussian states). Not a measurement limitation but a property of any quantum state.",
  },
  {
    prompt:
      "Two observables $\\hat A, \\hat B$ can both be measured to arbitrary precision in the same state iff…",
    options: [
      "$[\\hat A, \\hat B] = 0$",
      "$\\hat A = \\hat B$",
      "$\\hat A + \\hat B = \\hat H$",
      "they share an eigenvalue",
    ],
    correct: 0,
    explanation:
      "Compatible observables commute. Then they share a common eigenbasis, so a single state can have definite values for both. Position and momentum don't commute, so we have the uncertainty principle; energy and angular momentum about the same axis often do commute, giving simultaneous eigenstates.",
  },
];
