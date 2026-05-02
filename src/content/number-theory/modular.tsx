import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function ModularBody() {
  return (
    <>
      <p>
        Modular arithmetic is the math of clocks. Twelve hours after
        10 AM is 10 PM — i.e. <InlineMath math="10" />. Three hours
        after 11 PM is 2 AM — i.e. <InlineMath math="2" />. We're
        not just adding; we're adding{" "}
        <em>modulo 12</em>. Once you decide that two numbers are
        "the same" if they differ by a multiple of some fixed{" "}
        <InlineMath math="n" />, all of arithmetic — addition,
        subtraction, multiplication, even exponentiation — collapses
        onto a finite cycle. The structure that emerges is
        beautiful, ancient (Gauss, 1801), and the algebraic engine
        of every public-key cryptosystem in use today.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.781 — Lecture notes on congruences",
            author: "Prof. Andrew Sutherland (MIT OCW)",
            duration: "Reading",
            url: "https://ocw.mit.edu/courses/18-781-theory-of-numbers-spring-2012/",
            note: "Sutherland's notes are a clean reference for everything in this chapter.",
          },
          {
            title: "Khan Academy — Modular arithmetic",
            author: "Khan Academy",
            duration: "~2h",
            url: "https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic",
            note: "Beginner-friendly walkthrough leading up to RSA.",
          },
          {
            title: "Numberphile — Fermat's little theorem",
            author: "Numberphile (with James Grime)",
            duration: "12 min",
            url: "https://www.youtube.com/watch?v=7XF8g_8YyaM",
            note: "Why $a^p \\equiv a \\pmod p$ for any prime $p$, with worked examples.",
          },
          {
            title: "3Blue1Brown — Why are primes important in cryptography?",
            author: "3Blue1Brown / various",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=primes+cryptography+intuition",
            note: "Several short videos motivating the practical use of modular arithmetic.",
          },
          {
            title: "Niven, Zuckerman, Montgomery — chs. 2–3",
            author: "Niven et al.",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Niven_(textbook)",
            note: "Standard textbook treatment with full proofs and many exercises.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Congruences</h2>

      <p>
        For a fixed positive integer <InlineMath math="n" /> (the{" "}
        <strong>modulus</strong>), we say <InlineMath math="a" /> is{" "}
        <em>congruent to</em> <InlineMath math="b" /> modulo{" "}
        <InlineMath math="n" />, and write
      </p>
      <BlockMath math="a \equiv b \pmod{n}," />
      <p>
        if <InlineMath math="n \mid (a - b)" />. Equivalently,{" "}
        <InlineMath math="a" /> and <InlineMath math="b" /> have the
        same remainder when divided by <InlineMath math="n" />.
      </p>

      <p>
        Examples:
      </p>
      <ul>
        <li>
          <InlineMath math="17 \equiv 5 \pmod{12}" /> — 17 is the
          same hour as 5 on a 12-hour clock.
        </li>
        <li>
          <InlineMath math="-3 \equiv 4 \pmod 7" /> — three hours
          ago on a 7-day week is the same as 4 days from now.
        </li>
        <li>
          <InlineMath math="100 \equiv 0 \pmod{10}" /> — multiples
          of 10 are 0 mod 10.
        </li>
      </ul>

      <p>
        Congruence mod <InlineMath math="n" /> is an{" "}
        <em>equivalence relation</em> on{" "}
        <InlineMath math="\mathbb{Z}" /> (Foundations Part 8): it's
        reflexive, symmetric, and transitive. The equivalence
        classes are called <strong>residue classes</strong>;
        there are <InlineMath math="n" /> of them, usually
        represented by{" "}
        <InlineMath math="0, 1, 2, \dots, n - 1" />. The set of
        classes is denoted{" "}
        <InlineMath math="\mathbb{Z}/n\mathbb{Z}" /> (or{" "}
        <InlineMath math="\mathbb{Z}_n" />, depending on the
        author).
      </p>

      <h3>Arithmetic respects congruence</h3>

      <p>
        If <InlineMath math="a \equiv a' \pmod n" /> and{" "}
        <InlineMath math="b \equiv b' \pmod n" />, then
      </p>
      <BlockMath math="a + b \equiv a' + b' \pmod n, \quad ab \equiv a'b' \pmod n, \quad a^k \equiv a'^k \pmod n." />
      <p>
        That is, addition, multiplication, and powers all{" "}
        <em>descend</em> to{" "}
        <InlineMath math="\mathbb{Z}/n\mathbb{Z}" />. So we can do
        arithmetic with residue classes by picking any
        representative and computing — the result is consistent.
      </p>

      <Pitfall>
        <strong>Division does not always work.</strong> In ordinary
        arithmetic{" "}
        <InlineMath math="ab = ac" /> with <InlineMath math="a \neq 0" />{" "}
        implies <InlineMath math="b = c" />. In{" "}
        <InlineMath math="\mathbb{Z}/n\mathbb{Z}" /> this fails:{" "}
        <InlineMath math="2 \cdot 3 = 6 \equiv 0 \pmod 6" /> and{" "}
        <InlineMath math="2 \cdot 0 = 0 \pmod 6" />, but{" "}
        <InlineMath math="3 \neq 0" />. Cancellation requires the
        modulus to be coprime to the cancelled factor.
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Modular inverses</h2>

      <p>
        An <strong>inverse</strong> of <InlineMath math="a" /> mod{" "}
        <InlineMath math="n" /> is an integer{" "}
        <InlineMath math="x" /> with{" "}
        <InlineMath math="ax \equiv 1 \pmod n" />. We write{" "}
        <InlineMath math="a^{-1}" /> for this inverse when it
        exists.
      </p>

      <Callout title="Invertibility">
        <InlineMath math="a" /> has an inverse mod{" "}
        <InlineMath math="n" /> if and only if{" "}
        <InlineMath math="\gcd(a, n) = 1" />.
      </Callout>

      <p>
        Why: if <InlineMath math="ax \equiv 1 \pmod n" />, then{" "}
        <InlineMath math="ax + ny = 1" /> for some integer{" "}
        <InlineMath math="y" /> — that's Bezout's identity, which
        is solvable iff <InlineMath math="\gcd(a, n) = 1" />. The
        extended Euclidean algorithm <em>finds</em> the inverse
        when it exists.
      </p>

      <h3>Worked example</h3>

      <p>
        Find the inverse of 7 mod 26 (size of the alphabet — used
        in classical Caesar/affine ciphers).
      </p>
      <p>
        Run extended Euclidean:{" "}
        <InlineMath math="26 = 3 \cdot 7 + 5" />,{" "}
        <InlineMath math="7 = 1 \cdot 5 + 2" />,{" "}
        <InlineMath math="5 = 2 \cdot 2 + 1" />,{" "}
        <InlineMath math="2 = 2 \cdot 1 + 0" />. So{" "}
        <InlineMath math="\gcd = 1" /> ✓ inverse exists. Back-
        substitute:
      </p>
      <BlockMath math="1 = 5 - 2 \cdot 2 = 5 - 2(7 - 5) = 3 \cdot 5 - 2 \cdot 7 = 3(26 - 3 \cdot 7) - 2 \cdot 7 = 3 \cdot 26 - 11 \cdot 7." />
      <p>
        So <InlineMath math="-11 \cdot 7 \equiv 1 \pmod{26}" />,
        i.e. <InlineMath math="7^{-1} \equiv -11 \equiv 15 \pmod{26}" />.
        Check: <InlineMath math="7 \cdot 15 = 105 = 4 \cdot 26 + 1" /> ✓.
      </p>

      <p>
        With inverses available, we can <em>solve</em> linear
        congruences: <InlineMath math="ax \equiv b \pmod n" /> has
        solution <InlineMath math="x \equiv a^{-1} b \pmod n" />{" "}
        when <InlineMath math="\gcd(a, n) = 1" />. When{" "}
        <InlineMath math="\gcd > 1" />, the situation is more
        delicate (no solution unless{" "}
        <InlineMath math="\gcd \mid b" />, in which case there are
        multiple).
      </p>

      <h3>Modular exponentiation</h3>

      <p>
        Cryptography needs <InlineMath math="a^k \pmod n" /> for
        astronomical <InlineMath math="k" /> (e.g.{" "}
        <InlineMath math="10^{300}" />). The trick: don't compute{" "}
        <InlineMath math="a^k" /> in <InlineMath math="\mathbb{Z}" />{" "}
        first. Use <strong>repeated squaring</strong>:
      </p>
      <ul>
        <li>
          Compute{" "}
          <InlineMath math="a^2, a^4, a^8, \dots, a^{2^m} \pmod n" />,
          each from the previous one.
        </li>
        <li>
          Write <InlineMath math="k" /> in binary; multiply
          together the powers corresponding to set bits.
        </li>
      </ul>

      <p>
        Each step keeps numbers below <InlineMath math="n^2" />.
        The total cost is{" "}
        <InlineMath math="O(\log k)" /> multiplications, each
        modulo <InlineMath math="n" />. That's why{" "}
        <InlineMath math="2^{300}" /> mod <InlineMath math="n" />{" "}
        with <InlineMath math="n" /> 2048 bits is a millisecond, not
        an eternity.
      </p>

      <ModExpWidget />

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Fermat's little theorem</h2>

      <Callout title="Fermat's little theorem (1640)">
        Let <InlineMath math="p" /> be prime and{" "}
        <InlineMath math="a" /> any integer not divisible by{" "}
        <InlineMath math="p" />. Then
        <BlockMath math="a^{p - 1} \equiv 1 \pmod p." />
        Equivalently, for any{" "}
        <InlineMath math="a \in \mathbb{Z}" />,
        <BlockMath math="a^p \equiv a \pmod p." />
      </Callout>

      <p>
        Quick test: <InlineMath math="3^{10} = 59049" />. Mod 11:{" "}
        <InlineMath math="59049 / 11 = 5368.09\dots" />,{" "}
        <InlineMath math="11 \cdot 5368 = 59048" />, so{" "}
        <InlineMath math="59049 \equiv 1 \pmod{11}" /> ✓.
      </p>

      <h3>Proof (combinatorial)</h3>

      <p>
        For <InlineMath math="a" /> not divisible by{" "}
        <InlineMath math="p" />, consider the residues
      </p>
      <BlockMath math="a, 2a, 3a, \dots, (p-1)a \pmod p." />

      <p>
        These are <InlineMath math="p - 1" /> values mod{" "}
        <InlineMath math="p" />, none zero. They are also{" "}
        <em>all distinct</em>: if{" "}
        <InlineMath math="ia \equiv ja \pmod p" /> with{" "}
        <InlineMath math="i \neq j" />, multiplying by{" "}
        <InlineMath math="a^{-1}" /> would give{" "}
        <InlineMath math="i \equiv j \pmod p" />, contradiction. So
        these values are a permutation of{" "}
        <InlineMath math="1, 2, \dots, p - 1" />.
      </p>

      <p>
        Multiply them together:
      </p>
      <BlockMath math="a \cdot 2a \cdot 3a \cdots (p-1)a \equiv 1 \cdot 2 \cdot 3 \cdots (p-1) \pmod p." />
      <p>
        That is,{" "}
        <InlineMath math="a^{p-1} (p-1)! \equiv (p-1)! \pmod p" />.
        Since <InlineMath math="\gcd((p-1)!, p) = 1" /> (a prime{" "}
        <InlineMath math="p" /> shares no factor with smaller
        positives), we can cancel:
      </p>
      <BlockMath math="a^{p-1} \equiv 1 \pmod p. \quad \blacksquare" />

      <Exercise
        number="3.1"
        prompt={
          <>
            Compute <InlineMath math="3^{200} \pmod{13}" />.
          </>
        }
      >
        <p>
          By FLT, <InlineMath math="3^{12} \equiv 1 \pmod{13}" />.
          So <InlineMath math="3^{200} = 3^{12 \cdot 16 + 8} = (3^{12})^{16} \cdot 3^8 \equiv 1 \cdot 3^8 \pmod{13}" />.
          Now <InlineMath math="3^8 = 6561" />,{" "}
          <InlineMath math="6561 / 13 = 504.69\dots" />,{" "}
          <InlineMath math="13 \cdot 504 = 6552" />,{" "}
          <InlineMath math="6561 - 6552 = 9" />. So{" "}
          <InlineMath math="3^{200} \equiv 9 \pmod{13}" />.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Euler's totient and Euler's theorem</h2>

      <p>
        Euler's totient function{" "}
        <InlineMath math="\varphi(n)" /> counts integers in{" "}
        <InlineMath math="\{1, 2, \dots, n - 1\}" /> that are
        coprime to <InlineMath math="n" />. Equivalently, it's the
        number of <em>units</em> (invertible elements) in{" "}
        <InlineMath math="\mathbb{Z}/n\mathbb{Z}" />.
      </p>

      <p>Useful formulas:</p>
      <ul>
        <li>
          <strong>Prime:</strong>{" "}
          <InlineMath math="\varphi(p) = p - 1" />. All of{" "}
          <InlineMath math="1, \dots, p-1" /> are coprime to{" "}
          <InlineMath math="p" />.
        </li>
        <li>
          <strong>Prime power:</strong>{" "}
          <InlineMath math="\varphi(p^k) = p^k - p^{k-1} = p^{k-1}(p - 1)" />.
        </li>
        <li>
          <strong>Multiplicative:</strong> if{" "}
          <InlineMath math="\gcd(m, n) = 1" />, then{" "}
          <InlineMath math="\varphi(mn) = \varphi(m) \varphi(n)" />.
        </li>
      </ul>

      <p>
        Combining: for{" "}
        <InlineMath math="n = p_1^{e_1} \cdots p_k^{e_k}" />,
      </p>
      <BlockMath math="\varphi(n) = n \prod_{i = 1}^{k} \left(1 - \frac{1}{p_i}\right)." />
      <p>
        For example,{" "}
        <InlineMath math="\varphi(12) = 12 \cdot (1 - 1/2)(1 - 1/3) = 12 \cdot \tfrac{1}{2} \cdot \tfrac{2}{3} = 4" />.
        The four units mod 12 are{" "}
        <InlineMath math="\{1, 5, 7, 11\}" />.
      </p>

      <Callout title="Euler's theorem">
        For any <InlineMath math="a" /> coprime to{" "}
        <InlineMath math="n" />,
        <BlockMath math="a^{\varphi(n)} \equiv 1 \pmod n." />
      </Callout>

      <p>
        FLT is the special case <InlineMath math="n = p" /> prime,{" "}
        <InlineMath math="\varphi(p) = p - 1" />. Euler's theorem is
        the workhorse identity behind RSA decryption (next chapter).
        The proof generalises FLT's: the elements{" "}
        <InlineMath math="\{a x : x \in (\mathbb{Z}/n)^{\times}\}" />{" "}
        are a permutation of the units, so multiplying them gives{" "}
        <InlineMath math="a^{\varphi(n)} \prod = \prod" />, then
        cancel.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Chinese Remainder Theorem</h2>

      <Callout title="CRT">
        Let <InlineMath math="m_1, m_2, \dots, m_k" /> be pairwise
        coprime. Then for any integers{" "}
        <InlineMath math="a_1, \dots, a_k" />, there exists an
        integer <InlineMath math="x" /> with
        <BlockMath math="x \equiv a_1 \pmod{m_1}, \quad x \equiv a_2 \pmod{m_2}, \quad \dots, \quad x \equiv a_k \pmod{m_k}." />
        It is unique mod{" "}
        <InlineMath math="M = m_1 m_2 \cdots m_k" />.
      </Callout>

      <p>
        CRT is constructive: a recipe finds <InlineMath math="x" />.
        For two moduli{" "}
        <InlineMath math="x \equiv a \pmod m" />,{" "}
        <InlineMath math="x \equiv b \pmod n" /> with{" "}
        <InlineMath math="\gcd(m, n) = 1" />: by Bezout there are{" "}
        <InlineMath math="u, v" /> with{" "}
        <InlineMath math="um + vn = 1" />, and the unique solution
        mod <InlineMath math="mn" /> is{" "}
        <InlineMath math="x = avn + bum" />.
      </p>

      <p>
        Cryptographic use: RSA decryption uses CRT to speed up
        modular exponentiation by factor of ~4. Compute{" "}
        <InlineMath math="m^d \mod p" /> and{" "}
        <InlineMath math="m^d \mod q" /> separately (smaller moduli,
        faster), then combine via CRT to get{" "}
        <InlineMath math="m^d \mod n = m^d \mod pq" />. Real RSA
        libraries store CRT exponents specifically for this.
      </p>

      <p>
        CRT also illustrates the structure theorem for finite
        commutative rings:
      </p>
      <BlockMath math="\mathbb{Z}/(mn) \cong \mathbb{Z}/m \times \mathbb{Z}/n \quad \text{when } \gcd(m, n) = 1." />
      <p>
        Solving simultaneously is "the same as" working in the
        product. We'll see this notion of "isomorphism" properly in
        Module X (Abstract Algebra).
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Quadratic residues (preview)</h2>

      <p>
        A <strong>quadratic residue</strong> mod{" "}
        <InlineMath math="p" /> is an integer{" "}
        <InlineMath math="a" /> such that{" "}
        <InlineMath math="x^2 \equiv a \pmod p" /> has a solution.
        For prime <InlineMath math="p" /> odd, exactly half of the
        nonzero residues mod <InlineMath math="p" /> are quadratic
        residues; the other half are non-residues.
      </p>

      <p>
        The <strong>Legendre symbol</strong>{" "}
        <InlineMath math="(a/p)" /> is +1, −1, or 0 depending on
        whether <InlineMath math="a" /> is a non-zero QR, a non-
        residue, or 0. Quadratic reciprocity (Gauss called it
        "the golden theorem") relates{" "}
        <InlineMath math="(p/q)" /> to{" "}
        <InlineMath math="(q/p)" /> for distinct odd primes — a
        deep result with five different proofs by Gauss alone.
      </p>

      <p>
        We'll skim past it here and revisit when needed (Module X).
        The point: arithmetic mod <InlineMath math="p" /> has rich
        algebraic structure, including a notion of "square roots"
        and reciprocity laws connecting different primes.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>RSA.</strong> Next chapter. The whole algorithm
          is "<InlineMath math="m^{ed} \equiv m \pmod n" />" via
          Euler's theorem. Modular exponentiation is the
          computational primitive.
        </li>
        <li>
          <strong>Diffie–Hellman key exchange.</strong>{" "}
          <InlineMath math="g^a \pmod p" /> sent over the wire,
          recipients combine using their secret exponents to share
          a key. Security relies on the difficulty of the{" "}
          <em>discrete logarithm problem</em>: given{" "}
          <InlineMath math="g, h, p" />, find{" "}
          <InlineMath math="x" /> with{" "}
          <InlineMath math="g^x \equiv h \pmod p" />.
        </li>
        <li>
          <strong>Hash functions.</strong> Many cryptographic hash
          constructions use modular arithmetic over large primes or
          binary fields.
        </li>
        <li>
          <strong>Quantum computing.</strong> Shor's algorithm
          reduces integer factoring to{" "}
          <em>period finding</em>: given{" "}
          <InlineMath math="a" /> coprime to <InlineMath math="n" />,
          find the smallest <InlineMath math="r" /> with{" "}
          <InlineMath math="a^r \equiv 1 \pmod n" />. By Euler's
          theorem the answer divides{" "}
          <InlineMath math="\varphi(n)" />; finding it on a quantum
          computer is exponentially faster than classically.
        </li>
        <li>
          <strong>Computer arithmetic.</strong> Integer overflow in
          fixed-width arithmetic is congruence mod{" "}
          <InlineMath math="2^{32}" /> or{" "}
          <InlineMath math="2^{64}" />. Hash table indexing is mod{" "}
          <InlineMath math="n" />. The error-correcting codes that
          keep CDs and QR codes readable are based on arithmetic
          over finite fields (next-level modular arithmetic).
        </li>
      </ul>

      <p>
        Next chapter: RSA from scratch. With this chapter's tools
        in hand, the algorithm and its proof of correctness fit on
        a single page.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: Modular exponentiation
// ════════════════════════════════════════════════════════════

function ModExpWidget() {
  const [a, setA] = useState(3);
  const [n, setN] = useState(11);
  const maxK = 30;

  const seq: number[] = [];
  let val = 1 % n;
  for (let k = 0; k <= maxK; k++) {
    seq.push(val);
    val = (val * a) % n;
  }

  // find period
  let period = 0;
  if (gcd(a, n) === 1) {
    let v = a % n;
    period = 1;
    while (v !== 1 && period < n) {
      v = (v * a) % n;
      period++;
    }
    if (v !== 1) period = 0; // shouldn't happen if coprime
  }

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <SlideRow label={`a = ${a}`} value={a} min={2} max={20} step={1} onChange={(v) => setA(Math.round(v))} />
          <SlideRow label={`n = ${n}`} value={n} min={3} max={30} step={1} onChange={(v) => setN(Math.round(v))} />
        </div>

        <div className="text-sm text-ink-300">
          <InlineMath math={`a^k \\bmod n`} />, for{" "}
          <InlineMath math={`k = 0, 1, 2, \\dots, ${maxK}`} />:
        </div>

        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(11, maxK + 1)}, minmax(0, 1fr))` }}>
          {seq.map((v, i) => (
            <div
              key={i}
              className={`text-center text-xs font-mono py-1 rounded ${
                v === 1 && i > 0
                  ? "bg-emerald-500/30 text-emerald-300 ring-1 ring-emerald-500/50"
                  : "bg-ink-800/40 text-ink-300"
              }`}
              title={`a^${i} mod n = ${v}`}
            >
              {v}
            </div>
          ))}
        </div>

        <div className="text-sm">
          {gcd(a, n) === 1 ? (
            <span className="text-emerald-300">
              ✓ <InlineMath math={`\\gcd(${a}, ${n}) = 1`} /> — the
              sequence is periodic with period{" "}
              <span className="font-mono">{period}</span>. By Euler's
              theorem, period divides{" "}
              <InlineMath math={`\\varphi(${n}) = ${phi(n)}`} />.
            </span>
          ) : (
            <span className="text-rose-300">
              ✗ <InlineMath math={`\\gcd(${a}, ${n}) = ${gcd(a, n)} \\neq 1`} /> —{" "}
              <InlineMath math="a" /> has no inverse mod{" "}
              <InlineMath math="n" />, the sequence won't return to 1.
            </span>
          )}
        </div>
      </div>
      <figcaption>
        Repeatedly multiplying by <InlineMath math="a" /> mod{" "}
        <InlineMath math="n" />. When{" "}
        <InlineMath math="\gcd(a, n) = 1" />, the sequence is
        periodic, and the period divides{" "}
        <InlineMath math="\varphi(n)" />. Shor's algorithm finds
        this period exponentially faster than classical methods.
      </figcaption>
    </figure>
  );
}

function gcd(a: number, b: number): number {
  while (b) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}

function phi(n: number): number {
  let res = n;
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    if (m % p === 0) {
      while (m % p === 0) m = Math.floor(m / p);
      res -= Math.floor(res / p);
    }
  }
  if (m > 1) res -= Math.floor(res / m);
  return res;
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
      "What is $7 \\cdot 8 \\pmod{15}$?",
    options: ["1", "11", "56", "14"],
    correct: 1,
    explanation:
      "$7 \\cdot 8 = 56 = 3 \\cdot 15 + 11$, so $56 \\equiv 11 \\pmod{15}$.",
  },
  {
    prompt:
      "When does $a$ have a multiplicative inverse mod $n$?",
    options: [
      "always",
      "iff $a$ is even",
      "iff $\\gcd(a, n) = 1$",
      "iff $a < n$",
    ],
    correct: 2,
    explanation:
      "By Bezout, $ax \\equiv 1 \\pmod n$ is solvable iff $\\gcd(a, n) = 1$. The extended Euclidean algorithm finds the inverse.",
  },
  {
    prompt:
      "By Fermat's little theorem, $5^{10} \\pmod{11}$ equals…",
    options: ["1", "5", "10", "0"],
    correct: 0,
    explanation:
      "11 is prime and $5$ is coprime to 11. By FLT, $5^{11-1} = 5^{10} \\equiv 1 \\pmod{11}$.",
  },
  {
    prompt:
      "Compute $\\varphi(15)$.",
    options: ["8", "7", "12", "14"],
    correct: 0,
    explanation:
      "$15 = 3 \\cdot 5$, both prime. $\\varphi(15) = (3-1)(5-1) = 2 \\cdot 4 = 8$. The 8 units are $\\{1, 2, 4, 7, 8, 11, 13, 14\\}$.",
  },
  {
    prompt:
      "By Euler's theorem, for $\\gcd(a, n) = 1$:",
    options: [
      "$a^n \\equiv 1 \\pmod n$",
      "$a^{n-1} \\equiv 1 \\pmod n$",
      "$a^{\\varphi(n)} \\equiv 1 \\pmod n$",
      "$a^{\\varphi(n) - 1} \\equiv a \\pmod n$",
    ],
    correct: 2,
    explanation:
      "$a^{\\varphi(n)} \\equiv 1 \\pmod n$ for any $a$ coprime to $n$. FLT is the special case $n = p$ prime, where $\\varphi(p) = p - 1$.",
  },
];
