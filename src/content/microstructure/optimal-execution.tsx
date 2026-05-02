import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function OptimalExecutionBody() {
  return (
    <>
      <p>
        Given a target quantity{" "}
        <InlineMath math="Q" /> to execute by time{" "}
        <InlineMath math="T" />, what's the optimal trajectory?
        Trade fast and pay impact; trade slow and pay
        volatility risk. The Almgren-Chriss framework gives
        a clean closed-form answer for linear impact and
        Gaussian price dynamics. It's the canonical model
        of optimal execution and the foundation of every
        production execution algorithm.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Almgren, Chriss — Optimal execution of portfolio transactions",
            author: "Robert Almgren, Neil Chriss",
            duration: "Reading (paper)",
            url: "https://www.smallake.kr/wp-content/uploads/2016/03/optliq.pdf",
            note: "The 1999 original. Sets up the mean-variance framework with closed-form solutions.",
          },
          {
            title:
              "Cartea, Jaimungal, Penalva — Algorithmic and HFT Ch 6",
            author: "Cartea, Jaimungal, Penalva",
            duration: "Reading",
            url: "https://www.cambridge.org/9781107091146",
            note: "Modern stochastic-control treatment of optimal execution including HJB equations.",
          },
          {
            title: "Gatheral — No-dynamic-arbitrage and market impact",
            author: "Jim Gatheral",
            duration: "Reading (paper)",
            url: "https://mfe.baruch.cuny.edu/wp-content/uploads/2014/10/Gatheral_NDA.pdf",
            note: "Critical paper on what kinds of impact models are consistent with no-arbitrage.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Setup</h2>

      <p>
        Trader needs to buy{" "}
        <InlineMath math="Q" /> shares by time{" "}
        <InlineMath math="T" />. Discrete time{" "}
        <InlineMath math="t = 0, 1, \dots, N" /> (
        <InlineMath math="N" /> intervals). Holding{" "}
        <InlineMath math="x_t" /> = remaining shares at time{" "}
        <InlineMath math="t" />, with{" "}
        <InlineMath math="x_0 = Q" />,{" "}
        <InlineMath math="x_N = 0" />.
      </p>

      <p>
        Trade at time <InlineMath math="t" />:{" "}
        <InlineMath math="n_t = x_t - x_{t+1}" /> shares
        (positive = selling). Total executed:{" "}
        <InlineMath math="\sum n_t = Q" />.
      </p>

      <p>
        Price dynamics under linear impact:
      </p>
      <BlockMath math="\tilde p_t = S_t - \eta n_t" />

      <p>
        — paying{" "}
        <InlineMath math="\eta n_t" /> per share due to
        temporary impact (large trade pushes price more
        unfavourably). The market price{" "}
        <InlineMath math="S_t" /> evolves with permanent
        impact and Gaussian innovations:
      </p>
      <BlockMath math="S_t = S_{t-1} - \gamma n_{t-1} + \sigma \sqrt{\Delta t} \xi_t" />

      <p>
        with iid{" "}
        <InlineMath math="\xi_t \sim N(0, 1)" />,{" "}
        <InlineMath math="\gamma" /> = permanent-impact
        coefficient. Permanent impact reduces the market
        price for everyone; temporary impact only affects
        the trader's own fills.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Cost decomposition</h2>

      <p>
        Total revenue (from selling) is{" "}
        <InlineMath math="\sum n_t \tilde p_t" />. The "
        implementation shortfall" relative to the
        arrival-price benchmark{" "}
        <InlineMath math="S_0" /> is:
      </p>
      <BlockMath math="\text{IS} = Q S_0 - \sum_t n_t \tilde p_t = \sum_t \eta n_t^2 + \tfrac{1}{2}\gamma Q^2 - \sum_t \sigma \sqrt{\Delta t} \xi_t \cdot x_t." />

      <p>
        Three pieces:
      </p>
      <ul>
        <li>
          <strong>Temporary impact</strong>:{" "}
          <InlineMath math="\sum \eta n_t^2" /> — quadratic in
          trade rate; punishes trading fast.
        </li>
        <li>
          <strong>Permanent impact</strong>:{" "}
          <InlineMath math="\tfrac{1}{2} \gamma Q^2" /> — depends
          only on total <InlineMath math="Q" />, not on
          trajectory. A constant cost (every trader pays it).
        </li>
        <li>
          <strong>Random component</strong>: Gaussian, mean
          zero, variance{" "}
          <InlineMath math="\sigma^2 \Delta t \sum x_t^2" />.
          Punishes <em>holding</em> shares (slow execution
          ⇒ longer exposure to price risk).
        </li>
      </ul>

      <p>
        The expected IS comes from impact (deterministic);
        the variance comes from the random Gaussian
        innovations along the holding trajectory.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Mean-variance objective</h2>

      <Callout title="Almgren-Chriss objective">
        Choose trajectory{" "}
        <InlineMath math="\{x_t\}" /> to minimise
        <BlockMath math="E[\text{IS}] + \lambda \cdot \mathrm{Var}(\text{IS})." />
        <InlineMath math="\lambda" /> = risk aversion
        parameter.
      </Callout>

      <p>
        Trade-off:
      </p>
      <ul>
        <li>
          Fast execution → high temporary impact, low
          variance.
        </li>
        <li>
          Slow execution → low temporary impact, high
          variance.
        </li>
      </ul>

      <p>
        Optimal trajectory balances them. Setting up the
        Lagrangian or applying dynamic programming yields a
        beautifully simple closed form.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · The closed-form solution</h2>

      <Callout title="Optimal Almgren-Chriss trajectory">
        <BlockMath math="x_t = Q \cdot \frac{\sinh(\kappa(T - t))}{\sinh(\kappa T)}, \qquad \kappa = \sqrt{\frac{\lambda \sigma^2}{\eta}}." />
      </Callout>

      <p>
        Trade at rate{" "}
        <InlineMath math="\dot x_t = -Q \cdot \frac{\kappa \cosh(\kappa(T-t))}{\sinh(\kappa T)}" />.
        Three regimes:
      </p>

      <ul>
        <li>
          <strong>Risk-neutral</strong> (
          <InlineMath math="\lambda \to 0" />,{" "}
          <InlineMath math="\kappa \to 0" />): trajectory is
          linear in time —{" "}
          <strong>TWAP</strong> (Time-Weighted Average Price).
        </li>
        <li>
          <strong>Risk-averse</strong> (
          <InlineMath math="\lambda" /> large,{" "}
          <InlineMath math="\kappa" /> large): exponential
          front-loading — trade most shares early to
          reduce variance.
        </li>
        <li>
          <strong>Intermediate</strong>: a smooth
          interpolation between TWAP and immediate
          execution, parameterised by{" "}
          <InlineMath math="\kappa" />.
        </li>
      </ul>

      <p>
        The dimensionless number{" "}
        <InlineMath math="\kappa T" /> measures "horizon
        normalised by risk preference" — small means
        risk-tolerant traders should TWAP; large means
        risk-averse traders should front-load.
      </p>

      <Exercise prompt="A risk-neutral trader executes a metaorder of $Q$ shares over $N$ equal time steps. What's the optimal trade rate per step under linear impact?">
        <p>
          Risk-neutral{" "}
          <InlineMath math="\lambda \to 0" /> ⇒ TWAP ⇒
          constant trade rate{" "}
          <InlineMath math="n_t = Q/N" />.
        </p>
        <p>
          Why: with no penalty for holding inventory, the
          only cost is impact. Quadratic impact{" "}
          <InlineMath math="\eta n^2" /> is minimised by
          spreading trades evenly. Calculus or AM-QM
          inequality.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Implementation shortfall vs other benchmarks</h2>

      <ul>
        <li>
          <strong>Implementation shortfall (IS)</strong>: cost
          relative to arrival price{" "}
          <InlineMath math="S_0" />. The benchmark Almgren-
          Chriss minimises.
        </li>
        <li>
          <strong>VWAP</strong> (Volume-Weighted Average
          Price): benchmark = average price over execution
          period weighted by market volume. Match the
          benchmark by trading at proportional rate.
        </li>
        <li>
          <strong>TWAP</strong>: trade at constant rate over
          the period; both a benchmark and a strategy.
        </li>
        <li>
          <strong>POV</strong> (Percent of Volume): trade as
          a fixed fraction of market volume in real time.
          Adapts to fluctuating activity but introduces
          gaming risk.
        </li>
      </ul>

      <p>
        Different traders have different objective functions:
      </p>
      <ul>
        <li>
          Pension fund minimising IS (large blocks, slow,
          benchmark = arrival).
        </li>
        <li>
          ETF authorised participant tracking VWAP (
          benchmark = NAV-replication).
        </li>
        <li>
          Index fund matching closing benchmark (high pressure
          in last hour).
        </li>
      </ul>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Extensions</h2>

      <h3>Non-linear impact</h3>

      <p>
        Real impact is square-root, not linear. Replacing{" "}
        <InlineMath math="\eta n^2" /> with{" "}
        <InlineMath math="\eta n^{3/2}" /> in the cost (
        from <InlineMath math="\sqrt n \cdot n" /> impact ×
        size) breaks the closed form. Numerical optimal
        control or approximate algorithms take over. Gatheral
        showed that some non-linear impact functions are
        inconsistent with no-arbitrage; you need to match
        permanent impact to temporary-impact decay.
      </p>

      <h3>Adverse selection</h3>

      <p>
        Posting limit orders earns the spread but exposes
        you to adverse-selection: when the market moves
        against you, you'd rather have used a market order.
        Combining limit + market orders adaptively is the
        meat of HFT execution algorithms.
      </p>

      <h3>Stochastic horizon</h3>

      <p>
        Real-world horizons are uncertain (signals can
        disappear, market conditions change). Stochastic-
        horizon Almgren-Chriss handles random termination
        times — used for "execute by close" with uncertain
        liquidity at close.
      </p>

      <h3>HJB equations</h3>

      <p>
        Continuous-time formulation: solve a Hamilton-
        Jacobi-Bellman equation for the value function.
        Used in modern stochastic-control treatments
        (Cartea-Jaimungal-Penalva). Reduces to Almgren-
        Chriss for linear-quadratic objectives.
      </p>

      <Pitfall>
        Almgren-Chriss is sensitive to the impact model.
        Wrong{" "}
        <InlineMath math="\eta" /> ⇒ wrong trajectory ⇒
        higher actual cost than necessary. Calibration of
        impact parameters from execution history is itself
        a regression / Bayesian estimation problem (Tier
        VI). Don't trust off-the-shelf{" "}
        <InlineMath math="\eta" /> from a textbook.
      </Pitfall>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Every institutional trade goes through an
          execution algorithm</strong>. TCA reports cost
          relative to IS or VWAP benchmarks. Almgren-Chriss
          (and its extensions) is the canonical answer.
        </li>
        <li>
          <strong>Trade-off optimisation</strong> appears
          everywhere in finance — cost vs risk, exploration
          vs exploitation, etc. The mean-variance objective
          is the simplest non-trivial one.
        </li>
        <li>
          <strong>Closed-form intuition</strong>: TWAP for
          risk-neutral, front-load for risk-averse. The
          interpolation through{" "}
          <InlineMath math="\kappa T" /> gives a
          dimensionless "speed" parameter that's
          industrially useful.
        </li>
        <li>
          <strong>Microstructure preprint context</strong>:
          modern execution algorithms incorporate non-
          linear impact, adaptive trading speed, and
          latency-aware order placement. The Almgren-Chriss
          framework is the starting point that all
          extensions build on.
        </li>
      </ul>

      <p>
        Final chapter: market making — the other side of the
        trade, where you provide liquidity instead of
        consuming it.
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
      "Almgren-Chriss minimises…",
    options: [
      "expected execution time",
      "expected impact cost only",
      "$E[\\text{IS}] + \\lambda \\mathrm{Var}(\\text{IS})$ — mean-variance of implementation shortfall",
      "the trader's wealth",
    ],
    correct: 2,
    explanation:
      "Mean-variance trade-off. Trade fast: high impact, low variance. Trade slow: low impact, high variance. $\\lambda$ controls risk aversion; closed-form solution exists for linear impact.",
  },
  {
    prompt:
      "For a risk-neutral trader ($\\lambda \\to 0$), the optimal Almgren-Chriss trajectory is…",
    options: [
      "front-loaded (trade everything immediately)",
      "back-loaded (trade everything at the end)",
      "linear in time — TWAP",
      "random",
    ],
    correct: 2,
    explanation:
      "$\\kappa \\to 0$ makes $\\sinh(\\kappa(T-t)) \\to \\kappa(T-t)$, linear in time. TWAP minimises quadratic-in-rate impact when there's no risk penalty.",
  },
  {
    prompt:
      "As risk aversion $\\lambda$ grows, the Almgren-Chriss trajectory shifts toward…",
    options: [
      "TWAP",
      "back-loading",
      "front-loading: trade most shares early to reduce variance from holding inventory",
      "random",
    ],
    correct: 2,
    explanation:
      "$\\kappa$ grows; $\\sinh(\\kappa(T-t))$ becomes exponential. Risk-averse traders want to flatten inventory fast. The Almgren-Chriss frontier interpolates between TWAP and immediate execution.",
  },
  {
    prompt: "Implementation shortfall (IS) is measured as…",
    options: [
      "the spread",
      "trade revenue minus arrival-price reference: $Q \\cdot S_0 - \\sum n_t \\tilde p_t$",
      "the volume-weighted price",
      "the closing price",
    ],
    correct: 1,
    explanation:
      "IS = arrival-price benchmark minus actual execution revenue. Captures both impact and adverse price drift during execution. Almgren-Chriss minimises mean+variance of IS.",
  },
  {
    prompt:
      "Permanent vs temporary impact in Almgren-Chriss:",
    options: [
      "no distinction",
      "permanent depends only on total $Q$ (a constant cost); temporary penalises trade speed (quadratic in $n_t$)",
      "permanent is always larger",
      "temporary is irrelevant",
    ],
    correct: 1,
    explanation:
      "Permanent: $\\tfrac{1}{2}\\gamma Q^2$, doesn't depend on trajectory. Temporary: $\\sum \\eta n_t^2$, minimised by even spreading. The temporary part drives the trajectory choice.",
  },
];
