import http from "@/lib/http"
import type { LoginPayload, LoginResponse, User, RegisterPayload, RegisterResponse } from "../types/auth.types"

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await http.post<LoginResponse>(
    "/auth/login/",
    payload
  )
  return data
}

export const registerApi = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const { data } = await http.post<RegisterResponse>(
    "/auth/register/",
    payload
  )
  return data
}

export const getMeApi = async (): Promise<User> => {
  const { data } = await http.get<User>("/auth/me/")
  return data
}
