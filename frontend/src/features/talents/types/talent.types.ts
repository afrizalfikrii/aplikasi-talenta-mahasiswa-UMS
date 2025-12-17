export interface Skill {
  id: number
  skill_name: string
  proficiency_level: string
}

export interface Experience {
  id: number
  title: string
  company: string
  start_date: string
  end_date?: string | null
  description: string
}

export interface Talent {
  id: number
  username: string
  prodi: string
  summary?: string
  profile_picture?: string | null
  skills?: Skill[]
  user?: {
    nim?: string
  }
}

export interface TalentDetail extends Talent {
  email?: string
  phone_number?: string
  linkedin_url?: string
  github_url?: string
  website_url?: string
  experiences?: Experience[]
}
