import React from "react";

// Tipe data yang dibutuhkan oleh komponen (disinkronkan dengan JSON + initial)
export interface MahasiswaData {
  id: number;
  name: string;
  major: string;
  nim: string;
  faculty: string;
  bio: string;
  skills: string[];
  email: string;
  telepon: string;
  initial: string; // Tambahan untuk avatar
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
}
// Komponen MahasiswaCard
const MahasiswaCard: React.FC<{ data: MahasiswaData }> = ({ data }) => {
  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6 md:p-8">
      {/* Header dan Avatar */}
      <div className="flex items-start space-x-6">
        {/* Avatar */}
        <div className="flex-shrink-0 w-24 h-24 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-4xl font-semibold border-2 border-red-200">
          {data.initial}
        </div>

        {/* Nama, Jurusan, NIM, dan Fakultas */}
        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">{data.name}</h2>
          <p className="text-lg text-gray-700 font-medium">
            {data.major}{" "}
            <span className="text-sm text-gray-400 italic">({data.nim})</span>
          </p>
          <p className="text-md text-gray-500 italic">{data.faculty}</p>
        </div>
      </div>

      <hr className="my-5 border-gray-200" />

      {/* Deskripsi (Bio) */}
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed font-semibold mb-2">
          {data.bio}
        </p>
      </div>

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Skills:</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Kontak */}
      <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
        {/* Email */}
        {data.email && (
          <div className="flex items-center text-gray-600">
            <svg
              className="w-5 h-5 mr-2 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            <a
              href={`mailto:${data.email}`}
              className="hover:text-red-600 transition duration-150"
            >
              {data.email}
            </a>
          </div>
        )}

        {/* Telepon */}
        {data.telepon && (
          <div className="flex items-center text-gray-600">
            <svg
              className="w-5 h-5 mr-2 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            <span className="hover:text-red-600 transition duration-150">
              {data.telepon}
            </span>
          </div>
        )}
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Tautan Sosial (Ikon Placeholder) */}
      <div className="flex space-x-4">
        {data.linkedinUrl &&
          data.linkedinUrl !== "https://linkedin.com/in/" && (
            <a
              href={data.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition duration-150 transform hover:scale-110"
            >
              {/* Ikon LinkedIn Placeholder */}
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.535-4 0v5.604h-3v-11h3v1.765c1.395-2.185 5-2.093 5 2.056v7.179z"></path>
              </svg>
            </a>
          )}

        {data.githubUrl && data.githubUrl !== "https://github.com/" && (
          <a
            href={data.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-900 transition duration-150 transform hover:scale-110"
          >
            {/* Ikon GitHub Placeholder */}
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.82-.26.82-.577v-2.01c-3.334.72-4.043-1.608-4.043-1.608-.545-1.385-1.332-1.755-1.332-1.755-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.24 1.838 1.24 1.07 1.834 2.807 1.304 3.488.998.107-.775.419-1.304.762-1.604-2.665-.3-5.464-1.33-5.464-5.93 0-1.31.467-2.38 1.23-3.22-.123-.3-.53-1.52.115-3.178 0 0 1-.32 3.3.123 1.05-.29 2.16-.435 3.3-.44 1.14.005 2.25.15 3.3.44 2.3-.443 3.3-.123 3.3.123.644 1.658.237 2.878.115 3.178.764.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.474 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.82.57C20.562 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        )}

        {data.websiteUrl && data.websiteUrl !== "https://" && (
          <a
            href={data.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-600 transition duration-150 transform hover:scale-110"
          >
            {/* Ikon Website/Global Placeholder */}
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.96-7-7.93 0-.62.08-1.21.21-1.79l4.47 4.47 3.31-.01c.2.02.4.03.61.03v5.23zm6.07-2.18l-1.49-1.49-1.55 1.55c-.21.21-.21.55 0 .76l1.49 1.49c1.64-1.12 2.74-2.98 2.8-5.06h-2.25c-.06.87-.31 1.69-.73 2.4zM4.93 15.07l1.49 1.49 1.55-1.55c.21-.21.55-.21.76 0l1.49 1.49c-1.12 1.64-2.98 2.74-5.06 2.8v-2.25c.87-.06 1.69-.31 2.4-.73zM12 4.07V9.3c.2-.02.4-.03.61-.03l3.31.01 4.47-4.47c-1.12-1.64-2.98-2.74-5.06-2.8h-2.25c.87.06 1.69.31 2.4.73zM4.07 8.93l1.49-1.49 1.55 1.55c.21.21.21.55 0 .76l-1.49 1.49c-1.64-1.12-2.74-2.98-2.8-5.06h2.25c.06.87.31 1.69.73 2.4z"></path>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default MahasiswaCard;
