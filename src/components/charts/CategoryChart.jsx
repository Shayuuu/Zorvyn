import { currency } from '../../utils/currency'

export function CategoryChart({ breakdown }) {
  return (
    <article className="card chart-card">
      <div className="card-head">
        <h3>Spending Breakdown</h3>
        <span>By category · matches table filters</span>
      </div>
      {breakdown.length ? (
        <div className="bars">
          {breakdown.map((entry, index) => (
            <div key={entry.category} className="bar-row">
              <div className="bar-meta">
                <span className="bar-label">
                  <span className="bar-dot" style={{ '--i': index }} aria-hidden="true" />
                  {entry.category}
                </span>
                <span className="bar-amount">{currency.format(entry.amount)}</span>
              </div>
              <div className="track" role="presentation">
                <div className="fill" style={{ width: `${entry.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty">No expense data to display.</p>
      )}
    </article>
  )
}
