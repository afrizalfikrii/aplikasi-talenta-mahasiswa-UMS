export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  access: string
  refresh: string
}

export interface User {
  id: number
  username: string
  email: string
  role: "admin" | "student"
}
