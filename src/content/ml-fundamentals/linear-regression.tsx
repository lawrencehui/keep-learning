import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function LinearRegressionBody() {
  return (
    <>
      <p>
        Linear regression is the simplest model that's
        actually useful — and it sits at the centre of a
        whole web of related ideas: OLS, ridge, lasso,
        Bayesian linear regression, kernel ridge, generalised
        linear models. Each is the same model viewed through
        a different probabilistic lens. By the end of this
        chapter, all those names should feel like dialects
        of one language.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MML Ch 9",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "Linear regression in MLE / MAP / Bayesian flavours. The single best chapter on this topic.",
          },
          {
            title: "Murphy PML Ch 11",
            author: "Kevin Murphy",
            duration: "Reading",
            url: "https://probml.github.io/pml-book/book1.html",
            note: "Probabilistic linear regression, ridge / lasso / Bayesian linear regression in tighter notation.",
          },
          {
            title: "ESL Ch 3",
            author: "Hastie, Tibshirani, Friedman",
            duration: "Reading",
            url: "https://hastie.su.domains/ElemStatLearn/",
            note: "Reference. Best-subset, ridge, lasso, principal components regression all in one chapter.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The model and three lenses</h2>

      <Callout title="Linear regression model">
        Given features{" "}
        <InlineMath math="\mathbf{x}_i \in \mathbb{R}^p" /> and
        responses{" "}
        <InlineMath math="y_i \in \mathbb{R}" />, assume:
        <BlockMath math="y_i = \mathbf{x}_i^T \boldsymbol\beta + \varepsilon_i, \quad \varepsilon_i \stackrel{\mathrm{iid}}{\sim} N(0, \sigma^2)." />
      </Callout>

      <p>
        Three derivations give the same{" "}
        <InlineMath math="\hat{\boldsymbol\beta}" />:
      </p>

      <ul>
        <li>
          <strong>Calculus</strong>: minimise{" "}
          <InlineMath math="\|\mathbf{y} - X\boldsymbol\beta\|^2" />.
        </li>
        <li>
          <strong>Geometry</strong>: orthogonal projection of{" "}
          <InlineMath math="\mathbf{y}" /> onto{" "}
          <InlineMath math="C(X)" />.
        </li>
        <li>
          <strong>Probability</strong>: MLE under iid Gaussian
          noise.
        </li>
      </ul>

      <p>
        All give:
      </p>
      <BlockMath math="\hat{\boldsymbol\beta}_{\mathrm{OLS}} = (X^T X)^{-1} X^T \mathbf{y}." />

      <p>
        The probabilistic lens is the most useful one going
        forward, because it cleanly extends to ridge / lasso /
        Bayesian variants and to non-Gaussian likelihoods (
        logistic, Poisson regression, etc.).
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Bias-variance trade-off</h2>

      <p>
        The cardinal trade-off in supervised learning. Define
        the test-time mean-squared error of a predictor{" "}
        <InlineMath math="\hat f" /> at point{" "}
        <InlineMath math="\mathbf{x}_0" />:
      </p>
      <BlockMath math="\mathrm{MSE}(\mathbf{x}_0) = E[(y_0 - \hat f(\mathbf{x}_0))^2]." />

      <p>
        Decompose:
      </p>
      <BlockMath math="\mathrm{MSE} = \underbrace{\sigma^2}_{\text{irreducible}} + \underbrace{\mathrm{Bias}(\hat f)^2}_{\text{model error}} + \underbrace{\mathrm{Var}(\hat f)}_{\text{estimation noise}}." />

      <ul>
        <li>
          <strong>Irreducible noise</strong>: lower bound on
          MSE, regardless of model. Comes from{" "}
          <InlineMath math="\sigma^2" /> in the data-
          generating process.
        </li>
        <li>
          <strong>Bias</strong>: how far the average{" "}
          <InlineMath math="\hat f" /> is from the true
          function.
        </li>
        <li>
          <strong>Variance</strong>: how much{" "}
          <InlineMath math="\hat f" /> wiggles across
          different training samples.
        </li>
      </ul>

      <p>
        OLS is unbiased (under the linear model) but can have
        high variance when{" "}
        <InlineMath math="X^T X" /> is ill-conditioned. Ridge
        adds a tiny bias to slash variance — often a net
        win.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Ridge regression</h2>

      <Callout title="Ridge objective">
        <BlockMath math="\hat{\boldsymbol\beta}_{\mathrm{ridge}} = \arg\min_{\boldsymbol\beta} \|\mathbf{y} - X\boldsymbol\beta\|^2 + \lambda \|\boldsymbol\beta\|^2." />
        <BlockMath math="\hat{\boldsymbol\beta}_{\mathrm{ridge}} = (X^T X + \lambda I)^{-1} X^T \mathbf{y}." />
      </Callout>

      <h3>The MAP interpretation</h3>

      <p>
        Place a Gaussian prior:{" "}
        <InlineMath math="\boldsymbol\beta \sim N(\mathbf{0}, \tau^2 I)" />.
        With Gaussian noise, the posterior is also Gaussian
        and its mode (= mean, for Gaussian) is exactly the
        ridge solution with{" "}
        <InlineMath math="\lambda = \sigma^2 / \tau^2" />.
      </p>

      <p>
        So ridge isn't an ad-hoc penalty; it's the MAP under a
        principled prior.
      </p>

      <h3>Eigenvalue view</h3>

      <p>
        SVD-decompose{" "}
        <InlineMath math="X = U\Sigma V^T" />. Then{" "}
        <InlineMath math="X^T X = V\Sigma^2 V^T" /> and ridge
        replaces{" "}
        <InlineMath math="\sigma_i^2" /> with{" "}
        <InlineMath math="\sigma_i^2 + \lambda" />:
      </p>
      <BlockMath math="\hat{\boldsymbol\beta}_{\mathrm{ridge}} = V \, \mathrm{diag}\!\left(\frac{\sigma_i}{\sigma_i^2 + \lambda}\right) U^T \mathbf{y}." />

      <p>
        Compare OLS:{" "}
        <InlineMath math="\hat{\boldsymbol\beta}_{\mathrm{OLS}} = V \, \mathrm{diag}(1/\sigma_i) U^T \mathbf{y}" />.
        Small <InlineMath math="\sigma_i" /> directions get
        damped by ridge — exactly the directions that cause
        OLS instability.
      </p>

      <Pitfall>
        Ridge biases coefficients toward zero. The trade-off
        is bias for variance reduction. Cross-validation
        chooses{" "}
        <InlineMath math="\lambda" /> on held-out data; the
        sweet spot depends on the noise level and the spread
        of singular values.
      </Pitfall>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Lasso and sparse regression</h2>

      <Callout title="Lasso objective">
        <BlockMath math="\hat{\boldsymbol\beta}_{\mathrm{lasso}} = \arg\min_{\boldsymbol\beta} \|\mathbf{y} - X\boldsymbol\beta\|^2 + \lambda \|\boldsymbol\beta\|_1." />
      </Callout>

      <p>
        L1 penalty instead of L2. No closed form, but the
        objective is convex; coordinate descent or
        proximal-gradient methods solve it efficiently.
      </p>

      <h3>Why lasso induces sparsity</h3>

      <p>
        The L1 ball is a "diamond" — its corners lie on
        coordinate axes. The OLS error contour intersects
        this constraint region preferentially at corners,
        producing exact zeros in{" "}
        <InlineMath math="\hat{\boldsymbol\beta}" />. The L2
        ball is a smooth sphere; intersection rarely lands
        exactly on an axis, so ridge gives small-but-non-zero
        coefficients.
      </p>

      <h3>The MAP view</h3>

      <p>
        Place a Laplace prior on each coefficient:{" "}
        <InlineMath math="\beta_j \sim \mathrm{Laplace}(0, b)" />.
        Negative log prior:{" "}
        <InlineMath math="\propto |\beta_j|" />. MAP gives
        lasso. Sparsity-inducing priors make the connection to
        Bayesian model selection clear.
      </p>

      <h3>Elastic net</h3>

      <p>
        Combines L1 and L2:{" "}
        <InlineMath math="\lambda_1 \|\boldsymbol\beta\|_1 + \lambda_2 \|\boldsymbol\beta\|^2" />.
        Useful when groups of correlated features should be
        selected together — lasso alone tends to pick one
        from each correlated group somewhat arbitrarily.
      </p>

      <Exercise prompt="In ridge regression, what happens to $\hat{\boldsymbol\beta}_{\mathrm{ridge}}$ as $\lambda \to 0$ and as $\lambda \to \infty$?">
        <p>
          As <InlineMath math="\lambda \to 0" />: the
          regularisation vanishes and{" "}
          <InlineMath math="\hat{\boldsymbol\beta}_{\mathrm{ridge}} \to \hat{\boldsymbol\beta}_{\mathrm{OLS}}" />{" "}
          (when <InlineMath math="X^T X" /> is invertible).
        </p>
        <p>
          As <InlineMath math="\lambda \to \infty" />: the
          penalty dominates and{" "}
          <InlineMath math="\hat{\boldsymbol\beta}_{\mathrm{ridge}} \to \mathbf{0}" />.
        </p>
        <p>
          The intermediate sweet spot — picked via
          cross-validation — is what we use in practice.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Bayesian linear regression</h2>

      <p>
        Don't just give a point estimate of{" "}
        <InlineMath math="\boldsymbol\beta" />; give the whole
        posterior distribution.
      </p>

      <Callout title="Bayesian linear regression">
        Prior:{" "}
        <InlineMath math="\boldsymbol\beta \sim N(\boldsymbol\beta_0, S_0)" />.
        Likelihood:{" "}
        <InlineMath math="\mathbf{y} \mid X, \boldsymbol\beta \sim N(X\boldsymbol\beta, \sigma^2 I)" />.
        Posterior:{" "}
        <InlineMath math="\boldsymbol\beta \mid X, \mathbf{y} \sim N(\boldsymbol\beta_n, S_n)" />{" "}
        with
        <BlockMath math="S_n^{-1} = S_0^{-1} + \frac{1}{\sigma^2} X^T X, \qquad \boldsymbol\beta_n = S_n \left(S_0^{-1} \boldsymbol\beta_0 + \frac{1}{\sigma^2} X^T \mathbf{y}\right)." />
      </Callout>

      <p>
        With <InlineMath math="\boldsymbol\beta_0 = \mathbf{0}" />{" "}
        and{" "}
        <InlineMath math="S_0 = \tau^2 I" />:
      </p>
      <BlockMath math="\boldsymbol\beta_n = (X^T X + (\sigma^2/\tau^2) I)^{-1} X^T \mathbf{y} = \hat{\boldsymbol\beta}_{\mathrm{ridge}}." />

      <p>
        The posterior mean equals the ridge estimator. So
        Bayesian linear regression{" "}
        <em>is</em> ridge — but it also gives you{" "}
        <InlineMath math="S_n" />, the full posterior
        covariance.
      </p>

      <h3>Posterior predictive</h3>

      <p>
        For a new <InlineMath math="\tilde{\mathbf{x}}" />:
      </p>
      <BlockMath math="\tilde y \mid X, \mathbf{y}, \tilde{\mathbf{x}} \sim N(\boldsymbol\beta_n^T \tilde{\mathbf{x}}, \, \tilde{\mathbf{x}}^T S_n \tilde{\mathbf{x}} + \sigma^2)." />

      <p>
        The predictive variance has two pieces:
      </p>
      <ul>
        <li>
          <InlineMath math="\tilde{\mathbf{x}}^T S_n \tilde{\mathbf{x}}" />:
          uncertainty about <InlineMath math="\boldsymbol\beta" />,
          propagated forward.
        </li>
        <li>
          <InlineMath math="\sigma^2" />: irreducible
          observation noise.
        </li>
      </ul>

      <p>
        Predictions account for both. This is the major
        practical advantage of full Bayesian regression over
        point-estimate methods — you get calibrated
        uncertainty without bootstrap.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Generalised linear models (GLMs)</h2>

      <p>
        Replace the Gaussian likelihood with a different
        exponential-family distribution. Same linear
        structure{" "}
        <InlineMath math="\mathbf{x}^T \boldsymbol\beta" />,
        passed through a "link function" that maps to the
        natural parameter:
      </p>

      <ul>
        <li>
          <strong>Linear regression</strong>: Gaussian, identity
          link.
        </li>
        <li>
          <strong>Logistic regression</strong>: Bernoulli, logit
          link. Next chapter.
        </li>
        <li>
          <strong>Poisson regression</strong>: Poisson, log
          link. Models count data.
        </li>
        <li>
          <strong>Gamma regression</strong>: Gamma, inverse
          link. Models positive continuous data with
          right-skewed distributions.
        </li>
      </ul>

      <p>
        All fit by MLE (or MAP / Bayesian variants). Each
        replaces the Gaussian likelihood with a
        problem-appropriate one but otherwise reuses the
        machinery: build a likelihood, take log, take
        gradient, optimise.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Linear regression is everywhere</strong>: as
          a building block, baseline, sanity check, and
          standalone model. Every quant strategy and ML
          pipeline uses it somewhere.
        </li>
        <li>
          <strong>Regularisation = priors</strong>. Once you
          see this, choosing between ridge / lasso / elastic-net
          reduces to choosing a prior.
        </li>
        <li>
          <strong>Calibrated uncertainty</strong>. Bayesian
          posteriors propagate to predictions and decisions.
          Critical for calibrated-error situations: medical
          diagnostics, financial risk, model-aware execution.
        </li>
        <li>
          <strong>GLMs unify</strong>: count data (Poisson),
          binary outcomes (logistic), durations (Gamma),
          Cox-PH for survival — same machinery, different
          likelihoods.
        </li>
        <li>
          <strong>Microstructure</strong>: impact regressions
          in the propagator model, factor models in equity
          microstructure, calibrated execution-cost predictions
          — all are Bayesian-flavoured linear regressions.
        </li>
      </ul>

      <p>
        Next chapter: logistic regression and softmax — the
        standard tool for classification, and the home of
        cross-entropy loss.
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
      "Ridge regression's closed form $\\hat{\\boldsymbol\\beta} = (X^T X + \\lambda I)^{-1} X^T \\mathbf{y}$ is also the…",
    options: [
      "MLE under Gaussian noise",
      "MAP under a Gaussian prior $\\boldsymbol\\beta \\sim N(\\mathbf{0}, \\tau^2 I)$ with $\\lambda = \\sigma^2/\\tau^2$",
      "MLE under a Laplace prior",
      "least-squares estimator with no penalty",
    ],
    correct: 1,
    explanation:
      "Gaussian-Gaussian conjugacy: the posterior mode (= mean) is the ridge estimator. The penalty parameter $\\lambda$ encodes the ratio of noise variance to prior variance.",
  },
  {
    prompt: "Lasso induces sparsity because…",
    options: [
      "the L1 norm is convex",
      "the L1 ball has corners on coordinate axes, so the optimum often lies exactly on some axes (zero coefficients)",
      "L1 is faster to compute",
      "lasso uses gradient descent",
    ],
    correct: 1,
    explanation:
      "The geometry of the L1 ball (a 'diamond') has axis-aligned corners that intersect the OLS contour preferentially, giving exact zeros. Ridge's smooth L2 ball doesn't have this corner structure.",
  },
  {
    prompt: "Bias-variance decomposition: $\\mathrm{MSE} = ?$",
    options: [
      "$\\mathrm{Bias} + \\mathrm{Var}$",
      "$\\sigma^2 + \\mathrm{Bias}^2 + \\mathrm{Var}$ — irreducible + model + estimation",
      "$\\sigma^2$ only",
      "always zero",
    ],
    correct: 1,
    explanation:
      "Three sources: noise we can't reduce, systematic model misspecification (bias), and noise in the estimator across training samples (variance). Regularisation trades bias for variance reduction.",
  },
  {
    prompt: "Bayesian linear regression's posterior over $\\boldsymbol\\beta$ is…",
    options: [
      "uniform",
      "Gaussian, with mean equal to the ridge estimator and covariance $S_n$",
      "Laplace",
      "the same as the prior",
    ],
    correct: 1,
    explanation:
      "Gaussian-Gaussian conjugacy: posterior is Gaussian. Posterior mean = ridge solution, posterior covariance accounts for prior + data information. Predictive distribution propagates this uncertainty forward.",
  },
  {
    prompt: "GLMs generalise linear regression by…",
    options: [
      "using non-linear features",
      "replacing the Gaussian likelihood with another exponential-family distribution",
      "adding a kernel",
      "using neural networks",
    ],
    correct: 1,
    explanation:
      "GLMs keep the linear $\\mathbf{x}^T \\boldsymbol\\beta$ structure but allow Bernoulli (logistic), Poisson (count), Gamma (positive continuous), etc. likelihoods. All fit by MLE on the appropriate log-likelihood.",
  },
];
