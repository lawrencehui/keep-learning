import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function TensorBody() {
  return (
    <>
      <p>
        Tensor products are how vector spaces combine. If you've
        got two systems described by{" "}
        <InlineMath math="V" /> and <InlineMath math="W" />, the{" "}
        <em>composite</em> system lives in{" "}
        <InlineMath math="V \otimes W" />. For two qubits this
        gives a 4-dimensional space; for{" "}
        <InlineMath math="n" /> qubits, <InlineMath math="2^n" />.
        Tensor products are also the right way to handle
        multilinear algebra (forms, determinants), differential
        forms, and the multilinear maps of physics (e.g. the
        metric tensor, the Riemann curvature tensor).
      </p>
      <p>
        We'll define the tensor product, derive its universal
        property (which is what makes it useful), and look at
        derived constructions: symmetric powers, exterior
        powers, and how determinants live there.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Roman — Advanced Linear Algebra, ch. 14",
            author: "Steven Roman",
            duration: "Reading",
            url: "https://www.springer.com/book/9780387728285",
            note: "The cleanest abstract treatment of tensor products at the right level for this chapter.",
          },
          {
            title: "Penrose — The Road to Reality, ch. 12–13",
            author: "Roger Penrose",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/The_Road_to_Reality",
            note: "Tensor index notation as physicists use it. Excellent geometric motivation.",
          },
          {
            title: "Nielsen &amp; Chuang — Quantum Information, ch. 2.2",
            author: "Nielsen / Chuang",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Quantum_Computation_and_Quantum_Information",
            note: "Tensor products in QC. The book we'll use heavily in Tier XVI.",
          },
          {
            title: "Differential forms (Bachman)",
            author: "David Bachman",
            duration: "Reading",
            url: "https://www.springer.com/book/9780817683030",
            note: "Friendly intro to exterior algebra and forms. Worth reading for geometric intuition.",
          },
          {
            title: "Categories for the Working Mathematician — Mac Lane",
            author: "Saunders Mac Lane",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Categories_for_the_Working_Mathematician",
            note: "If you want to see the universal property in its native categorical setting.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Multilinear maps</h2>

      <p>
        A function{" "}
        <InlineMath math="\beta : V \times W \to U" /> is{" "}
        <strong>bilinear</strong> if it's linear in each argument
        separately:
      </p>
      <BlockMath math="\beta(\alpha v_1 + v_2, w) = \alpha \beta(v_1, w) + \beta(v_2, w)" />
      <BlockMath math="\beta(v, \alpha w_1 + w_2) = \alpha \beta(v, w_1) + \beta(v, w_2)." />

      <p>
        Bilinear ≠ linear: <InlineMath math="\beta" /> is a function
        of <em>two</em> arguments, not one, and the linearity is in
        each separately. The dot product on{" "}
        <InlineMath math="\mathbb{R}^n" /> is bilinear; matrix
        multiplication{" "}
        <InlineMath math="(A, B) \mapsto AB" /> is bilinear.
      </p>

      <p>
        Multilinear maps: same idea with{" "}
        <InlineMath math="k" /> arguments. The determinant of an{" "}
        <InlineMath math="n \times n" /> matrix as a function of
        its <InlineMath math="n" /> columns is{" "}
        <InlineMath math="n" />-multilinear (and alternating —
        Part 4).
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Tensor product construction</h2>

      <p>
        The tensor product{" "}
        <InlineMath math="V \otimes W" /> is the universal vector
        space that "linearises bilinearity": every bilinear map{" "}
        <InlineMath math="V \times W \to U" /> factors uniquely
        through a linear map{" "}
        <InlineMath math="V \otimes W \to U" />.
      </p>

      <h3>The concrete construction</h3>

      <p>
        Pick bases <InlineMath math="\{e_i\}" /> of{" "}
        <InlineMath math="V" /> and <InlineMath math="\{f_j\}" /> of{" "}
        <InlineMath math="W" />. The tensor product{" "}
        <InlineMath math="V \otimes W" /> is the vector space with
        basis{" "}
        <InlineMath math="\{e_i \otimes f_j\}" /> for all{" "}
        <InlineMath math="(i, j)" />. So
      </p>
      <BlockMath math="\dim(V \otimes W) = (\dim V)(\dim W)." />

      <p>
        Given <InlineMath math="v = \sum a_i e_i" /> and{" "}
        <InlineMath math="w = \sum b_j f_j" />, define
      </p>
      <BlockMath math="v \otimes w = \sum_{i, j} a_i b_j (e_i \otimes f_j)." />

      <p>
        And we extend by linearity to general elements of{" "}
        <InlineMath math="V \otimes W" />, which are{" "}
        <em>linear combinations</em> of simple tensors{" "}
        <InlineMath math="v \otimes w" />.
      </p>

      <Callout title="Universal property of tensor product">
        For any vector spaces{" "}
        <InlineMath math="V, W" />, there exists a vector space{" "}
        <InlineMath math="V \otimes W" /> and a bilinear map{" "}
        <InlineMath math="\otimes : V \times W \to V \otimes W" />{" "}
        such that for any bilinear map{" "}
        <InlineMath math="\beta : V \times W \to U" />, there
        exists a unique linear map{" "}
        <InlineMath math="\tilde\beta : V \otimes W \to U" /> with{" "}
        <InlineMath math="\beta(v, w) = \tilde\beta(v \otimes w)" />.
      </Callout>

      <p>
        That's the abstract definition. Bilinear maps from{" "}
        <InlineMath math="V \times W" /> are in bijection with
        linear maps from <InlineMath math="V \otimes W" />. Tensor
        products turn bilinearity into linearity.
      </p>

      <Pitfall>
        <strong>Not every element of</strong>{" "}
        <InlineMath math="V \otimes W" /> is a simple tensor{" "}
        <InlineMath math="v \otimes w" />! Most are <em>sums</em>{" "}
        of simple tensors — and many cannot be reduced to a single
        simple tensor. In quantum mechanics this is exactly{" "}
        <em>entanglement</em>: an entangled two-particle state is
        a non-trivial sum, not a product. We'll come back to this.
      </Pitfall>

      <h3>Tensor of operators</h3>

      <p>
        For linear operators{" "}
        <InlineMath math="A : V \to V'" /> and{" "}
        <InlineMath math="B : W \to W'" />, define{" "}
        <InlineMath math="A \otimes B : V \otimes W \to V' \otimes W'" /> by
      </p>
      <BlockMath math="(A \otimes B)(v \otimes w) = (A v) \otimes (B w)." />

      <p>
        In matrix form (Kronecker product): if{" "}
        <InlineMath math="A" /> is{" "}
        <InlineMath math="m \times n" /> and{" "}
        <InlineMath math="B" /> is{" "}
        <InlineMath math="p \times q" />, then{" "}
        <InlineMath math="A \otimes B" /> is{" "}
        <InlineMath math="(mp) \times (nq)" /> with block{" "}
        <InlineMath math="(i, j)" /> equal to{" "}
        <InlineMath math="A_{ij} B" />.
      </p>

      <p>
        Properties:
      </p>
      <ul>
        <li>
          <InlineMath math="(A \otimes B)(C \otimes D) = (AC) \otimes (BD)" />.
        </li>
        <li>
          <InlineMath math="(A \otimes B)^* = A^* \otimes B^*" />.
        </li>
        <li>
          <InlineMath math="\det(A \otimes B) = (\det A)^{\dim W} (\det B)^{\dim V}" />.
        </li>
        <li>
          Eigenvalues of{" "}
          <InlineMath math="A \otimes B" /> are products of
          eigenvalues:{" "}
          <InlineMath math="\{\lambda_i \mu_j\}" />.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Two-qubit example</h2>

      <p>
        For one qubit, the state space is{" "}
        <InlineMath math="\mathbb{C}^2" /> with basis{" "}
        <InlineMath math="\{|0\rangle, |1\rangle\}" />.
      </p>

      <p>
        For two qubits, the state space is{" "}
        <InlineMath math="\mathbb{C}^2 \otimes \mathbb{C}^2 = \mathbb{C}^4" />,
        with basis
      </p>
      <BlockMath math="\{|0\rangle \otimes |0\rangle, |0\rangle \otimes |1\rangle, |1\rangle \otimes |0\rangle, |1\rangle \otimes |1\rangle\}." />

      <p>
        Often abbreviated{" "}
        <InlineMath math="|00\rangle, |01\rangle, |10\rangle, |11\rangle" />.
      </p>

      <h3>Product vs. entangled states</h3>

      <p>
        A general two-qubit state:{" "}
        <InlineMath math="|\psi\rangle = c_{00}|00\rangle + c_{01}|01\rangle + c_{10}|10\rangle + c_{11}|11\rangle" />.
      </p>

      <p>
        <strong>Product (separable)</strong> if{" "}
        <InlineMath math="|\psi\rangle = |\alpha\rangle \otimes |\beta\rangle" />{" "}
        for some single-qubit{" "}
        <InlineMath math="|\alpha\rangle, |\beta\rangle" />. The
        criterion: the determinant of{" "}
        <InlineMath math="\begin{pmatrix} c_{00} & c_{01} \\ c_{10} & c_{11} \end{pmatrix}" /> equals
        zero.
      </p>

      <p>
        <strong>Entangled</strong> otherwise. The Bell state
      </p>
      <BlockMath math="|\Phi^+\rangle = \tfrac{1}{\sqrt 2}(|00\rangle + |11\rangle)" />
      <p>
        has determinant <InlineMath math="1/2 \neq 0" />, so it's
        entangled — it cannot be written as a product of two
        single-qubit states. Measurement of one qubit determines
        the other instantly. Bell's theorem (Tier XV) shows this
        is genuinely non-classical.
      </p>

      <h3>n-qubit dimension explosion</h3>

      <p>
        For <InlineMath math="n" /> qubits: state space is{" "}
        <InlineMath math="\mathbb{C}^{2^n}" />. 50 qubits = a vector
        space of dimension{" "}
        <InlineMath math="2^{50} \approx 10^{15}" />. Classical
        simulation costs exponential memory. This is why quantum
        computers can do things classical computers can't — they
        manipulate vectors in this exponentially-large tensor
        product directly.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Symmetric and exterior powers</h2>

      <p>
        The full tensor product is too big when you want to
        respect symmetry or anti-symmetry of arguments. Two
        important quotients:
      </p>

      <h3>Symmetric power</h3>

      <p>
        The <strong>symmetric power</strong>{" "}
        <InlineMath math="\mathrm{Sym}^k V" /> consists of
        symmetric tensors — those invariant under permutation of
        their <InlineMath math="k" /> arguments. Equivalently, the
        quotient of <InlineMath math="V^{\otimes k}" /> by{" "}
        <InlineMath math="v_1 \otimes \cdots \otimes v_k - v_{\sigma(1)} \otimes \cdots \otimes v_{\sigma(k)}" />{" "}
        for all permutations <InlineMath math="\sigma" />.
      </p>

      <p>
        Dimension:{" "}
        <InlineMath math="\binom{n + k - 1}{k}" /> for{" "}
        <InlineMath math="\dim V = n" />.
      </p>

      <h3>Exterior power</h3>

      <p>
        The <strong>exterior power</strong>{" "}
        <InlineMath math="\Lambda^k V" /> consists of antisymmetric
        tensors — those that flip sign under transposition. We
        write the antisymmetric tensor product as{" "}
        <InlineMath math="v_1 \wedge v_2 \wedge \cdots \wedge v_k" />,
        with{" "}
        <InlineMath math="v_1 \wedge v_2 = -v_2 \wedge v_1" />.
      </p>

      <p>
        Key fact:{" "}
        <InlineMath math="v \wedge v = 0" />. So if any two
        arguments are equal, the wedge vanishes.
      </p>

      <p>
        Dimension:{" "}
        <InlineMath math="\binom{n}{k}" /> for{" "}
        <InlineMath math="\dim V = n" />. For{" "}
        <InlineMath math="k > n" />,{" "}
        <InlineMath math="\Lambda^k V = 0" />.
      </p>

      <h3>The determinant as the top exterior power</h3>

      <p>
        For an <InlineMath math="n" />-dimensional space{" "}
        <InlineMath math="V" />,{" "}
        <InlineMath math="\Lambda^n V" /> is one-dimensional. A
        linear map <InlineMath math="T : V \to V" /> induces a
        linear map{" "}
        <InlineMath math="\Lambda^n T : \Lambda^n V \to \Lambda^n V" />,
        which on a 1D space is multiplication by a scalar — and
        that scalar is exactly{" "}
        <InlineMath math="\det T" />.
      </p>

      <p>
        Equivalently: the determinant is the{" "}
        <em>unique</em> alternating multilinear function of the
        columns satisfying{" "}
        <InlineMath math="\det I = 1" />. The wedge product gives
        you alternating multilinearity for free.
      </p>

      <h3>Differential forms</h3>

      <p>
        On a manifold, smooth alternating tensor fields are{" "}
        <em>differential forms</em>. They're the natural objects of
        integration in higher dimensions: 1-forms integrate over
        curves, 2-forms over surfaces, etc. The de Rham complex,
        Stokes's theorem on manifolds, integration on Lie groups,
        and topology of smooth manifolds (de Rham cohomology) all
        speak this language. We met fragments of it in Vector
        Calculus (Tier IV).
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Why this matters</h2>

      <ul>
        <li>
          <strong>Quantum mechanics.</strong> Multi-particle
          systems live in tensor products. Composite Hilbert
          spaces, density matrices, and entanglement are all
          tensor-product phenomena. The exponential growth of
          dimension with number of particles drives both the
          difficulty of classical quantum simulation and the
          power of quantum computers.
        </li>
        <li>
          <strong>Identical particles.</strong> Bosons live in
          the symmetric subspace; fermions in the antisymmetric
          (exterior) subspace. The Pauli exclusion principle is
          literally{" "}
          <InlineMath math="v \wedge v = 0" /> — two fermions
          can't be in the same state because the wedge vanishes.
        </li>
        <li>
          <strong>General relativity.</strong> The metric tensor{" "}
          <InlineMath math="g_{\mu\nu}" /> is a symmetric 2-tensor;
          the Riemann curvature tensor is a 4-tensor with
          symmetries. Index notation hides tensor-product
          structure but is just shorthand.
        </li>
        <li>
          <strong>Machine learning.</strong> Convolutions are
          tensor contractions; transformer attention is a
          tensor-network computation. Differential geometry of
          neural networks (information geometry) lives in
          tensor / multilinear algebra.
        </li>
        <li>
          <strong>Quantum information.</strong> Tensor networks
          (matrix product states, PEPS, MERA) are the leading
          numerical tool for simulating quantum many-body
          systems. The geometry of entanglement is the geometry
          of tensor decompositions.
        </li>
      </ul>

      <p>
        Last chapter of this module: Hilbert spaces. The
        infinite-dimensional generalisation that's the actual
        home of quantum mechanics.
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
      "$\\dim(V \\otimes W)$ equals…",
    options: [
      "$\\dim V + \\dim W$",
      "$\\dim V \\cdot \\dim W$",
      "$\\max(\\dim V, \\dim W)$",
      "$\\dim V + \\dim W - 1$",
    ],
    correct: 1,
    explanation:
      "Tensor products multiply dimensions. For two qubits: $\\mathbb{C}^2 \\otimes \\mathbb{C}^2 = \\mathbb{C}^4$. For $n$ qubits: $\\mathbb{C}^{2^n}$.",
  },
  {
    prompt:
      "Most elements of $V \\otimes W$ are…",
    options: [
      "simple tensors $v \\otimes w$",
      "linear combinations of simple tensors that cannot be reduced to a single $v \\otimes w$",
      "zero",
      "scalars",
    ],
    correct: 1,
    explanation:
      "A generic element is a sum of simple tensors that doesn't 'separate' as a single product. In QM this is exactly entanglement — Bell states and other entangled states are unfactorable.",
  },
  {
    prompt:
      "The Bell state $\\frac{1}{\\sqrt 2}(|00\\rangle + |11\\rangle)$ is entangled because…",
    options: [
      "$|00\\rangle$ and $|11\\rangle$ are orthogonal",
      "the determinant of its coefficient matrix $\\begin{pmatrix} 1/\\sqrt 2 & 0 \\\\ 0 & 1/\\sqrt 2 \\end{pmatrix}$ is $1/2 \\neq 0$",
      "it's a sum of two terms",
      "it has positive coefficients",
    ],
    correct: 1,
    explanation:
      "A two-qubit state factors as $|\\alpha\\rangle \\otimes |\\beta\\rangle$ iff the determinant of its coefficient matrix is zero. Bell states have determinant $\\pm 1/2 \\neq 0$, so they're entangled.",
  },
  {
    prompt:
      "The Pauli exclusion principle is mathematically…",
    options: [
      "$v \\wedge v = 0$ in the exterior algebra",
      "the spectral theorem",
      "Heisenberg's uncertainty",
      "an empirical fact with no math basis",
    ],
    correct: 0,
    explanation:
      "Fermion states are antisymmetric tensors — elements of $\\Lambda^k V$. Two identical fermions in the same single-particle state give $v \\wedge v = 0$, i.e. the state vanishes. That's the exclusion principle.",
  },
  {
    prompt:
      "The determinant of a linear map $T : V \\to V$ ($\\dim V = n$) is…",
    options: [
      "$\\det T = \\sum$ of eigenvalues",
      "the scalar by which $T$ scales the top exterior power $\\Lambda^n V$",
      "the trace of $T$",
      "the rank of $T$",
    ],
    correct: 1,
    explanation:
      "$\\Lambda^n V$ is 1-dimensional, and $T$ acts on it as multiplication by $\\det T$. This is the categorical / multilinear definition. Equivalently, det is the product (not sum!) of eigenvalues with multiplicity.",
  },
];
