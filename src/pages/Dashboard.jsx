import { useMemo } from 'react'
import { useApp } from '../context/useApp'
import { SummaryCards } from '../components/cards/SummaryCards'
import { BalanceChart } from '../components/charts/BalanceChart'
import { CategoryChart } from '../components/charts/CategoryChart'
import { InsightsSection } from '../components/insights/InsightsSection'
import { DashboardHeader } from '../components/layout/DashboardHeader'
import { TransactionTable } from '../components/transactions/TransactionTable'
import { Toast } from '../components/ui/Toast'
import { useTransactions } from '../hooks/useTransactions'
import { MONTH_BALANCE } from '../data/mockData'
import { getChartPoints, getDashboardInsights } from '../utils/calculations'

export function Dashboard() {
  const { transactions, loading, toast } = useApp()
  const { filteredTransactions } = useTransactions()

  const today = useMemo(
    () => new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date()),
    [],
  )

  const chartPoints = useMemo(() => getChartPoints(MONTH_BALANCE), [])

  const {
    stats,
    breakdown,
    highestSpending,
    monthlyDelta,
    monthlyPercentChange,
    savingsRatePercent,
    savingsRateRounded,
  } = useMemo(() => getDashboardInsights(filteredTransactions), [filteredTransactions])

  if (loading) {
    return (
      <main className="dashboard dashboard--loading">
        <div className="loading-state" role="status" aria-live="polite" aria-busy="true">
          <div className="loading-spinner" />
          <p className="loading-text">Loading dashboard…</p>
        </div>
      </main>
    )
  }

  return (
    <main className="dashboard">
      <DashboardHeader
        today={today}
        recordCount={transactions.length}
        visibleCount={filteredTransactions.length}
        savingsRate={savingsRateRounded}
      />

      <SummaryCards stats={stats} />

      <section className="viz-grid" aria-label="Charts">
        <BalanceChart chartPoints={chartPoints} />
        <CategoryChart breakdown={breakdown} />
      </section>

      <TransactionTable />

      <InsightsSection
        highestSpending={highestSpending}
        monthlyDelta={monthlyDelta}
        monthlyPercentChange={monthlyPercentChange}
        savingsRatePercent={savingsRatePercent}
        stats={stats}
      />

      <Toast message={toast} />
    </main>
  )
}
