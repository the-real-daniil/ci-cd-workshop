# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React Todo List app used as a teaching project for a CI/CD workshop with GitHub Actions. The app is in Russian (UI text and comments).

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server (localhost:5173) |
| `npm run build` | Type-check with tsc then build with Vite |
| `npm run lint` | ESLint with `--max-warnings 0` (zero warnings allowed) |
| `npm run type-check` | TypeScript type checking (`tsc --noEmit`) |
| `npm run test` | Run all tests once with Vitest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Tests with v8 coverage report |

To run a single test file: `npx vitest run src/utils/filterTodos.test.ts`

## Tech Stack

- React 18 + TypeScript, built with Vite
- Vitest + @testing-library/react for testing (jsdom environment, globals enabled)
- ESLint flat config with typescript-eslint, react-hooks, and react-refresh plugins
- Test setup file: `src/test-setup.ts`

## Architecture

Single-page Todo app with all state managed in `App.tsx` via `useState`. No routing, no state management library, no backend.

- `src/types/todo.ts` — `Todo` and `FilterType` type definitions
- `src/utils/filterTodos.ts` — Pure functions for filtering/counting todos (unit-tested)
- `src/components/` — Presentational components (`TodoItem`, `TodoList`, `AddTodoForm`, `FilterButtons`)
- Props flow down from `App.tsx`; callbacks (`onAdd`, `onToggle`, `onDelete`) flow up

## CI/CD Workflows

Six GitHub Actions workflow files in `.github/workflows/` representing progressive workshop iterations:
- `ci-1-hello-pipeline.yml` through `ci-3-optimized.yml` — CI iterations (basic → full → parallel jobs with artifacts)
- `cd-1-github-pages.yml` through `cd-3-staging-production.yml` — CD iterations (GitHub Pages → VPS via SSH → staging/production environments with approval gates)

## TypeScript Config

Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`. Target ES2020.
