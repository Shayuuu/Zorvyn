import { MONTH_BALANCE } from '../data/mockData'

/** Income, expense, and net balance from the full ledger. */
export function getSummary(transactions) {
  let income = 0
  let expense = 0

  for (const tx of transactions) {
    if (tx.type === 'income') income += tx.amount
    else expense += tx.amount
  }

  return {
    income,
    expense,
    balance: income - expense,
  }
}

/** Expense totals by category, sorted high → low, with share of total expense. */
export function getExpenseBreakdown(transactions) {
  const map = {}

  for (const tx of transactions) {
    if (tx.type === 'expense') {
      map[tx.category] = (map[tx.category] || 0) + tx.amount
    }
  }

  const total = Object.values(map).reduce((sum, n) => sum + n, 0)

  return Object.entries(map)
    .map(([category, amount]) => ({
      category,
      amount,
      percent: total ? Math.round((amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount)
}

/** Polyline points string for SVG viewBox 0 0 100 100. */
export function getChartPoints(series = MONTH_BALANCE) {
  if (!series.length) return ''
  const chartMin = Math.min(...series)
  const chartMax = Math.max(...series)
  return series
    .map((value, index) => {
      const x = (index / (series.length - 1)) * 100
      const y = ((chartMax - value) / (chartMax - chartMin || 1)) * 80 + 10
      return `${x},${y}`
    })
    .join(' ')
}

export function filterAndSortTransactions(transactions, filters) {
  const { search, type, sortBy } = filters

  const searched = transactions.filter((tx) => {
    const target = `${tx.category} ${tx.note}`.toLowerCase()
    return target.includes(search.toLowerCase())
  })

  const filtered = searched.filter((tx) => {
    if (type === 'all') return true
    return tx.type === type
  })

  return [...filtered].sort((a, b) => {
    if (sortBy === 'latest') return new Date(b.date) - new Date(a.date)
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date)
    if (sortBy === 'amountHigh') return b.amount - a.amount
    return a.amount - b.amount
  })
}

/**
 * Derived metrics for insights + summary cards context.
 * @param {number} previousMonthSpending — mock baseline for “last month” spend
 */
export function getDashboardInsights(transactions, previousMonthSpending = 980) {
  const stats = getSummary(transactions)
  const breakdown = getExpenseBreakdown(transactions)
  const highestSpending = breakdown[0] ?? null

  const currentMonthSpending = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const monthlyDelta = currentMonthSpending - previousMonthSpending
  const monthlyPercentChange =
    previousMonthSpending > 0
      ? ((currentMonthSpending - previousMonthSpending) / previousMonthSpending) * 100
      : 0

  const savingsRatePercent = stats.income > 0 ? ((stats.income - stats.expense) / stats.income) * 100 : 0
  const savingsRateRounded = Math.round(savingsRatePercent)

  return {
    stats,
    breakdown,
    highestSpending,
    monthlyDelta,
    monthlyPercentChange,
    savingsRatePercent,
    savingsRateRounded,
  }
}
