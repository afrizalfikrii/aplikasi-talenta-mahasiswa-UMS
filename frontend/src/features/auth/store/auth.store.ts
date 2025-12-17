import { create } from "zustand"

interface AuthState {
  access: string | null
  refresh: string | null
  isAuthenticated: boolean
  login: (access: string, refresh: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: !!localStorage.getItem("access"),

  login: (access, refresh) => {
    localStorage.setItem("access", access)
    localStorage.setItem("refresh", refresh)
    set({ access, refresh, isAuthenticated: true })
  },

  logout: () => {
    localStorage.clear()
    set({ access: null, refresh: null, isAuthenticated: false })
  },
}))
