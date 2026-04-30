import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function MultiIntegralsBody() {
  return (
    <>
      <p>
        In single-variable calculus, an integral{" "}
        <InlineMath math="\int_a^b f(x)\,dx" /> is the limit of Riemann
        sums of rectangles — the area under a curve. In two and three
        dimensions, the same idea repeats with rectangles replaced by
        small squares (or boxes), and the geometry becomes
        <em>volume</em> instead of <em>area</em>. The mechanics are
        almost identical: chop the domain, sum the values weighted by
        sub-region size, take a limit. The new ideas in this chapter
        are <em>iterated integrals</em> (turning a 2D integral into
        two nested 1D ones), <em>Fubini's theorem</em> (saying that's
        legal), <em>polar / cylindrical / spherical</em> coordinates
        (the right system for a problem with rotational symmetry),
        and the <em>Jacobian</em> determinant (how the volume element
        changes when you change variables).
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.02 — Multivariable Calculus, lectures 16–24",
            author: "Prof. Denis Auroux (MIT OCW)",
            duration: "~10h",
            url: "https://ocw.mit.edu/courses/18-02-multivariable-calculus-fall-2007/",
            note: "Multiple integrals start around lecture 16.",
          },
          {
            title: "Khan Academy — Multivariable Integrals (Sanderson)",
            author: "Grant Sanderson for Khan Academy",
            duration: "~6h",
            url: "https://www.khanacademy.org/math/multivariable-calculus/integrating-multivariable-functions",
            note: "Strong intuition, especially for the change-of-variables formula.",
          },
          {
            title: "Stewart — Multivariable Calculus, ch. 15",
            author: "James Stewart",
            duration: "Reading",
            url: "https://www.stewartcalculus.com/",
            note: "Hundreds of worked problems on regions, polar / spherical, Jacobians.",
          },
          {
            title: "The Gaussian integral — 3Blue1Brown",
            author: "3Blue1Brown",
            duration: "12 min",
            url: "https://www.youtube.com/watch?v=cy8r7WSuT1I",
            note: "How $\\int e^{-x^2}\\,dx = \\sqrt{\\pi}$ falls out of polar coordinates. Beautiful application of this chapter.",
          },
          {
            title: "Apostol — Calculus Vol. II, chs. 10–11",
            author: "Tom Apostol",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Calculus_(Apostol)",
            note: "Rigorous version with full proofs of Fubini and the change-of-variables theorem.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Double integrals</h2>

      <p>
        Given a function <InlineMath math="f(x, y)" /> on a region{" "}
        <InlineMath math="R \subseteq \mathbb{R}^2" />, the{" "}
        <strong>double integral</strong> is
      </p>
      <BlockMath math="\iint_R f(x, y)\,dA = \lim_{n \to \infty} \sum_{i = 1}^{n} f(x_i^*, y_i^*) \, \Delta A_i," />
      <p>
        where <InlineMath math="R" /> has been partitioned into{" "}
        <InlineMath math="n" /> small pieces of area{" "}
        <InlineMath math="\Delta A_i" />, and{" "}
        <InlineMath math="(x_i^*, y_i^*)" /> is a sample point in each
        piece. <InlineMath math="dA" /> is the "area element" — for
        rectangular partitions it's <InlineMath math="dx\,dy" />.
      </p>
      <p>
        Geometrically, when <InlineMath math="f \geq 0" />, the double
        integral is the <strong>volume</strong> under the surface{" "}
        <InlineMath math="z = f(x, y)" /> over the region{" "}
        <InlineMath math="R" />. When <InlineMath math="f" /> is
        signed, it's signed volume (above the plane minus below).
        Other interpretations:
      </p>
      <ul>
        <li>
          If <InlineMath math="\rho(x, y)" /> is a mass density,{" "}
          <InlineMath math="\iint_R \rho\,dA" /> is the total mass on{" "}
          <InlineMath math="R" />.
        </li>
        <li>
          If <InlineMath math="p(x, y)" /> is a probability density,{" "}
          <InlineMath math="\iint_R p\,dA" /> is the probability of
          landing in <InlineMath math="R" />.
        </li>
        <li>
          If <InlineMath math="f \equiv 1" />, the integral is just the
          area of <InlineMath math="R" />.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Iterated integrals &amp; Fubini's theorem</h2>

      <p>
        Computing a double integral from the limit definition is
        unworkable in practice. The fix is{" "}
        <strong>Fubini's theorem</strong>: under reasonable hypotheses
        (continuity of <InlineMath math="f" />, region bounded), a
        double integral equals an iterated integral — two single
        integrals nested.
      </p>

      <Callout title="Fubini's theorem (rectangle case)">
        For continuous <InlineMath math="f" /> on{" "}
        <InlineMath math="R = [a, b] \times [c, d]" />:
        <BlockMath math="\iint_R f\,dA = \int_a^b \int_c^d f(x, y)\,dy\,dx = \int_c^d \int_a^b f(x, y)\,dx\,dy." />
      </Callout>

      <p>
        Both orders give the same answer; pick whichever is easier.
        For a rectangle of integration, the limits are constants. For
        a more general region, the inner limits become functions of
        the outer variable.
      </p>

      <h3>Worked example: rectangle</h3>
      <p>
        Compute{" "}
        <InlineMath math="\displaystyle \iint_R xy\,dA" /> over{" "}
        <InlineMath math="R = [0, 2] \times [0, 3]" />.
      </p>
      <BlockMath math="\int_0^2 \int_0^3 xy\,dy\,dx = \int_0^2 x \cdot \left[\tfrac{y^2}{2}\right]_0^3 dx = \int_0^2 x \cdot \tfrac{9}{2}\,dx = \tfrac{9}{2} \cdot \tfrac{x^2}{2}\Big|_0^2 = 9." />

      <h3>Type I and Type II regions</h3>
      <p>
        For non-rectangular regions, two patterns dominate:
      </p>
      <ul>
        <li>
          <strong>Type I</strong> (vertical slices):{" "}
          <InlineMath math="R = \{(x, y) : a \leq x \leq b,\, g_1(x) \leq y \leq g_2(x)\}" />.
          Outer integral over <InlineMath math="x" />, inner over{" "}
          <InlineMath math="y" /> from{" "}
          <InlineMath math="g_1(x)" /> to <InlineMath math="g_2(x)" />.
        </li>
        <li>
          <strong>Type II</strong> (horizontal slices):{" "}
          <InlineMath math="R = \{(x, y) : c \leq y \leq d,\, h_1(y) \leq x \leq h_2(y)\}" />.
          Outer integral over <InlineMath math="y" />, inner over{" "}
          <InlineMath math="x" />.
        </li>
      </ul>

      <p>
        Many regions admit both descriptions, and you may need to
        switch between them ("change the order of integration") if
        one orientation is intractable. Always sketch the region — it
        prevents errors in the limits.
      </p>

      <Exercise
        number="2.1"
        prompt={
          <>
            Compute{" "}
            <InlineMath math="\displaystyle \iint_R 6xy\,dA" /> over the
            triangle <InlineMath math="R" /> with vertices{" "}
            <InlineMath math="(0, 0), (1, 0), (1, 1)" />.
          </>
        }
      >
        <p>
          Type I:{" "}
          <InlineMath math="0 \leq x \leq 1" />,{" "}
          <InlineMath math="0 \leq y \leq x" /> (the line from (0,0) to
          (1,1) is <InlineMath math="y = x" />).
        </p>
        <BlockMath math="\int_0^1 \int_0^x 6xy\,dy\,dx = \int_0^1 6x \cdot \tfrac{x^2}{2}\,dx = \int_0^1 3x^3\,dx = \tfrac{3}{4}." />
      </Exercise>

      <Pitfall>
        Sketch the region first. Limits-of-integration errors are
        the most common source of mistakes in multiple integrals,
        especially when changing the order. The order matters for
        the limits, not the value.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Polar coordinates</h2>

      <p>
        For circular regions, Cartesian coordinates make the limits
        ugly. Polar coordinates clean them up:
      </p>
      <BlockMath math="x = r \cos\theta, \qquad y = r \sin\theta, \qquad r \geq 0, \;\; \theta \in [0, 2\pi)." />
      <p>
        The area element is <em>not</em>{" "}
        <InlineMath math="dr\,d\theta" />. A small "rectangle" in
        polar coordinates with sides <InlineMath math="dr" /> and{" "}
        <InlineMath math="d\theta" /> has area
      </p>
      <BlockMath math="dA = r\,dr\,d\theta." />
      <p>
        The extra <InlineMath math="r" /> is because a wedge at radius{" "}
        <InlineMath math="r" /> with angular width{" "}
        <InlineMath math="d\theta" /> has arc-length{" "}
        <InlineMath math="r\,d\theta" />, hence area{" "}
        <InlineMath math="r\,d\theta \cdot dr" />. Forgetting it is
        the most common polar-coordinates error.
      </p>

      <Callout title="Try it">
        Compare a Cartesian grid (rectangles of constant{" "}
        <InlineMath math="dx\,dy" />) with a polar grid (annular
        wedges, with area growing as <InlineMath math="r" /> grows).
        Polar is the right tool whenever circles are easy and squares
        are hard.
      </Callout>

      <PolarVsCartesianWidget />

      <h3>Worked example: the Gaussian integral</h3>
      <p>
        The integral{" "}
        <InlineMath math="\displaystyle \int_{-\infty}^{\infty} e^{-x^2}\,dx" />{" "}
        has no elementary antiderivative — but its <em>square</em>{" "}
        does. Watch:
      </p>
      <BlockMath math="I^2 = \left(\int_{-\infty}^{\infty} e^{-x^2}\,dx\right)\!\left(\int_{-\infty}^{\infty} e^{-y^2}\,dy\right) = \iint_{\mathbb{R}^2} e^{-(x^2 + y^2)}\,dA." />
      <p>
        Switch to polar:{" "}
        <InlineMath math="x^2 + y^2 = r^2" />,{" "}
        <InlineMath math="dA = r\,dr\,d\theta" />.
      </p>
      <BlockMath math="I^2 = \int_0^{2\pi} \int_0^{\infty} e^{-r^2} r\,dr\,d\theta = 2\pi \cdot \tfrac{1}{2} = \pi." />
      <p>
        Therefore <InlineMath math="I = \sqrt\pi" />. The
        single-variable problem was hard because no antiderivative
        exists; the 2D version was easy because polar coordinates made
        the substitution <InlineMath math="u = r^2" /> work. Same
        function, different coordinates, completely different
        difficulty.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Triple integrals</h2>

      <p>
        Same idea in 3D:
      </p>
      <BlockMath math="\iiint_V f(x, y, z)\,dV = \lim_{n \to \infty} \sum_i f(x_i^*, y_i^*, z_i^*) \, \Delta V_i." />

      <p>
        Iterated as a triple-nested integral:
      </p>
      <BlockMath math="\iiint_V f\,dV = \int \int \int f\,dx\,dy\,dz" />
      <p>
        in some order, with limits chosen to describe{" "}
        <InlineMath math="V" />.
      </p>

      <p>
        Interpretations: total mass for density{" "}
        <InlineMath math="\rho" />, total charge for charge density,{" "}
        moments of inertia, expectations under joint probability
        distributions.
      </p>

      <h3>Cylindrical coordinates</h3>
      <p>
        For solids with rotational symmetry around the{" "}
        <InlineMath math="z" />-axis. Polar in{" "}
        <InlineMath math="(x, y)" /> plus regular{" "}
        <InlineMath math="z" />:
      </p>
      <BlockMath math="x = r\cos\theta, \;\; y = r\sin\theta, \;\; z = z, \qquad dV = r\,dr\,d\theta\,dz." />

      <h3>Spherical coordinates</h3>
      <p>
        For solids with point symmetry — anything centred at the
        origin. Two angles plus a radius:
      </p>
      <BlockMath math="x = \rho \sin\varphi \cos\theta, \;\; y = \rho \sin\varphi \sin\theta, \;\; z = \rho \cos\varphi," />
      <p>
        with{" "}
        <InlineMath math="\rho \geq 0,\;\; \varphi \in [0, \pi],\;\; \theta \in [0, 2\pi)" />.
        Conventions vary across physics and mathematics — physicists
        often swap <InlineMath math="\varphi" /> and{" "}
        <InlineMath math="\theta" /> labels — so always check.
      </p>
      <p>
        The volume element:
      </p>
      <BlockMath math="dV = \rho^2 \sin\varphi\,d\rho\,d\varphi\,d\theta." />

      <p>
        That <InlineMath math="\rho^2 \sin\varphi" /> factor matters
        whenever you compute volumes, masses, or expectations of
        spherically-symmetric distributions. The volume of a unit
        ball, for instance:
      </p>
      <BlockMath math="V = \int_0^{2\pi}\int_0^{\pi}\int_0^1 \rho^2 \sin\varphi\,d\rho\,d\varphi\,d\theta = \tfrac{4}{3}\pi." />

      <Pitfall>
        The volume element in non-Cartesian systems always carries an
        extra factor: <InlineMath math="r" /> in cylindrical /
        polar, <InlineMath math="\rho^2 \sin\varphi" /> in spherical.
        Forgetting them is the single most common error in physics-
        adjacent integrals. The factors come from the Jacobian
        determinant of the coordinate change (Part 5).
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Change of variables &amp; the Jacobian</h2>

      <p>
        We've seen specific factors (
        <InlineMath math="r" />, <InlineMath math="\rho^2 \sin\varphi" />)
        appear when changing coordinates. Where do they come from?
        From the <strong>Jacobian determinant</strong>.
      </p>
      <p>
        Suppose <InlineMath math="(x, y) = T(u, v)" /> is a smooth
        invertible map from{" "}
        <InlineMath math="(u, v)" />-coordinates to{" "}
        <InlineMath math="(x, y)" />-coordinates. The Jacobian matrix
        is the matrix of partials:
      </p>
      <BlockMath math="J = \frac{\partial(x, y)}{\partial(u, v)} = \begin{pmatrix} \partial x/\partial u & \partial x/\partial v \\ \partial y/\partial u & \partial y/\partial v \end{pmatrix}." />
      <p>
        Its <em>determinant</em>{" "}
        <InlineMath math="\det J" /> is the local area-scaling factor of{" "}
        <InlineMath math="T" /> — exactly as you saw in the linear-
        algebra chapter, where determinants measure how a linear map
        scales area.
      </p>

      <Callout title="Change of variables (2D)">
        For continuous <InlineMath math="f" /> and a smooth
        bijection <InlineMath math="(x, y) = T(u, v)" />,
        <BlockMath math="\iint_R f(x, y)\,dx\,dy = \iint_{T^{-1}(R)} f(T(u, v)) \, |\det J|\,du\,dv." />
      </Callout>

      <p>
        The 3D version is identical with a 3×3 Jacobian. This is the
        higher-dimensional cousin of <InlineMath math="u" />-
        substitution — the Jacobian determinant plays the role of the{" "}
        <InlineMath math="du/dx" /> factor.
      </p>

      <h3>Verifying the polar / spherical factors</h3>
      <p>
        Polar map <InlineMath math="T(r, \theta) = (r\cos\theta, r\sin\theta)" />:
      </p>
      <BlockMath math="J = \begin{pmatrix} \cos\theta & -r\sin\theta \\ \sin\theta & r\cos\theta \end{pmatrix}, \quad \det J = r\cos^2\theta + r\sin^2\theta = r." />
      <p>
        Hence <InlineMath math="dA = |r|\,dr\,d\theta = r\,dr\,d\theta" />{" "}
        (since <InlineMath math="r \geq 0" />). Same exercise for the
        3×3 spherical Jacobian gives{" "}
        <InlineMath math="\rho^2 \sin\varphi" />. The factors aren't
        magic; they're the Jacobian.
      </p>

      <Exercise
        number="5.1"
        prompt={
          <>
            Compute the area of the ellipse{" "}
            <InlineMath math="\{(x, y) : x^2/a^2 + y^2/b^2 \leq 1\}" />.
          </>
        }
      >
        <p>
          Substitute <InlineMath math="x = a u" />,{" "}
          <InlineMath math="y = b v" />. Jacobian matrix is{" "}
          <InlineMath math="\operatorname{diag}(a, b)" /> with
          determinant <InlineMath math="ab" />. The ellipse maps to the
          unit disc <InlineMath math="u^2 + v^2 \leq 1" />.
        </p>
        <BlockMath math="\text{Area} = \iint_{ellipse} 1\,dA = \iint_{u^2+v^2 \leq 1} ab\,du\,dv = ab \cdot \pi = \pi a b." />
        <p>
          Sanity: <InlineMath math="a = b = 1" /> recovers a unit
          circle of area <InlineMath math="\pi" /> ✓. Stretching by{" "}
          <InlineMath math="a" /> and <InlineMath math="b" /> scales
          area by <InlineMath math="ab" /> — exactly what determinants
          said.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Probability.</strong> Joint distributions of
          continuous random variables are described by densities{" "}
          <InlineMath math="p(x_1, \dots, x_n)" /> integrating to 1.
          Marginals, expectations, conditional probabilities are all
          multiple integrals. The Gaussian on{" "}
          <InlineMath math="\mathbb{R}^n" /> is the most-used
          distribution in statistics; its density involves precisely
          the polar-coordinate trick from Part 3.
        </li>
        <li>
          <strong>Physics.</strong> Mass, charge, dipole moment,
          moment of inertia, electric flux — all multiple integrals.
          Gauss's law in electromagnetism uses surface integrals (
          coming next chapter), which sit on top of the same machinery.
        </li>
        <li>
          <strong>Quantum mechanics.</strong> The expectation value
          of an observable <InlineMath math="\hat O" /> in a state{" "}
          <InlineMath math="\psi" /> on{" "}
          <InlineMath math="\mathbb{R}^3" /> is{" "}
          <InlineMath math="\int_{\mathbb{R}^3} \overline{\psi(\mathbf r)}\,(\hat O \psi)(\mathbf r)\,dV" />.
          Spherical coordinates dominate here because most quantum
          systems (atoms, molecules) have rotational symmetry.
        </li>
        <li>
          <strong>Computer graphics &amp; rendering.</strong> Volumes,
          ray-marching, rendering equations — all built on multiple
          integrals over surfaces and volumes. Monte Carlo
          integration sidesteps doing them analytically by sampling.
        </li>
      </ul>

      <p>
        Final chapter of multivariable calculus, next: vector fields,
        line and surface integrals, the divergence and curl operators,
        and the great unifying theorems (Green, Stokes, Gauss). Those
        are essentially "the fundamental theorem of calculus,
        generalised" — they relate integrals over a region to
        integrals over its boundary.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: Polar vs Cartesian grids
