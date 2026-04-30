import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function CltBayesBody() {
  return (
    <>
      <p>
        Two of the most important results of probability and
        statistics:
      </p>
      <ul>
        <li>
          The <strong>Central Limit Theorem</strong> — sums of
          many independent random variables look approximately
          normal, almost regardless of the underlying distribution.
        </li>
        <li>
          <strong>Bayes' theorem</strong> — how to update beliefs
          in light of evidence.
        </li>
      </ul>
      <p>
        The first lets us compute approximate probabilities
        without knowing exact distributions. The second is the
        backbone of inference, machine learning, and quantum
        measurement (where conditioning on a measurement outcome{" "}
        <em>is</em> Bayesian updating, just with complex
        amplitudes). This chapter develops both, plus the law of
        large numbers, hypothesis testing, and a peek at
        confidence intervals.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.05 — CLT &amp; Bayesian methods",
            author: "Orloff &amp; Bloom (MIT OCW)",
            duration: "~10h",
            url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/",
            note: "End-of-course material on inference. Bayesian content here is unusually well-presented.",
          },
          {
            title: "3Blue1Brown — Bayes' theorem",
            author: "3Blue1Brown",
            duration: "15 min",
            url: "https://www.youtube.com/watch?v=HZGCoVF3YvM",
            note: "Visual derivation that makes Part 5 click instantly.",
          },
          {
            title: "Think Bayes",
            author: "Allen Downey",
            duration: "Reading (free PDF)",
            url: "https://greenteapress.com/wp/think-bayes/",
            note: "Hands-on Python introduction to Bayesian methods. Excellent for applied learners.",
          },
          {
            title: "Wasserman — All of Statistics",
            author: "Larry Wasserman",
            duration: "Reading",
            url: "https://www.stat.cmu.edu/~larry/all-of-statistics/",
            note: "Compressed mathematical-statistics reference. Both frequentist and Bayesian.",
          },
          {
            title: "StatQuest — CLT &amp; Bayes",
            author: "Josh Starmer",
            duration: "~10 min each",
            url: "https://www.youtube.com/c/joshstarmer",
            note: "Very practical, friendly explanations. Good if a definition needs unpacking.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Law of large numbers</h2>

      <p>
        Let{" "}
        <InlineMath math="X_1, X_2, \dots" /> be IID (
        independent and identically distributed) with mean{" "}
        <InlineMath math="\mu = \mathbb{E}[X_i]" /> and finite
        variance. The sample mean
      </p>
      <BlockMath math="\bar X_n = \frac{1}{n}(X_1 + X_2 + \cdots + X_n)" />
      <p>
        converges to <InlineMath math="\mu" /> as{" "}
        <InlineMath math="n \to \infty" />. Two flavours of
        convergence:
      </p>
      <ul>
        <li>
          <strong>Weak LLN:</strong>{" "}
          <InlineMath math="\bar X_n \to \mu" /> in
          probability —{" "}
          <InlineMath math="P(|\bar X_n - \mu| > \varepsilon) \to 0" />{" "}
          for any{" "}
          <InlineMath math="\varepsilon > 0" />.
        </li>
        <li>
          <strong>Strong LLN:</strong>{" "}
          <InlineMath math="\bar X_n \to \mu" /> almost surely —
          for almost every realisation, the sample mean
          converges. Strictly stronger, slightly harder to prove.
        </li>
      </ul>

      <p>
        Both are theorems with multiple proofs (Chebyshev's
        inequality gives the weak LLN; the strong version uses
        martingale arguments or more careful inequalities). The
        practical consequence is the same: averages of large IID
        samples reliably estimate the underlying mean. This is
        what makes statistics work, and why repeating an
        experiment many times stabilises the average.
      </p>

      <Pitfall>
        LLN says <em>nothing</em> about how fast convergence
        happens. The Cauchy distribution has no mean (its
        integral diverges); sample means of Cauchy IIDs do{" "}
        <em>not</em> converge — they remain Cauchy-distributed for
        any sample size. Existence of finite mean is a real
        hypothesis.
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The Central Limit Theorem</h2>

      <Callout title="Central Limit Theorem">
        Let <InlineMath math="X_1, X_2, \dots" /> be IID with
        finite mean <InlineMath math="\mu" /> and finite
        variance <InlineMath math="\sigma^2" />. Then as{" "}
        <InlineMath math="n \to \infty" />,
        <BlockMath math="\frac{\bar X_n - \mu}{\sigma / \sqrt n} \;\;\xrightarrow{d}\;\; \mathcal{N}(0, 1)." />
      </Callout>

      <p>
        Read: the standardised sample mean converges{" "}
        <em>in distribution</em> to a standard normal. The
        underlying <InlineMath math="X_i" /> can have <em>any</em>{" "}
        distribution (with finite variance) — uniform, binary,
        exponential, anything — and the sample-mean fluctuations
        average out to a normal at the{" "}
        <InlineMath math="1/\sqrt n" /> scale.
      </p>

      <p>
        Equivalently, the sum{" "}
        <InlineMath math="S_n = X_1 + \cdots + X_n" /> is
        approximately
      </p>
      <BlockMath math="S_n \approx \mathcal{N}(n\mu, n\sigma^2) \quad \text{for large } n." />

      <Callout title="Try it">
        Pick an underlying distribution and a sample size. The
        widget plots a histogram of sample means from many
        trials; watch the histogram approach a normal as{" "}
        <InlineMath math="n" /> grows — even when the underlying
        distribution is wildly non-normal.
      </Callout>

      <CltWidget />

      <h3>Why the normal? Sketch of the proof</h3>

      <p>
        The slickest proof uses{" "}
        <em>characteristic functions</em>. Define{" "}
        <InlineMath math="\varphi_X(t) = \mathbb{E}[e^{itX}]" /> —
        the Fourier transform of the density. Three properties
        make the magic happen:
      </p>
      <ul>
        <li>
          For independent{" "}
          <InlineMath math="X, Y" />:{" "}
          <InlineMath math="\varphi_{X+Y}(t) = \varphi_X(t) \, \varphi_Y(t)" />.
          Independence + Fourier turns sums into products.
        </li>
        <li>
          For{" "}
          <InlineMath math="\bar X_n" />, the characteristic
          function picks up a Taylor expansion in{" "}
          <InlineMath math="t/\sqrt n" /> with leading terms
          determined only by mean and variance.
        </li>
        <li>
          The limit is{" "}
          <InlineMath math="e^{-t^2/2}" />, the characteristic
          function of <InlineMath math="\mathcal{N}(0, 1)" />.
        </li>
      </ul>
      <p>
        The non-normal third-and-higher moments of the underlying
        distribution don't survive the rescaling. They wash out
        as <InlineMath math="n \to \infty" />, and only the first
        two moments survive. That's the deep reason normal
        appears: it's the maximum-entropy distribution given mean
        and variance, and it's the only attractor of these
        rescaled sums.
      </p>

      <h3>Practical use of CLT</h3>

      <p>
        The most common application: confidence intervals for
        sample means.
      </p>
      <BlockMath math="\bar X_n \approx \mathcal{N}\!\left(\mu, \frac{\sigma^2}{n}\right)." />

      <p>
        So a 95% confidence interval for{" "}
        <InlineMath math="\mu" /> from a sample mean{" "}
        <InlineMath math="\bar x_n" /> with known{" "}
        <InlineMath math="\sigma" /> is approximately
      </p>
      <BlockMath math="\bar x_n \pm 1.96 \, \sigma/\sqrt n." />

      <p>
        For an unknown <InlineMath math="\sigma" /> estimated from
        the sample, replace with the Student t distribution. The
        sample-size dependence{" "}
        <InlineMath math="1/\sqrt n" /> is the central fact of
        statistical sampling: 4× more samples → 2× narrower
        confidence interval.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Hypothesis testing (briefly)</h2>

      <p>
        The classical (frequentist) framework for deciding
        between two competing hypotheses{" "}
        <InlineMath math="H_0" /> (null) and{" "}
        <InlineMath math="H_1" /> (alternative):
      </p>
      <ol>
        <li>
          State <InlineMath math="H_0" /> precisely. (E.g. "the
          coin is fair", "the drug has no effect.")
        </li>
        <li>
          Choose a <em>test statistic</em>{" "}
          <InlineMath math="T(X_1, \dots, X_n)" /> whose
          distribution under <InlineMath math="H_0" /> is known.
        </li>
        <li>
          Compute the observed <InlineMath math="t" /> from your
          data.
        </li>
        <li>
          Compute the <em>p-value</em>: the probability of
          getting a result at least as extreme as{" "}
          <InlineMath math="t" /> if <InlineMath math="H_0" /> is
          true.
        </li>
        <li>
          If p-value &lt; significance level{" "}
          <InlineMath math="\alpha" /> (often 0.05), reject{" "}
          <InlineMath math="H_0" /> in favour of{" "}
          <InlineMath math="H_1" />.
        </li>
      </ol>

      <Pitfall>
        <strong>p-values are not the probability that{" "}
        <InlineMath math="H_0" /> is true</strong>. They are{" "}
        <InlineMath math="P(\text{data} \mid H_0)" />, not{" "}
        <InlineMath math="P(H_0 \mid \text{data})" />. Confusing
        the two is the most-cited error in the statistical
        literature, and the gateway to the replication crisis. To
        get <InlineMath math="P(H_0 \mid \text{data})" />, you
        need Bayes' theorem (Part 5).
      </Pitfall>

      <p>
        The frequentist framework gives clean theorems but
        infamously cryptic interpretations. Bayesian inference
        (next two sections) is more direct: state your prior
        beliefs, condition on data, get a posterior. The two
        frameworks coexist; modern statistics uses both.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Bayes' theorem</h2>

      <Callout title="Bayes' theorem">
        For events <InlineMath math="A, B" /> with{" "}
        <InlineMath math="P(B) > 0" />:
        <BlockMath math="P(A \mid B) = \frac{P(B \mid A) \, P(A)}{P(B)}." />
      </Callout>

      <p>
        Reads: "the probability of <InlineMath math="A" /> given{" "}
        <InlineMath math="B" /> equals the probability of{" "}
        <InlineMath math="B" /> given <InlineMath math="A" />,
        weighted by the prior probability of{" "}
        <InlineMath math="A" />, divided by the total probability
        of <InlineMath math="B" />."
      </p>

      <p>
        Often you'll write it via the law of total probability:
      </p>
      <BlockMath math="P(A_i \mid B) = \frac{P(B \mid A_i) \, P(A_i)}{\sum_j P(B \mid A_j) \, P(A_j)}." />
      <p>
        for a partition <InlineMath math="\{A_j\}" />.
      </p>

      <h3>Worked example: medical testing</h3>

      <p>
        A disease has prevalence 1% in the population. A test for
        it has 99% sensitivity (true-positive rate) and 95%
        specificity (true-negative rate). You test positive. What
        is the probability you actually have the disease?
      </p>
      <p>
        Let <InlineMath math="D" /> = "have disease",{" "}
        <InlineMath math="+" /> = "test positive."
      </p>
      <ul>
        <li><InlineMath math="P(D) = 0.01" /> (prior).</li>
        <li><InlineMath math="P(+ \mid D) = 0.99" />.</li>
        <li><InlineMath math="P(+ \mid \neg D) = 0.05" /> (false-positive rate).</li>
      </ul>
      <p>
        By Bayes:
      </p>
      <BlockMath math="P(D \mid +) = \frac{0.99 \cdot 0.01}{0.99 \cdot 0.01 + 0.05 \cdot 0.99} = \frac{0.0099}{0.0594} \approx 0.167." />
      <p>
        Despite the strong test, only 17% chance you have the
        disease. The reason: the disease is rare, so false
        positives outnumber true positives even with a 5% false-
        positive rate. <em>Base rates dominate</em> when prior
        probability is low — a habitual error in human reasoning
        about test results.
      </p>

      <Exercise
        number="4.1"
        prompt={
          <>
            With everything else as above but disease prevalence
            10% (not 1%), what's <InlineMath math="P(D \mid +)" />?
          </>
        }
      >
        <BlockMath math="P(D \mid +) = \frac{0.99 \cdot 0.10}{0.99 \cdot 0.10 + 0.05 \cdot 0.90} = \frac{0.099}{0.144} \approx 0.688." />
        <p>
          Now 69%. Same test, very different conclusion. Bayes
          forces you to think about the prior.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Bayesian inference</h2>

      <p>
        Take a parametric model{" "}
        <InlineMath math="p(x \mid \theta)" /> (data given
        parameter), a prior{" "}
        <InlineMath math="p(\theta)" /> (your beliefs before
        seeing data), and observe data{" "}
        <InlineMath math="x" />. Bayes' theorem in this setting:
      </p>
      <BlockMath math="p(\theta \mid x) = \frac{p(x \mid \theta) \, p(\theta)}{p(x)}." />

      <p>
        The denominator{" "}
        <InlineMath math="p(x) = \int p(x \mid \theta) p(\theta) \, d\theta" />{" "}
        normalises so the posterior integrates to 1. In
        practice, computing it is often the hard part — the
        numerator is "prior × likelihood," easy. Stripped of the
        normaliser:
      </p>
      <BlockMath math="\boxed{\, \text{posterior} \propto \text{likelihood} \times \text{prior} \,}." />

      <p>
        That single line is the engine of all Bayesian
        statistics. Update your beliefs by multiplying by the
        likelihood of the data, then renormalise.
      </p>

      <h3>MAP and posterior mean</h3>
      <p>
        A point estimate from the posterior:
      </p>
      <ul>
        <li>
          <strong>Maximum A Posteriori (MAP):</strong>{" "}
          <InlineMath math="\hat\theta = \arg\max_\theta p(\theta \mid x)" /> —
          the mode of the posterior.
        </li>
        <li>
          <strong>Posterior mean:</strong>{" "}
          <InlineMath math="\hat\theta = \mathbb{E}[\theta \mid x]" /> —
          the expectation under the posterior.
        </li>
      </ul>
      <p>
        For symmetric posteriors they coincide. With flat
        (uniform) prior, MAP equals the maximum likelihood
        estimate (MLE). Bayesian methods reduce to frequentist
        ones in this limit.
      </p>

      <h3>Conjugate priors</h3>

      <p>
        For some likelihoods, particular prior families lead to a
        posterior in the same family. These{" "}
        <strong>conjugate priors</strong> let the update rule be
        written algebraically:
      </p>
      <ul>
        <li>
          <strong>Beta prior + binomial likelihood</strong>:{" "}
          <InlineMath math="\mathrm{Beta}(\alpha, \beta) \to \mathrm{Beta}(\alpha + s, \beta + f)" />{" "}
          where{" "}
          <InlineMath math="s, f" /> are observed successes and
          failures. Each new observation just bumps the
          appropriate parameter.
        </li>
        <li>
          <strong>Gamma prior + Poisson likelihood</strong>:{" "}
          <InlineMath math="\mathrm{Gamma}(\alpha, \beta) \to \mathrm{Gamma}(\alpha + \sum x_i, \beta + n)" />.
        </li>
        <li>
          <strong>Normal prior + normal likelihood</strong>:
          posterior is also normal, with parameters that are
          weighted averages of prior and data.
        </li>
      </ul>

      <p>
        Without conjugacy, posteriors usually require numerical
        methods (Markov chain Monte Carlo / variational
        inference). Most modern Bayesian work uses simulation
        rather than closed forms.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Statistical inference.</strong> Confidence
          intervals, hypothesis testing, A/B testing all derive
          from CLT. Modern web companies run thousands of
          experiments daily; the analysis is exactly this.
        </li>
        <li>
          <strong>Machine learning.</strong> Bayesian inference
          is the conceptual frame for learning from data. Every
          neural network, with weights{" "}
          <InlineMath math="\theta" /> trained on dataset{" "}
          <InlineMath math="x" />, can be viewed as approximate
          MAP estimation under some prior on{" "}
          <InlineMath math="\theta" /> (e.g. L2 regularisation =
          Gaussian prior).
        </li>
        <li>
          <strong>Diffusion models.</strong> The math of
          diffusion-model image generation is fundamentally a
          stochastic process — Brownian motion (Wiener process)
          plus a learned drift — and the score-matching loss is
          rooted in Bayesian arguments. CLT shows up because
          accumulated Gaussian noise is itself Gaussian.
        </li>
        <li>
          <strong>Quantum mechanics.</strong> Quantum measurement
          is fundamentally Bayesian. Before measurement, a state{" "}
          <InlineMath math="|\psi\rangle = \sum c_n |n\rangle" />{" "}
          assigns probability{" "}
          <InlineMath math="|c_n|^2" /> to each outcome. After
          measurement of value <InlineMath math="\lambda_k" />,
          the state collapses to{" "}
          <InlineMath math="|k\rangle" /> — that's literally
          conditioning on the measurement event, with the new
          state being the posterior. The quantum twist:
          amplitudes{" "}
          <InlineMath math="c_n" /> are complex, allowing
          interference impossible in classical Bayes.
        </li>
        <li>
          <strong>Quantum information.</strong> Quantum state
          discrimination, parameter estimation, and post-quantum
          cryptography analysis all involve hypothesis testing and
          Bayesian inference adapted to the quantum setting.
        </li>
      </ul>

      <p>
        That closes Tier VII. We've built the probabilistic
        foundations that quantum mechanics rests on: random
        variables, distributions, the central limit theorem, and
        Bayesian updating. The next tier (Complex Analysis) gives
        us the rest of the analytic machinery — contour integrals
        and the Fourier transform from a complex-analytic
        perspective — and after that comes Real Analysis (Tier
        IX), Abstract Algebra (X), Advanced Linear Algebra (XI),
        and finally physics. Each tier sits naturally on the
        previous; we are getting steadily closer to the quantum
        chapters.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: Central Limit Theorem
// ════════════════════════════════════════════════════════════

type Underly = "uniform" | "exp" | "bernoulli" | "twoPeak";

function CltWidget() {
  const [underly, setUnderly] = useState<Underly>("uniform");
  const [n, setN] = useState(20);
  const [trials, setTrials] = useState(2000);

  const sample = (): number => {
    if (underly === "uniform") return Math.random();
    if (underly === "exp") return -Math.log(1 - Math.random());
    if (underly === "bernoulli") return Math.random() < 0.3 ? 1 : 0;
    // two-peak: bimodal mix
    return Math.random() < 0.5 ? Math.random() * 0.3 : 0.7 + Math.random() * 0.3;
  };

  const trueMean = underly === "uniform" ? 0.5 : underly === "exp" ? 1 : underly === "bernoulli" ? 0.3 : 0.5;
  const trueVar = underly === "uniform" ? 1 / 12 : underly === "exp" ? 1 : underly === "bernoulli" ? 0.3 * 0.7 : 0.0925;

  const sampleMeans: number[] = [];
  for (let t = 0; t < trials; t++) {
    let s = 0;
    for (let i = 0; i < n; i++) s += sample();
    sampleMeans.push(s / n);
  }

  // Histogram
  const lo = Math.min(...sampleMeans);
  const hi = Math.max(...sampleMeans);
  const bins = 30;
  const binW = (hi - lo) / bins;
  const counts = new Array(bins).fill(0);
  for (const v of sampleMeans) {
    let bi = Math.floor((v - lo) / binW);
    if (bi >= bins) bi = bins - 1;
    if (bi < 0) bi = 0;
    counts[bi]++;
  }

  const w = 360;
  const h = 200;
  const maxCount = Math.max(...counts);
  const sx = (b: number) => (b / bins) * w;
  const sy = (c: number) => h - 20 - (c / maxCount) * (h - 30);

  // Theoretical normal overlay
  const sigmaTheoretical = Math.sqrt(trueVar / n);
  const normalY = (x: number) =>
    (1 / Math.sqrt(2 * Math.PI * sigmaTheoretical * sigmaTheoretical)) *
    Math.exp(-((x - trueMean) ** 2) / (2 * sigmaTheoretical * sigmaTheoretical));

  const normalScale = (binW * trials);

  const normalPath: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const x = lo + (i / 100) * (hi - lo);
    const y = normalY(x) * normalScale;
    const px = sx((x - lo) / binW);
    const py = sy(y);
    normalPath.push(`${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`);
  }

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          {(["uniform", "exp", "bernoulli", "twoPeak"] as Underly[]).map((u) => (
            <button
              key={u}
              onClick={() => setUnderly(u)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                underly === u
                  ? "border-accent-soft bg-ink-800 text-ink-50"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              {u === "uniform" ? "Uniform(0,1)" : u === "exp" ? "Exp(1)" : u === "bernoulli" ? "Bernoulli(0.3)" : "Bimodal"}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
            {counts.map((c, i) => (
              <rect
                key={i}
                x={(i / bins) * w}
                y={sy(c)}
                width={(w / bins) - 0.5}
                height={sy(0) - sy(c)}
                fill="#a78bfa"
                fillOpacity={0.4}
                stroke="#a78bfa"
                strokeOpacity={0.7}
                strokeWidth={0.5}
              />
            ))}
            <path d={normalPath.join(" ")} fill="none" stroke="#fbbf24" strokeWidth={2} />
            <line x1={0} y1={sy(0)} x2={w} y2={sy(0)} stroke="#2a2a37" />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SlideRow label={`n (sample size) = ${n}`} value={n} min={1} max={100} step={1} onChange={(v) => setN(Math.round(v))} />
          <SlideRow label={`trials = ${trials}`} value={trials} min={500} max={10000} step={100} onChange={(v) => setTrials(Math.round(v))} />
        </div>

        <p className="text-xs text-ink-400">
          Purple histogram: distribution of sample means from{" "}
          <InlineMath math="n" /> draws of the underlying. Yellow:
          predicted normal{" "}
          <InlineMath math="\mathcal{N}(\mu, \sigma^2 / n)" /> from
          CLT. Even for crazy underlying distributions (bimodal!),
          the sample-mean distribution becomes normal as{" "}
          <InlineMath math="n" /> grows.
        </p>
      </div>
      <figcaption>
        The Central Limit Theorem in action. Slide{" "}
        <InlineMath math="n" /> from 1 (which exposes the
        underlying) up to 100 (smoothly normal regardless of
        underlying).
      </figcaption>
    </figure>
  );
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

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "By the Law of Large Numbers, $\\bar X_n$ converges to…",
    options: [
      "a normal distribution",
      "$\\mathbb{E}[X]$",
      "0",
      "the median",
    ],
    correct: 1,
    explanation:
      "LLN: the sample mean of IID variables with finite mean converges to the true mean as $n \\to \\infty$. The Central Limit Theorem describes the *fluctuations* around this limit.",
  },
  {
    prompt:
      "By the Central Limit Theorem, the sample mean $\\bar X_n$ is approximately distributed as…",
    options: [
      "$\\mathcal{N}(\\mu, \\sigma^2)$",
      "$\\mathcal{N}(\\mu, \\sigma^2/n)$",
      "$\\mathcal{N}(\\mu, n \\sigma^2)$",
      "the same as $X_i$",
    ],
    correct: 1,
    explanation:
      "$\\bar X_n \\approx \\mathcal{N}(\\mu, \\sigma^2 / n)$ for large $n$. Standard deviation shrinks as $1/\\sqrt n$.",
  },
  {
    prompt:
      "A 95% confidence interval for the mean uses the multiplier…",
    options: ["1.0", "1.645", "1.96", "2.58"],
    correct: 2,
    explanation:
      "$\\mathbb{P}(|Z| < 1.96) = 0.95$ for standard normal $Z$. So $\\bar X_n \\pm 1.96 \\sigma/\\sqrt n$ is a 95% CI for $\\mu$.",
  },
  {
    prompt:
      "Bayes' theorem states $P(A \\mid B) = \\dots$",
    options: [
      "$P(A) P(B)$",
      "$P(B \\mid A) P(A) / P(B)$",
      "$P(A) + P(B)$",
      "$P(A \\cap B)$",
    ],
    correct: 1,
    explanation:
      "$P(A \\mid B) = P(A \\cap B) / P(B) = P(B \\mid A) P(A) / P(B)$. Symmetry between $A$ and $B$ in the joint, asymmetry in conditioning.",
  },
  {
    prompt:
      "In a Bayesian update, posterior is proportional to…",
    options: [
      "prior alone",
      "likelihood alone",
      "likelihood × prior",
      "evidence × prior",
    ],
    correct: 2,
    explanation:
      "$p(\\theta \\mid x) \\propto p(x \\mid \\theta) p(\\theta)$. Multiply prior by likelihood; renormalise.",
  },
];
