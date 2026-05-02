import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function RsaBody() {
  return (
    <>
      <p>
        RSA is the first widely-deployed public-key cryptosystem,
        invented by Rivest, Shamir, and Adleman in 1977. The point
        of public-key cryptography: a sender can encrypt a message
        using only the recipient's <em>public</em> key, but
        decryption requires the recipient's <em>private</em> key.
        No prior shared secret is needed. This solves the
        thousand-year-old problem of how two strangers can
        communicate confidentially over an insecure channel.
      </p>
      <p>
        Mathematically, RSA is a single line — Euler's theorem
        applied to the right pair of exponents. Practically, it
        depends on the empirical fact that factoring a 2048-bit
        number is beyond classical computers. That gap closes the
        moment a sufficiently large quantum computer runs Shor's
        algorithm. Most of the world's HTTPS still depends on it,
        and the migration to post-quantum alternatives is
        underway.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.781 — RSA lecture",
            author: "Prof. Andrew Sutherland",
            duration: "Reading + lecture",
            url: "https://ocw.mit.edu/courses/18-781-theory-of-numbers-spring-2012/",
            note: "Sutherland walks through the algorithm and proof in detail.",
          },
          {
            title: "Computerphile — RSA explained",
            author: "Mike Pound (Computerphile)",
            duration: "20 min",
            url: "https://www.youtube.com/watch?v=4zahvcJ9glg",
            note: "Animated walkthrough of the RSA recipe with worked toy example.",
          },
          {
            title: "Khan Academy — RSA encryption",
            author: "Khan Academy",
            duration: "~1h",
            url: "https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/v/rsa-encryption-part-1",
            note: "Build-up from modular arithmetic; great if Part 4 doesn't click.",
          },
          {
            title: "RFC 8017 — PKCS #1 (RSA standard)",
            author: "IETF",
            duration: "Reading",
            url: "https://datatracker.ietf.org/doc/html/rfc8017",
            note: "The actual standard, including OAEP padding. Reading specs is a useful skill.",
          },
          {
            title: "Cryptography Engineering — Ferguson, Schneier, Kohno",
            author: "Ferguson / Schneier / Kohno",
            duration: "Reading",
            url: "https://www.schneier.com/books/cryptography-engineering/",
            note: "Practical considerations: padding, key sizes, side-channel attacks. Essential context.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The public-key idea</h2>

      <p>
        Until 1976, all cryptography was{" "}
        <em>symmetric</em>: sender and receiver shared a secret
        key, and the same key did encryption and decryption (one-
        time pads, AES, etc.). The problem: how do you share the
        key in the first place if your channel isn't secure?
      </p>

      <p>
        Diffie and Hellman's 1976 paper proposed a thought
        experiment. Suppose there's a function{" "}
        <InlineMath math="f" /> such that:
      </p>
      <ul>
        <li>
          Given <InlineMath math="x" />,{" "}
          <InlineMath math="f(x)" /> is easy to compute.
        </li>
        <li>
          Given <InlineMath math="f(x)" />, recovering{" "}
          <InlineMath math="x" /> is computationally hard{" "}
          <em>unless</em> you know some secret "trapdoor."
        </li>
      </ul>
      <p>
        Such a <strong>trapdoor function</strong> would let one
        party publish <InlineMath math="f" /> openly while
        keeping the trapdoor private. Anyone could compute{" "}
        <InlineMath math="f" />; only the trapdoor holder could
        invert it. RSA realised this with concrete arithmetic.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Key generation</h2>

      <p>
        Alice (the recipient) generates a key pair:
      </p>

      <ol>
        <li>
          Pick two distinct large primes <InlineMath math="p" /> and{" "}
          <InlineMath math="q" />. (For 2048-bit RSA, each is about
          1024 bits long.)
        </li>
        <li>
          Compute <InlineMath math="n = p q" />. This is the{" "}
          <strong>modulus</strong>; it goes in the public key.
        </li>
        <li>
          Compute <InlineMath math="\varphi(n) = (p - 1)(q - 1)" />{" "}
          using the multiplicative property of the totient.
        </li>
        <li>
          Choose a public exponent <InlineMath math="e" />{" "}
          satisfying <InlineMath math="\gcd(e, \varphi(n)) = 1" />.
          Common choice: <InlineMath math="e = 65537 = 2^{16} + 1" /> —
          small, prime, and has only two ones in its binary
          representation (efficient exponentiation).
        </li>
        <li>
          Compute the private exponent{" "}
          <InlineMath math="d \equiv e^{-1} \pmod{\varphi(n)}" />{" "}
          via the extended Euclidean algorithm.
        </li>
      </ol>

      <Callout title="The two keys">
        <strong>Public key:</strong>{" "}
        <InlineMath math="(n, e)" /> — published.
        <br />
        <strong>Private key:</strong>{" "}
        <InlineMath math="(n, d)" /> — kept secret.{" "}
        <InlineMath math="p, q, \varphi(n)" /> are also kept secret
        (they're equivalent to <InlineMath math="d" /> in
        recoverability).
      </Callout>

      <p>
        The recipe condenses to: <em>two primes, a totient, and a
        modular inverse</em>. Generation is fast (seconds with
        good prime-generation primitives).
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Encryption &amp; decryption</h2>

      <p>
        Bob wants to send Alice a message{" "}
        <InlineMath math="m" />, an integer in{" "}
        <InlineMath math="\{0, 1, \dots, n - 1\}" />. He encrypts
        with Alice's public key:
      </p>
      <BlockMath math="c = m^e \bmod n." />
      <p>
        He sends <InlineMath math="c" />. Alice decrypts with her
        private key:
      </p>
      <BlockMath math="m = c^d \bmod n." />

      <p>
        That's the entire algorithm. Encryption and decryption are
        both single modular exponentiations. With repeated squaring
        each takes{" "}
        <InlineMath math="O(\log n)" /> multiplications, so even
        for 2048-bit <InlineMath math="n" /> they're fast.
      </p>

      <Callout title="Try it">
        Toy RSA with small primes. Pick <InlineMath math="p" /> and{" "}
        <InlineMath math="q" />, the widget builds the keys and lets
        you encrypt and decrypt small messages. Real RSA scales
        this same recipe by ~1000× in size.
      </Callout>

      <RsaWidget />

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Why it works</h2>

      <p>
        Why does <InlineMath math="(m^e)^d = m^{ed} \equiv m \pmod n" />?
        The key claim is{" "}
        <InlineMath math="m^{ed} \equiv m \pmod n" />, for all{" "}
        <InlineMath math="m" />. Here's the proof.
      </p>

      <p>
        By construction, <InlineMath math="ed \equiv 1 \pmod{\varphi(n)}" />,
        so <InlineMath math="ed = 1 + k \varphi(n)" /> for some
        non-negative integer <InlineMath math="k" />.
      </p>

      <p>
        <strong>Case 1.</strong>{" "}
        <InlineMath math="\gcd(m, n) = 1" />. By Euler's theorem,
      </p>
      <BlockMath math="m^{\varphi(n)} \equiv 1 \pmod n." />
      <p>
        Then{" "}
        <InlineMath math="m^{ed} = m^{1 + k\varphi(n)} = m \cdot (m^{\varphi(n)})^k \equiv m \cdot 1^k = m \pmod n" />.
        ✓
      </p>

      <p>
        <strong>Case 2.</strong>{" "}
        <InlineMath math="\gcd(m, n) > 1" />. Since{" "}
        <InlineMath math="n = pq" /> and <InlineMath math="m" /> is
        not coprime to it, <InlineMath math="m" /> is divisible by{" "}
        <InlineMath math="p" /> or <InlineMath math="q" />. Without
        loss of generality, <InlineMath math="p \mid m" />. Then{" "}
        <InlineMath math="m \equiv 0 \pmod p" />, so{" "}
        <InlineMath math="m^{ed} \equiv 0 \pmod p" />, and{" "}
        <InlineMath math="m^{ed} - m \equiv 0 \pmod p" />. Mod{" "}
        <InlineMath math="q" />: if <InlineMath math="q \nmid m" />,
        Fermat gives{" "}
        <InlineMath math="m^{q - 1} \equiv 1 \pmod q" />, and
        a similar manipulation shows{" "}
        <InlineMath math="m^{ed} \equiv m \pmod q" />. By CRT,{" "}
        <InlineMath math="m^{ed} \equiv m \pmod n" />. (If both{" "}
        <InlineMath math="p \mid m" /> and{" "}
        <InlineMath math="q \mid m" />, then{" "}
        <InlineMath math="n \mid m" />, so{" "}
        <InlineMath math="m \equiv 0 \pmod n" /> trivially.) ∎
      </p>

      <p>
        The combination of Euler's theorem (Case 1, the typical
        case) and CRT (Case 2, edge case) is what makes the
        identity hold for{" "}
        <em>every</em> <InlineMath math="m" />, not just coprime
        ones.
      </p>

      <Pitfall>
        Decryption only works when the receiver's private key
        matches the public key used to encrypt. RSA does <em>not</em>{" "}
        protect message integrity by itself — an attacker can
        modify the ciphertext, and what decrypts won't be the
        original. RSA in production is always combined with
        authentication (signatures, MACs).
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Why it's secure</h2>

      <p>
        The security argument rests on three connected hard
        problems:
      </p>

      <ol>
        <li>
          <strong>Factoring</strong>: given{" "}
          <InlineMath math="n = pq" />, find{" "}
          <InlineMath math="p, q" />. The best classical algorithm
          (general number field sieve) runs in roughly{" "}
          <InlineMath math="\exp(\, c (\ln n)^{1/3} (\ln \ln n)^{2/3})" />.
          For 2048-bit <InlineMath math="n" />, that's beyond
          current and projected classical computing capacity.
        </li>
        <li>
          <strong>Computing <InlineMath math="\varphi(n)" /> from{" "}
          <InlineMath math="n" /></strong> is equivalent to
          factoring (knowing one trivially gives the other for{" "}
          <InlineMath math="n = pq" />).
        </li>
        <li>
          <strong>The RSA problem</strong>: given{" "}
          <InlineMath math="(n, e, c)" />, find{" "}
          <InlineMath math="m" /> with{" "}
          <InlineMath math="c \equiv m^e \pmod n" />. Conjectured
          to be as hard as factoring, but not <em>proven</em>
          equivalent.
        </li>
      </ol>

      <p>
        The chain of "as hard as": breaking RSA encryption ≤
        computing <InlineMath math="\varphi(n)" /> ≤ factoring{" "}
        <InlineMath math="n" />. The middle equivalence is exact;
        the first is a long-standing conjecture. So RSA security{" "}
        <em>at most</em> rests on factoring, which is widely
        believed to be hard — but not proven.
      </p>

      <h3>Why <InlineMath math="\varphi(n)" /> is the secret</h3>

      <p>
        With <InlineMath math="\varphi(n)" />, anyone can compute{" "}
        <InlineMath math="d = e^{-1} \pmod{\varphi(n)}" /> via
        extended Euclidean — and then read all encrypted
        messages. So <InlineMath math="\varphi(n)" /> must stay
        secret, which it does because computing it requires
        factoring <InlineMath math="n" />.
      </p>

      <p>
        And it's why we keep <InlineMath math="p, q" /> separately
        secret too — they let you compute{" "}
        <InlineMath math="\varphi(n)" /> in one step, hence{" "}
        <InlineMath math="d" />.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Practical considerations</h2>

      <h3>Key sizes</h3>

      <p>
        Recommended key sizes (as of 2025):
      </p>
      <ul>
        <li>
          <strong>1024 bits</strong>: deprecated, factorable by
          well-resourced adversaries.
        </li>
        <li>
          <strong>2048 bits</strong>: current minimum, used in most
          TLS certificates.
        </li>
        <li>
          <strong>3072 bits</strong>: equivalent to 128-bit
          symmetric security (AES-128). Recommended for new
          deployments needing 30+ year confidentiality.
        </li>
        <li>
          <strong>4096 bits</strong>: paranoid; performance hit but
          longer security margin.
        </li>
      </ul>

      <h3>Padding</h3>

      <p>
        Plain "textbook" RSA — encrypt the message directly — is
        catastrophically insecure in practice. Several attack
        vectors:
      </p>
      <ul>
        <li>
          <strong>Deterministic.</strong> Same plaintext always
          encrypts to the same ciphertext, leaking patterns.
        </li>
        <li>
          <strong>Malleability.</strong> Multiplying ciphertexts
          multiplies plaintexts:{" "}
          <InlineMath math="c_1 c_2 \equiv (m_1 m_2)^e \pmod n" />.
          An attacker can construct related ciphertexts.
        </li>
        <li>
          <strong>Small <InlineMath math="m" /></strong>: if{" "}
          <InlineMath math="m^e < n" />, mod is irrelevant and
          decryption is just <InlineMath math="m = \sqrt[e]{c}" />.
        </li>
      </ul>

      <p>
        Real RSA uses <strong>OAEP</strong> (Optimal Asymmetric
        Encryption Padding) for encryption and{" "}
        <strong>PSS</strong> (Probabilistic Signature Scheme) for
        signatures. Both pad messages with hashed random data to
        randomise output and bind the algorithm to a hash function.
        These are the defaults in PKCS #1 v2.x.
      </p>

      <h3>Side channels</h3>

      <p>
        Even with correct algorithms, real-world implementations
        leak information through power consumption, timing, and EM
        emission. Attacks on naive RSA implementations can
        recover private keys from timing differences in modular
        exponentiation (Kocher, 1996). Modern libraries use
        constant-time implementations and Montgomery ladder
        variants to defeat these.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · The quantum threat</h2>

      <p>
        Peter Shor (1994) showed that a quantum computer can
        factor an <InlineMath math="n" />-bit integer in
        polynomial time —{" "}
        <InlineMath math="O((\log n)^2 (\log \log n))" /> quantum
        operations, vastly faster than classical. The structure:
      </p>
      <ol>
        <li>
          Pick random <InlineMath math="a" /> coprime to{" "}
          <InlineMath math="n" />.
        </li>
        <li>
          Use a quantum algorithm to find the period{" "}
          <InlineMath math="r" /> of{" "}
          <InlineMath math="f(x) = a^x \pmod n" />. This step is
          exponentially faster on a quantum computer.
        </li>
        <li>
          With probability ≥ 1/2,{" "}
          <InlineMath math="\gcd(a^{r/2} \pm 1, n)" /> gives a
          non-trivial factor of <InlineMath math="n" />.
        </li>
      </ol>

      <p>
        We'll see Shor's algorithm in detail in Module XVI. The
        upshot for cryptography: RSA, DSA, ECDSA, Diffie-Hellman —
        every cryptosystem based on factoring or discrete log —
        is vulnerable to a sufficiently large fault-tolerant
        quantum computer. Estimates put the requirement at a few
        million logical qubits, which existing devices fall
        several orders of magnitude short of (current best ~1000
        physical qubits, error rates too high for fault tolerance).
      </p>

      <p>
        NIST's post-quantum cryptography standardisation (
        finalised 2024) selected <strong>Kyber</strong> and{" "}
        <strong>Dilithium</strong> (both lattice-based) as the new
        standards. Migration is underway in TLS, SSH, email
        signing, and other protocols. Bitcoin's BIP-360 proposes
        quantum-safe signature schemes. We'll see this trade in
        Module XVI.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>HTTPS.</strong> Most TLS handshakes still use
          RSA-2048 for the certificate signature (though the
          ephemeral key exchange has moved to elliptic curves —
          see next chapter).
        </li>
        <li>
          <strong>Digital signatures.</strong> Document signing,
          email signing (S/MIME, PGP), code signing all use RSA
          or its elliptic-curve cousins.
        </li>
        <li>
          <strong>SSH.</strong> Public-key authentication is
          typically RSA or ECDSA; the keys you generate with{" "}
          <InlineMath math="\texttt{ssh-keygen}" /> default to
          one of these.
        </li>
        <li>
          <strong>Quantum readiness.</strong> Understanding why
          RSA breaks under Shor — and what classical alternatives
          (lattice-based, hash-based, isogeny-based) survive — is
          the central question of cryptographic research today.
        </li>
      </ul>

      <p>
        Next chapter: elliptic curves and ECDSA. Same trapdoor
        idea, different group: not multiplication mod{" "}
        <InlineMath math="p" /> but addition on an elliptic curve.
        Smaller keys for the same security level — and why
        Bitcoin uses a specific curve called secp256k1.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: Mini-RSA
