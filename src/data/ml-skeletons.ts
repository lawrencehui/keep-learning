import type { Module, Resource } from "../types";

// ────────────────────────────────────────────────────────────
// Shared resource definitions — authored once, reused across
// many lessons in the ML pathway.
// ────────────────────────────────────────────────────────────

const eola = (n: number, title: string): Resource => ({
  kind: "video",
  title: `3Blue1Brown — Essence of Linear Algebra ${n}: ${title}`,
  author: "Grant Sanderson",
  url: `https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab`,
  note: "Geometric intuition first.",
});

const strang = (n: string, title: string): Resource => ({
  kind: "course",
  title: `MIT 18.06 — Lecture ${n}: ${title}`,
  author: "Gilbert Strang",
  url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
});

const mml = (ch: string, title: string): Resource => ({
  kind: "book",
  title: `MML Ch ${ch} — ${title}`,
  author: "Deisenroth, Faisal, Ong",
  url: "https://mml-book.com/",
});

const tqp = (ch: string, title: string): Resource => ({
  kind: "book",
  title: `Trades, Quotes & Prices Ch ${ch} — ${title}`,
  author: "Bouchaud, Bonart, Donier, Gould",
  url: "https://www.cambridge.org/9781107156609",
});

const cjp = (ch: string, title: string): Resource => ({
  kind: "book",
  title: `Cartea–Jaimungal–Penalva Ch ${ch} — ${title}`,
  author: "Cartea, Jaimungal, Penalva",
  url: "https://www.cambridge.org/9781107091146",
});

const wasserman = (ch: string, title: string): Resource => ({
  kind: "book",
  title: `All of Statistics Ch ${ch} — ${title}`,
  author: "Wasserman",
  url: "https://link.springer.com/book/10.1007/978-0-387-21736-9",
});

const blitzstein = (ch: string, title: string): Resource => ({
  kind: "book",
  title: `Introduction to Probability Ch ${ch} — ${title}`,
  author: "Blitzstein & Hwang",
  url: "https://projects.iq.harvard.edu/stat110/home",
});

const stat110 = (n: string, title: string): Resource => ({
  kind: "course",
  title: `Stat 110 Lecture ${n}: ${title}`,
  author: "Joe Blitzstein (Harvard)",
  url: "https://projects.iq.harvard.edu/stat110/youtube",
});

const murphy = (ch: string, title: string): Resource => ({
  kind: "book",
  title: `Murphy PML Ch ${ch} — ${title}`,
  author: "Kevin Murphy",
  url: "https://probml.github.io/pml-book/book1.html",
});

const shreve = (vol: string, ch: string, title: string): Resource => ({
  kind: "book",
  title: `Shreve Vol ${vol} Ch ${ch} — ${title}`,
  author: "Steven Shreve",
  url: "https://link.springer.com/book/10.1007/978-0-387-22527-2",
});

const nn3b1b = (n: number, title: string): Resource => ({
  kind: "video",
  title: `3Blue1Brown — Neural Networks ${n}: ${title}`,
  author: "Grant Sanderson",
  url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
});

// ────────────────────────────────────────────────────────────
// Module 1: Linear Algebra Foundations
// ────────────────────────────────────────────────────────────

const linalgMl: Module = {
  id: "linalg-ml",
  tier: "I",
  title: "Linear Algebra Foundations",
  subtitle: "Vectors, matrices, and the geometry of Ax = b.",
  references: ["MIT 18.06", "MML Ch 2"],
  prerequisites: [],
  chapters: [
    {
      id: "vectors-spaces",
      title: "Vectors, Spaces & Independence",
      blurb:
        "Vectors as geometric objects, vector spaces, span, linear independence, basis.",
      lessons: [
        {
          id: "vectors-as-arrows",
          title: "Vectors as Geometric Objects",
          summary:
            "Three perspectives: arrow in $\\mathbb{R}^n$, list of numbers, abstract vector-space element. The geometric view is what unlocks intuition for everything later.",
          topics: ["arrows", "coordinates", "addition", "scalar multiplication"],
          hours: 1.5,
          resources: [
            eola(1, "Vectors, what even are they?"),
            mml("2.1", "Systems of linear equations"),
          ],
        },
        {
          id: "spans-bases",
          title: "Span, Linear Combinations & Basis",
          summary:
            "Span is all linear combinations $\\{c_1 \\mathbf v_1 + \\dots + c_k \\mathbf v_k\\}$. A basis is a minimal spanning set: every vector has a unique decomposition.",
          topics: ["span", "linear combination", "basis", "uniqueness"],
          hours: 1.5,
          resources: [
            eola(2, "Linear combinations, span, basis vectors"),
            mml("2.6", "Basis and rank"),
            strang("1", "The geometry of linear equations"),
          ],
        },
        {
          id: "independence",
          title: "Linear Independence",
          summary:
            "$\\{\\mathbf v_i\\}$ are independent iff $\\sum c_i \\mathbf v_i = 0$ implies all $c_i = 0$. Geometrically: no vector lies in the span of the others.",
          topics: ["independence", "rank", "redundancy"],
          hours: 1.5,
          resources: [
            eola(2, "Linear combinations, span, basis vectors"),
            strang("9", "Independence, basis, dimension"),
          ],
        },
        {
          id: "vector-spaces",
          title: "Vector Spaces & Subspaces",
          summary:
            "The 8 axioms. Subspaces are closed under addition and scalar multiplication. Examples: $\\mathbb{R}^n$, polynomial spaces, function spaces.",
          topics: ["axioms", "subspace", "closure", "examples"],
          hours: 1,
          resources: [
            mml("2.4", "Vector spaces"),
            strang("5", "Vector spaces and subspaces"),
          ],
        },
      ],
    },
    {
      id: "linear-maps",
      title: "Linear Maps & Matrices",
      blurb:
        "Matrices are linear transformations. The matrix-vector product is composition of basis vectors.",
      lessons: [
        {
          id: "linear-maps",
          title: "Linear Maps as Functions",
          summary:
            "A linear map $T : V \\to W$ satisfies $T(c \\mathbf v + \\mathbf w) = c T(\\mathbf v) + T(\\mathbf w)$. Determined entirely by its action on a basis.",
          topics: ["linearity", "image", "kernel"],
          hours: 1,
          resources: [
            eola(3, "Linear transformations and matrices"),
            mml("2.7", "Linear mappings"),
          ],
        },
        {
          id: "matrix-vector",
          title: "Matrix–Vector Products",
          summary:
            "$A\\mathbf x$ is a linear combination of the columns of $A$, weighted by the entries of $\\mathbf x$. This is the master interpretation.",
          topics: ["columns view", "row view", "Ax = b geometry"],
          hours: 1.5,
          resources: [
            eola(4, "Matrix multiplication as composition"),
            strang("1", "The geometry of linear equations"),
          ],
        },
        {
          id: "matrix-multiplication",
          title: "Matrix Multiplication & Composition",
          summary:
            "$AB$ is the matrix of $T_A \\circ T_B$. Non-commutative; associative. Block matrix multiplication.",
          topics: ["composition", "associativity", "block matrices"],
          hours: 1,
          resources: [
            eola(4, "Matrix multiplication as composition"),
            strang("3", "Multiplication and inverse matrices"),
          ],
        },
        {
          id: "elimination",
          title: "Gaussian Elimination & LU",
          summary:
            "Row operations factor $A = LU$. Pivots, free vs basic variables, the back-substitution loop.",
          topics: ["row reduction", "pivots", "LU factorisation"],
          hours: 1.5,
          resources: [
            strang("2", "Elimination with matrices"),
            strang("4", "Factorisation into A = LU"),
          ],
        },
      ],
    },
    {
      id: "four-subspaces",
      title: "The Four Fundamental Subspaces",
      blurb:
        "Column, row, null and left-null spaces — Strang's master diagram for understanding any matrix.",
      lessons: [
        {
          id: "column-row-space",
          title: "Column Space & Row Space",
          summary:
            "$C(A)$ = span of columns, $R(A)$ = $C(A^T)$. Both have the same dimension: the rank.",
          topics: ["column space", "row space", "rank"],
          hours: 1,
          resources: [
            strang("6", "Column space and nullspace"),
            mml("2.6", "Basis and rank"),
          ],
        },
        {
          id: "null-spaces",
          title: "Null Space & Left Null Space",
          summary:
            "$N(A) = \\{\\mathbf x : A\\mathbf x = 0\\}$. The left null space $N(A^T)$ is orthogonal complement of $C(A)$.",
          topics: ["null space", "homogeneous solutions", "rank-nullity"],
          hours: 1.5,
          resources: [
            strang("7", "Solving Ax = 0"),
            strang("8", "Solving Ax = b"),
          ],
        },
        {
          id: "rank-nullity",
          title: "The Rank–Nullity Theorem",
          summary:
            "$\\dim C(A) + \\dim N(A) = n$. Counts pivot vs free columns. The geometric heart of why $A\\mathbf x = \\mathbf b$ behaves the way it does.",
          topics: ["rank-nullity", "dimension counting"],
          hours: 1,
          resources: [
            strang("10", "The four fundamental subspaces"),
          ],
        },
        {
          id: "ax-b-solutions",
          title: "Ax = b: Existence & Uniqueness",
          summary:
            "Solution exists iff $\\mathbf b \\in C(A)$. Unique iff $N(A) = \\{0\\}$. Otherwise the solution set is $\\mathbf x_p + N(A)$.",
          topics: ["existence", "uniqueness", "particular solution"],
          hours: 1,
          resources: [
            strang("8", "Solving Ax = b"),
          ],
        },
      ],
    },
    {
      id: "change-basis",
      title: "Change of Basis",
      blurb:
        "Same vector, different coordinates. Same map, similar matrix. Why this matters everywhere.",
      lessons: [
        {
          id: "coordinates",
          title: "Coordinates in a Basis",
          summary:
            "A basis $\\mathcal B = \\{\\mathbf b_1, \\dots, \\mathbf b_n\\}$ assigns coordinates $[\\mathbf v]_{\\mathcal B}$ to every vector. Change-of-basis matrices translate between them.",
          topics: ["coordinates", "change-of-basis matrix"],
          hours: 1.5,
          resources: [
            eola(13, "Change of basis"),
            mml("2.7", "Linear mappings"),
          ],
        },
        {
          id: "similarity",
          title: "Similar Matrices",
          summary:
            "$A$ and $B = P^{-1} A P$ represent the same linear map in different bases. Similar matrices share rank, determinant, eigenvalues, trace.",
          topics: ["similarity", "invariants"],
          hours: 1,
          resources: [
            mml("2.7", "Linear mappings"),
          ],
        },
        {
          id: "applications",
          title: "Applications: PCA, Dynamics, Decoupling",
          summary:
            "The right basis makes problems simple: PCA picks the variance-maximising basis, normal modes diagonalise an oscillator, eigenbasis decouples linear dynamics.",
          topics: ["PCA preview", "modal analysis", "decoupling"],
          hours: 1,
          resources: [],
        },
      ],
    },
  ],
};

