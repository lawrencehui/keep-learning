import type { Module } from "../types";
import { foundations } from "./01-foundations";
import { calculus } from "./02-calculus";
import { linearAlgebra } from "./03-linear-algebra";
import { multivariable } from "./04-multivar";
import {
  diffEq,
  numberTheory,
  probability,
  complexAnalysis,
  realAnalysis,
  abstractAlgebra,
  advancedLA,
  classicalMech,
  emWaves,
  qm1,
  qm2,
  quantumComputing,
} from "./skeletons";

export const syllabus: Module[] = [
  foundations,
  calculus,
  linearAlgebra,
  multivariable,
  diffEq,
  numberTheory,
  probability,
  complexAnalysis,
  realAnalysis,
  abstractAlgebra,
  advancedLA,
  classicalMech,
  emWaves,
  qm1,
  qm2,
  quantumComputing,
];

export const allLessonIds = syllabus.flatMap((m) =>
  m.chapters.flatMap((c) => c.lessons.map((l) => `${m.id}/${c.id}/${l.id}`))
);