// ════════════════════════════════════════════════════════════

const smallPrimes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53];

function RsaWidget() {
  const [p, setP] = useState(11);
  const [q, setQ] = useState(13);
  const [e, setE] = useState(7);
  const [m, setM] = useState(42);

  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const eValid = gcd(e, phi) === 1;
  const d = eValid ? modInverse(e, phi) : null;

  const c = m % n;
  const ciphertext = modPow(c, e, n);
  const decrypted = d !== null ? modPow(ciphertext, d, n) : null;

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Selector label="p (prime)" value={p} options={smallPrimes.filter((x) => x !== q)} onChange={setP} />
          <Selector label="q (prime)" value={q} options={smallPrimes.filter((x) => x !== p)} onChange={setQ} />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Stat label="n = p·q" value={`${n}`} />
          <Stat label="φ(n) = (p−1)(q−1)" value={`${phi}`} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <div className="text-xs text-ink-400 mb-1">e (public exponent, must be coprime to φ)</div>
            <input
              type="number"
              min={3}
              max={phi - 1}
              value={e}
              onChange={(ev) => setE(Number(ev.target.value))}
              className="w-full px-2 py-1.5 rounded-lg bg-ink-800 border border-ink-700 text-sm font-mono text-ink-100"
            />
          </label>
          <Stat label={`d (private = e⁻¹ mod φ)`} value={d !== null ? `${d}` : "(invalid e)"} />
        </div>

        <div className="border-t border-ink-800 pt-3 space-y-2">
          <label className="block">
            <div className="text-xs text-ink-400 mb-1">message m (will be reduced mod n)</div>
            <input
              type="number"
              min={0}
              value={m}
              onChange={(ev) => setM(Number(ev.target.value))}
              className="w-full px-2 py-1.5 rounded-lg bg-ink-800 border border-ink-700 text-sm font-mono text-ink-100"
            />
          </label>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <Stat label="ciphertext c = m^e mod n" value={`${ciphertext}`} />
            <Stat label="decrypted = c^d mod n" value={decrypted !== null ? `${decrypted}` : "—"} />
          </div>
        </div>

        {!eValid && (
          <div className="text-sm rounded-lg px-3 py-2 bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/30">
            ✗ gcd(e, φ) = {gcd(e, phi)} — pick an e coprime to φ.
          </div>
        )}
        {eValid && decrypted === c && (
          <div className="text-sm rounded-lg px-3 py-2 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30">
            ✓ Decryption recovers the original message ({c}).
          </div>
        )}
      </div>
      <figcaption>
        Toy RSA. Real systems use 1024-bit primes; the algorithm
        is identical, the numbers are just astronomically larger.
        Watch how changing <InlineMath math="p" /> or{" "}
        <InlineMath math="q" /> changes <InlineMath math="\varphi" />{" "}
        and forces a new private exponent <InlineMath math="d" />.
      </figcaption>
    </figure>
  );
}