// ────────────────────────────────────────────────────────────
// Module 2: Eigenvalues, SVD & Decompositions
// ────────────────────────────────────────────────────────────

const eigenSvd: Module = {
  id: "eigen-svd",
  tier: "II",
  title: "Eigenvalues, SVD & Decompositions",
  subtitle: "How matrices break apart.",
  references: ["MIT 18.06", "MML Ch 3-4"],
  prerequisites: ["linalg-ml"],
  chapters: [
    {
      id: "eigen",
      title: "Eigenvalues & Eigenvectors",
      blurb:
        "Vectors that the matrix only stretches: $A\\mathbf v = \\lambda \\mathbf v$.",
      lessons: [
        {
          id: "eigen-definition",
          title: "Definition & Geometric Meaning",
          summary:
            "$A\\mathbf v = \\lambda \\mathbf v$ — directions that survive the transformation. The characteristic polynomial $\\det(A - \\lambda I) = 0$.",
          topics: ["eigenvalue", "eigenvector", "characteristic polynomial"],
          hours: 2,
          resources: [
            eola(14, "Eigenvectors and eigenvalues"),
            strang("21", "Eigenvalues and eigenvectors"),
            mml("4.2", "Eigenvalues and eigenvectors"),
          ],
        },
        {
          id: "computing-eigenvalues",
          title: "Computing Eigenvalues",
          summary:
            "Solve $\\det(A - \\lambda I) = 0$ for $\\lambda$, then $(A - \\lambda I) \\mathbf v = 0$ for $\\mathbf v$. Practical examples in $2 \\times 2$ and $3 \\times 3$.",
          topics: ["determinant", "examples", "complex eigenvalues"],
          hours: 1.5,
          resources: [
            strang("21", "Eigenvalues and eigenvectors"),
          ],
        },
        {
          id: "trace-determinant",
          title: "Trace, Determinant & Eigenvalues",
          summary:
            "$\\mathrm{tr}(A) = \\sum \\lambda_i$, $\\det(A) = \\prod \\lambda_i$. Quick checks and intuition.",
          topics: ["trace", "determinant", "invariants"],
          hours: 0.5,
          resources: [],
        },
        {
          id: "complex-symmetric",
          title: "Symmetric & Hermitian Matrices",
          summary:
            "Real symmetric matrices have real eigenvalues and orthogonal eigenvectors. The spectral theorem.",
          topics: ["symmetric", "spectral theorem", "real eigenvalues"],
          hours: 1.5,
          resources: [
            strang("25", "Symmetric matrices and positive definiteness"),
            mml("4.4", "Eigendecomposition and diagonalisation"),
          ],
        },
      ],
    },
    {
      id: "diagonalisation",
      title: "Diagonalisation",
      blurb:
        "When $A = PDP^{-1}$ exists, every linear-algebra problem about $A$ becomes trivial.",
      lessons: [
        {
          id: "when-diagonalisable",
          title: "When is A Diagonalisable?",
          summary:
            "$A$ is diagonalisable iff it has $n$ linearly independent eigenvectors. Equivalent to algebraic multiplicity = geometric multiplicity for every eigenvalue.",
          topics: ["multiplicity", "defective matrices"],
          hours: 1,
          resources: [
            strang("22", "Diagonalisation and powers of A"),
          ],
        },
        {
          id: "matrix-powers",
          title: "Matrix Powers via Eigendecomposition",
          summary:
            "$A^k = P D^k P^{-1}$ — exponentially faster than naive multiplication. Application: Fibonacci, Markov chain steady state.",
          topics: ["powers", "Fibonacci", "Markov chains"],
          hours: 1.5,
          resources: [
            strang("22", "Diagonalisation and powers of A"),
            strang("23", "Differential equations and exp(At)"),
          ],
        },
        {
          id: "matrix-exponential",
          title: "Matrix Exponential",
          summary:
            "$e^{At} = \\sum_k \\frac{(At)^k}{k!}$. Solves $\\dot{\\mathbf x} = A\\mathbf x$. Computed via eigenvalues when diagonalisable.",
          topics: ["exp(At)", "linear ODE solutions"],
          hours: 1,
          resources: [
            strang("23", "Differential equations and exp(At)"),
          ],
        },
      ],
    },
    {
      id: "svd",
      title: "Singular Value Decomposition",
      blurb:
        "Every matrix factors as $A = U \\Sigma V^T$ — the most useful decomposition in applied math.",
      lessons: [
        {
          id: "svd-geometry",
          title: "SVD: Geometric Picture",
          summary:
            "Every linear map = rotation × stretch × rotation. $V^T$ rotates input, $\\Sigma$ stretches along axes, $U$ rotates output.",
          topics: ["geometric SVD", "singular values"],
          hours: 1.5,
          resources: [
            strang("29", "Singular value decomposition"),
            mml("4.5", "Singular value decomposition"),
          ],
        },
        {
          id: "svd-construction",
          title: "Building U, Σ, V",
          summary:
            "Eigenvectors of $A^T A$ give $V$, eigenvectors of $AA^T$ give $U$, square roots of shared eigenvalues give $\\Sigma$.",
          topics: ["construction", "uniqueness"],
          hours: 1.5,
          resources: [
            strang("29", "Singular value decomposition"),
          ],
        },
        {
          id: "low-rank",
          title: "Low-Rank Approximation & Eckart–Young",
          summary:
            "Truncating SVD to top $k$ singular values gives the best rank-$k$ approximation in Frobenius and spectral norms. Foundation of PCA, recommender systems, image compression.",
          topics: ["Eckart–Young", "rank-k approximation", "truncated SVD"],
          hours: 2,
          resources: [
            mml("4.6", "Matrix approximation"),
            strang("30", "Linear transformations and their matrices"),
          ],
        },
        {
          id: "pseudoinverse",
          title: "Pseudoinverse & Least Squares",
          summary:
            "$A^+ = V \\Sigma^+ U^T$ generalises inversion to non-square / singular matrices. The least-squares solution to $A\\mathbf x = \\mathbf b$ is $\\mathbf x = A^+ \\mathbf b$.",
          topics: ["Moore–Penrose", "minimum-norm solution"],
          hours: 1.5,
          resources: [],
        },
      ],
    },
    {
      id: "projections-qr",
      title: "Projections, Gram-Schmidt & QR",
      blurb:
        "Orthogonal projection is the geometry of least squares. QR is its computational form.",
      lessons: [
        {
          id: "projections",
          title: "Orthogonal Projection",
          summary:
            "Project $\\mathbf b$ onto $C(A)$: $\\hat{\\mathbf b} = A(A^T A)^{-1} A^T \\mathbf b$. Geometric meaning: closest point in the column space.",
          topics: ["projection matrix", "orthogonal complement"],
          hours: 1.5,
          resources: [
            strang("15", "Projections onto subspaces"),
            mml("3.8", "Orthogonal projections"),
          ],
        },
        {
          id: "gram-schmidt",
          title: "Gram-Schmidt Orthogonalisation",
          summary:
            "Convert any basis into an orthonormal one by subtracting projections. Numerically unstable in naive form; modified Gram-Schmidt fixes this.",
          topics: ["Gram-Schmidt", "orthonormalisation"],
          hours: 1.5,
          resources: [
            strang("17", "Orthogonal matrices and Gram-Schmidt"),
          ],
        },
        {
          id: "qr-decomposition",
          title: "QR Decomposition",
          summary:
            "$A = QR$ with $Q$ orthonormal columns and $R$ upper-triangular. The right way to solve least-squares numerically.",
          topics: ["QR", "Householder reflections", "Givens rotations"],
          hours: 1,
          resources: [
            strang("17", "Orthogonal matrices and Gram-Schmidt"),
          ],
        },
      ],
    },
  ],
};

