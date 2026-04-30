import type { Module } from "../types";

export const foundations: Module = {
  id: "foundations",
  tier: "I",
  title: "Foundations",
  subtitle: "Logic, sets, proofs, and pre-calculus refresher.",
  references: ["MIT 18.S097 Proof Workshop", "Khan Academy Pre-Calc"],
  prerequisites: [],
  chapters: [
    {
      id: "logic-sets",
      title: "Logic & Sets",
      blurb: "The language all of math is written in.",
      lessons: [
        {
          id: "propositional-logic",
          title: "Propositional Logic",
          summary:
            "Statements, connectives ($\\land, \\lor, \\lnot, \\Rightarrow$), truth tables, tautology vs. contradiction.",
          topics: ["AND/OR/NOT", "implication", "truth tables", "logical equivalence"],
          hours: 2,
          resources: [
            {
              kind: "video",
              title: "TrevTutor — Discrete Math (Logic)",
              url: "https://www.youtube.com/playlist?list=PLDDGPdw7e6Ag1EIznZ-m-qXu4XX3A0cIz",
            },
            {
              kind: "book",
              title: "Book of Proof — Richard Hammack",
              author: "Hammack",
              url: "https://www.people.vcu.edu/~rhammack/BookOfProof/",
              note: "Free PDF",
            },
          ],
        },
        {
          id: "set-theory",
          title: "Naïve Set Theory",
          summary:
            "Sets, subsets, unions, intersections, Cartesian products, functions $f: A \\to B$, injections, surjections, bijections.",
          topics: ["set operations", "functions", "cardinality", "Russell's paradox (intuition)"],
          hours: 3,
          resources: [
            {
              kind: "video",
              title: "MIT 6.042J — Set Theory",
              url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/",
            },
          ],
        },
        {
          id: "proof-techniques",
          title: "Proof Techniques",
          summary:
            "Direct proof, contrapositive, contradiction, induction. Practice rewriting $\\forall n \\in \\mathbb{N},\\ P(n)$.",
          topics: ["direct", "contrapositive", "contradiction", "induction", "strong induction"],
          hours: 4,
          resources: [
            {
              kind: "book",
              title: "How to Prove It — Velleman",
              author: "Velleman",
              url: "https://www.cambridge.org/core/books/how-to-prove-it/",
            },
          ],
        },
      ],
    },
    {
      id: "precalc",
      title: "Pre-Calculus Refresher",
      blurb: "Functions, trig, exponentials. The toolkit calculus uses constantly.",
      lessons: [
        {
          id: "functions",
          title: "Functions & Graphs",
          summary:
            "Domain, range, composition $(f \\circ g)(x)$, inverses. Polynomials, rational functions, piecewise.",
          topics: ["domain/range", "composition", "inverses", "transformations"],
          hours: 3,
          resources: [
            {
              kind: "course",
              title: "Khan Academy — Precalculus",
              url: "https://www.khanacademy.org/math/precalculus",
            },
          ],
        },
        {
          id: "trig",
          title: "Trigonometry",
          summary:
            "Unit circle, identities like $\\sin^2\\theta + \\cos^2\\theta = 1$, sum/difference, $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$.",
          topics: ["unit circle", "identities", "law of sines/cosines", "Euler's formula (preview)"],
          hours: 4,
          resources: [
            {
              kind: "video",
              title: "3Blue1Brown — But what is e^{i pi}?",
              url: "https://www.youtube.com/watch?v=v0YEaeIClKY",
            },
          ],
        },
        {
          id: "exp-log",
          title: "Exponentials & Logarithms",
          summary:
            "Growth $a^x$, natural log $\\ln x$, change of base, log identities. Why $e$ matters.",
          topics: ["exponential growth", "logs", "change of base"],
          hours: 2,
          resources: [
            {
              kind: "video",
              title: "3Blue1Brown — What's so special about Euler's number e?",
              url: "https://www.youtube.com/watch?v=m2MIpDrF7Es",
            },
          ],
        },
      ],
    },
  ],
};
