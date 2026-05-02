import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function BrownianMotionBody() {
  return (
    <>
      <p>
        Brownian motion is the continuous-time random walk:
        Gaussian increments, continuous paths, instantaneously
        unpredictable. It is the canonical model for "random
        noise that accumulates" — and the building block of
        every continuous-time stochastic model in finance,
        physics, and beyond. Once we have it, Itô's calculus
        (next chapter) gives us the rules for differentiating
        and integrating with respect to it, and the standard
        SDEs of mathematical finance fall out.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Shreve Vol II Ch 3",
            author: "Steven Shreve",
            duration: "Reading",
            url: "https://link.springer.com/book/10.1007/978-0-387-22527-2",
            note: "Brownian motion in the context of mathematical finance.",
          },
          {
            title: "Shreve Vol I Ch 1",
            author: "Steven Shreve",
            duration: "Reading",
            url: "https://link.springer.com/book/10.1007/978-0-387-22527-0",
            note: "Discrete intuition: random walks, scaling to BM via Donsker.",
          },
          {
            title: "Klebaner — Introduction to Stochastic Calculus with Applications",
            author: "Fima Klebaner",
            duration: "Reference",
            url: "https://www.worldscientific.com/worldscibooks/10.1142/p821",
            note: "Single self-contained text with examples in finance and biology.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Definition</h2>

      <Callout title="Standard Brownian motion">
        A stochastic process{" "}
        <InlineMath math="\{W_t\}_{t \ge 0}" /> is a{" "}
        <strong>standard Brownian motion</strong> (or Wiener
        process) if:
        <ol>
          <li>
            <InlineMath math="W_0 = 0" /> almost surely.
          </li>
          <li>
            <strong>Independent increments</strong>: for{" "}
            <InlineMath math="0 \le s_1 < t_1 \le s_2 < t_2 \le \dots" />,
            the increments{" "}
            <InlineMath math="W_{t_i} - W_{s_i}" /> are
            mutually independent.
          </li>
          <li>
            <strong>Gaussian increments</strong>:{" "}
            <InlineMath math="W_t - W_s \sim N(0, t - s)" /> for{" "}
            <InlineMath math="s < t" />.
          </li>
          <li>
            <strong>Continuous paths</strong>: with probability
            1, the function{" "}
            <InlineMath math="t \mapsto W_t" /> is continuous.
          </li>
        </ol>
      </Callout>

      <p>
        These four properties uniquely characterise Brownian
        motion (up to indistinguishability). Each one is doing
        real work — change any of them and you get a different
        process.
      </p>

      <h3>Why these axioms?</h3>

      <ul>
        <li>
          <strong>Independent increments</strong>: the future
          (after time <InlineMath math="t" />) depends on the
          past only through the current state{" "}
          <InlineMath math="W_t" />. This is the{" "}
          <em>Markov property</em>.
        </li>
        <li>
          <strong>Gaussian, with variance equal to time</strong>:
          a CLT-style limit of small independent kicks. Makes
          calculations tractable.
        </li>
        <li>
          <strong>Continuous paths</strong>: rules out jumps,
          which would require Poisson-like processes.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Path properties</h2>

      <p>
        Brownian paths are notoriously weird. A few facts that
        make stochastic calculus look like magic:
      </p>

      <Callout title="Two facts">
        <ul>
          <li>
            Brownian paths are <strong>continuous</strong>{" "}
            everywhere with probability 1 (axiomatic).
          </li>
          <li>
            Brownian paths are{" "}
            <strong>nowhere differentiable</strong> with
            probability 1.
          </li>
        </ul>
      </Callout>

      <p>
        Continuity says paths don't jump. Non-differentiability
        says they wiggle infinitely fast — there's no slope to
        speak of. So you can't use ordinary calculus on
        Brownian paths; we need a new theory (Itô).
      </p>

      <h3>Quadratic variation</h3>

      <p>
        The decisive property. Take a partition{" "}
        <InlineMath math="0 = t_0 < t_1 < \dots < t_n = t" />{" "}
        of <InlineMath math="[0, t]" /> with mesh going to
        zero. Compute:
      </p>
      <BlockMath math="\sum_{i=0}^{n-1} (W_{t_{i+1}} - W_{t_i})^2 \to t \quad \text{in probability as mesh} \to 0." />

      <p>
        Sum of squared increments converges to the elapsed
        time. This is shorthanded as
      </p>
      <BlockMath math="dW_t \cdot dW_t = dt." />

      <p>
        That's the relation that makes Itô's lemma have its
        characteristic second-order term. Compare with{" "}
        <InlineMath math="dt \cdot dt = 0" /> for ordinary
        time — quadratic variation of a smooth function is
        zero.
      </p>

      <Pitfall>
        Quadratic variation is a property of the path, not
        of the distribution. For{" "}
        <em>each individual path</em>, the sum of squared
        increments converges to{" "}
        <InlineMath math="t" /> as you refine the partition.
        That's why Itô's calculus works pathwise — the
        second-order term comes from this pathwise property.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Discrete intuition: random walks</h2>

      <p>
        Why does Gaussian noise emerge as the right limit?
        Donsker's theorem.
      </p>

      <p>
        Take iid steps{" "}
        <InlineMath math="X_i \in \{-1, +1\}" /> with
        probability 1/2 each. Define the random walk{" "}
        <InlineMath math="S_n = \sum_{i=1}^n X_i" />. Now
        <em>scale</em>: the rescaled walk is
      </p>
      <BlockMath math="W^{(n)}_t = \frac{1}{\sqrt n} \, S_{\lfloor nt \rfloor}." />

      <Callout title="Donsker's invariance principle">
        As <InlineMath math="n \to \infty" />, the rescaled
        random walk{" "}
        <InlineMath math="W^{(n)}" /> converges in
        distribution (on the path space) to standard Brownian
        motion <InlineMath math="W" />.
      </Callout>

      <p>
        So Brownian motion is the{" "}
        <em>universal scaling limit</em> of unbiased random
        walks with finite variance. The CLT in path space.
        Three takeaways:
      </p>
      <ul>
        <li>
          The square-root scaling{" "}
          <InlineMath math="\sqrt n" /> is what gives BM its
          characteristic <InlineMath math="\sqrt t" />{" "}
          standard deviation.
        </li>
        <li>
          Heavy-tailed steps (infinite variance) give different
          limits — stable Lévy processes.
        </li>
        <li>
          The limit doesn't depend on the precise step
          distribution (just mean 0, variance 1) — universality.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Useful properties</h2>

      <h3>Markov property</h3>

      <p>
        Future of <InlineMath math="W" /> after time{" "}
        <InlineMath math="s" />, conditional on the path up
        to <InlineMath math="s" />, depends only on{" "}
        <InlineMath math="W_s" />:
      </p>
      <BlockMath math="W_{s + t} - W_s \perp \mathcal{F}_s, \quad W_{s+t} - W_s \sim N(0, t)." />

      <p>
        Memoryless. Foundation of every "today's price is the
        only thing that matters" claim in models that use
        Brownian motion.
      </p>

      <h3>Self-similarity (scaling)</h3>

      <p>
        For any <InlineMath math="c > 0" />,{" "}
        <InlineMath math="\{c^{-1/2} W_{ct}\}" /> is also a
        standard Brownian motion. Time-scale by{" "}
        <InlineMath math="c" />, magnitude-scale by{" "}
        <InlineMath math="\sqrt c" /> — same process.
      </p>

      <h3>Brownian motion as a martingale</h3>

      <p>
        <InlineMath math="W_t" /> is a martingale:
      </p>
      <BlockMath math="E[W_t \mid \mathcal{F}_s] = W_s \text{ for } s \le t." />

      <p>
        "Best forecast of future BM is its current value." Plus
        <InlineMath math="W_t^2 - t" /> is a martingale (a
        consequence of quadratic variation). Both used in
        derivations of option-pricing formulas.
      </p>

      <h3>Reflection principle</h3>

      <p>
        For <InlineMath math="a > 0" />:
      </p>
      <BlockMath math="P(\max_{0 \le s \le t} W_s \ge a) = 2 P(W_t \ge a)." />

      <p>
        Useful for first-passage problems — when does a
        process first cross a barrier? Foundation of
        barrier-option pricing and ruin-theory calculations.
      </p>

      <Exercise prompt="Compute $P(W_2 \ge 1)$ where $W$ is standard Brownian motion.">
        <p>
          <InlineMath math="W_2 \sim N(0, 2)" />, so{" "}
          <InlineMath math="W_2/\sqrt 2 \sim N(0, 1)" />.
        </p>
        <BlockMath math="P(W_2 \ge 1) = P(Z \ge 1/\sqrt 2) = 1 - \Phi(1/\sqrt 2) \approx 0.24." />
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Brownian motion with drift</h2>

      <p>
        Generalisation:{" "}
        <InlineMath math="X_t = \mu t + \sigma W_t" /> is{" "}
        <strong>Brownian motion with drift</strong>{" "}
        <InlineMath math="\mu" /> and volatility{" "}
        <InlineMath math="\sigma" />.
      </p>

      <ul>
        <li>
          <InlineMath math="X_0 = 0" />.
        </li>
        <li>
          <InlineMath math="X_t \sim N(\mu t, \sigma^2 t)" />.
        </li>
        <li>
          Independent increments:{" "}
          <InlineMath math="X_t - X_s \sim N(\mu(t - s), \sigma^2 (t - s))" />.
        </li>
      </ul>

      <p>
        Used as the simplest continuous-time model with
        non-zero drift. In finance, log-prices are often
        modelled as Brownian motion with drift; the
        exponential is geometric Brownian motion (next
        chapter).
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Log-price diffusion</strong>: the standard
          Black–Scholes model has{" "}
          <InlineMath math="d \log S_t = (\mu - \sigma^2/2) \, dt + \sigma \, dW_t" />,
          so log prices are a Brownian motion with drift.
          Fundamental to derivatives pricing.
        </li>
        <li>
          <strong>CLT-driven aggregation</strong>: many
          microstructure models start from individual order
          arrivals and aggregate to a continuous-time
          diffusion limit. Cont's framework is exactly this
          aggregation.
        </li>
        <li>
          <strong>Square-root impact</strong>: market impact
          scales as{" "}
          <InlineMath math="\sigma \sqrt{Q/V}" /> partly
          because price moves over the metaorder execution
          time scale as Brownian motion (
          <InlineMath math="\sigma \sqrt t" />).
        </li>
        <li>
          <strong>Statistical arbitrage</strong>: most
          mean-reverting strategies model the residual as an
          Ornstein-Uhlenbeck process — a drifted Brownian
          motion with mean reversion. Itô calculus (next
          chapter) is the tool for analysing it.
        </li>
      </ul>

      <p>
        Next chapter: Itô integral and Itô's lemma — the
        rules for "differentiating" and "integrating" with
        respect to Brownian motion.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt: "Which is **not** part of the Brownian motion definition?",
    options: [
      "$W_0 = 0$",
      "Independent increments",
      "$W_t \\sim N(0, t)$",
      "$W_t$ is differentiable",
    ],
    correct: 3,
    explanation:
      "Brownian paths are continuous *but nowhere differentiable* with probability 1. That's exactly why we need Itô calculus instead of ordinary calculus.",
  },
  {
    prompt: "Quadratic variation of standard Brownian motion over $[0, t]$ is…",
    options: ["$0$", "$t$", "$t^2$", "$\\sqrt t$"],
    correct: 1,
    explanation:
      "$\\sum (W_{t_{i+1}} - W_{t_i})^2 \\to t$ as the partition mesh $\\to 0$. Shorthand: $dW \\cdot dW = dt$. The reason Itô's lemma has its second-order term.",
  },
  {
    prompt: "Donsker's theorem says…",
    options: [
      "any random walk converges to Brownian motion at every fixed time",
      "the rescaled $\\frac{1}{\\sqrt n} S_{\\lfloor nt \\rfloor}$ converges in distribution (on path space) to BM",
      "BM is differentiable",
      "BM has independent decrements",
    ],
    correct: 1,
    explanation:
      "BM is the universal scaling limit of unbiased random walks with finite variance — a 'CLT for paths'. The $\\sqrt n$ scaling is what gives BM its $\\sqrt t$ standard deviation.",
  },
  {
    prompt:
      "BM with drift: $X_t = \\mu t + \\sigma W_t$. Then $X_t \\sim ?$",
    options: [
      "$N(\\mu, \\sigma^2)$",
      "$N(\\mu t, \\sigma^2 t)$",
      "$\\mathrm{Uniform}(0, t)$",
      "$\\mathrm{Exp}(\\sigma)$",
    ],
    correct: 1,
    explanation:
      "Drift contributes $\\mu t$ to the mean; diffusion contributes $\\sigma^2 t$ to the variance. Sample standard deviation $\\sigma \\sqrt t$ is the canonical 'noise scales as $\\sqrt t$' result.",
  },
  {
    prompt: "BM is a martingale, meaning…",
    options: [
      "$E[W_t] = 0$ for all $t$",
      "$E[W_t \\mid \\mathcal{F}_s] = W_s$ for $s \\le t$",
      "$W_t$ has constant mean",
      "$W_t = 0$ almost surely",
    ],
    correct: 1,
    explanation:
      "Best forecast of future BM is its current value — the martingale property. Plus $W_t^2 - t$ is also a martingale (a consequence of quadratic variation). Both used heavily in derivative-pricing derivations.",
  },
];