// ────────────────────────────────────────────────────────────
// Module 3: Matrix Calculus & Least Squares
// ────────────────────────────────────────────────────────────

const matrixCalc: Module = {
  id: "matrix-calc",
  tier: "III",
  title: "Matrix Calculus & Least Squares",
  subtitle: "Gradients, Jacobians, the OLS workhorse.",
  references: ["MML Ch 5", "Strang lectures 15-20"],
  prerequisites: ["linalg-ml"],
  chapters: [
    {
      id: "gradients",
      title: "Gradients & Jacobians",
      blurb:
        "How functions change in many directions at once.",
      lessons: [
        {
          id: "partials-gradient",
          title: "Partial Derivatives & the Gradient",
          summary:
            "$\\nabla f = (\\partial f / \\partial x_1, \\dots, \\partial f / \\partial x_n)^T$. Direction of steepest ascent. Tangent plane to a level set.",
          topics: ["partials", "gradient", "level sets"],
          hours: 1,
          resources: [
            mml("5.2", "Differentiation of univariate functions"),
            mml("5.4", "Gradients of vector-valued functions"),
          ],
        },
        {
          id: "jacobian",
          title: "The Jacobian",
          summary:
            "For $\\mathbf f : \\mathbb R^n \\to \\mathbb R^m$, the Jacobian $J$ is the $m \\times n$ matrix of partials. Linearises $\\mathbf f$ near a point.",
          topics: ["Jacobian", "linearisation", "chain rule"],
          hours: 1.5,
          resources: [
            mml("5.4", "Gradients of vector-valued functions"),
          ],
        },
        {
          id: "hessian",
          title: "The Hessian & Second-Order Behaviour",
          summary:
            "Symmetric matrix of second partials. Eigenvalues classify critical points: positive-def → minimum, negative-def → maximum, indefinite → saddle.",
          topics: ["Hessian", "second-order conditions", "convexity"],
          hours: 1.5,
          resources: [
            mml("5.5", "Gradients of matrices"),
          ],
        },
      ],
    },
    {
      id: "matrix-derivatives",
      title: "Matrix Calculus Identities",
      blurb:
        "The everyday vocabulary: $\\partial/\\partial \\mathbf x$ of common forms.",
      lessons: [
        {
          id: "layout-conventions",
          title: "Layout: Numerator vs Denominator",
          summary:
            "Two opposite conventions for arranging derivatives. Pick one and stick with it. We use denominator layout (gradient is a column).",
          topics: ["layout", "convention"],
          hours: 0.5,
          resources: [],
        },
        {
          id: "common-derivatives",
          title: "Common Derivatives",
          summary:
            "$\\nabla_{\\mathbf x} (\\mathbf a^T \\mathbf x) = \\mathbf a$. $\\nabla_{\\mathbf x} (\\mathbf x^T A \\mathbf x) = (A + A^T)\\mathbf x$. $\\nabla_{\\mathbf x} \\|\\mathbf x\\|^2 = 2\\mathbf x$.",
          topics: ["linear", "quadratic", "norm derivatives"],
          hours: 1.5,
          resources: [
            mml("5.5", "Gradients of matrices"),
            {
              kind: "article",
              title: "The Matrix Cookbook",
              author: "Petersen & Pedersen",
              url: "https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf",
              note: "Reference for every matrix derivative you'll ever need.",
            },
          ],
        },
        {
          id: "chain-rule",
          title: "The Chain Rule for Backprop",
          summary:
            "$\\frac{\\partial L}{\\partial \\mathbf x} = J^T \\frac{\\partial L}{\\partial \\mathbf y}$ for $\\mathbf y = f(\\mathbf x)$. The mechanism behind every neural-network gradient.",
          topics: ["chain rule", "backprop intuition"],
          hours: 1,
          resources: [
            nn3b1b(3, "What is backpropagation really doing?"),
            nn3b1b(4, "Backpropagation calculus"),
          ],
        },
      ],
    },
    {
      id: "least-squares",
      title: "Least Squares & Normal Equations",
      blurb:
        "$\\min \\|A\\boldsymbol\\beta - \\mathbf y\\|^2$ — the workhorse of statistics and machine learning.",
      lessons: [
        {
          id: "ols-derivation",
          title: "Deriving the Normal Equations",
          summary:
            "Minimise $\\|\\mathbf y - X\\boldsymbol\\beta\\|^2$. Setting gradient to zero gives $X^T X \\boldsymbol\\beta = X^T \\mathbf y$, so $\\hat{\\boldsymbol\\beta} = (X^T X)^{-1} X^T \\mathbf y$.",
          topics: ["normal equations", "OLS", "calculus derivation"],
          hours: 2,
          resources: [
            strang("16", "Projection matrices and least squares"),
            mml("9.2", "Parameter estimation"),
          ],
        },
        {
          id: "ols-geometry",
          title: "Geometric View: Projection",
          summary:
            "OLS = orthogonal projection of $\\mathbf y$ onto $C(X)$. Residuals lie in $C(X)^\\perp$.",
          topics: ["projection", "residuals"],
          hours: 1,
          resources: [
            strang("15", "Projections onto subspaces"),
          ],
        },
        {
          id: "ols-as-mle",
          title: "OLS = MLE under Gaussian Noise",
          summary:
            "If $y_i = \\mathbf x_i^T \\boldsymbol\\beta + \\varepsilon_i$ with $\\varepsilon_i \\sim N(0, \\sigma^2)$, the maximum-likelihood estimate of $\\boldsymbol\\beta$ is exactly the OLS estimate.",
          topics: ["MLE", "Gaussian noise", "probabilistic reframing"],
          hours: 1.5,
          resources: [
            mml("9.3", "Bayesian linear regression"),
            murphy("11", "Linear regression"),
          ],
        },
        {
          id: "complexity-singularity",
          title: "Complexity & Singularity Conditions",
          summary:
            "Solving costs $O(n^3)$ via direct factorisation, $O(n^2)$ per iteration with QR/conjugate gradient. $X^T X$ singular iff columns linearly dependent or $p > n$.",
          topics: ["computational cost", "rank deficiency", "regularisation preview"],
          hours: 1,
          resources: [],
        },
      ],
    },
  ],
};

