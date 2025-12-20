import { useParams, Link } from "react-router-dom";
import { useTalentDetail } from "../hooks/useTalentDetail";
import StudentCardDetail from "../components/StudentCardDetail";
import SkillsExperiences from "../components/SkillsExperiences";
import CallToAction from "@/components/ui/CallToActioan"


const TalentaDetailPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const {data, loading} = useTalentDetail(username);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-xl text-gray-600">
        Memuat data talenta...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-xl text-gray-600">
        Data talenta tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-slate-950 py-7 px-8 flex flex-col items-center transition-colors duration-300">
      <div className="w-full bg-gray-50 dark:bg-slate-950 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-6xl xl:max-w-6xl transition-colors duration-300">
        <div className="flex justify-start mb-6">
          <Link
            to="/talenta"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-800 dark:hover:text-blue-400 font-medium flex items-center gap-2 transition-colors"
          >
            <span className="text-4xl leading-none flex items-center">🡐</span>
            <span className="flex items-center">Kembali ke Talenta</span>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-5">
          <StudentCardDetail student={data} />
          <SkillsExperiences skills={data.skills ?? []} experiences={data.experiences ?? []} />
          <CallToAction />
        </div>
      </div>
    </div>
  );
};

export default TalentaDetailPage;
