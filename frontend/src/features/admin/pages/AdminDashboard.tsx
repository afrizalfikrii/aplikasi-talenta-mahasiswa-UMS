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
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 p-8">
        <div className="space-y-6 animate-fade-up">
          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 h-32 animate-pulse"
              >
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Search Bar Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </div>

          {/* Table Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 animate-pulse">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
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
