# Finance Dashboard

## Overview

Frontend-only finance dashboard to **track activity**, **visualize spending**, and **simulate role-based UI** (viewer vs admin). Structured for scalability: **Context** for global state, **pure utils** for business rules, **feature folders** for UI.

## Project structure

```
src/
├── context/
│   ├── dashboardContext.js  # createContext (separate file avoids Windows path case clash with AppContext.jsx)
│   ├── AppContext.jsx       # AppProvider — persistence, mutations, toast
│   └── useApp.js            # Consumer hook (satisfies react-refresh lint)
├── pages/
│   └── Dashboard.jsx      # Composes layout: header, cards, charts, table, insights, toast
├── hooks/
│   └── useTransactions.js # Filtered + sorted list (uses Context + calculations)
├── data/
│   └── mockData.js
├── utils/
│   ├── calculations.js    # getSummary, breakdown, filter/sort, chart points, insights bundle
│   ├── chartPaths.js
│   ├── csv.js
│   └── currency.js
├── components/
│   ├── cards/             # SummaryCard, SummaryCards
│   ├── charts/            # BalanceChart, CategoryChart
│   ├── transactions/      # TransactionFilters, TransactionRow, TransactionEditRow, TransactionTable
│   ├── insights/          # InsightsCard, InsightsSection
│   ├── layout/            # DashboardHeader
│   ├── guards/            # AdminOnly
│   └── ui/                # Toast
├── App.jsx                # AppProvider → Dashboard
└── main.jsx
```

## Features

- **Dashboard summary** — balance, income, expenses (INR / `en-IN`)
- **Charts** — 6-month balance trend (SVG, mock series); **category breakdown syncs with table filters** (search / type / sort)
- **Transactions** — search, type filter, sort; **Admin** add / inline edit / delete; **Viewer** read-only
- **`AdminOnly` guard** — wraps destructive or write actions
- **Insights** — top category, MoM % vs mock baseline, savings rate %, narrative
- **Persistence** — `localStorage` for transactions, role, theme
- **CSV export** — filtered rows + toast
- **Loading + empty states**, dark / light theme, responsive CSS

## Tech stack

- **React 19** + **Vite**
- **Context API** for global state (no Redux for this scope)
- **CSS** design tokens (no Tailwind)
- **SVG** charts (no Chart.js / Recharts)

## State management (interview story)

| Layer | Responsibility |
|--------|----------------|
| **`AppContext`** | Source of truth: `transactions`, `role`, `theme`, `filters`, persistence, `add` / `update` / `delete`, toast |
| **`utils/calculations.js`** | Pure functions: summaries, breakdown, `filterAndSortTransactions`, `getDashboardInsights`, `getChartPoints` |
| **`useTransactions`** | Subscribes to Context + exposes **filtered/sorted** rows for the table and CSV |
| **`Dashboard`** | `useMemo` + **`useTransactions()`** so summary cards, category chart, and insights reflect the **same filtered/sorted set** as the table (balance trend stays mock series for demo) |

**Lines you can say:**

- *“Global UI state lives in Context; domain logic is isolated in `calculations` so it’s testable and reusable.”*
- *“I used a custom hook to expose filtered transactions so tables stay dumb.”*
- *“RBAC is simulated with `role` plus an `AdminOnly` guard and conditional columns.”*

## How to run

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
npm run lint
```

## Deployment

Build outputs `dist/`. Deploy as a static site (Vercel, Netlify, etc.): build `npm run build`, publish `dist`.

---

**Reviewer demo:** **Role → Admin** → Add / Edit / Delete → Export CSV; toggle **Theme**; exercise **search + filters + sort**.
