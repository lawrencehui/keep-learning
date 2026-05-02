import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function FisherInformationBody() {
  return (
    <>
      <p>
        Fisher information measures{" "}
        <em>how much information the data carries about a
        parameter</em>. It's the second derivative (curvature)
        of the log-likelihood, evaluated at the true
        parameter. The Cramér–Rao bound says: no unbiased
        estimator can have variance smaller than the inverse
        Fisher information. The MLE achieves this bound
        asymptotically — that's why it's "efficient".
      </p>

      <ReferenceResources
        items={[
          {
            title: "Wasserman Ch 9",
            author: "Larry Wasserman",
            duration: "Reading",
            url: "https://link.springer.com/book/10.1007/978-0-387-21736-9",
            note: "Score, Fisher information, asymptotic distribution of MLE.",
          },
          {
            title: "Murphy PML Ch 4.7",
            author: "Kevin Murphy",
            duration: "Reading",
            url: "https://probml.github.io/pml-book/book1.html",
            note: "Information geometry context.",
          },
          {
            title: "Cover & Thomas — Elements of Information Theory",
            author: "Cover, Thomas",
            duration: "Reference",
            url: "https://www.wiley.com/en-us/Elements+of+Information+Theory%2C+2nd+Edition-p-9780471241959",
            note: "Connections between Fisher information and entropy / KL divergence.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The score function</h2>

      <Callout title="Definition · Score">
        For a model{" "}
        <InlineMath math="p(x \mid \theta)" />, the{" "}
        <strong>score</strong> is
        <BlockMath math="U(\theta; x) = \frac{\partial}{\partial \theta} \log p(x \mid \theta)." />
        For a sample{" "}
        <InlineMath math="x_1, \dots, x_n" />:{" "}
        <InlineMath math="U(\theta) = \sum_i U(\theta; x_i)" />,
        the gradient of the log-likelihood.
      </Callout>

      <p>
        Two foundational properties (under standard regularity
        conditions):
      </p>

      <Callout title="Properties of the score">
        <ul>
          <li>
            <strong>Mean zero</strong>:{" "}
            <InlineMath math="E[U(\theta; X)] = 0" /> when{" "}
            <InlineMath math="X \sim p(\cdot \mid \theta)" />.
          </li>
          <li>
            <strong>Variance = information</strong>:{" "}
            <InlineMath math="\mathrm{Var}(U(\theta; X)) = I(\theta)" />,
            the Fisher information.
          </li>
        </ul>
      </Callout>

      <p>
        Sketch of the mean-zero property:
      </p>
      <BlockMath math="E\!\left[\frac{\partial}{\partial \theta} \log p(X \mid \theta)\right] = \int \frac{\partial p / \partial \theta}{p} \cdot p \, dx = \frac{\partial}{\partial \theta} \int p \, dx = \frac{\partial}{\partial \theta} \, 1 = 0." />

      <p>
        Score = derivative of log-likelihood. Setting it to
        zero gives the MLE equation. The variance of the
        score is the central object.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Fisher information</h2>

      <Callout title="Two equivalent definitions">
        <BlockMath math="I(\theta) = \mathrm{Var}\!\left(\frac{\partial}{\partial \theta} \log p(X \mid \theta)\right) = -E\!\left[\frac{\partial^2}{\partial \theta^2} \log p(X \mid \theta)\right]." />
      </Callout>

      <p>
        First form: variance of the score. Second form: minus
        expected curvature of log-likelihood. Equivalent under
        regularity (a quick exercise — differentiate the
        identity{" "}
        <InlineMath math="E[U] = 0" /> once more).
      </p>

      <h3>For a sample of size $n$</h3>

      <p>
        Independent samples carry independent score
        contributions. Variances add:{" "}
        <InlineMath math="I_n(\theta) = n I(\theta)" />. So
        information grows linearly with sample size — twice
        the data, twice the precision.
      </p>

      <h3>Worked example: Bernoulli</h3>

      <p>
        <InlineMath math="\log p(x \mid p) = x \log p + (1-x) \log(1-p)" />.
      </p>
      <BlockMath math="\frac{\partial}{\partial p} \log p(x \mid p) = \frac{x}{p} - \frac{1-x}{1-p}." />
      <BlockMath math="\frac{\partial^2}{\partial p^2} \log p(x \mid p) = -\frac{x}{p^2} - \frac{1-x}{(1-p)^2}." />

      <p>
        Take the negative expectation:
      </p>
      <BlockMath math="I(p) = \frac{p}{p^2} + \frac{1 - p}{(1-p)^2} = \frac{1}{p} + \frac{1}{1-p} = \frac{1}{p(1-p)}." />

      <p>
        Largest information when{" "}
        <InlineMath math="p" /> is near 0 or 1 (extreme
        events are very informative); smallest at{" "}
        <InlineMath math="p = 1/2" /> (where each Bernoulli
        outcome is least diagnostic).
      </p>

      <h3>Worked example: Normal</h3>

      <p>
        For{" "}
        <InlineMath math="X \sim N(\mu, \sigma^2)" /> with{" "}
        <InlineMath math="\sigma^2" /> known, the Fisher
        information about{" "}
        <InlineMath math="\mu" /> is{" "}
        <InlineMath math="I(\mu) = 1/\sigma^2" />.
      </p>

      <p>
        Inverse variance — exactly what intuition expects.
        Smaller noise → more information about the mean.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · The Cramér–Rao lower bound</h2>

      <Callout title="Cramér-Rao bound">
        For any unbiased estimator{" "}
        <InlineMath math="\hat\theta" /> of{" "}
        <InlineMath math="\theta" /> based on a sample of size{" "}
        <InlineMath math="n" />:
        <BlockMath math="\mathrm{Var}(\hat\theta) \ge \frac{1}{n I(\theta)}." />
      </Callout>

      <p>
        No unbiased estimator can do better than this bound.
        It's a fundamental limit, not a property of any
        particular estimator.
      </p>

      <h3>Efficiency</h3>

      <p>
        An estimator that <em>achieves</em> the Cramér–Rao
        bound is called <strong>efficient</strong>. Most MLEs
        are asymptotically efficient — they reach the bound
        as <InlineMath math="n \to \infty" /> — but for finite
        samples, MLEs may have larger variance.
      </p>

      <h3>Multivariate version</h3>

      <p>
        For a vector parameter{" "}
        <InlineMath math="\boldsymbol\theta \in \mathbb{R}^k" />,
        the Fisher information is a{" "}
        <InlineMath math="k \times k" /> matrix:
      </p>
      <BlockMath math="I_{ij}(\boldsymbol\theta) = -E\!\left[\frac{\partial^2 \log p(X \mid \boldsymbol\theta)}{\partial \theta_i \partial \theta_j}\right]." />

      <p>
        And the Cramér–Rao bound becomes a matrix inequality:{" "}
        <InlineMath math="\mathrm{Cov}(\hat{\boldsymbol\theta}) \succeq (n I(\boldsymbol\theta))^{-1}" />,
        meaning the difference is positive-semi-definite.
      </p>

      <Exercise prompt="Compute Fisher information for $\\lambda$ in Exponential$(\\lambda)$, and write the CRLB.">
        <p>
          <InlineMath math="\log f(x \mid \lambda) = \log\lambda - \lambda x" />,{" "}
          <InlineMath math="\partial/\partial\lambda = 1/\lambda - x" />,{" "}
          <InlineMath math="\partial^2/\partial\lambda^2 = -1/\lambda^2" />.
        </p>
        <p>
          Fisher information:{" "}
          <InlineMath math="I(\lambda) = 1/\lambda^2" />.
          CRLB:{" "}
          <InlineMath math="\mathrm{Var}(\hat\lambda) \ge \lambda^2/n" />.
        </p>
        <p>
          The MLE is{" "}
          <InlineMath math="\hat\lambda = 1/\bar X" /> with
          asymptotic variance{" "}
          <InlineMath math="\lambda^2/n" /> — saturates the
          bound asymptotically.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Asymptotic distribution of the MLE</h2>

      <p>
        Combining everything:
      </p>

      <Callout title="Main theorem">
        Under regularity conditions:
        <BlockMath math="\sqrt n (\hat\theta_{\mathrm{MLE}} - \theta_0) \xrightarrow{d} N(0, I(\theta_0)^{-1})." />
      </Callout>

      <p>
        Three takeaways for practical inference:
      </p>

      <ul>
        <li>
          <strong>Asymptotic standard errors</strong>:{" "}
          <InlineMath math="\mathrm{SE}(\hat\theta) \approx 1/\sqrt{n I(\hat\theta)}" />.
          Use observed Fisher information at the MLE for a
          sample-based estimate.
        </li>
        <li>
          <strong>Wald confidence intervals</strong>:{" "}
          <InlineMath math="\hat\theta \pm 1.96 \, \mathrm{SE}(\hat\theta)" />{" "}
          for a 95% CI.
        </li>
        <li>
          <strong>Wald hypothesis test</strong>: test{" "}
          <InlineMath math="H_0 : \theta = \theta_0" /> by
          checking whether{" "}
          <InlineMath math="(\hat\theta - \theta_0)/\mathrm{SE}" /> is
          extreme under <InlineMath math="N(0, 1)" />.
        </li>
      </ul>

      <Pitfall>
        Asymptotic results are <em>asymptotic</em>. For small
        <InlineMath math="n" />, MLE bias can dominate
        variance. Bootstrap (Chapter 3) gives finite-sample
        CIs without asymptotic assumptions.
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Connections: KL divergence and information geometry</h2>

      <p>
        The Fisher information has a beautiful geometric
        interpretation. Consider the KL divergence from{" "}
        <InlineMath math="p_\theta" /> to{" "}
        <InlineMath math="p_{\theta + \delta}" />:
      </p>
      <BlockMath math="D_{KL}(p_{\theta} \| p_{\theta + \delta}) \approx \tfrac{1}{2} \delta^T I(\theta) \delta + O(\|\delta\|^3)." />

      <p>
        Fisher information is the local quadratic approximation
        of KL divergence — the "metric tensor" on the
        manifold of probability distributions. Two
        distributions with infinitesimally different parameters
        are at squared distance{" "}
        <InlineMath math="\delta^T I \delta" />.
      </p>

      <p>
        Practical use: the <strong>natural gradient</strong>{" "}
        in machine learning rescales gradient steps by{" "}
        <InlineMath math="I^{-1}" /> to make updates
        invariant to reparameterisation. K-FAC, Shampoo, and
        related second-order optimisers approximate this
        idea.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Asymptotic standard errors</strong>: every
          maximum-likelihood model in classical statistics
          reports SEs derived from observed Fisher
          information.
        </li>
        <li>
          <strong>Sample-size planning</strong>: knowing{" "}
          <InlineMath math="I(\theta)" /> lets you compute how
          much data you need to estimate{" "}
          <InlineMath math="\theta" /> to a given precision.
        </li>
        <li>
          <strong>Information-theoretic optimisation</strong>:
          natural gradient, Newton's method, K-FAC — second-
          order methods that condition on local geometry.
        </li>
        <li>
          <strong>Microstructure</strong>: estimation precision
          for Hawkes-process branching ratios is set by Fisher
          information of the kernel parameters; the CRLB
          tells you the best possible precision given
          observed event counts.
        </li>
      </ul>

      <p>
        Next chapter: hypothesis testing — using the
        likelihood machinery to make formal yes/no decisions
        from data.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt: "The score function is…",
    options: [
      "the data itself",
      "$\\partial / \\partial \\theta \\, \\log p(x \\mid \\theta)$",
      "the Hessian of the likelihood",
      "always zero",
    ],
    correct: 1,
    explanation:
      "Derivative of log-likelihood with respect to the parameter. Setting it to zero gives the MLE equation. Mean is zero (under the true parameter); variance is the Fisher information.",
  },
  {
    prompt: "Fisher information $I(\\theta)$ equals…",
    options: [
      "the prior variance",
      "$\\mathrm{Var}(U(\\theta; X)) = -E[\\partial^2 \\log p / \\partial\\theta^2]$",
      "the sample size",
      "always 1",
    ],
    correct: 1,
    explanation:
      "Two equivalent definitions: variance of the score, or minus expected Hessian of log-likelihood. The second often easier to compute.",
  },
  {
    prompt: "Cramér–Rao lower bound says…",
    options: [
      "$\\mathrm{Var}(\\hat\\theta) \\le 1/(n I(\\theta))$",
      "$\\mathrm{Var}(\\hat\\theta) \\ge 1/(n I(\\theta))$ for any unbiased $\\hat\\theta$",
      "MLE has the smallest variance for finite $n$",
      "Bayesian estimators have lower variance",
    ],
    correct: 1,
    explanation:
      "A lower bound: no unbiased estimator can do better. MLE achieves it asymptotically. Biased estimators (e.g. ridge) can technically beat it because they trade variance for bias.",
  },
  {
    prompt:
      "For Bernoulli$(p)$, Fisher information is $I(p) = ?$",
    options: [
      "$p$",
      "$1/p$",
      "$1/[p(1-p)]$",
      "$p(1-p)$",
    ],
    correct: 2,
    explanation:
      "$I(p) = 1/[p(1-p)]$. Largest near boundaries (extreme outcomes are very informative), smallest at $p = 1/2$ (each flip carries the least information). Translates to CRLB $\\mathrm{Var}(\\hat p) \\ge p(1-p)/n$ — exactly the variance of $\\bar X$.",
  },
  {
    prompt: "The Fisher information matrix is…",
    options: [
      "always diagonal",
      "the local KL-divergence quadratic approximation: $D_{KL}(p_\\theta \\| p_{\\theta + \\delta}) \\approx \\tfrac{1}{2} \\delta^T I \\delta$",
      "always identity",
      "irrelevant for ML",
    ],
    correct: 1,
    explanation:
      "Fisher info is the natural metric on the manifold of distributions. Used in natural-gradient methods, K-FAC, and information-geometric optimisation.",
  },
];
