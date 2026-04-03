import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BASE_TRANSACTIONS, STORAGE_KEYS } from '../data/mockData'
import { AppContext } from './dashboardContext'

const INITIAL_FILTERS = {
  search: '',
  type: 'all',
  sortBy: 'latest',
}

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

export function AppProvider({ children }) {
  const [role, setRole] = useState(() => localStorage.getItem(STORAGE_KEYS.role) || 'viewer')
  const [transactions, setTransactions] = useState(loadTransactions)
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_KEYS.theme) || 'dark')
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [toast, setToast] = useState('')
  const [loading, setLoading] = useState(true)
  const toastTimeoutRef = useRef(null)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 750)
    return () => window.clearTimeout(t)
  }, [])

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

  const patchFilters = useCallback((patch) => {
    setFilters((f) => ({ ...f, ...patch }))
  }, [])

  const showToast = useCallback((message, durationMs = 2200) => {
    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current)
    setToast(message)
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast('')
      toastTimeoutRef.current = null
    }, durationMs)
  }, [])

  const addQuickExpense = useCallback(() => {
    if (role !== 'admin') return
    setTransactions((current) => {
      const row = {
        id: nextTransactionId(current),
        date: new Date().toISOString().slice(0, 10),
        amount: 60,
        category: 'Misc',
        type: 'expense',
        note: 'Quick add by admin',
      }
      return [row, ...current]
    })
    showToast('Transaction added')
  }, [role, showToast])

  const updateTransaction = useCallback(
    (id, next) => {
      if (role !== 'admin') return
      const type = next.type === 'income' || next.type === 'expense' ? next.type : 'expense'
      setTransactions((current) =>
        current.map((t) =>
          t.id === id ? { ...t, ...next, type, amount: Math.max(0, Number(next.amount) || 0) } : t,
        ),
      )
      showToast('Transaction updated')
    },
    [role, showToast],
  )

  const deleteTransaction = useCallback(
    (id) => {
      if (role !== 'admin') return
      setTransactions((current) => current.filter((t) => t.id !== id))
      showToast('Transaction removed')
    },
    [role, showToast],
  )

  const value = useMemo(
    () => ({
      role,
      setRole,
      transactions,
      setTransactions,
      theme,
      setTheme,
      filters,
      patchFilters,
      loading,
      toast,
      showToast,
      addQuickExpense,
      updateTransaction,
      deleteTransaction,
    }),
    [
      role,
      transactions,
      theme,
      filters,
      loading,
      toast,
      patchFilters,
      showToast,
      addQuickExpense,
      updateTransaction,
      deleteTransaction,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
