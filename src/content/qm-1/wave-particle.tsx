import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function WaveParticleBody() {
  return (
    <>
      <p>
        At the end of the 19th century, classical physics seemed
        nearly complete. Newton's mechanics ran the macroscopic
        world; Maxwell's equations had unified electricity,
        magnetism, and optics; statistical mechanics explained
        thermodynamics. A few "minor puzzles" remained — black-body
        radiation, the photoelectric effect, atomic spectra. By
        1925 those puzzles had destroyed classical physics and
        replaced it with quantum mechanics. This chapter walks
        through the experiments that forced the change, ending
        with the conceptual core: matter and light are both wavy
        and particle-like, depending on what you ask.
      </p>
      <p>
        This is one of the most narratively beautiful stories in
        physics. Each puzzle's resolution introduced a new piece
        of QM. By the end you'll see why a wavefunction is needed
        — without that motivation, the math of the next chapter is
        unmotivated.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 8.04 — Quantum Physics I",
            author: "MIT OCW",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
            note: "MIT undergraduate quantum mechanics. Lectures by Allan Adams are excellent.",
          },
          {
            title: "Griffiths — Introduction to Quantum Mechanics (3rd ed)",
            author: "David Griffiths",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Introduction_to_Quantum_Mechanics_(book)",
            note: "The standard undergraduate textbook. Friendly, rigorous, problem-rich.",
          },
          {
            title: "Susskind — The Theoretical Minimum: Quantum Mechanics",
            author: "Leonard Susskind",
            duration: "~10h",
            url: "https://theoreticalminimum.com/courses/quantum-mechanics",
            note: "Susskind's lectures + book are great for adult learners. Deeper than typical first-pass texts.",
          },
          {
            title: "Feynman Lectures, Vol. III",
            author: "Richard Feynman",
            duration: "Reading (free online)",
            url: "https://www.feynmanlectures.caltech.edu/III_toc.html",
            note: "All of Volume III is quantum mechanics, in Feynman's distinctive style. Worth reading just for the prose.",
          },
          {
            title: "Quantum mechanics — historical roots",
            author: "various YouTube",
            duration: "varies",
            url: "https://www.youtube.com/results?search_query=quantum+mechanics+history+1900-1925",
            note: "Many history-of-science videos cover Planck, Einstein, Bohr, de Broglie, Heisenberg, Schrödinger. Worth watching one good biography.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The classical worldview, briefly</h2>

      <p>
        By 1900, classical physics held:
      </p>
      <ul>
        <li>
          Particles have definite positions and velocities. Their
          dynamics follow Newton (or Lagrange / Hamilton).
        </li>
        <li>
          Electromagnetic radiation is a wave field, governed by
          Maxwell. It's continuous; you can extract any amount of
          energy from a wave.
        </li>
        <li>
          A complete description of a system at one instant
          determines its future deterministically (Laplace's
          demon).
        </li>
        <li>
          Physical quantities take continuous values. Energy can
          be any real number.
        </li>
      </ul>

      <p>
        Three experiments — black-body radiation, photoelectric
        effect, Compton scattering — said all four claims were
        wrong about microscopic phenomena.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Black-body radiation (Planck, 1900)</h2>

      <p>
        A black body is an idealised object that absorbs all
        incident radiation and re-emits radiation in thermal
        equilibrium. Real examples: a small hole in a hot oven, a
        star, the cosmic microwave background.
      </p>

      <p>
        The classical prediction (Rayleigh–Jeans) for spectral
        intensity per wavelength:
      </p>
      <BlockMath math="u_\lambda(T) = \frac{8\pi k_B T}{\lambda^4}." />

      <p>
        Catastrophically wrong at short wavelengths — predicts
        infinite total energy ("ultraviolet catastrophe"). The
        physics: classical equipartition assigns{" "}
        <InlineMath math="\tfrac{1}{2} k_B T" /> to each degree of
        freedom, and EM cavities have infinitely many modes at
        short wavelengths.
      </p>

      <p>
        Planck's solution (1900): assume EM modes can only
        exchange energy in discrete chunks{" "}
        <InlineMath math="E = h\nu" /> with{" "}
        <InlineMath math="h" /> a new fundamental constant.
        Different modes get different probabilistic occupations
        (Boltzmann), and high-frequency modes are exponentially
        suppressed. The result:
      </p>
      <BlockMath math="u_\lambda(T) = \frac{8\pi h c}{\lambda^5} \frac{1}{e^{hc/(\lambda k_B T)} - 1}." />

      <p>
        Matches data perfectly.
      </p>

      <p>
        Planck's constant{" "}
        <InlineMath math="h \approx 6.626 \times 10^{-34} \, \mathrm{J \cdot s}" />.
        Often paired with the reduced version{" "}
        <InlineMath math="\hbar = h/(2\pi)" />.
      </p>

      <Pitfall>
        Planck himself thought of the quantisation as a
        mathematical trick, not a physical fact about nature.
        Einstein (1905) made it real: electromagnetic radiation
        actually consists of quanta. Planck never quite accepted
        Einstein's interpretation.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · The photoelectric effect (Einstein, 1905)</h2>

      <p>
        Shine light on a metal surface. If the frequency is above
        a threshold (depends on the metal), electrons are
        emitted. Their kinetic energy depends on{" "}
        <em>frequency</em>, not on intensity.
      </p>

      <p>
        Classical wave theory predicted: more intense light
        should eject more energetic electrons (more energy in,
        more energy out). Wrong. Observed:
      </p>
      <ul>
        <li>
          Below the threshold frequency, no emission at all
          (regardless of intensity).
        </li>
        <li>
          Above threshold, more intensity = more electrons (per
          unit time), but their kinetic energy depends only on
          frequency.
        </li>
        <li>
          Emission is essentially instantaneous (no buildup of
          energy).
        </li>
      </ul>

      <p>
        Einstein's explanation: light comes in quanta of energy{" "}
        <InlineMath math="E = h\nu" /> (now called photons). An
        electron either absorbs an entire photon or none — no
        partial absorption. If the photon energy exceeds the
        binding energy <InlineMath math="W" /> (work function),
        the electron is ejected with{" "}
        <InlineMath math="K_{\max} = h\nu - W" />.
      </p>

      <p>
        This explains all observations. Einstein got the Nobel
        Prize for it (1921), not for relativity.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Compton scattering (1923)</h2>

      <p>
        X-rays scattered by free electrons shift to longer
        wavelengths. Classical wave theory: no shift (the
        scattered wave should have the same frequency as the
        incident).
      </p>

      <p>
        Compton modelled the scattering as a billiard-ball
        collision between a photon (momentum{" "}
        <InlineMath math="p = h/\lambda" />, energy{" "}
        <InlineMath math="E = h\nu = pc" />) and an electron at
        rest. Conservation of energy and momentum gives the{" "}
        <strong>Compton wavelength shift</strong>:
      </p>
      <BlockMath math="\Delta \lambda = \frac{h}{m_e c}(1 - \cos\theta)," />

      <p>
        where <InlineMath math="\theta" /> is the scattering
        angle. The Compton wavelength{" "}
        <InlineMath math="\lambda_C = h/(m_e c) \approx 2.43 \times 10^{-12}" /> m
        appears as the natural length scale.
      </p>

      <p>
        Photons carry momentum{" "}
        <InlineMath math="\mathbf{p} = \hbar \mathbf{k}" /> with{" "}
        <InlineMath math="|\mathbf{k}| = 2\pi/\lambda" /> — they're
        relativistic particles with mass zero. The wave aspect
        (wavelength, frequency) and particle aspect (momentum,
        energy) are tied together by the same Planck constant.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · De Broglie matter waves (1924)</h2>

      <p>
        Louis de Broglie made a remarkable suggestion: if light
        (which we thought was a wave) has particle properties,
        maybe matter (which we think is particles) has wave
        properties. He proposed for any particle:
      </p>
      <BlockMath math="\lambda = \frac{h}{p}" />

      <p>
        — the de Broglie wavelength. Particles have an associated
        wavelength inversely proportional to momentum.
      </p>

      <p>
        For a baseball: <InlineMath math="m \sim 0.15" /> kg,{" "}
        <InlineMath math="v \sim 30" /> m/s,{" "}
        <InlineMath math="\lambda \sim 10^{-34}" /> m.
        Astronomically smaller than any atom. No wave behaviour
        observable.
      </p>

      <p>
        For an electron: <InlineMath math="m \sim 10^{-30}" /> kg.
        Even at thermal energies, the de Broglie wavelength is
        comparable to atomic spacings — visible.
      </p>

      <Callout title="Davisson–Germer experiment (1927)">
        Davisson and Germer fired electrons at a nickel crystal
        and observed a diffraction pattern just like X-ray
        diffraction off the same crystal — with wavelength{" "}
        <InlineMath math="\lambda = h/p" /> matching de Broglie's
        formula exactly. Direct experimental confirmation of
        matter waves.
      </Callout>

      <p>
        Subsequent experiments confirmed wave behaviour for
        neutrons, atoms, molecules — even macromolecules. Modern
        single-molecule interferometry has shown wave behaviour
        for molecules with thousands of atoms, in carefully
        controlled conditions. The boundary between "quantum" and
        "classical" isn't a sharp line in size — it's about how
        well isolated the system is from its environment.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · The double slit, revisited</h2>

      <p>
        Young's double-slit (Module XIII) gave interference for
        light, proving its wave nature. Repeat with electrons
        (Jönsson 1961, Tonomura 1989):
      </p>

      <ul>
        <li>
          Many electrons through both slits: interference pattern,
          just like light.
        </li>
        <li>
          One electron at a time: each electron lands at a
          well-defined spot (particle-like). But the cumulative
          distribution of many single-electron events is the
          interference pattern.
        </li>
      </ul>

      <p>
        How can a single electron interfere with itself? Only if
        it's described by a wave-like amplitude (covering both
        slits) at the wave stage and producing a probabilistic
        outcome at the particle stage (detection).
      </p>

      <Callout title="The central insight">
        Quantum systems are described by wave-like amplitudes
        that propagate (and interfere); experimental outcomes
        appear at random with probabilities given by the squared
        modulus of the amplitude. The "wave" governs propagation;
        the "particle" governs detection. They are{" "}
        <em>complementary</em> — different aspects of the same
        underlying object.
      </Callout>

      <h3>Which-path destroys interference</h3>

      <p>
        If you measure which slit each electron goes through (say
        with an extra detector), the interference pattern{" "}
        <em>disappears</em>. Detection collapses the wave
        behaviour and you just get two stripes (particles
        through two slits).
      </p>

      <p>
        This is the most direct experimental encounter with
        measurement / collapse in quantum mechanics. Looking
        changes the result. It's not just a metaphor — it's an
        empirical fact. We discuss measurement formally in QM II
        / Bell inequalities.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · The Bohr model (briefly)</h2>

      <p>
        Niels Bohr (1913) gave a semi-classical model of hydrogen
        that explained atomic spectra. He postulated:
      </p>
      <ul>
        <li>
          Electrons in an atom only occupy discrete orbits with
          quantised angular momentum{" "}
          <InlineMath math="L = n\hbar" /> for integer{" "}
          <InlineMath math="n" />.
        </li>
        <li>
          They radiate only when transitioning between orbits,
          emitting (or absorbing) a photon of energy{" "}
          <InlineMath math="\hbar\omega = E_n - E_m" />.
        </li>
      </ul>

      <p>
        The energy levels of hydrogen come out:
      </p>
      <BlockMath math="E_n = -\frac{13.6 \, \mathrm{eV}}{n^2}." />

      <p>
        The spectral lines are predicted exactly by transitions
        between these levels. Balmer series (
        <InlineMath math="n_f = 2" />) is in the visible; Lyman (
        <InlineMath math="n_f = 1" />) is UV; Paschen (
        <InlineMath math="n_f = 3" />) is IR. All fit the data
        precisely.
      </p>

      <p>
        Bohr's model is a transitional theory — it has the right
        answers for hydrogen but is built on inconsistent
        assumptions (electrons in classical orbits that don't
        radiate). The full quantum mechanics (Schrödinger
        equation, next chapter) reproduces Bohr's results without
        the contradictions, and extends to multi-electron atoms.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>It's the empirical foundation of QM.</strong>{" "}
          Without these experiments we'd have no reason to invent
          wavefunctions. The puzzles tell you what kind of theory
          you need: probabilistic, wave-like, with discrete
          energy quanta.
        </li>
        <li>
          <strong>The Planck-Einstein relation</strong>{" "}
          <InlineMath math="E = \hbar\omega" /> ties wave and
          particle aspects together. Same for de Broglie's{" "}
          <InlineMath math="\mathbf{p} = \hbar \mathbf{k}" />. These
          two relations are the bridge between classical
          wave-and-particle pictures and quantum amplitudes.
        </li>
        <li>
          <strong>Atomic / molecular spectroscopy</strong> is
          everywhere in chemistry, astronomy, materials science.
          Each molecule has a "fingerprint" of energy levels and
          allowed transitions. We identify substances by their
          spectra.
        </li>
        <li>
          <strong>Wave-particle duality is universal.</strong>{" "}
          Not just light or electrons — all matter has it.
          Modern experiments routinely demonstrate it for atoms
          and molecules. Quantum mechanics is the universal
          theory; classical physics emerges only when wave
          aspects average out.
        </li>
      </ul>

      <p>
        Next chapter: Schrödinger's equation. The wave-like
        amplitude (the wavefunction) becomes a precise
        mathematical object obeying a definite equation, with the
        probabilistic interpretation made concrete via the Born
        rule.
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
      "By Planck's relation, the energy of a photon of frequency $\\nu$ is…",
    options: ["$h \\nu^2$", "$h \\nu$", "$h/\\nu$", "$h c \\nu$"],
    correct: 1,
    explanation:
      "$E = h\\nu = \\hbar\\omega$. Planck introduced this in 1900 to fix black-body radiation; Einstein in 1905 promoted it to a real physical statement (photons).",
  },
  {
    prompt:
      "The photoelectric effect showed that…",
    options: [
      "intensity of light determines ejected-electron energy",
      "frequency of light determines ejected-electron energy",
      "the electron mass changes",
      "photons don't exist",
    ],
    correct: 1,
    explanation:
      "Threshold frequency below which no emission, regardless of intensity. Above threshold, kinetic energy depends only on $\\nu$. Explained by Einstein: each photon carries energy $h\\nu$, and an electron absorbs one whole photon.",
  },
  {
    prompt:
      "The de Broglie wavelength of a particle with momentum $p$ is…",
    options: ["$\\lambda = h p$", "$\\lambda = p/h$", "$\\lambda = h/p$", "$\\lambda = \\hbar/p^2$"],
    correct: 2,
    explanation:
      "$\\lambda = h/p$. Inverse to momentum. For a baseball, $\\lambda \\sim 10^{-34}$ m — invisible. For an electron, $\\lambda$ can be comparable to atomic spacing — observable as electron diffraction (Davisson-Germer).",
  },
  {
    prompt:
      "Why does a single electron 'interfere with itself' in a double-slit experiment?",
    options: [
      "the electron actually splits into two pieces",
      "different electrons interact with each other",
      "the electron is described by a wave amplitude that covers both slits, with detection giving probabilistic outcomes",
      "it's a measurement error",
    ],
    correct: 2,
    explanation:
      "Wave-particle duality. Wave-like amplitude propagates and interferes; particle-like detection produces a single localised outcome. Each electron contributes to the interference pattern probabilistically.",
  },
  {
    prompt:
      "By the Bohr model, the energy levels of hydrogen are…",
    options: [
      "equally spaced",
      "$E_n = -13.6 \\, \\mathrm{eV} / n^2$",
      "$E_n = n \\hbar \\omega$",
      "uniform",
    ],
    correct: 1,
    explanation:
      "Hydrogen's energies go as $-13.6 \\, \\mathrm{eV}/n^2$ — the famous formula. Differences match observed spectral lines (Lyman / Balmer / Paschen series). Full Schrödinger derivation reproduces these, plus the angular structure Bohr didn't have.",
  },
];
