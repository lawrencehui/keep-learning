import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function LeastSquaresBody() {
  return (
    <>
      <p>
        Ordinary Least Squares (OLS) is the workhorse of
        statistics, ML, and quantitative finance. We've now
        seen pieces of it from every angle:
      </p>
      <ul>
        <li>
          <strong>Tier I, Ch 3</strong>: rank/null-space
          characterise existence and uniqueness of solutions
          to <InlineMath math="X\boldsymbol\beta = \mathbf{y}" />.
        </li>
        <li>
          <strong>Tier II, Ch 4</strong>: orthogonal projection
          gives a geometric closed form.
        </li>
        <li>
          <strong>Tier III, Ch 1–2</strong>: matrix calculus
          gives an algebraic derivation.
        </li>
      </ul>
      <p>
        This chapter unifies the three views, derives the
        normal equations rigorously, and shows why the same
        formula <em>also</em> arises as the maximum-likelihood
        estimate under Gaussian noise. It's the rare result
        that's blindingly obvious from{" "}
        <em>three independent angles</em>, and that's
        precisely why it's useful: any of the three lenses
        might be the easiest to apply in a given problem.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MML Ch 9",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "Linear regression, MLE/MAP, Bayesian view. The single best chapter on this topic.",
          },
          {
            title: "MIT 18.06 — Lectures 15, 16",
            author: "Gilbert Strang",
            duration: "~100 min",
            url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
            note: "Geometric and matrix-calc views in one shot.",
          },
          {
            title: "Murphy PML Ch 11",
            author: "Kevin Murphy",
            duration: "Reading",
            url: "https://probml.github.io/pml-book/book1.html",
            note: "Probabilistic linear regression, ridge as MAP, Bayesian linear regression.",
          },
          {
            title:
              "Trades, Quotes & Prices Ch 11 — Market Impact",
            author: "Bouchaud, Bonart, Donier, Gould",
            duration: "Reading",
            url: "https://www.cambridge.org/9781107156609",
            note: "OLS-with-care for empirical impact estimation. The chapter your microstructure preprint extends.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The least-squares problem</h2>

      <p>
        Setup. Given a design matrix{" "}
        <InlineMath math="X \in \mathbb{R}^{n \times p}" /> (
        rows = observations, columns = features) and a
        response vector{" "}
        <InlineMath math="\mathbf{y} \in \mathbb{R}^n" />, find
        the coefficient vector{" "}
        <InlineMath math="\boldsymbol\beta \in \mathbb{R}^p" />{" "}
        minimising the squared residuals:
      </p>

      <Callout title="The OLS objective">
        <BlockMath math="L(\boldsymbol\beta) = \tfrac{1}{2}\|\mathbf{y} - X\boldsymbol\beta\|^2 = \tfrac{1}{2} \sum_{i=1}^n (y_i - \mathbf{x}_i^T \boldsymbol\beta)^2." />
      </Callout>

      <p>
        Why squared residuals (and not absolute, or some other
        function)? Three reasons, each on its own a deal-
        maker:
      </p>
      <ol>
        <li>
          The <em>geometric</em> reason: minimising{" "}
          <InlineMath math="\|\cdot\|_2^2" /> is exactly an
          orthogonal projection.
        </li>
        <li>
          The <em>algebraic</em> reason: the loss is a
          quadratic form in{" "}
          <InlineMath math="\boldsymbol\beta" /> with a unique
          closed-form minimum.
        </li>
        <li>
          The <em>probabilistic</em> reason: it's the MLE under
          Gaussian noise (Part 5).
        </li>
      </ol>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Calculus derivation of the normal equations</h2>

      <p>
        From last chapter (Part 6):
      </p>
      <BlockMath math="\nabla_{\boldsymbol\beta} L = -X^T(\mathbf{y} - X\boldsymbol\beta) = X^T X \boldsymbol\beta - X^T \mathbf{y}." />

      <p>
        Setting{" "}
        <InlineMath math="\nabla L = \mathbf{0}" />:
      </p>

      <Callout title="Normal equations">
        <BlockMath math="X^T X \, \boldsymbol\beta = X^T \mathbf{y}." />
        When{" "}
        <InlineMath math="X^T X" /> is invertible,
        <BlockMath math="\hat{\boldsymbol\beta} = (X^T X)^{-1} X^T \mathbf{y}." />
      </Callout>

      <p>
        Hessian:{" "}
        <InlineMath math="\nabla^2 L = X^T X" />, which is
        positive-semi-definite for any{" "}
        <InlineMath math="X" /> and positive-definite when{" "}
        <InlineMath math="X" /> has independent columns. So the
        critical point is the unique global minimum (positive-
        definite Hessian ⇒ strictly convex ⇒ unique
        minimiser).
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Geometric derivation</h2>

      <p>
        Recall from Tier II, Ch 4: minimising{" "}
        <InlineMath math="\|\mathbf{y} - X\boldsymbol\beta\|" />{" "}
        over{" "}
        <InlineMath math="\boldsymbol\beta" /> is asking{" "}
        <em>which point of</em>{" "}
        <InlineMath math="C(X)" /> is closest to{" "}
        <InlineMath math="\mathbf{y}" />. The answer is the
        orthogonal projection:
      </p>
      <BlockMath math="X\hat{\boldsymbol\beta} = \mathrm{proj}_{C(X)} \mathbf{y}." />

      <p>
        The defining property — residual{" "}
        <InlineMath math="\mathbf{y} - X\hat{\boldsymbol\beta}" /> orthogonal to{" "}
        <InlineMath math="C(X)" /> — gives:
      </p>
      <BlockMath math="X^T(\mathbf{y} - X\hat{\boldsymbol\beta}) = \mathbf{0}," />

      <p>
        which rearranges to the normal equations. Same answer,
        no calculus required. Just the geometry of right
        angles and the four-subspace picture.
      </p>

      <h3>The hat matrix</h3>

      <p>
        The projection onto{" "}
        <InlineMath math="C(X)" /> is{" "}
        <InlineMath math="H = X(X^T X)^{-1} X^T" />, often
        called the <strong>hat matrix</strong> because{" "}
        <InlineMath math="\hat{\mathbf{y}} = H \mathbf{y}" />.
        Properties:
      </p>
      <ul>
        <li>
          <InlineMath math="H = H^T" /> (symmetric — orthogonal
          projection).
        </li>
        <li>
          <InlineMath math="H^2 = H" /> (idempotent — projecting
          twice = once).
        </li>
        <li>
          <InlineMath math="\mathrm{tr}(H) = p" /> (the
          dimension of <InlineMath math="C(X)" />). This is
          the <em>effective degrees of freedom</em>.
        </li>
      </ul>

      <p>
        Diagonal entries{" "}
        <InlineMath math="h_{ii}" /> are <em>leverages</em> —
        how influential the{" "}
        <InlineMath math="i" />th observation is on its own
        fitted value. Big leverages flag outliers in feature
        space.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>
        Part 4 · Properties of <InlineMath math="\hat{\boldsymbol\beta}" />
      </h2>

      <p>
        Suppose{" "}
        <InlineMath math="\mathbf{y} = X\boldsymbol\beta^* + \boldsymbol\varepsilon" />{" "}
        with random noise{" "}
        <InlineMath math="\boldsymbol\varepsilon" /> having{" "}
        <InlineMath math="E[\boldsymbol\varepsilon] = \mathbf{0}" />{" "}
        and{" "}
        <InlineMath math="\mathrm{Cov}(\boldsymbol\varepsilon) = \sigma^2 I" />.
      </p>

      <ul>
        <li>
          <strong>Unbiased</strong>:{" "}
          <InlineMath math="E[\hat{\boldsymbol\beta}] = \boldsymbol\beta^*" />.
        </li>
        <li>
          <strong>Variance</strong>:{" "}
          <InlineMath math="\mathrm{Cov}(\hat{\boldsymbol\beta}) = \sigma^2 (X^T X)^{-1}" />.
        </li>
        <li>
          <strong>Gauss–Markov theorem</strong>: among all
          linear unbiased estimators of{" "}
          <InlineMath math="\boldsymbol\beta^*" />, OLS has the
          smallest variance. ("BLUE" — Best Linear Unbiased
          Estimator.)
        </li>
      </ul>

      <p>
        These statements are why OLS is everywhere in
        statistics: under mild conditions (uncorrelated
        homoscedastic noise), nothing linear-and-unbiased
        beats it. When noise is heteroskedastic or correlated,
        weighted least squares (WLS) and generalised least
        squares (GLS) take over.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · OLS = MLE under Gaussian noise</h2>

      <p>
        The third lens — and the one that makes regularisation
        and Bayesian extensions feel natural.
      </p>

      <p>
        Assume{" "}
        <InlineMath math="y_i = \mathbf{x}_i^T \boldsymbol\beta + \varepsilon_i" />,{" "}
        <InlineMath math="\varepsilon_i \stackrel{\text{iid}}{\sim} N(0, \sigma^2)" />.
        Then{" "}
        <InlineMath math="y_i | \mathbf{x}_i, \boldsymbol\beta \sim N(\mathbf{x}_i^T \boldsymbol\beta, \sigma^2)" />.
        The likelihood is
      </p>
      <BlockMath math="L(\boldsymbol\beta) = \prod_{i=1}^n \frac{1}{\sqrt{2\pi\sigma^2}} \exp\!\left(-\frac{(y_i - \mathbf{x}_i^T \boldsymbol\beta)^2}{2\sigma^2}\right)." />

      <p>
        Negative log-likelihood:
      </p>
      <BlockMath math="-\log L(\boldsymbol\beta) = \frac{n}{2} \log(2\pi\sigma^2) + \frac{1}{2\sigma^2} \sum_i (y_i - \mathbf{x}_i^T \boldsymbol\beta)^2." />

      <p>
        The first term is constant in{" "}
        <InlineMath math="\boldsymbol\beta" />; the second is
        OLS up to scaling. Maximising likelihood{" "}
        <em>is</em> minimising squared residuals. So the OLS
        estimator{" "}
        <InlineMath math="\hat{\boldsymbol\beta}" /> is also the
        MLE.
      </p>

      <Callout title="Why this perspective is so useful">
        Once you see OLS as MLE-under-Gaussian-noise:
        <ul>
          <li>
            <strong>Ridge</strong> = MAP with a Gaussian prior
            on{" "}
            <InlineMath math="\boldsymbol\beta" />.
          </li>
          <li>
            <strong>Lasso</strong> = MAP with a Laplace prior.
          </li>
          <li>
            <strong>Bayesian linear regression</strong> = the
            full posterior on{" "}
            <InlineMath math="\boldsymbol\beta" /> (not just a
            point estimate).
          </li>
          <li>
            <strong>Logistic regression</strong> = MLE under a
            Bernoulli likelihood with sigmoid mean function.
          </li>
        </ul>
        Every "linear model" in ML is just a different
        likelihood + (optionally) a different prior.
      </Callout>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Computation: don't form $X^T X$</h2>

      <p>
        The textbook formula{" "}
        <InlineMath math="\hat{\boldsymbol\beta} = (X^T X)^{-1} X^T \mathbf{y}" />{" "}
        is wonderful for derivations and disastrous for
        computation. Two reasons:
      </p>

      <ul>
        <li>
          <strong>Conditioning</strong>:{" "}
          <InlineMath math="\kappa(X^T X) = \kappa(X)^2" />.
          Squaring the condition number can lose half your
          significant digits.
        </li>
        <li>
          <strong>Cost</strong>: forming{" "}
          <InlineMath math="X^T X" /> is{" "}
          <InlineMath math="O(np^2)" />; inverting is{" "}
          <InlineMath math="O(p^3)" />. Stable algorithms
          avoid both.
        </li>
      </ul>

      <p>
        Production solvers use one of:
      </p>
      <ol>
        <li>
          <strong>QR</strong> (default in most libraries):
          factor <InlineMath math="X = QR" />, solve{" "}
          <InlineMath math="R\hat{\boldsymbol\beta} = Q^T \mathbf{y}" />{" "}
          by back-substitution. Cost{" "}
          <InlineMath math="O(np^2)" />, condition{" "}
          <InlineMath math="\kappa(X)" />.
        </li>
        <li>
          <strong>SVD</strong>: factor{" "}
          <InlineMath math="X = U\Sigma V^T" />, solve via
          pseudoinverse. Slightly slower, but handles rank
          deficiency cleanly.
        </li>
        <li>
          <strong>Cholesky on $X^T X$</strong>: only when{" "}
          <InlineMath math="X" /> is well-conditioned and{" "}
          <InlineMath math="p \ll n" /> — fast but fragile.
        </li>
        <li>
          <strong>Iterative solvers</strong> (conjugate
          gradient, LSQR): for huge sparse{" "}
          <InlineMath math="X" /> where direct factorisation
          is infeasible.
        </li>
      </ol>

      <p>
        For day-to-day data analysis, just call{" "}
        <code>numpy.linalg.lstsq</code> or your favourite
        library's regression routine; they pick the right
        method.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Singularity, multicollinearity, regularisation</h2>

      <p>
        When does{" "}
        <InlineMath math="X^T X" /> fail to be invertible?
        Three diagnoses, all the same:
      </p>

      <ul>
        <li>
          Geometric:{" "}
          <InlineMath math="N(X) \ne \{\mathbf{0}\}" />.
        </li>
        <li>
          Algebraic: the columns of{" "}
          <InlineMath math="X" /> are linearly dependent (
          <em>multicollinearity</em>).
        </li>
        <li>
          Spectral: at least one singular value of{" "}
          <InlineMath math="X" /> is zero (rank deficient).
        </li>
      </ul>

      <p>
        Practical case: an "intercept" column of all-1s{" "}
        <em>and</em> a "constant feature" column of all 5s
        would be linearly dependent. So would two perfectly-
        correlated features. Dropping one or the other fixes
        the singularity.
      </p>

      <h3>
        Soft singularity: <InlineMath math="\kappa(X) \approx 10^{10}" />
      </h3>

      <p>
        More common than literal singularity is{" "}
        <em>near</em>-singularity: features that are almost
        collinear. Symptoms:
      </p>
      <ul>
        <li>
          Coefficients with huge magnitudes that flip sign on
          tiny data perturbations.
        </li>
        <li>
          Wild standard errors.
        </li>
        <li>
          Predictions that look fine despite garbage
          coefficients.
        </li>
      </ul>

      <h3>Ridge: principled handling</h3>

      <p>
        Ridge regression replaces{" "}
        <InlineMath math="X^T X" /> with{" "}
        <InlineMath math="X^T X + \lambda I" />:
      </p>
      <BlockMath math="\hat{\boldsymbol\beta}_{\mathrm{ridge}} = (X^T X + \lambda I)^{-1} X^T \mathbf{y}." />

      <p>
        Spectrally: every singular value{" "}
        <InlineMath math="\sigma_i^2" /> of{" "}
        <InlineMath math="X^T X" /> becomes{" "}
        <InlineMath math="\sigma_i^2 + \lambda" />. The
        condition number is now bounded above by{" "}
        <InlineMath math="(\sigma_{\max}^2 + \lambda)/\lambda" />.
        Instant numerical stability.
      </p>

      <p>
        Probabilistically: ridge is MAP under a Gaussian prior{" "}
        <InlineMath math="\boldsymbol\beta \sim N(\mathbf{0}, \tau^2 I)" />{" "}
        with{" "}
        <InlineMath math="\lambda = \sigma^2 / \tau^2" />.
        Lasso (L1 penalty) is the same construction with a
        Laplace prior. Both are revisited in Tier VI.
      </p>

      <Pitfall>
        Ridge biases the coefficients toward zero. The trade-
        off is bias for variance reduction. Whether that's
        worth it depends on prediction-error decomposition,
        not on philosophy. Cross-validation picks{" "}
        <InlineMath math="\lambda" />.
      </Pitfall>

      <Exercise prompt="Verify the ridge formula by calculus: minimise $L(\boldsymbol\beta) = \tfrac{1}{2}\|\mathbf{y} - X\boldsymbol\beta\|^2 + \tfrac{\lambda}{2}\|\boldsymbol\beta\|^2$.">
        <p>
          Gradient:{" "}
          <InlineMath math="\nabla L = -X^T(\mathbf{y} - X\boldsymbol\beta) + \lambda \boldsymbol\beta = (X^T X + \lambda I)\boldsymbol\beta - X^T \mathbf{y}" />.
        </p>
        <p>
          Set to zero:{" "}
          <InlineMath math="(X^T X + \lambda I)\hat{\boldsymbol\beta}_{\mathrm{ridge}} = X^T \mathbf{y}" />,
          giving the closed form. Hessian{" "}
          <InlineMath math="X^T X + \lambda I" /> is positive-
          definite for{" "}
          <InlineMath math="\lambda > 0" />, so the solution
          is the unique global minimum.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>Backbone of statistics &amp; ML</strong>: OLS
          is the simplest model that's actually useful, and
          most "fancy" models reduce to OLS in disguise (
          generalised linear models, ridge, kernel ridge,
          Bayesian linear regression).
        </li>
        <li>
          <strong>Time-series and microstructure</strong>:
          impact regressions in the propagator model are OLS
          with carefully-chosen feature columns. Slippage
          decompositions, market-making P&amp;L attributions,
          factor-model cross-sectional regressions — all OLS.
        </li>
        <li>
          <strong>Causal-inference toolbox</strong>: instrumental
          variables, two-stage least-squares, regression
          discontinuity — all sit on top of OLS with
          identification tricks layered on.
        </li>
        <li>
          <strong>Diagnostics</strong>: leverages, residuals,
          condition numbers all come straight out of the OLS
          machinery developed here. They're how you tell when
          a model has gone wrong.
        </li>
      </ul>

      <p>
        Tier III is now complete. We have gradients,
        Jacobians, matrix-derivative identities, and OLS in
        three derivations. Tier IV picks up probability
        foundations — distributions, joint laws, Bayes,
        limit theorems — which is what we'll need to build
        statistical inference (Tier V) and the probabilistic
        view of every ML algorithm (Tier VI).
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
      "The OLS normal equations are…",
    options: [
      "$X \\boldsymbol\\beta = \\mathbf{y}$",
      "$X^T X \\boldsymbol\\beta = X^T \\mathbf{y}$",
      "$X^T \\boldsymbol\\beta = \\mathbf{y}$",
      "$\\boldsymbol\\beta = X^{-1} \\mathbf{y}$",
    ],
    correct: 1,
    explanation:
      "Setting $\\nabla L = -X^T(\\mathbf{y} - X\\boldsymbol\\beta) = \\mathbf{0}$ gives $X^T X \\boldsymbol\\beta = X^T \\mathbf{y}$. Equivalently the residual $\\mathbf{y} - X\\hat{\\boldsymbol\\beta}$ is orthogonal to $C(X)$.",
  },
  {
    prompt:
      "Why is OLS often described as 'projection of $\\mathbf{y}$ onto $C(X)$'?",
    options: [
      "metaphorical only",
      "the fitted values $X\\hat{\\boldsymbol\\beta}$ are exactly the orthogonal projection of $\\mathbf{y}$ onto the column space of $X$",
      "because the residuals are eigenvalues",
      "because $X^T X$ is diagonal",
    ],
    correct: 1,
    explanation:
      "Minimising $\\|\\mathbf{y} - X\\boldsymbol\\beta\\|$ gives the closest point in $C(X)$ to $\\mathbf{y}$ — the orthogonal projection. Hat matrix $H = X(X^T X)^{-1} X^T$ is the projector.",
  },
  {
    prompt:
      "OLS is the MLE for $\\boldsymbol\\beta$ assuming…",
    options: [
      "Bernoulli noise",
      "iid Gaussian noise: $\\varepsilon_i \\sim N(0, \\sigma^2)$",
      "no noise",
      "exponential noise",
    ],
    correct: 1,
    explanation:
      "Under iid Gaussian noise, the negative log-likelihood is $\\propto \\sum (y_i - \\mathbf{x}_i^T \\boldsymbol\\beta)^2$, so MLE = OLS. Different noise models give different losses (logistic regression, Poisson regression, etc.).",
  },
  {
    prompt:
      "Why shouldn't you compute $(X^T X)^{-1}$ explicitly?",
    options: [
      "it's slow",
      "$\\kappa(X^T X) = \\kappa(X)^2$ — squaring the condition number can lose half your significant digits",
      "it's incorrect",
      "matrix inverses don't exist",
    ],
    correct: 1,
    explanation:
      "QR or SVD work in $\\kappa(X)$ rather than $\\kappa(X)^2$. For ill-conditioned $X$, the difference is numerical garbage vs a clean answer.",
  },
  {
    prompt:
      "Ridge regression replaces $X^T X$ with $X^T X + \\lambda I$. The probabilistic interpretation is…",
    options: [
      "a Gaussian likelihood with bigger noise variance",
      "MLE with no prior",
      "MAP estimate under a Gaussian prior $\\boldsymbol\\beta \\sim N(\\mathbf{0}, \\tau^2 I)$, with $\\lambda = \\sigma^2/\\tau^2$",
      "empirical Bayes",
    ],
    correct: 2,
    explanation:
      "Ridge = MAP with isotropic Gaussian prior. Lasso = MAP with Laplace prior. Connecting the algebraic regulariser to the probabilistic prior makes it easy to choose, interpret, and extend.",
  },
];
