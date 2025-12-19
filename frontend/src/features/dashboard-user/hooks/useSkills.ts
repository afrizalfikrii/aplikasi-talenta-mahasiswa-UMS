import { useState, useEffect } from "react"
import { getMySkills, createSkill, updateSkill, deleteSkill, type Skill, type SkillPayload } from "../api/skill.api"

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSkills = async () => {
    try {
      setLoading(true)
      const data = await getMySkills()
      setSkills(data)
      setError(null)
    } catch (err: any) {
      console.error("Error fetching skills:", err)
      setError(err.response?.data?.detail || "Gagal mengambil data skills")
    } finally {
      setLoading(false)
    }
  }

  const addSkill = async (payload: SkillPayload) => {
    await createSkill(payload)
    await fetchSkills()
  }

  const editSkill = async (id: number, payload: SkillPayload) => {
    await updateSkill(id, payload)
    await fetchSkills()
  }

  const removeSkill = async (id: number) => {
    await deleteSkill(id)
    await fetchSkills()
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  return {
    skills,
    loading,
    error,
    addSkill,
    editSkill,
    removeSkill,
    refetch: fetchSkills
  }
}
