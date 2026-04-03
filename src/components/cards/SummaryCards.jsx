import { currency } from '../../utils/currency'
import { SummaryCard } from './SummaryCard'

export function SummaryCards({ stats }) {
  return (
    <section className="summary-grid" aria-label="Financial summary">
      <SummaryCard title="Total Balance" value={currency.format(stats.balance)} note="Net position this month" />
      <SummaryCard
        title="Total Income"
        value={currency.format(stats.income)}
        note="All income sources"
        variant="income"
      />
      <SummaryCard
        title="Total Expenses"
        value={currency.format(stats.expense)}
        note="Operational + lifestyle costs"
        variant="expense"
      />
    </section>
  )
}
