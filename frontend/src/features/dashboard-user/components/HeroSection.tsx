import { Link } from "react-router-dom";
import { Download, Eye } from "lucide-react";
import { useProfile } from "../hooks/useProfile";

export default function HeroSection() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 mb-8 text-white shadow-lg mx-4 sm:mx-6 lg:mx-8 mt-8 animate-pulse">
        <div className="h-8 bg-white/20 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-white/20 rounded w-2/3 mb-8"></div>
        <div className="flex gap-4">
          <div className="h-12 bg-white/20 rounded-xl w-40"></div>
          <div className="h-12 bg-white/20 rounded-xl w-48"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-8 mb-8 text-white shadow-lg mx-4 sm:mx-6 lg:mx-8 mt-8">
        <h1 className="text-3xl font-bold mb-2">Error</h1>
        <p className="text-white/90 mb-8 text-lg">Gagal memuat profil</p>
      </div>
    );
  }

  const fullName = `${profile.user.first_name || ''} ${profile.user.last_name || ''}`.trim();
  const userName = fullName || profile.user.username || (profile as any).username || "User";
  const userSlug = profile.user.username || (profile as any).username;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 mb-8 text-white shadow-xl mx-4 sm:mx-6 lg:mx-8 mt-8 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {loading ? "Loading..." : userName}
        </h1>
        <p className="text-white/90 mb-8 text-lg max-w-2xl">
          Kelola profil Anda, download CV, dan preview profil publik
        </p>

        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => profile.cv_file && window.open(profile.cv_file, '_blank')}
            disabled={!profile.cv_file}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              profile.cv_file 
                ? 'bg-white text-blue-600 hover:bg-white/90 hover:scale-105 cursor-pointer shadow-lg' 
                : 'bg-white/20 text-white/60 cursor-not-allowed'
            }`}
            title={!profile.cv_file ? 'CV belum diupload' : 'Download CV'}
          >
            <Download size={20} />
            <span>Download CV</span>
          </button>

          <Link
            to={`/talenta/${userSlug}`}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20 hover:scale-105 shadow-lg"
          >
            <Eye size={20} />
            <span>Preview Profil Publik</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
