import { useEffect, useState } from "react"
import { getPublicTalents } from "../api/talent.api"
import type { Talent } from "../types/talent.types"

interface UseTalentsParams {
  prodi?: string;
  skill?: string;
  search?: string;
}

export const useTalents = (params?: UseTalentsParams) => {
  const [data, setData] = useState<Talent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    // Build query string from parameters
    const queryParams = new URLSearchParams();

    if (params?.prodi) {
      queryParams.append('prodi', params.prodi);
    }

    if (params?.skill) {
      queryParams.append('skill', params.skill);
    }

    if (params?.search) {
      queryParams.append('search', params.search);
    }

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';

    getPublicTalents(queryString)
      .then(setData)
      .catch(() => setError("Gagal mengambil data talent"))
      .finally(() => setLoading(false))
  }, [params?.prodi, params?.skill, params?.search])

  return { data, loading, error }
}
