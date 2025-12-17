import http from "@/lib/http"
import type { LoginPayload, LoginResponse } from "../types/auth.types"

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await http.post<LoginResponse>(
    "/auth/login/",
    payload
  )
  return data
}
