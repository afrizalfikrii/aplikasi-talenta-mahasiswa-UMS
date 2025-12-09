import React, { useState } from "react";
import { Link } from "react-router-dom";
import StudentCard from "../component/layout/StudentCard";
import studentsData from "../datasample/student.json";

const truncateBio = (text: string, maxWords: number = 15) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};

const TalentaPage: React.FC = () => {
  const [search, setSearch] = useState("");

  // Filter pencarian langsung dari data JSON
  const filtered = studentsData.filter((item) =>
    [item.name, item.major, item.nim, ...(item.skills || [])]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Daftar Talenta Mahasiswa
          </h1>
          <p className="text-gray-600 text-base md:text-lg mt-1">
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
        <p className="text-gray-600 mt-6 text-sm md:text-base">
          Menampilkan{" "}
          <span className="text-emerald-900 font-semibold">{filtered.length}</span>{" "}
          talenta
        </p>

        {/* Grid */}
       <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            mt-4
          "
        >
          {filtered.map((student) => (
            <Link
              to={`/talenta/${student.nim}`}   // gunakan NIM untuk detail page
              key={student.nim}
              className="block hover:scale-[1.02] transition-transform"
            >
              <StudentCard
                name={student.name}
                major={student.major}
                nim={student.nim}
                bio={truncateBio(student.bio)}
                skills={student.skills}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalentaPage;
