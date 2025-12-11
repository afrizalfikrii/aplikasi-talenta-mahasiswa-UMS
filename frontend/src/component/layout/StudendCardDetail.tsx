export interface StudentData {
  id: number;
  name: string;
  major: string;
  nim: string;
  bio: string;
  email?: string;
  telepon?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  profilePicture?: string | null;
}

interface StudentCardDetailProps {
  student: StudentData;
}

const StudentCardDetail: React.FC<StudentCardDetailProps> = ({ student }) => {
  const initial = student.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div className="w-full max-w-6xl mx-auto p-5 sm:p-6 bg-white shadow-md rounded-2xl flex flex-col sm:flex-row gap-7 items-start border border-gray-200">
      <div className="w-32 h-32 rounded-full bg-emerald-100 text-emerald-900 text-6xl flex items-center justify-center overflow-hidden">
        {student.profilePicture ? (
          <img
            src={student.profilePicture}
            alt={`${student.name} profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initial}</span>
        )}
      </div>

      <div className="flex flex-col gap-1 flex-1 text-justify">
        <h2 className="text-2xl font-semibold text-gray-800">{student.name}</h2>
        <p className="text-lg text-gray-600">{student.major}</p>
        <p className="text-sm text-gray-500">NIM: {student.nim}</p>

        <p className="text-gray-700 mt-3 mb-2">
          {student.bio || "Belum ada deskripsi singkat."}
        </p>

        <div className="flex flex-wrap items-center gap-6 mt-4 text-gray-700">
          {student.email && (
            <a
              href={`mailto:${student.email}`}
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <img
                src="/email-svgrepo-com.svg"
                alt="Email"
                className="h-6 w-auto"
              />
              {student.email}
            </a>
          )}

          {student.telepon && (
            <a
              href={`tel:${student.telepon}`}
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <img
                src="/telephone-svgrepo-com.svg"
                alt="Telepon"
                className="h-4 w-auto"
              />
              {student.telepon}
            </a>
          )}
        </div>

        <div className="flex items-center gap-4 mt-4 text-gray-700 text-2xl">
          {student.linkedinUrl && (
            <a
              href={student.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              <img src="/linkedin_img.svg" alt="LinkedIn" className="h-6 w-auto" />
            </a>
          )}
          {student.githubUrl && (
            <a
              href={student.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              <img src="/github_img.svg" alt="GitHub" className="h-6 w-auto" />
            </a>
          )}
          {student.websiteUrl && (
            <a
              href={student.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              <img src="/browser_img.svg" alt="Website" className="h-6 w-auto" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCardDetail;
