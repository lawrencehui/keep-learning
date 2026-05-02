import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function MleBody() {
  return (
    <>
      <p>
        Estimation is the inverse of probability: probability
        predicts data given a model; estimation guesses the
        model given data. Maximum likelihood is the dominant
        estimation principle —{" "}
        <em>pick the parameters that make the observed data
        most likely</em>. Almost every classical and modern
        statistical method is a special case or extension of
        MLE.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Wasserman Ch 9",
            author: "Larry Wasserman",
            duration: "Reading",
            url: "https://link.springer.com/book/10.1007/978-0-387-21736-9",
            note: "Parametric inference and MLE in tight notation.",
          },
          {
            title: "Murphy PML Ch 4",
            author: "Kevin Murphy",
            duration: "Reading",
            url: "https://probml.github.io/pml-book/book1.html",
            note: "Statistical inference with a probabilistic-ML flavour.",
          },
          {
            title: "MML Ch 8.2",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "Parameter estimation with model evidence and continuous-output examples.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The likelihood function</h2>

      <Callout title="Definition">
        Suppose <InlineMath math="X_1, \dots, X_n" /> are
        iid samples from a parametric model{" "}
        <InlineMath math="p(x \mid \theta)" />. The{" "}
        <strong>likelihood</strong> is
        <BlockMath math="L(\theta) = \prod_{i=1}^n p(x_i \mid \theta)." />
        The <strong>log-likelihood</strong> is
        <BlockMath math="\ell(\theta) = \log L(\theta) = \sum_{i=1}^n \log p(x_i \mid \theta)." />
      </Callout>

      <p>
        Read it carefully: the data{" "}
        <InlineMath math="x_i" /> are{" "}
        <em>fixed</em>; the parameter{" "}
        <InlineMath math="\theta" /> is the variable. We sweep{" "}
        <InlineMath math="\theta" /> across its admissible
        range and pick the value that maximises the
        likelihood.
      </p>

      <Pitfall>
        The likelihood is{" "}
        <em>not</em> a probability density over{" "}
        <InlineMath math="\theta" />. It is a function of{" "}
        <InlineMath math="\theta" /> for fixed data. Treating
        it as a posterior is the cardinal sin that distinguishes
        Bayesian from frequentist inference — Bayesians put a
        prior on{" "}
        <InlineMath math="\theta" /> and turn the likelihood
        into a posterior; frequentists don't.
      </Pitfall>

      <h3>Why log-likelihood?</h3>

      <p>
        Three reasons to take logs:
      </p>
      <ul>
        <li>
          Products become sums — calculus is much easier.
        </li>
        <li>
          Numerical stability — products of many small
          probabilities underflow; sums of log-probs do not.
        </li>
        <li>
          The maximiser is the same: log is monotone increasing.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The MLE</h2>

      <Callout title="Definition · MLE">
        <BlockMath math="\hat{\theta}_{\mathrm{MLE}} = \arg\max_\theta \ell(\theta) = \arg\max_\theta L(\theta)." />
      </Callout>

      <p>
        Mechanically: differentiate{" "}
        <InlineMath math="\ell(\theta)" />, set to zero, solve
        for <InlineMath math="\theta" />, check that you found
        a maximum (not a saddle or minimum). For multi-parameter
        problems, the gradient must vanish and the Hessian must
        be negative-definite.
      </p>

      <h3>Worked example: Bernoulli</h3>

      <p>
        Data:{" "}
        <InlineMath math="X_1, \dots, X_n \stackrel{\text{iid}}{\sim} \mathrm{Bern}(p)" />.
        Number of successes:{" "}
        <InlineMath math="k = \sum X_i" />.
      </p>
      <BlockMath math="L(p) = p^k (1-p)^{n-k}, \qquad \ell(p) = k \log p + (n-k) \log(1-p)." />

      <p>
        Differentiate:
      </p>
      <BlockMath math="\frac{d\ell}{dp} = \frac{k}{p} - \frac{n-k}{1-p} = 0 \implies \hat p_{\mathrm{MLE}} = k/n = \bar X." />

      <p>
        The MLE for the success probability is the sample
        proportion. Reassuring.
      </p>

      <h3>Worked example: Normal</h3>

      <p>
        Data:{" "}
        <InlineMath math="X_i \sim N(\mu, \sigma^2)" />, both
        unknown.
      </p>
      <BlockMath math="\ell(\mu, \sigma^2) = -\frac{n}{2} \log(2\pi\sigma^2) - \frac{1}{2\sigma^2} \sum (x_i - \mu)^2." />

      <p>
        Setting partials to zero:
      </p>
      <BlockMath math="\hat \mu_{\mathrm{MLE}} = \bar x, \qquad \hat \sigma^2_{\mathrm{MLE}} = \frac{1}{n} \sum (x_i - \bar x)^2." />

      <p>
        Sample mean and (biased) sample variance. The
        unbiased version uses{" "}
        <InlineMath math="1/(n-1)" />; that's a separate
        choice based on a different criterion (unbiasedness)
        rather than MLE.
      </p>

      <Exercise prompt="Find the MLE for $\lambda$ given iid Exponential data $X_1, \dots, X_n$.">
        <p>
          PDF:{" "}
          <InlineMath math="f(x \mid \lambda) = \lambda e^{-\lambda x}" />.
          Log-likelihood:{" "}
          <InlineMath math="\ell(\lambda) = n \log \lambda - \lambda \sum x_i" />.
        </p>
        <p>
          Derivative:{" "}
          <InlineMath math="d\ell/d\lambda = n/\lambda - \sum x_i = 0" />,
          so{" "}
          <InlineMath math="\hat \lambda_{\mathrm{MLE}} = n / \sum x_i = 1 / \bar x" />.
          The reciprocal of the sample mean — sensible, given
          that{" "}
          <InlineMath math="E[X] = 1/\lambda" />.
        </p>
      </Exercise>

      <h3>Worked example: linear regression</h3>

      <p>
        Recap from Tier III: assume{" "}
        <InlineMath math="y_i = \mathbf{x}_i^T \boldsymbol\beta + \varepsilon_i" />,{" "}
        <InlineMath math="\varepsilon_i \sim N(0, \sigma^2)" />.
        The MLE for{" "}
        <InlineMath math="\boldsymbol\beta" /> is the OLS
        estimator. The MLE for{" "}
        <InlineMath math="\sigma^2" /> is{" "}
        <InlineMath math="\frac{1}{n} \sum (y_i - \mathbf{x}_i^T \hat{\boldsymbol\beta})^2" />.
      </p>

      <p>
        So OLS is a special case of MLE under Gaussian noise —
        and ridge / lasso are MAP under Gaussian / Laplace
        priors (Chapter 4). The unification is one of the
        most beautiful results in classical statistics.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Properties of the MLE</h2>

      <p>
        Three asymptotic properties hold for "well-behaved"
        models (regular parametric families). They explain
        why MLE is so dominant.
      </p>

      <Callout title="Three asymptotic properties">
        <ul>
          <li>
            <strong>Consistency</strong>:{" "}
            <InlineMath math="\hat\theta_{\mathrm{MLE}} \xrightarrow{P} \theta_0" />{" "}
            as <InlineMath math="n \to \infty" />.
          </li>
          <li>
            <strong>Asymptotic normality</strong>:{" "}
            <InlineMath math="\sqrt n (\hat\theta_{\mathrm{MLE}} - \theta_0) \xrightarrow{d} N(0, I(\theta_0)^{-1})" />.
          </li>
          <li>
            <strong>Asymptotic efficiency</strong>: among
            unbiased estimators, MLE attains the Cramér–Rao
            lower bound asymptotically. Best possible
            variance.
          </li>
        </ul>
      </Callout>

      <p>
        Here{" "}
        <InlineMath math="I(\theta)" /> is the Fisher
        information (Chapter 2). The asymptotic normality
        result is the foundation for Wald confidence intervals
        and Wald hypothesis tests.
      </p>

      <h3>Functional invariance</h3>

      <p>
        If{" "}
        <InlineMath math="\hat\theta" /> is the MLE of{" "}
        <InlineMath math="\theta" /> and{" "}
        <InlineMath math="g" /> is any function, then{" "}
        <InlineMath math="g(\hat\theta)" /> is the MLE of{" "}
        <InlineMath math="g(\theta)" />. So if you have the
        MLE of{" "}
        <InlineMath math="\sigma^2" />, you have the MLE of{" "}
        <InlineMath math="\sigma" /> (just take the square root).
        Convenient — and unique to MLE; doesn't hold for, say,
        unbiased estimators.
      </p>

      <h3>What goes wrong</h3>

      <p>
        Caveats to the asymptotic results:
      </p>
      <ul>
        <li>
          <strong>Boundary problems</strong>: if{" "}
          <InlineMath math="\theta_0" /> is on the boundary
          of the parameter space, asymptotic normality fails.
        </li>
        <li>
          <strong>Non-regular models</strong>: distributions
          whose support depends on the parameter (e.g.,{" "}
          <InlineMath math="\mathrm{Uniform}(0, \theta)" />)
          break the standard MLE theory.
        </li>
        <li>
          <strong>Identifiability</strong>: if two different{" "}
          <InlineMath math="\theta" />s give the same
          likelihood, there's no hope of estimating either
          uniquely. Common in mixture models and
          factor models with rotational symmetry.
        </li>
        <li>
          <strong>Small samples</strong>: asymptotic results
          require{" "}
          <InlineMath math="n \to \infty" />. For small{" "}
          <InlineMath math="n" />, MLE can be biased and its
          distribution far from Gaussian.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Method of moments</h2>

      <p>
        An older alternative to MLE. Match{" "}
        <InlineMath math="k" /> theoretical moments to{" "}
        <InlineMath math="k" /> sample moments and solve for
        the <InlineMath math="k" /> parameters.
      </p>

      <h3>Example</h3>

      <p>
        For Gamma(<InlineMath math="\alpha, \beta" />):{" "}
        <InlineMath math="E[X] = \alpha/\beta" />,{" "}
        <InlineMath math="\mathrm{Var}(X) = \alpha/\beta^2" />.
        Match to <InlineMath math="\bar x" /> and{" "}
        <InlineMath math="s^2" />:
      </p>
      <BlockMath math="\bar x = \alpha/\beta, \quad s^2 = \alpha/\beta^2 \implies \hat\beta = \bar x/s^2, \quad \hat\alpha = \bar x^2/s^2." />

      <p>
        Easy. Often less efficient than MLE (larger
        asymptotic variance), so MLE is preferred when the
        likelihood is tractable. Method of moments survives
        as a quick first guess and as a starting point for
        iterative MLE solvers.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Numerical optimisation of likelihood</h2>

      <p>
        Many MLE problems have no closed form. The
        log-likelihood is non-quadratic, gradient-zero
        equations don't yield to algebra. We optimise
        numerically:
      </p>

      <ul>
        <li>
          <strong>Newton–Raphson</strong>: use Hessian for
          quadratic convergence. Standard for GLM (logistic
          regression, Poisson regression).
        </li>
        <li>
          <strong>Fisher scoring</strong>: replace the
          observed Hessian with its expectation (Fisher
          information). Sometimes more stable.
        </li>
        <li>
          <strong>EM algorithm</strong>: for latent-variable
          models (mixtures, HMMs). Iterate "estimate latents
          given parameters" and "estimate parameters given
          latents". Always increases the likelihood.
        </li>
        <li>
          <strong>Stochastic gradient ascent</strong>: scale
          to massive datasets; subsample at each step.
          Underlies modern deep learning.
        </li>
      </ul>

      <Pitfall>
        Many likelihood functions have local maxima. Newton-
        Raphson without restarts can converge to a local
        max. Multiple-start optimisation is the practical
        defence. Modern Bayesian variational methods often
        sidestep this with smarter exploration.
      </Pitfall>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>The unifying inferential principle</strong>:
          OLS, logistic regression, GLMs, Poisson regression,
          Cox proportional hazards, Hawkes-process kernels —
          all are MLE under specific likelihoods.
        </li>
        <li>
          <strong>Asymptotic standard errors</strong>: from
          Fisher information you immediately get confidence
          intervals and Wald tests.
        </li>
        <li>
          <strong>Modern ML</strong>: training a neural
          network minimises NLL, which is exactly the MLE
          principle in disguise.
        </li>
        <li>
          <strong>Microstructure preview</strong>: Hawkes
          process intensities are estimated via MLE; the
          Cramér–Rao lower bound (next chapter) sets the
          floor on how precisely we can estimate the
          branching ratio.
        </li>
      </ul>

      <p>
        Next chapter: Fisher information and the Cramér–Rao
        bound — the quantitative companion to MLE.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt: "The likelihood $L(\\theta)$ is…",
    options: [
      "the prior over $\\theta$",
      "the joint density of the data, viewed as a function of $\\theta$ for fixed data",
      "the posterior over $\\theta$",
      "always uniform",
    ],
    correct: 1,
    explanation:
      "Same algebraic object as the joint density, but interpreted differently: $\\theta$ varies, data is fixed. Critically, it is *not* a probability distribution over $\\theta$.",
  },
  {
    prompt:
      "MLE for iid $X_i \\sim N(\\mu, \\sigma^2)$ gives $\\hat\\sigma^2 = ?$",
    options: [
      "$\\frac{1}{n} \\sum (x_i - \\bar x)^2$",
      "$\\frac{1}{n - 1} \\sum (x_i - \\bar x)^2$",
      "$\\bar x$",
      "$1$",
    ],
    correct: 0,
    explanation:
      "MLE divides by $n$. The unbiased estimator divides by $n - 1$. Different criteria, different answers — both are reasonable for different goals.",
  },
  {
    prompt: "Functional invariance of MLE means…",
    options: [
      "$\\hat\\theta$ doesn't depend on the data",
      "$g(\\hat\\theta_{\\mathrm{MLE}}) = \\widehat{g(\\theta)}_{\\mathrm{MLE}}$",
      "MLE always gives unbiased estimates",
      "MLE doesn't depend on $n$",
    ],
    correct: 1,
    explanation:
      "If you have the MLE of $\\theta$, you have the MLE of any function of $\\theta$. Doesn't hold for unbiased estimators (a famous gotcha for $\\hat\\sigma$).",
  },
  {
    prompt:
      "Asymptotic normality of MLE: $\\sqrt n (\\hat\\theta - \\theta_0) \\to ?$",
    options: [
      "0",
      "$N(0, I(\\theta_0)^{-1})$",
      "$\\theta_0$",
      "$N(0, 1)$",
    ],
    correct: 1,
    explanation:
      "Asymptotic variance is the inverse of Fisher information. This is what powers Wald confidence intervals and asymptotic standard errors. Holds under regularity conditions.",
  },
  {
    prompt: "Why use log-likelihood instead of likelihood?",
    options: [
      "logs change the maximiser",
      "products of probabilities underflow numerically; logs convert to sums and stay numerically stable",
      "logs make the answer biased",
      "logs are required for Bayesian inference",
    ],
    correct: 1,
    explanation:
      "Maximiser unchanged (log is monotone), products → sums (calculus easier), and underflow avoided. Three wins, no downsides.",
  },
];
