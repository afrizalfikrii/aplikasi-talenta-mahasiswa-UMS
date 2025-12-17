import http from "@/lib/http"
import type { LoginPayload, LoginResponse, User } from "../types/auth.types"

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await http.post<LoginResponse>(
    "/auth/login/",
    payload
  )
  return data
}

export const getMeApi = async (): Promise<User> => {
  const { data } = await http.get<User>("/auth/me/")
  return data
}
