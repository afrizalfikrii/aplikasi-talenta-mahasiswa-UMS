import React from "react";
import { useParams, Link } from "react-router-dom";
import StudentCard, { type StudentData } from "../component/layout/StudendCardDetail";
import students from "../datasample/student.json";

const StudentDetailPage: React.FC = () => {
  const { nim } = useParams();
  const student: StudentData | undefined = students.find((s) => s.nim === nim);

  if (!student) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-xl text-gray-600">
        Data mahasiswa tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10 flex flex-col items-center">
      <div
        className="
          w-full 
          max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 
          px-4
        "
      >
        {/* Link Kembali Ke Daftar Talenta */}
        <div className="flex justify-start mb-6">
          <Link
            to="/talenta"
            className="text-gray-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            <span className="text-4xl leading-none flex items-center">🡐</span>
            <span className="flex items-center">Kembali ke Talenta</span>
          </Link>
        </div>

        {/* Card Component */}
        <div className="flex justify-center">
          <StudentCard student={student} />
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;
