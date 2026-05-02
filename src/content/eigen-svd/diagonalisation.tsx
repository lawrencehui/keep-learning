import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function DiagonalisationBody() {
  return (
    <>
      <p>
        With eigenvectors and eigenvalues in hand, we can take
        the next step:{" "}
        <em>express the entire matrix in the eigenbasis</em>.
        When that works, the matrix becomes diagonal in those
        coordinates — and powers, exponentials, and ODE
        solutions become trivial. This is the engine behind
        most analytical solutions to linear systems and the
        starting point for SVD.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.06 — Lecture 22",
            author: "Gilbert Strang",
            duration: "~50 min",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
            note: "Diagonalisation and powers of A.",
          },
          {
            title: "MIT 18.06 — Lecture 23",
            author: "Gilbert Strang",
            duration: "~50 min",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
            note: "Differential equations and exp(At).",
          },
          {
            title: "MML Ch 4.4",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "Eigendecomposition and diagonalisation in tight notation.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Diagonalisation</h2>

      <Callout title="Theorem · Eigendecomposition">
        Suppose{" "}
        <InlineMath math="A \in \mathbb{R}^{n \times n}" /> has{" "}
        <InlineMath math="n" /> linearly independent
        eigenvectors{" "}
        <InlineMath math="\mathbf{v}_1, \dots, \mathbf{v}_n" />{" "}
        with eigenvalues{" "}
        <InlineMath math="\lambda_1, \dots, \lambda_n" />. Stack
        the eigenvectors as columns of{" "}
        <InlineMath math="P" />, eigenvalues on the diagonal of{" "}
        <InlineMath math="D" />. Then
        <BlockMath math="A = P D P^{-1}" />
        equivalently{" "}
        <InlineMath math="P^{-1} A P = D" />.
      </Callout>

      <p>
        Why it works: stack the equations{" "}
        <InlineMath math="A\mathbf{v}_i = \lambda_i \mathbf{v}_i" />{" "}
        as columns:
      </p>
      <BlockMath math="A P = A \begin{pmatrix} | & & | \\ \mathbf{v}_1 & \cdots & \mathbf{v}_n \\ | & & | \end{pmatrix} = \begin{pmatrix} | & & | \\ \lambda_1 \mathbf{v}_1 & \cdots & \lambda_n \mathbf{v}_n \\ | & & | \end{pmatrix} = P D." />

      <p>
        Multiply on the right by{" "}
        <InlineMath math="P^{-1}" /> (which exists because the
        eigenvectors are independent):{" "}
        <InlineMath math="A = P D P^{-1}" />. ∎
      </p>

      <h3>The change-of-basis reading</h3>

      <p>
        Recall from Tier I, Chapter 4:{" "}
        <InlineMath math="P^{-1} A P" /> is the matrix of the
        same linear map in the basis of columns of{" "}
        <InlineMath math="P" />. Diagonalisation is just{" "}
        <em>change of basis to the eigenbasis</em> — and in
        that basis the matrix is diagonal. No new content,
        just a particularly useful basis choice.
      </p>

      <Pitfall>
        Not every matrix is diagonalisable. The condition is{" "}
        <em>n linearly independent eigenvectors</em>.
        Defective matrices (with fewer eigenvectors than
        eigenvalues, counted with multiplicity) need Jordan
        form, which we'll skip. Good news: real symmetric
        matrices are always orthogonally diagonalisable
        (spectral theorem).
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · When is a matrix diagonalisable?</h2>

      <p>
        Sufficient conditions (any of these guarantees
        diagonalisability):
      </p>

      <ul>
        <li>
          <InlineMath math="A" /> has{" "}
          <InlineMath math="n" /> distinct eigenvalues. (
          Distinct eigenvalues automatically have independent
          eigenvectors.)
        </li>
        <li>
          <InlineMath math="A" /> is symmetric (or Hermitian).
          Spectral theorem ⇒ orthogonal diagonalisation.
        </li>
        <li>
          <InlineMath math="A" /> is normal (
          <InlineMath math="A A^T = A^T A" />). Generalisation
          of symmetric.
        </li>
        <li>
          For each eigenvalue,{" "}
          <InlineMath math="m_g(\lambda) = m_a(\lambda)" />.
          (The defining condition.)
        </li>
      </ul>

      <p>
        Necessary condition: enough eigenvectors. The Jordan
        block{" "}
        <InlineMath math="\begin{pmatrix} 2 & 1 \\ 0 & 2 \end{pmatrix}" />{" "}
        has only one eigenvector, so it isn't diagonalisable.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Matrix powers via eigendecomposition</h2>

      <p>
        Given <InlineMath math="A = P D P^{-1}" />, computing{" "}
        <InlineMath math="A^k" /> is essentially free:
      </p>
      <BlockMath math="A^2 = P D P^{-1} P D P^{-1} = P D^2 P^{-1}, \quad A^k = P D^k P^{-1}." />

      <p>
        And <InlineMath math="D^k" /> is just the eigenvalues
        raised to the <InlineMath math="k" />th power on the
        diagonal:{" "}
        <InlineMath math="D^k = \mathrm{diag}(\lambda_1^k, \dots, \lambda_n^k)" />.
      </p>

      <h3>Fibonacci as eigenvalue arithmetic</h3>

      <p>
        Fibonacci recursion{" "}
        <InlineMath math="F_{n+1} = F_n + F_{n-1}" /> can be
        written:
      </p>
      <BlockMath math="\begin{pmatrix} F_{n+1} \\ F_n \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} F_n \\ F_{n-1} \end{pmatrix}." />

      <p>
        The matrix{" "}
        <InlineMath math="A = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}" />{" "}
        has eigenvalues{" "}
        <InlineMath math="\phi = (1 + \sqrt 5)/2" /> and{" "}
        <InlineMath math="\psi = (1 - \sqrt 5)/2" /> (the golden
        ratio and its conjugate). After a bit of algebra:
      </p>
      <BlockMath math="F_n = \frac{\phi^n - \psi^n}{\sqrt 5}." />

      <p>
        That's Binet's formula — pure eigendecomposition. For
        large <InlineMath math="n" />,{" "}
        <InlineMath math="\phi^n" /> dominates, so{" "}
        <InlineMath math="F_n \approx \phi^n / \sqrt 5" />. The
        leading eigenvalue dictates the long-run behaviour,
        which is the universal pattern for linear recurrences
        and Markov chains.
      </p>

      <Exercise prompt="Use eigendecomposition to compute $A^{10}$ for $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$ (eigenvalues 1 and 3 from the previous chapter).">
        <p>
          Eigenvectors:{" "}
          <InlineMath math="\mathbf{v}_1 = (1, -1)^T" /> for{" "}
          <InlineMath math="\lambda = 1" />,{" "}
          <InlineMath math="\mathbf{v}_2 = (1, 1)^T" /> for{" "}
          <InlineMath math="\lambda = 3" />.
        </p>
        <p>
          <InlineMath math="P = \begin{pmatrix} 1 & 1 \\ -1 & 1 \end{pmatrix}" />,{" "}
          <InlineMath math="P^{-1} = \tfrac{1}{2}\begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix}" />,{" "}
          <InlineMath math="D = \mathrm{diag}(1, 3)" />.
        </p>
        <p>
          <InlineMath math="A^{10} = P \, \mathrm{diag}(1, 3^{10}) \, P^{-1} = P \, \mathrm{diag}(1, 59049) \, P^{-1} = \tfrac{1}{2}\begin{pmatrix} 59050 & 59048 \\ 59048 & 59050 \end{pmatrix}" />.
          Check trace:{" "}
          <InlineMath math="59050 = 1^{10} + 3^{10}" />. ✓
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Markov chains and the steady state</h2>

      <p>
        A transition matrix{" "}
        <InlineMath math="P" /> (rows non-negative, summing to
        1) describes a Markov chain. After{" "}
        <InlineMath math="k" /> steps the distribution is{" "}
        <InlineMath math="\boldsymbol{\pi}^T P^k" />.
      </p>

      <p>
        Perron–Frobenius theorem: a stochastic matrix has{" "}
        <InlineMath math="\lambda_1 = 1" /> as its dominant
        eigenvalue, with eigenvector being the stationary
        distribution{" "}
        <InlineMath math="\boldsymbol{\pi}^*" />. All other
        eigenvalues have{" "}
        <InlineMath math="|\lambda_i| \le 1" />.
      </p>

      <p>
        Apply eigendecomposition:{" "}
        <InlineMath math="P^k = Q \, \mathrm{diag}(1, \lambda_2^k, \dots) \, Q^{-1} \to Q \, \mathrm{diag}(1, 0, \dots) \, Q^{-1}" />.
        The chain converges to the stationary distribution
        exponentially fast, with rate set by the{" "}
        <strong>spectral gap</strong>{" "}
        <InlineMath math="1 - |\lambda_2|" />. Bigger gap, faster
        mixing.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Matrix exponential and linear ODEs</h2>

      <p>
        For a continuous-time linear system
      </p>
      <BlockMath math="\dot{\mathbf{x}}(t) = A \mathbf{x}(t), \quad \mathbf{x}(0) = \mathbf{x}_0," />

      <p>
        the solution is{" "}
        <InlineMath math="\mathbf{x}(t) = e^{At} \mathbf{x}_0" />,
        where the matrix exponential is defined by the
        usual series:
      </p>
      <BlockMath math="e^{At} = I + At + \tfrac{1}{2!}(At)^2 + \tfrac{1}{3!}(At)^3 + \dots = \sum_{k=0}^\infty \frac{(At)^k}{k!}." />

      <p>
        This series converges for any matrix and any{" "}
        <InlineMath math="t" />. With diagonalisation it
        becomes computable:
      </p>
      <BlockMath math="e^{At} = P \, e^{Dt} \, P^{-1}, \quad e^{Dt} = \mathrm{diag}(e^{\lambda_1 t}, \dots, e^{\lambda_n t})." />

      <p>
        The system decouples in the eigenbasis: write{" "}
        <InlineMath math="\mathbf{x}(t) = \sum_i c_i(t) \mathbf{v}_i" />,
        and each coefficient evolves independently as{" "}
        <InlineMath math="\dot c_i = \lambda_i c_i" />, giving{" "}
        <InlineMath math="c_i(t) = c_i(0) e^{\lambda_i t}" />.
      </p>

      <h3>Stability</h3>

      <p>
        The system{" "}
        <InlineMath math="\dot{\mathbf{x}} = A\mathbf{x}" /> is{" "}
        <strong>stable</strong> (every solution decays to 0)
        iff every eigenvalue of{" "}
        <InlineMath math="A" /> has{" "}
        <InlineMath math="\mathrm{Re}(\lambda) < 0" />. Eigenvalues
        on the imaginary axis give oscillation; eigenvalues
        with positive real part give growth.
      </p>

      <p>
        This is the lens through which physicists analyse
        damped oscillators (eigenvalues come in complex
        conjugate pairs with negative real part = damped
        oscillations) and through which financial econometrics
        analyses stationarity of vector-autoregressive models.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Spectral decomposition and projectors</h2>

      <p>
        For a diagonalisable{" "}
        <InlineMath math="A = P D P^{-1}" />, write
      </p>
      <BlockMath math="A = \sum_{i=1}^n \lambda_i \, \mathbf{v}_i \mathbf{w}_i^T" />

      <p>
        where{" "}
        <InlineMath math="\mathbf{v}_i" /> are columns of{" "}
        <InlineMath math="P" /> and{" "}
        <InlineMath math="\mathbf{w}_i^T" /> are rows of{" "}
        <InlineMath math="P^{-1}" />. Each rank-1 piece{" "}
        <InlineMath math="\mathbf{v}_i \mathbf{w}_i^T" /> is a
        projector onto the <InlineMath math="i" />th
        eigenspace (assuming biorthogonal:{" "}
        <InlineMath math="\mathbf{w}_i^T \mathbf{v}_j = \delta_{ij}" />).
      </p>

      <p>
        For symmetric{" "}
        <InlineMath math="A = Q \Lambda Q^T" />:
      </p>
      <BlockMath math="A = \sum_{i=1}^n \lambda_i \, \mathbf{q}_i \mathbf{q}_i^T," />

      <p>
        each{" "}
        <InlineMath math="\mathbf{q}_i \mathbf{q}_i^T" /> being
        an orthogonal projector. This is the form most useful
        for ML: PCA reconstruction with the top{" "}
        <InlineMath math="k" /> components is exactly
      </p>
      <BlockMath math="A_k = \sum_{i=1}^k \lambda_i \mathbf{q}_i \mathbf{q}_i^T," />

      <p>
        the rank-<InlineMath math="k" /> truncated spectral
        decomposition. We'll see this generalised to{" "}
        non-symmetric matrices via SVD next chapter.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>PCA reconstruction</strong>: keep the top-
          <InlineMath math="k" /> eigenpairs of the covariance
          matrix; discard the rest.
        </li>
        <li>
          <strong>Linear ODEs / discretised dynamics</strong>:
          eigendecomposition turns coupled linear systems
          into independent 1-D ones. From oscillator chains
          to vector-autoregressive models.
        </li>
        <li>
          <strong>Markov chains &amp; PageRank</strong>: the
          stationary distribution is the leading eigenvector
          of <InlineMath math="P^T" />.
        </li>
        <li>
          <strong>Spectral gap = mixing time</strong>: the gap
          between the top two eigenvalues controls the rate at
          which a Markov chain mixes. Same idea drives
          convergence of MCMC samplers.
        </li>
        <li>
          <strong>Microstructure preview</strong>: the Hawkes
          kernel matrix's spectral radius is the branching
          ratio. Branching ratio &lt; 1 ⇔ system is sub-
          critical (stable). Eigenvalues set the boundary
          between stationary and explosive markets.
        </li>
      </ul>

      <p>
        Next chapter: SVD. Generalises eigendecomposition to{" "}
        <em>every</em> matrix — non-square, non-diagonalisable,
        anything. The most useful single decomposition in
        applied math.
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
      "$A$ is diagonalisable iff…",
    options: [
      "$A$ is symmetric",
      "$A$ has $n$ linearly independent eigenvectors",
      "$A$ has all distinct eigenvalues",
      "$\\det(A) \\ne 0$",
    ],
    correct: 1,
    explanation:
      "The defining condition. Distinct eigenvalues *guarantee* independent eigenvectors but aren't necessary; symmetric matrices are always diagonalisable but again not the only ones.",
  },
  {
    prompt:
      "If $A = P D P^{-1}$, then $A^{10}$ equals…",
    options: [
      "$P^{10} D^{10} P^{-10}$",
      "$P D^{10} P^{-1}$",
      "$10 P D P^{-1}$",
      "depends on whether eigenvalues are real",
    ],
    correct: 1,
    explanation:
      "$A^k = P D^k P^{-1}$ by telescoping cancellation $P^{-1} P = I$ in the middle of every product. Diagonal $D^k$ is just element-wise powers.",
  },
  {
    prompt:
      "The system $\\dot{\\mathbf{x}} = A\\mathbf{x}$ is asymptotically stable iff…",
    options: [
      "$\\det(A) > 0$",
      "all eigenvalues of $A$ have negative real part",
      "$A$ is symmetric",
      "$\\mathrm{tr}(A) < 0$",
    ],
    correct: 1,
    explanation:
      "$\\mathbf{x}(t) = e^{At}\\mathbf{x}_0 = P e^{Dt} P^{-1} \\mathbf{x}_0$. Each component goes like $e^{\\lambda_i t}$, which decays iff $\\mathrm{Re}(\\lambda_i) < 0$. Trace alone is not enough.",
  },
  {
    prompt:
      "For a stochastic transition matrix $P$, the stationary distribution corresponds to…",
    options: [
      "the eigenvector of $P^T$ with eigenvalue $\\lambda = 1$",
      "the smallest eigenvalue",
      "any eigenvector",
      "$P$ has no stationary distribution",
    ],
    correct: 0,
    explanation:
      "$\\boldsymbol{\\pi}^* P = \\boldsymbol{\\pi}^*$, i.e. $P^T \\boldsymbol{\\pi}^* = \\boldsymbol{\\pi}^*$. The stationary distribution is a left eigenvector of $P$ with eigenvalue 1, i.e. a right eigenvector of $P^T$ with eigenvalue 1.",
  },
  {
    prompt:
      "The 'spectral gap' of a Markov chain is…",
    options: [
      "the largest eigenvalue",
      "$1 - |\\lambda_2|$ — controls how fast the chain converges to stationarity",
      "the determinant",
      "the trace",
    ],
    correct: 1,
    explanation:
      "Distance from 1 (the stationary eigenvalue) to the second-largest eigenvalue magnitude. Bigger gap ⇒ faster mixing. Drives MCMC convergence rate, opinion-dynamics relaxation, etc.",
  },
];
