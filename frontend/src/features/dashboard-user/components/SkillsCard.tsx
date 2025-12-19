import { useState } from "react";

export default function SkillsCard() {
    // dummy field
    const [skills] = useState([
        {
            id: 1,
            skill_name: "React.js",
            proficiency_level: "Advanced",
        },
        {
            id: 2,
            skill_name: "Node.js",
            proficiency_level: "Intermediate",
        },
        {
            id: 3,
            skill_name: "Python",
            proficiency_level: "Advanced",
        },
    ]);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-slate-800">Skills</h2>
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
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                    </svg>
                    <span>Edit Skills</span>
                </button>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills.map((skill) => (
                        <div key={skill.id} className="space-y-2">
                            <label className="text-sm font-medium text-slate-500">
                                {skill.skill_name}
                            </label>
                            <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
                                {skill.proficiency_level}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
