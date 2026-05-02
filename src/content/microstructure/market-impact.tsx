import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function MarketImpactBody() {
  return (
    <>
      <p>
        Market impact is what happens to the price when you
        trade: pushing a billion through the limit order
        book costs more than the spread, and the cost scales
        in a remarkably regular way. The square-root impact
        law{" "}
        <InlineMath math="\Delta p \sim \sigma \sqrt{Q/V}" /> is
        one of the strongest empirical regularities in all
        of finance, robust across markets, asset classes, and
        decades. Understanding why it holds — and what's
        permanent vs transient — drives modern execution
        algorithms.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Trades, Quotes &amp; Prices Ch 11",
            author: "Bouchaud, Bonart, Donier, Gould",
            duration: "Reading",
            url: "https://www.cambridge.org/9781107156609",
            note: "The canonical exposition of market impact and the square-root law.",
          },
          {
            title: "Tóth et al. — Anomalous price impact and the critical nature of liquidity",
            author: "Tóth, Lemperière, Deremble, et al.",
            duration: "Reading (paper)",
            url: "https://arxiv.org/abs/1105.1694",
            note: "Empirical paper plus the latent-liquidity theory that explains why $\\sqrt{Q}$ emerges.",
          },
          {
            title: "Donier, Bouchaud — A fully consistent, minimal model for the square-root impact",
            author: "Donier, Bouchaud, Bonart, Gould",
            duration: "Reading (paper)",
            url: "https://arxiv.org/abs/1412.0141",
            note: "Theoretical derivation from a diffusing latent-liquidity reservoir.",
          },
          {
            title:
              "Almgren, Thum, Hauptmann, Li — Direct estimation of equity market impact",
            author: "Robert Almgren et al.",
            duration: "Reading (paper)",
            url: "https://www.courant.nyu.edu/~almgren/papers/costestim.pdf",
            note: "Citadel-style empirical estimation of impact components.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · What is market impact?</h2>

      <p>
        A trader executes a <strong>metaorder</strong> of
        total size <InlineMath math="Q" /> by splitting it
        into many child orders over a period. The market
        price moves while this happens. Define:
      </p>

      <ul>
        <li>
          <InlineMath math="p_{\text{start}}" />: mid-price at
          metaorder start.
        </li>
        <li>
          <InlineMath math="p_{\text{end}}" />: mid-price at
          metaorder end.
        </li>
        <li>
          <InlineMath math="p_{\text{after}}" />: mid-price
          after impact has fully decayed.
        </li>
      </ul>

      <Callout title="Three impact measures">
        <ul>
          <li>
            <strong>Peak impact</strong>{" "}
            <InlineMath math="\Delta p = p_{\text{end}} - p_{\text{start}}" />:
            price move during execution.
          </li>
          <li>
            <strong>Permanent impact</strong>{" "}
            <InlineMath math="I_{\text{perm}} = p_{\text{after}} - p_{\text{start}}" />:
            price move that persists.
          </li>
          <li>
            <strong>Transient impact</strong>{" "}
            <InlineMath math="I_{\text{trans}} = p_{\text{end}} - p_{\text{after}}" />:
            the part that decays away.
          </li>
        </ul>
      </Callout>

      <p>
        Splitting into permanent + transient is the
        canonical decomposition. The permanent component is
        information being incorporated into the price; the
        transient component is the temporary supply-demand
        imbalance that liquidity providers eventually fade.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The square-root law</h2>

      <Callout title="Empirical regularity">
        <BlockMath math="\Delta p \sim \sigma \sqrt{\frac{Q}{V}}" />
        where <InlineMath math="\sigma" /> is daily
        volatility and <InlineMath math="V" /> is daily volume.
      </Callout>

      <p>
        Robust across:
      </p>

      <ul>
        <li>
          <strong>Markets</strong>: equities (US, EU, Asia),
          futures, FX, crypto.
        </li>
        <li>
          <strong>Sizes</strong>: from tens of shares up to
          large fractions of daily volume.
        </li>
        <li>
          <strong>Decades</strong>: holds in 1980s data and
          modern HFT-era data alike.
        </li>
      </ul>

      <p>
        This robustness is striking. Naive supply-demand
        intuition would predict <em>linear</em> impact —
        twice the size, twice the price move. The data say
        no: doubling{" "}
        <InlineMath math="Q" /> only multiplies impact by{" "}
        <InlineMath math="\sqrt 2 \approx 1.41" />.
      </p>

      <Pitfall>
        The constant in front of{" "}
        <InlineMath math="\sigma \sqrt{Q/V}" /> is roughly
        <InlineMath math="0.5" />–<InlineMath math="2" />{" "}
        across calibrations, with some dependence on tick
        size and execution style. The functional form is
        what's universal; the prefactor varies.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Why $\sqrt Q$? Latent liquidity</h2>

      <p>
        The Tóth-Bouchaud explanation is the most accepted.
        The argument:
      </p>

      <ol>
        <li>
          <strong>Visible LOB liquidity is small</strong>: at
          any moment, only a tiny fraction of total potential
          liquidity is posted. Most "would-be" orders are
          held back, ready to react to price moves.
        </li>
        <li>
          <strong>Latent supply density</strong>: imagine a
          smooth supply curve{" "}
          <InlineMath math="L(p)" />, the volume of latent
          orders at each price level{" "}
          <InlineMath math="p" />. Empirically,{" "}
          <InlineMath math="L(p) \propto |p - p_0|" /> near
          the current mid — linearly increasing in distance
          from current price.
        </li>
        <li>
          <strong>Price moves to clear demand</strong>: to
          buy total <InlineMath math="Q" />, the price must
          move from <InlineMath math="p_0" /> to{" "}
          <InlineMath math="p_0 + \Delta p" /> such that the
          area under{" "}
          <InlineMath math="L" /> equals{" "}
          <InlineMath math="Q" />:
          <BlockMath math="\int_0^{\Delta p} L(p) \, dp \propto (\Delta p)^2 = Q." />
        </li>
        <li>
          <strong>Therefore</strong>{" "}
          <InlineMath math="\Delta p \propto \sqrt Q" />.
        </li>
      </ol>

      <p>
        The <em>linear</em> latent supply density{" "}
        <InlineMath math="L(p) \propto |p|" /> is the
        critical input — it can be derived from a
        diffusion-based model of latent traders (Donier-
        Bouchaud) where the system sits near a "critical"
        state.
      </p>

      <Callout title="Critical liquidity">
        Markets sit near a state where visible liquidity is
        marginal. Small amounts of trading exhaust local
        supply quickly, generating outsized price moves.
        This near-criticality is the deep reason behind the
        square-root law.
      </Callout>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Permanent vs transient impact</h2>

      <p>
        After execution ends, the price doesn't stay at{" "}
        <InlineMath math="p_{\text{end}}" /> forever. Some of
        the impact decays — typically over hours to a day —
        as liquidity providers fade their adverse positions.
      </p>

      <p>
        Empirically:
      </p>
      <ul>
        <li>
          <strong>Permanent impact</strong>: roughly 1/3 to
          2/3 of peak impact. Linear in trade size for small
          metaorders, sub-linear for big ones.
        </li>
        <li>
          <strong>Transient impact</strong>: decays as a
          power law in time after metaorder end,{" "}
          <InlineMath math="I_{\text{trans}}(t) \sim t^{-\beta}" />,{" "}
          <InlineMath math="\beta \approx 1/4" />.
        </li>
      </ul>

      <p>
        Different ratios depending on:
      </p>
      <ul>
        <li>
          Execution speed (faster = more transient impact).
        </li>
        <li>
          Information content (informed = more permanent).
        </li>
        <li>
          Asset volatility (more volatile = larger
          permanent component).
        </li>
      </ul>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · The propagator model</h2>

      <p>
        Bouchaud's <strong>propagator model</strong> is the
        cleanest mathematical expression of impact dynamics:
      </p>

      <Callout title="Propagator model">
        <BlockMath math="p_t - p_0 = \sum_{s < t} G(t - s) \, \xi_s + \text{noise}" />
        where <InlineMath math="\xi_s" /> is the signed
        order flow (typically{" "}
        <InlineMath math="\xi = \varepsilon \cdot \sqrt v" />{" "}
        with sign{" "}
        <InlineMath math="\varepsilon" /> and per-trade
        size <InlineMath math="v" />), and{" "}
        <InlineMath math="G" /> is the{" "}
        <strong>impact propagator</strong> — the kernel
        describing how trades push price.
      </Callout>

      <p>
        Reading the formula:
      </p>
      <ul>
        <li>
          Each past trade <InlineMath math="\xi_s" /> moves
          the price by{" "}
          <InlineMath math="G(t - s) \xi_s" /> at time{" "}
          <InlineMath math="t" />.
        </li>
        <li>
          The kernel{" "}
          <InlineMath math="G" /> decays as a power law:{" "}
          <InlineMath math="G(\tau) \sim \tau^{-\beta}" /> with{" "}
          <InlineMath math="\beta \approx 0.4-0.5" />.
        </li>
        <li>
          Over time, trade impact "fades" — but not
          exponentially.
        </li>
      </ul>

      <p>
        The propagator model unifies square-root impact with
        order-flow long memory (next chapter): the kernel
        decay matches the order-flow autocorrelation in a
        way that maintains martingale prices. This is
        beautiful and not at all obvious; we'll unpack the
        argument in detail.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Metaorder cost decomposition</h2>

      <p>
        The total cost of executing a metaorder of size{" "}
        <InlineMath math="Q" /> over duration{" "}
        <InlineMath math="T" /> decomposes into:
      </p>

      <ol>
        <li>
          <strong>Half-spread</strong>: cost of crossing the
          spread for each child order. Linear in number of
          orders;{" "}
          <InlineMath math="O(Q/v_{\text{child}})" />.
        </li>
        <li>
          <strong>Impact</strong>: cumulative price drift
          due to the metaorder's own pressure. Scales as{" "}
          <InlineMath math="\sigma \sqrt{Q/V}" />.
        </li>
        <li>
          <strong>Volatility cost</strong>: random walk of
          the price during execution. Risk that the price
          moves against you for unrelated reasons. Scales as{" "}
          <InlineMath math="\sigma \sqrt T" />.
        </li>
      </ol>

      <p>
        Total cost (for buy):
      </p>
      <BlockMath math="\text{Cost} \sim \frac{1}{2}\text{spread} + c_1 \sigma \sqrt{Q/V} + \text{noise}." />

      <p>
        Optimal execution (Chapter 4) seeks to minimise
        impact + variance, trading off speed against price
        risk.
      </p>

      <Exercise prompt="A trader wants to buy 1% of daily volume of a stock with daily volatility 2%. Estimate the impact cost using $\\sqrt{Q/V}$ scaling.">
        <p>
          <InlineMath math="\Delta p / p \approx \sigma \sqrt{Q/V} = 0.02 \cdot \sqrt{0.01} = 0.02 \cdot 0.1 = 0.002 = 20 \text{ bps}" />.
        </p>
        <p>
          Buying 1% of daily volume costs about 20 basis
          points of impact, on top of the spread. For a
          $100M trade, that's $200K — material, and worth
          spreading the trade over time to reduce.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Trade-cost analysis (TCA)</strong>: every
          institutional desk uses impact models to estimate
          slippage. Square-root impact + propagator dynamics
          is the modern industry standard.
        </li>
        <li>
          <strong>Optimal execution</strong>: Almgren-Chriss
          (Chapter 4) plus its extensions to non-linear
          impact. Splits big trades into many small ones to
          minimise total cost.
        </li>
        <li>
          <strong>Capacity and scaling</strong>: a strategy
          that's profitable at small size becomes
          unprofitable at large size when impact eats the
          alpha. Square-root scaling means "doubling capacity
          costs 1.41× more impact, not 2×."
        </li>
        <li>
          <strong>Theoretical microstructure</strong>: the
          square-root law's universality across markets is
          one of the strongest constraints on theory. Any
          model that doesn't reproduce it is incomplete.
        </li>
      </ul>

      <p>
        Next chapter: order-flow long memory, propagator
        decay, and the surprising fact that prices stay
        martingale even though signed order flow is highly
        predictable.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt: "The square-root impact law states that for a metaorder of size $Q$…",
    options: [
      "$\\Delta p \\sim Q$ — linear",
      "$\\Delta p \\sim \\sigma \\sqrt{Q/V}$",
      "$\\Delta p$ is constant",
      "$\\Delta p \\sim Q^2$",
    ],
    correct: 1,
    explanation:
      "Robust across markets and decades. Doubling $Q$ multiplies impact by $\\sqrt 2$, not $2$. The Tóth-Bouchaud derivation explains it via a linearly-increasing latent supply density.",
  },
  {
    prompt:
      "Why is impact a square-root rather than linear in $Q$?",
    options: [
      "by coincidence",
      "the latent supply density grows linearly with distance from current price; integrating linear density to get total volume gives quadratic, hence price moves as $\\sqrt Q$",
      "transaction costs",
      "regulation",
    ],
    correct: 1,
    explanation:
      "Latent liquidity at distance $\\Delta p$ from mid: $L(p) \\propto |\\Delta p|$. Total volume to clear = $\\int_0^{\\Delta p} L = \\tfrac{1}{2}(\\Delta p)^2 \\propto Q$, so $\\Delta p \\propto \\sqrt Q$. Tóth-Bouchaud near-criticality argument.",
  },
  {
    prompt:
      "After a metaorder ends, the transient impact typically…",
    options: [
      "stays forever (permanent)",
      "decays back to zero exponentially",
      "decays as a power law $t^{-\\beta}$ with $\\beta \\approx 1/4$",
      "increases over time",
    ],
    correct: 2,
    explanation:
      "Power-law decay over hours to a day. Liquidity providers fade their adverse positions slowly. The decay exponent matches the order-flow long-memory exponent in a non-coincidental way (next chapter).",
  },
  {
    prompt:
      "The propagator model writes price moves as…",
    options: [
      "$p_t - p_0 = \\xi_t$ — only the current trade",
      "$p_t - p_0 = \\sum_{s<t} G(t-s) \\xi_s$ — convolution of past order flow with a power-law kernel",
      "$p_t - p_0 = $ Brownian motion",
      "$p_t - p_0$ = constant",
    ],
    correct: 1,
    explanation:
      "Each past trade contributes $G(t-s) \\xi_s$ to the current price move. Kernel $G(\\tau) \\sim \\tau^{-\\beta}$ with $\\beta \\approx 0.4-0.5$ — the impact decays slowly, not instantaneously.",
  },
  {
    prompt: "Empirically, market impact is decomposed into…",
    options: [
      "only permanent impact",
      "permanent (price moves that persist) + transient (price moves that decay back)",
      "only transient impact",
      "neither — there's no decomposition",
    ],
    correct: 1,
    explanation:
      "Permanent: information component, persists. Transient: supply-demand component, decays. Roughly 1/3 to 2/3 of peak impact is permanent, depending on execution speed and information content.",
  },
];
