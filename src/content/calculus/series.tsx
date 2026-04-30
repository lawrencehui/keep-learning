import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function SeriesBody() {
  return (
    <>
      <p>
        We've worked with finite sums all our lives. What changes when
        the sum has{" "}
        <em>infinitely</em> many terms? The answer requires limits — yet
        another reason last chapter's machinery is load-bearing.
        Sometimes infinite sums add up to a finite number; sometimes
        they grow without bound; sometimes they oscillate. This chapter
        builds the theory of when infinite sums make sense, develops
        the standard convergence tests, and ends with{" "}
        <strong>power series</strong> — infinite polynomials that
        represent functions.
      </p>
      <p>
        The two big payoffs at the end of the chapter:
      </p>
      <ol>
        <li>
          Most "elementary" functions you know (
          <InlineMath math="e^x" />, <InlineMath math="\sin" />,{" "}
          <InlineMath math="\cos" />, <InlineMath math="\ln(1 + x)" />,{" "}
          <InlineMath math="(1 + x)^\alpha" />) have convergent power
          series — they really <em>are</em> infinite polynomials, in
          the sense that the partial sums converge.
        </li>
        <li>
          Euler's formula <InlineMath math="e^{i\theta} = \cos\theta + i \sin\theta" />
          {" "}falls out of comparing power series term-by-term.
        </li>
      </ol>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.01 — Lectures 35–39 (sequences & series)",
            author: "Prof. David Jerison (MIT OCW)",
            duration: "~6h",
            url: "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/video_galleries/video-lectures/",
            note: "End of the canonical course. Pair with our Parts 5–8.",
          },
          {
            title: "Why is π² / 6?",
            author: "3Blue1Brown",
            duration: "21 min",
            url: "https://www.youtube.com/watch?v=d-o3eB9sfls",
            note: "A geometric proof that $\\sum 1/n^2 = \\pi^2/6$ — the Basel problem.",
          },
          {
            title: "Convergence vs divergence (full playlist)",
            author: "Patrick JMT",
            duration: "~3h, lots of short lessons",
            url: "https://www.youtube.com/playlist?list=PLF391FDC0EBE3F90F",
            note: "Practice-heavy. Great if a specific test isn't clicking.",
          },
          {
            title: "Spivak — Calculus, chs. 23–25",
            author: "Michael Spivak",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Calculus_(Spivak)",
            note: "Where the proofs of every test live.",
          },
          {
            title: "What is a Taylor series?",
            author: "3Blue1Brown",
            duration: "23 min",
            url: "https://www.youtube.com/watch?v=3d6DsjIBzJ4",
            note: "Pair with our Part 8.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Sequences</h2>

      <p>
        A <strong>sequence</strong> is an infinite list of numbers{" "}
        <InlineMath math="a_1, a_2, a_3, \dots" />, equivalently a
        function <InlineMath math="\mathbb{N} \to \mathbb{R}" />. We say
        the sequence <strong>converges</strong> to a limit{" "}
        <InlineMath math="L" /> if the terms get arbitrarily close to{" "}
        <InlineMath math="L" /> as <InlineMath math="n" /> grows. The
        formal definition mirrors ε–δ:
      </p>
      <BlockMath math="\lim_{n \to \infty} a_n = L \;\;\Longleftrightarrow\;\; \forall \varepsilon > 0,\; \exists N,\; n \geq N \Rightarrow |a_n - L| < \varepsilon." />
      <p>
        A sequence that doesn't converge to any{" "}
        <InlineMath math="L" /> is said to <strong>diverge</strong>. It
        might diverge to <InlineMath math="\pm \infty" /> (terms grow
        without bound) or oscillate (
        <InlineMath math="a_n = (-1)^n" />).
      </p>

      <p>Examples:</p>
      <ul>
        <li>
          <InlineMath math="a_n = 1/n \to 0" />.
        </li>
        <li>
          <InlineMath math="a_n = (1 + 1/n)^n \to e" />. (We met this in
          Pre-Calc.)
        </li>
        <li>
          <InlineMath math="a_n = (-1)^n" /> diverges (oscillates between
          <InlineMath math="-1" /> and <InlineMath math="+1" />).
        </li>
        <li>
          <InlineMath math="a_n = n^2" /> diverges to infinity.
        </li>
      </ul>

      <p>
        A <strong>monotonic</strong> sequence (increasing or decreasing)
        that is also <strong>bounded</strong> always converges. This is
        the <em>Monotone Convergence Theorem</em>, which is one of the
        big "completeness" properties of <InlineMath math="\mathbb{R}" />
        . The same property fails over <InlineMath math="\mathbb{Q}" />:{" "}
        the sequence{" "}
        <InlineMath math="3, 3.1, 3.14, 3.141, \ldots" /> is monotonic and
        bounded in <InlineMath math="\mathbb{Q}" />, but its limit{" "}
        <InlineMath math="\pi" /> is not a rational number.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Series — definition</h2>

      <p>
        A <strong>series</strong> is the formal infinite sum{" "}
        <InlineMath math="\sum_{n = 1}^{\infty} a_n = a_1 + a_2 + a_3 + \cdots" />
        . To make sense of it, define the{" "}
        <strong>partial sums</strong>:
      </p>
      <BlockMath math="S_N = \sum_{n = 1}^{N} a_n = a_1 + a_2 + \cdots + a_N." />
      <p>
        These form a sequence. The series{" "}
        <strong>converges to</strong> <InlineMath math="S" /> if the
        sequence of partial sums converges to{" "}
        <InlineMath math="S" />:
      </p>
      <BlockMath math="\sum_{n = 1}^{\infty} a_n = S \;\;\Longleftrightarrow\;\; \lim_{N \to \infty} S_N = S." />
      <p>
        Otherwise the series diverges. The widget below visualises this:
        pick a series and watch the partial sums climb (or oscillate, or
        blow up).
      </p>

      <PartialSumWidget />

      <h3>The n-th term test (necessary, not sufficient)</h3>
      <p>
        If <InlineMath math="\sum a_n" /> converges, then{" "}
        <InlineMath math="a_n \to 0" />. Equivalently:{" "}
        <em>if</em>{" "}
        <InlineMath math="a_n \not\to 0" />, the series{" "}
        <em>diverges</em>. This is your first cheap check on any series.
      </p>

      <Pitfall>
        The converse is false. <InlineMath math="a_n \to 0" /> does{" "}
        <em>not</em> guarantee convergence. The harmonic series{" "}
        <InlineMath math="\sum 1/n" /> has terms going to zero but{" "}
        diverges (we'll see this below). "Terms going to zero" is
        necessary but never sufficient for convergence.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Geometric series</h2>

      <p>
        The single most important convergent series:
      </p>
      <BlockMath math="\sum_{n = 0}^{\infty} r^n = 1 + r + r^2 + r^3 + \cdots = \frac{1}{1 - r}, \quad |r| < 1." />
      <p>
        For <InlineMath math="|r| \geq 1" />, the series diverges. The
        proof is direct: the partial sum <InlineMath math="1 + r + \cdots + r^N" /> equals{" "}
        <InlineMath math="(1 - r^{N + 1}) / (1 - r)" /> (multiply by{" "}
        <InlineMath math="1 - r" /> and watch terms cancel). For{" "}
        <InlineMath math="|r| < 1" />,{" "}
        <InlineMath math="r^{N + 1} \to 0" />, so the limit is{" "}
        <InlineMath math="1 / (1 - r)" />.
      </p>

      <p>Familiar consequences:</p>
      <ul>
        <li>
          <InlineMath math="0.999... = \sum_{n = 1}^{\infty} 9 \cdot 10^{-n} = 9 \cdot \frac{1/10}{1 - 1/10} = 1" />. The
          two notations refer to the same number.
        </li>
        <li>
          <InlineMath math="0.\overline{142857} = 1/7" />. Any repeating
          decimal is a geometric series in disguise.
        </li>
        <li>
          <strong>Zeno's paradox.</strong> Achilles runs to where the
          tortoise was, but by then it's moved on; he runs to its new
          position, and so forth. The total distance is a geometric
          series with <InlineMath math="r < 1" /> — finite, despite
          infinitely many steps.
        </li>
      </ul>

      <Exercise
        number="3.1"
        prompt={
          <>
            Find the sum{" "}
            <InlineMath math="\displaystyle \sum_{n = 0}^{\infty} \frac{1}{3^n}" />.
          </>
        }
      >
        <p>
          Geometric with <InlineMath math="r = 1/3 < 1" />. The sum is{" "}
          <InlineMath math="1 / (1 - 1/3) = 3/2" />.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · The p-series</h2>

      <p>
        The <strong>p-series</strong> is{" "}
        <InlineMath math="\sum_{n = 1}^{\infty} 1/n^p" />. The result you
        must memorise:
      </p>
      <BlockMath math="\sum_{n = 1}^{\infty} \frac{1}{n^p} \;\text{ converges iff } p > 1." />

      <p>
        Three special cases worth knowing:
      </p>
      <ul>
        <li>
          <InlineMath math="p = 1" /> (the <strong>harmonic series</strong>):{" "}
          <em>diverges</em>, slowly. The partial sums grow like{" "}
          <InlineMath math="\ln N" />.
        </li>
        <li>
          <InlineMath math="p = 2" /> (the <strong>Basel problem</strong>):{" "}
          converges. Euler proved{" "}
          <InlineMath math="\sum 1/n^2 = \pi^2/6 \approx 1.6449" />.
        </li>
        <li>
          <InlineMath math="p = 4" />:{" "}
          <InlineMath math="\sum 1/n^4 = \pi^4 / 90" />.
        </li>
      </ul>

      <p>
        The harmonic divergence proof is a classic. Group terms in
        chunks of doubling length:
      </p>
      <BlockMath math="1 + \tfrac{1}{2} + \underbrace{(\tfrac{1}{3} + \tfrac{1}{4})}_{> 1/2} + \underbrace{(\tfrac{1}{5} + \cdots + \tfrac{1}{8})}_{> 1/2} + \underbrace{(\tfrac{1}{9} + \cdots + \tfrac{1}{16})}_{> 1/2} + \cdots" />
      <p>
        Each parenthesised group has at least <InlineMath math="1/2" />,
        and there are infinitely many groups, so the sum diverges.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Convergence tests</h2>

      <p>
        Beyond geometric and p-series, a toolbox of tests handles most
        series you'll meet.
      </p>

      <h3>Comparison test</h3>
      <p>
        If <InlineMath math="0 \leq a_n \leq b_n" /> and{" "}
        <InlineMath math="\sum b_n" /> converges, then so does{" "}
        <InlineMath math="\sum a_n" />. Contrapositive: if{" "}
        <InlineMath math="\sum a_n" /> diverges then so does{" "}
        <InlineMath math="\sum b_n" />.
      </p>
      <p>
        Example. <InlineMath math="\sum 1/(n^2 + 1)" /> converges, by
        comparison with <InlineMath math="\sum 1/n^2" />. Each term is
        smaller, and the latter converges.
      </p>

      <h3>Limit comparison test</h3>
      <p>
        If <InlineMath math="a_n, b_n > 0" /> and{" "}
        <InlineMath math="\lim_{n \to \infty} a_n / b_n = L" /> with{" "}
        <InlineMath math="0 < L < \infty" />, then{" "}
        <InlineMath math="\sum a_n" /> and{" "}
        <InlineMath math="\sum b_n" /> have the same convergence
        behaviour. Useful when direct comparison is messy but the ratio
        of leading behaviours is clean.
      </p>
      <p>
        Example. <InlineMath math="\sum (2n + 1) / (n^3 + 5n)" />.
        Compare with <InlineMath math="b_n = 1/n^2" />:{" "}
        <InlineMath math="a_n / b_n \to 2" />, a finite positive limit.
        Since <InlineMath math="\sum 1/n^2" /> converges, so does our
        series.
      </p>

      <h3>Ratio test</h3>
      <p>
        Compute <InlineMath math="L = \lim |a_{n + 1} / a_n|" />.
      </p>
      <ul>
        <li>If <InlineMath math="L < 1" />: series converges absolutely.</li>
        <li>If <InlineMath math="L > 1" />: series diverges.</li>
        <li>If <InlineMath math="L = 1" />: test is inconclusive.</li>
      </ul>
      <p>
        The ratio test is the workhorse for series with factorials,
        exponentials, or powers of <InlineMath math="n" />. Example:{" "}
        <InlineMath math="\sum 2^n / n!" />. Ratio is{" "}
        <InlineMath math="2^{n + 1} / (n + 1)! \cdot n! / 2^n = 2/(n + 1) \to 0" />.{" "}
        <InlineMath math="L = 0 < 1" />, converges.
      </p>

      <h3>Root test</h3>
      <p>
        Compute <InlineMath math="L = \lim |a_n|^{1/n}" />. Same
        verdict as the ratio test (
        <InlineMath math="L < 1" /> converges,{" "}
        <InlineMath math="L > 1" /> diverges,{" "}
        <InlineMath math="L = 1" /> inconclusive). Useful when{" "}
        <InlineMath math="a_n" /> involves an <InlineMath math="n" />-th
        power.
      </p>

      <h3>Integral test</h3>
      <p>
        If <InlineMath math="f" /> is continuous, positive, and
        decreasing on <InlineMath math="[1, \infty)" /> with{" "}
        <InlineMath math="a_n = f(n)" />, then
      </p>
      <BlockMath math="\sum_{n = 1}^{\infty} a_n \text{ converges} \iff \int_1^{\infty} f(x) \, dx \text{ converges}." />
      <p>
        Why this is the same threshold:{" "}
        <InlineMath math="\sum 1/n^p" /> converges iff{" "}
        <InlineMath math="\int 1/x^p \, dx" /> converges. The integral
        test is one of those rare results that quietly justifies a
        memorised fact (the p-series test).
      </p>

      <h3>Alternating series test (Leibniz)</h3>
      <p>
        If <InlineMath math="a_n > 0" />,{" "}
        <InlineMath math="a_n" /> is decreasing, and{" "}
        <InlineMath math="a_n \to 0" />, then{" "}
        <InlineMath math="\sum (-1)^n a_n" /> converges. Example:{" "}
        <InlineMath math="\sum (-1)^n / n = \ln 2 - 1 \approx -0.307" />{" "}
        (the alternating harmonic series).
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Absolute vs conditional convergence</h2>

      <p>
        A series <InlineMath math="\sum a_n" /> converges{" "}
        <strong>absolutely</strong> if{" "}
        <InlineMath math="\sum |a_n|" /> converges. Absolute convergence
        is strictly stronger: it implies convergence (of the original
        series).
      </p>
      <p>
        A series that converges but not absolutely is{" "}
        <strong>conditionally</strong> convergent. The alternating
        harmonic series is the classic example:{" "}
        <InlineMath math="\sum (-1)^n / n" /> converges (alternating
        series test) but <InlineMath math="\sum 1/n" /> diverges.
      </p>
      <p>
        Riemann's rearrangement theorem makes the distinction stark: if{" "}
        <InlineMath math="\sum a_n" /> is conditionally convergent, you
        can rearrange the terms to make the series sum to <em>any</em>{" "}
        real number — or to diverge. Absolute convergence is what
        guarantees rearrangements are safe (and is the right concept
        to demand of "nice" infinite sums).
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Power series</h2>

      <p>
        A <strong>power series centred at</strong>{" "}
        <InlineMath math="a" /> is a series of the form
      </p>
      <BlockMath math="\sum_{n = 0}^{\infty} c_n (x - a)^n = c_0 + c_1 (x - a) + c_2 (x - a)^2 + \cdots" />
      <p>
        For each <InlineMath math="x" />, this is a numerical series we
        can ask about convergence. The set of <InlineMath math="x" />{" "}
        for which it converges is called the{" "}
        <strong>interval of convergence</strong>; its half-width is the{" "}
        <strong>radius of convergence</strong> <InlineMath math="R" />.
      </p>

      <p>
        Computing <InlineMath math="R" />: usually with the ratio test.
        Set <InlineMath math="L = \lim |c_{n + 1} / c_n|" />. Then{" "}
        <InlineMath math="R = 1 / L" /> (with the conventions{" "}
        <InlineMath math="1/0 = \infty" /> and{" "}
        <InlineMath math="1/\infty = 0" />). The series converges
        absolutely for <InlineMath math="|x - a| < R" /> and diverges for{" "}
        <InlineMath math="|x - a| > R" />; behaviour at the boundary{" "}
        <InlineMath math="|x - a| = R" /> needs separate inspection.
      </p>

      <p>
        Inside the interval of convergence, you can differentiate and
        integrate a power series term-by-term. This is the magic that
        makes power series computational tools, not just objects of
        contemplation:
      </p>
      <BlockMath math="\frac{d}{dx} \sum c_n (x - a)^n = \sum c_n \cdot n (x - a)^{n - 1}." />
      <BlockMath math="\int \sum c_n (x - a)^n \, dx = \sum \frac{c_n}{n + 1} (x - a)^{n + 1} + C." />

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Taylor and Maclaurin series</h2>

      <p>
        The <strong>Taylor series</strong> of a function{" "}
        <InlineMath math="f" /> centred at <InlineMath math="a" />:
      </p>
      <BlockMath math="f(x) = \sum_{n = 0}^{\infty} \frac{f^{(n)}(a)}{n!} (x - a)^n." />
      <p>
        The right-hand side is the unique power series whose first{" "}
        <InlineMath math="n" /> derivatives at <InlineMath math="a" />{" "}
        match those of <InlineMath math="f" />, for every{" "}
        <InlineMath math="n" />. When <InlineMath math="a = 0" /> we call
        it a <strong>Maclaurin series</strong>.
      </p>

      <h3>The five you must memorise</h3>

      <BlockMath math="e^x = \sum_{n = 0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots \quad (\text{all } x)" />
      <BlockMath math="\sin x = \sum_{n = 0}^{\infty} \frac{(-1)^n x^{2n + 1}}{(2n + 1)!} = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots \quad (\text{all } x)" />
      <BlockMath math="\cos x = \sum_{n = 0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!} = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots \quad (\text{all } x)" />
      <BlockMath math="\frac{1}{1 - x} = \sum_{n = 0}^{\infty} x^n \quad (|x| < 1)" />
      <BlockMath math="\ln(1 + x) = \sum_{n = 1}^{\infty} \frac{(-1)^{n + 1} x^n}{n} = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots \quad (-1 < x \leq 1)" />

      <h3>Euler's formula falls out by substitution</h3>

      <p>
        Substitute <InlineMath math="x = i\theta" /> into the{" "}
        <InlineMath math="e^x" /> series:
      </p>
      <BlockMath math="e^{i\theta} = 1 + i\theta + \frac{(i\theta)^2}{2!} + \frac{(i\theta)^3}{3!} + \frac{(i\theta)^4}{4!} + \cdots" />
      <p>
        Using <InlineMath math="i^2 = -1, i^3 = -i, i^4 = 1" />,
        separate real and imaginary parts:
      </p>
      <BlockMath math="e^{i\theta} = \left(1 - \frac{\theta^2}{2!} + \frac{\theta^4}{4!} - \cdots\right) + i\left(\theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - \cdots\right) = \cos\theta + i\sin\theta. \quad \blacksquare" />
      <p>
        That's a self-contained proof of Euler's formula in five lines,
        once you have the Taylor series. Worth doing on paper at least
        once. Setting <InlineMath math="\theta = \pi" /> recovers{" "}
        <InlineMath math="e^{i\pi} = -1" />.
      </p>

      <Exercise
        number="8.1"
        prompt={
          <>
            Find the radius of convergence of{" "}
            <InlineMath math="\sum_{n = 0}^{\infty} \dfrac{x^n}{n!}" />.
          </>
        }
      >
        <p>
          Ratio test:{" "}
          <InlineMath math="|c_{n + 1} / c_n| = (1/(n + 1)!) / (1/n!) = 1/(n + 1) \to 0" />
          . So <InlineMath math="L = 0" />, hence{" "}
          <InlineMath math="R = 1/L = \infty" />. The series for{" "}
          <InlineMath math="e^x" /> converges everywhere on{" "}
          <InlineMath math="\mathbb{R}" /> (and on{" "}
          <InlineMath math="\mathbb{C}" />). ∎
        </p>
      </Exercise>

      <Exercise
        number="8.2"
        prompt={
          <>
            Use the Taylor series for{" "}
            <InlineMath math="\sin x" /> to estimate{" "}
            <InlineMath math="\sin(0.1)" /> to four decimals.
          </>
        }
      >
        <p>
          Two terms suffice for this precision:{" "}
          <InlineMath math="\sin(0.1) \approx 0.1 - (0.1)^3/6 = 0.1 - 0.00016\overline{6} = 0.09983\overline{3}" />
          . The next term <InlineMath math="(0.1)^5 / 120 \approx 8.3 \times 10^{-8}" /> is
          well below the precision threshold. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 9  ───────────────────────────── */}
      <h2>Part 9 · Why this matters</h2>

      <p>
        Series sit at the foundations of more advanced math than you
        might expect:
      </p>
      <ul>
        <li>
          <strong>Numerical computing.</strong> Every calculator
          computes <InlineMath math="\sin, \cos, \exp, \ln" /> by
          truncating Taylor series (with extra cleverness to control
          error). When you press{" "}
          <InlineMath math="\sin" /> on a phone, a polynomial fit derived
          from a Taylor series is what runs.
        </li>
        <li>
          <strong>Differential equations.</strong> Many ODEs that have
          no closed-form solution can be solved by{" "}
          <em>power series methods</em>: assume{" "}
          <InlineMath math="y = \sum c_n x^n" />, plug into the equation,
          solve for the coefficients recursively. Bessel functions,
          Legendre polynomials, and the wave functions of the quantum
          harmonic oscillator are all defined this way.
        </li>
        <li>
          <strong>Fourier analysis</strong> uses <em>infinite trig
          series</em> (a Fourier series) to represent a periodic
          function. The convergence theory we built here is the
          foundation. Every quantum wavefunction can be expanded in a
          Fourier basis on a finite domain.
        </li>
        <li>
          <strong>Quantum perturbation theory</strong> is the systematic
          use of Taylor series in the small parameter that distinguishes
          a hard problem from a known one. Every term of the expansion
          is a higher-order correction. Truncated at second or third
          order, this is how most non-trivial quantum systems get
          calculated.
        </li>
        <li>
          <strong>Generating functions</strong> in combinatorics — power
          series whose coefficients encode counting sequences — turn
          recurrences into algebraic equations.
        </li>
      </ul>

      <p>
        This closes the single-variable calculus chapter. From here we
        go multivariable (functions of several inputs, and the
        derivatives and integrals that come with them), then linear
        algebra, then onward to the modules where these ideas combine.
        The next time you see <InlineMath math="e^{i\theta}" /> in a
        physics derivation, remember: it's a power series identity, and
        you've now derived it from scratch.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: partial sum chart
// ════════════════════════════════════════════════════════════

type SeriesKind = "geometric_half" | "geometric_two" | "harmonic" | "p2" | "alt_harmonic" | "factorial";

interface SeriesDef {
  term: (n: number) => number; // 1-indexed
  latex: string;
  expectedLimit: number | null;
  description: string;
}

const seriesDefs: Record<SeriesKind, SeriesDef> = {
  geometric_half: {
    term: (n) => Math.pow(0.5, n - 1),
    latex: "\\sum (1/2)^{n-1}",
    expectedLimit: 2,
    description: "Geometric, r = 1/2 — converges to 2.",
  },
  geometric_two: {
    term: (n) => Math.pow(2, n - 1),
    latex: "\\sum 2^{n-1}",
    expectedLimit: null,
    description: "Geometric, r = 2 — diverges to infinity.",
  },
  harmonic: {
    term: (n) => 1 / n,
    latex: "\\sum 1/n",
    expectedLimit: null,
    description: "Harmonic — diverges (slowly, like ln n).",
  },
  p2: {
    term: (n) => 1 / (n * n),
    latex: "\\sum 1/n^2",
    expectedLimit: Math.PI ** 2 / 6,
    description: "p-series with p=2 — Basel: π²/6 ≈ 1.6449.",
  },
  alt_harmonic: {
    term: (n) => Math.pow(-1, n + 1) / n,
    latex: "\\sum (-1)^{n+1}/n",
    expectedLimit: Math.log(2),
    description: "Alternating harmonic — converges to ln 2 ≈ 0.6931.",
  },
  factorial: {
    term: (n) => 1 / factorial(n - 1),
    latex: "\\sum 1/(n-1)!",
    expectedLimit: Math.E,
    description: "Σ 1/n! starting n=0 — converges to e ≈ 2.7183.",
  },
};

function factorial(n: number): number {
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}

function PartialSumWidget() {
  const [kind, setKind] = useState<SeriesKind>("geometric_half");
  const [N, setN] = useState(20);

  const def = seriesDefs[kind];

  const partials: number[] = [];
  let acc = 0;
  for (let i = 1; i <= N; i++) {
    acc += def.term(i);
    partials.push(acc);
  }

  // Plot
  const w = 360;
  const h = 200;
  const xMin = 1;
  const xMax = N;

  let yMin = Math.min(...partials);
  let yMax = Math.max(...partials);
  if (def.expectedLimit !== null) {
    yMin = Math.min(yMin, def.expectedLimit);
    yMax = Math.max(yMax, def.expectedLimit);
  }
  const pad = (yMax - yMin) * 0.15 || 0.5;
  yMin -= pad;
  yMax += pad;

  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * w;
  const sy = (y: number) => h - ((y - yMin) / (yMax - yMin)) * h;

  const pts = partials
    .map((p, i) => `${i === 0 ? "M" : "L"}${sx(i + 1).toFixed(2)},${sy(p).toFixed(2)}`)
    .join(" ");

  const lastSum = partials[partials.length - 1];

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs uppercase tracking-widest text-ink-500 self-center mr-1">
            Series
          </span>
          {(Object.keys(seriesDefs) as SeriesKind[]).map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm border transition ${
                kind === k
                  ? "border-accent-soft bg-ink-800 text-white"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              <InlineMath math={seriesDefs[k].latex} />
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
            <line x1={0} y1={sy(0)} x2={w} y2={sy(0)} stroke="#2a2a37" />

            {def.expectedLimit !== null && isFinite(def.expectedLimit) && def.expectedLimit >= yMin && def.expectedLimit <= yMax && (
              <line
                x1={0}
                y1={sy(def.expectedLimit)}
                x2={w}
                y2={sy(def.expectedLimit)}
                stroke="#fbbf24"
                strokeWidth={1}
                strokeDasharray="4 3"
                strokeOpacity={0.7}
              />
            )}

            <path d={pts} fill="none" stroke="#a78bfa" strokeWidth={1.8} />
            {partials.map((p, i) => (
              <circle key={i} cx={sx(i + 1)} cy={sy(p)} r={1.8} fill="#a78bfa" />
            ))}
          </svg>
        </div>

        <div>
          <div className="flex items-baseline justify-between text-xs text-ink-400 mb-1">
            <span>Number of terms</span>
            <span className="font-mono text-ink-200">N = {N}</span>
          </div>
          <input
            type="range"
            min={1}
            max={500}
            step={1}
            value={N}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full accent-accent-soft"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Stat label={`Partial sum S_${N}`} value={lastSum.toFixed(5)} />
          <Stat
            label="True limit"
            value={
              def.expectedLimit === null
                ? "diverges"
                : def.expectedLimit.toFixed(5)
            }
          />
        </div>

        <p className="text-xs text-ink-400">{def.description}</p>
      </div>
      <figcaption>
        Purple curve: partial sums <InlineMath math="S_N" />. Yellow
        dashed line (when present): the true limit. As you slide{" "}
        <InlineMath math="N" /> up, watch the partial sums settle —
        or refuse to.
      </figcaption>
    </figure>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ink-800/60 border border-ink-800 px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-ink-500">
        {label}
      </div>
      <div className="font-mono text-ink-100 mt-0.5">{value}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "Sum the geometric series $\\displaystyle \\sum_{n=0}^{\\infty} (2/3)^n$.",
    options: ["$1$", "$3/2$", "$3$", "Diverges"],
    correct: 2,
    explanation:
      "$|r| = 2/3 < 1$, so the sum is $1/(1 - 2/3) = 1/(1/3) = 3$.",
  },
  {
    prompt:
      "Which of the following series **converges**?",
    options: [
      "$\\sum 1/n$",
      "$\\sum 1/\\sqrt{n}$",
      "$\\sum 1/n^{1.01}$",
      "$\\sum 1/\\ln n$",
    ],
    correct: 2,
    explanation:
      "$\\sum 1/n^p$ converges iff $p > 1$. The harmonic ($p = 1$) and $p = 1/2$ diverge; $p = 1.01$ converges (just barely). The last one diverges by comparison with the harmonic, since $1/\\ln n > 1/n$ for $n > 3$.",
  },
  {
    prompt:
      "Apply the ratio test to $\\sum n / 2^n$. The limit is…",
    options: ["$0$", "$1/2$", "$1$", "$2$"],
    correct: 1,
    explanation:
      "$|a_{n+1}/a_n| = (n+1)/(2n) \\to 1/2 < 1$, so the series converges.",
  },
  {
    prompt:
      "The Taylor series for $\\cos x$ centred at $0$ is…",
    options: [
      "$1 + x^2/2! + x^4/4! + \\cdots$",
      "$x - x^3/3! + x^5/5! - \\cdots$",
      "$1 - x^2/2! + x^4/4! - \\cdots$",
      "$1 - x + x^2/2 - x^3/6 + \\cdots$",
    ],
    correct: 2,
    explanation:
      "$\\cos x$ is even, so the series has only even powers, with alternating signs. The first few terms are $1 - x^2/2! + x^4/4! - x^6/6! + \\cdots$.",
  },
  {
    prompt:
      "Which best describes the alternating harmonic series $\\sum (-1)^{n+1}/n$?",
    options: [
      "Converges absolutely",
      "Converges conditionally",
      "Diverges to infinity",
      "Oscillates without limit",
    ],
    correct: 1,
    explanation:
      "It converges (by the alternating-series test) but $\\sum 1/n$ diverges, so it doesn't converge absolutely. That's the definition of conditional convergence. Riemann's rearrangement theorem says the terms can be reordered to sum to anything.",
  },
];
