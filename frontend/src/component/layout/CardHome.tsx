import { Link } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { getPublicTalents } from "../../services/talent.service";
import type { Talent } from "../../types/talent";

export default function CardHome() {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPublicTalents();
        setTalents(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAvatar = (url?: string | null) =>
  url && url.length > 0 ? url : "";


  if (loading) return <div>Loading...</div>;

  return (
    <>
    
    {talents?.map((talenta) => (
    <Link
      to={`/talenta/${talenta.username}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      key={talenta.id}
      className="block hover:scale-[1.02] transition-transform"
    >
    <div key={talenta.id} className="bg-white dark:bg-slate-800 rounded-lg p-4 hover:shadow-md transition-shadow duration-300 text-center border border-slate-200 dark:border-slate-700">
      <div className="w-20 h-20 mx-auto mb-3 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
        <img src={getAvatar(talenta.profile_picture)} alt={`${talenta.username} profile`} className="w-full h-full rounded-full object-cover" />
      </div>
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{talenta.username}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{talenta.prodi}</p>
      <div className="flex flex-wrap justify-center gap-1 mb-3">
        {talenta.skills && talenta.skills.length > 0 ? (
          talenta.skills.slice(0, 1).map((skill, index) => (
            <span key={index} className="px-2 py-0.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-xs font-medium rounded">
              {skill.skill_name}
            </span>
          ))
        ) : (
          <span className="px-2 py-0.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-xs font-medium rounded">
            No Skills
          </span>
          )}
        
      </div>
    </div>
    </Link>
    ))}
    </>
    );
}