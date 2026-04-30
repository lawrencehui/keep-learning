import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function LimitsBody() {
  return (
    <>
      <p>
        Calculus is the mathematics of <em>change</em>, and limits are the
        precise tool that lets us talk about change without ever leaving
        algebra. The trick: instead of saying "what does <InlineMath math="f" /> do
        at <InlineMath math="x = a" />?", we ask "what does{" "}
        <InlineMath math="f" /> do as <InlineMath math="x" /> gets{" "}
        <em>arbitrarily close</em> to <InlineMath math="a" />?". That sleight
        of hand turns "instantaneous velocity" — a contradiction in terms
        for a Newtonian — into a perfectly well-defined number.
      </p>
      <p>
        We'll move in three layers of rigour. First, intuitive limits you
        can compute by squinting at a graph. Second, the squeeze theorem
        and limit laws — quick algebraic tools. Third, the formal{" "}
        <InlineMath math="\varepsilon" />–<InlineMath math="\delta" />{" "}
        definition that makes all the previous steps actually mean
        something. After that, continuity, the Intermediate Value Theorem,
        and a peek at L'Hôpital's rule.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.01 Single Variable Calculus (full course)",
            author: "Prof. David Jerison (MIT OCW)",
            duration: "~50h, lectures + recitations",
            url: "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/",
            note: "The canonical first calculus course. Lectures 1–4 cover this chapter.",
          },
          {
            title: "Essence of Calculus",
            author: "3Blue1Brown",
            duration: "12 episodes, ~2.5h total",
            url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr",
            note: "Visual intuition for the whole module. Episode 7 is on limits specifically.",
          },
          {
            title: "Spivak — Calculus, chs. 5–6",
            author: "Michael Spivak",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Calculus_(Spivak)",
            note: "If you want full rigour. Spivak's ε–δ chapter is the gold standard.",
          },
          {
            title: "Professor Leonard — Calculus 1 lectures",
            author: "Professor Leonard",
            duration: "~80h, classroom recordings",
            url: "https://www.youtube.com/playlist?list=PLF797E961509B4EB5",
            note: "Long, slow, listenable. Great gym/commute fodder for the whole module.",
          },
          {
            title: "Stewart — Calculus, ch. 2",
            author: "James Stewart",
            duration: "Reading",
            url: "https://www.stewartcalculus.com/",
            note: "More applied feel than Spivak; lots of worked problems.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Intuitive limits</h2>

      <p>
        The notation
      </p>
      <BlockMath math="\lim_{x \to a} f(x) = L" />
      <p>
        is read "the limit of <InlineMath math="f(x)" /> as{" "}
        <InlineMath math="x" /> approaches <InlineMath math="a" /> equals{" "}
        <InlineMath math="L" />". The intuition: as you feed{" "}
        <InlineMath math="f" /> values of <InlineMath math="x" /> closer
        and closer to <InlineMath math="a" /> (without ever reaching{" "}
        <InlineMath math="a" />), the outputs huddle ever closer to{" "}
        <InlineMath math="L" />. The point <InlineMath math="x = a" /> may
        not even be in the domain of <InlineMath math="f" /> — limits are
        about what <em>should</em> happen at <InlineMath math="a" />, given
        the trend nearby.
      </p>

      <p>
        Three quick examples to anchor the idea:
      </p>
      <ul>
        <li>
          <InlineMath math="\displaystyle \lim_{x \to 2} (3x - 1) = 5" />.
          The function is defined at <InlineMath math="x = 2" /> and is
          well-behaved; the limit is just the value.
        </li>
        <li>
          <InlineMath math="\displaystyle \lim_{x \to 0} \frac{\sin x}{x} = 1" />
          . The function is{" "}
          <em>not defined</em> at <InlineMath math="x = 0" /> (division by
          zero), but the trend on either side approaches 1. We'll prove
          this with the squeeze theorem in Part 2.
        </li>
        <li>
          <InlineMath math="\displaystyle \lim_{x \to 0} \frac{1}{x^2} = +\infty" />
          . The function is unbounded at the origin, so we say the limit
          is <em>infinity</em> — meaning the values grow without bound, not
          that there's a number called infinity that the function reaches.
        </li>
      </ul>

      <h3>One-sided limits</h3>
      <p>
        Sometimes a function behaves differently as you approach{" "}
        <InlineMath math="a" /> from the left versus from the right. We
        write
      </p>
      <BlockMath math="\lim_{x \to a^-} f(x) \quad \text{and} \quad \lim_{x \to a^+} f(x)" />
      <p>
        for the limits from below and above, respectively. The two-sided
        limit <InlineMath math="\lim_{x \to a} f(x)" /> exists only when
        both one-sided limits exist <em>and</em> agree.
      </p>
      <p>
        Example. The function{" "}
        <InlineMath math="f(x) = x / |x|" /> equals{" "}
        <InlineMath math="+1" /> for <InlineMath math="x > 0" /> and{" "}
        <InlineMath math="-1" /> for <InlineMath math="x < 0" />. So
      </p>
      <BlockMath math="\lim_{x \to 0^+} f(x) = 1, \quad \lim_{x \to 0^-} f(x) = -1." />
      <p>
        The two sides disagree, so <InlineMath math="\lim_{x \to 0} f(x)" />{" "}
        does not exist (often abbreviated DNE).
      </p>

      <h3>Limits at infinity</h3>
      <p>
        We can also ask "what happens to <InlineMath math="f(x)" /> as{" "}
        <InlineMath math="x \to \infty" />?". This describes long-term
        behaviour:
      </p>
      <BlockMath math="\lim_{x \to \infty} \frac{1}{x} = 0, \qquad \lim_{x \to \infty} \frac{2x^2 + 3}{x^2 + 5} = 2." />
      <p>
        For rational functions, the trick is to divide top and bottom by
        the highest power of <InlineMath math="x" /> in the denominator —
        each term of the form <InlineMath math="c / x^k" /> with{" "}
        <InlineMath math="k > 0" /> goes to 0, leaving the limit as a
        ratio of leading coefficients (when the degrees match).
      </p>

      <h3>Indeterminate forms</h3>
      <p>
        Some limit calculations look like algebra-breaking nonsense at
        first: <InlineMath math="0 / 0" />, <InlineMath math="\infty - \infty" />,{" "}
        <InlineMath math="\infty / \infty" />, <InlineMath math="0 \cdot \infty" />,{" "}
        <InlineMath math="1^{\infty}" />, <InlineMath math="0^0" />,{" "}
        <InlineMath math="\infty^0" />. These are <strong>indeterminate
        forms</strong> — the value of the limit depends on the specific
        functions, not just the rough shape. Compare:
      </p>
      <BlockMath math="\lim_{x \to 0} \frac{x}{x} = 1, \quad \lim_{x \to 0} \frac{x^2}{x} = 0, \quad \lim_{x \to 0} \frac{x}{x^3} = \infty." />
      <p>
        All three are <InlineMath math="0/0" /> on inspection; they have
        wildly different limits. Indeterminate forms aren't errors — they
        signal that you have to do more algebra (factor, cancel,
        rationalise, expand a Taylor series, or eventually invoke
        L'Hôpital's rule).
      </p>

      <Pitfall>
        <InlineMath math="\infty" /> is not a number. Saying "the limit
        equals infinity" is shorthand for "the function grows without
        bound." You can't add or subtract <InlineMath math="\infty" /> the
        way you would a real number, which is why{" "}
        <InlineMath math="\infty - \infty" /> is indeterminate rather than
        zero.
      </Pitfall>

      <Exercise
        number="1.1"
        prompt={
          <>
            Compute{" "}
            <InlineMath math="\displaystyle \lim_{x \to 3} \frac{x^2 - 9}{x - 3}" />.
          </>
        }
      >
        <p>
          Direct substitution gives <InlineMath math="0/0" />, which is
          indeterminate. Factor the numerator:{" "}
          <InlineMath math="x^2 - 9 = (x - 3)(x + 3)" />. Then
        </p>
        <BlockMath math="\frac{(x-3)(x+3)}{x-3} = x + 3 \quad (\text{for } x \neq 3)." />
        <p>
          Limits are about the trend near <InlineMath math="x = 3" />, not
          the value at <InlineMath math="x = 3" />, so we're allowed to
          cancel. The limit is <InlineMath math="3 + 3 = 6" />. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Limit laws and the squeeze theorem</h2>

      <p>
        If <InlineMath math="\lim_{x \to a} f = L" /> and{" "}
        <InlineMath math="\lim_{x \to a} g = M" />, then sums, differences,
        products, and quotients of limits combine the obvious way:
      </p>
      <BlockMath math="\lim_{x \to a}\bigl(f(x) + g(x)\bigr) = L + M," />
      <BlockMath math="\lim_{x \to a}\bigl(f(x) \cdot g(x)\bigr) = L \cdot M," />
      <BlockMath math="\lim_{x \to a}\frac{f(x)}{g(x)} = \frac{L}{M} \quad (\text{provided } M \neq 0)." />
      <p>
        These laws look obvious but each requires proof from the formal
        definition (Part 3). Once you have them, you can compute most
        polynomial and rational limits by direct substitution, falling
        back to factoring or rationalising for indeterminate forms.
      </p>

      <h3>The squeeze theorem</h3>
      <p>
        If three functions satisfy{" "}
        <InlineMath math="g(x) \leq f(x) \leq h(x)" /> in a neighbourhood
        of <InlineMath math="a" />, and if{" "}
        <InlineMath math="\lim_{x \to a} g = \lim_{x \to a} h = L" />, then{" "}
        <InlineMath math="\lim_{x \to a} f(x) = L" /> too. The function in
        the middle has nowhere to go — both bounds drag it to{" "}
        <InlineMath math="L" />.
      </p>

      <p>
        <strong>Theorem.</strong>{" "}
        <InlineMath math="\displaystyle \lim_{x \to 0} \frac{\sin x}{x} = 1" />.
      </p>
      <p>
        <strong>Proof sketch.</strong> Geometric argument on the unit
        circle: for small positive <InlineMath math="x" />,
      </p>
      <BlockMath math="\sin x \;\leq\; x \;\leq\; \tan x," />
      <p>
        comparing the height of a sector, the arc length, and the height
        of a tangent triangle. Divide all three by{" "}
        <InlineMath math="\sin x" /> and invert (everything is positive):
      </p>
      <BlockMath math="\cos x \;\leq\; \frac{\sin x}{x} \;\leq\; 1." />
      <p>
        As <InlineMath math="x \to 0^+" />,{" "}
        <InlineMath math="\cos x \to 1" /> and the right bound is already
        1. By the squeeze theorem,{" "}
        <InlineMath math="\sin x / x \to 1" />. The left side{" "}
        (<InlineMath math="x \to 0^-" />) is identical because{" "}
        <InlineMath math="\sin x / x" /> is even. ∎
      </p>

      <Exercise
        number="2.1"
        prompt={
          <>
            Compute{" "}
            <InlineMath math="\displaystyle \lim_{x \to 0} x^2 \sin\!\Bigl(\tfrac{1}{x}\Bigr)" />.
          </>
        }
      >
        <p>
          The factor <InlineMath math="\sin(1/x)" /> oscillates wildly as{" "}
          <InlineMath math="x \to 0" /> and has no limit on its own. But
          we can squeeze:{" "}
          <InlineMath math="-1 \leq \sin(1/x) \leq 1" />, so{" "}
          <InlineMath math="-x^2 \leq x^2 \sin(1/x) \leq x^2" />. Both{" "}
          <InlineMath math="\pm x^2 \to 0" /> as{" "}
          <InlineMath math="x \to 0" />. By the squeeze theorem, the
          middle <InlineMath math="\to 0" />. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · The ε–δ definition</h2>

      <p>
        Everything above was intuitive. Now the formal definition that
        underpins it all. This is{" "}
        <em>the</em> definition of "limit" in modern mathematics, due to
        Cauchy and Weierstrass in the 19th century.
      </p>

      <Callout title="Definition">
        <InlineMath math="\displaystyle \lim_{x \to a} f(x) = L" /> means:
        for every{" "}
        <InlineMath math="\varepsilon > 0" />, there exists a{" "}
        <InlineMath math="\delta > 0" /> such that for all{" "}
        <InlineMath math="x" />,
        <BlockMath math="0 < |x - a| < \delta \;\Longrightarrow\; |f(x) - L| < \varepsilon." />
      </Callout>

      <p>
        Read this slowly. The structure is{" "}
        <InlineMath math="\forall \varepsilon,\, \exists \delta" /> — for{" "}
        <em>any</em> tolerance you give for the output, I can find{" "}
        <em>some</em> tolerance for the input that keeps me inside yours.
        Order of quantifiers matters (recall Foundations Part 3):{" "}
        <InlineMath math="\delta" /> is allowed to depend on{" "}
        <InlineMath math="\varepsilon" />.
      </p>

      <h3>Visual intuition</h3>
      <p>
        Think of a "challenge-response" game. A challenger picks a tiny{" "}
        <InlineMath math="\varepsilon" />: "I want{" "}
        <InlineMath math="f(x)" /> within{" "}
        <InlineMath math="\varepsilon" /> of <InlineMath math="L" />." You
        respond with a <InlineMath math="\delta" />: "fine, just keep{" "}
        <InlineMath math="x" /> within <InlineMath math="\delta" /> of{" "}
        <InlineMath math="a" /> and you'll be inside your tolerance." If
        you can always respond, no matter how small the challenger goes,
        the limit equals <InlineMath math="L" />.
      </p>
      <p>
        Try the widget below. Pick a function and a target point; adjust{" "}
        <InlineMath math="\varepsilon" /> first (the horizontal band
        around the candidate limit), then <InlineMath math="\delta" /> (the
        vertical band around <InlineMath math="a" />). The widget tells
        you whether your <InlineMath math="\delta" /> is small enough to
        keep <InlineMath math="f" /> inside the{" "}
        <InlineMath math="\varepsilon" /> band.
      </p>

      <EpsilonDeltaWidget />

      <h3>A worked ε–δ proof</h3>
      <p>
        <strong>Claim.</strong>{" "}
        <InlineMath math="\displaystyle \lim_{x \to 3} (2x + 1) = 7" />.
      </p>
      <p>
        <strong>Proof.</strong> Given{" "}
        <InlineMath math="\varepsilon > 0" />, choose{" "}
        <InlineMath math="\delta = \varepsilon / 2" />. Then if{" "}
        <InlineMath math="0 < |x - 3| < \delta" />,
      </p>
      <BlockMath math="|f(x) - 7| = |(2x + 1) - 7| = |2x - 6| = 2|x - 3| < 2\delta = \varepsilon. \quad \blacksquare" />
      <p>
        The trick was to bound{" "}
        <InlineMath math="|f(x) - L|" /> in terms of{" "}
        <InlineMath math="|x - a|" /> by algebra; then we picked{" "}
        <InlineMath math="\delta" /> small enough so that the bound came
        out below <InlineMath math="\varepsilon" />. For more complex
        functions you sometimes need a two-step bound (e.g. first
        restrict <InlineMath math="\delta < 1" /> to keep things in a
        controlled range, then refine).
      </p>

      <Pitfall>
        Choosing <InlineMath math="\delta" /> in terms of{" "}
        <InlineMath math="\varepsilon" /> is the whole game. Saying
        "let <InlineMath math="\delta = \varepsilon" />" with no
        justification doesn't constitute a proof — you have to{" "}
        <em>show</em> that this <InlineMath math="\delta" /> works. The
        algebra above is the actual content of the proof.
      </Pitfall>

      <Exercise
        number="3.1"
        prompt={
          <>
            Use ε–δ to prove{" "}
            <InlineMath math="\displaystyle \lim_{x \to 1} 5x = 5" />.
          </>
        }
      >
        <p>
          Given <InlineMath math="\varepsilon > 0" />, pick{" "}
          <InlineMath math="\delta = \varepsilon / 5" />. Then{" "}
          <InlineMath math="0 < |x - 1| < \delta" /> implies
        </p>
        <BlockMath math="|5x - 5| = 5|x - 1| < 5\delta = \varepsilon. \quad \blacksquare" />
      </Exercise>

      <Exercise
        number="3.2"
        prompt={
          <>
            Use ε–δ to prove{" "}
            <InlineMath math="\displaystyle \lim_{x \to 2} x^2 = 4" />.
          </>
        }
      >
        <p>
          We want to bound <InlineMath math="|x^2 - 4| = |x-2||x+2|" />.
          The factor <InlineMath math="|x - 2|" /> we can make as small
          as we like; the factor <InlineMath math="|x + 2|" /> we just
          need to keep bounded. <strong>Step 1:</strong> assume{" "}
          <InlineMath math="\delta \leq 1" />. Then{" "}
          <InlineMath math="|x - 2| < 1 \Rightarrow x \in (1, 3) \Rightarrow |x + 2| < 5" />.
        </p>
        <p>
          <strong>Step 2:</strong> given{" "}
          <InlineMath math="\varepsilon > 0" />, choose{" "}
          <InlineMath math="\delta = \min\{1,\, \varepsilon / 5\}" />. Then
        </p>
        <BlockMath math="|x^2 - 4| = |x - 2|\,|x + 2| < \delta \cdot 5 \leq \varepsilon. \quad \blacksquare" />
        <p>
          The two-stage choice (<InlineMath math="\delta = \min" /> of two
          things) is a recurring pattern when one factor needs taming.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Continuity</h2>

      <p>
        A function <InlineMath math="f" /> is <strong>continuous at</strong>{" "}
        <InlineMath math="a" /> if all three of the following hold:
      </p>
      <ol>
        <li>
          <InlineMath math="f(a)" /> is defined.
        </li>
        <li>
          <InlineMath math="\lim_{x \to a} f(x)" /> exists.
        </li>
        <li>
          <InlineMath math="\lim_{x \to a} f(x) = f(a)" />.
        </li>
      </ol>
      <p>
        In words: the limit equals the value. We say <InlineMath math="f" /> is{" "}
        <strong>continuous on</strong> a set if it is continuous at every
        point of the set. The pictorial slogan is "you can draw the graph
        without lifting your pen," which is correct as a hand-wave but
        will mislead you on functions like <InlineMath math="\sin(1/x)" />,
        where the analytic definition is what matters.
      </p>

      <p>
        Three flavours of discontinuity are worth naming:
      </p>
      <ul>
        <li>
          <strong>Removable:</strong> the limit exists, but{" "}
          <InlineMath math="f(a)" /> is undefined or wrong. Example:{" "}
          <InlineMath math="(x^2 - 1)/(x - 1)" /> at{" "}
          <InlineMath math="x = 1" />. You could "patch" the function by
          defining <InlineMath math="f(1) = 2" /> and the patched function
          would be continuous.
        </li>
        <li>
          <strong>Jump:</strong> the one-sided limits exist but
          disagree. Example:{" "}
          <InlineMath math="\operatorname{sign}(x)" /> at 0, or the
          floor function at every integer.
        </li>
        <li>
          <strong>Essential / infinite:</strong> the limit doesn't exist
          even as a finite number. Examples:{" "}
          <InlineMath math="1/x" /> at 0 (blows up),{" "}
          <InlineMath math="\sin(1/x)" /> at 0 (oscillates wildly).
        </li>
      </ul>

      <h3>Continuity is preserved by combinations</h3>
      <p>
        If <InlineMath math="f" /> and <InlineMath math="g" /> are
        continuous at <InlineMath math="a" />, then so are{" "}
        <InlineMath math="f + g" />, <InlineMath math="f - g" />,{" "}
        <InlineMath math="fg" />, and (provided{" "}
        <InlineMath math="g(a) \neq 0" />) <InlineMath math="f/g" />. If{" "}
        <InlineMath math="g" /> is continuous at <InlineMath math="a" /> and{" "}
        <InlineMath math="f" /> is continuous at{" "}
        <InlineMath math="g(a)" />, then <InlineMath math="f \circ g" /> is
        continuous at <InlineMath math="a" />. These follow from the limit
        laws.
      </p>
      <p>
        Practical consequence: every polynomial is continuous on{" "}
        <InlineMath math="\mathbb{R}" />; every rational function is
        continuous wherever its denominator is nonzero;{" "}
        <InlineMath math="\sin, \cos, e^x" /> are continuous everywhere;{" "}
        <InlineMath math="\ln, \sqrt{\,\cdot\,}" /> are continuous
        wherever they're defined. Continuity on "nice" functions is the
        rule.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · The Intermediate Value Theorem</h2>

      <p>
        <strong>Theorem (IVT).</strong> Let{" "}
        <InlineMath math="f" /> be continuous on{" "}
        <InlineMath math="[a, b]" /> and let{" "}
        <InlineMath math="N" /> be any value strictly between{" "}
        <InlineMath math="f(a)" /> and <InlineMath math="f(b)" />. Then
        there exists at least one <InlineMath math="c \in (a, b)" /> with{" "}
        <InlineMath math="f(c) = N" />.
      </p>

      <p>
        Picture: a continuous graph that starts at{" "}
        <InlineMath math="f(a)" /> and ends at{" "}
        <InlineMath math="f(b)" /> can't skip past the horizontal line{" "}
        <InlineMath math="y = N" />. It has to cross.
      </p>

      <p>
        IVT is the workhorse of <em>existence proofs</em>. To show "this
        equation has a solution," check that some continuous function
        changes sign — by IVT it crosses zero, meaning a solution exists.
      </p>

      <p>
        <strong>Example.</strong> Show that{" "}
        <InlineMath math="x^3 = 7" /> has a real solution.
      </p>
      <p>
        Let <InlineMath math="f(x) = x^3 - 7" />. It's a polynomial, so
        continuous. <InlineMath math="f(1) = -6 < 0" /> and{" "}
        <InlineMath math="f(2) = 1 > 0" />. By IVT there's some{" "}
        <InlineMath math="c \in (1, 2)" /> with <InlineMath math="f(c) = 0" />,
        i.e. <InlineMath math="c^3 = 7" />. (The numerical value is{" "}
        <InlineMath math="\sqrt[3]{7} \approx 1.913" />.) ∎
      </p>

      <Pitfall>
        IVT only guarantees{" "}
        <em>existence</em> of a solution, not uniqueness. To get a unique{" "}
        <InlineMath math="c" />, you typically also need{" "}
        <InlineMath math="f" /> to be monotonic on the interval.
      </Pitfall>

      <Exercise
        number="5.1"
        prompt={
          <>
            Use IVT to show that <InlineMath math="\cos x = x" /> has a
            solution in <InlineMath math="[0, 1]" />.
          </>
        }
      >
        <p>
          Let <InlineMath math="g(x) = \cos x - x" />. Continuous (sum of
          continuous). <InlineMath math="g(0) = 1 - 0 = 1 > 0" />;{" "}
          <InlineMath math="g(1) = \cos 1 - 1 \approx 0.540 - 1 = -0.460 < 0" />
          . By IVT there is some <InlineMath math="c \in (0, 1)" /> with{" "}
          <InlineMath math="g(c) = 0" />, i.e.{" "}
          <InlineMath math="\cos c = c" />. ∎
        </p>
        <p>
          That fixed-point <InlineMath math="c \approx 0.7391" /> is the
          unique attractor of the iteration{" "}
          <InlineMath math="x \mapsto \cos x" /> — try it on a calculator.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · L'Hôpital's rule (preview)</h2>

      <p>
        For <InlineMath math="0/0" /> and{" "}
        <InlineMath math="\infty/\infty" /> indeterminate forms, there's a
        powerful shortcut you'll meet again after derivatives:
      </p>

      <Callout title="L'Hôpital's rule">
        If <InlineMath math="\lim_{x \to a} f(x) = \lim_{x \to a} g(x) = 0" />{" "}
        (or both <InlineMath math="\to \infty" />),{" "}
        <InlineMath math="g'(x) \neq 0" /> near <InlineMath math="a" />,
        and the right-hand limit below exists, then
        <BlockMath math="\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}." />
      </Callout>

      <p>
        Don't use this until you've covered derivatives. But it's worth
        seeing now so the connection lands: the derivatives "smooth out"
        the indeterminate form into something you can evaluate.
      </p>

      <p>
        Example. <InlineMath math="\lim_{x \to 0} \sin x / x" /> is{" "}
        <InlineMath math="0/0" />. Differentiating top and bottom:{" "}
        <InlineMath math="\cos x / 1" />, which evaluates to{" "}
        <InlineMath math="\cos 0 = 1" />. Same answer as the squeeze-
        theorem proof in Part 2, but obtained in two lines.
      </p>

      <Pitfall>
        L'Hôpital only applies to the indeterminate forms{" "}
        <InlineMath math="0/0" /> and <InlineMath math="\infty/\infty" />.
        Applying it to a determinate form like{" "}
        <InlineMath math="\lim_{x \to 0} (\cos x) / 1" /> just{" "}
        <em>happens</em> to give the right answer here but is not a valid
        application — and can give the wrong answer in general. Check the
        form first.
      </Pitfall>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <p>
        Every other idea in calculus rests on limits. The derivative is a
        limit; the integral is a limit; convergence of an infinite series
        is a limit. Without limits, "instantaneous rate of change" is a
        contradiction in terms; with them, it's a calculation.
      </p>
      <p>
        The <InlineMath math="\varepsilon" />–<InlineMath math="\delta" />{" "}
        machinery seems pedantic on first encounter, but it's what
        rescues calculus from paradoxes. The 17th-century calculus of
        Newton and Leibniz used "infinitesimals" — quantities smaller
        than any positive number but not zero — and worked beautifully in
        practice but was logically suspect. In the 19th century, Cauchy
        and Weierstrass replaced the mystical infinitesimal with the very
        concrete "for every <InlineMath math="\varepsilon" /> there is a{" "}
        <InlineMath math="\delta" />" you saw in Part 3. That's the
        calculus you'll see in every textbook from this one through
        graduate-level real analysis.
      </p>
      <p>
        Looking forward: continuity is the main hypothesis in nearly
        every theorem of calculus and analysis. IVT, the Mean Value
        Theorem (next chapter), the Extreme Value Theorem, the
        Fundamental Theorem of Calculus — all require continuity. If you
        ever wonder "why does this theorem have so many hypotheses?", the
        answer is almost always: to rule out a pathological discontinuity
        that would let the conclusion fail.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: ε–δ visualiser
// ════════════════════════════════════════════════════════════

type Func = "linear" | "quadratic" | "abs" | "rational";

const funcs: Record<Func, { f: (x: number) => number; latex: string; a: number; L: number }> = {
  linear: { f: (x) => 2 * x + 1, latex: "f(x) = 2x + 1", a: 3, L: 7 },
  quadratic: { f: (x) => x * x, latex: "f(x) = x^2", a: 2, L: 4 },
  abs: { f: (x) => Math.abs(x), latex: "f(x) = |x|", a: 0, L: 0 },
  rational: {
    f: (x) => (x === 1 ? NaN : (x * x - 1) / (x - 1)),
    latex: "f(x) = \\frac{x^2 - 1}{x - 1}",
    a: 1,
    L: 2,
  },
};

function EpsilonDeltaWidget() {
  const [fnKey, setFnKey] = useState<Func>("linear");
  const [eps, setEps] = useState(0.6);
  const [del, setDel] = useState(0.3);

  const { f, latex, a, L } = funcs[fnKey];

  const w = 360;
  const h = 240;
  const xCenter = a;
  const xRange = 4;
  const xMin = xCenter - xRange / 2;
  const xMax = xCenter + xRange / 2;
  const yCenter = L;
  const yRange = 4;
  const yMin = yCenter - yRange / 2;
  const yMax = yCenter + yRange / 2;
  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * w;
  const sy = (y: number) => h - ((y - yMin) / (yMax - yMin)) * h;

  // Build path
  const samples = 240;
  const pts: string[] = [];
  let prev = false;
  for (let i = 0; i <= samples; i++) {
    const x = xMin + ((xMax - xMin) * i) / samples;
    const y = f(x);
    if (!isFinite(y) || y < yMin - 4 || y > yMax + 4) {
      prev = false;
      continue;
    }
    pts.push(`${prev ? "L" : "M"}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`);
    prev = true;
  }

  // Test if every x in (a-del, a+del) (excluding a) gives f(x) within (L-eps, L+eps)
  let satisfies = true;
  let worst = 0;
  const N = 200;
  for (let i = 0; i <= N; i++) {
    const x = a - del + (2 * del * i) / N;
    if (Math.abs(x - a) < 1e-9) continue;
    const y = f(x);
    if (!isFinite(y)) continue;
    const err = Math.abs(y - L);
    if (err > worst) worst = err;
    if (err >= eps) satisfies = false;
  }

  const epsBandTop = sy(L + eps);
  const epsBandBot = sy(L - eps);
  const delBandLeft = sx(a - del);
  const delBandRight = sx(a + del);

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs uppercase tracking-widest text-ink-500 self-center mr-1">
            Function
          </span>
          {(["linear", "quadratic", "abs", "rational"] as Func[]).map((k) => (
            <button
              key={k}
              onClick={() => setFnKey(k)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                fnKey === k
                  ? "border-accent-soft bg-ink-800 text-white"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              <InlineMath math={latex && fnKey === k ? latex : funcs[k].latex} />
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
            {/* axes */}
            <line x1={0} y1={sy(0)} x2={w} y2={sy(0)} stroke="#2a2a37" />
            <line x1={sx(0)} y1={0} x2={sx(0)} y2={h} stroke="#2a2a37" />

            {/* ε horizontal band */}
            <rect
              x={0}
              y={epsBandTop}
              width={w}
              height={epsBandBot - epsBandTop}
              fill={satisfies ? "#22c55e" : "#f43f5e"}
              fillOpacity={0.07}
            />
            <line
              x1={0}
              y1={epsBandTop}
              x2={w}
              y2={epsBandTop}
              stroke={satisfies ? "#22c55e" : "#f43f5e"}
              strokeWidth={1}
              strokeOpacity={0.5}
              strokeDasharray="3 3"
            />
            <line
              x1={0}
              y1={epsBandBot}
              x2={w}
              y2={epsBandBot}
              stroke={satisfies ? "#22c55e" : "#f43f5e"}
              strokeWidth={1}
              strokeOpacity={0.5}
              strokeDasharray="3 3"
            />

            {/* δ vertical band */}
            <rect
              x={delBandLeft}
              y={0}
              width={delBandRight - delBandLeft}
              height={h}
              fill="#a78bfa"
              fillOpacity={0.08}
            />
            <line
              x1={delBandLeft}
              y1={0}
              x2={delBandLeft}
              y2={h}
              stroke="#a78bfa"
              strokeWidth={1}
              strokeOpacity={0.5}
              strokeDasharray="3 3"
            />
            <line
              x1={delBandRight}
              y1={0}
              x2={delBandRight}
              y2={h}
              stroke="#a78bfa"
              strokeWidth={1}
              strokeOpacity={0.5}
              strokeDasharray="3 3"
            />

            {/* function curve */}
            <path d={pts.join(" ")} fill="none" stroke="#22d3ee" strokeWidth={1.8} />

            {/* target point */}
            <circle cx={sx(a)} cy={sy(L)} r={4} fill="#a78bfa" />
            <text x={sx(a) + 6} y={sy(L) - 6} fontSize={10} fill="#a78bfa">
              (a, L) = ({a}, {L})
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SlideRow label={`ε = ${eps.toFixed(2)}`} value={eps} min={0.05} max={2} step={0.01} onChange={setEps} />
          <SlideRow label={`δ = ${del.toFixed(2)}`} value={del} min={0.01} max={2} step={0.01} onChange={setDel} />
        </div>

        <div
          className={`text-sm rounded-lg px-3 py-2 ${
            satisfies
              ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30"
              : "bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/30"
          }`}
        >
          {satisfies
            ? "✓ This δ works for this ε. The function stays inside the horizontal band whenever the input is inside the vertical band."
            : `✗ Not yet. Worst |f(x) − L| in this δ-window is ${worst.toFixed(3)}, which exceeds ε = ${eps.toFixed(2)}. Try a smaller δ.`}
        </div>
      </div>
      <figcaption>
        Cyan: the function. Purple band: <InlineMath math="(a-\delta,\, a+\delta)" />.
        Horizontal band: <InlineMath math="(L-\varepsilon,\, L+\varepsilon)" />.
        For the limit to exist, you must be able to find a working{" "}
        <InlineMath math="\delta" /> for every <InlineMath math="\varepsilon" />.
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
      "Compute $\\displaystyle \\lim_{x \\to 4} \\frac{x^2 - 16}{x - 4}$.",
    options: ["0", "8", "16", "Does not exist"],
    correct: 1,
    explanation:
      "Direct substitution gives $0/0$ (indeterminate). Factor: $(x-4)(x+4)/(x-4) = x + 4$ for $x \\neq 4$. The limit is $4 + 4 = 8$.",
  },
  {
    prompt:
      "If $\\lim_{x \\to a^-} f(x) = 3$ and $\\lim_{x \\to a^+} f(x) = 5$, what is $\\lim_{x \\to a} f(x)$?",
    options: ["3", "4", "5", "Does not exist"],
    correct: 3,
    explanation:
      "The two-sided limit exists only when both one-sided limits agree. Here they disagree, so the two-sided limit does not exist (DNE).",
  },
  {
    prompt:
      "In the ε–δ definition, the order of quantifiers is:",
    options: [
      "$\\exists \\delta \\, \\forall \\varepsilon$",
      "$\\forall \\varepsilon \\, \\exists \\delta$",
      "$\\exists \\varepsilon \\, \\forall \\delta$",
      "$\\forall \\delta \\, \\exists \\varepsilon$",
    ],
    correct: 1,
    explanation:
      "For every ε you give, you must produce a δ that works. The δ is allowed to depend on ε. Reversing the order gives a strictly stronger condition (uniform continuity).",
  },
  {
    prompt:
      "Which is **not** an indeterminate form?",
    options: ["$0 / 0$", "$\\infty / \\infty$", "$0 \\cdot \\infty$", "$0 / \\infty$"],
    correct: 3,
    explanation:
      "$0 / \\infty$ is determinate — it always equals 0 (a vanishing numerator divided by something growing without bound). The first three depend on the specific functions involved.",
  },
  {
    prompt:
      "By the Intermediate Value Theorem, the equation $x^5 - x - 1 = 0$ has at least one real solution because…",
    options: [
      "Every polynomial has a real root.",
      "$f(0) = -1 < 0$ and $f(2) = 29 > 0$, and $f$ is continuous.",
      "The polynomial has degree 5.",
      "$f'(x)$ changes sign.",
    ],
    correct: 1,
    explanation:
      "IVT applied to the continuous function $f(x) = x^5 - x - 1$ on $[0, 2]$: it takes a negative value at $0$ and a positive one at $2$, so it must hit $0$ somewhere in between. (Option A is false — even-degree polynomials need not have real roots.)",
  },
];
