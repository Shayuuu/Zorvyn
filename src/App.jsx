import { useCallback } from 'react'
import { ChartsSection } from './components/ChartsSection'
import { DashboardHeader } from './components/DashboardHeader'
import { InsightsSection } from './components/InsightsSection'
import { SummaryCards } from './components/SummaryCards'
import { Toast } from './components/Toast'
import { TransactionsSection } from './components/TransactionsSection'
import { useFinanceDashboard } from './hooks/useFinanceDashboard'
import { buildTransactionsCsv, downloadCsvFile } from './utils/csv'

function App() {
  const {
    role,
    setRole,
    theme,
    setTheme,
    transactions,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
    toast,
    showToast,
    filteredTransactions,
    stats,
    breakdown,
    chartPoints,
    addQuickExpense,
    highestSpending,
    monthlyDelta,
    today,
    savingsRate,
  } = useFinanceDashboard()

  const handleExportCsv = useCallback(() => {
    if (!filteredTransactions.length) return
    const csv = buildTransactionsCsv(filteredTransactions)
    downloadCsvFile(csv)
    showToast(`Exported ${filteredTransactions.length} transaction(s) to CSV`)
  }, [filteredTransactions, showToast])

  return (
    <main className="dashboard">
      <DashboardHeader
        today={today}
        recordCount={transactions.length}
        savingsRate={savingsRate}
        theme={theme}
        setTheme={setTheme}
        role={role}
        setRole={setRole}
      />

      <SummaryCards stats={stats} />

      <ChartsSection chartPoints={chartPoints} breakdown={breakdown} />

      <TransactionsSection
        role={role}
        filteredTransactions={filteredTransactions}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onAddTransaction={addQuickExpense}
        onExportCsv={handleExportCsv}
      />

      <InsightsSection highestSpending={highestSpending} monthlyDelta={monthlyDelta} stats={stats} />

      <Toast message={toast} />
    </main>
  )
}

export default App
