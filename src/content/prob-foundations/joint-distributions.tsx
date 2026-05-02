import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function JointDistributionsBody() {
  return (
    <>
      <p>
        One random variable is a fine starter, but most
        interesting questions involve <em>several</em> at
        once. How do they vary together? When does knowing one
        tell you about another? When can we factor the joint
        distribution? This chapter develops the joint /
        marginal / conditional vocabulary, covariance and
        correlation, and the multivariate normal — the
        Gaussian's full-dimensional cousin and the workhorse
        of every "nice" statistical model.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Blitzstein & Hwang Ch 7-8",
            author: "Joe Blitzstein, Jessica Hwang",
            duration: "Reading",
            url: "https://projects.iq.harvard.edu/stat110/home",
            note: "Joint distributions, transformations, the bivariate normal in full detail.",
          },
          {
            title: "Stat 110 — Lectures 16-21",
            author: "Joe Blitzstein",
            duration: "~5h",
            url: "https://projects.iq.harvard.edu/stat110/youtube",
            note: "Joint, marginal, conditional distributions with the multivariate normal.",
          },
          {
            title: "MML Ch 6.5",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "Multivariate Gaussian — same notation as we use; foundation for Module VI's Bayesian linear regression.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Joint and marginal distributions</h2>

      <Callout title="Definitions">
        <ul>
          <li>
            <strong>Joint PMF/PDF</strong>:{" "}
            <InlineMath math="p(x, y)" /> or{" "}
            <InlineMath math="f(x, y)" /> describing the
            distribution of{" "}
            <InlineMath math="(X, Y)" /> together.
          </li>
          <li>
            <strong>Marginal</strong>: the distribution of one
            variable, obtained by summing/integrating out the
            other.
          </li>
          <li>
            <strong>Conditional</strong>:{" "}
            <InlineMath math="p(x \mid y) = p(x, y)/p(y)" />.
          </li>
        </ul>
      </Callout>

      <h3>Marginalising</h3>

      <BlockMath math="p_X(x) = \sum_y p(x, y), \qquad f_X(x) = \int f(x, y) \, dy." />

      <p>
        "Sum out the variables you don't care about." This is
        how to recover the distribution of one variable from
        a joint description.
      </p>

      <h3>Independence (joint version)</h3>

      <p>
        <InlineMath math="X" /> and{" "}
        <InlineMath math="Y" /> are independent iff{" "}
        <InlineMath math="p(x, y) = p_X(x) \, p_Y(y)" /> (or
        the analogous equation for densities).
      </p>

      <p>
        Equivalent: the joint factorises into the product of
        marginals. Failing to factorise = there's some
        information shared between{" "}
        <InlineMath math="X" /> and{" "}
        <InlineMath math="Y" />.
      </p>

      <Pitfall>
        Independence ⇒ uncorrelated, but uncorrelated does NOT
        ⇒ independent in general. The exception is jointly
        Gaussian random variables, where the two notions
        coincide. This is why so much classical statistics
        assumes Gaussianity.
      </Pitfall>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Conditional expectation</h2>

      <Callout title="Definition">
        <BlockMath math="E[Y \mid X = x] = \sum_y y \, p(y \mid x) \quad \text{or} \quad \int y \, f(y \mid x) \, dy." />
        Treating <InlineMath math="x" /> as a parameter, this
        is a function of{" "}
        <InlineMath math="x" />. As a random variable in{" "}
        <InlineMath math="X" />, write{" "}
        <InlineMath math="E[Y \mid X]" />.
      </Callout>

      <h3>Two key identities</h3>

      <Callout title="Tower / Adam / law of iterated expectation">
        <BlockMath math="E[Y] = E[E[Y \mid X]]." />
      </Callout>

      <p>
        Conditioning never changes the overall mean — it just
        decomposes the calculation. Useful when the inner
        conditional is easy to compute and the outer
        marginalisation handles the rest.
      </p>

      <Callout title="Eve's law / law of total variance">
        <BlockMath math="\mathrm{Var}(Y) = E[\mathrm{Var}(Y \mid X)] + \mathrm{Var}(E[Y \mid X])." />
      </Callout>

      <p>
        Decomposes total variance into{" "}
        <em>within-group</em> and{" "}
        <em>between-group</em> components. Critical for
        understanding R² in regression: explained variance is
        the between-group piece.
      </p>

      <h3>Best predictor under squared loss</h3>

      <p>
        The conditional mean is the function{" "}
        <InlineMath math="g(X)" /> that minimises{" "}
        <InlineMath math="E[(Y - g(X))^2]" />:
      </p>
      <BlockMath math="g^*(X) = E[Y \mid X]." />

      <p>
        That's why every supervised learning algorithm
        secretly approximates a conditional expectation.
        Linear regression: a linear approximation to{" "}
        <InlineMath math="E[Y \mid X]" />. Neural networks:
        a non-linear one. The conditional mean is the
        target.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Covariance and correlation</h2>

      <Callout title="Definitions">
        <BlockMath math="\mathrm{Cov}(X, Y) = E[(X - E[X])(Y - E[Y])] = E[XY] - E[X]E[Y]." />
        <BlockMath math="\rho(X, Y) = \frac{\mathrm{Cov}(X, Y)}{\sigma_X \sigma_Y} \in [-1, 1]." />
      </Callout>

      <p>
        Covariance is in mixed units of{" "}
        <InlineMath math="X" /> and{" "}
        <InlineMath math="Y" />; correlation is dimensionless.{" "}
        <InlineMath math="\rho = 1" /> means{" "}
        <InlineMath math="Y" /> is a positive linear function
        of <InlineMath math="X" /> almost surely.{" "}
        <InlineMath math="\rho = 0" /> means uncorrelated (
        but not necessarily independent — see the pitfall in
        Part 1).
      </p>

      <h3>Bilinearity and friends</h3>

      <ul>
        <li>
          <InlineMath math="\mathrm{Cov}(aX + b, cY + d) = ac \, \mathrm{Cov}(X, Y)" />.
        </li>
        <li>
          <InlineMath math="\mathrm{Cov}(X, X) = \mathrm{Var}(X)" />.
        </li>
        <li>
          <InlineMath math="\mathrm{Cov}\!\left(\sum a_i X_i, \sum b_j Y_j\right) = \sum_{i, j} a_i b_j \mathrm{Cov}(X_i, Y_j)" />.
        </li>
      </ul>

      <h3>Covariance matrix</h3>

      <p>
        For a random vector{" "}
        <InlineMath math="\mathbf{X} = (X_1, \dots, X_n)^T" />,
        the covariance matrix{" "}
        <InlineMath math="\Sigma" /> has entries{" "}
        <InlineMath math="\Sigma_{ij} = \mathrm{Cov}(X_i, X_j)" />.
        Equivalently{" "}
        <InlineMath math="\Sigma = E[(\mathbf{X} - \boldsymbol\mu)(\mathbf{X} - \boldsymbol\mu)^T]" />.
      </p>

      <p>
        Properties:
      </p>
      <ul>
        <li>
          Symmetric.
        </li>
        <li>
          Positive semi-definite (a quadratic-form
          interpretation:{" "}
          <InlineMath math="\mathbf{a}^T \Sigma \mathbf{a} = \mathrm{Var}(\mathbf{a}^T \mathbf{X}) \ge 0" />).
        </li>
        <li>
          Diagonal contains variances; off-diagonals
          contain covariances.
        </li>
      </ul>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · The multivariate normal</h2>

      <p>
        The most important multivariate distribution.
        Generalises the bell curve to{" "}
        <InlineMath math="\mathbb{R}^n" />.
      </p>

      <Callout title="Definition">
        <InlineMath math="\mathbf{X} \sim N(\boldsymbol\mu, \Sigma)" />{" "}
        with mean vector{" "}
        <InlineMath math="\boldsymbol\mu" /> and PSD covariance
        matrix <InlineMath math="\Sigma" /> has density:
        <BlockMath math="f(\mathbf{x}) = \frac{1}{(2\pi)^{n/2} |\Sigma|^{1/2}} \exp\!\left(-\tfrac{1}{2} (\mathbf{x} - \boldsymbol\mu)^T \Sigma^{-1} (\mathbf{x} - \boldsymbol\mu)\right)." />
      </Callout>

      <h3>Three characterising properties</h3>

      <ul>
        <li>
          <strong>Linear combinations are normal</strong>: for
          any{" "}
          <InlineMath math="\mathbf{a}" />,{" "}
          <InlineMath math="\mathbf{a}^T \mathbf{X} \sim N(\mathbf{a}^T \boldsymbol\mu, \mathbf{a}^T \Sigma \mathbf{a})" />.
        </li>
        <li>
          <strong>Marginals are normal</strong>: any subset of{" "}
          <InlineMath math="\mathbf{X}" /> is also
          multivariate normal, with the obvious mean and
          submatrix-of-<InlineMath math="\Sigma" />.
        </li>
        <li>
          <strong>Conditionals are normal</strong>: e.g.{" "}
          <InlineMath math="X_1 \mid X_2 = x_2 \sim N(\cdot, \cdot)" />{" "}
          with mean and variance computable from{" "}
          <InlineMath math="\Sigma" />'s blocks (Schur
          complement).
        </li>
      </ul>

      <p>
        These properties make the multivariate Gaussian
        analytically tractable in a way no other multivariate
        distribution is. Bayesian linear regression, Kalman
        filters, Gaussian processes — all run on these
        identities.
      </p>

      <h3>Conditional MVN formulas</h3>

      <p>
        Partition{" "}
        <InlineMath math="\mathbf{X} = (\mathbf{X}_a, \mathbf{X}_b)" />{" "}
        with corresponding partitions of{" "}
        <InlineMath math="\boldsymbol\mu" /> and{" "}
        <InlineMath math="\Sigma" />. Then{" "}
        <InlineMath math="\mathbf{X}_a \mid \mathbf{X}_b = \mathbf{x}_b" /> is normal with:
      </p>
      <BlockMath math="\boldsymbol\mu_{a \mid b} = \boldsymbol\mu_a + \Sigma_{ab} \Sigma_{bb}^{-1}(\mathbf{x}_b - \boldsymbol\mu_b)," />
      <BlockMath math="\Sigma_{a \mid b} = \Sigma_{aa} - \Sigma_{ab} \Sigma_{bb}^{-1} \Sigma_{ba}." />

      <p>
        The Schur-complement form. Memorise the structure
        (mean shifted by a regression-on-{" "}
        <InlineMath math="\mathbf{x}_b" />, covariance shrunk
        by the explained part). It will appear in Bayesian
        linear regression, Kalman filtering, and Gaussian
        process predictions.
      </p>

      <Exercise prompt="Suppose $(X, Y) \sim N(\mathbf{0}, \Sigma)$ with $\sigma_X^2 = \sigma_Y^2 = 1$ and correlation $\rho$. Find $E[Y \mid X = x]$ and $\mathrm{Var}(Y \mid X = x)$.">
        <p>
          Apply the conditional MVN formulas with{" "}
          <InlineMath math="a = Y" />,{" "}
          <InlineMath math="b = X" />,{" "}
          <InlineMath math="\Sigma_{ab} = \rho" />,{" "}
          <InlineMath math="\Sigma_{bb} = 1" />:
        </p>
        <BlockMath math="E[Y \mid X = x] = \rho x, \qquad \mathrm{Var}(Y \mid X = x) = 1 - \rho^2." />
        <p>
          The conditional mean is a linear function of{" "}
          <InlineMath math="x" /> with slope{" "}
          <InlineMath math="\rho" /> — exactly the
          population OLS regression coefficient. The
          conditional variance is the unexplained residual
          variance.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Transformations of random variables</h2>

      <p>
        If <InlineMath math="X" /> has density{" "}
        <InlineMath math="f_X" /> and{" "}
        <InlineMath math="Y = g(X)" /> with{" "}
        <InlineMath math="g" /> monotonic and differentiable,
        then{" "}
        <InlineMath math="Y" /> has density:
      </p>
      <BlockMath math="f_Y(y) = f_X(g^{-1}(y)) \, \left|\frac{d g^{-1}}{dy}\right|." />

      <p>
        Multidimensional version: replace the absolute
        derivative with the absolute Jacobian determinant.
      </p>
      <BlockMath math="f_\mathbf{Y}(\mathbf{y}) = f_\mathbf{X}(\mathbf{g}^{-1}(\mathbf{y})) \, |\det J_{\mathbf{g}^{-1}}(\mathbf{y})|." />

      <h3>Examples</h3>

      <ul>
        <li>
          If <InlineMath math="X \sim N(0, 1)" /> then{" "}
          <InlineMath math="Y = e^X \sim \mathrm{LogNormal}" />.
        </li>
        <li>
          If <InlineMath math="\mathbf{X} \sim N(\boldsymbol\mu, \Sigma)" />{" "}
          then{" "}
          <InlineMath math="A\mathbf{X} + \mathbf{b} \sim N(A\boldsymbol\mu + \mathbf{b}, A\Sigma A^T)" />.
          Linear transformations preserve Gaussianity.
        </li>
      </ul>

      <h3>Convolution</h3>

      <p>
        If{" "}
        <InlineMath math="X, Y" /> are independent with
        densities{" "}
        <InlineMath math="f_X, f_Y" />, then{" "}
        <InlineMath math="Z = X + Y" /> has density:
      </p>
      <BlockMath math="f_Z(z) = \int f_X(x) f_Y(z - x) \, dx = (f_X \ast f_Y)(z)." />

      <p>
        Sum of independents = convolution of densities.
        Underlies the central limit theorem, the algebra of
        characteristic functions, and the Hawkes-process
        kernel manipulations in Module VII.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Conditional expectation = optimal
          predictor</strong>. Every supervised model
          approximates{" "}
          <InlineMath math="E[Y \mid X]" />.
        </li>
        <li>
          <strong>The law of total variance</strong>{" "}
          decomposes uncertainty into "knowable given X" plus
          "irreducible after X". This is the bias-variance
          decomposition's elder cousin.
        </li>
        <li>
          <strong>Multivariate Gaussian everywhere</strong>:
          Bayesian linear regression, Kalman filters, GPs,
          factor models. The conditional MVN formulas are the
          most-used result in applied probability.
        </li>
        <li>
          <strong>Microstructure</strong>: the joint
          distribution of (sign, return, duration) at trade
          time is a multivariate object; modelling its
          covariance structure is what powers the propagator
          model. Cross-sectional return covariance ≈ MVN with
          a low-rank structure (factor models).
        </li>
      </ul>

      <p>
        Next chapter: limit theorems. Why sums of
        independent random variables become Gaussian, and how
        this single fact organises huge swathes of statistics.
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
      "$X$ and $Y$ are independent iff…",
    options: [
      "$\\mathrm{Cov}(X, Y) = 0$",
      "$f(x, y) = f_X(x) f_Y(y)$",
      "$E[XY] = E[X] E[Y]$",
      "all of the above",
    ],
    correct: 1,
    explanation:
      "Independence ⇔ joint factorises into marginals. Independence ⇒ $\\mathrm{Cov} = 0$ but the converse fails (except for jointly Gaussians). $E[XY] = E[X]E[Y]$ is also implied but not equivalent.",
  },
  {
    prompt:
      "The law of total variance says $\\mathrm{Var}(Y) = ?$",
    options: [
      "$E[\\mathrm{Var}(Y \\mid X)]$",
      "$\\mathrm{Var}(E[Y \\mid X])$",
      "$E[\\mathrm{Var}(Y \\mid X)] + \\mathrm{Var}(E[Y \\mid X])$",
      "$\\mathrm{Var}(Y \\mid X)$",
    ],
    correct: 2,
    explanation:
      "Within-group + between-group decomposition. Foundation of R² (proportion of variance explained = the between-group piece divided by total).",
  },
  {
    prompt:
      "The function $g$ minimising $E[(Y - g(X))^2]$ is…",
    options: [
      "$g(X) = 0$",
      "$g(X) = E[X]$",
      "$g(X) = E[Y \\mid X]$",
      "$g(X) = X$",
    ],
    correct: 2,
    explanation:
      "Conditional expectation is the best predictor under squared loss — that's why supervised learning targets $E[Y \\mid X]$. Linear regression approximates it with a linear function.",
  },
  {
    prompt:
      "For a multivariate normal $\\mathbf{X} \\sim N(\\boldsymbol\\mu, \\Sigma)$, linear combinations $\\mathbf{a}^T \\mathbf{X}$ are…",
    options: [
      "uniform",
      "Gaussian, with mean $\\mathbf{a}^T \\boldsymbol\\mu$ and variance $\\mathbf{a}^T \\Sigma \\mathbf{a}$",
      "always zero-mean",
      "no longer Gaussian",
    ],
    correct: 1,
    explanation:
      "Linear combinations of jointly Gaussian variables are Gaussian. This 'closed under linear maps' property is a defining feature and what makes Bayesian linear regression and Kalman filters analytically tractable.",
  },
  {
    prompt:
      "If $(X, Y) \\sim N(\\mathbf{0}, \\Sigma)$ with unit variances and correlation $\\rho$, then $E[Y \\mid X = x] = ?$",
    options: ["$0$", "$\\rho x$", "$x$", "$\\rho$"],
    correct: 1,
    explanation:
      "From the conditional MVN formula: $\\mu_{Y \\mid X} = \\rho x$, $\\sigma^2_{Y \\mid X} = 1 - \\rho^2$. The conditional mean is the population OLS regression line; conditional variance is the residual variance.",
  },
];
