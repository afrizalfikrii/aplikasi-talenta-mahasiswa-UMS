import { useEffect, useState, useCallback } from "react";
import { getAdminTalents } from "../api/admin.talents.api";
import type { AdminTalent } from "../types/talent-admin.types";

export const useAdminTalents = () => {
  const loadTalents = useCallback(() => {
    setLoading(true);
    setError(null);
    getAdminTalents()
      .then(setTalents)
      .catch((err) => {
        console.error("Error fetching admin talents:", err);
        console.error("Error response:", err.response);
        if (err.response?.status === 403) {
          setError("Access denied. You need admin privileges.");
        } else if (err.response?.status === 401) {
          setError("Not authenticated. Please login as admin.");
        } else {
          setError(err.response?.data?.detail || err.message || "Failed to fetch talents");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadTalents();
  }, [loadTalents]);

  return { talents, loading, error, refetch: loadTalents };
};
