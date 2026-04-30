import { useState } from "react";
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
        Linear algebra is the math of <em>flat things</em> — straight
        lines, planes, hyperplanes — and the maps between them. It's a
        small kit of ideas (vectors, linear combinations, bases, linear
        maps) that becomes load-bearing in physics, statistics, machine
        learning, computer graphics, and (especially for our purposes)
        quantum mechanics. The reason quantum mechanics is hard is{" "}
        <em>not</em> the linear algebra; the linear algebra is exactly
        the same as in this chapter. The reason it's hard is the
        physical interpretation built on top of it. So invest here.
      </p>
      <p>
        This chapter goes in two passes. First, vectors as concrete
        objects you can draw — arrows in the plane, tuples in{" "}
        <InlineMath math="\mathbb{R}^n" />. Then the abstract vector
        space, where "vector" is anything you can add and scale
        consistently — including functions, polynomials, and the
        complex column vectors that quantum states live in. Both
        pictures are essential; switching between them fluently is the
        skill to build.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Essence of Linear Algebra (full series)",
            author: "3Blue1Brown",
            duration: "16 episodes, ~3.5h total",
            url: "https://www.3blue1brown.com/topics/linear-algebra",
            note: "Watch this first. The visual intuition is the gold standard, and chapters 1–3 cover this whole chapter.",
          },
          {
            title: "MIT 18.06 — Linear Algebra (Strang)",
            author: "Gilbert Strang (MIT OCW)",
            duration: "~35h, 35 lectures",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
            note: "Lectures 1–6 align with this chapter. Strang's textbook is the canonical reference.",
          },
          {
            title: "Linear Algebra Done Right (Axler)",
            author: "Sheldon Axler",
            duration: "Reading",
            url: "https://linear.axler.net/",
            note: "Determinant-free, abstraction-first treatment. Worth a second read once Strang feels routine.",
          },
          {
            title: "Strang — Lecture 1: The geometry of linear equations",
            author: "Gilbert Strang",
            duration: "39 min",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/lecture-1-the-geometry-of-linear-equations/",
            note: "The classic 'row picture vs column picture' lecture. Worth listening to once.",
          },
          {
            title: "Linear Algebra Friday — Khan Academy",
            author: "Khan Academy",
            duration: "~12h short videos",
            url: "https://www.khanacademy.org/math/linear-algebra",
            note: "Slowest, most digestible pace. Good if anything in this chapter is sticking.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Two pictures of a vector</h2>

      <p>
        A <strong>vector</strong> is something with magnitude and
        direction — but you'll fall behind quickly if you stop there.
        Three pictures of the same object, each useful in different
        contexts:
      </p>

      <ul>
        <li>
          <strong>Geometric.</strong> An arrow with a tail and a head.
          You add two arrows tip-to-tail; you scale an arrow by stretching it.
        </li>
        <li>
          <strong>Algebraic.</strong> A list (tuple) of numbers, e.g.{" "}
          <InlineMath math="\mathbf{v} = (3, 1)" /> in{" "}
          <InlineMath math="\mathbb{R}^2" />. Addition is componentwise;
          scaling is multiplying every component by a scalar.
        </li>
        <li>
          <strong>Physical.</strong> A quantity with both magnitude and
          direction (force, velocity, electric field). You can add forces
          tip-to-tail; you can double a velocity.
        </li>
      </ul>

      <p>
        These three are equivalent. The notation is usually the
        algebraic one — bold lowercase letters{" "}
        <InlineMath math="\mathbf{v}" />, written as a column for
        algebraic convenience:
      </p>
      <BlockMath math="\mathbf{v} = \begin{pmatrix} 3 \\ 1 \end{pmatrix} \in \mathbb{R}^2." />
      <p>
        Addition and scaling:
      </p>
      <BlockMath math="\begin{pmatrix} a \\ b \end{pmatrix} + \begin{pmatrix} c \\ d \end{pmatrix} = \begin{pmatrix} a + c \\ b + d \end{pmatrix}, \quad \alpha \begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix} \alpha a \\ \alpha b \end{pmatrix}." />

      <p>
        Two vectors are <strong>equal</strong> when their components
        agree (they don't have to start at the same point — vectors
        live up to translation). The <strong>zero vector</strong>{" "}
        <InlineMath math="\mathbf{0}" /> is the all-zeros tuple. The{" "}
        <strong>negation</strong>{" "}
        <InlineMath math="-\mathbf{v}" /> reverses every component
        (geometrically: the same arrow flipped 180°).
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Linear combinations &amp; span</h2>

      <p>
        Given vectors{" "}
        <InlineMath math="\mathbf{v}_1, \dots, \mathbf{v}_k" /> and
        scalars{" "}
        <InlineMath math="c_1, \dots, c_k" />, the expression
      </p>
      <BlockMath math="c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \cdots + c_k \mathbf{v}_k" />
      <p>
        is a <strong>linear combination</strong>. The set of{" "}
        <em>all</em> linear combinations of a fixed collection is its{" "}
        <strong>span</strong>:
      </p>
      <BlockMath math="\operatorname{span}(\mathbf{v}_1, \dots, \mathbf{v}_k) = \{ c_1 \mathbf{v}_1 + \cdots + c_k \mathbf{v}_k : c_i \in \mathbb{R} \}." />

      <p>
        Geometrically, in <InlineMath math="\mathbb{R}^2" />:
      </p>
      <ul>
        <li>
          The span of one nonzero vector is a <strong>line through the
          origin</strong>.
        </li>
        <li>
          The span of two vectors that aren't on the same line is the{" "}
          <strong>whole plane</strong>{" "}
          <InlineMath math="\mathbb{R}^2" />.
        </li>
        <li>
          The span of two vectors that <em>are</em> on the same line is
          just that line — the second vector adds nothing new.
        </li>
      </ul>

      <Callout title="Try it">
        Adjust the scalars <InlineMath math="a" /> and{" "}
        <InlineMath math="b" /> to slide the linear combination{" "}
        <InlineMath math="a\mathbf{v}_1 + b\mathbf{v}_2" /> around. Drag
        the vector tips to change the basis vectors and watch the
        accessible region — the span — change shape.
      </Callout>

      <LinearCombinationWidget />

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Linear independence</h2>

      <p>
        A set of vectors{" "}
        <InlineMath math="\{\mathbf{v}_1, \dots, \mathbf{v}_k\}" /> is{" "}
        <strong>linearly independent</strong> if the only way to write
      </p>
      <BlockMath math="c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \cdots + c_k \mathbf{v}_k = \mathbf{0}" />
      <p>
        is with <em>all</em> the <InlineMath math="c_i = 0" />.
        Otherwise the set is <strong>linearly dependent</strong>: at
        least one nontrivial combination produces zero, equivalently at
        least one of the vectors is a linear combination of the others —
        it carries no new information.
      </p>

      <p>
        In <InlineMath math="\mathbb{R}^2" />: two vectors are
        independent iff they're not parallel. In{" "}
        <InlineMath math="\mathbb{R}^3" />: three vectors are
        independent iff they don't all lie in one plane.
      </p>

      <p>
        <strong>Worked example.</strong> Are{" "}
        <InlineMath math="\mathbf{v}_1 = (1, 2)" /> and{" "}
        <InlineMath math="\mathbf{v}_2 = (3, 6)" /> independent?
      </p>
      <p>
        Try to solve{" "}
        <InlineMath math="c_1(1, 2) + c_2(3, 6) = (0, 0)" />:
      </p>
      <BlockMath math="c_1 + 3c_2 = 0, \qquad 2c_1 + 6c_2 = 0." />
      <p>
        The second equation is double the first, so the system has the
        family of solutions <InlineMath math="c_1 = -3c_2" /> for any{" "}
        <InlineMath math="c_2" />. Nontrivial solutions exist, e.g.{" "}
        <InlineMath math="(c_1, c_2) = (-3, 1)" />. Dependent. (And we
        could have seen this directly:{" "}
        <InlineMath math="\mathbf{v}_2 = 3 \mathbf{v}_1" />.) ∎
      </p>

      <Pitfall>
        Linear dependence is about the entire <em>set</em>, not pairs.
        Three vectors can have every pair independent (no two parallel)
        and still be dependent as a triple — that's exactly what happens
        when three vectors lie in the same plane. Don't confuse
        "pairwise independent" with "independent."
      </Pitfall>

      <Exercise
        number="3.1"
        prompt={
          <>
            Are{" "}
            <InlineMath math="\mathbf{u} = (1, 0, 1)" />,{" "}
            <InlineMath math="\mathbf{v} = (1, 1, 0)" />, and{" "}
            <InlineMath math="\mathbf{w} = (0, 1, -1)" /> linearly
            independent in <InlineMath math="\mathbb{R}^3" />?
          </>
        }
      >
        <p>
          Set <InlineMath math="a\mathbf{u} + b\mathbf{v} + c\mathbf{w} = \mathbf{0}" />:
        </p>
        <BlockMath math="a + b = 0, \qquad b + c = 0, \qquad a - c = 0." />
        <p>
          From the first two: <InlineMath math="b = -a" /> and{" "}
          <InlineMath math="c = -b = a" />. The third becomes{" "}
          <InlineMath math="a - a = 0" />, satisfied for any{" "}
          <InlineMath math="a" />. So <InlineMath math="(a, b, c) = (1, -1, 1)" />{" "}
          is a nontrivial solution: dependent. The relation is{" "}
          <InlineMath math="\mathbf{u} - \mathbf{v} + \mathbf{w} = 0" />.
          Indeed <InlineMath math="\mathbf{w} = \mathbf{v} - \mathbf{u}" />.
          ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Bases and dimension</h2>

      <p>
        A <strong>basis</strong> of a vector space{" "}
        <InlineMath math="V" /> is a set of vectors that is both:
      </p>
      <ol>
        <li>
          <strong>Linearly independent</strong>, and
        </li>
        <li>
          <strong>Spans</strong> <InlineMath math="V" />.
        </li>
      </ol>
      <p>
        Equivalently, every <InlineMath math="\mathbf{v} \in V" /> can be
        written as a linear combination of basis vectors{" "}
        <em>uniquely</em>. Existence of a representation comes from
        spanning; uniqueness from independence.
      </p>

      <p>
        The <strong>standard basis</strong> of{" "}
        <InlineMath math="\mathbb{R}^n" /> is
      </p>
      <BlockMath math="\mathbf{e}_1 = (1, 0, \dots, 0), \;\; \mathbf{e}_2 = (0, 1, 0, \dots, 0), \;\; \dots, \;\; \mathbf{e}_n = (0, \dots, 0, 1)." />
      <p>
        Every vector{" "}
        <InlineMath math="\mathbf{v} = (v_1, v_2, \dots, v_n)" /> equals{" "}
        <InlineMath math="v_1 \mathbf{e}_1 + v_2 \mathbf{e}_2 + \cdots + v_n \mathbf{e}_n" />,
        with the coefficients being exactly the components of{" "}
        <InlineMath math="\mathbf{v}" />. That's why we get to identify
        a vector with its tuple of components — the components{" "}
        <em>are</em> the coefficients in the standard basis.
      </p>

      <p>
        The <strong>dimension</strong> of <InlineMath math="V" />,{" "}
        <InlineMath math="\dim V" />, is the number of vectors in any
        basis. The fact that this number doesn't depend on which basis
        you pick is a (non-obvious but provable) theorem. For{" "}
        <InlineMath math="\mathbb{R}^n" />,{" "}
        <InlineMath math="\dim = n" />.
      </p>

      <p>
        Once you have a basis, <em>every</em> question about{" "}
        <InlineMath math="V" /> reduces to a question about tuples of
        coefficients. This is the entire point of linear algebra: pick
        a basis, do calculations on coefficients, change basis later
        if a different one is more convenient.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · The abstract vector space</h2>

      <p>
        A <strong>vector space over a field</strong>{" "}
        <InlineMath math="\mathbb{F}" /> (think{" "}
        <InlineMath math="\mathbb{R}" /> or{" "}
        <InlineMath math="\mathbb{C}" />) is a set <InlineMath math="V" />{" "}
        with two operations — vector addition and scalar multiplication
        — satisfying eight axioms. The axioms are designed so that
        everything you intuitively expect (associativity,
        distributivity, existence of zero and negatives) actually
        holds.
      </p>

      <Callout title="The 8 axioms of a vector space">
        For all <InlineMath math="\mathbf{u}, \mathbf{v}, \mathbf{w} \in V" />{" "}
        and all <InlineMath math="\alpha, \beta \in \mathbb{F}" />:
        <ol>
          <li><InlineMath math="\mathbf{u} + \mathbf{v} \in V" /> (closure under +)</li>
          <li><InlineMath math="(\mathbf{u} + \mathbf{v}) + \mathbf{w} = \mathbf{u} + (\mathbf{v} + \mathbf{w})" /></li>
          <li><InlineMath math="\mathbf{u} + \mathbf{v} = \mathbf{v} + \mathbf{u}" /></li>
          <li>There is <InlineMath math="\mathbf{0} \in V" /> with <InlineMath math="\mathbf{v} + \mathbf{0} = \mathbf{v}" /></li>
          <li>For each <InlineMath math="\mathbf{v}" />, there is <InlineMath math="-\mathbf{v}" /> with <InlineMath math="\mathbf{v} + (-\mathbf{v}) = \mathbf{0}" /></li>
          <li><InlineMath math="\alpha \mathbf{v} \in V" /> (closure under scalar mult)</li>
          <li><InlineMath math="\alpha(\mathbf{u} + \mathbf{v}) = \alpha \mathbf{u} + \alpha \mathbf{v}" /> and <InlineMath math="(\alpha + \beta) \mathbf{v} = \alpha \mathbf{v} + \beta \mathbf{v}" /></li>
          <li><InlineMath math="(\alpha \beta) \mathbf{v} = \alpha (\beta \mathbf{v})" /> and <InlineMath math="1 \cdot \mathbf{v} = \mathbf{v}" /></li>
        </ol>
      </Callout>

      <h3>Examples beyond <InlineMath math="\mathbb{R}^n" /></h3>

      <p>
        The reason we bother with axioms: the same theorems then apply
        to objects that look very different from arrows.
      </p>

      <ul>
        <li>
          <strong>Polynomials of degree <InlineMath math="\leq n" /></strong>{" "}
          (in one variable) form a vector space. Basis:{" "}
          <InlineMath math="\{1, x, x^2, \dots, x^n\}" />, dimension{" "}
          <InlineMath math="n + 1" />.
        </li>
        <li>
          <strong>Continuous functions on <InlineMath math="[0, 1]" /></strong>{" "}
          form an infinite-dimensional vector space. (Adding two
          continuous functions gives a continuous function; scaling
          one does too.)
        </li>
        <li>
          <strong>Solutions to a linear ODE</strong>. The solutions of{" "}
          <InlineMath math="y'' + y = 0" /> form a 2-dimensional vector
          space, with basis <InlineMath math="\{\sin x, \cos x\}" />.
          Every solution is{" "}
          <InlineMath math="A \sin x + B \cos x" />.
        </li>
        <li>
          <strong>Complex column vectors</strong>{" "}
          <InlineMath math="\mathbb{C}^n" />, the home of finite-
          dimensional quantum states. Same axioms, but scalars are
          complex.
        </li>
      </ul>

      <p>
        A <strong>subspace</strong> of <InlineMath math="V" /> is a
        subset that is <em>itself</em> a vector space under the same
        operations. Equivalent characterisation:{" "}
        <InlineMath math="W \subseteq V" /> is a subspace iff (1){" "}
        <InlineMath math="\mathbf{0} \in W" />, (2) closed under
        addition, (3) closed under scalar multiplication. Lines and
        planes through the origin are subspaces of{" "}
        <InlineMath math="\mathbb{R}^3" />; lines that don't pass
        through the origin are <em>not</em>.
      </p>

      <Exercise
        number="5.1"
        prompt={
          <>
            Is the set of all <InlineMath math="(x, y, z) \in \mathbb{R}^3" /> with{" "}
            <InlineMath math="x + y + z = 0" /> a subspace?
          </>
        }
      >
        <p>
          Check: does it contain <InlineMath math="\mathbf{0}" />?{" "}
          <InlineMath math="(0, 0, 0)" /> satisfies{" "}
          <InlineMath math="0 + 0 + 0 = 0" />, yes. Closed under
          addition? If <InlineMath math="x_1 + y_1 + z_1 = 0" /> and{" "}
          <InlineMath math="x_2 + y_2 + z_2 = 0" />, the sum has{" "}
          <InlineMath math="(x_1+x_2)+(y_1+y_2)+(z_1+z_2) = 0" />, yes.
          Scalar mult: <InlineMath math="(\alpha x) + (\alpha y) + (\alpha z) = \alpha (x + y + z) = 0" />,
          yes. Subspace. Geometrically it's a plane through the
          origin.
        </p>
        <p>
          Compare: <InlineMath math="x + y + z = 1" /> is{" "}
          <em>not</em> a subspace — the origin doesn't satisfy it.
          Lines and planes that miss the origin are never subspaces.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · The four fundamental subspaces</h2>

      <p>
        Every <InlineMath math="m \times n" /> matrix{" "}
        <InlineMath math="A" /> has <em>four</em> subspaces canonically
        attached to it. Strang calls these "the four fundamental
        subspaces" and weaves the entire MIT course around them.
      </p>

      <ol>
        <li>
          <strong>Column space</strong>{" "}
          <InlineMath math="C(A) \subseteq \mathbb{R}^m" />: the span of
          the columns of <InlineMath math="A" />. Equivalently, the set
          of all <InlineMath math="A\mathbf{x}" /> as{" "}
          <InlineMath math="\mathbf{x}" /> ranges over{" "}
          <InlineMath math="\mathbb{R}^n" />. Determines{" "}
          <em>which</em> right-hand-sides <InlineMath math="\mathbf{b}" />{" "}
          give a solvable system <InlineMath math="A\mathbf{x} = \mathbf{b}" />.
        </li>
        <li>
          <strong>Null space</strong>{" "}
          <InlineMath math="N(A) \subseteq \mathbb{R}^n" />: the set of
          all <InlineMath math="\mathbf{x}" /> with{" "}
          <InlineMath math="A\mathbf{x} = \mathbf{0}" />. Determines the
          <em> uniqueness</em> of solutions.
        </li>
        <li>
          <strong>Row space</strong>{" "}
          <InlineMath math="C(A^T) \subseteq \mathbb{R}^n" />: the span
          of the rows.
        </li>
        <li>
          <strong>Left null space</strong>{" "}
          <InlineMath math="N(A^T) \subseteq \mathbb{R}^m" />: the
          vectors <InlineMath math="\mathbf{y}" /> with{" "}
          <InlineMath math="A^T \mathbf{y} = \mathbf{0}" />.
        </li>
      </ol>

      <h3>The rank–nullity theorem</h3>

      <p>
        Define <InlineMath math="r = \dim C(A)" /> (the{" "}
        <strong>rank</strong> of <InlineMath math="A" />). The four
        dimensions are:
      </p>
      <BlockMath math="\dim C(A) = r, \quad \dim N(A) = n - r, \quad \dim C(A^T) = r, \quad \dim N(A^T) = m - r." />
      <p>
        In particular, <InlineMath math="\dim C(A) + \dim N(A) = n" />{" "}
        — the <strong>rank–nullity theorem</strong>. This is a
        bookkeeping identity that ties the size of the column space to
        the size of the null space.
      </p>

      <p>
        Why this matters in practice: solving{" "}
        <InlineMath math="A\mathbf{x} = \mathbf{b}" />:
      </p>
      <ul>
        <li>
          Solvable iff <InlineMath math="\mathbf{b} \in C(A)" />.
        </li>
        <li>
          When solvable, the full set of solutions is{" "}
          <InlineMath math="\mathbf{x}_p + N(A)" /> — one particular
          solution plus the entire null space.
        </li>
        <li>
          Unique solution iff <InlineMath math="N(A) = \{\mathbf{0}\}" />,
          equivalently <InlineMath math="r = n" />.
        </li>
      </ul>

      <p>
        The two more abstract subspaces (
        <InlineMath math="C(A^T)" /> and <InlineMath math="N(A^T)" />)
        relate by orthogonality:{" "}
        <InlineMath math="N(A) \perp C(A^T)" /> in{" "}
        <InlineMath math="\mathbb{R}^n" />, and{" "}
        <InlineMath math="C(A) \perp N(A^T)" /> in{" "}
        <InlineMath math="\mathbb{R}^m" />. We'll explore that more in
        the Inner Product chapter.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters for quantum</h2>

      <p>
        Every concept above shows up unchanged in quantum mechanics, but
        with <InlineMath math="\mathbb{C}" /> instead of{" "}
        <InlineMath math="\mathbb{R}" /> as the scalar field:
      </p>
      <ul>
        <li>
          A quantum state is a unit vector in a complex vector space (a{" "}
          <em>Hilbert space</em>). For a single qubit, the space is{" "}
          <InlineMath math="\mathbb{C}^2" />; for <InlineMath math="n" />{" "}
          qubits, it's <InlineMath math="\mathbb{C}^{2^n}" />.
        </li>
        <li>
          <strong>Linear combination</strong> of states is{" "}
          <em>superposition</em>:{" "}
          <InlineMath math="\alpha |0\rangle + \beta |1\rangle" /> is
          a valid qubit state (if{" "}
          <InlineMath math="|\alpha|^2 + |\beta|^2 = 1" />).
        </li>
        <li>
          A quantum measurement picks out a basis. <em>Choosing a basis
          is choosing what you measure</em> — exactly the linear-algebra
          fact that calculations depend on the basis.
        </li>
        <li>
          The dimension of the state space grows{" "}
          <em>exponentially</em> with the number of qubits. That's the
          whole reason quantum computers are interesting:{" "}
          <InlineMath math="\dim = 2^n" />, so 50 qubits live in a
          space larger than every classical bit configuration on
          Earth's hard drives combined.
        </li>
        <li>
          Every quantum operation is a <em>unitary</em> linear map on
          the state space — meaning a linear map that preserves
          inner products. Linear algebra is exactly the machinery for
          composing and analysing these.
        </li>
      </ul>

      <p>
        The next chapter develops <em>linear maps</em> — what
        functions between vector spaces look like, why matrices are
        the right way to write them down, and what gets preserved
        under composition.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: linear combination in 2D
// ════════════════════════════════════════════════════════════

function LinearCombinationWidget() {
  const [a, setA] = useState(1.5);
  const [b, setB] = useState(1);
  const [v1, setV1] = useState({ x: 2, y: 0.5 });
  const [v2, setV2] = useState({ x: 0.3, y: 1.7 });

  const w = 360;
  const h = 280;
  const cx = w / 2;
  const cy = h / 2;
  const scale = 35;

  const sx = (x: number) => cx + x * scale;
  const sy = (y: number) => cy - y * scale;

  const result = { x: a * v1.x + b * v2.x, y: a * v1.y + b * v2.y };

  // Dependence test: are v1 and v2 parallel?
  const cross = v1.x * v2.y - v1.y * v2.x;
  const parallel = Math.abs(cross) < 0.05;

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full block touch-none select-none">
            {/* grid */}
            {Array.from({ length: 11 }).map((_, i) => (
              <line
                key={`gx${i}`}
                x1={sx(i - 5)}
                y1={0}
                x2={sx(i - 5)}
                y2={h}
                stroke="#1c1c28"
                strokeWidth={0.5}
              />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`gy${i}`}
                x1={0}
                y1={sy(i - 4)}
                x2={w}
                y2={sy(i - 4)}
                stroke="#1c1c28"
                strokeWidth={0.5}
              />
            ))}

            {/* axes */}
            <line x1={0} y1={cy} x2={w} y2={cy} stroke="#2a2a37" />
            <line x1={cx} y1={0} x2={cx} y2={h} stroke="#2a2a37" />

            {/* parallelogram (a*v1, b*v2) */}
            <polygon
              points={`${sx(0)},${sy(0)} ${sx(a * v1.x)},${sy(a * v1.y)} ${sx(result.x)},${sy(result.y)} ${sx(b * v2.x)},${sy(b * v2.y)}`}
              fill="#a78bfa"
              fillOpacity={0.1}
              stroke="#a78bfa"
              strokeWidth={0.5}
              strokeOpacity={0.4}
            />

            {/* v1 (cyan) */}
            <Arrow x1={sx(0)} y1={sy(0)} x2={sx(v1.x)} y2={sy(v1.y)} stroke="#22d3ee" />
            {/* v2 (yellow) */}
            <Arrow x1={sx(0)} y1={sy(0)} x2={sx(v2.x)} y2={sy(v2.y)} stroke="#fbbf24" />
            {/* a*v1 */}
            <Arrow x1={sx(0)} y1={sy(0)} x2={sx(a * v1.x)} y2={sy(a * v1.y)} stroke="#22d3ee" strokeOpacity={0.4} />
            {/* b*v2 from a*v1 */}
            <Arrow x1={sx(a * v1.x)} y1={sy(a * v1.y)} x2={sx(result.x)} y2={sy(result.y)} stroke="#fbbf24" strokeOpacity={0.4} />
            {/* result */}
            <Arrow x1={sx(0)} y1={sy(0)} x2={sx(result.x)} y2={sy(result.y)} stroke="#a78bfa" width={2.5} />

            {/* draggable tips */}
            <DraggableTip
              cx={sx(v1.x)}
              cy={sy(v1.y)}
              fill="#22d3ee"
              onDrag={(dx, dy) =>
                setV1({ x: v1.x + dx / scale, y: v1.y - dy / scale })
              }
            />
            <DraggableTip
              cx={sx(v2.x)}
              cy={sy(v2.y)}
              fill="#fbbf24"
              onDrag={(dx, dy) =>
                setV2({ x: v2.x + dx / scale, y: v2.y - dy / scale })
              }
            />

            <text x={sx(v1.x) + 8} y={sy(v1.y) - 6} fill="#22d3ee" fontSize={11}>
              v₁
            </text>
            <text x={sx(v2.x) + 8} y={sy(v2.y) - 6} fill="#fbbf24" fontSize={11}>
              v₂
            </text>
            <text x={sx(result.x) + 8} y={sy(result.y) - 6} fill="#a78bfa" fontSize={11}>
              a·v₁ + b·v₂
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SlideRow label={`a = ${a.toFixed(2)}`} value={a} min={-3} max={3} step={0.01} onChange={setA} />
          <SlideRow label={`b = ${b.toFixed(2)}`} value={b} min={-3} max={3} step={0.01} onChange={setB} />
        </div>

        <div
          className={`text-sm rounded-lg px-3 py-2 ${
            parallel
              ? "bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/30"
              : "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30"
          }`}
        >
          {parallel
            ? "✗ v₁ and v₂ are (nearly) parallel — they're linearly dependent. Their span is just a line."
            : "✓ v₁ and v₂ are linearly independent. Their span is the entire plane ℝ²."}
        </div>
      </div>
      <figcaption>
        Cyan / yellow: the basis vectors{" "}
        <InlineMath math="\mathbf{v}_1" /> and{" "}
        <InlineMath math="\mathbf{v}_2" />. Drag their tips. Purple: the
        linear combination <InlineMath math="a\mathbf{v}_1 + b\mathbf{v}_2" />,
        controlled by the sliders.
      </figcaption>
    </figure>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  stroke,
  strokeOpacity = 1,
  width = 1.8,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  strokeOpacity?: number;
  width?: number;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return null;
  const ux = dx / len;
  const uy = dy / len;
  const headLen = 8;
  const headW = 4;
  const tipBackX = x2 - ux * headLen;
  const tipBackY = y2 - uy * headLen;
  const px = -uy;
  const py = ux;
  return (
    <g stroke={stroke} strokeOpacity={strokeOpacity} fill={stroke} fillOpacity={strokeOpacity}>
      <line x1={x1} y1={y1} x2={tipBackX} y2={tipBackY} strokeWidth={width} />
      <polygon
        points={`${x2},${y2} ${tipBackX + px * headW},${tipBackY + py * headW} ${tipBackX - px * headW},${tipBackY - py * headW}`}
        strokeLinejoin="round"
      />
    </g>
  );
}

