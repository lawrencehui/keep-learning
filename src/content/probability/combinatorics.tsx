import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function CombinatoricsBody() {
  return (
    <>
      <p>
        Combinatorics is the art of counting without listing.
        Before you can speak of probabilities, you need to count
        possibilities — and the possibilities multiply combinatorially.
        This first chapter of the probability module builds the
        toolkit: the multiplication principle, permutations, the
        binomial coefficient, the binomial theorem, and inclusion-
        exclusion. Most useful "by-hand" probability problems are
        secretly combinatorics problems plus a division.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.05 — Introduction to Probability and Statistics",
            author: "Orloff &amp; Bloom (MIT OCW)",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/",
            note: "Lectures 1–4 cover this chapter and the next.",
          },
          {
            title: "Khan Academy — Probability and combinatorics",
            author: "Khan Academy",
            duration: "~6h",
            url: "https://www.khanacademy.org/math/statistics-probability",
            note: "Walks through every standard counting argument with worked examples.",
          },
          {
            title: "Generatingfunctionology",
            author: "Herbert Wilf",
            duration: "Reading (free PDF)",
            url: "https://www2.math.upenn.edu/~wilf/gfology2.pdf",
            note: "Wilf's classic on generating functions. Worth reading once Part 6 motivates the topic.",
          },
          {
            title: "Concrete Mathematics — chs. 5–6",
            author: "Graham, Knuth, Patashnik",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Concrete_Mathematics",
            note: "Deeper combinatorial identities. The binomial chapter is a small masterpiece.",
          },
          {
            title: "The Art of Problem Solving — Counting playlist",
            author: "AoPS / Richard Rusczyk",
            duration: "~5h",
            url: "https://www.youtube.com/playlist?list=PLG-8d6hSGcPlRvmcbZUpKnCAoNFb1ohjG",
            note: "Olympiad-style counting problems. Excellent practice once basic technique is solid.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The multiplication principle</h2>

      <p>
        If a procedure has two independent stages, with{" "}
        <InlineMath math="a" /> outcomes for the first and{" "}
        <InlineMath math="b" /> for the second, the total count of
        outcomes is <InlineMath math="ab" />. Generalises to any
        finite sequence of independent stages.
      </p>

      <p>
        Examples:
      </p>
      <ul>
        <li>
          A 4-digit PIN: <InlineMath math="10^4 = 10\,000" />{" "}
          possibilities (each digit 0–9 independently).
        </li>
        <li>
          A 7-character password using upper, lower, digits:{" "}
          <InlineMath math="62^7 \approx 3.5 \times 10^{12}" />.
          Adding even the shift key dramatically expands the
          space — the foundation of password-strength advice.
        </li>
        <li>
          A queue of 5 distinct people in line:{" "}
          <InlineMath math="5 \cdot 4 \cdot 3 \cdot 2 \cdot 1 = 5! = 120" />.
          Each position has one fewer option than the last.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Permutations</h2>

      <p>
        A <strong>permutation</strong> is an ordered arrangement.
        The number of permutations of <InlineMath math="n" />{" "}
        distinct objects is
      </p>
      <BlockMath math="n! = n \cdot (n-1) \cdot (n-2) \cdots 2 \cdot 1." />
      <p>
        With the convention <InlineMath math="0! = 1" /> (so that
        formulas at the boundary stay clean).
      </p>

      <p>
        Picking <InlineMath math="k" /> objects from{" "}
        <InlineMath math="n" /> in order — a <em>k-permutation</em>:
      </p>
      <BlockMath math="P(n, k) = \frac{n!}{(n - k)!} = n (n-1) \cdots (n - k + 1)." />

      <p>
        Worked: how many ways to seat 3 of 7 candidates as
        president, vice-president, and treasurer? Order matters
        (the roles are distinct). Answer:{" "}
        <InlineMath math="P(7, 3) = 7 \cdot 6 \cdot 5 = 210" />.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Combinations &amp; Pascal's triangle</h2>

      <p>
        A <strong>combination</strong> picks{" "}
        <InlineMath math="k" /> objects out of{" "}
        <InlineMath math="n" /> with order ignored — a subset.
        The number of <InlineMath math="k" />-subsets is the{" "}
        <strong>binomial coefficient</strong>
      </p>
      <BlockMath math="\binom{n}{k} = \frac{n!}{k! (n - k)!}" />
      <p>
        read "<InlineMath math="n" /> choose{" "}
        <InlineMath math="k" />". Why this formula:{" "}
        <InlineMath math="P(n, k)" /> counts ordered selections,
        but each <InlineMath math="k" />-subset is counted{" "}
        <InlineMath math="k!" /> times (once per ordering of its
        elements). Divide by <InlineMath math="k!" /> to remove the
        redundancy.
      </p>

      <p>
        Worked: how many 5-card poker hands from a 52-card deck?{" "}
        <InlineMath math="\binom{52}{5} = 2\,598\,960" />.
      </p>

      <h3>Identities to memorise</h3>

      <ul>
        <li>
          <strong>Symmetry:</strong>{" "}
          <InlineMath math="\binom{n}{k} = \binom{n}{n - k}" />.
          Choosing what to take = choosing what to leave.
        </li>
        <li>
          <strong>Pascal's rule:</strong>{" "}
          <InlineMath math="\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}" />.
          Either include the last element (and choose{" "}
          <InlineMath math="k - 1" /> from the rest) or exclude it
          (and choose <InlineMath math="k" /> from the rest).
        </li>
        <li>
          <strong>Row sum:</strong>{" "}
          <InlineMath math="\sum_{k = 0}^{n} \binom{n}{k} = 2^n" />.
          Total number of subsets — each element independently in
          or out.
        </li>
      </ul>

      <Callout title="Try it">
        Pascal's triangle. Each entry is the sum of the two above
        it (Pascal's rule). The <InlineMath math="n" />-th row
        gives <InlineMath math="\binom{n}{0}, \binom{n}{1}, \dots, \binom{n}{n}" />.
      </Callout>

      <PascalWidget />

      <Exercise
        number="3.1"
        prompt={
          <>
            How many ways are there to choose 2 books from a shelf
            of 8 books?
          </>
        }
      >
        <p>
          <InlineMath math="\binom{8}{2} = \tfrac{8!}{2! \, 6!} = \tfrac{8 \cdot 7}{2} = 28" />.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · The binomial theorem</h2>

      <Callout title="Binomial theorem">
        For any real (or complex) <InlineMath math="x, y" /> and
        non-negative integer <InlineMath math="n" />,
        <BlockMath math="(x + y)^n = \sum_{k = 0}^{n} \binom{n}{k} x^{n - k} y^k." />
      </Callout>

      <p>
        Proof sketch: when you expand{" "}
        <InlineMath math="(x + y)^n = (x + y)(x + y) \cdots (x + y)" />,
        every term in the expansion picks{" "}
        <InlineMath math="x" /> from some factors and{" "}
        <InlineMath math="y" /> from the rest. The number of ways
        to pick <InlineMath math="y" /> from exactly{" "}
        <InlineMath math="k" /> of the <InlineMath math="n" />{" "}
        factors is <InlineMath math="\binom{n}{k}" />, giving the
        coefficient of{" "}
        <InlineMath math="x^{n-k} y^k" />.
      </p>

      <p>
        Special cases worth memorising:
      </p>
      <ul>
        <li>
          <InlineMath math="(x + y)^2 = x^2 + 2xy + y^2" />.
        </li>
        <li>
          <InlineMath math="(x + y)^3 = x^3 + 3x^2 y + 3 x y^2 + y^3" />.
        </li>
        <li>
          <InlineMath math="(1 + x)^n = \sum \binom{n}{k} x^k" /> —
          generating function for binomial coefficients.
        </li>
        <li>
          Setting <InlineMath math="x = y = 1" />:{" "}
          <InlineMath math="\sum_k \binom{n}{k} = 2^n" /> (the row
          sum from Part 3).
        </li>
        <li>
          Setting <InlineMath math="x = 1, y = -1" />:{" "}
          <InlineMath math="\sum_k (-1)^k \binom{n}{k} = 0" /> for{" "}
          <InlineMath math="n \geq 1" /> — the alternating sum
          vanishes.
        </li>
      </ul>

      <Pitfall>
        The binomial theorem with non-integer exponents (Newton's
        generalised version) gives an <em>infinite</em> series:{" "}
        <InlineMath math="(1 + x)^\alpha = \sum_k \binom{\alpha}{k} x^k" />,
        valid for <InlineMath math="|x| < 1" />. The coefficient{" "}
        <InlineMath math="\binom{\alpha}{k} = \alpha(\alpha-1)\cdots(\alpha-k+1)/k!" />{" "}
        defines a formal generalisation. We saw this implicitly in
        the Taylor series chapter — the series for{" "}
        <InlineMath math="(1+x)^{1/2}" /> is the prototype.
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Inclusion-exclusion</h2>

      <p>
        For overlapping sets, "how many things satisfy any of
        properties <InlineMath math="A_1, \dots, A_n" />" requires
        adjusting for overcounting:
      </p>

      <BlockMath math="|A_1 \cup A_2| = |A_1| + |A_2| - |A_1 \cap A_2|." />
      <BlockMath math="|A_1 \cup A_2 \cup A_3| = |A_1| + |A_2| + |A_3| - |A_1 \cap A_2| - |A_1 \cap A_3| - |A_2 \cap A_3| + |A_1 \cap A_2 \cap A_3|." />

      <p>
        General <strong>inclusion-exclusion principle</strong>:
      </p>
      <BlockMath math="\left| \bigcup_{i=1}^{n} A_i \right| = \sum_{k=1}^{n} (-1)^{k+1} \sum_{|S| = k} \left| \bigcap_{i \in S} A_i \right|." />

      <p>
        Add singles, subtract pairs, add triples, alternating
        signs. Each element of the union ends up counted exactly
        once.
      </p>

      <p>
        Classic application — <strong>derangements</strong>: how
        many permutations of <InlineMath math="\{1, 2, \dots, n\}" />{" "}
        leave no element in its original position?
      </p>
      <BlockMath math="D_n = n! \sum_{k = 0}^{n} \frac{(-1)^k}{k!} \approx \frac{n!}{e}." />
      <p>
        The fraction of all permutations that are derangements
        approaches{" "}
        <InlineMath math="1/e \approx 0.368" /> as{" "}
        <InlineMath math="n \to \infty" />. This is why "secret
        Santa" assignments rarely have anyone drawing themselves
        on the first try — about 37% chance.
      </p>

      <Exercise
        number="5.1"
        prompt={
          <>
            How many integers in <InlineMath math="\{1, 2, \dots, 100\}" /> are
            divisible by 2 or 3?
          </>
        }
      >
        <p>
          Divisible by 2: 50. Divisible by 3:{" "}
          <InlineMath math="\lfloor 100/3 \rfloor = 33" />.
          Divisible by both (i.e. by 6):{" "}
          <InlineMath math="\lfloor 100/6 \rfloor = 16" />. By
          inclusion-exclusion:{" "}
          <InlineMath math="50 + 33 - 16 = 67" />.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Generating functions (preview)</h2>

      <p>
        A <strong>generating function</strong> packages a counting
        sequence into the coefficients of a power series. For a
        sequence <InlineMath math="a_0, a_1, a_2, \dots" />, its{" "}
        ordinary generating function is
      </p>
      <BlockMath math="A(x) = \sum_{n = 0}^{\infty} a_n \, x^n." />

      <p>
        Why bother: products and substitutions of generating
        functions correspond to{" "}
        <em>convolutions and compositions</em> of sequences. So
        algebraic manipulations of GFs solve combinatorial
        recurrences.
      </p>

      <p>
        Example. The Fibonacci sequence{" "}
        <InlineMath math="F_n" /> satisfies{" "}
        <InlineMath math="F_n = F_{n-1} + F_{n-2}" /> with{" "}
        <InlineMath math="F_0 = 0, F_1 = 1" />. Its generating
        function:
      </p>
      <BlockMath math="\sum_{n \geq 0} F_n \, x^n = \frac{x}{1 - x - x^2}." />
      <p>
        From this rational form, partial fractions plus geometric-
        series expansion recover Binet's formula{" "}
        <InlineMath math="F_n = (\varphi^n - \bar\varphi^n)/\sqrt 5" />{" "}
        — the same closed form we derived via diagonalisation in
        the linear algebra chapter. Two different routes to the
        same answer.
      </p>

      <p>
        We won't develop generating functions further here; Wilf's
        book in the references does it justice. The pattern to
        notice: <em>algebra of formal power series</em> and{" "}
        <em>combinatorics of sequences</em> are reflections of each
        other.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Probability.</strong> Every "simple" probability
          calculation reduces to "favourable outcomes / total
          outcomes" — both counts. Without combinatorics there's
          no probability theory.
        </li>
        <li>
          <strong>Cryptography.</strong> Counting cryptographic
          spaces (key spaces, password spaces) tells you how
          brute-force attacks scale. Birthday paradoxes (next
          chapter) follow directly from binomial coefficients.
        </li>
        <li>
          <strong>Algorithms &amp; complexity.</strong> Counting
          paths in graphs, counting subgraphs, counting solutions
          to discrete optimisation problems — all combinatorics.
          Generating functions analyse algorithm running times.
        </li>
        <li>
          <strong>Quantum computing.</strong> The dimension of an{" "}
          <InlineMath math="n" />-qubit Hilbert space is{" "}
          <InlineMath math="2^n" />. The number of computational
          basis states grows combinatorially. Quantum error
          correction codes are designed by counting "weight" — the
          number of qubits affected by an error — and combinatorial
          identities determine code distances.
        </li>
      </ul>

      <p>
        Next chapter: random variables and the formal foundations
        of probability. Combinatorics gave us "how many"; now we
        turn it into "what's the chance."
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: Pascal's triangle
// ════════════════════════════════════════════════════════════

function PascalWidget() {
  const [maxN, setMaxN] = useState(8);
  const [highlight, setHighlight] = useState<{ n: number; k: number } | null>({ n: 4, k: 2 });

  const rows: number[][] = [];
  for (let n = 0; n <= maxN; n++) {
    const row: number[] = [];
    for (let k = 0; k <= n; k++) {
      if (k === 0 || k === n) row.push(1);
      else row.push(rows[n - 1][k - 1] + rows[n - 1][k]);
    }
    rows.push(row);
  }

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div>
          <div className="flex items-baseline justify-between text-xs text-ink-400 mb-1">
            <span>Rows</span>
            <span className="font-mono text-ink-200">n = 0 … {maxN}</span>
          </div>
          <input
            type="range"
            min={3}
            max={12}
            step={1}
            value={maxN}
            onChange={(e) => setMaxN(Number(e.target.value))}
            className="w-full accent-accent-soft"
          />
        </div>

        <div className="space-y-1 overflow-x-auto">
          {rows.map((row, n) => (
            <div key={n} className="flex justify-center gap-1 sm:gap-1.5">
              {row.map((v, k) => {
                const isHi = highlight && highlight.n === n && highlight.k === k;
                const isParent =
                  highlight &&
                  highlight.n - 1 === n &&
                  (highlight.k - 1 === k || highlight.k === k);
                return (
                  <button
                    key={k}
                    onClick={() => setHighlight({ n, k })}
                    title={`C(${n},${k}) = ${v}`}
                    className={`text-xs sm:text-sm font-mono px-2 py-1 rounded ${
                      isHi
                        ? "bg-accent text-white ring-2 ring-accent-soft"
                        : isParent
                        ? "bg-accent/20 text-accent-soft"
                        : "bg-ink-800/60 text-ink-200 hover:bg-ink-800"
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {highlight && (
          <div className="text-sm text-ink-300 text-center">
            <InlineMath math={`\\binom{${highlight.n}}{${highlight.k}} = ${rows[highlight.n][highlight.k]}`} />
            {highlight.n > 0 && highlight.k > 0 && highlight.k < highlight.n && (
              <span className="ml-2 text-ink-500">
                = <InlineMath math={`\\binom{${highlight.n - 1}}{${highlight.k - 1}} + \\binom{${highlight.n - 1}}{${highlight.k}}`} />{" "}
                = {rows[highlight.n - 1][highlight.k - 1]} + {rows[highlight.n - 1][highlight.k]}
              </span>
            )}
          </div>
        )}
      </div>
      <figcaption>
        Click any entry to see its value and (when applicable) the
        Pascal-rule decomposition into the two entries above it.
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
      "How many 4-digit PINs are there if all digits 0–9 are allowed?",
    options: ["$4 \\cdot 10$", "$10!$", "$10^4$", "$\\binom{10}{4}$"],
    correct: 2,
    explanation:
      "Each of the 4 positions independently has 10 options, so $10 \\cdot 10 \\cdot 10 \\cdot 10 = 10^4 = 10\\,000$ by the multiplication principle.",
  },
  {
    prompt:
      "Compute $\\binom{8}{3}$.",
    options: ["56", "112", "336", "8"],
    correct: 0,
    explanation:
      "$\\binom{8}{3} = \\frac{8!}{3! \\, 5!} = \\frac{8 \\cdot 7 \\cdot 6}{3 \\cdot 2 \\cdot 1} = 56$.",
  },
  {
    prompt:
      "How many ways are there to arrange 5 distinct books in a row?",
    options: [
      "5",
      "25",
      "120",
      "$5^5$",
    ],
    correct: 2,
    explanation:
      "$5! = 120$. The first slot has 5 choices, the second 4, and so on.",
  },
  {
    prompt:
      "By the binomial theorem, the coefficient of $x^3 y^2$ in $(x + y)^5$ is…",
    options: ["1", "5", "10", "20"],
    correct: 2,
    explanation:
      "$\\binom{5}{2} = 10$ — choose 2 of the 5 factors to contribute $y$.",
  },
  {
    prompt:
      "By inclusion-exclusion, how many integers in $\\{1, \\dots, 30\\}$ are divisible by 2 or 5?",
    options: ["15", "18", "21", "24"],
    correct: 1,
    explanation:
      "Divisible by 2: 15. Divisible by 5: 6. Divisible by 10: 3. By inclusion-exclusion: $15 + 6 - 3 = 18$.",
  },
];
