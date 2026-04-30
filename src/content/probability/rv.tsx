import { useEffect, useRef, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function RvBody() {
  return (
    <>
      <p>
        Random variables formalise the question "what's the chance
        that the outcome of an experiment is...?". A coin flip, a
        die roll, the result of a noisy measurement, the time to
        the next bus, the energy of an electron in a magnetic
        field — all are random variables. The chapter develops
        the axioms of probability, conditional probability and
        independence, the discrete/continuous split, expectation
        and variance, and joint distributions. By the end you have
        the language quantum mechanics borrows wholesale.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.05 — lectures 5–10 (random variables, distributions)",
            author: "Orloff &amp; Bloom (MIT OCW)",
            duration: "~10h",
            url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/",
            note: "MIT's intro probability course. Notes are excellent.",
          },
          {
            title: "MIT 6.041 — Introduction to Probability",
            author: "Tsitsiklis (MIT OCW)",
            duration: "~25h",
            url: "https://ocw.mit.edu/courses/6-041-probabilistic-systems-analysis-and-applications-fall-2010/",
            note: "Tsitsiklis is famous for clear lectures. Watch lecture 1 first.",
          },
          {
            title: "Bertsekas &amp; Tsitsiklis — Introduction to Probability",
            author: "Bertsekas / Tsitsiklis",
            duration: "Reading",
            url: "http://athenasc.com/probbook.html",
            note: "Companion textbook to 6.041. Very clear.",
          },
          {
            title: "3Blue1Brown — Bayes' theorem & probability series",
            author: "3Blue1Brown",
            duration: "varies",
            url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDOMxJDswBaLu8xCcHQt7DTL",
            note: "Visual intuition. The Bayes-theorem video is worth watching once.",
          },
          {
            title: "Probability concepts explained — towards data science",
            author: "various",
            duration: "Reading",
            url: "https://towardsdatascience.com/tagged/probability",
            note: "Friendly applied articles; pair with the textbook for intuition.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Sample spaces, events, axioms</h2>

      <p>
        A <strong>sample space</strong>{" "}
        <InlineMath math="\Omega" /> is the set of all possible
        outcomes of an experiment. Examples:
      </p>
      <ul>
        <li>Coin flip: <InlineMath math="\Omega = \{H, T\}" />.</li>
        <li>Die roll: <InlineMath math="\Omega = \{1, 2, 3, 4, 5, 6\}" />.</li>
        <li>Time to next bus: <InlineMath math="\Omega = [0, \infty)" />.</li>
        <li>Two coin flips: <InlineMath math="\Omega = \{HH, HT, TH, TT\}" />.</li>
      </ul>

      <p>
        An <strong>event</strong> is a subset of{" "}
        <InlineMath math="\Omega" /> — a set of outcomes you'd
        bundle together as "what we care about." For two flips,
        the event "at least one head" is{" "}
        <InlineMath math="\{HH, HT, TH\}" />.
      </p>

      <p>
        A <strong>probability function</strong>{" "}
        <InlineMath math="P" /> assigns a number in{" "}
        <InlineMath math="[0, 1]" /> to events, satisfying three
        axioms (Kolmogorov, 1933):
      </p>

      <Callout title="Probability axioms">
        <ol>
          <li>
            <InlineMath math="P(A) \geq 0" /> for every event{" "}
            <InlineMath math="A" />.
          </li>
          <li>
            <InlineMath math="P(\Omega) = 1" />.
          </li>
          <li>
            <strong>Countable additivity:</strong> for disjoint{" "}
            events <InlineMath math="A_1, A_2, \dots" />,
            <BlockMath math="P\!\left(\bigcup_i A_i\right) = \sum_i P(A_i)." />
          </li>
        </ol>
      </Callout>

      <p>
        Consequences (each follows from the axioms):
      </p>
      <ul>
        <li>
          <InlineMath math="P(\varnothing) = 0" />.
        </li>
        <li>
          <InlineMath math="P(A^c) = 1 - P(A)" /> (complement
          rule).
        </li>
        <li>
          <InlineMath math="P(A \cup B) = P(A) + P(B) - P(A \cap B)" /> —
          inclusion-exclusion for two events.
        </li>
        <li>
          If <InlineMath math="A \subseteq B" />, then{" "}
          <InlineMath math="P(A) \leq P(B)" /> (monotonicity).
        </li>
      </ul>

      <p>
        For finite, equally-likely outcomes:{" "}
        <InlineMath math="P(A) = |A| / |\Omega|" /> — the ratio of
        favourable to total. That's why combinatorics (last
        chapter) was the prerequisite.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Conditional probability &amp; independence</h2>

      <p>
        For events <InlineMath math="A" /> and{" "}
        <InlineMath math="B" /> with{" "}
        <InlineMath math="P(B) > 0" />, the{" "}
        <strong>conditional probability of A given B</strong> is
      </p>
      <BlockMath math="P(A \mid B) = \frac{P(A \cap B)}{P(B)}." />

      <p>
        Read: "given that <InlineMath math="B" /> happened, the
        chance of <InlineMath math="A" />." The denominator
        renormalises to make conditional probabilities sum to 1
        within the restricted sample space{" "}
        <InlineMath math="B" />.
      </p>

      <p>
        Equivalent: <InlineMath math="P(A \cap B) = P(A \mid B) P(B)" />.
        Iterated:
      </p>
      <BlockMath math="P(A_1 \cap A_2 \cap \cdots \cap A_n) = P(A_1) \, P(A_2 \mid A_1) \, P(A_3 \mid A_1 \cap A_2) \cdots" />
      <p>
        — the <strong>chain rule of probability</strong>, which
        decomposes joint probabilities into a product of
        conditionals.
      </p>

      <h3>Independence</h3>

      <p>
        Events <InlineMath math="A, B" /> are{" "}
        <strong>independent</strong> if{" "}
        <InlineMath math="P(A \cap B) = P(A) P(B)" />.
        Equivalently (when{" "}
        <InlineMath math="P(B) > 0" />),{" "}
        <InlineMath math="P(A \mid B) = P(A)" /> — knowing{" "}
        <InlineMath math="B" /> happened doesn't change the
        probability of <InlineMath math="A" />.
      </p>

      <Pitfall>
        <strong>Independence vs disjointness.</strong> Disjoint
        events with positive probability are <em>maximally
        dependent</em> — knowing one happened guarantees the
        other didn't. Independence requires{" "}
        <InlineMath math="P(A \cap B) = P(A) P(B)" />, which is
        usually nonzero. Don't confuse them.
      </Pitfall>

      <h3>Law of total probability</h3>

      <p>
        For any partition{" "}
        <InlineMath math="B_1, \dots, B_n" /> of{" "}
        <InlineMath math="\Omega" /> with{" "}
        <InlineMath math="P(B_i) > 0" />:
      </p>
      <BlockMath math="P(A) = \sum_i P(A \mid B_i) \, P(B_i)." />
      <p>
        "Average <InlineMath math="A" />'s conditional probability
        over all the cases <InlineMath math="B_i" />, weighted by
        their priors." This is the workhorse identity for breaking
        a probability into cases.
      </p>

      <h3>Bayes' theorem (preview)</h3>

      <p>
        Combining the definition of conditional probability with
        the law of total probability gives <strong>Bayes'
        theorem</strong>:
      </p>
      <BlockMath math="P(B \mid A) = \frac{P(A \mid B) \, P(B)}{P(A)}." />
      <p>
        We'll use this constantly in the CLT/Bayes chapter.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Random variables</h2>

      <p>
        A <strong>random variable</strong>{" "}
        <InlineMath math="X" /> is a function{" "}
        <InlineMath math="X : \Omega \to \mathbb{R}" /> assigning a
        number to each outcome. We work with the {" "}
        <em>induced distribution</em> on the real line — usually
        the original sample space recedes into the background.
      </p>

      <ul>
        <li>
          <strong>Discrete:</strong> the values of{" "}
          <InlineMath math="X" /> form a finite or countable set.
          E.g. die roll, number of heads in 10 flips, count of
          arrivals.
        </li>
        <li>
          <strong>Continuous:</strong>{" "}
          <InlineMath math="X" /> takes values in a continuum, and{" "}
          <InlineMath math="P(X = x) = 0" /> for each{" "}
          <InlineMath math="x" />. Probability is described by a
          density. E.g. height, time to bus, position of a
          particle.
        </li>
      </ul>

      <p>
        (Mixed cases exist — e.g. an indicator variable on a
        continuous distribution — but they're handled by combining
        the two.)
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · PMF, PDF, CDF</h2>

      <p>
        For a <strong>discrete</strong>{" "}
        <InlineMath math="X" />, the{" "}
        <strong>probability mass function</strong> (PMF) is
      </p>
      <BlockMath math="p(x) = P(X = x)." />
      <p>
        The PMF satisfies <InlineMath math="p(x) \geq 0" /> and{" "}
        <InlineMath math="\sum_x p(x) = 1" />.
      </p>

      <p>
        For a <strong>continuous</strong>{" "}
        <InlineMath math="X" />, the{" "}
        <strong>probability density function</strong> (PDF){" "}
        <InlineMath math="f(x)" /> satisfies{" "}
        <InlineMath math="f(x) \geq 0" />,{" "}
        <InlineMath math="\int_{-\infty}^{\infty} f(x)\,dx = 1" />,
        and probabilities of intervals are integrals:
      </p>
      <BlockMath math="P(a \leq X \leq b) = \int_a^b f(x)\,dx." />

      <p>
        The <strong>cumulative distribution function</strong>{" "}
        (CDF) <InlineMath math="F(x) = P(X \leq x)" /> works for
        both flavours. For discrete it's a step function; for
        continuous, the integral{" "}
        <InlineMath math="\int_{-\infty}^x f(t) \, dt" />.
        Always non-decreasing, with{" "}
        <InlineMath math="F(-\infty) = 0" /> and{" "}
        <InlineMath math="F(\infty) = 1" />.
      </p>

      <Pitfall>
        For a continuous random variable, <em>density is not
        probability</em>. The density{" "}
        <InlineMath math="f(x)" /> can be greater than 1; it
        only needs to integrate to 1. The probability of any
        single point is 0.{" "}
        <InlineMath math="P(a \leq X \leq b) = P(a < X < b)" /> —
        endpoints don't matter.
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Expectation</h2>

      <p>
        The <strong>expected value</strong> of{" "}
        <InlineMath math="X" /> is its weighted-average value:
      </p>
      <BlockMath math="\mathbb{E}[X] = \sum_x x \, p(x) \quad \text{(discrete)}, \qquad \mathbb{E}[X] = \int_{-\infty}^\infty x \, f(x) \, dx \quad \text{(continuous)}." />

      <p>
        Examples:
      </p>
      <ul>
        <li>
          Fair die: <InlineMath math="\mathbb{E}[X] = (1+2+3+4+5+6)/6 = 3.5" />.
          Note: never an actual outcome.
        </li>
        <li>
          Indicator of an event:{" "}
          <InlineMath math="\mathbb{E}[\mathbb{1}_A] = P(A)" />.
        </li>
        <li>
          Uniform on <InlineMath math="[0, 1]" />:{" "}
          <InlineMath math="\mathbb{E}[X] = 1/2" />.
        </li>
      </ul>

      <h3>Linearity</h3>

      <Callout title="Linearity of expectation">
        For any random variables <InlineMath math="X, Y" />{" "}
        (whether independent or not) and constants{" "}
        <InlineMath math="a, b" />:
        <BlockMath math="\mathbb{E}[aX + bY] = a \, \mathbb{E}[X] + b \, \mathbb{E}[Y]." />
      </Callout>

      <p>
        This is the most-used identity in probability theory. It
        works <em>regardless</em> of dependence. Proof for
        discrete: rearrange the double sum.
      </p>

      <p>
        Powerful trick: write a complicated random variable as a
        sum of indicators. Example: the expected number of fixed
        points in a random permutation of <InlineMath math="n" />{" "}
        elements. Let <InlineMath math="X_i = 1" /> if{" "}
        <InlineMath math="i" /> is fixed, 0 otherwise. Then{" "}
        <InlineMath math="X = X_1 + \cdots + X_n" />. Each{" "}
        <InlineMath math="X_i" /> has{" "}
        <InlineMath math="\mathbb{E}[X_i] = P(\text{i fixed}) = 1/n" />.
        By linearity,{" "}
        <InlineMath math="\mathbb{E}[X] = n \cdot 1/n = 1" />. The
        expected number of fixed points is exactly 1, regardless
        of <InlineMath math="n" />. (The events aren't
        independent, but linearity doesn't care.)
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Variance and standard deviation</h2>

      <p>
        Expectation is the centre of the distribution; variance
        measures spread.
      </p>
      <BlockMath math="\operatorname{Var}(X) = \mathbb{E}\!\left[(X - \mathbb{E}[X])^2\right]." />

      <p>
        Computational identity:
      </p>
      <BlockMath math="\operatorname{Var}(X) = \mathbb{E}[X^2] - (\mathbb{E}[X])^2." />

      <p>
        The <strong>standard deviation</strong>{" "}
        <InlineMath math="\sigma_X = \sqrt{\operatorname{Var}(X)}" />{" "}
        has the same units as <InlineMath math="X" />.
      </p>

      <h3>Properties</h3>
      <ul>
        <li>
          <InlineMath math="\operatorname{Var}(aX + b) = a^2 \operatorname{Var}(X)" />.
          Variance ignores shifts and scales by the square of
          multiplicative factors.
        </li>
        <li>
          For <em>independent</em>{" "}
          <InlineMath math="X, Y" />:{" "}
          <InlineMath math="\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)" />.
          Variances of independent sums add. (For dependent ones,
          a covariance term appears — see Part 7.)
        </li>
      </ul>

      <Callout title="Try it">
        Sample many rolls of a fair die. Watch the empirical mean
        and variance converge to the theoretical 3.5 and{" "}
        <InlineMath math="35/12 \approx 2.917" />.
      </Callout>

      <DieSamplingWidget />

      <Exercise
        number="6.1"
        prompt={
          <>
            Compute <InlineMath math="\mathbb{E}[X]" /> and{" "}
            <InlineMath math="\operatorname{Var}(X)" /> for a fair die.
          </>
        }
      >
        <p>
          <InlineMath math="\mathbb{E}[X] = (1+2+3+4+5+6)/6 = 21/6 = 3.5" />.
        </p>
        <p>
          <InlineMath math="\mathbb{E}[X^2] = (1+4+9+16+25+36)/6 = 91/6 \approx 15.167" />.
        </p>
        <p>
          <InlineMath math="\operatorname{Var}(X) = 91/6 - (7/2)^2 = 91/6 - 49/4 = 182/12 - 147/12 = 35/12 \approx 2.917" />.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Joint distributions, covariance, correlation</h2>

      <p>
        For two random variables{" "}
        <InlineMath math="X, Y" />, the joint distribution is the
        function (PMF or PDF) describing pairs{" "}
        <InlineMath math="(X, Y)" />:
      </p>
      <BlockMath math="p_{X,Y}(x, y) = P(X = x, Y = y)" />
      <p>
        for discrete, similar density for continuous. Marginal
        distributions are obtained by summing/integrating out the
        unwanted variable:{" "}
        <InlineMath math="p_X(x) = \sum_y p_{X,Y}(x, y)" />.
      </p>

      <p>
        <InlineMath math="X" /> and <InlineMath math="Y" /> are{" "}
        <strong>independent</strong> iff{" "}
        <InlineMath math="p_{X,Y}(x, y) = p_X(x) p_Y(y)" /> for
        all <InlineMath math="x, y" />. This is a much stronger
        condition than uncorrelatedness (next paragraph).
      </p>

      <h3>Covariance and correlation</h3>

      <BlockMath math="\operatorname{Cov}(X, Y) = \mathbb{E}\!\left[(X - \mathbb{E}[X])(Y - \mathbb{E}[Y])\right] = \mathbb{E}[XY] - \mathbb{E}[X] \mathbb{E}[Y]." />

      <p>
        Variance is the special case{" "}
        <InlineMath math="\operatorname{Var}(X) = \operatorname{Cov}(X, X)" />.
      </p>

      <p>
        General sum-of-variances formula:
      </p>
      <BlockMath math="\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) + 2 \operatorname{Cov}(X, Y)." />

      <p>
        Correlation is the dimensionless version:
      </p>
      <BlockMath math="\rho_{X,Y} = \frac{\operatorname{Cov}(X, Y)}{\sigma_X \, \sigma_Y} \in [-1, 1]." />

      <p>
        Equivalent to <InlineMath math="\pm 1" /> iff{" "}
        <InlineMath math="Y" /> is a (positive or negative) linear
        function of <InlineMath math="X" />. Zero correlation is
        the absence of linear dependence.
      </p>

      <Pitfall>
        <strong>Uncorrelated does not mean independent.</strong>{" "}
        Counterexample: let <InlineMath math="X" /> be uniform on{" "}
        <InlineMath math="\{-1, 0, 1\}" /> and{" "}
        <InlineMath math="Y = X^2" />. Then{" "}
        <InlineMath math="\mathbb{E}[XY] = \mathbb{E}[X^3] = 0" />{" "}
        and <InlineMath math="\mathbb{E}[X] = 0" />, so{" "}
        <InlineMath math="\operatorname{Cov}(X, Y) = 0" />. But{" "}
        <InlineMath math="X" /> and{" "}
        <InlineMath math="Y" /> are deeply dependent —{" "}
        <InlineMath math="Y" /> is a function of{" "}
        <InlineMath math="X" />! Independence is a stronger
        condition than zero correlation.
      </Pitfall>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>Statistics &amp; ML.</strong> Every statistical
          inference begins by modelling data as samples from a
          probability distribution. Linear regression assumes an
          additive Gaussian noise model; classification minimises
          expected risk; reinforcement learning maximises
          expected reward.
        </li>
        <li>
          <strong>Information theory.</strong> Entropy{" "}
          <InlineMath math="H(X) = -\sum p(x) \log p(x)" />,
          mutual information, KL divergence — all defined on
          random variables. Shannon's source-coding theorem
          formalises "data compression" as a fundamental limit
          tied to entropy.
        </li>
        <li>
          <strong>Quantum mechanics.</strong> Measurement
          outcomes are random. The Born rule says: if a state is{" "}
          <InlineMath math="\psi = \sum c_n |n\rangle" /> in the
          eigenbasis of an observable, the probability of getting
          eigenvalue <InlineMath math="\lambda_n" /> is{" "}
          <InlineMath math="|c_n|^2" />. Quantum probabilities
          obey the Kolmogorov axioms (Part 1) but the underlying
          state space is fundamentally different — interferences
          and entanglement are real, and they're what make
          quantum non-classical.
        </li>
        <li>
          <strong>Cryptography.</strong> Random number
          generators, key generation, signature nonces, padding
          values — all sample from probability distributions. Bad
          randomness has broken many real systems (the Sony PS3
          ECDSA debacle in the previous chapter is a famous case).
        </li>
      </ul>

      <p>
        Next chapter: the standard catalogue of distributions —
        Bernoulli, binomial, Poisson, normal, exponential — plus
        their relationships. Each models a class of real-world
        phenomena, and many turn out to be limits of one another
        (binomial → Poisson, sum of anything → normal).
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: die sampling
// ════════════════════════════════════════════════════════════

function DieSamplingWidget() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = counts.reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setCounts((c) => {
          const newC = [...c];
          for (let i = 0; i < 50; i++) {
            const r = Math.floor(Math.random() * 6);
            newC[r]++;
          }
          return newC;
        });
      }, 60);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const empMean = total > 0 ? counts.reduce((s, c, i) => s + c * (i + 1), 0) / total : 0;
  const empVar =
    total > 0
      ? counts.reduce((s, c, i) => s + c * (i + 1 - empMean) ** 2, 0) / total
      : 0;

  const w = 360;
  const h = 180;
  const maxCount = Math.max(...counts, 1);

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setRunning((r) => !r)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition ${
              running ? "border-rose-500 bg-rose-500/10 text-rose-300" : "border-accent-soft bg-ink-800 text-white"
            }`}
          >
            {running ? "Stop" : "Roll continuously"}
          </button>
          <button
            onClick={() =>
              setCounts((c) => {
                const newC = [...c];
                const r = Math.floor(Math.random() * 6);
                newC[r]++;
                return newC;
              })
            }
            className="px-3 py-1.5 rounded-lg text-sm border border-ink-800 hover:border-accent-soft text-ink-300"
          >
            Roll once
          </button>
          <button
            onClick={() => {
              setRunning(false);
              setCounts([0, 0, 0, 0, 0, 0]);
            }}
            className="px-3 py-1.5 rounded-lg text-sm border border-ink-800 hover:border-accent-soft text-ink-300"
          >
            Reset
          </button>
          <span className="ml-auto text-xs text-ink-400 self-center">
            {total} rolls
          </span>
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
            {counts.map((c, i) => {
              const barW = w / 6 - 8;
              const barH = total > 0 ? (c / maxCount) * (h - 30) : 0;
              const expBar = total > 0 ? (1 / 6) * total / maxCount * (h - 30) : 0;
              return (
                <g key={i}>
                  {/* expected bar */}
                  <line
                    x1={i * (w / 6) + 4}
                    y1={h - 20 - expBar}
                    x2={i * (w / 6) + 4 + barW}
                    y2={h - 20 - expBar}
                    stroke="#fbbf24"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                  />
                  <rect
                    x={i * (w / 6) + 4}
                    y={h - 20 - barH}
                    width={barW}
                    height={barH}
                    fill="#a78bfa"
                    fillOpacity={0.5}
                    stroke="#a78bfa"
                  />
                  <text x={i * (w / 6) + barW / 2 + 4} y={h - 5} textAnchor="middle" fill="#8e8ea0" fontSize={11}>
                    {i + 1}
                  </text>
                  <text x={i * (w / 6) + barW / 2 + 4} y={h - 24 - barH} textAnchor="middle" fill="#a78bfa" fontSize={10}>
                    {c}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Stat label="empirical mean" value={empMean.toFixed(4)} sub={`(theoretical 3.5000)`} />
          <Stat label="empirical variance" value={empVar.toFixed(4)} sub={`(theoretical ${(35 / 12).toFixed(4)})`} />
        </div>
      </div>
      <figcaption>
        Purple bars: empirical counts. Yellow dashed line: expected
        count under the uniform PMF. Mean and variance converge to
        their theoretical values as <InlineMath math="N \to \infty" /> —
        a consequence of the law of large numbers.
      </figcaption>
    </figure>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg bg-ink-800/60 border border-ink-800 px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-ink-500">{label}</div>
      <div className="font-mono text-ink-100 mt-0.5">{value}</div>
      {sub && <div className="text-[10px] text-ink-500 mt-0.5">{sub}</div>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "If $P(A) = 0.4$ and $P(B) = 0.5$ are independent, what is $P(A \\cap B)$?",
    options: ["0.1", "0.2", "0.5", "0.9"],
    correct: 1,
    explanation:
      "For independent events, $P(A \\cap B) = P(A) \\cdot P(B) = 0.4 \\cdot 0.5 = 0.2$.",
  },
  {
    prompt:
      "What is the expected value of a roll of a fair 6-sided die?",
    options: ["3", "3.5", "4", "6"],
    correct: 1,
    explanation:
      "$\\mathbb{E}[X] = (1 + 2 + 3 + 4 + 5 + 6)/6 = 21/6 = 3.5$. Note expectation need not be an attainable outcome.",
  },
  {
    prompt:
      "By linearity of expectation, $\\mathbb{E}[X + Y]$ equals $\\mathbb{E}[X] + \\mathbb{E}[Y]$…",
    options: [
      "only when $X$ and $Y$ are independent",
      "only when $X$ and $Y$ are uncorrelated",
      "always",
      "only for continuous random variables",
    ],
    correct: 2,
    explanation:
      "Linearity holds unconditionally — independence is not required. This is the most important fact in elementary probability.",
  },
  {
    prompt:
      "$\\operatorname{Var}(X + Y)$ equals $\\operatorname{Var}(X) + \\operatorname{Var}(Y)$…",
    options: [
      "always",
      "only when $X$ and $Y$ are independent (or uncorrelated)",
      "never",
      "only for discrete random variables",
    ],
    correct: 1,
    explanation:
      "$\\operatorname{Var}(X + Y) = \\operatorname{Var}(X) + \\operatorname{Var}(Y) + 2\\operatorname{Cov}(X, Y)$. The covariance term vanishes only if $X, Y$ are uncorrelated.",
  },
  {
    prompt:
      "What's the relationship between independence and zero correlation?",
    options: [
      "they're equivalent",
      "independent ⇒ uncorrelated, but not the reverse",
      "uncorrelated ⇒ independent, but not the reverse",
      "they're unrelated concepts",
    ],
    correct: 1,
    explanation:
      "Independence is strictly stronger. Independent variables always have zero covariance, but zero covariance does not imply independence (the $X, X^2$ example shows a fully-determined dependence with zero correlation).",
  },
];
