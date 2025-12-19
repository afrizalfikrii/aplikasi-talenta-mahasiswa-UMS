import http from "@/lib/http"

export interface Skill {
  id: number
  skill_name: string
  proficiency_level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface SkillPayload {
  skill_name: string
  proficiency_level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export const getMySkills = async (): Promise<Skill[]> => {
  const res = await http.get('/talents/me/skills/')
  return res.data
}

export const createSkill = async (payload: SkillPayload): Promise<Skill> => {
  const res = await http.post('/talents/me/skills/', payload)
  return res.data
}

export const updateSkill = async (id: number, payload: SkillPayload): Promise<Skill> => {
  const res = await http.put(`/talents/me/skills/${id}/`, payload)
  return res.data
}

export const deleteSkill = async (id: number): Promise<void> => {
  await http.delete(`/talents/me/skills/${id}/`)
}
