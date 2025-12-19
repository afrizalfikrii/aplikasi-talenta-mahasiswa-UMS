import http from "@/lib/http";
import type { AdminDashboardStats } from "../types/stats.types";

export const getAdminDashboardStats = async () => {
  const res = await http.get<AdminDashboardStats>("/talents/admin/dashboard-stats/");
  return res.data;
};
