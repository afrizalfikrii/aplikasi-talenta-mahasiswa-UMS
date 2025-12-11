import http from "./http";
import type { Talent } from "../types/talent";

export const fetchPublicTalents = () =>
  http.get<Talent[]>("/talents/");