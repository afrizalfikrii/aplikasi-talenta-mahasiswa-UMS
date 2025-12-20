import { Link } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";

export default function HeroSection() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="bg-slate-800 rounded-2xl p-8 mb-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Loading...</h1>
        <p className="text-slate-200 mb-8 text-lg">Memuat data profil...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-slate-800 rounded-2xl p-8 mb-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Error</h1>
        <p className="text-slate-200 mb-8 text-lg">Gagal memuat profil</p>
      </div>
    );
  }

  const fullName = `${profile.user.first_name || ''} ${profile.user.last_name || ''}`.trim();
  const userName = fullName || profile.user.username || (profile as any).username || "User";
  const userSlug = profile.user.username || (profile as any).username;

  return (
    <div className="bg-slate-800 rounded-2xl p-8 mb-8 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <svg
          width="200"
          height="200"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-white transform rotate-12"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
        </svg>
      </div>

      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-2">
            {loading ? "Loading..." : userName}
        </h1>
        <p className="text-slate-200 mb-8 text-lg">
            Kelola profil Anda, download CV, dan preview profil publik
        </p>

        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => profile.cv_file && window.open(profile.cv_file, '_blank')}
            disabled={!profile.cv_file}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg font-semibold transition-colors ${
              profile.cv_file 
                ? 'bg-white text-slate-900 hover:bg-slate-100 cursor-pointer' 
                : 'bg-slate-600 text-slate-400 cursor-not-allowed opacity-60'
            }`}
            title={!profile.cv_file ? 'CV belum diupload' : 'Download CV'}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Download CV</span>
          </button>

          <Link
            to={`/talenta/${userSlug}`}
            className="flex items-center space-x-2 bg-slate-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-600 transition-colors border border-slate-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>Preview Profil Publik</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
