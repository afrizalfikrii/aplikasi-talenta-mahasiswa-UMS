import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StudentCardDetail, {
  type StudentData,
} from "../component/layout/StudendCardDetail";
import SkillsExperiences from "../component/layout/SkillsExperiences";
import CallToAction from "../component/layout/CallToActioan";
import { getTalentDetail } from "../services/detailtalent.service";
import type { DetailTalent } from "../types/detailTalent";

const StudentDetailPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [skills, setSkills] = useState<DetailTalent["skills"]>([]);
  const [experiences, setExperiences] = useState<DetailTalent["experiences"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchDetail = async () => {
      if (!username) {
        setError("Talenta tidak ditemukan.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const detail = await getTalentDetail(username);
        if (ignore) return;

        setStudent({
          id: detail.id,
          name: detail.username,
          major: detail.prodi,
          nim: detail.user?.nim ?? "-",
          bio: detail.summary || "Belum ada deskripsi singkat.",
          email: detail.email || undefined,
          telepon: detail.phone_number || undefined,
          linkedinUrl: detail.linkedin_url || undefined,
          githubUrl: detail.github_url || undefined,
          websiteUrl: detail.website_url || undefined,
          profilePicture: detail.profile_picture,
        });
        setSkills(detail.skills ?? []);
        setExperiences(detail.experiences ?? []);
        setError(null);
      } catch (fetchError) {
        console.error("Gagal mengambil detail talenta:", fetchError);
        if (!ignore) {
          setError("Gagal mengambil data talenta.");
          setStudent(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchDetail();

    return () => {
      ignore = true;
    };
  }, [username]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-xl text-gray-600">
        Memuat data talenta...
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-xl text-gray-600">
        {error ?? "Data talenta tidak ditemukan."}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-7 px-8 flex flex-col items-center">
      <div className="w-full bg-gray-50 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-6xl xl:max-w-6xl">
        <div className="flex justify-start mb-6">
          <Link
            to="/talenta"
            className="text-gray-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            <span className="text-4xl leading-none flex items-center">🡐</span>
            <span className="flex items-center">Kembali ke Talenta</span>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-5">
          <StudentCardDetail student={student} />
          <SkillsExperiences skills={skills} experiences={experiences} />
          <CallToAction />
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;
