import { InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function PqcBody() {
  return (
    <>
      <p>
        Post-quantum cryptography (PQC) is the search for
        cryptographic schemes that resist quantum attacks.
        Shor's algorithm breaks RSA, ECDSA, and Diffie-Hellman.
        Grover's algorithm halves symmetric-key effective
        security. The internet's entire public-key
        infrastructure must be replaced with quantum-resistant
        alternatives — and the migration is happening now.
        This chapter surveys the landscape, the NIST
        standardisation, and the implications for Bitcoin and
        other blockchains.
      </p>
      <p>
        We close the loop on the syllabus's stated goal: from
        elementary maths to "what breaks under Shor and what
        doesn't, and what's coming next." This is the final
        chapter.
      </p>

      <ReferenceResources
        items={[
          {
            title: "NIST PQC standardisation",
            author: "NIST",
            duration: "Reference",
            url: "https://csrc.nist.gov/projects/post-quantum-cryptography",
            note: "Official standards: FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), FIPS 205 (SLH-DSA). Finalised 2024.",
          },
          {
            title: "Bernstein, Lange — Post-quantum cryptography",
            author: "Bernstein / Lange (eds.)",
            duration: "Reading",
            url: "https://link.springer.com/book/10.1007/978-3-540-88702-7",
            note: "Comprehensive survey of PQC families (lattice, hash, code, multivariate, isogeny).",
          },
          {
            title: "Mosca's theorem",
            author: "Michele Mosca",
            duration: "Reading",
            url: "https://eprint.iacr.org/2015/1075",
            note: "Quantitative urgency framework: when must PQC migration be done?",
          },
          {
            title: "BIP-360 (Quantum-resistant Bitcoin)",
            author: "Bitcoin developers",
            duration: "Reading",
            url: "https://github.com/bitcoin/bips",
            note: "Proposal for quantum-resistant signatures in Bitcoin. Likely the future of BTC signing.",
          },
          {
            title: "Quanta Magazine — How Lattices Hold Up Against Quantum Computers",
            author: "Quanta Magazine",
            duration: "Reading",
            url: "https://www.quantamagazine.org/topic/cryptography/",
            note: "Accessible overview of PQC and lattice cryptography. Worth reading once.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The post-quantum landscape</h2>

      <p>
        Five families of PQC, each based on a different
        believed-hard problem:
      </p>

      <ul>
        <li>
          <strong>Lattice-based</strong>: based on{" "}
          <em>shortest vector problem</em> (SVP) and{" "}
          <em>learning with errors</em> (LWE) in high-
          dimensional integer lattices. Best understood,
          fastest, smallest keys among PQC. NIST's main
          choice.
        </li>
        <li>
          <strong>Hash-based</strong>: signatures from one-way
          hash functions only (Merkle trees). Very simple
          security assumption (just need a secure hash
          function). Slow signing and large signatures.
        </li>
        <li>
          <strong>Code-based</strong>: based on hardness of
          decoding random linear codes. McEliece (1978) —
          oldest PQC scheme. Large public keys (~MB).
        </li>
        <li>
          <strong>Multivariate</strong>: based on hardness of
          solving multivariate polynomial systems over finite
          fields. Some schemes broken; remaining candidates
          have very large keys.
        </li>
        <li>
          <strong>Isogeny-based</strong>: based on hardness of
          finding maps between elliptic curves. Small keys but
          slow; recent attacks (SIDH 2022) broke a leading
          candidate. Active research.
        </li>
      </ul>

      <p>
        NIST has standardised lattice-based and hash-based
        schemes. Code-based is a backup. Isogeny-based is on
        the back foot post-2022.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · NIST standards (2024)</h2>

      <p>
        NIST finalised its first PQC standards in August 2024
        after a 7-year competition:
      </p>

      <h3>ML-KEM (formerly Kyber, FIPS 203)</h3>

      <p>
        Key encapsulation mechanism — replaces RSA / ECDH for
        establishing shared keys. Lattice-based, specifically
        <em>module learning with errors</em> over polynomial
        rings.
      </p>

      <p>
        Properties:
      </p>
      <ul>
        <li>
          Public key size: ~800 B (ML-KEM-512), ~1.2 KB
          (ML-KEM-768), ~1.6 KB (ML-KEM-1024). Compare RSA-
          2048: ~256 B; ECDH-256: ~32 B. Larger but
          manageable.
        </li>
        <li>
          Encapsulation/decapsulation in microseconds. Comparable
          to or faster than RSA.
        </li>
        <li>
          Security: based on assumption that LWE / module-LWE
          is hard. Widely believed quantum-resistant.
        </li>
      </ul>

      <h3>ML-DSA (formerly Dilithium, FIPS 204)</h3>

      <p>
        Digital signature algorithm — replaces RSA / ECDSA.
        Also lattice-based, also from module-LWE.
      </p>

      <p>
        Properties:
      </p>
      <ul>
        <li>
          Public key size: ~1.3 KB (ML-DSA-44), ~2 KB (ML-
          DSA-65), ~2.6 KB (ML-DSA-87).
        </li>
        <li>
          Signature size: ~2.4–4.6 KB (vs ECDSA 64 B). Big
          difference; matters for blockchain bandwidth.
        </li>
        <li>
          Sign/verify in microseconds.
        </li>
      </ul>

      <h3>SLH-DSA (formerly SPHINCS+, FIPS 205)</h3>

      <p>
        Hash-based signatures — fallback option with the
        simplest security assumption (just need a secure hash
        function).
      </p>

      <p>
        Properties:
      </p>
      <ul>
        <li>
          Tiny public key: 32 B. Same as Ed25519.
        </li>
        <li>
          Large signatures: 8–50 KB. Major drawback.
        </li>
        <li>
          Slower signing (~ms).
        </li>
        <li>
          Stateless: don't need to remember previous
          signatures (older hash schemes did, which is
          dangerous).
        </li>
      </ul>

      <p>
        SLH-DSA is for high-security, low-frequency
        applications: code signing, root-of-trust certs.
        Not for transaction signing at high throughput.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Lattice cryptography in detail</h2>

      <p>
        The hard problems of lattice cryptography:
      </p>

      <Callout title="Shortest Vector Problem (SVP)">
        Given a lattice{" "}
        <InlineMath math="L \subset \mathbb{R}^n" />, find the
        shortest non-zero vector in{" "}
        <InlineMath math="L" />. NP-hard in the worst case.
      </Callout>

      <Callout title="Learning with Errors (LWE)">
        Given pairs{" "}
        <InlineMath math="(\mathbf{a}_i, \mathbf{a}_i \cdot \mathbf{s} + e_i \bmod q)" /> for
        random{" "}
        <InlineMath math="\mathbf{a}_i \in (\mathbb{Z}/q)^n" />,
        unknown secret{" "}
        <InlineMath math="\mathbf{s}" />, and small noise{" "}
        <InlineMath math="e_i" />, recover{" "}
        <InlineMath math="\mathbf{s}" />. Average-case
        hardness reduces to worst-case lattice problems
        (Regev's reduction).
      </Callout>

      <p>
        LWE is the workhorse. Without noise, recovering{" "}
        <InlineMath math="\mathbf s" /> is just linear algebra.
        With noise, it becomes (apparently) exponentially hard.
        Quantum algorithms haven't yielded an efficient solver.
      </p>

      <h3>Why no Shor for LWE?</h3>

      <p>
        Shor exploits the periodic structure of finite abelian
        groups via the QFT. LWE doesn't have such structure.
        The corresponding lattice problems are non-abelian
        hidden subgroup problems, which are mostly open.
      </p>

      <p>
        Best known quantum algorithms for LWE give only
        polynomial speedups (improvement of constants in the
        complexity exponent). At reasonable parameter sizes,
        LWE is believed to require exponential time on any
        quantum computer.
      </p>

      <Pitfall>
        "Believed quantum-resistant" ≠ "proven quantum-
        resistant." Cryptographic schemes have been broken
        unexpectedly before — including SIDH (2022) by classical
        attack, after a decade of analysis. Lattice-based PQC
        is the best bet but isn't proven.
      </Pitfall>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Bitcoin and post-quantum</h2>

      <p>
        Bitcoin uses ECDSA over secp256k1 (Tier VI). All of
        these become quantum-vulnerable when sufficient quantum
        computing arrives.
      </p>

      <h3>What's at risk</h3>

      <p>
        Two scenarios:
      </p>

      <ul>
        <li>
          <strong>Spent UTXOs with revealed public keys</strong>:
          most pre-Taproot Bitcoin (P2PK, P2PKH, but reveals
          public key after first spend). An adversary with
          Shor could derive the private key from the public key
          and spend the funds. ~25% of all Bitcoin (around 4M
          BTC, including Satoshi's coins) is in such addresses.
        </li>
        <li>
          <strong>Live transactions in the mempool</strong>:
          a transaction broadcast but not yet mined reveals its
          public key for ~10 minutes. A fast quantum attacker
          could front-run by computing private keys from
          public keys and spending the funds first.
        </li>
      </ul>

      <h3>BIP-360</h3>

      <p>
        BIP-360 (Quantum-Resistant Address Migration Protocol)
        proposes adding ML-DSA or SLH-DSA signatures to
        Bitcoin via a soft fork. New addresses use
        quantum-resistant signatures; old addresses can be
        migrated by the holder before the quantum threat
        arrives.
      </p>

      <p>
        The challenge:
      </p>
      <ul>
        <li>
          Larger signatures (2.4–10 KB for ML-DSA / SLH-DSA vs
          64 B for ECDSA) — significant blockchain bloat.
        </li>
        <li>
          Coordination: every Bitcoin user must voluntarily
          migrate before quantum attacks become feasible.
          Lost-key holders can't migrate. Satoshi's coins are
          probably permanently quantum-vulnerable.
        </li>
        <li>
          Timing: too early and we adopt unproven schemes; too
          late and adversaries front-run.
        </li>
      </ul>

      <p>
        Mosca's theorem: migration must complete before{" "}
        <InlineMath math="t_{\mathrm{secrets-required}} + t_{\mathrm{migration}} > t_{\mathrm{quantum-arrives}}" />.
        For data needing 30-year confidentiality and 10-year
        migration, even moderate optimism about quantum arrival
        means we should be migrating now.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · The migration in practice</h2>

      <p>
        PQC adoption is accelerating:
      </p>

      <ul>
        <li>
          <strong>TLS / HTTPS</strong>: Cloudflare, Google,
          Apple have deployed hybrid post-quantum key exchange
          (ML-KEM + classical X25519) for some services.
          Browsers (Chrome, Firefox) negotiate it when both
          sides support.
        </li>
        <li>
          <strong>SSH</strong>: OpenSSH 9.0+ supports hybrid
          post-quantum key exchange.
        </li>
        <li>
          <strong>Signal</strong>: PQXDH protocol added in
          2023 — every Signal message now uses ML-KEM for
          forward secrecy.
        </li>
        <li>
          <strong>Apple iMessage</strong>: PQ3 protocol (2024)
          adds post-quantum to iMessage E2EE.
        </li>
        <li>
          <strong>NIST timeline</strong>: deprecation of
          classical cryptography from 2030 onward; complete
          removal by 2035.
        </li>
        <li>
          <strong>Hardware</strong>: TPMs and HSMs are starting
          to support PQC. Smart cards and embedded devices are
          slower (constrained memory makes lattice signatures
          challenging).
        </li>
      </ul>

      <h3>Hybrid schemes</h3>

      <p>
        Most current deployments are <em>hybrid</em>: combine
        classical and post-quantum, derive shared key from
        both. Secure if either is hard. This hedges against
        both:
      </p>
      <ul>
        <li>
          Quantum break of classical (Shor).
        </li>
        <li>
          Classical break of PQC (analytic attack against
          lattices, etc.).
        </li>
      </ul>

      <p>
        Hybrid is the default until PQC is fully mature.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · The road ahead</h2>

      <p>
        Quantum computing is at an inflection point:
      </p>

      <ul>
        <li>
          <strong>Hardware:</strong> ~1,000-qubit devices
          today, growing exponentially. Below QEC threshold
          demonstrated 2024. Engineering challenges enormous
          but tractable.
        </li>
        <li>
          <strong>Algorithms:</strong> Shor, Grover, QFT, HHL,
          quantum simulation are well-understood. Active
          search for more applications.
        </li>
        <li>
          <strong>Cryptography:</strong> NIST standards
          finalised. Adoption underway. 10-year migration
          window. Some risk of "harvest now, decrypt later"
          attacks against today's encrypted data.
        </li>
        <li>
          <strong>Open questions:</strong> Will isogeny-based
          (or other) schemes survive future cryptanalysis? Can
          quantum advantage be demonstrated for problems with
          economic value beyond breaking crypto? When, exactly,
          will fault-tolerant Shor become possible?
        </li>
      </ul>

      <p>
        Personal practical advice: don't panic, but pay
        attention. If you're building anything with long
        confidentiality requirements (more than 10 years), include
        post-quantum cryptography in your design now. For
        normal everyday secure communications, the
        infrastructure is migrating in the background and
        you'll get PQC by default within the next few years.
      </p>

      <p>
        And if you're just learning quantum mechanics — well,
        you've come a long way. From Tier I (logic, sets) to
        Tier XVI (Shor's algorithm and post-quantum
        cryptography), this syllabus has covered the
        mathematical and physical foundations of the modern
        information age. Quantum computing represents the
        deepest application of quantum mechanics to
        computation, and the most consequential technological
        development of the 21st century.
      </p>

      <p>
        Thanks for sticking with it.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>The internet's security depends on it.</strong>{" "}
          PKI, TLS, code signing, secure messaging, software
          updates — all use public-key cryptography. PQC
          migration is the largest crypto transition in
          history.
        </li>
        <li>
          <strong>Cryptocurrency at stake.</strong> Bitcoin's
          ECDSA signatures are quantum-vulnerable. Migration to
          quantum-resistant signatures is necessary and
          ongoing.
        </li>
        <li>
          <strong>Long-term confidentiality.</strong> "Harvest
          now, decrypt later" attacks mean that data with
          long-term sensitivity must be re-encrypted with PQC
          today — not when quantum computers arrive.
        </li>
        <li>
          <strong>Mathematics of cryptography.</strong> PQC
          opens new connections between lattices, codes,
          hashes, and isogenies. Cryptographic research has
          shifted decisively to PQC since 2017.
        </li>
        <li>
          <strong>End of the journey.</strong> This is the
          last chapter. The syllabus has connected logic,
          sets, calculus, linear algebra, number theory,
          probability, complex analysis, abstract algebra,
          quantum mechanics, and quantum computing into a
          single coherent path. Every prior tier feeds into
          this one. The journey from{" "}
          <InlineMath math="2 + 2 = 4" /> to "quantum computing
          breaks ECDSA" is complete.
        </li>
      </ul>

      <p>
        Sixteen tiers. Hundreds of pages. A lifetime of
        learning, hopefully launched. Good luck.
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
      "Which family is **not** a major branch of post-quantum cryptography?",
    options: [
      "lattice-based",
      "hash-based",
      "RSA-based with larger keys",
      "code-based",
    ],
    correct: 2,
    explanation:
      "RSA at any key size is broken by Shor in polynomial time. The five PQC families are lattice, hash, code, multivariate, and isogeny based — each based on a problem believed quantum-resistant.",
  },
  {
    prompt:
      "ML-KEM (formerly Kyber) is based on…",
    options: [
      "RSA hardness",
      "elliptic-curve discrete log",
      "hardness of LWE / module-LWE in lattices",
      "factoring",
    ],
    correct: 2,
    explanation:
      "ML-KEM is lattice-based, specifically using module-LWE. NIST's FIPS 203 standard (2024). Replaces RSA / ECDH for key encapsulation.",
  },
  {
    prompt:
      "Why isn't there a Shor-style algorithm for LWE / lattice problems?",
    options: [
      "they're too easy",
      "Shor exploits abelian-group structure (period finding via QFT). LWE corresponds to non-abelian HSP, which is mostly open.",
      "lattices are not relevant",
      "no one has tried",
    ],
    correct: 1,
    explanation:
      "Shor relies on the QFT exploiting cyclic / abelian structure. Lattice problems are non-abelian HSP — mostly open. Best known quantum speedups for LWE are only polynomial.",
  },
  {
    prompt:
      "By Mosca's theorem, when must PQC migration complete?",
    options: [
      "by 2030",
      "before $t_{\\mathrm{secrets-required}} + t_{\\mathrm{migration}} > t_{\\mathrm{quantum-arrives}}$",
      "after Shor's algorithm runs",
      "never",
    ],
    correct: 1,
    explanation:
      "If data must remain secret for X years and migration takes Y years, you must finish migrating Y + X years before quantum computers arrive. For long-confidentiality data, this means now.",
  },
  {
    prompt:
      "Bitcoin's quantum vulnerability comes mainly from…",
    options: [
      "AES encryption of wallets",
      "SHA-256 hashing for proof-of-work",
      "ECDSA signatures over secp256k1, vulnerable to Shor",
      "the consensus algorithm",
    ],
    correct: 2,
    explanation:
      "ECDSA over secp256k1 is the quantum-vulnerable element. SHA-256 is only square-root weakened by Grover (manageable). Mining is unaffected. BIP-360 proposes ML-DSA / SLH-DSA migration.",
  },
];
