import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function LogisticSoftmaxBody() {
  return (
    <>
      <p>
        Classification: the response is a class label, not a
        real number. Logistic regression handles binary
        classes; softmax generalises to many. Both are MLE
        under specific likelihoods, with negative
        log-likelihood that goes by the well-known name{" "}
        <strong>cross-entropy</strong>. Drilling the
        derivation of cross-entropy as the NLL of a
        categorical is the single most-asked interview
        question in this material — do it on paper at least
        once.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Murphy PML Ch 10",
            author: "Kevin Murphy",
            duration: "Reading",
            url: "https://probml.github.io/pml-book/book1.html",
            note: "Logistic regression, multi-class with softmax. The reference for cross-entropy as NLL.",
          },
          {
            title: "MML Ch 8",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "When models meet data — covers logistic and the connection to GLMs.",
          },
          {
            title: "ESL Ch 4.4",
            author: "Hastie, Tibshirani, Friedman",
            duration: "Reading",
            url: "https://hastie.su.domains/ElemStatLearn/",
            note: "Logistic regression in tighter notation.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Binary logistic regression</h2>

      <p>
        Setup. Features{" "}
        <InlineMath math="\mathbf{x}_i \in \mathbb{R}^p" />,
        labels{" "}
        <InlineMath math="y_i \in \{0, 1\}" />. Want a model
        for{" "}
        <InlineMath math="P(Y = 1 \mid \mathbf{x})" />.
      </p>

      <p>
        Why not OLS? Because{" "}
        <InlineMath math="\mathbf{x}^T \boldsymbol\beta" /> can
        give any real number, but probabilities live in{" "}
        <InlineMath math="[0, 1]" />. We need a squashing
        function.
      </p>

      <Callout title="Logistic / sigmoid model">
        <BlockMath math="P(Y = 1 \mid \mathbf{x}) = \sigma(\mathbf{x}^T \boldsymbol\beta) = \frac{1}{1 + e^{-\mathbf{x}^T \boldsymbol\beta}}." />
      </Callout>

      <p>
        Properties of the sigmoid:
      </p>
      <ul>
        <li>
          Maps{" "}
          <InlineMath math="\mathbb{R} \to (0, 1)" />.
        </li>
        <li>
          Symmetric:{" "}
          <InlineMath math="\sigma(-z) = 1 - \sigma(z)" />.
        </li>
        <li>
          Derivative:{" "}
          <InlineMath math="\sigma'(z) = \sigma(z)(1 - \sigma(z))" />.
        </li>
      </ul>

      <h3>Equivalent form: log-odds linearity</h3>

      <p>
        Logistic regression is exactly the model where the
        log-odds is linear in features:
      </p>
      <BlockMath math="\log \frac{P(Y = 1 \mid \mathbf{x})}{P(Y = 0 \mid \mathbf{x})} = \mathbf{x}^T \boldsymbol\beta." />

      <p>
        Coefficients are interpreted as log-odds increments
        per unit increase in a feature. Convenient for
        intuition: a coefficient of{" "}
        <InlineMath math="0.7" /> means each unit of that
        feature multiplies the odds by{" "}
        <InlineMath math="e^{0.7} \approx 2" />.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Negative log-likelihood</h2>

      <p>
        With{" "}
        <InlineMath math="p_i = \sigma(\mathbf{x}_i^T \boldsymbol\beta)" />,
        the likelihood for one observation is{" "}
        <InlineMath math="p_i^{y_i} (1 - p_i)^{1 - y_i}" />{" "}
        (the Bernoulli PMF). Log-likelihood:
      </p>
      <BlockMath math="\ell(\boldsymbol\beta) = \sum_i [y_i \log p_i + (1 - y_i) \log(1 - p_i)]." />

      <p>
        Negative log-likelihood = the loss we minimise:
      </p>
      <BlockMath math="L(\boldsymbol\beta) = -\sum_i [y_i \log p_i + (1 - y_i) \log(1 - p_i)]." />

      <p>
        This is <strong>binary cross-entropy</strong>. The
        name comes from information theory; the form is
        identical to the NLL.
      </p>

      <h3>Gradient</h3>

      <p>
        Apply chain rule:
      </p>
      <BlockMath math="\nabla_{\boldsymbol\beta} L = \sum_i (p_i - y_i) \mathbf{x}_i = X^T (\mathbf{p} - \mathbf{y})." />

      <p>
        That clean form — predicted minus actual — is the
        signature of the GLM family. Same structure as OLS,
        with predictions{" "}
        <InlineMath math="\mathbf{p}" /> instead of{" "}
        <InlineMath math="X\boldsymbol\beta" />.
      </p>

      <Pitfall>
        Squared loss on the sigmoid output (instead of
        cross-entropy) is a common mistake. The gradient of{" "}
        <InlineMath math="(\sigma(z) - y)^2" /> includes a{" "}
        <InlineMath math="\sigma'(z) = \sigma(z)(1 - \sigma(z))" />{" "}
        factor that vanishes when{" "}
        <InlineMath math="z" /> is large in either direction
        ("vanishing gradient"). Cross-entropy doesn't have
        this problem because the{" "}
        <InlineMath math="\sigma'" /> in the gradient cancels
        with the{" "}
        <InlineMath math="\sigma" /> in the log.
      </Pitfall>

      <h3>Hessian and convexity</h3>

      <p>
        The Hessian is{" "}
        <InlineMath math="X^T D X" /> with{" "}
        <InlineMath math="D = \mathrm{diag}(p_i(1 - p_i))" /> —
        always positive semi-definite. So the loss is convex
        and the unique global minimum is found by gradient
        descent / Newton.
      </p>

      <p>
        No closed form (unlike OLS), but standard solvers
        (IRLS = Newton with the Hessian, Newton-CG, L-BFGS)
        converge in tens of iterations.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Multi-class: softmax</h2>

      <p>
        Now <InlineMath math="K" /> classes. Each class has its
        own coefficient vector{" "}
        <InlineMath math="\boldsymbol\beta_k" />.
      </p>

      <Callout title="Softmax">
        <BlockMath math="P(Y = k \mid \mathbf{x}) = \frac{e^{\mathbf{x}^T \boldsymbol\beta_k}}{\sum_{j=1}^K e^{\mathbf{x}^T \boldsymbol\beta_j}}." />
      </Callout>

      <p>
        Properties:
      </p>
      <ul>
        <li>
          Outputs are positive and sum to 1.
        </li>
        <li>
          Reduces to sigmoid for{" "}
          <InlineMath math="K = 2" /> (with{" "}
          <InlineMath math="\boldsymbol\beta_1 = -\boldsymbol\beta_2" />).
        </li>
        <li>
          Invariant to constant shifts:{" "}
          <InlineMath math="\boldsymbol\beta_k \to \boldsymbol\beta_k + \mathbf{c}" /> doesn't
          change probabilities. This means{" "}
          <InlineMath math="\boldsymbol\beta_K" /> can be set
          to <InlineMath math="\mathbf{0}" /> WLOG.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Cross-entropy as NLL of categorical</h2>

      <p>
        This is the derivation to drill on paper.
      </p>

      <p>
        With one-hot label{" "}
        <InlineMath math="\mathbf{y} \in \{0, 1\}^K" /> (
        <InlineMath math="y_k = 1" /> if class{" "}
        <InlineMath math="k" />, 0 otherwise) and prediction{" "}
        <InlineMath math="\hat{\mathbf{p}} = \mathrm{softmax}(\mathbf{z})" />,
        the categorical likelihood for one observation is
      </p>
      <BlockMath math="P(Y \mid \mathbf{x}) = \prod_{k=1}^K \hat p_k^{y_k}." />

      <p>
        Negative log-likelihood:
      </p>
      <BlockMath math="-\log P(Y \mid \mathbf{x}) = -\sum_{k=1}^K y_k \log \hat p_k." />

      <Callout title="Cross-entropy = NLL of categorical">
        <BlockMath math="L_{\mathrm{CE}}(\mathbf{y}, \hat{\mathbf{p}}) = -\sum_{k=1}^K y_k \log \hat p_k = -\log \hat p_{c}" />
        where <InlineMath math="c" /> is the true class
        index (since only one{" "}
        <InlineMath math="y_k = 1" />).
      </Callout>

      <p>
        That single equation is the ML interview question.
        Three reads:
      </p>
      <ul>
        <li>
          <strong>Probabilistic</strong>: NLL of categorical
          distribution.
        </li>
        <li>
          <strong>Information-theoretic</strong>: cross-entropy
          between the true distribution{" "}
          <InlineMath math="p" /> and the predicted{" "}
          <InlineMath math="\hat p" />.
        </li>
        <li>
          <strong>Practical</strong>: take the predicted
          probability of the correct class, take its log,
          flip the sign.
        </li>
      </ul>

      <h3>The gradient with respect to logits</h3>

      <p>
        The famous result. With logits{" "}
        <InlineMath math="\mathbf{z} = (\mathbf{x}^T \boldsymbol\beta_1, \dots, \mathbf{x}^T \boldsymbol\beta_K)" />:
      </p>

      <Callout title="Softmax + cross-entropy gradient">
        <BlockMath math="\frac{\partial L}{\partial \mathbf{z}} = \hat{\mathbf{p}} - \mathbf{y}." />
      </Callout>

      <p>
        Predicted minus actual. Linear in the prediction
        error. This is why softmax + cross-entropy is the
        standard pairing — the derivative is clean,
        non-vanishing, and easy to backprop. Try
        cross-entropy with squared-loss instead and you get
        the vanishing-gradient problem from Part 2.
      </p>

      <p>
        Derivation outline (do it on paper at least once):
      </p>
      <ol>
        <li>
          <InlineMath math="L = -\sum_k y_k \log \hat p_k" />,{" "}
          <InlineMath math="\hat p_k = e^{z_k}/Z" /> with{" "}
          <InlineMath math="Z = \sum_j e^{z_j}" />.
        </li>
        <li>
          Substitute:{" "}
          <InlineMath math="L = -\sum_k y_k z_k + \log Z" />{" "}
          (using <InlineMath math="\log \hat p_k = z_k - \log Z" />).
        </li>
        <li>
          Differentiate:{" "}
          <InlineMath math="\partial L/\partial z_j = -y_j + e^{z_j}/Z = \hat p_j - y_j" />.
        </li>
      </ol>

      <Exercise prompt="A softmax classifier predicts $\hat{\mathbf{p}} = (0.1, 0.7, 0.2)$ for a 3-class problem. The true label is class 0 (one-hot $(1, 0, 0)$). Compute the cross-entropy loss and the gradient with respect to logits.">
        <p>
          Loss:{" "}
          <InlineMath math="-\log 0.1 \approx 2.303" />.
          Heavily penalised — model gave low probability to
          the correct class.
        </p>
        <p>
          Gradient w.r.t. logits:{" "}
          <InlineMath math="\hat{\mathbf{p}} - \mathbf{y} = (0.1 - 1, 0.7, 0.2) = (-0.9, 0.7, 0.2)" />.
          Negative for the correct class (push its logit{" "}
          <em>up</em>), positive for the wrong classes (push
          their logits down).
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Numerical stability tricks</h2>

      <p>
        Two practical issues:
      </p>

      <h3>Log-sum-exp</h3>

      <p>
        Computing softmax with large logits overflows{" "}
        <InlineMath math="e^{z_k}" />. Stable trick:
      </p>
      <BlockMath math="\log\sum_k e^{z_k} = z_{\max} + \log \sum_k e^{z_k - z_{\max}}." />

      <p>
        Subtract the max to keep exponents non-positive. Every
        ML library does this internally. Cross-entropy can be
        computed in one pass that avoids the explicit
        softmax.
      </p>

      <h3>The cross-entropy loss directly</h3>

      <p>
        With logits{" "}
        <InlineMath math="\mathbf{z}" /> and one-hot{" "}
        <InlineMath math="\mathbf{y}" />:
      </p>
      <BlockMath math="L = -z_c + \log\sum_j e^{z_j} = -z_c + \mathrm{LogSumExp}(\mathbf{z})." />

      <p>
        No probabilities formed; uses log-sum-exp directly.{" "}
        <code>torch.nn.CrossEntropyLoss</code> takes logits
        (not probabilities) for exactly this reason.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Regularisation</h2>

      <p>
        Same as linear regression: add a penalty.
      </p>

      <ul>
        <li>
          <strong>L2</strong>:{" "}
          <InlineMath math="L + \lambda \|\boldsymbol\beta\|^2" />.
          Equivalent to MAP under Gaussian prior.
        </li>
        <li>
          <strong>L1</strong>:{" "}
          <InlineMath math="L + \lambda \|\boldsymbol\beta\|_1" />.
          Sparsity-inducing.
        </li>
      </ul>

      <p>
        Logistic regression with L1 is one of the most-used
        baselines in production ML — sparse coefficients are
        interpretable, the model is convex, and standard
        solvers (LIBLINEAR) handle millions of features.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>The default classifier</strong>: logistic
          regression with regularisation is the standard
          baseline. Beat it with anything more complex
          (random forest, gradient boosting, neural nets) —
          but verify the gain.
        </li>
        <li>
          <strong>Cross-entropy is NLL</strong>: the cleanest
          example of "loss = NLL of likelihood" in ML.
          Knowing this principle generalises immediately to
          new likelihoods.
        </li>
        <li>
          <strong>Calibration matters</strong>: logistic
          regression's outputs are well-calibrated
          probabilities. Many downstream applications (
          decision rules, expected-utility maximisation) need
          calibrated probabilities, not just rank-orderings.
        </li>
        <li>
          <strong>Microstructure</strong>: classifying buy vs
          sell pressure, "informed" vs "uninformed" trades,
          predicting next-tick direction — all binary
          classifications. Many trade-classification rules
          (Lee-Ready) are heuristics that logistic regression
          can systematically refine.
        </li>
      </ul>

      <p>
        Next chapter: PCA. Where covariance eigendecompositions
        from Module II become a foundational ML algorithm.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt: "Logistic regression models $P(Y = 1 \\mid \\mathbf{x}) = ?$",
    options: [
      "$\\mathbf{x}^T \\boldsymbol\\beta$",
      "$\\sigma(\\mathbf{x}^T \\boldsymbol\\beta) = 1 / (1 + e^{-\\mathbf{x}^T \\boldsymbol\\beta})$",
      "$\\exp(\\mathbf{x}^T \\boldsymbol\\beta)$",
      "$\\mathbf{x}^T \\boldsymbol\\beta + \\varepsilon$",
    ],
    correct: 1,
    explanation:
      "Sigmoid squashes the linear predictor to $(0, 1)$. Equivalent: $\\log[P(Y=1)/P(Y=0)] = \\mathbf{x}^T \\boldsymbol\\beta$ — log-odds linear in features.",
  },
  {
    prompt:
      "The cross-entropy loss for a softmax classifier with one-hot label $\\mathbf{y}$ and prediction $\\hat{\\mathbf{p}}$ is…",
    options: [
      "$\\sum_k (\\hat p_k - y_k)^2$",
      "$-\\sum_k y_k \\log \\hat p_k$ — exactly the NLL of the categorical likelihood",
      "$\\sum_k y_k - \\hat p_k$",
      "$\\| \\hat{\\mathbf{p}} - \\mathbf{y} \\|$",
    ],
    correct: 1,
    explanation:
      "The defining identity. Drill it: NLL of categorical $= -\\log \\hat p_c$ where $c$ is the true class. The most-asked ML interview question.",
  },
  {
    prompt:
      "The gradient of softmax + cross-entropy with respect to logits $\\mathbf{z}$ is…",
    options: [
      "$\\hat{\\mathbf{p}}$",
      "$\\hat{\\mathbf{p}} - \\mathbf{y}$ — predicted minus actual",
      "$\\mathbf{y} - \\hat{\\mathbf{p}}$",
      "$\\hat{\\mathbf{p}} (1 - \\hat{\\mathbf{p}})$",
    ],
    correct: 1,
    explanation:
      "Linear in prediction error. The reason softmax + cross-entropy is the standard pairing — derivative is clean, non-vanishing, easy to backprop. Squared-loss-on-logits has a vanishing-gradient problem.",
  },
  {
    prompt: "Why use cross-entropy and not squared loss for classification?",
    options: [
      "they're equivalent",
      "cross-entropy avoids the vanishing-gradient problem of squared-loss-on-sigmoid; cross-entropy gradient is linear in error",
      "squared loss is harder to compute",
      "cross-entropy is cheaper",
    ],
    correct: 1,
    explanation:
      "Squared loss on $\\sigma(z)$ has a $\\sigma'(z) = \\sigma(z)(1 - \\sigma(z))$ factor that vanishes for confident wrong predictions. Cross-entropy cancels this; gradient is $\\hat p - y$.",
  },
  {
    prompt: "Numerical stability of softmax: 'log-sum-exp' subtracts the max because…",
    options: [
      "it's faster",
      "it prevents $e^z$ overflow when logits are large",
      "it's the official convention",
      "it changes the softmax output",
    ],
    correct: 1,
    explanation:
      "Subtracting $z_{\\max}$ keeps exponents non-positive (so $e^{z - z_{\\max}} \\le 1$). Output is identical (the constant cancels in numerator and denominator). Standard in every ML library.",
  },
];
