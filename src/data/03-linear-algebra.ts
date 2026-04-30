import type { Module } from "../types";

export const linearAlgebra: Module = {
  id: "linear-algebra",
  tier: "III",
  title: "Linear Algebra",
  subtitle: "Vectors, matrices, eigenvalues — the language of quantum mechanics.",
  references: ["MIT 18.06 — Strang", "3Blue1Brown — Essence of Linear Algebra"],
  prerequisites: ["calculus"],
  chapters: [
    {
      id: "vectors-spaces",
      title: "Vectors & Vector Spaces",
      blurb: "What it means to add and scale, abstractly.",
      lessons: [
        {
          id: "vectors-intuition",
          title: "Vectors — Geometric & Algebraic",
          summary:
            "Vectors as arrows vs. tuples. Linear combinations $\\mathbf{v} = a\\mathbf{u}_1 + b\\mathbf{u}_2$. Span, basis, dimension.",
          topics: ["linear combination", "span", "basis", "dimension"],
          hours: 4,
          resources: [
            {
              kind: "video",
              title: "3Blue1Brown — Essence of Linear Algebra (full series)",
              url: "https://www.3blue1brown.com/topics/linear-algebra",
              note: "Watch the whole thing first. Seriously.",
            },
            {
              kind: "course",
              title: "MIT 18.06 — Gilbert Strang",
              url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
            },
          ],
        },
        {
          id: "subspaces",
          title: "Subspaces & The Four Fundamental Subspaces",
          summary:
            "Column space $C(A)$, null space $N(A)$, row space, left null space. Rank–nullity: $\\dim C(A) + \\dim N(A) = n$.",
          topics: ["column space", "null space", "rank-nullity"],
          hours: 4,
          resources: [
            {
              kind: "video",
              title: "Strang — Lecture 6: Column Space & Null Space",
              url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/lecture-6-column-space-and-nullspace/",
            },
          ],
        },
      ],
    },
    {
      id: "matrices",
      title: "Matrices & Linear Maps",
      blurb: "Matrices as transformations.",
      lessons: [
        {
          id: "matrix-as-map",
          title: "Matrices as Transformations",
          summary:
            "$A\\mathbf{x}$ is a function from $\\mathbb{R}^n \\to \\mathbb{R}^m$. Composition $= $ matrix multiplication.",
          topics: ["matrix multiplication", "linear maps", "change of basis"],
          hours: 3,
          resources: [
            {
              kind: "video",
              title: "3Blue1Brown — Matrix multiplication as composition",
              url: "https://www.youtube.com/watch?v=XkY2DOUCWMU",
            },
          ],
        },
        {
          id: "gauss-elim",
          title: "Gaussian Elimination & LU",
          summary:
            "Row reduction to solve $A\\mathbf{x} = \\mathbf{b}$. $A = LU$ factorization. Determinants via row ops.",
          topics: ["row reduction", "LU", "determinant"],
          hours: 4,
          resources: [],
        },
      ],
    },
    {
      id: "eigen",
      title: "Eigenvalues & Eigenvectors",
      blurb: "The vectors a transformation just stretches.",
      lessons: [
        {
          id: "eigen-basics",
          title: "Eigen-everything",
          summary:
            "$A\\mathbf{v} = \\lambda \\mathbf{v}$. Characteristic polynomial $\\det(A - \\lambda I) = 0$. Diagonalization $A = PDP^{-1}$.",
          topics: ["eigenvalues", "diagonalization", "applications"],
          hours: 5,
          resources: [
            {
              kind: "video",
              title: "3Blue1Brown — Eigenvectors and eigenvalues",
              url: "https://www.youtube.com/watch?v=PFDu9oVAE-g",
            },
          ],
        },
        {
          id: "spectral",
          title: "Spectral Theorem & SVD",
          summary:
            "Symmetric matrices: $A = Q\\Lambda Q^T$ with orthonormal $Q$. Any matrix: $A = U\\Sigma V^T$.",
          topics: ["spectral theorem", "SVD", "PCA preview"],
          hours: 5,
          resources: [
            {
              kind: "video",
              title: "Strang — Lecture 29: SVD",
              url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/lecture-29-singular-value-decomposition/",
            },
          ],
        },
      ],
    },
    {
      id: "inner-product",
      title: "Inner Product Spaces",
      blurb: "Lengths and angles. Foundation for Hilbert space.",
      lessons: [
        {
          id: "orthogonality",
          title: "Inner Products & Orthogonality",
          summary:
            "$\\langle \\mathbf{u}, \\mathbf{v}\\rangle = \\sum u_i \\overline{v_i}$. Cauchy–Schwarz. Gram–Schmidt.",
          topics: ["inner product", "Cauchy–Schwarz", "Gram–Schmidt", "QR"],
          hours: 4,
          resources: [],
        },
      ],
    },
  ],
};
