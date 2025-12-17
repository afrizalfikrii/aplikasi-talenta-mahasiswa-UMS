import { create } from "zustand"
import type { User } from "../types/auth.types"

interface AuthState {
  access: string | null
  refresh: string | null
  user: User | null
  isAuthenticated: boolean
  login: (access: string, refresh: string) => void
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  user: null,
  isAuthenticated: !!localStorage.getItem("access"),

  login: (access, refresh) => {
    localStorage.setItem("access", access)
    localStorage.setItem("refresh", refresh)
    set({ access, refresh, isAuthenticated: true })
  },

  logout: () => {
    localStorage.clear()
    set({ access: null, refresh: null, user: null, isAuthenticated: false })
  },

  setUser: (user) => {
    set({ user })
  },
}))
