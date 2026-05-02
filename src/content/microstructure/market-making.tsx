import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function MarketMakingBody() {
  return (
    <>
      <p>
        The other side of the trade. Market makers provide
        liquidity by quoting both bid and ask, profiting
        from the spread but exposed to inventory risk and
        adverse selection. The Avellaneda-Stoikov framework
        is the canonical model for optimal market-making
        — and the climax of this pathway, since it pulls
        together stochastic calculus (Module VII), optimal
        control, and Bayesian inference (Module V).
      </p>

      <ReferenceResources
        items={[
          {
            title: "Avellaneda, Stoikov — High-frequency trading in a limit order book",
            author: "Marco Avellaneda, Sasha Stoikov",
            duration: "Reading (paper)",
            url: "https://math.nyu.edu/~avellane/HighFrequencyTrading.pdf",
            note: "The 2008 paper. The single most-cited HFT framework in academia.",
          },
          {
            title:
              "Cartea, Jaimungal, Penalva — Algorithmic and HFT Ch 10",
            author: "Cartea, Jaimungal, Penalva",
            duration: "Reading",
            url: "https://www.cambridge.org/9781107091146",
            note: "Modern stochastic-control treatment with explicit HJB and value-function derivations.",
          },
          {
            title: "Guéant, Lehalle, Fernandez-Tapia — Dealing with the inventory risk",
            author: "Guéant, Lehalle, Fernandez-Tapia",
            duration: "Reading (paper)",
            url: "https://hal.archives-ouvertes.fr/hal-00626395",
            note: "Closed-form approximations to Avellaneda-Stoikov solutions, used in production HFT.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The market-maker's problem</h2>

      <p>
        Setup. A market maker quotes bid{" "}
        <InlineMath math="p^b" /> and ask{" "}
        <InlineMath math="p^a" /> around a mid-price{" "}
        <InlineMath math="S_t" />. Buyers fill the ask; sellers
        fill the bid. Each fill changes the maker's
        inventory <InlineMath math="q_t" />:
      </p>
      <ul>
        <li>
          Ask filled: maker sells, inventory{" "}
          <InlineMath math="q \to q - 1" />.
        </li>
        <li>
          Bid filled: maker buys, inventory{" "}
          <InlineMath math="q \to q + 1" />.
        </li>
      </ul>

      <p>
        Mid-price diffuses as Brownian motion (Module VII):
      </p>
      <BlockMath math="dS_t = \sigma \, dW_t." />

      <p>
        Fill events are Poisson processes (Module IV) whose
        intensities{" "}
        <InlineMath math="\lambda^a" />,{" "}
        <InlineMath math="\lambda^b" /> depend on the maker's
        quote distance from mid:
      </p>
      <BlockMath math="\lambda^a(\delta^a) = A e^{-k \delta^a}, \quad \lambda^b(\delta^b) = A e^{-k \delta^b}" />

      <p>
        with{" "}
        <InlineMath math="\delta^a = p^a - S" /> and{" "}
        <InlineMath math="\delta^b = S - p^b" /> the half-
        spreads. Quote tighter (smaller{" "}
        <InlineMath math="\delta" />) and you fill more
        often, but earn less per fill. Standard exponential-
        decay model fits empirical fill rates reasonably well
        for moderate distances.
      </p>

      <p>
        Wealth process:
      </p>
      <BlockMath math="X_t = \text{cash} + q_t S_t." />

      <p>
        At terminal time{" "}
        <InlineMath math="T" />, the maker liquidates inventory
        at mid:{" "}
        <InlineMath math="X_T = X_T^{\text{cash}} + q_T S_T" />.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The objective</h2>

      <Callout title="Avellaneda-Stoikov utility">
        Maximise expected exponential utility of terminal
        wealth:
        <BlockMath math="V(t, x, q, s) = \max E_t[-\exp(-\gamma X_T)]." />
        <InlineMath math="\gamma" /> = risk aversion.
      </Callout>

      <p>
        Exponential utility is convenient because it
        decomposes the problem and gives quasi-closed-form
        solutions. Equivalently (for small{" "}
        <InlineMath math="\gamma" />), maximise mean-variance
        of terminal wealth.
      </p>

      <p>
        Two competing forces:
      </p>
      <ul>
        <li>
          <strong>Earn the spread</strong>: tight quotes, more
          fills, more spread captured.
        </li>
        <li>
          <strong>Manage inventory</strong>: long inventory
          exposes the maker to downside; risk aversion
          penalises this.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · The HJB equation</h2>

      <p>
        Apply dynamic programming. Bellman / Hamilton-
        Jacobi-Bellman:
      </p>
      <BlockMath math="\partial_t V + \tfrac{1}{2}\sigma^2 \partial_{ss}^2 V + \max_{\delta^a} \lambda^a(\delta^a)[V(t, x + p^a, q - 1, s) - V] + \max_{\delta^b} \lambda^b(\delta^b)[V(t, x - p^b, q + 1, s) - V] = 0." />

      <p>
        Terminal condition:{" "}
        <InlineMath math="V(T, x, q, s) = -\exp(-\gamma(x + qs))" />.
        Solve via separation of variables — the exponential
        utility makes this work.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Closed-form solution</h2>

      <p>
        After substantial algebra (see the paper), the
        optimal quotes are:
      </p>

      <Callout title="Indifference price and half-spread">
        <strong>Indifference (reservation) price</strong>{" "}
        — what the maker considers the "fair" price given
        their inventory:
        <BlockMath math="p_{\text{ind}}(t, q) = S_t - q \gamma \sigma^2 (T - t)." />
        <strong>Optimal half-spread</strong> (symmetric):
        <BlockMath math="\delta^a = \delta^b = \tfrac{1}{2}\gamma\sigma^2(T-t) + \tfrac{1}{\gamma}\log(1 + \gamma/k)." />
      </Callout>

      <p>
        Three takeaways:
      </p>

      <h3>1 · Inventory skews the indifference price</h3>

      <p>
        With long inventory{" "}
        <InlineMath math="q > 0" />, the indifference price
        is <em>below</em> the mid (the maker will accept a
        lower price to offload). Translation: maker quotes
        ask <em>tighter</em> (closer to mid) and bid{" "}
        <em>wider</em> (further from mid) than usual.
      </p>

      <h3>2 · Inventory penalty grows with time-to-go</h3>

      <p>
        The factor{" "}
        <InlineMath math="\gamma \sigma^2 (T - t)" /> grows
        with how long the maker still has to hold. Earlier in
        the day = bigger penalty. Late in the day with little
        time left = smaller penalty (less time to be hurt by
        adverse moves).
      </p>

      <h3>3 · Half-spread is the indifference adjustment plus a fill-aggressiveness term</h3>

      <p>
        The first term in the half-spread reflects inventory
        risk; the second{" "}
        <InlineMath math="\tfrac{1}{\gamma}\log(1 + \gamma/k)" />{" "}
        is the "myopic" optimal half-spread that maximises
        instantaneous expected profit given the
        fill-intensity model. Sum them and you get the
        optimal quotes.
      </p>

      <Pitfall>
        Avellaneda-Stoikov assumes:
        <ul>
          <li>
            BM mid-price (no jumps).
          </li>
          <li>
            Exponential fill intensities.
          </li>
          <li>
            Continuous quote adjustment.
          </li>
          <li>
            No adverse selection between informed and
            uninformed flow.
          </li>
        </ul>
        Real markets violate every assumption. The framework
        is a starting point; production strategies layer on
        adverse-selection models, microstructure-aware fill
        intensities, and latency-aware quote updates.
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · The Guéant-Lehalle-Fernandez-Tapia approximation</h2>

      <p>
        For practical use, the closed-form involves slow
        elliptic functions and inventory-dependent
        nonlinearities. GLFT (2013) gave a faster, accurate
        approximation:
      </p>
      <BlockMath math="\delta^a \approx \tfrac{1}{2}\gamma\sigma^2(T-t)(2q+1) + c_1," />
      <BlockMath math="\delta^b \approx \tfrac{1}{2}\gamma\sigma^2(T-t)(1-2q) + c_1." />

      <p>
        The asymmetric terms encode inventory skew: longer
        inventory tightens the ask and widens the bid.
        Computationally cheap; almost always close to the
        full solution.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Adverse selection</h2>

      <p>
        Real makers face informed traders who know more
        about price direction than the maker. Quote-adjusting
        models (Glosten-Milgrom, Kyle) treat order flow as
        a mix of informed and uninformed:
      </p>
      <ul>
        <li>
          Uninformed orders are random (zero average info).
        </li>
        <li>
          Informed orders predict price moves (positive info).
        </li>
      </ul>

      <p>
        After observing flow, the maker updates beliefs about
        true value (Bayesian inference, Module V). Quotes adjust
        accordingly. In the long run, the spread compensates
        for adverse selection — this is{" "}
        <strong>Glosten's spread decomposition</strong>{" "}
        (cost-of-information component vs liquidity-providing
        component).
      </p>

      <h3>Information-aware market making</h3>

      <p>
        Modern HFT extensions to Avellaneda-Stoikov add:
      </p>
      <ul>
        <li>
          Latent informed-flow component (Hawkes process or
          hidden Markov state).
        </li>
        <li>
          Jump-diffusion price (vs pure BM).
        </li>
        <li>
          Microstructure-aware fill intensities (depend on
          queue position and book imbalance, not just
          spread distance).
        </li>
        <li>
          Latency-induced fill probability adjustments.
        </li>
      </ul>

      <p>
        Each adds complexity and pushes the analytical
        solution further; many production strategies use
        deep RL or numerical control on the resulting HJB
        rather than closed-form.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Practical lessons</h2>

      <ul>
        <li>
          <strong>Skew with inventory</strong>: tighten
          quotes on the side that reduces inventory risk;
          widen on the side that adds inventory.
        </li>
        <li>
          <strong>Spread when uncertain</strong>: high
          volatility → wider spreads. The maker needs more
          compensation for the wider distribution of future
          mid prices.
        </li>
        <li>
          <strong>Manage inventory aggressively</strong>:
          near end-of-day, accept worse fills to flatten
          rather than hold overnight.
        </li>
        <li>
          <strong>Adverse-selection risk</strong>: HFT
          makers monitor short-term price predictability;
          when conditions look adverse (heavy informed
          flow), they pull quotes or widen materially.
        </li>
      </ul>

      <Exercise prompt="A market maker has long inventory $q = 10$ shares, with $\\sigma = 0.01$, $\\gamma = 0.1$, $T - t = 100$ minutes. By how much is the indifference price below the mid?">
        <p>
          <InlineMath math="p_{\text{ind}} - S = -q \gamma \sigma^2 (T - t) = -10 \cdot 0.1 \cdot 0.0001 \cdot 100 = -0.01" />.
        </p>
        <p>
          One cent below mid. The maker treats fair value as
          one cent lower because they're long and want to
          offload. Translates to tighter ask and wider bid by
          roughly half a cent each.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>The HFT recipe</strong>. Avellaneda-Stoikov
          + extensions are the standard playbook for any
          market-making strategy. Production HFT desks tune
          variants daily.
        </li>
        <li>
          <strong>Liquidity provision</strong>: most resting
          liquidity in modern markets comes from algorithmic
          market makers using these models. Without them,
          spreads would be much wider.
        </li>
        <li>
          <strong>Reflexive structure</strong>: market
          makers' optimal quotes depend on order-flow
          intensities, which depend on the quotes.
          Self-consistent solutions emerge — and small
          perturbations (large flow, regime change) can
          shift behaviour dramatically.
        </li>
        <li>
          <strong>Microstructure preprint context</strong>:
          modern research on optimal market making
          incorporates Hawkes-process flow, propagator
          impact, and explicit information models. Each
          extension brings the math closer to real-market
          performance.
        </li>
        <li>
          <strong>Closes the loop</strong>: market makers
          set the spread; their optimal spread depends on
          impact and adverse selection; impact and adverse
          selection depend on order flow; order flow's long
          memory is the propagator's other side. The
          microstructure ecosystem is one tightly-coupled
          mathematical object — and you've now seen all the
          parts.
        </li>
      </ul>

      <p>
        Module VIII is now complete. We've gone from limit-
        order-book mechanics to the canonical optimal-
        execution and market-making frameworks, with
        impact, propagators, and long-memory order flow as
        the connective tissue. This is also the climax of
        the entire pathway:{" "}
        <strong>linear algebra → calculus → probability →
        statistics → ML → stochastic calculus → market
        microstructure</strong>. Every prior module feeds into
        what we just did. Eight modules, ~32 chapters of
        prose: now you have the math toolkit to read the
        microstructure literature critically, calibrate
        impact models, and design execution and
        market-making strategies grounded in modern theory.
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
      "Avellaneda-Stoikov maximises…",
    options: [
      "expected number of fills",
      "expected exponential utility of terminal wealth: $E[-\\exp(-\\gamma X_T)]$",
      "the spread",
      "trading volume",
    ],
    correct: 1,
    explanation:
      "Risk-averse expected utility. Trade-off: tight quotes earn spread but risk inventory; wide quotes have less inventory risk but fewer fills. Closed-form solution emerges via HJB equation.",
  },
  {
    prompt:
      "The Avellaneda-Stoikov indifference price for a maker with long inventory $q$ is…",
    options: [
      "above the mid",
      "below the mid: $p_{\\text{ind}} = S - q \\gamma \\sigma^2 (T-t)$",
      "equal to the mid",
      "the same regardless of $q$",
    ],
    correct: 1,
    explanation:
      "Long inventory ⇒ indifference price below mid (maker accepts a lower price to offload). Quote ask tighter, bid wider. Symmetric for short inventory.",
  },
  {
    prompt:
      "Why does Avellaneda-Stoikov skew quotes with inventory?",
    options: [
      "to manipulate prices",
      "to manage inventory risk: long position incentivises selling, so tighten ask and widen bid",
      "to maximise spread",
      "by accident",
    ],
    correct: 1,
    explanation:
      "Inventory exposure is risky, especially with $T - t$ remaining. Optimal control rebalances quotes to push inventory toward zero. Magnitude scales with $\\gamma \\sigma^2 (T-t)$.",
  },
  {
    prompt: "Adverse selection in market-making refers to…",
    options: [
      "all traders being informed",
      "informed flow systematically picks off mispriced quotes; spread compensates the maker for this",
      "regulators interfering",
      "order timing",
    ],
    correct: 1,
    explanation:
      "Glosten-Milgrom theory. Informed traders trade against mispriced quotes; uninformed don't. Spread reveals the equilibrium between maker compensation and informed exploitation. Modern HFT extensions of A-S explicitly model informed flow.",
  },
  {
    prompt:
      "The Guéant-Lehalle-Fernandez-Tapia (GLFT) approximation to Avellaneda-Stoikov…",
    options: [
      "is exactly the same",
      "gives a faster, computationally cheap closed-form approximation that's accurate enough for most practical applications",
      "is more accurate but slower",
      "is for the buy side only",
    ],
    correct: 1,
    explanation:
      "Closed-form approximations replace the elliptic-function structure of the full A-S solution. Used in production HFT for real-time quote computation.",
  },
];
