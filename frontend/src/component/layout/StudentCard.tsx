import React from "react";

interface StudentCardProps {
  name: string;
  major: string;
  nim: string;
  bio: string;
  skills: string[];
}

const StudentCard: React.FC<StudentCardProps> = ({
  name,
  major,
  nim,
  bio,
  skills,
}) => {
  return (
    <div className="w-full h-full max-w-xl bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      {/* Avatar + Name */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-3xl font-semibold">
          {name.charAt(0)}
        </div>

        <div className="text-left">
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <p className="text-gray-600 text-sm">{major}</p>
          <p className="text-gray-500 text-sm">NIM: {nim}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-4 text-gray-700 text-left text-sm leading-relaxed">
        {bio}
      </p>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-emerald-100 text-emerald-900 text-sm rounded-full flex items-center justify-center"
          >
            {skill}
          </span>
        ))}

        {/* Badge More */}
        {skills.length > 4 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
            +{skills.length - 4}
          </span>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
