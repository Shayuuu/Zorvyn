import { currency } from '../utils/currency'

export function SummaryCards({ stats }) {
  return (
    <section className="summary-grid" aria-label="Financial summary">
      <article className="card stat-card stat-card--balance">
        <p className="stat-title">Total Balance</p>
        <h2 className="stat-value">{currency.format(stats.balance)}</h2>
        <span className="stat-note">Net position this month</span>
      </article>
      <article className="card stat-card stat-card--income">
        <p className="stat-title">Total Income</p>
        <h2 className="stat-value income">{currency.format(stats.income)}</h2>
        <span className="stat-note">All income sources</span>
      </article>
      <article className="card stat-card stat-card--expense">
        <p className="stat-title">Total Expenses</p>
        <h2 className="stat-value expense">{currency.format(stats.expense)}</h2>
        <span className="stat-note">Operational + lifestyle costs</span>
      </article>
    </section>
  )
}
