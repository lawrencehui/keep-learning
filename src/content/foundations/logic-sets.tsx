import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { Check, X } from "lucide-react";
import {
  ReferenceResources,
  Callout,
  Exercise,
  Pitfall,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function LogicSetsBody() {
  return (
    <>
      <p>
        Mathematics is just <em>extremely careful English</em>. Before we
        touch a single integral, matrix, or quantum state, we need a
        vocabulary precise enough that nobody — not us, not a future reader
        of our work, not a computer — can misinterpret what we wrote down.
        That vocabulary has two pillars: <strong>propositional logic</strong>{" "}
        (the grammar of true/false statements) and{" "}
        <strong>set theory</strong> (the grammar of collections). Once those
        click, every later definition in calculus, linear algebra, and
        quantum mechanics is just these two ideas, stacked.
      </p>

      <p>
        Plan to spend a couple of hours here, with a notebook open. Most
        people skim this chapter the first time and bounce off it later
        when an{" "}
        <InlineMath math="\varepsilon" />–<InlineMath math="\delta" />{" "}
        argument or a measure-theory definition refuses to make sense. The
        fix is always to come back to this material and read it{" "}
        <em>slowly</em>. Examples here, exercises with revealed solutions,
        and small pitfalls to watch for. Quiz at the end.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 6.042J — Mathematics for Computer Science",
            author: "Lehman, Leighton, Meyer (MIT OCW)",
            duration: "~24h, full lectures + notes",
            url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/",
            note: "Lectures 1–4 cover everything in this chapter, in roughly the same order. Free and authoritative.",
          },
          {
            title: "Discrete Math (full playlist)",
            author: "TrevTutor",
            duration: "~10h",
            url: "https://www.youtube.com/playlist?list=PLDDGPdw7e6Ag1EIznZ-m-qXu4XX3A0cIz",
            note: "Friendly pace. Good while walking — the visuals are nice but rarely essential.",
          },
          {
            title: "How to Prove It — companion lectures",
            author: "Daniel Velleman / various uploaders",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=how+to+prove+it+velleman+lectures",
            note: "Pairs with the Velleman book if you want a deeper proofs-only run.",
          },
          {
            title: "What is mathematical proof?",
            author: "3Blue1Brown",
            duration: "23 min",
            url: "https://www.youtube.com/watch?v=AmgkSdhK4K8",
            note: "A taste; not a full course but a great motivator for why proofs matter.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Propositions and connectives</h2>

      <p>
        A <strong>proposition</strong> is any sentence that is unambiguously
        true or false. Three rough tests:
      </p>
      <ul>
        <li>"7 is prime." — true. ✓ proposition.</li>
        <li>"Every even number greater than 2 is the sum of two primes." — we don't know yet (Goldbach), but it has a definite truth value. ✓ proposition.</li>
        <li>"Hello!" — not declarative. ✗ not a proposition.</li>
        <li>"This sentence is false." — paradox: can't be assigned a truth value consistently. ✗ not a proposition.</li>
        <li>"<InlineMath math="x + 1 > 3" />." — depends on <InlineMath math="x" />. By itself, it's an <em>open sentence</em>, not a proposition. (We'll fix this with quantifiers below.)</li>
      </ul>
      <p>
        We use letters <InlineMath math="P, Q, R" /> as variables that range
        over <InlineMath math="\{\text{true}, \text{false}\}" />. Five
        connectives glue propositions together:
      </p>

      <ul>
        <li>
          <strong>NOT</strong> <InlineMath math="\neg P" /> ("not P") flips
          the truth value.
        </li>
        <li>
          <strong>AND</strong> <InlineMath math="P \land Q" /> ("P and Q")
          is true only when <em>both</em> are true.
        </li>
        <li>
          <strong>OR</strong> <InlineMath math="P \lor Q" /> ("P or Q") is
          true when <em>at least one</em> is true. Note: this is the{" "}
          <em>inclusive</em> or — "P or Q or both."
        </li>
        <li>
          <strong>IMPLIES</strong> <InlineMath math="P \Rightarrow Q" />{" "}
          ("if P then Q") is true unless <InlineMath math="P" /> is true and{" "}
          <InlineMath math="Q" /> is false.
        </li>
        <li>
          <strong>IFF</strong> <InlineMath math="P \Leftrightarrow Q" />{" "}
          ("P if and only if Q") is true when both sides agree.
        </li>
      </ul>

      <p>
        A <strong>truth table</strong> spells out the value of an expression
        on every combination of inputs. With <InlineMath math="n" /> input
        variables you get <InlineMath math="2^n" /> rows. Two variables = 4
        rows; three = 8; ten = 1024. Truth tables are the brute-force
        weapon of propositional logic — slow, but they will{" "}
        <em>always</em> resolve a question about whether two expressions
        are logically equivalent.
      </p>

      <Callout title="Try it">
        Pick a connective and the table fills in for both inputs at once.
        Notice that <em>OR</em> has only one false row, while <em>AND</em>{" "}
        has only one true row. They're mirror images of each other.
      </Callout>

      <TruthTableWidget />

      <h3>Tautologies, contradictions, contingencies</h3>
      <p>
        A <strong>tautology</strong> is a compound statement that's true on
        every row of its truth table. The simplest is{" "}
        <InlineMath math="P \lor \neg P" /> — "the law of the excluded
        middle." A <strong>contradiction</strong> is the opposite: false on
        every row, e.g. <InlineMath math="P \land \neg P" />. Anything
        in-between is a <strong>contingency</strong> — its value depends on
        the inputs.
      </p>
      <p>
        We say two expressions are <strong>logically equivalent</strong>,
        written <InlineMath math="\equiv" />, when their truth tables are
        identical. The most useful equivalences become tools for
        re-shaping proofs:
      </p>
      <BlockMath math="P \Rightarrow Q \;\equiv\; \neg P \lor Q." />
      <p>
        That single re-write is responsible for half the tricks in real
        analysis. If we read it aloud: "<em>P implies Q</em> means exactly{" "}
        <em>not-P, or Q</em>." When you're stuck on an implication, try
        rewriting it as a disjunction.
      </p>

      <Exercise
        number="1.1"
        prompt={
          <>
            Build the truth table for{" "}
            <InlineMath math="(P \Rightarrow Q) \land (Q \Rightarrow P)" />.
            Show it equals <InlineMath math="P \Leftrightarrow Q" />.
          </>
        }
      >
        <p>
          Four rows. <InlineMath math="P \Rightarrow Q" /> is false only
          when <InlineMath math="P" /> is true and <InlineMath math="Q" />{" "}
          is false; <InlineMath math="Q \Rightarrow P" /> is false only
          when <InlineMath math="Q" /> is true and <InlineMath math="P" />{" "}
          is false. The conjunction is true only when{" "}
          <em>both</em> implications are true — which is exactly the rows{" "}
          <InlineMath math="P=T,\,Q=T" /> and <InlineMath math="P=F,\,Q=F" />
          . Those are the same rows where{" "}
          <InlineMath math="P \Leftrightarrow Q" /> is true. ∎
        </p>
        <p>
          That's why mathematicians often say "iff" instead of writing two
          implications: the abbreviation is literally what the symbol
          means.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The implication trap</h2>

      <p>
        Beginners stumble on <InlineMath math="P \Rightarrow Q" /> because
        in everyday English "if-then" suggests a <em>cause</em>. In logic
        it's just truth-table bookkeeping. Look at the four rows:
      </p>
      <BlockMath math="\begin{array}{cc|c} P & Q & P \Rightarrow Q \\ \hline T & T & T \\ T & F & F \\ F & T & T \\ F & F & T \end{array}" />
      <p>
        The only false row is <em>true premise, false conclusion</em>. When
        the premise is false, the implication is{" "}
        <strong>vacuously true</strong> regardless of the conclusion:
      </p>
      <BlockMath math="(\text{the moon is made of cheese}) \Rightarrow (2+2=5) \;\;\equiv\;\; \text{true}." />
      <p>
        That feels wrong on first encounter. The justification is purely
        algebraic: this is the only definition that makes implications
        compose properly with the other connectives. If we used any other
        rule, basic theorems of logic (like "if{" "}
        <InlineMath math="P \Rightarrow Q" /> and{" "}
        <InlineMath math="Q \Rightarrow R" />, then{" "}
        <InlineMath math="P \Rightarrow R" />") would fail.
      </p>

      <h3>Contrapositive, converse, inverse</h3>
      <p>
        Three statements get spun off from any implication{" "}
        <InlineMath math="P \Rightarrow Q" />. Memorise which is which.
      </p>
      <ul>
        <li>
          <strong>Contrapositive</strong>:{" "}
          <InlineMath math="\neg Q \Rightarrow \neg P" />. <em>Logically
          equivalent</em> to the original. Proving the contrapositive
          proves the original.
        </li>
        <li>
          <strong>Converse</strong>:{" "}
          <InlineMath math="Q \Rightarrow P" />. <em>Different statement</em>
          . Sometimes true, often not.
        </li>
        <li>
          <strong>Inverse</strong>:{" "}
          <InlineMath math="\neg P \Rightarrow \neg Q" />. Logically
          equivalent to the converse, hence also a different statement
          from the original.
        </li>
      </ul>

      <p>
        Example. "If a number is divisible by 6, then it is divisible by
        3." (True.)
      </p>
      <ul>
        <li>
          Contrapositive: "If a number is not divisible by 3, then it is
          not divisible by 6." (Also true — same statement.)
        </li>
        <li>
          Converse: "If a number is divisible by 3, then it is divisible
          by 6." (False — 9 is divisible by 3 but not 6.)
        </li>
        <li>
          Inverse: "If a number is not divisible by 6, then it is not
          divisible by 3." (False — 9 is a counterexample again.)
        </li>
      </ul>

      <Pitfall>
        Confusing converse with original is the single most common logic
        error in undergrad math. "All primes greater than 2 are odd" is
        true; "all odd numbers greater than 2 are prime" is wildly false
        (9, 15, 21, 25…). Same words, swapped. Always check.
      </Pitfall>

      <Exercise
        number="2.1"
        prompt={
          <>
            Use the equivalence{" "}
            <InlineMath math="P \Rightarrow Q \equiv \neg P \lor Q" /> to
            verify that the contrapositive{" "}
            <InlineMath math="\neg Q \Rightarrow \neg P" /> matches.
          </>
        }
      >
        <p>
          By the equivalence,{" "}
          <InlineMath math="\neg Q \Rightarrow \neg P \;\equiv\; \neg(\neg Q) \lor \neg P \;\equiv\; Q \lor \neg P" />
          . Reordering the disjunction (OR is commutative):{" "}
          <InlineMath math="\neg P \lor Q" />. And{" "}
          <InlineMath math="P \Rightarrow Q \equiv \neg P \lor Q" /> by the
          same identity. They agree. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Quantifiers</h2>

      <p>
        Open sentences like "<InlineMath math="x + 1 > 3" />" aren't
        propositions — they have a free variable. We close them with{" "}
        <strong>quantifiers</strong>. Two are essential:
      </p>
      <ul>
        <li>
          <InlineMath math="\forall x \in S, \, P(x)" /> — "<em>for all</em>{" "}
          <InlineMath math="x" /> in <InlineMath math="S" />,{" "}
          <InlineMath math="P(x)" /> holds." The universal quantifier.
        </li>
        <li>
          <InlineMath math="\exists x \in S, \, P(x)" /> — "<em>there exists</em>
          {" "}an <InlineMath math="x" /> in <InlineMath math="S" /> such
          that <InlineMath math="P(x)" /> holds." The existential
          quantifier.
        </li>
      </ul>

      <p>
        Examples:
      </p>
      <BlockMath math="\forall n \in \mathbb{N},\; n^2 \geq n" />
      <p>"Every natural number is at most its own square." True (for naturals starting at 1; you can pick a convention for 0 either way).</p>
      <BlockMath math="\exists x \in \mathbb{R},\; x^2 = 2" />
      <p>
        "There is a real number whose square is 2." True — namely{" "}
        <InlineMath math="\sqrt{2}" />. Note the same statement is{" "}
        <em>false</em> if we restrict to <InlineMath math="\mathbb{Q}" />,
        which is exactly why we need <InlineMath math="\mathbb{R}" />.
      </p>

      <h3>Negating quantifiers</h3>
      <p>
        Negation flips quantifiers and slides past:
      </p>
      <BlockMath math="\neg(\forall x,\; P(x)) \;\equiv\; \exists x,\; \neg P(x)." />
      <BlockMath math="\neg(\exists x,\; P(x)) \;\equiv\; \forall x,\; \neg P(x)." />
      <p>
        In English: "not every <InlineMath math="x" /> satisfies{" "}
        <InlineMath math="P" />" means exactly "<em>some</em>{" "}
        <InlineMath math="x" /> fails <InlineMath math="P" />". And "no{" "}
        <InlineMath math="x" /> satisfies <InlineMath math="P" />" means "
        <em>every</em> <InlineMath math="x" /> fails <InlineMath math="P" />."
        These are the engine of disproof: to refute a "for all" statement,
        produce a single counterexample.
      </p>

      <h3>Order of quantifiers matters</h3>
      <p>
        Watch this carefully. The two statements below look almost
        identical but they say different things:
      </p>
      <BlockMath math="(\text{A})\;\;\;\forall x \in \mathbb{R},\; \exists y \in \mathbb{R},\; y > x." />
      <BlockMath math="(\text{B})\;\;\;\exists y \in \mathbb{R},\; \forall x \in \mathbb{R},\; y > x." />
      <p>
        (A) is true: for every <InlineMath math="x" />, the number{" "}
        <InlineMath math="y = x + 1" /> works. (B) is false: it would
        require a single <InlineMath math="y" /> that is greater than{" "}
        <em>every</em> real number, and no such <InlineMath math="y" /> exists.
        Same words, different order, opposite truth values.
      </p>

      <Pitfall>
        When reading definitions in real analysis ("for every{" "}
        <InlineMath math="\varepsilon > 0" />, there exists{" "}
        <InlineMath math="\delta > 0" />…"), the order of the quantifiers
        is the entire content of the definition. Swapping them turns
        "continuous" into "uniformly continuous" — a strictly stronger
        condition.
      </Pitfall>

      <Exercise
        number="3.1"
        prompt={
          <>
            Negate, in plain English: "every student in the room speaks
            French."
          </>
        }
      >
        <p>
          The original is{" "}
          <InlineMath math="\forall s,\; \text{French}(s)" />. The
          negation is <InlineMath math="\exists s,\; \neg\text{French}(s)" /> —
          "there is a student in the room who does not speak French." Note
          we did <em>not</em> negate to "no student in the room speaks
          French" — that's a strictly stronger statement.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · De Morgan's laws</h2>

      <p>
        These two equivalences are used so often that you should be able
        to write them in your sleep:
      </p>
      <BlockMath math="\neg(P \land Q) \;\equiv\; (\neg P) \lor (\neg Q)." />
      <BlockMath math="\neg(P \lor Q) \;\equiv\; (\neg P) \land (\neg Q)." />
      <p>
        In words: pushing a "not" past an AND turns it into an OR (and
        vice versa). The connectives <em>flip</em> when negation crosses
        them. Verify by truth table — both have the same four rows.
      </p>
      <p>
        The set-theoretic versions, which we'll meet again in a moment:
      </p>
      <BlockMath math="(A \cap B)^c = A^c \cup B^c, \qquad (A \cup B)^c = A^c \cap B^c." />

      <p>
        And the quantifier versions you saw above are also De Morgan's
        laws — they're the same idea applied to infinite ANDs and ORs:
      </p>
      <BlockMath math="\neg(\forall x,\;P(x)) \equiv \exists x,\;\neg P(x)" />
      <BlockMath math="\neg(\exists x,\;P(x)) \equiv \forall x,\;\neg P(x)" />

      <Exercise
        number="4.1"
        prompt={
          <>
            Simplify <InlineMath math="\neg((P \land Q) \lor (\neg R))" />{" "}
            into a positive form (no negation outside parentheses).
          </>
        }
      >
        <p>
          Apply De Morgan to the outer OR:{" "}
          <InlineMath math="\neg(P \land Q) \land \neg(\neg R)" />. The
          double negation collapses:{" "}
          <InlineMath math="\neg(P \land Q) \land R" />. Apply De Morgan to
          the inner AND:{" "}
          <InlineMath math="(\neg P \lor \neg Q) \land R" />. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Sets — the vocabulary of math</h2>

      <p>
        A <strong>set</strong> is an unordered collection of distinct
        objects, called its <strong>elements</strong>. We write{" "}
        <InlineMath math="x \in A" /> for "<InlineMath math="x" /> is an
        element of <InlineMath math="A" />" and{" "}
        <InlineMath math="x \notin A" /> for the negation. Two notations
        define a set:
      </p>
      <BlockMath math="A = \{1, 2, 3\}, \qquad B = \{x \in \mathbb{N} : x \text{ is even}\}." />
      <p>
        The first is enumeration. The second is{" "}
        <strong>set-builder notation</strong>: read it "the set of natural{" "}
        <InlineMath math="x" /> such that <InlineMath math="x" /> is even."
        The colon (sometimes a vertical bar{" "}
        <InlineMath math="|" />) separates the variable from the
        condition.
      </p>

      <h3>Number sets you will see constantly</h3>
      <ul>
        <li>
          <InlineMath math="\mathbb{N} = \{1, 2, 3, \dots\}" /> — natural
          numbers (sometimes including 0; conventions vary).
        </li>
        <li>
          <InlineMath math="\mathbb{Z} = \{\dots, -2, -1, 0, 1, 2, \dots\}" /> —
          integers (German <em>Zahlen</em>).
        </li>
        <li>
          <InlineMath math="\mathbb{Q}" /> — rationals,{" "}
          <InlineMath math="\{p/q : p, q \in \mathbb{Z},\, q \neq 0\}" />.
        </li>
        <li>
          <InlineMath math="\mathbb{R}" /> — reals. Includes irrationals
          like <InlineMath math="\sqrt{2}" /> and <InlineMath math="\pi" />.
        </li>
        <li>
          <InlineMath math="\mathbb{C}" /> — complex numbers,{" "}
          <InlineMath math="\{a + bi : a, b \in \mathbb{R}\}" /> where{" "}
          <InlineMath math="i^2 = -1" />.
        </li>
      </ul>
      <p>
        Each is contained in the next:{" "}
        <InlineMath math="\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}" />
        . Quantum mechanics will live in <InlineMath math="\mathbb{C}" />,
        so seeing "complex" in a definition shouldn't make you flinch — it's
        just the most flexible of the five.
      </p>

      <h3>Subsets, equality, the empty set</h3>
      <p>
        <InlineMath math="A \subseteq B" /> means every element of{" "}
        <InlineMath math="A" /> is also in <InlineMath math="B" />. We
        write <InlineMath math="A \subset B" /> or{" "}
        <InlineMath math="A \subsetneq B" /> for "proper subset" (i.e.{" "}
        <InlineMath math="A \subseteq B" /> and{" "}
        <InlineMath math="A \neq B" />). Two sets are equal,{" "}
        <InlineMath math="A = B" />, exactly when{" "}
        <InlineMath math="A \subseteq B" /> and{" "}
        <InlineMath math="B \subseteq A" /> — this "double-inclusion" is
        the canonical way to prove set equality.
      </p>
      <p>
        The <strong>empty set</strong>, written <InlineMath math="\varnothing" />{" "}
        or <InlineMath math="\{\}" />, has no elements. It is a subset of
        every set (vacuously: there's nothing in <InlineMath math="\varnothing" /> to
        fail the test).
      </p>

      <h3>Power sets and Cartesian products</h3>
      <p>
        The <strong>power set</strong> of <InlineMath math="A" />, written{" "}
        <InlineMath math="\mathcal{P}(A)" /> or <InlineMath math="2^A" />,
        is the set of all subsets of <InlineMath math="A" />. For{" "}
        <InlineMath math="A = \{1, 2\}" />:
      </p>
      <BlockMath math="\mathcal{P}(A) = \{\,\varnothing,\; \{1\},\; \{2\},\; \{1, 2\}\,\}." />
      <p>
        If <InlineMath math="|A| = n" />, then{" "}
        <InlineMath math="|\mathcal{P}(A)| = 2^n" /> — every element is
        independently in or out of a subset, giving{" "}
        <InlineMath math="2 \cdot 2 \cdots 2 = 2^n" /> choices. (That's
        why some authors write <InlineMath math="2^A" /> for the power
        set.)
      </p>

      <p>
        The <strong>Cartesian product</strong>{" "}
        <InlineMath math="A \times B" /> is the set of ordered pairs:
      </p>
      <BlockMath math="A \times B = \{ (a, b) : a \in A,\, b \in B \}." />
      <p>
        Order matters here: <InlineMath math="(1, 2) \neq (2, 1)" />. If{" "}
        <InlineMath math="A = \{1, 2\}" /> and{" "}
        <InlineMath math="B = \{x, y, z\}" />, then{" "}
        <InlineMath math="A \times B" /> has{" "}
        <InlineMath math="2 \times 3 = 6" /> elements. The plane{" "}
        <InlineMath math="\mathbb{R}^2 = \mathbb{R} \times \mathbb{R}" /> is
        a Cartesian product. So is a database table, where each row is a
        tuple in the product of the column types.
      </p>

      <Exercise
        number="5.1"
        prompt={
          <>
            List <InlineMath math="\mathcal{P}(\mathcal{P}(\{1\}))" />.
          </>
        }
      >
        <p>
          <InlineMath math="\mathcal{P}(\{1\}) = \{\varnothing, \{1\}\}" />,
          so its own power set is the set of subsets of{" "}
          <InlineMath math="\{\varnothing, \{1\}\}" />:
        </p>
        <BlockMath math="\{\,\varnothing,\; \{\varnothing\},\; \{\{1\}\},\; \{\varnothing, \{1\}\}\,\}." />
        <p>Four elements, as expected (<InlineMath math="2^2 = 4" />).</p>
      </Exercise>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Set operations &amp; Venn diagrams</h2>

      <p>
        The four basic operations on sets:
      </p>
      <ul>
        <li>
          <strong>Union</strong>{" "}
          <InlineMath math="A \cup B = \{x : x \in A \,\lor\, x \in B\}" />.
        </li>
        <li>
          <strong>Intersection</strong>{" "}
          <InlineMath math="A \cap B = \{x : x \in A \,\land\, x \in B\}" />.
        </li>
        <li>
          <strong>Difference</strong>{" "}
          <InlineMath math="A \setminus B = \{x : x \in A \,\land\, x \notin B\}" />.
        </li>
        <li>
          <strong>Complement</strong>{" "}
          <InlineMath math="A^c = U \setminus A" />, where{" "}
          <InlineMath math="U" /> is the universe in context.
        </li>
      </ul>

      <p>
        Look at those definitions side-by-side with the connectives. Union
        is OR, intersection is AND, complement is NOT. This isn't a
        coincidence — the operations on sets and the connectives on
        propositions form the same algebraic structure, called a{" "}
        <strong>Boolean algebra</strong>. Every identity that holds for
        connectives translates to one for sets, and vice versa.
      </p>

      <Callout title="Try it">
        Tap an operation. Notice how <InlineMath math="A \cup B" />{" "}
        highlights everything that's in either circle, while{" "}
        <InlineMath math="A \cap B" /> highlights only the lens-shape
        where they overlap.
      </Callout>

      <VennWidget />

      <h3>Useful identities</h3>
      <p>
        These look obvious in a Venn diagram but you'll want to be fluent
        in the symbolic versions too. Each can be proved by checking
        elements (show LHS ⊆ RHS and RHS ⊆ LHS).
      </p>
      <ul>
        <li>
          Commutativity:{" "}
          <InlineMath math="A \cup B = B \cup A,\;\; A \cap B = B \cap A" />.
        </li>
        <li>
          Associativity:{" "}
          <InlineMath math="(A \cup B) \cup C = A \cup (B \cup C)" />.
        </li>
        <li>
          Distributivity:{" "}
          <InlineMath math="A \cap (B \cup C) = (A \cap B) \cup (A \cap C)" />.
        </li>
        <li>
          De Morgan's:{" "}
          <InlineMath math="(A \cup B)^c = A^c \cap B^c,\;\; (A \cap B)^c = A^c \cup B^c" />.
        </li>
      </ul>

      <Exercise
        number="6.1"
        prompt={
          <>
            Prove that{" "}
            <InlineMath math="A \cap (B \cup C) = (A \cap B) \cup (A \cap C)" />{" "}
            by showing both inclusions.
          </>
        }
      >
        <p>
          <strong>(⊆)</strong> Suppose <InlineMath math="x \in A \cap (B \cup C)" />.
          Then <InlineMath math="x \in A" /> and <InlineMath math="x \in B \cup C" />,
          so <InlineMath math="x \in B" /> or <InlineMath math="x \in C" />.
          Case 1: if <InlineMath math="x \in B" />, then{" "}
          <InlineMath math="x \in A \cap B" />. Case 2: if{" "}
          <InlineMath math="x \in C" />, then{" "}
          <InlineMath math="x \in A \cap C" />. Either way{" "}
          <InlineMath math="x \in (A \cap B) \cup (A \cap C)" />.
        </p>
        <p>
          <strong>(⊇)</strong> Suppose{" "}
          <InlineMath math="x \in (A \cap B) \cup (A \cap C)" />. Then{" "}
          <InlineMath math="x \in A \cap B" /> or{" "}
          <InlineMath math="x \in A \cap C" />. In either case{" "}
          <InlineMath math="x \in A" />, and{" "}
          <InlineMath math="x \in B" /> or <InlineMath math="x \in C" />,
          so <InlineMath math="x \in A \cap (B \cup C)" />. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Functions: <InlineMath math="f : A \to B" /></h2>

      <p>
        A <strong>function</strong> from <InlineMath math="A" /> to{" "}
        <InlineMath math="B" /> assigns to every{" "}
        <InlineMath math="a \in A" /> exactly one{" "}
        <InlineMath math="f(a) \in B" />. The set <InlineMath math="A" />{" "}
        is the <strong>domain</strong>; <InlineMath math="B" /> is the{" "}
        <strong>codomain</strong>; the <strong>image</strong> (or{" "}
        <em>range</em>) of <InlineMath math="f" /> is the actual set of
        outputs:
      </p>
      <BlockMath math="\operatorname{im}(f) = \{ f(a) : a \in A \} \subseteq B." />
      <p>
        Crucially, the codomain and image can differ. The function{" "}
        <InlineMath math="f : \mathbb{R} \to \mathbb{R}" /> defined by{" "}
        <InlineMath math="f(x) = x^2" /> has codomain{" "}
        <InlineMath math="\mathbb{R}" /> but image{" "}
        <InlineMath math="[0, \infty)" />.
      </p>

      <h3>Three flavours</h3>
      <ul>
        <li>
          <strong>Injective</strong> (one-to-one): different inputs always
          give different outputs. Symbolically{" "}
          <InlineMath math="f(a_1) = f(a_2) \Rightarrow a_1 = a_2" />.
        </li>
        <li>
          <strong>Surjective</strong> (onto): every element of the
          codomain is hit by some input. Symbolically{" "}
          <InlineMath math="\forall b \in B,\; \exists a \in A,\; f(a) = b" />.
        </li>
        <li>
          <strong>Bijective</strong>: both. Bijections have inverses.
        </li>
      </ul>

      <FunctionTypesIllustration />

      <p>
        Inverses only exist for bijections. If <InlineMath math="f" /> is
        bijective, the inverse <InlineMath math="f^{-1}" /> satisfies{" "}
        <InlineMath math="f^{-1}(f(a)) = a" /> for all{" "}
        <InlineMath math="a" /> and{" "}
        <InlineMath math="f(f^{-1}(b)) = b" /> for all{" "}
        <InlineMath math="b" />. Composition with the inverse on either
        side gives the identity function.
      </p>

      <h3>Composition</h3>
      <p>
        Given <InlineMath math="g : A \to B" /> and{" "}
        <InlineMath math="f : B \to C" />, their composition is{" "}
        <InlineMath math="(f \circ g)(x) = f(g(x))" />, and{" "}
        <InlineMath math="f \circ g : A \to C" />. Composition is
        associative, but{" "}
        <em>not commutative</em>:{" "}
        <InlineMath math="f \circ g \neq g \circ f" /> in general. (If{" "}
        <InlineMath math="f(x) = x + 1" /> and{" "}
        <InlineMath math="g(x) = 2x" />, then{" "}
        <InlineMath math="f(g(x)) = 2x + 1" /> but{" "}
        <InlineMath math="g(f(x)) = 2x + 2" />.)
      </p>

      <Exercise
        number="7.1"
        prompt={
          <>
            Is <InlineMath math="f : \mathbb{Z} \to \mathbb{Z}" /> defined
            by <InlineMath math="f(n) = 2n" /> injective? Surjective?
          </>
        }
      >
        <p>
          <strong>Injective:</strong> yes. If{" "}
          <InlineMath math="f(n_1) = f(n_2)" />, then{" "}
          <InlineMath math="2n_1 = 2n_2" />, so{" "}
          <InlineMath math="n_1 = n_2" />.
        </p>
        <p>
          <strong>Surjective:</strong> no. The image is the even integers,
          missing every odd integer in the codomain. So{" "}
          <InlineMath math="f" /> is injective but not surjective — hence
          not bijective. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Equivalence relations</h2>

      <p>
        A <strong>relation</strong> on a set <InlineMath math="A" /> is
        any subset of <InlineMath math="A \times A" />. We write{" "}
        <InlineMath math="a \sim b" /> when the pair{" "}
        <InlineMath math="(a, b)" /> belongs to the relation. A relation{" "}
        <InlineMath math="\sim" /> is an{" "}
        <strong>equivalence relation</strong> if it satisfies all three of
        the following, for all <InlineMath math="a, b, c \in A" />:
      </p>
      <ol>
        <li>
          <strong>Reflexive</strong>: <InlineMath math="a \sim a" />.
        </li>
        <li>
          <strong>Symmetric</strong>:{" "}
          <InlineMath math="a \sim b \Rightarrow b \sim a" />.
        </li>
        <li>
          <strong>Transitive</strong>:{" "}
          <InlineMath math="(a \sim b) \land (b \sim c) \Rightarrow a \sim c" />.
        </li>
      </ol>
      <p>
        Equality is the prototypical equivalence relation. So is "has the
        same birthday as" on the set of humans, "is congruent to mod{" "}
        <InlineMath math="n" />" on integers, and "is similar to" on
        triangles.
      </p>

      <p>
        Given an equivalence relation, the{" "}
        <strong>equivalence class</strong> of <InlineMath math="a" /> is
      </p>
      <BlockMath math="[a] = \{ x \in A : x \sim a \}." />
      <p>
        Equivalence classes <em>partition</em> <InlineMath math="A" />:
        every element of <InlineMath math="A" /> sits in exactly one
        class, and the union of the classes is all of{" "}
        <InlineMath math="A" />. The set of classes is called the{" "}
        <strong>quotient set</strong>, written{" "}
        <InlineMath math="A / \sim" />.
      </p>

      <p>
        This isn't abstract for its own sake — modular arithmetic{" "}
        <InlineMath math="\mathbb{Z}/n\mathbb{Z}" />, used everywhere in
        cryptography, is exactly the quotient of{" "}
        <InlineMath math="\mathbb{Z}" /> by congruence mod{" "}
        <InlineMath math="n" />. The set of integers gets compressed into
        only <InlineMath math="n" /> classes:{" "}
        <InlineMath math="[0], [1], \dots, [n-1]" />. Addition and
        multiplication still work, and that's the basis for RSA.
      </p>

      <Exercise
        number="8.1"
        prompt={
          <>
            Define <InlineMath math="a \sim b" /> on{" "}
            <InlineMath math="\mathbb{Z}" /> by "<InlineMath math="a - b" /> is
            even." Show this is an equivalence relation and describe its
            two equivalence classes.
          </>
        }
      >
        <p>
          <strong>Reflexive:</strong>{" "}
          <InlineMath math="a - a = 0" /> is even, so{" "}
          <InlineMath math="a \sim a" />.
        </p>
        <p>
          <strong>Symmetric:</strong> if <InlineMath math="a - b" /> is
          even, then so is <InlineMath math="-(a-b) = b - a" />.
        </p>
        <p>
          <strong>Transitive:</strong> if <InlineMath math="a - b" /> and{" "}
          <InlineMath math="b - c" /> are even, their sum{" "}
          <InlineMath math="a - c" /> is even (sum of evens is even).
        </p>
        <p>
          The classes are <InlineMath math="[0]" /> = even integers and{" "}
          <InlineMath math="[1]" /> = odd integers. Their union is all of{" "}
          <InlineMath math="\mathbb{Z}" /> and they're disjoint, as
          expected. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 9  ───────────────────────────── */}
      <h2>Part 9 · Cardinality, infinity, and Cantor's surprise</h2>

      <p>
        The <strong>cardinality</strong> of a finite set is just its
        element count. <InlineMath math="|\{a, b, c\}| = 3" />. For
        infinite sets we need a more careful definition. Cantor's idea:{" "}
        <em>two sets have the same cardinality iff there's a bijection
        between them.</em>
      </p>
      <p>
        With this definition, infinite sets can be compared.{" "}
        <InlineMath math="\mathbb{N}" /> and <InlineMath math="\mathbb{Z}" />{" "}
        have the same cardinality despite the latter "containing" the
        former — the bijection
      </p>
      <BlockMath math="0, 1, -1, 2, -2, 3, -3, \dots" />
      <p>
        lists every integer once, by walking outward. Even more
        surprisingly, <InlineMath math="\mathbb{Q}" /> has the same
        cardinality as <InlineMath math="\mathbb{N}" /> — Cantor's "
        diagonal listing" of fractions{" "}
        <InlineMath math="p/q" /> visits every rational in finite time.
        Infinite sets that biject with <InlineMath math="\mathbb{N}" /> are
        called <strong>countable</strong>.
      </p>

      <h3>Hilbert's hotel</h3>
      <p>
        A famous mental picture: a hotel with rooms{" "}
        <InlineMath math="1, 2, 3, \dots" />, all full. A new guest
        arrives. The manager asks every guest to move from room{" "}
        <InlineMath math="n" /> to room <InlineMath math="n+1" />, freeing
        room 1. The fully-booked hotel still has space. With a countable
        bus of new arrivals, move guest <InlineMath math="n" /> to room{" "}
        <InlineMath math="2n" /> and put the bus in the odd rooms. There's
        always more room — that's what countable infinity feels like.
      </p>

      <h3>Cantor's diagonal: <InlineMath math="\mathbb{R}" /> is bigger</h3>
      <p>
        Some infinities are larger. Cantor showed that{" "}
        <InlineMath math="\mathbb{R}" /> cannot biject with{" "}
        <InlineMath math="\mathbb{N}" /> via a slick diagonalisation
        argument. Suppose, for contradiction, that we could list every
        real number in <InlineMath math="(0, 1)" /> as
      </p>
      <BlockMath math="r_1 = 0.d_{11} d_{12} d_{13} \dots" />
      <BlockMath math="r_2 = 0.d_{21} d_{22} d_{23} \dots" />
      <BlockMath math="r_3 = 0.d_{31} d_{32} d_{33} \dots" />
      <p>
        Define a new real <InlineMath math="r^*" /> whose{" "}
        <InlineMath math="n" />-th decimal digit is anything other than{" "}
        <InlineMath math="d_{nn}" /> (and not 0 or 9 to dodge the{" "}
        <InlineMath math="0.\bar{9} = 1" /> issue). Then{" "}
        <InlineMath math="r^*" /> differs from <InlineMath math="r_n" />{" "}
        in its <InlineMath math="n" />-th digit, for every{" "}
        <InlineMath math="n" />. So <InlineMath math="r^*" /> isn't on the
        list — but it's a real number in{" "}
        <InlineMath math="(0, 1)" />. Contradiction. ∎
      </p>
      <p>
        Conclusion: <InlineMath math="\mathbb{R}" /> is{" "}
        <strong>uncountable</strong>. It's a strictly larger infinity than{" "}
        <InlineMath math="\mathbb{N}" />. This is genuinely the moment at
        which "the line" stops being a list of points and becomes
        something fundamentally different — and it's why analysis (the
        rigorous study of <InlineMath math="\mathbb{R}" />) is harder than
        discrete math.
      </p>

      {/* ─────────────────────────────  PART 10  ───────────────────────────── */}
      <h2>Part 10 · Proof techniques</h2>

      <p>
        A <strong>proof</strong> is a finite chain of statements where
        each follows from the previous ones (and from agreed-upon
        axioms/definitions) by a recognised logical rule. Four templates
        cover almost everything you'll write through undergraduate math.
      </p>

      <h3>10.1 Direct proof</h3>
      <p>
        To prove <InlineMath math="P \Rightarrow Q" />: assume{" "}
        <InlineMath math="P" />, derive <InlineMath math="Q" /> by
        algebra and definitions.
      </p>
      <p>
        <strong>Theorem.</strong> The sum of two even integers is even.
      </p>
      <p>
        <strong>Proof.</strong> Let <InlineMath math="m" /> and{" "}
        <InlineMath math="n" /> be even. By definition of "even,"{" "}
        <InlineMath math="m = 2a" /> and <InlineMath math="n = 2b" /> for
        some integers <InlineMath math="a, b" />. Then{" "}
        <InlineMath math="m + n = 2a + 2b = 2(a + b)" />. Since{" "}
        <InlineMath math="a + b \in \mathbb{Z}" />, the sum is twice an
        integer, i.e. even. ∎
      </p>

      <p>
        <strong>Theorem.</strong> If <InlineMath math="n" /> is odd, then{" "}
        <InlineMath math="n^2" /> is odd.
      </p>
      <p>
        <strong>Proof.</strong> Let <InlineMath math="n = 2k + 1" />. Then{" "}
        <InlineMath math="n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1" />, which
        is odd. ∎
      </p>

      <h3>10.2 Proof by contrapositive</h3>
      <p>
        Instead of <InlineMath math="P \Rightarrow Q" />, prove the
        equivalent statement{" "}
        <InlineMath math="\neg Q \Rightarrow \neg P" />. Useful when "
        <InlineMath math="\neg Q" />" is concrete and "
        <InlineMath math="P" />" is loose.
      </p>
      <p>
        <strong>Theorem.</strong> If <InlineMath math="n^2" /> is even,
        then <InlineMath math="n" /> is even.
      </p>
      <p>
        <strong>Proof (contrapositive).</strong> We instead show: if{" "}
        <InlineMath math="n" /> is odd, then <InlineMath math="n^2" /> is
        odd. That's exactly the previous theorem. ∎
      </p>

      <h3>10.3 Proof by contradiction</h3>
      <p>
        To prove <InlineMath math="P" />, assume{" "}
        <InlineMath math="\neg P" /> and derive a contradiction (a
        statement of the form <InlineMath math="Q \land \neg Q" />). Since
        nothing can be both true and false, the assumption{" "}
        <InlineMath math="\neg P" /> must be wrong, hence{" "}
        <InlineMath math="P" /> is true.
      </p>
      <p>
        <strong>Theorem.</strong>{" "}
        <InlineMath math="\sqrt{2}" /> is irrational.
      </p>
      <p>
        <strong>Proof.</strong> Suppose, for contradiction, that{" "}
        <InlineMath math="\sqrt{2} = p/q" /> with{" "}
        <InlineMath math="p, q \in \mathbb{Z}" />,{" "}
        <InlineMath math="q \neq 0" />, and the fraction is in lowest
        terms (so <InlineMath math="\gcd(p, q) = 1" />). Squaring both
        sides:
      </p>
      <BlockMath math="2 = \frac{p^2}{q^2} \;\;\Longrightarrow\;\; p^2 = 2q^2." />
      <p>
        So <InlineMath math="p^2" /> is even, which by the previous
        theorem means <InlineMath math="p" /> is even. Write{" "}
        <InlineMath math="p = 2k" />. Then{" "}
        <InlineMath math="(2k)^2 = 2q^2" />, i.e.{" "}
        <InlineMath math="4k^2 = 2q^2" />, i.e.{" "}
        <InlineMath math="q^2 = 2k^2" />. So{" "}
        <InlineMath math="q^2" /> is even, hence{" "}
        <InlineMath math="q" /> is even. But then both{" "}
        <InlineMath math="p" /> and <InlineMath math="q" /> are even,
        contradicting{" "}
        <InlineMath math="\gcd(p, q) = 1" />. ∎
      </p>

      <h3>10.4 Proof by induction</h3>
      <p>
        To prove <InlineMath math="\forall n \in \mathbb{N},\, P(n)" />,
        do two things:
      </p>
      <ol>
        <li>
          <strong>Base case</strong>: prove <InlineMath math="P(1)" />{" "}
          (or <InlineMath math="P(0)" /> if your <InlineMath math="\mathbb{N}" />{" "}
          starts at 0).
        </li>
        <li>
          <strong>Inductive step</strong>: assume{" "}
          <InlineMath math="P(k)" /> for an arbitrary{" "}
          <InlineMath math="k" />, prove <InlineMath math="P(k+1)" />.
        </li>
      </ol>
      <p>
        Visualise dominoes: knock down the first one (base case), and
        rig the spacing so each falling one knocks the next (inductive
        step). All of them fall.
      </p>

      <p>
        <strong>Theorem.</strong>{" "}
        <InlineMath math="1 + 2 + \cdots + n = \dfrac{n(n+1)}{2}" /> for
        all <InlineMath math="n \in \mathbb{N}" />.
      </p>
      <p>
        <strong>Proof.</strong>{" "}
        <em>Base case</em> (<InlineMath math="n = 1" />):{" "}
        <InlineMath math="1 = \tfrac{1 \cdot 2}{2}" /> ✓.
      </p>
      <p>
        <em>Inductive step.</em> Assume{" "}
        <InlineMath math="1 + 2 + \cdots + k = \tfrac{k(k+1)}{2}" />.
        Adding <InlineMath math="k + 1" /> to both sides:
      </p>
      <BlockMath math="1 + 2 + \cdots + k + (k+1) = \frac{k(k+1)}{2} + (k+1) = (k+1)\!\left(\frac{k}{2} + 1\right) = \frac{(k+1)(k+2)}{2}." />
      <p>
        That's exactly the formula at <InlineMath math="n = k + 1" />. By
        induction, the identity holds for all{" "}
        <InlineMath math="n \in \mathbb{N}" />. ∎
      </p>

      <p>
        <strong>Strong induction</strong> is a variant: in the inductive
        step you assume <InlineMath math="P(j)" /> for{" "}
        <em>all</em> <InlineMath math="j \leq k" />, not just{" "}
        <InlineMath math="P(k)" />. It's logically equivalent to ordinary
        induction but often more convenient (the canonical use is
        proving every integer <InlineMath math="\geq 2" /> has a prime
        factorisation).
      </p>

      <Exercise
        number="10.1"
        prompt={
          <>
            Prove by induction that{" "}
            <InlineMath math="1 + 3 + 5 + \cdots + (2n-1) = n^2" /> for
            every <InlineMath math="n \in \mathbb{N}" />.
          </>
        }
      >
        <p>
          <em>Base</em> (<InlineMath math="n = 1" />):{" "}
          <InlineMath math="1 = 1^2" /> ✓.
        </p>
        <p>
          <em>Step.</em> Assume{" "}
          <InlineMath math="1 + 3 + \cdots + (2k-1) = k^2" />. Add the
          next odd number <InlineMath math="2k+1" /> to both sides:
        </p>
        <BlockMath math="1 + 3 + \cdots + (2k - 1) + (2k+1) = k^2 + 2k + 1 = (k+1)^2." />
        <p>
          That's the formula at <InlineMath math="n = k+1" />. ∎
        </p>
        <p>
          Geometric intuition: stacking <InlineMath math="n" /> L-shaped
          gnomons of sizes <InlineMath math="1, 3, 5, \dots" /> tiles an{" "}
          <InlineMath math="n \times n" /> square.
        </p>
      </Exercise>

      <Pitfall>
        Forgetting to <em>actually use</em> the inductive hypothesis is
        the most common mistake in induction proofs. If your "step"
        argument never references <InlineMath math="P(k)" />, you
        haven't done induction — you've just proved{" "}
        <InlineMath math="P(k+1)" /> directly. Sometimes that's fine, but
        check that <InlineMath math="P(k)" /> was needed.
      </Pitfall>

      {/* ─────────────────────────────  PART 11  ───────────────────────────── */}
      <h2>Part 11 · A glimpse forward — Russell's paradox and why we say "naïve"</h2>

      <p>
        We've been doing <em>naïve</em> set theory: a set is "any
        collection" and we never worry about which collections are
        legitimate. Bertrand Russell's 1901 paradox shows this can't be
        the whole story. Consider
      </p>
      <BlockMath math="R = \{ X : X \notin X \}." />
      <p>
        the set of all sets that are not members of themselves. Ask the
        innocent question: is <InlineMath math="R" /> a member of itself?
      </p>
      <ul>
        <li>
          If <InlineMath math="R \in R" />, then by the defining
          condition <InlineMath math="R \notin R" />. Contradiction.
        </li>
        <li>
          If <InlineMath math="R \notin R" />, then{" "}
          <InlineMath math="R" /> satisfies the defining condition, so{" "}
          <InlineMath math="R \in R" />. Contradiction.
        </li>
      </ul>
      <p>
        Either answer leads to contradiction, so naïve set theory is
        broken. The fix used today is a more careful axiomatic system,
        usually <strong>ZFC</strong> (Zermelo–Fraenkel with Choice),
        where the rules for forming sets are restricted to forbid
        constructions like <InlineMath math="R" />. We don't need ZFC for
        anything we'll do here, but it's worth knowing the loophole
        exists. Most working mathematicians never look under the hood;
        the naïve picture is fine for everything practical.
      </p>

      {/* ─────────────────────────────  PART 12  ───────────────────────────── */}
      <h2>Part 12 · Why this matters for quantum</h2>

      <p>
        Every later module rests on this chapter. A quick map of where
        the ideas reappear:
      </p>
      <ul>
        <li>
          <strong>Calculus</strong> defines limits with an{" "}
          <InlineMath math="\varepsilon" />–<InlineMath math="\delta" />{" "}
          formula that's essentially{" "}
          <InlineMath math="\forall \varepsilon > 0,\; \exists \delta > 0,\; \dots" />
          . Quantifier order matters enormously here.
        </li>
        <li>
          <strong>Linear algebra</strong> defines a vector space as a set
          plus operations satisfying axioms (propositions about
          equality). The image, kernel, and rank of a linear map are
          subsets of vector spaces; bijectivity becomes "invertible."
        </li>
        <li>
          <strong>Probability</strong> is built on{" "}
          <InlineMath math="\sigma" />-algebras — collections of subsets
          closed under unions and complements. The axioms are pure set
          theory.
        </li>
        <li>
          <strong>Quantum mechanics</strong> replaces classical truth
          values <InlineMath math="\{0, 1\}" /> with <em>complex
          superpositions</em> of them. A qubit lives in{" "}
          <InlineMath math="\mathbb{C}^2" /> — a Cartesian-product set
          with structure. The algebra of how those superpositions
          combine is descended from the Boolean algebra you met above,
          generalised to a non-commutative setting.
        </li>
        <li>
          <strong>Quantum computing</strong> turns Boolean circuits into{" "}
          <em>reversible</em> circuits (because quantum gates are
          unitary, hence bijective). Knowing what "bijective" means is
          load-bearing.
        </li>
      </ul>

      <p>
        Read this chapter twice, work the exercises with pen and paper,
        and treat the quiz as a self-check rather than a final exam. The
        rest of the syllabus will lean on every page of it.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widgets
// ════════════════════════════════════════════════════════════

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

type Region =
  | "A"
  | "B"
  | "union"
  | "intersection"
  | "diffAB"
  | "diffBA"
  | "compA"
  | "symdiff";

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
  const acc = "#a78bfa";
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

      <rect
        x="20"
        y="25"
        width="280"
        height="150"
        rx="8"
        fill="rgba(255,255,255,0.02)"
        stroke="#2a2a37"
      />

      <g clipPath="url(#universe)">
        {(region === "A" || region === "diffAB" || region === "symdiff" || region === "union") && (
          <g clipPath={inA}>
            <rect x="0" y="0" width="320" height="200" fill={acc} fillOpacity="0.35" />
          </g>
        )}
        {(region === "B" || region === "diffBA" || region === "symdiff" || region === "union") && (
          <g clipPath={inB}>
            <rect x="0" y="0" width="320" height="200" fill={acc} fillOpacity="0.35" />
          </g>
        )}
        {region === "intersection" && (
          <g clipPath={inA}>
            <g clipPath={inB}>
              <rect x="0" y="0" width="320" height="200" fill={acc} fillOpacity="0.6" />
            </g>
          </g>
        )}
        {(region === "A" ||
          region === "diffAB" ||
          region === "B" ||
          region === "diffBA" ||
          region === "symdiff") && (
          <g clipPath={inA}>
            <g clipPath={inB}>
              <rect x="0" y="0" width="320" height="200" fill="rgba(12,12,20,1)" />
            </g>
          </g>
        )}
        {region === "compA" && (
          <>
            <rect x="20" y="25" width="280" height="150" rx="8" fill={acc} fillOpacity="0.35" />
            <g clipPath={inA}>
              <rect x="0" y="0" width="320" height="200" fill="#0c0c14" />
            </g>
          </>
        )}
      </g>

      <circle cx="125" cy="100" r="70" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
      <circle cx="195" cy="100" r="70" fill="none" stroke="#22d3ee" strokeWidth="1.5" />

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
          pairs={[[0, 0], [1, 1], [2, 2]]}
          rightExtra={1}
        />
        <FuncDiagram
          title="Surjective"
          subtitle="onto"
          pairs={[[0, 0], [1, 0], [2, 1], [3, 2]]}
          rightExtra={0}
        />
        <FuncDiagram
          title="Bijective"
          subtitle="invertible"
          pairs={[[0, 0], [1, 1], [2, 2]]}
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
  const yFor = (i: number, total: number) => 20 + (i + 0.5) * ((h - 40) / total);

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

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
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
      "An implication is only false when a true premise leads to a false conclusion. Every other row is true (the last two are 'vacuously' true).",
  },
  {
    prompt:
      "Which of the following is logically equivalent to $\\neg(\\forall x,\\, P(x))$?",
    options: [
      "$\\forall x,\\, \\neg P(x)$",
      "$\\exists x,\\, P(x)$",
      "$\\exists x,\\, \\neg P(x)$",
      "$\\neg \\exists x,\\, P(x)$",
    ],
    correct: 2,
    explanation:
      "Negation flips a quantifier: 'not for all $P$' is exactly 'there exists $x$ with not-$P$'. To refute a 'for all' statement, produce a single counterexample.",
  },
  {
    prompt:
      "By De Morgan's laws, $\\neg(P \\lor Q)$ equals…",
    options: [
      "$\\neg P \\lor \\neg Q$",
      "$\\neg P \\land \\neg Q$",
      "$P \\land \\neg Q$",
      "$P \\Rightarrow Q$",
    ],
    correct: 1,
    explanation:
      "Negation distributes by flipping the connective: $\\neg(P \\lor Q) \\equiv \\neg P \\land \\neg Q$.",
  },
  {
    prompt:
      "If $|A| = 4$, what is $|\\mathcal{P}(A)|$?",
    options: ["4", "8", "16", "24"],
    correct: 2,
    explanation:
      "Each element is independently in or out of a subset, so there are $2^{|A|} = 2^4 = 16$ subsets.",
  },
  {
    prompt:
      "An equivalence relation must be reflexive, symmetric, and…",
    options: ["antisymmetric", "transitive", "total", "well-founded"],
    correct: 1,
    explanation:
      "The three required properties are reflexive ($a \\sim a$), symmetric ($a \\sim b \\Rightarrow b \\sim a$), and transitive ($a \\sim b$ and $b \\sim c \\Rightarrow a \\sim c$). Equivalence relations partition the underlying set into classes.",
  },
];
