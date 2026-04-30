import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function IntegralsBody() {
  return (
    <>
      <p>
        Two seemingly unrelated problems sit at the heart of calculus.
        One is{" "}
        <em>differentiation</em>: rates of change, slopes of tangent
        lines, the topic of the previous chapter. The other is{" "}
        <em>integration</em>: areas under curves, accumulated totals,
        distances travelled. The breathtaking result of single-variable
        calculus — the Fundamental Theorem of Calculus — is that these
        two problems are <em>inverses of each other</em>. Differentiation
        and integration undo each other in a precise sense.
      </p>
      <p>
        That insight is what made calculus worth inventing. Computing
        areas was hard for the Greeks (Archimedes used "the method of
        exhaustion" — essentially Riemann sums in slow motion); computing
        derivatives turned out to be straightforward by the late 1600s.
        The FTC says that if you can differentiate, you can integrate (in
        many cases, by reading the table backward). This chapter builds
        the integral from scratch, proves the FTC, and develops the
        toolkit (substitution, parts, partial fractions) that handles
        most integrals you'll meet.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.01 — Lectures 18–28 (integrals)",
            author: "Prof. David Jerison (MIT OCW)",
            duration: "~12h",
            url: "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/video_galleries/video-lectures/",
            note: "The integration half of the canonical course.",
          },
          {
            title: "Essence of Calculus — Ch. 8: Integration & FTC",
            author: "3Blue1Brown",
            duration: "20 min",
            url: "https://www.youtube.com/watch?v=rfG8ce4nNh0",
            note: "Visualises why FTC is true. Pairs with our Part 3.",
          },
          {
            title: "Essence of Calculus — Ch. 9: Area between curves",
            author: "3Blue1Brown",
            duration: "10 min",
            url: "https://www.youtube.com/watch?v=jMS_oGgZv1g",
            note: "Quick follow-up — applications.",
          },
          {
            title: "Spivak — Calculus, chs. 13–19",
            author: "Michael Spivak",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Calculus_(Spivak)",
            note: "Builds the integral from upper/lower Darboux sums with full rigour.",
          },
          {
            title: "Stewart — Calculus, chs. 5–7",
            author: "James Stewart",
            duration: "Reading",
            url: "https://www.stewartcalculus.com/",
            note: "Hundreds of worked techniques-of-integration problems.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The area problem &amp; Riemann sums</h2>

      <p>
        Given a non-negative function <InlineMath math="f" /> on{" "}
        <InlineMath math="[a, b]" />, we want to compute the area
        bounded above by the graph, below by the <InlineMath math="x" />
        -axis, and on the sides by the vertical lines at{" "}
        <InlineMath math="x = a" /> and <InlineMath math="x = b" />. Call
        this area <InlineMath math="A" />.
      </p>
      <p>
        The strategy that goes back to Archimedes: chop{" "}
        <InlineMath math="[a, b]" /> into <InlineMath math="n" /> equal
        sub-intervals, each of width{" "}
        <InlineMath math="\Delta x = (b - a) / n" />. On each
        sub-interval pick a sample point{" "}
        <InlineMath math="x_i^*" />, and approximate the area on that
        sub-interval as a rectangle of height{" "}
        <InlineMath math="f(x_i^*)" /> and width{" "}
        <InlineMath math="\Delta x" />. The sum of these rectangles is a{" "}
        <strong>Riemann sum</strong>:
      </p>
      <BlockMath math="S_n = \sum_{i = 1}^{n} f(x_i^*) \, \Delta x." />

      <p>
        As <InlineMath math="n \to \infty" /> (rectangles get thinner and
        more numerous), the Riemann sum approaches the true area —
        provided <InlineMath math="f" /> is reasonable enough. We define
      </p>
      <BlockMath math="\int_a^b f(x) \, dx \;:=\; \lim_{n \to \infty} \sum_{i = 1}^{n} f(x_i^*) \, \Delta x," />
      <p>
        when this limit exists independent of the choice of sample
        points <InlineMath math="x_i^*" />. A function for which the
        limit exists is called <strong>Riemann integrable</strong>. Every
        continuous function on a closed bounded interval is Riemann
        integrable; so are most "reasonable" functions you'll encounter.
        Truly pathological functions (like the indicator of the
        rationals) are not.
      </p>

      <Callout title="Try it">
        Pick a function and a number of rectangles. As you slide{" "}
        <InlineMath math="n" /> up, the staircase converges to the
        smooth curve and the Riemann sum approaches the exact integral
        (shown for comparison).
      </Callout>

      <RiemannSumWidget />

      <h3>What "area" means when <InlineMath math="f" /> goes negative</h3>
      <p>
        The integral as defined above counts area below the{" "}
        <InlineMath math="x" />-axis as <em>negative</em>. Specifically,
      </p>
      <BlockMath math="\int_0^{2\pi} \sin x \, dx = 0," />
      <p>
        because the bumps above and below the axis cancel exactly. If
        you want geometric (always-positive) area, integrate{" "}
        <InlineMath math="|f|" /> instead.
      </p>

      <h3>Basic properties</h3>
      <p>
        Three identities you'll use without thinking:
      </p>
      <ul>
        <li>
          <strong>Linearity:</strong>{" "}
          <InlineMath math="\int_a^b (\alpha f + \beta g) \, dx = \alpha \int_a^b f \, dx + \beta \int_a^b g \, dx" />
          .
        </li>
        <li>
          <strong>Additivity:</strong>{" "}
          <InlineMath math="\int_a^b f \, dx + \int_b^c f \, dx = \int_a^c f \, dx" />
          , for any <InlineMath math="b" /> in between.
        </li>
        <li>
          <strong>Reverse direction:</strong>{" "}
          <InlineMath math="\int_b^a f \, dx = -\int_a^b f \, dx" />.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Antiderivatives</h2>

      <p>
        An <strong>antiderivative</strong> of <InlineMath math="f" /> is
        any function <InlineMath math="F" /> with{" "}
        <InlineMath math="F'(x) = f(x)" />. Antiderivatives are not
        unique — if <InlineMath math="F" /> is one, so is{" "}
        <InlineMath math="F + C" /> for any constant{" "}
        <InlineMath math="C" /> (the derivative of a constant is zero,
        so it doesn't change the slope). The MVT corollary from the
        previous chapter says these are the <em>only</em> antiderivatives:
        any two antiderivatives of <InlineMath math="f" /> differ by a
        constant.
      </p>
      <p>
        We write the family of antiderivatives as the{" "}
        <strong>indefinite integral</strong>:
      </p>
      <BlockMath math="\int f(x) \, dx = F(x) + C." />
      <p>
        Note: indefinite integrals do <em>not</em> have limits of
        integration. They denote a family of functions, not a number.
        Definite integrals (with bounds <InlineMath math="a" /> and{" "}
        <InlineMath math="b" />) denote a number — the area.
      </p>

      <h3>Reading the derivative table backward</h3>
      <p>
        Every derivative formula from last chapter becomes an
        antiderivative formula:
      </p>
      <BlockMath math="\int x^n \, dx = \frac{x^{n+1}}{n + 1} + C \quad (n \neq -1)" />
      <BlockMath math="\int x^{-1} \, dx = \ln |x| + C" />
      <BlockMath math="\int e^x \, dx = e^x + C" />
      <BlockMath math="\int \cos x \, dx = \sin x + C" />
      <BlockMath math="\int \sin x \, dx = -\cos x + C" />
      <BlockMath math="\int \frac{1}{1 + x^2} \, dx = \arctan x + C" />

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · The Fundamental Theorem of Calculus</h2>

      <p>
        The FTC has two parts. They are the most important theorems in
        single-variable calculus.
      </p>

      <Callout title="FTC, Part I (the differentiation form)">
        If <InlineMath math="f" /> is continuous on{" "}
        <InlineMath math="[a, b]" />, define{" "}
        <InlineMath math="F(x) = \int_a^x f(t) \, dt" /> for{" "}
        <InlineMath math="x \in [a, b]" />. Then <InlineMath math="F" /> is
        differentiable on <InlineMath math="(a, b)" /> and{" "}
        <InlineMath math="F'(x) = f(x)" />.
      </Callout>

      <p>
        In words: differentiating an "area-so-far" function gives back
        the original function. Integration and differentiation are
        inverses.
      </p>
      <p>
        <strong>Proof sketch.</strong> By definition,
      </p>
      <BlockMath math="F(x + h) - F(x) = \int_x^{x + h} f(t) \, dt." />
      <p>
        For small <InlineMath math="h" /> with{" "}
        <InlineMath math="f" /> continuous, this integral is{" "}
        approximately <InlineMath math="f(x) \cdot h" /> (a thin slab of
        height <InlineMath math="f(x)" />). Divide by{" "}
        <InlineMath math="h" /> and take the limit; you get{" "}
        <InlineMath math="f(x)" />. The full proof uses the MVT for
        integrals to make the approximation exact. ∎
      </p>

      <Callout title="FTC, Part II (the evaluation form)">
        If <InlineMath math="f" /> is continuous on{" "}
        <InlineMath math="[a, b]" /> and <InlineMath math="F" /> is{" "}
        <em>any</em> antiderivative of <InlineMath math="f" /> there, then
        <BlockMath math="\int_a^b f(x) \, dx = F(b) - F(a)." />
      </Callout>

      <p>
        This is the form you actually use to compute integrals. To find{" "}
        <InlineMath math="\int_a^b f \, dx" />: find an antiderivative{" "}
        <InlineMath math="F" />, then plug in <InlineMath math="b" /> and{" "}
        <InlineMath math="a" /> and subtract. The notation{" "}
        <InlineMath math="\bigl[F(x)\bigr]_a^b" /> means{" "}
        <InlineMath math="F(b) - F(a)" />.
      </p>

      <p>
        <strong>Worked example.</strong>
      </p>
      <BlockMath math="\int_0^1 x^2 \, dx = \left[\frac{x^3}{3}\right]_0^1 = \frac{1}{3} - 0 = \frac{1}{3}." />

      <Pitfall>
        FTC Part II requires <InlineMath math="f" /> to be continuous (or
        at least, integrable; continuity is the easy sufficient
        condition). Applying it across a discontinuity gives nonsense:{" "}
        <InlineMath math="\int_{-1}^1 1/x^2 \, dx" /> is <em>not</em>{" "}
        <InlineMath math="[-1/x]_{-1}^1 = -2" />; the integrand blows up
        at 0 and the integral is improperly divergent (Part 8 below).
      </Pitfall>

      <Exercise
        number="3.1"
        prompt={
          <>
            Compute{" "}
            <InlineMath math="\displaystyle \int_0^{\pi} \sin x \, dx" />.
          </>
        }
      >
        <p>
          Antiderivative of <InlineMath math="\sin x" /> is{" "}
          <InlineMath math="-\cos x" />. So
        </p>
        <BlockMath math="\int_0^{\pi} \sin x \, dx = [-\cos x]_0^{\pi} = -\cos \pi - (-\cos 0) = -(-1) - (-1) = 2." />
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Substitution (the chain rule, backward)</h2>

      <p>
        The chain rule says{" "}
        <InlineMath math="(F \circ g)'(x) = F'(g(x)) \cdot g'(x)" />.
        Integrating both sides:
      </p>
      <BlockMath math="\int F'(g(x)) \, g'(x) \, dx = F(g(x)) + C." />
      <p>
        That's the substitution rule. In practice, set{" "}
        <InlineMath math="u = g(x)" /> so that{" "}
        <InlineMath math="du = g'(x) \, dx" />. The integral transforms:
      </p>
      <BlockMath math="\int f(g(x)) \, g'(x) \, dx = \int f(u) \, du." />
      <p>
        Pick <InlineMath math="u" /> so that <InlineMath math="du" /> is
        already lurking in the integrand (or differs by a constant).
      </p>

      <p>
        <strong>Worked example.</strong>{" "}
        <InlineMath math="\int 2x \cos(x^2) \, dx" />.
      </p>
      <p>
        Let <InlineMath math="u = x^2" />. Then{" "}
        <InlineMath math="du = 2x \, dx" />, exactly the rest of the
        integrand. So
      </p>
      <BlockMath math="\int 2x \cos(x^2) \, dx = \int \cos u \, du = \sin u + C = \sin(x^2) + C." />

      <p>
        For <em>definite</em> integrals, change the limits too — when{" "}
        <InlineMath math="x" /> goes from <InlineMath math="a" /> to{" "}
        <InlineMath math="b" />, <InlineMath math="u" /> goes from{" "}
        <InlineMath math="g(a)" /> to <InlineMath math="g(b)" />:
      </p>
      <BlockMath math="\int_0^{\sqrt{\pi}} 2x \cos(x^2) \, dx = \int_0^{\pi} \cos u \, du = [\sin u]_0^{\pi} = 0." />

      <Exercise
        number="4.1"
        prompt={
          <>
            Compute{" "}
            <InlineMath math="\displaystyle \int \frac{x}{x^2 + 1} \, dx" />
            .
          </>
        }
      >
        <p>
          Let <InlineMath math="u = x^2 + 1" />, so{" "}
          <InlineMath math="du = 2x \, dx" />, hence{" "}
          <InlineMath math="x \, dx = du / 2" />.
        </p>
        <BlockMath math="\int \frac{x}{x^2 + 1} \, dx = \int \frac{1}{u} \cdot \frac{du}{2} = \frac{1}{2} \ln |u| + C = \frac{1}{2} \ln(x^2 + 1) + C." />
        <p>(Absolute value optional here because <InlineMath math="x^2 + 1 > 0" /> always.)</p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Integration by parts (the product rule, backward)</h2>

      <p>
        From the product rule{" "}
        <InlineMath math="(uv)' = u'v + u v'" />, integrating both sides:
      </p>
      <BlockMath math="\int u'(x) \, v(x) \, dx + \int u(x) \, v'(x) \, dx = u(x) v(x)." />
      <p>
        Rearrange to get the <strong>integration by parts formula</strong>:
      </p>
      <BlockMath math="\int u \, dv = u v - \int v \, du." />

      <p>
        The art is choosing <InlineMath math="u" /> and{" "}
        <InlineMath math="dv" /> so that the new integral{" "}
        <InlineMath math="\int v \, du" /> is simpler than the original.
        The mnemonic <strong>LIATE</strong> — Logarithmic,
        Inverse-trig, Algebraic, Trigonometric, Exponential — picks{" "}
        <InlineMath math="u" /> as whichever appears earliest in the list
        (it'll get differentiated, simplifying it).
      </p>

      <p>
        <strong>Worked example.</strong>{" "}
        <InlineMath math="\int x e^x \, dx" />.
      </p>
      <p>
        LIATE picks <InlineMath math="u = x" /> (algebraic) and{" "}
        <InlineMath math="dv = e^x \, dx" /> (exponential). Then{" "}
        <InlineMath math="du = dx" /> and{" "}
        <InlineMath math="v = e^x" />. So
      </p>
      <BlockMath math="\int x e^x \, dx = x e^x - \int e^x \, dx = x e^x - e^x + C = e^x(x - 1) + C." />

      <Exercise
        number="5.1"
        prompt={
          <>
            Compute <InlineMath math="\int \ln x \, dx" />.
          </>
        }
      >
        <p>
          Looks like there's only one factor — but write{" "}
          <InlineMath math="\ln x = \ln x \cdot 1" /> and pick{" "}
          <InlineMath math="u = \ln x" />,{" "}
          <InlineMath math="dv = dx" />. Then{" "}
          <InlineMath math="du = (1/x) \, dx" />,{" "}
          <InlineMath math="v = x" />.
        </p>
        <BlockMath math="\int \ln x \, dx = x \ln x - \int x \cdot \frac{1}{x} \, dx = x \ln x - x + C." />
      </Exercise>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Partial fractions</h2>

      <p>
        For rational integrands{" "}
        <InlineMath math="P(x) / Q(x)" />: factor the denominator{" "}
        <InlineMath math="Q(x)" /> into linear and irreducible quadratic
        pieces, then write the rational function as a sum of simpler
        fractions, each of which is easy to integrate.
      </p>

      <p>
        <strong>Worked example.</strong>{" "}
        <InlineMath math="\displaystyle \int \frac{1}{x^2 - 1} \, dx" />.
      </p>
      <p>
        Factor: <InlineMath math="x^2 - 1 = (x - 1)(x + 1)" />. Write
      </p>
      <BlockMath math="\frac{1}{(x - 1)(x + 1)} = \frac{A}{x - 1} + \frac{B}{x + 1}." />
      <p>
        Multiply through by <InlineMath math="(x - 1)(x + 1)" />:{" "}
        <InlineMath math="1 = A(x + 1) + B(x - 1)" />. Set{" "}
        <InlineMath math="x = 1" />:{" "}
        <InlineMath math="1 = 2A" />, so <InlineMath math="A = 1/2" />.
        Set <InlineMath math="x = -1" />:{" "}
        <InlineMath math="1 = -2B" />, so <InlineMath math="B = -1/2" />.
      </p>
      <BlockMath math="\int \frac{1}{x^2 - 1} \, dx = \frac{1}{2} \int \frac{1}{x - 1} \, dx - \frac{1}{2} \int \frac{1}{x + 1} \, dx = \frac{1}{2} \ln \left| \frac{x - 1}{x + 1} \right| + C." />

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Trigonometric substitution</h2>

      <p>
        For integrands containing{" "}
        <InlineMath math="\sqrt{a^2 - x^2}" />,{" "}
        <InlineMath math="\sqrt{a^2 + x^2}" />, or{" "}
        <InlineMath math="\sqrt{x^2 - a^2}" />, a clever substitution
        clears the square root. The three:
      </p>
      <ul>
        <li>
          <InlineMath math="\sqrt{a^2 - x^2}" />: let{" "}
          <InlineMath math="x = a \sin \theta" />, then{" "}
          <InlineMath math="\sqrt{a^2 - x^2} = a \cos\theta" />.
        </li>
        <li>
          <InlineMath math="\sqrt{a^2 + x^2}" />: let{" "}
          <InlineMath math="x = a \tan \theta" />, then{" "}
          <InlineMath math="\sqrt{a^2 + x^2} = a \sec\theta" />.
        </li>
        <li>
          <InlineMath math="\sqrt{x^2 - a^2}" />: let{" "}
          <InlineMath math="x = a \sec \theta" />, then{" "}
          <InlineMath math="\sqrt{x^2 - a^2} = a \tan\theta" />.
        </li>
      </ul>
      <p>
        These work because of the identities{" "}
        <InlineMath math="1 - \sin^2 = \cos^2" />,{" "}
        <InlineMath math="1 + \tan^2 = \sec^2" />, and{" "}
        <InlineMath math="\sec^2 - 1 = \tan^2" />. Substitute, simplify,
        integrate, then back-substitute to recover{" "}
        <InlineMath math="x" />.
      </p>

      <p>
        Worked example: the area of a quarter unit circle.
      </p>
      <BlockMath math="\int_0^1 \sqrt{1 - x^2} \, dx = \frac{\pi}{4}." />
      <p>
        Use <InlineMath math="x = \sin\theta" />,{" "}
        <InlineMath math="dx = \cos\theta \, d\theta" />,{" "}
        <InlineMath math="\sqrt{1 - x^2} = \cos\theta" />. Limits:{" "}
        <InlineMath math="x = 0 \to \theta = 0" />,{" "}
        <InlineMath math="x = 1 \to \theta = \pi/2" />.
      </p>
      <BlockMath math="\int_0^{\pi/2} \cos\theta \cdot \cos\theta \, d\theta = \int_0^{\pi/2} \cos^2\theta \, d\theta = \int_0^{\pi/2} \frac{1 + \cos 2\theta}{2} \, d\theta = \frac{\pi}{4}." />
      <p>
        The numerical answer matches the geometric one — the area of a
        quarter unit circle is <InlineMath math="\pi r^2 / 4 = \pi/4" />.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Improper integrals</h2>

      <p>
        Two flavours of "improper" integrals fall outside the basic
        Riemann setup:
      </p>
      <ol>
        <li>
          The interval is unbounded:{" "}
          <InlineMath math="\int_a^\infty" /> or{" "}
          <InlineMath math="\int_{-\infty}^\infty" />.
        </li>
        <li>
          The integrand has a vertical asymptote inside the interval.
        </li>
      </ol>
      <p>
        Both are handled by the same trick: write the troublesome piece
        as a limit. For unbounded intervals,
      </p>
      <BlockMath math="\int_a^{\infty} f(x) \, dx \;:=\; \lim_{R \to \infty} \int_a^R f(x) \, dx," />
      <p>
        provided the limit exists (in which case we say the integral{" "}
        <em>converges</em>; otherwise it diverges).
      </p>

      <p>
        <strong>Worked example.</strong>{" "}
        <InlineMath math="\int_1^{\infty} 1/x^2 \, dx" />.
      </p>
      <BlockMath math="\lim_{R \to \infty} \int_1^R \frac{1}{x^2} \, dx = \lim_{R \to \infty} \left[-\frac{1}{x}\right]_1^R = \lim_{R \to \infty} \left(1 - \frac{1}{R}\right) = 1." />
      <p>
        The integral converges to 1 — a finite area despite an infinite
        domain.
      </p>

      <p>
        Compare with{" "}
        <InlineMath math="\int_1^{\infty} 1/x \, dx" />:
      </p>
      <BlockMath math="\lim_{R \to \infty} [\ln x]_1^R = \lim_{R \to \infty} \ln R = \infty." />
      <p>
        That one <em>diverges</em>, despite{" "}
        <InlineMath math="1/x \to 0" />. The lesson: convergence of an
        improper integral is delicate. The boundary is roughly the{" "}
        <InlineMath math="p" />-test:{" "}
        <InlineMath math="\int_1^{\infty} 1/x^p \, dx" /> converges iff{" "}
        <InlineMath math="p > 1" />. We'll see the same threshold for{" "}
        <InlineMath math="p" />-series in the next chapter — not a
        coincidence.
      </p>

      {/* ─────────────────────────────  PART 9  ───────────────────────────── */}
      <h2>Part 9 · Why this matters</h2>

      <p>
        Where integrals appear:
      </p>
      <ul>
        <li>
          <strong>Physics.</strong> Work is{" "}
          <InlineMath math="\int F \, dx" />; charge accumulated is{" "}
          <InlineMath math="\int I \, dt" />; expectation values in
          probability and quantum mechanics are integrals against a
          distribution. Everything that "totals up" or "adds over a
          continuum" is an integral.
        </li>
        <li>
          <strong>Probability.</strong> A continuous probability
          distribution has a density{" "}
          <InlineMath math="p(x)" /> with{" "}
          <InlineMath math="\int_{-\infty}^{\infty} p \, dx = 1" />.
          Probabilities of intervals come from definite integrals of{" "}
          <InlineMath math="p" />.
        </li>
        <li>
          <strong>Differential equations.</strong> Solving an ODE often
          reduces to "find the antiderivative." The methods in Tier V
          all rely on FTC and the techniques in this chapter.
        </li>
        <li>
          <strong>Quantum mechanics.</strong> Wave functions are
          normalised by{" "}
          <InlineMath math="\int |\psi|^2 \, dx = 1" />; transitions and
          observables are computed as inner products{" "}
          <InlineMath math="\int \psi^* \hat O \psi \, dx" />. Without
          integration there's no quantum theory.
        </li>
        <li>
          <strong>Fourier analysis</strong> (Tier VIII) decomposes
          functions into sines and cosines via integrals. Quantum
          information uses Fourier transforms over finite groups; the
          Quantum Fourier Transform is the heart of Shor's algorithm.
        </li>
      </ul>

      <p>
        Build fluency with definite and indefinite integrals the same
        way you did with derivatives. The integration table is shorter
        than the differentiation table, and the techniques are fewer (
        <em>substitution</em>, <em>parts</em>,{" "}
        <em>partial fractions</em>, <em>trig sub</em>) — but the volume
        of practice problems matters. Push through Stewart's exercises
        until u-substitution feels automatic.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: Riemann sum
// ════════════════════════════════════════════════════════════

type IFunc = "x2" | "sin" | "cubic" | "exp";

const ifuncs: Record<IFunc, { f: (x: number) => number; F: (x: number) => number; latex: string; range: [number, number] }> = {
  x2: { f: (x) => x * x, F: (x) => (x * x * x) / 3, latex: "f(x) = x^2", range: [0, 2] },
  sin: { f: (x) => Math.sin(x), F: (x) => -Math.cos(x), latex: "f(x) = \\sin x", range: [0, Math.PI] },
  cubic: { f: (x) => 0.3 * x * x * x - x + 1.5, F: (x) => 0.3 * (x ** 4) / 4 - (x * x) / 2 + 1.5 * x, latex: "f(x) = 0.3 x^3 - x + 1.5", range: [-1, 2] },
  exp: { f: (x) => Math.exp(-x * x), F: () => NaN, latex: "f(x) = e^{-x^2}", range: [-2, 2] },
};

type Sample = "left" | "midpoint" | "right";

function RiemannSumWidget() {
  const [fnKey, setFnKey] = useState<IFunc>("x2");
  const [n, setN] = useState(8);
  const [sample, setSample] = useState<Sample>("midpoint");

  const { f, F, range } = ifuncs[fnKey];
  const [a, b] = range;
  const dx = (b - a) / n;

  const sampleX = (i: number) => {
    if (sample === "left") return a + i * dx;
    if (sample === "right") return a + (i + 1) * dx;
    return a + (i + 0.5) * dx;
  };

  let sum = 0;
  const rects: { x: number; y: number; w: number; h: number }[] = [];
  for (let i = 0; i < n; i++) {
    const xs = sampleX(i);
    const y = f(xs);
    sum += y * dx;
    rects.push({ x: a + i * dx, y, w: dx, h: y });
  }

  const exact = isNaN(F(0)) ? null : F(b) - F(a);

  const w = 360;
  const hh = 220;

  let yMin = 0;
  let yMax = -Infinity;
  for (let i = 0; i <= 200; i++) {
    const x = a + ((b - a) * i) / 200;
    const y = f(x);
    if (isFinite(y)) {
      yMin = Math.min(yMin, y);
      yMax = Math.max(yMax, y);
    }
  }
  const pad = (yMax - yMin) * 0.15 || 0.5;
  yMin -= pad;
  yMax += pad;

  const sx = (x: number) => ((x - a) / (b - a)) * w;
  const sy = (y: number) => hh - ((y - yMin) / (yMax - yMin)) * hh;

  const pts: string[] = [];
  let prev = false;
  for (let i = 0; i <= 200; i++) {
    const x = a + ((b - a) * i) / 200;
    const y = f(x);
    if (!isFinite(y)) {
      prev = false;
      continue;
    }
    pts.push(`${prev ? "L" : "M"}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`);
    prev = true;
  }

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs uppercase tracking-widest text-ink-500 self-center mr-1">
            Function
          </span>
          {(Object.keys(ifuncs) as IFunc[]).map((k) => (
            <button
              key={k}
              onClick={() => setFnKey(k)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                fnKey === k
                  ? "border-accent-soft bg-ink-800 text-ink-50"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              <InlineMath math={ifuncs[k].latex} />
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs uppercase tracking-widest text-ink-500 self-center mr-1">
            Sample
          </span>
          {(["left", "midpoint", "right"] as Sample[]).map((s) => (
            <button
              key={s}
              onClick={() => setSample(s)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition capitalize ${
                sample === s
                  ? "border-accent-soft bg-ink-800 text-ink-50"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${hh}`} className="w-full block">
            <line x1={0} y1={sy(0)} x2={w} y2={sy(0)} stroke="#2a2a37" />

            {rects.map((r, i) => (
              <rect
                key={i}
                x={sx(r.x)}
                y={r.h >= 0 ? sy(r.h) : sy(0)}
                width={sx(r.x + r.w) - sx(r.x)}
                height={Math.abs(sy(r.h) - sy(0))}
                fill={r.h >= 0 ? "#a78bfa" : "#f43f5e"}
                fillOpacity={0.25}
                stroke={r.h >= 0 ? "#a78bfa" : "#f43f5e"}
                strokeOpacity={0.7}
                strokeWidth={1}
              />
            ))}

            <path d={pts.join(" ")} fill="none" stroke="#22d3ee" strokeWidth={2} />
          </svg>
        </div>

        <div>
          <div className="flex items-baseline justify-between text-xs text-ink-400 mb-1">
            <span>Number of rectangles</span>
            <span className="font-mono text-ink-200">n = {n}</span>
          </div>
          <input
            type="range"
            min={2}
            max={200}
            step={1}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full accent-accent-soft"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Stat label={`Riemann sum (n=${n})`} value={sum.toFixed(5)} />
          <Stat
            label="Exact integral"
            value={exact === null ? "(no closed form)" : exact.toFixed(5)}
          />
        </div>
      </div>
      <figcaption>
        Cyan: <InlineMath math="f" />. Purple rectangles: the Riemann
        approximation. Slide <InlineMath math="n" /> up and watch the sum
        converge to the exact integral.
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
      "Compute $\\displaystyle \\int_0^2 (x^2 + 1) \\, dx$.",
    options: [
      "$10/3$",
      "$8/3$",
      "$14/3$",
      "$2/3$",
    ],
    correct: 2,
    explanation:
      "Antiderivative is $x^3/3 + x$. Evaluate: $(8/3 + 2) - 0 = 8/3 + 6/3 = 14/3$.",
  },
  {
    prompt:
      "Apply u-substitution to $\\displaystyle \\int 2x \\, e^{x^2} \\, dx$.",
    options: [
      "$e^{x^2} + C$",
      "$2x \\, e^{x^2} + C$",
      "$x^2 e^{x^2} + C$",
      "$\\dfrac{1}{2} e^{x^2} + C$",
    ],
    correct: 0,
    explanation:
      "Let $u = x^2$, $du = 2x \\, dx$. The integral becomes $\\int e^u \\, du = e^u + C = e^{x^2} + C$.",
  },
  {
    prompt:
      "By integration by parts, $\\int x \\cos x \\, dx$ equals…",
    options: [
      "$x \\sin x - \\cos x + C$",
      "$x \\sin x + \\cos x + C$",
      "$-x \\sin x + \\cos x + C$",
      "$x \\cos x + \\sin x + C$",
    ],
    correct: 1,
    explanation:
      "Pick $u = x$, $dv = \\cos x \\, dx$. Then $du = dx$, $v = \\sin x$. Result: $x \\sin x - \\int \\sin x \\, dx = x \\sin x + \\cos x + C$.",
  },
  {
    prompt:
      "FTC Part II says: if $f$ is continuous and $F' = f$, then $\\int_a^b f \\, dx$ equals…",
    options: [
      "$F(a) + F(b)$",
      "$F(b) - F(a)$",
      "$F(b) \\cdot F(a)$",
      "$F'(b) - F'(a)$",
    ],
    correct: 1,
    explanation:
      "FTC II: definite integral equals antiderivative evaluated at top minus antiderivative at bottom.",
  },
  {
    prompt:
      "$\\displaystyle \\int_1^\\infty \\frac{1}{x^p} \\, dx$ converges for…",
    options: [
      "all $p > 0$",
      "$p \\geq 1$",
      "$p > 1$",
      "$0 < p < 1$",
    ],
    correct: 2,
    explanation:
      "The $p$-test: the improper integral converges iff $p > 1$. At $p = 1$ the antiderivative is $\\ln x$ which diverges; for $p < 1$ the antiderivative still grows without bound.",
  },
];
