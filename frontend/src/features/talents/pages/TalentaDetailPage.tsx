import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTalentDetail } from "../hooks/useTalentDetail";
import StudentCardDetail from "../components/StudentCardDetail";
import SkillsExperiences from "../components/SkillsExperiences";
import CallToAction from "@/components/ui/CallToActioan";

const TalentaDetailPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { data, loading } = useTalentDetail(username);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-gray-900 py-8 px-4 sm:px-8 flex flex-col items-center transition-colors duration-300">
        <div className="w-full max-w-6xl">
          {/* Back Button Skeleton */}
          <div className="mb-6 h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>

          {/* Profile Card Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 mb-6 animate-pulse">
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>

          {/* Skills & Experience Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="space-y-3">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
            <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="space-y-4">
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-center px-4 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Data Tidak Ditemukan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Data talenta yang Anda cari tidak ditemukan.
          </p>
          <Link
            to="/talenta"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all hover:scale-105"
          >
            <ArrowLeft size={20} />
            Kembali ke Daftar Talenta
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 py-8 px-4 sm:px-8 flex flex-col items-center transition-colors duration-300">
      <div className="w-full max-w-6xl">
        {/* Back Button */}
        <div className="flex justify-start mb-6">
          <Link
            to="/talenta"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all hover:gap-3 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Daftar Talenta</span>
          </Link>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-6 animate-fade-up">
          <StudentCardDetail student={data} />
          <SkillsExperiences skills={data.skills ?? []} experiences={data.experiences ?? []} />
          <CallToAction />
        </div>
      </div>
    </div>
  );
};

export default TalentaDetailPage;
