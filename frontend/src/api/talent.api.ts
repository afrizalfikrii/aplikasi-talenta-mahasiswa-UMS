import http from "./http";
import type { Talent } from "../types/talent";

export const fetchPublicTalents = () =>
  http.get<Talent[]>("/talents/");

export const fetchTalentDetail = (username: string) =>
  http.get<Talent>(`/talents/${username}/`);
