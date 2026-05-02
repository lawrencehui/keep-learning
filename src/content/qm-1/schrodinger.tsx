import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function SchrodingerBody() {
  return (
    <>
      <p>
        Schrödinger's equation is the fundamental equation of
        non-relativistic quantum mechanics. Like Newton's{" "}
        <InlineMath math="\mathbf{F} = m\mathbf{a}" /> in
        classical mechanics, it determines how the state of a
        quantum system evolves in time. But unlike Newton, the
        state is not a position-and-momentum but a{" "}
        <em>wavefunction</em> — a complex-valued field over
        configuration space whose squared modulus gives
        probability.
      </p>
      <p>
        This chapter develops the wavefunction, the Born rule
        interpretation, the time-dependent and time-independent
        Schrödinger equations, and stationary states. By the end,
        you have the mathematical machinery to solve any
        non-relativistic quantum system in principle, given a
        Hamiltonian.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 8.04 — Quantum Physics I (Adams)",
            author: "Allan Adams (MIT OCW)",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
            note: "Lectures 4–10 cover this chapter rigorously.",
          },
          {
            title: "Griffiths — Introduction to QM, ch. 1–2",
            author: "David Griffiths",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Introduction_to_Quantum_Mechanics_(book)",
            note: "Chapters 1–2 develop the wavefunction and Schrödinger equation. Excellent.",
          },
          {
            title: "Susskind — Theoretical Minimum: QM",
            author: "Leonard Susskind",
            duration: "~10h",
            url: "https://theoreticalminimum.com/courses/quantum-mechanics",
            note: "Susskind's lectures derive the Schrödinger equation from operator considerations.",
          },
          {
            title: "Sakurai — Modern Quantum Mechanics, ch. 1–2",
            author: "Sakurai / Napolitano",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Modern_Quantum_Mechanics",
            note: "Graduate-level treatment, abstract from the start (states as kets, observables as operators). The standard graduate textbook.",
          },
          {
            title: "Hall — Quantum Theory for Mathematicians",
            author: "Brian Hall",
            duration: "Reading",
            url: "https://www.springer.com/book/9781461471158",
            note: "Mathematically rigorous: builds Schrödinger from Stone's theorem on Hilbert space.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The wavefunction</h2>

      <p>
        For a single particle in 3D space, the quantum state is
        described by a complex-valued function{" "}
      </p>
      <BlockMath math="\psi : \mathbb{R}^3 \times \mathbb{R} \to \mathbb{C}, \qquad \psi(\mathbf{r}, t)." />

      <p>
        — the <strong>wavefunction</strong>. It contains
        everything physics can say about the particle's state.
        Two conditions:
      </p>

      <ul>
        <li>
          <strong>Square integrable</strong>:{" "}
          <InlineMath math="\int |\psi|^2 \, d^3 r < \infty" />.
          So <InlineMath math="\psi \in L^2(\mathbb{R}^3)" />, the
          Hilbert space of quantum mechanics.
        </li>
        <li>
          <strong>Normalised</strong>:{" "}
          <InlineMath math="\int |\psi|^2 \, d^3 r = 1" />. Set by
          convention; we can always rescale.
        </li>
      </ul>

      <p>
        The wavefunction is not directly observable. What's
        observable is given by the Born rule.
      </p>

      <Callout title="Born's rule (1926)">
        For a normalised wavefunction{" "}
        <InlineMath math="\psi" />, the probability of finding the
        particle in a small volume{" "}
        <InlineMath math="d^3 r" /> around{" "}
        <InlineMath math="\mathbf{r}" /> is
        <BlockMath math="dP = |\psi(\mathbf{r}, t)|^2 \, d^3 r." />
      </Callout>

      <p>
        So <InlineMath math="|\psi|^2" /> is a probability
        density. Total probability of finding the particle{" "}
        <em>somewhere</em> is 1 (the normalisation). Born got the
        Nobel Prize for this (1954).
      </p>

      <Pitfall>
        <strong><InlineMath math="\psi" /> itself is not a
        probability</strong>. It's an <em>amplitude</em>, generally
        complex. Probabilities come from{" "}
        <InlineMath math="|\psi|^2 = \psi^* \psi" />. This
        squaring is essential — it's why{" "}
        <em>amplitudes</em> can interfere (add as complex numbers,
        producing constructive or destructive results) while{" "}
        <em>probabilities</em> alone (real, positive) cannot.
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · The Schrödinger equation</h2>

      <Callout title="Time-dependent Schrödinger equation">
        The wavefunction evolves in time according to
        <BlockMath math="i \hbar \frac{\partial \psi}{\partial t} = \hat H \psi," />
        where <InlineMath math="\hat H" /> is the Hamiltonian
        operator (a self-adjoint operator on Hilbert space).
      </Callout>

      <p>
        For a single particle of mass <InlineMath math="m" /> in a
        potential <InlineMath math="V(\mathbf{r}, t)" />:
      </p>
      <BlockMath math="\hat H = -\frac{\hbar^2}{2m} \nabla^2 + V(\mathbf{r}, t)." />

      <p>
        The first term is kinetic energy (
        <InlineMath math="\hat p^2/(2m)" /> with the momentum
        operator{" "}
        <InlineMath math="\hat{\mathbf p} = -i\hbar \nabla" />).
        The second is potential energy.
      </p>

      <p>
        Substituting:
      </p>
      <BlockMath math="i\hbar \frac{\partial \psi}{\partial t} = -\frac{\hbar^2}{2m} \nabla^2 \psi + V(\mathbf{r}, t) \psi." />

      <p>
        This is the{" "}
        <strong>time-dependent Schrödinger equation</strong>{" "}
        (TDSE). A first-order PDE in time, second-order in space.
        Linear in <InlineMath math="\psi" />.
      </p>

      <h3>Linearity</h3>

      <p>
        The TDSE is linear: if{" "}
        <InlineMath math="\psi_1, \psi_2" /> are solutions, so is{" "}
        <InlineMath math="c_1 \psi_1 + c_2 \psi_2" />. This is the
        principle of <strong>superposition</strong>. Quantum
        states can be added (with complex coefficients), and the
        result is a valid quantum state.
      </p>

      <p>
        Linearity gives quantum mechanics its characteristic
        interference effects. A wavefunction over both slits in
        a double-slit experiment is{" "}
        <InlineMath math="\psi = (\psi_1 + \psi_2)/\sqrt 2" /> —{" "}
        and the probability density{" "}
        <InlineMath math="|\psi|^2 = (|\psi_1|^2 + |\psi_2|^2 + 2 \mathrm{Re}(\psi_1^* \psi_2))/2" />{" "}
        has a cross term that produces fringes.
      </p>

      <h3>Probability current and conservation</h3>

      <p>
        Differentiating <InlineMath math="|\psi|^2" /> in time
        and using TDSE:
      </p>
      <BlockMath math="\frac{\partial |\psi|^2}{\partial t} + \nabla \cdot \mathbf{J} = 0," />

      <p>
        with <strong>probability current</strong>
      </p>
      <BlockMath math="\mathbf{J} = \frac{\hbar}{2 m i} (\psi^* \nabla \psi - \psi \nabla \psi^*) = \frac{\hbar}{m} \mathrm{Im}(\psi^* \nabla \psi)." />

      <p>
        This is the continuity equation for probability — the
        local probability density{" "}
        <InlineMath math="|\psi|^2" /> changes only because
        probability flows out (<InlineMath math="\nabla \cdot \mathbf{J}" />).
        Total probability is conserved by Schrödinger evolution
        (the operator <InlineMath math="\hat H" /> is self-
        adjoint, so{" "}
        <InlineMath math="e^{-i\hat H t/\hbar}" /> is unitary).
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Time-independent Schrödinger equation</h2>

      <p>
        For time-independent potentials{" "}
        <InlineMath math="V(\mathbf{r})" />, separation of
        variables works. Try{" "}
        <InlineMath math="\psi(\mathbf{r}, t) = \phi(\mathbf{r}) T(t)" />.
        Substituting and dividing by <InlineMath math="\phi T" />:
      </p>
      <BlockMath math="i\hbar \frac{1}{T} \frac{dT}{dt} = \frac{1}{\phi} \hat H \phi = E," />

      <p>
        a separation constant. The temporal equation gives
      </p>
      <BlockMath math="T(t) = e^{-i E t / \hbar}." />

      <p>
        The spatial equation is the{" "}
        <strong>time-independent Schrödinger equation</strong>{" "}
        (TISE):
      </p>

      <Callout title="Time-independent Schrödinger equation">
        <BlockMath math="\hat H \phi(\mathbf{r}) = E \phi(\mathbf{r})." />
        An eigenvalue equation: find functions{" "}
        <InlineMath math="\phi" /> satisfying{" "}
        <InlineMath math="\hat H \phi = E \phi" /> with
        eigenvalue <InlineMath math="E" />.
      </Callout>

      <p>
        For the standard kinetic-plus-potential Hamiltonian:
      </p>
      <BlockMath math="-\frac{\hbar^2}{2m} \nabla^2 \phi + V(\mathbf{r}) \phi = E \phi." />

      <p>
        Solving this gives <em>energy eigenstates</em>{" "}
        <InlineMath math="\phi_n" /> with eigenvalues{" "}
        <InlineMath math="E_n" /> — the allowed energies of the
        system.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Stationary states</h2>

      <p>
        A solution to TDSE of the form{" "}
        <InlineMath math="\psi_n(\mathbf{r}, t) = \phi_n(\mathbf{r}) e^{-i E_n t/\hbar}" />{" "}
        is a <strong>stationary state</strong>. Its probability
        density
      </p>
      <BlockMath math="|\psi_n(\mathbf{r}, t)|^2 = |\phi_n(\mathbf{r})|^2" />

      <p>
        is time-independent. The wavefunction itself acquires a
        phase factor <InlineMath math="e^{-i E_n t/\hbar}" />, but
        all observable probabilities (and expectations of{" "}
        time-independent operators) are constant.
      </p>

      <p>
        Stationary states are atomic physics' "energy levels."
        An electron in the ground state of hydrogen{" "}
        <InlineMath math="\phi_{100}" /> with{" "}
        <InlineMath math="E_1 = -13.6" /> eV is{" "}
        <em>not</em> orbiting (Bohr's picture is wrong); it's in
        a stationary cloud whose probability density doesn't
        change. The "stationary" matters.
      </p>

      <h3>Superpositions</h3>

      <p>
        General solutions are superpositions of stationary
        states:
      </p>
      <BlockMath math="\psi(\mathbf{r}, t) = \sum_n c_n \, \phi_n(\mathbf{r}) \, e^{-i E_n t / \hbar}." />

      <p>
        Initial conditions{" "}
        <InlineMath math="\psi(\mathbf{r}, 0)" /> determine the
        coefficients <InlineMath math="c_n" />:
      </p>
      <BlockMath math="c_n = \int \phi_n^*(\mathbf{r}) \psi(\mathbf{r}, 0) \, d^3 r" />

      <p>
        (using the orthonormality of the eigenfunctions,
        guaranteed by self-adjointness of{" "}
        <InlineMath math="\hat H" />). Then evolution is just
        adding phases <InlineMath math="e^{-i E_n t/\hbar}" /> to
        each component.
      </p>

      <p>
        Superpositions of multiple stationary states are{" "}
        <em>not</em> stationary —{" "}
        <InlineMath math="|\psi|^2" /> oscillates in time at
        frequencies determined by energy differences. This is
        the origin of spectral emission lines: an excited state
        decaying to the ground state radiates light at frequency{" "}
        <InlineMath math="\omega = (E_n - E_m)/\hbar" />.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Where does the Schrödinger equation come from?</h2>

      <p>
        Schrödinger (1926) derived his equation by analogy with
        wave optics — looking for the wave equation that has
        Hamilton-Jacobi classical mechanics as its short-
        wavelength limit, just as geometric optics is the
        short-wavelength limit of wave optics.
      </p>

      <p>
        A modern derivation: assume time evolution is unitary
        (probability is conserved), continuous, and Markovian
        (depends only on the current state). By Stone's theorem
        (Module XI), there exists a self-adjoint operator{" "}
        <InlineMath math="\hat H" /> such that
      </p>
      <BlockMath math="\psi(t) = e^{-i \hat H t/\hbar} \psi(0)." />

      <p>
        Differentiating this with respect to{" "}
        <InlineMath math="t" /> gives the TDSE.
      </p>

      <p>
        So the TDSE is essentially equivalent to the
        observation that quantum evolution is{" "}
        <em>unitary</em> + <em>generated by a self-adjoint
        operator</em> + that operator is identified as the
        Hamiltonian (energy operator). The <InlineMath math="\hbar" />{" "}
        is just a unit conversion between energy and frequency,
        from the Planck-Einstein relation{" "}
        <InlineMath math="E = \hbar\omega" />.
      </p>

      <p>
        Schrödinger himself never accepted the probabilistic
        interpretation. He hoped <InlineMath math="\psi" /> was a
        real physical field (somehow charge density). Born's
        probabilistic reading (1926) won — it's the standard
        interpretation today, though disputes about its meaning
        ("measurement problem") continue.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Atomic and molecular physics.</strong> Solving
          Schrödinger for atoms gives the periodic table;
          solving for molecules gives quantum chemistry. The
          actual properties of atoms — radii, ionisation
          energies, bond lengths, vibrational frequencies — all
          come from solutions of TISE.
        </li>
        <li>
          <strong>Solid-state physics.</strong> Crystals are
          periodic potentials. Bloch's theorem (the Schrödinger
          equation in a periodic potential has solutions{" "}
          <InlineMath math="e^{i\mathbf{k} \cdot \mathbf{r}} u_{\mathbf{k}}" />)
          gives band structure, which determines which materials
          are conductors, insulators, or semiconductors. All of
          electronic technology rests on this.
        </li>
        <li>
          <strong>Lasers.</strong> Stimulated emission requires
          population inversion, only possible in quantum
          systems with multiple energy eigenstates. Laser
          physics is Schrödinger + a few key insights about
          coherence.
        </li>
        <li>
          <strong>Path integral formulation.</strong> Feynman's
          alternative formulation: the wavefunction at time{" "}
          <InlineMath math="t" /> is a sum over all paths from
          initial to final point, each weighted by{" "}
          <InlineMath math="e^{i S/\hbar}" /> where{" "}
          <InlineMath math="S" /> is the classical action. Same
          predictions as Schrödinger, but with the Lagrangian
          formalism explicit. Especially useful for QFT.
        </li>
      </ul>

      <p>
        Next chapter: 1D systems. Three canonical solvable
        cases (infinite well, harmonic oscillator, tunneling
        through a barrier) that show off the new physics —
        quantised energies, zero-point motion, classically
        forbidden penetration.
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
      "By Born's rule, the probability density to find a particle at $\\mathbf{r}$ is…",
    options: [
      "$\\psi(\\mathbf{r})$",
      "$|\\psi(\\mathbf{r})|^2$",
      "$\\mathrm{Re}(\\psi(\\mathbf{r}))$",
      "$\\nabla \\psi$",
    ],
    correct: 1,
    explanation:
      "$|\\psi|^2 = \\psi^* \\psi$ is the probability density. The wavefunction $\\psi$ itself is generally complex and not directly observable; the squared modulus is.",
  },
  {
    prompt:
      "The time-dependent Schrödinger equation is…",
    options: [
      "$\\hat H \\psi = E \\psi$",
      "$i\\hbar \\, \\partial \\psi / \\partial t = \\hat H \\psi$",
      "$\\partial \\psi / \\partial t = -\\hat H \\psi / \\hbar$",
      "$\\nabla^2 \\psi = 0$",
    ],
    correct: 1,
    explanation:
      "TDSE: $i\\hbar \\, \\partial \\psi / \\partial t = \\hat H \\psi$. A first-order PDE in time, linear in $\\psi$. The factor $i$ is essential — without it, you'd have a diffusion equation, not wave-like behaviour.",
  },
  {
    prompt:
      "A stationary state $\\psi_n = \\phi_n e^{-i E_n t/\\hbar}$ has…",
    options: [
      "time-dependent probability density",
      "probability density $|\\phi_n|^2$ that's time-independent",
      "always zero kinetic energy",
      "no defined energy",
    ],
    correct: 1,
    explanation:
      "$|\\psi_n|^2 = |\\phi_n|^2$ — the time-dependent phase factor cancels in the squared modulus. The probability density doesn't change. Energy levels are stationary, not orbiting.",
  },
  {
    prompt:
      "The Hamiltonian for a particle of mass $m$ in potential $V$ is…",
    options: [
      "$\\hat H = V$",
      "$\\hat H = -\\frac{\\hbar^2}{2m} \\nabla^2 + V$",
      "$\\hat H = m\\mathbf{a}$",
      "$\\hat H = \\hat p^2$",
    ],
    correct: 1,
    explanation:
      "Kinetic + potential. The kinetic part comes from $\\hat p^2/(2m)$ with $\\hat p = -i\\hbar \\nabla$, giving $-\\hbar^2 \\nabla^2 /(2m)$.",
  },
  {
    prompt:
      "Why does quantum-mechanical evolution conserve probability?",
    options: [
      "the wavefunction is real",
      "the Hamiltonian is self-adjoint, so $e^{-iHt/\\hbar}$ is unitary",
      "by experiment only",
      "it doesn't always conserve probability",
    ],
    correct: 1,
    explanation:
      "Self-adjoint $\\hat H$ generates unitary evolution by Stone's theorem. Unitary operators preserve inner products, hence norms, hence total probability $\\int|\\psi|^2 = 1$.",
  },
];
