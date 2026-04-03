export function SummaryCard({ title, value, note, variant = 'balance' }) {
  return (
    <article className={`card stat-card stat-card--${variant}`}>
      <p className="stat-title">{title}</p>
      <h2 className={`stat-value ${variant === 'income' ? 'income' : ''} ${variant === 'expense' ? 'expense' : ''}`}>
        {value}
      </h2>
      {note ? <span className="stat-note">{note}</span> : null}
    </article>
  )
}
