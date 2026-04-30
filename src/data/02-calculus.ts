import type { Module } from "../types";

export const calculus: Module = {
  id: "calculus",
  tier: "II",
  title: "Single-Variable Calculus",
  subtitle: "Limits, derivatives, integrals, series — the language of change.",
  references: ["MIT 18.01", "Stewart — Calculus", "Spivak — Calculus"],
  prerequisites: ["foundations"],
  chapters: [
    {
      id: "limits",
      title: "Limits & Continuity",
      blurb: "What it means to 'approach' a value.",
      lessons: [
        {
          id: "intuitive-limits",
          title: "Intuitive Limits",
          summary:
            "$\\displaystyle \\lim_{x \\to a} f(x) = L$. Squeeze theorem, one-sided limits, limits at infinity.",
          topics: ["limit notation", "squeeze theorem", "indeterminate forms"],
          hours: 3,
          resources: [
            {
              kind: "video",
              title: "3Blue1Brown — Essence of Calculus, Ch.7 Limits",
              url: "https://www.youtube.com/watch?v=kfF40MiS7zA",
            },
            {
              kind: "course",
              title: "MIT OCW 18.01 — Single Variable Calculus",
              url: "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/",
            },
          ],
        },
        {
          id: "epsilon-delta",
          title: "ε–δ Definition",
          summary:
            "Formal: $\\forall \\varepsilon > 0,\\ \\exists \\delta > 0:\\ |x-a|<\\delta \\Rightarrow |f(x)-L|<\\varepsilon$.",
          topics: ["formal limit", "continuity", "intermediate value theorem"],
          hours: 4,
          resources: [
            {
              kind: "book",
              title: "Spivak — Calculus (Ch. 5)",
              author: "Spivak",
              url: "https://en.wikipedia.org/wiki/Calculus_(Spivak)",
            },
          ],
        },
      ],
    },
    {
      id: "derivatives",
      title: "Derivatives",
      blurb: "Instantaneous rate of change.",
      lessons: [
        {
          id: "definition",
          title: "Definition & Rules",
          summary:
            "$\\displaystyle f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$. Power, product, quotient, chain rule.",
          topics: ["limit definition", "rules", "implicit differentiation"],
          hours: 5,
          resources: [
            {
              kind: "video",
              title: "3Blue1Brown — Essence of Calculus, Ch.2 Derivatives",
              url: "https://www.youtube.com/watch?v=9vKqVkMQHKk",
            },
          ],
        },
        {
          id: "applications",
          title: "Applications",
          summary:
            "Optimization, related rates, mean value theorem, Taylor approximation $f(x) \\approx f(a) + f'(a)(x-a) + \\tfrac{1}{2}f''(a)(x-a)^2 + \\ldots$",
          topics: ["optimization", "MVT", "linear approximation", "Newton's method"],
          hours: 4,
          resources: [
            {
              kind: "video",
              title: "3Blue1Brown — Taylor series",
              url: "https://www.youtube.com/watch?v=3d6DsjIBzJ4",
            },
          ],
        },
      ],
    },
    {
      id: "integrals",
      title: "Integrals",
      blurb: "Areas, accumulations, the Fundamental Theorem of Calculus.",
      lessons: [
        {
          id: "riemann",
          title: "Riemann Integrals",
          summary:
            "$\\displaystyle \\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty} \\sum_{i=1}^n f(x_i^*)\\Delta x$. Antiderivatives. FTC.",
          topics: ["Riemann sums", "FTC", "u-substitution"],
          hours: 5,
          resources: [
            {
              kind: "video",
              title: "3Blue1Brown — Integration & FTC",
              url: "https://www.youtube.com/watch?v=rfG8ce4nNh0",
            },
          ],
        },
        {
          id: "techniques",
          title: "Techniques of Integration",
          summary: "By parts $\\int u\\,dv = uv - \\int v\\,du$, partial fractions, trig substitution.",
          topics: ["by parts", "partial fractions", "trig sub", "improper integrals"],
          hours: 5,
          resources: [
            {
              kind: "course",
              title: "MIT OCW 18.01 — Lectures",
              url: "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/video_galleries/video-lectures/",
            },
          ],
        },
      ],
    },
    {
      id: "series",
      title: "Sequences & Series",
      blurb: "Infinite sums and when they converge.",
      lessons: [
        {
          id: "convergence",
          title: "Convergence Tests",
          summary:
            "Geometric, $p$-series, ratio, root, comparison, alternating. $\\sum_{n=1}^\\infty \\tfrac{1}{n^2} = \\tfrac{\\pi^2}{6}$.",
          topics: ["geometric", "p-series", "ratio test", "alternating series"],
          hours: 4,
          resources: [
            {
              kind: "video",
              title: "3Blue1Brown — Why π² / 6?",
              url: "https://www.youtube.com/watch?v=d-o3eB9sfls",
            },
          ],
        },
        {
          id: "power-taylor",
          title: "Power & Taylor Series",
          summary:
            "$\\displaystyle f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{n!}(x-a)^n$. Radius of convergence. $e^x$, $\\sin x$, $\\cos x$ expansions.",
          topics: ["radius of convergence", "Taylor", "Maclaurin"],
          hours: 4,
          resources: [],
        },
      ],
    },
  ],
};
