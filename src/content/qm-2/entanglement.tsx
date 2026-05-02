import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function EntanglementBody() {
  return (
    <>
      <p>
        Entanglement is the most distinctively quantum
        phenomenon: two systems can be in a state where neither
        has its own well-defined wavefunction, only the joint
        system does. Measuring one instantly determines the
        outcome you'd get for the other, with correlations that
        cannot be explained by any "local hidden variable"
        theory (Bell's theorem). Entanglement is also the
        resource that quantum computers exploit: without it,
        quantum algorithms have no advantage.
      </p>
      <p>
        Three threads in this chapter: tensor products and
        Bell states (the math), the EPR paradox and Bell
        inequalities (the conceptual debate, then resolved
        experimentally), and entanglement as a quantum-
        information resource (the key for quantum cryptography
        and computing).
      </p>

      <ReferenceResources
        items={[
          {
            title: "Nielsen &amp; Chuang — Quantum Information, ch. 2.4 + ch. 11",
            author: "Nielsen / Chuang",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Quantum_Computation_and_Quantum_Information",
            note: "The reference for entanglement and Bell inequalities in QC context.",
          },
          {
            title: "MIT 8.05 — Lectures on entanglement",
            author: "Barton Zwiebach",
            duration: "~5h on this topic",
            url: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/",
            note: "Standard treatment; pair with Chapter 5 of Sakurai.",
          },
          {
            title: "Bell's theorem (Bell, 1964)",
            author: "John Bell",
            duration: "Reading (~10 pages)",
            url: "https://en.wikipedia.org/wiki/Bell%27s_theorem",
            note: "Bell's original paper. Worth reading once you have the basics — it's short and revolutionary.",
          },
          {
            title: "2022 Nobel Prize lectures",
            author: "Aspect / Clauser / Zeilinger",
            duration: "varies",
            url: "https://www.nobelprize.org/prizes/physics/2022/summary/",
            note: "The experimentalists who closed the Bell-inequality loopholes won the 2022 Nobel. Lectures are excellent.",
          },
          {
            title: "Spooky action at a distance — Veritasium",
            author: "Veritasium",
            duration: "20 min",
            url: "https://www.youtube.com/watch?v=zcqZHYo7ONs",
            note: "Pop-science but mathematically honest tour of entanglement and Bell.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Tensor products and product states</h2>

      <p>
        For two quantum systems with Hilbert spaces{" "}
        <InlineMath math="\mathcal H_A, \mathcal H_B" />, the
        joint system has Hilbert space{" "}
        <InlineMath math="\mathcal H_A \otimes \mathcal H_B" />{" "}
        (Module XI). For two qubits:{" "}
        <InlineMath math="\mathbb{C}^2 \otimes \mathbb{C}^2 = \mathbb{C}^4" />{" "}
        with basis
      </p>
      <BlockMath math="|00\rangle, |01\rangle, |10\rangle, |11\rangle" />

      <p>
        (using <InlineMath math="|0\rangle = |+\rangle, |1\rangle = |-\rangle" />{" "}
        in the qubit / spin notation).
      </p>

      <p>
        A general two-qubit state:
      </p>
      <BlockMath math="|\psi\rangle = c_{00}|00\rangle + c_{01}|01\rangle + c_{10}|10\rangle + c_{11}|11\rangle" />

      <p>
        with <InlineMath math="\sum |c_{ij}|^2 = 1" />.
      </p>

      <h3>Product (separable) vs entangled</h3>

      <p>
        A state is a <strong>product state</strong> (or{" "}
        <em>separable</em>) if it can be written as
      </p>
      <BlockMath math="|\psi\rangle = |\alpha\rangle_A \otimes |\beta\rangle_B" />

      <p>
        for some single-qubit{" "}
        <InlineMath math="|\alpha\rangle, |\beta\rangle" />. If
        not, the state is <strong>entangled</strong>.
      </p>

      <p>
        Test: a two-qubit state is separable iff the determinant
        of its coefficient matrix
      </p>
      <BlockMath math="\begin{pmatrix} c_{00} & c_{01} \\ c_{10} & c_{11} \end{pmatrix}" />

      <p>
        is zero. Equivalently: its Schmidt rank is 1.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Bell states</h2>

      <Callout title="The four Bell states">
        <BlockMath math="|\Phi^+\rangle = \frac{1}{\sqrt 2}(|00\rangle + |11\rangle)" />
        <BlockMath math="|\Phi^-\rangle = \frac{1}{\sqrt 2}(|00\rangle - |11\rangle)" />
        <BlockMath math="|\Psi^+\rangle = \frac{1}{\sqrt 2}(|01\rangle + |10\rangle)" />
        <BlockMath math="|\Psi^-\rangle = \frac{1}{\sqrt 2}(|01\rangle - |10\rangle)" />
      </Callout>

      <p>
        These are maximally entangled — coefficient-matrix
        determinant <InlineMath math="\pm 1/2 \neq 0" />, and the
        reduced density matrix on either qubit is{" "}
        <InlineMath math="I/2" /> (maximally mixed). They form an
        orthonormal basis for the two-qubit Hilbert space.
      </p>

      <p>
        Properties of <InlineMath math="|\Phi^+\rangle" />:
      </p>
      <ul>
        <li>
          Measure first qubit in computational basis →{" "}
          <InlineMath math="|0\rangle" /> with prob 1/2,{" "}
          <InlineMath math="|1\rangle" /> with prob 1/2.
        </li>
        <li>
          Measure second qubit, before first → same: 1/2 each.
        </li>
        <li>
          But conditional on the first being{" "}
          <InlineMath math="|0\rangle" />, the second is{" "}
          <em>certain</em> to be{" "}
          <InlineMath math="|0\rangle" />. Perfect correlation.
        </li>
        <li>
          The same correlation holds in <em>any</em> measurement
          basis (rotated). This is what no classical correlation
          can do.
        </li>
      </ul>

      <h3>Reduced density matrices</h3>

      <p>
        For an entangled state, the sub-system has no
        wavefunction — only a density matrix. For{" "}
        <InlineMath math="|\Phi^+\rangle" />:
      </p>
      <BlockMath math="\rho_A = \mathrm{tr}_B(|\Phi^+\rangle\langle\Phi^+|) = \frac{1}{2}(|0\rangle\langle 0| + |1\rangle\langle 1|) = \frac{I}{2}." />

      <p>
        The first qubit on its own is in a maximally mixed state
        — even though the joint system is in a pure state. This
        is the signature of entanglement: the parts have less
        information than the whole.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · The EPR paradox</h2>

      <p>
        Einstein, Podolsky, and Rosen (1935) argued that QM
        must be incomplete. Their argument:
      </p>

      <ol>
        <li>
          Prepare an entangled pair, separate them by a great
          distance.
        </li>
        <li>
          Measure one (say qubit A), getting some result.
        </li>
        <li>
          The state of qubit B is now determined, even though
          we haven't touched it.
        </li>
        <li>
          So qubit B "had" that property all along — there must
          be some "hidden variable" determining it. QM's
          probabilistic description is incomplete.
        </li>
      </ol>

      <p>
        This is the <strong>EPR paradox</strong>. Einstein
        called the apparent influence "spooky action at a
        distance" and refused to believe in it. He wanted local
        hidden variables to restore determinism.
      </p>

      <p>
        The argument seemed sound for decades. Then John Bell
        (1964) found a way to test it experimentally.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Bell's theorem and inequalities</h2>

      <Callout title="Bell's theorem (1964)">
        Any local hidden-variable theory makes predictions that
        are <em>different</em> from quantum mechanics for some
        experimental setups. The differences can be tested
        experimentally.
      </Callout>

      <p>
        Bell's argument, in spirit. Imagine measuring two
        entangled qubits along directions{" "}
        <InlineMath math="\mathbf a, \mathbf b" />. Define
      </p>
      <BlockMath math="E(\mathbf a, \mathbf b) = \langle \hat \sigma_{\mathbf a} \hat \sigma_{\mathbf b} \rangle." />

      <p>
        For a singlet state{" "}
        <InlineMath math="|\Psi^-\rangle" />, QM predicts{" "}
        <InlineMath math="E(\mathbf a, \mathbf b) = -\cos(\theta_{ab})" />{" "}
        with{" "}
        <InlineMath math="\theta_{ab}" /> the angle between
        directions. Any local hidden-variable theory gives a
        weaker correlation.
      </p>

      <p>
        The <strong>CHSH inequality</strong> (Clauser, Horne,
        Shimony, Holt 1969): for measurement directions{" "}
        <InlineMath math="\mathbf a, \mathbf{a}', \mathbf b, \mathbf{b}'" />,
        any local hidden-variable theory must satisfy
      </p>
      <BlockMath math="|E(\mathbf a, \mathbf b) - E(\mathbf a, \mathbf{b}') + E(\mathbf{a}', \mathbf b) + E(\mathbf{a}', \mathbf{b}')| \leq 2." />

      <p>
        QM, choosing the directions optimally, predicts a value
        of <InlineMath math="2\sqrt 2 \approx 2.83" /> — violating
        the bound by 41%.
      </p>

      <h3>Experiments</h3>

      <p>
        Bell inequalities have been tested experimentally many
        times since the 1970s:
      </p>
      <ul>
        <li>
          <strong>Aspect (1982).</strong> Polarisation-entangled
          photons. Measured CHSH ≈ 2.7, well above the
          classical bound.
        </li>
        <li>
          <strong>Loophole-free experiments (2015–)</strong>.
          The Delft experiment (Hensen et al.) closed all major
          loopholes simultaneously. Confirmed: Nature violates
          Bell.
        </li>
        <li>
          <strong>2022 Nobel Prize</strong>. Aspect, Clauser,
          and Zeilinger were awarded for their experimental
          confirmation.
        </li>
      </ul>

      <Callout title="The verdict">
        Local hidden-variable theories are ruled out by
        experiment. Either nature is non-local, or
        non-realistic, or both. Quantum mechanics — exactly as
        formulated — is correct, and Einstein was wrong.
      </Callout>

      <p>
        Note: Bell-violation does <em>not</em> allow faster-
        than-light communication. The marginal distributions on
        each side look random; only correlations between them
        violate Bell, and seeing the correlation requires
        comparing notes (at light speed).
      </p>

      <Pitfall>
        "Quantum entanglement" is sometimes described as
        instant communication. It isn't. The no-communication
        theorem says: nothing about a local measurement on B
        can be detected by anyone with access only to A. The
        non-local correlations are real, but they don't
        transmit signals.
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Entanglement as resource</h2>

      <p>
        Entanglement is the key resource of quantum information:
      </p>

      <h3>Quantum teleportation</h3>

      <p>
        Bennett et al. (1993): given a shared Bell pair between
        Alice and Bob, plus a classical communication channel,
        Alice can transmit an arbitrary unknown qubit state to
        Bob. The protocol: Alice does a Bell-basis measurement
        on her qubit and the unknown one, sends the 2-bit
        result to Bob, who applies a unitary depending on those
        bits. The unknown state appears in Bob's lab; Alice's
        copy is destroyed.
      </p>

      <p>
        Doesn't violate no-cloning (the original is destroyed).
        Doesn't violate causality (classical bits travel at light
        speed). But it does transfer a quantum state without
        transmitting it through a quantum channel. Used in
        quantum repeaters, the building blocks of a quantum
        internet.
      </p>

      <h3>Superdense coding</h3>

      <p>
        Bennett-Wiesner (1992): a shared Bell pair lets Alice
        send 2 classical bits to Bob using only one qubit. Alice
        applies one of four unitaries to her qubit, then sends
        it to Bob; Bob does a Bell-basis measurement and reads
        out 2 bits. Doubles classical capacity per qubit.
      </p>

      <h3>Quantum key distribution</h3>

      <p>
        BB84 (Bennett-Brassard 1984) and E91 (Ekert 1991) use
        properties of entanglement (or just superposition) to
        distribute cryptographic keys with{" "}
        <em>information-theoretic security</em> — guaranteed by
        the laws of quantum mechanics, not by computational
        hardness. Already used in some commercial deployments
        (banking, government).
      </p>

      <h3>Quantum computing</h3>

      <p>
        Without entanglement, quantum computers have no
        speedup. The exponential dimension{" "}
        <InlineMath math="2^n" /> of the state space is only
        accessible because entangled states cover regions
        unreachable by product states. Algorithms like Shor and
        Grover create entanglement and use it for parallel-
        coherent computation.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Foundations of physics.</strong> Bell's
          theorem is one of the most profound results of 20th-
          century physics. Local realism — the worldview that
          underwrote classical physics — is empirically wrong.
        </li>
        <li>
          <strong>Quantum cryptography.</strong> BB84 and other
          QKD protocols are deployed for high-security
          communications. They are unconditionally secure
          against any classical or quantum attacker.
        </li>
        <li>
          <strong>Quantum computing.</strong> Entanglement is{" "}
          <em>the</em> distinguishing resource. Algorithms,
          measurements, and computational power all hinge on it.
        </li>
        <li>
          <strong>Quantum sensing.</strong> Entangled probes
          beat the standard quantum limit for measurement
          precision (Heisenberg-limited interferometry, used in
          gravitational-wave detection at LIGO).
        </li>
        <li>
          <strong>Decoherence and measurement.</strong>{" "}
          Entanglement with the environment is the mechanism
          that "collapses" quantum superpositions in the lab.
          Understanding decoherence is the key to building
          long-coherence qubits.
        </li>
      </ul>

      <p>
        Final chapter of QM II: perturbation theory — the
        toolkit for computing energies and transition rates
        when the Hamiltonian doesn't have a closed-form
        solution. The technique you'll use again and again in
        atomic, molecular, and condensed-matter physics.
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
      "A two-qubit state is entangled iff…",
    options: [
      "it has nonzero amplitudes",
      "it cannot be written as $|\\alpha\\rangle \\otimes |\\beta\\rangle$",
      "it equals a Bell state",
      "it has 4 nonzero coefficients",
    ],
    correct: 1,
    explanation:
      "Entangled = not separable. The two-qubit test: determinant of coefficient matrix is nonzero ⇒ not factorable as a product, hence entangled.",
  },
  {
    prompt:
      "The Bell state $|\\Phi^+\\rangle = (|00\\rangle + |11\\rangle)/\\sqrt 2$. What's the reduced density matrix of qubit A?",
    options: [
      "$|0\\rangle\\langle 0|$",
      "$(|0\\rangle + |1\\rangle)/\\sqrt 2$ outer product itself",
      "$I/2$ (maximally mixed)",
      "0",
    ],
    correct: 2,
    explanation:
      "$\\rho_A = \\mathrm{tr}_B (|\\Phi^+\\rangle\\langle\\Phi^+|) = (|0\\rangle\\langle 0| + |1\\rangle\\langle 1|)/2 = I/2$. The signature of entanglement: subsystem is in a maximally mixed state even though the joint state is pure.",
  },
  {
    prompt:
      "Bell's theorem says…",
    options: [
      "QM is wrong",
      "no local hidden-variable theory can reproduce all predictions of QM",
      "entanglement allows faster-than-light communication",
      "the speed of light is constant",
    ],
    correct: 1,
    explanation:
      "Bell (1964): any LHV theory satisfies an inequality that QM violates. Experiments (since 1970s, definitively from 2015 onward) confirm QM. Local realism is empirically dead.",
  },
  {
    prompt:
      "Quantum entanglement allows…",
    options: [
      "instant communication",
      "violation of energy conservation",
      "stronger correlations than any classical theory, but no faster-than-light signalling",
      "cloning of unknown states",
    ],
    correct: 2,
    explanation:
      "Bell-violation correlations are real, but the no-communication theorem says: marginal distributions on either side carry no information about the other's choice of measurement. Causality is preserved.",
  },
  {
    prompt:
      "Quantum teleportation requires…",
    options: [
      "no resources",
      "a shared entangled pair plus a classical channel",
      "a faster-than-light channel",
      "a quantum channel only",
    ],
    correct: 1,
    explanation:
      "Bell pair + classical bits + LOCC. Alice does a Bell-basis measurement, sends 2 classical bits, Bob applies one of four unitaries. The unknown state appears at Bob's lab. No-cloning is preserved (Alice's copy is destroyed).",
  },
];
