# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint
npx tsc --noEmit # type-check only
```

## Architecture

Single-page Next.js 14 App Router app — everything lives on the root route (`app/page.tsx`).

**Data flow:** `useExpenses` hook (localStorage) → `page.tsx` → components. No server components, no API routes; all state is client-side.

**Key files:**
- `app/hooks/useExpenses.ts` — CRUD operations + localStorage persistence. Seeds sample data on first load.
- `app/types/expense.ts` — `Expense` and `ExpenseFilters` interfaces; `Category` union type.
- `app/page.tsx` — top-level state: filter state, modal open/close, wires all components together.

**Components:**
- `ExpenseForm` — modal form for add/edit with validation
- `ExpenseList` — filterable table with edit/delete actions
- `FilterBar` — search input + category select + date range pickers
- `SummaryCards` — 4 KPI cards (total, this month, top category, avg)
- `SpendingChart` — Recharts bar (monthly) + donut (by category)
- `CategoryBadge` — colored pill, driven by `CATEGORY_COLORS` map

**Utils:** `format.ts` (currency/date), `csv.ts` (client-side CSV export via Blob URL).
