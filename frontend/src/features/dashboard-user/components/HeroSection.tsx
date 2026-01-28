import { Link } from "react-router-dom";
import { Download, Eye, GraduationCap } from "lucide-react";
import { useProfile } from "../hooks/useProfile";

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function HeroSection() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="bg-slate-900 rounded-3xl p-8 mb-8 text-white shadow-lg mx-4 sm:mx-6 lg:mx-8 mt-8 animate-pulse border border-slate-800">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-24 h-24 bg-slate-800 rounded-full"></div>
          <div className="flex-1 w-full space-y-3">
            <div className="h-8 bg-slate-800 rounded w-1/3"></div>
            <div className="h-4 bg-slate-800 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const fullName = `${profile.user.first_name || ''} ${profile.user.last_name || ''}`.trim();
  const userName = fullName || profile.user.username;
  const userSlug = profile.user.username;
  const initials = getInitials(userName);

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-[2rem] p-8 md:p-10 mb-8 text-white shadow-2xl mx-4 sm:mx-6 lg:mx-8 mt-8 overflow-hidden group border border-blue-900/30">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-all duration-1000"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:bg-indigo-500/20 transition-all duration-1000"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        
        {/* Avatar Section */}
        <div className="relative shrink-0">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-br from-blue-400 to-indigo-500 shadow-xl shadow-blue-900/50">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center border-4 border-slate-900 relative">
              {profile.profile_picture ? (
                <img 
                  src={profile.profile_picture} 
                  alt={userName}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <span className="text-3xl md:text-4xl font-bold text-white/90 tracking-wider">
                  {initials}
                </span>
              )}
            </div>
            
            {/* Status Indicator */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-slate-900 rounded-full" title="Active"></div>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 text-center md:text-left space-y-3 w-full">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              {userName}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-blue-200/80 text-sm md:text-base font-medium">
              {profile.prodi && (
                <div className="flex items-center gap-1.5 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-800/50">
                  <GraduationCap size={16} />
                  <span>{profile.prodi}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-800/50">
                <span className="opacity-70">NIM:</span>
                <span className="text-blue-100">{profile.user.nim}</span>
              </div>
            </div>
          </div>

          <p className="text-slate-300 md:text-lg max-w-2xl leading-relaxed">
            {profile.summary 
              ? profile.summary.length > 100 ? `${profile.summary.substring(0, 100)}...` : profile.summary 
              : "Selamat datang di dashboard talenta Anda. Lengkapi profil untuk meningkatkan visibilitas."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
            <button 
              onClick={() => profile.cv_file && window.open(profile.cv_file, '_blank')}
              disabled={!profile.cv_file}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl ${
                profile.cv_file 
                  ? 'bg-blue-600 text-white hover:bg-blue-500 hover:-translate-y-0.5 shadow-blue-900/20' 
                  : 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50'
              }`}
            >
              <Download size={18} />
              <span>Download CV</span>
            </button>

            <Link
              to={`/talenta/${userSlug}`}
              className="flex items-center gap-2 bg-white/5 backdrop-blur-md text-white px-6 py-2.5 rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-0.5 shadow-lg shadow-black/5"
            >
              <Eye size={18} />
              <span>Preview Profil</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
