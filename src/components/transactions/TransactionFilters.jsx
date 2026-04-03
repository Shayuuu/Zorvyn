import { useApp } from '../../context/useApp'

export function TransactionFilters() {
  const { filters, patchFilters } = useApp()

  return (
    <div className="filters">
      <label className="sr-only" htmlFor="search">
        Search transactions
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search category or note"
        value={filters.search}
        onChange={(event) => patchFilters({ search: event.target.value })}
        autoComplete="off"
      />

      <label className="sr-only" htmlFor="type-filter">
        Filter by type
      </label>
      <select id="type-filter" value={filters.type} onChange={(event) => patchFilters({ type: event.target.value })}>
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <label className="sr-only" htmlFor="sort">
        Sort transactions
      </label>
      <select id="sort" value={filters.sortBy} onChange={(event) => patchFilters({ sortBy: event.target.value })}>
        <option value="latest">Sort: Latest</option>
        <option value="oldest">Sort: Oldest</option>
        <option value="amountHigh">Sort: Amount high</option>
        <option value="amountLow">Sort: Amount low</option>
      </select>
    </div>
  )
}
