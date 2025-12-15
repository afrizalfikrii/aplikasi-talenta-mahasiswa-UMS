import http from "./http";
import type { LoginResponse } from "../types/loginRsponse";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const res = await http.post<LoginResponse>("/auth/login/", {
    email,
    password,
  });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("role");
};