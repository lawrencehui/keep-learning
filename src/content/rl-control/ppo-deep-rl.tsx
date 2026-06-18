import { BlockMath, InlineMath } from "react-katex";
import { Callout, Pitfall, ReferenceResources } from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function PpoDeepRlBody() {
  return (
    <>
      <p>
        Vanilla policy gradients work but are fragile: one over-large update can
        collapse the policy and never recover. Proximal Policy Optimization
        (PPO) is the workhorse that fixed this — stable, scalable, and the exact
        algorithm behind the BMBench battery agent. This chapter goes from
        value-based deep RL through the trust-region idea to PPO's clipped
        objective.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Spinning Up — Proximal Policy Optimization",
            author: "OpenAI",
            duration: "Reading",
            url: "https://spinningup.openai.com/en/latest/algorithms/ppo.html",
            note: "The clipped surrogate objective with a reference implementation.",
          },
          {
            title: "Proximal Policy Optimization Algorithms",
            author: "Schulman et al. (2017)",
            duration: "Paper",
            url: "https://arxiv.org/abs/1707.06347",
            note: "The original PPO paper — short and readable.",
          },
        ]}
      />

      {/* ───────────────────────────  PART 1  ─────────────────────────── */}
      <h2>Part 1 · Value-based deep RL: DQN</h2>

      <p>
        Before policy methods took over, the headline deep-RL result was DQN:
        approximate <InlineMath math="Q^*" /> with a network{" "}
        <InlineMath math="Q_\theta" /> and regress toward the bootstrapped
        target
      </p>

      <BlockMath math="y = r + \gamma \max_{a'} Q_{\theta^-}(s', a'), \qquad L(\theta) = \mathbb E\big[(Q_\theta(s,a) - y)^2\big]." />

      <p>
        Two tricks make this stable: a <strong>replay buffer</strong>{" "}
        (decorrelate samples) and a slowly-updated <strong>target network</strong>{" "}
        <InlineMath math="\theta^-" /> (stop the target chasing the prediction).
        DQN is great for discrete actions; for continuous or high-dimensional
        action spaces, policy methods dominate — which is why BMBench uses PPO.
      </p>

      {/* ───────────────────────────  PART 2  ─────────────────────────── */}
      <h2>Part 2 · The trust-region idea</h2>

      <p>
        Policy gradients are local: the estimate is only valid near the current
        policy. Take too big a step and you optimise a surrogate that no longer
        reflects reality. TRPO made this precise by bounding the KL divergence
        between the old and new policy:
      </p>

      <BlockMath math="\max_\theta\ \mathbb E\Big[\tfrac{\pi_\theta(a\mid s)}{\pi_{\theta_{\text{old}}}(a\mid s)}\, \hat A\Big] \quad \text{s.t.}\quad \mathbb E\big[D_{KL}(\pi_{\theta_{\text{old}}} \,\|\, \pi_\theta)\big] \le \delta." />

      <p>
        The ratio <InlineMath math="r_t(\theta) = \pi_\theta / \pi_{\theta_{\text{old}}}" />{" "}
        is an importance weight that lets us reuse data collected under the old
        policy. TRPO enforces the constraint exactly but needs a costly
        second-order (conjugate-gradient) step.
      </p>

      {/* ───────────────────────────  PART 3  ─────────────────────────── */}
      <h2>Part 3 · PPO: the clipped surrogate</h2>

      <p>
        PPO gets the same "don't move too far" effect with a first-order
        objective — just clip the ratio:
      </p>

      <BlockMath math="L^{\text{CLIP}}(\theta) = \mathbb E_t\Big[\min\big(r_t(\theta)\, \hat A_t,\ \mathrm{clip}(r_t(\theta),\, 1-\epsilon,\, 1+\epsilon)\, \hat A_t\big)\Big]." />

      <p>
        Walk through the two cases that make this work:
      </p>
      <ul>
        <li>
          <strong>Advantage positive</strong> (<InlineMath math="\hat A_t > 0" />):
          we want to increase <InlineMath math="r_t" />, but the{" "}
          <InlineMath math="\min" /> caps the gain at{" "}
          <InlineMath math="1+\epsilon" /> — no reward for pushing the
          probability further.
        </li>
        <li>
          <strong>Advantage negative</strong> (<InlineMath math="\hat A_t < 0" />):
          we want to decrease <InlineMath math="r_t" />; the clip floors it at{" "}
          <InlineMath math="1-\epsilon" /> so a single bad action can't yank the
          policy arbitrarily far.
        </li>
      </ul>

      <Callout title="Why the min, not just the clip">
        Taking the <InlineMath math="\min" /> of the clipped and unclipped terms
        makes the objective a <strong>pessimistic lower bound</strong> on the
        unclipped surrogate. Clipping alone would ignore moves that make the
        policy <em>worse</em> beyond the trust region; the min still penalises
        them. Typical <InlineMath math="\epsilon = 0.2" />.
      </Callout>

      <p>
        The full PPO loss adds a value-function regression term and an entropy
        bonus for exploration:
      </p>

      <BlockMath math="L = L^{\text{CLIP}} - c_1\, \underbrace{(V_\phi(s) - V^{\text{targ}})^2}_{\text{critic}} + c_2\, \underbrace{H[\pi_\theta(\cdot \mid s)]}_{\text{entropy}}." />

      {/* ───────────────────────────  PART 4  ─────────────────────────── */}
      <h2>Part 4 · Putting it together — and BMBench</h2>

      <p>
        The PPO loop: collect a batch of trajectories under{" "}
        <InlineMath math="\pi_{\theta_{\text{old}}}" />, compute GAE advantages
        with the critic, then take several epochs of minibatch SGD on{" "}
        <InlineMath math="L" /> — reusing the same data because the clipped ratio
        keeps the updates trustworthy. Then refresh{" "}
        <InlineMath math="\theta_{\text{old}}" /> and repeat.
      </p>

      <Callout title="This is your research">
        BMBench trains a PPO agent on a 1&nbsp;MW&nbsp;/&nbsp;2&nbsp;MWh battery
        arbitraging the GB Balancing Mechanism, then measures how well a policy
        learned <em>in simulation</em> transfers to <em>real</em> 2025 data. The
        finding — the world-model simulator is the only one with zero sim-to-real
        transfer gap — is exactly a statement about how well the MDP the agent
        trained on matches reality. Everything in this module is the vocabulary
        for that result.
      </Callout>

      <Pitfall>
        PPO's data reuse is only safe while <InlineMath math="\pi_\theta" />{" "}
        stays close to <InlineMath math="\pi_{\theta_{\text{old}}}" />. Running
        too many epochs per batch pushes the ratio outside the clip range on
        most samples, the gradient goes to zero there, and learning stalls —
        more epochs is not strictly better.
      </Pitfall>

      <p>
        That completes the RL spine: MDPs → dynamic programming → policy
        gradients → PPO, with optimal control / LQR as the continuous-state
        cousin in the final chapter. This is the theory under the energy-markets
        DPhil; pair it with the BMBench code to make it concrete.
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt: "What two tricks stabilise DQN's bootstrapped regression?",
    options: [
      "Dropout and batch norm",
      "A replay buffer (decorrelated samples) and a target network (stable targets)",
      "Clipping and entropy bonus",
      "Importance sampling and GAE",
    ],
    correct: 1,
    explanation:
      "Replay decorrelates consecutive transitions; the slowly-updated target network $\\theta^-$ stops the regression target from chasing the prediction.",
  },
  {
    prompt: "In PPO, what is the ratio $r_t(\\theta)$?",
    options: [
      "$Q(s,a)/V(s)$",
      "$\\pi_\\theta(a\\mid s)/\\pi_{\\theta_{\\text{old}}}(a\\mid s)$, an importance weight",
      "the discount $\\gamma$",
      "the TD error",
    ],
    correct: 1,
    explanation:
      "The probability ratio between the new and old policy lets PPO reuse data collected under $\\pi_{\\theta_{\\text{old}}}$ via importance weighting.",
  },
  {
    prompt:
      "Why does PPO take the $\\min$ of the clipped and unclipped surrogate terms?",
    options: [
      "To make the objective a pessimistic lower bound that still penalises policy moves beyond the trust region",
      "To speed up matrix inversion",
      "To make the loss differentiable",
      "It is an arbitrary implementation detail",
    ],
    correct: 0,
    explanation:
      "Clipping alone would ignore harmful moves outside the region; the min keeps the larger (worse) penalty, giving a conservative lower bound on the true surrogate.",
  },
  {
    prompt:
      "What does PPO approximate from TRPO, but more cheaply?",
    options: [
      "The replay buffer",
      "A trust-region constraint on the KL between old and new policy — via clipping instead of a second-order step",
      "The Bellman optimality equation",
      "The reward function",
    ],
    correct: 1,
    explanation:
      "TRPO enforces a hard KL constraint with a costly conjugate-gradient step; PPO gets a similar effect with a first-order clipped objective.",
  },
  {
    prompt:
      "How does PPO connect to the BMBench research?",
    options: [
      "It doesn't — BMBench uses DQN",
      "BMBench trains a PPO battery agent in simulators and measures sim-to-real transfer; the world model is the only simulator with zero transfer gap",
      "PPO is only used for the viewer UI",
      "BMBench uses PPO solely for hyperparameter search",
    ],
    correct: 1,
    explanation:
      "The whole BMBench result is about how well a PPO policy trained in a simulated MDP transfers to the real Balancing Mechanism — a direct application of this chapter.",
  },
];
