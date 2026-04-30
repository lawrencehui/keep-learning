import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { Check, X } from "lucide-react";
import type { QuizQuestion } from "../types";

export default function LogicSetsBody() {
  return (
    <>
      <p>
        Math is just <em>extremely careful English</em>. Before we touch a
        single integral or matrix, we need a vocabulary precise enough that
        nobody — not us, not a future reader, not a computer — can
        misinterpret what we wrote down. That vocabulary has two pillars:
        <strong> propositional logic</strong> (the grammar of true/false
        statements) and <strong>set theory</strong> (the grammar of
        collections). Once those click, every later definition in calculus,
        linear algebra, and quantum mechanics is just these two ideas,
        stacked.
      </p>

      <h2>1. Propositions &amp; Connectives</h2>
      <p>
        A <strong>proposition</strong> is any statement that is unambiguously
        true or false. <em>"It is raining"</em> qualifies (in any one
        moment). <em>"This sentence is false"</em> doesn't — it can't be
        assigned a truth value. We use letters like{" "}
        <InlineMath math="P, Q, R" /> as variables that range over{" "}
        <InlineMath math="\{\text{true}, \text{false}\}" />.
      </p>
      <p>
        Five connectives glue propositions together:
      </p>
      <ul>
        <li>
          <strong>NOT</strong> <InlineMath math="\neg P" /> — flips truth.
        </li>
        <li>
          <strong>AND</strong> <InlineMath math="P \land Q" /> — true only
          when <em>both</em> are true.
        </li>
        <li>
          <strong>OR</strong> <InlineMath math="P \lor Q" /> — true when{" "}
          <em>at least one</em> is true (inclusive).
        </li>
        <li>
          <strong>IMPLIES</strong> <InlineMath math="P \Rightarrow Q" /> —
          true unless <InlineMath math="P" /> is true and{" "}
          <InlineMath math="Q" /> is false.
        </li>
        <li>
          <strong>IFF</strong> <InlineMath math="P \Leftrightarrow Q" /> —
          true when both have the same truth value.
        </li>
      </ul>

      <Callout title="Try it">
        Pick a connective and set the truth values of <em>P</em> and{" "}
        <em>Q</em>. The table updates to show every input combination at
        once.
      </Callout>

      <TruthTableWidget />

      <h2>2. Implication: the trickiest one</h2>
      <p>
        Beginners stumble on <InlineMath math="P \Rightarrow Q" /> because
        in everyday English "if-then" suggests a cause. In logic, it's just
        a truth-table bookkeeping rule: an implication is{" "}
        <em>only false when the premise is true and the conclusion is
        false</em>. A false premise makes the whole thing vacuously true:
      </p>
      <BlockMath math="(\text{the moon is cheese}) \Rightarrow (2+2=5) \;\;\equiv\;\; \text{true}" />
      <p>
        Strange, but it's the only definition that makes the algebra of
        proofs work. Two related statements are worth memorising:
      </p>
      <ul>
        <li>
          <strong>Contrapositive</strong>:{" "}
          <InlineMath math="(\lnot Q) \Rightarrow (\lnot P)" /> — logically
          equivalent to <InlineMath math="P \Rightarrow Q" />. Proving the
          contrapositive proves the original.
        </li>
        <li>
          <strong>Converse</strong>:{" "}
          <InlineMath math="Q \Rightarrow P" /> —{" "}
          <em>not</em> the same statement. Confusing the two is the most
          common logic error in undergrad math.
        </li>
      </ul>

      <h2>3. Sets — the vocabulary of math</h2>
      <p>
        A <strong>set</strong> is an unordered collection of distinct
        objects. Two ways to write one:
      </p>
      <BlockMath math="A = \{1, 2, 3\} \qquad B = \{x \in \mathbb{N} : x \text{ is even}\}" />
      <p>
        The colon-version is "set-builder notation": "the set of natural
        numbers <InlineMath math="x" /> such that <InlineMath math="x" /> is
        even." The five sets you'll see most:
      </p>
      <ul>
        <li>
          <InlineMath math="\mathbb{N} = \{1, 2, 3, \dots\}" /> — naturals
        </li>
        <li>
          <InlineMath math="\mathbb{Z} = \{\dots, -1, 0, 1, \dots\}" /> —
          integers
        </li>
        <li>
          <InlineMath math="\mathbb{Q}" /> — rationals (fractions)
        </li>
        <li>
          <InlineMath math="\mathbb{R}" /> — reals
        </li>
        <li>
          <InlineMath math="\mathbb{C}" /> — complex numbers
        </li>
      </ul>
      <p>
        The empty set <InlineMath math="\varnothing = \{\,\}" /> has no
        elements. <InlineMath math="A \subseteq B" /> means every element of{" "}
        <InlineMath math="A" /> is also in <InlineMath math="B" />.
      </p>

      <h2>4. Set operations &amp; Venn diagrams</h2>
      <p>
        The four operations you'll use constantly:
      </p>
      <ul>
        <li>
          <strong>Union</strong> <InlineMath math="A \cup B" /> — elements
          in <InlineMath math="A" /> or <InlineMath math="B" /> (or both).
        </li>
        <li>
          <strong>Intersection</strong> <InlineMath math="A \cap B" /> —
          elements in both.
        </li>
        <li>
          <strong>Difference</strong> <InlineMath math="A \setminus B" /> —
          in <InlineMath math="A" /> but not <InlineMath math="B" />.
        </li>
        <li>
          <strong>Complement</strong> <InlineMath math="A^c" /> — everything
          (in some universe) not in <InlineMath math="A" />.
        </li>
      </ul>

      <Callout title="Try it">
        Tap an operation to see the corresponding region of the Venn
        diagram. Notice how <InlineMath math="A \cup B" /> and{" "}
        <InlineMath math="A \cap B" /> are different in scope.
      </Callout>

      <VennWidget />

      <p>
        Set operations and logical connectives are the same idea in two
        notations: <InlineMath math="\cap \leftrightarrow \land" />,{" "}
        <InlineMath math="\cup \leftrightarrow \lor" />,{" "}
        <InlineMath math="A^c \leftrightarrow \lnot" />. This is the root of{" "}
        <em>Boolean algebra</em>, which is the root of digital logic, which
        is the root of every classical computer.
      </p>

      <h2>5. Functions: <InlineMath math="f : A \to B" /></h2>
      <p>
        A <strong>function</strong> from <InlineMath math="A" /> to{" "}
        <InlineMath math="B" /> assigns to every element of{" "}
        <InlineMath math="A" /> exactly one element of{" "}
        <InlineMath math="B" />. The set <InlineMath math="A" /> is the{" "}
        <em>domain</em>, <InlineMath math="B" /> the <em>codomain</em>. Three
        adjectives describe how a function behaves:
      </p>
      <ul>
        <li>
          <strong>Injective</strong> (one-to-one): different inputs give
          different outputs.
        </li>
        <li>
          <strong>Surjective</strong> (onto): every output in the codomain is
          hit by some input.
        </li>
        <li>
          <strong>Bijective</strong>: both — a perfect pairing. Bijections
          have inverses.
        </li>
      </ul>
      <FunctionTypesIllustration />

      <h2>6. Proofs: the four techniques</h2>
      <p>
        A proof is a finite sequence of statements where each follows from
        the previous ones by a logical rule. Four templates cover almost
        everything you'll write at the undergraduate level.
      </p>
      <h3>Direct proof</h3>
      <p>
        To prove <InlineMath math="P \Rightarrow Q" />, assume{" "}
        <InlineMath math="P" /> and derive <InlineMath math="Q" /> step by
        step. Example: "the sum of two even numbers is even." Let{" "}
        <InlineMath math="m = 2a" />, <InlineMath math="n = 2b" />. Then{" "}
        <InlineMath math="m + n = 2(a+b)" />, which is even. ∎
      </p>
      <h3>Contrapositive</h3>
      <p>
        Instead of <InlineMath math="P \Rightarrow Q" />, prove{" "}
        <InlineMath math="\lnot Q \Rightarrow \lnot P" />. Useful when "not{" "}
        <InlineMath math="Q" />" is concrete and "<InlineMath math="P" />"
        is loose. Example: to prove "if{" "}
        <InlineMath math="n^2" /> is even then <InlineMath math="n" /> is
        even", show the contrapositive: if <InlineMath math="n" /> is odd
        then <InlineMath math="n^2" /> is odd.
      </p>
      <h3>Contradiction</h3>
      <p>
        To prove <InlineMath math="P" />, assume{" "}
        <InlineMath math="\lnot P" /> and derive a contradiction. The
        irrationality of <InlineMath math="\sqrt{2}" /> is the classic
        example.
      </p>
      <h3>Induction</h3>
      <p>
        To prove <InlineMath math="\forall n \in \mathbb{N}, \, P(n)" />:
      </p>
      <ol>
        <li>
          <strong>Base case</strong>: prove <InlineMath math="P(1)" />.
        </li>
        <li>
          <strong>Inductive step</strong>: assume <InlineMath math="P(k)" />,
          prove <InlineMath math="P(k+1)" />.
        </li>
      </ol>
      <p>
        Like dominoes: the first one falls, and each falling one knocks
        over the next.
      </p>

      <h2>7. Why this matters for quantum</h2>
      <p>
        Every later module rests on this chapter. Calculus proves limit
        statements with <InlineMath math="\varepsilon" />–
        <InlineMath math="\delta" /> arguments — implications inside
        implications. Linear algebra defines vector spaces as sets with
        operations satisfying axioms (propositions about equality). And
        quantum mechanics replaces classical truth values{" "}
        <InlineMath math="\{0, 1\}" /> with <em>complex superpositions</em>
        of them — but the algebra of how those superpositions combine is
        still descended from the Boolean algebra you just met.
      </p>
      <p>
        Read this chapter twice. Everything else is built on it.
      </p>
    </>
  );
}

