import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function RingsBody() {
  return (
    <>
      <p>
        Groups have one operation. Rings have two — addition and
        multiplication — interacting via the distributive law. The
        familiar examples are <InlineMath math="\mathbb{Z}" />,{" "}
        <InlineMath math="\mathbb{Z}/n" />, polynomials over a
        field, and <InlineMath math="n \times n" /> matrices over
        any ring. With more axioms come more invariants:{" "}
        <em>ideals</em> are the multiplicative analogue of normal
        subgroups, quotient rings appear, and special rings called{" "}
        <em>fields</em> support division by every nonzero element.
      </p>
      <p>
        Fields are the natural setting for everything we did in
        linear algebra (vector spaces are over a field) and for
        cryptography (finite fields{" "}
        <InlineMath math="\mathbb{F}_q" />). This chapter develops
        ring + ideal + quotient theory, then specialises to
        polynomial rings and finite fields, which are central to
        modern coding theory and ECC.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.701/18.702 — Algebra I/II",
            author: "Prof. Michael Artin (MIT OCW)",
            duration: "~60h total",
            url: "https://ocw.mit.edu/courses/18-702-algebra-ii-spring-2011/",
            note: "18.702 (the second semester) covers rings and fields. Strong recommendation.",
          },
          {
            title: "Dummit &amp; Foote — Abstract Algebra (parts II–III)",
            author: "Dummit / Foote",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Abstract_Algebra_(book)",
            note: "Hundreds of pages on rings, modules, fields. Encyclopaedic reference.",
          },
          {
            title: "Lang — Algebra",
            author: "Serge Lang",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Algebra_(Lang)",
            note: "Graduate-level, denser than Dummit. Excellent for ring theory once basics are solid.",
          },
          {
            title: "Visual / motivated coverage",
            author: "Various YouTube",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=ring+theory+intuition",
            note: "Search for 'ring theory intuition' — many short pieces motivate the abstract definitions.",
          },
          {
            title: "Mac Williams &amp; Sloane — Theory of Error-Correcting Codes",
            author: "Mac Williams / Sloane",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Coding_theory",
            note: "How finite-field algebra powers Reed–Solomon, BCH, and modern coding theory. Worth a skim once you're comfortable with finite fields.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Rings</h2>

      <Callout title="Ring">
        A <strong>ring</strong> is a set <InlineMath math="R" /> with
        two operations <InlineMath math="+, \cdot" /> such that:
        <ol>
          <li>
            <InlineMath math="(R, +)" /> is an abelian group with
            identity <InlineMath math="0" />.
          </li>
          <li>
            <InlineMath math="\cdot" /> is associative.
          </li>
          <li>
            Multiplication distributes over addition:{" "}
            <InlineMath math="a (b + c) = ab + ac" /> and{" "}
            <InlineMath math="(b + c) a = ba + ca" />.
          </li>
        </ol>
        Most rings we'll meet have a <strong>multiplicative
        identity</strong>{" "}
        <InlineMath math="1" /> with{" "}
        <InlineMath math="1 \cdot a = a \cdot 1 = a" />. We assume
        this. The ring is <strong>commutative</strong> if{" "}
        <InlineMath math="ab = ba" /> always.
      </Callout>

      <h3>Examples</h3>

      <ul>
        <li>
          <InlineMath math="\mathbb{Z}" />: integers under usual
          operations. Commutative, with identity.
        </li>
        <li>
          <InlineMath math="\mathbb{Z}/n\mathbb{Z}" />: residues mod{" "}
          <InlineMath math="n" />. Commutative.
        </li>
        <li>
          <InlineMath math="\mathbb{R}[x]" />: polynomials in{" "}
          <InlineMath math="x" /> with real coefficients.
          Commutative.
        </li>
        <li>
          <InlineMath math="M_n(R)" />: <InlineMath math="n \times n" />{" "}
          matrices over <InlineMath math="R" />. Non-commutative for{" "}
          <InlineMath math="n \geq 2" />.
        </li>
        <li>
          The <em>Gaussian integers</em>{" "}
          <InlineMath math="\mathbb{Z}[i] = \{a + bi : a, b \in \mathbb{Z}\}" />.
          Commutative.
        </li>
      </ul>

      <h3>Special elements</h3>

      <ul>
        <li>
          <strong>Unit:</strong> an element with a multiplicative
          inverse. Units form a group under multiplication, written{" "}
          <InlineMath math="R^*" />.
        </li>
        <li>
          <strong>Zero divisor:</strong> a nonzero{" "}
          <InlineMath math="a" /> such that{" "}
          <InlineMath math="ab = 0" /> for some nonzero{" "}
          <InlineMath math="b" />. In{" "}
          <InlineMath math="\mathbb{Z}/6" />,{" "}
          <InlineMath math="2 \cdot 3 = 0" />, so 2 and 3 are zero
          divisors.
        </li>
        <li>
          <strong>Integral domain:</strong> commutative ring with
          no zero divisors. Cancellation works:{" "}
          <InlineMath math="ab = ac" /> with{" "}
          <InlineMath math="a \neq 0" /> implies{" "}
          <InlineMath math="b = c" />.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Ideals</h2>

      <p>
        For a commutative ring <InlineMath math="R" />, an{" "}
        <strong>ideal</strong>{" "}
        <InlineMath math="I \subseteq R" /> is a subset closed under
        addition and "absorption":
      </p>
      <ul>
        <li>
          <InlineMath math="0 \in I" />.
        </li>
        <li>
          <InlineMath math="a, b \in I \Rightarrow a + b \in I" />.
        </li>
        <li>
          <InlineMath math="a \in I, r \in R \Rightarrow ra \in I" />.
        </li>
      </ul>

      <p>
        Ideals are the analogue of normal subgroups in group
        theory. They're exactly the kernels of ring
        homomorphisms.
      </p>

      <h3>Principal ideals</h3>

      <p>
        For <InlineMath math="a \in R" />, the{" "}
        <strong>principal ideal</strong>{" "}
        <InlineMath math="(a) = \{ra : r \in R\}" />. In{" "}
        <InlineMath math="\mathbb{Z}" />,{" "}
        <InlineMath math="(n) = n\mathbb{Z}" /> is the multiples of{" "}
        <InlineMath math="n" />.
      </p>

      <p>
        A ring where every ideal is principal is a{" "}
        <strong>principal ideal domain</strong> (PID).{" "}
        <InlineMath math="\mathbb{Z}" /> is a PID. So is{" "}
        <InlineMath math="F[x]" /> for any field{" "}
        <InlineMath math="F" /> (polynomials over a field). PIDs
        have unique factorisation — divides nicely into primes /
        irreducibles, just like integers.
      </p>

      <h3>Quotient rings</h3>

      <p>
        Just like in group theory: the quotient{" "}
        <InlineMath math="R/I" /> consists of cosets{" "}
        <InlineMath math="r + I" /> with operations{" "}
        <InlineMath math="(r + I) + (s + I) = (r + s) + I" /> and{" "}
        <InlineMath math="(r + I)(s + I) = rs + I" />. It's a ring
        (commutative if <InlineMath math="R" /> is, with identity{" "}
        <InlineMath math="1 + I" />).
      </p>

      <p>
        <InlineMath math="\mathbb{Z}/n\mathbb{Z}" /> is the quotient
        of <InlineMath math="\mathbb{Z}" /> by{" "}
        <InlineMath math="(n) = n\mathbb{Z}" />. The two views —
        residues mod <InlineMath math="n" /> versus cosets — are the
        same.
      </p>

      <Callout title="First isomorphism theorem (rings)">
        For a ring homomorphism{" "}
        <InlineMath math="\varphi : R \to S" />:{" "}
        <InlineMath math="\ker \varphi" /> is an ideal, and
        <BlockMath math="R / \ker \varphi \cong \operatorname{im} \varphi." />
      </Callout>

      <p>
        Same shape as for groups, with "ideal" in place of "normal
        subgroup". Crucial for showing rings are isomorphic to
        quotients of polynomial rings — coming up in Galois theory.
      </p>

      <h3>Prime and maximal ideals</h3>

      <p>
        An ideal <InlineMath math="P \neq R" /> is{" "}
        <strong>prime</strong> if{" "}
        <InlineMath math="ab \in P \Rightarrow a \in P \text{ or } b \in P" />.
      </p>

      <p>
        An ideal <InlineMath math="M \neq R" /> is{" "}
        <strong>maximal</strong> if no ideal{" "}
        <InlineMath math="I" /> with{" "}
        <InlineMath math="M \subsetneq I \subsetneq R" /> exists.
      </p>

      <p>
        Both are useful because of:
      </p>
      <ul>
        <li>
          <InlineMath math="R/P" /> is an integral domain iff{" "}
          <InlineMath math="P" /> is prime.
        </li>
        <li>
          <InlineMath math="R/M" /> is a field iff{" "}
          <InlineMath math="M" /> is maximal.
        </li>
      </ul>

      <p>
        In <InlineMath math="\mathbb{Z}" />,{" "}
        <InlineMath math="(p)" /> is prime iff{" "}
        <InlineMath math="p" /> is a prime number. Maximal too —{" "}
        <InlineMath math="\mathbb{Z}/p\mathbb{Z}" /> is a field
        precisely when <InlineMath math="p" /> is prime.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Polynomial rings</h2>

      <p>
        For a commutative ring <InlineMath math="R" />, the{" "}
        <strong>polynomial ring</strong>{" "}
        <InlineMath math="R[x]" /> consists of all expressions{" "}
        <InlineMath math="a_n x^n + \cdots + a_1 x + a_0" /> with{" "}
        <InlineMath math="a_i \in R" />. Operations are usual
        polynomial addition and multiplication.
      </p>

      <p>
        For a field <InlineMath math="F" />,{" "}
        <InlineMath math="F[x]" /> is a PID with strong analogues of
        integer arithmetic:
      </p>
      <ul>
        <li>
          <strong>Division algorithm:</strong> for non-zero{" "}
          <InlineMath math="g(x)" />, every{" "}
          <InlineMath math="f(x) \in F[x]" /> has{" "}
          <InlineMath math="f = qg + r" /> with{" "}
          <InlineMath math="\deg r < \deg g" />.
        </li>
        <li>
          <strong>Euclidean algorithm:</strong> compute{" "}
          <InlineMath math="\gcd(f, g)" /> via repeated division.
        </li>
        <li>
          <strong>Unique factorisation</strong> into irreducibles.
        </li>
      </ul>

      <h3>Irreducible polynomials</h3>

      <p>
        A polynomial in <InlineMath math="F[x]" /> is{" "}
        <strong>irreducible</strong> if it can't be factored into
        two non-constant polynomials. Irreducibles play the role of
        primes in <InlineMath math="\mathbb{Z}" />.
      </p>

      <p>
        Examples:
      </p>
      <ul>
        <li>
          Linear polynomials are always irreducible.
        </li>
        <li>
          <InlineMath math="x^2 + 1 \in \mathbb{R}[x]" /> is
          irreducible (no real roots). But in{" "}
          <InlineMath math="\mathbb{C}[x]" /> it factors as{" "}
          <InlineMath math="(x + i)(x - i)" />. <em>Irreducibility
          is field-dependent.</em>
        </li>
        <li>
          By the Fundamental Theorem of Algebra, the only
          irreducibles in <InlineMath math="\mathbb{C}[x]" /> are
          linear. In <InlineMath math="\mathbb{R}[x]" />: linear
          and irreducible-quadratic.
        </li>
      </ul>

      <h3>Quotient rings of polynomials</h3>

      <p>
        For an irreducible <InlineMath math="p(x) \in F[x]" />,{" "}
        <InlineMath math="(p(x))" /> is maximal, so{" "}
        <InlineMath math="F[x] / (p(x))" /> is a field —
        an extension of <InlineMath math="F" />. We're constructing
        new fields by quotienting polynomial rings.
      </p>

      <p>
        Example.{" "}
        <InlineMath math="\mathbb{R}[x] / (x^2 + 1) \cong \mathbb{C}" />.
        The quotient sends <InlineMath math="x" /> to a class that
        squares to <InlineMath math="-1" /> — exactly{" "}
        <InlineMath math="i" />. Adding <InlineMath math="\mathbb{R}" />{" "}
        coefficients gives <InlineMath math="a + bi" />.
      </p>

      <p>
        This is how field extensions get built: take an irreducible
        polynomial, mod out by it, and you've adjoined a root.
      </p>

      <Pitfall>
        <strong>Reducibility depends on the field.</strong>{" "}
        <InlineMath math="x^2 - 2" /> is irreducible over{" "}
        <InlineMath math="\mathbb{Q}" /> (no rational square roots
        of 2) but reducible over{" "}
        <InlineMath math="\mathbb{R}" /> (it factors as{" "}
        <InlineMath math="(x - \sqrt 2)(x + \sqrt 2)" />). When
        thinking about irreducibility, always specify the
        coefficient field.
      </Pitfall>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Fields</h2>

      <p>
        A <strong>field</strong> is a commutative ring in which
        every nonzero element is a unit. Equivalently: division by
        any nonzero element is defined.
      </p>

      <p>
        Examples: <InlineMath math="\mathbb{Q}" />,{" "}
        <InlineMath math="\mathbb{R}" />,{" "}
        <InlineMath math="\mathbb{C}" />,{" "}
        <InlineMath math="\mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}" />{" "}
        for prime <InlineMath math="p" />. The integers{" "}
        <InlineMath math="\mathbb{Z}" /> are <em>not</em> a field
        (no inverse for 2 inside <InlineMath math="\mathbb{Z}" />).
      </p>

      <p>
        Fields are the structures over which linear algebra and
        polynomial algebra work cleanly. Vector spaces require
        scalars in a field; the rank–nullity theorem, dimension,
        determinant — all live over a field.
      </p>

      <h3>Characteristic</h3>

      <p>
        The <strong>characteristic</strong> of a field is the
        smallest <InlineMath math="n" /> such that{" "}
        <InlineMath math="\underbrace{1 + 1 + \cdots + 1}_{n \text{ times}} = 0" />,
        or 0 if no such{" "}
        <InlineMath math="n" /> exists.
      </p>

      <ul>
        <li>
          Characteristic 0:{" "}
          <InlineMath math="\mathbb{Q}, \mathbb{R}, \mathbb{C}" />.
        </li>
        <li>
          Characteristic <InlineMath math="p" /> (prime):{" "}
          <InlineMath math="\mathbb{F}_p" /> and finite extensions.
        </li>
      </ul>

      <p>
        The characteristic, when nonzero, must be prime — otherwise
        there'd be zero divisors.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Finite fields</h2>

      <Callout title="Existence and uniqueness">
        For each prime power{" "}
        <InlineMath math="q = p^k" />, there is{" "}
        <em>up to isomorphism</em> a unique field of size{" "}
        <InlineMath math="q" />, written{" "}
        <InlineMath math="\mathbb{F}_q" /> (or{" "}
        <InlineMath math="GF(q)" />, "Galois field"). All finite
        fields have prime-power order.
      </Callout>

      <p>
        Constructions:
      </p>
      <ul>
        <li>
          <InlineMath math="\mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}" />,
          straightforward.
        </li>
        <li>
          <InlineMath math="\mathbb{F}_{p^k}" /> for{" "}
          <InlineMath math="k \geq 2" />: pick an irreducible
          polynomial <InlineMath math="g(x) \in \mathbb{F}_p[x]" />{" "}
          of degree <InlineMath math="k" />, then{" "}
          <InlineMath math="\mathbb{F}_{p^k} = \mathbb{F}_p[x]/(g(x))" />.
          The result doesn't depend on which irreducible you
          chose — all degree-<InlineMath math="k" /> irreducibles
          give isomorphic fields.
        </li>
      </ul>

      <p>
        Examples:
      </p>
      <ul>
        <li>
          <InlineMath math="\mathbb{F}_4 = \mathbb{F}_2[x] / (x^2 + x + 1)" />.
          The polynomial{" "}
          <InlineMath math="x^2 + x + 1" /> is irreducible mod 2
          (no roots: 0 and 1 don't satisfy it). The four elements
          of <InlineMath math="\mathbb{F}_4" /> are{" "}
          <InlineMath math="0, 1, x, x + 1" />, with arithmetic
          done mod{" "}
          <InlineMath math="x^2 + x + 1" /> and coefficients mod 2.
        </li>
        <li>
          <InlineMath math="\mathbb{F}_{256} = \mathbb{F}_{2^8}" />:
          standard for AES (the Rijndael S-box uses arithmetic in
          this field).
        </li>
      </ul>

      <h3>Multiplicative structure</h3>

      <Callout title="Cyclic">
        The multiplicative group{" "}
        <InlineMath math="\mathbb{F}_q^* = \mathbb{F}_q \setminus \{0\}" />{" "}
        is cyclic of order <InlineMath math="q - 1" />.
      </Callout>

      <p>
        So in any finite field there's an element{" "}
        <InlineMath math="g" /> (a "primitive element") whose powers
        generate every nonzero element. This makes discrete logs
        well-defined: every nonzero{" "}
        <InlineMath math="x" /> has a unique{" "}
        <InlineMath math="\log_g x \in \{0, 1, \dots, q - 2\}" />{" "}
        (the discrete log). The hardness of computing discrete
        logs in finite fields underlies finite-field Diffie–Hellman.
      </p>

      <Exercise
        number="5.1"
        prompt={
          <>
            Compute multiplication of{" "}
            <InlineMath math="x" /> and{" "}
            <InlineMath math="x + 1" /> in{" "}
            <InlineMath math="\mathbb{F}_4 = \mathbb{F}_2[x] / (x^2 + x + 1)" />.
          </>
        }
      >
        <p>
          Multiply:{" "}
          <InlineMath math="x \cdot (x + 1) = x^2 + x" />. Reduce
          mod <InlineMath math="x^2 + x + 1" />:{" "}
          <InlineMath math="x^2 + x \equiv (x^2 + x + 1) - 1 \equiv -1 \equiv 1 \pmod{x^2 + x + 1, 2}" />.
          Coefficients are in <InlineMath math="\mathbb{F}_2" />, so{" "}
          <InlineMath math="-1 = 1" />.
        </p>
        <p>
          So <InlineMath math="x \cdot (x + 1) = 1" /> in{" "}
          <InlineMath math="\mathbb{F}_4" /> — meaning{" "}
          <InlineMath math="x" /> and <InlineMath math="x + 1" /> are
          inverses of each other.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Cryptography.</strong> AES uses{" "}
          <InlineMath math="\mathbb{F}_{2^8}" /> arithmetic.
          Elliptic-curve cryptography lives over{" "}
          <InlineMath math="\mathbb{F}_p" /> for some 256-bit prime{" "}
          <InlineMath math="p" /> (or some{" "}
          <InlineMath math="\mathbb{F}_{2^k}" />). All public-key
          systems run on finite-field arithmetic.
        </li>
        <li>
          <strong>Coding theory.</strong> Reed–Solomon codes (used
          on CDs, QR codes, deep-space communications) are
          polynomial codes over{" "}
          <InlineMath math="\mathbb{F}_{2^8}" />. BCH codes,
          Hamming codes, all finite-field algebra.
        </li>
        <li>
          <strong>Quantum error correction.</strong> Stabiliser
          codes are subgroups of the Pauli group; the algebra over{" "}
          <InlineMath math="\mathbb{F}_2" /> (or{" "}
          <InlineMath math="\mathbb{F}_4" />) determines code
          distance. Surface codes, the leading candidate for
          fault-tolerant quantum computing, are CSS codes built
          from classical binary codes.
        </li>
        <li>
          <strong>Number theory.</strong> Local-global principles,
          class field theory, the Langlands program — all rest on
          ring and field theory. Modular forms (used in Wiles's
          proof of Fermat's last theorem) are functions on quotient
          spaces of group actions.
        </li>
        <li>
          <strong>Algebraic geometry.</strong> Schemes are built from
          rings (commutative algebra is the local theory of
          algebraic geometry). Modern number theory speaks
          schemes-and-stacks fluently.
        </li>
      </ul>

      <p>
        Final chapter of this module: Galois theory. Why some
        polynomial equations are solvable by radicals (
        <InlineMath math="x^2 = 1 \to x = \pm 1" />,{" "}
        <InlineMath math="x^3 = 2 \to x = \sqrt[3] 2" />) and others
        are not (a generic quintic). The answer is in the symmetry
        groups of the field extensions where the roots live.
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
      "A field is a commutative ring in which…",
    options: [
      "every element has a multiplicative inverse",
      "every nonzero element has a multiplicative inverse",
      "every element is its own inverse",
      "addition equals multiplication",
    ],
    correct: 1,
    explanation:
      "Every *nonzero* element is invertible. Excluding 0 is necessary; otherwise the ring would have only one element.",
  },
  {
    prompt:
      "$\\mathbb{Z}/n\\mathbb{Z}$ is a field iff…",
    options: [
      "$n$ is even",
      "$n$ is prime",
      "$n$ is square-free",
      "always",
    ],
    correct: 1,
    explanation:
      "$\\mathbb{Z}/n$ is a field iff $n$ is prime — the maximality of $(p)$ in $\\mathbb{Z}$ for prime $p$ corresponds to $\\mathbb{Z}/(p)$ being a field.",
  },
  {
    prompt:
      "An ideal $M \\subsetneq R$ in a commutative ring is **maximal** iff…",
    options: [
      "$|M|$ is large",
      "$R/M$ is a field",
      "$M$ contains all primes",
      "$M$ is principal",
    ],
    correct: 1,
    explanation:
      "Maximal ideal ⇔ quotient is a field. Prime ideal ⇔ quotient is an integral domain. So fields correspond to maximal ideals.",
  },
  {
    prompt:
      "How many elements does $\\mathbb{F}_{p^k}$ have?",
    options: ["$p$", "$pk$", "$p^k$", "$\\binom{p}{k}$"],
    correct: 2,
    explanation:
      "By construction, $\\mathbb{F}_{p^k} = \\mathbb{F}_p[x] / (g(x))$ where $g$ is degree-$k$ irreducible, has $p^k$ cosets — coefficients of polynomials of degree $< k$ over $\\mathbb{F}_p$.",
  },
  {
    prompt:
      "In any finite field $\\mathbb{F}_q$, the multiplicative group $\\mathbb{F}_q^*$ is…",
    options: [
      "always trivial",
      "cyclic of order $q - 1$",
      "abelian but not cyclic",
      "non-abelian",
    ],
    correct: 1,
    explanation:
      "$\\mathbb{F}_q^*$ is always cyclic of order $q - 1$. A generator (primitive element) gives a discrete-log structure — the basis of finite-field Diffie–Hellman.",
  },
];
