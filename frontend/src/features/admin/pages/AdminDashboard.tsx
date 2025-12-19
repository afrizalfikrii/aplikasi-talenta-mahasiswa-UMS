import BentoGridDashboard from "../components/BentoGridDashboard";
import SearchFilterBar from "../components/SearchFilterBar";
import DaftarTalenta from "../components/DaftarTalenta";
import { useDashboardStats } from "../hooks/useDashboardStats";

export default function AdminDashboard() {
  const { data, loading, error } = useDashboardStats();
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
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
    <main className="min-h-screen bg-white-100">
      {/* Content */}
      <section className="p-8 gap-6 flex flex-col">
        <BentoGridDashboard stats={data}/>
        <SearchFilterBar />
        <DaftarTalenta />
      </section>
    </main>
  );
}
