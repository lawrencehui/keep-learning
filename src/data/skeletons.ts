import type { Module } from "../types";

const stub = (
  id: string,
  tier: string,
  title: string,
  subtitle: string,
  references: string[],
  prerequisites: string[],
  chapters: { id: string; title: string; topics: string[] }[]
): Module => ({
  id,
  tier,
  title,
  subtitle,
  references,
  prerequisites,
  chapters: chapters.map((c) => ({
    id: c.id,
    title: c.title,
    blurb: "Outline — full lessons coming.",
    lessons: [
      {
        id: `${c.id}-overview`,
        title: `${c.title} — overview`,
        summary: `Topics planned: ${c.topics.join(", ")}.`,
        topics: c.topics,
        hours: 0,
        resources: [],
      },
    ],
  })),
});

export const diffEq: Module = stub(
  "diff-eq",
  "V",
  "Differential Equations",
  "Modeling change. ODEs and PDEs.",
  ["MIT 18.03"],
  ["calculus", "linear-algebra"],
  [
    { id: "first-order", title: "First-Order ODEs", topics: ["separable", "linear", "exact", "integrating factor"] },
    { id: "second-order", title: "Second-Order Linear ODEs", topics: ["homogeneous", "non-homogeneous", "resonance"] },
    { id: "laplace", title: "Laplace Transforms", topics: ["transform", "inverse", "convolution"] },
    { id: "systems", title: "Systems of ODEs", topics: ["matrix exponential", "phase portraits"] },
    { id: "fourier-pde", title: "Fourier Series & PDEs", topics: ["heat eq", "wave eq", "Laplace eq"] },
  ]
);

export const numberTheory: Module = stub(
  "number-theory",
  "VI",
  "Number Theory",
  "Primes, modular arithmetic, the math behind ECDSA & RSA.",
  ["MIT 18.781"],
  ["foundations"],
  [
    { id: "divisibility", title: "Divisibility & Primes", topics: ["GCD", "Euclidean algorithm", "fundamental theorem of arithmetic"] },
    { id: "modular", title: "Modular Arithmetic", topics: ["congruences", "Fermat little", "Euler's theorem"] },
    { id: "rsa", title: "RSA from Scratch", topics: ["key generation", "encryption", "why factoring matters"] },
    { id: "ecdsa", title: "Elliptic Curves & ECDSA", topics: ["EC group law", "discrete log on curves", "Bitcoin signatures"] },
  ]
);

export const probability: Module = stub(
  "probability",
  "VII",
  "Probability & Statistics",
  "The math of uncertainty — essential for QM measurement.",
  ["MIT 18.05"],
  ["calculus"],
  [
    { id: "combinatorics", title: "Combinatorics", topics: ["counting", "permutations", "binomial"] },
    { id: "rv", title: "Random Variables", topics: ["discrete", "continuous", "expectation", "variance"] },
    { id: "distributions", title: "Distributions", topics: ["binomial", "Poisson", "normal", "exponential"] },
    { id: "clt-bayes", title: "CLT & Bayesian Inference", topics: ["LLN", "CLT", "Bayes' theorem", "posterior"] },
  ]
);

export const complexAnalysis: Module = stub(
  "complex-analysis",
  "VIII",
  "Complex Analysis",
  "Functions of a complex variable. Beautiful and useful.",
  ["MIT 18.04"],
  ["calculus", "multivariable"],
  [
    { id: "complex-numbers", title: "Complex Numbers & Functions", topics: ["polar form", "Euler's formula", "branch cuts"] },
    { id: "analytic", title: "Analytic Functions", topics: ["Cauchy–Riemann", "harmonic functions"] },
    { id: "contour", title: "Contour Integration", topics: ["Cauchy's theorem", "Cauchy integral formula"] },
    { id: "residues", title: "Residue Theorem & Fourier", topics: ["residues", "real integrals via complex", "Fourier transform"] },
  ]
);

export const realAnalysis: Module = stub(
  "real-analysis",
  "IX",
  "Real Analysis",
  "Calculus done rigorously.",
  ["MIT 18.100", "Rudin — Principles of Mathematical Analysis"],
  ["calculus", "foundations"],
  [
    { id: "metric-spaces", title: "Metric Spaces", topics: ["open/closed sets", "compactness", "completeness"] },
    { id: "sequences", title: "Sequences & Series of Functions", topics: ["uniform convergence", "Weierstrass M-test"] },
    { id: "lebesgue", title: "Lebesgue Integration (intro)", topics: ["measure", "L^p spaces"] },
  ]
);

export const abstractAlgebra: Module = stub(
  "abstract-algebra",
  "X",
  "Abstract Algebra",
  "Groups, rings, fields. The structure underneath everything.",
  ["MIT 18.701/18.702", "Dummit & Foote"],
  ["linear-algebra", "number-theory"],
  [
    { id: "groups", title: "Groups", topics: ["subgroups", "homomorphisms", "Lagrange's theorem"] },
    { id: "rings", title: "Rings & Fields", topics: ["ideals", "polynomial rings", "finite fields"] },
    { id: "galois", title: "Galois Theory (taste)", topics: ["field extensions", "solvability"] },
  ]
);

