import React from "react";

export interface StudentData {
  id: number;
  name: string;
  major: string;
  faculty: string;
  nim: string;
  bio: string;
  email?: string;
  telepon?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
}

interface StudentCardDetailProps {
  student: StudentData;
}

const StudentCardDetail: React.FC<StudentCardDetailProps> = ({ student }) => {

  return (
    <div className="
        w-full 
        max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 
        p-5 sm:p-6 
        bg-white shadow-md rounded-2xl 
        flex flex-col sm:flex-row 
        gap-5 sm:gap-6 
        items-start
        border border-gray-200
      ">
      <div className="w-34 h-34 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-900 text-6xl ">
        {student.name.charAt(0)}
      </div>

      <div className="flex flex-col gap-1 flex-1 text-justify">
        <p className="text-lg text-gray-600" >{student.name}</p>
        <p className="text-lg text-gray-600">{student.major}</p>
        <p className="text-lg text-gray-600">Fakultas {student.faculty}</p>

        <p className="text-gray-700 mt-3 mb-2 ">{student.bio}</p>

        {/* Email & Telepon Berjejer */}
        <div className="flex items-center gap-6 mt-4 text-gray-700">
          {student.email && (
            <a
              href={`mailto:${student.email}`}
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <span><img src="/email-svgrepo-com.svg" alt="Talenta UMS" className="h-6 w-auto" /></span>{student.email}
            </a>
          )}

          {student.telepon && (
            <a
              href={`tel:${student.telepon}`}
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <span><img src="/telephone-svgrepo-com.svg" alt="Talenta UMS" className="h-4 w-auto" /></span> {student.telepon}
            </a>
          )}
        </div>

        <div className="flex items-center gap-4 mt-4 text-gray-700 text-2xl">
          {student.linkedinUrl && (
            <a href={student.linkedinUrl} target="_blank" className="hover:text-blue-600">
              <img src="/linkedin_img.svg" alt="Talenta UMS" className="h-6 w-auto" />
            </a>
          )}
          {student.githubUrl && (
            <a href={student.githubUrl} target="_blank" className="hover:text-blue-600">
              <img src="/github_img.svg" alt="Talenta UMS" className="h-6 w-auto" />
            </a>
          )}
          {student.websiteUrl && (
            <a href={student.websiteUrl} target="_blank" className="hover:text-blue-600">
              <img src="/browser_img.svg" alt="Talenta UMS" className="h-6 w-auto" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCardDetail;
