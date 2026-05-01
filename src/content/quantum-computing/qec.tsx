import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function QecBody() {
  return (
    <>
      <p>
        Quantum error correction (QEC) is what makes
        fault-tolerant quantum computing possible. Real qubits
        decohere, gates have errors, measurements are noisy.
        Naive QC fails for any non-trivial computation. QEC
        encodes a single logical qubit into many physical
        qubits, redundantly enough to detect and correct errors
        without measuring (and thus collapsing) the protected
        information. Without QEC, large-scale Shor / quantum
        chemistry / quantum simulation are impossible.
      </p>
      <p>
        This chapter develops the basics: bit-flip code (the
        warm-up), Shor's 9-qubit code (full QEC), the surface
        code (the leading practical scheme), and the threshold
        theorem (why QEC works at all).
      </p>

      <ReferenceResources
        items={[
          {
            title: "Nielsen &amp; Chuang — chs. 10",
            author: "Nielsen / Chuang",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Quantum_Computation_and_Quantum_Information",
            note: "Standard reference for the formalism. Covers bit-flip, Shor's, stabiliser codes, threshold theorem.",
          },
          {
            title: "Gottesman — An Introduction to Quantum Error Correction",
            author: "Daniel Gottesman",
            duration: "Reading",
            url: "https://arxiv.org/abs/0904.2557",
            note: "Compact survey. Gottesman invented stabiliser formalism.",
          },
          {
            title: "Surface code review (Fowler et al.)",
            author: "Fowler / Mariantoni / Martinis / Cleland",
            duration: "Reading",
            url: "https://arxiv.org/abs/1208.0928",
            note: "Definitive treatment of the surface code. Clear, comprehensive.",
          },
          {
            title: "Quanta Magazine — How Quantum Computers Will Correct Their Errors",
            author: "Quanta Magazine",
            duration: "Reading",
            url: "https://www.quantamagazine.org/topic/quantum-error-correction/",
            note: "Series of accessible articles on QEC progress. Worth reading once.",
          },
          {
            title: "Google QEC milestone (2024)",
            author: "Google Quantum AI",
            duration: "Reading",
            url: "https://blog.google/technology/google-deepmind/google-research-2024-quantum-supremacy/",
            note: "Google's 2024 demonstration of below-threshold surface-code QEC. Major milestone.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Why QEC is hard</h2>

      <p>
        Classical error correction is easy: copy each bit three
        times (
        <InlineMath math="0 \to 000, 1 \to 111" />), and majority-
        vote to recover from single bit-flips. Cheap and
        reliable.
      </p>

      <p>
        Quantum doesn't allow this. Three obstacles:
      </p>

      <ul>
        <li>
          <strong>No-cloning</strong>: you can't copy unknown
          quantum states. Direct redundancy is forbidden.
        </li>
        <li>
          <strong>Continuous errors</strong>: classical bits
          flip discretely; qubits can rotate by any small angle{" "}
          <InlineMath math="\theta" /> on the Bloch sphere.
          You'd have infinitely many error syndromes.
        </li>
        <li>
          <strong>Measurement collapses</strong>: you can't just
          look at qubits to see what's wrong — measuring
          destroys information.
        </li>
      </ul>

      <p>
        Each problem has a fix:
      </p>
      <ul>
        <li>
          Encode in a higher-dimensional space — single logical
          qubit into multiple physical qubits — without
          measuring the logical state.
        </li>
        <li>
          Discreteness: errors that are formally continuous can
          be discretely corrected. Any noise process expands
          into Pauli-error terms; correcting Paulis correctly
          handles arbitrary noise.
        </li>
        <li>
          Use ancilla qubits and measure <em>only the
          syndrome</em> — information about which error
          occurred — without measuring the logical state.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The bit-flip code</h2>

      <p>
        Warm-up: protect against just bit flips (
        <InlineMath math="X" /> errors). Encode:
      </p>
      <BlockMath math="|0\rangle_L = |000\rangle, \quad |1\rangle_L = |111\rangle." />

      <p>
        A general logical state{" "}
        <InlineMath math="\alpha|0\rangle_L + \beta|1\rangle_L = \alpha|000\rangle + \beta|111\rangle" />.
      </p>

      <p>
        Suppose a single-qubit X error occurs on (say) the
        second qubit:{" "}
        <InlineMath math="\alpha|010\rangle + \beta|101\rangle" />.
      </p>

      <h3>Syndrome measurement</h3>

      <p>
        Measure the parities{" "}
        <InlineMath math="Z_1 Z_2" /> and{" "}
        <InlineMath math="Z_2 Z_3" /> using ancilla qubits:
      </p>

      <ul>
        <li>
          No error:{" "}
          <InlineMath math="Z_1 Z_2 = +1, Z_2 Z_3 = +1" /> →
          syndrome <InlineMath math="(0, 0)" />.
        </li>
        <li>
          X on qubit 1: parities flip on the first
          measurement → <InlineMath math="(1, 0)" />.
        </li>
        <li>
          X on qubit 2: both parities flip →{" "}
          <InlineMath math="(1, 1)" />.
        </li>
        <li>
          X on qubit 3: only second flips →{" "}
          <InlineMath math="(0, 1)" />.
        </li>
      </ul>

      <p>
        The syndrome uniquely identifies which qubit had the
        flip. Apply <InlineMath math="X" /> to that qubit and
        you've corrected it. The logical state is preserved
        (parities reveal nothing about{" "}
        <InlineMath math="\alpha, \beta" />).
      </p>

      <h3>Limitations</h3>

      <p>
        Only protects against X errors. Doesn't help if the
        error is a phase flip (Z error) or both. For Z errors,
        you'd use a different code (encode in the Hadamard
        basis, where X and Z swap roles).
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Shor's 9-qubit code</h2>

      <p>
        Combines bit-flip and phase-flip protection. Encode:
      </p>
      <BlockMath math="|0\rangle_L = \frac{1}{2\sqrt 2}(|000\rangle + |111\rangle)(|000\rangle + |111\rangle)(|000\rangle + |111\rangle)" />
      <BlockMath math="|1\rangle_L = \frac{1}{2\sqrt 2}(|000\rangle - |111\rangle)(|000\rangle - |111\rangle)(|000\rangle - |111\rangle)" />

      <p>
        Three-qubit phase-flip code (for sign of each block of
        three) wrapped around three-qubit bit-flip codes (
        within each block). 9 physical qubits per logical
        qubit. Protects against any single-qubit error.
      </p>

      <p>
        Why "any single-qubit error"? An arbitrary single-
        qubit operator can be expanded as{" "}
        <InlineMath math="aI + bX + cY + dZ" /> in the Pauli
        basis. The code corrects bit flips (X) and phase flips
        (Z), and Y = iXZ is a combination of both. So the code
        corrects any single-qubit error after expansion in the
        Pauli basis.
      </p>

      <p>
        General principle: to correct <InlineMath math="t" />{" "}
        errors, the code must distinguish all error patterns of
        weight <InlineMath math="\leq t" />. Quantum analogue
        of Hamming distance.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Stabiliser formalism</h2>

      <p>
        The general framework for QEC, due to Gottesman (1996).
        A <strong>stabiliser code</strong> is defined by a
        commuting subgroup{" "}
        <InlineMath math="S" /> of the Pauli group{" "}
        <InlineMath math="\mathcal{P}_n" />; the code space is
        the joint <InlineMath math="+1" /> eigenspace of all
        stabilisers. Equivalently, code states are those left
        invariant by every stabiliser.
      </p>

      <p>
        Examples:
      </p>
      <ul>
        <li>
          Bit-flip code: stabilisers{" "}
          <InlineMath math="\{Z_1 Z_2, Z_2 Z_3\}" />.
        </li>
        <li>
          Shor's 9-qubit: 8 stabilisers (six{" "}
          <InlineMath math="ZZ" /> within blocks, two{" "}
          <InlineMath math="XX...XX" /> across blocks).
        </li>
        <li>
          Surface code: stabilisers are local{" "}
          <InlineMath math="ZZZZ" /> (plaquettes) and{" "}
          <InlineMath math="XXXX" /> (vertices) on a 2D
          lattice — local checks only.
        </li>
      </ul>

      <p>
        Stabiliser codes have nice properties:
      </p>
      <ul>
        <li>
          Encoding and syndrome measurement are circuits of
          Clifford gates only.
        </li>
        <li>
          They are classically simulable (Gottesman-Knill) —
          good for testing and debugging.
        </li>
        <li>
          The "logical operators" are Paulis acting on the code
          space.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Surface code</h2>

      <p>
        The leading practical QEC scheme. Place qubits on a
        2D lattice (typically a square grid). Define
        stabilisers:
      </p>
      <ul>
        <li>
          Plaquettes:{" "}
          <InlineMath math="Z_a Z_b Z_c Z_d" /> for the four
          qubits around a cell.
        </li>
        <li>
          Vertices:{" "}
          <InlineMath math="X_a X_b X_c X_d" /> for the four
          qubits around a node.
        </li>
      </ul>

      <p>
        These are <em>local</em> checks — each stabiliser
        involves four neighbouring qubits, easy to implement
        with nearest-neighbour interactions.
      </p>

      <p>
        Logical qubits are encoded in the code space. The
        number of logical qubits per physical lattice depends
        on boundary conditions.
      </p>

      <h3>Threshold</h3>

      <p>
        Surface code has a relatively forgiving threshold:
        physical error rates below about{" "}
        <InlineMath math="1\%" /> per gate suffice for the
        code to work. Below threshold, increasing the code
        size (more physical qubits per logical) exponentially
        suppresses logical errors.
      </p>

      <p>
        Modern superconducting platforms achieve gate errors
        around <InlineMath math="10^{-3}" />, well below
        threshold. Google demonstrated below-threshold scaling
        in 2024 with a 105-qubit Willow chip — increasing code
        distance reduced logical error rates as expected by
        theory.
      </p>

      <h3>Resource overhead</h3>

      <p>
        For target logical error rate{" "}
        <InlineMath math="10^{-15}" /> (acceptable for
        breaking RSA): need code distance ~25, meaning ~1000
        physical qubits per logical qubit at{" "}
        <InlineMath math="10^{-3}" /> physical errors.
      </p>

      <p>
        For 2048-bit RSA (~4000 logical qubits): ~4 million
        physical qubits, with substantial overhead for
        connections and refrigeration. Big number, but
        decreasing with each generation of estimates.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Threshold theorem</h2>

      <Callout title="Quantum threshold theorem (Aharonov-Ben-Or, Knill-Laflamme-Zurek)">
        For any quantum circuit, there exists a fault-tolerant
        threshold <InlineMath math="p_{\mathrm{th}}" /> such
        that if every physical operation has error rate{" "}
        <InlineMath math="p < p_{\mathrm{th}}" />, the
        computation can be made arbitrarily reliable using
        polynomial overhead.
      </Callout>

      <p>
        The threshold is around{" "}
        <InlineMath math="10^{-2}" /> for the surface code —
        good enough that today's hardware can hit it.
      </p>

      <p>
        Without the threshold theorem, QC would be hopeless:
        any noise would compound, and longer computations
        would be uncomputable. The theorem says:
        <em> good enough is good enough</em>. Get below
        threshold, and the code does the rest.
      </p>

      <h3>Magic state distillation</h3>

      <p>
        One subtlety: Clifford gates are easy in the surface
        code (transversal). Non-Clifford gates (T) are not. To
        implement T fault-tolerantly, prepare special "magic
        states" with high overhead and inject them. Magic
        state distillation costs are the dominant overhead in
        most fault-tolerant Shor estimates.
      </p>

      <p>
        Recent algorithmic improvements have reduced T-counts
        for Shor by orders of magnitude. Distillation
        improvements have driven down physical-qubit estimates
        from ~10⁹ a decade ago to ~2 × 10⁷ today.
      </p>

      <Pitfall>
        QEC overhead is per logical qubit. For{" "}
        <InlineMath math="N" /> logical qubits, you need{" "}
        <InlineMath math="\sim 1000 N" /> physical qubits at
        current error rates and required logical-error
        targets. Plus overhead for routing, connections,
        cryogenics. Real machines for breaking RSA need 10–
        100 million physical qubits.
      </Pitfall>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Fault-tolerant QC.</strong> Without QEC, no
          large-scale quantum algorithms run. Shor's, quantum
          chemistry, quantum simulation all need millions of
          gate operations — unachievable without correction.
        </li>
        <li>
          <strong>Resource overhead.</strong> The {" "}
          <InlineMath math="\sim 1000 \times" /> physical-to-
          logical ratio drives current quantum-hardware
          roadmaps. Reducing this overhead is the central
          engineering challenge.
        </li>
        <li>
          <strong>2024 milestone.</strong> Google's
          below-threshold demonstration was the first
          experimental confirmation that the surface code
          works at scale. Moves QC from "possible in
          principle" to "engineering challenge."
        </li>
        <li>
          <strong>Topological codes.</strong> Beyond surface
          code, topological codes (color code, Steane code,
          fracton models) offer different overhead /
          threshold trade-offs. Active research area.
        </li>
        <li>
          <strong>Hardware design.</strong> Different qubit
          platforms favour different codes. Trapped ions favour
          codes with non-local connectivity (Steane code).
          Superconducting and photonic favour 2D-local codes
          (surface code).
        </li>
      </ul>

      <p>
        Last chapter: post-quantum cryptography. What replaces
        RSA and ECDSA when quantum computers can break them?
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
      "Why can't quantum error correction just copy each qubit three times (like classical)?",
    options: [
      "it's too expensive",
      "the no-cloning theorem forbids copying unknown quantum states",
      "qubits don't have errors",
      "it's slower",
    ],
    correct: 1,
    explanation:
      "No-cloning. So QEC must encode logical states in higher-dimensional spaces of multiple physical qubits and use syndrome measurements (which don't copy or directly measure the logical state).",
  },
  {
    prompt:
      "Shor's 9-qubit code protects against…",
    options: [
      "only bit flips",
      "only phase flips",
      "any single-qubit error",
      "any two-qubit error",
    ],
    correct: 2,
    explanation:
      "Combines bit-flip and phase-flip protection. Any single-qubit error decomposes in Pauli basis as $aI + bX + cY + dZ$ — code corrects each Pauli, so corrects the combination.",
  },
  {
    prompt:
      "The surface code has stabilisers that are…",
    options: [
      "non-local (involving distant qubits)",
      "local (4-qubit operators on neighboring cells)",
      "single-qubit",
      "Hadamard gates",
    ],
    correct: 1,
    explanation:
      "Local: 4-qubit $ZZZZ$ plaquettes and $XXXX$ vertices. Easy to implement with nearest-neighbour interactions in 2D — the practical reason the surface code dominates.",
  },
  {
    prompt:
      "The quantum threshold theorem says…",
    options: [
      "QEC is impossible",
      "if physical error rate < threshold, fault-tolerant computation is possible with polynomial overhead",
      "QC needs no error correction",
      "all QC must be classical-quality",
    ],
    correct: 1,
    explanation:
      "Below threshold, increase code distance for exponential suppression of logical errors at polynomial overhead cost. This is what makes large-scale QC theoretically possible.",
  },
  {
    prompt:
      "Approximately how many physical qubits per logical qubit are needed for breaking RSA-2048?",
    options: [
      "~10",
      "~1,000",
      "~10,000",
      "~1 million",
    ],
    correct: 1,
    explanation:
      "~1,000 physical qubits per logical at current error rates and required logical-error targets. With ~4,000 logical qubits needed, that's ~4 million physical qubits — daunting but plausible.",
  },
];