// ────────────────────────────────────────────────────────────
// Module 4: Probability Foundations
// ────────────────────────────────────────────────────────────

const probFoundations: Module = {
  id: "prob-foundations",
  tier: "IV",
  title: "Probability Foundations",
  subtitle: "From sample spaces to the Central Limit Theorem.",
  references: ["Blitzstein", "Wasserman 1-5", "MML Ch 6", "Stat 110"],
  prerequisites: [],
  chapters: [
    {
      id: "axioms-bayes",
      title: "Sample Spaces & Bayes",
      blurb:
        "Probability axioms, conditional probability, the Bayes-rule cornerstone.",
      lessons: [
        {
          id: "axioms",
          title: "Sample Spaces & Axioms",
          summary:
            "$\\Omega$ = sample space, events are subsets. Three axioms: nonneg, $P(\\Omega) = 1$, countable additivity.",
          topics: ["sample space", "events", "axioms"],
          hours: 1,
          resources: [
            blitzstein("1", "Probability and counting"),
            stat110("1", "Probability and counting"),
            wasserman("1", "Probability"),
          ],
        },
        {
          id: "conditional",
          title: "Conditional Probability & Independence",
          summary:
            "$P(A | B) = P(A \\cap B) / P(B)$. Independence: $P(A \\cap B) = P(A) P(B)$. Conditioning is everything.",
          topics: ["conditional", "independence", "law of total probability"],
          hours: 1.5,
          resources: [
            blitzstein("2", "Conditional probability"),
            stat110("3", "Birthday problem, properties of probability"),
          ],
        },
        {
          id: "bayes-rule",
          title: "Bayes' Theorem",
          summary:
            "$P(A | B) = P(B | A) P(A) / P(B)$. Re-expressed as posterior $\\propto$ likelihood $\\times$ prior.",
          topics: ["Bayes' theorem", "posterior", "prior"],
          hours: 1.5,
          resources: [
            blitzstein("2", "Conditional probability"),
            mml("6.3", "Sum rule, product rule, Bayes' theorem"),
          ],
        },
        {
          id: "examples",
          title: "Worked Examples: Disease Tests, Monty Hall",
          summary:
            "Classic Bayes problems where intuition fails. Build the table, compute the answer.",
          topics: ["disease testing", "Monty Hall", "base-rate fallacy"],
          hours: 1,
          resources: [],
        },
      ],
    },
    {
      id: "discrete-continuous",
      title: "Discrete & Continuous Distributions",
      blurb:
        "Bernoulli, Binomial, Poisson, Geometric — Normal, Exponential, Gamma, Beta.",
      lessons: [
        {
          id: "discrete-rvs",
          title: "Discrete Random Variables",
          summary:
            "PMF $p(x) = P(X = x)$, CDF $F(x) = P(X \\le x)$. Expectation, variance, examples.",
          topics: ["PMF", "expectation", "variance"],
          hours: 1.5,
          resources: [
            blitzstein("3", "Random variables and their distributions"),
            stat110("5", "Random variables, mean, variance"),
          ],
        },
        {
          id: "bernoulli-binomial",
          title: "Bernoulli, Binomial, Geometric",
          summary:
            "$X \\sim \\mathrm{Bern}(p)$, $\\mathrm{Bin}(n,p)$, $\\mathrm{Geom}(p)$. Formulas, intuition, when each arises.",
          topics: ["Bernoulli", "Binomial", "Geometric"],
          hours: 1,
          resources: [
            blitzstein("4", "Expectation"),
            stat110("6", "Bernoulli/Binomial, Hypergeometric"),
          ],
        },
        {
          id: "poisson",
          title: "Poisson Process",
          summary:
            "$X \\sim \\mathrm{Poisson}(\\lambda)$ models rare-event counts. Arises as limit of $\\mathrm{Bin}(n, \\lambda/n)$.",
          topics: ["Poisson", "rare events", "limit of binomial"],
          hours: 1,
          resources: [
            stat110("12", "Poisson distribution"),
          ],
        },
        {
          id: "continuous-rvs",
          title: "Continuous Random Variables",
          summary:
            "PDF $f(x)$, CDF $F(x)$. Probability of an interval = integral of PDF. Care: $P(X = x) = 0$.",
          topics: ["PDF", "CDF", "continuous"],
          hours: 1.5,
          resources: [
            blitzstein("5", "Continuous random variables"),
            stat110("13", "Normal distribution"),
          ],
        },
        {
          id: "normal-gamma-beta",
          title: "Normal, Exponential, Gamma, Beta",
          summary:
            "$N(\\mu, \\sigma^2)$, $\\mathrm{Exp}(\\lambda)$, $\\mathrm{Gamma}$, $\\mathrm{Beta}$. The continuous workhorses.",
          topics: ["Normal", "Exponential", "Gamma", "Beta"],
          hours: 1.5,
          resources: [
            blitzstein("8", "Transformations"),
            mml("6.5", "Gaussian distribution"),
          ],
        },
      ],
    },
    {
      id: "joint-distributions",
      title: "Joint Distributions & Independence",
      blurb:
        "Multiple random variables: joint, marginal, conditional, covariance.",
      lessons: [
        {
          id: "joint-marginal",
          title: "Joint & Marginal Distributions",
          summary:
            "$f(x, y)$, marginals via integration. Independence: $f(x, y) = f_X(x) f_Y(y)$.",
          topics: ["joint", "marginal", "independence"],
          hours: 1.5,
          resources: [
            blitzstein("7", "Joint distributions"),
            stat110("16", "Exponential distribution, MGFs"),
          ],
        },
        {
          id: "covariance-correlation",
          title: "Covariance & Correlation",
          summary:
            "$\\mathrm{Cov}(X, Y) = E[XY] - E[X]E[Y]$. Correlation $\\rho = \\mathrm{Cov}/(\\sigma_X \\sigma_Y) \\in [-1, 1]$.",
          topics: ["covariance", "correlation", "linearity"],
          hours: 1,
          resources: [
            blitzstein("7", "Joint distributions"),
          ],
        },
        {
          id: "multivariate-normal",
          title: "Multivariate Normal",
          summary:
            "$\\mathbf X \\sim N(\\boldsymbol\\mu, \\Sigma)$. Linear combinations stay Gaussian. Conditional distributions are Gaussian.",
          topics: ["MVN", "covariance matrix", "conditional MVN"],
          hours: 1.5,
          resources: [
            mml("6.5", "Gaussian distribution"),
          ],
        },
        {
          id: "transformations",
          title: "Transformations & Convolutions",
          summary:
            "$Y = g(X)$: change of variable formula with Jacobian. Sum of independent r.v.s ↔ convolution.",
          topics: ["change of variable", "convolution"],
          hours: 1,
          resources: [
            blitzstein("8", "Transformations"),
          ],
        },
      ],
    },
    {
      id: "mgf-clt",
      title: "MGFs & Limit Theorems",
      blurb:
        "Moment-generating functions, Law of Large Numbers, Central Limit Theorem.",
      lessons: [
        {
          id: "mgf",
          title: "Moment Generating Functions",
          summary:
            "$M_X(t) = E[e^{tX}]$. Generates moments, characterises distribution, simplifies sums.",
          topics: ["MGF", "characteristic function", "moments"],
          hours: 1.5,
          resources: [
            blitzstein("6", "Moments"),
            stat110("16", "Exponential distribution, MGFs"),
          ],
        },
        {
          id: "lln",
          title: "Law of Large Numbers",
          summary:
            "$\\bar X_n \\to E[X]$ in probability (weak LLN) and almost surely (strong LLN). The empirical-mean stability.",
          topics: ["weak LLN", "strong LLN"],
          hours: 1,
          resources: [
            blitzstein("10", "Inequalities and limit theorems"),
            wasserman("5", "Convergence of random variables"),
          ],
        },
        {
          id: "clt",
          title: "Central Limit Theorem",
          summary:
            "$\\sqrt n (\\bar X_n - \\mu) \\to N(0, \\sigma^2)$. Why Gaussian is everywhere. Conditions for CLT to apply.",
          topics: ["CLT", "convergence in distribution", "normality"],
          hours: 1.5,
          resources: [
            blitzstein("10", "Inequalities and limit theorems"),
            stat110("25", "Order statistics, conditional expectation"),
          ],
        },
      ],
    },
  ],
};

