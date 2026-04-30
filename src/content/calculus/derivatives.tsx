import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function DerivativesBody() {
  return (
    <>
      <p>
        The derivative is the headline result of single-variable calculus
        — the answer to a 2000-year-old question: "what's the speed of a
        moving object at a single instant in time?" Greek geometers
        understood average speed perfectly well, but instantaneous speed
        seemed paradoxical (Zeno's arrow problem). The resolution, due to
        Newton and Leibniz independently, is to compute average speed
        over shorter and shorter intervals — a limit.
      </p>
      <p>
        This chapter builds the derivative from that limit, derives
        every standard differentiation rule, then applies the result to
        approximations, optimisation, and the Mean Value Theorem. Bring
        last chapter's limits along with you — every theorem here is
        secretly a limit theorem in disguise.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.01 — Lectures 1–8 (derivatives)",
            author: "Prof. David Jerison (MIT OCW)",
            duration: "~9h",
            url: "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/video_galleries/video-lectures/",
            note: "The first half of the course covers derivatives in detail.",
          },
          {
            title: "Essence of Calculus — Ch. 2: Derivatives",
            author: "3Blue1Brown",
            duration: "17 min",
            url: "https://www.youtube.com/watch?v=9vKqVkMQHKk",
            note: "Beautiful visual definition. Pair with our Part 1.",
          },
          {
            title: "Essence of Calculus — Ch. 3 & 4 (rules)",
            author: "3Blue1Brown",
            duration: "~25 min combined",
            url: "https://www.youtube.com/watch?v=S0_qX4VJhMQ",
            note: "Visual derivations of the product, chain rule, and more.",
          },
          {
            title: "Essence of Calculus — Ch. 11: Taylor series",
            author: "3Blue1Brown",
            duration: "23 min",
            url: "https://www.youtube.com/watch?v=3d6DsjIBzJ4",
            note: "Pairs with our Part 6 (linear/Taylor approximation).",
          },
          {
            title: "Spivak — Calculus, chs. 9–10",
            author: "Michael Spivak",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Calculus_(Spivak)",
            note: "The rigorous version of every result in this chapter.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · From secant to tangent</h2>

      <p>
        Pick a function <InlineMath math="f" /> and a point{" "}
        <InlineMath math="a" /> in its domain. The <strong>secant line</strong>{" "}
        through <InlineMath math="(a, f(a))" /> and{" "}
        <InlineMath math="(a + h, f(a + h))" /> has slope
      </p>
      <BlockMath math="\frac{f(a + h) - f(a)}{h}." />
      <p>
        That's the average rate of change of <InlineMath math="f" /> over
        the interval of width <InlineMath math="h" />. As we let{" "}
        <InlineMath math="h" /> shrink to zero, the secant pivots into a{" "}
        <strong>tangent line</strong> — the line that just touches the
        graph at <InlineMath math="(a, f(a))" />. The slope of that
        tangent is the <strong>derivative</strong> at{" "}
        <InlineMath math="a" />:
      </p>
      <BlockMath math="f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}." />
      <p>
        If this limit exists, we say <InlineMath math="f" /> is{" "}
        <strong>differentiable</strong> at <InlineMath math="a" />. The
        existence of the limit is non-trivial — there are continuous
        functions that aren't differentiable anywhere. The standard
        worked example you'll meet again is{" "}
        <InlineMath math="f(x) = |x|" />, which is continuous everywhere
        but not differentiable at <InlineMath math="x = 0" /> (the
        left-side and right-side limits are <InlineMath math="-1" /> and{" "}
        <InlineMath math="+1" />, which disagree).
      </p>

      <Callout title="Notation">
        Several equivalent ways to write the same thing:
        <BlockMath math="f'(x) = \frac{df}{dx} = \frac{d}{dx} f(x) = Df(x) = \dot f(x)." />
        Newton wrote dots; Leibniz wrote{" "}
        <InlineMath math="dy/dx" />. The Lagrange{" "}
        <InlineMath math="f'(x)" /> is the most common in modern texts.
        Use whichever is convenient — the <InlineMath math="d/dx" /> form
        emphasises "the derivative with respect to <InlineMath math="x" />",
        which becomes important once there are multiple variables.
      </Callout>

      <h3>Visualise the limit</h3>
      <p>
        Try this widget. Pick a function and a point{" "}
        <InlineMath math="a" />; slide <InlineMath math="h" /> toward 0
        and watch the secant collapse onto the tangent. The slope readout
        approaches the derivative at <InlineMath math="a" />.
      </p>

      <SecantTangentWidget />

      <h3>Compute one from the definition</h3>
      <p>
        <strong>Theorem.</strong>{" "}
        <InlineMath math="\dfrac{d}{dx} x^2 = 2x" />.
      </p>
      <p>
        <strong>Proof.</strong> Apply the limit definition to{" "}
        <InlineMath math="f(x) = x^2" /> at a generic point{" "}
        <InlineMath math="x" />:
      </p>
      <BlockMath math="f'(x) = \lim_{h \to 0} \frac{(x+h)^2 - x^2}{h} = \lim_{h \to 0} \frac{2xh + h^2}{h} = \lim_{h \to 0} (2x + h) = 2x. \quad \blacksquare" />
      <p>
        The same trick — expand, cancel, take the limit — gives every
        polynomial derivative.
      </p>

      <Exercise
        number="1.1"
        prompt={
          <>
            Compute <InlineMath math="\dfrac{d}{dx} x^3" /> from the limit
            definition.
          </>
        }
      >
        <BlockMath math="\lim_{h \to 0} \frac{(x + h)^3 - x^3}{h} = \lim_{h \to 0} \frac{3x^2 h + 3x h^2 + h^3}{h} = \lim_{h \to 0} (3x^2 + 3xh + h^2) = 3x^2." />
        <p>This generalises to <InlineMath math="(d/dx) x^n = n x^{n-1}" /> — the power rule.</p>
      </Exercise>

      <Exercise
        number="1.2"
        prompt={
          <>
            Compute the derivative of <InlineMath math="f(x) = \sqrt{x}" />{" "}
            from the limit definition (rationalise the numerator).
          </>
        }
      >
        <p>
          The trick is multiplying by the conjugate to clear the square
          root in the difference:
        </p>
        <BlockMath math="\frac{\sqrt{x + h} - \sqrt{x}}{h} \cdot \frac{\sqrt{x + h} + \sqrt{x}}{\sqrt{x + h} + \sqrt{x}} = \frac{(x + h) - x}{h(\sqrt{x + h} + \sqrt{x})} = \frac{1}{\sqrt{x + h} + \sqrt{x}}." />
        <p>
          As <InlineMath math="h \to 0" />, the denominator approaches{" "}
          <InlineMath math="2\sqrt{x}" />. So{" "}
          <InlineMath math="(d/dx) \sqrt{x} = 1/(2\sqrt{x})" />. (And note
          this fails at <InlineMath math="x = 0" />: the derivative is
          infinite there — the graph has a vertical tangent.)
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The differentiation rules</h2>

      <p>
        Computing every derivative from the limit definition would be
        excruciating. Five rules, plus a small table of derivatives of
        elementary functions, let you handle 99% of what you'll meet.
      </p>

      <h3>The five rules</h3>
      <ul>
        <li>
          <strong>Constant rule.</strong>{" "}
          <InlineMath math="(d/dx)\, c = 0" /> for any constant{" "}
          <InlineMath math="c" />.
        </li>
        <li>
          <strong>Power rule.</strong>{" "}
          <InlineMath math="(d/dx)\, x^n = n x^{n - 1}" /> for any real{" "}
          <InlineMath math="n" />.
        </li>
        <li>
          <strong>Linearity.</strong>{" "}
          <InlineMath math="(d/dx)(\alpha f + \beta g) = \alpha f' + \beta g'" />.
        </li>
        <li>
          <strong>Product rule.</strong>{" "}
          <InlineMath math="(fg)' = f'g + fg'" />.
        </li>
        <li>
          <strong>Quotient rule.</strong>{" "}
          <InlineMath math="(f/g)' = (f' g - f g') / g^2" />, provided{" "}
          <InlineMath math="g \neq 0" />.
        </li>
      </ul>

      <h3>The chain rule (the most important one)</h3>
      <p>
        For composed functions:
      </p>
      <BlockMath math="(f \circ g)'(x) = f'(g(x)) \cdot g'(x)." />
      <p>
        Or in Leibniz notation, with <InlineMath math="y = f(u)" /> and{" "}
        <InlineMath math="u = g(x)" />:
      </p>
      <BlockMath math="\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}." />
      <p>
        This Leibniz form makes the rule almost self-evident — it looks
        like fractions cancelling. Worked example: differentiate{" "}
        <InlineMath math="\sin(x^2)" />. Set the inner function{" "}
        <InlineMath math="u = x^2" />; the outer function is{" "}
        <InlineMath math="\sin u" />.{" "}
        <InlineMath math="(d/du) \sin u = \cos u" />,{" "}
        <InlineMath math="(du/dx) = 2x" />, so the chain rule gives{" "}
        <InlineMath math="2x \cos(x^2)" />.
      </p>

      <Pitfall>
        Forgetting the chain rule on the inner function is the single
        biggest source of derivative errors. Differentiating{" "}
        <InlineMath math="\sin(3x)" /> as <InlineMath math="\cos(3x)" />{" "}
        is wrong; it's <InlineMath math="3\cos(3x)" />. If the input to
        an outer function is anything other than a bare{" "}
        <InlineMath math="x" />, multiply by the inner derivative.
      </Pitfall>

      <h3>Standard derivatives</h3>
      <p>
        These should become reflexes — memorise them, then verify each
        from the limit definition once when you have time.
      </p>
      <BlockMath math="(d/dx)\, x^n = n x^{n - 1}" />
      <BlockMath math="(d/dx)\, e^x = e^x" />
      <BlockMath math="(d/dx)\, \ln x = 1 / x \quad (x > 0)" />
      <BlockMath math="(d/dx)\, \sin x = \cos x" />
      <BlockMath math="(d/dx)\, \cos x = -\sin x" />
      <BlockMath math="(d/dx)\, \tan x = \sec^2 x" />
      <BlockMath math="(d/dx)\, a^x = a^x \ln a" />
      <BlockMath math="(d/dx)\, \arctan x = 1 / (1 + x^2)" />

      <Exercise
        number="2.1"
        prompt={
          <>
            Differentiate{" "}
            <InlineMath math="f(x) = (x^2 + 3) e^{2x}" />.
          </>
        }
      >
        <p>
          Product rule with{" "}
          <InlineMath math="u = x^2 + 3" /> and{" "}
          <InlineMath math="v = e^{2x}" />:{" "}
          <InlineMath math="u' = 2x" /> and (chain rule){" "}
          <InlineMath math="v' = 2 e^{2x}" />. So
        </p>
        <BlockMath math="f'(x) = 2x \cdot e^{2x} + (x^2 + 3) \cdot 2 e^{2x} = e^{2x}(2x^2 + 2x + 6)." />
      </Exercise>

      <Exercise
        number="2.2"
        prompt={
          <>
            Differentiate{" "}
            <InlineMath math="g(x) = \sin(\sqrt{x^2 + 1})" />.
          </>
        }
      >
        <p>
          Chain rule, twice. Outer is <InlineMath math="\sin" />; middle
          is <InlineMath math="\sqrt{\,\cdot\,}" />; inner is{" "}
          <InlineMath math="x^2 + 1" />.
        </p>
        <BlockMath math="g'(x) = \cos(\sqrt{x^2 + 1}) \cdot \frac{1}{2\sqrt{x^2 + 1}} \cdot 2x = \frac{x \cos(\sqrt{x^2 + 1})}{\sqrt{x^2 + 1}}." />
      </Exercise>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Implicit differentiation</h2>

      <p>
        Sometimes <InlineMath math="y" /> is defined implicitly by an
        equation rather than as an explicit function of{" "}
        <InlineMath math="x" />. Example:{" "}
        <InlineMath math="x^2 + y^2 = 1" /> defines a circle. There's no
        single <InlineMath math="y = f(x)" /> for the whole curve (you'd
        need <InlineMath math="\pm \sqrt{1 - x^2}" />), but the slope of
        the tangent line still makes sense at every non-singular point.
      </p>
      <p>
        The trick: differentiate both sides with respect to{" "}
        <InlineMath math="x" />, treating <InlineMath math="y" /> as a
        function of <InlineMath math="x" /> (so its derivative is{" "}
        <InlineMath math="dy/dx" /> via the chain rule). Then solve for{" "}
        <InlineMath math="dy/dx" />.
      </p>
      <p>
        For the unit circle:
      </p>
      <BlockMath math="\frac{d}{dx}(x^2 + y^2) = \frac{d}{dx}(1) \;\;\Longrightarrow\;\; 2x + 2y \frac{dy}{dx} = 0 \;\;\Longrightarrow\;\; \frac{dy}{dx} = -\frac{x}{y}." />
      <p>
        At <InlineMath math="(0, 1)" /> the slope is 0 (tangent is
        horizontal at the top). At{" "}
        <InlineMath math="(1, 0)" /> the slope is undefined — vertical
        tangent. At <InlineMath math="(1/\sqrt{2}, 1/\sqrt{2})" /> the
        slope is <InlineMath math="-1" />, as you'd expect for a
        45° tangent. All of this from one implicit derivative.
      </p>

      <Exercise
        number="3.1"
        prompt={
          <>
            Find <InlineMath math="dy/dx" /> implicitly for{" "}
            <InlineMath math="\sin(xy) = x + y" />.
          </>
        }
      >
        <p>
          Differentiate both sides:
        </p>
        <BlockMath math="\cos(xy) \cdot (y + x y') = 1 + y'." />
        <p>
          Expand: <InlineMath math="y \cos(xy) + x \cos(xy) \cdot y' = 1 + y'" />.
          Collect terms in <InlineMath math="y'" />:
        </p>
        <BlockMath math="(x \cos(xy) - 1) y' = 1 - y \cos(xy)." />
        <BlockMath math="y' = \frac{1 - y \cos(xy)}{x \cos(xy) - 1}." />
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Higher derivatives</h2>

      <p>
        We can differentiate the derivative. The result is the{" "}
        <strong>second derivative</strong>{" "}
        <InlineMath math="f''(x)" />, sometimes written{" "}
        <InlineMath math="d^2 f / dx^2" />. Iterate to get{" "}
        <InlineMath math="f''', f^{(4)}, \ldots, f^{(n)}" />.
      </p>
      <p>
        Physical interpretation: if{" "}
        <InlineMath math="x(t)" /> is the position of a particle, then{" "}
        <InlineMath math="x'(t)" /> is its velocity and{" "}
        <InlineMath math="x''(t)" /> is its acceleration. (The third
        derivative is "jerk", the fourth is "snap" — yes, really, and the
        next two are "crackle" and "pop".)
      </p>
      <p>
        Geometric interpretation:{" "}
        <InlineMath math="f''(x)" /> measures concavity.{" "}
        <InlineMath math="f'' > 0" /> means the graph curves upward (like{" "}
        <InlineMath math="x^2" /> at any point); <InlineMath math="f'' < 0" />{" "}
        means it curves downward. A point where{" "}
        <InlineMath math="f''" /> changes sign is an{" "}
        <strong>inflection point</strong>.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · The Mean Value Theorem</h2>

      <p>
        <strong>Theorem (MVT).</strong> If{" "}
        <InlineMath math="f" /> is continuous on{" "}
        <InlineMath math="[a, b]" /> and differentiable on{" "}
        <InlineMath math="(a, b)" />, then there exists{" "}
        <InlineMath math="c \in (a, b)" /> with
      </p>
      <BlockMath math="f'(c) = \frac{f(b) - f(a)}{b - a}." />

      <p>
        In words: somewhere between <InlineMath math="a" /> and{" "}
        <InlineMath math="b" />, the instantaneous slope equals the
        average slope. If your average speed on a road trip was 60 mph,
        you were going exactly 60 mph at some instant.
      </p>

      <p>
        The special case <InlineMath math="f(a) = f(b)" /> is called{" "}
        <strong>Rolle's theorem</strong>: between two equal values of a
        differentiable function, there's a critical point (
        <InlineMath math="f'(c) = 0" />).
      </p>

      <h3>What MVT gives you</h3>
      <p>
        Three of the most-used corollaries in calculus and analysis:
      </p>
      <ul>
        <li>
          If <InlineMath math="f'(x) = 0" /> on an interval, then{" "}
          <InlineMath math="f" /> is constant on that interval.
        </li>
        <li>
          If <InlineMath math="f' = g'" /> on an interval, then{" "}
          <InlineMath math="f - g" /> is constant. (This is what makes
          the antiderivative "unique up to a constant" — see the
          Integrals chapter.)
        </li>
        <li>
          If <InlineMath math="f' > 0" /> on an interval,{" "}
          <InlineMath math="f" /> is strictly increasing there.
        </li>
      </ul>
      <p>
        These all sound obvious, but they require a proof — the MVT is
        precisely what supplies it.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Linear approximation &amp; Taylor series</h2>

      <p>
        The tangent line at <InlineMath math="a" /> approximates the
        function near that point:
      </p>
      <BlockMath math="f(x) \approx f(a) + f'(a)(x - a)." />
      <p>
        This is the <strong>linear (or first-order) approximation</strong>.
        It's often good enough for engineering estimates near a known
        point. Quick example: for small <InlineMath math="x" />,{" "}
        <InlineMath math="\sin x \approx x" /> (the linear approximation
        at <InlineMath math="a = 0" />).
      </p>
      <p>
        For better accuracy, use a parabola — the{" "}
        <strong>second-order (quadratic) approximation</strong>:
      </p>
      <BlockMath math="f(x) \approx f(a) + f'(a)(x - a) + \tfrac{1}{2} f''(a) (x - a)^2." />
      <p>
        Match all the derivatives at <InlineMath math="a" /> and the
        approximation gets better with each term you add. The full
        infinite series is the <strong>Taylor series</strong> of{" "}
        <InlineMath math="f" /> centred at <InlineMath math="a" />:
      </p>
      <BlockMath math="f(x) = \sum_{n = 0}^{\infty} \frac{f^{(n)}(a)}{n!} (x - a)^n." />
      <p>
        We'll spend more time on Taylor series in the Sequences &amp;
        Series chapter, where convergence becomes the main question. For
        now, three series to memorise (centred at 0, also called{" "}
        <em>Maclaurin</em> series):
      </p>
      <BlockMath math="e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots" />
      <BlockMath math="\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots" />
      <BlockMath math="\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots" />
      <p>
        Plug <InlineMath math="x = i\theta" /> into the{" "}
        <InlineMath math="e^x" /> series and compare with the{" "}
        <InlineMath math="\sin" /> and <InlineMath math="\cos" /> series — that's
        Euler's formula falling out of Taylor expansion. (Try it; it's
        worth doing once with pen and paper.)
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Optimisation</h2>

      <p>
        At a local maximum or minimum of{" "}
        <InlineMath math="f" /> (with <InlineMath math="f" />{" "}
        differentiable), the derivative must equal zero. Such points are
        called <strong>critical points</strong>. To find extrema on an
        interval:
      </p>
      <ol>
        <li>Find all critical points (solve <InlineMath math="f'(x) = 0" />).</li>
        <li>Evaluate <InlineMath math="f" /> at each critical point.</li>
        <li>Evaluate <InlineMath math="f" /> at the endpoints.</li>
        <li>Compare.</li>
      </ol>

      <p>
        To classify a critical point as max vs min vs neither (saddle),
        the <strong>second derivative test</strong>:
      </p>
      <ul>
        <li>
          <InlineMath math="f''(c) > 0" /> at a critical point ⇒ local
          minimum.
        </li>
        <li>
          <InlineMath math="f''(c) < 0" /> ⇒ local maximum.
        </li>
        <li>
          <InlineMath math="f''(c) = 0" /> ⇒ test inconclusive (could be
          any of three; check higher derivatives or the sign of{" "}
          <InlineMath math="f'" /> nearby).
        </li>
      </ul>

      <p>
        <strong>Worked example.</strong> A rectangular pen against a
        wall has 100 metres of fencing for the three non-wall sides.
        Maximise the enclosed area.
      </p>
      <p>
        Let <InlineMath math="x" /> be the depth (perpendicular to the
        wall) and <InlineMath math="y" /> the width. Constraint:{" "}
        <InlineMath math="2x + y = 100" />, so{" "}
        <InlineMath math="y = 100 - 2x" />. Area:{" "}
        <InlineMath math="A(x) = x(100 - 2x) = 100x - 2x^2" />, a downward
        parabola. <InlineMath math="A'(x) = 100 - 4x = 0 \Rightarrow x = 25" />,
        and <InlineMath math="A''(x) = -4 < 0" />, confirming a max. So{" "}
        <InlineMath math="x = 25" />, <InlineMath math="y = 50" />, area{" "}
        <InlineMath math="= 1250" /> m². ∎
      </p>

      <Exercise
        number="7.1"
        prompt={
          <>
            Find the rectangle of maximum area that can be inscribed in a
            circle of radius <InlineMath math="r" />.
          </>
        }
      >
        <p>
          Let the rectangle have width{" "}
          <InlineMath math="2x" /> and height <InlineMath math="2y" />,
          with corners on the circle so{" "}
          <InlineMath math="x^2 + y^2 = r^2" />. Then{" "}
          <InlineMath math="y = \sqrt{r^2 - x^2}" /> and area{" "}
          <InlineMath math="A(x) = 4xy = 4x\sqrt{r^2 - x^2}" /> for{" "}
          <InlineMath math="x \in [0, r]" />.
        </p>
        <p>
          Differentiate (using the product + chain rules):
        </p>
        <BlockMath math="A'(x) = 4\sqrt{r^2 - x^2} - \frac{4 x^2}{\sqrt{r^2 - x^2}} = \frac{4(r^2 - 2x^2)}{\sqrt{r^2 - x^2}}." />
        <p>
          Setting <InlineMath math="A'(x) = 0" />:{" "}
          <InlineMath math="x^2 = r^2 / 2" />, i.e.{" "}
          <InlineMath math="x = r / \sqrt 2" />, hence{" "}
          <InlineMath math="y = r/\sqrt 2" /> too. The optimal rectangle
          is a <strong>square</strong> of side <InlineMath math="r\sqrt 2" />
          , with area <InlineMath math="2 r^2" />. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Related rates</h2>

      <p>
        When two quantities are linked by an equation, their rates of
        change are linked too. Differentiate the equation with respect to
        time and solve for the rate you want.
      </p>

      <p>
        <strong>Worked example.</strong> A 5-metre ladder leans against a
        wall. The bottom slides away from the wall at 1 m/s. How fast is
        the top sliding down when the bottom is 3 m from the wall?
      </p>
      <p>
        Let <InlineMath math="x(t)" /> be the bottom distance,{" "}
        <InlineMath math="y(t)" /> the top height. Pythagoras:{" "}
        <InlineMath math="x^2 + y^2 = 25" />. Differentiate w.r.t.{" "}
        <InlineMath math="t" />:
      </p>
      <BlockMath math="2x \frac{dx}{dt} + 2y \frac{dy}{dt} = 0." />
      <p>
        At the moment in question, <InlineMath math="x = 3" />, so{" "}
        <InlineMath math="y = 4" />. Plug in{" "}
        <InlineMath math="dx/dt = 1" />: <InlineMath math="6 + 8 \, dy/dt = 0" />,
        hence <InlineMath math="dy/dt = -3/4" /> m/s. The top slides
        down at <InlineMath math="0.75" /> m/s. ∎
      </p>

      {/* ─────────────────────────────  PART 9  ───────────────────────────── */}
      <h2>Part 9 · Why this matters</h2>

      <p>
        Derivatives are the engine of nearly every quantitative science.
        A short tour:
      </p>
      <ul>
        <li>
          <strong>Physics:</strong> velocity, acceleration, force, work,
          power — all derivatives of position, momentum, or energy.
          Hamilton's equations and Lagrangian mechanics are statements
          about derivatives.
        </li>
        <li>
          <strong>Optimisation &amp; ML:</strong> gradient descent finds
          the minimum of a loss function by walking opposite to its
          gradient. Backpropagation in neural nets is just the chain
          rule applied to a deeply nested function.
        </li>
        <li>
          <strong>Differential equations:</strong> next semester's
          coverage. Most physical laws (Newton's, Maxwell's,
          Schrödinger's) are differential equations — equations relating
          a function to its derivatives.
        </li>
        <li>
          <strong>Quantum mechanics:</strong> the momentum operator on a
          wave function is{" "}
          <InlineMath math="\hat p = -i\hbar \, d/dx" />. The Schrödinger
          equation is a partial differential equation involving first
          and second spatial derivatives. Without derivatives the entire
          formalism is unwritable.
        </li>
        <li>
          <strong>Numerical analysis:</strong> Newton's method for
          finding roots of <InlineMath math="f(x) = 0" /> uses the
          tangent-line approximation:{" "}
          <InlineMath math="x_{n+1} = x_n - f(x_n) / f'(x_n)" />. It
          converges quadratically when it converges at all.
        </li>
      </ul>

      <p>
        Get fluent at differentiation. Most working physicists and
        engineers can differentiate <em>any</em> elementary function on
        sight, by reflex; that fluency is a goal worth setting now and
        will pay back every later week of the syllabus.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: secant approaching tangent
// ════════════════════════════════════════════════════════════

type DFunc = "x2" | "sin" | "cubic" | "exp";

const dfuncs: Record<DFunc, { f: (x: number) => number; df: (x: number) => number; latex: string; range: [number, number] }> = {
  x2: {
    f: (x) => x * x,
    df: (x) => 2 * x,
    latex: "f(x) = x^2",
    range: [-3, 3],
  },
  sin: {
    f: (x) => Math.sin(x),
    df: (x) => Math.cos(x),
    latex: "f(x) = \\sin x",
    range: [-Math.PI, Math.PI],
  },
  cubic: {
    f: (x) => x * x * x - 2 * x,
    df: (x) => 3 * x * x - 2,
    latex: "f(x) = x^3 - 2x",
    range: [-2, 2],
  },
  exp: {
    f: (x) => Math.exp(x / 2),
    df: (x) => 0.5 * Math.exp(x / 2),
    latex: "f(x) = e^{x/2}",
    range: [-2, 4],
  },
};

function SecantTangentWidget() {
  const [fnKey, setFnKey] = useState<DFunc>("x2");
  const [a, setA] = useState(1);
  const [h, setH] = useState(0.8);

  const { f, df, range } = dfuncs[fnKey];
  const [xMin, xMax] = range;
  const w = 360;
  const hh = 240;

  const samples = 240;
  let yMin = Infinity,
    yMax = -Infinity;
  for (let i = 0; i <= samples; i++) {
    const x = xMin + ((xMax - xMin) * i) / samples;
    const y = f(x);
    if (isFinite(y)) {
      yMin = Math.min(yMin, y);
      yMax = Math.max(yMax, y);
    }
  }
  const pad = (yMax - yMin) * 0.1;
  yMin -= pad;
  yMax += pad;

  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * w;
  const sy = (y: number) => hh - ((y - yMin) / (yMax - yMin)) * hh;

  const pts: string[] = [];
  let prev = false;
  for (let i = 0; i <= samples; i++) {
    const x = xMin + ((xMax - xMin) * i) / samples;
    const y = f(x);
    if (!isFinite(y)) {
      prev = false;
      continue;
    }
    pts.push(`${prev ? "L" : "M"}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`);
    prev = true;
  }

  const aClamped = Math.min(Math.max(a, xMin + 0.2), xMax - 0.2);
  const x1 = aClamped;
  const x2 = aClamped + h;
  const y1 = f(x1);
  const y2 = f(x2);
  const secantSlope = (y2 - y1) / (x2 - x1);
  const trueSlope = df(aClamped);

  // Extend secant across plot
  const secantY = (x: number) => y1 + secantSlope * (x - x1);
  const tangentY = (x: number) => y1 + trueSlope * (x - x1);

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs uppercase tracking-widest text-ink-500 self-center mr-1">
            Function
          </span>
          {(["x2", "sin", "cubic", "exp"] as DFunc[]).map((k) => (
            <button
              key={k}
              onClick={() => setFnKey(k)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                fnKey === k
                  ? "border-accent-soft bg-ink-800 text-ink-50"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              <InlineMath math={dfuncs[k].latex} />
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${hh}`} className="w-full block">
            <line x1={0} y1={sy(0)} x2={w} y2={sy(0)} stroke="#2a2a37" />
            <line x1={sx(0)} y1={0} x2={sx(0)} y2={hh} stroke="#2a2a37" />

            {/* curve */}
            <path d={pts.join(" ")} fill="none" stroke="#22d3ee" strokeWidth={1.8} />

            {/* tangent line (drawn first, so secant overlays) */}
            <line
              x1={0}
              y1={sy(tangentY(xMin))}
              x2={w}
              y2={sy(tangentY(xMax))}
              stroke="#fbbf24"
              strokeWidth={1.5}
              strokeOpacity={0.7}
              strokeDasharray="4 3"
            />

            {/* secant */}
            <line
              x1={0}
              y1={sy(secantY(xMin))}
              x2={w}
              y2={sy(secantY(xMax))}
              stroke="#a78bfa"
              strokeWidth={2}
            />

            {/* points */}
            <circle cx={sx(x1)} cy={sy(y1)} r={5} fill="#a78bfa" />
            <circle cx={sx(x2)} cy={sy(y2)} r={5} fill="#a78bfa" />

            <text x={sx(x1) + 6} y={sy(y1) - 8} fontSize={10} fill="#a78bfa">
              (a, f(a))
            </text>
            <text x={sx(x2) + 6} y={sy(y2) - 8} fontSize={10} fill="#a78bfa">
              (a+h, f(a+h))
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SlideRow label={`a = ${aClamped.toFixed(2)}`} value={a} min={xMin + 0.2} max={xMax - 0.2} step={0.01} onChange={setA} />
          <SlideRow label={`h = ${h.toFixed(3)}`} value={h} min={-2} max={2} step={0.001} onChange={setH} />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Stat label="Secant slope" value={isFinite(secantSlope) ? secantSlope.toFixed(4) : "—"} />
          <Stat label="Tangent slope (true f'(a))" value={trueSlope.toFixed(4)} />
        </div>
      </div>
      <figcaption>
        Cyan: <InlineMath math="f" />. Purple: secant through{" "}
        <InlineMath math="(a, f(a))" /> and <InlineMath math="(a+h, f(a+h))" />.
        Yellow dashed: actual tangent at <InlineMath math="a" />. As{" "}
        <InlineMath math="h \to 0" /> the secant slope approaches the
        tangent slope <InlineMath math="f'(a)" />.
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
      "Differentiate $f(x) = x^4 \\sin x$.",
    options: [
      "$4x^3 \\cos x$",
      "$4x^3 \\sin x + x^4 \\cos x$",
      "$4x^3 \\cos x + x^4 \\sin x$",
      "$x^4 \\cos x - 4x^3 \\sin x$",
    ],
    correct: 1,
    explanation:
      "Product rule: $(uv)' = u'v + uv'$. Here $u = x^4$, $v = \\sin x$, so $u' = 4x^3$ and $v' = \\cos x$. Result: $4x^3 \\sin x + x^4 \\cos x$.",
  },
  {
    prompt:
      "What is $\\dfrac{d}{dx} \\sin(x^2)$?",
    options: [
      "$\\cos(x^2)$",
      "$2x \\cos(x^2)$",
      "$2x \\cos(2x)$",
      "$\\cos(2x)$",
    ],
    correct: 1,
    explanation:
      "Chain rule: outer derivative $\\cos$ at the inner expression $x^2$, times the inner derivative $2x$. Result: $2x \\cos(x^2)$.",
  },
  {
    prompt:
      "If $f''(c) > 0$ at a critical point $c$, then $c$ is a…",
    options: [
      "local maximum",
      "local minimum",
      "saddle / inflection",
      "indeterminate without more information",
    ],
    correct: 1,
    explanation:
      "Second derivative test: positive concavity at a critical point means a local minimum (the graph cups upward).",
  },
  {
    prompt:
      "The Mean Value Theorem applied to $f(x) = x^2$ on $[0, 2]$ gives a $c$ with $f'(c) = (f(2) - f(0))/(2 - 0)$. What is $c$?",
    options: ["0", "1", "$\\sqrt{2}$", "2"],
    correct: 1,
    explanation:
      "$(f(2) - f(0))/2 = (4 - 0)/2 = 2$, and $f'(c) = 2c$, so $2c = 2$ gives $c = 1$ — exactly the midpoint, as you'd expect for a parabola.",
  },
  {
    prompt:
      "The Maclaurin (Taylor at 0) series for $e^x$ is…",
    options: [
      "$1 + x + x^2 + x^3 + \\cdots$",
      "$1 + x + x^2/2 + x^3/3 + \\cdots$",
      "$1 + x + x^2/2! + x^3/3! + \\cdots$",
      "$x + x^2/2 + x^3/3 + \\cdots$",
    ],
    correct: 2,
    explanation:
      "$e^x = \\sum_{n=0}^{\\infty} x^n / n!$. The factorial in the denominator is what makes the series converge for every real (and complex) $x$.",
  },
];
