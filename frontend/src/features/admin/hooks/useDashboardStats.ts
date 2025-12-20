import { useEffect, useState, useCallback } from "react";
import { getAdminDashboardStats } from "../api/admin.stats.api";
import type { AdminDashboardStats } from "../types/stats.types";

export const useDashboardStats = () => {
    const [data, setData] = useState<AdminDashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // MOCK DATA FOR UI TESTING
        const mockData = {
            total_student: 156,
            active_profiles: 142,
            inactive_profiles: 14,
            total_skills: 28,
            top_prodi: {
                name: "Informatika",
                total: 45
            },
            avg_experience: 1.2
        };

        setData(mockData);
        setLoading(false);
    }, []);

    return { data, loading, error, refetch: () => { } };
};