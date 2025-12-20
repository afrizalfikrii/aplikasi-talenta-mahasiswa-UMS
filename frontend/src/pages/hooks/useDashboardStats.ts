import { getHomePageStats } from "../api/stats.api";
import { useEffect, useState, useCallback } from "react";
import type { HomePageStats } from "../types/Stats.types";

export const useDashboardStats = () => {
  const [data, setData] = useState<HomePageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const loadStats = useCallback(() => {
    setLoading(true);
    setError(null);
    getHomePageStats()
      .then(setData)
      .catch((err) => {
        console.error("Error fetching dashboard stats:", err);
        console.error("Error response:", err.response);
        if (err.response?.status === 403) {
          setError("Akses ditolak. Anda tidak memiliki izin untuk melihat statistik ini.");
        } else if (err.response?.status === 401) {
          setError("Anda harus masuk untuk melihat statistik ini.");
        } else {
          setError(err.response?.data?.message || err.message || "Gagal mengambil data statistik dashboard.");
        } 
        })
        .finally(() => setLoading(false));
    }, []);
    useEffect(() => {
        loadStats();
  }, [loadStats]);
  return { data, loading, error, refetch: loadStats };
}