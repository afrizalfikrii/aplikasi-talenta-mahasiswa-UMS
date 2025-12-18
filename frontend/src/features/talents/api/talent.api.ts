import http from "@/lib/http"
import type { Talent } from "../types/talent.types"

export const getPublicTalents = async (queryString = ""): Promise<Talent[]> => {
  const res = await http.get(`/talents/${queryString}`)
  return res.data
}
