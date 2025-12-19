import {
  Users,
  Eye,
  EyeOff,
  Award,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import StatCard from "./StatCard";
import type { AdminDashboardStats } from "../types/stats.types";

export default function BentoGridDashboard({stats}: {stats: AdminDashboardStats}) {
  return (
      <div className="w-full mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Row 1 */}
        <StatCard
          title="Total Mahasiswa"
          value={stats.total_student}
          icon={<Users className="text-blue-600" />}
          valueColor="text-blue-600"
          iconBg="bg-blue-100"
        />

        <StatCard
          title="Profil Aktif"
          value={stats.active_profiles}
          icon={<Eye className="text-green-600" />}
          valueColor="text-green-600"
          iconBg="bg-green-100"
        />

        <StatCard
          title="Profil Nonaktif"
          value={stats.inactive_profiles}
          icon={<EyeOff className="text-red-600" />}
          valueColor="text-red-600"
          iconBg="bg-red-100"
        />

        {/* Row 2 */}
        <StatCard
          title="Total Skills"
          value={stats.total_skills}
          icon={<Award className="text-purple-600" />}
          valueColor="text-purple-600"
          iconBg="bg-purple-100"
        />

        <StatCard
          title="Prodi Terbanyak"
          value={stats.top_prodi.name}
          subtitle={`${stats.top_prodi.total} mahasiswa`}
          icon={<BookOpen className="text-orange-600" />}
          valueColor="text-orange-600"
          iconBg="bg-orange-100"
        />

        <StatCard
          title="Rata-rata Pengalaman"
          value={stats.avg_experience.toFixed(1)}
          subtitle="per mahasiswa"
          icon={<TrendingUp className="text-teal-600" />}
          valueColor="text-teal-600"
          iconBg="bg-teal-100"
        />
      </div>
  );
}
