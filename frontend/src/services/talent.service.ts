import http from "@/lib/http";
import type { Talent } from "../types/talent";

export const getPublicTalents = async (): Promise<Talent[]> => {
  const res = await http.get<Talent[]>("/talents/");
  return res.data;
};

export const getLatestTalents = async (): Promise<Talent[]> => {
  const res = await http.get<Talent[]>("/talents/latest/");
  return res.data;
};
