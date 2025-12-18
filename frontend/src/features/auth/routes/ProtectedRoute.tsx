import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/auth.store"

interface Props {
  role?: "admin" | "student"
}

const ProtectedRoute = ({ role }: Props) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  if (role && user && user.role !== role) {
    return <Navigate to="/403" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
