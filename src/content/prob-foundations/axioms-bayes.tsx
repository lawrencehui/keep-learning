import { BlockMath, InlineMath } from "react-katex";
import {
  Callout,
  Exercise,
  Pitfall,
  ReferenceResources,
} from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function AxiomsBayesBody() {
  return (
    <>
      <p>
        Probability is the language we use to reason under
        uncertainty. We'll do it formally enough to be
        rigorous, casually enough to be useful. Three axioms
        and a definition of conditional probability are all
        you need to derive every theorem in the chapter — and
        Bayes' rule, the most consequential of them, is just
        a one-line corollary.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Blitzstein & Hwang — Introduction to Probability",
            author: "Joe Blitzstein, Jessica Hwang",
            duration: "Reading + practice",
            url: "https://projects.iq.harvard.edu/stat110/home",
            note: "Chapters 1-2 are the gold standard for building intuition. Pair with Stat 110 lectures for spaced repetition.",
          },
          {
            title: "Stat 110 — Lectures 1-3",
            author: "Joe Blitzstein (Harvard)",
            duration: "~2.5h",
            url: "https://projects.iq.harvard.edu/stat110/youtube",
            note: "Probability and counting, conditional probability, birthday problem.",
          },
          {
            title: "MML Ch 6.3 — Bayes' theorem",
            author: "Deisenroth, Faisal, Ong",
            duration: "Reading",
            url: "https://mml-book.com/",
            note: "The ML-flavoured statement, with priors and likelihoods front and centre.",
          },
          {
            title: "Wasserman Ch 1",
            author: "Larry Wasserman",
            duration: "Reading",
            url: "https://link.springer.com/book/10.1007/978-0-387-21736-9",
            note: "Tighter, more formal. Good complement to Blitzstein.",
          },
        ]}
      />

      {/* ─────────────────────────────  PART 1  ───────────────────────────── */}
      <h2>Part 1 · Sample spaces, events, axioms</h2>

      <Callout title="Definitions">
        <ul>
          <li>
            <strong>Sample space</strong>{" "}
            <InlineMath math="\Omega" />: the set of all
            possible outcomes of an experiment.
          </li>
          <li>
            <strong>Event</strong>: a subset{" "}
            <InlineMath math="A \subseteq \Omega" />.
          </li>
          <li>
            <strong>Probability measure</strong>{" "}
            <InlineMath math="P" />: a function from events to{" "}
            <InlineMath math="[0, 1]" />.
          </li>
        </ul>
      </Callout>

      <p>
        For a single coin flip,{" "}
        <InlineMath math="\Omega = \{H, T\}" />,{" "}
        <InlineMath math="P(\{H\}) = 1/2" />. For an integer
        roll of a die,{" "}
        <InlineMath math="\Omega = \{1, 2, \dots, 6\}" />.
        For the lifetime of a stock position,{" "}
        <InlineMath math="\Omega = [0, \infty)" /> — sample
        spaces can be continuous, finite, countably infinite,
        or uncountably infinite.
      </p>

      <Callout title="Kolmogorov's three axioms">
        <ol>
          <li>
            <strong>Non-negativity</strong>:{" "}
            <InlineMath math="P(A) \ge 0" /> for all events{" "}
            <InlineMath math="A" />.
          </li>
          <li>
            <strong>Total probability</strong>:{" "}
            <InlineMath math="P(\Omega) = 1" />.
          </li>
          <li>
            <strong>Countable additivity</strong>: for disjoint{" "}
            <InlineMath math="A_1, A_2, \dots" />,
            <BlockMath math="P\!\left(\bigcup_{i} A_i\right) = \sum_{i} P(A_i)." />
          </li>
        </ol>
      </Callout>

      <p>
        Every other rule of probability follows from these
        three. For example,
      </p>
      <ul>
        <li>
          <InlineMath math="P(A^c) = 1 - P(A)" /> (complement
          rule).
        </li>
        <li>
          <InlineMath math="P(A \cup B) = P(A) + P(B) - P(A \cap B)" />{" "}
          (inclusion–exclusion).
        </li>
        <li>
          If{" "}
          <InlineMath math="A \subseteq B" /> then{" "}
          <InlineMath math="P(A) \le P(B)" /> (monotonicity).
        </li>
      </ul>

      {/* ─────────────────────────────  PART 2  ───────────────────────────── */}
      <h2>Part 2 · Conditional probability</h2>

      <Callout title="Definition · Conditional probability">
        For events <InlineMath math="A, B" /> with{" "}
        <InlineMath math="P(B) > 0" />:
        <BlockMath math="P(A \mid B) = \frac{P(A \cap B)}{P(B)}." />
      </Callout>

      <p>
        Read it as: "the probability of{" "}
        <InlineMath math="A" /> given that{" "}
        <InlineMath math="B" /> occurred." Mechanically: shrink
        the sample space to{" "}
        <InlineMath math="B" />, renormalise so that the new
        space has total probability 1, then ask how much{" "}
        <InlineMath math="A" /> remains.
      </p>

      <p>
        Once you have conditional probability, the equation can
        be rearranged:
      </p>
      <BlockMath math="P(A \cap B) = P(A \mid B) P(B) = P(B \mid A) P(A)." />

      <p>
        That symmetric equality is the essence of Bayes' rule
        (Part 4) — but first, two consequences worth
        memorising.
      </p>

      <h3>Chain rule</h3>

      <BlockMath math="P(A_1 \cap A_2 \cap \dots \cap A_n) = P(A_1) \, P(A_2 \mid A_1) \, P(A_3 \mid A_1 \cap A_2) \cdots P(A_n \mid A_1 \cap \dots \cap A_{n-1})." />

      <p>
        Read left-to-right: each new piece is conditioned on
        all the earlier ones. Foundation of structured
        probabilistic models — Markov chains are the special
        case where each conditional only depends on the
        immediately previous event.
      </p>

      <h3>Law of total probability</h3>

      <p>
        If{" "}
        <InlineMath math="\{B_1, \dots, B_n\}" /> partitions{" "}
        <InlineMath math="\Omega" /> (mutually exclusive,
        collectively exhaustive):
      </p>
      <BlockMath math="P(A) = \sum_i P(A \mid B_i) \, P(B_i)." />

      <p>
        Decompose <InlineMath math="A" /> by which{" "}
        <InlineMath math="B_i" /> happened. This is how you
        compute marginal probabilities by conditioning on
        every relevant case.
      </p>

      {/* ─────────────────────────────  PART 3  ───────────────────────────── */}
      <h2>Part 3 · Independence</h2>

      <Callout title="Definition · Independence">
        Events <InlineMath math="A" /> and{" "}
        <InlineMath math="B" /> are{" "}
        <strong>independent</strong> if
        <BlockMath math="P(A \cap B) = P(A) \, P(B)" />
        equivalently (when{" "}
        <InlineMath math="P(B) > 0" />){" "}
        <InlineMath math="P(A \mid B) = P(A)" />.
      </Callout>

      <p>
        Independence means "knowing{" "}
        <InlineMath math="B" /> happened tells you nothing
        about <InlineMath math="A" />." It is{" "}
        <em>not</em> the same as "disjoint" — disjoint events
        with positive probability are{" "}
        <em>highly dependent</em> (one happens ⇒ the other
        cannot).
      </p>

      <Pitfall>
        Pairwise independence does not imply mutual
        independence for three or more events. Three coin
        flips can be pairwise independent but not jointly
        independent if the third is the XOR of the first two.
        For careful probabilistic modelling, always specify
        which kind.
      </Pitfall>

      <h3>Conditional independence</h3>

      <p>
        <InlineMath math="A \perp B \mid C" /> means{" "}
        <InlineMath math="P(A \cap B \mid C) = P(A \mid C) P(B \mid C)" />.
        This is the bedrock of probabilistic graphical
        models, naive Bayes classifiers, and any "given the
        latent variable, observations are independent" setup
        (HMMs, mixture models, factor models in finance).
      </p>

      {/* ─────────────────────────────  PART 4  ───────────────────────────── */}
      <h2>Part 4 · Bayes' theorem</h2>

      <p>
        From the symmetry{" "}
        <InlineMath math="P(A \cap B) = P(A \mid B) P(B) = P(B \mid A) P(A)" />:
      </p>

      <Callout title="Bayes' theorem">
        <BlockMath math="P(A \mid B) = \frac{P(B \mid A) \, P(A)}{P(B)}." />
      </Callout>

      <p>
        Three names for the four pieces:
      </p>
      <ul>
        <li>
          <strong>Posterior</strong>{" "}
          <InlineMath math="P(A \mid B)" />: probability of{" "}
          <InlineMath math="A" /> after observing{" "}
          <InlineMath math="B" />.
        </li>
        <li>
          <strong>Likelihood</strong>{" "}
          <InlineMath math="P(B \mid A)" />: probability of the
          observation under hypothesis{" "}
          <InlineMath math="A" />.
        </li>
        <li>
          <strong>Prior</strong>{" "}
          <InlineMath math="P(A)" />: probability of{" "}
          <InlineMath math="A" /> before observing{" "}
          <InlineMath math="B" />.
        </li>
        <li>
          <strong>Evidence</strong> (or marginal){" "}
          <InlineMath math="P(B)" />: probability of the
          observation, marginalised over hypotheses.
        </li>
      </ul>

      <p>
        Reading: <strong>posterior ∝ likelihood × prior</strong>.
        The evidence is just a normalising constant. In ML,
        you'll often skip computing it and use unnormalised
        posteriors (MAP, MCMC).
      </p>

      <h3>The disease-test classic</h3>

      <p>
        A test is 99% accurate. It comes back positive. What's
        the probability you have the disease? Answer: depends
        on the prior.
      </p>

      <p>
        Suppose disease prevalence{" "}
        <InlineMath math="P(D) = 0.001" />, sensitivity{" "}
        <InlineMath math="P(+ \mid D) = 0.99" />, specificity{" "}
        <InlineMath math="P(- \mid D^c) = 0.99" /> (so{" "}
        <InlineMath math="P(+ \mid D^c) = 0.01" />). Then:
      </p>
      <BlockMath math="P(D \mid +) = \frac{P(+ \mid D) P(D)}{P(+ \mid D) P(D) + P(+ \mid D^c) P(D^c)} = \frac{0.99 \cdot 0.001}{0.99 \cdot 0.001 + 0.01 \cdot 0.999} \approx 0.090." />

      <p>
        About 9%. People — including doctors — get this
        wrong all the time, anchoring on the "99% accurate"
        and ignoring the prior. The base-rate fallacy is the
        most expensive cognitive bias in human history.
      </p>

      <Exercise prompt="An email is flagged as spam by a filter. Filter sensitivity is 95% and specificity is 99%. The fraction of incoming email that's actually spam is 50%. What's $P(\text{spam} \mid \text{flagged})$?">
        <p>
          <InlineMath math="P(\text{spam}) = 0.5" />,{" "}
          <InlineMath math="P(\text{flag} \mid \text{spam}) = 0.95" />,{" "}
          <InlineMath math="P(\text{flag} \mid \text{ham}) = 0.01" />.
        </p>
        <BlockMath math="P(\text{spam} \mid \text{flag}) = \frac{0.95 \cdot 0.5}{0.95 \cdot 0.5 + 0.01 \cdot 0.5} = \frac{0.475}{0.480} \approx 0.990." />
        <p>
          With a 50/50 prior, the test's high accuracy
          translates directly. With a 0.001 prior (rare-disease
          example), it doesn't.
        </p>
      </Exercise>

      {/* ─────────────────────────────  PART 5  ───────────────────────────── */}
      <h2>Part 5 · Bayes in iterated form</h2>

      <p>
        Bayes' theorem updates beliefs one observation at a
        time — and you can chain updates. Posterior after
        observation 1 becomes the prior for observation 2:
      </p>
      <BlockMath math="P(A \mid B_1, B_2) = \frac{P(B_2 \mid A, B_1) \, P(A \mid B_1)}{P(B_2 \mid B_1)}." />

      <p>
        If <InlineMath math="B_2" /> is conditionally
        independent of{" "}
        <InlineMath math="B_1" /> given{" "}
        <InlineMath math="A" /> (a common modelling
        assumption), this simplifies to{" "}
        <InlineMath math="\propto P(B_2 \mid A) P(A \mid B_1)" />.
        That's the structure of online Bayesian inference,
        Kalman filters, and naive-Bayes classifiers.
      </p>

      {/* ─────────────────────────────  PART 6  ───────────────────────────── */}
      <h2>Part 6 · Why this matters</h2>

      <ul>
        <li>
          <strong>Bayes is the inference engine</strong>: every
          probabilistic model boils down to applying Bayes'
          rule on the right joint distribution.
        </li>
        <li>
          <strong>Conditional independence</strong> structures
          ML models — naive Bayes, HMMs, latent variable
          models, probabilistic graphical models, factor
          models in finance.
        </li>
        <li>
          <strong>Base rates matter</strong>: ignoring priors is
          the single most-common modelling error. ROC analysis
          and confusion-matrix interpretation hinge on it.
        </li>
        <li>
          <strong>Microstructure</strong>: trade-classification
          (Lee–Ready), order-flow toxicity, and adverse-
          selection models all use Bayesian updating to
          rank-order hypotheses about counterparty intent.
        </li>
      </ul>

      <p>
        Next chapter: random variables and the bestiary of
        distributions you need to recognise on sight.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt: "Which is **not** one of Kolmogorov's three axioms?",
    options: [
      "$P(A) \\ge 0$",
      "$P(\\Omega) = 1$",
      "Countable additivity for disjoint events",
      "$P(A \\cap B) = P(A) P(B)$ for all $A, B$",
    ],
    correct: 3,
    explanation:
      "The first three are the axioms; the last is independence — which is a *property* of specific events, not an axiom of probability.",
  },
  {
    prompt: "$P(A \\mid B)$ is defined as…",
    options: [
      "$P(A) - P(B)$",
      "$P(A \\cap B) / P(B)$ when $P(B) > 0$",
      "$P(B) / P(A)$",
      "$P(A) P(B)$",
    ],
    correct: 1,
    explanation:
      "Restrict to the sub-sample-space where $B$ holds, renormalise. The numerator measures how much of $A$ is also in $B$; the denominator normalises.",
  },
  {
    prompt: "Bayes' theorem says…",
    options: [
      "$P(A \\mid B) = P(B \\mid A)$ always",
      "$P(A \\mid B) = P(B \\mid A) P(A) / P(B)$",
      "$P(A \\cup B) = P(A) + P(B)$",
      "$P(A) = 1 - P(A^c)$",
    ],
    correct: 1,
    explanation:
      "Posterior ∝ likelihood × prior. Common misreading: $P(A \\mid B) \\ne P(B \\mid A)$ in general — the difference is exactly the prior ratio.",
  },
  {
    prompt:
      "A medical test has 99% sensitivity and 99% specificity. The disease has prevalence 0.001. A patient tests positive. What's $P(\\text{disease} \\mid +)$?",
    options: ["~99%", "~50%", "~9%", "~0.001%"],
    correct: 2,
    explanation:
      "Bayes: $0.99 \\cdot 0.001 / (0.99 \\cdot 0.001 + 0.01 \\cdot 0.999) \\approx 9\\%$. Base-rate fallacy: people anchor on the 99% test and ignore the small prior.",
  },
  {
    prompt: "Independence means…",
    options: [
      "$P(A \\cap B) = 0$",
      "$P(A \\cap B) = P(A) P(B)$",
      "$A$ and $B$ are disjoint",
      "$P(A \\mid B) = P(B \\mid A)$",
    ],
    correct: 1,
    explanation:
      "Equivalent to $P(A \\mid B) = P(A)$ when $P(B) > 0$. Note: disjoint events with positive probability are *not* independent — they're maximally dependent.",
  },
];
