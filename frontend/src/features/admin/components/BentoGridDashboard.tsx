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
      <div className="w-full mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Row 1 */}
        <StatCard
          title="Total Mahasiswa"
          value={stats.total_student}
          icon={<Users size={24} className="text-white" />}
          gradient="from-blue-500 to-blue-600"
          trend={{ value: 12, isPositive: true }}
        />

        <StatCard
          title="Profil Aktif"
          value={stats.active_profiles}
          icon={<Eye size={24} className="text-white" />}
          gradient="from-green-500 to-green-600"
          trend={{ value: 8, isPositive: true }}
        />

        <StatCard
          title="Profil Nonaktif"
          value={stats.inactive_profiles}
          icon={<EyeOff size={24} className="text-white" />}
          gradient="from-red-500 to-red-600"
        />

        {/* Row 2 */}
        <StatCard
          title="Total Skills"
          value={stats.total_skills}
          icon={<Award size={24} className="text-white" />}
          gradient="from-purple-500 to-purple-600"
          trend={{ value: 15, isPositive: true }}
        />

        <StatCard
          title="Prodi Terbanyak"
          value={stats.top_prodi.name}
          subtitle={`${stats.top_prodi.total} mahasiswa`}
          icon={<BookOpen size={24} className="text-white" />}
          gradient="from-orange-500 to-orange-600"
        />

        <StatCard
          title="Rata-rata Pengalaman"
          value={stats.avg_experience.toFixed(1)}
          subtitle="per mahasiswa"
          icon={<TrendingUp size={24} className="text-white" />}
          gradient="from-cyan-500 to-cyan-600"
        />
      </div>
  );
}
