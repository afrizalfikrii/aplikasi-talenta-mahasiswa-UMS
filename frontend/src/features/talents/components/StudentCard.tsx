import type { Talent } from '../types/talent.types';

const truncateBio = (text: string, maxWords: number = 15) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return `${words.slice(0, maxWords).join(" ")}...`;
};

const StudentCard = ({student}: {student: Talent}) => {
  return (
    <div className="w-full h-full max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
      {/* Avatar + Name */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-3xl font-semibold">
          {student.profile_picture ? (
            <img
              src={student.profile_picture}
              alt={`${student.username} profile`}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            student.username.charAt(0)
          )}
        </div>

        <div className="text-left">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{student.username}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{student.prodi}</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">NIM: {student.user?.nim}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-4 text-gray-700 dark:text-gray-300 text-left text-sm leading-relaxed">
        {student.summary ? truncateBio(student.summary) : "Belum ada summary"}
      </p>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {student.skills?.slice(0, 4).map((skill) => (
          <span
            key={skill.id}
            className="px-3 py-1 bg-emerald-100 text-emerald-900 text-sm rounded-full flex items-center justify-center"
          >
            {skill.skill_name}
          </span>
        ))}

        {/* Badge More */}
        {student.skills && student.skills.length > 4 && (
          <span className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-sm rounded-full">
            +{student.skills.length - 4}
          </span>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
