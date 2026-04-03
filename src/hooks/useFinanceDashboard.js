import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BASE_TRANSACTIONS, MONTH_BALANCE, STORAGE_KEYS } from '../data/mockData'

function loadTransactions() {
  const saved = localStorage.getItem(STORAGE_KEYS.transactions)
  if (!saved) return BASE_TRANSACTIONS

  try {
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : BASE_TRANSACTIONS
  } catch {
    return BASE_TRANSACTIONS
  }
}

function nextTransactionId(list) {
  return list.reduce((max, t) => Math.max(max, t.id ?? 0), 0) + 1
}

export function useFinanceDashboard() {
  const [role, setRole] = useState(() => localStorage.getItem(STORAGE_KEYS.role) || 'viewer')
  const [transactions, setTransactions] = useState(loadTransactions)
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_KEYS.theme) || 'dark')
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [toast, setToast] = useState('')
  const toastTimeoutRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.role, role)
  }, [role])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, theme)
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current)
    }
  }, [])

  const showToast = useCallback((message, durationMs = 2200) => {
    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current)
    setToast(message)
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast('')
      toastTimeoutRef.current = null
    }, durationMs)
  }, [])

  const filteredTransactions = useMemo(() => {
    const searched = transactions.filter((transaction) => {
      const target = `${transaction.category} ${transaction.note}`.toLowerCase()
      return target.includes(searchTerm.toLowerCase())
    })

    const filtered = searched.filter((transaction) => {
      if (typeFilter === 'all') return true
      return transaction.type === typeFilter
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.date) - new Date(a.date)
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date)
      if (sortBy === 'amountHigh') return b.amount - a.amount
      return a.amount - b.amount
    })
  }, [transactions, searchTerm, typeFilter, sortBy])

  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0)

    const totalExpense = transactions
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0)

    return {
      income: totalIncome,
      expense: totalExpense,
      balance: totalIncome - totalExpense,
    }
  }, [transactions])

  const breakdown = useMemo(() => {
    const categoryMap = transactions
      .filter((item) => item.type === 'expense')
      .reduce((map, item) => {
        map[item.category] = (map[item.category] || 0) + item.amount
        return map
      }, {})

    const total = Object.values(categoryMap).reduce((sum, amount) => sum + amount, 0)

    return Object.entries(categoryMap)
      .map(([category, amount]) => ({
        category,
        amount,
        percent: total ? Math.round((amount / total) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount)
  }, [transactions])

  const chartPoints = useMemo(() => {
    const chartMin = Math.min(...MONTH_BALANCE)
    const chartMax = Math.max(...MONTH_BALANCE)
    return MONTH_BALANCE.map((value, index) => {
      const x = (index / (MONTH_BALANCE.length - 1)) * 100
      const y = ((chartMax - value) / (chartMax - chartMin || 1)) * 80 + 10
      return `${x},${y}`
    }).join(' ')
  }, [])

  const addQuickExpense = useCallback(() => {
    if (role !== 'admin') return
    setTransactions((current) => {
      const simulatedTransaction = {
        id: nextTransactionId(current),
        date: new Date().toISOString().slice(0, 10),
        amount: 60,
        category: 'Misc',
        type: 'expense',
        note: 'Quick add by admin',
      }
      return [simulatedTransaction, ...current]
    })
  }, [role])

  const highestSpending = breakdown[0]
  const currentMonthSpending = useMemo(
    () =>
      transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0),
    [transactions],
  )
  const previousMonthSpending = 980
  const monthlyDelta = currentMonthSpending - previousMonthSpending
  const today = useMemo(
    () => new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date()),
    [],
  )
  const savingsRate = stats.income ? Math.round((stats.balance / stats.income) * 100) : 0

  return {
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
  }
}
