import http from "@/lib/http"
import type { TalentDetail } from "../types/talent.types"

export const getTalentDetail = async (
  username: string
): Promise<TalentDetail> => {
  const res = await http.get(`/talents/${username}/`)
  return res.data
}
