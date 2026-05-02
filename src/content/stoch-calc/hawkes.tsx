import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function HawkesBody() {
  return (
    <>
      <p>
        Brownian motion is the Gaussian limit of small,
        independent kicks. Real markets aren't quite that
        nice: order arrivals come in clusters, and the
        clustering itself has long memory. <strong>Hawkes
        processes</strong> are self-exciting point processes —
        each event raises the chance of another event for
        some time afterward. They're the right model for
        order arrivals, and the branching ratio is the
        single number that summarises whether a market is
        sub-critical (stable) or near-critical (volatile).
      </p>

      <ReferenceResources
        items={[
          {
            title: "Trades, Quotes & Prices Ch 5–6",
            author: "Bouchaud, Bonart, Donier, Gould",
            duration: "Reading",
            url: "https://www.cambridge.org/9781107156609",
            note: "Hawkes processes and branching ratio with empirical examples from limit-order books.",
          },
          {
            title: "Bacry, Mastromatteo, Muzy — Hawkes processes in finance",
            author: "Emmanuel Bacry et al.",
            duration: "Reading (paper)",
            url: "https://arxiv.org/abs/1502.04592",
            note: "Comprehensive review of Hawkes-process applications in financial econometrics.",
          },
          {
            title: "Bouchaud — Why have asset price properties changed so little in 200 years?",
            author: "Jean-Philippe Bouchaud",
            duration: "Reading (essay)",
            url: "https://arxiv.org/abs/1807.10860",
            note: "Big-picture context: long memory and reflexivity in markets.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Point processes</h2>

      <p>
        A <strong>point process</strong> on{" "}
        <InlineMath math="[0, \infty)" /> is a sequence of
        random times{" "}
        <InlineMath math="\{T_1, T_2, \dots\}" /> with{" "}
        <InlineMath math="T_i < T_{i+1}" />. We're interested
        in <em>conditional intensity</em>: the rate at which
        events occur, given history.
      </p>

      <Callout title="Conditional intensity">
        <BlockMath math="\lambda(t \mid \mathcal{F}_t) = \lim_{h \to 0} \frac{P(\text{event in } [t, t+h] \mid \mathcal{F}_t)}{h}." />
      </Callout>

      <p>
        The simplest case is a homogeneous Poisson process
        with constant intensity{" "}
        <InlineMath math="\lambda" />:
      </p>
      <ul>
        <li>
          Number of events in{" "}
          <InlineMath math="[s, t]" /> is{" "}
          <InlineMath math="\mathrm{Poisson}(\lambda(t-s))" />.
        </li>
        <li>
          Inter-arrival times are{" "}
          <InlineMath math="\mathrm{Exp}(\lambda)" />.
        </li>
        <li>
          Memoryless: history doesn't affect the future rate.
        </li>
      </ul>

      <p>
        Empirical microstructure data fails the memoryless
        assumption. Right after a flurry of buys, more buys
        are more likely. We need a model where intensity
        depends on history.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Hawkes processes</h2>

      <Callout title="Hawkes intensity">
        A 1-D Hawkes process has conditional intensity
        <BlockMath math="\lambda(t) = \mu + \sum_{T_i < t} \phi(t - T_i)" />
        where{" "}
        <InlineMath math="\mu > 0" /> is the baseline rate
        and{" "}
        <InlineMath math="\phi : [0, \infty) \to [0, \infty)" />{" "}
        is the <strong>kernel</strong>.
      </Callout>

      <p>
        Each past event{" "}
        <InlineMath math="T_i" /> contributes{" "}
        <InlineMath math="\phi(t - T_i)" /> to the current
        intensity. The kernel decides how strongly and how
        quickly that contribution dies out.
      </p>

      <h3>Common kernels</h3>

      <ul>
        <li>
          <strong>Exponential</strong>:{" "}
          <InlineMath math="\phi(u) = \alpha e^{-\beta u}" />.
          Markovian (memory dies exponentially);
          analytically tractable.
        </li>
        <li>
          <strong>Power-law</strong>:{" "}
          <InlineMath math="\phi(u) = c (u + \tau)^{-(1+\gamma)}" />.
          Long memory; matches empirical order-flow
          autocorrelation.
        </li>
        <li>
          <strong>Sum of exponentials</strong>: linear
          combinations of Markovian kernels approximate
          power-law decay over a finite range.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Branching ratio</h2>

      <Callout title="Definition · Branching ratio">
        <BlockMath math="n = \int_0^\infty \phi(u) \, du." />
      </Callout>

      <p>
        Total "secondary excitation" generated by one
        event. Three regimes:
      </p>

      <ul>
        <li>
          <strong>Sub-critical</strong> (
          <InlineMath math="n < 1" />): each event triggers
          on average less than one offspring. System is stable;
          stationary intensity exists.
        </li>
        <li>
          <strong>Critical</strong> (
          <InlineMath math="n = 1" />): each event triggers
          on average one offspring. Boundary between
          stability and explosion. Long-range correlations
          and "avalanche" behaviour.
        </li>
        <li>
          <strong>Super-critical</strong> (
          <InlineMath math="n > 1" />): each event triggers
          on average more than one. System diverges; no
          stationary distribution.
        </li>
      </ul>

      <p>
        Long-run intensity (sub-critical regime):
      </p>
      <BlockMath math="E[\lambda(t)] \to \frac{\mu}{1 - n} \quad \text{as } t \to \infty." />

      <p>
        Closer to criticality (
        <InlineMath math="n \to 1^-" />), more
        "amplification" of the baseline noise. Empirical
        equity markets often have{" "}
        <InlineMath math="n \approx 0.9" /> — near-critical.
      </p>

      <Pitfall>
        Mistaking branching ratio for "strength of
        excitation per event" is common. It's actually
        "expected number of secondary events triggered per
        primary." Even a small per-event excitation can
        push <InlineMath math="n" /> close to 1 if the
        kernel is broad.
      </Pitfall>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Branching interpretation</h2>

      <p>
        Hawkes processes have an exact "
        <strong>cluster representation</strong>" as a
        Galton–Watson branching process embedded in continuous
        time:
      </p>

      <ol>
        <li>
          Each event is either an{" "}
          <em>immigrant</em> (from the baseline rate{" "}
          <InlineMath math="\mu" />) or an{" "}
          <em>offspring</em> of an earlier event (from the
          kernel <InlineMath math="\phi" />).
        </li>
        <li>
          Each event independently produces a Poisson(
          <InlineMath math="n" />) number of offspring,
          spaced according to{" "}
          <InlineMath math="\phi" />.
        </li>
        <li>
          The total intensity at time{" "}
          <InlineMath math="t" /> is the sum of contributions
          from all ancestors.
        </li>
      </ol>

      <p>
        The branching-process analogy makes branching-ratio
        intuition rigorous: total descendants of one ancestor
        are{" "}
        <InlineMath math="\sum_k n^k = 1/(1-n)" /> on average,
        which is why intensity blows up as{" "}
        <InlineMath math="n \to 1" />.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Multivariate Hawkes</h2>

      <p>
        Multiple event types — buys, sells, cancels, mid-
        price moves — interact. Multivariate Hawkes:
      </p>
      <BlockMath math="\lambda_i(t) = \mu_i + \sum_j \sum_{T_k^{(j)} < t} \phi_{ij}(t - T_k^{(j)})." />

      <p>
        <InlineMath math="\phi_{ij}" /> is the kernel for
        type-<InlineMath math="j" /> events triggering type-
        <InlineMath math="i" /> events. Branching matrix:{" "}
        <InlineMath math="\Phi_{ij} = \int_0^\infty \phi_{ij}(u) \, du" />.
        Spectral radius{" "}
        <InlineMath math="\rho(\Phi) < 1" /> for stability.
      </p>

      <p>
        Spectral analysis of{" "}
        <InlineMath math="\Phi" /> tells you the dominant
        cross-excitation channels — e.g., do buys mostly
        trigger more buys (autocorrelation) or do they trigger
        sells (mean reversion)? Multivariate Hawkes is a
        diagnostic tool for order-book dynamics.
      </p>

      <Exercise prompt="A 1-D Hawkes process has $\\mu = 1$ and exponential kernel with $\\alpha = 0.5$, $\\beta = 1$. Compute branching ratio and stationary intensity.">
        <p>
          Branching ratio:{" "}
          <InlineMath math="n = \int_0^\infty 0.5 e^{-u} \, du = 0.5" />.
          Sub-critical.
        </p>
        <p>
          Stationary intensity:{" "}
          <InlineMath math="E[\lambda] = \mu/(1 - n) = 1/0.5 = 2" />.
          Twice the baseline — half the events are
          baseline-driven, half are self-excited.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Long memory and order-flow correlations</h2>

      <p>
        A robust empirical fact: the autocorrelation of
        order-flow signs (buy = +1, sell = −1) decays as a
        power law in lag, not exponentially:
      </p>
      <BlockMath math="\mathrm{Corr}(\varepsilon_t, \varepsilon_{t+\tau}) \sim \tau^{-\gamma}, \quad \gamma \approx 0.5." />

      <p>
        This is{" "}
        <strong>long memory</strong>: the past keeps
        influencing the present indefinitely (no
        characteristic decay scale). Hawkes processes with
        power-law kernels reproduce this naturally.
      </p>

      <h3>Fractional Brownian motion</h3>

      <p>
        For continuous-time long-memory processes, the
        natural object is <strong>fractional Brownian
        motion</strong> (fBM). For Hurst exponent{" "}
        <InlineMath math="H \in (0, 1)" />, fBM has:
      </p>
      <ul>
        <li>
          <InlineMath math="W^H_t \sim N(0, t^{2H})" />.
        </li>
        <li>
          Increment correlations:{" "}
          <InlineMath math="\mathrm{Cov}(W^H_t - W^H_s, W^H_u - W^H_v)" /> depends on{" "}
          <InlineMath math="t, s, u, v" /> in a way that
          exhibits long memory when{" "}
          <InlineMath math="H > 1/2" />.
        </li>
        <li>
          <InlineMath math="H = 1/2" /> recovers standard BM.
          <InlineMath math="H > 1/2" />: persistent (positive
          autocorrelation).{" "}
          <InlineMath math="H < 1/2" />: anti-persistent
          (negative autocorrelation).
        </li>
      </ul>

      <p>
        fBM is{" "}
        <strong>not a martingale</strong> for{" "}
        <InlineMath math="H \ne 1/2" /> and lacks the standard
        Itô framework. Modern "rough volatility" research
        (Bayer, Friz, Gatheral) uses fBM with{" "}
        <InlineMath math="H \approx 0.1" /> to model
        volatility of volatility.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Estimation</h2>

      <p>
        Hawkes-process likelihood:
      </p>
      <BlockMath math="\log L(\theta) = \sum_{i=1}^N \log \lambda_\theta(T_i) - \int_0^T \lambda_\theta(s) \, ds." />

      <p>
        First term sums log-intensity at event times; second
        is the integrated intensity over the observation
        window. MLE recipe — back to Module V.
      </p>

      <p>
        Practical concerns:
      </p>
      <ul>
        <li>
          <strong>Identifiability</strong>: with a flexible
          kernel, baseline{" "}
          <InlineMath math="\mu" /> and slow tail of{" "}
          <InlineMath math="\phi" /> trade off. Often
          solvable only with regularisation.
        </li>
        <li>
          <strong>Numerical efficiency</strong>: naive
          intensity computation is{" "}
          <InlineMath math="O(N^2)" />. Tricks (recursive
          updates for exponential kernels, fast-multipole
          methods for power-law) bring it down to{" "}
          <InlineMath math="O(N)" /> or{" "}
          <InlineMath math="O(N \log N)" />.
        </li>
        <li>
          <strong>Asymptotic standard errors</strong>: from
          Fisher information at the MLE. Bootstrap is the
          alternative when sample sizes are modest.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>Order-flow modelling</strong>: Hawkes
          processes are the standard model for market and
          limit-order arrival in microstructure. Branching
          ratio quantifies "reflexivity" — how much trading
          begets more trading.
        </li>
        <li>
          <strong>Regime detection</strong>: changes in{" "}
          <InlineMath math="n" /> over time signal
          transitions in market state — calm to volatile,
          stable to crisis.
        </li>
        <li>
          <strong>Volatility forecasting</strong>: rough
          volatility uses fBM-based diffusions to capture
          long-memory effects in realised volatility.
        </li>
        <li>
          <strong>Microstructure context</strong>: the
          square-root impact law, propagator decay, and
          long-memory order flow are all interconnected;
          Hawkes processes are the right framework to model
          them jointly.
        </li>
      </ul>

      <p>
        Module VII is now complete. We have Brownian motion,
        Itô calculus, Hawkes processes, and long-memory
        objects. Module VIII applies all of this to the
        microstructure of limit-order books — the math of
        execution, impact, and market making.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt: "A Hawkes process is…",
    options: [
      "a continuous-time Markov chain",
      "a self-exciting point process whose intensity depends on past events",
      "a Brownian motion",
      "a Poisson process with constant intensity",
    ],
    correct: 1,
    explanation:
      "$\\lambda(t) = \\mu + \\sum_{T_i < t} \\phi(t - T_i)$ — past events boost the rate. Memoryless Poisson is the special case $\\phi \\equiv 0$.",
  },
  {
    prompt: "Branching ratio $n = \\int_0^\\infty \\phi(u) \\, du$. What's its meaning?",
    options: [
      "the baseline rate",
      "the expected number of secondary events triggered per primary",
      "the kernel's maximum",
      "the variance of intensity",
    ],
    correct: 1,
    explanation:
      "$n$ counts expected offspring per ancestor. $n < 1$: stable. $n = 1$: critical. $n > 1$: explosive. Empirical equity markets sit around $n \\approx 0.9$.",
  },
  {
    prompt: "For a sub-critical Hawkes process ($n < 1$), the stationary expected intensity is…",
    options: [
      "$\\mu$",
      "$\\mu / (1 - n)$",
      "$\\mu \\cdot n$",
      "infinite",
    ],
    correct: 1,
    explanation:
      "Each ancestor on average produces $1 + n + n^2 + \\dots = 1/(1-n)$ total descendants. Multiply by baseline rate $\\mu$ ⇒ stationary intensity. Diverges as $n \\to 1$.",
  },
  {
    prompt: "Order-flow autocorrelation in equity markets typically decays as…",
    options: [
      "exponentially",
      "as a power law $\\tau^{-\\gamma}$ with $\\gamma \\approx 0.5$",
      "constant",
      "Gaussian",
    ],
    correct: 1,
    explanation:
      "Long memory: power-law decay with no characteristic scale. Hawkes processes with power-law kernels reproduce this; exponential kernels miss it. Foundation of the propagator-model derivation.",
  },
  {
    prompt:
      "Fractional Brownian motion with $H = 0.7$ has…",
    options: [
      "anti-persistent increments",
      "persistent increments — positive correlation between past and future increments — and is *not* a martingale",
      "Markov property",
      "the same distribution as standard BM",
    ],
    correct: 1,
    explanation:
      "$H > 1/2$: persistent / long-memory. $H = 1/2$: standard BM. $H < 1/2$: anti-persistent (rough). fBM lacks martingale property and standard Itô framework — modern rough-vol models with $H \\approx 0.1$ use new tools.",
  },
];
