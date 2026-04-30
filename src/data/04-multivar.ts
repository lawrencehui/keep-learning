import type { Module } from "../types";

export const multivariable: Module = {
  id: "multivariable",
  tier: "IV",
  title: "Multivariable Calculus",
  subtitle: "Calculus in many dimensions: gradient, divergence, curl.",
  references: ["MIT 18.02", "Stewart — Multivariable"],
  prerequisites: ["calculus", "linear-algebra"],
  chapters: [
    {
      id: "partials",
      title: "Partial Derivatives",
      blurb: "Slopes in many directions.",
      lessons: [
        {
          id: "gradient",
          title: "Gradient & Directional Derivatives",
          summary:
            "$\\nabla f = (\\partial_x f, \\partial_y f, \\partial_z f)$. Direction of steepest ascent. Tangent planes.",
          topics: ["partials", "gradient", "directional derivative", "tangent plane"],
          hours: 4,
          resources: [
            {
              kind: "course",
              title: "MIT OCW 18.02",
              url: "https://ocw.mit.edu/courses/18-02-multivariable-calculus-fall-2007/",
            },
          ],
        },
        {
          id: "optimization",
          title: "Optimization & Lagrange Multipliers",
          summary:
            "Critical points where $\\nabla f = 0$. Constrained: $\\nabla f = \\lambda \\nabla g$.",
          topics: ["critical points", "Hessian", "Lagrange multipliers"],
          hours: 4,
          resources: [],
        },
      ],
    },
    {
      id: "multi-integrals",
      title: "Multiple Integrals",
      blurb: "Volumes, masses, probabilities.",
      lessons: [
        {
          id: "double-triple",
          title: "Double & Triple Integrals",
          summary:
            "$\\iint_R f\\,dA$, $\\iiint_V f\\,dV$. Change of variables $\\to$ Jacobian $\\det \\partial(x,y)/\\partial(u,v)$.",
          topics: ["double", "triple", "polar/cylindrical/spherical", "Jacobian"],
          hours: 5,
          resources: [],
        },
      ],
    },
    {
      id: "vector-calc",
      title: "Vector Calculus",
      blurb: "The big three theorems that unify it all.",
      lessons: [
        {
          id: "div-curl",
          title: "Divergence & Curl",
          summary:
            "$\\nabla \\cdot \\mathbf{F}$ measures flux out, $\\nabla \\times \\mathbf{F}$ measures rotation.",
          topics: ["divergence", "curl", "vector fields"],
          hours: 4,
          resources: [
            {
              kind: "video",
              title: "3Blue1Brown — Divergence and curl",
              url: "https://www.youtube.com/watch?v=rB83DpBJQsE",
            },
          ],
        },
        {
          id: "stokes",
          title: "Green, Stokes, Divergence Theorems",
          summary:
            "$\\displaystyle \\oint_{\\partial S} \\mathbf{F}\\cdot d\\mathbf{r} = \\iint_S (\\nabla\\times\\mathbf{F})\\cdot d\\mathbf{S}$. The fundamental theorem in higher D.",
          topics: ["Green", "Stokes", "Divergence theorem"],
          hours: 5,
          resources: [],
        },
      ],
    },
  ],
};
