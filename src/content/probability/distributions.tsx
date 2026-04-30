import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function DistributionsBody() {
  return (
    <>
      <p>
        A handful of probability distributions appear over and
        over: in statistics, physics, engineering, finance, and
        machine learning. Knowing them by name — what they model,
        their parameters, and their mean/variance — is the
        difference between fluency and lookup. This chapter
        catalogues the standard discrete and continuous
        distributions, derives their key properties, and shows how
        they relate (binomial → Poisson → exponential → gamma →
        normal, an interlocking family).
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.05 — distributions",
            author: "Orloff &amp; Bloom (MIT OCW)",
            duration: "~5h",
            url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/",
            note: "Lectures 5–8 walk through the whole catalog with examples.",
          },
          {
            title: "Khan Academy — Common probability distributions",
            author: "Khan Academy",
            duration: "~3h",
            url: "https://www.khanacademy.org/math/statistics-probability",
            note: "Slowest pace. Useful for first-time exposure.",
          },
          {
            title: "Distribution cheat sheet",
            author: "various",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/List_of_probability_distributions",
            note: "Wikipedia's master list — one-page summary tables for many distributions.",
          },
          {
            title: "StatQuest — distributions",
            author: "Josh Starmer",
            duration: "~5–15 min each",
            url: "https://www.youtube.com/c/joshstarmer",
            note: "Practical, friendly explanations of binomial / Poisson / normal use cases.",
          },
          {
            title: "Wasserman — All of Statistics, ch. 1–2",
            author: "Larry Wasserman",
            duration: "Reading",
            url: "https://www.stat.cmu.edu/~larry/all-of-statistics/",
            note: "Compressed mathematical-statistics reference. Excellent for intermediate-level review.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Bernoulli and Binomial</h2>

      <p>
        A <strong>Bernoulli</strong> random variable{" "}
        <InlineMath math="X \sim \mathrm{Bernoulli}(p)" /> takes
        value 1 with probability <InlineMath math="p" /> and 0
        with probability <InlineMath math="1 - p" />. It models a
        single coin flip with bias <InlineMath math="p" />.
      </p>
      <BlockMath math="\mathbb{E}[X] = p, \qquad \operatorname{Var}(X) = p(1 - p)." />

      <p>
        A <strong>binomial</strong>{" "}
        <InlineMath math="X \sim \mathrm{Binomial}(n, p)" />{" "}
        counts the number of successes in{" "}
        <InlineMath math="n" /> independent Bernoulli trials with
        success probability <InlineMath math="p" />. The PMF:
      </p>
      <BlockMath math="P(X = k) = \binom{n}{k} p^k (1 - p)^{n - k}, \quad k = 0, 1, \dots, n." />

      <p>
        Mean and variance follow from linearity (sum of{" "}
        <InlineMath math="n" /> independent Bernoullis):
      </p>
      <BlockMath math="\mathbb{E}[X] = np, \qquad \operatorname{Var}(X) = np(1 - p)." />

      <p>
        Use cases: number of heads in 10 flips, number of
        defective items in a sample of 100, number of clicks on
        an ad among 1000 impressions.
      </p>

      <Pitfall>
        Binomial assumes independent identical trials. If trials
        are correlated (e.g. repeated measurements with shared
        noise) or non-identical (each <InlineMath math="p_i" />{" "}
        differs), use the more general <em>Poisson binomial</em>{" "}
        or model dependence explicitly.
      </Pitfall>

      <Callout title="Try it">
        Pick a distribution and parameters; the widget plots the
        PMF or PDF.
      </Callout>

      <DistributionWidget />

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Geometric</h2>

      <p>
        Geometric counts the number of trials needed to get the
        first success.{" "}
        <InlineMath math="X \sim \mathrm{Geometric}(p)" /> with
        PMF
      </p>
      <BlockMath math="P(X = k) = (1 - p)^{k - 1} p, \quad k = 1, 2, 3, \dots" />
      <p>
        (Some texts define it as the number of failures before the
        first success, starting at 0.) Mean and variance:
      </p>
      <BlockMath math="\mathbb{E}[X] = 1/p, \qquad \operatorname{Var}(X) = (1 - p)/p^2." />

      <p>
        The geometric distribution is{" "}
        <strong>memoryless</strong>:
      </p>
      <BlockMath math="P(X > m + n \mid X > m) = P(X > n)." />
      <p>
        After <InlineMath math="m" /> failures, the distribution of
        future trials looks identical to the original. The only
        discrete distribution with this property.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Poisson</h2>

      <p>
        Poisson models <em>counts</em> of rare events in a fixed
        interval of time or space:{" "}
        <InlineMath math="X \sim \mathrm{Poisson}(\lambda)" /> with
      </p>
      <BlockMath math="P(X = k) = e^{-\lambda} \, \frac{\lambda^k}{k!}, \quad k = 0, 1, 2, \dots" />

      <p>
        <InlineMath math="\lambda > 0" /> is the rate (expected
        number of events per interval). Mean equals variance:
      </p>
      <BlockMath math="\mathbb{E}[X] = \operatorname{Var}(X) = \lambda." />

      <h3>Poisson as a limit of binomial</h3>

      <p>
        Take{" "}
        <InlineMath math="X_n \sim \mathrm{Binomial}(n, \lambda/n)" />.
        As <InlineMath math="n \to \infty" />{" "}
        with <InlineMath math="\lambda" /> fixed,
      </p>
      <BlockMath math="P(X_n = k) \to e^{-\lambda} \frac{\lambda^k}{k!}." />

      <p>
        Translation: many trials, each with tiny probability of
        success, but a finite expected total — the count is
        Poisson. Examples:
      </p>
      <ul>
        <li>
          Calls arriving at a switchboard per hour (many possible
          callers, small chance each calls in any given hour).
        </li>
        <li>
          Radioactive decays per second.
        </li>
        <li>
          Mutations per genome per generation.
        </li>
        <li>
          Dust particles landing on a slide per minute.
        </li>
        <li>
          Goals per soccer match (modulo independence assumptions).
        </li>
      </ul>

      <h3>Poisson process</h3>

      <p>
        Stretching from a single interval to a sequence: events
        occurring at rate <InlineMath math="\lambda" /> per unit
        time, independently, form a <strong>Poisson process</strong>.
        The number of events in any interval of length{" "}
        <InlineMath math="t" /> is{" "}
        <InlineMath math="\mathrm{Poisson}(\lambda t)" />. The{" "}
        <em>waiting times</em> between consecutive events are
        independent exponential (Part 5).
      </p>

      <Exercise
        number="3.1"
        prompt={
          <>
            A radio station receives an average of 3 calls per
            hour. What is the probability of receiving exactly 5
            calls in one hour?
          </>
        }
      >
        <p>
          Model as Poisson with{" "}
          <InlineMath math="\lambda = 3" />:
        </p>
        <BlockMath math="P(X = 5) = e^{-3} \frac{3^5}{5!} = e^{-3} \cdot \frac{243}{120} \approx 0.1008." />
        <p>About 10%.</p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Uniform</h2>

      <p>
        Discrete uniform on{" "}
        <InlineMath math="\{1, 2, \dots, n\}" />: each outcome
        equally likely with probability{" "}
        <InlineMath math="1/n" />. Mean{" "}
        <InlineMath math="(n+1)/2" />, variance{" "}
        <InlineMath math="(n^2 - 1)/12" />.
      </p>

      <p>
        Continuous uniform on{" "}
        <InlineMath math="[a, b]" />: density{" "}
        <InlineMath math="f(x) = 1/(b - a)" /> for{" "}
        <InlineMath math="x \in [a, b]" />, zero elsewhere.
      </p>
      <BlockMath math="\mathbb{E}[X] = \frac{a + b}{2}, \qquad \operatorname{Var}(X) = \frac{(b - a)^2}{12}." />

      <p>
        Uniformity is rare in nature but ubiquitous in pseudorandom
        number generators. <InlineMath math="\mathrm{Uniform}(0, 1)" />{" "}
        is the building block: from it, you can sample any
        distribution by inverting its CDF (the{" "}
        <em>inverse-transform method</em>).
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Exponential</h2>

      <p>
        Continuous distribution on{" "}
        <InlineMath math="[0, \infty)" /> modelling waiting times
        between Poisson events.{" "}
        <InlineMath math="X \sim \mathrm{Exp}(\lambda)" /> with
      </p>
      <BlockMath math="f(x) = \lambda \, e^{-\lambda x}, \quad x \geq 0." />
      <BlockMath math="\mathbb{E}[X] = 1/\lambda, \qquad \operatorname{Var}(X) = 1/\lambda^2." />

      <p>
        Like the geometric (its discrete sibling), the exponential
        is <strong>memoryless</strong>:
      </p>
      <BlockMath math="P(X > s + t \mid X > s) = P(X > t)." />
      <p>
        The only continuous distribution with this property. If
        you've waited 5 minutes for a memoryless bus, the
        distribution of your remaining wait is the <em>same</em>{" "}
        as if you'd just arrived. Real systems with "ageing" (e.g.
        equipment that wears out) are not memoryless.
      </p>

      <p>
        Use cases: time to next earthquake, time to next phone
        call, lifetime of an electron component before a
        spontaneous failure.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Normal (Gaussian)</h2>

      <p>
        The bell curve.{" "}
        <InlineMath math="X \sim \mathcal{N}(\mu, \sigma^2)" />{" "}
        with density
      </p>
      <BlockMath math="f(x) = \frac{1}{\sqrt{2\pi \sigma^2}} \, \exp\!\left(-\frac{(x - \mu)^2}{2\sigma^2}\right)." />
      <BlockMath math="\mathbb{E}[X] = \mu, \qquad \operatorname{Var}(X) = \sigma^2." />

      <p>
        The standard normal{" "}
        <InlineMath math="Z = (X - \mu)/\sigma \sim \mathcal{N}(0, 1)" />.
        Tables and software give CDF values for{" "}
        <InlineMath math="Z" />; transform to{" "}
        <InlineMath math="X" /> by{" "}
        <InlineMath math="X = \mu + \sigma Z" />.
      </p>

      <h3>The 68–95–99.7 rule</h3>

      <p>
        For a normal distribution:
      </p>
      <ul>
        <li>
          About <strong>68%</strong> of values lie within{" "}
          <InlineMath math="\pm \sigma" /> of the mean.
        </li>
        <li>
          About <strong>95%</strong> within{" "}
          <InlineMath math="\pm 2\sigma" />.
        </li>
        <li>
          About <strong>99.7%</strong> within{" "}
          <InlineMath math="\pm 3\sigma" />.
        </li>
      </ul>

      <p>
        Any single observation more than 4 standard deviations from
        the mean is exceptionally rare (~0.006%), and 6+ sigmas
        practically never happens — unless the distribution isn't
        actually normal, or has fatter tails. The "Black Swan"
        critique of finance models is precisely that real returns
        have heavier tails than the lognormal approximation
        assumes.
      </p>

      <h3>Why normal is everywhere</h3>

      <p>
        The Central Limit Theorem (next chapter): sums of many
        independent random variables — under mild conditions —
        approach a normal distribution. So whenever an outcome
        is the result of many small independent contributions,
        normal is a good model. Heights, measurement errors,
        diffusion, thermal noise.
      </p>

      <p>
        Other reasons: the normal distribution is the maximum-
        entropy distribution for given mean and variance, and the
        Gaussian is its own Fourier transform — properties that
        make it natural in quantum mechanics (the ground state of
        the harmonic oscillator) and signal processing.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Other notable distributions</h2>

      <p>
        Brief mentions:
      </p>
      <ul>
        <li>
          <strong>Lognormal</strong>: <InlineMath math="\ln X \sim \mathcal{N}(\mu, \sigma^2)" />.
          Models multiplicative processes — stock prices, wealth
          distributions, particle sizes.
        </li>
        <li>
          <strong>Gamma</strong>: continuous, on{" "}
          <InlineMath math="[0, \infty)" />, with shape and rate
          parameters. Sum of <InlineMath math="k" /> independent
          Exp(<InlineMath math="\lambda" />) is Gamma(
          <InlineMath math="k, \lambda" />).
        </li>
        <li>
          <strong>Beta</strong>: on{" "}
          <InlineMath math="[0, 1]" />, two shape parameters.
          Conjugate prior for the Bernoulli/binomial parameter
          (next chapter).
        </li>
        <li>
          <strong>Chi-squared</strong>: sum of squared standard
          normals; appears in goodness-of-fit tests.
        </li>
        <li>
          <strong>Student's t</strong>: similar to normal but
          fatter tails; used when standard deviation is estimated
          from a small sample.
        </li>
        <li>
          <strong>F-distribution</strong>: ratio of chi-squared;
          appears in ANOVA.
        </li>
      </ul>

      <p>
        These all interconnect. A useful diagram: many of the
        named distributions sit at vertices of a graph with
        "limit," "ratio," "sum," and "transformation" edges. We
        won't draw it here; Wikipedia has it.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>Statistical inference.</strong> Most parametric
          methods assume a specific distribution (often normal),
          and the validity of conclusions depends on whether the
          assumption holds.
        </li>
        <li>
          <strong>Machine learning.</strong> Generative models
          (Gaussians, mixture models, Bayesian neural nets) are
          built from these distributions. Loss functions like
          mean-squared error correspond to Gaussian assumptions;
          cross-entropy corresponds to categorical (multinomial).
        </li>
        <li>
          <strong>Physics.</strong> The Maxwell-Boltzmann
          distribution of velocities in a gas is a (3D)
          Gaussian. Brownian motion has Gaussian increments.
          Quantum harmonic oscillator ground state is a Gaussian
          wavefunction.
        </li>
        <li>
          <strong>Quantum mechanics.</strong> Position-space
          wavefunction of a quantum harmonic oscillator: Gaussian.
          Photon counts in a coherent state: Poisson. Time
          between detection events in a low-rate single-photon
          source: exponential. Distributions show up in QM
          everywhere measurements are involved.
        </li>
      </ul>

      <p>
        Final chapter of probability: the Central Limit Theorem
        (which makes the normal distribution central) and Bayesian
        inference (which uses distributions as descriptions of
        belief, not just data).
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: Distribution explorer
// ════════════════════════════════════════════════════════════

type Dist = "binomial" | "poisson" | "geometric" | "uniform-c" | "exp" | "normal";

function DistributionWidget() {
  const [dist, setDist] = useState<Dist>("binomial");
  const [n, setN] = useState(20);
  const [p, setP] = useState(0.4);
  const [lambda, setLambda] = useState(3);
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);

  const w = 360;
  const h = 200;

  let xs: number[] = [];
  let ys: number[] = [];
  let isContinuous = false;
  let mean = 0;
  let variance = 0;
  let label = "";

  if (dist === "binomial") {
    for (let k = 0; k <= n; k++) {
      xs.push(k);
      ys.push(binomial(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k));
    }
    mean = n * p;
    variance = n * p * (1 - p);
    label = `Binomial(n=${n}, p=${p.toFixed(2)})`;
  } else if (dist === "poisson") {
    const maxK = Math.max(20, Math.ceil(lambda * 3));
    for (let k = 0; k <= maxK; k++) {
      xs.push(k);
      ys.push((Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k));
    }
    mean = lambda;
    variance = lambda;
    label = `Poisson(λ=${lambda.toFixed(2)})`;
  } else if (dist === "geometric") {
    for (let k = 1; k <= 20; k++) {
      xs.push(k);
      ys.push(Math.pow(1 - p, k - 1) * p);
    }
    mean = 1 / p;
    variance = (1 - p) / (p * p);
    label = `Geometric(p=${p.toFixed(2)})`;
  } else if (dist === "uniform-c") {
    isContinuous = true;
    for (let i = 0; i <= 100; i++) {
      const x = -0.5 + (i / 100) * 2;
      xs.push(x);
      ys.push(x >= 0 && x <= 1 ? 1 : 0);
    }
    mean = 0.5;
    variance = 1 / 12;
    label = `Uniform(0, 1)`;
  } else if (dist === "exp") {
    isContinuous = true;
    for (let i = 0; i <= 200; i++) {
      const x = (i / 200) * 5;
      xs.push(x);
      ys.push(lambda * Math.exp(-lambda * x));
    }
    mean = 1 / lambda;
    variance = 1 / (lambda * lambda);
    label = `Exp(λ=${lambda.toFixed(2)})`;
  } else if (dist === "normal") {
    isContinuous = true;
    const span = 4 * sigma;
    for (let i = 0; i <= 200; i++) {
      const x = mu - span + (i / 200) * 2 * span;
      xs.push(x);
      ys.push(
        (1 / Math.sqrt(2 * Math.PI * sigma * sigma)) *
          Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma))
      );
    }
    mean = mu;
    variance = sigma * sigma;
    label = `N(μ=${mu.toFixed(2)}, σ²=${(sigma * sigma).toFixed(2)})`;
  }

  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMax = Math.max(...ys, 0.01) * 1.1;
  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * w;
  const sy = (y: number) => h - 20 - (y / yMax) * (h - 30);

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          {(["binomial", "poisson", "geometric", "uniform-c", "exp", "normal"] as Dist[]).map((d) => (
            <button
              key={d}
              onClick={() => setDist(d)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                dist === d
                  ? "border-accent-soft bg-ink-800 text-white"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
            <line x1={0} y1={sy(0)} x2={w} y2={sy(0)} stroke="#2a2a37" />

            {!isContinuous &&
              xs.map((x, i) => (
                <g key={i}>
                  <line x1={sx(x)} y1={sy(0)} x2={sx(x)} y2={sy(ys[i])} stroke="#a78bfa" strokeWidth={1.5} />
                  <circle cx={sx(x)} cy={sy(ys[i])} r={2.5} fill="#a78bfa" />
                </g>
              ))}

            {isContinuous && (
              <>
                <path
                  d={
                    "M" +
                    xs
                      .map((x, i) => `${sx(x).toFixed(1)},${sy(ys[i]).toFixed(1)}`)
                      .join(" L")
                  }
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth={2}
                />
                <path
                  d={
                    "M" +
                    sx(xs[0]).toFixed(1) +
                    "," +
                    sy(0).toFixed(1) +
                    " L" +
                    xs.map((x, i) => `${sx(x).toFixed(1)},${sy(ys[i]).toFixed(1)}`).join(" L") +
                    " L" +
                    sx(xs[xs.length - 1]).toFixed(1) +
                    "," +
                    sy(0).toFixed(1) +
                    " Z"
                  }
                  fill="#a78bfa"
                  fillOpacity={0.2}
                />
              </>
            )}
          </svg>
        </div>

        {dist === "binomial" && (
          <div className="grid grid-cols-2 gap-3">
            <SlideRow label={`n = ${n}`} value={n} min={1} max={50} step={1} onChange={(v) => setN(Math.round(v))} />
            <SlideRow label={`p = ${p.toFixed(2)}`} value={p} min={0.01} max={0.99} step={0.01} onChange={setP} />
          </div>
        )}
        {dist === "poisson" && (
          <SlideRow label={`λ = ${lambda.toFixed(2)}`} value={lambda} min={0.1} max={20} step={0.1} onChange={setLambda} />
        )}
        {dist === "geometric" && (
          <SlideRow label={`p = ${p.toFixed(2)}`} value={p} min={0.05} max={0.99} step={0.01} onChange={setP} />
        )}
        {dist === "exp" && (
          <SlideRow label={`λ = ${lambda.toFixed(2)}`} value={lambda} min={0.1} max={3} step={0.05} onChange={setLambda} />
        )}
        {dist === "normal" && (
          <div className="grid grid-cols-2 gap-3">
            <SlideRow label={`μ = ${mu.toFixed(2)}`} value={mu} min={-3} max={3} step={0.1} onChange={setMu} />
            <SlideRow label={`σ = ${sigma.toFixed(2)}`} value={sigma} min={0.2} max={3} step={0.05} onChange={setSigma} />
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 text-sm">
          <Stat label="distribution" value={label} mono />
          <Stat label="E[X]" value={mean.toFixed(3)} />
          <Stat label="Var(X)" value={variance.toFixed(3)} />
        </div>
      </div>
      <figcaption>
        Discrete: stem heights are PMF values. Continuous: solid
        curve is the PDF.
      </figcaption>
    </figure>
  );
}

function binomial(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let res = 1;
  for (let i = 0; i < k; i++) {
    res = (res * (n - i)) / (i + 1);
  }
  return res;
}

function factorial(n: number): number {
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}

function SlideRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="text-xs text-ink-400 mb-1">{label}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent-soft"
      />
    </label>
  );
}

function Stat({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-lg bg-ink-800/60 border border-ink-800 px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-ink-500">{label}</div>
      <div className={`${mono ? "font-mono" : ""} text-ink-100 mt-0.5 text-xs`}>{value}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "Mean and variance of $\\mathrm{Binomial}(n, p)$:",
    options: [
      "$\\mathbb{E} = p$, Var $= p(1-p)$",
      "$\\mathbb{E} = np$, Var $= np(1-p)$",
      "$\\mathbb{E} = n$, Var $= np$",
      "$\\mathbb{E} = np$, Var $= n p^2$",
    ],
    correct: 1,
    explanation:
      "Sum of $n$ Bernoullis: mean $np$, variance $np(1-p)$ by linearity (and independence for variance).",
  },
  {
    prompt:
      "For Poisson with mean $\\lambda$, the variance is…",
    options: ["$1$", "$\\lambda$", "$\\sqrt{\\lambda}$", "$\\lambda^2$"],
    correct: 1,
    explanation:
      "$\\mathrm{Poisson}(\\lambda)$ has mean = variance = $\\lambda$ — a defining feature. Real-world counts that show variance ≫ mean are 'over-dispersed' and need a different model (e.g. negative binomial).",
  },
  {
    prompt:
      "Which distribution is memoryless?",
    options: [
      "uniform",
      "binomial",
      "exponential (and geometric in the discrete case)",
      "normal",
    ],
    correct: 2,
    explanation:
      "$P(X > s + t \\mid X > s) = P(X > t)$ — past doesn't matter, future is the same as if you just started. Only the exponential (continuous) and geometric (discrete) have this.",
  },
  {
    prompt:
      "For a standard normal, approximately what fraction of the distribution lies within $\\pm 2\\sigma$?",
    options: ["68%", "95%", "99.7%", "99.99%"],
    correct: 1,
    explanation:
      "The 68-95-99.7 rule: 68% within 1σ, 95% within 2σ, 99.7% within 3σ. The exact value for 2σ is 95.45%.",
  },
  {
    prompt:
      "Why does the Poisson distribution arise as a limit of $\\mathrm{Binomial}(n, p)$?",
    options: [
      "for $n = p$",
      "for fixed $\\lambda$, $n \\to \\infty$ with $np = \\lambda$",
      "only for $p = 1$",
      "only when $n$ is prime",
    ],
    correct: 1,
    explanation:
      "The Poisson is the limit of a binomial with many trials, each having tiny success probability, but a fixed expected count $np = \\lambda$.",
  },
];
