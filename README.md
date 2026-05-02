# keep-learning

A self-paced interactive ebook for learning mathematics, physics, and applied
quant. Two complete curricula, KaTeX-rendered prose with embedded widgets,
mobile-friendly, installable as a PWA, fully offline-capable.

This is my **public learning notebook**. Single-page React app, no backend, no
account, no telemetry — everything is yours and lives in `localStorage`.

---

## Pathways

The home screen is a pathway picker. There are two:

### Numbers → Quantum — 16 modules

The classic MIT math + physics path, written from the ground up to close the
loop on *why ECDSA breaks under Shor's algorithm*.

| #     | Module                          | Reference course / book                  |
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

### ML × Market Microstructure — 8 modules

A focused 8-week refresher built around MML, Wasserman, *Trades, Quotes &
Prices*, and Cartea-Jaimungal-Penalva. Climaxes with the propagator model,
Almgren-Chriss optimal execution, and Avellaneda-Stoikov market making.

| #     | Module                          | Primary references                        |
|-------|---------------------------------|-------------------------------------------|
| I     | Linear Algebra Foundations      | MIT 18.06 · MML Ch 2 · 3B1B EOLA          |
| II    | Eigenvalues, SVD & Decompositions | MIT 18.06 · MML Ch 3–4                  |
| III   | Matrix Calculus & Least Squares | MML Ch 5 · *Matrix Cookbook*              |
| IV    | Probability Foundations         | Blitzstein · Wasserman 1–5 · MML Ch 6     |
| V     | Statistical Inference           | Wasserman 9–10 · Murphy Ch 4              |
| VI    | Machine Learning                | MML Ch 9–10 · Murphy Ch 10–11             |
| VII   | Stochastic Calculus             | Shreve Vol I–II                           |
| VIII  | Market Microstructure           | TQP · Cartea-Jaimungal-Penalva            |

Each chapter is real prose (not just an outline): typically 6–8 named parts,
embedded `BlockMath` / `InlineMath`, callouts and pitfalls, at least one
collapsible exercise, and a 5-question quiz at the end. Both pathways are
written end-to-end.

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

## Features

- **KaTeX math** — inline `$x$` and block `$$ x $$`, mixed freely with prose.
  Long inline math is wrapped in a horizontally-scrollable inline-block so it
  never breaks mobile layout.
- **Interactive widgets** — embedded directly in chapters where a static page
  wouldn't cut it (sliders, drag-points, plots, animations).