// ════════════════════════════════════════════════════════════

function PolarVsCartesianWidget() {
  const [mode, setMode] = useState<"cart" | "polar">("polar");
  const w = 320;
  const h = 320;
  const cx = w / 2;
  const cy = h / 2;
  const R = 130;

  const cartCells: { x: number; y: number; w: number; h: number }[] = [];
  if (mode === "cart") {
    const N = 12;
    const cw = (R * 2) / N;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const x0 = -R + i * cw;
        const y0 = -R + j * cw;
        // include only cells whose center is within unit disc
        const cxC = x0 + cw / 2;
        const cyC = y0 + cw / 2;
        if (cxC * cxC + cyC * cyC < R * R) {
          cartCells.push({ x: x0, y: y0, w: cw, h: cw });
        }
      }
    }
  }

  const polarCells: { d: string; r: number }[] = [];
  if (mode === "polar") {
    const Nr = 6;
    const Nt = 16;
    for (let i = 0; i < Nr; i++) {
      const r1 = (R * i) / Nr;
      const r2 = (R * (i + 1)) / Nr;
      for (let j = 0; j < Nt; j++) {
        const t1 = (j * Math.PI * 2) / Nt;
        const t2 = ((j + 1) * Math.PI * 2) / Nt;
        const ax = r1 * Math.cos(t1);
        const ay = r1 * Math.sin(t1);
        const bx = r2 * Math.cos(t1);
        const by = r2 * Math.sin(t1);
        const cxc = r2 * Math.cos(t2);
        const cyc = r2 * Math.sin(t2);
        const dx = r1 * Math.cos(t2);
        const dy = r1 * Math.sin(t2);
        polarCells.push({
          d: `M ${ax},${ay} L ${bx},${by} A ${r2},${r2} 0 0 1 ${cxc},${cyc} L ${dx},${dy} A ${r1},${r1} 0 0 0 ${ax},${ay} Z`,
          r: (r1 + r2) / 2,
        });
      }
    }
  }

  const sx = (x: number) => cx + x;
  const sy = (y: number) => cy - y;

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setMode("cart")}
            className={`px-3 py-1.5 rounded-lg text-sm border transition ${
              mode === "cart"
                ? "border-accent-soft bg-ink-800 text-white"
                : "border-ink-800 hover:border-ink-700 text-ink-300"
            }`}
          >
            Cartesian (dx · dy)
          </button>
          <button
            onClick={() => setMode("polar")}
            className={`px-3 py-1.5 rounded-lg text-sm border transition ${
              mode === "polar"
                ? "border-accent-soft bg-ink-800 text-white"
                : "border-ink-800 hover:border-ink-700 text-ink-300"
            }`}
          >
            Polar (r · dr · dθ)
          </button>
        </div>

        <div className="flex justify-center">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md">
            <circle cx={cx} cy={cy} r={R} fill="rgba(167,139,250,0.06)" stroke="#404052" strokeWidth={1} />

            {mode === "cart" &&
              cartCells.map((c, i) => (
                <rect
                  key={i}
                  x={sx(c.x)}
                  y={sy(c.y) - c.h}
                  width={c.w}
                  height={c.h}
                  fill="#a78bfa"
                  fillOpacity={0.18}
                  stroke="#a78bfa"
                  strokeOpacity={0.4}
                  strokeWidth={0.5}
                  transform={`translate(${cx - sx(c.x) + sx(c.x)}, 0)`}
                />
              ))}

            {mode === "cart" &&
              cartCells.map((c, i) => (
                <rect
                  key={`c2-${i}`}
                  x={sx(c.x)}
                  y={sy(c.y + c.h)}
                  width={c.w}
                  height={c.h}
                  fill="#a78bfa"
                  fillOpacity={0.18}
                  stroke="#a78bfa"
                  strokeOpacity={0.4}
                  strokeWidth={0.5}
                />
              ))}

            {mode === "polar" &&
              polarCells.map((c, i) => (
                <path
                  key={i}
                  d={c.d}
                  fill="#a78bfa"
                  fillOpacity={0.05 + 0.25 * (c.r / R)}
                  stroke="#a78bfa"
                  strokeOpacity={0.5}
                  strokeWidth={0.5}
                  transform={`translate(${cx} ${cy}) scale(1 -1)`}
                />
              ))}

            <line x1={0} y1={cy} x2={w} y2={cy} stroke="#2a2a37" strokeWidth={0.5} />
            <line x1={cx} y1={0} x2={cx} y2={h} stroke="#2a2a37" strokeWidth={0.5} />
          </svg>
        </div>

        <p className="text-sm text-ink-300">
          {mode === "cart"
            ? "Cartesian: every cell has the same area dx·dy. The boundary doesn't fit cleanly — corners and gaps."
            : "Polar: cells at larger r have larger arc length, so dA = r·dr·dθ — that's why r appears in the area element. Polar cells fit a circle perfectly."}
        </p>
      </div>
      <figcaption>
        Two coordinate systems for the same region (a disc). Polar's
        area element grows with <InlineMath math="r" /> — the cells
        further from the origin are larger, accounting for the{" "}
        <InlineMath math="r" /> in <InlineMath math="dA = r\,dr\,d\theta" />.
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
      "Compute $\\displaystyle \\int_0^1 \\int_0^2 (x + y)\\,dx\\,dy$.",
    options: ["$2$", "$3$", "$4$", "$6$"],
    correct: 1,
    explanation:
      "Inner: $\\int_0^2 (x + y)\\,dx = [x^2/2 + xy]_0^2 = 2 + 2y$. Outer: $\\int_0^1 (2 + 2y)\\,dy = 2 + 1 = 3$.",
  },
  {
    prompt:
      "In polar coordinates, $dA$ equals…",
    options: [
      "$dr\\,d\\theta$",
      "$r\\,dr\\,d\\theta$",
      "$r^2\\,dr\\,d\\theta$",
      "$dx\\,dy$",
    ],
    correct: 1,
    explanation:
      "The factor $r$ comes from the Jacobian of the polar map. A wedge of width $d\\theta$ at radius $r$ has arc length $r\\,d\\theta$, so its area is $r\\,dr\\,d\\theta$.",
  },
  {
    prompt:
      "$\\displaystyle \\iint_R 1\\,dA$ for any region $R$ equals…",
    options: [
      "the volume above $R$",
      "the area of $R$",
      "the perimeter of $R$",
      "always zero",
    ],
    correct: 1,
    explanation:
      "Integrating the constant 1 over a region gives its area in 2D (or its volume in 3D for a triple integral).",
  },
  {
    prompt:
      "In spherical coordinates the volume element is…",
    options: [
      "$\\rho\\,d\\rho\\,d\\varphi\\,d\\theta$",
      "$\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$",
      "$\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$",
      "$d\\rho\\,d\\varphi\\,d\\theta$",
    ],
    correct: 1,
    explanation:
      "$dV = \\rho^2 \\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$. The $\\rho^2$ comes from the radial scaling, the $\\sin\\varphi$ from the polar-angle scaling.",
  },
  {
    prompt:
      "By the change-of-variables theorem, $\\iint f(x, y)\\,dx\\,dy$ becomes $\\iint f(T(u,v)) \\cdot |\\,?\\,| \\,du\\,dv$. The missing factor is…",
    options: [
      "the Jacobian matrix $J$",
      "the determinant of the Jacobian, $\\det J$",
      "$T(u, v)$ itself",
      "$\\nabla T$",
    ],
    correct: 1,
    explanation:
      "The (absolute value of the) Jacobian determinant is the local area-scaling factor of $T$, exactly what you need to convert the area element.",
  },
];
