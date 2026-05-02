import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function BayesianInferenceBody() {
  return (
    <>
      <p>
        Frequentists treat parameters as fixed unknowns and
        randomness as repeated experiments. Bayesians treat
        parameters as random variables and condition on the
        data they actually observed. The same Bayes' theorem
        from Module IV is the engine, but now the parameters
        are what we want to update beliefs about. This shift
        unifies regularised regression, Bayesian linear
        regression, hierarchical models, and most of probabilistic
        machine learning.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Murphy PML Ch 4.6, Ch 11",
            author: "Kevin Murphy",
            duration: "Reading",
            url: "https://probml.github.io/pml-book/book1.html",
            note: "Bayesian inference, MAP, conjugate priors, Bayesian linear regression.",
          },
          {
            title: "MML Ch 8",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "When models meet data — MLE, MAP, full Bayesian inference in one chapter.",
          },
          {
            title: "Statistical Rethinking — McElreath",
            author: "Richard McElreath",
            duration: "Reading + lectures",
            url: "https://xcelab.net/rm/statistical-rethinking/",
            note: "Bayesian-first textbook with examples in R/Stan. Excellent intuition-builder.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The Bayesian framework</h2>

      <Callout title="Bayes' theorem for inference">
        <BlockMath math="p(\theta \mid \mathcal{D}) = \frac{p(\mathcal{D} \mid \theta) \, p(\theta)}{p(\mathcal{D})}." />
        <ul>
          <li>
            <strong>Prior</strong>{" "}
            <InlineMath math="p(\theta)" />: belief before
            seeing data.
          </li>
          <li>
            <strong>Likelihood</strong>{" "}
            <InlineMath math="p(\mathcal{D} \mid \theta)" />:
            data model.
          </li>
          <li>
            <strong>Posterior</strong>{" "}
            <InlineMath math="p(\theta \mid \mathcal{D})" />:
            updated belief after seeing data.
          </li>
          <li>
            <strong>Evidence</strong>{" "}
            <InlineMath math="p(\mathcal{D}) = \int p(\mathcal{D} \mid \theta) p(\theta) \, d\theta" />:
            normaliser.
          </li>
        </ul>
      </Callout>

      <p>
        Read it as: <strong>posterior ∝ likelihood × prior</strong>.
        The evidence is just a normalising constant; in many
        practical problems we work with unnormalised
        posteriors (MCMC, MAP).
      </p>

      <h3>Subjective vs objective priors</h3>

      <p>
        The prior is the controversial piece. Two camps:
      </p>
      <ul>
        <li>
          <strong>Subjective</strong>: encode any genuine
          prior belief. If you've studied the problem
          before, your prior reflects that.
        </li>
        <li>
          <strong>Objective</strong>: use "uninformative"
          priors that minimise their influence (uniform,
          Jeffreys, reference priors).
        </li>
      </ul>

      <p>
        With enough data, posteriors converge regardless of
        prior choice (asymptotic posterior concentration).
        With small data, the prior matters — and a
        well-chosen prior is often better than the
        zero-information default.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Conjugate priors</h2>

      <p>
        Some prior–likelihood pairs make the posterior easy:
        same family as the prior, with updated parameters.
        This is <strong>conjugacy</strong>.
      </p>

      <Callout title="Common conjugate pairs">
        <ul>
          <li>
            Bernoulli/Binomial likelihood + Beta prior →
            Beta posterior.
          </li>
          <li>
            Poisson likelihood + Gamma prior → Gamma
            posterior.
          </li>
          <li>
            Gaussian likelihood (known variance) + Gaussian
            prior → Gaussian posterior.
          </li>
          <li>
            Multinomial + Dirichlet → Dirichlet.
          </li>
        </ul>
      </Callout>

      <h3>Beta-Binomial example</h3>

      <p>
        Coin with unknown bias{" "}
        <InlineMath math="p" />. Prior:{" "}
        <InlineMath math="p \sim \mathrm{Beta}(\alpha, \beta)" />.
        Observe{" "}
        <InlineMath math="k" /> heads in{" "}
        <InlineMath math="n" /> flips. Posterior:
      </p>
      <BlockMath math="p \mid k, n \sim \mathrm{Beta}(\alpha + k, \beta + n - k)." />

      <p>
        Updates by adding observed counts to prior counts.{" "}
        <InlineMath math="\mathrm{Beta}(\alpha, \beta)" /> can
        be read as "before observing data, I've seen{" "}
        <InlineMath math="\alpha - 1" /> heads and{" "}
        <InlineMath math="\beta - 1" /> tails."{" "}
        <InlineMath math="\mathrm{Beta}(1, 1)" /> = uniform =
        no prior information.
      </p>

      <h3>Gaussian-Gaussian example</h3>

      <p>
        Likelihood:{" "}
        <InlineMath math="x_i \mid \mu \sim N(\mu, \sigma^2)" /> with{" "}
        <InlineMath math="\sigma^2" /> known. Prior:{" "}
        <InlineMath math="\mu \sim N(\mu_0, \tau_0^2)" />.
      </p>
      <p>
        Posterior:{" "}
        <InlineMath math="\mu \mid \mathbf{x} \sim N(\mu_n, \tau_n^2)" /> with
      </p>
      <BlockMath math="\frac{1}{\tau_n^2} = \frac{1}{\tau_0^2} + \frac{n}{\sigma^2}, \qquad \mu_n = \tau_n^2 \left(\frac{\mu_0}{\tau_0^2} + \frac{n \bar x}{\sigma^2}\right)." />

      <p>
        Posterior precision = prior precision + data
        precision (each datum contributes{" "}
        <InlineMath math="1/\sigma^2" />). Posterior mean is
        a precision-weighted average of prior mean and sample
        mean.
      </p>

      <p>
        Practical reading: small{" "}
        <InlineMath math="n" /> ⇒ posterior dominated by
        prior; large{" "}
        <InlineMath math="n" /> ⇒ posterior dominated by data.
        The transition is automatic and quantitative.
      </p>

      <Exercise prompt="Coin flipped 10 times, 7 heads. Use Beta(2, 2) prior. What's the posterior mean and a 95% credible interval?">
        <p>
          Posterior: <InlineMath math="\mathrm{Beta}(2 + 7, 2 + 3) = \mathrm{Beta}(9, 5)" />.
        </p>
        <p>
          Mean of <InlineMath math="\mathrm{Beta}(\alpha, \beta)" /> is <InlineMath math="\alpha/(\alpha + \beta) = 9/14 \approx 0.64" />.
        </p>
        <p>
          95% credible interval: 2.5th–97.5th percentile of{" "}
          <InlineMath math="\mathrm{Beta}(9, 5)" />, approximately{" "}
          <InlineMath math="(0.39, 0.86)" />. Compare MLE
          point estimate{" "}
          <InlineMath math="\hat p = 0.7" />: the prior pulls
          toward 1/2, so the posterior mean is slightly less.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · MAP estimation</h2>

      <Callout title="Definition · MAP">
        <BlockMath math="\hat\theta_{\mathrm{MAP}} = \arg\max_\theta p(\theta \mid \mathcal{D}) = \arg\max_\theta [\log p(\mathcal{D} \mid \theta) + \log p(\theta)]." />
      </Callout>

      <p>
        Drop the evidence (constant in{" "}
        <InlineMath math="\theta" />), take logs, maximise.
        MAP combines the likelihood with the log-prior in a
        single optimisation.
      </p>

      <h3>Why MAP is everywhere in ML</h3>

      <p>
        Most "regularised" loss functions are MAPs in
        disguise:
      </p>
      <ul>
        <li>
          <strong>Ridge regression</strong>: Gaussian prior on{" "}
          <InlineMath math="\boldsymbol\beta" />,{" "}
          <InlineMath math="\boldsymbol\beta \sim N(\mathbf{0}, \tau^2 I)" />.
          Negative log-prior:{" "}
          <InlineMath math="\propto \|\boldsymbol\beta\|^2" />.
          MAP = OLS + L2 penalty.
        </li>
        <li>
          <strong>Lasso</strong>: Laplace prior. Negative
          log-prior:{" "}
          <InlineMath math="\propto \|\boldsymbol\beta\|_1" />.
          MAP = OLS + L1 penalty (sparsity).
        </li>
        <li>
          <strong>Logistic regression with L2</strong>:
          Gaussian prior on weights.
        </li>
        <li>
          <strong>Bayesian neural networks</strong>: Gaussian
          priors on parameters, MAP = standard weight-decay
          training.
        </li>
      </ul>

      <p>
        Once you see this, "regularisation" and "Bayesian
        inference" are different vocabularies for the same
        thing, and choosing a prior is a principled way to
        pick a regulariser.
      </p>

      <Pitfall>
        MAP is a point estimate, like MLE. It doesn't reflect
        posterior uncertainty. For full uncertainty
        quantification, sample the posterior or compute
        moments. MAP also depends on the parameterisation —
        unlike MLE, which is invariant under
        reparameterisation.
      </Pitfall>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Posterior predictive distributions</h2>

      <p>
        For a new data point{" "}
        <InlineMath math="\tilde x" />, the{" "}
        <strong>posterior predictive</strong> is
      </p>
      <BlockMath math="p(\tilde x \mid \mathcal{D}) = \int p(\tilde x \mid \theta) \, p(\theta \mid \mathcal{D}) \, d\theta." />

      <p>
        Average the data model over the posterior of{" "}
        <InlineMath math="\theta" />. This integrates out
        parameter uncertainty — predictions account for both
        observation noise and model uncertainty.
      </p>

      <p>
        For Bayesian linear regression, the posterior
        predictive is closed form:{" "}
        <InlineMath math="\tilde y \sim N(\hat{\boldsymbol\beta}^T \tilde{\mathbf{x}}, \tilde\sigma^2)" />{" "}
        with{" "}
        <InlineMath math="\tilde\sigma^2 = \tilde{\mathbf{x}}^T \Sigma_{\boldsymbol\beta} \tilde{\mathbf{x}} + \sigma^2" />{" "}
        — combining parameter variance and observation noise.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Credible intervals</h2>

      <Callout title="Definition · Credible interval">
        A <InlineMath math="(1-\alpha)" />{" "}
        <strong>credible interval</strong> is an interval{" "}
        <InlineMath math="[L, U]" /> such that
        <BlockMath math="P(\theta \in [L, U] \mid \mathcal{D}) \ge 1 - \alpha." />
      </Callout>

      <p>
        Two common variants:
      </p>
      <ul>
        <li>
          <strong>Equal-tailed</strong>: 2.5th to 97.5th
          posterior percentiles for 95% CI.
        </li>
        <li>
          <strong>HPD (highest posterior density)</strong>:
          smallest interval containing 95% probability mass.
          Useful for skewed posteriors.
        </li>
      </ul>

      <h3>Credible vs confidence</h3>

      <p>
        The two intervals look similar but mean different
        things:
      </p>
      <ul>
        <li>
          <strong>Confidence</strong>: across hypothetical
          repetitions of the experiment, 95% of resulting
          intervals contain the true parameter.
        </li>
        <li>
          <strong>Credible</strong>: given the observed data,
          there's a 95% posterior probability that the
          parameter lies in this interval.
        </li>
      </ul>

      <p>
        The credible interval is what most people <em>think</em>{" "}
        a confidence interval means. For nice problems they
        often coincide numerically, but the interpretation
        differs sharply.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Computational Bayesian inference</h2>

      <p>
        Conjugacy makes life easy when it works. Most
        practical models aren't conjugate. The two major
        computational approaches:
      </p>

      <h3>Markov Chain Monte Carlo (MCMC)</h3>

      <p>
        Construct a Markov chain whose stationary
        distribution is the posterior. Sample from the
        chain, treat samples as draws from the posterior.
        Standard algorithms:
      </p>
      <ul>
        <li>
          <strong>Metropolis–Hastings</strong>: propose, accept
          with probability based on density ratio.
        </li>
        <li>
          <strong>Gibbs sampling</strong>: sample one
          parameter at a time from its full conditional.
        </li>
        <li>
          <strong>Hamiltonian Monte Carlo (HMC)</strong>:
          uses gradients to take long, informed steps. Stan,
          PyMC, NumPyro all use HMC variants by default.
        </li>
      </ul>

      <p>
        Spectral gap (Module II) determines mixing time. Diagnostics
        (effective sample size, R-hat) check whether the
        chain has converged.
      </p>

      <h3>Variational inference (VI)</h3>

      <p>
        Approximate the posterior with a tractable family{" "}
        <InlineMath math="q(\theta)" />, choose{" "}
        <InlineMath math="q" /> by minimising{" "}
        <InlineMath math="D_{KL}(q \| p)" />. Faster than MCMC,
        gives biased samples but often "good enough" for
        large-scale ML. Foundation of variational autoencoders
        and stochastic VI for big data.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Regularisation reframed</strong>: every L1
          / L2 penalty is a log-prior. Cross-validation picks
          the prior strength; the underlying probabilistic
          model is explicit.
        </li>
        <li>
          <strong>Hierarchical models</strong>: when units
          (firms, customers, days) share structure, a
          hierarchical prior lets data from each unit inform
          others. Crucial for small-sample situations and
          partial pooling.
        </li>
        <li>
          <strong>Online updating</strong>: posterior after
          batch{" "}
          <InlineMath math="t" /> becomes the prior for batch{" "}
          <InlineMath math="t+1" />. Scales naturally to
          streaming data — Kalman filters are exactly Gaussian
          conjugate updates.
        </li>
        <li>
          <strong>Microstructure</strong>: market-making and
          execution algorithms run on Bayesian posteriors over
          latent state (true volatility, queue position
          quality, fill probability). Priors shrink estimates
          and prevent overfitting on noisy fast data.
        </li>
        <li>
          <strong>Decision theory</strong>: Bayesian framework
          plus a loss function gives expected-loss-minimising
          decisions. Cleaner than ad-hoc rules.
        </li>
      </ul>

      <p>
        Module V is now complete. We have estimation (MLE,
        MAP, Bayesian), uncertainty quantification (Fisher,
        bootstrap, credible intervals), and hypothesis tests.
        Module VI uses these tools to build the standard ML
        models — linear regression, logistic regression, PCA
        — all from a probabilistic-first perspective.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt: "Bayesian inference computes…",
    options: [
      "the MLE",
      "the posterior $p(\\theta \\mid \\mathcal{D}) \\propto p(\\mathcal{D} \\mid \\theta) p(\\theta)$",
      "p-values",
      "the bootstrap distribution",
    ],
    correct: 1,
    explanation:
      "Posterior ∝ likelihood × prior. The evidence is just a normaliser. The posterior captures all uncertainty about $\\theta$ given the data and the prior.",
  },
  {
    prompt:
      "Posterior for $p \\sim \\mathrm{Beta}(\\alpha, \\beta)$ after $k$ heads in $n$ flips:",
    options: [
      "$\\mathrm{Beta}(\\alpha, \\beta)$ — unchanged",
      "$\\mathrm{Beta}(\\alpha + k, \\beta + n - k)$",
      "$\\mathrm{Bernoulli}(p)$",
      "$\\mathrm{Uniform}(0, 1)$",
    ],
    correct: 1,
    explanation:
      "Conjugacy: Beta + Binomial → Beta with parameters incremented by observed counts. Beta(1,1) is uniform; Beta(0,0) is improper but a useful limit (sometimes 'Haldane prior').",
  },
  {
    prompt: "MAP estimation differs from MLE because…",
    options: [
      "MAP doesn't use likelihood",
      "MAP includes the log-prior in the optimisation",
      "MLE is always Bayesian",
      "MAP is for discrete parameters only",
    ],
    correct: 1,
    explanation:
      "MAP maximises log-likelihood + log-prior. Reduces to MLE when prior is uniform. Common ML techniques: ridge = MAP under Gaussian prior; lasso = MAP under Laplace prior.",
  },
  {
    prompt: "Confidence vs credible intervals:",
    options: [
      "they're the same thing",
      "confidence: $\\ge 95\\%$ of repeated CIs contain $\\theta$; credible: 95% posterior probability $\\theta$ is in the CI given the data",
      "confidence is Bayesian",
      "credible intervals don't exist",
    ],
    correct: 1,
    explanation:
      "Different interpretations. Confidence is about the procedure; credible is about the parameter given this data. For nice problems they often agree numerically but differ philosophically.",
  },
  {
    prompt:
      "For a Gaussian-Gaussian conjugate update, the posterior precision is…",
    options: [
      "$1/\\tau_0^2$",
      "$n/\\sigma^2$",
      "$1/\\tau_0^2 + n/\\sigma^2$ — sum of prior and data precisions",
      "$\\sigma^2/n$",
    ],
    correct: 2,
    explanation:
      "Precisions add. Posterior mean is a precision-weighted average of prior mean and sample mean. As $n \\to \\infty$, the data dominates and the posterior concentrates on $\\bar x$.",
  },
];
