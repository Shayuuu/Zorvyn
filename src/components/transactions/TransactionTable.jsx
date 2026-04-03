import { useCallback, useState } from 'react'
import { useApp } from '../../context/useApp'
import { AdminOnly } from '../guards/AdminOnly'
import { useTransactions } from '../../hooks/useTransactions'
import { buildTransactionsCsv, downloadCsvFile } from '../../utils/csv'
import { TransactionEditRow } from './TransactionEditRow'
import { TransactionFilters } from './TransactionFilters'
import { TransactionRow } from './TransactionRow'

export function TransactionTable() {
  const { role, transactions, addQuickExpense, updateTransaction, deleteTransaction, showToast } = useApp()
  const { filteredTransactions } = useTransactions()
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState(null)

  const isAdmin = role === 'admin'
  const isEditing = (id) => isAdmin && editingId === id

  const startEdit = (transaction) => {
    setEditingId(transaction.id)
    setDraft({ ...transaction })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setDraft(null)
  }

  const saveEdit = () => {
    if (!draft) return
    updateTransaction(draft.id, {
      date: draft.date,
      category: draft.category.trim() || 'Uncategorized',
      type: draft.type,
      amount: draft.amount,
      note: draft.note.trim() || '—',
    })
    cancelEdit()
  }

  const handleDelete = (id) => {
    if (window.confirm('Remove this transaction?')) {
      if (editingId === id) cancelEdit()
      deleteTransaction(id)
    }
  }

  const handleExportCsv = useCallback(() => {
    if (!filteredTransactions.length) return
    const csv = buildTransactionsCsv(filteredTransactions)
    downloadCsvFile(csv)
    showToast(`Exported ${filteredTransactions.length} transaction(s) to CSV`)
  }, [filteredTransactions, showToast])

  return (
    <section className="card" aria-labelledby="transactions-heading">
      <div className="card-head transactions-head">
        <h3 id="transactions-heading">Transactions</h3>
        <div className="actions">
          <span className="meta-chip table-chip" aria-live="polite">
            {filteredTransactions.length} visible
          </span>
          <AdminOnly>
            <button type="button" className="btn btn--primary" onClick={addQuickExpense}>
              Add transaction
            </button>
          </AdminOnly>
          <button
            type="button"
            className="btn btn--ghost"
            disabled={!filteredTransactions.length}
            onClick={handleExportCsv}
          >
            Export CSV
          </button>
        </div>
      </div>

      <TransactionFilters />

      {transactions.length === 0 ? (
        <div className="empty-state" role="status">
          <p className="empty-state-title">No transactions yet</p>
          <p className="empty-state-text">
            {isAdmin
              ? 'Use Add transaction to create your first entry, or reset local data in devtools to restore sample data.'
              : 'Switch to Admin to add data, or ask an admin to populate the ledger.'}
          </p>
        </div>
      ) : filteredTransactions.length ? (
        <div className="table-wrap">
          <table>
            <caption className="sr-only">
              Filtered transaction list. Amounts in Indian Rupees. {isAdmin ? 'Admin can edit or delete rows.' : ''}
            </caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Category</th>
                <th scope="col">Type</th>
                <th scope="col">Amount (INR)</th>
                <th scope="col">Note</th>
                {isAdmin ? <th scope="col">Actions</th> : null}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) =>
                isEditing(transaction.id) && draft ? (
                  <TransactionEditRow
                    key={transaction.id}
                    draft={draft}
                    setDraft={setDraft}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                  />
                ) : (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    showActions={isAdmin}
                    onEdit={startEdit}
                    onDelete={handleDelete}
                  />
                ),
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty">No transactions match this filter.</p>
      )}
    </section>
  )
}
