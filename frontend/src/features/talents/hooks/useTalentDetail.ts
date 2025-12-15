import { useEffect, useState } from "react"
import { getTalentDetail } from "../api/talent-detail.api"
import type { TalentDetail } from "../types/talent.types"

export const useTalentDetail = (username?: string) => {
  const [data, setData] = useState<TalentDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!username) return

    getTalentDetail(username)
      .then(setData)
      .catch(() => setError("Talent tidak ditemukan"))
      .finally(() => setLoading(false))
  }, [username])

  return { data, loading, error }
}
