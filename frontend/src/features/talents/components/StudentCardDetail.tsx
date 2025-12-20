import type { TalentDetail } from "../types/talent.types"
const StudentCardDetail = ({ student }: { student: TalentDetail }) => {
  const fullName = student.user?.first_name && student.user?.last_name 
    ? `${student.user.first_name} ${student.user.last_name}`.trim()
    : student.username;
  const initial = fullName?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div className="w-full max-w-6xl mx-auto p-5 sm:p-6 bg-white dark:bg-slate-900 shadow-md rounded-2xl flex flex-col sm:flex-row gap-7 items-start border border-gray-200 dark:border-slate-800 transition-colors">
      <div className="w-32 h-32 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 text-6xl flex items-center justify-center overflow-hidden shrink-0">
        {student.profile_picture ? (
          <img
            src={student.profile_picture}
            alt={`${fullName} profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initial}</span>
        )}
      </div>

      <div className="flex flex-col gap-1 flex-1 text-justify">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white transition-colors">{fullName}</h2>
        <p className="text-lg text-gray-600 dark:text-slate-300 transition-colors">{student.prodi}</p>
        <p className="text-sm text-gray-500 dark:text-slate-400 transition-colors">NIM: {student.user?.nim}</p>

        <p className="text-gray-700 dark:text-slate-300 mt-3 mb-2 transition-colors">
          {student.summary || "Belum ada deskripsi singkat."}
        </p>

        <div className="flex flex-wrap items-center gap-6 mt-4 text-gray-700 dark:text-slate-300 transition-colors">
          {student.email && (
            <a
              href={`mailto:${student.email}`}
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <img
                src="/email-svgrepo-com.svg"
                alt="Email"
                className="h-6 w-auto dark:invert dark:brightness-200"
              />
              {student.email}
            </a>
          )}

          {student.phone_number && (
            <a
              href={`tel:${student.phone_number}`}
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <img
                src="/telephone-svgrepo-com.svg"
                alt="Telepon"
                className="h-4 w-auto dark:invert dark:brightness-200"
              />
              {student.phone_number}
            </a>
          )}
        </div>

        <div className="flex items-center gap-4 mt-4 text-gray-700 text-2xl">
          {student.linkedin_url && (
            <a
              href={student.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <img src="/linkedin_img.svg" alt="LinkedIn" className="h-6 w-auto " />
            </a>
          )}
          {student.github_url && (
            <a
              href={student.github_url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <img src="/github_img.svg" alt="GitHub" className="h-6 w-auto dark:invert" />
            </a>
          )}
          {student.website_url && (
            <a
              href={student.website_url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <img src="/browser_img.svg" alt="Website" className="h-6 w-auto dark:invert" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCardDetail;
