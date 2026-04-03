# Finance Dashboard UI (Job Assessment)

A responsive **React + Vite** finance dashboard built for a frontend take-home: clear information hierarchy, mock data, interactive transactions, simulated roles, and documented structure for reviewers.

## Quick start (for recruiters)

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173`).

**30-second demo path**

1. Scan summary cards and both charts (trend + category breakdown).
2. Use **search**, **type filter**, and **sort** on transactions.
3. Switch **Role** to **Admin** → **Add transaction** → watch totals and charts update.
4. **Export CSV** → confirm toast feedback; file matches the **currently filtered** rows.
5. Toggle **Theme** and resize the window to check responsiveness.

**Production build**

```bash
npm run build
npm run preview
```

## Deployment (optional)

This is a static SPA after `npm run build`. Deploy the `dist` folder to any static host, for example:

- [Vercel](https://vercel.com): import repo, framework preset Vite, build `npm run build`, output `dist`.
- [Netlify](https://www.netlify.com): same build command and publish directory `dist`.

Add your live URL at the top of this README when you submit.

## Architecture (why this structure)

| Area | Choice |
|------|--------|
| **Components** | Small presentational sections (`DashboardHeader`, `SummaryCards`, `ChartsSection`, `TransactionsSection`, `InsightsSection`, `Toast`) for readability and reuse. |
| **State** | `useFinanceDashboard` hook owns transactions, role, theme, filters, derived metrics, and persistence side effects. |
| **Data** | `src/data/mockData.js` — easy to swap for an API later. |
| **Utils** | `currency` (INR / `en-IN`) and CSV helpers keep UI components thin. |

This maps directly to typical evaluation criteria: **modularity**, **separation of concerns**, and **scalability** without over-engineering.

## Requirements checklist

### 1) Dashboard overview

- Summary: **Total Balance**, **Income**, **Expenses**
- Time-based: **6-month balance trend** (SVG)
- Categorical: **spending by category** (bars)

### 2) Transactions

- Columns: date, category, type, amount (INR), note
- **Search**, **filter** (all / income / expense), **sort** (latest, oldest, amount)
- Empty state when nothing matches

### 3) Role-based UI (frontend only)

- **Viewer**: read-only; **Add transaction** disabled with tooltip hint
- **Admin**: can add a quick mock expense (IDs stay unique even after deletes/reloads of custom data)

### 4) Insights

- Top expense category
- Month-over-month spending delta (mock baseline for “last month”)
- Rule-based observation from income vs expenses

### 5) State management

- React `useState` + `useMemo` for derived lists and aggregates
- `useEffect` for `localStorage` sync (role, theme, transactions)
- Toast timeout cleared on unmount to avoid leaks

### 6) UI / UX

- Card layout, responsive grids, focus styles, table caption, `aria-live` on toast
- `prefers-reduced-motion` reduces hover motion
- Dark / light theme toggle

### Optional enhancements included

- **localStorage** persistence
- **CSV export** of filtered rows + success toast
- **INR** formatting throughout

## Honest note

No submission can guarantee a hire outcome. This README and structure are meant to make **review fast and fair**: requirements are traceable, the demo path is short, and the code is organized for a senior engineer to skim in minutes.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint |
