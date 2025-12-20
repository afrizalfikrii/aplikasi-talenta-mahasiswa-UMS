import http from "@/lib/http"

export interface TalentProfile {
  id: number
  user: {
    id: string
    username: string
    email: string
    first_name: string
    last_name: string
    nim: string
  }
  prodi: string
  profile_picture: string | null
  phone_number: string
  address: string
  summary: string
  linkedin_url: string
  github_url: string
  website_url: string
  cv_file: string | null
}

export interface ProfileUpdatePayload {
  prodi?: string
  phone_number?: string
  address?: string
  summary?: string
  linkedin_url?: string
  github_url?: string
  website_url?: string
}

export const getMyProfile = async (): Promise<TalentProfile> => {
  const res = await http.get('/talents/me/')
  return res.data
}

export const updateMyProfile = async (payload: ProfileUpdatePayload): Promise<TalentProfile> => {
  const res = await http.put('/talents/me/', payload)
  return res.data
}
