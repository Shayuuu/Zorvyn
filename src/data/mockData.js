export const BASE_TRANSACTIONS = [
  { id: 1, date: '2026-03-04', amount: 4200, category: 'Salary', type: 'income', note: 'Monthly payroll' },
  { id: 2, date: '2026-03-07', amount: 180, category: 'Groceries', type: 'expense', note: 'Supermarket run' },
  { id: 3, date: '2026-03-09', amount: 75, category: 'Transport', type: 'expense', note: 'Fuel refill' },
  { id: 4, date: '2026-03-11', amount: 320, category: 'Rent', type: 'expense', note: 'Studio rent adjustment' },
  { id: 5, date: '2026-03-14', amount: 450, category: 'Freelance', type: 'income', note: 'Landing page project' },
  { id: 6, date: '2026-03-18', amount: 120, category: 'Entertainment', type: 'expense', note: 'Concert tickets' },
  { id: 7, date: '2026-03-21', amount: 95, category: 'Utilities', type: 'expense', note: 'Electricity bill' },
  { id: 8, date: '2026-03-23', amount: 220, category: 'Health', type: 'expense', note: 'Dental checkup' },
  { id: 9, date: '2026-03-26', amount: 540, category: 'Investments', type: 'income', note: 'Mutual fund dividend' },
  { id: 10, date: '2026-03-29', amount: 130, category: 'Dining', type: 'expense', note: 'Weekend dinner' },
]

export const MONTH_BALANCE = [4050, 4280, 4120, 4470, 4715, 4890]
export const MONTH_LABELS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']

export const STORAGE_KEYS = {
  role: 'finance-dashboard-role',
  transactions: 'finance-dashboard-transactions',
  theme: 'finance-dashboard-theme',
}
