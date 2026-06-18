import type { Pathway } from "../types";
import { syllabus as quantumModules } from "./syllabus";
import { mlPathwayModules } from "./ml-skeletons";

export const pathways: Pathway[] = [
  {
    id: "quantum",
    title: "Numbers → Quantum",
    subtitle: "From elementary logic to quantum computing.",
    description:
      "A 16-module self-paced curriculum modelled on MIT's path through math and physics. Closes the loop on why ECDSA falls under Shor's algorithm and what comes after.",
    emblem: "ψ",
    modules: quantumModules,
  },
  {
    id: "ml",
    title: "ML × Market Microstructure",
    subtitle: "Linear algebra to RL & limit-order books.",
    description:
      "A 9-module refresher pathway: linear algebra, calculus, probability, statistics, ML fundamentals, stochastic calculus, limit-order-book mechanics, and reinforcement learning & optimal control. Built around MML, Wasserman, Trades-Quotes-Prices, Cartea-Jaimungal-Penalva, and Sutton & Barto.",
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
