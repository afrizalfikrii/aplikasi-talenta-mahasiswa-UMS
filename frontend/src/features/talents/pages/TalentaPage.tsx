import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import StudentCard from "../components/StudentCard";
import { useTalents } from "../hooks/useTalents";
import StickyLoading from "@/components/StickyLoading";

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

  if (loading)
    return (
      <StickyLoading show={loading} text="Memuat data talenta..." />
    );

  return (
    <>
      <div className="w-full min-h-screen py-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="mb-7">
            <h1 className="text-2xl text-left mt-5 md:text-2xl font-semibold text-gray-900 dark:text-white">
              Daftar Talenta Mahasiswa
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-left text-base md:text-lg mt-2">
              Temukan talenta terbaik sesuai kebutuhan Anda
            </p>
          </div>

          {/* Search Bar and Filters */}
          <div className="w-full flex flex-col gap-3">
            {/* Search Input */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Cari berdasarkan nama..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300 outline-none
                       bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              {/* Prodi Filter */}
              <select
                value={selectedProdi}
                onChange={(e) => setSelectedProdi(e.target.value)}
                className="flex-1 px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300 outline-none
                       bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700"
              >
                <option value="">Semua Program Studi</option>
                {prodiOptions.map((prodi) => (
                  <option key={prodi} value={prodi}>
                    {prodi}
                  </option>
                ))}
              </select>

              {/* Skill Filter */}
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="flex-1 px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300 outline-none
                       bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700"
              >
                <option value="">Semua Skill</option>
                {skillOptions.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-5 py-3 border rounded-xl shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition
                         bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700 text-red-600 dark:text-red-400 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Count */}
          <p className="text-gray-600 dark:text-gray-400 text-left mt-6 text-sm md:text-base">
            Menampilkan{" "}
            <span className="text-emerald-900 dark:text-emerald-400 font-semibold">
              {data?.length || 0}
            </span>{" "}
            talenta
          </p>

          {/* Grid */}
          {data && data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {data.map((student) => (
                <Link
                  to={`/talenta/${student.username}`}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  key={student.id}
                  className="block hover:scale-[1.02] transition-transform"
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