// ────────────────────────────────────────────────────────────
// Module 5: Statistical Inference
// ────────────────────────────────────────────────────────────

const statInference: Module = {
  id: "stat-inference",
  tier: "V",
  title: "Statistical Inference",
  subtitle: "MLE, hypothesis tests, the bootstrap.",
  references: ["Wasserman 9-10", "Murphy Ch 4"],
  prerequisites: ["prob-foundations"],
  chapters: [
    {
      id: "mle",
      title: "Maximum Likelihood Estimation",
      blurb:
        "Pick the parameter that makes the data most likely.",
      lessons: [
        {
          id: "likelihood-function",
          title: "The Likelihood Function",
          summary:
            "$L(\\theta; \\mathbf x) = \\prod_i p(x_i | \\theta)$. Read as a function of $\\theta$ for fixed data — not a probability!",
          topics: ["likelihood", "log-likelihood"],
          hours: 1,
          resources: [
            wasserman("9", "Parametric inference"),
          ],
        },
        {
          id: "mle-examples",
          title: "MLE Examples",
          summary:
            "Bernoulli: $\\hat p = \\bar x$. Normal: $\\hat \\mu = \\bar x$, $\\hat \\sigma^2 = \\overline{(x - \\bar x)^2}$. Exponential: $\\hat \\lambda = 1/\\bar x$.",
          topics: ["worked examples", "Bernoulli", "Normal", "Exponential"],
          hours: 1.5,
          resources: [
            wasserman("9", "Parametric inference"),
            murphy("4", "Statistical inference"),
          ],
        },
        {
          id: "mle-properties",
          title: "Properties of MLE",
          summary:
            "Consistency, asymptotic normality, asymptotic efficiency. The CRLB-attaining estimator (when it exists).",
          topics: ["consistency", "asymptotic normality", "efficiency"],
          hours: 1.5,
          resources: [
            wasserman("9", "Parametric inference"),
          ],
        },
        {
          id: "method-of-moments",
          title: "Method of Moments — Quick Comparison",
          summary:
            "Match sample moments to population moments. Often easier; usually less efficient than MLE.",
          topics: ["method of moments", "trade-offs"],
          hours: 0.5,
          resources: [],
        },
      ],
    },
    {
      id: "fisher-information",
      title: "Fisher Information & Cramér–Rao",
      blurb:
        "How much an estimator can theoretically know.",
      lessons: [
        {
          id: "score-function",
          title: "Score Function & Fisher Information",
          summary:
            "Score: $U(\\theta) = \\partial \\log L / \\partial \\theta$. Fisher info: $I(\\theta) = -E[\\partial^2 \\log L / \\partial \\theta^2]$.",
          topics: ["score", "Fisher information"],
          hours: 1.5,
          resources: [
            wasserman("9", "Parametric inference"),
          ],
        },
        {
          id: "cramer-rao",
          title: "Cramér–Rao Lower Bound",
          summary:
            "$\\mathrm{Var}(\\hat \\theta) \\ge 1 / I(\\theta)$ for any unbiased estimator. MLE attains it asymptotically.",
          topics: ["CRLB", "efficiency", "asymptotic variance"],
          hours: 1,
          resources: [],
        },
        {
          id: "asymptotic-distribution",
          title: "Asymptotic Distribution of MLE",
          summary:
            "$\\sqrt n (\\hat \\theta_{\\mathrm{MLE}} - \\theta_0) \\to N(0, I(\\theta_0)^{-1})$. Foundation for confidence intervals.",
          topics: ["asymptotic normality", "Wald confidence intervals"],
          hours: 1.5,
          resources: [
            wasserman("9", "Parametric inference"),
          ],
        },
      ],
    },
    {
      id: "hypothesis-testing",
      title: "Hypothesis Testing & p-values",
      blurb:
        "Frame the question, pick a test, interpret the p-value correctly.",
      lessons: [
        {
          id: "null-alternative",
          title: "Null & Alternative Hypotheses",
          summary:
            "$H_0$ vs $H_1$. Type I error (reject true $H_0$, prob $\\alpha$), Type II error (fail to reject false $H_0$, prob $\\beta$). Power = $1 - \\beta$.",
          topics: ["H0", "H1", "Type I & II", "power"],
          hours: 1,
          resources: [
            wasserman("10", "Hypothesis testing and p-values"),
            blitzstein("9", "Conditional expectation"),
          ],
        },
        {
          id: "p-values",
          title: "p-values & Common Tests",
          summary:
            "$p$ = probability of observing data this extreme under $H_0$. NOT $P(H_0 | \\text{data})$. $z$-test, $t$-test, $\\chi^2$-test.",
          topics: ["p-value", "z-test", "t-test"],
          hours: 1.5,
          resources: [
            wasserman("10", "Hypothesis testing and p-values"),
          ],
        },
        {
          id: "likelihood-ratio",
          title: "Likelihood Ratio Test",
          summary:
            "$\\Lambda = \\sup_{\\Theta_0} L / \\sup_\\Theta L$. Wilks: $-2 \\log \\Lambda \\to \\chi^2$. The all-purpose test.",
          topics: ["LRT", "Wilks' theorem"],
          hours: 1,
          resources: [
            wasserman("10", "Hypothesis testing and p-values"),
          ],
        },
        {
          id: "ci-bootstrap",
          title: "Confidence Intervals & Bootstrap",
          summary:
            "Wald CI, percentile CI. Bootstrap: resample with replacement, computer-power your way to CIs without distributional assumptions.",
          topics: ["confidence interval", "bootstrap", "resampling"],
          hours: 1.5,
          resources: [
            wasserman("8", "The bootstrap"),
          ],
        },
      ],
    },
    {
      id: "bayesian-inference",
      title: "Bayesian Inference & MAP",
      blurb:
        "Encoding prior beliefs and updating them with data.",
      lessons: [
        {
          id: "bayesian-framework",
          title: "Prior, Likelihood, Posterior",
          summary:
            "$p(\\theta | \\mathcal D) \\propto p(\\mathcal D | \\theta) p(\\theta)$. Conjugate priors keep posterior in same family.",
          topics: ["prior", "posterior", "conjugate"],
          hours: 1.5,
          resources: [
            murphy("4", "Statistical inference"),
            mml("8", "When models meet data"),
          ],
        },
        {
          id: "map",
          title: "MAP Estimation",
          summary:
            "$\\hat \\theta_{\\mathrm{MAP}} = \\arg\\max p(\\theta | \\mathcal D) = \\arg\\max [\\log p(\\mathcal D | \\theta) + \\log p(\\theta)]$. Generalises MLE; reduces to ridge / lasso for Gaussian / Laplace prior.",
          topics: ["MAP", "regularisation", "Bayesian regression"],
          hours: 1.5,
          resources: [
            murphy("11", "Linear regression"),
          ],
        },
        {
          id: "credible-intervals",
          title: "Credible vs Confidence Intervals",
          summary:
            "Bayesian credible interval: $P(\\theta \\in [a, b] | \\text{data}) = 0.95$. Frequentist confidence interval: 95% of CIs (over repeated sampling) contain $\\theta$. Different objects.",
          topics: ["credible interval", "interpretation"],
          hours: 1,
          resources: [],
        },
      ],
    },
  ],
};

