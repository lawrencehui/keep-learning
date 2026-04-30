import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function VectorCalcBody() {
  return (
    <>
      <p>
        Vector calculus is the language physics speaks. Electric and
        magnetic fields are <em>vector fields</em>, fluid velocity is a
        vector field, gravitational force on a planet is a vector
        field. The three operations of this chapter — gradient,{" "}
        divergence, curl — are the local geometry of those fields.
        And the three theorems — Green, Stokes, divergence — relate
        what happens inside a region to what happens on its boundary,
        generalising the Fundamental Theorem of Calculus to higher
        dimensions.
      </p>
      <p>
        We've met the gradient already (last chapter). This chapter
        adds <strong>divergence</strong> ("how much the field is
        spreading out") and <strong>curl</strong> ("how much the field
        is rotating"), both built from partial derivatives. With
        these, Maxwell's equations of electromagnetism collapse to
        four lines. Vector calculus is one of those subjects where
        the difficulty isn't in the calculations — it's in seeing
        how the same idea wears different masks across analysis,
        physics, and topology.
      </p>

      <ReferenceResources
        items={[
          {
            title: "MIT 18.02 — lectures 25–35 (vector fields, Stokes, etc.)",
            author: "Prof. Denis Auroux (MIT OCW)",
            duration: "~12h",
            url: "https://ocw.mit.edu/courses/18-02-multivariable-calculus-fall-2007/",
            note: "The vector calculus half of MIT 18.02. Auroux's flux and curl lectures are the high point of the course.",
          },
          {
            title: "3Blue1Brown — Divergence and curl",
            author: "3Blue1Brown",
            duration: "15 min",
            url: "https://www.youtube.com/watch?v=rB83DpBJQsE",
            note: "The animated intuition for what divergence and curl actually measure. Watch this.",
          },
          {
            title: "Khan Academy — Vector calculus (Sanderson)",
            author: "Grant Sanderson for Khan Academy",
            duration: "~8h",
            url: "https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives",
            note: "Long-form intuition videos for div, curl, line integrals, and the big theorems.",
          },
          {
            title: "div, grad, curl, and all that",
            author: "H.M. Schey",
            duration: "Reading (~200 pages)",
            url: "https://www.amazon.com/div-grad-curl-all-that/dp/0393925161",
            note: "The classic short book. Builds vector calculus from a physics standpoint with electromagnetism in mind.",
          },
          {
            title: "Stokes' theorem (full series)",
            author: "Khan Academy",
            duration: "varies",
            url: "https://www.khanacademy.org/math/multivariable-calculus/greens-theorem-and-stokes-theorem",
            note: "Hands-on practice with Green / Stokes / divergence theorem.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Vector fields</h2>

      <p>
        A <strong>vector field</strong> on{" "}
        <InlineMath math="\mathbb{R}^n" /> is a function{" "}
        <InlineMath math="\mathbf{F} : \mathbb{R}^n \to \mathbb{R}^n" />{" "}
        — at every point, a vector. Concrete examples:
      </p>
      <ul>
        <li>
          <strong>Velocity field of a fluid.</strong>{" "}
          <InlineMath math="\mathbf{v}(x, y, z)" /> tells you the
          velocity at each point of the fluid.
        </li>
        <li>
          <strong>Gravitational field.</strong>{" "}
          <InlineMath math="\mathbf{g}(x, y, z)" /> is the
          acceleration a test mass would feel at{" "}
          <InlineMath math="(x, y, z)" />.
        </li>
        <li>
          <strong>Electric field.</strong>{" "}
          <InlineMath math="\mathbf{E}(x, y, z)" /> from a
          configuration of charges.
        </li>
        <li>
          <strong>Gradient field.</strong> Given any scalar function{" "}
          <InlineMath math="f" />, the gradient{" "}
          <InlineMath math="\nabla f" /> is itself a vector field.
        </li>
      </ul>

      <p>
        We visualise a 2D vector field by placing arrows at a grid of
        points; the arrow at <InlineMath math="(x, y)" /> has tail at
        that point and represents the value{" "}
        <InlineMath math="\mathbf{F}(x, y)" />. The widget below lets
        you switch among a few canonical fields.
      </p>

      <VectorFieldWidget />

      <h3>Conservative fields</h3>
      <p>
        A vector field <InlineMath math="\mathbf{F}" /> is{" "}
        <strong>conservative</strong> (or <em>exact</em>) if it equals
        the gradient of some scalar function:{" "}
        <InlineMath math="\mathbf{F} = \nabla \phi" />. The function{" "}
        <InlineMath math="\phi" /> is called a{" "}
        <em>potential</em> for <InlineMath math="\mathbf{F}" />.
      </p>
      <p>
        Conservative fields are special. Two test conditions for
        conservativeness on a simply-connected domain:
      </p>
      <ul>
        <li>
          In 2D:{" "}
          <InlineMath math="\partial F_2/\partial x = \partial F_1/\partial y" />.
        </li>
        <li>
          In 3D: <InlineMath math="\nabla \times \mathbf{F} = \mathbf{0}" />{" "}
          (curl is zero — Part 4).
        </li>
      </ul>
      <p>
        Conservative fields underlie most of physics — gravity (
        potential <InlineMath math="\phi = -GM/r" />), electrostatics
        (potential <InlineMath math="\phi = kQ/r" />), and any{" "}
        time-independent force law derived from a potential. The{" "}
        <em>fundamental theorem for line integrals</em> (Part 3) is
        the reason these matter.
      </p>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Line integrals</h2>

      <p>
        Given a curve <InlineMath math="C" /> and a function or
        field defined on it, two flavours of line integral:
      </p>

      <h3>Of a scalar field</h3>
      <p>
        <InlineMath math="\int_C f\,ds" /> integrates{" "}
        <InlineMath math="f" /> with respect to arc length. If{" "}
        <InlineMath math="f" /> is a linear mass density along a wire,
        this is the total mass.
      </p>
      <p>
        Parameterise the curve as{" "}
        <InlineMath math="\mathbf{r}(t)" /> for{" "}
        <InlineMath math="t \in [a, b]" />. Then{" "}
        <InlineMath math="ds = \|\mathbf{r}'(t)\|\,dt" />, and
      </p>
      <BlockMath math="\int_C f\,ds = \int_a^b f(\mathbf{r}(t)) \, \|\mathbf{r}'(t)\|\,dt." />

      <h3>Of a vector field (work done)</h3>
      <p>
        <InlineMath math="\int_C \mathbf{F} \cdot d\mathbf{r}" /> is
        the integral of the tangential component of{" "}
        <InlineMath math="\mathbf{F}" /> along{" "}
        <InlineMath math="C" />. If <InlineMath math="\mathbf{F}" /> is
        a force, this is the <em>work</em> done by the force as a
        particle traverses the curve.
      </p>
      <BlockMath math="\int_C \mathbf{F} \cdot d\mathbf{r} = \int_a^b \mathbf{F}(\mathbf{r}(t)) \cdot \mathbf{r}'(t)\,dt." />

      <h3>The fundamental theorem for line integrals</h3>

      <Callout title="Theorem">
        If <InlineMath math="\mathbf{F} = \nabla \phi" /> is
        conservative, then for any curve <InlineMath math="C" /> from{" "}
        <InlineMath math="\mathbf{a}" /> to <InlineMath math="\mathbf{b}" />,
        <BlockMath math="\int_C \mathbf{F} \cdot d\mathbf{r} = \phi(\mathbf{b}) - \phi(\mathbf{a})." />
        The integral depends only on the endpoints, not the path.
      </Callout>

      <p>
        This is the multivariable analogue of FTC Part II:{" "}
        <InlineMath math="\int_a^b f'\,dx = f(b) - f(a)" />. It says
        conservative line integrals are <em>path-independent</em>.
      </p>
      <p>
        Energy conservation in physics is exactly this. The work done
        by gravity moving an object from A to B is{" "}
        <InlineMath math="\phi_A - \phi_B" /> (negative the change in
        potential energy), regardless of the path. That's why "the
        gravitational potential energy at altitude{" "}
        <InlineMath math="h" /> is <InlineMath math="mgh" />" makes
        sense without specifying how you got there.
      </p>

      <Exercise
        number="2.1"
        prompt={
          <>
            Compute{" "}
            <InlineMath math="\int_C \mathbf{F} \cdot d\mathbf{r}" />{" "}
            where <InlineMath math="\mathbf{F} = (y, x)" /> and{" "}
            <InlineMath math="C" /> is the line segment from{" "}
            <InlineMath math="(0, 0)" /> to <InlineMath math="(1, 2)" />
            .
          </>
        }
      >
        <p>
          Notice <InlineMath math="\mathbf{F} = \nabla(xy)" /> — it's
          conservative with potential{" "}
          <InlineMath math="\phi = xy" />. By the fundamental theorem,
          the line integral is{" "}
          <InlineMath math="\phi(1, 2) - \phi(0, 0) = 2 - 0 = 2" />,
          regardless of the path. ∎
        </p>
        <p>
          Sanity check by direct computation: parameterise{" "}
          <InlineMath math="\mathbf{r}(t) = (t, 2t)" />,{" "}
          <InlineMath math="t \in [0, 1]" />.{" "}
          <InlineMath math="\mathbf{F}(t, 2t) = (2t, t)" />,{" "}
          <InlineMath math="\mathbf{r}'(t) = (1, 2)" />, dot product{" "}
          <InlineMath math="2t + 2t = 4t" />. Integrate{" "}
          <InlineMath math="\int_0^1 4t\,dt = 2" /> ✓.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Divergence</h2>

      <p>
        For a vector field{" "}
        <InlineMath math="\mathbf{F} = (F_1, F_2, F_3)" />, the{" "}
        <strong>divergence</strong> is the scalar
      </p>
      <BlockMath math="\nabla \cdot \mathbf{F} = \frac{\partial F_1}{\partial x} + \frac{\partial F_2}{\partial y} + \frac{\partial F_3}{\partial z}." />

      <p>
        Geometric interpretation: divergence at a point measures how
        much the field is <em>spreading out</em> there per unit
        volume. Imagine the field as a fluid velocity:
      </p>
      <ul>
        <li>
          Positive divergence at a point: a <em>source</em>. Fluid is
          being created (or appearing from nowhere) there.
        </li>
        <li>
          Negative divergence: a <em>sink</em>. Fluid is being
          destroyed (or absorbed).
        </li>
        <li>
          Zero divergence: the field is{" "}
          <em>incompressible</em> — what flows in equals what flows
          out at every point.
        </li>
      </ul>

      <p>
        Check on the radial field{" "}
        <InlineMath math="\mathbf{F}(x, y) = (x, y)" />:{" "}
        <InlineMath math="\nabla \cdot \mathbf{F} = 1 + 1 = 2" />,
        positive everywhere — fluid being created at every point. The
        rotational field <InlineMath math="(-y, x)" />:{" "}
        <InlineMath math="\nabla \cdot \mathbf{F} = 0 + 0 = 0" />,
        incompressible — pure rotation, no expansion.
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Curl</h2>

      <p>
        The <strong>curl</strong> of a 3D vector field is the vector
      </p>
      <BlockMath math="\nabla \times \mathbf{F} = \left( \frac{\partial F_3}{\partial y} - \frac{\partial F_2}{\partial z},\;\; \frac{\partial F_1}{\partial z} - \frac{\partial F_3}{\partial x},\;\; \frac{\partial F_2}{\partial x} - \frac{\partial F_1}{\partial y} \right)." />

      <p>
        Mnemonic: it's the symbolic determinant of
      </p>
      <BlockMath math="\nabla \times \mathbf{F} = \det \begin{pmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \partial_x & \partial_y & \partial_z \\ F_1 & F_2 & F_3 \end{pmatrix}." />

      <p>
        Geometric interpretation: curl measures the local rotation of
        the field. A small paddle wheel placed at a point would spin
        with angular velocity proportional to the curl there; the
        curl vector points along the axis of rotation (right-hand
        rule). Zero curl means the field is{" "}
        <em>irrotational</em> — pure flow without any local twisting.
      </p>

      <p>
        For 2D fields{" "}
        <InlineMath math="\mathbf{F} = (F_1, F_2)" />, the curl
        reduces to a single scalar (the{" "}
        <InlineMath math="\mathbf{k}" />-component):
      </p>
      <BlockMath math="(\nabla \times \mathbf{F})_z = \frac{\partial F_2}{\partial x} - \frac{\partial F_1}{\partial y}." />

      <p>
        Examples:
      </p>
      <ul>
        <li>
          <InlineMath math="\mathbf{F} = (-y, x)" /> (rotational
          field): curl is{" "}
          <InlineMath math="\partial(x)/\partial x - \partial(-y)/\partial y = 1 - (-1) = 2" />.
          Pure rotation.
        </li>
        <li>
          <InlineMath math="\mathbf{F} = (x, y)" /> (radial): curl is{" "}
          <InlineMath math="\partial y/\partial x - \partial x/\partial y = 0" />.
          No rotation.
        </li>
        <li>
          <InlineMath math="\mathbf{F} = \nabla \phi" /> (any
          gradient): curl is{" "}
          <InlineMath math="\nabla \times \nabla \phi = \mathbf{0}" /> —
          gradient fields are always irrotational. Equivalent fact:
          mixed partials commute.
        </li>
      </ul>

      <Pitfall>
        Don't conflate "irrotational" (
        <InlineMath math="\nabla \times \mathbf{F} = \mathbf{0}" />)
        with "incompressible" (
        <InlineMath math="\nabla \cdot \mathbf{F} = 0" />). They are
        independent: a field can be one, both, or neither. The
        purely-rotational <InlineMath math="(-y, x)" /> is
        incompressible but not irrotational; a uniform field{" "}
        <InlineMath math="(1, 0)" /> is both; a radial field{" "}
        <InlineMath math="(x, y)" /> is irrotational but not
        incompressible.
      </Pitfall>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · The big three theorems</h2>

      <p>
        Three theorems sit at the apex of multivariable calculus.
        Each generalises FTC II:{" "}
        <em>integral over a region</em> ={" "}
        <em>boundary evaluation</em>. Read them in order — they're
        progressively higher-dimensional versions of the same idea.
      </p>

      <h3>Green's theorem (2D)</h3>

      <Callout title="Green's theorem">
        Let <InlineMath math="C" /> be a positively-oriented,
        piecewise-smooth, simple closed curve in the plane bounding a
        region <InlineMath math="D" />. For continuously
        differentiable <InlineMath math="\mathbf{F} = (P, Q)" />,
        <BlockMath math="\oint_C P\,dx + Q\,dy = \iint_D \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right)\,dA." />
      </Callout>

      <p>
        Left side: line integral around the boundary. Right side:
        double integral of the (2D) curl over the enclosed region.
        "Boundary integral = interior of curl."
      </p>

      <h3>Stokes' theorem (3D)</h3>

      <Callout title="Stokes' theorem">
        Let <InlineMath math="S" /> be a smooth oriented surface
        bounded by a simple closed curve{" "}
        <InlineMath math="\partial S" />, with the orientation matched
        by the right-hand rule. For{" "}
        <InlineMath math="\mathbf{F}" /> continuously differentiable,
        <BlockMath math="\oint_{\partial S} \mathbf{F} \cdot d\mathbf{r} = \iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S}." />
      </Callout>

      <p>
        Stokes is Green's theorem on a curved surface in 3D. Take{" "}
        <InlineMath math="S" /> to be a flat region in the plane and
        Stokes reduces to Green. The surface integral of the curl
        equals the line integral of the field around the surface's
        boundary.
      </p>

      <h3>Divergence theorem (Gauss's theorem)</h3>

      <Callout title="Divergence theorem">
        Let <InlineMath math="V" /> be a 3D solid bounded by a closed
        surface <InlineMath math="\partial V" /> with outward-pointing
        normal. For <InlineMath math="\mathbf{F}" /> continuously
        differentiable,
        <BlockMath math="\iiint_V (\nabla \cdot \mathbf{F})\,dV = \oiint_{\partial V} \mathbf{F} \cdot d\mathbf{S}." />
      </Callout>

      <p>
        "Volume integral of divergence equals flux through the
        boundary." Fluid being created inside a region (left side)
        must flow out through its surface (right side). It's the
        physics version of accounting.
      </p>

      <h3>The unifying picture</h3>

      <p>
        All three theorems — and FTC itself — are special cases of a
        single statement,{" "}
        <strong>the generalised Stokes theorem</strong> on{" "}
        <em>differential forms</em>:
      </p>
      <BlockMath math="\int_M d\omega = \int_{\partial M} \omega." />
      <p>
        The integral of a derivative over a region equals the
        integral of the original on the boundary. Differential
        geometry is largely the study of this identity in increasing
        levels of abstraction. We won't develop differential forms
        here — they get a chapter of their own in a later analysis or
        differential geometry course — but every theorem in this
        chapter is a face of that one.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Maxwell's equations</h2>

      <p>
        The whole of classical electromagnetism collapses to four
        equations involving div and curl. With{" "}
        <InlineMath math="\mathbf{E}" /> the electric field,{" "}
        <InlineMath math="\mathbf{B}" /> the magnetic field,{" "}
        <InlineMath math="\rho" /> the charge density and{" "}
        <InlineMath math="\mathbf{J}" /> the current density:
      </p>
      <BlockMath math="\nabla \cdot \mathbf{E} = \rho / \varepsilon_0 \quad \text{(Gauss's law)}" />
      <BlockMath math="\nabla \cdot \mathbf{B} = 0 \quad \text{(no magnetic monopoles)}" />
      <BlockMath math="\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t} \quad \text{(Faraday's law)}" />
      <BlockMath math="\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t} \quad \text{(Ampère–Maxwell)}" />

      <p>
        Read out loud:
      </p>
      <ul>
        <li>
          Electric field diverges where charge sits.
        </li>
        <li>
          Magnetic field never diverges (no isolated north pole).
        </li>
        <li>
          A changing magnetic field induces a circulating electric
          field (the curl).
        </li>
        <li>
          Currents and changing electric fields induce circulating
          magnetic fields.
        </li>
      </ul>

      <p>
        Every classical result you've ever heard about electricity and
        magnetism — Coulomb's law, the right-hand rule for solenoids,
        the speed of light, electromagnetic waves — drops out of these
        four equations plus the divergence and Stokes theorems. We'll
        unpack this in Tier XIII.
      </p>

      {/* ─────────────────────────────  PART 7  ───────────────────────────── */}
      <h2>Part 7 · Why this matters</h2>

      <ul>
        <li>
          <strong>Electromagnetism &amp; relativity.</strong> Maxwell
          packaged into vector calculus, then re-packaged into
          relativistic 4-tensors in special relativity. The classical
          theory is in this chapter.
        </li>
        <li>
          <strong>Fluid dynamics.</strong> Navier–Stokes,
          Bernoulli's equation, vorticity dynamics — all
          curl-and-divergence equations on velocity fields.
        </li>
        <li>
          <strong>Quantum mechanics &amp; gauge theory.</strong> The
          electromagnetic potential <InlineMath math="\mathbf{A}" />{" "}
          enters the Schrödinger equation as{" "}
          <InlineMath math="(\mathbf{p} - q\mathbf{A})^2" />. Gauge
          invariance — the freedom to add a gradient to{" "}
          <InlineMath math="\mathbf{A}" /> — is exactly the
          irrotationality of gradients. The Aharonov–Bohm effect, a
          purely-quantum phenomenon, exists because <em>line
          integrals</em> of <InlineMath math="\mathbf{A}" /> are
          observable even when its curl vanishes locally. Path-
          dependence in non-simply-connected regions is everywhere
          in modern physics.
        </li>
        <li>
          <strong>Differential geometry.</strong> Stokes-on-forms is
          the foundation of de Rham cohomology, characteristic
          classes, the Gauss–Bonnet theorem, Chern–Simons theory.
          This chapter is the entry point.
        </li>
        <li>
          <strong>Probability &amp; PDE.</strong> The continuity
          equation{" "}
          <InlineMath math="\partial \rho / \partial t + \nabla \cdot (\rho \mathbf{v}) = 0" />{" "}
          governs probability mass, charge, mass. The heat equation,
          wave equation, and Schrödinger equation are all PDEs whose
          structure is multivariable calculus.
        </li>
      </ul>

      <p>
        That closes Tier IV. The next module — Differential Equations
        — applies the calculus we've now built to dynamical problems,
        and after that we'll get into the deeper math (number theory,
        probability, complex analysis) and the physics tiers where
        the journey towards quantum begins in earnest.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Widget: vector field
// ════════════════════════════════════════════════════════════

type Field = "rotational" | "radial" | "shear" | "saddle" | "uniform" | "vortex";

const fields: Record<Field, { F: (x: number, y: number) => { x: number; y: number }; label: string; div: string; curl: string }> = {
  rotational: {
    F: (x, y) => ({ x: -y, y: x }),
    label: "(-y, x)",
    div: "0",
    curl: "2",
  },
  radial: {
    F: (x, y) => ({ x, y }),
    label: "(x, y)",
    div: "2",
    curl: "0",
  },
  shear: {
    F: (_x, y) => ({ x: y, y: 0 }),
    label: "(y, 0)",
    div: "0",
    curl: "-1",
  },
  saddle: {
    F: (x, y) => ({ x, y: -y }),
    label: "(x, -y)",
    div: "0",
    curl: "0",
  },
  uniform: {
    F: () => ({ x: 1, y: 0.3 }),
    label: "(1, 0.3)",
    div: "0",
    curl: "0",
  },
  vortex: {
    F: (x, y) => {
      const r2 = x * x + y * y + 0.01;
      return { x: -y / r2, y: x / r2 };
    },
    label: "(-y/r², x/r²)",
    div: "0",
    curl: "0 (away from origin)",
  },
};

function VectorFieldWidget() {
  const [key, setKey] = useState<Field>("rotational");
  const f = fields[key];

  const w = 360;
  const h = 280;
  const cx = w / 2;
  const cy = h / 2;
  const N = 11;
  const span = 5;
  const cell = (w / N);

  const arrows: { x: number; y: number; vx: number; vy: number }[] = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < Math.floor((h / w) * N); j++) {
      const x = -span / 2 + ((span * i) / (N - 1));
      const y = -span * (h / w) / 2 + (span * (h / w) * j) / Math.max(1, Math.floor((h / w) * N) - 1);
      const v = f.F(x, y);
      arrows.push({ x, y, vx: v.x, vy: v.y });
    }
  }

  const sx = (x: number) => cx + (x / span) * w;
  const sy = (y: number) => cy - (y / span) * w;

  // Normalize arrows by scaling to a max length of cell*0.8
  const maxLen = Math.max(...arrows.map((a) => Math.sqrt(a.vx * a.vx + a.vy * a.vy)), 0.001);
  const arrowScale = (cell * 0.85) / maxLen;

  return (
    <figure className="not-italic">
      <div className="card p-4 sm:p-5 my-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(fields) as Field[]).map((k) => (
            <button
              key={k}
              onClick={() => setKey(k)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition font-mono ${
                key === k
                  ? "border-accent-soft bg-ink-800 text-ink-50"
                  : "border-ink-800 hover:border-ink-700 text-ink-300"
              }`}
            >
              {fields[k].label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
            <line x1={0} y1={cy} x2={w} y2={cy} stroke="#2a2a37" strokeWidth={0.5} />
            <line x1={cx} y1={0} x2={cx} y2={h} stroke="#2a2a37" strokeWidth={0.5} />

            {arrows.map((a, i) => {
              const x1 = sx(a.x);
              const y1 = sy(a.y);
              const x2 = x1 + a.vx * arrowScale;
              const y2 = y1 - a.vy * arrowScale;
              return (
                <FieldArrow key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
              );
            })}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Stat label="∇ · F (divergence)" value={f.div} />
          <Stat label="curl (∇ × F)·k̂" value={f.curl} />
        </div>
      </div>
      <figcaption>
        Sample arrows on a grid. Switch fields and watch the
        characteristic shape — radial (sources), rotational (vortex),
        shear, saddle, uniform, and a singular point vortex.
      </figcaption>
    </figure>
  );
}

function FieldArrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return null;
  const ux = dx / len;
  const uy = dy / len;
  const headLen = Math.min(5, len / 2);
  const headW = 2.5;
  const tipBackX = x2 - ux * headLen;
  const tipBackY = y2 - uy * headLen;
  const px = -uy;
  const py = ux;
  const intensity = Math.min(1, len / 30);
  const stroke = `hsl(${280 - intensity * 90}, 70%, ${50 + intensity * 20}%)`;
  return (
    <g stroke={stroke} fill={stroke}>
      <line x1={x1} y1={y1} x2={tipBackX} y2={tipBackY} strokeWidth={1.2} />
      <polygon
        points={`${x2},${y2} ${tipBackX + px * headW},${tipBackY + py * headW} ${tipBackX - px * headW},${tipBackY - py * headW}`}
      />
    </g>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ink-800/60 border border-ink-800 px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-ink-500">{label}</div>
      <div className="font-mono text-ink-100 mt-0.5">{value}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt:
      "What does $\\nabla \\cdot \\mathbf{F}$ measure at a point?",
    options: [
      "The rotation rate of the field there",
      "The flux per unit volume — sources (positive) and sinks (negative)",
      "The magnitude of the field at that point",
      "Whether the field is conservative",
    ],
    correct: 1,
    explanation:
      "Divergence is the local 'spreading-out rate' — net outflow per unit volume. Positive at sources, negative at sinks, zero for incompressible fields.",
  },
  {
    prompt:
      "For the field $\\mathbf{F}(x, y) = (-y, x)$, the (z-component of) curl is…",
    options: ["0", "1", "2", "$x + y$"],
    correct: 2,
    explanation:
      "$\\partial_x(x) - \\partial_y(-y) = 1 - (-1) = 2$. The field is purely rotational with constant angular velocity 1, so curl is $2 \\omega = 2$.",
  },
  {
    prompt:
      "If $\\mathbf{F} = \\nabla \\phi$ is a gradient field, then…",
    options: [
      "$\\nabla \\cdot \\mathbf{F} = 0$",
      "$\\nabla \\times \\mathbf{F} = \\mathbf{0}$",
      "$\\nabla \\phi = \\mathbf{0}$",
      "$\\phi$ is constant",
    ],
    correct: 1,
    explanation:
      "Curl of a gradient is always zero ($\\nabla \\times \\nabla \\phi = \\mathbf{0}$), because mixed partials commute. This is why gradient fields are 'irrotational'.",
  },
  {
    prompt:
      "Stokes' theorem relates a surface integral over $S$ to…",
    options: [
      "a volume integral inside $S$",
      "a line integral around the boundary $\\partial S$",
      "the divergence of the field",
      "the area of $S$",
    ],
    correct: 1,
    explanation:
      "Stokes: $\\oint_{\\partial S} \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{S}$. Boundary line integral = surface integral of curl.",
  },
  {
    prompt:
      "By the divergence theorem, the total outward flux of $\\mathbf{F} = (x, y, z)$ through the unit sphere equals…",
    options: [
      "$0$",
      "$4\\pi$",
      "$\\pi$",
      "$4\\pi/3$",
    ],
    correct: 1,
    explanation:
      "$\\nabla \\cdot \\mathbf{F} = 3$, so by divergence theorem the flux is $\\iiint 3\\,dV = 3 \\cdot (4\\pi/3) = 4\\pi$. The field expands at rate 3 inside a ball of volume $4\\pi/3$.",
  },
];
