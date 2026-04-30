import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function OpticsBody() {
  return (
    <>
      <p>
        Optics is wave physics applied to visible light. Most
        everyday optical phenomena — reflection, refraction,
        rainbows, lenses — can be understood with{" "}
        <em>geometric optics</em>, treating light as rays. But the
        most beautiful and historically pivotal phenomena —{" "}
        interference, diffraction, polarisation — require{" "}
        <em>wave optics</em>, treating light as electromagnetic
        waves. And the most subtle phenomena require{" "}
        <em>quantum optics</em> — light as photons. We end the
        chapter (and this module) on the threshold of QM, where
        the empirical phenomena of light forced physics to leave
        classical physics behind.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Hecht — Optics (5th ed)",
            author: "Eugene Hecht",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Eugene_Hecht",
            note: "The standard undergraduate optics textbook. Comprehensive and well-illustrated.",
          },
          {
            title: "MIT 8.03 — vibrations and waves (optics chapters)",
            author: "MIT OCW",
            duration: "~10h",
            url: "https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/",
            note: "Optics is the second half of MIT 8.03. Lewin demos with lasers + slits are unforgettable.",
          },
          {
            title: "Born &amp; Wolf — Principles of Optics",
            author: "Born / Wolf",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Principles_of_Optics",
            note: "The graduate-level reference. Definitive but demanding.",
          },
          {
            title: "Feynman QED: The Strange Theory of Light and Matter",
            author: "Richard Feynman",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/QED:_The_Strange_Theory_of_Light_and_Matter",
            note: "Pop-science but mathematically honest treatment of quantum optics. Worth reading once Tier XIV is started.",
          },
          {
            title: "Veritasium — series on quantum optics",
            author: "Veritasium",
            duration: "varies",
            url: "https://www.youtube.com/c/veritasium",
            note: "Several excellent videos on double-slit experiments and quantum behaviour of light.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Light as electromagnetic waves</h2>

      <p>
        From Maxwell's equations: light is a transverse EM wave
        with{" "}
        <InlineMath math="\mathbf{E}" /> and{" "}
        <InlineMath math="\mathbf{B}" /> oscillating
        perpendicular to the propagation direction and to each
        other, traveling at{" "}
        <InlineMath math="c \approx 3 \times 10^8" /> m/s in
        vacuum.
      </p>

      <p>
        Visible light spans wavelengths{" "}
        <InlineMath math="\lambda \approx 400" />–
        <InlineMath math="700" /> nm. Each wavelength corresponds
        to a colour:
      </p>

      <ul>
        <li>
          <InlineMath math="400 \, \mathrm{nm}" /> ≈ violet
        </li>
        <li>
          <InlineMath math="450 \, \mathrm{nm}" /> ≈ blue
        </li>
        <li>
          <InlineMath math="550 \, \mathrm{nm}" /> ≈ green
        </li>
        <li>
          <InlineMath math="600 \, \mathrm{nm}" /> ≈ orange
        </li>
        <li>
          <InlineMath math="700 \, \mathrm{nm}" /> ≈ red
        </li>
      </ul>

      <p>
        The frequency{" "}
        <InlineMath math="f = c/\lambda" /> is around{" "}
        <InlineMath math="5 \times 10^{14}" /> Hz — too fast for
        any direct mechanical detector. We perceive colour via
        the wavelength response of three types of cones in the
        retina; the visual system processes their relative
        responses to give the perceived hue.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Geometric optics (briefly)</h2>

      <p>
        When wavelengths are much smaller than the apparatus,
        light propagates approximately as <strong>rays</strong> in
        straight lines. Three laws:
      </p>

      <ul>
        <li>
          <strong>Reflection</strong>: angle of incidence = angle
          of reflection.
        </li>
        <li>
          <strong>Refraction</strong> (Snell's law):{" "}
          <InlineMath math="n_1 \sin\theta_1 = n_2 \sin\theta_2" />,
          where <InlineMath math="n = c/v" /> is the refractive
          index of each medium.
        </li>
        <li>
          <strong>Fermat's principle</strong>: light follows the
          path of stationary travel time. Reflection and
          refraction both fall out of this principle by
          variational calculus — the same ideas as classical
          mechanics' principle of least action.
        </li>
      </ul>

      <p>
        Lens-makers build telescopes, microscopes, and cameras
        using these laws. The thin lens equation{" "}
        <InlineMath math="1/f = 1/d_o + 1/d_i" /> is geometric
        optics' most-used formula.
      </p>

      <p>
        Geometric optics fails when wavelengths approach the
        apparatus size — that's when wave effects (interference,
        diffraction) take over.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Interference</h2>

      <p>
        When two coherent light waves overlap, they interfere
        (Part 3 of last chapter). The classic experimental
        demonstration:
      </p>

      <Callout title="Young's double-slit experiment (1801)">
        Coherent light passes through two narrow parallel slits.
        On a screen behind, an interference pattern of bright
        and dark fringes appears. The pattern can <em>only</em>{" "}
        be explained if light is a wave — particles passing
        through two slits would just give two bright stripes.
      </Callout>

      <p>
        The fringe positions: for slits separated by{" "}
        <InlineMath math="d" /> and screen at distance{" "}
        <InlineMath math="L \gg d" />, bright fringes occur at
        screen positions{" "}
        <InlineMath math="y_n" /> with
      </p>
      <BlockMath math="d \sin\theta_n = n \lambda \quad (n = 0, \pm 1, \pm 2, \dots)," />

      <p>
        and <InlineMath math="\sin\theta_n \approx y_n/L" /> for
        small angles.
      </p>

      <p>
        The double-slit experiment was the experimental death
        blow to Newton's corpuscular theory of light, and the
        triumph of Huygens's wave theory. It also has a profound
        quantum sequel: the same pattern appears for a beam of
        electrons (Davisson–Germer, 1927), and even for{" "}
        <em>single</em> electrons accumulated one-at-a-time
        (Tonomura's experiment, 1989). Quantum mechanics requires
        each electron to "interfere with itself" — which is
        only consistent if the electron is described by a wave-
        like amplitude, not a classical particle.
      </p>

      <h3>Thin film interference</h3>

      <p>
        Reflections from the top and bottom of a thin film (oil
        on water, soap bubbles, anti-reflection coatings)
        interfere depending on film thickness. Constructive
        interference for{" "}
        <InlineMath math="2 n t = (m + 1/2) \lambda" />{" "}
        (factoring in the half-wavelength phase change on
        reflection at higher-index media). The colours of soap
        bubbles and oil slicks are wavelength-dependent
        interference.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Diffraction</h2>

      <p>
        When light passes a sharp edge or through an aperture
        comparable to its wavelength, it bends —{" "}
        <strong>diffraction</strong>. The same wave physics:
        Huygens's principle says every point on a wavefront acts
        as a source of secondary spherical waves; the resulting
        pattern is the superposition of all these.
      </p>

      <h3>Single-slit diffraction</h3>

      <p>
        For a single slit of width{" "}
        <InlineMath math="a" />, the diffraction pattern has
        minima at
      </p>
      <BlockMath math="a \sin\theta = m \lambda \quad (m = \pm 1, \pm 2, \dots)" />

      <p>
        with the central maximum being the brightest, surrounded
        by progressively dimmer side-lobes. The width of the
        central maximum (in angle) is{" "}
        <InlineMath math="\sim \lambda/a" /> — so wider slits
        give narrower diffraction. In the limit{" "}
        <InlineMath math="a \to \infty" />, no diffraction and we
        recover geometric optics.
      </p>

      <h3>Diffraction gratings</h3>

      <p>
        Many parallel slits with spacing{" "}
        <InlineMath math="d" />: maxima where{" "}
        <InlineMath math="d \sin\theta = m \lambda" />. With many
        slits, the maxima become very sharp, allowing wavelength
        measurement to high precision. This is how spectrometers
        work.
      </p>

      <p>
        Spectroscopy of atomic emission/absorption lines led
        directly to QM. Each element has a characteristic line
        spectrum (different from blackbody, distinct from any
        classical wave prediction). Explaining hydrogen's
        spectrum required quantising the atom (Bohr 1913, then
        Schrödinger 1926).
      </p>

      <h3>X-ray diffraction</h3>

      <p>
        X-rays have wavelengths comparable to interatomic
        spacings ({" "}
        <InlineMath math="\sim 0.1" /> nm). When X-rays pass
        through a crystal, the regular array of atoms acts like a
        3D diffraction grating, producing characteristic
        scattering patterns. <strong>Bragg's law</strong>:{" "}
        <InlineMath math="2 d \sin\theta = n \lambda" />.
      </p>

      <p>
        This is how the structure of DNA was determined (Franklin,
        Watson, Crick 1953), how proteins are crystallised and
        analysed today, and how condensed-matter physics
        identifies materials. X-ray crystallography is one of the
        most useful applications of wave physics ever.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Polarisation</h2>

      <p>
        EM waves are transverse — the electric field oscillates
        perpendicular to the propagation direction. There are
        two independent orthogonal directions in which it can
        oscillate. The <strong>polarisation</strong> describes
        how the field oscillates over the cross-section.
      </p>

      <ul>
        <li>
          <strong>Linear polarisation</strong>:{" "}
          <InlineMath math="\mathbf{E}" /> oscillates along a
          fixed direction.
        </li>
        <li>
          <strong>Circular polarisation</strong>:{" "}
          <InlineMath math="\mathbf{E}" /> traces a circle in the
          plane perpendicular to propagation.
        </li>
        <li>
          <strong>Elliptical polarisation</strong>: a general
          ellipse — sum of two linear polarisations with phase
          difference.
        </li>
      </ul>

      <p>
        Unpolarised light (e.g. from a thermal source) has{" "}
        <InlineMath math="\mathbf{E}" /> randomly oriented,
        averaging to no preferred direction.
      </p>

      <h3>Polarisers</h3>

      <p>
        A polariser transmits the component of{" "}
        <InlineMath math="\mathbf{E}" /> along its{" "}
        <em>transmission axis</em>. For unpolarised light passing
        through a polariser, half the intensity gets through.
        For linearly polarised light at angle{" "}
        <InlineMath math="\theta" /> to the axis,{" "}
        <strong>Malus's law</strong>:
      </p>
      <BlockMath math="I = I_0 \cos^2\theta." />

      <p>
        Two polarisers at 90° pass nothing. But adding a third
        at 45° between them — counter-intuitively — passes some
        light. Each polariser projects, and projections don't
        commute. This is exactly how spin-1/2 measurements behave
        in quantum mechanics; we'll meet it in Tier XV.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Light as photons (quantum hint)</h2>

      <p>
        Wave optics is enough for most macroscopic optics. But
        three early-20th-century puzzles forced physicists to
        accept that light is also <em>particles</em> — photons —
        with energy <InlineMath math="E = h\nu" /> (Planck's
        constant{" "}
        <InlineMath math="h \approx 6.626 \times 10^{-34} \, \mathrm{J \cdot s}" />).
      </p>

      <h3>Black-body radiation</h3>

      <p>
        Hot objects radiate at all wavelengths. Classical physics
        (Rayleigh–Jeans) predicted infinite emission at high
        frequencies — the "ultraviolet catastrophe." Planck (1900)
        derived the correct spectrum by postulating that energy
        in EM modes is exchanged in discrete quanta{" "}
        <InlineMath math="E = h\nu" />. The unique quantisation
        rule that eliminated the catastrophe.
      </p>

      <h3>Photoelectric effect</h3>

      <p>
        Light shining on a metal can eject electrons — but only
        if the frequency is above a threshold. Classical wave
        theory predicted: more intense light should eject more
        energetic electrons. Observed: more intense light ejects
        more electrons, but the kinetic energy depends only on
        frequency. Einstein (1905) explained: light comes in
        photons of energy{" "}
        <InlineMath math="h\nu" />, and an electron either
        absorbs one whole photon or none.
      </p>

      <h3>Compton scattering</h3>

      <p>
        X-rays scattered off electrons shift wavelength
        depending on scattering angle —{" "}
        <InlineMath math="\Delta \lambda = (h/m_e c)(1 - \cos\theta)" />.
        Classical wave theory predicts no shift. Compton (1923)
        explained: photons carry momentum{" "}
        <InlineMath math="p = h/\lambda" />, and the
        photon-electron collision conserves both energy and
        momentum like a billiard-ball collision.
      </p>

      <Callout title="Wave-particle duality">
        Light is both a wave (interference, diffraction) and a
        particle (photoelectric, Compton). It's not one or the
        other — it's a quantum object whose behaviour matches
        whichever experimental setup you use.
      </Callout>

      <p>
        This is the gateway to quantum mechanics. The same
        wave-particle duality applies to electrons (Davisson-
        Germer 1927), neutrons, atoms, and even small molecules.
        Everything is <em>quantum</em> — classical physics
        emerges only as an approximation when actions are large
        compared to{" "}
        <InlineMath math="\hbar" />.
      </p>

      <Pitfall>
        It's tempting to describe photons as "tiny billiard
        balls of light." This is wrong. A photon doesn't have a
        well-defined position until you measure it. Between
        creation and detection, it's described by a wave-like
        amplitude. The "particle" aspect appears at detection;
        the "wave" aspect at propagation.
      </Pitfall>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Quantum mechanics.</strong> Wave-particle
          duality, observed first in light, is the central
          mystery of QM. The double-slit experiment is the
          single most important demonstration of quantum
          weirdness.
        </li>
        <li>
          <strong>Spectroscopy.</strong> Atomic and molecular
          spectra are the universal fingerprints of chemistry
          and astrophysics. We know what stars are made of by
          measuring their spectra. We know quantum mechanics
          is correct because it predicts the spectra precisely.
        </li>
        <li>
          <strong>Lasers.</strong> Stimulated emission, mode
          structure, and coherence — laser physics is wave
          optics + quantum mechanics. Modern technology
          (telecommunications, eye surgery, manufacturing,
          quantum computing) uses lasers everywhere.
        </li>
        <li>
          <strong>Imaging.</strong> Diffraction limits the
          resolution of every optical instrument:{" "}
          <InlineMath math="\Delta x \gtrsim \lambda/(2 \mathrm{NA})" />.
          Electron microscopy (
          <InlineMath math="\lambda" /> from de Broglie of high-
          energy electrons) breaks this limit at the cost of a
          shorter effective wavelength. Super-resolution optical
          microscopy (Nobel 2014) breaks it cleverly via
          stimulated-emission and stochastic methods.
        </li>
        <li>
          <strong>Quantum optics.</strong> Single-photon sources,
          entangled photon pairs, and squeezed light are the
          tools of quantum cryptography (BB84), quantum
          teleportation, and quantum computing with photonic
          qubits. We meet some of these in Tier XVI.
        </li>
      </ul>

      <p>
        That closes Tier XIII. We've gone from Maxwell's
        equations to electromagnetic waves to optics, and ended
        with the empirical phenomena that broke classical
        physics. The next module — <strong>Tier XIV: Quantum
        Mechanics I</strong> — meets the puzzles head-on:
        Schrödinger's equation, wavefunctions, and the canonical
        1D systems (infinite well, harmonic oscillator,
        tunneling).
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
      "Snell's law of refraction is…",
    options: [
      "$\\sin\\theta_1 = \\sin\\theta_2$",
      "$n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2$",
      "$n_1 \\theta_1 = n_2 \\theta_2$",
      "$\\theta_1 + \\theta_2 = 90°$",
    ],
    correct: 1,
    explanation:
      "Snell's law: $n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2$ where $n = c/v$ is the refractive index. Falls out of Fermat's principle (light minimises travel time).",
  },
  {
    prompt:
      "Young's double-slit interference fringes are at angles satisfying…",
    options: [
      "$d \\sin\\theta = (n + 1/2) \\lambda$ for bright fringes",
      "$d \\sin\\theta = n \\lambda$ for bright fringes",
      "$d = n \\lambda$",
      "$\\theta = n \\lambda$",
    ],
    correct: 1,
    explanation:
      "Bright fringes (constructive) at $d \\sin\\theta = n\\lambda$. The pattern proves light is a wave — particles passing through two slits would give two stripes, not interference fringes.",
  },
  {
    prompt:
      "By Bragg's law, X-ray diffraction maxima from a crystal occur at…",
    options: [
      "$d \\sin\\theta = n \\lambda$",
      "$2 d \\sin\\theta = n \\lambda$",
      "$d \\cos\\theta = n \\lambda$",
      "$d = n \\lambda^2$",
    ],
    correct: 1,
    explanation:
      "Bragg's law: $2 d \\sin\\theta = n\\lambda$. The factor 2 because waves reflected from successive lattice planes have $2 d \\sin\\theta$ extra path difference. Used to determine crystal structures (including DNA).",
  },
  {
    prompt:
      "By Malus's law, polarised light at angle $\\theta$ to a polariser axis emerges with intensity…",
    options: [
      "$I_0 \\cos\\theta$",
      "$I_0 \\cos^2\\theta$",
      "$I_0 \\sin\\theta$",
      "$I_0 / \\cos\\theta$",
    ],
    correct: 1,
    explanation:
      "Malus's law: $I = I_0 \\cos^2\\theta$. Field amplitude is projected by $\\cos\\theta$; intensity goes like the squared amplitude.",
  },
  {
    prompt:
      "The photoelectric effect demonstrated that light is also…",
    options: [
      "always particles",
      "particles in some experimental contexts (with energy $E = h\\nu$ per photon)",
      "an electromagnetic field",
      "magnetic",
    ],
    correct: 1,
    explanation:
      "Einstein's 1905 explanation: light is exchanged in quanta of energy $h\\nu$. Combined with Young's double-slit, this gave wave-particle duality and motivated quantum mechanics.",
  },
];
