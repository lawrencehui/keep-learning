import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function DivisibilityBody() {
  return (
    <>
      <p>
        Number theory is the oldest branch of mathematics, the
        playground of Fermat, Euler, Gauss, and Erdős. For two
        thousand years it was studied for its own beauty — pure
        thought experiments about integers. Then in the 1970s, RSA
        and (later) elliptic-curve cryptography turned it into the
        engine of online security. The same primes that fascinated
        Euclid now keep your bank account safe.
      </p>
      <p>
        This module culminates in two practical algorithms — RSA and
        ECDSA — and a serious view of why both crumble under a
        full-scale quantum computer (Shor's algorithm, in Tier XVI).
        First, the foundations: divisibility, the Euclidean
        algorithm, and the structure of the primes.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.781 — Theory of Numbers",
            author: "Prof. Andrew Sutherland (MIT OCW)",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/18-781-theory-of-numbers-spring-2012/",
            note: "The canonical undergraduate number theory course. Lecture notes are excellent.",
          },
          {
            title: "Khan Academy — Cryptography (intro)",
            author: "Khan Academy",
            duration: "~3h",
            url: "https://www.khanacademy.org/computing/computer-science/cryptography",
            note: "Number theory + crypto from the ground up, with motivation.",
          },
          {
            title: "Hardy & Wright — An Introduction to the Theory of Numbers",
            author: "G.H. Hardy and E.M. Wright",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/An_Introduction_to_the_Theory_of_Numbers",
            note: "The classic treatise. Hardy's prose is itself worth the price.",
          },
          {
            title: "Niven, Zuckerman & Montgomery — An Introduction to the Theory of Numbers",
            author: "Niven et al.",
            duration: "Reading",
            url: "https://www.wiley.com/en-us/An+Introduction+to+the+Theory+of+Numbers%2C+5th+Edition-p-9780471625469",
            note: "Standard textbook treatment. Excellent exercises.",
          },
          {
            title: "Numberphile — series on primes & cryptography",
            author: "Numberphile (Brady Haran)",
            duration: "10–20 min videos",
            url: "https://www.youtube.com/c/numberphile",
            note: "Rabbit-hole-friendly explanations of specific results (RSA, Mersenne primes, twin primes).",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Divisibility</h2>

      <p>
        For integers <InlineMath math="a, b" /> with{" "}
        <InlineMath math="a \neq 0" />, we say <em>a divides b</em>
        and write <InlineMath math="a \mid b" /> if there is an
        integer <InlineMath math="k" /> with{" "}
        <InlineMath math="b = ak" />. Equivalent phrasings: <em>a
        is a divisor of b</em>; <em>b is a multiple of a</em>; <em>b
        is divisible by a</em>.
      </p>

      <p>
        Basic facts (each follows from the definition):
      </p>
      <ul>
        <li>
          <InlineMath math="a \mid a" /> for any{" "}
          <InlineMath math="a \neq 0" /> (reflexive).
        </li>
        <li>
          If <InlineMath math="a \mid b" /> and{" "}
          <InlineMath math="b \mid c" />, then{" "}
          <InlineMath math="a \mid c" /> (transitive).
        </li>
        <li>
          If <InlineMath math="a \mid b" /> and{" "}
          <InlineMath math="a \mid c" />, then{" "}
          <InlineMath math="a \mid (xb + yc)" /> for any integers{" "}
          <InlineMath math="x, y" />.
        </li>
        <li>
          If <InlineMath math="a \mid b" /> and <InlineMath math="b \mid a" />,
          then <InlineMath math="a = \pm b" />.
        </li>
      </ul>

      <h3>Division with remainder</h3>

      <Callout title="Division algorithm">
        Given integers <InlineMath math="a, b" /> with{" "}
        <InlineMath math="b > 0" />, there exist unique integers{" "}
        <InlineMath math="q, r" /> with
        <BlockMath math="a = bq + r, \quad 0 \leq r < b." />
      </Callout>

      <p>
        <InlineMath math="q" /> is the <em>quotient</em>,{" "}
        <InlineMath math="r" /> the <em>remainder</em>. The
        algorithm is just integer division as you learned in school,
        with the constraint that the remainder is non-negative and
        strictly less than the divisor. This is what makes the
        Euclidean algorithm work.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · GCD &amp; the Euclidean algorithm</h2>

      <p>
        The <strong>greatest common divisor</strong>{" "}
        <InlineMath math="\gcd(a, b)" /> is the largest positive
        integer dividing both <InlineMath math="a" /> and{" "}
        <InlineMath math="b" />. By convention,{" "}
        <InlineMath math="\gcd(a, 0) = |a|" />. Two numbers with{" "}
        <InlineMath math="\gcd(a, b) = 1" /> are called{" "}
        <strong>coprime</strong> or <em>relatively prime</em>.
      </p>

      <p>
        Computing GCD by listing all divisors of{" "}
        <InlineMath math="a" /> and <InlineMath math="b" /> and
        intersecting is hopeless for large numbers. The{" "}
        <strong>Euclidean algorithm</strong> does it in time
        proportional to the number of digits. The key identity:
      </p>
      <BlockMath math="\gcd(a, b) = \gcd(b, a \bmod b)." />
      <p>
        Why: any common divisor of <InlineMath math="a" /> and{" "}
        <InlineMath math="b" /> also divides{" "}
        <InlineMath math="a - bq = r" /> (and conversely). So the
        set of common divisors is the same on both sides; their
        max is too.
      </p>

      <h3>Worked example: gcd(252, 105)</h3>
      <BlockMath math="252 = 2 \cdot 105 + 42" />
      <BlockMath math="105 = 2 \cdot 42 + 21" />
      <BlockMath math="42 = 2 \cdot 21 + 0" />
      <p>
        At each step, replace the larger number by the remainder.
        The last nonzero remainder is the GCD: 21. Each step
        reduces the size; the algorithm terminates in{" "}
        <InlineMath math="O(\log\min(a, b))" /> steps.
      </p>

      <h3>Bezout's identity</h3>

      <Callout title="Bezout">
        For any integers <InlineMath math="a, b" /> not both zero,
        there exist integers <InlineMath math="x, y" /> with
        <BlockMath math="ax + by = \gcd(a, b)." />
      </Callout>

      <p>
        Crucially, the <strong>extended Euclidean algorithm</strong>{" "}
        finds <InlineMath math="x" /> and <InlineMath math="y" /> at
        the same time it finds the GCD, by tracking how each
        remainder is built from the original two numbers. This
        becomes essential for computing modular inverses (next
        chapter, RSA after that).
      </p>

      <Exercise
        number="2.1"
        prompt={
          <>
            Use the Euclidean algorithm to find{" "}
            <InlineMath math="\gcd(91, 65)" />, then express it as{" "}
            <InlineMath math="91x + 65y" />.
          </>
        }
      >
        <p>
          <InlineMath math="91 = 1 \cdot 65 + 26" />,{" "}
          <InlineMath math="65 = 2 \cdot 26 + 13" />,{" "}
          <InlineMath math="26 = 2 \cdot 13 + 0" />. So{" "}
          <InlineMath math="\gcd = 13" />.
        </p>
        <p>
          Back-substitute:{" "}
          <InlineMath math="13 = 65 - 2 \cdot 26 = 65 - 2(91 - 65) = 3 \cdot 65 - 2 \cdot 91" />.
          So <InlineMath math="x = -2,\, y = 3" />. Check:{" "}
          <InlineMath math="-2 \cdot 91 + 3 \cdot 65 = -182 + 195 = 13" />{" "}
          ✓.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Primes</h2>

      <p>
        A <strong>prime</strong> is an integer{" "}
        <InlineMath math="p > 1" /> whose only positive divisors are
        1 and itself. <em>Composite</em> integers are non-primes
        greater than 1. The number 1 is neither (by convention,
        making certain theorems clean).
      </p>

      <p>
        First few: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31. The 2 is
        the only even prime — every larger even number has 2 as a
        non-trivial divisor.
      </p>

      <h3>Euclid: there are infinitely many primes</h3>

      <p>
        <strong>Theorem (Euclid).</strong> There are infinitely many
        primes.
      </p>
      <p>
        <strong>Proof.</strong> Suppose, for contradiction, that
        the primes are exactly{" "}
        <InlineMath math="p_1, p_2, \dots, p_n" />. Consider
      </p>
      <BlockMath math="N = p_1 p_2 \cdots p_n + 1." />
      <p>
        Now <InlineMath math="N > 1" /> so it has at least one
        prime divisor — say <InlineMath math="p" />. But{" "}
        <InlineMath math="p" /> equals some <InlineMath math="p_i" />{" "}
        in our list. Then <InlineMath math="p_i \mid N" /> and{" "}
        <InlineMath math="p_i \mid p_1 p_2 \cdots p_n" />, so{" "}
        <InlineMath math="p_i \mid (N - p_1 \cdots p_n) = 1" />,
        which is impossible since <InlineMath math="p_i \geq 2" />.
        Contradiction. ∎
      </p>

      <p>
        The proof is constructive in spirit: from any finite list
        of primes, you can build a number whose factors expose
        primes outside the list. The numbers{" "}
        <InlineMath math="2 \cdot 3 \cdot 5 \cdots p_n + 1" /> are
        called <em>Euclid numbers</em>; they're often (but not
        always) prime themselves.
      </p>

      <Callout title="Try it">
        The Sieve of Eratosthenes finds all primes up to{" "}
        <InlineMath math="N" />: cross out multiples of 2, then 3,
        then 5, etc. The widget animates the process.
      </Callout>

      <SieveWidget />

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · The Fundamental Theorem of Arithmetic</h2>

      <Callout title="Fundamental theorem of arithmetic">
        Every integer <InlineMath math="n > 1" /> can be written as
        a product of primes, in exactly one way up to the order of
        the factors.
      </Callout>

      <p>
        That is, there exist unique primes{" "}
        <InlineMath math="p_1 < p_2 < \cdots < p_k" /> and unique
        positive integer exponents{" "}
        <InlineMath math="e_1, e_2, \dots, e_k" /> with
      </p>
      <BlockMath math="n = p_1^{e_1} \, p_2^{e_2} \cdots p_k^{e_k}." />

      <p>
        <strong>Existence</strong> is by strong induction: if{" "}
        <InlineMath math="n" /> is prime, done; otherwise{" "}
        <InlineMath math="n = ab" /> with{" "}
        <InlineMath math="1 < a, b < n" />, and by induction both{" "}
        <InlineMath math="a" /> and <InlineMath math="b" /> have
        prime factorisations, which combined give one for{" "}
        <InlineMath math="n" />.
      </p>

      <p>
        <strong>Uniqueness</strong> is harder; it relies on{" "}
        <em>Euclid's lemma</em>: if a prime{" "}
        <InlineMath math="p" /> divides a product{" "}
        <InlineMath math="ab" />, then <InlineMath math="p" />{" "}
        divides <InlineMath math="a" /> or{" "}
        <InlineMath math="b" />. From this, given any two prime
        factorisations of <InlineMath math="n" />, you can match
        them up element-by-element.
      </p>

      <p>
        Almost everything in number theory uses this. Two examples:
      </p>
      <ul>
        <li>
          <strong>GCD via factorisation.</strong> If{" "}
          <InlineMath math="m = \prod p^{a_p}" /> and{" "}
          <InlineMath math="n = \prod p^{b_p}" />, then{" "}
          <InlineMath math="\gcd(m, n) = \prod p^{\min(a_p, b_p)}" />{" "}
          and{" "}
          <InlineMath math="\operatorname{lcm}(m, n) = \prod p^{\max(a_p, b_p)}" />.
        </li>
        <li>
          <strong>Number of divisors.</strong>{" "}
          <InlineMath math="\tau(n) = (e_1 + 1)(e_2 + 1) \cdots (e_k + 1)" />.
          E.g.{" "}
          <InlineMath math="12 = 2^2 \cdot 3^1" /> has{" "}
          <InlineMath math="3 \cdot 2 = 6" /> divisors:{" "}
          <InlineMath math="1, 2, 3, 4, 6, 12" />.
        </li>
      </ul>

      <Pitfall>
        Uniqueness of prime factorisation feels obvious but is a
        non-trivial structural fact about{" "}
        <InlineMath math="\mathbb{Z}" />. It fails in some larger
        rings — e.g. in{" "}
        <InlineMath math="\mathbb{Z}[\sqrt{-5}]" />,{" "}
        <InlineMath math="6 = 2 \cdot 3 = (1 + \sqrt{-5})(1 - \sqrt{-5})" />,
        two factorisations into "primes" of that ring. Recovering
        unique factorisation in such rings was one of the
        motivations for ideal theory and modern algebra (Tier X).
      </Pitfall>

      <Exercise
        number="4.1"
        prompt={
          <>
            How many positive divisors does 360 have?
          </>
        }
      >
        <p>
          <InlineMath math="360 = 2^3 \cdot 3^2 \cdot 5^1" />.
          Number of divisors:{" "}
          <InlineMath math="(3+1)(2+1)(1+1) = 24" />.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · How are primes distributed?</h2>

      <p>
        Primes get sparser as you go up: among the first 100
        integers, 25 are prime; among the first 1000, only 168;
        the first million, 78498. The <strong>Prime Number
        Theorem</strong> (Hadamard, de la Vallée Poussin, 1896)
        quantifies this:
      </p>
      <BlockMath math="\pi(n) \sim \frac{n}{\ln n}, \qquad \text{i.e.} \quad \lim_{n \to \infty} \frac{\pi(n) \ln n}{n} = 1," />
      <p>
        where <InlineMath math="\pi(n)" /> is the number of primes{" "}
        <InlineMath math="\leq n" />. The probability that a
        random integer near <InlineMath math="n" /> is prime is
        about <InlineMath math="1/\ln n" />.
      </p>

      <p>
        This has practical consequences for cryptography. To find
        a random 1024-bit prime (used in old RSA keys), you pick a
        random 1024-bit number and test for primality; the
        expected number of tries is about{" "}
        <InlineMath math="\ln(2^{1024}) \approx 710" />. With fast
        primality tests (Miller–Rabin), this takes seconds. Without
        the prime number theorem you wouldn't know how feasible
        this is.
      </p>

      <p>
        Open conjectures abound:
      </p>
      <ul>
        <li>
          <strong>Twin prime conjecture.</strong> There are
          infinitely many primes <InlineMath math="p" /> such that{" "}
          <InlineMath math="p + 2" /> is also prime. Goldbach,
          Hardy–Littlewood. Open.
        </li>
        <li>
          <strong>Goldbach's conjecture.</strong> Every even integer{" "}
          <InlineMath math="\geq 4" /> is the sum of two primes.
          Verified to <InlineMath math="10^{18}" />, no proof.
        </li>
        <li>
          <strong>Riemann hypothesis.</strong> About zeros of the
          Riemann zeta function — equivalent to a sharp error
          term in PNT. Worth $1M (Clay Millennium Prize).
        </li>
      </ul>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Cryptography.</strong> RSA keys are products of
          two large primes — typically 2048 bits for{" "}
          <InlineMath math="n" />, so the primes are 1024-bit.
          Generating, testing, and using such primes is exactly the
          algorithms in this chapter.
        </li>
        <li>
          <strong>Computer science.</strong> Hash tables of size{" "}
          <em>prime</em> distribute keys better. Number-theoretic
          algorithms (modular arithmetic, FFT over finite fields)
          underlie compression and error-correcting codes.
        </li>
        <li>
          <strong>Quantum computing.</strong> Shor's algorithm for
          factoring uses period-finding, modular exponentiation,
          and the Quantum Fourier Transform. Every concept in this
          chapter feeds into Shor's. We'll close the loop in Tier
          XVI.
        </li>
      </ul>

      <p>
        Next chapter: modular arithmetic. The structure of{" "}
        <InlineMath math="\mathbb{Z}/n\mathbb{Z}" /> and the
        theorems of Fermat and Euler that make RSA possible.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: Sieve of Eratosthenes
// ════════════════════════════════════════════════════════════

function SieveWidget() {
  const [N, setN] = useState(50);
  const [step, setStep] = useState(0);

  // Compute sieve to step
  const isPrime: boolean[] = new Array(N + 1).fill(true);
  isPrime[0] = false;
  if (N >= 1) isPrime[1] = false;

  // Sweep through primes up to step
  let primeCounter = 0;
  let crossedBy: number[] = new Array(N + 1).fill(0);
  for (let i = 2; i <= N; i++) {
    if (isPrime[i]) {
      primeCounter++;
      if (primeCounter > step) break;
      for (let j = i * i; j <= N; j += i) {
        if (isPrime[j]) {
          isPrime[j] = false;
          crossedBy[j] = i;
        }
      }
    }
  }

  const cells = Array.from({ length: N }, (_, idx) => idx + 1);
  const cols = 10;

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            className="px-3 py-1.5 rounded-lg text-sm border border-ink-800 hover:border-accent-soft text-ink-300"
          >
            ← Back
          </button>
          <button
            onClick={() => setStep(step + 1)}
            className="px-3 py-1.5 rounded-lg text-sm border border-ink-800 hover:border-accent-soft text-ink-300"
          >
            Next prime →
          </button>
          <button
            onClick={() => setStep(0)}
            className="px-3 py-1.5 rounded-lg text-sm border border-ink-800 hover:border-accent-soft text-ink-300"
          >
            Reset
          </button>
          <span className="text-xs text-ink-400">
            Sieve through {primeCounter > step ? "(building)" : `${primeCounter}`} primes
          </span>
        </div>

        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {cells.map((n) => {
            const prime = isPrime[n];
            const crossed = crossedBy[n] > 0;
            return (
              <div
                key={n}
                className={`text-center text-xs sm:text-sm font-mono py-1.5 rounded ${
                  prime
                    ? "bg-accent/30 text-accent-soft ring-1 ring-accent/50"
                    : crossed
                    ? "bg-ink-800/50 text-ink-500 line-through"
                    : "bg-ink-800/30 text-ink-300"
                }`}
              >
                {n}
              </div>
            );
          })}
        </div>

        <div>
          <div className="flex items-baseline justify-between text-xs text-ink-400 mb-1">
            <span>Sieve up to N</span>
            <span className="font-mono text-ink-200">N = {N}</span>
          </div>
          <input
            type="range"
            min={20}
            max={120}
            step={1}
            value={N}
            onChange={(e) => {
              setN(Number(e.target.value));
              setStep(0);
            }}
            className="w-full accent-accent-soft"
          />
        </div>
      </div>
      <figcaption>
        Click "Next prime" to advance. At each step, the next
        un-crossed-out number is prime; we then cross out all its
        multiples. After step <InlineMath math="k" /> only primes
        and not-yet-considered candidates remain unmarked.
      </figcaption>
    </figure>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "Use the Euclidean algorithm: $\\gcd(48, 18)$ equals…",
    options: ["3", "6", "9", "12"],
    correct: 1,
    explanation:
      "$48 = 2 \\cdot 18 + 12$; $18 = 1 \\cdot 12 + 6$; $12 = 2 \\cdot 6 + 0$. Last nonzero remainder: 6.",
  },
  {
    prompt:
      "By Bezout's identity, $\\gcd(a, b) = d$ means there exist integers $x, y$ with…",
    options: [
      "$a + b = d$",
      "$ax + by = d$",
      "$a x b^y = d$",
      "$d \\mid x$ and $d \\mid y$",
    ],
    correct: 1,
    explanation:
      "Bezout: the GCD is always expressible as an integer linear combination of $a$ and $b$. The extended Euclidean algorithm finds the coefficients.",
  },
  {
    prompt:
      "Which of these is **not** a prime?",
    options: ["2", "1", "17", "23"],
    correct: 1,
    explanation:
      "1 is excluded from the primes by convention — including it would break unique factorisation. Primes are integers $> 1$ with no divisors other than 1 and themselves.",
  },
  {
    prompt:
      "By the Fundamental Theorem of Arithmetic, every integer $n > 1$ has…",
    options: [
      "a unique factorisation into primes (up to order)",
      "exactly two prime factors",
      "an even number of prime factors",
      "a prime factor equal to $n$ itself",
    ],
    correct: 0,
    explanation:
      "Every integer > 1 has a prime factorisation that is unique up to the order of factors. This unique factorisation property is what makes $\\mathbb{Z}$ a 'unique factorisation domain'.",
  },
  {
    prompt:
      "By the Prime Number Theorem, $\\pi(n)$ (number of primes up to $n$) is approximately…",
    options: [
      "$\\sqrt{n}$",
      "$n / \\ln n$",
      "$n^2$",
      "$\\ln n$",
    ],
    correct: 1,
    explanation:
      "$\\pi(n) \\sim n/\\ln n$. The probability that a number near $n$ is prime is roughly $1/\\ln n$ — used to estimate how many tries a prime-finding algorithm needs.",
  },
];
