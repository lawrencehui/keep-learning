import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function ResiduesBody() {
  return (
    <>
      <p>
        The residue theorem turns contour integrals into algebraic
        sums. To integrate around a closed curve, you don't actually
        integrate — you find the singularities of the integrand inside
        the curve, compute a single complex number (the{" "}
        <em>residue</em>) at each, and sum. The technique then bends
        backward to compute <em>real</em> integrals: many definite
        integrals on the real line that have no elementary
        antiderivative succumb to a clever choice of contour in the
        complex plane.
      </p>
      <p>
        We end the complex analysis module with a tour of this
        machinery, then sketch how the same ideas underlie the Fourier
        transform — a transform that quantum mechanics, signal
        processing, and number theory rely on equally.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.04 — lectures 15–22 (Laurent, residues, real integrals)",
            author: "Prof. Jeremy Orloff (MIT OCW)",
            duration: "~7h",
            url: "https://ocw.mit.edu/courses/18-04-complex-variables-with-applications-spring-2018/",
            note: "Last third of the canonical complex variables course.",
          },
          {
            title: "Residue calculus in 5 minutes",
            author: "various YouTube",
            duration: "5–15 min each",
            url: "https://www.youtube.com/results?search_query=residue+theorem+visualized",
            note: "Many short videos cover the technique with worked examples.",
          },
          {
            title: "Stein &amp; Shakarchi — chs. 3–4",
            author: "Stein / Shakarchi",
            duration: "Reading",
            url: "https://press.princeton.edu/books/hardcover/9780691113852/complex-analysis",
            note: "Rigorous treatment of Laurent expansions and residues.",
          },
          {
            title: "Visual Complex Analysis — chs. 11–12",
            author: "Tristan Needham",
            duration: "Reading",
            url: "https://www.amazon.com/Visual-Complex-Analysis-25th-Anniversary/dp/0192868926",
            note: "Geometric meaning of residues and winding numbers.",
          },
          {
            title: "But what is the Fourier transform? (3Blue1Brown)",
            author: "3Blue1Brown",
            duration: "20 min",
            url: "https://www.youtube.com/watch?v=spUNpyF58BY",
            note: "Pair with Part 6.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Laurent series</h2>

      <p>
        Holomorphic functions equal their Taylor series in a disc
        around any point. But what about a function with a singularity
        at <InlineMath math="z_0" /> — say{" "}
        <InlineMath math="1/z" /> at the origin? It's not holomorphic
        at <InlineMath math="z_0" />, so no Taylor series. Still, on an
        annulus around <InlineMath math="z_0" />, we can expand:
      </p>

      <Callout title="Laurent series">
        Let <InlineMath math="f" /> be holomorphic on an annulus{" "}
        <InlineMath math="r < |z - z_0| < R" />. Then on that annulus,
        <BlockMath math="f(z) = \sum_{n = -\infty}^{\infty} a_n (z - z_0)^n," />
        with coefficients
        <BlockMath math="a_n = \frac{1}{2\pi i} \oint \frac{f(z)}{(z - z_0)^{n+1}} \, dz" />
        on any contour winding once CCW around{" "}
        <InlineMath math="z_0" /> in the annulus.
      </Callout>

      <p>
        The series has both positive and negative powers. The positive
        part is the "regular" part (Taylor-like); the negative part is
        the "principal" part — the new information about the
        singularity.
      </p>

      <p>
        Examples around <InlineMath math="z_0 = 0" />:
      </p>
      <ul>
        <li>
          <InlineMath math="f(z) = 1/z" />: Laurent series is just{" "}
          <InlineMath math="z^{-1}" />. Coefficient of{" "}
          <InlineMath math="z^{-1}" /> is 1.
        </li>
        <li>
          <InlineMath math="f(z) = e^{1/z}" />:{" "}
          <InlineMath math="\sum 1/(n! z^n) = 1 + 1/z + 1/(2! z^2) + \cdots" />.
          Infinitely many negative-power terms.
        </li>
        <li>
          <InlineMath math="f(z) = \sin z / z^3" />:{" "}
          <InlineMath math="(z - z^3/6 + z^5/120 - \cdots) / z^3 = 1/z^2 - 1/6 + z^2/120 - \cdots" />.
          Two negative-power terms, then regular.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Classification of singularities</h2>

      <p>
        Suppose <InlineMath math="f" /> is holomorphic on a punctured
        neighbourhood of <InlineMath math="z_0" /> (i.e. in some disc
        around <InlineMath math="z_0" /> with the centre removed).
        Looking at its Laurent series there:
      </p>

      <ul>
        <li>
          <strong>Removable singularity:</strong> all{" "}
          <InlineMath math="a_n = 0" /> for{" "}
          <InlineMath math="n < 0" />. The series is just a Taylor
          series; you can extend <InlineMath math="f" /> continuously
          to <InlineMath math="z_0" /> by setting{" "}
          <InlineMath math="f(z_0) = a_0" />, and then it's holomorphic
          there. Example: <InlineMath math="\sin z / z" /> at{" "}
          <InlineMath math="z = 0" />.
        </li>
        <li>
          <strong>Pole of order <InlineMath math="N" />:</strong>{" "}
          finitely many negative-power terms, with{" "}
          <InlineMath math="a_{-N} \neq 0" /> and{" "}
          <InlineMath math="a_n = 0" /> for{" "}
          <InlineMath math="n < -N" />. Equivalently,{" "}
          <InlineMath math="(z - z_0)^N f(z)" /> has a removable
          singularity (becomes holomorphic). Example:{" "}
          <InlineMath math="1/z^3" /> has a pole of order 3 at 0.
        </li>
        <li>
          <strong>Essential singularity:</strong> infinitely many
          negative-power terms. Example:{" "}
          <InlineMath math="e^{1/z}" /> at <InlineMath math="z = 0" />.
          Behaviour near such points is wild — by{" "}
          <em>Picard's theorem</em>, in any neighbourhood of an
          essential singularity, the function takes every complex
          value (with at most one exception) infinitely often.
        </li>
      </ul>

      <Pitfall>
        At an essential singularity the function is genuinely
        pathological. Even the limit{" "}
        <InlineMath math="\lim_{z \to z_0} f(z)" /> doesn't exist in
        any reasonable sense. Quantum-field-theoretic non-perturbative
        effects often correspond to essential singularities in
        coupling-constant expansions — they're invisible to all orders
        of perturbation theory.
      </Pitfall>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Residues</h2>

      <p>
        The <strong>residue</strong> of <InlineMath math="f" /> at an
        isolated singularity <InlineMath math="z_0" /> is the
        coefficient of <InlineMath math="(z - z_0)^{-1}" /> in the
        Laurent series:
      </p>
      <BlockMath math="\operatorname{Res}_{z_0} f = a_{-1}." />

      <p>
        Why this single coefficient? From Cauchy's formula and Laurent
        coefficients:
      </p>
      <BlockMath math="a_{-1} = \frac{1}{2\pi i} \oint f(z) \, dz \;\;\Rightarrow\;\; \oint f(z) \, dz = 2\pi i \operatorname{Res}_{z_0} f" />

      <p>
        on a small circle around <InlineMath math="z_0" />. The
        residue is exactly the contour integral, up to{" "}
        <InlineMath math="2\pi i" />.
      </p>

      <h3>Computing residues</h3>

      <p>
        For simple poles (order 1):{" "}
        <InlineMath math="f(z) = g(z) / (z - z_0)" /> with{" "}
        <InlineMath math="g(z_0) \neq 0" /> and{" "}
        <InlineMath math="g" /> holomorphic. Then
      </p>
      <BlockMath math="\operatorname{Res}_{z_0} f = \lim_{z \to z_0} (z - z_0) f(z) = g(z_0)." />

      <p>
        For poles of order <InlineMath math="N" />:
      </p>
      <BlockMath math="\operatorname{Res}_{z_0} f = \frac{1}{(N-1)!} \lim_{z \to z_0} \frac{d^{N-1}}{dz^{N-1}} \bigl[ (z - z_0)^N f(z) \bigr]." />

      <p>
        Or for{" "}
        <InlineMath math="f = p/q" /> with{" "}
        <InlineMath math="p(z_0) \neq 0" />,{" "}
        <InlineMath math="q(z_0) = 0" />,{" "}
        <InlineMath math="q'(z_0) \neq 0" /> (a simple zero of{" "}
        <InlineMath math="q" />):{" "}
        <InlineMath math="\operatorname{Res}_{z_0} (p/q) = p(z_0) / q'(z_0)" />.
        Useful for polynomial denominators.
      </p>

      <h3>Worked examples</h3>

      <p>
        <InlineMath math="\operatorname{Res}_0 (1/z) = 1" />.
      </p>

      <p>
        <InlineMath math="\operatorname{Res}_0 (\sin z / z^4)" />:{" "}
        <InlineMath math="\sin z / z^4 = 1/z^3 - 1/(6z) + z/120 - \cdots" />.
        Coefficient of <InlineMath math="z^{-1}" /> is{" "}
        <InlineMath math="-1/6" />. So the residue is{" "}
        <InlineMath math="-1/6" />.
      </p>

      <p>
        <InlineMath math="\operatorname{Res}_{i} (1/(z^2 + 1))" />: at{" "}
        <InlineMath math="z = i" />, factor{" "}
        <InlineMath math="(z - i)(z + i)" />. Simple pole formula:{" "}
        <InlineMath math="g(z) = 1/(z + i)" />,{" "}
        <InlineMath math="g(i) = 1/(2i)" />. Residue:{" "}
        <InlineMath math="1/(2i) = -i/2" />.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · The residue theorem</h2>

      <Callout title="Residue theorem">
        Let <InlineMath math="f" /> be holomorphic on a domain except
        at isolated singularities, and let{" "}
        <InlineMath math="\gamma" /> be a positively-oriented simple
        closed contour in the domain enclosing some of those
        singularities. Then
        <BlockMath math="\oint_\gamma f(z) \, dz = 2\pi i \sum_{z_k \text{ inside } \gamma} \operatorname{Res}_{z_k} f." />
      </Callout>

      <p>
        That's it. To compute a contour integral, find singularities
        inside, sum their residues, multiply by <InlineMath math="2\pi i" />.
        No actual integration required.
      </p>

      <p>
        Proof: deform <InlineMath math="\gamma" /> into a sum of
        small circles, one around each interior singularity. By
        Cauchy's theorem the deformation doesn't change the integral,
        and around each small circle the integral is{" "}
        <InlineMath math="2\pi i" /> times the residue (Part 3). ∎
      </p>

      <h3>Worked example</h3>

      <p>
        Compute{" "}
        <InlineMath math="\oint_\gamma e^z / z^3 \, dz" /> on{" "}
        <InlineMath math="\gamma : |z| = 1" />, CCW.
      </p>

      <p>
        Singularity at <InlineMath math="z = 0" /> (a triple pole).
        Laurent:{" "}
        <InlineMath math="e^z / z^3 = (1 + z + z^2/2 + z^3/6 + \cdots)/z^3 = 1/z^3 + 1/z^2 + 1/(2z) + \cdots" />.
        Coefficient of <InlineMath math="z^{-1}" /> is{" "}
        <InlineMath math="1/2" />. Residue{" "}
        <InlineMath math="= 1/2" />. By the residue theorem:
      </p>
      <BlockMath math="\oint e^z / z^3 \, dz = 2\pi i \cdot \tfrac{1}{2} = \pi i." />

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Real integrals via residues</h2>

      <p>
        Many real-line integrals that have no elementary antiderivative
        succumb to residues. The technique: extend the integrand to
        the complex plane, choose a contour that includes the real
        axis as part of its boundary, then evaluate the contour
        integral using residues.
      </p>

      <h3>Example 1: rational function</h3>

      <p>
        Compute{" "}
        <InlineMath math="\displaystyle \int_{-\infty}^{\infty} \frac{1}{x^2 + 1} \, dx" />.
      </p>

      <p>
        We know the answer is <InlineMath math="\pi" /> (arctan
        evaluation). Re-derive via residues. Consider the contour:
        upper-half-plane semicircle of radius{" "}
        <InlineMath math="R" />, going along the real axis from{" "}
        <InlineMath math="-R" /> to <InlineMath math="R" /> then back
        along the arc.
      </p>

      <p>
        Inside this contour: the simple pole of{" "}
        <InlineMath math="1/(z^2 + 1)" /> at <InlineMath math="z = i" /> (
        the other pole, <InlineMath math="-i" />, is in the lower
        half-plane). Residue at <InlineMath math="i" /> is{" "}
        <InlineMath math="-i/2" /> (computed earlier).
      </p>

      <p>
        So the contour integral is{" "}
        <InlineMath math="2\pi i \cdot (-i/2) = \pi" />.
      </p>

      <p>
        As <InlineMath math="R \to \infty" />, the arc-integral
        vanishes (integrand decays like{" "}
        <InlineMath math="1/R^2" />, arc-length{" "}
        <InlineMath math="\pi R" />, product → 0). So the real-axis
        integral equals the full contour integral:
      </p>
      <BlockMath math="\int_{-\infty}^{\infty} \frac{1}{x^2 + 1} \, dx = \pi." />

      <h3>Example 2: trig × rational</h3>

      <p>
        Compute{" "}
        <InlineMath math="\displaystyle \int_{-\infty}^{\infty} \frac{\cos x}{x^2 + 1} \, dx" />.
      </p>

      <p>
        Direct integration is hopeless. Trick: replace{" "}
        <InlineMath math="\cos x" /> with the real part of{" "}
        <InlineMath math="e^{ix}" />, integrate{" "}
        <InlineMath math="e^{iz}/(z^2 + 1)" /> over the same upper
        semicircle. The integrand decays in the upper half-plane (
        <InlineMath math="|e^{iz}| = e^{-y} \to 0" /> as{" "}
        <InlineMath math="y \to \infty" />), so the arc-integral
        vanishes (Jordan's lemma).
      </p>

      <p>
        Pole at <InlineMath math="z = i" /> with residue{" "}
        <InlineMath math="e^{i \cdot i} / (2i) = e^{-1} / (2i)" />.
        Contour integral:{" "}
        <InlineMath math="2\pi i \cdot e^{-1}/(2i) = \pi / e" />.
        Taking real part:
      </p>
      <BlockMath math="\int_{-\infty}^{\infty} \frac{\cos x}{x^2 + 1} \, dx = \frac{\pi}{e}." />

      <p>
        That's a closed form for an integral with no elementary
        antiderivative. Residues are the right tool.
      </p>

      <h3>Example 3: trigonometric integral over <InlineMath math="[0, 2\pi]" /></h3>

      <p>
        Compute{" "}
        <InlineMath math="\displaystyle \int_0^{2\pi} \frac{d\theta}{2 + \cos\theta}" />.
      </p>

      <p>
        Substitute <InlineMath math="z = e^{i\theta}" /> so{" "}
        <InlineMath math="\cos\theta = (z + 1/z)/2" /> and{" "}
        <InlineMath math="d\theta = dz/(iz)" />. The integral becomes
        a contour integral on the unit circle. After algebra, this
        reduces to a residue computation. Result:{" "}
        <InlineMath math="2\pi/\sqrt 3" />. (Worked details omitted —
        try as exercise.)
      </p>

      <Pitfall>
        Choosing the right contour is the art of the technique.
        Closing the contour in the upper half-plane works for
        integrands that decay there (most often the case). For
        integrands like <InlineMath math="\sin x / x" /> that
        oscillate rather than decay, you sometimes need indented
        contours that avoid singularities on the real axis. There's
        a small zoo of standard contours for different integrand
        types.
      </Pitfall>

      <Exercise
        number="5.1"
        prompt={
          <>
            Use residues to compute{" "}
            <InlineMath math="\displaystyle \int_{-\infty}^{\infty} \frac{1}{x^4 + 1} \, dx" />.
          </>
        }
      >
        <p>
          Roots of <InlineMath math="z^4 + 1 = 0" />:{" "}
          <InlineMath math="z = e^{i\pi(2k+1)/4}" /> for{" "}
          <InlineMath math="k = 0, 1, 2, 3" />. The two in the upper
          half-plane: <InlineMath math="e^{i\pi/4}" /> and{" "}
          <InlineMath math="e^{3i\pi/4}" />.
        </p>
        <p>
          Residue at simple zero of{" "}
          <InlineMath math="z^4 + 1" />:{" "}
          <InlineMath math="1/(4z^3) = 1/(4 e^{3i\theta})" /> where{" "}
          <InlineMath math="\theta" /> is the pole's argument.
        </p>
        <p>
          Sum: <InlineMath math="(1/(4 e^{3i\pi/4}) + 1/(4 e^{9i\pi/4}))" />.
          After algebra:{" "}
          <InlineMath math="-\sqrt 2 i/4 - \sqrt 2 i/4 = -\sqrt 2 i / 2" />.
        </p>
        <p>
          Integral:{" "}
          <InlineMath math="2\pi i \cdot (-\sqrt 2 i/2) \cdot \frac{1}{1} = \sqrt 2 \pi / 2 = \pi / \sqrt 2" />.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · The Fourier transform</h2>

      <p>
        Recall from the Fourier-PDE chapter:
      </p>
      <BlockMath math="\hat f(k) = \int_{-\infty}^{\infty} f(x) \, e^{-ikx} \, dx, \qquad f(x) = \frac{1}{2\pi} \int_{-\infty}^{\infty} \hat f(k) \, e^{ikx} \, dk." />

      <p>
        The natural way to evaluate Fourier transforms of rational
        and trig-rational functions is residue calculus, exactly the
        technique from Part 5. Standard examples drop out:
      </p>

      <ul>
        <li>
          <InlineMath math="\widehat{1/(x^2 + a^2)}(k) = (\pi/a) e^{-a|k|}" />,
          for <InlineMath math="a > 0" /> — close in upper half-plane
          for <InlineMath math="k > 0" />, lower for{" "}
          <InlineMath math="k < 0" />, residues at{" "}
          <InlineMath math="\pm ai" />.
        </li>
        <li>
          <InlineMath math="\widehat{e^{-ax^2}}(k) = \sqrt{\pi/a} \, e^{-k^2/(4a)}" />,
          for <InlineMath math="a > 0" />. Gaussians transform to
          Gaussians — the famous self-dual property. The proof uses
          contour deformation in the complex plane (shift the
          contour to dodge a square-completion).
        </li>
      </ul>

      <h3>Causality and the half-plane</h3>

      <p>
        For a "causal" signal <InlineMath math="f(t)" /> that vanishes
        for <InlineMath math="t < 0" />, the Fourier transform extends
        to a holomorphic function of <InlineMath math="\omega" /> in
        the lower half-plane (where{" "}
        <InlineMath math="e^{-i\omega t}" /> is bounded). Decaying
        signals make the function holomorphic in a wider strip. The
        location of poles determines the "modes" of the system —
        damped oscillations at complex frequencies.
      </p>

      <p>
        This is why control-theory engineers care about the Laplace
        transform's pole locations. A pole in the right half plane
        means an unstable mode (exponentially growing); poles on
        the imaginary axis are oscillating modes; poles in the left
        half plane are damped. The geometry of poles in the complex
        plane controls the time-domain behaviour.
      </p>

      <h3>Kramers–Kronig relations</h3>

      <p>
        For physical response functions (susceptibilities, dielectric
        constants, refractive indices), causality forces the
        analyticity in a half-plane mentioned above. From this and
        the residue theorem, the real and imaginary parts of the
        response are related by a Hilbert transform — the famous
        Kramers–Kronig relations. Knowing one half of the
        susceptibility forces the other half.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Quantum scattering theory.</strong> The S-matrix is a
          meromorphic function of complex energy. Bound states are
          poles on the negative real axis; resonances are complex-
          energy poles in the analytic continuation. The location of
          poles determines spectroscopy and decay rates.
        </li>
        <li>
          <strong>Quantum field theory.</strong> Feynman propagators
          have a careful{" "}
          <InlineMath math="i\varepsilon" /> prescription for placing
          poles relative to the integration contour — encoding
          causality. The Wick rotation, residue calculations of loop
          integrals, dispersion relations, all live in complex
          analysis.
        </li>
        <li>
          <strong>Engineering control.</strong> Bode plots, Nyquist
          stability criterion, Routh–Hurwitz — all about pole
          locations of transfer functions in the complex plane.
          Residues give the inverse Laplace transform partial-
          fraction expansion.
        </li>
        <li>
          <strong>Number theory &amp; Dirichlet L-functions.</strong>{" "}
          Riemann's analytic continuation of{" "}
          <InlineMath math="\zeta(s)" /> uses contour integrals and
          residue calculus. The functional equation has a residue
          interpretation. Generalisations (Dirichlet L-functions,
          Hecke L-functions) repeat the pattern.
        </li>
        <li>
          <strong>String theory &amp; CFT.</strong> Operator product
          expansions are Laurent expansions; correlation functions
          are computed by residue calculus on the world-sheet.
        </li>
      </ul>

      <p>
        That closes Module VIII. We've gone from "what's a complex
        number?" to "compute hopeless integrals by tracking residues."
        Three more math modules (IX Real Analysis, X Abstract Algebra,
        XI Advanced Linear Algebra) before we leave pure math for the
        physics journey toward quantum mechanics. Each of those gives
        another layer of formalism that quantum theory will use.
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
      "$\\sin z / z$ at $z = 0$ has what kind of singularity?",
    options: [
      "essential",
      "pole of order 1",
      "removable (the limit is 1)",
      "no singularity at all",
    ],
    correct: 2,
    explanation:
      "$\\sin z / z = 1 - z^2/6 + \\cdots$ — Taylor series with no negative powers. The singularity is removable; defining $f(0) = 1$ extends to a holomorphic function.",
  },
  {
    prompt:
      "The residue of $f$ at an isolated singularity $z_0$ is the coefficient of…",
    options: [
      "$(z - z_0)^0$",
      "$(z - z_0)^{-1}$",
      "$(z - z_0)^1$",
      "$z^{-1}$",
    ],
    correct: 1,
    explanation:
      "Residue is the coefficient $a_{-1}$ in the Laurent expansion $\\sum a_n (z - z_0)^n$. By Cauchy, $\\oint f \\, dz = 2\\pi i \\, a_{-1}$.",
  },
  {
    prompt:
      "By the residue theorem, $\\oint_\\gamma f(z) \\, dz$ for a CCW simple closed contour equals…",
    options: [
      "$\\sum_{z_k \\text{ inside}} \\operatorname{Res}_{z_k} f$",
      "$2\\pi i \\sum_{z_k \\text{ inside}} \\operatorname{Res}_{z_k} f$",
      "$2\\pi \\sum_{z_k \\text{ inside}} \\operatorname{Res}_{z_k} f$",
      "$\\int_\\gamma |f| \\, ds$",
    ],
    correct: 1,
    explanation:
      "Multiply each residue by $2\\pi i$ and sum over interior singularities.",
  },
  {
    prompt:
      "Residue of $1/(z^2 - 1)$ at $z = 1$ equals…",
    options: ["1", "1/2", "$-1/2$", "0"],
    correct: 1,
    explanation:
      "$z^2 - 1 = (z-1)(z+1)$. Residue at $z = 1$ is $1/(1+1) = 1/2$ (using simple-pole formula $g(z_0)$ with $g(z) = 1/(z+1)$).",
  },
  {
    prompt:
      "Why does residue calculus help compute $\\int_{-\\infty}^{\\infty} \\cos x / (x^2 + 1) \\, dx$?",
    options: [
      "$\\cos x$ has a Taylor series",
      "Replacing $\\cos x$ with $\\operatorname{Re} e^{ix}$ and closing the contour in the upper half-plane lets the arc-integral vanish, leaving a residue computation at $z = i$",
      "It's actually equal to 0",
      "$\\cos$ has no poles",
    ],
    correct: 1,
    explanation:
      "$|e^{iz}| = e^{-y}$ decays in the upper half-plane, so the upper-semicircle arc-integral vanishes as $R \\to \\infty$. Real-axis integral = $2\\pi i$ × residue at $z = i = \\pi/e$.",
  },
];
