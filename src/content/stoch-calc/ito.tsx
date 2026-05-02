import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function ItoBody() {
  return (
    <>
      <p>
        Brownian paths are continuous but not differentiable,
        so you can't use ordinary calculus on them. The Itô
        integral and Itô's lemma fill the gap. The single
        decisive new feature: a second-order correction term
        coming from the quadratic variation{" "}
        <InlineMath math="dW_t \cdot dW_t = dt" />. With it, we
        can write down — and analyse — every continuous-time
        SDE in finance: geometric Brownian motion,
        Ornstein–Uhlenbeck, Heston, Cox–Ingersoll–Ross, the lot.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Shreve Vol II Ch 4",
            author: "Steven Shreve",
            duration: "Reading",
            url: "https://link.springer.com/book/10.1007/978-0-387-22527-2",
            note: "The canonical exposition of Itô's calculus for finance students.",
          },
          {
            title: "Klebaner — Introduction to Stochastic Calculus with Applications",
            author: "Fima Klebaner",
            duration: "Reference",
            url: "https://www.worldscientific.com/worldscibooks/10.1142/p821",
            note: "Self-contained, with worked examples covering BM, Itô integral, lemma, SDEs.",
          },
          {
            title: "Wilmott — Paul Wilmott on Quantitative Finance",
            author: "Paul Wilmott",
            duration: "Reference",
            url: "https://www.wilmott.com/",
            note: "Less rigorous but very intuitive intuition for Itô calculus and SDE applications.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The Itô integral</h2>

      <p>
        We want to make sense of
      </p>
      <BlockMath math="\int_0^t \sigma_s \, dW_s" />

      <p>
        for an "integrand" process{" "}
        <InlineMath math="\sigma_s" /> and Brownian motion{" "}
        <InlineMath math="W" />. Riemann–Stieltjes integration
        doesn't apply because{" "}
        <InlineMath math="W" /> has unbounded variation. The
        Itô construction fixes this in three steps.
      </p>

      <h3>Step 1: simple processes</h3>

      <p>
        For a step function integrand{" "}
        <InlineMath math="\sigma_s = \sigma_{t_i}" /> on{" "}
        <InlineMath math="[t_i, t_{i+1})" />:
      </p>
      <BlockMath math="\int_0^t \sigma_s \, dW_s = \sum_i \sigma_{t_i} (W_{t_{i+1}} - W_{t_i})." />

      <p>
        Note: <strong>left endpoint</strong>{" "}
        <InlineMath math="t_i" /> is critical. Choosing the
        right endpoint or midpoint gives a different
        integral (Stratonovich, Klimontovich). Itô = left
        endpoint.
      </p>

      <h3>Step 2: Itô isometry</h3>

      <Callout title="Itô isometry">
        For any adapted square-integrable process{" "}
        <InlineMath math="\sigma" />:
        <BlockMath math="E\!\left[\left(\int_0^t \sigma_s \, dW_s\right)^2\right] = E\!\left[\int_0^t \sigma_s^2 \, ds\right]." />
      </Callout>

      <p>
        Variance of an Itô integral = expectation of the
        ordinary integral of{" "}
        <InlineMath math="\sigma^2" />. This isometry extends
        the integral from simple to general adapted processes
        as an{" "}
        <InlineMath math="L^2" /> limit.
      </p>

      <h3>Step 3: martingale property</h3>

      <p>
        The Itô integral is a martingale (with mean zero):
      </p>
      <BlockMath math="E\!\left[\int_0^t \sigma_s \, dW_s\right] = 0." />

      <p>
        Conditional on the past, the future expected change
        is zero. This is what justifies the "no
        riskless arbitrage" arguments in option pricing —
        properly hedged strategies should have zero
        expected drift.
      </p>

      <Pitfall>
        The "left endpoint" choice matters. If you use the
        right endpoint:
        <BlockMath math="\int_0^t W_s \, dW_s^{\text{(right)}} = \tfrac{1}{2} W_t^2 + \tfrac{1}{2} t." />
        with a + sign on the time term, vs the Itô version:
        <BlockMath math="\int_0^t W_s \, dW_s = \tfrac{1}{2} W_t^2 - \tfrac{1}{2} t." />
        Different definitions, different answers. Itô is the
        martingale-friendly one used in finance.
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Itô's lemma</h2>

      <p>
        The chain rule of stochastic calculus. The
        single-most-important formula in mathematical finance.
      </p>

      <Callout title="Itô's lemma (1-D)">
        Suppose{" "}
        <InlineMath math="X_t" /> follows the SDE
        <BlockMath math="dX_t = \mu_t \, dt + \sigma_t \, dW_t" />
        and <InlineMath math="f(t, x)" /> is a smooth function.
        Then
        <BlockMath math="df(t, X_t) = \frac{\partial f}{\partial t} \, dt + \frac{\partial f}{\partial x} \, dX_t + \tfrac{1}{2} \frac{\partial^2 f}{\partial x^2} \sigma_t^2 \, dt." />
      </Callout>

      <p>
        Compare ordinary chain rule{" "}
        <InlineMath math="df = (\partial_t f) \, dt + (\partial_x f) \, dX" />.
        Itô adds a <strong>second-order term</strong>{" "}
        <InlineMath math="\tfrac{1}{2} \partial_{xx} f \cdot \sigma^2 \, dt" />{" "}
        from the{" "}
        <InlineMath math="dW \cdot dW = dt" /> rule. That term
        is the soul of stochastic calculus.
      </p>

      <h3>Heuristic derivation</h3>

      <p>
        Taylor-expand{" "}
        <InlineMath math="f" /> to second order:
      </p>
      <BlockMath math="df = (\partial_t f) \, dt + (\partial_x f) \, dX + \tfrac{1}{2}(\partial_{xx} f) (dX)^2 + O((dt)^2, dt \, dX)." />

      <p>
        Now compute{" "}
        <InlineMath math="(dX)^2 = (\mu \, dt + \sigma \, dW)^2 = \sigma^2 \, dW \cdot dW = \sigma^2 \, dt" />,
        keeping only the leading{" "}
        <InlineMath math="O(dt)" /> term (
        <InlineMath math="dt \cdot dt = 0" />,{" "}
        <InlineMath math="dt \cdot dW = 0" />). Substitute:
      </p>
      <BlockMath math="df = (\partial_t f) \, dt + (\partial_x f) \, dX + \tfrac{1}{2}(\partial_{xx} f) \sigma^2 \, dt." />

      <p>
        Heuristic but rigorous (the Taylor expansion is
        formalised in the construction).
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Geometric Brownian motion</h2>

      <p>
        The Black–Scholes price model:
      </p>
      <BlockMath math="dS_t = \mu S_t \, dt + \sigma S_t \, dW_t." />

      <p>
        Apply Itô's lemma to{" "}
        <InlineMath math="f(S) = \log S" /> (no explicit{" "}
        <InlineMath math="t" /> dependence):
      </p>
      <ul>
        <li>
          <InlineMath math="\partial_t f = 0" />.
        </li>
        <li>
          <InlineMath math="\partial_S f = 1/S" />.
        </li>
        <li>
          <InlineMath math="\partial_{SS} f = -1/S^2" />.
        </li>
      </ul>

      <p>
        Itô gives:
      </p>
      <BlockMath math="d(\log S_t) = \frac{1}{S_t} dS_t - \tfrac{1}{2} \frac{1}{S_t^2} \sigma^2 S_t^2 \, dt = (\mu - \sigma^2/2) \, dt + \sigma \, dW_t." />

      <p>
        Integrating:
      </p>

      <Callout title="Closed form for GBM">
        <BlockMath math="S_t = S_0 \exp\!\left((\mu - \sigma^2/2) t + \sigma W_t\right)." />
        Log-prices are a Brownian motion with drift{" "}
        <InlineMath math="\mu - \sigma^2/2" />.
      </Callout>

      <p>
        The factor{" "}
        <InlineMath math="\sigma^2/2" /> in the drift is the{" "}
        <strong>Itô correction</strong>. Without it, you'd
        get the wrong answer by treating{" "}
        <InlineMath math="\log" /> as if BM were ordinary
        calculus.
      </p>

      <Exercise prompt="Apply Itô's lemma to $f(W_t) = W_t^2$ to verify $W_t^2 - t$ is a martingale.">
        <p>
          <InlineMath math="\partial_t f = 0" />,{" "}
          <InlineMath math="\partial_W f = 2W" />,{" "}
          <InlineMath math="\partial_{WW} f = 2" />, and{" "}
          <InlineMath math="dW \cdot dW = dt" /> with{" "}
          <InlineMath math="\sigma = 1" /> for a standard BM.
        </p>
        <BlockMath math="d(W_t^2) = 2 W_t \, dW_t + \tfrac{1}{2} \cdot 2 \cdot dt = 2 W_t \, dW_t + dt." />
        <p>
          Rearrange:{" "}
          <InlineMath math="d(W_t^2 - t) = 2 W_t \, dW_t" />,
          a pure Itô integral, hence a martingale.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Common SDEs in finance</h2>

      <h3>Ornstein–Uhlenbeck (mean-reverting)</h3>

      <BlockMath math="dX_t = \theta(\mu - X_t) \, dt + \sigma \, dW_t." />

      <p>
        Pulled toward{" "}
        <InlineMath math="\mu" /> with strength{" "}
        <InlineMath math="\theta" />, perturbed by Gaussian
        noise. Closed-form solution; stationary distribution
        is{" "}
        <InlineMath math="N(\mu, \sigma^2/(2\theta))" />.
      </p>

      <p>
        Use cases: short-term interest rates (Vasicek), pair
        trading, statistical arbitrage residuals.
      </p>

      <h3>Cox–Ingersoll–Ross (CIR)</h3>

      <BlockMath math="dX_t = \theta(\mu - X_t) \, dt + \sigma \sqrt{X_t} \, dW_t." />

      <p>
        Mean-reverting like OU but with diffusion{" "}
        <InlineMath math="\sqrt{X_t}" /> — non-negative for
        appropriate parameters. Used for short rates and as
        the variance process in Heston.
      </p>

      <h3>Heston (stochastic volatility)</h3>

      <BlockMath math="dS_t = \mu S_t \, dt + \sqrt{V_t} S_t \, dW_t^{(1)}, \quad dV_t = \theta(\bar V - V_t) \, dt + \xi \sqrt{V_t} \, dW_t^{(2)}." />

      <p>
        Two correlated SDEs: price has stochastic
        volatility, volatility itself follows CIR. Generates
        volatility smiles in option prices, fitting market
        data better than Black–Scholes.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Black–Scholes by Itô</h2>

      <p>
        A taste of where Itô's lemma takes us. Consider an
        option price{" "}
        <InlineMath math="V(t, S_t)" /> on a stock following
        GBM. Apply Itô:
      </p>
      <BlockMath math="dV = (V_t + \mu S V_S + \tfrac{1}{2} \sigma^2 S^2 V_{SS}) \, dt + \sigma S V_S \, dW_t." />

      <p>
        Construct a "delta-hedged" portfolio:{" "}
        <InlineMath math="\Pi = V - V_S \cdot S" />. The{" "}
        <InlineMath math="dW" /> terms cancel, so{" "}
        <InlineMath math="\Pi" /> is risk-free. Setting
        instantaneous return{" "}
        <InlineMath math="d\Pi/\Pi = r \, dt" /> (no
        arbitrage) yields the Black–Scholes PDE:
      </p>
      <BlockMath math="V_t + r S V_S + \tfrac{1}{2} \sigma^2 S^2 V_{SS} = r V." />

      <p>
        Solve with terminal condition (option payoff) →
        Black–Scholes formula. The whole derivation is one
        application of Itô's lemma plus a no-arbitrage
        argument. Won the Nobel.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Multi-dimensional Itô</h2>

      <p>
        For multiple BMs with covariance, Itô extends:
      </p>
      <BlockMath math="dW^{(i)}_t \cdot dW^{(j)}_t = \rho_{ij} \, dt." />

      <p>
        Vector Itô lemma: replace{" "}
        <InlineMath math="\sigma^2" /> with the appropriate
        quadratic form in multivariate noise. Used for
        multi-asset derivatives, basket options, and
        portfolio-level analysis.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Black–Scholes</strong>: the Itô-driven
          derivation of option prices. The paper that
          launched modern derivatives.
        </li>
        <li>
          <strong>Stochastic volatility &amp; rough vol</strong>:
          modern volatility models (rough Bergomi, fractional
          Heston) are SDE-based extensions. Itô lemma + power-
          law kernels is the new toolkit.
        </li>
        <li>
          <strong>Optimal execution</strong>: Almgren-Chriss
          and Avellaneda-Stoikov solve HJB equations derived
          from SDE-based models. Itô gives the dynamics; HJB
          adds optimisation.
        </li>
        <li>
          <strong>Microstructure preview</strong>: Cont's
          continuous-time order-book limits are SDEs. Heavy-
          tailed jump-diffusion models (used in
          high-frequency studies) extend Itô to jumps. The
          rough-volatility literature (Module VIII context)
          uses fractional BM, requiring Itô-style calculus on
          processes that don't have classical quadratic
          variation.
        </li>
      </ul>

      <p>
        Next chapter: Hawkes processes — self-exciting point
        processes that take us beyond Brownian motion to model
        order-flow clustering, branching dynamics, and the
        long-memory structure of microstructure data.
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
      "The Itô integral $\\int_0^t \\sigma_s \\, dW_s$ uses…",
    options: [
      "right endpoint of each subinterval",
      "left endpoint of each subinterval (giving a martingale)",
      "midpoint",
      "any endpoint — they're all equal",
    ],
    correct: 1,
    explanation:
      "Itô = left endpoint. Different choices give different integrals (Stratonovich = midpoint, etc.). Itô's choice is what makes the integral a martingale, which is why finance uses it.",
  },
  {
    prompt: "Itô isometry: $E[(\\int \\sigma \\, dW)^2] = ?$",
    options: [
      "$E[\\int \\sigma \\, dW]^2$",
      "$E[\\int \\sigma^2 \\, ds]$",
      "$\\int \\sigma^2 \\, ds$ — no expectation",
      "$0$",
    ],
    correct: 1,
    explanation:
      "Variance of Itô integral = expected integral of $\\sigma^2$. Foundation for extending the integral from step processes to general adapted processes via $L^2$ limit.",
  },
  {
    prompt:
      "Itô's lemma: $df(t, X_t) = ?$ for $dX_t = \\mu \\, dt + \\sigma \\, dW_t$.",
    options: [
      "$\\partial_t f \\, dt + \\partial_x f \\, dX_t$ — ordinary chain rule",
      "$\\partial_t f \\, dt + \\partial_x f \\, dX_t + \\tfrac{1}{2} \\partial_{xx} f \\, \\sigma^2 \\, dt$",
      "$\\sigma \\, dW_t$ only",
      "$\\partial_x f \\, dX_t$ only",
    ],
    correct: 1,
    explanation:
      "The second-order $\\tfrac{1}{2} \\partial_{xx} f \\sigma^2 \\, dt$ comes from $dW \\cdot dW = dt$. Without it, you'd be doing ordinary calculus, which is wrong on Brownian paths.",
  },
  {
    prompt:
      "GBM $dS_t = \\mu S_t \\, dt + \\sigma S_t \\, dW_t$ has closed form…",
    options: [
      "$S_t = S_0 e^{\\mu t + \\sigma W_t}$",
      "$S_t = S_0 e^{(\\mu - \\sigma^2/2) t + \\sigma W_t}$",
      "$S_t = S_0 + \\mu t + \\sigma W_t$",
      "$S_t = S_0 e^{\\sigma^2 t}$",
    ],
    correct: 1,
    explanation:
      "Apply Itô to $\\log S_t$ — the $-\\sigma^2/2$ is the Itô correction. Without it, you get the wrong answer for $E[S_t]$ and the wrong Black-Scholes formula.",
  },
  {
    prompt: "OU process $dX_t = \\theta(\\mu - X_t) \\, dt + \\sigma \\, dW_t$ is…",
    options: [
      "always a martingale",
      "mean-reverting; stationary distribution is $N(\\mu, \\sigma^2/(2\\theta))$",
      "always positive",
      "deterministic",
    ],
    correct: 1,
    explanation:
      "OU is the simplest mean-reverting SDE — pulled toward $\\mu$ with strength $\\theta$. Closed-form Gaussian transition density and stationary distribution. The workhorse of stat-arb residual modelling.",
  },
];
