import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function ComplexNumbersBody() {
  return (
    <>
      <p>
        Complex analysis is the calculus of functions whose inputs and
        outputs are complex numbers. It looks like a small generalisation
        of single-variable calculus — replace{" "}
        <InlineMath math="\mathbb{R}" /> with{" "}
        <InlineMath math="\mathbb{C}" />, do the same arithmetic — but
        the results are dramatically richer. <em>Complex differentiable</em>{" "}
        is a much stronger condition than real differentiable, and it
        forces such rigidity that complex differentiable functions look
        almost magical: they're infinitely differentiable, equal to their
        Taylor series, and uniquely determined by values on tiny sets.
      </p>
      <p>
        This module culminates in two payoffs: closed-form evaluation of
        nasty real integrals via <em>residue calculus</em>, and the
        complex-analytic foundation of the Fourier transform that powers
        signal processing, quantum mechanics, and (next module) Fourier-
        based analysis. We start with complex numbers themselves —
        reviewed from Pre-Calc, then deepened.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.04 — Complex Variables with Applications",
            author: "Prof. Jeremy Orloff (MIT OCW)",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/18-04-complex-variables-with-applications-spring-2018/",
            note: "MIT's intro complex analysis course. Lecture notes are exceptionally clear.",
          },
          {
            title: "3Blue1Brown — Visualizing complex multiplication",
            author: "3Blue1Brown",
            duration: "~25 min",
            url: "https://www.youtube.com/watch?v=mvmuCPvRoWQ",
            note: "Beautiful visual approach to complex multiplication and rotation.",
          },
          {
            title: "Visual Complex Analysis",
            author: "Tristan Needham",
            duration: "Reading",
            url: "https://www.amazon.com/Visual-Complex-Analysis-25th-Anniversary/dp/0192868926",
            note: "The most geometric introduction to complex analysis ever written. Highly recommended.",
          },
          {
            title: "Complex Analysis (Stein & Shakarchi)",
            author: "Stein / Shakarchi",
            duration: "Reading",
            url: "https://press.princeton.edu/books/hardcover/9780691113852/complex-analysis",
            note: "Princeton lecture series. Modern, rigorous, but readable.",
          },
          {
            title: "Riemann zeta and the Riemann hypothesis (3Blue1Brown)",
            author: "3Blue1Brown",
            duration: "22 min",
            url: "https://www.youtube.com/watch?v=sD0NjbwqlYw",
            note: "A taste of where complex analysis leads. Pair with Tier VIII end-of-module.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The complex plane</h2>

      <p>
        Quick recap from Pre-Calc. A <strong>complex number</strong> is{" "}
        <InlineMath math="z = x + iy" /> with{" "}
        <InlineMath math="x, y \in \mathbb{R}" /> and{" "}
        <InlineMath math="i^2 = -1" />. The <strong>real part</strong>{" "}
        is <InlineMath math="\operatorname{Re}(z) = x" />; the{" "}
        <strong>imaginary part</strong>{" "}
        <InlineMath math="\operatorname{Im}(z) = y" /> is also a real
        number.
      </p>

      <p>
        Each complex number corresponds to a point{" "}
        <InlineMath math="(x, y)" /> in the plane —{" "}
        <strong>the complex plane</strong>. The <InlineMath math="x" />{" "}
        -axis is the real line; the <InlineMath math="y" />-axis is the
        imaginary axis. Addition is vector addition; multiplication is
        more interesting.
      </p>

      <h3>Modulus and argument</h3>
      <p>
        The <strong>modulus</strong>{" "}
        <InlineMath math="|z| = \sqrt{x^2 + y^2}" /> is the distance from
        the origin. The <strong>argument</strong>{" "}
        <InlineMath math="\arg(z) = \theta" /> is the angle from the
        positive real axis (counter-clockwise, in radians, defined mod{" "}
        <InlineMath math="2\pi" />). The polar form:
      </p>
      <BlockMath math="z = r(\cos\theta + i\sin\theta), \quad r = |z|, \;\; \theta = \arg z." />

      <p>
        The <strong>complex conjugate</strong>{" "}
        <InlineMath math="\bar z = x - iy" /> reflects across the real
        axis. Useful identities:
      </p>
      <ul>
        <li>
          <InlineMath math="z \bar z = |z|^2" />.
        </li>
        <li>
          <InlineMath math="\operatorname{Re}(z) = (z + \bar z)/2" />,{" "}
          <InlineMath math="\operatorname{Im}(z) = (z - \bar z)/(2i)" />.
        </li>
        <li>
          <InlineMath math="\overline{z + w} = \bar z + \bar w" />,{" "}
          <InlineMath math="\overline{zw} = \bar z \bar w" />.
        </li>
        <li>
          <InlineMath math="1/z = \bar z / |z|^2" /> (rationalise the
          denominator by multiplying by{" "}
          <InlineMath math="\bar z / \bar z" />).
        </li>
      </ul>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Euler's formula and polar multiplication</h2>

      <p>
        We met Euler's formula in Pre-Calc and proved it from Taylor
        series in the Calculus / Series chapter:
      </p>
      <BlockMath math="e^{i\theta} = \cos\theta + i\sin\theta." />

      <p>
        With this, polar form becomes
      </p>
      <BlockMath math="z = r e^{i\theta}." />

      <p>
        Multiplication of complex numbers in polar form is gorgeous —{" "}
        <em>moduli multiply, arguments add</em>:
      </p>
      <BlockMath math="(r_1 e^{i\theta_1})(r_2 e^{i\theta_2}) = r_1 r_2 \, e^{i(\theta_1 + \theta_2)}." />

      <p>
        Geometrically, multiplying by{" "}
        <InlineMath math="z = r e^{i\theta}" /> scales by{" "}
        <InlineMath math="r" /> and rotates by{" "}
        <InlineMath math="\theta" />. Multiplication by{" "}
        <InlineMath math="i" /> is a 90° rotation. Multiplication by{" "}
        <InlineMath math="-1" /> is 180°. Multiplication by{" "}
        <InlineMath math="e^{i\pi/4}" /> is 45°.
      </p>

      <Callout title="Try it">
        Drag <InlineMath math="z" /> in the complex plane and see{" "}
        <InlineMath math="z^2" />, <InlineMath math="z^3" />, and{" "}
        <InlineMath math="e^z" /> live. Note how{" "}
        <InlineMath math="z^n" /> doubles/triples the argument and
        powers the modulus.
      </Callout>

      <ComplexPlaneWidget />

      <h3>De Moivre's theorem</h3>

      <p>
        Powers in polar form follow trivially:
      </p>
      <BlockMath math="z^n = r^n e^{i n \theta} = r^n (\cos n\theta + i \sin n\theta)." />

      <p>
        Setting <InlineMath math="r = 1" />:
      </p>
      <BlockMath math="(\cos\theta + i\sin\theta)^n = \cos n\theta + i \sin n\theta." />
      <p>
        — <strong>De Moivre's theorem</strong>. Expand the left side by
        the binomial theorem and match real / imaginary parts to derive
        identities like{" "}
        <InlineMath math="\cos 3\theta = 4\cos^3\theta - 3\cos\theta" />{" "}
        almost mechanically.
      </p>

      <h3>Roots of unity</h3>

      <p>
        For any positive integer <InlineMath math="n" />, the equation{" "}
        <InlineMath math="z^n = 1" /> has exactly <InlineMath math="n" />{" "}
        complex solutions, the <strong>n-th roots of unity</strong>:
      </p>
      <BlockMath math="\omega_k = e^{2\pi i k / n} \quad\text{for}\quad k = 0, 1, \dots, n - 1." />

      <p>
        They sit at the vertices of a regular <InlineMath math="n" />
        -gon inscribed in the unit circle, with one vertex at{" "}
        <InlineMath math="z = 1" />. The cube roots: 1,{" "}
        <InlineMath math="-1/2 + i\sqrt 3/2" />,{" "}
        <InlineMath math="-1/2 - i\sqrt 3/2" /> — corners of an
        equilateral triangle.
      </p>

      <p>
        Roots of unity show up in: discrete Fourier transforms (the FFT
        evaluates a polynomial at roots of unity), error-correcting
        codes (Reed–Solomon, BCH), and quantum algorithms (the Quantum
        Fourier Transform builds on them). Surprising power for such a
        simple object.
      </p>

      <Exercise
        number="2.1"
        prompt={
          <>
            Find all solutions of <InlineMath math="z^4 = -16" />.
          </>
        }
      >
        <p>
          Polar form of right side:{" "}
          <InlineMath math="-16 = 16 e^{i\pi}" />. Solutions:{" "}
          <InlineMath math="z = 16^{1/4} e^{i(\pi + 2\pi k)/4}" /> for{" "}
          <InlineMath math="k = 0, 1, 2, 3" />. So{" "}
          <InlineMath math="r = 2" />, arguments{" "}
          <InlineMath math="\pi/4, 3\pi/4, 5\pi/4, 7\pi/4" />.
          Equivalently, in Cartesian:{" "}
          <InlineMath math="\sqrt 2 \pm i\sqrt 2" /> and{" "}
          <InlineMath math="-\sqrt 2 \pm i\sqrt 2" />. ∎
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Functions of a complex variable</h2>

      <p>
        A function <InlineMath math="f : \mathbb{C} \to \mathbb{C}" />{" "}
        sends a complex number to a complex number. We can write{" "}
        <InlineMath math="f(z) = u(x, y) + i v(x, y)" /> with real-
        valued <InlineMath math="u, v" /> — so a complex function is{" "}
        equivalent to a pair of real functions of two real variables.
      </p>

      <h3>Examples</h3>
      <ul>
        <li>
          <strong>Polynomials</strong>{" "}
          <InlineMath math="p(z) = a_n z^n + \cdots + a_1 z + a_0" />.
          Defined for all <InlineMath math="z" />.
        </li>
        <li>
          <strong>Rational functions</strong>{" "}
          <InlineMath math="p(z)/q(z)" />, defined except at zeros of{" "}
          <InlineMath math="q" />.
        </li>
        <li>
          <strong>Exponential</strong>{" "}
          <InlineMath math="e^z = e^x e^{iy} = e^x(\cos y + i \sin y)" />.
          Periodic in <InlineMath math="y" /> with period{" "}
          <InlineMath math="2\pi" /> — a striking feature, very
          different from real exponential.
        </li>
        <li>
          <strong>Trig functions</strong> via Euler:{" "}
          <InlineMath math="\sin z = (e^{iz} - e^{-iz})/(2i)" />,{" "}
          <InlineMath math="\cos z = (e^{iz} + e^{-iz})/2" />. Defined
          for all <InlineMath math="z \in \mathbb{C}" />, but
          <em>unbounded</em> on{" "}
          <InlineMath math="\mathbb{C}" /> (unlike on{" "}
          <InlineMath math="\mathbb{R}" />, where{" "}
          <InlineMath math="|\sin x| \leq 1" />).
        </li>
      </ul>

      <p>
        We can't visualise complex functions as 2D graphs — they're
        maps from a plane to a plane, requiring 4 dimensions to
        graph. Two practical visualisations:
      </p>

      <ul>
        <li>
          <strong>Domain colouring</strong>: colour each point of the
          domain by{" "}
          <InlineMath math="\arg f(z)" /> (hue) and{" "}
          <InlineMath math="|f(z)|" /> (brightness). Zeros and poles
          show up as colour vortices.
        </li>
        <li>
          <strong>Image of a grid</strong>: take a regular grid in the
          domain and plot its image. Reveals how the function bends
          space.
        </li>
      </ul>

      <p>
        The Wikipedia visualisations of{" "}
        <InlineMath math="z^n" />, <InlineMath math="\sin z" />, and{" "}
        <InlineMath math="\Gamma(z)" /> are worth searching for.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · The complex logarithm and branch cuts</h2>

      <p>
        Defining <InlineMath math="\log z" /> for complex{" "}
        <InlineMath math="z \neq 0" /> seems easy: write{" "}
        <InlineMath math="z = r e^{i\theta}" /> in polar form, then
      </p>
      <BlockMath math="\log z = \log r + i \theta." />

      <p>
        Wrong! There's a problem: <InlineMath math="\theta" /> is only
        defined modulo <InlineMath math="2\pi" />. So{" "}
        <InlineMath math="\log z" /> is{" "}
        <strong>multi-valued</strong>: any choice{" "}
        <InlineMath math="\log r + i (\theta + 2\pi k)" /> for integer{" "}
        <InlineMath math="k" /> gives an exponent that maps back to{" "}
        <InlineMath math="z" />.
      </p>

      <p>
        To get a single-valued function, restrict <InlineMath math="\theta" />{" "}
        to one interval — typically{" "}
        <InlineMath math="(-\pi, \pi]" />. This is the{" "}
        <strong>principal branch</strong> of the logarithm. Other
        intervals give other "branches"; they all differ by integer
        multiples of <InlineMath math="2\pi i" />.
      </p>

      <h3>Branch cuts</h3>

      <p>
        With the principal branch, <InlineMath math="\log z" /> has a{" "}
        <strong>branch cut</strong> along the negative real axis: as{" "}
        <InlineMath math="z" /> crosses below the negative real axis,{" "}
        <InlineMath math="\arg z" /> jumps from <InlineMath math="\pi" />{" "}
        to <InlineMath math="-\pi" />, so{" "}
        <InlineMath math="\log z" /> jumps by{" "}
        <InlineMath math="-2\pi i" />. The function is discontinuous
        there.
      </p>

      <p>
        Same problem appears for <InlineMath math="\sqrt z = z^{1/2}" />:
        in polar,{" "}
        <InlineMath math="\sqrt{r e^{i\theta}} = \sqrt r \cdot e^{i\theta/2}" />.
        Different choices of <InlineMath math="\theta" /> give different
        square roots; we need a branch cut to choose one consistently.
      </p>

      <Pitfall>
        Familiar identities like <InlineMath math="\log(zw) = \log z + \log w" /> are{" "}
        <em>only true up to integer multiples of{" "}
        <InlineMath math="2\pi i" /></em> on the principal branch. For
        instance,{" "}
        <InlineMath math="\log((-1)(-1)) = \log 1 = 0" /> but{" "}
        <InlineMath math="\log(-1) + \log(-1) = i\pi + i\pi = 2\pi i" />.
        Real-line identities don't always extend cleanly to complex.
      </Pitfall>

      <Exercise
        number="4.1"
        prompt={
          <>
            Compute <InlineMath math="\log(1 + i)" /> on the principal
            branch.
          </>
        }
      >
        <p>
          Polar form:{" "}
          <InlineMath math="1 + i = \sqrt 2 \, e^{i\pi/4}" />. So
        </p>
        <BlockMath math="\log(1 + i) = \log \sqrt 2 + i \frac{\pi}{4} = \tfrac{1}{2} \log 2 + i \frac{\pi}{4}." />
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Why complex analysis matters</h2>

      <ul>
        <li>
          <strong>Fluid dynamics.</strong> 2D incompressible irrotational
          flows are described by holomorphic functions (next chapter).
          Lift on an aircraft wing, the shape of free streamlines —
          analysed via conformal maps and the Joukowski transformation.
        </li>
        <li>
          <strong>Electrostatics in 2D.</strong> Electric potentials in
          2D obey Laplace's equation; their solutions are harmonic
          functions, which are real parts of holomorphic functions.
          Complex analysis solves capacitance and resistance problems
          via conformal mapping.
        </li>
        <li>
          <strong>Quantum mechanics.</strong> Wave functions are
          complex-valued; complex amplitudes interfere. The unitary
          time-evolution operator{" "}
          <InlineMath math="e^{-iHt/\hbar}" /> is a complex
          exponential of a Hermitian Hamiltonian. The geometry of the
          complex plane lives at the heart of quantum mechanics.
        </li>
        <li>
          <strong>Signal processing &amp; Fourier transforms.</strong>{" "}
          Phases <InlineMath math="e^{i\omega t}" /> are the natural
          basis for periodic and quasi-periodic phenomena. Filters,
          modulation, channel equalisation all live in the complex
          plane.
        </li>
        <li>
          <strong>Number theory.</strong> The Riemann zeta function{" "}
          <InlineMath math="\zeta(s) = \sum 1/n^s" /> is a complex
          function whose zeros encode the distribution of primes. The
          Riemann hypothesis is the most famous open problem in
          mathematics, and it's a question about complex analysis.
        </li>
        <li>
          <strong>Engineering control.</strong> The Laplace transform
          (which we met in Diff Eq) lives in the complex plane —{" "}
          <InlineMath math="s = \sigma + i\omega" /> with poles and
          zeros determining stability and frequency response.
        </li>
      </ul>

      <p>
        Next chapter: complex differentiability and the Cauchy–Riemann
        equations. The constraint of being complex-differentiable is
        much stricter than real-differentiable, and the consequences
        are spectacular.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: complex plane
// ════════════════════════════════════════════════════════════

function ComplexPlaneWidget() {
  const [z, setZ] = useState({ x: 1.2, y: 0.6 });
  const [op, setOp] = useState<"square" | "cube" | "exp" | "inv">("square");

  const w = 360;
  const h = 280;
  const cx = w / 2;
  const cy = h / 2;
  const scale = 35;
  const sx = (x: number) => cx + x * scale;
  const sy = (y: number) => cy - y * scale;

  const r = Math.sqrt(z.x * z.x + z.y * z.y);
  const theta = Math.atan2(z.y, z.x);

  let result: { x: number; y: number; label: string };
  if (op === "square") {
    result = { x: z.x * z.x - z.y * z.y, y: 2 * z.x * z.y, label: "z²" };
  } else if (op === "cube") {
    const re2 = z.x * z.x - z.y * z.y;
    const im2 = 2 * z.x * z.y;
    result = { x: re2 * z.x - im2 * z.y, y: re2 * z.y + im2 * z.x, label: "z³" };
  } else if (op === "exp") {
    const er = Math.exp(z.x);
    result = { x: er * Math.cos(z.y), y: er * Math.sin(z.y), label: "eᶻ" };
  } else {
    const m2 = z.x * z.x + z.y * z.y;
    result = m2 > 1e-6 ? { x: z.x / m2, y: -z.y / m2, label: "1/z" } : { x: 0, y: 0, label: "1/z" };
  }

  const handle = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * w;
    const y = ((e.clientY - rect.top) / rect.height) * h;
    setZ({ x: (x - cx) / scale, y: (cy - y) / scale });
  };

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          {(["square", "cube", "exp", "inv"] as const).map((o) => (
            <button
              key={o}
              onClick={() => setOp(o)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                op === o
                  ? "border-accent-soft bg-ink-800 text-ink-50"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              {o === "square" ? "z²" : o === "cube" ? "z³" : o === "exp" ? "eᶻ" : "1/z"}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="w-full block touch-none cursor-crosshair"
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture?.(e.pointerId);
              handle(e);
            }}
            onPointerMove={(e) => {
              if (e.buttons !== 0 || e.pointerType === "touch") handle(e);
            }}
          >
            {/* grid */}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`gx${i}`} x1={sx(i - 5)} y1={0} x2={sx(i - 5)} y2={h} stroke="rgb(var(--ink-800))" strokeOpacity={0.5} strokeWidth={0.5} />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`gy${i}`} x1={0} y1={sy(i - 4)} x2={w} y2={sy(i - 4)} stroke="rgb(var(--ink-800))" strokeOpacity={0.5} strokeWidth={0.5} />
            ))}
            <line x1={0} y1={cy} x2={w} y2={cy} stroke="rgb(var(--ink-700))" />
            <line x1={cx} y1={0} x2={cx} y2={h} stroke="rgb(var(--ink-700))" />

            {/* unit circle */}
            <circle cx={cx} cy={cy} r={scale} fill="none" stroke="rgb(var(--ink-700))" strokeDasharray="3 3" strokeOpacity={0.6} />

            {/* z */}
            <line x1={cx} y1={cy} x2={sx(z.x)} y2={sy(z.y)} stroke="#22d3ee" strokeWidth={1.5} />
            <circle cx={sx(z.x)} cy={sy(z.y)} r={5} fill="#22d3ee" />
            <text x={sx(z.x) + 6} y={sy(z.y) - 6} fill="#22d3ee" fontSize={11}>z</text>

            {/* result */}
            <line x1={cx} y1={cy} x2={sx(result.x)} y2={sy(result.y)} stroke="#a78bfa" strokeWidth={1.5} />
            <circle cx={sx(result.x)} cy={sy(result.y)} r={5} fill="#a78bfa" />
            <text x={sx(result.x) + 6} y={sy(result.y) - 6} fill="#a78bfa" fontSize={11}>
              {result.label}
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Stat label="z" value={`${z.x.toFixed(2)} ${z.y >= 0 ? "+" : "−"} ${Math.abs(z.y).toFixed(2)}i`} />
          <Stat label={result.label} value={`${result.x.toFixed(2)} ${result.y >= 0 ? "+" : "−"} ${Math.abs(result.y).toFixed(2)}i`} />
          <Stat label="|z|" value={r.toFixed(3)} />
          <Stat label="arg z (rad)" value={theta.toFixed(3)} />
        </div>
      </div>
      <figcaption>
        Click anywhere to place <InlineMath math="z" />. Cyan arrow:{" "}
        <InlineMath math="z" />. Purple arrow: the chosen function of{" "}
        <InlineMath math="z" />. The dashed circle is the unit circle.
        Note how <InlineMath math="z^n" /> doubles or triples the angle
        and powers the modulus.
      </figcaption>
    </figure>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ink-800/40 border border-ink-800 px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-ink-500">{label}</div>
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
      "Compute $(2 + 3i)(1 + 2i)$.",
    options: ["$5 + 7i$", "$-4 + 7i$", "$2 + 6i$", "$5 - 4i$"],
    correct: 1,
    explanation:
      "$(2+3i)(1+2i) = 2 + 4i + 3i + 6i^2 = 2 + 7i - 6 = -4 + 7i$.",
  },
  {
    prompt:
      "What is the modulus of $3 - 4i$?",
    options: ["1", "5", "7", "12"],
    correct: 1,
    explanation:
      "$|3 - 4i| = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
  },
  {
    prompt:
      "Multiplication by $i$ in the complex plane corresponds to…",
    options: [
      "scaling by 2",
      "rotation by 90° counter-clockwise",
      "rotation by 180°",
      "complex conjugation",
    ],
    correct: 1,
    explanation:
      "$i = e^{i\\pi/2}$, so multiplying by $i$ rotates 90° counter-clockwise without scaling.",
  },
  {
    prompt:
      "How many distinct $n$-th roots does any nonzero complex number have?",
    options: ["1", "2", "$n$", "infinitely many"],
    correct: 2,
    explanation:
      "$z^n = w$ has exactly $n$ solutions, evenly spaced on a circle of radius $|w|^{1/n}$ in the complex plane.",
  },
  {
    prompt:
      "On the principal branch of $\\log$, what is $\\log(-1)$?",
    options: ["0", "$-1$", "$i\\pi$", "undefined"],
    correct: 2,
    explanation:
      "$-1 = e^{i\\pi}$, so $\\log(-1) = i\\pi$ on the principal branch ($\\arg \\in (-\\pi, \\pi]$).",
  },
];
