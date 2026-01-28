export interface Skill {
  id: number
  skill_name: string
  proficiency_level: string
}

export interface Experience {
  id: number
  job_title: string
  company_name: string
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
    first_name?: string
    last_name?: string
  }
}

export interface TalentDetail extends Talent {
  email?: string
  phone_number?: string
  linkedin_url?: string
  github_url?: string
  website_url?: string
  cv_file?: string | null
  experiences?: Experience[]
  user?: {
    nim?: string
    first_name?: string
    last_name?: string
  }
}
