import type { Pathway } from "../types";
import { syllabus as quantumModules } from "./syllabus";
import { mlPathwayModules } from "./ml-skeletons";

export const pathways: Pathway[] = [
  {
    id: "quantum",
    title: "Numbers → Quantum",
    subtitle: "From elementary logic to quantum computing.",
    description:
      "A 16-tier self-paced curriculum modelled on MIT's path through math and physics. Closes the loop on why ECDSA falls under Shor's algorithm and what comes after.",
    emblem: "ψ",
    modules: quantumModules,
  },
  {
    id: "ml",
    title: "ML × Market Microstructure",
    subtitle: "Linear algebra to limit-order books.",
    description:
      "An 8-week refresher pathway: linear algebra, calculus, probability, statistics, ML fundamentals, stochastic calculus, and limit-order-book mechanics. Built around MML, Wasserman, Trades-Quotes-Prices, and Cartea-Jaimungal-Penalva.",
    emblem: "Σ",
    modules: mlPathwayModules,
  },
];

export function getPathway(id: string | undefined): Pathway | null {
  if (!id) return null;
  return pathways.find((p) => p.id === id) ?? null;
}

/** Default fallback pathway used by legacy `/module/...` routes. */
export const DEFAULT_PATHWAY_ID = "quantum";
