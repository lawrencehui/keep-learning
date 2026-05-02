import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function GroupsBody() {
  return (
    <>
      <p>
        Abstract algebra is the study of <em>structure</em>: what
        emerges when you forget the specific objects and keep only
        the operations. A "group" is the cleanest example —
        anything you can do, undo, and combine forms a group, and
        any theorem you prove about groups in the abstract applies
        to integers, symmetries of crystals, permutations of cards,
        and (centrally for us) quantum gates.
      </p>
      <p>
        The whole module sits on this foundation: groups → rings →
        fields, with Galois theory at the apex. The payoff is dual.
        On the math side, every later abstraction (modules, schemes,
        Lie groups, Hopf algebras) needs this vocabulary. On the
        physics side, symmetries are groups, conservation laws come
        from group representations (Noether's theorem), and gauge
        theory is differential geometry of group-valued fields.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.701 — Algebra I (Artin)",
            author: "Prof. Michael Artin (MIT OCW)",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/18-701-algebra-i-fall-2010/",
            note: "Artin's course is the classic. Lectures + recitations.",
          },
          {
            title: "Dummit &amp; Foote — Abstract Algebra",
            author: "Dummit / Foote",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Abstract_Algebra_(book)",
            note: "The standard graduate-level reference. Encyclopaedic; great for lookups.",
          },
          {
            title: "Visual Group Theory",
            author: "Nathan Carter",
            duration: "Reading",
            url: "https://www.maa.org/press/maa-reviews/visual-group-theory",
            note: "Highly visual, intuition-first introduction. Worth reading early.",
          },
          {
            title: "3Blue1Brown — Group theory",
            author: "3Blue1Brown",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=3blue1brown+group+theory",
            note: "Several short videos on the symmetry-group view. Great motivation.",
          },
          {
            title: "Symmetry and the Monster",
            author: "Mark Ronan",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Symmetry_and_the_Monster",
            note: "Pop-math history of the classification of finite simple groups. Story-driven.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Definition and axioms</h2>

      <Callout title="Group">
        A <strong>group</strong> is a set <InlineMath math="G" /> with
        a binary operation <InlineMath math="* : G \times G \to G" />{" "}
        satisfying:
        <ol>
          <li>
            <strong>Associativity:</strong>{" "}
            <InlineMath math="(a * b) * c = a * (b * c)" />.
          </li>
          <li>
            <strong>Identity:</strong> there exists{" "}
            <InlineMath math="e \in G" /> with{" "}
            <InlineMath math="a * e = e * a = a" /> for all{" "}
            <InlineMath math="a" />.
          </li>
          <li>
            <strong>Inverses:</strong> for each{" "}
            <InlineMath math="a \in G" />, there exists{" "}
            <InlineMath math="a^{-1}" /> with{" "}
            <InlineMath math="a * a^{-1} = a^{-1} * a = e" />.
          </li>
        </ol>
      </Callout>

      <p>
        If additionally <InlineMath math="a * b = b * a" /> for all{" "}
        <InlineMath math="a, b" />, the group is{" "}
        <strong>abelian</strong> (or <em>commutative</em>). Most groups
        you'll meet in physics are non-abelian — that's where the
        action is.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Examples</h2>

      <p>
        Read each carefully — the variety is the point.
      </p>

      <ul>
        <li>
          <strong>The integers under addition</strong>{" "}
          <InlineMath math="(\mathbb{Z}, +)" />. Identity 0, inverses{" "}
          <InlineMath math="-n" />. Abelian. Same for{" "}
          <InlineMath math="\mathbb{Q}, \mathbb{R}, \mathbb{C}" />.
        </li>
        <li>
          <strong>Integers mod n under addition</strong>{" "}
          <InlineMath math="(\mathbb{Z}/n\mathbb{Z}, +)" />. Finite
          cyclic group of order <InlineMath math="n" />, generated
          by 1.
        </li>
        <li>
          <strong>Units mod n</strong>{" "}
          <InlineMath math="((\mathbb{Z}/n\mathbb{Z})^*, \times)" />.
          The integers coprime to <InlineMath math="n" /> form a
          group under multiplication. Order{" "}
          <InlineMath math="\varphi(n)" /> (Euler's totient).
        </li>
        <li>
          <strong>Symmetric group</strong>{" "}
          <InlineMath math="S_n" /> = permutations of{" "}
          <InlineMath math="\{1, 2, \dots, n\}" /> under composition.
          Order <InlineMath math="n!" />. Non-abelian for{" "}
          <InlineMath math="n \geq 3" />.
        </li>
        <li>
          <strong>Dihedral group</strong>{" "}
          <InlineMath math="D_n" /> = symmetries of a regular{" "}
          <InlineMath math="n" />-gon (rotations + reflections).
          Order <InlineMath math="2n" />, non-abelian.
        </li>
        <li>
          <strong>General linear group</strong>{" "}
          <InlineMath math="GL_n(\mathbb{R})" /> = invertible{" "}
          <InlineMath math="n \times n" /> real matrices under
          multiplication. Continuous (Lie) group, non-abelian.
        </li>
        <li>
          <strong>Special unitary group</strong>{" "}
          <InlineMath math="SU(n)" /> = unitary{" "}
          <InlineMath math="n \times n" /> complex matrices with
          determinant 1. The symmetry group of quantum gauge
          theories.
        </li>
        <li>
          <strong>Cyclic groups</strong>{" "}
          <InlineMath math="\mathbb{Z}/n\mathbb{Z}" />: smallest
          finite groups, generated by a single element.
        </li>
      </ul>

      <p>
        Group order <InlineMath math="|G|" /> = number of elements
        (possibly infinite). For finite groups, structure is more
        constrained and theorems are richer.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Subgroups</h2>

      <p>
        A subset <InlineMath math="H \subseteq G" /> is a{" "}
        <strong>subgroup</strong> if it's a group under the same
        operation: closed under{" "}
        <InlineMath math="*" />, contains the identity, and contains
        inverses.
      </p>

      <p>
        Examples:
      </p>
      <ul>
        <li>
          The even integers are a subgroup of{" "}
          <InlineMath math="(\mathbb{Z}, +)" />.
        </li>
        <li>
          Rotations form a subgroup of <InlineMath math="D_n" /> (
          dropping the reflections).
        </li>
        <li>
          The cyclic subgroup generated by{" "}
          <InlineMath math="g \in G" />:{" "}
          <InlineMath math="\langle g \rangle = \{e, g, g^2, g^3, \dots\}" />.
          Always a subgroup. Its size equals the{" "}
          <em>order</em> of <InlineMath math="g" /> — smallest
          positive <InlineMath math="k" /> with{" "}
          <InlineMath math="g^k = e" />.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Cosets and Lagrange's theorem</h2>

      <p>
        For a subgroup <InlineMath math="H \leq G" />, the{" "}
        <strong>left cosets</strong> are{" "}
        <InlineMath math="gH = \{gh : h \in H\}" /> for each{" "}
        <InlineMath math="g \in G" />.
      </p>

      <p>
        Key facts:
      </p>
      <ul>
        <li>
          The cosets partition <InlineMath math="G" /> — every
          element is in exactly one coset.
        </li>
        <li>
          All cosets have the same size{" "}
          <InlineMath math="|H|" />.
        </li>
        <li>
          The number of distinct cosets is the{" "}
          <strong>index</strong>{" "}
          <InlineMath math="[G : H]" />.
        </li>
      </ul>

      <Callout title="Lagrange's theorem">
        For a finite group <InlineMath math="G" /> with subgroup{" "}
        <InlineMath math="H \leq G" />:
        <BlockMath math="|G| = [G : H] \cdot |H|." />
        In particular, <InlineMath math="|H|" /> divides{" "}
        <InlineMath math="|G|" />.
      </Callout>

      <p>
        Lagrange + cyclic subgroup{" "}
        <InlineMath math="\langle g \rangle" /> immediately gives:
        the order of any element divides the order of the group.
        Setting <InlineMath math="g^{|G|} = e" /> drops out: every
        element to the order of the group is the identity.
      </p>

      <p>
        Sub-corollary: groups of prime order <InlineMath math="p" />{" "}
        have no proper non-trivial subgroups, so they're cyclic
        (generated by any non-identity element). Up to isomorphism
        the only group of prime order <InlineMath math="p" /> is{" "}
        <InlineMath math="\mathbb{Z}/p" />.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Homomorphisms and isomorphisms</h2>

      <p>
        A <strong>homomorphism</strong>{" "}
        <InlineMath math="\varphi : G \to H" /> is a map respecting
        the group operations:
      </p>
      <BlockMath math="\varphi(a *_G b) = \varphi(a) *_H \varphi(b)." />

      <p>
        Properties (each direct from the definition):
      </p>
      <ul>
        <li>
          <InlineMath math="\varphi(e_G) = e_H" />.
        </li>
        <li>
          <InlineMath math="\varphi(a^{-1}) = \varphi(a)^{-1}" />.
        </li>
      </ul>

      <p>
        An <strong>isomorphism</strong> is a bijective homomorphism;
        groups are <em>isomorphic</em> if there's an isomorphism
        between them, written{" "}
        <InlineMath math="G \cong H" />. Isomorphic groups are "the
        same" for all algebraic purposes — they have identical group
        structure, even if their elements wear different clothes.
      </p>

      <p>
        Two examples worth knowing:
      </p>
      <ul>
        <li>
          <InlineMath math="(\mathbb{R}, +) \cong (\mathbb{R}_{> 0}, \times)" />{" "}
          via the exponential map. Addition becomes multiplication.
          (This is why the slide rule worked.)
        </li>
        <li>
          <InlineMath math="\mathbb{Z}/12 \cong \mathbb{Z}/3 \times \mathbb{Z}/4" />{" "}
          via the Chinese Remainder Theorem. CRT is an isomorphism.
        </li>
      </ul>

      <h3>Kernel and image</h3>

      <p>
        For a homomorphism{" "}
        <InlineMath math="\varphi : G \to H" />:
      </p>
      <ul>
        <li>
          <strong>Kernel:</strong>{" "}
          <InlineMath math="\ker \varphi = \{g \in G : \varphi(g) = e_H\}" />.
          A subgroup of <InlineMath math="G" />.
        </li>
        <li>
          <strong>Image:</strong>{" "}
          <InlineMath math="\operatorname{im} \varphi = \varphi(G)" />.
          A subgroup of <InlineMath math="H" />.
        </li>
      </ul>

      <p>
        <InlineMath math="\varphi" /> is injective iff{" "}
        <InlineMath math="\ker \varphi = \{e\}" /> (the trivial
        subgroup). Surjectivity is{" "}
        <InlineMath math="\operatorname{im} \varphi = H" />.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Normal subgroups and quotients</h2>

      <p>
        A subgroup <InlineMath math="N \leq G" /> is{" "}
        <strong>normal</strong>, written{" "}
        <InlineMath math="N \triangleleft G" />, if{" "}
        <InlineMath math="gNg^{-1} = N" /> for every{" "}
        <InlineMath math="g \in G" />. Equivalently, left cosets
        equal right cosets:{" "}
        <InlineMath math="gN = Ng" />.
      </p>

      <p>
        For abelian groups, every subgroup is normal (
        <InlineMath math="gng^{-1} = n" /> trivially). Non-abelian
        groups have a mix of normal and non-normal subgroups.
      </p>

      <p>
        When <InlineMath math="N" /> is normal, the cosets form a
        new group under{" "}
        <InlineMath math="(g_1 N)(g_2 N) = (g_1 g_2) N" />. This is
        the <strong>quotient group</strong>{" "}
        <InlineMath math="G/N" />. Order{" "}
        <InlineMath math="[G : N] = |G|/|N|" /> (when finite).
      </p>

      <p>
        <strong>Example.</strong>{" "}
        <InlineMath math="\mathbb{Z}/n\mathbb{Z}" /> is the quotient
        of <InlineMath math="\mathbb{Z}" /> by the subgroup{" "}
        <InlineMath math="n\mathbb{Z}" />. The cosets are the residue
        classes mod <InlineMath math="n" />.
      </p>

      <Callout title="First isomorphism theorem">
        For a homomorphism{" "}
        <InlineMath math="\varphi : G \to H" />, the kernel is
        normal, and
        <BlockMath math="G / \ker \varphi \;\cong\; \operatorname{im} \varphi." />
      </Callout>

      <p>
        Every homomorphism factors through its quotient by the
        kernel. This is the most useful theorem in elementary group
        theory — most "find the structure of <InlineMath math="G/N" />"
        problems amount to producing a homomorphism and applying the
        first isomorphism theorem.
      </p>

      <Pitfall>
        Not every subgroup admits a quotient. The "subgroup-of-
        quotient" construction requires{" "}
        <em>normality</em>. In <InlineMath math="S_3" />, the
        cyclic subgroup of order 2 is not normal, so you can't
        form <InlineMath math="S_3 / \langle (1\,2) \rangle" /> as a
        group.
      </Pitfall>

      <Exercise
        number="6.1"
        prompt={
          <>
            Show that the subgroup{" "}
            <InlineMath math="A_n \subset S_n" /> of even
            permutations is normal in{" "}
            <InlineMath math="S_n" />.
          </>
        }
      >
        <p>
          Define{" "}
          <InlineMath math="\operatorname{sgn} : S_n \to \{\pm 1\}" />{" "}
          (the sign homomorphism, sending a permutation to{" "}
          <InlineMath math="+1" /> if even,{" "}
          <InlineMath math="-1" /> if odd). It's a homomorphism (
          composing two evens is even, etc.). The kernel is{" "}
          <InlineMath math="A_n" />. Kernels of homomorphisms are
          always normal. ∎
        </p>
        <p>
          Bonus: the first iso theorem gives{" "}
          <InlineMath math="S_n / A_n \cong \mathbb{Z}/2" />. So{" "}
          <InlineMath math="A_n" /> has index 2 in{" "}
          <InlineMath math="S_n" />.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Group actions</h2>

      <p>
        A <strong>group action</strong> of{" "}
        <InlineMath math="G" /> on a set <InlineMath math="X" /> is
        a map{" "}
        <InlineMath math="G \times X \to X" /> satisfying:
      </p>
      <ul>
        <li>
          <InlineMath math="e \cdot x = x" />.
        </li>
        <li>
          <InlineMath math="(gh) \cdot x = g \cdot (h \cdot x)" />.
        </li>
      </ul>

      <p>
        Equivalent: a homomorphism{" "}
        <InlineMath math="G \to \mathrm{Sym}(X)" /> from{" "}
        <InlineMath math="G" /> into permutations of{" "}
        <InlineMath math="X" />.
      </p>

      <p>
        Examples:
      </p>
      <ul>
        <li>
          <InlineMath math="GL_n(\mathbb{R})" /> acts on{" "}
          <InlineMath math="\mathbb{R}^n" /> by matrix-vector
          multiplication.
        </li>
        <li>
          <InlineMath math="S_n" /> acts on{" "}
          <InlineMath math="\{1, 2, \dots, n\}" /> by permutation.
        </li>
        <li>
          The rotation group <InlineMath math="SO(3)" /> acts on
          3D space.
        </li>
      </ul>

      <h3>Orbits and stabilisers</h3>

      <p>
        Given an action and a point{" "}
        <InlineMath math="x \in X" />:
      </p>
      <ul>
        <li>
          <strong>Orbit</strong>{" "}
          <InlineMath math="\mathrm{Orb}(x) = \{g \cdot x : g \in G\}" /> —
          all the points <InlineMath math="x" /> can reach.
        </li>
        <li>
          <strong>Stabiliser</strong>{" "}
          <InlineMath math="\mathrm{Stab}(x) = \{g : g \cdot x = x\}" /> —
          a subgroup of <InlineMath math="G" />.
        </li>
      </ul>

      <Callout title="Orbit–stabiliser theorem">
        For a group action of finite{" "}
        <InlineMath math="G" /> on{" "}
        <InlineMath math="X" />:
        <BlockMath math="|\mathrm{Orb}(x)| = |G| / |\mathrm{Stab}(x)|." />
      </Callout>

      <p>
        Useful for counting. The number of equivalence classes
        under a group action (number of orbits) often has a clean
        formula by Burnside's lemma — applied to count colourings
        of a cube up to rotation, for instance.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>Symmetry.</strong> Every notion of "preserves
          structure" is a group: rotations of a sphere, congruences
          of a polygon, automorphisms of a graph. Crystallography
          classifies crystals by their symmetry groups (the 230
          space groups).
        </li>
        <li>
          <strong>Conservation laws (Noether's theorem).</strong>{" "}
          Every continuous symmetry of a Lagrangian gives a
          conservation law. Translation invariance ↔ momentum
          conservation; rotation ↔ angular momentum; time
          invariance ↔ energy. The mathematical bridge is Lie
          groups.
        </li>
        <li>
          <strong>Quantum mechanics.</strong> Symmetries act on
          state space; observables are preserved by symmetry
          generators. Angular momentum operators generate
          rotations and have algebraic structure (Lie algebra of{" "}
          <InlineMath math="SO(3)" />). Spin is a representation of
          <InlineMath math="SU(2)" /> (the double cover of{" "}
          <InlineMath math="SO(3)" />), which is why electrons
          come back to themselves only after a 720° rotation.
        </li>
        <li>
          <strong>Gauge theory and the Standard Model.</strong>{" "}
          Forces come from gauge groups: electromagnetism is{" "}
          <InlineMath math="U(1)" />, the weak force is{" "}
          <InlineMath math="SU(2)" />, the strong force is{" "}
          <InlineMath math="SU(3)" />. Particles are
          representations of these.
        </li>
        <li>
          <strong>Cryptography.</strong> Public-key crypto runs on
          discrete logs in groups: RSA in{" "}
          <InlineMath math="(\mathbb{Z}/n\mathbb{Z})^*" />,
          ECDSA in elliptic-curve groups. The hardness depends on
          the group structure, and Shor's quantum algorithm
          attacks discrete logs in <em>any</em> abelian group.
        </li>
        <li>
          <strong>Quantum computing.</strong> Quantum gates are
          unitary matrices — elements of{" "}
          <InlineMath math="U(2^n)" />. Quantum circuits are
          words in the gate group. Fault-tolerant codes use
          stabiliser groups (subgroups of the Pauli group).
        </li>
      </ul>

      <p>
        Next chapter: rings and fields. Two operations, more
        structure, and the natural setting for polynomial roots,
        modular arithmetic, and finite-field cryptography.
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
      "A group requires which property?",
    options: [
      "commutativity",
      "associativity, identity, and inverses",
      "finitely many elements",
      "being abelian",
    ],
    correct: 1,
    explanation:
      "Three axioms: associativity, identity, inverses. Commutativity is the additional condition for abelian groups but not required for all groups.",
  },
  {
    prompt:
      "By Lagrange's theorem, the order of every subgroup of a finite group $G$…",
    options: [
      "equals $|G|$",
      "divides $|G|$",
      "is greater than $|G|/2$",
      "is prime",
    ],
    correct: 1,
    explanation:
      "$|G| = [G : H] \\cdot |H|$, so $|H| \\mid |G|$. Consequence: order of any element divides $|G|$; groups of prime order are cyclic.",
  },
  {
    prompt:
      "A homomorphism $\\varphi : G \\to H$ is injective iff…",
    options: [
      "$\\varphi$ is surjective",
      "$\\ker \\varphi = \\{e\\}$",
      "$\\varphi$ is the identity",
      "$|G| = |H|$",
    ],
    correct: 1,
    explanation:
      "Trivial kernel ⇔ injective. (For two elements with the same image, their 'difference' lies in the kernel, so trivial kernel means images uniquely determine inputs.)",
  },
  {
    prompt:
      "A subgroup $N \\leq G$ is normal iff…",
    options: [
      "$N$ is abelian",
      "$N$ has prime order",
      "$gNg^{-1} = N$ for all $g \\in G$",
      "$N$ is finite",
    ],
    correct: 2,
    explanation:
      "Normal = invariant under conjugation. Equivalently, left cosets equal right cosets, which is what allows $G/N$ to be a group.",
  },
  {
    prompt:
      "The First Isomorphism Theorem says: for $\\varphi : G \\to H$…",
    options: [
      "$G \\cong H$",
      "$G / \\ker \\varphi \\cong \\operatorname{im} \\varphi$",
      "$\\varphi$ is always surjective",
      "$|G| = |H|$",
    ],
    correct: 1,
    explanation:
      "Quotient by the kernel is isomorphic to the image. Lets you read structure of the quotient by exhibiting a homomorphism with the right image.",
  },
];
