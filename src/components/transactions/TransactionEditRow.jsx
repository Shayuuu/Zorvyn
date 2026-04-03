export function TransactionEditRow({ draft, setDraft, onSave, onCancel }) {
  return (
    <tr className="row-editing">
      <td>
        <input
          className="table-input"
          type="date"
          value={draft.date}
          onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
          aria-label="Edit date"
        />
      </td>
      <td>
        <input
          className="table-input"
          type="text"
          value={draft.category}
          onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
          aria-label="Edit category"
        />
      </td>
      <td>
        <select
          className="table-input table-input--select"
          value={draft.type}
          onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value }))}
          aria-label="Edit type"
        >
          <option value="income">income</option>
          <option value="expense">expense</option>
        </select>
      </td>
      <td>
        <input
          className="table-input"
          type="number"
          min="0"
          step="1"
          value={draft.amount}
          onChange={(e) => setDraft((d) => ({ ...d, amount: e.target.value }))}
          aria-label="Edit amount"
        />
      </td>
      <td>
        <input
          className="table-input"
          type="text"
          value={draft.note}
          onChange={(e) => setDraft((d) => ({ ...d, note: e.target.value }))}
          aria-label="Edit note"
        />
      </td>
      <td>
        <div className="table-actions">
          <button type="button" className="btn btn--primary btn--sm" onClick={onSave}>
            Save
          </button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </td>
    </tr>
  )
}
