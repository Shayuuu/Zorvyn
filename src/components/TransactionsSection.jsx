import { currency } from '../utils/currency'

export function TransactionsSection({
  role,
  filteredTransactions,
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  sortBy,
  setSortBy,
  onAddTransaction,
  onExportCsv,
}) {
  return (
    <section className="card" aria-labelledby="transactions-heading">
      <div className="card-head transactions-head">
        <h3 id="transactions-heading">Transactions</h3>
        <div className="actions">
          <span className="meta-chip table-chip" aria-live="polite">
            {filteredTransactions.length} visible
          </span>
          <button
            type="button"
            className="btn btn--primary"
            disabled={role !== 'admin'}
            onClick={onAddTransaction}
            title={role !== 'admin' ? 'Switch role to Admin to add transactions' : undefined}
          >
            Add transaction
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            disabled={!filteredTransactions.length}
            onClick={onExportCsv}
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="filters">
        <label className="sr-only" htmlFor="search">
          Search transactions
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search category or note"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          autoComplete="off"
        />

        <label className="sr-only" htmlFor="type-filter">
          Filter by type
        </label>
        <select id="type-filter" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label className="sr-only" htmlFor="sort">
          Sort transactions
        </label>
        <select id="sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="latest">Sort: Latest</option>
          <option value="oldest">Sort: Oldest</option>
          <option value="amountHigh">Sort: Amount high</option>
          <option value="amountLow">Sort: Amount low</option>
        </select>
      </div>

      {filteredTransactions.length ? (
        <div className="table-wrap">
          <table>
            <caption className="sr-only">
              Filtered transaction list. Amounts in Indian Rupees.
            </caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Category</th>
                <th scope="col">Type</th>
                <th scope="col">Amount (INR)</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.category}</td>
                  <td>
                    <span className={`pill ${transaction.type}`}>{transaction.type}</span>
                  </td>
                  <td>{currency.format(transaction.amount)}</td>
                  <td>{transaction.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty">No transactions match this filter.</p>
      )}
    </section>
  )
}
