import { Zap, Briefcase, Calendar } from "lucide-react";
import type { Skill, Experience } from "../types/talent.types";
import { formatDateRange, formatLevel } from "@/lib/helpers";

const SkillsExperiences = ({
  skills,
  experiences,
}: {
  skills?: Skill[];
  experiences?: Experience[];
}) => {
  const hasSkills = Boolean(skills?.length);
  const hasExperiences = Boolean(experiences?.length);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "intermediate": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "advanced": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      case "expert": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-1">
      {/* Skills */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-6 border border-gray-100 dark:border-gray-700 h-auto self-start transition-all hover:shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
            Skills
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {hasSkills ? (
            skills!.map((skill) => {
              const levelLabel = formatLevel(skill.proficiency_level);
              const colorClass = getLevelColor(skill.proficiency_level);
              
              return (
                <span
                  key={skill.id}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 ${colorClass}`}
                >
                  {skill.skill_name}
                  {levelLabel && (
                    <span className="ml-1 text-xs font-normal opacity-75">
                      ({levelLabel})
                    </span>
                  )}
                </span>
              );
            })
          ) : (
            <div className="w-full text-center py-8 bg-gray-50 dark:bg-gray-700/30 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
              <Zap className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                Belum ada data skill
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="md:col-span-2 bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
            Pengalaman
          </h2>
        </div>

        {hasExperiences ? (
          <div className="flex flex-col gap-6">
            {experiences!.map((exp, index) => (
              <div key={exp.id} className="flex gap-4">
                {/* Vertical Line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center shrink-0 border-4 border-white dark:border-gray-800 shadow-md">
                    <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  {index < experiences!.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-purple-400 to-transparent dark:from-purple-600 mt-2"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                    {exp.job_title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 font-medium mt-1 transition-colors">
                    {exp.company_name}
                  </p>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mt-2 transition-colors">
                    <Calendar size={16} />
                    <span>{formatDateRange(exp.start_date, exp.end_date)}</span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 dark:text-gray-300 mt-3 leading-relaxed transition-colors">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
            <Briefcase className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 mb-1">Belum ada pengalaman</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Belum ada data pengalaman yang ditampilkan
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsExperiences;
