import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function HypothesisTestingBody() {
  return (
    <>
      <p>
        Hypothesis testing is the formal procedure for
        deciding "is this effect real, or did we just see a
        random fluctuation?" The vocabulary —{" "}
        <InlineMath math="H_0" />, p-values, Type I and II
        errors, power — is sometimes confused even by trained
        scientists. This chapter lays out the framework,
        the most common tests, and the bootstrap as a
        non-parametric alternative for confidence intervals.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Wasserman Ch 10",
            author: "Larry Wasserman",
            duration: "Reading",
            url: "https://link.springer.com/book/10.1007/978-0-387-21736-9",
            note: "Hypothesis testing and p-values, Wald and likelihood-ratio tests, the bootstrap.",
          },
          {
            title: "Murphy PML Ch 4.6",
            author: "Kevin Murphy",
            duration: "Reading",
            url: "https://probml.github.io/pml-book/book1.html",
            note: "Frequentist tests with Bayesian commentary.",
          },
          {
            title: "Statistical Rethinking — McElreath",
            author: "Richard McElreath",
            duration: "Reading",
            url: "https://xcelab.net/rm/statistical-rethinking/",
            note: "Strong critique of mechanical p-value usage; useful counterweight.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The framework</h2>

      <p>
        The setup:
      </p>

      <ul>
        <li>
          <strong>Null hypothesis</strong>{" "}
          <InlineMath math="H_0" />: the "no effect" or
          "default" model. Often a specific value of the
          parameter (e.g.{" "}
          <InlineMath math="\theta = 0" />).
        </li>
        <li>
          <strong>Alternative hypothesis</strong>{" "}
          <InlineMath math="H_1" />: the rival model. May be
          one-sided ({" "}
          <InlineMath math="\theta > 0" />) or two-sided ({" "}
          <InlineMath math="\theta \ne 0" />).
        </li>
        <li>
          <strong>Test statistic</strong>{" "}
          <InlineMath math="T(X)" />: a function of the data
          that is large when{" "}
          <InlineMath math="H_1" /> is true.
        </li>
        <li>
          <strong>Rejection region</strong>{" "}
          <InlineMath math="R" />: the set of values of{" "}
          <InlineMath math="T" /> for which we reject{" "}
          <InlineMath math="H_0" />.
        </li>
      </ul>

      <Callout title="Two error types">
        <ul>
          <li>
            <strong>Type I (false positive)</strong>: reject{" "}
            <InlineMath math="H_0" /> when it's true.
            Probability:{" "}
            <InlineMath math="\alpha" /> (the "significance
            level", usually 0.05).
          </li>
          <li>
            <strong>Type II (false negative)</strong>: fail to
            reject <InlineMath math="H_0" /> when{" "}
            <InlineMath math="H_1" /> is true. Probability:{" "}
            <InlineMath math="\beta" />.
          </li>
        </ul>
        Power <InlineMath math="= 1 - \beta" />, the
        probability of correctly rejecting{" "}
        <InlineMath math="H_0" />.
      </Callout>

      <p>
        Designing a test is choosing how to balance{" "}
        <InlineMath math="\alpha" /> and{" "}
        <InlineMath math="\beta" />. The Neyman–Pearson lemma
        says: for fixed{" "}
        <InlineMath math="\alpha" />, the most powerful test
        for a simple alternative is the likelihood-ratio test
        (Part 4).
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · p-values</h2>

      <Callout title="Definition">
        The <strong>p-value</strong> is the probability,
        assuming <InlineMath math="H_0" /> is true, of
        observing a test statistic at least as extreme as the
        one observed.
        <BlockMath math="p = P(T(X) \ge T_{\mathrm{obs}} \mid H_0)." />
      </Callout>

      <p>
        Decision rule:
      </p>
      <ul>
        <li>
          <InlineMath math="p \le \alpha" /> ⇒ reject{" "}
          <InlineMath math="H_0" /> (the test rejects).
        </li>
        <li>
          <InlineMath math="p > \alpha" /> ⇒ fail to reject{" "}
          <InlineMath math="H_0" /> (the test fails to find
          evidence against it).
        </li>
      </ul>

      <Pitfall>
        A small p-value is{" "}
        <em>not</em>{" "}
        <InlineMath math="P(H_0 \text{ true} \mid \text{data})" />.
        That conflation is rampant; it's a fundamental
        misunderstanding of frequentist inference. The
        Bayesian posterior probability of{" "}
        <InlineMath math="H_0" /> requires a prior — Bayes'
        theorem is{" "}
        <em>not</em> the same as a p-value.
      </Pitfall>

      <h3>The "absence of evidence" problem</h3>

      <p>
        <em>Failure to reject</em>{" "}
        <InlineMath math="H_0" /> doesn't mean{" "}
        <InlineMath math="H_0" /> is true — it means the test
        had insufficient power to detect a real effect. Always
        report effect sizes and confidence intervals
        alongside p-values.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Common tests</h2>

      <h3>z-test (mean of normal, known variance)</h3>

      <p>
        Test{" "}
        <InlineMath math="H_0 : \mu = \mu_0" /> with known{" "}
        <InlineMath math="\sigma^2" />:
      </p>
      <BlockMath math="Z = \frac{\bar X - \mu_0}{\sigma / \sqrt n} \sim N(0, 1) \text{ under } H_0." />

      <p>
        Reject when{" "}
        <InlineMath math="|Z| > z_{\alpha/2}" />. Two-sided
        p-value:{" "}
        <InlineMath math="p = 2(1 - \Phi(|Z|))" />.
      </p>

      <h3>t-test (mean, unknown variance)</h3>

      <p>
        Same hypothesis, but{" "}
        <InlineMath math="\sigma^2" /> estimated from data:
      </p>
      <BlockMath math="T = \frac{\bar X - \mu_0}{s/\sqrt n} \sim t_{n-1} \text{ under } H_0," />

      <p>
        where{" "}
        <InlineMath math="s^2" /> is the sample variance and{" "}
        <InlineMath math="t_{n-1}" /> is Student's t-distribution
        with <InlineMath math="n - 1" /> degrees of freedom.
        The t-distribution converges to standard normal as{" "}
        <InlineMath math="n" /> grows; for{" "}
        <InlineMath math="n \ge 30" /> they're nearly
        identical.
      </p>

      <h3>chi-squared (variance, goodness of fit)</h3>

      <p>
        For a multinomial-style goodness-of-fit test with{" "}
        <InlineMath math="k" /> categories:
      </p>
      <BlockMath math="\chi^2 = \sum_{i=1}^k \frac{(O_i - E_i)^2}{E_i} \sim \chi^2_{k-1} \text{ under } H_0." />

      <p>
        Use case: A/B testing of categorical outcomes,
        contingency tables, regression residual analyses.
      </p>

      <h3>Two-sample tests</h3>

      <p>
        Two-sample t-tests, Mann–Whitney U, paired tests,
        Welch's t-test (unequal variances). All variations
        on the same theme: compare two distributions and
        check whether the difference is plausibly zero.
      </p>

      <Exercise prompt="A coin is flipped 100 times and lands heads 60 times. Test $H_0 : p = 1/2$ vs $H_1 : p \ne 1/2$ at $\alpha = 0.05$.">
        <p>
          Under{" "}
          <InlineMath math="H_0" />,{" "}
          <InlineMath math="X \sim \mathrm{Bin}(100, 0.5)" /> with{" "}
          <InlineMath math="E[X] = 50" />,{" "}
          <InlineMath math="\mathrm{Var}(X) = 25" />,{" "}
          <InlineMath math="\sigma = 5" />.
        </p>
        <p>
          Standardised:{" "}
          <InlineMath math="Z = (60 - 50)/5 = 2" />. Two-sided
          p-value:{" "}
          <InlineMath math="2(1 - \Phi(2)) \approx 0.046" />.
        </p>
        <p>
          Just below 0.05 — reject{" "}
          <InlineMath math="H_0" /> at the 5% level. Borderline
          significance: would not survive multiple-testing
          correction or a slightly different test.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Likelihood-ratio test</h2>

      <p>
        The general-purpose hypothesis test, fairly powerful
        and mostly distribution-free in its asymptotic form.
      </p>

      <Callout title="LRT statistic">
        For{" "}
        <InlineMath math="H_0 : \theta \in \Theta_0" /> vs{" "}
        <InlineMath math="H_1 : \theta \in \Theta" />:
        <BlockMath math="\Lambda = \frac{\sup_{\Theta_0} L(\theta)}{\sup_\Theta L(\theta)}, \quad -2\log\Lambda \xrightarrow{d} \chi^2_q \text{ under } H_0" />
        where <InlineMath math="q" /> is the difference in
        dimensions of <InlineMath math="\Theta" /> and{" "}
        <InlineMath math="\Theta_0" />.
      </Callout>

      <p>
        This <strong>Wilks' theorem</strong>: the doubled
        log-likelihood ratio is asymptotically chi-squared
        with degrees of freedom equal to the number of
        constraints imposed by{" "}
        <InlineMath math="H_0" />.
      </p>

      <p>
        Use case: deciding whether to add a parameter to a
        model. Fit the unconstrained model, fit the
        constrained model, compute LRT, look up p-value in
        chi-squared tables. This is the standard model-
        comparison tool for nested likelihoods.
      </p>

      <h3>Wald test (closely related)</h3>

      <p>
        Use the asymptotic distribution of MLE directly:
      </p>
      <BlockMath math="W = \frac{(\hat\theta - \theta_0)^2}{\widehat{\mathrm{SE}}^2} \xrightarrow{d} \chi^2_1 \text{ under } H_0 : \theta = \theta_0." />

      <p>
        Often easier to compute than LRT (no second
        likelihood maximisation needed). Equivalent
        asymptotically to LRT under regularity. Standard
        output in regression software.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Multiple testing</h2>

      <p>
        Run 20 independent tests at{" "}
        <InlineMath math="\alpha = 0.05" />. Even under all
        nulls, expect 1 false positive. This is the multiple-
        testing problem — and it's pervasive in modern
        science (genomics, finance, A/B testing).
      </p>

      <h3>Bonferroni correction</h3>

      <p>
        For <InlineMath math="m" /> tests, use{" "}
        <InlineMath math="\alpha/m" /> as the per-test
        threshold. Controls the family-wise error rate (FWER)
        — probability of any false positive in the family.
      </p>

      <p>
        Conservative; loses power as{" "}
        <InlineMath math="m" /> grows.
      </p>

      <h3>Benjamini–Hochberg (BH)</h3>

      <p>
        Controls the false discovery rate (FDR) — expected
        proportion of false positives among all rejections.
        Less conservative; standard in genomics and large-
        scale testing.
      </p>

      <Pitfall>
        Multiple testing without correction is the single
        most-common reproducibility failure in published
        science. If you ran 20 hypotheses and report only
        the "significant" one, you've committed a forking-
        paths error. Pre-register hypotheses and apply
        proper corrections.
      </Pitfall>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Confidence intervals</h2>

      <Callout title="Definition">
        A <InlineMath math="(1 - \alpha)" /> confidence
        interval for <InlineMath math="\theta" /> is a
        random interval{" "}
        <InlineMath math="[L, U]" /> such that{" "}
        <InlineMath math="P(\theta \in [L, U]) \ge 1 - \alpha" />.
      </Callout>

      <p>
        Two important readings:
      </p>
      <ul>
        <li>
          <strong>Frequentist</strong>: across many
          hypothetical repetitions of the experiment,{" "}
          <InlineMath math="\ge 95\%" /> of the resulting
          intervals would contain the true{" "}
          <InlineMath math="\theta" />.
        </li>
        <li>
          <strong>Misreading</strong>: "there's a 95% chance{" "}
          <InlineMath math="\theta" /> is in this specific
          interval." Wrong, frequentistly. Correct,
          Bayesianly, but only with a credible interval (
          Chapter 4).
        </li>
      </ul>

      <h3>Wald CI</h3>

      <p>
        The most-used CI in practice:
      </p>
      <BlockMath math="\hat\theta \pm z_{\alpha/2} \cdot \mathrm{SE}(\hat\theta)" />

      <p>
        with <InlineMath math="z_{\alpha/2} = 1.96" /> for 95%
        CI. Built on asymptotic normality of MLE.
      </p>

      <h3>Exact and CLT-free CIs</h3>

      <p>
        Wald CIs are asymptotic. For small{" "}
        <InlineMath math="n" /> or non-Gaussian estimators,
        better options exist:
      </p>
      <ul>
        <li>
          Clopper–Pearson for binomial proportions.
        </li>
        <li>
          Bootstrap (next part).
        </li>
        <li>
          Profile-likelihood intervals.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · The bootstrap</h2>

      <p>
        Computer-power your way around asymptotic
        approximations.
      </p>

      <Callout title="Algorithm">
        <ol>
          <li>
            Resample <InlineMath math="n" /> data points{" "}
            <em>with replacement</em> from your original
            data. Call this resample{" "}
            <InlineMath math="X^{(1)*}" />.
          </li>
          <li>
            Compute the estimator on the resample:{" "}
            <InlineMath math="\hat\theta^{(1)*}" />.
          </li>
          <li>
            Repeat <InlineMath math="B" /> times (e.g.{" "}
            <InlineMath math="B = 10000" />).
          </li>
          <li>
            The empirical distribution of{" "}
            <InlineMath math="\hat\theta^{(1)*}, \dots, \hat\theta^{(B)*}" />{" "}
            approximates the sampling distribution of{" "}
            <InlineMath math="\hat\theta" />.
          </li>
        </ol>
      </Callout>

      <p>
        Use it for:
      </p>
      <ul>
        <li>
          Standard errors.
        </li>
        <li>
          Percentile confidence intervals (
          <InlineMath math="2.5" />th to{" "}
          <InlineMath math="97.5" />th percentiles for 95%
          CI).
        </li>
        <li>
          Bias-corrected and accelerated (BCa) intervals for
          better small-sample coverage.
        </li>
        <li>
          Hypothesis tests via "bootstrap under{" "}
          <InlineMath math="H_0" />" (re-sample with the
          null imposed).
        </li>
      </ul>

      <p>
        Caveats: doesn't work for time-series or correlated
        data without modification (block bootstrap, stationary
        bootstrap). For non-iid microstructure data, careful
        attention to dependence structure is essential.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>Standard errors and confidence
          intervals</strong> are how we communicate
          uncertainty in estimates. Every p-value-bearing
          number in a paper involves the framework here.
        </li>
        <li>
          <strong>Multiple testing</strong>: factor models,
          backtests of multiple strategies, A/B testing
          dashboards — all need correction. Failure to
          correct is the source of much spurious signal.
        </li>
        <li>
          <strong>Bootstrap</strong>: for any estimator with
          uncertain finite-sample distribution (impact
          regressions, Hawkes-process estimates, robust
          statistics), bootstrap is the practical CI tool.
        </li>
        <li>
          <strong>Microstructure</strong>: testing whether a
          calibrated impact model fits significantly better
          than the null (constant-rate Poisson) is a
          likelihood-ratio test on the Hawkes likelihood. The
          square-root impact law is verified through
          confidence intervals on the impact-vs-volume
          regression slope.
        </li>
      </ul>

      <p>
        Next chapter: Bayesian inference and MAP. Same
        machinery, different interpretation — and the bridge
        to ridge / lasso / Bayesian linear regression.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt: "A p-value of 0.04 means…",
    options: [
      "$P(H_0 \\mid \\text{data}) = 0.04$",
      "the probability, assuming $H_0$ is true, of observing data this extreme is 0.04",
      "the effect is real with probability 0.96",
      "the test has 96% power",
    ],
    correct: 1,
    explanation:
      "The p-value is conditional on $H_0$, not on the data. It is *not* the posterior probability of $H_0$. This conflation is the most-common statistics mistake in popular science writing.",
  },
  {
    prompt: "Type I and Type II errors:",
    options: [
      "Type I = false negative; Type II = false positive",
      "Type I = false positive (reject true $H_0$); Type II = false negative (fail to reject false $H_0$)",
      "they're the same thing",
      "Type II is always worse",
    ],
    correct: 1,
    explanation:
      "$\\alpha$ controls Type I (significance level). $1 - \\beta$ is power, controlling Type II. Trade-off: smaller $\\alpha$ ⇒ larger $\\beta$ ⇒ less power.",
  },
  {
    prompt: "Wilks' theorem says, for the LRT statistic $-2 \\log \\Lambda$ under $H_0$…",
    options: [
      "is exactly $\\chi^2_q$",
      "converges in distribution to $\\chi^2_q$ as $n \\to \\infty$, where $q$ is the constraint dimension",
      "is uniform on $[0, 1]$",
      "is identically zero",
    ],
    correct: 1,
    explanation:
      "Asymptotic chi-squared. $q$ counts the dimensions removed by the null restriction. The basis for nested-model comparisons in regression and survival analysis.",
  },
  {
    prompt:
      "Bonferroni correction with $m$ simultaneous tests uses per-test threshold…",
    options: [
      "$\\alpha$",
      "$\\alpha / m$",
      "$\\alpha m$",
      "$\\sqrt\\alpha$",
    ],
    correct: 1,
    explanation:
      "Divide the family-wise level by the number of tests. Conservative but simple. BH controls FDR (less conservative) and is the modern alternative for large-scale testing.",
  },
  {
    prompt: "The bootstrap…",
    options: [
      "requires the data to be Gaussian",
      "approximates the sampling distribution by resampling with replacement and computing the estimator on each resample",
      "is only for testing $H_0 : \\mu = 0$",
      "doesn't apply to confidence intervals",
    ],
    correct: 1,
    explanation:
      "Resample, recompute, repeat. The empirical distribution of bootstrap estimates approximates the sampling distribution. Generates standard errors, CIs, and tests without asymptotic assumptions.",
  },
];
