export interface AdminTalent {
  id: number;
  nim: string;
  name: string;
  email: string;
  program_studi: string;
  is_active: boolean;
  skills: string[];
}

export const FILTER_STATUS_VALUES = ["all", "active", "inactive"] as const;
export type FilterStatus = typeof FILTER_STATUS_VALUES[number];