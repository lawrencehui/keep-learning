import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function MaxwellBody() {
  return (
    <>
      <p>
        Maxwell's equations are the four fundamental laws of
        classical electromagnetism. Together they describe how
        electric and magnetic fields are generated and modified by
        charges, currents, and each other — and predict that a
        self-sustaining oscillation of these fields is{" "}
        <em>light</em>. Maxwell unified electricity, magnetism, and
        optics into a single theory in 1865; the prediction that{" "}
        <InlineMath math="c = 1/\sqrt{\mu_0 \varepsilon_0}" /> is
        the speed of light gave Einstein his starting point in
        1905, leading to special relativity.
      </p>
      <p>
        We met Maxwell's equations briefly in Tier IV (Vector
        Calculus) as the showcase application of div + curl + the
        big theorems. Now we develop them properly, derive the
        wave equation, and connect to the Lagrangian formalism of
        the previous module.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Griffiths — Introduction to Electrodynamics (4th ed)",
            author: "David Griffiths",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Introduction_to_Electrodynamics",
            note: "The standard undergraduate textbook. Excellent prose; balances rigour and intuition.",
          },
          {
            title: "MIT 8.02 — Physics II: Electricity and Magnetism (Lewin)",
            author: "Walter Lewin (MIT OCW)",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/",
            note: "Lewin's lectures are visceral. Demos with capacitors, magnets, EM waves you can see.",
          },
          {
            title: "Feynman Lectures on Physics, Vol. II",
            author: "Richard Feynman",
            duration: "Reading (free online)",
            url: "https://www.feynmanlectures.caltech.edu/II_toc.html",
            note: "All of Feynman Vol. II is electromagnetism. Worth reading for the prose alone.",
          },
          {
            title: "MIT 8.03 — Physics III: Vibrations and Waves",
            author: "MIT OCW",
            duration: "~30h",
            url: "https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/",
            note: "Wave physics with EM waves as the leading example.",
          },
          {
            title: "Jackson — Classical Electrodynamics",
            author: "John David Jackson",
            duration: "Reading",
            url: "https://en.wikipedia.org/wiki/Classical_Electrodynamics_(book)",
            note: "Graduate-level reference. The standard for serious EM. Demanding but comprehensive.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Electric field and Gauss's law</h2>

      <p>
        A point charge <InlineMath math="q" /> creates an electric
        field <InlineMath math="\mathbf{E}" />:
      </p>
      <BlockMath math="\mathbf{E}(\mathbf{r}) = \frac{1}{4\pi \varepsilon_0} \frac{q}{r^2} \hat{\mathbf{r}}." />

      <p>
        The force on a test charge{" "}
        <InlineMath math="q'" /> at position{" "}
        <InlineMath math="\mathbf{r}" /> is{" "}
        <InlineMath math="\mathbf{F} = q' \mathbf{E}(\mathbf{r})" />.
        The constant{" "}
        <InlineMath math="\varepsilon_0 \approx 8.854 \times 10^{-12} \, \mathrm{F/m}" />{" "}
        is the permittivity of free space.
      </p>

      <p>
        For a continuous charge distribution{" "}
        <InlineMath math="\rho(\mathbf{r})" />, integrate.
        Gauss's law packages this:
      </p>

      <Callout title="Gauss's law (integral form)">
        For any closed surface <InlineMath math="S" /> enclosing
        total charge <InlineMath math="Q_{\mathrm{enc}}" />:
        <BlockMath math="\oint_S \mathbf{E} \cdot d\mathbf{A} = Q_{\mathrm{enc}} / \varepsilon_0." />
      </Callout>

      <p>
        Differential form (using divergence theorem):
      </p>
      <BlockMath math="\nabla \cdot \mathbf{E} = \rho / \varepsilon_0." />

      <p>
        Charges are sources of electric field; the divergence at
        a point equals the charge density (over{" "}
        <InlineMath math="\varepsilon_0" />).
      </p>

      <h3>Electric potential</h3>

      <p>
        For static fields, <InlineMath math="\nabla \times \mathbf{E} = 0" />,
        so <InlineMath math="\mathbf{E} = -\nabla V" /> for some
        scalar potential <InlineMath math="V" />. Substituting
        into Gauss's law:
      </p>
      <BlockMath math="-\nabla^2 V = \rho/\varepsilon_0," />

      <p>
        the <strong>Poisson equation</strong>. For{" "}
        <InlineMath math="\rho = 0" />, Laplace's equation. We met
        these in Tier V. The point-charge potential:
      </p>
      <BlockMath math="V(\mathbf{r}) = \frac{1}{4\pi \varepsilon_0} \frac{q}{r}." />

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Magnetic field and Ampère's law</h2>

      <p>
        Magnetic fields are produced by{" "}
        <em>moving</em> charges (currents). The Biot–Savart law
        gives the field of a current element; Ampère's law is the
        integral version.
      </p>

      <Callout title="Ampère's law (integral form, magnetostatic)">
        For any closed loop{" "}
        <InlineMath math="C" /> enclosing total current{" "}
        <InlineMath math="I_{\mathrm{enc}}" />:
        <BlockMath math="\oint_C \mathbf{B} \cdot d\boldsymbol{\ell} = \mu_0 I_{\mathrm{enc}}." />
      </Callout>

      <p>
        Differential form (using Stokes):
      </p>
      <BlockMath math="\nabla \times \mathbf{B} = \mu_0 \mathbf{J}," />

      <p>
        where <InlineMath math="\mathbf{J}" /> is the current
        density. <InlineMath math="\mu_0 = 4\pi \times 10^{-7} \, \mathrm{T \cdot m / A}" />{" "}
        is the permeability of free space.
      </p>

      <h3>No magnetic monopoles</h3>

      <Callout title="No magnetic monopoles">
        <BlockMath math="\nabla \cdot \mathbf{B} = 0." />
        Equivalently:{" "}
        <InlineMath math="\oint \mathbf{B} \cdot d\mathbf{A} = 0" />{" "}
        for any closed surface.
      </Callout>

      <p>
        Magnetic field lines never start or end — they form
        closed loops or extend to infinity. Magnetic monopoles
        (isolated north or south poles) have never been observed,
        though they are predicted in some grand unified theories.
        Dirac showed monopoles are consistent with quantum
        mechanics if their charge is quantised, which would
        explain why electric charge is quantised.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Faraday's law</h2>

      <p>
        A changing magnetic flux through a loop induces an
        electric field around it (Faraday's discovery, 1831):
      </p>

      <Callout title="Faraday's law">
        <BlockMath math="\oint_C \mathbf{E} \cdot d\boldsymbol{\ell} = -\frac{d\Phi_B}{dt}, \quad \Phi_B = \int_S \mathbf{B} \cdot d\mathbf{A}." />
        Differential form:{" "}
        <BlockMath math="\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}." />
      </Callout>

      <p>
        A changing magnetic field is a source of curling
        electric field. Practical consequence: electric
        generators (a coil rotating in a magnetic field generates
        an EMF) and transformers.
      </p>

      <p>
        The minus sign — <strong>Lenz's law</strong> — says
        induced currents oppose the change that produced them.
        This is why dropping a magnet through a copper tube falls
        slowly (the induced eddy currents brake it) and why
        regenerative braking in EVs works.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Maxwell's correction</h2>

      <p>
        The four "laws" so far —{" "}
        <InlineMath math="\nabla \cdot \mathbf{E} = \rho/\varepsilon_0" />,{" "}
        <InlineMath math="\nabla \cdot \mathbf{B} = 0" />,{" "}
        <InlineMath math="\nabla \times \mathbf{E} = -\partial \mathbf{B}/\partial t" />,{" "}
        <InlineMath math="\nabla \times \mathbf{B} = \mu_0 \mathbf{J}" />{" "}
        — are inconsistent. Take the divergence of Ampère:{" "}
        <InlineMath math="\nabla \cdot (\nabla \times \mathbf{B}) = 0" />{" "}
        always (curl of anything is divergence-free), so we'd need{" "}
        <InlineMath math="\nabla \cdot \mathbf{J} = 0" />. But
        from the continuity equation (charge conservation),
      </p>
      <BlockMath math="\frac{\partial \rho}{\partial t} + \nabla \cdot \mathbf{J} = 0," />

      <p>
        and <InlineMath math="\partial \rho / \partial t" /> isn't
        zero in general. Contradiction.
      </p>

      <p>
        Maxwell's fix: add a "displacement current"{" "}
        <InlineMath math="\varepsilon_0 \, \partial \mathbf{E}/\partial t" />{" "}
        to Ampère's law:
      </p>
      <BlockMath math="\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}." />

      <p>
        Now taking divergence:{" "}
        <InlineMath math="0 = \mu_0 \nabla \cdot \mathbf{J} + \mu_0 \varepsilon_0 \, \partial(\nabla \cdot \mathbf{E})/\partial t = \mu_0 (\nabla \cdot \mathbf{J} + \partial \rho/\partial t)" />.
        Charge conservation, automatic. ✓
      </p>

      <p>
        That extra term — small for slow currents but crucial for
        wave phenomena — is what predicts electromagnetic waves.
        Maxwell's correction (1865) is one of the greatest
        theoretical insights in physics.
      </p>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Maxwell's equations</h2>

      <Callout title="Maxwell's equations (differential form, vacuum)">
        <BlockMath math="\nabla \cdot \mathbf{E} = \rho / \varepsilon_0 \qquad \text{(Gauss's law)}" />
        <BlockMath math="\nabla \cdot \mathbf{B} = 0 \qquad \text{(no monopoles)}" />
        <BlockMath math="\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t} \qquad \text{(Faraday)}" />
        <BlockMath math="\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t} \qquad \text{(Ampère–Maxwell)}" />
      </Callout>

      <p>
        Plus the Lorentz force law for a charged particle:
      </p>
      <BlockMath math="\mathbf{F} = q (\mathbf{E} + \mathbf{v} \times \mathbf{B})." />

      <p>
        That's all of classical electromagnetism. Every
        electromagnetic phenomenon — circuits, antennas, light,
        radio, X-rays — comes from these.
      </p>

      <h3>Potentials</h3>

      <p>
        Since{" "}
        <InlineMath math="\nabla \cdot \mathbf{B} = 0" />, we can
        write{" "}
        <InlineMath math="\mathbf{B} = \nabla \times \mathbf{A}" />{" "}
        for some vector potential{" "}
        <InlineMath math="\mathbf{A}" />. Substituting into
        Faraday gives{" "}
        <InlineMath math="\nabla \times (\mathbf{E} + \partial \mathbf{A}/\partial t) = 0" />,
        so this combination is curl-free and equals{" "}
        <InlineMath math="-\nabla \phi" /> for a scalar potential{" "}
        <InlineMath math="\phi" />:
      </p>
      <BlockMath math="\mathbf{E} = -\nabla \phi - \frac{\partial \mathbf{A}}{\partial t}, \qquad \mathbf{B} = \nabla \times \mathbf{A}." />

      <p>
        With these potentials, two of Maxwell's equations are
        automatic; the other two reduce to wave equations for{" "}
        <InlineMath math="\phi" /> and{" "}
        <InlineMath math="\mathbf{A}" /> (in Lorenz gauge).
      </p>

      <h3>Gauge invariance</h3>

      <p>
        Different <InlineMath math="(\phi, \mathbf{A})" /> can give
        the same <InlineMath math="\mathbf{E}, \mathbf{B}" />. The
        substitution
      </p>
      <BlockMath math="\mathbf{A} \to \mathbf{A} + \nabla \chi, \qquad \phi \to \phi - \frac{\partial \chi}{\partial t}" />

      <p>
        leaves the physical fields unchanged. This is{" "}
        <strong>gauge invariance</strong>, the prototype of all
        gauge symmetries in modern physics. The Standard Model
        adds gauge invariance under{" "}
        <InlineMath math="U(1) \times SU(2) \times SU(3)" />;
        electromagnetism is the abelian{" "}
        <InlineMath math="U(1)" /> piece.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Electromagnetic waves</h2>

      <p>
        In vacuum (<InlineMath math="\rho = 0, \mathbf{J} = 0" />),
        take the curl of Faraday and use Ampère–Maxwell:
      </p>
      <BlockMath math="\nabla \times (\nabla \times \mathbf{E}) = -\mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{E}}{\partial t^2}." />

      <p>
        Using the identity{" "}
        <InlineMath math="\nabla \times (\nabla \times \mathbf{E}) = \nabla(\nabla \cdot \mathbf{E}) - \nabla^2 \mathbf{E}" />{" "}
        and{" "}
        <InlineMath math="\nabla \cdot \mathbf{E} = 0" /> in
        vacuum:
      </p>
      <BlockMath math="\nabla^2 \mathbf{E} = \mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{E}}{\partial t^2}." />

      <p>
        — the <strong>wave equation</strong>. Same equation for{" "}
        <InlineMath math="\mathbf{B}" />. The wave speed is
      </p>
      <BlockMath math="c = \frac{1}{\sqrt{\mu_0 \varepsilon_0}} \approx 2.998 \times 10^8 \, \mathrm{m/s}." />

      <p>
        Maxwell computed this from electrostatics measurements
        and recognised it as the speed of light. So{" "}
        <em>light is an electromagnetic wave</em> — one of the
        great unifications in physics. Optics became a chapter in
        electromagnetism.
      </p>

      <h3>Plane waves</h3>

      <p>
        A simple solution: a plane wave travelling in the{" "}
        <InlineMath math="z" /> direction:
      </p>
      <BlockMath math="\mathbf{E} = E_0 \hat{\mathbf{x}} \cos(k z - \omega t), \qquad \mathbf{B} = \frac{E_0}{c} \hat{\mathbf{y}} \cos(k z - \omega t)" />

      <p>
        with <InlineMath math="\omega = c k" />. Notice:
      </p>
      <ul>
        <li>
          <InlineMath math="\mathbf{E} \perp \mathbf{B}" />,{" "}
          <InlineMath math="\mathbf{E} \perp \hat{\mathbf{z}}" />,{" "}
          <InlineMath math="\mathbf{B} \perp \hat{\mathbf{z}}" />.
          EM waves are <em>transverse</em>.
        </li>
        <li>
          <InlineMath math="|\mathbf{B}| = |\mathbf{E}|/c" />.
        </li>
        <li>
          The wave carries energy density{" "}
          <InlineMath math="u = \tfrac{1}{2}\varepsilon_0 |\mathbf{E}|^2 + |\mathbf{B}|^2/(2\mu_0)" />.
        </li>
        <li>
          Energy flow direction:{" "}
          <InlineMath math="\mathbf{S} = \mathbf{E} \times \mathbf{B}/\mu_0" /> — the{" "}
          <em>Poynting vector</em>.
        </li>
      </ul>

      <Pitfall>
        Only the propagation, not the speed of light, depends on
        the medium. In a medium with permittivity{" "}
        <InlineMath math="\varepsilon" /> and permeability{" "}
        <InlineMath math="\mu" />,{" "}
        <InlineMath math="v = 1/\sqrt{\varepsilon \mu}" />.
        Refractive index{" "}
        <InlineMath math="n = c/v = \sqrt{\varepsilon_r \mu_r}" />.
        Light slows down in glass.
      </Pitfall>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · The EM spectrum</h2>

      <p>
        Different frequencies of EM waves get different names:
      </p>
      <ul>
        <li>
          <strong>Radio</strong>:{" "}
          <InlineMath math="\sim 10^4" />–
          <InlineMath math="10^9" /> Hz. AM/FM, Wi-Fi, mobile.
        </li>
        <li>
          <strong>Microwave</strong>:{" "}
          <InlineMath math="\sim 10^9" />–
          <InlineMath math="10^{11}" /> Hz. Cooking, radar, 5G.
        </li>
        <li>
          <strong>Infrared</strong>:{" "}
          <InlineMath math="\sim 10^{11}" />–
          <InlineMath math="4 \times 10^{14}" /> Hz. Heat
          radiation.
        </li>
        <li>
          <strong>Visible light</strong>:{" "}
          <InlineMath math="\sim 4" />–
          <InlineMath math="7.5 \times 10^{14}" /> Hz. The narrow
          band our eyes detect.
        </li>
        <li>
          <strong>Ultraviolet</strong>:{" "}
          <InlineMath math="\sim 10^{15}" />–
          <InlineMath math="10^{17}" /> Hz. Sunburns, vitamin D.
        </li>
        <li>
          <strong>X-ray</strong>:{" "}
          <InlineMath math="\sim 10^{17}" />–
          <InlineMath math="10^{19}" /> Hz. Medical imaging,
          crystallography.
        </li>
        <li>
          <strong>Gamma ray</strong>:{" "}
          <InlineMath math="\sim 10^{19}" /> Hz and above. Nuclear
          decay, cosmic rays.
        </li>
      </ul>

      <p>
        All are the same physics — Maxwell's equations — at
        different frequencies. The quantum picture (next module)
        adds: each EM wave is also a stream of photons of energy{" "}
        <InlineMath math="E = h \nu" />. Higher-frequency waves
        have more energetic photons; that's why X-rays are
        harmful and radio waves aren't.
      </p>

      {/* ─────────────────────────────  PART 8  ───────────────────────────── */}
      <h2>Part 8 · Why this matters</h2>

      <ul>
        <li>
          <strong>Special relativity.</strong> The constancy of{" "}
          <InlineMath math="c" /> in all reference frames — a
          consequence of Maxwell's equations being the same in all
          frames — was the puzzle Einstein solved with special
          relativity in 1905. EM led to relativity.
        </li>
        <li>
          <strong>Quantum electrodynamics (QED).</strong> Maxwell's
          equations are the classical limit of QED, the quantum
          theory of light and electrons. QED is the most
          accurately tested physical theory ever (12 decimal
          places agreement between theory and experiment for the
          electron magnetic moment).
        </li>
        <li>
          <strong>Modern technology.</strong> Lasers, fibre
          optics, MRI, GPS, every wireless protocol —
          electromagnetism is the working knowledge of every
          electrical engineer and many physicists.
        </li>
        <li>
          <strong>Gauge theory framework.</strong> EM is the
          prototype of all gauge theories. The Standard Model's{" "}
          <InlineMath math="SU(2) \times U(1)" /> electroweak
          theory and{" "}
          <InlineMath math="SU(3)" /> chromodynamics are
          generalisations.
        </li>
        <li>
          <strong>Quantum mechanics.</strong> Many of the early
          QM puzzles — black-body radiation, photoelectric effect,
          Compton scattering, atomic spectra — were about the
          interaction of light with matter. Resolving them
          required quantising electromagnetism. We meet these
          puzzles in the QM-I module.
        </li>
      </ul>

      <p>
        Next chapter: waves more generally. Maxwell's equations
        give us light specifically, but the wave equation arises
        in many contexts — sound, water waves, vibrations. We'll
        develop the general theory.
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
      "Maxwell's equation for $\\nabla \\cdot \\mathbf{E}$ in vacuum (no charges) is…",
    options: [
      "$\\nabla \\cdot \\mathbf{E} = 1$",
      "$\\nabla \\cdot \\mathbf{E} = 0$",
      "$\\nabla \\cdot \\mathbf{E} = c$",
      "$\\nabla \\cdot \\mathbf{E} = \\rho/\\varepsilon_0$ — and in vacuum $\\rho = 0$ so it's 0",
    ],
    correct: 3,
    explanation:
      "Gauss's law: $\\nabla \\cdot \\mathbf{E} = \\rho/\\varepsilon_0$. In vacuum $\\rho = 0$ so the divergence vanishes.",
  },
  {
    prompt:
      "Which equation tells us there are no magnetic monopoles?",
    options: [
      "$\\nabla \\cdot \\mathbf{B} = 0$",
      "$\\nabla \\times \\mathbf{B} = 0$",
      "$\\mathbf{B} = -\\nabla \\phi$",
      "$\\nabla \\times \\mathbf{E} = 0$",
    ],
    correct: 0,
    explanation:
      "The divergence of $\\mathbf{B}$ vanishes everywhere — magnetic field lines never start or end. Equivalently, no isolated magnetic 'charges' (monopoles) exist.",
  },
  {
    prompt:
      "Maxwell's correction to Ampère's law was to add…",
    options: [
      "a magnetic source term",
      "a displacement-current term $\\mu_0 \\varepsilon_0 \\, \\partial \\mathbf{E}/\\partial t$",
      "a relativistic correction",
      "a quantum correction",
    ],
    correct: 1,
    explanation:
      "The displacement current makes Ampère consistent with charge conservation. Without it, EM waves can't propagate; with it, the wave equation falls out and predicts $c = 1/\\sqrt{\\mu_0 \\varepsilon_0}$.",
  },
  {
    prompt:
      "EM waves in vacuum travel at speed…",
    options: [
      "$\\sqrt{\\mu_0 \\varepsilon_0}$",
      "$1/\\sqrt{\\mu_0 \\varepsilon_0}$",
      "varies with frequency",
      "depends on the source",
    ],
    correct: 1,
    explanation:
      "$c = 1/\\sqrt{\\mu_0 \\varepsilon_0} \\approx 3 \\times 10^8$ m/s. All frequencies travel at the same speed in vacuum (only in vacuum — dispersion is real in media).",
  },
  {
    prompt:
      "EM waves are 'transverse' meaning…",
    options: [
      "they oscillate along the propagation direction",
      "$\\mathbf{E}$ and $\\mathbf{B}$ are perpendicular to the propagation direction (and to each other)",
      "they have constant amplitude",
      "they only travel in vacuum",
    ],
    correct: 1,
    explanation:
      "$\\mathbf{E}, \\mathbf{B}$, and the propagation direction $\\hat{\\mathbf{k}}$ are mutually orthogonal. Compare with sound (longitudinal, oscillates along propagation).",
  },
];
