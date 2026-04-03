import { useApp } from '../../context/useApp'

/** Renders children only when role is admin (RBAC UI guard). */
export function AdminOnly({ children }) {
  const { role } = useApp()
  if (role !== 'admin') return null
  return children
}
