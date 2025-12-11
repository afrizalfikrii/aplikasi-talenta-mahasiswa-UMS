import http from "./http";
import type { DetailTalent } from "../types/detailTalent";

export const fetchTalentDetail = (username: string) =>
  http.get<DetailTalent>(`/talents/${username}/`);
