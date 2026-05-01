import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function AlgorithmsBody() {
  return (
    <>
      <p>
        Quantum algorithms exploit superposition and entanglement
        to solve some problems faster than any classical
        algorithm. This chapter walks through three foundational
        algorithms: Deutsch-Jozsa (the first algorithm to show
        a quantum speedup), Grover's search (quadratic speedup
        for unstructured search), and the Quantum Fourier
        Transform (the engine of Shor's algorithm). The QFT is
        important enough that the next chapter is devoted
        entirely to its application.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Nielsen &amp; Chuang — chs. 5–6",
            author: "Nielsen / Chuang",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Quantum_Computation_and_Quantum_Information",
            note: "QFT, Grover, phase estimation in detail.",
          },
          {
            title: "Qiskit Textbook — Algorithms section",
            author: "IBM Qiskit",
            duration: "~10h",
            url: "https://learning.quantum.ibm.com/",
            note: "Hands-on implementations of every standard algorithm. Run on real hardware.",
          },
          {
            title: "Aaronson — Quantum Computing Since Democritus",
            author: "Scott Aaronson",
            duration: "Reading",
            url: "https://www.scottaaronson.com/democritus/",
            note: "Pop-academic intro to QC complexity theory. Excellent context for why these algorithms matter.",
          },
          {
            title: "Quantum Algorithms Zoo",
            author: "Stephen Jordan",
            duration: "Reference",
            url: "https://quantumalgorithmzoo.org/",
            note: "Curated catalog of all known quantum algorithms with speedups. Great for browsing.",
          },
          {
            title: "Microsoft Quantum Katas",
            author: "Microsoft",
            duration: "~30h interactive",
            url: "https://github.com/microsoft/QuantumKatas",
            note: "Programming exercises in Q# for every standard algorithm. Builds intuition fast.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Deutsch–Jozsa algorithm</h2>

      <p>
        The historically first algorithm to demonstrate quantum
        speedup. Problem statement: given a function{" "}
        <InlineMath math="f : \{0, 1\}^n \to \{0, 1\}" />{" "}
        promised to be either <em>constant</em> (same output
        for all inputs) or{" "}
        <em>balanced</em> (half 0, half 1), determine which.
      </p>

      <p>
        <strong>Classical:</strong> in the worst case, you need
        to query{" "}
        <InlineMath math="2^{n-1} + 1" /> inputs to be sure.
      </p>

      <p>
        <strong>Quantum:</strong> a single oracle query
        suffices.
      </p>

      <h3>The algorithm</h3>

      <p>
        Start with{" "}
        <InlineMath math="|0\rangle^{\otimes n} \otimes |1\rangle" />.
        Apply Hadamards to all qubits:
      </p>
      <BlockMath math="\frac{1}{\sqrt{2^n}} \sum_{x \in \{0,1\}^n} |x\rangle \otimes \tfrac{|0\rangle - |1\rangle}{\sqrt 2}." />

      <p>
        Apply the oracle{" "}
        <InlineMath math="U_f : |x\rangle |y\rangle \to |x\rangle |y \oplus f(x)\rangle" />.
        The output qubit picks up a phase{" "}
        <InlineMath math="(-1)^{f(x)}" /> via "phase
        kickback":
      </p>
      <BlockMath math="\frac{1}{\sqrt{2^n}} \sum_x (-1)^{f(x)} |x\rangle \otimes \tfrac{|0\rangle - |1\rangle}{\sqrt 2}." />

      <p>
        Apply Hadamards again to the input register and measure.
        For constant <InlineMath math="f" />, you get{" "}
        <InlineMath math="|0\rangle^{\otimes n}" /> with
        probability 1. For balanced{" "}
        <InlineMath math="f" />, you get something else with
        probability 1.
      </p>

      <p>
        One quantum query versus exponentially many classical.
        Deutsch-Jozsa was the first concrete demonstration of
        quantum advantage.
      </p>

      <Pitfall>
        Deutsch-Jozsa is artificial — the "promised constant or
        balanced" structure rarely arises naturally. The
        algorithm is pedagogically beautiful but not
        practically useful. Its importance is showing that
        quantum speedups are possible.
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Grover's search</h2>

      <p>
        Problem: given an unstructured search space of size{" "}
        <InlineMath math="N = 2^n" /> and an oracle that
        recognises a marked item (or items), find the marked
        item.
      </p>

      <p>
        <strong>Classical:</strong> linear search,{" "}
        <InlineMath math="O(N)" /> queries.
      </p>

      <p>
        <strong>Quantum (Grover, 1996):</strong>{" "}
        <InlineMath math="O(\sqrt N)" /> queries — quadratic
        speedup.
      </p>

      <Callout title="Grover's algorithm">
        For one marked item among <InlineMath math="N = 2^n" />:
        <ol>
          <li>
            Initialise{" "}
            <InlineMath math="|s\rangle = H^{\otimes n} |0\rangle^n" />{" "}
            — uniform superposition.
          </li>
          <li>
            Apply <strong>Grover iterations</strong>{" "}
            <InlineMath math="G = U_s U_{f}" /> for about{" "}
            <InlineMath math="\frac{\pi}{4}\sqrt N" /> iterations,
            where:
            <ul>
              <li>
                <InlineMath math="U_f" /> phase-flips the marked
                item:{" "}
                <InlineMath math="|x\rangle \to (-1)^{f(x)} |x\rangle" />.
              </li>
              <li>
                <InlineMath math="U_s = 2|s\rangle\langle s| - I" />,
                "inversion about the mean."
              </li>
            </ul>
          </li>
          <li>
            Measure. With high probability, you observe the
            marked item.
          </li>
        </ol>
      </Callout>

      <h3>Geometric picture</h3>

      <p>
        Grover's algorithm has a beautiful 2D geometric
        picture. In the plane spanned by{" "}
        <InlineMath math="|s\rangle" /> and the marked state{" "}
        <InlineMath math="|w\rangle" />, each Grover iteration
        is a rotation by{" "}
        <InlineMath math="\sin\theta = 2\sqrt{(N-1)/N^2}/N \approx 2/\sqrt N" />.
        After <InlineMath math="\sim \pi\sqrt N/4" /> iterations,
        the state has rotated to almost exactly{" "}
        <InlineMath math="|w\rangle" />, and measurement gives
        the marked item with probability close to 1.
      </p>

      <p>
        Iterating <em>too long</em> is bad — the rotation
        continues past{" "}
        <InlineMath math="|w\rangle" /> and probability
        decreases. Stop at the optimum.
      </p>

      <h3>Optimality</h3>

      <p>
        Bennett-Bernstein-Brassard-Vazirani (1997) proved:
        Grover is{" "}
        <em>optimal</em>. No quantum algorithm can search an
        unstructured database faster than{" "}
        <InlineMath math="\Omega(\sqrt N)" />. Grover's
        speedup is the best possible for unstructured search.
      </p>

      <p>
        Note: <em>structured</em> search (graph searches,
        constraint satisfaction with structure) can sometimes
        be sped up further with specialised quantum algorithms
        — but for truly unstructured search, square root is
        the limit.
      </p>

      <h3>Implications for symmetric crypto</h3>

      <p>
        Brute-forcing a symmetric key (AES-128) requires{" "}
        <InlineMath math="2^{128}" /> classical operations.
        With Grover, only{" "}
        <InlineMath math="2^{64}" /> quantum operations.
        Recommendation: double symmetric key sizes for the
        post-quantum era. AES-256 stays effectively secure
        (
        <InlineMath math="2^{128}" /> Grover-attack cost).
      </p>

      <p>
        Hash function pre-image security: similar — square-root
        speedup. Use 384- or 512-bit hashes for post-quantum
        security.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Quantum Fourier Transform</h2>

      <p>
        The Quantum Fourier Transform (QFT) is the engine of
        Shor's algorithm and several other exponential-speedup
        algorithms.
      </p>

      <Callout title="Quantum Fourier Transform">
        The QFT on <InlineMath math="n" /> qubits is the
        unitary
        <BlockMath math="\mathrm{QFT} |x\rangle = \frac{1}{\sqrt N} \sum_{k = 0}^{N - 1} e^{2\pi i x k / N} |k\rangle, \quad N = 2^n." />
      </Callout>

      <p>
        Compare with the classical discrete Fourier transform
        (DFT):{" "}
        <InlineMath math="\hat f(k) = \frac{1}{\sqrt N} \sum_x f(x) e^{2\pi i x k / N}" />.
        The QFT is the same operation, applied to amplitudes
        rather than function values.
      </p>

      <h3>Cost</h3>

      <p>
        Classical FFT computes the DFT of an{" "}
        <InlineMath math="N" />-element array in{" "}
        <InlineMath math="O(N \log N)" /> operations.
      </p>

      <p>
        Quantum FFT — the QFT — implements the same
        transformation in{" "}
        <InlineMath math="O((\log N)^2) = O(n^2)" /> gates.
        Exponentially fewer gates. This is one of the key
        sources of quantum speedup.
      </p>

      <h3>QFT circuit</h3>

      <p>
        Recursive structure: apply Hadamard to most-
        significant qubit, then controlled-phase rotations
        (depending on subsequent qubits), then recurse on the
        remaining qubits. Finally swap qubit order. About{" "}
        <InlineMath math="n^2/2" /> gates.
      </p>

      <p>
        The controlled rotations have angles{" "}
        <InlineMath math="\pi/2^k" /> — exponentially small for
        large <InlineMath math="k" />. Implementing these
        exactly is impossible in fault-tolerant QC; small ones
        (below noise threshold) are usually dropped without
        much fidelity loss.
      </p>

      <h3>Phase estimation</h3>

      <p>
        The most important QFT subroutine: given a unitary{" "}
        <InlineMath math="U" /> with eigenvalue{" "}
        <InlineMath math="e^{2\pi i \theta}" /> for some
        eigenstate <InlineMath math="|\psi\rangle" />, estimate{" "}
        <InlineMath math="\theta" />.
      </p>

      <p>
        The algorithm uses controlled applications of{" "}
        <InlineMath math="U^{2^k}" /> to a register of{" "}
        <InlineMath math="t" /> qubits, then applies
        inverse-QFT and measures. Result: an{" "}
        <InlineMath math="t" />-bit estimate of{" "}
        <InlineMath math="\theta" />, with error{" "}
        <InlineMath math="\sim 2^{-t}" />.
      </p>

      <p>
        Quantum phase estimation (QPE) is the universal
        building block: Shor's algorithm uses it for
        period-finding; quantum simulation uses it for
        eigenvalues of Hamiltonians; HHL (linear-systems
        algorithm) uses it for solving linear systems.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Hidden subgroup problem</h2>

      <p>
        The deepest pattern: many quantum algorithms with
        exponential speedup solve a <em>hidden subgroup
        problem</em> (HSP).
      </p>

      <Callout title="Hidden subgroup problem">
        Given a function{" "}
        <InlineMath math="f : G \to S" /> on a group{" "}
        <InlineMath math="G" />, promised to be constant on
        cosets of an unknown subgroup{" "}
        <InlineMath math="H \leq G" /> and distinct on different
        cosets, find <InlineMath math="H" />.
      </Callout>

      <p>
        For abelian groups (
        <InlineMath math="\mathbb{Z}, \mathbb{Z}/N, (\mathbb{Z}/N)^\times" />),
        HSP is solvable with the QFT in polynomial time on a
        quantum computer.
      </p>

      <p>
        Specific instances:
      </p>
      <ul>
        <li>
          <strong>Period finding</strong> on{" "}
          <InlineMath math="\mathbb{Z}" /> (Shor's algorithm —
          next chapter).
        </li>
        <li>
          <strong>Discrete logarithm</strong> on{" "}
          <InlineMath math="(\mathbb{Z}/p)^\times" /> or
          elliptic curve groups (breaking Diffie-Hellman, ECDH).
        </li>
        <li>
          <strong>Pell's equation</strong> and other
          number-theoretic problems.
        </li>
      </ul>

      <p>
        Non-abelian HSP (would-be application: graph
        isomorphism, lattice problems) is mostly{" "}
        <em>open</em>. Some non-abelian groups admit efficient
        quantum algorithms; most don't. Whether lattice-based
        cryptography (which would survive Shor) admits a
        non-abelian-HSP attack is one of the most important
        open questions in quantum complexity.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Other notable algorithms</h2>

      <ul>
        <li>
          <strong>HHL (Harrow-Hassidim-Lloyd, 2009)</strong>:
          solves a sparse linear system{" "}
          <InlineMath math="A\mathbf x = \mathbf b" /> in{" "}
          <InlineMath math="O(\log N)" /> time, exponentially
          faster than classical{" "}
          <InlineMath math="O(N)" />. Caveats: many; output is
          a quantum state, not classical bits, so getting
          useful info out is its own challenge.
        </li>
        <li>
          <strong>Quantum simulation</strong> (Lloyd, 1996):
          simulating a quantum system of{" "}
          <InlineMath math="n" /> particles takes{" "}
          <InlineMath math="O(\mathrm{poly}(n))" /> on a quantum
          computer, vs{" "}
          <InlineMath math="O(2^n)" /> classically. Feynman's
          original motivation for QC. Useful for chemistry,
          materials science, drug design.
        </li>
        <li>
          <strong>VQE / QAOA</strong> (variational quantum
          eigensolver / QA optimization algorithm): hybrid
          classical-quantum algorithms tuned for noisy near-term
          devices. Heuristic; theoretical speedups uncertain
          but practically promising.
        </li>
        <li>
          <strong>Quantum walks</strong>: quantum analogues of
          random walks. Some give polynomial speedups for
          graph problems (search on a hypercube faster than
          Grover, for instance).
        </li>
        <li>
          <strong>Amplitude amplification</strong>: generalisation
          of Grover. Quadratic speedup for any algorithm whose
          success probability is small.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Shor's algorithm</strong> (next chapter)
          builds on QFT + phase estimation to factor integers
          and solve discrete logs. The reason RSA and ECDSA
          will fall to QC.
        </li>
        <li>
          <strong>Grover</strong> hits symmetric crypto:
          double key size for post-quantum security. AES-256
          remains roughly secure.
        </li>
        <li>
          <strong>Quantum simulation</strong> has the broadest
          potential impact: drug discovery, catalyst design,
          materials engineering. Why pharma and chemistry are
          investing in quantum.
        </li>
        <li>
          <strong>HSP framework</strong> illuminates the
          boundary of quantum speedups. Abelian HSP = solvable;
          non-abelian = mostly open. This boundary determines
          which crypto schemes are quantum-vulnerable.
        </li>
        <li>
          <strong>VQE/QAOA</strong> are the current near-term
          target — running real algorithms on noisy 100-qubit
          devices, hoping for something useful before fault-
          tolerant QC arrives.
        </li>
      </ul>

      <p>
        Next chapter: Shor's algorithm in detail. We trace the
        full path from "factor a big number" to "QFT + period
        finding + classical post-processing", showing exactly
        why this destroys RSA.
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
      "Grover's algorithm searches an unstructured database of $N$ items in…",
    options: [
      "$O(1)$ queries",
      "$O(\\log N)$ queries",
      "$O(\\sqrt N)$ queries",
      "$O(N)$ queries (no speedup)",
    ],
    correct: 2,
    explanation:
      "Quadratic speedup over classical $O(N)$. Optimal for unstructured search (BBBV theorem). Implies AES-128 is effectively 64-bit secure under quantum attack.",
  },
  {
    prompt:
      "The QFT on $n$ qubits requires…",
    options: [
      "$O(n)$ gates",
      "$O(n^2)$ gates (vs $O(N \\log N) = O(n 2^n)$ classical FFT)",
      "$O(2^n)$ gates",
      "no gates",
    ],
    correct: 1,
    explanation:
      "Quantum FFT in $O(n^2)$ gates vs classical $O(N \\log N)$. Exponential reduction in gate count. Engine of Shor's algorithm.",
  },
  {
    prompt:
      "Quantum phase estimation estimates an eigenvalue $e^{2\\pi i \\theta}$ of a unitary $U$ to $t$ bits with error…",
    options: [
      "$\\sim 2^{-t}$ bits",
      "$\\sim 1/t$",
      "$\\sim t$",
      "exact",
    ],
    correct: 0,
    explanation:
      "$t$-bit precision means error $\\sim 2^{-t}$. Universal subroutine: Shor uses it, eigenvalue problems use it, HHL uses it.",
  },
  {
    prompt:
      "What's the hidden subgroup problem (HSP)?",
    options: [
      "find a hidden node in a graph",
      "given $f$ on a group $G$ constant on cosets of $H \\leq G$, find $H$ — abelian HSP solvable by quantum, non-abelian mostly open",
      "search for a marked element",
      "factor an integer",
    ],
    correct: 1,
    explanation:
      "HSP unifies many quantum-fast problems. Abelian HSP (period finding, discrete log) is solvable in polynomial time via QFT. Non-abelian HSP is mostly open — the boundary between quantum-easy and quantum-hard.",
  },
  {
    prompt:
      "Deutsch-Jozsa was the first algorithm to demonstrate quantum speedup. It was…",
    options: [
      "a practical algorithm",
      "exponential speedup over classical, but the problem is artificial",
      "polynomial speedup over classical",
      "not actually a speedup",
    ],
    correct: 1,
    explanation:
      "1 quantum query vs $2^{n-1} + 1$ classical for the constant-vs-balanced promise problem. Exponential speedup. But the problem itself is contrived — pedagogical, not practical.",
  },
];