function Selector({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: number;
  options: number[];
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="text-xs text-ink-400 mb-1">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-2 py-1.5 rounded-lg bg-ink-800 border border-ink-700 text-sm font-mono text-ink-100"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ink-800/60 border border-ink-800 px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-ink-500">{label}</div>
      <div className="font-mono text-ink-100 mt-0.5">{value}</div>
    </div>
  );
}

function gcd(a: number, b: number): number {
  while (b) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}

function modPow(base: number, exp: number, mod: number): number {
  let result = 1 % mod;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) result = (result * base) % mod;
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
}

function modInverse(a: number, m: number): number | null {
  const [g, x] = extGcd(a, m);
  if (g !== 1) return null;
  return ((x % m) + m) % m;
}

function extGcd(a: number, b: number): [number, number, number] {
  if (b === 0) return [a, 1, 0];
  const [g, x1, y1] = extGcd(b, a % b);
  return [g, y1, x1 - Math.floor(a / b) * y1];
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "In RSA with $p = 11$ and $q = 13$, what is $\\varphi(n)$?",
    options: ["143", "144", "120", "23"],
    correct: 2,
    explanation:
      "$n = 143$, $\\varphi(n) = (p-1)(q-1) = 10 \\cdot 12 = 120$. Note $\\varphi(n) \\neq n - 1$ in general — it equals that only for prime $n$.",
  },
  {
    prompt:
      "In RSA, the private exponent $d$ satisfies…",
    options: [
      "$d = e \\bmod n$",
      "$ed \\equiv 1 \\pmod n$",
      "$ed \\equiv 1 \\pmod{\\varphi(n)}$",
      "$d = \\varphi(n) - e$",
    ],
    correct: 2,
    explanation:
      "$d$ is the inverse of $e$ modulo $\\varphi(n)$ — found via the extended Euclidean algorithm. The mod is $\\varphi(n)$, not $n$.",
  },
  {
    prompt:
      "RSA decryption $m^{ed} \\equiv m \\pmod n$ relies on…",
    options: [
      "the Riemann hypothesis",
      "Euler's theorem (and CRT for the edge case $\\gcd(m,n) > 1$)",
      "the prime number theorem",
      "Diffie–Hellman key exchange",
    ],
    correct: 1,
    explanation:
      "$m^{\\varphi(n)} \\equiv 1 \\pmod n$ for $\\gcd(m, n) = 1$ (Euler), so $m^{ed} = m^{1 + k\\varphi(n)} \\equiv m$. The non-coprime cases (rare for random messages) close via CRT.",
  },
  {
    prompt:
      "RSA security rests primarily on the difficulty of…",
    options: [
      "computing modular exponentiation",
      "factoring large composite numbers",
      "computing modular inverses",
      "primality testing",
    ],
    correct: 1,
    explanation:
      "Recovering $\\varphi(n)$ from $n$ (and hence finding $d$) is equivalent to factoring $n = pq$. Modular exponentiation, modular inverses, and primality testing are all easy — that's why RSA is fast to use.",
  },
  {
    prompt:
      "Why is textbook RSA insecure in practice?",
    options: [
      "encryption is too slow",
      "it's deterministic and malleable; small messages are trivial to recover",
      "the modulus is too large",
      "it leaks the public key",
    ],
    correct: 1,
    explanation:
      "Same plaintext → same ciphertext (deterministic, leaks patterns); ciphertext multiplication corresponds to plaintext multiplication (malleable); small $m$ with $m^e < n$ is recoverable by simply taking an $e$-th root over $\\mathbb{Z}$. Real systems use OAEP padding to fix all three.",
  },
];
