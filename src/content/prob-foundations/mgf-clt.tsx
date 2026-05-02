import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function MgfCltBody() {
  return (
    <>
      <p>
        Two ideas dominate this chapter: <strong>generating
        functions</strong> (a polynomial-style trick that
        encodes a distribution into a single function whose
        derivatives spit out moments) and{" "}
        <strong>limit theorems</strong> (statements about
        what happens to large sums of independent random
        variables). The Central Limit Theorem alone explains
        why Gaussians are everywhere — it's perhaps the most
        consequential single fact in applied probability.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Blitzstein & Hwang Ch 6, 10",
            author: "Joe Blitzstein, Jessica Hwang",
            duration: "Reading",
            url: "https://projects.iq.harvard.edu/stat110/home",
            note: "Moments and MGFs (Ch 6); inequalities and limit theorems (Ch 10).",
          },
          {
            title: "Stat 110 — Lectures 16, 25-29",
            author: "Joe Blitzstein",
            duration: "~5h",
            url: "https://projects.iq.harvard.edu/stat110/youtube",
            note: "MGFs, LLN, CLT, characteristic functions.",
          },
          {
            title: "Wasserman Ch 5",
            author: "Larry Wasserman",
            duration: "Reading",
            url: "https://link.springer.com/book/10.1007/978-0-387-21736-9",
            note: "Convergence concepts in tighter form. Useful prep for Tier V's MLE asymptotics.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Moments</h2>

      <Callout title="Definition · Moments">
        The <InlineMath math="k" />th{" "}
        <strong>moment</strong> of{" "}
        <InlineMath math="X" /> is{" "}
        <InlineMath math="E[X^k]" />. The{" "}
        <InlineMath math="k" />th{" "}
        <strong>central moment</strong> is{" "}
        <InlineMath math="E[(X - \mu)^k]" /> with{" "}
        <InlineMath math="\mu = E[X]" />.
      </Callout>

      <p>
        First moment: mean. Second central moment: variance.
        Third central moment scaled by{" "}
        <InlineMath math="\sigma^3" />: skewness. Fourth
        central moment scaled by{" "}
        <InlineMath math="\sigma^4" />: kurtosis (heavy-tailed
        ⇔ high kurtosis).
      </p>

      <p>
        Moments characterise the distribution — usually. Two
        distributions with all the same moments are typically
        equal, but not always (heavy-tailed counterexamples
        exist; the lognormal famously has the same moments as
        a related distribution but is not determined by them).
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Moment generating functions</h2>

      <Callout title="Definition · MGF">
        <BlockMath math="M_X(t) = E[e^{tX}]" />
        whenever the expectation exists in a neighbourhood of{" "}
        <InlineMath math="t = 0" />.
      </Callout>

      <p>
        The trick: differentiating{" "}
        <InlineMath math="M_X" /> at{" "}
        <InlineMath math="t = 0" /> generates moments.
      </p>
      <BlockMath math="\frac{d^k}{dt^k} M_X(t) \bigg|_{t=0} = E[X^k]." />

      <p>
        Why? Expand{" "}
        <InlineMath math="e^{tX} = 1 + tX + t^2 X^2/2! + \dots" />,
        take expectation, differentiate. All moments fall out.
      </p>

      <h3>Three uniqueness/sum properties</h3>

      <ul>
        <li>
          <strong>Uniqueness</strong>: if{" "}
          <InlineMath math="M_X = M_Y" /> in a neighbourhood
          of zero, then{" "}
          <InlineMath math="X" /> and{" "}
          <InlineMath math="Y" /> have the same distribution.
        </li>
        <li>
          <strong>Sums</strong>: for independent{" "}
          <InlineMath math="X, Y" />,{" "}
          <InlineMath math="M_{X+Y}(t) = M_X(t) M_Y(t)" />.
          Sums become products in MGF-land — convolution
          becomes multiplication.
        </li>
        <li>
          <strong>Linear scaling</strong>:{" "}
          <InlineMath math="M_{aX + b}(t) = e^{bt} M_X(at)" />.
        </li>
      </ul>

      <h3>MGF examples</h3>

      <ul>
        <li>
          Bernoulli(<InlineMath math="p" />):{" "}
          <InlineMath math="M(t) = 1 - p + p e^t" />.
        </li>
        <li>
          Binomial(<InlineMath math="n, p" />):{" "}
          <InlineMath math="M(t) = (1 - p + p e^t)^n" /> —
          product of <InlineMath math="n" /> independent
          Bernoulli MGFs.
        </li>
        <li>
          Poisson(<InlineMath math="\lambda" />):{" "}
          <InlineMath math="M(t) = e^{\lambda(e^t - 1)}" />.
        </li>
        <li>
          Normal(<InlineMath math="\mu, \sigma^2" />):{" "}
          <InlineMath math="M(t) = \exp(\mu t + \sigma^2 t^2/2)" />.
        </li>
        <li>
          Exponential(<InlineMath math="\lambda" />):{" "}
          <InlineMath math="M(t) = \lambda/(\lambda - t)" /> for{" "}
          <InlineMath math="t < \lambda" />.
        </li>
      </ul>

      <Exercise prompt="Use MGFs to show that the sum of two independent $\mathrm{Poisson}(\lambda_1)$ and $\mathrm{Poisson}(\lambda_2)$ is $\mathrm{Poisson}(\lambda_1 + \lambda_2)$.">
        <p>
          MGF of the sum:
        </p>
        <BlockMath math="M_{X_1 + X_2}(t) = M_{X_1}(t) M_{X_2}(t) = e^{\lambda_1(e^t - 1)} e^{\lambda_2(e^t - 1)} = e^{(\lambda_1 + \lambda_2)(e^t - 1)}." />
        <p>
          By the uniqueness property, the sum has the MGF of a{" "}
          <InlineMath math="\mathrm{Poisson}(\lambda_1 + \lambda_2)" />.
          ∎
        </p>
      </Exercise>

      <Pitfall>
        Some heavy-tailed distributions (Cauchy, stable
        non-Gaussians) don't have MGFs at all. The{" "}
        <strong>characteristic function</strong>{" "}
        <InlineMath math="\varphi_X(t) = E[e^{itX}]" /> always
        exists and serves the same role. Used for Hawkes
        processes (Tier VII) and option pricing in finance.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Inequalities</h2>

      <p>
        Three core probability inequalities. Each gives bounds
        on tail probabilities in terms of moments.
      </p>

      <Callout title="Markov's inequality">
        For non-negative <InlineMath math="X" /> and{" "}
        <InlineMath math="a > 0" />:
        <BlockMath math="P(X \ge a) \le \frac{E[X]}{a}." />
      </Callout>

      <Callout title="Chebyshev's inequality">
        For any <InlineMath math="X" /> with finite variance:
        <BlockMath math="P(|X - \mu| \ge k\sigma) \le \frac{1}{k^2}." />
      </Callout>

      <Callout title="Hoeffding's inequality">
        For independent{" "}
        <InlineMath math="X_i \in [a_i, b_i]" /> and{" "}
        <InlineMath math="\bar X = \tfrac{1}{n}\sum X_i" />:
        <BlockMath math="P(|\bar X - E[\bar X]| \ge t) \le 2 \exp\!\left(-\frac{2 n^2 t^2}{\sum (b_i - a_i)^2}\right)." />
      </Callout>

      <p>
        Hoeffding gives <em>exponential</em> tail bounds for
        averages of bounded random variables — often the
        right tool when CLT-type approximations need finite-
        sample backing.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Convergence concepts</h2>

      <p>
        Limit theorems require precise notions of "convergence
        of random variables." Three flavours, in increasing
        strength:
      </p>

      <ul>
        <li>
          <strong>In distribution</strong> (
          <InlineMath math="\xrightarrow{d}" />): CDFs
          converge at every continuity point.
        </li>
        <li>
          <strong>In probability</strong> (
          <InlineMath math="\xrightarrow{P}" />):{" "}
          <InlineMath math="P(|X_n - X| > \varepsilon) \to 0" />{" "}
          for every <InlineMath math="\varepsilon" />.
        </li>
        <li>
          <strong>Almost sure</strong> (
          <InlineMath math="\xrightarrow{a.s.}" />):{" "}
          <InlineMath math="P(\lim X_n = X) = 1" />.
        </li>
      </ul>

      <p>
        Almost sure ⇒ in probability ⇒ in distribution. The
        reverse implications fail in general; under
        additional structure they often hold.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Law of Large Numbers</h2>

      <Callout title="Weak Law of Large Numbers (WLLN)">
        For iid <InlineMath math="X_1, \dots, X_n" /> with{" "}
        <InlineMath math="E[X_i] = \mu" />:
        <BlockMath math="\bar X_n \xrightarrow{P} \mu \quad \text{as } n \to \infty." />
      </Callout>

      <Callout title="Strong Law of Large Numbers (SLLN)">
        Same setting, stronger conclusion:{" "}
        <InlineMath math="\bar X_n \xrightarrow{a.s.} \mu" />.
      </Callout>

      <p>
        Sample averages converge to population means. This is
        the entire justification for empirical estimation in
        statistics — flip a coin many times, the proportion of
        heads converges to{" "}
        <InlineMath math="P(H)" />. Every Monte Carlo
        simulation, every bootstrap procedure rests on the
        LLN.
      </p>

      <p>
        Quick proof of WLLN via Chebyshev: if{" "}
        <InlineMath math="\mathrm{Var}(X_i) = \sigma^2 < \infty" />,
        then{" "}
        <InlineMath math="\mathrm{Var}(\bar X_n) = \sigma^2/n" />{" "}
        and Chebyshev gives{" "}
        <InlineMath math="P(|\bar X_n - \mu| \ge \varepsilon) \le \sigma^2/(n\varepsilon^2) \to 0" />.

      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Central Limit Theorem</h2>

      <Callout title="Central Limit Theorem (CLT)">
        For iid <InlineMath math="X_1, \dots, X_n" /> with{" "}
        <InlineMath math="E[X_i] = \mu" /> and{" "}
        <InlineMath math="\mathrm{Var}(X_i) = \sigma^2 < \infty" />:
        <BlockMath math="\sqrt n \, \frac{\bar X_n - \mu}{\sigma} \xrightarrow{d} N(0, 1)." />
      </Callout>

      <p>
        Sums of iid random variables, properly centred and
        scaled, converge in distribution to a standard normal.
        This is the reason Gaussians appear everywhere — even
        when the underlying noise sources are not Gaussian, an
        average of many of them effectively is.
      </p>

      <h3>Sketch of the MGF proof</h3>

      <p>
        For the standardised variable{" "}
        <InlineMath math="Z_n = \sqrt n (\bar X_n - \mu)/\sigma" />,
        Taylor-expand the MGF and show it converges to{" "}
        <InlineMath math="e^{t^2/2}" />, the MGF of{" "}
        <InlineMath math="N(0, 1)" />. By uniqueness of MGFs,{" "}
        <InlineMath math="Z_n \to N(0, 1)" /> in distribution.
        See Blitzstein Ch 10 for the full version.
      </p>

      <h3>Generalisations</h3>

      <ul>
        <li>
          <strong>Multivariate CLT</strong>: averages of iid
          vectors converge to multivariate normal.
        </li>
        <li>
          <strong>Lindeberg / Lyapunov</strong>: drop the iid
          assumption; sufficient regularity conditions still
          give CLT.
        </li>
        <li>
          <strong>Stable distributions</strong>: when
          variance is infinite (heavy-tailed sums), the limit
          is a non-Gaussian stable distribution. Drives the
          "fat-tailed CLT" results in finance.
        </li>
      </ul>

      <Pitfall>
        CLT is an <em>asymptotic</em> result. For small{" "}
        <InlineMath math="n" />, the tail behaviour of{" "}
        <InlineMath math="\bar X_n" /> may differ noticeably
        from Gaussian. Berry–Esseen tightens the speed of
        convergence (
        <InlineMath math="O(1/\sqrt n)" /> in the Kolmogorov
        distance) and is the right tool for practical CLT
        bounds.
      </Pitfall>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Markov chains, briefly</h2>

      <p>
        Beyond iid, Markov chains are the next layer of
        complexity. A sequence{" "}
        <InlineMath math="X_1, X_2, \dots" /> is{" "}
        <strong>Markov</strong> if{" "}
        <InlineMath math="P(X_{n+1} \mid X_n, X_{n-1}, \dots) = P(X_{n+1} \mid X_n)" />{" "}
        — only the present matters.
      </p>

      <p>
        Most of the LLN/CLT machinery extends to Markov
        chains under mild conditions (irreducibility,
        aperiodicity, finite state space). The "ergodic
        theorem" plays the role of the LLN, and a CLT for
        Markov chains exists. Applications: MCMC (sampling
        from posteriors), queueing models, page-rank, regime
        switching in macroeconomic time series.
      </p>

      <p>
        In Tier II we used the spectral gap to characterise
        how fast a Markov chain mixes. Now we have the
        probabilistic vocabulary to make the same statement
        rigorously: time-averages along a single sample path
        converge (almost surely) to the stationary
        distribution's expectation, and properly normalised
        deviations are asymptotically Gaussian.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>MGFs and characteristic functions</strong>:
          machinery for working with sums of independent
          random variables. Hawkes-process intensities and
          option-pricing formulas in finance use them
          extensively.
        </li>
        <li>
          <strong>LLN and CLT</strong>: the foundations of
          inference. Confidence intervals, hypothesis tests,
          bootstrap, Monte Carlo — all rely on these limit
          theorems.
        </li>
        <li>
          <strong>Concentration inequalities</strong>:
          Hoeffding and friends are the tools of modern
          high-dimensional statistics and online learning.
        </li>
        <li>
          <strong>Microstructure</strong>: diffusion limits of
          order-flow processes (Cont's work) are CLT-type
          results. Square-root impact emerges as a CLT-flavoured
          aggregation of many small, individual order
          contributions to price.
        </li>
      </ul>

      <p>
        Tier IV is now complete. We have the language and
        tools of probability. Tier V picks up{" "}
        <em>statistical inference</em>: given data, how do we
        estimate parameters, quantify uncertainty, and test
        hypotheses?
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
      "The MGF $M_X(t) = E[e^{tX}]$ is useful because…",
    options: [
      "it equals the CDF",
      "its derivatives at $t = 0$ generate the moments of $X$",
      "it's always defined",
      "it characterises only normal distributions",
    ],
    correct: 1,
    explanation:
      "$d^k M / dt^k|_{t=0} = E[X^k]$. Plus uniqueness (same MGF ⇒ same distribution) and the multiplication rule for sums of independents make it a powerful algebraic tool.",
  },
  {
    prompt:
      "For independent $X, Y$, $M_{X+Y}(t) = ?$",
    options: [
      "$M_X(t) + M_Y(t)$",
      "$M_X(t) M_Y(t)$",
      "$M_X(t) - M_Y(t)$",
      "$M_X(t)^2$",
    ],
    correct: 1,
    explanation:
      "Convolution of densities = multiplication of MGFs. Used to verify, e.g., that the sum of independent Poissons is Poisson.",
  },
  {
    prompt:
      "The Weak Law of Large Numbers says…",
    options: [
      "$\\bar X_n \\to \\mu$ in distribution",
      "$\\bar X_n \\to \\mu$ in probability",
      "$\\bar X_n \\to \\mu$ almost surely",
      "$\\bar X_n$ is exactly $\\mu$",
    ],
    correct: 1,
    explanation:
      "WLLN: convergence in probability. SLLN: convergence almost surely (a stronger statement). Both require iid + finite mean. The proof via Chebyshev is the classical first step.",
  },
  {
    prompt:
      "The Central Limit Theorem says, for iid $X_i$ with finite variance…",
    options: [
      "$\\bar X_n$ is exactly Gaussian for any $n$",
      "$\\sqrt n (\\bar X_n - \\mu)/\\sigma \\xrightarrow{d} N(0, 1)$",
      "$\\bar X_n$ is uniform",
      "$X_i$ must be Gaussian",
    ],
    correct: 1,
    explanation:
      "Properly centred and scaled, the sample mean converges in distribution to the standard normal, regardless of the underlying distribution (as long as variance is finite).",
  },
  {
    prompt:
      "Hoeffding's inequality bounds the tail of $\\bar X_n$ for bounded variables. The bound decays as…",
    options: [
      "$O(1/n)$",
      "exponentially in $n$ — much faster than $1/n$",
      "$O(\\log n)$",
      "no decay",
    ],
    correct: 1,
    explanation:
      "Exponential concentration: $P(|\\bar X_n - E[\\bar X_n]| \\ge t) \\le 2 \\exp(-2 n^2 t^2 / \\sum (b_i - a_i)^2)$. Much tighter than Chebyshev's $O(1/n)$ bound, when bounded support applies.",
  },
];
