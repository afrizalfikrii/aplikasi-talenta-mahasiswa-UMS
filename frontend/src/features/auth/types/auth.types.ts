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

export interface RegisterPayload {
  username: string
  email: string
  password: string
  password2: string
  nim: string
  first_name: string
  last_name: string
}

export interface RegisterResponse {
  message: string
  user: {
    id: number
    username: string
    email: string
    nim: string
    first_name: string
    last_name: string
  }
}
