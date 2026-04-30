import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function EcdsaBody() {
  return (
    <>
      <p>
        Elliptic-curve cryptography (ECC) is RSA's modern
        successor. The trapdoor is the same — easy in one
        direction, hard the other — but the underlying group is
        different: not multiplication mod{" "}
        <InlineMath math="p" />, but addition of points on a
        curve. The advantage: equivalent security with much
        smaller keys. 256-bit ECC ≈ 3072-bit RSA. That matters
        when keys live on smartcards, IoT devices, and Bitcoin
        addresses. ECDSA — the elliptic-curve digital signature
        algorithm — is what signs every Bitcoin transaction,
        every modern TLS handshake's ephemeral keys, every Apple
        Pay token.
      </p>
      <p>
        And — because the same{" "}
        <em>discrete logarithm</em> structure underlies it as
        underlies Diffie–Hellman — Shor's algorithm breaks ECDSA
        too, even faster than it breaks RSA. This chapter ends
        the number-theory module pointed straight at the
        post-quantum question: when do we have to migrate, and to
        what?
      </p>

      <ReferenceResources
        items={[
          {
            title: "Elliptic Curves and Cryptography — lecture notes",
            author: "Prof. Andrew Sutherland (MIT 18.783)",
            duration: "~30h, full course",
            url: "https://ocw.mit.edu/courses/18-783-elliptic-curves-spring-2021/",
            note: "The MIT graduate-level course on elliptic curves. Sutherland's notes are the gold standard.",
          },
          {
            title: "Elliptic Curve Cryptography (Computerphile)",
            author: "Mike Pound",
            duration: "8 min",
            url: "https://www.youtube.com/watch?v=NF1pwjL9-DE",
            note: "Whirlwind tour of why ECC. Watch first.",
          },
          {
            title: "Elliptic curves — Numberphile",
            author: "Numberphile (with David Eisenbud)",
            duration: "varies",
            url: "https://www.youtube.com/watch?v=NV4OcbrWqCo",
            note: "Friendly visual treatment of the group law and rational points.",
          },
          {
            title: "SEC 1 — Standards for Efficient Cryptography",
            author: "Certicom",
            duration: "Reading",
            url: "https://www.secg.org/sec1-v2.pdf",
            note: "The actual ECDSA specification, including secp256k1 and other named curves.",
          },
          {
            title: "Mastering Bitcoin — ch. 4 (keys and addresses)",
            author: "Andreas Antonopoulos",
            duration: "Reading",
            url: "https://github.com/bitcoinbook/bitcoinbook",
            note: "Free online. The practical use of ECDSA in Bitcoin, including secp256k1 specifics.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Elliptic curves</h2>

      <p>
        An <strong>elliptic curve</strong> over a field{" "}
        <InlineMath math="F" /> (think{" "}
        <InlineMath math="\mathbb{R}" /> or{" "}
        <InlineMath math="\mathbb{F}_p" />, integers mod{" "}
        <InlineMath math="p" />) is the set of solutions to a{" "}
        <em>Weierstrass equation</em>:
      </p>
      <BlockMath math="y^2 = x^3 + ax + b" />
      <p>
        with the technical condition{" "}
        <InlineMath math="4a^3 + 27 b^2 \neq 0" /> (the curve is
        smooth, no cusps or self-intersections). Plus a single
        extra "point at infinity," denoted{" "}
        <InlineMath math="\mathcal{O}" />, which acts as the
        identity element of the group structure to come.
      </p>

      <p>
        Over the reals, an elliptic curve is a smooth one- or two-
        component curve in the plane, with vertical-axis symmetry
        (because of the <InlineMath math="y^2" />). Examples:
      </p>
      <ul>
        <li>
          <InlineMath math="y^2 = x^3 - x" />: two components — an
          oval near the origin and an unbounded branch on the
          right.
        </li>
        <li>
          <InlineMath math="y^2 = x^3 + 7" />: single connected
          component (this is Bitcoin's curve, secp256k1).
        </li>
      </ul>

      <p>
        The discriminant condition is what makes the cubic{" "}
        <InlineMath math="x^3 + ax + b" /> have distinct roots
        (over <InlineMath math="\bar F" />), preventing nasty
        singularities. Singular curves can still be analysed but
        belong to a different chapter of algebraic geometry.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The group law</h2>

      <p>
        The headline fact: the points on an elliptic curve form an{" "}
        <em>abelian group</em> under a geometrically-defined
        addition. Adding two points <InlineMath math="P + Q" /> is
        defined by the chord-tangent process:
      </p>

      <ol>
        <li>
          Draw the line through <InlineMath math="P" /> and{" "}
          <InlineMath math="Q" />. (If{" "}
          <InlineMath math="P = Q" />, use the tangent at{" "}
          <InlineMath math="P" />.)
        </li>
        <li>
          That line generically intersects the cubic at a third
          point — call it <InlineMath math="R" />.
        </li>
        <li>
          Reflect <InlineMath math="R" /> across the{" "}
          <InlineMath math="x" />-axis (negate the{" "}
          <InlineMath math="y" />-coordinate). The result is{" "}
          <InlineMath math="P + Q" />.
        </li>
      </ol>

      <p>
        Special cases:
      </p>
      <ul>
        <li>
          The point at infinity{" "}
          <InlineMath math="\mathcal{O}" /> is the identity:{" "}
          <InlineMath math="P + \mathcal{O} = P" />.
        </li>
        <li>
          The negative of <InlineMath math="P = (x, y)" /> is{" "}
          <InlineMath math="-P = (x, -y)" />. They sum to{" "}
          <InlineMath math="\mathcal{O}" /> (the line through them
          is vertical, "meeting" the curve at infinity).
        </li>
        <li>
          To double a point, use the tangent line.
        </li>
      </ul>

      <ECCWidget />

      <h3>Algebraic formulas</h3>

      <p>
        For <InlineMath math="P_1 = (x_1, y_1)" />,{" "}
        <InlineMath math="P_2 = (x_2, y_2)" /> distinct (and
        neither is <InlineMath math="\mathcal{O}" />), with{" "}
        <InlineMath math="x_1 \neq x_2" />:
      </p>
      <BlockMath math="\lambda = \frac{y_2 - y_1}{x_2 - x_1}, \quad x_3 = \lambda^2 - x_1 - x_2, \quad y_3 = \lambda (x_1 - x_3) - y_1." />

      <p>
        For point doubling (<InlineMath math="P_1 = P_2 = (x, y)" />,{" "}
        <InlineMath math="y \neq 0" />):
      </p>
      <BlockMath math="\lambda = \frac{3 x^2 + a}{2 y}, \quad x_3 = \lambda^2 - 2 x, \quad y_3 = \lambda (x - x_3) - y." />

      <p>
        These formulas come from substituting the line into the
        cubic and using Vieta's formulas to find the third root.
        The factor <InlineMath math="3 x^2 + a" /> in the doubling
        formula is the implicit derivative of{" "}
        <InlineMath math="y^2 = x^3 + ax + b" />.
      </p>

      <p>
        Surprising fact: this addition is associative —{" "}
        <InlineMath math="(P + Q) + R = P + (Q + R)" />. Proving
        associativity from the chord-tangent definition is{" "}
        <em>genuinely hard</em> (the standard proofs use the
        Cayley–Bacharach theorem or projective geometry). It's a
        non-trivial fact about cubics. We'll take it on faith here.
      </p>

      <Pitfall>
        Geometric pictures only work over{" "}
        <InlineMath math="\mathbb{R}" />. Cryptography uses curves
        over <em>finite fields</em>{" "}
        <InlineMath math="\mathbb{F}_p" />, where the curve is a
        scattered set of points, not a smooth curve. The same
        algebraic formulas still define the group law, but the
        geometric picture is misleading.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Elliptic curves over finite fields</h2>

      <p>
        For cryptography, we work with{" "}
        <InlineMath math="E(\mathbb{F}_p)" /> — points on the
        elliptic curve whose coordinates are integers mod a prime{" "}
        <InlineMath math="p" />. The same Weierstrass equation
      </p>
      <BlockMath math="y^2 \equiv x^3 + ax + b \pmod p" />
      <p>
        defines a finite set of solutions, plus the point at
        infinity. The group law uses the same algebraic formulas,
        with all arithmetic done mod{" "}
        <InlineMath math="p" /> (and division replaced by
        multiplication by modular inverse).
      </p>

      <p>
        How many points? <strong>Hasse's theorem</strong>: the
        number of points on{" "}
        <InlineMath math="E(\mathbb{F}_p)" /> is{" "}
        <InlineMath math="p + 1 - t" /> with{" "}
        <InlineMath math="|t| \leq 2\sqrt p" />. So roughly{" "}
        <InlineMath math="p + 1" /> points, with fluctuation on
        the order of{" "}
        <InlineMath math="\sqrt p" />.
      </p>

      <h3>Scalar multiplication</h3>

      <p>
        For <InlineMath math="P" /> a point on the curve and{" "}
        <InlineMath math="k" /> a positive integer,{" "}
        <InlineMath math="kP = P + P + \cdots + P" /> (
        <InlineMath math="k" /> copies). Computing{" "}
        <InlineMath math="kP" /> for large{" "}
        <InlineMath math="k" /> uses{" "}
        <em>double-and-add</em>: write{" "}
        <InlineMath math="k" /> in binary, repeatedly double and
        add. Cost:{" "}
        <InlineMath math="O(\log k)" /> point operations.
      </p>

      <p>
        This is the EC analogue of modular exponentiation:{" "}
        <InlineMath math="kP" /> in additive notation is the
        equivalent of <InlineMath math="g^k" /> in multiplicative.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Discrete logarithm on elliptic curves</h2>

      <p>
        The hard problem powering ECC:
      </p>

      <Callout title="Elliptic-curve discrete log problem (ECDLP)">
        Given two points <InlineMath math="P, Q" /> on{" "}
        <InlineMath math="E(\mathbb{F}_p)" /> with{" "}
        <InlineMath math="Q = kP" /> for some unknown{" "}
        <InlineMath math="k" />, find <InlineMath math="k" />.
      </Callout>

      <p>
        Going forward (compute <InlineMath math="kP" /> from{" "}
        <InlineMath math="k, P" />) is fast. Going backward (find{" "}
        <InlineMath math="k" /> from <InlineMath math="P, kP" />) is
        believed to be hard.
      </p>

      <p>
        The best classical algorithms (Pollard rho, baby-step
        giant-step) run in time{" "}
        <InlineMath math="O(\sqrt n)" />, where{" "}
        <InlineMath math="n" /> is the order of the group. To get
        128 bits of security, you need{" "}
        <InlineMath math="n \approx 2^{256}" /> — a 256-bit curve.
      </p>

      <p>
        Compare RSA: for 128-bit security via factoring, you need
        a 3072-bit modulus. Elliptic curves give you ~12× smaller
        keys for equivalent security. <em>Why</em>: the index
        calculus algorithm that makes factoring "merely
        sub-exponential" doesn't work on generic elliptic curves,
        so the best attack drops down to{" "}
        <InlineMath math="O(\sqrt n)" /> — which is much slower.
      </p>

      <Pitfall>
        Some elliptic curves are weak. <em>Anomalous</em> curves
        (where <InlineMath math="\#E(\mathbb{F}_p) = p" />){" "}
        <em>are</em> attackable by index calculus — there's a
        polynomial-time algorithm. <em>Supersingular</em> curves
        admit pairing-based attacks. The standardised curves
        (secp256k1, NIST P-256, Curve25519) avoid these
        pathologies by construction.
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · ECDSA</h2>

      <p>
        Elliptic Curve Digital Signature Algorithm. Producing a
        signature lets anyone verify that a message came from the
        holder of a particular private key, without revealing the
        private key.
      </p>

      <h3>Setup</h3>
      <p>
        Public parameters: a curve{" "}
        <InlineMath math="E(\mathbb{F}_p)" />, a base point{" "}
        <InlineMath math="G" /> of large prime order{" "}
        <InlineMath math="n" />.
      </p>

      <p>
        Alice generates a key pair:
      </p>
      <ul>
        <li>
          Private key:{" "}
          <InlineMath math="d \in \{1, 2, \dots, n-1\}" />, chosen
          uniformly at random.
        </li>
        <li>
          Public key:{" "}
          <InlineMath math="Q = dG" />, a point on the curve.
        </li>
      </ul>

      <h3>Signing</h3>

      <p>
        To sign a message <InlineMath math="m" />:
      </p>
      <ol>
        <li>
          Compute <InlineMath math="z = \mathrm{HASH}(m)" />, taking
          the leftmost <InlineMath math="\log_2 n" /> bits.
        </li>
        <li>
          Pick a per-signature random nonce{" "}
          <InlineMath math="k \in \{1, \dots, n-1\}" />.
        </li>
        <li>
          Compute the curve point{" "}
          <InlineMath math="(x_1, y_1) = kG" />, then{" "}
          <InlineMath math="r = x_1 \bmod n" />. If{" "}
          <InlineMath math="r = 0" />, restart with a new{" "}
          <InlineMath math="k" />.
        </li>
        <li>
          Compute{" "}
          <InlineMath math="s = k^{-1}(z + rd) \bmod n" />. If{" "}
          <InlineMath math="s = 0" />, restart.
        </li>
        <li>
          Output signature <InlineMath math="(r, s)" />.
        </li>
      </ol>

      <h3>Verifying</h3>

      <p>
        Bob receives <InlineMath math="(m, r, s)" /> and Alice's
        public key <InlineMath math="Q" />. He verifies:
      </p>
      <ol>
        <li>
          Check{" "}
          <InlineMath math="r, s \in \{1, \dots, n-1\}" />.
        </li>
        <li>
          Compute{" "}
          <InlineMath math="z = \mathrm{HASH}(m)" />.
        </li>
        <li>
          Compute{" "}
          <InlineMath math="u_1 = z s^{-1} \bmod n" /> and{" "}
          <InlineMath math="u_2 = r s^{-1} \bmod n" />.
        </li>
        <li>
          Compute the curve point{" "}
          <InlineMath math="(x_1, y_1) = u_1 G + u_2 Q" />.
        </li>
        <li>
          Accept iff <InlineMath math="x_1 \equiv r \pmod n" />.
        </li>
      </ol>

      <p>
        Why it works (sketch):{" "}
        <InlineMath math="u_1 G + u_2 Q = u_1 G + u_2 d G = (u_1 + u_2 d) G" />.
        Substituting{" "}
        <InlineMath math="u_1 = z/s" /> and{" "}
        <InlineMath math="u_2 = r/s" /> (mod{" "}
        <InlineMath math="n" />), the scalar becomes{" "}
        <InlineMath math="(z + rd)/s = k" />. So{" "}
        <InlineMath math="(x_1, y_1) = kG" />, and{" "}
        <InlineMath math="x_1 \equiv r \pmod n" /> by definition.
      </p>

      <Pitfall>
        The nonce <InlineMath math="k" />{" "}
        <em>must</em> be unpredictable and unique per signature.
        Reusing <InlineMath math="k" /> across two signatures with
        the same key leaks the private key — two equations, two
        unknowns, recoverable in 5 lines of algebra. Sony
        infamously did this with the PlayStation 3, leaking the
        master signing key. RFC 6979 specifies a deterministic
        derivation of <InlineMath math="k" /> from the message and
        private key, eliminating the random-source dependency.
      </Pitfall>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Bitcoin's secp256k1</h2>

      <p>
        Bitcoin uses a specific curve called{" "}
        <strong>secp256k1</strong>:
      </p>
      <BlockMath math="y^2 = x^3 + 7 \pmod p," />
      <p>
        with{" "}
        <InlineMath math="p = 2^{256} - 2^{32} - 977" /> (a 256-bit
        prime chosen so the curve has efficient arithmetic). The
        order of the base point is also a 256-bit prime.
      </p>

      <p>
        Why this curve? Three reasons:
      </p>
      <ul>
        <li>
          Koblitz curves like secp256k1 (with{" "}
          <InlineMath math="a = 0" />) admit optimisations using
          the GLV endomorphism — a ~2× speedup for scalar
          multiplication.
        </li>
        <li>
          The parameters were chosen <em>publicly and openly</em>{" "}
          before Bitcoin's launch; no NSA fingerprints, unlike
          some other NIST curves whose parameters were generated
          via hidden seeds.
        </li>
        <li>
          The curve has provably no unusual algebraic structure
          beyond Koblitz — no known structural attacks.
        </li>
      </ul>

      <p>
        Bitcoin addresses are derived from public keys: hash the
        compressed public key (33 bytes) twice (SHA-256 then
        RIPEMD-160), then base58-encode with a version byte and
        checksum. The 65-byte uncompressed public key{" "}
        <InlineMath math="(x, y)" /> can be compressed to 33 bytes
        because <InlineMath math="y" /> is determined up to a
        sign by <InlineMath math="x" /> via the curve equation.
      </p>

      <p>
        Each transaction is signed with ECDSA over secp256k1. To
        spend bitcoins, you produce a signature with the private
        key matching the public key referenced in the previous
        transaction's output. Verifying nodes check the signature
        — same algorithm we just described.
      </p>

      <h3>Schnorr (Taproot)</h3>

      <p>
        Bitcoin's Taproot upgrade (2021) added{" "}
        <strong>Schnorr signatures</strong> as an alternative to
        ECDSA. Schnorr is structurally cleaner (linearity allows
        signature aggregation), with the same secp256k1 curve. The
        elliptic-curve discrete log problem is still the
        underlying hard problem. We'll see Schnorr properly in
        Tier XVI.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · The quantum threat (preview)</h2>

      <p>
        Shor's algorithm — which we'll see in detail in Tier XVI —
        solves the discrete log problem in <em>any</em> abelian
        group in polynomial time on a quantum computer. That
        includes RSA's multiplicative group{" "}
        <InlineMath math="(\mathbb{Z}/n)^\times" /> and ECC's
        elliptic-curve group{" "}
        <InlineMath math="E(\mathbb{F}_p)" />. So a sufficiently
        large fault-tolerant quantum computer breaks all currently
        deployed public-key cryptography.
      </p>

      <p>
        How much quantum compute? Estimates vary. Recent analyses
        suggest:
      </p>
      <ul>
        <li>
          <strong>Breaking 256-bit ECC</strong>: ~6000 logical
          qubits, ~10⁹ Toffoli gates. With error correction, this
          is millions of physical qubits.
        </li>
        <li>
          <strong>Breaking 2048-bit RSA</strong>: ~4000 logical
          qubits, ~10¹⁰ Toffoli gates.
        </li>
      </ul>
      <p>
        Both are far beyond current devices (best is ~1000
        physical qubits, error rates too high for fault tolerance).
        Estimates of the timeline range from "10 years optimistic"
        to "never" depending on the engineering assumptions.
        Cryptographic best practice: assume it happens, plan
        migration.
      </p>

      <h3>Post-quantum alternatives</h3>

      <p>
        NIST standardised three post-quantum schemes (2024):
      </p>
      <ul>
        <li>
          <strong>ML-KEM</strong> (formerly Kyber): lattice-based
          key encapsulation. Replaces ECDH for key exchange.
        </li>
        <li>
          <strong>ML-DSA</strong> (formerly Dilithium): lattice-
          based signatures. Replaces ECDSA / RSA-PSS.
        </li>
        <li>
          <strong>SLH-DSA</strong> (formerly SPHINCS+): hash-based
          signatures. Slower / larger but simplest security
          assumptions.
        </li>
      </ul>

      <p>
        These rely on different hard problems (lattice short-
        vector problems, hash function security) believed to
        resist both classical and quantum attacks. Migration to
        these is happening now in TLS, SSH, signed messaging,
        and is the topic of the closing chapter of Tier XVI.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>HTTPS / TLS.</strong> Modern TLS uses ECDH for
          ephemeral key exchange (Curve25519 or P-256) and ECDSA
          / RSA for certificate signatures. ECC dominates the
          ephemeral side; RSA still common for certificates.
        </li>
        <li>
          <strong>SSH.</strong> Modern OpenSSH defaults to Ed25519
          (a Schnorr-like signature on a different curve); ECDSA
          P-256 also widely supported.
        </li>
        <li>
          <strong>Bitcoin / Ethereum / cryptocurrency.</strong>{" "}
          Every transaction is an ECDSA (or Schnorr) signature
          over secp256k1. Wallet recovery seeds derive private
          keys deterministically, then the public-key /
          address pipeline is what we described.
        </li>
        <li>
          <strong>Apple Pay / Android Pay / contactless cards.</strong>{" "}
          ECC because keys fit on-chip in a few hundred bytes.
        </li>
        <li>
          <strong>Tor / Signal / WhatsApp.</strong> X25519
          (Curve25519) for key exchange, EdDSA for signatures.
          Same group structure, different curve choice optimised
          for software performance and side-channel resistance.
        </li>
      </ul>

      <p>
        That closes Tier VI. We've seen why primes, modular
        arithmetic, and elliptic curves are{" "}
        <em>the</em> ingredients of public-key cryptography, and
        the headline fact: all currently-deployed schemes are
        vulnerable to Shor's quantum algorithm. The path to
        Tier XVI now has a clear motivation. Next (Tier VII):
        probability and statistics — needed for understanding
        quantum measurement, and also the source of the
        randomness that makes cryptography work.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: EC group law over the reals
// ════════════════════════════════════════════════════════════

function ECCWidget() {
  const [a, setA] = useState(-3);
  const [b, setB] = useState(3);
  const [P, setP] = useState({ x: -1, y: 0 });
  const [Q, setQ] = useState({ x: 1.5, y: 0 });

  // Try to put points on the curve
  const onCurveY = (x: number) => {
    const y2 = x * x * x + a * x + b;
    return y2 >= 0 ? Math.sqrt(y2) : NaN;
  };

  const Px = P.x;
  const Py = onCurveY(Px) * (P.y >= 0 ? 1 : -1);
  const Qx = Q.x;
  const Qy = onCurveY(Qx) * (Q.y >= 0 ? 1 : -1);

  // Point sum
  let sumPoint: { x: number; y: number } | null = null;
  if (isFinite(Py) && isFinite(Qy)) {
    let lambda;
    if (Math.abs(Px - Qx) > 1e-6) {
      lambda = (Qy - Py) / (Qx - Px);
    } else if (Math.abs(Py + Qy) < 1e-6) {
      sumPoint = null; // identity
    } else {
      lambda = (3 * Px * Px + a) / (2 * Py);
    }
    if (lambda !== undefined) {
      const x3 = lambda * lambda - Px - Qx;
      const y3 = lambda * (Px - x3) - Py;
      sumPoint = { x: x3, y: -y3 };
    }
  }

  const w = 360;
  const h = 280;
  const cx = w / 2;
  const cy = h / 2;
  const scale = 35;
  const sx = (x: number) => cx + x * scale;
  const sy = (y: number) => cy - y * scale;

  // Build curve path
  const pts: string[] = [];
  let prev = false;
  for (let xs = -5; xs <= 5; xs += 0.02) {
    const y2 = xs * xs * xs + a * xs + b;
    if (y2 < 0) {
      prev = false;
      continue;
    }
    const y = Math.sqrt(y2);
    pts.push(`${prev ? "L" : "M"}${sx(xs).toFixed(1)},${sy(y).toFixed(1)}`);
    prev = true;
  }
  // bottom half
  prev = false;
  for (let xs = 5; xs >= -5; xs -= 0.02) {
    const y2 = xs * xs * xs + a * xs + b;
    if (y2 < 0) {
      prev = false;
      continue;
    }
    const y = -Math.sqrt(y2);
    pts.push(`${prev ? "L" : "M"}${sx(xs).toFixed(1)},${sy(y).toFixed(1)}`);
    prev = true;
  }

  const disc = -16 * (4 * a * a * a + 27 * b * b);
  const smooth = disc !== 0;

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <SlideRow label={`a = ${a.toFixed(2)}`} value={a} min={-4} max={4} step={0.05} onChange={setA} />
          <SlideRow label={`b = ${b.toFixed(2)}`} value={b} min={-4} max={4} step={0.05} onChange={setB} />
        </div>

        <div className="text-sm text-ink-300">
          <InlineMath math={`y^2 = x^3 ${a >= 0 ? "+" : "-"} ${Math.abs(a).toFixed(2)} x ${b >= 0 ? "+" : "-"} ${Math.abs(b).toFixed(2)}`} />
          {!smooth && <span className="text-rose-300 ml-2">(singular!)</span>}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
            <line x1={0} y1={cy} x2={w} y2={cy} stroke="#2a2a37" strokeOpacity={0.5} />
            <line x1={cx} y1={0} x2={cx} y2={h} stroke="#2a2a37" strokeOpacity={0.5} />

            <path d={pts.join(" ")} fill="none" stroke="#22d3ee" strokeWidth={1.8} />

            {/* Line through P and Q */}
            {isFinite(Py) && isFinite(Qy) && Math.abs(Px - Qx) > 1e-6 && (
              <line
                x1={sx(-5)}
                y1={sy(Py + ((Qy - Py) / (Qx - Px)) * (-5 - Px))}
                x2={sx(5)}
                y2={sy(Py + ((Qy - Py) / (Qx - Px)) * (5 - Px))}
                stroke="#a78bfa"
                strokeWidth={1.4}
                strokeDasharray="4 3"
                strokeOpacity={0.6}
              />
            )}

            {/* P */}
            {isFinite(Py) && (
              <>
                <circle cx={sx(Px)} cy={sy(Py)} r={5} fill="#fbbf24" />
                <text x={sx(Px) + 6} y={sy(Py) - 6} fill="#fbbf24" fontSize={11}>
                  P
                </text>
              </>
            )}

            {/* Q */}
            {isFinite(Qy) && (
              <>
                <circle cx={sx(Qx)} cy={sy(Qy)} r={5} fill="#22c55e" />
                <text x={sx(Qx) + 6} y={sy(Qy) - 6} fill="#22c55e" fontSize={11}>
                  Q
                </text>
              </>
            )}

            {/* P + Q */}
            {sumPoint && (
              <>
                <circle cx={sx(sumPoint.x)} cy={sy(sumPoint.y)} r={6} fill="#f472b6" stroke="#fff" strokeWidth={1} />
                <text x={sx(sumPoint.x) + 6} y={sy(sumPoint.y) + 14} fill="#f472b6" fontSize={11}>
                  P + Q
                </text>
                {/* Vertical line showing reflection */}
                {(() => {
                  const refl = { x: sumPoint.x, y: -sumPoint.y };
                  return (
                    <line
                      x1={sx(refl.x)}
                      y1={sy(refl.y)}
                      x2={sx(sumPoint.x)}
                      y2={sy(sumPoint.y)}
                      stroke="#f472b6"
                      strokeWidth={1}
                      strokeDasharray="2 3"
                      strokeOpacity={0.5}
                    />
                  );
                })()}
              </>
            )}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SlideRow label={`P.x = ${Px.toFixed(2)}`} value={Px} min={-3} max={3} step={0.05} onChange={(v) => setP({ x: v, y: P.y })} />
          <SlideRow label={`Q.x = ${Qx.toFixed(2)}`} value={Qx} min={-3} max={3} step={0.05} onChange={(v) => setQ({ x: v, y: Q.y })} />
        </div>

        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setP({ x: P.x, y: P.y > 0 ? -1 : 1 })}
            className="px-3 py-1.5 rounded-lg border border-ink-800 hover:border-accent-soft text-ink-300"
          >
            Flip P sign
          </button>
          <button
            onClick={() => setQ({ x: Q.x, y: Q.y > 0 ? -1 : 1 })}
            className="px-3 py-1.5 rounded-lg border border-ink-800 hover:border-accent-soft text-ink-300"
          >
            Flip Q sign
          </button>
        </div>
      </div>
      <figcaption>
        Cyan: the elliptic curve. Yellow / green:{" "}
        <InlineMath math="P" /> and <InlineMath math="Q" />. Purple
        line: chord through them. Pink:{" "}
        <InlineMath math="P + Q" />, the third intersection of the
        chord with the curve, reflected across the{" "}
        <InlineMath math="x" />-axis.
      </figcaption>
    </figure>
  );
}

function SlideRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="text-xs text-ink-400 mb-1">{label}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent-soft"
      />
    </label>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "An elliptic curve in Weierstrass form is defined by which equation?",
    options: [
      "$x^2 + y^2 = 1$",
      "$y^2 = x^3 + ax + b$ (with $4a^3 + 27b^2 \\neq 0$)",
      "$y = ax^2 + bx + c$",
      "$xy = a$",
    ],
    correct: 1,
    explanation:
      "Weierstrass form $y^2 = x^3 + ax + b$, with the discriminant condition ensuring the curve is smooth (no singular points).",
  },
  {
    prompt:
      "On an elliptic curve, the geometric definition of $P + Q$ is…",
    options: [
      "the midpoint of $P$ and $Q$",
      "the third intersection of the line through $P$ and $Q$ with the curve, reflected across the x-axis",
      "the cross product of $P$ and $Q$",
      "the closest curve point to $P + Q$ in the plane",
    ],
    correct: 1,
    explanation:
      "Chord through $P$ and $Q$, find the third intersection $R$ with the cubic, reflect across the x-axis to get $P + Q$. (With tangent-at-$P$ when $P = Q$.)",
  },
  {
    prompt:
      "The hard problem underlying ECDSA is…",
    options: [
      "factoring a 256-bit composite",
      "the discrete logarithm in the group $E(\\mathbb{F}_p)$",
      "computing the discriminant of the curve",
      "finding the curve's points",
    ],
    correct: 1,
    explanation:
      "ECDLP: given $P, Q$ with $Q = kP$, find $k$. Best classical algorithm runs in time $O(\\sqrt n)$ where $n$ is the group order — much harder than the equivalent factoring problem at the same key size.",
  },
  {
    prompt:
      "Why do 256-bit ECC keys give security comparable to 3072-bit RSA?",
    options: [
      "ECC arithmetic is faster",
      "RSA padding wastes bits",
      "The best classical attack on ECDLP is $O(\\sqrt n)$ exponential, while factoring has subexponential index-calculus algorithms",
      "256 is more than enough for any cryptography",
    ],
    correct: 2,
    explanation:
      "Index calculus speeds up factoring to subexponential time, so RSA needs much larger keys to compensate. ECC's discrete log is fully exponential, so smaller groups suffice.",
  },
  {
    prompt:
      "What is the worst thing you can do with the ECDSA nonce $k$?",
    options: [
      "Use a per-signature deterministic derivation",
      "Reuse it across two different signatures with the same key",
      "Choose it from a uniformly random source",
      "Use 256 bits of entropy for $k$",
    ],
    correct: 1,
    explanation:
      "Reusing $k$ across two signatures yields two equations in $(d, k)$ — solvable, leaks the private key. (This is exactly what broke the PS3 master signing key.) Best practice is RFC 6979 deterministic $k$.",
  },
];
