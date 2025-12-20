import BentoGridDashboard from "../components/BentoGridDashboard";
import SearchFilterBar from "../components/SearchFilterBar";
import DaftarTalenta from "../components/DaftarTalenta";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useState } from "react";

export default function AdminDashboard() {
  const { isAdmin } = useAdminAuth();
  const { data, loading, error, refetch: refetchStats } = useDashboardStats();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

  // Don't render if not admin (useAdminAuth handles redirect)
  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">No data available</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white-100 dark:bg-slate-950 transition-colors duration-300">
      {/* Content */}
      <section className="p-8 gap-6 flex flex-col">
        <BentoGridDashboard stats={data} />
        <SearchFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />
        <DaftarTalenta 
          onStatsUpdate={refetchStats}
          searchTerm={searchTerm}
          filterStatus={filterStatus}
        />
      </section>
    </main>
  );
}
