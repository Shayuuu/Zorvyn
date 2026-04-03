import { currency } from '../../utils/currency'

export function TransactionRow({ transaction, showActions, onEdit, onDelete }) {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.category}</td>
      <td>
        <span className={`pill ${transaction.type}`}>{transaction.type}</span>
      </td>
      <td>{currency.format(transaction.amount)}</td>
      <td>{transaction.note}</td>
      {showActions ? (
        <td>
          <div className="table-actions">
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => onEdit(transaction)}>
              Edit
            </button>
            <button type="button" className="btn btn--ghost btn--sm btn--danger" onClick={() => onDelete(transaction.id)}>
              Delete
            </button>
          </div>
        </td>
      ) : null}
    </tr>
  )
}
