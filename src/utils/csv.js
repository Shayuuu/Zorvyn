export function buildTransactionsCsv(filteredTransactions) {
  const headers = ['Date', 'Category', 'Type', 'Amount', 'Note']
  const rows = filteredTransactions.map((item) => [
    item.date,
    item.category,
    item.type,
    item.amount,
    item.note,
  ])

  return [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
    .join('\n')
}

export function downloadCsvFile(csv, filename = 'transactions-export.csv') {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
