import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function ShorBody() {
  return (
    <>
      <p>
        Shor's algorithm (1994) is the most consequential
        quantum algorithm: it factors integers in polynomial
        time. Since RSA, ECDSA, and Diffie-Hellman security
        rest on the (classical) hardness of factoring or
        discrete log, Shor's algorithm threatens to break all
        of currently-deployed public-key cryptography. Once a
        sufficiently large fault-tolerant quantum computer
        exists, today's encrypted internet must be replaced.
      </p>
      <p>
        The path from "factor 15" to "factor a 2048-bit RSA
        key" is currently a chasm — current devices can't even
        factor 21 reliably. But the asymptotic argument is
        airtight: scale up qubits and gates, and Shor wins.
        Reasoned estimates put the requirement at millions of
        physical qubits with{" "}
        <InlineMath math="\sim 10^{-3}" /> error rates. Today's
        best devices have ~1000 qubits and{" "}
        <InlineMath math="\sim 10^{-2}" /> errors. The gap is
        large but not infinite.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Shor (1994) — original paper",
            author: "Peter Shor",
            duration: "Reading (~30 pages)",
            url: "https://arxiv.org/abs/quant-ph/9508027",
            note: "The original paper. Worth reading once you have the QFT in hand.",
          },
          {
            title: "Nielsen &amp; Chuang — ch. 5.3",
            author: "Nielsen / Chuang",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Quantum_Computation_and_Quantum_Information",
            note: "Standard textbook treatment with worked example.",
          },
          {
            title: "Qiskit Textbook — Shor's algorithm",
            author: "IBM Qiskit",
            duration: "~3h",
            url: "https://learning.quantum.ibm.com/",
            note: "Implementation in Qiskit. Run Shor's on a real (small) quantum computer.",
          },
          {
            title: "Bauer / Lange — Resource estimates for Shor's algorithm",
            author: "various recent papers",
            duration: "Reading",
            url: "https://eprint.iacr.org/",
            note: "How many qubits to factor 2048-bit RSA? Recent papers give surprisingly low numbers.",
          },
          {
            title: "How Quantum Computers Break Encryption — minutephysics",
            author: "minutephysics",
            duration: "10 min",
            url: "https://www.youtube.com/watch?v=lvTqbM5Dq4Q",
            note: "Friendly visual intuition for Shor's. Worth watching once.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The reduction to period finding</h2>

      <p>
        Suppose we want to factor a composite{" "}
        <InlineMath math="N = pq" /> (product of two large
        primes — the RSA scenario from Module VI). The classical
        bottleneck is factoring; the quantum trick is reducing
        factoring to period finding, then doing period finding
        fast on a quantum computer.
      </p>

      <p>
        Pick a random{" "}
        <InlineMath math="a \in \{2, \dots, N - 1\}" /> coprime
        to <InlineMath math="N" />. Define the function
      </p>
      <BlockMath math="f(x) = a^x \bmod N." />

      <p>
        This function is periodic — by Euler's theorem (Module
        VI), there's an{" "}
        <InlineMath math="r" /> (the order of{" "}
        <InlineMath math="a" /> mod{" "}
        <InlineMath math="N" />) with{" "}
        <InlineMath math="a^r \equiv 1 \pmod N" />, and{" "}
        <InlineMath math="f" /> repeats with that period.
      </p>

      <Callout title="Key insight">
        If we can find <InlineMath math="r" /> efficiently (and{" "}
        <InlineMath math="r" /> is even, and{" "}
        <InlineMath math="a^{r/2} \not\equiv -1 \pmod N" />),
        then{" "}
        <BlockMath math="\gcd(a^{r/2} - 1, N) \quad \text{and} \quad \gcd(a^{r/2} + 1, N)" />
        give non-trivial factors of <InlineMath math="N" />.
      </Callout>

      <p>
        Why: <InlineMath math="a^r - 1 \equiv 0 \pmod N" />,
        so <InlineMath math="N \mid (a^{r/2} - 1)(a^{r/2} + 1)" />.
        With our conditions, neither factor is{" "}
        <InlineMath math="\equiv 0 \pmod N" />, so the GCDs
        share factors with{" "}
        <InlineMath math="N" /> — specifically, one shares{" "}
        <InlineMath math="p" /> and the other shares{" "}
        <InlineMath math="q" />.
      </p>

      <p>
        With probability{" "}
        <InlineMath math="\geq 1/2" /> over choices of{" "}
        <InlineMath math="a" />, the conditions hold. So we
        repeat with random <InlineMath math="a" /> values until
        success.
      </p>

      <p>
        Reduction complete. Factoring → period finding. The
        period-finding step is what's classically hard.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Quantum period finding</h2>

      <p>
        We want to find the period of{" "}
        <InlineMath math="f(x) = a^x \bmod N" />. Two registers:{" "}
        <InlineMath math="t" /> qubits in the input register
        (with <InlineMath math="2^t \geq N^2" />), enough qubits
        in the output register to hold values mod{" "}
        <InlineMath math="N" />.
      </p>

      <h3>Step 1: Superposition</h3>

      <p>
        Initialise both registers at zero. Apply Hadamard to
        the input:
      </p>
      <BlockMath math="\frac{1}{\sqrt{2^t}} \sum_{x = 0}^{2^t - 1} |x\rangle |0\rangle." />

      <h3>Step 2: Modular exponentiation</h3>

      <p>
        Apply the function (in superposition):
      </p>
      <BlockMath math="\frac{1}{\sqrt{2^t}} \sum_{x = 0}^{2^t - 1} |x\rangle |a^x \bmod N\rangle." />

      <p>
        Implementing the modular exponentiation as a quantum
        circuit is the most expensive part. It uses{" "}
        <InlineMath math="O((\log N)^3)" /> gates with various
        optimisations.
      </p>

      <h3>Step 3: Measure the output register</h3>

      <p>
        Measure the second register; you get some specific{" "}
        <InlineMath math="y_0 = a^{x_0} \bmod N" />. The first
        register collapses to:
      </p>
      <BlockMath math="\frac{1}{\sqrt{M}} \sum_{j} |x_0 + jr\rangle" />

      <p>
        where the sum runs over all{" "}
        <InlineMath math="j" /> such that{" "}
        <InlineMath math="x_0 + jr < 2^t" />. So{" "}
        <InlineMath math="M \approx 2^t / r" />.
      </p>

      <p>
        This is a "comb" — equally-spaced delta-function-like
        peaks at multiples of <InlineMath math="r" /> apart,
        offset by <InlineMath math="x_0" />. The period{" "}
        <InlineMath math="r" /> is encoded in this comb's
        spacing.
      </p>

      <h3>Step 4: QFT</h3>

      <p>
        Apply the QFT to the input register. The QFT of a comb
        of period <InlineMath math="r" /> is concentrated near
        multiples of{" "}
        <InlineMath math="2^t/r" /> — a smaller comb in
        Fourier space.
      </p>

      <p>
        Measure the QFT register. With high probability, you
        get an outcome{" "}
        <InlineMath math="k \approx j \cdot 2^t / r" /> for some
        integer <InlineMath math="j" /> coprime to{" "}
        <InlineMath math="r" />.
      </p>

      <h3>Step 5: Classical post-processing</h3>

      <p>
        We have <InlineMath math="k / 2^t \approx j / r" /> for
        some unknown integers <InlineMath math="j, r" /> with{" "}
        <InlineMath math="\gcd(j, r) = 1" />. Recover{" "}
        <InlineMath math="r" /> via the{" "}
        <em>continued-fraction expansion</em> of{" "}
        <InlineMath math="k / 2^t" />: the rational
        approximations{" "}
        <InlineMath math="p/q" /> with{" "}
        <InlineMath math="q < N" /> include{" "}
        <InlineMath math="j/r" />.
      </p>

      <p>
        Verify by computing{" "}
        <InlineMath math="a^r \bmod N" /> — if it's 1, we have
        the period. If not, repeat with another{" "}
        <InlineMath math="a" /> or another QFT measurement.
      </p>

      <h3>Total cost</h3>

      <p>
        Quantum part: <InlineMath math="O((\log N)^3)" />{" "}
        gates dominantly from modular exponentiation. Classical
        post-processing: continued fractions in{" "}
        <InlineMath math="O((\log N)^2)" /> classical
        operations. Polynomial overall.
      </p>

      <p>
        Compare with classical factoring: best known is the
        general number field sieve at{" "}
        <InlineMath math="\exp(c (\log N)^{1/3} (\log \log N)^{2/3})" />,{" "}
        which is sub-exponential but still much worse than
        polynomial. Shor exponentially beats the best known
        classical factoring.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Worked example: factoring 15</h2>

      <p>
        Pick <InlineMath math="N = 15" />,{" "}
        <InlineMath math="a = 7" />.{" "}
        <InlineMath math="\gcd(7, 15) = 1" /> ✓.
      </p>

      <p>
        Compute powers:{" "}
        <InlineMath math="7^0 = 1, 7^1 = 7, 7^2 = 49 \equiv 4, 7^3 = 28 \equiv 13, 7^4 = 91 \equiv 1 \pmod{15}" />.
        Period{" "}
        <InlineMath math="r = 4" /> (even, as needed).
      </p>

      <p>
        Compute{" "}
        <InlineMath math="a^{r/2} = 7^2 = 49 \equiv 4 \pmod{15}" />.{" "}
        <InlineMath math="\gcd(4 - 1, 15) = \gcd(3, 15) = 3" />.{" "}
        <InlineMath math="\gcd(4 + 1, 15) = \gcd(5, 15) = 5" />.
        So <InlineMath math="15 = 3 \times 5" />. ✓
      </p>

      <p>
        On a real quantum computer, period finding for{" "}
        <InlineMath math="N = 15" /> has been demonstrated
        (Vandersypen 2001 with 7 nuclear spins;
        IBM/Google/etc. since). Performance for larger{" "}
        <InlineMath math="N" /> remains a hardware challenge.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Discrete log via Shor</h2>

      <p>
        The same QFT-based approach solves discrete logarithms
        in any finite abelian group. Given{" "}
        <InlineMath math="g, h" /> in a cyclic group of order{" "}
        <InlineMath math="r" />, find{" "}
        <InlineMath math="x" /> with{" "}
        <InlineMath math="g^x = h" />.
      </p>

      <p>
        The function{" "}
        <InlineMath math="f(a, b) = g^a h^b" /> is periodic with
        a structure encoding the discrete log. Quantum period
        finding (in 2D) recovers it.
      </p>

      <p>
        Application: <strong>ECDSA</strong> security rests on
        the elliptic-curve discrete log problem. Shor's
        algorithm (suitably adapted) breaks ECDSA in polynomial
        time on a quantum computer. Bitcoin's secp256k1 falls.
      </p>

      <p>
        Resource estimates for breaking 256-bit ECDSA: ~6,000
        logical qubits, ~10⁹ Toffoli gates. With error
        correction, this is millions of physical qubits — far
        beyond today, but on the path of plausible engineering
        roadmaps.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · How big a quantum computer?</h2>

      <p>
        Recent (2024) resource estimates for breaking
        2048-bit RSA via Shor:
      </p>

      <ul>
        <li>
          <strong>Logical qubits</strong>: ~4,000.
        </li>
        <li>
          <strong>Toffoli gates</strong>:{" "}
          <InlineMath math="\sim 10^{10}" />.
        </li>
        <li>
          <strong>Physical qubits</strong>: ~20 million,
          assuming surface-code error correction with{" "}
          <InlineMath math="10^{-3}" /> physical error rate.
        </li>
        <li>
          <strong>Wall-clock time</strong>: 8 hours under
          optimistic assumptions.
        </li>
      </ul>

      <p>
        For 256-bit ECDSA: ~6,000 logical qubits, slightly more
        gates, similar physical-qubit count.
      </p>

      <p>
        Today's best superconducting devices: ~1,000 physical
        qubits at error rates around{" "}
        <InlineMath math="10^{-2}" /> — too noisy for surface
        codes at scale. Trapped-ion systems have lower error
        rates but fewer qubits and slower gates.
      </p>

      <Pitfall>
        Resource estimates have been steadily improving — both
        theoretical (better algorithms) and engineering
        (better gate fidelities). What was estimated as 10
        billion physical qubits a decade ago is now estimated
        at 20 million. The gap is closing, even if today's
        machines are far from breaking RSA.
      </Pitfall>

      <h3>"Harvest now, decrypt later"</h3>

      <p>
        Adversaries today can record encrypted traffic and
        store it. If quantum computers arrive in 10 years and
        decrypt then, today's secrets become future losses.
        This drives the urgency of post-quantum migration: data
        with long-term confidentiality requirements (state
        secrets, medical records, intellectual property) must
        be re-encrypted with quantum-resistant algorithms{" "}
        <em>now</em>, even though current attacks are
        impossible.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · The cryptographic apocalypse</h2>

      <p>
        What Shor breaks (in polynomial quantum time):
      </p>
      <ul>
        <li>
          <strong>RSA</strong> (factoring).
        </li>
        <li>
          <strong>ECDSA, ECDH</strong> (elliptic-curve discrete
          log).
        </li>
        <li>
          <strong>Diffie-Hellman</strong> (finite-field discrete
          log).
        </li>
        <li>
          <strong>DSA, ElGamal, Schnorr signatures</strong> —
          all DLP-based.
        </li>
      </ul>

      <p>
        Equivalently: every currently-deployed public-key
        cryptosystem relies on factoring or discrete log,{" "}
        <em>both</em> broken by Shor. The entire public-key
        infrastructure of the internet — TLS certificates, SSH
        keys, code signing, blockchain signatures, secure
        email — is at stake.
      </p>

      <p>
        What Shor does <em>not</em> break:
      </p>
      <ul>
        <li>
          <strong>Symmetric ciphers</strong> (AES, ChaCha) —
          only square-root speedup via Grover. Double key size
          and you're still secure.
        </li>
        <li>
          <strong>Hash functions</strong> — same, square-root
          speedup. Use 384- or 512-bit hashes.
        </li>
        <li>
          <strong>Lattice-based crypto</strong> — believed
          quantum-resistant. NIST's chosen post-quantum
          standards are lattice-based.
        </li>
        <li>
          <strong>Hash-based signatures</strong> (e.g.
          SPHINCS+) — quantum-resistant, with the simplest
          security assumptions.
        </li>
        <li>
          <strong>Code-based and isogeny-based crypto</strong> —
          alternative post-quantum candidates.
        </li>
      </ul>

      <p>
        The post-quantum migration is the largest cryptographic
        transition in history. NIST has finalised the first
        post-quantum standards (ML-KEM, ML-DSA, SLH-DSA, in
        2024). Migration is happening now in TLS, SSH, signal
        protocols, and increasingly Bitcoin (BIP-360).
      </p>

      <p>
        Final two chapters: quantum error correction (what
        makes large-scale Shor implementation possible at all)
        and post-quantum cryptography (what we replace RSA
        with).
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
      "Shor's algorithm reduces factoring $N$ to…",
    options: [
      "matrix inversion",
      "finding the period $r$ of $a^x \\bmod N$ for a random $a$",
      "computing GCDs",
      "primality testing",
    ],
    correct: 1,
    explanation:
      "Reduction: pick random $a$ coprime to $N$, find period of $f(x) = a^x \\bmod N$. Then $\\gcd(a^{r/2} \\pm 1, N)$ gives non-trivial factors with probability $\\geq 1/2$. The period-finding is what's classically hard.",
  },
  {
    prompt:
      "What's the time complexity of Shor's quantum factoring algorithm?",
    options: [
      "$O((\\log N)^3)$ — polynomial in the bit length of $N$",
      "$O(\\sqrt N)$",
      "$O(N)$",
      "exponential like classical",
    ],
    correct: 0,
    explanation:
      "Polynomial in $\\log N$. Compare best classical (general number field sieve): $\\exp(c (\\log N)^{1/3} (\\log \\log N)^{2/3})$ — sub-exponential but still much worse. Shor's exponential separation from classical.",
  },
  {
    prompt:
      "Which cryptosystems are broken by Shor's algorithm?",
    options: [
      "AES (and other symmetric ciphers)",
      "RSA, ECDSA, Diffie-Hellman, and other public-key schemes based on factoring or discrete log",
      "SHA-256",
      "all of cryptography",
    ],
    correct: 1,
    explanation:
      "Public-key crypto based on factoring or discrete log. Symmetric ciphers (AES) and hashes (SHA) only get square-root speedup from Grover, manageable by doubling key sizes.",
  },
  {
    prompt:
      "Estimated physical qubits to break 2048-bit RSA via Shor (with surface-code error correction at ~$10^{-3}$ physical error rate)?",
    options: [
      "~1,000",
      "~100,000",
      "~20 million",
      "infeasible",
    ],
    correct: 2,
    explanation:
      "Recent estimates: ~4,000 logical qubits → ~20 million physical qubits with surface-code error correction. Far beyond today's ~1,000-qubit devices, but on plausible engineering roadmaps.",
  },
  {
    prompt:
      "'Harvest now, decrypt later' attacks…",
    options: [
      "are impossible",
      "are why post-quantum migration matters NOW even though large quantum computers don't exist yet",
      "only target symmetric ciphers",
      "only target hash functions",
    ],
    correct: 1,
    explanation:
      "Adversaries can record today's encrypted traffic and decrypt it once large QCs arrive. Long-confidentiality data (state secrets, medical, IP) must be re-encrypted with PQC now. The migration urgency.",
  },
];
