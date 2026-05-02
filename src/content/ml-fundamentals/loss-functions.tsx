import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function LossFunctionsBody() {
  return (
    <>
      <p>
        Every supervised learning algorithm minimises some
        loss. The lasting insight: most "famous" losses are
        the negative log-likelihood of some probabilistic
        model. Once you see this, picking a loss becomes
        principled — match the noise model to the data, take
        NLL, optimise. This chapter catalogues the standard
        losses and what they assume about noise.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Murphy PML Ch 8",
            author: "Kevin Murphy",
            duration: "Reading",
            url: "https://probml.github.io/pml-book/book1.html",
            note: "Loss functions, exponential family, the unified probabilistic framework.",
          },
          {
            title: "ESL Ch 7",
            author: "Hastie, Tibshirani, Friedman",
            duration: "Reading",
            url: "https://hastie.su.domains/ElemStatLearn/",
            note: "Model selection and assessment — generalisation error, bias-variance, the role of loss functions.",
          },
          {
            title: "Cover & Thomas — Elements of Information Theory",
            author: "Cover, Thomas",
            duration: "Reference",
            url: "https://www.wiley.com/en-us/Elements+of+Information+Theory%2C+2nd+Edition-p-9780471241959",
            note: "Foundation for KL divergence, cross-entropy, and information-theoretic loss functions.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Regression losses</h2>

      <h3>Mean Squared Error (MSE)</h3>

      <BlockMath math="L_{\mathrm{MSE}}(\mathbf{y}, \hat{\mathbf{y}}) = \frac{1}{n} \sum_i (y_i - \hat y_i)^2." />

      <p>
        NLL of Gaussian noise:{" "}
        <InlineMath math="y_i = \hat y_i + \varepsilon_i" /> with{" "}
        <InlineMath math="\varepsilon \sim N(0, \sigma^2)" />.
        Symmetric, smooth, sensitive to outliers (squaring
        amplifies large residuals).
      </p>

      <h3>Mean Absolute Error (MAE)</h3>

      <BlockMath math="L_{\mathrm{MAE}}(\mathbf{y}, \hat{\mathbf{y}}) = \frac{1}{n} \sum_i |y_i - \hat y_i|." />

      <p>
        NLL of Laplace noise. Robust to outliers (linear
        penalty, not quadratic). Non-smooth at zero — gradient
        descent on MAE uses subgradients.
      </p>

      <h3>Huber loss</h3>

      <BlockMath math="L_{\mathrm{Huber}}(r) = \begin{cases} \tfrac{1}{2} r^2 & |r| \le \delta \\ \delta(|r| - \tfrac{1}{2}\delta) & |r| > \delta \end{cases}" />

      <p>
        Smooth like MSE near zero, robust like MAE in the
        tails. The hyperparameter{" "}
        <InlineMath math="\delta" /> sets the transition. The
        practical default for robust regression.
      </p>

      <Callout title="Quick rule">
        Squared loss is everywhere because the math is easy
        and Gaussian noise is a reasonable default. Switch to
        MAE / Huber when outliers are real.
      </Callout>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Classification losses</h2>

      <h3>Cross-entropy / log loss</h3>

      <p>
        For binary classification:
      </p>
      <BlockMath math="L_{\mathrm{BCE}}(\mathbf{y}, \hat{\mathbf{p}}) = -\frac{1}{n} \sum_i [y_i \log \hat p_i + (1 - y_i) \log(1 - \hat p_i)]." />

      <p>
        Multi-class:
      </p>
      <BlockMath math="L_{\mathrm{CE}}(\mathbf{y}, \hat{\mathbf{p}}) = -\sum_k y_k \log \hat p_k." />

      <p>
        NLL of Bernoulli (binary) and categorical (multi-
        class). Drilled to death in the previous chapter.
      </p>

      <h3>Hinge loss (SVM)</h3>

      <BlockMath math="L_{\mathrm{hinge}}(y, \hat y) = \max(0, 1 - y \hat y), \quad y \in \{-1, +1\}." />

      <p>
        Support vector machines minimise hinge loss + L2
        regulariser. Outputs aren't probabilities — they're
        signed scores. Hinge has no probabilistic
        interpretation as NLL of a standard distribution; it
        comes from a margin-maximisation principle.
      </p>

      <h3>Focal loss</h3>

      <p>
        Modification of cross-entropy for imbalanced
        classification:
      </p>
      <BlockMath math="L_{\mathrm{focal}} = -(1 - \hat p_c)^\gamma \log \hat p_c." />

      <p>
        Down-weights well-classified examples (where{" "}
        <InlineMath math="\hat p_c" /> is close to 1) and
        focuses gradient on hard examples. Standard in object
        detection (RetinaNet) and other heavy-imbalance
        problems.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · KL divergence and cross-entropy</h2>

      <p>
        Information-theoretic perspective.
      </p>

      <Callout title="KL divergence">
        <BlockMath math="D_{KL}(p \| q) = \sum_x p(x) \log \frac{p(x)}{q(x)} = E_p[\log p] - E_p[\log q]." />
      </Callout>

      <p>
        Properties:
      </p>
      <ul>
        <li>
          <InlineMath math="D_{KL}(p \| q) \ge 0" /> with
          equality iff{" "}
          <InlineMath math="p = q" /> (Gibbs' inequality).
        </li>
        <li>
          <strong>Asymmetric</strong>:{" "}
          <InlineMath math="D_{KL}(p \| q) \ne D_{KL}(q \| p)" />.
        </li>
        <li>
          Not a metric, but a useful "directed distance"
          between distributions.
        </li>
      </ul>

      <h3>Cross-entropy = entropy + KL</h3>

      <p>
        Define cross-entropy:
      </p>
      <BlockMath math="H(p, q) = -\sum_x p(x) \log q(x) = H(p) + D_{KL}(p \| q)." />

      <p>
        Minimising cross-entropy{" "}
        <InlineMath math="H(p, q)" /> with respect to{" "}
        <InlineMath math="q" />, where{" "}
        <InlineMath math="p" /> is the empirical
        distribution, is equivalent to minimising{" "}
        <InlineMath math="D_{KL}(p \| q)" /> (since{" "}
        <InlineMath math="H(p)" /> doesn't depend on{" "}
        <InlineMath math="q" />).
      </p>

      <p>
        So: minimising classification cross-entropy =
        minimising KL from the data to the model = MLE for
        the categorical likelihood. Three names for the same
        principle.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Loss-likelihood dictionary</h2>

      <Callout title="The dictionary">
        <ul>
          <li>
            MSE = NLL of Gaussian noise.
          </li>
          <li>
            MAE = NLL of Laplace noise.
          </li>
          <li>
            Cross-entropy (binary) = NLL of Bernoulli.
          </li>
          <li>
            Cross-entropy (multi-class) = NLL of categorical.
          </li>
          <li>
            Poisson NLL = log-likelihood of Poisson counts.
          </li>
          <li>
            Quantile loss / pinball = NLL of asymmetric Laplace.
          </li>
          <li>
            Hinge = margin-based, not likelihood-based.
          </li>
        </ul>
      </Callout>

      <p>
        Once the dictionary is internalised, choosing a loss
        means thinking about the noise/likelihood model, not
        searching for "what loss should I use?"
      </p>

      <Pitfall>
        Don't apply MSE to count data. The Gaussian
        assumption fails (negative numbers? non-integer
        outputs?) and the loss biases predictions in
        characteristic ways. Use Poisson NLL or negative-
        binomial regression instead.
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Regularisation as Bayesian priors</h2>

      <p>
        A regularised loss takes the form{" "}
        <InlineMath math="L(\theta) + \lambda R(\theta)" />.
        The penalty <InlineMath math="R" /> is interpretable
        as the negative log of a prior:
      </p>

      <ul>
        <li>
          L2:{" "}
          <InlineMath math="R = \|\theta\|^2/2" />. Gaussian
          prior.
        </li>
        <li>
          L1:{" "}
          <InlineMath math="R = \|\theta\|_1" />. Laplace
          prior.
        </li>
        <li>
          Group-L2:{" "}
          <InlineMath math="R = \sum_g \|\theta_g\|" />.
          Group-Gaussian prior; encourages whole groups of
          weights to be small or large together.
        </li>
        <li>
          Nuclear norm (sum of singular values): low-rank
          prior on matrices. Used in matrix completion.
        </li>
      </ul>

      <p>
        Hyperparameter{" "}
        <InlineMath math="\lambda" /> = ratio of likelihood
        precision to prior precision. Cross-validation tunes
        it; principled empirical Bayes can also estimate it
        from the data.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Calibration and proper scoring rules</h2>

      <p>
        A subtler question: which loss makes the model
        output well-calibrated probabilities?
      </p>

      <Callout title="Proper scoring rule">
        A loss <InlineMath math="L(\hat p, y)" /> is{" "}
        <strong>proper</strong> if the true distribution{" "}
        <InlineMath math="p^*" /> is the unique minimiser of
        the expected loss{" "}
        <InlineMath math="E_{y \sim p^*}[L(\hat p, y)]" /> over
        all possible <InlineMath math="\hat p" />.
      </Callout>

      <p>
        Proper scoring rules reward honest probability
        reporting. Examples:
      </p>
      <ul>
        <li>
          Cross-entropy / log-loss.
        </li>
        <li>
          Brier score:{" "}
          <InlineMath math="\sum_k (\hat p_k - y_k)^2" />.
        </li>
      </ul>

      <p>
        Hinge loss is{" "}
        <em>not</em> proper — SVM outputs are signed
        margins, not probabilities, and they're systematically
        miscalibrated. Need post-hoc calibration (Platt
        scaling, isotonic regression) for downstream
        probabilistic decisions.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Choosing a loss = choosing a model</strong>.
          Once seen this way, "engineering" a custom loss
          becomes designing a custom likelihood.
        </li>
        <li>
          <strong>Calibration</strong>. For
          decision-theoretic applications, you want
          calibrated probabilities. Cross-entropy gives them
          naturally; squared loss on a sigmoid does not.
        </li>
        <li>
          <strong>Heavy-tailed losses</strong>. Robustness
          comes from heavy-tailed likelihood models — Cauchy
          regression, Student-t regression. The loss
          inherits the tail behaviour of the assumed
          distribution.
        </li>
        <li>
          <strong>Microstructure</strong>: predicting trade
          sizes (Poisson NLL or Gamma NLL), classifying
          aggressive vs passive orders (cross-entropy),
          forecasting durations between events (exponential
          / Weibull NLL). Match the loss to the data type.
        </li>
      </ul>

      <p>
        Module VI is now complete. We have the four canonical
        ML algorithms (linear regression, logistic, PCA, loss
        functions) all derived from the same probabilistic
        principles. Module VII picks up stochastic calculus
        — Brownian motion, Itô's lemma, Hawkes processes —
        which is the math of price diffusions and
        microstructure dynamics.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt: "MSE corresponds to NLL of which noise model?",
    options: [
      "Bernoulli",
      "Gaussian",
      "Laplace",
      "Poisson",
    ],
    correct: 1,
    explanation:
      "$y = \\hat y + \\varepsilon$, $\\varepsilon \\sim N(0, \\sigma^2)$ ⇒ NLL is $\\propto (y - \\hat y)^2$. Squared loss is the right choice when residuals are approximately Gaussian.",
  },
  {
    prompt: "Why is MAE more robust to outliers than MSE?",
    options: [
      "MAE uses absolute value instead of squared, so a single huge residual contributes linearly rather than quadratically",
      "MAE doesn't have a derivative",
      "MAE is biased",
      "they're equally robust",
    ],
    correct: 0,
    explanation:
      "Outliers contribute $|r|$ to MAE vs $r^2$ to MSE. Big outliers dominate MSE; MAE sees them as just bigger but not catastrophic. Huber blends the two for smoothness near zero with linear tails.",
  },
  {
    prompt: "Cross-entropy minimisation = ?",
    options: [
      "MLE for the corresponding likelihood + minimising KL divergence from data to model",
      "minimising the classification accuracy",
      "maximising the model entropy",
      "regularisation",
    ],
    correct: 0,
    explanation:
      "Cross-entropy = entropy + KL. Entropy is a constant in the data; minimising cross-entropy is the same as minimising $D_{KL}(p_{\\text{data}} \\| q_{\\text{model}})$, which is exactly MLE for the categorical likelihood.",
  },
  {
    prompt: "Hinge loss (SVM) is…",
    options: [
      "the NLL of a Gaussian",
      "based on margin maximisation, not likelihood",
      "the NLL of a Bernoulli",
      "the same as cross-entropy",
    ],
    correct: 1,
    explanation:
      "Hinge has no NLL interpretation as a standard distribution. It comes from margin theory. SVM outputs aren't calibrated probabilities; need Platt scaling or isotonic regression for downstream probabilistic use.",
  },
  {
    prompt:
      "An L2 regulariser $\\lambda \\|\\boldsymbol\\theta\\|^2$ corresponds (probabilistically) to…",
    options: [
      "no prior",
      "a Gaussian prior $\\boldsymbol\\theta \\sim N(\\mathbf{0}, \\tau^2 I)$",
      "a Laplace prior",
      "a uniform prior",
    ],
    correct: 1,
    explanation:
      "L1 ↔ Laplace, L2 ↔ Gaussian. Negative log-prior of Gaussian is $\\propto \\|\\theta\\|^2$. Cross-validation tunes $\\lambda$, which is the ratio of noise variance to prior variance.",
  },
];
