import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function SpinBody() {
  return (
    <>
      <p>
        Spin is the quantum-mechanical angular momentum that has
        no classical analogue. Electrons have spin{" "}
        <InlineMath math="1/2" /> — meaning their internal
        angular-momentum-like state lives in a{" "}
        <InlineMath math="2" />-dimensional Hilbert space{" "}
        <InlineMath math="\mathbb{C}^2" />. This is the Hilbert
        space of a qubit. Most of quantum computing is "spin-{" "}
        <InlineMath math="1/2" /> in disguise" — the math of two-
        level systems with rotational structure.
      </p>
      <p>
        This chapter develops orbital angular momentum,
        introduces spin via the Stern-Gerlach experiment, builds
        Pauli matrices, and ends with the addition of angular
        momentum (singlet and triplet states for two spins).
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 8.05 — Lectures on angular momentum",
            author: "Barton Zwiebach",
            duration: "~10h",
            url: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/",
            note: "Zwiebach develops angular momentum and spin rigorously and beautifully.",
          },
          {
            title: "Sakurai — Modern QM, ch. 3",
            author: "Sakurai / Napolitano",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Modern_Quantum_Mechanics",
            note: "Sakurai's chapter on angular momentum is the canonical graduate treatment.",
          },
          {
            title: "Griffiths — Introduction to QM, ch. 4",
            author: "David Griffiths",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Introduction_to_Quantum_Mechanics_(book)",
            note: "Hydrogen atom + spin at undergraduate level. Excellent worked examples.",
          },
          {
            title: "Susskind — Theoretical Minimum: QM",
            author: "Leonard Susskind",
            duration: "~5h on spin",
            url: "https://theoreticalminimum.com/courses/quantum-mechanics",
            note: "Susskind develops everything from spin-1/2 first. Helpful complement.",
          },
          {
            title: "Stern-Gerlach experiment (history + Veritasium)",
            author: "various",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=stern+gerlach+experiment+visualized",
            note: "The 1922 experiment that forced spin onto physics. Worth watching one good video.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Orbital angular momentum</h2>

      <p>
        Classical angular momentum:{" "}
        <InlineMath math="\mathbf L = \mathbf r \times \mathbf p" />.
        Quantum: replace with operators.
      </p>
      <BlockMath math="\hat L_x = \hat y \hat p_z - \hat z \hat p_y, \quad \hat L_y = \hat z \hat p_x - \hat x \hat p_z, \quad \hat L_z = \hat x \hat p_y - \hat y \hat p_x." />

      <p>
        Using the canonical commutators{" "}
        <InlineMath math="[\hat r_i, \hat p_j] = i\hbar \delta_{ij}" />,
        the angular-momentum components don't all commute:
      </p>
      <BlockMath math="[\hat L_x, \hat L_y] = i \hbar \hat L_z, \quad [\hat L_y, \hat L_z] = i\hbar \hat L_x, \quad [\hat L_z, \hat L_x] = i\hbar \hat L_y." />

      <p>
        Cyclic. We can't simultaneously measure two components —
        another uncertainty relation. But{" "}
        <InlineMath math="\hat L^2 = \hat L_x^2 + \hat L_y^2 + \hat L_z^2" />{" "}
        commutes with each component, so we can simultaneously
        diagonalise{" "}
        <InlineMath math="\hat L^2" /> and one component, usually{" "}
        <InlineMath math="\hat L_z" />.
      </p>

      <h3>Eigenvalues</h3>

      <Callout title="Angular momentum spectrum">
        Joint eigenstates{" "}
        <InlineMath math="|\ell, m\rangle" /> satisfy
        <BlockMath math="\hat L^2 |\ell, m\rangle = \hbar^2 \ell(\ell + 1) |\ell, m\rangle, \qquad \hat L_z |\ell, m\rangle = \hbar m |\ell, m\rangle," />
        with{" "}
        <InlineMath math="\ell = 0, 1, 2, \dots" /> (orbital
        angular momentum quantum number) and{" "}
        <InlineMath math="m = -\ell, -\ell + 1, \dots, \ell" />{" "}
        (magnetic quantum number,{" "}
        <InlineMath math="2\ell + 1" /> values).
      </Callout>

      <p>
        Discrete spectrum from boundary conditions; falls out
        algebraically using ladder operators{" "}
        <InlineMath math="\hat L_\pm = \hat L_x \pm i \hat L_y" />.
        Same kind of structure as the harmonic oscillator (Module
        XIV). The ladder structure is{" "}
        <em>universal</em> for systems with{" "}
        <InlineMath math="SU(2)" /> /{" "}
        <InlineMath math="SO(3)" /> rotational symmetry.
      </p>

      <p>
        The eigenfunctions in position space are spherical
        harmonics{" "}
        <InlineMath math="Y_\ell^m(\theta, \varphi)" /> — basis
        for the Hilbert space of functions on the sphere.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Spin from Stern-Gerlach</h2>

      <p>
        Stern and Gerlach (1922) sent a beam of silver atoms
        through an inhomogeneous magnetic field. Classically:
        atoms with magnetic moments would deflect by amounts
        spread continuously according to the projection of their
        moments. Observed: <em>two</em> sharp spots — beam
        splits cleanly into two.
      </p>

      <p>
        Atoms have an intrinsic angular momentum (
        <em>spin</em>) with only two possible values along any
        given axis. For silver atoms (and electrons), this is
        spin-<InlineMath math="1/2" />: eigenvalues{" "}
        <InlineMath math="\hat S_z = \pm \hbar/2" />. No
        orbital-angular-momentum quantum number{" "}
        <InlineMath math="\ell" /> can give two states (
        <InlineMath math="\ell" /> integer ⇒ odd number of
        states). Spin must be a new degree of freedom with{" "}
        <InlineMath math="s = 1/2" />, allowing{" "}
        <InlineMath math="2s + 1 = 2" /> states.
      </p>

      <h3>Spin operators</h3>

      <p>
        Spin operators satisfy the same algebra as orbital
        angular momentum:
      </p>
      <BlockMath math="[\hat S_x, \hat S_y] = i\hbar \hat S_z, \quad \text{etc.}" />

      <p>
        For spin-<InlineMath math="1/2" />, in the basis{" "}
        <InlineMath math="\{|+\rangle, |-\rangle\}" /> of{" "}
        <InlineMath math="\hat S_z" /> eigenstates with{" "}
        <InlineMath math="\hat S_z |\pm\rangle = \pm (\hbar/2) |\pm\rangle" />:
      </p>
      <BlockMath math="\hat S_x = \frac{\hbar}{2} \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \;\; \hat S_y = \frac{\hbar}{2} \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}, \;\; \hat S_z = \frac{\hbar}{2} \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}." />

      <p>
        These are the famous <strong>Pauli matrices</strong>:{" "}
        <InlineMath math="\hat S_i = (\hbar/2) \sigma_i" />.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Pauli matrices</h2>

      <Callout title="The Pauli matrices">
        <BlockMath math="\sigma_x = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \quad \sigma_y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}, \quad \sigma_z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}." />
      </Callout>

      <p>
        Properties:
      </p>
      <ul>
        <li>
          Hermitian (<InlineMath math="\sigma_i^\dagger = \sigma_i" />).
        </li>
        <li>
          Unitary (<InlineMath math="\sigma_i^2 = I" />).
        </li>
        <li>
          Tracelelss (<InlineMath math="\mathrm{tr}\,\sigma_i = 0" />),
          determinant{" "}
          <InlineMath math="-1" />.
        </li>
        <li>
          Eigenvalues{" "}
          <InlineMath math="\pm 1" />.
        </li>
        <li>
          Anti-commute:{" "}
          <InlineMath math="\sigma_i \sigma_j + \sigma_j \sigma_i = 2 \delta_{ij} I" />.
        </li>
        <li>
          Commute up to{" "}
          <InlineMath math="i" /> times another:{" "}
          <InlineMath math="[\sigma_i, \sigma_j] = 2 i \epsilon_{ijk} \sigma_k" />.
        </li>
        <li>
          Combined:{" "}
          <InlineMath math="\sigma_i \sigma_j = \delta_{ij} I + i \epsilon_{ijk} \sigma_k" />.
        </li>
      </ul>

      <p>
        Together with the identity, they form a basis for the{" "}
        <InlineMath math="2 \times 2" /> Hermitian matrices.
      </p>

      <h3>Rotations</h3>

      <p>
        A rotation by angle <InlineMath math="\theta" /> about
        axis <InlineMath math="\hat{\mathbf n}" /> on a
        spin-<InlineMath math="1/2" /> state:
      </p>
      <BlockMath math="\hat R(\theta, \hat{\mathbf n}) = e^{-i \theta \, \hat{\mathbf n} \cdot \boldsymbol{\sigma} / 2} = \cos(\theta/2) I - i \sin(\theta/2) \, \hat{\mathbf n} \cdot \boldsymbol{\sigma}." />

      <p>
        Two striking features:
      </p>
      <ul>
        <li>
          A <InlineMath math="2\pi" /> rotation gives{" "}
          <InlineMath math="\hat R = -I" />, not{" "}
          <InlineMath math="+I" />! Spin-<InlineMath math="1/2" />{" "}
          states need{" "}
          <InlineMath math="4\pi" /> rotation to come back to
          themselves. This is observable in neutron interference
          experiments — it's a real physical fact.
        </li>
        <li>
          Spin-<InlineMath math="1/2" /> doesn't transform as a{" "}
          <em>vector</em> under rotations; it transforms as a{" "}
          <em>spinor</em> — half of a vector. The group of these
          is <InlineMath math="SU(2)" />, the double cover of{" "}
          <InlineMath math="SO(3)" />.
        </li>
      </ul>

      <Pitfall>
        Spin is sometimes intuited as "the electron spinning
        like a top". Don't take this seriously. The Bohr radius
        / classical spinning would require equator velocity{" "}
        {">"}c. Spin is genuinely intrinsic — a degree of
        freedom that has the algebra of angular momentum without
        a literal rotation.
      </Pitfall>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Spin precession</h2>

      <p>
        A spin in magnetic field <InlineMath math="\mathbf B" />{" "}
        has Hamiltonian
      </p>
      <BlockMath math="\hat H = -\boldsymbol{\mu} \cdot \mathbf B = -\gamma \, \hat{\mathbf S} \cdot \mathbf B" />

      <p>
        with{" "}
        <InlineMath math="\boldsymbol{\mu}" /> the magnetic
        moment and{" "}
        <InlineMath math="\gamma" /> the gyromagnetic ratio. The
        spin precesses around <InlineMath math="\mathbf B" /> at
        the Larmor frequency{" "}
        <InlineMath math="\omega_L = \gamma B" />.
      </p>

      <p>
        Practical use: <strong>NMR / MRI</strong>. Hydrogen
        nuclei in a strong magnetic field precess at radio
        frequencies; an RF pulse tips them; their relaxation
        gives signal. Different tissues have different
        relaxation times — the basis of medical imaging.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Addition of angular momenta</h2>

      <p>
        Two spin-<InlineMath math="1/2" /> particles. Their joint
        Hilbert space is{" "}
        <InlineMath math="\mathbb{C}^2 \otimes \mathbb{C}^2 = \mathbb{C}^4" />,
        with basis
      </p>
      <BlockMath math="|++\rangle, \;\; |+-\rangle, \;\; |-+\rangle, \;\; |--\rangle." />

      <p>
        Total spin{" "}
        <InlineMath math="\hat{\mathbf S} = \hat{\mathbf S}_1 + \hat{\mathbf S}_2" />.
        Possible total-spin quantum numbers:{" "}
        <InlineMath math="S = 0" /> (singlet) or{" "}
        <InlineMath math="S = 1" /> (triplet).
      </p>

      <p>
        Decomposition:
      </p>

      <ul>
        <li>
          <strong>Triplet</strong> (<InlineMath math="S = 1" />,
          three states):
          <BlockMath math="|1, +1\rangle = |++\rangle, \;\; |1, 0\rangle = \tfrac{1}{\sqrt 2}(|+-\rangle + |-+\rangle), \;\; |1, -1\rangle = |--\rangle." />
        </li>
        <li>
          <strong>Singlet</strong> (<InlineMath math="S = 0" />,
          one state):
          <BlockMath math="|0, 0\rangle = \tfrac{1}{\sqrt 2}(|+-\rangle - |-+\rangle)." />
        </li>
      </ul>

      <p>
        The singlet state is <em>antisymmetric</em> under
        exchange of the two particles; the triplet is
        symmetric. This pattern is universal — Clebsch-Gordan
        decomposition gives multi-spin states explicit
        coefficients.
      </p>

      <h3>Notation</h3>

      <p>
        General rule (Clebsch-Gordan):{" "}
        <InlineMath math="j_1 \otimes j_2 = (j_1 + j_2) \oplus (j_1 + j_2 - 1) \oplus \cdots \oplus |j_1 - j_2|" />.
        Two spin-1/2:{" "}
        <InlineMath math="\tfrac{1}{2} \otimes \tfrac{1}{2} = 1 \oplus 0" /> —
        triplet plus singlet.
      </p>

      <p>
        Three spin-1/2:{" "}
        <InlineMath math="\tfrac{1}{2} \otimes \tfrac{1}{2} \otimes \tfrac{1}{2} = \tfrac{3}{2} \oplus \tfrac{1}{2} \oplus \tfrac{1}{2}" />.
        Etc.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Atomic structure.</strong> The periodic table
          is determined by electron orbitals (with quantum
          numbers <InlineMath math="n, \ell, m_\ell, m_s" />) and
          the Pauli exclusion principle. Spin gives the factor
          of 2 in the shell occupations, splitting noble gases
          at the right intervals.
        </li>
        <li>
          <strong>Magnetism.</strong> Permanent magnets,
          ferromagnetism, antiferromagnetism — all from the
          interplay of electron spins with the Pauli principle
          (exchange interaction).
        </li>
        <li>
          <strong>Quantum computing.</strong> Qubits are
          spin-1/2 systems, mathematically. Pauli matrices are
          the single-qubit Pauli gates X, Y, Z. Rotations on
          the Bloch sphere are{" "}
          <InlineMath math="e^{-i\theta \boldsymbol\sigma \cdot \hat{\mathbf n}/2}" />.
        </li>
        <li>
          <strong>NMR, MRI, EPR.</strong> Medical imaging,
          chemical structure determination, and quantum
          computing implementations all use spin precession.
        </li>
        <li>
          <strong>Particle physics.</strong> Quarks (spin-1/2)
          and gluons / photons (spin-1) and pions (spin-0) and
          gravitons (spin-2). Particle types are largely
          classified by spin. The Standard Model representations
          are chosen to match observed spins.
        </li>
      </ul>

      <p>
        Next chapter: entanglement and Bell inequalities — the
        most counter-intuitive quantum phenomenon, and the
        resource that quantum computing exploits.
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
      "Pauli matrices satisfy $\\sigma_i^2 = $",
    options: ["0", "$i$", "$I$", "$\\sigma_j$"],
    correct: 2,
    explanation:
      "$\\sigma_i^2 = I$ for each Pauli. Combined with anti-commutation $\\{\\sigma_i, \\sigma_j\\} = 2\\delta_{ij}$, this gives the Clifford algebra structure.",
  },
  {
    prompt:
      "Eigenvalues of any Pauli matrix are…",
    options: ["$0, 1$", "$\\pm 1$", "$\\pm i$", "$\\pm \\hbar/2$"],
    correct: 1,
    explanation:
      "Pauli matrices have eigenvalues $\\pm 1$. The corresponding spin operators $\\hat S_i = (\\hbar/2)\\sigma_i$ have eigenvalues $\\pm \\hbar/2$ — the two possible spin projections.",
  },
  {
    prompt:
      "A $2\\pi$ rotation of a spin-1/2 state gives…",
    options: ["the original state", "$-1$ times the original state", "zero", "an entangled state"],
    correct: 1,
    explanation:
      "Spin-1/2 needs $4\\pi$ to return to itself; $2\\pi$ gives $-|\\psi\\rangle$. This is the SU(2)-double-cover-of-SO(3) feature, observable in neutron-interference experiments.",
  },
  {
    prompt:
      "Two spin-1/2 particles couple to total spin… (Clebsch-Gordan)",
    options: [
      "always 1",
      "always 0",
      "1 (triplet) or 0 (singlet) — three triplet states + one singlet",
      "anywhere from 0 to 1 continuously",
    ],
    correct: 2,
    explanation:
      "$\\tfrac{1}{2} \\otimes \\tfrac{1}{2} = 1 \\oplus 0$. The 4-dim two-qubit space decomposes into a 3-dim triplet (S = 1) and a 1-dim singlet (S = 0). The singlet is antisymmetric, the triplet is symmetric under exchange.",
  },
  {
    prompt:
      "Which experiment first demonstrated spin (1922)?",
    options: [
      "Davisson-Germer",
      "Stern-Gerlach",
      "Compton scattering",
      "Photoelectric effect",
    ],
    correct: 1,
    explanation:
      "Stern-Gerlach: silver atoms passing through inhomogeneous magnetic field split into two beams, not a continuous spread. Forced introduction of intrinsic spin-1/2.",
  },
];
