import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/auth.store"

/**
 * Component untuk redirect user yang sudah login ke dashboard masing-masing
 */
const RoleBasedRedirect = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)

  if (isAuthenticated && user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />
    } else if (user.role === "student") {
      return <Navigate to="/user/dashboard" replace />
    }
  }

  return null
}

export default RoleBasedRedirect
