# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

LexTrial — a Spanish-language interactive litigation training / mock-trial simulator ("Plataforma interactiva de entrenamiento de litigio y simulación de juicios con inteligencia artificial"). Built as a Google AI Studio app (see `metadata.json`).

## Commands

- `npm install` — install dependencies
- `npm run dev` — start Vite dev server on port 3000, host 0.0.0.0
- `npm run build` — production build (`vite build`)
- `npm run preview` — preview the production build
- `npm run lint` — type-check only, no test suite exists (`tsc --noEmit`)
- `npm run clean` — removes `dist` and `server.js`

There is no test runner configured in this repo.

## Architecture

Single-page React 19 + TypeScript + Tailwind v4 app, no backend/router — everything lives client-side in one React tree rooted at `src/main.tsx` → `src/App.tsx`.

- **View routing is manual state, not a router.** `App.tsx` holds `currentView` (`'despacho' | 'arena' | 'locker' | 'perfil'`) and conditionally renders `Dashboard`, `Arena`, `Locker`, or `Profile` inside `<main>`. `Sidebar`/`Header` call `onViewChange` to switch views. Modals (`CaseDossierModal`, `NewCaseModal`) are rendered as siblings, controlled by separate state (`selectedCaseForDossier`, `showNewCaseModal`).
- **All app state is lifted to `App.tsx`** and passed down as props: `cases`, `recentCases`, `userProgress`. There is no context, store, or state library. Child components report actions back up via callback props (`onSelectCase`, `onSimulationComplete`, `onCaseGenerated`, `onUpdateProgress`, etc.) rather than mutating state directly.
- **Domain types** are centralized in `src/types.ts` (`Case`, `Evidence`, `Testimony`, `SimulationScenario`, `SimulationQuestion`, `RecentCase`, `UserProgress`). Any new fields on these shapes ripple through `data/cases.ts` and every component that consumes them.
- **Seed case data** lives in `src/data/cases.ts` as a static `casesData` array conforming to `Case`.
- **The "IA" (AI) features are currently simulated, not wired to a real model.** Despite `@google/genai` being a dependency and `GEMINI_API_KEY`/`APP_URL` being defined in `.env.example`, nothing in `src/` currently imports `@google/genai` or reads those env vars. `NewCaseModal`'s "case generation" and `Arena`'s free-text witness responses (`handleCustomSubmit`) are both hardcoded/keyword-matched mocks using `setTimeout` to fake latency. If asked to make these features "actually" call Gemini, this is genuinely new wiring, not a fix to existing broken integration.
- **`Arena.tsx`** is the core simulation engine: manages conversation history, live scoring metrics (`efficacy`, `legalTech`, `oratory`), branching dialogue via `SimulationQuestion` options, free-text input with a simple Spanish keyword router, and an objection sub-flow (`handleTriggerObjection`) with hardcoded correctness rules per case ID (e.g. `homicidio-calificado`). Scoring on finish (`handleFinishGame`) maps a 0–100 average to `Absolución` / `Apelación` / `Condena`.
- **Path alias**: `@/*` maps to the repo root (see `tsconfig.json` and `vite.config.ts`), not `src/*`.
- **Styling**: Tailwind v4 via `@tailwindcss/vite` plugin (no `tailwind.config.js` — v4 uses CSS-based config, check `src/index.css`). All UI text/labels are in Spanish.
- **`express` is a dependency but there is no server file in this repo** — `npm run clean` references a `server.js` that doesn't currently exist, suggesting server-side rendering/API proxying may be added later via AI Studio's Cloud Run deployment path.
