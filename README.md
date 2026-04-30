# keep-learning

Interactive self-paced syllabus: logic → calculus → linear algebra → diff eq → quantum mechanics → quantum computing. KaTeX-rendered with embedded interactive widgets.

This is my **public learning notebook**. It's a single-page React app that I update as I work my way from elementary logic up through quantum computing. If it's useful to anyone else following the same path, even better.

---

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # production build → dist/
pnpm typecheck
```

Requires Node 18+ and [pnpm](https://pnpm.io).

---

## What's inside

A 16-tier curriculum modeled on the standard MIT math + physics path:

| Tier  | Module                          | Reference course / book                  |
|-------|---------------------------------|------------------------------------------|
| I     | Foundations                     | Khan Pre-Calc · Hammack *Book of Proof*  |
| II    | Single-Variable Calculus        | MIT 18.01 · Spivak                       |
| III   | Linear Algebra                  | MIT 18.06 (Strang) · 3B1B                |
| IV    | Multivariable Calculus          | MIT 18.02                                |
| V     | Differential Equations          | MIT 18.03                                |
| VI    | Number Theory                   | MIT 18.781                               |
| VII   | Probability & Statistics        | MIT 18.05                                |
| VIII  | Complex Analysis                | MIT 18.04                                |
| IX    | Real Analysis                   | MIT 18.100 · Rudin                       |
| X     | Abstract Algebra                | MIT 18.701/702 · Dummit & Foote          |
| XI    | Advanced Linear Algebra         | Axler · MIT 18.700/745                   |
| XII   | Classical Mechanics             | MIT 8.01 · 8.223 · Goldstein             |
| XIII  | Electromagnetism & Waves        | MIT 8.02 · 8.03 · Griffiths              |
| XIV   | Quantum Mechanics I             | MIT 8.04 · Griffiths                     |
| XV    | Quantum Mechanics II            | MIT 8.05 · Sakurai                       |
| XVI   | Quantum Information & Computing | MIT 6.S089 · Nielsen & Chuang            |

Each module has chapters → lessons. Lessons mix prose with inline `$...$` and block `$$...$$` LaTeX (rendered with KaTeX), topic chips, estimated study hours, and curated external resources (MIT OCW, 3Blue1Brown, Khan Academy, standard texts).

**Status:** Tiers I–IV ship with full lesson detail. V–XVI are skeletons (chapter outlines + topic lists) that I fill in as I get there.

---

## Features

- **KaTeX math rendering** — inline and block, mixed freely with prose.
- **Interactive widgets** — embedded directly in lessons where a static page wouldn't cut it.
- **Progress tracking** — per-lesson completion stored in `localStorage`.
- **Daily streak counter** — ticks every day you mark something complete; a 2-day gap resets it.
- **No backend, no account, no telemetry** — everything is client-side.

To wipe progress, run in the browser console:

```js
localStorage.removeItem("learning.progress.v1")
```

---

## Tech stack

| Concern         | Choice                              |
|-----------------|-------------------------------------|
| Bundler / dev   | Vite                                |
| UI              | React 18 + TypeScript               |
| Styling         | Tailwind CSS                        |
| Math            | KaTeX via `react-katex`             |
| Routing         | `react-router-dom` v6               |
| Icons           | `lucide-react`                      |
| Persistence     | `localStorage`                      |

---

## Project layout

```
.
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── public/
└── src/
    ├── main.tsx              ← React root + router + KaTeX CSS
    ├── App.tsx               ← layout shell + routes
    ├── index.css             ← Tailwind + globals
    ├── types.ts              ← Module / Chapter / Lesson / Resource
    ├── data/
    │   ├── syllabus.ts       ← ordered module registry
    │   ├── 01-foundations.ts
    │   ├── 02-calculus.ts
    │   ├── 03-linear-algebra.ts
    │   ├── 04-multivar.ts
    │   └── skeletons.ts      ← Tiers V–XVI (outline-only)
    ├── hooks/
    │   └── useProgress.ts    ← localStorage state + streak math
    ├── components/
    │   ├── Sidebar.tsx
    │   └── MathBlock.tsx     ← KaTeX renderer for $...$ / $$...$$
    └── pages/
        ├── Dashboard.tsx
        └── ModulePage.tsx
```

---

## Adding a module

1. Create `src/data/NN-my-module.ts` exporting a `Module` object — see `01-foundations.ts` for the full shape.
2. Import it in `src/data/syllabus.ts` at the correct tier position (or remove its stub from `skeletons.ts`).
3. Reload — sidebar, dashboard, and module page pick it up automatically.

The data model is plain typed objects — no CMS, no markdown pipeline. Adding lessons is just a data change.

---

## Roadmap

- [ ] Flesh out Tier VI — Number Theory (RSA + ECDSA mechanics)
- [ ] Flesh out Tiers XIV–XVI so the "why ECDSA breaks under Shor" arc is end-to-end
- [ ] Per-lesson notes field (free-text, also in `localStorage`)
- [ ] Heatmap calendar of study days (GitHub-style)
- [ ] Three.js widgets: vector fields, Bloch sphere, double-slit interference, QFT amplitude plots
- [ ] Export / import progress as JSON

---

## License

[MIT](./LICENSE) — use it, fork it, learn from it.
