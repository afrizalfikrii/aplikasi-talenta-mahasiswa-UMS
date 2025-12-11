export interface DetailTalent {
  id: number;
  user: {
    id: number;
    nim: string;
  };
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
  skills: { 
    id: number; 
    skill_name: string; 
    proficiency_level: string 
}[];
  experiences: {
    id: number;
    title: string;
    company: string;
    start_date: string;
    end_date: string | null;
    description: string;
  }[];
}
