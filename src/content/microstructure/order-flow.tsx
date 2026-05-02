import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function OrderFlowBody() {
  return (
    <>
      <p>
        Order signs are highly predictable: knowing recent
        trades, you can guess the sign of the next one with
        accuracy well above 50%. By itself, that should mean
        prices are predictable too — but they aren't, at
        least not on the same timescales. The resolution is
        beautiful: the propagator decays at exactly the rate
        that cancels order-flow predictability, leaving prices
        approximately martingale. This chapter unpacks the
        long-memory phenomenon and the propagator-model
        consistency that makes everything fit.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Trades, Quotes &amp; Prices Ch 8, 12",
            author: "Bouchaud, Bonart, Donier, Gould",
            duration: "Reading",
            url: "https://www.cambridge.org/9781107156609",
            note: "Order-flow correlations (Ch 8) and the propagator model (Ch 12).",
          },
          {
            title: "Bouchaud, Gefen, Potters, Wyart — Fluctuations and response in financial markets",
            author: "Bouchaud et al.",
            duration: "Reading (paper)",
            url: "https://arxiv.org/abs/cond-mat/0307332",
            note: "The original derivation of the propagator-model fluctuation-dissipation balance.",
          },
          {
            title: "Lillo, Farmer — The long memory of efficient markets",
            author: "Fabrizio Lillo, J. Doyne Farmer",
            duration: "Reading (paper)",
            url: "https://www.tandfonline.com/doi/abs/10.2202/1558-3708.1226",
            note: "Empirical demonstration of order-flow long memory and discussion of efficient-markets reconciliation.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Long memory of order signs</h2>

      <p>
        Define the <strong>trade sign</strong>{" "}
        <InlineMath math="\varepsilon_t \in \{-1, +1\}" />:{" "}
        <InlineMath math="+1" /> for buyer-initiated,{" "}
        <InlineMath math="-1" /> for seller-initiated. The
        autocorrelation across trade-time lag{" "}
        <InlineMath math="\tau" /> is:
      </p>
      <BlockMath math="\rho(\tau) = \mathrm{Corr}(\varepsilon_t, \varepsilon_{t+\tau})." />

      <Callout title="Empirical fact">
        For most equities,{" "}
        <BlockMath math="\rho(\tau) \sim \tau^{-\gamma}, \quad \gamma \approx 0.5." />
        Slow power-law decay over <em>thousands</em> of
        trades. Far from white noise.
      </Callout>

      <p>
        This is genuine long memory:{" "}
        <InlineMath math="\sum_\tau \rho(\tau)" /> diverges,
        meaning past order flow remains useful for
        predicting future order flow indefinitely. Equivalent
        formulations: variance of cumulative sign sums grows
        super-linearly; the spectral density has a divergence
        at zero frequency.
      </p>

      <h3>Why long memory? Metaorders</h3>

      <p>
        The standard explanation: institutional metaorders.
        A pension fund executing a 5% buy of daily volume
        over hours sends in many child orders, all with the
        same sign. Across many concurrent metaorders, the
        observed sign series inherits long-range
        autocorrelation.
      </p>

      <p>
        Formal model: order-flow signs are a Lillo-Farmer
        <em>fractional autoregressive</em> process, or
        equivalently a sum of metaorder "events" with
        power-law-distributed durations. Both reproduce the
        empirical{" "}
        <InlineMath math="\tau^{-1/2}" /> decay.
      </p>

      <Pitfall>
        Long memory is a property of trade sequences in
        trade time. If you re-bin in physical time (e.g.
        seconds), the autocorrelation changes shape because
        trade rates fluctuate. Be careful which clock you're
        using.
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Predictable order flow vs unpredictable prices</h2>

      <p>
        Here's the puzzle. If order signs are predictable
        (positive autocorrelation), and trades push prices in
        the direction of their sign, then prices should
        inherit predictability. But empirically, mid-price
        returns are very close to martingale (efficient).
        Trade-time return autocorrelation is essentially zero.
        How?
      </p>

      <Callout title="Resolution">
        Liquidity providers anticipate the predictable order
        flow. After a buy trade, they expect more buys; they
        widen the offer or post less ahead of it. The
        propagator decay precisely cancels the order-flow
        autocorrelation in expectation, leaving prices
        approximately martingale.
      </Callout>

      <p>
        This is a <strong>fluctuation-dissipation</strong>{" "}
        relation in the Bouchaud-Gefen-Potters-Wyart sense
        — analogous to the physics result connecting
        random fluctuations and dissipative response in
        equilibrium systems.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · The propagator-model derivation</h2>

      <p>
        Setup. Suppose price moves are driven by the
        propagator model:
      </p>
      <BlockMath math="p_t = p_0 + \sum_{s<t} G(t - s) \xi_s + \eta_t" />

      <p>
        with kernel <InlineMath math="G" /> and order-flow{" "}
        <InlineMath math="\xi_s = \varepsilon_s \cdot v_s^{1/2}" />{" "}
        (sign times square-root size). For
        martingale prices, return autocorrelation must
        vanish:
      </p>
      <BlockMath math="E[(p_t - p_{t-1})(p_{t+1} - p_t)] = 0." />

      <p>
        Expand. The condition couples the order-flow
        autocorrelation{" "}
        <InlineMath math="C(\tau) = E[\xi_s \xi_{s+\tau}]" />{" "}
        and the kernel{" "}
        <InlineMath math="G" />:
      </p>
      <BlockMath math="\sum_{\tau} G(\tau) [G(\tau + 1) - 2 G(\tau) + G(\tau - 1)] \cdot C(\tau) \approx 0." />

      <p>
        Solving for the kernel given a power-law
        autocorrelation{" "}
        <InlineMath math="C(\tau) \sim \tau^{-\gamma}" />{" "}
        gives a power-law kernel{" "}
        <InlineMath math="G(\tau) \sim \tau^{-\beta}" /> with
      </p>
      <BlockMath math="\beta = \frac{1 - \gamma}{2}." />

      <p>
        For{" "}
        <InlineMath math="\gamma \approx 0.5" />,{" "}
        <InlineMath math="\beta \approx 0.25" /> — matching
        the empirical decay of transient impact. The two
        exponents are not independent; they're locked
        together by the martingale condition.
      </p>

      <p>
        This is one of the most elegant results in
        microstructure theory. Three observations
        (long-memory order flow, power-law impact decay,
        martingale prices) reduce to a single
        fluctuation-dissipation balance.
      </p>

      <Exercise prompt="If empirical $\\gamma = 0.6$, what's the predicted propagator decay $\\beta$?">
        <p>
          <InlineMath math="\beta = (1 - 0.6)/2 = 0.2" />.
          Slower decay than for{" "}
          <InlineMath math="\gamma = 0.5" /> — more persistent
          impact. Heavy autocorrelation in flow demands
          longer-tailed impact decay to maintain martingale
          prices.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Estimation in practice</h2>

      <p>
        Estimating impact from data is harder than it
        sounds. Common approaches:
      </p>

      <h3>Cross-impact: trades vs returns</h3>

      <p>
        Regress short-horizon mid-price returns on signed
        order flow:
      </p>
      <BlockMath math="r_t = \alpha + \sum_{\tau} \lambda_\tau \xi_{t-\tau} + \epsilon_t." />

      <p>
        The coefficients{" "}
        <InlineMath math="\lambda_\tau" /> trace out the
        propagator. Plot vs lag, fit a power law. Take care
        of trade-clock vs physical time.
      </p>

      <h3>Metaorder identification</h3>

      <p>
        When you have execution data labelled by metaorder,
        compute price drift over the metaorder duration and
        check the{" "}
        <InlineMath math="\sqrt Q" /> scaling directly.
        Without metaorder labels, you use latent-state
        estimation (Hidden Markov, point-process MLE).
      </p>

      <h3>Latent state filtering</h3>

      <p>
        Hawkes processes (Module VII) extended with two event
        types — informed and uninformed — give a latent
        state model fit by EM or particle filtering. Lets
        you separate price moves driven by information
        (permanent) from those driven by liquidity (
        transient).
      </p>

      <Pitfall>
        Naive impact regressions overestimate impact
        because they don't account for the bidirectional
        causality: prices both react to and predict trades.
        Robust estimation requires careful instrumental
        variables or latent-state models.
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Information vs liquidity decomposition</h2>

      <p>
        Total impact = information impact + liquidity
        impact:
      </p>
      <ul>
        <li>
          <strong>Information impact</strong>: the trade
          revealed news, and the price has updated to
          incorporate it. Permanent.
        </li>
        <li>
          <strong>Liquidity impact</strong>: the trade
          temporarily exhausted local supply; price
          recovers as fresh supply arrives. Transient.
        </li>
      </ul>

      <p>
        A long-memory framework helps disentangle. The
        autocorrelation of <em>signed price moves</em>{" "}
        (excluding the order's own contribution) tracks the
        information component; the residual is liquidity-
        driven.
      </p>

      <p>
        Practical implication for execution: if your
        metaorder is uninformed, most of your impact is
        transient and decays after you stop. If you're
        informed, more is permanent — but other people will
        see your trades and start front-running. There's a
        non-trivial trade-off between speed (less time for
        front-running) and impact (more impact per second
        of trading).
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Best-execution algorithms</strong>: TCA,
          slippage forecasts, and execution optimisers all
          run on propagator-style impact models. The
          information-vs-liquidity split sets the right
          execution speed.
        </li>
        <li>
          <strong>Market efficiency reconciliation</strong>:
          the propagator decay is what reconciles "
          predictable order flow" with "approximately
          martingale prices." Without this, the empirical
          stylised facts seem contradictory.
        </li>
        <li>
          <strong>Reflexivity / criticality</strong>: the
          fluctuation-dissipation relation is mathematically
          the same as in critical phase transitions. Markets
          sit near a critical point; small perturbations
          generate amplified responses.
        </li>
        <li>
          <strong>Microstructure preprint context</strong>:
          extensions of the propagator model — multi-asset
          propagators, conditional impact, regime-switching
          kernels — are the active research frontier. The
          long-memory + martingale balance is the central
          constraint to respect.
        </li>
      </ul>

      <p>
        Next chapter: optimal execution. Given an impact
        model, what's the optimal way to split a metaorder
        across time? Almgren–Chriss is the canonical answer.
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
      "Order-flow sign autocorrelation $\\rho(\\tau) = \\mathrm{Corr}(\\varepsilon_t, \\varepsilon_{t+\\tau})$ in equity markets typically decays as…",
    options: [
      "exponentially",
      "$\\rho(\\tau) \\sim \\tau^{-0.5}$ — power law (long memory)",
      "constant",
      "$\\rho(\\tau) = 0$ for $\\tau > 0$",
    ],
    correct: 1,
    explanation:
      "Power law with exponent $\\approx 0.5$, persisting over thousands of trades. Long memory: $\\sum \\rho(\\tau) = \\infty$. Standard explanation: institutional metaorders inject same-sign sequences.",
  },
  {
    prompt:
      "How can prices stay (approximately) martingale despite order-flow being highly autocorrelated?",
    options: [
      "they don't — prices have huge autocorrelation",
      "the propagator decays at exactly the rate that cancels order-flow autocorrelation: $\\beta = (1-\\gamma)/2$",
      "by coincidence",
      "regulators enforce it",
    ],
    correct: 1,
    explanation:
      "Bouchaud-Gefen-Potters-Wyart fluctuation-dissipation. Liquidity providers anticipate predictable flow; the kernel decay matches the autocorrelation. Three exponents are not independent — they're locked together by the martingale condition.",
  },
  {
    prompt: "If $\\rho(\\tau) \\sim \\tau^{-\\gamma}$ and the propagator $G(\\tau) \\sim \\tau^{-\\beta}$, the relation forced by the martingale condition is…",
    options: [
      "$\\beta = \\gamma$",
      "$\\beta = (1 - \\gamma)/2$",
      "$\\beta = 2\\gamma$",
      "$\\beta = 1$",
    ],
    correct: 1,
    explanation:
      "Standard result from the propagator-model derivation. For $\\gamma = 0.5$, gives $\\beta = 0.25$ — matching the empirical decay of transient impact.",
  },
  {
    prompt: "The 'standard explanation' for long memory in order flow is…",
    options: [
      "regulators",
      "metaorders: institutional executions split into many same-sign child orders, naturally generating sign autocorrelation",
      "HFT",
      "noise",
    ],
    correct: 1,
    explanation:
      "Metaorders execute over hours; children inherit the parent's sign. Across many concurrent metaorders with various durations, the aggregate sign series picks up power-law correlations. Lillo-Farmer formalised this.",
  },
  {
    prompt: "Information vs liquidity impact:",
    options: [
      "the same thing",
      "information impact is permanent (trade reveals news); liquidity impact is transient (depleted local supply, recovers as fresh orders arrive)",
      "always equal",
      "only matters for HFT",
    ],
    correct: 1,
    explanation:
      "Decomposition critical for execution-speed optimisation. Uninformed flow → mostly transient → faster is fine. Informed flow → mostly permanent → slower hides intent better. Strategy choice depends on which type of trader you are.",
  },
];
