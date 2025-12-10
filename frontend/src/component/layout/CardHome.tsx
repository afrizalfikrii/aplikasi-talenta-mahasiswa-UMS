// data dummy
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
    <div key={talenta.id} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow duration-300 text-center border border-slate-200">
      <div className="w-20 h-20 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center">
        <img src={getAvatar(talenta.profile_picture)} alt={`${talenta.username} profile`} className="w-full h-full rounded-full object-cover" />
      </div>
      <h3 className="text-sm font-bold text-gray-900 mb-1">{talenta.username}</h3>
      <p className="text-xs text-gray-500 mb-3">{talenta.prodi}</p>
      <div className="flex flex-wrap justify-center gap-1 mb-3">
        {talenta.skills && talenta.skills.length > 0 ? (
          talenta.skills.slice(0, 1).map((skill, index) => (
            <span key={index} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded">
              {skill.skill_name}
            </span>
          ))
        ) : (
          <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded">
            No Skills
          </span>
          )}
        
      </div>
    </div>
    ))}
    </>
    );
}