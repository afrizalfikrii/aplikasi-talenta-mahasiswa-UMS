import { Mail, Phone, Linkedin, Github, Globe, Download } from "lucide-react";
import type { TalentDetail } from "../types/talent.types";

const StudentCardDetail = ({ student }: { student: TalentDetail }) => {
  const fullName = student.user?.first_name && student.user?.last_name 
    ? `${student.user.first_name} ${student.user.last_name}`.trim()
    : student.username;
  const initial = fullName?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div className="w-full max-w-6xl mx-auto p-6 sm:p-8 bg-white dark:bg-gray-800 shadow-lg rounded-3xl flex flex-col sm:flex-row gap-8 items-start border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl">
      {/* Avatar */}
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-white text-6xl flex items-center justify-center overflow-hidden shrink-0 shadow-xl border-4 border-white dark:border-gray-700">
        {student.profile_picture ? (
          <img
            src={student.profile_picture}
            alt={`${fullName} profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-bold">{initial}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
          {fullName}
        </h2>
        <p className="text-lg font-medium text-blue-600 dark:text-blue-400 transition-colors">
          {student.prodi}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
          NIM: {student.user?.nim}
        </p>

        <p className="text-gray-700 dark:text-gray-300 mt-3 mb-2 leading-relaxed transition-colors">
          {student.summary || "Belum ada deskripsi singkat."}
        </p>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-6 mt-4 text-gray-700 dark:text-gray-300 transition-colors">
          {student.email && (
            <a
              href={`mailto:${student.email}`}
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <Mail size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm">{student.email}</span>
            </a>
          )}

          {student.phone_number && (
            <a
              href={`tel:${student.phone_number}`}
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <Phone size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm">{student.phone_number}</span>
            </a>
          )}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mt-4">
          {student.linkedin_url && (
            <a
              href={student.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:scale-110 transition-all"
              title="LinkedIn"
            >
              <Linkedin size={24} className="text-blue-600 dark:text-blue-400" />
            </a>
          )}
          {student.github_url && (
            <a
              href={student.github_url}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-110 transition-all"
              title="GitHub"
            >
              <Github size={24} className="text-gray-900 dark:text-white" />
            </a>
          )}
          {student.website_url && (
            <a
              href={student.website_url}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:scale-110 transition-all"
              title="Website"
            >
              <Globe size={24} className="text-indigo-600 dark:text-indigo-400" />
            </a>
          )}
        </div>

        {/* Download CV Button */}
        {student.cv_file && (
          <div className="mt-6">
            <a
              href={student.cv_file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              <Download size={20} />
              Download CV
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCardDetail;
