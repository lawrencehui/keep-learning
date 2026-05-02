import { InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function LobMechanicsBody() {
  return (
    <>
      <p>
        At the lowest level, modern markets are not
        continuous-time price processes. They are discrete
        message streams hitting a matching engine — limit
        orders posted, limit orders cancelled, marketable
        orders crossing the spread. The{" "}
        <strong>limit order book</strong> (LOB) is the data
        structure summarising the resting orders waiting to
        be matched. Before we can talk about impact,
        execution, or market making, we need to know what's
        actually happening on the wire.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Trades, Quotes &amp; Prices Ch 1–4",
            author: "Bouchaud, Bonart, Donier, Gould",
            duration: "Reading",
            url: "https://www.cambridge.org/9781107156609",
            note: "The single best textbook on LOB mechanics and stylised facts.",
          },
          {
            title: "Cartea, Jaimungal, Penalva — Algorithmic and HFT Ch 4",
            author: "Cartea, Jaimungal, Penalva",
            duration: "Reading",
            url: "https://www.cambridge.org/9781107091146",
            note: "Empirical and statistical properties of trades and quotes.",
          },
          {
            title: "Cont — Statistical modeling of high-frequency financial data",
            author: "Rama Cont",
            duration: "Reading (paper)",
            url: "https://arxiv.org/abs/1102.1188",
            note: "Birth-death process model for queue dynamics. Cleanest mathematical treatment.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The order book</h2>

      <p>
        At each instant, the LOB is a set of resting orders,
        each specifying:
      </p>

      <ul>
        <li>
          <strong>Side</strong>: bid (buy) or ask (sell).
        </li>
        <li>
          <strong>Price</strong>: discretised in ticks (e.g. 1
          cent for a typical equity).
        </li>
        <li>
          <strong>Size</strong>: number of units.
        </li>
        <li>
          <strong>Submission time</strong>: for FIFO priority.
        </li>
      </ul>

      <p>
        The book aggregates these into a price-time
        priority structure: at each price level, the queue
        of orders waiting to be filled is FIFO. The{" "}
        <strong>best bid</strong> is the highest price among
        bids; the <strong>best ask</strong> is the lowest
        price among offers. The gap between them is the{" "}
        <strong>spread</strong>; the average is the{" "}
        <strong>mid-price</strong>.
      </p>

      <Callout title="Order types">
        <ul>
          <li>
            <strong>Limit order</strong>: post at a specific
            price; rests on the book.
          </li>
          <li>
            <strong>Market order</strong>: cross the spread
            immediately, eating top-of-book liquidity.
          </li>
          <li>
            <strong>Marketable limit</strong>: limit at or
            beyond the opposite side's best — fills like a
            market order.
          </li>
          <li>
            <strong>Cancel</strong>: remove a previously
            posted limit order.
          </li>
          <li>
            <strong>IOC, FOK, post-only, hidden</strong>:
            modifiers on the above.
          </li>
        </ul>
      </Callout>

      <h3>Trade direction</h3>

      <p>
        For each transaction, we can usually determine
        whether the buyer or seller was the
        liquidity-taker — call this the <strong>trade sign</strong>{" "}
        <InlineMath math="\varepsilon \in \{-1, +1\}" />. The
        Lee–Ready algorithm and its descendants estimate trade
        signs from public data when the originator's identity
        isn't directly observable. Order-flow analysis (next
        chapter) operates on these signs.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Cont's queueing model</h2>

      <p>
        Each price level of the LOB can be modelled as a
        <strong>birth–death process</strong>:
      </p>

      <ul>
        <li>
          <strong>Births</strong>: new limit orders arriving
          at this level (rate{" "}
          <InlineMath math="\lambda(p)" />).
        </li>
        <li>
          <strong>Deaths</strong>: cancellations (rate
          proportional to queue size,{" "}
          <InlineMath math="\theta \cdot Q" />).
        </li>
        <li>
          <strong>Deaths</strong>: market-order
          executions (rate{" "}
          <InlineMath math="\mu(p)" />, also depending on
          where the level sits relative to top of book).
        </li>
      </ul>

      <p>
        At top-of-book, the queue dynamics determine the
        probability of various events: a level depletes
        (price moves), a new level forms inside the spread,
        and so on. Cont and collaborators derived
        closed-form expressions for queue-position
        probabilities — useful for execution algorithms that
        post limit orders.
      </p>

      <Callout title="Queue position matters">
        Two limit orders at the same price level have very
        different fill probabilities depending on their
        position in the queue. A 100-unit order at the front
        of a 200-unit queue fills before a 100-unit order
        behind it — even at the same price.
      </Callout>

      <p>
        This makes "post early" a real consideration for
        passive strategies. Pegging (auto-repricing to follow
        the touch) trades queue position for guaranteed
        top-of-book status.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Stylised facts</h2>

      <p>
        Statistical regularities that hold across most liquid
        equity, futures, and FX markets. Any model of LOB
        dynamics must reproduce these to be taken seriously.
      </p>

      <ul>
        <li>
          <strong>Heavy-tailed returns</strong>: log-return
          distributions have fat tails, with tail exponent{" "}
          <InlineMath math="\alpha \approx 3-5" />. Far from
          Gaussian for short horizons.
        </li>
        <li>
          <strong>Volatility clustering</strong>: volatility
          today predicts volatility tomorrow.
          Auto-correlation of squared returns decays as a
          power law over hours-to-days.
        </li>
        <li>
          <strong>Long-memory order flow</strong>: trade-sign
          autocorrelation decays as{" "}
          <InlineMath math="\tau^{-\gamma}" /> with{" "}
          <InlineMath math="\gamma \approx 0.5" />. (Chapter
          3 is devoted to this.)
        </li>
        <li>
          <strong>Intraday U-shape</strong>: trading
          activity, volatility, and spreads are highest at
          open and close, lowest mid-day.
        </li>
        <li>
          <strong>Square-root impact</strong>: market impact
          of metaorders scales as{" "}
          <InlineMath math="\sigma \sqrt{Q/V}" />. (Chapter
          2.)
        </li>
        <li>
          <strong>Bid–ask bounce</strong>: short-horizon
          returns have negative autocorrelation due to
          alternating fills against bid and ask.
        </li>
        <li>
          <strong>Spread vs volatility</strong>: spread and
          volatility are positively correlated (Madhavan-
          Smidt: spread compensates dealers for adverse
          selection).
        </li>
      </ul>

      <p>
        Ignoring any of these is a common failure mode for
        toy models. Modern microstructure research aims to
        derive these regularities from first principles —
        microscopic order-arrival models with the right
        statistical properties.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Agent ecology</h2>

      <p>
        The LOB sees orders from heterogeneous agents, each
        with different incentives and trading patterns:
      </p>

      <ul>
        <li>
          <strong>Market makers</strong>: post both sides of
          the spread, profit from bid-ask. Need to manage
          inventory risk.
        </li>
        <li>
          <strong>HFT (high-frequency)</strong>: latency-
          sensitive strategies including market making,
          statistical arb, and short-horizon directional
          trades.
        </li>
        <li>
          <strong>Slow institutions</strong>: pension funds,
          mutual funds, endowments. Trade in large blocks
          via execution algorithms (TWAP, VWAP, IS).
          Generate metaorders (Chapter 2).
        </li>
        <li>
          <strong>Retail</strong>: small, discretionary,
          often noise-trading.
        </li>
        <li>
          <strong>Informed</strong>: agents acting on
          private signals. Arrival is correlated with
          subsequent price moves.
        </li>
      </ul>

      <p>
        The interplay between informed and uninformed agents
        drives <strong>adverse selection</strong>: market
        makers post both sides; informed traders pick off
        whichever side is mispriced. The market maker has to
        widen the spread to compensate. This is the
        Glosten-Milgrom and Kyle-style microstructure theory.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Tick size, fragmentation, latency</h2>

      <h3>Tick size</h3>

      <p>
        The minimum price increment. Larger ticks: deeper
        queues, smoother microstructure, more queue-position
        importance. Smaller ticks: tighter spreads, more
        levels, more "pennying" behaviour. Regulatory tick
        size schedules (e.g. SEC's tick-size pilot) can
        shift market behaviour materially.
      </p>

      <h3>Fragmentation</h3>

      <p>
        US and European equities trade across many venues
        simultaneously (NYSE, NASDAQ, BATS, dark pools).
        Modern best-execution requires routing to the venue
        with best price + queue position + fill probability.
        Inter-venue arbitrage and latency races are
        rampant.
      </p>

      <h3>Latency</h3>

      <p>
        The HFT race takes place at microsecond timescales.
        Co-located servers, FPGAs, and dedicated microwave
        links have shaved order-routing times below 10
        microseconds. Latency arbitrage (the "race"
        described by Eric Budish) is a tax on slow traders
        and a primary regulatory concern.
      </p>

      <Pitfall>
        Backtest results based on historical mid-prices
        (without modelling slippage, fill probability, and
        queue position) systematically overestimate strategy
        performance. Real-world execution is a battle
        against adverse selection and queue mechanics, not
        an idealised mid-price oracle.
      </Pitfall>

      <Exercise prompt="A market has a tick size of 1 cent. The bid is at $99.99 with 1000 shares queued, and the ask is at $100.00 with 500 shares queued. A 200-share marketable buy order arrives. What happens?">
        <p>
          The marketable buy crosses the spread and consumes
          the top of the ask. 200 shares fill at $100.00.
          Remaining ask queue: 300 shares at $100.00 (
          slightly different volume, depending on FIFO
          allocation).
        </p>
        <p>
          The mid-price is unchanged ($99.995); the spread
          is unchanged. But order book imbalance has
          shifted: bid queue 1000 vs ask queue 300 now —
          that imbalance often predicts short-term mid-price
          moves.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Foundation for everything that follows</strong>.
          Market impact, execution algorithms, and market
          making all build on LOB mechanics. Without this
          chapter, the next four are floating in midair.
        </li>
        <li>
          <strong>Stylised facts as targets</strong>: any
          model proposed in academia or industry is judged
          by whether it reproduces the long list of
          empirical regularities. Heavy tails, vol
          clustering, square-root impact — they're the
          test.
        </li>
        <li>
          <strong>Practical execution</strong>: if you're
          implementing trading strategies, queue position,
          tick size, and venue choice are first-order
          concerns. Treating the market as a continuous
          mid-price diffuser is a recipe for
          underperformance.
        </li>
      </ul>

      <p>
        Next chapter: market impact and the square-root law
        — perhaps the most striking empirical regularity in
        all of microstructure.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt: "The 'best bid' is…",
    options: [
      "the lowest bid",
      "the highest price among resting bid (buy) orders",
      "the average bid price",
      "the median",
    ],
    correct: 1,
    explanation:
      "Highest bid = best buyer's price. Best ask = lowest seller's price. Spread = ask − bid. Mid-price = average of best bid and best ask.",
  },
  {
    prompt: "Cont's queue model treats each LOB price level as a…",
    options: [
      "deterministic process",
      "birth-death process with arrivals (limit orders) and departures (cancellations + executions)",
      "Markov chain with constant transitions",
      "random walk",
    ],
    correct: 1,
    explanation:
      "Limit orders arrive (births), cancellations and market-order executions remove them (deaths). Cont and collaborators derived closed-form queue dynamics under this framework.",
  },
  {
    prompt: "Order-flow autocorrelation in equity markets typically…",
    options: [
      "is zero",
      "decays exponentially in lag",
      "decays as a power law $\\tau^{-\\gamma}$ with $\\gamma \\approx 0.5$ (long memory)",
      "alternates sign",
    ],
    correct: 2,
    explanation:
      "Long memory of order signs is one of the most-cited stylised facts. Power-law decay with $\\gamma \\approx 0.5$ across many markets and time periods. Hawkes processes with power-law kernels reproduce it.",
  },
  {
    prompt: "Adverse selection in market making refers to…",
    options: [
      "all traders being informed",
      "informed traders preferentially picking off mispriced quotes, forcing market makers to widen the spread",
      "good prices for liquidity providers",
      "the SEC's enforcement",
    ],
    correct: 1,
    explanation:
      "Informed traders systematically choose the side that's mispriced; market makers can't tell informed from uninformed flow. Spread compensates for this. Glosten-Milgrom is the classic model.",
  },
  {
    prompt:
      "Two limit orders at the same price differ in fill probability because…",
    options: [
      "of luck",
      "FIFO queue priority — earlier orders fill first",
      "different brokers route differently",
      "no — they're equivalent",
    ],
    correct: 1,
    explanation:
      "Same price, but earlier in queue = sooner to fill. 'Queue position' is a real strategy variable. Pegging (auto-repricing) trades queue position for top-of-book status.",
  },
];
