import BentoGridDashboard from "../components/BentoGridDashboard";
import SearchFilterBar from "../components/SearchFilterBar";
import DaftarTalenta from "../components/DaftarTalenta";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-white-100">
      {/* Content */}
      <section className="p-8 gap-6 flex flex-col">
        <BentoGridDashboard />
        <SearchFilterBar />
        <DaftarTalenta />
      </section>
    </main>
  );
}
