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

// Token refresh queue to handle concurrent 401 errors
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token?: string) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: any = error?.config;
    const authState = useAuthStore.getState();

    // Not a 401 error, reject normally
    if (!error?.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Guard: Don't try to refresh the refresh endpoint itself
    if (originalRequest?.url?.includes("/auth/refresh/")) {
      authState.logout();
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }

    // Prevent infinite retry loops
    if (originalRequest?._retry) {
      authState.logout();
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }

    const refresh = authState.refresh || localStorage.getItem("refresh");
    if (!refresh) {
      authState.logout();
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }

    // If refresh is already in progress, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return http(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const res = await axios.post(`${API_URL}/auth/refresh/`, { refresh });
      const newAccess: string = res.data.access;

      // Update token in store + storage
      if (authState.setAccess) {
        authState.setAccess(newAccess);
      } else {
        localStorage.setItem("access", newAccess);
      }

      // Process queued requests with new token
      processQueue(null, newAccess);

      // Retry original request with new token
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newAccess}`;
      return http(originalRequest);
    } catch (refreshErr: any) {
      // Handle 403 or invalid token on refresh endpoint
      if (refreshErr?.response?.status === 403 || refreshErr?.response?.status === 401) {
        authState.logout();
        window.location.href = "/auth/login";
        processQueue(refreshErr, undefined);
        return Promise.reject(refreshErr);
      }

      // Other refresh errors
      processQueue(refreshErr, undefined);
      authState.logout();
      window.location.href = "/auth/login";
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);

export default http;