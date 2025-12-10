export interface Talent {
  id: number;
  user: number;
  username: string;
  email: string;
  prodi: string;
  profile_picture: string | null;
  phone_number: string;
  address: string;
  summary: string;
  linkedin_url: string;
  github_url: string;
  website_url: string;
  cv_file: string;
  is_open_to_work: boolean;
  updated_at: string;
  skills: { id: number; skill_name: string; proficiency_level: string }[];
}
