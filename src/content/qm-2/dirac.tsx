import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function DiracBody() {
  return (
    <>
      <p>
        QM I introduced wavefunctions as functions of position{" "}
        <InlineMath math="\psi(\mathbf r, t)" />. That's one
        representation. There are others — momentum-space{" "}
        <InlineMath math="\tilde\psi(\mathbf p)" />, energy-
        eigenstate decomposition{" "}
        <InlineMath math="\sum c_n |\phi_n\rangle" />, and so on.
        Each captures the same state in different coordinates of
        a Hilbert space. Dirac notation (1939) is the abstract
        notation that makes all representations look the same:
        states are kets <InlineMath math="|\psi\rangle" />,
        observables are operators, and inner products are{" "}
        <InlineMath math="\langle \phi | \psi \rangle" />. This
        chapter is the one most heavily used in quantum
        information.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 8.05 — Quantum Physics II (Zwiebach)",
            author: "Barton Zwiebach (MIT OCW)",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/",
            note: "Zwiebach's lectures are the standard for the abstract Hilbert-space approach.",
          },
          {
            title: "Sakurai — Modern Quantum Mechanics, ch. 1",
            author: "Sakurai / Napolitano",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Modern_Quantum_Mechanics",
            note: "Sakurai opens with Dirac notation. The standard graduate textbook for this material.",
          },
          {
            title: "Nielsen &amp; Chuang — Quantum Information, ch. 2",
            author: "Nielsen / Chuang",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Quantum_Computation_and_Quantum_Information",
            note: "Compact pragmatic introduction to bra-ket and operators for QC.",
          },
          {
            title: "Griffiths — Introduction to QM, ch. 3",
            author: "David Griffiths",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Introduction_to_Quantum_Mechanics_(book)",
            note: "Translation between wavefunction and Dirac approaches at undergraduate level.",
          },
          {
            title: "Hall — Quantum Theory for Mathematicians, ch. 6–8",
            author: "Brian Hall",
            duration: "Reading",
            url: "https://www.springer.com/book/9781461471158",
            note: "The mathematically rigorous version. Worth reading once you've absorbed the physicist version.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Kets and bras</h2>

      <Callout title="Kets and bras">
        States in a quantum system are represented by{" "}
        <strong>kets</strong>{" "}
        <InlineMath math="|\psi\rangle" /> — vectors in a Hilbert
        space <InlineMath math="\mathcal H" />. The dual space is
        spanned by <strong>bras</strong>{" "}
        <InlineMath math="\langle \phi |" />, which act on kets to
        produce complex numbers via the inner product:
        <BlockMath math="\langle \phi | \psi \rangle \in \mathbb{C}." />
      </Callout>

      <p>
        Properties of the inner product (physicist convention):
      </p>
      <ul>
        <li>
          <InlineMath math="\langle \phi | \psi \rangle = \overline{\langle \psi | \phi \rangle}" />.
        </li>
        <li>
          <InlineMath math="\langle \phi | (\alpha |\psi_1\rangle + \beta |\psi_2\rangle) = \alpha \langle \phi | \psi_1 \rangle + \beta \langle \phi | \psi_2 \rangle" />{" "}
          (linear in the second slot).
        </li>
        <li>
          <InlineMath math="\langle \psi | \psi \rangle \geq 0" />,
          equality iff{" "}
          <InlineMath math="|\psi\rangle = 0" />.
        </li>
      </ul>

      <p>
        For continuous representations:
      </p>
      <BlockMath math="\langle \phi | \psi \rangle = \int \phi^*(\mathbf r) \psi(\mathbf r) \, d^3 r." />

      <p>
        Wavefunctions are just kets in the position
        representation:{" "}
        <InlineMath math="\psi(\mathbf r) = \langle \mathbf r | \psi \rangle" />,
        where{" "}
        <InlineMath math="|\mathbf r\rangle" /> is the (formal)
        position eigenstate.
      </p>

      <Pitfall>
        <InlineMath math="|\mathbf r\rangle" /> is not a proper
        Hilbert-space vector — it's a "delta-function" eigenstate
        of the position operator with{" "}
        <InlineMath math="\langle \mathbf r | \mathbf{r}' \rangle = \delta(\mathbf r - \mathbf{r}')" />.
        It lives in a rigged Hilbert space (Gelfand triple). For
        practical purposes treat it as a basis even though it's
        not in <InlineMath math="L^2" />. Same for momentum
        eigenstates <InlineMath math="|\mathbf p\rangle" />.
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Operators</h2>

      <p>
        Operators act on kets:{" "}
        <InlineMath math="\hat A |\psi\rangle = |\hat A \psi\rangle" />.
        Matrix elements:
      </p>
      <BlockMath math="\langle \phi | \hat A | \psi \rangle = \int \phi^*(\mathbf r) \hat A \psi(\mathbf r) \, d^3 r." />

      <p>
        For an operator{" "}
        <InlineMath math="\hat A" />, its{" "}
        <strong>adjoint</strong>{" "}
        <InlineMath math="\hat A^\dagger" /> is defined by
      </p>
      <BlockMath math="\langle \phi | \hat A^\dagger | \psi \rangle = \overline{\langle \psi | \hat A | \phi \rangle}." />

      <p>
        Hermitian:{" "}
        <InlineMath math="\hat A^\dagger = \hat A" />. Unitary:{" "}
        <InlineMath math="\hat U^\dagger \hat U = \hat U \hat U^\dagger = I" />.
        Same definitions as Tier XI, just with bra-ket
        notation.
      </p>

      <h3>Outer products</h3>

      <p>
        <InlineMath math="|\psi\rangle\langle \phi|" /> is an
        operator: it takes a ket{" "}
        <InlineMath math="|\chi\rangle" /> and outputs{" "}
        <InlineMath math="\langle \phi | \chi \rangle |\psi\rangle" />.
        For{" "}
        <InlineMath math="|\psi\rangle = |\phi\rangle" />, this is
        the orthogonal projection onto the line through{" "}
        <InlineMath math="|\psi\rangle" />.
      </p>

      <h3>Completeness / resolution of the identity</h3>

      <p>
        For an orthonormal basis{" "}
        <InlineMath math="\{|n\rangle\}" />:
      </p>
      <BlockMath math="\sum_n |n\rangle \langle n | = \hat I." />

      <p>
        For continuous bases (position):
      </p>
      <BlockMath math="\int |\mathbf r\rangle\langle \mathbf r| \, d^3 r = \hat I." />

      <p>
        Inserting this anywhere is "completeness": just multiply
        by a sum of projections that sums to the identity. Used
        constantly to translate between representations.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Representations</h2>

      <p>
        A {" "}
        <strong>representation</strong> is a choice of
        orthonormal basis. The state{" "}
        <InlineMath math="|\psi\rangle" /> is described by its
        components in that basis.
      </p>

      <h3>Position representation</h3>

      <p>
        Wavefunctions{" "}
        <InlineMath math="\psi(\mathbf r) = \langle \mathbf r | \psi \rangle" />.
        Position operator acts as multiplication; momentum as{" "}
        <InlineMath math="-i\hbar \nabla" />.
      </p>

      <h3>Momentum representation</h3>

      <p>
        Wavefunctions{" "}
        <InlineMath math="\tilde\psi(\mathbf p) = \langle \mathbf p | \psi \rangle" />.
        Momentum operator multiplies by{" "}
        <InlineMath math="\mathbf p" />; position acts as{" "}
        <InlineMath math="i\hbar \nabla_{\mathbf p}" />.
      </p>

      <p>
        The transition between representations is a Fourier
        transform:
      </p>
      <BlockMath math="\langle \mathbf r | \mathbf p \rangle = \frac{1}{(2\pi\hbar)^{3/2}} e^{i \mathbf p \cdot \mathbf r / \hbar}." />

      <p>
        So{" "}
        <InlineMath math="\tilde\psi(\mathbf p) = (1/(2\pi\hbar)^{3/2}) \int e^{-i \mathbf p \cdot \mathbf r / \hbar} \psi(\mathbf r) d^3 r" />.
      </p>

      <h3>Energy-eigenstate (number) representation</h3>

      <p>
        Wavefunctions{" "}
        <InlineMath math="c_n = \langle n | \psi \rangle" /> with{" "}
        <InlineMath math="|n\rangle" /> energy eigenstates. Time
        evolution is then trivial:{" "}
        <InlineMath math="c_n(t) = c_n(0) e^{-i E_n t/\hbar}" />.
      </p>

      <p>
        For each problem, pick the representation that makes the
        operator you care about diagonal. Usual choices: position
        for spatial problems, momentum for free particles, energy
        eigenstates for time evolution, and often a "mixed" basis
        when there's a CSCO.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Density matrices and mixed states</h2>

      <p>
        So far we've described systems by single ket vectors —{" "}
        <strong>pure states</strong>. For an ensemble with
        statistical uncertainty, or for a sub-system of an
        entangled larger system, we need <strong>density
        matrices</strong>.
      </p>

      <Callout title="Density operator">
        For an ensemble that is in state{" "}
        <InlineMath math="|\psi_i\rangle" /> with probability{" "}
        <InlineMath math="p_i" />, the density operator is
        <BlockMath math="\hat \rho = \sum_i p_i |\psi_i\rangle \langle \psi_i|." />
        It's positive-semidefinite, Hermitian, and has{" "}
        <InlineMath math="\mathrm{tr}\,\hat \rho = 1" />.
      </Callout>

      <p>
        Pure-state density matrix:{" "}
        <InlineMath math="\hat \rho = |\psi\rangle\langle \psi|" />,{" "}
        <InlineMath math="\hat \rho^2 = \hat \rho" /> (a
        projection). Mixed states have{" "}
        <InlineMath math="\hat \rho^2 \neq \hat \rho" /> — they
        are weighted sums of projections.
      </p>

      <p>
        Expectation values:
      </p>
      <BlockMath math="\langle \hat A \rangle = \mathrm{tr}(\hat \rho \hat A)." />

      <p>
        Time evolution (Liouville / von Neumann):
      </p>
      <BlockMath math="i\hbar \frac{d \hat \rho}{dt} = [\hat H, \hat \rho]." />

      <p>
        The classical analogue: classical Liouville's theorem
        about phase-space density{" "}
        <InlineMath math="d\rho/dt = -\{H, \rho\}" />. Same
        algebraic structure with commutators replacing Poisson
        brackets.
      </p>

      <h3>Why mixed states are unavoidable</h3>

      <p>
        Even if the universe is in a pure state globally,
        sub-systems generically aren't. Tracing out an{" "}
        <em>environment</em> (degrees of freedom you don't track)
        produces a reduced density matrix that is mixed — and
        this is the mechanism of <strong>decoherence</strong>{" "}
        which we'll see in Tier XVI.
      </p>

      <p>
        Density matrices are also the natural language for
        thermal states:
      </p>
      <BlockMath math="\hat \rho_{\mathrm{thermal}} = \frac{e^{-\beta \hat H}}{Z}, \quad Z = \mathrm{tr}\,e^{-\beta \hat H}." />

      <p>
        Quantum statistical mechanics is "QM with thermal
        density matrices."
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Pictures of dynamics</h2>

      <p>
        Two equivalent ways to describe time evolution:
      </p>

      <h3>Schrödinger picture</h3>

      <p>
        States evolve, operators are fixed. The state at time{" "}
        <InlineMath math="t" />:
      </p>
      <BlockMath math="|\psi(t)\rangle = \hat U(t) |\psi(0)\rangle, \quad \hat U(t) = e^{-i \hat H t / \hbar}." />

      <h3>Heisenberg picture</h3>

      <p>
        States are fixed, operators evolve:
      </p>
      <BlockMath math="\hat A_H(t) = \hat U^\dagger(t) \hat A \hat U(t)." />

      <p>
        The Heisenberg equation of motion:
      </p>
      <BlockMath math="\frac{d \hat A_H}{dt} = \frac{1}{i\hbar} [\hat A_H, \hat H]." />

      <p>
        Direct quantum analogue of classical{" "}
        <InlineMath math="df/dt = \{f, H\}" />.
      </p>

      <h3>Interaction picture</h3>

      <p>
        For{" "}
        <InlineMath math="\hat H = \hat H_0 + \hat V" /> where{" "}
        <InlineMath math="\hat H_0" /> is exactly solvable:
        states evolve under <InlineMath math="\hat V" />,
        operators evolve under{" "}
        <InlineMath math="\hat H_0" />. Used in time-dependent
        perturbation theory (Chapter 4) and quantum field theory.
      </p>

      <p>
        All three pictures give identical predictions for
        observables. Choose whichever simplifies your problem.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Quantum information.</strong> All of QC
          notation is bra-ket. Qubits are kets in{" "}
          <InlineMath math="\mathbb{C}^2" />, gates are unitary
          operators. Multi-qubit states use tensor products of
          kets. We use this notation throughout Tier XVI.
        </li>
        <li>
          <strong>Field theory.</strong> Fock space (the Hilbert
          space of QFT) is built from creation and annihilation
          operators acting on a vacuum ket{" "}
          <InlineMath math="|0\rangle" />. Multi-particle states
          are{" "}
          <InlineMath math="\hat a^\dagger \hat a^\dagger \cdots |0\rangle" />.
        </li>
        <li>
          <strong>Open quantum systems.</strong> Density matrices
          are essential when you can't track all the environment.
          The Lindblad master equation generalises the von
          Neumann equation to dissipative systems and forms the
          basis of decoherence theory.
        </li>
        <li>
          <strong>Quantum statistical mechanics.</strong> Thermal
          density matrices give partition functions, entropies,
          and free energies. Quantum thermodynamics is statistics
          on density operators.
        </li>
      </ul>

      <p>
        Next chapter: spin and angular momentum — the
        finite-dimensional quantum systems that QC uses
        directly. Pauli matrices, Stern-Gerlach, addition of
        angular momenta — the operator algebra of qubits and
        higher spins.
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
      "In Dirac notation, the inner product of two states is written as…",
    options: [
      "$|\\psi\\rangle |\\phi\\rangle$",
      "$\\langle \\phi | \\psi \\rangle$",
      "$|\\psi\\rangle \\langle \\phi|$",
      "$\\psi \\cdot \\phi$",
    ],
    correct: 1,
    explanation:
      "Bra times ket = inner product (a complex number). Ket times bra (outer product, $|\\psi\\rangle\\langle\\phi|$) is an operator. Order matters.",
  },
  {
    prompt:
      "The completeness relation $\\sum_n |n\\rangle\\langle n|$ for an ON basis equals…",
    options: [
      "0",
      "$|n\\rangle$",
      "the identity operator $\\hat I$",
      "the trace",
    ],
    correct: 2,
    explanation:
      "Resolution of the identity. Insert it anywhere in matrix elements — that's how you change basis or take projections.",
  },
  {
    prompt:
      "A density matrix $\\hat\\rho$ describes a pure state iff…",
    options: [
      "$\\hat\\rho = \\hat I$",
      "$\\hat\\rho^2 = \\hat\\rho$ (and tr $\\hat\\rho = 1$)",
      "$\\det \\hat\\rho = 1$",
      "$\\hat\\rho$ has only positive entries",
    ],
    correct: 1,
    explanation:
      "Pure state ⇔ $\\hat\\rho = |\\psi\\rangle\\langle\\psi|$, which is a projection: $\\hat\\rho^2 = \\hat\\rho$. Mixed states have $\\hat\\rho^2 < \\hat\\rho$ (in operator order) — the trace of $\\hat\\rho^2$ measures purity.",
  },
  {
    prompt:
      "In the Heisenberg picture…",
    options: [
      "states evolve and operators are fixed",
      "operators evolve and states are fixed",
      "neither evolves",
      "both evolve",
    ],
    correct: 1,
    explanation:
      "Heisenberg: states static, operators evolve via $\\hat A_H(t) = \\hat U^\\dagger \\hat A \\hat U$. Schrödinger: states evolve, operators static. They give the same predictions.",
  },
  {
    prompt:
      "The thermal density matrix at temperature $T$ is…",
    options: [
      "$|0\\rangle\\langle 0|$",
      "$\\hat I$",
      "$e^{-\\beta \\hat H}/Z$ with $\\beta = 1/(k_B T)$",
      "always pure",
    ],
    correct: 2,
    explanation:
      "Quantum Gibbs state: $\\hat\\rho = e^{-\\beta\\hat H}/Z$ where $Z = \\mathrm{tr}\\,e^{-\\beta\\hat H}$ is the partition function. This is a mixed state (except at $T = 0$).",
  },
];
