import { MONTH_LABELS } from '../data/mockData'
import { areaPathFromPolyline } from '../utils/chartPaths'
import { currency } from '../utils/currency'

export function ChartsSection({ chartPoints, breakdown }) {
  const areaPath = areaPathFromPolyline(chartPoints)

  return (
    <section className="viz-grid" aria-label="Charts">
      <article className="card chart-card">
        <div className="card-head">
          <h3>Balance Trend</h3>
          <span>Last 6 months</span>
        </div>
        <svg viewBox="0 0 100 100" className="line-chart" role="img" aria-label="Balance trend over six months">
          <defs>
            <linearGradient id="chartLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <linearGradient id="chartAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="chart-grid" aria-hidden="true">
            {[12, 32, 52, 72, 92].map((y) => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} />
            ))}
          </g>
          {areaPath ? <path className="line-chart-area" d={areaPath} fill="url(#chartAreaGrad)" /> : null}
          <polyline className="line-chart-line" points={chartPoints} fill="none" stroke="url(#chartLineGrad)" />
        </svg>
        <div className="axis-labels">
          {MONTH_LABELS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </article>

      <article className="card chart-card">
        <div className="card-head">
          <h3>Spending Breakdown</h3>
          <span>By category</span>
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
    </section>
  )
}
