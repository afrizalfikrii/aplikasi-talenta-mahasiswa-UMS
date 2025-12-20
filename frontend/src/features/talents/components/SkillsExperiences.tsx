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

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-1">
      {/* Skills */}
      <div className="bg-white dark:bg-slate-900 shadow-md rounded-2xl p-6 border border-gray-200 dark:border-slate-800 h-auto self-start transition-colors">
        <div className="flex items-center gap-1 mb-5">
          <img src="/award-green.png" alt="skills" className="h-9" />
          <h2 className="text-xl font-semibold text-emerald-900 dark:text-emerald-400 transition-colors">Skills</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {hasSkills ? (
            skills!.map((skill) => {
              const levelLabel = formatLevel(skill.proficiency_level);
              return (
                <span
                  key={skill.id}
                  className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 rounded-xl text-sm font-medium transition-colors"
                >
                  {skill.skill_name}
                  {levelLabel && (
                    <span className="ml-1 text-xs text-emerald-700 dark:text-emerald-300 font-normal transition-colors">
                      ({levelLabel})
                    </span>
                  )}
                </span>
              );
            })
          ) : (
            <span className="text-sm text-gray-500 dark:text-slate-400 transition-colors">
              Belum ada data skill yang ditampilkan.
            </span>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="md:col-span-2 bg-white dark:bg-slate-900 shadow-md rounded-2xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-2 mb-6">
          <img src="/green-bag.png" alt="experience" className="h-8 w-auto" />
          <h2 className="text-l font-semibold text-emerald-900 dark:text-emerald-400 transition-colors">Pengalaman</h2>
        </div>

        {hasExperiences ? (
          <div className="flex flex-col gap-8">
            {experiences!.map((exp) => (
              <div key={exp.id} className="flex gap-4">
                {/* Vertical Line */}
                <div className="w-0.5 bg-emerald-500 rounded-full"></div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-400 rounded-full flex items-center justify-center text-2xl font-semibold shrink-0 transition-colors">
                      🏢
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white transition-colors">
                        {exp.job_title}
                      </h3>
                      <p className="text-gray-600 dark:text-slate-300 text-left mt-1 transition-colors">
                        {exp.company_name}
                      </p>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 text-sm mt-2 transition-colors">
                        <img src="/calendar.png" alt="date" className="h-4 w-4 dark:invert" />
                        {formatDateRange(exp.start_date, exp.end_date)}
                      </div>
                      <p className="text-gray-700 dark:text-slate-300 text-left mt-2 leading-relaxed transition-colors">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-sm text-gray-500 dark:text-slate-400 transition-colors">
            Belum ada data pengalaman yang ditampilkan.
          </span>
        )}
      </div>
    </div>
  );
};

export default SkillsExperiences;
