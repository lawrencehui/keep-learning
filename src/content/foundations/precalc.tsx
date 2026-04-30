import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import type { QuizQuestion } from "../types";

export default function PrecalcBody() {
  return (
    <>
      <p>
        Pre-calculus is the toolkit. Calculus, linear algebra, and
        eventually quantum mechanics use functions, trig identities, and
        logarithms <em>constantly</em>, often without slowing down to
        re-derive them. This chapter is the warm-up bench: nothing here is
        new, but rust costs you later.
      </p>

      <h2>1. Functions, domain, range</h2>
      <p>
        A function <InlineMath math="f : A \to B" /> takes each{" "}
        <InlineMath math="x \in A" /> to exactly one{" "}
        <InlineMath math="f(x) \in B" />. The <strong>domain</strong> is
        what you're allowed to put in; the <strong>range</strong> is what
        you actually get out.
      </p>
      <p>
        The graph of <InlineMath math="y = f(x)" /> is the set of points{" "}
        <InlineMath math="(x, f(x))" /> in the plane. Three operations bend
        graphs in predictable ways:
      </p>
      <ul>
        <li>
          <strong>Vertical scale &amp; shift</strong>:{" "}
          <InlineMath math="a \cdot f(x) + k" /> stretches by{" "}
          <InlineMath math="a" /> and lifts by <InlineMath math="k" />.
        </li>
        <li>
          <strong>Horizontal scale &amp; shift</strong>:{" "}
          <InlineMath math="f(b(x - h))" /> compresses by{" "}
          <InlineMath math="b" /> and slides right by{" "}
          <InlineMath math="h" />.
        </li>
        <li>
          <strong>Reflections</strong>: negative <InlineMath math="a" />{" "}
          flips top-to-bottom; negative <InlineMath math="b" /> flips
          left-to-right.
        </li>
      </ul>

      <Callout title="Try it">
        Drag the sliders to see how each parameter reshapes the same base
        function. The blue curve is the original; the purple curve is the
        transformed version.
      </Callout>

      <FunctionTransformWidget />

      <h3>Composition and inverses</h3>
      <p>
        <strong>Composition</strong> <InlineMath math="(f \circ g)(x) = f(g(x))" />{" "}
        is "do <InlineMath math="g" /> first, then{" "}
        <InlineMath math="f" />". Order matters:{" "}
        <InlineMath math="f \circ g \neq g \circ f" /> in general.
      </p>
      <p>
        An <strong>inverse</strong> <InlineMath math="f^{-1}" /> undoes{" "}
        <InlineMath math="f" />: <InlineMath math="f^{-1}(f(x)) = x" />. A
        function has an inverse only if it's bijective on its domain
        (one-to-one matters here — that's why{" "}
        <InlineMath math="\sqrt{\cdot}" /> needs a chosen branch when
        inverting <InlineMath math="x^2" />).
      </p>

      <h2>2. Trigonometry &amp; the unit circle</h2>
      <p>
        Forget triangles for a moment. The cleanest way to think about{" "}
        <InlineMath math="\sin" /> and <InlineMath math="\cos" /> is the
        unit circle. For an angle <InlineMath math="\theta" /> measured
        counter-clockwise from the positive <InlineMath math="x" />-axis,
        the point on the unit circle is exactly{" "}
        <InlineMath math="(\cos\theta, \sin\theta)" />.
      </p>

      <Callout title="Try it">
        Tap or drag the coloured dot. The sliders below show how{" "}
        <InlineMath math="\cos\theta" /> and <InlineMath math="\sin\theta" />{" "}
        track the dot's <InlineMath math="x" /> and{" "}
        <InlineMath math="y" /> coordinates.
      </Callout>

      <UnitCircleWidget />

      <p>
        From this picture, the most important identity falls out
        immediately. The dot lies on the unit circle, so
      </p>
      <BlockMath math="\cos^2\theta + \sin^2\theta = 1." />
      <p>
        Other identities you'll lean on:
      </p>
      <ul>
        <li>
          <InlineMath math="\sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta" />
        </li>
        <li>
          <InlineMath math="\cos(\alpha + \beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta" />
        </li>
        <li>
          <InlineMath math="\sin(2\theta) = 2\sin\theta\cos\theta" />
        </li>
        <li>
          <InlineMath math="\cos(2\theta) = \cos^2\theta - \sin^2\theta" />
        </li>
      </ul>

      <h3>Radians, not degrees</h3>
      <p>
        From here on, angles are in <strong>radians</strong>. One full
        revolution is <InlineMath math="2\pi" /> radians, not{" "}
        <InlineMath math="360^\circ" />. Radians make calculus formulas
        clean (e.g. <InlineMath math="\frac{d}{dx}\sin x = \cos x" /> only
        in radians).
      </p>

      <h3>Euler's formula — a preview</h3>
      <p>
        We'll prove this in calculus, but file it away now: for any real{" "}
        <InlineMath math="\theta" />,
      </p>
      <BlockMath math="e^{i\theta} = \cos\theta + i\sin\theta." />
      <p>
        This is the bridge between exponentials, trig, and complex
        numbers. Quantum state evolution will use it relentlessly: a qubit
        evolving under a Hamiltonian <em>is</em> a point being rotated
        around a sphere by phases of the form{" "}
        <InlineMath math="e^{-iHt/\hbar}" />.
      </p>

      <h2>3. Exponentials &amp; logarithms</h2>
      <p>
        An <strong>exponential</strong> function has the form{" "}
        <InlineMath math="f(x) = a^x" /> for a base{" "}
        <InlineMath math="a > 0" />. Two facts to internalise:
      </p>
      <ul>
        <li>
          <InlineMath math="a^{x+y} = a^x \cdot a^y" /> — adding exponents
          multiplies values.
        </li>
        <li>
          <InlineMath math="(a^x)^y = a^{xy}" /> — nesting exponents
          multiplies them.
        </li>
      </ul>

      <p>
        A <strong>logarithm</strong> is the inverse of an exponential:{" "}
        <InlineMath math="\log_a(y) = x \iff a^x = y" />. The log{" "}
        <em>asks</em> "what exponent?". The mirror identities are:
      </p>
      <BlockMath math="\log_a(xy) = \log_a x + \log_a y, \qquad \log_a(x^k) = k \log_a x." />

      <ExpLogIllustration />

      <h3>Why <InlineMath math="e" /> matters</h3>
      <p>
        Of all bases, <InlineMath math="e \approx 2.71828" /> is special
        because it makes calculus self-consistent:
      </p>
      <BlockMath math="\frac{d}{dx} e^x = e^x." />
      <p>
        No other exponential has a derivative equal to itself. That single
        property is why <InlineMath math="e" /> shows up in compound
        interest, radioactive decay, the bell curve, and quantum
        oscillators.
      </p>
      <p>
        Equivalent definition you'll see again:
      </p>
      <BlockMath math="e = \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n." />

      <h2>4. Why this matters going forward</h2>
      <p>
        Calculus uses these constantly: derivatives of trig, integrals of{" "}
        <InlineMath math="e^{ax}" />, log differentiation. Linear algebra
        uses complex exponentials to diagonalise rotation matrices. And
        when we get to quantum mechanics, every <em>phase</em> is an{" "}
        <InlineMath math="e^{i\theta}" />. Don't skim past this chapter —
        it's the rope you'll be climbing for the next twelve modules.
      </p>
    </>
  );
}

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
                  ? "border-accent-soft bg-ink-800 text-white"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              <InlineMath math={`f(x) = ${baseFnLabel[f]}`} />
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${hh}`} className="w-full block">
            {/* axes */}
            <line x1={0} y1={sy(0)} x2={w} y2={sy(0)} stroke="#2a2a37" />
            <line x1={sx(0)} y1={0} x2={sx(0)} y2={hh} stroke="#2a2a37" />
            {/* grid */}
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
            {/* curves */}
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
        Cyan: base function. Purple: transformed. Negative <InlineMath math="a" />{" "}
        or <InlineMath math="b" /> reflect the curve.
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
  const [theta, setTheta] = useState(Math.PI / 6); // 30°
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
            {/* axes */}
            <line x1={20} y1={cy} x2={280} y2={cy} stroke="#2a2a37" />
            <line x1={cx} y1={20} x2={cx} y2={280} stroke="#2a2a37" />
            {/* circle */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#404052" />
            {/* triangle */}
            <line x1={cx} y1={cy} x2={px} y2={cy} stroke="#22d3ee" strokeWidth={2} />
            <line x1={px} y1={cy} x2={px} y2={py} stroke="#a78bfa" strokeWidth={2} />
            <line x1={cx} y1={cy} x2={px} y2={py} stroke="#fef3c7" strokeWidth={1.5} strokeDasharray="3 3" />
            {/* arc */}
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
            {/* point */}
            <circle cx={px} cy={py} r={7} fill="#a78bfa" />
            {/* labels */}
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
        The point is <InlineMath math="(\cos\theta, \sin\theta)" />. Drag it
        or use the slider; identity{" "}
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
          {/* y = x mirror line */}
          <line
            x1={sx(xMin)}
            y1={sy(xMin)}
            x2={sx(xMax)}
            y2={sy(xMax)}
            stroke="#404052"
            strokeDasharray="3 3"
          />
          {/* exp */}
          <path d={path((x) => Math.exp(x))} fill="none" stroke="#a78bfa" strokeWidth={2} />
          <text x={sx(1.5)} y={sy(Math.exp(1.5)) - 6} fill="#a78bfa" fontSize="11">
            y = eˣ
          </text>
          {/* log */}
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

// ────────────────────────────────────────────────────────────
// Callout
// ────────────────────────────────────────────────────────────

function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="my-5 border-l-2 border-accent/60 pl-4 py-1 text-sm text-ink-300">
      <div className="text-[11px] uppercase tracking-widest text-accent-soft mb-1">
        {title}
      </div>
      <div>{children}</div>
    </aside>
  );
}

// ────────────────────────────────────────────────────────────
// Quiz
// ────────────────────────────────────────────────────────────

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "If $f(x) = x^2$, what is $(f \\circ g)(x)$ where $g(x) = x + 3$?",
    options: ["$x^2 + 3$", "$(x+3)^2$", "$x^2 + 9$", "$x + 9$"],
    correct: 1,
    explanation:
      "$(f \\circ g)(x) = f(g(x)) = f(x+3) = (x+3)^2$. Order matters: $g$ runs first, then $f$.",
  },
  {
    prompt: "Which identity is true for **every** real $\\theta$?",
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
      "Replace $f(x)$ with $f(x - 2) + 3$. How does the graph move?",
    options: [
      "Left 2, down 3",
      "Right 2, up 3",
      "Right 2, down 3",
      "Left 2, up 3",
    ],
    correct: 1,
    explanation:
      "$f(x - h)$ shifts right by $h$, and adding $k$ shifts up by $k$. So $f(x-2)+3$ moves the graph right 2 and up 3.",
  },
  {
    prompt: "$\\log_a(xy)$ equals…",
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
      "The defining property that makes $e$ the 'natural' base for exponentials in calculus is…",
    options: [
      "$e$ is irrational",
      "$\\frac{d}{dx} e^x = e^x$",
      "$e \\approx 2.718$",
      "$e^{i\\pi} = -1$",
    ],
    correct: 1,
    explanation:
      "Among all bases $a^x$, only $e^x$ has a derivative equal to itself. Every other property of $e$ (including Euler's identity in option D) is a consequence of this one.",
  },
];
