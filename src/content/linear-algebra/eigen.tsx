import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function EigenBody() {
  return (
    <>
      <p>
        Most linear maps are messy when you write them as a matrix —
        every entry can be nonzero, and computing{" "}
        <InlineMath math="A^{100}" /> looks ugly. But hidden inside{" "}
        every matrix is a special set of directions —{" "}
        <strong>eigenvectors</strong> — along which the matrix acts
        with extreme simplicity, just stretching by a scalar. If you
        choose a basis of eigenvectors, the matrix becomes diagonal.
        Diagonal matrices are trivial to manipulate. So the great
        result of this chapter is: <em>often</em>, you can replace any
        matrix problem with an equivalent diagonal one. The
        not-always-but-frequently-yes case is the rule, not the
        exception, and finding eigenvalues is the price of admission.
      </p>
      <p>
        Why this matters more than any earlier chapter: in quantum
        mechanics, eigenvalues of certain operators{" "}
        <em>are the measured values</em>. The energy levels of an
        atom, the spin orientations of an electron, the momentum
        eigenstates of a free particle — all "what could you measure"
        questions become "what are the eigenvalues of an operator"
        questions. This is the chapter where linear algebra stops
        being algebra and starts being physics.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Essence of Linear Algebra — Ch. 14: Eigenvectors and eigenvalues",
            author: "3Blue1Brown",
            duration: "17 min",
            url: "https://www.youtube.com/watch?v=PFDu9oVAE-g",
            note: "The visual definition. Watch first.",
          },
          {
            title: "MIT 18.06 — Lectures 21–25 (eigenvalues, diagonalization)",
            author: "Gilbert Strang (MIT OCW)",
            duration: "~6h",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/video_galleries/video-lectures/",
            note: "Strang's eigenvalue lectures cover everything in this chapter and more.",
          },
          {
            title: "Strang — Lecture 29: Singular Value Decomposition",
            author: "Gilbert Strang",
            duration: "40 min",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/lecture-29-singular-value-decomposition/",
            note: "For Part 8 (SVD).",
          },
          {
            title: "Linear Algebra Done Right — chs. 5, 7",
            author: "Sheldon Axler",
            duration: "Reading",
            url: "https://linear.axler.net/",
            note: "Axler's whole book is built around eigenvalues. Excellent for the abstract perspective.",
          },
          {
            title: "Spectral theorem (lecture notes)",
            author: "various",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Spectral_theorem",
            note: "Wikipedia is unusually clear here. Skim if a clean statement helps.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The eigenvalue problem</h2>

      <p>
        For a square matrix <InlineMath math="A" />, an{" "}
        <strong>eigenvector</strong> is a nonzero vector{" "}
        <InlineMath math="\mathbf{v}" /> with the property
      </p>
      <BlockMath math="A \mathbf{v} = \lambda \mathbf{v}" />
      <p>
        for some scalar <InlineMath math="\lambda" />, the{" "}
        <strong>eigenvalue</strong> associated with{" "}
        <InlineMath math="\mathbf{v}" />.
      </p>
      <p>
        Geometrically: the matrix <InlineMath math="A" /> represents a
        transformation. For most input vectors,{" "}
        <InlineMath math="A\mathbf{v}" /> points in a different
        direction than <InlineMath math="\mathbf{v}" />. But for a
        few special directions —{" "}
        the eigenvectors — the transformation acts trivially, just
        stretching <InlineMath math="\mathbf{v}" /> by a factor{" "}
        <InlineMath math="\lambda" /> without rotating it.{" "}
        <InlineMath math="\lambda" /> can be positive (stretch),
        negative (stretch + flip), zero (collapse to the origin), or
        complex (in 2D, indicating rotation that has no fixed real
        direction).
      </p>

      <p>Two simple examples:</p>
      <ul>
        <li>
          <strong>Identity</strong>{" "}
          <InlineMath math="I\mathbf{v} = \mathbf{v}" /> — every nonzero
          vector is an eigenvector with{" "}
          <InlineMath math="\lambda = 1" />.
        </li>
        <li>
          <strong>Projection onto the x-axis</strong> in{" "}
          <InlineMath math="\mathbb{R}^2" />: vectors along{" "}
          <InlineMath math="\mathbf{e}_1" /> are eigenvectors with{" "}
          <InlineMath math="\lambda = 1" />; vectors along{" "}
          <InlineMath math="\mathbf{e}_2" /> are eigenvectors with{" "}
          <InlineMath math="\lambda = 0" /> (they get crushed to zero).
        </li>
      </ul>

      <p>
        Notice that scaling an eigenvector gives another eigenvector
        with the <em>same</em> eigenvalue:{" "}
        <InlineMath math="A(c\mathbf{v}) = c A\mathbf{v} = c\lambda\mathbf{v} = \lambda(c\mathbf{v})" />.
        So eigenvectors are typically reported as a direction (any
        nonzero scalar multiple works), not a specific vector.
      </p>

      <Callout title="Try it">
        Pick a 2×2 matrix and watch eigenvectors light up. Drag the
        sample arrow around — most directions get rotated by{" "}
        <InlineMath math="A" />, but along the eigen-directions it's
        only stretched.
      </Callout>

      <EigenWidget />

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The characteristic polynomial</h2>

      <p>
        Rearrange the eigenvalue equation:
      </p>
      <BlockMath math="A \mathbf{v} = \lambda \mathbf{v} \;\;\Longleftrightarrow\;\; (A - \lambda I) \mathbf{v} = \mathbf{0}." />
      <p>
        For this to have a nonzero solution{" "}
        <InlineMath math="\mathbf{v}" />, the matrix{" "}
        <InlineMath math="A - \lambda I" /> must be{" "}
        <em>singular</em> (otherwise the only solution is{" "}
        <InlineMath math="\mathbf{v} = \mathbf{0}" />, which doesn't
        count). Hence:
      </p>
      <BlockMath math="\det(A - \lambda I) = 0." />
      <p>
        This is the <strong>characteristic equation</strong> of{" "}
        <InlineMath math="A" />. Expanding the determinant gives a
        polynomial in <InlineMath math="\lambda" /> of degree{" "}
        <InlineMath math="n" /> (where{" "}
        <InlineMath math="A" /> is{" "}
        <InlineMath math="n \times n" />), called the{" "}
        <strong>characteristic polynomial</strong>{" "}
        <InlineMath math="p(\lambda)" />. Its roots are the
        eigenvalues.
      </p>

      <h3>Worked example: 2×2</h3>

      <p>
        Find the eigenvalues of{" "}
        <InlineMath math="A = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}" />
        .
      </p>
      <BlockMath math="\det(A - \lambda I) = \det \begin{pmatrix} 4 - \lambda & 1 \\ 2 & 3 - \lambda \end{pmatrix} = (4 - \lambda)(3 - \lambda) - 2 = \lambda^2 - 7\lambda + 10." />

      <p>
        Factor: <InlineMath math="\lambda^2 - 7\lambda + 10 = (\lambda - 2)(\lambda - 5)" />.
        Eigenvalues: <InlineMath math="\lambda_1 = 2" /> and{" "}
        <InlineMath math="\lambda_2 = 5" />.
      </p>

      <h3>Two formulas worth memorising</h3>
      <p>
        For an <InlineMath math="n \times n" /> matrix:
      </p>
      <BlockMath math="\sum_i \lambda_i = \operatorname{tr}(A), \qquad \prod_i \lambda_i = \det(A)." />
      <p>
        Where <InlineMath math="\operatorname{tr}(A)" />, the{" "}
        <strong>trace</strong>, is the sum of diagonal entries. These
        let you sanity-check eigenvalue calculations: above,{" "}
        <InlineMath math="2 + 5 = 7 = 4 + 3" /> ✓ and{" "}
        <InlineMath math="2 \cdot 5 = 10 = (4)(3) - (1)(2)" /> ✓. For
        <InlineMath math="2 \times 2" />, those two facts plus the
        characteristic polynomial form a near-instant routine.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Computing eigenvectors</h2>

      <p>
        Once you have an eigenvalue <InlineMath math="\lambda" />, find
        the eigenvectors by solving{" "}
        <InlineMath math="(A - \lambda I)\mathbf{v} = \mathbf{0}" />.
        That's a homogeneous linear system — the eigenvector is in the
        null space of <InlineMath math="A - \lambda I" />.
      </p>

      <p>Continuing the example with <InlineMath math="\lambda_1 = 2" />:</p>

      <BlockMath math="A - 2I = \begin{pmatrix} 2 & 1 \\ 2 & 1 \end{pmatrix}." />
      <p>
        Row-reduce: subtract row 1 from row 2 to get{" "}
        <InlineMath math="\begin{pmatrix} 2 & 1 \\ 0 & 0 \end{pmatrix}" />.
        The free variable solution: <InlineMath math="2x + y = 0" />, so{" "}
        <InlineMath math="y = -2x" />. The eigenvector is any nonzero
        multiple of <InlineMath math="(1, -2)" />.
      </p>

      <p>
        For <InlineMath math="\lambda_2 = 5" />:
      </p>
      <BlockMath math="A - 5I = \begin{pmatrix} -1 & 1 \\ 2 & -2 \end{pmatrix}, \quad \mathbf{v}_2 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}." />

      <p>
        The set of all eigenvectors with eigenvalue{" "}
        <InlineMath math="\lambda" /> (together with{" "}
        <InlineMath math="\mathbf{0}" />) forms a subspace, the{" "}
        <strong>eigenspace</strong>{" "}
        <InlineMath math="E_\lambda = \ker(A - \lambda I)" />.
      </p>

      <Exercise
        number="3.1"
        prompt={
          <>
            Find eigenvalues and eigenvectors of{" "}
            <InlineMath math="\begin{pmatrix} 1 & 2 \\ 4 & 3 \end{pmatrix}" />.
          </>
        }
      >
        <p>
          Char poly: <InlineMath math="(1-\lambda)(3-\lambda) - 8 = \lambda^2 - 4\lambda - 5 = (\lambda - 5)(\lambda + 1)" />.
          Eigenvalues: <InlineMath math="\lambda_1 = 5, \lambda_2 = -1" />.
        </p>
        <p>
          For <InlineMath math="\lambda = 5" />:{" "}
          <InlineMath math="\begin{pmatrix} -4 & 2 \\ 4 & -2 \end{pmatrix}" /> →
          eigenvector <InlineMath math="(1, 2)" />.
        </p>
        <p>
          For <InlineMath math="\lambda = -1" />:{" "}
          <InlineMath math="\begin{pmatrix} 2 & 2 \\ 4 & 4 \end{pmatrix}" /> →
          eigenvector <InlineMath math="(1, -1)" />. Check trace:{" "}
          <InlineMath math="5 + (-1) = 4 = 1 + 3" /> ✓; det:{" "}
          <InlineMath math="(5)(-1) = -5 = 3 - 8" /> ✓.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Algebraic vs geometric multiplicity</h2>

      <p>
        Two notions of "how many times an eigenvalue appears":
      </p>
      <ul>
        <li>
          <strong>Algebraic multiplicity</strong> of{" "}
          <InlineMath math="\lambda" />: its multiplicity as a root of
          the characteristic polynomial.
        </li>
        <li>
          <strong>Geometric multiplicity</strong> of{" "}
          <InlineMath math="\lambda" />: the dimension of the
          eigenspace <InlineMath math="E_\lambda" />, i.e. how many
          linearly independent eigenvectors have eigenvalue{" "}
          <InlineMath math="\lambda" />.
        </li>
      </ul>

      <p>
        Algebraic ≥ geometric, always. When they're equal for every
        eigenvalue, the matrix is{" "}
        <strong>diagonalizable</strong> (next part). When they differ
        — e.g. the matrix{" "}
        <InlineMath math="\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}" /> has{" "}
        <InlineMath math="\lambda = 1" /> with algebraic multiplicity 2
        but geometric multiplicity 1 — the matrix is{" "}
        <strong>defective</strong>, and you need a Jordan form (
        beyond this chapter, and rarer in practice than textbooks
        suggest).
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Diagonalization</h2>

      <p>
        Suppose <InlineMath math="A" /> has{" "}
        <InlineMath math="n" /> linearly independent eigenvectors{" "}
        <InlineMath math="\mathbf{v}_1, \dots, \mathbf{v}_n" /> with
        eigenvalues <InlineMath math="\lambda_1, \dots, \lambda_n" />.
        Stack them as columns of a matrix{" "}
        <InlineMath math="P" />, and place the eigenvalues on the
        diagonal of <InlineMath math="D" />:
      </p>
      <BlockMath math="P = \bigl[\, \mathbf{v}_1 \mid \mathbf{v}_2 \mid \cdots \mid \mathbf{v}_n \,\bigr], \qquad D = \operatorname{diag}(\lambda_1, \dots, \lambda_n)." />
      <p>Then</p>
      <BlockMath math="A = P D P^{-1}." />
      <p>
        Why: <InlineMath math="A P" /> equals{" "}
        <InlineMath math="P" /> with each column scaled by its
        eigenvalue, which is exactly <InlineMath math="P D" />.
        Multiplying both sides by{" "}
        <InlineMath math="P^{-1}" /> on the right gives the
        factorisation.
      </p>

      <h3>Why diagonalisation is useful</h3>

      <p>
        Powers of <InlineMath math="A" /> become trivial:
      </p>
      <BlockMath math="A^k = P D^k P^{-1}, \qquad D^k = \operatorname{diag}(\lambda_1^k, \dots, \lambda_n^k)." />
      <p>
        Computing <InlineMath math="A^{100}" /> is now reduced to
        raising scalars to the 100th power. Without diagonalisation,
        that would be 99 matrix multiplications.
      </p>

      <p>
        <strong>Worked application: Fibonacci numbers.</strong> Let{" "}
        <InlineMath math="F_n" /> satisfy{" "}
        <InlineMath math="F_n = F_{n-1} + F_{n-2}" /> with{" "}
        <InlineMath math="F_0 = 0, F_1 = 1" />. Encode as a vector
        recurrence:
      </p>
      <BlockMath math="\begin{pmatrix} F_{n+1} \\ F_n \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} F_n \\ F_{n-1} \end{pmatrix}." />
      <p>
        Iterate <InlineMath math="n" /> times:{" "}
        <InlineMath math="(F_{n+1}, F_n)^T = A^n (1, 0)^T" />. The
        eigenvalues of <InlineMath math="A" /> are the golden ratio
        and its conjugate:{" "}
        <InlineMath math="\varphi = (1 + \sqrt 5)/2" /> and{" "}
        <InlineMath math="\bar\varphi = (1 - \sqrt 5)/2" />. After
        diagonalisation:
      </p>
      <BlockMath math="F_n = \frac{\varphi^n - \bar\varphi^n}{\sqrt 5}." />
      <p>
        <em>Binet's formula</em> — a closed-form expression for the{" "}
        <InlineMath math="n" />-th Fibonacci number, falling out of
        diagonalisation in two pages.
      </p>

      <Pitfall>
        Not every matrix is diagonalisable. A matrix with fewer than{" "}
        <InlineMath math="n" /> linearly independent eigenvectors —{" "}
        <em>defective</em> in the previous part — can't be brought to
        diagonal form by similarity. Defective matrices are rare among
        random matrices but common in carefully-chosen examples (
        repeated eigenvalues with insufficient eigenvectors). For
        them, the Jordan canonical form is the substitute.
      </Pitfall>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Matrix exponentials</h2>

      <p>
        The matrix exponential is defined by the Taylor series:
      </p>
      <BlockMath math="e^A := \sum_{k = 0}^{\infty} \frac{A^k}{k!} = I + A + \frac{A^2}{2!} + \frac{A^3}{3!} + \cdots" />
      <p>
        This series converges for any square matrix{" "}
        <InlineMath math="A" />. When <InlineMath math="A" /> is
        diagonalisable, computation collapses:
      </p>
      <BlockMath math="e^A = P e^D P^{-1}, \qquad e^D = \operatorname{diag}(e^{\lambda_1}, \dots, e^{\lambda_n})." />

      <p>
        Why this is essential. The system of linear ODEs{" "}
        <InlineMath math="d\mathbf{x}/dt = A\mathbf{x}" /> with initial
        condition <InlineMath math="\mathbf{x}(0) = \mathbf{x}_0" /> has
        the closed-form solution
      </p>
      <BlockMath math="\mathbf{x}(t) = e^{At} \mathbf{x}_0." />
      <p>
        That's the matrix analogue of the scalar{" "}
        <InlineMath math="x(t) = e^{at} x_0" />. With diagonalisation,
        every linear ODE system reduces to <InlineMath math="n" />{" "}
        decoupled scalar ODEs, one per eigenvalue.
      </p>

      <p>
        And the quantum payoff: the Schrödinger equation reads{" "}
        <InlineMath math="i\hbar \, d\psi/dt = H\psi" /> for a{" "}
        Hermitian Hamiltonian <InlineMath math="H" />. The solution is{" "}
        <InlineMath math="\psi(t) = e^{-iHt/\hbar} \psi(0)" />. Quantum
        time evolution is literally a matrix exponential, with the
        eigenvalues of <InlineMath math="H" /> (the energy levels)
        appearing as phases in <InlineMath math="e^{-iHt/\hbar}" />.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · The spectral theorem</h2>

      <p>
        Among all matrices, the <em>symmetric</em> ones (and their
        complex cousins, <em>Hermitian</em> matrices) are the
        best-behaved.
      </p>

      <Callout title="Spectral theorem (real symmetric case)">
        If <InlineMath math="A = A^T" /> (real symmetric), then:
        <ul>
          <li>All eigenvalues of <InlineMath math="A" /> are real.</li>
          <li>
            Eigenvectors corresponding to distinct eigenvalues are
            orthogonal.
          </li>
          <li>
            <InlineMath math="A" /> is diagonalisable by an{" "}
            <em>orthogonal</em> matrix:{" "}
            <InlineMath math="A = Q \Lambda Q^T" />, with{" "}
            <InlineMath math="Q Q^T = I" />.
          </li>
        </ul>
      </Callout>

      <p>
        The Hermitian version: for{" "}
        <InlineMath math="A^* = A" /> (Hermitian, where{" "}
        <InlineMath math="A^* = \bar{A}^T" /> is the conjugate
        transpose), all eigenvalues are real, eigenvectors of distinct
        eigenvalues are orthogonal under the complex inner product,
        and <InlineMath math="A = U \Lambda U^*" /> for some unitary{" "}
        <InlineMath math="U" /> (with{" "}
        <InlineMath math="U U^* = I" />).
      </p>

      <p>
        Why this is a quantum cornerstone:{" "}
        <em>observables in quantum mechanics are Hermitian operators</em>.
        The spectral theorem then guarantees:
      </p>
      <ul>
        <li>
          Measurements yield <em>real</em> values (eigenvalues of the
          operator).
        </li>
        <li>
          Eigenstates of an observable form a complete orthonormal
          basis. Any quantum state can be expanded in that basis.
        </li>
        <li>
          The probability of getting eigenvalue{" "}
          <InlineMath math="\lambda" /> is{" "}
          <InlineMath math="|\langle \lambda | \psi \rangle|^2" />{" "}
          (the Born rule).
        </li>
      </ul>
      <p>
        Without the spectral theorem, the postulates of quantum
        mechanics would be inconsistent. With it, they're a small step
        on top of linear algebra.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Singular Value Decomposition (preview)</h2>

      <p>
        Diagonalisation requires a square matrix and{" "}
        <InlineMath math="n" /> independent eigenvectors. The{" "}
        <strong>SVD</strong> generalises the idea to <em>any</em>{" "}
        matrix, square or not, diagonalisable or not:
      </p>
      <BlockMath math="A = U \Sigma V^T," />
      <p>
        where:
      </p>
      <ul>
        <li>
          <InlineMath math="U" /> is{" "}
          <InlineMath math="m \times m" />, orthogonal (its columns
          are an orthonormal basis of <InlineMath math="\mathbb{R}^m" />).
        </li>
        <li>
          <InlineMath math="V" /> is{" "}
          <InlineMath math="n \times n" />, orthogonal.
        </li>
        <li>
          <InlineMath math="\Sigma" /> is{" "}
          <InlineMath math="m \times n" />, "diagonal" (zeros except
          on the main diagonal), with non-negative real entries called{" "}
          <strong>singular values</strong>{" "}
          <InlineMath math="\sigma_1 \geq \sigma_2 \geq \cdots \geq 0" />.
        </li>
      </ul>

      <p>
        Geometrically, every matrix factors as: rotate (
        <InlineMath math="V^T" />), scale along axes (
        <InlineMath math="\Sigma" />), rotate again (
        <InlineMath math="U" />). Three of the cleanest geometric
        operations, in three steps. The singular values are the
        scaling factors.
      </p>

      <p>
        The SVD is the bedrock of <strong>data analysis</strong> —
        principal component analysis, matrix completion, image
        compression, recommender systems all trace back to it. The
        biggest singular value is the most important "direction" in
        the data; truncating to the top-<InlineMath math="k" /> values
        gives the best rank-<InlineMath math="k" /> approximation.
        We'll return to it in the Inner Product chapter.
      </p>

      {/* ─────────────────────────────  PART 9  ───────────────────────────── */}
      <h2>Part 9 · Why this matters for quantum</h2>

      <ul>
        <li>
          <strong>Energy levels</strong> of an atom or molecule are
          eigenvalues of the Hamiltonian{" "}
          <InlineMath math="H" />. Hydrogen's spectrum, the periodic
          table, the colour of the sky — all eigenvalue problems in
          disguise.
        </li>
        <li>
          <strong>Measurement outcomes</strong> are eigenvalues of the
          observable being measured. Spin-up / spin-down for a qubit
          along a chosen axis are the two eigenvalues of the
          appropriate Pauli matrix.
        </li>
        <li>
          <strong>Time evolution</strong> is{" "}
          <InlineMath math="e^{-iHt/\hbar}" /> — a matrix exponential.
          When <InlineMath math="H" /> is diagonalised in the energy
          basis, time evolution becomes scalar phase rotations on the
          energy eigenstates.
        </li>
        <li>
          <strong>Quantum gates</strong> are unitary matrices; their
          eigenvalues all lie on the unit circle in{" "}
          <InlineMath math="\mathbb{C}" />. The Hadamard and Pauli
          gates, the controlled-Z, and the rotation gates are all
          described entirely by their spectra.
        </li>
        <li>
          <strong>Diagonalisation as algorithm.</strong> The Quantum
          Phase Estimation algorithm — a key sub-routine in Shor's
          factoring algorithm — computes eigenvalues of unitary
          operators. The whole point of quantum computing is that
          some eigenvalue problems are exponentially easier on a
          quantum computer than a classical one.
        </li>
      </ul>

      <p>
        Eigenvalues are the most important single concept in linear
        algebra for physics. The next chapter — inner products — gives
        us the geometric structure that makes "orthogonal eigenvectors"
        a meaningful statement, and unifies the spectral theorem with
        the Pythagorean theorem.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: Eigenvector visualizer
// ════════════════════════════════════════════════════════════

interface MatPreset {
  name: string;
  a: number;
  b: number;
  c: number;
  d: number;
}

const matPresets: MatPreset[] = [
  { name: "[[2,1],[1,2]]", a: 2, b: 1, c: 1, d: 2 },
  { name: "[[3,0],[0,1]]", a: 3, b: 0, c: 0, d: 1 },
  { name: "[[1,1],[0,1]]", a: 1, b: 1, c: 0, d: 1 },
  { name: "[[0,-1],[1,0]] (rotate 90°)", a: 0, b: -1, c: 1, d: 0 },
  { name: "[[2,-1],[-1,2]]", a: 2, b: -1, c: -1, d: 2 },
];

function EigenWidget() {
  const [preset, setPreset] = useState(0);
  const [vx, setVx] = useState(1.5);
  const [vy, setVy] = useState(0.5);

  const m = matPresets[preset];
  const { a, b, c, d } = m;

  // eigenvalues
  const tr = a + d;
  const det = a * d - b * c;
  const disc = tr * tr / 4 - det;
  let eigenvalues: { lam: number; vec: { x: number; y: number } }[] = [];
  if (disc >= 0) {
    const sq = Math.sqrt(disc);
    const l1 = tr / 2 + sq;
    const l2 = tr / 2 - sq;
    for (const l of [l1, l2]) {
      // (A - lI) v = 0; one row gives (a - l) vx + b vy = 0
      let vec: { x: number; y: number };
      if (Math.abs(b) > 1e-9) {
        vec = { x: 1, y: (l - a) / b };
      } else if (Math.abs(c) > 1e-9) {
        vec = { x: (l - d) / c, y: 1 };
      } else {
        // diagonal matrix
        if (Math.abs(l - a) < 1e-9) vec = { x: 1, y: 0 };
        else vec = { x: 0, y: 1 };
      }
      const norm = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
      vec = { x: vec.x / norm, y: vec.y / norm };
      eigenvalues.push({ lam: l, vec });
    }
  }

  const w = 360;
  const h = 280;
  const cx = w / 2;
  const cy = h / 2;
  const scale = 35;
  const sx = (x: number) => cx + x * scale;
  const sy = (y: number) => cy - y * scale;

  const av = { x: a * vx + b * vy, y: c * vx + d * vy };

  const eigenColors = ["#22c55e", "#fbbf24"];

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs uppercase tracking-widest text-ink-500 self-center mr-1">
            Matrix
          </span>
          {matPresets.map((p, i) => (
            <button
              key={i}
              onClick={() => setPreset(i)}
              className={`px-2.5 py-1.5 rounded-lg text-xs border transition font-mono ${
                preset === i
                  ? "border-accent-soft bg-ink-800 text-ink-50"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full block touch-none">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`gx${i}`} x1={sx(i - 5)} y1={0} x2={sx(i - 5)} y2={h} stroke="#1c1c28" strokeWidth={0.5} />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`gy${i}`} x1={0} y1={sy(i - 4)} x2={w} y2={sy(i - 4)} stroke="#1c1c28" strokeWidth={0.5} />
            ))}
            <line x1={0} y1={cy} x2={w} y2={cy} stroke="#2a2a37" />
            <line x1={cx} y1={0} x2={cx} y2={h} stroke="#2a2a37" />

            {/* eigen-lines */}
            {eigenvalues.map((e, i) => {
              const lineLen = 8;
              return (
                <line
                  key={i}
                  x1={sx(-e.vec.x * lineLen)}
                  y1={sy(-e.vec.y * lineLen)}
                  x2={sx(e.vec.x * lineLen)}
                  y2={sy(e.vec.y * lineLen)}
                  stroke={eigenColors[i]}
                  strokeWidth={1.2}
                  strokeDasharray="4 3"
                  strokeOpacity={0.5}
                />
              );
            })}

            {/* eigenvectors as arrows + their image */}
            {eigenvalues.map((e, i) => (
              <g key={`eig${i}`}>
                <Arrow x1={sx(0)} y1={sy(0)} x2={sx(e.vec.x)} y2={sy(e.vec.y)} stroke={eigenColors[i]} />
                <Arrow
                  x1={sx(0)}
                  y1={sy(0)}
                  x2={sx(e.lam * e.vec.x)}
                  y2={sy(e.lam * e.vec.y)}
                  stroke={eigenColors[i]}
                  opacity={0.5}
                />
              </g>
            ))}

            {/* sample arrow + its image */}
            <Arrow x1={sx(0)} y1={sy(0)} x2={sx(vx)} y2={sy(vy)} stroke="#a78bfa" />
            <Arrow x1={sx(0)} y1={sy(0)} x2={sx(av.x)} y2={sy(av.y)} stroke="#a78bfa" opacity={0.5} />

            <DraggableTip cx={sx(vx)} cy={sy(vy)} fill="#a78bfa" onDrag={(dx, dy) => { setVx(vx + dx / scale); setVy(vy - dy / scale); }} />
          </svg>
        </div>

        <div className="space-y-1 text-sm">
          {eigenvalues.length === 0 ? (
            <div className="text-rose-300">
              Complex eigenvalues — this matrix has no real eigenvectors.
              Geometrically it's a rotation-and-scale.
            </div>
          ) : (
            eigenvalues.map((e, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ background: eigenColors[i] }}
                />
                <span className="font-mono text-ink-200">
                  λ<sub>{i + 1}</sub> = {e.lam.toFixed(3)}
                </span>
                <span className="text-ink-500 text-xs">
                  v ≈ ({e.vec.x.toFixed(2)}, {e.vec.y.toFixed(2)})
                </span>
              </div>
            ))
          )}
        </div>
      </div>
      <figcaption>
        Green / yellow: eigenvectors of <InlineMath math="A" /> and
        their images (lighter, longer arrows). Purple: a draggable
        sample vector and its image. Drag the purple tip — note that{" "}
        <InlineMath math="A\mathbf{v}" /> generally points elsewhere,
        but along the eigen-directions it's parallel.
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
      <line x1={x1} y1={y1} x2={tipBackX} y2={tipBackY} strokeWidth={2} />
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
      "An eigenvector of $A$ is a nonzero $\\mathbf{v}$ satisfying…",
    options: [
      "$A\\mathbf{v} = \\mathbf{0}$",
      "$A\\mathbf{v} = \\lambda \\mathbf{v}$ for some scalar $\\lambda$",
      "$A\\mathbf{v} = \\mathbf{v}$",
      "$\\det(A) = \\lambda$",
    ],
    correct: 1,
    explanation:
      "The defining equation: $A$ stretches $\\mathbf{v}$ by a scalar $\\lambda$, the eigenvalue, without changing direction.",
  },
  {
    prompt:
      "Find the eigenvalues of $\\begin{pmatrix} 2 & 0 \\\\ 0 & 5 \\end{pmatrix}$.",
    options: ["1 and 4", "2 and 5", "0 and 7", "10 only"],
    correct: 1,
    explanation:
      "For diagonal matrices, the eigenvalues are exactly the diagonal entries.",
  },
  {
    prompt:
      "If $A$ is real symmetric, the spectral theorem guarantees…",
    options: [
      "all eigenvalues are positive",
      "all eigenvalues are real and eigenvectors of distinct eigenvalues are orthogonal",
      "$A$ is invertible",
      "$\\det A = 0$",
    ],
    correct: 1,
    explanation:
      "Real symmetric matrices have real eigenvalues and an orthonormal eigenbasis: $A = Q \\Lambda Q^T$. (Positivity isn't guaranteed; positive-semidefinite matrices have non-negative eigenvalues, but not all symmetric matrices are positive-semidef.)",
  },
  {
    prompt:
      "If $A$ is diagonalisable as $A = P D P^{-1}$, then $A^k$ equals…",
    options: ["$P^k D^k (P^{-1})^k$", "$P D^k P^{-1}$", "$P^k D P^{-1}$", "$D^k$"],
    correct: 1,
    explanation:
      "$A^k = (PDP^{-1})^k = PD^k P^{-1}$ — the $P$ and $P^{-1}$ telescope. $D^k$ is just diagonal entries to the $k$-th power.",
  },
  {
    prompt:
      "For $A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$, $\\operatorname{tr}(A) = 7$ and $\\det(A) = 10$. The eigenvalues are…",
    options: ["1 and 7", "2 and 5", "−2 and −5", "3 and 4"],
    correct: 1,
    explanation:
      "Eigenvalues sum to the trace and multiply to the determinant: $\\lambda_1 + \\lambda_2 = 7$, $\\lambda_1 \\lambda_2 = 10$. The pair satisfying both is $2$ and $5$.",
  },
];
