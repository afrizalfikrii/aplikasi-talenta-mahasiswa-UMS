import http from "@/lib/http";
import type { AdminTalent } from "../types/talent-admin.types";

export const getAdminTalents = async () => {
  const res = await http.get<AdminTalent[]>("/talents/admin/talents/");
  return res.data;
};