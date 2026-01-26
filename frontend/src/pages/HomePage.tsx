import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, Sparkles, ArrowRight, Users, Zap, BookOpen } from "lucide-react";
import CardHome from "@/components/layout/CardHome";
import CounterStat from "@/components/ui/CounterStat";
import { useDashboardStats } from "./hooks/useDashboardStats";

export default function Home() {
  const { data: stats, loading, error } = useDashboardStats();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/talenta?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/talenta');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Abstract Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-4xl px-6 text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-6 border border-blue-100 dark:border-blue-800">
            <Sparkles size={12} /> Talent Showcase Official
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Talenta Masa Depan <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Universitas Muhammadiyah.
            </span>
          </h1>
          
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Temukan mahasiswa berprestasi dan profesional muda yang siap berkarya. Terhubung langsung, tanpa perantara.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-lg mx-auto group">
            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative flex items-center bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <Search className="ml-4 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Cari talenta, skill, atau nama..." 
                className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-gray-900 dark:bg-white dark:text-gray-900 text-white p-3 rounded-xl hover:scale-105 transition-transform"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </form>

          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {loading ? (
              <span className="text-gray-400">Loading stats...</span>
            ) : (
              <>
                <span className="font-semibold text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-default transition-colors">
                  {stats?.total_student || 0}+ Mahasiswa
                </span>
                <span className="font-semibold text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-default transition-colors">
                  {stats?.total_skills || 0}+ Skill
                </span>
                <span className="font-semibold text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-default transition-colors">
                  {stats?.total_prodi || 0}+ Program Studi
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-16 rounded-xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600 dark:text-red-400">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Users size={24} />
                  </div>
                </div>
                <CounterStat
                  endValue={stats?.total_student || 0}
                  label="Talenta Terdaftar"
                  icon={null}
                />
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    <Zap size={24} />
                  </div>
                </div>
                <CounterStat
                  endValue={stats?.total_skills || 0}
                  label="Skill Tersedia"
                  icon={null}
                />
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                    <BookOpen size={24} />
                  </div>
                </div>
                <CounterStat
                  endValue={stats?.total_prodi || 0}
                  label="Program Studi"
                  icon={null}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Latest Talents Section */}
      <div className="bg-white dark:bg-gray-900 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Talenta Terbaru
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Kenali mahasiswa berbakat yang baru bergabung
            </p>
          </div>
          
          <CardHome />

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              to="/talenta"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-2xl hover:scale-105 transition-transform font-semibold shadow-lg"
            >
              Lihat Semua Talenta
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
