import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function InnerProductBody() {
  return (
    <>
      <p>
        So far we've worked with vector spaces over <em>linear</em>{" "}
        structure alone — addition and scalar multiplication. But many
        questions are <em>geometric</em>: how long is a vector? What's
        the angle between two? When are two vectors perpendicular?
        These need an extra piece of structure beyond linearity, the{" "}
        <strong>inner product</strong>. With it, every vector space
        becomes a place where length, angle, and projection are
        well-defined — and quantum mechanics gets the language it
        needs.
      </p>
      <p>
        This chapter develops inner products on{" "}
        <InlineMath math="\mathbb{R}^n" /> first, then{" "}
        <InlineMath math="\mathbb{C}^n" />, then on function spaces
        (where the same algebra produces Fourier analysis). We'll build
        Cauchy–Schwarz, Gram–Schmidt orthogonalisation, projections, and
        the QR decomposition, ending with a preview of the infinite-
        dimensional case (Hilbert space) where quantum lives.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Essence of Linear Algebra — Ch. 9, 16: Dot product, abstract vector spaces",
            author: "3Blue1Brown",
            duration: "~25 min combined",
            url: "https://www.youtube.com/watch?v=LyGKycYT2v0",
            note: "The dot-product video is great. The 'duality' angle is unusual but worth seeing once.",
          },
          {
            title: "MIT 18.06 — Lectures 14–17 (orthogonality, projections, Gram-Schmidt)",
            author: "Gilbert Strang (MIT OCW)",
            duration: "~5h",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/video_galleries/video-lectures/",
            note: "Strang's projections lectures are uniquely good — the geometry is unmistakable.",
          },
          {
            title: "Linear Algebra Done Right — chs. 6–7",
            author: "Sheldon Axler",
            duration: "Reading",
            url: "https://linear.axler.net/",
            note: "Cleanest treatment of inner-product spaces from an abstract perspective.",
          },
          {
            title: "Quantum mechanics — bra-ket notation",
            author: "various",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Bra%E2%80%93ket_notation",
            note: "Once you've read Part 8, this Wikipedia page is a cheat sheet.",
          },
          {
            title: "Hilbert spaces (lecture)",
            author: "Robert Coleman / 3Blue1Brown derivative",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=hilbert+space+for+quantum+mechanics",
            note: "Optional. Plenty of intro lectures online; pick one once Part 7 motivates the question.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Inner products</h2>

      <p>
        On <InlineMath math="\mathbb{R}^n" />, the standard{" "}
        <strong>dot product</strong> is
      </p>
      <BlockMath math="\mathbf{u} \cdot \mathbf{v} = \langle \mathbf{u}, \mathbf{v}\rangle = \sum_{i=1}^{n} u_i v_i = u_1 v_1 + u_2 v_2 + \cdots + u_n v_n." />
      <p>
        It satisfies three properties:
      </p>
      <ol>
        <li>
          <strong>Symmetry:</strong>{" "}
          <InlineMath math="\langle \mathbf{u}, \mathbf{v} \rangle = \langle \mathbf{v}, \mathbf{u} \rangle" />.
        </li>
        <li>
          <strong>Linearity in the first slot:</strong>{" "}
          <InlineMath math="\langle \alpha \mathbf{u} + \beta \mathbf{w}, \mathbf{v} \rangle = \alpha \langle \mathbf{u}, \mathbf{v} \rangle + \beta \langle \mathbf{w}, \mathbf{v} \rangle" />.
          By symmetry it's also linear in the second slot — the real
          inner product is <em>bilinear</em>.
        </li>
        <li>
          <strong>Positive definite:</strong>{" "}
          <InlineMath math="\langle \mathbf{v}, \mathbf{v} \rangle \geq 0" />,{" "}
          with equality iff <InlineMath math="\mathbf{v} = \mathbf{0}" />.
        </li>
      </ol>

      <p>
        On a complex vector space <InlineMath math="\mathbb{C}^n" />,
        the standard inner product carries an extra conjugation:
      </p>
      <BlockMath math="\langle \mathbf{u}, \mathbf{v} \rangle = \sum_{i=1}^{n} \overline{u_i} \, v_i." />
      <p>
        Conventions vary: <em>physicists</em> conjugate the first slot
        (so the inner product is linear in the second), while many{" "}
        <em>mathematicians</em> conjugate the second. We'll use the
        physicist convention because it lines up with the bra-ket
        notation in quantum mechanics. In this convention the
        inner product satisfies:
      </p>
      <ol>
        <li>
          <strong>Conjugate symmetry:</strong>{" "}
          <InlineMath math="\langle \mathbf{u}, \mathbf{v} \rangle = \overline{\langle \mathbf{v}, \mathbf{u} \rangle}" />.
        </li>
        <li>
          <strong>Linear in the second slot</strong>; antilinear (
          conjugate-linear) in the first.
        </li>
        <li>
          <strong>Positive definite:</strong>{" "}
          <InlineMath math="\langle \mathbf{v}, \mathbf{v} \rangle \geq 0" />,
          and in particular real (the conjugate symmetry forces it).
        </li>
      </ol>

      <h3>Example beyond <InlineMath math="\mathbb{R}^n" /></h3>

      <p>
        On the space of continuous functions on{" "}
        <InlineMath math="[a, b]" />, define
      </p>
      <BlockMath math="\langle f, g \rangle = \int_a^b f(x) g(x) \, dx." />
      <p>
        All three axioms hold. This <em>function space inner product</em>{" "}
        is the foundation of Fourier analysis — sines and cosines are
        orthogonal under it (Part 4 below). And it generalises directly
        to a complex version with{" "}
        <InlineMath math="\overline{f(x)} g(x)" />, which is exactly the
        inner product on quantum wavefunctions:{" "}
        <InlineMath math="\langle \psi | \phi \rangle = \int \overline{\psi(x)} \phi(x) \, dx" />.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Norm, Cauchy–Schwarz, triangle inequality</h2>

      <p>
        The <strong>norm</strong> (or <em>length</em>) of a vector is
      </p>
      <BlockMath math="\|\mathbf{v}\| = \sqrt{\langle \mathbf{v}, \mathbf{v} \rangle}." />
      <p>
        On <InlineMath math="\mathbb{R}^n" /> this is the Euclidean
        length <InlineMath math="\sqrt{v_1^2 + \cdots + v_n^2}" />, the
        Pythagorean theorem in <InlineMath math="n" /> dimensions.
      </p>

      <Callout title="Cauchy–Schwarz inequality">
        For any <InlineMath math="\mathbf{u}, \mathbf{v}" /> in an
        inner product space,
        <BlockMath math="|\langle \mathbf{u}, \mathbf{v} \rangle| \leq \|\mathbf{u}\| \, \|\mathbf{v}\|." />
        Equality holds iff <InlineMath math="\mathbf{u}" /> and{" "}
        <InlineMath math="\mathbf{v}" /> are linearly dependent
        (one is a scalar multiple of the other).
      </Callout>

      <p>
        This is one of the most-used inequalities in mathematics. Quick
        proof for the real case: consider{" "}
        <InlineMath math="\|\mathbf{u} - t\mathbf{v}\|^2 \geq 0" /> for
        all real <InlineMath math="t" />. Expanding,
      </p>
      <BlockMath math="\|\mathbf{u}\|^2 - 2t \langle \mathbf{u}, \mathbf{v}\rangle + t^2 \|\mathbf{v}\|^2 \geq 0." />
      <p>
        This is a quadratic in <InlineMath math="t" /> with{" "}
        non-negative output for every <InlineMath math="t" />, so its
        discriminant is non-positive:
      </p>
      <BlockMath math="(2 \langle \mathbf{u}, \mathbf{v} \rangle)^2 - 4 \|\mathbf{u}\|^2 \|\mathbf{v}\|^2 \leq 0." />
      <p>
        Rearranging gives Cauchy–Schwarz. ∎
      </p>

      <p>
        From Cauchy–Schwarz we get the <strong>triangle inequality</strong>:
      </p>
      <BlockMath math="\|\mathbf{u} + \mathbf{v}\| \leq \|\mathbf{u}\| + \|\mathbf{v}\|." />
      <p>
        The geometric content: the third side of a triangle is at most
        the sum of the other two — straight is the shortest path. The
        algebraic proof: square both sides, use{" "}
        <InlineMath math="\|\mathbf{u} + \mathbf{v}\|^2 = \|\mathbf{u}\|^2 + 2\langle \mathbf{u}, \mathbf{v}\rangle + \|\mathbf{v}\|^2" />,
        and bound the cross term by Cauchy–Schwarz.
      </p>

      <h3>Angles</h3>
      <p>
        With Cauchy–Schwarz in hand, the ratio{" "}
        <InlineMath math="\langle \mathbf{u}, \mathbf{v}\rangle / (\|\mathbf{u}\| \|\mathbf{v}\|)" />{" "}
        is between <InlineMath math="-1" /> and <InlineMath math="1" />.
        We <em>define</em> the angle{" "}
        <InlineMath math="\theta" /> between two real vectors by
      </p>
      <BlockMath math="\cos\theta = \frac{\langle \mathbf{u}, \mathbf{v} \rangle}{\|\mathbf{u}\| \, \|\mathbf{v}\|}." />
      <p>
        That's how cosines and inner products meet — they're the same
        idea, written two different ways.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Orthogonality</h2>

      <p>
        Two vectors are <strong>orthogonal</strong> if{" "}
        <InlineMath math="\langle \mathbf{u}, \mathbf{v} \rangle = 0" />.
        In <InlineMath math="\mathbb{R}^n" /> with the dot product,
        this is the familiar "perpendicular." A set of vectors is{" "}
        <strong>orthogonal</strong> if all pairs are orthogonal,{" "}
        <strong>orthonormal</strong> if also each vector has unit
        norm.
      </p>

      <p>
        <strong>Pythagorean theorem.</strong> If{" "}
        <InlineMath math="\mathbf{u} \perp \mathbf{v}" />, then{" "}
        <InlineMath math="\|\mathbf{u} + \mathbf{v}\|^2 = \|\mathbf{u}\|^2 + \|\mathbf{v}\|^2" />.
        Verify by expanding the inner product — the cross term{" "}
        <InlineMath math="\langle \mathbf{u}, \mathbf{v}\rangle = 0" />{" "}
        drops out. This generalises to any{" "}
        <InlineMath math="n" />-dimensional vector space, finite or
        infinite.
      </p>

      <h3>Orthogonal complement</h3>
      <p>
        For a subspace <InlineMath math="W \subseteq V" />, its{" "}
        <strong>orthogonal complement</strong> is
      </p>
      <BlockMath math="W^{\perp} = \{ \mathbf{v} \in V : \langle \mathbf{v}, \mathbf{w} \rangle = 0 \text{ for all } \mathbf{w} \in W \}." />
      <p>
        Always a subspace of <InlineMath math="V" />, and{" "}
        <InlineMath math="V = W \oplus W^{\perp}" /> when{" "}
        <InlineMath math="V" /> is finite-dimensional — every vector
        decomposes uniquely as a piece in <InlineMath math="W" /> plus
        a piece orthogonal to <InlineMath math="W" />.
      </p>

      <p>
        Returning to Strang's four fundamental subspaces from the
        Vectors chapter: orthogonality ties them together.
      </p>
      <BlockMath math="N(A) = C(A^T)^{\perp} \quad \text{in } \mathbb{R}^n," />
      <BlockMath math="N(A^T) = C(A)^{\perp} \quad \text{in } \mathbb{R}^m." />
      <p>
        Each fundamental subspace is the orthogonal complement of
        another. This is the geometric backbone of linear algebra.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Orthonormal bases</h2>

      <p>
        Among all bases, orthonormal ones are special: representing a
        vector becomes effortless. If{" "}
        <InlineMath math="\{\mathbf{q}_1, \dots, \mathbf{q}_n\}" /> is an
        orthonormal basis, then for any{" "}
        <InlineMath math="\mathbf{v}" />,
      </p>
      <BlockMath math="\mathbf{v} = \sum_{i = 1}^{n} \langle \mathbf{q}_i, \mathbf{v} \rangle \, \mathbf{q}_i." />
      <p>
        The coefficient of <InlineMath math="\mathbf{v}" /> on{" "}
        <InlineMath math="\mathbf{q}_i" /> is just the inner product
        with <InlineMath math="\mathbf{q}_i" />. Compare with a generic
        basis, where finding coefficients requires solving a linear
        system. The reason: orthogonality decouples the coordinates.
      </p>

      <h3>Parseval's identity</h3>
      <p>
        With an orthonormal basis,
      </p>
      <BlockMath math="\|\mathbf{v}\|^2 = \sum_{i = 1}^{n} |\langle \mathbf{q}_i, \mathbf{v} \rangle|^2." />
      <p>
        Pythagoras, generalised: the squared length is the sum of
        squared coordinates in any orthonormal basis. In quantum
        mechanics with{" "}
        <InlineMath math="\mathbf{q}_i" /> = energy eigenstates,
        Parseval's identity says the total probability of all energy
        outcomes is <InlineMath math="\|\psi\|^2 = 1" />.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Gram–Schmidt &amp; QR</h2>

      <p>
        Given any basis{" "}
        <InlineMath math="\{\mathbf{a}_1, \dots, \mathbf{a}_n\}" />, the{" "}
        <strong>Gram–Schmidt process</strong> produces an orthonormal
        basis{" "}
        <InlineMath math="\{\mathbf{q}_1, \dots, \mathbf{q}_n\}" /> for
        the same span. Iteratively:
      </p>
      <ol>
        <li>
          Set <InlineMath math="\mathbf{q}_1 = \mathbf{a}_1 / \|\mathbf{a}_1\|" />.
        </li>
        <li>
          For each <InlineMath math="k = 2, \dots, n" />: subtract from{" "}
          <InlineMath math="\mathbf{a}_k" /> its projections onto the
          earlier <InlineMath math="\mathbf{q}_i" />, then normalise:
          <BlockMath math="\mathbf{p}_k = \mathbf{a}_k - \sum_{i < k} \langle \mathbf{q}_i, \mathbf{a}_k \rangle \, \mathbf{q}_i, \quad \mathbf{q}_k = \mathbf{p}_k / \|\mathbf{p}_k\|." />
        </li>
      </ol>

      <p>
        The geometric picture: at step <InlineMath math="k" />, take
        the next input vector, peel off everything that lies in the
        span of the previous orthonormal vectors, keep what remains,
        normalise. Repeat.
      </p>

      <Callout title="Try it">
        Two non-orthogonal vectors. Run Gram–Schmidt: keep{" "}
        <InlineMath math="\mathbf{q}_1" /> in the direction of{" "}
        <InlineMath math="\mathbf{a}_1" />, project{" "}
        <InlineMath math="\mathbf{a}_2" /> onto it, subtract, then
        normalise the remainder.
      </Callout>

      <GramSchmidtWidget />

      <h3>QR decomposition</h3>
      <p>
        Stack the original vectors as columns of a matrix{" "}
        <InlineMath math="A" />, and the resulting orthonormal vectors
        as columns of <InlineMath math="Q" />. Then there's a unique{" "}
        upper-triangular matrix <InlineMath math="R" /> with
      </p>
      <BlockMath math="A = Q R," />
      <p>
        where <InlineMath math="Q" /> has orthonormal columns (
        <InlineMath math="Q^T Q = I" />) and{" "}
        <InlineMath math="R" /> records the Gram–Schmidt coefficients.
        QR is the cousin of LU, optimised for orthogonality. It's the
        basis of the most common numerical algorithm for least squares.
      </p>

      <Pitfall>
        Gram–Schmidt as written is numerically unstable: small floating-
        point errors compound across steps. Real implementations use{" "}
        <em>modified</em> Gram–Schmidt or Householder reflections.
        Don't trust a hand-derived orthogonal basis for matrices
        beyond size 4×4 or so without using a library.
      </Pitfall>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Projections &amp; least squares</h2>

      <p>
        The projection of <InlineMath math="\mathbf{v}" /> onto a{" "}
        <em>line</em> spanned by a unit vector{" "}
        <InlineMath math="\mathbf{q}" /> is
      </p>
      <BlockMath math="\operatorname{proj}_{\mathbf{q}} \mathbf{v} = \langle \mathbf{q}, \mathbf{v} \rangle \, \mathbf{q}." />

      <p>
        Onto a subspace <InlineMath math="W" /> with orthonormal basis{" "}
        <InlineMath math="\{\mathbf{q}_1, \dots, \mathbf{q}_k\}" />:
      </p>
      <BlockMath math="\operatorname{proj}_W \mathbf{v} = \sum_{i = 1}^{k} \langle \mathbf{q}_i, \mathbf{v} \rangle \, \mathbf{q}_i." />

      <p>
        The projection is the closest vector in{" "}
        <InlineMath math="W" /> to{" "}
        <InlineMath math="\mathbf{v}" /> — that's the optimisation
        property, and what links projections to <em>least-squares
        approximation</em>:
      </p>

      <Callout title="Least squares">
        To "solve" <InlineMath math="A\mathbf{x} = \mathbf{b}" /> when
        no exact solution exists, find the{" "}
        <InlineMath math="\mathbf{x}" /> minimising{" "}
        <InlineMath math="\|A\mathbf{x} - \mathbf{b}\|^2" />.
        Geometrically:
        <InlineMath math="A\mathbf{x}" /> ranges over{" "}
        <InlineMath math="C(A)" />, and you want the closest point in
        that subspace to <InlineMath math="\mathbf{b}" /> — its
        projection. The optimum satisfies the{" "}
        <em>normal equations</em>:
        <BlockMath math="A^T A \mathbf{x} = A^T \mathbf{b}." />
      </Callout>

      <p>
        Linear regression is exactly this. Stack data points as rows of{" "}
        <InlineMath math="A" />, observed values as{" "}
        <InlineMath math="\mathbf{b}" />; solve the normal equations
        for the regression coefficients. The least-squares formula is
        the linear-algebra heart of statistics, and beneath it sits the
        same projection geometry.
      </p>

      <Exercise
        number="6.1"
        prompt={
          <>
            Project <InlineMath math="\mathbf{v} = (3, 4)" /> onto the
            line spanned by <InlineMath math="(1, 1)" />.
          </>
        }
      >
        <p>
          Unit vector along <InlineMath math="(1, 1)" /> is{" "}
          <InlineMath math="\mathbf{q} = (1, 1)/\sqrt 2" />.
        </p>
        <BlockMath math="\langle \mathbf{q}, \mathbf{v} \rangle = (3 + 4)/\sqrt 2 = 7/\sqrt 2." />
        <BlockMath math="\operatorname{proj}_{\mathbf{q}} \mathbf{v} = (7/\sqrt 2)(1, 1)/\sqrt 2 = (7/2, 7/2)." />
        <p>
          Sanity check: the projection lies on the line{" "}
          <InlineMath math="y = x" /> ✓; the residual{" "}
          <InlineMath math="(3 - 7/2, 4 - 7/2) = (-1/2, 1/2)" /> is
          orthogonal to <InlineMath math="(1, 1)" /> (their dot
          product is 0) ✓.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Hilbert space (preview)</h2>

      <p>
        Up to now everything has been finite-dimensional. The same
        algebra carries over to{" "}
        <em>infinite-dimensional</em> inner product spaces, with one
        extra technical condition: <strong>completeness</strong>{" "}
        (every Cauchy sequence converges to a vector in the space).
        A complete inner product space is called a{" "}
        <strong>Hilbert space</strong>.
      </p>

      <p>
        Two examples:
      </p>
      <ul>
        <li>
          <InlineMath math="\ell^2" />: square-summable sequences{" "}
          <InlineMath math="(a_1, a_2, a_3, \dots)" /> with{" "}
          <InlineMath math="\sum |a_n|^2 < \infty" />.
        </li>
        <li>
          <InlineMath math="L^2(\mathbb{R})" />: square-integrable
          functions <InlineMath math="\psi : \mathbb{R} \to \mathbb{C}" />{" "}
          with <InlineMath math="\int |\psi|^2 \, dx < \infty" />. This
          is the home of quantum wavefunctions on the line.
        </li>
      </ul>

      <p>
        Why "completeness" matters: in finite dimensions, every linear
        operator that's nice (continuous, etc.) is automatically{" "}
        well-behaved. In infinite dimensions you need extra hypotheses
        to avoid pathologies. Hilbert space is the right setting where
        the spectral theorem, projections, and Fourier expansions all
        still work.
      </p>

      <p>
        Fourier series, in this language, is just the orthonormal basis{" "}
        <InlineMath math="\{e^{2\pi i n x}\}_{n \in \mathbb{Z}}" /> of{" "}
        <InlineMath math="L^2([0, 1])" />. Every periodic function is a
        sum of these basis functions; the coefficients are the inner
        products. Same theorem as Part 4, applied in infinite
        dimensions.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters for quantum</h2>

      <p>
        Inner products are the dictionary that translates linear
        algebra into quantum mechanics:
      </p>
      <ul>
        <li>
          <strong>States are unit vectors.</strong> A quantum state is{" "}
          <InlineMath math="|\psi\rangle" /> with{" "}
          <InlineMath math="\langle \psi | \psi \rangle = 1" />. The
          unit-norm condition is the probability normalisation:
          probabilities sum to 1.
        </li>
        <li>
          <strong>Bra-ket notation.</strong> A "ket"{" "}
          <InlineMath math="|\psi\rangle" /> is a column vector; a
          "bra" <InlineMath math="\langle\psi|" /> is its conjugate
          transpose (a row vector). The inner product is{" "}
          <InlineMath math="\langle\psi|\phi\rangle" /> — the bra
          times the ket. This is identical to{" "}
          <InlineMath math="\langle \mathbf{u}, \mathbf{v}\rangle" />{" "}
          in the physicist convention, just with prettier brackets.
        </li>
        <li>
          <strong>Born rule.</strong> The probability of measuring a
          system in state <InlineMath math="|\psi\rangle" /> and
          finding it in state{" "}
          <InlineMath math="|\phi\rangle" /> is{" "}
          <InlineMath math="|\langle \phi | \psi \rangle|^2" />.
          Probabilities are squared moduli of inner products. This is
          the empirical core of the theory and rests entirely on
          inner-product geometry.
        </li>
        <li>
          <strong>Orthogonal eigenstates.</strong> Eigenstates of an
          observable corresponding to distinct eigenvalues are{" "}
          orthogonal (spectral theorem). Equivalently, distinct
          measurement outcomes are perfectly distinguishable.
        </li>
        <li>
          <strong>Hilbert space</strong> is where the wave-function
          formulation of quantum mechanics lives:{" "}
          <InlineMath math="\psi : \mathbb{R}^3 \to \mathbb{C}" /> with{" "}
          <InlineMath math="\int |\psi|^2 \, d^3x = 1" />.
          Inner products are integrals; observables are operators on
          the space; everything else is the same algebra you've now
          built.
        </li>
        <li>
          <strong>Unitary operators</strong> preserve inner products:{" "}
          <InlineMath math="\langle U\psi, U\phi \rangle = \langle \psi, \phi \rangle" />.
          Equivalently <InlineMath math="U^* U = I" />. All quantum
          time evolutions and quantum gates are unitary, which is
          why <em>probability is conserved</em> by quantum dynamics.
        </li>
      </ul>

      <p>
        The next module is multivariable calculus, where we'll add
        partial derivatives and integrals over higher-dimensional
        domains. After that, differential equations, then we start
        the physics modules. By the time we reach quantum mechanics,
        every concept above will be load-bearing — and your job will
        mostly be remembering which is which, because all the linear
        algebra is sitting in this chapter, ready to be reused.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: Gram–Schmidt visualizer (2D)
// ════════════════════════════════════════════════════════════

function GramSchmidtWidget() {
  const [a1, setA1] = useState({ x: 2, y: 0.5 });
  const [a2, setA2] = useState({ x: 1, y: 1.6 });
  const [step, setStep] = useState(0);

  const w = 360;
  const h = 280;
  const cx = w / 2;
  const cy = h / 2;
  const scale = 45;
  const sx = (x: number) => cx + x * scale;
  const sy = (y: number) => cy - y * scale;

  // q1 = a1 / |a1|
  const a1Norm = Math.sqrt(a1.x * a1.x + a1.y * a1.y);
  const q1 = { x: a1.x / a1Norm, y: a1.y / a1Norm };

  // proj a2 onto q1
  const proj = (q1.x * a2.x + q1.y * a2.y);
  const projVec = { x: proj * q1.x, y: proj * q1.y };

  // residual
  const p2 = { x: a2.x - projVec.x, y: a2.y - projVec.y };
  const p2Norm = Math.sqrt(p2.x * p2.x + p2.y * p2.y);
  const q2 = { x: p2.x / p2Norm, y: p2.y / p2Norm };

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs uppercase tracking-widest text-ink-500 self-center mr-1">
            Step
          </span>
          {[
            { i: 0, label: "0 · inputs a₁, a₂" },
            { i: 1, label: "1 · normalise → q₁" },
            { i: 2, label: "2 · project a₂ onto q₁" },
            { i: 3, label: "3 · subtract → p₂" },
            { i: 4, label: "4 · normalise → q₂" },
          ].map((s) => (
            <button
              key={s.i}
              onClick={() => setStep(s.i)}
              className={`px-2.5 py-1.5 rounded-lg text-xs border transition ${
                step === s.i
                  ? "border-accent-soft bg-ink-800 text-white"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full block touch-none">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`gx${i}`} x1={sx(i - 4)} y1={0} x2={sx(i - 4)} y2={h} stroke="#1c1c28" strokeWidth={0.5} />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`gy${i}`} x1={0} y1={sy(i - 3)} x2={w} y2={sy(i - 3)} stroke="#1c1c28" strokeWidth={0.5} />
            ))}
            <line x1={0} y1={cy} x2={w} y2={cy} stroke="#2a2a37" />
            <line x1={cx} y1={0} x2={cx} y2={h} stroke="#2a2a37" />

            {/* a1 always shown */}
            <Arrow x1={sx(0)} y1={sy(0)} x2={sx(a1.x)} y2={sy(a1.y)} stroke="#22d3ee" />
            <text x={sx(a1.x) + 6} y={sy(a1.y) - 4} fill="#22d3ee" fontSize={11}>a₁</text>

            {/* a2 in step 0 only */}
            {step <= 2 && (
              <>
                <Arrow x1={sx(0)} y1={sy(0)} x2={sx(a2.x)} y2={sy(a2.y)} stroke="#fbbf24" />
                <text x={sx(a2.x) + 6} y={sy(a2.y) - 4} fill="#fbbf24" fontSize={11}>a₂</text>
              </>
            )}

            {/* q1 (unit length) for step >= 1 */}
            {step >= 1 && (
              <>
                <Arrow x1={sx(0)} y1={sy(0)} x2={sx(q1.x)} y2={sy(q1.y)} stroke="#22c55e" />
                <text x={sx(q1.x) + 6} y={sy(q1.y) + 14} fill="#22c55e" fontSize={11}>q₁</text>
              </>
            )}

            {/* projection visualization in step 2 */}
            {step === 2 && (
              <>
                <Arrow x1={sx(0)} y1={sy(0)} x2={sx(projVec.x)} y2={sy(projVec.y)} stroke="#fb923c" />
                <line x1={sx(a2.x)} y1={sy(a2.y)} x2={sx(projVec.x)} y2={sy(projVec.y)} stroke="#fb923c" strokeDasharray="3 3" strokeOpacity={0.6} />
                <text x={sx(projVec.x) + 6} y={sy(projVec.y) - 4} fill="#fb923c" fontSize={11}>proj</text>
              </>
            )}

            {/* residual p2 in step 3 */}
            {step >= 3 && (
              <>
                <Arrow x1={sx(0)} y1={sy(0)} x2={sx(p2.x)} y2={sy(p2.y)} stroke="#a78bfa" opacity={step === 4 ? 0.4 : 1} />
                <text x={sx(p2.x) + 6} y={sy(p2.y) - 4} fill="#a78bfa" fontSize={11}>p₂</text>
              </>
            )}

            {/* q2 in step 4 */}
            {step >= 4 && (
              <>
                <Arrow x1={sx(0)} y1={sy(0)} x2={sx(q2.x)} y2={sy(q2.y)} stroke="#f472b6" />
                <text x={sx(q2.x) + 6} y={sy(q2.y) - 4} fill="#f472b6" fontSize={11}>q₂</text>
              </>
            )}

            {/* draggable inputs */}
            {step === 0 && (
              <>
                <DraggableTip cx={sx(a1.x)} cy={sy(a1.y)} fill="#22d3ee" onDrag={(dx, dy) => setA1({ x: a1.x + dx / scale, y: a1.y - dy / scale })} />
                <DraggableTip cx={sx(a2.x)} cy={sy(a2.y)} fill="#fbbf24" onDrag={(dx, dy) => setA2({ x: a2.x + dx / scale, y: a2.y - dy / scale })} />
              </>
            )}
          </svg>
        </div>

        <div className="text-sm text-ink-300">
          {step === 0 && "Two input vectors. Drag the tips. Click ahead to run Gram–Schmidt."}
          {step === 1 && (
            <>
              <InlineMath math={`\\mathbf{q}_1 = \\mathbf{a}_1 / \\|\\mathbf{a}_1\\| = (${q1.x.toFixed(2)}, ${q1.y.toFixed(2)})`} />
            </>
          )}
          {step === 2 && (
            <>
              Project <InlineMath math="\mathbf{a}_2" /> onto{" "}
              <InlineMath math="\mathbf{q}_1" />:{" "}
              <InlineMath math={`\\langle \\mathbf{q}_1, \\mathbf{a}_2 \\rangle = ${proj.toFixed(3)}`} />.
            </>
          )}
          {step === 3 && (
            <>
              Residual{" "}
              <InlineMath math={`\\mathbf{p}_2 = \\mathbf{a}_2 - \\langle \\mathbf{q}_1, \\mathbf{a}_2\\rangle \\mathbf{q}_1 = (${p2.x.toFixed(2)}, ${p2.y.toFixed(2)})`} />.
              Orthogonal to <InlineMath math="\mathbf{q}_1" />.
            </>
          )}
          {step === 4 && (
            <>
              <InlineMath math={`\\mathbf{q}_2 = \\mathbf{p}_2 / \\|\\mathbf{p}_2\\| = (${q2.x.toFixed(2)}, ${q2.y.toFixed(2)})`} />.
              Now <InlineMath math="\{\mathbf{q}_1, \mathbf{q}_2\}" /> is
              orthonormal.
            </>
          )}
        </div>
      </div>
      <figcaption>
        Gram–Schmidt in pictures: keep <InlineMath math="\mathbf{a}_1" />,
        peel off the <InlineMath math="\mathbf{q}_1" />-component of{" "}
        <InlineMath math="\mathbf{a}_2" />, normalise the remainder. The
        result is an orthonormal basis for the same span.
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
  opacity = 1,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  opacity?: number;
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
    <g stroke={stroke} fill={stroke} opacity={opacity}>
      <line x1={x1} y1={y1} x2={tipBackX} y2={tipBackY} strokeWidth={2.2} />
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
          const sx2 = svg.viewBox.baseVal.width / rect.width;
          const sy2 = svg.viewBox.baseVal.height / rect.height;
          const dx = (ev.clientX - lastX) * sx2;
          const dy = (ev.clientY - lastY) * sy2;
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

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "Compute $\\langle (1, 2, 3), (4, 0, -1) \\rangle$ in $\\mathbb{R}^3$.",
    options: ["0", "1", "5", "13"],
    correct: 1,
    explanation:
      "$1 \\cdot 4 + 2 \\cdot 0 + 3 \\cdot (-1) = 4 + 0 - 3 = 1$.",
  },
  {
    prompt:
      "What does Cauchy–Schwarz say about $|\\langle \\mathbf{u}, \\mathbf{v} \\rangle|$?",
    options: [
      "It equals $\\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|$",
      "It is at most $\\|\\mathbf{u}\\| \\cdot \\|\\mathbf{v}\\|$",
      "It is always positive",
      "It equals $\\cos \\theta$",
    ],
    correct: 1,
    explanation:
      "$|\\langle \\mathbf{u}, \\mathbf{v} \\rangle| \\leq \\|\\mathbf{u}\\| \\, \\|\\mathbf{v}\\|$, with equality iff $\\mathbf{u}$ and $\\mathbf{v}$ are linearly dependent.",
  },
  {
    prompt:
      "If $\\{\\mathbf{q}_1, \\mathbf{q}_2, \\mathbf{q}_3\\}$ is an orthonormal basis, the coefficient of $\\mathbf{v}$ on $\\mathbf{q}_2$ in $\\mathbf{v} = c_1 \\mathbf{q}_1 + c_2 \\mathbf{q}_2 + c_3 \\mathbf{q}_3$ is…",
    options: [
      "$\\mathbf{v}_2$ (the second component of $\\mathbf{v}$)",
      "$\\langle \\mathbf{q}_2, \\mathbf{v} \\rangle$",
      "$\\|\\mathbf{v}\\|$",
      "$\\mathbf{q}_2 \\times \\mathbf{v}$",
    ],
    correct: 1,
    explanation:
      "In an orthonormal basis, coefficients are inner products: $c_i = \\langle \\mathbf{q}_i, \\mathbf{v} \\rangle$. This is what makes orthonormal bases practical.",
  },
  {
    prompt:
      "The QR decomposition $A = QR$ has what shape for $Q$?",
    options: [
      "Diagonal",
      "Lower triangular",
      "Orthogonal columns ($Q^T Q = I$)",
      "The same shape as $A$ but transposed",
    ],
    correct: 2,
    explanation:
      "$Q$'s columns are an orthonormal basis (the Gram–Schmidt output), and $R$ is upper triangular and records the projection coefficients.",
  },
  {
    prompt:
      "By the Born rule, the probability of measuring $|\\psi\\rangle$ and finding $|\\phi\\rangle$ is…",
    options: [
      "$\\langle \\phi | \\psi \\rangle$",
      "$|\\langle \\phi | \\psi \\rangle|^2$",
      "$\\|\\psi - \\phi\\|^2$",
      "$\\langle \\psi, \\psi \\rangle$",
    ],
    correct: 1,
    explanation:
      "Quantum probabilities are squared moduli of inner products. The bare $\\langle\\phi|\\psi\\rangle$ is a complex 'amplitude', not a probability.",
  },
];
