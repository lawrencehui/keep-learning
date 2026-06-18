import { BlockMath, InlineMath } from "react-katex";
import { Callout, Pitfall, ReferenceResources } from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function PolicyGradientsBody() {
  return (
    <>
      <p>
        Dynamic programming needs the model <InlineMath math="P, R" /> and a
        small state space. Real problems — including a battery trading the
        Balancing Mechanism — have neither. Policy-gradient methods sidestep
        both: parameterise the policy <InlineMath math="\pi_\theta" /> directly
        and climb the gradient of expected return. This chapter derives that
        gradient and then beats down its variance.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Sutton & Barto Ch 13",
            author: "Sutton & Barto",
            duration: "Reading",
            url: "http://incompleteideas.net/book/the-book-2nd.html",
            note: "Policy-gradient methods, the policy gradient theorem, REINFORCE, actor-critic.",
          },
          {
            title: "Spinning Up — Intro to Policy Optimization",
            author: "OpenAI",
            duration: "Reading",
            url: "https://spinningup.openai.com/en/latest/spinningup/rl_intro3.html",
            note: "A clean derivation of the policy gradient with baselines and advantage.",
          },
        ]}
      />

      {/* ───────────────────────────  PART 1  ─────────────────────────── */}
      <h2>Part 1 · The objective</h2>

      <p>
        Let a trajectory <InlineMath math="\tau = (s_0, a_0, s_1, a_1, \dots)" />{" "}
        have return <InlineMath math="R(\tau) = \sum_t \gamma^t r_t" />. The
        objective is expected return under the policy-induced distribution:
      </p>

      <BlockMath math="J(\theta) = \mathbb E_{\tau \sim \pi_\theta}[R(\tau)] = \int p_\theta(\tau)\, R(\tau)\, d\tau." />

      <p>
        We want <InlineMath math="\nabla_\theta J" /> — but{" "}
        <InlineMath math="\theta" /> appears inside the sampling distribution,
        not the reward. The trick that fixes this is the whole chapter.
      </p>

      {/* ───────────────────────────  PART 2  ─────────────────────────── */}
      <h2>Part 2 · The log-derivative (score-function) trick</h2>

      <p>
        Differentiate and multiply by{" "}
        <InlineMath math="p_\theta/p_\theta = 1" />:
      </p>

      <BlockMath math="\nabla_\theta J = \int \nabla_\theta p_\theta(\tau)\, R(\tau)\, d\tau = \int p_\theta(\tau)\, \frac{\nabla_\theta p_\theta(\tau)}{p_\theta(\tau)}\, R(\tau)\, d\tau." />

      <p>
        Using <InlineMath math="\nabla \log p = \nabla p / p" /> turns the
        middle factor into a gradient of a log, and the whole thing back into an
        expectation we can sample:
      </p>

      <BlockMath math="\nabla_\theta J = \mathbb E_{\tau \sim \pi_\theta}\big[\nabla_\theta \log p_\theta(\tau)\, R(\tau)\big]." />

      <p>
        Now the magic: the trajectory probability{" "}
        <InlineMath math="p_\theta(\tau) = p(s_0)\prod_t P(s_{t+1}\mid s_t,a_t)\,\pi_\theta(a_t\mid s_t)" />.
        The environment terms don't depend on{" "}
        <InlineMath math="\theta" />, so they vanish under the gradient:
      </p>

      <BlockMath math="\nabla_\theta \log p_\theta(\tau) = \sum_t \nabla_\theta \log \pi_\theta(a_t \mid s_t)." />

      <Callout title="The model disappears">
        We never needed <InlineMath math="P" />. The policy gradient depends only
        on <InlineMath math="\nabla_\theta \log \pi_\theta" /> — quantities we
        control — and on returns we observe. This is what makes it{" "}
        <strong>model-free</strong>.
      </Callout>

      {/* ───────────────────────────  PART 3  ─────────────────────────── */}
      <h2>Part 3 · The policy gradient theorem</h2>

      <p>
        Replacing the full-trajectory return by the action-value (a reward at
        time <InlineMath math="t" /> can only be influenced by actions up to{" "}
        <InlineMath math="t" />) gives the canonical form:
      </p>

      <BlockMath math="\nabla_\theta J(\theta) = \mathbb E_{\pi_\theta}\big[\nabla_\theta \log \pi_\theta(a \mid s)\, Q^{\pi_\theta}(s, a)\big]." />

      <p>
        Read it as: nudge <InlineMath math="\theta" /> to raise the
        log-probability of actions, weighted by how good those actions turned
        out to be. <strong>REINFORCE</strong> is the Monte-Carlo estimator that
        plugs in the sampled return <InlineMath math="G_t" /> for{" "}
        <InlineMath math="Q" />:
      </p>

      <BlockMath math="\nabla_\theta J \approx \sum_t \nabla_\theta \log \pi_\theta(a_t \mid s_t)\, G_t." />

      {/* ───────────────────────────  PART 4  ─────────────────────────── */}
      <h2>Part 4 · Baselines and the advantage</h2>

      <p>
        REINFORCE is unbiased but its variance is brutal. The cure: subtract a
        state-dependent <strong>baseline</strong>{" "}
        <InlineMath math="b(s)" />. It leaves the gradient unbiased because the
        score function has zero mean,
      </p>

      <BlockMath math="\mathbb E_{a \sim \pi_\theta}[\nabla_\theta \log \pi_\theta(a \mid s)\, b(s)] = b(s)\, \nabla_\theta \sum_a \pi_\theta(a \mid s) = b(s)\, \nabla_\theta 1 = 0." />

      <p>
        The variance-minimising baseline is the state value{" "}
        <InlineMath math="b(s) = V^\pi(s)" />, which turns the weight into the{" "}
        <strong>advantage</strong>:
      </p>

      <BlockMath math="A^\pi(s, a) = Q^\pi(s, a) - V^\pi(s), \qquad \nabla_\theta J = \mathbb E_{\pi_\theta}[\nabla_\theta \log \pi_\theta(a\mid s)\, A^\pi(s,a)]." />

      <p>
        The advantage asks "was this action better or worse than the policy's
        average from here?" — exactly the signal that should raise or lower its
        probability.
      </p>

      {/* ───────────────────────────  PART 5  ─────────────────────────── */}
      <h2>Part 5 · Actor-critic and GAE</h2>

      <p>
        We don't know <InlineMath math="V" /> — so learn it. An{" "}
        <strong>actor-critic</strong> trains a critic{" "}
        <InlineMath math="V_\phi" /> (regress to returns) alongside the actor{" "}
        <InlineMath math="\pi_\theta" />, and estimates the advantage from the
        TD error <InlineMath math="\delta_t = r_t + \gamma V_\phi(s_{t+1}) - V_\phi(s_t)" />.
      </p>

      <p>
        <strong>Generalised Advantage Estimation</strong> blends many horizons
        with a decay <InlineMath math="\lambda" />:
      </p>

      <BlockMath math="\hat A_t^{\mathrm{GAE}} = \sum_{l=0}^\infty (\gamma\lambda)^l\, \delta_{t+l}." />

      <p>
        <InlineMath math="\lambda \to 0" /> is low-variance, high-bias (one-step
        TD); <InlineMath math="\lambda \to 1" /> is high-variance, low-bias
        (Monte-Carlo). GAE is the advantage estimator inside PPO.
      </p>

      <Pitfall>
        A baseline must be a function of state only, never of the action taken.
        A baseline that depends on <InlineMath math="a" /> correlates with the
        score function and <strong>biases</strong> the gradient — the zero-mean
        argument above breaks.
      </Pitfall>

      <p>
        Next chapter caps how far each update is allowed to move the policy —
        the trust-region idea that makes PPO stable enough to train a real
        battery agent.
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
      "The log-derivative trick rewrites $\\nabla_\\theta J$ as an expectation of…",
    options: [
      "$\\nabla_\\theta \\log \\pi_\\theta(a\\mid s)\\, Q(s,a)$",
      "$\\nabla_\\theta P(s'\\mid s,a)$",
      "the Hessian of the reward",
      "$\\nabla_\\theta V^*(s)$",
    ],
    correct: 0,
    explanation:
      "Using $\\nabla p = p\\,\\nabla\\log p$ turns the gradient back into a samplable expectation weighted by the score function $\\nabla_\\theta\\log\\pi_\\theta$.",
  },
  {
    prompt:
      "Why is policy gradient called model-free?",
    options: [
      "It ignores rewards",
      "The transition terms $P(s'\\mid s,a)$ don't depend on $\\theta$, so they drop out of $\\nabla_\\theta\\log p_\\theta(\\tau)$",
      "It requires the full transition model",
      "It only works for deterministic policies",
    ],
    correct: 1,
    explanation:
      "$\\nabla_\\theta\\log p_\\theta(\\tau)=\\sum_t\\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)$ — the environment dynamics vanish, so no model is needed.",
  },
  {
    prompt:
      "Subtracting a state baseline $b(s)$ from the return…",
    options: [
      "biases the gradient",
      "leaves the gradient unbiased but reduces its variance",
      "changes the optimal policy",
      "has no effect at all",
    ],
    correct: 1,
    explanation:
      "$\\mathbb E[\\nabla_\\theta\\log\\pi_\\theta\\,b(s)]=b(s)\\nabla_\\theta 1=0$, so the mean is unchanged; choosing $b=V$ minimises variance.",
  },
  {
    prompt: "The advantage function is defined as…",
    options: [
      "$A(s,a)=Q(s,a)-V(s)$",
      "$A(s,a)=V(s)-Q(s,a)$",
      "$A(s,a)=r+\\gamma V(s')$",
      "$A(s,a)=\\nabla_\\theta\\log\\pi_\\theta$",
    ],
    correct: 0,
    explanation:
      "Advantage = how much better an action is than the policy's average from that state. Using $V$ as the baseline turns the policy-gradient weight into $A$.",
  },
  {
    prompt:
      "In GAE, what does increasing $\\lambda$ toward 1 do?",
    options: [
      "Lowers variance and raises bias",
      "Raises variance and lowers bias (toward Monte-Carlo)",
      "Has no effect on the bias-variance trade-off",
      "Makes the estimator biased and useless",
    ],
    correct: 1,
    explanation:
      "$\\hat A_t=\\sum_l(\\gamma\\lambda)^l\\delta_{t+l}$. $\\lambda\\to0$ is one-step TD (low-variance, biased); $\\lambda\\to1$ approaches Monte-Carlo (unbiased, high-variance).",
  },
];
