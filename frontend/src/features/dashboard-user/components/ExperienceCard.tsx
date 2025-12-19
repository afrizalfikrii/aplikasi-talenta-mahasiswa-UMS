import { useState } from "react";

export default function ExperienceCard() {
    const [experiences] = useState([
    {
      id: 1,
      job_title: "Full Stack Developer Intern",
      company_name: "PT Teknologi Nusantara",
      start_date: "Jan 2024",
      end_date: "Jun 2024",
      is_current: false,
      description: "Mengembangkan aplikasi e-commerce menggunakan MERN stack",
    },
    {
      id: 2,
      job_title: "Ketua Divisi IT",
      company_name: "HMTI UMS",
      start_date: "Jan 2023",
      end_date: "Jan 2024",
      is_current: false,
      description: "Memimpin pengembangan website organisasi dan sistem informasi",
    },
  ]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Pengalaman</h2>
        <button className="flex items-center space-x-2 bg-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Tambah Pengalaman</span>
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="flex justify-between items-start bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors group"
          >
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900">{exp.job_title}</h3>
              <div className="text-slate-600 font-medium">{exp.company_name}</div>
              <div className="text-sm text-slate-400">
                {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
              </div>
              <p className="text-slate-600 mt-2">{exp.description}</p>
            </div>
            
            <button 
              className="text-slate-400 hover:text-red-500 transition-colors p-1"
              aria-label="Delete experience"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            Belum ada pengalaman yang ditambahkan
          </div>
        )}
      </div>
    </div>
  );
}
