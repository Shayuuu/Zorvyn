import { useMemo } from 'react'
import { useApp } from '../context/useApp'
import { filterAndSortTransactions } from '../utils/calculations'

/**
 * Filtered + sorted ledger slice for tables and CSV export.
 * Business rules live in utils/calculations — this hook only wires Context → UI.
 */
export function useTransactions() {
  const { transactions, filters } = useApp()

  const filteredTransactions = useMemo(
    () => filterAndSortTransactions(transactions, filters),
    [transactions, filters],
  )

  return { filteredTransactions }
}
