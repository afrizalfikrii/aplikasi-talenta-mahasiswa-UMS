export interface AdminDashboardStats {
    total_student: number;
    active_profiles: number;
    inactive_profiles: number;
    total_skills: number;
    top_prodi: {
        name: string;
        total: number;
    };
    avg_experience: number;
}