// ────────────────────────────────────────────────────────────
// Module 6: Machine Learning
// ────────────────────────────────────────────────────────────

const mlFundamentals: Module = {
  id: "ml-fundamentals",
  tier: "VI",
  title: "Machine Learning",
  subtitle: "Regression, classification, PCA — all probabilistic.",
  references: ["MML Ch 9-10", "Murphy"],
  prerequisites: ["matrix-calc", "stat-inference"],
  chapters: [
    {
      id: "linear-regression",
      title: "Linear Regression",
      blurb:
        "OLS, ridge, lasso — all from a single probabilistic perspective.",
      lessons: [
        {
          id: "ols-revisit",
          title: "OLS as MLE (revisit)",
          summary:
            "$\\mathbf y = X\\boldsymbol\\beta + \\boldsymbol\\varepsilon$, $\\boldsymbol\\varepsilon \\sim N(0, \\sigma^2 I)$. MLE = OLS.",
          topics: ["OLS", "MLE", "Gaussian noise"],
          hours: 1,
          resources: [
            mml("9", "Linear regression"),
            murphy("11", "Linear regression"),
          ],
        },
        {
          id: "ridge",
          title: "Ridge Regression",
          summary:
            "Add $\\lambda \\|\\boldsymbol\\beta\\|^2$ penalty. MAP estimate with Gaussian prior $\\boldsymbol\\beta \\sim N(0, \\sigma^2/\\lambda \\cdot I)$.",
          topics: ["ridge", "L2 regularisation", "Bayesian view"],
          hours: 1.5,
          resources: [
            mml("9.2", "Parameter estimation"),
            murphy("11.3", "Ridge regression"),
          ],
        },
        {
          id: "lasso",
          title: "Lasso & Sparse Regression",
          summary:
            "L1 penalty $\\lambda \\|\\boldsymbol\\beta\\|_1$. Forces sparse solutions. MAP under Laplace prior.",
          topics: ["lasso", "L1 regularisation", "sparsity"],
          hours: 1,
          resources: [
            murphy("11.4", "Lasso regression"),
          ],
        },
        {
          id: "bayesian-regression",
          title: "Bayesian Linear Regression",
          summary:
            "Full posterior over $\\boldsymbol\\beta$, not just point estimate. Predictive distribution accounts for parameter uncertainty.",
          topics: ["posterior", "predictive distribution"],
          hours: 1.5,
          resources: [
            mml("9.3", "Bayesian linear regression"),
          ],
        },
      ],
    },
    {
      id: "logistic-softmax",
      title: "Logistic Regression & Softmax",
      blurb:
        "Classification via probabilistic likelihood — and why cross-entropy is just NLL.",
      lessons: [
        {
          id: "logistic-regression",
          title: "Logistic Regression: Binary Classification",
          summary:
            "$P(y = 1 | \\mathbf x) = \\sigma(\\mathbf w^T \\mathbf x)$ where $\\sigma(z) = 1/(1+e^{-z})$. NLL is the convex loss.",
          topics: ["sigmoid", "NLL", "binary classification"],
          hours: 1.5,
          resources: [
            murphy("10", "Logistic regression"),
            mml("8", "When models meet data"),
          ],
        },
        {
          id: "softmax-multiclass",
          title: "Softmax: Multi-class Classification",
          summary:
            "$P(y = k | \\mathbf x) = e^{\\mathbf w_k^T \\mathbf x} / \\sum_j e^{\\mathbf w_j^T \\mathbf x}$. Generalisation of sigmoid.",
          topics: ["softmax", "categorical distribution"],
          hours: 1,
          resources: [
            murphy("10", "Logistic regression"),
          ],
        },
        {
          id: "ce-as-nll",
          title: "Cross-Entropy as NLL of Categorical",
          summary:
            "$L_{\\mathrm{CE}} = -\\sum_k y_k \\log \\hat p_k$. This IS the NLL of the categorical model. Drill this — it's the most-asked interview question.",
          topics: ["cross-entropy", "NLL", "categorical likelihood"],
          hours: 1.5,
          resources: [
            murphy("10", "Logistic regression"),
          ],
        },
      ],
    },
    {
      id: "pca",
      title: "Principal Component Analysis",
      blurb:
        "Dimensionality reduction by variance maximisation. Covariance eigendecomp at heart.",
      lessons: [
        {
          id: "pca-derivation",
          title: "PCA from Variance Maximisation",
          summary:
            "Find direction $\\mathbf w$ maximising $\\mathrm{Var}(\\mathbf w^T \\mathbf X)$ subject to $\\|\\mathbf w\\| = 1$. Solution: top eigenvector of covariance matrix.",
          topics: ["variance maximisation", "Lagrange multipliers"],
          hours: 1.5,
          resources: [
            mml("10", "Dimensionality reduction with PCA"),
            murphy("20", "Dimensionality reduction"),
          ],
        },
        {
          id: "pca-via-svd",
          title: "PCA via SVD",
          summary:
            "Compute SVD $X = U \\Sigma V^T$. Right singular vectors = principal components. More numerically stable than eigendecomposition.",
          topics: ["SVD", "principal components", "numerical stability"],
          hours: 1,
          resources: [
            mml("10", "Dimensionality reduction with PCA"),
          ],
        },
        {
          id: "pca-applications",
          title: "Applications & Pitfalls",
          summary:
            "Reconstruction, visualisation, decorrelation. Pitfalls: scale-sensitive (always centre and standardise), assumes linearity.",
          topics: ["reconstruction", "scaling", "limitations"],
          hours: 1,
          resources: [],
        },
      ],
    },
    {
      id: "loss-functions",
      title: "Loss Functions & their Probabilistic Interpretations",
      blurb:
        "Every loss is the NLL of some probabilistic model. Memorise the dictionary.",
      lessons: [
        {
          id: "regression-losses",
          title: "MSE, MAE, Huber",
          summary:
            "MSE = NLL of Gaussian noise. MAE = NLL of Laplace noise. Huber = MSE near zero, MAE for outliers.",
          topics: ["MSE", "MAE", "Huber loss"],
          hours: 1,
          resources: [
            murphy("8", "Linear models"),
          ],
        },
        {
          id: "classification-losses",
          title: "Cross-Entropy, Hinge, Focal",
          summary:
            "Cross-entropy = NLL of categorical. Hinge = SVM. Focal = down-weights easy examples.",
          topics: ["cross-entropy", "hinge", "focal"],
          hours: 1,
          resources: [],
        },
        {
          id: "kl-divergence",
          title: "KL Divergence",
          summary:
            "$D_{KL}(p \\| q) = \\sum p \\log(p/q)$. Asymmetric. Cross-entropy = entropy + $D_{KL}$.",
          topics: ["KL divergence", "entropy", "information theory"],
          hours: 1,
          resources: [
            murphy("6", "Information theory"),
          ],
        },
      ],
    },
  ],
};

