import { useState, useEffect } from "react"
import { getMyExperiences, createExperience, updateExperience, deleteExperience, type Experience, type ExperiencePayload } from "../api/experience.api"

export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchExperiences = async () => {
    try {
      setLoading(true)
      const data = await getMyExperiences()
      setExperiences(data)
      setError(null)
    } catch (err: any) {
      console.error("Error fetching experiences:", err)
      setError(err.response?.data?.detail || "Gagal mengambil data pengalaman")
    } finally {
      setLoading(false)
    }
  }

  const addExperience = async (payload: ExperiencePayload) => {
    await createExperience(payload)
    await fetchExperiences()
  }

  const editExperience = async (id: number, payload: ExperiencePayload) => {
    await updateExperience(id, payload)
    await fetchExperiences()
  }

  const removeExperience = async (id: number) => {
    await deleteExperience(id)
    await fetchExperiences()
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  return {
    experiences,
    loading,
    error,
    addExperience,
    editExperience,
    removeExperience,
    refetch: fetchExperiences
  }
}
