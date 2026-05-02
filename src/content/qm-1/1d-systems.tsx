import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function OneDSystemsBody() {
  return (
    <>
      <p>
        Three exactly-solvable 1D systems show off the new physics
        of quantum mechanics: the <strong>infinite square
        well</strong> (the simplest model of confinement), the{" "}
        <strong>harmonic oscillator</strong> (the most-used
        Hamiltonian in physics), and{" "}
        <strong>quantum tunneling</strong> (a particle penetrating
        a classically-forbidden region). Each one teaches a
        general lesson — quantised energy, zero-point motion,
        evanescent wavefunctions in classically-forbidden
        regions, and ladder-operator algebra.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 8.04 — Lectures 11–18",
            author: "Allan Adams (MIT OCW)",
            duration: "~10h",
            url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
            note: "Standard 1D problems and the harmonic oscillator.",
          },
          {
            title: "Griffiths — Introduction to QM, ch. 2",
            author: "David Griffiths",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Introduction_to_Quantum_Mechanics_(book)",
            note: "Worked examples for every system in this chapter.",
          },
          {
            title: "Susskind — Theoretical Minimum: QM",
            author: "Leonard Susskind",
            duration: "~5h on this topic",
            url: "https://theoreticalminimum.com/courses/quantum-mechanics",
            note: "Susskind's harmonic oscillator lecture is unusually clear on ladder operators.",
          },
          {
            title: "Sakurai — Modern QM, ch. 2",
            author: "Sakurai / Napolitano",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Modern_Quantum_Mechanics",
            note: "Algebraic approach to the harmonic oscillator and ladder operators.",
          },
          {
            title: "STM, tunneling diodes — applications",
            author: "various",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Quantum_tunnelling",
            note: "Tunneling powers a lot of practical technology. Worth seeing once.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Infinite square well</h2>

      <p>
        A particle confined to{" "}
        <InlineMath math="0 \leq x \leq L" /> by an infinite
        potential outside that range:
      </p>
      <BlockMath math="V(x) = \begin{cases} 0 & 0 \leq x \leq L \\ \infty & \text{otherwise.} \end{cases}" />

      <p>
        Inside the well, the TISE is
      </p>
      <BlockMath math="-\frac{\hbar^2}{2m} \frac{d^2 \phi}{dx^2} = E \phi." />

      <p>
        Solutions are sines and cosines. With{" "}
        <InlineMath math="\phi(0) = \phi(L) = 0" />:
      </p>
      <BlockMath math="\phi_n(x) = \sqrt{\frac{2}{L}} \sin\!\left(\frac{n\pi x}{L}\right), \qquad n = 1, 2, 3, \dots" />
      <BlockMath math="E_n = \frac{n^2 \pi^2 \hbar^2}{2 m L^2}." />

      <p>
        Energies are <strong>quantised</strong>: only specific
        values are allowed, scaling as{" "}
        <InlineMath math="n^2" />. The ground state{" "}
        <InlineMath math="(n = 1)" /> has nonzero energy{" "}
        <InlineMath math="E_1 = \pi^2 \hbar^2 / (2 m L^2)" /> —{" "}
        <em>zero-point energy</em>. Even at zero temperature, a
        confined quantum particle cannot rest at zero energy —
        the uncertainty principle (next chapter) forbids it.
      </p>

      <h3>The string analogy</h3>

      <p>
        These wavefunctions are exactly the standing waves on a
        string of length{" "}
        <InlineMath math="L" /> fixed at both ends (Module XIII).
        The integer <InlineMath math="n" /> counts the harmonic.
        For any 1D confined system, the eigenfunctions are wavy
        and the energies are discrete — direct analogue of
        normal modes in classical wave physics. Quantum
        confinement = standing waves.
      </p>

      <p>
        For 3D box (
        <InlineMath math="L_x \times L_y \times L_z" />):{" "}
        <InlineMath math="\phi_{n_x, n_y, n_z} = \prod \sqrt{2/L_i} \sin(n_i \pi x_i / L_i)" />,{" "}
        energies sum:{" "}
        <InlineMath math="E = \pi^2 \hbar^2 (n_x^2/L_x^2 + n_y^2/L_y^2 + n_z^2/L_z^2)/(2m)" />.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Finite well, bound vs scattering</h2>

      <p>
        For a finite-depth well (
        <InlineMath math="V_0" /> outside, 0 inside, width{" "}
        <InlineMath math="L" />):
      </p>

      <ul>
        <li>
          <strong>Bound states</strong>: <InlineMath math="E < V_0" />.
          Wavefunction is sinusoidal inside, exponentially
          decaying outside (penetrates a finite distance into
          the wall). Only finitely many bound states (for
          weakly-attractive wells, even one).
        </li>
        <li>
          <strong>Scattering states</strong>:{" "}
          <InlineMath math="E > V_0" />. Wavefunction extends to
          infinity. Continuous spectrum of energies.
        </li>
      </ul>

      <p>
        The decaying wavefunction in the classically-forbidden
        region (<InlineMath math="V > E" />) is a key feature of
        QM: particles can be found where they shouldn't be
        classically. The penetration length is{" "}
        <InlineMath math="\ell = \hbar / \sqrt{2 m (V_0 - E)}" />.
      </p>

      <p>
        Many real systems are well-modelled this way: an electron
        in a quantum dot, a nucleon in a nucleus, an atom in a
        cold-atom trap. The ground state energy of these systems
        falls out of solving boundary-condition equations
        (transcendental for finite wells).
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · The harmonic oscillator</h2>

      <p>
        Potential <InlineMath math="V(x) = \tfrac{1}{2} m \omega^2 x^2" />.
        TISE:
      </p>
      <BlockMath math="-\frac{\hbar^2}{2m} \frac{d^2 \phi}{dx^2} + \tfrac{1}{2} m \omega^2 x^2 \phi = E \phi." />

      <Callout title="Harmonic oscillator energies">
        <BlockMath math="E_n = \hbar \omega \left(n + \frac{1}{2}\right), \quad n = 0, 1, 2, \dots" />
      </Callout>

      <p>
        Equally spaced energy levels separated by{" "}
        <InlineMath math="\hbar\omega" />. The ground state has
        nonzero energy{" "}
        <InlineMath math="E_0 = \hbar\omega/2" /> — the{" "}
        <em>zero-point energy</em> of the oscillator. Even at
        absolute zero, harmonic oscillators have residual motion.
      </p>

      <h3>Wavefunctions</h3>

      <p>
        The eigenfunctions are Hermite polynomials times
        Gaussians:
      </p>
      <BlockMath math="\phi_n(x) = \frac{1}{\sqrt{2^n n!}} \left(\frac{m\omega}{\pi \hbar}\right)^{1/4} H_n(\xi) \, e^{-\xi^2/2}, \quad \xi = \sqrt{m\omega/\hbar} \, x." />

      <p>
        Ground state:{" "}
        <InlineMath math="\phi_0(x) \propto e^{-m\omega x^2/(2\hbar)}" /> —
        a Gaussian wavefunction. The Gaussian saturates the
        Heisenberg uncertainty inequality{" "}
        <InlineMath math="\Delta x \Delta p = \hbar/2" />.
      </p>

      <h3>Ladder operators</h3>

      <p>
        Define
      </p>
      <BlockMath math="\hat a = \sqrt{\frac{m\omega}{2\hbar}}\!\left(\hat x + \frac{i}{m\omega} \hat p\right), \qquad \hat a^\dagger = \sqrt{\frac{m\omega}{2\hbar}}\!\left(\hat x - \frac{i}{m\omega} \hat p\right)." />

      <p>
        Then:
      </p>
      <ul>
        <li>
          <InlineMath math="[\hat a, \hat a^\dagger] = 1" />.
        </li>
        <li>
          <InlineMath math="\hat H = \hbar\omega(\hat a^\dagger \hat a + \tfrac{1}{2})" />.
        </li>
        <li>
          <InlineMath math="\hat a |n\rangle = \sqrt n \, |n - 1\rangle" />{" "}
          (lowering operator — annihilates a quantum).
        </li>
        <li>
          <InlineMath math="\hat a^\dagger |n\rangle = \sqrt{n+1} \, |n + 1\rangle" />{" "}
          (raising operator — creates a quantum).
        </li>
        <li>
          <InlineMath math="\hat a^\dagger \hat a |n\rangle = n |n\rangle" />{" "}
          (number operator).
        </li>
      </ul>

      <p>
        The ground state is annihilated by{" "}
        <InlineMath math="\hat a" />:{" "}
        <InlineMath math="\hat a |0\rangle = 0" />. From here,{" "}
        <InlineMath math="|n\rangle \propto (\hat a^\dagger)^n |0\rangle" />.
        All eigenstates and energies derived purely
        algebraically.
      </p>

      <p>
        This algebraic structure is crucial. It generalises to{" "}
        <em>quantum field theory</em>: each mode of the
        electromagnetic field is a quantum harmonic oscillator,
        and{" "}
        <InlineMath math="\hat a^\dagger" /> creates a photon in
        that mode. The same ladder structure governs phonons,
        molecular vibrations, the entire fabric of QFT.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Quantum tunneling</h2>

      <p>
        Consider a particle of energy <InlineMath math="E" />{" "}
        approaching a rectangular barrier of height{" "}
        <InlineMath math="V_0 > E" /> and width{" "}
        <InlineMath math="a" />.
      </p>

      <p>
        Classically: the particle reflects perfectly — it can't
        get past a barrier higher than its energy. Quantum
        mechanically: there's a nonzero probability of finding
        the particle on the other side. This is{" "}
        <strong>tunneling</strong>.
      </p>

      <p>
        Inside the barrier (<InlineMath math="0 \leq x \leq a" />):
        the wavefunction is a real exponential{" "}
        <InlineMath math="\phi \propto e^{-\kappa x}" /> with
      </p>
      <BlockMath math="\kappa = \sqrt{\frac{2 m (V_0 - E)}{\hbar^2}}." />

      <p>
        Outside, on the right: a transmitted wave. Matching at
        the boundaries, the transmission probability:
      </p>
      <BlockMath math="T \approx e^{-2 \kappa a}" />

      <p>
        for thick barriers (
        <InlineMath math="\kappa a \gg 1" />). Exponentially
        small but nonzero.
      </p>

      <p>
        Practical examples:
      </p>
      <ul>
        <li>
          <strong>Alpha decay</strong>: alpha particles tunnel
          out of nuclei, escaping the strong-force binding.
          Half-lives span 30 orders of magnitude (
          <InlineMath math="10^{-7}" /> s to{" "}
          <InlineMath math="10^{17}" /> y) — Gamow's first
          calculation (1928) explained this exponential
          sensitivity.
        </li>
        <li>
          <strong>Nuclear fusion in stars</strong>: protons
          tunnel through their mutual Coulomb repulsion to fuse.
          Without tunneling, the Sun couldn't shine.
        </li>
        <li>
          <strong>Scanning tunneling microscope</strong> (STM):
          a sharp metal tip held nm above a surface; tunneling
          current is exponentially sensitive to gap distance.
          Atomic-resolution imaging.
        </li>
        <li>
          <strong>Tunnel diodes, flash memory, Josephson
          junctions</strong>: practical devices using tunneling
          for switching, storage, and ultra-precise voltage
          standards.
        </li>
      </ul>

      <Pitfall>
        Tunneling probability is{" "}
        <em>exponentially</em> sensitive to barrier width and
        height. A small change in geometry produces a large
        change in tunneling rate. This is why STM has atomic
        resolution and why nuclear fusion rates depend so
        strongly on temperature.
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Why this matters</h2>

      <ul>
        <li>
          <strong>Quantum dots and nanostructures.</strong>{" "}
          Tiny semiconductor "boxes" confine electrons in 3D,
          giving discrete energy levels — a real-world infinite
          square well. Sizes engineered to give specific
          fluorescence colours; used in displays and biological
          imaging.
        </li>
        <li>
          <strong>Lasers.</strong> Population inversion between
          discrete energy levels gives stimulated emission.
          Without quantised levels, no lasing.
        </li>
        <li>
          <strong>Field theory.</strong> The harmonic oscillator
          is the quantum building block of QFT. Each field mode
          is a quantum oscillator; particle creation and
          annihilation are <InlineMath math="a^\dagger" /> and{" "}
          <InlineMath math="a" /> on the corresponding mode.
        </li>
        <li>
          <strong>Astrophysics &amp; nuclear physics.</strong>{" "}
          Tunneling explains stellar fusion and radioactive
          decay. The exponential dependence on barrier height
          gives huge variability in rates.
        </li>
        <li>
          <strong>Modern electronics.</strong> Flash memory uses
          tunneling for both writing (by tunneling injection)
          and reading. Tunnel diodes for high-frequency
          electronics.
        </li>
      </ul>

      <p>
        Final chapter of QM I: operators and observables —
        the formal machinery for predicting measurement
        outcomes, including the Heisenberg uncertainty principle
        as a precise consequence of the formalism.
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
      "For the infinite square well of width $L$, the energies are…",
    options: [
      "$E_n = n \\hbar \\omega$",
      "$E_n = \\pi^2 \\hbar^2 n^2 / (2 m L^2)$",
      "$E_n = -13.6 \\, \\mathrm{eV} / n^2$",
      "constant",
    ],
    correct: 1,
    explanation:
      "Quadratic in $n$. Wavefunctions are sines fitting integer half-wavelengths into the well — quantum standing waves.",
  },
  {
    prompt:
      "The ground state of the harmonic oscillator has energy…",
    options: ["0", "$\\hbar\\omega$", "$\\hbar\\omega / 2$", "$\\hbar\\omega \\cdot \\infty$"],
    correct: 2,
    explanation:
      "$E_0 = \\hbar\\omega/2$ — the zero-point energy. Even at $T = 0$, the oscillator has residual motion (forced by the uncertainty principle).",
  },
  {
    prompt:
      "Quantum tunneling allows…",
    options: [
      "a classical particle to lose energy gradually",
      "a particle to penetrate a barrier higher than its energy with exponentially small but nonzero probability",
      "energy conservation to fail",
      "particles to travel faster than $c$",
    ],
    correct: 1,
    explanation:
      "$T \\sim e^{-2\\kappa a}$ for a thick barrier of width $a$. Energy and momentum are conserved; the wavefunction has an exponentially decaying portion inside the barrier.",
  },
  {
    prompt:
      "The ladder operators of the harmonic oscillator satisfy $[\\hat a, \\hat a^\\dagger] = $",
    options: ["0", "1", "$i\\hbar$", "$-1$"],
    correct: 1,
    explanation:
      "$[\\hat a, \\hat a^\\dagger] = 1$. From this and $\\hat H = \\hbar\\omega(\\hat a^\\dagger \\hat a + 1/2)$, the entire spectrum and all eigenvectors fall out algebraically.",
  },
  {
    prompt:
      "Quantum tunneling explains…",
    options: [
      "stellar fusion via proton-proton tunneling through Coulomb repulsion",
      "the existence of dark matter",
      "general relativity",
      "magnetism",
    ],
    correct: 0,
    explanation:
      "Without tunneling, fusion in stars couldn't occur — protons can't classically overcome Coulomb repulsion at solar core temperatures. Tunneling is essential to the Sun's energy production.",
  },
];