function DraggableTip({
  cx,
  cy,
  fill,
  onDrag,
}: {
  cx: number;
  cy: number;
  fill: string;
  onDrag: (dx: number, dy: number) => void;
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={7}
      fill={fill}
      fillOpacity={0.4}
      stroke={fill}
      strokeWidth={1.5}
      style={{ cursor: "grab" }}
      onPointerDown={(e) => {
        const target = e.target as SVGCircleElement;
        target.setPointerCapture(e.pointerId);
        let lastX = e.clientX;
        let lastY = e.clientY;
        const move = (ev: PointerEvent) => {
          const svg = target.ownerSVGElement!;
          const rect = svg.getBoundingClientRect();
          const scaleX = svg.viewBox.baseVal.width / rect.width;
          const scaleY = svg.viewBox.baseVal.height / rect.height;
          const dx = (ev.clientX - lastX) * scaleX;
          const dy = (ev.clientY - lastY) * scaleY;
          lastX = ev.clientX;
          lastY = ev.clientY;
          onDrag(dx, dy);
        };
        const up = () => {
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
      }}
    />
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
      "Which of these sets is a subspace of $\\mathbb{R}^3$?",
    options: [
      "$\\{(x, y, z) : x + y + z = 1\\}$",
      "$\\{(x, y, z) : x \\geq 0\\}$",
      "$\\{(x, y, z) : x = 2y\\}$",
      "$\\{(x, y, z) : x^2 + y^2 + z^2 = 1\\}$",
    ],
    correct: 2,
    explanation:
      "Subspaces must contain the origin and be closed under sums + scalar multiples. Option C is a plane through the origin (passes all three tests). A misses the origin; B fails for negative scalars; D is the unit sphere, not even closed under addition.",
  },
  {
    prompt:
      "Are $\\mathbf{u} = (1, 2, 3)$ and $\\mathbf{v} = (2, 4, 6)$ linearly independent?",
    options: [
      "Yes",
      "No — $\\mathbf{v} = 2\\mathbf{u}$",
      "Yes — they're not equal",
      "Cannot be determined without more vectors",
    ],
    correct: 1,
    explanation:
      "$\\mathbf{v}$ is exactly twice $\\mathbf{u}$, so $\\mathbf{v} - 2\\mathbf{u} = \\mathbf{0}$ is a nontrivial linear relation. Dependent.",
  },
  {
    prompt:
      "If a $4 \\times 7$ matrix $A$ has rank 3, what is $\\dim N(A)$?",
    options: ["1", "3", "4", "7 − 3 = 4"],
    correct: 2,
    explanation:
      "Rank–nullity: $\\dim C(A) + \\dim N(A) = n = 7$, so $\\dim N(A) = 7 − 3 = 4$. Note that $n$ is the number of columns (input dimension), not rows.",
  },
  {
    prompt:
      "What is $\\dim$ of the vector space of polynomials of degree $\\leq 4$?",
    options: ["3", "4", "5", "Infinite"],
    correct: 2,
    explanation:
      "A basis is $\\{1, x, x^2, x^3, x^4\\}$ — five elements, so the space has dimension 5.",
  },
  {
    prompt:
      "A basis of a vector space is a set of vectors that is…",
    options: [
      "linearly independent",
      "spanning",
      "both — linearly independent and spanning",
      "orthonormal",
    ],
    correct: 2,
    explanation:
      "Basis = independent + spanning. Orthonormal is a stronger condition (also unit-length and pairwise orthogonal); it's a special kind of basis but not the definition.",
  },
];
