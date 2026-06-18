import { BlockMath, InlineMath } from "react-katex";
import { Callout, Pitfall, ReferenceResources } from "../../components/Ebook";
import type { QuizQuestion } from "../types";

export default function MdpBellmanBody() {
  return (
    <>
      <p>
        Reinforcement learning is the study of sequential decision-making under
        uncertainty. Everything starts from one object — the{" "}
        <strong>Markov Decision Process</strong> — and two recursive equations
        that fall out of it: the Bellman expectation equation (how good is a
        fixed policy?) and the Bellman optimality equation (what is the best
        policy?). Get these cold and the rest of RL is variations on a theme.
      </p>

      <ReferenceResources
        items={[
          {
            title: "Sutton & Barto Ch 3–4",
            author: "Sutton & Barto",
            duration: "Reading",
            url: "http://incompleteideas.net/book/the-book-2nd.html",
            note: "Finite MDPs, value functions, the Bellman equations, dynamic programming.",
          },
          {
            title: "DeepMind x UCL RL — Lecture 2",
            author: "David Silver",
            duration: "Lecture",
            url: "https://www.davidsilver.uk/teaching/",
            note: "MDPs and the Bellman equations from first principles.",
          },
        ]}
      />

      {/* ───────────────────────────  PART 1  ─────────────────────────── */}
      <h2>Part 1 · The Markov Decision Process</h2>

      <p>
        An MDP is the tuple <InlineMath math="(\mathcal S, \mathcal A, P, R, \gamma)" />:
        a set of states, a set of actions, a transition kernel, a reward
        function, and a discount factor. The defining assumption is the{" "}
        <strong>Markov property</strong> — the future depends on the present
        state alone, not the whole history:
      </p>

      <BlockMath math="P(s_{t+1} \mid s_t, a_t) = P(s_{t+1} \mid s_1, a_1, \dots, s_t, a_t)." />

      <p>
        A <strong>policy</strong> <InlineMath math="\pi(a \mid s)" /> is a
        distribution over actions given the state. The agent's goal is to
        maximise the expected <strong>discounted return</strong>:
      </p>

      <BlockMath math="G_t = r_{t+1} + \gamma r_{t+2} + \gamma^2 r_{t+3} + \dots = \sum_{k=0}^\infty \gamma^k r_{t+k+1}." />

      <Callout title="Why discount?">
        <InlineMath math="\gamma \in [0, 1)" /> makes the infinite sum converge
        (rewards bounded ⇒ <InlineMath math="G_t \le R_{\max}/(1-\gamma)" />),
        and encodes a preference for sooner rewards. <InlineMath math="\gamma \to 1" />{" "}
        is far-sighted; <InlineMath math="\gamma \to 0" /> is myopic.
      </Callout>

      {/* ───────────────────────────  PART 2  ─────────────────────────── */}
      <h2>Part 2 · Value and action-value functions</h2>

      <p>
        The <strong>state-value function</strong> is the expected return from a
        state under a policy:
      </p>

      <BlockMath math="V^\pi(s) = \mathbb E_\pi[G_t \mid s_t = s]." />

      <p>
        The <strong>action-value</strong> (or Q-) function conditions
        additionally on taking action <InlineMath math="a" /> first, then
        following <InlineMath math="\pi" />:
      </p>

      <BlockMath math="Q^\pi(s, a) = \mathbb E_\pi[G_t \mid s_t = s, a_t = a]." />

      <p>
        The two are linked by averaging over the policy:{" "}
        <InlineMath math="V^\pi(s) = \sum_a \pi(a \mid s)\, Q^\pi(s, a)" />.
      </p>

      {/* ───────────────────────────  PART 3  ─────────────────────────── */}
      <h2>Part 3 · The Bellman expectation equation</h2>

      <p>
        Split the return into the immediate reward plus the discounted return
        from the next state, <InlineMath math="G_t = r_{t+1} + \gamma G_{t+1}" />,
        and take expectations. Because of the Markov property the inner
        expectation is just <InlineMath math="V^\pi(s')" />:
      </p>

      <BlockMath math="V^\pi(s) = \sum_a \pi(a \mid s) \sum_{s'} P(s' \mid s, a)\big[R(s, a, s') + \gamma\, V^\pi(s')\big]." />

      <p>
        This is the engine of every prediction algorithm: a one-step{" "}
        <em>self-consistency</em> condition relating a state's value to its
        successors. For a finite MDP it is a linear system{" "}
        <InlineMath math="V = R_\pi + \gamma P_\pi V" />, with the closed-form
        solution <InlineMath math="V = (I - \gamma P_\pi)^{-1} R_\pi" />.
      </p>

      <Callout title="Backup diagram">
        Read the equation as a tree: from <InlineMath math="s" /> average over
        actions (the policy), then over next states (the environment), summing
        reward plus discounted successor value. "Backing up" means pushing those
        leaf values one level up the tree.
      </Callout>

      {/* ───────────────────────────  PART 4  ─────────────────────────── */}
      <h2>Part 4 · The Bellman optimality equation</h2>

      <p>
        The optimal value <InlineMath math="V^*(s) = \max_\pi V^\pi(s)" />{" "}
        satisfies a similar recursion, but the policy average is replaced by a{" "}
        <strong>maximisation</strong> — an optimal agent picks the best action,
        it doesn't average over a fixed one:
      </p>

      <BlockMath math="V^*(s) = \max_a \sum_{s'} P(s' \mid s, a)\big[R(s, a, s') + \gamma\, V^*(s')\big]." />

      <p>
        Equivalently, in action-value form:
      </p>

      <BlockMath math="Q^*(s, a) = \sum_{s'} P(s' \mid s, a)\big[R + \gamma \max_{a'} Q^*(s', a')\big]." />

      <p>
        Once <InlineMath math="Q^*" /> is known the optimal policy is trivial —
        act <strong>greedily</strong>:{" "}
        <InlineMath math="\pi^*(s) = \arg\max_a Q^*(s, a)" />. The whole problem
        reduces to finding <InlineMath math="Q^*" />.
      </p>

      <Pitfall>
        The <InlineMath math="\max" /> makes the optimality equation{" "}
        <strong>non-linear</strong> — you cannot solve it with a matrix inverse
        the way you can the expectation equation. That non-linearity is exactly
        why we need iterative methods (value iteration, Q-learning) instead of a
        closed form.
      </Pitfall>

      {/* ───────────────────────────  PART 5  ─────────────────────────── */}
      <h2>Part 5 · Why iteration works</h2>

      <p>
        Define the Bellman optimality operator{" "}
        <InlineMath math="(\mathcal T V)(s) = \max_a \sum_{s'} P[R + \gamma V(s')]" />.
        It is a <InlineMath math="\gamma" />-<strong>contraction</strong> in the
        sup-norm:
      </p>

      <BlockMath math="\|\mathcal T V - \mathcal T U\|_\infty \le \gamma \, \|V - U\|_\infty." />

      <p>
        By Banach's fixed-point theorem <InlineMath math="\mathcal T" /> has a
        unique fixed point — <InlineMath math="V^*" /> — and repeatedly applying
        it converges to it geometrically at rate <InlineMath math="\gamma" />.
        That single fact underwrites value iteration, policy iteration, and the
        convergence of tabular Q-learning.
      </p>

      <p>
        Next chapter turns these equations into algorithms when the model{" "}
        <InlineMath math="P, R" /> is known (dynamic programming); the chapters
        after handle the realistic case where it isn't (policy gradients, PPO).
      </p>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Quiz
// ════════════════════════════════════════════════════════════

export const quiz: QuizQuestion[] = [
  {
    prompt: "What does the Markov property state for an MDP?",
    options: [
      "Rewards are always positive",
      "The next state depends only on the current state and action, not the full history",
      "The policy must be deterministic",
      "The discount factor is 1",
    ],
    correct: 1,
    explanation:
      "$P(s_{t+1}\\mid s_t,a_t)$ — the present state is a sufficient statistic for the future. This is what makes the one-step Bellman recursion valid.",
  },
  {
    prompt:
      "What is the key structural difference between the Bellman expectation and optimality equations?",
    options: [
      "Expectation uses $\\gamma$, optimality does not",
      "Optimality replaces the policy average $\\sum_a \\pi(a\\mid s)$ with a maximisation $\\max_a$",
      "Expectation is non-linear, optimality is linear",
      "They are identical",
    ],
    correct: 1,
    explanation:
      "Averaging over a fixed policy gives the (linear) expectation equation; taking the max over actions gives the (non-linear) optimality equation. The max is why no closed-form inverse exists.",
  },
  {
    prompt: "Given $Q^*$, the optimal policy is…",
    options: [
      "a uniform random policy",
      "greedy: $\\pi^*(s) = \\arg\\max_a Q^*(s,a)$",
      "softmax over $Q^*$ with fixed temperature",
      "undefined without the transition model",
    ],
    correct: 1,
    explanation:
      "Acting greedily w.r.t. $Q^*$ is optimal — no model needed at decision time. Finding $Q^*$ is the hard part; using it is trivial.",
  },
  {
    prompt:
      "Why can the Bellman expectation equation be solved in closed form but not the optimality equation?",
    options: [
      "The expectation equation is linear in $V$ ($V = (I-\\gamma P_\\pi)^{-1} R_\\pi$); the $\\max$ makes the optimality equation non-linear",
      "The optimality equation has no solution",
      "The discount factor differs",
      "Closed forms exist for both",
    ],
    correct: 0,
    explanation:
      "For a fixed policy the equation is linear, so a matrix inverse works. The $\\max_a$ in the optimality equation breaks linearity, forcing iterative methods.",
  },
  {
    prompt:
      "Why does value iteration converge to a unique $V^*$?",
    options: [
      "Because rewards are bounded",
      "Because the Bellman optimality operator is a $\\gamma$-contraction, so Banach's fixed-point theorem applies",
      "Because the state space is finite",
      "It does not always converge",
    ],
    correct: 1,
    explanation:
      "$\\|\\mathcal T V - \\mathcal T U\\|_\\infty \\le \\gamma\\|V-U\\|_\\infty$. A contraction on a complete space has a unique fixed point, reached geometrically at rate $\\gamma$.",
  },
];
