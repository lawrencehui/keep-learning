import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function VectorsSpacesBody() {
  return (
    <>
      <p>
        Linear algebra is the backbone of every quantitative
        field — machine learning, statistics, physics, signal
        processing, microstructure modelling — and it all
        starts with vectors and the spaces they live in. The
        goal of this chapter is one mental model:{" "}
        <em>a vector is a geometric object</em>. Every later
        idea — bases, eigendecompositions, SVD, PCA, OLS — is
        built by acting on vectors with linear maps. Lock
        the geometry in here, and the rest is bookkeeping.
      </p>
      <p>
        We'll move through three views of a vector, the
        operations on them, what it means for vectors to be{" "}
        <em>independent</em>, and the definition of a basis —
        the smallest set that lets us name every vector by
        coordinates.
      </p>

      <ReferenceResources
        items={[
          {
            title:
              "3Blue1Brown — Essence of Linear Algebra (1, 2)",
            author: "Grant Sanderson",
            duration: "~25 min",
            url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
            note: "Two short videos. Watch before reading. Geometric intuition first — this is the highest-leverage prep.",
          },
          {
            title: "MIT 18.06 — Lectures 1, 5, 9",
            author: "Gilbert Strang",
            duration: "~2.5h total",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
            note: "Lecture 1 (geometry of Ax=b), 5 (vector spaces), 9 (independence/basis/dimension).",
          },
          {
            title: "MML Ch 2.1, 2.4, 2.6",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "Concise definitions in the same notation we use here. Free PDF.",
          },
          {
            title: "VMLS — Boyd & Vandenberghe (Ch 1–3)",
            author: "Stephen Boyd, Lieven Vandenberghe",
            duration: "Reading (gentler)",
            url: "https://web.stanford.edu/~boyd/vmls/",
            note: "Free PDF. Use as a gentler alternative if MML feels compressed.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Three views of a vector</h2>

      <p>
        Pick up any linear-algebra textbook and you will see
        the word "vector" used in three distinct (but
        equivalent) ways:
      </p>

      <ul>
        <li>
          <strong>Geometric:</strong> a vector is an arrow in
          space, anchored at the origin, with a direction and
          a length.
        </li>
        <li>
          <strong>Algebraic:</strong> a vector is an ordered
          list of numbers, written as a column:{" "}
          <InlineMath math="\mathbf{v} = (v_1, v_2, \dots, v_n)^T" />.
        </li>
        <li>
          <strong>Abstract:</strong> a vector is anything
          obeying the eight vector-space axioms. Polynomials,
          functions, matrices, and even random variables can
          be vectors.
        </li>
      </ul>

      <p>
        The geometric view is the source of intuition. The
        algebraic view is the form a computer ingests. The
        abstract view is what makes linear algebra reusable
        across signal processing, function spaces, and
        infinite-dimensional QM.
      </p>

      <Callout title="The dictionary">
        Throughout this module, picture every operation
        geometrically <em>first</em>, then translate to
        coordinates. If you can't picture it, you don't yet
        understand it.
      </Callout>

      <h3>Notation</h3>

      <p>
        We write vectors in bold:{" "}
        <InlineMath math="\mathbf{v} \in \mathbb{R}^n" />. The{" "}
        <InlineMath math="i" />th component is{" "}
        <InlineMath math="v_i" />. Default is the column form;
        the row form is{" "}
        <InlineMath math="\mathbf{v}^T" /> (the{" "}
        <em>transpose</em>).
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Vector operations</h2>

      <p>
        Two operations are <em>built in</em> to any vector
        space, and almost everything else is derived from them.
      </p>

      <h3>Addition</h3>

      <p>
        Geometrically, <InlineMath math="\mathbf{u} + \mathbf{v}" />{" "}
        is the diagonal of the parallelogram with sides{" "}
        <InlineMath math="\mathbf{u}" /> and{" "}
        <InlineMath math="\mathbf{v}" /> — or equivalently, "tip
        to tail": place <InlineMath math="\mathbf{v}" /> at the
        tip of <InlineMath math="\mathbf{u}" />, and the sum is
        from origin to the new endpoint. Algebraically, we add
        component-wise:
      </p>
      <BlockMath math="\mathbf{u} + \mathbf{v} = (u_1 + v_1, \dots, u_n + v_n)^T." />

      <h3>Scalar multiplication</h3>

      <p>
        For a scalar <InlineMath math="c \in \mathbb{R}" />,{" "}
        <InlineMath math="c \mathbf{v}" /> is{" "}
        <InlineMath math="\mathbf{v}" /> rescaled (and flipped
        if <InlineMath math="c < 0" />):
      </p>
      <BlockMath math="c \mathbf{v} = (c v_1, \dots, c v_n)^T." />

      <p>
        Geometrically: scaling stretches an arrow along its own
        direction. Negative scaling reverses it.
      </p>

      <h3>Linear combinations</h3>

      <p>
        Combine the two operations and you get the central
        object of linear algebra: a{" "}
        <strong>linear combination</strong>
      </p>
      <BlockMath math="c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \dots + c_k \mathbf{v}_k." />

      <p>
        Every theorem in this chapter is, ultimately, a
        statement about which vectors a given set of
        combinations can or cannot reach.
      </p>

      <Exercise prompt="With $\mathbf{u} = (1, 2)^T$ and $\mathbf{v} = (3, 1)^T$, compute $2\mathbf{u} - \mathbf{v}$ both algebraically and geometrically (sketch).">
        <p>
          Algebraically:{" "}
          <InlineMath math="2\mathbf{u} = (2, 4)^T" />, so{" "}
          <InlineMath math="2\mathbf{u} - \mathbf{v} = (2 - 3, 4 - 1)^T = (-1, 3)^T" />.
        </p>
        <p>
          Geometrically: stretch{" "}
          <InlineMath math="\mathbf{u}" /> to twice its length,
          then go backwards along{" "}
          <InlineMath math="\mathbf{v}" />. You land in the
          upper-left quadrant.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Span</h2>

      <Callout title="Definition · Span">
        The <strong>span</strong> of vectors{" "}
        <InlineMath math="\mathbf{v}_1, \dots, \mathbf{v}_k" /> is
        the set of all linear combinations:
        <BlockMath math="\mathrm{span}(\mathbf{v}_1, \dots, \mathbf{v}_k) = \{ c_1 \mathbf{v}_1 + \dots + c_k \mathbf{v}_k : c_i \in \mathbb{R} \}." />
      </Callout>

      <p>
        Span is "everywhere you can get to with these
        ingredients." A few canonical examples:
      </p>

      <ul>
        <li>
          <InlineMath math="\mathrm{span}(\mathbf{0}) = \{\mathbf{0}\}" />:
          a single point.
        </li>
        <li>
          One nonzero vector spans a <em>line</em> through the
          origin.
        </li>
        <li>
          Two non-parallel vectors in{" "}
          <InlineMath math="\mathbb{R}^2" /> span the entire
          plane.
        </li>
        <li>
          Two parallel vectors (e.g.{" "}
          <InlineMath math="\mathbf{v}, 2\mathbf{v}" />) span
          only a line — the second one is redundant.
        </li>
        <li>
          Three generic vectors in{" "}
          <InlineMath math="\mathbb{R}^3" /> span the whole
          space.
        </li>
      </ul>

      <p>
        Three vectors in <InlineMath math="\mathbb{R}^3" /> can
        also fail to span everything: if they all lie in a
        common plane through the origin, their span is just
        that plane. The geometric question is{" "}
        <em>do they reach into a new dimension?</em>
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Linear independence</h2>

      <Callout title="Definition · Linear independence">
        <InlineMath math="\{\mathbf{v}_1, \dots, \mathbf{v}_k\}" />{" "}
        is <strong>linearly independent</strong> if the only
        way to write
        <BlockMath math="c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \dots + c_k \mathbf{v}_k = \mathbf{0}" />
        is with all <InlineMath math="c_i = 0" />. Otherwise the
        set is <strong>linearly dependent</strong>.
      </Callout>

      <p>
        Equivalent geometric statement: no vector in the set
        lies in the span of the others. If one did — say{" "}
        <InlineMath math="\mathbf{v}_3 = a\mathbf{v}_1 + b\mathbf{v}_2" />{" "}
        — then{" "}
        <InlineMath math="a\mathbf{v}_1 + b\mathbf{v}_2 - \mathbf{v}_3 = \mathbf{0}" />{" "}
        is a non-trivial dependency.
      </p>

      <p>
        Three quick mental tests:
      </p>
      <ul>
        <li>
          Any set containing the zero vector is dependent (
          <InlineMath math="1 \cdot \mathbf{0} = \mathbf{0}" />).
        </li>
        <li>
          Any two parallel vectors are dependent.
        </li>
        <li>
          Any set of <InlineMath math="k > n" /> vectors in{" "}
          <InlineMath math="\mathbb{R}^n" /> is automatically
          dependent (you cannot fit{" "}
          <InlineMath math="n+1" /> independent vectors in an{" "}
          <InlineMath math="n" />-dimensional space).
        </li>
      </ul>

      <Pitfall>
        Independence is a property of a <em>set</em>, not of
        individual vectors. The vector{" "}
        <InlineMath math="(1, 0)^T" /> alone is "independent",
        but{" "}
        <InlineMath math="\{(1, 0)^T, (2, 0)^T\}" /> is
        dependent — they span the same line.
      </Pitfall>

      <Exercise prompt="Are $\mathbf{u} = (1, 2, 3)^T$, $\mathbf{v} = (2, 4, 6)^T$, $\mathbf{w} = (1, 0, 0)^T$ independent?">
        <p>
          No.{" "}
          <InlineMath math="\mathbf{v} = 2\mathbf{u}" />, so{" "}
          <InlineMath math="2\mathbf{u} - \mathbf{v} + 0\mathbf{w} = \mathbf{0}" />{" "}
          — a nontrivial linear combination summing to zero.
          The set is dependent.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Basis and dimension</h2>

      <Callout title="Definition · Basis">
        A <strong>basis</strong> of a vector space{" "}
        <InlineMath math="V" /> is a set{" "}
        <InlineMath math="\{\mathbf{b}_1, \dots, \mathbf{b}_n\}" />{" "}
        that is both:
        <ul>
          <li>
            <strong>spanning</strong>:{" "}
            <InlineMath math="\mathrm{span}(\mathbf{b}_1, \dots, \mathbf{b}_n) = V" />;
          </li>
          <li>
            <strong>independent</strong>: no redundancy.
          </li>
        </ul>
      </Callout>

      <p>
        The number of vectors in a basis is the{" "}
        <strong>dimension</strong> of the space. Crucially,{" "}
        <em>every</em> basis of <InlineMath math="V" /> has the
        same number of vectors — this is a theorem, not a
        choice.
      </p>

      <h3>Why bases matter</h3>

      <p>
        A basis turns a vector space into a coordinate system.
        Once a basis{" "}
        <InlineMath math="\mathcal{B} = \{\mathbf{b}_1, \dots, \mathbf{b}_n\}" />{" "}
        is fixed, every{" "}
        <InlineMath math="\mathbf{v} \in V" /> has{" "}
        <em>unique</em> coordinates{" "}
        <InlineMath math="(c_1, \dots, c_n)" /> such that
      </p>
      <BlockMath math="\mathbf{v} = c_1 \mathbf{b}_1 + \dots + c_n \mathbf{b}_n." />

      <p>
        The uniqueness comes from independence; the existence
        comes from spanning. Pick a different basis and the
        coordinates change — the underlying vector does not.
        This distinction (vector vs coordinates) is the seed of{" "}
        <em>change of basis</em> (Chapter 4).
      </p>

      <h3>Standard bases</h3>

      <p>
        The simplest basis of{" "}
        <InlineMath math="\mathbb{R}^n" /> is the{" "}
        <strong>standard basis</strong>{" "}
        <InlineMath math="\{\mathbf{e}_1, \dots, \mathbf{e}_n\}" />,
        where{" "}
        <InlineMath math="\mathbf{e}_i" /> has 1 in position{" "}
        <InlineMath math="i" /> and 0 elsewhere. In this basis,
        the coordinates of{" "}
        <InlineMath math="\mathbf{v} = (v_1, \dots, v_n)^T" /> are
        the components themselves. Most "natural" calculations
        sit in this basis, but other bases (eigenbases,
        orthonormal bases) are often <em>more useful</em> for
        the problem at hand.
      </p>

      <h3>Dimension counting</h3>

      <p>
        Knowing dimensions ahead of time is a powerful sanity
        check.
      </p>
      <ul>
        <li>
          <InlineMath math="\dim(\mathbb{R}^n) = n" />.
        </li>
        <li>
          The space of polynomials of degree{" "}
          <InlineMath math="\le n" /> has dimension{" "}
          <InlineMath math="n+1" /> (basis:{" "}
          <InlineMath math="1, x, x^2, \dots, x^n" />).
        </li>
        <li>
          The space of{" "}
          <InlineMath math="m \times n" /> real matrices has
          dimension <InlineMath math="mn" />.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Vector spaces, abstractly</h2>

      <p>
        A <strong>vector space</strong>{" "}
        <InlineMath math="V" /> over{" "}
        <InlineMath math="\mathbb{R}" /> is a set with two
        operations satisfying eight axioms (associativity,
        commutativity, additive identity, additive inverse, and
        four scalar-multiplication compatibilities). The axioms
        are the bare minimum needed for "linear combination" to
        make sense and behave the way our intuition wants.
      </p>

      <p>
        Examples beyond <InlineMath math="\mathbb{R}^n" />:
      </p>
      <ul>
        <li>
          <strong>Polynomial spaces</strong>{" "}
          <InlineMath math="P_n" />: degree-≤-{" "}
          <InlineMath math="n" /> polynomials.
        </li>
        <li>
          <strong>Function spaces</strong>{" "}
          <InlineMath math="C[a, b]" />: continuous functions
          on an interval, with pointwise addition and scaling.
        </li>
        <li>
          <strong>Matrices</strong>{" "}
          <InlineMath math="M_{m \times n}" />.
        </li>
        <li>
          <strong>Square-integrable functions</strong>{" "}
          <InlineMath math="L^2(\mathbb{R})" /> — a Hilbert
          space, where quantum wavefunctions live.
        </li>
      </ul>

      <p>
        For everything in this chapter, the right mental
        model is{" "}
        <InlineMath math="\mathbb{R}^n" />. The abstraction
        pays off later when we discuss inner-product spaces and
        infinite-dimensional spaces — but the geometry of{" "}
        <InlineMath math="\mathbb{R}^2" /> and{" "}
        <InlineMath math="\mathbb{R}^3" /> is enough to ground
        every theorem.
      </p>

      <h3>Subspaces</h3>

      <p>
        A <strong>subspace</strong>{" "}
        <InlineMath math="W \subseteq V" /> is a subset that is
        itself a vector space. The shortcut:{" "}
        <InlineMath math="W" /> is a subspace iff
      </p>
      <ul>
        <li>
          it contains <InlineMath math="\mathbf{0}" />;
        </li>
        <li>
          it is closed under addition (
          <InlineMath math="\mathbf{u}, \mathbf{v} \in W \Rightarrow \mathbf{u} + \mathbf{v} \in W" />
          );
        </li>
        <li>
          it is closed under scalar multiplication (
          <InlineMath math="c \in \mathbb{R}, \mathbf{v} \in W \Rightarrow c\mathbf{v} \in W" />
          ).
        </li>
      </ul>

      <p>
        Subspaces of <InlineMath math="\mathbb{R}^3" />:{" "}
        <InlineMath math="\{\mathbf{0}\}" />, lines through the
        origin, planes through the origin, and the whole space.
        That's it.
      </p>

      <Pitfall>
        Origin matters. The line{" "}
        <InlineMath math="y = x + 1" /> in{" "}
        <InlineMath math="\mathbb{R}^2" /> is{" "}
        <em>not</em> a subspace — it doesn't contain{" "}
        <InlineMath math="(0, 0)" />. Subspaces always pass
        through the origin.
      </Pitfall>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Bases drive every numerical method.</strong>{" "}
          OLS picks the basis of column space; PCA picks the
          variance-maximising orthonormal basis; Fourier
          analysis picks the eigenbasis of the shift operator.
          The right basis turns hard problems into easy ones.
        </li>
        <li>
          <strong>Independence = no redundancy.</strong> In
          regression, dependent feature columns make{" "}
          <InlineMath math="X^T X" /> singular and OLS fails.
          The diagnosis ("multicollinearity") is exactly a
          dependence statement.
        </li>
        <li>
          <strong>Dimension is degrees of freedom.</strong> A
          model with <InlineMath math="p" /> parameters is a
          point in <InlineMath math="\mathbb{R}^p" />; the
          training data lives in a different{" "}
          <InlineMath math="\mathbb{R}^n" />. The relationship
          between <InlineMath math="p" /> and{" "}
          <InlineMath math="n" /> determines whether a problem
          is well- or ill-posed.
        </li>
        <li>
          <strong>Microstructure preview.</strong> The space of
          executable order-flow trajectories is a vector space.
          Optimal-execution methods (Almgren-Chriss, Module
          VIII) pick a "best" trajectory in this space subject
          to constraints. Same machinery.
        </li>
      </ul>

      <p>
        Next chapter: linear maps and matrices. Once we have
        vectors and bases, we can ask{" "}
        <em>how does a linear function move them?</em>
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
      "Which of the following is **not** a vector space (over $\\mathbb{R}$)?",
    options: [
      "$\\mathbb{R}^n$ with usual addition and scalar multiplication",
      "polynomials of degree $\\le 5$",
      "the line $y = x + 1$ in $\\mathbb{R}^2$",
      "continuous functions on $[0, 1]$",
    ],
    correct: 2,
    explanation:
      "$y = x + 1$ doesn't contain the origin, so it fails closure under scalar multiplication ($0 \\cdot \\mathbf{v} = \\mathbf{0}$ must be in the space). It's an *affine* set, not a vector subspace.",
  },
  {
    prompt:
      "$\\mathbf{u} = (1, 2)^T$ and $\\mathbf{v} = (2, 4)^T$. What does $\\mathrm{span}(\\mathbf{u}, \\mathbf{v})$ look like?",
    options: [
      "a single point — the origin",
      "a line through the origin",
      "the entire plane $\\mathbb{R}^2$",
      "depends on the scalar field",
    ],
    correct: 1,
    explanation:
      "$\\mathbf{v} = 2\\mathbf{u}$, so the two vectors are parallel — they span only the line $\\mathrm{span}(\\mathbf{u})$. The second vector is redundant.",
  },
  {
    prompt:
      "Three vectors in $\\mathbb{R}^4$ are…",
    options: [
      "always independent",
      "always dependent",
      "neither (depends on the vectors)",
      "always span $\\mathbb{R}^4$",
    ],
    correct: 2,
    explanation:
      "Three vectors *can* be independent in $\\mathbb{R}^4$ (e.g. $\\mathbf{e}_1, \\mathbf{e}_2, \\mathbf{e}_3$), but they cannot span all of $\\mathbb{R}^4$ — you need at least 4. Independence depends on the specific vectors.",
  },
  {
    prompt:
      "Which is the dimension of the space of $2 \\times 3$ real matrices?",
    options: ["2", "3", "5", "6"],
    correct: 3,
    explanation:
      "Each entry is a free real parameter, so dim is $2 \\times 3 = 6$. A natural basis is the six 'one-hot' matrices with a 1 in a single position.",
  },
  {
    prompt:
      "If $\\{\\mathbf{b}_1, \\dots, \\mathbf{b}_n\\}$ is a basis of $V$, then a vector $\\mathbf{v} \\in V$ has…",
    options: [
      "no representation in this basis",
      "many possible representations",
      "exactly one representation $\\mathbf{v} = \\sum c_i \\mathbf{b}_i$",
      "only an integer-valued representation",
    ],
    correct: 2,
    explanation:
      "Spanning gives at least one representation; independence forces it to be unique. This is *the* property that makes a basis useful as a coordinate system.",
  },
];
