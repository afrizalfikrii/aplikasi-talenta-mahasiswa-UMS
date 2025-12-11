import React from "react";

type SkillItem = {
  id: number;
  skill_name: string;
  proficiency_level: string;
};

type ExperienceItem = {
  id: number;
  title: string;
  company: string;
  start_date: string;
  end_date: string | null;
  description: string;
};

interface SkillsExperiencesProps {
  skills?: SkillItem[];
  experiences?: ExperienceItem[];
}

const formatLevel = (level?: string) => {
  if (!level) return "";
  return level
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const formatDateRange = (
  startDate: string,
  endDate?: string | null
) => {
  const start = formatDate(startDate);
  if (!endDate) return `${start} - Sekarang`;
  return `${start} - ${formatDate(endDate)}`;
};

const SkillsExperiences: React.FC<SkillsExperiencesProps> = ({
  skills,
  experiences,
}) => {
  const hasSkills = Boolean(skills?.length);
  const hasExperiences = Boolean(experiences?.length);

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-1">
      {/* Skills */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 h-auto self-start">
        <div className="flex items-center gap-1 mb-5">
          <img src="/award-green.png" alt="skills" className="h-9" />
          <h2 className="text-xl font-semibold text-emerald-900">Skills</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {hasSkills ? (
            skills!.map((skill) => {
              const levelLabel = formatLevel(skill.proficiency_level);
              return (
                <span
                  key={skill.id}
                  className="px-4 py-2 bg-emerald-100 text-emerald-900 rounded-xl text-sm font-medium"
                >
                  {skill.skill_name}
                  {levelLabel && (
                    <span className="ml-1 text-xs text-emerald-700 font-normal">
                      ({levelLabel})
                    </span>
                  )}
                </span>
              );
            })
          ) : (
            <span className="text-sm text-gray-500">
              Belum ada data skill yang ditampilkan.
            </span>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="md:col-span-2 bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <img src="/green-bag.png" alt="experience" className="h-8 w-auto" />
          <h2 className="text-l font-semibold text-emerald-900">Pengalaman</h2>
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
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-900 rounded-full flex items-center justify-center text-2xl font-semibold">
                      🏢
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {exp.title}
                      </h3>
                      <p className="text-gray-600 text-left mt-1">
                        {exp.company}
                      </p>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                        <img src="/calendar.png" alt="date" className="h-4 w-4" />
                        {formatDateRange(exp.start_date, exp.end_date)}
                      </div>
                      <p className="text-gray-700 text-left mt-2 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-sm text-gray-500">
            Belum ada data pengalaman yang ditampilkan.
          </span>
        )}
      </div>
    </div>
  );
};

export default SkillsExperiences;
