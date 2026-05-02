import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function PcaBody() {
  return (
    <>
      <p>
        Principal Component Analysis is the simplest
        dimensionality-reduction algorithm. Given high-
        dimensional data, find a small number of orthogonal
        directions that capture the most variance, and
        project the data onto them. PCA is everywhere — image
        compression, exploratory analysis, factor models in
        finance, latent-feature learning. And it's the same
        eigendecomposition / SVD machinery from Module II.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MML Ch 10",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "PCA from variance maximisation, derivation, applications.",
          },
          {
            title: "Murphy PML Ch 20",
            author: "Kevin Murphy",
            duration: "Reading",
            url: "https://probml.github.io/pml-book/book1.html",
            note: "PCA + probabilistic PCA + extensions (kernel PCA, autoencoders).",
          },
          {
            title: "ESL Ch 14.5",
            author: "Hastie, Tibshirani, Friedman",
            duration: "Reading",
            url: "https://hastie.su.domains/ElemStatLearn/",
            note: "PCA as an unsupervised learning technique alongside related methods.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The variance-maximisation problem</h2>

      <p>
        Setup. Data{" "}
        <InlineMath math="\mathbf{x}_1, \dots, \mathbf{x}_n \in \mathbb{R}^p" />,
        centred (mean subtracted) so{" "}
        <InlineMath math="\sum \mathbf{x}_i = \mathbf{0}" />.
        Find unit{" "}
        <InlineMath math="\mathbf{w}" /> maximising the
        variance of projected data:
      </p>
      <BlockMath math="\max_{\|\mathbf{w}\| = 1} \mathrm{Var}(\mathbf{w}^T \mathbf{X})." />

      <p>
        With centred data,{" "}
        <InlineMath math="\mathrm{Var}(\mathbf{w}^T \mathbf{X}) = \mathbf{w}^T \Sigma \mathbf{w}" />{" "}
        where{" "}
        <InlineMath math="\Sigma = \frac{1}{n} X^T X" /> is the
        sample covariance.
      </p>

      <h3>Lagrangian solution</h3>

      <p>
        Maximise{" "}
        <InlineMath math="\mathbf{w}^T \Sigma \mathbf{w}" /> subject
        to <InlineMath math="\|\mathbf{w}\| = 1" />:
      </p>
      <BlockMath math="\mathcal{L}(\mathbf{w}, \alpha) = \mathbf{w}^T \Sigma \mathbf{w} - \alpha (\mathbf{w}^T \mathbf{w} - 1)." />

      <p>
        Stationary condition:
      </p>
      <BlockMath math="\nabla_\mathbf{w} \mathcal{L} = 2\Sigma \mathbf{w} - 2\alpha \mathbf{w} = 0 \implies \Sigma \mathbf{w} = \alpha \mathbf{w}." />

      <p>
        So <InlineMath math="\mathbf{w}" /> is an eigenvector
        of <InlineMath math="\Sigma" /> with eigenvalue{" "}
        <InlineMath math="\alpha" />. Among all eigenvectors,
        the one maximising the variance is the eigenvector
        with the <em>largest</em> eigenvalue:
      </p>

      <Callout title="First principal component">
        <BlockMath math="\mathbf{w}_1 = \arg\max_{\|\mathbf{w}\| = 1} \mathbf{w}^T \Sigma \mathbf{w}" />
        is the top eigenvector of{" "}
        <InlineMath math="\Sigma" />, and the maximum
        variance is the corresponding eigenvalue{" "}
        <InlineMath math="\lambda_1" />.
      </Callout>

      <p>
        Subsequent PCs are eigenvectors of{" "}
        <InlineMath math="\Sigma" /> ordered by decreasing
        eigenvalue, all mutually orthogonal (spectral theorem
        from Module II — symmetric matrix has orthonormal
        eigenbasis).
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · PCA via SVD</h2>

      <p>
        Numerically, computing SVD of{" "}
        <InlineMath math="X" /> directly is more stable than
        eigendecomposing{" "}
        <InlineMath math="X^T X" /> (Module II revisited:{" "}
        <InlineMath math="\kappa(X^T X) = \kappa(X)^2" />).
      </p>

      <p>
        SVD gives{" "}
        <InlineMath math="X = U \Sigma_X V^T" /> (
        <InlineMath math="\Sigma_X" /> renamed to avoid clash
        with covariance). Then:
      </p>

      <ul>
        <li>
          Right singular vectors{" "}
          <InlineMath math="V" /> = principal components.
        </li>
        <li>
          Singular values{" "}
          <InlineMath math="\sigma_i" /> relate to eigenvalues
          by{" "}
          <InlineMath math="\lambda_i = \sigma_i^2/n" />.
        </li>
        <li>
          Scores (PC coordinates of data):{" "}
          <InlineMath math="X V = U \Sigma_X" />.
        </li>
      </ul>

      <Callout title="Practical PCA recipe">
        <ol>
          <li>
            Centre <InlineMath math="X" /> (subtract column
            means).
          </li>
          <li>
            (Optional but usually) standardise (divide by
            column std-devs).
          </li>
          <li>
            Compute SVD{" "}
            <InlineMath math="X = U\Sigma V^T" />.
          </li>
          <li>
            Top <InlineMath math="k" /> PCs: first{" "}
            <InlineMath math="k" /> columns of{" "}
            <InlineMath math="V" />.
          </li>
          <li>
            Reduced representation:{" "}
            <InlineMath math="X V_k" />.
          </li>
        </ol>
      </Callout>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Reconstruction and Eckart–Young</h2>

      <p>
        Reconstruct{" "}
        <InlineMath math="\mathbf{x}" /> from its top-
        <InlineMath math="k" /> projections:
      </p>
      <BlockMath math="\hat{\mathbf{x}} = V_k V_k^T \mathbf{x}." />

      <p>
        This is the orthogonal projection onto the subspace
        spanned by the top{" "}
        <InlineMath math="k" /> PCs. By the Eckart–Young
        theorem (Module II), this is the{" "}
        <em>best</em> rank-<InlineMath math="k" />{" "}
        approximation in Frobenius norm:
      </p>
      <BlockMath math="\|X - X V_k V_k^T\|_F^2 = \sum_{i > k} \sigma_i^2." />

      <p>
        Reconstruction error is the sum of squared truncated
        singular values. Plot the singular values; the elbow
        tells you where most of the variance lives.
      </p>

      <h3>Variance explained</h3>

      <p>
        The fraction of variance explained by the top{" "}
        <InlineMath math="k" /> components is
      </p>
      <BlockMath math="\frac{\sum_{i=1}^k \lambda_i}{\sum_{i=1}^p \lambda_i}." />

      <p>
        Reporting "the top 3 PCs explain 95% of the variance"
        is the standard summary.
      </p>

      <Exercise prompt="A dataset has eigenvalues $(\\lambda_1, \\lambda_2, \\lambda_3, \\lambda_4) = (10, 5, 1, 0.5)$. What fraction of variance is explained by the first 2 PCs?">
        <p>
          Total: <InlineMath math="16.5" />. Top 2:{" "}
          <InlineMath math="15" />. Fraction:{" "}
          <InlineMath math="15/16.5 \approx 0.91" />, or 91%.
          Reasonable to drop the rest.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Common pitfalls</h2>

      <Pitfall>
        <strong>Scale matters</strong>. PCA on raw features
        is dominated by features with the largest variance.
        If features are in different units (price in dollars,
        time in seconds), always standardise first. Failing
        to do so means PCA "discovers" that the
        big-numbered feature has the most variance —
        useless.
      </Pitfall>

      <Pitfall>
        <strong>PCA is linear</strong>. If your data lies on
        a curved manifold, PCA can't unwrap it. Tools for
        non-linear dim-reduction: kernel PCA, t-SNE, UMAP,
        autoencoders.
      </Pitfall>

      <Pitfall>
        <strong>Components are not "interpretable" by
        default</strong>. They're the directions of maximum
        variance, not the directions of the underlying
        causes. Sometimes (e.g. in genetics or
        cross-sectional finance) they line up nicely with
        latent factors; sometimes they don't.
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Probabilistic PCA</h2>

      <p>
        PCA can be derived from a generative model:
      </p>
      <BlockMath math="\mathbf{x} = W \mathbf{z} + \boldsymbol\mu + \boldsymbol\varepsilon, \quad \mathbf{z} \sim N(\mathbf{0}, I), \quad \boldsymbol\varepsilon \sim N(\mathbf{0}, \sigma^2 I)." />

      <p>
        The MLE for{" "}
        <InlineMath math="W" /> is, up to an arbitrary
        rotation, the matrix of top{" "}
        <InlineMath math="k" /> principal components scaled by{" "}
        <InlineMath math="\sqrt{\lambda_i - \sigma^2}" />.
      </p>

      <p>
        Why bother? The probabilistic view enables:
      </p>
      <ul>
        <li>
          Likelihood-based model selection (choose{" "}
          <InlineMath math="k" /> via held-out likelihood).
        </li>
        <li>
          Handling missing data (EM algorithm).
        </li>
        <li>
          Bayesian extensions (variational autoencoders are
          non-linear probabilistic PCA).
        </li>
      </ul>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Connections</h2>

      <h3>PCA and OLS</h3>

      <p>
        Total least squares (errors-in-variables regression)
        finds the line minimising{" "}
        <em>perpendicular</em> distances rather than vertical
        ones. The solution: the first PC of the augmented
        data matrix. PCA solves a regression-like problem
        when both axes have noise.
      </p>

      <h3>PCA and information theory</h3>

      <p>
        For Gaussian data, the top-<InlineMath math="k" /> PC
        compression is the{" "}
        <em>best</em> rate-distortion code — minimises
        squared-error reconstruction at given rate. PCA is
        the optimal lossy code for Gaussians.
      </p>

      <h3>PCA in finance</h3>

      <p>
        Marchenko-Pastur theory says that for{" "}
        <InlineMath math="N \times T" /> random data with{" "}
        <InlineMath math="N/T = c \in (0, 1]" />, the
        eigenvalues of the covariance matrix follow a known
        distribution. Eigenvalues outside this distribution
        are "real factors"; those inside are noise. In
        equity microstructure, the top PCs of return
        covariances often correspond to industry / sector /
        market-mode factors.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Visualisation</strong>: project to 2 or 3
          PCs, plot, look. Often the cheapest way to spot
          clusters, outliers, and curved structure.
        </li>
        <li>
          <strong>Compression and denoising</strong>: rank-
          <InlineMath math="k" /> truncation removes
          high-frequency noise (small eigenvalues) and keeps
          the dominant signal.
        </li>
        <li>
          <strong>Decorrelating features</strong>: in the PC
          basis, features are orthogonal. Useful preprocessing
          for some downstream models.
        </li>
        <li>
          <strong>Factor models in finance</strong>: PCA on
          equity returns yields a market-mode + industry
          factors. Risk decompositions, statistical arbitrage
          construction, and risk parity all start with a PCA.
        </li>
        <li>
          <strong>Microstructure preview</strong>: PCA of
          cross-sectional order-flow signs reveals
          common-mode trading pressure (the "market beta" of
          microstructure). Eigenvalue clipping (Bouchaud /
          Laloux) cleans noisy correlation matrices for
          portfolio construction.
        </li>
      </ul>

      <p>
        Next chapter: loss functions and their probabilistic
        interpretations — the unifying view that ties together
        OLS, logistic, ridge, lasso, and beyond.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt: "The first principal component is…",
    options: [
      "an arbitrary direction",
      "the eigenvector of the data covariance matrix with the largest eigenvalue",
      "the smallest singular vector",
      "always $(1, 0, \\dots, 0)^T$",
    ],
    correct: 1,
    explanation:
      "From Lagrangian: maximise $\\mathbf{w}^T \\Sigma \\mathbf{w}$ subject to $\\|\\mathbf{w}\\| = 1$. The solution is an eigenvector of $\\Sigma$, and the maximum is achieved at the top eigenvector.",
  },
  {
    prompt: "PCA via SVD: principal components are…",
    options: [
      "left singular vectors",
      "right singular vectors of the (centred) data matrix",
      "the singular values",
      "the determinant",
    ],
    correct: 1,
    explanation:
      "$X = U \\Sigma V^T$. Right singular vectors $V$ = PCs. Numerically more stable than eigendecomposing $X^T X$ because SVD doesn't square the condition number.",
  },
  {
    prompt: "The Eckart-Young theorem says the top-$k$ PC reconstruction is…",
    options: [
      "a rough approximation",
      "the best rank-$k$ approximation in Frobenius norm",
      "exact",
      "biased",
    ],
    correct: 1,
    explanation:
      "Truncated SVD = best rank-$k$ approximation. Reconstruction error squared is the sum of squared dropped singular values. This is what makes PCA optimal for compression.",
  },
  {
    prompt: "Why must features be standardised before PCA in most cases?",
    options: [
      "for speed",
      "PCA on raw features is dominated by features with the largest variance — usually meaningless if features are in different units",
      "to make eigenvalues integer-valued",
      "no reason — standardisation isn't necessary",
    ],
    correct: 1,
    explanation:
      "Without standardisation, a feature measured in cents will dominate one measured in fractions. Always centre and (usually) scale to unit variance first.",
  },
  {
    prompt: "Probabilistic PCA assumes the data is generated as…",
    options: [
      "uniform",
      "$\\mathbf{x} = W\\mathbf{z} + \\boldsymbol\\mu + \\boldsymbol\\varepsilon$ with $\\mathbf{z}, \\boldsymbol\\varepsilon$ Gaussian",
      "multinomial",
      "deterministic",
    ],
    correct: 1,
    explanation:
      "PPCA's generative model: latent Gaussian factors + observation noise. MLE recovers the top PCs (up to rotation). Foundation of factor analysis and the linear precursor to variational autoencoders.",
  },
];
