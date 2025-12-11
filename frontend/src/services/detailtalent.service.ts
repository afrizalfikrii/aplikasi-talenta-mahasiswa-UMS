import http from "../api/http"
import type { DetailTalent } from "../types/detailTalent";

export const getTalentDetail = async (
  username: string
): Promise<DetailTalent> => {
  const res = await http.get<DetailTalent>(`/talents/${username}/`);
  return res.data;
};