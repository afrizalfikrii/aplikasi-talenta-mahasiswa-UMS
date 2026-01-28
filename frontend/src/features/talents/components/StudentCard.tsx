import type { Talent } from '../types/talent.types';
import { MapPin, ArrowRight, CheckCircle } from 'lucide-react';

const truncateBio = (text: string, maxWords: number = 15) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return `${words.slice(0, maxWords).join(" ")}...`;
};

const StudentCard = ({student}: {student: Talent}) => {
  // Build display name
  const displayName = student.user?.first_name || student.user?.last_name
    ? `${student.user?.first_name || ''} ${student.user?.last_name || ''}`.trim()
    : student.username;
  
  const hasRealName = !!(student.user?.first_name || student.user?.last_name);
  
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-500 cursor-pointer hover:-translate-y-1">
      <div className="flex items-start justify-between mb-6">
        <div className="relative">
          {student.profile_picture ? (
            <img
              src={student.profile_picture}
              alt={`${student.username} profile`}
              className="w-16 h-16 rounded-2xl object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
              {student.username.charAt(0).toUpperCase()}
            </div>
          )}
          {/* Verified Badge - placeholder for future implementation */}
          <CheckCircle 
            className="absolute -bottom-2 -right-2 text-blue-500 bg-white dark:bg-gray-800 rounded-full" 
            size={20} 
            fill="white"
          />
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
          {student.user?.nim || 'N/A'}
        </div>
      </div>
      
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {displayName}
      </h3>
      {hasRealName && (
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">@{student.username}</p>
      )}
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{student.prodi}</p>
      
      {/* Bio */}
      {student.summary && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {truncateBio(student.summary, 12)}
        </p>
      )}
      
      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {student.skills?.slice(0, 3).map(s => (
          <span 
            key={s.id} 
            className="px-3 py-1 bg-gray-50 dark:bg-gray-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300"
          >
            {s.skill_name}
          </span>
        ))}
        {student.skills && student.skills.length > 3 && (
          <span className="px-3 py-1 bg-gray-50 dark:bg-gray-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300">
            +{student.skills.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700">
        <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
          <MapPin size={12}/> Surakarta
        </span>
        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          Lihat <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
};

export default StudentCard;
