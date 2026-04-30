import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function WavesBody() {
  return (
    <>
      <p>
        The wave equation is one of the most universal equations
        in physics. It describes light, sound, water surfaces,
        guitar strings, seismic waves, and (in modified form) the
        wavefunctions of quantum mechanics. The same mathematics
        that gave us light from Maxwell's equations gives us
        sound from acoustics, vibrations from elasticity, and
        propagating disturbances of every kind.
      </p>
      <p>
        This chapter develops the wave equation in general,
        explores its solutions (plane waves, standing waves,
        Fourier decomposition), and looks at the phenomena that
        emerge: superposition, interference, dispersion, group vs
        phase velocity. These concepts are the conceptual bridge
        to quantum mechanics — wavefunctions in QM behave like
        classical waves, with extra ingredients we'll meet in
        Tier XIV.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 8.03 — Vibrations and Waves",
            author: "MIT OCW",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/",
            note: "The standard MIT undergraduate wave course.",
          },
          {
            title: "French — Vibrations and Waves (1971)",
            author: "A.P. French",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/A._P._French",
            note: "Classic MIT textbook on this material. Excellent for self-study.",
          },
          {
            title: "Crawford — Waves (Berkeley Physics Vol. 3)",
            author: "Frank Crawford",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Berkeley_Physics_Course",
            note: "Insightful, demanding undergraduate-level treatment.",
          },
          {
            title: "Susskind — Special Relativity and Classical Field Theory",
            author: "Leonard Susskind",
            duration: "~10h",
            url: "https://theoreticalminimum.com/courses/special-relativity-and-classical-field-theory",
            note: "Wave equations from a Lagrangian field theory perspective.",
          },
          {
            title: "Feynman Vol. I, chs. 47–51 (waves)",
            author: "Richard Feynman",
            duration: "Reading",
            url: "https://www.feynmanlectures.caltech.edu/I_47.html",
            note: "Feynman on wave physics. Beautiful and physical.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · The wave equation</h2>

      <Callout title="The wave equation">
        For a function{" "}
        <InlineMath math="u(\mathbf{r}, t)" /> describing some
        scalar wave amplitude:
        <BlockMath math="\frac{\partial^2 u}{\partial t^2} = v^2 \nabla^2 u," />
        where <InlineMath math="v" /> is the wave speed (a
        property of the medium).
      </Callout>

      <p>
        Same equation, different physical meanings:
      </p>

      <ul>
        <li>
          <strong>EM waves in vacuum</strong>:{" "}
          <InlineMath math="u = E_x" /> (a component of the
          electric field), <InlineMath math="v = c" />.
        </li>
        <li>
          <strong>Sound in air</strong>:{" "}
          <InlineMath math="u = " /> pressure perturbation,{" "}
          <InlineMath math="v = " /> speed of sound{" "}
          <InlineMath math="\approx 343" /> m/s at room
          temperature.
        </li>
        <li>
          <strong>Transverse vibrations of a string</strong>:{" "}
          <InlineMath math="u = " /> displacement,{" "}
          <InlineMath math="v = \sqrt{T/\mu}" /> with{" "}
          <InlineMath math="T" /> tension and{" "}
          <InlineMath math="\mu" /> linear mass density.
        </li>
        <li>
          <strong>Surface waves</strong>:{" "}
          <InlineMath math="u = " /> surface height,{" "}
          <InlineMath math="v" /> depending on depth and gravity.
        </li>
      </ul>

      <p>
        The wave equation is{" "}
        <em>linear</em> — a sum of solutions is a solution. This
        is the principle of <strong>superposition</strong>, which
        gives waves their distinctive behaviour: interference,
        diffraction, and the ability to be decomposed into
        Fourier modes.
      </p>

      <h3>1D case</h3>

      <p>
        For a wave on a line:
      </p>
      <BlockMath math="\frac{\partial^2 u}{\partial t^2} = v^2 \frac{\partial^2 u}{\partial x^2}." />

      <p>
        D'Alembert's solution: any function of the form
      </p>
      <BlockMath math="u(x, t) = f(x - v t) + g(x + v t)" />

      <p>
        works, where <InlineMath math="f" /> and{" "}
        <InlineMath math="g" /> are arbitrary smooth functions.
        The first term moves to the right at speed{" "}
        <InlineMath math="v" />; the second moves left.
      </p>

      <p>
        Verify: substitute back. With{" "}
        <InlineMath math="\xi = x - vt" />,{" "}
        <InlineMath math="\partial^2 f/\partial t^2 = v^2 f''" />{" "}
        and{" "}
        <InlineMath math="\partial^2 f/\partial x^2 = f''" /> —
        wave equation satisfied. ✓
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Plane wave solutions</h2>

      <p>
        A particularly useful family of solutions:
      </p>
      <BlockMath math="u(\mathbf{r}, t) = A \cos(\mathbf{k} \cdot \mathbf{r} - \omega t + \phi)" />

      <p>
        — a <strong>plane wave</strong> with:
      </p>
      <ul>
        <li>
          <strong>Wavevector</strong>{" "}
          <InlineMath math="\mathbf{k}" />: direction of
          propagation; magnitude{" "}
          <InlineMath math="k = 2\pi/\lambda" /> with{" "}
          <InlineMath math="\lambda" /> the wavelength.
        </li>
        <li>
          <strong>Angular frequency</strong>{" "}
          <InlineMath math="\omega = 2\pi f" /> with{" "}
          <InlineMath math="f = 1/T" /> the frequency.
        </li>
        <li>
          <strong>Amplitude</strong> <InlineMath math="A" />.
        </li>
        <li>
          <strong>Phase</strong> <InlineMath math="\phi" />.
        </li>
      </ul>

      <p>
        For this to satisfy the wave equation, we need the{" "}
        <strong>dispersion relation</strong>:
      </p>
      <BlockMath math="\omega = v |\mathbf{k}|." />

      <p>
        For non-dispersive media (vacuum EM, ideal sound), all
        frequencies travel at the same speed{" "}
        <InlineMath math="v" />. For dispersive media (light in
        glass, water waves), the speed depends on{" "}
        <InlineMath math="\omega" /> — different colours of light
        bend differently in a prism.
      </p>

      <h3>Complex form</h3>

      <p>
        For convenience, write
      </p>
      <BlockMath math="u(\mathbf{r}, t) = A \, e^{i(\mathbf{k} \cdot \mathbf{r} - \omega t)}" />

      <p>
        and take the real part at the end. The complex form makes
        algebra easier — multiplying complex exponentials is
        adding phases.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Superposition and interference</h2>

      <p>
        Linearity of the wave equation means: any sum of plane
        waves is a solution. This is the principle of{" "}
        <strong>superposition</strong>. Two waves passing through
        each other don't interact; their amplitudes add.
      </p>

      <h3>Interference</h3>

      <p>
        Two coherent waves at the same frequency can{" "}
        <strong>interfere</strong>:
      </p>

      <ul>
        <li>
          <strong>Constructive</strong>: in phase, amplitudes
          add. Crests align with crests.
        </li>
        <li>
          <strong>Destructive</strong>: out of phase by{" "}
          <InlineMath math="\pi" />, amplitudes cancel. Crest of
          one aligns with trough of the other.
        </li>
      </ul>

      <p>
        Two waves of equal amplitude and slightly different
        frequencies produce <strong>beats</strong>:
      </p>
      <BlockMath math="\cos(\omega_1 t) + \cos(\omega_2 t) = 2 \cos\!\left(\tfrac{\omega_1 + \omega_2}{2} t\right) \cos\!\left(\tfrac{\omega_1 - \omega_2}{2} t\right)." />

      <p>
        The result is a fast oscillation at average frequency,
        modulated by a slow envelope at the difference frequency.
        Audible when two musical notes are slightly out of tune.
      </p>

      <h3>Standing waves</h3>

      <p>
        Two waves of equal amplitude travelling in opposite
        directions:
      </p>
      <BlockMath math="\cos(kx - \omega t) + \cos(kx + \omega t) = 2 \cos(kx) \cos(\omega t)." />

      <p>
        The result oscillates in time but doesn't propagate — a
        <strong>standing wave</strong>. Nodes (zero amplitude
        forever) at <InlineMath math="kx = (n + 1/2)\pi" />;
        antinodes (max amplitude) at{" "}
        <InlineMath math="kx = n\pi" />.
      </p>

      <p>
        For a string of length <InlineMath math="L" /> fixed at
        both ends, allowed wavelengths satisfy{" "}
        <InlineMath math="L = n \lambda/2" /> for{" "}
        <InlineMath math="n = 1, 2, 3, \dots" />, giving discrete
        modes:
      </p>
      <BlockMath math="\omega_n = n \frac{\pi v}{L}." />

      <p>
        These are the harmonics of a guitar string. The same
        mathematics applies to standing EM waves in cavities and
        to wavefunctions in a 1D infinite-well potential — quantum
        mechanics' "particle in a box."
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Fourier decomposition</h2>

      <p>
        Linearity + plane-wave solutions ⇒ any wave can be
        written as a sum (or integral) of plane waves. This is
        Fourier analysis applied to the wave equation.
      </p>

      <p>
        For periodic phenomena: Fourier series.
      </p>
      <BlockMath math="u(x, t) = \sum_n A_n \cos(k_n x - \omega_n t + \phi_n)." />

      <p>
        For non-periodic: Fourier transform.
      </p>
      <BlockMath math="u(x, t) = \int \tilde u(k) \, e^{i(kx - \omega(k) t)} \, dk." />

      <p>
        We met these tools in Tier V (Fourier and PDEs). The
        wave equation is precisely where they prove their worth:
        every wave problem decomposes into independent Fourier
        modes, each evolving as a simple harmonic in time.
      </p>

      <h3>Wave packets</h3>

      <p>
        A localised wave (a "pulse") is a superposition of plane
        waves with a range of <InlineMath math="k" /> values.
        For instance, a Gaussian wave packet:
      </p>
      <BlockMath math="u(x, 0) = e^{-x^2/(2\sigma^2)} e^{i k_0 x}" />

      <p>
        is centred at <InlineMath math="x = 0" />, has dominant
        wavevector <InlineMath math="k_0" />, and a spread{" "}
        <InlineMath math="\Delta x \sim \sigma" /> in position
        and <InlineMath math="\Delta k \sim 1/\sigma" /> in
        wavevector. The product{" "}
        <InlineMath math="\Delta x \cdot \Delta k \geq 1/2" />.
      </p>

      <p>
        That last inequality is the classical analogue of the{" "}
        <em>Heisenberg uncertainty principle</em>: in QM, position
        and momentum are Fourier-conjugate, so position-momentum
        uncertainty satisfies the same relation with{" "}
        <InlineMath math="\hbar" />:{" "}
        <InlineMath math="\Delta x \cdot \Delta p \geq \hbar/2" />.
        Wave-packet spread is wave physics.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Group velocity vs phase velocity</h2>

      <p>
        For a non-dispersive wave, all frequencies have the same{" "}
        <InlineMath math="v" />, and a wave packet propagates
        without distorting. For dispersive waves —{" "}
        <InlineMath math="\omega(k)" /> non-linear in{" "}
        <InlineMath math="k" /> — different frequencies move at
        different speeds, and packets spread.
      </p>

      <p>
        Two important velocities:
      </p>
      <ul>
        <li>
          <strong>Phase velocity</strong>{" "}
          <InlineMath math="v_p = \omega/k" />: speed of an
          individual crest.
        </li>
        <li>
          <strong>Group velocity</strong>{" "}
          <InlineMath math="v_g = d\omega/dk" />: speed of the
          envelope (energy / information).
        </li>
      </ul>

      <p>
        For non-dispersive waves <InlineMath math="\omega = v k" />:{" "}
        <InlineMath math="v_p = v_g = v" />. For dispersive media
        they differ — and it's the group velocity that carries
        signals (and hence cannot exceed{" "}
        <InlineMath math="c" />).
      </p>

      <p>
        Example: water waves on deep water have{" "}
        <InlineMath math="\omega = \sqrt{gk}" />, so{" "}
        <InlineMath math="v_p = \sqrt{g/k}" /> but{" "}
        <InlineMath math="v_g = \tfrac{1}{2}\sqrt{g/k} = v_p/2" />.
        The wave envelope moves half as fast as the individual
        crests. You can see this if you watch waves from a boat:
        crests propagate forward through the moving wave packet.
      </p>

      <Pitfall>
        Phase velocity can exceed <InlineMath math="c" /> in some
        media — but no information travels at the phase velocity.
        Information is carried by the envelope (group velocity),
        which is always{" "}
        <InlineMath math="\leq c" />. No special relativity
        violation.
      </Pitfall>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Standing waves and discrete modes</h2>

      <p>
        A confined wave (string of length{" "}
        <InlineMath math="L" />, drum, organ pipe, EM cavity)
        has only certain allowed frequencies — its{" "}
        <strong>normal modes</strong>. The mathematical reason:
        boundary conditions select modes whose wavelengths fit
        the geometry.
      </p>

      <p>
        For a 1D string fixed at both ends:{" "}
        <InlineMath math="\sin(k L) = 0" />, so{" "}
        <InlineMath math="k_n = n\pi/L" />. Frequencies{" "}
        <InlineMath math="f_n = n v/(2L)" /> — the harmonic
        series.
      </p>

      <p>
        For a 2D drum: modes are eigenfunctions of the Laplacian
        with zero boundary on the disc, given by Bessel functions
        of the first kind <InlineMath math="J_n" /> with the
        boundary condition picking discrete{" "}
        <InlineMath math="k_{nm}" /> values.
      </p>

      <p>
        For a 3D cavity: modes are products of standing waves in
        each direction. The number of modes per unit frequency
        interval grows like{" "}
        <InlineMath math="\omega^2" /> — exactly Rayleigh's
        result that gave the "ultraviolet catastrophe" of
        classical thermal radiation, which Planck resolved by
        quantising. We meet this story in QM I.
      </p>

      <p>
        This connects directly to QM: a quantum particle in a 1D
        box has wavefunctions{" "}
        <InlineMath math="\psi_n(x) = \sin(n\pi x/L)" /> —
        identical to the string standing waves. The energy
        levels{" "}
        <InlineMath math="E_n = \hbar^2 \pi^2 n^2/(2 m L^2)" />{" "}
        are exactly the discrete modes' frequencies, with{" "}
        <InlineMath math="E = \hbar \omega" />.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Quantum mechanics.</strong> The Schrödinger
          equation is a wave equation (with{" "}
          <InlineMath math="i" /> in front of the time derivative,
          which makes a huge difference). Wavefunctions
          superpose, interfere, and form wave packets — all the
          ideas of this chapter, plus the new probabilistic
          interpretation.
        </li>
        <li>
          <strong>Spectroscopy.</strong> Atomic, molecular, and
          nuclear spectra come from quantised energy levels —
          standing-wave modes in confining potentials. Identifying
          chemicals from their spectra is wave physics + QM.
        </li>
        <li>
          <strong>Acoustics &amp; music.</strong> Tones, timbres,
          chords, and dissonance are all wave physics. Musical
          instruments are tuned cavities with characteristic
          modes.
        </li>
        <li>
          <strong>Communications.</strong> Signal modulation,
          bandwidth, sampling theorems all use Fourier
          decomposition of wave amplitudes.
        </li>
        <li>
          <strong>Seismology.</strong> P-waves and S-waves
          (longitudinal vs transverse) propagate through Earth
          with different speeds and are reflected/refracted at
          discontinuities. We map Earth's interior using wave
          travel times.
        </li>
      </ul>

      <p>
        Last chapter of this module: optics — wave physics
        applied to visible-light EM waves, with interference and
        diffraction phenomena that motivated the development of
        QM.
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
      "The wave equation in 1D is…",
    options: [
      "$\\partial u / \\partial t = v \\partial u / \\partial x$",
      "$\\partial^2 u / \\partial t^2 = v^2 \\partial^2 u / \\partial x^2$",
      "$\\partial^2 u / \\partial x^2 = 0$",
      "$u = A \\cos(\\omega t)$",
    ],
    correct: 1,
    explanation:
      "Second-order in both space and time. D'Alembert's general solution is $f(x - vt) + g(x + vt)$ — two waves moving in opposite directions.",
  },
  {
    prompt:
      "For a plane wave $u = A \\cos(kx - \\omega t)$ to satisfy the wave equation, the dispersion relation is…",
    options: [
      "$\\omega = k$",
      "$\\omega = v k$",
      "$\\omega = v / k$",
      "$\\omega = v k^2$",
    ],
    correct: 1,
    explanation:
      "Substitute into $\\partial^2 u / \\partial t^2 = v^2 \\partial^2 u / \\partial x^2$: $\\omega^2 A = v^2 k^2 A$, so $\\omega = v k$. Non-dispersive media have this linear relation; dispersive media have $\\omega(k)$ non-linear.",
  },
  {
    prompt:
      "Two waves of slightly different frequencies $\\omega_1, \\omega_2$ produce…",
    options: [
      "destructive interference forever",
      "beats at frequency $|\\omega_1 - \\omega_2|/2$",
      "a wave at frequency $\\omega_1 \\omega_2$",
      "a standing wave",
    ],
    correct: 1,
    explanation:
      "$\\cos\\omega_1 t + \\cos \\omega_2 t = 2\\cos((\\omega_1 + \\omega_2)/2 \\cdot t) \\cos((\\omega_1 - \\omega_2)/2 \\cdot t)$. Average frequency, modulated by half the difference. Audible when two musical notes are nearly in tune.",
  },
  {
    prompt:
      "For a Gaussian wave packet, the position–wavevector uncertainty satisfies…",
    options: [
      "$\\Delta x \\cdot \\Delta k = 0$",
      "$\\Delta x \\cdot \\Delta k \\geq 1/2$",
      "$\\Delta x \\cdot \\Delta k = 1$",
      "$\\Delta x = \\Delta k$",
    ],
    correct: 1,
    explanation:
      "The Fourier-conjugate uncertainty: a sharp position requires a wide spread of wavevectors. Multiplying by $\\hbar$ gives $\\Delta x \\cdot \\Delta p \\geq \\hbar/2$ — the Heisenberg uncertainty principle in QM is a Fourier fact about waves.",
  },
  {
    prompt:
      "Phase velocity $v_p$ vs group velocity $v_g$ — which carries signals (information)?",
    options: [
      "phase velocity",
      "group velocity",
      "either, they're equal",
      "neither — light just is",
    ],
    correct: 1,
    explanation:
      "Group velocity $d\\omega/dk$ carries the wave envelope and hence information. Phase velocity can exceed $c$ in some media (and signals can't), but $v_g \\leq c$ always — no special-relativity violation.",
  },
];