- **PWA, offline-capable** — full curriculum (~3 MB / ~600 KB gzipped)
  precached by Workbox. Install via the in-page banner ("Tap Share → Add to
  Home Screen" on iOS, native prompt on Chrome/Android). Once installed,
  works without connectivity.
- **Reading settings** — font (Newsreader / Lora / Source Sans 3 / System),
  size (Small / Medium / Large / X-Large), line spacing (Snug / Normal /
  Relaxed). Applied via CSS variables, persisted in `localStorage`,
  pre-applied before React mounts so there's no flash.
- **Per-pathway progress tracking** — completion stored as
  `module/chapter/lesson` keys; each pathway has its own dashboard with
  streak counter, percent done, and per-module bars.
- **Resume where you left off** — `lastVisited` records pathway + module +
  chapter + scroll position. The dashboard surfaces a "Continue reading"
  card; opening the chapter restores scroll.
- **Tablet sidebar collapse** — desktop sidebar collapses to a 48-px strip
  with a chevron toggle. Persisted across sessions.
- **Light + dark themes** — paper-like warm cream for light, warm charcoal
  for dark. No flash of wrong theme on load.
- **Mobile-first** — safe-area inset support, dvh heights, 44-px taps,
  drawer sidebar.

To wipe progress, run in the browser console:

```js
localStorage.removeItem("learning.progress.v1")
localStorage.removeItem("learning.reading.v1")
localStorage.removeItem("learning.sidebar.v1")
localStorage.removeItem("learning.install-banner.v1")
```

---

## Routing

```
/                                                        → pathway picker
/<pathwayId>                                             → pathway dashboard
/<pathwayId>/module/<moduleId>                           → module page (chapter list)
/<pathwayId>/module/<moduleId>/chapter/<chapterId>       → full chapter
```

`pathwayId` is `quantum` or `ml`. Legacy `/module/...` URLs from the
pre-pathway era redirect to `/quantum/...` so old bookmarks still work.

---

## Tech stack

| Concern         | Choice                              |
|-----------------|-------------------------------------|
| Bundler / dev   | Vite 5 + `@vitejs/plugin-react`     |
| UI              | React 18 + TypeScript               |
| Styling         | Tailwind CSS 3                      |
| Math            | KaTeX via `react-katex`             |
| Routing         | `react-router-dom` v6               |
| Icons           | `lucide-react`                      |
| PWA             | `vite-plugin-pwa` + Workbox         |
| Persistence     | `localStorage`                      |
| Hosting         | Vercel (any static host works)      |

Chapter bodies are lazy-loaded via dynamic imports — first page load only
ships the shell + the chapter you're reading. KaTeX CSS, Inter (rsms.me), and
Google Fonts (Newsreader / Lora / Source Sans 3) are runtime-cached by the
service worker so chosen typography is available offline after first load.

---

## Project layout

```
.
├── index.html
├── package.json
├── vite.config.ts                ← VitePWA config + runtime caching rules
├── tailwind.config.js
├── tsconfig.json
├── public/
│   ├── favicon.svg               ← master vector logo
│   ├── pwa-192x192.png           ← Android home-screen icon
│   ├── pwa-512x512.png           ← splash / maskable
│   └── apple-touch-icon.png      ← iOS Add-to-Home-Screen
└── src/
    ├── main.tsx                  ← React root + KaTeX CSS + boot reading settings
    ├── App.tsx                   ← layout shell, routes, mobile drawer, banner
    ├── index.css                 ← Tailwind + theme vars + .ebook + .chapter-px
    ├── types.ts                  ← Pathway / Module / Chapter / Lesson / Resource
    ├── data/
    │   ├── pathways.ts           ← combines both pathways
    │   ├── syllabus.ts           ← Quantum pathway (16 modules, ordered)
    │   ├── 01-foundations.ts     ← detailed module data files
    │   ├── 02-calculus.ts
    │   ├── 03-linear-algebra.ts
    │   ├── 04-multivar.ts
    │   ├── skeletons.ts          ← skeleton helpers + remaining quantum modules
    │   └── ml-skeletons.ts       ← all 8 ML pathway modules
    ├── content/                  ← lazy-imported chapter bodies (~91 .tsx files)
    │   ├── registry.ts           ← maps "module/chapter" keys to dynamic imports
    │   ├── foundations/          ← Quantum Module I chapters
    │   ├── calculus/             ← Quantum Module II
    │   ├── linear-algebra/       ← Quantum Module III
    │   ├── multivariable/        ← Quantum Module IV
    │   ├── ...                   ← remaining quantum-pathway modules
    │   ├── linalg-ml/            ← ML Module I
    │   ├── eigen-svd/            ← ML Module II
    │   ├── matrix-calc/          ← ML Module III
    │   ├── prob-foundations/     ← ML Module IV
    │   ├── stat-inference/       ← ML Module V
    │   ├── ml-fundamentals/      ← ML Module VI
    │   ├── stoch-calc/           ← ML Module VII
    │   └── microstructure/       ← ML Module VIII
    ├── hooks/
    │   ├── useProgress.ts        ← localStorage state + streak + lastVisited
    │   ├── useReadingSettings.ts ← font / size / line-height + CSS-var apply
    │   └── useSidebar.ts         ← desktop collapse state
    ├── components/
    │   ├── Sidebar.tsx           ← desktop persistent + mobile drawer + collapsed strip
    │   ├── ThemeToggle.tsx
    │   ├── ReadingSettings.tsx   ← popover with font/size/line-height controls
    │   ├── InstallBanner.tsx     ← PWA install prompt (dismissable, 30-day cooldown)
    │   ├── Quiz.tsx              ← end-of-chapter MCQ
    │   ├── Ebook.tsx             ← Callout / Pitfall / Exercise / ReferenceResources
    │   └── MathBlock.tsx         ← KaTeX renderer for $...$ / $$...$$
    └── pages/
        ├── PathwayHome.tsx       ← / — pathway picker
        ├── Dashboard.tsx         ← /:pathwayId — pathway dashboard
        ├── ModulePage.tsx        ← /:pathwayId/module/:moduleId
        └── ChapterPage.tsx       ← /:pathwayId/module/:moduleId/chapter/:chapterId
```

---

## Authoring workflow

### Adding a chapter to an existing module

1. Write `src/content/<module-id>/<chapter-id>.tsx` exporting:
   - `default` — a React body component (use `Callout`, `Pitfall`,
     `Exercise`, `ReferenceResources` from `components/Ebook` to keep
     consistent styling)
   - `quiz` — a `QuizQuestion[]` of 4–6 multiple-choice questions
2. Register the chapter in `src/content/registry.ts`:
   ```ts
   "<module-id>/<chapter-id>": () => import("./<module-id>/<chapter-id>"),
   ```
3. Reload — the chapter shows up automatically with an "Interactive" badge
   on the module page. Lesson titles, hours, and resources come from the
   skeleton in `src/data/`.

### Adding a module

1. Add a `Module` definition (see `01-foundations.ts` for full shape, or
   `skeletons.ts` for the lightweight stub helper).
2. Insert into the appropriate pathway in `src/data/pathways.ts`.
3. Module IDs must be **globally unique across pathways** (progress keys are
   flat). The ML pathway uses prefixed names like `linalg-ml`, `eigen-svd`
   to avoid colliding with the quantum pathway's `linear-algebra`.

### Authoring rules I learned the hard way

- **Don't put `$...$` in JSX headings** — JSX interprets `{x}` as a JS
  expression. Use `<InlineMath math="..." />` inside `<h2>` / `<h3>`.
- **Long inline math** is wrapped to be horizontally-scrollable
  (`.ebook .katex { display: inline-block; max-width: 100%; overflow-x: auto }`) —
  keeps mobile layout intact even with 200-char Hamilton-flow expressions.
- **Article width** uses `chapter-px` (1 rem mobile / 1.75 rem sm /
  2.5 rem lg) and `w-full min-w-0` to flex-shrink properly inside the
  flex-column main element.

---

## Deploying

The repo is set up for Vercel (`vercel.json` not needed — Vercel detects
Vite). Any static host works:

```bash
pnpm build
# upload dist/ to Vercel / Cloudflare Pages / Netlify / S3 / GitHub Pages
```

The PWA service worker requires HTTPS (or `localhost`). HTTP-only hosts
won't activate the service worker, so install/offline won't work — but the
site will still render fine.

---

## License

[MIT](./LICENSE) — use it, fork it, learn from it.
