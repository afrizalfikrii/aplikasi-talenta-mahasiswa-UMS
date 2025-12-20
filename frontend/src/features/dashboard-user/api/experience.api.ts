import http from "@/lib/http"

export interface Experience {
  id: number
  job_title: string
  company_name: string
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string
}

export interface ExperiencePayload {
  job_title: string
  company_name: string
  start_date: string
  end_date?: string | null
  is_current: boolean
  description: string
}

export const getMyExperiences = async (): Promise<Experience[]> => {
  const res = await http.get('/talents/me/experiences/')
  return res.data
}

export const createExperience = async (payload: ExperiencePayload): Promise<Experience> => {
  const res = await http.post('/talents/me/experiences/', payload)
  return res.data
}

export const updateExperience = async (id: number, payload: ExperiencePayload): Promise<Experience> => {
  const res = await http.put(`/talents/me/experiences/${id}/`, payload)
  return res.data
}

export const deleteExperience = async (id: number): Promise<void> => {
  await http.delete(`/talents/me/experiences/${id}/`)
}
