import http from "@/lib/http";
import type { AdminTalent } from "../types/talent-admin.types";

export const getAdminTalents = async () => {
  const res = await http.get<AdminTalent[]>("/talents/admin/talents/");
  return res.data;
};

export const toggleUserStatus = async (userId: number) => {
  const res = await http.patch(`/talents/admin/users/${userId}/toggle-status/`);
  return res.data;
};

export const updateUser = async (userId: number, data: Partial<AdminTalent>) => {
  const res = await http.patch(`/talents/admin/users/${userId}/`, data);
  return res.data;
};