// ────────────────────────────────────────────────────────────
// Module 7: Stochastic Calculus
// ────────────────────────────────────────────────────────────

const stochCalc: Module = {
  id: "stoch-calc",
  tier: "VII",
  title: "Stochastic Calculus",
  subtitle: "Brownian motion, Itô, and the math of price diffusion.",
  references: ["Shreve Vol I-II"],
  prerequisites: ["prob-foundations"],
  chapters: [
    {
      id: "brownian-motion",
      title: "Brownian Motion",
      blurb:
        "The continuous-time random walk. Building block of every stochastic model in finance.",
      lessons: [
        {
          id: "bm-definition",
          title: "Definition & Basic Properties",
          summary:
            "$W_t$ is BM if: $W_0 = 0$, increments are independent and Gaussian $W_t - W_s \\sim N(0, t-s)$, paths are continuous.",
          topics: ["BM definition", "increments", "continuity"],
          hours: 1.5,
          resources: [
            shreve("II", "3", "Brownian motion"),
          ],
        },
        {
          id: "bm-paths",
          title: "Path Properties: Nowhere-Differentiable & More",
          summary:
            "Brownian paths are continuous but nowhere differentiable. Quadratic variation: $\\sum (W_{t_{i+1}} - W_{t_i})^2 \\to t$.",
          topics: ["non-differentiable paths", "quadratic variation"],
          hours: 1,
          resources: [
            shreve("II", "3", "Brownian motion"),
          ],
        },
        {
          id: "discrete-intuition",
          title: "Discrete Intuition: Random Walks",
          summary:
            "Symmetric random walk $S_n = \\sum X_i$, $X_i \\in \\{-1, +1\\}$. Scaled limit converges to BM (Donsker's theorem).",
          topics: ["random walk", "scaling limit"],
          hours: 1,
          resources: [
            shreve("I", "1", "The binomial no-arbitrage pricing model"),
          ],
        },
      ],
    },
    {
      id: "ito",
      title: "Itô Integral & Itô's Lemma",
      blurb:
        "How to integrate against Brownian motion — the chain rule that absolutely matters.",
      lessons: [
        {
          id: "ito-integral",
          title: "Constructing the Itô Integral",
          summary:
            "$\\int_0^t \\sigma_s \\, dW_s$ as $L^2$-limit of simple-process integrals. Doesn't follow ordinary calculus rules.",
          topics: ["Itô integral", "isometry"],
          hours: 1.5,
          resources: [
            shreve("II", "4", "Stochastic calculus"),
          ],
        },
        {
          id: "ito-lemma",
          title: "Itô's Lemma",
          summary:
            "For $f(t, X_t)$ with $dX_t = \\mu \\, dt + \\sigma \\, dW_t$: $df = \\partial_t f \\, dt + \\partial_x f \\, dX + \\tfrac{1}{2} \\partial_{xx} f \\sigma^2 \\, dt$. The extra second-derivative term is the soul of stochastic calculus.",
          topics: ["Itô's lemma", "second-order term"],
          hours: 2,
          resources: [
            shreve("II", "4", "Stochastic calculus"),
          ],
        },
        {
          id: "geometric-bm",
          title: "Geometric Brownian Motion",
          summary:
            "$dS_t = \\mu S_t \\, dt + \\sigma S_t \\, dW_t$. By Itô: $S_t = S_0 e^{(\\mu - \\sigma^2/2)t + \\sigma W_t}$. Black-Scholes' price model.",
          topics: ["GBM", "lognormal", "Black-Scholes preview"],
          hours: 1.5,
          resources: [
            shreve("II", "4", "Stochastic calculus"),
          ],
        },
        {
          id: "sde-applications",
          title: "Common SDEs in Finance",
          summary:
            "Ornstein-Uhlenbeck (mean-reverting), CIR (interest rates), Heston (stochastic vol). Recognise them on sight.",
          topics: ["OU", "CIR", "Heston"],
          hours: 1,
          resources: [],
        },
      ],
    },
    {
      id: "hawkes",
      title: "Hawkes Processes & Long Memory",
      blurb:
        "Self-exciting point processes — the right model for order arrivals.",
      lessons: [
        {
          id: "hawkes-definition",
          title: "Hawkes Processes",
          summary:
            "Intensity $\\lambda(t) = \\mu + \\sum_{t_i < t} \\phi(t - t_i)$. Past events make future events more likely. Branching ratio $n = \\int \\phi$ controls criticality.",
          topics: ["Hawkes intensity", "branching ratio", "criticality"],
          hours: 1.5,
          resources: [
            tqp("5", "Hawkes processes"),
            tqp("6", "Branching ratio and reflexivity"),
          ],
        },
        {
          id: "long-memory",
          title: "Long Memory & Fractional BM",
          summary:
            "Order-flow autocorrelation decays as power law, not exponentially. Fractional BM $W_t^H$ with Hurst $H > 1/2$ captures this.",
          topics: ["long memory", "fractional BM", "Hurst exponent"],
          hours: 1,
          resources: [
            tqp("8", "Order-flow correlations and long memory"),
          ],
        },
        {
          id: "calibration",
          title: "Calibration & Estimation",
          summary:
            "Maximum-likelihood for Hawkes; method of moments for fBM. Practical traps and time-series pitfalls.",
          topics: ["estimation", "MLE for Hawkes"],
          hours: 1,
          resources: [],
        },
      ],
    },
  ],
};

// ────────────────────────────────────────────────────────────
// Module 8: Market Microstructure
// ────────────────────────────────────────────────────────────

