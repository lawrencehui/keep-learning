import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function PerturbationBody() {
  return (
    <>
      <p>
        Most quantum systems can't be solved exactly. The
        infinite well, harmonic oscillator, hydrogen atom — these
        are the rare beautiful exceptions. For everything else,
        we approximate. Perturbation theory is the standard
        approximation: split the Hamiltonian into a solvable
        part plus a "small" perturbation, and compute corrections
        order by order. It works for most realistic problems —
        atomic fine structure, molecular electronic states,
        scattering rates, the running of QED couplings.
      </p>
      <p>
        We meet two flavours: time-independent (for energy-
        eigenstate corrections) and time-dependent (for
        transition rates between states). Both end with workhorse
        formulas you'll use in QM applications — including
        Fermi's golden rule, which gives transition rates in
        atomic and condensed-matter physics.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 8.05 — Perturbation theory lectures",
            author: "Barton Zwiebach",
            duration: "~5h",
            url: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/",
            note: "Standard treatment with worked examples.",
          },
          {
            title: "Sakurai — Modern QM, ch. 5",
            author: "Sakurai / Napolitano",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Modern_Quantum_Mechanics",
            note: "Sakurai develops time-independent and time-dependent perturbation theory rigorously.",
          },
          {
            title: "Griffiths — Introduction to QM, ch. 6–9",
            author: "David Griffiths",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Introduction_to_Quantum_Mechanics_(book)",
            note: "Worked examples for hydrogen fine structure, Zeeman, Stark effects.",
          },
          {
            title: "Cohen-Tannoudji — Quantum Mechanics, vol II",
            author: "Cohen-Tannoudji / Diu / Laloë",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Claude_Cohen-Tannoudji",
            note: "Encyclopaedic French treatment with extensive worked examples on perturbation theory.",
          },
          {
            title: "Fermi's golden rule explained",
            author: "various",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=fermi+golden+rule+derivation",
            note: "If the formal derivation is opaque, several short videos motivate the result.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Time-independent perturbation theory</h2>

      <p>
        Suppose we have a Hamiltonian
      </p>
      <BlockMath math="\hat H = \hat H_0 + \lambda \hat V" />

      <p>
        where <InlineMath math="\hat H_0" /> is exactly solvable
        with eigenstates{" "}
        <InlineMath math="|n^{(0)}\rangle" /> and energies{" "}
        <InlineMath math="E_n^{(0)}" />, and{" "}
        <InlineMath math="\lambda \hat V" /> is a small
        perturbation (<InlineMath math="\lambda" /> is a small
        parameter we use to track orders).
      </p>

      <p>
        Expand the perturbed eigenstates and energies as power
        series in <InlineMath math="\lambda" />:
      </p>
      <BlockMath math="|n\rangle = |n^{(0)}\rangle + \lambda |n^{(1)}\rangle + \lambda^2 |n^{(2)}\rangle + \cdots" />
      <BlockMath math="E_n = E_n^{(0)} + \lambda E_n^{(1)} + \lambda^2 E_n^{(2)} + \cdots" />

      <p>
        Substitute into{" "}
        <InlineMath math="\hat H |n\rangle = E_n |n\rangle" /> and
        match powers of <InlineMath math="\lambda" />.
      </p>

      <Callout title="First-order energy correction (non-degenerate)">
        <BlockMath math="E_n^{(1)} = \langle n^{(0)} | \hat V | n^{(0)} \rangle." />
      </Callout>

      <p>
        Read: the first-order energy correction is the
        expectation value of the perturbation in the unperturbed
        state. Often very fast to compute.
      </p>

      <Callout title="First-order eigenstate correction">
        <BlockMath math="|n^{(1)}\rangle = \sum_{m \neq n} \frac{\langle m^{(0)} | \hat V | n^{(0)} \rangle}{E_n^{(0)} - E_m^{(0)}} |m^{(0)}\rangle." />
      </Callout>

      <p>
        Each off-diagonal matrix element of{" "}
        <InlineMath math="\hat V" /> mixes other states into the
        perturbed eigenstate, weighted by inverse energy
        differences. States closer in energy mix more.
      </p>

      <Callout title="Second-order energy correction">
        <BlockMath math="E_n^{(2)} = \sum_{m \neq n} \frac{|\langle m^{(0)} | \hat V | n^{(0)} \rangle|^2}{E_n^{(0)} - E_m^{(0)}}." />
      </Callout>

      <p>
        Always shifts the ground state down (denominators
        negative for excited states; numerators non-negative).
        Second-order energy corrections are{" "}
        <em>variationally bounded</em>: the true ground state
        energy is always at most the unperturbed plus first-order
        correction.
      </p>

      <h3>Example: harmonic oscillator with cubic perturbation</h3>

      <p>
        <InlineMath math="\hat H = \tfrac{1}{2} m\omega^2 \hat x^2 + \hat p^2/(2m) + \lambda \hat x^3" />.
        First-order energy correction:{" "}
        <InlineMath math="\langle n | \hat x^3 | n \rangle = 0" />{" "}
        (parity). Second-order is non-trivial; computing it gives
        anharmonic-oscillator level shifts that match
        spectroscopic data for diatomic molecules.
      </p>

      <Pitfall>
        The expansion in <InlineMath math="\lambda" /> is{" "}
        <em>asymptotic</em>, not convergent. Even for small{" "}
        <InlineMath math="\lambda" />, the series eventually
        diverges; you keep terms up to the order where they're
        getting smaller. Most QED calculations are in this
        regime — the celebrated 12-decimal-place agreement of
        the electron g-factor uses asymptotic perturbation
        theory.
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Degenerate perturbation theory</h2>

      <p>
        The formulas above fail when{" "}
        <InlineMath math="E_n^{(0)} = E_m^{(0)}" /> for some{" "}
        <InlineMath math="m \neq n" /> (degeneracy). The
        denominators blow up.
      </p>

      <p>
        The fix: work in the degenerate subspace first.
        Diagonalise{" "}
        <InlineMath math="\hat V" /> within the degenerate
        subspace; the eigenvalues give the first-order energy
        splittings. The perturbation usually breaks the
        degeneracy.
      </p>

      <p>
        Famous applications:
      </p>
      <ul>
        <li>
          <strong>Stark effect</strong>: hydrogen{" "}
          <InlineMath math="n = 2" /> levels split by an
          electric field. The 4-fold degenerate level splits
          into 3 levels (one doubly-degenerate, two singly-
          degenerate).
        </li>
        <li>
          <strong>Zeeman effect</strong>: degenerate{" "}
          <InlineMath math="m_\ell" /> levels split by a magnetic
          field, giving fine spacing of spectral lines.
        </li>
        <li>
          <strong>Spin-orbit coupling</strong>: relativistic
          effect that lifts degeneracy in{" "}
          <InlineMath math="\ell" />, splitting fine structure of
          atomic spectra.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Time-dependent perturbation theory</h2>

      <p>
        For a Hamiltonian{" "}
        <InlineMath math="\hat H(t) = \hat H_0 + \hat V(t)" />{" "}
        where the perturbation depends on time (e.g. an external
        oscillating field), we want{" "}
        <em>transition probabilities</em> between unperturbed
        states.
      </p>

      <p>
        Expand the state as
      </p>
      <BlockMath math="|\psi(t)\rangle = \sum_n c_n(t) e^{-i E_n^{(0)} t/\hbar} |n^{(0)}\rangle" />

      <p>
        and substitute into TDSE. To first order in the
        perturbation, starting from the initial state{" "}
        <InlineMath math="|i\rangle" />:
      </p>
      <BlockMath math="c_f^{(1)}(t) = \frac{1}{i\hbar} \int_0^t \langle f | \hat V(t') | i \rangle e^{i \omega_{fi} t'} \, dt'" />

      <p>
        with{" "}
        <InlineMath math="\omega_{fi} = (E_f^{(0)} - E_i^{(0)})/\hbar" />.
        Probability of transition to state{" "}
        <InlineMath math="|f\rangle" />:{" "}
        <InlineMath math="P_{i \to f}(t) = |c_f^{(1)}(t)|^2" />.
      </p>

      <h3>Sinusoidal perturbations</h3>

      <p>
        A common case:{" "}
        <InlineMath math="\hat V(t) = \hat V_0 \cos(\omega t)" />.
        The transition amplitude has resonant denominators:{" "}
        peaked when{" "}
        <InlineMath math="\omega = \omega_{fi}" /> (energy
        absorption from the field) or{" "}
        <InlineMath math="\omega = -\omega_{fi}" /> (stimulated
        emission).
      </p>

      <p>
        For a continuous range of final states (a "continuum"),
        this gives Fermi's golden rule.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Fermi's golden rule</h2>

      <Callout title="Fermi's golden rule">
        For a sinusoidal perturbation{" "}
        <InlineMath math="\hat V_0 \cos(\omega t)" /> connecting
        initial state <InlineMath math="|i\rangle" /> to a{" "}
        continuum of final states, the transition rate per unit
        time is
        <BlockMath math="\Gamma_{i \to f} = \frac{2\pi}{\hbar} |\langle f | \hat V_0 | i \rangle|^2 \rho(E_f)" />
        with <InlineMath math="\rho(E_f)" /> the density of
        final states at the energy where{" "}
        <InlineMath math="E_f = E_i \pm \hbar \omega" />.
      </Callout>

      <p>
        Read: transition rate ∝ matrix-element squared × density
        of final states. The matrix element selects which
        transitions are allowed (selection rules); the density
        of states determines how many final states are
        available.
      </p>

      <p>
        Applications everywhere:
      </p>
      <ul>
        <li>
          <strong>Atomic absorption / emission rates</strong> in
          spectroscopy.
        </li>
        <li>
          <strong>Photon emission rates</strong> for excited
          atoms (spontaneous emission needs a quantised EM
          field — see QED).
        </li>
        <li>
          <strong>Beta decay rates</strong> in nuclear physics.
        </li>
        <li>
          <strong>Electron transport rates</strong> in
          semiconductors and condensed matter.
        </li>
        <li>
          <strong>Scattering cross sections</strong> (with
          appropriate state-counting).
        </li>
      </ul>

      <h3>Selection rules</h3>

      <p>
        The matrix element{" "}
        <InlineMath math="\langle f | \hat V_0 | i \rangle" />{" "}
        often vanishes for symmetry reasons. For dipole-allowed
        atomic transitions:
      </p>
      <ul>
        <li>
          <InlineMath math="\Delta \ell = \pm 1" /> (angular
          momentum quantum number changes by 1).
        </li>
        <li>
          <InlineMath math="\Delta m_\ell = 0, \pm 1" />.
        </li>
        <li>
          <InlineMath math="\Delta s = 0" /> (spin doesn't
          change in dipole transitions; spin-orbit coupling is
          higher-order).
        </li>
      </ul>

      <p>
        These rules — combined with energy-conservation requirement{" "}
        <InlineMath math="E_f - E_i = \hbar\omega" /> — explain
        the structure of atomic spectra. Forbidden transitions
        do exist (with much lower rates) — they're the basis of
        astrophysical "forbidden lines" used to study
        astronomical nebulae.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Higher-order processes</h2>

      <p>
        First-order Fermi gives single-photon processes (a state
        absorbs or emits one photon). At higher order:
      </p>

      <ul>
        <li>
          <strong>Two-photon processes</strong>: simultaneous
          absorption of two photons. Rare but important — used
          in two-photon microscopy for biological imaging
          (deeper penetration, lower scatter).
        </li>
        <li>
          <strong>Raman scattering</strong>: inelastic photon
          scattering off a molecule, exchanging energy with
          molecular vibrations. Used in chemical analysis.
        </li>
        <li>
          <strong>Higher-order diagrams in QED</strong>: each
          additional vertex is suppressed by{" "}
          <InlineMath math="\alpha \approx 1/137" />. The
          electron g-factor agreement with experiment uses
          terms up to fifth order in the fine-structure
          constant.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Atomic and molecular spectroscopy.</strong>{" "}
          Transition rates, selection rules, line widths — all
          come from Fermi's golden rule plus selection rules
          plus density of states.
        </li>
        <li>
          <strong>Quantum electrodynamics.</strong> The most
          accurately tested theory in physics. The electron's
          g-factor agrees with theory to 12 decimal places. All
          via perturbation theory in the fine-structure constant{" "}
          <InlineMath math="\alpha \approx 1/137" />.
        </li>
        <li>
          <strong>Solid-state physics.</strong> Optical and
          electronic transitions in semiconductors,
          superconductors, magnetic materials — all use
          perturbation theory + Fermi's golden rule. Optical
          properties of materials, conductivity, photoemission
          — all standard applications.
        </li>
        <li>
          <strong>Lasers.</strong> Spontaneous and stimulated
          emission rates are Fermi's golden rule results. The
          ratio (Einstein A and B coefficients) drives the
          theory of lasing.
        </li>
        <li>
          <strong>Quantum chemistry.</strong> Hartree-Fock plus
          perturbation theory (MP2, MP4) is one of the standard
          ways of computing molecular properties. Coupled-
          cluster methods are perturbation-theory variants.
        </li>
      </ul>

      <p>
        That closes Module XV. The next module —{" "}
        <strong>Module XVI: Quantum Information &amp; Computing</strong>{" "}
        — applies everything we've built. Qubits are spin-1/2
        systems; gates are unitary operators; measurements use
        the Born rule; entanglement is the resource;
        Shor's algorithm uses the Quantum Fourier Transform.
        We close the loop on factoring, ECDSA, and what quantum
        computers do to crypto.
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
      "First-order energy correction in non-degenerate perturbation theory is…",
    options: [
      "$\\langle n | \\hat V | n \\rangle$ (expectation value of perturbation in unperturbed state)",
      "$\\sum_m |\\langle m | V | n \\rangle|^2$",
      "0 always",
      "the trace of $\\hat V$",
    ],
    correct: 0,
    explanation:
      "$E_n^{(1)} = \\langle n^{(0)} | \\hat V | n^{(0)} \\rangle$. Just expectation value. Often easy to compute and gets you most of the way.",
  },
  {
    prompt:
      "Second-order energy correction has denominators $E_n^{(0)} - E_m^{(0)}$. What goes wrong if these vanish?",
    options: [
      "nothing",
      "the formulas diverge — you need degenerate perturbation theory (diagonalise $\\hat V$ in the degenerate subspace first)",
      "$\\hat H$ is no longer Hermitian",
      "energy is no longer conserved",
    ],
    correct: 1,
    explanation:
      "Degenerate states need a different approach: diagonalise $\\hat V$ within the degenerate subspace. The Stark and Zeeman effects in hydrogen are classic examples.",
  },
  {
    prompt:
      "Fermi's golden rule for transition rates is…",
    options: [
      "$\\Gamma = (2\\pi/\\hbar) |\\langle f | V | i \\rangle|^2 \\rho(E_f)$",
      "$\\Gamma = E_f - E_i$",
      "$\\Gamma = \\hbar \\omega$",
      "$\\Gamma = 1/\\hbar$",
    ],
    correct: 0,
    explanation:
      "Rate ∝ matrix element squared × density of final states. From first-order time-dependent perturbation theory + a continuum of final states + sinusoidal perturbation.",
  },
  {
    prompt:
      "For dipole-allowed atomic transitions, the angular-momentum selection rule is…",
    options: [
      "$\\Delta \\ell = 0$",
      "$\\Delta \\ell = \\pm 1$",
      "$\\Delta \\ell = \\pm 2$",
      "no restriction",
    ],
    correct: 1,
    explanation:
      "$\\Delta \\ell = \\pm 1$ for electric-dipole (E1) transitions. Photons carry angular momentum 1; conservation forces $\\Delta \\ell = \\pm 1$ for one-photon E1 absorption/emission.",
  },
  {
    prompt:
      "Perturbation expansions in QM are typically…",
    options: [
      "convergent for any $\\lambda$",
      "asymptotic — eventually diverge but useful for small $\\lambda$",
      "exact",
      "valid only at integer orders",
    ],
    correct: 1,
    explanation:
      "Asymptotic series. Truncate at the order where successive terms stop getting smaller. The 12-decimal-place QED predictions for the electron g-factor are computed this way.",
  },
];
