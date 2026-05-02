import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function DiscreteContinuousBody() {
  return (
    <>
      <p>
        A random variable is a function from the sample space
        to <InlineMath math="\mathbb{R}" /> (or{" "}
        <InlineMath math="\mathbb{R}^n" />, or whatever space
        you want). Once we name it, we can ask:{" "}
        <em>what's the distribution of values it takes?</em>{" "}
        This chapter introduces the bestiary of discrete and
        continuous distributions you'll see again and again,
        plus the PMF/CDF/PDF vocabulary, expectation, and
        variance.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Blitzstein & Hwang Ch 3-5",
            author: "Joe Blitzstein, Jessica Hwang",
            duration: "Reading",
            url: "https://projects.iq.harvard.edu/stat110/home",
            note: "Random variables, expectation, variance, common discrete and continuous distributions.",
          },
          {
            title: "Stat 110 — Lectures 5, 6, 12, 13",
            author: "Joe Blitzstein",
            duration: "~3.5h",
            url: "https://projects.iq.harvard.edu/stat110/youtube",
            note: "Random variables, Bernoulli/Binomial, Poisson, Normal.",
          },
          {
            title: "MML Ch 6.4-6.5",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "Statistics summary + the Gaussian distribution in tighter notation.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Random variables</h2>

      <Callout title="Definition · Random variable">
        A <strong>random variable</strong>{" "}
        <InlineMath math="X" /> is a measurable function{" "}
        <InlineMath math="X : \Omega \to \mathbb{R}" />.
        Capital letters for the random variable, lowercase
        for specific values:{" "}
        <InlineMath math="P(X = x)" /> or{" "}
        <InlineMath math="P(X \le x)" />.
      </Callout>

      <p>
        The "measurable" caveat just means the preimages of
        intervals are events you can assign probabilities to.
        For practical purposes: every reasonable function from
        an experiment to a number is a random variable.
      </p>

      <h3>Discrete vs continuous</h3>

      <p>
        A random variable is{" "}
        <strong>discrete</strong> if it takes values in a
        countable set (e.g. integers); it's{" "}
        <strong>continuous</strong> if it takes values in an
        interval and its CDF is continuous (no point masses).
        Some random variables are mixed (continuous with point
        masses); we'll mostly avoid those.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · PMF, PDF, CDF</h2>

      <Callout title="The three functions">
        <ul>
          <li>
            <strong>PMF</strong> (discrete):{" "}
            <InlineMath math="p(x) = P(X = x)" />. Sums to 1.
          </li>
          <li>
            <strong>PDF</strong> (continuous):{" "}
            <InlineMath math="f(x)" />, with{" "}
            <InlineMath math="P(X \in [a, b]) = \int_a^b f(x) \, dx" />.
            Integrates to 1.
          </li>
          <li>
            <strong>CDF</strong> (both):{" "}
            <InlineMath math="F(x) = P(X \le x)" />. Non-
            decreasing, right-continuous,{" "}
            <InlineMath math="F(-\infty) = 0" />,{" "}
            <InlineMath math="F(\infty) = 1" />.
          </li>
        </ul>
      </Callout>

      <Pitfall>
        For continuous random variables,{" "}
        <InlineMath math="P(X = x) = 0" /> for every individual{" "}
        <InlineMath math="x" /> — probability mass is spread
        over intervals, not concentrated at points. The PDF is{" "}
        <em>not</em> a probability; it's a density. Only when
        you integrate it over an interval do you get a
        probability.
      </Pitfall>

      <h3>Relationships</h3>

      <ul>
        <li>
          Discrete:{" "}
          <InlineMath math="F(x) = \sum_{x_i \le x} p(x_i)" />.
        </li>
        <li>
          Continuous:{" "}
          <InlineMath math="F(x) = \int_{-\infty}^x f(t) \, dt" />,
          and{" "}
          <InlineMath math="f(x) = F'(x)" /> wherever{" "}
          <InlineMath math="F" /> is differentiable.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Expectation and variance</h2>

      <Callout title="Definition · Expectation">
        <BlockMath math="E[X] = \sum_x x \, p(x) \quad \text{(discrete)}, \qquad E[X] = \int x \, f(x) \, dx \quad \text{(continuous)}." />
      </Callout>

      <p>
        Expectation is{" "}
        <em>linear</em>: {" "}
        <InlineMath math="E[aX + bY] = a E[X] + b E[Y]" /> for
        any random variables and scalars{" "}
        <em>regardless of whether{" "}
        <InlineMath math="X" /> and{" "}
        <InlineMath math="Y" /> are independent</em>. The
        single most-useful identity in probability.
      </p>

      <h3>Law of the unconscious statistician (LOTUS)</h3>

      <BlockMath math="E[g(X)] = \sum_x g(x) p(x) \quad \text{or} \quad \int g(x) f(x) \, dx." />

      <p>
        You don't need the distribution of{" "}
        <InlineMath math="g(X)" /> to compute its mean — just
        integrate <InlineMath math="g" /> against the
        distribution of <InlineMath math="X" />. Saves
        immense work.
      </p>

      <Callout title="Variance">
        <BlockMath math="\mathrm{Var}(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2." />
      </Callout>

      <p>
        Standard deviation:{" "}
        <InlineMath math="\sigma_X = \sqrt{\mathrm{Var}(X)}" />.
        Variance is in squared units; standard deviation is in
        the same units as <InlineMath math="X" />.
      </p>

      <p>
        Variance properties:
      </p>
      <ul>
        <li>
          <InlineMath math="\mathrm{Var}(aX + b) = a^2 \mathrm{Var}(X)" />.
        </li>
        <li>
          <InlineMath math="\mathrm{Var}(X + Y) = \mathrm{Var}(X) + \mathrm{Var}(Y) + 2\mathrm{Cov}(X, Y)" />.
        </li>
        <li>
          For independent{" "}
          <InlineMath math="X, Y" />:{" "}
          <InlineMath math="\mathrm{Var}(X + Y) = \mathrm{Var}(X) + \mathrm{Var}(Y)" />.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · The discrete bestiary</h2>

      <p>
        Five distributions to recognise on sight:
      </p>

      <h3>Bernoulli</h3>

      <p>
        <InlineMath math="X \sim \mathrm{Bern}(p)" />:{" "}
        <InlineMath math="P(X = 1) = p" />,{" "}
        <InlineMath math="P(X = 0) = 1 - p" />. Models a single
        coin flip with bias{" "}
        <InlineMath math="p" />.
      </p>
      <BlockMath math="E[X] = p, \quad \mathrm{Var}(X) = p(1-p)." />

      <h3>Binomial</h3>

      <p>
        <InlineMath math="X \sim \mathrm{Bin}(n, p)" />: number
        of successes in <InlineMath math="n" /> independent
        Bernoulli(<InlineMath math="p" />) trials.
      </p>
      <BlockMath math="P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad E[X] = np, \quad \mathrm{Var}(X) = np(1-p)." />

      <p>
        Use case: trade fills out of{" "}
        <InlineMath math="n" /> attempted limit orders, A/B
        test conversion counts.
      </p>

      <h3>Geometric</h3>

      <p>
        <InlineMath math="X \sim \mathrm{Geom}(p)" />: number of
        trials until the first success.
      </p>
      <BlockMath math="P(X = k) = (1-p)^{k-1} p, \quad E[X] = 1/p, \quad \mathrm{Var}(X) = (1-p)/p^2." />

      <p>
        <em>Memoryless</em>: if you've waited for{" "}
        <InlineMath math="m" /> trials with no success, the
        distribution of remaining trials is the same as the
        original. Foreshadows the exponential distribution.
      </p>

      <h3>Poisson</h3>

      <p>
        <InlineMath math="X \sim \mathrm{Poisson}(\lambda)" />:
        count of rare events in a fixed interval.
      </p>
      <BlockMath math="P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad E[X] = \mathrm{Var}(X) = \lambda." />

      <p>
        Arises as the limit of{" "}
        <InlineMath math="\mathrm{Bin}(n, \lambda/n)" /> as{" "}
        <InlineMath math="n \to \infty" />. Models order
        arrivals in microstructure (the "homogeneous Poisson"
        baseline), photon counts, web requests.
      </p>

      <h3>Hypergeometric</h3>

      <p>
        Like binomial, but sampling{" "}
        <em>without replacement</em>. Number of "successes"
        when drawing{" "}
        <InlineMath math="k" /> from a pool of{" "}
        <InlineMath math="N" /> with{" "}
        <InlineMath math="K" /> total successes.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · The continuous bestiary</h2>

      <h3>Uniform</h3>

      <p>
        <InlineMath math="X \sim \mathrm{Uniform}(a, b)" />:{" "}
        <InlineMath math="f(x) = 1/(b-a)" /> on{" "}
        <InlineMath math="[a, b]" />.{" "}
        <InlineMath math="E[X] = (a+b)/2" />,{" "}
        <InlineMath math="\mathrm{Var}(X) = (b-a)^2/12" />.
      </p>

      <h3>Exponential</h3>

      <p>
        <InlineMath math="X \sim \mathrm{Exp}(\lambda)" />:{" "}
        <InlineMath math="f(x) = \lambda e^{-\lambda x}" /> on{" "}
        <InlineMath math="[0, \infty)" />.{" "}
        <InlineMath math="E[X] = 1/\lambda" />,{" "}
        <InlineMath math="\mathrm{Var}(X) = 1/\lambda^2" />.
      </p>

      <p>
        Memoryless (continuous version of geometric):{" "}
        <InlineMath math="P(X > s + t \mid X > s) = P(X > t)" />.
        Models inter-arrival times of Poisson events, time
        until next failure, lifetimes of memoryless components.
      </p>

      <h3>Normal (Gaussian)</h3>

      <p>
        <InlineMath math="X \sim N(\mu, \sigma^2)" />:
      </p>
      <BlockMath math="f(x) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\!\left(-\frac{(x - \mu)^2}{2\sigma^2}\right)." />

      <p>
        The most-used continuous distribution. Justified by
        the <strong>Central Limit Theorem</strong> (next
        chapter): sums of independent things tend to be
        Gaussian. <InlineMath math="68\%" />–
        <InlineMath math="95\%" />–
        <InlineMath math="99.7\%" /> rule for{" "}
        <InlineMath math="\pm 1, 2, 3 \sigma" />.
      </p>

      <h3>Standardisation</h3>

      <p>
        If <InlineMath math="X \sim N(\mu, \sigma^2)" />, then{" "}
        <InlineMath math="Z = (X - \mu)/\sigma \sim N(0, 1)" /> —
        the <em>standard normal</em>. CDF{" "}
        <InlineMath math="\Phi(z)" />, density{" "}
        <InlineMath math="\phi(z) = (2\pi)^{-1/2} e^{-z^2/2}" />.
        Tabulated and built into every numerical library.
      </p>

      <h3>Other workhorses</h3>

      <ul>
        <li>
          <strong>Gamma</strong>: generalises exponential.
          Sums of i.i.d. exponentials are Gamma. Used as a
          conjugate prior for{" "}
          <InlineMath math="\lambda" /> of Poisson.
        </li>
        <li>
          <strong>Beta</strong>: distribution on{" "}
          <InlineMath math="[0, 1]" />. Conjugate prior for
          Bernoulli/Binomial probability.
        </li>
        <li>
          <strong>Chi-squared</strong>: sum of squared
          standard normals. Hypothesis-testing
          (likelihood-ratio).
        </li>
        <li>
          <strong>Student's t</strong>: heavier tails than
          normal. Models small-sample uncertainty;
          robust regression.
        </li>
        <li>
          <strong>Log-normal</strong>:{" "}
          <InlineMath math="\log X \sim N" />. Stock prices in
          Black-Scholes, volume distributions in markets.
        </li>
      </ul>

      <Exercise prompt="A market sends order events as a Poisson process with rate $\lambda = 50$ per second. What's the probability of seeing at least 60 events in a given second?">
        <p>
          <InlineMath math="P(X \ge 60) = 1 - P(X \le 59) = 1 - \sum_{k=0}^{59} \frac{50^k e^{-50}}{k!}" />.
          Numerically about{" "}
          <InlineMath math="0.075" />.
        </p>
        <p>
          For large{" "}
          <InlineMath math="\lambda" />,{" "}
          <InlineMath math="\mathrm{Poisson}(\lambda) \approx N(\lambda, \lambda)" />,
          so a quick estimate is{" "}
          <InlineMath math="P(Z \ge (60 - 50)/\sqrt{50}) = P(Z \ge 1.41) \approx 0.079" />.
          The CLT in action.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Heavy tails</h2>

      <p>
        Real-world distributions in finance and microstructure
        are often heavy-tailed: the probability of extreme
        events decays slower than{" "}
        <InlineMath math="e^{-x}" />. Examples:
      </p>

      <ul>
        <li>
          <strong>Power law</strong>:{" "}
          <InlineMath math="P(X > x) \sim x^{-\alpha}" />.
        </li>
        <li>
          <strong>Pareto</strong>: power-law-tailed with a
          minimum value.
        </li>
        <li>
          <strong>Cauchy</strong>:{" "}
          <InlineMath math="f(x) = \pi^{-1}/(1 + x^2)" />. Mean
          and variance both undefined.
        </li>
        <li>
          <strong>Stable distributions</strong>: generalise
          Gaussian; closed under sums; non-Gaussian stable
          distributions have heavy tails.
        </li>
      </ul>

      <p>
        Equity returns, trade sizes, durations between
        large events — all heavy-tailed. Misusing Gaussian
        models when the underlying is heavy-tailed (e.g.,
        VaR underestimates) is one of the most expensive
        errors in finance.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Recognising distributions</strong>: most
          modelling decisions reduce to "what distribution
          should I use here?" Memorise the bestiary.
        </li>
        <li>
          <strong>MLE and Bayesian inference</strong>: each
          distribution has a likelihood you'll compute
          gradients of; conjugacy makes Bayesian updating
          trivial for many of them (Bernoulli–Beta, Poisson–
          Gamma, Gaussian–Gaussian).
        </li>
        <li>
          <strong>Limit theorems and asymptotics</strong>: when
          do sums become Gaussian? When does scaling preserve
          a distribution? Stable distributions answer those
          questions; CLT (next chapter) is the headline.
        </li>
        <li>
          <strong>Microstructure</strong>: order arrivals
          (Poisson and Hawkes), durations between events
          (exponential and beyond), trade-size and return
          distributions (heavy-tailed). Knowing the right
          family saves you from fitting the wrong model.
        </li>
      </ul>

      <p>
        Next chapter: jointly distributed random variables —
        covariance, correlation, the multivariate normal,
        and the structure that makes regression and PCA
        possible.
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
      "For a continuous random variable $X$ with PDF $f(x)$, $P(X = c) = ?$ for any specific value $c$.",
    options: ["$f(c)$", "$0$", "$1$", "$F(c)$"],
    correct: 1,
    explanation:
      "Continuous distributions assign zero probability to single points; mass is spread over intervals via the PDF. $f(c)$ is a density, not a probability.",
  },
  {
    prompt: "Linearity of expectation: $E[aX + bY]$ equals…",
    options: [
      "$a E[X] b E[Y]$",
      "$a E[X] + b E[Y]$ — independent of whether $X, Y$ are independent",
      "$a E[X] + b E[Y]$, but only when $X, Y$ are independent",
      "$E[X] + E[Y]$",
    ],
    correct: 1,
    explanation:
      "Linearity holds *always*, regardless of dependence. It's the most-used identity in probability — and the one that makes Markov-chain expected hitting times tractable.",
  },
  {
    prompt: "$X \\sim \\mathrm{Poisson}(\\lambda)$. What is $E[X]$?",
    options: ["$\\lambda^2$", "$\\sqrt\\lambda$", "$\\lambda$", "$1/\\lambda$"],
    correct: 2,
    explanation:
      "$E[X] = \\mathrm{Var}(X) = \\lambda$ — equal mean and variance is a Poisson signature. Use it to test 'is this count data Poisson-like?'",
  },
  {
    prompt: "The exponential distribution is memoryless, meaning…",
    options: [
      "it has no parameters",
      "$P(X > s + t \\mid X > s) = P(X > t)$ for all $s, t \\ge 0$",
      "it has infinite mean",
      "it's discrete",
    ],
    correct: 1,
    explanation:
      "Conditioning on having already waited $s$ doesn't change the distribution of remaining wait time. Together with geometric (discrete version), these are the *only* memoryless distributions.",
  },
  {
    prompt: "If $X \\sim N(\\mu, \\sigma^2)$, then $Z = (X - \\mu)/\\sigma$…",
    options: [
      "$\\sim N(\\mu, 1)$",
      "$\\sim N(0, 1)$",
      "$\\sim N(0, \\sigma)$",
      "is uniform",
    ],
    correct: 1,
    explanation:
      "Standardisation: subtract mean, divide by SD. Result is the standard normal $N(0, 1)$, with tabulated CDF $\\Phi$. Used constantly for hypothesis tests and confidence intervals.",
  },
];
