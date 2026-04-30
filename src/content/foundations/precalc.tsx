import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  ReferenceResources,
  Callout,
  Exercise,
  Pitfall,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function PrecalcBody() {
  return (
    <>
      <p>
        Pre-calculus is the toolkit. Calculus, linear algebra, and
        eventually quantum mechanics use functions, trig identities, and
        logarithms <em>constantly</em>, often without slowing down to
        re-derive them. This chapter is the warm-up bench: not much here
        will be new, but rust costs you later.
      </p>
      <p>
        Plan to spend a long sitting on this — read it the way you'd read
        the first chapter of a textbook, with a pen. Worked examples,
        exercises with revealed solutions, and a couple of small
        widgets. If something here feels slow, that's by design — these
        are the tools you'll be reaching for in every later chapter, so
        seeing them in detail now pays off many times.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Khan Academy — Precalculus (full course)",
            author: "Khan Academy",
            duration: "~30h, dozens of short lectures",
            url: "https://www.khanacademy.org/math/precalculus",
            note: "Most accessible run of this material. Each topic is a 5–10 min self-contained lecture.",
          },
          {
            title: "Professor Leonard — Pre-Calculus playlist",
            author: "Professor Leonard",
            duration: "~80h, full classroom lectures",
            url: "https://www.youtube.com/playlist?list=PL5102DFDC6790F3D0",
            note: "Long, slow, audio-friendly classroom recordings. Great gym/commute material.",
          },
          {
            title: "But what is e^(iπ)? — Visualising Euler's formula",
            author: "3Blue1Brown",
            duration: "12 min",
            url: "https://www.youtube.com/watch?v=v0YEaeIClKY",
            note: "Pairs with Part 4 (complex numbers) of this chapter.",
          },
          {
            title: "What's so special about e? — Euler's number",
            author: "3Blue1Brown",
            duration: "14 min",
            url: "https://www.youtube.com/watch?v=m2MIpDrF7Es",
            note: "Worth listening to right after Part 5.",
          },
          {
            title: "Trigonometry — full course",
            author: "The Organic Chemistry Tutor",
            duration: "~3h",
            url: "https://www.youtube.com/watch?v=PUB0TaZ7bhA",
            note: "Single long lecture; great for one gym session.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Functions, domain, range</h2>

      <p>
        A <strong>function</strong>{" "}
        <InlineMath math="f : A \to B" /> takes each{" "}
        <InlineMath math="x \in A" /> to exactly one{" "}
        <InlineMath math="f(x) \in B" />. The <strong>domain</strong> is
        the set of allowed inputs; the <strong>codomain</strong> is the
        target set; the <strong>range</strong> (or <em>image</em>) is the
        set of outputs that actually get hit.
      </p>
      <p>
        For real-valued functions on the reals — what you'll mostly see
        in calculus — the domain is some subset of{" "}
        <InlineMath math="\mathbb{R}" /> (often determined by what's
        defined: <InlineMath math="\sqrt{x}" /> needs{" "}
        <InlineMath math="x \geq 0" />,{" "}
        <InlineMath math="1/x" /> needs <InlineMath math="x \neq 0" />,{" "}
        <InlineMath math="\ln x" /> needs <InlineMath math="x > 0" />).
        The graph is the set of points{" "}
        <InlineMath math="\{(x, f(x)) : x \in A\}" /> in the plane.
      </p>

      <h3>Polynomials</h3>
      <p>
        A <strong>polynomial</strong> is a function of the form
      </p>
      <BlockMath math="p(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0," />
      <p>
        with constants <InlineMath math="a_i" /> (real or complex). The
        <strong> degree</strong> is the highest power with nonzero
        coefficient. Polynomials are the friendliest functions in the
        zoo — defined for every real <InlineMath math="x" />, smooth
        everywhere, and the building block on top of which most other
        functions get analysed.
      </p>
      <p>
        The <strong>roots</strong> (or <strong>zeros</strong>) of a
        polynomial are the <InlineMath math="x" /> with{" "}
        <InlineMath math="p(x) = 0" />. The Fundamental Theorem of
        Algebra (we'll prove this in Tier VIII) says that a degree-
        <InlineMath math="n" /> polynomial with complex coefficients has
        exactly <InlineMath math="n" /> complex roots, counted with
        multiplicity. Over the reals this fails: a degree-2 polynomial
        like <InlineMath math="x^2 + 1" /> has no real roots, only the
        complex roots <InlineMath math="\pm i" />.
      </p>

      <h3>Rational functions and asymptotes</h3>
      <p>
        A <strong>rational function</strong> is a quotient{" "}
        <InlineMath math="r(x) = p(x)/q(x)" /> of two polynomials. Its
        domain excludes points where the denominator is zero. Near such
        a point the graph typically blows up to{" "}
        <InlineMath math="\pm \infty" /> — a <em>vertical asymptote</em>.
        Far from the origin the graph approaches a fixed line — a{" "}
        <em>horizontal</em> or <em>oblique</em> asymptote determined by
        the leading terms of <InlineMath math="p" /> and{" "}
        <InlineMath math="q" />:
      </p>
      <ul>
        <li>
          <InlineMath math="\deg p < \deg q" />: horizontal asymptote{" "}
          <InlineMath math="y = 0" />.
        </li>
        <li>
          <InlineMath math="\deg p = \deg q" />: horizontal asymptote{" "}
          <InlineMath math="y = a_n / b_n" /> (leading-coefficient ratio).
        </li>
        <li>
          <InlineMath math="\deg p = \deg q + 1" />: oblique asymptote (do
          polynomial long division).
        </li>
      </ul>

      <h3>Even, odd, periodic, monotonic</h3>
      <p>Four common adjectives for functions:</p>
      <ul>
        <li>
          <strong>Even</strong>: <InlineMath math="f(-x) = f(x)" />.
          Symmetric about the <InlineMath math="y" />-axis. Examples:{" "}
          <InlineMath math="x^2" />, <InlineMath math="\cos x" />.
        </li>
        <li>
          <strong>Odd</strong>: <InlineMath math="f(-x) = -f(x)" />.
          Symmetric about the origin. Examples:{" "}
          <InlineMath math="x^3" />, <InlineMath math="\sin x" />.
        </li>
        <li>
          <strong>Periodic</strong> with period <InlineMath math="T" />:{" "}
          <InlineMath math="f(x + T) = f(x)" />. Examples:{" "}
          <InlineMath math="\sin x" /> with{" "}
          <InlineMath math="T = 2\pi" />.
        </li>
        <li>
          <strong>Monotonic</strong>: either{" "}
          <em>strictly increasing</em> (
          <InlineMath math="x < y \Rightarrow f(x) < f(y)" />) or{" "}
          <em>strictly decreasing</em>. Monotonic functions are
          automatically injective on their domain — that's why{" "}
          <InlineMath math="e^x" /> and{" "}
          <InlineMath math="\ln x" /> have inverses but{" "}
          <InlineMath math="x^2" /> needs a domain restriction first.
        </li>
      </ul>

      <Pitfall>
        Most functions are neither even nor odd. Don't assume — check{" "}
        <InlineMath math="f(-x)" /> and compare. The function{" "}
        <InlineMath math="x^3 + 1" /> is{" "}
        <em>neither</em>: <InlineMath math="(-x)^3 + 1 = -x^3 + 1" />,
        which is neither <InlineMath math="x^3 + 1" /> nor{" "}
        <InlineMath math="-(x^3 + 1)" />.
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Graph transformations</h2>

      <p>
        Three operations bend graphs in completely predictable ways.
        Memorise the signs once and you'll never lose sleep over them
        again.
      </p>
      <ul>
        <li>
          <strong>Vertical scale &amp; shift</strong>:{" "}
          <InlineMath math="y = a \cdot f(x) + k" /> stretches the graph
          vertically by <InlineMath math="a" /> and lifts it by{" "}
          <InlineMath math="k" />. Negative <InlineMath math="a" /> flips
          the graph top-to-bottom.
        </li>
        <li>
          <strong>Horizontal scale &amp; shift</strong>:{" "}
          <InlineMath math="y = f(b(x - h))" /> compresses the graph
          horizontally by <InlineMath math="b" /> and slides it{" "}
          <em>right</em> by <InlineMath math="h" />. Negative{" "}
          <InlineMath math="b" /> flips left-to-right.
        </li>
        <li>
          <strong>Combined</strong>:{" "}
          <InlineMath math="y = a \cdot f(b(x - h)) + k" /> packages all
          four parameters.
        </li>
      </ul>

      <Pitfall>
        Horizontal shifts feel backward.{" "}
        <InlineMath math="f(x - 2)" /> shifts the graph{" "}
        <em>right</em> by 2, not left. The reason: the new graph hits
        the same value at <InlineMath math="x = 2" /> that the old one
        hit at <InlineMath math="x = 0" />. The <em>input</em> needs to
        be 2 larger to reproduce the old behaviour, so the graph slid
        right.
      </Pitfall>

      <Callout title="Try it">
        Drag the sliders to see how each parameter reshapes the same
        base function. The cyan curve is the original; the purple curve
        is the transformation.
      </Callout>

      <FunctionTransformWidget />

      <h3>Composition and inverses</h3>
      <p>
        <strong>Composition</strong>{" "}
        <InlineMath math="(f \circ g)(x) = f(g(x))" /> is "do{" "}
        <InlineMath math="g" /> first, then <InlineMath math="f" />".
        Composition is associative but{" "}
        <em>not commutative</em>:{" "}
        <InlineMath math="f \circ g \neq g \circ f" /> in general.
      </p>
      <p>
        An <strong>inverse</strong> of <InlineMath math="f" /> is a
        function <InlineMath math="f^{-1}" /> with{" "}
        <InlineMath math="f^{-1}(f(x)) = x" /> and{" "}
        <InlineMath math="f(f^{-1}(y)) = y" />. A function has an
        inverse iff it's bijective. For a <em>real</em> function, the
        graph of <InlineMath math="f^{-1}" /> is the reflection of the
        graph of <InlineMath math="f" /> across the line{" "}
        <InlineMath math="y = x" /> (we'll see this when we draw{" "}
        <InlineMath math="e^x" /> and <InlineMath math="\ln x" /> below).
      </p>
      <p>
        Functions that aren't bijective on their natural domain often
        get one anyway by <em>restriction</em>:{" "}
        <InlineMath math="x^2" /> on{" "}
        <InlineMath math="[0, \infty)" /> is bijective onto{" "}
        <InlineMath math="[0, \infty)" /> with inverse{" "}
        <InlineMath math="\sqrt{x}" />. Don't be surprised when an
        "inverse" comes with fine print.
      </p>

      <Exercise
        number="2.1"
        prompt={
          <>
            Find the inverse of{" "}
            <InlineMath math="f(x) = 3x - 5" />. State its domain.
          </>
        }
      >
        <p>
          Set <InlineMath math="y = 3x - 5" /> and solve for{" "}
          <InlineMath math="x" />: <InlineMath math="x = (y + 5)/3" />. So{" "}
          <InlineMath math="f^{-1}(y) = (y + 5)/3" />, and we usually
          rename the variable to write{" "}
          <InlineMath math="f^{-1}(x) = (x + 5)/3" />. Domain: all of{" "}
          <InlineMath math="\mathbb{R}" /> — the original function is
          bijective everywhere because it's a strictly increasing line.
        </p>
      </Exercise>

      <Exercise
        number="2.2"
        prompt={
          <>
            Compute <InlineMath math="(f \circ g)(x)" /> and{" "}
            <InlineMath math="(g \circ f)(x)" /> for{" "}
            <InlineMath math="f(x) = x^2 + 1" /> and{" "}
            <InlineMath math="g(x) = 2x" />. Are they equal?
          </>
        }
      >
        <p>
          <InlineMath math="(f \circ g)(x) = f(2x) = (2x)^2 + 1 = 4x^2 + 1" />
          .
        </p>
        <p>
          <InlineMath math="(g \circ f)(x) = g(x^2 + 1) = 2(x^2 + 1) = 2x^2 + 2" />
          .
        </p>
        <p>Different functions. Composition is not commutative. ∎</p>
      </Exercise>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Trigonometry &amp; the unit circle</h2>

      <p>
        Forget triangles for a moment. The cleanest way to think about{" "}
        <InlineMath math="\sin" /> and <InlineMath math="\cos" /> is the{" "}
        <strong>unit circle</strong>: the circle of radius 1 centred at
        the origin. For an angle <InlineMath math="\theta" /> measured
        counter-clockwise from the positive{" "}
        <InlineMath math="x" />-axis, the point on the circle is exactly
      </p>
      <BlockMath math="(\cos\theta, \sin\theta)." />
      <p>
        That's the definition. Triangle definitions you may have seen
        ("opposite over hypotenuse") are special cases for{" "}
        <InlineMath math="\theta \in (0, \pi/2)" />; the unit-circle
        definition extends to every real <InlineMath math="\theta" />,
        including negative and very large angles.
      </p>

      <Callout title="Try it">
        Tap or drag the coloured dot. Notice how{" "}
        <InlineMath math="\cos\theta" /> and{" "}
        <InlineMath math="\sin\theta" /> track the dot's coordinates.
        Watch what happens as <InlineMath math="\theta" /> passes{" "}
        <InlineMath math="\pi/2" />, <InlineMath math="\pi" />, and{" "}
        <InlineMath math="3\pi/2" />.
      </Callout>

      <UnitCircleWidget />

      <h3>The Pythagorean identity (and its friends)</h3>
      <p>
        The point lies on a circle of radius 1, so its coordinates
        satisfy <InlineMath math="x^2 + y^2 = 1" />. Substituting:
      </p>
      <BlockMath math="\cos^2\theta + \sin^2\theta = 1." />
      <p>
        Dividing both sides by <InlineMath math="\cos^2\theta" /> gives a
        second identity:
      </p>
      <BlockMath math="1 + \tan^2\theta = \sec^2\theta," />
      <p>
        where <InlineMath math="\tan\theta = \sin\theta/\cos\theta" /> and{" "}
        <InlineMath math="\sec\theta = 1/\cos\theta" />. Dividing by{" "}
        <InlineMath math="\sin^2\theta" /> instead gives{" "}
        <InlineMath math="\cot^2\theta + 1 = \csc^2\theta" />. All three
        are the same identity, rescaled.
      </p>

      <h3>Angle sum and difference</h3>
      <p>
        These come from the geometry of rotating a point on the unit
        circle by <InlineMath math="\beta" />, then by{" "}
        <InlineMath math="\alpha" />, vs rotating by{" "}
        <InlineMath math="\alpha + \beta" /> directly. Both routes must
        end at the same point.
      </p>
      <BlockMath math="\sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta." />
      <BlockMath math="\cos(\alpha + \beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta." />
      <p>
        From these, set <InlineMath math="\beta = -\beta" /> (and use
        the even/odd properties{" "}
        <InlineMath math="\cos(-\beta) = \cos\beta" />,{" "}
        <InlineMath math="\sin(-\beta) = -\sin\beta" />) to get the
        difference formulas; set{" "}
        <InlineMath math="\alpha = \beta = \theta" /> to get the
        double-angle formulas:
      </p>
      <BlockMath math="\sin(2\theta) = 2\sin\theta\cos\theta," />
      <BlockMath math="\cos(2\theta) = \cos^2\theta - \sin^2\theta = 1 - 2\sin^2\theta = 2\cos^2\theta - 1." />

      <Exercise
        number="3.1"
        prompt={
          <>
            Use the angle-sum formula to compute{" "}
            <InlineMath math="\sin(75^\circ) = \sin(45^\circ + 30^\circ)" />
            {" "}exactly.
          </>
        }
      >
        <p>
          We know{" "}
          <InlineMath math="\sin 45^\circ = \cos 45^\circ = \tfrac{\sqrt 2}{2}" />,{" "}
          <InlineMath math="\sin 30^\circ = \tfrac{1}{2}" />,{" "}
          <InlineMath math="\cos 30^\circ = \tfrac{\sqrt 3}{2}" />. Then
        </p>
        <BlockMath math="\sin 75^\circ = \tfrac{\sqrt 2}{2} \cdot \tfrac{\sqrt 3}{2} + \tfrac{\sqrt 2}{2} \cdot \tfrac{1}{2} = \tfrac{\sqrt 6 + \sqrt 2}{4}." />
        <p>
          Numerically about <InlineMath math="0.9659" />, which matches
          your calculator. ∎
        </p>
      </Exercise>

      <h3>Inverse trig functions</h3>
      <p>
        <InlineMath math="\sin" />, <InlineMath math="\cos" />, and{" "}
        <InlineMath math="\tan" /> aren't injective on{" "}
        <InlineMath math="\mathbb{R}" />, so they don't have honest
        inverses without restriction. The standard branches are:
      </p>
      <ul>
        <li>
          <InlineMath math="\arcsin : [-1, 1] \to [-\pi/2,\, \pi/2]" />,
          inverse of <InlineMath math="\sin" /> restricted to that range.
        </li>
        <li>
          <InlineMath math="\arccos : [-1, 1] \to [0, \pi]" />, inverse of{" "}
          <InlineMath math="\cos" /> on <InlineMath math="[0, \pi]" />.
        </li>
        <li>
          <InlineMath math="\arctan : \mathbb{R} \to (-\pi/2,\, \pi/2)" />,
          inverse of <InlineMath math="\tan" /> on the same open interval.
        </li>
      </ul>
      <p>
        Read these as "the angle whose sine is{" "}
        <InlineMath math="x" />" rather than "<InlineMath math="\sin^{-1}" />
        " — the latter notation is unfortunately also used for{" "}
        <InlineMath math="1/\sin" /> and causes confusion.
      </p>

      <h3>Radians, not degrees</h3>
      <p>
        From here on, angles are in <strong>radians</strong>. One full
        revolution is <InlineMath math="2\pi" /> radians, not{" "}
        <InlineMath math="360^\circ" />. The conversion factor:{" "}
        <InlineMath math="\pi" /> radians <InlineMath math="= 180^\circ" />,
        so multiply degrees by{" "}
        <InlineMath math="\pi/180" /> to convert.
      </p>
      <p>
        Why radians? Because calculus formulas only come out clean in
        radians:
      </p>
      <BlockMath math="\frac{d}{dx} \sin x = \cos x \quad \text{(only in radians).}" />
      <p>
        In degrees the same derivative would have a stray factor of{" "}
        <InlineMath math="\pi/180" />. Radians eliminate the bookkeeping.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Complex numbers</h2>

      <p>
        Quantum mechanics lives in the complex numbers, so we need the
        basics now. A <strong>complex number</strong> is{" "}
        <InlineMath math="z = a + bi" />, where{" "}
        <InlineMath math="a, b \in \mathbb{R}" /> and{" "}
        <InlineMath math="i" /> is a fixed symbol with{" "}
        <InlineMath math="i^2 = -1" />. <InlineMath math="a" /> is the{" "}
        <strong>real part</strong> <InlineMath math="\operatorname{Re}(z)" />
        ; <InlineMath math="b" /> is the <strong>imaginary part</strong>{" "}
        <InlineMath math="\operatorname{Im}(z)" />.
      </p>
      <p>
        Addition is termwise:{" "}
        <InlineMath math="(a + bi) + (c + di) = (a + c) + (b + d)i" />.
        Multiplication uses <InlineMath math="i^2 = -1" />:
      </p>
      <BlockMath math="(a + bi)(c + di) = ac + adi + bci + bdi^2 = (ac - bd) + (ad + bc)i." />

      <p>
        Each <InlineMath math="z = a + bi" /> can be visualised as the
        point <InlineMath math="(a, b)" /> in the plane (the{" "}
        <em>complex plane</em>). The{" "}
        <strong>modulus</strong> of <InlineMath math="z" /> is its
        distance from the origin:
      </p>
      <BlockMath math="|z| = \sqrt{a^2 + b^2}." />
      <p>
        The <strong>complex conjugate</strong> is{" "}
        <InlineMath math="\bar z = a - bi" /> (reflect across the real
        axis). Useful identity:{" "}
        <InlineMath math="z \bar z = a^2 + b^2 = |z|^2" />, which is
        always a non-negative real number.
      </p>

      <h3>Polar form</h3>
      <p>
        Every nonzero complex number can be written in{" "}
        <strong>polar form</strong>:
      </p>
      <BlockMath math="z = r(\cos\theta + i\sin\theta), \qquad r = |z|,\;\; \theta = \arg z." />
      <p>
        Here <InlineMath math="\theta" /> is the angle from the positive
        real axis (the <em>argument</em>). Multiplication in polar form
        is gorgeous: moduli multiply and arguments add.
      </p>
      <BlockMath math="(r_1 e^{i\theta_1})(r_2 e^{i\theta_2}) = r_1 r_2 \, e^{i(\theta_1 + \theta_2)}." />
      <p>
        That formula uses <strong>Euler's formula</strong>, which
        connects exponentials and trig:
      </p>
      <BlockMath math="e^{i\theta} = \cos\theta + i\sin\theta." />
      <p>
        We'll prove this rigorously in calculus (it falls out of Taylor
        series), but the geometric content is already useful: an
        exponential of a pure imaginary number is a point on the unit
        circle. Multiplying by{" "}
        <InlineMath math="e^{i\theta}" /> rotates a complex number by{" "}
        angle <InlineMath math="\theta" /> without changing its
        modulus. Quantum state evolution under a Hamiltonian{" "}
        <InlineMath math="H" /> is exactly this — every component of
        the state picks up a phase{" "}
        <InlineMath math="e^{-iEt/\hbar}" />, rotating in the complex
        plane.
      </p>

      <p>
        Setting <InlineMath math="\theta = \pi" /> in Euler's formula
        gives the most-cited equation in mathematics:
      </p>
      <BlockMath math="e^{i\pi} + 1 = 0," />
      <p>
        which packs the five most important constants of math into one
        line. Treat it as a flag-bearer rather than a deep result —
        it's a special case of Euler's formula at one specific angle.
      </p>

      <Exercise
        number="4.1"
        prompt={
          <>
            Compute <InlineMath math="(2 + 3i)(1 - i)" /> and find its
            modulus.
          </>
        }
      >
        <BlockMath math="(2 + 3i)(1 - i) = 2 - 2i + 3i - 3i^2 = 2 + i + 3 = 5 + i." />
        <p>
          Modulus: <InlineMath math="|5 + i| = \sqrt{25 + 1} = \sqrt{26}" />
          . As a sanity check,{" "}
          <InlineMath math="|2 + 3i| \cdot |1 - i| = \sqrt{13} \cdot \sqrt{2} = \sqrt{26}" />
          . Moduli multiply, just as polar form predicted. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Exponentials &amp; logarithms</h2>

      <p>
        An <strong>exponential function</strong> has the form{" "}
        <InlineMath math="f(x) = a^x" /> with base{" "}
        <InlineMath math="a > 0" />. Two algebraic identities to
        internalise:
      </p>
      <BlockMath math="a^{x + y} = a^x \cdot a^y, \qquad (a^x)^y = a^{xy}." />
      <p>
        These are the entire algebra of exponentials. Together they
        also imply <InlineMath math="a^{-x} = 1/a^x" /> and{" "}
        <InlineMath math="a^0 = 1" />.
      </p>

      <p>
        A <strong>logarithm</strong> is the inverse of an exponential.
        We define
      </p>
      <BlockMath math="\log_a y = x \;\;\Longleftrightarrow\;\; a^x = y." />
      <p>
        That is, <InlineMath math="\log_a y" /> asks "what exponent on{" "}
        <InlineMath math="a" /> produces <InlineMath math="y" />?". From
        the exponential identities above, the mirror identities for
        logs follow:
      </p>
      <BlockMath math="\log_a(xy) = \log_a x + \log_a y, \qquad \log_a(x^k) = k \log_a x." />
      <p>
        Logs convert <em>multiplication</em> into{" "}
        <em>addition</em>. That property is why slide rules worked, why
        log scales make exponential growth look linear, and why we use
        log-likelihoods in statistics.
      </p>

      <ExpLogIllustration />

      <h3>Change of base</h3>
      <p>
        Calculators give you <InlineMath math="\ln" /> and{" "}
        <InlineMath math="\log_{10}" />, but you sometimes want{" "}
        <InlineMath math="\log_a y" /> for some other base. Derivation:
        let <InlineMath math="x = \log_a y" />, so{" "}
        <InlineMath math="a^x = y" />. Take{" "}
        <InlineMath math="\ln" /> of both sides:{" "}
        <InlineMath math="x \ln a = \ln y" />, hence
      </p>
      <BlockMath math="\log_a y = \frac{\ln y}{\ln a}." />
      <p>
        Same derivation with any other "convenient" log gives the
        general identity{" "}
        <InlineMath math="\log_a y = \log_b y / \log_b a" />. The
        change-of-base formula is one identity; you only need to
        memorise it once.
      </p>

      <h3>Why <InlineMath math="e" /> matters</h3>
      <p>
        Of all bases, <InlineMath math="e \approx 2.71828" /> is special
        because it makes calculus self-consistent:
      </p>
      <BlockMath math="\frac{d}{dx} e^x = e^x." />
      <p>
        No other exponential has a derivative equal to itself. Every
        other property of <InlineMath math="e" /> — its appearance in
        compound interest, in the bell curve, in radioactive decay, in
        Euler's formula — follows from this single property.
      </p>

      <h3>Compound interest derivation of <InlineMath math="e" /></h3>
      <p>
        Start with $1 invested at 100% annual interest, compounded{" "}
        <InlineMath math="n" /> times per year. After one year you have
      </p>
      <BlockMath math="\left(1 + \frac{1}{n}\right)^n." />
      <p>
        Try a few values of <InlineMath math="n" />:
      </p>
      <ul>
        <li><InlineMath math="n = 1" />: 2.0 (simple annual interest).</li>
        <li><InlineMath math="n = 12" />: 2.6130 (monthly).</li>
        <li><InlineMath math="n = 365" />: 2.7146 (daily).</li>
        <li><InlineMath math="n = 8760" />: 2.7181 (hourly).</li>
      </ul>
      <p>
        The sequence climbs but appears to level off. As{" "}
        <InlineMath math="n \to \infty" />,
      </p>
      <BlockMath math="\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e." />
      <p>
        Continuous compounding gives <InlineMath math="e" />. That's the
        original definition by Bernoulli (1683), and it's the cleanest
        way to motivate where the number comes from before doing any
        calculus.
      </p>

      <h3>Log scales in the real world</h3>
      <p>
        When quantities span many orders of magnitude, plotting them on
        a log scale linearises the picture. Three you'll see:
      </p>
      <ul>
        <li>
          <strong>pH</strong> = <InlineMath math="-\log_{10}[\text{H}^+]" />.
          A pH of 4 is ten times more acidic than a pH of 5.
        </li>
        <li>
          <strong>Decibels</strong> =
          <InlineMath math="10 \log_{10}(P/P_0)" />. 60 dB is{" "}
          <InlineMath math="10^6" /> times the reference power.
        </li>
        <li>
          <strong>Richter magnitude</strong> for earthquakes — a
          base-10 log of seismic energy. A magnitude-7 earthquake
          releases <InlineMath math="\approx 32" /> times the energy
          of a magnitude-6, even though it's "one bigger."
        </li>
      </ul>

      <Exercise
        number="5.1"
        prompt={
          <>
            Solve for <InlineMath math="x" />:{" "}
            <InlineMath math="3 \cdot 2^x = 48" />.
          </>
        }
      >
        <p>
          Divide:{" "}
          <InlineMath math="2^x = 16 = 2^4" />, so{" "}
          <InlineMath math="x = 4" />. Or take{" "}
          <InlineMath math="\log_2" /> of both sides of the original:{" "}
          <InlineMath math="\log_2 3 + x = \log_2 48" />, hence{" "}
          <InlineMath math="x = \log_2 48 - \log_2 3 = \log_2 16 = 4" />. ∎
        </p>
      </Exercise>

      <Exercise
        number="5.2"
        prompt={
          <>
            How long does it take a population growing at 5% per year to
            double? (Solve <InlineMath math="1.05^t = 2" /> for{" "}
            <InlineMath math="t" />.)
          </>
        }
      >
        <p>
          Take the natural log of both sides:{" "}
          <InlineMath math="t \ln 1.05 = \ln 2" />, so{" "}
          <InlineMath math="t = \ln 2 / \ln 1.05" />. Numerically{" "}
          <InlineMath math="\ln 2 \approx 0.6931" /> and{" "}
          <InlineMath math="\ln 1.05 \approx 0.0488" />, giving{" "}
          <InlineMath math="t \approx 14.2" /> years.
        </p>
        <p>
          The "rule of 72" — divide 72 by the percentage rate — gives{" "}
          <InlineMath math="72 / 5 = 14.4" />, a quick mental
          approximation for moderate rates. The constant 72 is itself
          an approximation to{" "}
          <InlineMath math="100 \ln 2 \approx 69.3" />, rounded up for
          easier division.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters going forward</h2>

      <p>
        A short map of where the contents of this chapter reappear in
        later modules:
      </p>
      <ul>
        <li>
          <strong>Calculus</strong> uses these constantly. Derivatives
          of trig come from the unit-circle definition you saw above;
          integrals of <InlineMath math="e^{ax}" /> use the special
          property of <InlineMath math="e" />; partial fractions of
          rational functions use polynomial roots.
        </li>
        <li>
          <strong>Linear algebra</strong> diagonalises rotation matrices
          using complex eigenvalues of the form{" "}
          <InlineMath math="e^{\pm i\theta}" />. Complex numbers will
          stop being optional.
        </li>
        <li>
          <strong>Differential equations</strong> use{" "}
          <InlineMath math="e^{rt}" /> as a guess for nearly every
          first-pass solution. The characteristic-equation method is
          essentially "what <InlineMath math="r" /> values keep this
          self-consistent?".
        </li>
        <li>
          <strong>Quantum mechanics</strong> is{" "}
          <em>everywhere</em> in <InlineMath math="\mathbb{C}" />. State
          vectors are complex; phases are{" "}
          <InlineMath math="e^{i\theta}" />; the Born rule turns those
          phases into probabilities by taking modulus-squared. Without
          this chapter you can't even read the textbook on page 1.
        </li>
        <li>
          <strong>Quantum computing</strong> represents qubits as points
          on the Bloch sphere — a unit sphere in 3D, parameterised by
          two angles, with positions{" "}
          <InlineMath math="(\sin\theta \cos\phi, \sin\theta \sin\phi, \cos\theta)" />
          . The trig identities you just met are the engine that runs
          the visualisation.
        </li>
      </ul>

      <p>
        Don't skim past this chapter because it feels like high school.
        Every later module assumes you can compose functions, expand{" "}
        <InlineMath math="\sin(\alpha + \beta)" /> on demand, and
        reach for <InlineMath math="\ln" /> when something has{" "}
        <InlineMath math="x" /> in an exponent. The fluency you build
        here will determine how much energy is left for the genuinely
        new ideas in calculus and beyond.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widgets
// ════════════════════════════════════════════════════════════

// ────────────────────────────────────────────────────────────
// Widget: function transform with sliders
// ────────────────────────────────────────────────────────────

type BaseFn = "sin" | "x2" | "abs" | "exp";

const baseFnLabel: Record<BaseFn, string> = {
  sin: "\\sin x",
  x2: "x^2",
  abs: "|x|",
  exp: "e^{x/2}",
};

const baseFn: Record<BaseFn, (x: number) => number> = {
  sin: (x) => Math.sin(x),
  x2: (x) => x * x,
  abs: (x) => Math.abs(x),
  exp: (x) => Math.exp(x / 2),
};

function FunctionTransformWidget() {
  const [base, setBase] = useState<BaseFn>("sin");
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [h, setH] = useState(0);
  const [k, setK] = useState(0);

  const w = 360;
  const hh = 220;
  const xMin = -6,
    xMax = 6;
  const yMin = -4,
    yMax = 4;
  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * w;
  const sy = (y: number) => hh - ((y - yMin) / (yMax - yMin)) * hh;

  const samples = 240;
  const buildPath = (fn: (x: number) => number) => {
    const pts: string[] = [];
    let prevValid = false;
    for (let i = 0; i <= samples; i++) {
      const x = xMin + ((xMax - xMin) * i) / samples;
      const y = fn(x);
      if (!isFinite(y) || y < yMin - 4 || y > yMax + 4) {
        prevValid = false;
        continue;
      }
      const cmd = prevValid ? "L" : "M";
      pts.push(`${cmd}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`);
      prevValid = true;
    }
    return pts.join(" ");
  };

  const orig = buildPath((x) => baseFn[base](x));
  const transformed = buildPath((x) => a * baseFn[base](b * (x - h)) + k);

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs uppercase tracking-widest text-ink-500 self-center mr-1">
            Base
          </span>
          {(["sin", "x2", "abs", "exp"] as BaseFn[]).map((f) => (
            <button
              key={f}
              onClick={() => setBase(f)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                base === f
                  ? "border-accent-soft bg-ink-800 text-ink-50"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              <InlineMath math={`f(x) = ${baseFnLabel[f]}`} />
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${hh}`} className="w-full block">
            <line x1={0} y1={sy(0)} x2={w} y2={sy(0)} stroke="#2a2a37" />
            <line x1={sx(0)} y1={0} x2={sx(0)} y2={hh} stroke="#2a2a37" />
            {[-4, -2, 2, 4].map((g) => (
              <g key={`gx${g}`}>
                <line
                  x1={sx(g)}
                  y1={0}
                  x2={sx(g)}
                  y2={hh}
                  stroke="#1c1c28"
                  strokeWidth={0.5}
                />
              </g>
            ))}
            {[-2, 2].map((g) => (
              <g key={`gy${g}`}>
                <line
                  x1={0}
                  y1={sy(g)}
                  x2={w}
                  y2={sy(g)}
                  stroke="#1c1c28"
                  strokeWidth={0.5}
                />
              </g>
            ))}
            <path d={orig} fill="none" stroke="#22d3ee" strokeWidth={1.4} strokeOpacity={0.7} />
            <path d={transformed} fill="none" stroke="#a78bfa" strokeWidth={2} />
          </svg>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Slider label="a (vert. scale)" value={a} min={-3} max={3} step={0.1} onChange={setA} />
          <Slider label="b (horiz. scale)" value={b} min={-3} max={3} step={0.1} onChange={setB} />
          <Slider label="h (right shift)" value={h} min={-4} max={4} step={0.1} onChange={setH} />
          <Slider label="k (up shift)" value={k} min={-3} max={3} step={0.1} onChange={setK} />
        </div>

        <div className="text-center text-sm text-ink-300">
          <InlineMath
            math={`y = ${a.toFixed(1)} \\cdot ${baseFnLabel[base].replace(
              "x",
              `(${b.toFixed(1)}(x ${h >= 0 ? "-" : "+"} ${Math.abs(h).toFixed(1)}))`
            )} ${k >= 0 ? "+" : "-"} ${Math.abs(k).toFixed(1)}`}
          />
        </div>
      </div>
      <figcaption>
        Cyan: base function. Purple: transformed. Negative{" "}
        <InlineMath math="a" /> or <InlineMath math="b" /> reflect the
        curve.
      </figcaption>
    </figure>
  );
}

function Slider({
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
      <div className="flex items-baseline justify-between text-xs text-ink-400">
        <span>{label}</span>
        <span className="font-mono text-ink-200">{value.toFixed(1)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent-soft mt-1"
      />
    </label>
  );
}

// ────────────────────────────────────────────────────────────
// Widget: unit circle (drag the dot)
// ────────────────────────────────────────────────────────────

function UnitCircleWidget() {
  const [theta, setTheta] = useState(Math.PI / 6);
  const cx = 150;
  const cy = 150;
  const r = 110;

  const px = cx + r * Math.cos(theta);
  const py = cy - r * Math.sin(theta);

  const updateFromPoint = (x: number, y: number, target: SVGSVGElement) => {
    const rect = target.getBoundingClientRect();
    const dx = ((x - rect.left) / rect.width) * 300 - cx;
    const dy = -(((y - rect.top) / rect.height) * 300 - cy);
    let t = Math.atan2(dy, dx);
    if (t < 0) t += 2 * Math.PI;
    setTheta(t);
  };

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2">
        <div className="flex justify-center">
          <svg
            viewBox="0 0 300 300"
            className="w-full max-w-[320px] touch-none select-none"
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture?.(e.pointerId);
              updateFromPoint(e.clientX, e.clientY, e.currentTarget);
            }}
            onPointerMove={(e) => {
              if (e.buttons !== 0 || e.pointerType === "touch") {
                updateFromPoint(e.clientX, e.clientY, e.currentTarget);
              }
            }}
          >
            <line x1={20} y1={cy} x2={280} y2={cy} stroke="#2a2a37" />
            <line x1={cx} y1={20} x2={cx} y2={280} stroke="#2a2a37" />
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#404052" />
            <line x1={cx} y1={cy} x2={px} y2={cy} stroke="#22d3ee" strokeWidth={2} />
            <line x1={px} y1={cy} x2={px} y2={py} stroke="#a78bfa" strokeWidth={2} />
            <line x1={cx} y1={cy} x2={px} y2={py} stroke="#fef3c7" strokeWidth={1.5} strokeDasharray="3 3" />
            <path
              d={`M ${cx + 28} ${cy} A 28 28 0 0 ${
                theta > Math.PI ? 1 : 0
              } ${cx + 28 * Math.cos(theta)} ${cy - 28 * Math.sin(theta)}`}
              fill="none"
              stroke="#fef3c7"
              strokeWidth={1.2}
              strokeOpacity={0.6}
            />
            <text x={cx + 36} y={cy - 8} fill="#fef3c7" fontSize="11">
              θ
            </text>
            <circle cx={px} cy={py} r={7} fill="#a78bfa" />
            <text x={(cx + px) / 2} y={cy + 14} fill="#22d3ee" fontSize="11" textAnchor="middle">
              cos θ
            </text>
            <text x={px + 8} y={(cy + py) / 2 + 4} fill="#a78bfa" fontSize="11">
              sin θ
            </text>
          </svg>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center text-sm">
          <Stat label="θ (rad)" value={theta.toFixed(3)} />
          <Stat label="cos θ" value={Math.cos(theta).toFixed(3)} />
          <Stat label="sin θ" value={Math.sin(theta).toFixed(3)} />
        </div>
        <input
          type="range"
          min={0}
          max={Math.PI * 2}
          step={0.01}
          value={theta}
          onChange={(e) => setTheta(Number(e.target.value))}
          className="w-full accent-accent-soft mt-3"
          aria-label="Theta"
        />
      </div>
      <figcaption>
        The point is <InlineMath math="(\cos\theta, \sin\theta)" />. Drag
        it or use the slider; the identity{" "}
        <InlineMath math="\cos^2\theta + \sin^2\theta = 1" /> holds for
        every angle.
      </figcaption>
    </figure>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ink-800/60 border border-ink-800 py-2">
      <div className="text-[10px] uppercase tracking-widest text-ink-500">
        {label}
      </div>
      <div className="font-mono text-ink-100 mt-0.5">{value}</div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Static illustration: exp/log mirror
// ────────────────────────────────────────────────────────────

function ExpLogIllustration() {
  const w = 280;
  const hh = 200;
  const xMin = -3,
    xMax = 4;
  const yMin = -3,
    yMax = 4;
  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * w;
  const sy = (y: number) => hh - ((y - yMin) / (yMax - yMin)) * hh;

  const path = (fn: (x: number) => number) => {
    const pts: string[] = [];
    let prev = false;
    for (let i = 0; i <= 200; i++) {
      const x = xMin + ((xMax - xMin) * i) / 200;
      const y = fn(x);
      if (!isFinite(y) || y < yMin - 4 || y > yMax + 4) {
        prev = false;
        continue;
      }
      pts.push(`${prev ? "L" : "M"}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`);
      prev = true;
    }
    return pts.join(" ");
  };

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 flex justify-center">
        <svg viewBox={`0 0 ${w} ${hh}`} className="w-full max-w-md">
          <line x1={0} y1={sy(0)} x2={w} y2={sy(0)} stroke="#2a2a37" />
          <line x1={sx(0)} y1={0} x2={sx(0)} y2={hh} stroke="#2a2a37" />
          <line
            x1={sx(xMin)}
            y1={sy(xMin)}
            x2={sx(xMax)}
            y2={sy(xMax)}
            stroke="#404052"
            strokeDasharray="3 3"
          />
          <path d={path((x) => Math.exp(x))} fill="none" stroke="#a78bfa" strokeWidth={2} />
          <text x={sx(1.5)} y={sy(Math.exp(1.5)) - 6} fill="#a78bfa" fontSize="11">
            y = eˣ
          </text>
          <path
            d={path((x) => (x > 0 ? Math.log(x) : NaN))}
            fill="none"
            stroke="#22d3ee"
            strokeWidth={2}
          />
          <text x={sx(2.5)} y={sy(Math.log(2.5)) + 14} fill="#22d3ee" fontSize="11">
            y = ln x
          </text>
        </svg>
      </div>
      <figcaption>
        <InlineMath math="\ln x" /> is the reflection of{" "}
        <InlineMath math="e^x" /> across the line{" "}
        <InlineMath math="y = x" /> — that's what "inverse" looks like
        graphically.
      </figcaption>
    </figure>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "Replace $f(x)$ with $f(x - 2) + 3$. How does the graph move?",
    options: [
      "Left 2, down 3",
      "Right 2, up 3",
      "Right 2, down 3",
      "Left 2, up 3",
    ],
    correct: 1,
    explanation:
      "$f(x - h)$ shifts the graph right by $h$, and adding $k$ shifts it up by $k$. Horizontal shifts feel backward — the input has to be 2 larger to reproduce the old output.",
  },
  {
    prompt:
      "Which identity holds for every real $\\theta$?",
    options: [
      "$\\sin\\theta + \\cos\\theta = 1$",
      "$\\sin^2\\theta + \\cos^2\\theta = 1$",
      "$\\sin\\theta \\cdot \\cos\\theta = 1$",
      "$\\sin\\theta = \\cos\\theta$",
    ],
    correct: 1,
    explanation:
      "The Pythagorean identity follows from the unit-circle definition: $(\\cos\\theta, \\sin\\theta)$ lies on a circle of radius 1, so $\\cos^2 + \\sin^2 = 1$.",
  },
  {
    prompt:
      "The product $(2 + i)(3 - 2i)$ equals…",
    options: [
      "$8 + 7i$",
      "$8 - i$",
      "$6 - i$",
      "$8 - 7i$",
    ],
    correct: 1,
    explanation:
      "$(2 + i)(3 - 2i) = 6 - 4i + 3i - 2i^2 = 6 - i + 2 = 8 - i$. Note $i^2 = -1$ flips the sign of the last term.",
  },
  {
    prompt:
      "$\\log_a(xy)$ equals…",
    options: [
      "$\\log_a x \\cdot \\log_a y$",
      "$\\log_a x + \\log_a y$",
      "$\\log_a(x + y)$",
      "$a \\cdot \\log_a x \\cdot \\log_a y$",
    ],
    correct: 1,
    explanation:
      "Logs convert multiplication into addition: $\\log_a(xy) = \\log_a x + \\log_a y$. This is the mirror of $a^{x+y} = a^x \\cdot a^y$.",
  },
  {
    prompt:
      "Which property uniquely picks out $e$ as the 'natural' base for exponentials?",
    options: [
      "$e$ is irrational",
      "$\\frac{d}{dx} e^x = e^x$",
      "$e \\approx 2.718$",
      "$e^{i\\pi} = -1$",
    ],
    correct: 1,
    explanation:
      "Among all bases $a^x$, only $e^x$ has a derivative equal to itself. Every other property of $e$ — including Euler's identity in option D — is a consequence of this one.",
  },
];
