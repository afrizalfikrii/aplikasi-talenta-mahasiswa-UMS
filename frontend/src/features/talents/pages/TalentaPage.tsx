import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import StudentCard from "../components/StudentCard";
import { useTalents } from "../hooks/useTalents";

const TalentaPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data, loading } = useTalents();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const filtered = useMemo(() => {
    const keyword = debouncedSearch.trim().toLowerCase();
    if (!keyword) return data ?? [];

    return data?.filter((item) => {
      const skillNames = item.skills?.map((skill) => skill.skill_name) ?? [];
      return [
        item.username,
        item.prodi,
        item.user?.nim,
        item.summary,
        ...skillNames,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    });
  }, [data, debouncedSearch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-7">
          <h1 className="text-2xl text-left mt-5 md:text-2xl font-semibold text-gray-900">
            Daftar Talenta Mahasiswa
          </h1>
          <p className="text-gray-600 text-left text-base md:text-lg mt-2">
            Temukan talenta terbaik sesuai kebutuhan Anda
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            placeholder="Cari berdasarkan nama, program studi, atau skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
          />

          <button className="px-5 py-3 border rounded-xl shadow-sm flex items-center gap-2 hover:bg-gray-100 transition w-full sm:w-auto justify-center">
            <span>🔍</span> Filter
          </button>
        </div>

        {/* Count */}
        <p className="text-gray-600 text-left mt-6 text-sm md:text-base">
          Menampilkan{" "}
          <span className="text-emerald-900 font-semibold">
            {filtered.length}
          </span>{" "}
          talenta
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filtered.map((student) => (
            <Link
              to={`/talenta/${student.username}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              key={student.id}
              className="block hover:scale-[1.02] transition-transform"
            >
              <StudentCard student={student} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalentaPage;
