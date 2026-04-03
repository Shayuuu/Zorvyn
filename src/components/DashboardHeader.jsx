export function DashboardHeader({ today, recordCount, savingsRate, theme, setTheme, role, setRole }) {
  return (
    <header className="topbar">
      <div className="topbar-intro">
        <div className="brand-mark-wrap" aria-hidden="true">
          <span className="brand-mark" />
        </div>
        <div className="topbar-copy">
          <p className="eyebrow">Finance Dashboard UI</p>
          <h1>Personal Finance Overview</h1>
          <p className="subtitle">Track spending, monitor trends, and make better money decisions.</p>
          <div className="meta-row" aria-label="Dashboard summary chips">
            <span className="meta-chip">Updated: {today}</span>
            <span className="meta-chip">Records: {recordCount}</span>
            <span className="meta-chip">Savings rate: {savingsRate}%</span>
          </div>
        </div>
      </div>
      <div className="role-switcher" role="group" aria-label="Display and access">
        <label htmlFor="theme">Theme</label>
        <select id="theme" value={theme} onChange={(event) => setTheme(event.target.value)}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <label htmlFor="role">Role</label>
        <select id="role" value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </header>
  )
}