const microstructure: Module = {
  id: "microstructure",
  tier: "VIII",
  title: "Market Microstructure",
  subtitle: "Limit order books, impact, and execution.",
  references: ["Trades, Quotes & Prices (TQP)", "Cartea-Jaimungal-Penalva"],
  prerequisites: ["prob-foundations", "stoch-calc"],
  chapters: [
    {
      id: "lob-mechanics",
      title: "Limit Order Book Mechanics",
      blurb:
        "How orders, queues, and prices actually interact at the matching engine.",
      lessons: [
        {
          id: "order-types",
          title: "Order Types & the LOB",
          summary:
            "Limit orders, market orders, IOC, FOK, post-only, hidden. The LOB as a discrete set of price-time priority queues.",
          topics: ["limit order", "market order", "FIFO matching"],
          hours: 1.5,
          resources: [
            tqp("1", "What is a financial market?"),
            tqp("2", "The limit order book"),
          ],
        },
        {
          id: "queue-dynamics",
          title: "Queue Dynamics",
          summary:
            "Arrival, cancellation, execution rates. Cont's framework: each price level is a birth-death process.",
          topics: ["arrival rates", "cancellations", "Cont's model"],
          hours: 1.5,
          resources: [
            tqp("3", "Empirical properties of order book data"),
            cjp("4", "Empirical and statistical properties of trades and quotes"),
          ],
        },
        {
          id: "stylised-facts",
          title: "Stylised Facts",
          summary:
            "Heavy-tailed return distributions, volatility clustering, long-memory order flow, intra-day U-shape, square-root impact.",
          topics: ["fat tails", "vol clustering", "intra-day patterns"],
          hours: 1,
          resources: [
            tqp("3", "Empirical properties of order book data"),
          ],
        },
        {
          id: "agents",
          title: "Agent Ecology",
          summary:
            "Market makers, takers, slow institutions, HFT. Each agent's incentives shape the data we observe.",
          topics: ["market makers", "informed traders", "HFT"],
          hours: 1,
          resources: [
            tqp("4", "Empirical regularities and stylized facts"),
          ],
        },
      ],
    },
    {
      id: "market-impact",
      title: "Market Impact & Square-Root Law",
      blurb:
        "Why pushing a billion through the LOB costs $\\sigma \\sqrt{Q/V}$ and not $Q/V$.",
      lessons: [
        {
          id: "impact-intro",
          title: "Temporary vs Permanent Impact",
          summary:
            "Splitting executed orders show a permanent push (the information component) plus a transient response that decays.",
          topics: ["permanent", "transient", "decay"],
          hours: 1.5,
          resources: [
            tqp("11", "Market impact"),
          ],
        },
        {
          id: "sqrt-law",
          title: "The Square-Root Impact Law",
          summary:
            "$\\Delta p \\sim \\sigma \\sqrt{Q/V}$ — robust across markets, sizes, decades. Why? Latent liquidity (Tóth, Donier-Bouchaud).",
          topics: ["square-root law", "latent liquidity"],
          hours: 2,
          resources: [
            tqp("11", "Market impact"),
            {
              kind: "paper",
              title: "Anomalous price impact and the critical nature of liquidity",
              author: "Tóth et al.",
              url: "https://arxiv.org/abs/1105.1694",
            },
          ],
        },
        {
          id: "propagator",
          title: "Propagator Model",
          summary:
            "$p_t - p_0 = \\sum_{s<t} G(t-s) \\xi_s$. Linear response with kernel $G$ that decays as power law. Reconciles long-memory order flow with martingale prices.",
          topics: ["propagator", "kernel", "linear response"],
          hours: 1.5,
          resources: [
            tqp("12", "The propagator model"),
          ],
        },
        {
          id: "metaorders",
          title: "Metaorders & Slippage",
          summary:
            "Real executions are split. Metaorder cost decomposes into instantaneous spread, propagator-driven impact, and decay.",
          topics: ["metaorder", "slippage", "execution cost"],
          hours: 1,
          resources: [],
        },
      ],
    },
    {
      id: "order-flow",
      title: "Long Memory & Order Flow",
      blurb:
        "Order signs are predictable for hours. Prices stay (approximately) martingale. How?",
      lessons: [
        {
          id: "sign-autocorrelation",
          title: "Sign Autocorrelation",
          summary:
            "$\\mathrm{Corr}(\\varepsilon_t, \\varepsilon_{t+\\tau}) \\sim \\tau^{-\\gamma}$, $\\gamma \\approx 0.5$. Slow decay. Order signs are very far from independent.",
          topics: ["sign correlation", "power law"],
          hours: 1,
          resources: [
            tqp("8", "Order-flow correlations and long memory"),
          ],
        },
        {
          id: "price-martingale",
          title: "Why Prices Stay Martingale Anyway",
          summary:
            "Liquidity providers anticipate predictable flow and adjust quotes. The propagator decay matches the order-flow correlation, cancelling out predictable price moves.",
          topics: ["fluctuation-dissipation", "efficiency"],
          hours: 1.5,
          resources: [
            tqp("12", "The propagator model"),
          ],
        },
        {
          id: "impact-estimation",
          title: "Impact Estimation in Practice",
          summary:
            "Regression with controls, transient-impact disentanglement, latent state filtering. The art of getting impact right.",
          topics: ["estimation", "regression", "controls"],
          hours: 1,
          resources: [],
        },
      ],
    },
    {
      id: "optimal-execution",
      title: "Optimal Execution: Almgren-Chriss",
      blurb:
        "Splitting a large parent order to minimise total expected cost + risk.",
      lessons: [
        {
          id: "almgren-chriss",
          title: "Almgren-Chriss Framework",
          summary:
            "Minimise $E[\\text{cost}] + \\lambda \\, \\mathrm{Var}(\\text{cost})$ over execution trajectories. Linear impact + Gaussian price → closed form.",
          topics: ["AC framework", "risk-cost trade-off", "closed form"],
          hours: 2,
          resources: [
            cjp("6", "Optimal execution"),
            {
              kind: "paper",
              title: "Optimal execution of portfolio transactions",
              author: "Almgren & Chriss",
              url: "https://www.smallake.kr/wp-content/uploads/2016/03/optliq.pdf",
            },
          ],
        },
        {
          id: "implementation-shortfall",
          title: "Implementation Shortfall & TWAP/VWAP",
          summary:
            "IS = realised price − arrival price. TWAP is the optimal trajectory under linear impact and zero risk aversion. VWAP matches volume profile.",
          topics: ["IS", "TWAP", "VWAP"],
          hours: 1,
          resources: [
            cjp("6", "Optimal execution"),
          ],
        },
        {
          id: "extensions",
          title: "Extensions: Non-Linear Impact, Adaptive",
          summary:
            "Square-root impact instead of linear → no closed form, numerical control. Adaptive strategies update as conditions change.",
          topics: ["non-linear impact", "adaptive execution"],
          hours: 1,
          resources: [],
        },
      ],
    },
    {
      id: "market-making",
      title: "Market Making: Avellaneda-Stoikov",
      blurb:
        "Quote the spread, manage inventory, beat the noise traders.",
      lessons: [
        {
          id: "as-framework",
          title: "Avellaneda-Stoikov Framework",
          summary:
            "Maximise $E[U(W_T + q_T S_T)]$ over bid/ask quotes, with mid-price BM and Poisson fills. Indifference-price + half-spread.",
          topics: ["indifference price", "half-spread", "inventory penalty"],
          hours: 2,
          resources: [
            cjp("10", "Market making"),
            {
              kind: "paper",
              title: "High-frequency trading in a limit order book",
              author: "Avellaneda & Stoikov",
              url: "https://math.nyu.edu/~avellane/HighFrequencyTrading.pdf",
            },
          ],
        },
        {
          id: "inventory-risk",
          title: "Inventory Risk & Skew",
          summary:
            "Long inventory → quote tighter on the ask, wider on the bid. Inventory penalty in the objective scales with position².",
          topics: ["inventory", "skew", "risk"],
          hours: 1,
          resources: [],
        },
        {
          id: "extensions-mm",
          title: "Extensions & Reality",
          summary:
            "Adverse selection, latency, queueing, speed bumps. The textbook model meets the matching engine.",
          topics: ["adverse selection", "latency"],
          hours: 1,
          resources: [
            cjp("10", "Market making"),
          ],
        },
      ],
    },
  ],
};

// ────────────────────────────────────────────────────────────

export const mlPathwayModules: Module[] = [
  linalgMl,
  eigenSvd,
  matrixCalc,
  probFoundations,
  statInference,
  mlFundamentals,
  stochCalc,
  microstructure,
];
