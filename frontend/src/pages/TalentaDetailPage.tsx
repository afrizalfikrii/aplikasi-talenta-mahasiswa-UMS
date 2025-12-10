import React from "react";
import { useParams, Link } from "react-router-dom";
import StudentCard, {
  type StudentData,
} from "../component/layout/StudendCardDetail";
import SkillsExperiences from "../component/layout/SkillsExperiences";
import students from "../datasample/student.json";
import CallToAction from "../component/layout/CallToActioan";

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
    <div className="w-full min-h-screen bg-white py-7 px-8 flex flex-col items-center">
      <div
        className="
          w-full 
          bg-white
          max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-6xl xl:max-w-6xl
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
        <div className="flex flex-col items-center gap-5">
          <StudentCard student={student} />
          <SkillsExperiences />
          <CallToAction />
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;