// ────────────────────────────────────────────────────────────
// Widget: Truth-table builder
// ────────────────────────────────────────────────────────────

type Connective = "and" | "or" | "implies" | "iff" | "xor";

const evaluate: Record<Connective, (p: boolean, q: boolean) => boolean> = {
  and: (p, q) => p && q,
  or: (p, q) => p || q,
  implies: (p, q) => !p || q,
  iff: (p, q) => p === q,
  xor: (p, q) => p !== q,
};

const connectiveLabel: Record<Connective, string> = {
  and: "P \\land Q",
  or: "P \\lor Q",
  implies: "P \\Rightarrow Q",
  iff: "P \\Leftrightarrow Q",
  xor: "P \\oplus Q",
};

function TruthTableWidget() {
  const [conn, setConn] = useState<Connective>("and");

  const rows: { p: boolean; q: boolean }[] = [
    { p: true, q: true },
    { p: true, q: false },
    { p: false, q: true },
    { p: false, q: false },
  ];

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2">
        <div className="flex flex-wrap gap-2 mb-4">
          {(["and", "or", "implies", "iff", "xor"] as Connective[]).map((c) => (
            <button
              key={c}
              onClick={() => setConn(c)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                conn === c
                  ? "border-accent-soft bg-ink-800 text-white"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              <InlineMath math={connectiveLabel[c]} />
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-ink-400 text-xs uppercase tracking-widest">
                <th className="text-left font-normal py-2 px-3">P</th>
                <th className="text-left font-normal py-2 px-3">Q</th>
                <th className="text-left font-normal py-2 px-3">
                  <InlineMath math={connectiveLabel[conn]} />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const result = evaluate[conn](r.p, r.q);
                return (
                  <tr key={i} className="border-t border-ink-800">
                    <td className="py-2.5 px-3">
                      <TruthCell value={r.p} />
                    </td>
                    <td className="py-2.5 px-3">
                      <TruthCell value={r.q} />
                    </td>
                    <td className="py-2.5 px-3">
                      <TruthCell value={result} highlight />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <figcaption>Truth table for the selected connective.</figcaption>
    </figure>
  );
}

function TruthCell({ value, highlight }: { value: boolean; highlight?: boolean }) {
  const base = "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono";
  if (value) {
    return (
      <span
        className={`${base} ${
          highlight
            ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40"
            : "bg-ink-800 text-emerald-300"
        }`}
      >
        <Check className="w-3 h-3" /> T
      </span>
    );
  }
  return (
    <span
      className={`${base} ${
        highlight
          ? "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30"
          : "bg-ink-800 text-rose-300"
      }`}
    >
      <X className="w-3 h-3" /> F
    </span>
  );
}

// ────────────────────────────────────────────────────────────
// Widget: Venn diagram with selectable region
// ────────────────────────────────────────────────────────────

type Region = "A" | "B" | "union" | "intersection" | "diffAB" | "diffBA" | "compA" | "symdiff";

const regionMath: Record<Region, string> = {
  A: "A",
  B: "B",
  union: "A \\cup B",
  intersection: "A \\cap B",
  diffAB: "A \\setminus B",
  diffBA: "B \\setminus A",
  compA: "A^c",
  symdiff: "A \\triangle B",
};

const regionLabel: Record<Region, string> = {
  A: "Just A",
  B: "Just B",
  union: "Union",
  intersection: "Intersection",
  diffAB: "A minus B",
  diffBA: "B minus A",
  compA: "Complement of A",
  symdiff: "Symmetric diff.",
};

function VennWidget() {
  const [region, setRegion] = useState<Region>("union");

  const regions: Region[] = [
    "A",
    "B",
    "union",
    "intersection",
    "diffAB",
    "diffBA",
    "compA",
    "symdiff",
  ];

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2">
        <div className="flex flex-wrap gap-2 mb-4">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm border transition ${
                region === r
                  ? "border-accent-soft bg-ink-800 text-white"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
              title={regionLabel[r]}
            >
              <InlineMath math={regionMath[r]} />
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <VennSVG region={region} />
        </div>
        <div className="mt-3 text-center text-sm text-ink-400">
          Highlighted: <InlineMath math={regionMath[region]} />{" "}
          <span className="text-ink-600">— {regionLabel[region]}</span>
        </div>
      </div>
      <figcaption>Venn diagram with the selected region highlighted.</figcaption>
    </figure>
  );
}

function VennSVG({ region }: { region: Region }) {
  // Two circles, A on the left, B on the right
  // SVG masks define which sub-region to highlight in accent colour.
  const acc = "#a78bfa"; // accent-soft
  const inA = "url(#circleA)";
  const inB = "url(#circleB)";

  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-md">
      <defs>
        <clipPath id="circleA">
          <circle cx="125" cy="100" r="70" />
        </clipPath>
        <clipPath id="circleB">
          <circle cx="195" cy="100" r="70" />
        </clipPath>
        <clipPath id="universe">
          <rect x="20" y="25" width="280" height="150" rx="8" />
        </clipPath>
      </defs>

      {/* Universe */}
      <rect
        x="20"
        y="25"
        width="280"
        height="150"
        rx="8"
        fill="rgba(255,255,255,0.02)"
        stroke="#2a2a37"
      />

      {/* Highlights — drawn first, masked into circles, before outlines */}
      <g clipPath="url(#universe)">
        {/* Just A (A \ B) */}
        {(region === "A" || region === "diffAB" || region === "symdiff" || region === "union") && (
          <g clipPath={inA}>
            <rect x="0" y="0" width="320" height="200" fill={acc} fillOpacity="0.35" />
          </g>
        )}
        {/* Just B (B \ A) — overdraw using B clip then mask out intersection if needed */}
        {(region === "B" || region === "diffBA" || region === "symdiff" || region === "union") && (
          <g clipPath={inB}>
            <rect x="0" y="0" width="320" height="200" fill={acc} fillOpacity="0.35" />
          </g>
        )}
        {/* Intersection only — draw both clips, accent shows through where they overlap */}
        {region === "intersection" && (
          <g clipPath={inA}>
            <g clipPath={inB}>
              <rect x="0" y="0" width="320" height="200" fill={acc} fillOpacity="0.6" />
            </g>
          </g>
        )}
        {/* Cover up intersection for "Just A", "Just B", "diff", "symdiff" */}
        {(region === "A" ||
          region === "diffAB" ||
          region === "B" ||
          region === "diffBA" ||
          region === "symdiff") && (
          <g clipPath={inA}>
            <g clipPath={inB}>
              <rect
                x="0"
                y="0"
                width="320"
                height="200"
                fill={
                  region === "symdiff" || region === "diffAB" || region === "diffBA"
                    ? "rgba(12,12,20,1)"
                    : "rgba(12,12,20,1)"
                }
              />
            </g>
          </g>
        )}
        {/* Complement of A: universe minus A */}
        {region === "compA" && (
          <>
            <rect x="20" y="25" width="280" height="150" rx="8" fill={acc} fillOpacity="0.35" />
            <g clipPath={inA}>
              <rect x="0" y="0" width="320" height="200" fill="#0c0c14" />
            </g>
          </>
        )}
      </g>

      {/* Outlines */}
      <circle cx="125" cy="100" r="70" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
      <circle cx="195" cy="100" r="70" fill="none" stroke="#22d3ee" strokeWidth="1.5" />

      {/* Labels */}
      <text x="70" y="50" fill="#a78bfa" fontSize="14" fontStyle="italic">
        A
      </text>
      <text x="245" y="50" fill="#22d3ee" fontSize="14" fontStyle="italic">
        B
      </text>
      <text x="285" y="42" fill="#6e6e80" fontSize="11">
        U
      </text>
    </svg>
  );
}

// ────────────────────────────────────────────────────────────
// Static illustration: function types
// ────────────────────────────────────────────────────────────

function FunctionTypesIllustration() {
  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FuncDiagram
          title="Injective"
          subtitle="one-to-one"
          pairs={[
            [0, 0],
            [1, 1],
            [2, 2],
          ]}
          rightExtra={1}
        />
        <FuncDiagram
          title="Surjective"
          subtitle="onto"
          pairs={[
            [0, 0],
            [1, 0],
            [2, 1],
            [3, 2],
          ]}
          rightExtra={0}
        />
        <FuncDiagram
          title="Bijective"
          subtitle="invertible"
          pairs={[
            [0, 0],
            [1, 1],
            [2, 2],
          ]}
          rightExtra={0}
        />
      </div>
      <figcaption>
        Three flavours of functions <InlineMath math="f : A \to B" />. Dots
        on the left are <em>A</em>; dots on the right are <em>B</em>.
      </figcaption>
    </figure>
  );
}

function FuncDiagram({
  title,
  subtitle,
  pairs,
  rightExtra,
}: {
  title: string;
  subtitle: string;
  pairs: [number, number][];
  rightExtra: number;
}) {
  const leftDots = Math.max(...pairs.map((p) => p[0])) + 1;
  const rightDots = Math.max(...pairs.map((p) => p[1])) + 1 + rightExtra;
  const w = 180;
  const h = 150;
  const lx = 40;
  const rx = w - 40;
  const yFor = (i: number, total: number) =>
    20 + (i + 0.5) * ((h - 40) / total);

  return (
    <div className="text-center">
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-ink-500">{subtitle}</div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full mt-1">
        {pairs.map(([a, b], i) => (
          <line
            key={i}
            x1={lx}
            y1={yFor(a, leftDots)}
            x2={rx}
            y2={yFor(b, rightDots)}
            stroke="#a78bfa"
            strokeWidth="1.2"
            strokeOpacity="0.8"
          />
        ))}
        {Array.from({ length: leftDots }).map((_, i) => (
          <circle key={`l${i}`} cx={lx} cy={yFor(i, leftDots)} r={4} fill="#a78bfa" />
        ))}
        {Array.from({ length: rightDots }).map((_, i) => (
          <circle key={`r${i}`} cx={rx} cy={yFor(i, rightDots)} r={4} fill="#22d3ee" />
        ))}
      </svg>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Callout
// ────────────────────────────────────────────────────────────

function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="my-5 border-l-2 border-accent/60 pl-4 py-1 text-sm text-ink-300">
      <div className="text-[11px] uppercase tracking-widest text-accent-soft mb-1">
        {title}
      </div>
      <div>{children}</div>
    </aside>
  );
}

// ────────────────────────────────────────────────────────────
// Quiz
// ────────────────────────────────────────────────────────────

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "Which connective is true only when both inputs are true and false in every other case?",
    options: [
      "$P \\lor Q$",
      "$P \\land Q$",
      "$P \\Rightarrow Q$",
      "$P \\oplus Q$",
    ],
    correct: 1,
    explanation:
      "AND ($\\land$) is true only on the row $P=T, Q=T$. Every other row is false.",
  },
  {
    prompt:
      "The implication $P \\Rightarrow Q$ is **false** in exactly which case?",
    options: [
      "$P$ true, $Q$ true",
      "$P$ true, $Q$ false",
      "$P$ false, $Q$ true",
      "$P$ false, $Q$ false",
    ],
    correct: 1,
    explanation:
      "An implication is only false when a true premise leads to a false conclusion. All three other rows are true (the last two are 'vacuously' true).",
  },
  {
    prompt: "Which statement is logically equivalent to $P \\Rightarrow Q$?",
    options: [
      "$Q \\Rightarrow P$",
      "$\\lnot P \\Rightarrow \\lnot Q$",
      "$\\lnot Q \\Rightarrow \\lnot P$",
      "$P \\land \\lnot Q$",
    ],
    correct: 2,
    explanation:
      "The contrapositive $\\lnot Q \\Rightarrow \\lnot P$ has the exact same truth table as $P \\Rightarrow Q$. The first option is the converse — different statement.",
  },
  {
    prompt:
      "Let $A = \\{1, 2, 3\\}$ and $B = \\{2, 3, 4\\}$. What is $A \\setminus B$?",
    options: [
      "$\\{1\\}$",
      "$\\{2, 3\\}$",
      "$\\{1, 2, 3, 4\\}$",
      "$\\{4\\}$",
    ],
    correct: 0,
    explanation:
      "$A \\setminus B$ is 'in $A$ but not in $B$'. Only 1 is in $A$ and absent from $B$.",
  },
  {
    prompt:
      "A function $f : A \\to B$ is called **bijective** when…",
    options: [
      "every input maps to a different output",
      "every output is hit by some input",
      "both of the above",
      "$A$ and $B$ have the same number of elements",
    ],
    correct: 2,
    explanation:
      "Bijective = injective (one-to-one) AND surjective (onto). For finite sets this also forces $|A| = |B|$, but the definition is the combined behaviour, not the cardinality.",
  },
];
