import { currency } from '../utils/currency'

export function InsightsSection({ highestSpending, monthlyDelta, stats }) {
  return (
    <section className="card insights" aria-labelledby="insights-heading">
      <div className="insights-head">
        <h3 id="insights-heading">Insights</h3>
        <span className="insights-tag">Auto-generated</span>
      </div>
      <ul className="insights-list">
        <li>
          Highest spending category:{' '}
          <strong>
            {highestSpending
              ? `${highestSpending.category} (${currency.format(highestSpending.amount)})`
              : 'N/A'}
          </strong>
        </li>
        <li>
          Monthly comparison:{' '}
          <strong>
            {monthlyDelta > 0 ? 'Up' : 'Down'} by {currency.format(Math.abs(monthlyDelta))}
          </strong>{' '}
          vs last month.
        </li>
        <li>
          Observation:{' '}
          <strong>
            {stats.income > stats.expense
              ? 'Income currently exceeds spending. Savings trend is positive.'
              : 'Expenses are higher than income. Review high-cost categories.'}
          </strong>
        </li>
      </ul>
    </section>
  )
}
