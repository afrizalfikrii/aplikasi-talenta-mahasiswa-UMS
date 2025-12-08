import React, { useState, useEffect } from "react";
import StudentCard from "../component/layout/StudentCard";

const TalentaPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<any[]>([]); // data dari DB
  const [loading, setLoading] = useState(true);

  // Ambil data dari API / database
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students"); // ganti sesuai endpoint Anda
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Gagal memuat data mahasiswa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter hasil pencarian
  const filtered = students.filter((item) =>
    [item.name, item.major, item.nim, ...(item.skills || [])]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

 return (
  <div className="w-full min-h-screen bg-gray-50 py-10">
    
    {/* Container sejajar dengan navbar */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* --- Judul Halaman (Rata Kiri) --- */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Daftar Talenta Mahasiswa
        </h1>
        <p className="text-gray-600 text-base md:text-lg mt-1">
          Temukan talenta terbaik sesuai kebutuhan Anda
        </p>
      </div>

      {/* Search Bar + Filter */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

        {/* Search Input */}
        <input
          type="text"
          placeholder="Cari berdasarkan nama, program studi, atau skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
        />

        {/* Tombol Filter */}
        <button className="px-5 py-3 border rounded-xl shadow-sm flex items-center gap-2 hover:bg-gray-100 transition w-full sm:w-auto justify-center">
          <span>🔍</span> Filter
        </button>
      </div>

      {/* Jumlah Talenta */}
      <p className="text-gray-600 mt-6 text-sm md:text-base">
        Menampilkan{" "}
        <span className="text-red-600 font-semibold">
          {loading ? "..." : filtered.length}
        </span>{" "}
        talenta
      </p>

      {/* Grid Student Cards */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
        mt-4
      ">
        {loading ? (
          <p className="text-gray-500">Memuat data...</p>
        ) : (
          filtered.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              major={student.major}
              nim={student.nim}
              bio={student.bio}
              skills={student.skills}
            />
          ))
        )}
      </div>

    </div>
  </div>
);
};

export default TalentaPage;
