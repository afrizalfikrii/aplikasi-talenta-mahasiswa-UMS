import http from "@/lib/http";
import type { HomePageStats } from "../types/Stats.types";

export const getHomePageStats = async () => {
  const res = await http.get<HomePageStats>("/talents/stats/");
  return res.data;
};