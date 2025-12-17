import http from "@/lib/http"
import type { Talent } from "../types/talent.types"

export const getPublicTalents = async (): Promise<Talent[]> => {
  const res = await http.get("/talents/")
  return res.data
}
