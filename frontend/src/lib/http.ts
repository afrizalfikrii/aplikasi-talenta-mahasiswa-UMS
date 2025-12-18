import axios from "axios";
import { useAuthStore } from "@/features/auth/store/auth.store";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const { access } = useAuthStore.getState();
    const token = access || localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: any = error.config;
    const authState = useAuthStore.getState();

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry
    ) {
      const refresh = authState.refresh || localStorage.getItem("refresh");
      if (!refresh) {
        authState.logout();
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const res = await axios.post(`${API_URL}/auth/refresh/`, { refresh });
        const newAccess: string = res.data.access;

        // update store + storage
        if (authState.setAccess) {
          authState.setAccess(newAccess);
        } else {
          localStorage.setItem("access", newAccess);
        }

        // set header and retry
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return http(originalRequest);
      } catch (refreshErr) {
        authState.logout();
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export default http;