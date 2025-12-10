import React from "react";

const SkillsExperiences: React.FC = () => {
  const skills = [
    "React",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "AWS",
    "Docker",
  ];

  const experiences = [
    {
      icon: "/green-bag.png",
      title: "Full Stack Developer Intern",
      company: "PT Teknologi Nusantara",
      date: "Jan 2024 - Jun 2024",
      description: "Mengembangkan aplikasi e-commerce menggunakan MERN stack",
    },
    {
      icon: "/award-green.png",
      title: "Ketua Divisi IT",
      company: "HMTI UMS",
      date: "Jan 2023 - Jan 2024",
      description:
        "Memimpin pengembangan website organisasi dan sistem informasi",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-1">
      {/* ================= SKILLS CARD ================= */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 h-auto self-start">
        <div className="flex items-center gap-1 mb-5">
          <img src="/award-green.png" alt="skills" className="h-9" />
          <h2 className="text-xl font-semibold text-emerald-9000">Skills</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-emerald-100 text-emerald-900 rounded-xl text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ================= EXPERIENCE CARD ================= */}
      <div className="md:col-span-2 bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <img src="/green-bag.png" alt="experience" className="h-8 w-auto" />
          <h2 className="text-l font-semibold text-emerald-900">Pengalaman</h2>
        </div>

        <div className="flex flex-col gap-8">
          {experiences.map((exp, i) => (
            <div key={i} className="flex gap-4">
              {/* Vertical red line */}
              <div className="w-0.5 bg-emerald-500 rounded-full"></div>

              {/* Content */}
              <div className="flex flex-row gap-2">
                <div>
                  <img src={exp.icon} className="h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    {exp.title}
                  </div>

                  <p className="text-gray-600 text-left w-full mt-2">
                    {exp.company}
                  </p>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                    <img src="/calendar.png" className="h-4" />
                    {exp.date}
                  </div>

                  <p className="text-gray-700 text-left mt-2">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsExperiences;
