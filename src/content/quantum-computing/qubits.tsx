import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function QubitsBody() {
  return (
    <>
      <p>
        We've arrived at the destination. Module XVI applies the
        full toolkit — linear algebra, complex Hilbert space,
        spin-1/2, entanglement, number theory, abstract algebra
        — to quantum information and computing. By the end of
        this module you'll understand: how a qubit works, how
        quantum circuits compose, how Shor's algorithm factors
        integers exponentially faster than classical methods,
        why this breaks RSA and ECDSA, and what comes after
        (post-quantum cryptography).
      </p>
      <p>
        This first chapter is the foundation: the qubit, the
        Bloch sphere, and the quantum-information re-statement
        of Module XV's spin-1/2 mathematics.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Nielsen &amp; Chuang — Quantum Computation and Quantum Information",
            author: "Nielsen / Chuang",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Quantum_Computation_and_Quantum_Information",
            note: "The standard reference for quantum information. Comprehensive and clear.",
          },
          {
            title: "MIT 6.S089 — Introduction to Quantum Computing",
            author: "MIT OCW",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/6-s089-introduction-to-quantum-computing-january-iap-2023/",
            note: "MIT undergraduate intro course. Lecture notes and problem sets available.",
          },
          {
            title: "Quantum Country (interactive textbook)",
            author: "Andy Matuschak / Michael Nielsen",
            duration: "~5h",
            url: "https://quantum.country/",
            note: "Spaced-repetition learning of QC basics. Excellent for retention.",
          },
          {
            title: "Qiskit Textbook",
            author: "IBM Qiskit",
            duration: "~30h",
            url: "https://learning.quantum.ibm.com/",
            note: "Hands-on quantum programming with the Qiskit framework. Run circuits on real quantum hardware.",
          },
          {
            title: "Mermin — Quantum Computer Science",
            author: "N. David Mermin",
            duration: "Reading",
            url: "https://www.cambridge.org/9780521876582",
            note: "Compact, lucid intro to QC for computer scientists. Great alternative to N&C.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The qubit</h2>

      <p>
        A <strong>classical bit</strong> is in state{" "}
        <InlineMath math="0" /> or <InlineMath math="1" />. A{" "}
        <strong>qubit</strong> is a quantum two-level system —
        any unit vector in <InlineMath math="\mathbb{C}^2" />.
      </p>

      <Callout title="Qubit state">
        A qubit state is
        <BlockMath math="|\psi\rangle = \alpha |0\rangle + \beta |1\rangle, \qquad |\alpha|^2 + |\beta|^2 = 1," />
        with{" "}
        <InlineMath math="\alpha, \beta \in \mathbb{C}" />.
      </Callout>

      <p>
        <InlineMath math="|0\rangle, |1\rangle" /> are the
        computational basis. Physically, they correspond to{" "}
        <InlineMath math="\hat S_z" /> eigenstates{" "}
        <InlineMath math="|+\rangle, |-\rangle" /> of a spin-1/2
        system — but qubits don't have to be spins. Common
        physical realisations:
      </p>

      <ul>
        <li>
          <strong>Spin-1/2 nuclei</strong> (NMR quantum
          computing).
        </li>
        <li>
          <strong>Trapped ions</strong> (Ca+, Yb+ — long
          coherence, slow gates).
        </li>
        <li>
          <strong>Superconducting transmons</strong> (IBM,
          Google — the dominant platform today).
        </li>
        <li>
          <strong>Photonic polarisation</strong> (
          horizontal/vertical or circular).
        </li>
        <li>
          <strong>Neutral atoms in optical tweezers</strong>{" "}
          (Rydberg arrays — fast-rising platform).
        </li>
        <li>
          <strong>Topological qubits</strong> (Majorana fermions
          — proposed but not yet demonstrated).
        </li>
      </ul>

      <p>
        Different platforms have different qubit-encodings, but
        the abstract math is identical: a unit vector in{" "}
        <InlineMath math="\mathbb{C}^2" />. From here on, we
        work abstractly.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Superposition</h2>

      <p>
        The crucial new feature: between measurements, a qubit
        can be in a <strong>superposition</strong>{" "}
        <InlineMath math="\alpha |0\rangle + \beta |1\rangle" />{" "}
        with both <InlineMath math="\alpha" /> and{" "}
        <InlineMath math="\beta" /> nonzero. It's not "
        secretly 0 or 1 with some probability"; the amplitudes
        themselves are physical and can interfere.
      </p>

      <p>
        Famous examples:
      </p>
      <ul>
        <li>
          <strong>Plus state</strong>{" "}
          <InlineMath math="|+\rangle = \tfrac{1}{\sqrt 2}(|0\rangle + |1\rangle)" />:
          equal superposition.
        </li>
        <li>
          <strong>Minus state</strong>{" "}
          <InlineMath math="|-\rangle = \tfrac{1}{\sqrt 2}(|0\rangle - |1\rangle)" />:
          equal magnitude, opposite phase.
        </li>
      </ul>

      <p>
        Both <InlineMath math="|+\rangle" /> and{" "}
        <InlineMath math="|-\rangle" /> give 50/50 outcomes when
        measured in the computational basis. They differ
        only in their <em>phase</em> — but that phase matters
        for further quantum operations. Measure them in the
        Hadamard basis (
        <InlineMath math="\{|+\rangle, |-\rangle\}" />) and you
        get definite outcomes.
      </p>

      <Pitfall>
        Probabilities are real, but amplitudes are complex —
        they can interfere. A superposition isn't a
        probabilistic mixture. The state{" "}
        <InlineMath math="|+\rangle" /> behaves identically to{" "}
        <InlineMath math="|-\rangle" /> only for{" "}
        <InlineMath math="\hat\sigma_z" /> measurements. Apply a
        Hadamard, and they're maximally distinguishable.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Bloch sphere</h2>

      <p>
        Modulo overall phase (which is unobservable), every
        normalised qubit state can be written as
      </p>
      <BlockMath math="|\psi\rangle = \cos(\theta/2) |0\rangle + e^{i \varphi} \sin(\theta/2) |1\rangle," />

      <p>
        with <InlineMath math="\theta \in [0, \pi]" /> and{" "}
        <InlineMath math="\varphi \in [0, 2\pi)" />. These are
        the spherical coordinates of a unit vector in 3D — the{" "}
        <strong>Bloch sphere</strong>.
      </p>

      <Callout title="The Bloch sphere">
        Pure qubit states correspond bijectively to points on
        the unit sphere{" "}
        <InlineMath math="S^2 \subset \mathbb{R}^3" />, with
        coordinates
        <BlockMath math="\mathbf{r} = (\sin\theta \cos\varphi, \sin\theta \sin\varphi, \cos\theta)." />
      </Callout>

      <p>
        Standard correspondence:
      </p>
      <ul>
        <li>
          <InlineMath math="|0\rangle" /> = north pole (
          <InlineMath math="z = +1" />).
        </li>
        <li>
          <InlineMath math="|1\rangle" /> = south pole (
          <InlineMath math="z = -1" />).
        </li>
        <li>
          <InlineMath math="|+\rangle" /> = +x axis,{" "}
          <InlineMath math="|-\rangle" /> = −x axis.
        </li>
        <li>
          <InlineMath math="|+i\rangle = (|0\rangle + i|1\rangle)/\sqrt 2" /> =
          +y axis,{" "}
          <InlineMath math="|-i\rangle" /> = −y axis.
        </li>
      </ul>

      <p>
        Antipodal points on the Bloch sphere are{" "}
        <em>orthogonal</em> states. The "north" and "south"
        poles are{" "}
        <InlineMath math="|0\rangle, |1\rangle" /> — perfectly
        distinguishable.
      </p>

      <h3>Mixed states</h3>

      <p>
        A general (mixed or pure) qubit state is
      </p>
      <BlockMath math="\hat \rho = \frac{1}{2}(I + \mathbf{r} \cdot \boldsymbol{\sigma})" />

      <p>
        with{" "}
        <InlineMath math="\mathbf{r} \in \mathbb{R}^3" /> the{" "}
        <strong>Bloch vector</strong>. Pure states have{" "}
        <InlineMath math="|\mathbf r| = 1" /> (sphere surface);
        mixed states have{" "}
        <InlineMath math="|\mathbf r| < 1" /> (inside the
        sphere). The maximally mixed state{" "}
        <InlineMath math="\hat\rho = I/2" /> is the centre.
      </p>

      <p>
        The Bloch ball is the geometric picture of all qubit
        states. Quantum operations act geometrically on this
        ball:
      </p>
      <ul>
        <li>
          Unitaries are rotations of the sphere.
        </li>
        <li>
          Decoherence shrinks the Bloch vector toward the
          centre.
        </li>
        <li>
          Measurement projects onto the corresponding axis.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Multiple qubits</h2>

      <p>
        For <InlineMath math="n" /> qubits, the joint Hilbert
        space is{" "}
        <InlineMath math="\mathbb{C}^2 \otimes \cdots \otimes \mathbb{C}^2 = \mathbb{C}^{2^n}" />,
        with computational basis{" "}
        <InlineMath math="|x\rangle" /> for{" "}
        <InlineMath math="x \in \{0, 1\}^n" /> (
        <InlineMath math="2^n" /> strings).
      </p>

      <p>
        For 2 qubits:{" "}
        <InlineMath math="|00\rangle, |01\rangle, |10\rangle, |11\rangle" />.
        For 3 qubits: 8 states. For 50 qubits: about{" "}
        <InlineMath math="10^{15}" /> states. For 300 qubits:
        more states than atoms in the observable universe.
      </p>

      <p>
        The exponential dimension is the source of quantum
        computing's potential power. Classical simulation
        requires storing{" "}
        <InlineMath math="2^n" /> complex amplitudes — beyond
        memory limits at about{" "}
        <InlineMath math="n = 50" />. A real quantum computer
        can manipulate this state directly with{" "}
        <InlineMath math="O(n)" /> physical qubits.
      </p>

      <h3>Entanglement</h3>

      <p>
        Most multi-qubit states are entangled (not separable).
        A separable state factors as{" "}
        <InlineMath math="|\psi_1\rangle \otimes \cdots \otimes |\psi_n\rangle" />,
        a product of single-qubit states. Generic states are
        not factorable.
      </p>

      <p>
        Examples (Module XV):
      </p>
      <ul>
        <li>
          <InlineMath math="|+0\rangle = |+\rangle \otimes |0\rangle" />:
          separable.
        </li>
        <li>
          <InlineMath math="|\Phi^+\rangle = (|00\rangle + |11\rangle)/\sqrt 2" />:
          entangled (Bell state).
        </li>
        <li>
          <InlineMath math="|\mathrm{GHZ}\rangle = (|000\rangle + |111\rangle)/\sqrt 2" />:
          a 3-qubit entangled state, generalising Bell.
        </li>
      </ul>

      <p>
        Entanglement is the key resource of QC. Without it,
        quantum algorithms have no advantage.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Measurement</h2>

      <p>
        A computational-basis measurement of a qubit gives
        outcome 0 or 1. For state{" "}
        <InlineMath math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle" />:
      </p>
      <ul>
        <li>
          Outcome 0 with probability{" "}
          <InlineMath math="|\alpha|^2" />; post-measurement state{" "}
          <InlineMath math="|0\rangle" />.
        </li>
        <li>
          Outcome 1 with probability{" "}
          <InlineMath math="|\beta|^2" />; post-measurement state{" "}
          <InlineMath math="|1\rangle" />.
        </li>
      </ul>

      <p>
        Measurement is irreversible — it collapses the
        superposition, destroying the original amplitude
        information. This is a feature, not a bug: it's how we
        extract classical information from quantum systems.
      </p>

      <h3>Measuring in other bases</h3>

      <p>
        To measure in the Hadamard basis (
        <InlineMath math="\{|+\rangle, |-\rangle\}" />), apply a
        Hadamard gate (next chapter) to rotate the basis to
        computational, then measure. Equivalent to measuring{" "}
        <InlineMath math="\hat\sigma_x" /> directly.
      </p>

      <p>
        Generally, measuring an observable{" "}
        <InlineMath math="\hat A" /> with eigenstates{" "}
        <InlineMath math="|a_n\rangle" /> projects onto an
        eigenstate with probability{" "}
        <InlineMath math="|\langle a_n | \psi \rangle|^2" /> and
        gives the eigenvalue <InlineMath math="a_n" /> as
        outcome.
      </p>

      <h3>Multi-qubit measurements</h3>

      <p>
        Measuring all <InlineMath math="n" /> qubits in the
        computational basis gives a string{" "}
        <InlineMath math="x \in \{0, 1\}^n" /> with probability{" "}
        <InlineMath math="|\langle x | \psi \rangle|^2" />.
      </p>

      <p>
        Partial measurements are also possible. For a Bell
        state{" "}
        <InlineMath math="|\Phi^+\rangle = (|00\rangle + |11\rangle)/\sqrt 2" />,
        measuring just the first qubit:
      </p>
      <ul>
        <li>
          0 with probability 1/2; second qubit collapses to{" "}
          <InlineMath math="|0\rangle" />.
        </li>
        <li>
          1 with probability 1/2; second qubit collapses to{" "}
          <InlineMath math="|1\rangle" />.
        </li>
      </ul>

      <p>
        — perfect correlation. This is what made Einstein
        uncomfortable; we now know it's just how nature works.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · No-cloning theorem</h2>

      <Callout title="No-cloning theorem (Wootters &amp; Zurek, Dieks 1982)">
        There is no unitary operator{" "}
        <InlineMath math="U" /> that takes{" "}
        <InlineMath math="|\psi\rangle \otimes |0\rangle" /> to{" "}
        <InlineMath math="|\psi\rangle \otimes |\psi\rangle" /> for
        all <InlineMath math="|\psi\rangle" />.
      </Callout>

      <p>
        Proof: suppose such{" "}
        <InlineMath math="U" /> exists. Apply to two states:{" "}
        <InlineMath math="U|\phi\rangle |0\rangle = |\phi\rangle|\phi\rangle" />,{" "}
        <InlineMath math="U|\psi\rangle |0\rangle = |\psi\rangle|\psi\rangle" />.
        Take inner products:{" "}
        <InlineMath math="\langle \phi|\psi\rangle = (\langle\phi|\psi\rangle)^2" />.
        So <InlineMath math="\langle\phi|\psi\rangle \in \{0, 1\}" />,
        meaning <InlineMath math="\phi" /> and{" "}
        <InlineMath math="\psi" /> are either identical or
        orthogonal — but a cloning machine should work for any
        states. Contradiction. ∎
      </p>

      <p>
        Consequences:
      </p>
      <ul>
        <li>
          You can't copy unknown quantum information. So
          quantum information can't be backed up the way
          classical data can.
        </li>
        <li>
          Quantum cryptography: an eavesdropper can't copy
          intercepted quantum bits. This is the basis of BB84
          security.
        </li>
        <li>
          Quantum error correction is harder than classical:
          you can't make redundant copies the usual way. Need
          new techniques (Chapter 5).
        </li>
      </ul>

      <p>
        Caveat: classical states (orthogonal, distinguishable)
        can be cloned. The theorem only forbids cloning unknown
        superpositions.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Foundation of quantum computing.</strong>{" "}
          Every QC algorithm starts with qubits in known states
          (often <InlineMath math="|0\rangle^{\otimes n}" />),
          applies unitaries to put them in a useful
          superposition, and measures to extract a classical
          answer. This chapter is the prerequisite for everything
          else.
        </li>
        <li>
          <strong>Quantum cryptography.</strong> No-cloning
          enables protocols like BB84 quantum key distribution
          (provably secure against any eavesdropper).
        </li>
        <li>
          <strong>Quantum sensing.</strong> Single-qubit
          interferometry can beat classical sensors for
          measuring magnetic fields, gravity, and time. NV
          centres in diamond, atomic clocks, and gravimeters
          all exploit qubit physics.
        </li>
        <li>
          <strong>Decoherence.</strong> Real qubits couple to
          their environment and lose their quantum properties
          over time. The challenge of QC engineering is
          extending qubit coherence times — typically{" "}
          <InlineMath math="\sim 100 \, \mu s" /> for super-
          conducting,{" "}
          <InlineMath math="\sim s" /> for trapped ions,{" "}
          <InlineMath math="\sim hours" /> for nuclear spins.
        </li>
      </ul>

      <p>
        Next chapter: gates and circuits. Single-qubit and
        two-qubit gates, universal gate sets, and the
        circuit-diagram language for describing quantum
        algorithms.
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
      "A qubit state $\\alpha|0\\rangle + \\beta|1\\rangle$ requires…",
    options: [
      "$\\alpha + \\beta = 1$",
      "$|\\alpha|^2 + |\\beta|^2 = 1$",
      "$\\alpha, \\beta \\in [0, 1]$",
      "$\\alpha = \\beta$",
    ],
    correct: 1,
    explanation:
      "Normalisation: total probability = 1. The amplitudes are complex; their squared moduli give probabilities and must sum to 1.",
  },
  {
    prompt:
      "On the Bloch sphere, the qubit state $|+\\rangle = (|0\\rangle + |1\\rangle)/\\sqrt 2$ is at…",
    options: [
      "the north pole (z = 1)",
      "the south pole (z = -1)",
      "the +x axis on the equator",
      "the centre",
    ],
    correct: 2,
    explanation:
      "$|+\\rangle$ corresponds to Bloch vector $(1, 0, 0)$ — the +x axis on the equator. $|0\\rangle$ is the north pole; the centre is the maximally mixed state $I/2$.",
  },
  {
    prompt:
      "An $n$-qubit system has Hilbert-space dimension…",
    options: ["$n$", "$n^2$", "$2^n$", "$2n$"],
    correct: 2,
    explanation:
      "Tensor product: $\\mathbb{C}^2 \\otimes \\cdots \\otimes \\mathbb{C}^2 = \\mathbb{C}^{2^n}$. Exponential growth — the source of QC's potential power.",
  },
  {
    prompt:
      "Measuring qubit $\\alpha|0\\rangle + \\beta|1\\rangle$ in the computational basis gives outcome 0 with probability…",
    options: [
      "$\\alpha$",
      "$|\\alpha|$",
      "$|\\alpha|^2$",
      "$\\alpha + \\beta$",
    ],
    correct: 2,
    explanation:
      "Born's rule: probability = squared modulus of the amplitude. After measurement, the state collapses to $|0\\rangle$.",
  },
  {
    prompt:
      "The no-cloning theorem says…",
    options: [
      "you can't copy any state",
      "you can't copy a known state",
      "you can't have a single unitary that copies all unknown states",
      "you can't measure twice",
    ],
    correct: 2,
    explanation:
      "No universal cloning device exists. You CAN copy a known state (just prepare another), and you CAN copy orthogonal states. The theorem rules out a unitary $U$ that works for arbitrary unknown states.",
  },
];
