import { useEffect, useState } from "react"
import { getPublicTalents } from "../api/talent.api"
import type { Talent } from "../types/talent.types"

export const useTalents = () => {
  const [data, setData] = useState<Talent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPublicTalents()
      .then(setData)
      .catch(() => setError("Gagal mengambil data talent"))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
