import { Link } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { MapPin, ArrowRight, CheckCircle } from "lucide-react";
import { getLatestTalents } from "@/features/talents/api/talent.api";
import type { Talent } from "@/features/talents/types/talent.types";

export default function CardHome() {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLatestTalents();
        setTalents(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-6 h-80 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {talents?.map((talenta) => (
        <Link
          to={`/talenta/${talenta.username}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          key={talenta.id}
          className="block"
        >
          <div className="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-500 cursor-pointer hover:-translate-y-1 h-full flex flex-col">
            <div className="flex items-start justify-between mb-6">
              <div className="relative">
                {talenta.profile_picture ? (
                  <img
                    src={talenta.profile_picture}
                    alt={`${talenta.username} profile`}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                    {talenta.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <CheckCircle 
                  className="absolute -bottom-2 -right-2 text-blue-500 bg-white dark:bg-gray-800 rounded-full" 
                  size={20} 
                  fill="white"
                />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {talenta.user?.first_name && talenta.user?.last_name 
                ? `${talenta.user.first_name} ${talenta.user.last_name}` 
                : talenta.username}
            </h3>
            <p className="text-gray-400 dark:text-gray-500 text-xs mb-2">@{talenta.username}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{talenta.prodi}</p>
            
            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-6 flex-1">
              {talenta.skills && talenta.skills.length > 0 ? (
                talenta.skills.slice(0, 2).map((skill) => (
                  <span 
                    key={skill.id} 
                    className="px-3 py-1 bg-gray-50 dark:bg-gray-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    {skill.skill_name}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 bg-gray-50 dark:bg-gray-700 rounded-lg text-xs font-medium text-gray-400 dark:text-gray-500">
                  No Skills
                </span>
              )}
              {talenta.skills && talenta.skills.length > 2 && (
                <span className="px-3 py-1 bg-gray-50 dark:bg-gray-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300">
                  +{talenta.skills.length - 2}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700 mt-auto">
              <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                <MapPin size={12}/> Surakarta
              </span>
              <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Lihat <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
