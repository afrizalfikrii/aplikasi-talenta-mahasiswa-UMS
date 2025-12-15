import { create } from "zustand"

interface AuthState {
  accessToken: string | null
  role: string | null
  isAuthenticated: boolean
  login: (token: string, role: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("access"),
  role: localStorage.getItem("role"),
  isAuthenticated: !!localStorage.getItem("access"),

  login: (token, role) => {
    localStorage.setItem("access", token)
    localStorage.setItem("role", role)
    set({
      accessToken: token,
      role,
      isAuthenticated: true,
    })
  },

  logout: () => {
    localStorage.clear()
    set({
      accessToken: null,
      role: null,
      isAuthenticated: false,
    })
  },
}))
