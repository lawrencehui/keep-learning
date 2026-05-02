import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function GaloisBody() {
  return (
    <>
      <p>
        Galois theory is the most beautiful theorem in elementary
        algebra. It explains why polynomial equations of degree 2,
        3, or 4 are solvable by radicals (a formula in{" "}
        <InlineMath math="\sqrt{}, \sqrt[3]{}" /> etc.) but the
        general degree-5 polynomial is not — there's no quintic
        formula, and the proof is structural rather than
        computational. The reason: the symmetry group of a generic
        polynomial's roots is too complicated to be "solvable" in
        a precise group-theoretic sense.
      </p>
      <p>
        We won't develop the full theory — that's a course in
        itself. But the central ideas are too elegant to skip even
        in a survey. The chapter is a {" "}
        <em>taste</em> — definitions and the big result.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.703 — Modern Algebra (alternate)",
            author: "MIT OCW",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/",
            note: "Covers Galois theory rigorously.",
          },
          {
            title: "Galois Theory (Stewart)",
            author: "Ian Stewart",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Ian_Stewart_(mathematician)",
            note: "Highly accessible book-length treatment, with historical context.",
          },
          {
            title: "Abstract Algebra (Pinter)",
            author: "Charles Pinter",
            duration: "Reading",
            url: "https://store.doverpublications.com/0486474178.html",
            note: "Cheap Dover edition; final chapters cover Galois theory at undergraduate level.",
          },
          {
            title: "Why is the quintic unsolvable? — Mathologer",
            author: "Mathologer",
            duration: "30 min",
            url: "https://www.youtube.com/watch?v=BSHv9Elk1MU",
            note: "Visual / topological insolubility of the quintic, beautifully presented.",
          },
          {
            title: "Galois — A Mathematical Tragedy (3Blue1Brown / various)",
            author: "various",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=galois+life+story",
            note: "Évariste Galois's life is the story of math gone tragic. Worth one good biographical video.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Field extensions</h2>

      <p>
        A <strong>field extension</strong>{" "}
        <InlineMath math="K \subseteq L" /> is just a field{" "}
        <InlineMath math="L" /> containing <InlineMath math="K" /> as
        a subfield. Examples:
      </p>

      <ul>
        <li>
          <InlineMath math="\mathbb{Q} \subseteq \mathbb{R}" />.
        </li>
        <li>
          <InlineMath math="\mathbb{R} \subseteq \mathbb{C}" />.
        </li>
        <li>
          <InlineMath math="\mathbb{Q} \subseteq \mathbb{Q}(\sqrt 2) = \{a + b\sqrt 2 : a, b \in \mathbb{Q}\}" />.
        </li>
        <li>
          <InlineMath math="\mathbb{F}_2 \subseteq \mathbb{F}_4 = \mathbb{F}_2[x]/(x^2 + x + 1)" />.
        </li>
      </ul>

      <p>
        Such an <InlineMath math="L" /> is automatically a vector
        space over <InlineMath math="K" />. Its{" "}
        <strong>degree</strong>{" "}
        <InlineMath math="[L : K]" /> is the dimension of that
        vector space.
      </p>

      <ul>
        <li>
          <InlineMath math="[\mathbb{C} : \mathbb{R}] = 2" /> (basis{" "}
          <InlineMath math="\{1, i\}" />).
        </li>
        <li>
          <InlineMath math="[\mathbb{Q}(\sqrt 2) : \mathbb{Q}] = 2" />.
        </li>
        <li>
          <InlineMath math="[\mathbb{R} : \mathbb{Q}] = \infty" />.
        </li>
      </ul>

      <p>
        Tower law: if{" "}
        <InlineMath math="K \subseteq L \subseteq M" /> are fields
        and the degrees are finite, then{" "}
        <InlineMath math="[M : K] = [M : L] \cdot [L : K]" />. Use
        this constantly.
      </p>

      <h3>Algebraic vs. transcendental</h3>

      <p>
        An element <InlineMath math="\alpha \in L" /> is{" "}
        <strong>algebraic over</strong>{" "}
        <InlineMath math="K" /> if it satisfies a polynomial
        equation with coefficients in <InlineMath math="K" />.
        Otherwise <strong>transcendental</strong>.
      </p>

      <p>
        <InlineMath math="\sqrt 2" /> is algebraic over{" "}
        <InlineMath math="\mathbb{Q}" /> (
        <InlineMath math="x^2 - 2 = 0" />). So is{" "}
        <InlineMath math="i" /> (
        <InlineMath math="x^2 + 1 = 0" />). So is the golden ratio,{" "}
        <InlineMath math="(1 + \sqrt 5)/2" /> (
        <InlineMath math="x^2 - x - 1 = 0" />).
      </p>

      <p>
        <InlineMath math="\pi" /> and <InlineMath math="e" /> are{" "}
        transcendental over <InlineMath math="\mathbb{Q}" /> (deep
        theorems by Lindemann and Hermite). Most real numbers are
        transcendental in the cardinality sense — algebraic numbers
        are countable, but <InlineMath math="\mathbb{R}" /> isn't.
        Yet finding a specific transcendental can be hard.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Splitting fields</h2>

      <p>
        Given a polynomial{" "}
        <InlineMath math="p(x) \in K[x]" />, the{" "}
        <strong>splitting field</strong> of <InlineMath math="p" />{" "}
        over <InlineMath math="K" /> is the smallest field extension
        containing all roots of <InlineMath math="p" />. It exists
        and is unique up to isomorphism.
      </p>

      <p>
        Examples over <InlineMath math="\mathbb{Q}" />:
      </p>
      <ul>
        <li>
          <InlineMath math="x^2 - 2" /> splits over{" "}
          <InlineMath math="\mathbb{Q}(\sqrt 2)" />. Degree 2.
        </li>
        <li>
          <InlineMath math="x^4 - 2" /> has roots{" "}
          <InlineMath math="\pm 2^{1/4}, \pm i \cdot 2^{1/4}" />.
          Splitting field:{" "}
          <InlineMath math="\mathbb{Q}(2^{1/4}, i)" />, degree 8 over{" "}
          <InlineMath math="\mathbb{Q}" />.
        </li>
        <li>
          The polynomial{" "}
          <InlineMath math="x^n - 1" /> has all{" "}
          <InlineMath math="n" />-th roots of unity. Its splitting
          field <InlineMath math="\mathbb{Q}(\zeta_n)" /> with{" "}
          <InlineMath math="\zeta_n = e^{2\pi i/n}" /> is the{" "}
          <em>cyclotomic field</em>. Degree{" "}
          <InlineMath math="\varphi(n)" />.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · The Galois group</h2>

      <Callout title="Galois group">
        For a field extension <InlineMath math="L/K" />, the{" "}
        <strong>Galois group</strong>{" "}
        <InlineMath math="\mathrm{Gal}(L/K)" /> is the group of
        field automorphisms of <InlineMath math="L" /> that fix{" "}
        <InlineMath math="K" /> pointwise — i.e. bijective maps{" "}
        <InlineMath math="\sigma : L \to L" /> respecting{" "}
        <InlineMath math="+" /> and <InlineMath math="\cdot" /> with{" "}
        <InlineMath math="\sigma(k) = k" /> for every{" "}
        <InlineMath math="k \in K" />.
      </Callout>

      <p>
        Examples:
      </p>
      <ul>
        <li>
          <InlineMath math="\mathrm{Gal}(\mathbb{C}/\mathbb{R}) = \{\mathrm{id}, z \mapsto \bar z\}" />.
          The identity, plus complex conjugation. Group of order 2.
        </li>
        <li>
          <InlineMath math="\mathrm{Gal}(\mathbb{Q}(\sqrt 2)/\mathbb{Q}) = \{\mathrm{id}, a + b\sqrt 2 \mapsto a - b\sqrt 2\}" />.
          Order 2.
        </li>
        <li>
          <InlineMath math="\mathrm{Gal}(\mathbb{Q}(\sqrt 2, \sqrt 3)/\mathbb{Q}) \cong \mathbb{Z}/2 \times \mathbb{Z}/2" />.
          Each of <InlineMath math="\sqrt 2" /> and{" "}
          <InlineMath math="\sqrt 3" /> can independently flip sign.
        </li>
      </ul>

      <p>
        Galois groups permute the roots of the minimal polynomial.
        For a degree-<InlineMath math="n" /> polynomial with{" "}
        <InlineMath math="n" /> distinct roots, the Galois group of
        the splitting field over the base field is a subgroup of{" "}
        <InlineMath math="S_n" />. For "generic" polynomials it{" "}
        <em>is</em> all of <InlineMath math="S_n" />.
      </p>

      <h3>Galois extensions</h3>

      <p>
        An extension <InlineMath math="L/K" /> is{" "}
        <strong>Galois</strong> if it's the splitting field of some
        separable polynomial over <InlineMath math="K" />. (For
        characteristic 0 — what we mostly care about — separable
        just means no repeated roots, automatic for irreducible
        polynomials.)
      </p>

      <Callout title="Fundamental theorem of Galois theory">
        For a Galois extension <InlineMath math="L/K" /> with finite{" "}
        <InlineMath math="[L : K]" />, there's an order-reversing
        bijection between:
        <ul>
          <li>
            Intermediate fields{" "}
            <InlineMath math="K \subseteq F \subseteq L" />
          </li>
          <li>
            Subgroups <InlineMath math="H \leq \mathrm{Gal}(L/K)" />
          </li>
        </ul>
        sending <InlineMath math="F" /> to{" "}
        <InlineMath math="\mathrm{Gal}(L/F)" />, and{" "}
        <InlineMath math="H" /> to its fixed field{" "}
        <InlineMath math="L^H = \{x \in L : \sigma(x) = x \,\forall \sigma \in H\}" />.
      </Callout>

      <p>
        Subfields ↔ subgroups, with all the structure (containment,
        order, normality) corresponding. Algebra of fields becomes
        algebra of finite groups, exactly.
      </p>

      <p>
        Beautiful corollary: <InlineMath math="F/K" /> is itself
        Galois iff <InlineMath math="\mathrm{Gal}(L/F)" /> is normal
        in <InlineMath math="\mathrm{Gal}(L/K)" />. Normal subgroups
        in the algebra correspond to "nice" intermediate fields in
        the geometry.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Solvability by radicals</h2>

      <p>
        A polynomial <InlineMath math="p(x) \in K[x]" /> is{" "}
        <strong>solvable by radicals</strong> if its roots can be
        expressed in a finite formula using{" "}
        <InlineMath math="+, -, \times, /, \sqrt[n]{}" /> operations
        starting from elements of <InlineMath math="K" />.
      </p>

      <p>
        Familiar examples:
      </p>
      <ul>
        <li>
          Quadratic:{" "}
          <InlineMath math="x = (-b \pm \sqrt{b^2 - 4ac})/(2a)" />.
        </li>
        <li>
          Cubic: Cardano's formula (much messier; involves cube
          roots and a discriminant).
        </li>
        <li>
          Quartic: Ferrari's formula (yet messier; reduces to a
          cubic).
        </li>
      </ul>

      <p>
        For centuries mathematicians sought a quintic formula. None
        was found. Niels Abel (1824) and Évariste Galois (1830s)
        proved that none exists.
      </p>

      <h3>The criterion</h3>

      <Callout title="Galois solvability theorem">
        A polynomial is solvable by radicals iff its Galois group
        is a <strong>solvable group</strong>.
      </Callout>

      <p>
        A group is <strong>solvable</strong> if there's a chain of
        subgroups
      </p>
      <BlockMath math="\{e\} = G_0 \triangleleft G_1 \triangleleft \cdots \triangleleft G_n = G" />
      <p>
        where each quotient <InlineMath math="G_{i+1}/G_i" /> is
        abelian. The name comes from the connection to solvability
        of equations — but the group-theoretic notion is purely
        algebraic.
      </p>

      <p>
        Examples:
      </p>
      <ul>
        <li>
          All abelian groups are solvable (chain{" "}
          <InlineMath math="\{e\} \triangleleft G" />, quotient
          abelian).
        </li>
        <li>
          <InlineMath math="S_2, S_3, S_4" /> are all solvable.
          Hence quadratics, cubics, and quartics are solvable.
        </li>
        <li>
          <InlineMath math="S_5" /> is <em>not</em> solvable. Its
          alternating subgroup <InlineMath math="A_5" /> is simple
          (no normal subgroups other than{" "}
          <InlineMath math="\{e\}" /> and itself), and not
          abelian. So no abelian-quotient chain exists.
        </li>
      </ul>

      <h3>Insolubility of the quintic</h3>

      <Callout title="Abel–Ruffini theorem">
        There exist quintic polynomials with{" "}
        <InlineMath math="\mathbb{Q}" /> coefficients whose Galois
        group over <InlineMath math="\mathbb{Q}" /> is{" "}
        <InlineMath math="S_5" /> (the full symmetric group on 5
        roots). Since <InlineMath math="S_5" /> is not solvable,
        these quintics have no solution in radicals.
      </Callout>

      <p>
        A specific example: <InlineMath math="x^5 - 4x + 2 = 0" />.
        Its Galois group is <InlineMath math="S_5" />, which is not
        solvable, so its roots cannot be written using{" "}
        <InlineMath math="+, -, \times, /, \sqrt[n]{}" /> over{" "}
        <InlineMath math="\mathbb{Q}" />. Numerical roots exist
        (about <InlineMath math="-1.519, 0.508, 1.243" /> and a
        complex pair) but no closed-form radical formula.
      </p>

      <Pitfall>
        "Not solvable by radicals" is <em>not</em> the same as "no
        roots exist." Quintics certainly have roots — by the FTA
        they have 5 complex roots. The point is just that those
        roots can't be expressed as a finite tower of radicals.
        Other special functions (theta functions, modular forms)
        provide closed forms; just not nested radicals.
      </Pitfall>

      <Exercise
        number="4.1"
        prompt={
          <>
            Why is the polynomial{" "}
            <InlineMath math="x^5 - 1 = 0" /> solvable by radicals?
          </>
        }
      >
        <p>
          Roots are 5th roots of unity{" "}
          <InlineMath math="\zeta_5^k = e^{2\pi i k/5}" />. The
          splitting field <InlineMath math="\mathbb{Q}(\zeta_5)" />{" "}
          has{" "}
          <InlineMath math="\mathrm{Gal}(\mathbb{Q}(\zeta_5)/\mathbb{Q}) \cong (\mathbb{Z}/5)^* \cong \mathbb{Z}/4" />.
        </p>
        <p>
          Cyclic groups are abelian, hence solvable. So{" "}
          <InlineMath math="x^5 - 1" /> is solvable by radicals —
          even though it's degree 5. The high degree by itself
          doesn't make a polynomial unsolvable; it's the
          Galois-group structure that matters.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Why this matters</h2>

      <ul>
        <li>
          <strong>Constructibility with compass and straightedge.</strong>{" "}
          Wantzel (1837) proved: a length is constructible iff it
          lies in an extension of <InlineMath math="\mathbb{Q}" /> of
          degree <InlineMath math="2^n" />. Squaring the circle
          requires <InlineMath math="\pi" /> (transcendental):
          impossible. Doubling the cube needs{" "}
          <InlineMath math="\sqrt[3] 2" /> (degree 3, not a power of
          2): impossible. Trisecting an arbitrary angle: degree 3
          again, impossible. Three of the four classical Greek
          construction problems killed by field theory.
        </li>
        <li>
          <strong>Class field theory.</strong> The Galois groups of
          abelian extensions of number fields are described by class
          groups — a deep theorem at the heart of algebraic number
          theory. Modern abelian Iwasawa theory and{" "}
          <InlineMath math="p" />-adic L-functions live here.
        </li>
        <li>
          <strong>Wiles's proof of Fermat's Last Theorem (1995).</strong>{" "}
          Galois representations attached to elliptic curves and
          modular forms are the key. The Modularity Theorem (which
          Wiles proved a special case of) connects Galois
          representations to modular forms — every elliptic curve
          over <InlineMath math="\mathbb{Q}" /> is "modular".
        </li>
        <li>
          <strong>Quantum computing.</strong> Hidden subgroup
          problems generalise discrete log; Shor's algorithm solves
          them for abelian groups. Non-abelian HSP (which would
          break lattice-based crypto) is a major open question
          — and "non-abelian" here is a Galois-theoretic concept.
          The structure of finite groups directly determines what's
          quantum-easy and quantum-hard.
        </li>
        <li>
          <strong>Topology and the Riemann–Hilbert correspondence.</strong>{" "}
          Étale fundamental groups of varieties (Grothendieck) are
          generalisations of Galois groups. The Tannakian formalism
          relates symmetry groups of categories to Galois-like
          structures. Modern arithmetic geometry is woven from these
          ideas.
        </li>
      </ul>

      <p>
        That closes Module X. Abstract algebra is the structural
        backbone of nearly every later topic. Next:{" "}
        <strong>Module XI — Advanced Linear Algebra</strong>, where
        we'll deepen the operator theory, develop tensor products
        properly, and lay the groundwork for the Hilbert spaces of
        quantum mechanics.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "An element $\\alpha \\in L$ is **algebraic** over $K$ if…",
    options: [
      "$\\alpha \\in K$",
      "$\\alpha$ satisfies a polynomial equation with coefficients in $K$",
      "$\\alpha$ is rational",
      "$\\alpha$ is a sum of square roots",
    ],
    correct: 1,
    explanation:
      "Algebraic = root of a polynomial over $K$. Transcendental = not algebraic. $\\sqrt 2$ is algebraic over $\\mathbb{Q}$; $\\pi$ and $e$ are transcendental.",
  },
  {
    prompt:
      "$[\\mathbb{Q}(\\sqrt 2) : \\mathbb{Q}]$ equals…",
    options: ["1", "2", "3", "$\\infty$"],
    correct: 1,
    explanation:
      "Basis $\\{1, \\sqrt 2\\}$ over $\\mathbb{Q}$ — dimension 2 as a vector space.",
  },
  {
    prompt:
      "By the Fundamental Theorem of Galois Theory, intermediate fields between $K$ and $L$ correspond to…",
    options: [
      "elements of $L$",
      "subgroups of $\\mathrm{Gal}(L/K)$",
      "polynomials in $K[x]$",
      "integers in $\\mathbb{Z}$",
    ],
    correct: 1,
    explanation:
      "Order-reversing bijection: intermediate fields ↔ subgroups of the Galois group. Algebra of fields = algebra of finite groups.",
  },
  {
    prompt:
      "A polynomial is solvable by radicals iff its Galois group is…",
    options: [
      "abelian",
      "cyclic",
      "solvable (in the technical group-theoretic sense)",
      "trivial",
    ],
    correct: 2,
    explanation:
      "Galois's theorem: polynomial solvable by radicals ⇔ Galois group has a chain of normal subgroups with abelian quotients (a 'solvable group'). The general quintic has Galois group $S_5$, which is not solvable.",
  },
  {
    prompt:
      "Why are quartics solvable by radicals but generic quintics not?",
    options: [
      "$S_4$ is solvable; $S_5$ is not",
      "quintics have too many roots",
      "no proof exists for quartics",
      "it's a coincidence",
    ],
    correct: 0,
    explanation:
      "Solvability of polynomials = solvability of their Galois groups. $S_4$ has a chain $\\{e\\} \\triangleleft V_4 \\triangleleft A_4 \\triangleleft S_4$ with abelian quotients. $S_5$ has no such chain because $A_5$ is simple non-abelian. That's exactly why no quintic formula exists.",
  },
];