export const advancedLA: Module = stub(
  "advanced-la",
  "XI",
  "Advanced Linear Algebra",
  "Hilbert spaces, tensors, operators — the framework of QM.",
  ["MIT 18.700/18.745", "Axler — Linear Algebra Done Right"],
  ["linear-algebra", "real-analysis"],
  [
    { id: "inner-product", title: "Inner Product Spaces (deep)", topics: ["adjoint", "self-adjoint", "unitary"] },
    { id: "spectral-thm", title: "Spectral Theorem (operators)", topics: ["normal operators", "diagonalization"] },
    { id: "tensor", title: "Tensor Products & Multilinear Algebra", topics: ["tensor product", "exterior algebra"] },
    { id: "hilbert", title: "Hilbert Spaces", topics: ["completeness", "orthonormal basis", "L^2"] },
  ]
);

export const classicalMech: Module = stub(
  "classical-mech",
  "XII",
  "Classical Mechanics",
  "Newton, Lagrange, Hamilton.",
  ["MIT 8.01", "MIT 8.223", "Goldstein"],
  ["multivariable", "diff-eq"],
  [
    { id: "newton", title: "Newtonian Mechanics", topics: ["F=ma", "energy", "momentum"] },
    { id: "lagrange", title: "Lagrangian Mechanics", topics: ["action", "Euler–Lagrange equations"] },
    { id: "hamilton", title: "Hamiltonian Mechanics", topics: ["phase space", "Poisson brackets", "canonical transformations"] },
  ]
);

export const emWaves: Module = stub(
  "em-waves",
  "XIII",
  "Electromagnetism & Waves",
  "Maxwell's equations and wave phenomena.",
  ["MIT 8.02", "MIT 8.03", "Griffiths — Introduction to Electrodynamics"],
  ["multivariable", "diff-eq"],
  [
    { id: "maxwell", title: "Maxwell's Equations", topics: ["Gauss", "Ampère", "Faraday", "EM waves"] },
    { id: "waves", title: "Waves & Vibrations", topics: ["wave equation", "superposition", "Fourier decomposition"] },
    { id: "optics", title: "Optics", topics: ["interference", "diffraction", "polarization"] },
  ]
);

export const qm1: Module = stub(
  "qm-1",
  "XIV",
  "Quantum Mechanics I",
  "Wavefunctions, Schrödinger equation, simple systems.",
  ["MIT 8.04", "Griffiths — Introduction to Quantum Mechanics"],
  ["advanced-la", "diff-eq", "em-waves"],
  [
    { id: "wave-particle", title: "Wave–Particle Duality", topics: ["photoelectric effect", "de Broglie", "double slit"] },
    { id: "schrodinger", title: "Schrödinger Equation", topics: ["time-dependent", "time-independent", "stationary states"] },
    { id: "1d-systems", title: "1-D Systems", topics: ["infinite well", "harmonic oscillator", "tunneling"] },
    { id: "operators", title: "Operators & Observables", topics: ["Hermitian operators", "expectation values", "uncertainty"] },
  ]
);

export const qm2: Module = stub(
  "qm-2",
  "XV",
  "Quantum Mechanics II",
  "Hilbert space formalism, spin, entanglement.",
  ["MIT 8.05", "Sakurai — Modern Quantum Mechanics"],
  ["qm-1"],
  [
    { id: "dirac", title: "Dirac Notation & Hilbert Spaces", topics: ["bra-ket", "operators", "completeness"] },
    { id: "spin", title: "Spin & Angular Momentum", topics: ["Pauli matrices", "Stern–Gerlach", "addition of angular momentum"] },
    { id: "entanglement", title: "Entanglement & EPR", topics: ["tensor products", "Bell states", "Bell inequalities"] },
    { id: "perturbation", title: "Perturbation Theory", topics: ["time-independent", "time-dependent", "Fermi's golden rule"] },
  ]
);

export const quantumComputing: Module = stub(
  "quantum-computing",
  "XVI",
  "Quantum Information & Computing",
  "Qubits, gates, algorithms — Shor, Grover, quantum error correction.",
  ["MIT 6.S089", "Nielsen & Chuang — Quantum Computation and Quantum Information"],
  ["qm-2", "abstract-algebra", "number-theory"],
  [
    { id: "qubits", title: "Qubits & Bloch Sphere", topics: ["|0⟩, |1⟩", "superposition", "Bloch sphere"] },
    { id: "gates", title: "Gates & Circuits", topics: ["X, Y, Z, H", "CNOT", "universal gate sets"] },
    { id: "algorithms", title: "Quantum Algorithms", topics: ["Deutsch–Jozsa", "Grover", "QFT"] },
    { id: "shor", title: "Shor's Algorithm", topics: ["period finding", "modular exp", "ECDSA implications"] },
    { id: "qec", title: "Quantum Error Correction", topics: ["bit-flip code", "Shor code", "surface code"] },
    { id: "pqc", title: "Post-Quantum Cryptography", topics: ["lattice-based", "BIP-360", "quantum-safe Bitcoin"] },
  ]
);
