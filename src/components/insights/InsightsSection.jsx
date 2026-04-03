import { currency } from '../../utils/currency'
import { InsightsCard } from './InsightsCard'

export function InsightsSection({
  highestSpending,
  monthlyDelta,
  monthlyPercentChange,
  savingsRatePercent,
  stats,
}) {
  return (
    <section className="card insights" aria-labelledby="insights-heading">
      <div className="insights-head">
        <h3 id="insights-heading">Insights</h3>
        <span className="insights-tag">Matches table filters</span>
      </div>
      <ul className="insights-list">
        <InsightsCard>
          Highest spending category:{' '}
          <strong>
            {highestSpending ? `${highestSpending.category} (${currency.format(highestSpending.amount)})` : 'N/A'}
          </strong>
        </InsightsCard>
        <InsightsCard>
          Monthly comparison vs last month:{' '}
          <strong>
            {monthlyPercentChange >= 0 ? '↑' : '↓'} {Math.abs(monthlyPercentChange).toFixed(1)}%
          </strong>{' '}
          <span className="insights-sub">
            ({monthlyDelta >= 0 ? '+' : '-'}
            {currency.format(Math.abs(monthlyDelta))} spend)
          </span>
        </InsightsCard>
        <InsightsCard>
          Savings rate: <strong>{savingsRatePercent.toFixed(1)}%</strong>{' '}
          <span className="insights-sub">of income retained after expenses</span>
        </InsightsCard>
        <InsightsCard>
          Observation:{' '}
          <strong>
            {stats.income > stats.expense
              ? 'Income currently exceeds spending. Savings trend is positive.'
              : 'Expenses are higher than income. Review high-cost categories.'}
          </strong>
        </InsightsCard>
      </ul>
    </section>
  )
}
