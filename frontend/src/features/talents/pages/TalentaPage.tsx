import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import StudentCard from "../components/StudentCard";
import { useTalents } from "../hooks/useTalents";

const TalentaPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedProdi, setSelectedProdi] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  // Fetch data menggunakan hook dengan filter parameters
  const { data, loading } = useTalents({
    prodi: selectedProdi,
    skill: selectedSkill,
    search: debouncedSearch,
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // Extract unique prodi dan skills untuk dropdown options
  const prodiOptions = useMemo(() => {
    if (!data) return [];
    const uniqueProdi = Array.from(
      new Set(data.map((t) => t.prodi).filter(Boolean))
    );
    return uniqueProdi.sort();
  }, [data]);

  const skillOptions = useMemo(() => {
    if (!data) return [];
    const allSkills = data.flatMap(
      (t) => t.skills?.map((s) => s.skill_name) || []
    );
    const uniqueSkills = Array.from(new Set(allSkills));
    return uniqueSkills.sort();
  }, [data]);

  // Clear all filters
  const clearFilters = () => {
    setSelectedProdi("");
    setSelectedSkill("");
    setSearch("");
  };

  const hasActiveFilters = selectedProdi || selectedSkill || search;

  return (
    <>
      <div className="w-full min-h-screen pt-32 pb-20 px-6 transition-colors duration-300 animate-fade-up">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Daftar Talenta
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
                Menampilkan profil terbaik mahasiswa UMS.
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="w-full flex flex-col gap-4 mb-8">
            {/* Search Input - Glass Morphism */}
            <div className="relative w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={22} />
              <input
                type="text"
                placeholder="Cari talenta berdasarkan nama..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-3xl shadow-lg glass-panel
                       border border-gray-200/50 dark:border-gray-700/50
                       focus:ring-2 focus:ring-blue-400/50 dark:focus:ring-blue-500/50 
                       focus:border-transparent outline-none
                       text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                       transition-all duration-300 hover:shadow-xl"
              />
            </div>

            {/* Filter Pills Section */}
            <div className="flex flex-col gap-4">
              {/* Program Studi Filter */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Program Studi:</span>
                  {selectedProdi && (
                    <button
                      onClick={() => setSelectedProdi("")}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedProdi("")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedProdi === ""
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Semua
                  </button>
                  {prodiOptions.map((prodi) => (
                    <button
                      key={prodi}
                      onClick={() => setSelectedProdi(prodi)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedProdi === prodi
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {prodi}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills Filter */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills:</span>
                  {selectedSkill && (
                    <button
                      onClick={() => setSelectedSkill("")}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSkill("")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedSkill === ""
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Semua
                  </button>
                  {skillOptions.slice(0, 10).map((skill) => (
                    <button
                      key={skill}
                      onClick={() => setSelectedSkill(skill)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedSkill === skill
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                  {skillOptions.length > 10 && (
                    <span className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                      +{skillOptions.length - 10} lainnya
                    </span>
                  )}
                </div>
              </div>

              {/* Clear All Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="self-start px-5 py-2 rounded-full text-sm font-medium 
                         bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 
                         hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300
                         border border-red-200 dark:border-red-800"
                >
                  Reset Semua Filter
                </button>
              )}
            </div>
          </div>

          {/* Count */}
          {!loading && (
            <p className="text-gray-600 dark:text-gray-400 text-left mb-6 text-sm md:text-base">
              Menampilkan{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {data?.length || 0}
              </span>{" "}
              talenta
            </p>
          )}

          {/* Grid */}
          {loading ? (
            // Skeleton Loading
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 h-80 animate-pulse"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                    <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="flex gap-2 mt-4">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : data && data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((student) => (
                <Link
                  to={`/talenta/${student.username}`}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  key={student.id}
                  className="block"
                >
                  <StudentCard student={student} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Tidak ada talenta yang ditemukan
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                >
                  Reset Filter
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TalentaPage;
